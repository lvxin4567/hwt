namespace tea {
    var { BindEvent, doBindEvent } = kaayou._decorator;

    export class tea_InviteMgr {
        static __INS__: tea_InviteMgr = null;
        static getInstance(_zOrder: number = 0) {
            if (tea_InviteMgr.__INS__ == null) {
                tea_InviteMgr.__INS__ = new tea_InviteMgr();
                tea_InviteMgr.__INS__.init();
                tea_InviteMgr.__INS__._zOrder = _zOrder;
            }
            return tea_InviteMgr.__INS__;
        }
        _zOrder: number = 0
        __selfPanel: InvitePanel = null;
        memberremovePanel: tea.InvitePanel = null
        init() {
            let self = this;
            this.__selfPanel = null;

            kaayou.getController('tea').on('ui::InvitePanel::Show', function (e: kaayou.Event) {
                //lw190724先关闭老窗口
                self.DialogRemoved();
                self.removeDialogShow(e.data);
            }, this, 10);
            kaayou.getController('tea').on('ui::InvitePanel::Hide', function (e: kaayou.Event) {
                self.DialogRemoved();
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new InvitePanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel, this._zOrder);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }

        removeDialogShow(data) {
            let dialog = new tea.InvitePanel();
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

    export class InvitePanel extends kaayou.ModelLayer {
        constructor() {
            super();
            this.initUI();
        }
        bNoMore: boolean = false;
        btnClose: ccui.Button = null;
        btnJoin: ccui.Button = null;
        btnRefuse: ccui.Button = null;
        cbNoMore: ccui.CheckBox = null;
        fid: number = 0;
        houseId: number = 0;
        inviter: number = 0;
        ivHead: ccui.ImageView = null;
        lbHouseId: ccui.Text = null;
        lbInviter: ccui.Text = null;
        lbRule: ccui.Text = null;
        lbTable: ccui.Text = null;
        ntid: number = 0;
        tableId: number = 0;

        @doBindEvent
        initUI() {
            this.initWithccs(tea.res.InvitePanel_Json, true);
            this.ivHead = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "head_img");
            this.lbHouseId = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "HouseID");
            this.lbTable = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Table");
            this.lbRule = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Rule");
            this.lbInviter = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Inviter");

            //关闭按钮
            this.btnClose = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Close");
            //加入按钮
            this.btnJoin = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "JoinButton");
            //拒绝按钮
            this.btnRefuse = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "RefuseButton");
            this.cbNoMore = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "NoMore");

            let self = this;
            //关闭
            this.btnClose.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.Hide()
            }, this);
            //加入
            this.btnJoin.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtn);
                kaayou.emit("tea", "mod::teahouse::answerInvite", {
                    tid: self.tableId,
                    hid: self.houseId,
                    inviter: self.inviter,
                    agree: true,
                    notips: self.bNoMore
                });
                kaayou.emit("lobby", "mod::RCGame::AreapkgbyRoomid", { roomid: self.tableId });
                self.Hide();
            }, this);
            //拒绝
            this.btnRefuse.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtn);
                kaayou.emit("tea", "mod::teahouse::answerInvite", {
                    tid: self.tableId,
                    hid: self.houseId,
                    inviter: self.inviter,
                    agree: false,
                    notips: self.bNoMore
                });
                self.Hide();
            }, this);

            self.cbNoMore.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.Event) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                //lw190712这时是选择之前的状态
                self.bNoMore = !self.cbNoMore.isSelected();
            }, this);
        }

        Show(data) {
            let self = this;
            self.tableId = data.tid;
            self.houseId = data.hid;
            self.inviter = data.inviter.uid;
            self.fid = data.fid;
            self.ntid = data.ntid;
            NetImage.setPlayerHead(self.ivHead, data.inviter.imgurl, data.inviter.gender);
            self.lbHouseId.setVisible(!data.ishidhide);
            self.lbHouseId.setString("亲友圈：" + data.hid);
            //lw191105改为玩法
            let s = !!data.fname ? data.fname : data.game_name;
            self.lbTable.setString("玩法：" + s);
            self.lbRule.setString("规则：" + data.game_name);
            self.lbInviter.setString("邀请人：" + kaayou.Identify.nickNameSubSix(data.inviter.nickname));
            this.setVisible(true);
            kaayou.pop.showAni({
                cNode: this.node.getChildByName("contentPanel"),
                mNode: this.node.getChildByName("maskbg"),
                action: function () {
                    kaayou.SoundManager.getInstance().playSound(common.SoundRes.YaoQing);
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
                        kaayou.emit('tea', 'ui::InvitePanel::Hide');
                    }
                }
            )
        }
    }
}