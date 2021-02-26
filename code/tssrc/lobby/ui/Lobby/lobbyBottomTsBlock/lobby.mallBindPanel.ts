namespace lobby {
    var { BindEvent, doBindEvent } = kaayou._decorator;

    export class lobbyMallBindIDPanelMgr {
        static __INS__: lobbyMallBindIDPanelMgr = null;
        static getInstance(_zOrder: number = 0) {
            if (lobbyMallBindIDPanelMgr.__INS__ == null) {
                lobbyMallBindIDPanelMgr.__INS__ = new lobbyMallBindIDPanelMgr();
                lobbyMallBindIDPanelMgr.__INS__.init();
                lobbyMallBindIDPanelMgr.__INS__._zOrder = _zOrder;
            }
            return lobbyMallBindIDPanelMgr.__INS__;
        }
        _zOrder: number = 0
        __selfPanel: lobbyMallBindIDPanel = null;
        init() {
            let self = this;
            this.__selfPanel = null;

            kaayou.getController('lobby').on('ui::lobbyMallBindIDPanel::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show();
            }, this, 10);
            kaayou.getController('lobby').on('ui::lobbyMallBindIDPanel::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new lobbyMallBindIDPanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel, this._zOrder);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }
    }

    export class lobbyMallBindIDPanel extends kaayou.ModelLayer {
        constructor() {
            super();
            this.initUI();
        }
        btnClose: ccui.Button = null;
        btnInvite: ccui.Button = null;
        ebInput: any = null;
        pnlInput: ccui.Layout = null;
        targetUserID: string = "";

        @doBindEvent
        initUI() {
            this.initWithccs(lobby.res.mallBindPanel_json, true);
            //关闭按钮
            this.btnClose = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Close");
            this.btnInvite = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "InviteButton");
            this.pnlInput = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "InputLayout");
            let self = this;
            //关闭
            this.btnClose.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.Hide()
            }, this);

            this.btnInvite.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtn);
                kaayou.emit("lobby", "mod::Mall::Binding", {
                    code: self.ebInput.getString()
                });
            }, this);

            let attr = {
                "fontSize": 28,
                "fontColor": "#B97D55",
                "setInputMode": 6,
                "setMaxLength": 20,
                "setPlaceholderFontSize": 28,
            };
            this.ebInput =  kaayou.editBox.attachTextEdit(this.node, "InputLayout", "",null,attr);

        }

        Show() {
            let self = this;
            this.setVisible(true);
            kaayou.pop.showAni({
                cNode: this.node.getChildByName("contentPanel"),
                mNode: this.node.getChildByName("maskbg"),
                action: function () {

                }
            });
        }

        Hide() {
            let self = this;
            this.ebInput.setString("");
            kaayou.pop.hideAni(
                {
                    cNode: this.node.getChildByName("contentPanel"),
                    mNode: this.node.getChildByName("maskbg"),
                    rnode: this,
                    action: function () {
                        kaayou.emit('tea', 'ui::SendInvitePanel::Hide');
                    }
                }
            )
        }
    }
}