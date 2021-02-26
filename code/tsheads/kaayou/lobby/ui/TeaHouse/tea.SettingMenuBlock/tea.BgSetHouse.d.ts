declare namespace tea {
    class tea_TeaBgSetMgr {
        static __INS__: tea_TeaBgSetMgr;
        static getInstance(_zOrder?: number): tea_TeaBgSetMgr;
        __selfPanel: TeaBgSetPanel;
        _zOrder: number;
        init(): boolean;
        getPanel(create?: boolean): TeaBgSetPanel;
    }
    class TeaBgSetPanel extends kaayou.ModelLayer {
        constructor();
        btn_close: ccui.Button;
        teaBg_layout: ccui.Layout;
        bgInfo: any;
        btn_submit: ccui.Button;
        initUI(): void;
        onTeaBgset(e: kaayou.TouchEvent): void;
        Show(): void;
        setUI(): void;
        setTeaBgSelect(index: number): void;
        Hide(): void;
    }
}
