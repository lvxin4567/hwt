/// <reference path="tea.RecordSearchWidget.d.ts" />
/// <reference path="tea.RecordSelectWidget.d.ts" />
declare namespace tea {
    class TH_RC_BusinessCell extends kaayou.Block implements common.IPullListCell {
        constructor();
        _index: number;
        setIndex(index: any): void;
        getIndex(): number;
        _data: Array<number>;
        initWithNode(node: ccui.Widget): void;
        reset(): void;
        setInfo(data: Array<number>): void;
    }
    class SubRcBusinessPage {
        btnClear: ccui.Button;
        lyTotalCard: ccui.Layout;
        scr_business: common.PullList;
        searchMgr: RecordSearchWidget;
        selectMgr: RecordSelectWidget;
        totle_Layout: ccui.Layout;
        date_layout: ccui.Layout;
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
