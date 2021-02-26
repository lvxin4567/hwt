declare namespace tea {
    class tea_TeaFcmDecPopMgr {
        static __INS__: tea_TeaFcmDecPopMgr;
        static getInstance(_zOrder?: number): tea_TeaFcmDecPopMgr;
        __selfPanel: FcmDecPopPanel;
        _zOrder: number;
        init(): boolean;
        getPanel(create?: boolean): FcmDecPopPanel;
    }
    class FcmDecPopPanel extends kaayou.ModelLayer {
        constructor();
        btn_close: ccui.Button;
        btn_record: ccui.Button;
        initUI(): void;
        Show(): void;
        Hide(): void;
    }
}
