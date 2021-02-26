declare namespace tea {
    class ForbidCaptainPanelManager {
        static __INS__: ForbidCaptainPanelManager;
        static getInstance(): ForbidCaptainPanelManager;
        forbidCaptainPanel: tea.ForbidCaptainPanel;
        init(): boolean;
        removeDialogShow(data: any): void;
        DialogRemoved(): void;
    }
    class ForbidCaptainPanel extends kaayou.ModelLayer {
        constructor();
        btn_cancel: ccui.Button;
        btn_sure: ccui.Button;
        lbTip: ccui.TextField;
        rbCaptain: ccui.CheckBox;
        rbTeam: ccui.CheckBox;
        _data: any;
        initUI(): void;
        Show(data: any): void;
        Hide(): void;
    }
}
