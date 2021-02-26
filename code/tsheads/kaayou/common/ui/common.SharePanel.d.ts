declare namespace common {
    class SharePanel extends kaayou.ModelLayer {
        maskBg: cc.Layer;
        SharePanel: ccui.Layout;
        constructor();
        initUI(): void;
        Show(): void;
        Hide(): void;
    }
}
