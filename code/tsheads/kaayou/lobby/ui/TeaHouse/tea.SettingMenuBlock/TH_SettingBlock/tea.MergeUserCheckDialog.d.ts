declare namespace tea {
    export class tea_MergeUserCheckDialoglMgr {
        static __INS__: tea_MergeUserCheckDialoglMgr;
        static getInstance(zOrder: number): tea_MergeUserCheckDialoglMgr;
        zOrder: number;
        __selfPanel: MergeUserCheckDialog;
        init(): boolean;
        getPanel(create?: boolean): MergeUserCheckDialog;
    }
    class MergeUserCheckDialog extends kaayou.Layer {
        constructor();
        private quan_freeze_status;
        private freeze_success;
        private freeze_fail;
        private quan_ingame_status;
        private ingame_success;
        private ingame_fail;
        private btn_close;
        private SaveButton;
        private resultText;
        initUI(): void;
        initStatus(): void;
        checkStatus(data: any): Promise<void>;
        private hid;
        private passed;
        submit(hid: any): void;
        Hide(): void;
        Show(data: any): void;
    }
    export {};
}
