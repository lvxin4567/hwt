var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
String.prototype.Format = function (args) {
    var result = this;
    if (arguments.length > 0) {
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                if (args[key] != undefined) {
                    var reg = new RegExp("({" + key + "})", "g");
                    result = result.replace(reg, args[key]);
                }
            }
        }
        else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] != undefined) {
                    var reg = new RegExp("({)" + i + "(})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
    }
    return result.toString();
};
String.prototype.format = String.prototype.Format;
String.Format = function () {
    if (arguments.length == 0)
        return "";
    var result = arguments[0];
    if (typeof result !== "string") {
        return "";
    }
    if (arguments.length == 2 && typeof (arguments[1]) == "object") {
        var args = arguments[1];
        for (var key in args) {
            if (args[key] != undefined) {
                var reg = new RegExp("({" + key + "})", "g");
                result = result.replace(reg, args[key]);
            }
        }
    }
    else {
        for (var i = 1; i < arguments.length; i++) {
            if (arguments[i] != undefined) {
                var reg = new RegExp("({)" + (i - 1) + "(})", "g");
                result = result.replace(reg, arguments[i]);
            }
        }
    }
    return result;
};
String.format = String.Format;
Date.Unix = function () {
    return Math.floor((new Date()).getTime() / 1000);
};
Date.unix = Date.Unix;
Date.Format = function () {
    if (arguments.length == 1) {
        var fmt = arguments[0];
        return (new Date).Format(fmt);
    }
    else if (arguments.length == 2) {
        var t = arguments[0];
        var fmt = arguments[1];
        return (new Date(t)).Format(fmt);
    }
    else {
        return (new Date).getTime().toString();
    }
    return (new Date).Format(fmt);
};
Date.format = Date.Format;
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
Date.prototype.format = Date.prototype.Format;
var kaayou;
(function (kaayou) {
    var _global = typeof window === 'undefined' ? global : window;
    _global.lodash = require("lodash");
    var _decorator;
    (function (_decorator) {
        var _decoratorID = (0 | (Math.random() * 998));
        function getNewDecoratorID() {
            return _decoratorID++;
        }
        function getTargetDecoratorID(target) {
            var did = 0;
            if (target.constructor.hasOwnProperty('__decoratorid')) {
                did = target.constructor.__decoratorid;
            }
            if (!did) {
                did = getNewDecoratorID();
                target.constructor.__decoratorid = did;
            }
            return did;
        }
        function getSuper(ctor) {
            var proto = ctor.prototype;
            var dunderProto = proto && Object.getPrototypeOf(proto);
            return dunderProto && dunderProto.constructor;
        }
        function checkCtorArgument(decorate) {
            return function (target) {
                if (typeof target === 'function') {
                    return decorate(target);
                }
                return function (ctor) {
                    return decorate(ctor, target);
                };
            };
        }
        _decorator.ccclass = checkCtorArgument(function (ctor, name) {
            var base = getSuper(ctor);
            if (base === Object) {
                base = null;
            }
            ;
            var reobnames = Object.getOwnPropertyNames(ctor.prototype);
            var reob = {};
            for (var x in reobnames) {
                reob[reobnames[x]] = ctor.prototype[reobnames[x]];
            }
            var res = base.extend(reob);
            res._classname = ctor.name;
            return res;
        });
        var g_eventTagertArray = {};
        function addAutoBindBindEventData(target, conname, eventkey, propertyKey) {
            var did = getTargetDecoratorID(target);
            g_eventTagertArray[did] = g_eventTagertArray[did] || {};
            g_eventTagertArray[did][conname] = g_eventTagertArray[did][conname] || {};
            g_eventTagertArray[did][conname][eventkey] = propertyKey;
        }
        function BindEvent(coname, keyStr) {
            return function (target, propertyKey, descriptor) {
                var classname = target.constructor.name;
                addAutoBindBindEventData(target, coname, keyStr, propertyKey);
            };
        }
        _decorator.BindEvent = BindEvent;
        function CustomBindEvetn(coname, keyStr, func, target) {
            if (!target["_@eventTagertArray"]) {
                target["_@eventTagertArray"] = {};
            }
            target["_@eventTagertArray"][keyStr] = {
                coname: coname,
                call: func
            };
        }
        _decorator.CustomBindEvetn = CustomBindEvetn;
        function __AutoOffEvent(target, eventArray) {
            var classname = target.constructor.name;
            var did = getTargetDecoratorID(target);
            if (lodash.isEmpty(eventArray[did])) {
                return;
            }
            lodash.forEach(eventArray[did], function (karr, coname) {
                lodash.forEach(karr, function (propertyKey, eventkey) {
                    if (target[propertyKey]) {
                        var funcall = target[propertyKey];
                        kaayou.getController(coname).offBytarger(eventkey, target);
                    }
                });
            });
        }
        function doOffEvents(target, propertyKey, descriptor) {
            var oldFunc = descriptor.value;
            descriptor.value = function () {
                var agrs = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    agrs[_i] = arguments[_i];
                }
                if (this["_@isBindInit"]) {
                    __AutoOffEvent(this, g_eventTagertArray);
                    delete this["_@isBindInit"];
                }
                return oldFunc.apply(this, agrs);
            };
            return descriptor;
        }
        _decorator.doOffEvents = doOffEvents;
        function __AutoBindEvent(target, eventArray) {
            var classname = target.constructor.name;
            var did = getTargetDecoratorID(target);
            if (lodash.isEmpty(eventArray[did])) {
                return;
            }
            lodash.forEach(eventArray[did], function (karr, coname) {
                lodash.forEach(karr, function (propertyKey, eventkey) {
                    if (target[propertyKey]) {
                        var funcall_1 = target[propertyKey];
                        kaayou.getController(coname).on(eventkey, function (e) {
                            var __ack = null;
                            if (e.data) {
                                if (e.data['@ack']) {
                                    __ack = e.data['@ack'];
                                    delete e.data['@ack'];
                                    e.data = e.data['@original'];
                                }
                            }
                            if (__ack) {
                                var resulet = funcall_1.apply(target, [e.data]);
                                __ack(resulet);
                            }
                            else {
                                funcall_1.apply(target, [e.data]);
                            }
                        }, target);
                    }
                });
            });
        }
        function doBindEvent(target, propertyKey, descriptor) {
            var oldFunc = descriptor.value;
            descriptor.value = function () {
                var agrs = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    agrs[_i] = arguments[_i];
                }
                if (lodash.isUndefined(this["_@isBindInit"])) {
                    __AutoBindEvent(this, g_eventTagertArray);
                    this["_@isBindInit"] = true;
                }
                return oldFunc.apply(this, agrs);
            };
            return descriptor;
        }
        _decorator.doBindEvent = doBindEvent;
    })(_decorator = kaayou._decorator || (kaayou._decorator = {}));
})(kaayou || (kaayou = {}));
var kaayou;
(function (kaayou) {
    var iconv = require('iconv-lite');
    var CryptoJS = require("crypto-js");
    var AES = (function () {
        function AES() {
        }
        AES.encrypt = function (plainText) {
            var key = CryptoJS.enc.Utf8.parse(this.keyStr);
            var iv = CryptoJS.enc.Utf8.parse(this.ivStr);
            var encrypted = CryptoJS.AES.encrypt(plainText, key, { iv: iv, mode: CryptoJS.mode.CTR, padding: CryptoJS.pad.NoPadding });
            var base64str = CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
            base64str = base64str.replace(/\+/g, "-");
            base64str = base64str.replace(/\//g, "_");
            return base64str;
        };
        AES.decrypt = function (encryptedText) {
            encryptedText = encryptedText.replace(/-/g, "+");
            encryptedText = encryptedText.replace(/_/g, "/");
            var key = CryptoJS.enc.Utf8.parse(this.keyStr);
            var iv = CryptoJS.enc.Utf8.parse(this.ivStr);
            var decrypted = CryptoJS.AES.decrypt(encryptedText, key, { iv: iv, mode: CryptoJS.mode.CTR, padding: CryptoJS.pad.NoPadding });
            return decrypted.toString(CryptoJS.enc.Utf8);
        };
        AES.encryptPHP = function (plainText) {
            var key = CryptoJS.enc.Utf8.parse(this.keyStr);
            var iv = CryptoJS.enc.Utf8.parse(this.ivStr);
            var encrypted = CryptoJS.AES.encrypt(plainText, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
            var str1 = CryptoJS.enc.Utf8.parse(encrypted.toString());
            var str = CryptoJS.enc.Base64.stringify(str1);
            return str;
        };
        AES.ivStr = "terrysgygoaesctr";
        AES.keyStr = "kaayou20190110#$";
        return AES;
    }());
    kaayou.AES = AES;
    var MD5 = (function () {
        function MD5() {
        }
        MD5.encode = function (v) {
            return CryptoJS.MD5(v).toString();
        };
        return MD5;
    }());
    kaayou.MD5 = MD5;
    var TextCoder = (function () {
        function TextCoder() {
        }
        TextCoder.encode = function (ma, str) {
            return iconv.encode(str, ma);
        };
        TextCoder.decode = function (ma, buff) {
            return iconv.decode(buff, ma);
        };
        return TextCoder;
    }());
    kaayou.TextCoder = TextCoder;
})(kaayou || (kaayou = {}));
var kaayou;
(function (kaayou) {
    var GVoice = (function () {
        function GVoice() {
        }
        GVoice.prototype.Init = function (uid) {
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
            }
            else if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "GVoiceInit", "(Ljava/lang/String;)V", uid.toString());
            }
            GVoice.bLoginOK = false;
        };
        GVoice.prototype.EnterRoom = function (roomId) {
            console.log("GVoice EnterRoom");
            if (!cc.sys.isNative) {
                this.OnGvoiceJoinRoomOK(99);
                return;
            }
            if (!PlatformMgr.getInstance().sys.checkAllowJSInterface("GVoiceEnterTeamroom")) {
                console.log("接口不存在:GVoiceEnterTeamroom");
                return;
            }
            if (cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("NativeOcClass", "GVoiceEnterTeamroom:", roomId);
            }
            else if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "GVoiceEnterTeamroom", "(Ljava/lang/String;)V", roomId);
            }
            GVoice.roomId = roomId;
        };
        GVoice.prototype.QuitRoom = function (roomId) {
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
            }
            else if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "GVoiceQuitTeamroom", "(Ljava/lang/String;)V", roomId);
            }
            GVoice.roomId = "";
        };
        GVoice.prototype.OpenMic = function () {
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
            }
            else if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "GVoiceOpenMic", "()V");
            }
        };
        GVoice.prototype.OpenSpeaker = function () {
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
            }
            else if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "GVoiceOpenSpeaker", "()V");
            }
        };
        GVoice.prototype.CloseMic = function () {
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
            }
            else if (cc.sys.os == cc.sys.OS_ANDROID) {
                if (!PlatformMgr.getInstance().sys.checkAllowJSInterface("GVoiceCloseMic")) {
                    console.log("接口不存在:GVoiceCloseMic");
                    return;
                }
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "GVoiceCloseMic", "()V");
            }
        };
        GVoice.prototype.CloseSpeaker = function () {
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
            }
            else if (cc.sys.os == cc.sys.OS_ANDROID) {
                if (!PlatformMgr.getInstance().sys.checkAllowJSInterface("GVoiceCloseSpeaker")) {
                    console.log("接口不存在:GVoiceCloseSpeaker");
                    return;
                }
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "GVoiceCloseSpeaker", "()V");
            }
        };
        GVoice.prototype.ForbidMemberVoice = function (memId, bEnable, roomId) {
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
            }
            else if (cc.sys.os == cc.sys.OS_ANDROID) {
                if (!PlatformMgr.getInstance().sys.checkAllowJSInterface("GVoiceForbidMemberVoice")) {
                    console.log("接口不存在:GVoiceForbidMemberVoice");
                    return;
                }
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "GVoiceForbidMemberVoice", "(IZLjava/lang/String;)V", memId, bEnable, roomId);
            }
        };
        GVoice.prototype.pause = function () {
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
            }
            else if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "GVoicePause", "()V");
            }
        };
        GVoice.prototype.resume = function () {
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
            }
            else if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "GVoiceResume", "()V");
            }
        };
        GVoice.prototype.getInitStatus = function () {
            return GVoice.InitOK;
        };
        GVoice.prototype.OnGvoiceInitOK = function () {
            console.log("语音初始化成功");
            GVoice.InitOK = true;
            kaayou.emit("", "OnGvoiceInitOK");
        };
        GVoice.prototype.OnGvoiceJoinRoomOK = function (memberID) {
            memberID = Number(memberID);
            console.log("GVoice OnGvoiceJoinRoomOK, memberID =", memberID);
            kaayou.emit("", "OnGvoiceJoinRoomOK", { memberID: memberID });
        };
        GVoice.prototype.OnGvoiceOpenMicOK = function () {
            console.log("GVoice OnGvoiceOpenMicOK");
            kaayou.emit("", "OnGvoiceOpenMicOK");
        };
        GVoice.prototype.OnGvoiceCloseMicOK = function () {
            console.log("GVoice OnGvoiceCloseMicOK");
            kaayou.emit("", "OnGvoiceCloseMicOK");
        };
        GVoice.prototype.OnGvoiceOpenSpeakerOK = function () {
            console.log("GVoice OnGvoiceOpenSpeakerOK");
            kaayou.emit("", "OnGvoiceOpenSpeakerOK");
        };
        GVoice.prototype.OnGvoiceCloseSpeakerOK = function () {
            console.log("GVoice OnGvoiceCloseSpeakerOK");
            kaayou.emit("", "OnGvoiceCloseSpeakerOK");
        };
        GVoice.prototype.OnMemberVoice = function (memberid, status) {
            kaayou.emit("", "OnGvoiceMemberVoice", { memberid: memberid, status: status });
        };
        GVoice.bLoginOK = false;
        GVoice.roomId = "";
        GVoice.InitOK = false;
        return GVoice;
    }());
    var webGame = (function () {
        function webGame() {
        }
        webGame.prototype.Login = function (url, isVer) {
            if (!cc.sys.isNative) {
                return;
            }
            if (!PlatformMgr.getInstance().sys.checkAllowJSInterface("LoginWeb")) {
                console.log("接口不存在:LoginWeb");
                return;
            }
            if (cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("NativeOcClass", "LoginWeb:isVer:", url, isVer);
            }
            else if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "LoginWeb", "(Ljava/lang/String;Z)V", url, isVer);
            }
        };
        webGame.prototype.onLegendToPay = function (productInfo) {
            console.log("传奇相关商品" + productInfo);
            kaayou.emit("lobby", "mod::mall::legendBuy", { infoStr: productInfo });
        };
        return webGame;
    }());
    var YunVa = (function () {
        function YunVa() {
            this.micMember = [];
            this._t = null;
        }
        YunVa.prototype.Init = function () {
            if (!cc.sys.isNative) {
                return;
            }
            if (!PlatformMgr.getInstance().sys.checkAllowJSInterface("InitMic")) {
                console.log("接口不存在:InitMic");
                return;
            }
            if (cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("NativeOcClass", "InitMic");
            }
            else if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "InitMic", "()V");
            }
            YunVa.bLoginOK = false;
        };
        YunVa.prototype.OnMicLoginOK = function () {
            kaayou.emit("", "MicLoginOK");
            YunVa.bLoginOK = true;
        };
        YunVa.prototype.IsLoginOK = function () {
            return YunVa.bLoginOK;
        };
        YunVa.prototype.Login = function (uid, nickname, ext) {
            if (ext === void 0) { ext = ""; }
            if (!cc.sys.isNative) {
                return;
            }
            var info = {
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
            }
            else if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "LoginMic", "(Ljava/lang/String;)V", JSON.stringify(info));
            }
        };
        YunVa.prototype.Logout = function () {
            if (!cc.sys.isNative) {
                return;
            }
            if (!PlatformMgr.getInstance().sys.checkAllowJSInterface("LogoutMic")) {
                console.log("接口不存在:LogoutMic");
                return;
            }
            if (cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("NativeOcClass", "LogoutMic");
            }
            else if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "LogoutMic", "()V");
            }
            YunVa.bLoginOK = false;
        };
        YunVa.prototype.BeginMic = function () {
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
            }
            else if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "BeginMic", "()V");
            }
        };
        YunVa.prototype.EndMic = function () {
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
            }
            else if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "EndMic", "()V");
            }
        };
        YunVa.prototype.CancelMic = function () {
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
            }
            else if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "CancelMic", "()V");
            }
        };
        YunVa.prototype.PlayMic = function (uid, url) {
            if (!cc.sys.isNative) {
                var self_1 = this;
                this.OnMicPlayStart(uid);
                setTimeout(function () {
                    self_1.OnMicPlayEnd(uid);
                }, 1000);
                return;
            }
            if (!PlatformMgr.getInstance().sys.checkAllowJSInterface("PlayMic")) {
                console.log("接口不存在:PlayMic");
                return;
            }
            if (cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("NativeOcClass", "PlayMic:URL:", uid, url);
            }
            else if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "PlayMic", "(Ljava/lang/String;Ljava/lang/String;)V", uid, url);
            }
        };
        YunVa.prototype.OnMicStart = function () {
            kaayou.emit("", "MicStart");
        };
        YunVa.prototype.OnMicVolume = function (ext, volume) {
            kaayou.emit("", "MicVolume", { ext: ext, volume: volume });
        };
        YunVa.prototype.OnMicOk = function (url) {
            kaayou.emit("", "MicOk", url);
        };
        YunVa.prototype.OnMicStop = function () {
            kaayou.emit("", "MicStop");
        };
        YunVa.prototype.OnMicPlayStart = function (uid) {
            var self = this;
            kaayou.emit("", "MicPlayStart", uid);
            if (kaayou.PlatformMgr.getInstance().im.micMember.indexOf(uid) < 0) {
                kaayou.PlatformMgr.getInstance().im.micMember.push(uid);
            }
            if (kaayou.PlatformMgr.getInstance().im._t) {
                clearInterval(kaayou.PlatformMgr.getInstance().im._t);
                kaayou.PlatformMgr.getInstance().im._t = null;
            }
            kaayou.PlatformMgr.getInstance().im._t = setInterval(function () {
                if (kaayou.PlatformMgr.getInstance().im.micMember.length != 0) {
                    for (var i = 0; i < kaayou.PlatformMgr.getInstance().im.micMember.length; i++) {
                        kaayou.emit("", "MicPlayEnd", kaayou.PlatformMgr.getInstance().im.micMember[i]);
                    }
                }
                clearInterval(kaayou.PlatformMgr.getInstance().im._t);
                kaayou.PlatformMgr.getInstance().im._t = null;
            }, 30000);
        };
        YunVa.prototype.OnMicPlayEnd = function (uid) {
            var index = kaayou.PlatformMgr.getInstance().im.micMember.indexOf(uid);
            kaayou.PlatformMgr.getInstance().im.micMember.splice(index, 1);
            kaayou.emit("", "MicPlayEnd", uid);
        };
        YunVa.bLoginOK = false;
        return YunVa;
    }());
    var Wechat = (function () {
        function Wechat() {
            this.rewardedVideoAd = null;
            this.lastWeChatCode = "";
        }
        Wechat.prototype.Login = function () {
            Wechat.isUpdate = false;
            kaayou.emit("common", "ui::Loading::Show", { msg: "正在启动微信，请稍后...", time: 2 });
            setTimeout(function () {
                PlatformMgr.getInstance().wx.pullWX();
            }, 1);
        };
        Wechat.prototype.pullWX = function () {
            if (!cc.sys.isNative) {
                cc.log(Wechat.isUpdate);
                return;
            }
            if (cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("NativeOcClass", "LoginWx");
            }
            else if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "LoginWx", "()V");
            }
        };
        Wechat.prototype.Update = function () {
            Wechat.isUpdate = true;
            kaayou.emit("common", "ui::Loading::Show", { msg: "正在启动微信，请稍后...", time: 2 });
            setTimeout(function () {
                PlatformMgr.getInstance().wx.pullWX();
            }, 1);
        };
        Wechat.prototype.OnWxLoginCancel = function () {
            kaayou.emit("common", "ui::Loading::Hide");
            kaayou.emit("", "WxLoginCancel");
        };
        Wechat.prototype.OnWxInstalled = function () {
            kaayou.emit("common", "ui::Loading::Hide");
            kaayou.emit("", "WxInstalled");
        };
        Wechat.prototype.OnLogin = function (code) {
            console.log("微信OnLogin:", code);
            if (!code || code.length < 1) {
                return;
            }
            if (this.lastWeChatCode == code) {
                return;
            }
            this.lastWeChatCode = code;
            kaayou.emit("common", "ui::Loading::Hide");
            if (Wechat.isUpdate) {
                kaayou.emit("", "mod::User::wx::update", code);
            }
            else {
                kaayou.emit("", "mod::User::wx::login", code);
            }
        };
        Wechat.prototype.OnShareWxResult = function (code, transaction) {
            if (!code || code.length < 1) {
                return;
            }
            kaayou.emit("", "OnShareWxResult", { code: code, transaction: transaction });
        };
        Wechat.prototype.ShareText = function (title, text, transaction) {
            if (transaction === void 0) { transaction = ""; }
            if (!cc.sys.isNative) {
                return;
            }
            var data = {
                title: title,
                text: text,
                transaction: transaction
            };
            if (cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("NativeOcClass", "ShareText:", JSON.stringify(data));
            }
            else if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "ShareText", "(Ljava/lang/String;)V", JSON.stringify(data));
            }
        };
        Wechat.prototype.ShareTimeLineText = function (title, text, transaction) {
            if (transaction === void 0) { transaction = ""; }
            if (!cc.sys.isNative) {
                return;
            }
            var data = {
                title: title,
                text: text,
                transaction: transaction
            };
            if (cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("NativeOcClass", "ShareTimeLineText:", JSON.stringify(data));
            }
            else if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "ShareTimeLineText", "(Ljava/lang/String;)V", JSON.stringify(data));
            }
        };
        Wechat.prototype.ShareURL = function (title, text, url, transaction) {
            if (transaction === void 0) { transaction = ""; }
            if (!cc.sys.isNative) {
                return;
            }
            var data = {
                title: title,
                text: text,
                url: url,
                transaction: transaction
            };
            if (cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("NativeOcClass", "ShareURL:", JSON.stringify(data));
            }
            else if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "ShareURL", "(Ljava/lang/String;)V", JSON.stringify(data));
            }
        };
        Wechat.prototype.ShareTimeLineURL = function (title, text, url, transaction) {
            if (transaction === void 0) { transaction = ""; }
            if (!cc.sys.isNative) {
                return;
            }
            var data = {
                title: title,
                text: text,
                url: url,
                transaction: transaction
            };
            if (cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("NativeOcClass", "ShareTimeLineURL:", JSON.stringify(data));
            }
            else if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "ShareTimeLineURL", "(Ljava/lang/String;)V", JSON.stringify(data));
            }
        };
        Wechat.prototype.ShareImage = function (title, path, transaction) {
            if (transaction === void 0) { transaction = ""; }
            if (!cc.sys.isNative) {
                return;
            }
            var data = {
                title: title,
                path: path,
                transaction: transaction
            };
            if (cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("NativeOcClass", "ShareImage:", JSON.stringify(data));
            }
            else if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "ShareImage", "(Ljava/lang/String;)V", JSON.stringify(data));
            }
        };
        Wechat.prototype.ShareTimeLineImage = function (title, path, transaction) {
            if (transaction === void 0) { transaction = ""; }
            if (!cc.sys.isNative) {
                return;
            }
            var data = {
                title: title,
                path: path,
                transaction: transaction
            };
            if (cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("NativeOcClass", "ShareTimeLineImage:", JSON.stringify(data));
            }
            else if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "ShareTimeLineImage", "(Ljava/lang/String;)V", JSON.stringify(data));
            }
        };
        Wechat.prototype.createRewardedVideoAd = function (data) {
            var self = this;
            console.log(this.rewardedVideoAd);
            this.rewardedVideoAd.onLoad(function () {
                console.log('激励视频 广告加载成功');
                kaayou.emit('lobby', 'ui::LeftMenuPanle::videoLoad');
            });
            this.rewardedVideoAd.onError(function (err) {
                console.log(err);
                if (err.errCode && err.errMsg) {
                    kaayou.emit('common', 'ui::Toast::Show', { msg: err.errMsg });
                }
            });
            this.rewardedVideoAd.onClose(function (res) {
                if (res && res.isEnded || res === undefined) {
                    kaayou.emit('lobby', 'ws::Msg::videoadaward');
                    console.log('正常播放结束，可以下发游戏奖励');
                }
                else {
                    kaayou.emit('common', 'ui::Toast::Show', { msg: "播放中途退出，不下发游戏奖励" });
                    console.log('播放中途退出，不下发游戏奖励');
                }
            });
        };
        Wechat.prototype.playVideo = function () {
            var self = this;
            self.rewardedVideoAd.show()
                .catch(function (err) {
                self.rewardedVideoAd.load()
                    .then(function () { return self.rewardedVideoAd.show(); });
            });
        };
        Wechat.prototype.ShowFeedback = function (title) {
            if (cc.sys.isWeChat == undefined) {
                return;
            }
        };
        Wechat.isUpdate = false;
        return Wechat;
    }());
    var BaiduMap = (function () {
        function BaiduMap() {
            this.pullCount = 0;
            this.hasReturn = false;
            this.calling = false;
        }
        BaiduMap.prototype.GetMapInfo = function () {
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
                setTimeout(function () {
                    if (!kaayou.PlatformMgr.getInstance().map.hasReturn) {
                        kaayou.PlatformMgr.getInstance().map.calling = false;
                        console.log("map err:" + myUserId + ":" + "gps没有收到任何返回");
                        kaayou.PlatformMgr.getInstance().sys.PostBugly("map err:" + kaayou.getLobbyVersion(), "timeout", myUserId + ":" + "gps没有收到任何返回");
                    }
                }, 5000);
            }
            var myUserId = "";
            var userInfo = lobby.mod.User.getInstance().getUserInfo();
            if (!!userInfo) {
                myUserId = userInfo.uid.toString();
            }
            var callTime = new Date();
            var now = callTime.toLocaleString();
            if (cc.sys.os == cc.sys.OS_IOS) {
                kaayou.PlatformMgr.getInstance().map.traceMap(now + "开始调用ios gps sdk");
                jsb.reflection.callStaticMethod("NativeOcClass", "GetMapInfo");
            }
            else if (cc.sys.os == cc.sys.OS_ANDROID) {
                kaayou.PlatformMgr.getInstance().map.traceMap(now + "开始调用android gps sdk");
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "GetMapInfo", "()V");
            }
        };
        BaiduMap.prototype.isValidAddr = function (longitude, latitude) {
            if (longitude == NaN || latitude == NaN) {
                return false;
            }
            if (longitude < -180 || longitude > 180 || latitude > 90 || latitude < -90) {
                return false;
            }
            ;
            if (longitude >= -2 && longitude <= 2 && latitude >= -2 && latitude <= 2) {
                return false;
            }
            ;
            return true;
        };
        BaiduMap.prototype.jumpGPSSetting = function (msgcode) {
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
                }
                else if (msgcode == "-2") {
                    jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "JumpGPSAuthSetting", "()V");
                }
            }
        };
        BaiduMap.prototype.OnGaoDeMapInfo = function (data) {
            try {
                kaayou.PlatformMgr.getInstance().map.hasReturn = true;
                kaayou.PlatformMgr.getInstance().map.calling = false;
                console.log("map:收到高德回调：" + data);
                var mp = JSON.parse(data);
                if (mp) {
                    var time = new Date();
                    var now = time.toLocaleString();
                    kaayou.PlatformMgr.getInstance().map.traceMap(now + "高德：" + data);
                    var areaInfo = kaayou.DataSet.get("user::Map");
                    var myUserId = "";
                    var userInfo = lobby.mod.User.getInstance().getUserInfo();
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
            }
            catch (err) {
                console.log("map err gaode:" + err);
            }
        };
        BaiduMap.prototype.OnMapInfo = function (data) {
            try {
                kaayou.PlatformMgr.getInstance().map.hasReturn = true;
                kaayou.PlatformMgr.getInstance().map.calling = false;
                var mp = JSON.parse(data);
                if (mp) {
                    var time = new Date();
                    var now = time.toLocaleString();
                    var recont = 10;
                    var myUserId = "";
                    var userInfo = lobby.mod.User.getInstance().getUserInfo();
                    if (!!userInfo) {
                        myUserId = userInfo.uid.toString();
                    }
                    if (!!mp.errcode) {
                        console.log("map errmsg:" + mp.errmsg);
                        kaayou.DataSet.set("GPSError", mp.errcode);
                        kaayou.PlatformMgr.getInstance().sys.PostBugly("map err:" + kaayou.getLobbyVersion(), mp.errcode, myUserId + ":" + mp.errmsg);
                    }
                    else {
                        console.log("map:收到百度回调：" + data);
                        kaayou.PlatformMgr.getInstance().map.traceMap(now + "百度：" + data);
                        if (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS) {
                            recont = 2;
                        }
                        if (kaayou.PlatformMgr.getInstance().map.pullCount < recont) {
                            if (mp.longitude && mp.latitude) {
                                if (mp.longitude == '4.9E-324' && mp.latitude == '4.9E-324') {
                                    var areaInfo = kaayou.DataSet.get("user::Map");
                                    if (lodash.isEmpty(areaInfo)) {
                                        kaayou.PlatformMgr.getInstance().map.GetMapInfo();
                                        kaayou.PlatformMgr.getInstance().map.pullCount++;
                                        kaayou.PlatformMgr.getInstance().sys.PostBugly("map err:" + kaayou.getLobbyVersion(), "4.9E-324", myUserId + ":" + data);
                                    }
                                }
                                else if (!kaayou.PlatformMgr.getInstance().map.isValidAddr(Number(mp.longitude), Number(mp.latitude))) {
                                    kaayou.PlatformMgr.getInstance().map.GetMapInfo();
                                    kaayou.PlatformMgr.getInstance().map.pullCount++;
                                    kaayou.PlatformMgr.getInstance().sys.PostBugly("map err:" + kaayou.getLobbyVersion(), "isNotValidAddr", myUserId + ":" + data);
                                }
                                else {
                                    kaayou.PlatformMgr.getInstance().map.pullCount = 0;
                                    kaayou.DataSet.set("user::Map", data);
                                    kaayou.DataSet.set("GPSError", "");
                                    kaayou.emit("", "MapInfo", data);
                                }
                            }
                            else {
                                kaayou.PlatformMgr.getInstance().map.GetMapInfo();
                                kaayou.PlatformMgr.getInstance().map.pullCount++;
                                kaayou.PlatformMgr.getInstance().sys.PostBugly("map err:" + kaayou.getLobbyVersion(), "hasnotlongitude", myUserId + ":" + data);
                            }
                        }
                    }
                }
            }
            catch (err) {
                console.log("map err:baidu" + err);
            }
        };
        BaiduMap.prototype.traceMap = function (data) {
            setTimeout(function () {
                console.log("map bugly:" + data);
                var configs = common.mod.Config.GetAppConfig();
                var sUserId = configs.buglyTrace;
                if (!!sUserId) {
                    var arr = sUserId.split(',');
                    var userInfo = lobby.mod.User.getInstance().getUserInfo();
                    if (!!userInfo) {
                        var myUserId = userInfo.uid.toString();
                        if (arr.indexOf(myUserId) >= 0) {
                            kaayou.PlatformMgr.getInstance().sys.PostBugly("map trace:" + kaayou.getLobbyVersion(), myUserId, data);
                        }
                    }
                }
            }, 500);
        };
        return BaiduMap;
    }());
    var System = (function () {
        function System() {
            this.batteryInfo = null;
        }
        System.prototype.OnSoundResume = function () {
            kaayou.SoundManager.getInstance().resumeMusic();
        };
        System.prototype.addBatteryNotification = function () {
            console.log("增加监听电池信息和状态的通知");
            if (!cc.sys.isNative) {
                return;
            }
            if (cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("NativeOcClass", "GetBatteryInfoNotification");
            }
            else if (cc.sys.os == cc.sys.OS_ANDROID) {
                this.GetBatteryInfo();
            }
        };
        System.prototype.removeBatteryNotification = function () {
            if (!cc.sys.isNative) {
                return;
            }
            if (cc.sys.os == cc.sys.OS_IOS) {
            }
            else if (cc.sys.os == cc.sys.OS_ANDROID) {
            }
        };
        System.prototype.OnSysBatteryInfoRsp = function (info) {
            try {
                console.log("电池信息" + info);
                kaayou.PlatformMgr.getInstance().sys.batteryInfo = JSON.parse(info);
            }
            catch (err) {
            }
        };
        System.prototype.GetBatteryInfo = function () {
            try {
                if (!cc.sys.isNative) {
                    return { state: "Unplugged", level: 100 };
                }
                var jStr = "";
                if (cc.sys.os == cc.sys.OS_IOS) {
                    jStr = jsb.reflection.callStaticMethod("NativeOcClass", "GetBatteryInfo");
                }
                else if (cc.sys.os == cc.sys.OS_ANDROID) {
                    jStr = jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "GetBatteryInfo", "()Ljava/lang/String;");
                }
                console.log("收到安卓传来的电量:", jStr);
                kaayou.PlatformMgr.getInstance().sys.batteryInfo = JSON.parse(jStr);
            }
            catch (err) {
            }
            return { state: "Unplugged", level: 100 };
        };
        System.prototype.ShowTransitionMask = function () {
            if (!!cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "ShowTransitionMask", "()V");
            }
        };
        System.prototype.HideTransitionMask = function () {
            if (!!cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "HideTransitionMask", "()V");
            }
        };
        System.prototype.DownloadApk = function (url) {
            if (!!cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
                var codeStr = jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "DownloadApk", "(Ljava/lang/String;)V", url);
            }
        };
        System.prototype.InstallApk = function (path) {
            if (!!cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
                var codeStr = jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "InstallApk", "(Ljava/lang/String;)V", path);
            }
        };
        System.prototype.OnDownloadApk = function (code, extend) {
            console.log("Js OnDownloadApk", code, extend);
            kaayou.emit("common", "ui::apk::onDownload", { code: code, extend: extend });
        };
        System.prototype.GetLocalVersionCode = function () {
            var code = "1000";
            if (!cc.sys.isNative) {
                return code;
            }
            if (cc.sys.os == cc.sys.OS_IOS) {
                var codeStr = jsb.reflection.callStaticMethod("NativeOcClass", "GetLocalVersionCode");
                code = codeStr;
            }
            else if (cc.sys.os == cc.sys.OS_ANDROID) {
                var codeStr = jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "GetLocalVersionCode", "()Ljava/lang/String;");
                code = codeStr;
            }
            return code;
        };
        System.prototype.GetLocalVersionName = function () {
            var name = "1.9.7";
            if (cc.sys.isWeChat) {
                return name;
            }
            if (!cc.sys.isNative) {
                name = kaayou.Http.GetRequest(location.search)['version'] || name;
                return name;
            }
            if (cc.sys.os == cc.sys.OS_IOS) {
                var codeStr = jsb.reflection.callStaticMethod("NativeOcClass", "GetLocalVersionName");
                name = codeStr;
            }
            else if (cc.sys.os == cc.sys.OS_ANDROID) {
                var codeStr = jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "GetLocalVersionName", "()Ljava/lang/String;");
                console.log("Local APK Version:", codeStr);
                name = codeStr;
            }
            else if (cc.sys.os == cc.sys.OS_WINDOWS) {
                if (jsb.fileUtils.isFileExist("appConfig.json")) {
                    try {
                        do {
                            var appconfig = PlatformMgr.getInstance().sys.GetLocalAppConfig();
                            if (!appconfig) {
                                break;
                            }
                            if (lodash.isEmpty(appconfig.version)) {
                                break;
                            }
                            name = appconfig.version;
                        } while (0);
                    }
                    catch (err) {
                        console.log("appConfig.json nil");
                    }
                }
                console.log("appConfig.json can`t find");
            }
            return name;
        };
        System.prototype.GetLocalAppConfig = function () {
            if (!cc.sys.isNative) {
                return null;
            }
            if (cc.sys.os == cc.sys.OS_IOS) {
                return null;
            }
            else if (cc.sys.os == cc.sys.OS_ANDROID) {
                return null;
            }
            else if (cc.sys.os == cc.sys.OS_WINDOWS) {
                if (jsb.fileUtils.isFileExist("appConfig.json")) {
                    try {
                        do {
                            var appconfigStr = jsb.fileUtils.getStringFromFile("appConfig.json");
                            if (lodash.isEmpty(appconfigStr)) {
                                break;
                            }
                            var appconfig = JSON.parse(appconfigStr);
                            if (lodash.isNull(appconfig) || lodash.isEmpty(appconfig)) {
                                break;
                            }
                            return appconfig;
                        } while (0);
                    }
                    catch (err) {
                        console.log("appConfig.json nil");
                    }
                }
                console.log("appConfig.json can`t find");
                return null;
            }
            return null;
        };
        System.prototype.OpenUrl = function (url) {
            console.log("打开链接", url);
            if (!cc.sys.isNative) {
                window.open(url);
                return;
            }
            if (cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("NativeOcClass", "OpenUrl:", url);
            }
            else if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "OpenUrl", "(Ljava/lang/String;)V", url);
            }
        };
        System.prototype.OpenCallPhone = function (telNum) {
            if (!cc.sys.isNative) {
                console.log("正在拨打电话", telNum);
                return;
            }
            if (cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("NativeOcClass", "OpenCallPhone:", telNum);
            }
            else if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "OpenCallPhone", "(Ljava/lang/String;)V", telNum);
            }
        };
        System.prototype.Log = function (tag, msg) {
            if (!cc.sys.isNative) {
                console.log(tag, msg);
                return;
            }
            if (cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("NativeOcClass", "KaLog:msg:", tag, msg);
            }
            else if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "KaLog", "(Ljava/lang/String;Ljava/lang/String;)V", tag, msg);
            }
        };
        System.prototype.Dialog = function (text) {
            if (!cc.sys.isNative) {
                window.confirm(text);
                return;
            }
            if (cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("NativeOcClass", "Dialog:", text);
            }
            else if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "Dialog", "(Ljava/lang/String;)V", text);
            }
        };
        System.prototype.OnDialogRes = function (res) {
        };
        System.prototype.Toast = function (text) {
            if (!cc.sys.isNative) {
                var div_1 = window.document.getElementById("WebToast");
                if (!div_1) {
                    div_1 = window.document.createElement("div");
                    div_1.id = "WebToast";
                    div_1.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
                    div_1.style.color = "#fff";
                    div_1.style.top = "50%";
                    div_1.style.left = "50%";
                    div_1.style.position = "absolute";
                    div_1.style.transform = "translateY(-50%) translateX(-50%)";
                    div_1.style.display = "none";
                    div_1.style.padding = "10px";
                    window.document.body.appendChild(div_1);
                }
                if (div_1["ti"]) {
                    clearTimeout(div_1["ti"]);
                }
                div_1.style.display = "block";
                div_1.innerText = text;
                div_1["ti"] = setTimeout(function () {
                    if (div_1["ti"]) {
                        div_1["ti"] = null;
                    }
                    div_1.style.display = "none";
                }, 1000);
                return;
            }
            if (cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("NativeOcClass", "Toast:", text);
            }
            else if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "Toast", "(Ljava/lang/String;)V", text);
            }
        };
        System.prototype.Exit = function (type) {
            if (!cc.sys.isNative) {
                return;
            }
            if (cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("NativeOcClass", "Exit");
            }
            else if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "Exit", "(Ljava/lang/String;)V", type);
            }
        };
        System.prototype.GetFileLength = function (url) {
            return __awaiter(this, void 0, void 0, function () {
                var length_1, jStr, err_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            if (!!cc.sys.isNative) return [3, 2];
                            return [4, kaayou.Http.GetFileSize(url)];
                        case 1:
                            length_1 = _a.sent();
                            return [2, length_1];
                        case 2:
                            if (!PlatformMgr.getInstance().sys.checkAllowJSInterface("GetFileLength")) {
                                console.log("接口不存在:GetFileLength");
                                return [2, "跳过"];
                            }
                            jStr = "";
                            if (cc.sys.os == cc.sys.OS_IOS) {
                                return [2, "跳过"];
                            }
                            else if (cc.sys.os == cc.sys.OS_ANDROID) {
                                jStr = jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "GetFileLength", "(Ljava/lang/String;)Ljava/lang/String;", url);
                            }
                            return [2, jStr];
                        case 3:
                            err_1 = _a.sent();
                            return [2, "-1"];
                        case 4: return [2];
                    }
                });
            });
        };
        System.prototype.GetNetInfo = function () {
            try {
                if (!cc.sys.isNative) {
                    return window.navigator.onLine == true ? { type: "wifi", level: 100 } : { type: "none", level: 0 };
                }
                var jStr = "";
                if (cc.sys.os == cc.sys.OS_IOS) {
                    jStr = jsb.reflection.callStaticMethod("NativeOcClass", "GetNetInfo");
                }
                else if (cc.sys.os == cc.sys.OS_ANDROID) {
                    jStr = jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "GetNetInfo", "()Ljava/lang/String;");
                }
                var data = JSON.parse(jStr);
                if (data.type) {
                    return data;
                }
            }
            catch (err) {
                console.log("获取网络失败");
            }
            return { type: "wifi", level: 100 };
        };
        System.prototype.GetDeviceKey = function () {
            if (!cc.sys.isNative) {
                var code = kaayou.Http.GetRequest(location.search)['code'] || Date.now().toString();
                return code;
            }
            else {
                var code = cc.sys.localStorage.getItem("debugCode");
                if (!!code) {
                    return code;
                }
                else {
                    if (cc.sys.os == cc.sys.OS_IOS) {
                        var _key = jsb.reflection.callStaticMethod("NativeOcClass", "GetDeviceKey");
                        cc.log("GetDeviceKey", _key);
                        if (_key.length < 1) {
                            return "";
                        }
                        _key = kaayou.MD5.encode(_key);
                        return _key;
                    }
                    else if (cc.sys.os == cc.sys.OS_ANDROID) {
                        console.log("GetDeviceKey OS_ANDROID");
                        var _key = jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "GetDeviceKey", "()Ljava/lang/String;");
                        return _key;
                    }
                    else {
                        try {
                            do {
                                var appconfig = PlatformMgr.getInstance().sys.GetLocalAppConfig();
                                if (!appconfig) {
                                    break;
                                }
                                if (lodash.isEmpty(appconfig.deviceKey)) {
                                    break;
                                }
                                return appconfig.deviceKey;
                            } while (0);
                        }
                        catch (err) {
                            console.log("appConfig.json nil");
                        }
                        return Date.now().toString();
                    }
                }
            }
        };
        System.prototype.getPhoneBrand = function () {
            try {
                if (!cc.sys.isNative) {
                    return "网页";
                }
                else if (cc.sys.os == cc.sys.OS_WINDOWS) {
                    return "Windows";
                }
                else if (cc.sys.os == cc.sys.OS_IOS) {
                    return "iPhone";
                }
                else if (cc.sys.os == cc.sys.OS_ANDROID) {
                    if (!PlatformMgr.getInstance().sys.checkAllowJSInterface("GetPhoneBrand")) {
                        console.log("接口不存在:GetPhoneBrand");
                        return "";
                    }
                    return jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "GetPhoneBrand", "()Ljava/lang/String;");
                }
            }
            catch (err) {
                return "";
            }
        };
        System.prototype.Vibrate = function (time) {
            if (time === void 0) { time = 1; }
            if (!cc.sys.isNative) {
                return;
            }
            if (cc.sys.os == cc.sys.OS_IOS) {
                return jsb.reflection.callStaticMethod("NativeOcClass", "Vibrate:", time);
            }
            else if (cc.sys.os == cc.sys.OS_ANDROID) {
                return jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "Vibrate", "(I)V", time);
            }
        };
        System.prototype.copyStringToPasteBoard = function (text) {
            var isSuccessed = "0";
            if (!cc.sys.isNative) {
                return isSuccessed;
            }
            if (cc.sys.os == cc.sys.OS_IOS) {
                isSuccessed = jsb.reflection.callStaticMethod("NativeOcClass", "copyStringToPasteboard:", text);
            }
            else if (cc.sys.os == cc.sys.OS_ANDROID) {
                isSuccessed = jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "copyStringToPasteboard", "(Ljava/lang/String;)I", text);
            }
            return isSuccessed;
        };
        System.prototype.GetMediaStatus = function () {
            var flag = false;
            if (!cc.sys.isNative) {
                return flag;
            }
            if (!PlatformMgr.getInstance().sys.checkAllowJSInterface("checkMic")) {
                console.log("接口不存在:checkMic");
                return;
            }
            if (cc.sys.os == cc.sys.OS_IOS) {
                var flag1 = jsb.reflection.callStaticMethod("NativeOcClass", "checkMic");
                flag = flag1 == 2 ? true : false;
            }
            else if (cc.sys.os == cc.sys.OS_ANDROID) {
                flag = false;
            }
            return flag;
        };
        System.prototype.jumpAppSetting = function () {
            if (!cc.sys.isNative) {
                return;
            }
            if (cc.sys.os == cc.sys.OS_ANDROID) {
                if (!PlatformMgr.getInstance().sys.checkAllowJSInterface("JumpGPSAuthSetting")) {
                    console.log("接口不存在:JumpGPSServiceSetting");
                    return;
                }
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "JumpGPSAuthSetting", "()V");
            }
            else if (cc.sys.os == cc.sys.OS_IOS) {
                if (!PlatformMgr.getInstance().sys.checkAllowJSInterface("JumpGpsSetting")) {
                    console.log("接口不存在:JumpGpsSetting");
                    return;
                }
                jsb.reflection.callStaticMethod("NativeOcClass", "JumpGpsSetting");
            }
        };
        System.prototype.jumpWeChatImmediacy = function () {
            if (!cc.sys.isNative) {
                return;
            }
            if (cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("NativeOcClass", "jumpWeChatImmediacy");
            }
            else if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "getWechatApi", "()V");
            }
        };
        System.prototype.checkAllowJSInterface = function (method) {
            if (!lodash.isString(method)) {
                return false;
            }
            if (method == "") {
                return false;
            }
            var allowJSInterfaceStr = kaayou.DataSet.get("allowJSInterface");
            if (!allowJSInterfaceStr) {
                return false;
            }
            if (allowJSInterfaceStr == '') {
                return false;
            }
            try {
                var allowJSInterface = JSON.parse(allowJSInterfaceStr);
                if (!allowJSInterface) {
                    return false;
                }
                if (!lodash.isArray(allowJSInterface)) {
                    return false;
                }
                lodash.isArray(allowJSInterface);
                if (allowJSInterface.indexOf(method) > -1) {
                    return true;
                }
                return false;
            }
            catch (e) {
                return false;
            }
        };
        System.prototype.PostBugly = function (val0, val1, val2) {
            if (val1 === void 0) { val1 = ""; }
            if (val2 === void 0) { val2 = ""; }
            var CRASHTYPE_COCOS2DX_JS = 5;
            if (!cc.sys.isNative) {
                return;
            }
            if (!PlatformMgr.getInstance().sys.checkAllowJSInterface("PostBugly")) {
                console.log("接口不存在:PostBugly");
                return;
            }
            if (cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("NativeOcClass", "PostBugly:Var1:Var2:Var3:", "5", val0, val1, val2);
            }
            else if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "PostBugly", "(ILjava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", CRASHTYPE_COCOS2DX_JS, val0, val1, val2);
            }
        };
        return System;
    }());
    var Pay = (function () {
        function Pay() {
        }
        Pay.prototype.AliPay = function (orderString) {
            if (!cc.sys.isNative) {
                return;
            }
            if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "Alipay", "(Ljava/lang/String;)V", orderString);
            }
        };
        Pay.prototype.ApplePay = function (productID, orderID, token) {
            if (!cc.sys.isNative) {
                return;
            }
            if (cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative) {
                jsb.reflection.callStaticMethod("NativeOcClass", "IOSPay:OrderID:Token:", productID, orderID, token);
            }
        };
        Pay.prototype.WeCahtPay = function (payData) {
            if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "WechatPay", "(Ljava/lang/String;)V", payData);
            }
        };
        Pay.prototype.payBaseInfo = function (url, token, appid) {
            if (!cc.sys.isNative) {
                return;
            }
            if (cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("NativeOcClass", "iosPayInfowithUrl:Token:andAppid:", url, token, appid);
            }
            else if (cc.sys.os == cc.sys.OS_ANDROID) {
                return;
            }
        };
        Pay.prototype.OnPayRes = function (code, msg) {
            kaayou.emit('', "PayRes", { code: code, msg: msg });
        };
        return Pay;
    }());
    var DDShare = (function () {
        function DDShare() {
        }
        DDShare.prototype.DDShareURL = function (title, text, url, transaction) {
            if (transaction === void 0) { transaction = ""; }
            if (!cc.sys.isNative) {
                return;
            }
            var data = {
                title: title,
                text: text,
                url: url,
                transaction: transaction
            };
            if (cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("NativeOcClass", "DDShareURL:", JSON.stringify(data));
            }
            else if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "DDShareURL", "(Ljava/lang/String;)V", JSON.stringify(data));
            }
        };
        DDShare.prototype.DDShareImage = function (title, path, transaction) {
            if (transaction === void 0) { transaction = ""; }
            if (!cc.sys.isNative) {
                return;
            }
            var data = {
                title: title,
                path: path,
                transaction: transaction
            };
            if (cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("NativeOcClass", "DDShareImage:", JSON.stringify(data));
            }
            else if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "DDShareImage", "(Ljava/lang/String;)V", JSON.stringify(data));
            }
        };
        DDShare.prototype.DDShareText = function (title, text, transaction) {
            if (transaction === void 0) { transaction = ""; }
            if (!cc.sys.isNative) {
                return;
            }
            var data = {
                title: title,
                text: text,
                transaction: transaction
            };
            if (cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("NativeOcClass", "DDShareText:", JSON.stringify(data));
            }
            else if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "DDShareText", "(Ljava/lang/String;)V", JSON.stringify(data));
            }
        };
        DDShare.prototype.OnDdShareRes = function (code, msg) {
            kaayou.emit("", "DdShareRes", { code: code, msg: msg });
        };
        return DDShare;
    }());
    var MagicWindow = (function () {
        function MagicWindow() {
        }
        MagicWindow.prototype.getMagicWindowInfo = function () {
            if (!cc.sys.isNative) {
                return "0";
            }
            else {
                var infoStr = "0";
                if (cc.sys.os == cc.sys.OS_IOS) {
                    infoStr = jsb.reflection.callStaticMethod("NativeOcClass", "getMagicWindowInfo");
                }
                else if (cc.sys.os == cc.sys.OS_ANDROID) {
                    infoStr = jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "getMagicWindowInfo", "()Ljava/lang/String;");
                }
                return infoStr;
            }
            return "0";
        };
        MagicWindow.prototype.OnMagicWindowCallPull = function () {
            try {
                kaayou.emit("", "MagicWindowCallPull");
            }
            catch (error) {
            }
        };
        MagicWindow.prototype.tellClientToClear = function () {
            if (!cc.sys.isNative) {
                return;
            }
            if (cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("NativeOcClass", "clearMagicWindowInfo");
            }
            else if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "clearMagicWindowInfo", "()V");
            }
        };
        MagicWindow.prototype.OnMagicWindowRsp = function (msg1) {
            try {
                var obj = JSON.parse(msg1);
                console.log("--安卓怎么代码没有这段--");
                kaayou.emit("", "MagicWindowRsp", { msg: obj });
            }
            catch (err) {
            }
        };
        return MagicWindow;
    }());
    var XL = (function () {
        function XL() {
        }
        XL.prototype.XLShareText = function (title, text, transaction) {
            if (transaction === void 0) { transaction = ""; }
        };
        XL.prototype.XLShareImage = function (title, path, transaction) {
            if (transaction === void 0) { transaction = ""; }
        };
        XL.prototype.XLShareURL = function (title, text, url, transaction) {
            if (transaction === void 0) { transaction = ""; }
        };
        return XL;
    }());
    var XX = (function () {
        function XX() {
        }
        XX.prototype.XXShareURL = function (title, text, url, transaction) {
            if (transaction === void 0) { transaction = ""; }
        };
        XX.prototype.XXShareImage = function (title, path, transaction) {
            if (transaction === void 0) { transaction = ""; }
        };
        return XX;
    }());
    var PlatformMgr = (function () {
        function PlatformMgr() {
            this.gvoice = null;
            this.map = null;
            this.wx = null;
            this.im = null;
            this.sys = null;
            this.pay = null;
            this.dd = null;
            this.mw = null;
            this.xl = null;
            this.xx = null;
            this.webGame = null;
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
            this.BindWindowMethod();
        }
        PlatformMgr.getInstance = function () {
            if (PlatformMgr.__Ins__ == null) {
                PlatformMgr.__Ins__ = new PlatformMgr();
            }
            return PlatformMgr.__Ins__;
        };
        PlatformMgr.prototype.BindWindowMethod = function () {
            var KaNativeBridge = {};
            KaNativeBridge.OnDialogRes = this.sys.OnDialogRes;
            KaNativeBridge.OnDownloadApk = this.sys.OnDownloadApk;
            KaNativeBridge.OnWxLogin = this.wx.OnLogin;
            KaNativeBridge.OnWxLoginCancel = this.wx.OnWxLoginCancel;
            KaNativeBridge.OnShareWxResult = this.wx.OnShareWxResult;
            KaNativeBridge.OnWxInstalled = this.wx.OnWxInstalled;
            KaNativeBridge.OnMapInfo = this.map.OnMapInfo;
            KaNativeBridge.OnGaoDeMapInfo = this.map.OnGaoDeMapInfo;
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
            KaNativeBridge.OnPayRes = this.pay.OnPayRes;
            KaNativeBridge.OnDdShareRes = this.dd.OnDdShareRes;
            KaNativeBridge.OnMagicWindowRsp = this.mw.OnMagicWindowRsp;
            KaNativeBridge.OnMagicWindowCallPull = this.mw.OnMagicWindowCallPull;
            KaNativeBridge.OnSysBatteryInfoRsp = this.sys.OnSysBatteryInfoRsp;
            KaNativeBridge.OnLegendToPay = this.webGame.onLegendToPay;
            KaNativeBridge.OnSoundResume = this.sys.OnSoundResume;
            window['KaNativeBridge'] = KaNativeBridge;
        };
        PlatformMgr.__Ins__ = null;
        return PlatformMgr;
    }());
    kaayou.PlatformMgr = PlatformMgr;
})(kaayou || (kaayou = {}));
var kaayou;
(function (kaayou) {
    var Event = (function () {
        function Event(type, data) {
            this.isPropagationStopped = false;
            this.type = type;
            this.data = data;
        }
        Event.prototype.stopPropagation = function () {
            this.isPropagationStopped = true;
        };
        Event.create = function (EventClass, type, data) {
            var eventPool = EventClass._eventPool;
            if (eventPool == null) {
                eventPool = EventClass._eventPool = [];
            }
            if (eventPool.length > 0) {
                var event_1 = eventPool.pop();
                event_1.type = type;
                event_1.data = data;
                event_1.isPropagationStopped = false;
                return event_1;
            }
            return new EventClass(type);
        };
        Event.recycle = function (event) {
            event.target = event.currentTarget = event.data = null;
            var EventClass = Object.getPrototypeOf(event).constructor;
            EventClass._eventPool.push(event);
        };
        Event.ENTER_FRAME = "enterFrame";
        Event.PRERENDER = "prerender";
        Event.ACTIVATE = "activate";
        Event.DEACTIVATE = "deactivate";
        Event.RESIZE = "stageResize";
        Event.CHILD_RESIZE = "childResize";
        return Event;
    }());
    kaayou.Event = Event;
    var EventDispatcher = (function () {
        function EventDispatcher(target) {
            this.on = this.event_addListener;
            this.onece = this.event_addListenerOne;
            this.off = this.event_removeListener;
            this.offBytarger = this.event_removeListenerBytarger;
            this.emit = this.event_dispatch;
            this.dispatch = this.event_dispatch;
            this.has = this.event_hasListener;
            this._eventMap = {};
            if (target != null)
                this._target = target;
        }
        EventDispatcher.prototype.event_addListener = function (type, listener, caller, priority) {
            if (priority === void 0) { priority = 0; }
            var args = [];
            for (var _i = 4; _i < arguments.length; _i++) {
                args[_i - 4] = arguments[_i];
            }
            if (this._eventMap[type] == null)
                this._eventMap[type] = [];
            var list = this._eventMap[type];
            var len = list.length;
            var index = -1;
            var info;
            for (var i = 0; i < len; i++) {
                info = list[i];
                if (info.listener == listener && info.caller == caller)
                    return;
                if (index == -1 && info.priority < priority)
                    index = i;
            }
            info = { type: type, listener: listener, caller: caller, priority: priority, args: args, onece: false };
            if (index !== -1)
                list.splice(index, 0, info);
            else
                list.push(info);
        };
        EventDispatcher.prototype.event_addListenerOne = function (type, listener, caller, priority) {
            if (priority === void 0) { priority = 0; }
            var args = [];
            for (var _i = 4; _i < arguments.length; _i++) {
                args[_i - 4] = arguments[_i];
            }
            if (this._eventMap[type] == null)
                this._eventMap[type] = [];
            var list = this._eventMap[type];
            var len = list.length;
            var index = -1;
            var info;
            for (var i = 0; i < len; i++) {
                info = list[i];
                if (info.listener == listener && info.caller == caller)
                    return;
                if (index == -1 && info.priority < priority)
                    index = i;
            }
            info = { type: type, listener: listener, caller: caller, priority: priority, args: args, onece: true };
            if (index !== -1)
                list.splice(index, 0, info);
            else
                list.push(info);
        };
        EventDispatcher.prototype.event_removeListener = function (type, listener, caller) {
            var list = this._eventMap[type];
            if (list == null)
                return;
            var len = list.length;
            if (len == 0)
                return;
            for (var i = 0; i < len; i++) {
                var info = list[i];
                if (info.listener === listener && info.caller === caller) {
                    list.splice(i, 1);
                    break;
                }
            }
            if (list.length == 0)
                delete this._eventMap[type];
        };
        EventDispatcher.prototype.event_removeListenerBytarger = function (type, target) {
            var list = this._eventMap[type];
            if (list == null)
                return;
            var len = list.length;
            if (len == 0)
                return;
            for (var i = 0; i < len; i++) {
                var info = list[i];
                if (info.caller === target) {
                    list.splice(i, 1);
                    break;
                }
            }
            if (list.length == 0)
                delete this._eventMap[type];
        };
        EventDispatcher.prototype.event_dispatch = function (event, bubbles, recycle) {
            if (bubbles === void 0) { bubbles = false; }
            if (recycle === void 0) { recycle = true; }
            var target = (this._target != null) ? this._target : this;
            if (event.target == null)
                event.target = target;
            event.currentTarget = target;
            var list = this._eventMap[event.type];
            if (list != null) {
                var len = list.length;
                if (len > 0) {
                    list = list.concat();
                    for (var i = 0; i < len; i++) {
                        var info = list[i];
                        if (!info) {
                            continue;
                        }
                        try {
                            if (info.args.length > 0) {
                                var args = info.args.concat();
                                args.unshift(event);
                                info.listener.apply(info.caller, args);
                            }
                            else {
                                info.listener.call(info.caller, event);
                            }
                            if (info.onece) {
                                this._eventMap[event.type][i] = null;
                            }
                        }
                        catch (err) {
                            if (info.onece) {
                                this._eventMap[event.type][i] = null;
                            }
                            if (err.name) {
                                var message = err.message;
                                if (cc.sys.isNative) {
                                    if (typeof message == 'string') {
                                        if (!message) {
                                            message = "no message";
                                        }
                                    }
                                    else if (typeof message == 'object') {
                                        try {
                                            message = JSON.stringify(message, null, 2);
                                        }
                                        catch (er) {
                                            message = "err message object";
                                        }
                                    }
                                    else {
                                        message = "no message";
                                    }
                                    var stack = err.stack;
                                    if (typeof stack == 'string') {
                                        if (!stack) {
                                            stack = "no stack";
                                        }
                                    }
                                    else if (typeof stack == 'object') {
                                        try {
                                            stack = JSON.stringify(stack, null, 2);
                                        }
                                        catch (er) {
                                            stack = "err stack object";
                                        }
                                    }
                                    else {
                                        stack = "no stack";
                                    }
                                    console.error("event err :" + kaayou.getLobbyVersion(), event.type + " " + message, stack);
                                    kaayou.PlatformMgr.getInstance().sys.PostBugly("event err :" + kaayou.getLobbyVersion(), event.type + " " + message, stack);
                                }
                                else {
                                    console.error(err);
                                }
                                var options = {
                                    msg: "系统检测到异常，点击确定后自动重启！\n\n  *." + message,
                                    close: { isShow: true },
                                    btns: [
                                        {
                                            name: "确定",
                                            action: function () {
                                                if (!cc.sys.isNative) {
                                                    if (window && window.location) {
                                                        window.location.reload();
                                                    }
                                                }
                                                else {
                                                    cc.game.restart();
                                                }
                                            },
                                            colorType: 'yellow'
                                        }
                                    ]
                                };
                                var configData = common.mod.Config.GetAppConfig();
                                if (configData && configData.isDebug == 'true') {
                                    kaayou.emit('common', 'ui::Dialog::Show', options);
                                }
                            }
                        }
                        if (event.isPropagationStopped)
                            break;
                    }
                    lodash.pullAll(this._eventMap[event.type], [null]);
                }
            }
            if (bubbles && !event.isPropagationStopped
                && this._target instanceof cc.Node
                && this._target["parent"] != null) {
                this._target.parent.dispatch(event, bubbles, recycle);
            }
            else if (recycle) {
                Event.recycle(event);
            }
        };
        EventDispatcher.prototype.event_hasListener = function (type) {
            return this._eventMap[type] != null;
        };
        return EventDispatcher;
    }());
    kaayou.EventDispatcher = EventDispatcher;
    var SocketEvent = (function (_super) {
        __extends(SocketEvent, _super);
        function SocketEvent(type, data) {
            return _super.call(this, type, data) || this;
        }
        SocketEvent.CONNECT = "connect";
        SocketEvent.DATA = "data";
        SocketEvent.ERROR = "error";
        SocketEvent.CLOSE = "close";
        return SocketEvent;
    }(Event));
    kaayou.SocketEvent = SocketEvent;
    var TouchEvent = (function (_super) {
        __extends(TouchEvent, _super);
        function TouchEvent(type, data) {
            return _super.call(this, type, data) || this;
        }
        TouchEvent.TouchEnd = "TouchEnd";
        TouchEvent.TouchStart = "TouchStart";
        TouchEvent.TouchMove = "TouchMove";
        TouchEvent.TouchCance = "TouchCance";
        return TouchEvent;
    }(Event));
    kaayou.TouchEvent = TouchEvent;
    var CheckEvent = (function (_super) {
        __extends(CheckEvent, _super);
        function CheckEvent(type, data) {
            return _super.call(this, type, data) || this;
        }
        CheckEvent.SELECTED = "Selected";
        CheckEvent.UNSELECTED = "UnSelected";
        return CheckEvent;
    }(Event));
    kaayou.CheckEvent = CheckEvent;
    var RadioEvent = (function (_super) {
        __extends(RadioEvent, _super);
        function RadioEvent(type, data) {
            return _super.call(this, type, data) || this;
        }
        RadioEvent.SELECTED = "RadioSelected";
        RadioEvent.UNSELECTED = "RadioUNSelected";
        return RadioEvent;
    }(Event));
    kaayou.RadioEvent = RadioEvent;
    var CustomEvent = (function (_super) {
        __extends(CustomEvent, _super);
        function CustomEvent(type, data) {
            return _super.call(this, type, data) || this;
        }
        return CustomEvent;
    }(Event));
    kaayou.CustomEvent = CustomEvent;
})(kaayou || (kaayou = {}));
var kaayou;
(function (kaayou) {
    var ControllerManager = (function () {
        function ControllerManager() {
            this._controllers = null;
        }
        ControllerManager.getInstance = function () {
            if (ControllerManager.__INS__ == null) {
                ControllerManager.__INS__ = new ControllerManager();
                ControllerManager.__INS__.init();
            }
            return ControllerManager.__INS__;
        };
        ControllerManager.prototype.init = function () {
            this._controllers = {};
        };
        ControllerManager.prototype.has = function (name) {
            name = name.toUpperCase();
            return this._controllers[name];
        };
        ControllerManager.prototype.getController = function (name) {
            if (name === void 0) { name = "default"; }
            name = name.toUpperCase();
            if (!this.has(name)) {
                return this.install(name);
            }
            return this._controllers[name];
        };
        ControllerManager.prototype.install = function (name) {
            name = name.toUpperCase();
            if (!this.has(name)) {
                this._controllers[name] = new kaayou.EventDispatcher();
            }
            return this._controllers[name];
        };
        ControllerManager.prototype.uninstall = function (name) {
            name = name.toUpperCase();
            if (!this.has(name)) {
                this._controllers[name] = null;
            }
            delete this._controllers[name];
            return true;
        };
        ControllerManager.__INS__ = null;
        return ControllerManager;
    }());
    kaayou.ControllerManager = ControllerManager;
})(kaayou || (kaayou = {}));
var kaayou;
(function (kaayou) {
    var _global = typeof window === 'undefined' ? global : window;
    function isDevBrowser() {
        if (cc.sys.isNative) {
            return false;
        }
        if (cc.sys.os == cc.sys.OS_ANDROID && !!_global['androidpipe']) {
            return false;
        }
        else if (cc.sys.os == cc.sys.OS_IOS && !!_global['iospipe']) {
            return false;
        }
        else if (cc.sys.os == cc.sys.OS_WINDOWS && !!_global['winpipe']) {
            return false;
        }
        return true;
    }
    kaayou.isDevBrowser = isDevBrowser;
    var DataSet = (function () {
        function DataSet() {
        }
        DataSet.set = function (key, value) {
            if (kaayou.isDevBrowser()) {
                _global.sessionStorage.setItem(key, value);
            }
            else if (cc.sys.isNative) {
                if (_global.kaayou_jsb && _global.kaayou_jsb.DataSet) {
                    return _global.kaayou_jsb.DataSet.set(key, value);
                }
            }
        };
        DataSet.get = function (key) {
            if (kaayou.isDevBrowser()) {
                return _global.sessionStorage.getItem(key) || null;
            }
            else if (cc.sys.isNative) {
                if (_global.kaayou_jsb && _global.kaayou_jsb.DataSet) {
                    return _global.kaayou_jsb.DataSet.get(key);
                }
            }
        };
        return DataSet;
    }());
    kaayou.DataSet = DataSet;
    function cc_extend() {
        cc_Node_extend();
        cc_Layout_extend();
        cc_ScrollView_extend();
        cc_CheckBox_extend();
        cc_Richtext_extend();
    }
    kaayou.cc_extend = cc_extend;
    function cc_Node_extend() {
        var proto = cc.Node.prototype;
        proto.on = expend_event_addListener;
        proto.off = expend_event_removeListener;
        proto.dispatch = expend_event_dispatch;
        proto.emit = expend_event_dispatch;
        proto.has = expend_event_hasListener;
        proto.offBytarger = expend_event_offBytargerListener;
    }
    function cc_Layout_extend() {
        var proto = ccui.Layout.prototype;
        ccui.Layout.LayoutHorizontal = {
            LEFT: 0,
            RIGHT: 1
        };
        ccui.Layout.LayoutVertical = {
            TOP: 0,
            BOTTOM: 1
        };
        ccui.Layout.LayoutGrid_AxisDirection = {
            HORIZONTAL: 0,
            VERTICAL: 1
        };
        ccui.Layout.LayoutDirection = {
            Horizontal: 0,
            Vertical: 1,
            Grid: 2
        };
        proto._layoutHorizontal = ccui.Layout.LayoutHorizontal.LEFT;
        proto._layoutVertical = ccui.Layout.LayoutVertical.TOP;
        proto._layoutGridAxis = ccui.Layout.LayoutGrid_AxisDirection.HORIZONTAL;
        proto._childrenLayoutDirection = ccui.Layout.LayoutDirection.Horizontal;
        proto.setHorizontal = function (v) {
            this._layoutHorizontal = v;
        };
        proto.setVertical = function (v) {
            this._layoutVertical = v;
        };
        proto.setGrid = function (v) {
            this._layoutGridAxis = v;
        };
        proto.setChildrenLayoutDirection = function (v) {
            this._childrenLayoutDirection = v;
        };
        proto.getChildrenLayoutDirection = function () {
            return this._childrenLayoutDirection;
        };
        proto._pinterest = false;
        proto._gridrow = 0;
        proto._gridcolumn = 0;
        proto._padding = null;
        proto.setPadding = function (data) {
            this._padding = lodash.extend({
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                spacingY: 0,
                spacingX: 0
            }, this._padding, data);
        };
        proto.setGridRow = function (row) {
            if (row === void 0) { row = 0; }
            this._gridrow = row;
        };
        proto.getGridRow = function () {
            return this._gridrow;
        };
        proto.setPinterest = function (b) {
            if (b === void 0) { b = false; }
            this._pinterest = b;
        };
        proto.setGridColumn = function (column) {
            if (column === void 0) { column = 0; }
            this._gridcolumn = column;
        };
        proto.getGridColumn = function () {
            return this._gridcolumn;
        };
        proto.getPadding = function () {
            if (this._padding) {
                return this._padding;
            }
            return {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                spacingY: 0,
                spacingX: 0
            };
        };
        proto.doChildrenLayout = function () {
            if (this._childrenLayoutDirection == ccui.Layout.LayoutDirection.Horizontal) {
                this._doHorizontalChildrenLayout();
            }
            else if (this._childrenLayoutDirection == ccui.Layout.LayoutDirection.Vertical) {
                this._doVerticalChildrenLayout();
            }
            else if (this._childrenLayoutDirection == ccui.Layout.LayoutDirection.Grid) {
                this._doGridChildrenLayout();
            }
        };
        proto._doChildrenLayoutContentSize = function (c) {
            this.setContentSize(c);
        };
        proto._doChildrenCompareHeight = function (c) {
            if (c < 0) {
                return 0;
            }
            return c;
        };
        proto._doChildrenCompareWidth = function (c) {
            if (c < 0) {
                return 0;
            }
            return c;
        };
        proto._doVerticalChildrenLayout = function () {
            var vertical = this._layoutVertical;
            var children = this.getChildren();
            var offset = 0;
            var allHeight = 0;
            var padding = this.getPadding();
            var spacingY = padding.spacingY;
            var top = padding.top;
            var bottom = padding.bottom;
            offset += top;
            for (var x in children) {
                var subWidget = children[x];
                if (!(subWidget.isVisible())) {
                    continue;
                }
                allHeight += children[x].getBoundingBox().height + spacingY;
            }
            allHeight -= spacingY;
            allHeight += top + bottom;
            allHeight = this._doChildrenCompareHeight(allHeight);
            this._doChildrenLayoutContentSize(cc.size(this.getContentSize().width, allHeight));
            for (var x in children) {
                var subWidget = children[x];
                if (!(subWidget.isVisible())) {
                    continue;
                }
                var ap = subWidget.getAnchorPoint();
                var cs = subWidget.getBoundingBox();
                var finalPosY = ap.y * cs.height;
                switch (vertical) {
                    case ccui.Layout.LayoutVertical.TOP:
                        finalPosY = allHeight - offset - ((1.0 - ap.y) * cs.height);
                        break;
                    case ccui.Layout.LayoutVertical.BOTTOM:
                        finalPosY += offset;
                        break;
                    default:
                        break;
                }
                offset += cs.height + spacingY;
                subWidget.setPositionY(finalPosY);
            }
        };
        proto._doHorizontalChildrenLayout = function () {
            var horizontal = this._layoutHorizontal;
            var children = this.getChildren();
            var offset = 0;
            var allwidth = 0;
            var padding = this.getPadding();
            var spacingX = padding.spacingX;
            ;
            var left = padding.left;
            ;
            var right = padding.right;
            ;
            offset += left;
            for (var x in children) {
                var subWidget = children[x];
                if (!(subWidget.isVisible())) {
                    continue;
                }
                allwidth += children[x].getBoundingBox().width + spacingX;
            }
            allwidth -= spacingX;
            allwidth += right + left;
            allwidth = this._doChildrenCompareWidth(allwidth);
            this._doChildrenLayoutContentSize(cc.size(allwidth, this.getContentSize().height));
            for (var x in children) {
                var subWidget = children[x];
                if (!(subWidget.isVisible())) {
                    continue;
                }
                var ap = subWidget.getAnchorPoint();
                var cs = subWidget.getBoundingBox();
                var finalPosX = ap.x * cs.width;
                switch (horizontal) {
                    case ccui.Layout.LayoutHorizontal.LEFT:
                        finalPosX += offset;
                        break;
                    case ccui.Layout.LayoutHorizontal.RIGHT:
                        finalPosX = allwidth - offset - ((1.0 - ap.x) * cs.width);
                        break;
                    default:
                        break;
                }
                offset += cs.width + spacingX;
                subWidget.setPositionX(finalPosX);
            }
        };
        proto._doGridChildrenLayout = function () {
            if (!this._pinterest) {
            }
            var _grid = this._layoutGridAxis;
            if (this._gridrow == 0 && this._gridcolumn == 0) {
                return;
            }
            var maxRow = 0;
            var maxColumn = 0;
            var allcellCount = this.getChildren().length;
            if (allcellCount < 1) {
                return;
            }
            if (_grid == ccui.Layout.LayoutGrid_AxisDirection.HORIZONTAL) {
                if (this._gridcolumn < 1) {
                    return;
                }
                maxColumn = this._gridcolumn;
                maxRow = Math.ceil(allcellCount / this._gridcolumn);
            }
            else if (_grid == ccui.Layout.LayoutGrid_AxisDirection.VERTICAL) {
                if (this._gridcolumn < 1) {
                    return;
                }
                maxColumn = Math.ceil(allcellCount / this._gridcolumn);
                maxRow = this._gridrow;
            }
            if (maxColumn < 1 && maxRow < 1) {
                return;
            }
            var children = lodash.clone(this.getChildren());
            var offsetX = 0;
            var offsetY = 0;
            var allwidth = 0;
            var allHeight = 0;
            var padding = this.getPadding();
            var spacingX = padding.spacingX;
            var spacingY = padding.spacingY;
            var left = padding.left;
            var right = padding.right;
            var top = padding.top;
            var bottom = padding.bottom;
            var curRow = 0;
            var offH = 0;
            var offW = 0;
            if (_grid == ccui.Layout.LayoutGrid_AxisDirection.HORIZONTAL) {
                var ti = 0;
                for (var x in children) {
                    var subWidget = children[x];
                    var rc = children[x].getBoundingBox();
                    offH = Math.max(offH, rc.height);
                    if (!(subWidget.isVisible())) {
                        continue;
                    }
                    offW += rc.width + spacingX;
                    allwidth = Math.max(allwidth, offW);
                    ti++;
                    if ((ti % maxColumn) == 1) {
                        allHeight += offH + spacingY;
                        offH = 0;
                        offW = 0;
                    }
                }
                allwidth -= spacingX;
            }
            else if (_grid == ccui.Layout.LayoutGrid_AxisDirection.VERTICAL) {
                var ti = 0;
                for (var x in children) {
                    var subWidget = children[x];
                    var rc = children[x].getBoundingBox();
                    offW = Math.max(offW, rc.width);
                    if (!(subWidget.isVisible())) {
                        continue;
                    }
                    offH += rc.height + spacingY;
                    allHeight = Math.max(allHeight, offH);
                    if (ti++ % maxRow == maxRow - 1) {
                        allwidth += offW + spacingX;
                        offW = 0;
                        offH = 0;
                    }
                }
                allwidth += offW;
                allHeight -= spacingY;
            }
            allwidth = this._doChildrenCompareWidth(allwidth + left + right);
            allHeight = this._doChildrenCompareHeight(allHeight + top + bottom);
            this._doChildrenLayoutContentSize(cc.size(allwidth, allHeight));
            var vertical = this._layoutVertical;
            var horizontal = this._layoutHorizontal;
            offH = 0;
            offW = 0;
            if (_grid == ccui.Layout.LayoutGrid_AxisDirection.HORIZONTAL) {
                offsetX = offW = (horizontal == ccui.Layout.LayoutHorizontal.LEFT ? left : right);
                offsetY = (vertical == ccui.Layout.LayoutVertical.TOP ? top : bottom);
                var ti = 0;
                for (var x in children) {
                    var subWidget = children[x];
                    if (!(subWidget.isVisible())) {
                        continue;
                    }
                    var rc = subWidget.getBoundingBox();
                    var ap = subWidget.getAnchorPoint();
                    var finalPosX = ap.x * rc.width;
                    var finalPosY = ap.y * rc.height;
                    if (vertical == ccui.Layout.LayoutVertical.TOP) {
                        finalPosY = allHeight - offsetY - ((1.0 - ap.y) * rc.height);
                    }
                    else {
                        finalPosY = finalPosY + offsetY;
                    }
                    if (horizontal == ccui.Layout.LayoutHorizontal.LEFT) {
                        finalPosX = finalPosX + offsetX;
                    }
                    else {
                        finalPosX = allwidth - offsetX - ((1.0 - ap.x) * rc.width);
                    }
                    subWidget.setPosition(finalPosX, finalPosY);
                    offH = Math.max(offH, rc.height);
                    offW += rc.width + spacingX;
                    if (ti++ % maxColumn == maxColumn - 1) {
                        offsetY += offH + spacingY;
                        offH = 0;
                        ;
                        offW = (horizontal == ccui.Layout.LayoutHorizontal.LEFT ? left : right);
                    }
                    offsetX = offW;
                }
            }
            else if (_grid == ccui.Layout.LayoutGrid_AxisDirection.VERTICAL) {
                offsetX = (horizontal == ccui.Layout.LayoutHorizontal.LEFT ? left : right);
                offsetY = offH = (vertical == ccui.Layout.LayoutVertical.TOP ? top : bottom);
                var ti = 0;
                for (var x in children) {
                    var subWidget = children[x];
                    if (!(subWidget.isVisible())) {
                        continue;
                    }
                    var rc = children[x].getBoundingBox();
                    var ap = subWidget.getAnchorPoint();
                    var finalPosX = ap.x * rc.width;
                    var finalPosY = ap.y * rc.height;
                    if (vertical == ccui.Layout.LayoutVertical.TOP) {
                        finalPosY = allHeight - offsetY - ((1.0 - ap.y) * rc.height);
                    }
                    else {
                        finalPosY = finalPosY + offsetY;
                    }
                    if (horizontal == ccui.Layout.LayoutHorizontal.LEFT) {
                        finalPosX = finalPosX + offsetX;
                    }
                    else {
                        finalPosX = allwidth - offsetX - ((1.0 - ap.x) * rc.width);
                    }
                    subWidget.setPosition(finalPosX, finalPosY);
                    offW = Math.max(offW, rc.width);
                    offH += rc.height + spacingY;
                    if (ti++ % maxRow == maxRow - 1) {
                        offsetX += offW + spacingX;
                        offW = 0;
                        offH = (vertical == ccui.Layout.LayoutVertical.TOP ? top : bottom);
                    }
                    offsetY = offH;
                }
            }
        };
    }
    function cc_ScrollView_extend() {
        var proto = ccui.ScrollView.prototype;
        proto._doChildrenLayoutContentSize = function (c) {
            this.setInnerContainerSize(c);
        };
        proto._doChildrenCompareHeight = function (c) {
            if (c < 0) {
                c = 0;
            }
            return Math.max(c, this.getContentSize().height);
        };
        proto._doChildrenCompareWidth = function (c) {
            if (c < 0) {
                c = 0;
            }
            return Math.max(c, this.getContentSize().width);
        };
        proto.getInnerOffSetTop = function () {
            var self = this;
            var pInner = self.getInnerContainer();
            var minY = self.getLayoutSize().height - pInner.height;
            return (pInner.getPosition().y - minY);
        };
        proto.getInnerOffSetLeft = function () {
            var self = this;
            var pInner = self.getInnerContainer();
            var minY = self.getLayoutSize().width - pInner.width;
            return (pInner.getPosition().x - minY);
        };
    }
    function cc_CheckBox_extend() {
        var proto = ccui.CheckBox.prototype;
        proto.setRadioSelected = function () {
            if (this['radioGroup']) {
                this['radioGroup']['setSelected'](this);
            }
        };
    }
    function cc_Richtext_extend() {
        var proto = ccui.RichText.prototype;
        proto.property = { fontType: "Arial", fontSize: 20 };
        proto.richElements = [];
        proto.initProperty = function (data) {
            var self = this;
            self.richElements = [];
            self["lastWidth"] = 0;
            for (var x in data) {
                if (self.property[x]) {
                    self.property[x] = data[x];
                }
            }
        };
        proto.initWithDemoText = function (text) {
            var self = this;
            self.initProperty({ fontSize: text.fontSize });
            self.ignoreContentAdaptWithSize(true);
            text.getParent().addChild(self);
            self.setPosition(text.getPosition());
            self.setAnchorPoint(text.getAnchorPoint());
            text.setVisible(false);
        };
        proto.setString = function (contentArray) {
            var self = this;
            for (var i = 0; i < self.richElements.length; i++) {
                if (self.richElements[i]) {
                    self.removeElement(self.richElements[i]);
                    self.richElements.shift();
                    i--;
                }
            }
            for (var i = 0; i < contentArray.length; i++) {
                var richElement = new ccui.RichElementText(1, contentArray[i].color, 255, contentArray[i].content, self.property.fontType, self.property.fontSize);
                self.pushBackElement(richElement);
                self.richElements.push(richElement);
            }
            if (self._textHorizontalAlignment === cc.TEXT_ALIGNMENT_LEFT) {
                var difx = 0;
                if (self.anchorX === 0) {
                    difx = (self.width - self["lastWidth"]) / 2;
                }
                else if (self.anchorX === 1) {
                    difx = -(self.width - self["lastWidth"]) / 2;
                }
                self.setPositionX(self.getPositionX() - difx);
            }
            self["lastWidth"] = self.width;
        };
    }
    function expend_set_kaEventListener(p, b) {
        if (!p.__kaEventListener)
            p.__kaEventListener = new kaayou.EventDispatcher(p);
        if (b && p.parent) {
            expend_set_kaEventListener(p.parent, b);
        }
    }
    function expend_event_addListener() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length < 1) {
            return;
        }
        expend_set_kaEventListener(this, true);
        var mgsname = args[0];
        var toucheads = [kaayou.TouchEvent.TouchStart, kaayou.TouchEvent.TouchMove, kaayou.TouchEvent.TouchEnd, kaayou.TouchEvent.TouchCance];
        var checkheads = [kaayou.CheckEvent.SELECTED, kaayou.CheckEvent.UNSELECTED];
        if (toucheads.indexOf(mgsname) > -1) {
            if ((this instanceof ccui.Widget) && !this['isTouchEventInstall']) {
                this.addTouchEventListener(function (tager, type) {
                    if (type == ccui.Widget.TOUCH_ENDED) {
                        if (tager.isVisible()) {
                            var e = kaayou.Event.create(kaayou.TouchEvent, kaayou.TouchEvent.TouchEnd);
                            e.currentTarget = e.target = tager;
                            this.dispatch(e);
                            return true;
                        }
                        else {
                            var e = kaayou.Event.create(kaayou.TouchEvent, kaayou.TouchEvent.TouchCance);
                            e.currentTarget = e.target = tager;
                            this.dispatch(e);
                            return true;
                        }
                    }
                    else if (type == ccui.Widget.TOUCH_MOVED) {
                        var e = kaayou.Event.create(kaayou.TouchEvent, kaayou.TouchEvent.TouchMove);
                        e.currentTarget = e.target = tager;
                        this.dispatch(e);
                        return true;
                    }
                    else if (type == ccui.Widget.TOUCH_BEGAN) {
                        var e = kaayou.Event.create(kaayou.TouchEvent, kaayou.TouchEvent.TouchStart);
                        e.currentTarget = e.target = tager;
                        this.dispatch(e);
                        return true;
                    }
                    else if (type == ccui.Widget.TOUCH_CANCELED) {
                        var e = kaayou.Event.create(kaayou.TouchEvent, kaayou.TouchEvent.TouchCance);
                        e.currentTarget = e.target = tager;
                        this.dispatch(e);
                        return true;
                    }
                });
                this['isTouchEventInstall'] = true;
            }
        }
        else if (checkheads.indexOf(mgsname) > -1) {
            if ((this instanceof ccui.CheckBox) && !this['isCheckEventInstall']) {
                this.addEventListener(function (tager, type) {
                    var e = kaayou.Event.create(kaayou.CheckEvent, type == 0 ? kaayou.CheckEvent.SELECTED : kaayou.CheckEvent.UNSELECTED);
                    e.currentTarget = e.target = tager;
                    this.dispatch(e);
                });
                this['isCheckEventInstall'] = true;
            }
        }
        this.__kaEventListener.on.apply(this.__kaEventListener, arguments);
    }
    function expend_event_removeListener() {
        expend_set_kaEventListener(this, true);
        this.__kaEventListener.off.apply(this.__kaEventListener, arguments);
    }
    function expend_event_dispatch() {
        expend_set_kaEventListener(this, false);
        this.__kaEventListener.dispatch.apply(this.__kaEventListener, arguments);
    }
    function expend_event_emit() {
        expend_set_kaEventListener(this, false);
        return this.__kaEventListener.emit.apply(this.__kaEventListener, arguments);
    }
    function expend_event_hasListener() {
        expend_set_kaEventListener(this, true);
        return this.__kaEventListener.has.apply(this.__kaEventListener, arguments);
    }
    function expend_event_offBytargerListener() {
        expend_set_kaEventListener(this, true);
        return this.__kaEventListener.offBytarger.apply(this.__kaEventListener, arguments);
    }
    function getController(name) {
        if (name === void 0) { name = "default"; }
        if (!name || name.length < 1) {
            name = 'default';
        }
        return kaayou.ControllerManager.getInstance().getController(name);
    }
    kaayou.getController = getController;
    function uninstallController(name) {
        if (!name || name.length < 1) {
            return false;
        }
        return kaayou.ControllerManager.getInstance().uninstall(name);
    }
    kaayou.uninstallController = uninstallController;
    function emit(cname, head, data, ack, callback, target) {
        if (data === void 0) { data = null; }
        if (ack === void 0) { ack = false; }
        var e = kaayou.Event.create(kaayou.CustomEvent, head);
        if (ack) {
            if (callback) {
                var ackdata = {};
                ackdata['@original'] = data;
                ackdata['@ack'] = function (resulet) {
                    if (target) {
                        callback.apply(target, [resulet]);
                    }
                    else {
                        callback(resulet);
                    }
                };
                e.data = ackdata;
                kaayou.getController(cname).emit(e);
            }
            else {
                return new Promise(function (resole, rejct) {
                    var ackdata = {};
                    ackdata['@original'] = data;
                    ackdata['@ack'] = function (data) {
                        resole(data);
                    };
                    e.data = ackdata;
                    kaayou.getController(cname).emit(e);
                });
            }
        }
        else {
            if (data) {
                e.data = data;
                kaayou.getController(cname).emit(e);
            }
            else {
                kaayou.getController(cname).emit(e);
            }
        }
    }
    kaayou.emit = emit;
})(kaayou || (kaayou = {}));
var jsb;
(function (jsb) {
    var EventCode;
    (function (EventCode) {
        EventCode[EventCode["ERROR_NO_LOCAL_MANIFEST"] = 0] = "ERROR_NO_LOCAL_MANIFEST";
        EventCode[EventCode["ERROR_DOWNLOAD_MANIFEST"] = 1] = "ERROR_DOWNLOAD_MANIFEST";
        EventCode[EventCode["ERROR_PARSE_MANIFEST"] = 2] = "ERROR_PARSE_MANIFEST";
        EventCode[EventCode["NEW_VERSION_FOUND"] = 3] = "NEW_VERSION_FOUND";
        EventCode[EventCode["ALREADY_UP_TO_DATE"] = 4] = "ALREADY_UP_TO_DATE";
        EventCode[EventCode["UPDATE_PROGRESSION"] = 5] = "UPDATE_PROGRESSION";
        EventCode[EventCode["ASSET_UPDATED"] = 6] = "ASSET_UPDATED";
        EventCode[EventCode["ERROR_UPDATING"] = 7] = "ERROR_UPDATING";
        EventCode[EventCode["UPDATE_FINISHED"] = 8] = "UPDATE_FINISHED";
        EventCode[EventCode["UPDATE_FAILED"] = 9] = "UPDATE_FAILED";
        EventCode[EventCode["ERROR_DECOMPRESS"] = 10] = "ERROR_DECOMPRESS";
    })(EventCode = jsb.EventCode || (jsb.EventCode = {}));
    ;
})(jsb || (jsb = {}));
var kaayou;
(function (kaayou) {
    var Http = (function () {
        function Http() {
        }
        Http.GetRequest = function (search) {
            var url = search;
            var theRequest = {};
            if (url.indexOf("?") != -1) {
                var str = url.substr(1);
                var strs = str.split("&");
                for (var i = 0; i < strs.length; i++) {
                    theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
                }
            }
            return theRequest;
        };
        Http.ExtendUrlParams = function (url, data) {
            if (data === void 0) { data = null; }
            if (!data) {
                return url;
            }
            if (!lodash.isObject(data)) {
                return url;
            }
            var overParams = {};
            if (url.indexOf("?") != -1) {
                var t = url.split("?");
                var host = t[0];
                var search = "?" + t[1];
                var params = Http.GetRequest(search);
                overParams = lodash.extend(params, data);
            }
            else {
                url += "?";
                overParams = lodash.extend({}, data);
            }
            for (var x in data) {
                url += x + "=" + data[x] + "&";
            }
            url = encodeURI(url.substr(0, url.length - 1));
            return url;
        };
        Http.GET = function (url, getParams, reversibility, showError) {
            if (getParams === void 0) { getParams = null; }
            if (reversibility === void 0) { reversibility = false; }
            if (showError === void 0) { showError = true; }
            var _url = Http.ExtendUrlParams(url, getParams);
            var _errcount = 0;
            kaayou.addLog("GET:" + _url);
            return new Promise(function (resolve, reject) {
                var errFunc = function (type) {
                    kaayou.addLog("GET ERR:" + type.code);
                    kaayou.emit("common", "ui::DebugPanel::Show", { msg: type.code });
                    kaayou.emit("common", "ui::Loading::Hide", { force: true });
                    var options = {
                        title: "",
                        msg: "您的网络异常，错误码：" + type.code + "。请检查网络或联系客服。",
                        close: {
                            isShow: false,
                            action: null,
                        },
                        btns: [
                            {
                                name: "确定",
                                action: function () {
                                    kaayou.emit("common", "ui::Loading::Show", { msg: "信息加载中", time: 0 });
                                    _url = Http.doChangeChanl(_url);
                                    setTimeout(function () {
                                        if (cc.sys.isNative && kaayou && kaayou.PlatformMgr)
                                            kaayou.PlatformMgr.getInstance().sys.PostBugly("http GET err :" + kaayou.getLobbyVersion() || "", type || "", url || "");
                                        sender();
                                    }, 2);
                                }.bind(this),
                                colorType: 'green'
                            }
                        ]
                    };
                    if (reversibility === true) {
                        options.btns.push({
                            name: "取消",
                            action: function () {
                                kaayou.emit("common", "ui::Loading::Hide");
                                reject();
                            }.bind(this),
                            colorType: 'blue'
                        });
                    }
                    if (_errcount >= 5) {
                        options = Http.GetRestartOption();
                    }
                    _errcount++;
                    if (showError)
                        kaayou.emit("common", "ui::Dialog::Show", options);
                };
                try {
                    var sender = function () {
                        var xhr = new XMLHttpRequest();
                        xhr.timeout = 15000;
                        xhr.onreadystatechange = function () {
                            if (xhr.readyState == 4) {
                                if (xhr.status >= 200 && xhr.status < 400) {
                                    var response = xhr.responseText;
                                    if (response.charCodeAt(0) == 65279)
                                        response = response.substr(1);
                                    resolve(response);
                                }
                                else {
                                    if (cc.sys.isNative && kaayou && kaayou.PlatformMgr)
                                        kaayou.PlatformMgr.getInstance().sys.PostBugly("http GET err :" + kaayou.getLobbyVersion() || "", "net status：" + xhr.status, _url || "");
                                    kaayou.emit("common", "ui::DebugPanel::Show", { msg: "错误码：" + xhr.status });
                                    errFunc({ code: xhr.status });
                                }
                            }
                        };
                        xhr.onerror = function (event) {
                            errFunc({ code: "unknown" });
                        };
                        xhr.ontimeout = function () {
                            errFunc({ code: "timeout" });
                        };
                        xhr.open("GET", _url, true);
                        xhr.send();
                    };
                }
                catch (err) {
                    errFunc({ code: err });
                }
                if (kaayou['PlatformMgr']) {
                    if (kaayou['PlatformMgr'].getInstance().sys.GetNetInfo().type == "none") {
                        errFunc({ code: "disconnect" });
                        return;
                    }
                }
                sender();
            });
        };
        Http.GetFileSize = function (url) {
            var fileSize = 0;
            kaayou.addLog("Head:" + url);
            return new Promise(function (resolve, reject) {
                var errFunc = function (type) {
                    kaayou.addLog("GET ERR:" + type.code);
                    kaayou.emit("common", "ui::DebugPanel::Show", { msg: type.code });
                    kaayou.emit("common", "ui::Loading::Hide", { force: true });
                };
                var xhr = new XMLHttpRequest();
                xhr.open('HEAD', url, true);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        if (xhr.status == 200) {
                            fileSize = parseInt(xhr.getResponseHeader('Content-Length'));
                            resolve(fileSize);
                        }
                        else {
                            if (!!xhr.statusText && fileSize == 0)
                                errFunc({ code: "Error:" + xhr.status + "(" + xhr.statusText + ")" });
                        }
                    }
                };
                xhr.onerror = function (event) {
                    errFunc({ code: "error" });
                };
                xhr.ontimeout = function () {
                    errFunc({ code: "timeout" });
                };
                xhr.send();
            });
        };
        Http.checkUrl = function (method, url, call) {
            if (method === void 0) { method = "get"; }
            var xhr = new XMLHttpRequest;
            try {
                xhr.open(method, url, true);
                xhr.send();
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 2) {
                        call(xhr.status <= 400);
                        xhr.abort();
                    }
                };
            }
            catch (e) {
                call(false);
            }
        };
        Http.doChangeChanl = function (url) {
            if (url.indexOf("203.107.40.117:8004") > 0) {
                url = url.replace("203.107.40.117:8004", "apiyxdq.kaayou.com");
                if (common && common.mod && common.mod.Config && common.mod.Config.ConfigUrl) {
                    common.mod.Config.ConfigUrl = "http://apiyxdq.kaayou.com";
                }
            }
            else if (url.indexOf("apiyxdq.kaayou.com") > 0) {
                url = url.replace("apiyxdq.kaayou.com", "203.107.40.117:8004");
                if (common && common.mod && common.mod.Config && common.mod.Config.ConfigUrl) {
                    common.mod.Config.ConfigUrl = "http://203.107.40.117:8004";
                }
            }
            return url;
        };
        Http.GetRestartOption = function () {
            var options = {
                title: "",
                msg: "访问超时次数太多，将尝试重启游戏恢复！",
                close: {
                    isShow: false,
                    action: null,
                },
                btns: [
                    {
                        name: "确定",
                        action: function () {
                            kaayou.emit("common", "ui::Loading::Show", { msg: "重新启动中", time: 0 });
                            setTimeout(function () {
                                if (!cc.sys.isNative) {
                                    if (window && window.location) {
                                        window.location.reload();
                                    }
                                }
                                else {
                                    cc.game.restart();
                                }
                            }, 2);
                        }.bind(this),
                        colorType: 'green'
                    },
                    {
                        name: "取消",
                        action: null,
                        colorType: 'blue'
                    }
                ]
            };
            return options;
        };
        Http.POST = function (url, postParams, getParams, contentType, reversibility) {
            if (getParams === void 0) { getParams = null; }
            if (contentType === void 0) { contentType = "form"; }
            if (reversibility === void 0) { reversibility = false; }
            contentType = contentType || "form";
            contentType = contentType.toUpperCase();
            var TypeStrs = {
                JSON: "application/json;charset=UTF-8",
                FORM: "application/x-www-form-urlencoded"
            };
            if (!TypeStrs[contentType]) {
                throw "POST暂时不支持该类型" + contentType;
            }
            var _url = Http.ExtendUrlParams(url, getParams);
            var _errcount = 0;
            var params = "";
            if (lodash.isString(postParams)) {
                params = postParams;
            }
            else {
                if (contentType == "FORM") {
                    for (var x in postParams) {
                        params += x + "=" + postParams[x] + "&";
                    }
                    params = params.substr(0, params.length - 1);
                }
                else if (contentType == "JSON") {
                    params = JSON.stringify(postParams);
                }
            }
            kaayou.addLog("POST:" + _url);
            kaayou.addLog("POST:" + params);
            return new Promise(function (resolve, reject) {
                var errFunc = function (type) {
                    kaayou.addLog("POST ERR:" + type.code);
                    kaayou.emit("common", "ui::Loading::Hide", { force: true });
                    var options = {
                        title: "",
                        msg: "您的网络异常，请重试或检查网络！",
                        close: {
                            isShow: false,
                            action: null,
                        },
                        btns: [
                            {
                                name: "确定",
                                action: function () {
                                    kaayou.emit("common", "ui::Loading::Show", { msg: "信息加载中", time: 0 });
                                    _url = Http.doChangeChanl(_url);
                                    setTimeout(function () {
                                        if (cc.sys.isNative && kaayou && kaayou.PlatformMgr)
                                            kaayou.PlatformMgr.getInstance().sys.PostBugly("http POST err :" + kaayou.getLobbyVersion() || "", type || "", url || "");
                                        sender();
                                    }, 2);
                                }.bind(this),
                                colorType: 'green'
                            }
                        ]
                    };
                    if (reversibility === true) {
                        options.btns.push({
                            name: "取消",
                            action: function () {
                                kaayou.emit("common", "ui::Loading::Hide");
                                reject();
                            }.bind(this),
                            colorType: 'blue'
                        });
                    }
                    if (_errcount >= 5) {
                        options = Http.GetRestartOption();
                    }
                    _errcount++;
                    kaayou.emit("common", "ui::Dialog::Show", options);
                };
                var sender = function () {
                    try {
                        var xhr = new XMLHttpRequest();
                        xhr.open("POST", _url);
                        xhr.setRequestHeader("Content-Type", TypeStrs[contentType]);
                        xhr.timeout = 15000;
                        xhr.onreadystatechange = function () {
                            if (xhr.readyState == 4) {
                                if (xhr.status >= 200 && xhr.status < 400) {
                                    var response = xhr.responseText;
                                    if (response.charCodeAt(0) == 65279)
                                        response = response.substr(1);
                                    resolve(response);
                                }
                                else {
                                    if (cc.sys.isNative && kaayou && kaayou.PlatformMgr)
                                        kaayou.PlatformMgr.getInstance().sys.PostBugly("http GET err :" + kaayou.getLobbyVersion() || "", "net status：" + xhr.status, _url || "");
                                    errFunc({ code: xhr.status });
                                    kaayou.emit("common", "ui::DebugPanel::Show", { msg: "错误码：" + xhr.status });
                                    kaayou.emit("common", "ui::Loading::Hide", { force: true });
                                }
                            }
                        };
                        xhr.onerror = function (event) {
                            kaayou.emit("lobby", "ui::LoginScene::ShowSwitchLine");
                            errFunc({ code: "unknown" });
                        };
                        xhr.ontimeout = function () {
                            kaayou.emit("common", "ui::DebugPanel::Show", { msg: "超时！" });
                            errFunc({ code: "timeout" });
                        };
                        xhr.send(params);
                    }
                    catch (err) {
                        errFunc({ code: err });
                        kaayou.emit("lobby", "ui::LoginScene::ShowSwitchLine");
                    }
                };
                if (kaayou['PlatformMgr']) {
                    var type = kaayou['PlatformMgr'].getInstance().sys.GetNetInfo().type;
                    if (type == "none") {
                        kaayou.emit("common", "ui::DebugPanel::Show", { msg: "网络中断" });
                        errFunc({ code: "disconnect" });
                        return;
                    }
                }
                sender();
            });
        };
        Http.parseResult = function (data) {
            try {
                var res = JSON.parse(data);
                if (typeof res != 'object') {
                    throw Error('message is not object');
                }
                var msghead = res.head;
                if (!msghead) {
                    throw Error('msghead is undefine');
                }
                if (res.msgsign.encode == 1) {
                    res.data = kaayou.AES.decrypt(res.data);
                }
                if (res.errcode == 0) {
                    if (res.data) {
                        res.data = JSON.parse(res.data);
                    }
                }
                return res;
            }
            catch (err) {
                console.error(err);
                return null;
            }
        };
        return Http;
    }());
    kaayou.Http = Http;
})(kaayou || (kaayou = {}));
var kaayou;
(function (kaayou) {
    var ccclass = kaayou._decorator.ccclass;
    var DirectScene = (function (_super) {
        __extends(DirectScene, _super);
        function DirectScene() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        DirectScene.prototype.ctor = function () {
            _super.prototype.ctor.call(this);
        };
        DirectScene = __decorate([
            ccclass
        ], DirectScene);
        return DirectScene;
    }(cc.Scene));
    kaayou.DirectScene = DirectScene;
    var MainScene = (function (_super) {
        __extends(MainScene, _super);
        function MainScene() {
            var _this = _super.call(this) || this;
            _this._sceneLayer = null;
            _this._sceneLayer = new cc.Layer();
            _this._sceneLayer.setContentSize(cc.winSize);
            _this._sceneLayer.setAnchorPoint(0, 0);
            _this._sceneLayer.setPosition(0, 0);
            _this.addChild(_this._sceneLayer, 0);
            return _this;
        }
        MainScene.prototype.getSceneLayer = function () {
            return this._sceneLayer;
        };
        return MainScene;
    }(DirectScene));
    kaayou.MainScene = MainScene;
})(kaayou || (kaayou = {}));
var kaayou;
(function (kaayou) {
    function addLog(msg) {
        console.log(msg);
        var t = new Date(Date.now()).format("yyyy-MM-dd hh:mm:ss");
        if (!cc.sys.isNative) {
            return;
        }
        var file = kaayou.getLogFile();
        var s = kaayou.getLog();
        s += (t + ":" + msg) + "\r\n";
        if (s.length > 10240) {
            s = s.substr(s.length - 1024, 1024);
        }
        kaayou.DataSet.set("CheckLog", s);
        jsb.fileUtils.writeStringToFile(s, file);
    }
    kaayou.addLog = addLog;
    function copyAndUnzipLocalPackage(DirPath, srcPath, decPath, call, progressCall) {
        jsb.fileUtils.createDirectory(DirPath);
        if (!kaayou_jsb.File.copyFile(srcPath, decPath)) {
            return call("复制zip包失败");
        }
        if (!jsb.fileUtils.isFileExist(decPath)) {
            return call("复制zip包失败");
        }
        console.log("decSize:" + jsb.fileUtils.getFileSize(decPath));
        console.log("下载压缩包完成");
        var kzip = new kaayou_jsb.File.ZIP();
        console.log("开始异步解压");
        progressCall && progressCall(2, 0, 0, 0);
        kzip.onError = function (errstr) {
            console.log("解压失败", errstr);
            return call("解压zip包失败");
        };
        kzip.onProgress = function (curpro, toatl, cur) {
            progressCall && progressCall(3, curpro, toatl, cur);
        };
        kzip.onSuccess = function (curpro, toatl, cur) {
            console.log("解压成功");
            progressCall(4, 100, 0, 0);
            setTimeout(function () {
                jsb.fileUtils.removeFile(decPath);
                call();
            }, 100);
        };
        kzip.unzip(decPath, true);
    }
    function getImageCachePath() {
        return jsb.fileUtils.getWritablePath() + "cache-images/";
    }
    kaayou.getImageCachePath = getImageCachePath;
    function getLog() {
        if (!cc.sys.isNative) {
            return "";
        }
        var s = kaayou.DataSet.get("CheckLog");
        if (!!s) {
            return s;
        }
        var file = kaayou.getLogFile();
        if (jsb.fileUtils.isFileExist(file)) {
            return jsb.fileUtils.getStringFromFile(file);
        }
        else {
            return "";
        }
    }
    kaayou.getLog = getLog;
    function getLogFile() {
        if (!cc.sys.isNative) {
            return "";
        }
        var logPath = kaayou.getLogPath();
        if (!jsb.fileUtils.isDirectoryExist(logPath)) {
            jsb.fileUtils.createDirectory(logPath);
        }
        return logPath + "log.txt";
    }
    kaayou.getLogFile = getLogFile;
    function getLogPath() {
        if (!cc.sys.isNative) {
            return "";
        }
        return jsb.fileUtils.getWritablePath() + "logs/";
    }
    kaayou.getLogPath = getLogPath;
    function getRemotePath() {
        return jsb.fileUtils.getWritablePath() + "remote-assets/";
    }
    kaayou.getRemotePath = getRemotePath;
    function getLobbyVersion() {
        if (!cc.sys.isNative) {
            return App.version;
        }
        return getLocalVersion(kaayou.getRemotePath());
    }
    kaayou.getLobbyVersion = getLobbyVersion;
    function getSubGameVersion(pakegeName) {
        if (cc.sys.isNative) {
            var gamePath = kaayou.getRemotePath() + pakegeName + "/";
            return getLocalVersion(gamePath);
        }
        else
            return "web";
    }
    kaayou.getSubGameVersion = getSubGameVersion;
    function getLocalVersion(gamePath) {
        try {
            if (!cc.sys.isNative) {
                return "web";
            }
            else {
                if (!jsb.fileUtils.isDirectoryExist(gamePath)) {
                    throw "";
                }
                if (gamePath[gamePath.length - 1] !== '/') {
                    gamePath += '/';
                }
                var projectPath = gamePath + "project.manifest";
                if (jsb.fileUtils.isFileExist(projectPath)) {
                    var str = jsb.fileUtils.getStringFromFile(projectPath);
                    if (!str) {
                        throw "";
                    }
                    if (!lodash.isString(str)) {
                        throw "";
                    }
                    if (lodash.isEmpty(str)) {
                        throw "";
                    }
                    var m = JSON.parse(str);
                    if (!m) {
                        throw "";
                    }
                    if (!m.version) {
                        throw "";
                    }
                    if (!lodash.isString(m.version)) {
                        throw "";
                    }
                    if (lodash.isEmpty(m.version)) {
                        throw "";
                    }
                    return m.version;
                }
                throw "";
            }
        }
        catch (e) {
            return "nosearch";
        }
    }
    function getLoaclAssetsPath() {
        if (!cc.sys.isNative) {
            return '';
        }
        if (cc.sys.os == cc.sys.OS_ANDROID) {
            return "assets/";
        }
        else {
            return '';
        }
    }
    function sendLog() {
        if (!cc.sys.isNative) {
            return;
        }
        var s = kaayou.getLog();
        kaayou.PlatformMgr.getInstance().sys.PostBugly("CheckLog" + kaayou.getLobbyVersion(), "CheckLog", s);
    }
    kaayou.sendLog = sendLog;
    function unZipAssetsPath(call, progressCall) {
        if (!cc.sys.isNative) {
            return call();
        }
        if (!kaayou_jsb) {
            return call("无法获取资源");
        }
        if (!kaayou_jsb.File) {
            return call("无法获取资源");
        }
        if (jsb.fileUtils.isDirectoryExist(getRemotePath())) {
            return call();
        }
        var zipName = 'GameLobby.zip';
        var zipPath = jsb.fileUtils.fullPathForFilename(getLoaclAssetsPath() + zipName);
        var tempPath = jsb.fileUtils.getWritablePath() + "remote-assets-temp/";
        var tempzipPath = tempPath + zipName;
        if (!(zipPath && zipPath != '')) {
            return call("无法获取资源");
        }
        progressCall && progressCall(1, 0, 0, 0);
        if (jsb.fileUtils.isDirectoryExist(tempPath)) {
            jsb.fileUtils.removeDirectory(tempPath);
        }
        console.log("解压到临时目录:" + tempPath);
        copyAndUnzipLocalPackage(tempPath, zipPath, tempzipPath, function (err) {
            if (err) {
                return call(err);
            }
            jsb.fileUtils.renameFile(jsb.fileUtils.getWritablePath(), "remote-assets-temp", "remote-assets");
            console.log("重命名:remote-assets-temp -> remote-assets");
            return call();
        }, progressCall);
    }
    kaayou.unZipAssetsPath = unZipAssetsPath;
    function ExistModule(modeulename) {
        var remoteSeachPathRoot = kaayou.getRemotePath();
        var moduleSearchPath = "" + remoteSeachPathRoot + modeulename;
        if (!jsb.fileUtils.isDirectoryExist(moduleSearchPath)) {
            return null;
        }
        var hotProjectFilePath = "";
        if (modeulename == 'common' || modeulename == 'lobby') {
        }
        else {
            hotProjectFilePath = moduleSearchPath + "/project.manifest";
            if (!jsb.fileUtils.isFileExist(hotProjectFilePath)) {
                return null;
            }
        }
        var moduleSrcPath = moduleSearchPath + "/src/" + modeulename;
        if (!jsb.fileUtils.isDirectoryExist(moduleSrcPath)) {
            return null;
        }
        var moduleFilePath = moduleSrcPath + "/" + modeulename + ".module.js";
        if (!jsb.fileUtils.isFileExist(moduleFilePath)) {
            return null;
        }
        var relativeFilePath = "src/" + modeulename + "/" + modeulename + ".module.js";
        return {
            name: modeulename,
            project: hotProjectFilePath,
            search: moduleSearchPath,
            full: moduleFilePath,
            relative: relativeFilePath
        };
    }
    kaayou.ExistModule = ExistModule;
    function getLocalModules() {
        var remoteSeachPathRoot = kaayou.getRemotePath();
        var filelist = jsb.fileUtils.listFiles(remoteSeachPathRoot);
        var dirlist = [];
        for (var x in filelist) {
            if (jsb.fileUtils.isDirectoryExist(filelist[x])) {
                dirlist.push(filelist[x]);
            }
        }
        var gamemodulelistPath = [];
        dirlist.forEach(function (f) {
            var element = f.replace(remoteSeachPathRoot, '');
            element = element.replace(/(\\)?(\/)/g, '');
            if (element.length > 0 && element != '.' && element != '..') {
                var item = ExistModule(element);
                if (item) {
                    console.log("可能需加载的模块:::  ", item.name, item.search, item.full, item.relative);
                    gamemodulelistPath.push(item);
                }
            }
        });
        return gamemodulelistPath;
    }
    kaayou.getLocalModules = getLocalModules;
})(kaayou || (kaayou = {}));
var kaayou;
(function (kaayou) {
    var ccclass = kaayou._decorator.ccclass;
    var ImageView = (function (_super) {
        __extends(ImageView, _super);
        function ImageView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ImageView.prototype.ctor = function () {
            _super.prototype.ctor.call(this);
        };
        ImageView = __decorate([
            ccclass
        ], ImageView);
        return ImageView;
    }(ccui.ImageView));
    kaayou.ImageView = ImageView;
})(kaayou || (kaayou = {}));
var kaayou;
(function (kaayou) {
    var ccclass = kaayou._decorator.ccclass;
    var Layer = (function (_super) {
        __extends(Layer, _super);
        function Layer() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._moduleName = "";
            _this.node = null;
            return _this;
        }
        Layer.prototype.ctor = function () {
            _super.prototype.ctor.call(this);
        };
        Layer.prototype.getModuleName = function () {
            return this._moduleName;
        };
        Layer.prototype.initWithccs = function (path, full) {
            if (full === void 0) { full = true; }
            var fullSize = null;
            if (full) {
                fullSize = cc.size(cc.winSize.width, cc.winSize.height);
            }
            else {
                fullSize = cc.size(cc.winSizeCustom.width, cc.winSizeCustom.height);
            }
            this.setContentSize(fullSize);
            this.setPosition((cc.winSize.width - fullSize.width) / 2, (cc.winSize.height - fullSize.height) / 2);
            this.node = ccs.load(path, "res/").node;
            this.node.setContentSize(fullSize);
            this.node.setAnchorPoint(0.5, 0.5);
            this.node.setPosition(fullSize.width / 2, fullSize.height / 2);
            this.addChild(this.node);
            ccui.helper.doLayout(this);
        };
        Layer.prototype.setModuleName = function (moduleName) {
            if (moduleName === void 0) { moduleName = ""; }
            this._moduleName = moduleName;
        };
        Layer = __decorate([
            ccclass
        ], Layer);
        return Layer;
    }(cc.Layer));
    kaayou.Layer = Layer;
    var Block = (function (_super) {
        __extends(Block, _super);
        function Block() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.node = null;
            _this._moduleName = "";
            return _this;
        }
        Block.prototype.ctor = function () {
            _super.prototype.ctor.call(this);
        };
        Block.prototype.setModuleName = function (moduleName) {
            if (moduleName === void 0) { moduleName = ""; }
            this._moduleName = moduleName;
        };
        Block.prototype.getModuleName = function () {
            return this._moduleName;
        };
        Block.prototype.initWithccs = function (path) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            this.node = ccs.load(path, "res/").node;
            this.node.setVisible(true);
            ccui.helper.doLayout(this.node);
            this.addChild(this.node);
            this.setContentSize(this.node.getContentSize());
            this.setAnchorPoint(this.node.getAnchorPoint());
            this.setScaleX(this.node.getScaleX());
            this.setScaleY(this.node.getScaleY());
            this.setPosition(this.node.getPosition());
            this.node.setAnchorPoint(0.5, 0.5);
            this.node.setScaleX(1);
            this.node.setScaleY(1);
            this.node.setPosition(this.getContentSize().width / 2, this.getContentSize().height / 2);
        };
        Block.prototype.initWithNode = function (node) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            this.node = node.clone();
            this.node.setVisible(true);
            ccui.helper.doLayout(this.node);
            this.addChild(this.node);
            this.setContentSize(this.node.getContentSize());
            this.setAnchorPoint(this.node.getAnchorPoint());
            this.setScaleX(this.node.getScaleX());
            this.setScaleY(this.node.getScaleY());
            this.setPosition(this.node.getPosition());
            this.node.setAnchorPoint(0.5, 0.5);
            this.node.setScaleX(1);
            this.node.setScaleY(1);
            this.node.setPosition(this.getContentSize().width / 2, this.getContentSize().height / 2);
        };
        Block.prototype.initWithNodeAndCleanup = function (node) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            this.initWithNode(node);
            node.removeFromParentAndCleanup(true);
        };
        Block.prototype.initWithNodeNoClone = function (node) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            this.node = node;
            this.node.setVisible(true);
            ccui.helper.doLayout(this.node);
            node.removeFromParent();
            this.addChild(this.node);
            this.setContentSize(this.node.getContentSize());
            this.setAnchorPoint(this.node.getAnchorPoint());
            this.setScaleX(this.node.getScaleX());
            this.setScaleY(this.node.getScaleY());
            this.setPosition(this.node.getPosition());
            this.node.setAnchorPoint(0.5, 0.5);
            this.node.setScaleX(1);
            this.node.setScaleY(1);
            this.node.setPosition(this.getContentSize().width / 2, this.getContentSize().height / 2);
        };
        Block = __decorate([
            ccclass
        ], Block);
        return Block;
    }(ccui.Layout));
    kaayou.Block = Block;
    var ModelLayer = (function (_super) {
        __extends(ModelLayer, _super);
        function ModelLayer() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.node = null;
            _this.maskBg = null;
            _this.isTouchMaskHide = true;
            return _this;
        }
        ModelLayer.prototype.ctor = function () {
            _super.prototype.ctor.call(this);
        };
        ModelLayer.prototype.initWithccs = function (path, full) {
            if (full === void 0) { full = true; }
            _super.prototype.initWithccs.call(this, path, full);
            var self = this;
            this.maskBg = ccui.helper.seekWidgetByName(this.node, "maskbg");
            if (this.maskBg) {
                this.maskBg.on(kaayou.TouchEvent.TouchEnd, function () {
                    if (self.isTouchMaskHide) {
                        self.Hide();
                    }
                }, this);
            }
        };
        ModelLayer.prototype.Hide = function () {
            this.setVisible(false);
        };
        return ModelLayer;
    }(Layer));
    kaayou.ModelLayer = ModelLayer;
    var LayerSeq = (function () {
        function LayerSeq() {
            this.layerSeq = [];
        }
        LayerSeq.getInstance = function () {
            if (LayerSeq.__INS__ == null) {
                LayerSeq.__INS__ = new LayerSeq();
            }
            return LayerSeq.__INS__;
        };
        LayerSeq.prototype.addLayerSeq = function (layerName) {
            this.layerSeq.push(layerName);
        };
        LayerSeq.prototype.closeTopLayer = function () {
            this.layerSeq.splice(0, 1);
            var layerName = this.layerSeq[0];
            if (!!layerName)
                kaayou.emit("common", "ui::Layer::Show", layerName);
        };
        LayerSeq.prototype.getTopLayer = function () {
            return this.layerSeq[0];
        };
        LayerSeq.__INS__ = null;
        return LayerSeq;
    }());
    kaayou.LayerSeq = LayerSeq;
})(kaayou || (kaayou = {}));
var kaayou;
(function (kaayou) {
    var mod;
    (function (mod) {
        var Base = (function () {
            function Base() {
                this._moduleName = "";
            }
            Base.prototype.setModuleName = function (moduleName) {
                this._moduleName = moduleName;
            };
            Base.prototype.getModuleName = function () {
                return this._moduleName;
            };
            return Base;
        }());
        mod.Base = Base;
    })(mod = kaayou.mod || (kaayou.mod = {}));
})(kaayou || (kaayou = {}));
var kaayou;
(function (kaayou) {
    var _a = kaayou._decorator, doBindEvent = _a.doBindEvent, BindEvent = _a.BindEvent, CustomBindEvetn = _a.CustomBindEvetn;
    var kaWebSocket = (function () {
        function kaWebSocket(name) {
            this.ws = null;
            this.name = "";
            this._conConfig = null;
            this._resUrl = "";
            this._isInitiative = false;
            this._isConnected = false;
            this.__t = null;
            this.__delayT = 0;
            this.__lastMsgTime = 0;
            this._isDoClose = false;
            this.name = name;
        }
        kaWebSocket.prototype.doReconnect = function () {
            if (this.name != "lobby") {
                kaayou.emit(this.name, "ws::Msg::ping", { wsname: this.name, ms: 460 });
            }
            if (lodash.isEmpty(this._resUrl)) {
                return;
            }
            this.connect(this._resUrl);
        };
        kaWebSocket.prototype.getconConfig = function () {
            return this._conConfig;
        };
        kaWebSocket.prototype.doConnect = function (data) {
            this._conConfig = lodash.clone(data);
            var resUrl = "ws://" + data.ip + ":" + data.port + "/" + (data.path || "");
            this.connect(resUrl);
        };
        kaWebSocket.prototype.getIsConnected = function () {
            return this._isConnected;
        };
        kaWebSocket.prototype.connect = function (resUrl) {
            this._isInitiative = false;
            this._isDoClose = false;
            this.__lastMsgTime = Date.unix();
            this._isConnected = true;
            this._resUrl = resUrl;
            if (this.ws) {
                return;
            }
            try {
                console.log(this.name + "socket 开始链接  " + resUrl);
                this.ws = new WebSocket(resUrl);
                this.ws.binaryType = 'arraybuffer';
                this.ws.onopen = this.__onOpen.bind(this);
                this.ws.onmessage = this.__onmessage.bind(this);
                this.ws.onclose = this.__onclose.bind(this);
                this.ws.onerror = this.__onError.bind(this);
            }
            catch (err) {
                kaayou.emit(this.name, "ws::onError", { name: this.name, err: err });
            }
        };
        kaWebSocket.prototype.__onError = function (err, a) {
            kaayou.emit(this.name, "ws::onError", { name: this.name, err: err });
            if (this.name != "lobby") {
                kaayou.emit(this.name, "ws::Msg::ping", { wsname: this.name, ms: 460 });
            }
        };
        kaWebSocket.prototype.__onOpen = function () {
            console.log(this.name + "socket 链接成功");
            kaayou.emit(this.name, "ws::onConnect", { name: this.name });
            this.__doPing();
        };
        kaWebSocket.prototype.__doPing = function () {
            var self = this;
            if (!this.isOpend()) {
                console.log("退出ping");
                return;
            }
            ;
            this.send({ msghead: "ping" });
            if (!this.isOpend()) {
                console.log("退出ping");
                return;
            }
            this.__delayT = new Date().getTime() / 1000;
            var pingTime = 0;
            pingTime = !!(this.name == "lobby") ? 7000 : 5000;
            this.__t = setTimeout(function () {
                self.__doPing.apply(self);
            }, pingTime);
        };
        kaWebSocket.prototype.__clearT = function () {
            if (this.__t) {
                try {
                    clearTimeout(this.__t);
                    if (this.name != "lobby") {
                        kaayou.emit(this.name, "ws::Msg::ping", { wsname: this.name, ms: 460 });
                    }
                    this.__t = null;
                }
                catch (e) { }
            }
            this.__t = null;
        };
        kaWebSocket.prototype.getLastTime = function () {
            return this.__lastMsgTime;
        };
        kaWebSocket.prototype.__onmessage = function (e) {
            var unit8Arr = new Uint8Array(e.data);
            var t = new Date().getTime() / 1000;
            var encodedString;
            if (cc.sys.isNative)
                encodedString = String.fromCharCode.apply(null, unit8Arr);
            else
                encodedString = bigUnit8ToChar(unit8Arr);
            var pdata = decodeURIComponent(escape((encodedString)));
            kaayou.emit(this.name, "ws::onMessage", pdata);
            try {
                var res = JSON.parse(pdata);
                if (typeof res != 'object') {
                    console.error("Ka_MSG_RES", pdata);
                    throw Error('message is not object');
                }
                var msghead = res.head;
                if (!msghead) {
                    console.error("Ka_MSG_RES", pdata);
                    throw Error('msghead is undefine');
                }
                if ("ping" !== msghead) {
                    console.log("sendMessage:接受" + this.name, msghead, res);
                }
                else {
                }
                this.__lastMsgTime = Date.unix();
                if (msghead == 'forceclose') {
                    cc.log('强制解散');
                    this._isInitiative = true;
                    return;
                }
                var sign = res["msgsign"];
                if (sign.encode == 1) {
                    res.data = kaayou.AES.decrypt(res.data);
                }
                if (res.errcode) {
                    console.error(res);
                    kaayou.emit(this.name, "ws::Msg::" + msghead, { errcode: res.errcode, msg: res.data });
                    return;
                }
                var msgdata = null;
                if (res.data && lodash.isString(res.data) && res.data != 'null') {
                    msgdata = JSON.parse(res.data);
                }
                else {
                    msgdata = {};
                }
                kaayou.DataSet.set('time:offfset::time', (res.msgsign.time - t).toString());
                if (msghead == "ping") {
                    msgdata = { wsname: this.name, ms: Math.ceil((t - this.__delayT) * 1000) };
                }
                kaayou.emit(this.name, "ws::Msg::" + msghead, msgdata);
            }
            catch (err) {
                console.error("Ka_MSG_RES_err", pdata);
                console.error(err);
                if (this.name != "lobby") {
                    kaayou.emit(this.name, "ws::Msg::ping", { wsname: this.name, ms: 460 });
                }
            }
            function bigUnit8ToChar(array) {
                var res = '';
                var chunk = 4 * 3 * 1024;
                var i;
                for (i = 0; i < array.length / chunk; i++) {
                    res += String.fromCharCode.apply(null, array.slice(i * chunk, (i + 1) * chunk));
                }
                res += String.fromCharCode.apply(null, array.slice(i * chunk));
                return res;
            }
        };
        kaWebSocket.prototype.isOpend = function () {
            if (!this.ws) {
                return false;
            }
            if (this._isDoClose) {
                return false;
            }
            return this.ws.readyState == WebSocket.OPEN;
        };
        kaWebSocket.prototype.getInitiative = function () {
            return this._isInitiative;
        };
        kaWebSocket.prototype.checkLife = function () {
            if (!this.ws) {
                return false;
            }
            if (this._isDoClose) {
                return false;
            }
            return this.ws.readyState == WebSocket.OPEN || this.ws.readyState == WebSocket.CONNECTING;
        };
        kaWebSocket.prototype.__onclose = function (e) {
            cc.log(e);
            this.__clearT();
            console.log("socket已断开：" + this.name, JSON.stringify(e));
            kaayou.emit(this.name, "ws::onClose", this._isInitiative ? { name: this.name, code: 1000 } : { name: this.name, code: 2000 });
            this.ws = null;
            this._isDoClose = true;
        };
        kaWebSocket.prototype.close = function (data) {
            this.__clearT();
            if (!this.ws) {
                return;
            }
            if (data) {
                this._isInitiative = !!data.Initiative;
            }
            else {
                this._isInitiative = false;
            }
            if (this._isInitiative) {
                this._isConnected = false;
            }
            this._isDoClose = true;
            this.ws.onopen = function () { };
            this.ws.onmessage = function () { };
            this.ws.onclose = function () { };
            this.ws.onerror = function () { };
            this.ws.close();
            this.ws = null;
            console.log("close socket:" + this.name, this._isInitiative);
            kaayou.emit(this.name, "ws::onClose", this._isInitiative ? { name: this.name, code: 1000 } : { name: this.name, code: 2000 });
        };
        kaWebSocket.prototype.send = function (data) {
            if (!this.isOpend()) {
                console.log("the " + this.name + " socket is closed can not send message");
                return;
            }
            if (!data) {
                console.error("message is undefine");
                return;
            }
            if (!data.msghead) {
                console.error("msghead is undefine");
                return;
            }
            if (data.msgdata) {
                console.log("socket发送的数据", data.msgdata);
            }
            try {
                var toData = {
                    head: data.msghead
                };
                if (data.msgdata) {
                    toData.data = JSON.stringify(data.msgdata);
                }
                toData.data = kaayou.AES.encrypt(toData.data);
                toData["msgsign"] = {
                    "time": new Date().getTime(),
                    "encode": 1
                };
                if ("ping" == toData.head) {
                }
                else {
                    console.log("sendMessage:发送" + this.name, toData, JSON.stringify(toData));
                }
                this.ws.send(JSON.stringify(toData));
            }
            catch (err) {
            }
        };
        return kaWebSocket;
    }());
    kaayou.kaWebSocket = kaWebSocket;
})(kaayou || (kaayou = {}));
var kaayou;
(function (kaayou) {
    var NetManager = (function () {
        function NetManager() {
            this._eventPool = null;
            this.__watchTime = 0;
            this._needReConnectSockets = null;
            this._maxReConnectCount = 20;
            this._reConConfig = {};
            this.runingSockets = {};
        }
        NetManager.getInstance = function () {
            if (NetManager.__INS__ == null) {
                NetManager.__INS__ = new NetManager();
                NetManager.__INS__.init();
            }
            return NetManager.__INS__;
        };
        NetManager.prototype.ctor = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
        };
        NetManager.prototype.description = function () {
            return "NetManager";
        };
        NetManager.prototype.init = function () {
            this._eventPool = [];
            this.runingSockets = {};
            this._needReConnectSockets = {};
            cc.director.getScheduler().scheduleUpdateForTarget(this, cc.Scheduler.PRIORITY_NON_SYSTEM, false);
        };
        NetManager.prototype.update = function (dt) {
            this.__watchTime += dt;
            this.doPool();
            if (this.__watchTime < 0.3) {
                return;
            }
            this.__watchTime = 0;
            this.isDisconnect();
            this.checkReConnect();
        };
        NetManager.prototype.checkReConnect = function () {
            for (var x in this._needReConnectSockets) {
                var t = Date.unix();
                if (t - this._needReConnectSockets[x].delaytime > 1) {
                    this._needReConnectSockets[x].delaytime = t;
                    this.doReConnect(x);
                    if (x != "lobby") {
                        kaayou.emit(x, "ws::Msg::ping", { wsname: x, ms: 460 });
                    }
                }
            }
        };
        NetManager.prototype.doReConnect = function (name) {
            var self = this;
            var options = {
                title: "",
                msg: "您的网络已断开，请重试！",
                close: {
                    isShow: false,
                    action: null,
                },
                ismutual: true,
                mutualkey: "socketreconnct",
                btns: [
                    {
                        name: "重试",
                        action: function () {
                            if (self._reConConfig[name]) {
                                self.getSocket(name).doConnect(self._reConConfig[name]);
                                var optionsT_1 = {
                                    msg: "您的网络不稳定，正在尝试重新连接服务器 ",
                                    time: 30
                                };
                                kaayou.emit('common', 'ui::Loading::Show', optionsT_1);
                            }
                            return;
                        }.bind(this),
                        colorType: 'green'
                    }
                ]
            };
            this._reConConfig[name] = null;
            if (this._needReConnectSockets[name].count >= this._maxReConnectCount) {
                this._reConConfig[name] = this.runingSockets[name].getconConfig();
                NetManager.getInstance().deleteSocket(name);
                this._needReConnectSockets[name] = null;
                delete this._needReConnectSockets[name];
                kaayou.emit('common', "ui::Dialog::Show", options);
                return;
            }
            ++this._needReConnectSockets[name].count;
            var optionsT = {
                msg: "您的网络不稳定，正在尝试重新连接服务器 ",
                time: 5
            };
            kaayou.emit('common', 'ui::Loading::Show', optionsT);
            if (!this.runingSockets[name]) {
                this._needReConnectSockets[name] = null;
                delete this._needReConnectSockets[name];
                return;
            }
            this.runingSockets[name].doReconnect();
        };
        NetManager.prototype.cleanNeedConnect = function (name) {
            this._needReConnectSockets[name];
        };
        NetManager.prototype.onWsConnectEvent = function (event) {
            var data = event.data;
            if (!data) {
                return;
            }
            this._eventPool.push({ name: data.name, type: 1, ext: null });
        };
        NetManager.prototype.onWsCloseEvent = function (event) {
            var data = event.data;
            if (!data) {
                return;
            }
            if (!lodash.isEmpty(data.name) && data.code) {
                this._eventPool.push({ name: data.name, type: 2, ext: data.code });
            }
        };
        NetManager.prototype.doPool = function () {
            if (this._eventPool.length > 0) {
                var n = this._eventPool.length;
                while (n > 0) {
                    var e = this._eventPool.shift();
                    n = this._eventPool.length;
                    if (!e) {
                        continue;
                    }
                    if (1 == e.type) {
                        this._needReConnectSockets[e.name] = null;
                        delete this._needReConnectSockets[e.name];
                    }
                    else if (2 == e.type) {
                        if (e.ext != 1000) {
                            console.error(e.name + "意外断开");
                            if (!this._needReConnectSockets[e.name]) {
                                this._needReConnectSockets[e.name] = {
                                    delaytime: Date.unix(),
                                    count: 0
                                };
                            }
                        }
                    }
                }
            }
        };
        NetManager.prototype.isDisconnect = function () {
            for (var x in this.runingSockets) {
                var s = this.runingSockets[x];
                if (!s) {
                    break;
                }
                if (true == s.getIsConnected() && false == s.getInitiative()) {
                    if (Date.unix() - s.getLastTime() > 15) {
                        s.close({ Initiative: false });
                    }
                }
            }
        };
        NetManager.prototype.getSocket = function (name) {
            if (!this.runingSockets[name]) {
                this.runingSockets[name] = new kaayou.kaWebSocket(name);
                kaayou.getController(name).on("ws::onClose", this.onWsCloseEvent, this);
                kaayou.getController(name).on("ws::onConnect", this.onWsConnectEvent, this);
            }
            return this.runingSockets[name];
        };
        NetManager.prototype.deleteAllSocket = function () {
            var keys = Object.keys(this.runingSockets);
            for (var x in keys) {
                this.deleteSocket(keys[x]);
            }
        };
        NetManager.prototype.deleteSocket = function (name) {
            if (!this.runingSockets[name]) {
                return;
            }
            this.runingSockets[name].close({ Initiative: true });
            kaayou.getController(name).offBytarger("ws::onClose", this);
            kaayou.getController(name).offBytarger("ws::onConnect", this);
            delete this.runingSockets[name];
            if (this._needReConnectSockets[name]) {
                delete this._needReConnectSockets[name];
            }
        };
        NetManager.__INS__ = null;
        return NetManager;
    }());
    kaayou.NetManager = NetManager;
    function sendMessage(coname, head, data, reshead, callback, target) {
        var pro = null;
        if (reshead) {
            if (callback) {
                kaayou.getController(coname).onece(reshead, function (e) {
                    if (target) {
                        callback.apply(target, [e.data]);
                    }
                    else {
                        callback(e.data);
                    }
                }, target);
                NetManager.getInstance().getSocket(coname).send({
                    msghead: head,
                    msgdata: data ? data : null
                });
                return pro;
            }
            else {
                pro = new Promise(function (resole, rejct) {
                    kaayou.getController(coname).onece(reshead, function (e) {
                        if (callback) {
                            if (target) {
                                callback.apply(target, [e.data]);
                            }
                            else {
                                callback(e.data);
                            }
                            return;
                        }
                        resole(e.data);
                    }, target);
                    NetManager.getInstance().getSocket(coname).send({
                        msghead: head,
                        msgdata: data ? data : null
                    });
                });
                return pro;
            }
        }
        else {
            NetManager.getInstance().getSocket(coname).send({
                msghead: head,
                msgdata: data ? data : null
            });
        }
        return pro;
    }
    kaayou.sendMessage = sendMessage;
})(kaayou || (kaayou = {}));
var kaayou;
(function (kaayou) {
    var pool;
    (function (pool) {
        var _classPID = (0 | (Math.random() * 998));
        function getNewPID() {
            return _classPID++;
        }
        function getTargetPID(target) {
            var pid = 0;
            if (target.constructor.hasOwnProperty('__pid')) {
                pid = target.constructor.__pid;
            }
            if (!pid) {
                pid = getNewPID();
                target.constructor.__pid = pid;
            }
            return pid;
        }
        function getClassPID(target) {
            var pid = 0;
            if (target.hasOwnProperty('__pid')) {
                pid = target.__pid;
            }
            if (!pid) {
                pid = getNewPID();
                target.__pid = pid;
            }
            return pid;
        }
        var _pool = {};
        function _releaseCB() {
            this.release();
        }
        ;
        function _autoRelease(obj) {
            var running = obj._running === undefined ? false : !obj._running;
            cc.director.getScheduler().scheduleCallbackForTarget(obj, _releaseCB, 0, 0, 0, running);
        }
        ;
        function putInPool(obj) {
            var pid = getTargetPID(obj);
            if (!_pool[pid]) {
                _pool[pid] = [];
            }
            obj.retain && obj.retain();
            obj.unuse && obj.unuse();
            _pool[pid].push(obj);
        }
        pool.putInPool = putInPool;
        function putAllChildrenInPool(obj) {
            var children = lodash.clone(obj.getChildren());
            lodash.forEach(children, function (v) {
                kaayou.pool.putInPool(v);
            });
        }
        pool.putAllChildrenInPool = putAllChildrenInPool;
        function hasObject(objClass) {
            var pid = getClassPID(objClass);
            var list = _pool[pid];
            if (!list || list.length == 0) {
                return false;
            }
            return true;
        }
        pool.hasObject = hasObject;
        function removeObject(obj) {
            var pid = getTargetPID(obj);
            if (pid) {
                var list = _pool[pid];
                if (list) {
                    for (var i = 0; i < list.length; i++) {
                        if (obj === list[i]) {
                            obj.release && obj.release();
                            list.splice(i, 1);
                        }
                    }
                }
            }
        }
        pool.removeObject = removeObject;
        function removeClass(objClass) {
            if (hasObject(objClass)) {
                var pid = getClassPID(objClass);
                var list = _pool[pid];
                if (list) {
                    for (var i = 0; i < list.length; i++) {
                        list[i].release && list[i].release();
                    }
                    _pool[pid] = [];
                }
            }
        }
        pool.removeClass = removeClass;
        function getFromPool(objClass) {
            var arg = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                arg[_i - 1] = arguments[_i];
            }
            if (hasObject(objClass)) {
                var pid = getClassPID(objClass);
                var list = _pool[pid];
                var args = Array.prototype.slice.call(arguments);
                args.shift();
                var obj = list.pop();
                if (!obj) {
                    return null;
                }
                obj.reuse && obj.reuse.apply(obj, args);
                cc.sys.isNative && obj.release && _autoRelease(obj);
                return obj;
            }
            return null;
        }
        pool.getFromPool = getFromPool;
        function drainAllPools() {
            for (var i in _pool) {
                for (var j = 0; j < _pool[i].length; j++) {
                    var obj = _pool[i][j];
                    obj.release && obj.release();
                }
            }
            _pool = {};
        }
        pool.drainAllPools = drainAllPools;
    })(pool = kaayou.pool || (kaayou.pool = {}));
})(kaayou || (kaayou = {}));
var kaayou;
(function (kaayou) {
    var ResManager = (function () {
        function ResManager() {
            this.RESDB = [];
        }
        ResManager.getInstance = function () {
            if (ResManager.__INS__ == null) {
                ResManager.__INS__ = new ResManager();
                ResManager.__INS__.init();
            }
            return ResManager.__INS__;
        };
        ResManager.prototype.init = function () { };
        ResManager.prototype.pushRes = function (res) {
            this.RESDB.push(res);
        };
        ResManager.__INS__ = null;
        return ResManager;
    }());
    kaayou.ResManager = ResManager;
})(kaayou || (kaayou = {}));
var kaayou;
(function (kaayou) {
    var ccclass = kaayou._decorator.ccclass;
    var kScene = (function (_super) {
        __extends(kScene, _super);
        function kScene() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.node = null;
            return _this;
        }
        kScene.prototype.ctor = function () {
            _super.prototype.ctor.call(this);
        };
        kScene.prototype.initWithccs = function (path) {
            this.setContentSize(cc.winSize);
            var mlayer = ccui.Layout.create();
            mlayer.setContentSize(cc.winSize);
            mlayer.setTouchEnabled(true);
            mlayer.setAnchorPoint(0.5, 0.5);
            mlayer.setPosition(cc.winSize.width * 0.5, cc.winSize.height * 0.5);
            this.addChild(mlayer);
            this.node = ccs.load(path, "res/").node;
            this.node.setContentSize(cc.winSize);
            this.node.setPosition(cc.winSize.width / 2 - this.node.width / 2, cc.winSize.height / 2 - this.node.height / 2);
            ccui.helper.doLayout(this.node);
            this.addChild(this.node);
        };
        kScene.prototype.onReEnter = function () { };
        kScene.prototype.onReExit = function () { };
        kScene = __decorate([
            ccclass
        ], kScene);
        return kScene;
    }(cc.Layer));
    kaayou.kScene = kScene;
})(kaayou || (kaayou = {}));
var kaayou;
(function (kaayou) {
    var ccclass = kaayou._decorator.ccclass;
    var ScrollView = (function (_super) {
        __extends(ScrollView, _super);
        function ScrollView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ScrollView.prototype.ctor = function () {
            _super.prototype.ctor.call(this);
        };
        ScrollView = __decorate([
            ccclass
        ], ScrollView);
        return ScrollView;
    }(ccui.ScrollView));
    kaayou.ScrollView = ScrollView;
})(kaayou || (kaayou = {}));
var kaayou;
(function (kaayou) {
    var SoundManager = (function () {
        function SoundManager() {
            this.defaultSound = null;
        }
        SoundManager.getInstance = function () {
            if (SoundManager.__INS__ == null) {
                SoundManager.__INS__ = new SoundManager();
                SoundManager.__INS__.init();
            }
            return SoundManager.__INS__;
        };
        SoundManager.prototype.init = function () { };
        SoundManager.prototype.playBgm = function (url, loop) {
            if (loop === void 0) { loop = true; }
            if ('false' === cc.sys.localStorage.getItem('tog_music')) {
                return;
            }
            if (!url) {
                console.log("不存在音乐:" + url);
                return;
            }
            cc.audioEngine.playMusic(url, loop);
        };
        SoundManager.prototype.playSound = function (url, loop) {
            if (loop === void 0) { loop = false; }
            if ('false' === cc.sys.localStorage.getItem('tog_effect')) {
                return;
            }
            if (!url) {
                console.log("不存在音效:" + url);
                return;
            }
            cc.audioEngine.playEffect(url, loop);
        };
        SoundManager.prototype.setMute = function (b) {
            if (b) {
                cc.audioEngine.setMusicVolume(0);
                cc.audioEngine.setEffectsVolume(0);
            }
            else {
                cc.audioEngine.setMusicVolume(0.5);
                cc.audioEngine.setEffectsVolume(0.5);
            }
        };
        SoundManager.prototype.stopMusic = function (isRelease) {
            if (isRelease === void 0) { isRelease = false; }
            cc.audioEngine.stopMusic(isRelease);
        };
        SoundManager.prototype.pauseMusic = function () {
            cc.audioEngine.pauseMusic();
        };
        SoundManager.prototype.resumeMusic = function () {
            cc.audioEngine.resumeMusic();
        };
        SoundManager.prototype.setDefaultSound = function (a) {
            this.defaultSound = lodash.extend({}, this.defaultSound, a);
        };
        SoundManager.prototype.setBtnClickSounds = function () {
            var soundres = this.defaultSound['ClickBtn'];
            soundres && this.playSound(soundres);
        };
        SoundManager.prototype.setCloceSounds = function () {
            var soundres = this.defaultSound['ClickBtnClose'];
            soundres && this.playSound(soundres);
        };
        SoundManager.prototype.setSwitchSounds = function () {
            var soundres = this.defaultSound['ClickBtnSwitch'];
            soundres && this.playSound(soundres);
        };
        SoundManager.__INS__ = null;
        return SoundManager;
    }());
    kaayou.SoundManager = SoundManager;
    function MakeResultMessageHead(head) {
        return "ws::Msg::" + head;
    }
    kaayou.MakeResultMessageHead = MakeResultMessageHead;
})(kaayou || (kaayou = {}));
var kaayou;
(function (kaayou) {
    var UIManager = (function () {
        function UIManager() {
            this.Scenes = {};
            this._MainScene = null;
            this.runingScenes = {};
            this.szIndex = 10000;
            this.__curRuningSceneName = "";
        }
        UIManager.getInstance = function () {
            if (UIManager.__INS__ == null) {
                UIManager.__INS__ = new UIManager();
                UIManager.__INS__.init();
            }
            return UIManager.__INS__;
        };
        UIManager.prototype.init = function () { };
        UIManager.prototype.installScene = function (name, scene) {
            name = name.toUpperCase();
            this.Scenes[name] = scene;
        };
        UIManager.prototype.uninstallScene = function (name) {
            name = name.toUpperCase();
            if (this.runingScenes[name]) {
                this.runingScenes[name].removeFromParent();
                delete this.runingScenes[name];
            }
            delete this.Scenes[name];
        };
        UIManager.prototype.setMainScene = function (sc) {
            this._MainScene = sc;
            sc.initUI();
            cc.director.runScene(sc);
        };
        UIManager.prototype.getMainScene = function () {
            return this._MainScene;
        };
        UIManager.prototype.runScene = function (name) {
            name = name.toUpperCase();
            if (!this.Scenes[name]) {
                console.log('没有该场景资源');
                return;
            }
            if (!this.runingScenes[name]) {
                var scene = new (this.Scenes[name])();
                this.runingScenes[name] = scene;
                this.getMainScene().getSceneLayer().addChild(scene, ++this.szIndex);
                this.runingScenes[name].setVisible(false);
            }
            else if (this.runingScenes[name].isVisible()) {
                console.log('切换到自己场景 ' + name);
                this.runingScenes[name].onReExit();
                this.runingScenes[name].onReEnter();
                return;
            }
            else {
                this.runingScenes[name].setLocalZOrder(++this.szIndex);
            }
            var self = this;
            self.__curRuningSceneName = name;
            var lastNames = [];
            lodash.forEach(this.runingScenes, function (s, k) {
                if (k == name) {
                    self.runingScenes[k].setVisible(true);
                }
                else {
                    if (self.runingScenes[k].isVisible()) {
                        lastNames.push(k);
                    }
                }
            });
            this.runingScenes[name].onReEnter();
            for (var x in lastNames) {
                this.runingScenes[lastNames[x]].onReExit();
                this.runingScenes[lastNames[x]].setVisible(false);
            }
        };
        UIManager.prototype.preLoadScene = function (name) {
            name = name.toUpperCase();
            if (!this.Scenes[name]) {
                console.log('没有该场景资源' + name);
                return;
            }
            if (!this.runingScenes[name]) {
                var scene = new (this.Scenes[name])();
                this.runingScenes[name] = scene;
                this.getMainScene().getSceneLayer().addChild(scene, ++this.szIndex);
                this.runingScenes[name].setVisible(false);
                var minName = this.__getMinSceneName();
                if (lodash.isEmpty(minName)) {
                    this.runingScenes[name].setLocalZOrder(++this.szIndex);
                    return;
                }
                else {
                    this.runingScenes[name].setLocalZOrder(this.runingScenes[minName].getLocalZOrder() - 1);
                }
            }
        };
        UIManager.prototype.getCurRuningScene = function () {
            var self = this;
            if (self.__curRuningSceneName == "") {
                return null;
            }
            return this.runingScenes[self.__curRuningSceneName] || null;
        };
        UIManager.prototype.getCurRuningSceneName = function () {
            var self = this;
            return self.__curRuningSceneName;
        };
        UIManager.prototype.__getMinSceneName = function () {
            if (lodash.size(this.runingScenes) < 1) {
                return;
            }
            var arr = this.__getRuningSceneArray();
            return arr[0].name;
        };
        UIManager.prototype.__getRuningSceneArray = function () {
            var arr = [];
            for (var x in this.runingScenes) {
                arr.push({
                    name: x,
                    order: this.runingScenes[x].getLocalZOrder()
                });
            }
            arr = lodash.sortBy(arr, ['order']);
            return arr;
        };
        UIManager.prototype.popScene = function (name) {
            if (name === void 0) { name = null; }
            if (lodash.size(this.runingScenes) < 2) {
                return;
            }
            if (name != null && lodash.isEmpty(this.runingScenes[name])) {
                return;
            }
            var self = this;
            var arr = this.__getRuningSceneArray();
            var maxSceneName = arr[arr.length - 1].name;
            if (maxSceneName == "login".toUpperCase()) {
                console.error("已经到最底层了");
                return;
            }
            var secondSceneName = arr[arr.length - 2].name;
            var minSceneName = arr[0].name;
            if (lodash.isEmpty(name)) {
                name = maxSceneName;
            }
            if (name != maxSceneName) {
                self.runingScenes[name].setLocalZOrder(self.runingScenes[minSceneName].getLocalZOrder() - 1);
                self.runingScenes[name].onReExit();
                self.runingScenes[name].setVisible(false);
            }
            else {
                self.__curRuningSceneName = secondSceneName;
                self.runingScenes[maxSceneName].setLocalZOrder(self.runingScenes[minSceneName].getLocalZOrder() - 1);
                var lastNames_1 = [];
                lodash.forEach(this.runingScenes, function (s, k) {
                    if (k == self.__curRuningSceneName) {
                        self.runingScenes[k].setVisible(true);
                    }
                    else {
                        if (self.runingScenes[k].isVisible()) {
                            lastNames_1.push(k);
                        }
                    }
                });
                for (var x in lastNames_1) {
                    this.runingScenes[lastNames_1[x]].onReExit();
                    this.runingScenes[lastNames_1[x]].setVisible(false);
                }
            }
        };
        UIManager.prototype.hasScene = function (name) {
            name = name.toUpperCase();
            if (!this.Scenes[name]) {
                console.log('没有该场景资源');
                return false;
            }
            return !!this.runingScenes[name];
        };
        UIManager.__INS__ = null;
        return UIManager;
    }());
    kaayou.UIManager = UIManager;
})(kaayou || (kaayou = {}));
