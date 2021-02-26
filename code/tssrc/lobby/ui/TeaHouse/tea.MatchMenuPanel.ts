//亲友圈比赛场菜单
namespace tea {
    import ModelLayer = kaayou.ModelLayer;
    const { BindEvent, doBindEvent } = kaayou._decorator;

    export class tea_MatchMenuPanelMgr {
        static __INS__: tea_MatchMenuPanelMgr = null;

        static getInstance() {
            if (tea_MatchMenuPanelMgr.__INS__ == null) {
                tea_MatchMenuPanelMgr.__INS__ = new tea_MatchMenuPanelMgr();
                tea_MatchMenuPanelMgr.__INS__.init();
            }
            return tea_MatchMenuPanelMgr.__INS__;
        }

        __selfPanel: MatchMenuPanel = null;
        _data: tea.Data_HouseInfo = null;

        init() {
            let self = this;
            this.__selfPanel = null;
            kaayou.getController('tea').on('ui::TeaHouse::UpdateInfo', function (e: kaayou.Event) {
                if (!e.data) {
                    return;
                }
                self._data = e.data;
                self.getPanel(false) && self.getPanel(false).onTeaHouseUpdateInfo(self._data);
            }, this, 10);

            kaayou.getController('tea').on('ui::MatchMenuPanel::Show', function (e: kaayou.Event) {
                if (kaayou.UIManager.getInstance().getCurRuningSceneName() != "TEAHOUSE") return;
                self.getPanel(true).Show(self._data);
            }, this, 10);

            kaayou.getController('tea').on('ui::MatchMenuPanel::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new MatchMenuPanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }
    }

    export class MatchMenuPanel extends kaayou.ModelLayer {
        _data = null;
        btnAntiIndulgence: ccui.Button = null;
        btnPartner: ccui.Button = null;
        btnRank: ccui.Button = null;
        layout_setmenu_panel: ccui.Layout = null;
        lay_meun: ccui.ScrollView = null;

        constructor() {
            super();
            this.initUI();
        }

        authMatchMenuPanel() {
            let configData = common.mod.Config.GetAppConfig();
            let fcm = configData.feature.pl;
            //200302除了普通玩家都能看见
            this.btnPartner.setVisible(!(this._data.urole == HouseMemberRole.MEMBER));
            this.btnAntiIndulgence.setVisible(false);
            this.btnRank.setVisible(true);
            if (fcm) {
                this.btnAntiIndulgence.setVisible(this._data.urole == HouseMemberRole.OWNER || tea.mod.__teaHouseInfo.vitamin_admin);
                if (this._data.urole == HouseMemberRole.ADMIN) {
                    this.btnAntiIndulgence.setVisible(tea.mod.__teaHouseInfo.isvitaminhide);
                } else if (this._data.ispartner) {
                    this.btnAntiIndulgence.setVisible(tea.mod.__teaHouseInfo.ispartnerhide);
                }else if(this._data.vice_partner){
                    this.btnAntiIndulgence.setVisible(tea.mod.__teaHouseInfo.ispartnerhide);
                    this.btnRank.setVisible(false);
                }
            }

        }

        initUI() {
            this.initWithccs(tea.res.TH_MatchMenuPanel_json);
            let self = this;
            this.layout_setmenu_panel = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "layout_setmenu");
            this.btnRank = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btnRank");
            this.btnAntiIndulgence = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "AntiIndulgenceButton");

            this.btnPartner = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btnPartner");

            this.lay_meun = ccui.helper.seekWidgetByName(<ccui.Widget>this.layout_setmenu_panel, "lay_meun");
            this.lay_meun.setPadding({ top: 20, bottom: 0, left: 10, right: 10, spacingX: 30, spacingY: 20 });
            this.lay_meun.setGrid(ccui.Layout.LayoutGrid_AxisDirection.HORIZONTAL);
            this.lay_meun.setHorizontal(ccui.Layout.LayoutHorizontal.LEFT);
            this.lay_meun.setVertical(ccui.Layout.LayoutVertical.TOP);
            this.lay_meun.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Grid);
            this.lay_meun.setGridColumn(4);
            this.lay_meun.doChildrenLayout();
            //时段赛排名
            this.btnRank.on(kaayou.TouchEvent.TouchEnd, function () {
                self.Hide();
                kaayou.emit("tea", 'ui::TimeMatchPm::Show');
            }, this);

            //防沉迷
            this.btnAntiIndulgence.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                self.Hide();
                kaayou.emit('tea', 'ui::AntiIndulgencePanel::Show');
            }, this);

            //队长
            this.btnPartner.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                self.Hide();
                kaayou.emit("tea", "ui::PropotionPanel::Show");
            }, this);

            //这个界面是打开了才会刷新的，所以不放mgr里
            kaayou.getController('tea').on('ui::TeaHouse::UpdateTiredBlock', function (e: kaayou.Event) {
                if (!tea.mod.__teaHouseInfo) return;
                if (tea.mod.__teaHouseInfo.urole != HouseMemberRole.OWNER &&
                    tea.mod.__teaHouseInfo.urole != HouseMemberRole.ADMIN &&
                    !tea.mod.__teaHouseInfo.ispartner) {
                    self.Hide();
                }
                if (tea.mod.__teaHouseInfo.ispartner) {
                    if (!tea.mod.__teaHouseInfo.isvitamin || !tea.mod.__teaHouseInfo.ispartnerhide) {
                        self.Hide();
                    }
                }
                // self.lay_meun.doChildrenLayout();
            }, this, 10);

            this.Hide();
        }

        onTeaHouseUpdateInfo(data: tea.Data_HouseInfo) {
            this._data = data;
            this.authMatchMenuPanel();
            this.lay_meun.doChildrenLayout();
        }

        Show(data: tea.Data_HouseInfo) {
            this.setVisible(true);
            this.onTeaHouseUpdateInfo(data);
        }

        Hide() {
            this.setVisible(false);
        }
    }
}