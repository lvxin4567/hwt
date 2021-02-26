declare namespace lobby {
    class CustomerServicePanelMgr {
        static __INS__: CustomerServicePanelMgr;
        static getInstance(_zOrder?: number): CustomerServicePanelMgr;
        __selfPanel: CustomerServicePanel;
        _zOrder: number;
        init(): boolean;
        getPanel(create?: boolean): CustomerServicePanel;
    }
    class CustomerServicePanel extends kaayou.Layer {
        maskBg: cc.Layer;
        contentPanel: ccui.Layout;
        btnPanel: ccui.Layout;
        btn_close: ccui.Button;
        titleLabel: ccui.Text;
        btn_copys: Array<ccui.Button>;
        text_names: Array<ccui.Text>;
        text_wechats: Array<ccui.Text>;
        Telephone: ccui.Text;
        CallButton: ccui.Button;
        constructor();
        initUI(): void;
        Show(): void;
        Hide(): void;
        onWechatUpdate(data: any): void;
    }
}
