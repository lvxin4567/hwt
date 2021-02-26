declare namespace common {
    abstract class PlayerInfoLayer extends kaayou.ModelLayer {
        _curMod: mod.gameBaseMod<mod.IGame_User_Info, mod.ITableInfo>;
        _playerInfoPanel: ccui.Layout;
        _text_playerNameTitle: ccui.Text;
        _text_playerName: ccui.Text;
        _text_playerBeanNumTitle: ccui.Text;
        _text_playerBeanNum: ccui.Text;
        _text_playerZhanJiTitle: ccui.Text;
        _text_playerZhanJi: ccui.Text;
        _text_playerWinRateTitle: ccui.Text;
        _text_playerWinRate: ccui.Text;
        _text_playerEscapeRateTitle: ccui.Text;
        _text_playerEscapeRate: ccui.Text;
        _isShiLianFa: boolean;
        _pos_player: Array<cc.Point>;
        _mineInfoPanel: ccui.Layout;
        _text_mineNameTitle: ccui.Text;
        _text_mineName: ccui.Text;
        _text_mineBeanNumTitle: ccui.Text;
        _text_mineBeanNum: ccui.Text;
        _text_mineZhanJiTitle: ccui.Text;
        _text_mineZhanJi: ccui.Text;
        _text_mineWinRateTitle: ccui.Text;
        _text_mineWinRate: ccui.Text;
        _text_mineEscapeRateTitle: ccui.Text;
        _text_mineEscapeRate: ccui.Text;
        _pos_mine: cc.Point;
        _reportPanel: ccui.Layout;
        _checkbox_cheat: ccui.CheckBox;
        _checkbox_wgnc: ccui.CheckBox;
        _checkbox_bwmyy: ccui.CheckBox;
        _toIndex: number;
        _isBindEvent: boolean;
        constructor();
        abstract onShowPlayerInfo(data: {
            index: number;
        }): any;
        abstract onShowMineInfo(): any;
        setCurMod(curMod: common.mod.gameBaseMod<common.mod.IGame_User_Info, common.mod.ITableInfo>): void;
        onHideAddress(): void;
    }
}
