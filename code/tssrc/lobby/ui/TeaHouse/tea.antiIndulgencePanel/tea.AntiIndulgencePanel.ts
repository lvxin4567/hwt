/// <reference path="tea.SubFcmSettingPage.ts" />
/// <reference path="tea.SubFcmScopePage.ts" />
/// <reference path="tea.SubFcmManagePage.ts" />
namespace tea {
    var { BindEvent, doBindEvent } = kaayou._decorator;

    export class tea_AntiIndulgencePanelMgr {
        static __INS__: tea_AntiIndulgencePanelMgr = null;
        static getInstance(_zOrder: number = 0) {
            if (tea_AntiIndulgencePanelMgr.__INS__ == null) {
                tea_AntiIndulgencePanelMgr.__INS__ = new tea_AntiIndulgencePanelMgr();
                tea_AntiIndulgencePanelMgr.__INS__.init();
                tea_AntiIndulgencePanelMgr.__INS__._zOrder = _zOrder
            }
            return tea_AntiIndulgencePanelMgr.__INS__;
        }
        _zOrder: number = 0
        __selfPanel: AntiIndulgencePanel = null;
        _teaData: tea.Data_HouseInfo = null;
        init() {
            let self = this;
            this.__selfPanel = null;

            kaayou.getController('tea').on('ui::AntiIndulgencePanel::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show(self._teaData);
            }, this, 10);
            kaayou.getController('tea').on('ui::AntiIndulgencePanel::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new AntiIndulgencePanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel, this._zOrder);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }
    }

    export class AntiIndulgencePanel extends kaayou.Layer {
        constructor() {
            super();
            this.initUI();
        }
        btnClearAll: ccui.Button = null;//一键清除
        firstIndex = 0;
        prfScopeMeberRow: ccui.Layout = null;//生效范围成员列表项
        prfManageRow: ccui.Layout = null;//比赛分管理成员列表像

        ThFcm_count_cell_mode: ccui.Layout = null;  //比赛分统计列表项

        ThFcm_wareHouse_cell_mode: ccui.Layout = null;  //大赢家统计
        ThFcm_partnerCunt_cell: ccui.Layout = null;      //队长统计item
        th_gamenumber_cell_mode: ccui.Layout = null;//对局统计
        tea_call_partner_config: ccui.Layout = null;
        //亲友圈
        topbarMgr: lobby.TopBarMgr = null;
        _pageIndex: number = 0;
        searchMgr: FcmSearchWidget = null;

        selectMgr: FcmSearchWidget = null;

        authFcmPanel() {
            if (!!tea.mod.__teaHouseInfo) {
                let role = tea.mod.__teaHouseInfo.urole;
                let configData = common.mod.Config.GetAppConfig();
                let fcm = configData.feature.pl;
                let bAdmin = tea.mod.__teaHouseInfo.isvitaminhide;
                let bPartner = tea.mod.__teaHouseInfo.ispartnerhide;
                //如果未开启防沉迷，则入口都没有，不用在这里判断，必须重启才生效
                if (fcm) {
                    if (role == HouseMemberRole.MEMBER) {
                        this.Hide();
                    } else if (role == HouseMemberRole.ADMIN && !bAdmin) {
                        this.Hide();
                    } else if (role == HouseMemberRole.CAPTAIN && !bPartner) {
                        this.Hide();
                    }
                } else {
                    this.Hide();
                }
            }
        }

        // @doBindEvent
        initUI() {
            let self = this;
            this.initWithccs(tea.res.AntiIndulgencePanel_json);
            this.topbarMgr = new lobby.TopBarMgr(ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "top_bar"));
            this.topbarMgr.setTitle('时段赛设置');
            this.topbarMgr.setOnCloseClick(function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.Hide();
            }.bind(this));
            this.btnClearAll = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "ClearAll");
            this.btnClearAll.on(kaayou.TouchEvent.TouchEnd, () => {
                let options = {};
                if (self._pageIndex == 4) {
                    options = {
                        title: "",
                        msg: "是否清空所有人的大赢家次数？",
                        close: {
                            isShow: false,
                            action: null,
                        },
                        btns: [
                            {
                                name: "确定",
                                action: function () {
                                    kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                                    kaayou.emit("tea", "mod::Record::ClearAllBigWin", {
                                        hid: tea.mod.__teaHouseInfo.hid,
                                        recordtype: 0
                                    });
                                }.bind(self),
                                colorType: 'green'
                            },
                            {
                                name: "取消",
                                action: function () {
                                    kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                                    //return false;
                                }.bind(self),
                                colorType: 'blue'
                            }
                        ]
                    }
                } else {
                    options = {
                        title: "",
                        msg: "是否清空所有人的对局次数？",
                        close: {
                            isShow: false,
                            action: null,
                        },
                        btns: [
                            {
                                name: "确定",
                                action: function () {
                                    kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                                    kaayou.emit("tea", "mod::Record::ClearAllGameNumber", {
                                        hid: tea.mod.__teaHouseInfo.hid,
                                        recordtype: 1
                                    });
                                }.bind(self),
                                colorType: 'green'
                            },
                            {
                                name: "取消",
                                action: function () {
                                    kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                                    //return false;
                                }.bind(self),
                                colorType: 'blue'
                            }
                        ]
                    }
                }
                kaayou.emit("common", "ui::Dialog::Show", options);
            }, this);
            this.initLeftMenu();
            this.initRightPages();
            kaayou.getController('tea').on('ui::TeaHouse::UpdateTiredBlock', function (e: kaayou.Event) {
                self.authFcmPanel();
            }, this, 10);
            this.Hide();
        }

        //绑定的身份变更-------------------就是给不同的玩家显示不同的页签
        onTeaHouseUpdateInfo(data: tea.Data_HouseInfo) {
            if (!tea.mod.__teaHouseInfo) {
                return;
            }
            let teaInfo: tea.Data_HouseInfo = tea.mod.__teaHouseInfo
            let role = teaInfo.urole;
            (<ccui.CheckBox>this._MenuGroup.getChildren()[0]).setVisible(role == HouseMemberRole.OWNER);
            (<ccui.CheckBox>this._MenuGroup.getChildren()[1]).setVisible(role == HouseMemberRole.OWNER
                || (role == HouseMemberRole.CAPTAIN && teaInfo.ispartnerhide)
                || teaInfo.vitamin_admin
                || teaInfo.vice_partner && teaInfo.ispartnerhide);
            (<ccui.CheckBox>this._MenuGroup.getChildren()[2]).setVisible(role == HouseMemberRole.OWNER || teaInfo.vitamin_admin);
            (<ccui.CheckBox>this._MenuGroup.getChildren()[3]).setVisible(role == HouseMemberRole.OWNER || teaInfo.vitamin_admin);
            if (role == HouseMemberRole.ADMIN) {
                (<ccui.CheckBox>this._MenuGroup.getChildren()[1]).setVisible(teaInfo.isvitaminhide);
                (<ccui.CheckBox>this._MenuGroup.getChildren()[2]).setVisible(teaInfo.isvitaminhide);
            }
            this._MenuGroup.doChildrenLayout();
            for (let i = 0; i < this._MenuGroup.getChildren().length; ++i) {
                if ((<ccui.CheckBox>this._MenuGroup.getChildren()[i]).visible) {
                    this.firstIndex = i;
                    break;
                }
            }
        }

        _MenuGroup: ccui.ScrollView = null;

        initLeftMenu() {
            let self = this;
            let ctrName = "teaFcm"
            let subpageChangeEventName = "ui::AntiIndulgencePanel::SubpageChange";

            //初始化左侧菜单
            this._MenuGroup = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "rc_menu_layout");
            this._MenuGroup.setPadding({ spacingY: 5 });
            this._MenuGroup.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Vertical);
            this._MenuGroup.setVertical(ccui.Layout.LayoutVertical.TOP);
            this._MenuGroup.setScrollBarEnabled(false);


            lodash.forEach(this._MenuGroup.getChildren(), function (v: ccui.CheckBox, i) {
                v['index'] = i;
                v.on(kaayou.CheckEvent.SELECTED, (e: kaayou.TouchEvent) => {
                    let target = e.target;
                    let { index } = target;
                    kaayou.emit(ctrName, subpageChangeEventName, { index })
                }, this);
                v.on(kaayou.CheckEvent.UNSELECTED, (e: kaayou.TouchEvent) => {
                    let target = e.target;
                    let { index } = target;
                    kaayou.emit(ctrName, subpageChangeEventName, { index })
                }, this);
                v['onSubpageChange'] = function (e: kaayou.Event) {
                    let _data = e.data;
                    let { index } = _data;
                    if (this.index == index) {
                        self._pageIndex = index;
                        this.setSelected(true);
                        (<ccui.ImageView>this.getChildByName("ON")).setVisible(true);
                        (<ccui.ImageView>this.getChildByName("OFF")).setVisible(false);
                    } else {
                        this.setSelected(false);
                        (<ccui.ImageView>this.getChildByName("ON")).setVisible(false);
                        (<ccui.ImageView>this.getChildByName("OFF")).setVisible(true);
                    }
                }
                kaayou.getController(ctrName).on(subpageChangeEventName, v['onSubpageChange'], v);
            })
            this._MenuGroup.doChildrenLayout();
        }

        rightPageGroup: ccui.Layout = null;
        initRightPages() {
            let self = this;

            let ctrName = "teaFcm"
            let onSearchEventName = "ui::Fcm::onSearch";
            let onSelectEventName = "ui::record::onSelect";

            this.prfScopeMeberRow = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "th_scope_member_row");
            this.prfManageRow = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "th_manage_row");

            this.ThFcm_count_cell_mode = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "ThFcm_count_cell_mode");
            this.ThFcm_wareHouse_cell_mode = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "ThFcm_wareHouse_cell_mode");
            this.th_gamenumber_cell_mode = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "th_gamenumber_cell");
            this.tea_call_partner_config = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "tea_call_partner_config");
            //this.ThFcm_partnerCunt_cell = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "ThFcm_PartnerCunt_cell");
            this.searchMgr = new FcmSearchWidget();
            this.searchMgr.initWidthNode(ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "searchR_layout"), () => {
                kaayou.emit(ctrName, onSearchEventName);
            });

            // this.selectMgr = new RecordSelectWidget();
            // this.selectMgr.initWidthNode(ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "selectR_layout"), this.node, () => {
            //     kaayou.emit(ctrName, onSelectEventName);
            // });

            this.rightPageGroup = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "rightPageGroup");
            let pages = this.rightPageGroup.getChildren();
            lodash.forEach(pages, function (v: ccui.Layout, i) {
                v['index'] = i;
                v.setPosition(0, 0);
                v.setVisible(false);
            });

            (new SubFcmSettingPage()).setIndex(0).initWidthNode(pages[0], this.searchMgr);
            //(new SubFcmScopePage()).setIndex(1).initWidthNode(pages[1], this.prfScopeMeberRow);
            (new SubFcmManagePage()).setIndex(1).initWidthNode(pages[1], this.searchMgr, this.prfManageRow);
            (new SubFcmCountPage()).setIndex(2).initWidthNode(pages[2], this.searchMgr, this.ThFcm_count_cell_mode);
            (new SubFcmWareHousePage()).setIndex(3).initWidthNode(pages[3], this.searchMgr, this.ThFcm_wareHouse_cell_mode);
        }

        Show(data) {
            this.onTeaHouseUpdateInfo(data);
            this.searchMgr.clearString();
            this.setVisible(true);
            kaayou.pop.ShowMainAnim({
                tNode: ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "top_bar"),
                bNode: this.node.getChildByName("contentPanel"),
                mNode: this.node.getChildByName('maskbg'),
            });

            let ctrName = "teaFcm"
            let subpageChangeEventName = "ui::AntiIndulgencePanel::SubpageChange";

            kaayou.emit(ctrName, subpageChangeEventName, { index: this.firstIndex });
        }

        Hide() {
            this.setVisible(false);
            let ctrName = "teaFcm"
            let subpageChangeEventName = "ui::AntiIndulgencePanel::SubpageChange";
            kaayou.emit(ctrName, subpageChangeEventName, { index: -1 })
        }
    }
}