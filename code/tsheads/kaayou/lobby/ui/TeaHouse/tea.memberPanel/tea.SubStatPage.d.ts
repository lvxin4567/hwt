declare namespace tea {
    class MemStatCell extends kaayou.Block implements common.IPullListCell {
        constructor();
        _index: number;
        setIndex(index: any): void;
        getIndex(): number;
        img_head: ccui.ImageView;
        label_name: ccui.Text;
        label_id: ccui.Text;
        label_time: ccui.Text;
        label_jushu: ccui.Text;
        label_winner: ccui.Text;
        label_score: ccui.Text;
        initWithNode(node: ccui.Widget): void;
        _data: Data_HouseMemberStatItem;
        setInfo(data: Data_HouseMemberStatItem): void;
    }
    class SubStatPage {
        layout_time_group: ccui.Layout;
        layout_sort_group: ccui.Layout;
        scroll_Stat: common.PullList;
        searchMgr: MemSearchWidget;
        sortType: number;
        timetype: number;
        doGetStatList(clear?: boolean, timetype?: number, sorttype?: number, search?: string): void;
        initSortNode(pageStat: cc.Node): void;
        _page: cc.Node;
        _index: number;
        setIndex(index: any): this;
        getIndex(): number;
        onSubpageChange(e: kaayou.Event): void;
        _isInitPull: boolean;
        reset(): void;
        initWidthNode(pageStat: cc.Node, searchMgr: MemSearchWidget, cellMod: ccui.Widget): void;
    }
}
