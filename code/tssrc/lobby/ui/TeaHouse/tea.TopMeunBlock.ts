namespace tea {
    const { BindEvent, doBindEvent } = kaayou._decorator;
    export class TopMenuBlock extends kaayou.Layer {
        bActivity = false;
        bCardPool = false;
        bLuck = false;
        btnActivity: ccui.Button = null;
        btnGive: ccui.Button = null;
        btnInvite: ccui.Button = null;
        btnMatch: ccui.Button = null;
        btnMessageBox: ccui.Button = null;
        ivLuckPoint: ccui.ImageView = null;
        ivTired: ccui.ImageView = null;
        lbTired: ccui.Text = null;
        leftMenuGroup: ccui.Layout = null;
        rightMenuGroup: ccui.Layout = null;
        centerMenuGroup: ccui.Layout = null;

        left_menuBlock_layout: ccui.Layout = null;
        constructor() {
            super();
            this.initUI();
        }

        authTop() {
            let role = tea.mod.__teaHouseInfo.urole;
            let configData = common.mod.Config.GetAppConfig();
            let fcm = configData.feature.pl;
            let isSwitch = tea.mod.__teaHouseInfo.isvitamin;
            let iGive = tea.mod.__teaHouseInfo.ismembersend;
            this.btnGive.setVisible(false);
            // if (fcm && isSwitch) {
            //     this.ivTired.setVisible(true);
            // } else {
            //     this.ivTired.setVisible(false);
            // }
            this.ivTired.setVisible(false);
            this.btnMessageBox.setVisible(false);
            //lw190618亲友圈消息
            if (role == HouseMemberRole.OWNER) {
                this.ivCardPool.setVisible(tea.mod.__teaHouseInfo.card_pool);
                this.btnMessageBox.setVisible(true);
            } else {
                this.ivCardPool.setVisible(false);
            }
            //200228普通玩家看不到比赛场
            // if (role == HouseMemberRole.MEMBER && tea.mod.__teaHouseInfo.vice_partner == false) {
            //     this.btnMatch.setVisible(false);
            // }
            //200516关闭比赛场
            this.btnMatch.setVisible(false);
            this.left_menuBlock_layout.doChildrenLayout();
            this.rightMenuGroup.doChildrenLayout();
            this.blinkActivity();
        }

        @doBindEvent
        initUI() {
            this.initWithccs(tea.res.TopMenuBlock_json, true);
            let self = this;

            this.initLeft();
            this.initRight();
            this.initCenter();
        }

        btn_close: ccui.Button = null;
        btn_help: ccui.Button = null;
        hid_label: ccui.Text = null;
        curOnline_label: ccui.Text = null;
        btn_fcmRecord: ccui.Button = null;
        inviteLayout: ccui.Layout = null;
        btn_copyCode: ccui.Layout = null;
        _partnerInviteCode = ""
        initLeft() {
            var self = this;
            //左侧菜单
            this.leftMenuGroup = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "left_menu_group");
            this.hid_label = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "tea_hid_label");
            this.curOnline_label = ccui.helper.seekWidgetByName(this.leftMenuGroup, "curOnline_label");
            this.btn_close = ccui.helper.seekWidgetByName(this.leftMenuGroup, "btn_close");

            this.ivTired = ccui.helper.seekWidgetByName(this.leftMenuGroup, "TiredBg");
            this.lbTired = ccui.helper.seekWidgetByName(this.leftMenuGroup, "Tired");
            this.btn_fcmRecord = ccui.helper.seekWidgetByName(this.leftMenuGroup, "btn_PlzDetail");
            this.left_menuBlock_layout = ccui.helper.seekWidgetByName(this.leftMenuGroup, "left_menuBlock_layout");
            this.inviteLayout = ccui.helper.seekWidgetByName(this.left_menuBlock_layout, "inviteLayout");
            this.btn_copyCode = ccui.helper.seekWidgetByName(this.inviteLayout, "Btn_copyCode");
            this.inviteLayout.setVisible(false);
            this.left_menuBlock_layout.setPadding({ spacingY: 0, top: 0 });
            this.left_menuBlock_layout.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Vertical);
            this.left_menuBlock_layout.setVertical(ccui.Layout.LayoutVertical.TOP);
            this.left_menuBlock_layout.doChildrenLayout();
            //赠送
            this.btnGive = ccui.helper.seekWidgetByName(this.leftMenuGroup, "Give");;
            this.btnGive.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit("tea", 'ui::TiredGivePanel::Show');
            }, this);

            //返回
            this.btn_close.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                kaayou.emit("tea", "mod::TeaHouse::Quit");
            }, this);

            this.btn_fcmRecord.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit("tea", 'ui::FcmDecPopLayer::Show')
            }, this);

            //返回
            this.btn_copyCode.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                console.log(self._partnerInviteCode);
                if (kaayou.PlatformMgr.getInstance().sys.copyStringToPasteBoard(self._partnerInviteCode) == "1") {
                    kaayou.emit("common", "ui::Toast::Show", { msg: "复制邀请码成功！" });
                }
            }, this);
            this.unscheduleUpdate();
            this.scheduleUpdate();
            this.update();
        }

        btnShare: ccui.Button = null;
        btn_set: ccui.Button = null;
        ivCardPool: ccui.ImageView = null;
        ivCircle: ccui.ImageView = null;
        initRight() {
            let self = this;
            //右侧侧菜单
            this.rightMenuGroup = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "right_menu_group");
            this.rightMenuGroup.setPadding({ spacingX: 6, right: 10 });
            this.rightMenuGroup.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Grid);
            this.rightMenuGroup.setHorizontal(ccui.Layout.LayoutHorizontal.RIGHT);
            this.rightMenuGroup.setVertical(ccui.Layout.LayoutVertical.TOP);
            this.rightMenuGroup.setGridColumn(5);
            this.rightMenuGroup.doChildrenLayout();

            //分享
            this.btnShare = ccui.helper.seekWidgetByName(this.rightMenuGroup, "btn_share");
            this.btnShare.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit('tea', 'ui::SharePanel::Show', { type: common.mod.SHARE_TYPE.TEAHOUSE_LOBBY });
            }, this);
            //活动按钮
            this.btnActivity = ccui.helper.seekWidgetByName(this.rightMenuGroup, "btn_activity");
            this.btnActivity.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit("tea", 'ui::activityPanel::Show');
            }, this);
            this.ivLuckPoint = ccui.helper.seekWidgetByName(this.rightMenuGroup, "ivLuckPoint");
            this.ivLuckPoint.setVisible(false);
            //设置
            this.btn_set = ccui.helper.seekWidgetByName(this.rightMenuGroup, "btn_set");
            this.btn_set.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                //lw190615好像在别的地方已经写了声音，所以这里不用写
                // kaayou.emit("tea", 'ui::Manager::Show')
                // kaayou.emit("tea", 'ui::SettingMenu::Show');


                kaayou.emit("tea","ui::SettingBlock::Show");

            }, this);

            //lw190615卡池
            this.ivCardPool = ccui.helper.seekWidgetByName(this.rightMenuGroup, "CardPool");
            this.ivCardPool.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit("common", "ui::Toast::Show", { msg: "卡池开启中，优先消耗卡池的房卡" });
            }, this);
            kaayou.getController('tea').on('ui::TeaHouse::RefreshCardPool', function (e: kaayou.Event) {
                self.bCardPool = tea.mod.__teaHouseInfo.card_pool;
                self.authTop();
                if (tea.mod.__teaHouseInfo.card_pool) {
                    kaayou.emit('common', 'ui::Toast::Show', { msg: "卡池开启中，优先消耗卡池房卡" });
                }
            }, this, 10);
            this.ivCircle = ccui.helper.seekWidgetByName(this.rightMenuGroup, "Circle");
            this.ivCircle.stopAllActions();
            let action = cc.repeatForever(cc.rotateBy(2, 360));
            this.ivCircle.runAction(action);

            //lw190615消息
            this.btnMessageBox = ccui.helper.seekWidgetByName(this.rightMenuGroup, "MessageBox");
            this.btnMessageBox.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit("tea", 'ui::MessageBox::Show');
            }, this);

            //邀请
            this.btnInvite = ccui.helper.seekWidgetByName(this.rightMenuGroup, "Invite");;
            this.btnInvite.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit("tea", 'ui::SendInvitePanel::Show');
            }, this);
            this.btnInvite.setVisible(false);

            //lw200218比赛场
            this.btnMatch = ccui.helper.seekWidgetByName(this.rightMenuGroup, "btnMatch");
            // this.btnMatch.on(kaayou.TouchEvent.TouchEnd, function () {
            //     kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
            //     kaayou.emit("tea", 'ui::MatchMenuPanel::Show');
            // }, this);

            kaayou.getController('tea').on('ui::TeaHouse::UpdateTiredBlock', function (e: kaayou.Event) {
                self.authTop();
            }, this, 10);

            // kaayou.getController('tea').on('ui::TeaHouse::UpdateMatchSwitch', function (e: kaayou.Event) {
            //     self.btnMatch.setVisible(e.data.game_on);
            //     self.authTop();
            //     self.rightMenuGroup.doChildrenLayout();
            // }, this, 10);

            this.rightMenuGroup.doChildrenLayout();
        }

        btn_tea_edit: ccui.ImageView = null;
        label_title: ccui.Text = null;
        // label_teaid: ccui.Text = null;
        initCenter() {
            this.centerMenuGroup = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "center_menu_group");
            //编辑亲友圈
            // this.btn_tea_edit = ccui.helper.seekWidgetByName(this.centerMenuGroup, "btn_tea_edit");

            //亲友圈名字
            this.label_title = ccui.helper.seekWidgetByName(this.centerMenuGroup, "label_title");
        }

        @BindEvent('tea', 'ui::TeaHouse::UpdateInfo')
        onTeaHouseUpdateInfo(data: tea.Data_HouseInfo) {
            let self = this;
            this.label_title.setString(data.hname);
            this.hid_label.setVisible(!data.ishidhide);
            let hidStr = "圈号:" + data.hid.toString();
            this.hid_label.setString(hidStr);
            this.curOnline_label.setString("在线:" + ((data.onlinecur == -1) ? "" : data.onlinecur));
            this.curOnline_label.setVisible(!!(data.onlinecur != -1));
            this.lbTired.setString(data.vitamin.toString());
            let configs = common.mod.Config.AppConfig;
            let feature: IFeature = lodash.extend({}, configs.feature);
            this.btnActivity.setVisible(!!feature.fa);
            self.ivCardPool.setVisible(data.card_pool);
            //this.btnMatch.setVisible(data.admin_game_on && data.game_on);
            this.btnMatch.setVisible(false);
            this.authTop();
        }

        @BindEvent("tea", "ui::TeaHouse::PartnerInvite")
        onShowInvited(data: { invitCode: string }) {
            if (!!data.invitCode) {
                (<ccui.Text>this.inviteLayout.getChildByName("inviteCode")).setString(data.invitCode);
                this.inviteLayout.setVisible(true);
                this.left_menuBlock_layout.doChildrenLayout();
                this._partnerInviteCode = data.invitCode;
            } else {
                this.inviteLayout.setVisible(false);
                this.left_menuBlock_layout.doChildrenLayout();
            }
        }

        @BindEvent("tea", "ui::TopMenuBlock::setActivityStatus")
        dosetAcStatus(data: { status: boolean }) {
            if (data && data.status) {
                this.btnActivity.stopAllActions();
                this.btnActivity.loadTextureNormal("tmbActivitystart.png", ccui.Widget.PLIST_TEXTURE);
                this.btnActivity.loadTexturePressed("tmbActivityStart_deep.png", ccui.Widget.PLIST_TEXTURE);
                this.bActivity = true;
                this.blinkActivity();
            } else {
                this.btnActivity.stopAllActions();
                this.btnActivity.loadTextureNormal("tmbActivity_dis.png", ccui.Widget.PLIST_TEXTURE);
                this.btnActivity.loadTexturePressed("tmbActivity_dis.png", ccui.Widget.PLIST_TEXTURE);
                this.bActivity = false;
                this.authTop();
            }
        }

        @BindEvent("tea", "ui::TopMenuBlock::setLuckStatus")
        setLuckStatus(data: { status: boolean }) {
            if (data && data.status) {
                this.bLuck = true;
                this.btnActivity.stopAllActions();
                this.btnActivity.setVisible(true);
                this.ivLuckPoint.setVisible(true);
            } else {
                this.bLuck = false;
                this.ivLuckPoint.setVisible(false);
                this.blinkActivity();
            }
        }

        @BindEvent("tea", "ui::Teahouse::UpdateOnline")
        doUpdateOnline(data) {
            if (!!data) {
                this.curOnline_label.setString(((data.unums == -1) ? "" : "在线:" + data.unums));
                this.curOnline_label.setVisible(!!(data.unums != -1));
                if (!!tea.mod.__teaHouseInfo && tea.mod.__teaHouseInfo.hid) {
                    if (this.bActivity) {
                        this.btnActivity.setVisible(true);
                        this.btnActivity.stopAllActions();
                    }
                    this.hid_label.setVisible(!mod.__teaHouseInfo.ishidhide);
                    this.hid_label.setString("圈号:" + kaayou.Identify.addPreZero(tea.mod.__teaHouseInfo.hid, 6));
                    this.lbTired.setString(data.vitamin);
                    this.authTop();
                }
            }
        }

        @BindEvent("tea", "ui::TeaHouse::HideHID")
        hideHID(data) {
            if (!!data && !!mod.__teaHouseInfo) {
                if (data.hid == mod.__teaHouseInfo.hid) {
                    this.hid_label.setVisible(!data.ishidhide);
                }
            }
        }

        @BindEvent("tea", "ui::TeaHouse::HideOnlineCount")
        hideOnlineCount(data) {
            if (!!data && !!mod.__teaHouseInfo) {
                //lw200511圈主不隐藏
                // let role = tea.mod.__teaHouseInfo.urole;
                // if (data.hid == mod.__teaHouseInfo.hid && role != HouseMemberRole.CREATER) {
                //     this.curOnline_label.setString(((data.onlinecur == -1) ? "" : "在线:" + data.onlinecur)); //在线人数
                //     this.curOnline_label.setVisible(!data.isonlinehide);//true表示隐藏
                // }
                this.curOnline_label.setString(((data.onlinecur == -1) ? "" : "在线:" + data.onlinecur)); //在线人数
            }
        }

        blinkActivity() {
            if (this.bActivity && !this.bLuck) {
                let blinkAction = cc.blink(2, 1);
                this.btnActivity.runAction(blinkAction.repeatForever());
            }
        }

        _getOnlineTime: number = 0
        update() {
            if (kaayou.UIManager.getInstance().getCurRuningSceneName() != "TEAHOUSE") {  //判断当前场景是不是亲友圈场景不是旧return
                return;
            }
            this._getOnlineTime += 1 / 60;
            if (this._getOnlineTime < 10) {
                return;
            }
            this._getOnlineTime = 0;
            kaayou.emit("tea", "mod::teahouse::getOnline");
        }
    }
}