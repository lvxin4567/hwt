/// <reference path="./protos/user.proto.ts" />
namespace lobby {

    const { BindEvent, doBindEvent } = kaayou._decorator;
    export namespace mod {
        export class User {
            static __INS__: lobby.mod.User = null;
            static getInstance(): lobby.mod.User {
                if (User.__INS__ == null) {
                    User.__INS__ = new User();
                    User.__INS__.initMod();
                }
                return User.__INS__;
            }
            @doBindEvent
            initMod() { }

            @BindEvent("lobby", "mod::User::RegisterWx")
            async doRegisterWX() {
                kaayou.PlatformMgr.getInstance().wx.Login();
                kaayou.getController('').onece("mod::User::wx::login", function (e) {
                    var code = e.data;
                    setTimeout(() => {
                        kaayou.emit('lobby', "mod::User::GetTokenByWechat", { code: code });
                    }, 100);
                }, this);
            }

            //账号被挤的时候的消息
            @BindEvent("lobby", "ws::Msg::relogin")
            onReLog() {
                let self = this;
                kaayou.NetManager.getInstance().deleteAllSocket();
                kaayou.emit('common', 'ui::ChannelPanel::Hide');
                kaayou.emit("common", 'ui::Dialog::Show', {
                    msg: "您的账号在别处登录!", btns: [{
                        name: "确定",
                        action: function () {
                            // self.removeUserInfo();
                            self.doLogOut();
                            // cc.director.loadScene("Login");
                        }.bind(this)
                    }], localZOrder: 10132
                })
            }

            @BindEvent("lobby", "mod::User::areaenter")
            async setLocation(data: proto_areaenter) {
                let self = this;
                let sendData: proto_areaenter = {
                    code: data.code
                };
                let res = await kaayou.sendMessage('lobby', UserMessageHead.areaenter, sendData, kaayou.MakeResultMessageHead(UserMessageHead.areaenter));
                if (res.errcode) {
                    kaayou.emit("lobby", "ui::Area::ShowNoGame");
                    return false;
                }
                //审核时不显示
                if(!kaayou.App.isAppleExamineVersion)
                    kaayou.emit("common", "ui::Toast::Show", { msg: "城市选择成功" });
                this.userinfo.area = data.code;
                kaayou.DataSet.set("ADCODE", data.code);
                kaayou.DataSet.set('user::info', JSON.stringify(this.userinfo));
                kaayou.emit("lobby", "mod::Package::GetMain3");
                kaayou.emit("lobby", "ui::city::refresh", { code: data.code, name: common.mod.ChineseMap.getInstance().getName(this.userinfo.area) });
                return true;
            }
            //退出登录
            @BindEvent("lobby", "mod::User::LogOut")
            doLogOut() {
                this.removeUserInfo();
                kaayou.emit("lobby", "ui::LogOutClean");
            }
            removeUserInfo() {
                this.userinfo = null;
                //lm190904ws::Msg::relogin里面也加上deleteAllSocket，而且这里也要
                kaayou.NetManager.getInstance().deleteAllSocket();
                kaayou.DataSet.set("backScene", '');
                kaayou.DataSet.set("user::info", "");
                kaayou.DataSet.set("user::token", "");
                //lw181128
                cc.sys.localStorage.setItem('user::token', "");
                kaayou.DataSet.set("tea::housebaseinfo", "");
            }

            //微信未安裝
            @BindEvent("", "WxInstalled")
            onWxInstalled() {
                setTimeout(() => {
                    kaayou.emit('common', 'ui::Dialog::Show', {
                        msg: "请您先安装微信以后才能使用微信登录哟~",
                        close: {
                            isShow: true,
                            action: null,
                        },
                        btns: [{
                            name: "确定",
                            colorType: 'blue'
                        }]
                    });
                }, 1);
            }

            checkLoginErr(msg) {
                if (!msg) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: msg.data || "登录失败" })
                    return true;
                }

                if (msg.errcode == 107) {//黑名单
                    kaayou.emit('common', 'ui::Dialog::Show', {
                        msg: lodash.isString(msg.data) ? msg.data : "登录失败",
                        close: {
                            isShow: true,
                            action: null,
                        },
                        btns: [{
                            name: "确定",
                            colorType: 'blue'
                        }]
                    });
                    return true;
                } else if (msg.errcode == 135) {//系统维护
                    let maintenance = JSON.parse(msg.data);
                    // let options = {
                    //     msg: maintenance.content,
                    //     btns: [
                    //         {
                    //             name: "退出游戏",
                    //             action: function () {
                    //                 cc.game.end();
                    //             },
                    //             colorType: 'green'
                    //         },
                    //     ]
                    // }
                    kaayou.emit('lobby', 'ui::Maintain::Show', { msg: maintenance.content, code: msg.errcode });
                } else if (msg.errcode != 0) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: msg.data || "登录失败" })
                    return true;
                }
                return false;
            }

            //设置登录后配置
            private __doSetAfterLoginConfig(data) {

                if (!data) {
                    console.error("无效的登录后配置")
                    return;
                }

                //报错token
                kaayou.DataSet.set('user::token', JSON.stringify({ token: data.token, uid: data.uid }));

                //设置各种配置
                common.mod.Config.GetAppConfig().apiUrl = data.api;
                common.mod.Config.GetAppConfig().hallAddr = data.hall;
                common.mod.Config.GetAppConfig().hallUrl = common.mod.Config.HttpSchema + data.hall;
                //支付的appid
                common.mod.Config.GetAppConfig().payappid = data.appid;
                common.mod.Config.GetAppConfig().payapptoken = data.apptoken;
                common.mod.Config.GetAppConfig().insureendline = Number(data.insureendline) || 0;
                common.mod.Config.GetAppConfig().broadcast_cost = Number(data.broadcast_cost) || 0;

                setTimeout(() => { kaayou.emit("common", "Config::Update"); }, 1);
            }

            //游客登录
            @BindEvent("lobby", "mod::User::GetTokenByGuset")
            async doGetTokenByGuset() {
                var platform = cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative ? 2 : 1;
                kaayou.emit('common', "ui::Loading::Show", { arrMsg: ["游戏加载中", "读取账号信息中", "加载成功进入中"] });
                let tempCode = kaayou.PlatformMgr.getInstance().sys.GetDeviceKey();

                let data: proto_loginYK = { code: tempCode, platform: platform, machinecode: tempCode }

                let temp = {
                    "head": UserMessageHead.loginYK,
                    "data": JSON.stringify(data),
                    "msgsign": {
                        "time": new Date().getTime(),
                        "encode": 0
                    }
                }

                if (common.mod.Config.isLoginEncryp) {
                    temp.msgsign.encode = 1;
                    temp.data = kaayou.AES.encrypt(temp.data);
                }

                let res = await kaayou.Http.POST(common.mod.Config.GetAppConfig().loginUrl + "/service", { msgdata: JSON.stringify(temp) });
                kaayou.emit("common", 'ui::Loading::Hide');


                if (cc.sys.isWeChat) {
                    cc.sys.localStorage.setItem("WeChatGuset::Code", tempCode);
                }
                let msg: kaayou.Ka_MSG_RES = kaayou.Http.parseResult(res);
                if (this.checkLoginErr(msg)) {
                    return;
                }

                this.__doSetAfterLoginConfig(msg.data);



                kaayou.DataSet.set('isNew', JSON.stringify(msg.data.isnew));//是否为新用户传值出去
                kaayou.emit("lobby", "mod::User::Login");
            }
            //令牌登录
            @BindEvent("lobby", "mod::User::GetTokenByAccount")
            async doGetTokenByAccount() {
                console.log("mod::User::GetTokenByAccount");
                let token = "";
                let uid = "";
                if (!cc.sys.isNative && !cc.sys.isWeChat) {
                    token = kaayou.Http.GetRequest(location.search)['token'];
                    uid = kaayou.Http.GetRequest(location.search)['uid'];
                    if (!token || !uid) {
                        var sToken = cc.sys.localStorage.getItem('user::token');
                        var oToken = JSON.parse(sToken);
                        token = oToken.token;
                        uid = oToken.uid;
                    }

                } else {
                    //lw181127
                    var sToken = cc.sys.localStorage.getItem('user::token');
                    var oToken = JSON.parse(sToken);
                    token = oToken.token;
                    uid = oToken.uid;
                }
                console.log("令牌登录：uid:" + uid + " token:" + token);
                if (!token || !uid) {
                    // this.doGetTokenByGuset();
                    return;
                }
                var platform = cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative ? 2 : 1;
                let tempCode = kaayou.PlatformMgr.getInstance().sys.GetDeviceKey();


                let data: proto_loginToken = { uid: Number(uid), token: token, platform: platform, machinecode: tempCode }
                let temp = {
                    "head": UserMessageHead.loginToken,
                    //"data": "{\"token\":\"" + token + "\",\"uid\":" + uid + ",platform:this.platform}",
                    "data": JSON.stringify(data),
                    "msgsign": {
                        "time": new Date().getTime(),
                        "encode": 0
                    }
                }
                if (common.mod.Config.isLoginEncryp) {
                    temp.msgsign.encode = 1;
                    temp.data = kaayou.AES.encrypt(temp.data);
                }
                console.log("令牌登录：", temp);
                kaayou.emit("common", "ui::Loading::Show");
                let res = await kaayou.Http.POST(common.mod.Config.GetAppConfig().loginUrl + "/service", { msgdata: JSON.stringify(temp) });
                kaayou.emit("common", 'ui::Loading::Hide');
                let msg: kaayou.Ka_MSG_RES = kaayou.Http.parseResult(res);
                if (this.checkLoginErr(msg)) {
                    return;
                }


                this.__doSetAfterLoginConfig(msg.data);


                kaayou.DataSet.set('isNew', JSON.stringify(msg.data.isnew));//是否为新用户传值出去
                kaayou.emit("lobby", "mod::User::Login");
            }

            //手机注册
            @BindEvent("lobby", "mod::User::RegisterByPhone")
            async doRegisterByPhone(data: { mobile: string, code: string, password: string, nickname: string }) {

                if (!data || !data.mobile || !data.code || !data.password || !data.nickname) { return; }
                if (!kaayou.Identify.isPhone(data.mobile)) {
                    kaayou.emit('common', 'ui::Toast::Show', { msg: "手机号码格式错误！" })
                    return;
                }
                if (data.code.length < 6) {
                    kaayou.emit('common', 'ui::Toast::Show', { msg: "验证码格式错误!" })
                    return;
                }

                var platform = cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative ? 2 : 1;
                let tempCode = kaayou.PlatformMgr.getInstance().sys.GetDeviceKey();
                let sdata: proto_mobileRegister = { mobile: data.mobile, code: data.code, password: data.password, nickname: data.nickname, platform: platform, machinecode: tempCode }
                let temp = {
                    "head": UserMessageHead.mobileRegister,
                    //"data": "{\"mobile\":\"" + data.mobile + "\",\"code\":\"" + data.code + "\"}",
                    "data": JSON.stringify(sdata),
                    "msgsign": {
                        "time": new Date().getTime(),
                        "encode": 0
                    }
                }
                if (common.mod.Config.isLoginEncryp) {
                    temp.msgsign.encode = 1;
                    temp.data = kaayou.AES.encrypt(temp.data);
                }
                kaayou.emit("common", "ui::Loading::Show", { arrMsg: ["游戏注册中"] });
                let res = await kaayou.Http.POST(common.mod.Config.GetAppConfig().loginUrl + "/service", { msgdata: JSON.stringify(temp) });
                kaayou.emit("common", "ui::Loading::Hide");
                let msg: kaayou.Ka_MSG_RES = kaayou.Http.parseResult(res);
                //PlatformMgr.getInstance().sys.Dialog(JSON.stringify( msg.data));
                if (!msg) { return; }
                if (msg.errcode != 0) {
                    kaayou.emit('common', 'ui::Toast::Show', { msg: msg.data || "注册失败" })
                    return;
                }

                kaayou.DataSet.set('user::token', JSON.stringify({ token: msg.data.token, uid: msg.data.uid }));
                common.mod.Config.GetAppConfig().hallAddr = msg.data.hall;
                common.mod.Config.GetAppConfig().hallUrl = common.mod.Config.HttpSchema + msg.data.hall;
                common.mod.Config.GetAppConfig().apiUrl = msg.data.api;


                //支付的appid
                common.mod.Config.GetAppConfig().payappid = msg.data.appid;
                common.mod.Config.GetAppConfig().payapptoken = msg.data.apptoken;
                common.mod.Config.GetAppConfig().insureendline = Number(msg.data.insureendline) || 0;
                common.mod.Config.GetAppConfig().broadcast_cost = Number(msg.data.broadcast_cost) || 0;
                setTimeout(() => { kaayou.emit("common", "Config::Update"); }, 1);
                kaayou.DataSet.set('isNew', JSON.stringify(msg.data.isnew));//是否为新用户传值出去
                kaayou.emit("lobby", "mod::User::Login");
            }



            //是否老游客
            @BindEvent("lobby", "mod::User::doCheckOldYK")
            async doCheckOldYK(data: { call: Function }) {
                data.call && data.call(false);
                return;
                var platform = cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative ? 2 : 1;
                let tempCode = kaayou.PlatformMgr.getInstance().sys.GetDeviceKey();
                let temp = {
                    "head": "checkYK",
                    "data": JSON.stringify({ machinecode: tempCode }),
                    "msgsign": {
                        "time": new Date().getTime(),
                        "encode": 0
                    }
                }
                kaayou.emit("common", 'ui::Loading::Show');
                let res = await kaayou.Http.POST(common.mod.Config.GetAppConfig().loginUrl + "/service", { msgdata: JSON.stringify(temp) });
                kaayou.emit("common", 'ui::Loading::Hide');
                let msg: kaayou.Ka_MSG_RES = kaayou.Http.parseResult(res);
                if (!msg) { return; }
                if (msg.errcode != 0) {
                    data.call && data.call(false);
                    return;
                }
                if (!msg.data) {
                    data.call && data.call(false);
                    return;
                }

            }






            //重置密码
            @BindEvent("lobby", "mod::User::Resetpassword")
            async doResetpasswordByPhone(data: { mobile: string, code: string, password: string }) {

                if (!data || !data.mobile || !data.code || !data.password) { return; }
                if (!kaayou.Identify.isPhone(data.mobile)) {
                    kaayou.emit('common', 'ui::Toast::Show', { msg: "手机号码格式错误！" })
                    return;
                }
                if (data.code.length < 6) {
                    kaayou.emit('common', 'ui::Toast::Show', { msg: "验证码格式错误!" })
                    return;
                }

                let sdata: proto_resetPassword = { mobile: data.mobile, code: data.code, password: data.password }
                let temp = {
                    "head": UserMessageHead.resetPassword,
                    //"data": "{\"mobile\":\"" + data.mobile + "\",\"code\":\"" + data.code + "\"}",
                    "data": JSON.stringify(sdata),
                    "msgsign": {
                        "time": new Date().getTime(),
                        "encode": 0
                    }
                }
                if (common.mod.Config.isLoginEncryp) {
                    temp.msgsign.encode = 1;
                    temp.data = kaayou.AES.encrypt(temp.data);
                }
                kaayou.emit("common", "ui::Loading::Show", { arrMsg: ["重置密码中"] });
                let res = await kaayou.Http.POST(common.mod.Config.GetAppConfig().loginUrl + "/service", { msgdata: JSON.stringify(temp) });
                kaayou.emit("common", "ui::Loading::Hide");
                let msg: kaayou.Ka_MSG_RES = kaayou.Http.parseResult(res);
                //PlatformMgr.getInstance().sys.Dialog(JSON.stringify( msg.data));
                if (!msg) { return; }
                if (msg.errcode != 0) {
                    kaayou.emit('common', 'ui::Toast::Show', { msg: msg.data || "重置失败" })
                    return;
                }
                kaayou.emit('common', 'ui::Toast::Show', { msg: "重置密码成功" })
                // kaayou.emit('lobby', 'ui::PhoneFindPlane::Hide');

            }

            //新手机登陆  手机号加密码
            @BindEvent("lobby", "mod::User::GetTokenByPhone_V2")
            async doGetTokenByPhone_V2(data: { mobile: string, password: string }) {
                if (!data || !data.mobile || !data.password) { return; }
                if (!kaayou.Identify.isPhone(data.mobile)) {
                    kaayou.emit('common', 'ui::Toast::Show', { msg: "手机号码格式错误！" })
                    return;
                }

                var platform = cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative ? 2 : 1;
                let tempCode = kaayou.PlatformMgr.getInstance().sys.GetDeviceKey();
                let sdata: proto_loginMobile_v2 = { mobile: data.mobile, password: data.password, platform: platform, machinecode: tempCode }
                let temp = {
                    "head": UserMessageHead.loginMobile_v2,
                    "data": JSON.stringify(sdata),
                    "msgsign": {
                        "time": new Date().getTime(),
                        "encode": 0
                    }
                }
                if (common.mod.Config.isLoginEncryp) {
                    temp.msgsign.encode = 1;
                    temp.data = kaayou.AES.encrypt(temp.data);
                }
                kaayou.emit("common", "ui::Loading::Show", { arrMsg: ["游戏加载中"] });
                let res = await kaayou.Http.POST(common.mod.Config.GetAppConfig().loginUrl + "/service", { msgdata: JSON.stringify(temp) });
                kaayou.emit("common", "ui::Loading::Hide");
                let msg: kaayou.Ka_MSG_RES = kaayou.Http.parseResult(res);
                //PlatformMgr.getInstance().sys.Dialog(JSON.stringify( msg.data));
                if (this.checkLoginErr(msg)) {
                    return;
                }

                // msg.data['need_bind_wechat']
                if (msg.data['need_bind_wechat']) {
                    this.tempBindPhone = data.mobile;
                    kaayou.emit('lobby', 'ui::BindWeChat::Show');
                    return;
                }


                this.__doSetAfterLoginConfig(msg.data);

                kaayou.DataSet.set('isNew', JSON.stringify(msg.data.isnew));//是否为新用户传值出去
                kaayou.emit("lobby", "mod::User::Login");
            }

            //老房卡场手机登录，不手机号加验证码
            @BindEvent("lobby", "mod::User::GetTokenByPhone")
            async doGetTokenByPhone(data: { mobile: string, code: string }) {
                if (!data || !data.mobile || !data.code) { return; }
                if (!kaayou.Identify.isPhone(data.mobile)) {
                    kaayou.emit('common', 'ui::Toast::Show', { msg: "手机号码格式错误！" })
                    return;
                }
                if (data.code.length < 6) {
                    kaayou.emit('common', 'ui::Toast::Show', { msg: "验证码格式错误!" })
                    return;
                }
                var platform = cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative ? 2 : 1;
                let tempCode = kaayou.PlatformMgr.getInstance().sys.GetDeviceKey();
                let sdata: proto_loginMobile = { mobile: data.mobile, code: data.code, platform: platform, machinecode: tempCode }
                let temp = {
                    "head": UserMessageHead.loginMobile,
                    //"data": "{\"mobile\":\"" + data.mobile + "\",\"code\":\"" + data.code + "\"}",
                    "data": JSON.stringify(sdata),
                    "msgsign": {
                        "time": new Date().getTime(),
                        "encode": 0
                    }
                }
                if (common.mod.Config.isLoginEncryp) {
                    temp.msgsign.encode = 1;
                    temp.data = kaayou.AES.encrypt(temp.data);
                }
                kaayou.emit("common", "ui::Loading::Show", { arrMsg: ["游戏加载中", "读取账号信息中", "加载成功进入中"] });
                let res = await kaayou.Http.POST(common.mod.Config.GetAppConfig().loginUrl + "/service", { msgdata: JSON.stringify(temp) });
                kaayou.emit("common", "ui::Loading::Hide");
                let msg: kaayou.Ka_MSG_RES = kaayou.Http.parseResult(res);
                //PlatformMgr.getInstance().sys.Dialog(JSON.stringify( msg.data));
                if (this.checkLoginErr(msg)) {
                    return;
                }

                // msg.data['need_bind_wechat']
                if (msg.data['need_bind_wechat']) {
                    this.tempBindPhone = data.mobile;
                    kaayou.emit('lobby', 'ui::BindWeChat::Show');
                    return;
                }


                this.__doSetAfterLoginConfig(msg.data);


                kaayou.DataSet.set('isNew', JSON.stringify(msg.data.isnew));//是否为新用户传值出去
                kaayou.emit("lobby", "mod::User::Login");
            }

            @BindEvent("lobby", "mod::User::VerifyPhone")
            async verifyPhone(data: { mobile: string, code: string }) {
                if (!data || !data.mobile || !data.code) { return; }
                if (!kaayou.Identify.isPhone(data.mobile)) {
                    kaayou.emit('common', 'ui::Toast::Show', { msg: "手机号码格式错误！" })
                    return;
                }
                if (data.code.length < 6) {
                    kaayou.emit('common', 'ui::Toast::Show', { msg: "验证码格式错误!" })
                    return;
                }
                var platform = cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative ? 2 : 1;
                let tempCode = kaayou.PlatformMgr.getInstance().sys.GetDeviceKey();
                let sdata: proto_loginMobile = { mobile: data.mobile, code: data.code, platform: platform, machinecode: tempCode }
                let temp = {
                    "head": UserMessageHead.loginMobile,
                    "data": JSON.stringify(sdata),
                    "msgsign": {
                        "time": new Date().getTime(),
                        "encode": 0
                    }
                }
                if (common.mod.Config.isLoginEncryp) {
                    temp.msgsign.encode = 1;
                    temp.data = kaayou.AES.encrypt(temp.data);
                }
                kaayou.emit("common", "ui::Loading::Show", { msg: "正在验证手机号" });
                let res = await kaayou.Http.POST(common.mod.Config.GetAppConfig().loginUrl + "/service", { msgdata: JSON.stringify(temp) });
                kaayou.emit("common", "ui::Loading::Hide");
                let msg: kaayou.Ka_MSG_RES = kaayou.Http.parseResult(res);
                if (this.checkLoginErr(msg)) {
                    return;
                }
                kaayou.emit("common", "ui::VerifyPhone::Passed");
            }

            tempBindPhone: string = "";

            //lw181127微信登录
            @BindEvent('lobby', "mod::User::GetTokenByWechat")
            async doGetTokenByWechat(data: { code: string }) {
                var platform = cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative ? 2 : 1;

                //vsenxx根据ShowDoc修改
                let tempCode = kaayou.PlatformMgr.getInstance().sys.GetDeviceKey();

                let sdata: proto_loginWechat = {
                    code: data.code,
                    mobile: this.tempBindPhone,
                    platform: platform,
                    machinecode: tempCode,
                }

                if (cc.sys.isWeChat) {

                } else {
                    sdata.appid = "xyy_20190305_main_01";
                }

                let temp = {
                    "head": UserMessageHead.loginWechat,
                    "data": JSON.stringify(sdata),
                    "msgsign": {
                        "time": new Date().getTime(),
                        "encode": 0
                    }
                }
                if (common.mod.Config.isLoginEncryp) {
                    temp.msgsign.encode = 1;
                    temp.data = kaayou.AES.encrypt(temp.data);
                }
                kaayou.emit('common', "ui::Loading::Show", { arrMsg: ["游戏加载中", "读取账号信息中", "加载成功进入中"] });
                let res = await kaayou.Http.POST(common.mod.Config.GetAppConfig().loginUrl + "/service", { msgdata: JSON.stringify(temp) });
                console.log("微信登录服务器token：", res);
                kaayou.emit('common', "ui::Loading::Hide");
                let msg: kaayou.Ka_MSG_RES = kaayou.Http.parseResult(res);
                if (this.checkLoginErr(msg)) {
                    return;
                }


                this.__doSetAfterLoginConfig(msg.data);


                kaayou.DataSet.set('isNew', JSON.stringify(msg.data.isnew));//是否为新用户传值出去


                kaayou.emit("lobby", "mod::User::Login");
            }

            //vsenxx
            //授权绑定微信  手机号绑定更新  游客绑定绑定账号
            @BindEvent('lobby', "mod::User::doUpgradeWechat")
            doUpgradeWechat() {
                let self = this;
                kaayou.getController('').onece('mod::User::wx::update', async function (e: kaayou.Event) {
                    var code = e.data;
                    kaayou.emit("common", "ui::Loading::Show");
                    let sdata: proto_bindwechat = { code: "" + code }
                    let info: proto_bindwechat_res = await kaayou.sendMessage('lobby', UserMessageHead.bindwechat, sdata, kaayou.MakeResultMessageHead(UserMessageHead.bindwechat));
                    kaayou.emit('common', "ui::Loading::Hide");
                    if (info.errcode) {
                        kaayou.emit('common', 'ui::Dialog::Show', {
                            msg: lodash.isString(info.msg) ? info.msg : "修改失败",
                            close: {
                                isShow: true,
                                action: null,
                            },
                            btns: [{
                                name: "确定",
                                colorType: 'blue'
                            }]
                        })
                        return;
                    }
                    //如果是游客账号
                    if (self.userinfo.user_type == 1) {
                        //升级为微信账号
                        self.userinfo.user_type = 3;
                    } else if (self.userinfo.user_type == 2) {
                        //升级为手机加微信绑定
                        self.userinfo.user_type = 4;
                    }

                    self.userinfo.name = info.nickname || self.userinfo.name;
                    self.userinfo.sex = info.sex || self.userinfo.sex;
                    self.userinfo.imgurl = info.imgurl || self.userinfo.imgurl;
                    kaayou.emit("lobby", "ui::UpdateUserInfo", self.userinfo);

                }, this);
                kaayou.PlatformMgr.getInstance().wx.Update();
            }


            //vsenxx
            //游客绑定手机号
            @BindEvent('lobby', "mod::User::doUpgradePhone")
            async doUpgradePhone(data: { mobile: string, code: string, password: string }) {
                let self = this;
                kaayou.emit("common", "ui::Loading::Show");
                let sdata: proto_bindmobile_v2 = { code: "" + data.code, mobile: data.mobile, password: data.password }
                let info: proto_bindmobile_v2_res = await kaayou.sendMessage('lobby', UserMessageHead.bindmobilev2,
                    sdata,
                    "ws::Msg::bindmobilev2");
                kaayou.emit('common', "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit('common', 'ui::Dialog::Show', {
                        msg: lodash.isString(info.msg) ? info.msg : "修改失败",
                        close: {
                            isShow: true,
                            action: null,
                        },
                        btns: [{
                            name: "确定",
                            colorType: 'blue'
                        }]
                    })
                    return;
                }
                if (self.userinfo.user_type == 1) {
                    self.userinfo.user_type = 2;
                }
                self.userinfo.tel = data.mobile;
                kaayou.emit("lobby", "ui::BindPhonePanel::Hide");
                kaayou.emit("lobby", "ui::UpdateUserInfo", self.userinfo);

            }



            @BindEvent("lobby", "mod::User::Login")
            doLogin() {
                kaayou.emit("common", "ui::Loading::Show", { msg: "加载中...", time: 3 });
                try {
                    var token = kaayou.DataSet.get('user::token');
                    if (!token) {
                        console.error("token is undefine");
                        return;
                    }

                    if (!common.mod.Config.GetAppConfig()) {
                        console.error("appconfig is undefine");
                        return;
                    }
                    if (!common.mod.Config.GetAppConfig().hallAddr) {
                        console.error("hallUrl is undefine");
                        return;
                    }
                    let arr = common.mod.Config.GetAppConfig().hallAddr.split(":");
                    kaayou.NetManager.getInstance().getSocket('lobby').doConnect({ ip: arr[0], port: Number(arr[1]) });
                } catch (err) {
                    console.error(err);
                }
            }


            private userinfo: Data_Uerinfo = null;
            public getUserInfo() {
                return this.userinfo;
            }

            @BindEvent('lobby', "ws::onConnect")
            onConnect() {
                let self = this;
                var token: any = kaayou.DataSet.get('user::token');
                token = JSON.parse(token);
                token.minfo = JSON.stringify({});
                token.engine = 2;//2是js
                kaayou.DataSet.set('user::token', JSON.stringify(token));
                if (this.userinfo == null) {
                    kaayou.emit("common", "ui::Loading::Show", { msg: "正在加载用户信息", time: 3 });
                }
                console.log("sendMessage", "开始发送" + "setuid");

                let sdata: proto_setuid = {
                    token: token.token,
                    minfo: token.minfo,
                    engine: 2,
                    uid: token.uid
                }

                let info: proto_setuid_res = kaayou.sendMessage('lobby', UserMessageHead.setuid, sdata, kaayou.MakeResultMessageHead(UserMessageHead.setuid), (info) => {
                    console.log("sendMessage", "完成发送" + "setuid");
                    kaayou.emit('common', "ui::Loading::Hide");
                    if (info.errcode > 0) {
                        kaayou.emit('common', 'ui::Dialog::Show', {
                            msg: info.msg || "登录失败", btns: [{
                                name: "确定",
                                action: function () {
                                    kaayou.emit("lobby", "mod::User::LogOut");
                                }
                            }]
                        })
                        return;
                    }

                    kaayou.SoundManager.getInstance().playBgm(common.SoundRes.Game_bgm);
                    let appConfig = common.mod.Config.AppConfig
                    if (appConfig && appConfig.gps.enabled && cc.sys.os == cc.sys.OS_ANDROID) {  //当需要去调用位置的时候 安卓的
                        setTimeout(() => {
                            kaayou.PlatformMgr.getInstance().map.GetMapInfo();
                        }, 200);
                    }

                    cc.sys.localStorage.setItem('user::token', JSON.stringify(token));
                    if (this.userinfo == null) {
                        kaayou.emit("common", "ui::Loading::Show", { msg: "正在进入大厅", time: 3 });
                    }

                    self.userinfo = {
                        bind_wechat: info.bind_wechat,
                        hot_version:info.hot_version,
                        user_type: info.user_type, // 1	游客账号     2	手机账号     3	微信账号
                        
                        uid: info.uid,
                        name: info.nickname,
                        sex: info.sex,
                        imgurl: info.imgurl,
                        tel: info.tel,
                        ip: info.ip,
                        games: info.games,
                        isCertification: info.certification,
                        /////
                        game_id: info.game_id,
                        table_id: info.table_id,
                        fid: info.fid,    //楼层ID
                        hid: info.hid,    //茶楼ID
                        area: info.area,
                        site_type: info.site_type,
                        site_id: info.site_id,
                        realname: info.realname,
                        //////
                        card: info.card,
                        gold: info.gold,
                        gold_bean: info.gold_bean,
                        insure_gold: info.insure_gold,
                        describe_info: info.describe_info,
                        delivery_img: info.delivery_img,
                        diamond: info.diamond,
                        refuse_invite: info.refuse_invite,
                    };
                    common.mod.HotUpdate.checkNeedUpdate(info.hot_version);
                    //lw200619setuid成功就初始化gvoice
                    if (!kaayou.PlatformMgr.getInstance().gvoice.getInitStatus()) {
                        kaayou.PlatformMgr.getInstance().gvoice.Init(info.uid);
                    }

                    //lw200509如果不是湖北就全部算武汉的
                    if (this.userinfo.area.substr(0, 2) != "42") {
                        this.userinfo.area = "420100";
                        kaayou.emit("lobby", "mod::User::areaenter", { code: this.userinfo.area });
                    }

                    // this.userinfo.area = "130700";
                    // kaayou.emit("lobby", "mod::User::areaenter", { code: this.userinfo.area });

                    kaayou.DataSet.set('user::games', this.userinfo.games);
                    kaayou.DataSet.set('user::info', JSON.stringify(this.userinfo));

                    kaayou.emit("lobby", "ui::RunScene");
                    kaayou.emit("lobby", "ui::LoginSucceed");
                    kaayou.emit("lobby", "ui::UpdateUserInfo", this.userinfo);
                    kaayou.emit("lobby", "mod::Room::AutoJoinRoom");
                    kaayou.emit("tea", "mod::TeaHouse::doGetList");
                    let configData = common.mod.Config.GetAppConfig();
                    let dt = configData.feature.dt;
                    if (configData && configData.feature && dt) {
                        if (lodash.isEmpty(this.userinfo.area)) {
                            //自动选择地区
                            kaayou.emit("lobby", "ui::Areas::Show", { force: true });
                        } else {
                            let sCode = this.userinfo.area;
                            let sName = common.mod.ChineseMap.getInstance().getName(sCode);
                            kaayou.emit("lobby", "ui::city::refresh", { code: sCode, name: sName });
                        }
                    } else {
                        //默认设为崇阳
                        kaayou.emit("lobby", "mod::User::areaenter", { code: "421223" });
                    }

                    kaayou.emit("common", "ui::Loading::Hide");

                    // 免责声明和赠送房卡发送
                    let isNew = !(kaayou.DataSet.get('isNew') === 'false');
                    if (isNew) {
                        // kaayou.emit('lobby', 'ui::Disclaimer::Show', { isnew: isNew, cardNum: this.userinfo.card , gold:this.userinfo.gold });
                        let options = {
                            title: "",
                            msg: "首次登陆，赠送您" + this.userinfo.card + "房卡与" + this.userinfo.gold + "金币！",
                            close: {
                                isShow: false,
                                action: null,
                            },
                            btns: [
                                {
                                    name: "确定",
                                    colorType: 'green'
                                }
                            ]
                        }
                        kaayou.emit('common', 'ui::Dialog::Show', options);
                        kaayou.DataSet.set('isNew', 'false');
                    }
                }, self);
            }
            //这个是接收更新房卡的推送
            @BindEvent("lobby", "ws::Msg::updcard")
            updcard(data) {
                console.log("收到了更新房卡");
                if (!!!this.userinfo) return;
                this.userinfo.card = data.card;
                kaayou.emit("lobby", "ui::UpdateUserInfo", this.userinfo || null);
            }

            @BindEvent("lobby", kaayou.MakeResultMessageHead(UserMessageHead.upddiamond_ntf))
            updateDiamond(data: proto_upddiamond_ntf_res) {
                console.log("收到了更新钻石");
                if (!!!this.userinfo) return;
                this.userinfo.diamond = data.diamond;
                kaayou.emit("lobby", "ui::UpdateUserInfo", this.userinfo || null);
            }

            //这个是接受更新二维码的推送
            @BindEvent("lobby", "ws::Msg::deliveryinfoupdate")
            updatedelivery_img(data) {
                console.log("收到了更新二维码");
                if (!!!this.userinfo) return;
                this.userinfo.delivery_img = data.delivery_img;
                kaayou.emit("lobby", "ui::UpdateUserInfo", this.userinfo || null);
            }

            @BindEvent("lobby", "ws::Msg::userblankchange_ntf")
            userBank(data) {
                console.log(data);
                kaayou.emit('common', 'ui::Dialog::Show', {
                    msg: data.reason || "该账号已封！", btns: [{
                        name: "确定",
                        action: function () {
                            kaayou.emit("lobby", "mod::User::LogOut");
                        }
                    }]
                })
            }



            @BindEvent("lobby", "mod::User::doEditBaseUserInfo")
            async doEditBaseUserInfo(data: { nickname: string, sex: number, call: Function }) {
                if (!data || !data.nickname || !data.sex) { return; }
                let sdata: proto_updateuserinfo = {
                    nickname: data.nickname,
                    sex: data.sex,
                }
                let info = await kaayou.sendMessage('lobby', UserMessageHead.updateuserinfo, sdata, kaayou.MakeResultMessageHead(UserMessageHead.updateuserinfo));
                if (info.errcode) {
                    kaayou.emit('common', 'ui::Toast::Show', { msg: lodash.isString(info.msg) ? info.msg : "修改失败" });
                    if (data.call) { data.call('修改失败') }
                    return;
                }
                this.userinfo.name = data.nickname;
                this.userinfo.sex = data.sex;
                kaayou.emit('common', 'ui::Toast::Show', { msg: "修改成功" });
                if (data.call) { data.call(null) }
            }

            @BindEvent("lobby", "mod::User::doEditdescribeinfo")
            async doEditdescribeinfo(data: { describe: string, call: Function }) {
                if (!data || !data.describe) { return; }
                let sdata: proto_updatedescribeinfo = {
                    describe: data.describe
                }
                let info = await kaayou.sendMessage('lobby', UserMessageHead.updatedescribeinfo, sdata, kaayou.MakeResultMessageHead(UserMessageHead.updatedescribeinfo))
                if (info.errcode) {
                    kaayou.emit('common', 'ui::Toast::Show', { msg: lodash.isString(info.msg) ? info.msg : "修改失败" });
                    if (data.call) { data.call('修改失败') }
                    return;
                }
                this.userinfo.describe_info = data.describe;
                kaayou.emit('common', 'ui::Toast::Show', { msg: "修改成功" });
                if (data.call) { data.call(null) }
            }

            @BindEvent("lobby", "mod::User::setuserrefuseinvite")
            async doSetuserrefuseinvite(data: { refuse_invite: boolean }) {
                if (!data) { return; }
                let sdata: proto_setuserrefuseinvite = {
                    refuse_invite: data.refuse_invite
                }
                let info = await kaayou.sendMessage('lobby', UserMessageHead.setuserrefuseinvite, sdata, kaayou.MakeResultMessageHead(UserMessageHead.setuserrefuseinvite))
                if (info.errcode) {
                    kaayou.emit('common', 'ui::Toast::Show', { msg: lodash.isString(info.msg) ? info.msg : "修改失败" });
                    return;
                }
                this.userinfo.refuse_invite = data.refuse_invite;
                kaayou.DataSet.set('user::info', JSON.stringify(this.userinfo));
                kaayou.emit('common', 'ui::Toast::Show', { msg: "设置成功" });
            }

            //设置玩家性别
            @BindEvent("lobby", "mod::User::changeSex")
            async doSetChangeSex(data: { sex: number }) {
                if (!data) { return; }
                let sdata: proto_usersetsex = {
                    sex: data.sex
                }
                let info = await kaayou.sendMessage('lobby', UserMessageHead.usersetsex, sdata, kaayou.MakeResultMessageHead(UserMessageHead.usersetsex))
                if (info.errcode) {
                    kaayou.emit('common', 'ui::Toast::Show', { msg: lodash.isString(info.msg) ? info.msg : "修改失败" });
                    return;
                }
                this.userinfo.sex = data.sex;
                kaayou.DataSet.set('user::info', JSON.stringify(this.userinfo));
                kaayou.emit('common', 'ui::Toast::Show', { msg: "设置成功" });
            }

            //获取手机短信验证码
            @BindEvent("lobby", "mod::User::getPhoneMsgCode")
            async getPhoneMsgCode(data: { mobile: string, type: number, call: Function }) {
                if (!data || !data.mobile || !data.type) { return; }
                if (!kaayou.Identify.isPhone(data.mobile)) {
                    kaayou.emit('common', 'ui::Toast::Show', { msg: "手机号码格式错误！" })
                    return;
                }
                let callFun = data.call || null;

                let temp = {
                    "head": "smscode",
                    "data": "{\"mobile\":\"" + data.mobile + "\",\"type\":" + data.type + "}",
                    "msgsign": {
                        "time": new Date().getTime(),
                        "encode": 0
                    }
                }
                if (common.mod.Config.isLoginEncryp) {
                    temp.msgsign.encode = 1;
                    temp.data = kaayou.AES.encrypt(temp.data);
                }
                kaayou.emit('common', "ui::Loading::Show");
                let res = await kaayou.Http.POST(common.mod.Config.GetAppConfig().loginUrl + "/service", { msgdata: JSON.stringify(temp) });
                kaayou.emit('common', "ui::Loading::Hide");
                let msg: kaayou.Ka_MSG_RES = kaayou.Http.parseResult(res);
                if (!msg) { return; }
                if (msg.errcode != 0) {
                    kaayou.emit('common', 'ui::Toast::Show', { msg: msg.data || "获取验证码失败！" })
                    return;
                }
                kaayou.emit('common', 'ui::Toast::Show', { msg: "验证码发送成功！", time: 2, mask: true });
                if (lodash.isFunction(callFun)) {
                    callFun();
                }
            }
            @BindEvent("lobby", "mod::User::GetUpdateUserInfo")
            onGetUpdateUserInfo() {
                kaayou.emit("lobby", "ui::UpdateUserInfo", this.userinfo || null);
            }


            @BindEvent("lobby", "mod::User::Saveinsuregold")
            async onDoSaveinsuregold(data: { insuregold: number }) {
                if (!data) { return; }
                if (lodash.isUndefined(data.insuregold)) { return; }
                if (lodash.isNaN(data.insuregold)) { return; }
                if (lodash.isNull(data.insuregold)) { return; }
                if (!lodash.isNumber(data.insuregold)) { return; }
                kaayou.emit('common', "ui::Loading::Show");
                let sdata: proto_saveinsuregold = { gold: data.insuregold }
                let info: proto_saveinsuregold_res = await kaayou.sendMessage('lobby', UserMessageHead.saveinsuregold, sdata, kaayou.MakeResultMessageHead(UserMessageHead.saveinsuregold));
                kaayou.emit('common', "ui::Loading::Hide");
                if (info.errcode) {
                    let options = {
                        msg: info.msg,
                        btns: [
                            {
                                name: "确定",
                                action: function () {
                                },
                                colorType: 'green'
                            },
                        ]
                    }
                    kaayou.emit('common', 'ui::Dialog::Show', options);
                    return;
                }
                if (!this.userinfo) { return; }
                this.userinfo.gold = info.gold;
                this.userinfo.insure_gold = info.insure_gold;
                kaayou.DataSet.set('user::info', JSON.stringify(this.userinfo));
                kaayou.emit("lobby", "ui::UpdateUserInfo", this.userinfo || null);
                kaayou.emit("common", 'ui::Toast::Show', { msg: "保存成功！" });
                // kaayou.emit("lobby", "ui::InsureBoxPanel::Hide");
            }
            @BindEvent("lobby", kaayou.MakeResultMessageHead(UserMessageHead.updgold_ntf))
            async onUpdgold(data: proto_updgold_ntf_res) {
                if (!data) { return; }

                if (!this.userinfo) { return; }
                if (data.type == 27) {
                    kaayou.emit("common", "ui::GetRewardSusPanel::Show", { name: data.offset + "个金币" });
                }
                this.userinfo.gold = data.gold;
                kaayou.DataSet.set('user::info', JSON.stringify(this.userinfo));
                kaayou.emit("lobby", "ui::UpdateUserInfo", this.userinfo || null);
            }

            @BindEvent("lobby", kaayou.MakeResultMessageHead(UserMessageHead.updgoldbean_ntf))
            async onUpdgoldbean(data: proto_updgoldbean_ntf_res) {
                if (!data) { return; }

                if (data.errcode) {
                    let options = {
                        msg: data.msg,
                        btns: [
                            {
                                name: "确定",
                                action: function () {
                                },
                                colorType: 'green'
                            },
                        ]
                    }
                    kaayou.emit('common', 'ui::Dialog::Show', options);
                    return;
                }
                if (!this.userinfo) { return; }
                this.userinfo.gold_bean = data.gold_bean;
                kaayou.DataSet.set('user::info', JSON.stringify(this.userinfo));
                kaayou.emit("lobby", "ui::UpdateUserInfo", this.userinfo || null);
            }


            //接收领取低保消息
            @BindEvent("lobby", kaayou.MakeResultMessageHead(UserMessageHead.disposeallowances_ntf))
            grantDibao(data: proto_disposeallowances_ntf_res) {
                console.log("disposeallowances", data);
                console.log("sendMessage", "收到" + "disposeallowances");
                if (!data) { return; }
                kaayou.emit("lobby", "ui::DisposeAllowances::Show", data)
                // if (!this.userinfo) {
                //     let self = this;
                //     setTimeout(() => {
                //         self.userinfo.gold += data.gold;
                //         kaayou.DataSet.set('user::info', JSON.stringify(self.userinfo));
                //         kaayou.emit("lobby", "ui::UpdateUserInfo", self.userinfo || null);
                //         kaayou.emit('lobby', 'ui::DibaoPanel::Show', data);
                //     }, 20);
                // } else {
                // this.userinfo.gold += data.gold;
                // kaayou.DataSet.set('user::info', JSON.stringify(this.userinfo));
                // kaayou.emit("lobby", "ui::UpdateUserInfo", this.userinfo || null);
                // kaayou.emit('lobby', 'ui::DibaoPanel::Show', data);
                // }
            }

            //低保分享请求
            @BindEvent("lobby", 'mod::User::dibaoShare')
            async onDibaoShare(data: proto_getallowancesdouble) {
                let info = await kaayou.sendMessage('lobby', UserMessageHead.getallowancesdouble, data, kaayou.MakeResultMessageHead(UserMessageHead.getallowancesdouble));
                if (!info) {
                    console.error("分享失败，请稍后再试");
                    return;
                }
                if (info.errcode) {
                    console.error("分享失败，请稍后再试");
                    return;
                }
            }

            //请求签到表
            @BindEvent("lobby", "mod::SignIn::Get")
            async getSignIn() {
                let info = await kaayou.sendMessage('lobby', UserMessageHead.checkininfo, {}, kaayou.MakeResultMessageHead(UserMessageHead.checkininfo));
                if (!info) {
                    return;
                }
                if (info.errcode) {
                    return;
                }
            }

            //签到
            @BindEvent("lobby", kaayou.MakeResultMessageHead(UserMessageHead.task_checkin_ntf))
            signDay(data: proto_task_checkin_ntf_res) {
                console.log("task_checkin_ntf", data);

                if (!data || data.rewards.length <= 0) { return; }
                //kaayou.LayerSeq.getInstance().addLayerSeq("SignInPanel");
                kaayou.emit('lobby', 'ui::SignIn::ShowRedPoint', data);
            }

            //签到领奖请求
            @BindEvent("lobby", 'mod::User::checkin')
            async onSignDay(data: { checkin: boolean, name: string, img: string }) {
                let info = await kaayou.sendMessage('lobby', UserMessageHead.checkin, { checkin: data.checkin }, kaayou.MakeResultMessageHead(UserMessageHead.checkin));
                if (!info) {
                    console.error("领取失败");
                    return;
                }
                if (info.errcode && info.msg) {
                    kaayou.emit('common', 'ui::Toast::Show', { msg: info.msg });
                    return;
                } else {
                    if (data.checkin) {
                        kaayou.emit("lobby", "ui::SignIn::HideRedPoint");
                        kaayou.emit("lobby", "ui::SignIn::Hide")
                        kaayou.emit("lobby", "ui::UpdateUserInfo", this.userinfo || null);
                        kaayou.emit("common", "ui::lobbyScene::GoldFall");
                        kaayou.emit("common", "ui::GetRewardSusPanel::Show", data)
                    }
                }
            }

            @BindEvent("lobby", "mod::User::reporting")
            async onReporting(reqData) {
                if (!reqData || !reqData.data) { return; }
                if (reqData.encrypt) reqData.data = kaayou.AES.encryptPHP(JSON.stringify(reqData.data));
                kaayou.emit('common', "ui::Loading::Show");
                let res: any = await kaayou.Http.POST(common.mod.Config.ConfigUrl + "/api/complaint", { msgdata: JSON.stringify(reqData) });
                kaayou.emit("common", 'ui::Loading::Hide');
                if (res.code === -1) {
                    let options = {
                        msg: res.msg,
                        btns: [
                            {
                                name: "确定",
                                action: function () {
                                },
                                colorType: 'green'
                            },
                        ]
                    }
                    kaayou.emit('common', 'ui::Dialog::Show', options);
                    return;
                }
                kaayou.emit('lobby', 'ui::IllegalReportingPanel::Hide', { clean: true });
            }

            //实名认证
            @BindEvent("lobby", "mod::User::realName")
            async onRealName(data: proto_certification) {
                if (!data || !data.idcard || !data.name) { return; }
                if (!kaayou.Identify.idCard(data.idcard)) {
                    kaayou.emit('common', 'ui::Toast::Show', { msg: "身份证号码格式错误，请重新输入身份证号码！" })
                    return;
                }
                if (!kaayou.Identify.isReName(data.name)) {
                    kaayou.emit('common', 'ui::Toast::Show', { msg: "姓名格式错误，请重新输入2-5位中文字符！" })
                    return;
                }
                kaayou.emit('common', "ui::Loading::Show");
                let res = await kaayou.sendMessage('lobby', UserMessageHead.certification, data, kaayou.MakeResultMessageHead(UserMessageHead.certification));
                kaayou.emit('common', "ui::Loading::Hide");
                if (res.errcode) {
                    let options = {
                        msg: res.msg,
                        btns: [
                            {
                                name: "确定",
                                action: function () {
                                },
                                colorType: 'green'
                            },
                        ]
                    }
                    kaayou.emit('common', 'ui::Dialog::Show', options);
                    return;
                }
                this.userinfo.isCertification = true;
                this.userinfo.realname = data.name;
                kaayou.emit("lobby", "ui::UpdateUserInfo", this.userinfo);
                kaayou.emit("lobby", 'ui::RealNamePanel::Hide');
                // {
                //     let w = ["", "房卡", "欢乐豆", "礼券"];
                //     let msg = "恭喜获得" + res.num + w[res.wealth_type] || ""
                //     let options = {
                //         msg: msg,
                //         btns: [
                //             {
                //                 name: "确定",
                //                 action: function () {
                //                 },
                //                 colorType: 'green'
                //             },
                //         ]
                //     }
                //     kaayou.emit('common', 'ui::Dialog::Show', options);
                // }
            }

            //个人面板绑定手机号
            @BindEvent("lobby", "mod::User::bindPhone")
            async onBindPhone(data: { mobile: string, code: string }) {
                if (!data || !data.mobile || !data.code) { return; }
                if (!kaayou.Identify.isPhone(data.mobile)) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: "手机号码格式错误！" })
                    return;
                }
                if (data.code.length < 4) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: "验证码格式错误!" })
                    return;
                }
                kaayou.emit("common", "ui::Loading::Show");
                let sdata: proto_bindmobile = { mobile: data.mobile, code: data.code }
                let res = await kaayou.sendMessage("lobby", UserMessageHead.bindmobile, sdata, kaayou.MakeResultMessageHead(UserMessageHead.bindmobile));
                kaayou.emit("common", "ui::Loading::Hide");
                if (res.errcode) {
                    kaayou.emit("common", 'ui::Dialog::Show', {
                        msg: res.msg || "绑定失败！"
                    })
                    return;
                }
                let userInfo = this.getUserInfo();
                userInfo.tel = data.mobile;
                // this.setUserInfo(userInfo);
                kaayou.emit("common", 'ui::Toast::Show', { msg: '绑定成功!' });
                kaayou.emit("lobby", "ui::UpdateUserInfo", userInfo);
                // kaayou.emit("ui::UserInfo::ReBindShow");
                // kaayou.emit("ui::BindTel::Hide");
                kaayou.emit("lobby", "ui::BindPhonePanel::Hide");
            }



            //个人面板解除绑定手机号
            @BindEvent("lobby", "mod::User::unBindPhone")
            async unBindPhone(data: { mobile: string, code: string }) {
                if (!data || !data.mobile || !data.code) { return; }
                if (!kaayou.Identify.isPhone(data.mobile)) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: "手机号码格式错误！" })
                    return;
                }
                if (data.code.length < 4) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: "验证码格式错误!" })
                    return;
                }
                kaayou.emit("common", "ui::Loading::Show");
                let sdata: proto_unbindmobile = { mobile: data.mobile, code: data.code }
                let res = await kaayou.sendMessage("lobby", UserMessageHead.unbindmobile, sdata, kaayou.MakeResultMessageHead(UserMessageHead.unbindmobile));
                kaayou.emit("common", "ui::Loading::Hide");
                if (res.errcode) {
                    kaayou.emit("common", 'ui::Dialog::Show', {
                        msg: res.msg || "解除绑定失败！"
                    })
                    return;
                }
                //lw190411不让解绑只能重绑是考虑到微信万一被封号还能用手机号登录
                kaayou.emit("common", 'ui::Toast::Show', { msg: "解除原手机号成功，请继续绑定新的手机号码" })
                kaayou.emit("lobby", "ui::BindPhonePanel::change", { bind: true });
                // kaayou.emit("ui::UnBindTel::Hide");
                // kaayou.emit("ui::BindTel::Show");
            }

            @BindEvent("lobby", "mod::Lobby::CustomSuggestionList")
            async pullCustomSuggestionList() {
                kaayou.emit("common", "ui::Loading::Show");
                let res: any = await kaayou.Http.GET(common.mod.Config.ConfigUrl + "/api/proposal/list", null);

                try {
                    res = JSON.parse(res);
                } catch (e) {
                    res = {}
                }

                kaayou.emit("common", "ui::Loading::Hide");
                if (res.code != "0") {
                    return;
                }
                kaayou.emit("lobby", "ui::lobby::SuggestionList", { data: res.data })
            }

            @BindEvent("lobby", "mod::Lobby::CustomSuggestionIsNew")
            async CustomSuggestionIsNew() {
                //bst200930暂不提示是否有答复
                kaayou.emit("lobby", "ui::lobby::CustomSuggestionIsNew", { isNew: false })
                return;
                let { token } = JSON.parse(cc.sys.localStorage.getItem('user::token'));
                let address = common.mod.Config.GetAppConfig().suggestionaddress;

                let subData = {
                    data: JSON.stringify({ token })
                }

                kaayou.emit("common", "ui::Loading::Show");
                let res: any = await kaayou.Http.POST(address + "/api/proposal/check", subData, null, null, true);
                kaayou.emit("common", "ui::Loading::Hide");

                try {
                    res = JSON.parse(res);
                } catch (e) {
                    res = {}
                }
                let isNew = true;

                if (res.code != "0" || +res.data < 1) {
                    isNew = false;
                }

                kaayou.DataSet.set("lobby::hasNotReadMessage", isNew.toString())
                kaayou.emit("lobby", "ui::lobby::CustomSuggestionIsNew", { isNew })

            }


            @BindEvent("lobby", "mod::Lobby::CustomSuggestionCommit")
            async pullCustomSuggestionCommit({ mobile, advise }) {

                let { token } = JSON.parse(cc.sys.localStorage.getItem('user::token'));

                let subData = {
                    "data": { token, mobile, advise },
                    "time": new Date().getTime(),
                    "encrypt": true,
                    "sign": "",
                }
                
                if (subData.encrypt) subData.data = kaayou.AES.encryptPHP(JSON.stringify(subData.data));
                kaayou.emit("common", "ui::Loading::Show");
                let res: any = await kaayou.Http.POST(common.mod.Config.ConfigUrl + "/api/proposal/add", { msgdata: JSON.stringify(subData) });
                kaayou.emit("common", "ui::Loading::Hide");

                try {
                    res = JSON.parse(res);
                } catch (e) {
                    res = {}
                }

                if (res.code != "0") {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: "您的建议提交失败!" });
                    return;
                }
                //[]
                kaayou.emit("lobby", "ui::lobby::SuggestionSuccess")
            }

            @BindEvent("lobby", "mod::Lobby::CustomSuggestionFeedback")
            async pullCustomSuggestionFeedback(data: { callback?}) {

                data = data || {};
                let { callback = new Function } = data;
                let { token } = JSON.parse(cc.sys.localStorage.getItem('user::token'));

                let subData = {
                    data: { token },
                    "time": new Date().getTime(),
                    "encrypt": true,
                    "sign": "",
                }
                if (subData.encrypt) subData.data = kaayou.AES.encryptPHP(JSON.stringify(subData.data));
                kaayou.emit("common", "ui::Loading::Show");
                let res: any = await kaayou.Http.POST(common.mod.Config.ConfigUrl + "/api/proposal/msg", { msgdata: JSON.stringify(subData) });
                kaayou.emit("common", "ui::Loading::Hide");
                try {
                    res = JSON.parse(res);
                } catch (e) {
                    res = {}
                }
                if (res.code != "0") {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: "您的列表拉取失败，请重试!" });
                    callback(false)
                    return;
                }
                //[]
                callback(res.data && res.data.length > 0)
                if (!!res.data && res.data.length > 0)
                    kaayou.emit("lobby", "ui::lobby::suggestionfeedback::renderFeedList", { data: res.data })
            }


            @BindEvent("lobby","ui::CardRunOut::fangkalowertipsnotpop")
            async onCardRunOutNotPopToday(data:{hid:number}){

                if(lodash.isEmpty(data))
                    return ;

                kaayou.emit("common", "ui::Loading::Show");
                let res = await kaayou.sendMessage('lobby', "fangkalowertipsnotpop", {hid:data.hid}, kaayou.MakeResultMessageHead("fangkalowertipsnotpop"));
                kaayou.emit("common", "ui::Loading::Hide");

                // if(res.code!=0){
                //     kaayou.emit("common", 'ui::Toast::Show', { msg:res.msg || "您的请求失败，请重试!" });
                //     return ;
                // }

            }




            //自动加入逻辑修改：：：
            @BindEvent('lobby', "mod::Room::AutoJoinRoom")
            AutoJoinRoom() {
                var infoStr: any = kaayou.DataSet.get('user::info');
                console.log("AutoJoinRoom infoStr:", infoStr);
                let mwData = kaayou.PlatformMgr.getInstance().mw.getMagicWindowInfo();
                if (!infoStr) { return; }
                var info: Data_Uerinfo = JSON.parse(infoStr);
                console.log("info:", info);
                if (!info) { return; }
                if (info.table_id != 0) {   //首先由自己的房间跳转自己的房间
                    console.log("info.table_id:", info.table_id);
                    if (info.site_id != 0) {    //说明是金币场的。
                        kaayou.emit('lobby', "mod::RCGame::AreapkgbyRoomid", {
                            roomid: info.table_id, callBack: function (pkgInfo: proto_areapkgbytid_res) {
                                kaayou.emit('common', "ui::Loading::Show", { msg: "正在检查是否需要更新" });
                                common.mod.Update.ExistsSubGame(pkgInfo.package_key, pkgInfo.package_version, function () {
                                    kaayou.emit("lobby", "mod::GDGame::SiteIn", { kind: parseInt((info.site_id / 100).toString()), type: info.site_id % 100 })
                                    console.log(pkgInfo);
                                })
                            }
                        });
                        return;
                    }
                    //走这里说明是房卡
                    kaayou.emit('lobby', "mod::RCGame::AreapkgbyRoomid", { roomid: info.table_id });
                    return;
                }
                else if (mwData != undefined && mwData.length > 0 && mwData != "0") { //如果是魔窗分享的房间跳转魔窗分享的房间
                    let mwdata1 = {
                        cb: function () {
                            let mwData = kaayou.PlatformMgr.getInstance().mw.getMagicWindowInfo();
                            if (mwData != undefined && mwData.length > 0 && mwData != "0") {
                                let mwRoomId = JSON.parse(mwData).index;
                                console.log("魔窗返回的消息AutoJoinRoom：", mwRoomId);
                                if (mwRoomId.indexOf("hid") < 0) kaayou.emit("lobby", "mod::RCGame::AreapkgbyRoomid", { roomid: mwRoomId });
                                else {
                                    let arr = mwRoomId.split(";");
                                    let hid: number = parseInt(arr[0].substr(4));
                                    let invite_uid: number = parseInt(arr[1].substr(10));
                                    kaayou.emit("tea", "mod::TeaHouse::JoinHouse", { hid: hid, invite_uid: invite_uid });
                                }
                                return;
                            }
                        }
                    }
                    this.doJoinRoomWithMagicWindow(mwdata1);
                }
                else if (info.hid != 0) {
                    //如果上次在茶楼退出了游戏 则跳转茶楼场景
                    kaayou.emit("tea", "mod::TeaHouse::Enter", { hid: info.hid }, true, function () {
                        console.log("进去了");
                    });
                }
            }

            @BindEvent("lobby", "mod::Room::MagicWindow")
            doJoinRoomWithMagicWindow(data: { cb: Function }) {
                if (data.cb) {
                    data.cb();
                }
            };

        }
    }
    lobby.mod.User.getInstance();
}