declare namespace lobby {
    class LoginScene extends kaayou.kScene {
        btnCheck: ccui.Button;
        btnPhone: ccui.Button;
        btnRepair: ccui.Button;
        btnSwitchLine: ccui.Button;
        btnTokenLogin: ccui.Button;
        saBln: sp.SkeletonAnimation;
        btn_Guest: ccui.Button;
        btn_Wechat: ccui.Button;
        lbVersion: ccui.Text;
        btns_Layout: ccui.Layout;
        cbAgree: ccui.CheckBox;
        btn_agreement: ccui.ImageView;
        btn_policy: ccui.ImageView;
        btn_Cs: ccui.Button;
        btn_close: ccui.Button;
        btn_copy: ccui.Button;
        cs_panel: ccui.Layout;
        ebCode: ccui.TextField;
        ebToken: ccui.TextField;
        ebUserID: ccui.TextField;
        layout_debugger_content: ccui.Layout;
        layout_debugger_left: ccui.Layout;
        layout_debugger_right: ccui.Layout;
        layout_debugger_top: ccui.Layout;
        edt_debugger_ip: ccui.TextField;
        edt_login_ip: ccui.TextField;
        btn_debugger_ok: ccui.Button;
        btn_debugger_cancel: ccui.Button;
        btn_debugger_recache: ccui.Button;
        btn_debugger_line_online_addr: ccui.Button;
        btn_debugger_line_online_ip: ccui.Button;
        btn_debugger_line_clear: ccui.Button;
        btn_debugger_line_dev: ccui.Button;
        btn_debugger_line_test: ccui.Button;
        btn_debugger_line_test2: ccui.Button;
        btn_debugger_line_test3: ccui.Button;
        btn_debugger_line_image: ccui.Button;
        __debuggerClickCount: number;
        __debuggerClickTime: any;
        __debuggerClickIsLeft: boolean;
        constructor();
        bindEvent(): void;
        cleanUI(): void;
        deleteAllResources(): void;
        firstIn: boolean;
        onReEnter(): void;
        showSwitchButton(): void;
        isFirstIn(): boolean;
        onAgreement(data: any): void;
        onConfigUpdate(data: Ka_APP_CONFIG): number;
    }
}