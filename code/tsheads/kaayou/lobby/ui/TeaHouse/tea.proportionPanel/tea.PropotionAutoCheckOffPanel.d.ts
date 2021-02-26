declare namespace tea {
    class PropotionAutoCheckOff {
        _page: cc.Node;
        _index: number;
        checkBoxSwitch: ccui.Layout;
        autoRadioGroup: common.RadioGroup;
        cIndex: number;
        Destips: ccui.ImageView;
        tips_Image: ccui.ImageView;
        setIndex(index: any): this;
        getIndex(): number;
        onSubpageChange(e: kaayou.Event): void;
        _isInitPull: boolean;
        reset(): void;
        refleshCheckUI(payCheck: any): void;
        initWithNode(page: cc.Node): void;
    }
}
