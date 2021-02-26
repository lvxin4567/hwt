namespace kaayou {
    class GVoice {
        static bLoginOK: boolean = false;
        static roomId: string = "";
        static InitOK = false;
        Init(uid: number) {
            console.log("GVoice Init");
            if (!cc.sys.isNative) {
                GVoice.InitOK = true;
                return;
            }
            if (!PlatformMgr.getInstance().sys.checkAllowJSInterface("GVoiceInit")) {
                console.log("接口不存在:GVoiceInit");
                return;
            }
            if (cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("NativeOcClass", "GVoiceInit:", uid.toString());
            } else if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "GVoiceInit", "(Ljava/lang/String;)V", uid.toString());
            }
            GVoice.bLoginOK = false;
        }

        EnterRoom(roomId: string) {
            console.log("GVoice EnterRoom");
            if (!cc.sys.isNative) {
                //for test GVoice
                this.OnGvoiceJoinRoomOK(99);
                return;
            }
            if (!PlatformMgr.getInstance().sys.checkAllowJSInterface("GVoiceEnterTeamroom")) {
                console.log("接口不存在:GVoiceEnterTeamroom");
                return;
            }
            if (cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("NativeOcClass", "GVoiceEnterTeamroom:", roomId);
            } else if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "GVoiceEnterTeamroom", "(Ljava/lang/String;)V", roomId);
            }
            GVoice.roomId = roomId;
        }

        QuitRoom(roomId: string) {
            console.log("GVoice QuitRoom");
            if (!cc.sys.isNative) {
                return;
            }
            if (!PlatformMgr.getInstance().sys.checkAllowJSInterface("GVoiceQuitTeamroom")) {
                console.log("接口不存在:GVoiceEnterTeamroom");
                return;
            }
            if (cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("NativeOcClass", "GVoiceQuitTeamroom:", roomId);
            } else if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "GVoiceQuitTeamroom", "(Ljava/lang/String;)V", roomId);
            }
            GVoice.roomId = "";
        }

        OpenMic() {
            console.log("GVoice OpenMic");
            if (!cc.sys.isNative) {
                this.OnGvoiceOpenMicOK();
                return;
            }
            if (!PlatformMgr.getInstance().sys.checkAllowJSInterface("GVoiceOpenMic")) {
                console.log("接口不存在:GVoiceOpenMic");
                return;
            }
            if (cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("NativeOcClass", "GVoiceOpenMic:", true);
            } else if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "GVoiceOpenMic", "()V");
            }
        }

        OpenSpeaker() {
            console.log("GVoice OpenSpeaker");
            if (!cc.sys.isNative) {
                this.OnGvoiceOpenSpeakerOK();
                return;
            }
            if (!PlatformMgr.getInstance().sys.checkAllowJSInterface("GVoiceOpenSpeaker")) {
                console.log("接口不存在:GVoiceOpenSpeaker");
                return;
            }
            if (cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("NativeOcClass", "GVoiceOpenSpeaker:", true);
            } else if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "GVoiceOpenSpeaker", "()V");
            }
        }

        CloseMic() {
            console.log("GVoice CloseMic");
            if (!cc.sys.isNative) {
                this.OnGvoiceCloseMicOK();
                return;
            }

            if (cc.sys.os == cc.sys.OS_IOS) {
                if (!PlatformMgr.getInstance().sys.checkAllowJSInterface("GVoiceOpenMic")) {
                    console.log("接口不存在:GVoiceOpenMic");
                    return;
                }
                jsb.reflection.callStaticMethod("NativeOcClass", "GVoiceOpenMic:", false);
            } else if (cc.sys.os == cc.sys.OS_ANDROID) {
                if (!PlatformMgr.getInstance().sys.checkAllowJSInterface("GVoiceCloseMic")) {
                    console.log("接口不存在:GVoiceCloseMic");
                    return;
                }
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "GVoiceCloseMic", "()V");
            }
        }

        CloseSpeaker() {
            console.log("GVoice CloseSpeaker");
            if (!cc.sys.isNative) {
                this.OnGvoiceCloseSpeakerOK();
                return;
            }

            if (cc.sys.os == cc.sys.OS_IOS) {
                if (!PlatformMgr.getInstance().sys.checkAllowJSInterface("GVoiceOpenSpeaker")) {
                    console.log("接口不存在:GVoiceOpenSpeaker");
                    return;
                }
                jsb.reflection.callStaticMethod("NativeOcClass", "GVoiceOpenSpeaker:", false);
            } else if (cc.sys.os == cc.sys.OS_ANDROID) {
                if (!PlatformMgr.getInstance().sys.checkAllowJSInterface("GVoiceCloseSpeaker")) {
                    console.log("接口不存在:GVoiceCloseSpeaker");
                    return;
                }
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "GVoiceCloseSpeaker", "()V");
            }
        }

        ForbidMemberVoice(memId: number, bEnable: boolean, roomId: string) {
            console.log("GVoice ForbidMemberVoice memId = " + memId + ", bEnable = " + bEnable);
            if (!cc.sys.isNative) {
                return;
            }

            if (cc.sys.os == cc.sys.OS_IOS) {
                if (!PlatformMgr.getInstance().sys.checkAllowJSInterface("GVoiceForbidMemberVoice")) {
                    console.log("接口不存在:GVoiceForbidMemberVoice");
                    return;
                }
                jsb.reflection.callStaticMethod("NativeOcClass", "GVoiceForbidMemberVoice:enAble:AndRoomID:", memId, bEnable, roomId);
            } else if (cc.sys.os == cc.sys.OS_ANDROID) {
                if (!PlatformMgr.getInstance().sys.checkAllowJSInterface("GVoiceForbidMemberVoice")) {
                    console.log("接口不存在:GVoiceForbidMemberVoice");
                    return;
                }
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "GVoiceForbidMemberVoice",
                    "(IZLjava/lang/String;)V",
                    memId, bEnable, roomId);
            }
        }

        pause() {
            console.log("GVoice pause");
            if (!cc.sys.isNative) {
                return;
            }
            if (!PlatformMgr.getInstance().sys.checkAllowJSInterface("GVoicePause")) {
                console.log("接口不存在:GVoicePause");
                return;
            }
            if (cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("NativeOcClass", "GVoicePause");
            } else if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "GVoicePause", "()V");
            }
        }

        resume() {
            console.log("GVoice resume");
            if (!cc.sys.isNative) {
                return;
            }
            if (!PlatformMgr.getInstance().sys.checkAllowJSInterface("GVoiceResume")) {
                console.log("接口不存在:GVoicePause");
                return;
            }
            if (cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("NativeOcClass", "GVoiceResume");
            } else if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "GVoiceResume", "()V");
            }
        }

        getInitStatus() {

            return GVoice.InitOK;
        }

        //初始gv
        OnGvoiceInitOK() {
            console.log("语音初始化成功");
            GVoice.InitOK = true;
            kaayou.emit("", "OnGvoiceInitOK");
        }

        //加入成功
        OnGvoiceJoinRoomOK(memberID: number) {
            memberID = Number(memberID); //安卓平台返回的是string类型
            console.log("GVoice OnGvoiceJoinRoomOK, memberID =", memberID);
            kaayou.emit("", "OnGvoiceJoinRoomOK", { memberID: memberID });
        }
        //开麦成功
        OnGvoiceOpenMicOK() {
            console.log("GVoice OnGvoiceOpenMicOK");
            kaayou.emit("", "OnGvoiceOpenMicOK");
        }
        //关麦成功
        OnGvoiceCloseMicOK() {
            console.log("GVoice OnGvoiceCloseMicOK");
            kaayou.emit("", "OnGvoiceCloseMicOK");
        }
        //开扬声器成功
        OnGvoiceOpenSpeakerOK() {
            console.log("GVoice OnGvoiceOpenSpeakerOK");
            kaayou.emit("", "OnGvoiceOpenSpeakerOK");
        }
        //关扬声器成功
        OnGvoiceCloseSpeakerOK() {
            console.log("GVoice OnGvoiceCloseSpeakerOK");
            kaayou.emit("", "OnGvoiceCloseSpeakerOK");
        }

        //status 取值："0"：停止说话 "1"：开始说话 "2"：继续说话
        OnMemberVoice(memberid: number, status: number) {
            // console.log("GVoice OnMemberVoice:" + memberid + "-------" + status);
            kaayou.emit("", "OnGvoiceMemberVoice", { memberid: memberid, status: status });
        }

    }

    class webGame {
        Login(url: string, isVer: boolean) {
            if (!cc.sys.isNative) {
                return;
            }
            if (!PlatformMgr.getInstance().sys.checkAllowJSInterface("LoginWeb")) {
                console.log("接口不存在:LoginWeb");
                return;
            }
            if (cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("NativeOcClass", "LoginWeb:isVer:", url, isVer);
            } else if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "LoginWeb", "(Ljava/lang/String;Z)V", url, isVer);
            }
        }

        onLegendToPay(productInfo: string) {
            console.log("传奇相关商品" + productInfo);
            //kaayou://pay?appid=kaayou785024331&val=1000&goodsid=1&goodsname=yuanbao&orderid=1600239046076250299&extra=order:1600239046076250299%7C%7Cprice:1000
            kaayou.emit("lobby", "mod::mall::legendBuy", { infoStr: productInfo });
        }




    }


    class YunVa {
        static bLoginOK: boolean = false;
        micMember: Array<string> = [];
        _t = null;
        Init() {
            if (!cc.sys.isNative) {
                return;
            }
            if (!PlatformMgr.getInstance().sys.checkAllowJSInterface("InitMic")) {
                console.log("接口不存在:InitMic");
                return;
            }
            if (cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("NativeOcClass", "InitMic");
            } else if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "InitMic", "()V");
            }
            YunVa.bLoginOK = false;
        }
        OnMicLoginOK() {
            kaayou.emit("", "MicLoginOK");
            //kaayou.PlatformMgr.getInstance().sys.Dialog("语音链接成功");
            YunVa.bLoginOK = true;
        }
        IsLoginOK() {
            return YunVa.bLoginOK;
        }
        Login(uid: string, nickname: string, ext: string = "") {
            if (!cc.sys.isNative) {
                return;
            }
            let info = {
                uid: uid,
                nickname: nickname,
                ext: ext
            };
            if (!PlatformMgr.getInstance().sys.checkAllowJSInterface("LoginMic")) {
                console.log("接口不存在:LoginMic");
                return;
            }
            if (cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("NativeOcClass", "LoginMic:", JSON.stringify(info));
            } else if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "LoginMic", "(Ljava/lang/String;)V", JSON.stringify(info));
            }
        }

        Logout() {
            if (!cc.sys.isNative) {
                return;
            }
            if (!PlatformMgr.getInstance().sys.checkAllowJSInterface("LogoutMic")) {
                console.log("接口不存在:LogoutMic");
                return;
            }
            if (cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("NativeOcClass", "LogoutMic");
            } else if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "LogoutMic", "()V");
            }
            YunVa.bLoginOK = false;
        }
        BeginMic() {
            if (!cc.sys.isNative) {
                this.OnMicStart();
                return;
            }
            if (!PlatformMgr.getInstance().sys.checkAllowJSInterface("BeginMic")) {
                console.log("接口不存在:BeginMic");
                return;
            }
            if (cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("NativeOcClass", "BeginMic");
            } else if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "BeginMic", "()V");
            }

        }

        EndMic() {
            if (!cc.sys.isNative) {
                this.OnMicStop();
                this.OnMicOk("text url");
                return;
            }
            if (!PlatformMgr.getInstance().sys.checkAllowJSInterface("EndMic")) {
                console.log("接口不存在:EndMic");
                return;
            }
            if (cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("NativeOcClass", "EndMic");
            } else if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "EndMic", "()V");
            }

        }

        CancelMic() {
            if (!cc.sys.isNative) {
                this.OnMicStop();
                return;
            }
            if (!PlatformMgr.getInstance().sys.checkAllowJSInterface("CancelMic")) {
                console.log("接口不存在:CancelMic");
                return;
            }
            if (cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("NativeOcClass", "CancelMic");
            } else if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "CancelMic", "()V");
            }
        }

        PlayMic(uid: string, url: string) {
            if (!cc.sys.isNative) {
                let self = this;
                this.OnMicPlayStart(uid);
                setTimeout(() => {
                    self.OnMicPlayEnd(uid);
                }, 1000);
                return;
            }
            if (!PlatformMgr.getInstance().sys.checkAllowJSInterface("PlayMic")) {
                console.log("接口不存在:PlayMic");
                return;
            }
            if (cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("NativeOcClass", "PlayMic:URL:", uid, url);
            } else if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "PlayMic", "(Ljava/lang/String;Ljava/lang/String;)V", uid, url);
            }
        }
        OnMicStart() {
            kaayou.emit("", "MicStart");

        }
        OnMicVolume(ext: string, volume: number) {
            kaayou.emit("", "MicVolume", { ext: ext, volume: volume });
        }
        OnMicOk(url: string) {
            kaayou.emit("", "MicOk", url);
        }
        OnMicStop() {
            kaayou.emit("", "MicStop");
        }

        OnMicPlayStart(uid: string) {
            let self = this;
            kaayou.emit("", "MicPlayStart", uid);
            if (kaayou.PlatformMgr.getInstance().im.micMember.indexOf(uid) < 0) {
                kaayou.PlatformMgr.getInstance().im.micMember.push(uid);
            }
            if (kaayou.PlatformMgr.getInstance().im._t) { clearInterval(kaayou.PlatformMgr.getInstance().im._t); kaayou.PlatformMgr.getInstance().im._t = null; }

            kaayou.PlatformMgr.getInstance().im._t = setInterval(function () {
                if (kaayou.PlatformMgr.getInstance().im.micMember.length != 0) {
                    for (let i = 0; i < kaayou.PlatformMgr.getInstance().im.micMember.length; i++) {
                        kaayou.emit("", "MicPlayEnd", kaayou.PlatformMgr.getInstance().im.micMember[i]);
                    }
                }
                clearInterval(kaayou.PlatformMgr.getInstance().im._t); kaayou.PlatformMgr.getInstance().im._t = null;
            }, 30000)

        }
        OnMicPlayEnd(uid: string) {
            let index = kaayou.PlatformMgr.getInstance().im.micMember.indexOf(uid);
            kaayou.PlatformMgr.getInstance().im.micMember.splice(index, 1);
            kaayou.emit("", "MicPlayEnd", uid);
        }
    }

    class Wechat {
        static isUpdate: boolean = false;
        rewardedVideoAd = null;
        file: any;
        constructor() {
            if (cc.sys.isWeChat) {
                this.file = WXJSBridge.file;
            } else {
                this.file = {};
            }
        }
        CreateLoginBtn(param) {
            if (!cc.sys.isWeChat) { return; }
            WXJSBridge.login.create(param);
        }
        DestoryLoginBtn() {
            if (!cc.sys.isWeChat) { return; }
            WXJSBridge.login.destroy();
        }
        async GetAccessToken(appid, platform = 3) {
            let res: any = await kaayou.sendMessage("lobby", "getaccesscode", { appid: appid, platform }, "ws::Msg::getaccesscode");
            if (res.errcode !== 0) {
                return -1;
            }
            return res.access_token
        }
        //获取启动参数
        GetQuery() {
            if (!cc.sys.isWeChat) { return {}; }
            return WXJSBridge.sys.query ? WXJSBridge.sys.query : {};
        }
        Login() {
            Wechat.isUpdate = false;
            kaayou.emit("common", "ui::Loading::Show", { msg: "正在启动微信，请稍后...", time: 2 });
            setTimeout(function () {
                PlatformMgr.getInstance().wx.pullWX();
            }, 1)
        }
        pullWX() {
            if (!cc.sys.isNative) {
                cc.log(Wechat.isUpdate);
                return;
            }
            if (cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("NativeOcClass", "LoginWx");
            } else if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "LoginWx", "()V");
            }
        }
        Update() {
            Wechat.isUpdate = true;
            kaayou.emit("common", "ui::Loading::Show", { msg: "正在启动微信，请稍后...", time: 2 });
            setTimeout(function () {
                PlatformMgr.getInstance().wx.pullWX();
            }, 1)
        }
        OnWxLoginCancel() {
            kaayou.emit("common", "ui::Loading::Hide");
            kaayou.emit("", "WxLoginCancel");
        }
        OnWxInstalled() {
            kaayou.emit("common", "ui::Loading::Hide");
            kaayou.emit("", "WxInstalled");
        }

        lastWeChatCode = "";
        OnLogin(code: string, iv?: string, info?: string, rawdata?: string) {
            console.log("微信OnLogin:", code);
            if (!code || code.length < 1) { return; }
            //防止两次回调
            if (this.lastWeChatCode == code) {
                return;
            }
            this.lastWeChatCode = code;
            kaayou.emit("common", "ui::Loading::Hide");
            if (Wechat.isUpdate) {
                kaayou.emit("", "mod::User::wx::update", code);
            } else {
                kaayou.emit("", "mod::User::wx::login", { code: code, iv: iv, info: info, rawdata: rawdata });
            }
        }

        OnShareWxResult(code: string, transaction: string) {
            if (!code || code.length < 1) { return; }
            kaayou.emit("", "OnShareWxResult", { code: code, transaction: transaction });
        }
        ShareText(title: string, text: string, transaction: string = "") {
            if (!cc.sys.isNative) {
                return;
            }
            let data = {
                title: title,
                text: text,
                transaction: transaction
            }
            if (cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("NativeOcClass", "ShareText:", JSON.stringify(data));
            } else if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "ShareText", "(Ljava/lang/String;)V", JSON.stringify(data));
            }
        }
        ShareTimeLineText(title: string, text: string, transaction: string = "") {
            if (!cc.sys.isNative) {
                return;
            }
            let data = {
                title: title,
                text: text,
                transaction: transaction
            }
            if (cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("NativeOcClass", "ShareTimeLineText:", JSON.stringify(data));
            } else if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "ShareTimeLineText", "(Ljava/lang/String;)V", JSON.stringify(data));
            }
        }
        ShareURL(title: string, text: string, url: string, transaction: string = "") {
            if (!cc.sys.isNative) {
                return;
            }
            let data = {
                title: title,
                text: text,
                url: url,
                transaction: transaction
            }
            if (cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("NativeOcClass", "ShareURL:", JSON.stringify(data));
            } else if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "ShareURL", "(Ljava/lang/String;)V", JSON.stringify(data));
            }
        }
        ShareTimeLineURL(title: string, text: string, url: string, transaction: string = "") {
            if (!cc.sys.isNative) {
                return;
            }
            let data = {
                title: title,
                text: text,
                url: url,
                transaction: transaction
            }
            if (cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("NativeOcClass", "ShareTimeLineURL:", JSON.stringify(data));
            } else if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "ShareTimeLineURL", "(Ljava/lang/String;)V", JSON.stringify(data));
            }
        }
        ShareImage(title: string, path: string, transaction: string = "") {
            if (!cc.sys.isNative) {
                return;
            }
            let data = {
                title: title,
                path: path,
                transaction: transaction
            }
            if (cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("NativeOcClass", "ShareImage:", JSON.stringify(data));
            } else if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "ShareImage", "(Ljava/lang/String;)V", JSON.stringify(data));
            }
        }
        ShareTimeLineImage(title: string, path: string, transaction: string = "") {
            if (!cc.sys.isNative) {
                return;
            }
            let data = {
                title: title,
                path: path,
                transaction: transaction
            }
            if (cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("NativeOcClass", "ShareTimeLineImage:", JSON.stringify(data));
            } else if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "ShareTimeLineImage", "(Ljava/lang/String;)V", JSON.stringify(data));
            }
        }
        //=============微信小游戏视频模块=========
        createRewardedVideoAd(data: { adUnitId: string }) {
            let self = this;
            // this.rewardedVideoAd = wx.createRewardedVideoAd(data);//TODO 创建激励视频广告组件
            console.log(this.rewardedVideoAd);
            this.rewardedVideoAd.onLoad(() => {
                console.log('激励视频 广告加载成功');
                kaayou.emit('lobby', 'ui::LeftMenuPanle::videoLoad');
                // self.playVideo();
            })

            this.rewardedVideoAd.onError(err => {
                console.log(err);
                if (err.errCode && err.errMsg) {
                    kaayou.emit('common', 'ui::Toast::Show', { msg: err.errMsg });
                }
            })

            //关闭广告
            this.rewardedVideoAd.onClose(res => {
                if (res && res.isEnded || res === undefined) {
                    // 正常播放结束，可以下发游戏奖励
                    kaayou.emit('lobby', 'ws::Msg::videoadaward');
                    console.log('正常播放结束，可以下发游戏奖励')
                } else {
                    // 播放中途退出，不下发游戏奖励
                    kaayou.emit('common', 'ui::Toast::Show', { msg: "播放中途退出，不下发游戏奖励" });
                    console.log('播放中途退出，不下发游戏奖励')
                }
            })

        }
        //只有在用户点击激励视频广告组件上的 关闭广告 按钮时，广告才会关闭。开发者不可控制激励视频广告组件的隐藏。
        playVideo() {
            let self = this;
            self.rewardedVideoAd.show()
                .catch(err => {
                    self.rewardedVideoAd.load()
                        .then(() => self.rewardedVideoAd.show())
                })
        }


        ShowFeedback(title?: string) {
            if (cc.sys.isWeChat == undefined) {
                return;
            }

            // const button = wx.createFeedbackButton({
            //     type: 'text',
            //     text: title || '打开意见反馈页面',
            //     style: {
            //         left: 10,
            //         top: 76,
            //         width: 200,
            //         height: 40,
            //         lineHeight: 40,
            //         backgroundColor: '#ff0000',
            //         color: '#ffffff',
            //         textAlign: 'center',
            //         fontSize: 16,
            //         borderRadius: 4
            //     }
            // });
            // button.show();
        }
    }

    class BaiduMap {
        pullCount = 0;
        hasReturn = false;      //调用是否有返回
        calling = false;          //是否在调用
        GetMapInfo() {
            if (!cc.sys.isNative) {
                return;
            }
            if (!PlatformMgr.getInstance().sys.checkAllowJSInterface("GetMapInfo")) {
                console.log("接口不存在:GetMapInfo");
                return;
            }
            if (!kaayou.PlatformMgr.getInstance().map.calling) {
                kaayou.PlatformMgr.getInstance().map.hasReturn = false;
                kaayou.PlatformMgr.getInstance().map.calling = true;
                setTimeout(() => {
                    if (!kaayou.PlatformMgr.getInstance().map.hasReturn) {
                        kaayou.PlatformMgr.getInstance().map.calling = false;
                        console.log("map err:" + myUserId + ":" + "gps没有收到任何返回");
                        kaayou.PlatformMgr.getInstance().sys.PostBugly("map err:" + kaayou.getLobbyVersion(), "timeout", myUserId + ":" + "gps没有收到任何返回");
                    }
                }, 5000);
            }
            let myUserId = "";
            let userInfo = lobby.mod.User.getInstance().getUserInfo();
            if (!!userInfo) {
                myUserId = userInfo.uid.toString();
            }
            let callTime = new Date();
            let now = callTime.toLocaleString();
            if (cc.sys.os == cc.sys.OS_IOS) {
                kaayou.PlatformMgr.getInstance().map.traceMap(now + "开始调用ios gps sdk");
                jsb.reflection.callStaticMethod("NativeOcClass", "GetMapInfo");
            } else if (cc.sys.os == cc.sys.OS_ANDROID) {
                kaayou.PlatformMgr.getInstance().map.traceMap(now + "开始调用android gps sdk");
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "GetMapInfo", "()V");
            }
        }

        isValidAddr(longitude: number, latitude: number): boolean {
            if (longitude == NaN || latitude == NaN) { return false; }
            //lvxin200116
            if (longitude < -180 || longitude > 180 || latitude > 90 || latitude < -90) { return false };//过滤超上下限
            //if (longitude < 0.01 && longitude > -0.01 && latitude > -0.01 && latitude < 0.01) { return false };//过滤（0，0）
            //if (latitude > 39.9 && latitude < 39.95 && longitude > 116.35 && longitude < 116.45) { return false };//过滤北京东城区
            //lw200227：-2~2都认为是模拟器
            if (longitude >= -2 && longitude <= 2 && latitude >= -2 && latitude <= 2) { return false };
            return true;
        }

        jumpGPSSetting(msgcode) {
            if (cc.sys.os == cc.sys.OS_ANDROID) {
                if (!PlatformMgr.getInstance().sys.checkAllowJSInterface("JumpGPSServiceSetting")) {
                    console.log("接口不存在:JumpGPSServiceSetting");
                    return;
                }
                if (!PlatformMgr.getInstance().sys.checkAllowJSInterface("JumpGPSAuthSetting")) {
                    console.log("接口不存在:JumpGPSServiceSetting");
                    return;
                }
                if (msgcode == "-1") {
                    jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "JumpGPSServiceSetting", "()V");
                } else if (msgcode == "-2") {
                    jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "JumpGPSAuthSetting", "()V");
                }
            }
        }



        OnGaoDeMapInfo(data) {
            try {
                kaayou.PlatformMgr.getInstance().map.hasReturn = true;
                kaayou.PlatformMgr.getInstance().map.calling = false;
                console.log("map:收到高德回调：" + data);
                let mp = JSON.parse(data);
                if (mp) {
                    let time = new Date();
                    let now = time.toLocaleString();
                    kaayou.PlatformMgr.getInstance().map.traceMap(now + "高德：" + data);
                    let areaInfo = kaayou.DataSet.get("user::Map");
                    let myUserId = "";
                    let userInfo = lobby.mod.User.getInstance().getUserInfo();
                    if (!!userInfo) {
                        myUserId = userInfo.uid.toString();
                    }
                    if (lodash.isEmpty(areaInfo)) {
                        if (!kaayou.PlatformMgr.getInstance().map.isValidAddr(Number(mp.longitude), Number(mp.latitude))) {
                            kaayou.PlatformMgr.getInstance().map.GetMapInfo();
                            kaayou.PlatformMgr.getInstance().map.pullCount++;
                            kaayou.PlatformMgr.getInstance().sys.PostBugly("map err:" + kaayou.getLobbyVersion(), "isNotValidAddr", myUserId + ":" + data);
                        }
                        else {
                            kaayou.PlatformMgr.getInstance().map.pullCount = 0;
                            kaayou.DataSet.set("user::Map", data);
                            kaayou.emit("", "MapInfo", data);
                        }
                    }
                }
            } catch (err) {
                console.log("map err gaode:" + err);
            }
        }

        OnMapInfo(data) {
            try {
                kaayou.PlatformMgr.getInstance().map.hasReturn = true;
                kaayou.PlatformMgr.getInstance().map.calling = false;
                let mp = JSON.parse(data);
                if (mp) {
                    let time = new Date();
                    let now = time.toLocaleString();
                    let recont = 10;
                    let myUserId = "";
                    let userInfo = lobby.mod.User.getInstance().getUserInfo();
                    if (!!userInfo) {
                        myUserId = userInfo.uid.toString();
                    }
                    if (!!mp.errcode) {
                        console.log("map errmsg:" + mp.errmsg);
                        //kaayou.emit('common', 'ui::Toast::Show', { msg: mp.errmsg });
                        kaayou.DataSet.set("GPSError", mp.errcode);
                        kaayou.PlatformMgr.getInstance().sys.PostBugly("map err:" + kaayou.getLobbyVersion(), mp.errcode, myUserId + ":" + mp.errmsg);
                    } else {
                        console.log("map:收到百度回调：" + data);
                        kaayou.PlatformMgr.getInstance().map.traceMap(now + "百度：" + data);
                        if (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS) {
                            recont = 2;
                        }
                        if (kaayou.PlatformMgr.getInstance().map.pullCount < recont) {
                            if (mp.longitude && mp.latitude) {
                                if (mp.longitude == '4.9E-324' && mp.latitude == '4.9E-324') {
                                    //如果程序启动到现在还没取到经纬度，就向bugly汇报
                                    let areaInfo = kaayou.DataSet.get("user::Map");
                                    if (lodash.isEmpty(areaInfo)) {
                                        kaayou.PlatformMgr.getInstance().map.GetMapInfo();
                                        kaayou.PlatformMgr.getInstance().map.pullCount++;
                                        kaayou.PlatformMgr.getInstance().sys.PostBugly("map err:" + kaayou.getLobbyVersion(), "4.9E-324", myUserId + ":" + data);
                                    }
                                } else if (!kaayou.PlatformMgr.getInstance().map.isValidAddr(Number(mp.longitude), Number(mp.latitude))) {
                                    kaayou.PlatformMgr.getInstance().map.GetMapInfo();
                                    kaayou.PlatformMgr.getInstance().map.pullCount++;
                                    kaayou.PlatformMgr.getInstance().sys.PostBugly("map err:" + kaayou.getLobbyVersion(), "isNotValidAddr", myUserId + ":" + data);
                                } else {
                                    kaayou.PlatformMgr.getInstance().map.pullCount = 0;
                                    kaayou.DataSet.set("user::Map", data);
                                    kaayou.DataSet.set("GPSError", "");
                                    kaayou.emit("", "MapInfo", data);
                                }
                            } else {
                                kaayou.PlatformMgr.getInstance().map.GetMapInfo();
                                kaayou.PlatformMgr.getInstance().map.pullCount++;
                                kaayou.PlatformMgr.getInstance().sys.PostBugly("map err:" + kaayou.getLobbyVersion(), "hasnotlongitude", myUserId + ":" + data);
                            }
                        }
                    }
                }
            } catch (err) {
                console.log("map err:baidu" + err);
            }
        }

        traceMap(data) {
            setTimeout(() => {
                console.log("map bugly:" + data);
                //lw200217在bugly中跟踪反馈异常玩家的记录
                let configs = common.mod.Config.GetAppConfig();
                let sUserId = configs.buglyTrace;
                if (!!sUserId) {
                    let arr = sUserId.split(',');
                    let userInfo = lobby.mod.User.getInstance().getUserInfo();
                    if (!!userInfo) {
                        let myUserId = userInfo.uid.toString();
                        if (arr.indexOf(myUserId) >= 0) {
                            kaayou.PlatformMgr.getInstance().sys.PostBugly("map trace:" + kaayou.getLobbyVersion(), myUserId, data);
                        }
                    }
                }
            }, 500);
        }
    }

    class System {

        //重新拉起声音
        OnSoundResume() {
            kaayou.SoundManager.getInstance().resumeMusic();
        }

        //增加监听电池信息和状态的通知
        addBatteryNotification() {
            console.log("增加监听电池信息和状态的通知");
            if (!cc.sys.isNative) {
                return;
            }
            if (cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("NativeOcClass", "GetBatteryInfoNotification");
            } else if (cc.sys.os == cc.sys.OS_ANDROID) {
                this.GetBatteryInfo();
            }
        }
        removeBatteryNotification() {
            if (!cc.sys.isNative) {
                return;
            }
            if (cc.sys.os == cc.sys.OS_IOS) {
                // jsb.reflection.callStaticMethod("NativeOcClass", "removeBatteryInfoNotification");
            } else if (cc.sys.os == cc.sys.OS_ANDROID) {

            }
        }

        batteryInfo: { level: string, state: string } = null
        //客户端会在这个消息返回电池状态
        OnSysBatteryInfoRsp(info: string) {
            try {
                console.log("电池信息" + info);
                kaayou.PlatformMgr.getInstance().sys.batteryInfo = JSON.parse(info);
                //解析出来的model  {{"state" : state, @"level" :""}  state  状态  level  电量
                // kaayou.emit("", "ui::Battery::showBattery", { msg: kaayou.PlatformMgr.getInstance().sys.batteryInfo  });
            } catch (err) {

            }
        }

        GetBatteryInfo(): { state: string, level: number } {
            //Unplugged 未充电
            //none 无法获取信息
            //Charging 充电中
            try {
                if (!cc.sys.isNative) {
                    return { state: "Unplugged", level: 100 };
                }
                let jStr = "";
                if (cc.sys.os == cc.sys.OS_IOS) {
                    jStr = jsb.reflection.callStaticMethod("NativeOcClass", "GetBatteryInfo");
                } else if (cc.sys.os == cc.sys.OS_ANDROID) {
                    jStr = jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "GetBatteryInfo", "()Ljava/lang/String;");
                }

                console.log("收到安卓传来的电量:", jStr);
                kaayou.PlatformMgr.getInstance().sys.batteryInfo = JSON.parse(jStr);
                // kaayou.emit("", "ui::Battery::showBattery", { msg: kaayou.PlatformMgr.getInstance().sys.batteryInfo  });
                // if (data.type) {
                //     // return data;

                // }
            } catch (err) {

            }
            return { state: "Unplugged", level: 100 };
        }


        //lw181113
        ShowTransitionMask() {
            if (!!cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "ShowTransitionMask", "()V");
            }
        }
        HideTransitionMask() {
            if (!!cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "HideTransitionMask", "()V");
            }
        }
        DownloadApk(url: string) {
            if (!!cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
                let codeStr = jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "DownloadApk", "(Ljava/lang/String;)V", url);
            }
        }
        InstallApk(path: string) {
            if (!!cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
                let codeStr = jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "InstallApk", "(Ljava/lang/String;)V", path);
            }
        }
        OnDownloadApk(code: string, extend: string) {
            console.log("Js OnDownloadApk", code, extend);
            kaayou.emit("common", "ui::apk::onDownload", { code: code, extend: extend });
        }

        GetLocalVersionCode(): string {
            let code = "1000";
            if (!cc.sys.isNative) {
                return code;
            }
            if (cc.sys.os == cc.sys.OS_IOS) {
                let codeStr = jsb.reflection.callStaticMethod("NativeOcClass", "GetLocalVersionCode");
                code = codeStr;// Number(codeStr);
            } else if (cc.sys.os == cc.sys.OS_ANDROID) {
                let codeStr = jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "GetLocalVersionCode", "()Ljava/lang/String;");
                code = codeStr;// Number(codeStr);
            }
            return code;
        }

        GetLocalVersionName(): string {
            let name = "1.9.7";//安卓包版本号
            if (cc.sys.isWeChat) {
                return name;
            }
            if (!cc.sys.isNative) {
                name = Http.GetRequest(location.search)['version'] || name;
                return name;
            }

            if (cc.sys.os == cc.sys.OS_IOS) {
                let codeStr = jsb.reflection.callStaticMethod("NativeOcClass", "GetLocalVersionName");
                name = codeStr;// Number(codeStr);
            } else if (cc.sys.os == cc.sys.OS_ANDROID) {
                let codeStr = jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "GetLocalVersionName", "()Ljava/lang/String;");
                console.log("Local APK Version:", codeStr);
                name = codeStr;// Number(codeStr);
            } else if (cc.sys.os == cc.sys.OS_WINDOWS) {
                if (jsb.fileUtils.isFileExist("appConfig.json")) {
                    try {
                        do {
                            let appconfig = PlatformMgr.getInstance().sys.GetLocalAppConfig();
                            if (!appconfig) { break; }
                            if (lodash.isEmpty(appconfig.version)) { break; }
                            name = appconfig.version;
                        } while (0);

                    } catch (err) {
                        console.log("appConfig.json nil");
                    }
                }
                console.log("appConfig.json can`t find");
            }
            return name;
        }


        GetLocalAppConfig(): any {

            if (!cc.sys.isNative) {
                return null;
            }
            if (cc.sys.os == cc.sys.OS_IOS) {
                return null;
            } else if (cc.sys.os == cc.sys.OS_ANDROID) {
                return null;
            } else if (cc.sys.os == cc.sys.OS_WINDOWS) {
                if (jsb.fileUtils.isFileExist("appConfig.json")) {
                    try {
                        do {
                            let appconfigStr = jsb.fileUtils.getStringFromFile("appConfig.json");
                            if (lodash.isEmpty(appconfigStr)) { break; }
                            let appconfig = JSON.parse(appconfigStr);
                            if (lodash.isNull(appconfig) || lodash.isEmpty(appconfig)) { break; }
                            return appconfig;
                        } while (0);

                    } catch (err) {
                        console.log("appConfig.json nil");
                    }
                }
                console.log("appConfig.json can`t find");
                return null;
            }
            return null;
        }

        // GetAvailableInternalMemorySize(): number {
        //     let size = 0;
        //     if (!cc.sys.isNative) {
        //         return size;
        //     }
        //     if (cc.sys.os == cc.sys.OS_IOS) {
        //         // let codeStr = jsb.reflection.callStaticMethod("NativeOcClass", "GetLocalVersionCode");
        //         // code = Number(codeStr);
        //     } else if (cc.sys.os == cc.sys.OS_ANDROID) {
        //         let sizeStr = jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "GetAvailableInternalMemorySize", "()Ljava/lang/String;");
        //         size = Number(sizeStr);
        //     }
        //     return size;
        // }

        OpenUrl(url: string) {
            console.log("打开链接", url);
            if (!cc.sys.isNative) {
                window.open(url);
                return;
            }
            if (cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("NativeOcClass", "OpenUrl:", url);
            } else if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "OpenUrl", "(Ljava/lang/String;)V", url);
            }
        }

        OpenCallPhone(telNum: string) {
            if (!cc.sys.isNative) {
                console.log("正在拨打电话", telNum);
                return;
            }
            if (cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("NativeOcClass", "OpenCallPhone:", telNum);
            } else if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "OpenCallPhone", "(Ljava/lang/String;)V", telNum);
            }
        }

        Log(tag: string, msg: string) {
            if (!cc.sys.isNative) {
                console.log(tag, msg);
                return;
            }
            if (cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("NativeOcClass", "KaLog:msg:", tag, msg);
            } else if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "KaLog", "(Ljava/lang/String;Ljava/lang/String;)V", tag, msg);
            }
        }
        Dialog(text: string) {
            if (!cc.sys.isNative) {
                window.confirm(text);
                return;
            }
            if (cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("NativeOcClass", "Dialog:", text);
            } else if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "Dialog", "(Ljava/lang/String;)V", text);
            }
        }
        OnDialogRes(res: string) {


        }


        Toast(text: string) {
            if (!cc.sys.isNative) {
                let div = window.document.getElementById("WebToast");
                if (!div) {
                    div = window.document.createElement("div");
                    div.id = "WebToast";
                    div.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
                    div.style.color = "#fff";
                    div.style.top = "50%";
                    div.style.left = "50%";
                    div.style.position = "absolute";
                    div.style.transform = "translateY(-50%) translateX(-50%)";
                    div.style.display = "none";
                    div.style.padding = "10px";
                    window.document.body.appendChild(div);
                }
                if (div["ti"]) {
                    clearTimeout(div["ti"]);
                }
                div.style.display = "block";
                div.innerText = text;
                div["ti"] = setTimeout(() => {
                    if (div["ti"]) {
                        div["ti"] = null;
                    }
                    div.style.display = "none";
                }, 1000);
                return;
            }

            if (cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("NativeOcClass", "Toast:", text);
            } else if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "Toast", "(Ljava/lang/String;)V", text);
            }
        }

        Exit(type: string) {
            //lw181119,type:"1"立即退，"2"双击退
            if (!cc.sys.isNative) {
                return;
            }
            if (cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("NativeOcClass", "Exit");
            } else if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "Exit", "(Ljava/lang/String;)V", type);
            }
        }

        async GetFileLength(url: string) {
            try {
                if (!cc.sys.isNative) {
                    let length = await Http.GetFileSize(url);
                    return length;
                }
                if (!PlatformMgr.getInstance().sys.checkAllowJSInterface("GetFileLength")) {
                    console.log("接口不存在:GetFileLength");
                    return "跳过";
                }
                let jStr = "";
                if (cc.sys.os == cc.sys.OS_IOS) {
                    //jStr = jsb.reflection.callStaticMethod("NativeOcClass", "GetNetInfo");
                    return "跳过";
                } else if (cc.sys.os == cc.sys.OS_ANDROID) {
                    jStr = jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass",
                        "GetFileLength", "(Ljava/lang/String;)Ljava/lang/String;", url);
                }
                return jStr;
            } catch (err) {
                return "-1";
            }
        }

        GetNetInfo(): { type: string, level: number } {
            try {
                if (!cc.sys.isNative) {
                    return window.navigator.onLine == true ? { type: "wifi", level: 100 } : { type: "none", level: 0 }
                }
                let jStr = "";
                if (cc.sys.os == cc.sys.OS_IOS) {
                    jStr = jsb.reflection.callStaticMethod("NativeOcClass", "GetNetInfo");
                } else if (cc.sys.os == cc.sys.OS_ANDROID) {
                    jStr = jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "GetNetInfo", "()Ljava/lang/String;");
                }
                let data = JSON.parse(jStr);
                if (data.type) {
                    return data;
                }
            } catch (err) {
                console.log("获取网络失败");
            }
            return { type: "wifi", level: 100 };
        }

        GetDeviceKey(): string {
            if (!cc.sys.isNative) {
                let code = Http.GetRequest(location.search)['code'] || Date.now().toString();
                return code;
            } else {
                let code = cc.sys.localStorage.getItem("debugCode");
                if (!!code) {
                    return code;
                } else {
                    if (cc.sys.os == cc.sys.OS_IOS) {
                        let _key = jsb.reflection.callStaticMethod("NativeOcClass", "GetDeviceKey");
                        // PlatformMgr.getInstance().sys.Toast(_key);
                        cc.log("GetDeviceKey", _key);
                        if (_key.length < 1) { return ""; }
                        _key = MD5.encode(_key);
                        return _key;
                    } else if (cc.sys.os == cc.sys.OS_ANDROID) {
                        console.log("GetDeviceKey OS_ANDROID");
                        let _key = jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "GetDeviceKey", "()Ljava/lang/String;");
                        return _key;
                    } else {
                        try {
                            do {
                                let appconfig = PlatformMgr.getInstance().sys.GetLocalAppConfig();
                                if (!appconfig) { break; }
                                if (lodash.isEmpty(appconfig.deviceKey)) { break; }
                                return appconfig.deviceKey;
                            } while (0);
                        } catch (err) {
                            console.log("appConfig.json nil");
                        }
                        return Date.now().toString()
                    }
                }
            }
        }

        getPhoneBrand() {
            try {
                if (!cc.sys.isNative) {
                    return "网页";
                } else if (cc.sys.os == cc.sys.OS_WINDOWS) {
                    return "Windows";
                } else if (cc.sys.os == cc.sys.OS_IOS) {
                    return "iPhone"
                } else if (cc.sys.os == cc.sys.OS_ANDROID) {
                    if (!PlatformMgr.getInstance().sys.checkAllowJSInterface("GetPhoneBrand")) {
                        console.log("接口不存在:GetPhoneBrand");
                        return "";
                    }
                    return jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "GetPhoneBrand", "()Ljava/lang/String;");
                }
            } catch (err) {
                return "";
            }
        }

        //调度手机震动
        Vibrate(time = 1) {
            if (!cc.sys.isNative) {
                return;
            }
            if (cc.sys.os == cc.sys.OS_IOS) {
                return jsb.reflection.callStaticMethod("NativeOcClass", "Vibrate:", time);
            } else if (cc.sys.os == cc.sys.OS_ANDROID) {
                return jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "Vibrate", "(I)V", time);
            }
        }
        //系统方法，复制文字到剪切板  0是失败  1是成功；
        copyStringToPasteBoard(text: string) {
            let isSuccessed = "0";
            if (!cc.sys.isNative) {
                return isSuccessed;
            }
            if (cc.sys.os == cc.sys.OS_IOS) {
                isSuccessed = jsb.reflection.callStaticMethod("NativeOcClass", "copyStringToPasteboard:", text);

            } else if (cc.sys.os == cc.sys.OS_ANDROID) {
                isSuccessed = jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "copyStringToPasteboard", "(Ljava/lang/String;)I", text);
            }
            return isSuccessed;
        }

        //系统方法，判断是否开启了语音权限 
        GetMediaStatus() {
            let flag = false;
            if (!cc.sys.isNative) {
                return flag;
            }

            if (!PlatformMgr.getInstance().sys.checkAllowJSInterface("checkMic")) {
                console.log("接口不存在:checkMic");
                return;
            }

            if (cc.sys.os == cc.sys.OS_IOS) {
                // 0是未授权  1是没有询问开启麦克风 2是已授权；
                let flag1 = jsb.reflection.callStaticMethod("NativeOcClass", "checkMic");
                flag = flag1 == 2 ? true : false
            } else if (cc.sys.os == cc.sys.OS_ANDROID) {
                // flag = jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "", "(Ljava/lang/String;)I",);
                flag = false;
            }
            return flag;
        }

        jumpAppSetting() {
            if (!cc.sys.isNative) {
                return;
            }
            if (cc.sys.os == cc.sys.OS_ANDROID) {
                if (!PlatformMgr.getInstance().sys.checkAllowJSInterface("JumpGPSAuthSetting")) {
                    console.log("接口不存在:JumpGPSServiceSetting");
                    return;
                }
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "JumpGPSAuthSetting", "()V");
            } else if (cc.sys.os == cc.sys.OS_IOS) {
                if (!PlatformMgr.getInstance().sys.checkAllowJSInterface("JumpGpsSetting")) {
                    console.log("接口不存在:JumpGpsSetting");
                    return;
                }
                jsb.reflection.callStaticMethod("NativeOcClass", "JumpGpsSetting");
            }
        }

        //复制之后跳入微信
        jumpWeChatImmediacy() {
            if (!cc.sys.isNative) {
                return;
            }
            if (cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("NativeOcClass", "jumpWeChatImmediacy");

            } else if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "getWechatApi", "()V");
            }
        }

        //检查是否存在该接口
        checkAllowJSInterface(method: string) {
            if (!lodash.isString(method)) {
                return false;
            }
            if (method == "") {
                return false;
            }
            let allowJSInterfaceStr = kaayou.DataSet.get("allowJSInterface");
            if (!allowJSInterfaceStr) {
                return false;
            }
            if (allowJSInterfaceStr == '') {
                return false;
            }
            try {
                let allowJSInterface: Array<string> = JSON.parse(allowJSInterfaceStr);
                if (!allowJSInterface) {
                    return false;
                }
                if (!lodash.isArray(allowJSInterface)) {
                    return false;
                }
                lodash.isArray(allowJSInterface)

                if (allowJSInterface.indexOf(method) > -1) {
                    return true;
                }
                return false;
            } catch (e) {
                return false;
            }
        }

        //上报异常
        PostBugly(val0: string, val1: string = "", val2: string = "") {
            // CRASHTYPE_COCOS2DX_JS 5
            let CRASHTYPE_COCOS2DX_JS = 5;
            if (!cc.sys.isNative) {
                return;
            }
            if (!PlatformMgr.getInstance().sys.checkAllowJSInterface("PostBugly")) {
                console.log("接口不存在:PostBugly");
                return;
            }
            if (cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("NativeOcClass", "PostBugly:Var1:Var2:Var3:", "5", val0, val1, val2);
            } else if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "PostBugly", "(ILjava/lang/String;Ljava/lang/String;Ljava/lang/String;)V"
                    , CRASHTYPE_COCOS2DX_JS,
                    val0,
                    val1,
                    val2
                );
            }
        }

    }

    class Pay {
        AliPay(orderString: string) {
            if (!cc.sys.isNative) {
                // console.log(tag, msg);
                return;
            }
            if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "Alipay", "(Ljava/lang/String;)V", orderString);
            }
        }

        ApplePay(productID: string, orderID: string, token: string) {
            if (!cc.sys.isNative) {
                // console.log(tag, msg);
                return;
            }
            if (cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative) {
                jsb.reflection.callStaticMethod("NativeOcClass", "IOSPay:OrderID:Token:", productID, orderID, token);
            }
        }

        WeCahtPay(payData) {
            if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "WechatPay", "(Ljava/lang/String;)V", payData);
            }
        }

        payBaseInfo(url: string, token: string, appid: string) {
            if (!cc.sys.isNative) {
                // console.log(tag, msg);
                return;
            }
            if (cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("NativeOcClass", "iosPayInfowithUrl:Token:andAppid:", url, token, appid);
            } else if (cc.sys.os == cc.sys.OS_ANDROID) {
                return;
            }
        }

        OnPayRes(code: string, msg: string) {
            //success  fail  cancel  invalid ;
            kaayou.emit('', "PayRes", { code: code, msg: msg });
        }

    }

    // 钉钉
    class DDShare {
        DDShareURL(title: string, text: string, url: string, transaction: string = "") {
            if (!cc.sys.isNative) {
                return;
            }
            let data = {
                title: title,
                text: text,
                url: url,
                transaction: transaction
            }
            if (cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("NativeOcClass", "DDShareURL:", JSON.stringify(data));
            } else if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "DDShareURL", "(Ljava/lang/String;)V", JSON.stringify(data));
            }
        }

        DDShareImage(title: string, path: string, transaction: string = "") {
            if (!cc.sys.isNative) {
                return;
            }
            let data = {
                title: title,
                path: path,
                transaction: transaction
            }
            if (cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("NativeOcClass", "DDShareImage:", JSON.stringify(data));
            } else if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "DDShareImage", "(Ljava/lang/String;)V", JSON.stringify(data));
            }
        }

        DDShareText(title: string, text: string, transaction: string = "") {
            if (!cc.sys.isNative) {
                return;
            }
            let data = {
                title: title,
                text: text,
                transaction: transaction
            }
            if (cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("NativeOcClass", "DDShareText:", JSON.stringify(data));
            } else if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "DDShareText", "(Ljava/lang/String;)V", JSON.stringify(data));
            }
        }

        // 钉钉分享回调返回code  0/成功  -2/取消 其他错误看msg
        OnDdShareRes(code: string, msg: string) {
            kaayou.emit("", "DdShareRes", { code: code, msg: msg });
        }
    }

    // magicWindow魔窗分享返回各种信息返回类容为json字符串
    class MagicWindow {
        //客户端主动去拉取,获取魔窗信息。
        getMagicWindowInfo() {
            if (!cc.sys.isNative) {
                return "0";
            } else {
                let infoStr = "0";
                if (cc.sys.os == cc.sys.OS_IOS) {
                    infoStr = jsb.reflection.callStaticMethod("NativeOcClass", "getMagicWindowInfo");
                } else if (cc.sys.os == cc.sys.OS_ANDROID) {
                    infoStr = jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "getMagicWindowInfo", "()Ljava/lang/String;");
                }
                return infoStr;
            }
            return "0";
        }
        //是否需要客户端主动拉取魔窗
        OnMagicWindowCallPull() {
            try {
                kaayou.emit("", "MagicWindowCallPull");
            } catch (error) {

            }
        }
        //js端获取到魔窗信息，告诉原生清除信息
        tellClientToClear() {
            if (!cc.sys.isNative) {
                return;
            }
            if (cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("NativeOcClass", "clearMagicWindowInfo");
            } else if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "clearMagicWindowInfo", "()V");
            }
        }
        //暂时弃用
        OnMagicWindowRsp(msg1: string) {
            try {
                let obj = JSON.parse(msg1);
                console.log("--安卓怎么代码没有这段--");
                kaayou.emit("", "MagicWindowRsp", { msg: obj });
            } catch (err) {

            }
        }
    }

    //lw200623闲聊和小信不能删，因为游戏里面有调用
    class XL {
        XLShareText(title: string, text: string, transaction: string = "") {

        }

        XLShareImage(title: string, path: string, transaction: string = "") {

        }


        XLShareURL(title: string, text: string, url: string, transaction: string = "") {

        }
    }


    class XX {
        XXShareURL(title: string, text: string, url: string, transaction: string = "") {

        }

        XXShareImage(title: string, path: string, transaction: string = "") {

        }
    }

    class WechatConfig {
        GetConfig(): any {
            if (!cc.sys.isWeChat) { return {}; }
            return WXJSConfig;
        }
    }

    class AD {
        Create(id: string) {
            if (!cc.sys.isWeChat) { return; }
            WXJSBridge.AD.create({ adUnitId: id }, false);
        }
        Play() {
            if (!cc.sys.isWeChat) { return; }
            WXJSBridge.AD.play();
            kaayou.SoundManager.getInstance().pauseMusic();
        }

        OnLoad() {
            if (!cc.sys.isWeChat) { return; }
            console.log('激励视频 广告加载成功');
            kaayou.emit('lobby', 'ui::LeftMenuPanle::videoLoad');
        }

        OnError(err) {
            if (!cc.sys.isWeChat) { return; }
            console.log(err);
            if (err.errCode && err.errMsg) {
                kaayou.emit('common', 'ui::Toast::Show', { msg: err.errMsg });
            }
        }

        OnClose(res) {
            if (!cc.sys.isWeChat) { return; }
            kaayou.SoundManager.getInstance().resumeMusic();
            if (res && res.isEnded || res === undefined) {
                // 正常播放结束，可以下发游戏奖励
                kaayou.emit('lobby', 'mod::User::videoReward');
                console.log('正常播放结束，可以下发游戏奖励')
            } else {
                // 播放中途退出，不下发游戏奖励
                //kaayou.emit('common', 'ui::Toast::Show', { msg: "播放中途退出，不下发游戏奖励" });
                console.log('播放中途退出，不下发游戏奖励')
            }
        }
    }

    class Feedback {
        Create(param) {
            if (!cc.sys.isWeChat) { return; }
            WXJSBridge.feedback.create(param);
        }
        Show() {
            if (!cc.sys.isWeChat) { return; }
            WXJSBridge.feedback.show();
        }
        Hide() {
            if (!cc.sys.isWeChat) { return; }
            WXJSBridge.feedback.hide();
        }
        Destroy() {
            if (!cc.sys.isWeChat) { return; }
            WXJSBridge.feedback.destroy();
        }
    }


    export class PlatformMgr {
        static __Ins__: PlatformMgr = null;
        static getInstance() {
            if (PlatformMgr.__Ins__ == null) {
                PlatformMgr.__Ins__ = new PlatformMgr();
            }
            return PlatformMgr.__Ins__;
        }
        gvoice: GVoice = null;
        map: BaiduMap = null;
        wx: Wechat = null;
        im: YunVa = null;
        sys: System = null;
        pay: Pay = null;
        dd: DDShare = null;
        mw: MagicWindow = null;
        xl: XL = null;
        xx: XX = null;
        webGame: webGame = null;

        wxCfg: WechatConfig = null;
        ad: AD = null;
        fb: Feedback = null;

        constructor() {
            this.gvoice = new GVoice();
            this.map = new BaiduMap();
            this.wx = new Wechat();
            this.im = new YunVa();
            this.sys = new System();
            this.pay = new Pay();
            this.dd = new DDShare();
            this.mw = new MagicWindow();
            this.xl = new XL();
            this.xx = new XX();
            this.webGame = new webGame();

            this.wxCfg = new WechatConfig();
            this.ad = new AD();
            this.fb = new Feedback();

            this.BindWindowMethod();
        }
        BindWindowMethod() {
            let KaNativeBridge: any = {};
            //系统
            KaNativeBridge.OnDialogRes = this.sys.OnDialogRes;
            KaNativeBridge.OnDownloadApk = this.sys.OnDownloadApk;
            //微信
            KaNativeBridge.OnWxLogin = this.wx.OnLogin;
            KaNativeBridge.OnWxLoginCancel = this.wx.OnWxLoginCancel;
            KaNativeBridge.OnShareWxResult = this.wx.OnShareWxResult;
            KaNativeBridge.OnWxInstalled = this.wx.OnWxInstalled;
            //地图
            KaNativeBridge.OnMapInfo = this.map.OnMapInfo;
            KaNativeBridge.OnGaoDeMapInfo = this.map.OnGaoDeMapInfo;
            //GVoice
            //KaNativeBridge.On
            //语音
            KaNativeBridge.OnMicLoginOK = this.im.OnMicLoginOK;
            KaNativeBridge.OnMicStart = this.im.OnMicStart;
            KaNativeBridge.OnMicVolume = this.im.OnMicVolume;
            KaNativeBridge.OnMicOk = this.im.OnMicOk;
            KaNativeBridge.OnMicStop = this.im.OnMicStop;
            KaNativeBridge.OnMicPlayStart = this.im.OnMicPlayStart;
            KaNativeBridge.OnMicPlayEnd = this.im.OnMicPlayEnd;

            KaNativeBridge.OnGvoiceInitOK = this.gvoice.OnGvoiceInitOK;
            KaNativeBridge.OnGvoiceJoinRoomOK = this.gvoice.OnGvoiceJoinRoomOK;
            KaNativeBridge.OnGvoiceOpenMicOK = this.gvoice.OnGvoiceOpenMicOK;
            KaNativeBridge.OnGvoiceCloseMicOK = this.gvoice.OnGvoiceCloseMicOK;
            KaNativeBridge.OnGvoiceOpenSpeakerOK = this.gvoice.OnGvoiceOpenSpeakerOK;
            KaNativeBridge.OnGvoiceCloseSpeakerOK = this.gvoice.OnGvoiceCloseSpeakerOK;
            KaNativeBridge.OnMemberVoice = this.gvoice.OnMemberVoice;
            //支付
            KaNativeBridge.OnPayRes = this.pay.OnPayRes;
            // 钉钉
            KaNativeBridge.OnDdShareRes = this.dd.OnDdShareRes;
            // 魔窗
            KaNativeBridge.OnMagicWindowRsp = this.mw.OnMagicWindowRsp;
            KaNativeBridge.OnMagicWindowCallPull = this.mw.OnMagicWindowCallPull;
            KaNativeBridge.OnSysBatteryInfoRsp = this.sys.OnSysBatteryInfoRsp;
            //H5
            KaNativeBridge.OnLegendToPay = this.webGame.onLegendToPay;
            KaNativeBridge.OnSoundResume = this.sys.OnSoundResume;
            window['KaNativeBridge'] = KaNativeBridge;
        }

        BindWechatHook() {
            let self = this;

            let tempWxOnShow = function () {
                kaayou.SoundManager.getInstance().resumeMusic();
                kaayou.emit("", "OnShareWxResult", { code: 'YES', transaction: "" });
            }
            WXJSBridge.hook.appShow(tempWxOnShow);
            let tempWxOnHide = function () {
                kaayou.SoundManager.getInstance().pauseMusic();
            }
            WXJSBridge.hook.appHide(tempWxOnHide);
            let tempWxOnLogin = function (data) {
                WXJSBridge.sessionStorage.setItem("wx_signature", data.signature);
                self.wx.OnLogin(data.code, data.iv, data.encryptedData, data.rawData);
            }
            WXJSBridge.hook.loginSuccess(tempWxOnLogin);
            WXJSBridge.hook.loginFail(tempWxOnLogin);
            WXJSBridge.hook.loginCancel(self.wx.OnWxLoginCancel);

            WXJSBridge.hook.adLoad(self.ad.OnLoad);
            WXJSBridge.hook.adError(self.ad.OnError);
            WXJSBridge.hook.adClose(self.ad.OnClose);

            WXJSBridge.hook.payFail(function (e) {
                WXJSBridge.UI.toast(e.errMsg, "none");
            })


        }
    }
}