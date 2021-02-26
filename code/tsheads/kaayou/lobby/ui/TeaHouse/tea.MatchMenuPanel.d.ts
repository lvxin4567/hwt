declare namespace tea {
    class tea_MatchMenuPanelMgr {
        static __INS__: tea_MatchMenuPanelMgr;
        static getInstance(): tea_MatchMenuPanelMgr;
        __selfPanel: MatchMenuPanel;
        _data: tea.Data_HouseInfo;
        init(): boolean;
        getPanel(create?: boolean): MatchMenuPanel;
    }
    class MatchMenuPanel extends kaayou.ModelLayer {
        _data: any;
        btnAntiIndulgence: ccui.Button;
        btnPartner: ccui.Button;
        btnRank: ccui.Button;
        layout_setmenu_panel: ccui.Layout;
        lay_meun: ccui.ScrollView;
        constructor();
        authMatchMenuPanel(): void;
        initUI(): void;
        onTeaHouseUpdateInfo(data: tea.Data_HouseInfo): void;
        Show(data: tea.Data_HouseInfo): void;
        Hide(): void;
    }
}
