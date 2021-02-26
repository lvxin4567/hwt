/**
 *
 * 实名认证面板
 */
declare namespace lobby {
    class RealNameMgr {
        static __INS__: RealNameMgr;
        static getInstance(_zOrder?: number): RealNameMgr;
        _zOrder: number;
        private _renamePanel;
        __selfPanel: RealNamePanel;
        init(): boolean;
        getPanel(create?: boolean): RealNamePanel;
    }
    class RealNamePanel extends kaayou.Layer {
        btnClose: ccui.Button;
        btnPanel: ccui.Layout;
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
        btn_immediately: ccui.Button;
        boxAPI: any;
        constructor();
        initUI(): void;
        doCandoRealName(): void;
        Show(): void;
        Hide(): void;
    }
}
