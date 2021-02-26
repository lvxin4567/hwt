//200226比赛数据
namespace tea {
    const { BindEvent, doBindEvent } = kaayou._decorator;

    class PartnerInfoCell extends kaayou.Block implements common.IPullListCell {
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
        _isMem = false;
        setIsMem(b: boolean) {
            this._isMem = b;
        }
        _data: Data_HouseMemberStatItem = null;
        btnQuery: ccui.Button = null;
        btnEdit: ccui.Button = null;
        img_head: ccui.ImageView = null;
        label_name: ccui.Text = null;
        label_id: ccui.Text = null;
        label_jushu: ccui.Text = null;
        lbSuper: ccui.Text = null; //超级有效局
        label_winner: ccui.Text = null;
        label_score: ccui.Text = null;
        lbYouXiao: ccui.Text = null;
        lbWuXiao: ccui.Text = null;
        label_group:ccui.Text = null;
        initWithNode(node: ccui.Widget) {
            let self = this;
            super.initWithNode(node);
            this.lbWuXiao = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_wuxiao");
            this.lbYouXiao = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_youxiao");
            this.img_head = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "img_head");
            this.label_name = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_name");
            this.label_id = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_id");

            this.label_jushu = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_jushu");
            this.lbSuper = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "lbSuper");
            this.label_winner = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_winner");
            this.label_score = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_score");
            this.btnQuery = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "QueryButton");
            this.btnEdit = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "EditButton");
            this.label_group = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_group");
            if (this._isMem) {
                this.btnQuery.setVisible(false);
                this.btnEdit.setVisible(false);
            }
            this.btnEdit.on(kaayou.TouchEvent.TouchEnd, () => {
                if (this._isMem) {
                    return;
                }
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit("tea", "ui::TeaHouse::ShowPartnerPanel", self._data.uid);
            }, this);
            this.btnQuery.on(kaayou.TouchEvent.TouchEnd, () => {
                if (this._isMem) {
                    return;
                }
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit("tea", "ui::PartnerCell::QueryClick", { partner: this._data.uid });
            }, this);


        }
        reset() {
            this.label_name.setString("");
            this.label_id.setString("");
            this.label_jushu.setString("");
            this.lbSuper.setString("");
            this.label_winner.setString("");
            this.label_score.setString("");
            this.btnQuery.setVisible(false);
            this.label_group.setString("");
            this.label_group.setVisible(false);

        }

        isVitaAdmin(){
            return  tea.mod.__teaHouseInfo.vitamin_admin === true  || tea.mod.__teaHouseInfo.urole === HouseMemberRole.CPADMIN;
        }

        setInfo(data: Data_HouseMemberStatItem) {
            if (lodash.eq(this._data, data)) { return; }
            this._data = !!data ? lodash.cloneDeep(data) : null;
            if (lodash.isEmpty(data)) {
                return this.reset();
            }
            this.label_group.setVisible(false);
            if (this._isMem) {//当本人是队长时，队长旗下列表
                //this.label_score.setVisible(false);
                this.btnQuery.setVisible(false);
                // this.img_head.getParent().setPositionX(90);
                // this.label_name.setPositionX(140);
                // this.label_id.setPositionX(140);
                // this.label_jushu.setPositionX(413);
                // this.lbYouXiao.setPositionX(567);
                // this.lbWuXiao.setPosition(735);
                // this.label_winner.setPosition(896);
                let group = data.groupindex + 1;
                this.label_group.setString(group+"组");
                this.label_group.setVisible(data.groupindex > -1);  //如果是队长才显示
            } else {//队长列表
                this.label_score.setVisible(true);
                this.btnQuery.setVisible(true);
            }

            if(this.isVitaAdmin()){
                // this.btnQuery.setVisible(false);
                this.btnEdit.setVisible(false);
            }
            
            
            
            this.label_name.setString(kaayou.Identify.nickNameSubByLength(this._data.uname, 8, 6));
            this.label_id.setString("ID:" + this._data.uid);

            this.label_jushu.setString(this._data.playtimes.toString());

            this.label_winner.setString(this._data.bwtimes.toString());
            this.label_score.setString(this._data.totalscore.toString());
            this.lbYouXiao.setString(this._data.validtimes.toString());
            this.lbSuper.setString(this._data.bigvalidtimes.toString());
            this.lbWuXiao.setString((this._data.playtimes - this._data.validtimes).toString());

            NetImage.setPlayerHead(this.img_head, this._data.uurl, this._data.ugender, (url) => {
                if (!this._data) { return false; }
                if (url !== this._data.uurl) {
                    return false;
                }
                return true;
            });
        }
    }

    const timeSortKeys = {
        0: "1d",
        "-1": "2d",
        "-2": "3d",
        "-3": "4d",
        "-4": "5d",
        "-5": "6d",
        "-6": "7d",
        "1d": 0,
        "2d": -1,
        "3d": -2,
        "4d": -3,
        "5d": -4,
        "6d": -5,
        "7d": -6
    };

    const paramSortKeys = {
        0: "",
        1: "duiju",
        4: "dayingjia",
        5: "jifen",
        "duiju_desc": 0,
        "duiju_asc": 1,
        "dayingjia_asc": 2,
        "dayingjia_desc": 3,
        "jifen_asc": 4,
        "jifen_desc": 5
    };

    export class PropotionInfoPanel {
        // btnEffective: ccui.Button = null;
        addMemberBtn: ccui.Button = null;
        layout_time_group: ccui.Layout = null; // 时间选择块
        layout_sort_group: ccui.Layout = null; // 排序块  tabSortGroup
        lbGameCountTotal: ccui.Text = null;
        lbYouXiaoTotal: ccui.Text = null;
        lbSuperTotal: ccui.Text = null;    //超级有效局合计
        lbWuXiaoTotal: ccui.Text = null;
        lbBigWinTotal: ccui.Text = null;
        lbScoreTotal: ccui.Text = null;
        noPartnerText: ccui.Text = null;
        pnlTotal: ccui.Layout = null;
        scroll_stat_p: common.PullList = null; //成员列表
        scroll_Partner: common.PullList = null; //成员列表
        searchMgr: MemSearchWidget = null;
        selectMgr: MemberSelectWidget = null;
        sortType: number = 0; //排序方式
        timeType: number = 0; //搜索时间
        floor: number = -1;//-1所有楼层
        memPlay_count_label:ccui.Text = null;     //显示玩牌人数
        groupSelectMgr:MemberSelectWidget = null;
        btn_setGroup:ccui.Button = null;
        groupInfo :Array<{groupNO:number,group_id:number,user_count:number,users:any}> = [];


        auth() {
            let self=this;
            let role = tea.mod.__teaHouseInfo.urole;
            if (role == HouseMemberRole.OWNER) {
                this.addMemberBtn.setVisible(true);
            }else{
                this.addMemberBtn.setVisible(false);
            }
        }

        isPartner() {
            let role = tea.mod.__teaHouseInfo.urole;
            return role === HouseMemberRole.CAPTAIN;
        }

        isVitaAdmin(){
            return  tea.mod.__teaHouseInfo.vitamin_admin === true  || tea.mod.__teaHouseInfo.urole === HouseMemberRole.CPADMIN;
        }

                //new Date(this.subDayTime(i)).Format("MM-dd")
        subDayTime(sd: number = 0) {
            let todayStr = Date.format("yyyy-MM-dd")
            let todayTime = Math.floor(new Date(todayStr).getTime() / 1000);
            todayTime -= sd * 24 * 60 * 60;
            console.log(todayTime)
            return todayTime * 1000;
        }

        doChangeList(clear: boolean = true, timetype: number = 0, sorttype: number = -1, search: string = "") {
            if (tea.mod._isMaster() || this.isVitaAdmin()) {
                this.scroll_stat_p.setVisible(false);
                this.scroll_Partner.setVisible(true);
                this.pnlTotal.setVisible(false);
                this.layout_sort_group.getChildren()[6].setVisible(true);
                this.doGetPartnerList(clear, timetype, sorttype, search);
            } else if (tea.mod._isPartner()) {
                this.scroll_stat_p.setVisible(true);
                this.scroll_Partner.setVisible(false);
                this.pnlTotal.setVisible(true);
                this.layout_sort_group.getChildren()[6].setVisible(false);
                this.doGetStatList(clear, timetype, sorttype, search);
            } else {
                this.layout_sort_group.getChildren()[6].setVisible(false);
                this.scroll_stat_p.setVisible(false);
                this.scroll_Partner.setVisible(false);
            }
        }

        //获取成员列表数据 
        // "groups":[{"group_id":2,"user_count":1,"users":[{"uid":34077,"uname":"kaa6245274","uurl":
        groupId = -1;
        doGetStatList(clear: boolean = true, timetype: number = 0, sorttype: number = -1, search: string = "") {
            var self = this;
            this.sortType = sorttype;
            this.timeType = timetype;
            search = this.searchMgr.getSearchString();
            let dfid = this.selectMgr.getCurSelect();
            let selectGroupIndex = this.groupSelectMgr.getCurSelect();
            self.groupId = -1;
            // let ftable: tea.Data_HosueFtableItems = lodash.find(this.__curResult.table_info.ftableitems, { ntid: e.data.ntid, fid: e.data.fid });
            if (selectGroupIndex != 0 && selectGroupIndex != -1) {
                    let selectGroup = lodash.find(this.groupInfo,{groupNO:selectGroupIndex})
                    self.groupId = selectGroup.group_id
            }
            kaayou.emit("tea", "mod::TeaHouse::GetPartnerMemberStatisticsTotal", {
                dfid: dfid,
                hid: tea.mod.__teaHouseInfo.hid,
                daytype: this.timeType,
                group_id:self.groupId,
            });

            kaayou.emit("tea", 'mod::State::GetStateList', {
                dfid: dfid,
                param: search, daytype: timetype, sorttype: sorttype, clear: clear,
                partner: tea.mod.__teaHouseInfo.uid,
                group_id:self.groupId,
            });

        }

        @BindEvent("tea", "ui::TeaHouse::userMemberAddPanelReflash")
        reflashPlist() {
            this.doChangeList(true, this.timeType, this.sortType);
        }

        doGetPartnerList(clear: boolean = true, timetype: number = 0, sorttype: number = -1, search: string = "") {
            var self = this;
            this.sortType = sorttype;
            this.timeType = timetype;
            search = this.searchMgr.getSearchString();
            let dfid = this.selectMgr.getCurSelect();
            kaayou.emit("tea", "mod::TeaHouse::GetPartnerList", {
                param: search, daytype: timetype, sorttype: sorttype, clear: clear,
                dfid: dfid
            });
        }

        initSortNode(pagePartner: cc.Node) {
            //时间参数修改
            this.layout_time_group = ccui.helper.seekWidgetByName(<ccui.Widget>pagePartner, "time_group");

            let childs = this.layout_time_group.getChildren()
            let last2 = childs.slice(2);
            let vorder  = [0,-1,-2,-3,-4,-5,-6,-7]
            let order = [3,4,5,6,7]

            
            last2.forEach((v,i)=>{
                let time = this.subDayTime(order[i]-1)
                let node_time =<ccui.Text>v.getChildByName("time");
                node_time.setString(new Date(time).Format("MM-dd"));
            })

            lodash.forEach(childs, (v: ccui.Layout, i: number) => {
                v["sortName"] = timeSortKeys[vorder[i]];
                v["sortType"] = "none";
                v.on(kaayou.TouchEvent.TouchEnd, (e: kaayou.TouchEvent) => {
                    let tagert = e.target;
                    let sortName = tagert.sortName;
                    let sortType = tagert.sortType;
                    if (sortType == 'none' || sortType == 'asc') {
                        sortType = 'desc';
                    } else {
                        sortType = 'asc';
                    }
                    kaayou.emit("teaMem", "ui::partner::time::change", { sortName, sortType });
                    kaayou.emit("teaMem", "do::partner::time::change", { sortName, sortType });
                }, this)
                v['updateByType'] = function () {
                    if (this.sortType == "none") {
                        this.getChildByName("cbg").setVisible(false);
                        Patch.ChangeTextColor(this.getChildByName("time"), null, cc.color(100, 180, 241))
                    } else {
                        this.getChildByName("cbg").setVisible(true);
                        Patch.ChangeTextColor(this.getChildByName("time"), null, cc.color(31, 95, 152))
                    }
                }
                v['updateByType']();
                v['onTimeChange'] = function (e: kaayou.Event) {
                    let _data = e.data;
                    let { sortName, sortType } = _data;
                    if (this.sortName == sortName) {
                        this.sortType = sortType;
                    } else {
                        this.sortType = "none";
                    }
                    this.updateByType();
                }
                kaayou.getController("teaMem").on("ui::partner::time::change", v['onTimeChange'], v);
            });
            kaayou.getController("teaMem").on("do::partner::time::change", (e: kaayou.Event) => {
                let _data = e.data;
                let { sortName, sortType } = _data;
                this.doChangeList(true, timeSortKeys[sortName], this.sortType);
            }, this);

            //排序参数
            this.layout_sort_group = ccui.helper.seekWidgetByName(<ccui.Widget>pagePartner, "sort_group");

            lodash.forEach(this.layout_sort_group.getChildren(), (v: ccui.Layout, i: number) => {
                if (i == 0) { return; }
                if (i > 1 && i < 4) { return; }
                if (i > 5) return;
                v["sortName"] = paramSortKeys[i];
                v["sortType"] = "none";
                v.on(kaayou.TouchEvent.TouchEnd, (e: kaayou.TouchEvent) => {
                    let tagert = e.target;
                    let sortName = tagert.sortName;
                    let sortType = tagert.sortType;
                    if (sortType == 'none' || sortType == 'asc') {
                        sortType = 'desc';
                    } else {
                        sortType = 'asc';
                    }
                    kaayou.emit("teaMem", "ui::partner::stat::change", { sortName, sortType });
                    kaayou.emit("teaMem", "do::partner::stat::change", { sortName, sortType });
                }, this)
                v['updateByType'] = function () {
                    if (this.sortType == "none") {
                        this.getChildByName("cbasc").setSelected(false);
                        this.getChildByName("cbdesc").setSelected(false);
                    } else if (this.sortType == "asc") {

                        this.getChildByName("cbasc").setSelected(false);
                        this.getChildByName("cbdesc").setSelected(true);
                    } else {
                        this.getChildByName("cbasc").setSelected(true);
                        this.getChildByName("cbdesc").setSelected(false);
                    }
                }
                v['updateByType']();
                v['onStatChange'] = function (e: kaayou.Event) {
                    let _data = e.data;
                    let { sortName, sortType } = _data;
                    if (this.sortName == sortName) {
                        this.sortType = sortType;
                    } else {
                        this.sortType = "none";
                    }
                    this.updateByType();
                }
                kaayou.getController("teaMem").on("ui::partner::stat::change", v['onStatChange'], v);
            });

            kaayou.getController("teaMem").on("do::partner::stat::change", (e: kaayou.Event) => {
                let _data = e.data;
                let { sortName, sortType } = _data;
                let _key = `${sortName}_${sortType}`;
                let sort = 0;
                if (paramSortKeys[_key]) {
                    sort = paramSortKeys[_key];
                }
                this.doChangeList(true, this.timeType, sort);
            }, this);
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
                if (this._page.isVisible()===false) {
                    this.reset();
                    this._page.setVisible(true);
                }
            } else {
                this._page.setVisible(false);
            }
        }

        _isInitPull = false;
        reset() {
            if (false == this._isInitPull) {
                this._isInitPull = true;
                this.scroll_Partner.initPullEnv();
                this.scroll_stat_p.initPullEnv();
            }
            this.searchMgr.clearString();
            kaayou.emit("teaMem", "ui::partner::time::change", { sortName: timeSortKeys[0], sortType: "desc" });
            kaayou.emit("teaMem", "ui::partner::stat::change", { sortName: paramSortKeys[1], sortType: "desc" });
            (<ccui.Layout>(ccui.helper.seekWidgetByName(<ccui.Widget>this._page, "selectGroup_layout"))).setVisible(false)
            this.scroll_Partner.getAdpter().datas = [];
            this.scroll_Partner.refresh();
            this.scroll_stat_p.getAdpter().datas = [];
            this.scroll_stat_p.refresh();
            this.noPartnerText.setVisible(false);
            this.btn_setGroup.setVisible(false);
            this.selectMgr.setCurSelect(-1);
            // this.groupSelectMgr.setCurSelect(-1);
            if (!!tea.mod.__teaHouseInfo && !!tea.mod.__teaHouseInfo.hfloorids) {
                this.selectMgr.setItemsCount(tea.mod.__teaHouseInfo.hfloorids.length + 1);  
                this.memPlay_count_label.setVisible(tea.mod.__teaHouseInfo.urole == HouseMemberRole.CAPTAIN);
            }
            //队长分组功能
            if (!!tea.mod.__teaHouseInfo && tea.mod.__teaHouseInfo.urole == HouseMemberRole.CAPTAIN) {
                this.btn_setGroup.setVisible(true);
                (<ccui.Layout>(ccui.helper.seekWidgetByName(<ccui.Widget>this._page, "selectGroup_layout"))).setVisible(true)
                //如果是队长需要去请求下分组信息；
                this.groupSelectMgr._curselIndex = 0;
                this.groupSelectMgr.label_sel.setString("所有人");
                kaayou.emit("tea", 'mod::House::GetPatnerGroupList')
            }
            
            this.doChangeList(true, timeSortKeys['1d'], paramSortKeys['duiju_desc'], "");
            //lw200102切换亲友圈时也要做权限判定
            this.auth();
        }

        //初始化成员列表页面
        initWidthNode(pagePartner: cc.Node, searchMgr: MemSearchWidget, cellMod: ccui.Widget) {
            let self = this;
            pagePartner.setPosition(0,0);
            this.lbGameCountTotal = ccui.helper.seekWidgetByName(<ccui.Widget>pagePartner, "TotalDuiJu");
            this.lbYouXiaoTotal = ccui.helper.seekWidgetByName(<ccui.Widget>pagePartner, "TotalYouXiao");
            this.lbSuperTotal = ccui.helper.seekWidgetByName(<ccui.Widget>pagePartner, "lbTotalSuper");
            this.lbWuXiaoTotal = ccui.helper.seekWidgetByName(<ccui.Widget>pagePartner, "TotalWuXiao");
            this.lbBigWinTotal = ccui.helper.seekWidgetByName(<ccui.Widget>pagePartner, "TotalBigWin");
            this.lbScoreTotal = ccui.helper.seekWidgetByName(<ccui.Widget>pagePartner, "TotalScore");

            this.pnlTotal = ccui.helper.seekWidgetByName(<ccui.Widget>pagePartner, "TotalLayout");
            this.addMemberBtn = ccui.helper.seekWidgetByName(<ccui.Widget>pagePartner, "btn_add_member");

            this.memPlay_count_label = ccui.helper.seekWidgetByName(<ccui.Widget>pagePartner, "memPlay_count_label");    //玩牌人数
            this.addMemberBtn.on(kaayou.TouchEvent.TouchEnd, (e: kaayou.TouchEvent) => {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit("tea", "mod::addMemberPanel::show");
            }, this);

            this.btn_setGroup = ccui.helper.seekWidgetByName(<ccui.Widget>pagePartner, "btn_setGroup");
            this.btn_setGroup.on(kaayou.TouchEvent.TouchEnd, (e: kaayou.TouchEvent) => {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                console.log("弹出分组列表");
                kaayou.emit("tea","ui::setGroup::Show");
            }, this);


            self.auth();
            this._page = pagePartner;
            kaayou.getController('teaMem').on('ui::PropotionPanel::SubpageChange', this.onSubpageChange, this);
            this.searchMgr = searchMgr;
            this.initSortNode(pagePartner);
            this.noPartnerText = ccui.helper.seekWidgetByName(<ccui.Widget>pagePartner, "noPartner_text");
            this.noPartnerText.setVisible(false);
            this.scroll_Partner = new common.PullList();
            // this.scroll_member._debugRect = true;
            this.scroll_Partner.setSpacingY(0);
            this.scroll_Partner.initWithNode(ccui.helper.seekWidgetByName(<ccui.Widget>pagePartner, "scroll_partner"));
            this.scroll_Partner.setAdpter({
                getCell: () => {
                    let v = new PartnerInfoCell();
                    v.initWithNode(cellMod);
                    return v;
                },
                datas: []
            });
            // this.scroll_Partner.initPullEnv();
            // this.scroll_Partner.refresh();
            this.scroll_Partner.on(kaayou.PullListEvent.HeadFinish, (e: kaayou.PullListEvent) => {
                let target = e.target;
                setTimeout(() => {
                    self.doChangeList(true, self.timeType, this.sortType, "");
                }, 500);

            }, this);
            this.scroll_Partner.on(kaayou.PullListEvent.FootFinish, (e: kaayou.PullListEvent) => {
                let target = e.target;
                setTimeout(() => {
                    self.doChangeList(false, self.timeType, this.sortType, "");
                }, 500);
            }, this);

            //统计
            this.scroll_stat_p = new common.PullList();
            // this.scroll_member._debugRect = true;
            this.scroll_stat_p.setSpacingY(0);
            this.scroll_stat_p.initWithNode(ccui.helper.seekWidgetByName(<ccui.Widget>pagePartner, "scroll_stat_p"));
            this.scroll_stat_p.setAdpter({
                getCell: () => {
                    let v = new PartnerInfoCell();
                    v.setIsMem(true);
                    v.initWithNode(cellMod);
                    return v;
                },
                datas: []
            });
            // this.scroll_stat_p.initPullEnv();
            // this.scroll_stat_p.refresh();
            this.scroll_stat_p.on(kaayou.PullListEvent.HeadFinish, (e: kaayou.PullListEvent) => {
                let target = e.target;
                setTimeout(() => {
                    self.doChangeList(true, self.timeType, this.sortType, "");
                }, 500);

            }, this);
            this.scroll_stat_p.on(kaayou.PullListEvent.FootFinish, (e: kaayou.PullListEvent) => {
                let target = e.target;
                setTimeout(() => {
                    self.doChangeList(false, self.timeType, this.sortType, "");
                }, 500);
            }, this);

            kaayou.getController('tea').on('ui::PartnerCell::QueryClick', (e: kaayou.Event) => {
                let _data = e.data;
                let pid = _data.partner;
                let dfid = self.selectMgr.getCurSelect();
                kaayou.emit("tea", "ui::PartnerRecordPanel::Show", {
                    daytype: self.timeType,
                    dfid: dfid,
                    partner: pid,
                    sorttype: self.sortType
                });
            }, this, 20);
            kaayou.getController('tea').on('ui::State::UpdateStat', function (e: kaayou.Event) {
                if (!self._page.isVisible()) { return; }
                if (!tea.mod._isPartner()) { return; }
                let data: { list: Data_HouseMemberStatItem[],partner_mems_num?:number,partner_mems_played_num?:number, update: boolean } = e.data
                if (data) {
                    
                    if (data.update) {
                        self.scroll_stat_p.getAdpter().datas = lodash.clone(data.list);
                    }
                    this.memPlay_count_label.setString(`玩牌人数：${data.partner_mems_played_num}/${data.partner_mems_num}`);
                } else {
                    self.scroll_stat_p.getAdpter().datas = [];
                }
                self.scroll_stat_p.refresh();
            }, this, 20);

            kaayou.getController('tea').on('ui::TeaHouse::UpdatePartner', function (e: kaayou.Event) {
                if (!self._page.isVisible()) { return; }
                if (tea.mod._isMaster() || self.isVitaAdmin()) {
                    let data: { list: Data_HouseMemberItem[],update: boolean } = e.data
                    if (data) {
                        if (data.update) {
                            self.scroll_Partner.getAdpter().datas = lodash.clone(data.list);
                            self.noPartnerText.setVisible((lodash.isNull(data.list) || lodash.isEmpty(data.list)));
                        }
                    } else {
                        self.scroll_Partner.getAdpter().datas = [];
                        self.noPartnerText.setVisible((lodash.isNull(data.list) || lodash.isEmpty(data.list)));
                    }
                    self.scroll_Partner.refresh();
                }
            }, this, 10);

            kaayou.getController('teaMem').on('ui::PropotionPanel::Search', function (e: kaayou.Event) {
                if (self._page.isVisible()) {
                    self.doChangeList(true);
                }
            }, this, 10);

            kaayou.getController('tea').on('ui::TeaHouse::ShowPartnerMemberStatisticsTotal', function (e: kaayou.Event) {
                let self = this;
                if (self._page.isVisible()) {
                    let data = e.data;
                    self.lbBigWinTotal.setString(data.bwtimes.toString());
                    self.lbGameCountTotal.setString(data.playtimes.toString());
                    self.lbScoreTotal.setString(data.totalscore.toString());
                    self.lbWuXiaoTotal.setString((data.playtimes - data.validtimes).toString());
                    self.lbYouXiaoTotal.setString(data.validtimes.toString());
                    self.lbSuperTotal.setString(data.bigvalidtimes.toString());
                }
            }, this, 10);

            this.selectMgr = new MemberSelectWidget();

            this.selectMgr.initWidthNode(ccui.helper.seekWidgetByName(<ccui.Widget>self._page, "selectR_layout"), self._page, () => {
                self.doChangeList(true, self.timeType, self.sortType);
            });

            this.groupSelectMgr = new MemberSelectWidget();
            
            this.groupSelectMgr.initWidthNode(ccui.helper.seekWidgetByName(<ccui.Widget>self._page, "selectGroup_layout"), self._page, () => {
                self.doChangeList(true, self.timeType, self.sortType);
                console.log("doChangeList"+ this.groupSelectMgr.getCurSelect());
            },ccui.helper.seekWidgetByName(<ccui.Widget>self._page, "select_Item"));
            //监听删除 增加 获取 分组信息。。。来显示队长组别下拉框
            kaayou.getController('tea').on('ui::TeaHouse::UpdatePartnerSetGroup', function (e: kaayou.Event) {
                // let self = this;
                if (self._page.isVisible() && e.data) { 
                    let data = e.data;
                    let groupsList = ["所有人"];//
                    console.log("刷新组别",e.data);
                    self.groupInfo = e.data.groups;
                    for (let  g in self.groupInfo) {
                        groupsList.push(self.groupInfo[g].groupNO.toString()+"组");
                    }
                    console.log(groupsList);
                    self.groupSelectMgr.setAutoItem(groupsList);
                    
                    if (e.data.hasOwnProperty("deletedId")) {   //如果是删除分组 刚好删除的是选中的这组
                        self.groupSelectMgr._curselIndex = 0;
                        self.groupSelectMgr.label_sel.setString("所有人");
                        self.doChangeList(true, self.timeType, self.sortType);
                    }
                }
            }, this, 10);

            //监听到删除了分组。。如果队长现在正在处于选择的这个组。那么重新刷新数据
            // kaayou.getController('tea').on('ui::TeaHouse::UpdateListWhenDeletedGroup', function (e: kaayou.Event) {
            //     // let self = this;
            //     if (self._page.isVisible() && e.data) { 
            //         if (self.groupId == e.data.group_id) {
            //             console.log("xuyaoqushuaxin");
            //             self.groupSelectMgr.setCurSelect(-1);
            //             self.doChangeList(true, self.timeType, self.sortType);
            //         }
            //     }
            // }, this, 10);
        }
    }
}