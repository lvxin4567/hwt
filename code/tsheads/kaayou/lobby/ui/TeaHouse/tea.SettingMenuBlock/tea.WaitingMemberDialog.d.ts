declare namespace tea {
    class tea_WaitingMemberDialogMgr {
        static __INS__: tea_WaitingMemberDialogMgr;
        static getInstance(_zOrder?: number): tea_WaitingMemberDialogMgr;
        _zOrder: number;
        __selfDialog: WaitingMemberDialog;
        init(): boolean;
        getPanel(create?: boolean): WaitingMemberDialog;
    }
    class WaitingMemberDialog extends kaayou.Layer {
        constructor();
        private listNode;
        private closeNode;
        private submitNode;
        private item;
        private listArray;
        initUI(): void;
        /**
         * 茶楼楼层修改等待人数
housefloorwaitnumset
hid    int
floors_map   object  {fid:num} {123:99, 234: 99}

茶楼楼层修改等待人数
housefloorwaitnumget
hid    int
 服务器返回：
housefloorwaitnumget
hid    int
floors_map   object  {fid:num} {123:99, 234: 99}
         *
         */
        pullConfigList(): Promise<void>;
        private submitConfigList;
        isCreator(): boolean;
        Show(): void;
        Hide(): void;
    }
    class WaitingMemberDialogItem {
        constructor(item: cc.Node);
        node: cc.Node;
        private index;
        private inputCache;
        private floor;
        private _info;
        initUI(item: cc.Node): void;
        private attachTextEdit;
        flush(): void;
        setInfo({ fid, hc, floor }: {
            fid: any;
            hc: any;
            floor: any;
        }): void;
        getInfo(): {
            hc: any;
            fid: any;
            floor: any;
        };
        initWithNode(node: ccui.Widget): void;
        setIndex(index: number): void;
        getIndex(): number;
    }
}
