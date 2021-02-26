declare namespace tea {
    class SubFcmManagePage {
        _page: cc.Node;
        _index: number;
        btnBatch: ccui.Button;
        btnCurrent: ccui.Layout;
        btnLast: ccui.Layout;
        btnPlay: ccui.Layout;
        btnRoom: ccui.Layout;
        layout_sort_group: ccui.Layout;
        ndSort: ccui.Layout;
        scroll_member: common.PullList;
        searchMgr: FcmSearchWidget;
        sortType: number;
        authFcmManage(): void;
        setIndex(index: any): this;
        getIndex(): number;
        onSubpageChange(e: kaayou.Event): void;
        _isInitPull: boolean;
        reset(): void;
        doGetMemList(clear?: boolean, sorttype?: number): void;
        initWidthNode(pageMem: cc.Node, searchMgr: FcmSearchWidget, cellMod: ccui.Widget): void;
    }
}
