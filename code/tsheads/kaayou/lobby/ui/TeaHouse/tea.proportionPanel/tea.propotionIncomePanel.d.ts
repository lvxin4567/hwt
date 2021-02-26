declare namespace tea {
    class PropotionIncomePanel {
        selectMgr: MemberSelectWidget;
        searchMgr: MemSearchWidget;
        cellMod: ccui.Widget;
        btn_history_record: ccui.Button;
        _page: cc.Node;
        _index: number;
        setIndex(index: any): this;
        getIndex(): number;
        onSubpageChange(e: kaayou.Event): void;
        subDayTime(sd?: number): number;
        timeType: number;
        layout_time_group: cc.Node;
        ScrollView_Detail: ccui.ScrollView;
        SV_pullList: common.PullList;
        noPartner_text: ccui.Text;
        tip_pop_dialog: ccui.Layout;
        tipBG: ccui.Layout;
        tipContent: ccui.Layout;
        ranktip: ccui.Button;
        ranktipContent: ccui.Layout;
        ranktipbg: ccui.Layout;
        private daytypeRecord;
        initWithNode(pagePartner: cc.Node, searchMgr: MemSearchWidget, cellMod: ccui.Widget): void;
        private initFilter;
        private initQuery;
        query({ fidindex, daytype, searchkey }: any): void;
        private cleanList;
        pullPartnerList({ hid, daytype, fidindex, searchkey }: any): Promise<void>;
        pullList({ hid, daytype, fidindex, searchkey }: any): Promise<void>;
        isOwner(): boolean;
    }
}
