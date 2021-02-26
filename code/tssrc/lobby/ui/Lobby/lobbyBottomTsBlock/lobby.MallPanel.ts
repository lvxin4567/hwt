//商品面板
namespace lobby {
    const { doBindEvent, BindEvent } = kaayou._decorator;

    export class MallCell extends kaayou.Block {
        constructor() {
            super();
        }
        _index: number = 0;
        label_money: ccui.Text = null;
        label_cardnum: ccui.Text = null;
        btn_buy: ccui.Button = null;
        img_product: ccui.ImageView = null;
        img_More: ccui.ImageView = null;
        initWithNode(node: ccui.Widget) {
            super.initWithNode(node);
            this.label_money = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_prz");
            this.label_cardnum = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_cardnum");
            this.btn_buy = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_buy");
            this.img_product = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "img_product");
            this.img_product.ignoreContentAdaptWithSize(true);
            this.img_More = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Img_more");
            this.img_More.setVisible(false);
            let self = this;
            this.btn_buy.on(kaayou.TouchEvent.TouchEnd, function () {
                if (lodash.isEmpty(self._data)) { return; }
                if (self._data.type == 3) {    //   如果是金币页面。。。直接就调接口走钻石转金币

                    kaayou.emit("lobby", "mod::Mall::Exchange", {
                        gid: self._data.id, callBack: function () {

                            kaayou.emit("common", "ui::GetRewardSusPanel::Show", { img: self._data.imgUrl, name: (self._data.num + self._data.numAdd)+"金币" })
                        }
                    })
                    return;
                }
                if (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS) {
                    kaayou.emit("lobby", "mod::Mall::sendPay", { pid: self._data.id, way: 3 });
                } else {
                    kaayou.emit("lobby", "ui::Mall::ProductSelected", self._data);
                }

            }, this);

        }
        _data: IProductItem = null;
        setInfo(data: IProductItem, isbInd?: boolean) {
            let self = this;
            this._data = data;
            this.label_money.setString((data.type == 3 ? "$" + data.price : "¥" + data.price / 100));
            let imageName = ""
            this.label_cardnum.setString("" + data.productName);
            if (data.type == 1) {
                // this.label_cardnum.setString("" + data.num + '房卡');
                imageName = "Lobby_MP_img_icon";
            } else if (data.type == 3) {
                // this.label_cardnum.setString("" + data.num + '金币');
                imageName = "Lobby_mall_Gold";
            } else if (data.type == 4) {
                // this.label_cardnum.setString("" + data.num + '钻石');
                imageName = "Lobby_mall_Diamond";
            } else {
                // this.label_cardnum.setString("" + data.num + '豆');
            }
            if (data.imgUrl.indexOf('http') == 0) {
                self.img_product.setVisible(false);
                NetImage.loadImage(data.imgUrl).then(function (tex: cc.Texture2D) {
                    if (!self.img_product.isRunning() || !self.isRunning()) { return; }
                    (<cc.Sprite>self.img_product.getVirtualRenderer()).initWithTexture(tex);
                    self.img_product.setVisible(true);
                });
            } else {
                if (cc.spriteFrameCache.getSpriteFrame(`${imageName}${data.imgUrl}`)) {
                    self.img_product.loadTexture(`${imageName}${data.imgUrl}`, ccui.Widget.PLIST_TEXTURE);
                } else {
                    self.img_product.loadTexture(`${imageName}1.png`, ccui.Widget.PLIST_TEXTURE);
                }
                self.img_product.setVisible(true);
            }
            this.img_More.setVisible(false)
            if (!!isbInd && data.percent != 0) {
                this.img_More.setVisible(true);
                (<ccui.Text>this.img_More.getChildByName("label_more")).setString(`多送${data.percent}%`);
            }


        }

        unuse() {
            this._data = null;
            this.label_money.setString("");
            this.label_cardnum.setString("");
            this.removeFromParent();
        }
    }

    export class MallPanelMgr {
        static __INS__: MallPanelMgr = null;
        static getInstance(_zOrder: number = 0) {
            if (MallPanelMgr.__INS__ == null) {
                MallPanelMgr.__INS__ = new MallPanelMgr();
                MallPanelMgr.__INS__.init();
                MallPanelMgr.__INS__._zOrder = _zOrder;
            }
            return MallPanelMgr.__INS__;
        }
        public _zOrder = 0;
        __selfPanel: MallPanel = null;

        init() {
            let self = this;
            this.__selfPanel = null;

            kaayou.getController('lobby').on('ui::Mall::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show(e.data);
            }, this, 10);
            kaayou.getController('lobby').on('ui::Mall::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);

            kaayou.getController('lobby').on('ui::Mall::PageSwitch', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).pageSwitch(e.data.index);
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new MallPanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel, this._zOrder);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }

    }

    export class MallPanel extends kaayou.ModelLayer {
        constructor() {
            super();
            this.initWithccs(lobby.res.MallPanel_json);
            this.initUI();
        }

        mall_cell_mode: Node = null;
        mall_btn_close: ccui.Button = null;
        lbWechat: ccui.Text = null;
        mall_cell_bg: ccui.ImageView = null;
        mall_cell_Sv: ccui.ScrollView = null;
        tips: ccui.ImageView = null;
        topbarMgr: lobby.TopBarMgr = null;
        leftMenu: ccui.Layout = null;
        menuGroup: common.RadioGroup = null;
        bind_layout: ccui.Layout = null;
        wealthLayout: ccui.Layout = null;
        //  @doBindEvent
        initUI() {
            this.isTouchMaskHide = false;
            let self = this;
            this.tips = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Tips");
            this.mall_cell_mode = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "mall_cell_mode");
            this.mall_btn_close = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_close");
            this.lbWechat = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Wechat");
            this.mall_cell_bg = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Img_mallBg");
            this.mall_btn_close.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.Hide();
            }, this);


            this.topbarMgr = new TopBarMgr(ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "top_bar"));
            this.topbarMgr.setTitle("商城");
            this.topbarMgr.setOnCloseClick(function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.Hide();
            }.bind(this));
            this.mall_cell_Sv = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "mall_list");
            this.mall_cell_Sv.setPadding({ left: 45, spacingX: 20, spacingY: 10, top: 35 });
            this.mall_cell_Sv.setGrid(ccui.Layout.LayoutGrid_AxisDirection.HORIZONTAL);
            this.mall_cell_Sv.setHorizontal(ccui.Layout.LayoutHorizontal.LEFT);
            this.mall_cell_Sv.setVertical(ccui.Layout.LayoutVertical.TOP);
            this.mall_cell_Sv.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Grid);
            this.mall_cell_Sv.setGridColumn(4);

            this.bind_layout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "bind_Layout");
            this.bind_layout.getChildByName("btn_bind").on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                kaayou.emit("lobby", "ui::lobbyMallBindIDPanel::Show");
            }, this);

            this.wealthLayout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "wealthLayout");

            kaayou.getController('lobby').on('ui::Mall::ProductInfo', function (e: kaayou.Event) {
                self.setMallList(e.data);
            }, this, 10);

            kaayou.getController('lobby').on('ui::Mall::DiamondProductInfo', function (e: kaayou.Event) {

                self.setDiamondMallList(e.data);
            }, this, 10);

            kaayou.getController('lobby').on('ui::Mall::ProductSelected', function (e: kaayou.Event) {
                self.onProductSelected(e.data);
            }, this, 10);

            kaayou.getController('lobby').on('ui::Mall::BindUpdate', function (e: kaayou.Event) {
                self.bindSuccessUpdate()
            }, this, 10);

            kaayou.getController("lobby").on('ui::UpdateUserInfo', function (e: kaayou.Event) {
                self.onUpdateUserWealth(e.data);
            }, this);

            this.initLeftMenu();
            this.Hide();
        }
        _cache: boolean = false;
        _DiamondCache: boolean = false;
        initLeftMenu() {
            let self = this;
            let ctrName = "lobbyRC"
            let subpageChangeEventName = "ui::record::SubpageChange";

            //初始化左侧菜单
            this.leftMenu = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "left");
            this.leftMenu.setPadding({ top: 50, spacingY: 0 });
            this.leftMenu.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Vertical);
            this.leftMenu.setVertical(ccui.Layout.LayoutVertical.TOP);
            //this.leftMenu.setScrollBarEnabled(false);
            this.leftMenu.doChildrenLayout();
            this.menuGroup = new common.RadioGroup();
            lodash.forEach(this.leftMenu.getChildren(), function (v: ccui.CheckBox, i) {
                v['index'] = i;
                v.on(kaayou.RadioEvent.SELECTED, self.onMenuSelected, self);
                self.menuGroup.add(v);
            })
        }

        cur_Index = 0
        onMenuSelected(e: kaayou.RadioEvent) {
            let self = this;
            kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
            let index = e.target['index'];
            // this.iMenuIndex = index;
            console.log("商品列表" + index)
            this.cur_Index = index;
            switch (index) {
                case 0:  //房卡
                    kaayou.emit("lobby", "mod::Mall::getProductList", { type: 1, clean: !self._cache });
                    break;
                case 1:     //钻石
                    kaayou.emit("lobby", "mod::Mall::getDiamondProductList", { type: 4, clean: !self._DiamondCache });

                    break;
                case 2:     //金币
                    console.log("这个需要找服务器调用接口");
                    kaayou.emit("lobby", "mod::Mall::getDiamondProductList", { type: 3, clean: !self._DiamondCache });
                    break;
                default:
                    break;
            }
            //kaayou.emit("lobby", "mod::Mall::getProductList", { type: 1, clean: true });
            // kaayou.pool.putAllChildrenInPool(this.svRecord);
            // this.svRecord.jumpToTop();
            // // this.svRecord.scrollToTop(0,false);
            // this.refreshView(true);
        }

        private createCell(): MallCell {
            let cell = kaayou.pool.getFromPool(MallCell);
            if (!cell) {
                cell = new MallCell();
            }
            cell.initWithNode(this.mall_cell_mode);

            cell.setAnchorPoint(0.5, 0);
            cell.setPositionY(0);
            return cell;
        }
        onUpdateUserWealth(data: Data_Uerinfo) {
            if (!data) {
                return;
            }
            (<ccui.Text>this.wealthLayout.getChildren()[0].getChildByName("num_label")).setString(
                kaayou.Identify.decNumber(data.card)
            );
            (<ccui.Text>this.wealthLayout.getChildren()[1].getChildByName("num_label")).setString(
                kaayou.Identify.decNumber(data.diamond)
            );
            (<ccui.Text>this.wealthLayout.getChildren()[2].getChildByName("num_label")).setString(
                kaayou.Identify.decNumber(data.gold)
            );
        }

        //测试数据，需要从后台获取
        // @BindEvent('lobby', 'ui::Mall::ProductInfo')
        setMallList(data: IProductItem[]) {
            this._cache = true;
            console.log(data);
            let self = this;
            this.bind_layout.setVisible(false);
            kaayou.pool.putAllChildrenInPool(this.mall_cell_Sv);
            this.mall_cell_Sv.setPadding({ left: 45, spacingX: 20, spacingY: 10, top: 0 });
            lodash.forEach(data, function (v) {
                let cell = self.createCell();
                cell.setInfo(v);
                self.mall_cell_Sv.addChild(cell);
            });
            self.mall_cell_Sv.doChildrenLayout();
        }


        setDiamondMallList(data: DiamondProductList_Res) {
            this._DiamondCache = true;
            console.log(data);
            let self = this;

            this.bind_layout.setVisible(false);
            let layout_Top = 0;

            let configs = common.mod.Config.AppConfig;
            let feature: IFeature = lodash.extend({}, configs.feature);
            //lm200721隐藏绑定
            // if (!data.binding && this.cur_Index != 2 && (configs && feature && !feature.iOSsh)) {
            //     this.bind_layout.setVisible(true);
            //     layout_Top = 35
            // }       
            this.mall_cell_Sv.setPadding({ left: 45, spacingX: 20, spacingY: 10, top: layout_Top });
            (<ccui.Text>this.bind_layout.getChildByName("label_more")).setString(`最高${data.maxjbbili}%的额外奖励。`);
            kaayou.pool.putAllChildrenInPool(this.mall_cell_Sv);
            let sv_data = this.cur_Index == 2 ? data.jinbi : data.zuanshi
            lodash.forEach(sv_data, function (v) {
                let cell = self.createCell();
                cell.setInfo(v, data.binding);
                self.mall_cell_Sv.addChild(cell);
            });
            self.mall_cell_Sv.doChildrenLayout();
        }




        // @BindEvent('lobby', 'ui::Mall::ProductSelected')
        onProductSelected(data: IProductItem) {
            let req = {
                pid: data.id,
                extra: data.extra,
                grant_type: data.grant_type,
                way: 2
            };
            kaayou.emit('common', 'ui::ChannelPanel::Show', {
                productname: data.productName,
                productmoney: data.price / 100 + "元",
                onSelected: function (res) {
                    if (res === 'zfb') {
                        kaayou.emit("lobby", "mod::Mall::sendPay", req);
                    } else if (res === 'wx') {
                        req.way = 1;
                        kaayou.emit("lobby", "mod::Mall::sendPay", req);
                    }
                    kaayou.emit('common', 'ui::ChannelPanel::Hide');
                },
                onCancel: function (res) {


                }
            })
        }

        bindSuccessUpdate() {
            let self = this;
            if (this.cur_Index == 2) {
                return;
            }
            this._DiamondCache = false;
            (<ccui.CheckBox>self.leftMenu.getChildren()[self.cur_Index]).setRadioSelected();
        }



        Show(index?: number) {
            let self = this;
            this._cache = false;
            this._DiamondCache = false;
            // let configs = common.mod.Config.AppConfig;
            // if (configs.btnShow.wx) {
            //     let configData = common.mod.Config.GetAppConfig();
            //     let kftel=configData.zmwx;
            //     this.lbWechat.string="成为队长可以获得更低购卡折扣哦！客服微信："+configs.zmwx;
            //     this.tips.setVisible(true);
            // } else {
            //     this.tips.setVisible(false);
            // }
            this.setVisible(true);
            // kaayou.emit("lobby", "mod::Mall::getProductList", { type: 1, clean: !self._cache });
            let userInfo: Data_Uerinfo = lobby.mod.User.getInstance().getUserInfo();
            self.onUpdateUserWealth(userInfo);
            kaayou.pop.ShowMainAnim({
                tNode: ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "top_bar"),
                bNode: this.node.getChildByName("contentPanel"),
                mNode: this.node.getChildByName('maskbg'),
                action: function () {
                    (<ccui.CheckBox>self.leftMenu.getChildren()[!!index ? index : 0]).setRadioSelected();
                }
            });
        }

        Hide() {
            let self = this;
            this._cache = false;
            this._DiamondCache = false;
            this.mall_cell_Sv.removeAllChildren();
            this.setVisible(false);
        }

        pageSwitch(i: number) {
            if (i > 2) {
                return;
            }
            let self = this;
            (<ccui.CheckBox>self.leftMenu.getChildren()[i]).setRadioSelected();
        }

    }
}