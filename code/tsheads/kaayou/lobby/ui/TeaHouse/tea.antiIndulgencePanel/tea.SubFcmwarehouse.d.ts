declare namespace tea {
    class TH_Fcm_WareHouseCell extends kaayou.Block implements common.IPullListCell {
        constructor();
        _index: number;
        setIndex(index: any): void;
        getIndex(): number;
        label_time: ccui.Text;
        label_day: ccui.Text;
        label_uid: ccui.Text;
        label_op: ccui.Text;
        label_num: ccui.Text;
        bgItem: ccui.Text;
        _data: FCMPlayerRecordItem;
        initWithNode(node: ccui.Widget): void;
        reset(): void;
        setInfo(data: FCMPlayerRecordItem, i: number): void;
    }
    class SubFcmWareHousePage {
        btnClear: ccui.Button;
        scr_WareHouse: ccui.ScrollView;
        searchMgr: FcmSearchWidget;
        label_zplz: ccui.Text;
        label_cksy: ccui.Text;
        label_used: ccui.Text;
        label_zryh: ccui.Text;
        label_zrsh: ccui.Text;
        label_jkcze: ccui.Text;
        btn_operation: ccui.Button;
        btn_last: ccui.Button;
        btn_next: ccui.Button;
        label_curIndex: ccui.Text;
        TH_Fcm_WareHouseCell_mode: ccui.Layout;
        curPage: number;
        totalpage: number;
        curWHData: Data_FcmWarehouseRes;
        doGetBusinessList(clear?: boolean, timetype?: number, sorttype?: number, search?: string): void;
        _page: cc.Node;
        _index: number;
        setIndex(index: any): this;
        getIndex(): number;
        onSubpageChange(e: kaayou.Event): void;
        _isInitPull: boolean;
        reset(): void;
        layout_time_group: ccui.Layout;
        initWidthNode(page: cc.Node, searchMgr: FcmSearchWidget, cellMod: ccui.Layout): void;
        private createCell;
        doGetWareHouseList(page: any, clear?: boolean): void;
    }
}
