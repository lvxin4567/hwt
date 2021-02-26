/**
 *  显示桌子数量面板
 */
declare namespace tea {
    class tea_TeaShowTablePanelMgr {
        static __INS__: tea_TeaShowTablePanelMgr;
        static getInstance(_zOrder: number): tea_TeaShowTablePanelMgr;
        __selfPanel: ShowTableCountPanel;
        _zOrder: number;
        _data: tea.Data_HouseInfo;
        init(): boolean;
        getPanel(create?: boolean): ShowTableCountPanel;
    }
    class ShowTableCountPanel extends kaayou.ModelLayer {
        constructor();
        btn_close: ccui.Button;
        btn_Submit: ccui.Button;
        _data: tea.Data_HouseInfo;
        showTableCountLayout: ccui.Layout;
        showCountRadio: common.RadioGroup;
        radioDict: {
            0: number;
            5: number;
            10: number;
            20: number;
        };
        numDict: {
            0: number;
            1: number;
            2: number;
            3: number;
        };
        iTable: number;
        initUI(): void;
        onTeaHouseUpdateInfo(data: tea.Data_HouseInfo): void;
        Show(): void;
        Hide(): void;
    }
}
