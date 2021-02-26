namespace common {
    const { BindEvent, doBindEvent } = kaayou._decorator;

    //观战层
    export abstract class WatchLayer extends kaayou.Block {
        btn_watch: Array<ccui.Button> = null;
        btn_watch_player: ccui.Button = null;
        curMod: common.mod.friendBaseMod<common.mod.IFriendGame_User_Info> = null;
        list_watch_playerBg: ccui.ImageView = null;
        list_watch_player: ccui.ScrollView = null;
        cellStr: string = "";
        maxShowCount: number = 0;

        @doBindEvent
        initUI(node: ccui.Widget, curMod: common.mod.friendBaseMod<common.mod.IFriendGame_User_Info>) {
            this.curMod = curMod;
            super.initWithNodeNoClone(node);
            this.btn_watch = []
            for (let i = 1; i < 8; i++) {
                this.btn_watch[i] = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_watch_" + i);
                if (this.btn_watch[i]) {
                    this.btn_watch[i].setTag(i);
                    this.btn_watch[i].on(kaayou.TouchEvent.TouchEnd, this.onWatchTouch, this);
                }
            }

            this.btn_watch_player = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_watch_player");
            this.btn_watch_player.on(kaayou.TouchEvent.TouchEnd, () => {
                let show = !this.list_watch_playerBg.visible
                this.list_watch_playerBg.setVisible(show);
                if (show) {
                    this.curMod.sendGetGuestList();
                }
            }, this);
            kaayou.getController(this.curMod.getModuleName()).on("ui::watchLayer::onTableInfo", this.onTableInfo, this);
            kaayou.getController(this.curMod.getModuleName()).on("ui::watchLayer::getGuestList", this.showGuest, this);
            kaayou.getController(this.curMod.getModuleName()).on("ui::watchLayer::hideWatchPlayerList", () => {
                this.list_watch_playerBg.setVisible(false);
            }, this);
        }

        initPropertity(cellStr: string, maxShowCount: number) {
            this.cellStr = cellStr;
            this.maxShowCount = maxShowCount;
            this.list_watch_playerBg = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "list_watch_playerBg");
            this.list_watch_player = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "list_watch_player");
            this.list_watch_player.setAnchorPoint(0, 1);
            this.list_watch_playerBg.setVisible(false);
            this.list_watch_player.setVertical(ccui.Layout.LayoutVertical.TOP)
            this.list_watch_player.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Vertical);
            this.list_watch_player.setPadding({ spacingY: 10 });
        }

        showGuest(e: kaayou.Event) {
            // showGuest() {
            // let data = this.curMod.tableInfo["lookonperson"];
            // data = lodash.pull(data, null);
            let data: Array<common.mod.WatcherListItem> = e.data;
            if (!data) {
                data = [];
            }
            for (let i = 0; i < this.maxShowCount; i++) {
                let cell = <WatchCell>this.list_watch_player.children[i];
                if (i < data.length) {
                    if (!cell) {
                        cell = new WatchCell(this.cellStr);
                        this.list_watch_player.addChild(cell);
                    }
                    cell.setVisible(true);
                    cell.doSetInfo(data[i]);
                } else {
                    if (cell) {
                        cell.setVisible(false);
                    }
                }
            }
            this.list_watch_player.doChildrenLayout();
        }

        onTableInfo() {
            if (!this.curMod) { return; }
            // this.setVisible(this.curMod.getIsGuest());
            let players = this.curMod.toArrayPlayer();
            for (let i = 1; i < players.length; i++) {
                if (!players[i]) {
                    this.btn_watch[i].setVisible(false);
                    continue;
                }
                this.btn_watch[i].setVisible(this.curMod.getIsGuest());
            }
            this.list_watch_playerBg.setVisible(false);
        }

        onWatchTouch(e: kaayou.Event) {
            if (!this.curMod) { return; }
            let players = this.curMod.toArrayPlayer();
            let playerInfo = players[e.target.getTag()];
            // console.log("设置游客座位号:", chair);
            // this.curMod.setServerChair(playerInfo.seat);
            // let playerss = this.curMod.toArrayPlayer();
            // kaayou.emit(this.curMod.getModuleName(), "ui::Scene::onWatchTouch", { Players: playerss });
            if (playerInfo) {
                this.curMod.sendGuestSwitch(playerInfo.seat);
            } else {
                console.error("为找到玩家信息");
            }
        }

        Hide() {
            // this.list_watch_player.setVisible(false);
        }
    }

    export class WatchCell extends kaayou.Block {
        icon: ccui.ImageView = null;
        userName: ccui.Text = null;
        userId: ccui.Text = null;

        constructor(cellStr: string) {
            super();
            this.initWithccs(cellStr);
            this.icon = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "watch_icon");
            this.userName = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "username");
            this.userId = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "userid");
        }

        doSetInfo(playerInfo: common.mod.WatcherListItem) {
            NetImage.setPlayerHead(this.icon, playerInfo.imageurl, playerInfo.sex, playerInfo.uid);
            this.userName.setString(playerInfo.name);
            this.userId.setString("ID:" + playerInfo.uid);
        }
    }
}