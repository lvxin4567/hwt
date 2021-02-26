/// <reference path="tea.SubFcmSettingPage.d.ts" />
/// <reference path="tea.SubFcmScopePage.d.ts" />
/// <reference path="tea.SubFcmManagePage.d.ts" />
declare namespace tea {
    class tea_AntiIndulgencePanelMgr {
        static __INS__: tea_AntiIndulgencePanelMgr;
        static getInstance(_zOrder?: number): tea_AntiIndulgencePanelMgr;
        _zOrder: number;
        __selfPanel: AntiIndulgencePanel;
        _teaData: tea.Data_HouseInfo;
        init(): boolean;
        getPanel(create?: boolean): AntiIndulgencePanel;
    }
    class AntiIndulgencePanel extends kaayou.Layer {
        constructor();
        btnClearAll: ccui.Button;
        firstIndex: number;
        prfScopeMeberRow: ccui.Layout;
        prfManageRow: ccui.Layout;
        ThFcm_count_cell_mode: ccui.Layout;
        ThFcm_wareHouse_cell_mode: ccui.Layout;
        ThFcm_partnerCunt_cell: ccui.Layout;
        th_gamenumber_cell_mode: ccui.Layout;
        tea_call_partner_config: ccui.Layout;
        topbarMgr: lobby.TopBarMgr;
        _pageIndex: number;
        searchMgr: FcmSearchWidget;
        selectMgr: FcmSearchWidget;
        authFcmPanel(): void;
        initUI(): void;
        onTeaHouseUpdateInfo(data: tea.Data_HouseInfo): void;
        _MenuGroup: ccui.ScrollView;
        initLeftMenu(): void;
        rightPageGroup: ccui.Layout;
        initRightPages(): void;
        Show(data: any): void;
        Hide(): void;
    }
}
