namespace tea {
    class TiredManageRow extends kaayou.Block implements common.IPullListCell {
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
        _data = null;
        img_head: ccui.ImageView = null;
        img_onwer: ccui.ImageView = null;
        img_mgr: ccui.ImageView = null;
        img_Vtm_mgr: ccui.ImageView = null;
        img_subtag_partner: ccui.ImageView = null;
        ivPartner: ccui.ImageView = null;
        ivVice: ccui.ImageView = null;
        label_name: ccui.Text = null;
        label_id: ccui.Text = null;
        lbTired: ccui.Text = null;
        lbLast: ccui.Text = null;
        lbPlay: ccui.Text = null;
        lbRoom: ccui.Text = null;

        btnEdit: ccui.Button = null;
        btnQuery: ccui.Button = null;

        authFcmManage() {
            let self = this;
            let configData = common.mod.Config.GetAppConfig();
            let fcm = configData.feature.pl;
            if (!!tea.mod.__teaHouseInfo) {
                let bAdminCanEdit = tea.mod.__teaHouseInfo.isvitaminmodi;
                let role = tea.mod.__teaHouseInfo.urole;
                this.btnQuery.setVisible(true);
                this.btnEdit.setEnabled(false);
                if (fcm) {
                    if (role == HouseMemberRole.OWNER || role == HouseMemberRole.CAPTAIN) {
                        this.btnEdit.setEnabled(true);
                        let myUid = lobby.mod.User.getInstance().getUserInfo().uid;
                        if (self._data && (role == HouseMemberRole.CAPTAIN)) {
                            //如果本行是下级队长
                            if (self._data.ispartner) {
                                this.btnEdit.setEnabled(tea.mod.__teaHouseInfo.ispartnermodi && self._data.uid != myUid
                                    && !tea.mod.__teaHouseInfo.disablejuniorv && tea.mod.__teaHouseInfo.vice_partner === false);
                            } else if (self._data.vice_partner) {
                                this.btnEdit.setEnabled((tea.mod.__teaHouseInfo.ispartnermodi && self._data.uid != myUid))
                            } else
                                this.btnEdit.setEnabled(tea.mod.__teaHouseInfo.ispartnermodi && self._data.uid != myUid);


                        }
                    } else if (role == HouseMemberRole.ADMIN && bAdminCanEdit) {
                        if (this._data && this._data.urole != 0 && this._data.urole != 1) {
                            this.btnEdit.setEnabled(true);
                        }
                    } else if (tea.mod.__teaHouseInfo.vice_partner) {
                        //200328副队长不能调本队队长、副队长（包括自己），只能调本队成员和下级队长。看不见其他人。
                        let a=!!self._data && self._data.isSub;
                        let b=!!self._data && !self._data.ispartner && !self._data.vice_partner;
                        let c=tea.mod.__teaHouseInfo.ispartnermodi;
                        this.btnEdit.setEnabled((a || b) && c);
                    }
                }
            }
        }

        initWithNode(node: ccui.Widget) {
            let self = this;
            super.initWithNode(node);

            this.img_head = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "img_head");
            this.img_onwer = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "img_onwer");
            this.img_mgr = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "img_mgr");
            this.ivPartner = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "img_partner");
            this.ivVice = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "img_vice");
            this.label_name = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_uname");
            this.label_id = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_uid");
            this.lbTired = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "CurrentTired");
            this.lbLast = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "LastTired");
            this.lbPlay = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "PlayFee");
            this.lbRoom = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "RoomFee");
            this.img_subtag_partner = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "subtag_partner");
            this.btnEdit = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "ManageRowEdit");
            this.btnQuery = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "ManageRowQuery");
            this.img_Vtm_mgr = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "img_vtm_mgr");
            this.img_Vtm_mgr.setVisible(false);
            this.btnEdit.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                if (lodash.isEmpty(self._data)) { return; }
                kaayou.emit("tea", 'ui::TiredEditPanel::Show', self._data);
            }, this);

            this.btnQuery.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                if (lodash.isEmpty(self._data)) { return; }
                kaayou.emit("tea", "ui::FcmPlayerDetail::Show", { uid: self._data.uid, uname: self._data.uname, tiredValue: self._data.curvitamin });
            }, this);

            kaayou.getController('tea').on('ui::TeaHouse::UpdateTiredBlock', function (e: kaayou.Event) {
                self.authFcmManage();
            }, this, 10);
        }

        setInfo(data) {
            var self = this;
            if (lodash.isEqual(this._data, data)) {
                //console.log("数据相同");
                return;
            }
            this._data = lodash.cloneDeep(data);
            if (lodash.isEmpty(data)) {
                this.label_name.setString("");
                this.label_id.setString("");
                this.btnEdit.setEnabled(false);
                this.btnQuery.setVisible(false);
                this.img_onwer.setVisible(false);
                this.img_mgr.setVisible(false);
                this.ivPartner.setVisible(false);
                this.img_Vtm_mgr.setVisible(false);
                return;
            }
            this.img_onwer.setVisible(data.urole == HouseMemberRole.OWNER);
            this.img_mgr.setVisible(data.urole == HouseMemberRole.ADMIN);
            this.ivPartner.setVisible(data.ispartner);
            this.ivVice.setVisible(data.vice_partner);
            this.img_subtag_partner.setVisible(data.isjunior || data.isSub && (tea.mod.__teaHouseInfo.urole !== HouseMemberRole.OWNER));
            this.img_Vtm_mgr.setVisible(data.vitamin_admin);
            this.label_name.setString(kaayou.Identify.nickNameSubSix(this._data.uname));
            this.label_id.setString("ID:" + this._data.uid);

            this.lbTired.setString(this._data.curvitamin.toString());
            this.lbLast.setString(this._data.prenodevitamin.toString())
            this.lbPlay.setString(this._data.vitaminwinlosecost.toString());
            //lw190906房费扣除显示为正数
            this.lbRoom.setString(Math.abs(this._data.vitaminplaycost).toString());
            //如果被禁止娱乐就不显示头像，但头像仍然可以被点击
            if (this._data.game_limit) {
                this.img_head.setVisible(false);
            } else {
                NetImage.setPlayerHead(this.img_head, this._data.uurl, this._data.ugender, (url) => {
                    if (url !== this._data.uurl) {
                        return false;
                    }
                    return true;
                });
                this.img_head.setVisible(true);
            }
            self.authFcmManage();
            if (!!tea.mod.__teaHouseInfo && tea.mod.__teaHouseInfo.vitamin_admin) {
                this.btnEdit.setEnabled((data.urole != 0 ));
            }
        }

    }

    const paramSortKeys = {
        1: "current",
        2: "last",
        3: "play",
        4: "room",
        "role": -1,
        "current_desc": 0,
        "current_asc": 1,
        "last_desc": 2,
        "last_asc": 3,
        "play_desc": 4,
        "play_asc": 5,
        "room_desc": 6,
        "room_asc": 7
    };

    export class SubFcmManagePage {
        _page: cc.Node = null;
        _index = -1;
        btnBatch: ccui.Button = null;   //一键清零
        btnCurrent: ccui.Layout = null;
        btnLast: ccui.Layout = null;
        btnPlay: ccui.Layout = null;
        btnRoom: ccui.Layout = null;
        layout_sort_group: ccui.Layout = null; // 排序块  tabSortGroup
        ndSort: ccui.Layout = null; //成员排序块
        scroll_member: common.PullList = null; //成员列表
        searchMgr: FcmSearchWidget = null;
        sortType: number = 0; //排序方式

        authFcmManage() {
            let role = tea.mod.__teaHouseInfo.urole;
            //200118再次开放一键清零功能
            let configs = common.mod.Config.GetAppConfig();
            let feature: IFeature = lodash.extend({}, configs.feature);
            this.btnBatch.setVisible(Boolean(feature.ok));
        }

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
            this.authFcmManage();
        }
        _isInitPull = false;
        reset() {
            if (false == this._isInitPull) {
                this._isInitPull = true;
                this.scroll_member.initPullEnv();
            }
            //lw190813有的page会把搜索隐藏，所以必须显式打开
            this.searchMgr.setVisible(true);
            this.searchMgr.setPlaceholder("输入昵称或ID");
            this.searchMgr.clearString();
            this.scroll_member.getAdpter().datas = [];
            this.scroll_member.refresh();
            this.btnBatch.setVisible(false);
            let sortType = cc.sys.localStorage.getItem('FCMSORTTYPE');
            this.sortType = !!sortType ? parseInt(sortType) : -1;
            this.doGetMemList(true, this.sortType);
        }

        //默认按角色排序
        doGetMemList(clear: boolean = true, sorttype: number = -1) {
            let self = this;
            self.sortType = sorttype;
            cc.sys.localStorage.setItem('FCMSORTTYPE', self.sortType.toString());
            let search = this.searchMgr.getSearchString();
            kaayou.emit("tea", 'mod::TeaHouse::GetTiredMember', { param: search, clear: clear, sorttype: sorttype });
        }

        initWidthNode(pageMem: cc.Node, searchMgr: FcmSearchWidget, cellMod: ccui.Widget) {
            let self = this;
            this._page = pageMem;
            this.searchMgr = searchMgr;
            let ctrName = "teaFcm";
            let subpageChangeEventName = "ui::AntiIndulgencePanel::SubpageChange";
            kaayou.getController(ctrName).on(subpageChangeEventName, this.onSubpageChange, this);
            let sortChangeEventName = "ui::FcmManage::sort::change";
            let sortDoEventName = "do::FcmManage::sort::change";
            let onSearchEventName = "ui::Fcm::onSearch";

            this.btnBatch = ccui.helper.seekWidgetByName(<ccui.Widget>pageMem, "BatchButton");
            this.btnBatch.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                let role = tea.mod.__teaHouseInfo.urole;
                if (role == HouseMemberRole.OWNER) {
                    let options = {
                        msg: "是否确定将亲友圈所有玩家比赛分调整为0？",
                        btns: [
                            {
                                name: "确定",
                                action: function () {
                                    kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                                    kaayou.emit("tea", "mod::Fcm::Clear", { hid: tea.mod.__teaHouseInfo.hid });
                                },
                                colorType: 'green'
                            },
                            {
                                name: "取消",
                                action: function () {
                                    kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                                },
                                colorType: 'blue'
                            },
                        ]
                    }
                    kaayou.emit('common', 'ui::Dialog::Show', options);
                }
                else {
                    let options = {
                        msg: "是否确定将名下所有玩家比赛分调整为0？",
                        btns: [
                            {
                                name: "确定",
                                action: function () {
                                    kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                                    kaayou.emit("tea", "mod::Fcm::Clear", { hid: tea.mod.__teaHouseInfo.hid });
                                },
                                colorType: 'green'
                            },
                            {
                                name: "取消",
                                action: function () {
                                    kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                                },
                                colorType: 'blue'
                            },
                        ]
                    }
                    kaayou.emit('common', 'ui::Dialog::Show', options);
                }
            }, this);

            this.scroll_member = new common.PullList();
            this.scroll_member.setSpacingY(8);
            this.scroll_member.initWithNode(<cc.Node>pageMem.getChildren()[1]);
            this.scroll_member.setAdpter({
                getCell: () => {
                    let v = new TiredManageRow();
                    v.initWithNode(cellMod);
                    return v;
                },
                datas: []
            });
            this.scroll_member.on(kaayou.PullListEvent.HeadFinish, (e: kaayou.PullListEvent) => {
                let target = e.target;
                setTimeout(() => {
                    self.doGetMemList(true, self.sortType);
                }, 500);

            }, this);
            this.scroll_member.on(kaayou.PullListEvent.FootFinish, (e: kaayou.PullListEvent) => {
                let target = e.target;
                setTimeout(() => {
                    self.doGetMemList(false, self.sortType);
                }, 500);
            }, this);

            this.layout_sort_group = ccui.helper.seekWidgetByName(<ccui.Widget>pageMem, "ManageGridHeader");
            let sortType = cc.sys.localStorage.getItem('FCMSORTTYPE');
            this.sortType = !!sortType ? parseInt(sortType) : -1;
            lodash.forEach(this.layout_sort_group.getChildren(), (v: ccui.Layout, i: number) => {
                if (i < 1 || i > 4) { return; }
                v["sortName"] = paramSortKeys[i];
                v["sortType"] = "none";
                if (self.sortType > -1) {
                    if (Math.floor(self.sortType / 2) == i - 1) {
                        if (self.sortType % 2 == 0) {
                            v["sortType"] = "desc";
                        } else {
                            v["sortType"] = "asc";
                        }
                    }
                } else if (i == 1) v["sortType"] = "desc";
                v.on(kaayou.TouchEvent.TouchEnd, (e: kaayou.TouchEvent) => {
                    let tagert = e.target;
                    let sortName = tagert.sortName;
                    let sortType = tagert.sortType;
                    if (sortType == 'none' || sortType == 'asc') {
                        sortType = 'desc';
                    } else {
                        sortType = 'asc';
                    }
                    console.log("比赛分管理排序：" + sortType)
                    kaayou.emit(ctrName, sortChangeEventName, { sortName, sortType });
                    kaayou.emit(ctrName, sortDoEventName, { sortName, sortType });
                }, this)
                v['updateByType'] = function () {
                    if (this.sortType == "none") {
                        (<ccui.Button>this.getChildByName("sortTypeBtn")).setEnabled(false);
                    } else if (this.sortType == "asc") {
                        (<ccui.Button>this.getChildByName("sortTypeBtn")).setEnabled(true);
                        (<ccui.Button>this.getChildByName("sortTypeBtn")).setBrightStyle(ccui.Widget.BRIGHT_STYLE_HIGH_LIGHT);
                    } else {
                        (<ccui.Button>this.getChildByName("sortTypeBtn")).setEnabled(true);
                        (<ccui.Button>this.getChildByName("sortTypeBtn")).setBrightStyle(ccui.Widget.BRIGHT_STYLE_NORMAL);
                    }
                }
                v['updateByType']();
                v['onStatChange'] = function (e: kaayou.Event) {
                    let _data = e.data;
                    console.log(e.data);
                    let { sortName, sortType } = _data;
                    if (this.sortName == sortName) {
                        this.sortType = sortType;

                    } else {
                        this.sortType = "none";
                    }
                    console.log("比赛分管理排序状态" + this.sortType)
                    this.updateByType();
                }
                kaayou.getController(ctrName).on(sortChangeEventName, v['onStatChange'], v);
            });

            kaayou.getController(ctrName).on(sortDoEventName, (e: kaayou.Event) => {
                let _data = e.data;
                let { sortName, sortType } = _data;
                let _key = `${sortName}_${sortType}`;
                let sort = 0;
                if (paramSortKeys[_key]) {
                    sort = paramSortKeys[_key];
                }
                this.doGetMemList(true, sort);
            }, this);

            kaayou.getController(ctrName).on(onSearchEventName, (e: kaayou.Event) => {
                if (!this._page.isVisible()) { return; }
                this.doGetMemList(true, this.sortType);
            }, this, 10);

            kaayou.getController('tea').on('ui::TiredMember::ShowData', function (e: kaayou.Event) {
                let data: { list, update: boolean } = e.data

                if (data) {
                    if (data.update) {
                        let __data = lodash.clone(data.list)
                        self.scroll_member.getAdpter().datas = tagSub(__data);
                    }
                } else {
                    self.scroll_member.getAdpter().datas = [];
                }
                self.scroll_member.refresh();

                function tagSub(slist) {
                    let sid = (lobby.mod.User.getInstance().getUserInfo().uid)
                    let selfData: any = lodash.filter(slist, v => v.uid === sid)[0]
                    if (!selfData)
                        selfData = lodash.filter(slist,v=>v.vice_partner)[0] 

                    if(!selfData)
                        selfData = lodash.filter(slist,v=>v.urole===HouseMemberRole.MEMBER)[0] 

                    let up: number = selfData.upartner;
                    lodash.forEach(slist, v => {
                        if ((v.upartner === up && v.ispartner === false) || v.upartner === 1 || sid === v.upartner || tea.mod.__teaHouseInfo.urole === HouseMemberRole.OWNER)
                            v.isSub = false
                        else
                            v.isSub = true
                    })
                    return slist;
                }

            }, this, 10);

            kaayou.getController('tea').on('ui::TeaHouse::UpdateTiredValue', function (e: kaayou.Event) {
                self.doGetMemList(true);
            }, this, 10);

            kaayou.getController('tea').on('ui::TeaHouse::UpdateTiredBlock', function (e: kaayou.Event) {
                self.authFcmManage();
            }, this, 10);
        }
    }
}