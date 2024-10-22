// cc._loaderImage = "./res/loading.png";
require("./src/app")

cc.game.onStart = function(){
    var sys = cc.sys;
    if(!sys.isNative && document.getElementById("cocosLoading")) //If referenced loading.js, please remove it
        document.body.removeChild(document.getElementById("cocosLoading"));

    // Pass true to enable retina display, on Android disabled by default to improve performance
    cc.view.enableRetina(sys.os === sys.OS_IOS ? true : false);

    // Disable auto full screen on baidu and wechat, you might also want to eliminate sys.BROWSER_TYPE_MOBILE_QQ
    if (sys.isMobile && 
        sys.browserType !== sys.BROWSER_TYPE_BAIDU &&
        sys.browserType !== sys.BROWSER_TYPE_WECHAT) {
        cc.view.enableAutoFullScreen(true);
    }

    // Adjust viewport meta
    cc.view.adjustViewPort(true);

    // Uncomment the following line to set a fixed orientation for your game
    // cc.view.setOrientation(cc.ORIENTATION_PORTRAIT);

    // Setup the resolution policy and design resolution size

    var adjust = cc.ResolutionPolicy.FIXED_HEIGHT
    // var percent = (cc.winSize.width / cc.winSize.height) < (16/10)
    // if(percent)
    //   adjust = cc.ResolutionPolicy.SHOW_ALL
    cc.view.setDesignResolutionSize(1280, 720, adjust);

    // The game will be resized when browser size change
    cc.view.resizeWithBrowserSize(true);
  
    kaayou.App.getInstance();
    //load resources
    // cc.LoaderScene.preload(g_resources, function () {
    //     cc.director.runScene(new HelloWorldScene());
    // }, this);

};
cc.game.run();