declare namespace lobby {
    class SignPanel extends kaayou.Layer {
        constructor();
        maskBg: cc.Layer;
        contentPanel: ccui.Layout;
        step: number;
        initUI(): void;
        showLoginDay(data: any): void;
        sendBtnType(type: number): void;
        Show(data: {
            step: number;
            rewards: Array<Array<{
                wealth_type: number;
                num: number;
            }>>;
        }): void;
        Hide(): void;
    }
}
