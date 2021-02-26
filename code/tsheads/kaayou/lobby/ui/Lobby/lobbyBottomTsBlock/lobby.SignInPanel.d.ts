/**
 *
 * 金币场签到
 */
declare namespace lobby {
    class lobby_SignInMgr {
        static __INS__: lobby_SignInMgr;
        static getInstance(_zOrder?: number): lobby_SignInMgr;
        __selfPanel: SignInPanel;
        _zOrder: number;
        init(): boolean;
        getPanel(create?: boolean): SignInPanel;
    }
    class SignInPanel extends kaayou.Layer {
        bShow: boolean;
        fntSignIn: ccui.TextBMFont;
        maskBg: cc.Layer;
        btn_close: ccui.Button;
        btn_Draw: ccui.Button;
        signLayout: ccui.Layout;
        constructor();
        initUI(): void;
        _data: proto_task_checkin_ntf_res;
        show(data: proto_task_checkin_ntf_res): void;
        showRedPoint(data: proto_task_checkin_ntf_res): void;
        setSignUI(data: proto_task_checkin_ntf_res): void;
        onHide(): void;
        onCancel(): void;
    }
}
