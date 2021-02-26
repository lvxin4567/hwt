var unzipWechatResource = function (loaded, onProgress) {
    if (!kaayou.PlatformMgr.getInstance().wxCfg.GetConfig().forceDownload === false || kaayou.PlatformMgr.getInstance().wx.file.exists("res/lobby/LobbyScene.json")) {
        loaded();
    } else {
        kaayou.PlatformMgr.getInstance().wx.file.unzip(kaayou.PlatformMgr.getInstance().wxCfg.GetConfig().zipPath, loaded, onProgress);
    }
};

namespace kaayou {
    if (cc.sys.isWeChat !== true)
        require('es6-promise').polyfill();

    class AppMainScene extends MainScene {
        constructor() {
            super();
        }
        initUI() {
            let self = this;
            kaayou.SoundManager.getInstance().setDefaultSound({
                ClickBtn: common.SoundRes.ClickBtn,
                ClickBtnClose: common.SoundRes.Click_btn_close,
                ClickBtnSwitch: common.SoundRes.ClickBtnSwitch
            });

            common.TextViewMgr.getInstance(201);
            common.BankruptPanelMgr.getInstance(10);
            common.DialogManager.getInstance(210);

            UIManager.getInstance().runScene("login");
            UIManager.getInstance().preLoadScene("lobby");
            UIManager.getInstance().preLoadScene("teahouse");

            this.addChild(new common.DebugPanel());
            this.addChild(new common.LobbySettingPanel());
            this.addChild(new common.SharePanel());
            this.addChild(new common.VerifyPhone());
            this.addChild(new common.LoadingPanel(), 350);
            this.addChild(new common.ToastPanel(), 310);


            //层级 toast > dialong > bankrupt  
        }
    }

    class LauncherView extends kaayou.Layer {
        constructor() {
            super();
            this.initUI()
        }
        label_description: ccui.Text = null;
        progressBar: ccui.LoadingBar = null;
        label_progress: ccui.Text = null;
        initUI() {
            this.initWithccs('res/Launcher.json');
            this.label_description = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_description");
            this.progressBar = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "progressBar");
            this.label_progress = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_progress");
            this.label_description.setString('');
            this.progressBar.setVisible(false);
            this.label_progress.setString('');
        }
        setDescription(str: string) {
            this.label_description.setString(str);
        }
        showProgressBar() {
            this.progressBar.setVisible(true);
            this.progressBar.setPercent(0);
            this.label_progress.setString("00%");
        }
        hideProgressBar() {
            this.progressBar.setVisible(false);
            this.progressBar.setPercent(0);
            this.label_progress.setString("");
        }
        setPercent(num: number) {
            // this.progressBar.setVisible(true);
            let cnum = Math.max(0, Math.min(100, num));
            this.progressBar.setPercent(cnum);
            let nstr = "";
            if (cnum < 10) {
                nstr = "0" + cnum;
            } else {
                nstr = cnum.toString();
            }
            nstr += "%";
            this.label_progress.setString("" + nstr);
            this.label_description.setString("正在加载资源...(" + nstr + ")");
        }
    }

    class PreloadScene extends MainScene {
        constructor() {
            super();
        }
        __launcherView: LauncherView = null;
        initUI() {
            let self = this;
            cc.loader.load(['res/Launcher.json'],
                function (result, count, loadedCount) { },
                function () {
                    self.__launcherView = new LauncherView();
                    self.addChild(self.__launcherView)
                    //开始加载模块
                    App.getInstance().loadModules();
                });
        }
        _label: cc.LabelTTF = null;
        cb: Function;
        initUI_wechat(cb: Function) {
            this.cb = cb;
            console.log("启动页 开始加载");
            this.onLoadBg();
        }

        onLoadBg() {
            let self = this;
            cc.loader.load(['res/Default.png'],
                function (result, count, loadedCount) { },
                function () {
                    let sp = new cc.Sprite('res/Default.png');
                    sp.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
                    sp.setScale(cc.winSize.height / 720, cc.winSize.width / 1280);
                    sp.setRotation(270);
                    self.getSceneLayer().setContentSize(cc.winSize);
                    self.getSceneLayer().setPosition(0, 0);
                    self.getSceneLayer().addChild(sp);

                    var label = self._label = new cc.LabelTTF("", "Arial", 48);
                    label.setColor(cc.color(255, 255, 255));
                    label.setPosition(cc.winSize.width / 2, 120);
                    self.getSceneLayer().addChild(label);

                    console.log("启动页 加载完成");

                    //隐藏H5版的启动页
                    if (cc.sys.isWeChatH5) {
                        setTimeout(() => {
                            if (window["hidePreload"]) window["hidePreload"]();
                        }, 1);
                    }

                    if (cc.sys.isWeChat) {
                        label.string = "正在下载中... ";
                        let progress = function (per, bit, all) {
                            label.string = "正在下载中... " + per + "%";
                        };
                        let load = function () {
                            label.string = "";
                            self.onLoadRes();
                        };
                        unzipWechatResource(load, progress)
                    } else
                        self.onLoadRes();
                });
        }

        onLoadRes() {
            let self = this;
            cc.loader.load(kaayou.ResManager.getInstance().RESDB, function (result, count, loadedCount) {
                var percent = (loadedCount / count * 100) | 0;
                percent = Math.min(percent, 100);
                self._label.setString("资源加载中..." + percent + "%");
                console.log("资源加载中:", percent);
            }, function () {
                self._label.setString("资源加载中......");
                console.log("资源加载完成");

                setTimeout(function () {
                    var sc = new AppMainScene();
                    UIManager.getInstance().setMainScene(sc);
                    setTimeout(self.cb, 1);
                }, 1);
            });
        }

    }

    export class App {
        static __INS__: App = null;
        static getInstance() {
            if (App.__INS__ == null) {
                App.__INS__ = new App();
                App.__INS__.init();
            }
            return App.__INS__;
        }
        static isAppleExamineVersion = false; //苹果审核版
        static version = "1.0.15.55";//客户端版本号

        constructor() {
            if (cc.sys.isNative) {
                console.log("seachpath", JSON.stringify(jsb.fileUtils.getSearchPaths()));
                console.log("WritablePath", JSON.stringify(jsb.fileUtils.getWritablePath()));
            }

            cc_extend();
        }

        _preloadScene: PreloadScene = null;

        init() {
            //初始化屏幕适配
            if (!cc.winSizeCustom) {
                var size = cc.view.getFrameSize();
                var longB = Math.max(size.width, size.height);
                var sortB = Math.min(size.width, size.height);
                console.log(longB / sortB)
                if (longB / sortB <= 16 / 10) { //pad  1.6
                    cc.view.setDesignResolutionSize(1280, 720, cc.ResolutionPolicy.SHOW_ALL);
                    cc.winSizeCustom = { width: 0, height: 0 };
                    cc.winSizeCustom.width = cc.winSize.width;
                    cc.winSizeCustom.height = cc.winSize.height;
                    console.log("pad");
                } else if (longB / sortB < 20 / 10) { //iphone 6  2
                    cc.view.setDesignResolutionSize(1280, 720, cc.ResolutionPolicy.FIXED_HEIGHT);
                    cc.winSizeCustom = { width: 0, height: 0 };
                    cc.winSizeCustom.width = cc.winSize.width;
                    cc.winSizeCustom.height = cc.winSize.height;
                    console.log("iphone 6");
                } else {//iphone x
                    cc.view.setDesignResolutionSize(1280, 720, cc.ResolutionPolicy.FIXED_HEIGHT);
                    cc.winSizeCustom = { width: 0, height: 0 };
                    cc.winSizeCustom.width = cc.winSize.width - 100;
                    cc.winSizeCustom.height = cc.winSize.height;
                    console.log("iphone x");
                }
            }
            //调整华为平板（分辨率比例为16:10）适配方式
            else {
                var size = cc.view.getFrameSize();
                var longB = Math.max(size.width, size.height);
                var sortB = Math.min(size.width, size.height);
                console.log(longB / sortB)
                //老版本的main.js是<16/10，这里改成<=16/10
                if (longB / sortB <= 16 / 10) { //pad
                    cc.view.setDesignResolutionSize(1280, 720, cc.ResolutionPolicy.SHOW_ALL);
                    cc.winSizeCustom = { width: 0, height: 0 };
                    cc.winSizeCustom.width = cc.winSize.width;
                    cc.winSizeCustom.height = cc.winSize.height;
                    console.log("pad");
                } else if (longB / sortB <= 20 / 12) { //三星平板 
                    cc.view.setDesignResolutionSize(1280, 720, cc.ResolutionPolicy.SHOW_ALL);
                    cc.winSizeCustom = { width: 0, height: 0 };
                    cc.winSizeCustom.width = cc.winSize.width;
                    cc.winSizeCustom.height = cc.winSize.height;
                    console.log("pad");
                }
            }

            if (cc.sys.isWeChat) {
                cc.gameArea = kaayou.PlatformMgr.getInstance().wxCfg.GetConfig().gameArea || "";
            }

            let self = this;
            window['requireScriptErr'] = this.requireScriptErr.bind(this);
            if (cc.sys.isWeChat) {
                // self.loadModules();
                this.getWebGameModule();
            } else {
                //直接构建预加载场景作为启动页
                self._preloadScene = new PreloadScene();
                self._preloadScene.initUI();
                cc.director.runScene(self._preloadScene);
            }


        }
        __rscriptErr: Array<string>;
        getRequireScriptErr() {
            return this.__rscriptErr || null;
        }
        requireScriptErr(path: string) {
            if (!this.__rscriptErr) {
                this.__rscriptErr = [];
            }
            this.__rscriptErr.push(path);
        }
        isBackground = false;
        onLoadPreload(cb = null) {
            let self = this;
            let p = new PreloadScene();
            p.initUI_wechat(function () {
                self.onPreLoadSucceed();
            });
            cc.director.runScene(p);
        }

        onPreLoadSucceed() {
            let self = this;

            cc.eventManager.addCustomListener(cc.game.EVENT_HIDE, function () {
                if (self.isBackground) { return; }
                self.isBackground = true;
                cc.log("游戏进入后台");
                kaayou.getController('common').emit(kaayou.Event.create(kaayou.CustomEvent, cc.game.EVENT_HIDE));
            });
            cc.eventManager.addCustomListener(cc.game.EVENT_SHOW, function () {
                if (!self.isBackground) { return; }
                self.isBackground = false;
                cc.log("重新返回游戏");
                kaayou.getController('common').emit(kaayou.Event.create(kaayou.CustomEvent, cc.game.EVENT_SHOW));
            });

            if (self.getRequireScriptErr()) {
                let options = {
                    msg: "加载报错" + JSON.stringify(self.getRequireScriptErr()),
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
                console.log("加载报错", self.getRequireScriptErr())
            }
        }

        loadModules() {
            let self = this;
            self._preloadScene.__launcherView.setDescription("游戏启动中...");
            if (cc.sys.isNative) {
                kaayou.unZipAssetsPath(function (err) {
                    if (err) {
                        return self._preloadScene.__launcherView.setDescription("释放资源失败 请联系客服...");
                    }
                    //解压完成
                    setTimeout(() => {
                        self._preloadScene.__launcherView.setDescription("解压完毕，开始加载资源...");
                        self.getNativeGameModule();
                    }, 10);

                }, function (type, curpro, toatl, cur) {
                    if (type == 1) {
                        self._preloadScene.__launcherView.setDescription("正在释放资源...");
                    } else if (type == 2) {
                        self._preloadScene.__launcherView.showProgressBar();
                    } else if (type == 3) {
                        self._preloadScene.__launcherView.setPercent(curpro);
                    } else if (type == 4) {
                        self._preloadScene.__launcherView.setPercent(100);
                    }
                });

            } else {
                self.getWebGameModule();
            }
        }


        getWebGameModule() {
            let self = this;
            cc.loader.loadJson("src/modulelist.json", function (err, gamemodule: Array<string>) {
                if (err) { return; }
                let gamemodulelistPath = [];
                gamemodule = ["common", "lobby"];
                gamemodule.forEach(element => {
                    // gamemodulelistPath.push(`src/${element}/${element}_jslist.json`);
                    gamemodulelistPath.push(`src/${element}/${element}.module.js`);
                });
                interface IHotItem {
                    "packageUrl": string,
                    "hotversion": string,
                    "remoteManifestUrl": string,
                    "remoteVersionUrl": string
                }
                self.loadJsList(gamemodulelistPath)
            });
        }

        getNativeGameModule() {
            let self = this;

            //获取本地所有模块
            let moduleList = kaayou.getLocalModules();
            //加入到搜索目录
            var mustModuleNames = ["common", "lobby"];
            let jsList = new Array(mustModuleNames.length);
            let mustJsList = new Array(mustModuleNames.length);
            for (var x in moduleList) {
                let index = mustModuleNames.indexOf(moduleList[x].name);
                if (index >= 0) {
                    jsList[index] = moduleList[x].relative;
                    mustJsList[index] = moduleList[x].relative;
                } else {
                    jsList.push(moduleList[x].relative);
                }
                jsb.fileUtils.addSearchPath(moduleList[x].search, true);
            }
            if (!moduleList[0] || !moduleList[1]) {
                self._preloadScene.__launcherView.setDescription("资源加载错误...");
                self._preloadScene.__launcherView.hideProgressBar();
                return;
            }
            //获取资源目录
            var remoteSeachPathRoot = kaayou.getRemotePath();
            let filelist = jsb.fileUtils.listFiles(remoteSeachPathRoot);
            let dirlist: Array<string> = [];
            for (var x in filelist) {
                if (jsb.fileUtils.isDirectoryExist(filelist[x])) {
                    dirlist.push(filelist[x]);
                }
            }

            App.version = kaayou.getLobbyVersion();

            // self.loadJsList(jsList);
            console.log("原先加载的模块" + JSON.stringify(jsList));//

            self.loadJsList(mustJsList)
        }
        //加载js模块
        loadJsList(gamemodulelistPath) {
            console.log("需要一次加载的模块" + JSON.stringify(gamemodulelistPath));
            let self = this;
            if (cc.sys.isWeChat) {
                gamemodulelistPath.forEach(v => {
                    require("../" + v)
                })
                self.onLoadPreload();
                console.log("loadJsWithImg  ok");
            } else {
                cc.loader.loadJs("", gamemodulelistPath, function (err) {
                    if (err) { return; }
                    console.log("loadJsWithImg  ok");
                    self.loadResource();
                });
            }

        }

        //加载资源
        loadResource() {
            let self = this;
            self._preloadScene.__launcherView.setDescription("正在加载资源...");

            if (cc.sys.isNative) {
                self._preloadScene.__launcherView.hideProgressBar();
            } else {
                self._preloadScene.__launcherView.showProgressBar();
            }
            //200224只有网页才loadresdb
            if (cc.sys.isNative) {
                self._preloadScene.__launcherView.setPercent(100);
                self.startGame();
            } else {
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
                        self._preloadScene.__launcherView.setPercent(cnum);
                    },
                    function () {
                        setTimeout(function () {
                            self._preloadScene.__launcherView.setPercent(100);
                            self.startGame();
                        }, 100);
                    });
            }
        }

        //游戏启动
        startGame() {
            let self = this;
            var sc = new AppMainScene();
            UIManager.getInstance().setMainScene(sc);
            cc.eventManager.addCustomListener(cc.game.EVENT_HIDE, function () {
                if (self.isBackground) { return; }
                self.isBackground = true;
                cc.log("游戏进入后台");
                kaayou.getController('common').emit(kaayou.Event.create(kaayou.CustomEvent, cc.game.EVENT_HIDE));
            });
            cc.eventManager.addCustomListener(cc.game.EVENT_SHOW, function () {
                if (!self.isBackground) { return; }
                self.isBackground = false;
                cc.log("重新返回游戏");
                kaayou.getController('common').emit(kaayou.Event.create(kaayou.CustomEvent, cc.game.EVENT_SHOW));
            });

            if (self.getRequireScriptErr()) {
                console.log("加载报错", self.getRequireScriptErr())
                let options = {
                    msg: "加载报错" + JSON.stringify(self.getRequireScriptErr()),
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
            }
        }


        //上报异常
        PostBugly(val0: string, val1: string = "", val2: string = "") {
            // CRASHTYPE_COCOS2DX_JS 5
            let CRASHTYPE_COCOS2DX_JS = 5;
            if (!cc.sys.isNative) {
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

}