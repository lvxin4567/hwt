declare namespace tea {
    class tea_TiredGiveConfirmPanelMgr {
        static __INS__: tea_TiredGiveConfirmPanelMgr;
        static getInstance(_zOrder?: number): tea_TiredGiveConfirmPanelMgr;
        __selfPanel: tea_GiveConfirmPanel;
        _zOrder: number;
        init(): boolean;
        getPanel(create?: boolean): tea_GiveConfirmPanel;
    }
    class tea_GiveConfirmPanel extends kaayou.ModelLayer {
        constructor();
        _data: any;
        btnClose: ccui.Button;
        btnConfirm: ccui.Button;
        ivHead: ccui.ImageView;
        lbUserID: ccui.Text;
        lbUserName: ccui.Text;
        lbMsg: ccui.Text;
        initUI(): void;
        Show(data: any): void;
        Hide(): void;
    }
}
