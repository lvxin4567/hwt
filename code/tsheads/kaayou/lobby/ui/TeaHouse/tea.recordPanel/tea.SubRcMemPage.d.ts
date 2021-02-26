declare namespace tea {
    class SubRcMemPage {
        bPartner: boolean;
        btnClear: ccui.Button;
        cbPartner: ccui.CheckBox;
        iLike: number;
        iTime: number;
        iDetailInterval: number;
        iDetailRange: number;
        loFilter: ccui.Layout;
        oldHID: number;
        scr_mem_record: common.PullList;
        searchMgr: RecordSearchWidget;
        selectMgr: RecordSelectWidget;
        dateMgr: RecordDateWidget;
        sortType: number;
        timeType: number;
        state_group: ccui.Layout;
        label_round: ccui.Text;
        label_invalidround: ccui.Text;
        label_totalround: ccui.Text;
        label_invalidperson: ccui.Text;
        label_total: ccui.Text;
        label_totalzan: ccui.Text;
        label_totalzan1: ccui.Text;
        creatorTop_layout: ccui.Layout;
        captorTop_layout: ccui.Layout;
        iLowScore: number;
        roundtype: number;
        doGetStateList(clear?: boolean, timetype?: number, sorttype?: number): void;
        _page: cc.Node;
        _index: number;
        setIndex(index: any): this;
        getIndex(): number;
        onSubpageChange(e: kaayou.Event): void;
        _isInitPull: boolean;
        reset(): void;
        private zan_count;
        updateZanCount(dig: any): void;
        resetMemberInfo(): void;
        updateMemberInfo(data: any): void;
        canViewloFilter(): boolean;
        layout_sort_group: ccui.Layout;
        initSortNode(pageStat: cc.Node): void;
        cleanList(): void;
        initWidthNode(page: cc.Node, searchMgr: RecordSearchWidget, selecthMgr: RecordSelectWidget, dateMgr: RecordDateWidget, cellMod: ccui.Widget, clearButton: ccui.Button): void;
    }
}
