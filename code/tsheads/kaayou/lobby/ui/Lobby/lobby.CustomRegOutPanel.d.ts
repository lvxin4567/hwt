declare namespace lobby {
    class CustomRegOutPanelMgr {
        static __INS__: CustomRegOutPanelMgr;
        static getInstance(_zOrder?: number): CustomRegOutPanelMgr;
        _zOrder: number;
        __selfPanel: CustomRegOutPanel;
        init(): boolean;
        getPanel(create?: boolean): CustomRegOutPanel;
    }
    class CustomRegOutPanel extends kaayou.ModelLayer {
        constructor();
        lb_wx: ccui.Text;
        initUI(): void;
        initInfo(): void;
        Show(): void;
        Hide(): void;
    }
}
