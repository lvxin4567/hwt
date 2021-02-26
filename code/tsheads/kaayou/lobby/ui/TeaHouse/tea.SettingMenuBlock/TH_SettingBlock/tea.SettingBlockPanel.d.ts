declare namespace tea {
    class tea_SettingBlockMgr {
        static __INS__: tea_SettingBlockMgr;
        static getInstance(_zOrder: number): tea_SettingBlockMgr;
        __selfPanel: SettingBlockPanel;
        _data: tea.Data_HouseInfo;
        _zOrder: number;
        init(): boolean;
        getPanel(create?: boolean): SettingBlockPanel;
    }
    class SettingBlockPanel extends kaayou.ModelLayer {
        constructor();
        topbarMgr: lobby.TopBarMgr;
        initUI(): void;
        menuGroup: common.RadioGroup;
        mgrMenuGroup: ccui.ScrollView;
        _pageIndex: number;
        initLeftMenu(): void;
        onMenuUnSelected(e: kaayou.RadioEvent): void;
        rightPageGroup: ccui.Layout;
        th_Tea_cell_mode: ccui.Layout;
        th_Set_cell_mode: ccui.Layout;
        initRightPages(): void;
        Show(data: tea.Data_HouseInfo): void;
        Hide(): void;
    }
}
