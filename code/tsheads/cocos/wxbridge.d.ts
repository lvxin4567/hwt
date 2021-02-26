interface wxSStorage{
    getItem(key:string): any;
    setItem(key:string , value:object): void;
    removeItem(key:string): void;
    keys(): Array<string>;
    clear(): void;
}

interface wxFile{
    setRoot(path:string):void;
    isFile(path:string):boolean;
    isDirectory(path:string):boolean;
    exists(path:string):boolean;
    writeFile(path:string):void;
    readFile(path, opt):any;
    download(url, success?, progress?, fail?):void;
    unzip(url, success?, progress?, fail?):void;
    mkdir(path:string):void;
    readDir(path:string):any;
    remove(path:string):void;
}

interface wxAD{
    play():void;
    create(option:{adUnitId:string},force?:boolean):void; 
    path:string;
}


interface wxLogin{
    /**
     * 
     * @param opt {left:X坐标，top:Y坐标,width:宽度，height:高度,onclick:点击事件}
     */
    create(opt?:{left?:number,top?:number,width?:number,height?:number,onclick?:Function}):void;
    destroy():void;
    show();
    hide();
    style(style:Object);
    image:string;
    text:string;
}

interface wxFeedBack{
    create(option?:{width?:number,height?:number,left?:number,top?:number,onclick?:Function,title?:string,transparent?:boolean});
    style(style:Object);
    show();
    hide();
    destroy();
    image:string;
    text:string;
}

interface wxScreen{
    width:number; 
    height:number;
    statusBarHeight:number;
    pixelRatio:number;
}

interface wxSys{
    screen:wxScreen;
    isAndroid:boolean;
    isIOS:boolean;
    aspectRatio:number;
    query:any;
}

interface wxUI{
    toast(message:string, icon?:"success"|"loading"|"none" , duration?:number);
    modal(opt:{title:string,content:string,success?:Function,fail?:Function});
}

interface wxHook{
    /**
     * 只执行一次的函数
     * @param event 事件名称
     * @param call 事件回调
     */
    once(event:string,call:Function);
    /**
     * 登录成功
     * @param call 回调
     */
    loginSuccess(call:Function);
    /**
     * 登录失败
     * @param call 回调
     */
    loginFail(call:Function);
    /**
     * 登录取消或者其他情况
     * @param call 回调
     */
    loginCancel(call:Function);
    /**
     * 支付成功
     * @param call 回调
     */
    paySuccess(call:Function);
    /**
     * 支付失败
     * @param call 回调
     */
    payFail(call:Function);
    /**
     * 微信小游戏切换到前台
     * @param call 回调
     */
    appShow(call:Function);
    /**
     * 微信小游戏切换到后台
     * @param call 回调
     */
    appHide(call:Function);
    /**
     * 微信小游戏退出
     * @param call 回调
     */
    appClose(call:Function);
    /**
     * 微信小游戏窗体变化
     * @param call 回调
     */
    appResize(call:Function);
    /**
     * 微信小游戏广告加载成功
     * @param call 回调
     */
    adLoad(call:Function);
    /**
     * 微信小游戏广告关闭
     * @param call 回调
     */
    adClose(call:Function);
    /**
     * 微信小游戏广告显示
     * @param call 回调
     */
    adShow(call:Function);
    /**
     * 微信小游戏广告报错
     * @param call 回调
     */
    adError(call:Function);
}

declare class WXJSBridge{

    static sessionStorage:wxSStorage;

    static localStorage:wxSStorage;

    /**
     * 
     * @param option {iid?:图片ID,url:图片地址,title:分享标题,query:传参}
     */
    static AppShare(option:{
        url:string,
        title:string,
        iid?:string,
        query?:string|object
    }):void;

    static AD:wxAD;

    static file:wxFile;

    static MIPay(option:{offerId:string,quantity:number,env?:number}):void;

    static login:wxLogin;

    static hook:wxHook;

    static sys:wxSys;

    static feedback:wxFeedBack;

    static UI:wxUI;

}



declare class WXJSConfig{
    static openTest:boolean;
    static forceDownload:boolean;
    static currentVersion:string;
    static gameArea:string;
    static zipPath:string;
    static appkey:string;
    static midasID:string;
    static midasKey:string;
    static sdb:number;
}