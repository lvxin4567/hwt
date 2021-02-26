namespace tea {
    var { BindEvent, doBindEvent } = kaayou._decorator;

    export class TeaHouseScene extends kaayou.kScene {
        mask: ccui.Layout = null;

        constructor() {
            super();
            this.initUI();
        }
        bg_layout: ccui.Layout = null;
        @doBindEvent
        initUI() {
            let self = this;
            this.initWithccs(tea.res.TeaHouse_json);
            let background: cc.Node = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "background");
            background.setContentSize(cc.winSize.width, cc.winSize.height)
            this.bg_layout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "bgLayout");
            this.bg_layout.setContentSize(cc.winSize.width, cc.winSize.height);
            this.bg_layout.getChildren()[1].setVisible(false);
            this.bg_layout.getChildren()[2].setVisible(false);
            cc.spriteFrameCache.addSpriteFrames(tea.res.tableStylePlist);
            this.addChild(new tea.TopMenuBlock());                //顶部菜单mune

            this.addChild(new tea.TableListPanel());             //桌子界面滑动容器，桌子cell
            this.addChild(new tea.BottomMenuBlock());             //底部菜单mune 
            this.addChild(new tea.PmdBlock());                    //茶楼跑马灯
            this.addChild(new tea.ChangeFloorBlock());            //左侧上下楼按钮
            this.addChild(new tea.ChangeFloorPanel());            //左下角切换楼层面板
            // this.addChild(new tea.SettingBlockPanel(),5);            //左下角切换楼层面板

            //防沉迷弹窗层级为15
            tea.tea_AddTableMgr.getInstance();                      //手动加减桌
            tea.tea_AntiIndulgencePanelMgr.getInstance(10);           //防沉迷
            tea.tea_AuthPanelMgr.getInstance(11);   //权限设置
            tea.tea_FcmPlayerDetailMgr.getInstance(20);               //防沉迷玩家详情
            tea.tea_MatchMenuPanelMgr.getInstance();  //比赛场菜单
            tea.tea_MatchPanelMgr.getInstance(10);    //比赛场开关
            tea.tea_TeaFcmDecPopMgr.getInstance(10);               //防沉迷玩家详情
            tea.tea_TeaFcmWareHousePopPanelMgr.getInstance(15);       //防沉迷仓库弹窗
            tea.tea_DistancePanelMgr.getInstance();                //距离设置
            tea.tea_SendInvitePanelMgr.getInstance(25);               //邀请入圈
            tea.tea_ReceiveInvitePanelMgr.getInstance(25);            //接受入圈
            tea.tea_InviteMgr.getInstance(30);                        //在线邀请
            tea.tea_MessageBoxMgr.getInstance();                    //亲友圈消息
            tea.tea_MixFloorMgr.getInstance();                    //混楼
            tea.tea_NoDeskmateMgr.getInstance();                    //禁止同桌
            tea.tea_PartnerMemberPanelMgr.getInstance();            //队长成员调配
            tea.tea_PartnerMemberRecordPanelMgr.getInstance();      //队长成员战绩
            tea.tea_SearchTablePanelMgr.getInstance();  //搜索玩家桌子信息
            tea.Tea_TableDetailPanelMgr.getInstance();            //桌子详情// this.addChild(new tea.TableDetailPanel());             //桌子详情
            // tea.tea_DelaFloorMgr.getInstance();                     //分层设置界面
            tea.tea_TiredEditPanelMgr.getInstance(15);            //比赛分调整
            tea.tea_TiredGiveConfirmPanelMgr.getInstance(15);     //比赛分赠送确认
            tea.tea_TiredGivePanelMgr.getInstance(15);            //比赛分赠送
            // tea.tea_TiredMinSettingPanelMgr.getInstance(15);      //比赛分下限设置   更新了不用了
            // tea.tea_TiredSharingSettingPanelMgr.getInstance(15);      //比赛分扣除设置   更新了不用了
            tea.tea_PartnerMemberPopMgr.getInstance(20)            //比赛分圈主队长查看弹窗

            tea.tea_MemberPanelMgr.getInstance();                 //  this.addChild(new tea.MemberPanel());                 //成员列表

            tea.tea_ManagerPanelMgr.getInstance();                // this.addChild(new tea.ManagerPanel());                //亲友圈管理  
            tea.tea_BlackPanelMgr.getInstance(10);                  //        this.addChild(new tea.BlackListPanel());              //黑名单  
            tea.tea_TeaRecordPanelMgr.getInstance();              //   this.addChild(new tea.RecordPanel());                 //亲友圈回放
            tea.tea_TeaRecordDetailPanelMgr.getInstance(30);        //    this.addChild(new tea.RecordDetail());                //亲友圈详情  
            tea.tea_TeaPrivacyPanelMgr.getInstance(10);             //   this.addChild(new tea.PrivacyPanel());                //亲友圈隐私，就是个开关，是否显示成员
            tea.tea_CardTipsPanelMgr.getInstance(10);
            tea.tea_TeaFrozePanelMgr.getInstance();               //  this.addChild(new tea.FrozePanel());                  //冻结界面  
            tea.tea_TeaSettingPanelMgr.getInstance();            //  this.addChild(new tea.SettingMenuPanel());           //设置界面
            tea.tea_SetFloorVipMemPanelMgr.getInstance(15);    //设置楼层vip
            tea.tea_SettingBlockMgr.getInstance(5);     //全新的设置界面


            tea.tea_NoticePopMgr.getInstance(10);
            // this.addChild(new tea.CreateRoomPanel());             //暂时好像没用 ， 空的
            tea.CreateRoomPanelMgr.getInstance();
            tea.ForbidCaptainPanelManager.getInstance();    //禁止队长娱乐界面
            tea.MemberRemovePanelManager.getInstance();           //成员移除界面
            tea.HouseMemberInfoManager.getInstance();             //成员设置信息界面
            tea.tea_TeaSharePanelMgr.getInstance();               //  this.addChild(new tea.SharePanel());                  //分享界面
            tea.tea_TeaActivityPanelMgr.getInstance();            // this.addChild(new tea.activityPanel())                //活动界面
            tea.tea_TeaCreateActivityPanelMgr.getInstance();      // this.addChild(new tea.createActivityPanel())          //创建活动界面
            tea.tea_AcPriSetMgr.getInstance()                    //活动奖励设置//
            //比赛分管理
            tea.tea_AntiIndulgencePanelControlDialogMgr.getInstance(15); //
            tea.tea_AntiIndulgencPointDialogMgr.getInstance(15);//
            tea.tea_AddMemberDialogMgr.getInstance(15);//增加队长面板
            tea.tea_ChooseFastGameMgr.getInstance(15); // 玩家选择快速进入的游戏
            tea.tea_TeaJoinTableSetPanelMgr.getInstance(10);  //圈主设置入桌设置

            tea.tea_ChooseFastGameMgr.getInstance(15) // 玩家选择快速进入的游戏
            tea.tea_TeaJoinTableSetPanelMgr.getInstance(10);  //圈主设置入桌设置;
            tea.Tea_AuthPowerPanelMgr.getInstance(10);

            tea.tea_TeaShowTablePanelMgr.getInstance(10);

            tea_propotionConfigChangeDialogMgr.getInstance(20);
            // tea.tea_PropotionPanelMgr.getInstance(); //参赛队伍管理
            // tea.tea_ProportionBindDialogMgr.getInstance(20);
            // tea.tea_propotionConfigDialogMgr.getInstance(20);
            // tea.tea_proportionInfoDialogMgr.getInstance(20);
            tea.tea_pertnerDelatedFloorDetailMgr.getInstance(21); //队长删除楼层统计详情弹窗
            tea.tea_setGroupMgr.getInstance(21);
            //合圈功能
            tea.tea_MergeUserPanelMgr.getInstance(15);
            tea.tea_MergeUserCheckDialoglMgr.getInstance(20);
            tea.tea_MergeUserDialoglMgr.getInstance(25);

            tea_WaitingMemberDialogMgr.getInstance(25);

            tea_proportionNoAllianceInfoDialogMgr.getInstance(25);
            tea_RecordNoAllianceInfoDialogMgr.getInstance(24);
            tea_matchRewardsingleConfigDialogMgr.getInstance(25);
            tea_matchRewardteamConfigDialogMgr.getInstance(25)

            tea_propotionFloorConfigDialogMgr.getInstance(25)

            tea_TimePanelMgr.getInstance(15);

            tea_FortuneWheelMgr.getInstance(25);

            tea_VIPFloorConfigDialogMgr.getInstance(10);

            tea_HousegamerecordDialogMgr.getInstance(25);

            tea_RecordDialogMgr.getInstance(100);
            tea.TimeFliterPanelMgr.getInstance(110);


            tea_TeaBgSetMgr.getInstance(10);
            tea_tableBgSetMgr.getInstance(10);
            tea_RankListSetMgr.getInstance(10);
            tea_RankListPanelMgr.getInstance(10)
            HouseMemberInfoManager.getInstance(25);

            kaayou.getController('tea').on('ui::Mask::Show', function (e: kaayou.Event) {
                self.mask = new ccui.Layout();
                self.mask.setSize(cc.winSize);
                self.mask.setAnchorPoint(0, 0);
                //self.mask.setBackGroundColor(cc.color("#000000"));
                //self.mask.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
                self.mask.setVisible(true);
                self.mask.setEnabled(true);
                self.mask.setTouchEnabled(true);
                this.addChild(self.mask);
            }, this, 10);

            kaayou.getController('tea').on('ui::Mask::Hide', function (e: kaayou.Event) {
                if (!!self.mask) {
                    self.mask.removeFromParent();
                    self.mask = null;
                }
            }, this, 10);
        }

        // @BindEvent("common", 'Config::Update')
        onConfigUpdate(data: Ka_APP_CONFIG) {
            // console.log(this);
            // var btncfs = common.mod.Config.AppConfig.btnShow;
            // this.btn_Phone.setVisible(!!btncfs.tel);
            // this.btn_Guest.setVisible(!!btncfs.yk);
            // this.btn_Wechat.setVisible(!!btncfs.wx);
            // this.btns_Layout.doChildrenLayout();
            // return 11111;
        }


        @BindEvent("tea", 'ui::TeaHouse::Clean')
        onTeaHouseClean() {
            kaayou.emit("tea", 'ui::SettingMenu::Hide');
            // kaayou.emit("tea", 'ui::Help::Hide')
            kaayou.emit("tea", 'ui::FrozePanel::Hide')
            kaayou.emit("tea", 'ui::CreateRoom::Hide')
            kaayou.emit("tea", 'ui::ChangeFloor::Hide')
            kaayou.emit("tea", 'ui::BlackList::Hide')
            kaayou.emit("tea", "ui::TableDetail::Hide");
            kaayou.emit("tea", 'ui::Manager::Hide')
            kaayou.emit("tea", 'ui::PrivacyPanel::Hide')
            kaayou.emit("tea", "ui::SearchTablePanel::Hide")
            kaayou.emit("tea", "ui::SettingBlock::Hide");
            kaayou.emit("tea","ui::RankListSetPanel::Hide");
            kaayou.emit("tea","ui::RankListPanel::Hide");
        }
        //队长被取消了之后需要去清理相关界面。隐藏
        @BindEvent("tea", "ui::Tea::capUroleChangeClean")
        capUroleChangeClean() {
            kaayou.emit("tea", "ui::VIPFloorConfigDialog::Hide");
            kaayou.emit("tea", "ui::TeaHouse::HideSetVipFloorMemPanel");
        }

        //管理员被取消了之后需要去清理相关界面。隐藏
        @BindEvent("tea", "ui::Tea::adminUroleChangeClean")
        adminUroleChangeClean() {
            kaayou.emit("tea", "ui::VIPFloorConfigDialog::Hide");
            kaayou.emit("tea", "ui::TeaHouse::HideSetVipFloorMemPanel");
        }

        @BindEvent("tea", 'ui::TeaHouse::Quit')
        onTeaHouseExit() {
            if (!this.isVisible()) {
                return;
            }
            this.onTeaHouseClean();
            kaayou.emit("tea", 'ui::Record::Hide');
            kaayou.emit("tea", 'ui::Member::Hide'); //断线重连不需要关掉这个
            kaayou.emit("tea", "ui::recordDetail::Hide");

            //再次获取亲友圈列表qui对比本地。。。如果直接进去亲友圈就设置快速数据。。。有点小问题
            kaayou.emit("tea", "mod::TeaHouse::doGetList");
            kaayou.UIManager.getInstance().runScene('lobby');
        }

        @BindEvent("tea", "ui::teahouse::changeFloor")
        dochangerFloorAnimation(data: { pos: cc.Point, msg: string }) {
            let str = "";
            let color: cc.Color;
            color = cc.color(255, 255, 255)
            let changeMsg = new ccui.Text(data.msg, "", 30);
            changeMsg.setColor(color);
            changeMsg.setPosition(data.pos);
            this.addChild(changeMsg);

            let sq0 = cc.sequence(
                cc.delayTime(0.08),
                cc.moveBy(0.9, cc.p(0, 100))
            )

            let sq1 = cc.sequence(
                cc.delayTime(0.2),
                cc.fadeTo(0.85, 0),
                cc.callFunc(function () {
                    changeMsg.removeFromParent();
                })
            )

            changeMsg.runAction(cc.spawn([sq0, sq1]));

        }

        @BindEvent("tea", "ui::teaHouse::updateBg")
        updateBg() {
            let teaInfo = tea.mod.__teaHouseInfo;
            if (!teaInfo || !teaInfo.hid) {
                return;
            }
            let teaBgStr = cc.sys.localStorage.getItem(lobby.mod.User.getInstance().getUserInfo().uid + "teaBgInfo" + tea.mod.__teaHouseInfo.hid);
            if (!teaBgStr) {
                let bgDefult = JSON.stringify(tea.mod.__TeaBg);
                cc.sys.localStorage.setItem(lobby.mod.User.getInstance().getUserInfo().uid + "teaBgInfo" + tea.mod.__teaHouseInfo.hid, bgDefult);
            }
            lodash.forEach(this.bg_layout.getChildren(), function (v: ccui.ImageView, i: number) {
                v.setVisible(false);
            })
            let teaBgStr1 = cc.sys.localStorage.getItem(lobby.mod.User.getInstance().getUserInfo().uid + "teaBgInfo" + tea.mod.__teaHouseInfo.hid);
            let teaBgModel = JSON.parse(teaBgStr1);
            this.bg_layout.getChildren()[teaBgModel.teaBg].setVisible(true);

        }


    }
    kaayou.UIManager.getInstance().installScene('teahouse', tea.TeaHouseScene);
}