//参赛队伍管理
namespace tea {
    var { BindEvent, doBindEvent } = kaayou._decorator;

    export class tea_PropotionPanelMgr {
        static __INS__: tea_PropotionPanelMgr = null;
        static getInstance() {
            if (tea_PropotionPanelMgr.__INS__ == null) {
                tea_PropotionPanelMgr.__INS__ = new tea_PropotionPanelMgr();
                tea_PropotionPanelMgr.__INS__.init();
            }
            return tea_PropotionPanelMgr.__INS__;
        }
        __selfPanel: PropotionPanel = null;
        _data: tea.Data_HouseInfo = null;
        init() {
            let self = this;
            this.__selfPanel = null;

            kaayou.getController('tea').on('ui::TeaHouse::UpdateInfo', function (e: kaayou.Event) {
                if (!e.data) {
                    return;
                }
                self._data = e.data;
                self.getPanel(false) && self.getPanel(false).onTeaHouseUpdateInfo(e.data);
            }, this, 10);


            kaayou.getController('tea').on('ui::PropotionPanel::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show();
            }, this, 10);
            kaayou.getController('tea').on('ui::PropotionPanel::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);

            kaayou.getController("lobby").on("ws::Msg::houseautopaypartner_ntf", (e: kaayou.Event) => {
                let { hid, auto_pay } = e.data;
                tea.mod.__teaHouseInfo.auto_pay_partner = auto_pay;
                kaayou.emit("common", "ui::Toast::Show", { msg: "自动划扣规则已更新" });
                kaayou.emit("tea", "ui::PropotionPanel::UIBOXChange", { auto_pay });
            }, this)


            kaayou.getController("lobby").on('ws::Msg::housepartnerdelete_ntf', (e: kaayou.Event) => {
                let panel = self.getPanel(true);
                let leftmenu = panel.memMenuGroup;
                leftmenu.doChildrenLayout();
            }, this)

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new PropotionPanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }
    }

    export class PropotionPanel extends kaayou.ModelLayer {
        label_member_count: ccui.Text = null;
        pnlPartner: ccui.Layout = null;
        tea_call_partner_mode: ccui.Layout = null;

        lbNeedApprove: ccui.Text = null;
        lbPartnerCanApprove: ccui.Text = null;
        memPlay_count_label: ccui.Text = null;
        // curIndex:number = 0;
        constructor() {
            super();
            this.initUI();
        }
        topbarMgr: lobby.TopBarMgr = null;
        searchMgr: MemSearchWidget = null;

        authPropotion() {
            let self = this;
            if (!!tea.mod.__teaHouseInfo) {
                if (tea.mod.__teaHouseInfo.urole == HouseMemberRole.MEMBER) {
                    this.Hide();
                }
            }
        }

        initUI() {
            let self = this;
            this.isTouchMaskHide = false;
            this.initWithccs(tea.res.TH_PropotionPanel_json);
            this.lbNeedApprove = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "teaActMember");
            this.lbPartnerCanApprove = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "partnerActMember");
            this.topbarMgr = new lobby.TopBarMgr(ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "top_bar"));
            this.topbarMgr.setTitle('参赛队伍管理');
            this.topbarMgr.setOnCloseClick(function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.Hide();
            }.bind(this));


            this.initLeftMenu();
            this.initRightPages();


            let historyNode: cc.Node = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "tea_history_panel");
            tea_PropotionHistoryPanelMgr.getInstance().setNode(historyNode);
            kaayou.getController('tea').on('ui::TeaHouse::UpdateTiredBlock', function (e: kaayou.Event) {
                self.authPropotion();
            }, this, 10);
            this.Hide();
        }

        private isCreator(data: tea.Data_HouseInfo) {
            return data.urole == HouseMemberRole.OWNER
        }

        private isAdmin(data: tea.Data_HouseInfo) {
            return data.urole === HouseMemberRole.ADMIN
        }

        private isPartener(data: tea.Data_HouseInfo) {
            return data.ispartner;
        }

        private isVitaAdmin(data: tea.Data_HouseInfo) {
            return data.vitamin_admin;
        }

        onTeaHouseUpdateInfo(data: tea.Data_HouseInfo) {
            if (tea.mod.__teaHouseInfo.urole == HouseMemberRole.MEMBER) {
                this.Hide();
                return;
            }
            this.authPropotion();

            this.memMenuGroup.getChildren().forEach(v => {
                v.setVisible(true);
            });
            (<ccui.CheckBox>this.memMenuGroup.getChildren()[0]).setVisible(false);
            (<ccui.CheckBox>this.memMenuGroup.getChildren()[1]).setVisible(false);
            //200422隐藏奖励发放界面
            (<ccui.CheckBox>this.memMenuGroup.getChildren()[2]).setVisible(false);
            (<ccui.CheckBox>this.memMenuGroup.getChildren()[3]).setVisible(false);
            (<ccui.CheckBox>this.memMenuGroup.getChildren()[4]).setVisible(false);
            //200302战队分析除了普通玩家都能看到
            (<ccui.CheckBox>this.memMenuGroup.getChildren()[5]).setVisible(true);
            if (this.isVitaAdmin(data) === true || this.isCreator(data) === true) {
                (<ccui.CheckBox>this.memMenuGroup.getChildren()[0]).setVisible(true);
                (<ccui.CheckBox>this.memMenuGroup.getChildren()[1]).setVisible(true);
                //(<ccui.CheckBox>this.memMenuGroup.getChildren()[2]).setVisible(true);
                (<ccui.CheckBox>this.memMenuGroup.getChildren()[4]).setVisible(true);
            }
            if (this.isPartener(data)) {
                (<ccui.CheckBox>this.memMenuGroup.getChildren()[0]).setVisible(true);
                (<ccui.CheckBox>this.memMenuGroup.getChildren()[1]).setVisible(true);
                (<ccui.CheckBox>this.memMenuGroup.getChildren()[3]).setVisible(true);
                (<ccui.CheckBox>this.memMenuGroup.getChildren()[4]).setVisible(true);
            }
            //200302管理员只能看到战队分析
            if (this.isAdmin(data)) {
                this.showPageIndex = 5;
            }
            kaayou.emit('teaMem', 'ui::PropotionPanel::SubpageChange', { index: this.showPageIndex })
            this.memMenuGroup.doChildrenLayout();
        }

        showPageIndex: number = 0;
        memMenuGroup: ccui.ScrollView = null;
        initLeftMenu() {
            let self = this;
            //初始化左侧菜单
            this.memMenuGroup = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "mem_menu_layout");
            this.memMenuGroup.setPadding({ top: 40, spacingY: 10, left: 3 });
            this.memMenuGroup.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Vertical);
            this.memMenuGroup.setVertical(ccui.Layout.LayoutVertical.TOP);
            this.memMenuGroup.setScrollBarEnabled(false);

            lodash.forEach(this.memMenuGroup.getChildren(), function (v: ccui.CheckBox, i) {
                let selfIndex = i;
                let vself = v;
                kaayou.getController('teaMem').on('ui::PropotionPanel::SubpageChange', function (e: kaayou.Event) {
                    let { index } = e.data;
                    if (selfIndex == index) {
                        v.setSelected(true);
                        (<ccui.ImageView>vself.getChildByName("ON")).setVisible(true);
                        (<ccui.ImageView>vself.getChildByName("OFF")).setVisible(false);

                        if (index === 2 || index == 3) {
                            self.searchMgr.setSearchVisible(false);
                        }
                        else {
                            self.searchMgr.setSearchVisible(true);
                        }
                    } else {
                        v.setSelected(false);
                        (<ccui.ImageView>vself.getChildByName("ON")).setVisible(false);
                        (<ccui.ImageView>vself.getChildByName("OFF")).setVisible(true);
                    }
                }, v);

                v.on(kaayou.CheckEvent.SELECTED, (e: kaayou.TouchEvent) => {
                    kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                    self.showPageIndex = selfIndex;
                    kaayou.emit('teaMem', 'ui::PropotionPanel::SubpageChange', { index: selfIndex })
                }, this);

                v.on(kaayou.CheckEvent.UNSELECTED, (e: kaayou.TouchEvent) => {
                    kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                    kaayou.emit('teaMem', 'ui::PropotionPanel::SubpageChange', { index: selfIndex })
                }, this);

            })
            this.memMenuGroup.doChildrenLayout();
        }

        svPartner: ccui.ScrollView = null;

        /////////////
        tea_call_partner_base: ccui.Layout = null;
        tea_call_partner_income: ccui.Layout = null;
        tea_call_partner_config: ccui.Layout = null;
        tea_cell_partner_NoUnion: ccui.Layout = null;
        ThFcm_partnerCunt_cell: ccui.Layout = null;
        rowMyConfig: ccui.Layout = null;
        initRightPages() {
            this.tea_call_partner_base = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "tea_call_partner_base");
            this.tea_call_partner_income = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "tea_call_partner_income");
            //this.tea_call_partner_config = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "tea_call_partner_config");
            this.tea_cell_partner_NoUnion = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "tea_cell_team_stat");
            this.ThFcm_partnerCunt_cell = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "ThFcm_PartnerCunt_cell");
            this.rowMyConfig = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "MyConfigRow");
            //this.tea_call_partner_config.setVisible(false)
            this.tea_call_partner_income.setVisible(false)
            this.tea_call_partner_base.setVisible(false);
            this.tea_cell_partner_NoUnion.setVisible(false);
            this.rowMyConfig.setVisible(false);
            this.ThFcm_partnerCunt_cell.setVisible(false)

            this.searchMgr = new MemSearchWidget();
            this.searchMgr.initWidthNode(ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "search_layout"), function () {
                kaayou.emit("teaMem", "ui::PropotionPanel::Search");
            });

            //初始化右侧page页
            let pages = (<ccui.Layout>ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "rightPageGroup")).getChildren();

            (new PropotionInfoPanel()).setIndex(0).initWidthNode(pages[0], this.searchMgr, this.tea_call_partner_base);
            (new PropotionIncomePanel()).setIndex(1).initWithNode(pages[1], this.searchMgr, this.tea_call_partner_income);
            //(new PropotionConfigPanel()).setIndex(2).initWithNode(pages[2],  this.tea_call_partner_config);
            (new PropotionAutoCheckOff()).setIndex(2).initWithNode(pages[2]);
            (new PropotionMyConfigPage()).setIndex(3).initWithNode(pages[3], this.rowMyConfig);
            (new SubFcmPartnerCountPage()).setIndex(5).initWidthNode(pages[5], this.searchMgr, this.ThFcm_partnerCunt_cell);
        }

        private reset() {
            let pages = (<ccui.Layout>ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "rightPageGroup")).getChildren();
            pages.forEach(v => {
                v.setVisible(false);
            })
        }

        Show() {
            this.searchMgr.clearString();
            this.setVisible(true);
            let self = this;
            kaayou.pop.ShowMainAnim({
                tNode: ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "top_bar"),
                bNode: this.node.getChildByName("contentPanel"),
                mNode: this.node.getChildByName('maskbg'),
                action: function () {
                    self.reset();
                    self.showPageIndex = 0;
                    self.onTeaHouseUpdateInfo(tea.mod.__teaHouseInfo)
                    // kaayou.emit('teaMem', 'ui::PropotionPanel::SubpageChange', { index:0 })

                }
            });
        }

        Hide() {
            this.setVisible(false);
            kaayou.emit('teaMem', 'ui::PropotionPanel::SubpageChange', { index: -1 })
        }
    }
}