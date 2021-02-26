namespace lobby {
    var { BindEvent, doBindEvent } = kaayou._decorator;

    export class lobbyBottomBindIDPanelMgr {
        static __INS__: lobbyBottomBindIDPanelMgr = null;
        static getInstance(_zOrder: number = 0) {
            if (lobbyBottomBindIDPanelMgr.__INS__ == null) {
                lobbyBottomBindIDPanelMgr.__INS__ = new lobbyBottomBindIDPanelMgr();
                lobbyBottomBindIDPanelMgr.__INS__.init();
                lobbyBottomBindIDPanelMgr.__INS__._zOrder = _zOrder;
            }
            return lobbyBottomBindIDPanelMgr.__INS__;
        }
        _zOrder: number = 0
        __selfPanel: lobbyBottomBindIDPanel = null;
        init() {
            let self = this;
            this.__selfPanel = null;

            kaayou.getController('lobby').on('ui::lobbyBottomBindIDPanel::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show();
            }, this, 10);
            kaayou.getController('lobby').on('ui::lobbyBottomBindIDPanel::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new lobbyBottomBindIDPanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel, this._zOrder);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }
    }

    export class lobbyBottomBindIDPanel extends kaayou.ModelLayer {
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
            this.initWithccs(lobby.res.LobbyBindIDPanel_json, true);
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
                // if (!kaayou.Identify.isPureNumber(self.targetUserID)) {
                //     kaayou.emit("common", "ui::Toast::Show", { msg: "玩家ID只能是数字" });
                //     return;
                // }
                kaayou.emit("lobby", "mod::mergeService::GetBindPersonInfo", {
                    code: self.targetUserID
                });
            }, this);

            let sp = new cc["Scale9Sprite"]();
            sp.initWithFile(common.res.alpha_4x4, cc.rect(0, 0, 0, 0), cc.rect(0, 0, 0, 0));
            let eb: cc.Node = cc["EditBox"].create(this.pnlInput.getContentSize(), sp);
            this.ebInput = eb;
            eb.setAnchorPoint(0, 0);
            eb.setPosition(0, 0);
            eb.setOpacity(0);
            eb['setFontSize'](26);
            eb['setFontColor'](cc.color("#B97D55"));
            eb['setInputMode'](6);
            // eb['setMaxLength'](12);
            if (cc.sys.isNative) {
                eb['setTextHorizontalAlignment'](cc.TEXT_ALIGNMENT_CENTER);
            }

            eb['setDelegate'](
                {
                    /**
                     * This method is called when an edit box gains focus after keyboard is shown.
                     * @param {cc.EditBox} sender
                     */
                    editBoxEditingDidBegin: function (sender) {
                        //console.log('editBoxEditingDidBegin');

                    },

                    /**
                     * This method is called when an edit box loses focus after keyboard is hidden.
                     * @param {cc.EditBox} sender
                     */
                    editBoxEditingDidEnd: function (ref) {
                        //console.log('editBoxEditingDidEnd',sender.getString());
                        let gstr = ref.getString();
                        self.targetUserID = gstr;
                    },

                    /**
                     * This method is called when the edit box text was changed.
                     * @param {cc.EditBox} sender
                     * @param {String} text
                     */
                    editBoxTextChanged: function (sender, text) {
                        //console.log('editBoxTextChanged');
                        //self.lbName.setString(text);
                    },

                    /**
                     * This method is called when the return button was pressed.
                     * @param {cc.EditBox} sender
                     */
                    editBoxReturn: function (sender) {
                        //console.log('editBoxReturn',sender.getString());
                    }
                }
            )
            this.pnlInput.addChild(eb);
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
            // this.ebInput.setString("");
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