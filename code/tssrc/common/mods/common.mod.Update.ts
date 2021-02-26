/// <reference path="common.mod.Config.ts" />

namespace kaayou {
    class SceneJumper {
        static __INS__: SceneJumper = null;
        static getInstance() {
            if (SceneJumper.__INS__ == null) {
                SceneJumper.__INS__ = new SceneJumper();
            }
            return SceneJumper.__INS__;
        }
        LobbyToGame(name) {
            // common.mod.Update.ExistsSubGame(name, function () {
            let time = new Date().getTime();
            kaayou.emit("common", "ui::Loading::Show", { msg: '正在加载资源', time: 3, addDot: true, noAni: true });
            console.log("lobbytogame");
            setTimeout(() => {
                kaayou.UIManager.getInstance().preLoadScene(name);
                kaayou.emit("common", "ui::Loading::Hide");
                NetManager.getInstance().deleteAllSocket();
                kaayou.emit(name, "mod::Data::Clear");
                kaayou.emit(name, "mod::User::Login");
                kaayou.emit("common", "ui::Loading::Show", { msg: "加载中...", time: 3, noAni: true });
            }, 100);

            kaayou.getController(name).onece("ui::RunScene", function (e: kaayou.CustomEvent) {
                kaayou.emit("common", "ui::Loading::Hide", { force: true });
                console.log("进入游戏时间", (new Date().getTime() - time) / 1000);
                kaayou.UIManager.getInstance().runScene(name);
            }, this);
            kaayou.getController(name).onece("ui::RunSceneError", function (e: kaayou.CustomEvent) {
                NetManager.getInstance().deleteAllSocket();
                kaayou.emit('lobby', "mod::User::Login");
                kaayou.emit("common", "ui::Loading::Hide", { force: true });
            }, this);
            // });
        }

        GameToLobby() {
            kaayou.emit("common", "ui::Loading::Show", { msg: '正在返回大厅', time: 3, addDot: true, noAni: true });
            NetManager.getInstance().deleteAllSocket();
            kaayou.emit('lobby', "mod::User::Login");
            kaayou.emit("common", "ui::Loading::Show", { msg: "加载中...", time: 3, noAni: true });
            kaayou.getController('lobby').onece("ui::RunScene", function (e: kaayou.CustomEvent) {
                kaayou.emit("common", "ui::Loading::Hide", { force: true });
                kaayou.UIManager.getInstance().popScene();
            }, this);
            kaayou.getController('lobby').onece("ui::RunSceneError", function (e: kaayou.CustomEvent) {
                NetManager.getInstance().deleteAllSocket();
                kaayou.emit("common", "ui::Loading::Hide", { force: true });
                kaayou.emit('lobby', "mod::User::Login");
                kaayou.UIManager.getInstance().runScene('lobby');
            }, this);
        }
        LobbyToRecord(name) {
            common.mod.Update.ExistsSubGame(name, "", function () {
                kaayou.emit("common", "ui::Loading::Show", { msg: '正在加载资源', time: 3, addDot: true, noAni: true });
                kaayou.UIManager.getInstance().preLoadScene(name);
                kaayou.emit("common", "ui::Loading::Hide");
                NetManager.getInstance().deleteAllSocket();
                kaayou.emit(name, "mod::Record::Run");
                kaayou.emit("common", "ui::Loading::Show", { msg: "加载中...", time: 3, noAni: true });
                kaayou.getController(name).onece("ui::RunScene", function (e: kaayou.CustomEvent) {
                    kaayou.emit("common", "ui::Loading::Hide", { force: true });
                    kaayou.UIManager.getInstance().runScene(name);
                }, this);
                kaayou.getController(name).onece("ui::RunSceneError", function (e: kaayou.CustomEvent) {
                    NetManager.getInstance().deleteAllSocket();
                    kaayou.emit('lobby', "mod::User::Login");
                    kaayou.emit("common", "ui::Loading::Hide", { force: true });
                }, this);
            });
        }
    }
    export function LobbyToGame(name) {
        SceneJumper.getInstance().LobbyToGame(name);
    }
    export function GameToLobby() {
        SceneJumper.getInstance().GameToLobby();
    }
    export function LobbyToRecord(name) {
        SceneJumper.getInstance().LobbyToRecord(name);
    }
}

namespace common {
    export namespace mod {
        var _global = typeof window === 'undefined' ? global : window;
        export class LocalPackage {
            static uzipSubGame(pakegeName: string, call: Function) {
                if (!cc.sys.isNative) { if (call) { call(); } return false; }

                var zipName = pakegeName + ".zip";
                var zipprePath = "";
                if (cc.sys.os == cc.sys.OS_ANDROID) {
                    zipprePath = "assets/";
                } else {

                }

                zipprePath = zipprePath + zipName;
                var zipPath = jsb.fileUtils.fullPathForFilename(zipprePath);

                if (!(zipPath && zipPath != '' && -1 < zipPath.indexOf(zipName))) {
                    //文件不存在
                    if (call) { call(); } return false;
                }

                var remoteSeachPathRoot = kaayou.getRemotePath();
                var tmpgameDir = remoteSeachPathRoot + pakegeName + "_tmp/";
                var gamedir = remoteSeachPathRoot + pakegeName + "";
                if (jsb.fileUtils.isDirectoryExist(gamedir)) {
                    //已经解压过了
                    if (call) { call(); }
                    return;
                }
                kaayou.emit("common", "ui::Loading::Show", { msg: '正在释放资源', time: 3, addDot: false, noAni: true });
                //删除上次失败的 tmp目录
                if (jsb.fileUtils.isDirectoryExist(tmpgameDir)) {
                    jsb.fileUtils.removeDirectory(tmpgameDir);
                }
                if (jsb.fileUtils.isFileExist(tmpgameDir)) {
                    jsb.fileUtils.removeFile(tmpgameDir);
                }
                //创建临时目录
                jsb.fileUtils.createDirectory(tmpgameDir);
                var tmpzipPath = tmpgameDir + pakegeName + ".zip";
                //开始复制zip包

                if (!kaayou_jsb.File.copyFile(zipPath, tmpzipPath)) { if (call) { call(); } return false; }

                //复制失败
                if (!jsb.fileUtils.isFileExist(tmpzipPath)) { if (call) { call(); } return false; }


                //开始解压
                let kzip = new kaayou_jsb.File.ZIP();
                if (!kzip.unzip(tmpzipPath)) { if (call) { call(); } return false; }

                //删除临时zip
                jsb.fileUtils.removeFile(tmpzipPath);

                //修改文件夹名称
                if (jsb.fileUtils.isDirectoryExist(tmpgameDir)) {
                    jsb.fileUtils.renameFile(tmpgameDir, gamedir)
                }
                if (call) { call(); }
                return true;
            }
        }

        export class Update {
            //比较版本
            static isload = false;
            static versionCompareHandle(versionA: string, versionB: string) {
                var vA = versionA.split('.');
                var vB = versionB.split('.');
                for (var i = 0; i < vA.length; ++i) {
                    var a = parseInt(vA[i]);
                    var b = parseInt(vB[i] || "0");
                    if (a === b) {
                        continue;
                    }
                    else {
                        return a - b;
                    }
                }
                if (vB.length > vA.length) {
                    return -1;
                }
                else {
                    return 0;
                }
            }

            static async UpdateApp(): Promise<boolean> {
                let promise = new Promise<boolean>(resolve => {
                    kaayou.addLog("检测是否需要强更");
                    kaayou.emit("common", "ui::DebugPanel::ShowMsg", { msg: "正在检测是否需要强更", code: -1 });

                    //if (Config.AppConfig["AppVersion"]) {
                    if (Config.AppConfig["AppVersion"] && cc.sys.isNative) {
                        let localVer: string = kaayou.PlatformMgr.getInstance().sys.GetLocalVersionName();
                        let remoteVer = Config.AppConfig["AppVersion"].version;
                        let _url = Config.AppConfig["AppVersion"].url;
                        let content = Config.AppConfig["AppVersion"].content;
                        let suggestVer = "";
                        let suggestUrl = "";
                        let suggestContent = ""
                        if (!!Config.AppConfig["SuggestAppVersion"]) {
                            suggestVer = Config.AppConfig["SuggestAppVersion"].version;
                            suggestUrl = Config.AppConfig["SuggestAppVersion"].url;
                            suggestContent = Config.AppConfig["SuggestAppVersion"].content;
                        }
                        console.log("app版本:" + localVer);
                        console.log("强更版本：" + remoteVer);
                        console.log("推荐版本：" + suggestVer);
                        let updateTo = 0;
                        //如果强更版本比本地高
                        if (Update.versionCompareHandle(remoteVer, localVer) > 0) {
                            updateTo = 1;
                        }
                        //如果强更没本地高，但建议比本地高
                        else if (!!Config.AppConfig["SuggestAppVersion"] && Update.versionCompareHandle(suggestVer, localVer) > 0) {
                            updateTo = 2;
                        }
                        if (updateTo > 0) {
                            let versionDialogPanel = new common.VersionDialogPanel();
                            let fn = function (url) {
                                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                                versionDialogPanel.removeFromParent();
                                if (cc.sys.os == cc.sys.OS_ANDROID) {
                                    new DownloadApk();
                                    kaayou.PlatformMgr.getInstance().sys.DownloadApk(url);
                                    kaayou.emit("common", "ui::Loading::Show", { msg: "正在下载Apk", time: 0, noAni: true });
                                } else if (cc.sys.os == cc.sys.OS_IOS && cc.sys.isNative) {
                                    kaayou.PlatformMgr.getInstance().sys.OpenUrl(url);
                                }
                                resolve(true);
                            }
                            kaayou.UIManager.getInstance().getMainScene().addChild(versionDialogPanel);
                            let op = {
                                title: "温馨提示",
                                msg: content,
                                leftMsg: "当前版本：" + localVer,
                                rightMsg: "最新版本：" + remoteVer,
                                isDomText: false,
                                btns: [{
                                    name: '退出游戏',
                                    colorType: 'blue',
                                    action: function () {
                                        cc.game.end();
                                        resolve(true);
                                    }
                                }, {
                                    name: "立即更新",
                                    colorType: 'green',
                                    action: function () {
                                        fn(_url);
                                    }
                                }],

                            }
                            let op2 = {
                                title: "温馨提示",
                                msg: suggestContent,
                                leftMsg: "当前版本：" + localVer,
                                rightMsg: "最新版本：" + suggestVer,
                                isDomText: false,
                                btns: [{
                                    name: '下次再说',
                                    colorType: 'blue',
                                    action: function () {
                                        versionDialogPanel.removeFromParent();
                                        kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                                        resolve(false);
                                    }
                                }, {
                                    name: "立即更新",
                                    colorType: 'green',
                                    action: function () {
                                        fn(suggestUrl);
                                    }
                                }],

                            }
                            if (updateTo == 1) versionDialogPanel.Show(op);
                            else if (updateTo == 2) versionDialogPanel.Show(op2);
                        } else {
                            resolve(false);
                        }
                    } else {
                        resolve(false);
                    }
                });
                return promise;
            }

            static loadNewModule(modulename, call) {
                let self = this;
                var remoteSeachPathRoot = jsb.fileUtils.getWritablePath() + "remote-assets/";
                var gamemodulelistPath: Array<string> = [];
                var element = modulename;
                var modulepathRoot = `${remoteSeachPathRoot}${element}`;
                var modulepathSrc = `${modulepathRoot}/src`;
                var modulepath = `${modulepathSrc}/${element}`;
                var modulepathjs = `${modulepath}/${element}.module.js`;
                var moduleSearchPath = `${modulepath}/${element}.module.js`;
                var moduleSearchPathJS = `src/${element}/${element}.module.js`;
                console.log("可能需加载的模块:::  ", element, modulepathRoot,
                    modulepathSrc, modulepath, modulepathjs
                );
                if (jsb.fileUtils.isFileExist(modulepathjs)) {
                    cc.sys.cleanScript(moduleSearchPathJS);
                    gamemodulelistPath.push(moduleSearchPathJS);
                    jsb.fileUtils.addSearchPath(modulepathRoot);
                }
                console.log("需加载的新搜索路径:::  ", JSON.stringify(jsb.fileUtils.getSearchPaths()));
                console.log("需加载的新模块:::  ", JSON.stringify(gamemodulelistPath));
                cc.loader.loadJsWithImg("", gamemodulelistPath, function (err) {
                    if (err) { return; }
                    console.log("loadJsWithImg  ok");//

                    console.log('文件数量' + kaayou.ResManager.getInstance().RESDB.length);
                    Update.callOnce(call);
                });
            }

            static async callOnce(call) {
                Update.isload = false;
                let i = 0
                for (let index = 0; index < kaayou.ResManager.getInstance().RESDB.length; index++) {
                    let element = kaayou.ResManager.getInstance().RESDB[index];
                    (function (path) {
                        cc.loader.load(path, function (err) {
                            i++;
                            if (i == kaayou.ResManager.getInstance().RESDB.length) {
                                call();
                            }
                        });
                    })(element);
                }
            }

            static DeleteTempDir(name) {
                let tmpPath = kaayou.getRemotePath() + name + "_tmp";
                console.log("删除历史残留：" + tmpPath);
                if (jsb.fileUtils.isDirectoryExist(tmpPath)) {
                    console.log("删除历史残留1：" + tmpPath);
                    jsb.fileUtils.removeDirectory(tmpPath);
                }
                let tempPath = kaayou.getRemotePath() + name + "_temp";  //安卓好像是这
                console.log("删除历史残留：" + tempPath);
                if (jsb.fileUtils.isDirectoryExist(tempPath)) {
                    console.log("删除历史残留1：" + tempPath);
                    jsb.fileUtils.removeDirectory(tempPath);
                }
            }

            /**
                * 
                * @param name      包的key
                * @param remoteVs  包远程版本(大厅传空数据保持原来的方式，子游戏传远程版本)
                * @param call      回调函数
            */
            static async ExistsSubGame(name, remoteVs, call) {
                if (!cc.sys.isNative) {
                    if (!_global[name]) {
                        cc.loader.loadJs("", [`src/${name}/${name}.module.js`], function (err) {
                            if (err) {
                                kaayou.emit('common', 'ui::Toast::Show', { msg: '没有相关游戏资源', time: 3, mask: true });
                                return;
                            }
                            kaayou.emit("common", "ui::Loading::Show", { msg: '准备加载游戏', time: 3, addDot: true, noAni: true });
                            cc.loader.load(kaayou.ResManager.getInstance().RESDB,
                                function (result, tatolcount, loadedCount) {
                                    if (cc.sys.isNative) { return; }

                                    if (!lodash.isNumber(tatolcount) || tatolcount < 1) {
                                        return;
                                    }
                                    if (!lodash.isNumber(loadedCount) || loadedCount < 0) {
                                        return;
                                    }
                                    let cnum = Math.max(0, Math.min(100, Math.ceil((loadedCount / tatolcount) * 100)));
                                    kaayou.emit("common", "ui::Loading::Show", { msg: '游戏加载中…' + cnum + '%', time: 60, addDot: false, noAni: true });
                                },
                                function () {
                                    setTimeout(function () {
                                        kaayou.emit('common', 'ui::Loading::Hide');
                                        return call();
                                    }, 100);
                                });
                        })
                    } else {
                        return call();
                    }
                    return
                } else {
                    //这个时候先判断一下有没有热更的缓存包name_tmp   如果有的话就先删除
                    Update.DeleteTempDir(name);
                }
                if (g_dw) { return console.log("正在下载"); }
                if (g_up) { return console.log("正在更新"); }

                if (!_global[name] && !kaayou.ExistModule(name)) {
                    console.log("模块未加载  且未下载")
                    if (!(Config.AppConfig.feature && Config.AppConfig.feature.ho)) {
                        return Update.loadNewModule(name, call);
                    }

                    kaayou.emit("common", "ui::Loading::Show", { msg: '正在获取下载地址', time: 15, addDot: true });
                    kaayou.addLog("开始获取热更包的下载地址");
                    kaayou.Http.GET(mod.Config.ConfigUrl + mod.Config.DownloadUrl.format({ keyname: name })).then(function (res: string) {
                        console.log("ExistsSubGame res:" + res);
                        kaayou.emit("common", "ui::Loading::Show", { msg: '准备下载游戏', time: 4, addDot: true, noAni: true });
                        try {

                            if (lodash.isEmpty(res)) {
                                throw "";
                            }
                            if (res.length < 10 + name.length) {
                                throw "";
                            }
                            let dpurl = "";
                            if (res.indexOf(name + ".zip") == res.length - name.length - 4) {
                                dpurl = res;
                            } else {
                                let data = JSON.parse(res);
                                if (data.error) {
                                    throw "";
                                }
                                dpurl = data.path;
                            }

                            g_dw = new DownLoadSubGame(dpurl, name, function () {
                                g_dw = null;
                                console.log("游戏包解压完成，开始加载模块");
                                Update.loadNewModule(name, call);
                            }, function () {
                                g_dw = null;
                                kaayou.emit("common", "ui::Loading::Show", { msg: '游戏下载失败', time: 4, addDot: true, noAni: true });
                            });
                            g_dw.download();
                        } catch (err) {
                            kaayou.emit("common", "ui::Loading::Show", { msg: '获取下载地址失败', time: 4, addDot: false, noAni: true });
                        }

                    }).catch(function () {
                        kaayou.emit("common", "ui::Loading::Show", { msg: '获取下载地址失败', time: 4, addDot: false, noAni: true });
                    });

                } else if (_global[name]) {
                    console.log("模块已存在");
                    if (!(Config.AppConfig.feature && Config.AppConfig.feature.ho)) {
                        return call();
                    }
                    g_up = new HotUpdate(mod.Config.ConfigUrl + mod.Config.CheckUpdateUrl, name, remoteVs, function (needHot: boolean) {
                        g_up = null;
                        if (needHot) {
                            kaayou.emit("common", "ui::Loading::Show", { msg: '热更新完毕，正在加载游戏', time: 15, addDot: false, noAni: true });
                            if (_global[name].uninstall) {
                                //如果是当前显示的场景，uninstall前需要先onReExit
                                if (kaayou.UIManager.getInstance().getCurRuningSceneName() == name.toUpperCase()) {
                                    kaayou.UIManager.getInstance().getCurRuningScene().onReExit();
                                }
                                _global[name].uninstall();
                            }
                            Update.loadNewModule(name, call);
                        } else {
                            console.log("无更新");
                            kaayou.emit("common", "ui::Loading::Show", { msg: '正在加载资源', time: 4, addDot: true, noAni: true });
                            call();
                        }
                    },
                        function () {
                            console.log("报错");
                            kaayou.emit("common", "ui::Loading::Show", { msg: '游戏更新失败', time: 4, addDot: true, noAni: true });
                            g_up = null;
                        });
                    //@vsen 2019.08.17
                    kaayou.emit("common", "ui::Loading::Show", { msg: '检测游戏更新', time: 33, addDot: true, noAni: true });
                    g_up.run();
                } else {
                    console.log("模块未加载  但已下载")
                    if (!(Config.AppConfig.feature && Config.AppConfig.feature.ho)) {
                        return Update.loadNewModule(name, call);
                    }
                    g_up = new HotUpdate(mod.Config.ConfigUrl + mod.Config.CheckUpdateUrl, name, remoteVs, function (needHot: boolean) {
                        g_up = null;

                        if (needHot) {
                            console.log("有更新");
                            kaayou.emit("common", "ui::Loading::Show", { msg: '游戏更新中…100%', time: 60, addDot: false, noAni: true });
                            console.log("卸载已存在的模块");
                            // if (_global[name].uninstall) {
                            //     _global[name].uninstall();
                            // }
                            Update.loadNewModule(name, call);

                        } else {
                            console.log("无更新");
                            kaayou.emit("common", "ui::Loading::Show", { msg: '正在加载资源', time: 15, addDot: true, noAni: true });
                            Update.loadNewModule(name, call);
                            // call();
                        }
                    },
                        function () {
                            console.log("报错");
                            kaayou.emit("common", "ui::Loading::Show", { msg: '游戏更新失败', time: 4, addDot: true, noAni: true });
                            g_up = null;
                        });
                    kaayou.emit("common", "ui::Loading::Show", { msg: '检测游戏更新', time: 33, addDot: true, noAni: true });
                    g_up.run();
                }

            }

            static async UpdateLobby(call: Function) {
                kaayou.addLog("检测是否需要热更大厅");
                kaayou.emit("common", "ui::DebugPanel::ShowMsg", { msg: "正在检测是否需要热更大厅", code: -1 });
                if (!cc.sys.isNative) {
                    return call();
                }
                if (g_dw) { return console.log("正在下载"); }
                if (g_up) { return console.log("正在更新"); }
                let name = 'GameLobby';
                //第三个参数是成功后回调
                //第四个参数是失败后回调
                g_up = new HotUpdate(mod.Config.ConfigUrl + mod.Config.CheckUpdateUrl, name, "", function (needHot: boolean) {
                    g_up = null;
                    if (needHot) {
                        cc.game.restart();
                    } else {
                        call();
                    }
                },
                    function (errmsg) {
                        console.log("报错");

                        kaayou.emit("common", "ui::Loading::Show", { msg: '游戏更新失败', time: 1, addDot: true, noAni: true });
                        setTimeout(() => {
                            cc.game.restart();
                        }, 1);
                        g_up = null;
                    }
                );
                kaayou.emit("common", "ui::Loading::Show", { msg: '检测游戏更新', time: 33, addDot: true, noAni: true });
                g_up.run();
            }
        }

        var g_da = null;
        var g_dw = null;
        var g_up = null;


        class DownloadApk {
            _lobbyPath = "";
            _apkPath = "";
            _isExit = false;
            _downloadSucceed = false;
            message: string = "";
            downloadStatus: string = "";
            apkUrl: string = "";
            isBackGround: boolean = false;
            constructor() {
                let self = this;

                kaayou.getController('common').on(cc.game.EVENT_SHOW, function (e) {
                    self.onReShow();
                }, this);
                kaayou.getController('common').on(cc.game.EVENT_HIDE, function (e) {
                    if (!self.isBackGround) {
                        self.isBackGround = true;
                    }
                }, this);
                kaayou.getController('common').offBytarger('ui::apk::onDownload', this);
                kaayou.getController('common').on('ui::apk::onDownload', function (e) {
                    self.onDownloadApk(e.data);
                }, this);
            }

            onReShow() {
                kaayou.emit('common', "ui::Dialog::Hide");
                let self = this;
                if (self.isBackGround) self.isBackGround = false;
                if (self._downloadSucceed) {
                    let options = {
                        title: "温馨提示",
                        msg: "请安装最新版本",
                        btns: [
                            {
                                name: "安装",
                                action: function () {
                                    if (self._apkPath) kaayou.PlatformMgr.getInstance().sys.InstallApk(self._apkPath);

                                }.bind(this),
                                colorType: 'green'
                            }
                        ]
                    }
                    kaayou.emit('common', "ui::Dialog::Show", options);
                } else if (self.downloadStatus == "fail") {
                    self.onDownloadFail();
                }
            }

            onDownloadFail() {
                let self = this;
                //lw200527如果手机系统时间不对，也会导致下载失败
                kaayou.emit('common', 'ui::Loading::Hide');
                self.message = "下载更新包失败，请前往官网 http://www.douqi.com 下载。";
                //self.apkUrl = data.extend;
                //console.log("下载地址：", self.apkUrl);
                let options = {
                    title: "温馨提示",
                    msg: "下载更新包失败，请前往官网 http://www.douqi.com 下载。",
                    btns: [
                        {
                            name: "重试",
                            action: function () {
                                Update.UpdateApp();
                            }.bind(this),
                            colorType: 'green'
                        },
                        {
                            name: "前往",
                            action: function () {
                                kaayou.PlatformMgr.getInstance().sys.OpenUrl("http://www.douqi.com");
                            }.bind(this),
                            colorType: 'green'
                        }
                    ]
                }
                //lw181207如果此时在后台，字会黑
                if (!self.isBackGround) kaayou.emit('common', "ui::Dialog::Show", options);
            }

            // @BindEvent("ui::apk::onDownload")
            onDownloadApk(data: { code: string, extend: string }) {
                let self = this;
                self.downloadStatus = data.code;
                switch (data.code) {
                    case "fail":
                        self.onDownloadFail();
                        break;
                    case "loading":
                        var obj = JSON.parse(data.extend);
                        let mDownloaded = Math.floor(obj.downloaded / 1024 / 1024);
                        let mTotal = Math.floor(obj.total / 1024 / 1024);
                        self.message = "游戏下载中 " + obj.progress + '%…(' + mDownloaded + 'M/' + mTotal + 'M)';
                        if (!self.isBackGround) kaayou.emit('common', "ui::Loading::Show", { msg: self.message, time: 0, addDot: false, noAni: true });
                        break;
                    case "success":
                        self._downloadSucceed = true;
                        //self.mask.node.active = true;
                        //self.mask.node.width = self.pb.width;
                        self._apkPath = data.extend;
                        //self.btnInstall.getComponent(cc.Sprite).spriteFrame = self.sfInstall;
                        kaayou.emit('common', "ui::Loading::Show", { msg: "游戏下载完成，请安装", time: 0, addDot: false, noAni: true });
                        setTimeout(function () {
                            if (self._apkPath) kaayou.PlatformMgr.getInstance().sys.InstallApk(self._apkPath);
                        }, 200);
                        kaayou.emit('common', 'ui::Loading::Hide');
                        break;
                }
            }
        }

        class DownLoadSubGame {
            d: kaayou_jsb.File.DownLoad = null;
            _pakegeName: string = "";
            __successCallBack: Function = null;
            __errorCallBack: Function = null;
            _baseUrl = "";
            constructor(baseurl: string, pakegeName: string, successCallBack: Function, errorCallBack: Function) {
                this._pakegeName = pakegeName;
                this.__successCallBack = successCallBack;
                this.__errorCallBack = errorCallBack;
                this._baseUrl = baseurl;
                console.log("下载", this._baseUrl);
            }
            download() {
                if (!cc.sys.isNative) { return; }
                let self = this;
                console.log("download", kaayou_jsb.File.DownLoad);

                this.d = new kaayou_jsb.File.DownLoad();
                var pakegeName = this._pakegeName;
                var remoteSeachPathRoot = jsb.fileUtils.getWritablePath() + "remote-assets/";

                var tmpgameDir = remoteSeachPathRoot + pakegeName + "_tmp/";
                var gamedir = remoteSeachPathRoot + pakegeName + "";
                if (jsb.fileUtils.isDirectoryExist(tmpgameDir)) {
                    jsb.fileUtils.removeDirectory(tmpgameDir);
                }
                if (jsb.fileUtils.isFileExist(tmpgameDir)) {
                    jsb.fileUtils.removeFile(tmpgameDir);
                }

                jsb.fileUtils.createDirectory(tmpgameDir);

                var zipPath = tmpgameDir + pakegeName + ".zip";

                this.d.DownLoadFile(`${this._baseUrl}`, zipPath);
                this.d.onProgress = function (total, downloaded) {
                    kaayou.emit("common", "ui::Loading::Show", { msg: '游戏更新中…' + parseInt((downloaded / total * 100).toString()) + '%', time: 60, addDot: false, noAni: true });
                }

                this.d.onError = function (errcode, errorCodeInternal, errorStr) {
                    console.log("down err", errcode, errorCodeInternal, errorStr);
                    let kzip = new kaayou_jsb.File.ZIP();
                    var c = self.__errorCallBack;
                    self.__successCallBack = null;
                    self.__errorCallBack = null;
                    if (c) {
                        c();
                    }
                }

                this.d.onSuccess = function (url: string, storagePath: string) {
                    console.log("游戏包下载完成，开始解压");
                    kaayou.emit("common", "ui::Loading::Show", { msg: '游戏更新中…100%', time: 60, addDot: false, noAni: true });
                    setTimeout(() => {
                        kaayou.emit("common", "ui::Loading::Show", { msg: '下载完成正在解压', time: 10, addDot: true, noAni: true });
                        let kzip = new kaayou_jsb.File.ZIP();
                        //lw181023同步解压
                        if (!kzip.unzip(storagePath)) { return false; }
                        jsb.fileUtils.removeFile(storagePath);
                        if (jsb.fileUtils.isDirectoryExist(tmpgameDir)) {
                            jsb.fileUtils.renameFile(tmpgameDir, gamedir)
                        }
                        var c = self.__successCallBack;
                        self.__successCallBack = null;
                        self.__errorCallBack = null;
                        if (c) {
                            c();
                        }
                    }, 500);

                }
            }
        }

        export class HotUpdate {
            _am: jsb.AssetsManager = null;
            gameName = '';
            baseurl = '';
            sceneName = '';
            subgameSettings = null;
            zipUrlSize = 0;
            _storagePath = null;
            __successCallBack = null;
            __errorCallBack = null;
            isUpdating: boolean = false;
            _updateListener = null;
            subGameRemoteVs = null;
            constructor(baseurl, gameName, subGameRemoteVs, successCallBack, errorCallBack) {
                this.gameName = gameName;
                this.baseurl = baseurl;
                this.__successCallBack = successCallBack;
                this.__errorCallBack = errorCallBack;
                this.subGameRemoteVs = subGameRemoteVs;
            }
            run() {
                try {
                    var self = this;
                    this._storagePath = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + "remote-assets/" + this.gameName);
                    if (this.gameName == 'GameLobby') {
                        this._storagePath = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + "remote-assets/");
                    } else {       //只有子游戏先检验本地版本
                        if (this.subGameRemoteVs && this.subGameRemoteVs.length > 0) {
                            let curLocalVs = kaayou.getSubGameVersion(this.gameName);
                            console.log("远程子游戏版本" + this.subGameRemoteVs + ",本地子游戏版本" + curLocalVs);
                            let are_you_need = Update.versionCompareHandle(this.subGameRemoteVs, curLocalVs);
                            console.log("是否需要热更？++++++" + are_you_need);
                            if (are_you_need <= 0) {   //不需要热更
                                setTimeout(function () {
                                    self.callSuccess(false);
                                }, 100);
                                return;
                            }
                        }
                    }

                    console.log("downloadGame storagePath:" + this._storagePath);
                    var customManifestStr = JSON.stringify({
                        "packageUrl": "",
                        "remoteManifestUrl": this.baseurl.format({ action: "project", type: this.gameName }),
                        "remoteVersionUrl": this.baseurl.format({ action: "version", type: this.gameName }),
                        "version": "0.0.1",
                        "assets": {},
                        "searchPaths": []
                    });

                    this._am = jsb.AssetsManager.create('', this._storagePath, Update.versionCompareHandle);
                    if (!cc.sys['ENABLE_GC_FOR_NATIVE_OBJECTS']) {
                        this._am.retain();
                    }

                    if (cc.sys.os === cc.sys.OS_ANDROID) {
                        this._am.setMaxConcurrentTask(2);
                    }

                    this._updateListener = jsb.EventListenerAssetsManager.create(this._am, this.checkCb.bind(this));
                    cc.eventManager.addListener(this._updateListener, 1);
                    var manifest = new jsb.Manifest(customManifestStr, this._storagePath);
                    this._am.loadLocalManifest(manifest, this._storagePath);
                    this._am.checkUpdate();
                } catch (err) {
                    console.log("error ", err.toString());
                }
            }

            callSuccess(bRestart: boolean) {
                var self = this;
                console.log("热更新完毕，正在回调，这里不要用toast，因为大厅和游戏的热更新都会走这里");
                let c = this.__successCallBack;
                this.__successCallBack = null;
                self.isUpdating = false;
                if (c) {
                    c(bRestart);
                }
            }

            callError(errstr: string) {
                var self = this;
                kaayou.addLog("更新出错：" + errstr);
                kaayou.emit("common", "ui::DebugPanel::ShowMsg", { msg: "更新出错：" + errstr, code: 0 });
                let c = this.__errorCallBack;
                this.__errorCallBack = null;
                self.isUpdating = false;
                if (c) {
                    c(errstr);
                }
            }

            checkCb(event: jsb.EventAssetsManager) {
                var self = this;
                switch (event.getEventCode()) {
                    case jsb.EventCode.ERROR_NO_LOCAL_MANIFEST:
                        /*0 本地没有配置文件*/
                        //this.lbMsg.string = '没有找到配置文件...';
                        this.callError('没有找到本地配置文件...');
                        break;
                    case jsb.EventCode.ERROR_DOWNLOAD_MANIFEST:
                        /*1下载配置文件错误*/
                        //this.lbMsg.string = '没有找到资源文件...';
                        this.callError('没有找到远程配置文件...');
                        break;
                    case jsb.EventCode.ERROR_PARSE_MANIFEST:
                        /*2 解析文件错误*/
                        //this.lbMsg.string = '解析文件错误...';
                        this.callError('配置文件解析文件错误');
                        break;
                    case jsb.EventCode.NEW_VERSION_FOUND:
                        /*3发现新的更新*/
                        kaayou.addLog("发现新的版本");
                        kaayou.emit("common", "ui::DebugPanel::ShowMsg", { msg: "发现新的版本", code: -1 });
                        kaayou.emit("common", "ui::Loading::Show", { msg: '检测到游戏有更新', time: 0, addDot: true, noAni: true });
                        this.subgameSettings = undefined;
                        this._am.update();
                        break;
                    case jsb.EventCode.ALREADY_UP_TO_DATE:
                        /*4 已经是最新的*/
                        //kaayou.emit('ui::Toast::Show', { msg: "已经是最新版本！" });
                        //this.lbMsg.string = '已经是最新版本！...';
                        console.log("已经是最新版本！");
                        if (this.gameName != 'GameLobby') {
                            kaayou.emit("common", "ui::Loading::Show", { msg: '正在进入游戏', time: 30, addDot: true, noAni: true });
                        } else {
                            kaayou.emit("common", "ui::Loading::Hide", { force: true });
                        }
                        setTimeout(function () {
                            self.callSuccess(false);
                        }, 200);
                        break;
                    case jsb.EventCode.UPDATE_PROGRESSION:
                        /*5 最新进展  做 进度的*/
                        console.log(event);
                        if (event.getDownloadedFiles() == 0) {
                            //this.node.active=true;
                            //this.lbMsg.string = '游戏更新中...0%';
                            //lw181207如果不做==0的判断，会显示进度是NaN
                            kaayou.emit("common", "ui::Loading::Show", { msg: '检测游戏更新', time: 18, addDot: true, noAni: true });
                        } else {
                            //this.mask.node.active=true;
                            //this.mask.node.width=this.pb.width*event.getPercent();
                            //this.lbMsg.string = '游戏更新中...'+  parseInt((event.getPercent()*100).toString()) + "%";
                            kaayou.emit("common", "ui::Loading::Show", { msg: '游戏更新中…' + parseInt((event.getPercent() * 100).toString()) + '%', time: 60, addDot: false, noAni: true });
                        }
                        break;
                    case jsb.EventCode.ASSET_UPDATED:
                        /*6需要更新*/
                        break;
                    case jsb.EventCode.ERROR_UPDATING:
                        /*7更新错误*/
                        //this.lbMsg.string = '更新发生错误，请重试';
                        this.callError('更新发生错误，请重试');
                        break;
                    case jsb.EventCode.UPDATE_FINISHED:
                        /*8更新完成*/
                        kaayou.emit("common", "ui::Loading::Show", { msg: '游戏更新中…100%', time: 60, addDot: false, noAni: true });
                        setTimeout(function () {
                            self.callSuccess(true);
                        }, 200);
                        break;
                    case jsb.EventCode.UPDATE_FAILED:
                        /*9更新失败*/
                        //this.lbMsg.string = '更新失败，请重试';
                        this.callError('更新失败，请重试');
                        break;
                    case jsb.EventCode.ERROR_DECOMPRESS:
                        /*10解压失败*/
                        //this.lbMsg.string = '解压失败，请重试';
                        this.callError('解压失败，请重试');
                        break;
                }
            }

            static checkNeedUpdate(remoteVersion:string){
                if(!remoteVersion) return;
                let curLocalVs: string = kaayou.getLobbyVersion();
                let are_you_need = common.mod.Update.versionCompareHandle(remoteVersion, curLocalVs);
                console.log("远程版本号："+remoteVersion);
                console.log("是否需要热更？++++++" + are_you_need);
                if (are_you_need > 0) {
                    let options = {
                        msg: "检测到新版本，点击确定后自动重启",
                        btns: [
                            {
                                name: "确定",
                                action: function () {
                                    if (!cc.sys.isNative) {
                                        if (window && window.location) {
                                            window.location.reload();
                                        }
                                    } else {
                                        cc.game.restart();
                                    }
                                },
                                colorType: 'yellow'
                            }
                        ]
                    }
                    kaayou.emit('common', 'ui::Dialog::Show', options);
                }
            }
        }
    }
}