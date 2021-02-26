declare namespace common {
    class VerifyPhone extends kaayou.Layer {
        callback: Function;
        maskBg: cc.Layer;
        contentPanel: ccui.Layout;
        btn_close: ccui.Button;
        titleLabel: ccui.Text;
        edx_tel: ccui.TextField;
        lbTel: ccui.Text;
        edx_pass: ccui.TextField;
        pass_Label: ccui.Text;
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
        Show(data: any): void;
        cleanEditBoxString(ref: ccui.TextField): void;
        Hide(): void;
    }
}
