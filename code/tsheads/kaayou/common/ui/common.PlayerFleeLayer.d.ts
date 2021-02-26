declare namespace common {
    class PlayerFleeLayer extends kaayou.Layer {
        _curmod: common.mod.friendBaseMod<common.mod.IFriendGame_User_Info>;
        bg: cc.Sprite;
        infoLabel: ccui.Text;
        bg1: cc.Sprite;
        infoLabel1: ccui.Text;
        _overTime: number;
        timer: number;
        constructor(ccs: string, mod: common.mod.friendBaseMod<common.mod.IFriendGame_User_Info>);
        initUi(): void;
        ReEnter(): void;
        onMyExit(): void;
        minName: string;
        tmpArr: Array<{
            name: string;
            index: number;
        }>;
        show(data: {
            fleeinfo: Array<{
                name: string;
                index: number;
                hasExit: boolean;
            }>;
            time: number;
            minName: string;
        }): void;
        close(): void;
        onSetInfo(data: {
            fleeinfo: Array<{
                name: string;
                index: number;
                hasExit: boolean;
            }>;
            time: number;
            minName: string;
        }): void;
        curShowName: string;
        cb(): void;
        updateOfflineTime(): void;
        update(dt: any): void;
        changeStoM(time: number): string;
    }
}
