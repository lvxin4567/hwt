declare namespace common {
    class GPSLayer extends kaayou.Layer {
        _curMod: mod.friendBaseMod<mod.IFriendGame_User_Info>;
        closeBtn: ccui.Button;
        safeDis: number;
        nameText: Array<ccui.Text>;
        disText: Array<Array<ccui.Text>>;
        ctx: any;
        greenColor: cc.Color;
        redColor: cc.Color;
        grayColor: cc.Color;
        playerNode: cc.Node;
        playerNodeArr: Array<cc.Node>;
        constructor(ccs: string, curMod?: common.mod.friendBaseMod<common.mod.IFriendGame_User_Info>);
        initUI(): void;
        cleanUp(): void;
        getSafeDistance(): number;
        setInfo(data: {
            Players: Array<mod.IGame_User_Info>;
            maxPlayer: number;
        }): void;
        showDistance(from: number, to: number, dis: number, type: number, sameIp: boolean): void;
        getDistance(longitude1: any, latitude1: any, longitude2: any, latitude2: any): number;
        Rad(d: any): number;
        Show(data: {
            Players: Array<mod.IGame_User_Info>;
            maxPlayer: number;
        }): void;
    }
}
