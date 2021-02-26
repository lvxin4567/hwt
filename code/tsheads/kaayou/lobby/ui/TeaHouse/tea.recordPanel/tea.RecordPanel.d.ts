/// <reference path="tea.RecordSearchWidget.d.ts" />
/// <reference path="tea.RecordSelectWidget.d.ts" />
/// <reference path="tea.SubRcMinePage.d.ts" />
/// <reference path="tea.SubRcCirclePage.d.ts" />
/// <reference path="tea.SubRcMemPage.d.ts" />
/// <reference path="tea.SubRcBigWinPage.d.ts" />
/// <reference path="tea.SubRcGameNumberPage.d.ts" />
declare namespace tea {
    class tea_TeaRecordPanelMgr {
        static __INS__: tea_TeaRecordPanelMgr;
        static getInstance(): tea_TeaRecordPanelMgr;
        __selfPanel: RecordPanel;
        _teaData: tea.Data_HouseInfo;
        init(): boolean;
        getPanel(create?: boolean): RecordPanel;
    }
    class RecordPanel extends kaayou.Layer {
        constructor();
        btnClearAll: ccui.Button;
        record_btn: ccui.Button;
        layout_dishint: ccui.Layout;
        th_record_cell_mode: ccui.Layout;
        th_memrc_cell_mode: ccui.Layout;
        th_business_cell_mode: ccui.Layout;
        th_bigwin_cell_mode: ccui.Layout;
        th_gamenumber_cell_mode: ccui.Layout;
        tea_call_partner_wumeng: ccui.Layout;
        topbarMgr: lobby.TopBarMgr;
        _pageIndex: number;
        bigWinIndex: number;
        searchMgr: RecordSearchWidget;
        selectMgr: RecordSelectWidget;
        dateMgr: RecordDateWidget;
        initUI(): void;
        onTeaHouseUpdateInfo(): void;
        initUserRoleWatcher(): void;
        CheckUserRole(): void;
        _MenuGroup: ccui.ScrollView;
        canQueryTeamRecord(): boolean;
        initLeftMenu(): void;
        rightPageGroup: ccui.Layout;
        initRightPages(): void;
        Show(data: any): void;
        Hide(): void;
    }
}
