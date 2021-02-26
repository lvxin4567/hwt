/// <reference path="tea.RecordSearchWidget.d.ts" />
/// <reference path="tea.RecordSelectWidget.d.ts" />
declare namespace tea {
    class SubRcBigWinPage {
        btnClear: ccui.Button;
        scr_business: common.PullList;
        searchMgr: RecordSearchWidget;
        selectMgr: RecordSelectWidget;
        doGetBusinessList(clear?: boolean, timetype?: number, sorttype?: number, search?: string): void;
        _page: cc.Node;
        _index: number;
        setIndex(index: any): this;
        getIndex(): number;
        onSubpageChange(e: kaayou.Event): void;
        _isInitPull: boolean;
        reset(): void;
        layout_time_group: ccui.Layout;
        layout_sort_group: ccui.Layout;
        initWidthNode(page: cc.Node, searchMgr: RecordSearchWidget, selecthMgr: RecordSelectWidget, cellMod: ccui.Widget, clearButton: ccui.Button): void;
    }
}
