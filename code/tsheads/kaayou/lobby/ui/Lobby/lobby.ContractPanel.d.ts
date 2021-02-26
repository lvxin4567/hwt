declare namespace lobby {
    class ContractPanelMgr {
        static __INS__: ContractPanelMgr;
        static getInstance(_zOrder?: number): ContractPanelMgr;
        _zOrder: number;
        __selfPanel: ContractPanel;
        init(): boolean;
        getPanel(create?: boolean): ContractPanel;
    }
    class ContractPanel extends kaayou.ModelLayer {
        constructor();
        isTouchMaskHide: boolean;
        initUI(): void;
        Show(): void;
        Hide(): void;
    }
}
