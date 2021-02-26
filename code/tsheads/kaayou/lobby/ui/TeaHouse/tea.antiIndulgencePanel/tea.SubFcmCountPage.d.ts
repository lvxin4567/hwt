declare namespace tea {
    class TH_Fcm_CountCell extends kaayou.Block implements common.IPullListCell {
        constructor();
        _index: number;
        setIndex(index: any): void;
        getIndex(): number;
        label_deduction: ccui.Text;
        label_PlayerResidue: ccui.Text;
        label_fsze: ccui.Text;
        label_clearArea: ccui.Text;
        label_sztj: ccui.Text;
        _data: Data_HouseCountItem;
        initWithNode(node: ccui.Widget): void;
        reset(): void;
        setInfo(data: Data_HouseCountItem): void;
    }
    class SubFcmCountPage {
        btnClearZero: ccui.Button;
        scr_FcmCount: common.PullList;
        searchMgr: FcmSearchWidget;
        _page: cc.Node;
        _index: number;
        timeType: number;
        setIndex(index: any): this;
        getIndex(): number;
        onSubpageChange(e: kaayou.Event): void;
        _isInitPull: boolean;
        reset(): void;
        resetTimeLine(): void;
        subDayTime(sd?: number): number;
        layout_time_group: ccui.Layout;
        initWidthNode(page: cc.Node, searchMgr: FcmSearchWidget, cellMod: ccui.Widget): void;
        doGetFcmCountList(clear?: boolean, timetype?: number): void;
    }
}
