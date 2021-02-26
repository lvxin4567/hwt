/**
 *  隐私设置
 */
declare namespace tea {
    class tea_TeaPrivacyPanelMgr {
        static __INS__: tea_TeaPrivacyPanelMgr;
        static getInstance(_zOrder: number): tea_TeaPrivacyPanelMgr;
        __selfPanel: PrivacyPanel;
        _zOrder: number;
        init(): boolean;
        getPanel(create?: boolean): PrivacyPanel;
    }
    class PrivacyPanel extends kaayou.ModelLayer {
        constructor();
        layout_qptip: ccui.Layout;
        btn_close: ccui.Button;
        btn_hide: ccui.CheckBox;
        cbHID: ccui.CheckBox;
        cbHeadImage: ccui.CheckBox;
        cbTable: ccui.CheckBox;
        cbAddress: ccui.CheckBox;
        initUI(): void;
        onHideChange(): void;
        onHIDChange(): void;
        onHeadImageChange(): void;
        onTableChange(): void;
        onAddressChange(): void;
        doMemHide(b: any): void;
        doHIDHide(b: any): void;
        doHeadImageHide(b: any): void;
        doTableHide(b: any): void;
        doAddressHide(b: any): void;
        onTeaHouseUpdateInfo(): void;
        Show(): void;
        Hide(): void;
    }
}
