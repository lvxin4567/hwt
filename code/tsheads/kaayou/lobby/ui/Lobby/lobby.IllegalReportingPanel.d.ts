/**
 *
 * 实名认证面板
 */
declare namespace lobby {
    class IllegalReportingPanelMgr {
        static __INS__: IllegalReportingPanelMgr;
        static getInstance(_zOrder?: number): IllegalReportingPanelMgr;
        _zOrder: number;
        __selfPanel: IllegalReportingPanel;
        init(): boolean;
        getPanel(create?: boolean): IllegalReportingPanel;
    }
    class IllegalReportingPanel extends kaayou.Layer {
        btnClose: ccui.Button;
        btnPanel: ccui.Layout;
        contentPanel: ccui.Layout;
        boxAPI: any;
        mailErr: cc.Sprite;
        input_mail: ccui.TextField;
        input_content: ccui.TextField;
        maskBg: ccui.Layout;
        submit: ccui.Button;
        mailRight: cc.Sprite;
        constructor();
        initUI(): void;
        initSubmit(): void;
        doCandoSubmit(): void;
        Show(): void;
        Hide({ clean }: {
            clean: any;
        }): void;
    }
}
