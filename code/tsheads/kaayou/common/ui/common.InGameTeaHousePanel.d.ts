/// <reference path="common.PullListView.d.ts" />
declare namespace common {
    interface IIG_Table_CELL_PLAYER {
        layout_player: ccui.Layout;
        img_head: ccui.ImageView;
        label_uname: ccui.Text;
        btn_sit: ccui.Button;
    }
    export class TH_InGameTable_Cell extends kaayou.Block implements common.IPullListCell {
        constructor();
        _index: number;
        setIndex(index: any): void;
        getIndex(): number;
        btn_dis: ccui.Button;
        label_gameRule: ccui.Text;
        label_roomNum: ccui.Text;
        label_seq: ccui.Text;
        label_gameing: ccui.Text;
        lbNotStart: ccui.Text;
        playerItems: Array<IIG_Table_CELL_PLAYER>;
        layout_player_group: ccui.Layout;
        _data: tea.Data_HosueFtableItems;
        initWithNode(node: ccui.Widget): void;
        reset(): void;
        resetPlayers(): void;
        setInfo(data: tea.Data_HosueFtableItems): void;
        setPlayerInfo(): void;
    }
    export abstract class InGameTeaHousePanel extends kaayou.Layer {
        constructor();
        _data: any;
        btn_close: ccui.Button;
        dataApply: any;
        dataOnline: any;
        layout_title: ccui.Layout;
        layout_pageGroup: ccui.Layout;
        lbHouseId: ccui.Text;
        scr_apply: PullList;
        scr_tables: PullList;
        scr_member: PullList;
        tea_apply_cell: ccui.Layout;
        tea_table_cell: ccui.Layout;
        tea_invite_cell: ccui.Layout;
        auth(): void;
        initWithccs(path?: string, full?: boolean): void;
        abstract getModuleName(): string;
        abstract getNetName(): string;
        initUI(): void;
        onPageChange(e: kaayou.Event): void;
        initApplyList(): void;
        getApplyCell(): common.IPullListCell;
        onUpdateApply(e: kaayou.Event): void;
        doUpdateApply(data: tea.ITH_DATA_USER_INFO[]): void;
        initMemList(): void;
        getMemCell(): common.IPullListCell;
        onUpdateMember(e: kaayou.Event): void;
        doUpdateMember(data: tea.ITH_DATA_USER_INFO[]): void;
        initTableList(): void;
        getTableCell(): common.IPullListCell;
        onUpdateTable(e: kaayou.Event): void;
        doUpdateTable(data: Array<tea.Data_HosueFtableItems>): void;
        bindUIEvents(): void;
        Show(data: tea.ITH_DATA_INGAME_HouseInfo): void;
        Hide(): void;
    }
    export {};
}
