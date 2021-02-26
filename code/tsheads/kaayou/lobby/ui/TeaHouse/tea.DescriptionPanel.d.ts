declare namespace tea {
    class TeaDescriptionPanelMgr {
        static __INS__: TeaDescriptionPanelMgr;
        static getInstance(_zOrder?: number): TeaDescriptionPanelMgr;
        _zOrder: number;
        __selfPanel: tea.DescriptionPanel;
        memberremovePanel: tea.DescriptionPanel;
        init(): boolean;
        getPanel(create?: boolean): DescriptionPanel;
    }
    class DescriptionPanel extends kaayou.ModelLayer {
        constructor();
        btnClose: ccui.Button;
        initUI(): void;
        Show(): void;
        Hide(): void;
    }
}
