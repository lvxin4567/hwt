declare namespace common {
    class MajonSkinPanel extends kaayou.ModelLayer {
        maskBg: cc.Layer;
        bgScrollView: ccui.ScrollView;
        mjScrollView: ccui.ScrollView;
        curMod: mod.gameBaseMod<mod.IGame_User_Info, mod.ITableInfo>;
        constructor(ccs: string, mod: mod.gameBaseMod<mod.IGame_User_Info, mod.ITableInfo>);
        initUI(): void;
        bgGroup: RadioGroup;
        mjGroup: RadioGroup;
        initLeftMenu(): void;
        onMenuSelected(e: kaayou.RadioEvent): void;
        Show(): void;
    }
}
