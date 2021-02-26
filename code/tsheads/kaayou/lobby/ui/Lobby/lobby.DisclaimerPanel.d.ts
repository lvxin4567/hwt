declare namespace lobby {
    class DisclaimerPanel extends kaayou.ModelLayer {
        constructor();
        viewScroll: ccui.ScrollView;
        btn_ok: ccui.Button;
        initUI(): void;
        show(data: {
            isnew: boolean;
            cardNum: number;
        }): void;
        Hide(): void;
    }
}
