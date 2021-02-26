namespace lobby {
    var { BindEvent, doBindEvent } = kaayou._decorator;

    export class lobby_BindInfoMgr {
        static __INS__: lobby_BindInfoMgr = null;
        static getInstance(_zOrder: number = 0) {
            if (lobby_BindInfoMgr.__INS__ == null) {
                lobby_BindInfoMgr.__INS__ = new lobby_BindInfoMgr();
                lobby_BindInfoMgr.__INS__.init();
                lobby_BindInfoMgr.__INS__._zOrder = _zOrder;
            }
            return lobby_BindInfoMgr.__INS__;
        }
        _zOrder: number = 0
        __selfPanel: BindInvitePanel = null;
        init() {
            let self = this;
            this.__selfPanel = null;

            kaayou.getController('lobby').on('ui::BindInvitePanel::Show', function (e: kaayou.Event) {
                //lw190724先关闭老窗口
                // self.DialogRemoved();
                // self.removeDialogShow(e.data);
                self.getPanel(true).Show(e.data);
            }, this, 10);
            kaayou.getController('lobby').on('ui::BindInvitePanel::Hide', function (e: kaayou.Event) {
                // self.DialogRemoved();
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new BindInvitePanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel, this._zOrder);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }
    }

    export class BindInvitePanel extends kaayou.ModelLayer {
        constructor() {
            super();
            this.initUI();
        }
        bNoMore: boolean = false;
        btnClose: ccui.Button = null;
        btnJoin: ccui.Button = null;
        btnRefuse: ccui.Button = null;
        // cbNoMore: ccui.CheckBox = null;
        houseId: number = 0;
        inviter: number = 0;
        ivHead: ccui.ImageView = null;
        lbHouseId: ccui.Text = null;
        lbInviter: ccui.Text = null;
        // lbRule: ccui.Text = null;
        lbTable: ccui.Text = null;
        tableId: number = 0;
        inviteUId:ccui.Text = null;
        @doBindEvent
        initUI() {
            this.initWithccs(lobby.res.LobbyBindPanel_json, true);
            this.ivHead = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "head_img");
            this.lbHouseId = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "HouseID");
            this.lbTable = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Table");
            // this.lbRule = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Rule");
            this.lbInviter = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Inviter");
            this.inviteUId = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "bindId");
            //关闭按钮
            this.btnClose = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Close");
            //加入按钮
            this.btnJoin = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "JoinButton");
            //拒绝按钮
            this.btnRefuse = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "RefuseButton");
            // this.cbNoMore = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "NoMore");

            let self = this;
            //关闭
            this.btnClose.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.Hide()
            }, this);
            //加入
            this.btnJoin.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtn);
                kaayou.emit("tea", "mod::TeaHouse::JoinHouse", {
                    hid: self.houseId,
                    invite_uid:Number(self.inviteUId.string)
                });
                self.Hide();
            }, this);
            //拒绝
            this.btnRefuse.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtn);
                self.Hide();
            }, this);

       
        }

        Show(data) {
            let self = this;
            self.tableId = data.tid;
            self.houseId = data.hid;
            self.inviter = data.inviter.uid;
            NetImage.setPlayerHead(self.ivHead, data.inviter.imgurl, data.inviter.gender);
            self.lbHouseId.setVisible(!data.ishidhide);
            self.lbHouseId.setString("您即将加入亲友圈：" + data.hid);
            //self.lbTable.setString("桌号："+(data.nfid+1)+"楼"+(data.ntid+1)+"桌");
            //lw191105改为玩法
            let s = !!data.fname ? data.fname : data.game_name;
            // self.lbTable.setString("玩法：" + s);//
            // self.lbRule.setString("规则：" + data.game_name);
            this.inviteUId.setString(data.inviter.uid);
            self.lbInviter.setString(kaayou.Identify.nickNameSubSix(data.inviter.nickname));
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
                        kaayou.emit('tea', 'ui::InvitePanel::Hide');
                    }
                }
            )
        }
    }
}