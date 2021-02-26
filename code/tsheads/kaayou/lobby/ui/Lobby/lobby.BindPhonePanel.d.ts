/**
 *
 * 绑定手机面板
 */
declare namespace lobby {
    class BindPhonePanelMgr {
        static __INS__: BindPhonePanelMgr;
        static getInstance(_zOrder?: number): BindPhonePanelMgr;
        __selfPanel: BindPhonePanel;
        _zOrder: number;
        init(): boolean;
        getPanel(create?: boolean): BindPhonePanel;
    }
    class BindPhonePanel extends kaayou.Layer {
        btnClose: ccui.Button;
        contentPanel: ccui.Layout;
        ebTel: any;
        ebVerify: any;
        lbTelErr: ccui.Text;
        lbVerifyErr: ccui.Text;
        maskBg: cc.Layer;
        pnlTel: cc.Layer;
        pnlVerify: cc.Layer;
        titleLabel: ccui.Text;
        edx_tel_label: ccui.Text;
        btn_get_verification: ccui.Button;
        chg_time_Lable: ccui.Text;
        btn_bind: ccui.Button;
        edx_verification_label: ccui.Text;
        btn_unBind: ccui.Button;
        bind_panel: ccui.Layout;
        unbind_panel: ccui.Layout;
        isBind: boolean;
        constructor();
        initUI(): void;
        private _delayt;
        private _lasttime;
        update(dt: any): void;
        doCheckChanger(): boolean;
        doCandoRegister(): void;
        Show(sDATA: {
            bind: boolean;
        }): void;
        changePanelShow(data: {
            bind: boolean;
        }): void;
        cleanEditBoxString(ref: ccui.TextField): void;
        Hide(): void;
    }
}
