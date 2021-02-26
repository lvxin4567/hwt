namespace tea {
    var { doBindEvent, BindEvent } = kaayou._decorator;
    export class ForbidCaptainPanelManager {
        static __INS__: ForbidCaptainPanelManager = null;
        static getInstance() {
            if (ForbidCaptainPanelManager.__INS__ == null) {
                ForbidCaptainPanelManager.__INS__ = new ForbidCaptainPanelManager();
                ForbidCaptainPanelManager.__INS__.init();
            }
            return ForbidCaptainPanelManager.__INS__;
        }
        forbidCaptainPanel: tea.ForbidCaptainPanel = null
        init() {
            let self = this;
            kaayou.getController('tea').on('ui::TeaHouse::ShowForbidCaptain', function (e: kaayou.Event) {
                self.removeDialogShow(e.data);
            }, this, 10);
            kaayou.getController('tea').on('ui::TeaHouse::HideForbidCaptain', function (e: kaayou.Event) {
                self.DialogRemoved();
            }, this, 10);
            return true;

        }
        removeDialogShow(data) {
            let dialog = new tea.ForbidCaptainPanel();
            this.forbidCaptainPanel = dialog;
            kaayou.UIManager.getInstance().getCurRuningScene().addChild(dialog);
            dialog.Show(data);
        }

        DialogRemoved() {
            if (this.forbidCaptainPanel && this.forbidCaptainPanel.isRunning()) {
                this.forbidCaptainPanel.removeFromParent();
            }
            this.forbidCaptainPanel = null;
        }
    }

    export class ForbidCaptainPanel extends kaayou.ModelLayer {
        constructor() {
            super();
            this.initUI();
        }
        btn_cancel: ccui.Button = null;
        btn_sure: ccui.Button = null;
        lbTip: ccui.TextField = null;
        rbCaptain: ccui.CheckBox = null;
        rbTeam: ccui.CheckBox = null;
        _data=null;
        initUI() {
            this.initWithccs(tea.res.ForbidCaptain_json);
            this.isTouchMaskHide = false;
            let self = this;
            this.lbTip = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "lbTip");
            this.btn_cancel = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_cancel");
            this.btn_sure = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_sure");
            this.rbCaptain = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "rbCaptain");
            this.rbTeam = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "rbTeam");
            this.btn_cancel.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.Hide();
            }, this);
            this.btn_sure.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit("tea", 'mod::TeaHouse::setCaptainNoGame', {
                    hid: tea.mod.__teaHouseInfo.hid, uid: self._data.uid, allow_game: !self._data.isForbid,
                    is_team_member: self.rbTeam.isSelected()
                });
                self.Hide();
            }, this);
            this.rbCaptain.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnSwitch);
                self.rbTeam.setSelected(false);
            }, this);
            this.rbTeam.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnSwitch);
                self.rbCaptain.setSelected(false);
            }, this);
        }
        Show(data) {
            let self = this;
            this._data = data;
            if (data.isForbid) {
                this.lbTip.setString("禁止娱乐后玩家将无法在本亲友圈进行游戏");
            }else{
                this.lbTip.setString("请选择仅恢复队长本人还是全队所有成员");
            }
            this.setVisible(true);
        }
        Hide() {
            kaayou.emit('tea', 'ui::TeaHouse::HideForbidCaptain');
        }
    }
}