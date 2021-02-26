declare namespace common {
    class DebugPanel extends kaayou.Layer {
        btnClear: ccui.Button;
        btnClose: ccui.Button;
        checkIndex: number;
        contentPanel: ccui.Layout;
        isChecking: boolean;
        maskBg: cc.Layer;
        msg: string;
        packageUrl: string;
        result: number;
        svPanel: ccui.ScrollView;
        msgLabel: ccui.Text;
        constructor();
        hide(): void;
        initUI(): void;
        check(): Promise<void>;
        ShowMsg(data: {
            msg: string;
            code?: number;
        }): void;
        startCheck(): Promise<void>;
        show(data: {
            msg: string;
            code: number;
            changeLine?: boolean;
        }): boolean;
    }
}
