/// <reference path="tea.RecordSearchWidget.d.ts" />
/// <reference path="tea.RecordSelectWidget.d.ts" />
declare namespace tea {
    interface ITH_RECORD_CELL_PLAYER {
        layout_player: ccui.Layout;
        img_head: ccui.ImageView;
        tag_winner: ccui.ImageView;
        label_uname: ccui.Text;
        label_uscore: ccui.Text;
        image_me: ccui.ImageView;
    }
    export class TH_RecordCell extends kaayou.Block implements common.IPullListCell {
        constructor();
        _index: number;
        setIndex(index: any): void;
        getIndex(): number;
        label_seq: ccui.Text;
        label_gname: ccui.Text;
        label_time: ccui.Text;
        label_roomnum: ccui.Text;
        label_innings: ccui.Text;
        label_floornum: ccui.Text;
        label_diss: ccui.Text;
        btn_detail: ccui.Button;
        img_zan: ccui.ImageView;
        btn_dishint: ccui.Button;
        playerItems: Array<ITH_RECORD_CELL_PLAYER>;
        _data: ITH_DATA_RECORD_ITEM;
        initWithNode(node: ccui.Widget): void;
        reset(): void;
        resetPlayers(): void;
        setInfo(data: ITH_DATA_RECORD_ITEM): void;
        setPlayerInfo(): void;
    }
    export class SubRcMinePage {
        btnClear: ccui.Button;
        iTime: number;
        scr_mine_record: common.PullList;
        searchMgr: RecordSearchWidget;
        selectMgr: RecordSelectWidget;
        dateMgr: RecordDateWidget;
        sortType: number;
        timetype: number;
        label_innings: ccui.Text;
        label_score: ccui.Text;
        label_winner: ccui.Text;
        lbNothing: ccui.Text;
        roundtype: number;
        doGetRecordList(clear?: boolean, timetype?: number, sorttype?: number): void;
        _page: cc.Node;
        _index: number;
        setIndex(index: any): this;
        getIndex(): number;
        onSubpageChange(e: kaayou.Event): void;
        _isInitPull: boolean;
        reset(): void;
        initSortNode(page: cc.Node): void;
        initWidthNode(page: cc.Node, searchMgr: RecordSearchWidget, selecthMgr: RecordSelectWidget, dateMgr: RecordDateWidget, cellMod: ccui.Widget, clearButton: ccui.Button, tip: ccui.Layout): void;
    }
    export {};
}
