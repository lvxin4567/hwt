/**
 *
 * 实名认证面板
 */
declare namespace lobby {
    export class SuggestionPanelMgr {
        static __INS__: SuggestionPanelMgr;
        static getInstance(_zOrder?: number): SuggestionPanelMgr;
        _zOrder: number;
        __selfPanel: SuggestionPanel;
        init(): boolean;
        getPanel(create?: boolean): SuggestionPanel;
    }
    class SuggestionPanel extends kaayou.Layer {
        btnClose: ccui.Button;
        boxAPI: any;
        submit: ccui.Button;
        ErrMsg: ccui.Text;
        input_mail: ccui.TextField;
        icon_wechat: ccui.Button;
        repo_list: ccui.ScrollView;
        reddot: ccui.ImageView;
        renderNode: ccui.Layout;
        btn_feedback: ccui.Button;
        lb_textcount: ccui.Text;
        constructor();
        initUI(): void;
        submitCustomSuggestion(): void;
        initSubmit(): void;
        doCandoSubmit(): {
            phone: any;
            content: any;
        };
        Show(): void;
        Hide({ clean }: {
            clean: any;
        }): void;
    }
    export {};
}
