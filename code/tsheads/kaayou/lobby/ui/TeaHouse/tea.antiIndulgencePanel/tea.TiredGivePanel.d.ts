declare namespace tea {
    class tea_TiredGivePanelMgr {
        static __INS__: tea_TiredGivePanelMgr;
        static getInstance(_zOrder?: number): tea_TiredGivePanelMgr;
        __selfPanel: tea_TiredGivePanel;
        _zOrder: number;
        init(): boolean;
        getPanel(create?: boolean): tea_TiredGivePanel;
    }
    class tea_TiredGivePanel extends kaayou.ModelLayer {
        constructor();
        btn_close: ccui.Button;
        btnSave: ccui.Button;
        ebInput: any;
        editIndex: number;
        iUserID: number;
        iQuantity: number;
        lbQuantity: ccui.Text;
        ndInput: ccui.Layout;
        initUI(): void;
        Show(data: {
            uid: number;
        }): void;
        ShowData(): void;
        Hide(): void;
        ShowNumber(data: any): void;
        ReturnToMiddle(): void;
    }
}
