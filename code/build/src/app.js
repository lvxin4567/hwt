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
var kaayou;
(function (kaayou) {
    require('es6-promise').polyfill();
    var AppMainScene = (function (_super) {
        __extends(AppMainScene, _super);
        function AppMainScene() {
            return _super.call(this) || this;
        }
        AppMainScene.prototype.initUI = function () {
            var self = this;
            kaayou.SoundManager.getInstance().setDefaultSound({
                ClickBtn: common.SoundRes.ClickBtn,
                ClickBtnClose: common.SoundRes.Click_btn_close,
                ClickBtnSwitch: common.SoundRes.ClickBtnSwitch
            });
            common.TextViewMgr.getInstance(201);
            common.BankruptPanelMgr.getInstance(10);
            common.DialogManager.getInstance(210);
            kaayou.UIManager.getInstance().runScene("login");
            kaayou.UIManager.getInstance().preLoadScene("lobby");
            kaayou.UIManager.getInstance().preLoadScene("teahouse");
            this.addChild(new common.DebugPanel());
            this.addChild(new common.LobbySettingPanel());
            this.addChild(new common.SharePanel());
            this.addChild(new common.VerifyPhone());
            this.addChild(new common.LoadingPanel(), 350);
            this.addChild(new common.ToastPanel(), 310);
        };
        return AppMainScene;
    }(kaayou.MainScene));
    var LauncherView = (function (_super) {
        __extends(LauncherView, _super);
        function LauncherView() {
            var _this = _super.call(this) || this;
            _this.label_description = null;
            _this.progressBar = null;
            _this.label_progress = null;
            _this.initUI();
            return _this;
        }
        LauncherView.prototype.initUI = function () {
            this.initWithccs('res/Launcher.json');
            this.label_description = ccui.helper.seekWidgetByName(this.node, "label_description");
            this.progressBar = ccui.helper.seekWidgetByName(this.node, "progressBar");
            this.label_progress = ccui.helper.seekWidgetByName(this.node, "label_progress");
            this.label_description.setString('');
            this.progressBar.setVisible(false);
            this.label_progress.setString('');
        };
        LauncherView.prototype.setDescription = function (str) {
            this.label_description.setString(str);
        };
        LauncherView.prototype.showProgressBar = function () {
            this.progressBar.setVisible(true);
            this.progressBar.setPercent(0);
            this.label_progress.setString("00%");
        };
        LauncherView.prototype.hideProgressBar = function () {
            this.progressBar.setVisible(false);
            this.progressBar.setPercent(0);
            this.label_progress.setString("");
        };
        LauncherView.prototype.setPercent = function (num) {
            var cnum = Math.max(0, Math.min(100, num));
            this.progressBar.setPercent(cnum);
            var nstr = "";
            if (cnum < 10) {
                nstr = "0" + cnum;
            }
            else {
                nstr = cnum.toString();
            }
            nstr += "%";
            this.label_progress.setString("" + nstr);
            this.label_description.setString("正在加载资源...(" + nstr + ")");
        };
        return LauncherView;
    }(kaayou.Layer));
    var PreloadScene = (function (_super) {
        __extends(PreloadScene, _super);
        function PreloadScene() {
            var _this = _super.call(this) || this;
            _this.__launcherView = null;
            return _this;
        }
        PreloadScene.prototype.initUI = function () {
            var self = this;
            cc.loader.load(['res/Launcher.json'], function (result, count, loadedCount) { }, function () {
                self.__launcherView = new LauncherView();
                self.addChild(self.__launcherView);
                App.getInstance().loadModules();
            });
        };
        return PreloadScene;
    }(kaayou.MainScene));
    var App = (function () {
        function App() {
            this._preloadScene = null;
            this.isBackground = false;
            if (cc.sys.isNative) {
                console.log("seachpath", JSON.stringify(jsb.fileUtils.getSearchPaths()));
                console.log("WritablePath", JSON.stringify(jsb.fileUtils.getWritablePath()));
            }
            kaayou.cc_extend();
        }
        App.getInstance = function () {
            if (App.__INS__ == null) {
                App.__INS__ = new App();
                App.__INS__.init();
            }
            return App.__INS__;
        };
        App.prototype.init = function () {
            if (!cc.winSizeCustom) {
                var size = cc.view.getFrameSize();
                var longB = Math.max(size.width, size.height);
                var sortB = Math.min(size.width, size.height);
                console.log(longB / sortB);
                if (longB / sortB <= 16 / 10) {
                    cc.view.setDesignResolutionSize(1280, 720, cc.ResolutionPolicy.SHOW_ALL);
                    cc.winSizeCustom = { width: 0, height: 0 };
                    cc.winSizeCustom.width = cc.winSize.width;
                    cc.winSizeCustom.height = cc.winSize.height;
                    console.log("pad");
                }
                else if (longB / sortB < 20 / 10) {
                    cc.view.setDesignResolutionSize(1280, 720, cc.ResolutionPolicy.FIXED_HEIGHT);
                    cc.winSizeCustom = { width: 0, height: 0 };
                    cc.winSizeCustom.width = cc.winSize.width;
                    cc.winSizeCustom.height = cc.winSize.height;
                    console.log("iphone 6");
                }
                else {
                    cc.view.setDesignResolutionSize(1280, 720, cc.ResolutionPolicy.FIXED_HEIGHT);
                    cc.winSizeCustom = { width: 0, height: 0 };
                    cc.winSizeCustom.width = cc.winSize.width - 100;
                    cc.winSizeCustom.height = cc.winSize.height;
                    console.log("iphone x");
                }
            }
            else {
                var size = cc.view.getFrameSize();
                var longB = Math.max(size.width, size.height);
                var sortB = Math.min(size.width, size.height);
                console.log(longB / sortB);
                if (longB / sortB <= 16 / 10) {
                    cc.view.setDesignResolutionSize(1280, 720, cc.ResolutionPolicy.SHOW_ALL);
                    cc.winSizeCustom = { width: 0, height: 0 };
                    cc.winSizeCustom.width = cc.winSize.width;
                    cc.winSizeCustom.height = cc.winSize.height;
                    console.log("pad");
                }
                else if (longB / sortB <= 20 / 12) {
                    cc.view.setDesignResolutionSize(1280, 720, cc.ResolutionPolicy.SHOW_ALL);
                    cc.winSizeCustom = { width: 0, height: 0 };
                    cc.winSizeCustom.width = cc.winSize.width;
                    cc.winSizeCustom.height = cc.winSize.height;
                    console.log("pad");
                }
            }
            var self = this;
            window['requireScriptErr'] = this.requireScriptErr.bind(this);
            self._preloadScene = new PreloadScene();
            self._preloadScene.initUI();
            cc.director.runScene(self._preloadScene);
        };
        App.prototype.getRequireScriptErr = function () {
            return this.__rscriptErr || null;
        };
        App.prototype.requireScriptErr = function (path) {
            if (!this.__rscriptErr) {
                this.__rscriptErr = [];
            }
            this.__rscriptErr.push(path);
        };
        App.prototype.loadModules = function () {
            var self = this;
            self._preloadScene.__launcherView.setDescription("游戏启动中...");
            if (cc.sys.isNative) {
                kaayou.unZipAssetsPath(function (err) {
                    if (err) {
                        return self._preloadScene.__launcherView.setDescription("释放资源失败 请联系客服...");
                    }
                    setTimeout(function () {
                        self._preloadScene.__launcherView.setDescription("解压完毕，开始加载资源...");
                        self.getNativeGameModule();
                    }, 10);
                }, function (type, curpro, toatl, cur) {
                    if (type == 1) {
                        self._preloadScene.__launcherView.setDescription("正在释放资源...");
                    }
                    else if (type == 2) {
                        self._preloadScene.__launcherView.showProgressBar();
                    }
                    else if (type == 3) {
                        self._preloadScene.__launcherView.setPercent(curpro);
                    }
                    else if (type == 4) {
                        self._preloadScene.__launcherView.setPercent(100);
                    }
                });
            }
            else {
                self.getWebGameModule();
            }
        };
        App.prototype.getWebGameModule = function () {
            var self = this;
            cc.loader.loadJson("src/modulelist.json", function (err, gamemodule) {
                if (err) {
                    return;
                }
                var gamemodulelistPath = [];
                gamemodule = ["common", "lobby"];
                gamemodule.forEach(function (element) {
                    gamemodulelistPath.push("src/" + element + "/" + element + ".module.js");
                });
                self.loadJsList(gamemodulelistPath);
            });
        };
        App.prototype.getNativeGameModule = function () {
            var self = this;
            var moduleList = kaayou.getLocalModules();
            var mustModuleNames = ["common", "lobby"];
            var jsList = new Array(mustModuleNames.length);
            var mustJsList = new Array(mustModuleNames.length);
            for (var x in moduleList) {
                var index = mustModuleNames.indexOf(moduleList[x].name);
                if (index >= 0) {
                    jsList[index] = moduleList[x].relative;
                    mustJsList[index] = moduleList[x].relative;
                }
                else {
                    jsList.push(moduleList[x].relative);
                }
                jsb.fileUtils.addSearchPath(moduleList[x].search, true);
            }
            if (!moduleList[0] || !moduleList[1]) {
                self._preloadScene.__launcherView.setDescription("资源加载错误...");
                self._preloadScene.__launcherView.hideProgressBar();
                return;
            }
            var remoteSeachPathRoot = kaayou.getRemotePath();
            var filelist = jsb.fileUtils.listFiles(remoteSeachPathRoot);
            var dirlist = [];
            for (var x in filelist) {
                if (jsb.fileUtils.isDirectoryExist(filelist[x])) {
                    dirlist.push(filelist[x]);
                }
            }
            App.version = kaayou.getLobbyVersion();
            console.log("原先加载的模块" + JSON.stringify(jsList));
            self.loadJsList(mustJsList);
        };
        App.prototype.loadJsList = function (gamemodulelistPath) {
            console.log("需要一次加载的模块" + JSON.stringify(gamemodulelistPath));
            var self = this;
            cc.loader.loadJs("", gamemodulelistPath, function (err) {
                if (err) {
                    return;
                }
                console.log("loadJsWithImg  ok");
                self.loadResource();
            });
        };
        App.prototype.loadResource = function () {
            var self = this;
            self._preloadScene.__launcherView.setDescription("正在加载资源...");
            if (cc.sys.isNative) {
                self._preloadScene.__launcherView.hideProgressBar();
            }
            else {
                self._preloadScene.__launcherView.showProgressBar();
            }
            if (cc.sys.isNative) {
                self._preloadScene.__launcherView.setPercent(100);
                self.startGame();
            }
            else {
                cc.loader.load(kaayou.ResManager.getInstance().RESDB, function (result, tatolcount, loadedCount) {
                    if (cc.sys.isNative) {
                        return;
                    }
                    if (!lodash.isNumber(tatolcount) || tatolcount < 1) {
                        return;
                    }
                    if (!lodash.isNumber(loadedCount) || loadedCount < 0) {
                        return;
                    }
                    var cnum = Math.max(0, Math.min(100, Math.ceil((loadedCount / tatolcount) * 100)));
                    self._preloadScene.__launcherView.setPercent(cnum);
                }, function () {
                    setTimeout(function () {
                        self._preloadScene.__launcherView.setPercent(100);
                        self.startGame();
                    }, 100);
                });
            }
        };
        App.prototype.startGame = function () {
            var self = this;
            var sc = new AppMainScene();
            kaayou.UIManager.getInstance().setMainScene(sc);
            cc.eventManager.addCustomListener(cc.game.EVENT_HIDE, function () {
                if (self.isBackground) {
                    return;
                }
                self.isBackground = true;
                cc.log("游戏进入后台");
                kaayou.getController('common').emit(kaayou.Event.create(kaayou.CustomEvent, cc.game.EVENT_HIDE));
            });
            cc.eventManager.addCustomListener(cc.game.EVENT_SHOW, function () {
                if (!self.isBackground) {
                    return;
                }
                self.isBackground = false;
                cc.log("重新返回游戏");
                kaayou.getController('common').emit(kaayou.Event.create(kaayou.CustomEvent, cc.game.EVENT_SHOW));
            });
            if (self.getRequireScriptErr()) {
                console.log("加载报错", self.getRequireScriptErr());
                var options = {
                    msg: "加载报错" + JSON.stringify(self.getRequireScriptErr()),
                    btns: [
                        {
                            name: "确定",
                            action: function () {
                            },
                            colorType: 'green'
                        },
                    ]
                };
                kaayou.emit('common', 'ui::Dialog::Show', options);
            }
        };
        App.prototype.PostBugly = function (val0, val1, val2) {
            if (val1 === void 0) { val1 = ""; }
            if (val2 === void 0) { val2 = ""; }
            var CRASHTYPE_COCOS2DX_JS = 5;
            if (!cc.sys.isNative) {
                return;
            }
            if (cc.sys.os == cc.sys.OS_IOS) {
                jsb.reflection.callStaticMethod("NativeOcClass", "PostBugly:Var1:Var2:Var3:", "5", val0, val1, val2);
            }
            else if (cc.sys.os == cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("com/kayou/utils/NativeJavaClass", "PostBugly", "(ILjava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", CRASHTYPE_COCOS2DX_JS, val0, val1, val2);
            }
        };
        App.__INS__ = null;
        App.isAppleExamineVersion = false;
        App.version = "1.0.15.55";
        return App;
    }());
    kaayou.App = App;
})(kaayou || (kaayou = {}));
