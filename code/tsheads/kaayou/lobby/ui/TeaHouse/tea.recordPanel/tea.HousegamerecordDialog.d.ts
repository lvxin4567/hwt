declare namespace tea {
    export class tea_HousegamerecordDialogMgr {
        static __INS__: tea_HousegamerecordDialogMgr;
        static getInstance(_zOrder?: number): tea_HousegamerecordDialogMgr;
        _zOrder: number;
        __selfDialog: HousegamerecordDialog;
        init(): boolean;
        getPanel(create?: boolean): HousegamerecordDialog;
    }
    class HousegamerecordDialog extends kaayou.Layer {
        dgtime: number;
        constructor();
        private SV_pullList;
        selectMgr: RecordSelectWidget;
        iLike: number;
        iTime: number;
        iTimeInterval: number;
        ivHead: ccui.ImageView;
        lbName: ccui.Text;
        lbID: ccui.Text;
        tbTotalScore: ccui.Text;
        lbgamecount: ccui.Text;
        lbbigwin: ccui.Text;
        lbinvalidgame: ccui.Text;
        lbzancount: ccui.Text;
        cbTitleLeft: ccui.CheckBox;
        cbTitleRight: ccui.CheckBox;
        bwuser: boolean;
        lyStatistics: ccui.Layout;
        iv0: ccui.ImageView;
        iv1: ccui.ImageView;
        iv2: ccui.ImageView;
        iv3: ccui.ImageView;
        timeline1: Array<number>;
        timeline2: Array<number>;
        timecursor1: number;
        timecursor2: number;
        cursoradd: boolean;
        clean: boolean;
        titlePlayDtail: ccui.ImageView;
        list1: any[];
        list2: any[];
        initUI(): void;
        _data: ITH_DATA_RECORD;
        _baseinfo: {
            imgurl: any;
            sex: any;
            name: any;
            uid: any;
        };
        selecttime: number;
        updateBaseInfo({ imgurl, sex, name, uid, selecttime, dfid }: {
            imgurl: any;
            sex: any;
            name: any;
            uid: any;
            selecttime: any;
            dfid: any;
        }): void;
        updateZanCount(dig: any): void;
        updateInfo(): void;
        resetcursor(): void;
        pullList({ clear, timetype, sorttype, bwuser, recordtype, querybegintime }: {
            clear?: boolean;
            timetype?: number;
            sorttype?: number;
            bwuser?: boolean;
            recordtype?: number;
            querybegintime?: number;
        }): void;
        reset(): void;
        toggleTab(type: any): void;
        cleanList(): void;
        Show(data: any): void;
        Hide(): void;
    }
    export {};
}
