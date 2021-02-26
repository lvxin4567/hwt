declare namespace lobby {
    class ForeignIPPanelMgr {
        static __INS__: ForeignIPPanelMgr;
        static getInstance(_zOrder?: number): ForeignIPPanelMgr;
        _zOrder: number;
        private _renamePanel;
        __selfPanel: ForeignIPPanel;
        init(): boolean;
        getPanel(create?: boolean): ForeignIPPanel;
    }
    class ForeignIPPanel extends kaayou.Layer {
        btnClose: ccui.Button;
        ivBg: ccui.ImageView;
        contentPanel: ccui.Layout;
        ebIdCard: any;
        ebName: any;
        lbIdCardErr: ccui.Text;
        lbNameErr: ccui.Text;
        maskBg: cc.Layer;
        ndIdCard: cc.Layer;
        ndName: cc.Layer;
        msgLabel: ccui.Text;
        edx_name: ccui.TextField;
        edx_cert: ccui.TextField;
        boxAPI: any;
        constructor();
        initUI(): void;
        Show(url: any): void;
        Hide(): void;
    }
}
