//登录场景
namespace lobby {
    var { BindEvent, doBindEvent } = kaayou._decorator;

    export class LoginScene extends kaayou.kScene {
        btnCheck: ccui.Button = null;
        btnPhone: ccui.Button = null;
        btnRepair: ccui.Button = null;
        btnSwitchLine: ccui.Button = null;
        btnTokenLogin: ccui.Button = null;
        saBln: sp.SkeletonAnimation = null;

        btn_Guest: ccui.Button = null;
        btn_Wechat: ccui.Button = null;
        lbVersion: ccui.Text = null;
        btns_Layout: ccui.Layout = null;
        cbAgree: ccui.CheckBox = null;
        btn_agreement: ccui.ImageView = null;
        btn_policy: ccui.ImageView = null;
        btn_Cs: ccui.Button = null;

        //默认客服面板
        btn_close: ccui.Button = null;
        btn_copy: ccui.Button = null;
        cs_panel: ccui.Layout = null;
        //debug相关
        ebCode: ccui.TextField = null;
        ebToken: ccui.TextField = null;
        ebUserID: ccui.TextField = null;
        layout_debugger_content: ccui.Layout = null;
        layout_debugger_left: ccui.Layout = null;
        layout_debugger_right: ccui.Layout = null;
        layout_debugger_top: ccui.Layout = null;
        edt_debugger_ip: ccui.TextField = null;
        edt_login_ip: ccui.TextField = null;
        btn_debugger_ok: ccui.Button = null;
        btn_debugger_cancel: ccui.Button = null;
        btn_debugger_recache: ccui.Button = null;

        btn_debugger_line_online_addr: ccui.Button = null;
        btn_debugger_line_online_ip: ccui.Button = null;
        btn_debugger_line_clear: ccui.Button = null;
        btn_debugger_line_dev: ccui.Button = null;
        btn_debugger_line_test: ccui.Button = null;
        btn_debugger_line_test2: ccui.Button = null;
        btn_debugger_line_test3: ccui.Button = null;
        btn_debugger_line_image: ccui.Button = null;

        __debuggerClickCount: number = 0;
        __debuggerClickTime = null;
        __debuggerClickIsLeft = true;

        constructor() {
            super();
            let self = this;
            this.firstIn = true;
            this.initWithccs(lobby.res.Login_json);
            cc.spriteFrameCache.addSpriteFrames(common.res.UserHead_plist);

            let background: cc.Node = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "background");
            background.setContentSize(cc.winSize.width, cc.winSize.height);

            self.saBln = sp.SkeletonAnimation.createWithJsonFile(lobby.res.lgnBlnJson, lobby.res.lgnBlnAtlas, 1);
            self.saBln.setVisible(true);
            self.saBln.setAnimation(0, 'hx', true);
            let lyBln: cc.Node = ccui.helper.seekWidgetByName(<ccui.Widget>self.node, "lyBln");
            self.saBln.setPosition(25, -125);
            lyBln.addChild(self.saBln);

            this.btnCheck = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btnCheck");
            this.btnCheck.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit("common", "ui::DebugPanel::Check");
            }, this);
            this.btnCheck.setVisible(true);
            this.btnRepair = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btnRepair");
            this.btnRepair.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                self.deleteAllResources();
            }, this);
            this.btnRepair.setVisible(true);
            this.btnSwitchLine = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btnSwitchLine");
            this.btnSwitchLine.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                let url = cc.sys.localStorage.getItem("debugConfigUrl");
                if (!!url) {
                    if (url.indexOf("http://") > -1) {
                        cc.sys.localStorage.setItem("debugConfigUrl", "https://apiyxdq.kaayou.com");
                    } else {
                        cc.sys.localStorage.setItem("debugConfigUrl", "http://apiyxdq.kaayou.com");
                    }
                } else {
                    cc.sys.localStorage.setItem("debugConfigUrl", "https://apiyxdq.kaayou.com");
                }

                if (!cc.sys.isNative) {
                    if (window && window.location) {
                        window.location.reload();
                    }
                } else {
                    cc.game.restart();
                }
            }, this);
            this.btns_Layout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "BtnLayout");
            this.btnPhone = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_Phone");
            this.btn_Guest = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_Guest");
            this.btn_Wechat = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_Wechat");
            this.btn_Cs = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Btn_CS");
            this.lbVersion = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "lbVersion");

            this.btn_close = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_close");
            this.btn_copy = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_copy");
            this.btn_close.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.cs_panel.setVisible(false);
            }, this)

            this.btn_copy.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                if (kaayou.PlatformMgr.getInstance().sys.copyStringToPasteBoard("douqi801") == "1") {
                    kaayou.PlatformMgr.getInstance().sys.jumpWeChatImmediacy();
                }
            }, this)

            this.cs_panel = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "defualtCsPanel");
            this.cs_panel.setVisible(false);

            this.cbAgree = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "cbAgree");
            self.cbAgree.on(kaayou.CheckEvent.SELECTED, function (e: kaayou.Event) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                cc.sys.localStorage.setItem('user_agreement', "true");
            }, this);

            self.cbAgree.on(kaayou.CheckEvent.UNSELECTED, function (e: kaayou.Event) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                cc.sys.localStorage.setItem('user_agreement', "false");
            }, this);
            this.btn_agreement = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_agreement");
            this.btn_agreement.on(kaayou.TouchEvent.TouchEnd, function (e) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit('lobby', 'ui::Agreement::Show');
            }, this);
            this.btn_policy = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_policy");
            this.btn_policy.on(kaayou.TouchEvent.TouchEnd, function (e) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit('lobby', 'ui::Policy::Show');
            }, this);
            this.btn_Cs.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                this.cs_panel.setVisible(true);
            }, this);
            this.btns_Layout.setPadding({ spacingX: 70 });
            this.lbVersion.setString(kaayou.PlatformMgr.getInstance().sys.GetLocalVersionName() + " - " + kaayou.App.version);

            this.btnPhone.on(kaayou.TouchEvent.TouchEnd, function (e) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);

                if(!this.isFirstIn()){
                    self.cbAgree.setSelected(false)
                    return;
                }
                

                if (!self.cbAgree.isSelected()) {
                    kaayou.emit('common', 'ui::Toast::Show', { msg: '请勾选用户协议和隐私政策！', time: 1, mask: true })
                    return;
                }

                kaayou.emit('lobby', 'ui::PhoneLoginPanel::Show');
                kaayou.getController('lobby').onece("ui::RunScene", function (e: kaayou.CustomEvent) {
                    kaayou.UIManager.getInstance().runScene('lobby');
                    self.cleanUI();
                }, this);

            }, this);

            this.btn_Guest.on(kaayou.TouchEvent.TouchEnd, function (e) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);

                if(!this.isFirstIn()){
                    self.cbAgree.setSelected(false)
                    return;
                }

                if (!self.cbAgree.isSelected()) {
                    kaayou.emit('common', 'ui::Toast::Show', { msg: '请勾选用户协议和隐私政策！', time: 1, mask: true })
                    return;
                }
                // kaayou.UIManager.getInstance().runScene('lobby');
                kaayou.emit("lobby", "mod::User::GetTokenByGuset");
                kaayou.getController('lobby').onece("ui::RunScene", function (e: kaayou.CustomEvent) {
                    kaayou.UIManager.getInstance().runScene('lobby');
                    self.cleanUI();
                }, this);
                // lobby.mod.User.getInstance().doGetTokenByGuset();
            }, this);
            this.btn_Wechat.on(kaayou.TouchEvent.TouchEnd, function (e) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);

                if(!this.isFirstIn()){
                    self.cbAgree.setSelected(false)
                    return;
                }

                if (!self.cbAgree.isSelected()) {
                    kaayou.emit('common', 'ui::Toast::Show', { msg: '请勾选用户协议和隐私政策！', time: 1, mask: true })
                    return;
                }
                kaayou.emit("lobby", "mod::User::RegisterWx");
                kaayou.getController('lobby').onece("ui::RunScene", function (e: kaayou.CustomEvent) {
                    kaayou.UIManager.getInstance().runScene('lobby');
                }, this);
            }, this);
            this.btnPhone.setVisible(false);
            this.btn_Guest.setVisible(false);
            this.btn_Wechat.setVisible(false);
            this.bindEvent();

            this.btns_Layout.doChildrenLayout();
            lobby.lobby_AgreementMgr.getInstance(6);
            lobby.lobby_PolicyMgr.getInstance(6);
            // lobby.lobby_LoginCsMgr.getInstance();
            lobby.ShareRecordManager.getInstance();
            lobby.MaintainManager.getInstance();
            if (cc.sys.isWeChat) {

            } else {
                lobby.lobby_PhoneLoginMgr.getInstance();
                lobby.lobby_BindWechatMgr.getInstance();
            }

            let debugConfigUrl = cc.sys.localStorage.getItem("debugConfigUrl");
            if (debugConfigUrl && lodash.isString(debugConfigUrl) && !lodash.isEmpty(debugConfigUrl)) {
                common.mod.Config.ConfigUrl = debugConfigUrl;
            }

            //lm190824这一段只有审核时才要
            if (kaayou.App.isAppleExamineVersion) {
                setTimeout(() => {
                    common.mod.LocalPackage.uzipSubGame("cymj", function () {
                        common.mod.LocalPackage.uzipSubGame("pdkgd", function () {
                            kaayou.emit("common", "ui::Loading::Hide", { force: true });
                            common.mod.Config.LoadAppConfig();
                        });
                    });
                }, 200);
            }
            kaayou.emit("common", "ui::Loading::Hide", { force: true });
            if (!kaayou.App.isAppleExamineVersion) { common.mod.Config.LoadAppConfig(); }
            let bUserAgreement = cc.sys.localStorage.getItem('user_agreement');
            if (bUserAgreement == "true") {
                this.cbAgree.setSelected(true);
            } else {
                this.cbAgree.setSelected(false);
            }

            //dubug 相关
            this.layout_debugger_top = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "layout_debugger_top");
            if (this.layout_debugger_top) {
                this.layout_debugger_left = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "layout_debugger_left");
                this.layout_debugger_right = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "layout_debugger_right");

                this.layout_debugger_content = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "layout_debugger_content");

                this.edt_debugger_ip = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "edt_debugger_ip");
                this.edt_login_ip = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "edt_login_ip");
                this.ebCode = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "ebCode");
                this.ebToken = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "ebToken");
                this.ebUserID = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "ebUserID");

                this.btnTokenLogin = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btnTokenLogin");
                this.btnTokenLogin.on(kaayou.TouchEvent.TouchEnd, (e) => {
                    let userId = self.ebUserID.getString();
                    let token = self.ebToken.getString();
                    let o = {
                        engine: 2,
                        minfo: {},
                        token: token,
                        uid: parseInt(userId)
                    };
                    let s = JSON.stringify(o);
                    cc.sys.localStorage.setItem('user::token', s);
                    kaayou.emit("lobby", "mod::User::GetTokenByAccount");
                    kaayou.getController('lobby').onece("ui::RunScene", function (e: kaayou.CustomEvent) {
                        kaayou.UIManager.getInstance().runScene('lobby');
                        self.cleanUI();
                    }, self);
                }, this);
                this.btn_debugger_ok = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_debugger_ok");
                this.btn_debugger_cancel = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_debugger_cancel");
                this.btn_debugger_recache = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_debugger_recache");

                this.__debuggerClickCount = 0;
                this.__debuggerClickTime = null;
                this.__debuggerClickIsLeft = true;



                let fnclear = () => {
                    if (this.__debuggerClickTime) {
                        clearTimeout(this.__debuggerClickTime);
                    }
                    this.__debuggerClickTime = null;
                    this.__debuggerClickCount = 0;
                    this.__debuggerClickIsLeft = true;
                }
                let fnshow = () => {
                    if (this.__debuggerClickCount > 8) {
                        fnclear();
                        this.edt_debugger_ip.setString(common.mod.Config.ConfigUrl);
                        this.edt_login_ip.setString(cc.sys.localStorage.getItem("debugLoginUrl"));
                        this.ebCode.setString(cc.sys.localStorage.getItem("debugCode"));
                        this.ebToken.setString(cc.sys.localStorage.getItem("debugToken"));
                        this.ebUserID.setString(cc.sys.localStorage.getItem("debugUserID"));
                        this.layout_debugger_content.setVisible(true);
                    }
                }
                this.layout_debugger_content.setVisible(false);
                if (debugConfigUrl && ((debugConfigUrl != "http://apiyxdq.kaayou.com") && (debugConfigUrl != "http://203.107.40.117:8004"))) {
                    //lw200821调试时切线面板常量，正式包注意屏蔽
                    this.__debuggerClickCount = 9;
                }


                this.layout_debugger_top.on(kaayou.TouchEvent.TouchStart, (e) => {
                    fnshow();
                }, this);

                this.layout_debugger_left.on(kaayou.TouchEvent.TouchStart, (e) => {
                    if (this.__debuggerClickTime == null) {
                        this.__debuggerClickTime = setTimeout(() => {
                            fnclear();
                        }, 10000);
                    }
                    if (!cc.sys.isNative && window && window.location) {
                        this.__debuggerClickCount++;
                        this.__debuggerClickIsLeft = !this.__debuggerClickIsLeft;
                        console.log(this.__debuggerClickCount);
                        return;
                    }

                    if (this.__debuggerClickIsLeft == true) {
                        this.__debuggerClickCount++;
                        this.__debuggerClickIsLeft = !this.__debuggerClickIsLeft;
                        console.log(this.__debuggerClickCount);
                    } else {
                        fnclear();
                    }
                }, this);

                this.layout_debugger_right.on(kaayou.TouchEvent.TouchStart, (e) => {
                    if (this.__debuggerClickIsLeft == false) {
                        this.__debuggerClickCount++;
                        this.__debuggerClickIsLeft = !this.__debuggerClickIsLeft;
                        console.log(this.__debuggerClickCount);
                    } else {
                        fnclear();
                    }
                }, this);

                this.btn_debugger_ok.on(kaayou.TouchEvent.TouchEnd, (e) => {
                    let cf = this.edt_debugger_ip.getString();
                    let loginIp = this.edt_login_ip.getString();
                    let code = this.ebCode.getString();
                    let token = this.ebToken.getString();
                    let userId = this.ebUserID.getString();
                    cf = lodash.trim(cf);
                    loginIp = lodash.trim(loginIp);
                    code = lodash.trim(code);
                    token = lodash.trim(token);
                    if (lodash.isEmpty(cf)) {
                        let options = {
                            msg: "是否清除掉 测试get地址",
                            btns: [
                                {
                                    name: "确定",
                                    action: function () {
                                        cc.sys.localStorage.removeItem("debugConfigUrl");
                                        cc.sys.localStorage.removeItem("debugLoginUrl");
                                        cc.sys.localStorage.removeItem("debugCode");
                                        if (!cc.sys.isNative) {
                                            if (window && window.location) {
                                                window.location.reload();
                                            }
                                        } else {
                                            cc.game.restart();
                                        }
                                    },
                                    colorType: 'yellow'
                                },
                                {
                                    name: "取消",
                                    action: function () {

                                    },
                                    colorType: 'green'

                                }
                            ]
                        }
                        kaayou.emit('common', 'ui::Dialog::Show', options);
                    } else {
                        let fn = function () {
                            cc.sys.localStorage.setItem("debugConfigUrl", cf);
                            cc.sys.localStorage.setItem("debugLoginUrl", loginIp);
                            cc.sys.localStorage.setItem("debugCode", code);
                            cc.sys.localStorage.setItem("debugToken", token);
                            cc.sys.localStorage.setItem("debugUserID", userId);
                            if (!cc.sys.isNative) {
                                if (window && window.location) {
                                    window.location.reload();
                                }
                            } else {
                                cc.game.restart();
                            }
                        }
                        if (cf[0] == 'h' && cf[1] == 't' && cf[2] == 't' && cf[3] == 'p') {
                            let options = {
                                msg: "是否清除缓存",
                                btns: [
                                    {
                                        name: "确定",
                                        action: function () {
                                            if (cc.sys.isNative) {
                                                let RemoteDir = kaayou.getRemotePath();
                                                if (jsb.fileUtils.isDirectoryExist(RemoteDir)) {
                                                    jsb.fileUtils.removeDirectory(RemoteDir);
                                                    fn();
                                                }
                                            } else {
                                                kaayou.emit('common', 'ui::Dialog::Show', options1);
                                            }
                                        },
                                        colorType: 'yellow'
                                    },
                                    {
                                        name: "跳过",
                                        action: function () {
                                            kaayou.emit('common', 'ui::Dialog::Show', options1);
                                        },
                                        colorType: 'green'

                                    }
                                ]
                            }
                            kaayou.emit('common', 'ui::Dialog::Show', options);
                            let options1 = {
                                msg: "是否设置测试get地址",
                                btns: [
                                    {
                                        name: "确定",
                                        action: function () {
                                            fn();
                                        },
                                        colorType: 'yellow'
                                    },
                                    {
                                        name: "取消",
                                        action: function () {

                                        },
                                        colorType: 'green'

                                    }
                                ]
                            }

                        } else {
                            kaayou.emit('common', 'ui::Toast::Show', { msg: '输入错误 请输入协议头 如 http://', time: 1, mask: true })
                        }
                    }

                }, this);

                this.btn_debugger_cancel.on(kaayou.TouchEvent.TouchEnd, (e) => {
                    this.layout_debugger_content.setVisible(false);
                }, this);

                this.btn_debugger_recache.on(kaayou.TouchEvent.TouchEnd, (e) => {
                    self.deleteAllResources();
                }, this);

                this.btn_debugger_line_online_addr = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_debugger_line_online_addr");
                this.btn_debugger_line_online_ip = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_debugger_line_online_ip");
                this.btn_debugger_line_clear = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_debugger_line_clear");
                this.btn_debugger_line_dev = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_debugger_line_dev");
                this.btn_debugger_line_test = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_debugger_line_test");
                this.btn_debugger_line_test2 = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_debugger_line_test2");
                this.btn_debugger_line_test3 = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_debugger_line_test3");
                this.btn_debugger_line_image = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_debugger_line_image");
                this.btn_debugger_line_online_addr.on(kaayou.TouchEvent.TouchEnd, (e) => {
                    let c = 'http://apiyxdq.kaayou.com';
                    this.edt_debugger_ip.setString(lodash.trim(c));
                }, this);

                this.btn_debugger_line_online_ip.on(kaayou.TouchEvent.TouchEnd, (e) => {
                    let c = "\x68\x74\x74\x70\x3a\x2f\x2f\x32\x30\x33\x2e\x31\x30\x37\x2e\x34\x30\x2e\x31\x31\x37\x3a\x38\x30\x30\x34";
                    //let c = "http://203.107.40.117:8002";
                    this.edt_debugger_ip.setString(lodash.trim(c));
                }, this);

                this.btn_debugger_line_clear.on(kaayou.TouchEvent.TouchEnd, (e) => {
                    let c = "";
                    this.edt_debugger_ip.setString(lodash.trim(c));
                    this.edt_login_ip.setString("");
                    this.ebCode.setString("");
                    this.ebToken.setString("");
                    this.ebUserID.setString("");
                }, this);
                this.btn_debugger_line_dev.on(kaayou.TouchEvent.TouchEnd, (e) => {
                    let c = "\x68\x74\x74\x70\x3a\x2f\x2f\x31\x39\x32\x2e\x31\x36\x38\x2e\x31\x2e\x31\x35\x36\x3a\x38\x30\x30\x32";
                    this.edt_debugger_ip.setString(lodash.trim(c));
                }, this);

                this.btn_debugger_line_test.on(kaayou.TouchEvent.TouchEnd, (e) => {
                    let c = "http://47.110.134.169:8006";
                    this.edt_debugger_ip.setString(lodash.trim(c));
                }, this);

                this.btn_debugger_line_test2.on(kaayou.TouchEvent.TouchEnd, (e) => {
                    let c = "http://47.110.144.79:8006";
                    this.edt_debugger_ip.setString(lodash.trim(c));
                }, this);

                this.btn_debugger_line_test3.on(kaayou.TouchEvent.TouchEnd, (e) => {
                    let c = "http://121.196.44.58:8006";
                    this.edt_debugger_ip.setString(lodash.trim(c));
                }, this);

                this.btn_debugger_line_image.on(kaayou.TouchEvent.TouchEnd, (e) => {
                    let c = "\x68\x74\x74\x70\x3a\x2f\x2f\x31\x32\x31\x2e\x34\x33\x2e\x35\x34\x2e\x31\x32\x34\x3a\x38\x30\x30\x36";
                    this.edt_debugger_ip.setString(lodash.trim(c));
                }, this);

            }
        }

        @doBindEvent
        bindEvent() {
            kaayou.PlatformMgr.getInstance().sys.addBatteryNotification();
        }

        cleanUI() {
            kaayou.emit('lobby', 'ui::PhoneLoginPanel::Hide');
            // kaayou.emit('lobby', 'ui::PhoneRegsterPlane::Hide');
        }

        deleteAllResources() {
            kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
            let options = {
                msg: "是否重新下载资源？建议在wifi环境下进行。",
                btns: [
                    {
                        name: "确定",
                        action: function () {
                            if (cc.sys.isNative) {
                                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                                let RemoteDir = kaayou.getRemotePath();
                                if (jsb.fileUtils.isDirectoryExist(RemoteDir)) {
                                    jsb.fileUtils.removeDirectory(RemoteDir);
                                    cc.game.restart();
                                }
                            }
                        },
                        colorType: 'yellow'
                    },
                    {
                        name: "取消",
                        action: function () {
                            kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                        },
                        colorType: 'green'

                    }
                ]
            }
            kaayou.emit('common', 'ui::Dialog::Show', options);
        }

        firstIn = true;

        onReEnter() {
            kaayou.DataSet.set("PreScene", "Login");
        }

        @BindEvent("lobby", 'ui::LoginScene::ShowSwitchLine')
        showSwitchButton() {
            if (this.visible) {
                this.btnSwitchLine.setVisible(true);
                this.btns_Layout.setVisible(false);
            }
        }

        isFirstIn(){
            let agree = cc.sys.localStorage.getItem("user_agreement") == "true"
            if(!agree){
                kaayou.emit('lobby','ui::ContractPanel::Show');
            }
            return agree;
        }

        @BindEvent("lobby","ui::Login::Agreement")
        onAgreement(data){
            this.cbAgree.setSelected(data.agree);
        }

        @BindEvent("common", 'Config::Update')
        onConfigUpdate(data: Ka_APP_CONFIG) {
            // console.log(this);
            let appConfig = common.mod.Config.AppConfig
            var btncfs = appConfig.btnShow;
            let self = this;
            if (appConfig && appConfig.feature && appConfig.feature.im) {
                kaayou.PlatformMgr.getInstance().im.Login("22222", "4444433");
            }

            if (appConfig && appConfig.gps.enabled && cc.sys.isNative) {  //当需要去调用位置的时候 原生的
                //登录时不定位
                kaayou.PlatformMgr.getInstance().map.GetMapInfo();
            }

            kaayou.emit("lobby", "mod::User::doCheckOldYK", {
                call: function (b) {
                    self.btnPhone.setVisible(!!btncfs.tel);
                    self.btn_Guest.setVisible(!!btncfs.yk);
                    self.btn_Wechat.setVisible(!!btncfs.wx);
                    if (cc.sys.isWeChat) {
                        self.btnPhone.setVisible(false);
                        self.btn_Wechat.setVisible(false);
                    }
                    if (b) {
                        self.btn_Guest.setVisible(true);
                    }
                    self.btns_Layout.setVisible(true);
                    self.btnSwitchLine.setVisible(false);
                    self.btns_Layout.doChildrenLayout();

                    if (self.isFirstIn() && self.firstIn && cc.sys.isNative ) {
                        try {
                            let cachedToken = cc.sys.localStorage.getItem('user::token');
                            if (lodash.isString(cachedToken) && cachedToken.length > 8) {
                                let t = JSON.parse(cachedToken);
                                if (t && t.token && t.uid) {
                                    console.log("令牌", t);
                                    kaayou.emit("lobby", "mod::User::GetTokenByAccount");
                                    kaayou.getController('lobby').onece("ui::RunScene", function (e: kaayou.CustomEvent) {
                                        kaayou.UIManager.getInstance().runScene('lobby');
                                        self.cleanUI();
                                    }, self);
                                }
                            }
                        } catch (err) {
                            cc.sys.localStorage.setItem('user::token', '');
                        }
                    }
                    self.firstIn = false;
                }.bind(self)
            });



            return 1;
        }
    }
    kaayou.UIManager.getInstance().installScene('login', lobby.LoginScene);
}