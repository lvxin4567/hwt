declare namespace tea {
    class tea_TeaRecordDetailPanelMgr {
        static __INS__: tea_TeaRecordDetailPanelMgr;
        static getInstance(z: any): tea_TeaRecordDetailPanelMgr;
        _zindex: number;
        __selfPanel: RecordDetail;
        init(): boolean;
        getPanel(create?: boolean): RecordDetail;
    }
    class RecordDetail extends kaayou.Layer {
        constructor();
        lb_gamename: ccui.Text;
        btn_close: ccui.Button;
        btn_copy_allrecord: ccui.Button;
        btn_share_image: ccui.Button;
        recordsum: ccui.ScrollView;
        memberlist: ccui.Layout;
        SV_pullList: common.PullList;
        th_record_detail_cell_mode: ccui.Layout;
        _info: ITH_RECORD_DETAIL_INFO;
        initUI(): void;
        copyrecord(): void;
        updateInfo(): void;
        Show(data: ITH_RECORD_DETAIL_INFO): void;
        Hide(): void;
    }
}
