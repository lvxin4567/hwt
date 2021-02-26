namespace tea {
    var { BindEvent, doBindEvent } = kaayou._decorator;

    export class tea_SendInvitePanelMgr {
        static __INS__: tea_SendInvitePanelMgr = null;
        static getInstance(_zOrder: number = 0) {
            if (tea_SendInvitePanelMgr.__INS__ == null) {
                tea_SendInvitePanelMgr.__INS__ = new tea_SendInvitePanelMgr();
                tea_SendInvitePanelMgr.__INS__.init();
                tea_SendInvitePanelMgr.__INS__._zOrder = _zOrder;
            }
            return tea_SendInvitePanelMgr.__INS__;
        }
        _zOrder: number = 0
        __selfPanel: SendInvitePanel = null;
        memberremovePanel: tea.SendInvitePanel = null
        init() {
            let self = this;
            this.__selfPanel = null;

            kaayou.getController('tea').on('ui::SendInvitePanel::Show', function (e: kaayou.Event) {
                //lw190724先关闭老窗口
                self.DialogRemoved();
                self.removeDialogShow(e.data);
            }, this, 10);
            kaayou.getController('tea').on('ui::SendInvitePanel::Hide', function (e: kaayou.Event) {
                self.DialogRemoved();
            }, this, 10);

            kaayou.getController('tea').on('ui::SendInvitePanel::ShowSearchInfo', function (e: kaayou.Event) {
                if(!!self.memberremovePanel){
                    self.memberremovePanel.showSearchInfo(e.data)
                }
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new SendInvitePanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel, this._zOrder);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }

        removeDialogShow(data) {
            let dialog = new tea.SendInvitePanel();
            this.memberremovePanel = dialog;
            kaayou.UIManager.getInstance().getCurRuningScene().addChild(dialog);
            dialog.Show(data);
        }

        DialogRemoved() {
            if (this.memberremovePanel && this.memberremovePanel.isRunning()) {
                this.memberremovePanel.removeFromParent();
            }
            this.memberremovePanel = null;
        }
    }

    export class SendInvitePanel extends kaayou.ModelLayer {
        constructor() {
            super();
            this.initUI();
        }
        btnClose: ccui.Button = null;
        btn_Search: ccui.Button = null;
        ebInput: any = null;
        pnlInput: ccui.Layout = null;
        targetUserID: string = "";
        memberInfoLayout:ccui.Layout = null;
        btn_invite:ccui.Button = null;
        head_img:ccui.ImageView = null;
        @doBindEvent
        initUI() {
            this.initWithccs(tea.res.SendInvitePanel_Json, true);
            //关闭按钮
            this.btnClose = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Close");
            this.btn_Search = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "InviteButton");
            this.pnlInput = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "InputLayout");
            let self = this;
            //关闭
            this.btnClose.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.Hide()
            }, this);
            this.head_img = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "head_img");
            this.memberInfoLayout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "memberInfo_layout");
            this.memberInfoLayout.setVisible(false);

            this.btn_Search.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtn);
                if (!kaayou.Identify.isPureNumber(self.targetUserID)) {
                    kaayou.emit("common", "ui::Toast::Show", { msg: "玩家ID只能是数字" });
                    return;
                }
                kaayou.emit("tea", "mod::teahouse::sendInviteSearch", {
                    hid: tea.mod.__teaHouseInfo.hid,
                    uid: parseInt(self.targetUserID)
                });
            }, this);

            this.btn_invite = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_invite");
            this.btn_invite.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtn);
                if (!kaayou.Identify.isPureNumber(self.targetUserID)) {
                    kaayou.emit("common", "ui::Toast::Show", { msg: "玩家ID只能是数字" });
                    return;
                }
                kaayou.emit("tea", "mod::teahouse::sendInvite", {
                    hid: tea.mod.__teaHouseInfo.hid,
                    uid: parseInt(self.targetUserID)
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
            eb['setMaxLength'](8);
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

        showSearchInfo(data:proto_searchuser_res){
            console.log(data);
            (<ccui.Text>this.memberInfoLayout.getChildByName("label_name")).setString(data.nickname);
            (<ccui.Text>this.memberInfoLayout.getChildByName("label_id")).setString(""+data.uid);

            this.memberInfoLayout.setVisible(true);
            NetImage.setPlayerHead(this.head_img, data.imgurl, 1, (url) => {
                if (!data) { return false; }
                if (url !== data.imgurl) {
                    return false;
                }
                return true;
            });
        }


        Show(data) {
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