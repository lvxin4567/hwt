/// <reference path="decorator.ts" />
/// <reference path="encryp.ts" />
namespace kaayou {
    export interface Ka_MSG_RES {
        head: string,
        errcode: number,
        data?: string | any,
        errmsg?: string
        msgsign: {
            time: number,
            encode: number
        }
    }

    export class Http {

        static GetRequest(search): { [key: string]: string } {
            var url = search; //获取url中"?"符后的字串   
            var theRequest = {};
            if (url.indexOf("?") != -1) {
                var str = url.substr(1);
                let strs = str.split("&");
                for (var i = 0; i < strs.length; i++) {
                    theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
                }
            }
            return theRequest;
        }

        static ExtendUrlParams(url: string, data: { [key: string]: string } = null) {

            if (!data) {
                return url;
            }
            if (!lodash.isObject(data)) {
                return url;
            }
            let overParams = {};
            if (url.indexOf("?") != -1) {
                let t = url.split("?");
                let host = t[0];
                let search = "?" + t[1];
                let params = Http.GetRequest(search);
                overParams = lodash.extend(params, data);
            } else {
                url += "?";
                overParams = lodash.extend({}, data);
            }

            for (var x in data) {
                url += x + "=" + data[x] + "&";
            }
            url = encodeURI(url.substr(0, url.length - 1));
            return url;
        }

        static GET(url: string, getParams: { [key: string]: string } = null, reversibility: boolean = false, showError: boolean = true) {
            let _url = Http.ExtendUrlParams(url, getParams);
            let _errcount = 0;
            kaayou.addLog("GET:" + _url);
            return new Promise(function (resolve, reject) {
                var errFunc = function (type) {
                    kaayou.addLog("GET ERR:" + type.code);
                    kaayou.emit("common", "ui::DebugPanel::Show", { msg: type.code });
                    kaayou.emit("common", "ui::Loading::Hide", { force: true });
                    //发送断网提示
                    let options = {
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
                                    setTimeout(() => {
                                        if (cc.sys.isNative && kaayou && kaayou.PlatformMgr) kaayou.PlatformMgr.getInstance().sys.PostBugly("http GET err :" + kaayou.getLobbyVersion() || "", type || "", url || "");
                                        sender();
                                    }, 2);

                                }.bind(this),
                                colorType: 'green'
                            }
                        ]
                    }
                    if (reversibility === true) {
                        options.btns.push({
                            name: "取消",
                            action: function () {
                                //return false;
                                kaayou.emit("common", "ui::Loading::Hide");
                                reject();
                            }.bind(this),
                            colorType: 'blue'
                        })
                    }
                    if (_errcount >= 5) {
                        options = Http.GetRestartOption();
                    }
                    _errcount++;
                    if (showError) kaayou.emit("common", "ui::Dialog::Show", options);
                }
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
                                    if (response.charCodeAt(0) == 65279) response = response.substr(1);
                                    resolve(response);
                                } else {
                                    if (cc.sys.isNative && kaayou && kaayou.PlatformMgr) kaayou.PlatformMgr.getInstance().sys.PostBugly("http GET err :" + kaayou.getLobbyVersion() || "", "net status：" + xhr.status, _url || "");
                                    kaayou.emit("common", "ui::DebugPanel::Show", { msg: "错误码：" + xhr.status });
                                    errFunc({ code: xhr.status });
                                }
                            }
                        };
                        xhr.onerror = function (event) {
                            errFunc({ code: "unknown" });
                        }
                        xhr.ontimeout = function () {
                            errFunc({ code: "timeout" });
                        }
                        xhr.open("GET", _url, true);
                        xhr.send();
                    }
                } catch (err) {
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
        }

        static GetFileSize(url: string) {
            let fileSize = 0;
            kaayou.addLog("Head:" + url);
            return new Promise(function (resolve, reject) {
                var errFunc = function (type) {
                    kaayou.addLog("GET ERR:" + type.code);
                    kaayou.emit("common", "ui::DebugPanel::Show", { msg: type.code });
                    kaayou.emit("common", "ui::Loading::Hide", { force: true });
                }
                let xhr = new XMLHttpRequest();
                xhr.open('HEAD', url, true);
                xhr.onreadystatechange = () => {
                    if (xhr.readyState == 4) {
                        if (xhr.status == 200) {
                            fileSize = parseInt(xhr.getResponseHeader('Content-Length'));
                            resolve(fileSize);
                        } else {
                            if (!!xhr.statusText && fileSize == 0) errFunc({ code: "Error:" + xhr.status + "(" + xhr.statusText + ")" });
                        }
                    }
                };
                xhr.onerror = function (event) {
                    errFunc({ code: "error" });
                }
                xhr.ontimeout = function () {
                    errFunc({ code: "timeout" });
                }
                xhr.send();
            });
        }

        static checkUrl(method = "get", url, call) {
            let xhr = new XMLHttpRequest;
            try {
                xhr.open(method, url, true)
                xhr.send();
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 2) {
                        call(xhr.status <= 400)
                        xhr.abort();
                    }
                }
            } catch (e) {
                call(false)
            }
        }

        static doChangeChanl(url: string) {
            if (url.indexOf("203.107.40.117:8004") > 0) {
                url = url.replace("203.107.40.117:8004", "apiyxdq.kaayou.com");
                if (common && common.mod && common.mod.Config && common.mod.Config.ConfigUrl) {
                    common.mod.Config.ConfigUrl = "http://apiyxdq.kaayou.com";
                }
            } else if (url.indexOf("apiyxdq.kaayou.com") > 0) {
                url = url.replace("apiyxdq.kaayou.com", "203.107.40.117:8004");
                if (common && common.mod && common.mod.Config && common.mod.Config.ConfigUrl) {
                    common.mod.Config.ConfigUrl = "http://203.107.40.117:8004";
                }
            }
            return url;
        }

        static GetRestartOption() {
            let options = {
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
                            setTimeout(() => {
                                if (!cc.sys.isNative) {
                                    if (window && window.location) {
                                        window.location.reload();
                                    }
                                } else {
                                    cc.game.restart();
                                }
                            }, 2);
                        }.bind(this),
                        colorType: 'green'
                    }, {
                        name: "取消",
                        action: null,
                        colorType: 'blue'
                    }
                ]
            }
            return options;
        }


        static POST(url: string, postParams: { [key: string]: string } | string, getParams: { [key: string]: string } = null, contentType: string = "form", reversibility: boolean = false) {
            //json   application/json;charset=UTF-8
            //form   application/x-www-form-urlencoded
            contentType = contentType || "form";
            contentType = contentType.toUpperCase();
            let TypeStrs = {
                JSON: "application/json;charset=UTF-8",
                FORM: "application/x-www-form-urlencoded"
            }
            if (!TypeStrs[contentType]) {
                throw "POST暂时不支持该类型" + contentType;
            }

            let _url = Http.ExtendUrlParams(url, getParams);
            let _errcount = 0;
            let params = "";

            if (lodash.isString(postParams)) {
                params = <string>postParams;
            } else {
                if (contentType == "FORM") {
                    for (var x in <{ [key: string]: string }>postParams) {
                        params += x + "=" + postParams[x] + "&";
                    }
                    params = params.substr(0, params.length - 1);
                } else if (contentType == "JSON") {
                    params = JSON.stringify(postParams);
                }
            }
            kaayou.addLog("POST:" + _url);
            kaayou.addLog("POST:" + params)

            return new Promise(function (resolve, reject) {
                var errFunc = function (type) {
                    kaayou.addLog("POST ERR:" + type.code);
                    kaayou.emit("common", "ui::Loading::Hide", { force: true });
                    //发送断网提示
                    let options = {
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
                                    setTimeout(() => {
                                        if (cc.sys.isNative && kaayou && kaayou.PlatformMgr) kaayou.PlatformMgr.getInstance().sys.PostBugly("http POST err :" + kaayou.getLobbyVersion() || "", type || "", url || "");
                                        sender();
                                    }, 2);

                                }.bind(this),
                                colorType: 'green'
                            }
                            //lw200918这里只能放一个按钮，是否有取消按钮通过reversibility控制
                        ]
                    }
                    if (reversibility === true) {
                        options.btns.push({
                            name: "取消",
                            action: function () {
                                kaayou.emit("common", "ui::Loading::Hide");
                                reject();
                            }.bind(this),
                            colorType: 'blue'
                        })
                    }
                    if (_errcount >= 5) {
                        options = Http.GetRestartOption();
                    }
                    _errcount++;
                    kaayou.emit("common", "ui::Dialog::Show", options);
                }
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
                                    if (response.charCodeAt(0) == 65279) response = response.substr(1);
                                    resolve(response);
                                } else {
                                    if (cc.sys.isNative && kaayou && kaayou.PlatformMgr) kaayou.PlatformMgr.getInstance().sys.PostBugly("http GET err :" + kaayou.getLobbyVersion() || "", "net status：" + xhr.status, _url || "");
                                    errFunc({ code: xhr.status });
                                    kaayou.emit("common", "ui::DebugPanel::Show", { msg: "错误码：" + xhr.status });
                                    kaayou.emit("common", "ui::Loading::Hide", { force: true });
                                }
                            }
                        };
                        xhr.onerror = function (event) {
                            kaayou.emit("lobby", "ui::LoginScene::ShowSwitchLine");
                            errFunc({ code: "unknown" });
                        }
                        //lw181129设置3秒钟没有返回就算超时，例如访问php配置超时
                        //lw201215回原成30秒
                        xhr.ontimeout = function () {
                            kaayou.emit("common", "ui::DebugPanel::Show", { msg: "超时！" });
                            errFunc({ code: "timeout" });
                        }
                        xhr.send(params);
                    } catch (err) {
                        errFunc({ code: err });
                        //lw200310显示切线按钮
                        kaayou.emit("lobby", "ui::LoginScene::ShowSwitchLine");
                    }
                }

                if (kaayou['PlatformMgr']) {
                    let type = kaayou['PlatformMgr'].getInstance().sys.GetNetInfo().type;
                    if (type == "none") {
                        //发送断网提示
                        kaayou.emit("common", "ui::DebugPanel::Show", { msg: "网络中断" });
                        errFunc({ code: "disconnect" });
                        return;
                    }
                }
                sender();
            });
        }

        static parseResult(data) {
            try {
                let res: Ka_MSG_RES = JSON.parse(data);
                if (typeof res != 'object') { throw Error('message is not object'); } // "object"  )
                let msghead = res.head;
                if (!msghead) { throw Error('msghead is undefine'); }
                if (res.msgsign.encode == 1) {
                    res.data = kaayou.AES.decrypt(res.data);
                }
                if (res.errcode == 0) {
                    if (res.data) {
                        res.data = JSON.parse(res.data);
                    }
                }
                return res;
            } catch (err) {
                console.error(err);
                return null;
            }
        }
    }
}