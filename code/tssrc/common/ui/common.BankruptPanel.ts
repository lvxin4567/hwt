

namespace common {
    const { doBindEvent, BindEvent } = kaayou._decorator;
    export interface productPkgModel{
        id:number,
        bagname:string,
        desc:string,
        pic_url:string,
        price:number,
        ctime:string,
        status:number,
        sort:number,
        details:Array<{
            productName:string,
            num:number,
            imgUrl:string,
            type:number,
        }>,
        zuanshi:{
            id:number,
            appid:string,
            productName:string,
            price:number,
            num:number,
            imgUrl:string,
            type:number,
            sort:number,
            ioskey:string,
        },
        people:number,
    }



    export class BankruptPanelMgr {
        static __INS__: BankruptPanelMgr = null;
        static getInstance(_zOrder: number = 0) {
            if (BankruptPanelMgr.__INS__ == null) {
                BankruptPanelMgr.__INS__ = new BankruptPanelMgr();
                BankruptPanelMgr.__INS__.init();
                BankruptPanelMgr.__INS__._zOrder = _zOrder;
            }
            return BankruptPanelMgr.__INS__;
        }
        __selfPanel: BankruptPanel = null;
        public _zOrder = 0;

        init() {
            let self = this;
            this.__selfPanel = null;

            kaayou.getController('common').on('ui::BankruptPanel::Show', function (e: kaayou.Event) {
                self.showBankruptPanel(e.data);
            }, this, 10);
            kaayou.getController('common').on('ui::BankruptPanel::Hide', function (e: kaayou.Event) {
                self.hideBankruptPanel();
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new BankruptPanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel, this._zOrder);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }

        showBankruptPanel(data){
            if (!this.__selfPanel) {
                this.__selfPanel = new BankruptPanel();
                kaayou.UIManager.getInstance().getMainScene().addChild(this.__selfPanel);
            }
            this.__selfPanel.Show(data);
        }

        hideBankruptPanel(){
            if (this.__selfPanel) {
                this.__selfPanel.removeFromParent();
                this.__selfPanel = null;
            }
        }


    }


    export class BankruptPanel extends kaayou.ModelLayer {

        constructor() {
            super();
            this.initWithccs(common.res.bankruptPanel_Json);
            this.initUI();
        }
        btn_close: ccui.Button = null;
        label_content:ccui.Text = null; 
        label_count:ccui.Text = null;
        contentPanel:ccui.Layout = null;
        btn_buy:ccui.Button = null;
        label_diamond:ccui.Text = null;
        pkg_img:ccui.ImageView = null;
        initUI() {
            this.isTouchMaskHide = false;
            let self = this;
            this.btn_close = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Close");
            this.btn_close.on(kaayou.TouchEvent.TouchEnd, function () {
                console.log("点击了关闭");
                kaayou.emit("common","ui::BankruptPanel::Hide");
                kaayou.emit("common", "mod::GDGame::getallowanceinfo", {
                    ignore_gift: true, callBack: function (info) {
                        console.log(info);
                        if (info && info.data && info.data.allowance) {    //  有这个时候弹破产补助
                            kaayou.emit("lobby", "ui::DisposeAllowances::Show", info.data.allowance);
                        } else {
                            //弹破产礼包
                            kaayou.emit("common", "ui::BankruptPanel::Show",info.data.gift);
                        }
                    }
                })
            }, this);
            this.pkg_img = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "pkg_img");
            this.label_diamond = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "diamond_label");
            this.label_content = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_content");
            this.contentPanel = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "contentPanel");
            this.label_count = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_Count");
            this.btn_buy = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_sure");
            this.btn_buy.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.TouchMask.addTouchMask({ soundtype: kaayou.SoundType.NORMAL, masktime: 1.5 });
                let userInfo:Data_Uerinfo = lobby.mod.User.getInstance().getUserInfo();
                if (self._data.price <= userInfo.diamond ) {
                    kaayou.emit("lobby", "mod::Mall::ExchangeGiftPkgToGold", {gid:self._data.id,callBack:function () {
                        console.log("----");
                        kaayou.emit("common","ui::BankruptPanel::Hide");
                        kaayou.emit("common","ui::GetRewardSusPanel::Show",{name:self._data.details[0].productName})
                    }})
                    return;
                }
                //去检测是否已经购买了。
                kaayou.emit("lobby","mod::GDGame::check",{callBack:function(){
                    let options = {
                        title: "温馨提示",
                        msg: `钻石不足！是否使用【¥${self._data.zuanshi.price/100}】充值【${self._data.zuanshi.num}钻石】？充值成功后将会为您自动购买【${self._data.details[0].productName}】`,
                        close: {
                            isShow: false,
                        },
                        btns: [
                            {
                                name: "确定",
                                action: function () {
                                    let expend_num = self._data.price;
                                    let expend_type = 4;   //hx写死
                                    let got = [];
                                    lodash.forEach(self._data.details,function(v:{productName:string,num:number,imgUrl:string,type:number},i){
                                        let gotModel = {
                                            wt:Number(v.type),
                                            wn:Number(v.num),
                                        } 
                                        got.push(gotModel);
                                    })
                                    let extra =  JSON.stringify({
                                        expend_num: Number(expend_num),
                                        expend_type: Number(expend_type),
                                        got: got
                                    });
                                   
                    
                                    if (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS) {
                                        kaayou.emit("lobby", "mod::Mall::sendPayBankRupt", { pid: self._data.zuanshi.id, way: 3,extra:extra,grant_type:3 });
                                    } else {
                                        kaayou.emit('common', 'ui::ChannelPanel::Show', {
                                            productname: self._data.bagname,
                                            productmoney:  "钻石"+self._data.price,
                                            onSelected: function (res) {
                                                if (res === 'zfb') {
                                                    kaayou.emit("lobby", "mod::Mall::sendPayBankRupt", { pid: self._data.zuanshi.id, way: 2 ,extra:extra,grant_type:3});
                                                } else if (res === 'wx') {
                                                    kaayou.emit("lobby", "mod::Mall::sendPayBankRupt", { pid: self._data.zuanshi.id, way: 1 ,extra:extra,grant_type:3});
                                                }
                                                kaayou.emit('common', 'ui::ChannelPanel::Hide');
                                            },
                                            onCancel: function (res) {
                            
                            
                                            }
                                        })
                                    }
                                },
                                colorType: 'green'
                            },
                            {
                                name: "取消",
                                colorType: 'blue'
                            }
                        ]
                    }
                    kaayou.emit('common', 'ui::Dialog::Show',options);
                }})
            }, this);
            this.setVisible(false);       
         
 
        }
        _data:productPkgModel = null;
        Show(data:productPkgModel) {
            if (!data) { return; }
            data.people = data.people || 0;
            let self = this;
            // data = data || {gold:100000};
            this._data = data;
            let RichLabelAiSuper = <ccui.RichText>this.node.getChildByName('label_content');
            if (RichLabelAiSuper) {
                RichLabelAiSuper.removeFromParent();
            }
            this.label_diamond.setString(""+data.price);
            this.label_content.setString(data.desc);
            // RichLabelAiSuper = new ccui.RichText();
            // let str1 = new ccui.RichElementText(1, cc.hexToColor('#B07B43'), 255, '输光了！量身推荐', "Arial", 26);
            // let str2 = new ccui.RichElementText(1, cc.hexToColor('#D44716'), 255, ''+data.exchange_gold_num , "Arial", 26);
            // let str3 = new ccui.RichElementText(1, cc.hexToColor('#B07B43'), 255, '金币超值优惠礼包，翻倍报仇', "Arial", 26);
            // RichLabelAiSuper.pushBackElement(str1);
            // RichLabelAiSuper.pushBackElement(str2);
            // RichLabelAiSuper.pushBackElement(str3);
            // RichLabelAiSuper.setAnchorPoint(cc.p(0.5, 0.5));
            // RichLabelAiSuper.ignoreContentAdaptWithSize(true);
            // RichLabelAiSuper.setPosition(this.label_content.getPosition());
            // RichLabelAiSuper.setVisible(true);
            // this.contentPanel.addChild(RichLabelAiSuper);
            // RichLabelAiSuper.setName('rich_label_ai_super');

            let RichLabelAiSuper1 = <ccui.RichText>this.node.getChildByName('label_Count');
            if (RichLabelAiSuper1) {
                RichLabelAiSuper1.removeFromParent();
            }
            RichLabelAiSuper1 = new ccui.RichText();//data.purchased_count + data.base_count
            let countStr1 = new ccui.RichElementText(1, cc.hexToColor('#B07B43'), 255, '已有', "Arial", 24);
            let countStr2 = new ccui.RichElementText(1, cc.hexToColor('#D44716'), 255, ''+(data.people) , "Arial", 24);
            let countStr3 = new ccui.RichElementText(1, cc.hexToColor('#B07B43'), 255, '人抢购', "Arial", 24);
            RichLabelAiSuper1.pushBackElement(countStr1);
            RichLabelAiSuper1.pushBackElement(countStr2);
            RichLabelAiSuper1.pushBackElement(countStr3);
            RichLabelAiSuper1.setAnchorPoint(cc.p(0.5, 0.5));
            RichLabelAiSuper1.ignoreContentAdaptWithSize(true);
            RichLabelAiSuper1.setPosition(cc.p(this.label_count.getPosition().x-70+data.people.toString().length*8,this.label_count.getPosition().y));
            RichLabelAiSuper1.setVisible(true);
            this.contentPanel.addChild(RichLabelAiSuper1);
            RichLabelAiSuper1.setName('rich_label_ai_super1');

            if (!!data.pic_url && data.pic_url.indexOf('http') == 0) {
                this.pkg_img.setVisible(false);
                NetImage.loadImage(data.pic_url).then(function (tex: cc.Texture2D) {
                    if (!self.pkg_img.isRunning() || !self.isRunning()) { return; }
                    (<cc.Sprite>self.pkg_img.getVirtualRenderer()).initWithTexture(tex);
                    self.pkg_img.setVisible(true);
                });
            } 
            this.setVisible(true);
        }
    
    }



}