namespace tea {
    var { BindEvent, doBindEvent } = kaayou._decorator;

    export class tea_SearchTablePanelMgr {
        static __INS__: tea_SearchTablePanelMgr = null;
        static getInstance() {
            if (tea_SearchTablePanelMgr.__INS__ == null) {
                tea_SearchTablePanelMgr.__INS__ = new tea_SearchTablePanelMgr();
                tea_SearchTablePanelMgr.__INS__.init();
                //tea_SearchTablePanelMgr.__INS__._zOrder = _zOrder;
            }
            return tea_SearchTablePanelMgr.__INS__;
        }
        __selfPanel: SearchTablePanel = null;
        init() {
            let self = this;
            this.__selfPanel = null;

            kaayou.getController('tea').on('ui::SearchTablePanel::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show();
            }, this, 10);
            kaayou.getController('tea').on('ui::SearchTablePanel::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);

            kaayou.getController('tea').on('ui::SearchTablePanel::clear', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).clearInput();
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new SearchTablePanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }
    }

    export class SearchTablePanel extends kaayou.ModelLayer {
        constructor() {
            super();
            this.initUI();
        }
        btnClose: ccui.Button = null;
        btn_Search: ccui.Button = null;
        ebInput: any = null;
        pnlInput: ccui.Layout = null;
        targetUserID: string = "";

        @doBindEvent
        initUI() {
            this.initWithccs(tea.res.TH_SearchTablePanelJson, true);
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

          
            this.ebInput = kaayou.editBox.attachTextEdit(this.node, "InputLayout", "玩家ID", null);


            this.btn_Search.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtn);
                if (self.ebInput.getString().length == 0 || !kaayou.Identify.isPureNumber(self.ebInput.getString())) {
                    kaayou.emit("common", "ui::Toast::Show", { msg: "玩家ID不合法" });
                    return;
                }
                kaayou.emit("tea", "mod::TeaHouse::MemTableInfo", {
                    uid: parseInt(self.ebInput.getString())
                });
            }, this);

        }

        clearInput(){
            let self = this;
            self.ebInput.setString("");
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
            self.ebInput.setString("");
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