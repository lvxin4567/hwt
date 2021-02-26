declare namespace tea {
    class tea_SendInvitePanelMgr {
        static __INS__: tea_SendInvitePanelMgr;
        static getInstance(_zOrder?: number): tea_SendInvitePanelMgr;
        _zOrder: number;
        __selfPanel: SendInvitePanel;
        memberremovePanel: tea.SendInvitePanel;
        init(): boolean;
        getPanel(create?: boolean): SendInvitePanel;
        removeDialogShow(data: any): void;
        DialogRemoved(): void;
    }
    class SendInvitePanel extends kaayou.ModelLayer {
        constructor();
        btnClose: ccui.Button;
        btn_Search: ccui.Button;
        ebInput: any;
        pnlInput: ccui.Layout;
        targetUserID: string;
        memberInfoLayout: ccui.Layout;
        btn_invite: ccui.Button;
        head_img: ccui.ImageView;
        initUI(): void;
        showSearchInfo(data: proto_searchuser_res): void;
        Show(data: any): void;
        Hide(): void;
    }
}
