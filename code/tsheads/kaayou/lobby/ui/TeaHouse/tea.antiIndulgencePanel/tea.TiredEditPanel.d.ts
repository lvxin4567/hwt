declare namespace tea {
    class tea_TiredEditPanelMgr {
        static __INS__: tea_TiredEditPanelMgr;
        static getInstance(_zOrder?: number): tea_TiredEditPanelMgr;
        __selfPanel: tea_TiredEditPanel;
        _zOrder: number;
        init(): boolean;
        getPanel(create?: boolean): tea_TiredEditPanel;
    }
    class tea_TiredEditPanel extends kaayou.ModelLayer {
        constructor();
        _data: any;
        btnModifyClose: ccui.Button;
        btnSave: ccui.Button;
        editIndex: number;
        iChange: number;
        lbModifyPanelTiredValue: ccui.Text;
        lbChange: ccui.Text;
        initUI(): void;
        Show(data: any): void;
        ShowData(): void;
        Hide(): void;
        ShowNumber(data: any): void;
        ReturnToMiddle(): void;
    }
}
