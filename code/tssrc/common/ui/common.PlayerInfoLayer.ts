namespace common {
    export abstract class PlayerInfoLayer extends kaayou.ModelLayer {

        _curMod: mod.gameBaseMod<mod.IGame_User_Info, mod.ITableInfo> = null;

        //其他玩家信息面板
        _playerInfoPanel: ccui.Layout = null;
        _text_playerNameTitle: ccui.Text = null;
        _text_playerName: ccui.Text = null;
        _text_playerBeanNumTitle: ccui.Text = null;
        _text_playerBeanNum: ccui.Text = null;
        _text_playerZhanJiTitle: ccui.Text = null;
        _text_playerZhanJi: ccui.Text = null;
        _text_playerWinRateTitle: ccui.Text = null;
        _text_playerWinRate: ccui.Text = null;
        _text_playerEscapeRateTitle: ccui.Text = null;
        _text_playerEscapeRate: ccui.Text = null;
        _isShiLianFa: boolean = false;
        _pos_player: Array<cc.Point> = [];

        //当前玩家信息面板
        _mineInfoPanel: ccui.Layout = null;
        _text_mineNameTitle: ccui.Text = null;
        _text_mineName: ccui.Text = null;
        _text_mineBeanNumTitle: ccui.Text = null;
        _text_mineBeanNum: ccui.Text = null;
        _text_mineZhanJiTitle: ccui.Text = null;
        _text_mineZhanJi: ccui.Text = null;
        _text_mineWinRateTitle: ccui.Text = null;
        _text_mineWinRate: ccui.Text = null;
        _text_mineEscapeRateTitle: ccui.Text = null;
        _text_mineEscapeRate: ccui.Text = null;
        _pos_mine: cc.Point = cc.p(0, 0);

        //举报面板
        _reportPanel: ccui.Layout = null;
        _checkbox_cheat: ccui.CheckBox = null;
        _checkbox_wgnc: ccui.CheckBox = null;
        _checkbox_bwmyy: ccui.CheckBox = null;

        //点击index
        _toIndex: number = -1;
        _isBindEvent = false;

        constructor() {
            super();
            this._isBindEvent = false;
            this._toIndex = -1;
        }


        abstract onShowPlayerInfo(data: { index: number });
        abstract onShowMineInfo();

        setCurMod(curMod: common.mod.gameBaseMod<common.mod.IGame_User_Info, common.mod.ITableInfo>) {
            if (this._isBindEvent) { return console.error('多次绑定 PlayerInfoLayer'); }
            this._curMod = curMod;

            let self = this;

            kaayou.getController(this._curMod.getModuleName()).on('ui::PlayerInfo::Show', function (e: kaayou.Event) {
                let isPrCheat = false;
                let isAISuper = false;
                let tableInfo = this._curMod.getTableInfo();
                if (tableInfo && tableInfo.hasOwnProperty("join_type") && tableInfo["join_type"] == 2) {
                    isPrCheat = true;
                }
                if (tableInfo && tableInfo.hasOwnProperty("isaisuper") && tableInfo["isaisuper"] == true) {
                    isAISuper = true;
                }
                if ((isPrCheat && !this._curMod._isGameStart) || isAISuper) {   //防作弊
                    return false;
                }
                self.onShowPlayerInfo(e.data);
            }, this);

            //ui::PlayerInfoLayer::Show
            kaayou.getController(this._curMod.getModuleName()).on('ui::MineInfo::Show', function (e: kaayou.Event) {
                self.onShowMineInfo();
            }, this);


            //因为特定区域的游戏GPS要隐藏
            //创建userinfolayer节点可能在tableinfo之前 也可能在之后  之前为了优化加载速度  部分节点需要的时候才会显示
            this.onHideAddress();
            kaayou.getController(this._curMod.getModuleName()).on('ui::playerInfoLayer::hideAddress', function (e: kaayou.Event) {
                self.onHideAddress();
            }, this);
        }

        onHideAddress() {
            if (this._curMod.tableInfo && this._curMod.tableInfo.hasOwnProperty("privategps")) {
                console.log("onHideAddress")
                //麻将GPS  
                let GPS = <cc.Node>ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "GPS");
                //纸牌Image_GPS  text_playerInfoaddress
                let Image_GPS = <ccui.ImageView>ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Image_GPS");
                let text_playerInfoaddress = <ccui.Text>ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "text_playerInfoaddress");
                if (GPS) GPS.setVisible(!this._curMod.tableInfo["privategps"]);
                if (Image_GPS) Image_GPS.setVisible(!this._curMod.tableInfo["privategps"]);
                if (text_playerInfoaddress) text_playerInfoaddress.setVisible(!this._curMod.tableInfo["privategps"]);
            }
        }
    }
}