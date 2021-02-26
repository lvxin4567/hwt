namespace tea {
    var { BindEvent, doBindEvent } = kaayou._decorator;

    export class tea_MemberPanelMgr {
        static __INS__: tea_MemberPanelMgr = null;
        static getInstance() {
            if (tea_MemberPanelMgr.__INS__ == null) {
                tea_MemberPanelMgr.__INS__ = new tea_MemberPanelMgr();
                tea_MemberPanelMgr.__INS__.init();
            }
            return tea_MemberPanelMgr.__INS__;
        }
        __selfPanel: MemberPanel = null;
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

            kaayou.getController('tea').on('ui::TeaHouse::Member::UpdateMemberInfo', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).onUpdateMemberInfo(e.data);
            }, this, 10);

            kaayou.getController('tea').on('ui::Member::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show(self._data);
            }, this, 10);
            kaayou.getController('tea').on('ui::Member::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new MemberPanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }
    }

    export class MemberPanel extends kaayou.ModelLayer {
        cbJoin: ccui.CheckBox = null;       //新玩家加入亲友圈是否需要审核
        cbRefuse: ccui.CheckBox = null;    //是否拒绝新玩家申请，默认false不拒绝
        label_member_count: ccui.Text = null;

        pnlPartner: ccui.Layout = null;

        partnerCk_Auth: ccui.CheckBox = null;    //队长能否允许新玩家加入亲友圈
        cbExitTeahouse: ccui.CheckBox = null;   //成员是否能自己退圈
        lbNeedApprove: ccui.Text = null;
        lbPartnerCanApprove: ccui.Text = null;
        lbExitTeahouse: ccui.Text = null;
        layout_auth: ccui.Layout = null;
        layout_auth_1: ccui.Layout = null;
        partnerKick: ccui.CheckBox = null;     //队长能否踢名下玩家
        lbPartnerKick: ccui.Text = null;

        constructor() {
            super();
            this.initUI();
        }
        topbarMgr: lobby.TopBarMgr = null;

        searchMgr: MemSearchWidget = null;
        initUI() {
            let self = this;
            this.isTouchMaskHide = false;
            this.initWithccs(tea.res.MemberPanel_json);
            this.lbNeedApprove = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "teaActMember");
            this.lbPartnerCanApprove = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "partnerActMember");
            this.lbExitTeahouse = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "exitTeahouse");
            this.lbPartnerKick = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "canPartnerExitMem");
            this.topbarMgr = new lobby.TopBarMgr(ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "top_bar"));
            this.topbarMgr.setTitle('成员列表');
            this.topbarMgr.setOnCloseClick(function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.Hide();
            }.bind(this));

            this.label_member_count = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_member_count");
            this.label_member_count.setString("");
            this.label_member_count.setVisible(false);

            this.cbRefuse = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "cbRefuse");
            this.cbJoin = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "cbJoin");
            this.partnerCk_Auth = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "partcheck_auth");
            this.partnerKick = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "partnerKickCb");
            this.cbExitTeahouse = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "exitTeahouseCheckBox");
            this.layout_auth = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "layout_auth");
            this.layout_auth_1 = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "layout_auth_1");
            this.layout_auth.setVisible(false);
            this.layout_auth_1.setVisible(false);


            this.cbRefuse.on(kaayou.CheckEvent.SELECTED, self.onAuthChange, this);
            this.cbRefuse.on(kaayou.CheckEvent.UNSELECTED, self.onAuthChange, this);

            this.cbJoin.on(kaayou.CheckEvent.SELECTED, self.onAuthChange, this);
            this.cbJoin.on(kaayou.CheckEvent.UNSELECTED, self.onAuthChange, this);

            this.partnerCk_Auth.on(kaayou.CheckEvent.SELECTED, self.onAuthChange, this);
            this.partnerCk_Auth.on(kaayou.CheckEvent.UNSELECTED, self.onAuthChange, this);

            this.cbExitTeahouse.on(kaayou.CheckEvent.SELECTED, self.onAuthChange, this);
            this.cbExitTeahouse.on(kaayou.CheckEvent.UNSELECTED, self.onAuthChange, this);

            this.partnerKick.on(kaayou.CheckEvent.SELECTED, self.onAuthChange, this);
            this.partnerKick.on(kaayou.CheckEvent.UNSELECTED, self.onAuthChange, this);
            this.initLeftMenu();
            this.initRightPages();

            this.Hide();
        }
        onAuthChange(e: kaayou.Event) {
            let self=this;
            kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnSwitch);
            if (e.target.name == "cbRefuse") {
                kaayou.emit("tea", 'mod::TeaHouse::SetRefuseMemberJoin');
            } else if (e.target.name == "partcheck_auth") {
                let s="开启队长可审后队长可以审核队员的进圈申请，是否确定开启？";
                if(!self.partnerCk_Auth.isSelected()) s="关闭队长可审后队长无法审核队员的进圈申请，是否确定关闭？";
                let options = {
                    title: "温馨提示",
                    msg: s,
                    btns: [
                        {
                            name: "确定",
                            colorType: 'green',
                            action: function () {
                                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                                kaayou.emit("tea", 'mod::TeaHouse::SetPartnerMemCheck');
                            },
                        },{
                            name: "取消",
                            colorType: 'yellow',
                            action: function () {
                                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                                self.partnerCk_Auth.setSelected(!self.partnerCk_Auth.isSelected());
                            }
                        }
                    ]
                }
                kaayou.emit('common', 'ui::Dialog::Show', options);
            } else if (e.target.name == "cbJoin") {
                let s="开启亲友圈审核后玩家进圈需要审核，是否确定开启？";
                if(!this.cbJoin.isSelected()) s="关闭亲友圈审核后玩家进圈无需审核，是否确定关闭？";
                let options = {
                    title: "温馨提示",
                    msg: s,
                    btns: [
                        {
                            name: "确定",
                            colorType: 'green',
                            action: function () {
                                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                                kaayou.emit("tea", 'mod::TeaHouse::SetMemCheck');
                            },
                        },{
                            name: "取消",
                            colorType: 'yellow',
                            action: function () {
                                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                                self.cbJoin.setSelected(!self.cbJoin.isSelected());
                            }
                        }
                    ]
                }
                kaayou.emit('common', 'ui::Dialog::Show', options);
            } else if (e.target.name == "partnerKickCb") {
                let s="开启队长可踢后队长可以踢出队员，是否确定开启？";
                if(!self.partnerKick.isSelected()) s="关闭队长可踢后队长不能踢出队员，是否确定关闭？";
                let options = {
                    title: "温馨提示",
                    msg: s,
                    btns: [
                        {
                            name: "确定",
                            colorType: 'green',
                            action: function () {
                                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                                kaayou.emit("tea", "mod::teahouse::partnerKickMem");
                            },
                        },{
                            name: "取消",
                            colorType: 'yellow',
                            action: function () {
                                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                                self.partnerKick.setSelected(!self.partnerKick.isSelected());
                            }
                        }
                    ]
                }
                kaayou.emit('common', 'ui::Dialog::Show', options);
            } else {
                let s="开启退圈审核后玩家退圈需要审核，是否确定开启？";
                if(!self.cbExitTeahouse.isSelected()) s="关闭退圈审核后玩家退圈无需审核，是否确定关闭？";
                let options = {
                    title: "温馨提示",
                    msg: s,
                    btns: [
                        {
                            name: "确定",
                            colorType: 'green',
                            action: function () {
                                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                                kaayou.emit("tea", 'mod::TeaHouse::SetExitTeahouseCheck');
                            },
                        },{
                            name: "取消",
                            colorType: 'yellow',
                            action: function () {
                                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                                self.cbExitTeahouse.setSelected(!self.cbExitTeahouse.isSelected());
                            }
                        }
                    ]
                }
                kaayou.emit('common', 'ui::Dialog::Show', options);
            }
        }

        onTeaHouseUpdateInfo(data: tea.Data_HouseInfo) {
            this.cbJoin.setEnabled(true);
            this.partnerCk_Auth.setEnabled(true);
            (<ccui.CheckBox>this.memMenuGroup.getChildren()[0]).setVisible(!!(data.teahouserule & HouseRoleTable.VIEW_MEMBER));
            (<ccui.CheckBox>this.memMenuGroup.getChildren()[1]).setVisible(!!(data.teahouserule & HouseRoleTable.VIEW_MEMBER_APPLY));
            //开局统计功能，裁判也要能看
            (<ccui.CheckBox>this.memMenuGroup.getChildren()[2]).setVisible(!!(data.teahouserule & HouseRoleTable.VIEW_STAT_MEMBER));
            if (this.isVisible()) {
                this.setVisible(!!(data.teahouserule & HouseRoleTable.VIEW_MEMBER)
                    || !!(data.teahouserule & HouseRoleTable.VIEW_STAT_MEMBER));
            }
            let apply = !!(data.teahouserule & HouseRoleTable.VIEW_MEMBER_APPLY);
            this.layout_auth.setVisible(apply);
            this.layout_auth_1.setVisible(tea.mod.__teaHouseInfo.urole == HouseMemberRole.OWNER);
            this.cbRefuse.setSelected(data.apply_switch);
            this.cbJoin.setSelected(data.hischecked);//加入茶楼是否需要审核
            this.partnerCk_Auth.setSelected(data.ipa);
            this.cbExitTeahouse.setSelected(data.hismemexit);
            this.partnerKick.setSelected(data.partnerkick);
            if (data.urole == HouseMemberRole.MEMBER) {
                this.showPageIndex = 0;
            } else if (data.vitamin_admin) {
                this.showPageIndex = 2;
            }
            this.lbPartnerKick.setVisible(data.urole == HouseMemberRole.OWNER)
            //lw191021审核开关
            this.lbExitTeahouse.setVisible(false);
            if (data.urole == HouseMemberRole.OWNER) {
                this.lbNeedApprove.setVisible(true);
                this.lbPartnerCanApprove.setVisible(true);
                this.lbExitTeahouse.setVisible(true);
            } else if (data.vitamin_admin) {   //裁判没有审核权限
                this.lbNeedApprove.setVisible(false);
                this.lbPartnerCanApprove.setVisible(false);
                this.lbExitTeahouse.setVisible(false);
            } else if (data.urole == HouseMemberRole.ADMIN) {
                this.lbNeedApprove.setVisible(false);//201026管理员看不见亲友圈审核开关
                this.lbPartnerCanApprove.setVisible(false);
                this.lbExitTeahouse.setVisible(false);
            } else if (data.urole == HouseMemberRole.CAPTAIN) { //如果是队长切不了权限
                this.lbNeedApprove.setVisible(false);
                this.lbPartnerCanApprove.setVisible(false);
            } else if (data.urole == HouseMemberRole.VICECAPTAIN) {
                this.lbNeedApprove.setVisible(false);
                this.lbPartnerCanApprove.setVisible(false);
            }
            if (this.isVisible() || this.mustLoad) {
                kaayou.emit('teaMem', 'ui::Member::SubpageChange', { index: this.showPageIndex })
            }
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
                v['index'] = i;
                v.on(kaayou.CheckEvent.SELECTED, (e: kaayou.TouchEvent) => {
                    kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                    let target = e.target;
                    let { index } = target;
                    self.showPageIndex = index;
                    kaayou.emit('teaMem', 'ui::Member::SubpageChange', { index })
                }, this);
                v.on(kaayou.CheckEvent.UNSELECTED, (e: kaayou.TouchEvent) => {
                    kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                    let target = e.target;
                    let { index } = target;
                    kaayou.emit('teaMem', 'ui::Member::SubpageChange', { index })
                }, this);
                v['onSubpageChange'] = function (e: kaayou.Event) {
                    let _data = e.data;
                    let { index } = _data;
                    if (this.index == index) {
                        this.setSelected(true);
                        (<ccui.ImageView>this.getChildByName("ON")).setVisible(true);
                        (<ccui.ImageView>this.getChildByName("OFF")).setVisible(false);
                    } else {
                        this.setSelected(false);
                        (<ccui.ImageView>this.getChildByName("ON")).setVisible(false);
                        (<ccui.ImageView>this.getChildByName("OFF")).setVisible(true);
                    }
                }
                kaayou.getController('teaMem').on('ui::Member::SubpageChange', v['onSubpageChange'], v);
            })
            this.memMenuGroup.doChildrenLayout();
        }

        svPartner: ccui.ScrollView = null;

        tea_cell_member_mode: ccui.Layout = null;
        tea_cell_apply_mode: ccui.Layout = null;
        tea_cell_stat_mode: ccui.Layout = null;
        initRightPages() {
            let self = this;

            this.tea_cell_member_mode = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "tea_cell_member_mode");
            this.tea_cell_apply_mode = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "tea_cell_apply_mode");
            this.tea_cell_stat_mode = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "tea_cell_stat_mode");
            this.tea_cell_member_mode.setVisible(false);
            this.tea_cell_apply_mode.setVisible(false);
            this.tea_cell_stat_mode.setVisible(false);

            this.searchMgr = new MemSearchWidget();
            this.searchMgr.initWidthNode(ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "search_layout"), function () {
                kaayou.emit("teaMem", "ui::Member::Search");
            });

            //初始化右侧page页
            let memPageGroup = ccui.helper.seekWidgetByName<ccui.Layout>(<ccui.Widget>this.node, "rightPageGroup");
            let pages = memPageGroup.getChildren();
            lodash.forEach(pages, function (v: ccui.Layout, i) {
                v['index'] = i;
                v.setPosition(0, 0);
                v.setVisible(false);
            });
            (new SubMemPage()).setIndex(0).initWidthNode(pages[0], this.searchMgr, this.tea_cell_member_mode);
            (new SubApyPage()).setIndex(1).initWidthNode(pages[1], this.searchMgr, this.tea_cell_apply_mode);
            (new SubStatPage()).setIndex(2).initWidthNode(pages[2], this.searchMgr, this.tea_cell_stat_mode);
        }

        // @BindEvent('tea', 'ui::TeaHouse::Member::UpdateMemberInfo')//, { totalnum: this.__totalnum, onlinenum: this.__onlinenum });
        onUpdateMemberInfo(data: { totalnum: number, onlinenum: number, partnermemsnum: number, partnermemsonlinenum: number }) {
            if (!!tea.mod.__teaHouseInfo) {
            }
        }

        mustLoad: boolean = false;
        Show(data) {
            let self = this;
            this.mustLoad = true;
            this.searchMgr.clearString();
            this.setVisible(true);
            kaayou.pop.ShowMainAnim({
                tNode: ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "top_bar"),
                bNode: this.node.getChildByName("contentPanel"),
                mNode: this.node.getChildByName('maskbg'),
                action: function () {
                    self.onTeaHouseUpdateInfo(data);
                }
            });
        }

        Hide() {
            this.mustLoad = false;
            this.setVisible(false);
            kaayou.emit('teaMem', 'ui::Member::SubpageChange', { index: -1 })
        }
    }
}