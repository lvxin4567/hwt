declare namespace tea {
    class tea_FcmBatchPanelMgr {
        static __INS__: tea_FcmBatchPanelMgr;
        static getInstance(_zOrder?: number): tea_FcmBatchPanelMgr;
        __selfPanel: FcmBatchPanel;
        _zOrder: number;
        init(): boolean;
        getPanel(create?: boolean): FcmBatchPanel;
    }
    class FcmBatchPanel extends kaayou.ModelLayer {
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
        sortType: number;
        sSearchLeft: string;
        sSearchRight: string;
        svLeft: common.PullList;
        svRight: common.PullList;
        constructor();
        initUI(): void;
        private confirm;
        private changeList;
        private createPartnerMemberRow;
        doGetMemList(clear?: boolean, sorttype?: number): void;
        getLeft(clear: any): void;
        getRight(clear: any): void;
        onUpdateMember(data: {
            list: any;
            update: boolean;
        }): void;
        refreshView(): void;
        Show(data: any): void;
        splitView(view: common.PullList, data: any, key: string): void;
        Hide(): void;
    }
}
