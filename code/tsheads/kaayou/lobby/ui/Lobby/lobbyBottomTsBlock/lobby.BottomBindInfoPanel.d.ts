declare namespace lobby {
    class lobby_BindInfoMgr {
        static __INS__: lobby_BindInfoMgr;
        static getInstance(_zOrder?: number): lobby_BindInfoMgr;
        _zOrder: number;
        __selfPanel: BindInvitePanel;
        init(): boolean;
        getPanel(create?: boolean): BindInvitePanel;
    }
    class BindInvitePanel extends kaayou.ModelLayer {
        constructor();
        bNoMore: boolean;
        btnClose: ccui.Button;
        btnJoin: ccui.Button;
        btnRefuse: ccui.Button;
        houseId: number;
        inviter: number;
        ivHead: ccui.ImageView;
        lbHouseId: ccui.Text;
        lbInviter: ccui.Text;
        lbTable: ccui.Text;
        tableId: number;
        inviteUId: ccui.Text;
        initUI(): void;
        Show(data: any): void;
        Hide(): void;
    }
}
