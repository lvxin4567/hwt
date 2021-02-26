declare namespace common {
    class MajonSettingPanel extends kaayou.ModelLayer {
        bgm_CheckBox: ccui.CheckBox;
        effect_CheckBox: ccui.CheckBox;
        yuyan: ccui.Layout;
        closeBtn: ccui.Button;
        majonModel: ccui.Layout;
        constructor(ccs: string, moduleName: string);
        initUI(): void;
        onToggleClick(event: kaayou.CheckEvent): void;
        onLanagueClick(event: kaayou.CheckEvent): void;
        onMajonModelClick(event: kaayou.CheckEvent): void;
        resetFangYanStatue(): void;
        resetMajonModel(): void;
        onMenuSelected(e: kaayou.RadioEvent): void;
        Show(): void;
    }
}
