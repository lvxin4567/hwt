declare namespace tea {
    enum MergeUserDialogType {
        NONE = 0,
        QUAN_OP = 1,
        QUAN_MODIFY = 2,
        QUAN_TIP = 3
    }
    enum MERGE_TASK_TYPE {
        SAME_SCENE = 0,
        OTHER_SCENE = 1
    }
    export class tea_MergeUserDialoglMgr {
        static MergeUserDialogType: typeof MergeUserDialogType;
        static __INS__: tea_MergeUserDialoglMgr;
        static getInstance(zOrder?: number): tea_MergeUserDialoglMgr;
        zOrder: number;
        __selfPanel: MergeUserDialog;
        init(): void;
        getPanel(): MergeUserDialog;
        static scenehook: any[];
        runningScene: string;
        static TASK_TYPE: typeof MERGE_TASK_TYPE;
        static sceneWatcher(tid: any, mask: any, taskType: any, task: any): void;
        static removeWatcher(tid: any): void;
    }
    class MergeUserDialog extends kaayou.Layer {
        constructor();
        static tasks: {
            __all__: {};
        };
        private agreePanel;
        private confirmPanel;
        private tipPanel;
        private contentPanel;
        private btn_close;
        _hash_id: any;
        initUI(): void;
        configDialog(data: any): void;
        private initDialog;
        opDialog(data: any): void;
        modifyDialog(data: any): void;
        tipDialog(data: any): void;
        private cleanAllDialogWithLinkid;
        Hide(): void;
        private getPanelByHash;
        Show(data: any): void;
    }
    export {};
}
