declare namespace tea {
    class tea_pertnerDelatedFloorDetailMgr {
        static __INS__: tea_pertnerDelatedFloorDetailMgr;
        static getInstance(_zOrder?: number): tea_pertnerDelatedFloorDetailMgr;
        __selfPanel: DeletedFloorDetailPanel;
        _zOrder: number;
        init(): boolean;
        getPanel(create?: boolean): DeletedFloorDetailPanel;
    }
    class DeletedFloorDetailPanel extends kaayou.ModelLayer {
        _data: any;
        btnPartnerPanelClose: ccui.Button;
        memDetailPopRow: ccui.Layout;
        svPartnerMember: common.PullList;
        dfid: number;
        fid: number;
        constructor();
        initUI(): void;
        doGetPartnerMemberList(clear?: boolean): void;
        reset(): void;
        Show(data: any): void;
        Hide(): void;
    }
}
