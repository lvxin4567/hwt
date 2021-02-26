declare namespace lobby {
    class JoinRoomPanelMgr {
        static __INS__: JoinRoomPanelMgr;
        static getInstance(_zOrder?: number): JoinRoomPanelMgr;
        __selfPanel: JoinRoomPanel;
        _gold: number;
        _zOrder: number;
        onUpdateUserInfo(data: Data_Uerinfo): void;
        init(): boolean;
        getPanel(create?: boolean): JoinRoomPanel;
    }
    class JoinRoomPanel extends kaayou.ModelLayer {
        lable_Nums: Array<ccui.TextBMFont>;
        _curNums: string;
        constructor();
        btn_close: ccui.Button;
        initUI(): void;
        resetLabel(): void;
        onResetClick(e: kaayou.TouchEvent): void;
        onDeleteClick(e: kaayou.TouchEvent): void;
        onNumsClick(e: kaayou.TouchEvent): void;
        addNums(nums: number): void;
        subNums(): void;
        doNumShow(): void;
        bindEvent(): void;
        Show(): void;
        Hide(): void;
    }
}
