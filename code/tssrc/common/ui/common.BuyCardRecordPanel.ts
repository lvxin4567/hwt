
namespace common {
    const { BindEvent, doBindEvent } = kaayou._decorator;

    interface ALLProductInfo {
        toollistitem: Array<ProductInfo>,
        deadat: number,
    }

    interface ProductInfo {
        id: number,
        productName: string,
        desc: string,
        price: number,
        num: number,
        status: number,
        sort: number,
        img: null,
        numAdd: number,
        ctime: null,
        percent: number,
        type: number
    }

    export class BuyCardRecordPanel extends kaayou.Layer {
        maskBg: cc.Layer = null;
        contentPanel: ccui.Layout = null;
        Text_lefttime: ccui.Text = null;                        //记牌器剩余天数
        ScrollView: ccui.ScrollView = null;                     //记牌器选择容器
        Panel_cell: ccui.Layout = null;                         //记牌器选项模板
        cellInfoArr: Array<ProductInfo> = null;                 //服务端发送过来的购买选项信息
        curChooseIndex: number = 0;                             //当前选择的下标

        tip_CheckBox: ccui.Button = null;
        tipImage_CheckBox: ccui.ImageView = null;
        tip_Layout: ccui.ImageView = null;

        constructor() {
            super();
            this.initUI();
        }

        // @doBindEvent
        initUI() {
            this.initWithccs(common.res.BuyCardRecordPanel_json);
            let self = this;
            self.maskBg = ccui.helper.seekWidgetByName(<ccui.Widget>self.node, "maskbg");

            self.contentPanel = ccui.helper.seekWidgetByName(<ccui.Widget>self.node, "contentPanel");
            self.Text_lefttime = ccui.helper.seekWidgetByName(<ccui.Widget>self.node, "Text_lefttime");
            if (self.Text_lefttime) self.Text_lefttime.ignoreContentAdaptWithSize(true);

            self.ScrollView = ccui.helper.seekWidgetByName(<ccui.Widget>self.node, "ScrollView");
            if (self.ScrollView) {
                self.ScrollView.setPadding({ left: 65, right: 65, top: 7.5, bottom: 7.5, spacingX: 50 });
                self.ScrollView.setScrollBarEnabled(true);
            }
            self.Panel_cell = ccui.helper.seekWidgetByName(<ccui.Widget>self.node, "Panel_cell");

            self.tip_Layout = ccui.helper.seekWidgetByName(<ccui.Widget>self.node, "checkIp_TipPanel");
            self.tipImage_CheckBox = ccui.helper.seekWidgetByName(<ccui.Widget>self.node, "checkIp_Tip_image");
            self.tip_CheckBox = ccui.helper.seekWidgetByName(<ccui.Widget>self.node, "checkIp_Tip");
            self.tip_CheckBox.on(kaayou.TouchEvent.TouchStart, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                self.tipImage_CheckBox.visible = true;
            }, this);
            self.tip_CheckBox.on(kaayou.TouchEvent.TouchEnd, function () {
                self.tipImage_CheckBox.visible = false;
            }, this);
            self.tip_CheckBox.on(kaayou.TouchEvent.TouchCance, function () {
                self.tipImage_CheckBox.visible = false;
            }, this);

            //确定购买
            let Button_comfirm: ccui.Button = ccui.helper.seekWidgetByName(<ccui.Widget>self.node, "Button_comfirm");
            if (Button_comfirm) {
                Button_comfirm.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                    kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                    self.Hide();
                    self.ExChangeCardRecord();
                }, this)
            }

            //取消购买
            let Button_cancel: ccui.Button = ccui.helper.seekWidgetByName(<ccui.Widget>self.node, "Button_cancel");
            if (Button_cancel) {
                Button_cancel.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                    kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                    self.Hide();
                }, this)
            }

            kaayou.getController('common').on('ui::BuyCardRecordPanel::ProductSelected', function (e: kaayou.Event) {
                self.ProductSelected(e.data);
            }, this, 10);

            self.setVisible(false);
        }

        private createCell(): BuyCardRecordPanelCell {
            let self = this;
            let cell = <BuyCardRecordPanelCell>kaayou.pool.getFromPool(BuyCardRecordPanelCell);
            if (!cell) {
                cell = new BuyCardRecordPanelCell();
            }
            cell.initWithNode(self.Panel_cell);
            cell.setAnchorPoint(0.5, 0.5);
            cell.setPositionY(cell.getContentSize().height / 2);
            cell.setChoose(false);
            cell.setVisible(true);
            return cell;
        }

        getCardRecordUrl() {
            return common.mod.Config.GetAppConfig().cardRecordUrl || "";
        }

        getAppID() {
            return common.mod.Config.GetAppConfig().payappid || "kaayou808108913";
        }

        getAppToken() {
            return common.mod.Config.GetAppConfig().payapptoken || "fa4417af2b585565e9e46d4307f83bfa";
        }

        getSign(map, webGameKey?: string) {

            let appId = this.getAppID();
            if (lodash.isEmpty(appId)) { return; }

            let appToken = this.getAppToken();
            if (lodash.isEmpty(appToken)) { return; }

            let stringA: string = "";

            let allKeys = Object.keys(map);
            allKeys.sort();
            for (var x in allKeys) {
                let key = allKeys[x];
                if (stringA == "") stringA += key + "=" + map[key];
                else stringA += "&" + key + "=" + map[key];
            }
            // for (var key in map) {
            //     if (stringA == "") stringA += key + "=" + map[key];
            //     else stringA += "&" + key + "=" + map[key];
            // }
            //let r:string="appid="+this.appId+"&nonce_str="+this.nonce_str+"&platform="+this.platform;
            stringA += (!!webGameKey ? ("&key=" + webGameKey) : ("&key=" + appToken));
            console.log("md5之前签名---" + stringA);
            let sign: string = kaayou.MD5.encode(stringA).toLowerCase();
            return sign;
        }

        // @BindEvent('common', 'ui::BuyCardRecordPanel::Show')
        async Show(modname: string) {
            let self = this;
            //console.log("BuyCardRecordPanel self" + self);
            self.setVisible(true);
            //面板初始化
            //先清空容器
            if (!self.ScrollView || !self.Panel_cell) { self.Hide(); return false; }
            kaayou.pool.putAllChildrenInPool(self.ScrollView);
            self.ScrollView.removeAllChildren();

            if (self.tipImage_CheckBox) self.tipImage_CheckBox.visible = false;
            if (self.tip_CheckBox) self.tip_CheckBox.visible = true;
            if (self.Text_lefttime) self.Text_lefttime.setString("");

            let cardRecordUrl = this.getCardRecordUrl();
            if (lodash.isEmpty(cardRecordUrl)) {
                kaayou.emit('common', 'ui::Toast::Show', { msg: "商品列表地址没有配置，请联系客服" });
                return;
            }

            let appId = this.getAppID();
            if (lodash.isEmpty(appId)) {
                kaayou.emit('common', 'ui::Toast::Show', { msg: "支付地址，请联系客服" });
                return;
            }

            let platform = cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS ? "2" : "1";

            kaayou.emit('common', "ui::Loading::Show");
            let map = {
                appid: appId,
                userid: lobby.mod.User.getInstance().getUserInfo().uid.toString(),
                platform: platform,
                nonce_str: parseInt(Math.random().toString().substr(2, 10)).toString(16),
            };
            let sign: string = this.getSign(map);
            map["sign"] = sign;
            let res: any = await kaayou.Http.POST(cardRecordUrl + "/circler/api/goods", map);
            kaayou.emit("common", "ui::Loading::Hide");
            let tempRes = JSON.parse(res);
            if (tempRes.status) {
                kaayou.emit('common', 'ui::Toast::Show', { msg: tempRes.message || "获取记牌器购买信息失败！" });
                return;
            }

            let data: Array<ProductInfo> = tempRes.data.recorder;
            if (!data || data.length == 0) { self.Hide(); return false; }

            //动态设置
            let left_right: number = 0;
            let spacingX: number = 0;
            if (data.length >= 3) {
                left_right = 65;
                spacingX = 50;
            } else {
                left_right = (740 - self.Panel_cell.getContentSize().width * data.length) / (data.length + 1);
                spacingX = left_right;
            }
            self.ScrollView.setPadding({ left: left_right, right: left_right, top: 7.5, bottom: 7.5, spacingX: spacingX });
            self.ScrollView.setScrollBarEnabled(false);

            //循环创建产品列表
            self.cellInfoArr = lodash.cloneDeep(data);
            self.curChooseIndex = 1;
            for (let i = 0; i < data.length; i++) {
                let cell = self.createCell();
                cell.setInfo(data[i], i + 1);
                cell.setChoose(i + 1 == self.curChooseIndex);
                self.ScrollView.addChild(cell);
            }
            self.ScrollView.doChildrenLayout();

            //设置剩余时间
            kaayou.emit('common', "ui::Loading::Show");
            let tempdata = await kaayou.sendMessage(modname, 'toollist', {}, 'ws::Msg::toollist');
            kaayou.emit("common", "ui::Loading::Hide");
            if (!tempdata || tempdata.deadat == undefined) { self.Hide(); return false; }
            if (tempdata.deadat == 0) {
                self.Text_lefttime.setString("到期时间:未开通");
            } else {
                let date = new Date(tempdata['deadat'] * 1000).Format('yyyy/MM/dd hh:mm');
                if (self.Text_lefttime) {
                    self.Text_lefttime.setString("到期时间:" + date);
                }
            }
        }

        async ExChangeCardRecord() {
            let self = this;

            if (!self.cellInfoArr || self.cellInfoArr.length <= 0) return;
            if (self.curChooseIndex <= 0 || self.curChooseIndex > self.cellInfoArr.length) return;

            //客户端不校验钻石数量，免得和服务端不一致
            // if (lobby.mod.User.getInstance().getUserInfo().diamond < self.cellInfoArr[self.curChooseIndex - 1].price) {
            //     kaayou.emit('common', 'ui::Toast::Show', { msg: "钻石不足，无法兑换" });
            //     return;
            // }

            let cardRecordUrl = this.getCardRecordUrl();
            if (lodash.isEmpty(cardRecordUrl)) { return; }

            let appId = this.getAppID();
            if (lodash.isEmpty(appId)) { return; }

            kaayou.emit('common', "ui::Loading::Show");
            let map = {
                appid: appId,
                userid: lobby.mod.User.getInstance().getUserInfo().uid.toString(),
                gid: self.cellInfoArr[self.curChooseIndex - 1].id.toString(),
                nonce_str: parseInt(Math.random().toString().substr(2, 10)).toString(16),
            };
            let sign: string = this.getSign(map);
            map["sign"] = sign;
            let res: any = await kaayou.Http.POST(cardRecordUrl + "/circler/api/exrecorder", map);
            kaayou.emit("common", "ui::Loading::Hide");
            let tempRes = JSON.parse(res);
            if (tempRes.status == 0) {
                kaayou.emit('common', 'ui::Toast::Show', { msg: "兑换成功，记牌器功能下局生效" });
            } else if (tempRes.status == -11) {
                kaayou.emit('common', 'ui::Toast::Show', { msg: "钻石不足" });
            } else if (tempRes.status == -10) {
                kaayou.emit('common', 'ui::Toast::Show', { msg: "兑换失败，请稍后再试" });
            } else {
                kaayou.emit('common', 'ui::Toast::Show', { msg: "其他原因，请联系客服" });
            }
        }

        @BindEvent('common', 'ui::BuyCardRecordPanel::ProductSelected')
        ProductSelected(index: number) {
            let self = this;
            self.curChooseIndex = index;
            for (let i = 0; i < self.ScrollView.childrenCount; i++) {
                if (i + 1 == index) {
                    (<BuyCardRecordPanelCell>self.ScrollView.children[i]).setChoose(true);
                } else {
                    (<BuyCardRecordPanelCell>self.ScrollView.children[i]).setChoose(false);
                }
            }
        }

        // @BindEvent('common', 'ui::BuyCardRecordPanel::Hide')
        Hide() {
            this.setVisible(false)
        }
    }

    export class BuyCardRecordPanelCell extends kaayou.Block {

        index: number = 0;
        btn_buy: ccui.Button = null;
        fnt_date: ccui.Text = null;
        fnt_zhuanshi: ccui.Text = null;
        Image_choose: ccui.ImageView = null;

        constructor() {
            super();
        }

        initWithNode(node: ccui.Widget) {
            let self = this;
            super.initWithNode(node);

            self.btn_buy = ccui.helper.seekWidgetByName(<ccui.Widget>self.node, "btn_buy");
            self.btn_buy.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.emit("common", "ui::BuyCardRecordPanel::ProductSelected", self.index);
            }, this);

            self.fnt_date = ccui.helper.seekWidgetByName(<ccui.Widget>self.node, "fnt_date");
            self.fnt_zhuanshi = ccui.helper.seekWidgetByName(<ccui.Widget>self.node, "fnt_zhuanshi");
            self.Image_choose = ccui.helper.seekWidgetByName(<ccui.Widget>self.node, "Image_choose");
            if (self.Image_choose) self.Image_choose.visible = false;
        }

        setInfo(data: ProductInfo, index: number) {
            let self = this;
            self.index = index;
            self.fnt_date.setString(data.num + "天");
            self.fnt_zhuanshi.setString("X" + data.price);
        }

        setChoose(b: boolean) {
            let self = this;
            if (self.Image_choose) {
                self.Image_choose.visible = b;
            }
        }

        unuse() {
            let self = this;
            self.fnt_date.setString("");
            self.fnt_zhuanshi.setString("");
            self.Image_choose.setVisible(false);
            self.node.removeFromParent();
        }
    }
}