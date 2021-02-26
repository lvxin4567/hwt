declare namespace lobby {
    export interface ITH_DATA_RECORD_PLAYER {
        uid: number;
        nickname: string;
        headurl: string;
        score: number;
        sex: number;
    }
    export interface ITH_DATA_RECORD_ITEM {
        daytype?: number;
        dfid: number;
        hid: number;
        fid: number;
        finishtype: number;
        gamenum: string;
        isheart: number;
        roomnum: number;
        gameindex: number;
        kindid: number;
        playround: number;
        totalround: number;
        wf: string;
        playedat: number;
        player: Array<ITH_DATA_RECORD_PLAYER>;
    }
    export interface ITH_RECORD_DETAIL_ITEM {
        player: Array<any>;
        replayid: number;
        starttime: number;
        endtime: number;
    }
    export class Lobby_RecordDetailDialogMgr {
        static __INS__: Lobby_RecordDetailDialogMgr;
        static getInstance(z: any): Lobby_RecordDetailDialogMgr;
        _zindex: number;
        __selfPanel: LobbyRecordDetail;
        init(): boolean;
        getPanel(create?: boolean): LobbyRecordDetail;
    }
    class LobbyRecordDetail extends kaayou.Layer {
        constructor();
        lb_gamename: ccui.Text;
        lySharePic: ccui.Layout;
        btn_close: ccui.Button;
        btn_copy_allrecord: ccui.Button;
        btn_share_image: ccui.Button;
        recordsum: ccui.ScrollView;
        memberlist: ccui.Layout;
        SV_pullList: common.PullList;
        th_record_detail_cell_mode: ccui.Layout;
        _info: any;
        initUI(): void;
        copyrecord(): void;
        updateInfo(): void;
        Show(data: any): void;
        Hide(): void;
    }
    export {};
}
