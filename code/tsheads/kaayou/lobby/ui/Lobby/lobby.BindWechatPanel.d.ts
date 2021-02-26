/**
 *
 * 绑定微信面板
 */
declare namespace lobby {
    class lobby_BindWechatMgr {
        static __INS__: lobby_BindWechatMgr;
        static getInstance(): lobby_BindWechatMgr;
        __selfPanel: BindWechatPanel;
        init(): boolean;
        getPanel(create?: boolean): BindWechatPanel;
    }
    class BindWechatPanel extends kaayou.Layer {
        maskBg: cc.Layer;
        btn_close: ccui.Button;
        btn_bind: ccui.Button;
        constructor();
        initUI(): void;
        show(): void;
        onHide(): void;
    }
}
