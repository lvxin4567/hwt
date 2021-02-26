namespace tea {
    var { BindEvent, doBindEvent } = kaayou._decorator;

    class ManagerPanelCell extends kaayou.Block {
        constructor() {
            super();
        }

        layout_head: ccui.Layout = null;
        label_house_id: ccui.Text = null;
        label_onwer_name: ccui.Text = null;
        label_house_name: ccui.Text = null;
        btn_enter: ccui.Button = null;
        btn_dismiss: ccui.Button = null;
        btn_exit: ccui.Button = null;
        image_head: ccui.ImageView = null;
        initWithNode(node: ccui.Widget) {
            super.initWithNode(node);
            this.layout_head = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "layout_head");
            this.label_house_id = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_house_id");
            this.label_onwer_name = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_onwer_name");
            this.label_house_name = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_house_name");
            this.btn_enter = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_enter");
            this.btn_dismiss = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_dismiss");
            this.btn_exit = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_exit");
            this.image_head = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "image_head");
            let self = this;

            let defaultoptions = {
                title: "",
                msg: "",
                close: {
                    isShow: false,
                    action: null,
                },
                btns: [
                    {
                        name: "确定",
                        action: null,
                        colorType: 'green'
                    },
                    {
                        name: "取消",
                        action: function () {
                            //return false;
                        },
                        colorType: 'blue'
                    }
                ]
            }

            this.btn_exit.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                if (lodash.isEmpty(self._data)) { return; }
                let options = lodash.cloneDeep(defaultoptions);
                options.msg = `是否退出亲友圈【${self._data.hid}】?`;
                options.btns[0].action = function () {
                    kaayou.emit("tea", "mod::TeaHouse::Exit", { hid: self._data.hid });
                }
                kaayou.emit("common", "ui::Dialog::Show", options);
            }, this);

            this.btn_dismiss.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                if (lodash.isEmpty(self._data)) { return; }
                let options = lodash.cloneDeep(defaultoptions);
                options.msg = `是否解散亲友圈【${self._data.hid}】?`;
                options.btns[0].action = function () {
                    kaayou.emit("tea", "mod::TeaHouse::Dismiss", { hid: self._data.hid });
                }
                kaayou.emit("common", "ui::Dialog::Show", options);
            }, this);

            this.btn_enter.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                if (lodash.isEmpty(self._data)) { return; }
                let options = lodash.cloneDeep(defaultoptions);
                options.msg = `是否进入【${self._data.hid}】亲友圈？`;
                options.btns[0].action = function () {
                    kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                    kaayou.emit("tea", "mod::TeaHouse::Enter", { hid: self._data.hid });
                }
                options.btns[1].action = function () {
                    kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                }
                kaayou.emit("common", "ui::Dialog::Show", options);
            }, this);

            //lw191220隐藏亲友圈号
            kaayou.getController('tea').on('ui::TeaHouse::HideHID', function (e: kaayou.Event) {
                if (!!e.data) {
                    if (e.data.hid == self._data.hid) {
                        self.label_house_id.setVisible(!e.data.ishidhide);
                    }
                }
            }, this, 10);
        }

        doUpdate() {

        }

        _data: Data_HouseItem_cell = null;
        setInfo(data: Data_HouseItem_cell) {
            this._data = null;
            if (lodash.isEmpty(data)) {
                this.layout_head.setVisible(false);
                this.label_house_id.setString("");
                this.label_onwer_name.setString("");
                this.label_house_name.setString("");
                this.btn_enter.setVisible(false);
                this.btn_dismiss.setVisible(false);
                this.btn_exit.setVisible(false);
                return
            }
            this._data = data;
            //lw191101隐藏头像
            this.layout_head.setVisible(false);
            this.label_house_id.setVisible(!data.ishidhide);
            this.label_house_id.setString("圈ID:" + data.hid);
            this.label_onwer_name.setString("圈主:" + kaayou.Identify.nickNameSubEight(data.ownername));
            this.label_house_name.setString("" + data.hname);
            this.btn_enter.setVisible(!data.iscur);
            this.btn_dismiss.setVisible(data.ismine);
            this.btn_exit.setVisible(!data.ismine);
            //NetImage.setPlayerHead(this.image_head, data.ownerurl)
        }

        unuse() {
            this._data = null;
            this.removeFromParent();
        }

    }

    export class tea_SettingBlockMgr {
        static __INS__: tea_SettingBlockMgr = null;
        static getInstance(_zOrder:number) {
            if (tea_SettingBlockMgr.__INS__ == null) {
                tea_SettingBlockMgr.__INS__ = new tea_SettingBlockMgr();
                tea_SettingBlockMgr.__INS__.init();
                tea_SettingBlockMgr.__INS__._zOrder = _zOrder;
            }
            return tea_SettingBlockMgr.__INS__;
        }
        __selfPanel: SettingBlockPanel = null;
        _data: tea.Data_HouseInfo = null;
        _zOrder:number = 0;
        init() {
            let self = this;
            this.__selfPanel = null;
            kaayou.getController('tea').on('ui::TeaHouse::UpdateInfo', function (e: kaayou.Event) {
                if (!e.data) {
                    return;
                }
                self._data = e.data;
                // self.getPanel(false) && self.getPanel(false).onTeaHouseUpdateInfo(e.data);
            }, this, 10);

            kaayou.getController('tea').on('ui::SettingBlock::Show', function (e: kaayou.Event) {
                if (kaayou.UIManager.getInstance().getCurRuningSceneName() != "TEAHOUSE") return;
                self.getPanel(true).Show(self._data);
            }, this, 10);

            kaayou.getController('tea').on('ui::SettingBlock::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);

            


            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new SettingBlockPanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel,this._zOrder);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }

    }

    export class SettingBlockPanel extends kaayou.ModelLayer {
        constructor() {
            super();
            this.initUI();
        }
        topbarMgr: lobby.TopBarMgr = null;
        // @doBindEvent
        initUI() {
            let self = this;
            this.isTouchMaskHide = false;
            this.initWithccs(tea.res.TH_SettingBlock_Json);
            this.topbarMgr = new lobby.TopBarMgr(ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "top_bar"));
            this.topbarMgr.setTitle('亲友圈设置');
            this.topbarMgr.setOnCloseClick(function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.Hide();
            }.bind(this));
            this.initLeftMenu();
            this.initRightPages();
            this.Hide();
        }
        menuGroup: common.RadioGroup = null;
        mgrMenuGroup: ccui.ScrollView = null;
        _pageIndex:number = 0;
        initLeftMenu() {
            let self = this;
            //初始化左侧菜单
            let ctrName = "teaST"
            let subpageChangeEventName = "ui::Setting::SubpageChange";
            this.mgrMenuGroup = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "mgr_menu_layout");
            this.mgrMenuGroup.setPadding({ spacingY: 10, left: 10 });
            this.mgrMenuGroup.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Vertical);
            this.mgrMenuGroup.setVertical(ccui.Layout.LayoutVertical.TOP);
            this.mgrMenuGroup.setScrollBarEnabled(false);

            this.menuGroup = new common.RadioGroup();

            // lodash.forEach(this.mgrMenuGroup.getChildren(), function (v: ccui.CheckBox, i) {
            //     let t = <ccui.Text>v.getChildByName('label');
            //     v['index'] = i;
            //     // t.setPositionX(26);
            //     // t.setTextColor(cc.color("#1D5B85"));
            //     v.on(kaayou.RadioEvent.SELECTED, self.onMenuSelected, self);
            //     v.on(kaayou.RadioEvent.UNSELECTED, self.onMenuUnSelected, self);
            //     self.menuGroup.add(v);
            // })
            lodash.forEach(this.mgrMenuGroup.getChildren(), function (v: ccui.CheckBox, i) {
                v['index'] = i;
                v.on(kaayou.CheckEvent.SELECTED, (e: kaayou.TouchEvent) => {
                    kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
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
            this.mgrMenuGroup.doChildrenLayout();
        }
        // onMenuSelected(e: kaayou.RadioEvent) {
        //     kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
        //     let index = e.target['index'];
        //     let v = <ccui.CheckBox>e.target;
        //     (<ccui.ImageView>v.getChildByName("ON")).setVisible(true);
        //     (<ccui.ImageView>v.getChildByName("OFF")).setVisible(false);
        //     let pages = this.mgrPageGroup.getChildren();

        //     lodash.forEach(pages, function (v: ccui.Layout, i) {
        //         v.setVisible(i == index);
        //     });
        //     // let fp = [null, this.doGetMineTeaHouse, this.doGetIntrantTeaHouse];
        //     // if (fp[index]) {
        //     //     fp[index].apply(this);
        //     // }
        // }

        onMenuUnSelected(e: kaayou.RadioEvent) {
            let v = <ccui.CheckBox>e.target;
            (<ccui.ImageView>v.getChildByName("ON")).setVisible(false);
            (<ccui.ImageView>v.getChildByName("OFF")).setVisible(true);
        }
        rightPageGroup: ccui.Layout = null;
        th_Tea_cell_mode:ccui.Layout = null;
        th_Set_cell_mode:ccui.Layout = null;
        initRightPages() {
            let self = this;
            this.th_Tea_cell_mode = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "tea_cell_mode");
            this.th_Set_cell_mode = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "tea_cell_baseSet");
            this.rightPageGroup = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "rightPageGroup");
            let pages = this.rightPageGroup.getChildren();
            lodash.forEach(pages, function (v: ccui.Layout, i) {
                v['index'] = i;
                v.setPosition(0, 0);
                v.setVisible(false);
            });
            (new SubStBasePage()).setIndex(0).initWidthNode(pages[0],this.th_Set_cell_mode);
            (new SubMyTeaPage()).setIndex(1).initWidthNode(pages[1], this.th_Tea_cell_mode);
            (new SubMergeTeaPage()).setIndex(2).initWidthNode(pages[2]);

            let prom =  tea.mod.House.getInstance().promissionInstance()
            prom.watch("my_tea",(data)=>{
                // let isCanUse = data["minor_status"].new === tea.mod.House.PERMISSION_TYPE.ESCALATION;
                (<ccui.CheckBox>this.mgrMenuGroup.getChildren()[1]).setVisible(tea.mod.Permission.getInstance().hasPermission("我的亲友圈"));
            })
            prom.watch("merge_tea",(data)=>{
                // let isCanUse = data["minor_status"].new === tea.mod.House.PERMISSION_TYPE.ESCALATION;
                (<ccui.CheckBox>this.mgrMenuGroup.getChildren()[2]).setVisible(tea.mod.Permission.getInstance().hasPermission("合并亲友圈"));
            })

        }
 
        Show(data: tea.Data_HouseInfo) {
            let ctrName = "teaST"
            let subpageChangeEventName = "ui::Setting::SubpageChange";
            // if (!!(data.teahouserule & HouseRoleTable.EDIT_HOUSE_SET)) {
            //     (<ccui.CheckBox>this.mgrMenuGroup.getChildren()[0]).setRadioSelected();
            //     // (<ccui.CheckBox>this.noticeSwitchLayout.getChildren()[0]).setRadioSelected();
            // } else {
            //     (<ccui.CheckBox>this.mgrMenuGroup.getChildren()[1]).setRadioSelected();
            // }
            kaayou.emit("common", "ui::Loading::Show", { msg: '正在加载配置~', time: 2, addDot: false, noAni: true });
            
            (<ccui.CheckBox>this.mgrMenuGroup.getChildren()[1]).setVisible(tea.mod.Permission.getInstance().hasPermission("我的亲友圈"));
            (<ccui.CheckBox>this.mgrMenuGroup.getChildren()[2]).setVisible(tea.mod.Permission.getInstance().hasPermission("合并亲友圈"));
            this.mgrMenuGroup.doChildrenLayout();
            this.setVisible(true);
            var self = this;
            kaayou.pop.ShowMainAnim({
                tNode: ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "top_bar"),
                bNode: this.node.getChildByName("contentPanel"),
                mNode: this.node.getChildByName('maskbg'),
            });
            kaayou.emit(ctrName, subpageChangeEventName, { index: 0 })

        }

        Hide() {
            this.setVisible(false);
        }
    }
}