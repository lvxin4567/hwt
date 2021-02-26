declare namespace tea {
    class tea_TiredMinSettingPanelMgr {
        static __INS__: tea_TiredMinSettingPanelMgr;
        static getInstance(_zOrder?: number): tea_TiredMinSettingPanelMgr;
        __selfPanel: tea_TiredMinSettingPanel;
        _zOrder: number;
        init(): boolean;
        getPanel(create?: boolean): tea_TiredMinSettingPanel;
    }
    class tea_TiredMinSettingPanel extends kaayou.ModelLayer {
        constructor();
        btn_close: ccui.Button;
        btnSave: ccui.Button;
        ebInput: any;
        editIndex: number;
        iTable: number;
        iPause: number;
        lbTable: ccui.Text;
        lbPause: ccui.Text;
        initUI(): void;
        Show(): void;
        ShowData(): void;
        Hide(): void;
        ShowNumber(data: any): void;
        ReturnToMiddle(): void;
    }
}
