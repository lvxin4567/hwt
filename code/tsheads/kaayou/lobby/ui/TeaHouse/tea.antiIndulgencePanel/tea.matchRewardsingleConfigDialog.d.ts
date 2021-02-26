declare namespace tea {
    export class tea_matchRewardsingleConfigDialogMgr {
        static __INS__: tea_matchRewardsingleConfigDialogMgr;
        static getInstance(_zOrder?: number): tea_matchRewardsingleConfigDialogMgr;
        _zOrder: number;
        __selfDialog: MatchRewardsingleConfigDialog;
        init(): boolean;
        getPanel(create?: boolean): MatchRewardsingleConfigDialog;
    }
    class MatchRewardsingleConfigDialog extends kaayou.Layer {
        constructor();
        private title;
        private listNode;
        private listArray;
        private closeNode;
        private submitNode;
        private item;
        initUI(): void;
        pullConfigList(): Promise<void>;
        private submitConfigList;
        initList(): void;
        Show(): void;
        Hide(): void;
    }
    export class MatchRewardsingleConfigDialogItem {
        constructor(item: cc.Node);
        node: cc.Node;
        private index;
        private floor;
        private select_container;
        private input_num;
        private texteditor;
        private _info;
        initUI(item: cc.Node): void;
        setRewardInfo(): void;
        setInfo(info: any): void;
        getInfo(): any;
        initWithNode(node: ccui.Widget): void;
        floorFormat(i: any): string;
        setIndex(index: number): void;
        getIndex(): number;
    }
    export {};
}
