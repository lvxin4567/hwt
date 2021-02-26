declare namespace tea {
    class tea_PartnerMemberRecordPanelMgr {
        static __INS__: tea_PartnerMemberRecordPanelMgr;
        static getInstance(): tea_PartnerMemberRecordPanelMgr;
        __selfPanel: PartnerMemberRecordPanel;
        init(): boolean;
        getPanel(create?: boolean): PartnerMemberRecordPanel;
    }
    class PartnerMemberRecordPanel extends kaayou.ModelLayer {
        _data: any;
        btnPartnerPanelClose: ccui.Button;
        prfPartnerMemberRow: ccui.Layout;
        svPartnerMember: common.PullList;
        constructor();
        initUI(): void;
        private createPartnerMemberRow;
        doGetPartnerMemberList(clear?: boolean): void;
        onUpdatePartnerMember(data: {
            list: Data_HouseMemberItem;
            update: boolean;
        }): void;
        reset(): void;
        Show(data: any): void;
        Hide(): void;
    }
}
