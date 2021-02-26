declare namespace tea {
    class tea_TimePanelMgr {
        static __INS__: tea_TimePanelMgr;
        static getInstance(_zOrder: number): tea_TimePanelMgr;
        __selfPanel: TimePanel;
        _zOrder: number;
        _data: tea.Data_HouseInfo;
        init(): boolean;
        getPanel(create?: boolean): TimePanel;
    }
    class TimePanel extends kaayou.ModelLayer {
        constructor();
        btn_close: ccui.Button;
        btn_Submit: ccui.Button;
        _data: tea.Data_HouseInfo;
        showTableCountLayout: ccui.Layout;
        showCountRadio: common.RadioGroup;
        radioDict: {
            3: number;
            6: number;
            8: number;
            12: number;
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
