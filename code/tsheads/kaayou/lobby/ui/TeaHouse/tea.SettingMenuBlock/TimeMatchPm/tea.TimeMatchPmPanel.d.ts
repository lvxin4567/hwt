declare namespace tea {
    class tea_TimeMatchPmMgr {
        static __INS__: tea_TimeMatchPmMgr;
        static getInstance(zOrder: any): tea_TimeMatchPmMgr;
        _zOrder: number;
        __selfPanel: TimeMatchPmPanel;
        _data: tea.Data_HouseInfo;
        init(): boolean;
        getPanel(create?: boolean): TimeMatchPmPanel;
    }
    class TimeMatchPmPanel extends kaayou.ModelLayer {
        label_member_count: ccui.Text;
        pnlPartner: ccui.Layout;
        tea_call_partner_mode: ccui.Layout;
        lbNeedApprove: ccui.Text;
        lbPartnerCanApprove: ccui.Text;
        memPlay_count_label: ccui.Text;
        constructor();
        topbarMgr: lobby.TopBarMgr;
        searchMgr: MemSearchWidget;
        initUI(): void;
        private isCreator;
        private isAdmin;
        private isPartener;
        private isVitaAdmin;
        onTeaHouseUpdateInfo(data: tea.Data_HouseInfo): void;
        showPageIndex: number;
        pmMenuGroup: ccui.ScrollView;
        initLeftMenu(): void;
        pmMtach_item: ccui.Layout;
        initRightPages(): void;
        private reset;
        Show(): void;
        Hide(): void;
    }
}
