/**
 *
 * 手机登陆面板
 */
declare namespace lobby {
    class lobby_PhoneLoginMgr {
        static __INS__: lobby_PhoneLoginMgr;
        static getInstance(): lobby_PhoneLoginMgr;
        __selfPanel: PhoneLoginPanel;
        init(): boolean;
        getPanel(create?: boolean): PhoneLoginPanel;
    }
    class PhoneLoginPanel extends kaayou.Layer {
        maskBg: cc.Layer;
        contentPanel: ccui.Layout;
        btn_close: ccui.Button;
        titleLabel: ccui.Text;
        edx_tel: ccui.TextField;
        edit_tel: any;
        edx_pass: ccui.TextField;
        edit_pass: any;
        btn_register: ccui.Layout;
        btn_find: ccui.Layout;
        btn_login: ccui.Button;
        btn_sendCheck: ccui.Button;
        timeDaoji: ccui.Text;
        constructor();
        initUI(): void;
        BtnRegist(): boolean;
        codeText: string;
        phoneText: string;
        BtnGetVerification(): void;
        time: number;
        timeline(): void;
        resetAuto(fir?: boolean): void;
        doCheckLogin(): boolean;
        doCandoLogin(): void;
        Show(): void;
        Hide(): void;
    }
}
