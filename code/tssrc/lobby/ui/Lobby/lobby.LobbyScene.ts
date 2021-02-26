//大厅场景
namespace lobby {
    const { doBindEvent, BindEvent } = kaayou._decorator;
    export class LobbyScene extends kaayou.kScene {
        bGirlSpeaking = false;
        currentSeagullIndex = 0;
        currentWaveIndex = 0;
        ivSeagull: ccui.ImageView = null;
        ivWave: ccui.ImageView = null;
        saGirl: sp.SkeletonAnimation = null;
        seagullDelay = 0;
        waveDelay = 0;
        constructor() {
            super();
            this.initUI();
        }

        @doBindEvent
        initUI() {
            let self = this;
            cc.spriteFrameCache.addSpriteFrames(lobby.res.AreaSelectionName_plist);
            cc.spriteFrameCache.addSpriteFrames(lobby.res.wave_plist);
            cc.spriteFrameCache.addSpriteFrames(lobby.res.seagull_plist);
            cc.spriteFrameCache.addSpriteFrames(lobby.res.sweep_plist);
            cc.spriteFrameCache.addSpriteFrames(tea.res.tableStylePlist);
            this.initWithccs(lobby.res.Lobby_json);

            let background: cc.Node = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "background");
            background.setContentSize(cc.winSize.width, cc.winSize.height);

            this.ivSeagull = ccui.helper.seekWidgetByName<ccui.ImageView>(<ccui.Widget>this.node, 'Seagull');
            let seagullStartPos = this.ivSeagull.getPosition();
            let seagullAction1 = cc.fadeIn(1);
            let seagullAction2 = cc.moveBy(5, -400, 0);
            let seagullSpan1 = cc.spawn([seagullAction1, seagullAction2]);
            let seagullAction3 = cc.fadeOut(1);
            let seagullAction4 = cc.moveBy(1, -100, 0);
            let seagullSpan2 = cc.spawn([seagullAction3, seagullAction4]);
            let seagullAction5 = cc.moveTo(1, seagullStartPos);
            let seagullSeq = cc.sequence(seagullSpan1, cc.delayTime(0), seagullSpan2, seagullAction5);
            let seqgullRepeat = cc.repeatForever(seagullSeq);
            this.ivSeagull.runAction(seqgullRepeat);
            this.ivWave = ccui.helper.seekWidgetByName<ccui.ImageView>(<ccui.Widget>this.node, 'Wave');

            let wsc = cc.winSize.width / 1280;
            let hsc = cc.winSize.height / 720;
            let tsize = cc.size(this.ivWave.getContentSize().width * wsc, this.ivWave.getContentSize().height * hsc);
            this.ivWave.setContentSize(tsize);

            this.saGirl = sp.SkeletonAnimation.createWithJsonFile(lobby.res.girlJson, lobby.res.girlAtlas, 1);
            self.saGirl.setVisible(true);
            self.saGirl.setAnimation(0, 'animation', true);
            let layoutGirl: cc.Node = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "girl");
            self.saGirl.setPosition(layoutGirl.getContentSize().width / 2 + 65, -50);
            layoutGirl.on(kaayou.TouchEvent.TouchEnd, function () {
                if (!self.bGirlSpeaking) {
                    self.bGirlSpeaking = true;
                    kaayou.SoundManager.getInstance().playSound(common.SoundRes.Button_People);
                    setTimeout(() => {
                        self.bGirlSpeaking = false;
                    }, 4000);
                }
            }, this);

            layoutGirl.addChild(this.saGirl)


            this.saGirl.setCompleteListener(function () {

            });
            this.addChild(new TopMenuBlock());
            this.addChild(new BottomMeunBlock());
            this.addChild(new GameOptionsBtnGroup());
            this.addChild(new UserInfoBlock());
            // this.addChild(new GDGameBlock());
            // this.addChild(new GDGameRoomPanel());
            this.addChild(new PmdBlock());
           
            //数字输入框
            NumberInputPanelMgr.getInstance(90);
            //游戏中心
            GameCenterMgr.getInstance(100);
            //创建面板
            CreateRoomPanelMgr.getInstance(200);

            //加入游戏面板
            JoinRoomPanelMgr.getInstance(300);

            //招募面板
            RecruitingPanelMgr.getInstance(400);

            //战绩面板  
            LobbyRecordPanelMgr.getInstance(500);

            //战绩详情
            // LobbyRecordDetailMgr.getInstance(600);

            Lobby_RecordDetailDialogMgr.getInstance(600)

            //查看战绩输入编号面板
            JoinRecordPanelMgr.getInstance(700);

            //用户面板
            UserInfoPanelMgr.getInstance(800);
            lobby.ForeignIPPanelMgr.getInstance(850);
            lobby.RealNameMgr.getInstance(900)

            //亲友圈列表
            tea.TeaViewPanelMgr.getInstance(900);
            tea.TeaJoinPanelMgr.getInstance(901);
            tea.TeaDescriptionPanelMgr.getInstance(902);
            // 兑换
            // !cc.sys.isWeChat && this.addChild(new ExchangePanel());


            //商城
            MallPanelMgr.getInstance(1000);

            lobbyMallBindIDPanelMgr.getInstance(1001);
            lobbyExchengeSusMgr.getInstance(1000)
            ChannelPanelMgr.getInstance(301);
            //通知
            NoticePanelMgr.getInstance(1200);

            //分享
            ShareModelPanelMgr.getInstance(1300);
            //绑定界面1
            lobbyBottomBindIDPanelMgr.getInstance(1300); //、
            lobby_BindInfoMgr.getInstance(1301);
            //客服
            CustomerServicePanelMgr.getInstance(1400);
            //绑定手机
            BindPhonePanelMgr.getInstance(1500);
            lobby_SignInMgr.getInstance(1501)   //签到
            lobby_DisposeAllowancesMgr.getInstance(209);   //低保
            tea.tea_SendInvitePanelMgr.getInstance();               //邀请入圈
            tea.tea_ReceiveInvitePanelMgr.getInstance();            //接受入圈
            tea.tea_InviteMgr.getInstance();                        //在线邀请

            IllegalReportingPanelMgr.getInstance(900);

            SuggestionFeedbackPanelMgr.getInstance(1000);

            SuggestionPanelMgr.getInstance(900);
            lobby_authSettingMgr.getInstance(5);
            //区域选择
            AreaSelectionPanelMgr.getInstance(2000);

            ContractPanelMgr.getInstance(5);

            CustomRegOutPanelMgr.getInstance();

            if (this.ivWave.isVisible()) {
                this.scheduleUpdate();
            }
        }

        __isGetNotice = false;
        onReEnter() {
            if (this.__isGetNotice === false) {
                kaayou.emit("lobby", 'mod::Notice::getList', {
                    call: (res) => {
                        console.log(res);
                        if (lodash.isArray(res)) {
                            if (res.length > 0) {
                                kaayou.LayerSeq.getInstance().addLayerSeq("NoticePanel");
                                kaayou.emit("lobby", 'ui::Notice::Show', res);
                            }
                        }
                    }
                });
                this.__isGetNotice = true;
            }
            let userInfo = mod.User.getInstance().getUserInfo();
            let preScene = kaayou.DataSet.get("PreScene");
            let configs = common.mod.Config.AppConfig;
            let feature: IFeature = lodash.extend({}, configs.feature);
            if (lodash.isEmpty(userInfo.tel) && preScene == "Login" && feature.ph && cc.sys.isNative) {
                kaayou.emit('lobby', "ui::BindPhonePanel::Show", { bind: true });
            }
            kaayou.IP.checkIP(lobby.mod.User.getInstance().getUserInfo().ip);            
            kaayou.DataSet.set("PreScene", "Lobby");
        }

        @BindEvent("lobby", "ui::LogOutClean")
        onLogOutClean() {
            this.__isGetNotice = false;
            //创建面板
            kaayou.emit("lobby", 'ui::CreateRoom::Hide');

            kaayou.emit("lobby", 'ui::JoinRoom::Hide');

            kaayou.emit("lobby", 'ui::Recruiting::Hide');

            kaayou.emit('lobby', 'ui::UserInfoPanel::Hide');

            kaayou.emit("lobby", 'ui::GDGameRoomPanel::Hide');

            kaayou.emit("tea", 'ui::Show::Hide');

            kaayou.emit("lobby", 'ui::Mall::Hide');

            kaayou.emit("lobby", 'ui::Notice::Hide');

            kaayou.emit("lobby", 'ui::RuleIntroduce::Hide');

            kaayou.emit('lobby', 'ui::Policy::Hide');

            kaayou.emit('lobby', 'ui::CustomerService::Hide');

            kaayou.emit('lobby', 'ui::Disclaimer::Hide');

            kaayou.emit('lobby', 'ui::RealNamePanel::Hide');

            kaayou.emit('lobby', 'ui::Areas::Hide');

            kaayou.emit("common", 'ui::Share::Hide');

            kaayou.emit('common', 'ui::Loading::Hide', { force: true });

            kaayou.emit('common', 'ui::Dialog::Hide');

            kaayou.emit('common', 'ui::LobbySettingPanel::Hide');

            kaayou.emit('lobby', 'ui::PmdSendLabaPanel::Hide')

            kaayou.emit('lobby', 'ui::SignPanel::Hide')

            // kaayou.emit('lobby', 'ui::GainRewardPanel::Hide')
            kaayou.emit("tea", "ui::FortuneWheel::Hide");

            kaayou.emit("tea", "ui::activityPanel::Hide")

            kaayou.emit('lobby', 'ui::CustomerService::Hide');

            kaayou.emit('lobby', 'ui::BindPhonePanel::Hide');

            kaayou.emit('lobby', 'ui::LobbyPanel::Clear');

            kaayou.emit('lobby',"ui::DisposeAllowances::Hide");
            kaayou.emit("common","ui::BankruptPanel::Hide");
            kaayou.emit("common",'ui::GetRewardSusPanel::Hide')
            kaayou.emit("lobby","ui::lobbyMallBindIDPanel::Hide")
            kaayou.emit('common', 'ui::ChannelPanel::Hide');
            kaayou.UIManager.getInstance().runScene("login");
        }

        onReExit() {
            kaayou.emit('lobby', "ui::BottomMeunBlock:hideBubble");
        }
        @BindEvent("common", "ui::lobbyScene::GoldFall")
        onGoldFallAnimation(){
            let anim: sp.SkeletonAnimation = sp.SkeletonAnimation.createWithJsonFile(lobby.res.reward_json, lobby.res.reward_atlas, 1);
            anim.setAnimation(1, "animation", false);
            anim.setPosition(cc.winSize.width/2,  cc.winSize.height/2);
            anim.setCompleteListener(function(){
                anim.setVisible(false);
                setTimeout(() => {
                    anim.removeFromParent();
                }, 500);
            })
            
            kaayou.UIManager.getInstance().getMainScene().addChild(anim,2000)
        }

        update(dt) {

            if (this.ivWave.isVisible()) {
                this.waveDelay += dt;
                if (this.waveDelay > 0.15) {
                    this.waveDelay = 0;
                    let waveName = "bw" + kaayou.Identify.addPreZero(this.currentWaveIndex, 2) + ".png";

                    if (!!cc.spriteFrameCache.getSpriteFrame(waveName)) {
                        this.ivWave.loadTexture(waveName, ccui.Widget.PLIST_TEXTURE);

                    } else {
                        cc.spriteFrameCache.addSpriteFrames(lobby.res.wave_plist);
                        cc.spriteFrameCache.addSpriteFrames(lobby.res.seagull_plist);
                    }
                    this.currentWaveIndex++;
                    if (this.currentWaveIndex > 18) this.currentWaveIndex = 0;
                }
            }
            if (this.ivSeagull.isVisible()) {
                this.seagullDelay += dt;
                if (this.seagullDelay > 0.15) {
                    this.seagullDelay = 0;
                    let seagullName = "bird" + kaayou.Identify.addPreZero(this.currentSeagullIndex, 4) + ".png";
                    if (!!cc.spriteFrameCache.getSpriteFrame(seagullName)) {
                        this.ivSeagull.loadTexture(seagullName, ccui.Widget.PLIST_TEXTURE);
                    } else {
                        cc.spriteFrameCache.addSpriteFrames(lobby.res.wave_plist);
                        cc.spriteFrameCache.addSpriteFrames(lobby.res.seagull_plist);
                    }

                    this.currentSeagullIndex++;
                    if (this.currentSeagullIndex > 8) this.currentSeagullIndex = 0;
                }
            }
        }
    }

    kaayou.UIManager.getInstance().installScene('lobby', lobby.LobbyScene);
}