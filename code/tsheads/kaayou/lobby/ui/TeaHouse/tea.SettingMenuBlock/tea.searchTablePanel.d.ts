declare namespace tea {
    class tea_SearchTablePanelMgr {
        static __INS__: tea_SearchTablePanelMgr;
        static getInstance(): tea_SearchTablePanelMgr;
        __selfPanel: SearchTablePanel;
        init(): boolean;
        getPanel(create?: boolean): SearchTablePanel;
    }
    class SearchTablePanel extends kaayou.ModelLayer {
        constructor();
        btnClose: ccui.Button;
        btn_Search: ccui.Button;
        ebInput: any;
        pnlInput: ccui.Layout;
        targetUserID: string;
        initUI(): void;
        clearInput(): void;
        Show(): void;
        Hide(): void;
    }
}
