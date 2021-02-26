namespace tea {
    class MemApplyCell extends kaayou.Block implements common.IPullListCell {
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
        img_head: ccui.ImageView = null;
        line_state: ccui.CheckBox = null;

        label_id: ccui.Text = null;
        label_time: ccui.Text = null;
        lbApplyType: ccui.Text = null;
        lbName: ccui.Text = null;
        teamleaderpanel: ccui.Layout;
        lead_head: ccui.ImageView;
        lead_label_name: ccui.Text;
        lead_label_id: ccui.Text;
        text_no_up: ccui.Text;
        btn_deny: ccui.Button = null;
        btn_allow: ccui.Button = null;

        initWithNode(node: ccui.Widget) {
            super.initWithNode(node);
            let self = this;
            this.img_head = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "img_head");
            this.line_state = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "line_state");

            this.lbName = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_name");
            this.lbApplyType = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "lbApplyType");
            this.label_id = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_id");
            this.label_time = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_time");
            this.teamleaderpanel = <ccui.Layout>ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "teamleaderpanel");
            this.lead_head = <ccui.ImageView>ccui.helper.seekWidgetByName(<ccui.Widget>this.teamleaderpanel, "img_head");
            this.lead_label_name = <ccui.Text>ccui.helper.seekWidgetByName(<ccui.Widget>this.teamleaderpanel, "lead_label_name");
            this.lead_label_id = <ccui.Text>ccui.helper.seekWidgetByName(<ccui.Widget>this.teamleaderpanel, "lead_label_id");
            this.text_no_up = <ccui.Text>ccui.helper.seekWidgetByName(<ccui.Widget>this.teamleaderpanel, "text_no_up");

            this.btn_deny = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_deny");
            this.btn_allow = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_allow");
            self.watchRole();
            this.btn_allow.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                if (lodash.isEmpty(self._data)) { return; }
                let applyType = "加入";
                if (self._data.apply_type == 1) applyType = "退出";
                let options = {
                    title: "",
                    msg: "是否允许【{name}】{type}亲友圈？".format({ name: self._data.uname, type: applyType }),
                    close: {
                        isShow: false,
                        action: null,
                    },
                    btns: [
                        {
                            name: "确定",
                            action: function () {
                                //return false;
                                kaayou.emit("tea", 'mod::Member::Agree', { uid: self._data.uid, apply_type: self._data.apply_type });
                            }.bind(self),
                            colorType: 'green'
                        },
                        {
                            name: "取消",
                            action: function () {
                                //return false;
                            }.bind(self),
                            colorType: 'blue'
                        }
                    ]
                }
                kaayou.emit("common", "ui::Dialog::Show", options);
            }, this);

            this.btn_deny.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                if (lodash.isEmpty(self._data)) { return; }
                let applyType = "加入";
                if (self._data.apply_type == 1) applyType = "退出";
                let options = {
                    title: "",
                    msg: "是否拒绝【{name}】{type}亲友圈？".format({ name: self._data.uname, type: applyType }),
                    close: {
                        isShow: false,
                        action: null,
                    },
                    btns: [
                        {
                            name: "确定",
                            action: function () {
                                if (!!self._data) {
                                    kaayou.emit("tea", 'mod::Member::Deny', { uid: self._data.uid, apply_type: self._data.apply_type });
                                }
                            }.bind(self),
                            colorType: 'green'
                        },
                        {
                            name: "取消",
                            action: function () {
                                //return false;
                            }.bind(self),
                            colorType: 'blue'
                        }
                    ]
                }
                kaayou.emit("common", "ui::Dialog::Show", options);
            }, this);

            kaayou.getController('tea').on('ui::ApplyCell::UpdateInfo', function (e: kaayou.Event) {
                self.authApply();
            }, this, 10);
        }

        authApply() {
            let data = tea.mod.__teaHouseInfo;
            if (!!this._data) {
                if (this._data.apply_type == 1) {
                    let roleAuth = tea.mod.Permission.getInstance().hasPermission("退出审核");
                    if (data.urole == HouseMemberRole.CAPTAIN || data.urole == HouseMemberRole.VICECAPTAIN) {
                        this.btn_allow.setVisible(data.hismemexit && data.ipa && roleAuth);
                        this.btn_deny.setVisible(data.hismemexit && data.ipa && roleAuth);
                    } else {
                        this.btn_allow.setVisible(data.hismemexit && roleAuth);
                        this.btn_deny.setVisible(data.hismemexit && roleAuth);
                    }
                } else {
                    let roleAuth = tea.mod.Permission.getInstance().hasPermission("加入审核");
                    if (data.urole == HouseMemberRole.CAPTAIN || data.urole == HouseMemberRole.VICECAPTAIN) {
                        this.btn_allow.setVisible(data.hischecked && data.ipa && roleAuth);
                        this.btn_deny.setVisible(data.hischecked && data.ipa && roleAuth);
                    } else {
                        this.btn_allow.setVisible(data.hischecked && roleAuth);
                        this.btn_deny.setVisible(data.hischecked && roleAuth);
                    }
                }

            }
        }


        _data: Data_HouseMemberItem = null;
        setInfo(data: Data_HouseMemberItem) {
            if (!tea.mod.__teaHouseInfo) {
                return;
            }
            if (lodash.eq(this._data, data)) { return; }
            this._data = data;
            if (lodash.isEmpty(data)) {
                this.line_state.setSelected(false);
                this.lbName.setString("");
                this.label_id.setString("");
                this.label_time.setString("");
                this.btn_deny.setVisible(false);
                this.btn_allow.setVisible(false);
                return
            }
            this.line_state.setSelected(!!data.uonline);
            this.lbName.setString(kaayou.Identify.nickNameSubSix(this._data.uname));

            this.label_id.setString("ID:" + this._data.uid);

            if (this._data.apply_type == 1) {
                this.lbApplyType.setString("退出亲友圈");
            } else {
                if (this._data.upartner == 0) this.lbApplyType.setString("加入申请\n(输入圈号)");
                else this.lbApplyType.setString("加入申请\n(输入邀请码)");
            }
            if (this._data.upartner < 2) {
                this.teamleaderpanel.getChildren().forEach(v => {
                    v.setVisible(false);
                })
                this.text_no_up.setVisible(true);
            } else {
                this.teamleaderpanel.getChildren().forEach(v => {
                    v.setVisible(true);
                })
                this.text_no_up.setVisible(false);
                NetImage.setPlayerHead(this.lead_head, this._data.upartnerurl, this._data.ugender, (url) => {
                    if (!this._data) { return false; }
                    if (url !== this._data.uurl) {
                        return false;
                    }
                    return true;
                });
                this.lead_label_name.setString(this._data.upartnername);
                this.lead_label_id.setString(`ID:${this._data.upartner}`);
            }

            this.label_time.setString(Date.format(this._data.apply_at * 1000, "yyyy-MM-dd\nhh:mm:ss"));
            NetImage.setPlayerHead(this.img_head, this._data.uurl, this._data.ugender, (url) => {
                if (!this._data) { return false; }
                if (url !== this._data.uurl) {
                    return false;
                }
                return true;
            });
            this.authApply();
        }

        unuse() {
            this._data = null;
            this.removeFromParent();
        }

        watchRole() {
            let self = this;
            let promiss = tea.mod.House.getPromissionInstance();
            promiss.watch("加入审核", (data) => {
                self.authApply();
            });
            promiss.watch("退出审核", (data) => {
                self.authApply();
            });
        }
    }

    export class SubApyPage {
        _data = null;
        searchMgr: MemSearchWidget = null;
        sortType: number = 0; //排序方式
        label_none_apply: ccui.Text = null; //申请无数据标签
        scroll_Apply: common.PullList = null; //申请列表

        doGetApplyList(clear: boolean = true, search: string = "") {
            search = this.searchMgr.getSearchString();
            kaayou.emit("tea", 'mod::Member::GetApplyList', { param: search, clear: clear });
        }


        _page: cc.Node = null;
        _index = -1;
        setIndex(index) {
            this._index = index;
            return this;
        }
        getIndex() {
            return this._index;
        }
        onSubpageChange(e: kaayou.Event) {
            let _data = e.data;
            let { index } = _data;
            if (index == this.getIndex()) {
                if (this._page.isVisible()) {

                } else {
                    this.reset();
                }
                this._page.setVisible(true);
            } else {
                this._page.setVisible(false);
            }
        }
        _isInitPull = false;
        reset() {
            if (false == this._isInitPull) {
                this._isInitPull = true;
                this.scroll_Apply.initPullEnv();
            }
            this.searchMgr.clearString();
            this.scroll_Apply.getAdpter().datas = [];
            this.scroll_Apply.refresh();
            this.doGetApplyList(true, "");
        }


        //初始化成员列表页面
        initWidthNode(pageApy: cc.Node, searchMgr: MemSearchWidget, cellMod: ccui.Widget) {
            let self = this;
            this._page = pageApy;
            kaayou.getController('teaMem').on('ui::Member::SubpageChange', this.onSubpageChange, this);

            this.searchMgr = searchMgr;
            this.label_none_apply = <ccui.Text>pageApy.getChildByName("label_none_apply");

            this.scroll_Apply = new common.PullList();
            // this.scroll_member._debugRect = true;
            this.scroll_Apply.setSpacingY(8);
            this.scroll_Apply.initWithNode(pageApy.getChildByName("scroll_apply"));
            this.scroll_Apply.setAdpter({
                getCell: () => {
                    let v = new MemApplyCell();
                    v.initWithNode(cellMod);
                    return v;
                },
                datas: []
            });

            this.scroll_Apply.on(kaayou.PullListEvent.HeadFinish, (e: kaayou.PullListEvent) => {
                let target = e.target;
                setTimeout(() => {
                    self.doGetApplyList(true, "");
                }, 500);

            }, this);
            this.scroll_Apply.on(kaayou.PullListEvent.FootFinish, (e: kaayou.PullListEvent) => {
                let target = e.target;
                setTimeout(() => {
                    self.doGetApplyList(false, "");
                }, 500);
            }, this);

            kaayou.getController('tea').on('ui::Member::UpdateApply', function (e: kaayou.Event) {
                this._data = e.data;
                let data: { list: Data_HouseMemberItem, update: boolean } = e.data
                if (data) {
                    self.label_none_apply.setVisible(false);
                    if (data.update) {
                        self.scroll_Apply.getAdpter().datas = lodash.clone(data.list);
                    }
                } else {
                    self.label_none_apply.setVisible(true);
                    self.scroll_Apply.getAdpter().datas = [];
                }
                self.scroll_Apply.refresh();
            }, this, 10);

            kaayou.getController('teaMem').on('ui::Member::Search', function (e: kaayou.Event) {
                if (self._page.isVisible()) {
                    self.doGetApplyList(true);
                }
            }, this, 10);

            kaayou.getController("lobby").on('ws::Msg::houseoptionismemberexitcheck_ntf', (e) => {
                let data = e.data;
                if (!tea.mod._isInCurHouse(data.hid)) { return; }
                if (!data.ischecked)
                    self.doGetApplyList(true, "");
            }, this)

            kaayou.getController('tea').on('ui::TeaHouse::UpdateInfo', function (e: kaayou.Event) {
                if (!self._page.isVisible()) {
                    return;
                }
                if (!e.data) {
                    return;
                }
                kaayou.emit("tea", "ui::ApplyCell::UpdateInfo");
            }, this, 10);
        }
    }
}