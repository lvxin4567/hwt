declare namespace lobby {
    class lobby_AgreementMgr {
        static __INS__: lobby_AgreementMgr;
        static getInstance(_zOrder?: number): lobby_AgreementMgr;
        __selfPanel: AgreementPanel;
        _zOrder: number;
        init(): boolean;
        getPanel(create?: boolean): AgreementPanel;
    }
    class AgreementPanel extends kaayou.ModelLayer {
        constructor();
        agreeScroll: ccui.ScrollView;
        btn_ok: ccui.Button;
        initUI(): void;
        show(): void;
        Hide(): void;
    }
}
