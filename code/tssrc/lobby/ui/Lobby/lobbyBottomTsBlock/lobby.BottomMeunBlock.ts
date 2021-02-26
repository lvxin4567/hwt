namespace lobby {
    const { doBindEvent, BindEvent } = kaayou._decorator;
    export class BottomMeunBlock extends kaayou.Layer {

        constructor() {
            super();
            this.initWithccs(lobby.res.BottomMeunBlock_json);
            this.initUI();
        }

        
        btn_menu_store: ccui.Layout = null;
        btn_menu_record: ccui.Layout = null;
        btn_menu_share: ccui.Layout = null;
        btn_menu_cs: ccui.Layout = null;
        btn_menu_realName: ccui.Layout = null;
        btn_menu_recruit: ccui.Layout = null;
        btn_menu_bind: ccui.Layout = null;
        btn_reporting:ccui.Button = null;
        btn_menu_greengame: ccui.Layout=null;
        ivSignInRedPoint:ccui.ImageView=null;
        lay_meunLayout: ccui.Layout = null;
        lySignIn:ccui.Layout = null;

        @doBindEvent
        initUI() {
            let self=this;
            this.lySignIn = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "lySignIn");
            this.lySignIn.setPositionX(30);
            this.ivSignInRedPoint=ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "ivSignInRedPoint");
            let anim: sp.SkeletonAnimation = sp.SkeletonAnimation.createWithJsonFile(lobby.res.singInAni_json, lobby.res.singInAni_atlas, 1);
            anim.setAnimation(1, "animation", true);
            anim.setPosition(self.lySignIn.getContentSize().width/2,  0);
            self.lySignIn.addChild(anim);
            this.lySignIn.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.TouchMask.addTouchMask({ soundtype: kaayou.SoundType.NORMAL, masktime: 0.5 });
                kaayou.emit("lobby","ui::SignIn::Show");
                kaayou.emit('lobby','mod::SignIn::Get');
            }, this);

            this.lay_meunLayout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "meunLayout");

            this.btn_menu_store = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_menu_store");
            this.btn_menu_store.getChildByName<ccui.Widget>('btn_menu').setSwallowTouches(false);

            this.btn_menu_realName = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_menu_realName");
            //this.btn_menu_realName.getChildByName<ccui.Widget>('btn_menu').setSwallowTouches(false);

            this.btn_menu_record = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_menu_record");
            this.btn_menu_record.getChildByName<ccui.Widget>('btn_menu').setSwallowTouches(false);

            this.btn_menu_cs = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_menu_cs");
            this.btn_menu_cs.getChildByName<ccui.Widget>('btn_menu').setSwallowTouches(false);

            this.btn_menu_recruit = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_menu_recruit");
            this.btn_menu_recruit.getChildByName<ccui.Widget>('btn_menu').setSwallowTouches(false);

            this.btn_menu_share = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_menu_share");
            this.btn_menu_share.getChildByName<ccui.Widget>('btn_menu').setSwallowTouches(false);

            this.btn_menu_bind = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_menu_bind");
            this.btn_menu_bind.getChildByName<ccui.Widget>('btn_menu').setSwallowTouches(false);
            this.lay_meunLayout.setPadding({ spacingX: 0 });

            this.btn_menu_greengame = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_menu_greengame");
            this.btn_menu_greengame.getChildByName<ccui.Widget>('btn_menu').setSwallowTouches(false);
            this.btn_reporting =  ccui.helper.seekWidgetByName(<ccui.Widget>this.btn_menu_greengame, "btn_reporting");
            this.doBtnLayout();

            let bubble:ccui.Layout = ccui.helper.seekWidgetByName(<ccui.Widget>this.btn_menu_greengame, "sub_container");
            let clickBG:ccui.Layout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "maskbg");

            clickBG.on(kaayou.TouchEvent.TouchEnd, function () {
                clickBG.setVisible(false);
                bubble.setVisible(false);
            },this)

            this.btn_menu_greengame.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                clickBG.setVisible(true);
                bubble.setVisible(true);
            },this);

            this.btn_reporting.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                clickBG.setVisible(false);
                bubble.setVisible(false);
                kaayou.emit('lobby','ui::IllegalReportingPanel::Show')
            },this);


            //招募
            this.btn_menu_recruit.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit("lobby", 'ui::Recruiting::Show');
            }, this);

            //实名认证
            this.btn_menu_realName.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                clickBG.setVisible(false);
                bubble.setVisible(false);
                kaayou.emit('lobby', 'ui::RealNamePanel::Show', { parent: kaayou.UIManager.getInstance().getCurRuningScene() });
            }, this);

            kaayou.getController("lobby").on("ui::BottomMeunBlock:hideBubble",()=>{
                clickBG.setVisible(false);
                bubble.setVisible(false);
            },this)

            kaayou.getController('lobby').on('ui::SignIn::ShowRedPoint', function (e: kaayou.Event) {
                self.showRedPoint(e.data);
            }, this, 10);

            kaayou.getController('lobby').on('ui::SignIn::HideRedPoint', function (e: kaayou.Event) {
                self.ivSignInRedPoint.setVisible(false);
            }, this, 10);

            //商城
            this.btn_menu_store.on(kaayou.TouchEvent.TouchEnd, function () {
                // kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit("lobby", 'ui::Mall::Show');
            }, this);

            //客服
            this.btn_menu_cs.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit("lobby", 'ui::CustomerService::Show');
            }, this);

            //分享
            this.btn_menu_share.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                let shares = common.mod.Config.GetAppConfig().shares;
                // "斗棋", "湖北日报旗下，深耕湖北6年老品牌，100+县市本地玩法应有尽有，点击下载游戏", url
                let data = {
                    type: common.mod.SHARE_TYPE.LOBBY,
                    title: shares.lobby.title,
                    text: shares.lobby.text,
                    url: shares.lobby.url,
                }
                kaayou.emit('lobby', 'ui::ShareModelPanel::Show', data);    
            }, this);

            //战绩
            this.btn_menu_record.on(kaayou.TouchEvent.TouchEnd, function () {
                // kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit("lobby", 'ui::Record::Show');
            }, this);

            //战绩
            this.btn_menu_bind.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                console.log("点击了绑定");
                
                kaayou.emit('lobby', 'ui::lobbyBottomBindIDPanel::Show');
            }, this);

            if (cc.sys.isWeChat) {
                this.lay_meunLayout.setVisible(false)
            }
        }

        @BindEvent("common", 'Config::Update')
        onConfigUpdate() {
            let configs = common.mod.Config.AppConfig;
            let feature: IFeature = lodash.extend({}, configs.feature);
            if (configs && feature) {
                //商城
                this.btn_menu_store.setVisible(!!(feature.ma))
                //招募
                this.btn_menu_recruit.setVisible(!!(feature.zm));
                //战绩
                this.btn_menu_record.setVisible(!!(feature.zj));
                //分享
                this.btn_menu_share.setVisible(!!(feature.fx))
                //客服
                this.btn_menu_cs.setVisible(!!(feature.cs));
                 //绑定
                 this.btn_menu_bind.setVisible(!!(feature.bd));
            }

            //lm200711为提审，特定版本隐藏商城
            let bVersion = kaayou.PlatformMgr.getInstance().sys.GetLocalVersionName();
            console.log("当前大版本",bVersion);
            if ((bVersion == "3.3.3") || (bVersion == "3.3.2")) {
                this.btn_menu_store.setVisible(false)
            }

            this.doBtnLayout();
        }

        @BindEvent("lobby", 'ui::UpdateUserInfo')
        onUserUpdate(data: Data_Uerinfo) {
            if (this.btn_menu_realName.isVisible() == !(data.isCertification)) {
                return;
            }
            this.btn_menu_realName.setVisible(!(data.isCertification));
            this.doBtnLayout();
        }

        showRedPoint(data: proto_task_checkin_ntf_res) {
            if (!data) {
                return;
            }
            this.ivSignInRedPoint.setVisible(!data.checkin);
        }

        doBtnLayout() {
            this.lay_meunLayout.setPadding({ spacingX: 10 });
            this.lay_meunLayout.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Horizontal);
            this.lay_meunLayout.setHorizontal(ccui.Layout.LayoutHorizontal.LEFT);
            this.lay_meunLayout.doChildrenLayout();
        }
    }
}