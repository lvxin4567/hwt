declare namespace lobby {
    class NumberInputPanelMgr {
        static __INS__: NumberInputPanelMgr;
        static getInstance(_zOrder?: number): NumberInputPanelMgr;
        __selfPanel: NumberInputPanel;
        _gold: number;
        _zOrder: number;
        onUpdateUserInfo(data: Data_Uerinfo): void;
        init(): boolean;
        getPanel(create?: boolean): NumberInputPanel;
    }
    class NumberInputPanel extends kaayou.ModelLayer {
        btnAdd: ccui.Button;
        btnMinus: ccui.Button;
        btnDot: ccui.Button;
        lbResult: ccui.TextBMFont;
        lable_Nums: Array<ccui.TextBMFont>;
        mask: ccui.Layout;
        _curNums: string;
        constructor();
        checkPrecision(): boolean;
        initUI(): void;
        resetLabel(): void;
        onResetClick(e: kaayou.TouchEvent): void;
        onDeleteClick(e: kaayou.TouchEvent): void;
        onNumsClick(e: kaayou.TouchEvent): void;
        addNums(nums: number): void;
        subNums(): void;
        doNumShow(): void;
        bindEvent(): void;
        Show(data: {
            defualtNum: number;
            op?: any;
        }): void;
        Hide(): void;
    }
}
