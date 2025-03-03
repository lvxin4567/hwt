namespace tea {
    var { BindEvent, doBindEvent } = kaayou._decorator;

    class MePullCell extends kaayou.Block {
        _index = -1;
        setIndex(index) {
            this._index = index;
        }
        getIndex() {
            return this._index;
        }
    }

    interface Data_HouseMemberItem_Cell extends Data_HouseMemberItem {
        partnerId: number;
    }

    class PartnerMemberRow extends MePullCell implements common.IPullListCell {
        constructor() {
            super();
        }
        _data: Data_HouseMemberItem_Cell = null;
        _partnerId: number = 0;
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
                // kaayou.emit("tea", "mod::TeaHouse::SetParterMember", {
                //     hid: tea.mod.__teaHouseInfo.hid,
                //     uid: self._data.uid,
                //     partner: self._partnerId
                // });
                kaayou.emit("tea", "ui::PartnerMemberPanel::AddMember", self._data);
            }, this);

            this.btnRemove.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                // kaayou.emit("tea", "mod::TeaHouse::SetParterMember", {
                //     hid: tea.mod.__teaHouseInfo.hid,
                //     uid: self._data.uid, partner: 0
                // });
                kaayou.emit("tea", "ui::PartnerMemberPanel::RemoveMember", self._data);
            }, this);

            // kaayou.getController('tea').on('ui::TeaHouse::UpdateParterMember', function (e: kaayou.Event) {
            //     if (self._data && e.data == self._data.uid) {
            //         self.btnAdd.setVisible(!self.btnAdd.visible);
            //         self.btnRemove.setVisible(!self.btnRemove.visible);
            //     }
            // }, this, 10);

        }

        setInfo(data: Data_HouseMemberItem_Cell) {
            var self = this;
            this._data = data;

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
            self._partnerId = data.partnerId;
            this.line_state.setSelected(!!data.uonline);
            this.img_onwer.setVisible(data.urole == HouseMemberRole.OWNER);
            this.img_mgr.setVisible(data.urole == HouseMemberRole.ADMIN);
            this.ivPartner.setVisible(data.upartner == 1);
            this.label_name.setString(kaayou.Identify.nickNameSubSix(this._data.uname));
            this.label_id.setString("ID:" + this._data.uid);

            NetImage.setPlayerHead(this.img_head, this._data.uurl, this._data.ugender);
            if (data.upartner != 0) {
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

    export class tea_PartnerMemberPanelMgr {
        static __INS__: tea_PartnerMemberPanelMgr = null;
        static getInstance() {
            if (tea_PartnerMemberPanelMgr.__INS__ == null) {
                tea_PartnerMemberPanelMgr.__INS__ = new tea_PartnerMemberPanelMgr();
                tea_PartnerMemberPanelMgr.__INS__.init();
            }
            return tea_PartnerMemberPanelMgr.__INS__;
        }
        __selfPanel: PartnerMemberPanel = null;

        init() {
            let self = this;
            this.__selfPanel = null;

            kaayou.getController('tea').on('ui::TeaHouse::ShowPartnerPanel', function (e: kaayou.Event) {
                self.getPanel(true).Show(e.data);
            }, this, 10);
            kaayou.getController('tea').on('ui::Member::UpdatePartnerMemberList', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).onUpdatePartnerMember(e.data);
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new PartnerMemberPanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }

    }

    export class PartnerMemberPanel extends kaayou.ModelLayer {
        _partnerId: number = 0;
        bClearLeft: boolean = false;
        bClearRight: boolean = false;
        btnLeftSearch: ccui.Button = null;
        btnRightSearch: ccui.Button = null;
        btnPartnerPanelClose: ccui.Button = null;
        btnOK: ccui.Button = null;
        ebLeftSearch: any = null;
        ebRightSearch: any = null;
        iCount: number = -1;//已绑定玩家数量，-1表示还没查询
        lbCount: ccui.Text = null;
        lbLeftPlaceholder: ccui.Text = null;
        lbPartner: ccui.Text = null;
        lbRightPlaceholder: ccui.Text = null;
        lstChange = [];
        //lw190902把数据分成已调配和未调配
        lstLeft = [];
        lstRight = [];
        mskInput: ccui.Layout = null;
        ndLeftSearch: cc.Layer = null;
        ndRightSearch: cc.Layer = null;
        prfPartnerMemberRow: ccui.Layout = null;
        sSearchLeft: string = "";
        sSearchRight: string = "";
        svLeft: common.PullList = null;
        svRight: common.PullList = null;
        constructor() {
            super();
            this.initUI();
        }
        @doBindEvent
        initUI() {
            let self = this;
            this.initWithccs(tea.res.ParterMemberPanel_json);
            self.lbPartner = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "PartnerID");
            self.lbCount = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "MemberCount");
            self.lbLeftPlaceholder = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "LeftPlaceholder");
            self.lbRightPlaceholder = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "RightPlaceholder");
            self.mskInput = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "InputMask");
            self.prfPartnerMemberRow = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "PartnerMemberRow");
            this.btnPartnerPanelClose = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Close");
            this.btnPartnerPanelClose.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.Hide();
            }, this);

            this.svLeft = new common.PullList();
            this.svLeft.setSpacingY(8);
            let sv1 = ccui.helper.seekWidgetByName(<ccui.Widget>self.node, "LeftScrollView");
            this.svLeft.initWithNode(<cc.Node>sv1);
            this.svLeft.setAdpter({
                getCell: () => {
                    let v = new PartnerMemberRow();
                    v.initWithNode(self.prfPartnerMemberRow);
                    return v;
                },
                datas: []
            });
            this.svLeft.initPullEnv();
            this.svLeft.refresh();
            this.svLeft.on(kaayou.PullListEvent.HeadFinish, (e: kaayou.PullListEvent) => {
                let target = e.target;
                setTimeout(() => {
                    //self.doGetPartnerMemberList(true);
                    self.getLeft(true);
                }, 500);

            }, this);
            this.svLeft.on(kaayou.PullListEvent.FootFinish, (e: kaayou.PullListEvent) => {
                let target = e.target;
                setTimeout(() => {
                    // self.doGetPartnerMemberList(false);
                    self.getLeft(false);
                }, 500);
            }, this);

            this.svRight = new common.PullList();
            this.svRight.setSpacingY(8);
            let sv2 = ccui.helper.seekWidgetByName(<ccui.Widget>self.node, "RightScrollView");
            this.svRight.initWithNode(<cc.Node>sv2);
            this.svRight.setAdpter({
                getCell: () => {
                    let v = new PartnerMemberRow();
                    v.initWithNode(self.prfPartnerMemberRow);
                    return v;
                },
                datas: []
            });
            this.svRight.initPullEnv();
            this.svRight.refresh();
            this.svRight.on(kaayou.PullListEvent.HeadFinish, (e: kaayou.PullListEvent) => {
                let target = e.target;
                setTimeout(() => {
                    // self.doGetPartnerMemberList(true);
                    self.getRight(true);
                }, 500);
            }, this);
            this.svRight.on(kaayou.PullListEvent.FootFinish, (e: kaayou.PullListEvent) => {
                let target = e.target;
                setTimeout(() => {
                    // self.doGetPartnerMemberList(false);
                    self.getRight(false);
                }, 500);
            }, this);

            this.btnLeftSearch = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "LeftSearchButton");
            this.btnLeftSearch.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                self.doGetPartnerMemberList(true);
                //self.splitView(self.svLeft, self.lstLeft, self.ebLeftSearch.getString());
            }, this);

            this.ndLeftSearch = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "LeftSearch");
            let sp1 = new cc["Scale9Sprite"]();
            sp1.initWithFile(common.res.alpha_4x4, cc.rect(0, 0, 0, 0), cc.rect(0, 0, 0, 0));
            let eb1: cc.Node = cc["EditBox"].create(this.ndLeftSearch.getContentSize(), sp1);
            this.ebLeftSearch = eb1;
            eb1.setAnchorPoint(0, 0);
            eb1.setPosition(0, 0);
            eb1.setOpacity(0);
            eb1['setFontSize'](28);
            eb1['setFontColor'](cc.color("#FFFFFF"));
            eb1['setInputMode'](6);
            eb1['setMaxLength'](10);

            eb1['setDelegate'](
                {
                    /**
                     * This method is called when an edit box gains focus after keyboard is shown.
                     * @param {cc.EditBox} sender
                     */
                    editBoxEditingDidBegin: function (sender) {
                        //console.log('editBoxEditingDidBegin');
                        self.lbLeftPlaceholder.setVisible(false);
                        self.mskInput.setEnabled(true);
                    },

                    /**
                     * This method is called when an edit box loses focus after keyboard is hidden.
                     * @param {cc.EditBox} sender
                     */
                    editBoxEditingDidEnd: function (ref) {
                        //console.log('editBoxEditingDidEnd',sender.getString());
                        let gstr = ref.getString();
                        if (gstr == "") self.lbLeftPlaceholder.setVisible(true);
                        self.mskInput.setEnabled(false);
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
            this.ndLeftSearch.addChild(eb1);

            this.btnRightSearch = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "RightSearchButton");
            this.btnRightSearch.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                self.doGetPartnerMemberList(true);
                //self.splitView(self.svRight, self.lstRight, self.ebRightSearch.getString());
            }, this);

            this.ndRightSearch = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "RightSearch");
            let sp2 = new cc["Scale9Sprite"]();
            sp2.initWithFile(common.res.alpha_4x4, cc.rect(0, 0, 0, 0), cc.rect(0, 0, 0, 0));
            let eb2: cc.Node = cc["EditBox"].create(this.ndLeftSearch.getContentSize(), sp2);
            this.ebRightSearch = eb2;
            eb2.setAnchorPoint(0, 0);
            eb2.setPosition(0, 0);
            eb2.setOpacity(0);
            eb2['setFontSize'](28);
            eb2['setFontColor'](cc.color("#FFFFFF"));
            eb2['setInputMode'](6);
            eb2['setMaxLength'](10);

            eb2['setDelegate'](
                {
                    /**
                     * This method is called when an edit box gains focus after keyboard is shown.
                     * @param {cc.EditBox} sender
                     */
                    editBoxEditingDidBegin: function (sender) {
                        //console.log('editBoxEditingDidBegin');
                        self.lbRightPlaceholder.setVisible(false);
                        self.mskInput.setEnabled(true);
                    },

                    /**
                     * This method is called when an edit box loses focus after keyboard is hidden.
                     * @param {cc.EditBox} sender
                     */
                    editBoxEditingDidEnd: function (ref) {
                        //console.log('editBoxEditingDidEnd',sender.getString());
                        let gstr = ref.getString();
                        if (gstr == "") self.lbRightPlaceholder.setVisible(true);
                        self.mskInput.setEnabled(false);
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
            this.ndRightSearch.addChild(eb2);

            kaayou.getController('tea').on('ui::PartnerMemberPanel::AddMember', function (e: kaayou.Event) {
                let mem = e.data;
                mem.upartner = self._partnerId;
                for (let i = 0; i < self.lstLeft.length; ++i) {
                    if (self.lstLeft[i].uid == mem.uid) {
                        self.lstLeft.splice(i, 1);
                        break;
                    }
                }
                self.lstRight.push(mem);
                self.changeList(mem);
                self.iCount++;
                self.refreshView();
                self.confirm();
            }, this, 10);

            kaayou.getController('tea').on('ui::PartnerMemberPanel::RemoveMember', function (e: kaayou.Event) {
                let mem = e.data;
                mem.upartner = 0;
                for (let i = 0; i < self.lstRight.length; ++i) {
                    if (self.lstRight[i].uid == mem.uid) {
                        self.lstRight.splice(i, 1);
                        break;
                    }
                }
                self.lstLeft.push(mem);
                self.changeList(mem);
                self.iCount--;
                self.refreshView();
                self.confirm();
            }, this, 10);
        }

        private confirm() {
            let self = this;
            kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
            let sendData = [];
            for (let i = 0; i < self.lstChange.length; ++i) {
                let item = {
                    hid: tea.mod.__teaHouseInfo.hid,
                    uid: self.lstChange[i].uid,
                    partner: self.lstChange[i].upartner
                };
                sendData.push(item);
            }
            self.lstChange = [];
            kaayou.emit("tea", "mod::TeaHouse::SetParterMember", sendData[0]);
        }

        private changeList(data) {
            let self = this;
            for (let i = 0; i < self.lstChange.length; ++i) {
                if (self.lstChange[i].uid == data.uid) {
                    self.lstChange.splice(i, 1);
                    return;
                }
            }
            self.lstChange.push(data);
        }

        private createPartnerMemberRow(): PartnerMemberRow {
            let cell = kaayou.pool.getFromPool(PartnerMemberRow);
            if (!cell) {
                cell = new PartnerMemberRow();
                cell.initWithNode(this.prfPartnerMemberRow);
            }
            cell.setAnchorPoint(0, 0);
            cell.setPositionY(0);
            cell.setPositionX(0);
            cell.setVisible(true);
            return cell;
        }

        doGetPartnerMemberList(clear: boolean = true) {
            let self = this;
            self.getLeft(clear);
            self.getRight(clear);
        }

        getLeft(clear) {
            let self = this;
            let search = this.ebLeftSearch.getString().length < 1 ? "" : this.ebLeftSearch.getString();
            self.bClearLeft = clear;
            self.sSearchLeft = search;
            kaayou.emit("tea", 'mod::TeaHouse::GetPartnerMember', { clear: clear, param: search, pid: self._partnerId, is_bind: false });
            //返回到onUpdatePartnerMember
        }

        getRight(clear) {
            let self = this;
            let search = this.ebRightSearch.getString().length < 1 ? "" : this.ebRightSearch.getString();
            self.bClearRight = clear;
            self.sSearchRight = search;
            kaayou.emit("tea", 'mod::TeaHouse::GetPartnerMember', { clear: clear, param: search, pid: self._partnerId, is_bind: true });
        }

        onUpdatePartnerMember(data: { list, update: boolean, is_bind: boolean, totalnum: number }) {
            let self = this;
            if (!!data.list) {
                if (data.is_bind) {
                    self.lstRight = data.list;
                    if (self.iCount < 0) {
                        self.iCount = data.totalnum;
                        self.lbCount.setString(self.iCount.toString());
                    }
                }
                else {
                    self.lstLeft = data.list;
                }
            }
            let fn = function (lst, sv) {
                if (data) {
                    if (data.update) {
                        //lst = data.list;
                        //sv.getAdpter().datas = lodash.clone(lst);
                        sv.getAdpter().datas = lst;//数据外面已经构造了一次，这里就不需要clone
                    }
                } else {
                    sv.getAdpter().datas = [];
                }
                sv.refresh();
            }
            if (data.is_bind) {
                this.lstRight = [];
                for (let x in data.list) {
                    if (data.list[x].upartner != 0) {
                        this.lstRight.push(data.list[x]);
                    }
                }
                fn(this.lstRight, this.svRight);
            }
            else {
                this.lstLeft = [];
                for (let x in data.list) {
                    if (data.list[x].upartner == 0) {
                        this.lstLeft.push(data.list[x]);
                    }
                }
                fn(this.lstLeft, this.svLeft);
            }
        }

        refreshView() {
            let self = this;
            self.svLeft.getAdpter().datas = self.lstLeft;
            self.svRight.getAdpter().datas = self.lstRight;
            self.svLeft.refresh();
            self.svRight.refresh();
            self.lbCount.setString("");
            if (self.iCount > -1) self.lbCount.setString(self.iCount.toString());
        }

        Show(data) {
            this.setVisible(true);
            var self = this;
            self.lstChange = [];

            kaayou.pop.showAni({
                cNode: self.node.getChildByName("contentPanel"),
                mNode: self.node.getChildByName("maskbg"),
                action: function () {
                    self._partnerId = data;
                    self.lbPartner.setString(data + " 已绑定玩家");
                    self.doGetPartnerMemberList(true);
                }
            });
        }

        splitView(view: common.PullList, data, key: string) {
            //lw190912客户端搜索，之前没分页，就客户端自己搜。已弃用，目前还是改回分页+服务端搜索
            let self = this;
            let temp = lodash.cloneDeep(data);
            let result = [];
            for (let x in temp) {
                if (temp[x].uid.toString().indexOf(key) > -1 || temp[x].uname.indexOf(key) > -1) {
                    result.push(temp[x]);
                }
            }
            view.getAdpter().datas = result;
            view.refresh();
        }

        Hide() {
            let self = this;
            this.iCount = -1;
            self.lbCount.setString("");
            this.lstLeft = [];
            this.lstRight = [];
            this.ebLeftSearch.setString("");
            this.ebRightSearch.setString("");
            this.lbLeftPlaceholder.setVisible(true);
            this.lbRightPlaceholder.setVisible(true);
            this.refreshView();
            kaayou.pop.hideAni(
                {
                    cNode: this.node.getChildByName("contentPanel"),
                    mNode: this.node.getChildByName("maskbg"),
                    rnode: this
                }
            )
        }
    }
}