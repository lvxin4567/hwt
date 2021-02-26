declare namespace tea {
    class tea_AddMemberDialogMgr {
        static __INS__: tea_AddMemberDialogMgr;
        static getInstance(zOrder: number): tea_AddMemberDialogMgr;
        zOrder: number;
        __selfPanel: addMemberDialog;
        init(): boolean;
        getPanel(create?: boolean): addMemberDialog;
    }
    class addMemberDialog extends kaayou.Layer {
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
        private texteditor;
        initUI(): void;
        private initInput;
        private setPageNum;
        private initList;
        private pullList;
        private getUserCount;
        private renderList;
        private search;
        Show(): void;
        Hide(): void;
    }
}
