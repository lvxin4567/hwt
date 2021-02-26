namespace lobby {
    const { BindEvent, doBindEvent } = kaayou._decorator;
    export class GameOptionsBtnGroup extends kaayou.Layer {
        btnCreate: ccui.Button = null;
        btnJoinTea: ccui.Button = null;
        btnMoreGame: ccui.Button = null;
        btnQuickTeahouse: ccui.Button = null;
        createTeahouseBtn: ccui.Button = null;
        gameButtons: Array<ccui.ImageView> = null;
        gameTexts: Array<ccui.TextBMFont> = null;;
        gameList: Array<{ key: string, name: string }> = null;
        ivBoli: ccui.ImageView = null;
        ivMask: ccui.ImageView = null;
        ivMao: ccui.ImageView = null;
        joinRoomBtn: ccui.Button = null;
        joinRoomBtn1: ccui.Button = null;
        ndShortcut: ccui.Layout = null;
        saIcon: ccui.TextAtlas = null;
        spMask: cc.Sprite = null;
        tbMember: ccui.Text = null;
        tbTable: ccui.Text = null;
        goldEnter_layout: ccui.Layout = null;
        goldEnter_layout2: ccui.Layout = null;
        quick_data: any = null;
        btn_ddz: ccui.Button = null;
        goldEnter_Ddz: ccui.Layout = null;
        constructor() {
            super();
            this.initUI();
        }

        //由packagemod调用
        @BindEvent("lobby", "ui::ShortCutPanel::ShowGame")
        async getGameList(res: IPackageItem[]) {
            let self = this;
            console.log("城市包：", res);
            self.gameList = [];
            for (let i = 0; i < res.length; ++i) {
                if (!!res[i]) {
                    if (lobby.mod.Package.getInstance().getPackageIndex(res[i].package_key) > -1 && lobby.GameIcons[res[i].package_key]) {
                        self.gameList.push(
                            { key: res[i].package_key, name: res[i].package_name }
                        );
                    }
                }
                //(<ccui.Button>self.gameButton[i]).cle
            }

            for (let i = 0; i < self.gameButtons.length; ++i) {
                if (self.gameList.length <= i) {
                    self.gameButtons[i].getParent().setVisible(false);
                } else {
                    self.gameButtons[i].getParent().setVisible(true);
                    let key = self.gameList[i].key;
                    let icon = lobby.GameIcons[key];
                    let name = self.gameList[i].name;
                    if (icon) {
                        self.gameButtons[i].loadTexture(icon, ccui.Widget.LOCAL_TEXTURE);
                        this.gameTexts[i] = Patch.ChangeTextBMFontFntFile(this.gameTexts[i], name, common.FontRes.iconName);
                    }
                }
            }
        }

        @doBindEvent
        initUI() {
            let self = this;
            this.initWithccs(lobby.res.GameOptionsBtnGroup_json, true);
            this.tbMember = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "memberNum");
            this.tbTable = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "teableNum");
            this.ivMask = ccui.helper.seekWidgetByName<ccui.ImageView>(<ccui.Widget>this.node, 'mask');
            this.spMask = ccui.helper.seekWidgetByName<cc.Sprite>(<ccui.Widget>this.node, 'spMask');
            this.ivBoli = ccui.helper.seekWidgetByName<ccui.ImageView>(<ccui.Widget>this.node, 'boli');
            this.ivMao = ccui.helper.seekWidgetByName<ccui.ImageView>(<ccui.Widget>this.node, 'mao');
            this.btnCreate = ccui.helper.seekWidgetByName<ccui.Button>(<ccui.Widget>this.node, 'CreateRoom');
            this.ndShortcut = ccui.helper.seekWidgetByName<ccui.Layout>(<ccui.Widget>this.node, 'ShortcutBlock');
            this.goldEnter_layout = ccui.helper.seekWidgetByName<ccui.Layout>(<ccui.Widget>this.node, 'goldMatch_Enter');
            this.goldEnter_layout2 = ccui.helper.seekWidgetByName<ccui.Layout>(<ccui.Widget>this.node, 'goldMatch_Enter2');
            this.btn_ddz = ccui.helper.seekWidgetByName<ccui.Button>(<ccui.Widget>this.node, 'btn_ddz');
            this.goldEnter_Ddz = ccui.helper.seekWidgetByName<ccui.Layout>(<ccui.Widget>this.node, 'goldMatch_Enter_dzz');
            //lw190617mask
            this.ivBoli.removeFromParent();
            this.ivMao.removeFromParent();
            var sten = new cc.Sprite();
            sten.initWithSpriteFrameName("aniMask.png");
            var mask = new cc.ClippingNode();
            mask.attr({
                stencil: sten,
                anchorX: 0.5,
                anchorY: 0.5,
                alphaThreshold: 0.8,
            });
            mask.setCascadeOpacityEnabled(true);
            mask.setPosition(10, 5);
            sten.setAnchorPoint(0, 0);
            this.ivBoli.setPosition(0, 93.83);
            this.ivMao.setPosition(0, 93.83);
            mask.addChild(this.ivBoli);
            mask.addChild(this.ivMao);
            this.ndShortcut.addChild(mask);

            let actionBoli1 = cc.moveBy(3, -200, 0);
            let actionBoli2 = cc.fadeIn(0.5);
            let spaBoli1 = cc.spawn([actionBoli1, actionBoli2]);

            let actionBoli3 = cc.fadeOut(0.1);
            let actionBoli4 = cc.moveBy(0.1, 450, 0);
            let actionBoli5 = cc.fadeIn(0.1);

            let actionBoli6 = cc.moveBy(3, -250, 0);
            let actionBoli7 = cc.fadeOut(4);
            let spaBoli2 = cc.spawn([actionBoli6, actionBoli7]);
            let seqBoli = cc.sequence(spaBoli1, actionBoli3, actionBoli4, actionBoli5, spaBoli2);
            let repBoli = cc.repeatForever(seqBoli);
            this.ivBoli.runAction(repBoli);


            let actionMao1 = cc.moveBy(4, 450, 0);
            let actionMao2 = cc.fadeOut(0.1);
            let actionMao3 = cc.moveBy(0.1, -450, 0);
            let actionMao4 = cc.fadeIn(0.1);
            let seqMao = cc.sequence(actionMao1, actionMao2, actionMao3, actionMao4);
            let repMao = cc.repeatForever(seqMao);
            this.ivMao.runAction(repMao);

            this.btnCreate.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);

                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                kaayou.emit('lobby', "ui::Loading::Show", { msg: "正在检查游戏资源", noAni: true });
                kaayou.emit("lobby", "mod::Package::GameListAndRule", {
                    key: "cymj",
                    call: function (list: Array<{ kindId: number, name: string, rule: string, ruleVersion: number }>) {
                        kaayou.emit('lobby', 'ui::CreateRoom::Show', {
                            list: list,
                            call: function (data: { kindid: number, configData: any }) {
                                console.log(data);
                                kaayou.emit("lobby", "mod::RCGame::CreaterRoom", data);
                            }
                        });
                    }
                });
            }, this);
            let anim: sp.SkeletonAnimation = sp.SkeletonAnimation.createWithJsonFile(lobby.res.goldEnterAni_json, lobby.res.goldEnterAni_atlas, 1);
            anim.setAnimation(1, "animation", true);
            anim.setPosition(self.goldEnter_layout.getContentSize().width / 2 + 20, -190);
            self.goldEnter_layout.addChild(anim);

            let anim2: sp.SkeletonAnimation = sp.SkeletonAnimation.createWithJsonFile(lobby.res.goldEnterAni_json, lobby.res.goldEnterAni_atlas, 1);
            anim2.setAnimation(1, "animation", true);
            anim2.setPosition(self.goldEnter_layout2.getContentSize().width / 2 + 20, -190);
            self.goldEnter_layout2.addChild(anim2);
            self.goldEnter_layout2.setVisible(false);

            let anim1: sp.SkeletonAnimation = sp.SkeletonAnimation.createWithJsonFile(lobby.res.legendAni_json, lobby.res.legendAni_atlas, 1);
            anim1.setAnimation(1, "animation", true);
            anim1.setPosition(self.goldEnter_Ddz.getContentSize().width / 2 + 20, -20);
            self.goldEnter_Ddz.addChild(anim1);

            // anim.setCompleteListener(function(){
            //     anim.setVisible(false);
            //     setTimeout(() => {
            //         anim.removeFromParent();
            //     }, 500);
            // })



            this.joinRoomBtn = ccui.helper.seekWidgetByName<ccui.Button>(<ccui.Widget>this.node, 'btn_joinRoom');
            this.joinRoomBtn1 = ccui.helper.seekWidgetByName<ccui.Button>(<ccui.Widget>this.node, 'JoinRoom_Btn');
            this.btnMoreGame = ccui.helper.seekWidgetByName<ccui.Button>(<ccui.Widget>this.node, 'btnMoreGame');
            this.createTeahouseBtn = ccui.helper.seekWidgetByName<ccui.Button>(<ccui.Widget>this.node, 'btn_MoreTeahouse');

            this.btnJoinTea = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, 'btn_quick_tea');
            this.btnQuickTeahouse = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, 'btn_EnterTeahouse');

            this.gameButtons = [];
            let gameP1 = ccui.helper.seekWidgetByName<ccui.Layout>(<ccui.Widget>this.node, 'gameP1');
            let gameP2 = ccui.helper.seekWidgetByName<ccui.Layout>(<ccui.Widget>this.node, 'gameP2');
            let gameP3 = ccui.helper.seekWidgetByName<ccui.Layout>(<ccui.Widget>this.node, 'gameP3');


            this.gameButtons.push(ccui.helper.seekWidgetByName<ccui.ImageView>(gameP1, 'gameIcon'));
            this.gameButtons.push(ccui.helper.seekWidgetByName<ccui.ImageView>(gameP2, 'gameIcon'));
            this.gameButtons.push(ccui.helper.seekWidgetByName<ccui.ImageView>(gameP3, 'gameIcon'));


            this.gameTexts = [];

            this.gameTexts.push(ccui.helper.seekWidgetByName<ccui.TextBMFont>(gameP1, 'gameText'));
            this.gameTexts.push(ccui.helper.seekWidgetByName<ccui.TextBMFont>(gameP2, 'gameText'));
            this.gameTexts.push(ccui.helper.seekWidgetByName<ccui.TextBMFont>(gameP3, 'gameText'));

            for (var x in this.gameButtons) {
                this.gameButtons[x]['_index'] = Number(x);
                this.gameButtons[x].on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                    let _index = e.target['_index'];
                    if (self.gameList && self.gameList[_index]) {
                        kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                        console.log(self.gameList[_index]);
                        //打开创建面板
                        self.onClickCreateRoom(self.gameList[_index].key);
                    }
                }, this);
            }

            this.btnMoreGame.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                //self.btnMoreGame.setEnabled(false);
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                // kaayou.emit('lobby', "mod::Package::Search", {
                //     code: "", keyword: "", type: 0, call: function (r) {
                //         kaayou.emit("lobby", "ui::GameCenter::Show", r);
                //         self.btnMoreGame.setEnabled(true);
                //     }
                // });
                kaayou.emit("lobby", "ui::GameCenter::Show");
            }, this);


            this.joinRoomBtn.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit("lobby", 'ui::JoinRoom::Show');
            }, this);

            this.joinRoomBtn1.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit("lobby", 'ui::JoinRoom::Show');
            }, this);

            this.createTeahouseBtn.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit("tea", 'ui::View::Show');
            }, this);

            this.btnJoinTea.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit("tea", 'ui::Join::Show');
            }, this);

            //现在金币场就一个游戏。。。先写成这样
            this.goldEnter_layout.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.TouchMask.addTouchMask({ soundtype: kaayou.SoundType.NORMAL, masktime: 0.5 });
                console.log("需要去调用进入金币场");
                kaayou.emit("lobby", 'mod::mergeService::PlayerClickGold');
                kaayou.emit("lobby", "mod::GDGame::AreaPkgByKind", {
                    kindid: 387, callBack: function (pkgInfo: proto_areapkgbytid_res) {
                        kaayou.emit('common', "ui::Loading::Show", { msg: "正在检查是否需要更新" });
                        common.mod.Update.ExistsSubGame(pkgInfo.package_key, pkgInfo.package_version, function () {
                            kaayou.emit("lobby", "mod::GDGame::SiteIn", { kind: 387, type: 1 })
                            console.log(pkgInfo);
                        })
                    }
                })

            }, this);

            
            this.goldEnter_layout2.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.TouchMask.addTouchMask({ soundtype: kaayou.SoundType.NORMAL, masktime: 0.5 });
                console.log("需要去调用进入金币场");
                kaayou.emit("lobby", 'mod::mergeService::PlayerClickGold');
                kaayou.emit("lobby", "mod::GDGame::AreaPkgByKind", {
                    kindid: 360, callBack: function (pkgInfo: proto_areapkgbytid_res) {
                        kaayou.emit('common', "ui::Loading::Show", { msg: "正在检查是否需要更新" });
                        common.mod.Update.ExistsSubGame(pkgInfo.package_key, pkgInfo.package_version, function () {
                            kaayou.emit("lobby", "mod::GDGame::SiteIn", { kind: 360, type: 1 })
                            console.log(pkgInfo);
                        })
                    }
                })

            }, this);


            this.goldEnter_Ddz.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.TouchMask.addTouchMask({ soundtype: kaayou.SoundType.NORMAL, masktime: 0.5 });
                console.log("需要去调用进入传奇");
                if (!common.mod.Config.GetAppConfig().legendInfo || !kaayou.Identify.isJSON(common.mod.Config.GetAppConfig().legendInfo)) {
                    return;
                }
                let legendInfo = JSON.parse(common.mod.Config.GetAppConfig().legendInfo);
                let map = {
                    appid: legendInfo.webPayAppid,
                    openid: "douqijs" + lobby.mod.User.getInstance().getUserInfo().uid || "",
                }
                let sign = kaayou.MD5.encode(map.appid + map.openid).toUpperCase();
                kaayou.PlatformMgr.getInstance().webGame.Login((legendInfo.legendUrl + "appid=" + map.appid + "&openid=" + map.openid + "&sign=" + sign), true);
                kaayou.SoundManager.getInstance().pauseMusic();
            }, this);


            //快速进入亲友圈
            this.btnQuickTeahouse.on(kaayou.TouchEvent.TouchEnd, function () {
                console.log("快速进入");
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit("tea", "mod::TeaHouse::Enter", { hid: self.quick_data.hid });
            }, this);




            kaayou.getController('tea').on('ui::TeaHouse::HideOnlineCount', function (e: kaayou.Event) {
                if (!!e.data) {
                    self.tbTable.setString((e.data.onlinetable == -1) ? "" : e.data.onlinetable); //在线桌数
                    self.tbMember.setString((e.data.onlinecur == -1) ? "" : e.data.onlinecur);//在线人数
                }
            }, this, 10);
        }
        @BindEvent("lobby", "showBtnQuickTea")
        doShowQuickTeaInfo(data: any) {
            let self = this;
            if (!!!kaayou.DataSet.get('user::info') || kaayou.DataSet.get('user::info').length == 0) {
                return;
            }
            var userInfo: any = kaayou.DataSet.get('user::info');
            userInfo = JSON.parse(userInfo) || null;
            let slastTeahouse = null;
            self.quick_data = null;
            if (userInfo && userInfo.uid) {
                slastTeahouse = cc.sys.localStorage.getItem("LAST3TEAHOUSE::" + userInfo.uid);
            }
            if (slastTeahouse && slastTeahouse.length != 0) {
                this.btnJoinTea.setVisible(false);
                let arr = JSON.parse(slastTeahouse);

                if (data.teaList.length > 0) {
                    for (let i = 0; i < arr.length; i++) {
                        for (let j = 0; j < data.teaList.length; j++) {
                            let listModel = data.teaList[j];
                            if (arr[i].id == listModel.hid) {
                                self.quick_data = listModel;
                                self.setQuickInfo(self.quick_data)
                                return;
                            }
                        }
                    }
                    if (data.teaList.length > 0) {
                        self.quick_data = data.teaList[0];
                        self.setQuickInfo(self.quick_data);
                        return;
                    } else {
                        this.btnJoinTea.setVisible(true);
                    }
                } else {
                    this.btnJoinTea.setVisible(true);
                }
            } else {
                if (data.teaList.length > 0) {
                    this.btnJoinTea.setVisible(false);
                    self.quick_data = data.teaList[0];
                    self.setQuickInfo(self.quick_data)
                    return;
                } else {
                    this.btnJoinTea.setVisible(true);
                }
            }
        }

        setQuickInfo(data) {
            let self = this;
            let name_text: ccui.Text = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "tea_name")
            name_text.setString(kaayou.Identify.nickNameSubSix(data.hname));
            self.tbMember.setString((data.onlinecur == -1) ? "" : data.onlinecur);
            self.tbTable.setString((data.onlinetable == -1) ? "" : data.onlinetable);
        }

        onClickCreateRoom(key: string) {
            kaayou.emit("lobby", "mod::Package::GameListAndRule", {
                key: key,
                call: function (list: Array<{ kindId: number, name: string, rule: string, ruleVersion: number }>) {
                    kaayou.emit('lobby', 'ui::CreateRoom::Show', {
                        list: list,
                        call: function (data: { kindid: number, configData: any }) {
                            console.log("创建房间：" + data);
                            kaayou.emit("lobby", "mod::RCGame::CreaterRoom", data);
                        }
                    });
                }
            });
        }

        @BindEvent("common", 'Config::Update')
        onConfigUpdate() {
            let configs = common.mod.Config.AppConfig;
            let feature: IFeature = lodash.extend({}, configs.feature);
            let dt = feature.dt;
            if ((configs && feature && dt == 1)) {
                this.ndShortcut.setVisible(true);
                this.btnCreate.setVisible(false);
                this.joinRoomBtn.setVisible(true);
                this.joinRoomBtn1.setVisible(false);
                //ios3.7.0
                let version=kaayou.PlatformMgr.getInstance().sys.GetLocalVersionName();
                let chuanqiVersion="1.9.5";
                if (cc.sys.os == cc.sys.OS_IOS) {
                    chuanqiVersion="3.6.9";
                }
                if(cc.sys.isNative){
                    if (common.mod.Update.versionCompareHandle(version, chuanqiVersion) > 0) {
                        this.goldEnter_Ddz.setVisible(true);
                    }else{
                        this.goldEnter_Ddz.setVisible(false);
                    }
                }else{
                    this.goldEnter_Ddz.setVisible(true);
                }
            } else {
                this.ndShortcut.setVisible(false);
                this.btnCreate.setVisible(true);
                this.joinRoomBtn.setVisible(false);
                this.joinRoomBtn1.setVisible(true);
                this.goldEnter_Ddz.setVisible(false);
            }
        }
    }
}
