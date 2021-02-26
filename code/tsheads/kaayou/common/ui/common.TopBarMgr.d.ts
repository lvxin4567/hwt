declare namespace common {
    class TopBarMgr {
        node: cc.Node;
        btn_close: ccui.Button;
        lable_topbar_title: ccui.TextBMFont;
        constructor(node: ccui.Widget);
        InitUI(): void;
        onBindEvent(): void;
        setTitle(t: string): void;
        __onCloseClick: Function;
        setOnCloseClick(f: Function): void;
        onCloseClick(): void;
        __onAddCardClick: Function;
        setOnAddCardClick(f: Function): void;
        onAddCardClick(): void;
        __onAddGoldClick: Function;
        setOnAddGoldClick(f: Function): void;
        onAddGoldClick(): void;
        __onAddBeanClick: Function;
        setOnAddBeanClick(f: Function): void;
        onAddBeanClick(): void;
        setBeanVisibel(v: boolean): void;
        setCardVisibel(v: boolean): void;
        setGoldVisibel(v: boolean): void;
        setBeanBtnVisibel(v: boolean): void;
        setCardBtnVisibel(v: boolean): void;
        setGoldBtnVisibel(v: boolean): void;
        doRightLayout(): void;
    }
}
