declare namespace tea {
    class tea_AntiIndulgencePanelControlDialogMgr {
        static __INS__: tea_AntiIndulgencePanelControlDialogMgr;
        static getInstance(_zOrder?: number): tea_AntiIndulgencePanelControlDialogMgr;
        _zOrder: number;
        __selfDialog: AntiIndulgencePanelControlDialog;
        init(): boolean;
        getPanel(create?: boolean): AntiIndulgencePanelControlDialog;
    }
    class AntiIndulgencePanelControlDialog extends kaayou.Layer {
        constructor();
        private listNode;
        private closeNode;
        private submitNode;
        private item;
        private listArray;
        initUI(): void;
        pullConfigList(): Promise<void>;
        private submitConfigList;
        private _record;
        private snapshot;
        Show(bool: boolean): void;
        Hide(): void;
    }
    class AntiIndulgencePanelControlDialogItem {
        constructor(item: cc.Node);
        node: cc.Node;
        private index;
        private _list;
        private _MAX;
        private antiIndu_node;
        private gamepause_node;
        private join_limit_inode;
        private pause_inode;
        private _info;
        private join_limit_input;
        private pause_inode_input;
        private floor;
        private ph;
        initUI(item: cc.Node): void;
        private attachCheckBox;
        private attachTextEdit;
        private getChild;
        private limitOper;
        initEvent(): void;
        setVitamin(b: boolean): void;
        setPauseConfig(b: boolean): void;
        toggleVitaminlowlimit(b: boolean): void;
        toggleVitaminlowlimitpause(b: boolean): void;
        setVitaminlowlimit(val: number): void;
        setVitaminlowlimitpause(val: number): void;
        setFid(di: number): this;
        setFloor(lv: number): void;
        initInfo(info: {
            fid: number;
            isvitamin?: boolean;
            isgamepause?: boolean;
            vitaminlowlimit?: number;
            vitaminlowlimitpause?: number;
        }): this;
        getInfo(): any;
        initWithNode(node: ccui.Widget): void;
        appendTo(parent: cc.Node, index: any, list?: any): void;
        setInfo(info: {
            isvitamin?: boolean;
            isgamepause?: boolean;
            vitaminlowlimit?: number;
            vitaminlowlimitpause?: number;
        }): this;
        setIndex(index: number): void;
        getIndex(): number;
    }
}
