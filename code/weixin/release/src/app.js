var kaayou=(GameGlobal.kaayou = GameGlobal.kaayou||{});var __extends = (this && this.__extends) || (function () {
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
var unzipWechatResource = function (loaded, onProgress) {
    if (!kaayou.PlatformMgr.getInstance().wxCfg.GetConfig().forceDownload === false || kaayou.PlatformMgr.getInstance().wx.file.exists("res/lobby/LobbyScene.json")) {
        loaded();
    }
    else {
        kaayou.PlatformMgr.getInstance().wx.file.unzip(kaayou.PlatformMgr.getInstance().wxCfg.GetConfig().zipPath, loaded, onProgress);
    }
};
var kaayou=(GameGlobal.kaayou = GameGlobal.kaayou||{});
(function (kaayou) {
    if (cc.sys.isWeChat !== true)
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
            _this._label = null;
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
        PreloadScene.prototype.initUI_wechat = function (cb) {
            this.cb = cb;
            console.log("启动页 开始加载");
            this.onLoadBg();
        };
        PreloadScene.prototype.onLoadBg = function () {
            var self = this;
            cc.loader.load(['res/Default.png'], function (result, count, loadedCount) { }, function () {
                var sp = new cc.Sprite('res/Default.png');
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
                if (cc.sys.isWeChatH5) {
                    setTimeout(function () {
                        if (window["hidePreload"])
                            window["hidePreload"]();
                    }, 1);
                }
                if (cc.sys.isWeChat) {
                    label.string = "正在下载中... ";
                    var progress = function (per, bit, all) {
                        label.string = "正在下载中... " + per + "%";
                    };
                    var load = function () {
                        label.string = "";
                        self.onLoadRes();
                    };
                    unzipWechatResource(load, progress);
                }
                else
                    self.onLoadRes();
            });
        };
        PreloadScene.prototype.onLoadRes = function () {
            var self = this;
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
                    kaayou.UIManager.getInstance().setMainScene(sc);
                    setTimeout(self.cb, 1);
                }, 1);
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
            if (cc.sys.isWeChat) {
                cc.gameArea = kaayou.PlatformMgr.getInstance().wxCfg.GetConfig().gameArea || "";
            }
            var self = this;
            window['requireScriptErr'] = this.requireScriptErr.bind(this);
            if (cc.sys.isWeChat) {
                this.getWebGameModule();
            }
            else {
                self._preloadScene = new PreloadScene();
                self._preloadScene.initUI();
                cc.director.runScene(self._preloadScene);
            }
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
        App.prototype.onLoadPreload = function (cb) {
            if (cb === void 0) { cb = null; }
            var self = this;
            var p = new PreloadScene();
            p.initUI_wechat(function () {
                self.onPreLoadSucceed();
            });
            cc.director.runScene(p);
        };
        App.prototype.onPreLoadSucceed = function () {
            var self = this;
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
                console.log("加载报错", self.getRequireScriptErr());
            }
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
            if (cc.sys.isWeChat) {
                gamemodulelistPath.forEach(function (v) {
                    require("../" + v);
                });
                self.onLoadPreload();
                console.log("loadJsWithImg  ok");
            }
            else {
                cc.loader.loadJs("", gamemodulelistPath, function (err) {
                    if (err) {
                        return;
                    }
                    console.log("loadJsWithImg  ok");
                    self.loadResource();
                });
            }
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QU0sSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRTtnQkFDdkMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxpQ0FBaUMsRUFBRSxXQUFXLEVBQUUsNERBQTRELEVBQ3RJLHFCQUFxQixFQUN2QixJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUksQ0FDUCxDQUFDO2FBQ0w7UUFDTCxDQUFDO1FBMVZNLFdBQU8sR0FBUSxJQUFJLENBQUM7UUFRcEIseUJBQXFCLEdBQUcsS0FBSyxDQUFDO1FBQzlCLFdBQU8sR0FBRyxXQUFXLENBQUM7UUF1VmpDLFVBQUM7S0FqV0QsQUFpV0MsSUFBQTtJQWpXWSxVQUFHLE1BaVdmLENBQUE7QUFFTCxDQUFDLEVBNWdCUyxNQUFNLEtBQU4sTUFBTSxRQTRnQmYiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHVuemlwV2VjaGF0UmVzb3VyY2UgPSBmdW5jdGlvbiAobG9hZGVkLCBvblByb2dyZXNzKSB7XHJcbiAgICBpZiAoIWthYXlvdS5QbGF0Zm9ybU1nci5nZXRJbnN0YW5jZSgpLnd4Q2ZnLkdldENvbmZpZygpLmZvcmNlRG93bmxvYWQgPT09IGZhbHNlIHx8IGthYXlvdS5QbGF0Zm9ybU1nci5nZXRJbnN0YW5jZSgpLnd4LmZpbGUuZXhpc3RzKFwicmVzL2xvYmJ5L0xvYmJ5U2NlbmUuanNvblwiKSkge1xyXG4gICAgICAgIGxvYWRlZCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBrYWF5b3UuUGxhdGZvcm1NZ3IuZ2V0SW5zdGFuY2UoKS53eC5maWxlLnVuemlwKGthYXlvdS5QbGF0Zm9ybU1nci5nZXRJbnN0YW5jZSgpLnd4Q2ZnLkdldENvbmZpZygpLnppcFBhdGgsIGxvYWRlZCwgb25Qcm9ncmVzcyk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5uYW1lc3BhY2Uga2FheW91IHtcclxuICAgIGlmIChjYy5zeXMuaXNXZUNoYXQgIT09IHRydWUpXHJcbiAgICAgICAgcmVxdWlyZSgnZXM2LXByb21pc2UnKS5wb2x5ZmlsbCgpO1xyXG5cclxuICAgIGNsYXNzIEFwcE1haW5TY2VuZSBleHRlbmRzIE1haW5TY2VuZSB7XHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGluaXRVSSgpIHtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICBrYWF5b3UuU291bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0RGVmYXVsdFNvdW5kKHtcclxuICAgICAgICAgICAgICAgIENsaWNrQnRuOiBjb21tb24uU291bmRSZXMuQ2xpY2tCdG4sXHJcbiAgICAgICAgICAgICAgICBDbGlja0J0bkNsb3NlOiBjb21tb24uU291bmRSZXMuQ2xpY2tfYnRuX2Nsb3NlLFxyXG4gICAgICAgICAgICAgICAgQ2xpY2tCdG5Td2l0Y2g6IGNvbW1vbi5Tb3VuZFJlcy5DbGlja0J0blN3aXRjaFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGNvbW1vbi5UZXh0Vmlld01nci5nZXRJbnN0YW5jZSgyMDEpO1xyXG4gICAgICAgICAgICBjb21tb24uQmFua3J1cHRQYW5lbE1nci5nZXRJbnN0YW5jZSgxMCk7XHJcbiAgICAgICAgICAgIGNvbW1vbi5EaWFsb2dNYW5hZ2VyLmdldEluc3RhbmNlKDIxMCk7XHJcblxyXG4gICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5ydW5TY2VuZShcImxvZ2luXCIpO1xyXG4gICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5wcmVMb2FkU2NlbmUoXCJsb2JieVwiKTtcclxuICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkucHJlTG9hZFNjZW5lKFwidGVhaG91c2VcIik7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFkZENoaWxkKG5ldyBjb21tb24uRGVidWdQYW5lbCgpKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRDaGlsZChuZXcgY29tbW9uLkxvYmJ5U2V0dGluZ1BhbmVsKCkpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZENoaWxkKG5ldyBjb21tb24uU2hhcmVQYW5lbCgpKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRDaGlsZChuZXcgY29tbW9uLlZlcmlmeVBob25lKCkpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZENoaWxkKG5ldyBjb21tb24uTG9hZGluZ1BhbmVsKCksIDM1MCk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkQ2hpbGQobmV3IGNvbW1vbi5Ub2FzdFBhbmVsKCksIDMxMCk7XHJcblxyXG5cclxuICAgICAgICAgICAgLy/lsYLnuqcgdG9hc3QgPiBkaWFsb25nID4gYmFua3J1cHQgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBMYXVuY2hlclZpZXcgZXh0ZW5kcyBrYWF5b3UuTGF5ZXIge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgICAgICB0aGlzLmluaXRVSSgpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxhYmVsX2Rlc2NyaXB0aW9uOiBjY3VpLlRleHQgPSBudWxsO1xyXG4gICAgICAgIHByb2dyZXNzQmFyOiBjY3VpLkxvYWRpbmdCYXIgPSBudWxsO1xyXG4gICAgICAgIGxhYmVsX3Byb2dyZXNzOiBjY3VpLlRleHQgPSBudWxsO1xyXG4gICAgICAgIGluaXRVSSgpIHtcclxuICAgICAgICAgICAgdGhpcy5pbml0V2l0aGNjcygncmVzL0xhdW5jaGVyLmpzb24nKTtcclxuICAgICAgICAgICAgdGhpcy5sYWJlbF9kZXNjcmlwdGlvbiA9IGNjdWkuaGVscGVyLnNlZWtXaWRnZXRCeU5hbWUoPGNjdWkuV2lkZ2V0PnRoaXMubm9kZSwgXCJsYWJlbF9kZXNjcmlwdGlvblwiKTtcclxuICAgICAgICAgICAgdGhpcy5wcm9ncmVzc0JhciA9IGNjdWkuaGVscGVyLnNlZWtXaWRnZXRCeU5hbWUoPGNjdWkuV2lkZ2V0PnRoaXMubm9kZSwgXCJwcm9ncmVzc0JhclwiKTtcclxuICAgICAgICAgICAgdGhpcy5sYWJlbF9wcm9ncmVzcyA9IGNjdWkuaGVscGVyLnNlZWtXaWRnZXRCeU5hbWUoPGNjdWkuV2lkZ2V0PnRoaXMubm9kZSwgXCJsYWJlbF9wcm9ncmVzc1wiKTtcclxuICAgICAgICAgICAgdGhpcy5sYWJlbF9kZXNjcmlwdGlvbi5zZXRTdHJpbmcoJycpO1xyXG4gICAgICAgICAgICB0aGlzLnByb2dyZXNzQmFyLnNldFZpc2libGUoZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLmxhYmVsX3Byb2dyZXNzLnNldFN0cmluZygnJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldERlc2NyaXB0aW9uKHN0cjogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGFiZWxfZGVzY3JpcHRpb24uc2V0U3RyaW5nKHN0cik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNob3dQcm9ncmVzc0JhcigpIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9ncmVzc0Jhci5zZXRWaXNpYmxlKHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLnByb2dyZXNzQmFyLnNldFBlcmNlbnQoMCk7XHJcbiAgICAgICAgICAgIHRoaXMubGFiZWxfcHJvZ3Jlc3Muc2V0U3RyaW5nKFwiMDAlXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBoaWRlUHJvZ3Jlc3NCYXIoKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3NCYXIuc2V0VmlzaWJsZShmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3NCYXIuc2V0UGVyY2VudCgwKTtcclxuICAgICAgICAgICAgdGhpcy5sYWJlbF9wcm9ncmVzcy5zZXRTdHJpbmcoXCJcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldFBlcmNlbnQobnVtOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgLy8gdGhpcy5wcm9ncmVzc0Jhci5zZXRWaXNpYmxlKHRydWUpO1xyXG4gICAgICAgICAgICBsZXQgY251bSA9IE1hdGgubWF4KDAsIE1hdGgubWluKDEwMCwgbnVtKSk7XHJcbiAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3NCYXIuc2V0UGVyY2VudChjbnVtKTtcclxuICAgICAgICAgICAgbGV0IG5zdHIgPSBcIlwiO1xyXG4gICAgICAgICAgICBpZiAoY251bSA8IDEwKSB7XHJcbiAgICAgICAgICAgICAgICBuc3RyID0gXCIwXCIgKyBjbnVtO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbnN0ciA9IGNudW0udG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBuc3RyICs9IFwiJVwiO1xyXG4gICAgICAgICAgICB0aGlzLmxhYmVsX3Byb2dyZXNzLnNldFN0cmluZyhcIlwiICsgbnN0cik7XHJcbiAgICAgICAgICAgIHRoaXMubGFiZWxfZGVzY3JpcHRpb24uc2V0U3RyaW5nKFwi5q2j5Zyo5Yqg6L296LWE5rqQLi4uKFwiICsgbnN0ciArIFwiKVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgUHJlbG9hZFNjZW5lIGV4dGVuZHMgTWFpblNjZW5lIHtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgX19sYXVuY2hlclZpZXc6IExhdW5jaGVyVmlldyA9IG51bGw7XHJcbiAgICAgICAgaW5pdFVJKCkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkKFsncmVzL0xhdW5jaGVyLmpzb24nXSxcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChyZXN1bHQsIGNvdW50LCBsb2FkZWRDb3VudCkgeyB9LFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuX19sYXVuY2hlclZpZXcgPSBuZXcgTGF1bmNoZXJWaWV3KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5hZGRDaGlsZChzZWxmLl9fbGF1bmNoZXJWaWV3KVxyXG4gICAgICAgICAgICAgICAgICAgIC8v5byA5aeL5Yqg6L295qih5Z2XXHJcbiAgICAgICAgICAgICAgICAgICAgQXBwLmdldEluc3RhbmNlKCkubG9hZE1vZHVsZXMoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBfbGFiZWw6IGNjLkxhYmVsVFRGID0gbnVsbDtcclxuICAgICAgICBjYjogRnVuY3Rpb247XHJcbiAgICAgICAgaW5pdFVJX3dlY2hhdChjYjogRnVuY3Rpb24pIHtcclxuICAgICAgICAgICAgdGhpcy5jYiA9IGNiO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuWQr+WKqOmhtSDlvIDlp4vliqDovb1cIik7XHJcbiAgICAgICAgICAgIHRoaXMub25Mb2FkQmcoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9uTG9hZEJnKCkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkKFsncmVzL0RlZmF1bHQucG5nJ10sXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAocmVzdWx0LCBjb3VudCwgbG9hZGVkQ291bnQpIHsgfSxcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3AgPSBuZXcgY2MuU3ByaXRlKCdyZXMvRGVmYXVsdC5wbmcnKTtcclxuICAgICAgICAgICAgICAgICAgICBzcC5zZXRQb3NpdGlvbihjYy53aW5TaXplLndpZHRoIC8gMiwgY2Mud2luU2l6ZS5oZWlnaHQgLyAyKTtcclxuICAgICAgICAgICAgICAgICAgICBzcC5zZXRTY2FsZShjYy53aW5TaXplLmhlaWdodCAvIDcyMCwgY2Mud2luU2l6ZS53aWR0aCAvIDEyODApO1xyXG4gICAgICAgICAgICAgICAgICAgIHNwLnNldFJvdGF0aW9uKDI3MCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5nZXRTY2VuZUxheWVyKCkuc2V0Q29udGVudFNpemUoY2Mud2luU2l6ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5nZXRTY2VuZUxheWVyKCkuc2V0UG9zaXRpb24oMCwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5nZXRTY2VuZUxheWVyKCkuYWRkQ2hpbGQoc3ApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgbGFiZWwgPSBzZWxmLl9sYWJlbCA9IG5ldyBjYy5MYWJlbFRURihcIlwiLCBcIkFyaWFsXCIsIDQ4KTtcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbC5zZXRDb2xvcihjYy5jb2xvcigyNTUsIDI1NSwgMjU1KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWwuc2V0UG9zaXRpb24oY2Mud2luU2l6ZS53aWR0aCAvIDIsIDEyMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5nZXRTY2VuZUxheWVyKCkuYWRkQ2hpbGQobGFiZWwpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuWQr+WKqOmhtSDliqDovb3lrozmiJBcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8v6ZqQ6JePSDXniYjnmoTlkK/liqjpobVcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2Muc3lzLmlzV2VDaGF0SDUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAod2luZG93W1wiaGlkZVByZWxvYWRcIl0pIHdpbmRvd1tcImhpZGVQcmVsb2FkXCJdKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNjLnN5cy5pc1dlQ2hhdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbC5zdHJpbmcgPSBcIuato+WcqOS4i+i9veS4rS4uLiBcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHByb2dyZXNzID0gZnVuY3Rpb24gKHBlciwgYml0LCBhbGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsLnN0cmluZyA9IFwi5q2j5Zyo5LiL6L295LitLi4uIFwiICsgcGVyICsgXCIlXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWwuc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYub25Mb2FkUmVzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVuemlwV2VjaGF0UmVzb3VyY2UobG9hZCwgcHJvZ3Jlc3MpXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYub25Mb2FkUmVzKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9uTG9hZFJlcygpIHtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICBjYy5sb2FkZXIubG9hZChrYWF5b3UuUmVzTWFuYWdlci5nZXRJbnN0YW5jZSgpLlJFU0RCLCBmdW5jdGlvbiAocmVzdWx0LCBjb3VudCwgbG9hZGVkQ291bnQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBwZXJjZW50ID0gKGxvYWRlZENvdW50IC8gY291bnQgKiAxMDApIHwgMDtcclxuICAgICAgICAgICAgICAgIHBlcmNlbnQgPSBNYXRoLm1pbihwZXJjZW50LCAxMDApO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5fbGFiZWwuc2V0U3RyaW5nKFwi6LWE5rqQ5Yqg6L295LitLi4uXCIgKyBwZXJjZW50ICsgXCIlXCIpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLotYTmupDliqDovb3kuK06XCIsIHBlcmNlbnQpO1xyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLl9sYWJlbC5zZXRTdHJpbmcoXCLotYTmupDliqDovb3kuK0uLi4uLi5cIik7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIui1hOa6kOWKoOi9veWujOaIkFwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2MgPSBuZXcgQXBwTWFpblNjZW5lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0TWFpblNjZW5lKHNjKTtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KHNlbGYuY2IsIDEpO1xyXG4gICAgICAgICAgICAgICAgfSwgMSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEFwcCB7XHJcbiAgICAgICAgc3RhdGljIF9fSU5TX186IEFwcCA9IG51bGw7XHJcbiAgICAgICAgc3RhdGljIGdldEluc3RhbmNlKCkge1xyXG4gICAgICAgICAgICBpZiAoQXBwLl9fSU5TX18gPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgQXBwLl9fSU5TX18gPSBuZXcgQXBwKCk7XHJcbiAgICAgICAgICAgICAgICBBcHAuX19JTlNfXy5pbml0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIEFwcC5fX0lOU19fO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdGF0aWMgaXNBcHBsZUV4YW1pbmVWZXJzaW9uID0gZmFsc2U7IC8v6Iu55p6c5a6h5qC454mIXHJcbiAgICAgICAgc3RhdGljIHZlcnNpb24gPSBcIjEuMC4xNS41NVwiOy8v5a6i5oi356uv54mI5pys5Y+3XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICBpZiAoY2Muc3lzLmlzTmF0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInNlYWNocGF0aFwiLCBKU09OLnN0cmluZ2lmeShqc2IuZmlsZVV0aWxzLmdldFNlYXJjaFBhdGhzKCkpKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiV3JpdGFibGVQYXRoXCIsIEpTT04uc3RyaW5naWZ5KGpzYi5maWxlVXRpbHMuZ2V0V3JpdGFibGVQYXRoKCkpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY2NfZXh0ZW5kKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBfcHJlbG9hZFNjZW5lOiBQcmVsb2FkU2NlbmUgPSBudWxsO1xyXG5cclxuICAgICAgICBpbml0KCkge1xyXG4gICAgICAgICAgICAvL+WIneWni+WMluWxj+W5lemAgumFjVxyXG4gICAgICAgICAgICBpZiAoIWNjLndpblNpemVDdXN0b20pIHtcclxuICAgICAgICAgICAgICAgIHZhciBzaXplID0gY2Mudmlldy5nZXRGcmFtZVNpemUoKTtcclxuICAgICAgICAgICAgICAgIHZhciBsb25nQiA9IE1hdGgubWF4KHNpemUud2lkdGgsIHNpemUuaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIHZhciBzb3J0QiA9IE1hdGgubWluKHNpemUud2lkdGgsIHNpemUuaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGxvbmdCIC8gc29ydEIpXHJcbiAgICAgICAgICAgICAgICBpZiAobG9uZ0IgLyBzb3J0QiA8PSAxNiAvIDEwKSB7IC8vcGFkICAxLjZcclxuICAgICAgICAgICAgICAgICAgICBjYy52aWV3LnNldERlc2lnblJlc29sdXRpb25TaXplKDEyODAsIDcyMCwgY2MuUmVzb2x1dGlvblBvbGljeS5TSE9XX0FMTCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2Mud2luU2l6ZUN1c3RvbSA9IHsgd2lkdGg6IDAsIGhlaWdodDogMCB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLndpblNpemVDdXN0b20ud2lkdGggPSBjYy53aW5TaXplLndpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLndpblNpemVDdXN0b20uaGVpZ2h0ID0gY2Mud2luU2l6ZS5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJwYWRcIik7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGxvbmdCIC8gc29ydEIgPCAyMCAvIDEwKSB7IC8vaXBob25lIDYgIDJcclxuICAgICAgICAgICAgICAgICAgICBjYy52aWV3LnNldERlc2lnblJlc29sdXRpb25TaXplKDEyODAsIDcyMCwgY2MuUmVzb2x1dGlvblBvbGljeS5GSVhFRF9IRUlHSFQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLndpblNpemVDdXN0b20gPSB7IHdpZHRoOiAwLCBoZWlnaHQ6IDAgfTtcclxuICAgICAgICAgICAgICAgICAgICBjYy53aW5TaXplQ3VzdG9tLndpZHRoID0gY2Mud2luU2l6ZS53aWR0aDtcclxuICAgICAgICAgICAgICAgICAgICBjYy53aW5TaXplQ3VzdG9tLmhlaWdodCA9IGNjLndpblNpemUuaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXBob25lIDZcIik7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Ugey8vaXBob25lIHhcclxuICAgICAgICAgICAgICAgICAgICBjYy52aWV3LnNldERlc2lnblJlc29sdXRpb25TaXplKDEyODAsIDcyMCwgY2MuUmVzb2x1dGlvblBvbGljeS5GSVhFRF9IRUlHSFQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLndpblNpemVDdXN0b20gPSB7IHdpZHRoOiAwLCBoZWlnaHQ6IDAgfTtcclxuICAgICAgICAgICAgICAgICAgICBjYy53aW5TaXplQ3VzdG9tLndpZHRoID0gY2Mud2luU2l6ZS53aWR0aCAtIDEwMDtcclxuICAgICAgICAgICAgICAgICAgICBjYy53aW5TaXplQ3VzdG9tLmhlaWdodCA9IGNjLndpblNpemUuaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXBob25lIHhcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy/osIPmlbTljY7kuLrlubPmnb/vvIjliIbovqjnjofmr5TkvovkuLoxNjoxMO+8iemAgumFjeaWueW8j1xyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciBzaXplID0gY2Mudmlldy5nZXRGcmFtZVNpemUoKTtcclxuICAgICAgICAgICAgICAgIHZhciBsb25nQiA9IE1hdGgubWF4KHNpemUud2lkdGgsIHNpemUuaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIHZhciBzb3J0QiA9IE1hdGgubWluKHNpemUud2lkdGgsIHNpemUuaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGxvbmdCIC8gc29ydEIpXHJcbiAgICAgICAgICAgICAgICAvL+iAgeeJiOacrOeahG1haW4uanPmmK88MTYvMTDvvIzov5nph4zmlLnmiJA8PTE2LzEwXHJcbiAgICAgICAgICAgICAgICBpZiAobG9uZ0IgLyBzb3J0QiA8PSAxNiAvIDEwKSB7IC8vcGFkXHJcbiAgICAgICAgICAgICAgICAgICAgY2Mudmlldy5zZXREZXNpZ25SZXNvbHV0aW9uU2l6ZSgxMjgwLCA3MjAsIGNjLlJlc29sdXRpb25Qb2xpY3kuU0hPV19BTEwpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLndpblNpemVDdXN0b20gPSB7IHdpZHRoOiAwLCBoZWlnaHQ6IDAgfTtcclxuICAgICAgICAgICAgICAgICAgICBjYy53aW5TaXplQ3VzdG9tLndpZHRoID0gY2Mud2luU2l6ZS53aWR0aDtcclxuICAgICAgICAgICAgICAgICAgICBjYy53aW5TaXplQ3VzdG9tLmhlaWdodCA9IGNjLndpblNpemUuaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicGFkXCIpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChsb25nQiAvIHNvcnRCIDw9IDIwIC8gMTIpIHsgLy/kuInmmJ/lubPmnb8gXHJcbiAgICAgICAgICAgICAgICAgICAgY2Mudmlldy5zZXREZXNpZ25SZXNvbHV0aW9uU2l6ZSgxMjgwLCA3MjAsIGNjLlJlc29sdXRpb25Qb2xpY3kuU0hPV19BTEwpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLndpblNpemVDdXN0b20gPSB7IHdpZHRoOiAwLCBoZWlnaHQ6IDAgfTtcclxuICAgICAgICAgICAgICAgICAgICBjYy53aW5TaXplQ3VzdG9tLndpZHRoID0gY2Mud2luU2l6ZS53aWR0aDtcclxuICAgICAgICAgICAgICAgICAgICBjYy53aW5TaXplQ3VzdG9tLmhlaWdodCA9IGNjLndpblNpemUuaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicGFkXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoY2Muc3lzLmlzV2VDaGF0KSB7XHJcbiAgICAgICAgICAgICAgICBjYy5nYW1lQXJlYSA9IGthYXlvdS5QbGF0Zm9ybU1nci5nZXRJbnN0YW5jZSgpLnd4Q2ZnLkdldENvbmZpZygpLmdhbWVBcmVhIHx8IFwiXCI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgd2luZG93WydyZXF1aXJlU2NyaXB0RXJyJ10gPSB0aGlzLnJlcXVpcmVTY3JpcHRFcnIuYmluZCh0aGlzKTtcclxuICAgICAgICAgICAgaWYgKGNjLnN5cy5pc1dlQ2hhdCkge1xyXG4gICAgICAgICAgICAgICAgLy8gc2VsZi5sb2FkTW9kdWxlcygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRXZWJHYW1lTW9kdWxlKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvL+ebtOaOpeaehOW7uumihOWKoOi9veWcuuaZr+S9nOS4uuWQr+WKqOmhtVxyXG4gICAgICAgICAgICAgICAgc2VsZi5fcHJlbG9hZFNjZW5lID0gbmV3IFByZWxvYWRTY2VuZSgpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5fcHJlbG9hZFNjZW5lLmluaXRVSSgpO1xyXG4gICAgICAgICAgICAgICAgY2MuZGlyZWN0b3IucnVuU2NlbmUoc2VsZi5fcHJlbG9hZFNjZW5lKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIF9fcnNjcmlwdEVycjogQXJyYXk8c3RyaW5nPjtcclxuICAgICAgICBnZXRSZXF1aXJlU2NyaXB0RXJyKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX3JzY3JpcHRFcnIgfHwgbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVxdWlyZVNjcmlwdEVycihwYXRoOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLl9fcnNjcmlwdEVycikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fX3JzY3JpcHRFcnIgPSBbXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9fcnNjcmlwdEVyci5wdXNoKHBhdGgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpc0JhY2tncm91bmQgPSBmYWxzZTtcclxuICAgICAgICBvbkxvYWRQcmVsb2FkKGNiID0gbnVsbCkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgIGxldCBwID0gbmV3IFByZWxvYWRTY2VuZSgpO1xyXG4gICAgICAgICAgICBwLmluaXRVSV93ZWNoYXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5vblByZUxvYWRTdWNjZWVkKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5ydW5TY2VuZShwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9uUHJlTG9hZFN1Y2NlZWQoKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGNjLmV2ZW50TWFuYWdlci5hZGRDdXN0b21MaXN0ZW5lcihjYy5nYW1lLkVWRU5UX0hJREUsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzZWxmLmlzQmFja2dyb3VuZCkgeyByZXR1cm47IH1cclxuICAgICAgICAgICAgICAgIHNlbGYuaXNCYWNrZ3JvdW5kID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGNjLmxvZyhcIua4uOaIj+i/m+WFpeWQjuWPsFwiKTtcclxuICAgICAgICAgICAgICAgIGthYXlvdS5nZXRDb250cm9sbGVyKCdjb21tb24nKS5lbWl0KGthYXlvdS5FdmVudC5jcmVhdGUoa2FheW91LkN1c3RvbUV2ZW50LCBjYy5nYW1lLkVWRU5UX0hJREUpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNjLmV2ZW50TWFuYWdlci5hZGRDdXN0b21MaXN0ZW5lcihjYy5nYW1lLkVWRU5UX1NIT1csIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmICghc2VsZi5pc0JhY2tncm91bmQpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgICAgICAgICBzZWxmLmlzQmFja2dyb3VuZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgY2MubG9nKFwi6YeN5paw6L+U5Zue5ri45oiPXCIpO1xyXG4gICAgICAgICAgICAgICAga2FheW91LmdldENvbnRyb2xsZXIoJ2NvbW1vbicpLmVtaXQoa2FheW91LkV2ZW50LmNyZWF0ZShrYWF5b3UuQ3VzdG9tRXZlbnQsIGNjLmdhbWUuRVZFTlRfU0hPVykpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChzZWxmLmdldFJlcXVpcmVTY3JpcHRFcnIoKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbXNnOiBcIuWKoOi9veaKpemUmVwiICsgSlNPTi5zdHJpbmdpZnkoc2VsZi5nZXRSZXF1aXJlU2NyaXB0RXJyKCkpLFxyXG4gICAgICAgICAgICAgICAgICAgIGJ0bnM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCLnoa7lrppcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvclR5cGU6ICdncmVlbidcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBrYWF5b3UuZW1pdCgnY29tbW9uJywgJ3VpOjpEaWFsb2c6OlNob3cnLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5Yqg6L295oql6ZSZXCIsIHNlbGYuZ2V0UmVxdWlyZVNjcmlwdEVycigpKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsb2FkTW9kdWxlcygpIHtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICBzZWxmLl9wcmVsb2FkU2NlbmUuX19sYXVuY2hlclZpZXcuc2V0RGVzY3JpcHRpb24oXCLmuLjmiI/lkK/liqjkuK0uLi5cIik7XHJcbiAgICAgICAgICAgIGlmIChjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICAgICAgICAgIGthYXlvdS51blppcEFzc2V0c1BhdGgoZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlbGYuX3ByZWxvYWRTY2VuZS5fX2xhdW5jaGVyVmlldy5zZXREZXNjcmlwdGlvbihcIumHiuaUvui1hOa6kOWksei0pSDor7fogZTns7vlrqLmnI0uLi5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8v6Kej5Y6L5a6M5oiQXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuX3ByZWxvYWRTY2VuZS5fX2xhdW5jaGVyVmlldy5zZXREZXNjcmlwdGlvbihcIuino+WOi+WujOavle+8jOW8gOWni+WKoOi9vei1hOa6kC4uLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5nZXROYXRpdmVHYW1lTW9kdWxlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMTApO1xyXG5cclxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uICh0eXBlLCBjdXJwcm8sIHRvYXRsLCBjdXIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuX3ByZWxvYWRTY2VuZS5fX2xhdW5jaGVyVmlldy5zZXREZXNjcmlwdGlvbihcIuato+WcqOmHiuaUvui1hOa6kC4uLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLl9wcmVsb2FkU2NlbmUuX19sYXVuY2hlclZpZXcuc2hvd1Byb2dyZXNzQmFyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlID09IDMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5fcHJlbG9hZFNjZW5lLl9fbGF1bmNoZXJWaWV3LnNldFBlcmNlbnQoY3VycHJvKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT0gNCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLl9wcmVsb2FkU2NlbmUuX19sYXVuY2hlclZpZXcuc2V0UGVyY2VudCgxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuZ2V0V2ViR2FtZU1vZHVsZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgZ2V0V2ViR2FtZU1vZHVsZSgpIHtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICBjYy5sb2FkZXIubG9hZEpzb24oXCJzcmMvbW9kdWxlbGlzdC5qc29uXCIsIGZ1bmN0aW9uIChlcnIsIGdhbWVtb2R1bGU6IEFycmF5PHN0cmluZz4pIHtcclxuICAgICAgICAgICAgICAgIGlmIChlcnIpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgICAgICAgICBsZXQgZ2FtZW1vZHVsZWxpc3RQYXRoID0gW107XHJcbiAgICAgICAgICAgICAgICBnYW1lbW9kdWxlID0gW1wiY29tbW9uXCIsIFwibG9iYnlcIl07XHJcbiAgICAgICAgICAgICAgICBnYW1lbW9kdWxlLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZ2FtZW1vZHVsZWxpc3RQYXRoLnB1c2goYHNyYy8ke2VsZW1lbnR9LyR7ZWxlbWVudH1fanNsaXN0Lmpzb25gKTtcclxuICAgICAgICAgICAgICAgICAgICBnYW1lbW9kdWxlbGlzdFBhdGgucHVzaChgc3JjLyR7ZWxlbWVudH0vJHtlbGVtZW50fS5tb2R1bGUuanNgKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgaW50ZXJmYWNlIElIb3RJdGVtIHtcclxuICAgICAgICAgICAgICAgICAgICBcInBhY2thZ2VVcmxcIjogc3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiaG90dmVyc2lvblwiOiBzdHJpbmcsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZW1vdGVNYW5pZmVzdFVybFwiOiBzdHJpbmcsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZW1vdGVWZXJzaW9uVXJsXCI6IHN0cmluZ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc2VsZi5sb2FkSnNMaXN0KGdhbWVtb2R1bGVsaXN0UGF0aClcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXROYXRpdmVHYW1lTW9kdWxlKCkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvL+iOt+WPluacrOWcsOaJgOacieaooeWdl1xyXG4gICAgICAgICAgICBsZXQgbW9kdWxlTGlzdCA9IGthYXlvdS5nZXRMb2NhbE1vZHVsZXMoKTtcclxuICAgICAgICAgICAgLy/liqDlhaXliLDmkJzntKLnm67lvZVcclxuICAgICAgICAgICAgdmFyIG11c3RNb2R1bGVOYW1lcyA9IFtcImNvbW1vblwiLCBcImxvYmJ5XCJdO1xyXG4gICAgICAgICAgICBsZXQganNMaXN0ID0gbmV3IEFycmF5KG11c3RNb2R1bGVOYW1lcy5sZW5ndGgpO1xyXG4gICAgICAgICAgICBsZXQgbXVzdEpzTGlzdCA9IG5ldyBBcnJheShtdXN0TW9kdWxlTmFtZXMubGVuZ3RoKTtcclxuICAgICAgICAgICAgZm9yICh2YXIgeCBpbiBtb2R1bGVMaXN0KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSBtdXN0TW9kdWxlTmFtZXMuaW5kZXhPZihtb2R1bGVMaXN0W3hdLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID49IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBqc0xpc3RbaW5kZXhdID0gbW9kdWxlTGlzdFt4XS5yZWxhdGl2ZTtcclxuICAgICAgICAgICAgICAgICAgICBtdXN0SnNMaXN0W2luZGV4XSA9IG1vZHVsZUxpc3RbeF0ucmVsYXRpdmU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGpzTGlzdC5wdXNoKG1vZHVsZUxpc3RbeF0ucmVsYXRpdmUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAganNiLmZpbGVVdGlscy5hZGRTZWFyY2hQYXRoKG1vZHVsZUxpc3RbeF0uc2VhcmNoLCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIW1vZHVsZUxpc3RbMF0gfHwgIW1vZHVsZUxpc3RbMV0pIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuX3ByZWxvYWRTY2VuZS5fX2xhdW5jaGVyVmlldy5zZXREZXNjcmlwdGlvbihcIui1hOa6kOWKoOi9vemUmeivry4uLlwiKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuX3ByZWxvYWRTY2VuZS5fX2xhdW5jaGVyVmlldy5oaWRlUHJvZ3Jlc3NCYXIoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL+iOt+WPlui1hOa6kOebruW9lVxyXG4gICAgICAgICAgICB2YXIgcmVtb3RlU2VhY2hQYXRoUm9vdCA9IGthYXlvdS5nZXRSZW1vdGVQYXRoKCk7XHJcbiAgICAgICAgICAgIGxldCBmaWxlbGlzdCA9IGpzYi5maWxlVXRpbHMubGlzdEZpbGVzKHJlbW90ZVNlYWNoUGF0aFJvb3QpO1xyXG4gICAgICAgICAgICBsZXQgZGlybGlzdDogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciB4IGluIGZpbGVsaXN0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoanNiLmZpbGVVdGlscy5pc0RpcmVjdG9yeUV4aXN0KGZpbGVsaXN0W3hdKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpcmxpc3QucHVzaChmaWxlbGlzdFt4XSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIEFwcC52ZXJzaW9uID0ga2FheW91LmdldExvYmJ5VmVyc2lvbigpO1xyXG5cclxuICAgICAgICAgICAgLy8gc2VsZi5sb2FkSnNMaXN0KGpzTGlzdCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5Y6f5YWI5Yqg6L2955qE5qih5Z2XXCIgKyBKU09OLnN0cmluZ2lmeShqc0xpc3QpKTsvL1xyXG5cclxuICAgICAgICAgICAgc2VsZi5sb2FkSnNMaXN0KG11c3RKc0xpc3QpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5Yqg6L29anPmqKHlnZdcclxuICAgICAgICBsb2FkSnNMaXN0KGdhbWVtb2R1bGVsaXN0UGF0aCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIumcgOimgeS4gOasoeWKoOi9veeahOaooeWdl1wiICsgSlNPTi5zdHJpbmdpZnkoZ2FtZW1vZHVsZWxpc3RQYXRoKSk7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKGNjLnN5cy5pc1dlQ2hhdCkge1xyXG4gICAgICAgICAgICAgICAgZ2FtZW1vZHVsZWxpc3RQYXRoLmZvckVhY2godiA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZShcIi4uL1wiICsgdilcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBzZWxmLm9uTG9hZFByZWxvYWQoKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibG9hZEpzV2l0aEltZyAgb2tcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjYy5sb2FkZXIubG9hZEpzKFwiXCIsIGdhbWVtb2R1bGVsaXN0UGF0aCwgZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJsb2FkSnNXaXRoSW1nICBva1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmxvYWRSZXNvdXJjZSgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+WKoOi9vei1hOa6kFxyXG4gICAgICAgIGxvYWRSZXNvdXJjZSgpIHtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICBzZWxmLl9wcmVsb2FkU2NlbmUuX19sYXVuY2hlclZpZXcuc2V0RGVzY3JpcHRpb24oXCLmraPlnKjliqDovb3otYTmupAuLi5cIik7XHJcblxyXG4gICAgICAgICAgICBpZiAoY2Muc3lzLmlzTmF0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLl9wcmVsb2FkU2NlbmUuX19sYXVuY2hlclZpZXcuaGlkZVByb2dyZXNzQmFyKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLl9wcmVsb2FkU2NlbmUuX19sYXVuY2hlclZpZXcuc2hvd1Byb2dyZXNzQmFyKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8yMDAyMjTlj6rmnInnvZHpobXmiY1sb2FkcmVzZGJcclxuICAgICAgICAgICAgaWYgKGNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5fcHJlbG9hZFNjZW5lLl9fbGF1bmNoZXJWaWV3LnNldFBlcmNlbnQoMTAwKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuc3RhcnRHYW1lKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjYy5sb2FkZXIubG9hZChrYWF5b3UuUmVzTWFuYWdlci5nZXRJbnN0YW5jZSgpLlJFU0RCLFxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChyZXN1bHQsIHRhdG9sY291bnQsIGxvYWRlZENvdW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjYy5zeXMuaXNOYXRpdmUpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbG9kYXNoLmlzTnVtYmVyKHRhdG9sY291bnQpIHx8IHRhdG9sY291bnQgPCAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFsb2Rhc2guaXNOdW1iZXIobG9hZGVkQ291bnQpIHx8IGxvYWRlZENvdW50IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjbnVtID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oMTAwLCBNYXRoLmNlaWwoKGxvYWRlZENvdW50IC8gdGF0b2xjb3VudCkgKiAxMDApKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuX3ByZWxvYWRTY2VuZS5fX2xhdW5jaGVyVmlldy5zZXRQZXJjZW50KGNudW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuX3ByZWxvYWRTY2VuZS5fX2xhdW5jaGVyVmlldy5zZXRQZXJjZW50KDEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnN0YXJ0R2FtZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+a4uOaIj+WQr+WKqFxyXG4gICAgICAgIHN0YXJ0R2FtZSgpIHtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgc2MgPSBuZXcgQXBwTWFpblNjZW5lKCk7XHJcbiAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldE1haW5TY2VuZShzYyk7XHJcbiAgICAgICAgICAgIGNjLmV2ZW50TWFuYWdlci5hZGRDdXN0b21MaXN0ZW5lcihjYy5nYW1lLkVWRU5UX0hJREUsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzZWxmLmlzQmFja2dyb3VuZCkgeyByZXR1cm47IH1cclxuICAgICAgICAgICAgICAgIHNlbGYuaXNCYWNrZ3JvdW5kID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGNjLmxvZyhcIua4uOaIj+i/m+WFpeWQjuWPsFwiKTtcclxuICAgICAgICAgICAgICAgIGthYXlvdS5nZXRDb250cm9sbGVyKCdjb21tb24nKS5lbWl0KGthYXlvdS5FdmVudC5jcmVhdGUoa2FheW91LkN1c3RvbUV2ZW50LCBjYy5nYW1lLkVWRU5UX0hJREUpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNjLmV2ZW50TWFuYWdlci5hZGRDdXN0b21MaXN0ZW5lcihjYy5nYW1lLkVWRU5UX1NIT1csIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmICghc2VsZi5pc0JhY2tncm91bmQpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgICAgICAgICBzZWxmLmlzQmFja2dyb3VuZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgY2MubG9nKFwi6YeN5paw6L+U5Zue5ri45oiPXCIpO1xyXG4gICAgICAgICAgICAgICAga2FheW91LmdldENvbnRyb2xsZXIoJ2NvbW1vbicpLmVtaXQoa2FheW91LkV2ZW50LmNyZWF0ZShrYWF5b3UuQ3VzdG9tRXZlbnQsIGNjLmdhbWUuRVZFTlRfU0hPVykpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChzZWxmLmdldFJlcXVpcmVTY3JpcHRFcnIoKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLliqDovb3miqXplJlcIiwgc2VsZi5nZXRSZXF1aXJlU2NyaXB0RXJyKCkpXHJcbiAgICAgICAgICAgICAgICBsZXQgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgICAgICBtc2c6IFwi5Yqg6L295oql6ZSZXCIgKyBKU09OLnN0cmluZ2lmeShzZWxmLmdldFJlcXVpcmVTY3JpcHRFcnIoKSksXHJcbiAgICAgICAgICAgICAgICAgICAgYnRuczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIuehruWumlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yVHlwZTogJ2dyZWVuJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGthYXlvdS5lbWl0KCdjb21tb24nLCAndWk6OkRpYWxvZzo6U2hvdycsIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLy/kuIrmiqXlvILluLhcclxuICAgICAgICBQb3N0QnVnbHkodmFsMDogc3RyaW5nLCB2YWwxOiBzdHJpbmcgPSBcIlwiLCB2YWwyOiBzdHJpbmcgPSBcIlwiKSB7XHJcbiAgICAgICAgICAgIC8vIENSQVNIVFlQRV9DT0NPUzJEWF9KUyA1XHJcbiAgICAgICAgICAgIGxldCBDUkFTSFRZUEVfQ09DT1MyRFhfSlMgPSA1O1xyXG4gICAgICAgICAgICBpZiAoIWNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0lPUykge1xyXG4gICAgICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIk5hdGl2ZU9jQ2xhc3NcIiwgXCJQb3N0QnVnbHk6VmFyMTpWYXIyOlZhcjM6XCIsIFwiNVwiLCB2YWwwLCB2YWwxLCB2YWwyKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0FORFJPSUQpIHtcclxuICAgICAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJjb20va2F5b3UvdXRpbHMvTmF0aXZlSmF2YUNsYXNzXCIsIFwiUG9zdEJ1Z2x5XCIsIFwiKElMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZztMamF2YS9sYW5nL1N0cmluZzspVlwiXHJcbiAgICAgICAgICAgICAgICAgICAgLCBDUkFTSFRZUEVfQ09DT1MyRFhfSlMsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsMCxcclxuICAgICAgICAgICAgICAgICAgICB2YWwxLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbDJcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcblxyXG5cclxuICAgIH1cclxuXHJcbn0iXX0=
