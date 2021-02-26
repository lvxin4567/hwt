/**
 * 亲友圈分享面板
 */
declare namespace tea {
    class tea_TeaSharePanelMgr {
        static __INS__: tea_TeaSharePanelMgr;
        static getInstance(): tea_TeaSharePanelMgr;
        __selfPanel: SharePanel;
        init(): boolean;
        getPanel(create?: boolean): SharePanel;
    }
    class SharePanel extends kaayou.ModelLayer {
        maskBg: cc.Layer;
        contentPanel: ccui.Layout;
        btn_close: ccui.Button;
        layout_sharemenu: ccui.Layout;
        btn_wx_haoyou: ccui.Button;
        btn_xx: ccui.Button;
        btn_dd: ccui.Button;
        btn_wx_pyq: ccui.Button;
        btn_xl: ccui.Button;
        share_type: common.mod.SHARE_TYPE;
        shareText: string;
        shareTitle: string;
        share_Data: {
            type: common.mod.SHARE_TYPE;
            title?: string;
            text?: string;
            url?: string;
        };
        constructor();
        getPHPJoinTeahouseURL(): string;
        initUI(): void;
        onShow(data: {
            type: common.mod.SHARE_TYPE;
            title?: string;
            text?: string;
            url?: string;
        }): void;
        Hide(): void;
    }
}
