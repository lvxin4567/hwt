declare namespace lobby {
    class lobbyMallBindIDPanelMgr {
        static __INS__: lobbyMallBindIDPanelMgr;
        static getInstance(_zOrder?: number): lobbyMallBindIDPanelMgr;
        _zOrder: number;
        __selfPanel: lobbyMallBindIDPanel;
        init(): boolean;
        getPanel(create?: boolean): lobbyMallBindIDPanel;
    }
    class lobbyMallBindIDPanel extends kaayou.ModelLayer {
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
