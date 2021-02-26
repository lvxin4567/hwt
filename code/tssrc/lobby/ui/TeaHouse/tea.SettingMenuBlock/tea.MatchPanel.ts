namespace tea {
    const { doBindEvent, BindEvent } = kaayou._decorator;
    export class tea_MatchPanelMgr {
        static __INS__: tea_MatchPanelMgr = null;
        static getInstance(_zOrder: number) {
            if (tea_MatchPanelMgr.__INS__ == null) {
                tea_MatchPanelMgr.__INS__ = new tea_MatchPanelMgr();
                tea_MatchPanelMgr.__INS__.init();
                tea_MatchPanelMgr.__INS__._zOrder = _zOrder;
            }
            return tea_MatchPanelMgr.__INS__;
        }
        __selfPanel: TeaMatchPanel = null;
        _zOrder: number = 0;
        _data = null;
        init() {
            let self = this;
            this.__selfPanel = null;
            kaayou.getController('tea').on('ui::TeaHouse::UpdateMatchSwitch', function (e: kaayou.Event) {
                if (!e.data) {
                    return;
                }
                self._data = e.data;
                self.getPanel(false) && self.getPanel(false).onTeaHouseUpdateInfo(self._data);
            }, this, 10);

            kaayou.getController('tea').on('ui::MatchPanel::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show();
            }, this, 10);
            kaayou.getController('tea').on('ui::MatchPanel::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new TeaMatchPanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel, this._zOrder);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }
    }

    export class TeaMatchPanel extends kaayou.ModelLayer {
        constructor() {
            super();
            this.initUI();
        }
        btnClose: ccui.Button = null;
        btnSubmit: ccui.Button = null;
        cbSwitch: ccui.CheckBox = null;

        // @doBindEvent
        initUI() {
            this.initWithccs(tea.res.TH_MatchPanel_json);
            this.isTouchMaskHide = false;
            let self = this;
            this.btnClose = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Close");
            this.btnClose.on(kaayou.TouchEvent.TouchStart, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.Hide();
            }, this);
            this.btnSubmit = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "SubmitButton");
            this.btnSubmit.on(kaayou.TouchEvent.TouchStart, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                if (self.cbSwitch.isSelected() != tea.mod.__teaHouseInfo.game_on) {
                    kaayou.emit("tea", "mod::TeaHouse::SetMatchSwitch");
                }                
                self.Hide();
            }, this);
            this.cbSwitch = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Switch");
            this.cbSwitch.on(kaayou.CheckEvent.SELECTED, self.onToggleClick, this);
            this.cbSwitch.on(kaayou.CheckEvent.UNSELECTED, self.onToggleClick, this);
            this.Hide();
        }

        onTeaHouseUpdateInfo(data) {
            this.cbSwitch.setSelected(data.on);
        }

        onToggleClick(event: kaayou.CheckEvent) {
            let self = this;
            kaayou.SoundManager.getInstance().playSound(common.SoundRes.Click_btn_switch);
            if (!tea.mod.__teaHouseInfo.admin_game_on) {
                self.cbSwitch.setSelected(false);
                kaayou.emit('common', 'ui::Toast::Show', { msg: '此功能已关闭' });
            }
        }

        Show() {
            if (!tea.mod.__teaHouseInfo) {
                return
            }
            this.setVisible(true);
            this.cbSwitch.setSelected(tea.mod.__teaHouseInfo.admin_game_on && tea.mod.__teaHouseInfo.game_on);
            kaayou.pop.showAni({
                cNode: this.node.getChildByName("contentPanel"),
                mNode: this.node.getChildByName("maskbg"),
                action: function () {

                }
            });
        }

        Hide() {
            kaayou.pop.hideAni(
                {
                    cNode: this.node.getChildByName("contentPanel"),
                    mNode: this.node.getChildByName("maskbg"),
                    rnode: this
                }
            )
        }
    }
}