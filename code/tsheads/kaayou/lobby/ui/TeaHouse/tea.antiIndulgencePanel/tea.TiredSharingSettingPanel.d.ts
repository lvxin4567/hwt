declare namespace tea {
    class tea_TiredSharingSettingPanelMgr {
        static __INS__: tea_TiredSharingSettingPanelMgr;
        static getInstance(_zOrder?: number): tea_TiredSharingSettingPanelMgr;
        __selfPanel: tea_TiredSharingSettingPanel;
        _zOrder: number;
        init(): boolean;
        getPanel(create?: boolean): tea_TiredSharingSettingPanel;
    }
    class tea_TiredSharingSettingPanel extends kaayou.ModelLayer {
        constructor();
        btn_close: ccui.Button;
        btnSave: ccui.Button;
        ebInput: any;
        iMethod: number;
        iQuantity: number;
        lbAA: ccui.Text;
        lbBigWin: ccui.Text;
        lbQuantity: ccui.Text;
        ndMethod: ccui.ImageView;
        radioGroup: common.RadioGroup;
        initUI(): void;
        selectRadio(index: any): void;
        Show(): void;
        ShowData(): void;
        Hide(): void;
        ShowNumber(data: any): void;
        ReturnToMiddle(): void;
    }
}
