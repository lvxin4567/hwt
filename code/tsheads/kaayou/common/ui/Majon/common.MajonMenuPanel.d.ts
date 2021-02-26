declare namespace common {
    class MajonMenuPanel extends kaayou.ModelLayer {
        btn_setting: ccui.Button;
        btn_skin: ccui.Button;
        btn_exit: ccui.Button;
        curMod: mod.gameBaseMod<mod.IGame_User_Info, mod.ITableInfo>;
        constructor(ccsName: string, mod: mod.gameBaseMod<mod.IGame_User_Info, mod.ITableInfo>);
        initUI(): void;
        bindUiEvent(): void;
        Show(): void;
    }
}
