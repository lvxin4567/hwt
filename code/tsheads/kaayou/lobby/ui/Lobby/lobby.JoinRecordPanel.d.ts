declare namespace lobby {
    class JoinRecordPanelMgr {
        static __INS__: JoinRecordPanelMgr;
        static getInstance(_zOrder?: number): JoinRecordPanelMgr;
        _zOrder: number;
        __selfPanel: JoinRecordPanel;
        init(): boolean;
        getPanel(create?: boolean): JoinRecordPanel;
    }
    class JoinRecordPanel extends kaayou.ModelLayer {
        lable_Nums: Array<ccui.TextBMFont>;
        _curNums: string;
        constructor();
        btn_close: ccui.Button;
        initUI(): void;
        onResetClick(e: kaayou.TouchEvent): void;
        onDeleteClick(e: kaayou.TouchEvent): void;
        onEnterClick(): void;
        onNumsClick(e: kaayou.TouchEvent): void;
        addNums(nums: number): void;
        subNums(): void;
        doNumShow(): void;
        bindEvent(): void;
        Show(): void;
        Hide(): void;
    }
}
