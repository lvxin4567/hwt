/**
 *
 * 分享面板
 */
declare namespace lobby {
    class ShareModelPanelMgr {
        static __INS__: ShareModelPanelMgr;
        static getInstance(_zOrder?: number): ShareModelPanelMgr;
        __selfPanel: ShareModelPanel;
        _zOrder: number;
        init(): boolean;
        getPanel(create?: boolean): ShareModelPanel;
    }
    class ShareModelPanel extends kaayou.Layer {
        maskBg: cc.Layer;
        contentPanel: ccui.Layout;
        btn_close: ccui.Button;
        btn_wx_haoyou: ccui.Button;
        btn_wx_pyq: ccui.Button;
        btn_dd: ccui.Button;
        btn_xl: ccui.Button;
        btn_xx: ccui.Button;
        share_data: {
            type: common.mod.SHARE_TYPE;
            title?: string;
            text?: string;
            url?: string;
        };
        layout_sharemenu: ccui.Layout;
        constructor();
        initUI(): void;
        onConfigUpdate(): void;
        Show(data: {
            type: common.mod.SHARE_TYPE;
            title?: string;
            text?: string;
            url?: string;
        }): void;
        Hide(): void;
    }
}
