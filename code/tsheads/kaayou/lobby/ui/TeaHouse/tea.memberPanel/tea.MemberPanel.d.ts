declare namespace tea {
    class tea_MemberPanelMgr {
        static __INS__: tea_MemberPanelMgr;
        static getInstance(): tea_MemberPanelMgr;
        __selfPanel: MemberPanel;
        _data: tea.Data_HouseInfo;
        init(): boolean;
        getPanel(create?: boolean): MemberPanel;
    }
    class MemberPanel extends kaayou.ModelLayer {
        cbJoin: ccui.CheckBox;
        cbRefuse: ccui.CheckBox;
        label_member_count: ccui.Text;
        pnlPartner: ccui.Layout;
        partnerCk_Auth: ccui.CheckBox;
        cbExitTeahouse: ccui.CheckBox;
        lbNeedApprove: ccui.Text;
        lbPartnerCanApprove: ccui.Text;
        lbExitTeahouse: ccui.Text;
        layout_auth: ccui.Layout;
        layout_auth_1: ccui.Layout;
        partnerKick: ccui.CheckBox;
        lbPartnerKick: ccui.Text;
        constructor();
        topbarMgr: lobby.TopBarMgr;
        searchMgr: MemSearchWidget;
        initUI(): void;
        onAuthChange(e: kaayou.Event): void;
        onTeaHouseUpdateInfo(data: tea.Data_HouseInfo): void;
        showPageIndex: number;
        memMenuGroup: ccui.ScrollView;
        initLeftMenu(): void;
        svPartner: ccui.ScrollView;
        tea_cell_member_mode: ccui.Layout;
        tea_cell_apply_mode: ccui.Layout;
        tea_cell_stat_mode: ccui.Layout;
        initRightPages(): void;
        onUpdateMemberInfo(data: {
            totalnum: number;
            onlinenum: number;
            partnermemsnum: number;
            partnermemsonlinenum: number;
        }): void;
        mustLoad: boolean;
        Show(data: any): void;
        Hide(): void;
    }
}
