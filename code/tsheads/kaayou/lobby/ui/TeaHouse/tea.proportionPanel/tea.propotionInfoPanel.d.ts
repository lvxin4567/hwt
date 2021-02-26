declare namespace tea {
    class PropotionInfoPanel {
        addMemberBtn: ccui.Button;
        layout_time_group: ccui.Layout;
        layout_sort_group: ccui.Layout;
        lbGameCountTotal: ccui.Text;
        lbYouXiaoTotal: ccui.Text;
        lbSuperTotal: ccui.Text;
        lbWuXiaoTotal: ccui.Text;
        lbBigWinTotal: ccui.Text;
        lbScoreTotal: ccui.Text;
        noPartnerText: ccui.Text;
        pnlTotal: ccui.Layout;
        scroll_stat_p: common.PullList;
        scroll_Partner: common.PullList;
        searchMgr: MemSearchWidget;
        selectMgr: MemberSelectWidget;
        sortType: number;
        timeType: number;
        floor: number;
        memPlay_count_label: ccui.Text;
        groupSelectMgr: MemberSelectWidget;
        btn_setGroup: ccui.Button;
        groupInfo: Array<{
            groupNO: number;
            group_id: number;
            user_count: number;
            users: any;
        }>;
        auth(): void;
        isPartner(): boolean;
        isVitaAdmin(): boolean;
        subDayTime(sd?: number): number;
        doChangeList(clear?: boolean, timetype?: number, sorttype?: number, search?: string): void;
        groupId: number;
        doGetStatList(clear?: boolean, timetype?: number, sorttype?: number, search?: string): void;
        reflashPlist(): void;
        doGetPartnerList(clear?: boolean, timetype?: number, sorttype?: number, search?: string): void;
        initSortNode(pagePartner: cc.Node): void;
        _page: cc.Node;
        _index: number;
        setIndex(index: any): this;
        getIndex(): number;
        onSubpageChange(e: kaayou.Event): void;
        _isInitPull: boolean;
        reset(): void;
        initWidthNode(pagePartner: cc.Node, searchMgr: MemSearchWidget, cellMod: ccui.Widget): void;
    }
}
