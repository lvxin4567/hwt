declare namespace tea {
    export class tea_propotionFloorConfigDialogMgr {
        static __INS__: tea_propotionFloorConfigDialogMgr;
        static getInstance(_zOrder?: number): tea_propotionFloorConfigDialogMgr;
        _zOrder: number;
        __selfDialog: propotionFloorConfigDialog;
        init(): boolean;
        getPanel(create?: boolean): propotionFloorConfigDialog;
    }
    class propotionFloorConfigDialog extends kaayou.Layer {
        constructor();
        delafloor_cell: ccui.Layout;
        scrollDetail_list: ccui.ScrollView;
        btn_submit: ccui.Button;
        btn_close: ccui.Button;
        node: cc.Node;
        noPartner_text: ccui.Text;
        txt_invalid_round: ccui.Text;
        label_invalid_round: ccui.Text;
        initUI(): void;
        private submit;
        _index: number;
        setIndex(index: any): this;
        getIndex(): number;
        Show(): void;
        Hide(): void;
        private pullList;
        private createCell;
    }
    export {};
}
