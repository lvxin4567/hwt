/// <reference path="tea.RecordSearchWidget.d.ts" />
/// <reference path="tea.RecordSelectWidget.d.ts" />
/// <reference path="tea.SubRcMinePage.d.ts" />
declare namespace tea {
    class SubRcCirclePage {
        btnClear: ccui.Button;
        iLike: number;
        iTime: number;
        iDetailInterval: number;
        iDetailRange: number;
        lbLike: ccui.Text;
        lbLowGameCount: ccui.Text;
        lbLowGamePlayerCount: ccui.Text;
        lyTeahouseStatistics: ccui.Layout;
        scr_circle_record: common.PullList;
        searchMgr: RecordSearchWidget;
        selectMgr: RecordSelectWidget;
        dateMgr: RecordDateWidget;
        bwuser: boolean;
        sortType: number;
        timetype: number;
        label_innings: ccui.Text;
        lbGameCount: ccui.Text;
        label_invalidinnings: ccui.Text;
        lbPlayRound: ccui.Text;
        iLowScore: number;
        roundtype: number;
        doGetRecordList(clear?: boolean, timetype?: number, sorttype?: number, bwuser?: boolean): void;
        _page: cc.Node;
        _index: number;
        setIndex(index: any): this;
        getIndex(): number;
        onSubpageChange(e: kaayou.Event): void;
        _isInitPull: boolean;
        reset(searchkeep?: boolean): void;
        layout_sort_group: ccui.Layout;
        initSortNode(pageStat: cc.Node): void;
        private zan_count;
        updateZanCount(dig: any): void;
        initWidthNode(page: cc.Node, searchMgr: RecordSearchWidget, selecthMgr: RecordSelectWidget, dateMgr: RecordDateWidget, cellMod: ccui.Widget, clearButton: ccui.Button, tip: ccui.Layout): void;
    }
}
