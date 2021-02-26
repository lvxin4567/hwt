declare namespace tea {
    class tea_VIPFloorConfigDialogMgr {
        static __INS__: tea_VIPFloorConfigDialogMgr;
        static getInstance(_zOrder?: number): tea_VIPFloorConfigDialogMgr;
        _zOrder: number;
        __selfDialog: VIPFloorConfigDialog;
        init(): boolean;
        getPanel(create?: boolean): VIPFloorConfigDialog;
    }
    class VIPFloorConfigDialog extends kaayou.Layer {
        constructor();
        private listNode;
        private list;
        private closeNode;
        private item;
        private submit;
        initUI(): void;
        setFloorNumByFid(fid: number, vipnum: number): void;
        submitList(): Promise<void>;
        Show(data: any): void;
        Hide(): void;
    }
}
