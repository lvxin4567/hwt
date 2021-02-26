declare namespace tea {
    class tea_ProportionBindDialogMgr {
        static __INS__: tea_ProportionBindDialogMgr;
        static getInstance(zOrder: number): tea_ProportionBindDialogMgr;
        zOrder: number;
        __selfPanel: ProportionBindDialog;
        init(): boolean;
        getPanel(create?: boolean): ProportionBindDialog;
    }
    class ProportionBindDialog extends kaayou.Layer {
        constructor();
        private searchNode;
        private searchBtn;
        private searchText;
        private memberList;
        private cloneNode;
        private prevBtn;
        private prevNum;
        private nextBtn;
        private nextNum;
        private PHText;
        private _index;
        private pageN;
        private searchStr;
        private texteditor;
        initUI(): void;
        private initInput;
        private setPageNum;
        private initList;
        private parnterid;
        private pullList;
        private renderList;
        private search;
        Show({ parnterid }: {
            parnterid: any;
        }): void;
        Hide(): void;
    }
}
