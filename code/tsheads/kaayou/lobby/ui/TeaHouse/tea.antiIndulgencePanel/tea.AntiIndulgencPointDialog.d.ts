declare namespace tea {
    class tea_AntiIndulgencPointDialogMgr {
        static __INS__: tea_AntiIndulgencPointDialogMgr;
        static getInstance(_zOrder?: number): tea_AntiIndulgencPointDialogMgr;
        _zOrder: number;
        __selfDialog: AntiIndulgencPointDialog;
        init(): boolean;
        getPanel(create?: boolean): AntiIndulgencPointDialog;
    }
    class AntiIndulgencPointDialog extends kaayou.Layer {
        constructor();
        private listNode;
        private closeNode;
        private submitNode;
        private item;
        private listArray;
        initUI(): void;
        pullConfigList(): Promise<void>;
        private submitConfigList;
        Show(bool: boolean): void;
        Hide(): void;
    }
    class AntiIndulgencPointDialogItem {
        constructor(item: cc.Node);
        node: cc.Node;
        private NOMODIFY;
        private index;
        private _info;
        private floor;
        item_pay1: ccui.Layout;
        item_pay2: ccui.Layout;
        input_c1: ccui.TextField;
        input_u2: ccui.TextField;
        cbx_g2: ccui.CheckBox;
        num_g2: ccui.Text;
        cbx_g3: ccui.CheckBox;
        input_ru2: ccui.TextField;
        input_u3: ccui.TextField;
        input_c3: ccui.TextField;
        cbx_g4: ccui.CheckBox;
        input_ru3: ccui.TextField;
        input_u4: ccui.TextField;
        input_c4: ccui.TextField;
        cbx_g5: ccui.CheckBox;
        input_ru4: ccui.TextField;
        input_u5: ccui.TextField;
        input_c5: ccui.TextField;
        cbx_g6: ccui.CheckBox;
        input_ru5: ccui.TextField;
        input_u6: ccui.TextField;
        input_c6: ccui.TextField;
        item_low: ccui.Layout;
        item_l3: ccui.Layout;
        item_l4: ccui.Layout;
        item_l5: ccui.Layout;
        item_l6: ccui.Layout;
        boxapi: any;
        initUI(item: cc.Node): void;
        attachButtonGroup(nodes: Array<ccui.Layout>, attr: any): void;
        disableComponents(...args: Array<ccui.TextField>): void;
        enableComponents(...args: Array<ccui.TextField>): void;
        grayFontColor(hash: string): string;
        check(group: any): boolean;
        initStatus(): void;
        update(): void;
        setInfo(info: any): this;
        setFloor(lv: number): void;
        getInfo(): any;
        initWithNode(node: ccui.Widget): void;
        setIndex(index: number): void;
        getIndex(): number;
    }
}
