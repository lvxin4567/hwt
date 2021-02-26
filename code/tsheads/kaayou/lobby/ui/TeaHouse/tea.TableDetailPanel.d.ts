/**
 *
 *  茶楼桌子详情面板
 *
 */
declare namespace tea {
    class Tea_TableDetailPanelMgr {
        static __INS__: Tea_TableDetailPanelMgr;
        static getInstance(): Tea_TableDetailPanelMgr;
        __selfPanel: TableDetailPanel;
        init(): boolean;
        getPanel(create?: boolean): TableDetailPanel;
    }
    class TableDetailPanel extends kaayou.ModelLayer {
        constructor();
        btn_close: ccui.Button;
        layout_players: ccui.ScrollView;
        btn_dismiss: ccui.Button;
        btnJoin: ccui.Button;
        progress_label: ccui.Text;
        num: number;
        dataDetail: proto_tableinfo_res;
        initUI(): void;
        doUpdataPlayers(item: Array<{
            id: number;
            imgurl: string;
            ip: string;
            nickname: string;
            online: boolean;
            partner: string;
        }>): void;
        _curTindex: number;
        _isClean: boolean;
        watchRole(): void;
        private _data;
        showDetailOther(data: any): void;
        Show(data: proto_tableinfo_res): void;
        Hide(): void;
    }
}
