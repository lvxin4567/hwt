declare namespace tea {
    class tea_MessageBoxMgr {
        static __INS__: tea_MessageBoxMgr;
        static getInstance(): tea_MessageBoxMgr;
        __selfPanel: MessageBox;
        init(): boolean;
        getPanel(create?: boolean): MessageBox;
    }
    class MessageBox extends kaayou.ModelLayer {
        prfRow: ccui.Layout;
        constructor();
        btnClose: ccui.Button;
        svMessage: ccui.ScrollView;
        initUI(): void;
        getMessage(clear?: boolean): void;
        private createCell;
        updateList(data: any): void;
        Show(): void;
        Hide(): void;
    }
}
