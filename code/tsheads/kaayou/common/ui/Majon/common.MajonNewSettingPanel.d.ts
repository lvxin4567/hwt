declare namespace common {
    class MajonNewSettingPanel extends kaayou.ModelLayer {
        bgm_CheckBox: ccui.CheckBox;
        effect_CheckBox: ccui.CheckBox;
        closeBtn: ccui.Button;
        yuyan: cc.Node;
        paibei: cc.Node;
        zhuobu: cc.Node;
        majonModel: cc.Node;
        constructor(ccs: string, moduleName: string);
        initUI(): void;
        onToggleClick(event: kaayou.CheckEvent): void;
        onLanagueClick(event: kaayou.CheckEvent): void;
        onPaiBeiClick(event: kaayou.CheckEvent): void;
        onZhuoBuClick(event: kaayou.CheckEvent): void;
        onMajonModelClick(event: kaayou.CheckEvent): void;
        resetFangYanStatue(): void;
        resetMajonModel(): void;
        resetPaiBeiModel(): void;
        resetZhuoBuModel(): void;
        onMenuSelected(e: kaayou.RadioEvent): void;
        Show(): void;
    }
}
