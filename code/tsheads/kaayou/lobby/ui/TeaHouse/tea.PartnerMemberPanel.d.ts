declare namespace tea {
    class tea_PartnerMemberPanelMgr {
        static __INS__: tea_PartnerMemberPanelMgr;
        static getInstance(): tea_PartnerMemberPanelMgr;
        __selfPanel: PartnerMemberPanel;
        init(): boolean;
        getPanel(create?: boolean): PartnerMemberPanel;
    }
    class PartnerMemberPanel extends kaayou.ModelLayer {
        _partnerId: number;
        bClearLeft: boolean;
        bClearRight: boolean;
        btnLeftSearch: ccui.Button;
        btnRightSearch: ccui.Button;
        btnPartnerPanelClose: ccui.Button;
        btnOK: ccui.Button;
        ebLeftSearch: any;
        ebRightSearch: any;
        iCount: number;
        lbCount: ccui.Text;
        lbLeftPlaceholder: ccui.Text;
        lbPartner: ccui.Text;
        lbRightPlaceholder: ccui.Text;
        lstChange: any[];
        lstLeft: any[];
        lstRight: any[];
        mskInput: ccui.Layout;
        ndLeftSearch: cc.Layer;
        ndRightSearch: cc.Layer;
        prfPartnerMemberRow: ccui.Layout;
        sSearchLeft: string;
        sSearchRight: string;
        svLeft: common.PullList;
        svRight: common.PullList;
        constructor();
        initUI(): void;
        private confirm;
        private changeList;
        private createPartnerMemberRow;
        doGetPartnerMemberList(clear?: boolean): void;
        getLeft(clear: any): void;
        getRight(clear: any): void;
        onUpdatePartnerMember(data: {
            list: any;
            update: boolean;
            is_bind: boolean;
            totalnum: number;
        }): void;
        refreshView(): void;
        Show(data: any): void;
        splitView(view: common.PullList, data: any, key: string): void;
        Hide(): void;
    }
}
