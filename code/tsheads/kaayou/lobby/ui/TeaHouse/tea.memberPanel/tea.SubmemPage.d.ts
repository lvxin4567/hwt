declare namespace tea {
    class SubMemPage {
        scroll_member: common.PullList;
        searchMgr: MemSearchWidget;
        sortType: number;
        logintime_asc: ccui.Layout;
        logintime_desc: ccui.Layout;
        lasc: ccui.CheckBox;
        ldesc: ccui.CheckBox;
        topSortLeftLayout: ccui.Layout;
        btn_handAdd: ccui.Button;
        btn_forbidTogether: ccui.Button;
        btn_offwork: ccui.Button;
        btns: ccui.ScrollView;
        topSortLeft_radioGrup: common.RadioGroup;
        listType: number;
        isOffWork: boolean;
        doGetMemList(clear?: boolean, search?: string, sorttype?: number): void;
        _page: cc.Node;
        _index: number;
        setIndex(index: any): this;
        getIndex(): number;
        onSubpageChange(e: kaayou.Event): void;
        _isInitPull: boolean;
        reset(): void;
        topSortAuto(): void;
        topSortCheckMemNum(data: any): void;
        onListTypeChange(e: kaayou.RadioEvent): void;
        initWidthNode(pageMem: cc.Node, searchMgr: MemSearchWidget, cellMod: ccui.Widget): void;
        watchRole(): void;
    }
}
