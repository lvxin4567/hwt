declare namespace tea {
    export class tea_AcPriSetMgr {
        static __INS__: tea_AcPriSetMgr;
        static getInstance(_zOrder?: number): tea_AcPriSetMgr;
        _zOrder: number;
        __selfDialog: acPriSetPanel;
        init(): boolean;
        getPanel(create?: boolean): acPriSetPanel;
    }
    class acPriSetPanel extends kaayou.Layer {
        constructor();
        private listNode;
        private listArray;
        private closeNode;
        private submitNode;
        private item;
        initUI(): void;
        private submitConfigList;
        initList(data: any): void;
        configArr: Array<Data_RewordInfo>;
        Show(data: any): void;
        Hide(): void;
    }
    export class priSetItem {
        constructor(item: cc.Node);
        node: cc.Node;
        private index;
        private floor;
        private input_num;
        private texteditor;
        private _info;
        initUI(item: cc.Node): void;
        setInfo(info: any): void;
        getInfo(): any;
        initWithNode(node: ccui.Widget): void;
        floorFormat(i: any): string;
        setIndex(index: number): void;
        getIndex(): number;
    }
    export {};
}
