declare namespace lobby {
    class MaintainManager {
        static __INS__: MaintainManager;
        static getInstance(): MaintainManager;
        private _Maintains;
        private _MaintainssIndex;
        init(): boolean;
        MaintainShow(data: {
            msg: string;
            code: number;
        }): void;
        MaintainHide(data: any): void;
        MaintainRemoved(data: {
            index: number;
        }): void;
    }
    class MaintainPanel extends kaayou.Layer {
        maskBg: cc.Layer;
        contentPanel: ccui.Layout;
        btnPanel: ccui.Layout;
        msgLabel: ccui.Text;
        btn_exit: ccui.Text;
        exit_Title: ccui.TextBMFont;
        _maintainData: any;
        constructor();
        initUI(): void;
        btnCall: Array<Function>;
        close_call: Function;
        Show(data: {
            code: number;
            msg: string;
        }): void;
        private _index;
        setIndex(index: number): void;
        getIndex(): number;
        Hide(): void;
    }
}
