declare namespace common {
    class MicLayer<IBaseModT extends common.mod.gameBaseMod<mod.IGame_User_Info, mod.ITableInfo>> extends kaayou.Layer {
        minBtn: ccui.Button;
        voicesSp: ccui.ImageView;
        cancelBox: cc.Node;
        effective: boolean;
        mod_game: IBaseModT;
        constructor(minBtn: ccui.Button, mod: IBaseModT);
        _isCancel: boolean;
        initUi(): void;
        curPIndex: number;
        lasttime: number;
        isMicStart: boolean;
        isMicPlayStart: boolean;
        bindEvent(): void;
    }
}
