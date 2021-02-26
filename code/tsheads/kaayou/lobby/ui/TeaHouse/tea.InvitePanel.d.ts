declare namespace tea {
    class tea_InviteMgr {
        static __INS__: tea_InviteMgr;
        static getInstance(_zOrder?: number): tea_InviteMgr;
        _zOrder: number;
        __selfPanel: InvitePanel;
        memberremovePanel: tea.InvitePanel;
        init(): boolean;
        getPanel(create?: boolean): InvitePanel;
        removeDialogShow(data: any): void;
        DialogRemoved(): void;
    }
    class InvitePanel extends kaayou.ModelLayer {
        constructor();
        bNoMore: boolean;
        btnClose: ccui.Button;
        btnJoin: ccui.Button;
        btnRefuse: ccui.Button;
        cbNoMore: ccui.CheckBox;
        fid: number;
        houseId: number;
        inviter: number;
        ivHead: ccui.ImageView;
        lbHouseId: ccui.Text;
        lbInviter: ccui.Text;
        lbRule: ccui.Text;
        lbTable: ccui.Text;
        ntid: number;
        tableId: number;
        initUI(): void;
        Show(data: any): void;
        Hide(): void;
    }
}
