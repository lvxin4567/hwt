namespace tea {
    var { BindEvent, doBindEvent } = kaayou._decorator;

    class NoDeskmateRow extends kaayou.Block {
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

        private createCell(): NoDeskmateMemberCell {
            let cell = kaayou.pool.getFromPool(NoDeskmateMemberCell);
            if (!cell) {
                cell = new NoDeskmateMemberCell();
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

            this.btnDelete.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                let options = {
                    msg: "确定要删除分组吗？",
                    btns: [
                        {
                            name: "确定",
                            action: function () {
                                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                                kaayou.emit("tea", "mod::TeaHouse::DeleteNoDeskmateGroup", { hid: tea.mod.__teaHouseInfo.hid, group_id: self._data.group_id });
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
                rowcount = Math.ceil((data.users.length + 1) / 3);
            }
            let rowHeight = 66 * rowcount + (rowcount + 1) * 2 + 50;
            console.log("禁止同桌组高度:", rowHeight);

            //self.node.setContentSize(cc.size(self.node.width,rowHeight));
            // self.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            // self.setBackGroundColor(cc.color("#000000"));

            self.lbSeq.setString(data.groupNO + ".禁止同桌");
            self.lbCount.setString(data.user_count);
            let addCell = new NoDeskmateMemberAddCell();
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
            self.setContentSize(cc.size(self.node.width, rowHeight));
            this.node.setPosition(this.getContentSize().width / 2, this.getContentSize().height / 2);
            ccui.helper.doLayout(this.node);
            kaayou.emit("tea", "ui::TeaHouse::RefreshNoDeskmateView");
        }

        unuse() {
            this._data = null;
            this.removeFromParent();
        }

    }

    class NoDeskmateMemberCell extends kaayou.Block {
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

            this.img_head.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit("tea", "ui::HouseMemberInfo::Show", this._data);
            }, this);

            this.btnRemove.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                let options = {
                    msg: "确定从禁止同桌分组中删除成员吗？",
                    btns: [
                        {
                            name: "确定",
                            action: function () {
                                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                                kaayou.emit("tea", "mod::TeaHouse::DeleteNoDeskmate", {
                                    hid: tea.mod.__teaHouseInfo.hid,
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

    class NoDeskmateMemberAddCell extends kaayou.Block {
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
                kaayou.emit("tea", "ui::TeaHouse::ShowAddNoDeskmate",  groupId );
            }, this);
        }

        unuse() {
            this.removeFromParent();
        }
    }

    class NoDeskmateMemberRow extends kaayou.Block implements common.IPullListCell {
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
        _data: Data_HouseMemberItem = null;
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

            this.img_head.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit("tea", "ui::HouseMemberInfo::Show", this._data);
            }, this);

            this.btnAdd.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit("tea", "mod::TeaHouse::AddNoDeskmate", {
                    hid: tea.mod.__teaHouseInfo.hid,
                    uid: self._data.uid, group_id: self._groupId
                });
            }, this);

            this.btnRemove.on(kaayou.TouchEvent.TouchEnd,kaayou.TouchMask.clickHandle(  ()=> {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit("tea", "mod::TeaHouse::DeleteNoDeskmate", {
                    hid: tea.mod.__teaHouseInfo.hid,
                    uid: self._data.uid,
                    group_id: self._groupId
                });
            },this,150), this);

            kaayou.getController('tea').on('ui::TeaHouse::UpdateDeskmateMemberStatus', function (e: kaayou.Event) {
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
            this.line_state.setSelected(!!data.uonline);
            this.img_onwer.setVisible(data.urole == HouseMemberRole.OWNER);
            this.img_mgr.setVisible(data.urole == HouseMemberRole.ADMIN);
            this.ivPartner.setVisible(data.upartner == 1);
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
            if (data.limit == true) {
                self.btnAdd.setVisible(false);
                self.btnRemove.setVisible(true);
            } else {
                self.btnAdd.setVisible(true);
                self.btnRemove.setVisible(false);
            }
        }

        unuse() {
            this._data = null;
            this.removeFromParent();
        }

    }

    export class tea_NoDeskmateMgr {
        static __INS__: tea_NoDeskmateMgr = null;
        static getInstance() {
            if (tea_NoDeskmateMgr.__INS__ == null) {
                tea_NoDeskmateMgr.__INS__ = new tea_NoDeskmateMgr();
                tea_NoDeskmateMgr.__INS__.init();
            }
            return tea_NoDeskmateMgr.__INS__;
        }
        __selfPanel: NoDeskmate = null;

        init() {
            let self = this;
            this.__selfPanel = null;

            kaayou.getController('tea').on('ui::NoDeskmate::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show();
            }, this, 10);
            kaayou.getController('tea').on('ui::NoDeskmate::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);
            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new NoDeskmate();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }
    }

    export class NoDeskmate extends kaayou.ModelLayer {
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
        noMember2Cb:ccui.CheckBox = null
        private createRow(): NoDeskmateRow {
            let cell = kaayou.pool.getFromPool(NoDeskmateRow);
            if (!cell) {
                cell = new NoDeskmateRow();
                cell.initWithNode(this.prfRow, this.prfCell, this.prfAdd);
            }
            cell.setAnchorPoint(0, 1);
            cell.setPositionY(0);
            cell.setPositionX(0);
            cell.setVisible(true);
            return cell;
        }

        private createMemberRow(): NoDeskmateMemberRow {
            let cell = kaayou.pool.getFromPool(NoDeskmateMemberRow);
            if (!cell) {
                cell = new NoDeskmateMemberRow();
                cell.initWithNode(this.prfMember);
            }
            cell.setAnchorPoint(0, 0);
            cell.setPositionY(0);
            cell.setPositionX(0);
            cell.setVisible(true);
            return cell;
        }

        getNoDeskmateMember(clear: boolean = true) {
            let self = this;
            let search = this.ebSearch.getString().length < 1 ? "" : this.ebSearch.getString();
            kaayou.emit("tea", 'mod::TeaHouse::GetNoDeskmateMember', { clear: clear, param: search, group_id: self._groupId });
        }

        @doBindEvent
        initUI() {
            let self = this;
            this.isTouchMaskHide = false;
            this.initWithccs(tea.res.NoDeskmate_json);

            this.btnClose = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_close");
            this.btnClose.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.svNoDeskmate.scrollToPercentVertical(0,0.1,false);
                self.Hide();
            }, this);

            this.btnAddClose = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "AddCloseButton");
            this.btnAddClose.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.resetMember();
                self.ndAdd.setVisible(false);
            }, this);
            this.noMember2Cb = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "NomemBer2");
            this.noMember2Cb.on(kaayou.CheckEvent.SELECTED, self.noMember2CbClick, this);
            this.noMember2Cb.on(kaayou.CheckEvent.UNSELECTED, self.noMember2CbClick, this);

            this.btnAdd = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "AddButton");
            this.btnAdd.on(kaayou.TouchEvent.TouchEnd, kaayou.TouchMask.clickHandle( ()=>{
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit("tea", "mod::TeaHouse::AddNoDeskmateGroup", { hid: tea.mod.__teaHouseInfo.hid });
            },this), this);
            this.svNoDeskmate = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "NoDeskmateScrollView");
            this.svNoDeskmate.setPadding({ left: 0, right: 0, spacingY: 1, top: 0, bottom: 0 });
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
                    let v = new NoDeskmateMemberRow();
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
                    self.getNoDeskmateMember(true);
                }, 500);
            }, this);
            this.svMember.on(kaayou.PullListEvent.FootFinish, (e: kaayou.PullListEvent) => {
                let target = e.target;
                setTimeout(() => {
                    self.getNoDeskmateMember(false);
                }, 500);
            }, this);


            this.ndAdd = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "NoDeskmateMemberPanel");
            this.ndSearch = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "SearchEditBox");


            let ipm = this.inputMask()

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
                        ipm.show();
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
                        ipm.hide();
                    }
                }
            )
            this.ndSearch.addChild(eb);

            this.btnSearch = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "SearchButton");
            this.btnSearch.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                self.getNoDeskmateMember(true);
            }, this);
            kaayou.getController('tea').on('ui::TeaHouse::UpdateNoDeskmateGroup', function (e: kaayou.Event) {
                //lw190801服务端要客户端自己编序号
                let i = 1;
                for (let x in e.data.groups) {
                    e.data.groups[x]["groupNO"] = i;
                    i++;
                }
                self.showGroup(e.data);
            }, this, 10);

            kaayou.getController('tea').on('ui::TeaHouse::ShowAddNoDeskmate', function (e: kaayou.Event) {
                kaayou.emit("tea", "mod::TeaHouse::GetNoDeskmateMember", {
                    clear: true,
                    group_id: e.data,
                    param: ''
                });
                self._groupId = e.data;
                self.ndAdd.setVisible(true);
            }, this, 10);

            kaayou.getController('tea').on('ui::TeaHouse::UpdateNoDeskmateMemberList', function (e: kaayou.Event) {
                self.showMember(e.data);
            }, this, 10);

            kaayou.getController('tea').on('ui::TeaHouse::UpdateDeskmateMemberStatus', function (e: kaayou.Event) {
                //lm滑动时会复用cell，所以要更新本地数据
                if (self.svMember.getAdpter().datas.length != 0) {
                    let changeItem = lodash.find(self.svMember.getAdpter().datas, { uid:e.data.uid});
                    changeItem.limit = !changeItem.limit
                }
                // kaayou.emit("tea", "mod::TeaHouse::GetNoDeskmateGroup", {
                //     hid: tea.mod.__teaHouseInfo.hid
                // });
            }, this, 10);

            kaayou.getController('tea').on('ui::TeaHouse::RefreshNoDeskmateView', function (e: kaayou.Event) {
                //self.svNoDeskmate.doChildrenLayout();
            }, this, 10);

            this.Hide();
        }

        noMember2CbClick(e:kaayou.Event){
            if (e.target.isSelected()) {
                // <ccui.Text>(e.target.getChildByName("Text")).setTextColor(cc.color("#D33A25"));
                console.log("xuanzhong");
                kaayou.emit("tea", 'mod::TeaHouse::SetEffectInMem2',{sta:true,hid:tea.mod.__teaHouseInfo.hid})
            } else {
                // <ccui.Text>(e.target.getChildByName("Text")).setTextColor(cc.color("#93692D"));
                console.log("xuanzhong1");
                kaayou.emit("tea", 'mod::TeaHouse::SetEffectInMem2',{sta:false,hid:tea.mod.__teaHouseInfo.hid})
            }
        }


        inputMask(){

            let mainScene = kaayou.UIManager.getInstance().getMainScene();
            if (!mainScene) 
                return 

            let mask = <ccui.Layout>ccui.Layout.create();
            mask.setTouchEnabled(true);
            mask.setContentSize(cc.winSize);
            mask.setAnchorPoint(0.5, 0.5);
            // mask.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            // mask.setBackGroundColor(cc.color(0,0,0));
            // mask.setBackGroundColorOpacity(170);
            mask.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
            mask.setGlobalZOrder(10000);
            mainScene.addChild(mask);
            mask.setVisible(false);

            return {
                show:()=>{
                    // console.log("show mask")
                    mask.setVisible(true)
                },
                hide:()=>{
                    // console.log("hide mask")
                    setTimeout(() => {
                        mask.setVisible(false)    
                    }, 500);
                    
                }
            }

        }

        resetMember() {
            this.ebSearch.setString("");
            this.svMember.getAdpter().datas = [];
            this.svMember.refresh();
            this.getNoDeskmateMember(true);
        }

        Show() {
            kaayou.emit("tea", "mod::TeaHouse::GetNoDeskmateGroup", {
                hid: tea.mod.__teaHouseInfo.hid
            });
            this.setVisible(true);
        }

        showGroup(data) {
            let self = this;
            let top=this.svNoDeskmate.getInnerOffSetTop();
            let height=this.svNoDeskmate.getInnerContainerSize().height;
            let percent=top/height*100;
            percent*=1.05;
            console.log(top);
            console.log(height);
            console.log(percent);
            kaayou.pool.putAllChildrenInPool(this.svNoDeskmate);
            for (var x in data.groups) {
                let cell = this.createRow();
                cell.setInfo(data.groups[x]);
                self.svNoDeskmate.addChild(cell);
            }
            this.svNoDeskmate.doChildrenLayout();
            this.svNoDeskmate.scrollToPercentVertical(percent,0.1,true);
            
            //2人不生效
            this.noMember2Cb.setSelected(data.is2pnoteffect);
        }

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