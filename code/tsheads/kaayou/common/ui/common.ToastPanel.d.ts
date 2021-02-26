declare namespace common {
    class ToastPanel extends kaayou.Layer {
        maskBg: cc.Layer;
        contentPanel: ccui.Layout;
        msgLabel: ccui.Text;
        constructor();
        initUI(): void;
        show(data: {
            msg: string;
            time: number;
            mask: boolean;
        }): boolean;
    }
}
