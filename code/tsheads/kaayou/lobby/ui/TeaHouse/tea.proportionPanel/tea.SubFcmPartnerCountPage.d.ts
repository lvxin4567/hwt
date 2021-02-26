declare namespace tea {
    class TH_Fcm_PartnerCountCell extends kaayou.Block implements common.IPullListCell {
        constructor();
        _index: number;
        setIndex(index: any): void;
        getIndex(): number;
        label_name: ccui.Text;
        label_uid: ccui.Text;
        label_zkc: ccui.Text;
        label_wjsy: ccui.Text;
        label_fsze: ccui.Text;
        label_wpsy: ccui.Text;
        btn_detail: ccui.Button;
        label_Layout: ccui.Layout;
        head_image: ccui.ImageView;
        _data: Data_HousePartnerCountItem;
        initWithNode(node: ccui.Widget): void;
        reset(): void;
        setInfo(data: Data_HousePartnerCountItem): void;
    }
    class SubFcmPartnerCountPage {
        btnClear: ccui.Button;
        scr_business: common.PullList;
        searchMgr: MemSearchWidget;
        sortType: number;
        timetype: number;
        _page: cc.Node;
        partner: number;
        opreationTitle: ccui.Text;
        curInfoType: ccui.Text;
        curFangType: ccui.Text;
        zj_bottomPanel: ccui.Layout;
        zj_ff: ccui.Text;
        zj_wjsy: ccui.Text;
        zj_wpsy: ccui.Text;
        _index: number;
        label_zj_totalcost: ccui.Text;
        setIndex(index: any): this;
        getIndex(): number;
        onSubpageChange(e: kaayou.Event): void;
        _isInitPull: boolean;
        reset(): void;
        layout_time_group: ccui.Layout;
        layout_sort_group: ccui.Layout;
        resetTimeLine(): void;
        subDayTime(sd?: number): number;
        initWidthNode(page: cc.Node, searchMgr: MemSearchWidget, cellMod: ccui.Widget): void;
        doGetPartnerCountList(clear?: boolean, timetype?: number, sorttype?: number): void;
    }
}
