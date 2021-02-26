declare namespace lobby {
    class lobbyBottomBindIDPanelMgr {
        static __INS__: lobbyBottomBindIDPanelMgr;
        static getInstance(_zOrder?: number): lobbyBottomBindIDPanelMgr;
        _zOrder: number;
        __selfPanel: lobbyBottomBindIDPanel;
        init(): boolean;
        getPanel(create?: boolean): lobbyBottomBindIDPanel;
    }
    class lobbyBottomBindIDPanel extends kaayou.ModelLayer {
        constructor();
        btnClose: ccui.Button;
        btnInvite: ccui.Button;
        ebInput: any;
        pnlInput: ccui.Layout;
        targetUserID: string;
        initUI(): void;
        Show(): void;
        Hide(): void;
    }
}
