//亲友圈右上角的亲友圈设置
namespace tea {
    import ModelLayer = kaayou.ModelLayer;
    const { BindEvent, doBindEvent } = kaayou._decorator;

    export class tea_TeaSettingPanelMgr {
        static __INS__: tea_TeaSettingPanelMgr = null;
        static getInstance() {
            if (tea_TeaSettingPanelMgr.__INS__ == null) {
                tea_TeaSettingPanelMgr.__INS__ = new tea_TeaSettingPanelMgr();
                tea_TeaSettingPanelMgr.__INS__.init();
            }
            return tea_TeaSettingPanelMgr.__INS__;
        }
        __selfPanel: SettingMenuPanel = null;
        _data: tea.Data_HouseInfo = null
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

            kaayou.getController('tea').on('ui::SettingMenu::Show', function (e: kaayou.Event) {
                if (kaayou.UIManager.getInstance().getCurRuningSceneName() != "TEAHOUSE") return;
                self.getPanel(true).Show(self._data);
            }, this, 10);

            kaayou.getController('tea').on('ui::SettingMenu::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new SettingMenuPanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }

    }

    export class SettingMenuPanel extends kaayou.ModelLayer {
        _data = null;
        btnDistance: ccui.Button = null;   //距离设置
        btnEffective: ccui.Button = null;  //低分局设置
        btnMerge: ccui.Button = null;  //合圈按钮
        btnNoDeskmate: ccui.Button = null;
        btnTime: ccui.Button = null;   //时段筛选
        layout_setmenu_panel: ccui.Layout = null;
        lay_meun: ccui.ScrollView = null;
        
        btnMix: ccui.Button = null;    //混排按钮
        btn_blacklist: ccui.Button = null;
        btn_secret: ccui.Button = null;
        btn_froze: ccui.Button = null;
        btn_unfroze: ccui.Button = null;
        ivCPAdmin: ccui.ImageView = null;
        admin_Title: ccui.ImageView = null;
        creator_Title: ccui.ImageView = null;
        partner_Title: ccui.ImageView = null;
        vice_partner_Title: ccui.ImageView = null;

        btn_qyqSetManager: ccui.Button = null;
        player_title: ccui.ImageView = null;
        btn_JoinSet: ccui.Button = null;
        btn_AuthPower: ccui.Button = null;
        btn_showTable: ccui.Button = null;
        btn_bgSet: ccui.Button = null;
        btn_tableBgSet: ccui.Button = null;
        constructor() {
            super();
            this.initUI();
        }

        initUI() {
            this.initWithccs(tea.res.SettingMenuPanel_json);
            let self = this;
            this.layout_setmenu_panel = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "layout_setmenu");
            this.btnDistance = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btnDistance");
            this.btnEffective = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btnEffective");
            this.btnTime = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btnTime");
            this.btnMerge = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "MergeTeahouse");
            this.btnMix = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "MixButton");
            this.btn_blacklist = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_blacklist");
            this.btn_secret = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_secret");
            this.btn_froze = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_froze");
            this.btn_unfroze = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_unfroze");
            this.btnNoDeskmate = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "NoDeskmateButton");
            this.ivCPAdmin = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "CPAdminTitle");
            this.admin_Title = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "AdminTitle");
            this.player_title = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "PlayerTitle");
            this.creator_Title = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "title");
            this.partner_Title = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "PartnerTitle");
            this.vice_partner_Title = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "VicePartnerTitle");
            this.btn_qyqSetManager = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_qyqManager");
            this.btn_JoinSet = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_joinSet");
            this.btn_AuthPower = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_auth_power");
            this.btn_bgSet = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_bgSet");
            this.btn_showTable = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_Mune_ShowTable");
            this.btn_tableBgSet = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_tableBg");
            this.lay_meun = ccui.helper.seekWidgetByName(<ccui.Widget>this.layout_setmenu_panel, "lay_meun");
            this.lay_meun.setPadding({ top: 20, bottom: 0, left: 10, right: 10, spacingX: 30, spacingY: 20 });
            this.lay_meun.setGrid(ccui.Layout.LayoutGrid_AxisDirection.HORIZONTAL);
            this.lay_meun.setHorizontal(ccui.Layout.LayoutHorizontal.LEFT);
            this.lay_meun.setVertical(ccui.Layout.LayoutVertical.TOP);
            this.lay_meun.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Grid);
            this.lay_meun.setGridColumn(4);
            this.lay_meun.doChildrenLayout();
            //距离
            this.btnDistance.on(kaayou.TouchEvent.TouchEnd, function () {
                self.Hide();
                //kaayou.emit("tea", 'ui::DistancePanel::Show');
                kaayou.emit("tea", "mod::teahouse::getDistance");
            }, this);
            //设置
            this.btn_qyqSetManager.on(kaayou.TouchEvent.TouchEnd, function () {
                self.Hide();
                kaayou.emit("tea", 'ui::Manager::Show')
            }, this);

            //黑名单
            this.btn_blacklist.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                self.Hide();
                kaayou.emit('tea', 'ui::BlackList::Show');
            }, this);


            //隐私
            this.btn_secret.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                self.Hide();
                kaayou.emit('tea', 'ui::PrivacyPanel::Show');
            }, this);

            //冻结
            this.btn_froze.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                self.Hide();
                kaayou.emit('tea', 'ui::FrozePanel::Show');
            }, this);

            //冻结
            this.btn_unfroze.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                self.Hide();
                kaayou.emit('tea', 'ui::FrozePanel::Show');
            }, this);

            //禁止同桌
            this.btnNoDeskmate.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                self.Hide();
                kaayou.emit('tea', 'ui::NoDeskmate::Show');
            }, this);

            //合圈
            this.btnMerge.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                self.Hide();
                kaayou.emit("tea", "ui::mergeUserPanel::show");
            }, this);

            //混排
            this.btnMix.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                self.Hide();
                kaayou.emit("tea", "mod::TeaHouse::GetMixInfo");
            }, this);

            //入桌设置
            this.btn_JoinSet.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                self.Hide();
                kaayou.emit("tea", "ui::JoinTableSetPanel::Show")//
            }, this);

            this.btn_AuthPower.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                self.Hide();
                kaayou.emit("tea", "ui::setAuthPowerPanel::Show");
            }, this);

            this.btn_showTable.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                self.Hide();
                kaayou.emit("tea", "ui::ShowTableCountPanel::Show");
            }, this);

            //时段筛选
            this.btnTime.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                self.Hide();
                kaayou.emit("tea", "ui::TimePanel::Show");
            }, this);

            //有效局
            this.btnEffective.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                self.Hide();
                kaayou.emit("tea", "ui::propotionFloorConfigDialog::Show");
            }, this);

            //背景设置
            this.btn_bgSet.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                self.Hide();
                console.log("背景设置！");
                kaayou.emit("tea", "ui::TeaBgSetPanel::Show");
            }, this);

            //桌子背景设置
            this.btn_tableBgSet.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                self.Hide();
                console.log("背景设置！");
                kaayou.emit("tea", "ui::tableBgSetPanel::Show");
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
            this.btnDistance.setVisible(data.urole == HouseMemberRole.OWNER);
            this.btn_qyqSetManager.setVisible(true);
            this.btn_blacklist.setVisible(!!(data.teahouserule & HouseRoleTable.EDIT_HOUSE_SET));
            this.btn_secret.setVisible(!!(data.teahouserule & HouseRoleTable.EDIT_HOUSE_SET));
            this.btn_froze.setVisible(!!(data.teahouserule & HouseRoleTable.EDIT_HOUSE_SET) && !data.hisfrozen);
            this.btn_unfroze.setVisible(!!(data.teahouserule & HouseRoleTable.EDIT_HOUSE_SET) && data.hisfrozen);

            if (!!(data.teahouserule & HouseRoleTable.EDIT_HOUSE_SET)) {
                this.btn_unfroze.setVisible(data.hisfrozen);
                this.btn_froze.setVisible(!data.hisfrozen);
            }
            this.btn_JoinSet.setVisible(data.urole == HouseMemberRole.OWNER)
            this.ivCPAdmin.setVisible(data.vitamin_admin);
            this.admin_Title.setVisible(data.urole == HouseMemberRole.ADMIN);
            this.creator_Title.setVisible(data.urole == HouseMemberRole.OWNER);
            this.partner_Title.setVisible(tea.mod.__teaHouseInfo.ispartner);
            //副队长
            this.vice_partner_Title.setVisible(tea.mod.__teaHouseInfo.vice_partner);
            //lw200703恢复合圈
            this.btnMerge.setVisible(data.urole == HouseMemberRole.OWNER || tea.mod.__teaHouseInfo.urefhid > 0);
            //lw200514隐藏合圈
            //this.btnMerge.setVisible(false);
            this.player_title.setVisible(data.urole == HouseMemberRole.MEMBER && !tea.mod.__teaHouseInfo.vice_partner);
            this.btnMix.setVisible(data.urole == HouseMemberRole.OWNER);
            this.btn_showTable.setVisible(data.urole == HouseMemberRole.OWNER);
            this.btnNoDeskmate.setVisible(data.urole == HouseMemberRole.OWNER || data.urole == HouseMemberRole.ADMIN);
            this.btnEffective.setVisible(data.urole == HouseMemberRole.OWNER);
            
            this.btn_bgSet.setVisible(true);
            this.btn_tableBgSet.setVisible(data.urole == HouseMemberRole.OWNER);
            this.btnTime.setVisible(data.urole == HouseMemberRole.OWNER);
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