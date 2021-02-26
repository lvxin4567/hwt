declare namespace tea {
    class tea_PartnerMemberPopMgr {
        static __INS__: tea_PartnerMemberPopMgr;
        static getInstance(_zOrder?: number): tea_PartnerMemberPopMgr;
        __selfPanel: PartnerMemberPopPanel;
        _zOrder: number;
        init(): boolean;
        getPanel(create?: boolean): PartnerMemberPopPanel;
    }
    class PartnerMemberPopPanel extends kaayou.ModelLayer {
        _data: any;
        btnPartnerPanelClose: ccui.Button;
        prfPartnerMemberRow: ccui.Layout;
        svPartnerMember: common.PullList;
        constructor();
        initUI(): void;
        doGetPartnerMemberList(clear?: boolean): void;
        onUpdatePartnerMember(data: {
            list: Data_HouseMemberItem;
            update: boolean;
            totalInfo: Data_HousePartnerTotalInfo;
        }): void;
        reset(): void;
        Show(data: any): void;
        Hide(): void;
    }
}
