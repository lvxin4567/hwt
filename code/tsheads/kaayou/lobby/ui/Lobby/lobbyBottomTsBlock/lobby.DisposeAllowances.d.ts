/**
*
* 低保界面
*/
declare namespace lobby {
    class lobby_DisposeAllowancesMgr {
        static __INS__: lobby_DisposeAllowancesMgr;
        static getInstance(_zOrder?: number): lobby_DisposeAllowancesMgr;
        __selfPanel: DisposeAllowancesPanel;
        _zOrder: number;
        init(): boolean;
        getPanel(create?: boolean): DisposeAllowancesPanel;
    }
    class DisposeAllowancesPanel extends kaayou.Layer {
        maskBg: cc.Layer;
        btn_close: ccui.Button;
        btn_sure: ccui.Button;
        label_content: ccui.Text;
        contentPanel: ccui.Layout;
        label_Count: ccui.Text;
        constructor();
        initUI(): void;
        show(data: proto_disposeallowances_ntf_res): void;
        _data: any;
        onHide(): void;
    }
}
