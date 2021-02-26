/// <reference path="tea.RecordSearchWidget.ts" />
/// <reference path="tea.RecordSelectWidget.ts" />
/// <reference path="tea.SubRcMinePage.ts" />
/// <reference path="tea.SubRcCirclePage.ts" />
/// <reference path="tea.SubRcMemPage.ts" />
/// <reference path="tea.SubRcBigWinPage.ts" />
/// <reference path="tea.SubRcGameNumberPage.ts" />

namespace tea {
    var { BindEvent, doBindEvent } = kaayou._decorator;

    export class tea_TeaRecordPanelMgr {
        static __INS__: tea_TeaRecordPanelMgr = null;
        static getInstance() {
            if (tea_TeaRecordPanelMgr.__INS__ == null) {
                tea_TeaRecordPanelMgr.__INS__ = new tea_TeaRecordPanelMgr();
                tea_TeaRecordPanelMgr.__INS__.init();
            }
            return tea_TeaRecordPanelMgr.__INS__;
        }
        __selfPanel: RecordPanel = null;
        _teaData: tea.Data_HouseInfo = null;
        init() {
            let self = this;
            this.__selfPanel = null;

            kaayou.getController('tea').on('ui::TeaHouse::UpdateInfo', function (e: kaayou.Event) {
                if (!e.data) {
                    return;
                }
                self._teaData = e.data;
                self.getPanel(false) && self.getPanel(false).onTeaHouseUpdateInfo();
            }, this, 10);

            kaayou.getController('tea').on('ui::Record::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show(self._teaData);
            }, this, 10);
            kaayou.getController('tea').on('ui::Record::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new RecordPanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }

    }

    export class RecordPanel extends kaayou.Layer {
        
        
        constructor() {
            super();
            this.initUI();
        }

        btnClearAll: ccui.Button = null;//一键清除

        record_btn: ccui.Button;

        layout_dishint: ccui.Layout;

        th_record_cell_mode: ccui.Layout = null;    //我的战绩

        th_memrc_cell_mode: ccui.Layout = null; //成员战绩

        th_business_cell_mode: ccui.Layout = null;  //运营战绩

        th_bigwin_cell_mode: ccui.Layout = null;  //大赢家统计

        th_gamenumber_cell_mode: ccui.Layout = null;//对局统计

        tea_call_partner_wumeng: ccui.Layout = null;

        //亲友圈
        topbarMgr: lobby.TopBarMgr = null;
        _pageIndex: number = 0;
        //lw200514如果调整了页签，这里要跟着改
        bigWinIndex: number = 5;//大赢家页签index
        searchMgr: RecordSearchWidget = null;
        selectMgr: RecordSelectWidget = null;
        dateMgr:RecordDateWidget = null;
        // @doBindEvent
        initUI() {
            let self = this;
            this.initWithccs(tea.res.RecordPanel_json);
            this.topbarMgr = new lobby.TopBarMgr(ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "top_bar"));
            this.topbarMgr.setTitle('');
            this.topbarMgr.setOnCloseClick(function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.Hide();
            }.bind(this));
            
            this.btnClearAll = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "ClearAll");
            this.btnClearAll.on(kaayou.TouchEvent.TouchEnd, () => {
                let options = {};
                if (self._pageIndex == this.bigWinIndex) {
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
            this.initUserRoleWatcher()
            this.Hide();
            kaayou.getController("tea").on("ui::RecordPanel::RecordTimeIntervalChange", function (e: kaayou.Event) {
                let options = {
                    title: "",
                    msg: "战绩筛选时间段已改变，需重新打开战绩更新数据。",
                    close: {
                        isShow: false,
                        action: null,
                    },
                    btns: [
                        {
                            name: "确定",
                            action: function () {
                                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                                kaayou.emit("tea","ui::TimeFliterPanel::Hide");
                                kaayou.emit("tea","ui::RecordNoAllianceInfoDialog::Hide");
                                kaayou.emit("tea","ui::HousegamerecordDialog::Hide");
                                self.Hide();
                            }.bind(self),
                            colorType: 'green'
                        }
                    ]
                }
                if(self.isVisible()) kaayou.emit("common", "ui::Dialog::Show", options);
            }, this);
        }


        //绑定的身份变更-------------------就是给不同的玩家显示不同的页签
        onTeaHouseUpdateInfo() {
            let roleAuth1 = tea.mod.Permission.getInstance().hasPermission("成员战绩");
            let roleAuth2 = tea.mod.Permission.getInstance().hasPermission("圈子战绩");
            let roleAuth3 = tea.mod.Permission.getInstance().hasPermission("团队统计");

            (<ccui.CheckBox>this._MenuGroup.getChildren()[1]).setVisible(roleAuth1);
            (<ccui.CheckBox>this._MenuGroup.getChildren()[2]).setVisible(roleAuth2);
            (<ccui.CheckBox>this._MenuGroup.getChildren()[3]).setVisible(roleAuth3);

            this.CheckUserRole();
            this._MenuGroup.doChildrenLayout();
            //lw191205如果当前页签没权限了，则显示第一个页签
            if (!(<ccui.CheckBox>this._MenuGroup.getChildren()[this._pageIndex]).visible) {
                let ctrName = "teaRC"
                let subpageChangeEventName = "ui::record::SubpageChange";
                kaayou.emit(ctrName, subpageChangeEventName, { index: 0 });
            }
        }

        initUserRoleWatcher(){
            let self=this;
            let promiss = tea.mod.House.getPromissionInstance();
            promiss.watch("成员战绩",(data)=>{
                self.onTeaHouseUpdateInfo();
            })

            promiss.watch("圈子战绩",(data)=>{
                self.onTeaHouseUpdateInfo();
            })

            promiss.watch("团队统计",(data)=>{
                self.onTeaHouseUpdateInfo();
            })
        }

        CheckUserRole(){
            let memberRecord =  (<ccui.CheckBox>this._MenuGroup.getChildren()[1])
            let groupRecord =  (<ccui.CheckBox>this._MenuGroup.getChildren()[2])
            let teamRecord =  (<ccui.CheckBox>this._MenuGroup.getChildren()[3])

            let promiss = tea.mod.House.getPromissionInstance();

            tea.mod.Permission.getInstance().hasPermission("团队统计");

            memberRecord.setVisible(tea.mod.Permission.getInstance().hasPermission("成员战绩"))
            groupRecord.setVisible(tea.mod.Permission.getInstance().hasPermission("圈子战绩"))
            teamRecord.setVisible(tea.mod.Permission.getInstance().hasPermission("团队统计"))
        }



        _MenuGroup: ccui.ScrollView = null;


        canQueryTeamRecord() {
            const urole = tea.mod.__teaHouseInfo.urole
            return (tea.mod.__teaHouseInfo.vitamin_admin === true || tea.mod.__teaHouseInfo.urole === HouseMemberRole.CPADMIN) 
                || urole === HouseMemberRole.OWNER || urole === HouseMemberRole.CAPTAIN || urole===HouseMemberRole.VICECAPTAIN;
        }

        initLeftMenu() {
            let self = this;
            let ctrName = "teaRC"
            let subpageChangeEventName = "ui::record::SubpageChange";

            //初始化左侧菜单
            this._MenuGroup = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "rc_menu_layout");
            this._MenuGroup.setPadding({bottom:0});
            this._MenuGroup.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Horizontal);
            this._MenuGroup.setHorizontal(ccui.Layout.LayoutHorizontal.LEFT);
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

            let ctrName = "teaRC"
            let onSearchEventName = "ui::record::onSearch";
            let onSelectEventName = "ui::record::onSelect";

            this.th_record_cell_mode = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "th_record_cell");

            this.th_memrc_cell_mode = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "th_memrc_cell");

            this.th_business_cell_mode = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "th_business_cell");
            this.th_bigwin_cell_mode = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "th_bigwin_cell");
            this.th_gamenumber_cell_mode = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "th_gamenumber_cell");

            this.layout_dishint = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "layout_dishint");

            this.tea_call_partner_wumeng = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "tea_call_partner_wumeng");

            this.record_btn = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "record_btn");
            this.record_btn.on(kaayou.TouchEvent.TouchEnd , ()=>{
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit("lobby", 'ui::JoinRecord::Show');
            },this)

            this.searchMgr = new RecordSearchWidget();
            this.searchMgr.initWidthNode(ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "searchR_layout"), () => {
                kaayou.emit(ctrName, onSearchEventName);
            });

            this.selectMgr = new RecordSelectWidget();
            this.selectMgr.initWidthNode(ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "selectR_layout"), this.node, () => {
                kaayou.emit(ctrName, onSelectEventName);
            });

            this.dateMgr = new RecordDateWidget();
            this.dateMgr.initWidthNode(ccui.helper.seekWidgetByName(<ccui.Widget>this.node,"dateSelect_layout"),
                ccui.helper.seekWidgetByName(<ccui.ScrollView>this.node, "lyLeftMenuItem"),
                ()=>{
                kaayou.emit(ctrName, "do::teaRC::time::change");
            });


            this.rightPageGroup = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "rightPageGroup");
            let pages = this.rightPageGroup.getChildren();
            lodash.forEach(pages, function (v: ccui.Layout, i) {
                v['index'] = i;
                v.setPosition(0, 0);
                v.setVisible(false);
            });

            (new SubRcMinePage()).setIndex(0).initWidthNode(pages[0], this.searchMgr, this.selectMgr, this.dateMgr,this.th_record_cell_mode, this.btnClearAll , this.layout_dishint);
            (new SubRcMemPage()).setIndex(1).initWidthNode(pages[1], this.searchMgr, this.selectMgr, this.dateMgr, this.th_memrc_cell_mode, this.btnClearAll);
            (new SubRcCirclePage()).setIndex(2).initWidthNode(pages[2], this.searchMgr, this.selectMgr, this.dateMgr, this.th_record_cell_mode, this.btnClearAll, this.layout_dishint);
            (new RecordNounionPanel()).setIndex(3).initWithNode(pages[3], this.searchMgr, this.selectMgr,this.dateMgr, this.tea_call_partner_wumeng, this.btnClearAll);
            (new SubRcBusinessPage()).setIndex(4).initWidthNode(pages[4], this.searchMgr, this.selectMgr, this.th_business_cell_mode, this.btnClearAll);
            (new SubRcBigWinPage()).setIndex(this.bigWinIndex).initWidthNode(pages[this.bigWinIndex], this.searchMgr, this.selectMgr, this.th_bigwin_cell_mode, this.btnClearAll);
            (new SubRcGameNumberPage()).setIndex(6).initWidthNode(pages[6], this.searchMgr, this.selectMgr, this.th_gamenumber_cell_mode, this.btnClearAll);
        }

        Show(data) {
            this.onTeaHouseUpdateInfo();
            this.searchMgr.clearString();
            this.setVisible(true);
            kaayou.pop.ShowMainAnim({
                tNode: ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "top"),
                bNode: this.node.getChildByName("contentPanel"),
                mNode: this.node.getChildByName('maskbg'),
            });

            let ctrName = "teaRC"
            let subpageChangeEventName = "ui::record::SubpageChange";
            kaayou.emit(ctrName, subpageChangeEventName, { index: 0 })
        }
        Hide() {
            this.setVisible(false);
            let ctrName = "teaRC"
            let subpageChangeEventName = "ui::record::SubpageChange";
            kaayou.emit(ctrName, subpageChangeEventName, { index: -1 })
        }
    }

}