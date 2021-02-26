declare namespace tea {
    class SubApyPage {
        _data: any;
        searchMgr: MemSearchWidget;
        sortType: number;
        label_none_apply: ccui.Text;
        scroll_Apply: common.PullList;
        doGetApplyList(clear?: boolean, search?: string): void;
        _page: cc.Node;
        _index: number;
        setIndex(index: any): this;
        getIndex(): number;
        onSubpageChange(e: kaayou.Event): void;
        _isInitPull: boolean;
        reset(): void;
        initWidthNode(pageApy: cc.Node, searchMgr: MemSearchWidget, cellMod: ccui.Widget): void;
    }
}
