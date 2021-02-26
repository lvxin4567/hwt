namespace lobby {
    const { BindEvent, doBindEvent } = kaayou._decorator;

    export class CustomerServicePanelMgr {
        static __INS__: CustomerServicePanelMgr = null;
        static getInstance(_zOrder: number = 0) {
            if (CustomerServicePanelMgr.__INS__ == null) {
                CustomerServicePanelMgr.__INS__ = new CustomerServicePanelMgr();
                CustomerServicePanelMgr.__INS__.init();
                CustomerServicePanelMgr.__INS__._zOrder = _zOrder;
            }
            return CustomerServicePanelMgr.__INS__;
        }
        __selfPanel: CustomerServicePanel = null;
        public _zOrder = 0;
        init() {
            let self = this;
            this.__selfPanel = null;
            kaayou.getController('lobby').on('ui::CustomService::ShowData', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).onWechatUpdate(e.data);
            }, this, 10);

            kaayou.getController('lobby').on('ui::CustomerService::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show();
            }, this, 10);
            kaayou.getController('lobby').on('ui::CustomerService::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new CustomerServicePanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel, this._zOrder);
                //this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }
    }

    export class CustomerServicePanel extends kaayou.Layer {
        maskBg: cc.Layer = null;
        contentPanel: ccui.Layout = null;
        btnPanel: ccui.Layout = null;
        btn_close: ccui.Button = null;
        //msgLabel: ccui.Text = null;
        titleLabel: ccui.Text = null;
        btn_copys: Array<ccui.Button> = null;
        text_names: Array<ccui.Text> = null;
        text_wechats: Array<ccui.Text> = null;
        Telephone: ccui.Text = null;
        CallButton: ccui.Button = null;

        constructor() {
            super();
            this.initUI();
        }
        // @doBindEvent
        initUI() {
            this.initWithccs(lobby.res.CustomerServicePanel_json);
            let self = this;
            this.maskBg = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "maskbg");
            this.contentPanel = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "contentPanel");
            this.btn_close = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_close");
            this.titleLabel = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "titleLabel");
            this.Telephone = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Telephone");
            this.CallButton = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "CallButton");

            this.btn_copys = [];
            this.text_names = [];
            this.text_wechats = [];
            //把控件遍历加入数组
            for (let i = 1; i < 4; i++) {
                let a: ccui.Button = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Copy" + i);
                let b: ccui.Text = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Name" + i);
                let c: ccui.Text = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Wechat" + i);
                this.btn_copys.push(a);
                this.text_names.push(b);
                this.text_wechats.push(c);
                b.ignoreContentAdaptWithSize(true);
                c.ignoreContentAdaptWithSize(true);
            }
            //复制
            for (let i = 0; i < 3; i++) {
                this.btn_copys[i].on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                    kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                    if (kaayou.PlatformMgr.getInstance().sys.copyStringToPasteBoard(this.text_wechats[i].string) == "1") {
                        kaayou.PlatformMgr.getInstance().sys.jumpWeChatImmediacy();
                    }
                }, this);
            }
            //Call
            this.CallButton.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.PlatformMgr.getInstance().sys.OpenCallPhone(this.Telephone.string);
            }, this);
            //关闭
            this.btn_close.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.Hide();
            }, this);

            self.Hide();
        }

        Show() {
            kaayou.emit("lobby", "mod::CustomService::GetList");
            let configData = common.mod.Config.GetAppConfig().kfinfo;
            if (configData) {
                if (configData.kftel) {
                    this.Telephone.string = configData.kftel;
                }

            }
            this.setVisible(true);
            kaayou.pop.showAni({
                cNode: this.node.getChildByName("contentPanel"),
                mNode: this.node.getChildByName("maskbg")
            });
        }

        Hide() {
            kaayou.pop.hideAni(
                {
                    cNode: this.node.getChildByName("contentPanel"),
                    mNode: this.node.getChildByName("maskbg"),
                    rnode: this
                }
            )
        }

        // onConfigUpdate() {
        //     this.Telephone.setString(common.mod.Config.GetAppConfig().kfinfo.tel || '');
        // }

        onWechatUpdate(data) {
            data=data||[];
            for (let i = 0; i < 3; ++i) {
                this.text_names[i].string = data.we_chat[i]?data.we_chat[i].name?data.we_chat[i].name:"客服微信":"客服微信";
                this.text_wechats[i].string = data.we_chat[i]?data.we_chat[i].wx?data.we_chat[i].wx:"douqi801":"douqi801";
            }
            this.Telephone.setString(data.mobile);
        }
    }
}