declare namespace lobby {
    class lobby_PolicyMgr {
        static __INS__: lobby_PolicyMgr;
        static getInstance(_zOrder?: number): lobby_PolicyMgr;
        __selfPanel: PolicyPanel;
        _zOrder: number;
        init(): boolean;
        getPanel(create?: boolean): PolicyPanel;
    }
    class PolicyPanel extends kaayou.ModelLayer {
        constructor();
        viewScroll: ccui.ScrollView;
        btn_ok: ccui.Button;
        initUI(): void;
        show(): void;
        Hide(): void;
    }
}
