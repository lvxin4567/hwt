declare namespace tea {
    interface Data_HouseSubPartnerStatItem {
        "uid": number;
        "uname": string;
        "uurl": string;
        "ugender": number;
        "validtimes": number;
        "bigvalidtimes": number;
        "roundprofit": number;
        "subordinateprofit": number;
        "totalprofit": number;
        "royalty": number;
        "partner_deep": number;
        "superior": number;
    }
    export class tea_proportionInfoDialogMgr {
        static __INS__: tea_proportionInfoDialogMgr;
        static getInstance(_zOrder?: number): tea_proportionInfoDialogMgr;
        _zOrder: number;
        __selfDialog: ProportionInfoDialog;
        init(): boolean;
        getPanel(create?: boolean): ProportionInfoDialog;
    }
    export class ProportionInfoDialog extends kaayou.Layer {
        constructor();
        private listNode;
        private closeNode;
        private item;
        initUI(): void;
        pullConfigList(): Promise<void>;
        private parnterid;
        private daytype;
        private fidindex;
        Show({ parnterid, daytype, fidindex }: {
            parnterid: any;
            daytype: any;
            fidindex: any;
        }): void;
        Hide(): void;
    }
    export class ProportionInfoDialogItem {
        constructor(item: cc.Node);
        node: cc.Node;
        private index;
        img_head: ccui.ImageView;
        input_income: cc.Node;
        input_shareincome: cc.Node;
        label_name: ccui.Text;
        label_id: ccui.Text;
        label_totalprofit: ccui.Text;
        label_validtimes: ccui.Text;
        label_partner_deep: ccui.Text;
        label_superior: ccui.Text;
        initUI(item: cc.Node): void;
        private _info;
        setInfo(info: Data_HouseSubPartnerStatItem): this;
        getInfo(): Data_HouseSubPartnerStatItem;
        initWithNode(node: ccui.Widget): void;
        setIndex(index: number): void;
        getIndex(): number;
    }
    export {};
}
