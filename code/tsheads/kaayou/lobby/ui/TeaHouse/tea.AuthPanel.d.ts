declare namespace tea {
    export class tea_AuthPanelMgr {
        static __INS__: tea_AuthPanelMgr;
        static getInstance(_zOrder?: number): tea_AuthPanelMgr;
        _zOrder: number;
        __selfDialog: TeaAuthPanel;
        init(): boolean;
        getPanel(create?: boolean): TeaAuthPanel;
    }
    class TeaAuthPanel extends kaayou.Layer {
        constructor();
        ivHead: ccui.ImageView;
        lbID: ccui.TextField;
        lbName: ccui.TextField;
        private listNode;
        private btnClose;
        private submitNode;
        private item;
        private listArray;
        initUI(): void;
        pullConfigList(data: any): Promise<void>;
        private old_right;
        private submitConfigList;
        private _info;
        clean(): void;
        Show(data: any): void;
        Hide(): void;
    }
    export {};
}
