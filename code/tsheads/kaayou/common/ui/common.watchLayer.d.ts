declare namespace common {
    abstract class WatchLayer extends kaayou.Block {
        btn_watch: Array<ccui.Button>;
        btn_watch_player: ccui.Button;
        curMod: common.mod.friendBaseMod<common.mod.IFriendGame_User_Info>;
        list_watch_playerBg: ccui.ImageView;
        list_watch_player: ccui.ScrollView;
        cellStr: string;
        maxShowCount: number;
        initUI(node: ccui.Widget, curMod: common.mod.friendBaseMod<common.mod.IFriendGame_User_Info>): void;
        initPropertity(cellStr: string, maxShowCount: number): void;
        showGuest(e: kaayou.Event): void;
        onTableInfo(): void;
        onWatchTouch(e: kaayou.Event): void;
        Hide(): void;
    }
    class WatchCell extends kaayou.Block {
        icon: ccui.ImageView;
        userName: ccui.Text;
        userId: ccui.Text;
        constructor(cellStr: string);
        doSetInfo(playerInfo: common.mod.WatcherListItem): void;
    }
}
