//外国IP
namespace lobby {
    const { BindEvent, doBindEvent } = kaayou._decorator;

    export class ForeignIPPanelMgr {
        static __INS__: ForeignIPPanelMgr = null;
        static getInstance(_zOrder: number = 0) {
            if (ForeignIPPanelMgr.__INS__ == null) {
                ForeignIPPanelMgr.__INS__ = new ForeignIPPanelMgr();
                ForeignIPPanelMgr.__INS__.init();
                ForeignIPPanelMgr.__INS__._zOrder = _zOrder;
            }
            return ForeignIPPanelMgr.__INS__;
        }
        public _zOrder = 0;
        private _renamePanel: ForeignIPPanel;
        __selfPanel: ForeignIPPanel = null;
        init() {
            let self = this;
            this._renamePanel = null;
            kaayou.getController('lobby').on('ui::ForeignIPPanel::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show(e.data);
            }, this, 10);

            kaayou.getController('lobby').on('ui::ForeignIPPanel::Hide', function (e: kaayou.Event) {
                if (!self.__selfPanel) {
                    return;
                }
                self.getPanel(false).Hide();
            }, this, 10);
            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new ForeignIPPanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel, this._zOrder);    //这个地方怎么不管用？？？
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            if (this.__selfPanel) {
                return this.__selfPanel;
            }
        }
    }

    export class ForeignIPPanel extends kaayou.Layer {
        btnClose: ccui.Button = null;
        ivBg: ccui.ImageView = null;
        contentPanel: ccui.Layout = null;
        ebIdCard: any = null;
        ebName: any = null;
        lbIdCardErr: ccui.Text = null;
        lbNameErr: ccui.Text = null;
        maskBg: cc.Layer = null;
        ndIdCard: cc.Layer = null;
        ndName: cc.Layer = null;

        msgLabel: ccui.Text = null;
        //titleLabel: ccui.Text = null;

        edx_name: ccui.TextField = null;
        edx_cert: ccui.TextField = null;

        boxAPI = null;
        constructor() {
            super();
            this.initUI();
        }
        @doBindEvent
        initUI() {
            this.initWithccs(lobby.res.ForeignIPPanel_json);
            let self = this;
            this.ivBg = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "ivBg");


            this.lbNameErr = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "NameErr");
            this.lbIdCardErr = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "IDCardErr");

            this.ndName = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "input_name");
            this.ndIdCard = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "input_id");
            this.maskBg = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "maskbg");
            this.contentPanel = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "contentPanel");
            this.btnClose = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btnClose");

            this.btnClose.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.Hide();
            }, this)

            this.edx_name = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "nameErr");
            this.edx_cert = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "IDCardErr");
            self.Hide();
        }

        Show(url) {
            NetImage.setPlayerHead(this.ivBg, url);
            this.setVisible(true);
            kaayou.pop.showAni({
                cNode: this.node.getChildByName("contentPanel"),
                mNode: this.node.getChildByName("maskbg"),
                action: function () {
                }
            });
        }
        Hide() {
            kaayou.pop.hideAni(
                {
                    cNode: this.node.getChildByName("contentPanel"),
                    mNode: this.node.getChildByName("maskbg"),
                    rnode: this,
                    action: function () {
                    }
                }
            )
        }
    }
}