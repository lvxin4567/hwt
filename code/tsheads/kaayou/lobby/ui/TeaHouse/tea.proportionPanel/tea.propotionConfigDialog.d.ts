declare namespace tea {
    class tea_propotionConfigDialogMgr {
        static __INS__: tea_propotionConfigDialogMgr;
        static getInstance(_zOrder?: number): tea_propotionConfigDialogMgr;
        _zOrder: number;
        __selfDialog: PropotionConfigDialog;
        init(): boolean;
        getPanel(create?: boolean): PropotionConfigDialog;
    }
    class PropotionConfigDialog extends kaayou.Layer {
        constructor();
        private listNode;
        private closeNode;
        private submitNode;
        private item_percent;
        private admin_item_percent;
        private customInfo;
        private listArray;
        private btn_history;
        private forAll;
        initUI(): void;
        pullSubPartnerConfigList(): Promise<void>;
        pullConfigList(): Promise<void>;
        private submitOwnerConfigList;
        private submitConfigList;
        isCreator(): boolean;
        clean(): void;
        private parnterid;
        private isjunior;
        Show({ parnterid, uname, isjunior }: {
            parnterid: any;
            uname: any;
            isjunior?: boolean;
        }): void;
        private isVitaAdmin;
        isOwner(): boolean;
        private setUserLabelInfo;
        Hide(): void;
    }
    class PropotionConfigDialogItem {
        constructor(item: cc.Node, { isjunior }: {
            isjunior: any;
        });
        node: cc.Node;
        private isjunior;
        private index;
        input_income: cc.Node;
        input_shareincome: cc.Node;
        private inputCache;
        floor: ccui.ImageView;
        floor_name: ccui.Text;
        hehuo_label: ccui.ImageView;
        txt_income: ccui.Text;
        txt_my_income: ccui.Text;
        txt_single_cost: ccui.Text;
        label_percent_sub: ccui.Text;
        label_percent_my: ccui.Text;
        private _info;
        initUI(item: cc.Node): void;
        changePlistImage(node: any, source: any): void;
        private attachTextEdit;
        setInfo(info: any): this;
        fixNumBug(n: any): number;
        setAdminInfo(info: any): this;
        getInfo(): {
            royalty: number;
            distributable: number;
            superiorprofit: number;
            hid: number;
            parnterid: number;
            junior_profit?: number;
            single_cost?: number;
            junior_percent?: number;
            royalty_percent?: number;
            superior_percent?: number;
        };
        isCreator(): boolean;
        initWithNode(node: ccui.Widget): void;
        setIndex(index: number): void;
        getIndex(): number;
    }
}
