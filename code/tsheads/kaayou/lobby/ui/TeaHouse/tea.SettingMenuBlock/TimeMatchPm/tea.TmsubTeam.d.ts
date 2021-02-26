declare namespace tea {
    class Pm_subTeamPanel {
        selectMgr: MemberSelectWidget;
        searchMgr: MemSearchWidget;
        cellMod: ccui.Widget;
        _page: cc.Node;
        _index: number;
        setIndex(index: any): this;
        getIndex(): number;
        onSubpageChange(e: kaayou.Event): void;
        reset(): void;
        resetTimeLine(): void;
        subDayTime(sd?: number): number;
        timeType: number;
        layout_time_group: cc.Node;
        ScrollView_Detail: ccui.ScrollView;
        SV_pullList: common.PullList;
        _fid: number;
        _prizeArr: any[];
        private daytypeRecord;
        initWithNode(pageMine: cc.Node, searchMgr: MemSearchWidget, cellMod: ccui.Widget): void;
        private reflashQueryInfo;
        private initFilter;
        pullList(clear?: boolean, timetype?: number): Promise<void>;
        isVTadmin(): boolean;
        isOwner(): boolean;
    }
}
