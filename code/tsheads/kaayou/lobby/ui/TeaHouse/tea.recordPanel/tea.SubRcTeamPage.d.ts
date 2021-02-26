declare namespace tea {
    class RecordNounionPanel {
        iTime: number;
        iTimeInterval: number;
        iDetailInterval: number;
        iDetailRange: number;
        lbTeamTotalMemberCount: ccui.Text;
        lbTeamCaptainMemberCount: ccui.Text;
        likeflag: number;
        lyTeamMemberCount: ccui.Layout;
        selectMgr: RecordSelectWidget;
        searchMgr: RecordSearchWidget;
        dateMgr: RecordDateWidget;
        clear: ccui.Button;
        cellMod: ccui.Widget;
        _page: cc.Node;
        _index: number;
        iLowScore: number;
        roundtype: number;
        setIndex(index: any): this;
        getIndex(): number;
        onSubpageChange(e: kaayou.Event): void;
        timeType: number;
        layout_time_group: cc.Node;
        ScrollView_Detail: ccui.ScrollView;
        SV_pullList: common.PullList;
        partnerTypeSort: ccui.Layout;
        _fid: number;
        partnerType_radioGrup: common.RadioGroup;
        private daytypeRecord;
        initWithNode(pagePartner: cc.Node, searchMgr: RecordSearchWidget, selectMgr: RecordSelectWidget, dateMgr: RecordDateWidget, cellMod: ccui.Widget, clear: ccui.Button): void;
        listPartnerType: number;
        onPartnerypeChange(e: kaayou.RadioEvent): void;
        private initFilter;
        private refreshQueryInfo;
        private initQuery;
        private cleanList;
        pullList(clear?: boolean, timetype?: number): Promise<void>;
        isOwner(): boolean;
    }
}
