/**
 *
 * 实名认证面板
 */
declare namespace lobby {
    export class SuggestionFeedbackPanelMgr {
        static __INS__: SuggestionFeedbackPanelMgr;
        static getInstance(_zOrder?: number): SuggestionFeedbackPanelMgr;
        _zOrder: number;
        __selfPanel: SuggestionFeedbackPanel;
        init(): boolean;
        getPanel(create?: boolean): SuggestionFeedbackPanel;
    }
    class SuggestionFeedbackPanel extends kaayou.Layer {
        btnClose: ccui.Button;
        suggestion_container: any;
        feedback_item: ccui.Layout;
        submit: ccui.Button;
        btn_close: ccui.Button;
        constructor();
        initUI(): void;
        renderFeedbackList({ data }: {
            data: any;
        }): void;
        Show(): void;
        Hide(): void;
    }
    export {};
}
