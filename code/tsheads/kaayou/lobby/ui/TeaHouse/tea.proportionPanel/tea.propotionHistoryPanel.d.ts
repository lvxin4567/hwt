declare namespace tea {
    class tea_PropotionHistoryPanelMgr {
        static __INS__: tea_PropotionHistoryPanelMgr;
        static getInstance(_zOrder?: number): tea_PropotionHistoryPanelMgr;
        _zOrder: number;
        __selfDialog: PropotionHistoryPanel;
        __selfNode: any;
        init(): boolean;
        setNode(node: cc.Node): void;
        getPanel(create?: boolean): PropotionHistoryPanel;
    }
    class PropotionHistoryPanel {
        private _page;
        private btn_close;
        private titleFont;
        private table_head;
        private history_record;
        cellMod: ccui.Layout;
        SV_pullList: ccui.ScrollView;
        headLayout: ccui.Layout;
        initWithNode(pagePartner: ccui.Layout): void;
        private createCell;
        isPartner(): boolean;
        isOwner(): boolean;
        isVitaAdmin(): boolean;
        Show(data: any): void;
        Hide(): void;
    }
}
