/**
 *  隐私设置
 */
declare namespace tea {
    class tea_TeaFcmWareHousePopPanelMgr {
        static __INS__: tea_TeaFcmWareHousePopPanelMgr;
        static getInstance(_zOrder?: number): tea_TeaFcmWareHousePopPanelMgr;
        __selfPanel: teaFcmWhPopPanel;
        _zOrder: number;
        init(): boolean;
        getPanel(create?: boolean): teaFcmWhPopPanel;
    }
    class teaFcmWhPopPanel extends kaayou.ModelLayer {
        constructor();
        btn_close: ccui.Button;
        btn_submit: ccui.Button;
        label_Num: ccui.Text;
        wmHouseData: Data_FcmWarehouseRes;
        initUI(): void;
        ShowNumber(data: any): void;
        ReturnToMiddle(): void;
        Show(data: Data_FcmWarehouseRes): void;
        Hide(): void;
    }
}
