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

    export class tea_ManagerPanelMgr {
        static __INS__: tea_ManagerPanelMgr = null;
        static getInstance() {
            if (tea_ManagerPanelMgr.__INS__ == null) {
                tea_ManagerPanelMgr.__INS__ = new tea_ManagerPanelMgr();
                tea_ManagerPanelMgr.__INS__.init();
            }
            return tea_ManagerPanelMgr.__INS__;
        }
        __selfPanel: ManagerPanel = null;
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

            kaayou.getController('tea').on('ui::TeaHouse::UpdateMine', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).onUpdateMineTeaHouse(e.data);
            }, this, 10);

            kaayou.getController('tea').on('ui::TeaHouse::UpdateIntrant', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).onUpdateIntrantTeaHouse(e.data);
            }, this, 10);

            kaayou.getController('tea').on('ui::Manager::Show', function (e: kaayou.Event) {
                if (kaayou.UIManager.getInstance().getCurRuningSceneName() != "TEAHOUSE") return;
                self.getPanel(true).Show(self._data);
            }, this, 10);

            kaayou.getController('tea').on('ui::Manager::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new ManagerPanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }

    }

    export class ManagerPanel extends kaayou.ModelLayer {
        tea_cell_manager_mode: ccui.Layout = null;
        constructor() {
            super();
            this.initUI();
        }
        ebNotice: any = null;
        ebName: any = null;
        ndNotice: cc.Layer = null;
        ndName: cc.Layer = null;
        topbarMgr: lobby.TopBarMgr = null;
        sTitle: string = "";
        sContent: string = "";
        // @doBindEvent
        initUI() {
            let self = this;
            this.isTouchMaskHide = false;
            this.initWithccs(tea.res.ManagerPanel_json);
            this.ndName = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "NameInput");
            this.ndNotice = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "NoticeInput");
            this.topbarMgr = new lobby.TopBarMgr(ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "top_bar"));
            this.topbarMgr.setTitle('亲友圈管理');
            this.topbarMgr.setOnCloseClick(function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.Hide();
            }.bind(this));

            this.tea_cell_manager_mode = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "tea_cell_manager_mode");
            this.initLeftMenu();
            this.initRightPages();
            this.tea_cell_manager_mode.setVisible(false);
            this.Hide();
        }
        menuGroup: common.RadioGroup = null;
        mgrMenuGroup: ccui.ScrollView = null;
        initLeftMenu() {
            let self = this;
            //初始化左侧菜单

            this.mgrMenuGroup = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "mgr_menu_layout");
            this.mgrMenuGroup.setPadding({ spacingY: 10, left: 10 });
            this.mgrMenuGroup.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Vertical);
            this.mgrMenuGroup.setVertical(ccui.Layout.LayoutVertical.TOP);
            this.mgrMenuGroup.setScrollBarEnabled(false);

            this.menuGroup = new common.RadioGroup();

            lodash.forEach(this.mgrMenuGroup.getChildren(), function (v: ccui.CheckBox, i) {
                let t = <ccui.Text>v.getChildByName('label');
                v['index'] = i;
                // t.setPositionX(26);
                // t.setTextColor(cc.color("#1D5B85"));
                v.on(kaayou.RadioEvent.SELECTED, self.onMenuSelected, self);
                v.on(kaayou.RadioEvent.UNSELECTED, self.onMenuUnSelected, self);
                self.menuGroup.add(v);
            })
            this.mgrMenuGroup.doChildrenLayout();
        }
        onMenuSelected(e: kaayou.RadioEvent) {
            kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
            let index = e.target['index'];
            let v = <ccui.CheckBox>e.target;
            (<ccui.ImageView>v.getChildByName("ON")).setVisible(true);
            (<ccui.ImageView>v.getChildByName("OFF")).setVisible(false);
            let pages = this.mgrPageGroup.getChildren();

            lodash.forEach(pages, function (v: ccui.Layout, i) {
                v.setVisible(i == index);
            });
            let fp = [null, this.doGetMineTeaHouse, this.doGetIntrantTeaHouse];
            if (fp[index]) {
                fp[index].apply(this);
            }
        }

        onMenuUnSelected(e: kaayou.RadioEvent) {
            let v = <ccui.CheckBox>e.target;
            (<ccui.ImageView>v.getChildByName("ON")).setVisible(false);
            (<ccui.ImageView>v.getChildByName("OFF")).setVisible(true);
        }

        mgrPageGroup: ccui.Layout = null;
        btnSave: ccui.Button = null;
        scroll_mine: ccui.ScrollView = null;
        scroll_intrant: ccui.ScrollView = null;
        noticeSwitchLayout: ccui.Layout = null;
        noticeSwitch_Group: common.RadioGroup = null;
        selIndex: number = 0;
        initRightPages() {
            let self = this;
            //初始化左侧菜单
            this.mgrPageGroup = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "rightPageGroup");
            let pages = this.mgrPageGroup.getChildren();
            lodash.forEach(this.mgrPageGroup.getChildren(), function (v: ccui.Layout, i) {
                v['index'] = i;
                v.setPosition(0, 0);
                v.setVisible(false);
            });

            let pageSet = <ccui.Layout>pages[0];
            this.btnSave = ccui.helper.seekWidgetByName(pageSet, "btnSave");
            this.noticeSwitchLayout = ccui.helper.seekWidgetByName(pageSet, "noticeCblayout");
            this.noticeSwitch_Group = new common.RadioGroup();
            lodash.forEach(this.noticeSwitchLayout.getChildren(), function (v: ccui.CheckBox, i) {
                v['index'] = i;
                v.on(kaayou.RadioEvent.SELECTED, self.noticeSwitchChange, self);//
                self.noticeSwitch_Group.add(v);
            });

            //我的亲友圈
            let pageMine = <ccui.Layout>pages[1];
            this.scroll_mine = <ccui.ScrollView>pageMine.getChildren()[0];

            this.scroll_mine.setPadding({ spacingY: 8, top: 0, bottom: 20 });
            this.scroll_mine.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Vertical);
            this.scroll_mine.setVertical(ccui.Layout.LayoutVertical.TOP);
            this.scroll_mine.setScrollBarEnabled(false);
            //入驻的亲友圈
            let pageIntrant = <ccui.Layout>pages[2];
            this.scroll_intrant = <ccui.ScrollView>pageIntrant.getChildren()[0];

            this.scroll_intrant.setPadding({ spacingY: 8, top: 0, bottom: 20 });
            this.scroll_intrant.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Vertical);
            this.scroll_intrant.setVertical(ccui.Layout.LayoutVertical.TOP);
            this.scroll_intrant.setScrollBarEnabled(false);
            this.btnSave.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                //lw200729如果是禁用就不做检测
                if (!self.checkChange() && self.selIndex == 0) {
                    kaayou.emit("common", "ui::Toast::Show", { msg: "内容无变化。" });
                    return;
                }
                let hname = kaayou.blackList.checkBlackList(self.ebName.string);
                if (kaayou.blackList.checkBlackList(hname) != hname) {
                    kaayou.emit("common", "ui::Toast::Show", { msg: "亲友圈名称违规，请重新输入" });
                    return;
                }
                let noticeStr = kaayou.blackList.checkBlackList(this.ebNotice.string);
                //lw200214不允许换行
                noticeStr = noticeStr.replace(/[\r\n]+/g, "");
                if (self.selIndex == 0) {   //滚动公告
                    let modifyInfo: any = { hid: tea.mod.__teaHouseInfo.hid, hname: hname, hnotify: noticeStr };
                    kaayou.emit("tea", 'mod::TeaHouse::ModifyBaseNN', modifyInfo);
                } else {                      //滑动公告
                    kaayou.emit("tea", 'mod::TeaHouse::ModifyPopNotice', {
                        hid: tea.mod.__teaHouseInfo.hid,
                        content: noticeStr, active: !tea.mod.__teaHouseInfo.dialogactive
                    })
                }
            }, this);

            //亲友圈名字的editbox
            let sp = new cc["Scale9Sprite"]();
            sp.initWithFile(common.res.alpha_4x4, cc.rect(0, 0, 0, 0), cc.rect(0, 0, 0, 0));
            let eb: cc.Node = cc["EditBox"].create(this.ndName.getContentSize(), sp);
            this.ebName = eb;
            eb.setAnchorPoint(0, 0);
            eb.setPosition(0, 0);
            eb.setOpacity(0);
            eb['setFontSize'](25);
            eb['setFontColor'](cc.color("#FFF3C1"));
            eb['setInputMode'](6);
            eb['setMaxLength'](8);

            eb['setDelegate'](
                {
                    /**
                     * This method is called when an edit box gains focus after keyboard is shown.
                     * @param {cc.EditBox} sender
                     */
                    editBoxEditingDidBegin: function (sender) {
                        //console.log('editBoxEditingDidBegin');

                    },

                    /**
                     * This method is called when an edit box loses focus after keyboard is hidden.
                     * @param {cc.EditBox} sender
                     */
                    editBoxEditingDidEnd: function (ref) {
                        //console.log('editBoxEditingDidEnd',sender.getString());
                        let gstr = ref.getString();
                        self.checkCanchange();
                    },

                    /**
                     * This method is called when the edit box text was changed.
                     * @param {cc.EditBox} sender
                     * @param {String} text
                     */
                    editBoxTextChanged: function (sender, text) {
                        //console.log('editBoxTextChanged');
                        //self.lbName.setString(text);
                    },

                    /**
                     * This method is called when the return button was pressed.
                     * @param {cc.EditBox} sender
                     */
                    editBoxReturn: function (sender) {
                        //console.log('editBoxReturn',sender.getString());
                    }
                }
            )
            this.ndName.addChild(eb);

            //公告的editbox
            let sp1 = new cc["Scale9Sprite"]();
            let eb1: cc.Node = cc["EditBox"].create(this.ndNotice.getContentSize(), sp1);
            this.ebNotice = eb1;
            eb1.setAnchorPoint(0, 0);
            eb1.setPosition(0, 0);
            eb1.setOpacity(0);
            eb1['setFontSize'](20);
            eb1['setFontColor'](cc.color("#96BCE2"));
            // eb1['setInputMode'](6);
            eb1['setMaxLength'](50);

            eb1['setDelegate'](
                {
                    /**
                     * This method is called when an edit box gains focus after keyboard is shown.
                     * @param {cc.EditBox} sender
                     */
                    editBoxEditingDidBegin: function (sender) {
                        //console.log('editBoxEditingDidBegin');

                    },

                    /**
                     * This method is called when an edit box loses focus after keyboard is hidden.
                     * @param {cc.EditBox} sender
                     */
                    editBoxEditingDidEnd: function (ref) {
                        let gstr = ref.getString();
                        self.checkCanchange();
                    },

                    /**
                     * This method is called when the edit box text was changed.
                     * @param {cc.EditBox} sender
                     * @param {String} text
                     */
                    editBoxTextChanged: function (sender, text) {
                        //console.log('editBoxTextChanged');
                        //self.lbName.setString(text);
                    },

                    /**
                     * This method is called when the return button was pressed.
                     * @param {cc.EditBox} sender
                     */
                    editBoxReturn: function (sender) {
                        //console.log('editBoxReturn',sender.getString());
                    }
                }
            )
            this.ndNotice.addChild(eb1);
        }
        //切换公告模式
        noticeSwitchChange(e: kaayou.RadioEvent) {
            this.selIndex = e.target["index"];
            if (this.selIndex == 0) {
                (<ccui.TextBMFont>(this.btnSave.getChildByName("BitmapFontLabel_1"))).setString("修改");
                this.sContent = tea.mod.__teaHouseInfo.hnotify;
                this.ebNotice.setString(tea.mod.__teaHouseInfo.hnotify);
                //Patch.SetBtnAndTextBright(this.btnSave, this.ebName.string != tea.mod.__teaHouseInfo.hname);//

            } else {
                //还要根据是不是已经发送了显示禁用还是发送
                //Patch.SetBtnAndTextBright(this.btnSave, true);
                this.sContent = tea.mod.__teaHouseInfo.dialog;
                this.ebNotice.setString(tea.mod.__teaHouseInfo.dialog);
                if (tea.mod.__teaHouseInfo.dialogactive) {
                    (<ccui.TextBMFont>(this.btnSave.getChildByName("BitmapFontLabel_1"))).setString("禁用");
                } else {
                    (<ccui.TextBMFont>(this.btnSave.getChildByName("BitmapFontLabel_1"))).setString("发送");
                }

            }
            console.log("选择的公告type" + this.selIndex);
            kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
            // self.selIndex = i;
        }

        checkChange() {
            let self = this;
            if (self.sContent == self.ebNotice.string && self.sTitle == self.ebName.string) {
                return false;
            } else return true;
        }

        checkCanchange() {
            var self = this;
            if (self.selIndex == 0) {
                let bName = kaayou.Identify.isChorAbcorNum(self.ebName.string);
                if (self.ebName.string.length < 1 ||
                    self.ebName.string.length > 8 ||
                    !bName || self.ebNotice.string.length > 50) {
                    return false;
                } else {
                    return true;
                }
            } else {
                if (self.ebNotice.string.length > 50) {
                    return false;
                } else {
                    if (self.ebNotice.string != tea.mod.__teaHouseInfo.dialog) {
                        (<ccui.TextBMFont>(this.btnSave.getChildByName("BitmapFontLabel_1"))).setString("发送");
                    } else {
                        (<ccui.TextBMFont>(this.btnSave.getChildByName("BitmapFontLabel_1"))).setString("禁用");
                    }
                    return true;
                }
            }
        }

        doGetMineTeaHouse() {
            // kaayou.emit("tea", 'ui::TeaHouse::UpdateMine',[1,2,3]);
            kaayou.emit("tea", "mod::TeaHouse::RefreshList");
        }
        doGetIntrantTeaHouse() {
            //    kaayou.emit("tea", 'ui::Manager::UpdateIntrant',[1,2,3,4,5,6,7,8,9]);
            kaayou.emit("tea", "mod::TeaHouse::RefreshList");
        }

        private createCell(): ManagerPanelCell {
            let cell = kaayou.pool.getFromPool(ManagerPanelCell);
            if (!cell) {
                cell = new ManagerPanelCell();
            }
            cell.initWithNode(this.tea_cell_manager_mode);
            cell.setAnchorPoint(0, 0);
            cell.setPositionY(0);
            cell.setPositionX(0);
            cell.setVisible(true);
            return cell;
        }

        onTeaHouseUpdateInfo(data: tea.Data_HouseInfo) {
            <ccui.CheckBox>this.mgrMenuGroup.getChildren()[0].setVisible(!!(data.teahouserule & HouseRoleTable.EDIT_HOUSE_SET));
            this.sTitle = data.hname;
            this.ebName.setString(data.hname);
            if (this.selIndex == 0) {
                this.sContent = data.hnotify;
                this.ebNotice.setString(data.hnotify);
            } else {
                this.sContent = data.dialog;
                this.ebNotice.setString(data.dialog);
                if (data.dialogactive) {
                    (<ccui.TextBMFont>(this.btnSave.getChildByName("BitmapFontLabel_1"))).setString("禁用");
                } else {
                    (<ccui.TextBMFont>(this.btnSave.getChildByName("BitmapFontLabel_1"))).setString("发送");
                }
            }

            this.mgrMenuGroup.doChildrenLayout();
        }

        // @BindEvent("tea", 'ui::TeaHouse::UpdateMine')
        onUpdateMineTeaHouse(data: { list: Data_HouseMemberItem, update: boolean }) {

            if (lodash.isEmpty(data)) { return; }
            let __selfScroll = this.scroll_mine;
            var offset = __selfScroll.getInnerOffSetTop() || 0;
            __selfScroll['needUpdate'] = false;
            if (!data.update) {
                return;
            }
            kaayou.pool.putAllChildrenInPool(__selfScroll);
            let items = data.list || [];
            if (lodash.isEmpty(items)) { return; }

            for (var x in items) {
                let cell = this.createCell();
                __selfScroll.addChild(cell);
                cell.setInfo(items[x]);
            }
            __selfScroll.doChildrenLayout();
            offset = Math.min(-1 * Math.abs(Math.max(__selfScroll.getInnerContainerSize().height - __selfScroll.getLayoutSize().height) - offset), 0);
            __selfScroll.setInnerContainerPosition(cc.p(0, offset));

        }

        // @BindEvent("tea", 'ui::TeaHouse::UpdateIntrant')
        onUpdateIntrantTeaHouse(data: { list: Data_HouseMemberItem, update: boolean }) {

            if (lodash.isEmpty(data)) { return; }
            let __selfScroll = this.scroll_intrant;
            var offset = __selfScroll.getInnerOffSetTop() || 0;
            __selfScroll['needUpdate'] = false;
            if (!data.update) {
                return;
            }
            kaayou.pool.putAllChildrenInPool(__selfScroll);
            let items = data.list || [];
            if (lodash.isEmpty(items)) { return; }

            for (var x in items) {
                let cell = this.createCell();
                __selfScroll.addChild(cell);
                cell.setInfo(items[x]);
            }

            __selfScroll.doChildrenLayout();
            offset = Math.min(-1 * Math.abs(Math.max(__selfScroll.getInnerContainerSize().height - __selfScroll.getLayoutSize().height) - offset), 0);
            __selfScroll.setInnerContainerPosition(cc.p(0, offset));
        }

        Show(data: tea.Data_HouseInfo) {
            this.onTeaHouseUpdateInfo(data);
            //Patch.SetBtnAndTextBright(this.btnSave, false);
            if (!!(data.teahouserule & HouseRoleTable.EDIT_HOUSE_SET)) {
                (<ccui.CheckBox>this.mgrMenuGroup.getChildren()[0]).setRadioSelected();
                (<ccui.CheckBox>this.noticeSwitchLayout.getChildren()[0]).setRadioSelected();
            } else {
                (<ccui.CheckBox>this.mgrMenuGroup.getChildren()[1]).setRadioSelected();
            }
            this.setVisible(true);
            var self = this;
            kaayou.pop.ShowMainAnim({
                tNode: ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "top_bar"),
                bNode: this.node.getChildByName("contentPanel"),
                mNode: this.node.getChildByName('maskbg'),
            });
        }

        Hide() {
            this.setVisible(false);
        }
    }
}