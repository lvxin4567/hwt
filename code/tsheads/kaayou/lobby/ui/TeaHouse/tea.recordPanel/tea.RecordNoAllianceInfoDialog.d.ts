declare namespace tea {
    export class tea_RecordNoAllianceInfoDialogMgr {
        static __INS__: tea_RecordNoAllianceInfoDialogMgr;
        static getInstance(_zOrder?: number): tea_RecordNoAllianceInfoDialogMgr;
        _zOrder: number;
        __selfDialog: RecodNoAllianceInfoDialog;
        init(): boolean;
        getPanel(create?: boolean): RecodNoAllianceInfoDialog;
    }
    class RecodNoAllianceInfoDialog extends kaayou.Layer {
        constructor();
        private iTime;
        private iTimeInterval;
        private lbCaptain;
        private listNode;
        private closeNode;
        private item;
        private SV_pullList;
        private label_time;
        private btn_selectDate;
        private dateSelect_Layout;
        private date_layout;
        private date_close;
        edit_searchRed: any;
        private search_btn;
        iLowScore: number;
        private btn_totalrecord;
        private btn_round;
        private btn_lowscore;
        private btn_bigwin;
        partnerLayout: ccui.Layout;
        initUI(): void;
        private totalSort;
        private roundSort;
        private lowscoreSort;
        private bigwinSort;
        private cleanSortState;
        private _state;
        private initSortComponent;
        cleanList(): void;
        private getSortType;
        private query;
        private pagePrev;
        private pageNext;
        private partner;
        private daytype;
        private fid;
        private searchkey;
        private PBegin;
        private PEnd;
        private index;
        private page;
        private info;
        Show({ partner, daytype, fid, searchkey, info, timeInterval, timeIndex, superior, superiorname, iLowScore }: {
            partner: any;
            daytype: any;
            fid: any;
            searchkey: any;
            info: any;
            timeInterval: any;
            timeIndex: any;
            superior: any;
            superiorname: any;
            iLowScore: any;
        }): void;
        resetTimeLine(idx: number): void;
        subDayTime(sd?: number): number;
        Hide(): void;
    }
    export {};
}
