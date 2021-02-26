//队长最名下玩家分组
namespace tea {
    var { BindEvent, doBindEvent } = kaayou._decorator;

    class partnerGroupRow extends kaayou.Block {
        constructor() {
            super();
        }
        _data = null;
        btnAddMember: ccui.Layout = null;
        btnDelete: ccui.Button = null;
        lbSeq: ccui.Text = null;
        lbCount: ccui.Text = null;
        svRow: ccui.ScrollView = null;
        prfAdd: ccui.Layout = null;
        prfCell: ccui.Layout = null;

        private createCell(): memberInGroupCell {
            let cell = kaayou.pool.getFromPool(memberInGroupCell);
            if (!cell) {
                cell = new memberInGroupCell();
                cell.initWithNode(this.prfCell);
            }
            cell.setAnchorPoint(0, 0);
            cell.setPositionY(0);
            cell.setPositionX(0);
            cell.setVisible(true);
            return cell;
        }

        initWithNode(node: ccui.Widget, cell: ccui.Widget, addCell: ccui.Widget) {
            let self = this;
            super.initWithNode(node);

            this.lbCount = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "CountLabel");
            this.lbSeq = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "SeqLabel");

            this.btnDelete = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "RowDeleteButton");
            this.svRow = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "RowLayout");
            this.svRow.setPadding({ top: 2, bottom: 2, left: 4, right: 4, spacingX: 2, spacingY: 2 });
            this.svRow.setGrid(ccui.Layout.LayoutGrid_AxisDirection.HORIZONTAL);
            this.svRow.setHorizontal(ccui.Layout.LayoutHorizontal.LEFT);
            this.svRow.setVertical(ccui.Layout.LayoutVertical.TOP);
            this.svRow.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Grid);
            this.svRow.setGridColumn(3);
            this.prfAdd = <ccui.Layout>addCell;
            this.prfCell = <ccui.Layout>cell;

            (<ccui.Layout>this.node).setPadding({ left: 0, right: 0, spacingY: 0, top: 0, bottom: 0 });
            (<ccui.Layout>this.node).setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Vertical);
            (<ccui.Layout>this.node).setVertical(ccui.Layout.LayoutVertical.TOP);
            //删除分组
            this.btnDelete.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                let options = {
                    msg: "确定要删除分组吗？",
                    btns: [
                        {
                            name: "确定",
                            action: function () {
                                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                                kaayou.emit("tea", "mod::House::deletedPatnerGroupList", { group_id: self._data.group_id });
                            },
                            colorType: 'green'
                        },
                        {
                            name: "取消",
                            action: function () {
                                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                            },
                            colorType: 'blue'
                        }
                    ]
                }
                kaayou.emit('common', 'ui::Dialog::Show', options);

            }, this);
        }


        setInfo(data) {
            var self = this;
            this._data = data;
            if (lodash.isEmpty(data)) {
                return;
            }
            let rowcount = 1;
            if (!!data.users) {
                // rowcount = Math.floor((data.users.length + 1) / 3);
                rowcount = Math.ceil((data.users.length + 1) / 3);
            }
            let rowHeight = 66 * rowcount + (rowcount + 1) * 2 + 50;
            console.log("禁止同桌组高度:", rowHeight);
            console.log("xiangshang" + rowcount)
            //self.node.setContentSize(cc.size(self.node.width,rowHeight));
            // self.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            // self.setBackGroundColor(cc.color("#000000"));

            self.lbSeq.setString(data.groupNO + ".组");
            self.lbCount.setString(data.user_count + "人");
            let addCell = new MemberAddInGroupCell();
            addCell.initWithNode(self.prfAdd);
            addCell.setInfo(self._data.group_id);
            self.svRow.removeAllChildren();
            kaayou.pool.putAllChildrenInPool(this.svRow);
            for (var x in data.users) {
                let cell = this.createCell();
                self.svRow.addChild(cell);
                cell.setInfo(data.users[x], self._data.group_id);
            }

            self.svRow.addChild(addCell);
            this.svRow.doChildrenLayout();
            (<ccui.Layout>this.node).doChildrenLayout();
            self.setContentSize(cc.size(852, rowHeight));
            console.log(this.getContentSize().width)
            this.node.setPosition(this.getContentSize().width / 2, this.getContentSize().height / 2);
            ccui.helper.doLayout(this.node);
            // kaayou.emit("tea", "ui::TeaHouse::RefreshNoDeskmateView");
        }

        unuse() {
            this._data = null;
            this.removeFromParent();
        }

    }



    //玩家已经在分组里面的cell
    class memberInGroupCell extends kaayou.Block {
        constructor() {
            super();
        }
        _data: Data_HouseMemberItem = null;
        _groupId: number = 0;
        btnRemove: ccui.Button = null;
        img_head: ccui.ImageView = null;
        label_name: ccui.Text = null;
        label_id: ccui.Text = null;

        initWithNode(node: ccui.Widget) {
            let self = this;
            super.initWithNode(node);

            this.img_head = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "img_head");

            this.label_name = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "BlockUserNameLabel");
            this.label_id = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "BlockUserIdLabel");

            this.btnRemove = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "RemoveButton");

            // this.img_head.on(kaayou.TouchEvent.TouchEnd, function () {
            //     kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
            //     kaayou.emit("tea", "ui::HouseMemberInfo::Show", this._data);
            // }, this);

            this.btnRemove.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                let options = {
                    msg: "确定将该用户从分组中移除吗？",
                    btns: [
                        {
                            name: "确定",
                            action: function () {
                                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                                kaayou.emit("tea", "mod::House::removeMemFromList", {
                                    uid: self._data.uid,
                                    group_id: self._groupId
                                });
                            },
                            colorType: 'green'
                        },
                        {
                            name: "取消",
                            action: function () {
                                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                            },
                            colorType: 'blue'
                        }
                    ]
                }
                kaayou.emit('common', 'ui::Dialog::Show', options);
            }, this);


        }

        setInfo(data: Data_HouseMemberItem, groupId) {
            var self = this;
            this._data = data;
            self._groupId = groupId;
            if (lodash.isEmpty(data)) {
                this.label_name.setString("");
                this.label_id.setString("");
                this.btnRemove.setVisible(false);
                return;
            }

            this.label_name.setString(kaayou.Identify.nickNameSubSix(this._data.uname));
            this.label_id.setString("ID:" + this._data.uid);

            NetImage.setPlayerHead(this.img_head, this._data.uurl, this._data.ugender, (url) => {
                if (!self._data) return false;
                if (url !== self._data.uurl) {
                    return false;
                }
                return true;
            });

            if (data.limit == true) {
                self.btnRemove.setVisible(true);
            } else {
                self.btnRemove.setVisible(false);
            }
        }

        unuse() {
            this._data = null;
            this.removeFromParent();
        }
    }
    //每一个组最后一个的默认添加cell
    class MemberAddInGroupCell extends kaayou.Block {
        constructor() {
            super();
        }

        initWithNode(node: ccui.Widget) {
            let self = this;
            super.initWithNode(node);

        }

        setInfo(groupId) {
            var self = this;
            this.node.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit("tea", "ui::TeaHouse::ShowAddNotInGroupMember", groupId);
            }, this);
        }

        unuse() {
            this.removeFromParent();
        }
    }
    //添加成员 列表的 item
    class AddMemberListItem extends kaayou.Block implements common.IPullListCell {
        constructor() {
            super();
        }
        _index = -1;
        setIndex(index) {
            this._index = index;
        }
        getIndex() {
            return this._index;
        }
        _data: memberNotInGroupItem = null;
        _groupId: number = 0;
        btnAdd: ccui.Button = null;
        btnRemove: ccui.Button = null;
        img_head: ccui.ImageView = null;
        line_state: ccui.CheckBox = null;
        img_onwer: ccui.ImageView = null;
        img_mgr: ccui.ImageView = null;
        ivPartner: ccui.ImageView = null;
        label_name: ccui.Text = null;
        label_id: ccui.Text = null;

        initWithNode(node: ccui.Widget) {
            let self = this;
            super.initWithNode(node);

            this.img_head = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "img_head");
            this.line_state = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "line_state");
            this.img_onwer = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "img_onwer");
            this.img_mgr = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "img_mgr");
            this.ivPartner = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "img_partner");

            this.label_name = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_name");
            this.label_id = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_id");

            this.btnAdd = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "AddButton");
            this.btnRemove = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "RemoveButton");

            // this.img_head.on(kaayou.TouchEvent.TouchEnd, function () {
            //     kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
            //     kaayou.emit("tea", "ui::HouseMemberInfo::Show", this._data);
            // }, this);

            this.btnAdd.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit("tea", "mod::House::AddMemToList", {
                    uid: self._data.uid, group_id: self._groupId
                });
            }, this);

            this.btnRemove.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit("tea", "mod::House::removeMemFromList", {
                    uid: self._data.uid,
                    group_id: self._groupId
                });
            }, this);

            kaayou.getController('tea').on('ui::TeaHouse::UpdateMemberStatus', function (e: kaayou.Event) {
                if (self._data && e.data.uid == self._data.uid) {
                    self.btnAdd.setVisible(!self.btnAdd.visible);
                    self.btnRemove.setVisible(!self.btnRemove.visible);
                }
            }, this, 10);
        }

        setInfo(data) {
            if (lodash.isEqual(this._data, data)) { return; }
            var self = this;
            this._data = lodash.cloneDeep(data);

            if (lodash.isEmpty(data)) {
                this.line_state.setSelected(false);
                this.img_onwer.setVisible(false);
                this.img_mgr.setVisible(false);
                this.ivPartner.setVisible(false);
                this.label_name.setString("");
                this.label_id.setString("");
                this.btnAdd.setVisible(false);
                this.btnRemove.setVisible(false);
                return;
            }
            self._groupId = data.group_id;
            // this.line_state.setSelected(!!data.uonline);
            // this.img_onwer.setVisible(data.urole == HouseMemberRole.CREATER);
            // this.img_mgr.setVisible(data.urole == HouseMemberRole.ADMIN);
            // this.ivPartner.setVisible(data.upartner == 1);
            this.label_name.setString(kaayou.Identify.nickNameSubSix(this._data.uname));
            this.label_id.setString("ID:" + this._data.uid);

            //NetImage.setPlayerHead(this.img_head, this._data.uurl, this._data.ugender);
            NetImage.setPlayerHead(this.img_head, this._data.uurl, this._data.ugender, (url) => {
                if (!this._data) { return false; }
                if (url !== this._data.uurl) {
                    return false;
                }
                return true;
            });
            // if (data.limit == true) {
            //     self.btnAdd.setVisible(false);
            //     self.btnRemove.setVisible(true);
            // } else {
            self.btnAdd.setVisible(true);
            self.btnRemove.setVisible(false);
            // }
        }

        unuse() {
            this._data = null;
            this.removeFromParent();
        }

    }

    export class tea_setGroupMgr {
        static __INS__: tea_setGroupMgr = null;
        static getInstance(__zOrder) {
            if (tea_setGroupMgr.__INS__ == null) {
                tea_setGroupMgr.__INS__ = new tea_setGroupMgr();
                tea_setGroupMgr.__INS__.init();
                tea_setGroupMgr.__INS__.__zOrder = __zOrder
            }
            return tea_setGroupMgr.__INS__;
        }
        __zOrder = 0
        __selfPanel: setGroupPopPanel = null;

        init() {
            let self = this;
            this.__selfPanel = null;

            kaayou.getController('tea').on('ui::setGroup::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show();
            }, this, 10);
            kaayou.getController('tea').on('ui::setGroup::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);
            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new setGroupPopPanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel, this.__zOrder);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }
    }

    export class setGroupPopPanel extends kaayou.ModelLayer {
        constructor() {
            super();
            this.initUI();
        }
        _groupId: number = 0;
        btnAdd: ccui.Button = null;
        btnAddClose: ccui.Button = null;
        btnClose: ccui.Button = null;
        btnSearch: ccui.Button = null;
        ebSearch: any = null;
        ndAdd: ccui.Layout = null;
        ndSearch: ccui.Layout = null;
        prfAdd: ccui.Layout = null;
        prfRow: ccui.Layout = null;
        prfCell: ccui.Layout = null;
        prfMember: ccui.Layout = null;
        svNoDeskmate: ccui.ScrollView = null;
        svMember: common.PullList = null; //成员列表

        private createRow(): partnerGroupRow {
            let cell = kaayou.pool.getFromPool(partnerGroupRow);
            if (!cell) {
                cell = new partnerGroupRow();
                cell.initWithNode(this.prfRow, this.prfCell, this.prfAdd);
            }
            cell.setAnchorPoint(0, 1);
            cell.setPositionY(0);
            cell.setPositionX(0);
            cell.setVisible(true);
            return cell;
        }

        // private createMemberRow(): AddMemberListItem {
        //     let cell = kaayou.pool.getFromPool(AddMemberListItem);
        //     if (!cell) {
        //         cell = new AddMemberListItem();
        //         cell.initWithNode(this.prfMember);
        //     }
        //     cell.setAnchorPoint(0, 0);
        //     cell.setPositionY(0);
        //     cell.setPositionX(0);
        //     cell.setVisible(true);
        //     return cell;
        // }

        getCanAddMemberList(clear: boolean = true) {
            let self = this;
            let search = this.ebSearch.getString().length < 1 ? "" : this.ebSearch.getString();
            kaayou.emit("tea", 'mod::House::partnerGroupMemberList', { clear: clear, param: search, group_id: self._groupId });
        }

        @doBindEvent
        initUI() {
            let self = this;
            this.isTouchMaskHide = false;
            this.initWithccs(tea.res.TH_ProportionSetGroup_json);

            this.btnClose = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_close");
            this.btnClose.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.Hide();
            }, this);

            this.btnAddClose = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "AddCloseButton");
            this.btnAddClose.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.resetMember();
                self.ndAdd.setVisible(false);
            }, this);
            //添加分组按钮
            this.btnAdd = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "AddButton");
            this.btnAdd.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit("tea", "mod::House::addPatnerGroupList");
            }, this);
            this.svNoDeskmate = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "NoDeskmateScrollView");
            this.svNoDeskmate.setPadding({ left: 0, right: 0, spacingY: 5, top: 0, bottom: 0 });
            this.svNoDeskmate.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Vertical);
            this.svNoDeskmate.setVertical(ccui.Layout.LayoutVertical.TOP);
            this.svNoDeskmate.setScrollBarEnabled(false);

            this.prfAdd = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "AddMemberButton");
            this.prfRow = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "NoDeskmateRow");
            this.prfCell = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "AddMemberBlock");
            this.prfMember = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "NoDeskmateMemberRow");

            this.svMember = new common.PullList();
            this.svMember.setSpacingY(8);
            this.svMember.initWithNode(ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "NoDeskmateMemberScrollView"));
            this.svMember.setAdpter({
                getCell: () => {
                    let v = new AddMemberListItem();
                    v.initWithNode(this.prfMember);
                    return v;
                },
                datas: []
            });
            this.svMember.initPullEnv();
            this.svMember.refresh();
            this.svMember.on(kaayou.PullListEvent.HeadFinish, (e: kaayou.PullListEvent) => {
                let target = e.target;
                setTimeout(() => {
                    self.getCanAddMemberList(true);
                }, 500);
            }, this);
            this.svMember.on(kaayou.PullListEvent.FootFinish, (e: kaayou.PullListEvent) => {
                let target = e.target;
                setTimeout(() => {
                    self.getCanAddMemberList(false);
                }, 500);
            }, this);


            this.ndAdd = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "NoDeskmateMemberPanel");
            this.ndAdd.setVisible(false);
            this.ndSearch = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "SearchEditBox");

            let sp = new cc["Scale9Sprite"]();
            sp.initWithFile(common.res.alpha_4x4, cc.rect(0, 0, 0, 0), cc.rect(0, 0, 0, 0));
            let eb: cc.Node = cc["EditBox"].create(this.ndSearch.getContentSize(), sp);
            this.ebSearch = eb;
            eb.setAnchorPoint(0, 0);
            eb.setPosition(0, 0);
            eb.setOpacity(0);
            eb['setFontSize'](28);
            eb['setFontColor'](cc.color("#C1E2FF"));
            eb['setInputMode'](6);
            eb['setMaxLength'](10);

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
            this.ndSearch.addChild(eb);
            //查询成员按钮。搜索
            this.btnSearch = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "SearchButton");
            this.btnSearch.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                self.getCanAddMemberList(true);
            }, this);
            //获取分组展示分组列表
            kaayou.getController('tea').on('ui::TeaHouse::UpdatePartnerSetGroup', function (e: kaayou.Event) {
                if (!self.node.isVisible()) { return; }
                self.showGroup(e.data);
            }, this, 10);
            //获取接口不在任何分组的玩家。
            kaayou.getController('tea').on('ui::TeaHouse::ShowAddNotInGroupMember', function (e: kaayou.Event) {
                kaayou.emit("tea", "mod::House::partnerGroupMemberList", {
                    clear: true,
                    group_id: e.data,
                    param: ''
                });
                self._groupId = e.data;
                self.ndAdd.setVisible(true);
            }, this, 10);

            //成员列表数据展示
            kaayou.getController('tea').on('ui::TeaHouse::partnerGroupMemberList', function (e: kaayou.Event) {
                if (!self.node.isVisible()) { return; }
                self.showMember(e.data);
            }, this, 10);

            this.Hide();
        }

        resetMember() {
            this.ebSearch.setString("");
            this.svMember.getAdpter().datas = [];
            this.svMember.refresh();
            // this.getCanAddMemberList(true);
        }

        Show() {
            this.setVisible(true);
            kaayou.emit("tea", "mod::House::GetPatnerGroupList");
            // kaayou.pop.showAni({
            //     cNode: this.node.getChildByName("contentPanel"),
            //     mNode: this.node.getChildByName("maskbg"),
            //     action: function () {
                   
                // }
            // });
        }

        
        Hide() {
            var self = this;
            kaayou.pool.putAllChildrenInPool(this.svNoDeskmate);
            this.setVisible(false);
        }


        showGroup(data) {
            let self = this;
            kaayou.pool.putAllChildrenInPool(this.svNoDeskmate);
            for (var x in data.groups) {
                let cell = this.createRow();
                cell.setInfo(data.groups[x]);
                self.svNoDeskmate.addChild(cell);
            }

            this.svNoDeskmate.doChildrenLayout();
        }

        //展示不在分组的成员列表
        showMember(data) {
            let self = this;

            if (data) {
                if (data.update) {
                    self.svMember.getAdpter().datas = lodash.clone(data.list);
                }
            } else {
                self.svMember.getAdpter().datas = [];
            }
            self.svMember.refresh();
        }
    }
}