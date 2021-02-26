declare namespace tea {
    class tea_FcmPlayerDetailMgr {
        static __INS__: tea_FcmPlayerDetailMgr;
        static getInstance(_zOrder?: number): tea_FcmPlayerDetailMgr;
        __selfPanel: PlayerDetailPanel;
        _zOrder: number;
        init(): boolean;
        getPanel(create?: boolean): PlayerDetailPanel;
    }
    class PlayerDetailPanel extends kaayou.ModelLayer {
        btnSearch: ccui.Button;
        teaFcmPlayerDetail_cell: ccui.Layout;
        scrollDetail_list: common.PullList;
        playerUid: number;
        label_name: ccui.Text;
        label_curFcmNum: ccui.Text;
        constructor();
        btn_close: ccui.Button;
        initUI(): void;
        doGetPlayerFcmRecordlist(clear: boolean): void;
        Show(data: {
            uid: number;
        }): void;
        Hide(): void;
    }
}
