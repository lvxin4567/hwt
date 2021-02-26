declare namespace lobby {
    class ChannelPanelMgr {
        static __INS__: ChannelPanelMgr;
        static getInstance(_zOrder?: number): ChannelPanelMgr;
        __selfPanel: ChannelPanel;
        _zOrder: number;
        init(): boolean;
        getPanel(create?: boolean): ChannelPanel;
        showChannelPanel(data: any): void;
        hideChannelPanel(): void;
    }
    class ChannelPanel extends kaayou.ModelLayer {
        constructor();
        btn_zfb: ccui.Button;
        btn_wx: ccui.Button;
        z_label_product: ccui.Text;
        z_label_money: ccui.Text;
        btn_close: ccui.Button;
        _onSelected: Function;
        _onCancel: Function;
        initUI(): void;
        Show(data: {
            productname: string;
            productmoney: string;
            onSelected: Function;
            onCancel?: Function;
        }): void;
    }
}
