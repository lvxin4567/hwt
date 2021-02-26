declare namespace common {
    class FewerOpen extends kaayou.Layer {
        successBtn: ccui.Button;
        cancelBtn: ccui.Button;
        _timeText: ccui.Text;
        _tishiBg: cc.Sprite;
        _waitNode: cc.Sprite;
        _pNode: ccui.Layout;
        _pBoxs: Array<cc.Node>;
        _t: any;
        _overTime: number;
        _curmod: common.mod.friendBaseMod<common.mod.IFriendGame_User_Info>;
        constructor(ccs: string, mod: common.mod.friendBaseMod<common.mod.IFriendGame_User_Info>);
        initUi(): void;
        show(data: {
            Players: Array<mod.IFriendGame_User_Info>;
            myServerchair: number;
            isCan: boolean;
            srkjNum: number;
            isShow: boolean;
        }): void;
        cleanUp(): void;
        close(): void;
        updateInfo(players: Array<mod.IFriendGame_User_Info>, myServerchair: number): void;
        updatePlayer(players: Array<mod.IFriendGame_User_Info>): void;
    }
}
