declare namespace kaayou {
    class GVoice {
        static bLoginOK: boolean;
        static roomId: string;
        static InitOK: boolean;
        Init(uid: number): void;
        EnterRoom(roomId: string): void;
        QuitRoom(roomId: string): void;
        OpenMic(): void;
        OpenSpeaker(): void;
        CloseMic(): void;
        CloseSpeaker(): void;
        ForbidMemberVoice(memId: number, bEnable: boolean, roomId: string): void;
        pause(): void;
        resume(): void;
        getInitStatus(): boolean;
        OnGvoiceInitOK(): void;
        OnGvoiceJoinRoomOK(memberID: number): void;
        OnGvoiceOpenMicOK(): void;
        OnGvoiceCloseMicOK(): void;
        OnGvoiceOpenSpeakerOK(): void;
        OnGvoiceCloseSpeakerOK(): void;
        OnMemberVoice(memberid: number, status: number): void;
    }
    class webGame {
        Login(url: string, isVer: boolean): void;
        onLegendToPay(productInfo: string): void;
    }
    class YunVa {
        static bLoginOK: boolean;
        micMember: Array<string>;
        _t: any;
        Init(): void;
        OnMicLoginOK(): void;
        IsLoginOK(): boolean;
        Login(uid: string, nickname: string, ext?: string): void;
        Logout(): void;
        BeginMic(): void;
        EndMic(): void;
        CancelMic(): void;
        PlayMic(uid: string, url: string): void;
        OnMicStart(): void;
        OnMicVolume(ext: string, volume: number): void;
        OnMicOk(url: string): void;
        OnMicStop(): void;
        OnMicPlayStart(uid: string): void;
        OnMicPlayEnd(uid: string): void;
    }
    class Wechat {
        static isUpdate: boolean;
        rewardedVideoAd: any;
        file: any;
        constructor();
        CreateLoginBtn(param: any): void;
        DestoryLoginBtn(): void;
        GetAccessToken(appid: any, platform?: number): Promise<any>;
        GetQuery(): any;
        Login(): void;
        pullWX(): void;
        Update(): void;
        OnWxLoginCancel(): void;
        OnWxInstalled(): void;
        lastWeChatCode: string;
        OnLogin(code: string, iv?: string, info?: string, rawdata?: string): void;
        OnShareWxResult(code: string, transaction: string): void;
        ShareText(title: string, text: string, transaction?: string): void;
        ShareTimeLineText(title: string, text: string, transaction?: string): void;
        ShareURL(title: string, text: string, url: string, transaction?: string): void;
        ShareTimeLineURL(title: string, text: string, url: string, transaction?: string): void;
        ShareImage(title: string, path: string, transaction?: string): void;
        ShareTimeLineImage(title: string, path: string, transaction?: string): void;
        createRewardedVideoAd(data: {
            adUnitId: string;
        }): void;
        playVideo(): void;
        ShowFeedback(title?: string): void;
    }
    class BaiduMap {
        pullCount: number;
        hasReturn: boolean;
        calling: boolean;
        GetMapInfo(): void;
        isValidAddr(longitude: number, latitude: number): boolean;
        jumpGPSSetting(msgcode: any): void;
        OnGaoDeMapInfo(data: any): void;
        OnMapInfo(data: any): void;
        traceMap(data: any): void;
    }
    class System {
        OnSoundResume(): void;
        addBatteryNotification(): void;
        removeBatteryNotification(): void;
        batteryInfo: {
            level: string;
            state: string;
        };
        OnSysBatteryInfoRsp(info: string): void;
        GetBatteryInfo(): {
            state: string;
            level: number;
        };
        ShowTransitionMask(): void;
        HideTransitionMask(): void;
        DownloadApk(url: string): void;
        InstallApk(path: string): void;
        OnDownloadApk(code: string, extend: string): void;
        GetLocalVersionCode(): string;
        GetLocalVersionName(): string;
        GetLocalAppConfig(): any;
        OpenUrl(url: string): void;
        OpenCallPhone(telNum: string): void;
        Log(tag: string, msg: string): void;
        Dialog(text: string): void;
        OnDialogRes(res: string): void;
        Toast(text: string): void;
        Exit(type: string): void;
        GetFileLength(url: string): Promise<unknown>;
        GetNetInfo(): {
            type: string;
            level: number;
        };
        GetDeviceKey(): string;
        getPhoneBrand(): any;
        Vibrate(time?: number): any;
        copyStringToPasteBoard(text: string): string;
        GetMediaStatus(): boolean;
        jumpAppSetting(): void;
        jumpWeChatImmediacy(): void;
        checkAllowJSInterface(method: string): boolean;
        PostBugly(val0: string, val1?: string, val2?: string): void;
    }
    class Pay {
        AliPay(orderString: string): void;
        ApplePay(productID: string, orderID: string, token: string): void;
        WeCahtPay(payData: any): void;
        payBaseInfo(url: string, token: string, appid: string): void;
        OnPayRes(code: string, msg: string): void;
    }
    class DDShare {
        DDShareURL(title: string, text: string, url: string, transaction?: string): void;
        DDShareImage(title: string, path: string, transaction?: string): void;
        DDShareText(title: string, text: string, transaction?: string): void;
        OnDdShareRes(code: string, msg: string): void;
    }
    class MagicWindow {
        getMagicWindowInfo(): string;
        OnMagicWindowCallPull(): void;
        tellClientToClear(): void;
        OnMagicWindowRsp(msg1: string): void;
    }
    class XL {
        XLShareText(title: string, text: string, transaction?: string): void;
        XLShareImage(title: string, path: string, transaction?: string): void;
        XLShareURL(title: string, text: string, url: string, transaction?: string): void;
    }
    class XX {
        XXShareURL(title: string, text: string, url: string, transaction?: string): void;
        XXShareImage(title: string, path: string, transaction?: string): void;
    }
    class WechatConfig {
        GetConfig(): any;
    }
    class AD {
        Create(id: string): void;
        Play(): void;
        OnLoad(): void;
        OnError(err: any): void;
        OnClose(res: any): void;
    }
    class Feedback {
        Create(param: any): void;
        Show(): void;
        Hide(): void;
        Destroy(): void;
    }
    export class PlatformMgr {
        static __Ins__: PlatformMgr;
        static getInstance(): PlatformMgr;
        gvoice: GVoice;
        map: BaiduMap;
        wx: Wechat;
        im: YunVa;
        sys: System;
        pay: Pay;
        dd: DDShare;
        mw: MagicWindow;
        xl: XL;
        xx: XX;
        webGame: webGame;
        wxCfg: WechatConfig;
        ad: AD;
        fb: Feedback;
        constructor();
        BindWindowMethod(): void;
        BindWechatHook(): void;
    }
    export {};
}
