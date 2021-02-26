declare namespace tea {
    class tea_ReceiveInvitePanelMgr {
        static __INS__: tea_ReceiveInvitePanelMgr;
        static getInstance(_zOrder?: number): tea_ReceiveInvitePanelMgr;
        _zOrder: number;
        __selfPanel: ReceiveInvitePanel;
        memberremovePanel: tea.ReceiveInvitePanel;
        init(): boolean;
        getPanel(create?: boolean): ReceiveInvitePanel;
        removeDialogShow(data: any): void;
        DialogRemoved(): void;
    }
    class ReceiveInvitePanel extends kaayou.ModelLayer {
        constructor();
        bNoMore: boolean;
        btnClose: ccui.Button;
        btnJoin: ccui.Button;
        btnRefuse: ccui.Button;
        cbNoMore: ccui.CheckBox;
        houseId: number;
        inviter: number;
        ivHead: ccui.ImageView;
        lbHouseId: ccui.Text;
        lbInviter: ccui.Text;
        initUI(): void;
        Show(data: any): void;
        Hide(): void;
    }
}
