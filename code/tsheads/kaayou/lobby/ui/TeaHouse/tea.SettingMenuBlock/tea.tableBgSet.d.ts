declare namespace tea {
    class tea_tableBgSetMgr {
        static __INS__: tea_tableBgSetMgr;
        static getInstance(_zOrder?: number): tea_tableBgSetMgr;
        __selfPanel: tableBgSetPanel;
        _zOrder: number;
        init(): boolean;
        getPanel(create?: boolean): tableBgSetPanel;
    }
    class tableBgSetPanel extends kaayou.ModelLayer {
        constructor();
        btn_close: ccui.Button;
        floorLayout: ccui.ScrollView;
        floorItem: ccui.CheckBox;
        floorGroup: common.RadioGroup;
        tablebg_layout: ccui.Layout;
        bgInfo: any[];
        btn_submit: ccui.Button;
        initUI(): void;
        onTableBgset(e: kaayou.TouchEvent): void;
        private createFloorCb;
        Show(): void;
        setUI(): void;
        setTableBgSelect(index: number): void;
        _floorLevel: number;
        onMenuSelected(e: kaayou.RadioEvent): void;
        onMenuUnSelected(e: kaayou.RadioEvent): void;
        Hide(): void;
    }
}
