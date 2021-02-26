declare namespace common {
    interface IDIALOG_OPTION {
        title?: string;
        msg: string;
        close?: {
            isShow?: boolean;
            action?: Function;
        };
        btns?: Array<{
            name: string;
            action: Function;
            colorType: string;
        }>;
        isDomText?: boolean;
        localZOrder?: number;
        onshow?: (index: number, dialog: DialogPanel) => void;
        ismutual?: boolean;
        mutualkey?: string;
    }
    class DialogManager {
        static __INS__: DialogManager;
        static getInstance(_zOrder: any): DialogManager;
        private _zOrder;
        private _dialogs;
        private _dialogsIndex;
        init(): boolean;
        DialogShow(data: IDIALOG_OPTION): void;
        GetDialogByMutualKey(mutualKey: any): any;
        DialogHide(data: any): void;
        DialogRemoved(data: {
            index: number;
        }): void;
    }
    class DialogPanel extends kaayou.Layer {
        maskBg: cc.Layer;
        contentPanel: ccui.Layout;
        btnPanel: ccui.Layout;
        btn_close: ccui.Button;
        msgLabel: ccui.Text;
        titleLabel: ccui.Text;
        btnArr: Array<ccui.Button>;
        constructor();
        initUI(): void;
        btnCall: Array<Function>;
        close_call: Function;
        Show(data: IDIALOG_OPTION): boolean;
        private _index;
        private _mutualkey;
        setMutualKey(mutualkey: any): void;
        getMutualKey(): string;
        setIndex(index: number): void;
        getIndex(): number;
        Hide(): void;
    }
}
