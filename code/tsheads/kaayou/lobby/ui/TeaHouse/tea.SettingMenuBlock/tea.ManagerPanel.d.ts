declare namespace tea {
    class tea_ManagerPanelMgr {
        static __INS__: tea_ManagerPanelMgr;
        static getInstance(): tea_ManagerPanelMgr;
        __selfPanel: ManagerPanel;
        _data: tea.Data_HouseInfo;
        init(): boolean;
        getPanel(create?: boolean): ManagerPanel;
    }
    class ManagerPanel extends kaayou.ModelLayer {
        tea_cell_manager_mode: ccui.Layout;
        constructor();
        ebNotice: any;
        ebName: any;
        ndNotice: cc.Layer;
        ndName: cc.Layer;
        topbarMgr: lobby.TopBarMgr;
        sTitle: string;
        sContent: string;
        initUI(): void;
        menuGroup: common.RadioGroup;
        mgrMenuGroup: ccui.ScrollView;
        initLeftMenu(): void;
        onMenuSelected(e: kaayou.RadioEvent): void;
        onMenuUnSelected(e: kaayou.RadioEvent): void;
        mgrPageGroup: ccui.Layout;
        btnSave: ccui.Button;
        scroll_mine: ccui.ScrollView;
        scroll_intrant: ccui.ScrollView;
        noticeSwitchLayout: ccui.Layout;
        noticeSwitch_Group: common.RadioGroup;
        selIndex: number;
        initRightPages(): void;
        noticeSwitchChange(e: kaayou.RadioEvent): void;
        checkChange(): boolean;
        checkCanchange(): boolean;
        doGetMineTeaHouse(): void;
        doGetIntrantTeaHouse(): void;
        private createCell;
        onTeaHouseUpdateInfo(data: tea.Data_HouseInfo): void;
        onUpdateMineTeaHouse(data: {
            list: Data_HouseMemberItem;
            update: boolean;
        }): void;
        onUpdateIntrantTeaHouse(data: {
            list: Data_HouseMemberItem;
            update: boolean;
        }): void;
        Show(data: tea.Data_HouseInfo): void;
        Hide(): void;
    }
}
