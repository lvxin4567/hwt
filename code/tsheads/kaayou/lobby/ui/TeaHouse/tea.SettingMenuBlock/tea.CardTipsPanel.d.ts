/**
 *  隐私设置
 */
declare namespace tea {
    class tea_CardTipsPanelMgr {
        static __INS__: tea_CardTipsPanelMgr;
        static getInstance(_zOrder: number): tea_CardTipsPanelMgr;
        __selfPanel: CardTipsPanel;
        _zOrder: number;
        init(): boolean;
        getPanel(create?: boolean): CardTipsPanel;
    }
    class CardTipsPanel extends kaayou.ModelLayer {
        constructor();
        btn_close: ccui.Button;
        btn_submit: ccui.Button;
        nomore_cb: ccui.CheckBox;
        initUI(): void;
        Show(): void;
        Hide(): void;
    }
}
