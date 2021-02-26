declare namespace lobby {
    class RuleIntroducePanel extends kaayou.ModelLayer {
        constructor();
        ruleMenuLayout: ccui.ScrollView;
        ruleBtnMode: ccui.CheckBox;
        menuGroup: common.RadioGroup;
        topbarMgr: lobby.TopBarMgr;
        initUI(): void;
        doSetData(): void;
        updateMenu(): void;
        onMenuSelected(e: kaayou.RadioEvent): void;
        onMenuUnSelected(e: kaayou.RadioEvent): void;
        Show(): void;
        Hide(): void;
    }
}
