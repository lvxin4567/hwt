
namespace common {
    export class MajonMenuPanel extends kaayou.ModelLayer {
        btn_setting: ccui.Button = null;
        btn_skin: ccui.Button = null;
        btn_exit: ccui.Button = null;
        curMod: mod.gameBaseMod<mod.IGame_User_Info, mod.ITableInfo> = null;

        constructor(ccsName: string, mod: mod.gameBaseMod<mod.IGame_User_Info, mod.ITableInfo>) {
            super();
            this.initWithccs(ccsName, false);
            this.curMod = mod;
            this.Hide();
        }
        initUI() {
            this.btn_setting = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_setting");
            this.btn_skin = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_skin");
            this.btn_exit = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_exit");
            this.bindUiEvent();
        }
        bindUiEvent() {
            let self = this;
            this.btn_exit.on(kaayou.TouchEvent.TouchEnd, function () {
                self.setVisible(false);
                kaayou.SoundManager.getInstance().playSound(SoundRes.Click_btn_switch);
                //游戏结束后点退出
                if (self.curMod.gameState == common.mod.GAME_STATE.GAME_OVER && self.curMod["sendNext"]) {
                    self.curMod["sendNext"]();
                } else {
                    self.curMod.gameOutConfirm();
                }
            }, this);
            if (this.btn_skin) {
                this.btn_skin.on(kaayou.TouchEvent.TouchEnd, function () {
                    self.setVisible(false);
                    kaayou.SoundManager.getInstance().playSound(SoundRes.Click_btn_switch);
                    kaayou.emit(self.curMod.getModuleName(), "ui::MajonSkinPanel::Show");
                }, this)
            }
            this.btn_setting.on(kaayou.TouchEvent.TouchEnd, function () {
                self.setVisible(false);
                kaayou.SoundManager.getInstance().playSound(SoundRes.Click_btn_switch);
                kaayou.emit(self.curMod.getModuleName(), "ui::MajonSettingPanel::Show");
            }, this)
        }

        Show() {
            this.setVisible(true);
        }
    }
}