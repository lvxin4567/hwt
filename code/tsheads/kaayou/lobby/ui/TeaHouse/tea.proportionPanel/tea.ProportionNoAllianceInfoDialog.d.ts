declare namespace tea {
    export class tea_proportionNoAllianceInfoDialogMgr {
        static __INS__: tea_proportionNoAllianceInfoDialogMgr;
        static getInstance(_zOrder?: number): tea_proportionNoAllianceInfoDialogMgr;
        _zOrder: number;
        __selfDialog: ProportionNoAllianceInfoDialog;
        init(): boolean;
        getPanel(create?: boolean): ProportionNoAllianceInfoDialog;
    }
    class ProportionNoAllianceInfoDialog extends kaayou.Layer {
        constructor();
        iTime: number;
        private listNode;
        private closeNode;
        private item;
        private SV_pullList;
        initUI(): void;
        cleanList(): void;
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
        Show({ partner, daytype, fid, searchkey }: {
            partner: any;
            daytype: any;
            fid: any;
            searchkey: any;
        }): void;
        Hide(): void;
    }
    export {};
}
