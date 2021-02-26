declare namespace tea {
    class tea_SetFloorVipMemPanelMgr {
        static __INS__: tea_SetFloorVipMemPanelMgr;
        static getInstance(_z: any): tea_SetFloorVipMemPanelMgr;
        __selfPanel: SetFloorVIpMemPanel;
        _zorder: number;
        init(): boolean;
        getPanel(create?: boolean): SetFloorVIpMemPanel;
    }
    class SetFloorVIpMemPanel extends kaayou.ModelLayer {
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
        label_floorIndex: ccui.Text;
        lbRightPlaceholder: ccui.Text;
        lstLeft: any[];
        lstRight: any[];
        mskInput: ccui.Layout;
        ndLeftSearch: cc.Layer;
        ndRightSearch: cc.Layer;
        prfSetVipFloorMemRow: ccui.Layout;
        sSearchLeft: string;
        sSearchRight: string;
        svLeft: common.PullList;
        svRight: common.PullList;
        btnAddAll: ccui.Button;
        btnRemoveAll: ccui.Button;
        constructor();
        initUI(): void;
        private confirm;
        updateAllList(): void;
        updateLeftAndrightNtf(data: any): void;
        doGetPartnerMemberList(clear?: boolean): void;
        getLeft(clear: any): void;
        getRight(clear: any): void;
        onUpdatePartnerMember(data: {
            list: any;
            update: boolean;
            is_vip: boolean;
            totalnum: number;
        }): void;
        refreshView(): void;
        floorFid: number;
        Show(data: any): void;
        splitView(view: common.PullList, data: any, key: string): void;
        Hide(): void;
    }
}
