declare namespace tea {
    export class tea_RecordDialogMgr {
        static __INS__: tea_RecordDialogMgr;
        static getInstance(_zOrder?: number): tea_RecordDialogMgr;
        _zOrder: number;
        __selfDialog: RecordDialog;
        init(): boolean;
        getPanel(create?: boolean): RecordDialog;
    }
    class RecordDialog extends kaayou.Layer {
        constructor();
        btnClose: ccui.Button;
        memberlist: ccui.Layout;
        titleContainer: ccui.Layout;
        initUI(): void;
        setTopSelect(): void;
        watchRole(): void;
        unwatchRole(): void;
        onTeaHouseUpdateInfo(data: tea.Data_HouseInfo): void;
        initListPanel(): void;
        initSelect(): void;
        setTopSelected(index: any): void;
        initTopSelection(): void;
        clean(): void;
        Show(data: any): void;
        Hide(): void;
    }
    export {};
}
