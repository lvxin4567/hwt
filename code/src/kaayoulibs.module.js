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
                    //var reg = new RegExp("({[" + i + "]})", "g");//这个在索引大于9时会有问题，谢谢何以笙箫的指出
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
/**
 * yyyy-MM-dd hh:mm:ss:SS
 */
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
Date.prototype.format = Date.prototype.Format;
/// <reference path="extendJS.ts" />
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
            // if (target.constructor.name == 'CreateRoomPanel') {
            //     console.error("CreateRoomPanel", did)
            // }
            if (!did) {
                did = getNewDecoratorID();
                target.constructor.__decoratorid = did;
            }
            return did;
        }
        function getSuper(ctor) {
            var proto = ctor.prototype; // binded function do not have prototype
            var dunderProto = proto && Object.getPrototypeOf(proto);
            return dunderProto && dunderProto.constructor;
        }
        function checkCtorArgument(decorate) {
            return function (target) {
                if (typeof target === 'function') {
                    // no parameter, target is ctor
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
            // console.log(reobnames);
            for (var x in reobnames) {
                reob[reobnames[x]] = ctor.prototype[reobnames[x]];
            }
            // console.log(reob);
            // Object.getOwnPropertyDescriptor()
            var res = base.extend(reob); //   ctor.extend(base);// cc.Scene.extend(ctor);
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
        // function getAutoBindBindEventData(classname, conname, eventkey, propertyKey) {
        //     if(!g_eventTagertArray[classname]){return null;}
        //     g_eventTagertArray[classname] = g_eventTagertArray[classname] || {};
        //     g_eventTagertArray[classname][conname] = g_eventTagertArray[classname][conname] || {};
        //     g_eventTagertArray[classname][conname][eventkey] = propertyKey;
        // }
        function BindEvent(coname, keyStr) {
            return function (target, propertyKey, descriptor) {
                var classname = target.constructor.name;
                addAutoBindBindEventData(target, coname, keyStr, propertyKey);
                // let classname = target.constructor.name;
                // g_eventTagertArray[classname] = g_eventTagertArray[classname] || {};
                // g_eventTagertArray[classname][coname] = {}
                // if (!target["_@eventTagertArray"]) {
                //     target["_@eventTagertArray"] = {};
                // }
                // target["_@eventTagertArray"][keyStr] = {
                //     coname: coname,
                //     call: descriptor.value//target[propertyKey]
                // };
                // return descriptor.value;
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
            /*
            target["_@__" + propertyKey] = target[propertyKey];
            target[propertyKey] = function () {
                if (target["_@bindEvent"]) {
                    if (this["_@eventTagertArray"]) {
                        let eventTagertArray: Array<EventTagertArray> = this["_@eventTagertArray"];
                        for (var x in eventTagertArray) {
                            (function (keyStr: string, coname: string, curtarget) {
                                // console.log(keyStr);
                                kaayou.getController(coname).offBytarger(keyStr, curtarget);
                            })(x, eventTagertArray[x].coname, this);
                        }
                    }
                    if (this["_@queue_eventTagertArray"]) {
                        let queue_eventTagertArray: Array<EventTagertArray> = this["_@queue_eventTagertArray"];
                        for (var x in queue_eventTagertArray) {
                            (function (keyStr: string, coname: string, curtarget) {
                                // console.log(keyStr);
                                kaayou.getController(coname).offBytarger(keyStr, curtarget);
                            })(x, queue_eventTagertArray[x].coname, this);
                        }
                    }
                }
                this["_@__" + propertyKey].apply(this, arguments);
            }
            return target[propertyKey];
    
            */
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
            /*
            var i = 1;
            if (target.constructor && target.constructor.prototype) {
                target = target.constructor.prototype;
            }
            console.log(target.constructor)
            if (!target["_@bindEvent"]) {
                target["_@isBindInit"] = false;
                target["_@bindEvent"] = function () {
                    console.log(32424423, this);
                    if (this["_@isBindInit"] == true) { return; }
                    this["_@isBindInit"] = true;
                    if (this["_@eventTagertArray"]) {
                        let eventTagertArray: Array<EventTagertArray> = this["_@eventTagertArray"];
                        for (var x in eventTagertArray) {
                            (function (keyStr: string, coname: string, funcall: Function, curtarget) {
                                // console.log(keyStr);
                                kaayou.getController(coname).on(keyStr, function (e: kaayou.Event) {
                                    var __ack = null;
                                    if (e.data) {
                                        if (e.data['@ack']) {
                                            __ack = e.data['@ack'];
                                            delete e.data['@ack'];
                                            e.data = e.data['@original'];
                                        }
                                    }
                                    if (__ack) {
                                        let resulet = funcall.apply(curtarget, [e.data]);
                                        __ack(resulet);
                                    } else {
                                        funcall.apply(curtarget, [e.data]);
                                    }
    
                                }, curtarget);
                            })(x, eventTagertArray[x].coname, eventTagertArray[x].call, this);
                        }
                    }
    
                    if (this["_@queue_eventTagertArray"]) {
                        let queue_eventTagertArray: Array<EventTagertArray> = this["_@queue_eventTagertArray"];
                        if (!this["_@queue_eventLoopArray"]) {
                            this["_@queue_eventLoopArray"] = [];
                        }
                        for (var x in queue_eventTagertArray) {
                            (function (keyStr: string, coname, string, funcall: Function, curtarget) {
                                kaayou.getController(coname).on(keyStr, function (e: kaayou.Event) {
                                    var __ack = null;
                                    if (e.data) {
                                        if (e.data['@ack']) {
                                            __ack = e.data['@ack'];
                                            delete e.data['@ack'];
                                            e.data = e.data['@original'];
                                        }
                                    }
                                    curtarget["_@queue_eventLoopArray"].push({
                                        target: curtarget,
                                        data: e.data || null,
                                        ack: __ack || null,
                                        callfuc: funcall
                                    });
                                }, curtarget);
                            })(x, queue_eventTagertArray[x].coname, queue_eventTagertArray[x].call, this);
                        }
                    }
                }
            }
            target["_@__" + propertyKey] = target[propertyKey];
            target[propertyKey] = function () {
                if (this["_@bindEvent"]) {
                    this["_@bindEvent"]();
                }
                this["_@__" + propertyKey].apply(this, arguments);
            }
            return target[propertyKey];*/
        }
        _decorator.doBindEvent = doBindEvent;
    })(_decorator = kaayou._decorator || (kaayou._decorator = {}));
})(kaayou || (kaayou = {}));
// import * as md5 from '../lib/md5.min';
// import * as encoding from '../lib/encoding.min';
var kaayou;
(function (kaayou) {
    var iconv = require('iconv-lite');
    var CryptoJS = require("crypto-js");
    var AES = /** @class */ (function () {
        function AES() {
        }
        // 加密 aes + base64
        AES.encrypt = function (plainText) {
            var key = CryptoJS.enc.Utf8.parse(this.keyStr);
            var iv = CryptoJS.enc.Utf8.parse(this.ivStr);
            var encrypted = CryptoJS.AES.encrypt(plainText, key, { iv: iv, mode: CryptoJS.mode.CTR, padding: CryptoJS.pad.NoPadding });
            var base64str = CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
            base64str = base64str.replace(/\+/g, "-");
            base64str = base64str.replace(/\//g, "_");
            return base64str;
        };
        // 解密
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
            // CryptoJS.enc.base64str();
            // let base64str = CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
            // base64str = base64str.replace(/\+/g, "-");
            // base64str = base64str.replace(/\//g, "_");
            var str1 = CryptoJS.enc.Utf8.parse(encrypted.toString());
            var str = CryptoJS.enc.Base64.stringify(str1);
            return str;
        };
        AES.ivStr = "terrysgygoaesctr";
        AES.keyStr = "kaayou20190110#$";
        return AES;
    }());
    kaayou.AES = AES;
    var MD5 = /** @class */ (function () {
        function MD5() {
        }
        MD5.encode = function (v) {
            return CryptoJS.MD5(v).toString();
        };
        return MD5;
    }());
    kaayou.MD5 = MD5;
    var TextCoder = /** @class */ (function () {
        function TextCoder() {
        }
        // static encode(ma:string,str:string){
        //    return  ( new encoding.TextEncoder(ma)).encode(str);
        // }
        // static decode(ma:string,buff:Uint8Array){
        //     return  (new encoding.TextDecoder(ma)).decode(buff);
        // }
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
    var GVoice = /** @class */ (function () {
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
        //初始gv
        GVoice.prototype.OnGvoiceInitOK = function () {
            console.log("语音初始化成功");
            GVoice.InitOK = true;
            kaayou.emit("", "OnGvoiceInitOK");
        };
        //加入成功
        GVoice.prototype.OnGvoiceJoinRoomOK = function (memberID) {
            memberID = Number(memberID); //安卓平台返回的是string类型
            console.log("GVoice OnGvoiceJoinRoomOK, memberID =", memberID);
            kaayou.emit("", "OnGvoiceJoinRoomOK", { memberID: memberID });
        };
        //开麦成功
        GVoice.prototype.OnGvoiceOpenMicOK = function () {
            console.log("GVoice OnGvoiceOpenMicOK");
            kaayou.emit("", "OnGvoiceOpenMicOK");
        };
        //关麦成功
        GVoice.prototype.OnGvoiceCloseMicOK = function () {
            console.log("GVoice OnGvoiceCloseMicOK");
            kaayou.emit("", "OnGvoiceCloseMicOK");
        };
        //开扬声器成功
        GVoice.prototype.OnGvoiceOpenSpeakerOK = function () {
            console.log("GVoice OnGvoiceOpenSpeakerOK");
            kaayou.emit("", "OnGvoiceOpenSpeakerOK");
        };
        //关扬声器成功
        GVoice.prototype.OnGvoiceCloseSpeakerOK = function () {
            console.log("GVoice OnGvoiceCloseSpeakerOK");
            kaayou.emit("", "OnGvoiceCloseSpeakerOK");
        };
        //status 取值："0"：停止说话 "1"：开始说话 "2"：继续说话
        GVoice.prototype.OnMemberVoice = function (memberid, status) {
            // console.log("GVoice OnMemberVoice:" + memberid + "-------" + status);
            kaayou.emit("", "OnGvoiceMemberVoice", { memberid: memberid, status: status });
        };
        GVoice.bLoginOK = false;
        GVoice.roomId = "";
        GVoice.InitOK = false;
        return GVoice;
    }());
    var webGame = /** @class */ (function () {
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
            //kaayou://pay?appid=kaayou785024331&val=1000&goodsid=1&goodsname=yuanbao&orderid=1600239046076250299&extra=order:1600239046076250299%7C%7Cprice:1000
            kaayou.emit("lobby", "mod::mall::legendBuy", { infoStr: productInfo });
        };
        return webGame;
    }());
    var YunVa = /** @class */ (function () {
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
            //kaayou.PlatformMgr.getInstance().sys.Dialog("语音链接成功");
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
    var Wechat = /** @class */ (function () {
        function Wechat() {
            this.rewardedVideoAd = null;
            this.lastWeChatCode = "";
            if (cc.sys.isWeChat) {
                this.file = WXJSBridge.file;
            }
            else {
                this.file = {};
            }
        }
        Wechat.prototype.CreateLoginBtn = function (param) {
            if (!cc.sys.isWeChat) {
                return;
            }
            WXJSBridge.login.create(param);
        };
        Wechat.prototype.DestoryLoginBtn = function () {
            if (!cc.sys.isWeChat) {
                return;
            }
            WXJSBridge.login.destroy();
        };
        Wechat.prototype.GetAccessToken = function (appid, platform) {
            if (platform === void 0) { platform = 3; }
            return __awaiter(this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, kaayou.sendMessage("lobby", "getaccesscode", { appid: appid, platform: platform }, "ws::Msg::getaccesscode")];
                        case 1:
                            res = _a.sent();
                            if (res.errcode !== 0) {
                                return [2 /*return*/, -1];
                            }
                            return [2 /*return*/, res.access_token];
                    }
                });
            });
        };
        //获取启动参数
        Wechat.prototype.GetQuery = function () {
            if (!cc.sys.isWeChat) {
                return {};
            }
            return WXJSBridge.sys.query ? WXJSBridge.sys.query : {};
        };
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
        Wechat.prototype.OnLogin = function (code, iv, info, rawdata) {
            console.log("微信OnLogin:", code);
            if (!code || code.length < 1) {
                return;
            }
            //防止两次回调
            if (this.lastWeChatCode == code) {
                return;
            }
            this.lastWeChatCode = code;
            kaayou.emit("common", "ui::Loading::Hide");
            if (Wechat.isUpdate) {
                kaayou.emit("", "mod::User::wx::update", code);
            }
            else {
                kaayou.emit("", "mod::User::wx::login", { code: code, iv: iv, info: info, rawdata: rawdata });
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
        //=============微信小游戏视频模块=========
        Wechat.prototype.createRewardedVideoAd = function (data) {
            var self = this;
            // this.rewardedVideoAd = wx.createRewardedVideoAd(data);//TODO 创建激励视频广告组件
            console.log(this.rewardedVideoAd);
            this.rewardedVideoAd.onLoad(function () {
                console.log('激励视频 广告加载成功');
                kaayou.emit('lobby', 'ui::LeftMenuPanle::videoLoad');
                // self.playVideo();
            });
            this.rewardedVideoAd.onError(function (err) {
                console.log(err);
                if (err.errCode && err.errMsg) {
                    kaayou.emit('common', 'ui::Toast::Show', { msg: err.errMsg });
                }
            });
            //关闭广告
            this.rewardedVideoAd.onClose(function (res) {
                if (res && res.isEnded || res === undefined) {
                    // 正常播放结束，可以下发游戏奖励
                    kaayou.emit('lobby', 'ws::Msg::videoadaward');
                    console.log('正常播放结束，可以下发游戏奖励');
                }
                else {
                    // 播放中途退出，不下发游戏奖励
                    kaayou.emit('common', 'ui::Toast::Show', { msg: "播放中途退出，不下发游戏奖励" });
                    console.log('播放中途退出，不下发游戏奖励');
                }
            });
        };
        //只有在用户点击激励视频广告组件上的 关闭广告 按钮时，广告才会关闭。开发者不可控制激励视频广告组件的隐藏。
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
        };
        Wechat.isUpdate = false;
        return Wechat;
    }());
    var BaiduMap = /** @class */ (function () {
        function BaiduMap() {
            this.pullCount = 0;
            this.hasReturn = false; //调用是否有返回
            this.calling = false; //是否在调用
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
            //lvxin200116
            if (longitude < -180 || longitude > 180 || latitude > 90 || latitude < -90) {
                return false;
            }
            ; //过滤超上下限
            //if (longitude < 0.01 && longitude > -0.01 && latitude > -0.01 && latitude < 0.01) { return false };//过滤（0，0）
            //if (latitude > 39.9 && latitude < 39.95 && longitude > 116.35 && longitude < 116.45) { return false };//过滤北京东城区
            //lw200227：-2~2都认为是模拟器
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
                        //kaayou.emit('common', 'ui::Toast::Show', { msg: mp.errmsg });
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
                                    //如果程序启动到现在还没取到经纬度，就向bugly汇报
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
                //lw200217在bugly中跟踪反馈异常玩家的记录
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
    var System = /** @class */ (function () {
        function System() {
            this.batteryInfo = null;
        }
        //重新拉起声音
        System.prototype.OnSoundResume = function () {
            kaayou.SoundManager.getInstance().resumeMusic();
        };
        //增加监听电池信息和状态的通知
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
                // jsb.reflection.callStaticMethod("NativeOcClass", "removeBatteryInfoNotification");
            }
            else if (cc.sys.os == cc.sys.OS_ANDROID) {
            }
        };
        //客户端会在这个消息返回电池状态
        System.prototype.OnSysBatteryInfoRsp = function (info) {
            try {
                console.log("电池信息" + info);
                kaayou.PlatformMgr.getInstance().sys.batteryInfo = JSON.parse(info);
                //解析出来的model  {{"state" : state, @"level" :""}  state  状态  level  电量
                // kaayou.emit("", "ui::Battery::showBattery", { msg: kaayou.PlatformMgr.getInstance().sys.batteryInfo  });
            }
            catch (err) {
            }
        };
        System.prototype.GetBatteryInfo = function () {
            //Unplugged 未充电
            //none 无法获取信息
            //Charging 充电中
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
                // kaayou.emit("", "ui::Battery::showBattery", { msg: kaayou.PlatformMgr.getInstance().sys.batteryInfo  });
                // if (data.type) {
                //     // return data;
                // }
            }
            catch (err) {
            }
            return { state: "Unplugged", level: 100 };
        };
        //lw181113
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
                code = codeStr; // Number(codeStr);
            }
            else if (cc.sys.os == cc.sys.OS_ANDROID) {
                var codeStr = jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "GetLocalVersionCode", "()Ljava/lang/String;");
                code = codeStr; // Number(codeStr);
            }
            return code;
        };
        System.prototype.GetLocalVersionName = function () {
            var name = "1.9.7"; //安卓包版本号
            if (cc.sys.isWeChat) {
                return name;
            }
            if (!cc.sys.isNative) {
                name = kaayou.Http.GetRequest(location.search)['version'] || name;
                return name;
            }
            if (cc.sys.os == cc.sys.OS_IOS) {
                var codeStr = jsb.reflection.callStaticMethod("NativeOcClass", "GetLocalVersionName");
                name = codeStr; // Number(codeStr);
            }
            else if (cc.sys.os == cc.sys.OS_ANDROID) {
                var codeStr = jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "GetLocalVersionName", "()Ljava/lang/String;");
                console.log("Local APK Version:", codeStr);
                name = codeStr; // Number(codeStr);
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
            //lw181119,type:"1"立即退，"2"双击退
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
                            if (!!cc.sys.isNative) return [3 /*break*/, 2];
                            return [4 /*yield*/, kaayou.Http.GetFileSize(url)];
                        case 1:
                            length_1 = _a.sent();
                            return [2 /*return*/, length_1];
                        case 2:
                            if (!PlatformMgr.getInstance().sys.checkAllowJSInterface("GetFileLength")) {
                                console.log("接口不存在:GetFileLength");
                                return [2 /*return*/, "跳过"];
                            }
                            jStr = "";
                            if (cc.sys.os == cc.sys.OS_IOS) {
                                //jStr = jsb.reflection.callStaticMethod("NativeOcClass", "GetNetInfo");
                                return [2 /*return*/, "跳过"];
                            }
                            else if (cc.sys.os == cc.sys.OS_ANDROID) {
                                jStr = jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "GetFileLength", "(Ljava/lang/String;)Ljava/lang/String;", url);
                            }
                            return [2 /*return*/, jStr];
                        case 3:
                            err_1 = _a.sent();
                            return [2 /*return*/, "-1"];
                        case 4: return [2 /*return*/];
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
                        // PlatformMgr.getInstance().sys.Toast(_key);
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
        //调度手机震动
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
        //系统方法，复制文字到剪切板  0是失败  1是成功；
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
        //系统方法，判断是否开启了语音权限 
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
                // 0是未授权  1是没有询问开启麦克风 2是已授权；
                var flag1 = jsb.reflection.callStaticMethod("NativeOcClass", "checkMic");
                flag = flag1 == 2 ? true : false;
            }
            else if (cc.sys.os == cc.sys.OS_ANDROID) {
                // flag = jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "", "(Ljava/lang/String;)I",);
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
        //复制之后跳入微信
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
        //检查是否存在该接口
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
        //上报异常
        System.prototype.PostBugly = function (val0, val1, val2) {
            if (val1 === void 0) { val1 = ""; }
            if (val2 === void 0) { val2 = ""; }
            // CRASHTYPE_COCOS2DX_JS 5
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
    var Pay = /** @class */ (function () {
        function Pay() {
        }
        Pay.prototype.AliPay = function (orderString) {
            if (!cc.sys.isNative) {
                // console.log(tag, msg);
                return;
            }
            if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "Alipay", "(Ljava/lang/String;)V", orderString);
            }
        };
        Pay.prototype.ApplePay = function (productID, orderID, token) {
            if (!cc.sys.isNative) {
                // console.log(tag, msg);
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
                // console.log(tag, msg);
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
            //success  fail  cancel  invalid ;
            kaayou.emit('', "PayRes", { code: code, msg: msg });
        };
        return Pay;
    }());
    // 钉钉
    var DDShare = /** @class */ (function () {
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
        // 钉钉分享回调返回code  0/成功  -2/取消 其他错误看msg
        DDShare.prototype.OnDdShareRes = function (code, msg) {
            kaayou.emit("", "DdShareRes", { code: code, msg: msg });
        };
        return DDShare;
    }());
    // magicWindow魔窗分享返回各种信息返回类容为json字符串
    var MagicWindow = /** @class */ (function () {
        function MagicWindow() {
        }
        //客户端主动去拉取,获取魔窗信息。
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
        //是否需要客户端主动拉取魔窗
        MagicWindow.prototype.OnMagicWindowCallPull = function () {
            try {
                kaayou.emit("", "MagicWindowCallPull");
            }
            catch (error) {
            }
        };
        //js端获取到魔窗信息，告诉原生清除信息
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
        //暂时弃用
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
    //lw200623闲聊和小信不能删，因为游戏里面有调用
    var XL = /** @class */ (function () {
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
    var XX = /** @class */ (function () {
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
    var WechatConfig = /** @class */ (function () {
        function WechatConfig() {
        }
        WechatConfig.prototype.GetConfig = function () {
            if (!cc.sys.isWeChat) {
                return {};
            }
            return WXJSConfig;
        };
        return WechatConfig;
    }());
    var AD = /** @class */ (function () {
        function AD() {
        }
        AD.prototype.Create = function (id) {
            if (!cc.sys.isWeChat) {
                return;
            }
            WXJSBridge.AD.create({ adUnitId: id }, false);
        };
        AD.prototype.Play = function () {
            if (!cc.sys.isWeChat) {
                return;
            }
            WXJSBridge.AD.play();
            kaayou.SoundManager.getInstance().pauseMusic();
        };
        AD.prototype.OnLoad = function () {
            if (!cc.sys.isWeChat) {
                return;
            }
            console.log('激励视频 广告加载成功');
            kaayou.emit('lobby', 'ui::LeftMenuPanle::videoLoad');
        };
        AD.prototype.OnError = function (err) {
            if (!cc.sys.isWeChat) {
                return;
            }
            console.log(err);
            if (err.errCode && err.errMsg) {
                kaayou.emit('common', 'ui::Toast::Show', { msg: err.errMsg });
            }
        };
        AD.prototype.OnClose = function (res) {
            if (!cc.sys.isWeChat) {
                return;
            }
            kaayou.SoundManager.getInstance().resumeMusic();
            if (res && res.isEnded || res === undefined) {
                // 正常播放结束，可以下发游戏奖励
                kaayou.emit('lobby', 'mod::User::videoReward');
                console.log('正常播放结束，可以下发游戏奖励');
            }
            else {
                // 播放中途退出，不下发游戏奖励
                //kaayou.emit('common', 'ui::Toast::Show', { msg: "播放中途退出，不下发游戏奖励" });
                console.log('播放中途退出，不下发游戏奖励');
            }
        };
        return AD;
    }());
    var Feedback = /** @class */ (function () {
        function Feedback() {
        }
        Feedback.prototype.Create = function (param) {
            if (!cc.sys.isWeChat) {
                return;
            }
            WXJSBridge.feedback.create(param);
        };
        Feedback.prototype.Show = function () {
            if (!cc.sys.isWeChat) {
                return;
            }
            WXJSBridge.feedback.show();
        };
        Feedback.prototype.Hide = function () {
            if (!cc.sys.isWeChat) {
                return;
            }
            WXJSBridge.feedback.hide();
        };
        Feedback.prototype.Destroy = function () {
            if (!cc.sys.isWeChat) {
                return;
            }
            WXJSBridge.feedback.destroy();
        };
        return Feedback;
    }());
    var PlatformMgr = /** @class */ (function () {
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
            this.wxCfg = null;
            this.ad = null;
            this.fb = null;
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
        PlatformMgr.getInstance = function () {
            if (PlatformMgr.__Ins__ == null) {
                PlatformMgr.__Ins__ = new PlatformMgr();
            }
            return PlatformMgr.__Ins__;
        };
        PlatformMgr.prototype.BindWindowMethod = function () {
            var KaNativeBridge = {};
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
        };
        PlatformMgr.prototype.BindWechatHook = function () {
            var self = this;
            var tempWxOnShow = function () {
                kaayou.SoundManager.getInstance().resumeMusic();
                kaayou.emit("", "OnShareWxResult", { code: 'YES', transaction: "" });
            };
            WXJSBridge.hook.appShow(tempWxOnShow);
            var tempWxOnHide = function () {
                kaayou.SoundManager.getInstance().pauseMusic();
            };
            WXJSBridge.hook.appHide(tempWxOnHide);
            var tempWxOnLogin = function (data) {
                WXJSBridge.sessionStorage.setItem("wx_signature", data.signature);
                self.wx.OnLogin(data.code, data.iv, data.encryptedData, data.rawData);
            };
            WXJSBridge.hook.loginSuccess(tempWxOnLogin);
            WXJSBridge.hook.loginFail(tempWxOnLogin);
            WXJSBridge.hook.loginCancel(self.wx.OnWxLoginCancel);
            WXJSBridge.hook.adLoad(self.ad.OnLoad);
            WXJSBridge.hook.adError(self.ad.OnError);
            WXJSBridge.hook.adClose(self.ad.OnClose);
            WXJSBridge.hook.payFail(function (e) {
                WXJSBridge.UI.toast(e.errMsg, "none");
            });
        };
        PlatformMgr.__Ins__ = null;
        return PlatformMgr;
    }());
    kaayou.PlatformMgr = PlatformMgr;
})(kaayou || (kaayou = {}));
/// <reference path="platform.ts" />
var kaayou;
(function (kaayou) {
    var Event = /** @class */ (function () {
        function Event(type, data) {
            /**事件传播是否已停止*/
            this.isPropagationStopped = false;
            this.type = type;
            this.data = data;
        }
        /**
         * 停止传播事件
         */
        Event.prototype.stopPropagation = function () {
            this.isPropagationStopped = true;
        };
        /**
         * 从池中获取一个事件对象
         * @param EventClass 事件class
         * @param type 事件类型
         * @param data 附带数据
         * @return {T}
         */
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
        /**
         * 将事件对象回收到对应的池中
         * @param event
         */
        Event.recycle = function (event) {
            event.target = event.currentTarget = event.data = null;
            var EventClass = Object.getPrototypeOf(event).constructor;
            EventClass._eventPool.push(event);
        };
        /**
         * 事件：进入新的一帧。
         * 需要注意：该事件只会在 UIManager 上抛出！
         */
        Event.ENTER_FRAME = "enterFrame";
        /**
         * 事件：当前帧即将开始渲染（在 ENTER_FRAME 事件之后）。
         * 需要注意：该事件只会在 UIManager 上抛出！
         */
        Event.PRERENDER = "prerender";
        /**
         * 事件：APP 获得焦点（切换回前台）。
         * 需要注意：该事件只会在 UIManager 上抛出！
         */
        Event.ACTIVATE = "activate";
        /**
         * 事件：APP 失去焦点（切换到后台）。
         * 需要注意：该事件只会在 UIManager 上抛出！
         */
        Event.DEACTIVATE = "deactivate";
        /**
         * 事件：舞台尺寸有改变。
         * 需要注意：该事件只会在 UIManager 上抛出！
         */
        Event.RESIZE = "stageResize";
        /**
         * 事件：子对象的尺寸有改变
         * DisplayObjectContainer 会对自己侦听该事件，如果子节点的尺寸有改变，应冒泡抛出该事件
         */
        Event.CHILD_RESIZE = "childResize";
        return Event;
    }());
    kaayou.Event = Event;
    /**
     * 事件派发器，负责进行事件的发送和侦听
     * @author kaayou
     */
    var EventDispatcher = /** @class */ (function () {
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
                    return; // 已注册
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
                    return; // 已注册
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
            // 当前节点有侦听该事件
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
                            // catch到异常时不注销回调
                            // this._eventMap[event.type][i] = null;
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
            // 事件还没停止、是显示对象、需要继续冒泡
            if (bubbles && !event.isPropagationStopped
                && this._target instanceof cc.Node
                // && this._target != kaayou.stage
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
    /**
     * Socket / WebSocket 相关事件
     *
     */
    var SocketEvent = /** @class */ (function (_super) {
        __extends(SocketEvent, _super);
        function SocketEvent(type, data) {
            return _super.call(this, type, data) || this;
        }
        /**建立连接*/
        SocketEvent.CONNECT = "connect";
        /**收到数据*/
        SocketEvent.DATA = "data";
        /**连接错误*/
        SocketEvent.ERROR = "error";
        /**关闭*/
        SocketEvent.CLOSE = "close";
        return SocketEvent;
    }(Event));
    kaayou.SocketEvent = SocketEvent;
    /**
    * TouchEvent / TouchEvent 相关事件
    *
    */
    var TouchEvent = /** @class */ (function (_super) {
        __extends(TouchEvent, _super);
        function TouchEvent(type, data) {
            return _super.call(this, type, data) || this;
        }
        /**弹起*/
        TouchEvent.TouchEnd = "TouchEnd";
        /**按下*/
        TouchEvent.TouchStart = "TouchStart";
        /**移动*/
        TouchEvent.TouchMove = "TouchMove";
        /**取消*/
        TouchEvent.TouchCance = "TouchCance";
        return TouchEvent;
    }(Event));
    kaayou.TouchEvent = TouchEvent;
    var CheckEvent = /** @class */ (function (_super) {
        __extends(CheckEvent, _super);
        function CheckEvent(type, data) {
            return _super.call(this, type, data) || this;
        }
        /**选中*/
        CheckEvent.SELECTED = "Selected";
        /**取消*/
        CheckEvent.UNSELECTED = "UnSelected";
        return CheckEvent;
    }(Event));
    kaayou.CheckEvent = CheckEvent;
    var RadioEvent = /** @class */ (function (_super) {
        __extends(RadioEvent, _super);
        function RadioEvent(type, data) {
            return _super.call(this, type, data) || this;
        }
        /**选中*/
        RadioEvent.SELECTED = "RadioSelected";
        /**选中*/
        RadioEvent.UNSELECTED = "RadioUNSelected";
        return RadioEvent;
    }(Event));
    kaayou.RadioEvent = RadioEvent;
    /**
    *  CustomEvent 相关事件
    *
    */
    var CustomEvent = /** @class */ (function (_super) {
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
    var ControllerManager = /** @class */ (function () {
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
/// <reference path="decorator.ts" />
/// <reference path="event.ts" />
/// <reference path="kaayou.ControllerManager.ts" />
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
    var DataSet = /** @class */ (function () {
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
        // ccui_Button_extend();
        // ccui_Layout_extend();
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
        //瀑布流布局
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
                //计算最大行数
                maxColumn = this._gridcolumn;
                maxRow = Math.ceil(allcellCount / this._gridcolumn);
            }
            else if (_grid == ccui.Layout.LayoutGrid_AxisDirection.VERTICAL) {
                if (this._gridcolumn < 1) {
                    return;
                }
                //计算最大列数
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
                // allHeight += offH;
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
            // allwidth = 0 ;
            // allHeight = 0;
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
                    // var cs = subWidget.getBoundingBox();
                    var finalPosX = ap.x * rc.width;
                    var finalPosY = ap.y * rc.height;
                    // finalPosX += offW;
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
                    // finalPosY = allHeight - offset - ((1.0 - ap.y) * cs.height);
                    // subWidget.setPositionY(finalPosY +offH );
                    if (ti++ % maxColumn == maxColumn - 1) {
                        // allwidth = Math.max(allwidth, offW);
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
            // for (var x in children) {
            //     var subWidget = children[x];
            //     if (!(subWidget.isVisible())) { continue; }
            //     allwidth += children[x].getBoundingBox().width + spacingX;
            // }
            // allwidth -= spacingX;
            // allwidth += right + left;
            // allwidth = this._doChildrenCompareWidth(allwidth);
            // this._doChildrenLayoutContentSize(cc.size(allwidth, this.getContentSize().height));
            // for (var x in children) {
            //     var subWidget = children[x];
            //     if (!(subWidget.isVisible())) { continue; }
            //     var ap = subWidget.getAnchorPoint();
            //     var cs = subWidget.getBoundingBox();
            //     var finalPosX = ap.x * cs.width;
            //     switch (horizontal) {
            //         case ccui.Layout.LayoutHorizontal.LEFT:
            //             finalPosX += offset;
            //             break;
            //         case ccui.Layout.LayoutHorizontal.RIGHT:
            //             finalPosX = allwidth - offset - ((1.0 - ap.x) * cs.width);
            //             break;
            //         default:
            //             break;
            //     }
            //     offset += cs.width + spacingX;
            //     subWidget.setPositionX(finalPosX);
            // }
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
                // let e = kaayou.Event.create(kaayou.TouchEvent, kaayou.TouchEvent.TouchCance)
                // e.currentTarget = e.target = this;
                this['radioGroup']['setSelected'](this);
                // Event.recycle(e);
            }
            // onSelect(e: kaayou.CheckEvent) {
            //     let target:ccui.CheckBox = e.target;
            //     if (target instanceof ccui.CheckBox) {
            //         let bc = !target.isSelected();
            //         for(var x in this._radios){
            //             this._radios[x].setSelectedState(target === this._radios[x]);
            //         }
            //         if(bc != target.isSelected()){
            //             let e = kaayou.Event.create(kaayou.CheckEvent,   kaayou.RadioEvent.SELECTED)
            //             e.currentTarget = e.target = target;
            //             target.dispatch(e);
            //         }
            //     }
            // }
        };
    }
    function cc_Richtext_extend() {
        var proto = ccui.RichText.prototype;
        proto.property = { fontType: "Arial", fontSize: 20 };
        // _richElements 在原生设备上没有这个属性  需要自己管理
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
            /**
             * 在formatRenderers函数里面有一个变量locRenderersContainer，他保存了富文本的元素，但是如果改变富文本的锚点，
             * locRenderersContainer的锚点也会被改变，但是不管锚点如何变化，locRenderersContainer的坐标都是富文本的中心位置，代码如下
             * locRenderersContainer.setPosition(this._contentSize.width * 0.5, this._contentSize.height * 0.5);
             * 也就是说如果富文本的锚点不是（0.5,0.5）的话，就会偏移了，这个只有在编写代码的时候注意了，如果锚点不是中心，则要重新设置位置
             */
            if (self._textHorizontalAlignment === cc.TEXT_ALIGNMENT_LEFT) { //创建默认左对齐
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
                        //zyx200617
                        //按钮显示时点击，按钮隐藏后抬起，改为触发TouchCance事件
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
                        // console.log(kaayou.TouchEvent.TouchMove)
                        var e = kaayou.Event.create(kaayou.TouchEvent, kaayou.TouchEvent.TouchMove);
                        e.currentTarget = e.target = tager;
                        this.dispatch(e);
                        return true;
                    }
                    else if (type == ccui.Widget.TOUCH_BEGAN) {
                        // console.log(kaayou.TouchEvent.TouchStart)
                        var e = kaayou.Event.create(kaayou.TouchEvent, kaayou.TouchEvent.TouchStart);
                        e.currentTarget = e.target = tager;
                        this.dispatch(e);
                        return true;
                    }
                    else if (type == ccui.Widget.TOUCH_CANCELED) {
                        // console.log(kaayou.TouchEvent.TouchCance)
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
                // setTimeout(() => {
                kaayou.getController(cname).emit(e);
                // }, 0);
            }
            else {
                return new Promise(function (resole, rejct) {
                    var ackdata = {};
                    ackdata['@original'] = data;
                    ackdata['@ack'] = function (data) {
                        resole(data);
                    };
                    e.data = ackdata;
                    // setTimeout(() => {
                    kaayou.getController(cname).emit(e);
                    // }, 0);
                });
            }
        }
        else {
            if (data) {
                e.data = data;
                // setTimeout(() => {
                kaayou.getController(cname).emit(e);
                // }, 0);
            }
            else {
                // setTimeout(() => {
                kaayou.getController(cname).emit(e);
                // }, 0);
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
/// <reference path="decorator.ts" />
/// <reference path="encryp.ts" />
var kaayou;
(function (kaayou) {
    var Http = /** @class */ (function () {
        function Http() {
        }
        Http.GetRequest = function (search) {
            var url = search; //获取url中"?"符后的字串   
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
                    //发送断网提示
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
                                    //return false;
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
                                //return false;
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
                        //lw200610换了测试1线，超时时间改为15秒
                        xhr.timeout = 15000;
                        xhr.onreadystatechange = function () {
                            if (xhr.readyState == 4) {
                                if (xhr.status >= 200 && xhr.status < 400) {
                                    var response = xhr.responseText;
                                    //lw181123去掉bom头
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
                    //kaayou.emit("lobby", "ui::LoginScene::ShowSwitchLine");
                }
                if (kaayou['PlatformMgr']) {
                    if (kaayou['PlatformMgr'].getInstance().sys.GetNetInfo().type == "none") {
                        //发送断网提示
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
                            //return false;
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
            //json   application/json;charset=UTF-8
            //form   application/x-www-form-urlencoded
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
                    //发送断网提示
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
                            //lw200918这里只能放一个按钮，是否有取消按钮通过reversibility控制
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
                        //xhr.setRequestHeader("Accept-Encoding","gzip, deflate");
                        //lw201215因为经常有人在登录界面不显示登录按钮，所以改回15秒
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
                        //lw181129设置3秒钟没有返回就算超时，例如访问php配置超时
                        //lw201215回原成30秒
                        xhr.ontimeout = function () {
                            kaayou.emit("common", "ui::DebugPanel::Show", { msg: "超时！" });
                            errFunc({ code: "timeout" });
                        };
                        xhr.send(params);
                    }
                    catch (err) {
                        errFunc({ code: err });
                        //lw200310显示切线按钮
                        kaayou.emit("lobby", "ui::LoginScene::ShowSwitchLine");
                    }
                };
                if (kaayou['PlatformMgr']) {
                    var type = kaayou['PlatformMgr'].getInstance().sys.GetNetInfo().type;
                    if (type == "none") {
                        //发送断网提示
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
                } // "object"  )
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
/// <reference path="extend.ts" />
var kaayou;
(function (kaayou) {
    var ccclass = kaayou._decorator.ccclass;
    var DirectScene = /** @class */ (function (_super) {
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
    var MainScene = /** @class */ (function (_super) {
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
/// <reference path="extend.ts" />
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
    /**
     *
     * @param DirPath 解压的文件夹
     * @param srcPath 目标资源路径  输入本地apk中的文件
     * @param decPath copy 输出的路径
     * @param call 回调
     */
    function copyAndUnzipLocalPackage(DirPath, srcPath, decPath, call, progressCall) {
        //创建解压目录
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
            //回调进度
            progressCall && progressCall(3, curpro, toatl, cur);
        };
        kzip.onSuccess = function (curpro, toatl, cur) {
            console.log("解压成功");
            progressCall(4, 100, 0, 0);
            setTimeout(function () {
                //删除掉临时zip包
                jsb.fileUtils.removeFile(decPath);
                call();
            }, 100);
        };
        kzip.unzip(decPath, true);
        // console.log("开始同步解压");
        // if (!kzip.unzip(decPath)) { return false; }
        // jsb.fileUtils.removeFile(decPath);
    }
    //获取缓存目录
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
    //获取日志目录
    function getLogPath() {
        if (!cc.sys.isNative) {
            return "";
        }
        return jsb.fileUtils.getWritablePath() + "logs/";
    }
    kaayou.getLogPath = getLogPath;
    //获取资源目录
    function getRemotePath() {
        return jsb.fileUtils.getWritablePath() + "remote-assets/";
    }
    kaayou.getRemotePath = getRemotePath;
    //获取大厅热更版本
    function getLobbyVersion() {
        if (!cc.sys.isNative) {
            return App.version;
        }
        return getLocalVersion(kaayou.getRemotePath());
    }
    kaayou.getLobbyVersion = getLobbyVersion;
    //获取游戏版本
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
            //remoteasset 目录已存在
            return call();
        }
        var zipName = 'GameLobby.zip';
        // apk zip 地址
        var zipPath = jsb.fileUtils.fullPathForFilename(getLoaclAssetsPath() + zipName);
        //临时目录
        var tempPath = jsb.fileUtils.getWritablePath() + "remote-assets-temp/";
        // copy到的 临时zip 地址
        var tempzipPath = tempPath + zipName;
        if (!(zipPath && zipPath != '')) {
            //zip包不存在
            return call("无法获取资源");
        }
        progressCall && progressCall(1, 0, 0, 0);
        //准备解压  
        if (jsb.fileUtils.isDirectoryExist(tempPath)) {
            //上次解压失败 删除该目录
            jsb.fileUtils.removeDirectory(tempPath);
        }
        console.log("解压到临时目录:" + tempPath);
        copyAndUnzipLocalPackage(tempPath, zipPath, tempzipPath, function (err) {
            if (err) {
                return call(err);
            }
            //解压成功
            //重命名资源目录
            jsb.fileUtils.renameFile(jsb.fileUtils.getWritablePath(), "remote-assets-temp", "remote-assets");
            console.log("重命名:remote-assets-temp -> remote-assets");
            //回调上层
            return call();
        }, progressCall);
    }
    kaayou.unZipAssetsPath = unZipAssetsPath;
    function ExistModule(modeulename) {
        var remoteSeachPathRoot = kaayou.getRemotePath();
        //搜索路劲
        var moduleSearchPath = "" + remoteSeachPathRoot + modeulename;
        if (!jsb.fileUtils.isDirectoryExist(moduleSearchPath)) {
            return null;
        }
        //描述文件根目录
        var hotProjectFilePath = "";
        if (modeulename == 'common' || modeulename == 'lobby') {
        }
        else {
            hotProjectFilePath = moduleSearchPath + "/project.manifest";
            if (!jsb.fileUtils.isFileExist(hotProjectFilePath)) {
                return null;
            }
        }
        //完整模块路径
        var moduleSrcPath = moduleSearchPath + "/src/" + modeulename;
        if (!jsb.fileUtils.isDirectoryExist(moduleSrcPath)) {
            return null;
        }
        //js文件路径
        var moduleFilePath = moduleSrcPath + "/" + modeulename + ".module.js";
        if (!jsb.fileUtils.isFileExist(moduleFilePath)) {
            return null;
        }
        //文件相对路径
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
    //获取本地所有模块
    function getLocalModules() {
        //获取资源目录
        var remoteSeachPathRoot = kaayou.getRemotePath();
        var filelist = jsb.fileUtils.listFiles(remoteSeachPathRoot);
        //目录列表
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
/// <reference path="extend.ts" />
var kaayou;
(function (kaayou) {
    var ccclass = kaayou._decorator.ccclass;
    var ImageView = /** @class */ (function (_super) {
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
/// <reference path="extend.ts" />
var kaayou;
(function (kaayou) {
    var ccclass = kaayou._decorator.ccclass;
    var Layer = /** @class */ (function (_super) {
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
    var Block = /** @class */ (function (_super) {
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
    var ModelLayer = /** @class */ (function (_super) {
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
    var LayerSeq = /** @class */ (function () {
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
        var Base = /** @class */ (function () {
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
/// <reference path="decorator.ts" />
var kaayou;
(function (kaayou) {
    var _a = kaayou._decorator, doBindEvent = _a.doBindEvent, BindEvent = _a.BindEvent, CustomBindEvetn = _a.CustomBindEvetn;
    var kaWebSocket = /** @class */ (function () {
        function kaWebSocket(name) {
            /////1111
            this.ws = null;
            // onconnect: (id: number) => void = null;
            // onmessage: (id: number, mid: number, sid: number, data: any, datalen: number) => void = null;
            // onclose: (id: number) => void = null;
            // ondisconnect: (id: number) => void = null;
            // onreconnect: (id: number) => void = null;
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
            // this.init();
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
            // this.ws = null;
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
            // console.log(e.data);
            // var buf = new Uint8Array(e.data);
            // var pdata = TextCoder.decode('utf8' , new Uint8Array(e.data)) ;
            var unit8Arr = new Uint8Array(e.data);
            var t = new Date().getTime() / 1000;
            var encodedString;
            if (cc.sys.isNative)
                encodedString = String.fromCharCode.apply(null, unit8Arr);
            else
                encodedString = bigUnit8ToChar(unit8Arr);
            var pdata = decodeURIComponent(escape((encodedString))); //没有这一步中文会乱码
            kaayou.emit(this.name, "ws::onMessage", pdata);
            try {
                var res = JSON.parse(pdata);
                if (typeof res != 'object') {
                    console.error("Ka_MSG_RES", pdata);
                    throw Error('message is not object');
                } // "object"  )
                var msghead = res.head;
                if (!msghead) {
                    console.error("Ka_MSG_RES", pdata);
                    throw Error('msghead is undefine');
                }
                if ("ping" !== msghead) {
                    console.log("sendMessage:接受" + this.name, msghead, res);
                }
                else {
                    // console.log(this.name , 'pong');
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
                if (msghead == "ping") { //通过ping来计算网络延时
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
                //utf-8 最高会用到 3个8位进行记录 utf-16扩展可以最大到两个 0xff 65535 + 65535的组合   
                var chunk = 4 * 3 * 1024;
                var i;
                for (i = 0; i < array.length / chunk; i++) {
                    res += String.fromCharCode.apply(null, array.slice(i * chunk, (i + 1) * chunk));
                }
                res += String.fromCharCode.apply(null, array.slice(i * chunk));
                return res;
            }
            // if (this.onmessage) {
            //     // let buf = new kaBuffer(e.data);
            //     // // let mid = buf.readUsort();
            //     // // let sid = buf.readUsort();
            //     // // let len = buf.readUint();
            //     // // buf.Offset = 10;
            //     // buf.Offset =0;
            //     // let mid = buf.readUsort();
            //     // let sid = buf.readUsort();
            //     // let len = buf.byteLength - 4;
            //     // let ub = new Uint8Array(buf.readByteArray(len))
            //     // this.onmessage(this.id, mid, sid, ub.buffer, len);
            // }
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
            // readonly CLOSED: number;
            // readonly CLOSING: number;
            // readonly CONNECTING: number;
            // readonly OPEN: number;
        };
        kaWebSocket.prototype.__onclose = function (e) {
            cc.log(e);
            this.__clearT();
            //e.code
            // 1000          正常关闭       当你的会话成功完成时发送这个代码
            // 1001          离开           因应用程序离开且不期望后续的连接尝试而关闭连接时，发送这一代码。服务器可能关闭，或者客户端应用程序可能关闭
            // 1002          协议错误       当因协议错误而关闭连接时发送这一代码
            // 1003     不可接受的数据类型  当应用程序接收到一条无法处理的意外类型消息时发送这一代码
            // 1004          保留           不要发送这一代码。根据 RFC 6455，这个状态码保留，可能在未来定义
            // 1005          保留           不要发送这一代码。WebSocket API 用这个代码表示没有接收到任何代码
            // 1006          保留           不要发送这一代码。WebSocket API 用这个代码表示连接异常关闭
            // 1007          无效数据       在接收一个格式与消息类型不匹配的消息之后发送这一代码。如果文本消息包含错误格式的 UTF-8 数据，连接应该用这个代码关闭
            // 1008          消息违反政策    当应用程序由于其他代码所不包含的原因终止连接，或者不希望泄露消息无法处理的原因时，发送这一代码
            // 1009          消息过大        当接收的消息太大，应用程序无法处理时发送这一代码（记住，帧的载荷长度最多为64 字节。即使你有一个大服务器，有些消息
            // 也仍然太大。）
            // 1010          需要扩展        当应用程序需要一个或者多个服务器无法协商的特殊扩展时，从客户端（浏览器）发送这一代码
            // 1011          意外情况       当应用程序由于不可预见的原因，无法继续处理连接时，发送这一代码
            // 1015      TLS失败（保留） 不要发送这个代码。WebSocket API 用这个代码表示 TLS 在 WebSocket 握手之前失败。
            // 0 ～ 999        禁止              1000 以下的代码是无效的，不能用于任何目的
            // 1000 ～ 2999    保留              这些代码保留以用于扩展和 WebSocket 协议的修订版本。按照标准规定使用这些代码，参见表 3-4
            // 3000 ～ 3999   需要注册          这些代码用于“程序库、框架和应用程序”。这些代码应该在 IANA（互联网编号分配机构）公开注册
            // 4000 ～ 4999   私有             在应用程序中将这些代码用于自定义用途。因为它们没有注册，所以不要期望它们能被其他 WebSocket广泛理解
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
                    //console.log(this.name , 'ping' );
                }
                else {
                    console.log("sendMessage:发送" + this.name, toData, JSON.stringify(toData));
                }
                this.ws.send(JSON.stringify(toData));
            }
            catch (err) {
            }
            //  let buf = new kaBuffer(4 + len);
            //  buf.reset();
            // // buf.wirteSort(mid);
            // // buf.wirteSort(sid);
            // // buf.wirteUint(len);
            // // buf.Offset = 10;
            // // buf.wirteByteArray(buff, 0, len);
            // // buf.Offset = 4;
            // buf.wirteUSort(mid);
            // buf.wirteUSort(sid);
            // buf.wirteByteArray(buff, 0, len);
            // this.ws.send(buf.buffer);
            // cc.log(new Uint8Array(buf.buffer)); 
        };
        return kaWebSocket;
    }());
    kaayou.kaWebSocket = kaWebSocket;
})(kaayou || (kaayou = {}));
/// <reference path="Socket.ts" />
var kaayou;
(function (kaayou) {
    var NetManager = /** @class */ (function () {
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
                            // self._needReConnectSockets[name] = {
                            //     delaytime: Date.unix(),
                            //     count: 0
                            // }
                            if (self._reConConfig[name]) {
                                // this._reConConfig[name]
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
            // if (data.code != 1000 && !lodash.isEmpty(data.name)) {
            //     let s = this.runingSockets[data.name];
            //     if (!s) { return; }
            //     console.error(data.name + "意外断开");
            // }
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
                if (true == s.getIsConnected() && false == s.getInitiative() /*&& false == s.checkLife() && */) {
                    //说明是已启动的so
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
            // var pid = obj.constructor.prototype.__pid;
            // if (!pid) {
            //     var desc = { writable: true, enumerable: false, configurable: true, value: -1 };
            //     pid = classManager.getNewID();
            //     desc.value = pid;
            //     Object.defineProperty(obj.constructor.prototype, '__pid', desc);
            // }
            // var pid = 0;
            // if (obj.constructor.hasOwnProperty('__pid')) {
            //     pid = obj.constructor.__pid;
            // }
            // // if (target.constructor.name == 'CreateRoomPanel') {
            // //     console.error("CreateRoomPanel", did)
            // // }
            // if (!pid) {
            //     pid = classManager.getNewID();
            //     obj.constructor.__pid = pid;
            // }
            var pid = getTargetPID(obj);
            if (!_pool[pid]) {
                _pool[pid] = [];
            }
            // JSB retain to avoid being auto released
            obj.retain && obj.retain();
            // User implementation for disable the object
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
                            // JSB release to avoid memory leak
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
                // User implementation for re-enable the object
                obj.reuse && obj.reuse.apply(obj, args);
                // JSB release to avoid memory leak
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
                    // JSB release to avoid memory leak
                    obj.release && obj.release();
                }
            }
            _pool = {};
        }
        pool.drainAllPools = drainAllPools;
    })(pool = kaayou.pool || (kaayou.pool = {}));
    // var pool2 = {
    //     _pool: {},
    //     _releaseCB: function () {
    //         release();
    //     },
    //     _autoRelease: function (obj) {
    //         var running = obj._running === undefined ? false : !obj._running;
    //         cc.director.getScheduler().scheduleCallbackForTarget(obj, _releaseCB, 0, 0, 0, running)
    //     },
    //     /**
    //      * Put the obj in pool
    //      * @param obj
    //      */
    //     putInPool: function (obj) {
    //         var pid = obj.constructor.prototype.__pid;
    //         if (!pid) {
    //             var desc = { writable: true, enumerable: false, configurable: true, value: -1 };
    //             desc.value = ClassManager.getNewID();
    //             Object.defineProperty(obj.constructor.prototype, '__pid', desc);
    //         }
    //         if (!_pool[pid]) {
    //             _pool[pid] = [];
    //         }
    //         // JSB retain to avoid being auto released
    //         obj.retain && obj.retain();
    //         // User implementation for disable the object
    //         obj.unuse && obj.unuse();
    //         _pool[pid].push(obj);
    //     },
    //     /**
    //      * Check if this kind of obj has already in pool
    //      * @param objClass
    //      * @returns {boolean} if this kind of obj is already in pool return true,else return false;
    //      */
    //     hasObject: function (objClass) {
    //         var pid = objClass.prototype.__pid;
    //         var list = _pool[pid];
    //         if (!list || list.length == 0) {
    //             return false;
    //         }
    //         return true;
    //     },
    //     /**
    //      * Remove the obj if you want to delete it;
    //      * @param obj
    //      */
    //     removeObject: function (obj) {
    //         var pid = obj.constructor.prototype.__pid;
    //         if (pid) {
    //             var list = _pool[pid];
    //             if (list) {
    //                 for (var i = 0; i < list.length; i++) {
    //                     if (obj === list[i]) {
    //                         // JSB release to avoid memory leak
    //                         obj.release && obj.release();
    //                         list.splice(i, 1);
    //                     }
    //                 }
    //             }
    //         }
    //     },
    //     /**
    //      * Get the obj from pool
    //      * @param args
    //      * @returns {*} call the reuse function an return the obj
    //      */
    //     getFromPool: function (objClass/*,args*/) {
    //         if (hasObject(objClass)) {
    //             var pid = objClass.prototype.__pid;
    //             var list = _pool[pid];
    //             var args = Array.prototype.slice.call(arguments);
    //             args.shift();
    //             var obj = list.pop();
    //             // User implementation for re-enable the object
    //             obj.reuse && obj.reuse.apply(obj, args);
    //             // JSB release to avoid memory leak
    //             cc.sys.isNative && obj.release && _autoRelease(obj);
    //             return obj;
    //         }
    //     },
    //     /**
    //      *  remove all objs in pool and reset the pool
    //      */
    //     drainAllPools: function () {
    //         for (var i in _pool) {
    //             for (var j = 0; j < _pool[i].length; j++) {
    //                 var obj = _pool[i][j];
    //                 // JSB release to avoid memory leak
    //                 obj.release && obj.release();
    //             }
    //         }
    //         _pool = {};
    //     }
    // };
})(kaayou || (kaayou = {}));
var kaayou;
(function (kaayou) {
    var ResManager = /** @class */ (function () {
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
/// <reference path="extend.ts" />
var kaayou;
(function (kaayou) {
    var ccclass = kaayou._decorator.ccclass;
    var kScene = /** @class */ (function (_super) {
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
/// <reference path="extend.ts" />
var kaayou;
(function (kaayou) {
    var ccclass = kaayou._decorator.ccclass;
    var ScrollView = /** @class */ (function (_super) {
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
    //   export class CuttingScrollView extends kaayou.ScrollView {
    //         constructor() {
    //             super();
    //             this.removeAllChildren();
    //             this.setDirection(ccui.ScrollView.DIR_VERTICAL);
    //         }
    //         /**
    //          * Add child to ccui.ScrollView.
    //          * @param {cc.Node} widget
    //          * @param {Number} [zOrder]
    //          * @param {Number|string} [tag] tag or name
    //          * @returns {boolean}
    //          */
    //         addChild(widget, zOrder?, tag?) {
    //             // if (!widget)
    //             //     return false;
    //             // if (this._isInContainer(widget) === false)
    //             //     widget._inViewRect = false;
    //             // zOrder = zOrder || widget.getLocalZOrder();
    //             // tag = tag || widget.getTag();
    //             return ccui.Layout.prototype.addChild.call(this, widget, zOrder, tag);
    //             // return this.addProtectedChild(widget, zOrder, tag);    //this._innerContainer.addChild(widget, zOrder, tag);
    //         }
    //         _initScrollBar() {
    //             // if(this._direction !== ccui.ScrollView.DIR_HORIZONTAL && !this._verticalScrollBar)
    //             // {
    //             //     this._verticalScrollBar = new ccui.ScrollViewBar(this, ccui.ScrollView.DIR_VERTICAL);
    //             //     this.addProtectedChild(this._verticalScrollBar, 2);
    //             // }
    //             // if(this._direction !== ccui.ScrollView.DIR_VERTICAL && !this._horizontalScrollBar)
    //             // {
    //             //     this._horizontalScrollBar = new ccui.ScrollViewBar(this, ccui.ScrollView.DIR_HORIZONTAL);
    //             //     this.addProtectedChild(this._horizontalScrollBar, 2);
    //             // }
    //         }
    //         removeAllChildren() {
    //             this.removeAllChildrenWithCleanup(true);
    //         }
    //         removeAllChildrenWithCleanup(cleanup) {
    //             ccui.Layout.prototype.removeAllChildren.call(this, cleanup);
    //             // this._innerContainer.removeAllChildrenWithCleanup(cleanup);
    //         }
    //         _onSizeChanged() {
    //             ccui.Layout.prototype._onSizeChanged.call(this);
    //             var locSize = this._contentSize;
    //             this._topBoundary = locSize.height ;
    //             this._rightBoundary = locSize.width ;
    //             var innerSize = this.getInnerContainerSize();
    //             // this._innerContainer.setContentSize(cc.size(Math.max(innerSize.width, locSize.width), Math.max(innerSize.height, locSize.height)));
    //             // this._innerContainer.setPosition(0, locSize.height - this._innerContainer.getContentSize().height);
    //             this.__innerContainerWidth = Math.max(innerSize.width, locSize.width);
    //             this.__innerContainerHeight = Math.max(innerSize.height, locSize.height);
    //             this.__innerContainerX = 0.0;
    //             this.__innerContainerY = locSize.height - this.__innerContainerHeight ;
    //             // if(this._verticalScrollBar)
    //             //     this._verticalScrollBar.onScrolled(this._getHowMuchOutOfBoundary());
    //             // if(this._horizontalScrollBar)
    //             //     this._horizontalScrollBar.onScrolled(this._getHowMuchOutOfBoundary());
    //         }
    //         setInnerContainerSize(size) {
    //             //     var innerContainer = this._innerContainer,
    //             var locSize = this._contentSize,
    //                 innerSizeWidth = locSize.width, innerSizeHeight = locSize.height;
    //             if (size.width < locSize.width)
    //                 cc.log("Inner width <= ScrollView width, it will be force sized!");
    //             else
    //                 innerSizeWidth = size.width;
    //             if (size.height < locSize.height)
    //                 cc.log("Inner height <= ScrollView height, it will be force sized!");
    //             else
    //                 innerSizeHeight = size.height;
    //             //    innerContainer.setContentSize(cc.size(innerSizeWidth, innerSizeHeight));
    //             this.__innerContainerWidth = innerSizeWidth ;
    //             this.__innerContainerHeight = innerSizeHeight ;
    //             //    var pos = this._innerContainer.getPosition();
    //             var pos = this.getInnerContainerPosition();
    //             //    var contAP = this._innerContainer.getAnchorPoint();
    //             //    if (this._innerContainer.getLeftBoundary() != 0.0)
    //             //    {
    //             //        pos.x = contAP.x * innerSizeWidth;
    //             //    }
    //             //    if (this._innerContainer.getTopBoundary() != this._contentSize.height)
    //             //    {
    //             //        pos.y = this._contentSize.height - (1.0 - contAP.y) * innerSizeHeight;
    //             //    }
    //             if (this.getinnerLeftBoundary() != 0.0) {
    //                 pos.x = innerSizeWidth ;
    //             }
    //             if (this.getinnerTopBoundary() != this._contentSize.height) {
    //                 pos.y = this._contentSize.height - innerSizeHeight ;
    //             }
    //             this.setInnerContainerPosition(pos);
    //             //    this._updateScrollBar(cc.p(0 ,0));
    //         }
    //         getChildren():cc.Node[]{
    //             return ccui.Layout.prototype.getChildren.call(this);
    //         }
    //         _setInnerWidth(width) {
    //             // var locW = this._contentSize.width,
    //             //     innerWidth = locW,
    //             //     container = this._innerContainer,
    //             //     oldInnerWidth = container.width;
    //             // if (width < locW)
    //             //     cc.log("Inner width <= scrollview width, it will be force sized!");
    //             // else
    //             //     innerWidth = width;
    //             // container.width = innerWidth;
    //             // switch (this._direction) {
    //             //     case ccui.ScrollView.DIR_HORIZONTAL:
    //             //     case ccui.ScrollView.DIR_BOTH:
    //             //         if (container.getRightBoundary() <= locW) {
    //             //             var newInnerWidth = container.width;
    //             //             var offset = oldInnerWidth - newInnerWidth;
    //             //             this._scrollChildren(offset, 0);
    //             //         }
    //             //         break;
    //             // }
    //             // var innerAX = container.anchorX;
    //             // if (container.getLeftBoundary() > 0.0)
    //             //     container.x = innerAX * innerWidth;
    //             // if (container.getRightBoundary() < locW)
    //             //     container.x = locW - ((1.0 - innerAX) * innerWidth);
    //         }
    //         _setInnerHeight(height) {
    //             // var locH = this._contentSize.height,
    //             //     innerHeight = locH,
    //             //     container = this._innerContainer,
    //             //     oldInnerHeight = container.height;
    //             // if (height < locH)
    //             //     cc.log("Inner height <= scrollview height, it will be force sized!");
    //             // else
    //             //     innerHeight = height;
    //             // container.height = innerHeight;
    //             // switch (this._direction) {
    //             //     case ccui.ScrollView.DIR_VERTICAL:
    //             //     case ccui.ScrollView.DIR_BOTH:
    //             //         var newInnerHeight = innerHeight;
    //             //         var offset = oldInnerHeight - newInnerHeight;
    //             //         this._scrollChildren(0, offset);
    //             //         break;
    //             // }
    //             // var innerAY = container.anchorY;
    //             // if (container.getLeftBoundary() > 0.0)
    //             //     container.y = innerAY * innerHeight;
    //             // if (container.getRightBoundary() < locH)
    //             //     container.y = locH - ((1.0 - innerAY) * innerHeight);
    //         }
    //         /**
    //          * Set inner container position
    //          *
    //          * @param {cc.Point} position Inner container position.
    //          */
    //         setInnerContainerPosition(position: cc.Point) {
    //             // if (position.x === this._innerContainer.getPositionX() && position.y === this._innerContainer.getPositionY()) {
    //             //     return;
    //             // }
    //             if (position.x === this.getinnerPositionX() && position.y === this.getinnerPositionY()) {
    //                 return;
    //             }
    //             // this._innerContainer.setPosition(position);
    //             let mx =  this.__innerContainerX -position.x;
    //             let my =  this.__innerContainerY - position.y;
    //             this.__innerContainerX = position.x ;
    //             this.__innerContainerY = position.y;
    //             let children = this.getChildren();
    //             for(var x in children){
    //                 let tpos =   children[x].getPosition();
    //                 children[x].setPosition( tpos.x + mx ,tpos.y + my  );
    //             }
    //             let showlabel: ccui.Text = ccui.helper.seekWidgetByName(<ccui.Widget>this.parent, "showscr");
    //             if (showlabel) {
    //                 showlabel.setString(`w:${this.__innerContainerWidth} -- h:${this.__innerContainerHeight} --- x:${this.__innerContainerX} -- y:${this.__innerContainerY}`);
    //             }
    //             this._outOfBoundaryAmountDirty = true;
    //             // // Process bouncing events
    //             if (this.bounceEnabled) {
    //                 for (var _direction = ccui.ScrollView.MOVEDIR_TOP; _direction < ccui.ScrollView.MOVEDIR_RIGHT; ++_direction) {
    //                     if (this._isOutOfBoundary(_direction)) {
    //                         this._processScrollEvent(_direction, true);
    //                     }
    //                 }
    //             }
    //             this._dispatchEvent(ccui.ScrollView.EVENT_CONTAINER_MOVED);
    //         }
    //         /**
    //          * Get inner container position
    //          *
    //          * @return The inner container position.
    //          */
    //         getInnerContainerPosition(): cc.Point {
    //             return cc.p(this.__innerContainerX, this.__innerContainerY);//this._innerContainer.getPosition();
    //         }
    //         /**
    //      * Returns inner container size of ScrollView.     <br/>
    //      * Inner container size must be larger than or equal ScrollView's size.
    //      *
    //      * @return {cc.Size} inner container size.
    //      */
    //         getInnerContainerSize(): cc.Size {
    //             return cc.size(this.__innerContainerWidth, this.__innerContainerHeight);//this._innerContainer.getContentSize();
    //         }
    //         _isInContainer(widget) {
    //             // if (!this._clippingEnabled)
    //             //     return true;
    //             // var wPos = widget._position,
    //             //     wSize = widget._contentSize,
    //             //     wAnchor = widget._anchorPoint,
    //             //     size = this._customSize,
    //             //     pos = this._innerContainer._position,
    //             //     bottom = 0, left = 0;
    //             // if (
    //             //     // Top
    //             // (bottom = wPos.y - wAnchor.y * wSize.height) >= size.height - pos.y ||
    //             //     // Bottom
    //             // bottom + wSize.height <= -pos.y ||
    //             //     // right
    //             // (left = wPos.x - wAnchor.x * wSize.width) >= size.width - pos.x ||
    //             //     // left
    //             // left + wSize.width <= -pos.x
    //             // )
    //             //     return false;
    //             // else return true;
    //             return true;
    //         }
    //         updateChildren() {
    //             // var child, i, l;
    //             // var childrenArray = this._innerContainer._children;
    //             // for (i = 0, l = childrenArray.length; i < l; i++) {
    //             //     child = childrenArray[i];
    //             //     if (child._inViewRect === true && this._isInContainer(child) === false)
    //             //         child._inViewRect = false;
    //             //     else if (child._inViewRect === false && this._isInContainer(child) === true)
    //             //         child._inViewRect = true;
    //             // }
    //         }
    //         __innerContainerX = 0.0;
    //         __innerContainerY = 0.0;
    //         __innerContainerWidth = 0.0;
    //         __innerContainerHeight = 0.0;
    //         _getInnerWidth() {
    //             return this.__innerContainerWidth;
    //         }
    //         getInnerWidth() {
    //             return this.__innerContainerWidth;//this._innerContainer.width;
    //         }
    //         getInnerHeight() {
    //             return this.__innerContainerHeight;// this._innerContainer.height;
    //         }
    //         _getInnerHeight() {
    //             return this.__innerContainerHeight;// this._innerContainer.height;
    //         }
    //         getinnerPositionX() {
    //             return this.__innerContainerX;
    //         }
    //         getinnerPositionY() {
    //             return this.__innerContainerY;
    //         }
    //         getinnerLeftBoundary() {
    //             //return this.getPositionX() - this._getAnchorX() * this._contentSize.width;
    //             return this.__innerContainerX ;
    //         }
    //         getinnerTopBoundary() {
    //             //return this.getBottomBoundary() + this._contentSize.height;
    //             return this.getinnerBottomBoundary() + this.__innerContainerHeight;
    //         }
    //         getinnerBottomBoundary() {
    //             // return this.getPositionY() - this._getAnchorY() * this._contentSize.height;
    //             return this.__innerContainerY;
    //         }
    //         getinnerRightBoundary() {
    //             // return this.getLeftBoundary() + this._contentSize.width;
    //             return this.getinnerLeftBoundary() + this.__innerContainerWidth;
    //         }
    //         _getHowMuchOutOfBoundary(addition?: cc.Point) {
    //             if (addition === undefined)
    //                 addition = cc.p(0, 0);
    //             if (addition.x === 0 && addition.y === 0 && !this._outOfBoundaryAmountDirty) {
    //                 return this._outOfBoundaryAmount;
    //             }
    //             var outOfBoundaryAmount = cc.p(0, 0);
    //             if (this.getinnerLeftBoundary() + addition.x > this._leftBoundary) {
    //                 outOfBoundaryAmount.x = this._leftBoundary - (this.getinnerLeftBoundary()  + addition.x);
    //             }
    //             else if (this.getinnerRightBoundary() + addition.x < this._rightBoundary) {
    //                 outOfBoundaryAmount.x = this._rightBoundary - (this.getinnerRightBoundary()  + addition.x);
    //             }
    //             if (this.getinnerTopBoundary() + addition.y < this._topBoundary) {
    //                 outOfBoundaryAmount.y = this._topBoundary - (this.getinnerTopBoundary() + addition.y);
    //             }
    //             else if (this.getinnerBottomBoundary() + addition.y > this._bottomBoundary) {
    //                 outOfBoundaryAmount.y = this._bottomBoundary - (this.getinnerBottomBoundary() + addition.y);
    //             }
    //             if (addition.x === 0 && addition.y === 0) {
    //                 this._outOfBoundaryAmount = outOfBoundaryAmount;
    //                 this._outOfBoundaryAmountDirty = false;
    //             }
    //             return outOfBoundaryAmount;
    //         }
    //         _startAutoScroll(deltaMove, timeInSec: number, attenuated: boolean) {
    //             var adjustedDeltaMove = this._flattenVectorByDirection(deltaMove);
    //             this._autoScrolling = true;
    //             this._autoScrollTargetDelta = adjustedDeltaMove;
    //             this._autoScrollAttenuate = attenuated;
    //             this._autoScrollStartPosition = this.getInnerContainerPosition();
    //             this._autoScrollTotalTime = timeInSec;
    //             this._autoScrollAccumulatedTime = 0;
    //             this._autoScrollBraking = false;
    //             this._autoScrollBrakingStartPosition = cc.p(0, 0);
    //             // If the destination is also out of boundary of same side, start brake from beggining.
    //             // 如果目的地也在同一条边的边界之外，刹车。
    //             var currentOutOfBoundary = this._getHowMuchOutOfBoundary();
    //             if (!this._fltEqualZero(currentOutOfBoundary)) {
    //                 this._autoScrollCurrentlyOutOfBoundary = true;
    //                 var afterOutOfBoundary = this._getHowMuchOutOfBoundary(adjustedDeltaMove);
    //                 if (currentOutOfBoundary.x * afterOutOfBoundary.x > 0 || currentOutOfBoundary.y * afterOutOfBoundary.y > 0) {
    //                     this._autoScrollBraking = true;
    //                 }
    //             }
    //         }
    //         _moveInnerContainer(deltaMove, canStartBounceBack) {
    //             var adjustedMove = this._flattenVectorByDirection(deltaMove);
    //             this.setInnerContainerPosition(cc.pAdd(this.getInnerContainerPosition(), adjustedMove));
    //             var outOfBoundary = this._getHowMuchOutOfBoundary();
    //             // this._updateScrollBar(outOfBoundary);
    //             if (this.bounceEnabled && canStartBounceBack) {
    //                 this._startBounceBackIfNeeded();
    //             }
    //         }
    //         _scrollChildren(deltaMove: cc.Point) {
    //             var realMove = deltaMove;
    //             if (this.bounceEnabled) {
    //                 // If the position of the inner container is out of the boundary, the offsets should be divided by two.
    //                 var outOfBoundary = this._getHowMuchOutOfBoundary();
    //                 realMove.x *= (outOfBoundary.x == 0 ? 1 : 0.5);
    //                 realMove.y *= (outOfBoundary.y == 0 ? 1 : 0.5);
    //             }
    //             realMove.x = Number(realMove.x.toFixed(3));
    //             realMove.y = Number(realMove.y.toFixed(3));
    //             if (!this.bounceEnabled) {
    //                 var outOfBoundary = this._getHowMuchOutOfBoundary(realMove);
    //                 // realMove.x += outOfBoundary.x;
    //                 // realMove.y += outOfBoundary.y;
    //                 realMove.x += Number(outOfBoundary.x.toFixed(3));
    //                 realMove.y +=  Number(outOfBoundary.y.toFixed(3));
    //             }
    //             var scrolledToLeft = false;
    //             var scrolledToRight = false;
    //             var scrolledToTop = false;
    //             var scrolledToBottom = false;
    //             if (realMove.y > 0.0) // up
    //             {
    //                 var icBottomPos = this.getinnerBottomBoundary()//.getBottomBoundary();
    //                 if (icBottomPos + realMove.y >= this._bottomBoundary) {
    //                     scrolledToBottom = true;
    //                 }
    //             }
    //             else if (realMove.y < 0.0) // down
    //             {
    //                 var icTopPos = this.getinnerTopBoundary()//this._innerContainer.getTopBoundary();
    //                 if (icTopPos + realMove.y <= this._topBoundary) {
    //                     scrolledToTop = true;
    //                 }
    //             }
    //             if (realMove.x < 0.0) // left
    //             {
    //                 var icRightPos = this.getinnerRightBoundary()//this._innerContainer.getRightBoundary();
    //                 if (icRightPos + realMove.x <= this._rightBoundary) {
    //                     scrolledToRight = true;
    //                 }
    //             }
    //             else if (realMove.x > 0.0) // right
    //             {
    //                 var icLeftPos = this.getinnerLeftBoundary();//this._innerContainer.getLeftBoundary();
    //                 if (icLeftPos + realMove.x >= this._leftBoundary) {
    //                     scrolledToLeft = true;
    //                 }
    //             }
    //             this._moveInnerContainer(realMove, false);
    //             if (realMove.x != 0 || realMove.y != 0) {
    //                 this._processScrollingEvent();
    //             }
    //             if (scrolledToBottom) {
    //                 this._processScrollEvent(ccui.ScrollView.MOVEDIR_BOTTOM, false);
    //             }
    //             if (scrolledToTop) {
    //                 this._processScrollEvent(ccui.ScrollView.MOVEDIR_TOP, false);
    //             }
    //             if (scrolledToLeft) {
    //                 this._processScrollEvent(ccui.ScrollView.MOVEDIR_LEFT, false);
    //             }
    //             if (scrolledToRight) {
    //                 this._processScrollEvent(ccui.ScrollView.MOVEDIR_RIGHT, false);
    //             }
    //         }
    //         _startAutoScrollToDestination(destination, timeInSec, attenuated) {
    //             this._startAutoScroll(cc.pSub(destination, this.getInnerContainerPosition()), timeInSec, attenuated);
    //         }
    //         scrollToBottom(time, attenuated) {
    //             this._startAutoScrollToDestination(cc.p(this.getinnerPositionX(), 0), time, attenuated);
    //         }
    //         /**
    //          * Scroll inner container to top boundary of ScrollView.
    //          * @param {Number} time
    //          * @param {Boolean} attenuated
    //          */
    //         scrollToTop(time, attenuated) {
    //             // this._startAutoScrollToDestination(
    //             //     cc.p(this._innerContainer.getPositionX(), this._contentSize.height - this._innerContainer.getContentSize().height), time, attenuated);
    //             this._startAutoScrollToDestination(
    //                 cc.p(this.getinnerPositionX(), this._contentSize.height - this.getInnerHeight()), time, attenuated);
    //         }
    //         /**
    //          * Scroll inner container to left boundary of ScrollView.
    //          * @param {Number} time
    //          * @param {Boolean} attenuated
    //          */
    //         scrollToLeft(time, attenuated) {
    //             // this._startAutoScrollToDestination(cc.p(0, this._innerContainer.getPositionY()), time, attenuated);
    //             this._startAutoScrollToDestination(cc.p(0, this.getinnerPositionY()), time, attenuated);
    //         }
    //         /**
    //          * Scroll inner container to right boundary of ScrollView.
    //          * @param {Number} time
    //          * @param {Boolean} attenuated
    //          */
    //         scrollToRight(time, attenuated) {
    //             // this._startAutoScrollToDestination(
    //             //     cc.p(this._contentSize.width - this._innerContainer.getContentSize().width, this._innerContainer.getPositionY()), time, attenuated);
    //             this._startAutoScrollToDestination(
    //                 cc.p(this._contentSize.width - this.getInnerWidth(),
    //                     this.getinnerPositionY()), time, attenuated);
    //         }
    //         scrollToTopRight(time, attenuated) {
    //             if (this._direction !== ccui.ScrollView.DIR_BOTH) {
    //                 cc.log("Scroll direction is not both!");
    //                 return;
    //             }
    //             //var inSize = this._innerContainer.getContentSize();
    //             var inSize = this.getInnerContainerSize();
    //             this._startAutoScrollToDestination(cc.p(this._contentSize.width - inSize.width,
    //                 this._contentSize.height - inSize.height), time, attenuated);
    //         }
    //         scrollToBottomRight(time, attenuated) {
    //             if (this._direction !== ccui.ScrollView.DIR_BOTH) {
    //                 cc.log("Scroll direction is not both!");
    //                 return;
    //             }
    //             // this._startAutoScrollToDestination(cc.p(this._contentSize.width - this._innerContainer.getContentSize().width, 0), time, attenuated);
    //             this._startAutoScrollToDestination(cc.p(this._contentSize.width - this.getInnerWidth(), 0), time, attenuated);
    //         }
    //         scrollToPercentVertical(percent, time, attenuated) {
    //             // var minY = this._contentSize.height - this._innerContainer.getContentSize().height;
    //             var minY = this._contentSize.height - this.getInnerHeight();
    //             var h = -minY;
    //             // this._startAutoScrollToDestination(cc.p(this._innerContainer.getPositionX(), minY + percent * h / 100), time, attenuated);
    //             this._startAutoScrollToDestination(cc.p(this.getinnerPositionX(), minY + percent * h / 100), time, attenuated);
    //         }
    //         scrollToPercentHorizontal(percent, time, attenuated) {
    //             // var w = this._innerContainer.getContentSize().width - this._contentSize.width;
    //             var w = this.getInnerWidth() - this._contentSize.width;
    //             this._startAutoScrollToDestination(cc.p(-(percent * w / 100), this.getinnerPositionY()), time, attenuated);
    //         }
    //         _jumpToDestination(desOrX, y) {
    //             if (desOrX.x === undefined) {
    //                 desOrX = cc.p(desOrX, y);
    //             }
    //             this._autoScrolling = false;
    //             this._moveInnerContainer(cc.pSub(desOrX, this.getInnerContainerPosition()), true);
    //         }
    //         scrollToPercentBothDirection(percent, time, attenuated) {
    //             if (this._direction !== ccui.ScrollView.DIR_BOTH)
    //                 return;
    //             // var minY = this._contentSize.height - this._innerContainer.getContentSize().height;
    //             var minY = this._contentSize.height - this.getInnerHeight();
    //             var h = -minY;
    //             // var w = this._innerContainer.getContentSize().width - this._contentSize.width;
    //             var w = this.getInnerWidth() - this._contentSize.width;
    //             this._startAutoScrollToDestination(cc.p(-(percent.x * w / 100), minY + percent.y * h / 100), time, attenuated);
    //         }
    //         jumpToBottom() {
    //             // this._jumpToDestination(this._innerContainer.getPositionX(), 0);
    //             this._jumpToDestination(this.getinnerPositionX(), 0);
    //         }
    //         jumpToTop() {
    //             this._jumpToDestination(this.getinnerPositionX(), this._contentSize.height - this.getInnerHeight());
    //         }
    //         /**
    //          * Move inner container to left boundary of ScrollView.
    //          */
    //         jumpToLeft() {
    //             this._jumpToDestination(0, this.getinnerPositionY());
    //         }
    //         /**
    //          * Move inner container to right boundary of ScrollView.
    //          */
    //         jumpToRight() {
    //             this._jumpToDestination(this._contentSize.width - this.getInnerWidth(), this.getinnerPositionY());
    //         }
    //         /**
    //     * Move inner container to top and right boundary of ScrollView.
    //     */
    //         jumpToTopRight() {
    //             if (this._direction !== ccui.ScrollView.DIR_BOTH) {
    //                 cc.log("Scroll _direction is not both!");
    //                 return;
    //             }
    //             var inSize = this.getInnerContainerSize();
    //             this._jumpToDestination(this._contentSize.width - inSize.width, this._contentSize.height - inSize.height);
    //         }
    //         /**
    //          * Move inner container to bottom and left boundary of ScrollView.
    //          */
    //         jumpToBottomLeft() {
    //             if (this._direction !== ccui.ScrollView.DIR_BOTH) {
    //                 cc.log("Scroll _direction is not both!");
    //                 return;
    //             }
    //             this._jumpToDestination(0, 0);
    //         }
    //         /**
    //          * Move inner container to bottom and right boundary of ScrollView.
    //          */
    //         jumpToBottomRight() {
    //             if (this._direction !== ccui.ScrollView.DIR_BOTH) {
    //                 cc.log("Scroll _direction is not both!");
    //                 return;
    //             }
    //             this._jumpToDestination(this._contentSize.width - this.getInnerContainerSize().width, 0);
    //         }
    //         jumpToPercentVertical(percent) {
    //             var minY = this._contentSize.height - this.getInnerContainerSize().height;
    //             var h = -minY;
    //             this._jumpToDestination(this.getinnerPositionX(), minY + percent * h / 100);
    //         }
    //         /**
    //          * Move inner container to horizontal percent position of ScrollView.
    //          * @param {Number} percent The destination vertical percent, accept value between 0 - 100
    //          */
    //         jumpToPercentHorizontal(percent) {
    //             var w = this.getInnerContainerSize().width - this._contentSize.width;
    //             this._jumpToDestination(-(percent * w / 100), this.getinnerPositionY());
    //         }
    //         jumpToPercentBothDirection(percent) {
    //             if (this._direction !== ccui.ScrollView.DIR_BOTH)
    //                 return;
    //             var inSize = this.getInnerContainerSize();
    //             var minY = this._contentSize.height - inSize.height;
    //             var h = -minY;
    //             var w = inSize.width - this._contentSize.width;
    //             this._jumpToDestination(-(percent.x * w / 100), minY + percent.y * h / 100);
    //         }
    //         /**
    //     * Returns a node by tag
    //     * @param {Number} tag
    //     * @returns {cc.Node}
    //     * @deprecated  since v3.0, please use getChildByTag instead.
    //     */
    //         getNodeByTag(tag) {
    //             return this.getNodeByTag(tag);
    //         }
    //         /**
    //          * Returns all nodes of inner container
    //          * @returns {Array}
    //          * @deprecated since v3.0, please use getChildren instead.
    //          */
    //         getNodes() {
    //             return this.getNodes();
    //         }
    //         /**
    //          * Removes a node from ccui.ScrollView.
    //          * @param {cc.Node} node
    //          * @deprecated since v3.0, please use removeChild instead.
    //          */
    //         removeNode(node) {
    //             this.removeNode(node);
    //         }
    //         /**
    //          * Removes a node by tag
    //          * @param {Number} tag
    //          * @deprecated since v3.0, please use removeChildByTag instead.
    //          */
    //         removeNodeByTag(tag) {
    //             this.removeNodeByTag(tag);
    //         }
    //         /**
    //          * Remove all node from ccui.ScrollView.
    //          * @deprecated since v3.0, please use removeAllChildren instead.
    //          */
    //         removeAllNodes() {
    //             this.removeAllNodes();
    //         }
    //         /**
    //          * Add node for scrollView
    //          * @param {cc.Node} node
    //          * @param {Number} zOrder
    //          * @param {Number} tag
    //          * @deprecated since v3.0, please use addChild instead.
    //          */
    //         addNode(node, zOrder, tag) {
    //             this.addNode(node, zOrder, tag);
    //         }
    //         getInnerContainer() {
    //             return null;
    //         }
    //         /**
    //          * Sets LayoutType of ccui.ScrollView.
    //          * @param {ccui.Layout.ABSOLUTE|ccui.Layout.LINEAR_VERTICAL|ccui.Layout.LINEAR_HORIZONTAL|ccui.Layout.RELATIVE} type
    //          */
    //         setLayoutType(type) {
    //             // this._innerContainer.setLayoutType(type);
    //         }
    //         /**
    //          * Returns the layout type of ccui.ScrollView.
    //          * @returns {ccui.Layout.ABSOLUTE|ccui.Layout.LINEAR_VERTICAL|ccui.Layout.LINEAR_HORIZONTAL|ccui.Layout.RELATIVE}
    //          */
    //         getLayoutType() {
    //             return ccui.Layout.LINEAR_VERTICAL;//this._innerContainer.getLayoutType();
    //         }
    //     }
})(kaayou || (kaayou = {}));
var kaayou;
(function (kaayou) {
    var SoundManager = /** @class */ (function () {
        function SoundManager() {
            this.defaultSound = null;
            //         cc.audioEngine.playMusic(  url , loop ); 
            // @param {String} url 声音路径
            // @param {Boolean} loop 是否循环播放
            // 停止背景音乐
            // cc.audioEngine.stopMusic (releaseData);
            // * @param {Boolean} releaseData 是否释放声音数据，默认为false
            // 暂停背景音乐
            // cc.audioEngine.pauseMusic();
            // 恢复背景音乐
            // cc.audioEngine.resumeMusic  ();
            // 重新播放背景音乐
            // cc.audioEngine.rewindMusic();
            // 获取背景音乐音量
            // cc.audioEngine.getMusicVolume ();
            // * @return {Number}  值在 0 到 1.0 之间 
            // 设置背景音乐音量
            // cc.audioEngine.setMusicVolume  (volume);
            // * @param {Number} volume 取值范围 0.0~1.0 . 
            // 获取背景音乐是否在播放中
            // cc.audioEngine.isMusicPlaying  ();
            // * @return {Boolean} 正在播放返回true，否则返回false
            // 播放音效(与音乐基本雷同)
            // cc.audioEngine.playEffect(  url , loop ) ;
            // * @param {String} url 音效文件路径
            // * @param {Boolean} loop 是否循环播放，默认值为false
            // * @return {Number|null} 返回音效ID  audioID
            // cc.audioEngine.getEffectsVolume();//获取音效音量
            // cc.audioEngine.setEffectsVolume(volume);//设置音效音量
            // cc.audioEngine.pauseEffect(audioID);//暂停对应的音效
            // cc.audioEngine.pauseAllEffects  ();//暂停所有音效
            // cc.audioEngine. resumeEffect  (audioID);//恢复对应的音效
            // cc.audioEngine. resumeAllEffects  ();//恢复所有音效
            // cc.audioEngine. stopEffect  (audioID);//停止对应的音效
            // cc.audioEngine.  unloadEffect  (url);//卸载内存缓冲区中的音效数据
            // 停止播放所有音乐和音效文件
            // cc.audioEngine.end();
        }
        SoundManager.getInstance = function () {
            if (SoundManager.__INS__ == null) {
                SoundManager.__INS__ = new SoundManager();
                SoundManager.__INS__.init();
            }
            return SoundManager.__INS__;
        };
        SoundManager.prototype.init = function () { };
        //播放背景音乐
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
        //bofang yinxiao
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
        //是否设置静音,使用云娃的时候会用到
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
        /**
         *
         * @param isRelease 是否释放声音数据，默认为false
         */
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
/// <reference path="kaayou.DirectScene.ts" />
var kaayou;
(function (kaayou) {
    var UIManager = /** @class */ (function () {
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
                //cc.director.getRunningScene().addChild(scene,10000);
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
        //不传参则代表最上层的场景
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
                //如果name场景不是最上层场景 ，将需要pop的场景挪到最底层去
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRzc3JjL2thYXlvdWxpYnMvZXh0ZW5kSlMudHMiLCJ0c3NyYy9rYWF5b3VsaWJzL2RlY29yYXRvci50cyIsInRzc3JjL2thYXlvdWxpYnMvZW5jcnlwLnRzIiwidHNzcmMva2FheW91bGlicy9wbGF0Zm9ybS50cyIsInRzc3JjL2thYXlvdWxpYnMvZXZlbnQudHMiLCJ0c3NyYy9rYWF5b3VsaWJzL2thYXlvdS5Db250cm9sbGVyTWFuYWdlci50cyIsInRzc3JjL2thYXlvdWxpYnMvZXh0ZW5kLnRzIiwidHNzcmMva2FheW91bGlicy9IdHRwLnRzIiwidHNzcmMva2FheW91bGlicy9rYWF5b3UuRGlyZWN0U2NlbmUudHMiLCJ0c3NyYy9rYWF5b3VsaWJzL2thYXlvdS5GaWxlRXh0LnRzIiwidHNzcmMva2FheW91bGlicy9rYWF5b3UuSW1hZ2VWaWV3LnRzIiwidHNzcmMva2FheW91bGlicy9rYWF5b3UuTGF5ZXIudHMiLCJ0c3NyYy9rYWF5b3VsaWJzL2thYXlvdS5tb2QuQmFzZS50cyIsInRzc3JjL2thYXlvdWxpYnMvU29ja2V0LnRzIiwidHNzcmMva2FheW91bGlicy9rYWF5b3UuTmV0TWFuYWdlci50cyIsInRzc3JjL2thYXlvdWxpYnMva2FheW91LnBvb2wudHMiLCJ0c3NyYy9rYWF5b3VsaWJzL2thYXlvdS5SZXNNYW5hZ2VyLnRzIiwidHNzcmMva2FheW91bGlicy9rYWF5b3UuU2NlbmUudHMiLCJ0c3NyYy9rYWF5b3VsaWJzL2thYXlvdS5TY3JvbGxWaWV3LnRzIiwidHNzcmMva2FheW91bGlicy9rYWF5b3UuU291bmRNYW5hZ2VyLnRzIiwidHNzcmMva2FheW91bGlicy9rYWF5b3UuVWlNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNQSxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxVQUFVLElBQUk7SUFDcEMsSUFB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LFFBQVEsRUFBRSxHQUFHLENBQUM7UUFDekIsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUU7UUFDcEIsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUU7UUFDckIsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUU7UUFDdkIsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUU7UUFDdkIsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzNDLEdBQUcsRUFBRSxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsSUFBSTtLQUNuQyxDQUFDO0lBQ0YsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUFFLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDM0csS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ1gsSUFBSSxJQUFJLE1BQU0sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7WUFBRSxHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxD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LENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTs0QkFDbEMsV0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzt5QkFDckI7cUJBQ0o7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsS0FBSyxJQUFJLENBQUMsSUFBSSxXQUFTLEVBQUU7b0JBQ3JCLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQzNDLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNyRDthQUVKO1FBQ0wsQ0FBQztRQUlNLDRCQUFRLEdBQWYsVUFBZ0IsSUFBWTtZQUN4QixJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQUMsT0FBTyxLQUFLLENBQUM7YUFBRTtZQUNqRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JDLENBQUM7UUF0TE0saUJBQU8sR0FBYyxJQUFJLENBQUM7UUF1THJDLGdCQUFDO0tBekxELEFBeUxDLElBQUE7SUF6TFksZ0JBQVMsWUF5THJCLENBQUE7QUFFTCxDQUFDLEVBN0xTLE1BQU0sS0FBTixNQUFNLFFBNkxmIiwiZmlsZSI6ImthYXlvdWxpYnMubW9kdWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW50ZXJmYWNlIFN0cmluZyB7XHJcbiAgICBGb3JtYXQoLi4uYXJncyk6IHN0cmluZztcclxuICAgIGZvcm1hdCguLi5hcmdzKTogc3RyaW5nO1xyXG4gICAgRm9ybWF0KG9iajogeyBba2V5OiBzdHJpbmddOiBhbnkgfSk6IHN0cmluZztcclxuICAgIGZvcm1hdChvYmo6IHsgW2tleTogc3RyaW5nXTogYW55IH0pOiBzdHJpbmc7XHJcbn1cclxuU3RyaW5nLnByb3RvdHlwZS5Gb3JtYXQgPSBmdW5jdGlvbiAoYXJncykge1xyXG4gICAgdmFyIHJlc3VsdCA9IHRoaXM7XHJcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PSAxICYmIHR5cGVvZiAoYXJncykgPT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gYXJncykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGFyZ3Nba2V5XSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVnID0gbmV3IFJlZ0V4cChcIih7XCIgKyBrZXkgKyBcIn0pXCIsIFwiZ1wiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHQucmVwbGFjZShyZWcsIGFyZ3Nba2V5XSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJndW1lbnRzW2ldICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdmFyIHJlZyA9IG5ldyBSZWdFeHAoXCIoe1tcIiArIGkgKyBcIl19KVwiLCBcImdcIik7Ly/ov5nkuKrlnKjntKLlvJXlpKfkuo455pe25Lya5pyJ6Zeu6aKY77yM6LCi6LCi5L2V5Lul56yZ566r55qE5oyH5Ye6XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlZyA9IG5ldyBSZWdFeHAoXCIoeylcIiArIGkgKyBcIih9KVwiLCBcImdcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0LnJlcGxhY2UocmVnLCBhcmd1bWVudHNbaV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdC50b1N0cmluZygpO1xyXG59XHJcblN0cmluZy5wcm90b3R5cGUuZm9ybWF0ID0gU3RyaW5nLnByb3RvdHlwZS5Gb3JtYXQ7XHJcblxyXG5cclxuaW50ZXJmYWNlIFN0cmluZ0NvbnN0cnVjdG9yIHtcclxuICAgIEZvcm1hdChzdHJpbmcsIC4uLmFyZ3MpOiBzdHJpbmc7XHJcbiAgICBmb3JtYXQoc3RyaW5nLCAuLi5hcmdzKTogc3RyaW5nO1xyXG59XHJcblxyXG5TdHJpbmcuRm9ybWF0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT0gMClcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIHZhciByZXN1bHQgPSBhcmd1bWVudHNbMF07XHJcbiAgICBpZiAodHlwZW9mIHJlc3VsdCAhPT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09IDIgJiYgdHlwZW9mIChhcmd1bWVudHNbMV0pID09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICB2YXIgYXJncyA9IGFyZ3VtZW50c1sxXTtcclxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gYXJncykge1xyXG4gICAgICAgICAgICBpZiAoYXJnc1trZXldICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlZyA9IG5ldyBSZWdFeHAoXCIoe1wiICsga2V5ICsgXCJ9KVwiLCBcImdcIik7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHQucmVwbGFjZShyZWcsIGFyZ3Nba2V5XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoYXJndW1lbnRzW2ldICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlZyA9IG5ldyBSZWdFeHAoXCIoeylcIiArIChpIC0gMSkgKyBcIih9KVwiLCBcImdcIik7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHQucmVwbGFjZShyZWcsIGFyZ3VtZW50c1tpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5TdHJpbmcuZm9ybWF0ID0gU3RyaW5nLkZvcm1hdDtcclxuXHJcblxyXG5pbnRlcmZhY2UgRGF0ZSB7XHJcbiAgICBGb3JtYXQoc3RyaW5nKTogc3RyaW5nO1xyXG4gICAgZm9ybWF0KHN0cmluZyk6IHN0cmluZztcclxufVxyXG5pbnRlcmZhY2UgRGF0ZUNvbnN0cnVjdG9yIHtcclxuICAgIEZvcm1hdChudW1iZXIsIHN0cmluZyk6IHN0cmluZztcclxuICAgIGZvcm1hdChudW1iZXIsIHN0cmluZyk6IHN0cmluZztcclxuICAgIEZvcm1hdChzdHJpbmcpOiBzdHJpbmc7XHJcbiAgICBmb3JtYXQoc3RyaW5nKTogc3RyaW5nO1xyXG4gICAgdW5peCgpOiBudW1iZXI7XHJcbiAgICBVbml4KCk6IG51bWJlcjtcclxufVxyXG5cclxuRGF0ZS5Vbml4ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoKG5ldyBEYXRlKCkpLmdldFRpbWUoKSAvIDEwMDApO1xyXG59XHJcbkRhdGUudW5peCA9IERhdGUuVW5peDtcclxuXHJcblxyXG5EYXRlLkZvcm1hdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09IDEpIHtcclxuICAgICAgICB2YXIgZm10ID0gYXJndW1lbnRzWzBdO1xyXG4gICAgICAgIHJldHVybiAobmV3IERhdGUpLkZvcm1hdChmbXQpO1xyXG4gICAgfSBlbHNlIGlmIChhcmd1bWVudHMubGVuZ3RoID09IDIpIHtcclxuICAgICAgICB2YXIgdCA9IGFyZ3VtZW50c1swXTtcclxuICAgICAgICB2YXIgZm10ID0gYXJndW1lbnRzWzFdO1xyXG4gICAgICAgcmV0dXJuIChuZXcgRGF0ZSh0KSkuRm9ybWF0KGZtdCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiAobmV3IERhdGUpLmdldFRpbWUoKS50b1N0cmluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAobmV3IERhdGUpLkZvcm1hdChmbXQpO1xyXG59XHJcbkRhdGUuZm9ybWF0ID0gRGF0ZS5Gb3JtYXQ7XHJcbi8qKlxyXG4gKiB5eXl5LU1NLWRkIGhoOm1tOnNzOlNTXHJcbiAqL1xyXG5EYXRlLnByb3RvdHlwZS5Gb3JtYXQgPSBmdW5jdGlvbiAoZm10KSB7IC8vYXV0aG9yOiBtZWl6elxyXG4gICAgdmFyIG8gPSB7XHJcbiAgICAgICAgXCJNK1wiOiB0aGlzLmdldE1vbnRoKCkgKyAxLCAvL+aciOS7vVxyXG4gICAgICAgIFwiZCtcIjogdGhpcy5nZXREYXRlKCksIC8v5pelXHJcbiAgICAgICAgXCJoK1wiOiB0aGlzLmdldEhvdXJzKCksIC8v5bCP5pe2XHJcbiAgICAgICAgXCJtK1wiOiB0aGlzLmdldE1pbnV0ZXMoKSwgLy/liIZcclxuICAgICAgICBcInMrXCI6IHRoaXMuZ2V0U2Vjb25kcygpLCAvL+enklxyXG4gICAgICAgIFwicStcIjogTWF0aC5mbG9vcigodGhpcy5nZXRNb250aCgpICsgMykgLyAzKSwgLy/lraPluqZcclxuICAgICAgICBcIlNcIjogdGhpcy5nZXRNaWxsaXNlY29uZHMoKSAvL+avq+enklxyXG4gICAgfTtcclxuICAgIGlmICgvKHkrKS8udGVzdChmbXQpKSBmbXQgPSBmbXQucmVwbGFjZShSZWdFeHAuJDEsICh0aGlzLmdldEZ1bGxZZWFyKCkgKyBcIlwiKS5zdWJzdHIoNCAtIFJlZ0V4cC4kMS5sZW5ndGgpKTtcclxuICAgIGZvciAodmFyIGsgaW4gbylcclxuICAgICAgICBpZiAobmV3IFJlZ0V4cChcIihcIiArIGsgKyBcIilcIikudGVzdChmbXQpKSBmbXQgPSBmbXQucmVwbGFjZShSZWdFeHAuJDEsIChSZWdFeHAuJDEubGVuZ3RoID09IDEpID8gKG9ba10pIDogKChcIjAwXCIgKyBvW2tdKS5zdWJzdHIoKFwiXCIgKyBvW2tdKS5sZW5ndGgpKSk7XHJcbiAgICByZXR1cm4gZm10O1xyXG59XHJcbkRhdGUucHJvdG90eXBlLmZvcm1hdCA9IERhdGUucHJvdG90eXBlLkZvcm1hdDtcclxuIiwiXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJleHRlbmRKUy50c1wiIC8+XHJcbm5hbWVzcGFjZSBrYWF5b3Uge1xyXG4gICAgdmFyIF9nbG9iYWwgPSB0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyA/IGdsb2JhbCA6IHdpbmRvdztcclxuICAgIF9nbG9iYWwubG9kYXNoID0gcmVxdWlyZShcImxvZGFzaFwiKTtcclxuICAgIGV4cG9ydCBuYW1lc3BhY2UgX2RlY29yYXRvciB7XHJcblxyXG4gICAgICAgIHZhciBfZGVjb3JhdG9ySUQgPSAoMCB8IChNYXRoLnJhbmRvbSgpICogOTk4KSk7XHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0TmV3RGVjb3JhdG9ySUQoKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9kZWNvcmF0b3JJRCsrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0VGFyZ2V0RGVjb3JhdG9ySUQodGFyZ2V0KTogbnVtYmVyIHtcclxuICAgICAgICAgICAgdmFyIGRpZCA9IDA7XHJcbiAgICAgICAgICAgIGlmICh0YXJnZXQuY29uc3RydWN0b3IuaGFzT3duUHJvcGVydHkoJ19fZGVjb3JhdG9yaWQnKSkge1xyXG4gICAgICAgICAgICAgICAgZGlkID0gdGFyZ2V0LmNvbnN0cnVjdG9yLl9fZGVjb3JhdG9yaWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gaWYgKHRhcmdldC5jb25zdHJ1Y3Rvci5uYW1lID09ICdDcmVhdGVSb29tUGFuZWwnKSB7XHJcbiAgICAgICAgICAgIC8vICAgICBjb25zb2xlLmVycm9yKFwiQ3JlYXRlUm9vbVBhbmVsXCIsIGRpZClcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICBpZiAoIWRpZCkge1xyXG4gICAgICAgICAgICAgICAgZGlkID0gZ2V0TmV3RGVjb3JhdG9ySUQoKTtcclxuICAgICAgICAgICAgICAgIHRhcmdldC5jb25zdHJ1Y3Rvci5fX2RlY29yYXRvcmlkID0gZGlkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBkaWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBnZXRTdXBlcihjdG9yKSB7XHJcbiAgICAgICAgICAgIHZhciBwcm90byA9IGN0b3IucHJvdG90eXBlOyAvLyBiaW5kZWQgZnVuY3Rpb24gZG8gbm90IGhhdmUgcHJvdG90eXBlXHJcbiAgICAgICAgICAgIHZhciBkdW5kZXJQcm90byA9IHByb3RvICYmIE9iamVjdC5nZXRQcm90b3R5cGVPZihwcm90byk7XHJcbiAgICAgICAgICAgIHJldHVybiBkdW5kZXJQcm90byAmJiBkdW5kZXJQcm90by5jb25zdHJ1Y3RvcjtcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY2hlY2tDdG9yQXJndW1lbnQoZGVjb3JhdGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGFyZ2V0ID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbm8gcGFyYW1ldGVyLCB0YXJnZXQgaXMgY3RvclxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWNvcmF0ZSh0YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChjdG9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlY29yYXRlKGN0b3IsIHRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBleHBvcnQgdmFyIGNjY2xhc3MgPSBjaGVja0N0b3JBcmd1bWVudChmdW5jdGlvbiAoY3RvciwgbmFtZSkge1xyXG4gICAgICAgICAgICB2YXIgYmFzZSA9IGdldFN1cGVyKGN0b3IpO1xyXG4gICAgICAgICAgICBpZiAoYmFzZSA9PT0gT2JqZWN0KSB7XHJcbiAgICAgICAgICAgICAgICBiYXNlID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICA7XHJcbiAgICAgICAgICAgIHZhciByZW9ibmFtZXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhjdG9yLnByb3RvdHlwZSk7XHJcbiAgICAgICAgICAgIHZhciByZW9iID0ge307XHJcblxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZW9ibmFtZXMpO1xyXG4gICAgICAgICAgICBmb3IgKHZhciB4IGluIHJlb2JuYW1lcykge1xyXG4gICAgICAgICAgICAgICAgcmVvYltyZW9ibmFtZXNbeF1dID0gY3Rvci5wcm90b3R5cGVbcmVvYm5hbWVzW3hdXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZW9iKTtcclxuICAgICAgICAgICAgLy8gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcigpXHJcbiAgICAgICAgICAgIHZhciByZXMgPSBiYXNlLmV4dGVuZChyZW9iKS8vICAgY3Rvci5leHRlbmQoYmFzZSk7Ly8gY2MuU2NlbmUuZXh0ZW5kKGN0b3IpO1xyXG4gICAgICAgICAgICByZXMuX2NsYXNzbmFtZSA9IGN0b3IubmFtZTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gaW50ZXJmYWNlIEF1dG9CaW5kRXZlbnRUYWdlcnQge1xyXG4gICAgICAgIC8vICAgICBldmVudGtleTogc3RyaW5nO1xyXG4gICAgICAgIC8vICAgICBwcm9wZXJ0eUtleTogc3RyaW5nO1xyXG4gICAgICAgIC8vIH07XHJcblxyXG5cclxuICAgICAgICAvLyBpbnRlcmZhY2UgRXZlbnRUYWdlcnRNYXA8U3RyaW5naCxFdmVudFRhZ2VydEFycmF5PlxyXG4gICAgICAgIHR5cGUgQXV0b0JpbmRFdmVudFRhZ2VydCA9IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH07XHJcbiAgICAgICAgdHlwZSBFdmVudFRhZ2VydE1hcCA9IHsgW2tleTogc3RyaW5nXTogQXV0b0JpbmRFdmVudFRhZ2VydCB9O1xyXG4gICAgICAgIHR5cGUgRXZlbnRUYWdlcnRNYXBBcnJheSA9IHsgW2tleTogc3RyaW5nXTogRXZlbnRUYWdlcnRNYXAgfTtcclxuXHJcbiAgICAgICAgbGV0IGdfZXZlbnRUYWdlcnRBcnJheTogRXZlbnRUYWdlcnRNYXBBcnJheSA9IHt9O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBhZGRBdXRvQmluZEJpbmRFdmVudERhdGEodGFyZ2V0LCBjb25uYW1lLCBldmVudGtleSwgcHJvcGVydHlLZXkpIHtcclxuICAgICAgICAgICAgdmFyIGRpZCA9IGdldFRhcmdldERlY29yYXRvcklEKHRhcmdldCk7XHJcbiAgICAgICAgICAgIGdfZXZlbnRUYWdlcnRBcnJheVtkaWRdID0gZ19ldmVudFRhZ2VydEFycmF5W2RpZF0gfHwge307XHJcbiAgICAgICAgICAgIGdfZXZlbnRUYWdlcnRBcnJheVtkaWRdW2Nvbm5hbWVdID0gZ19ldmVudFRhZ2VydEFycmF5W2RpZF1bY29ubmFtZV0gfHwge307XHJcbiAgICAgICAgICAgIGdfZXZlbnRUYWdlcnRBcnJheVtkaWRdW2Nvbm5hbWVdW2V2ZW50a2V5XSA9IHByb3BlcnR5S2V5O1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8vIGZ1bmN0aW9uIGdldEF1dG9CaW5kQmluZEV2ZW50RGF0YShjbGFzc25hbWUsIGNvbm5hbWUsIGV2ZW50a2V5LCBwcm9wZXJ0eUtleSkge1xyXG5cclxuICAgICAgICAvLyAgICAgaWYoIWdfZXZlbnRUYWdlcnRBcnJheVtjbGFzc25hbWVdKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIC8vICAgICBnX2V2ZW50VGFnZXJ0QXJyYXlbY2xhc3NuYW1lXSA9IGdfZXZlbnRUYWdlcnRBcnJheVtjbGFzc25hbWVdIHx8IHt9O1xyXG4gICAgICAgIC8vICAgICBnX2V2ZW50VGFnZXJ0QXJyYXlbY2xhc3NuYW1lXVtjb25uYW1lXSA9IGdfZXZlbnRUYWdlcnRBcnJheVtjbGFzc25hbWVdW2Nvbm5hbWVdIHx8IHt9O1xyXG4gICAgICAgIC8vICAgICBnX2V2ZW50VGFnZXJ0QXJyYXlbY2xhc3NuYW1lXVtjb25uYW1lXVtldmVudGtleV0gPSBwcm9wZXJ0eUtleTtcclxuICAgICAgICAvLyB9XHJcblxyXG5cclxuICAgICAgICBleHBvcnQgZnVuY3Rpb24gQmluZEV2ZW50KGNvbmFtZSwga2V5U3RyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBwcm9wZXJ0eUtleSwgZGVzY3JpcHRvcikge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNsYXNzbmFtZSA9IHRhcmdldC5jb25zdHJ1Y3Rvci5uYW1lO1xyXG5cclxuICAgICAgICAgICAgICAgIGFkZEF1dG9CaW5kQmluZEV2ZW50RGF0YSh0YXJnZXQsIGNvbmFtZSwga2V5U3RyLCBwcm9wZXJ0eUtleSk7XHJcbiAgICAgICAgICAgICAgICAvLyBsZXQgY2xhc3NuYW1lID0gdGFyZ2V0LmNvbnN0cnVjdG9yLm5hbWU7XHJcbiAgICAgICAgICAgICAgICAvLyBnX2V2ZW50VGFnZXJ0QXJyYXlbY2xhc3NuYW1lXSA9IGdfZXZlbnRUYWdlcnRBcnJheVtjbGFzc25hbWVdIHx8IHt9O1xyXG4gICAgICAgICAgICAgICAgLy8gZ19ldmVudFRhZ2VydEFycmF5W2NsYXNzbmFtZV1bY29uYW1lXSA9IHt9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gaWYgKCF0YXJnZXRbXCJfQGV2ZW50VGFnZXJ0QXJyYXlcIl0pIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICB0YXJnZXRbXCJfQGV2ZW50VGFnZXJ0QXJyYXlcIl0gPSB7fTtcclxuICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgIC8vIHRhcmdldFtcIl9AZXZlbnRUYWdlcnRBcnJheVwiXVtrZXlTdHJdID0ge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIGNvbmFtZTogY29uYW1lLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgIGNhbGw6IGRlc2NyaXB0b3IudmFsdWUvL3RhcmdldFtwcm9wZXJ0eUtleV1cclxuICAgICAgICAgICAgICAgIC8vIH07XHJcbiAgICAgICAgICAgICAgICAvLyByZXR1cm4gZGVzY3JpcHRvci52YWx1ZTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGV4cG9ydCBmdW5jdGlvbiBDdXN0b21CaW5kRXZldG4oY29uYW1lLCBrZXlTdHIsIGZ1bmMsIHRhcmdldCkge1xyXG5cclxuICAgICAgICAgICAgaWYgKCF0YXJnZXRbXCJfQGV2ZW50VGFnZXJ0QXJyYXlcIl0pIHtcclxuICAgICAgICAgICAgICAgIHRhcmdldFtcIl9AZXZlbnRUYWdlcnRBcnJheVwiXSA9IHt9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRhcmdldFtcIl9AZXZlbnRUYWdlcnRBcnJheVwiXVtrZXlTdHJdID0ge1xyXG4gICAgICAgICAgICAgICAgY29uYW1lOiBjb25hbWUsXHJcbiAgICAgICAgICAgICAgICBjYWxsOiBmdW5jXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gX19BdXRvT2ZmRXZlbnQodGFyZ2V0LCBldmVudEFycmF5KSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgY2xhc3NuYW1lID0gdGFyZ2V0LmNvbnN0cnVjdG9yLm5hbWU7XHJcbiAgICAgICAgICAgIHZhciBkaWQgPSBnZXRUYXJnZXREZWNvcmF0b3JJRCh0YXJnZXQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGxvZGFzaC5pc0VtcHR5KGV2ZW50QXJyYXlbZGlkXSkpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgICAgIGxvZGFzaC5mb3JFYWNoKGV2ZW50QXJyYXlbZGlkXSwgZnVuY3Rpb24gKGthcnIsIGNvbmFtZSkge1xyXG4gICAgICAgICAgICAgICAgbG9kYXNoLmZvckVhY2goa2FyciwgZnVuY3Rpb24gKHByb3BlcnR5S2V5LCBldmVudGtleSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXRbcHJvcGVydHlLZXldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmdW5jYWxsID0gdGFyZ2V0W3Byb3BlcnR5S2V5XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAga2FheW91LmdldENvbnRyb2xsZXIoY29uYW1lKS5vZmZCeXRhcmdlcihldmVudGtleSwgdGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICBleHBvcnQgZnVuY3Rpb24gZG9PZmZFdmVudHModGFyZ2V0LCBwcm9wZXJ0eUtleSwgZGVzY3JpcHRvcikge1xyXG5cclxuICAgICAgICAgICAgbGV0IG9sZEZ1bmM6IEZ1bmN0aW9uID0gZGVzY3JpcHRvci52YWx1ZTtcclxuICAgICAgICAgICAgZGVzY3JpcHRvci52YWx1ZSA9IGZ1bmN0aW9uICguLi5hZ3JzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpc1tcIl9AaXNCaW5kSW5pdFwiXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIF9fQXV0b09mZkV2ZW50KHRoaXMsIGdfZXZlbnRUYWdlcnRBcnJheSlcclxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpc1tcIl9AaXNCaW5kSW5pdFwiXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBvbGRGdW5jLmFwcGx5KHRoaXMsIGFncnMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBkZXNjcmlwdG9yO1xyXG5cclxuICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgdGFyZ2V0W1wiX0BfX1wiICsgcHJvcGVydHlLZXldID0gdGFyZ2V0W3Byb3BlcnR5S2V5XTtcclxuICAgICAgICAgICAgdGFyZ2V0W3Byb3BlcnR5S2V5XSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0YXJnZXRbXCJfQGJpbmRFdmVudFwiXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzW1wiX0BldmVudFRhZ2VydEFycmF5XCJdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBldmVudFRhZ2VydEFycmF5OiBBcnJheTxFdmVudFRhZ2VydEFycmF5PiA9IHRoaXNbXCJfQGV2ZW50VGFnZXJ0QXJyYXlcIl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHggaW4gZXZlbnRUYWdlcnRBcnJheSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGZ1bmN0aW9uIChrZXlTdHI6IHN0cmluZywgY29uYW1lOiBzdHJpbmcsIGN1cnRhcmdldCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGtleVN0cik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2FheW91LmdldENvbnRyb2xsZXIoY29uYW1lKS5vZmZCeXRhcmdlcihrZXlTdHIsIGN1cnRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSh4LCBldmVudFRhZ2VydEFycmF5W3hdLmNvbmFtZSwgdGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXNbXCJfQHF1ZXVlX2V2ZW50VGFnZXJ0QXJyYXlcIl0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHF1ZXVlX2V2ZW50VGFnZXJ0QXJyYXk6IEFycmF5PEV2ZW50VGFnZXJ0QXJyYXk+ID0gdGhpc1tcIl9AcXVldWVfZXZlbnRUYWdlcnRBcnJheVwiXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgeCBpbiBxdWV1ZV9ldmVudFRhZ2VydEFycmF5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZnVuY3Rpb24gKGtleVN0cjogc3RyaW5nLCBjb25hbWU6IHN0cmluZywgY3VydGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coa2V5U3RyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrYWF5b3UuZ2V0Q29udHJvbGxlcihjb25hbWUpLm9mZkJ5dGFyZ2VyKGtleVN0ciwgY3VydGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKHgsIHF1ZXVlX2V2ZW50VGFnZXJ0QXJyYXlbeF0uY29uYW1lLCB0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXNbXCJfQF9fXCIgKyBwcm9wZXJ0eUtleV0uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGFyZ2V0W3Byb3BlcnR5S2V5XTtcclxuICAgIFxyXG4gICAgICAgICAgICAqL1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIF9fQXV0b0JpbmRFdmVudCh0YXJnZXQsIGV2ZW50QXJyYXkpIHtcclxuICAgICAgICAgICAgbGV0IGNsYXNzbmFtZSA9IHRhcmdldC5jb25zdHJ1Y3Rvci5uYW1lO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHZhciBkaWQgPSBnZXRUYXJnZXREZWNvcmF0b3JJRCh0YXJnZXQpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGlmIChsb2Rhc2guaXNFbXB0eShldmVudEFycmF5W2RpZF0pKSB7IHJldHVybjsgfVxyXG5cclxuICAgICAgICAgICAgbG9kYXNoLmZvckVhY2goZXZlbnRBcnJheVtkaWRdLCBmdW5jdGlvbiAoa2FyciwgY29uYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBsb2Rhc2guZm9yRWFjaChrYXJyLCBmdW5jdGlvbiAocHJvcGVydHlLZXksIGV2ZW50a2V5KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXRbcHJvcGVydHlLZXldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmdW5jYWxsID0gdGFyZ2V0W3Byb3BlcnR5S2V5XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAga2FheW91LmdldENvbnRyb2xsZXIoY29uYW1lKS5vbihldmVudGtleSwgZnVuY3Rpb24gKGU6IGthYXlvdS5FdmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9fYWNrID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlLmRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZS5kYXRhWydAYWNrJ10pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX19hY2sgPSBlLmRhdGFbJ0BhY2snXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGUuZGF0YVsnQGFjayddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLmRhdGEgPSBlLmRhdGFbJ0BvcmlnaW5hbCddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfX2Fjaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZXN1bGV0ID0gZnVuY2FsbC5hcHBseSh0YXJnZXQsIFtlLmRhdGFdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfX2FjayhyZXN1bGV0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY2FsbC5hcHBseSh0YXJnZXQsIFtlLmRhdGFdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgIGV4cG9ydCBmdW5jdGlvbiBkb0JpbmRFdmVudCh0YXJnZXQsIHByb3BlcnR5S2V5LCBkZXNjcmlwdG9yKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgb2xkRnVuYzogRnVuY3Rpb24gPSBkZXNjcmlwdG9yLnZhbHVlO1xyXG5cclxuICAgICAgICAgICAgZGVzY3JpcHRvci52YWx1ZSA9IGZ1bmN0aW9uICguLi5hZ3JzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobG9kYXNoLmlzVW5kZWZpbmVkKHRoaXNbXCJfQGlzQmluZEluaXRcIl0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX19BdXRvQmluZEV2ZW50KHRoaXMsIGdfZXZlbnRUYWdlcnRBcnJheSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpc1tcIl9AaXNCaW5kSW5pdFwiXSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb2xkRnVuYy5hcHBseSh0aGlzLCBhZ3JzKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGRlc2NyaXB0b3I7XHJcbiAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgIHZhciBpID0gMTtcclxuICAgICAgICAgICAgaWYgKHRhcmdldC5jb25zdHJ1Y3RvciAmJiB0YXJnZXQuY29uc3RydWN0b3IucHJvdG90eXBlKSB7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQgPSB0YXJnZXQuY29uc3RydWN0b3IucHJvdG90eXBlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRhcmdldC5jb25zdHJ1Y3RvcilcclxuICAgICAgICAgICAgaWYgKCF0YXJnZXRbXCJfQGJpbmRFdmVudFwiXSkge1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0W1wiX0Bpc0JpbmRJbml0XCJdID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXRbXCJfQGJpbmRFdmVudFwiXSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygzMjQyNDQyMywgdGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXNbXCJfQGlzQmluZEluaXRcIl0gPT0gdHJ1ZSkgeyByZXR1cm47IH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzW1wiX0Bpc0JpbmRJbml0XCJdID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpc1tcIl9AZXZlbnRUYWdlcnRBcnJheVwiXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZXZlbnRUYWdlcnRBcnJheTogQXJyYXk8RXZlbnRUYWdlcnRBcnJheT4gPSB0aGlzW1wiX0BldmVudFRhZ2VydEFycmF5XCJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciB4IGluIGV2ZW50VGFnZXJ0QXJyYXkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChmdW5jdGlvbiAoa2V5U3RyOiBzdHJpbmcsIGNvbmFtZTogc3RyaW5nLCBmdW5jYWxsOiBGdW5jdGlvbiwgY3VydGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coa2V5U3RyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrYWF5b3UuZ2V0Q29udHJvbGxlcihjb25hbWUpLm9uKGtleVN0ciwgZnVuY3Rpb24gKGU6IGthYXlvdS5FdmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgX19hY2sgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZS5kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZS5kYXRhWydAYWNrJ10pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfX2FjayA9IGUuZGF0YVsnQGFjayddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBlLmRhdGFbJ0BhY2snXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLmRhdGEgPSBlLmRhdGFbJ0BvcmlnaW5hbCddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfX2Fjaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsZXQgPSBmdW5jYWxsLmFwcGx5KGN1cnRhcmdldCwgW2UuZGF0YV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX19hY2socmVzdWxldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jYWxsLmFwcGx5KGN1cnRhcmdldCwgW2UuZGF0YV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBjdXJ0YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkoeCwgZXZlbnRUYWdlcnRBcnJheVt4XS5jb25hbWUsIGV2ZW50VGFnZXJ0QXJyYXlbeF0uY2FsbCwgdGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpc1tcIl9AcXVldWVfZXZlbnRUYWdlcnRBcnJheVwiXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcXVldWVfZXZlbnRUYWdlcnRBcnJheTogQXJyYXk8RXZlbnRUYWdlcnRBcnJheT4gPSB0aGlzW1wiX0BxdWV1ZV9ldmVudFRhZ2VydEFycmF5XCJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXNbXCJfQHF1ZXVlX2V2ZW50TG9vcEFycmF5XCJdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzW1wiX0BxdWV1ZV9ldmVudExvb3BBcnJheVwiXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHggaW4gcXVldWVfZXZlbnRUYWdlcnRBcnJheSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGZ1bmN0aW9uIChrZXlTdHI6IHN0cmluZywgY29uYW1lLCBzdHJpbmcsIGZ1bmNhbGw6IEZ1bmN0aW9uLCBjdXJ0YXJnZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrYWF5b3UuZ2V0Q29udHJvbGxlcihjb25hbWUpLm9uKGtleVN0ciwgZnVuY3Rpb24gKGU6IGthYXlvdS5FdmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgX19hY2sgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZS5kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZS5kYXRhWydAYWNrJ10pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfX2FjayA9IGUuZGF0YVsnQGFjayddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBlLmRhdGFbJ0BhY2snXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLmRhdGEgPSBlLmRhdGFbJ0BvcmlnaW5hbCddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnRhcmdldFtcIl9AcXVldWVfZXZlbnRMb29wQXJyYXlcIl0ucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6IGN1cnRhcmdldCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IGUuZGF0YSB8fCBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNrOiBfX2FjayB8fCBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGZ1YzogZnVuY2FsbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBjdXJ0YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkoeCwgcXVldWVfZXZlbnRUYWdlcnRBcnJheVt4XS5jb25hbWUsIHF1ZXVlX2V2ZW50VGFnZXJ0QXJyYXlbeF0uY2FsbCwgdGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGFyZ2V0W1wiX0BfX1wiICsgcHJvcGVydHlLZXldID0gdGFyZ2V0W3Byb3BlcnR5S2V5XTtcclxuICAgICAgICAgICAgdGFyZ2V0W3Byb3BlcnR5S2V5XSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzW1wiX0BiaW5kRXZlbnRcIl0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzW1wiX0BiaW5kRXZlbnRcIl0oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXNbXCJfQF9fXCIgKyBwcm9wZXJ0eUtleV0uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGFyZ2V0W3Byb3BlcnR5S2V5XTsqL1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59IiwiXHJcbi8vIGltcG9ydCAqIGFzIG1kNSBmcm9tICcuLi9saWIvbWQ1Lm1pbic7XHJcbi8vIGltcG9ydCAqIGFzIGVuY29kaW5nIGZyb20gJy4uL2xpYi9lbmNvZGluZy5taW4nO1xyXG5uYW1lc3BhY2Uga2FheW91IHtcclxuICAgIHZhciBpY29udiA9IHJlcXVpcmUoJ2ljb252LWxpdGUnKTtcclxuICAgIHZhciBDcnlwdG9KUyA9IHJlcXVpcmUoXCJjcnlwdG8tanNcIik7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEFFU3tcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBpdlN0cjpzdHJpbmc9XCJ0ZXJyeXNneWdvYWVzY3RyXCI7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMga2V5U3RyOnN0cmluZz1cImthYXlvdTIwMTkwMTEwIyRcIjtcclxuICAgICAgICAvLyDliqDlr4YgYWVzICsgYmFzZTY0XHJcbiAgICAgICAgc3RhdGljIGVuY3J5cHQocGxhaW5UZXh0KXtcclxuICAgICAgICAgICAgbGV0IGtleSA9IENyeXB0b0pTLmVuYy5VdGY4LnBhcnNlKHRoaXMua2V5U3RyKTtcclxuICAgICAgICAgICAgbGV0IGl2ID0gQ3J5cHRvSlMuZW5jLlV0ZjgucGFyc2UodGhpcy5pdlN0cik7XHJcbiAgICAgICAgICAgIGxldCBlbmNyeXB0ZWQgPSBDcnlwdG9KUy5BRVMuZW5jcnlwdChwbGFpblRleHQsIGtleSwgeyBpdjogaXYsIG1vZGU6IENyeXB0b0pTLm1vZGUuQ1RSLCBwYWRkaW5nOiBDcnlwdG9KUy5wYWQuTm9QYWRkaW5nIH0pO1xyXG4gICAgICAgICAgICBsZXQgYmFzZTY0c3RyID0gQ3J5cHRvSlMuZW5jLkJhc2U2NC5zdHJpbmdpZnkoZW5jcnlwdGVkLmNpcGhlcnRleHQpO1xyXG4gICAgICAgICAgICBiYXNlNjRzdHIgPSBiYXNlNjRzdHIucmVwbGFjZSgvXFwrL2csIFwiLVwiKTtcclxuICAgICAgICAgICAgYmFzZTY0c3RyID0gYmFzZTY0c3RyLnJlcGxhY2UoL1xcLy9nLCBcIl9cIik7XHJcbiAgICAgICAgICAgIHJldHVybiBiYXNlNjRzdHI7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgLy8g6Kej5a+GXHJcbiAgICAgICAgc3RhdGljIGRlY3J5cHQoZW5jcnlwdGVkVGV4dCl7XHJcbiAgICAgICAgICAgIGVuY3J5cHRlZFRleHQgPSBlbmNyeXB0ZWRUZXh0LnJlcGxhY2UoLy0vZywgXCIrXCIpO1xyXG4gICAgICAgICAgICBlbmNyeXB0ZWRUZXh0ID0gZW5jcnlwdGVkVGV4dC5yZXBsYWNlKC9fL2csIFwiL1wiKTtcclxuICAgICAgICAgICAgbGV0IGtleSA9IENyeXB0b0pTLmVuYy5VdGY4LnBhcnNlKHRoaXMua2V5U3RyKTtcclxuICAgICAgICAgICAgbGV0IGl2ID0gQ3J5cHRvSlMuZW5jLlV0ZjgucGFyc2UodGhpcy5pdlN0cik7XHJcbiAgICAgICAgICAgIGxldCBkZWNyeXB0ZWQgPSBDcnlwdG9KUy5BRVMuZGVjcnlwdChlbmNyeXB0ZWRUZXh0LCBrZXksIHsgaXY6IGl2LCBtb2RlOiBDcnlwdG9KUy5tb2RlLkNUUiwgcGFkZGluZzogQ3J5cHRvSlMucGFkLk5vUGFkZGluZyB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIGRlY3J5cHRlZC50b1N0cmluZyhDcnlwdG9KUy5lbmMuVXRmOCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgZW5jcnlwdFBIUChwbGFpblRleHQpe1xyXG4gICAgICAgICAgICBsZXQga2V5ID0gQ3J5cHRvSlMuZW5jLlV0ZjgucGFyc2UodGhpcy5rZXlTdHIpO1xyXG4gICAgICAgICAgICBsZXQgaXYgPSBDcnlwdG9KUy5lbmMuVXRmOC5wYXJzZSh0aGlzLml2U3RyKTtcclxuICAgICAgICAgICAgbGV0IGVuY3J5cHRlZCA9IENyeXB0b0pTLkFFUy5lbmNyeXB0KHBsYWluVGV4dCwga2V5LCB7IGl2OiBpdiwgbW9kZTogQ3J5cHRvSlMubW9kZS5DQkMsIHBhZGRpbmc6IENyeXB0b0pTLnBhZC5Qa2NzNyB9KTtcclxuICAgICAgICAgICAgLy8gQ3J5cHRvSlMuZW5jLmJhc2U2NHN0cigpO1xyXG4gICAgICAgICAgICAvLyBsZXQgYmFzZTY0c3RyID0gQ3J5cHRvSlMuZW5jLkJhc2U2NC5zdHJpbmdpZnkoZW5jcnlwdGVkLmNpcGhlcnRleHQpO1xyXG4gICAgICAgICAgICAvLyBiYXNlNjRzdHIgPSBiYXNlNjRzdHIucmVwbGFjZSgvXFwrL2csIFwiLVwiKTtcclxuICAgICAgICAgICAgLy8gYmFzZTY0c3RyID0gYmFzZTY0c3RyLnJlcGxhY2UoL1xcLy9nLCBcIl9cIik7XHJcbiAgICAgICAgICAgIGxldCBzdHIxID0gQ3J5cHRvSlMuZW5jLlV0ZjgucGFyc2UoZW5jcnlwdGVkLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICBsZXQgc3RyID0gQ3J5cHRvSlMuZW5jLkJhc2U2NC5zdHJpbmdpZnkoc3RyMSlcclxuICAgICAgICAgICAgcmV0dXJuIHN0clxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIE1ENSB7XHJcbiAgICAgICAgc3RhdGljIGVuY29kZSh2KTogc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIENyeXB0b0pTLk1ENSh2KS50b1N0cmluZygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgVGV4dENvZGVyIHtcclxuXHJcbiAgICAgICAgLy8gc3RhdGljIGVuY29kZShtYTpzdHJpbmcsc3RyOnN0cmluZyl7XHJcbiAgICAgICAgLy8gICAgcmV0dXJuICAoIG5ldyBlbmNvZGluZy5UZXh0RW5jb2RlcihtYSkpLmVuY29kZShzdHIpO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyBzdGF0aWMgZGVjb2RlKG1hOnN0cmluZyxidWZmOlVpbnQ4QXJyYXkpe1xyXG4gICAgICAgIC8vICAgICByZXR1cm4gIChuZXcgZW5jb2RpbmcuVGV4dERlY29kZXIobWEpKS5kZWNvZGUoYnVmZik7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuXHJcbiAgICAgICAgc3RhdGljIGVuY29kZShtYTogc3RyaW5nLCBzdHI6IHN0cmluZykge1xyXG4gICAgICAgICAgICByZXR1cm4gaWNvbnYuZW5jb2RlKHN0ciwgbWEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdGF0aWMgZGVjb2RlKG1hOiBzdHJpbmcsIGJ1ZmY6IFVpbnQ4QXJyYXkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGljb252LmRlY29kZShidWZmLCBtYSk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcblxyXG5cclxufSIsIm5hbWVzcGFjZSBrYWF5b3Uge1xyXG4gICAgY2xhc3MgR1ZvaWNlIHtcclxuICAgICAgICBzdGF0aWMgYkxvZ2luT0s6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICBzdGF0aWMgcm9vbUlkOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIHN0YXRpYyBJbml0T0sgPSBmYWxzZTtcclxuICAgICAgICBJbml0KHVpZDogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR1ZvaWNlIEluaXRcIik7XHJcbiAgICAgICAgICAgIGlmICghY2Muc3lzLmlzTmF0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICBHVm9pY2UuSW5pdE9LID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIVBsYXRmb3JtTWdyLmdldEluc3RhbmNlKCkuc3lzLmNoZWNrQWxsb3dKU0ludGVyZmFjZShcIkdWb2ljZUluaXRcIikpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5o6l5Y+j5LiN5a2Y5ZyoOkdWb2ljZUluaXRcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNjLnN5cy5vcyA9PSBjYy5zeXMuT1NfSU9TKSB7XHJcbiAgICAgICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwiTmF0aXZlT2NDbGFzc1wiLCBcIkdWb2ljZUluaXQ6XCIsIHVpZC50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0FORFJPSUQpIHtcclxuICAgICAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJjb20va2F5b3UvdXRpbHMvTmF0aXZlSmF2YUNsYXNzXCIsIFwiR1ZvaWNlSW5pdFwiLCBcIihMamF2YS9sYW5nL1N0cmluZzspVlwiLCB1aWQudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgR1ZvaWNlLmJMb2dpbk9LID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBFbnRlclJvb20ocm9vbUlkOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJHVm9pY2UgRW50ZXJSb29tXCIpO1xyXG4gICAgICAgICAgICBpZiAoIWNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgLy9mb3IgdGVzdCBHVm9pY2VcclxuICAgICAgICAgICAgICAgIHRoaXMuT25Hdm9pY2VKb2luUm9vbU9LKDk5KTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIVBsYXRmb3JtTWdyLmdldEluc3RhbmNlKCkuc3lzLmNoZWNrQWxsb3dKU0ludGVyZmFjZShcIkdWb2ljZUVudGVyVGVhbXJvb21cIikpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5o6l5Y+j5LiN5a2Y5ZyoOkdWb2ljZUVudGVyVGVhbXJvb21cIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNjLnN5cy5vcyA9PSBjYy5zeXMuT1NfSU9TKSB7XHJcbiAgICAgICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwiTmF0aXZlT2NDbGFzc1wiLCBcIkdWb2ljZUVudGVyVGVhbXJvb206XCIsIHJvb21JZCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2Muc3lzLm9zID09IGNjLnN5cy5PU19BTkRST0lEKSB7XHJcbiAgICAgICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwiY29tL2theW91L3V0aWxzL05hdGl2ZUphdmFDbGFzc1wiLCBcIkdWb2ljZUVudGVyVGVhbXJvb21cIiwgXCIoTGphdmEvbGFuZy9TdHJpbmc7KVZcIiwgcm9vbUlkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBHVm9pY2Uucm9vbUlkID0gcm9vbUlkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgUXVpdFJvb20ocm9vbUlkOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJHVm9pY2UgUXVpdFJvb21cIik7XHJcbiAgICAgICAgICAgIGlmICghY2Muc3lzLmlzTmF0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFQbGF0Zm9ybU1nci5nZXRJbnN0YW5jZSgpLnN5cy5jaGVja0FsbG93SlNJbnRlcmZhY2UoXCJHVm9pY2VRdWl0VGVhbXJvb21cIikpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5o6l5Y+j5LiN5a2Y5ZyoOkdWb2ljZUVudGVyVGVhbXJvb21cIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNjLnN5cy5vcyA9PSBjYy5zeXMuT1NfSU9TKSB7XHJcbiAgICAgICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwiTmF0aXZlT2NDbGFzc1wiLCBcIkdWb2ljZVF1aXRUZWFtcm9vbTpcIiwgcm9vbUlkKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0FORFJPSUQpIHtcclxuICAgICAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJjb20va2F5b3UvdXRpbHMvTmF0aXZlSmF2YUNsYXNzXCIsIFwiR1ZvaWNlUXVpdFRlYW1yb29tXCIsIFwiKExqYXZhL2xhbmcvU3RyaW5nOylWXCIsIHJvb21JZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgR1ZvaWNlLnJvb21JZCA9IFwiXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBPcGVuTWljKCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdWb2ljZSBPcGVuTWljXCIpO1xyXG4gICAgICAgICAgICBpZiAoIWNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Pbkd2b2ljZU9wZW5NaWNPSygpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghUGxhdGZvcm1NZ3IuZ2V0SW5zdGFuY2UoKS5zeXMuY2hlY2tBbGxvd0pTSW50ZXJmYWNlKFwiR1ZvaWNlT3Blbk1pY1wiKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLmjqXlj6PkuI3lrZjlnKg6R1ZvaWNlT3Blbk1pY1wiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY2Muc3lzLm9zID09IGNjLnN5cy5PU19JT1MpIHtcclxuICAgICAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJOYXRpdmVPY0NsYXNzXCIsIFwiR1ZvaWNlT3Blbk1pYzpcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2Muc3lzLm9zID09IGNjLnN5cy5PU19BTkRST0lEKSB7XHJcbiAgICAgICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwiY29tL2theW91L3V0aWxzL05hdGl2ZUphdmFDbGFzc1wiLCBcIkdWb2ljZU9wZW5NaWNcIiwgXCIoKVZcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIE9wZW5TcGVha2VyKCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdWb2ljZSBPcGVuU3BlYWtlclwiKTtcclxuICAgICAgICAgICAgaWYgKCFjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuT25Hdm9pY2VPcGVuU3BlYWtlck9LKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFQbGF0Zm9ybU1nci5nZXRJbnN0YW5jZSgpLnN5cy5jaGVja0FsbG93SlNJbnRlcmZhY2UoXCJHVm9pY2VPcGVuU3BlYWtlclwiKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLmjqXlj6PkuI3lrZjlnKg6R1ZvaWNlT3BlblNwZWFrZXJcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNjLnN5cy5vcyA9PSBjYy5zeXMuT1NfSU9TKSB7XHJcbiAgICAgICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwiTmF0aXZlT2NDbGFzc1wiLCBcIkdWb2ljZU9wZW5TcGVha2VyOlwiLCB0cnVlKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0FORFJPSUQpIHtcclxuICAgICAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJjb20va2F5b3UvdXRpbHMvTmF0aXZlSmF2YUNsYXNzXCIsIFwiR1ZvaWNlT3BlblNwZWFrZXJcIiwgXCIoKVZcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIENsb3NlTWljKCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdWb2ljZSBDbG9zZU1pY1wiKTtcclxuICAgICAgICAgICAgaWYgKCFjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuT25Hdm9pY2VDbG9zZU1pY09LKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0lPUykge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFQbGF0Zm9ybU1nci5nZXRJbnN0YW5jZSgpLnN5cy5jaGVja0FsbG93SlNJbnRlcmZhY2UoXCJHVm9pY2VPcGVuTWljXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLmjqXlj6PkuI3lrZjlnKg6R1ZvaWNlT3Blbk1pY1wiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwiTmF0aXZlT2NDbGFzc1wiLCBcIkdWb2ljZU9wZW5NaWM6XCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0FORFJPSUQpIHtcclxuICAgICAgICAgICAgICAgIGlmICghUGxhdGZvcm1NZ3IuZ2V0SW5zdGFuY2UoKS5zeXMuY2hlY2tBbGxvd0pTSW50ZXJmYWNlKFwiR1ZvaWNlQ2xvc2VNaWNcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuaOpeWPo+S4jeWtmOWcqDpHVm9pY2VDbG9zZU1pY1wiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwiY29tL2theW91L3V0aWxzL05hdGl2ZUphdmFDbGFzc1wiLCBcIkdWb2ljZUNsb3NlTWljXCIsIFwiKClWXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBDbG9zZVNwZWFrZXIoKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR1ZvaWNlIENsb3NlU3BlYWtlclwiKTtcclxuICAgICAgICAgICAgaWYgKCFjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuT25Hdm9pY2VDbG9zZVNwZWFrZXJPSygpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoY2Muc3lzLm9zID09IGNjLnN5cy5PU19JT1MpIHtcclxuICAgICAgICAgICAgICAgIGlmICghUGxhdGZvcm1NZ3IuZ2V0SW5zdGFuY2UoKS5zeXMuY2hlY2tBbGxvd0pTSW50ZXJmYWNlKFwiR1ZvaWNlT3BlblNwZWFrZXJcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuaOpeWPo+S4jeWtmOWcqDpHVm9pY2VPcGVuU3BlYWtlclwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwiTmF0aXZlT2NDbGFzc1wiLCBcIkdWb2ljZU9wZW5TcGVha2VyOlwiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2Muc3lzLm9zID09IGNjLnN5cy5PU19BTkRST0lEKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIVBsYXRmb3JtTWdyLmdldEluc3RhbmNlKCkuc3lzLmNoZWNrQWxsb3dKU0ludGVyZmFjZShcIkdWb2ljZUNsb3NlU3BlYWtlclwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5o6l5Y+j5LiN5a2Y5ZyoOkdWb2ljZUNsb3NlU3BlYWtlclwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwiY29tL2theW91L3V0aWxzL05hdGl2ZUphdmFDbGFzc1wiLCBcIkdWb2ljZUNsb3NlU3BlYWtlclwiLCBcIigpVlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgRm9yYmlkTWVtYmVyVm9pY2UobWVtSWQ6IG51bWJlciwgYkVuYWJsZTogYm9vbGVhbiwgcm9vbUlkOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJHVm9pY2UgRm9yYmlkTWVtYmVyVm9pY2UgbWVtSWQgPSBcIiArIG1lbUlkICsgXCIsIGJFbmFibGUgPSBcIiArIGJFbmFibGUpO1xyXG4gICAgICAgICAgICBpZiAoIWNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoY2Muc3lzLm9zID09IGNjLnN5cy5PU19JT1MpIHtcclxuICAgICAgICAgICAgICAgIGlmICghUGxhdGZvcm1NZ3IuZ2V0SW5zdGFuY2UoKS5zeXMuY2hlY2tBbGxvd0pTSW50ZXJmYWNlKFwiR1ZvaWNlRm9yYmlkTWVtYmVyVm9pY2VcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuaOpeWPo+S4jeWtmOWcqDpHVm9pY2VGb3JiaWRNZW1iZXJWb2ljZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwiTmF0aXZlT2NDbGFzc1wiLCBcIkdWb2ljZUZvcmJpZE1lbWJlclZvaWNlOmVuQWJsZTpBbmRSb29tSUQ6XCIsIG1lbUlkLCBiRW5hYmxlLCByb29tSWQpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNjLnN5cy5vcyA9PSBjYy5zeXMuT1NfQU5EUk9JRCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFQbGF0Zm9ybU1nci5nZXRJbnN0YW5jZSgpLnN5cy5jaGVja0FsbG93SlNJbnRlcmZhY2UoXCJHVm9pY2VGb3JiaWRNZW1iZXJWb2ljZVwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5o6l5Y+j5LiN5a2Y5ZyoOkdWb2ljZUZvcmJpZE1lbWJlclZvaWNlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJjb20va2F5b3UvdXRpbHMvTmF0aXZlSmF2YUNsYXNzXCIsIFwiR1ZvaWNlRm9yYmlkTWVtYmVyVm9pY2VcIixcclxuICAgICAgICAgICAgICAgICAgICBcIihJWkxqYXZhL2xhbmcvU3RyaW5nOylWXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbWVtSWQsIGJFbmFibGUsIHJvb21JZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHBhdXNlKCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdWb2ljZSBwYXVzZVwiKTtcclxuICAgICAgICAgICAgaWYgKCFjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIVBsYXRmb3JtTWdyLmdldEluc3RhbmNlKCkuc3lzLmNoZWNrQWxsb3dKU0ludGVyZmFjZShcIkdWb2ljZVBhdXNlXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuaOpeWPo+S4jeWtmOWcqDpHVm9pY2VQYXVzZVwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY2Muc3lzLm9zID09IGNjLnN5cy5PU19JT1MpIHtcclxuICAgICAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJOYXRpdmVPY0NsYXNzXCIsIFwiR1ZvaWNlUGF1c2VcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2Muc3lzLm9zID09IGNjLnN5cy5PU19BTkRST0lEKSB7XHJcbiAgICAgICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwiY29tL2theW91L3V0aWxzL05hdGl2ZUphdmFDbGFzc1wiLCBcIkdWb2ljZVBhdXNlXCIsIFwiKClWXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXN1bWUoKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR1ZvaWNlIHJlc3VtZVwiKTtcclxuICAgICAgICAgICAgaWYgKCFjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIVBsYXRmb3JtTWdyLmdldEluc3RhbmNlKCkuc3lzLmNoZWNrQWxsb3dKU0ludGVyZmFjZShcIkdWb2ljZVJlc3VtZVwiKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLmjqXlj6PkuI3lrZjlnKg6R1ZvaWNlUGF1c2VcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNjLnN5cy5vcyA9PSBjYy5zeXMuT1NfSU9TKSB7XHJcbiAgICAgICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwiTmF0aXZlT2NDbGFzc1wiLCBcIkdWb2ljZVJlc3VtZVwiKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0FORFJPSUQpIHtcclxuICAgICAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJjb20va2F5b3UvdXRpbHMvTmF0aXZlSmF2YUNsYXNzXCIsIFwiR1ZvaWNlUmVzdW1lXCIsIFwiKClWXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXRJbml0U3RhdHVzKCkge1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIEdWb2ljZS5Jbml0T0s7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+WIneWni2d2XHJcbiAgICAgICAgT25Hdm9pY2VJbml0T0soKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6K+t6Z+z5Yid5aeL5YyW5oiQ5YqfXCIpO1xyXG4gICAgICAgICAgICBHVm9pY2UuSW5pdE9LID0gdHJ1ZTtcclxuICAgICAgICAgICAga2FheW91LmVtaXQoXCJcIiwgXCJPbkd2b2ljZUluaXRPS1wiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v5Yqg5YWl5oiQ5YqfXHJcbiAgICAgICAgT25Hdm9pY2VKb2luUm9vbU9LKG1lbWJlcklEOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgbWVtYmVySUQgPSBOdW1iZXIobWVtYmVySUQpOyAvL+WuieWNk+W5s+WPsOi/lOWbnueahOaYr3N0cmluZ+exu+Wei1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdWb2ljZSBPbkd2b2ljZUpvaW5Sb29tT0ssIG1lbWJlcklEID1cIiwgbWVtYmVySUQpO1xyXG4gICAgICAgICAgICBrYWF5b3UuZW1pdChcIlwiLCBcIk9uR3ZvaWNlSm9pblJvb21PS1wiLCB7IG1lbWJlcklEOiBtZW1iZXJJRCB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/lvIDpuqbmiJDlip9cclxuICAgICAgICBPbkd2b2ljZU9wZW5NaWNPSygpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJHVm9pY2UgT25Hdm9pY2VPcGVuTWljT0tcIik7XHJcbiAgICAgICAgICAgIGthYXlvdS5lbWl0KFwiXCIsIFwiT25Hdm9pY2VPcGVuTWljT0tcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5YWz6bqm5oiQ5YqfXHJcbiAgICAgICAgT25Hdm9pY2VDbG9zZU1pY09LKCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdWb2ljZSBPbkd2b2ljZUNsb3NlTWljT0tcIik7XHJcbiAgICAgICAgICAgIGthYXlvdS5lbWl0KFwiXCIsIFwiT25Hdm9pY2VDbG9zZU1pY09LXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+W8gOaJrOWjsOWZqOaIkOWKn1xyXG4gICAgICAgIE9uR3ZvaWNlT3BlblNwZWFrZXJPSygpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJHVm9pY2UgT25Hdm9pY2VPcGVuU3BlYWtlck9LXCIpO1xyXG4gICAgICAgICAgICBrYWF5b3UuZW1pdChcIlwiLCBcIk9uR3ZvaWNlT3BlblNwZWFrZXJPS1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/lhbPmiazlo7DlmajmiJDlip9cclxuICAgICAgICBPbkd2b2ljZUNsb3NlU3BlYWtlck9LKCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdWb2ljZSBPbkd2b2ljZUNsb3NlU3BlYWtlck9LXCIpO1xyXG4gICAgICAgICAgICBrYWF5b3UuZW1pdChcIlwiLCBcIk9uR3ZvaWNlQ2xvc2VTcGVha2VyT0tcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3N0YXR1cyDlj5blgLzvvJpcIjBcIu+8muWBnOatouivtOivnSBcIjFcIu+8muW8gOWni+ivtOivnSBcIjJcIu+8mue7p+e7reivtOivnVxyXG4gICAgICAgIE9uTWVtYmVyVm9pY2UobWVtYmVyaWQ6IG51bWJlciwgc3RhdHVzOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJHVm9pY2UgT25NZW1iZXJWb2ljZTpcIiArIG1lbWJlcmlkICsgXCItLS0tLS0tXCIgKyBzdGF0dXMpO1xyXG4gICAgICAgICAgICBrYWF5b3UuZW1pdChcIlwiLCBcIk9uR3ZvaWNlTWVtYmVyVm9pY2VcIiwgeyBtZW1iZXJpZDogbWVtYmVyaWQsIHN0YXR1czogc3RhdHVzIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3Mgd2ViR2FtZSB7XHJcbiAgICAgICAgTG9naW4odXJsOiBzdHJpbmcsIGlzVmVyOiBib29sZWFuKSB7XHJcbiAgICAgICAgICAgIGlmICghY2Muc3lzLmlzTmF0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFQbGF0Zm9ybU1nci5nZXRJbnN0YW5jZSgpLnN5cy5jaGVja0FsbG93SlNJbnRlcmZhY2UoXCJMb2dpbldlYlwiKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLmjqXlj6PkuI3lrZjlnKg6TG9naW5XZWJcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNjLnN5cy5vcyA9PSBjYy5zeXMuT1NfSU9TKSB7XHJcbiAgICAgICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwiTmF0aXZlT2NDbGFzc1wiLCBcIkxvZ2luV2ViOmlzVmVyOlwiLCB1cmwsIGlzVmVyKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0FORFJPSUQpIHtcclxuICAgICAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJjb20va2F5b3UvdXRpbHMvTmF0aXZlSmF2YUNsYXNzXCIsIFwiTG9naW5XZWJcIiwgXCIoTGphdmEvbGFuZy9TdHJpbmc7WilWXCIsIHVybCwgaXNWZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvbkxlZ2VuZFRvUGF5KHByb2R1Y3RJbmZvOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLkvKDlpYfnm7jlhbPllYblk4FcIiArIHByb2R1Y3RJbmZvKTtcclxuICAgICAgICAgICAgLy9rYWF5b3U6Ly9wYXk/YXBwaWQ9a2FheW91Nzg1MDI0MzMxJnZhbD0xMDAwJmdvb2RzaWQ9MSZnb29kc25hbWU9eXVhbmJhbyZvcmRlcmlkPTE2MDAyMzkwNDYwNzYyNTAyOTkmZXh0cmE9b3JkZXI6MTYwMDIzOTA0NjA3NjI1MDI5OSU3QyU3Q3ByaWNlOjEwMDBcclxuICAgICAgICAgICAga2FheW91LmVtaXQoXCJsb2JieVwiLCBcIm1vZDo6bWFsbDo6bGVnZW5kQnV5XCIsIHsgaW5mb1N0cjogcHJvZHVjdEluZm8gfSk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgY2xhc3MgWXVuVmEge1xyXG4gICAgICAgIHN0YXRpYyBiTG9naW5PSzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIG1pY01lbWJlcjogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG4gICAgICAgIF90ID0gbnVsbDtcclxuICAgICAgICBJbml0KCkge1xyXG4gICAgICAgICAgICBpZiAoIWNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghUGxhdGZvcm1NZ3IuZ2V0SW5zdGFuY2UoKS5zeXMuY2hlY2tBbGxvd0pTSW50ZXJmYWNlKFwiSW5pdE1pY1wiKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLmjqXlj6PkuI3lrZjlnKg6SW5pdE1pY1wiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY2Muc3lzLm9zID09IGNjLnN5cy5PU19JT1MpIHtcclxuICAgICAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJOYXRpdmVPY0NsYXNzXCIsIFwiSW5pdE1pY1wiKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0FORFJPSUQpIHtcclxuICAgICAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJjb20va2F5b3UvdXRpbHMvTmF0aXZlSmF2YUNsYXNzXCIsIFwiSW5pdE1pY1wiLCBcIigpVlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBZdW5WYS5iTG9naW5PSyA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBPbk1pY0xvZ2luT0soKSB7XHJcbiAgICAgICAgICAgIGthYXlvdS5lbWl0KFwiXCIsIFwiTWljTG9naW5PS1wiKTtcclxuICAgICAgICAgICAgLy9rYWF5b3UuUGxhdGZvcm1NZ3IuZ2V0SW5zdGFuY2UoKS5zeXMuRGlhbG9nKFwi6K+t6Z+z6ZO+5o6l5oiQ5YqfXCIpO1xyXG4gICAgICAgICAgICBZdW5WYS5iTG9naW5PSyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIElzTG9naW5PSygpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFl1blZhLmJMb2dpbk9LO1xyXG4gICAgICAgIH1cclxuICAgICAgICBMb2dpbih1aWQ6IHN0cmluZywgbmlja25hbWU6IHN0cmluZywgZXh0OiBzdHJpbmcgPSBcIlwiKSB7XHJcbiAgICAgICAgICAgIGlmICghY2Muc3lzLmlzTmF0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGluZm8gPSB7XHJcbiAgICAgICAgICAgICAgICB1aWQ6IHVpZCxcclxuICAgICAgICAgICAgICAgIG5pY2tuYW1lOiBuaWNrbmFtZSxcclxuICAgICAgICAgICAgICAgIGV4dDogZXh0XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGlmICghUGxhdGZvcm1NZ3IuZ2V0SW5zdGFuY2UoKS5zeXMuY2hlY2tBbGxvd0pTSW50ZXJmYWNlKFwiTG9naW5NaWNcIikpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5o6l5Y+j5LiN5a2Y5ZyoOkxvZ2luTWljXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0lPUykge1xyXG4gICAgICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIk5hdGl2ZU9jQ2xhc3NcIiwgXCJMb2dpbk1pYzpcIiwgSlNPTi5zdHJpbmdpZnkoaW5mbykpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNjLnN5cy5vcyA9PSBjYy5zeXMuT1NfQU5EUk9JRCkge1xyXG4gICAgICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcImNvbS9rYXlvdS91dGlscy9OYXRpdmVKYXZhQ2xhc3NcIiwgXCJMb2dpbk1pY1wiLCBcIihMamF2YS9sYW5nL1N0cmluZzspVlwiLCBKU09OLnN0cmluZ2lmeShpbmZvKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIExvZ291dCgpIHtcclxuICAgICAgICAgICAgaWYgKCFjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIVBsYXRmb3JtTWdyLmdldEluc3RhbmNlKCkuc3lzLmNoZWNrQWxsb3dKU0ludGVyZmFjZShcIkxvZ291dE1pY1wiKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLmjqXlj6PkuI3lrZjlnKg6TG9nb3V0TWljXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0lPUykge1xyXG4gICAgICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIk5hdGl2ZU9jQ2xhc3NcIiwgXCJMb2dvdXRNaWNcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2Muc3lzLm9zID09IGNjLnN5cy5PU19BTkRST0lEKSB7XHJcbiAgICAgICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwiY29tL2theW91L3V0aWxzL05hdGl2ZUphdmFDbGFzc1wiLCBcIkxvZ291dE1pY1wiLCBcIigpVlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBZdW5WYS5iTG9naW5PSyA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBCZWdpbk1pYygpIHtcclxuICAgICAgICAgICAgaWYgKCFjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuT25NaWNTdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghUGxhdGZvcm1NZ3IuZ2V0SW5zdGFuY2UoKS5zeXMuY2hlY2tBbGxvd0pTSW50ZXJmYWNlKFwiQmVnaW5NaWNcIikpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5o6l5Y+j5LiN5a2Y5ZyoOkJlZ2luTWljXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0lPUykge1xyXG4gICAgICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIk5hdGl2ZU9jQ2xhc3NcIiwgXCJCZWdpbk1pY1wiKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0FORFJPSUQpIHtcclxuICAgICAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJjb20va2F5b3UvdXRpbHMvTmF0aXZlSmF2YUNsYXNzXCIsIFwiQmVnaW5NaWNcIiwgXCIoKVZcIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBFbmRNaWMoKSB7XHJcbiAgICAgICAgICAgIGlmICghY2Muc3lzLmlzTmF0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLk9uTWljU3RvcCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Pbk1pY09rKFwidGV4dCB1cmxcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFQbGF0Zm9ybU1nci5nZXRJbnN0YW5jZSgpLnN5cy5jaGVja0FsbG93SlNJbnRlcmZhY2UoXCJFbmRNaWNcIikpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5o6l5Y+j5LiN5a2Y5ZyoOkVuZE1pY1wiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY2Muc3lzLm9zID09IGNjLnN5cy5PU19JT1MpIHtcclxuICAgICAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJOYXRpdmVPY0NsYXNzXCIsIFwiRW5kTWljXCIpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNjLnN5cy5vcyA9PSBjYy5zeXMuT1NfQU5EUk9JRCkge1xyXG4gICAgICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcImNvbS9rYXlvdS91dGlscy9OYXRpdmVKYXZhQ2xhc3NcIiwgXCJFbmRNaWNcIiwgXCIoKVZcIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBDYW5jZWxNaWMoKSB7XHJcbiAgICAgICAgICAgIGlmICghY2Muc3lzLmlzTmF0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLk9uTWljU3RvcCgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghUGxhdGZvcm1NZ3IuZ2V0SW5zdGFuY2UoKS5zeXMuY2hlY2tBbGxvd0pTSW50ZXJmYWNlKFwiQ2FuY2VsTWljXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuaOpeWPo+S4jeWtmOWcqDpDYW5jZWxNaWNcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNjLnN5cy5vcyA9PSBjYy5zeXMuT1NfSU9TKSB7XHJcbiAgICAgICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwiTmF0aXZlT2NDbGFzc1wiLCBcIkNhbmNlbE1pY1wiKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0FORFJPSUQpIHtcclxuICAgICAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJjb20va2F5b3UvdXRpbHMvTmF0aXZlSmF2YUNsYXNzXCIsIFwiQ2FuY2VsTWljXCIsIFwiKClWXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBQbGF5TWljKHVpZDogc3RyaW5nLCB1cmw6IHN0cmluZykge1xyXG4gICAgICAgICAgICBpZiAoIWNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Pbk1pY1BsYXlTdGFydCh1aWQpO1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5Pbk1pY1BsYXlFbmQodWlkKTtcclxuICAgICAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghUGxhdGZvcm1NZ3IuZ2V0SW5zdGFuY2UoKS5zeXMuY2hlY2tBbGxvd0pTSW50ZXJmYWNlKFwiUGxheU1pY1wiKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLmjqXlj6PkuI3lrZjlnKg6UGxheU1pY1wiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY2Muc3lzLm9zID09IGNjLnN5cy5PU19JT1MpIHtcclxuICAgICAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJOYXRpdmVPY0NsYXNzXCIsIFwiUGxheU1pYzpVUkw6XCIsIHVpZCwgdXJsKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0FORFJPSUQpIHtcclxuICAgICAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJjb20va2F5b3UvdXRpbHMvTmF0aXZlSmF2YUNsYXNzXCIsIFwiUGxheU1pY1wiLCBcIihMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZzspVlwiLCB1aWQsIHVybCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgT25NaWNTdGFydCgpIHtcclxuICAgICAgICAgICAga2FheW91LmVtaXQoXCJcIiwgXCJNaWNTdGFydFwiKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIE9uTWljVm9sdW1lKGV4dDogc3RyaW5nLCB2b2x1bWU6IG51bWJlcikge1xyXG4gICAgICAgICAgICBrYWF5b3UuZW1pdChcIlwiLCBcIk1pY1ZvbHVtZVwiLCB7IGV4dDogZXh0LCB2b2x1bWU6IHZvbHVtZSB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgT25NaWNPayh1cmw6IHN0cmluZykge1xyXG4gICAgICAgICAgICBrYWF5b3UuZW1pdChcIlwiLCBcIk1pY09rXCIsIHVybCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIE9uTWljU3RvcCgpIHtcclxuICAgICAgICAgICAga2FheW91LmVtaXQoXCJcIiwgXCJNaWNTdG9wXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgT25NaWNQbGF5U3RhcnQodWlkOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICBrYWF5b3UuZW1pdChcIlwiLCBcIk1pY1BsYXlTdGFydFwiLCB1aWQpO1xyXG4gICAgICAgICAgICBpZiAoa2FheW91LlBsYXRmb3JtTWdyLmdldEluc3RhbmNlKCkuaW0ubWljTWVtYmVyLmluZGV4T2YodWlkKSA8IDApIHtcclxuICAgICAgICAgICAgICAgIGthYXlvdS5QbGF0Zm9ybU1nci5nZXRJbnN0YW5jZSgpLmltLm1pY01lbWJlci5wdXNoKHVpZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGthYXlvdS5QbGF0Zm9ybU1nci5nZXRJbnN0YW5jZSgpLmltLl90KSB7IGNsZWFySW50ZXJ2YWwoa2FheW91LlBsYXRmb3JtTWdyLmdldEluc3RhbmNlKCkuaW0uX3QpOyBrYWF5b3UuUGxhdGZvcm1NZ3IuZ2V0SW5zdGFuY2UoKS5pbS5fdCA9IG51bGw7IH1cclxuXHJcbiAgICAgICAgICAgIGthYXlvdS5QbGF0Zm9ybU1nci5nZXRJbnN0YW5jZSgpLmltLl90ID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGthYXlvdS5QbGF0Zm9ybU1nci5nZXRJbnN0YW5jZSgpLmltLm1pY01lbWJlci5sZW5ndGggIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2FheW91LlBsYXRmb3JtTWdyLmdldEluc3RhbmNlKCkuaW0ubWljTWVtYmVyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGthYXlvdS5lbWl0KFwiXCIsIFwiTWljUGxheUVuZFwiLCBrYWF5b3UuUGxhdGZvcm1NZ3IuZ2V0SW5zdGFuY2UoKS5pbS5taWNNZW1iZXJbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoa2FheW91LlBsYXRmb3JtTWdyLmdldEluc3RhbmNlKCkuaW0uX3QpOyBrYWF5b3UuUGxhdGZvcm1NZ3IuZ2V0SW5zdGFuY2UoKS5pbS5fdCA9IG51bGw7XHJcbiAgICAgICAgICAgIH0sIDMwMDAwKVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgT25NaWNQbGF5RW5kKHVpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGxldCBpbmRleCA9IGthYXlvdS5QbGF0Zm9ybU1nci5nZXRJbnN0YW5jZSgpLmltLm1pY01lbWJlci5pbmRleE9mKHVpZCk7XHJcbiAgICAgICAgICAgIGthYXlvdS5QbGF0Zm9ybU1nci5nZXRJbnN0YW5jZSgpLmltLm1pY01lbWJlci5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICBrYWF5b3UuZW1pdChcIlwiLCBcIk1pY1BsYXlFbmRcIiwgdWlkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgV2VjaGF0IHtcclxuICAgICAgICBzdGF0aWMgaXNVcGRhdGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICByZXdhcmRlZFZpZGVvQWQgPSBudWxsO1xyXG4gICAgICAgIGZpbGU6IGFueTtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgaWYgKGNjLnN5cy5pc1dlQ2hhdCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maWxlID0gV1hKU0JyaWRnZS5maWxlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maWxlID0ge307XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgQ3JlYXRlTG9naW5CdG4ocGFyYW0pIHtcclxuICAgICAgICAgICAgaWYgKCFjYy5zeXMuaXNXZUNoYXQpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgICAgIFdYSlNCcmlkZ2UubG9naW4uY3JlYXRlKHBhcmFtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgRGVzdG9yeUxvZ2luQnRuKCkge1xyXG4gICAgICAgICAgICBpZiAoIWNjLnN5cy5pc1dlQ2hhdCkgeyByZXR1cm47IH1cclxuICAgICAgICAgICAgV1hKU0JyaWRnZS5sb2dpbi5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFzeW5jIEdldEFjY2Vzc1Rva2VuKGFwcGlkLCBwbGF0Zm9ybSA9IDMpIHtcclxuICAgICAgICAgICAgbGV0IHJlczogYW55ID0gYXdhaXQga2FheW91LnNlbmRNZXNzYWdlKFwibG9iYnlcIiwgXCJnZXRhY2Nlc3Njb2RlXCIsIHsgYXBwaWQ6IGFwcGlkLCBwbGF0Zm9ybSB9LCBcIndzOjpNc2c6OmdldGFjY2Vzc2NvZGVcIik7XHJcbiAgICAgICAgICAgIGlmIChyZXMuZXJyY29kZSAhPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiByZXMuYWNjZXNzX3Rva2VuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v6I635Y+W5ZCv5Yqo5Y+C5pWwXHJcbiAgICAgICAgR2V0UXVlcnkoKSB7XHJcbiAgICAgICAgICAgIGlmICghY2Muc3lzLmlzV2VDaGF0KSB7IHJldHVybiB7fTsgfVxyXG4gICAgICAgICAgICByZXR1cm4gV1hKU0JyaWRnZS5zeXMucXVlcnkgPyBXWEpTQnJpZGdlLnN5cy5xdWVyeSA6IHt9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBMb2dpbigpIHtcclxuICAgICAgICAgICAgV2VjaGF0LmlzVXBkYXRlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGthYXlvdS5lbWl0KFwiY29tbW9uXCIsIFwidWk6OkxvYWRpbmc6OlNob3dcIiwgeyBtc2c6IFwi5q2j5Zyo5ZCv5Yqo5b6u5L+h77yM6K+356iN5ZCOLi4uXCIsIHRpbWU6IDIgfSk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgUGxhdGZvcm1NZ3IuZ2V0SW5zdGFuY2UoKS53eC5wdWxsV1goKTtcclxuICAgICAgICAgICAgfSwgMSlcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVsbFdYKCkge1xyXG4gICAgICAgICAgICBpZiAoIWNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgY2MubG9nKFdlY2hhdC5pc1VwZGF0ZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNjLnN5cy5vcyA9PSBjYy5zeXMuT1NfSU9TKSB7XHJcbiAgICAgICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwiTmF0aXZlT2NDbGFzc1wiLCBcIkxvZ2luV3hcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2Muc3lzLm9zID09IGNjLnN5cy5PU19BTkRST0lEKSB7XHJcbiAgICAgICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwiY29tL2theW91L3V0aWxzL05hdGl2ZUphdmFDbGFzc1wiLCBcIkxvZ2luV3hcIiwgXCIoKVZcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgVXBkYXRlKCkge1xyXG4gICAgICAgICAgICBXZWNoYXQuaXNVcGRhdGUgPSB0cnVlO1xyXG4gICAgICAgICAgICBrYWF5b3UuZW1pdChcImNvbW1vblwiLCBcInVpOjpMb2FkaW5nOjpTaG93XCIsIHsgbXNnOiBcIuato+WcqOWQr+WKqOW+ruS/oe+8jOivt+eojeWQji4uLlwiLCB0aW1lOiAyIH0pO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIFBsYXRmb3JtTWdyLmdldEluc3RhbmNlKCkud3gucHVsbFdYKCk7XHJcbiAgICAgICAgICAgIH0sIDEpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIE9uV3hMb2dpbkNhbmNlbCgpIHtcclxuICAgICAgICAgICAga2FheW91LmVtaXQoXCJjb21tb25cIiwgXCJ1aTo6TG9hZGluZzo6SGlkZVwiKTtcclxuICAgICAgICAgICAga2FheW91LmVtaXQoXCJcIiwgXCJXeExvZ2luQ2FuY2VsXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBPbld4SW5zdGFsbGVkKCkge1xyXG4gICAgICAgICAgICBrYWF5b3UuZW1pdChcImNvbW1vblwiLCBcInVpOjpMb2FkaW5nOjpIaWRlXCIpO1xyXG4gICAgICAgICAgICBrYWF5b3UuZW1pdChcIlwiLCBcIld4SW5zdGFsbGVkXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGFzdFdlQ2hhdENvZGUgPSBcIlwiO1xyXG4gICAgICAgIE9uTG9naW4oY29kZTogc3RyaW5nLCBpdj86IHN0cmluZywgaW5mbz86IHN0cmluZywgcmF3ZGF0YT86IHN0cmluZykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuW+ruS/oU9uTG9naW46XCIsIGNvZGUpO1xyXG4gICAgICAgICAgICBpZiAoIWNvZGUgfHwgY29kZS5sZW5ndGggPCAxKSB7IHJldHVybjsgfVxyXG4gICAgICAgICAgICAvL+mYsuatouS4pOasoeWbnuiwg1xyXG4gICAgICAgICAgICBpZiAodGhpcy5sYXN0V2VDaGF0Q29kZSA9PSBjb2RlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5sYXN0V2VDaGF0Q29kZSA9IGNvZGU7XHJcbiAgICAgICAgICAgIGthYXlvdS5lbWl0KFwiY29tbW9uXCIsIFwidWk6OkxvYWRpbmc6OkhpZGVcIik7XHJcbiAgICAgICAgICAgIGlmIChXZWNoYXQuaXNVcGRhdGUpIHtcclxuICAgICAgICAgICAgICAgIGthYXlvdS5lbWl0KFwiXCIsIFwibW9kOjpVc2VyOjp3eDo6dXBkYXRlXCIsIGNvZGUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAga2FheW91LmVtaXQoXCJcIiwgXCJtb2Q6OlVzZXI6Ond4Ojpsb2dpblwiLCB7IGNvZGU6IGNvZGUsIGl2OiBpdiwgaW5mbzogaW5mbywgcmF3ZGF0YTogcmF3ZGF0YSB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgT25TaGFyZVd4UmVzdWx0KGNvZGU6IHN0cmluZywgdHJhbnNhY3Rpb246IHN0cmluZykge1xyXG4gICAgICAgICAgICBpZiAoIWNvZGUgfHwgY29kZS5sZW5ndGggPCAxKSB7IHJldHVybjsgfVxyXG4gICAgICAgICAgICBrYWF5b3UuZW1pdChcIlwiLCBcIk9uU2hhcmVXeFJlc3VsdFwiLCB7IGNvZGU6IGNvZGUsIHRyYW5zYWN0aW9uOiB0cmFuc2FjdGlvbiB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgU2hhcmVUZXh0KHRpdGxlOiBzdHJpbmcsIHRleHQ6IHN0cmluZywgdHJhbnNhY3Rpb246IHN0cmluZyA9IFwiXCIpIHtcclxuICAgICAgICAgICAgaWYgKCFjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgZGF0YSA9IHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiB0aXRsZSxcclxuICAgICAgICAgICAgICAgIHRleHQ6IHRleHQsXHJcbiAgICAgICAgICAgICAgICB0cmFuc2FjdGlvbjogdHJhbnNhY3Rpb25cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY2Muc3lzLm9zID09IGNjLnN5cy5PU19JT1MpIHtcclxuICAgICAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJOYXRpdmVPY0NsYXNzXCIsIFwiU2hhcmVUZXh0OlwiLCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2Muc3lzLm9zID09IGNjLnN5cy5PU19BTkRST0lEKSB7XHJcbiAgICAgICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwiY29tL2theW91L3V0aWxzL05hdGl2ZUphdmFDbGFzc1wiLCBcIlNoYXJlVGV4dFwiLCBcIihMamF2YS9sYW5nL1N0cmluZzspVlwiLCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgU2hhcmVUaW1lTGluZVRleHQodGl0bGU6IHN0cmluZywgdGV4dDogc3RyaW5nLCB0cmFuc2FjdGlvbjogc3RyaW5nID0gXCJcIikge1xyXG4gICAgICAgICAgICBpZiAoIWNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBkYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IHRpdGxlLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogdGV4dCxcclxuICAgICAgICAgICAgICAgIHRyYW5zYWN0aW9uOiB0cmFuc2FjdGlvblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0lPUykge1xyXG4gICAgICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIk5hdGl2ZU9jQ2xhc3NcIiwgXCJTaGFyZVRpbWVMaW5lVGV4dDpcIiwgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNjLnN5cy5vcyA9PSBjYy5zeXMuT1NfQU5EUk9JRCkge1xyXG4gICAgICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcImNvbS9rYXlvdS91dGlscy9OYXRpdmVKYXZhQ2xhc3NcIiwgXCJTaGFyZVRpbWVMaW5lVGV4dFwiLCBcIihMamF2YS9sYW5nL1N0cmluZzspVlwiLCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgU2hhcmVVUkwodGl0bGU6IHN0cmluZywgdGV4dDogc3RyaW5nLCB1cmw6IHN0cmluZywgdHJhbnNhY3Rpb246IHN0cmluZyA9IFwiXCIpIHtcclxuICAgICAgICAgICAgaWYgKCFjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgZGF0YSA9IHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiB0aXRsZSxcclxuICAgICAgICAgICAgICAgIHRleHQ6IHRleHQsXHJcbiAgICAgICAgICAgICAgICB1cmw6IHVybCxcclxuICAgICAgICAgICAgICAgIHRyYW5zYWN0aW9uOiB0cmFuc2FjdGlvblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0lPUykge1xyXG4gICAgICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIk5hdGl2ZU9jQ2xhc3NcIiwgXCJTaGFyZVVSTDpcIiwgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNjLnN5cy5vcyA9PSBjYy5zeXMuT1NfQU5EUk9JRCkge1xyXG4gICAgICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcImNvbS9rYXlvdS91dGlscy9OYXRpdmVKYXZhQ2xhc3NcIiwgXCJTaGFyZVVSTFwiLCBcIihMamF2YS9sYW5nL1N0cmluZzspVlwiLCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgU2hhcmVUaW1lTGluZVVSTCh0aXRsZTogc3RyaW5nLCB0ZXh0OiBzdHJpbmcsIHVybDogc3RyaW5nLCB0cmFuc2FjdGlvbjogc3RyaW5nID0gXCJcIikge1xyXG4gICAgICAgICAgICBpZiAoIWNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBkYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IHRpdGxlLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogdGV4dCxcclxuICAgICAgICAgICAgICAgIHVybDogdXJsLFxyXG4gICAgICAgICAgICAgICAgdHJhbnNhY3Rpb246IHRyYW5zYWN0aW9uXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNjLnN5cy5vcyA9PSBjYy5zeXMuT1NfSU9TKSB7XHJcbiAgICAgICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwiTmF0aXZlT2NDbGFzc1wiLCBcIlNoYXJlVGltZUxpbmVVUkw6XCIsIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0FORFJPSUQpIHtcclxuICAgICAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJjb20va2F5b3UvdXRpbHMvTmF0aXZlSmF2YUNsYXNzXCIsIFwiU2hhcmVUaW1lTGluZVVSTFwiLCBcIihMamF2YS9sYW5nL1N0cmluZzspVlwiLCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgU2hhcmVJbWFnZSh0aXRsZTogc3RyaW5nLCBwYXRoOiBzdHJpbmcsIHRyYW5zYWN0aW9uOiBzdHJpbmcgPSBcIlwiKSB7XHJcbiAgICAgICAgICAgIGlmICghY2Muc3lzLmlzTmF0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGRhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogdGl0bGUsXHJcbiAgICAgICAgICAgICAgICBwYXRoOiBwYXRoLFxyXG4gICAgICAgICAgICAgICAgdHJhbnNhY3Rpb246IHRyYW5zYWN0aW9uXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNjLnN5cy5vcyA9PSBjYy5zeXMuT1NfSU9TKSB7XHJcbiAgICAgICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwiTmF0aXZlT2NDbGFzc1wiLCBcIlNoYXJlSW1hZ2U6XCIsIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0FORFJPSUQpIHtcclxuICAgICAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJjb20va2F5b3UvdXRpbHMvTmF0aXZlSmF2YUNsYXNzXCIsIFwiU2hhcmVJbWFnZVwiLCBcIihMamF2YS9sYW5nL1N0cmluZzspVlwiLCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgU2hhcmVUaW1lTGluZUltYWdlKHRpdGxlOiBzdHJpbmcsIHBhdGg6IHN0cmluZywgdHJhbnNhY3Rpb246IHN0cmluZyA9IFwiXCIpIHtcclxuICAgICAgICAgICAgaWYgKCFjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgZGF0YSA9IHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiB0aXRsZSxcclxuICAgICAgICAgICAgICAgIHBhdGg6IHBhdGgsXHJcbiAgICAgICAgICAgICAgICB0cmFuc2FjdGlvbjogdHJhbnNhY3Rpb25cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY2Muc3lzLm9zID09IGNjLnN5cy5PU19JT1MpIHtcclxuICAgICAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJOYXRpdmVPY0NsYXNzXCIsIFwiU2hhcmVUaW1lTGluZUltYWdlOlwiLCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2Muc3lzLm9zID09IGNjLnN5cy5PU19BTkRST0lEKSB7XHJcbiAgICAgICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwiY29tL2theW91L3V0aWxzL05hdGl2ZUphdmFDbGFzc1wiLCBcIlNoYXJlVGltZUxpbmVJbWFnZVwiLCBcIihMamF2YS9sYW5nL1N0cmluZzspVlwiLCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy89PT09PT09PT09PT095b6u5L+h5bCP5ri45oiP6KeG6aKR5qih5Z2XPT09PT09PT09XHJcbiAgICAgICAgY3JlYXRlUmV3YXJkZWRWaWRlb0FkKGRhdGE6IHsgYWRVbml0SWQ6IHN0cmluZyB9KSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgLy8gdGhpcy5yZXdhcmRlZFZpZGVvQWQgPSB3eC5jcmVhdGVSZXdhcmRlZFZpZGVvQWQoZGF0YSk7Ly9UT0RPIOWIm+W7uua/gOWKseinhumikeW5v+WRiue7hOS7tlxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnJld2FyZGVkVmlkZW9BZCk7XHJcbiAgICAgICAgICAgIHRoaXMucmV3YXJkZWRWaWRlb0FkLm9uTG9hZCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5r+A5Yqx6KeG6aKRIOW5v+WRiuWKoOi9veaIkOWKnycpO1xyXG4gICAgICAgICAgICAgICAga2FheW91LmVtaXQoJ2xvYmJ5JywgJ3VpOjpMZWZ0TWVudVBhbmxlOjp2aWRlb0xvYWQnKTtcclxuICAgICAgICAgICAgICAgIC8vIHNlbGYucGxheVZpZGVvKCk7XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICB0aGlzLnJld2FyZGVkVmlkZW9BZC5vbkVycm9yKGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGVyci5lcnJDb2RlICYmIGVyci5lcnJNc2cpIHtcclxuICAgICAgICAgICAgICAgICAgICBrYWF5b3UuZW1pdCgnY29tbW9uJywgJ3VpOjpUb2FzdDo6U2hvdycsIHsgbXNnOiBlcnIuZXJyTXNnIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgLy/lhbPpl63lub/lkYpcclxuICAgICAgICAgICAgdGhpcy5yZXdhcmRlZFZpZGVvQWQub25DbG9zZShyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcyAmJiByZXMuaXNFbmRlZCB8fCByZXMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOato+W4uOaSreaUvue7k+adn++8jOWPr+S7peS4i+WPkea4uOaIj+WlluWKsVxyXG4gICAgICAgICAgICAgICAgICAgIGthYXlvdS5lbWl0KCdsb2JieScsICd3czo6TXNnOjp2aWRlb2FkYXdhcmQnKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5q2j5bi45pKt5pS+57uT5p2f77yM5Y+v5Lul5LiL5Y+R5ri45oiP5aWW5YqxJylcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5pKt5pS+5Lit6YCU6YCA5Ye677yM5LiN5LiL5Y+R5ri45oiP5aWW5YqxXHJcbiAgICAgICAgICAgICAgICAgICAga2FheW91LmVtaXQoJ2NvbW1vbicsICd1aTo6VG9hc3Q6OlNob3cnLCB7IG1zZzogXCLmkq3mlL7kuK3pgJTpgIDlh7rvvIzkuI3kuIvlj5HmuLjmiI/lpZblirFcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5pKt5pS+5Lit6YCU6YCA5Ye677yM5LiN5LiL5Y+R5ri45oiP5aWW5YqxJylcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5Y+q5pyJ5Zyo55So5oi354K55Ye75r+A5Yqx6KeG6aKR5bm/5ZGK57uE5Lu25LiK55qEIOWFs+mXreW5v+WRiiDmjInpkq7ml7bvvIzlub/lkYrmiY3kvJrlhbPpl63jgILlvIDlj5HogIXkuI3lj6/mjqfliLbmv4DlirHop4bpopHlub/lkYrnu4Tku7bnmoTpmpDol4/jgIJcclxuICAgICAgICBwbGF5VmlkZW8oKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgc2VsZi5yZXdhcmRlZFZpZGVvQWQuc2hvdygpXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnJld2FyZGVkVmlkZW9BZC5sb2FkKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gc2VsZi5yZXdhcmRlZFZpZGVvQWQuc2hvdygpKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBTaG93RmVlZGJhY2sodGl0bGU/OiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgaWYgKGNjLnN5cy5pc1dlQ2hhdCA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gY29uc3QgYnV0dG9uID0gd3guY3JlYXRlRmVlZGJhY2tCdXR0b24oe1xyXG4gICAgICAgICAgICAvLyAgICAgdHlwZTogJ3RleHQnLFxyXG4gICAgICAgICAgICAvLyAgICAgdGV4dDogdGl0bGUgfHwgJ+aJk+W8gOaEj+ingeWPjemmiOmhtemdoicsXHJcbiAgICAgICAgICAgIC8vICAgICBzdHlsZToge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIGxlZnQ6IDEwLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIHRvcDogNzYsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgd2lkdGg6IDIwMCxcclxuICAgICAgICAgICAgLy8gICAgICAgICBoZWlnaHQ6IDQwLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIGxpbmVIZWlnaHQ6IDQwLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyNmZjAwMDAnLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIGNvbG9yOiAnI2ZmZmZmZicsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcclxuICAgICAgICAgICAgLy8gICAgICAgICBmb250U2l6ZTogMTYsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgYm9yZGVyUmFkaXVzOiA0XHJcbiAgICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgIC8vIH0pO1xyXG4gICAgICAgICAgICAvLyBidXR0b24uc2hvdygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBCYWlkdU1hcCB7XHJcbiAgICAgICAgcHVsbENvdW50ID0gMDtcclxuICAgICAgICBoYXNSZXR1cm4gPSBmYWxzZTsgICAgICAvL+iwg+eUqOaYr+WQpuaciei/lOWbnlxyXG4gICAgICAgIGNhbGxpbmcgPSBmYWxzZTsgICAgICAgICAgLy/mmK/lkKblnKjosIPnlKhcclxuICAgICAgICBHZXRNYXBJbmZvKCkge1xyXG4gICAgICAgICAgICBpZiAoIWNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghUGxhdGZvcm1NZ3IuZ2V0SW5zdGFuY2UoKS5zeXMuY2hlY2tBbGxvd0pTSW50ZXJmYWNlKFwiR2V0TWFwSW5mb1wiKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLmjqXlj6PkuI3lrZjlnKg6R2V0TWFwSW5mb1wiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIWthYXlvdS5QbGF0Zm9ybU1nci5nZXRJbnN0YW5jZSgpLm1hcC5jYWxsaW5nKSB7XHJcbiAgICAgICAgICAgICAgICBrYWF5b3UuUGxhdGZvcm1NZ3IuZ2V0SW5zdGFuY2UoKS5tYXAuaGFzUmV0dXJuID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBrYWF5b3UuUGxhdGZvcm1NZ3IuZ2V0SW5zdGFuY2UoKS5tYXAuY2FsbGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWthYXlvdS5QbGF0Zm9ybU1nci5nZXRJbnN0YW5jZSgpLm1hcC5oYXNSZXR1cm4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAga2FheW91LlBsYXRmb3JtTWdyLmdldEluc3RhbmNlKCkubWFwLmNhbGxpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJtYXAgZXJyOlwiICsgbXlVc2VySWQgKyBcIjpcIiArIFwiZ3Bz5rKh5pyJ5pS25Yiw5Lu75L2V6L+U5ZueXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBrYWF5b3UuUGxhdGZvcm1NZ3IuZ2V0SW5zdGFuY2UoKS5zeXMuUG9zdEJ1Z2x5KFwibWFwIGVycjpcIiArIGthYXlvdS5nZXRMb2JieVZlcnNpb24oKSwgXCJ0aW1lb3V0XCIsIG15VXNlcklkICsgXCI6XCIgKyBcImdwc+ayoeacieaUtuWIsOS7u+S9lei/lOWbnlwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LCA1MDAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgbXlVc2VySWQgPSBcIlwiO1xyXG4gICAgICAgICAgICBsZXQgdXNlckluZm8gPSBsb2JieS5tb2QuVXNlci5nZXRJbnN0YW5jZSgpLmdldFVzZXJJbmZvKCk7XHJcbiAgICAgICAgICAgIGlmICghIXVzZXJJbmZvKSB7XHJcbiAgICAgICAgICAgICAgICBteVVzZXJJZCA9IHVzZXJJbmZvLnVpZC50b1N0cmluZygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBjYWxsVGltZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgIGxldCBub3cgPSBjYWxsVGltZS50b0xvY2FsZVN0cmluZygpO1xyXG4gICAgICAgICAgICBpZiAoY2Muc3lzLm9zID09IGNjLnN5cy5PU19JT1MpIHtcclxuICAgICAgICAgICAgICAgIGthYXlvdS5QbGF0Zm9ybU1nci5nZXRJbnN0YW5jZSgpLm1hcC50cmFjZU1hcChub3cgKyBcIuW8gOWni+iwg+eUqGlvcyBncHMgc2RrXCIpO1xyXG4gICAgICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIk5hdGl2ZU9jQ2xhc3NcIiwgXCJHZXRNYXBJbmZvXCIpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNjLnN5cy5vcyA9PSBjYy5zeXMuT1NfQU5EUk9JRCkge1xyXG4gICAgICAgICAgICAgICAga2FheW91LlBsYXRmb3JtTWdyLmdldEluc3RhbmNlKCkubWFwLnRyYWNlTWFwKG5vdyArIFwi5byA5aeL6LCD55SoYW5kcm9pZCBncHMgc2RrXCIpO1xyXG4gICAgICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcImNvbS9rYXlvdS91dGlscy9OYXRpdmVKYXZhQ2xhc3NcIiwgXCJHZXRNYXBJbmZvXCIsIFwiKClWXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpc1ZhbGlkQWRkcihsb25naXR1ZGU6IG51bWJlciwgbGF0aXR1ZGU6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICBpZiAobG9uZ2l0dWRlID09IE5hTiB8fCBsYXRpdHVkZSA9PSBOYU4pIHsgcmV0dXJuIGZhbHNlOyB9XHJcbiAgICAgICAgICAgIC8vbHZ4aW4yMDAxMTZcclxuICAgICAgICAgICAgaWYgKGxvbmdpdHVkZSA8IC0xODAgfHwgbG9uZ2l0dWRlID4gMTgwIHx8IGxhdGl0dWRlID4gOTAgfHwgbGF0aXR1ZGUgPCAtOTApIHsgcmV0dXJuIGZhbHNlIH07Ly/ov4fmu6TotoXkuIrkuIvpmZBcclxuICAgICAgICAgICAgLy9pZiAobG9uZ2l0dWRlIDwgMC4wMSAmJiBsb25naXR1ZGUgPiAtMC4wMSAmJiBsYXRpdHVkZSA+IC0wLjAxICYmIGxhdGl0dWRlIDwgMC4wMSkgeyByZXR1cm4gZmFsc2UgfTsvL+i/h+a7pO+8iDDvvIww77yJXHJcbiAgICAgICAgICAgIC8vaWYgKGxhdGl0dWRlID4gMzkuOSAmJiBsYXRpdHVkZSA8IDM5Ljk1ICYmIGxvbmdpdHVkZSA+IDExNi4zNSAmJiBsb25naXR1ZGUgPCAxMTYuNDUpIHsgcmV0dXJuIGZhbHNlIH07Ly/ov4fmu6TljJfkuqzkuJzln47ljLpcclxuICAgICAgICAgICAgLy9sdzIwMDIyN++8mi0yfjLpg73orqTkuLrmmK/mqKHmi5/lmahcclxuICAgICAgICAgICAgaWYgKGxvbmdpdHVkZSA+PSAtMiAmJiBsb25naXR1ZGUgPD0gMiAmJiBsYXRpdHVkZSA+PSAtMiAmJiBsYXRpdHVkZSA8PSAyKSB7IHJldHVybiBmYWxzZSB9O1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGp1bXBHUFNTZXR0aW5nKG1zZ2NvZGUpIHtcclxuICAgICAgICAgICAgaWYgKGNjLnN5cy5vcyA9PSBjYy5zeXMuT1NfQU5EUk9JRCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFQbGF0Zm9ybU1nci5nZXRJbnN0YW5jZSgpLnN5cy5jaGVja0FsbG93SlNJbnRlcmZhY2UoXCJKdW1wR1BTU2VydmljZVNldHRpbmdcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuaOpeWPo+S4jeWtmOWcqDpKdW1wR1BTU2VydmljZVNldHRpbmdcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCFQbGF0Zm9ybU1nci5nZXRJbnN0YW5jZSgpLnN5cy5jaGVja0FsbG93SlNJbnRlcmZhY2UoXCJKdW1wR1BTQXV0aFNldHRpbmdcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuaOpeWPo+S4jeWtmOWcqDpKdW1wR1BTU2VydmljZVNldHRpbmdcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKG1zZ2NvZGUgPT0gXCItMVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcImNvbS9rYXlvdS91dGlscy9OYXRpdmVKYXZhQ2xhc3NcIiwgXCJKdW1wR1BTU2VydmljZVNldHRpbmdcIiwgXCIoKVZcIik7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG1zZ2NvZGUgPT0gXCItMlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcImNvbS9rYXlvdS91dGlscy9OYXRpdmVKYXZhQ2xhc3NcIiwgXCJKdW1wR1BTQXV0aFNldHRpbmdcIiwgXCIoKVZcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgT25HYW9EZU1hcEluZm8oZGF0YSkge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAga2FheW91LlBsYXRmb3JtTWdyLmdldEluc3RhbmNlKCkubWFwLmhhc1JldHVybiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBrYWF5b3UuUGxhdGZvcm1NZ3IuZ2V0SW5zdGFuY2UoKS5tYXAuY2FsbGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJtYXA65pS25Yiw6auY5b635Zue6LCD77yaXCIgKyBkYXRhKTtcclxuICAgICAgICAgICAgICAgIGxldCBtcCA9IEpTT04ucGFyc2UoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICBpZiAobXApIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGltZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5vdyA9IHRpbWUudG9Mb2NhbGVTdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICBrYWF5b3UuUGxhdGZvcm1NZ3IuZ2V0SW5zdGFuY2UoKS5tYXAudHJhY2VNYXAobm93ICsgXCLpq5jlvrfvvJpcIiArIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBhcmVhSW5mbyA9IGthYXlvdS5EYXRhU2V0LmdldChcInVzZXI6Ok1hcFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbXlVc2VySWQgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB1c2VySW5mbyA9IGxvYmJ5Lm1vZC5Vc2VyLmdldEluc3RhbmNlKCkuZ2V0VXNlckluZm8oKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISF1c2VySW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBteVVzZXJJZCA9IHVzZXJJbmZvLnVpZC50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAobG9kYXNoLmlzRW1wdHkoYXJlYUluZm8pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgha2FheW91LlBsYXRmb3JtTWdyLmdldEluc3RhbmNlKCkubWFwLmlzVmFsaWRBZGRyKE51bWJlcihtcC5sb25naXR1ZGUpLCBOdW1iZXIobXAubGF0aXR1ZGUpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2FheW91LlBsYXRmb3JtTWdyLmdldEluc3RhbmNlKCkubWFwLkdldE1hcEluZm8oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGthYXlvdS5QbGF0Zm9ybU1nci5nZXRJbnN0YW5jZSgpLm1hcC5wdWxsQ291bnQrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGthYXlvdS5QbGF0Zm9ybU1nci5nZXRJbnN0YW5jZSgpLnN5cy5Qb3N0QnVnbHkoXCJtYXAgZXJyOlwiICsga2FheW91LmdldExvYmJ5VmVyc2lvbigpLCBcImlzTm90VmFsaWRBZGRyXCIsIG15VXNlcklkICsgXCI6XCIgKyBkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGthYXlvdS5QbGF0Zm9ybU1nci5nZXRJbnN0YW5jZSgpLm1hcC5wdWxsQ291bnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2FheW91LkRhdGFTZXQuc2V0KFwidXNlcjo6TWFwXCIsIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2FheW91LmVtaXQoXCJcIiwgXCJNYXBJbmZvXCIsIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibWFwIGVyciBnYW9kZTpcIiArIGVycik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIE9uTWFwSW5mbyhkYXRhKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBrYWF5b3UuUGxhdGZvcm1NZ3IuZ2V0SW5zdGFuY2UoKS5tYXAuaGFzUmV0dXJuID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGthYXlvdS5QbGF0Zm9ybU1nci5nZXRJbnN0YW5jZSgpLm1hcC5jYWxsaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBsZXQgbXAgPSBKU09OLnBhcnNlKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRpbWUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBub3cgPSB0aW1lLnRvTG9jYWxlU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlY29udCA9IDEwO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBteVVzZXJJZCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHVzZXJJbmZvID0gbG9iYnkubW9kLlVzZXIuZ2V0SW5zdGFuY2UoKS5nZXRVc2VySW5mbygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghIXVzZXJJbmZvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG15VXNlcklkID0gdXNlckluZm8udWlkLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghIW1wLmVycmNvZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJtYXAgZXJybXNnOlwiICsgbXAuZXJybXNnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9rYWF5b3UuZW1pdCgnY29tbW9uJywgJ3VpOjpUb2FzdDo6U2hvdycsIHsgbXNnOiBtcC5lcnJtc2cgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGthYXlvdS5EYXRhU2V0LnNldChcIkdQU0Vycm9yXCIsIG1wLmVycmNvZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBrYWF5b3UuUGxhdGZvcm1NZ3IuZ2V0SW5zdGFuY2UoKS5zeXMuUG9zdEJ1Z2x5KFwibWFwIGVycjpcIiArIGthYXlvdS5nZXRMb2JieVZlcnNpb24oKSwgbXAuZXJyY29kZSwgbXlVc2VySWQgKyBcIjpcIiArIG1wLmVycm1zZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJtYXA65pS25Yiw55m+5bqm5Zue6LCD77yaXCIgKyBkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAga2FheW91LlBsYXRmb3JtTWdyLmdldEluc3RhbmNlKCkubWFwLnRyYWNlTWFwKG5vdyArIFwi55m+5bqm77yaXCIgKyBkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNjLnN5cy5pc05hdGl2ZSAmJiBjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0lPUykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjb250ID0gMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoa2FheW91LlBsYXRmb3JtTWdyLmdldEluc3RhbmNlKCkubWFwLnB1bGxDb3VudCA8IHJlY29udCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1wLmxvbmdpdHVkZSAmJiBtcC5sYXRpdHVkZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtcC5sb25naXR1ZGUgPT0gJzQuOUUtMzI0JyAmJiBtcC5sYXRpdHVkZSA9PSAnNC45RS0zMjQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5aaC5p6c56iL5bqP5ZCv5Yqo5Yiw546w5Zyo6L+Y5rKh5Y+W5Yiw57uP57qs5bqm77yM5bCx5ZCRYnVnbHnmsYfmiqVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFyZWFJbmZvID0ga2FheW91LkRhdGFTZXQuZ2V0KFwidXNlcjo6TWFwXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobG9kYXNoLmlzRW1wdHkoYXJlYUluZm8pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrYWF5b3UuUGxhdGZvcm1NZ3IuZ2V0SW5zdGFuY2UoKS5tYXAuR2V0TWFwSW5mbygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2FheW91LlBsYXRmb3JtTWdyLmdldEluc3RhbmNlKCkubWFwLnB1bGxDb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2FheW91LlBsYXRmb3JtTWdyLmdldEluc3RhbmNlKCkuc3lzLlBvc3RCdWdseShcIm1hcCBlcnI6XCIgKyBrYWF5b3UuZ2V0TG9iYnlWZXJzaW9uKCksIFwiNC45RS0zMjRcIiwgbXlVc2VySWQgKyBcIjpcIiArIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICgha2FheW91LlBsYXRmb3JtTWdyLmdldEluc3RhbmNlKCkubWFwLmlzVmFsaWRBZGRyKE51bWJlcihtcC5sb25naXR1ZGUpLCBOdW1iZXIobXAubGF0aXR1ZGUpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrYWF5b3UuUGxhdGZvcm1NZ3IuZ2V0SW5zdGFuY2UoKS5tYXAuR2V0TWFwSW5mbygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrYWF5b3UuUGxhdGZvcm1NZ3IuZ2V0SW5zdGFuY2UoKS5tYXAucHVsbENvdW50Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGthYXlvdS5QbGF0Zm9ybU1nci5nZXRJbnN0YW5jZSgpLnN5cy5Qb3N0QnVnbHkoXCJtYXAgZXJyOlwiICsga2FheW91LmdldExvYmJ5VmVyc2lvbigpLCBcImlzTm90VmFsaWRBZGRyXCIsIG15VXNlcklkICsgXCI6XCIgKyBkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrYWF5b3UuUGxhdGZvcm1NZ3IuZ2V0SW5zdGFuY2UoKS5tYXAucHVsbENvdW50ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2FheW91LkRhdGFTZXQuc2V0KFwidXNlcjo6TWFwXCIsIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrYWF5b3UuRGF0YVNldC5zZXQoXCJHUFNFcnJvclwiLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2FheW91LmVtaXQoXCJcIiwgXCJNYXBJbmZvXCIsIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2FheW91LlBsYXRmb3JtTWdyLmdldEluc3RhbmNlKCkubWFwLkdldE1hcEluZm8oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrYWF5b3UuUGxhdGZvcm1NZ3IuZ2V0SW5zdGFuY2UoKS5tYXAucHVsbENvdW50Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2FheW91LlBsYXRmb3JtTWdyLmdldEluc3RhbmNlKCkuc3lzLlBvc3RCdWdseShcIm1hcCBlcnI6XCIgKyBrYWF5b3UuZ2V0TG9iYnlWZXJzaW9uKCksIFwiaGFzbm90bG9uZ2l0dWRlXCIsIG15VXNlcklkICsgXCI6XCIgKyBkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm1hcCBlcnI6YmFpZHVcIiArIGVycik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRyYWNlTWFwKGRhdGEpIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm1hcCBidWdseTpcIiArIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgLy9sdzIwMDIxN+WcqGJ1Z2x55Lit6Lef6Liq5Y+N6aaI5byC5bi4546p5a6255qE6K6w5b2VXHJcbiAgICAgICAgICAgICAgICBsZXQgY29uZmlncyA9IGNvbW1vbi5tb2QuQ29uZmlnLkdldEFwcENvbmZpZygpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHNVc2VySWQgPSBjb25maWdzLmJ1Z2x5VHJhY2U7XHJcbiAgICAgICAgICAgICAgICBpZiAoISFzVXNlcklkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFyciA9IHNVc2VySWQuc3BsaXQoJywnKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdXNlckluZm8gPSBsb2JieS5tb2QuVXNlci5nZXRJbnN0YW5jZSgpLmdldFVzZXJJbmZvKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEhdXNlckluZm8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG15VXNlcklkID0gdXNlckluZm8udWlkLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhcnIuaW5kZXhPZihteVVzZXJJZCkgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2FheW91LlBsYXRmb3JtTWdyLmdldEluc3RhbmNlKCkuc3lzLlBvc3RCdWdseShcIm1hcCB0cmFjZTpcIiArIGthYXlvdS5nZXRMb2JieVZlcnNpb24oKSwgbXlVc2VySWQsIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCA1MDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBTeXN0ZW0ge1xyXG5cclxuICAgICAgICAvL+mHjeaWsOaLiei1t+WjsOmfs1xyXG4gICAgICAgIE9uU291bmRSZXN1bWUoKSB7XHJcbiAgICAgICAgICAgIGthYXlvdS5Tb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZXN1bWVNdXNpYygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/lop7liqDnm5HlkKznlLXmsaDkv6Hmga/lkoznirbmgIHnmoTpgJrnn6VcclxuICAgICAgICBhZGRCYXR0ZXJ5Tm90aWZpY2F0aW9uKCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuWinuWKoOebkeWQrOeUteaxoOS/oeaBr+WSjOeKtuaAgeeahOmAmuefpVwiKTtcclxuICAgICAgICAgICAgaWYgKCFjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY2Muc3lzLm9zID09IGNjLnN5cy5PU19JT1MpIHtcclxuICAgICAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJOYXRpdmVPY0NsYXNzXCIsIFwiR2V0QmF0dGVyeUluZm9Ob3RpZmljYXRpb25cIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2Muc3lzLm9zID09IGNjLnN5cy5PU19BTkRST0lEKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkdldEJhdHRlcnlJbmZvKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmVtb3ZlQmF0dGVyeU5vdGlmaWNhdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKCFjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY2Muc3lzLm9zID09IGNjLnN5cy5PU19JT1MpIHtcclxuICAgICAgICAgICAgICAgIC8vIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJOYXRpdmVPY0NsYXNzXCIsIFwicmVtb3ZlQmF0dGVyeUluZm9Ob3RpZmljYXRpb25cIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2Muc3lzLm9zID09IGNjLnN5cy5PU19BTkRST0lEKSB7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBiYXR0ZXJ5SW5mbzogeyBsZXZlbDogc3RyaW5nLCBzdGF0ZTogc3RyaW5nIH0gPSBudWxsXHJcbiAgICAgICAgLy/lrqLmiLfnq6/kvJrlnKjov5nkuKrmtojmga/ov5Tlm57nlLXmsaDnirbmgIFcclxuICAgICAgICBPblN5c0JhdHRlcnlJbmZvUnNwKGluZm86IHN0cmluZykge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLnlLXmsaDkv6Hmga9cIiArIGluZm8pO1xyXG4gICAgICAgICAgICAgICAga2FheW91LlBsYXRmb3JtTWdyLmdldEluc3RhbmNlKCkuc3lzLmJhdHRlcnlJbmZvID0gSlNPTi5wYXJzZShpbmZvKTtcclxuICAgICAgICAgICAgICAgIC8v6Kej5p6Q5Ye65p2l55qEbW9kZWwgIHt7XCJzdGF0ZVwiIDogc3RhdGUsIEBcImxldmVsXCIgOlwiXCJ9ICBzdGF0ZSAg54q25oCBICBsZXZlbCAg55S16YePXHJcbiAgICAgICAgICAgICAgICAvLyBrYWF5b3UuZW1pdChcIlwiLCBcInVpOjpCYXR0ZXJ5OjpzaG93QmF0dGVyeVwiLCB7IG1zZzoga2FheW91LlBsYXRmb3JtTWdyLmdldEluc3RhbmNlKCkuc3lzLmJhdHRlcnlJbmZvICB9KTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBHZXRCYXR0ZXJ5SW5mbygpOiB7IHN0YXRlOiBzdHJpbmcsIGxldmVsOiBudW1iZXIgfSB7XHJcbiAgICAgICAgICAgIC8vVW5wbHVnZ2VkIOacquWFheeUtVxyXG4gICAgICAgICAgICAvL25vbmUg5peg5rOV6I635Y+W5L+h5oGvXHJcbiAgICAgICAgICAgIC8vQ2hhcmdpbmcg5YWF55S15LitXHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IHN0YXRlOiBcIlVucGx1Z2dlZFwiLCBsZXZlbDogMTAwIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgalN0ciA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2Muc3lzLm9zID09IGNjLnN5cy5PU19JT1MpIHtcclxuICAgICAgICAgICAgICAgICAgICBqU3RyID0ganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIk5hdGl2ZU9jQ2xhc3NcIiwgXCJHZXRCYXR0ZXJ5SW5mb1wiKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY2Muc3lzLm9zID09IGNjLnN5cy5PU19BTkRST0lEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgalN0ciA9IGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJjb20va2F5b3UvdXRpbHMvTmF0aXZlSmF2YUNsYXNzXCIsIFwiR2V0QmF0dGVyeUluZm9cIiwgXCIoKUxqYXZhL2xhbmcvU3RyaW5nO1wiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuaUtuWIsOWuieWNk+S8oOadpeeahOeUtemHjzpcIiwgalN0cik7XHJcbiAgICAgICAgICAgICAgICBrYWF5b3UuUGxhdGZvcm1NZ3IuZ2V0SW5zdGFuY2UoKS5zeXMuYmF0dGVyeUluZm8gPSBKU09OLnBhcnNlKGpTdHIpO1xyXG4gICAgICAgICAgICAgICAgLy8ga2FheW91LmVtaXQoXCJcIiwgXCJ1aTo6QmF0dGVyeTo6c2hvd0JhdHRlcnlcIiwgeyBtc2c6IGthYXlvdS5QbGF0Zm9ybU1nci5nZXRJbnN0YW5jZSgpLnN5cy5iYXR0ZXJ5SW5mbyAgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyBpZiAoZGF0YS50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgLy8gcmV0dXJuIGRhdGE7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHsgc3RhdGU6IFwiVW5wbHVnZ2VkXCIsIGxldmVsOiAxMDAgfTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvL2x3MTgxMTEzXHJcbiAgICAgICAgU2hvd1RyYW5zaXRpb25NYXNrKCkge1xyXG4gICAgICAgICAgICBpZiAoISFjYy5zeXMuaXNOYXRpdmUgJiYgY2Muc3lzLm9zID09IGNjLnN5cy5PU19BTkRST0lEKSB7XHJcbiAgICAgICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwiY29tL2theW91L3V0aWxzL05hdGl2ZUphdmFDbGFzc1wiLCBcIlNob3dUcmFuc2l0aW9uTWFza1wiLCBcIigpVlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBIaWRlVHJhbnNpdGlvbk1hc2soKSB7XHJcbiAgICAgICAgICAgIGlmICghIWNjLnN5cy5pc05hdGl2ZSAmJiBjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0FORFJPSUQpIHtcclxuICAgICAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJjb20va2F5b3UvdXRpbHMvTmF0aXZlSmF2YUNsYXNzXCIsIFwiSGlkZVRyYW5zaXRpb25NYXNrXCIsIFwiKClWXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIERvd25sb2FkQXBrKHVybDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGlmICghIWNjLnN5cy5pc05hdGl2ZSAmJiBjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0FORFJPSUQpIHtcclxuICAgICAgICAgICAgICAgIGxldCBjb2RlU3RyID0ganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcImNvbS9rYXlvdS91dGlscy9OYXRpdmVKYXZhQ2xhc3NcIiwgXCJEb3dubG9hZEFwa1wiLCBcIihMamF2YS9sYW5nL1N0cmluZzspVlwiLCB1cmwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEluc3RhbGxBcGsocGF0aDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGlmICghIWNjLnN5cy5pc05hdGl2ZSAmJiBjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0FORFJPSUQpIHtcclxuICAgICAgICAgICAgICAgIGxldCBjb2RlU3RyID0ganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcImNvbS9rYXlvdS91dGlscy9OYXRpdmVKYXZhQ2xhc3NcIiwgXCJJbnN0YWxsQXBrXCIsIFwiKExqYXZhL2xhbmcvU3RyaW5nOylWXCIsIHBhdGgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIE9uRG93bmxvYWRBcGsoY29kZTogc3RyaW5nLCBleHRlbmQ6IHN0cmluZykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkpzIE9uRG93bmxvYWRBcGtcIiwgY29kZSwgZXh0ZW5kKTtcclxuICAgICAgICAgICAga2FheW91LmVtaXQoXCJjb21tb25cIiwgXCJ1aTo6YXBrOjpvbkRvd25sb2FkXCIsIHsgY29kZTogY29kZSwgZXh0ZW5kOiBleHRlbmQgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBHZXRMb2NhbFZlcnNpb25Db2RlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIGxldCBjb2RlID0gXCIxMDAwXCI7XHJcbiAgICAgICAgICAgIGlmICghY2Muc3lzLmlzTmF0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29kZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY2Muc3lzLm9zID09IGNjLnN5cy5PU19JT1MpIHtcclxuICAgICAgICAgICAgICAgIGxldCBjb2RlU3RyID0ganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIk5hdGl2ZU9jQ2xhc3NcIiwgXCJHZXRMb2NhbFZlcnNpb25Db2RlXCIpO1xyXG4gICAgICAgICAgICAgICAgY29kZSA9IGNvZGVTdHI7Ly8gTnVtYmVyKGNvZGVTdHIpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNjLnN5cy5vcyA9PSBjYy5zeXMuT1NfQU5EUk9JRCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvZGVTdHIgPSBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwiY29tL2theW91L3V0aWxzL05hdGl2ZUphdmFDbGFzc1wiLCBcIkdldExvY2FsVmVyc2lvbkNvZGVcIiwgXCIoKUxqYXZhL2xhbmcvU3RyaW5nO1wiKTtcclxuICAgICAgICAgICAgICAgIGNvZGUgPSBjb2RlU3RyOy8vIE51bWJlcihjb2RlU3RyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gY29kZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIEdldExvY2FsVmVyc2lvbk5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgbGV0IG5hbWUgPSBcIjEuOS43XCI7Ly/lronljZPljIXniYjmnKzlj7dcclxuICAgICAgICAgICAgaWYgKGNjLnN5cy5pc1dlQ2hhdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5hbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICAgICAgICAgIG5hbWUgPSBIdHRwLkdldFJlcXVlc3QobG9jYXRpb24uc2VhcmNoKVsndmVyc2lvbiddIHx8IG5hbWU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmFtZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGNjLnN5cy5vcyA9PSBjYy5zeXMuT1NfSU9TKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY29kZVN0ciA9IGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJOYXRpdmVPY0NsYXNzXCIsIFwiR2V0TG9jYWxWZXJzaW9uTmFtZVwiKTtcclxuICAgICAgICAgICAgICAgIG5hbWUgPSBjb2RlU3RyOy8vIE51bWJlcihjb2RlU3RyKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0FORFJPSUQpIHtcclxuICAgICAgICAgICAgICAgIGxldCBjb2RlU3RyID0ganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcImNvbS9rYXlvdS91dGlscy9OYXRpdmVKYXZhQ2xhc3NcIiwgXCJHZXRMb2NhbFZlcnNpb25OYW1lXCIsIFwiKClMamF2YS9sYW5nL1N0cmluZztcIik7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkxvY2FsIEFQSyBWZXJzaW9uOlwiLCBjb2RlU3RyKTtcclxuICAgICAgICAgICAgICAgIG5hbWUgPSBjb2RlU3RyOy8vIE51bWJlcihjb2RlU3RyKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChjYy5zeXMub3MgPT0gY2Muc3lzLk9TX1dJTkRPV1MpIHtcclxuICAgICAgICAgICAgICAgIGlmIChqc2IuZmlsZVV0aWxzLmlzRmlsZUV4aXN0KFwiYXBwQ29uZmlnLmpzb25cIikpIHtcclxuICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYXBwY29uZmlnID0gUGxhdGZvcm1NZ3IuZ2V0SW5zdGFuY2UoKS5zeXMuR2V0TG9jYWxBcHBDb25maWcoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghYXBwY29uZmlnKSB7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobG9kYXNoLmlzRW1wdHkoYXBwY29uZmlnLnZlcnNpb24pKSB7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lID0gYXBwY29uZmlnLnZlcnNpb247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gd2hpbGUgKDApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJhcHBDb25maWcuanNvbiBuaWxcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJhcHBDb25maWcuanNvbiBjYW5gdCBmaW5kXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBuYW1lO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIEdldExvY2FsQXBwQ29uZmlnKCk6IGFueSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNjLnN5cy5vcyA9PSBjYy5zeXMuT1NfSU9TKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0FORFJPSUQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNjLnN5cy5vcyA9PSBjYy5zeXMuT1NfV0lORE9XUykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGpzYi5maWxlVXRpbHMuaXNGaWxlRXhpc3QoXCJhcHBDb25maWcuanNvblwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhcHBjb25maWdTdHIgPSBqc2IuZmlsZVV0aWxzLmdldFN0cmluZ0Zyb21GaWxlKFwiYXBwQ29uZmlnLmpzb25cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobG9kYXNoLmlzRW1wdHkoYXBwY29uZmlnU3RyKSkgeyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFwcGNvbmZpZyA9IEpTT04ucGFyc2UoYXBwY29uZmlnU3RyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsb2Rhc2guaXNOdWxsKGFwcGNvbmZpZykgfHwgbG9kYXNoLmlzRW1wdHkoYXBwY29uZmlnKSkgeyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFwcGNvbmZpZztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSB3aGlsZSAoMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImFwcENvbmZpZy5qc29uIG5pbFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImFwcENvbmZpZy5qc29uIGNhbmB0IGZpbmRcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEdldEF2YWlsYWJsZUludGVybmFsTWVtb3J5U2l6ZSgpOiBudW1iZXIge1xyXG4gICAgICAgIC8vICAgICBsZXQgc2l6ZSA9IDA7XHJcbiAgICAgICAgLy8gICAgIGlmICghY2Muc3lzLmlzTmF0aXZlKSB7XHJcbiAgICAgICAgLy8gICAgICAgICByZXR1cm4gc2l6ZTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vICAgICBpZiAoY2Muc3lzLm9zID09IGNjLnN5cy5PU19JT1MpIHtcclxuICAgICAgICAvLyAgICAgICAgIC8vIGxldCBjb2RlU3RyID0ganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIk5hdGl2ZU9jQ2xhc3NcIiwgXCJHZXRMb2NhbFZlcnNpb25Db2RlXCIpO1xyXG4gICAgICAgIC8vICAgICAgICAgLy8gY29kZSA9IE51bWJlcihjb2RlU3RyKTtcclxuICAgICAgICAvLyAgICAgfSBlbHNlIGlmIChjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0FORFJPSUQpIHtcclxuICAgICAgICAvLyAgICAgICAgIGxldCBzaXplU3RyID0ganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcImNvbS9rYXlvdS91dGlscy9OYXRpdmVKYXZhQ2xhc3NcIiwgXCJHZXRBdmFpbGFibGVJbnRlcm5hbE1lbW9yeVNpemVcIiwgXCIoKUxqYXZhL2xhbmcvU3RyaW5nO1wiKTtcclxuICAgICAgICAvLyAgICAgICAgIHNpemUgPSBOdW1iZXIoc2l6ZVN0cik7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyAgICAgcmV0dXJuIHNpemU7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICBPcGVuVXJsKHVybDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5omT5byA6ZO+5o6lXCIsIHVybCk7XHJcbiAgICAgICAgICAgIGlmICghY2Muc3lzLmlzTmF0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cub3Blbih1cmwpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0lPUykge1xyXG4gICAgICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIk5hdGl2ZU9jQ2xhc3NcIiwgXCJPcGVuVXJsOlwiLCB1cmwpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNjLnN5cy5vcyA9PSBjYy5zeXMuT1NfQU5EUk9JRCkge1xyXG4gICAgICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcImNvbS9rYXlvdS91dGlscy9OYXRpdmVKYXZhQ2xhc3NcIiwgXCJPcGVuVXJsXCIsIFwiKExqYXZhL2xhbmcvU3RyaW5nOylWXCIsIHVybCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIE9wZW5DYWxsUGhvbmUodGVsTnVtOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgaWYgKCFjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5q2j5Zyo5ouo5omT55S16K+dXCIsIHRlbE51bSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNjLnN5cy5vcyA9PSBjYy5zeXMuT1NfSU9TKSB7XHJcbiAgICAgICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwiTmF0aXZlT2NDbGFzc1wiLCBcIk9wZW5DYWxsUGhvbmU6XCIsIHRlbE51bSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2Muc3lzLm9zID09IGNjLnN5cy5PU19BTkRST0lEKSB7XHJcbiAgICAgICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwiY29tL2theW91L3V0aWxzL05hdGl2ZUphdmFDbGFzc1wiLCBcIk9wZW5DYWxsUGhvbmVcIiwgXCIoTGphdmEvbGFuZy9TdHJpbmc7KVZcIiwgdGVsTnVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgTG9nKHRhZzogc3RyaW5nLCBtc2c6IHN0cmluZykge1xyXG4gICAgICAgICAgICBpZiAoIWNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGFnLCBtc2cpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0lPUykge1xyXG4gICAgICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIk5hdGl2ZU9jQ2xhc3NcIiwgXCJLYUxvZzptc2c6XCIsIHRhZywgbXNnKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0FORFJPSUQpIHtcclxuICAgICAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJjb20va2F5b3UvdXRpbHMvTmF0aXZlSmF2YUNsYXNzXCIsIFwiS2FMb2dcIiwgXCIoTGphdmEvbGFuZy9TdHJpbmc7TGphdmEvbGFuZy9TdHJpbmc7KVZcIiwgdGFnLCBtc2cpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIERpYWxvZyh0ZXh0OiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgaWYgKCFjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5jb25maXJtKHRleHQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0lPUykge1xyXG4gICAgICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIk5hdGl2ZU9jQ2xhc3NcIiwgXCJEaWFsb2c6XCIsIHRleHQpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNjLnN5cy5vcyA9PSBjYy5zeXMuT1NfQU5EUk9JRCkge1xyXG4gICAgICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcImNvbS9rYXlvdS91dGlscy9OYXRpdmVKYXZhQ2xhc3NcIiwgXCJEaWFsb2dcIiwgXCIoTGphdmEvbGFuZy9TdHJpbmc7KVZcIiwgdGV4dCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgT25EaWFsb2dSZXMocmVzOiBzdHJpbmcpIHtcclxuXHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIFRvYXN0KHRleHQ6IHN0cmluZykge1xyXG4gICAgICAgICAgICBpZiAoIWNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRpdiA9IHdpbmRvdy5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIldlYlRvYXN0XCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFkaXYpIHtcclxuICAgICAgICAgICAgICAgICAgICBkaXYgPSB3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICAgICAgICAgICAgICBkaXYuaWQgPSBcIldlYlRvYXN0XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgZGl2LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwicmdiYSgwLCAwLCAwLCAwLjgpXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgZGl2LnN0eWxlLmNvbG9yID0gXCIjZmZmXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgZGl2LnN0eWxlLnRvcCA9IFwiNTAlXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgZGl2LnN0eWxlLmxlZnQgPSBcIjUwJVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGRpdi5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcclxuICAgICAgICAgICAgICAgICAgICBkaXYuc3R5bGUudHJhbnNmb3JtID0gXCJ0cmFuc2xhdGVZKC01MCUpIHRyYW5zbGF0ZVgoLTUwJSlcIjtcclxuICAgICAgICAgICAgICAgICAgICBkaXYuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGRpdi5zdHlsZS5wYWRkaW5nID0gXCIxMHB4XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZGl2KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChkaXZbXCJ0aVwiXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChkaXZbXCJ0aVwiXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBkaXYuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgICAgICAgICAgICAgIGRpdi5pbm5lclRleHQgPSB0ZXh0O1xyXG4gICAgICAgICAgICAgICAgZGl2W1widGlcIl0gPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGl2W1widGlcIl0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGl2W1widGlcIl0gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBkaXYuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0lPUykge1xyXG4gICAgICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIk5hdGl2ZU9jQ2xhc3NcIiwgXCJUb2FzdDpcIiwgdGV4dCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2Muc3lzLm9zID09IGNjLnN5cy5PU19BTkRST0lEKSB7XHJcbiAgICAgICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwiY29tL2theW91L3V0aWxzL05hdGl2ZUphdmFDbGFzc1wiLCBcIlRvYXN0XCIsIFwiKExqYXZhL2xhbmcvU3RyaW5nOylWXCIsIHRleHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBFeGl0KHR5cGU6IHN0cmluZykge1xyXG4gICAgICAgICAgICAvL2x3MTgxMTE5LHR5cGU6XCIxXCLnq4vljbPpgIDvvIxcIjJcIuWPjOWHu+mAgFxyXG4gICAgICAgICAgICBpZiAoIWNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0lPUykge1xyXG4gICAgICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIk5hdGl2ZU9jQ2xhc3NcIiwgXCJFeGl0XCIpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNjLnN5cy5vcyA9PSBjYy5zeXMuT1NfQU5EUk9JRCkge1xyXG4gICAgICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcImNvbS9rYXlvdS91dGlscy9OYXRpdmVKYXZhQ2xhc3NcIiwgXCJFeGl0XCIsIFwiKExqYXZhL2xhbmcvU3RyaW5nOylWXCIsIHR5cGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhc3luYyBHZXRGaWxlTGVuZ3RoKHVybDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBsZW5ndGggPSBhd2FpdCBIdHRwLkdldEZpbGVTaXplKHVybCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGxlbmd0aDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICghUGxhdGZvcm1NZ3IuZ2V0SW5zdGFuY2UoKS5zeXMuY2hlY2tBbGxvd0pTSW50ZXJmYWNlKFwiR2V0RmlsZUxlbmd0aFwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5o6l5Y+j5LiN5a2Y5ZyoOkdldEZpbGVMZW5ndGhcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwi6Lez6L+HXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgalN0ciA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2Muc3lzLm9zID09IGNjLnN5cy5PU19JT1MpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL2pTdHIgPSBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwiTmF0aXZlT2NDbGFzc1wiLCBcIkdldE5ldEluZm9cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwi6Lez6L+HXCI7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNjLnN5cy5vcyA9PSBjYy5zeXMuT1NfQU5EUk9JRCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGpTdHIgPSBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwiY29tL2theW91L3V0aWxzL05hdGl2ZUphdmFDbGFzc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkdldEZpbGVMZW5ndGhcIiwgXCIoTGphdmEvbGFuZy9TdHJpbmc7KUxqYXZhL2xhbmcvU3RyaW5nO1wiLCB1cmwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGpTdHI7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiLTFcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgR2V0TmV0SW5mbygpOiB7IHR5cGU6IHN0cmluZywgbGV2ZWw6IG51bWJlciB9IHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGlmICghY2Muc3lzLmlzTmF0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5uYXZpZ2F0b3Iub25MaW5lID09IHRydWUgPyB7IHR5cGU6IFwid2lmaVwiLCBsZXZlbDogMTAwIH0gOiB7IHR5cGU6IFwibm9uZVwiLCBsZXZlbDogMCB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgalN0ciA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2Muc3lzLm9zID09IGNjLnN5cy5PU19JT1MpIHtcclxuICAgICAgICAgICAgICAgICAgICBqU3RyID0ganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIk5hdGl2ZU9jQ2xhc3NcIiwgXCJHZXROZXRJbmZvXCIpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0FORFJPSUQpIHtcclxuICAgICAgICAgICAgICAgICAgICBqU3RyID0ganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcImNvbS9rYXlvdS91dGlscy9OYXRpdmVKYXZhQ2xhc3NcIiwgXCJHZXROZXRJbmZvXCIsIFwiKClMamF2YS9sYW5nL1N0cmluZztcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UoalN0cik7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLojrflj5bnvZHnu5zlpLHotKVcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHsgdHlwZTogXCJ3aWZpXCIsIGxldmVsOiAxMDAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIEdldERldmljZUtleSgpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICBpZiAoIWNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvZGUgPSBIdHRwLkdldFJlcXVlc3QobG9jYXRpb24uc2VhcmNoKVsnY29kZSddIHx8IERhdGUubm93KCkudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjb2RlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvZGUgPSBjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJkZWJ1Z0NvZGVcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoISFjb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvZGU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0lPUykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgX2tleSA9IGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJOYXRpdmVPY0NsYXNzXCIsIFwiR2V0RGV2aWNlS2V5XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBQbGF0Zm9ybU1nci5nZXRJbnN0YW5jZSgpLnN5cy5Ub2FzdChfa2V5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MubG9nKFwiR2V0RGV2aWNlS2V5XCIsIF9rZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX2tleS5sZW5ndGggPCAxKSB7IHJldHVybiBcIlwiOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9rZXkgPSBNRDUuZW5jb2RlKF9rZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2tleTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNjLnN5cy5vcyA9PSBjYy5zeXMuT1NfQU5EUk9JRCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdldERldmljZUtleSBPU19BTkRST0lEXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgX2tleSA9IGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJjb20va2F5b3UvdXRpbHMvTmF0aXZlSmF2YUNsYXNzXCIsIFwiR2V0RGV2aWNlS2V5XCIsIFwiKClMamF2YS9sYW5nL1N0cmluZztcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfa2V5O1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFwcGNvbmZpZyA9IFBsYXRmb3JtTWdyLmdldEluc3RhbmNlKCkuc3lzLkdldExvY2FsQXBwQ29uZmlnKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFhcHBjb25maWcpIHsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobG9kYXNoLmlzRW1wdHkoYXBwY29uZmlnLmRldmljZUtleSkpIHsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXBwY29uZmlnLmRldmljZUtleTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gd2hpbGUgKDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYXBwQ29uZmlnLmpzb24gbmlsXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBEYXRlLm5vdygpLnRvU3RyaW5nKClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldFBob25lQnJhbmQoKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIue9kemhtVwiO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjYy5zeXMub3MgPT0gY2Muc3lzLk9TX1dJTkRPV1MpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJXaW5kb3dzXCI7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNjLnN5cy5vcyA9PSBjYy5zeXMuT1NfSU9TKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiaVBob25lXCJcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY2Muc3lzLm9zID09IGNjLnN5cy5PU19BTkRST0lEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFQbGF0Zm9ybU1nci5nZXRJbnN0YW5jZSgpLnN5cy5jaGVja0FsbG93SlNJbnRlcmZhY2UoXCJHZXRQaG9uZUJyYW5kXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5o6l5Y+j5LiN5a2Y5ZyoOkdldFBob25lQnJhbmRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcImNvbS9rYXlvdS91dGlscy9OYXRpdmVKYXZhQ2xhc3NcIiwgXCJHZXRQaG9uZUJyYW5kXCIsIFwiKClMamF2YS9sYW5nL1N0cmluZztcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v6LCD5bqm5omL5py66ZyH5YqoXHJcbiAgICAgICAgVmlicmF0ZSh0aW1lID0gMSkge1xyXG4gICAgICAgICAgICBpZiAoIWNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0lPUykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJOYXRpdmVPY0NsYXNzXCIsIFwiVmlicmF0ZTpcIiwgdGltZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2Muc3lzLm9zID09IGNjLnN5cy5PU19BTkRST0lEKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcImNvbS9rYXlvdS91dGlscy9OYXRpdmVKYXZhQ2xhc3NcIiwgXCJWaWJyYXRlXCIsIFwiKEkpVlwiLCB0aW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+ezu+e7n+aWueazle+8jOWkjeWItuaWh+Wtl+WIsOWJquWIh+advyAgMOaYr+Wksei0pSAgMeaYr+aIkOWKn++8m1xyXG4gICAgICAgIGNvcHlTdHJpbmdUb1Bhc3RlQm9hcmQodGV4dDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGxldCBpc1N1Y2Nlc3NlZCA9IFwiMFwiO1xyXG4gICAgICAgICAgICBpZiAoIWNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGlzU3VjY2Vzc2VkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0lPUykge1xyXG4gICAgICAgICAgICAgICAgaXNTdWNjZXNzZWQgPSBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwiTmF0aXZlT2NDbGFzc1wiLCBcImNvcHlTdHJpbmdUb1Bhc3RlYm9hcmQ6XCIsIHRleHQpO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0FORFJPSUQpIHtcclxuICAgICAgICAgICAgICAgIGlzU3VjY2Vzc2VkID0ganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcImNvbS9rYXlvdS91dGlscy9OYXRpdmVKYXZhQ2xhc3NcIiwgXCJjb3B5U3RyaW5nVG9QYXN0ZWJvYXJkXCIsIFwiKExqYXZhL2xhbmcvU3RyaW5nOylJXCIsIHRleHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBpc1N1Y2Nlc3NlZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v57O757uf5pa55rOV77yM5Yik5pat5piv5ZCm5byA5ZCv5LqG6K+t6Z+z5p2D6ZmQIFxyXG4gICAgICAgIEdldE1lZGlhU3RhdHVzKCkge1xyXG4gICAgICAgICAgICBsZXQgZmxhZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAoIWNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZsYWc7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICghUGxhdGZvcm1NZ3IuZ2V0SW5zdGFuY2UoKS5zeXMuY2hlY2tBbGxvd0pTSW50ZXJmYWNlKFwiY2hlY2tNaWNcIikpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5o6l5Y+j5LiN5a2Y5ZyoOmNoZWNrTWljXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoY2Muc3lzLm9zID09IGNjLnN5cy5PU19JT1MpIHtcclxuICAgICAgICAgICAgICAgIC8vIDDmmK/mnKrmjojmnYMgIDHmmK/msqHmnInor6Lpl67lvIDlkK/puqblhYvpo44gMuaYr+W3suaOiOadg++8m1xyXG4gICAgICAgICAgICAgICAgbGV0IGZsYWcxID0ganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIk5hdGl2ZU9jQ2xhc3NcIiwgXCJjaGVja01pY1wiKTtcclxuICAgICAgICAgICAgICAgIGZsYWcgPSBmbGFnMSA9PSAyID8gdHJ1ZSA6IGZhbHNlXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2Muc3lzLm9zID09IGNjLnN5cy5PU19BTkRST0lEKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBmbGFnID0ganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcImNvbS9rYXlvdS91dGlscy9OYXRpdmVKYXZhQ2xhc3NcIiwgXCJcIiwgXCIoTGphdmEvbGFuZy9TdHJpbmc7KUlcIiwpO1xyXG4gICAgICAgICAgICAgICAgZmxhZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmbGFnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAganVtcEFwcFNldHRpbmcoKSB7XHJcbiAgICAgICAgICAgIGlmICghY2Muc3lzLmlzTmF0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNjLnN5cy5vcyA9PSBjYy5zeXMuT1NfQU5EUk9JRCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFQbGF0Zm9ybU1nci5nZXRJbnN0YW5jZSgpLnN5cy5jaGVja0FsbG93SlNJbnRlcmZhY2UoXCJKdW1wR1BTQXV0aFNldHRpbmdcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuaOpeWPo+S4jeWtmOWcqDpKdW1wR1BTU2VydmljZVNldHRpbmdcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcImNvbS9rYXlvdS91dGlscy9OYXRpdmVKYXZhQ2xhc3NcIiwgXCJKdW1wR1BTQXV0aFNldHRpbmdcIiwgXCIoKVZcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2Muc3lzLm9zID09IGNjLnN5cy5PU19JT1MpIHtcclxuICAgICAgICAgICAgICAgIGlmICghUGxhdGZvcm1NZ3IuZ2V0SW5zdGFuY2UoKS5zeXMuY2hlY2tBbGxvd0pTSW50ZXJmYWNlKFwiSnVtcEdwc1NldHRpbmdcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuaOpeWPo+S4jeWtmOWcqDpKdW1wR3BzU2V0dGluZ1wiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwiTmF0aXZlT2NDbGFzc1wiLCBcIkp1bXBHcHNTZXR0aW5nXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+WkjeWItuS5i+WQjui3s+WFpeW+ruS/oVxyXG4gICAgICAgIGp1bXBXZUNoYXRJbW1lZGlhY3koKSB7XHJcbiAgICAgICAgICAgIGlmICghY2Muc3lzLmlzTmF0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNjLnN5cy5vcyA9PSBjYy5zeXMuT1NfSU9TKSB7XHJcbiAgICAgICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwiTmF0aXZlT2NDbGFzc1wiLCBcImp1bXBXZUNoYXRJbW1lZGlhY3lcIik7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNjLnN5cy5vcyA9PSBjYy5zeXMuT1NfQU5EUk9JRCkge1xyXG4gICAgICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcImNvbS9rYXlvdS91dGlscy9OYXRpdmVKYXZhQ2xhc3NcIiwgXCJnZXRXZWNoYXRBcGlcIiwgXCIoKVZcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v5qOA5p+l5piv5ZCm5a2Y5Zyo6K+l5o6l5Y+jXHJcbiAgICAgICAgY2hlY2tBbGxvd0pTSW50ZXJmYWNlKG1ldGhvZDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGlmICghbG9kYXNoLmlzU3RyaW5nKG1ldGhvZCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobWV0aG9kID09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgYWxsb3dKU0ludGVyZmFjZVN0ciA9IGthYXlvdS5EYXRhU2V0LmdldChcImFsbG93SlNJbnRlcmZhY2VcIik7XHJcbiAgICAgICAgICAgIGlmICghYWxsb3dKU0ludGVyZmFjZVN0cikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChhbGxvd0pTSW50ZXJmYWNlU3RyID09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGxldCBhbGxvd0pTSW50ZXJmYWNlOiBBcnJheTxzdHJpbmc+ID0gSlNPTi5wYXJzZShhbGxvd0pTSW50ZXJmYWNlU3RyKTtcclxuICAgICAgICAgICAgICAgIGlmICghYWxsb3dKU0ludGVyZmFjZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICghbG9kYXNoLmlzQXJyYXkoYWxsb3dKU0ludGVyZmFjZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsb2Rhc2guaXNBcnJheShhbGxvd0pTSW50ZXJmYWNlKVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChhbGxvd0pTSW50ZXJmYWNlLmluZGV4T2YobWV0aG9kKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/kuIrmiqXlvILluLhcclxuICAgICAgICBQb3N0QnVnbHkodmFsMDogc3RyaW5nLCB2YWwxOiBzdHJpbmcgPSBcIlwiLCB2YWwyOiBzdHJpbmcgPSBcIlwiKSB7XHJcbiAgICAgICAgICAgIC8vIENSQVNIVFlQRV9DT0NPUzJEWF9KUyA1XHJcbiAgICAgICAgICAgIGxldCBDUkFTSFRZUEVfQ09DT1MyRFhfSlMgPSA1O1xyXG4gICAgICAgICAgICBpZiAoIWNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghUGxhdGZvcm1NZ3IuZ2V0SW5zdGFuY2UoKS5zeXMuY2hlY2tBbGxvd0pTSW50ZXJmYWNlKFwiUG9zdEJ1Z2x5XCIpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuaOpeWPo+S4jeWtmOWcqDpQb3N0QnVnbHlcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNjLnN5cy5vcyA9PSBjYy5zeXMuT1NfSU9TKSB7XHJcbiAgICAgICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwiTmF0aXZlT2NDbGFzc1wiLCBcIlBvc3RCdWdseTpWYXIxOlZhcjI6VmFyMzpcIiwgXCI1XCIsIHZhbDAsIHZhbDEsIHZhbDIpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNjLnN5cy5vcyA9PSBjYy5zeXMuT1NfQU5EUk9JRCkge1xyXG4gICAgICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcImNvbS9rYXlvdS91dGlscy9OYXRpdmVKYXZhQ2xhc3NcIiwgXCJQb3N0QnVnbHlcIiwgXCIoSUxqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nO0xqYXZhL2xhbmcvU3RyaW5nOylWXCJcclxuICAgICAgICAgICAgICAgICAgICAsIENSQVNIVFlQRV9DT0NPUzJEWF9KUyxcclxuICAgICAgICAgICAgICAgICAgICB2YWwwLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbDEsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsMlxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgUGF5IHtcclxuICAgICAgICBBbGlQYXkob3JkZXJTdHJpbmc6IHN0cmluZykge1xyXG4gICAgICAgICAgICBpZiAoIWNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGFnLCBtc2cpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0FORFJPSUQpIHtcclxuICAgICAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJjb20va2F5b3UvdXRpbHMvTmF0aXZlSmF2YUNsYXNzXCIsIFwiQWxpcGF5XCIsIFwiKExqYXZhL2xhbmcvU3RyaW5nOylWXCIsIG9yZGVyU3RyaW5nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgQXBwbGVQYXkocHJvZHVjdElEOiBzdHJpbmcsIG9yZGVySUQ6IHN0cmluZywgdG9rZW46IHN0cmluZykge1xyXG4gICAgICAgICAgICBpZiAoIWNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGFnLCBtc2cpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0lPUyAmJiBjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJOYXRpdmVPY0NsYXNzXCIsIFwiSU9TUGF5Ok9yZGVySUQ6VG9rZW46XCIsIHByb2R1Y3RJRCwgb3JkZXJJRCwgdG9rZW4pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBXZUNhaHRQYXkocGF5RGF0YSkge1xyXG4gICAgICAgICAgICBpZiAoY2Muc3lzLm9zID09IGNjLnN5cy5PU19BTkRST0lEKSB7XHJcbiAgICAgICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwiY29tL2theW91L3V0aWxzL05hdGl2ZUphdmFDbGFzc1wiLCBcIldlY2hhdFBheVwiLCBcIihMamF2YS9sYW5nL1N0cmluZzspVlwiLCBwYXlEYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcGF5QmFzZUluZm8odXJsOiBzdHJpbmcsIHRva2VuOiBzdHJpbmcsIGFwcGlkOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgaWYgKCFjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRhZywgbXNnKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY2Muc3lzLm9zID09IGNjLnN5cy5PU19JT1MpIHtcclxuICAgICAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJOYXRpdmVPY0NsYXNzXCIsIFwiaW9zUGF5SW5mb3dpdGhVcmw6VG9rZW46YW5kQXBwaWQ6XCIsIHVybCwgdG9rZW4sIGFwcGlkKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0FORFJPSUQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgT25QYXlSZXMoY29kZTogc3RyaW5nLCBtc2c6IHN0cmluZykge1xyXG4gICAgICAgICAgICAvL3N1Y2Nlc3MgIGZhaWwgIGNhbmNlbCAgaW52YWxpZCA7XHJcbiAgICAgICAgICAgIGthYXlvdS5lbWl0KCcnLCBcIlBheVJlc1wiLCB7IGNvZGU6IGNvZGUsIG1zZzogbXNnIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy8g6ZKJ6ZKJXHJcbiAgICBjbGFzcyBERFNoYXJlIHtcclxuICAgICAgICBERFNoYXJlVVJMKHRpdGxlOiBzdHJpbmcsIHRleHQ6IHN0cmluZywgdXJsOiBzdHJpbmcsIHRyYW5zYWN0aW9uOiBzdHJpbmcgPSBcIlwiKSB7XHJcbiAgICAgICAgICAgIGlmICghY2Muc3lzLmlzTmF0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGRhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogdGl0bGUsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiB0ZXh0LFxyXG4gICAgICAgICAgICAgICAgdXJsOiB1cmwsXHJcbiAgICAgICAgICAgICAgICB0cmFuc2FjdGlvbjogdHJhbnNhY3Rpb25cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY2Muc3lzLm9zID09IGNjLnN5cy5PU19JT1MpIHtcclxuICAgICAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJOYXRpdmVPY0NsYXNzXCIsIFwiRERTaGFyZVVSTDpcIiwgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNjLnN5cy5vcyA9PSBjYy5zeXMuT1NfQU5EUk9JRCkge1xyXG4gICAgICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcImNvbS9rYXlvdS91dGlscy9OYXRpdmVKYXZhQ2xhc3NcIiwgXCJERFNoYXJlVVJMXCIsIFwiKExqYXZhL2xhbmcvU3RyaW5nOylWXCIsIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgRERTaGFyZUltYWdlKHRpdGxlOiBzdHJpbmcsIHBhdGg6IHN0cmluZywgdHJhbnNhY3Rpb246IHN0cmluZyA9IFwiXCIpIHtcclxuICAgICAgICAgICAgaWYgKCFjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgZGF0YSA9IHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiB0aXRsZSxcclxuICAgICAgICAgICAgICAgIHBhdGg6IHBhdGgsXHJcbiAgICAgICAgICAgICAgICB0cmFuc2FjdGlvbjogdHJhbnNhY3Rpb25cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY2Muc3lzLm9zID09IGNjLnN5cy5PU19JT1MpIHtcclxuICAgICAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJOYXRpdmVPY0NsYXNzXCIsIFwiRERTaGFyZUltYWdlOlwiLCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2Muc3lzLm9zID09IGNjLnN5cy5PU19BTkRST0lEKSB7XHJcbiAgICAgICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwiY29tL2theW91L3V0aWxzL05hdGl2ZUphdmFDbGFzc1wiLCBcIkREU2hhcmVJbWFnZVwiLCBcIihMamF2YS9sYW5nL1N0cmluZzspVlwiLCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIEREU2hhcmVUZXh0KHRpdGxlOiBzdHJpbmcsIHRleHQ6IHN0cmluZywgdHJhbnNhY3Rpb246IHN0cmluZyA9IFwiXCIpIHtcclxuICAgICAgICAgICAgaWYgKCFjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgZGF0YSA9IHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiB0aXRsZSxcclxuICAgICAgICAgICAgICAgIHRleHQ6IHRleHQsXHJcbiAgICAgICAgICAgICAgICB0cmFuc2FjdGlvbjogdHJhbnNhY3Rpb25cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY2Muc3lzLm9zID09IGNjLnN5cy5PU19JT1MpIHtcclxuICAgICAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJOYXRpdmVPY0NsYXNzXCIsIFwiRERTaGFyZVRleHQ6XCIsIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0FORFJPSUQpIHtcclxuICAgICAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJjb20va2F5b3UvdXRpbHMvTmF0aXZlSmF2YUNsYXNzXCIsIFwiRERTaGFyZVRleHRcIiwgXCIoTGphdmEvbGFuZy9TdHJpbmc7KVZcIiwgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDpkonpkonliIbkuqvlm57osIPov5Tlm55jb2RlICAwL+aIkOWKnyAgLTIv5Y+W5raIIOWFtuS7lumUmeivr+eci21zZ1xyXG4gICAgICAgIE9uRGRTaGFyZVJlcyhjb2RlOiBzdHJpbmcsIG1zZzogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGthYXlvdS5lbWl0KFwiXCIsIFwiRGRTaGFyZVJlc1wiLCB7IGNvZGU6IGNvZGUsIG1zZzogbXNnIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBtYWdpY1dpbmRvd+mtlOeql+WIhuS6q+i/lOWbnuWQhOenjeS/oeaBr+i/lOWbnuexu+WuueS4umpzb27lrZfnrKbkuLJcclxuICAgIGNsYXNzIE1hZ2ljV2luZG93IHtcclxuICAgICAgICAvL+WuouaIt+err+S4u+WKqOWOu+aLieWPlizojrflj5bprZTnqpfkv6Hmga/jgIJcclxuICAgICAgICBnZXRNYWdpY1dpbmRvd0luZm8oKSB7XHJcbiAgICAgICAgICAgIGlmICghY2Muc3lzLmlzTmF0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCIwXCI7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5mb1N0ciA9IFwiMFwiO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNjLnN5cy5vcyA9PSBjYy5zeXMuT1NfSU9TKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5mb1N0ciA9IGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJOYXRpdmVPY0NsYXNzXCIsIFwiZ2V0TWFnaWNXaW5kb3dJbmZvXCIpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0FORFJPSUQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbmZvU3RyID0ganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcImNvbS9rYXlvdS91dGlscy9OYXRpdmVKYXZhQ2xhc3NcIiwgXCJnZXRNYWdpY1dpbmRvd0luZm9cIiwgXCIoKUxqYXZhL2xhbmcvU3RyaW5nO1wiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBpbmZvU3RyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBcIjBcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/mmK/lkKbpnIDopoHlrqLmiLfnq6/kuLvliqjmi4nlj5bprZTnqpdcclxuICAgICAgICBPbk1hZ2ljV2luZG93Q2FsbFB1bGwoKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBrYWF5b3UuZW1pdChcIlwiLCBcIk1hZ2ljV2luZG93Q2FsbFB1bGxcIik7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vanPnq6/ojrflj5bliLDprZTnqpfkv6Hmga/vvIzlkYror4nljp/nlJ/muIXpmaTkv6Hmga9cclxuICAgICAgICB0ZWxsQ2xpZW50VG9DbGVhcigpIHtcclxuICAgICAgICAgICAgaWYgKCFjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY2Muc3lzLm9zID09IGNjLnN5cy5PU19JT1MpIHtcclxuICAgICAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJOYXRpdmVPY0NsYXNzXCIsIFwiY2xlYXJNYWdpY1dpbmRvd0luZm9cIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2Muc3lzLm9zID09IGNjLnN5cy5PU19BTkRST0lEKSB7XHJcbiAgICAgICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwiY29tL2theW91L3V0aWxzL05hdGl2ZUphdmFDbGFzc1wiLCBcImNsZWFyTWFnaWNXaW5kb3dJbmZvXCIsIFwiKClWXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5pqC5pe25byD55SoXHJcbiAgICAgICAgT25NYWdpY1dpbmRvd1JzcChtc2cxOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGxldCBvYmogPSBKU09OLnBhcnNlKG1zZzEpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCItLeWuieWNk+aAjuS5iOS7o+eggeayoeaciei/meautS0tXCIpO1xyXG4gICAgICAgICAgICAgICAga2FheW91LmVtaXQoXCJcIiwgXCJNYWdpY1dpbmRvd1JzcFwiLCB7IG1zZzogb2JqIH0pO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy9sdzIwMDYyM+mXsuiBiuWSjOWwj+S/oeS4jeiDveWIoO+8jOWboOS4uua4uOaIj+mHjOmdouacieiwg+eUqFxyXG4gICAgY2xhc3MgWEwge1xyXG4gICAgICAgIFhMU2hhcmVUZXh0KHRpdGxlOiBzdHJpbmcsIHRleHQ6IHN0cmluZywgdHJhbnNhY3Rpb246IHN0cmluZyA9IFwiXCIpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBYTFNoYXJlSW1hZ2UodGl0bGU6IHN0cmluZywgcGF0aDogc3RyaW5nLCB0cmFuc2FjdGlvbjogc3RyaW5nID0gXCJcIikge1xyXG5cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBYTFNoYXJlVVJMKHRpdGxlOiBzdHJpbmcsIHRleHQ6IHN0cmluZywgdXJsOiBzdHJpbmcsIHRyYW5zYWN0aW9uOiBzdHJpbmcgPSBcIlwiKSB7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgY2xhc3MgWFgge1xyXG4gICAgICAgIFhYU2hhcmVVUkwodGl0bGU6IHN0cmluZywgdGV4dDogc3RyaW5nLCB1cmw6IHN0cmluZywgdHJhbnNhY3Rpb246IHN0cmluZyA9IFwiXCIpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBYWFNoYXJlSW1hZ2UodGl0bGU6IHN0cmluZywgcGF0aDogc3RyaW5nLCB0cmFuc2FjdGlvbjogc3RyaW5nID0gXCJcIikge1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgV2VjaGF0Q29uZmlnIHtcclxuICAgICAgICBHZXRDb25maWcoKTogYW55IHtcclxuICAgICAgICAgICAgaWYgKCFjYy5zeXMuaXNXZUNoYXQpIHsgcmV0dXJuIHt9OyB9XHJcbiAgICAgICAgICAgIHJldHVybiBXWEpTQ29uZmlnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBBRCB7XHJcbiAgICAgICAgQ3JlYXRlKGlkOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgaWYgKCFjYy5zeXMuaXNXZUNoYXQpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgICAgIFdYSlNCcmlkZ2UuQUQuY3JlYXRlKHsgYWRVbml0SWQ6IGlkIH0sIGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgUGxheSgpIHtcclxuICAgICAgICAgICAgaWYgKCFjYy5zeXMuaXNXZUNoYXQpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgICAgIFdYSlNCcmlkZ2UuQUQucGxheSgpO1xyXG4gICAgICAgICAgICBrYWF5b3UuU291bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkucGF1c2VNdXNpYygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgT25Mb2FkKCkge1xyXG4gICAgICAgICAgICBpZiAoIWNjLnN5cy5pc1dlQ2hhdCkgeyByZXR1cm47IH1cclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+a/gOWKseinhumikSDlub/lkYrliqDovb3miJDlip8nKTtcclxuICAgICAgICAgICAga2FheW91LmVtaXQoJ2xvYmJ5JywgJ3VpOjpMZWZ0TWVudVBhbmxlOjp2aWRlb0xvYWQnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIE9uRXJyb3IoZXJyKSB7XHJcbiAgICAgICAgICAgIGlmICghY2Muc3lzLmlzV2VDaGF0KSB7IHJldHVybjsgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICBpZiAoZXJyLmVyckNvZGUgJiYgZXJyLmVyck1zZykge1xyXG4gICAgICAgICAgICAgICAga2FheW91LmVtaXQoJ2NvbW1vbicsICd1aTo6VG9hc3Q6OlNob3cnLCB7IG1zZzogZXJyLmVyck1zZyB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgT25DbG9zZShyZXMpIHtcclxuICAgICAgICAgICAgaWYgKCFjYy5zeXMuaXNXZUNoYXQpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgICAgIGthYXlvdS5Tb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZXN1bWVNdXNpYygpO1xyXG4gICAgICAgICAgICBpZiAocmVzICYmIHJlcy5pc0VuZGVkIHx8IHJlcyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDmraPluLjmkq3mlL7nu5PmnZ/vvIzlj6/ku6XkuIvlj5HmuLjmiI/lpZblirFcclxuICAgICAgICAgICAgICAgIGthYXlvdS5lbWl0KCdsb2JieScsICdtb2Q6OlVzZXI6OnZpZGVvUmV3YXJkJyk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5q2j5bi45pKt5pS+57uT5p2f77yM5Y+v5Lul5LiL5Y+R5ri45oiP5aWW5YqxJylcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIOaSreaUvuS4remAlOmAgOWHuu+8jOS4jeS4i+WPkea4uOaIj+WlluWKsVxyXG4gICAgICAgICAgICAgICAgLy9rYWF5b3UuZW1pdCgnY29tbW9uJywgJ3VpOjpUb2FzdDo6U2hvdycsIHsgbXNnOiBcIuaSreaUvuS4remAlOmAgOWHuu+8jOS4jeS4i+WPkea4uOaIj+WlluWKsVwiIH0pO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+aSreaUvuS4remAlOmAgOWHuu+8jOS4jeS4i+WPkea4uOaIj+WlluWKsScpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgRmVlZGJhY2sge1xyXG4gICAgICAgIENyZWF0ZShwYXJhbSkge1xyXG4gICAgICAgICAgICBpZiAoIWNjLnN5cy5pc1dlQ2hhdCkgeyByZXR1cm47IH1cclxuICAgICAgICAgICAgV1hKU0JyaWRnZS5mZWVkYmFjay5jcmVhdGUocGFyYW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBTaG93KCkge1xyXG4gICAgICAgICAgICBpZiAoIWNjLnN5cy5pc1dlQ2hhdCkgeyByZXR1cm47IH1cclxuICAgICAgICAgICAgV1hKU0JyaWRnZS5mZWVkYmFjay5zaG93KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEhpZGUoKSB7XHJcbiAgICAgICAgICAgIGlmICghY2Muc3lzLmlzV2VDaGF0KSB7IHJldHVybjsgfVxyXG4gICAgICAgICAgICBXWEpTQnJpZGdlLmZlZWRiYWNrLmhpZGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgRGVzdHJveSgpIHtcclxuICAgICAgICAgICAgaWYgKCFjYy5zeXMuaXNXZUNoYXQpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgICAgIFdYSlNCcmlkZ2UuZmVlZGJhY2suZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFBsYXRmb3JtTWdyIHtcclxuICAgICAgICBzdGF0aWMgX19JbnNfXzogUGxhdGZvcm1NZ3IgPSBudWxsO1xyXG4gICAgICAgIHN0YXRpYyBnZXRJbnN0YW5jZSgpIHtcclxuICAgICAgICAgICAgaWYgKFBsYXRmb3JtTWdyLl9fSW5zX18gPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgUGxhdGZvcm1NZ3IuX19JbnNfXyA9IG5ldyBQbGF0Zm9ybU1ncigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBQbGF0Zm9ybU1nci5fX0luc19fO1xyXG4gICAgICAgIH1cclxuICAgICAgICBndm9pY2U6IEdWb2ljZSA9IG51bGw7XHJcbiAgICAgICAgbWFwOiBCYWlkdU1hcCA9IG51bGw7XHJcbiAgICAgICAgd3g6IFdlY2hhdCA9IG51bGw7XHJcbiAgICAgICAgaW06IFl1blZhID0gbnVsbDtcclxuICAgICAgICBzeXM6IFN5c3RlbSA9IG51bGw7XHJcbiAgICAgICAgcGF5OiBQYXkgPSBudWxsO1xyXG4gICAgICAgIGRkOiBERFNoYXJlID0gbnVsbDtcclxuICAgICAgICBtdzogTWFnaWNXaW5kb3cgPSBudWxsO1xyXG4gICAgICAgIHhsOiBYTCA9IG51bGw7XHJcbiAgICAgICAgeHg6IFhYID0gbnVsbDtcclxuICAgICAgICB3ZWJHYW1lOiB3ZWJHYW1lID0gbnVsbDtcclxuXHJcbiAgICAgICAgd3hDZmc6IFdlY2hhdENvbmZpZyA9IG51bGw7XHJcbiAgICAgICAgYWQ6IEFEID0gbnVsbDtcclxuICAgICAgICBmYjogRmVlZGJhY2sgPSBudWxsO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgdGhpcy5ndm9pY2UgPSBuZXcgR1ZvaWNlKCk7XHJcbiAgICAgICAgICAgIHRoaXMubWFwID0gbmV3IEJhaWR1TWFwKCk7XHJcbiAgICAgICAgICAgIHRoaXMud3ggPSBuZXcgV2VjaGF0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuaW0gPSBuZXcgWXVuVmEoKTtcclxuICAgICAgICAgICAgdGhpcy5zeXMgPSBuZXcgU3lzdGVtKCk7XHJcbiAgICAgICAgICAgIHRoaXMucGF5ID0gbmV3IFBheSgpO1xyXG4gICAgICAgICAgICB0aGlzLmRkID0gbmV3IEREU2hhcmUoKTtcclxuICAgICAgICAgICAgdGhpcy5tdyA9IG5ldyBNYWdpY1dpbmRvdygpO1xyXG4gICAgICAgICAgICB0aGlzLnhsID0gbmV3IFhMKCk7XHJcbiAgICAgICAgICAgIHRoaXMueHggPSBuZXcgWFgoKTtcclxuICAgICAgICAgICAgdGhpcy53ZWJHYW1lID0gbmV3IHdlYkdhbWUoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMud3hDZmcgPSBuZXcgV2VjaGF0Q29uZmlnKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYWQgPSBuZXcgQUQoKTtcclxuICAgICAgICAgICAgdGhpcy5mYiA9IG5ldyBGZWVkYmFjaygpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5CaW5kV2luZG93TWV0aG9kKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEJpbmRXaW5kb3dNZXRob2QoKSB7XHJcbiAgICAgICAgICAgIGxldCBLYU5hdGl2ZUJyaWRnZTogYW55ID0ge307XHJcbiAgICAgICAgICAgIC8v57O757ufXHJcbiAgICAgICAgICAgIEthTmF0aXZlQnJpZGdlLk9uRGlhbG9nUmVzID0gdGhpcy5zeXMuT25EaWFsb2dSZXM7XHJcbiAgICAgICAgICAgIEthTmF0aXZlQnJpZGdlLk9uRG93bmxvYWRBcGsgPSB0aGlzLnN5cy5PbkRvd25sb2FkQXBrO1xyXG4gICAgICAgICAgICAvL+W+ruS/oVxyXG4gICAgICAgICAgICBLYU5hdGl2ZUJyaWRnZS5Pbld4TG9naW4gPSB0aGlzLnd4Lk9uTG9naW47XHJcbiAgICAgICAgICAgIEthTmF0aXZlQnJpZGdlLk9uV3hMb2dpbkNhbmNlbCA9IHRoaXMud3guT25XeExvZ2luQ2FuY2VsO1xyXG4gICAgICAgICAgICBLYU5hdGl2ZUJyaWRnZS5PblNoYXJlV3hSZXN1bHQgPSB0aGlzLnd4Lk9uU2hhcmVXeFJlc3VsdDtcclxuICAgICAgICAgICAgS2FOYXRpdmVCcmlkZ2UuT25XeEluc3RhbGxlZCA9IHRoaXMud3guT25XeEluc3RhbGxlZDtcclxuICAgICAgICAgICAgLy/lnLDlm75cclxuICAgICAgICAgICAgS2FOYXRpdmVCcmlkZ2UuT25NYXBJbmZvID0gdGhpcy5tYXAuT25NYXBJbmZvO1xyXG4gICAgICAgICAgICBLYU5hdGl2ZUJyaWRnZS5Pbkdhb0RlTWFwSW5mbyA9IHRoaXMubWFwLk9uR2FvRGVNYXBJbmZvO1xyXG4gICAgICAgICAgICAvL0dWb2ljZVxyXG4gICAgICAgICAgICAvL0thTmF0aXZlQnJpZGdlLk9uXHJcbiAgICAgICAgICAgIC8v6K+t6Z+zXHJcbiAgICAgICAgICAgIEthTmF0aXZlQnJpZGdlLk9uTWljTG9naW5PSyA9IHRoaXMuaW0uT25NaWNMb2dpbk9LO1xyXG4gICAgICAgICAgICBLYU5hdGl2ZUJyaWRnZS5Pbk1pY1N0YXJ0ID0gdGhpcy5pbS5Pbk1pY1N0YXJ0O1xyXG4gICAgICAgICAgICBLYU5hdGl2ZUJyaWRnZS5Pbk1pY1ZvbHVtZSA9IHRoaXMuaW0uT25NaWNWb2x1bWU7XHJcbiAgICAgICAgICAgIEthTmF0aXZlQnJpZGdlLk9uTWljT2sgPSB0aGlzLmltLk9uTWljT2s7XHJcbiAgICAgICAgICAgIEthTmF0aXZlQnJpZGdlLk9uTWljU3RvcCA9IHRoaXMuaW0uT25NaWNTdG9wO1xyXG4gICAgICAgICAgICBLYU5hdGl2ZUJyaWRnZS5Pbk1pY1BsYXlTdGFydCA9IHRoaXMuaW0uT25NaWNQbGF5U3RhcnQ7XHJcbiAgICAgICAgICAgIEthTmF0aXZlQnJpZGdlLk9uTWljUGxheUVuZCA9IHRoaXMuaW0uT25NaWNQbGF5RW5kO1xyXG5cclxuICAgICAgICAgICAgS2FOYXRpdmVCcmlkZ2UuT25Hdm9pY2VJbml0T0sgPSB0aGlzLmd2b2ljZS5Pbkd2b2ljZUluaXRPSztcclxuICAgICAgICAgICAgS2FOYXRpdmVCcmlkZ2UuT25Hdm9pY2VKb2luUm9vbU9LID0gdGhpcy5ndm9pY2UuT25Hdm9pY2VKb2luUm9vbU9LO1xyXG4gICAgICAgICAgICBLYU5hdGl2ZUJyaWRnZS5Pbkd2b2ljZU9wZW5NaWNPSyA9IHRoaXMuZ3ZvaWNlLk9uR3ZvaWNlT3Blbk1pY09LO1xyXG4gICAgICAgICAgICBLYU5hdGl2ZUJyaWRnZS5Pbkd2b2ljZUNsb3NlTWljT0sgPSB0aGlzLmd2b2ljZS5Pbkd2b2ljZUNsb3NlTWljT0s7XHJcbiAgICAgICAgICAgIEthTmF0aXZlQnJpZGdlLk9uR3ZvaWNlT3BlblNwZWFrZXJPSyA9IHRoaXMuZ3ZvaWNlLk9uR3ZvaWNlT3BlblNwZWFrZXJPSztcclxuICAgICAgICAgICAgS2FOYXRpdmVCcmlkZ2UuT25Hdm9pY2VDbG9zZVNwZWFrZXJPSyA9IHRoaXMuZ3ZvaWNlLk9uR3ZvaWNlQ2xvc2VTcGVha2VyT0s7XHJcbiAgICAgICAgICAgIEthTmF0aXZlQnJpZGdlLk9uTWVtYmVyVm9pY2UgPSB0aGlzLmd2b2ljZS5Pbk1lbWJlclZvaWNlO1xyXG4gICAgICAgICAgICAvL+aUr+S7mFxyXG4gICAgICAgICAgICBLYU5hdGl2ZUJyaWRnZS5PblBheVJlcyA9IHRoaXMucGF5Lk9uUGF5UmVzO1xyXG4gICAgICAgICAgICAvLyDpkonpkolcclxuICAgICAgICAgICAgS2FOYXRpdmVCcmlkZ2UuT25EZFNoYXJlUmVzID0gdGhpcy5kZC5PbkRkU2hhcmVSZXM7XHJcbiAgICAgICAgICAgIC8vIOmtlOeql1xyXG4gICAgICAgICAgICBLYU5hdGl2ZUJyaWRnZS5Pbk1hZ2ljV2luZG93UnNwID0gdGhpcy5tdy5Pbk1hZ2ljV2luZG93UnNwO1xyXG4gICAgICAgICAgICBLYU5hdGl2ZUJyaWRnZS5Pbk1hZ2ljV2luZG93Q2FsbFB1bGwgPSB0aGlzLm13Lk9uTWFnaWNXaW5kb3dDYWxsUHVsbDtcclxuICAgICAgICAgICAgS2FOYXRpdmVCcmlkZ2UuT25TeXNCYXR0ZXJ5SW5mb1JzcCA9IHRoaXMuc3lzLk9uU3lzQmF0dGVyeUluZm9Sc3A7XHJcbiAgICAgICAgICAgIC8vSDVcclxuICAgICAgICAgICAgS2FOYXRpdmVCcmlkZ2UuT25MZWdlbmRUb1BheSA9IHRoaXMud2ViR2FtZS5vbkxlZ2VuZFRvUGF5O1xyXG4gICAgICAgICAgICBLYU5hdGl2ZUJyaWRnZS5PblNvdW5kUmVzdW1lID0gdGhpcy5zeXMuT25Tb3VuZFJlc3VtZTtcclxuICAgICAgICAgICAgd2luZG93WydLYU5hdGl2ZUJyaWRnZSddID0gS2FOYXRpdmVCcmlkZ2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBCaW5kV2VjaGF0SG9vaygpIHtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgbGV0IHRlbXBXeE9uU2hvdyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGthYXlvdS5Tb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZXN1bWVNdXNpYygpO1xyXG4gICAgICAgICAgICAgICAga2FheW91LmVtaXQoXCJcIiwgXCJPblNoYXJlV3hSZXN1bHRcIiwgeyBjb2RlOiAnWUVTJywgdHJhbnNhY3Rpb246IFwiXCIgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgV1hKU0JyaWRnZS5ob29rLmFwcFNob3codGVtcFd4T25TaG93KTtcclxuICAgICAgICAgICAgbGV0IHRlbXBXeE9uSGlkZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGthYXlvdS5Tb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wYXVzZU11c2ljKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgV1hKU0JyaWRnZS5ob29rLmFwcEhpZGUodGVtcFd4T25IaWRlKTtcclxuICAgICAgICAgICAgbGV0IHRlbXBXeE9uTG9naW4gPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgV1hKU0JyaWRnZS5zZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFwid3hfc2lnbmF0dXJlXCIsIGRhdGEuc2lnbmF0dXJlKTtcclxuICAgICAgICAgICAgICAgIHNlbGYud3guT25Mb2dpbihkYXRhLmNvZGUsIGRhdGEuaXYsIGRhdGEuZW5jcnlwdGVkRGF0YSwgZGF0YS5yYXdEYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBXWEpTQnJpZGdlLmhvb2subG9naW5TdWNjZXNzKHRlbXBXeE9uTG9naW4pO1xyXG4gICAgICAgICAgICBXWEpTQnJpZGdlLmhvb2subG9naW5GYWlsKHRlbXBXeE9uTG9naW4pO1xyXG4gICAgICAgICAgICBXWEpTQnJpZGdlLmhvb2subG9naW5DYW5jZWwoc2VsZi53eC5Pbld4TG9naW5DYW5jZWwpO1xyXG5cclxuICAgICAgICAgICAgV1hKU0JyaWRnZS5ob29rLmFkTG9hZChzZWxmLmFkLk9uTG9hZCk7XHJcbiAgICAgICAgICAgIFdYSlNCcmlkZ2UuaG9vay5hZEVycm9yKHNlbGYuYWQuT25FcnJvcik7XHJcbiAgICAgICAgICAgIFdYSlNCcmlkZ2UuaG9vay5hZENsb3NlKHNlbGYuYWQuT25DbG9zZSk7XHJcblxyXG4gICAgICAgICAgICBXWEpTQnJpZGdlLmhvb2sucGF5RmFpbChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgV1hKU0JyaWRnZS5VSS50b2FzdChlLmVyck1zZywgXCJub25lXCIpO1xyXG4gICAgICAgICAgICB9KVxyXG5cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cInBsYXRmb3JtLnRzXCIgLz5cclxuXHJcbm5hbWVzcGFjZSBrYWF5b3Uge1xyXG5cclxuXHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEV2ZW50IHtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5LqL5Lu277ya6L+b5YWl5paw55qE5LiA5bin44CCXHJcbiAgICAgICAgICog6ZyA6KaB5rOo5oSP77ya6K+l5LqL5Lu25Y+q5Lya5ZyoIFVJTWFuYWdlciDkuIrmipvlh7rvvIFcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIEVOVEVSX0ZSQU1FOiBzdHJpbmcgPSBcImVudGVyRnJhbWVcIjtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5LqL5Lu277ya5b2T5YmN5bin5Y2z5bCG5byA5aeL5riy5p+T77yI5ZyoIEVOVEVSX0ZSQU1FIOS6i+S7tuS5i+WQju+8ieOAglxyXG4gICAgICAgICAqIOmcgOimgeazqOaEj++8muivpeS6i+S7tuWPquS8muWcqCBVSU1hbmFnZXIg5LiK5oqb5Ye677yBXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBQUkVSRU5ERVI6IHN0cmluZyA9IFwicHJlcmVuZGVyXCI7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOS6i+S7tu+8mkFQUCDojrflvpfnhKbngrnvvIjliIfmjaLlm57liY3lj7DvvInjgIJcclxuICAgICAgICAgKiDpnIDopoHms6jmhI/vvJror6Xkuovku7blj6rkvJrlnKggVUlNYW5hZ2VyIOS4iuaKm+WHuu+8gVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQUNUSVZBVEU6IHN0cmluZyA9IFwiYWN0aXZhdGVcIjtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5LqL5Lu277yaQVBQIOWkseWOu+eEpueCue+8iOWIh+aNouWIsOWQjuWPsO+8ieOAglxyXG4gICAgICAgICAqIOmcgOimgeazqOaEj++8muivpeS6i+S7tuWPquS8muWcqCBVSU1hbmFnZXIg5LiK5oqb5Ye677yBXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBERUFDVElWQVRFOiBzdHJpbmcgPSBcImRlYWN0aXZhdGVcIjtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5LqL5Lu277ya6Iie5Y+w5bC65a+45pyJ5pS55Y+Y44CCXHJcbiAgICAgICAgICog6ZyA6KaB5rOo5oSP77ya6K+l5LqL5Lu25Y+q5Lya5ZyoIFVJTWFuYWdlciDkuIrmipvlh7rvvIFcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFJFU0laRTogc3RyaW5nID0gXCJzdGFnZVJlc2l6ZVwiO1xyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5LqL5Lu277ya5a2Q5a+56LGh55qE5bC65a+45pyJ5pS55Y+YXHJcbiAgICAgICAgICogRGlzcGxheU9iamVjdENvbnRhaW5lciDkvJrlr7noh6rlt7HkvqblkKzor6Xkuovku7bvvIzlpoLmnpzlrZDoioLngrnnmoTlsLrlr7jmnInmlLnlj5jvvIzlupTlhpLms6Hmipvlh7ror6Xkuovku7ZcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIENISUxEX1JFU0laRTogc3RyaW5nID0gXCJjaGlsZFJlc2l6ZVwiO1xyXG5cclxuXHJcbiAgICAgICAgLyoq5LqL5Lu257G75Z6LKi9cclxuICAgICAgICBwdWJsaWMgdHlwZTogc3RyaW5nO1xyXG4gICAgICAgIC8qKuS6i+S7tumZhOW4pueahOaVsOaNriovXHJcbiAgICAgICAgcHVibGljIGRhdGE6IGFueTtcclxuXHJcbiAgICAgICAgLyoq5b2T5YmN5LqL5Lu255qE5L6m5ZCs6ICFKi9cclxuICAgICAgICBwdWJsaWMgY3VycmVudFRhcmdldDogYW55O1xyXG4gICAgICAgIC8qKuS6i+S7tueahOecn+ato+aKm+WHuuiAhSovXHJcbiAgICAgICAgcHVibGljIHRhcmdldDogYW55O1xyXG4gICAgICAgIC8qKuS6i+S7tuS8oOaSreaYr+WQpuW3suWBnOatoiovXHJcbiAgICAgICAgcHVibGljIGlzUHJvcGFnYXRpb25TdG9wcGVkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcih0eXBlOiBzdHJpbmcsIGRhdGE/OiBhbnkpIHtcclxuICAgICAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgICAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOWBnOatouS8oOaSreS6i+S7tlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzdG9wUHJvcGFnYXRpb24oKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNQcm9wYWdhdGlvblN0b3BwZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOS7juaxoOS4reiOt+WPluS4gOS4quS6i+S7tuWvueixoVxyXG4gICAgICAgICAqIEBwYXJhbSBFdmVudENsYXNzIOS6i+S7tmNsYXNzXHJcbiAgICAgICAgICogQHBhcmFtIHR5cGUg5LqL5Lu257G75Z6LXHJcbiAgICAgICAgICogQHBhcmFtIGRhdGEg6ZmE5bim5pWw5o2uXHJcbiAgICAgICAgICogQHJldHVybiB7VH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZTxUIGV4dGVuZHMgRXZlbnQ+KEV2ZW50Q2xhc3M6IHsgbmV3KHR5cGU6IHN0cmluZyk6IFQ7IF9ldmVudFBvb2w/OiBFdmVudFtdIH0sXHJcbiAgICAgICAgICAgIHR5cGU6IHN0cmluZyxcclxuICAgICAgICAgICAgZGF0YT86IGFueSk6IFQge1xyXG4gICAgICAgICAgICBsZXQgZXZlbnRQb29sOiBFdmVudFtdID0gRXZlbnRDbGFzcy5fZXZlbnRQb29sO1xyXG4gICAgICAgICAgICBpZiAoZXZlbnRQb29sID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGV2ZW50UG9vbCA9IEV2ZW50Q2xhc3MuX2V2ZW50UG9vbCA9IFtdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChldmVudFBvb2wubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGV2ZW50OiBUID0gPFQ+ZXZlbnRQb29sLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgZXZlbnQudHlwZSA9IHR5cGU7XHJcbiAgICAgICAgICAgICAgICBldmVudC5kYXRhID0gZGF0YTtcclxuICAgICAgICAgICAgICAgIGV2ZW50LmlzUHJvcGFnYXRpb25TdG9wcGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZXZlbnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBFdmVudENsYXNzKHR5cGUpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOWwhuS6i+S7tuWvueixoeWbnuaUtuWIsOWvueW6lOeahOaxoOS4rVxyXG4gICAgICAgICAqIEBwYXJhbSBldmVudFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgcmVjeWNsZShldmVudDogRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICAgICAgZXZlbnQudGFyZ2V0ID0gZXZlbnQuY3VycmVudFRhcmdldCA9IGV2ZW50LmRhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICBsZXQgRXZlbnRDbGFzczogYW55ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKGV2ZW50KS5jb25zdHJ1Y3RvcjtcclxuICAgICAgICAgICAgRXZlbnRDbGFzcy5fZXZlbnRQb29sLnB1c2goZXZlbnQpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8vXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkuovku7bmtL7lj5HlmajmjqXlj6NcclxuICAgICAqIEBhdXRob3Iga2FheW91XHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUV2ZW50RGlzcGF0Y2hlciB7XHJcbiAgICAgICAgb24odHlwZTogc3RyaW5nLCBsaXN0ZW5lcjogKGV2ZW50OiBrYWF5b3UuRXZlbnQsIC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkLCBjYWxsZXI/OiBhbnksIHByaW9yaXR5PzogbnVtYmVyLCAuLi5hcmdzOiBhbnlbXSk6IHZvaWQ7XHJcbiAgICAgICAgb2ZmKHR5cGU6IHN0cmluZywgbGlzdGVuZXI6IChldmVudDoga2FheW91LkV2ZW50LCAuLi5hcmdzOiBhbnlbXSkgPT4gdm9pZCwgY2FsbGVyPzogYW55KTogdm9pZDtcclxuICAgICAgICBkaXNwYXRjaChldmVudDogRXZlbnQsIGJ1YmJsZXM6IGJvb2xlYW4sIHJlY3ljbGU6IGJvb2xlYW4pOiB2b2lkO1xyXG4gICAgICAgIGVtaXQoZXZlbnQ6IEV2ZW50LCBidWJibGVzOiBib29sZWFuLCByZWN5Y2xlOiBib29sZWFuKTogdm9pZDtcclxuICAgICAgICBoYXModHlwZTogc3RyaW5nKTogYm9vbGVhbjtcclxuICAgICAgICBvZmZCeXRhcmdlcih0eXBlOiBzdHJpbmcsIHRhcmdldDogYW55KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS6i+S7tuazqOWGjOiAheeahOS/oeaBr1xyXG4gICAgICogQGF1dGhvciBrYWF5b3VcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGludGVyZmFjZSBFdmVudExpc3RlbmVySW5mbyB7XHJcbiAgICAgICAgdHlwZTogc3RyaW5nO1xyXG4gICAgICAgIGxpc3RlbmVyOiBGdW5jdGlvbjtcclxuICAgICAgICBjYWxsZXI6IGFueTtcclxuICAgICAgICBwcmlvcml0eTogbnVtYmVyO1xyXG4gICAgICAgIGFyZ3M6IGFueVtdO1xyXG4gICAgICAgIG9uZWNlOiBib29sZWFuO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS6i+S7tua0vuWPkeWZqO+8jOi0n+i0o+i/m+ihjOS6i+S7tueahOWPkemAgeWSjOS+puWQrFxyXG4gICAgICogQGF1dGhvciBrYWF5b3VcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGNsYXNzIEV2ZW50RGlzcGF0Y2hlciBpbXBsZW1lbnRzIElFdmVudERpc3BhdGNoZXIge1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgX2V2ZW50TWFwOiBhbnk7XHJcblxyXG4gICAgICAgIC8qKuS6i+S7tua0vuWPkeWZqOWvueW6lOeahOebruagh++8iOe7hOWQiOaooeW8j+S4i++8iSovXHJcbiAgICAgICAgcHJvdGVjdGVkIF90YXJnZXQ6IElFdmVudERpc3BhdGNoZXI7XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgY29uc3RydWN0b3IodGFyZ2V0PzogSUV2ZW50RGlzcGF0Y2hlcikge1xyXG4gICAgICAgICAgICB0aGlzLl9ldmVudE1hcCA9IHt9O1xyXG4gICAgICAgICAgICBpZiAodGFyZ2V0ICE9IG51bGwpIHRoaXMuX3RhcmdldCA9IHRhcmdldDtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgZXZlbnRfYWRkTGlzdGVuZXIodHlwZTogc3RyaW5nLCBsaXN0ZW5lcjogKGV2ZW50OiBrYWF5b3UuRXZlbnQsIC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkLCBjYWxsZXI6IGFueSwgcHJpb3JpdHk6IG51bWJlciA9IDAsIC4uLmFyZ3M6IGFueVtdKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9ldmVudE1hcFt0eXBlXSA9PSBudWxsKSB0aGlzLl9ldmVudE1hcFt0eXBlXSA9IFtdO1xyXG4gICAgICAgICAgICBsZXQgbGlzdDogRXZlbnRMaXN0ZW5lckluZm9bXSA9IHRoaXMuX2V2ZW50TWFwW3R5cGVdO1xyXG4gICAgICAgICAgICBsZXQgbGVuOiBudW1iZXIgPSBsaXN0Lmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgIGxldCBpbmRleDogbnVtYmVyID0gLTE7XHJcbiAgICAgICAgICAgIGxldCBpbmZvOiBFdmVudExpc3RlbmVySW5mbztcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaW5mbyA9IGxpc3RbaV07XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGluZm8ubGlzdGVuZXIgPT0gbGlzdGVuZXIgJiYgaW5mby5jYWxsZXIgPT0gY2FsbGVyKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjsgLy8g5bey5rOo5YaMXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID09IC0xICYmIGluZm8ucHJpb3JpdHkgPCBwcmlvcml0eSlcclxuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaW5mbyA9IHsgdHlwZTogdHlwZSwgbGlzdGVuZXI6IGxpc3RlbmVyLCBjYWxsZXI6IGNhbGxlciwgcHJpb3JpdHk6IHByaW9yaXR5LCBhcmdzOiBhcmdzLCBvbmVjZTogZmFsc2UgfTtcclxuXHJcbiAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEpIGxpc3Quc3BsaWNlKGluZGV4LCAwLCBpbmZvKTtcclxuICAgICAgICAgICAgZWxzZSBsaXN0LnB1c2goaW5mbyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBvbiA9IHRoaXMuZXZlbnRfYWRkTGlzdGVuZXI7XHJcbiAgICAgICAgcHVibGljIGV2ZW50X2FkZExpc3RlbmVyT25lKHR5cGU6IHN0cmluZywgbGlzdGVuZXI6IChldmVudDoga2FheW91LkV2ZW50LCAuLi5hcmdzOiBhbnlbXSkgPT4gdm9pZCwgY2FsbGVyOiBhbnksIHByaW9yaXR5OiBudW1iZXIgPSAwLCAuLi5hcmdzOiBhbnlbXSk6IHZvaWQge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fZXZlbnRNYXBbdHlwZV0gPT0gbnVsbCkgdGhpcy5fZXZlbnRNYXBbdHlwZV0gPSBbXTtcclxuICAgICAgICAgICAgbGV0IGxpc3Q6IEV2ZW50TGlzdGVuZXJJbmZvW10gPSB0aGlzLl9ldmVudE1hcFt0eXBlXTtcclxuICAgICAgICAgICAgbGV0IGxlbjogbnVtYmVyID0gbGlzdC5sZW5ndGg7XHJcblxyXG4gICAgICAgICAgICBsZXQgaW5kZXg6IG51bWJlciA9IC0xO1xyXG4gICAgICAgICAgICBsZXQgaW5mbzogRXZlbnRMaXN0ZW5lckluZm87XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGluZm8gPSBsaXN0W2ldO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpbmZvLmxpc3RlbmVyID09IGxpc3RlbmVyICYmIGluZm8uY2FsbGVyID09IGNhbGxlcilcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47IC8vIOW3suazqOWGjFxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PSAtMSAmJiBpbmZvLnByaW9yaXR5IDwgcHJpb3JpdHkpXHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGluZm8gPSB7IHR5cGU6IHR5cGUsIGxpc3RlbmVyOiBsaXN0ZW5lciwgY2FsbGVyOiBjYWxsZXIsIHByaW9yaXR5OiBwcmlvcml0eSwgYXJnczogYXJncywgb25lY2U6IHRydWUgfTtcclxuXHJcbiAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEpIGxpc3Quc3BsaWNlKGluZGV4LCAwLCBpbmZvKTtcclxuICAgICAgICAgICAgZWxzZSBsaXN0LnB1c2goaW5mbyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBvbmVjZSA9IHRoaXMuZXZlbnRfYWRkTGlzdGVuZXJPbmU7XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgZXZlbnRfcmVtb3ZlTGlzdGVuZXIodHlwZTogc3RyaW5nLCBsaXN0ZW5lcjogKGV2ZW50OiBrYWF5b3UuRXZlbnQsIC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkLCBjYWxsZXI6IGFueSk6IHZvaWQge1xyXG4gICAgICAgICAgICBsZXQgbGlzdDogRXZlbnRMaXN0ZW5lckluZm9bXSA9IHRoaXMuX2V2ZW50TWFwW3R5cGVdO1xyXG4gICAgICAgICAgICBpZiAobGlzdCA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgIGxldCBsZW46IG51bWJlciA9IGxpc3QubGVuZ3RoO1xyXG4gICAgICAgICAgICBpZiAobGVuID09IDApIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBpbmZvOiBFdmVudExpc3RlbmVySW5mbyA9IGxpc3RbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5mby5saXN0ZW5lciA9PT0gbGlzdGVuZXIgJiYgaW5mby5jYWxsZXIgPT09IGNhbGxlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGxpc3Quc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAobGlzdC5sZW5ndGggPT0gMCkgZGVsZXRlIHRoaXMuX2V2ZW50TWFwW3R5cGVdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgb2ZmID0gdGhpcy5ldmVudF9yZW1vdmVMaXN0ZW5lcjtcclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBldmVudF9yZW1vdmVMaXN0ZW5lckJ5dGFyZ2VyKHR5cGU6IHN0cmluZywgdGFyZ2V0OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICAgICAgbGV0IGxpc3Q6IEV2ZW50TGlzdGVuZXJJbmZvW10gPSB0aGlzLl9ldmVudE1hcFt0eXBlXTtcclxuICAgICAgICAgICAgaWYgKGxpc3QgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBsZXQgbGVuOiBudW1iZXIgPSBsaXN0Lmxlbmd0aDtcclxuICAgICAgICAgICAgaWYgKGxlbiA9PSAwKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5mbzogRXZlbnRMaXN0ZW5lckluZm8gPSBsaXN0W2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKGluZm8uY2FsbGVyID09PSB0YXJnZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICBsaXN0LnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobGlzdC5sZW5ndGggPT0gMCkgZGVsZXRlIHRoaXMuX2V2ZW50TWFwW3R5cGVdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG9mZkJ5dGFyZ2VyID0gdGhpcy5ldmVudF9yZW1vdmVMaXN0ZW5lckJ5dGFyZ2VyO1xyXG5cclxuXHJcbiAgICAgICAgcHVibGljIGV2ZW50X2Rpc3BhdGNoKGV2ZW50OiBFdmVudCwgYnViYmxlczogYm9vbGVhbiA9IGZhbHNlLCByZWN5Y2xlOiBib29sZWFuID0gdHJ1ZSk6IHZvaWQge1xyXG4gICAgICAgICAgICBsZXQgdGFyZ2V0OiBJRXZlbnREaXNwYXRjaGVyID0gKHRoaXMuX3RhcmdldCAhPSBudWxsKSA/IHRoaXMuX3RhcmdldCA6IHRoaXM7XHJcbiAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQgPT0gbnVsbCkgZXZlbnQudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgICAgICAgICBldmVudC5jdXJyZW50VGFyZ2V0ID0gdGFyZ2V0O1xyXG5cclxuICAgICAgICAgICAgbGV0IGxpc3Q6IEV2ZW50TGlzdGVuZXJJbmZvW10gPSB0aGlzLl9ldmVudE1hcFtldmVudC50eXBlXTtcclxuICAgICAgICAgICAgLy8g5b2T5YmN6IqC54K55pyJ5L6m5ZCs6K+l5LqL5Lu2XHJcbiAgICAgICAgICAgIGlmIChsaXN0ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGxldCBsZW46IG51bWJlciA9IGxpc3QubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxlbiA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBsaXN0ID0gbGlzdC5jb25jYXQoKTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbmZvOiBFdmVudExpc3RlbmVySW5mbyA9IGxpc3RbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaW5mbykgeyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluZm8uYXJncy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFyZ3M6IGFueVtdID0gaW5mby5hcmdzLmNvbmNhdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MudW5zaGlmdChldmVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5mby5saXN0ZW5lci5hcHBseShpbmZvLmNhbGxlciwgYXJncyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmZvLmxpc3RlbmVyLmNhbGwoaW5mby5jYWxsZXIsIGV2ZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmZvLm9uZWNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRNYXBbZXZlbnQudHlwZV1baV0gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNhdGNo5Yiw5byC5bi45pe25LiN5rOo6ZSA5Zue6LCDXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLl9ldmVudE1hcFtldmVudC50eXBlXVtpXSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5mby5vbmVjZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50TWFwW2V2ZW50LnR5cGVdW2ldID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnIubmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtZXNzYWdlID0gZXJyLm1lc3NhZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG1lc3NhZ2UgPT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbWVzc2FnZSkgeyBtZXNzYWdlID0gXCJubyBtZXNzYWdlXCI7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgbWVzc2FnZSA9PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlID0gSlNPTi5zdHJpbmdpZnkobWVzc2FnZSwgbnVsbCwgMik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBcImVyciBtZXNzYWdlIG9iamVjdFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9IFwibm8gbWVzc2FnZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3RhY2sgPSBlcnIuc3RhY2s7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygc3RhY2sgPT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc3RhY2spIHsgc3RhY2sgPSBcIm5vIHN0YWNrXCI7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygc3RhY2sgPT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhY2sgPSBKU09OLnN0cmluZ2lmeShzdGFjaywgbnVsbCwgMik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWNrID0gXCJlcnIgc3RhY2sgb2JqZWN0XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFjayA9IFwibm8gc3RhY2tcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiZXZlbnQgZXJyIDpcIiArIGthYXlvdS5nZXRMb2JieVZlcnNpb24oKSwgYCR7ZXZlbnQudHlwZX0gJHttZXNzYWdlfWAsIHN0YWNrKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2FheW91LlBsYXRmb3JtTWdyLmdldEluc3RhbmNlKCkuc3lzLlBvc3RCdWdseShcImV2ZW50IGVyciA6XCIgKyBrYWF5b3UuZ2V0TG9iYnlWZXJzaW9uKCksIGAke2V2ZW50LnR5cGV9ICR7bWVzc2FnZX1gLCBzdGFjayk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1zZzogXCLns7vnu5/mo4DmtYvliLDlvILluLjvvIzngrnlh7vnoa7lrprlkI7oh6rliqjph43lkK/vvIFcXG5cXG4gICouXCIgKyBtZXNzYWdlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZTogeyBpc1Nob3c6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnRuczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwi56Gu5a6aXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY2Muc3lzLmlzTmF0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAod2luZG93ICYmIHdpbmRvdy5sb2NhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLmdhbWUucmVzdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvclR5cGU6ICd5ZWxsb3cnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbmZpZ0RhdGEgPSBjb21tb24ubW9kLkNvbmZpZy5HZXRBcHBDb25maWcoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29uZmlnRGF0YSAmJiBjb25maWdEYXRhLmlzRGVidWcgPT0gJ3RydWUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGthYXlvdS5lbWl0KCdjb21tb24nLCAndWk6OkRpYWxvZzo6U2hvdycsIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQuaXNQcm9wYWdhdGlvblN0b3BwZWQpIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbG9kYXNoLnB1bGxBbGwodGhpcy5fZXZlbnRNYXBbZXZlbnQudHlwZV0sIFtudWxsXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIOS6i+S7tui/mOayoeWBnOatouOAgeaYr+aYvuekuuWvueixoeOAgemcgOimgee7p+e7reWGkuazoVxyXG4gICAgICAgICAgICBpZiAoYnViYmxlcyAmJiAhZXZlbnQuaXNQcm9wYWdhdGlvblN0b3BwZWRcclxuICAgICAgICAgICAgICAgICYmIHRoaXMuX3RhcmdldCBpbnN0YW5jZW9mIGNjLk5vZGVcclxuICAgICAgICAgICAgICAgIC8vICYmIHRoaXMuX3RhcmdldCAhPSBrYWF5b3Uuc3RhZ2VcclxuICAgICAgICAgICAgICAgICYmIHRoaXMuX3RhcmdldFtcInBhcmVudFwiXSAhPSBudWxsXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgKDxJRXZlbnREaXNwYXRjaGVyPig8Y2MuTm9kZT50aGlzLl90YXJnZXQpLnBhcmVudCkuZGlzcGF0Y2goZXZlbnQsIGJ1YmJsZXMsIHJlY3ljbGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHJlY3ljbGUpIHtcclxuICAgICAgICAgICAgICAgIEV2ZW50LnJlY3ljbGUoZXZlbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBlbWl0ID0gdGhpcy5ldmVudF9kaXNwYXRjaDtcclxuICAgICAgICBwdWJsaWMgZGlzcGF0Y2ggPSB0aGlzLmV2ZW50X2Rpc3BhdGNoO1xyXG5cclxuXHJcbiAgICAgICAgcHVibGljIGV2ZW50X2hhc0xpc3RlbmVyKHR5cGU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZXZlbnRNYXBbdHlwZV0gIT0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBoYXMgPSB0aGlzLmV2ZW50X2hhc0xpc3RlbmVyO1xyXG4gICAgICAgIC8vXHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNvY2tldCAvIFdlYlNvY2tldCDnm7jlhbPkuovku7ZcclxuICAgICAqIFxyXG4gICAgICovXHJcbiAgICBleHBvcnQgY2xhc3MgU29ja2V0RXZlbnQgZXh0ZW5kcyBFdmVudCB7XHJcblxyXG4gICAgICAgIC8qKuW7uueri+i/nuaOpSovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDT05ORUNUOiBzdHJpbmcgPSBcImNvbm5lY3RcIjtcclxuXHJcbiAgICAgICAgLyoq5pS25Yiw5pWw5o2uKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIERBVEE6IHN0cmluZyA9IFwiZGF0YVwiO1xyXG5cclxuICAgICAgICAvKirov57mjqXplJnor68qL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgRVJST1I6IHN0cmluZyA9IFwiZXJyb3JcIjtcclxuXHJcbiAgICAgICAgLyoq5YWz6ZetKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIENMT1NFOiBzdHJpbmcgPSBcImNsb3NlXCI7XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgY29uc3RydWN0b3IodHlwZTogc3RyaW5nLCBkYXRhPzogYW55KSB7XHJcbiAgICAgICAgICAgIHN1cGVyKHR5cGUsIGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAqIFRvdWNoRXZlbnQgLyBUb3VjaEV2ZW50IOebuOWFs+S6i+S7tlxyXG4gICAgKiBcclxuICAgICovXHJcbiAgICBleHBvcnQgY2xhc3MgVG91Y2hFdmVudCBleHRlbmRzIEV2ZW50IHtcclxuXHJcbiAgICAgICAgLyoq5by56LW3Ki9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFRvdWNoRW5kOiBzdHJpbmcgPSBcIlRvdWNoRW5kXCI7XHJcblxyXG4gICAgICAgIC8qKuaMieS4iyovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBUb3VjaFN0YXJ0OiBzdHJpbmcgPSBcIlRvdWNoU3RhcnRcIjtcclxuXHJcbiAgICAgICAgLyoq56e75YqoKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFRvdWNoTW92ZTogc3RyaW5nID0gXCJUb3VjaE1vdmVcIjtcclxuXHJcbiAgICAgICAgLyoq5Y+W5raIKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFRvdWNoQ2FuY2U6IHN0cmluZyA9IFwiVG91Y2hDYW5jZVwiO1xyXG5cclxuICAgICAgICBwdWJsaWMgY29uc3RydWN0b3IodHlwZTogc3RyaW5nLCBkYXRhPzogYW55KSB7XHJcbiAgICAgICAgICAgIHN1cGVyKHR5cGUsIGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIENoZWNrRXZlbnQgZXh0ZW5kcyBFdmVudCB7XHJcblxyXG4gICAgICAgIC8qKumAieS4rSovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBTRUxFQ1RFRDogc3RyaW5nID0gXCJTZWxlY3RlZFwiO1xyXG5cclxuICAgICAgICAvKirlj5bmtogqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVU5TRUxFQ1RFRDogc3RyaW5nID0gXCJVblNlbGVjdGVkXCI7XHJcblxyXG4gICAgICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcih0eXBlOiBzdHJpbmcsIGRhdGE/OiBhbnkpIHtcclxuICAgICAgICAgICAgc3VwZXIodHlwZSwgZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgUmFkaW9FdmVudCBleHRlbmRzIEV2ZW50IHtcclxuXHJcbiAgICAgICAgLyoq6YCJ5LitKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFNFTEVDVEVEOiBzdHJpbmcgPSBcIlJhZGlvU2VsZWN0ZWRcIjtcclxuICAgICAgICAvKirpgInkuK0qL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVU5TRUxFQ1RFRDogc3RyaW5nID0gXCJSYWRpb1VOU2VsZWN0ZWRcIjtcclxuICAgICAgICBwdWJsaWMgY29uc3RydWN0b3IodHlwZTogc3RyaW5nLCBkYXRhPzogYW55KSB7XHJcbiAgICAgICAgICAgIHN1cGVyKHR5cGUsIGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAqICBDdXN0b21FdmVudCDnm7jlhbPkuovku7ZcclxuICAgICogXHJcbiAgICAqL1xyXG4gICAgZXhwb3J0IGNsYXNzIEN1c3RvbUV2ZW50IGV4dGVuZHMgRXZlbnQge1xyXG5cclxuICAgICAgICBwdWJsaWMgY29uc3RydWN0b3IodHlwZTogc3RyaW5nLCBkYXRhPzogYW55KSB7XHJcbiAgICAgICAgICAgIHN1cGVyKHR5cGUsIGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbn0iLCJuYW1lc3BhY2Uga2FheW91e1xyXG4gICAgZXhwb3J0IGNsYXNzIENvbnRyb2xsZXJNYW5hZ2VyIHtcclxuICAgICAgICBwcml2YXRlIF9jb250cm9sbGVyczogeyBba2V5OiBzdHJpbmddOiBrYWF5b3UuRXZlbnREaXNwYXRjaGVyIH0gPSBudWxsO1xyXG4gICAgICAgIHN0YXRpYyBfX0lOU19fOiBDb250cm9sbGVyTWFuYWdlciA9IG51bGw7XHJcbiAgICAgICAgc3RhdGljIGdldEluc3RhbmNlKCkge1xyXG4gICAgICAgICAgICBpZiAoQ29udHJvbGxlck1hbmFnZXIuX19JTlNfXyA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBDb250cm9sbGVyTWFuYWdlci5fX0lOU19fID0gbmV3IENvbnRyb2xsZXJNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICAgICBDb250cm9sbGVyTWFuYWdlci5fX0lOU19fLmluaXQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gQ29udHJvbGxlck1hbmFnZXIuX19JTlNfXztcclxuICAgICAgICB9XHJcbiAgICAgICAgaW5pdCgpIHtcclxuICAgICAgICAgICAgdGhpcy5fY29udHJvbGxlcnMgPSB7fTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaGFzKG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgICAgICBuYW1lID0gbmFtZS50b1VwcGVyQ2FzZSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY29udHJvbGxlcnNbbmFtZV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdldENvbnRyb2xsZXIobmFtZTogc3RyaW5nID0gXCJkZWZhdWx0XCIpIHtcclxuICAgICAgICAgICAgbmFtZSA9IG5hbWUudG9VcHBlckNhc2UoKTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmhhcyhuYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFsbChuYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY29udHJvbGxlcnNbbmFtZV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGluc3RhbGwobmFtZTogc3RyaW5nKTprYWF5b3UuRXZlbnREaXNwYXRjaGVyIHtcclxuICAgICAgICAgICAgbmFtZSA9IG5hbWUudG9VcHBlckNhc2UoKTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmhhcyhuYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY29udHJvbGxlcnNbbmFtZV0gPSBuZXcga2FheW91LkV2ZW50RGlzcGF0Y2hlcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb250cm9sbGVyc1tuYW1lXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdW5pbnN0YWxsKG5hbWU6IHN0cmluZyk6Ym9vbGVhbiB7XHJcbiAgICAgICAgICAgIG5hbWUgPSBuYW1lLnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5oYXMobmFtZSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NvbnRyb2xsZXJzW25hbWVdID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5fY29udHJvbGxlcnNbbmFtZV07XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgfVxyXG4gICAgfSIsIlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiZGVjb3JhdG9yLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cImV2ZW50LnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cImthYXlvdS5Db250cm9sbGVyTWFuYWdlci50c1wiIC8+XHJcblxyXG5uYW1lc3BhY2Uga2FheW91IHtcclxuXHJcblxyXG4gICAgdmFyIF9nbG9iYWwgPSB0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyA/IGdsb2JhbCA6IHdpbmRvdztcclxuXHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGlzRGV2QnJvd3NlcigpIHtcclxuICAgICAgICBpZiAoY2Muc3lzLmlzTmF0aXZlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNjLnN5cy5vcyA9PSBjYy5zeXMuT1NfQU5EUk9JRCAmJiAhIV9nbG9iYWxbJ2FuZHJvaWRwaXBlJ10pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoY2Muc3lzLm9zID09IGNjLnN5cy5PU19JT1MgJiYgISFfZ2xvYmFsWydpb3NwaXBlJ10pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoY2Muc3lzLm9zID09IGNjLnN5cy5PU19XSU5ET1dTICYmICEhX2dsb2JhbFsnd2lucGlwZSddKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBEYXRhU2V0IHtcclxuXHJcbiAgICAgICAgc3RhdGljIHNldChrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZykge1xyXG5cclxuICAgICAgICAgICAgaWYgKGthYXlvdS5pc0RldkJyb3dzZXIoKSkge1xyXG4gICAgICAgICAgICAgICAgX2dsb2JhbC5zZXNzaW9uU3RvcmFnZS5zZXRJdGVtKGtleSwgdmFsdWUpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKF9nbG9iYWwua2FheW91X2pzYiAmJiBfZ2xvYmFsLmthYXlvdV9qc2IuRGF0YVNldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfZ2xvYmFsLmthYXlvdV9qc2IuRGF0YVNldC5zZXQoa2V5LCB2YWx1ZSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIGdldChrZXk6IHN0cmluZykge1xyXG4gICAgICAgICAgICBpZiAoa2FheW91LmlzRGV2QnJvd3NlcigpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX2dsb2JhbC5zZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGtleSkgfHwgbnVsbDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChjYy5zeXMuaXNOYXRpdmUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoX2dsb2JhbC5rYWF5b3VfanNiICYmIF9nbG9iYWwua2FheW91X2pzYi5EYXRhU2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9nbG9iYWwua2FheW91X2pzYi5EYXRhU2V0LmdldChrZXkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gY2NfZXh0ZW5kKCkge1xyXG5cclxuICAgICAgICBjY19Ob2RlX2V4dGVuZCgpO1xyXG4gICAgICAgIGNjX0xheW91dF9leHRlbmQoKTtcclxuICAgICAgICBjY19TY3JvbGxWaWV3X2V4dGVuZCgpO1xyXG4gICAgICAgIGNjX0NoZWNrQm94X2V4dGVuZCgpO1xyXG4gICAgICAgIC8vIGNjdWlfQnV0dG9uX2V4dGVuZCgpO1xyXG4gICAgICAgIC8vIGNjdWlfTGF5b3V0X2V4dGVuZCgpO1xyXG4gICAgICAgIGNjX1JpY2h0ZXh0X2V4dGVuZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNjX05vZGVfZXh0ZW5kKCkge1xyXG4gICAgICAgIGxldCBwcm90bzogYW55ID0gY2MuTm9kZS5wcm90b3R5cGU7XHJcbiAgICAgICAgcHJvdG8ub24gPSBleHBlbmRfZXZlbnRfYWRkTGlzdGVuZXI7XHJcbiAgICAgICAgcHJvdG8ub2ZmID0gZXhwZW5kX2V2ZW50X3JlbW92ZUxpc3RlbmVyO1xyXG4gICAgICAgIHByb3RvLmRpc3BhdGNoID0gZXhwZW5kX2V2ZW50X2Rpc3BhdGNoO1xyXG4gICAgICAgIHByb3RvLmVtaXQgPSBleHBlbmRfZXZlbnRfZGlzcGF0Y2g7XHJcbiAgICAgICAgcHJvdG8uaGFzID0gZXhwZW5kX2V2ZW50X2hhc0xpc3RlbmVyO1xyXG4gICAgICAgIHByb3RvLm9mZkJ5dGFyZ2VyID0gZXhwZW5kX2V2ZW50X29mZkJ5dGFyZ2VyTGlzdGVuZXI7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2NfTGF5b3V0X2V4dGVuZCgpIHtcclxuXHJcbiAgICAgICAgbGV0IHByb3RvOiBhbnkgPSBjY3VpLkxheW91dC5wcm90b3R5cGU7XHJcbiAgICAgICAgY2N1aS5MYXlvdXQuTGF5b3V0SG9yaXpvbnRhbCA9IHtcclxuICAgICAgICAgICAgTEVGVDogMCxcclxuICAgICAgICAgICAgUklHSFQ6IDFcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNjdWkuTGF5b3V0LkxheW91dFZlcnRpY2FsID0ge1xyXG4gICAgICAgICAgICBUT1A6IDAsXHJcbiAgICAgICAgICAgIEJPVFRPTTogMVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNjdWkuTGF5b3V0LkxheW91dEdyaWRfQXhpc0RpcmVjdGlvbiA9IHtcclxuICAgICAgICAgICAgSE9SSVpPTlRBTDogMCxcclxuICAgICAgICAgICAgVkVSVElDQUw6IDFcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjY3VpLkxheW91dC5MYXlvdXREaXJlY3Rpb24gPSB7XHJcbiAgICAgICAgICAgIEhvcml6b250YWw6IDAsXHJcbiAgICAgICAgICAgIFZlcnRpY2FsOiAxLFxyXG4gICAgICAgICAgICBHcmlkOiAyXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcHJvdG8uX2xheW91dEhvcml6b250YWwgPSBjY3VpLkxheW91dC5MYXlvdXRIb3Jpem9udGFsLkxFRlQ7XHJcbiAgICAgICAgcHJvdG8uX2xheW91dFZlcnRpY2FsID0gY2N1aS5MYXlvdXQuTGF5b3V0VmVydGljYWwuVE9QO1xyXG4gICAgICAgIHByb3RvLl9sYXlvdXRHcmlkQXhpcyA9IGNjdWkuTGF5b3V0LkxheW91dEdyaWRfQXhpc0RpcmVjdGlvbi5IT1JJWk9OVEFMO1xyXG4gICAgICAgIHByb3RvLl9jaGlsZHJlbkxheW91dERpcmVjdGlvbiA9IGNjdWkuTGF5b3V0LkxheW91dERpcmVjdGlvbi5Ib3Jpem9udGFsO1xyXG5cclxuICAgICAgICBwcm90by5zZXRIb3Jpem9udGFsID0gZnVuY3Rpb24gKHY6IGNjdWkuTGF5b3V0LkxheW91dEhvcml6b250YWwpIHtcclxuICAgICAgICAgICAgdGhpcy5fbGF5b3V0SG9yaXpvbnRhbCA9IHY7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByb3RvLnNldFZlcnRpY2FsID0gZnVuY3Rpb24gKHY6IGNjdWkuTGF5b3V0LkxheW91dFZlcnRpY2FsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xheW91dFZlcnRpY2FsID0gdjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RvLnNldEdyaWQgPSBmdW5jdGlvbiAodjogY2N1aS5MYXlvdXQuTGF5b3V0R3JpZF9BeGlzRGlyZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xheW91dEdyaWRBeGlzID0gdjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RvLnNldENoaWxkcmVuTGF5b3V0RGlyZWN0aW9uID0gZnVuY3Rpb24gKHY6IGNjdWkuTGF5b3V0LkxheW91dERpcmVjdGlvbikge1xyXG4gICAgICAgICAgICB0aGlzLl9jaGlsZHJlbkxheW91dERpcmVjdGlvbiA9IHY7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByb3RvLmdldENoaWxkcmVuTGF5b3V0RGlyZWN0aW9uID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY2hpbGRyZW5MYXlvdXREaXJlY3Rpb247XHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgIHByb3RvLl9waW50ZXJlc3QgPSBmYWxzZTtcclxuICAgICAgICBwcm90by5fZ3JpZHJvdyA9IDA7XHJcbiAgICAgICAgcHJvdG8uX2dyaWRjb2x1bW4gPSAwO1xyXG4gICAgICAgIHByb3RvLl9wYWRkaW5nID0gbnVsbDtcclxuICAgICAgICBwcm90by5zZXRQYWRkaW5nID0gZnVuY3Rpb24gKGRhdGE6IGNjdWkuSUxheW91dFBhZGRpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5fcGFkZGluZyA9IGxvZGFzaC5leHRlbmQoe1xyXG4gICAgICAgICAgICAgICAgdG9wOiAwLFxyXG4gICAgICAgICAgICAgICAgYm90dG9tOiAwLFxyXG4gICAgICAgICAgICAgICAgbGVmdDogMCxcclxuICAgICAgICAgICAgICAgIHJpZ2h0OiAwLFxyXG4gICAgICAgICAgICAgICAgc3BhY2luZ1k6IDAsXHJcbiAgICAgICAgICAgICAgICBzcGFjaW5nWDogMFxyXG4gICAgICAgICAgICB9LCB0aGlzLl9wYWRkaW5nLCBkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJvdG8uc2V0R3JpZFJvdyA9IGZ1bmN0aW9uIChyb3c6IG51bWJlciA9IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fZ3JpZHJvdyA9IHJvdztcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJvdG8uZ2V0R3JpZFJvdyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dyaWRyb3c7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v54CR5biD5rWB5biD5bGAXHJcbiAgICAgICAgcHJvdG8uc2V0UGludGVyZXN0ID0gZnVuY3Rpb24gKGI6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9waW50ZXJlc3QgPSBiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcm90by5zZXRHcmlkQ29sdW1uID0gZnVuY3Rpb24gKGNvbHVtbjogbnVtYmVyID0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9ncmlkY29sdW1uID0gY29sdW1uO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcm90by5nZXRHcmlkQ29sdW1uID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZ3JpZGNvbHVtbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RvLmdldFBhZGRpbmcgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9wYWRkaW5nKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fcGFkZGluZztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHRvcDogMCxcclxuICAgICAgICAgICAgICAgIGJvdHRvbTogMCxcclxuICAgICAgICAgICAgICAgIGxlZnQ6IDAsXHJcbiAgICAgICAgICAgICAgICByaWdodDogMCxcclxuICAgICAgICAgICAgICAgIHNwYWNpbmdZOiAwLFxyXG4gICAgICAgICAgICAgICAgc3BhY2luZ1g6IDBcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RvLmRvQ2hpbGRyZW5MYXlvdXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9jaGlsZHJlbkxheW91dERpcmVjdGlvbiA9PSBjY3VpLkxheW91dC5MYXlvdXREaXJlY3Rpb24uSG9yaXpvbnRhbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZG9Ib3Jpem9udGFsQ2hpbGRyZW5MYXlvdXQoKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9jaGlsZHJlbkxheW91dERpcmVjdGlvbiA9PSBjY3VpLkxheW91dC5MYXlvdXREaXJlY3Rpb24uVmVydGljYWwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2RvVmVydGljYWxDaGlsZHJlbkxheW91dCgpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2NoaWxkcmVuTGF5b3V0RGlyZWN0aW9uID09IGNjdWkuTGF5b3V0LkxheW91dERpcmVjdGlvbi5HcmlkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kb0dyaWRDaGlsZHJlbkxheW91dCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByb3RvLl9kb0NoaWxkcmVuTGF5b3V0Q29udGVudFNpemUgPSBmdW5jdGlvbiAoYzogY2MuU2l6ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNldENvbnRlbnRTaXplKGMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcm90by5fZG9DaGlsZHJlbkNvbXBhcmVIZWlnaHQgPSBmdW5jdGlvbiAoYzogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIGlmIChjIDwgMCkgeyByZXR1cm4gMDsgfVxyXG4gICAgICAgICAgICByZXR1cm4gYztcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJvdG8uX2RvQ2hpbGRyZW5Db21wYXJlV2lkdGggPSBmdW5jdGlvbiAoYzogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIGlmIChjIDwgMCkgeyByZXR1cm4gMDsgfVxyXG4gICAgICAgICAgICByZXR1cm4gYztcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJvdG8uX2RvVmVydGljYWxDaGlsZHJlbkxheW91dCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHZlcnRpY2FsID0gdGhpcy5fbGF5b3V0VmVydGljYWw7XHJcbiAgICAgICAgICAgIHZhciBjaGlsZHJlbjogQXJyYXk8Y2MuTm9kZT4gPSB0aGlzLmdldENoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHZhciBvZmZzZXQgPSAwO1xyXG4gICAgICAgICAgICB2YXIgYWxsSGVpZ2h0ID0gMDtcclxuICAgICAgICAgICAgbGV0IHBhZGRpbmcgPSB0aGlzLmdldFBhZGRpbmcoKTtcclxuICAgICAgICAgICAgdmFyIHNwYWNpbmdZID0gcGFkZGluZy5zcGFjaW5nWTtcclxuICAgICAgICAgICAgdmFyIHRvcCA9IHBhZGRpbmcudG9wO1xyXG4gICAgICAgICAgICB2YXIgYm90dG9tID0gcGFkZGluZy5ib3R0b207XHJcbiAgICAgICAgICAgIG9mZnNldCArPSB0b3A7XHJcbiAgICAgICAgICAgIGZvciAodmFyIHggaW4gY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgICAgIHZhciBzdWJXaWRnZXQgPSBjaGlsZHJlblt4XTtcclxuICAgICAgICAgICAgICAgIGlmICghKHN1YldpZGdldC5pc1Zpc2libGUoKSkpIHsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgIGFsbEhlaWdodCArPSBjaGlsZHJlblt4XS5nZXRCb3VuZGluZ0JveCgpLmhlaWdodCArIHNwYWNpbmdZO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGFsbEhlaWdodCAtPSBzcGFjaW5nWTtcclxuICAgICAgICAgICAgYWxsSGVpZ2h0ICs9IHRvcCArIGJvdHRvbTtcclxuICAgICAgICAgICAgYWxsSGVpZ2h0ID0gdGhpcy5fZG9DaGlsZHJlbkNvbXBhcmVIZWlnaHQoYWxsSGVpZ2h0KTtcclxuICAgICAgICAgICAgdGhpcy5fZG9DaGlsZHJlbkxheW91dENvbnRlbnRTaXplKGNjLnNpemUodGhpcy5nZXRDb250ZW50U2l6ZSgpLndpZHRoLCBhbGxIZWlnaHQpKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIHggaW4gY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgICAgIHZhciBzdWJXaWRnZXQgPSBjaGlsZHJlblt4XTtcclxuICAgICAgICAgICAgICAgIGlmICghKHN1YldpZGdldC5pc1Zpc2libGUoKSkpIHsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgIHZhciBhcCA9IHN1YldpZGdldC5nZXRBbmNob3JQb2ludCgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGNzID0gc3ViV2lkZ2V0LmdldEJvdW5kaW5nQm94KCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgZmluYWxQb3NZID0gYXAueSAqIGNzLmhlaWdodDtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAodmVydGljYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIGNjdWkuTGF5b3V0LkxheW91dFZlcnRpY2FsLlRPUDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmluYWxQb3NZID0gYWxsSGVpZ2h0IC0gb2Zmc2V0IC0gKCgxLjAgLSBhcC55KSAqIGNzLmhlaWdodCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIGNjdWkuTGF5b3V0LkxheW91dFZlcnRpY2FsLkJPVFRPTTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmluYWxQb3NZICs9IG9mZnNldDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBvZmZzZXQgKz0gY3MuaGVpZ2h0ICsgc3BhY2luZ1k7XHJcbiAgICAgICAgICAgICAgICBzdWJXaWRnZXQuc2V0UG9zaXRpb25ZKGZpbmFsUG9zWSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RvLl9kb0hvcml6b250YWxDaGlsZHJlbkxheW91dCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBob3Jpem9udGFsID0gdGhpcy5fbGF5b3V0SG9yaXpvbnRhbDtcclxuICAgICAgICAgICAgdmFyIGNoaWxkcmVuOiBBcnJheTxjYy5Ob2RlPiA9IHRoaXMuZ2V0Q2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdmFyIG9mZnNldCA9IDA7XHJcbiAgICAgICAgICAgIHZhciBhbGx3aWR0aCA9IDA7XHJcbiAgICAgICAgICAgIGxldCBwYWRkaW5nID0gdGhpcy5nZXRQYWRkaW5nKCk7XHJcbiAgICAgICAgICAgIHZhciBzcGFjaW5nWCA9IHBhZGRpbmcuc3BhY2luZ1g7O1xyXG4gICAgICAgICAgICB2YXIgbGVmdCA9IHBhZGRpbmcubGVmdDs7XHJcbiAgICAgICAgICAgIHZhciByaWdodCA9IHBhZGRpbmcucmlnaHQ7O1xyXG4gICAgICAgICAgICBvZmZzZXQgKz0gbGVmdDtcclxuICAgICAgICAgICAgZm9yICh2YXIgeCBpbiBjaGlsZHJlbikge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN1YldpZGdldCA9IGNoaWxkcmVuW3hdO1xyXG4gICAgICAgICAgICAgICAgaWYgKCEoc3ViV2lkZ2V0LmlzVmlzaWJsZSgpKSkgeyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgYWxsd2lkdGggKz0gY2hpbGRyZW5beF0uZ2V0Qm91bmRpbmdCb3goKS53aWR0aCArIHNwYWNpbmdYO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGFsbHdpZHRoIC09IHNwYWNpbmdYO1xyXG4gICAgICAgICAgICBhbGx3aWR0aCArPSByaWdodCArIGxlZnQ7XHJcbiAgICAgICAgICAgIGFsbHdpZHRoID0gdGhpcy5fZG9DaGlsZHJlbkNvbXBhcmVXaWR0aChhbGx3aWR0aCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9kb0NoaWxkcmVuTGF5b3V0Q29udGVudFNpemUoY2Muc2l6ZShhbGx3aWR0aCwgdGhpcy5nZXRDb250ZW50U2l6ZSgpLmhlaWdodCkpO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgeCBpbiBjaGlsZHJlbikge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN1YldpZGdldCA9IGNoaWxkcmVuW3hdO1xyXG4gICAgICAgICAgICAgICAgaWYgKCEoc3ViV2lkZ2V0LmlzVmlzaWJsZSgpKSkgeyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgdmFyIGFwID0gc3ViV2lkZ2V0LmdldEFuY2hvclBvaW50KCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgY3MgPSBzdWJXaWRnZXQuZ2V0Qm91bmRpbmdCb3goKTtcclxuICAgICAgICAgICAgICAgIHZhciBmaW5hbFBvc1ggPSBhcC54ICogY3Mud2lkdGg7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGhvcml6b250YWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIGNjdWkuTGF5b3V0LkxheW91dEhvcml6b250YWwuTEVGVDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmluYWxQb3NYICs9IG9mZnNldDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBjY3VpLkxheW91dC5MYXlvdXRIb3Jpem9udGFsLlJJR0hUOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaW5hbFBvc1ggPSBhbGx3aWR0aCAtIG9mZnNldCAtICgoMS4wIC0gYXAueCkgKiBjcy53aWR0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgb2Zmc2V0ICs9IGNzLndpZHRoICsgc3BhY2luZ1g7XHJcbiAgICAgICAgICAgICAgICBzdWJXaWRnZXQuc2V0UG9zaXRpb25YKGZpbmFsUG9zWCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwcm90by5fZG9HcmlkQ2hpbGRyZW5MYXlvdXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fcGludGVyZXN0KSB7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBfZ3JpZCA9IHRoaXMuX2xheW91dEdyaWRBeGlzO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fZ3JpZHJvdyA9PSAwICYmIHRoaXMuX2dyaWRjb2x1bW4gPT0gMCkgeyByZXR1cm47IH1cclxuXHJcbiAgICAgICAgICAgIGxldCBtYXhSb3cgPSAwO1xyXG4gICAgICAgICAgICBsZXQgbWF4Q29sdW1uID0gMDtcclxuICAgICAgICAgICAgbGV0IGFsbGNlbGxDb3VudCA9IHRoaXMuZ2V0Q2hpbGRyZW4oKS5sZW5ndGg7XHJcbiAgICAgICAgICAgIGlmIChhbGxjZWxsQ291bnQgPCAxKSB7IHJldHVybjsgfVxyXG4gICAgICAgICAgICBpZiAoX2dyaWQgPT0gY2N1aS5MYXlvdXQuTGF5b3V0R3JpZF9BeGlzRGlyZWN0aW9uLkhPUklaT05UQUwpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9ncmlkY29sdW1uIDwgMSkgeyByZXR1cm47IH1cclxuICAgICAgICAgICAgICAgIC8v6K6h566X5pyA5aSn6KGM5pWwXHJcbiAgICAgICAgICAgICAgICBtYXhDb2x1bW4gPSB0aGlzLl9ncmlkY29sdW1uO1xyXG4gICAgICAgICAgICAgICAgbWF4Um93ID0gTWF0aC5jZWlsKGFsbGNlbGxDb3VudCAvIHRoaXMuX2dyaWRjb2x1bW4pO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKF9ncmlkID09IGNjdWkuTGF5b3V0LkxheW91dEdyaWRfQXhpc0RpcmVjdGlvbi5WRVJUSUNBTCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2dyaWRjb2x1bW4gPCAxKSB7IHJldHVybjsgfVxyXG4gICAgICAgICAgICAgICAgLy/orqHnrpfmnIDlpKfliJfmlbBcclxuICAgICAgICAgICAgICAgIG1heENvbHVtbiA9IE1hdGguY2VpbChhbGxjZWxsQ291bnQgLyB0aGlzLl9ncmlkY29sdW1uKTtcclxuICAgICAgICAgICAgICAgIG1heFJvdyA9IHRoaXMuX2dyaWRyb3c7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG1heENvbHVtbiA8IDEgJiYgbWF4Um93IDwgMSkgeyByZXR1cm47IH1cclxuXHJcbiAgICAgICAgICAgIHZhciBjaGlsZHJlbjogQXJyYXk8Y2MuTm9kZT4gPSBsb2Rhc2guY2xvbmUodGhpcy5nZXRDaGlsZHJlbigpKTtcclxuICAgICAgICAgICAgdmFyIG9mZnNldFggPSAwO1xyXG4gICAgICAgICAgICB2YXIgb2Zmc2V0WSA9IDA7XHJcbiAgICAgICAgICAgIGxldCBhbGx3aWR0aCA9IDA7XHJcbiAgICAgICAgICAgIGxldCBhbGxIZWlnaHQgPSAwO1xyXG4gICAgICAgICAgICBsZXQgcGFkZGluZyA9IHRoaXMuZ2V0UGFkZGluZygpO1xyXG4gICAgICAgICAgICB2YXIgc3BhY2luZ1ggPSBwYWRkaW5nLnNwYWNpbmdYO1xyXG4gICAgICAgICAgICB2YXIgc3BhY2luZ1kgPSBwYWRkaW5nLnNwYWNpbmdZO1xyXG4gICAgICAgICAgICB2YXIgbGVmdCA9IHBhZGRpbmcubGVmdDtcclxuICAgICAgICAgICAgdmFyIHJpZ2h0ID0gcGFkZGluZy5yaWdodDtcclxuICAgICAgICAgICAgdmFyIHRvcCA9IHBhZGRpbmcudG9wO1xyXG4gICAgICAgICAgICB2YXIgYm90dG9tID0gcGFkZGluZy5ib3R0b207XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGxldCBjdXJSb3cgPSAwO1xyXG4gICAgICAgICAgICBsZXQgb2ZmSCA9IDA7XHJcbiAgICAgICAgICAgIGxldCBvZmZXID0gMDtcclxuICAgICAgICAgICAgaWYgKF9ncmlkID09IGNjdWkuTGF5b3V0LkxheW91dEdyaWRfQXhpc0RpcmVjdGlvbi5IT1JJWk9OVEFMKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGkgPSAwO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgeCBpbiBjaGlsZHJlbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWJXaWRnZXQgPSBjaGlsZHJlblt4XTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmMgPSBjaGlsZHJlblt4XS5nZXRCb3VuZGluZ0JveCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIG9mZkggPSBNYXRoLm1heChvZmZILCByYy5oZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHN1YldpZGdldC5pc1Zpc2libGUoKSkpIHsgY29udGludWU7IH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgb2ZmVyArPSByYy53aWR0aCArIHNwYWNpbmdYO1xyXG4gICAgICAgICAgICAgICAgICAgIGFsbHdpZHRoID0gTWF0aC5tYXgoYWxsd2lkdGgsIG9mZlcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRpKysgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCh0aSUgbWF4Q29sdW1uKSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsbEhlaWdodCArPSBvZmZIICsgc3BhY2luZ1k7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZkggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvZmZXID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gYWxsSGVpZ2h0ICs9IG9mZkg7XHJcbiAgICAgICAgICAgICAgICBhbGx3aWR0aCAtPSBzcGFjaW5nWDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChfZ3JpZCA9PSBjY3VpLkxheW91dC5MYXlvdXRHcmlkX0F4aXNEaXJlY3Rpb24uVkVSVElDQUwpIHtcclxuICAgICAgICAgICAgICAgIGxldCB0aSA9IDA7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciB4IGluIGNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1YldpZGdldCA9IGNoaWxkcmVuW3hdO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByYyA9IGNoaWxkcmVuW3hdLmdldEJvdW5kaW5nQm94KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgb2ZmVyA9IE1hdGgubWF4KG9mZlcsIHJjLndpZHRoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIShzdWJXaWRnZXQuaXNWaXNpYmxlKCkpKSB7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgb2ZmSCArPSByYy5oZWlnaHQgKyBzcGFjaW5nWTtcclxuICAgICAgICAgICAgICAgICAgICBhbGxIZWlnaHQgPSBNYXRoLm1heChhbGxIZWlnaHQsIG9mZkgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aSsrICUgbWF4Um93ID09IG1heFJvdyAtIDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxsd2lkdGggKz0gb2ZmVyArIHNwYWNpbmdYO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvZmZXID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2ZmSCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYWxsd2lkdGggKz0gb2ZmVztcclxuICAgICAgICAgICAgICAgIGFsbEhlaWdodCAtPSBzcGFjaW5nWTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYWxsd2lkdGggPSB0aGlzLl9kb0NoaWxkcmVuQ29tcGFyZVdpZHRoKGFsbHdpZHRoICsgbGVmdCArIHJpZ2h0KTtcclxuICAgICAgICAgICAgYWxsSGVpZ2h0ID0gdGhpcy5fZG9DaGlsZHJlbkNvbXBhcmVIZWlnaHQoYWxsSGVpZ2h0ICsgdG9wICsgYm90dG9tKTtcclxuICAgICAgICAgICAgdGhpcy5fZG9DaGlsZHJlbkxheW91dENvbnRlbnRTaXplKGNjLnNpemUoYWxsd2lkdGgsIGFsbEhlaWdodCkpO1xyXG5cclxuICAgICAgICAgICAgLy8gYWxsd2lkdGggPSAwIDtcclxuICAgICAgICAgICAgLy8gYWxsSGVpZ2h0ID0gMDtcclxuICAgICAgICAgICAgdmFyIHZlcnRpY2FsID0gdGhpcy5fbGF5b3V0VmVydGljYWw7XHJcbiAgICAgICAgICAgIHZhciBob3Jpem9udGFsID0gdGhpcy5fbGF5b3V0SG9yaXpvbnRhbDtcclxuXHJcbiAgICAgICAgICAgIG9mZkggPSAwO1xyXG4gICAgICAgICAgICBvZmZXID0gMDtcclxuXHJcbiAgICAgICAgICAgIGlmIChfZ3JpZCA9PSBjY3VpLkxheW91dC5MYXlvdXRHcmlkX0F4aXNEaXJlY3Rpb24uSE9SSVpPTlRBTCkge1xyXG4gICAgICAgICAgICAgICAgb2Zmc2V0WCA9IG9mZlcgPSAoaG9yaXpvbnRhbCA9PSBjY3VpLkxheW91dC5MYXlvdXRIb3Jpem9udGFsLkxFRlQgPyBsZWZ0IDogcmlnaHQpO1xyXG4gICAgICAgICAgICAgICAgb2Zmc2V0WSA9ICh2ZXJ0aWNhbCA9PSBjY3VpLkxheW91dC5MYXlvdXRWZXJ0aWNhbC5UT1AgPyB0b3AgOiBib3R0b20pXHJcbiAgICAgICAgICAgICAgICBsZXQgdGkgPSAwO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgeCBpbiBjaGlsZHJlbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWJXaWRnZXQgPSBjaGlsZHJlblt4XTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIShzdWJXaWRnZXQuaXNWaXNpYmxlKCkpKSB7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJjID0gc3ViV2lkZ2V0LmdldEJvdW5kaW5nQm94KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFwID0gc3ViV2lkZ2V0LmdldEFuY2hvclBvaW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdmFyIGNzID0gc3ViV2lkZ2V0LmdldEJvdW5kaW5nQm94KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZpbmFsUG9zWCA9IGFwLnggKiByYy53aWR0aDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZmluYWxQb3NZID0gYXAueSAqIHJjLmhlaWdodDtcclxuICAgICAgICAgICAgICAgICAgICAvLyBmaW5hbFBvc1ggKz0gb2ZmVztcclxuICAgICAgICAgICAgICAgICAgICBpZiAodmVydGljYWwgPT0gY2N1aS5MYXlvdXQuTGF5b3V0VmVydGljYWwuVE9QKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbmFsUG9zWSA9IGFsbEhlaWdodCAtIG9mZnNldFkgLSAoKDEuMCAtIGFwLnkpICogcmMuaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaW5hbFBvc1kgPSBmaW5hbFBvc1kgKyBvZmZzZXRZO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGhvcml6b250YWwgPT0gY2N1aS5MYXlvdXQuTGF5b3V0SG9yaXpvbnRhbC5MRUZUKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbmFsUG9zWCA9IGZpbmFsUG9zWCArIG9mZnNldFg7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmluYWxQb3NYID0gYWxsd2lkdGggLSBvZmZzZXRYIC0gKCgxLjAgLSBhcC54KSAqIHJjLndpZHRoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHN1YldpZGdldC5zZXRQb3NpdGlvbihmaW5hbFBvc1gsIGZpbmFsUG9zWSk7XHJcbiAgICAgICAgICAgICAgICAgICAgb2ZmSCA9IE1hdGgubWF4KG9mZkgsIHJjLmhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICAgICAgb2ZmVyArPSByYy53aWR0aCArIHNwYWNpbmdYO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGZpbmFsUG9zWSA9IGFsbEhlaWdodCAtIG9mZnNldCAtICgoMS4wIC0gYXAueSkgKiBjcy5oZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHN1YldpZGdldC5zZXRQb3NpdGlvblkoZmluYWxQb3NZICtvZmZIICk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRpKysgJSBtYXhDb2x1bW4gPT0gbWF4Q29sdW1uIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhbGx3aWR0aCA9IE1hdGgubWF4KGFsbHdpZHRoLCBvZmZXKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0WSArPSBvZmZIICsgc3BhY2luZ1k7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZkggPSAwOztcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2ZmVyA9IChob3Jpem9udGFsID09IGNjdWkuTGF5b3V0LkxheW91dEhvcml6b250YWwuTEVGVCA/IGxlZnQgOiByaWdodCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldFggPSBvZmZXO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKF9ncmlkID09IGNjdWkuTGF5b3V0LkxheW91dEdyaWRfQXhpc0RpcmVjdGlvbi5WRVJUSUNBTCkge1xyXG4gICAgICAgICAgICAgICAgb2Zmc2V0WCA9IChob3Jpem9udGFsID09IGNjdWkuTGF5b3V0LkxheW91dEhvcml6b250YWwuTEVGVCA/IGxlZnQgOiByaWdodCk7XHJcbiAgICAgICAgICAgICAgICBvZmZzZXRZID0gb2ZmSCA9ICh2ZXJ0aWNhbCA9PSBjY3VpLkxheW91dC5MYXlvdXRWZXJ0aWNhbC5UT1AgPyB0b3AgOiBib3R0b20pXHJcbiAgICAgICAgICAgICAgICBsZXQgdGkgPSAwO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgeCBpbiBjaGlsZHJlbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWJXaWRnZXQgPSBjaGlsZHJlblt4XTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIShzdWJXaWRnZXQuaXNWaXNpYmxlKCkpKSB7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJjID0gY2hpbGRyZW5beF0uZ2V0Qm91bmRpbmdCb3goKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYXAgPSBzdWJXaWRnZXQuZ2V0QW5jaG9yUG9pbnQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZpbmFsUG9zWCA9IGFwLnggKiByYy53aWR0aDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZmluYWxQb3NZID0gYXAueSAqIHJjLmhlaWdodDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZlcnRpY2FsID09IGNjdWkuTGF5b3V0LkxheW91dFZlcnRpY2FsLlRPUCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaW5hbFBvc1kgPSBhbGxIZWlnaHQgLSBvZmZzZXRZIC0gKCgxLjAgLSBhcC55KSAqIHJjLmhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmluYWxQb3NZID0gZmluYWxQb3NZICsgb2Zmc2V0WTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChob3Jpem9udGFsID09IGNjdWkuTGF5b3V0LkxheW91dEhvcml6b250YWwuTEVGVCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaW5hbFBvc1ggPSBmaW5hbFBvc1ggKyBvZmZzZXRYO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbmFsUG9zWCA9IGFsbHdpZHRoIC0gb2Zmc2V0WCAtICgoMS4wIC0gYXAueCkgKiByYy53aWR0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBzdWJXaWRnZXQuc2V0UG9zaXRpb24oZmluYWxQb3NYLCBmaW5hbFBvc1kpO1xyXG4gICAgICAgICAgICAgICAgICAgIG9mZlcgPSBNYXRoLm1heChvZmZXLCByYy53aWR0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgb2ZmSCArPSByYy5oZWlnaHQgKyBzcGFjaW5nWTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRpKysgJSBtYXhSb3cgPT0gbWF4Um93IC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXRYICs9IG9mZlcgKyBzcGFjaW5nWDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2ZmVyA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZkggPSAodmVydGljYWwgPT0gY2N1aS5MYXlvdXQuTGF5b3V0VmVydGljYWwuVE9QID8gdG9wIDogYm90dG9tKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0WSA9IG9mZkg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy8gZm9yICh2YXIgeCBpbiBjaGlsZHJlbikge1xyXG4gICAgICAgICAgICAvLyAgICAgdmFyIHN1YldpZGdldCA9IGNoaWxkcmVuW3hdO1xyXG4gICAgICAgICAgICAvLyAgICAgaWYgKCEoc3ViV2lkZ2V0LmlzVmlzaWJsZSgpKSkgeyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAvLyAgICAgYWxsd2lkdGggKz0gY2hpbGRyZW5beF0uZ2V0Qm91bmRpbmdCb3goKS53aWR0aCArIHNwYWNpbmdYO1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIC8vIGFsbHdpZHRoIC09IHNwYWNpbmdYO1xyXG4gICAgICAgICAgICAvLyBhbGx3aWR0aCArPSByaWdodCArIGxlZnQ7XHJcbiAgICAgICAgICAgIC8vIGFsbHdpZHRoID0gdGhpcy5fZG9DaGlsZHJlbkNvbXBhcmVXaWR0aChhbGx3aWR0aCk7XHJcblxyXG4gICAgICAgICAgICAvLyB0aGlzLl9kb0NoaWxkcmVuTGF5b3V0Q29udGVudFNpemUoY2Muc2l6ZShhbGx3aWR0aCwgdGhpcy5nZXRDb250ZW50U2l6ZSgpLmhlaWdodCkpO1xyXG5cclxuICAgICAgICAgICAgLy8gZm9yICh2YXIgeCBpbiBjaGlsZHJlbikge1xyXG4gICAgICAgICAgICAvLyAgICAgdmFyIHN1YldpZGdldCA9IGNoaWxkcmVuW3hdO1xyXG4gICAgICAgICAgICAvLyAgICAgaWYgKCEoc3ViV2lkZ2V0LmlzVmlzaWJsZSgpKSkgeyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAvLyAgICAgdmFyIGFwID0gc3ViV2lkZ2V0LmdldEFuY2hvclBvaW50KCk7XHJcbiAgICAgICAgICAgIC8vICAgICB2YXIgY3MgPSBzdWJXaWRnZXQuZ2V0Qm91bmRpbmdCb3goKTtcclxuICAgICAgICAgICAgLy8gICAgIHZhciBmaW5hbFBvc1ggPSBhcC54ICogY3Mud2lkdGg7XHJcbiAgICAgICAgICAgIC8vICAgICBzd2l0Y2ggKGhvcml6b250YWwpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICBjYXNlIGNjdWkuTGF5b3V0LkxheW91dEhvcml6b250YWwuTEVGVDpcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgZmluYWxQb3NYICs9IG9mZnNldDtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgY2FzZSBjY3VpLkxheW91dC5MYXlvdXRIb3Jpem9udGFsLlJJR0hUOlxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICBmaW5hbFBvc1ggPSBhbGx3aWR0aCAtIG9mZnNldCAtICgoMS4wIC0gYXAueCkgKiBjcy53aWR0aCk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICAgb2Zmc2V0ICs9IGNzLndpZHRoICsgc3BhY2luZ1g7XHJcbiAgICAgICAgICAgIC8vICAgICBzdWJXaWRnZXQuc2V0UG9zaXRpb25YKGZpbmFsUG9zWCk7XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gY2NfU2Nyb2xsVmlld19leHRlbmQoKSB7XHJcbiAgICAgICAgbGV0IHByb3RvOiBhbnkgPSBjY3VpLlNjcm9sbFZpZXcucHJvdG90eXBlO1xyXG4gICAgICAgIHByb3RvLl9kb0NoaWxkcmVuTGF5b3V0Q29udGVudFNpemUgPSBmdW5jdGlvbiAoYzogY2MuU2l6ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNldElubmVyQ29udGFpbmVyU2l6ZShjKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJvdG8uX2RvQ2hpbGRyZW5Db21wYXJlSGVpZ2h0ID0gZnVuY3Rpb24gKGM6IG51bWJlcikge1xyXG4gICAgICAgICAgICBpZiAoYyA8IDApIHsgYyA9IDA7IH1cclxuICAgICAgICAgICAgcmV0dXJuIE1hdGgubWF4KGMsIHRoaXMuZ2V0Q29udGVudFNpemUoKS5oZWlnaHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdG8uX2RvQ2hpbGRyZW5Db21wYXJlV2lkdGggPSBmdW5jdGlvbiAoYzogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIGlmIChjIDwgMCkgeyBjID0gMDsgfVxyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5tYXgoYywgdGhpcy5nZXRDb250ZW50U2l6ZSgpLndpZHRoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RvLmdldElubmVyT2ZmU2V0VG9wID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IDxjY3VpLlNjcm9sbFZpZXc+dGhpcztcclxuICAgICAgICAgICAgbGV0IHBJbm5lciA9IHNlbGYuZ2V0SW5uZXJDb250YWluZXIoKTtcclxuICAgICAgICAgICAgdmFyIG1pblkgPSBzZWxmLmdldExheW91dFNpemUoKS5oZWlnaHQgLSBwSW5uZXIuaGVpZ2h0O1xyXG4gICAgICAgICAgICByZXR1cm4gKHBJbm5lci5nZXRQb3NpdGlvbigpLnkgLSBtaW5ZKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RvLmdldElubmVyT2ZmU2V0TGVmdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSA8Y2N1aS5TY3JvbGxWaWV3PnRoaXM7XHJcbiAgICAgICAgICAgIGxldCBwSW5uZXIgPSBzZWxmLmdldElubmVyQ29udGFpbmVyKCk7XHJcbiAgICAgICAgICAgIHZhciBtaW5ZID0gc2VsZi5nZXRMYXlvdXRTaXplKCkud2lkdGggLSBwSW5uZXIud2lkdGg7XHJcbiAgICAgICAgICAgIHJldHVybiAocElubmVyLmdldFBvc2l0aW9uKCkueCAtIG1pblkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgZnVuY3Rpb24gY2NfQ2hlY2tCb3hfZXh0ZW5kKCkge1xyXG4gICAgICAgIGxldCBwcm90bzogYW55ID0gY2N1aS5DaGVja0JveC5wcm90b3R5cGU7XHJcbiAgICAgICAgcHJvdG8uc2V0UmFkaW9TZWxlY3RlZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXNbJ3JhZGlvR3JvdXAnXSkge1xyXG4gICAgICAgICAgICAgICAgLy8gbGV0IGUgPSBrYWF5b3UuRXZlbnQuY3JlYXRlKGthYXlvdS5Ub3VjaEV2ZW50LCBrYWF5b3UuVG91Y2hFdmVudC5Ub3VjaENhbmNlKVxyXG4gICAgICAgICAgICAgICAgLy8gZS5jdXJyZW50VGFyZ2V0ID0gZS50YXJnZXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgdGhpc1sncmFkaW9Hcm91cCddWydzZXRTZWxlY3RlZCddKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgLy8gRXZlbnQucmVjeWNsZShlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBvblNlbGVjdChlOiBrYWF5b3UuQ2hlY2tFdmVudCkge1xyXG4gICAgICAgICAgICAvLyAgICAgbGV0IHRhcmdldDpjY3VpLkNoZWNrQm94ID0gZS50YXJnZXQ7XHJcbiAgICAgICAgICAgIC8vICAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgY2N1aS5DaGVja0JveCkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIGxldCBiYyA9ICF0YXJnZXQuaXNTZWxlY3RlZCgpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIGZvcih2YXIgeCBpbiB0aGlzLl9yYWRpb3Mpe1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICB0aGlzLl9yYWRpb3NbeF0uc2V0U2VsZWN0ZWRTdGF0ZSh0YXJnZXQgPT09IHRoaXMuX3JhZGlvc1t4XSk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gICAgICAgICBpZihiYyAhPSB0YXJnZXQuaXNTZWxlY3RlZCgpKXtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgbGV0IGUgPSBrYWF5b3UuRXZlbnQuY3JlYXRlKGthYXlvdS5DaGVja0V2ZW50LCAgIGthYXlvdS5SYWRpb0V2ZW50LlNFTEVDVEVEKVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICBlLmN1cnJlbnRUYXJnZXQgPSBlLnRhcmdldCA9IHRhcmdldDtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgdGFyZ2V0LmRpc3BhdGNoKGUpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2NfUmljaHRleHRfZXh0ZW5kKCkge1xyXG4gICAgICAgIGxldCBwcm90byA9IGNjdWkuUmljaFRleHQucHJvdG90eXBlO1xyXG4gICAgICAgIHByb3RvLnByb3BlcnR5ID0geyBmb250VHlwZTogXCJBcmlhbFwiLCBmb250U2l6ZTogMjAgfTtcclxuICAgICAgICAvLyBfcmljaEVsZW1lbnRzIOWcqOWOn+eUn+iuvuWkh+S4iuayoeaciei/meS4quWxnuaApyAg6ZyA6KaB6Ieq5bex566h55CGXHJcbiAgICAgICAgcHJvdG8ucmljaEVsZW1lbnRzID0gW107XHJcblxyXG4gICAgICAgIHByb3RvLmluaXRQcm9wZXJ0eSA9IGZ1bmN0aW9uIChkYXRhOiB7IGZvbnRUeXBlPzogc3RyaW5nLCBmb250U2l6ZTogbnVtYmVyIH0pIHtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSA8Y2N1aS5SaWNoVGV4dD50aGlzO1xyXG4gICAgICAgICAgICBzZWxmLnJpY2hFbGVtZW50cyA9IFtdO1xyXG4gICAgICAgICAgICBzZWxmW1wibGFzdFdpZHRoXCJdID0gMDtcclxuICAgICAgICAgICAgZm9yIChsZXQgeCBpbiBkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBpZihzZWxmLnByb3BlcnR5W3hdKXtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnByb3BlcnR5W3hdID0gZGF0YVt4XTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdG8uaW5pdFdpdGhEZW1vVGV4dCA9IGZ1bmN0aW9uICh0ZXh0OiBjY3VpLlRleHQpIHtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSA8Y2N1aS5SaWNoVGV4dD50aGlzO1xyXG4gICAgICAgICAgICBzZWxmLmluaXRQcm9wZXJ0eSh7IGZvbnRTaXplOiB0ZXh0LmZvbnRTaXplIH0pO1xyXG4gICAgICAgICAgICBzZWxmLmlnbm9yZUNvbnRlbnRBZGFwdFdpdGhTaXplKHRydWUpO1xyXG4gICAgICAgICAgICB0ZXh0LmdldFBhcmVudCgpLmFkZENoaWxkKHNlbGYpO1xyXG4gICAgICAgICAgICBzZWxmLnNldFBvc2l0aW9uKHRleHQuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgICAgIHNlbGYuc2V0QW5jaG9yUG9pbnQodGV4dC5nZXRBbmNob3JQb2ludCgpKTtcclxuICAgICAgICAgICAgdGV4dC5zZXRWaXNpYmxlKGZhbHNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RvLnNldFN0cmluZyA9IGZ1bmN0aW9uIChjb250ZW50QXJyYXk6IEFycmF5PHsgY29sb3I6IGNjLkNvbG9yLCBjb250ZW50OiBzdHJpbmcgfT4pIHtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSA8Y2N1aS5SaWNoVGV4dD50aGlzO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGYucmljaEVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5yaWNoRWxlbWVudHNbaV0pIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnJlbW92ZUVsZW1lbnQoc2VsZi5yaWNoRWxlbWVudHNbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYucmljaEVsZW1lbnRzLnNoaWZ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaS0tO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29udGVudEFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmljaEVsZW1lbnQgPSBuZXcgY2N1aS5SaWNoRWxlbWVudFRleHQoMSwgY29udGVudEFycmF5W2ldLmNvbG9yLCAyNTUsIGNvbnRlbnRBcnJheVtpXS5jb250ZW50LCBzZWxmLnByb3BlcnR5LmZvbnRUeXBlLCBzZWxmLnByb3BlcnR5LmZvbnRTaXplKTtcclxuICAgICAgICAgICAgICAgIHNlbGYucHVzaEJhY2tFbGVtZW50KHJpY2hFbGVtZW50KTtcclxuICAgICAgICAgICAgICAgIHNlbGYucmljaEVsZW1lbnRzLnB1c2gocmljaEVsZW1lbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiDlnKhmb3JtYXRSZW5kZXJlcnPlh73mlbDph4zpnaLmnInkuIDkuKrlj5jph49sb2NSZW5kZXJlcnNDb250YWluZXLvvIzku5bkv53lrZjkuoblr4zmlofmnKznmoTlhYPntKDvvIzkvYbmmK/lpoLmnpzmlLnlj5jlr4zmlofmnKznmoTplJrngrnvvIxcclxuICAgICAgICAgICAgICogbG9jUmVuZGVyZXJzQ29udGFpbmVy55qE6ZSa54K55Lmf5Lya6KKr5pS55Y+Y77yM5L2G5piv5LiN566h6ZSa54K55aaC5L2V5Y+Y5YyW77yMbG9jUmVuZGVyZXJzQ29udGFpbmVy55qE5Z2Q5qCH6YO95piv5a+M5paH5pys55qE5Lit5b+D5L2N572u77yM5Luj56CB5aaC5LiLXHJcbiAgICAgICAgICAgICAqIGxvY1JlbmRlcmVyc0NvbnRhaW5lci5zZXRQb3NpdGlvbih0aGlzLl9jb250ZW50U2l6ZS53aWR0aCAqIDAuNSwgdGhpcy5fY29udGVudFNpemUuaGVpZ2h0ICogMC41KTtcclxuICAgICAgICAgICAgICog5Lmf5bCx5piv6K+05aaC5p6c5a+M5paH5pys55qE6ZSa54K55LiN5piv77yIMC41LDAuNe+8ieeahOivne+8jOWwseS8muWBj+enu+S6hu+8jOi/meS4quWPquacieWcqOe8luWGmeS7o+eggeeahOaXtuWAmeazqOaEj+S6hu+8jOWmguaenOmUmueCueS4jeaYr+S4reW/g++8jOWImeimgemHjeaWsOiuvue9ruS9jee9rlxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgaWYgKHNlbGYuX3RleHRIb3Jpem9udGFsQWxpZ25tZW50ID09PSBjYy5URVhUX0FMSUdOTUVOVF9MRUZUKSB7Ly/liJvlu7rpu5jorqTlt6blr7npvZBcclxuICAgICAgICAgICAgICAgIGxldCBkaWZ4ID0gMDtcclxuICAgICAgICAgICAgICAgIGlmIChzZWxmLmFuY2hvclggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBkaWZ4ID0gKHNlbGYud2lkdGggLSBzZWxmW1wibGFzdFdpZHRoXCJdKSAvIDI7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNlbGYuYW5jaG9yWCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpZnggPSAtKHNlbGYud2lkdGggLSBzZWxmW1wibGFzdFdpZHRoXCJdKSAvIDI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzZWxmLnNldFBvc2l0aW9uWChzZWxmLmdldFBvc2l0aW9uWCgpIC0gZGlmeCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2VsZltcImxhc3RXaWR0aFwiXSA9IHNlbGYud2lkdGg7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgZnVuY3Rpb24gZXhwZW5kX3NldF9rYUV2ZW50TGlzdGVuZXIocCwgYikge1xyXG4gICAgICAgIGlmICghcC5fX2thRXZlbnRMaXN0ZW5lcilcclxuICAgICAgICAgICAgcC5fX2thRXZlbnRMaXN0ZW5lciA9IG5ldyBrYWF5b3UuRXZlbnREaXNwYXRjaGVyKHApO1xyXG4gICAgICAgIGlmIChiICYmIHAucGFyZW50KSB7XHJcbiAgICAgICAgICAgIGV4cGVuZF9zZXRfa2FFdmVudExpc3RlbmVyKHAucGFyZW50LCBiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZXhwZW5kX2V2ZW50X2FkZExpc3RlbmVyKC4uLmFyZ3M6IGFueVtdKSB7XHJcbiAgICAgICAgaWYgKGFyZ3MubGVuZ3RoIDwgMSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGV4cGVuZF9zZXRfa2FFdmVudExpc3RlbmVyKHRoaXMsIHRydWUpO1xyXG4gICAgICAgIHZhciBtZ3NuYW1lID0gYXJnc1swXTtcclxuICAgICAgICB2YXIgdG91Y2hlYWRzID0gW2thYXlvdS5Ub3VjaEV2ZW50LlRvdWNoU3RhcnQsIGthYXlvdS5Ub3VjaEV2ZW50LlRvdWNoTW92ZSwga2FheW91LlRvdWNoRXZlbnQuVG91Y2hFbmQsIGthYXlvdS5Ub3VjaEV2ZW50LlRvdWNoQ2FuY2VdO1xyXG4gICAgICAgIHZhciBjaGVja2hlYWRzID0gW2thYXlvdS5DaGVja0V2ZW50LlNFTEVDVEVELCBrYWF5b3UuQ2hlY2tFdmVudC5VTlNFTEVDVEVEXTtcclxuICAgICAgICBpZiAodG91Y2hlYWRzLmluZGV4T2YobWdzbmFtZSkgPiAtMSkge1xyXG5cclxuICAgICAgICAgICAgaWYgKCh0aGlzIGluc3RhbmNlb2YgY2N1aS5XaWRnZXQpICYmICF0aGlzWydpc1RvdWNoRXZlbnRJbnN0YWxsJ10pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkVG91Y2hFdmVudExpc3RlbmVyKGZ1bmN0aW9uICh0YWdlciwgdHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09IGNjdWkuV2lkZ2V0LlRPVUNIX0VOREVEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8venl4MjAwNjE3XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v5oyJ6ZKu5pi+56S65pe254K55Ye777yM5oyJ6ZKu6ZqQ6JeP5ZCO5oqs6LW377yM5pS55Li66Kem5Y+RVG91Y2hDYW5jZeS6i+S7tlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGFnZXIuaXNWaXNpYmxlKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBlID0ga2FheW91LkV2ZW50LmNyZWF0ZShrYWF5b3UuVG91Y2hFdmVudCwga2FheW91LlRvdWNoRXZlbnQuVG91Y2hFbmQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5jdXJyZW50VGFyZ2V0ID0gZS50YXJnZXQgPSB0YWdlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNwYXRjaChlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGUgPSBrYWF5b3UuRXZlbnQuY3JlYXRlKGthYXlvdS5Ub3VjaEV2ZW50LCBrYWF5b3UuVG91Y2hFdmVudC5Ub3VjaENhbmNlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5jdXJyZW50VGFyZ2V0ID0gZS50YXJnZXQgPSB0YWdlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNwYXRjaChlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlID09IGNjdWkuV2lkZ2V0LlRPVUNIX01PVkVEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGthYXlvdS5Ub3VjaEV2ZW50LlRvdWNoTW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGUgPSBrYWF5b3UuRXZlbnQuY3JlYXRlKGthYXlvdS5Ub3VjaEV2ZW50LCBrYWF5b3UuVG91Y2hFdmVudC5Ub3VjaE1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGUuY3VycmVudFRhcmdldCA9IGUudGFyZ2V0ID0gdGFnZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNwYXRjaChlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlID09IGNjdWkuV2lkZ2V0LlRPVUNIX0JFR0FOKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGthYXlvdS5Ub3VjaEV2ZW50LlRvdWNoU3RhcnQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBlID0ga2FheW91LkV2ZW50LmNyZWF0ZShrYWF5b3UuVG91Y2hFdmVudCwga2FheW91LlRvdWNoRXZlbnQuVG91Y2hTdGFydClcclxuICAgICAgICAgICAgICAgICAgICAgICAgZS5jdXJyZW50VGFyZ2V0ID0gZS50YXJnZXQgPSB0YWdlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRpc3BhdGNoKGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT0gY2N1aS5XaWRnZXQuVE9VQ0hfQ0FOQ0VMRUQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coa2FheW91LlRvdWNoRXZlbnQuVG91Y2hDYW5jZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGUgPSBrYWF5b3UuRXZlbnQuY3JlYXRlKGthYXlvdS5Ub3VjaEV2ZW50LCBrYWF5b3UuVG91Y2hFdmVudC5Ub3VjaENhbmNlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlLmN1cnJlbnRUYXJnZXQgPSBlLnRhcmdldCA9IHRhZ2VyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2goZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpc1snaXNUb3VjaEV2ZW50SW5zdGFsbCddID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoY2hlY2toZWFkcy5pbmRleE9mKG1nc25hbWUpID4gLTEpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICgodGhpcyBpbnN0YW5jZW9mIGNjdWkuQ2hlY2tCb3gpICYmICF0aGlzWydpc0NoZWNrRXZlbnRJbnN0YWxsJ10pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihmdW5jdGlvbiAodGFnZXIsIHR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZSA9IGthYXlvdS5FdmVudC5jcmVhdGUoa2FheW91LkNoZWNrRXZlbnQsIHR5cGUgPT0gMCA/IGthYXlvdS5DaGVja0V2ZW50LlNFTEVDVEVEIDoga2FheW91LkNoZWNrRXZlbnQuVU5TRUxFQ1RFRClcclxuICAgICAgICAgICAgICAgICAgICBlLmN1cnJlbnRUYXJnZXQgPSBlLnRhcmdldCA9IHRhZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2goZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXNbJ2lzQ2hlY2tFdmVudEluc3RhbGwnXSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9fa2FFdmVudExpc3RlbmVyLm9uLmFwcGx5KHRoaXMuX19rYUV2ZW50TGlzdGVuZXIsIGFyZ3VtZW50cyk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBleHBlbmRfZXZlbnRfcmVtb3ZlTGlzdGVuZXIoKSB7XHJcbiAgICAgICAgZXhwZW5kX3NldF9rYUV2ZW50TGlzdGVuZXIodGhpcywgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5fX2thRXZlbnRMaXN0ZW5lci5vZmYuYXBwbHkodGhpcy5fX2thRXZlbnRMaXN0ZW5lciwgYXJndW1lbnRzKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGV4cGVuZF9ldmVudF9kaXNwYXRjaCgpIHtcclxuICAgICAgICBleHBlbmRfc2V0X2thRXZlbnRMaXN0ZW5lcih0aGlzLCBmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5fX2thRXZlbnRMaXN0ZW5lci5kaXNwYXRjaC5hcHBseSh0aGlzLl9fa2FFdmVudExpc3RlbmVyLCBhcmd1bWVudHMpO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gZXhwZW5kX2V2ZW50X2VtaXQoKSB7XHJcbiAgICAgICAgZXhwZW5kX3NldF9rYUV2ZW50TGlzdGVuZXIodGhpcywgZmFsc2UpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9fa2FFdmVudExpc3RlbmVyLmVtaXQuYXBwbHkodGhpcy5fX2thRXZlbnRMaXN0ZW5lciwgYXJndW1lbnRzKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGV4cGVuZF9ldmVudF9oYXNMaXN0ZW5lcigpIHtcclxuICAgICAgICBleHBlbmRfc2V0X2thRXZlbnRMaXN0ZW5lcih0aGlzLCB0cnVlKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5fX2thRXZlbnRMaXN0ZW5lci5oYXMuYXBwbHkodGhpcy5fX2thRXZlbnRMaXN0ZW5lciwgYXJndW1lbnRzKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBleHBlbmRfZXZlbnRfb2ZmQnl0YXJnZXJMaXN0ZW5lcigpIHtcclxuICAgICAgICBleHBlbmRfc2V0X2thRXZlbnRMaXN0ZW5lcih0aGlzLCB0cnVlKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5fX2thRXZlbnRMaXN0ZW5lci5vZmZCeXRhcmdlci5hcHBseSh0aGlzLl9fa2FFdmVudExpc3RlbmVyLCBhcmd1bWVudHMpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gZ2V0Q29udHJvbGxlcihuYW1lOiBzdHJpbmcgPSBcImRlZmF1bHRcIik6IGthYXlvdS5FdmVudERpc3BhdGNoZXIge1xyXG4gICAgICAgIGlmICghbmFtZSB8fCBuYW1lLmxlbmd0aCA8IDEpIHtcclxuICAgICAgICAgICAgbmFtZSA9ICdkZWZhdWx0JztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIENvbnRyb2xsZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q29udHJvbGxlcihuYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gdW5pbnN0YWxsQ29udHJvbGxlcihuYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoIW5hbWUgfHwgbmFtZS5sZW5ndGggPCAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIENvbnRyb2xsZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkudW5pbnN0YWxsKG5hbWUpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gZW1pdChjbmFtZTogc3RyaW5nLCBoZWFkOiBzdHJpbmcsIGRhdGEgPSBudWxsLCBhY2s6IGJvb2xlYW4gPSBmYWxzZSwgY2FsbGJhY2s/LCB0YXJnZXQ/KSB7XHJcbiAgICAgICAgdmFyIGU6IGthYXlvdS5DdXN0b21FdmVudCA9IGthYXlvdS5FdmVudC5jcmVhdGUoa2FheW91LkN1c3RvbUV2ZW50LCBoZWFkKTtcclxuICAgICAgICBpZiAoYWNrKSB7XHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGFja2RhdGEgPSB7fTtcclxuICAgICAgICAgICAgICAgIGFja2RhdGFbJ0BvcmlnaW5hbCddID0gZGF0YTtcclxuICAgICAgICAgICAgICAgIGFja2RhdGFbJ0BhY2snXSA9IGZ1bmN0aW9uIChyZXN1bGV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRhcmdldCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjay5hcHBseSh0YXJnZXQsIFtyZXN1bGV0XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2socmVzdWxldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZS5kYXRhID0gYWNrZGF0YTtcclxuICAgICAgICAgICAgICAgIC8vIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAga2FheW91LmdldENvbnRyb2xsZXIoY25hbWUpLmVtaXQoZSk7XHJcbiAgICAgICAgICAgICAgICAvLyB9LCAwKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2xlLCByZWpjdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhY2tkYXRhID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgYWNrZGF0YVsnQG9yaWdpbmFsJ10gPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIGFja2RhdGFbJ0BhY2snXSA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sZShkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGUuZGF0YSA9IGFja2RhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAga2FheW91LmdldENvbnRyb2xsZXIoY25hbWUpLmVtaXQoZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gfSwgMCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBlLmRhdGEgPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgLy8gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBrYWF5b3UuZ2V0Q29udHJvbGxlcihjbmFtZSkuZW1pdChlKTtcclxuICAgICAgICAgICAgICAgIC8vIH0sIDApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBrYWF5b3UuZ2V0Q29udHJvbGxlcihjbmFtZSkuZW1pdChlKTtcclxuICAgICAgICAgICAgICAgIC8vIH0sIDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn1cclxuXHJcblxyXG5uYW1lc3BhY2UganNiIHtcclxuXHJcbiAgICBleHBvcnQgZW51bSBFdmVudENvZGUge1xyXG4gICAgICAgIEVSUk9SX05PX0xPQ0FMX01BTklGRVNULFxyXG4gICAgICAgIEVSUk9SX0RPV05MT0FEX01BTklGRVNULFxyXG4gICAgICAgIEVSUk9SX1BBUlNFX01BTklGRVNULFxyXG4gICAgICAgIE5FV19WRVJTSU9OX0ZPVU5ELFxyXG4gICAgICAgIEFMUkVBRFlfVVBfVE9fREFURSxcclxuICAgICAgICBVUERBVEVfUFJPR1JFU1NJT04sXHJcbiAgICAgICAgQVNTRVRfVVBEQVRFRCxcclxuICAgICAgICBFUlJPUl9VUERBVElORyxcclxuICAgICAgICBVUERBVEVfRklOSVNIRUQsXHJcbiAgICAgICAgVVBEQVRFX0ZBSUxFRCxcclxuICAgICAgICBFUlJPUl9ERUNPTVBSRVNTXHJcbiAgICB9O1xyXG5cclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJkZWNvcmF0b3IudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiZW5jcnlwLnRzXCIgLz5cclxubmFtZXNwYWNlIGthYXlvdSB7XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIEthX01TR19SRVMge1xyXG4gICAgICAgIGhlYWQ6IHN0cmluZyxcclxuICAgICAgICBlcnJjb2RlOiBudW1iZXIsXHJcbiAgICAgICAgZGF0YT86IHN0cmluZyB8IGFueSxcclxuICAgICAgICBlcnJtc2c/OiBzdHJpbmdcclxuICAgICAgICBtc2dzaWduOiB7XHJcbiAgICAgICAgICAgIHRpbWU6IG51bWJlcixcclxuICAgICAgICAgICAgZW5jb2RlOiBudW1iZXJcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEh0dHAge1xyXG5cclxuICAgICAgICBzdGF0aWMgR2V0UmVxdWVzdChzZWFyY2gpOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9IHtcclxuICAgICAgICAgICAgdmFyIHVybCA9IHNlYXJjaDsgLy/ojrflj5Z1cmzkuK1cIj9cIuespuWQjueahOWtl+S4siAgIFxyXG4gICAgICAgICAgICB2YXIgdGhlUmVxdWVzdCA9IHt9O1xyXG4gICAgICAgICAgICBpZiAodXJsLmluZGV4T2YoXCI/XCIpICE9IC0xKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RyID0gdXJsLnN1YnN0cigxKTtcclxuICAgICAgICAgICAgICAgIGxldCBzdHJzID0gc3RyLnNwbGl0KFwiJlwiKTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3Rycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoZVJlcXVlc3Rbc3Ryc1tpXS5zcGxpdChcIj1cIilbMF1dID0gdW5lc2NhcGUoc3Ryc1tpXS5zcGxpdChcIj1cIilbMV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aGVSZXF1ZXN0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIEV4dGVuZFVybFBhcmFtcyh1cmw6IHN0cmluZywgZGF0YTogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSA9IG51bGwpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICghZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVybDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIWxvZGFzaC5pc09iamVjdChkYXRhKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVybDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgb3ZlclBhcmFtcyA9IHt9O1xyXG4gICAgICAgICAgICBpZiAodXJsLmluZGV4T2YoXCI/XCIpICE9IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdCA9IHVybC5zcGxpdChcIj9cIik7XHJcbiAgICAgICAgICAgICAgICBsZXQgaG9zdCA9IHRbMF07XHJcbiAgICAgICAgICAgICAgICBsZXQgc2VhcmNoID0gXCI/XCIgKyB0WzFdO1xyXG4gICAgICAgICAgICAgICAgbGV0IHBhcmFtcyA9IEh0dHAuR2V0UmVxdWVzdChzZWFyY2gpO1xyXG4gICAgICAgICAgICAgICAgb3ZlclBhcmFtcyA9IGxvZGFzaC5leHRlbmQocGFyYW1zLCBkYXRhKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHVybCArPSBcIj9cIjtcclxuICAgICAgICAgICAgICAgIG92ZXJQYXJhbXMgPSBsb2Rhc2guZXh0ZW5kKHt9LCBkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgeCBpbiBkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICB1cmwgKz0geCArIFwiPVwiICsgZGF0YVt4XSArIFwiJlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHVybCA9IGVuY29kZVVSSSh1cmwuc3Vic3RyKDAsIHVybC5sZW5ndGggLSAxKSk7XHJcbiAgICAgICAgICAgIHJldHVybiB1cmw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgR0VUKHVybDogc3RyaW5nLCBnZXRQYXJhbXM6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gPSBudWxsLCByZXZlcnNpYmlsaXR5OiBib29sZWFuID0gZmFsc2UsIHNob3dFcnJvcjogYm9vbGVhbiA9IHRydWUpIHtcclxuICAgICAgICAgICAgbGV0IF91cmwgPSBIdHRwLkV4dGVuZFVybFBhcmFtcyh1cmwsIGdldFBhcmFtcyk7XHJcbiAgICAgICAgICAgIGxldCBfZXJyY291bnQgPSAwO1xyXG4gICAgICAgICAgICBrYWF5b3UuYWRkTG9nKFwiR0VUOlwiICsgX3VybCk7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZXJyRnVuYyA9IGZ1bmN0aW9uICh0eXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAga2FheW91LmFkZExvZyhcIkdFVCBFUlI6XCIgKyB0eXBlLmNvZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGthYXlvdS5lbWl0KFwiY29tbW9uXCIsIFwidWk6OkRlYnVnUGFuZWw6OlNob3dcIiwgeyBtc2c6IHR5cGUuY29kZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICBrYWF5b3UuZW1pdChcImNvbW1vblwiLCBcInVpOjpMb2FkaW5nOjpIaWRlXCIsIHsgZm9yY2U6IHRydWUgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/lj5HpgIHmlq3nvZHmj5DnpLpcclxuICAgICAgICAgICAgICAgICAgICBsZXQgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1zZzogXCLmgqjnmoTnvZHnu5zlvILluLjvvIzplJnor6/noIHvvJpcIiArIHR5cGUuY29kZSArIFwi44CC6K+35qOA5p+l572R57uc5oiW6IGU57O75a6i5pyN44CCXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1Nob3c6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBidG5zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCLnoa7lrppcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9yZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGthYXlvdS5lbWl0KFwiY29tbW9uXCIsIFwidWk6OkxvYWRpbmc6OlNob3dcIiwgeyBtc2c6IFwi5L+h5oGv5Yqg6L295LitXCIsIHRpbWU6IDAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF91cmwgPSBIdHRwLmRvQ2hhbmdlQ2hhbmwoX3VybCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNjLnN5cy5pc05hdGl2ZSAmJiBrYWF5b3UgJiYga2FheW91LlBsYXRmb3JtTWdyKSBrYWF5b3UuUGxhdGZvcm1NZ3IuZ2V0SW5zdGFuY2UoKS5zeXMuUG9zdEJ1Z2x5KFwiaHR0cCBHRVQgZXJyIDpcIiArIGthYXlvdS5nZXRMb2JieVZlcnNpb24oKSB8fCBcIlwiLCB0eXBlIHx8IFwiXCIsIHVybCB8fCBcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbmRlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAyKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yVHlwZTogJ2dyZWVuJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXZlcnNpYmlsaXR5ID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuYnRucy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwi5Y+W5raIXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3JldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrYWF5b3UuZW1pdChcImNvbW1vblwiLCBcInVpOjpMb2FkaW5nOjpIaWRlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3JUeXBlOiAnYmx1ZSdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKF9lcnJjb3VudCA+PSA1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMgPSBIdHRwLkdldFJlc3RhcnRPcHRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgX2VycmNvdW50Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNob3dFcnJvcikga2FheW91LmVtaXQoXCJjb21tb25cIiwgXCJ1aTo6RGlhbG9nOjpTaG93XCIsIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2VuZGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbHcyMDA2MTDmjaLkuobmtYvor5Ux57q/77yM6LaF5pe25pe26Ze05pS55Li6MTXnp5JcclxuICAgICAgICAgICAgICAgICAgICAgICAgeGhyLnRpbWVvdXQgPSAxNTAwMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PSA0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHhoci5zdGF0dXMgPj0gMjAwICYmIHhoci5zdGF0dXMgPCA0MDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3BvbnNlID0geGhyLnJlc3BvbnNlVGV4dDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9sdzE4MTEyM+WOu+aOiWJvbeWktFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UuY2hhckNvZGVBdCgwKSA9PSA2NTI3OSkgcmVzcG9uc2UgPSByZXNwb25zZS5zdWJzdHIoMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjYy5zeXMuaXNOYXRpdmUgJiYga2FheW91ICYmIGthYXlvdS5QbGF0Zm9ybU1ncikga2FheW91LlBsYXRmb3JtTWdyLmdldEluc3RhbmNlKCkuc3lzLlBvc3RCdWdseShcImh0dHAgR0VUIGVyciA6XCIgKyBrYWF5b3UuZ2V0TG9iYnlWZXJzaW9uKCkgfHwgXCJcIiwgXCJuZXQgc3RhdHVz77yaXCIgKyB4aHIuc3RhdHVzLCBfdXJsIHx8IFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrYWF5b3UuZW1pdChcImNvbW1vblwiLCBcInVpOjpEZWJ1Z1BhbmVsOjpTaG93XCIsIHsgbXNnOiBcIumUmeivr+egge+8mlwiICsgeGhyLnN0YXR1cyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyRnVuYyh7IGNvZGU6IHhoci5zdGF0dXMgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB4aHIub25lcnJvciA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyRnVuYyh7IGNvZGU6IFwidW5rbm93blwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHhoci5vbnRpbWVvdXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJGdW5jKHsgY29kZTogXCJ0aW1lb3V0XCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgeGhyLm9wZW4oXCJHRVRcIiwgX3VybCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHhoci5zZW5kKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXJyRnVuYyh7IGNvZGU6IGVyciB9KTtcclxuICAgICAgICAgICAgICAgICAgICAvL2thYXlvdS5lbWl0KFwibG9iYnlcIiwgXCJ1aTo6TG9naW5TY2VuZTo6U2hvd1N3aXRjaExpbmVcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGthYXlvdVsnUGxhdGZvcm1NZ3InXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChrYWF5b3VbJ1BsYXRmb3JtTWdyJ10uZ2V0SW5zdGFuY2UoKS5zeXMuR2V0TmV0SW5mbygpLnR5cGUgPT0gXCJub25lXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/lj5HpgIHmlq3nvZHmj5DnpLpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyRnVuYyh7IGNvZGU6IFwiZGlzY29ubmVjdFwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc2VuZGVyKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIEdldEZpbGVTaXplKHVybDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGxldCBmaWxlU2l6ZSA9IDA7XHJcbiAgICAgICAgICAgIGthYXlvdS5hZGRMb2coXCJIZWFkOlwiICsgdXJsKTtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICAgICAgICAgIHZhciBlcnJGdW5jID0gZnVuY3Rpb24gKHR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBrYWF5b3UuYWRkTG9nKFwiR0VUIEVSUjpcIiArIHR5cGUuY29kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAga2FheW91LmVtaXQoXCJjb21tb25cIiwgXCJ1aTo6RGVidWdQYW5lbDo6U2hvd1wiLCB7IG1zZzogdHlwZS5jb2RlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGthYXlvdS5lbWl0KFwiY29tbW9uXCIsIFwidWk6OkxvYWRpbmc6OkhpZGVcIiwgeyBmb3JjZTogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICAgICAgICAgIHhoci5vcGVuKCdIRUFEJywgdXJsLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09IDQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHhoci5zdGF0dXMgPT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlU2l6ZSA9IHBhcnNlSW50KHhoci5nZXRSZXNwb25zZUhlYWRlcignQ29udGVudC1MZW5ndGgnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGZpbGVTaXplKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghIXhoci5zdGF0dXNUZXh0ICYmIGZpbGVTaXplID09IDApIGVyckZ1bmMoeyBjb2RlOiBcIkVycm9yOlwiICsgeGhyLnN0YXR1cyArIFwiKFwiICsgeGhyLnN0YXR1c1RleHQgKyBcIilcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB4aHIub25lcnJvciA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVyckZ1bmMoeyBjb2RlOiBcImVycm9yXCIgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB4aHIub250aW1lb3V0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVyckZ1bmMoeyBjb2RlOiBcInRpbWVvdXRcIiB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHhoci5zZW5kKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIGNoZWNrVXJsKG1ldGhvZCA9IFwiZ2V0XCIsIHVybCwgY2FsbCkge1xyXG4gICAgICAgICAgICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0O1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgeGhyLm9wZW4obWV0aG9kLCB1cmwsIHRydWUpXHJcbiAgICAgICAgICAgICAgICB4aHIuc2VuZCgpO1xyXG4gICAgICAgICAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbCh4aHIuc3RhdHVzIDw9IDQwMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgeGhyLmFib3J0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsKGZhbHNlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgZG9DaGFuZ2VDaGFubCh1cmw6IHN0cmluZykge1xyXG4gICAgICAgICAgICBpZiAodXJsLmluZGV4T2YoXCIyMDMuMTA3LjQwLjExNzo4MDA0XCIpID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdXJsID0gdXJsLnJlcGxhY2UoXCIyMDMuMTA3LjQwLjExNzo4MDA0XCIsIFwiYXBpeXhkcS5rYWF5b3UuY29tXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbW1vbiAmJiBjb21tb24ubW9kICYmIGNvbW1vbi5tb2QuQ29uZmlnICYmIGNvbW1vbi5tb2QuQ29uZmlnLkNvbmZpZ1VybCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbW1vbi5tb2QuQ29uZmlnLkNvbmZpZ1VybCA9IFwiaHR0cDovL2FwaXl4ZHEua2FheW91LmNvbVwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHVybC5pbmRleE9mKFwiYXBpeXhkcS5rYWF5b3UuY29tXCIpID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdXJsID0gdXJsLnJlcGxhY2UoXCJhcGl5eGRxLmthYXlvdS5jb21cIiwgXCIyMDMuMTA3LjQwLjExNzo4MDA0XCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbW1vbiAmJiBjb21tb24ubW9kICYmIGNvbW1vbi5tb2QuQ29uZmlnICYmIGNvbW1vbi5tb2QuQ29uZmlnLkNvbmZpZ1VybCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbW1vbi5tb2QuQ29uZmlnLkNvbmZpZ1VybCA9IFwiaHR0cDovLzIwMy4xMDcuNDAuMTE3OjgwMDRcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdXJsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIEdldFJlc3RhcnRPcHRpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBtc2c6IFwi6K6/6Zeu6LaF5pe25qyh5pWw5aSq5aSa77yM5bCG5bCd6K+V6YeN5ZCv5ri45oiP5oGi5aSN77yBXCIsXHJcbiAgICAgICAgICAgICAgICBjbG9zZToge1xyXG4gICAgICAgICAgICAgICAgICAgIGlzU2hvdzogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGJ0bnM6IFtcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwi56Gu5a6aXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9yZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrYWF5b3UuZW1pdChcImNvbW1vblwiLCBcInVpOjpMb2FkaW5nOjpTaG93XCIsIHsgbXNnOiBcIumHjeaWsOWQr+WKqOS4rVwiLCB0aW1lOiAwIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdpbmRvdyAmJiB3aW5kb3cubG9jYXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLmdhbWUucmVzdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LmJpbmQodGhpcyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yVHlwZTogJ2dyZWVuJ1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCLlj5bmtohcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvclR5cGU6ICdibHVlJ1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gb3B0aW9ucztcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBzdGF0aWMgUE9TVCh1cmw6IHN0cmluZywgcG9zdFBhcmFtczogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSB8IHN0cmluZywgZ2V0UGFyYW1zOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9ID0gbnVsbCwgY29udGVudFR5cGU6IHN0cmluZyA9IFwiZm9ybVwiLCByZXZlcnNpYmlsaXR5OiBib29sZWFuID0gZmFsc2UpIHtcclxuICAgICAgICAgICAgLy9qc29uICAgYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PVVURi04XHJcbiAgICAgICAgICAgIC8vZm9ybSAgIGFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZSA9IGNvbnRlbnRUeXBlIHx8IFwiZm9ybVwiO1xyXG4gICAgICAgICAgICBjb250ZW50VHlwZSA9IGNvbnRlbnRUeXBlLnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgICAgICAgIGxldCBUeXBlU3RycyA9IHtcclxuICAgICAgICAgICAgICAgIEpTT046IFwiYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PVVURi04XCIsXHJcbiAgICAgICAgICAgICAgICBGT1JNOiBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFUeXBlU3Ryc1tjb250ZW50VHlwZV0pIHtcclxuICAgICAgICAgICAgICAgIHRocm93IFwiUE9TVOaaguaXtuS4jeaUr+aMgeivpeexu+Wei1wiICsgY29udGVudFR5cGU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBfdXJsID0gSHR0cC5FeHRlbmRVcmxQYXJhbXModXJsLCBnZXRQYXJhbXMpO1xyXG4gICAgICAgICAgICBsZXQgX2VycmNvdW50ID0gMDtcclxuICAgICAgICAgICAgbGV0IHBhcmFtcyA9IFwiXCI7XHJcblxyXG4gICAgICAgICAgICBpZiAobG9kYXNoLmlzU3RyaW5nKHBvc3RQYXJhbXMpKSB7XHJcbiAgICAgICAgICAgICAgICBwYXJhbXMgPSA8c3RyaW5nPnBvc3RQYXJhbXM7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29udGVudFR5cGUgPT0gXCJGT1JNXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciB4IGluIDx7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9PnBvc3RQYXJhbXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zICs9IHggKyBcIj1cIiArIHBvc3RQYXJhbXNbeF0gKyBcIiZcIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zID0gcGFyYW1zLnN1YnN0cigwLCBwYXJhbXMubGVuZ3RoIC0gMSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvbnRlbnRUeXBlID09IFwiSlNPTlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zID0gSlNPTi5zdHJpbmdpZnkocG9zdFBhcmFtcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAga2FheW91LmFkZExvZyhcIlBPU1Q6XCIgKyBfdXJsKTtcclxuICAgICAgICAgICAga2FheW91LmFkZExvZyhcIlBPU1Q6XCIgKyBwYXJhbXMpXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGVyckZ1bmMgPSBmdW5jdGlvbiAodHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGthYXlvdS5hZGRMb2coXCJQT1NUIEVSUjpcIiArIHR5cGUuY29kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAga2FheW91LmVtaXQoXCJjb21tb25cIiwgXCJ1aTo6TG9hZGluZzo6SGlkZVwiLCB7IGZvcmNlOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5Y+R6YCB5pat572R5o+Q56S6XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtc2c6IFwi5oKo55qE572R57uc5byC5bi477yM6K+36YeN6K+V5oiW5qOA5p+l572R57uc77yBXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1Nob3c6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBidG5zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCLnoa7lrppcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2FheW91LmVtaXQoXCJjb21tb25cIiwgXCJ1aTo6TG9hZGluZzo6U2hvd1wiLCB7IG1zZzogXCLkv6Hmga/liqDovb3kuK1cIiwgdGltZTogMCB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3VybCA9IEh0dHAuZG9DaGFuZ2VDaGFubChfdXJsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2Muc3lzLmlzTmF0aXZlICYmIGthYXlvdSAmJiBrYWF5b3UuUGxhdGZvcm1NZ3IpIGthYXlvdS5QbGF0Zm9ybU1nci5nZXRJbnN0YW5jZSgpLnN5cy5Qb3N0QnVnbHkoXCJodHRwIFBPU1QgZXJyIDpcIiArIGthYXlvdS5nZXRMb2JieVZlcnNpb24oKSB8fCBcIlwiLCB0eXBlIHx8IFwiXCIsIHVybCB8fCBcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbmRlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAyKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yVHlwZTogJ2dyZWVuJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9sdzIwMDkxOOi/memHjOWPquiDveaUvuS4gOS4quaMiemSru+8jOaYr+WQpuacieWPlua2iOaMiemSrumAmui/h3JldmVyc2liaWxpdHnmjqfliLZcclxuICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAocmV2ZXJzaWJpbGl0eSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmJ0bnMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIuWPlua2iFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2FheW91LmVtaXQoXCJjb21tb25cIiwgXCJ1aTo6TG9hZGluZzo6SGlkZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yVHlwZTogJ2JsdWUnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChfZXJyY291bnQgPj0gNSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zID0gSHR0cC5HZXRSZXN0YXJ0T3B0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF9lcnJjb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgICAgIGthYXlvdS5lbWl0KFwiY29tbW9uXCIsIFwidWk6OkRpYWxvZzo6U2hvd1wiLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhciBzZW5kZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB4aHIub3BlbihcIlBPU1RcIiwgX3VybCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFR5cGVTdHJzW2NvbnRlbnRUeXBlXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8veGhyLnNldFJlcXVlc3RIZWFkZXIoXCJBY2NlcHQtRW5jb2RpbmdcIixcImd6aXAsIGRlZmxhdGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbHcyMDEyMTXlm6DkuLrnu4/luLjmnInkurrlnKjnmbvlvZXnlYzpnaLkuI3mmL7npLrnmbvlvZXmjInpkq7vvIzmiYDku6XmlLnlm54xNeenklxyXG4gICAgICAgICAgICAgICAgICAgICAgICB4aHIudGltZW91dCA9IDE1MDAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09IDQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoeGhyLnN0YXR1cyA+PSAyMDAgJiYgeGhyLnN0YXR1cyA8IDQwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVzcG9uc2UgPSB4aHIucmVzcG9uc2VUZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UuY2hhckNvZGVBdCgwKSA9PSA2NTI3OSkgcmVzcG9uc2UgPSByZXNwb25zZS5zdWJzdHIoMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjYy5zeXMuaXNOYXRpdmUgJiYga2FheW91ICYmIGthYXlvdS5QbGF0Zm9ybU1ncikga2FheW91LlBsYXRmb3JtTWdyLmdldEluc3RhbmNlKCkuc3lzLlBvc3RCdWdseShcImh0dHAgR0VUIGVyciA6XCIgKyBrYWF5b3UuZ2V0TG9iYnlWZXJzaW9uKCkgfHwgXCJcIiwgXCJuZXQgc3RhdHVz77yaXCIgKyB4aHIuc3RhdHVzLCBfdXJsIHx8IFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJGdW5jKHsgY29kZTogeGhyLnN0YXR1cyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2FheW91LmVtaXQoXCJjb21tb25cIiwgXCJ1aTo6RGVidWdQYW5lbDo6U2hvd1wiLCB7IG1zZzogXCLplJnor6/noIHvvJpcIiArIHhoci5zdGF0dXMgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGthYXlvdS5lbWl0KFwiY29tbW9uXCIsIFwidWk6OkxvYWRpbmc6OkhpZGVcIiwgeyBmb3JjZTogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHhoci5vbmVycm9yID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrYWF5b3UuZW1pdChcImxvYmJ5XCIsIFwidWk6OkxvZ2luU2NlbmU6OlNob3dTd2l0Y2hMaW5lXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyRnVuYyh7IGNvZGU6IFwidW5rbm93blwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbHcxODExMjnorr7nva4z56eS6ZKf5rKh5pyJ6L+U5Zue5bCx566X6LaF5pe277yM5L6L5aaC6K6/6ZeucGhw6YWN572u6LaF5pe2XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbHcyMDEyMTXlm57ljp/miJAzMOenklxyXG4gICAgICAgICAgICAgICAgICAgICAgICB4aHIub250aW1lb3V0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2FheW91LmVtaXQoXCJjb21tb25cIiwgXCJ1aTo6RGVidWdQYW5lbDo6U2hvd1wiLCB7IG1zZzogXCLotoXml7bvvIFcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVyckZ1bmMoeyBjb2RlOiBcInRpbWVvdXRcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB4aHIuc2VuZChwYXJhbXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJGdW5jKHsgY29kZTogZXJyIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2x3MjAwMzEw5pi+56S65YiH57q/5oyJ6ZKuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGthYXlvdS5lbWl0KFwibG9iYnlcIiwgXCJ1aTo6TG9naW5TY2VuZTo6U2hvd1N3aXRjaExpbmVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChrYWF5b3VbJ1BsYXRmb3JtTWdyJ10pIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdHlwZSA9IGthYXlvdVsnUGxhdGZvcm1NZ3InXS5nZXRJbnN0YW5jZSgpLnN5cy5HZXROZXRJbmZvKCkudHlwZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PSBcIm5vbmVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+WPkemAgeaWree9keaPkOekulxyXG4gICAgICAgICAgICAgICAgICAgICAgICBrYWF5b3UuZW1pdChcImNvbW1vblwiLCBcInVpOjpEZWJ1Z1BhbmVsOjpTaG93XCIsIHsgbXNnOiBcIue9kee7nOS4reaWrVwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJGdW5jKHsgY29kZTogXCJkaXNjb25uZWN0XCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzZW5kZXIoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgcGFyc2VSZXN1bHQoZGF0YSkge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlczogS2FfTVNHX1JFUyA9IEpTT04ucGFyc2UoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJlcyAhPSAnb2JqZWN0JykgeyB0aHJvdyBFcnJvcignbWVzc2FnZSBpcyBub3Qgb2JqZWN0Jyk7IH0gLy8gXCJvYmplY3RcIiAgKVxyXG4gICAgICAgICAgICAgICAgbGV0IG1zZ2hlYWQgPSByZXMuaGVhZDtcclxuICAgICAgICAgICAgICAgIGlmICghbXNnaGVhZCkgeyB0aHJvdyBFcnJvcignbXNnaGVhZCBpcyB1bmRlZmluZScpOyB9XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzLm1zZ3NpZ24uZW5jb2RlID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXMuZGF0YSA9IGthYXlvdS5BRVMuZGVjcnlwdChyZXMuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzLmVycmNvZGUgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMuZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXMuZGF0YSA9IEpTT04ucGFyc2UocmVzLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiByZXM7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiZXh0ZW5kLnRzXCIgLz5cclxubmFtZXNwYWNlIGthYXlvdSB7XHJcbiAgICBjb25zdCB7IGNjY2xhc3MgfSA9IGthYXlvdS5fZGVjb3JhdG9yO1xyXG4gICAgQGNjY2xhc3NcclxuICAgIGV4cG9ydCBjbGFzcyBEaXJlY3RTY2VuZSBleHRlbmRzIGNjLlNjZW5lIHtcclxuICAgICAgICBjdG9yKCkge1xyXG4gICAgICAgICAgICBzdXBlci5jdG9yKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBNYWluU2NlbmUgZXh0ZW5kcyBEaXJlY3RTY2VuZSB7XHJcblxyXG4gICAgICAgIHB1YmxpYyBfc2NlbmVMYXllcjogY2MuTGF5ZXIgPSBudWxsO1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgICAgICB0aGlzLl9zY2VuZUxheWVyID0gbmV3IGNjLkxheWVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3NjZW5lTGF5ZXIuc2V0Q29udGVudFNpemUoY2Mud2luU2l6ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuX3NjZW5lTGF5ZXIuc2V0QW5jaG9yUG9pbnQoMCwgMCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3NjZW5lTGF5ZXIuc2V0UG9zaXRpb24oMCwgMCk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5fc2NlbmVMYXllciwgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFic3RyYWN0IGluaXRVSSguLi5hcmdzKTtcclxuICAgICAgICBwdWJsaWMgZ2V0U2NlbmVMYXllcigpOiBjYy5MYXllciB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zY2VuZUxheWVyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG5cclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJleHRlbmQudHNcIiAvPlxyXG5uYW1lc3BhY2Uga2FheW91IHtcclxuICAgIGV4cG9ydCBmdW5jdGlvbiBhZGRMb2cobXNnOiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhtc2cpO1xyXG4gICAgICAgIGxldCB0ID0gbmV3IERhdGUoRGF0ZS5ub3coKSkuZm9ybWF0KFwieXl5eS1NTS1kZCBoaDptbTpzc1wiKTtcclxuICAgICAgICBpZiAoIWNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBmaWxlID0ga2FheW91LmdldExvZ0ZpbGUoKTtcclxuICAgICAgICBsZXQgcyA9IGthYXlvdS5nZXRMb2coKTtcclxuICAgICAgICBzICs9ICh0ICsgXCI6XCIgKyBtc2cpICsgXCJcXHJcXG5cIjtcclxuICAgICAgICBpZiAocy5sZW5ndGggPiAxMDI0MCkge1xyXG4gICAgICAgICAgICBzID0gcy5zdWJzdHIocy5sZW5ndGggLSAxMDI0LCAxMDI0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAga2FheW91LkRhdGFTZXQuc2V0KFwiQ2hlY2tMb2dcIixzKTtcclxuICAgICAgICBqc2IuZmlsZVV0aWxzLndyaXRlU3RyaW5nVG9GaWxlKHMsIGZpbGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gRGlyUGF0aCDop6PljovnmoTmlofku7blpLlcclxuICAgICAqIEBwYXJhbSBzcmNQYXRoIOebruagh+i1hOa6kOi3r+W+hCAg6L6T5YWl5pys5ZywYXBr5Lit55qE5paH5Lu2XHJcbiAgICAgKiBAcGFyYW0gZGVjUGF0aCBjb3B5IOi+k+WHuueahOi3r+W+hFxyXG4gICAgICogQHBhcmFtIGNhbGwg5Zue6LCDXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGNvcHlBbmRVbnppcExvY2FsUGFja2FnZShEaXJQYXRoOiBzdHJpbmcsIHNyY1BhdGg6IHN0cmluZywgZGVjUGF0aDogc3RyaW5nLCBjYWxsOiBGdW5jdGlvbiwgcHJvZ3Jlc3NDYWxsPzogRnVuY3Rpb24pIHtcclxuICAgICAgICAvL+WIm+W7uuino+WOi+ebruW9lVxyXG4gICAgICAgIGpzYi5maWxlVXRpbHMuY3JlYXRlRGlyZWN0b3J5KERpclBhdGgpO1xyXG4gICAgICAgIGlmICgha2FheW91X2pzYi5GaWxlLmNvcHlGaWxlKHNyY1BhdGgsIGRlY1BhdGgpKSB7IHJldHVybiBjYWxsKFwi5aSN5Yi2emlw5YyF5aSx6LSlXCIpOyB9XHJcbiAgICAgICAgaWYgKCFqc2IuZmlsZVV0aWxzLmlzRmlsZUV4aXN0KGRlY1BhdGgpKSB7IHJldHVybiBjYWxsKFwi5aSN5Yi2emlw5YyF5aSx6LSlXCIpOyB9XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJkZWNTaXplOlwiICsganNiLmZpbGVVdGlscy5nZXRGaWxlU2l6ZShkZWNQYXRoKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLkuIvovb3ljovnvKnljIXlrozmiJBcIik7XHJcbiAgICAgICAgbGV0IGt6aXAgPSBuZXcga2FheW91X2pzYi5GaWxlLlpJUCgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi5byA5aeL5byC5q2l6Kej5Y6LXCIpO1xyXG4gICAgICAgIHByb2dyZXNzQ2FsbCAmJiBwcm9ncmVzc0NhbGwoMiwgMCwgMCwgMCk7XHJcbiAgICAgICAga3ppcC5vbkVycm9yID0gZnVuY3Rpb24gKGVycnN0cikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuino+WOi+Wksei0pVwiLCBlcnJzdHIpO1xyXG4gICAgICAgICAgICByZXR1cm4gY2FsbChcIuino+WOi3ppcOWMheWksei0pVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAga3ppcC5vblByb2dyZXNzID0gZnVuY3Rpb24gKGN1cnBybzogbnVtYmVyLCB0b2F0bDogbnVtYmVyLCBjdXI6IG51bWJlcikge1xyXG4gICAgICAgICAgICAvL+Wbnuiwg+i/m+W6plxyXG4gICAgICAgICAgICBwcm9ncmVzc0NhbGwgJiYgcHJvZ3Jlc3NDYWxsKDMsIGN1cnBybywgdG9hdGwsIGN1cik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGt6aXAub25TdWNjZXNzID0gZnVuY3Rpb24gKGN1cnBybzogbnVtYmVyLCB0b2F0bDogbnVtYmVyLCBjdXI6IG51bWJlcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuino+WOi+aIkOWKn1wiKTtcclxuICAgICAgICAgICAgcHJvZ3Jlc3NDYWxsKDQsIDEwMCwgMCwgMCk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy/liKDpmaTmjonkuLTml7Z6aXDljIVcclxuICAgICAgICAgICAgICAgIGpzYi5maWxlVXRpbHMucmVtb3ZlRmlsZShkZWNQYXRoKTtcclxuICAgICAgICAgICAgICAgIGNhbGwoKTtcclxuICAgICAgICAgICAgfSwgMTAwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAga3ppcC51bnppcChkZWNQYXRoLCB0cnVlKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIuW8gOWni+WQjOatpeino+WOi1wiKTtcclxuICAgICAgICAvLyBpZiAoIWt6aXAudW56aXAoZGVjUGF0aCkpIHsgcmV0dXJuIGZhbHNlOyB9XHJcbiAgICAgICAgLy8ganNiLmZpbGVVdGlscy5yZW1vdmVGaWxlKGRlY1BhdGgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6I635Y+W57yT5a2Y55uu5b2VXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gZ2V0SW1hZ2VDYWNoZVBhdGgoKSB7XHJcbiAgICAgICAgcmV0dXJuIGpzYi5maWxlVXRpbHMuZ2V0V3JpdGFibGVQYXRoKCkgKyBcImNhY2hlLWltYWdlcy9cIjtcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gZ2V0TG9nKCkge1xyXG4gICAgICAgIGlmICghY2Muc3lzLmlzTmF0aXZlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcz1rYWF5b3UuRGF0YVNldC5nZXQoXCJDaGVja0xvZ1wiKTtcclxuICAgICAgICBpZighIXMpe1xyXG4gICAgICAgICAgICByZXR1cm4gcztcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGZpbGUgPSBrYWF5b3UuZ2V0TG9nRmlsZSgpO1xyXG4gICAgICAgIGlmIChqc2IuZmlsZVV0aWxzLmlzRmlsZUV4aXN0KGZpbGUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBqc2IuZmlsZVV0aWxzLmdldFN0cmluZ0Zyb21GaWxlKGZpbGUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gZ2V0TG9nRmlsZSgpIHtcclxuICAgICAgICBpZiAoIWNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGxvZ1BhdGggPSBrYWF5b3UuZ2V0TG9nUGF0aCgpO1xyXG4gICAgICAgIGlmICghanNiLmZpbGVVdGlscy5pc0RpcmVjdG9yeUV4aXN0KGxvZ1BhdGgpKSB7XHJcbiAgICAgICAgICAgIGpzYi5maWxlVXRpbHMuY3JlYXRlRGlyZWN0b3J5KGxvZ1BhdGgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbG9nUGF0aCArIFwibG9nLnR4dFwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6I635Y+W5pel5b+X55uu5b2VXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gZ2V0TG9nUGF0aCgpIHtcclxuICAgICAgICBpZiAoIWNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGpzYi5maWxlVXRpbHMuZ2V0V3JpdGFibGVQYXRoKCkgKyBcImxvZ3MvXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ojrflj5botYTmupDnm67lvZVcclxuICAgIGV4cG9ydCBmdW5jdGlvbiBnZXRSZW1vdGVQYXRoKCkge1xyXG4gICAgICAgIHJldHVybiBqc2IuZmlsZVV0aWxzLmdldFdyaXRhYmxlUGF0aCgpICsgXCJyZW1vdGUtYXNzZXRzL1wiO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6I635Y+W5aSn5Y6F54Ot5pu054mI5pysXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gZ2V0TG9iYnlWZXJzaW9uKCkge1xyXG4gICAgICAgIGlmICghY2Muc3lzLmlzTmF0aXZlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBBcHAudmVyc2lvbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGdldExvY2FsVmVyc2lvbihrYWF5b3UuZ2V0UmVtb3RlUGF0aCgpKTtcclxuICAgIH1cclxuICAgIC8v6I635Y+W5ri45oiP54mI5pysXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gZ2V0U3ViR2FtZVZlcnNpb24ocGFrZWdlTmFtZSkge1xyXG4gICAgICAgIGlmKGNjLnN5cy5pc05hdGl2ZSl7XHJcbiAgICAgICAgICAgIGxldCBnYW1lUGF0aCA9IGthYXlvdS5nZXRSZW1vdGVQYXRoKCkgKyBwYWtlZ2VOYW1lICsgXCIvXCI7XHJcbiAgICAgICAgICAgIHJldHVybiBnZXRMb2NhbFZlcnNpb24oZ2FtZVBhdGgpO1xyXG4gICAgICAgIH1lbHNlIHJldHVybiBcIndlYlwiO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldExvY2FsVmVyc2lvbihnYW1lUGF0aDogc3RyaW5nKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKCFjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIndlYlwiO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFqc2IuZmlsZVV0aWxzLmlzRGlyZWN0b3J5RXhpc3QoZ2FtZVBhdGgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgXCJcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChnYW1lUGF0aFtnYW1lUGF0aC5sZW5ndGggLSAxXSAhPT0gJy8nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2FtZVBhdGggKz0gJy8nO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IHByb2plY3RQYXRoID0gZ2FtZVBhdGggKyBcInByb2plY3QubWFuaWZlc3RcIjtcclxuICAgICAgICAgICAgICAgIGlmIChqc2IuZmlsZVV0aWxzLmlzRmlsZUV4aXN0KHByb2plY3RQYXRoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzdHIgPSBqc2IuZmlsZVV0aWxzLmdldFN0cmluZ0Zyb21GaWxlKHByb2plY3RQYXRoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXN0cikgeyB0aHJvdyBcIlwiOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFsb2Rhc2guaXNTdHJpbmcoc3RyKSkgeyB0aHJvdyBcIlwiOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxvZGFzaC5pc0VtcHR5KHN0cikpIHsgdGhyb3cgXCJcIjsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBtID0gSlNPTi5wYXJzZShzdHIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghbSkgeyB0aHJvdyBcIlwiOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFtLnZlcnNpb24pIHsgdGhyb3cgXCJcIjsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghbG9kYXNoLmlzU3RyaW5nKG0udmVyc2lvbikpIHsgdGhyb3cgXCJcIjsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsb2Rhc2guaXNFbXB0eShtLnZlcnNpb24pKSB7IHRocm93IFwiXCI7IH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbS52ZXJzaW9uO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgXCJcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwibm9zZWFyY2hcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0TG9hY2xBc3NldHNQYXRoKCkge1xyXG4gICAgICAgIGlmICghY2Muc3lzLmlzTmF0aXZlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNjLnN5cy5vcyA9PSBjYy5zeXMuT1NfQU5EUk9JRCkge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJhc3NldHMvXCI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gc2VuZExvZygpIHtcclxuICAgICAgICBpZiAoIWNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBzID0ga2FheW91LmdldExvZygpO1xyXG4gICAgICAgIGthYXlvdS5QbGF0Zm9ybU1nci5nZXRJbnN0YW5jZSgpLnN5cy5Qb3N0QnVnbHkoXCJDaGVja0xvZ1wiICsga2FheW91LmdldExvYmJ5VmVyc2lvbigpLCBcIkNoZWNrTG9nXCIsIHMpO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBmdW5jdGlvbiB1blppcEFzc2V0c1BhdGgoY2FsbDogRnVuY3Rpb24sIHByb2dyZXNzQ2FsbD86IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgaWYgKCFjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNhbGwoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFrYWF5b3VfanNiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjYWxsKFwi5peg5rOV6I635Y+W6LWE5rqQXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWthYXlvdV9qc2IuRmlsZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gY2FsbChcIuaXoOazleiOt+WPlui1hOa6kFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGpzYi5maWxlVXRpbHMuaXNEaXJlY3RvcnlFeGlzdChnZXRSZW1vdGVQYXRoKCkpKSB7XHJcbiAgICAgICAgICAgIC8vcmVtb3RlYXNzZXQg55uu5b2V5bey5a2Y5ZyoXHJcbiAgICAgICAgICAgIHJldHVybiBjYWxsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciB6aXBOYW1lID0gJ0dhbWVMb2JieS56aXAnO1xyXG4gICAgICAgIC8vIGFwayB6aXAg5Zyw5Z2AXHJcbiAgICAgICAgdmFyIHppcFBhdGggPSBqc2IuZmlsZVV0aWxzLmZ1bGxQYXRoRm9yRmlsZW5hbWUoZ2V0TG9hY2xBc3NldHNQYXRoKCkgKyB6aXBOYW1lKTtcclxuICAgICAgICAvL+S4tOaXtuebruW9lVxyXG4gICAgICAgIHZhciB0ZW1wUGF0aCA9IGpzYi5maWxlVXRpbHMuZ2V0V3JpdGFibGVQYXRoKCkgKyBcInJlbW90ZS1hc3NldHMtdGVtcC9cIjtcclxuICAgICAgICAvLyBjb3B55Yiw55qEIOS4tOaXtnppcCDlnLDlnYBcclxuICAgICAgICB2YXIgdGVtcHppcFBhdGggPSB0ZW1wUGF0aCArIHppcE5hbWU7XHJcblxyXG4gICAgICAgIGlmICghKHppcFBhdGggJiYgemlwUGF0aCAhPSAnJykpIHtcclxuICAgICAgICAgICAgLy96aXDljIXkuI3lrZjlnKhcclxuICAgICAgICAgICAgcmV0dXJuIGNhbGwoXCLml6Dms5Xojrflj5botYTmupBcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm9ncmVzc0NhbGwgJiYgcHJvZ3Jlc3NDYWxsKDEsIDAsIDAsIDApO1xyXG5cclxuICAgICAgICAvL+WHhuWkh+ino+WOiyAgXHJcbiAgICAgICAgaWYgKGpzYi5maWxlVXRpbHMuaXNEaXJlY3RvcnlFeGlzdCh0ZW1wUGF0aCkpIHtcclxuICAgICAgICAgICAgLy/kuIrmrKHop6PljovlpLHotKUg5Yig6Zmk6K+l55uu5b2VXHJcbiAgICAgICAgICAgIGpzYi5maWxlVXRpbHMucmVtb3ZlRGlyZWN0b3J5KHRlbXBQYXRoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLop6PljovliLDkuLTml7bnm67lvZU6XCIgKyB0ZW1wUGF0aCk7XHJcbiAgICAgICAgY29weUFuZFVuemlwTG9jYWxQYWNrYWdlKHRlbXBQYXRoLCB6aXBQYXRoLCB0ZW1wemlwUGF0aCxcclxuICAgICAgICAgICAgZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYWxsKGVycik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL+ino+WOi+aIkOWKn1xyXG4gICAgICAgICAgICAgICAgLy/ph43lkb3lkI3otYTmupDnm67lvZVcclxuICAgICAgICAgICAgICAgIGpzYi5maWxlVXRpbHMucmVuYW1lRmlsZShqc2IuZmlsZVV0aWxzLmdldFdyaXRhYmxlUGF0aCgpLCBcInJlbW90ZS1hc3NldHMtdGVtcFwiLCBcInJlbW90ZS1hc3NldHNcIik7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIumHjeWRveWQjTpyZW1vdGUtYXNzZXRzLXRlbXAgLT4gcmVtb3RlLWFzc2V0c1wiKTtcclxuICAgICAgICAgICAgICAgIC8v5Zue6LCD5LiK5bGCXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY2FsbCgpO1xyXG4gICAgICAgICAgICB9LCBwcm9ncmVzc0NhbGwpO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBFeGlzdE1vZHVsZShtb2RldWxlbmFtZSkge1xyXG4gICAgICAgIHZhciByZW1vdGVTZWFjaFBhdGhSb290ID0ga2FheW91LmdldFJlbW90ZVBhdGgoKTtcclxuICAgICAgICAvL+aQnOe0oui3r+WKslxyXG4gICAgICAgIHZhciBtb2R1bGVTZWFyY2hQYXRoID0gYCR7cmVtb3RlU2VhY2hQYXRoUm9vdH0ke21vZGV1bGVuYW1lfWA7XHJcbiAgICAgICAgaWYgKCFqc2IuZmlsZVV0aWxzLmlzRGlyZWN0b3J5RXhpc3QobW9kdWxlU2VhcmNoUGF0aCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+aPj+i/sOaWh+S7tuagueebruW9lVxyXG4gICAgICAgIHZhciBob3RQcm9qZWN0RmlsZVBhdGggPSBcIlwiO1xyXG4gICAgICAgIGlmIChtb2RldWxlbmFtZSA9PSAnY29tbW9uJyB8fCBtb2RldWxlbmFtZSA9PSAnbG9iYnknKSB7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGhvdFByb2plY3RGaWxlUGF0aCA9IGAke21vZHVsZVNlYXJjaFBhdGh9L3Byb2plY3QubWFuaWZlc3RgO1xyXG4gICAgICAgICAgICBpZiAoIWpzYi5maWxlVXRpbHMuaXNGaWxlRXhpc3QoaG90UHJvamVjdEZpbGVQYXRoKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v5a6M5pW05qih5Z2X6Lev5b6EXHJcbiAgICAgICAgdmFyIG1vZHVsZVNyY1BhdGggPSBgJHttb2R1bGVTZWFyY2hQYXRofS9zcmMvJHttb2RldWxlbmFtZX1gO1xyXG4gICAgICAgIGlmICghanNiLmZpbGVVdGlscy5pc0RpcmVjdG9yeUV4aXN0KG1vZHVsZVNyY1BhdGgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL2pz5paH5Lu26Lev5b6EXHJcbiAgICAgICAgdmFyIG1vZHVsZUZpbGVQYXRoID0gYCR7bW9kdWxlU3JjUGF0aH0vJHttb2RldWxlbmFtZX0ubW9kdWxlLmpzYDtcclxuICAgICAgICBpZiAoIWpzYi5maWxlVXRpbHMuaXNGaWxlRXhpc3QobW9kdWxlRmlsZVBhdGgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+aWh+S7tuebuOWvuei3r+W+hFxyXG4gICAgICAgIHZhciByZWxhdGl2ZUZpbGVQYXRoID0gYHNyYy8ke21vZGV1bGVuYW1lfS8ke21vZGV1bGVuYW1lfS5tb2R1bGUuanNgXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbmFtZTogbW9kZXVsZW5hbWUsXHJcbiAgICAgICAgICAgIHByb2plY3Q6IGhvdFByb2plY3RGaWxlUGF0aCxcclxuICAgICAgICAgICAgc2VhcmNoOiBtb2R1bGVTZWFyY2hQYXRoLFxyXG4gICAgICAgICAgICBmdWxsOiBtb2R1bGVGaWxlUGF0aCxcclxuICAgICAgICAgICAgcmVsYXRpdmU6IHJlbGF0aXZlRmlsZVBhdGhcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/ojrflj5bmnKzlnLDmiYDmnInmqKHlnZdcclxuICAgIGV4cG9ydCBmdW5jdGlvbiBnZXRMb2NhbE1vZHVsZXMoKTogQXJyYXk8eyBuYW1lOiBzdHJpbmcsIHByb2plY3Q6IHN0cmluZywgc2VhcmNoOiBzdHJpbmcsIGZ1bGw6IHN0cmluZywgcmVsYXRpdmU6IHN0cmluZyB9PiB7XHJcbiAgICAgICAgLy/ojrflj5botYTmupDnm67lvZVcclxuICAgICAgICB2YXIgcmVtb3RlU2VhY2hQYXRoUm9vdCA9IGthYXlvdS5nZXRSZW1vdGVQYXRoKCk7XHJcbiAgICAgICAgbGV0IGZpbGVsaXN0ID0ganNiLmZpbGVVdGlscy5saXN0RmlsZXMocmVtb3RlU2VhY2hQYXRoUm9vdCk7XHJcbiAgICAgICAgLy/nm67lvZXliJfooahcclxuICAgICAgICBsZXQgZGlybGlzdDogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIHggaW4gZmlsZWxpc3QpIHtcclxuICAgICAgICAgICAgaWYgKGpzYi5maWxlVXRpbHMuaXNEaXJlY3RvcnlFeGlzdChmaWxlbGlzdFt4XSkpIHtcclxuICAgICAgICAgICAgICAgIGRpcmxpc3QucHVzaChmaWxlbGlzdFt4XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGdhbWVtb2R1bGVsaXN0UGF0aDogQXJyYXk8e1xyXG4gICAgICAgICAgICBuYW1lOiBzdHJpbmcsXHJcbiAgICAgICAgICAgIHByb2plY3Q6IHN0cmluZyxcclxuICAgICAgICAgICAgc2VhcmNoOiBzdHJpbmcsXHJcbiAgICAgICAgICAgIGZ1bGw6IHN0cmluZyxcclxuICAgICAgICAgICAgcmVsYXRpdmU6IHN0cmluZ1xyXG4gICAgICAgIH0+ID0gW107XHJcbiAgICAgICAgZGlybGlzdC5mb3JFYWNoKGZ1bmN0aW9uIChmKSB7XHJcbiAgICAgICAgICAgIGxldCBlbGVtZW50ID0gZi5yZXBsYWNlKHJlbW90ZVNlYWNoUGF0aFJvb3QsICcnKTtcclxuICAgICAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQucmVwbGFjZSgvKFxcXFwpPyhcXC8pL2csICcnKTtcclxuICAgICAgICAgICAgaWYgKGVsZW1lbnQubGVuZ3RoID4gMCAmJiBlbGVtZW50ICE9ICcuJyAmJiBlbGVtZW50ICE9ICcuLicpIHtcclxuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gRXhpc3RNb2R1bGUoZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5Y+v6IO96ZyA5Yqg6L2955qE5qih5Z2XOjo6ICBcIiwgaXRlbS5uYW1lLCBpdGVtLnNlYXJjaCwgaXRlbS5mdWxsLCBpdGVtLnJlbGF0aXZlKTtcclxuICAgICAgICAgICAgICAgICAgICBnYW1lbW9kdWxlbGlzdFBhdGgucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBnYW1lbW9kdWxlbGlzdFBhdGg7XHJcbiAgICB9XHJcbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiZXh0ZW5kLnRzXCIgLz5cclxubmFtZXNwYWNlIGthYXlvdSB7XHJcbiAgICBjb25zdCB7Y2NjbGFzc30gPSBrYWF5b3UuX2RlY29yYXRvcjtcclxuICAgIEBjY2NsYXNzXHJcbiAgICBleHBvcnQgY2xhc3MgSW1hZ2VWaWV3IGV4dGVuZHMgY2N1aS5JbWFnZVZpZXcge1xyXG4gICAgICAgIGN0b3IoKXtcclxuICAgICAgICAgICAgc3VwZXIuY3RvcigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJleHRlbmQudHNcIiAvPlxyXG5uYW1lc3BhY2Uga2FheW91IHtcclxuICAgIGNvbnN0IHsgY2NjbGFzcyB9ID0ga2FheW91Ll9kZWNvcmF0b3I7XHJcbiAgICBAY2NjbGFzc1xyXG4gICAgZXhwb3J0IGNsYXNzIExheWVyIGV4dGVuZHMgY2MuTGF5ZXIge1xyXG4gICAgICAgIHB1YmxpYyBfbW9kdWxlTmFtZSA9IFwiXCI7XHJcbiAgICAgICAgcHVibGljIG5vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgICAgICBjdG9yKCkge1xyXG4gICAgICAgICAgICBzdXBlci5jdG9yKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXRNb2R1bGVOYW1lKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbW9kdWxlTmFtZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXRXaXRoY2NzKHBhdGg/OiBzdHJpbmcsIGZ1bGw6IGJvb2xlYW4gPSB0cnVlKSB7XHJcbiAgICAgICAgICAgIGxldCBmdWxsU2l6ZSA9IG51bGw7XHJcbiAgICAgICAgICAgIGlmIChmdWxsKSB7XHJcbiAgICAgICAgICAgICAgICBmdWxsU2l6ZSA9IGNjLnNpemUoY2Mud2luU2l6ZS53aWR0aCwgY2Mud2luU2l6ZS5oZWlnaHQpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZnVsbFNpemUgPSBjYy5zaXplKGNjLndpblNpemVDdXN0b20ud2lkdGgsIGNjLndpblNpemVDdXN0b20uaGVpZ2h0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNldENvbnRlbnRTaXplKGZ1bGxTaXplKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuc2V0UG9zaXRpb24oKGNjLndpblNpemUud2lkdGggLSBmdWxsU2l6ZS53aWR0aCkgLyAyLCAoY2Mud2luU2l6ZS5oZWlnaHQgLSBmdWxsU2l6ZS5oZWlnaHQpIC8gMik7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZSA9IGNjcy5sb2FkKHBhdGgsIFwicmVzL1wiKS5ub2RlO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuc2V0Q29udGVudFNpemUoZnVsbFNpemUpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuc2V0QW5jaG9yUG9pbnQoMC41LCAwLjUpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKGZ1bGxTaXplLndpZHRoIC8gMiwgZnVsbFNpemUuaGVpZ2h0IC8gMik7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFkZENoaWxkKHRoaXMubm9kZSk7XHJcbiAgICAgICAgICAgIGNjdWkuaGVscGVyLmRvTGF5b3V0KHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBzZXRNb2R1bGVOYW1lKG1vZHVsZU5hbWU6IHN0cmluZyA9IFwiXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5fbW9kdWxlTmFtZSA9IG1vZHVsZU5hbWU7XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgQGNjY2xhc3NcclxuICAgIGV4cG9ydCBjbGFzcyBCbG9jayBleHRlbmRzIGNjdWkuTGF5b3V0IHtcclxuICAgICAgICBwdWJsaWMgbm9kZTogY2MuTm9kZSA9IG51bGw7XHJcbiAgICAgICAgY3RvcigpIHtcclxuICAgICAgICAgICAgc3VwZXIuY3RvcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgX21vZHVsZU5hbWUgPSBcIlwiO1xyXG4gICAgICAgIHNldE1vZHVsZU5hbWUobW9kdWxlTmFtZTogc3RyaW5nID0gXCJcIikge1xyXG4gICAgICAgICAgICB0aGlzLl9tb2R1bGVOYW1lID0gbW9kdWxlTmFtZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ2V0TW9kdWxlTmFtZSgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21vZHVsZU5hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGluaXRXaXRoY2NzKHBhdGg/OiBzdHJpbmcsLi4uYXJncykge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5ub2RlID0gY2NzLmxvYWQocGF0aCwgXCJyZXMvXCIpLm5vZGU7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5zZXRWaXNpYmxlKHRydWUpO1xyXG4gICAgICAgICAgICBjY3VpLmhlbHBlci5kb0xheW91dCh0aGlzLm5vZGUpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZENoaWxkKHRoaXMubm9kZSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0Q29udGVudFNpemUodGhpcy5ub2RlLmdldENvbnRlbnRTaXplKCkpO1xyXG4gICAgICAgICAgICB0aGlzLnNldEFuY2hvclBvaW50KHRoaXMubm9kZS5nZXRBbmNob3JQb2ludCgpKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRTY2FsZVgodGhpcy5ub2RlLmdldFNjYWxlWCgpKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRTY2FsZVkodGhpcy5ub2RlLmdldFNjYWxlWSgpKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRQb3NpdGlvbih0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5zZXRBbmNob3JQb2ludCgwLjUsIDAuNSk7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5zZXRTY2FsZVgoMSk7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5zZXRTY2FsZVkoMSk7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbih0aGlzLmdldENvbnRlbnRTaXplKCkud2lkdGggLyAyLCB0aGlzLmdldENvbnRlbnRTaXplKCkuaGVpZ2h0IC8gMik7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdFdpdGhOb2RlKG5vZGU6IGNjdWkuV2lkZ2V0LC4uLmFyZ3MpIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlID0gbm9kZS5jbG9uZSgpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuc2V0VmlzaWJsZSh0cnVlKTtcclxuICAgICAgICAgICAgY2N1aS5oZWxwZXIuZG9MYXlvdXQodGhpcy5ub2RlKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLm5vZGUpO1xyXG4gICAgICAgICAgICB0aGlzLnNldENvbnRlbnRTaXplKHRoaXMubm9kZS5nZXRDb250ZW50U2l6ZSgpKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRBbmNob3JQb2ludCh0aGlzLm5vZGUuZ2V0QW5jaG9yUG9pbnQoKSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U2NhbGVYKHRoaXMubm9kZS5nZXRTY2FsZVgoKSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U2NhbGVZKHRoaXMubm9kZS5nZXRTY2FsZVkoKSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0UG9zaXRpb24odGhpcy5ub2RlLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuc2V0QW5jaG9yUG9pbnQoMC41LCAwLjUpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuc2V0U2NhbGVYKDEpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuc2V0U2NhbGVZKDEpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24odGhpcy5nZXRDb250ZW50U2l6ZSgpLndpZHRoIC8gMiwgdGhpcy5nZXRDb250ZW50U2l6ZSgpLmhlaWdodCAvIDIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdFdpdGhOb2RlQW5kQ2xlYW51cChub2RlOiBjY3VpLldpZGdldCwuLi5hcmdzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdFdpdGhOb2RlKG5vZGUpO1xyXG4gICAgICAgICAgICBub2RlLnJlbW92ZUZyb21QYXJlbnRBbmRDbGVhbnVwKHRydWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdFdpdGhOb2RlTm9DbG9uZShub2RlOiBjYy5Ob2RlLC4uLmFyZ3MpIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlID0gbm9kZTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnNldFZpc2libGUodHJ1ZSk7XHJcbiAgICAgICAgICAgIGNjdWkuaGVscGVyLmRvTGF5b3V0KHRoaXMubm9kZSk7XHJcbiAgICAgICAgICAgIG5vZGUucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZENoaWxkKHRoaXMubm9kZSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0Q29udGVudFNpemUodGhpcy5ub2RlLmdldENvbnRlbnRTaXplKCkpO1xyXG4gICAgICAgICAgICB0aGlzLnNldEFuY2hvclBvaW50KHRoaXMubm9kZS5nZXRBbmNob3JQb2ludCgpKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRTY2FsZVgodGhpcy5ub2RlLmdldFNjYWxlWCgpKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRTY2FsZVkodGhpcy5ub2RlLmdldFNjYWxlWSgpKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRQb3NpdGlvbih0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5zZXRBbmNob3JQb2ludCgwLjUsIDAuNSk7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5zZXRTY2FsZVgoMSk7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5zZXRTY2FsZVkoMSk7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbih0aGlzLmdldENvbnRlbnRTaXplKCkud2lkdGggLyAyLCB0aGlzLmdldENvbnRlbnRTaXplKCkuaGVpZ2h0IC8gMik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZXhwb3J0IGNsYXNzIE1vZGVsTGF5ZXIgZXh0ZW5kcyBMYXllciB7XHJcbiAgICAgICAgcHVibGljIG5vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgICAgIGN0b3IoKSB7XHJcbiAgICAgICAgICAgIHN1cGVyLmN0b3IoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbWFza0JnOiBjYy5MYXllciA9IG51bGw7XHJcbiAgICAgICAgaXNUb3VjaE1hc2tIaWRlOiBib29sZWFuID0gdHJ1ZTtcclxuICAgICAgICBpbml0V2l0aGNjcyhwYXRoPzogc3RyaW5nLCBmdWxsOiBib29sZWFuID0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBzdXBlci5pbml0V2l0aGNjcyhwYXRoLCBmdWxsKTtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLm1hc2tCZyA9IGNjdWkuaGVscGVyLnNlZWtXaWRnZXRCeU5hbWUoPGNjdWkuV2lkZ2V0PnRoaXMubm9kZSwgXCJtYXNrYmdcIik7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1hc2tCZykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXNrQmcub24oa2FheW91LlRvdWNoRXZlbnQuVG91Y2hFbmQsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5pc1RvdWNoTWFza0hpZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5IaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwgdGhpcylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBIaWRlKCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFZpc2libGUoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgTGF5ZXJTZXF7XHJcbiAgICAgICAgc3RhdGljIF9fSU5TX186IExheWVyU2VxID0gbnVsbDtcclxuICAgICAgICBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogTGF5ZXJTZXEge1xyXG4gICAgICAgICAgICBpZiAoTGF5ZXJTZXEuX19JTlNfXyA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBMYXllclNlcS5fX0lOU19fID0gbmV3IExheWVyU2VxKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIExheWVyU2VxLl9fSU5TX187XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsYXllclNlcTpzdHJpbmdbXT1bXTtcclxuXHJcbiAgICAgICAgYWRkTGF5ZXJTZXEobGF5ZXJOYW1lOnN0cmluZyl7XHJcbiAgICAgICAgICAgIHRoaXMubGF5ZXJTZXEucHVzaChsYXllck5hbWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2xvc2VUb3BMYXllcigpe1xyXG4gICAgICAgICAgICB0aGlzLmxheWVyU2VxLnNwbGljZSgwLDEpO1xyXG4gICAgICAgICAgICBsZXQgbGF5ZXJOYW1lPXRoaXMubGF5ZXJTZXFbMF07XHJcbiAgICAgICAgICAgIGlmKCEhbGF5ZXJOYW1lKSBrYWF5b3UuZW1pdChcImNvbW1vblwiLFwidWk6OkxheWVyOjpTaG93XCIsbGF5ZXJOYW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldFRvcExheWVyKCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxheWVyU2VxWzBdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIm5hbWVzcGFjZSBrYWF5b3Uge1xyXG5cclxuICAgIGV4cG9ydCBuYW1lc3BhY2UgbW9kIHtcclxuXHJcblxyXG4gICAgICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlIHtcclxuICAgICAgICAgICAgcHJvdGVjdGVkIF9tb2R1bGVOYW1lID0gXCJcIjtcclxuICAgICAgICAgICAgc2V0TW9kdWxlTmFtZShtb2R1bGVOYW1lKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tb2R1bGVOYW1lID0gbW9kdWxlTmFtZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnZXRNb2R1bGVOYW1lKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21vZHVsZU5hbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYWJzdHJhY3QgaW5pdE1vZCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cImRlY29yYXRvci50c1wiIC8+XHJcbm5hbWVzcGFjZSBrYWF5b3Uge1xyXG4gICAgbGV0IHsgZG9CaW5kRXZlbnQsIEJpbmRFdmVudCwgQ3VzdG9tQmluZEV2ZXRuIH0gPSBrYWF5b3UuX2RlY29yYXRvcjtcclxuICAgIGV4cG9ydCBjbGFzcyBrYVdlYlNvY2tldCB7XHJcblxyXG4gICAgICAgIC8vLy8vMTExMVxyXG4gICAgICAgIHByaXZhdGUgd3M6IFdlYlNvY2tldCA9IG51bGw7XHJcbiAgICAgICAgLy8gb25jb25uZWN0OiAoaWQ6IG51bWJlcikgPT4gdm9pZCA9IG51bGw7XHJcbiAgICAgICAgLy8gb25tZXNzYWdlOiAoaWQ6IG51bWJlciwgbWlkOiBudW1iZXIsIHNpZDogbnVtYmVyLCBkYXRhOiBhbnksIGRhdGFsZW46IG51bWJlcikgPT4gdm9pZCA9IG51bGw7XHJcbiAgICAgICAgLy8gb25jbG9zZTogKGlkOiBudW1iZXIpID0+IHZvaWQgPSBudWxsO1xyXG4gICAgICAgIC8vIG9uZGlzY29ubmVjdDogKGlkOiBudW1iZXIpID0+IHZvaWQgPSBudWxsO1xyXG4gICAgICAgIC8vIG9ucmVjb25uZWN0OiAoaWQ6IG51bWJlcikgPT4gdm9pZCA9IG51bGw7XHJcbiAgICAgICAgbmFtZTogc3RyaW5nID0gXCJcIjtcclxuICAgICAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgICAgICAgLy8gdGhpcy5pbml0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIF9jb25Db25maWc6IHsgaXA6IHN0cmluZywgcG9ydDogbnVtYmVyLCBwYXRoPzogc3RyaW5nIH0gPSBudWxsO1xyXG4gICAgICAgIF9yZXNVcmw6IHN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgcHVibGljIGRvUmVjb25uZWN0KCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5uYW1lICE9IFwibG9iYnlcIikge1xyXG4gICAgICAgICAgICAgICAga2FheW91LmVtaXQodGhpcy5uYW1lLCBgd3M6Ok1zZzo6cGluZ2AsIHt3c25hbWU6dGhpcy5uYW1lLG1zOjQ2MH0pOyAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGxvZGFzaC5pc0VtcHR5KHRoaXMuX3Jlc1VybCkpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdCh0aGlzLl9yZXNVcmwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgZ2V0Y29uQ29uZmlnKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY29uQ29uZmlnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgZG9Db25uZWN0KGRhdGE6IHsgaXA6IHN0cmluZywgcG9ydDogbnVtYmVyLCBwYXRoPzogc3RyaW5nIH0pIHtcclxuICAgICAgICAgICAgdGhpcy5fY29uQ29uZmlnID0gbG9kYXNoLmNsb25lKGRhdGEpO1xyXG4gICAgICAgICAgICBsZXQgcmVzVXJsID0gYHdzOi8vJHtkYXRhLmlwfToke2RhdGEucG9ydH0vJHtkYXRhLnBhdGggfHwgXCJcIn1gO1xyXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3QocmVzVXJsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIF9pc0luaXRpYXRpdmUgPSBmYWxzZTtcclxuICAgICAgICBwdWJsaWMgX2lzQ29ubmVjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgcHVibGljIGdldElzQ29ubmVjdGVkKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faXNDb25uZWN0ZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByb3RlY3RlZCBjb25uZWN0KHJlc1VybDogc3RyaW5nKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9pc0luaXRpYXRpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5faXNEb0Nsb3NlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX19sYXN0TXNnVGltZSA9IERhdGUudW5peCgpO1xyXG4gICAgICAgICAgICB0aGlzLl9pc0Nvbm5lY3RlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuX3Jlc1VybCA9IHJlc1VybDtcclxuICAgICAgICAgICAgaWYgKHRoaXMud3MpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm5hbWUgKyBcInNvY2tldCDlvIDlp4vpk77mjqUgIFwiICsgcmVzVXJsKTtcclxuICAgICAgICAgICAgICAgIHRoaXMud3MgPSBuZXcgV2ViU29ja2V0KHJlc1VybCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndzLmJpbmFyeVR5cGUgPSAnYXJyYXlidWZmZXInO1xyXG4gICAgICAgICAgICAgICAgdGhpcy53cy5vbm9wZW4gPSB0aGlzLl9fb25PcGVuLmJpbmQodGhpcyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndzLm9ubWVzc2FnZSA9IHRoaXMuX19vbm1lc3NhZ2UuYmluZCh0aGlzKTtcclxuICAgICAgICAgICAgICAgIHRoaXMud3Mub25jbG9zZSA9IHRoaXMuX19vbmNsb3NlLmJpbmQodGhpcyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndzLm9uZXJyb3IgPSB0aGlzLl9fb25FcnJvci5iaW5kKHRoaXMpXHJcblxyXG4gICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgICAgIGthYXlvdS5lbWl0KHRoaXMubmFtZSwgXCJ3czo6b25FcnJvclwiLCB7IG5hbWU6IHRoaXMubmFtZSwgZXJyOiBlcnIgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBfX29uRXJyb3IoZXJyLCBhKSB7XHJcbiAgICAgICAgICAgIGthYXlvdS5lbWl0KHRoaXMubmFtZSwgXCJ3czo6b25FcnJvclwiLCB7IG5hbWU6IHRoaXMubmFtZSwgZXJyOiBlcnIgfSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm5hbWUgIT0gXCJsb2JieVwiKSB7XHJcbiAgICAgICAgICAgICAgICBrYWF5b3UuZW1pdCh0aGlzLm5hbWUsIGB3czo6TXNnOjpwaW5nYCwge3dzbmFtZTp0aGlzLm5hbWUsbXM6NDYwfSk7ICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyB0aGlzLndzID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBfX29uT3BlbigpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5uYW1lICsgXCJzb2NrZXQg6ZO+5o6l5oiQ5YqfXCIpO1xyXG4gICAgICAgICAgICBrYWF5b3UuZW1pdCh0aGlzLm5hbWUsIFwid3M6Om9uQ29ubmVjdFwiLCB7IG5hbWU6IHRoaXMubmFtZSB9KTtcclxuICAgICAgICAgICAgdGhpcy5fX2RvUGluZygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcml2YXRlIF9fdCA9IG51bGw7XHJcbiAgICAgICAgcHJpdmF0ZSBfX2RlbGF5VDpudW1iZXIgPSAwO1xyXG5cclxuICAgICAgICBwcml2YXRlIF9fZG9QaW5nKCkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5pc09wZW5kKCkpIHsgY29uc29sZS5sb2coXCLpgIDlh7pwaW5nXCIpOyByZXR1cm47IH07XHJcbiAgICAgICAgICAgIHRoaXMuc2VuZCh7IG1zZ2hlYWQ6IFwicGluZ1wiIH0pO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNPcGVuZCgpKSB7IGNvbnNvbGUubG9nKFwi6YCA5Ye6cGluZ1wiKTsgcmV0dXJuOyB9XHJcbiAgICAgICAgICAgIHRoaXMuX19kZWxheVQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDA7XHJcbiAgICAgICAgICAgIGxldCBwaW5nVGltZSA9IDA7XHJcbiAgICAgICAgICAgIHBpbmdUaW1lID0gISEodGhpcy5uYW1lID09IFwibG9iYnlcIik/IDcwMDA6NTAwMDtcclxuICAgICAgICAgICAgdGhpcy5fX3QgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuX19kb1BpbmcuYXBwbHkoc2VsZik7XHJcbiAgICAgICAgICAgIH0sIHBpbmdUaW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBfX2NsZWFyVCgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX190KSB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9fdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubmFtZSAhPSBcImxvYmJ5XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAga2FheW91LmVtaXQodGhpcy5uYW1lLCBgd3M6Ok1zZzo6cGluZ2AsIHt3c25hbWU6dGhpcy5uYW1lLG1zOjQ2MH0pOyAgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX190ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHsgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX190ID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgX19sYXN0TXNnVGltZSA9IDA7XHJcbiAgICAgICAgZ2V0TGFzdFRpbWUoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fbGFzdE1zZ1RpbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgX19vbm1lc3NhZ2UoZSkge1xyXG5cclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZS5kYXRhKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHZhciBidWYgPSBuZXcgVWludDhBcnJheShlLmRhdGEpO1xyXG4gICAgICAgICAgICAvLyB2YXIgcGRhdGEgPSBUZXh0Q29kZXIuZGVjb2RlKCd1dGY4JyAsIG5ldyBVaW50OEFycmF5KGUuZGF0YSkpIDtcclxuICAgICAgICAgICAgbGV0IHVuaXQ4QXJyID0gbmV3IFVpbnQ4QXJyYXkoZS5kYXRhKTtcclxuICAgICAgICAgICAgbGV0IHQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDA7XHJcbiAgICAgICAgICAgIGxldCBlbmNvZGVkU3RyaW5nXHJcbiAgICAgICAgICAgIGlmKGNjLnN5cy5pc05hdGl2ZSlcclxuICAgICAgICAgICAgICAgIGVuY29kZWRTdHJpbmcgPSBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsIHVuaXQ4QXJyKTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgZW5jb2RlZFN0cmluZyA9IGJpZ1VuaXQ4VG9DaGFyKHVuaXQ4QXJyKTtcclxuICAgICAgICAgICAgbGV0IHBkYXRhID0gZGVjb2RlVVJJQ29tcG9uZW50KGVzY2FwZSgoZW5jb2RlZFN0cmluZykpKTsvL+ayoeaciei/meS4gOatpeS4reaWh+S8muS5seeggVxyXG4gICAgICAgICAgICBrYWF5b3UuZW1pdCh0aGlzLm5hbWUsIFwid3M6Om9uTWVzc2FnZVwiLCBwZGF0YSk7XHJcblxyXG4gICAgICAgICAgICB0cnkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCByZXM6IEthX01TR19SRVMgPSBKU09OLnBhcnNlKHBkYXRhKTtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmVzICE9ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkthX01TR19SRVNcIiwgcGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IEVycm9yKCdtZXNzYWdlIGlzIG5vdCBvYmplY3QnKTtcclxuICAgICAgICAgICAgICAgIH0gLy8gXCJvYmplY3RcIiAgKVxyXG4gICAgICAgICAgICAgICAgbGV0IG1zZ2hlYWQgPSByZXMuaGVhZDtcclxuICAgICAgICAgICAgICAgIGlmICghbXNnaGVhZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJLYV9NU0dfUkVTXCIsIHBkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcignbXNnaGVhZCBpcyB1bmRlZmluZScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChcInBpbmdcIiAhPT0gbXNnaGVhZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2VuZE1lc3NhZ2U65o6l5Y+XXCIgKyB0aGlzLm5hbWUsIG1zZ2hlYWQsIHJlcyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMubmFtZSAsICdwb25nJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9fbGFzdE1zZ1RpbWUgPSBEYXRlLnVuaXgoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobXNnaGVhZCA9PSAnZm9yY2VjbG9zZScpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYy5sb2coJ+W8uuWItuino+aVoycpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2lzSW5pdGlhdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IHNpZ24gPSByZXNbXCJtc2dzaWduXCJdO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNpZ24uZW5jb2RlID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXMuZGF0YSA9IEFFUy5kZWNyeXB0KHJlcy5kYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChyZXMuZXJyY29kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IocmVzKTtcclxuICAgICAgICAgICAgICAgICAgICBrYWF5b3UuZW1pdCh0aGlzLm5hbWUsIGB3czo6TXNnOjoke21zZ2hlYWR9YCwgeyBlcnJjb2RlOiByZXMuZXJyY29kZSwgbXNnOiByZXMuZGF0YSB9KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IG1zZ2RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhICYmIGxvZGFzaC5pc1N0cmluZyhyZXMuZGF0YSkgJiYgcmVzLmRhdGEgIT0gJ251bGwnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbXNnZGF0YSA9IEpTT04ucGFyc2UocmVzLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBtc2dkYXRhID0ge307XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBrYWF5b3UuRGF0YVNldC5zZXQoJ3RpbWU6b2ZmZnNldDo6dGltZScsIChyZXMubXNnc2lnbi50aW1lIC0gdCkudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICBpZiAobXNnaGVhZCA9PSBcInBpbmdcIikgeyAgIC8v6YCa6L+HcGluZ+adpeiuoeeul+e9kee7nOW7tuaXtlxyXG4gICAgICAgICAgICAgICAgICAgIG1zZ2RhdGEgPSB7d3NuYW1lOnRoaXMubmFtZSxtczpNYXRoLmNlaWwoKHQgLSB0aGlzLl9fZGVsYXlUKSoxMDAwKX07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBrYWF5b3UuZW1pdCh0aGlzLm5hbWUsIGB3czo6TXNnOjoke21zZ2hlYWR9YCwgbXNnZGF0YSk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkthX01TR19SRVNfZXJyXCIsIHBkYXRhKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm5hbWUgIT0gXCJsb2JieVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAga2FheW91LmVtaXQodGhpcy5uYW1lLCBgd3M6Ok1zZzo6cGluZ2AsIHt3c25hbWU6dGhpcy5uYW1lLG1zOjQ2MH0pOyAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGJpZ1VuaXQ4VG9DaGFyKGFycmF5KXtcclxuICAgICAgICAgICAgICAgIGxldCByZXMgPSAnJztcclxuICAgICAgICAgICAgICAgIC8vdXRmLTgg5pyA6auY5Lya55So5YiwIDPkuKo45L2N6L+b6KGM6K6w5b2VIHV0Zi0xNuaJqeWxleWPr+S7peacgOWkp+WIsOS4pOS4qiAweGZmIDY1NTM1ICsgNjU1MzXnmoTnu4TlkIggICBcclxuICAgICAgICAgICAgICAgIGNvbnN0ICBjaHVuayA9IDQgKiAzICogMTAyNDtcclxuICAgICAgICAgICAgICAgIGxldCBpXHJcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoIC8gY2h1bms7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgcmVzICs9IFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCwgYXJyYXkuc2xpY2UoaSAqIGNodW5rLCAoaSArIDEpICogY2h1bmspKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJlcyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsIGFycmF5LnNsaWNlKGkgKiBjaHVuaykpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gaWYgKHRoaXMub25tZXNzYWdlKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAvLyBsZXQgYnVmID0gbmV3IGthQnVmZmVyKGUuZGF0YSk7XHJcbiAgICAgICAgICAgIC8vICAgICAvLyAvLyBsZXQgbWlkID0gYnVmLnJlYWRVc29ydCgpO1xyXG4gICAgICAgICAgICAvLyAgICAgLy8gLy8gbGV0IHNpZCA9IGJ1Zi5yZWFkVXNvcnQoKTtcclxuICAgICAgICAgICAgLy8gICAgIC8vIC8vIGxldCBsZW4gPSBidWYucmVhZFVpbnQoKTtcclxuICAgICAgICAgICAgLy8gICAgIC8vIC8vIGJ1Zi5PZmZzZXQgPSAxMDtcclxuXHJcbiAgICAgICAgICAgIC8vICAgICAvLyBidWYuT2Zmc2V0ID0wO1xyXG4gICAgICAgICAgICAvLyAgICAgLy8gbGV0IG1pZCA9IGJ1Zi5yZWFkVXNvcnQoKTtcclxuICAgICAgICAgICAgLy8gICAgIC8vIGxldCBzaWQgPSBidWYucmVhZFVzb3J0KCk7XHJcbiAgICAgICAgICAgIC8vICAgICAvLyBsZXQgbGVuID0gYnVmLmJ5dGVMZW5ndGggLSA0O1xyXG4gICAgICAgICAgICAvLyAgICAgLy8gbGV0IHViID0gbmV3IFVpbnQ4QXJyYXkoYnVmLnJlYWRCeXRlQXJyYXkobGVuKSlcclxuICAgICAgICAgICAgLy8gICAgIC8vIHRoaXMub25tZXNzYWdlKHRoaXMuaWQsIG1pZCwgc2lkLCB1Yi5idWZmZXIsIGxlbik7XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGlzT3BlbmQoKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy53cykgeyByZXR1cm4gZmFsc2U7IH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2lzRG9DbG9zZSkgeyByZXR1cm4gZmFsc2U7IH1cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMud3MucmVhZHlTdGF0ZSA9PSBXZWJTb2NrZXQuT1BFTjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGdldEluaXRpYXRpdmUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9pc0luaXRpYXRpdmU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY2hlY2tMaWZlKCkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMud3MpIHsgcmV0dXJuIGZhbHNlOyB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9pc0RvQ2xvc2UpIHsgcmV0dXJuIGZhbHNlOyB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLndzLnJlYWR5U3RhdGUgPT0gV2ViU29ja2V0Lk9QRU4gfHwgdGhpcy53cy5yZWFkeVN0YXRlID09IFdlYlNvY2tldC5DT05ORUNUSU5HO1xyXG4gICAgICAgICAgICAvLyByZWFkb25seSBDTE9TRUQ6IG51bWJlcjtcclxuICAgICAgICAgICAgLy8gcmVhZG9ubHkgQ0xPU0lORzogbnVtYmVyO1xyXG4gICAgICAgICAgICAvLyByZWFkb25seSBDT05ORUNUSU5HOiBudW1iZXI7XHJcbiAgICAgICAgICAgIC8vIHJlYWRvbmx5IE9QRU46IG51bWJlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgX19vbmNsb3NlKGUpIHtcclxuICAgICAgICAgICAgY2MubG9nKGUpO1xyXG4gICAgICAgICAgICB0aGlzLl9fY2xlYXJUKCk7XHJcbiAgICAgICAgICAgIC8vZS5jb2RlXHJcbiAgICAgICAgICAgIC8vIDEwMDDCoMKgwqDCoMKgwqDCoMKgwqAg5q2j5bi45YWz6ZetwqDCoMKgwqDCoMKgIOW9k+S9oOeahOS8muivneaIkOWKn+WujOaIkOaXtuWPkemAgei/meS4quS7o+eggVxyXG5cclxuICAgICAgICAgICAgLy8gMTAwMcKgwqDCoMKgwqDCoMKgwqDCoCDnprvlvIDCoMKgwqDCoMKgwqDCoMKgwqDCoCDlm6DlupTnlKjnqIvluo/nprvlvIDkuJTkuI3mnJ/mnJvlkI7nu63nmoTov57mjqXlsJ3or5XogIzlhbPpl63ov57mjqXml7bvvIzlj5HpgIHov5nkuIDku6PnoIHjgILmnI3liqHlmajlj6/og73lhbPpl63vvIzmiJbogIXlrqLmiLfnq6/lupTnlKjnqIvluo/lj6/og73lhbPpl61cclxuXHJcbiAgICAgICAgICAgIC8vIDEwMDLCoMKgwqDCoMKgwqDCoMKgwqAg5Y2P6K6u6ZSZ6K+vwqDCoMKgwqDCoMKgIOW9k+WboOWNj+iurumUmeivr+iAjOWFs+mXrei/nuaOpeaXtuWPkemAgei/meS4gOS7o+eggVxyXG5cclxuICAgICAgICAgICAgLy8gMTAwM8KgwqDCoMKgIOS4jeWPr+aOpeWPl+eahOaVsOaNruexu+Wei8KgIOW9k+W6lOeUqOeoi+W6j+aOpeaUtuWIsOS4gOadoeaXoOazleWkhOeQhueahOaEj+Wkluexu+Wei+a2iOaBr+aXtuWPkemAgei/meS4gOS7o+eggVxyXG5cclxuICAgICAgICAgICAgLy8gMTAwNMKgwqDCoMKgwqDCoMKgwqDCoCDkv53nlZnCoMKgwqDCoMKgwqDCoMKgwqDCoCDkuI3opoHlj5HpgIHov5nkuIDku6PnoIHjgILmoLnmja4gUkZDIDY0NTXvvIzov5nkuKrnirbmgIHnoIHkv53nlZnvvIzlj6/og73lnKjmnKrmnaXlrprkuYlcclxuXHJcbiAgICAgICAgICAgIC8vIDEwMDXCoMKgwqDCoMKgwqDCoMKgwqAg5L+d55WZwqDCoMKgwqDCoMKgwqDCoMKgwqAg5LiN6KaB5Y+R6YCB6L+Z5LiA5Luj56CB44CCV2ViU29ja2V0IEFQSSDnlKjov5nkuKrku6PnoIHooajnpLrmsqHmnInmjqXmlLbliLDku7vkvZXku6PnoIFcclxuXHJcbiAgICAgICAgICAgIC8vIDEwMDYgwqDCoMKgwqDCoMKgwqDCoMKg5L+d55WZIMKgwqDCoMKgwqDCoMKgwqDCoMKg5LiN6KaB5Y+R6YCB6L+Z5LiA5Luj56CB44CCV2ViU29ja2V0IEFQSSDnlKjov5nkuKrku6PnoIHooajnpLrov57mjqXlvILluLjlhbPpl61cclxuXHJcbiAgICAgICAgICAgIC8vIDEwMDcgwqDCoMKgwqDCoMKgwqDCoMKg5peg5pWI5pWw5o2uIMKgwqDCoMKgwqDCoOWcqOaOpeaUtuS4gOS4quagvOW8j+S4jua2iOaBr+exu+Wei+S4jeWMuemFjeeahOa2iOaBr+S5i+WQjuWPkemAgei/meS4gOS7o+eggeOAguWmguaenOaWh+acrOa2iOaBr+WMheWQq+mUmeivr+agvOW8j+eahCBVVEYtOCDmlbDmja7vvIzov57mjqXlupTor6XnlKjov5nkuKrku6PnoIHlhbPpl61cclxuXHJcbiAgICAgICAgICAgIC8vIDEwMDggwqDCoMKgwqDCoMKgwqDCoMKg5raI5oGv6L+d5Y+N5pS/562WIMKgwqDCoOW9k+W6lOeUqOeoi+W6j+eUseS6juWFtuS7luS7o+eggeaJgOS4jeWMheWQq+eahOWOn+WboOe7iOatoui/nuaOpe+8jOaIluiAheS4jeW4jOacm+azhOmcsua2iOaBr+aXoOazleWkhOeQhueahOWOn+WboOaXtu+8jOWPkemAgei/meS4gOS7o+eggVxyXG5cclxuICAgICAgICAgICAgLy8gMTAwOcKgwqDCoMKgwqDCoMKgwqDCoCDmtojmga/ov4flpKfCoMKgwqAgwqDCoMKgwqDlvZPmjqXmlLbnmoTmtojmga/lpKrlpKfvvIzlupTnlKjnqIvluo/ml6Dms5XlpITnkIbml7blj5HpgIHov5nkuIDku6PnoIHvvIjorrDkvY/vvIzluKfnmoTovb3ojbfplb/luqbmnIDlpJrkuLo2NCDlrZfoioLjgILljbPkvb/kvaDmnInkuIDkuKrlpKfmnI3liqHlmajvvIzmnInkupvmtojmga9cclxuXHJcbiAgICAgICAgICAgIC8vIOS5n+S7jeeEtuWkquWkp+OAgu+8iVxyXG5cclxuICAgICAgICAgICAgLy8gMTAxMMKgwqDCoMKgwqDCoMKgwqDCoCDpnIDopoHmianlsZXCoMKgwqDCoMKgwqDCoCDlvZPlupTnlKjnqIvluo/pnIDopoHkuIDkuKrmiJbogIXlpJrkuKrmnI3liqHlmajml6Dms5XljY/llYbnmoTnibnmrormianlsZXml7bvvIzku47lrqLmiLfnq6/vvIjmtY/op4jlmajvvInlj5HpgIHov5nkuIDku6PnoIFcclxuXHJcbiAgICAgICAgICAgIC8vIDEwMTHCoMKgwqDCoMKgwqDCoMKgwqAg5oSP5aSW5oOF5Ya1wqDCoMKgwqDCoMKgIOW9k+W6lOeUqOeoi+W6j+eUseS6juS4jeWPr+mihOingeeahOWOn+WboO+8jOaXoOazlee7p+e7reWkhOeQhui/nuaOpeaXtu+8jOWPkemAgei/meS4gOS7o+eggVxyXG5cclxuICAgICAgICAgICAgLy8gMTAxNcKgwqDCoMKgwqAgVExT5aSx6LSl77yI5L+d55WZ77yJIOS4jeimgeWPkemAgei/meS4quS7o+eggeOAgldlYlNvY2tldCBBUEkg55So6L+Z5Liq5Luj56CB6KGo56S6IFRMUyDlnKggV2ViU29ja2V0IOaPoeaJi+S5i+WJjeWksei0peOAglxyXG5cclxuICAgICAgICAgICAgLy8gMCDvvZ4gOTk5wqDCoMKgwqDCoMKgwqAg56aB5q2iwqDCoMKgwqDCoMKgwqDCoMKgwqDCoMKgwqAgMTAwMCDku6XkuIvnmoTku6PnoIHmmK/ml6DmlYjnmoTvvIzkuI3og73nlKjkuo7ku7vkvZXnm67nmoRcclxuXHJcbiAgICAgICAgICAgIC8vIDEwMDAg772eIDI5OTnCoMKgwqAg5L+d55WZwqDCoMKgwqDCoMKgwqDCoMKgwqDCoMKgwqAg6L+Z5Lqb5Luj56CB5L+d55WZ5Lul55So5LqO5omp5bGV5ZKMIFdlYlNvY2tldCDljY/orq7nmoTkv67orqLniYjmnKzjgILmjInnhafmoIflh4bop4Tlrprkvb/nlKjov5nkupvku6PnoIHvvIzlj4Lop4HooaggMy00XHJcblxyXG4gICAgICAgICAgICAvLyAzMDAwIO+9niAzOTk5wqDCoCDpnIDopoHms6jlhozCoMKgwqDCoMKgwqDCoMKgwqAg6L+Z5Lqb5Luj56CB55So5LqO4oCc56iL5bqP5bqT44CB5qGG5p625ZKM5bqU55So56iL5bqP4oCd44CC6L+Z5Lqb5Luj56CB5bqU6K+l5ZyoIElBTkHvvIjkupLogZTnvZHnvJblj7fliIbphY3mnLrmnoTvvInlhazlvIDms6jlhoxcclxuXHJcbiAgICAgICAgICAgIC8vIDQwMDAg772eIDQ5OTnCoMKgIOengeacicKgwqDCoMKgwqDCoMKgwqDCoCDCoMKgwqDlnKjlupTnlKjnqIvluo/kuK3lsIbov5nkupvku6PnoIHnlKjkuo7oh6rlrprkuYnnlKjpgJTjgILlm6DkuLrlroPku6zmsqHmnInms6jlhozvvIzmiYDku6XkuI3opoHmnJ/mnJvlroPku6zog73ooqvlhbbku5YgV2ViU29ja2V05bm/5rOb55CG6KejXHJcblxyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzb2NrZXTlt7Lmlq3lvIDvvJpcIiArIHRoaXMubmFtZSwgSlNPTi5zdHJpbmdpZnkoZSkpO1xyXG4gICAgICAgICAgICBrYWF5b3UuZW1pdCh0aGlzLm5hbWUsIFwid3M6Om9uQ2xvc2VcIiwgdGhpcy5faXNJbml0aWF0aXZlID8geyBuYW1lOiB0aGlzLm5hbWUsIGNvZGU6IDEwMDAgfSA6IHsgbmFtZTogdGhpcy5uYW1lLCBjb2RlOiAyMDAwIH0pO1xyXG4gICAgICAgICAgICB0aGlzLndzID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5faXNEb0Nsb3NlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIF9pc0RvQ2xvc2UgPSBmYWxzZTtcclxuICAgICAgICBwdWJsaWMgY2xvc2UoZGF0YT86IHsgSW5pdGlhdGl2ZTogYm9vbGVhbiB9KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX19jbGVhclQoKTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLndzKSB7IHJldHVybjsgfVxyXG4gICAgICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faXNJbml0aWF0aXZlID0gISFkYXRhLkluaXRpYXRpdmU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pc0luaXRpYXRpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5faXNJbml0aWF0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pc0Nvbm5lY3RlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX2lzRG9DbG9zZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMud3Mub25vcGVuID0gZnVuY3Rpb24gKCkgeyB9O1xyXG4gICAgICAgICAgICB0aGlzLndzLm9ubWVzc2FnZSA9IGZ1bmN0aW9uICgpIHsgfTtcclxuICAgICAgICAgICAgdGhpcy53cy5vbmNsb3NlID0gZnVuY3Rpb24gKCkgeyB9O1xyXG4gICAgICAgICAgICB0aGlzLndzLm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7IH07XHJcbiAgICAgICAgICAgIHRoaXMud3MuY2xvc2UoKTtcclxuICAgICAgICAgICAgdGhpcy53cyA9IG51bGw7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2xvc2Ugc29ja2V0OlwiICsgdGhpcy5uYW1lLCB0aGlzLl9pc0luaXRpYXRpdmUpO1xyXG4gICAgICAgICAgICBrYWF5b3UuZW1pdCh0aGlzLm5hbWUsIFwid3M6Om9uQ2xvc2VcIiwgdGhpcy5faXNJbml0aWF0aXZlID8geyBuYW1lOiB0aGlzLm5hbWUsIGNvZGU6IDEwMDAgfSA6IHsgbmFtZTogdGhpcy5uYW1lLCBjb2RlOiAyMDAwIH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzZW5kKGRhdGE6IHsgbXNnaGVhZDogc3RyaW5nLCBtc2dkYXRhPzogYW55IH0pIHtcclxuXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5pc09wZW5kKCkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGB0aGUgJHt0aGlzLm5hbWV9IHNvY2tldCBpcyBjbG9zZWQgY2FuIG5vdCBzZW5kIG1lc3NhZ2VgKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIWRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJtZXNzYWdlIGlzIHVuZGVmaW5lXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghZGF0YS5tc2doZWFkKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwibXNnaGVhZCBpcyB1bmRlZmluZVwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZGF0YS5tc2dkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInNvY2tldOWPkemAgeeahOaVsOaNrlwiLCBkYXRhLm1zZ2RhdGEpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRvRGF0YTogeyBoZWFkOiBzdHJpbmcsIGRhdGE/OiBzdHJpbmcgfSA9IHtcclxuICAgICAgICAgICAgICAgICAgICBoZWFkOiBkYXRhLm1zZ2hlYWRcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLm1zZ2RhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0b0RhdGEuZGF0YSA9IEpTT04uc3RyaW5naWZ5KGRhdGEubXNnZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0b0RhdGEuZGF0YSA9IEFFUy5lbmNyeXB0KHRvRGF0YS5kYXRhKTtcclxuICAgICAgICAgICAgICAgIHRvRGF0YVtcIm1zZ3NpZ25cIl0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0aW1lXCI6IG5ldyBEYXRlKCkuZ2V0VGltZSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZW5jb2RlXCI6IDFcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChcInBpbmdcIiA9PSB0b0RhdGEuaGVhZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2codGhpcy5uYW1lICwgJ3BpbmcnICk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2VuZE1lc3NhZ2U65Y+R6YCBXCIgKyB0aGlzLm5hbWUsIHRvRGF0YSwgSlNPTi5zdHJpbmdpZnkodG9EYXRhKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy53cy5zZW5kKEpTT04uc3RyaW5naWZ5KHRvRGF0YSkpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vICBsZXQgYnVmID0gbmV3IGthQnVmZmVyKDQgKyBsZW4pO1xyXG4gICAgICAgICAgICAvLyAgYnVmLnJlc2V0KCk7XHJcbiAgICAgICAgICAgIC8vIC8vIGJ1Zi53aXJ0ZVNvcnQobWlkKTtcclxuICAgICAgICAgICAgLy8gLy8gYnVmLndpcnRlU29ydChzaWQpO1xyXG4gICAgICAgICAgICAvLyAvLyBidWYud2lydGVVaW50KGxlbik7XHJcbiAgICAgICAgICAgIC8vIC8vIGJ1Zi5PZmZzZXQgPSAxMDtcclxuICAgICAgICAgICAgLy8gLy8gYnVmLndpcnRlQnl0ZUFycmF5KGJ1ZmYsIDAsIGxlbik7XHJcbiAgICAgICAgICAgIC8vIC8vIGJ1Zi5PZmZzZXQgPSA0O1xyXG4gICAgICAgICAgICAvLyBidWYud2lydGVVU29ydChtaWQpO1xyXG4gICAgICAgICAgICAvLyBidWYud2lydGVVU29ydChzaWQpO1xyXG4gICAgICAgICAgICAvLyBidWYud2lydGVCeXRlQXJyYXkoYnVmZiwgMCwgbGVuKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHRoaXMud3Muc2VuZChidWYuYnVmZmVyKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGNjLmxvZyhuZXcgVWludDhBcnJheShidWYuYnVmZmVyKSk7IFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG5cclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJTb2NrZXQudHNcIiAvPlxyXG5uYW1lc3BhY2Uga2FheW91IHtcclxuICAgIGludGVyZmFjZSBfX0lSZWNvbmVjdF9fIHtcclxuICAgICAgICBkZWxheXRpbWU6IG51bWJlcixcclxuICAgICAgICBjb3VudDogbnVtYmVyXHJcbiAgICB9XHJcbiAgICBpbnRlcmZhY2UgX19JTmV0RXZlbnRfXyB7XHJcbiAgICAgICAgbmFtZTogc3RyaW5nLFxyXG4gICAgICAgIHR5cGU6IG51bWJlcixcclxuICAgICAgICBleHQ6IGFueVxyXG4gICAgfVxyXG4gICAgZXhwb3J0IGNsYXNzIE5ldE1hbmFnZXIge1xyXG4gICAgICAgIHN0YXRpYyBfX0lOU19fOiBOZXRNYW5hZ2VyID0gbnVsbDtcclxuICAgICAgICBzdGF0aWMgZ2V0SW5zdGFuY2UoKSB7XHJcbiAgICAgICAgICAgIGlmIChOZXRNYW5hZ2VyLl9fSU5TX18gPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgTmV0TWFuYWdlci5fX0lOU19fID0gbmV3IE5ldE1hbmFnZXIoKTtcclxuICAgICAgICAgICAgICAgIE5ldE1hbmFnZXIuX19JTlNfXy5pbml0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIE5ldE1hbmFnZXIuX19JTlNfXztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjdG9yKC4uLmFyZ3MpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBkZXNjcmlwdGlvbigpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJOZXRNYW5hZ2VyXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgX2V2ZW50UG9vbDogX19JTmV0RXZlbnRfX1tdID0gbnVsbDtcclxuICAgICAgICBpbml0KCkge1xyXG4gICAgICAgICAgICB0aGlzLl9ldmVudFBvb2wgPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5ydW5pbmdTb2NrZXRzID0ge307XHJcbiAgICAgICAgICAgIHRoaXMuX25lZWRSZUNvbm5lY3RTb2NrZXRzID0ge307XHJcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLmdldFNjaGVkdWxlcigpLnNjaGVkdWxlVXBkYXRlRm9yVGFyZ2V0KHRoaXMsIGNjLlNjaGVkdWxlci5QUklPUklUWV9OT05fU1lTVEVNLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIF9fd2F0Y2hUaW1lID0gMDtcclxuICAgICAgICB1cGRhdGUoZHQ6IG51bWJlcikge1xyXG4gICAgICAgICAgICB0aGlzLl9fd2F0Y2hUaW1lICs9IGR0O1xyXG4gICAgICAgICAgICB0aGlzLmRvUG9vbCgpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fX3dhdGNoVGltZSA8IDAuMykgeyByZXR1cm47IH1cclxuICAgICAgICAgICAgdGhpcy5fX3dhdGNoVGltZSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuaXNEaXNjb25uZWN0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tSZUNvbm5lY3QoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBfbmVlZFJlQ29ubmVjdFNvY2tldHM6IHsgW2tleTogc3RyaW5nXTogX19JUmVjb25lY3RfXyB9ID0gbnVsbDtcclxuICAgICAgICBjaGVja1JlQ29ubmVjdCgpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgeCBpbiB0aGlzLl9uZWVkUmVDb25uZWN0U29ja2V0cykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHQgPSBEYXRlLnVuaXgoKTtcclxuICAgICAgICAgICAgICAgIGlmICh0IC0gdGhpcy5fbmVlZFJlQ29ubmVjdFNvY2tldHNbeF0uZGVsYXl0aW1lID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX25lZWRSZUNvbm5lY3RTb2NrZXRzW3hdLmRlbGF5dGltZSA9IHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kb1JlQ29ubmVjdCh4KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoeCAhPSBcImxvYmJ5XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAga2FheW91LmVtaXQoeCwgYHdzOjpNc2c6OnBpbmdgLCB7d3NuYW1lOngsbXM6NDYwfSk7ICBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgX21heFJlQ29ubmVjdENvdW50OiBudW1iZXIgPSAyMDtcclxuICAgICAgICBfcmVDb25Db25maWcgPSB7fTtcclxuICAgICAgICBkb1JlQ29ubmVjdChuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICBsZXQgb3B0aW9uczogY29tbW9uLklESUFMT0dfT1BUSU9OID0ge1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBtc2c6IFwi5oKo55qE572R57uc5bey5pat5byA77yM6K+36YeN6K+V77yBXCIsXHJcbiAgICAgICAgICAgICAgICBjbG9zZToge1xyXG4gICAgICAgICAgICAgICAgICAgIGlzU2hvdzogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGlzbXV0dWFsOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgbXV0dWFsa2V5OiBcInNvY2tldHJlY29ubmN0XCIsXHJcbiAgICAgICAgICAgICAgICBidG5zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIumHjeivlVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNlbGYuX25lZWRSZUNvbm5lY3RTb2NrZXRzW25hbWVdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIGRlbGF5dGltZTogRGF0ZS51bml4KCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgY291bnQ6IDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLl9yZUNvbkNvbmZpZ1tuYW1lXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuX3JlQ29uQ29uZmlnW25hbWVdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5nZXRTb2NrZXQobmFtZSkuZG9Db25uZWN0KHNlbGYuX3JlQ29uQ29uZmlnW25hbWVdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgb3B0aW9uc1QgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1zZzogXCLmgqjnmoTnvZHnu5zkuI3nqLPlrprvvIzmraPlnKjlsJ3or5Xph43mlrDov57mjqXmnI3liqHlmaggXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWU6IDMwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGthYXlvdS5lbWl0KCdjb21tb24nLCAndWk6OkxvYWRpbmc6OlNob3cnLCBvcHRpb25zVCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LmJpbmQodGhpcyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yVHlwZTogJ2dyZWVuJ1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9yZUNvbkNvbmZpZ1tuYW1lXSA9IG51bGw7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9uZWVkUmVDb25uZWN0U29ja2V0c1tuYW1lXS5jb3VudCA+PSB0aGlzLl9tYXhSZUNvbm5lY3RDb3VudCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVDb25Db25maWdbbmFtZV0gPSB0aGlzLnJ1bmluZ1NvY2tldHNbbmFtZV0uZ2V0Y29uQ29uZmlnKCk7XHJcbiAgICAgICAgICAgICAgICBOZXRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZGVsZXRlU29ja2V0KG5hbWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbmVlZFJlQ29ubmVjdFNvY2tldHNbbmFtZV0gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuX25lZWRSZUNvbm5lY3RTb2NrZXRzW25hbWVdO1xyXG4gICAgICAgICAgICAgICAga2FheW91LmVtaXQoJ2NvbW1vbicsIFwidWk6OkRpYWxvZzo6U2hvd1wiLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICArK3RoaXMuX25lZWRSZUNvbm5lY3RTb2NrZXRzW25hbWVdLmNvdW50O1xyXG4gICAgICAgICAgICBsZXQgb3B0aW9uc1QgPSB7XHJcbiAgICAgICAgICAgICAgICBtc2c6IFwi5oKo55qE572R57uc5LiN56iz5a6a77yM5q2j5Zyo5bCd6K+V6YeN5paw6L+e5o6l5pyN5Yqh5ZmoIFwiLFxyXG4gICAgICAgICAgICAgICAgdGltZTogNVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGthYXlvdS5lbWl0KCdjb21tb24nLCAndWk6OkxvYWRpbmc6OlNob3cnLCBvcHRpb25zVCk7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5ydW5pbmdTb2NrZXRzW25hbWVdKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9uZWVkUmVDb25uZWN0U29ja2V0c1tuYW1lXSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fbmVlZFJlQ29ubmVjdFNvY2tldHNbbmFtZV07XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5ydW5pbmdTb2NrZXRzW25hbWVdLmRvUmVjb25uZWN0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjbGVhbk5lZWRDb25uZWN0KG5hbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5fbmVlZFJlQ29ubmVjdFNvY2tldHNbbmFtZV1cclxuICAgICAgICB9XHJcbiAgICAgICAgb25Xc0Nvbm5lY3RFdmVudChldmVudDoga2FheW91LkV2ZW50KSB7XHJcbiAgICAgICAgICAgIGxldCBkYXRhOiB7IG5hbWU6IHN0cmluZyB9ID0gZXZlbnQuZGF0YTtcclxuICAgICAgICAgICAgaWYgKCFkYXRhKSB7IHJldHVybjsgfVxyXG4gICAgICAgICAgICB0aGlzLl9ldmVudFBvb2wucHVzaCh7IG5hbWU6IGRhdGEubmFtZSwgdHlwZTogMSwgZXh0OiBudWxsIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBvbldzQ2xvc2VFdmVudChldmVudDoga2FheW91LkV2ZW50KSB7XHJcbiAgICAgICAgICAgIGxldCBkYXRhOiB7IG5hbWU6IHN0cmluZywgY29kZTogbnVtYmVyIH0gPSBldmVudC5kYXRhO1xyXG4gICAgICAgICAgICBpZiAoIWRhdGEpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgICAgIGlmICghbG9kYXNoLmlzRW1wdHkoZGF0YS5uYW1lKSAmJiBkYXRhLmNvZGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50UG9vbC5wdXNoKHsgbmFtZTogZGF0YS5uYW1lLCB0eXBlOiAyLCBleHQ6IGRhdGEuY29kZSB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gaWYgKGRhdGEuY29kZSAhPSAxMDAwICYmICFsb2Rhc2guaXNFbXB0eShkYXRhLm5hbWUpKSB7XHJcbiAgICAgICAgICAgIC8vICAgICBsZXQgcyA9IHRoaXMucnVuaW5nU29ja2V0c1tkYXRhLm5hbWVdO1xyXG4gICAgICAgICAgICAvLyAgICAgaWYgKCFzKSB7IHJldHVybjsgfVxyXG4gICAgICAgICAgICAvLyAgICAgY29uc29sZS5lcnJvcihkYXRhLm5hbWUgKyBcIuaEj+WkluaWreW8gFwiKTtcclxuXHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZG9Qb29sKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fZXZlbnRQb29sLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGxldCBuID0gdGhpcy5fZXZlbnRQb29sLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIHdoaWxlIChuID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBlID0gdGhpcy5fZXZlbnRQb29sLnNoaWZ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbiA9IHRoaXMuX2V2ZW50UG9vbC5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFlKSB7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKDEgPT0gZS50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX25lZWRSZUNvbm5lY3RTb2NrZXRzW2UubmFtZV0gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fbmVlZFJlQ29ubmVjdFNvY2tldHNbZS5uYW1lXTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKDIgPT0gZS50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlLmV4dCAhPSAxMDAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGUubmFtZSArIFwi5oSP5aSW5pat5byAXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9uZWVkUmVDb25uZWN0U29ja2V0c1tlLm5hbWVdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbmVlZFJlQ29ubmVjdFNvY2tldHNbZS5uYW1lXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsYXl0aW1lOiBEYXRlLnVuaXgoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY291bnQ6IDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXNEaXNjb25uZWN0KCkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciB4IGluIHRoaXMucnVuaW5nU29ja2V0cykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHMgPSB0aGlzLnJ1bmluZ1NvY2tldHNbeF07XHJcbiAgICAgICAgICAgICAgICBpZiAoIXMpIHsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgIGlmICh0cnVlID09IHMuZ2V0SXNDb25uZWN0ZWQoKSAmJiBmYWxzZSA9PSBzLmdldEluaXRpYXRpdmUoKS8qJiYgZmFsc2UgPT0gcy5jaGVja0xpZmUoKSAmJiAqLykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8v6K+05piO5piv5bey5ZCv5Yqo55qEc29cclxuICAgICAgICAgICAgICAgICAgICBpZiAoRGF0ZS51bml4KCkgLSBzLmdldExhc3RUaW1lKCkgPiAxNSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzLmNsb3NlKHsgSW5pdGlhdGl2ZTogZmFsc2UgfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBydW5pbmdTb2NrZXRzOiB7IFtrZXk6IHN0cmluZ106IGthYXlvdS5rYVdlYlNvY2tldCB9ID0ge307XHJcbiAgICAgICAgZ2V0U29ja2V0KG5hbWU6IHN0cmluZyk6IGthYXlvdS5rYVdlYlNvY2tldCB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5ydW5pbmdTb2NrZXRzW25hbWVdKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJ1bmluZ1NvY2tldHNbbmFtZV0gPSBuZXcga2FXZWJTb2NrZXQobmFtZSk7XHJcbiAgICAgICAgICAgICAgICBrYWF5b3UuZ2V0Q29udHJvbGxlcihuYW1lKS5vbihcIndzOjpvbkNsb3NlXCIsIHRoaXMub25Xc0Nsb3NlRXZlbnQsIHRoaXMpO1xyXG4gICAgICAgICAgICAgICAga2FheW91LmdldENvbnRyb2xsZXIobmFtZSkub24oXCJ3czo6b25Db25uZWN0XCIsIHRoaXMub25Xc0Nvbm5lY3RFdmVudCwgdGhpcyk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5ydW5pbmdTb2NrZXRzW25hbWVdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkZWxldGVBbGxTb2NrZXQoKSB7XHJcbiAgICAgICAgICAgIGxldCBrZXlzID0gT2JqZWN0LmtleXModGhpcy5ydW5pbmdTb2NrZXRzKTtcclxuICAgICAgICAgICAgZm9yICh2YXIgeCBpbiBrZXlzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlbGV0ZVNvY2tldChrZXlzW3hdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBkZWxldGVTb2NrZXQobmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5ydW5pbmdTb2NrZXRzW25hbWVdKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5ydW5pbmdTb2NrZXRzW25hbWVdLmNsb3NlKHsgSW5pdGlhdGl2ZTogdHJ1ZSB9KTtcclxuICAgICAgICAgICAga2FheW91LmdldENvbnRyb2xsZXIobmFtZSkub2ZmQnl0YXJnZXIoXCJ3czo6b25DbG9zZVwiLCB0aGlzKTtcclxuICAgICAgICAgICAga2FheW91LmdldENvbnRyb2xsZXIobmFtZSkub2ZmQnl0YXJnZXIoXCJ3czo6b25Db25uZWN0XCIsIHRoaXMpO1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5ydW5pbmdTb2NrZXRzW25hbWVdO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fbmVlZFJlQ29ubmVjdFNvY2tldHNbbmFtZV0pIHtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9uZWVkUmVDb25uZWN0U29ja2V0c1tuYW1lXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHNlbmRNZXNzYWdlKGNvbmFtZSwgaGVhZCwgZGF0YT86IGFueSwgcmVzaGVhZD86IHN0cmluZywgY2FsbGJhY2s/OiBGdW5jdGlvbiwgdGFyZ2V0PzogYW55KSB7XHJcbiAgICAgICAgdmFyIHBybyA9IG51bGw7XHJcbiAgICAgICAgaWYgKHJlc2hlYWQpIHtcclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBrYWF5b3UuZ2V0Q29udHJvbGxlcihjb25hbWUpLm9uZWNlKHJlc2hlYWQsIGZ1bmN0aW9uIChlOiBrYWF5b3UuRXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrLmFwcGx5KHRhcmdldCwgW2UuZGF0YV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGUuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwgdGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgIE5ldE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTb2NrZXQoY29uYW1lKS5zZW5kKHtcclxuICAgICAgICAgICAgICAgICAgICBtc2doZWFkOiBoZWFkLFxyXG4gICAgICAgICAgICAgICAgICAgIG1zZ2RhdGE6IGRhdGEgPyBkYXRhIDogbnVsbFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcHJvID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sZSwgcmVqY3QpIHtcclxuICAgICAgICAgICAgICAgICAgICBrYWF5b3UuZ2V0Q29udHJvbGxlcihjb25hbWUpLm9uZWNlKHJlc2hlYWQsIGZ1bmN0aW9uIChlOiBrYWF5b3UuRXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2suYXBwbHkodGFyZ2V0LCBbZS5kYXRhXSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhlLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sZShlLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIHRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgTmV0TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNvY2tldChjb25hbWUpLnNlbmQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtc2doZWFkOiBoZWFkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtc2dkYXRhOiBkYXRhID8gZGF0YSA6IG51bGxcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBybztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBOZXRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U29ja2V0KGNvbmFtZSkuc2VuZCh7XHJcbiAgICAgICAgICAgICAgICBtc2doZWFkOiBoZWFkLFxyXG4gICAgICAgICAgICAgICAgbXNnZGF0YTogZGF0YSA/IGRhdGEgOiBudWxsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcHJvO1xyXG5cclxuICAgIH1cclxuXHJcbn0iLCJuYW1lc3BhY2Uga2FheW91IHtcclxuXHJcblxyXG4gICAgZXhwb3J0IG5hbWVzcGFjZSBwb29sIHtcclxuXHJcblxyXG5cclxuICAgICAgICB2YXIgX2NsYXNzUElEID0gKDAgfCAoTWF0aC5yYW5kb20oKSAqIDk5OCkpO1xyXG4gICAgICAgIGZ1bmN0aW9uIGdldE5ld1BJRCgpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gX2NsYXNzUElEKys7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBnZXRUYXJnZXRQSUQodGFyZ2V0KTogbnVtYmVyIHtcclxuICAgICAgICAgICAgdmFyIHBpZCA9IDA7XHJcbiAgICAgICAgICAgIGlmICh0YXJnZXQuY29uc3RydWN0b3IuaGFzT3duUHJvcGVydHkoJ19fcGlkJykpIHtcclxuICAgICAgICAgICAgICAgIHBpZCA9IHRhcmdldC5jb25zdHJ1Y3Rvci5fX3BpZDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCFwaWQpIHtcclxuICAgICAgICAgICAgICAgIHBpZCA9IGdldE5ld1BJRCgpO1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0LmNvbnN0cnVjdG9yLl9fcGlkID0gcGlkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBwaWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBnZXRDbGFzc1BJRCh0YXJnZXQpOiBudW1iZXIge1xyXG4gICAgICAgICAgICB2YXIgcGlkID0gMDtcclxuICAgICAgICAgICAgaWYgKHRhcmdldC5oYXNPd25Qcm9wZXJ0eSgnX19waWQnKSkge1xyXG4gICAgICAgICAgICAgICAgcGlkID0gdGFyZ2V0Ll9fcGlkO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIXBpZCkge1xyXG4gICAgICAgICAgICAgICAgcGlkID0gZ2V0TmV3UElEKCk7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQuX19waWQgPSBwaWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHBpZDtcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgdmFyIF9wb29sID0ge307XHJcbiAgICAgICAgZnVuY3Rpb24gX3JlbGVhc2VDQigpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWxlYXNlKCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBcclxuICAgICAgICBmdW5jdGlvbiBfYXV0b1JlbGVhc2Uob2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBydW5uaW5nID0gb2JqLl9ydW5uaW5nID09PSB1bmRlZmluZWQgPyBmYWxzZSA6ICFvYmouX3J1bm5pbmc7XHJcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLmdldFNjaGVkdWxlcigpLnNjaGVkdWxlQ2FsbGJhY2tGb3JUYXJnZXQob2JqLCBfcmVsZWFzZUNCLCAwLCAwLCAwLCBydW5uaW5nKVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGV4cG9ydCBmdW5jdGlvbiBwdXRJblBvb2wob2JqKSB7XHJcbiAgICAgICAgICAgIC8vIHZhciBwaWQgPSBvYmouY29uc3RydWN0b3IucHJvdG90eXBlLl9fcGlkO1xyXG4gICAgICAgICAgICAvLyBpZiAoIXBpZCkge1xyXG4gICAgICAgICAgICAvLyAgICAgdmFyIGRlc2MgPSB7IHdyaXRhYmxlOiB0cnVlLCBlbnVtZXJhYmxlOiBmYWxzZSwgY29uZmlndXJhYmxlOiB0cnVlLCB2YWx1ZTogLTEgfTtcclxuICAgICAgICAgICAgLy8gICAgIHBpZCA9IGNsYXNzTWFuYWdlci5nZXROZXdJRCgpO1xyXG4gICAgICAgICAgICAvLyAgICAgZGVzYy52YWx1ZSA9IHBpZDtcclxuICAgICAgICAgICAgLy8gICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmouY29uc3RydWN0b3IucHJvdG90eXBlLCAnX19waWQnLCBkZXNjKTtcclxuICAgICAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICAgICAgLy8gdmFyIHBpZCA9IDA7XHJcbiAgICAgICAgICAgIC8vIGlmIChvYmouY29uc3RydWN0b3IuaGFzT3duUHJvcGVydHkoJ19fcGlkJykpIHtcclxuICAgICAgICAgICAgLy8gICAgIHBpZCA9IG9iai5jb25zdHJ1Y3Rvci5fX3BpZDtcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAvLyAvLyBpZiAodGFyZ2V0LmNvbnN0cnVjdG9yLm5hbWUgPT0gJ0NyZWF0ZVJvb21QYW5lbCcpIHtcclxuICAgICAgICAgICAgLy8gLy8gICAgIGNvbnNvbGUuZXJyb3IoXCJDcmVhdGVSb29tUGFuZWxcIiwgZGlkKVxyXG4gICAgICAgICAgICAvLyAvLyB9XHJcbiAgICAgICAgICAgIC8vIGlmICghcGlkKSB7XHJcbiAgICAgICAgICAgIC8vICAgICBwaWQgPSBjbGFzc01hbmFnZXIuZ2V0TmV3SUQoKTtcclxuICAgICAgICAgICAgLy8gICAgIG9iai5jb25zdHJ1Y3Rvci5fX3BpZCA9IHBpZDtcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICB2YXIgcGlkID0gZ2V0VGFyZ2V0UElEKG9iaik7XHJcbiAgICAgICAgICAgIGlmICghX3Bvb2xbcGlkXSkge1xyXG4gICAgICAgICAgICAgICAgX3Bvb2xbcGlkXSA9IFtdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIEpTQiByZXRhaW4gdG8gYXZvaWQgYmVpbmcgYXV0byByZWxlYXNlZFxyXG4gICAgICAgICAgICBvYmoucmV0YWluICYmIG9iai5yZXRhaW4oKTtcclxuICAgICAgICAgICAgLy8gVXNlciBpbXBsZW1lbnRhdGlvbiBmb3IgZGlzYWJsZSB0aGUgb2JqZWN0XHJcbiAgICAgICAgICAgIG9iai51bnVzZSAmJiBvYmoudW51c2UoKTtcclxuICAgICAgICAgICAgX3Bvb2xbcGlkXS5wdXNoKG9iaik7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgIGV4cG9ydCBmdW5jdGlvbiBwdXRBbGxDaGlsZHJlbkluUG9vbChvYmo6Y2MuTm9kZSkge1xyXG4gICAgICAgICAgICBsZXQgY2hpbGRyZW4gPSBsb2Rhc2guY2xvbmUob2JqLmdldENoaWxkcmVuKCkpO1xyXG4gICAgICAgICAgICBsb2Rhc2guZm9yRWFjaChjaGlsZHJlbiwgZnVuY3Rpb24gKHYpIHtcclxuICAgICAgICAgICAgICAgIGthYXlvdS5wb29sLnB1dEluUG9vbCh2KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBleHBvcnQgZnVuY3Rpb24gaGFzT2JqZWN0KG9iakNsYXNzKSB7XHJcbiAgICAgICAgICAgIHZhciBwaWQgPSBnZXRDbGFzc1BJRChvYmpDbGFzcyk7XHJcbiAgICAgICAgICAgIHZhciBsaXN0ID0gX3Bvb2xbcGlkXTtcclxuICAgICAgICAgICAgaWYgKCFsaXN0IHx8IGxpc3QubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGV4cG9ydCBmdW5jdGlvbiByZW1vdmVPYmplY3Qob2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBwaWQgPSBnZXRUYXJnZXRQSUQob2JqKTtcclxuICAgICAgICAgICAgaWYgKHBpZCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGxpc3QgPSBfcG9vbFtwaWRdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxpc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iaiA9PT0gbGlzdFtpXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSlNCIHJlbGVhc2UgdG8gYXZvaWQgbWVtb3J5IGxlYWtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5yZWxlYXNlICYmIG9iai5yZWxlYXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaXN0LnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUNsYXNzKG9iakNsYXNzKSB7XHJcbiAgICAgICAgICAgIGlmIChoYXNPYmplY3Qob2JqQ2xhc3MpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGlkID1nZXRDbGFzc1BJRChvYmpDbGFzcyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgbGlzdCA9IF9wb29sW3BpZF07XHJcbiAgICAgICAgICAgICAgICBpZihsaXN0KXtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RbaV0ucmVsZWFzZSAmJiBsaXN0W2ldLnJlbGVhc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgX3Bvb2xbcGlkXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBleHBvcnQgZnVuY3Rpb24gZ2V0RnJvbVBvb2wob2JqQ2xhc3MsLi4uYXJnKSB7XHJcbiAgICAgICAgICAgIGlmIChoYXNPYmplY3Qob2JqQ2xhc3MpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGlkID0gZ2V0Q2xhc3NQSUQob2JqQ2xhc3MpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGxpc3QgPSBfcG9vbFtwaWRdO1xyXG4gICAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xyXG4gICAgICAgICAgICAgICAgYXJncy5zaGlmdCgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIG9iaiA9IGxpc3QucG9wKCk7XHJcbiAgICAgICAgICAgICAgICBpZighb2JqKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIFVzZXIgaW1wbGVtZW50YXRpb24gZm9yIHJlLWVuYWJsZSB0aGUgb2JqZWN0XHJcbiAgICAgICAgICAgICAgICBvYmoucmV1c2UgJiYgb2JqLnJldXNlLmFwcGx5KG9iaiwgYXJncyk7XHJcbiAgICAgICAgICAgICAgICAvLyBKU0IgcmVsZWFzZSB0byBhdm9pZCBtZW1vcnkgbGVha1xyXG4gICAgICAgICAgICAgICAgY2Muc3lzLmlzTmF0aXZlICYmIG9iai5yZWxlYXNlICYmIF9hdXRvUmVsZWFzZShvYmopO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iajtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGV4cG9ydCBmdW5jdGlvbiBkcmFpbkFsbFBvb2xzICgpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBfcG9vbCkge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBfcG9vbFtpXS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBvYmogPSBfcG9vbFtpXVtqXTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBKU0IgcmVsZWFzZSB0byBhdm9pZCBtZW1vcnkgbGVha1xyXG4gICAgICAgICAgICAgICAgICAgIG9iai5yZWxlYXNlICYmIG9iai5yZWxlYXNlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgX3Bvb2wgPSB7fTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgIC8vIHZhciBwb29sMiA9IHtcclxuICAgIC8vICAgICBfcG9vbDoge30sXHJcblxyXG4gICAgLy8gICAgIF9yZWxlYXNlQ0I6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vICAgICAgICAgcmVsZWFzZSgpO1xyXG4gICAgLy8gICAgIH0sXHJcblxyXG4gICAgLy8gICAgIF9hdXRvUmVsZWFzZTogZnVuY3Rpb24gKG9iaikge1xyXG4gICAgLy8gICAgICAgICB2YXIgcnVubmluZyA9IG9iai5fcnVubmluZyA9PT0gdW5kZWZpbmVkID8gZmFsc2UgOiAhb2JqLl9ydW5uaW5nO1xyXG4gICAgLy8gICAgICAgICBjYy5kaXJlY3Rvci5nZXRTY2hlZHVsZXIoKS5zY2hlZHVsZUNhbGxiYWNrRm9yVGFyZ2V0KG9iaiwgX3JlbGVhc2VDQiwgMCwgMCwgMCwgcnVubmluZylcclxuICAgIC8vICAgICB9LFxyXG5cclxuICAgIC8vICAgICAvKipcclxuICAgIC8vICAgICAgKiBQdXQgdGhlIG9iaiBpbiBwb29sXHJcbiAgICAvLyAgICAgICogQHBhcmFtIG9ialxyXG4gICAgLy8gICAgICAqL1xyXG4gICAgLy8gICAgIHB1dEluUG9vbDogZnVuY3Rpb24gKG9iaikge1xyXG4gICAgLy8gICAgICAgICB2YXIgcGlkID0gb2JqLmNvbnN0cnVjdG9yLnByb3RvdHlwZS5fX3BpZDtcclxuICAgIC8vICAgICAgICAgaWYgKCFwaWQpIHtcclxuICAgIC8vICAgICAgICAgICAgIHZhciBkZXNjID0geyB3cml0YWJsZTogdHJ1ZSwgZW51bWVyYWJsZTogZmFsc2UsIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgdmFsdWU6IC0xIH07XHJcbiAgICAvLyAgICAgICAgICAgICBkZXNjLnZhbHVlID0gQ2xhc3NNYW5hZ2VyLmdldE5ld0lEKCk7XHJcbiAgICAvLyAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLmNvbnN0cnVjdG9yLnByb3RvdHlwZSwgJ19fcGlkJywgZGVzYyk7XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgaWYgKCFfcG9vbFtwaWRdKSB7XHJcbiAgICAvLyAgICAgICAgICAgICBfcG9vbFtwaWRdID0gW107XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgLy8gSlNCIHJldGFpbiB0byBhdm9pZCBiZWluZyBhdXRvIHJlbGVhc2VkXHJcbiAgICAvLyAgICAgICAgIG9iai5yZXRhaW4gJiYgb2JqLnJldGFpbigpO1xyXG4gICAgLy8gICAgICAgICAvLyBVc2VyIGltcGxlbWVudGF0aW9uIGZvciBkaXNhYmxlIHRoZSBvYmplY3RcclxuICAgIC8vICAgICAgICAgb2JqLnVudXNlICYmIG9iai51bnVzZSgpO1xyXG4gICAgLy8gICAgICAgICBfcG9vbFtwaWRdLnB1c2gob2JqKTtcclxuICAgIC8vICAgICB9LFxyXG5cclxuICAgIC8vICAgICAvKipcclxuICAgIC8vICAgICAgKiBDaGVjayBpZiB0aGlzIGtpbmQgb2Ygb2JqIGhhcyBhbHJlYWR5IGluIHBvb2xcclxuICAgIC8vICAgICAgKiBAcGFyYW0gb2JqQ2xhc3NcclxuICAgIC8vICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gaWYgdGhpcyBraW5kIG9mIG9iaiBpcyBhbHJlYWR5IGluIHBvb2wgcmV0dXJuIHRydWUsZWxzZSByZXR1cm4gZmFsc2U7XHJcbiAgICAvLyAgICAgICovXHJcbiAgICAvLyAgICAgaGFzT2JqZWN0OiBmdW5jdGlvbiAob2JqQ2xhc3MpIHtcclxuICAgIC8vICAgICAgICAgdmFyIHBpZCA9IG9iakNsYXNzLnByb3RvdHlwZS5fX3BpZDtcclxuICAgIC8vICAgICAgICAgdmFyIGxpc3QgPSBfcG9vbFtwaWRdO1xyXG4gICAgLy8gICAgICAgICBpZiAoIWxpc3QgfHwgbGlzdC5sZW5ndGggPT0gMCkge1xyXG4gICAgLy8gICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgLy8gICAgIH0sXHJcblxyXG4gICAgLy8gICAgIC8qKlxyXG4gICAgLy8gICAgICAqIFJlbW92ZSB0aGUgb2JqIGlmIHlvdSB3YW50IHRvIGRlbGV0ZSBpdDtcclxuICAgIC8vICAgICAgKiBAcGFyYW0gb2JqXHJcbiAgICAvLyAgICAgICovXHJcbiAgICAvLyAgICAgcmVtb3ZlT2JqZWN0OiBmdW5jdGlvbiAob2JqKSB7XHJcbiAgICAvLyAgICAgICAgIHZhciBwaWQgPSBvYmouY29uc3RydWN0b3IucHJvdG90eXBlLl9fcGlkO1xyXG4gICAgLy8gICAgICAgICBpZiAocGlkKSB7XHJcbiAgICAvLyAgICAgICAgICAgICB2YXIgbGlzdCA9IF9wb29sW3BpZF07XHJcbiAgICAvLyAgICAgICAgICAgICBpZiAobGlzdCkge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBpZiAob2JqID09PSBsaXN0W2ldKSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAvLyBKU0IgcmVsZWFzZSB0byBhdm9pZCBtZW1vcnkgbGVha1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgb2JqLnJlbGVhc2UgJiYgb2JqLnJlbGVhc2UoKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGxpc3Quc3BsaWNlKGksIDEpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgfSxcclxuXHJcbiAgICAvLyAgICAgLyoqXHJcbiAgICAvLyAgICAgICogR2V0IHRoZSBvYmogZnJvbSBwb29sXHJcbiAgICAvLyAgICAgICogQHBhcmFtIGFyZ3NcclxuICAgIC8vICAgICAgKiBAcmV0dXJucyB7Kn0gY2FsbCB0aGUgcmV1c2UgZnVuY3Rpb24gYW4gcmV0dXJuIHRoZSBvYmpcclxuICAgIC8vICAgICAgKi9cclxuICAgIC8vICAgICBnZXRGcm9tUG9vbDogZnVuY3Rpb24gKG9iakNsYXNzLyosYXJncyovKSB7XHJcbiAgICAvLyAgICAgICAgIGlmIChoYXNPYmplY3Qob2JqQ2xhc3MpKSB7XHJcbiAgICAvLyAgICAgICAgICAgICB2YXIgcGlkID0gb2JqQ2xhc3MucHJvdG90eXBlLl9fcGlkO1xyXG4gICAgLy8gICAgICAgICAgICAgdmFyIGxpc3QgPSBfcG9vbFtwaWRdO1xyXG4gICAgLy8gICAgICAgICAgICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xyXG4gICAgLy8gICAgICAgICAgICAgYXJncy5zaGlmdCgpO1xyXG4gICAgLy8gICAgICAgICAgICAgdmFyIG9iaiA9IGxpc3QucG9wKCk7XHJcbiAgICAvLyAgICAgICAgICAgICAvLyBVc2VyIGltcGxlbWVudGF0aW9uIGZvciByZS1lbmFibGUgdGhlIG9iamVjdFxyXG4gICAgLy8gICAgICAgICAgICAgb2JqLnJldXNlICYmIG9iai5yZXVzZS5hcHBseShvYmosIGFyZ3MpO1xyXG4gICAgLy8gICAgICAgICAgICAgLy8gSlNCIHJlbGVhc2UgdG8gYXZvaWQgbWVtb3J5IGxlYWtcclxuICAgIC8vICAgICAgICAgICAgIGNjLnN5cy5pc05hdGl2ZSAmJiBvYmoucmVsZWFzZSAmJiBfYXV0b1JlbGVhc2Uob2JqKTtcclxuICAgIC8vICAgICAgICAgICAgIHJldHVybiBvYmo7XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9LFxyXG5cclxuICAgIC8vICAgICAvKipcclxuICAgIC8vICAgICAgKiAgcmVtb3ZlIGFsbCBvYmpzIGluIHBvb2wgYW5kIHJlc2V0IHRoZSBwb29sXHJcbiAgICAvLyAgICAgICovXHJcbiAgICAvLyAgICAgZHJhaW5BbGxQb29sczogZnVuY3Rpb24gKCkge1xyXG4gICAgLy8gICAgICAgICBmb3IgKHZhciBpIGluIF9wb29sKSB7XHJcbiAgICAvLyAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IF9wb29sW2ldLmxlbmd0aDsgaisrKSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgdmFyIG9iaiA9IF9wb29sW2ldW2pdO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIC8vIEpTQiByZWxlYXNlIHRvIGF2b2lkIG1lbW9yeSBsZWFrXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgb2JqLnJlbGVhc2UgJiYgb2JqLnJlbGVhc2UoKTtcclxuICAgIC8vICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICBfcG9vbCA9IHt9O1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH07XHJcblxyXG59IiwiICAgIG5hbWVzcGFjZSBrYWF5b3Uge1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBSZXNNYW5hZ2VyIHtcclxuXHJcbiAgICAgICAgc3RhdGljIF9fSU5TX186IFJlc01hbmFnZXIgPSBudWxsO1xyXG4gICAgICAgIHN0YXRpYyBnZXRJbnN0YW5jZSgpIHtcclxuICAgICAgICAgICAgaWYgKFJlc01hbmFnZXIuX19JTlNfXyA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBSZXNNYW5hZ2VyLl9fSU5TX18gPSBuZXcgUmVzTWFuYWdlcigpO1xyXG4gICAgICAgICAgICAgICAgUmVzTWFuYWdlci5fX0lOU19fLmluaXQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gUmVzTWFuYWdlci5fX0lOU19fO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpbml0KCkgeyB9XHJcbiAgICAgICAgUkVTREI6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuICAgICAgICBwdXNoUmVzKHJlczogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuUkVTREIucHVzaChyZXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiZXh0ZW5kLnRzXCIgLz5cclxubmFtZXNwYWNlIGthYXlvdSB7XHJcbiAgICBjb25zdCB7IGNjY2xhc3MgfSA9IGthYXlvdS5fZGVjb3JhdG9yO1xyXG4gICAgQGNjY2xhc3NcclxuICAgIGV4cG9ydCBjbGFzcyBrU2NlbmUgZXh0ZW5kcyBjYy5MYXllciB7XHJcbiAgICAgICAgcHVibGljIG5vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgICAgIGN0b3IoKSB7XHJcbiAgICAgICAgICAgIHN1cGVyLmN0b3IoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaW5pdFdpdGhjY3MocGF0aD86IHN0cmluZykge1xyXG4gICAgICAgICAgICB0aGlzLnNldENvbnRlbnRTaXplKGNjLndpblNpemUpO1xyXG4gICAgICAgICAgICBsZXQgbWxheWVyID0gY2N1aS5MYXlvdXQuY3JlYXRlKCk7XHJcbiAgICAgICAgICAgIG1sYXllci5zZXRDb250ZW50U2l6ZShjYy53aW5TaXplKTtcclxuICAgICAgICAgICAgbWxheWVyLnNldFRvdWNoRW5hYmxlZCh0cnVlKTtcclxuICAgICAgICAgICAgbWxheWVyLnNldEFuY2hvclBvaW50KDAuNSwgMC41KTtcclxuICAgICAgICAgICAgbWxheWVyLnNldFBvc2l0aW9uKGNjLndpblNpemUud2lkdGggICogMC41LCBjYy53aW5TaXplLmhlaWdodCAgKiAwLjUpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZENoaWxkKG1sYXllcik7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLm5vZGUgPSBjY3MubG9hZChwYXRoLCBcInJlcy9cIikubm9kZTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnNldENvbnRlbnRTaXplKGNjLndpblNpemUpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24oY2Mud2luU2l6ZS53aWR0aCAvIDIgLSB0aGlzLm5vZGUud2lkdGggLyAyLCBjYy53aW5TaXplLmhlaWdodCAvIDIgLSB0aGlzLm5vZGUuaGVpZ2h0IC8gMik7XHJcbiAgICAgICAgICAgIGNjdWkuaGVscGVyLmRvTGF5b3V0KHRoaXMubm9kZSk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5ub2RlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIG9uUmVFbnRlcigpIHsgfVxyXG4gICAgICAgIHB1YmxpYyBvblJlRXhpdCgpIHsgfVxyXG4gICAgfVxyXG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cImV4dGVuZC50c1wiIC8+XHJcbm5hbWVzcGFjZSBrYWF5b3Uge1xyXG4gICAgY29uc3QgeyBjY2NsYXNzIH0gPSBrYWF5b3UuX2RlY29yYXRvcjtcclxuICAgIEBjY2NsYXNzXHJcbiAgICBleHBvcnQgY2xhc3MgU2Nyb2xsVmlldyBleHRlbmRzIGNjdWkuU2Nyb2xsVmlldyB7XHJcbiAgICAgICAgY3RvcigpIHtcclxuICAgICAgICAgICAgc3VwZXIuY3RvcigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuLy8gICBleHBvcnQgY2xhc3MgQ3V0dGluZ1Njcm9sbFZpZXcgZXh0ZW5kcyBrYWF5b3UuU2Nyb2xsVmlldyB7XHJcbi8vICAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbi8vICAgICAgICAgICAgIHN1cGVyKCk7XHJcbi8vICAgICAgICAgICAgIHRoaXMucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcclxuLy8gICAgICAgICAgICAgdGhpcy5zZXREaXJlY3Rpb24oY2N1aS5TY3JvbGxWaWV3LkRJUl9WRVJUSUNBTCk7XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICAgIC8qKlxyXG4vLyAgICAgICAgICAqIEFkZCBjaGlsZCB0byBjY3VpLlNjcm9sbFZpZXcuXHJcbi8vICAgICAgICAgICogQHBhcmFtIHtjYy5Ob2RlfSB3aWRnZXRcclxuLy8gICAgICAgICAgKiBAcGFyYW0ge051bWJlcn0gW3pPcmRlcl1cclxuLy8gICAgICAgICAgKiBAcGFyYW0ge051bWJlcnxzdHJpbmd9IFt0YWddIHRhZyBvciBuYW1lXHJcbi8vICAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbi8vICAgICAgICAgICovXHJcbi8vICAgICAgICAgYWRkQ2hpbGQod2lkZ2V0LCB6T3JkZXI/LCB0YWc/KSB7XHJcbi8vICAgICAgICAgICAgIC8vIGlmICghd2lkZ2V0KVxyXG4vLyAgICAgICAgICAgICAvLyAgICAgcmV0dXJuIGZhbHNlO1xyXG4vLyAgICAgICAgICAgICAvLyBpZiAodGhpcy5faXNJbkNvbnRhaW5lcih3aWRnZXQpID09PSBmYWxzZSlcclxuLy8gICAgICAgICAgICAgLy8gICAgIHdpZGdldC5faW5WaWV3UmVjdCA9IGZhbHNlO1xyXG4vLyAgICAgICAgICAgICAvLyB6T3JkZXIgPSB6T3JkZXIgfHwgd2lkZ2V0LmdldExvY2FsWk9yZGVyKCk7XHJcbi8vICAgICAgICAgICAgIC8vIHRhZyA9IHRhZyB8fCB3aWRnZXQuZ2V0VGFnKCk7XHJcbi8vICAgICAgICAgICAgIHJldHVybiBjY3VpLkxheW91dC5wcm90b3R5cGUuYWRkQ2hpbGQuY2FsbCh0aGlzLCB3aWRnZXQsIHpPcmRlciwgdGFnKTtcclxuLy8gICAgICAgICAgICAgLy8gcmV0dXJuIHRoaXMuYWRkUHJvdGVjdGVkQ2hpbGQod2lkZ2V0LCB6T3JkZXIsIHRhZyk7ICAgIC8vdGhpcy5faW5uZXJDb250YWluZXIuYWRkQ2hpbGQod2lkZ2V0LCB6T3JkZXIsIHRhZyk7XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICAgIF9pbml0U2Nyb2xsQmFyKCkge1xyXG4vLyAgICAgICAgICAgICAvLyBpZih0aGlzLl9kaXJlY3Rpb24gIT09IGNjdWkuU2Nyb2xsVmlldy5ESVJfSE9SSVpPTlRBTCAmJiAhdGhpcy5fdmVydGljYWxTY3JvbGxCYXIpXHJcbi8vICAgICAgICAgICAgIC8vIHtcclxuLy8gICAgICAgICAgICAgLy8gICAgIHRoaXMuX3ZlcnRpY2FsU2Nyb2xsQmFyID0gbmV3IGNjdWkuU2Nyb2xsVmlld0Jhcih0aGlzLCBjY3VpLlNjcm9sbFZpZXcuRElSX1ZFUlRJQ0FMKTtcclxuLy8gICAgICAgICAgICAgLy8gICAgIHRoaXMuYWRkUHJvdGVjdGVkQ2hpbGQodGhpcy5fdmVydGljYWxTY3JvbGxCYXIsIDIpO1xyXG4vLyAgICAgICAgICAgICAvLyB9XHJcbi8vICAgICAgICAgICAgIC8vIGlmKHRoaXMuX2RpcmVjdGlvbiAhPT0gY2N1aS5TY3JvbGxWaWV3LkRJUl9WRVJUSUNBTCAmJiAhdGhpcy5faG9yaXpvbnRhbFNjcm9sbEJhcilcclxuLy8gICAgICAgICAgICAgLy8ge1xyXG4vLyAgICAgICAgICAgICAvLyAgICAgdGhpcy5faG9yaXpvbnRhbFNjcm9sbEJhciA9IG5ldyBjY3VpLlNjcm9sbFZpZXdCYXIodGhpcywgY2N1aS5TY3JvbGxWaWV3LkRJUl9IT1JJWk9OVEFMKTtcclxuLy8gICAgICAgICAgICAgLy8gICAgIHRoaXMuYWRkUHJvdGVjdGVkQ2hpbGQodGhpcy5faG9yaXpvbnRhbFNjcm9sbEJhciwgMik7XHJcbi8vICAgICAgICAgICAgIC8vIH1cclxuLy8gICAgICAgICB9XHJcblxyXG5cclxuLy8gICAgICAgICByZW1vdmVBbGxDaGlsZHJlbigpIHtcclxuLy8gICAgICAgICAgICAgdGhpcy5yZW1vdmVBbGxDaGlsZHJlbldpdGhDbGVhbnVwKHRydWUpO1xyXG4vLyAgICAgICAgIH1cclxuXHJcblxyXG4vLyAgICAgICAgIHJlbW92ZUFsbENoaWxkcmVuV2l0aENsZWFudXAoY2xlYW51cCkge1xyXG4vLyAgICAgICAgICAgICBjY3VpLkxheW91dC5wcm90b3R5cGUucmVtb3ZlQWxsQ2hpbGRyZW4uY2FsbCh0aGlzLCBjbGVhbnVwKTtcclxuLy8gICAgICAgICAgICAgLy8gdGhpcy5faW5uZXJDb250YWluZXIucmVtb3ZlQWxsQ2hpbGRyZW5XaXRoQ2xlYW51cChjbGVhbnVwKTtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgX29uU2l6ZUNoYW5nZWQoKSB7XHJcbi8vICAgICAgICAgICAgIGNjdWkuTGF5b3V0LnByb3RvdHlwZS5fb25TaXplQ2hhbmdlZC5jYWxsKHRoaXMpO1xyXG4vLyAgICAgICAgICAgICB2YXIgbG9jU2l6ZSA9IHRoaXMuX2NvbnRlbnRTaXplO1xyXG4vLyAgICAgICAgICAgICB0aGlzLl90b3BCb3VuZGFyeSA9IGxvY1NpemUuaGVpZ2h0IDtcclxuLy8gICAgICAgICAgICAgdGhpcy5fcmlnaHRCb3VuZGFyeSA9IGxvY1NpemUud2lkdGggO1xyXG4vLyAgICAgICAgICAgICB2YXIgaW5uZXJTaXplID0gdGhpcy5nZXRJbm5lckNvbnRhaW5lclNpemUoKTtcclxuXHJcbi8vICAgICAgICAgICAgIC8vIHRoaXMuX2lubmVyQ29udGFpbmVyLnNldENvbnRlbnRTaXplKGNjLnNpemUoTWF0aC5tYXgoaW5uZXJTaXplLndpZHRoLCBsb2NTaXplLndpZHRoKSwgTWF0aC5tYXgoaW5uZXJTaXplLmhlaWdodCwgbG9jU2l6ZS5oZWlnaHQpKSk7XHJcbi8vICAgICAgICAgICAgIC8vIHRoaXMuX2lubmVyQ29udGFpbmVyLnNldFBvc2l0aW9uKDAsIGxvY1NpemUuaGVpZ2h0IC0gdGhpcy5faW5uZXJDb250YWluZXIuZ2V0Q29udGVudFNpemUoKS5oZWlnaHQpO1xyXG4vLyAgICAgICAgICAgICB0aGlzLl9faW5uZXJDb250YWluZXJXaWR0aCA9IE1hdGgubWF4KGlubmVyU2l6ZS53aWR0aCwgbG9jU2l6ZS53aWR0aCk7XHJcbi8vICAgICAgICAgICAgIHRoaXMuX19pbm5lckNvbnRhaW5lckhlaWdodCA9IE1hdGgubWF4KGlubmVyU2l6ZS5oZWlnaHQsIGxvY1NpemUuaGVpZ2h0KTtcclxuLy8gICAgICAgICAgICAgdGhpcy5fX2lubmVyQ29udGFpbmVyWCA9IDAuMDtcclxuLy8gICAgICAgICAgICAgdGhpcy5fX2lubmVyQ29udGFpbmVyWSA9IGxvY1NpemUuaGVpZ2h0IC0gdGhpcy5fX2lubmVyQ29udGFpbmVySGVpZ2h0IDtcclxuLy8gICAgICAgICAgICAgLy8gaWYodGhpcy5fdmVydGljYWxTY3JvbGxCYXIpXHJcbi8vICAgICAgICAgICAgIC8vICAgICB0aGlzLl92ZXJ0aWNhbFNjcm9sbEJhci5vblNjcm9sbGVkKHRoaXMuX2dldEhvd011Y2hPdXRPZkJvdW5kYXJ5KCkpO1xyXG5cclxuLy8gICAgICAgICAgICAgLy8gaWYodGhpcy5faG9yaXpvbnRhbFNjcm9sbEJhcilcclxuLy8gICAgICAgICAgICAgLy8gICAgIHRoaXMuX2hvcml6b250YWxTY3JvbGxCYXIub25TY3JvbGxlZCh0aGlzLl9nZXRIb3dNdWNoT3V0T2ZCb3VuZGFyeSgpKTtcclxuLy8gICAgICAgICB9XHJcblxyXG5cclxuLy8gICAgICAgICBzZXRJbm5lckNvbnRhaW5lclNpemUoc2l6ZSkge1xyXG4vLyAgICAgICAgICAgICAvLyAgICAgdmFyIGlubmVyQ29udGFpbmVyID0gdGhpcy5faW5uZXJDb250YWluZXIsXHJcbi8vICAgICAgICAgICAgIHZhciBsb2NTaXplID0gdGhpcy5fY29udGVudFNpemUsXHJcbi8vICAgICAgICAgICAgICAgICBpbm5lclNpemVXaWR0aCA9IGxvY1NpemUud2lkdGgsIGlubmVyU2l6ZUhlaWdodCA9IGxvY1NpemUuaGVpZ2h0O1xyXG5cclxuLy8gICAgICAgICAgICAgaWYgKHNpemUud2lkdGggPCBsb2NTaXplLndpZHRoKVxyXG4vLyAgICAgICAgICAgICAgICAgY2MubG9nKFwiSW5uZXIgd2lkdGggPD0gU2Nyb2xsVmlldyB3aWR0aCwgaXQgd2lsbCBiZSBmb3JjZSBzaXplZCFcIik7XHJcbi8vICAgICAgICAgICAgIGVsc2VcclxuLy8gICAgICAgICAgICAgICAgIGlubmVyU2l6ZVdpZHRoID0gc2l6ZS53aWR0aDtcclxuXHJcbi8vICAgICAgICAgICAgIGlmIChzaXplLmhlaWdodCA8IGxvY1NpemUuaGVpZ2h0KVxyXG4vLyAgICAgICAgICAgICAgICAgY2MubG9nKFwiSW5uZXIgaGVpZ2h0IDw9IFNjcm9sbFZpZXcgaGVpZ2h0LCBpdCB3aWxsIGJlIGZvcmNlIHNpemVkIVwiKTtcclxuLy8gICAgICAgICAgICAgZWxzZVxyXG4vLyAgICAgICAgICAgICAgICAgaW5uZXJTaXplSGVpZ2h0ID0gc2l6ZS5oZWlnaHQ7XHJcblxyXG4vLyAgICAgICAgICAgICAvLyAgICBpbm5lckNvbnRhaW5lci5zZXRDb250ZW50U2l6ZShjYy5zaXplKGlubmVyU2l6ZVdpZHRoLCBpbm5lclNpemVIZWlnaHQpKTtcclxuLy8gICAgICAgICAgICAgdGhpcy5fX2lubmVyQ29udGFpbmVyV2lkdGggPSBpbm5lclNpemVXaWR0aCA7XHJcbi8vICAgICAgICAgICAgIHRoaXMuX19pbm5lckNvbnRhaW5lckhlaWdodCA9IGlubmVyU2l6ZUhlaWdodCA7XHJcblxyXG4gICAgICAgICBcclxuXHJcbi8vICAgICAgICAgICAgIC8vICAgIHZhciBwb3MgPSB0aGlzLl9pbm5lckNvbnRhaW5lci5nZXRQb3NpdGlvbigpO1xyXG4vLyAgICAgICAgICAgICB2YXIgcG9zID0gdGhpcy5nZXRJbm5lckNvbnRhaW5lclBvc2l0aW9uKCk7XHJcblxyXG4vLyAgICAgICAgICAgICAvLyAgICB2YXIgY29udEFQID0gdGhpcy5faW5uZXJDb250YWluZXIuZ2V0QW5jaG9yUG9pbnQoKTtcclxuXHJcbi8vICAgICAgICAgICAgIC8vICAgIGlmICh0aGlzLl9pbm5lckNvbnRhaW5lci5nZXRMZWZ0Qm91bmRhcnkoKSAhPSAwLjApXHJcbi8vICAgICAgICAgICAgIC8vICAgIHtcclxuLy8gICAgICAgICAgICAgLy8gICAgICAgIHBvcy54ID0gY29udEFQLnggKiBpbm5lclNpemVXaWR0aDtcclxuLy8gICAgICAgICAgICAgLy8gICAgfVxyXG4vLyAgICAgICAgICAgICAvLyAgICBpZiAodGhpcy5faW5uZXJDb250YWluZXIuZ2V0VG9wQm91bmRhcnkoKSAhPSB0aGlzLl9jb250ZW50U2l6ZS5oZWlnaHQpXHJcbi8vICAgICAgICAgICAgIC8vICAgIHtcclxuLy8gICAgICAgICAgICAgLy8gICAgICAgIHBvcy55ID0gdGhpcy5fY29udGVudFNpemUuaGVpZ2h0IC0gKDEuMCAtIGNvbnRBUC55KSAqIGlubmVyU2l6ZUhlaWdodDtcclxuLy8gICAgICAgICAgICAgLy8gICAgfVxyXG5cclxuLy8gICAgICAgICAgICAgaWYgKHRoaXMuZ2V0aW5uZXJMZWZ0Qm91bmRhcnkoKSAhPSAwLjApIHtcclxuLy8gICAgICAgICAgICAgICAgIHBvcy54ID0gaW5uZXJTaXplV2lkdGggO1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIGlmICh0aGlzLmdldGlubmVyVG9wQm91bmRhcnkoKSAhPSB0aGlzLl9jb250ZW50U2l6ZS5oZWlnaHQpIHtcclxuLy8gICAgICAgICAgICAgICAgIHBvcy55ID0gdGhpcy5fY29udGVudFNpemUuaGVpZ2h0IC0gaW5uZXJTaXplSGVpZ2h0IDtcclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICB0aGlzLnNldElubmVyQ29udGFpbmVyUG9zaXRpb24ocG9zKTtcclxuXHJcbi8vICAgICAgICAgICAgIC8vICAgIHRoaXMuX3VwZGF0ZVNjcm9sbEJhcihjYy5wKDAgLDApKTtcclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIGdldENoaWxkcmVuKCk6Y2MuTm9kZVtde1xyXG4vLyAgICAgICAgICAgICByZXR1cm4gY2N1aS5MYXlvdXQucHJvdG90eXBlLmdldENoaWxkcmVuLmNhbGwodGhpcyk7XHJcblxyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgX3NldElubmVyV2lkdGgod2lkdGgpIHtcclxuLy8gICAgICAgICAgICAgLy8gdmFyIGxvY1cgPSB0aGlzLl9jb250ZW50U2l6ZS53aWR0aCxcclxuLy8gICAgICAgICAgICAgLy8gICAgIGlubmVyV2lkdGggPSBsb2NXLFxyXG4vLyAgICAgICAgICAgICAvLyAgICAgY29udGFpbmVyID0gdGhpcy5faW5uZXJDb250YWluZXIsXHJcbi8vICAgICAgICAgICAgIC8vICAgICBvbGRJbm5lcldpZHRoID0gY29udGFpbmVyLndpZHRoO1xyXG4vLyAgICAgICAgICAgICAvLyBpZiAod2lkdGggPCBsb2NXKVxyXG4vLyAgICAgICAgICAgICAvLyAgICAgY2MubG9nKFwiSW5uZXIgd2lkdGggPD0gc2Nyb2xsdmlldyB3aWR0aCwgaXQgd2lsbCBiZSBmb3JjZSBzaXplZCFcIik7XHJcbi8vICAgICAgICAgICAgIC8vIGVsc2VcclxuLy8gICAgICAgICAgICAgLy8gICAgIGlubmVyV2lkdGggPSB3aWR0aDtcclxuLy8gICAgICAgICAgICAgLy8gY29udGFpbmVyLndpZHRoID0gaW5uZXJXaWR0aDtcclxuXHJcbi8vICAgICAgICAgICAgIC8vIHN3aXRjaCAodGhpcy5fZGlyZWN0aW9uKSB7XHJcbi8vICAgICAgICAgICAgIC8vICAgICBjYXNlIGNjdWkuU2Nyb2xsVmlldy5ESVJfSE9SSVpPTlRBTDpcclxuLy8gICAgICAgICAgICAgLy8gICAgIGNhc2UgY2N1aS5TY3JvbGxWaWV3LkRJUl9CT1RIOlxyXG4vLyAgICAgICAgICAgICAvLyAgICAgICAgIGlmIChjb250YWluZXIuZ2V0UmlnaHRCb3VuZGFyeSgpIDw9IGxvY1cpIHtcclxuLy8gICAgICAgICAgICAgLy8gICAgICAgICAgICAgdmFyIG5ld0lubmVyV2lkdGggPSBjb250YWluZXIud2lkdGg7XHJcbi8vICAgICAgICAgICAgIC8vICAgICAgICAgICAgIHZhciBvZmZzZXQgPSBvbGRJbm5lcldpZHRoIC0gbmV3SW5uZXJXaWR0aDtcclxuLy8gICAgICAgICAgICAgLy8gICAgICAgICAgICAgdGhpcy5fc2Nyb2xsQ2hpbGRyZW4ob2Zmc2V0LCAwKTtcclxuLy8gICAgICAgICAgICAgLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIC8vICAgICAgICAgYnJlYWs7XHJcbi8vICAgICAgICAgICAgIC8vIH1cclxuLy8gICAgICAgICAgICAgLy8gdmFyIGlubmVyQVggPSBjb250YWluZXIuYW5jaG9yWDtcclxuLy8gICAgICAgICAgICAgLy8gaWYgKGNvbnRhaW5lci5nZXRMZWZ0Qm91bmRhcnkoKSA+IDAuMClcclxuLy8gICAgICAgICAgICAgLy8gICAgIGNvbnRhaW5lci54ID0gaW5uZXJBWCAqIGlubmVyV2lkdGg7XHJcbi8vICAgICAgICAgICAgIC8vIGlmIChjb250YWluZXIuZ2V0UmlnaHRCb3VuZGFyeSgpIDwgbG9jVylcclxuLy8gICAgICAgICAgICAgLy8gICAgIGNvbnRhaW5lci54ID0gbG9jVyAtICgoMS4wIC0gaW5uZXJBWCkgKiBpbm5lcldpZHRoKTtcclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIF9zZXRJbm5lckhlaWdodChoZWlnaHQpIHtcclxuLy8gICAgICAgICAgICAgLy8gdmFyIGxvY0ggPSB0aGlzLl9jb250ZW50U2l6ZS5oZWlnaHQsXHJcbi8vICAgICAgICAgICAgIC8vICAgICBpbm5lckhlaWdodCA9IGxvY0gsXHJcbi8vICAgICAgICAgICAgIC8vICAgICBjb250YWluZXIgPSB0aGlzLl9pbm5lckNvbnRhaW5lcixcclxuLy8gICAgICAgICAgICAgLy8gICAgIG9sZElubmVySGVpZ2h0ID0gY29udGFpbmVyLmhlaWdodDtcclxuLy8gICAgICAgICAgICAgLy8gaWYgKGhlaWdodCA8IGxvY0gpXHJcbi8vICAgICAgICAgICAgIC8vICAgICBjYy5sb2coXCJJbm5lciBoZWlnaHQgPD0gc2Nyb2xsdmlldyBoZWlnaHQsIGl0IHdpbGwgYmUgZm9yY2Ugc2l6ZWQhXCIpO1xyXG4vLyAgICAgICAgICAgICAvLyBlbHNlXHJcbi8vICAgICAgICAgICAgIC8vICAgICBpbm5lckhlaWdodCA9IGhlaWdodDtcclxuLy8gICAgICAgICAgICAgLy8gY29udGFpbmVyLmhlaWdodCA9IGlubmVySGVpZ2h0O1xyXG5cclxuLy8gICAgICAgICAgICAgLy8gc3dpdGNoICh0aGlzLl9kaXJlY3Rpb24pIHtcclxuLy8gICAgICAgICAgICAgLy8gICAgIGNhc2UgY2N1aS5TY3JvbGxWaWV3LkRJUl9WRVJUSUNBTDpcclxuLy8gICAgICAgICAgICAgLy8gICAgIGNhc2UgY2N1aS5TY3JvbGxWaWV3LkRJUl9CT1RIOlxyXG4vLyAgICAgICAgICAgICAvLyAgICAgICAgIHZhciBuZXdJbm5lckhlaWdodCA9IGlubmVySGVpZ2h0O1xyXG4vLyAgICAgICAgICAgICAvLyAgICAgICAgIHZhciBvZmZzZXQgPSBvbGRJbm5lckhlaWdodCAtIG5ld0lubmVySGVpZ2h0O1xyXG4vLyAgICAgICAgICAgICAvLyAgICAgICAgIHRoaXMuX3Njcm9sbENoaWxkcmVuKDAsIG9mZnNldCk7XHJcbi8vICAgICAgICAgICAgIC8vICAgICAgICAgYnJlYWs7XHJcbi8vICAgICAgICAgICAgIC8vIH1cclxuLy8gICAgICAgICAgICAgLy8gdmFyIGlubmVyQVkgPSBjb250YWluZXIuYW5jaG9yWTtcclxuLy8gICAgICAgICAgICAgLy8gaWYgKGNvbnRhaW5lci5nZXRMZWZ0Qm91bmRhcnkoKSA+IDAuMClcclxuLy8gICAgICAgICAgICAgLy8gICAgIGNvbnRhaW5lci55ID0gaW5uZXJBWSAqIGlubmVySGVpZ2h0O1xyXG4vLyAgICAgICAgICAgICAvLyBpZiAoY29udGFpbmVyLmdldFJpZ2h0Qm91bmRhcnkoKSA8IGxvY0gpXHJcbi8vICAgICAgICAgICAgIC8vICAgICBjb250YWluZXIueSA9IGxvY0ggLSAoKDEuMCAtIGlubmVyQVkpICogaW5uZXJIZWlnaHQpO1xyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgLyoqXHJcbi8vICAgICAgICAgICogU2V0IGlubmVyIGNvbnRhaW5lciBwb3NpdGlvblxyXG4vLyAgICAgICAgICAqXHJcbi8vICAgICAgICAgICogQHBhcmFtIHtjYy5Qb2ludH0gcG9zaXRpb24gSW5uZXIgY29udGFpbmVyIHBvc2l0aW9uLlxyXG4vLyAgICAgICAgICAqL1xyXG4vLyAgICAgICAgIHNldElubmVyQ29udGFpbmVyUG9zaXRpb24ocG9zaXRpb246IGNjLlBvaW50KSB7XHJcblxyXG4vLyAgICAgICAgICAgICAvLyBpZiAocG9zaXRpb24ueCA9PT0gdGhpcy5faW5uZXJDb250YWluZXIuZ2V0UG9zaXRpb25YKCkgJiYgcG9zaXRpb24ueSA9PT0gdGhpcy5faW5uZXJDb250YWluZXIuZ2V0UG9zaXRpb25ZKCkpIHtcclxuLy8gICAgICAgICAgICAgLy8gICAgIHJldHVybjtcclxuLy8gICAgICAgICAgICAgLy8gfVxyXG4vLyAgICAgICAgICAgICBpZiAocG9zaXRpb24ueCA9PT0gdGhpcy5nZXRpbm5lclBvc2l0aW9uWCgpICYmIHBvc2l0aW9uLnkgPT09IHRoaXMuZ2V0aW5uZXJQb3NpdGlvblkoKSkge1xyXG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4vLyAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgICAgICAvLyB0aGlzLl9pbm5lckNvbnRhaW5lci5zZXRQb3NpdGlvbihwb3NpdGlvbik7XHJcbiAgICAgICAgICAgXHJcbi8vICAgICAgICAgICAgIGxldCBteCA9ICB0aGlzLl9faW5uZXJDb250YWluZXJYIC1wb3NpdGlvbi54O1xyXG4vLyAgICAgICAgICAgICBsZXQgbXkgPSAgdGhpcy5fX2lubmVyQ29udGFpbmVyWSAtIHBvc2l0aW9uLnk7XHJcblxyXG4vLyAgICAgICAgICAgICB0aGlzLl9faW5uZXJDb250YWluZXJYID0gcG9zaXRpb24ueCA7XHJcbi8vICAgICAgICAgICAgIHRoaXMuX19pbm5lckNvbnRhaW5lclkgPSBwb3NpdGlvbi55O1xyXG5cclxuXHJcblxyXG4vLyAgICAgICAgICAgICBsZXQgY2hpbGRyZW4gPSB0aGlzLmdldENoaWxkcmVuKCk7XHJcblxyXG4vLyAgICAgICAgICAgICBmb3IodmFyIHggaW4gY2hpbGRyZW4pe1xyXG4vLyAgICAgICAgICAgICAgICAgbGV0IHRwb3MgPSAgIGNoaWxkcmVuW3hdLmdldFBvc2l0aW9uKCk7XHJcbi8vICAgICAgICAgICAgICAgICBjaGlsZHJlblt4XS5zZXRQb3NpdGlvbiggdHBvcy54ICsgbXggLHRwb3MueSArIG15ICApO1xyXG4vLyAgICAgICAgICAgICB9XHJcblxyXG5cclxuLy8gICAgICAgICAgICAgbGV0IHNob3dsYWJlbDogY2N1aS5UZXh0ID0gY2N1aS5oZWxwZXIuc2Vla1dpZGdldEJ5TmFtZSg8Y2N1aS5XaWRnZXQ+dGhpcy5wYXJlbnQsIFwic2hvd3NjclwiKTtcclxuLy8gICAgICAgICAgICAgaWYgKHNob3dsYWJlbCkge1xyXG4vLyAgICAgICAgICAgICAgICAgc2hvd2xhYmVsLnNldFN0cmluZyhgdzoke3RoaXMuX19pbm5lckNvbnRhaW5lcldpZHRofSAtLSBoOiR7dGhpcy5fX2lubmVyQ29udGFpbmVySGVpZ2h0fSAtLS0geDoke3RoaXMuX19pbm5lckNvbnRhaW5lclh9IC0tIHk6JHt0aGlzLl9faW5uZXJDb250YWluZXJZfWApO1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIHRoaXMuX291dE9mQm91bmRhcnlBbW91bnREaXJ0eSA9IHRydWU7XHJcblxyXG4vLyAgICAgICAgICAgICAvLyAvLyBQcm9jZXNzIGJvdW5jaW5nIGV2ZW50c1xyXG4vLyAgICAgICAgICAgICBpZiAodGhpcy5ib3VuY2VFbmFibGVkKSB7XHJcbi8vICAgICAgICAgICAgICAgICBmb3IgKHZhciBfZGlyZWN0aW9uID0gY2N1aS5TY3JvbGxWaWV3Lk1PVkVESVJfVE9QOyBfZGlyZWN0aW9uIDwgY2N1aS5TY3JvbGxWaWV3Lk1PVkVESVJfUklHSFQ7ICsrX2RpcmVjdGlvbikge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pc091dE9mQm91bmRhcnkoX2RpcmVjdGlvbikpIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcHJvY2Vzc1Njcm9sbEV2ZW50KF9kaXJlY3Rpb24sIHRydWUpO1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAgICAgdGhpcy5fZGlzcGF0Y2hFdmVudChjY3VpLlNjcm9sbFZpZXcuRVZFTlRfQ09OVEFJTkVSX01PVkVEKTtcclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIC8qKlxyXG4vLyAgICAgICAgICAqIEdldCBpbm5lciBjb250YWluZXIgcG9zaXRpb25cclxuLy8gICAgICAgICAgKlxyXG4vLyAgICAgICAgICAqIEByZXR1cm4gVGhlIGlubmVyIGNvbnRhaW5lciBwb3NpdGlvbi5cclxuLy8gICAgICAgICAgKi9cclxuLy8gICAgICAgICBnZXRJbm5lckNvbnRhaW5lclBvc2l0aW9uKCk6IGNjLlBvaW50IHtcclxuLy8gICAgICAgICAgICAgcmV0dXJuIGNjLnAodGhpcy5fX2lubmVyQ29udGFpbmVyWCwgdGhpcy5fX2lubmVyQ29udGFpbmVyWSk7Ly90aGlzLl9pbm5lckNvbnRhaW5lci5nZXRQb3NpdGlvbigpO1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICAvKipcclxuLy8gICAgICAqIFJldHVybnMgaW5uZXIgY29udGFpbmVyIHNpemUgb2YgU2Nyb2xsVmlldy4gICAgIDxici8+XHJcbi8vICAgICAgKiBJbm5lciBjb250YWluZXIgc2l6ZSBtdXN0IGJlIGxhcmdlciB0aGFuIG9yIGVxdWFsIFNjcm9sbFZpZXcncyBzaXplLlxyXG4vLyAgICAgICpcclxuLy8gICAgICAqIEByZXR1cm4ge2NjLlNpemV9IGlubmVyIGNvbnRhaW5lciBzaXplLlxyXG4vLyAgICAgICovXHJcbi8vICAgICAgICAgZ2V0SW5uZXJDb250YWluZXJTaXplKCk6IGNjLlNpemUge1xyXG4vLyAgICAgICAgICAgICByZXR1cm4gY2Muc2l6ZSh0aGlzLl9faW5uZXJDb250YWluZXJXaWR0aCwgdGhpcy5fX2lubmVyQ29udGFpbmVySGVpZ2h0KTsvL3RoaXMuX2lubmVyQ29udGFpbmVyLmdldENvbnRlbnRTaXplKCk7XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBfaXNJbkNvbnRhaW5lcih3aWRnZXQpIHtcclxuLy8gICAgICAgICAgICAgLy8gaWYgKCF0aGlzLl9jbGlwcGluZ0VuYWJsZWQpXHJcbi8vICAgICAgICAgICAgIC8vICAgICByZXR1cm4gdHJ1ZTtcclxuLy8gICAgICAgICAgICAgLy8gdmFyIHdQb3MgPSB3aWRnZXQuX3Bvc2l0aW9uLFxyXG4vLyAgICAgICAgICAgICAvLyAgICAgd1NpemUgPSB3aWRnZXQuX2NvbnRlbnRTaXplLFxyXG4vLyAgICAgICAgICAgICAvLyAgICAgd0FuY2hvciA9IHdpZGdldC5fYW5jaG9yUG9pbnQsXHJcbi8vICAgICAgICAgICAgIC8vICAgICBzaXplID0gdGhpcy5fY3VzdG9tU2l6ZSxcclxuLy8gICAgICAgICAgICAgLy8gICAgIHBvcyA9IHRoaXMuX2lubmVyQ29udGFpbmVyLl9wb3NpdGlvbixcclxuLy8gICAgICAgICAgICAgLy8gICAgIGJvdHRvbSA9IDAsIGxlZnQgPSAwO1xyXG4vLyAgICAgICAgICAgICAvLyBpZiAoXHJcbi8vICAgICAgICAgICAgIC8vICAgICAvLyBUb3BcclxuLy8gICAgICAgICAgICAgLy8gKGJvdHRvbSA9IHdQb3MueSAtIHdBbmNob3IueSAqIHdTaXplLmhlaWdodCkgPj0gc2l6ZS5oZWlnaHQgLSBwb3MueSB8fFxyXG4vLyAgICAgICAgICAgICAvLyAgICAgLy8gQm90dG9tXHJcbi8vICAgICAgICAgICAgIC8vIGJvdHRvbSArIHdTaXplLmhlaWdodCA8PSAtcG9zLnkgfHxcclxuLy8gICAgICAgICAgICAgLy8gICAgIC8vIHJpZ2h0XHJcbi8vICAgICAgICAgICAgIC8vIChsZWZ0ID0gd1Bvcy54IC0gd0FuY2hvci54ICogd1NpemUud2lkdGgpID49IHNpemUud2lkdGggLSBwb3MueCB8fFxyXG4vLyAgICAgICAgICAgICAvLyAgICAgLy8gbGVmdFxyXG4vLyAgICAgICAgICAgICAvLyBsZWZ0ICsgd1NpemUud2lkdGggPD0gLXBvcy54XHJcbi8vICAgICAgICAgICAgIC8vIClcclxuLy8gICAgICAgICAgICAgLy8gICAgIHJldHVybiBmYWxzZTtcclxuLy8gICAgICAgICAgICAgLy8gZWxzZSByZXR1cm4gdHJ1ZTtcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICB1cGRhdGVDaGlsZHJlbigpIHtcclxuLy8gICAgICAgICAgICAgLy8gdmFyIGNoaWxkLCBpLCBsO1xyXG4vLyAgICAgICAgICAgICAvLyB2YXIgY2hpbGRyZW5BcnJheSA9IHRoaXMuX2lubmVyQ29udGFpbmVyLl9jaGlsZHJlbjtcclxuLy8gICAgICAgICAgICAgLy8gZm9yIChpID0gMCwgbCA9IGNoaWxkcmVuQXJyYXkubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbi8vICAgICAgICAgICAgIC8vICAgICBjaGlsZCA9IGNoaWxkcmVuQXJyYXlbaV07XHJcbi8vICAgICAgICAgICAgIC8vICAgICBpZiAoY2hpbGQuX2luVmlld1JlY3QgPT09IHRydWUgJiYgdGhpcy5faXNJbkNvbnRhaW5lcihjaGlsZCkgPT09IGZhbHNlKVxyXG4vLyAgICAgICAgICAgICAvLyAgICAgICAgIGNoaWxkLl9pblZpZXdSZWN0ID0gZmFsc2U7XHJcbi8vICAgICAgICAgICAgIC8vICAgICBlbHNlIGlmIChjaGlsZC5faW5WaWV3UmVjdCA9PT0gZmFsc2UgJiYgdGhpcy5faXNJbkNvbnRhaW5lcihjaGlsZCkgPT09IHRydWUpXHJcbi8vICAgICAgICAgICAgIC8vICAgICAgICAgY2hpbGQuX2luVmlld1JlY3QgPSB0cnVlO1xyXG4vLyAgICAgICAgICAgICAvLyB9XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBfX2lubmVyQ29udGFpbmVyWCA9IDAuMDtcclxuLy8gICAgICAgICBfX2lubmVyQ29udGFpbmVyWSA9IDAuMDtcclxuLy8gICAgICAgICBfX2lubmVyQ29udGFpbmVyV2lkdGggPSAwLjA7XHJcbi8vICAgICAgICAgX19pbm5lckNvbnRhaW5lckhlaWdodCA9IDAuMDtcclxuLy8gICAgICAgICBfZ2V0SW5uZXJXaWR0aCgpIHtcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19pbm5lckNvbnRhaW5lcldpZHRoO1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICBnZXRJbm5lcldpZHRoKCkge1xyXG4vLyAgICAgICAgICAgICByZXR1cm4gdGhpcy5fX2lubmVyQ29udGFpbmVyV2lkdGg7Ly90aGlzLl9pbm5lckNvbnRhaW5lci53aWR0aDtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgZ2V0SW5uZXJIZWlnaHQoKSB7XHJcbi8vICAgICAgICAgICAgIHJldHVybiB0aGlzLl9faW5uZXJDb250YWluZXJIZWlnaHQ7Ly8gdGhpcy5faW5uZXJDb250YWluZXIuaGVpZ2h0O1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICBfZ2V0SW5uZXJIZWlnaHQoKSB7XHJcbi8vICAgICAgICAgICAgIHJldHVybiB0aGlzLl9faW5uZXJDb250YWluZXJIZWlnaHQ7Ly8gdGhpcy5faW5uZXJDb250YWluZXIuaGVpZ2h0O1xyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgZ2V0aW5uZXJQb3NpdGlvblgoKSB7XHJcbi8vICAgICAgICAgICAgIHJldHVybiB0aGlzLl9faW5uZXJDb250YWluZXJYO1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICBnZXRpbm5lclBvc2l0aW9uWSgpIHtcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19pbm5lckNvbnRhaW5lclk7XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICAgIGdldGlubmVyTGVmdEJvdW5kYXJ5KCkge1xyXG4vLyAgICAgICAgICAgICAvL3JldHVybiB0aGlzLmdldFBvc2l0aW9uWCgpIC0gdGhpcy5fZ2V0QW5jaG9yWCgpICogdGhpcy5fY29udGVudFNpemUud2lkdGg7XHJcbi8vICAgICAgICAgICAgIHJldHVybiB0aGlzLl9faW5uZXJDb250YWluZXJYIDtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgZ2V0aW5uZXJUb3BCb3VuZGFyeSgpIHtcclxuLy8gICAgICAgICAgICAgLy9yZXR1cm4gdGhpcy5nZXRCb3R0b21Cb3VuZGFyeSgpICsgdGhpcy5fY29udGVudFNpemUuaGVpZ2h0O1xyXG4vLyAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRpbm5lckJvdHRvbUJvdW5kYXJ5KCkgKyB0aGlzLl9faW5uZXJDb250YWluZXJIZWlnaHQ7XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICAgIGdldGlubmVyQm90dG9tQm91bmRhcnkoKSB7XHJcbi8vICAgICAgICAgICAgIC8vIHJldHVybiB0aGlzLmdldFBvc2l0aW9uWSgpIC0gdGhpcy5fZ2V0QW5jaG9yWSgpICogdGhpcy5fY29udGVudFNpemUuaGVpZ2h0O1xyXG4vLyAgICAgICAgICAgICByZXR1cm4gdGhpcy5fX2lubmVyQ29udGFpbmVyWTtcclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIGdldGlubmVyUmlnaHRCb3VuZGFyeSgpIHtcclxuLy8gICAgICAgICAgICAgLy8gcmV0dXJuIHRoaXMuZ2V0TGVmdEJvdW5kYXJ5KCkgKyB0aGlzLl9jb250ZW50U2l6ZS53aWR0aDtcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0aW5uZXJMZWZ0Qm91bmRhcnkoKSArIHRoaXMuX19pbm5lckNvbnRhaW5lcldpZHRoO1xyXG4vLyAgICAgICAgIH1cclxuXHJcblxyXG5cclxuLy8gICAgICAgICBfZ2V0SG93TXVjaE91dE9mQm91bmRhcnkoYWRkaXRpb24/OiBjYy5Qb2ludCkge1xyXG4vLyAgICAgICAgICAgICBpZiAoYWRkaXRpb24gPT09IHVuZGVmaW5lZClcclxuLy8gICAgICAgICAgICAgICAgIGFkZGl0aW9uID0gY2MucCgwLCAwKTtcclxuXHJcbi8vICAgICAgICAgICAgIGlmIChhZGRpdGlvbi54ID09PSAwICYmIGFkZGl0aW9uLnkgPT09IDAgJiYgIXRoaXMuX291dE9mQm91bmRhcnlBbW91bnREaXJ0eSkge1xyXG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX291dE9mQm91bmRhcnlBbW91bnQ7XHJcbi8vICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuLy8gICAgICAgICAgICAgdmFyIG91dE9mQm91bmRhcnlBbW91bnQgPSBjYy5wKDAsIDApO1xyXG5cclxuLy8gICAgICAgICAgICAgaWYgKHRoaXMuZ2V0aW5uZXJMZWZ0Qm91bmRhcnkoKSArIGFkZGl0aW9uLnggPiB0aGlzLl9sZWZ0Qm91bmRhcnkpIHtcclxuLy8gICAgICAgICAgICAgICAgIG91dE9mQm91bmRhcnlBbW91bnQueCA9IHRoaXMuX2xlZnRCb3VuZGFyeSAtICh0aGlzLmdldGlubmVyTGVmdEJvdW5kYXJ5KCkgICsgYWRkaXRpb24ueCk7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5nZXRpbm5lclJpZ2h0Qm91bmRhcnkoKSArIGFkZGl0aW9uLnggPCB0aGlzLl9yaWdodEJvdW5kYXJ5KSB7XHJcbi8vICAgICAgICAgICAgICAgICBvdXRPZkJvdW5kYXJ5QW1vdW50LnggPSB0aGlzLl9yaWdodEJvdW5kYXJ5IC0gKHRoaXMuZ2V0aW5uZXJSaWdodEJvdW5kYXJ5KCkgICsgYWRkaXRpb24ueCk7XHJcbi8vICAgICAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgICAgIGlmICh0aGlzLmdldGlubmVyVG9wQm91bmRhcnkoKSArIGFkZGl0aW9uLnkgPCB0aGlzLl90b3BCb3VuZGFyeSkge1xyXG4vLyAgICAgICAgICAgICAgICAgb3V0T2ZCb3VuZGFyeUFtb3VudC55ID0gdGhpcy5fdG9wQm91bmRhcnkgLSAodGhpcy5nZXRpbm5lclRvcEJvdW5kYXJ5KCkgKyBhZGRpdGlvbi55KTtcclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmdldGlubmVyQm90dG9tQm91bmRhcnkoKSArIGFkZGl0aW9uLnkgPiB0aGlzLl9ib3R0b21Cb3VuZGFyeSkge1xyXG4vLyAgICAgICAgICAgICAgICAgb3V0T2ZCb3VuZGFyeUFtb3VudC55ID0gdGhpcy5fYm90dG9tQm91bmRhcnkgLSAodGhpcy5nZXRpbm5lckJvdHRvbUJvdW5kYXJ5KCkgKyBhZGRpdGlvbi55KTtcclxuLy8gICAgICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAgICAgaWYgKGFkZGl0aW9uLnggPT09IDAgJiYgYWRkaXRpb24ueSA9PT0gMCkge1xyXG4vLyAgICAgICAgICAgICAgICAgdGhpcy5fb3V0T2ZCb3VuZGFyeUFtb3VudCA9IG91dE9mQm91bmRhcnlBbW91bnQ7XHJcbi8vICAgICAgICAgICAgICAgICB0aGlzLl9vdXRPZkJvdW5kYXJ5QW1vdW50RGlydHkgPSBmYWxzZTtcclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICByZXR1cm4gb3V0T2ZCb3VuZGFyeUFtb3VudDtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgX3N0YXJ0QXV0b1Njcm9sbChkZWx0YU1vdmUsIHRpbWVJblNlYzogbnVtYmVyLCBhdHRlbnVhdGVkOiBib29sZWFuKSB7XHJcbi8vICAgICAgICAgICAgIHZhciBhZGp1c3RlZERlbHRhTW92ZSA9IHRoaXMuX2ZsYXR0ZW5WZWN0b3JCeURpcmVjdGlvbihkZWx0YU1vdmUpO1xyXG4gICAgICAgICBcclxuLy8gICAgICAgICAgICAgdGhpcy5fYXV0b1Njcm9sbGluZyA9IHRydWU7XHJcbi8vICAgICAgICAgICAgIHRoaXMuX2F1dG9TY3JvbGxUYXJnZXREZWx0YSA9IGFkanVzdGVkRGVsdGFNb3ZlO1xyXG4vLyAgICAgICAgICAgICB0aGlzLl9hdXRvU2Nyb2xsQXR0ZW51YXRlID0gYXR0ZW51YXRlZDtcclxuLy8gICAgICAgICAgICAgdGhpcy5fYXV0b1Njcm9sbFN0YXJ0UG9zaXRpb24gPSB0aGlzLmdldElubmVyQ29udGFpbmVyUG9zaXRpb24oKTtcclxuLy8gICAgICAgICAgICAgdGhpcy5fYXV0b1Njcm9sbFRvdGFsVGltZSA9IHRpbWVJblNlYztcclxuLy8gICAgICAgICAgICAgdGhpcy5fYXV0b1Njcm9sbEFjY3VtdWxhdGVkVGltZSA9IDA7XHJcbi8vICAgICAgICAgICAgIHRoaXMuX2F1dG9TY3JvbGxCcmFraW5nID0gZmFsc2U7XHJcbi8vICAgICAgICAgICAgIHRoaXMuX2F1dG9TY3JvbGxCcmFraW5nU3RhcnRQb3NpdGlvbiA9IGNjLnAoMCwgMCk7XHJcblxyXG4vLyAgICAgICAgICAgICAvLyBJZiB0aGUgZGVzdGluYXRpb24gaXMgYWxzbyBvdXQgb2YgYm91bmRhcnkgb2Ygc2FtZSBzaWRlLCBzdGFydCBicmFrZSBmcm9tIGJlZ2dpbmluZy5cclxuLy8gICAgICAgICAgICAgLy8g5aaC5p6c55uu55qE5Zyw5Lmf5Zyo5ZCM5LiA5p2h6L6555qE6L6555WM5LmL5aSW77yM5Yi56L2m44CCXHJcbi8vICAgICAgICAgICAgIHZhciBjdXJyZW50T3V0T2ZCb3VuZGFyeSA9IHRoaXMuX2dldEhvd011Y2hPdXRPZkJvdW5kYXJ5KCk7XHJcbi8vICAgICAgICAgICAgIGlmICghdGhpcy5fZmx0RXF1YWxaZXJvKGN1cnJlbnRPdXRPZkJvdW5kYXJ5KSkge1xyXG4vLyAgICAgICAgICAgICAgICAgdGhpcy5fYXV0b1Njcm9sbEN1cnJlbnRseU91dE9mQm91bmRhcnkgPSB0cnVlO1xyXG4vLyAgICAgICAgICAgICAgICAgdmFyIGFmdGVyT3V0T2ZCb3VuZGFyeSA9IHRoaXMuX2dldEhvd011Y2hPdXRPZkJvdW5kYXJ5KGFkanVzdGVkRGVsdGFNb3ZlKTtcclxuLy8gICAgICAgICAgICAgICAgIGlmIChjdXJyZW50T3V0T2ZCb3VuZGFyeS54ICogYWZ0ZXJPdXRPZkJvdW5kYXJ5LnggPiAwIHx8IGN1cnJlbnRPdXRPZkJvdW5kYXJ5LnkgKiBhZnRlck91dE9mQm91bmRhcnkueSA+IDApIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICB0aGlzLl9hdXRvU2Nyb2xsQnJha2luZyA9IHRydWU7XHJcbi8vICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIF9tb3ZlSW5uZXJDb250YWluZXIoZGVsdGFNb3ZlLCBjYW5TdGFydEJvdW5jZUJhY2spIHtcclxuLy8gICAgICAgICAgICAgdmFyIGFkanVzdGVkTW92ZSA9IHRoaXMuX2ZsYXR0ZW5WZWN0b3JCeURpcmVjdGlvbihkZWx0YU1vdmUpO1xyXG4vLyAgICAgICAgICAgICB0aGlzLnNldElubmVyQ29udGFpbmVyUG9zaXRpb24oY2MucEFkZCh0aGlzLmdldElubmVyQ29udGFpbmVyUG9zaXRpb24oKSwgYWRqdXN0ZWRNb3ZlKSk7XHJcblxyXG4vLyAgICAgICAgICAgICB2YXIgb3V0T2ZCb3VuZGFyeSA9IHRoaXMuX2dldEhvd011Y2hPdXRPZkJvdW5kYXJ5KCk7XHJcbi8vICAgICAgICAgICAgIC8vIHRoaXMuX3VwZGF0ZVNjcm9sbEJhcihvdXRPZkJvdW5kYXJ5KTtcclxuXHJcbi8vICAgICAgICAgICAgIGlmICh0aGlzLmJvdW5jZUVuYWJsZWQgJiYgY2FuU3RhcnRCb3VuY2VCYWNrKSB7XHJcbi8vICAgICAgICAgICAgICAgICB0aGlzLl9zdGFydEJvdW5jZUJhY2tJZk5lZWRlZCgpO1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBfc2Nyb2xsQ2hpbGRyZW4oZGVsdGFNb3ZlOiBjYy5Qb2ludCkge1xyXG4vLyAgICAgICAgICAgICB2YXIgcmVhbE1vdmUgPSBkZWx0YU1vdmU7XHJcblxyXG5cclxuLy8gICAgICAgICAgICAgaWYgKHRoaXMuYm91bmNlRW5hYmxlZCkge1xyXG4vLyAgICAgICAgICAgICAgICAgLy8gSWYgdGhlIHBvc2l0aW9uIG9mIHRoZSBpbm5lciBjb250YWluZXIgaXMgb3V0IG9mIHRoZSBib3VuZGFyeSwgdGhlIG9mZnNldHMgc2hvdWxkIGJlIGRpdmlkZWQgYnkgdHdvLlxyXG4vLyAgICAgICAgICAgICAgICAgdmFyIG91dE9mQm91bmRhcnkgPSB0aGlzLl9nZXRIb3dNdWNoT3V0T2ZCb3VuZGFyeSgpO1xyXG4vLyAgICAgICAgICAgICAgICAgcmVhbE1vdmUueCAqPSAob3V0T2ZCb3VuZGFyeS54ID09IDAgPyAxIDogMC41KTtcclxuLy8gICAgICAgICAgICAgICAgIHJlYWxNb3ZlLnkgKj0gKG91dE9mQm91bmRhcnkueSA9PSAwID8gMSA6IDAuNSk7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgcmVhbE1vdmUueCA9IE51bWJlcihyZWFsTW92ZS54LnRvRml4ZWQoMykpO1xyXG4vLyAgICAgICAgICAgICByZWFsTW92ZS55ID0gTnVtYmVyKHJlYWxNb3ZlLnkudG9GaXhlZCgzKSk7XHJcblxyXG4vLyAgICAgICAgICAgICBpZiAoIXRoaXMuYm91bmNlRW5hYmxlZCkge1xyXG4vLyAgICAgICAgICAgICAgICAgdmFyIG91dE9mQm91bmRhcnkgPSB0aGlzLl9nZXRIb3dNdWNoT3V0T2ZCb3VuZGFyeShyZWFsTW92ZSk7XHJcbi8vICAgICAgICAgICAgICAgICAvLyByZWFsTW92ZS54ICs9IG91dE9mQm91bmRhcnkueDtcclxuLy8gICAgICAgICAgICAgICAgIC8vIHJlYWxNb3ZlLnkgKz0gb3V0T2ZCb3VuZGFyeS55O1xyXG4vLyAgICAgICAgICAgICAgICAgcmVhbE1vdmUueCArPSBOdW1iZXIob3V0T2ZCb3VuZGFyeS54LnRvRml4ZWQoMykpO1xyXG4vLyAgICAgICAgICAgICAgICAgcmVhbE1vdmUueSArPSAgTnVtYmVyKG91dE9mQm91bmRhcnkueS50b0ZpeGVkKDMpKTtcclxuLy8gICAgICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAgICAgdmFyIHNjcm9sbGVkVG9MZWZ0ID0gZmFsc2U7XHJcbi8vICAgICAgICAgICAgIHZhciBzY3JvbGxlZFRvUmlnaHQgPSBmYWxzZTtcclxuLy8gICAgICAgICAgICAgdmFyIHNjcm9sbGVkVG9Ub3AgPSBmYWxzZTtcclxuLy8gICAgICAgICAgICAgdmFyIHNjcm9sbGVkVG9Cb3R0b20gPSBmYWxzZTtcclxuXHJcbi8vICAgICAgICAgICAgIGlmIChyZWFsTW92ZS55ID4gMC4wKSAvLyB1cFxyXG4vLyAgICAgICAgICAgICB7XHJcbi8vICAgICAgICAgICAgICAgICB2YXIgaWNCb3R0b21Qb3MgPSB0aGlzLmdldGlubmVyQm90dG9tQm91bmRhcnkoKS8vLmdldEJvdHRvbUJvdW5kYXJ5KCk7XHJcbi8vICAgICAgICAgICAgICAgICBpZiAoaWNCb3R0b21Qb3MgKyByZWFsTW92ZS55ID49IHRoaXMuX2JvdHRvbUJvdW5kYXJ5KSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsZWRUb0JvdHRvbSA9IHRydWU7XHJcbi8vICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgZWxzZSBpZiAocmVhbE1vdmUueSA8IDAuMCkgLy8gZG93blxyXG4vLyAgICAgICAgICAgICB7XHJcbi8vICAgICAgICAgICAgICAgICB2YXIgaWNUb3BQb3MgPSB0aGlzLmdldGlubmVyVG9wQm91bmRhcnkoKS8vdGhpcy5faW5uZXJDb250YWluZXIuZ2V0VG9wQm91bmRhcnkoKTtcclxuLy8gICAgICAgICAgICAgICAgIGlmIChpY1RvcFBvcyArIHJlYWxNb3ZlLnkgPD0gdGhpcy5fdG9wQm91bmRhcnkpIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICBzY3JvbGxlZFRvVG9wID0gdHJ1ZTtcclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAgICAgaWYgKHJlYWxNb3ZlLnggPCAwLjApIC8vIGxlZnRcclxuLy8gICAgICAgICAgICAge1xyXG4vLyAgICAgICAgICAgICAgICAgdmFyIGljUmlnaHRQb3MgPSB0aGlzLmdldGlubmVyUmlnaHRCb3VuZGFyeSgpLy90aGlzLl9pbm5lckNvbnRhaW5lci5nZXRSaWdodEJvdW5kYXJ5KCk7XHJcbi8vICAgICAgICAgICAgICAgICBpZiAoaWNSaWdodFBvcyArIHJlYWxNb3ZlLnggPD0gdGhpcy5fcmlnaHRCb3VuZGFyeSkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHNjcm9sbGVkVG9SaWdodCA9IHRydWU7XHJcbi8vICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgZWxzZSBpZiAocmVhbE1vdmUueCA+IDAuMCkgLy8gcmlnaHRcclxuLy8gICAgICAgICAgICAge1xyXG4vLyAgICAgICAgICAgICAgICAgdmFyIGljTGVmdFBvcyA9IHRoaXMuZ2V0aW5uZXJMZWZ0Qm91bmRhcnkoKTsvL3RoaXMuX2lubmVyQ29udGFpbmVyLmdldExlZnRCb3VuZGFyeSgpO1xyXG4vLyAgICAgICAgICAgICAgICAgaWYgKGljTGVmdFBvcyArIHJlYWxNb3ZlLnggPj0gdGhpcy5fbGVmdEJvdW5kYXJ5KSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsZWRUb0xlZnQgPSB0cnVlO1xyXG4vLyAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIHRoaXMuX21vdmVJbm5lckNvbnRhaW5lcihyZWFsTW92ZSwgZmFsc2UpO1xyXG5cclxuLy8gICAgICAgICAgICAgaWYgKHJlYWxNb3ZlLnggIT0gMCB8fCByZWFsTW92ZS55ICE9IDApIHtcclxuLy8gICAgICAgICAgICAgICAgIHRoaXMuX3Byb2Nlc3NTY3JvbGxpbmdFdmVudCgpO1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIGlmIChzY3JvbGxlZFRvQm90dG9tKSB7XHJcbi8vICAgICAgICAgICAgICAgICB0aGlzLl9wcm9jZXNzU2Nyb2xsRXZlbnQoY2N1aS5TY3JvbGxWaWV3Lk1PVkVESVJfQk9UVE9NLCBmYWxzZSk7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgaWYgKHNjcm9sbGVkVG9Ub3ApIHtcclxuLy8gICAgICAgICAgICAgICAgIHRoaXMuX3Byb2Nlc3NTY3JvbGxFdmVudChjY3VpLlNjcm9sbFZpZXcuTU9WRURJUl9UT1AsIGZhbHNlKTtcclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICBpZiAoc2Nyb2xsZWRUb0xlZnQpIHtcclxuLy8gICAgICAgICAgICAgICAgIHRoaXMuX3Byb2Nlc3NTY3JvbGxFdmVudChjY3VpLlNjcm9sbFZpZXcuTU9WRURJUl9MRUZULCBmYWxzZSk7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgaWYgKHNjcm9sbGVkVG9SaWdodCkge1xyXG4vLyAgICAgICAgICAgICAgICAgdGhpcy5fcHJvY2Vzc1Njcm9sbEV2ZW50KGNjdWkuU2Nyb2xsVmlldy5NT1ZFRElSX1JJR0hULCBmYWxzZSk7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIF9zdGFydEF1dG9TY3JvbGxUb0Rlc3RpbmF0aW9uKGRlc3RpbmF0aW9uLCB0aW1lSW5TZWMsIGF0dGVudWF0ZWQpIHtcclxuLy8gICAgICAgICAgICAgdGhpcy5fc3RhcnRBdXRvU2Nyb2xsKGNjLnBTdWIoZGVzdGluYXRpb24sIHRoaXMuZ2V0SW5uZXJDb250YWluZXJQb3NpdGlvbigpKSwgdGltZUluU2VjLCBhdHRlbnVhdGVkKTtcclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIHNjcm9sbFRvQm90dG9tKHRpbWUsIGF0dGVudWF0ZWQpIHtcclxuLy8gICAgICAgICAgICAgdGhpcy5fc3RhcnRBdXRvU2Nyb2xsVG9EZXN0aW5hdGlvbihjYy5wKHRoaXMuZ2V0aW5uZXJQb3NpdGlvblgoKSwgMCksIHRpbWUsIGF0dGVudWF0ZWQpO1xyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgLyoqXHJcbi8vICAgICAgICAgICogU2Nyb2xsIGlubmVyIGNvbnRhaW5lciB0byB0b3AgYm91bmRhcnkgb2YgU2Nyb2xsVmlldy5cclxuLy8gICAgICAgICAgKiBAcGFyYW0ge051bWJlcn0gdGltZVxyXG4vLyAgICAgICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gYXR0ZW51YXRlZFxyXG4vLyAgICAgICAgICAqL1xyXG4vLyAgICAgICAgIHNjcm9sbFRvVG9wKHRpbWUsIGF0dGVudWF0ZWQpIHtcclxuLy8gICAgICAgICAgICAgLy8gdGhpcy5fc3RhcnRBdXRvU2Nyb2xsVG9EZXN0aW5hdGlvbihcclxuLy8gICAgICAgICAgICAgLy8gICAgIGNjLnAodGhpcy5faW5uZXJDb250YWluZXIuZ2V0UG9zaXRpb25YKCksIHRoaXMuX2NvbnRlbnRTaXplLmhlaWdodCAtIHRoaXMuX2lubmVyQ29udGFpbmVyLmdldENvbnRlbnRTaXplKCkuaGVpZ2h0KSwgdGltZSwgYXR0ZW51YXRlZCk7XHJcblxyXG4vLyAgICAgICAgICAgICB0aGlzLl9zdGFydEF1dG9TY3JvbGxUb0Rlc3RpbmF0aW9uKFxyXG4vLyAgICAgICAgICAgICAgICAgY2MucCh0aGlzLmdldGlubmVyUG9zaXRpb25YKCksIHRoaXMuX2NvbnRlbnRTaXplLmhlaWdodCAtIHRoaXMuZ2V0SW5uZXJIZWlnaHQoKSksIHRpbWUsIGF0dGVudWF0ZWQpO1xyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgLyoqXHJcbi8vICAgICAgICAgICogU2Nyb2xsIGlubmVyIGNvbnRhaW5lciB0byBsZWZ0IGJvdW5kYXJ5IG9mIFNjcm9sbFZpZXcuXHJcbi8vICAgICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IHRpbWVcclxuLy8gICAgICAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IGF0dGVudWF0ZWRcclxuLy8gICAgICAgICAgKi9cclxuLy8gICAgICAgICBzY3JvbGxUb0xlZnQodGltZSwgYXR0ZW51YXRlZCkge1xyXG4vLyAgICAgICAgICAgICAvLyB0aGlzLl9zdGFydEF1dG9TY3JvbGxUb0Rlc3RpbmF0aW9uKGNjLnAoMCwgdGhpcy5faW5uZXJDb250YWluZXIuZ2V0UG9zaXRpb25ZKCkpLCB0aW1lLCBhdHRlbnVhdGVkKTtcclxuLy8gICAgICAgICAgICAgdGhpcy5fc3RhcnRBdXRvU2Nyb2xsVG9EZXN0aW5hdGlvbihjYy5wKDAsIHRoaXMuZ2V0aW5uZXJQb3NpdGlvblkoKSksIHRpbWUsIGF0dGVudWF0ZWQpO1xyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgLyoqXHJcbi8vICAgICAgICAgICogU2Nyb2xsIGlubmVyIGNvbnRhaW5lciB0byByaWdodCBib3VuZGFyeSBvZiBTY3JvbGxWaWV3LlxyXG4vLyAgICAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSB0aW1lXHJcbi8vICAgICAgICAgICogQHBhcmFtIHtCb29sZWFufSBhdHRlbnVhdGVkXHJcbi8vICAgICAgICAgICovXHJcbi8vICAgICAgICAgc2Nyb2xsVG9SaWdodCh0aW1lLCBhdHRlbnVhdGVkKSB7XHJcbi8vICAgICAgICAgICAgIC8vIHRoaXMuX3N0YXJ0QXV0b1Njcm9sbFRvRGVzdGluYXRpb24oXHJcbi8vICAgICAgICAgICAgIC8vICAgICBjYy5wKHRoaXMuX2NvbnRlbnRTaXplLndpZHRoIC0gdGhpcy5faW5uZXJDb250YWluZXIuZ2V0Q29udGVudFNpemUoKS53aWR0aCwgdGhpcy5faW5uZXJDb250YWluZXIuZ2V0UG9zaXRpb25ZKCkpLCB0aW1lLCBhdHRlbnVhdGVkKTtcclxuLy8gICAgICAgICAgICAgdGhpcy5fc3RhcnRBdXRvU2Nyb2xsVG9EZXN0aW5hdGlvbihcclxuLy8gICAgICAgICAgICAgICAgIGNjLnAodGhpcy5fY29udGVudFNpemUud2lkdGggLSB0aGlzLmdldElubmVyV2lkdGgoKSxcclxuLy8gICAgICAgICAgICAgICAgICAgICB0aGlzLmdldGlubmVyUG9zaXRpb25ZKCkpLCB0aW1lLCBhdHRlbnVhdGVkKTtcclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIHNjcm9sbFRvVG9wUmlnaHQodGltZSwgYXR0ZW51YXRlZCkge1xyXG4vLyAgICAgICAgICAgICBpZiAodGhpcy5fZGlyZWN0aW9uICE9PSBjY3VpLlNjcm9sbFZpZXcuRElSX0JPVEgpIHtcclxuLy8gICAgICAgICAgICAgICAgIGNjLmxvZyhcIlNjcm9sbCBkaXJlY3Rpb24gaXMgbm90IGJvdGghXCIpO1xyXG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIC8vdmFyIGluU2l6ZSA9IHRoaXMuX2lubmVyQ29udGFpbmVyLmdldENvbnRlbnRTaXplKCk7XHJcbi8vICAgICAgICAgICAgIHZhciBpblNpemUgPSB0aGlzLmdldElubmVyQ29udGFpbmVyU2l6ZSgpO1xyXG4vLyAgICAgICAgICAgICB0aGlzLl9zdGFydEF1dG9TY3JvbGxUb0Rlc3RpbmF0aW9uKGNjLnAodGhpcy5fY29udGVudFNpemUud2lkdGggLSBpblNpemUud2lkdGgsXHJcbi8vICAgICAgICAgICAgICAgICB0aGlzLl9jb250ZW50U2l6ZS5oZWlnaHQgLSBpblNpemUuaGVpZ2h0KSwgdGltZSwgYXR0ZW51YXRlZCk7XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICAgIHNjcm9sbFRvQm90dG9tUmlnaHQodGltZSwgYXR0ZW51YXRlZCkge1xyXG4vLyAgICAgICAgICAgICBpZiAodGhpcy5fZGlyZWN0aW9uICE9PSBjY3VpLlNjcm9sbFZpZXcuRElSX0JPVEgpIHtcclxuLy8gICAgICAgICAgICAgICAgIGNjLmxvZyhcIlNjcm9sbCBkaXJlY3Rpb24gaXMgbm90IGJvdGghXCIpO1xyXG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIC8vIHRoaXMuX3N0YXJ0QXV0b1Njcm9sbFRvRGVzdGluYXRpb24oY2MucCh0aGlzLl9jb250ZW50U2l6ZS53aWR0aCAtIHRoaXMuX2lubmVyQ29udGFpbmVyLmdldENvbnRlbnRTaXplKCkud2lkdGgsIDApLCB0aW1lLCBhdHRlbnVhdGVkKTtcclxuLy8gICAgICAgICAgICAgdGhpcy5fc3RhcnRBdXRvU2Nyb2xsVG9EZXN0aW5hdGlvbihjYy5wKHRoaXMuX2NvbnRlbnRTaXplLndpZHRoIC0gdGhpcy5nZXRJbm5lcldpZHRoKCksIDApLCB0aW1lLCBhdHRlbnVhdGVkKTtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgc2Nyb2xsVG9QZXJjZW50VmVydGljYWwocGVyY2VudCwgdGltZSwgYXR0ZW51YXRlZCkge1xyXG4vLyAgICAgICAgICAgICAvLyB2YXIgbWluWSA9IHRoaXMuX2NvbnRlbnRTaXplLmhlaWdodCAtIHRoaXMuX2lubmVyQ29udGFpbmVyLmdldENvbnRlbnRTaXplKCkuaGVpZ2h0O1xyXG4vLyAgICAgICAgICAgICB2YXIgbWluWSA9IHRoaXMuX2NvbnRlbnRTaXplLmhlaWdodCAtIHRoaXMuZ2V0SW5uZXJIZWlnaHQoKTtcclxuLy8gICAgICAgICAgICAgdmFyIGggPSAtbWluWTtcclxuLy8gICAgICAgICAgICAgLy8gdGhpcy5fc3RhcnRBdXRvU2Nyb2xsVG9EZXN0aW5hdGlvbihjYy5wKHRoaXMuX2lubmVyQ29udGFpbmVyLmdldFBvc2l0aW9uWCgpLCBtaW5ZICsgcGVyY2VudCAqIGggLyAxMDApLCB0aW1lLCBhdHRlbnVhdGVkKTtcclxuLy8gICAgICAgICAgICAgdGhpcy5fc3RhcnRBdXRvU2Nyb2xsVG9EZXN0aW5hdGlvbihjYy5wKHRoaXMuZ2V0aW5uZXJQb3NpdGlvblgoKSwgbWluWSArIHBlcmNlbnQgKiBoIC8gMTAwKSwgdGltZSwgYXR0ZW51YXRlZCk7XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBzY3JvbGxUb1BlcmNlbnRIb3Jpem9udGFsKHBlcmNlbnQsIHRpbWUsIGF0dGVudWF0ZWQpIHtcclxuLy8gICAgICAgICAgICAgLy8gdmFyIHcgPSB0aGlzLl9pbm5lckNvbnRhaW5lci5nZXRDb250ZW50U2l6ZSgpLndpZHRoIC0gdGhpcy5fY29udGVudFNpemUud2lkdGg7XHJcbi8vICAgICAgICAgICAgIHZhciB3ID0gdGhpcy5nZXRJbm5lcldpZHRoKCkgLSB0aGlzLl9jb250ZW50U2l6ZS53aWR0aDtcclxuLy8gICAgICAgICAgICAgdGhpcy5fc3RhcnRBdXRvU2Nyb2xsVG9EZXN0aW5hdGlvbihjYy5wKC0ocGVyY2VudCAqIHcgLyAxMDApLCB0aGlzLmdldGlubmVyUG9zaXRpb25ZKCkpLCB0aW1lLCBhdHRlbnVhdGVkKTtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgX2p1bXBUb0Rlc3RpbmF0aW9uKGRlc09yWCwgeSkge1xyXG4vLyAgICAgICAgICAgICBpZiAoZGVzT3JYLnggPT09IHVuZGVmaW5lZCkge1xyXG4vLyAgICAgICAgICAgICAgICAgZGVzT3JYID0gY2MucChkZXNPclgsIHkpO1xyXG4vLyAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgICAgICB0aGlzLl9hdXRvU2Nyb2xsaW5nID0gZmFsc2U7XHJcbi8vICAgICAgICAgICAgIHRoaXMuX21vdmVJbm5lckNvbnRhaW5lcihjYy5wU3ViKGRlc09yWCwgdGhpcy5nZXRJbm5lckNvbnRhaW5lclBvc2l0aW9uKCkpLCB0cnVlKTtcclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIHNjcm9sbFRvUGVyY2VudEJvdGhEaXJlY3Rpb24ocGVyY2VudCwgdGltZSwgYXR0ZW51YXRlZCkge1xyXG4vLyAgICAgICAgICAgICBpZiAodGhpcy5fZGlyZWN0aW9uICE9PSBjY3VpLlNjcm9sbFZpZXcuRElSX0JPVEgpXHJcbi8vICAgICAgICAgICAgICAgICByZXR1cm47XHJcbi8vICAgICAgICAgICAgIC8vIHZhciBtaW5ZID0gdGhpcy5fY29udGVudFNpemUuaGVpZ2h0IC0gdGhpcy5faW5uZXJDb250YWluZXIuZ2V0Q29udGVudFNpemUoKS5oZWlnaHQ7XHJcbi8vICAgICAgICAgICAgIHZhciBtaW5ZID0gdGhpcy5fY29udGVudFNpemUuaGVpZ2h0IC0gdGhpcy5nZXRJbm5lckhlaWdodCgpO1xyXG4vLyAgICAgICAgICAgICB2YXIgaCA9IC1taW5ZO1xyXG4vLyAgICAgICAgICAgICAvLyB2YXIgdyA9IHRoaXMuX2lubmVyQ29udGFpbmVyLmdldENvbnRlbnRTaXplKCkud2lkdGggLSB0aGlzLl9jb250ZW50U2l6ZS53aWR0aDtcclxuLy8gICAgICAgICAgICAgdmFyIHcgPSB0aGlzLmdldElubmVyV2lkdGgoKSAtIHRoaXMuX2NvbnRlbnRTaXplLndpZHRoO1xyXG4vLyAgICAgICAgICAgICB0aGlzLl9zdGFydEF1dG9TY3JvbGxUb0Rlc3RpbmF0aW9uKGNjLnAoLShwZXJjZW50LnggKiB3IC8gMTAwKSwgbWluWSArIHBlcmNlbnQueSAqIGggLyAxMDApLCB0aW1lLCBhdHRlbnVhdGVkKTtcclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIGp1bXBUb0JvdHRvbSgpIHtcclxuLy8gICAgICAgICAgICAgLy8gdGhpcy5fanVtcFRvRGVzdGluYXRpb24odGhpcy5faW5uZXJDb250YWluZXIuZ2V0UG9zaXRpb25YKCksIDApO1xyXG4vLyAgICAgICAgICAgICB0aGlzLl9qdW1wVG9EZXN0aW5hdGlvbih0aGlzLmdldGlubmVyUG9zaXRpb25YKCksIDApO1xyXG4vLyAgICAgICAgIH1cclxuXHJcblxyXG5cclxuLy8gICAgICAgICBqdW1wVG9Ub3AoKSB7XHJcbi8vICAgICAgICAgICAgIHRoaXMuX2p1bXBUb0Rlc3RpbmF0aW9uKHRoaXMuZ2V0aW5uZXJQb3NpdGlvblgoKSwgdGhpcy5fY29udGVudFNpemUuaGVpZ2h0IC0gdGhpcy5nZXRJbm5lckhlaWdodCgpKTtcclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIC8qKlxyXG4vLyAgICAgICAgICAqIE1vdmUgaW5uZXIgY29udGFpbmVyIHRvIGxlZnQgYm91bmRhcnkgb2YgU2Nyb2xsVmlldy5cclxuLy8gICAgICAgICAgKi9cclxuLy8gICAgICAgICBqdW1wVG9MZWZ0KCkge1xyXG4vLyAgICAgICAgICAgICB0aGlzLl9qdW1wVG9EZXN0aW5hdGlvbigwLCB0aGlzLmdldGlubmVyUG9zaXRpb25ZKCkpO1xyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgLyoqXHJcbi8vICAgICAgICAgICogTW92ZSBpbm5lciBjb250YWluZXIgdG8gcmlnaHQgYm91bmRhcnkgb2YgU2Nyb2xsVmlldy5cclxuLy8gICAgICAgICAgKi9cclxuLy8gICAgICAgICBqdW1wVG9SaWdodCgpIHtcclxuLy8gICAgICAgICAgICAgdGhpcy5fanVtcFRvRGVzdGluYXRpb24odGhpcy5fY29udGVudFNpemUud2lkdGggLSB0aGlzLmdldElubmVyV2lkdGgoKSwgdGhpcy5nZXRpbm5lclBvc2l0aW9uWSgpKTtcclxuLy8gICAgICAgICB9XHJcblxyXG5cclxuLy8gICAgICAgICAvKipcclxuLy8gICAgICogTW92ZSBpbm5lciBjb250YWluZXIgdG8gdG9wIGFuZCByaWdodCBib3VuZGFyeSBvZiBTY3JvbGxWaWV3LlxyXG4vLyAgICAgKi9cclxuLy8gICAgICAgICBqdW1wVG9Ub3BSaWdodCgpIHtcclxuLy8gICAgICAgICAgICAgaWYgKHRoaXMuX2RpcmVjdGlvbiAhPT0gY2N1aS5TY3JvbGxWaWV3LkRJUl9CT1RIKSB7XHJcbi8vICAgICAgICAgICAgICAgICBjYy5sb2coXCJTY3JvbGwgX2RpcmVjdGlvbiBpcyBub3QgYm90aCFcIik7XHJcbi8vICAgICAgICAgICAgICAgICByZXR1cm47XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgdmFyIGluU2l6ZSA9IHRoaXMuZ2V0SW5uZXJDb250YWluZXJTaXplKCk7XHJcbi8vICAgICAgICAgICAgIHRoaXMuX2p1bXBUb0Rlc3RpbmF0aW9uKHRoaXMuX2NvbnRlbnRTaXplLndpZHRoIC0gaW5TaXplLndpZHRoLCB0aGlzLl9jb250ZW50U2l6ZS5oZWlnaHQgLSBpblNpemUuaGVpZ2h0KTtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgLyoqXHJcbi8vICAgICAgICAgICogTW92ZSBpbm5lciBjb250YWluZXIgdG8gYm90dG9tIGFuZCBsZWZ0IGJvdW5kYXJ5IG9mIFNjcm9sbFZpZXcuXHJcbi8vICAgICAgICAgICovXHJcbi8vICAgICAgICAganVtcFRvQm90dG9tTGVmdCgpIHtcclxuLy8gICAgICAgICAgICAgaWYgKHRoaXMuX2RpcmVjdGlvbiAhPT0gY2N1aS5TY3JvbGxWaWV3LkRJUl9CT1RIKSB7XHJcbi8vICAgICAgICAgICAgICAgICBjYy5sb2coXCJTY3JvbGwgX2RpcmVjdGlvbiBpcyBub3QgYm90aCFcIik7XHJcbi8vICAgICAgICAgICAgICAgICByZXR1cm47XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgdGhpcy5fanVtcFRvRGVzdGluYXRpb24oMCwgMCk7XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAvKipcclxuLy8gICAgICAgICAgKiBNb3ZlIGlubmVyIGNvbnRhaW5lciB0byBib3R0b20gYW5kIHJpZ2h0IGJvdW5kYXJ5IG9mIFNjcm9sbFZpZXcuXHJcbi8vICAgICAgICAgICovXHJcbi8vICAgICAgICAganVtcFRvQm90dG9tUmlnaHQoKSB7XHJcbi8vICAgICAgICAgICAgIGlmICh0aGlzLl9kaXJlY3Rpb24gIT09IGNjdWkuU2Nyb2xsVmlldy5ESVJfQk9USCkge1xyXG4vLyAgICAgICAgICAgICAgICAgY2MubG9nKFwiU2Nyb2xsIF9kaXJlY3Rpb24gaXMgbm90IGJvdGghXCIpO1xyXG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIHRoaXMuX2p1bXBUb0Rlc3RpbmF0aW9uKHRoaXMuX2NvbnRlbnRTaXplLndpZHRoIC0gdGhpcy5nZXRJbm5lckNvbnRhaW5lclNpemUoKS53aWR0aCwgMCk7XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBqdW1wVG9QZXJjZW50VmVydGljYWwocGVyY2VudCkge1xyXG4vLyAgICAgICAgICAgICB2YXIgbWluWSA9IHRoaXMuX2NvbnRlbnRTaXplLmhlaWdodCAtIHRoaXMuZ2V0SW5uZXJDb250YWluZXJTaXplKCkuaGVpZ2h0O1xyXG4vLyAgICAgICAgICAgICB2YXIgaCA9IC1taW5ZO1xyXG4vLyAgICAgICAgICAgICB0aGlzLl9qdW1wVG9EZXN0aW5hdGlvbih0aGlzLmdldGlubmVyUG9zaXRpb25YKCksIG1pblkgKyBwZXJjZW50ICogaCAvIDEwMCk7XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAvKipcclxuLy8gICAgICAgICAgKiBNb3ZlIGlubmVyIGNvbnRhaW5lciB0byBob3Jpem9udGFsIHBlcmNlbnQgcG9zaXRpb24gb2YgU2Nyb2xsVmlldy5cclxuLy8gICAgICAgICAgKiBAcGFyYW0ge051bWJlcn0gcGVyY2VudCBUaGUgZGVzdGluYXRpb24gdmVydGljYWwgcGVyY2VudCwgYWNjZXB0IHZhbHVlIGJldHdlZW4gMCAtIDEwMFxyXG4vLyAgICAgICAgICAqL1xyXG4vLyAgICAgICAgIGp1bXBUb1BlcmNlbnRIb3Jpem9udGFsKHBlcmNlbnQpIHtcclxuLy8gICAgICAgICAgICAgdmFyIHcgPSB0aGlzLmdldElubmVyQ29udGFpbmVyU2l6ZSgpLndpZHRoIC0gdGhpcy5fY29udGVudFNpemUud2lkdGg7XHJcbi8vICAgICAgICAgICAgIHRoaXMuX2p1bXBUb0Rlc3RpbmF0aW9uKC0ocGVyY2VudCAqIHcgLyAxMDApLCB0aGlzLmdldGlubmVyUG9zaXRpb25ZKCkpO1xyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAganVtcFRvUGVyY2VudEJvdGhEaXJlY3Rpb24ocGVyY2VudCkge1xyXG4vLyAgICAgICAgICAgICBpZiAodGhpcy5fZGlyZWN0aW9uICE9PSBjY3VpLlNjcm9sbFZpZXcuRElSX0JPVEgpXHJcbi8vICAgICAgICAgICAgICAgICByZXR1cm47XHJcbi8vICAgICAgICAgICAgIHZhciBpblNpemUgPSB0aGlzLmdldElubmVyQ29udGFpbmVyU2l6ZSgpO1xyXG4vLyAgICAgICAgICAgICB2YXIgbWluWSA9IHRoaXMuX2NvbnRlbnRTaXplLmhlaWdodCAtIGluU2l6ZS5oZWlnaHQ7XHJcbi8vICAgICAgICAgICAgIHZhciBoID0gLW1pblk7XHJcbi8vICAgICAgICAgICAgIHZhciB3ID0gaW5TaXplLndpZHRoIC0gdGhpcy5fY29udGVudFNpemUud2lkdGg7XHJcbi8vICAgICAgICAgICAgIHRoaXMuX2p1bXBUb0Rlc3RpbmF0aW9uKC0ocGVyY2VudC54ICogdyAvIDEwMCksIG1pblkgKyBwZXJjZW50LnkgKiBoIC8gMTAwKTtcclxuLy8gICAgICAgICB9XHJcblxyXG5cclxuXHJcblxyXG4vLyAgICAgICAgIC8qKlxyXG4vLyAgICAgKiBSZXR1cm5zIGEgbm9kZSBieSB0YWdcclxuLy8gICAgICogQHBhcmFtIHtOdW1iZXJ9IHRhZ1xyXG4vLyAgICAgKiBAcmV0dXJucyB7Y2MuTm9kZX1cclxuLy8gICAgICogQGRlcHJlY2F0ZWQgIHNpbmNlIHYzLjAsIHBsZWFzZSB1c2UgZ2V0Q2hpbGRCeVRhZyBpbnN0ZWFkLlxyXG4vLyAgICAgKi9cclxuLy8gICAgICAgICBnZXROb2RlQnlUYWcodGFnKSB7XHJcbi8vICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldE5vZGVCeVRhZyh0YWcpO1xyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgLyoqXHJcbi8vICAgICAgICAgICogUmV0dXJucyBhbGwgbm9kZXMgb2YgaW5uZXIgY29udGFpbmVyXHJcbi8vICAgICAgICAgICogQHJldHVybnMge0FycmF5fVxyXG4vLyAgICAgICAgICAqIEBkZXByZWNhdGVkIHNpbmNlIHYzLjAsIHBsZWFzZSB1c2UgZ2V0Q2hpbGRyZW4gaW5zdGVhZC5cclxuLy8gICAgICAgICAgKi9cclxuLy8gICAgICAgICBnZXROb2RlcygpIHtcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Tm9kZXMoKTtcclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIC8qKlxyXG4vLyAgICAgICAgICAqIFJlbW92ZXMgYSBub2RlIGZyb20gY2N1aS5TY3JvbGxWaWV3LlxyXG4vLyAgICAgICAgICAqIEBwYXJhbSB7Y2MuTm9kZX0gbm9kZVxyXG4vLyAgICAgICAgICAqIEBkZXByZWNhdGVkIHNpbmNlIHYzLjAsIHBsZWFzZSB1c2UgcmVtb3ZlQ2hpbGQgaW5zdGVhZC5cclxuLy8gICAgICAgICAgKi9cclxuLy8gICAgICAgICByZW1vdmVOb2RlKG5vZGUpIHtcclxuLy8gICAgICAgICAgICAgdGhpcy5yZW1vdmVOb2RlKG5vZGUpO1xyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgLyoqXHJcbi8vICAgICAgICAgICogUmVtb3ZlcyBhIG5vZGUgYnkgdGFnXHJcbi8vICAgICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IHRhZ1xyXG4vLyAgICAgICAgICAqIEBkZXByZWNhdGVkIHNpbmNlIHYzLjAsIHBsZWFzZSB1c2UgcmVtb3ZlQ2hpbGRCeVRhZyBpbnN0ZWFkLlxyXG4vLyAgICAgICAgICAqL1xyXG4vLyAgICAgICAgIHJlbW92ZU5vZGVCeVRhZyh0YWcpIHtcclxuLy8gICAgICAgICAgICAgdGhpcy5yZW1vdmVOb2RlQnlUYWcodGFnKTtcclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIC8qKlxyXG4vLyAgICAgICAgICAqIFJlbW92ZSBhbGwgbm9kZSBmcm9tIGNjdWkuU2Nyb2xsVmlldy5cclxuLy8gICAgICAgICAgKiBAZGVwcmVjYXRlZCBzaW5jZSB2My4wLCBwbGVhc2UgdXNlIHJlbW92ZUFsbENoaWxkcmVuIGluc3RlYWQuXHJcbi8vICAgICAgICAgICovXHJcbi8vICAgICAgICAgcmVtb3ZlQWxsTm9kZXMoKSB7XHJcbi8vICAgICAgICAgICAgIHRoaXMucmVtb3ZlQWxsTm9kZXMoKTtcclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIC8qKlxyXG4vLyAgICAgICAgICAqIEFkZCBub2RlIGZvciBzY3JvbGxWaWV3XHJcbi8vICAgICAgICAgICogQHBhcmFtIHtjYy5Ob2RlfSBub2RlXHJcbi8vICAgICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IHpPcmRlclxyXG4vLyAgICAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSB0YWdcclxuLy8gICAgICAgICAgKiBAZGVwcmVjYXRlZCBzaW5jZSB2My4wLCBwbGVhc2UgdXNlIGFkZENoaWxkIGluc3RlYWQuXHJcbi8vICAgICAgICAgICovXHJcbi8vICAgICAgICAgYWRkTm9kZShub2RlLCB6T3JkZXIsIHRhZykge1xyXG4vLyAgICAgICAgICAgICB0aGlzLmFkZE5vZGUobm9kZSwgek9yZGVyLCB0YWcpO1xyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgZ2V0SW5uZXJDb250YWluZXIoKSB7XHJcbi8vICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgLyoqXHJcbi8vICAgICAgICAgICogU2V0cyBMYXlvdXRUeXBlIG9mIGNjdWkuU2Nyb2xsVmlldy5cclxuLy8gICAgICAgICAgKiBAcGFyYW0ge2NjdWkuTGF5b3V0LkFCU09MVVRFfGNjdWkuTGF5b3V0LkxJTkVBUl9WRVJUSUNBTHxjY3VpLkxheW91dC5MSU5FQVJfSE9SSVpPTlRBTHxjY3VpLkxheW91dC5SRUxBVElWRX0gdHlwZVxyXG4vLyAgICAgICAgICAqL1xyXG4vLyAgICAgICAgIHNldExheW91dFR5cGUodHlwZSkge1xyXG4vLyAgICAgICAgICAgICAvLyB0aGlzLl9pbm5lckNvbnRhaW5lci5zZXRMYXlvdXRUeXBlKHR5cGUpO1xyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgLyoqXHJcbi8vICAgICAgICAgICogUmV0dXJucyB0aGUgbGF5b3V0IHR5cGUgb2YgY2N1aS5TY3JvbGxWaWV3LlxyXG4vLyAgICAgICAgICAqIEByZXR1cm5zIHtjY3VpLkxheW91dC5BQlNPTFVURXxjY3VpLkxheW91dC5MSU5FQVJfVkVSVElDQUx8Y2N1aS5MYXlvdXQuTElORUFSX0hPUklaT05UQUx8Y2N1aS5MYXlvdXQuUkVMQVRJVkV9XHJcbi8vICAgICAgICAgICovXHJcbi8vICAgICAgICAgZ2V0TGF5b3V0VHlwZSgpIHtcclxuLy8gICAgICAgICAgICAgcmV0dXJuIGNjdWkuTGF5b3V0LkxJTkVBUl9WRVJUSUNBTDsvL3RoaXMuX2lubmVyQ29udGFpbmVyLmdldExheW91dFR5cGUoKTtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICB9XHJcblxyXG59IiwibmFtZXNwYWNlIGthYXlvdSB7XHJcbiAgICBleHBvcnQgY2xhc3MgU291bmRNYW5hZ2VyIHtcclxuICAgICAgICBzdGF0aWMgX19JTlNfXzogU291bmRNYW5hZ2VyID0gbnVsbDtcclxuICAgICAgICBzdGF0aWMgZ2V0SW5zdGFuY2UoKSB7XHJcbiAgICAgICAgICAgIGlmIChTb3VuZE1hbmFnZXIuX19JTlNfXyA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBTb3VuZE1hbmFnZXIuX19JTlNfXyA9IG5ldyBTb3VuZE1hbmFnZXIoKTtcclxuICAgICAgICAgICAgICAgIFNvdW5kTWFuYWdlci5fX0lOU19fLmluaXQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gU291bmRNYW5hZ2VyLl9fSU5TX187XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGluaXQoKSB7IH1cclxuXHJcbiAgICAgICAgLy/mkq3mlL7og4zmma/pn7PkuZBcclxuICAgICAgICBwbGF5QmdtKHVybDogc3RyaW5nLCBsb29wOiBib29sZWFuID0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBpZiAoJ2ZhbHNlJyA9PT0gY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2dfbXVzaWMnKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghdXJsKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuS4jeWtmOWcqOmfs+S5kDpcIiArIHVybCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheU11c2ljKHVybCwgbG9vcCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2JvZmFuZyB5aW54aWFvXHJcbiAgICAgICAgcGxheVNvdW5kKHVybDogc3RyaW5nLCBsb29wOiBib29sZWFuID0gZmFsc2UpIHtcclxuICAgICAgICAgICAgaWYgKCdmYWxzZScgPT09IGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9nX2VmZmVjdCcpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCF1cmwpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5LiN5a2Y5Zyo6Z+z5pWIOlwiICsgdXJsKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHVybCwgbG9vcCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+aYr+WQpuiuvue9rumdmemfsyzkvb/nlKjkupHlqIPnmoTml7blgJnkvJrnlKjliLBcclxuICAgICAgICBzZXRNdXRlKGI6IGJvb2xlYW4pIHtcclxuICAgICAgICAgICAgaWYgKGIpIHtcclxuICAgICAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnNldE11c2ljVm9sdW1lKDApO1xyXG4gICAgICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUuc2V0RWZmZWN0c1ZvbHVtZSgwKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnNldE11c2ljVm9sdW1lKDAuNSk7XHJcbiAgICAgICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5zZXRFZmZlY3RzVm9sdW1lKDAuNSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSBpc1JlbGVhc2Ug5piv5ZCm6YeK5pS+5aOw6Z+z5pWw5o2u77yM6buY6K6k5Li6ZmFsc2VcclxuICAgICAgICAgKi9cclxuICAgICAgICBzdG9wTXVzaWMoaXNSZWxlYXNlOiBib29sZWFuID0gZmFsc2UpIHtcclxuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUuc3RvcE11c2ljKGlzUmVsZWFzZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwYXVzZU11c2ljKCkge1xyXG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wYXVzZU11c2ljKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXN1bWVNdXNpYygpIHtcclxuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucmVzdW1lTXVzaWMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZGVmYXVsdFNvdW5kOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9ID0gbnVsbDtcclxuICAgICAgICBwdWJsaWMgc2V0RGVmYXVsdFNvdW5kKGE6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0pIHtcclxuICAgICAgICAgICAgdGhpcy5kZWZhdWx0U291bmQgPSBsb2Rhc2guZXh0ZW5kKHt9LCB0aGlzLmRlZmF1bHRTb3VuZCwgYSlcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIHNldEJ0bkNsaWNrU291bmRzKCkge1xyXG4gICAgICAgICAgICBsZXQgc291bmRyZXMgPSB0aGlzLmRlZmF1bHRTb3VuZFsnQ2xpY2tCdG4nXTtcclxuICAgICAgICAgICAgc291bmRyZXMgJiYgdGhpcy5wbGF5U291bmQoc291bmRyZXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgc2V0Q2xvY2VTb3VuZHMoKSB7XHJcbiAgICAgICAgICAgIGxldCBzb3VuZHJlcyA9IHRoaXMuZGVmYXVsdFNvdW5kWydDbGlja0J0bkNsb3NlJ107XHJcbiAgICAgICAgICAgIHNvdW5kcmVzICYmIHRoaXMucGxheVNvdW5kKHNvdW5kcmVzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIHNldFN3aXRjaFNvdW5kcygpIHtcclxuICAgICAgICAgICAgbGV0IHNvdW5kcmVzID0gdGhpcy5kZWZhdWx0U291bmRbJ0NsaWNrQnRuU3dpdGNoJ107XHJcbiAgICAgICAgICAgIHNvdW5kcmVzICYmIHRoaXMucGxheVNvdW5kKHNvdW5kcmVzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5TXVzaWMoICB1cmwgLCBsb29wICk7IFxyXG4gICAgICAgIC8vIEBwYXJhbSB7U3RyaW5nfSB1cmwg5aOw6Z+z6Lev5b6EXHJcbiAgICAgICAgLy8gQHBhcmFtIHtCb29sZWFufSBsb29wIOaYr+WQpuW+queOr+aSreaUvlxyXG5cclxuICAgICAgICAvLyDlgZzmraLog4zmma/pn7PkuZBcclxuICAgICAgICAvLyBjYy5hdWRpb0VuZ2luZS5zdG9wTXVzaWMgKHJlbGVhc2VEYXRhKTtcclxuICAgICAgICAvLyAqIEBwYXJhbSB7Qm9vbGVhbn0gcmVsZWFzZURhdGEg5piv5ZCm6YeK5pS+5aOw6Z+z5pWw5o2u77yM6buY6K6k5Li6ZmFsc2VcclxuXHJcbiAgICAgICAgLy8g5pqC5YGc6IOM5pmv6Z+z5LmQXHJcbiAgICAgICAgLy8gY2MuYXVkaW9FbmdpbmUucGF1c2VNdXNpYygpO1xyXG5cclxuICAgICAgICAvLyDmgaLlpI3og4zmma/pn7PkuZBcclxuICAgICAgICAvLyBjYy5hdWRpb0VuZ2luZS5yZXN1bWVNdXNpYyAgKCk7XHJcblxyXG4gICAgICAgIC8vIOmHjeaWsOaSreaUvuiDjOaZr+mfs+S5kFxyXG4gICAgICAgIC8vIGNjLmF1ZGlvRW5naW5lLnJld2luZE11c2ljKCk7XHJcblxyXG4gICAgICAgIC8vIOiOt+WPluiDjOaZr+mfs+S5kOmfs+mHj1xyXG4gICAgICAgIC8vIGNjLmF1ZGlvRW5naW5lLmdldE11c2ljVm9sdW1lICgpO1xyXG4gICAgICAgIC8vICogQHJldHVybiB7TnVtYmVyfSAg5YC85ZyoIDAg5YiwIDEuMCDkuYvpl7QgXHJcblxyXG4gICAgICAgIC8vIOiuvue9ruiDjOaZr+mfs+S5kOmfs+mHj1xyXG4gICAgICAgIC8vIGNjLmF1ZGlvRW5naW5lLnNldE11c2ljVm9sdW1lICAodm9sdW1lKTtcclxuICAgICAgICAvLyAqIEBwYXJhbSB7TnVtYmVyfSB2b2x1bWUg5Y+W5YC86IyD5Zu0IDAuMH4xLjAgLiBcclxuXHJcbiAgICAgICAgLy8g6I635Y+W6IOM5pmv6Z+z5LmQ5piv5ZCm5Zyo5pKt5pS+5LitXHJcbiAgICAgICAgLy8gY2MuYXVkaW9FbmdpbmUuaXNNdXNpY1BsYXlpbmcgICgpO1xyXG4gICAgICAgIC8vICogQHJldHVybiB7Qm9vbGVhbn0g5q2j5Zyo5pKt5pS+6L+U5ZuedHJ1Ze+8jOWQpuWImei/lOWbnmZhbHNlXHJcblxyXG5cclxuICAgICAgICAvLyDmkq3mlL7pn7PmlYgo5LiO6Z+z5LmQ5Z+65pys6Zu35ZCMKVxyXG4gICAgICAgIC8vIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QoICB1cmwgLCBsb29wICkgO1xyXG4gICAgICAgIC8vICogQHBhcmFtIHtTdHJpbmd9IHVybCDpn7PmlYjmlofku7bot6/lvoRcclxuICAgICAgICAvLyAqIEBwYXJhbSB7Qm9vbGVhbn0gbG9vcCDmmK/lkKblvqrnjq/mkq3mlL7vvIzpu5jorqTlgLzkuLpmYWxzZVxyXG4gICAgICAgIC8vICogQHJldHVybiB7TnVtYmVyfG51bGx9IOi/lOWbnumfs+aViElEICBhdWRpb0lEXHJcblxyXG4gICAgICAgIC8vIGNjLmF1ZGlvRW5naW5lLmdldEVmZmVjdHNWb2x1bWUoKTsvL+iOt+WPlumfs+aViOmfs+mHj1xyXG4gICAgICAgIC8vIGNjLmF1ZGlvRW5naW5lLnNldEVmZmVjdHNWb2x1bWUodm9sdW1lKTsvL+iuvue9rumfs+aViOmfs+mHj1xyXG4gICAgICAgIC8vIGNjLmF1ZGlvRW5naW5lLnBhdXNlRWZmZWN0KGF1ZGlvSUQpOy8v5pqC5YGc5a+55bqU55qE6Z+z5pWIXHJcbiAgICAgICAgLy8gY2MuYXVkaW9FbmdpbmUucGF1c2VBbGxFZmZlY3RzICAoKTsvL+aaguWBnOaJgOaciemfs+aViFxyXG4gICAgICAgIC8vIGNjLmF1ZGlvRW5naW5lLiByZXN1bWVFZmZlY3QgIChhdWRpb0lEKTsvL+aBouWkjeWvueW6lOeahOmfs+aViFxyXG4gICAgICAgIC8vIGNjLmF1ZGlvRW5naW5lLiByZXN1bWVBbGxFZmZlY3RzICAoKTsvL+aBouWkjeaJgOaciemfs+aViFxyXG4gICAgICAgIC8vIGNjLmF1ZGlvRW5naW5lLiBzdG9wRWZmZWN0ICAoYXVkaW9JRCk7Ly/lgZzmraLlr7nlupTnmoTpn7PmlYhcclxuICAgICAgICAvLyBjYy5hdWRpb0VuZ2luZS4gIHVubG9hZEVmZmVjdCAgKHVybCk7Ly/ljbjovb3lhoXlrZjnvJPlhrLljLrkuK3nmoTpn7PmlYjmlbDmja5cclxuXHJcblxyXG4gICAgICAgIC8vIOWBnOatouaSreaUvuaJgOaciemfs+S5kOWSjOmfs+aViOaWh+S7tlxyXG4gICAgICAgIC8vIGNjLmF1ZGlvRW5naW5lLmVuZCgpO1xyXG5cclxuXHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gTWFrZVJlc3VsdE1lc3NhZ2VIZWFkKCBoZWFkIDogc3RyaW5nICkgOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIndzOjpNc2c6OlwiICsgaGVhZDtcclxuICAgIH1cclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJrYWF5b3UuRGlyZWN0U2NlbmUudHNcIiAvPlxyXG5uYW1lc3BhY2Uga2FheW91IHtcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgVUlNYW5hZ2VyIHtcclxuXHJcbiAgICAgICAgc3RhdGljIF9fSU5TX186IFVJTWFuYWdlciA9IG51bGw7XHJcbiAgICAgICAgc3RhdGljIGdldEluc3RhbmNlKCkge1xyXG4gICAgICAgICAgICBpZiAoVUlNYW5hZ2VyLl9fSU5TX18gPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgVUlNYW5hZ2VyLl9fSU5TX18gPSBuZXcgVUlNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICAgICBVSU1hbmFnZXIuX19JTlNfXy5pbml0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIFVJTWFuYWdlci5fX0lOU19fO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpbml0KCkgeyB9XHJcbiAgICAgICAgU2NlbmVzOiB7IFtrZXk6IHN0cmluZ106IHR5cGVvZiBrYWF5b3Uua1NjZW5lIH0gPSB7fTtcclxuICAgICAgICBpbnN0YWxsU2NlbmUobmFtZTogc3RyaW5nLCBzY2VuZTogdHlwZW9mIGthYXlvdS5rU2NlbmUpIHtcclxuICAgICAgICAgICAgbmFtZSA9IG5hbWUudG9VcHBlckNhc2UoKTtcclxuICAgICAgICAgICAgdGhpcy5TY2VuZXNbbmFtZV0gPSBzY2VuZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdW5pbnN0YWxsU2NlbmUobmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIG5hbWUgPSBuYW1lLnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnJ1bmluZ1NjZW5lc1tuYW1lXSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ydW5pbmdTY2VuZXNbbmFtZV0ucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMucnVuaW5nU2NlbmVzW25hbWVdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLlNjZW5lc1tuYW1lXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgX01haW5TY2VuZTogTWFpblNjZW5lID0gbnVsbDtcclxuICAgICAgICBwdWJsaWMgc2V0TWFpblNjZW5lKHNjOiBNYWluU2NlbmUpIHtcclxuICAgICAgICAgICAgdGhpcy5fTWFpblNjZW5lID0gc2M7XHJcbiAgICAgICAgICAgIHNjLmluaXRVSSgpO1xyXG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5ydW5TY2VuZShzYyk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgZ2V0TWFpblNjZW5lKCk6IE1haW5TY2VuZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9NYWluU2NlbmU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgcnVuaW5nU2NlbmVzOiB7IFtrZXk6IHN0cmluZ106IGthYXlvdS5rU2NlbmUgfSA9IHt9O1xyXG4gICAgICAgIHByb3RlY3RlZCBzekluZGV4ID0gMTAwMDA7XHJcbiAgICAgICAgcHJvdGVjdGVkIF9fY3VyUnVuaW5nU2NlbmVOYW1lOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIHB1YmxpYyBydW5TY2VuZShuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgbmFtZSA9IG5hbWUudG9VcHBlckNhc2UoKTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLlNjZW5lc1tuYW1lXSkgeyBjb25zb2xlLmxvZygn5rKh5pyJ6K+l5Zy65pmv6LWE5rqQJyk7IHJldHVybjsgfVxyXG4gICAgICAgICAgICBpZiAoIXRoaXMucnVuaW5nU2NlbmVzW25hbWVdKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2NlbmUgPSBuZXcgKHRoaXMuU2NlbmVzW25hbWVdKSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ydW5pbmdTY2VuZXNbbmFtZV0gPSBzY2VuZTtcclxuICAgICAgICAgICAgICAgIC8vY2MuZGlyZWN0b3IuZ2V0UnVubmluZ1NjZW5lKCkuYWRkQ2hpbGQoc2NlbmUsMTAwMDApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRNYWluU2NlbmUoKS5nZXRTY2VuZUxheWVyKCkuYWRkQ2hpbGQoc2NlbmUsICsrdGhpcy5zekluZGV4KTtcclxuICAgICAgICAgICAgICAgIHRoaXMucnVuaW5nU2NlbmVzW25hbWVdLnNldFZpc2libGUoZmFsc2UpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucnVuaW5nU2NlbmVzW25hbWVdLmlzVmlzaWJsZSgpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5YiH5o2i5Yiw6Ieq5bex5Zy65pmvICcgKyBuYW1lKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucnVuaW5nU2NlbmVzW25hbWVdLm9uUmVFeGl0KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJ1bmluZ1NjZW5lc1tuYW1lXS5vblJlRW50ZXIoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucnVuaW5nU2NlbmVzW25hbWVdLnNldExvY2FsWk9yZGVyKCsrdGhpcy5zekluZGV4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgIHNlbGYuX19jdXJSdW5pbmdTY2VuZU5hbWUgPSBuYW1lO1xyXG4gICAgICAgICAgICBsZXQgbGFzdE5hbWVzID0gW107XHJcbiAgICAgICAgICAgIGxvZGFzaC5mb3JFYWNoKHRoaXMucnVuaW5nU2NlbmVzLCBmdW5jdGlvbiAocywgaykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGsgPT0gbmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYucnVuaW5nU2NlbmVzW2tdLnNldFZpc2libGUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLnJ1bmluZ1NjZW5lc1trXS5pc1Zpc2libGUoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0TmFtZXMucHVzaChrKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLnJ1bmluZ1NjZW5lc1tuYW1lXS5vblJlRW50ZXIoKTtcclxuICAgICAgICAgICAgZm9yICh2YXIgeCBpbiBsYXN0TmFtZXMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucnVuaW5nU2NlbmVzW2xhc3ROYW1lc1t4XV0ub25SZUV4aXQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucnVuaW5nU2NlbmVzW2xhc3ROYW1lc1t4XV0uc2V0VmlzaWJsZShmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBwcmVMb2FkU2NlbmUobmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIG5hbWUgPSBuYW1lLnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5TY2VuZXNbbmFtZV0pIHsgY29uc29sZS5sb2coJ+ayoeacieivpeWcuuaZr+i1hOa6kCcgKyBuYW1lKTsgcmV0dXJuOyB9XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5ydW5pbmdTY2VuZXNbbmFtZV0pIHtcclxuICAgICAgICAgICAgICAgIGxldCBzY2VuZSA9IG5ldyAodGhpcy5TY2VuZXNbbmFtZV0pKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJ1bmluZ1NjZW5lc1tuYW1lXSA9IHNjZW5lO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRNYWluU2NlbmUoKS5nZXRTY2VuZUxheWVyKCkuYWRkQ2hpbGQoc2NlbmUsICsrdGhpcy5zekluZGV4KTtcclxuICAgICAgICAgICAgICAgIHRoaXMucnVuaW5nU2NlbmVzW25hbWVdLnNldFZpc2libGUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG1pbk5hbWUgPSB0aGlzLl9fZ2V0TWluU2NlbmVOYW1lKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAobG9kYXNoLmlzRW1wdHkobWluTmFtZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJ1bmluZ1NjZW5lc1tuYW1lXS5zZXRMb2NhbFpPcmRlcigrK3RoaXMuc3pJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJ1bmluZ1NjZW5lc1tuYW1lXS5zZXRMb2NhbFpPcmRlcih0aGlzLnJ1bmluZ1NjZW5lc1ttaW5OYW1lXS5nZXRMb2NhbFpPcmRlcigpIC0gMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0Q3VyUnVuaW5nU2NlbmUoKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKHNlbGYuX19jdXJSdW5pbmdTY2VuZU5hbWUgPT0gXCJcIikgeyByZXR1cm4gbnVsbDsgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5ydW5pbmdTY2VuZXNbc2VsZi5fX2N1clJ1bmluZ1NjZW5lTmFtZV0gfHwgbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXRDdXJSdW5pbmdTY2VuZU5hbWUoKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgcmV0dXJuIHNlbGYuX19jdXJSdW5pbmdTY2VuZU5hbWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIF9fZ2V0TWluU2NlbmVOYW1lKCkge1xyXG4gICAgICAgICAgICBpZiAobG9kYXNoLnNpemUodGhpcy5ydW5pbmdTY2VuZXMpIDwgMSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBhcnIgPSB0aGlzLl9fZ2V0UnVuaW5nU2NlbmVBcnJheSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gYXJyWzBdLm5hbWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIF9fZ2V0UnVuaW5nU2NlbmVBcnJheSgpOiBBcnJheTx7IG5hbWU6IHN0cmluZywgb3JkZXI6IG51bWJlciB9PiB7XHJcbiAgICAgICAgICAgIGxldCBhcnI6IEFycmF5PHsgbmFtZTogc3RyaW5nLCBvcmRlcjogbnVtYmVyIH0+ID0gW107XHJcbiAgICAgICAgICAgIGZvciAodmFyIHggaW4gdGhpcy5ydW5pbmdTY2VuZXMpIHtcclxuICAgICAgICAgICAgICAgIGFyci5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiB4LFxyXG4gICAgICAgICAgICAgICAgICAgIG9yZGVyOiB0aGlzLnJ1bmluZ1NjZW5lc1t4XS5nZXRMb2NhbFpPcmRlcigpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBhcnIgPSBsb2Rhc2guc29ydEJ5KGFyciwgWydvcmRlciddKTtcclxuICAgICAgICAgICAgcmV0dXJuIGFycjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v5LiN5Lyg5Y+C5YiZ5Luj6KGo5pyA5LiK5bGC55qE5Zy65pmvXHJcbiAgICAgICAgcHVibGljIHBvcFNjZW5lKG5hbWU6IHN0cmluZyA9IG51bGwpIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChsb2Rhc2guc2l6ZSh0aGlzLnJ1bmluZ1NjZW5lcykgPCAyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChuYW1lICE9IG51bGwgJiYgbG9kYXNoLmlzRW1wdHkodGhpcy5ydW5pbmdTY2VuZXNbbmFtZV0pKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgbGV0IGFyciA9IHRoaXMuX19nZXRSdW5pbmdTY2VuZUFycmF5KCk7XHJcblxyXG4gICAgICAgICAgICBsZXQgbWF4U2NlbmVOYW1lOiBzdHJpbmcgPSBhcnJbYXJyLmxlbmd0aCAtIDFdLm5hbWU7XHJcbiAgICAgICAgICAgIGlmIChtYXhTY2VuZU5hbWUgPT0gXCJsb2dpblwiLnRvVXBwZXJDYXNlKCkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCLlt7Lnu4/liLDmnIDlupXlsYLkuoZcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBzZWNvbmRTY2VuZU5hbWUgPSBhcnJbYXJyLmxlbmd0aCAtIDJdLm5hbWU7XHJcbiAgICAgICAgICAgIGxldCBtaW5TY2VuZU5hbWUgPSBhcnJbMF0ubmFtZTtcclxuXHJcbiAgICAgICAgICAgIGlmIChsb2Rhc2guaXNFbXB0eShuYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgbmFtZSA9IG1heFNjZW5lTmFtZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKG5hbWUgIT0gbWF4U2NlbmVOYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAvL+WmguaenG5hbWXlnLrmma/kuI3mmK/mnIDkuIrlsYLlnLrmma8g77yM5bCG6ZyA6KaBcG9w55qE5Zy65pmv5oyq5Yiw5pyA5bqV5bGC5Y67XHJcbiAgICAgICAgICAgICAgICBzZWxmLnJ1bmluZ1NjZW5lc1tuYW1lXS5zZXRMb2NhbFpPcmRlcihzZWxmLnJ1bmluZ1NjZW5lc1ttaW5TY2VuZU5hbWVdLmdldExvY2FsWk9yZGVyKCkgLSAxKTtcclxuICAgICAgICAgICAgICAgIHNlbGYucnVuaW5nU2NlbmVzW25hbWVdLm9uUmVFeGl0KCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnJ1bmluZ1NjZW5lc1tuYW1lXS5zZXRWaXNpYmxlKGZhbHNlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuX19jdXJSdW5pbmdTY2VuZU5hbWUgPSBzZWNvbmRTY2VuZU5hbWU7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnJ1bmluZ1NjZW5lc1ttYXhTY2VuZU5hbWVdLnNldExvY2FsWk9yZGVyKHNlbGYucnVuaW5nU2NlbmVzW21pblNjZW5lTmFtZV0uZ2V0TG9jYWxaT3JkZXIoKSAtIDEpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGxhc3ROYW1lcyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgbG9kYXNoLmZvckVhY2godGhpcy5ydW5pbmdTY2VuZXMsIGZ1bmN0aW9uIChzLCBrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGsgPT0gc2VsZi5fX2N1clJ1bmluZ1NjZW5lTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnJ1bmluZ1NjZW5lc1trXS5zZXRWaXNpYmxlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLnJ1bmluZ1NjZW5lc1trXS5pc1Zpc2libGUoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdE5hbWVzLnB1c2goayk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciB4IGluIGxhc3ROYW1lcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucnVuaW5nU2NlbmVzW2xhc3ROYW1lc1t4XV0ub25SZUV4aXQoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJ1bmluZ1NjZW5lc1tsYXN0TmFtZXNbeF1dLnNldFZpc2libGUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgaGFzU2NlbmUobmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIG5hbWUgPSBuYW1lLnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5TY2VuZXNbbmFtZV0pIHsgY29uc29sZS5sb2coJ+ayoeacieivpeWcuuaZr+i1hOa6kCcpOyByZXR1cm4gZmFsc2U7IH1cclxuICAgICAgICAgICAgcmV0dXJuICEhdGhpcy5ydW5pbmdTY2VuZXNbbmFtZV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSJdfQ==
