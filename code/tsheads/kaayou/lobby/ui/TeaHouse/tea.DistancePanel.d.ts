declare namespace tea {
    class tea_DistancePanelMgr {
        static __INS__: tea_DistancePanelMgr;
        static getInstance(_zOrder?: number): tea_DistancePanelMgr;
        __selfPanel: tea_DistancePanel;
        _zOrder: number;
        init(): boolean;
        getPanel(create?: boolean): tea_DistancePanel;
    }
    class tea_DistancePanel extends kaayou.ModelLayer {
        constructor();
        btn_close: ccui.Button;
        btnAdd: ccui.Button;
        btnSub: ccui.Button;
        btnSave: ccui.Button;
        ebInput: any;
        iDistance: number;
        lbScore: ccui.Text;
        initUI(): void;
        ShowNumber(data: any): void;
        ReturnToMiddle(): void;
        Show(data: any): void;
        Hide(): void;
    }
}
