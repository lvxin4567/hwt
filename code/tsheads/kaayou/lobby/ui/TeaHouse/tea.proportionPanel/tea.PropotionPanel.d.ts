declare namespace tea {
    class tea_PropotionPanelMgr {
        static __INS__: tea_PropotionPanelMgr;
        static getInstance(): tea_PropotionPanelMgr;
        __selfPanel: PropotionPanel;
        _data: tea.Data_HouseInfo;
        init(): boolean;
        getPanel(create?: boolean): PropotionPanel;
    }
    class PropotionPanel extends kaayou.ModelLayer {
        label_member_count: ccui.Text;
        pnlPartner: ccui.Layout;
        tea_call_partner_mode: ccui.Layout;
        lbNeedApprove: ccui.Text;
        lbPartnerCanApprove: ccui.Text;
        memPlay_count_label: ccui.Text;
        constructor();
        topbarMgr: lobby.TopBarMgr;
        searchMgr: MemSearchWidget;
        authPropotion(): void;
        initUI(): void;
        private isCreator;
        private isAdmin;
        private isPartener;
        private isVitaAdmin;
        onTeaHouseUpdateInfo(data: tea.Data_HouseInfo): void;
        showPageIndex: number;
        memMenuGroup: ccui.ScrollView;
        initLeftMenu(): void;
        svPartner: ccui.ScrollView;
        tea_call_partner_base: ccui.Layout;
        tea_call_partner_income: ccui.Layout;
        tea_call_partner_config: ccui.Layout;
        tea_cell_partner_NoUnion: ccui.Layout;
        ThFcm_partnerCunt_cell: ccui.Layout;
        rowMyConfig: ccui.Layout;
        initRightPages(): void;
        private reset;
        Show(): void;
        Hide(): void;
    }
}
