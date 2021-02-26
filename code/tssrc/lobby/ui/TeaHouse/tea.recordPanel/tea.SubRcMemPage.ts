//成员战绩
namespace tea {
    interface ITH_DATA_MEM_STATE_CELL extends ITH_DATA_MEM_STATE_ITEM {
        seq?: number,
        islike: boolean;
        daytype?: number
        dfid?: number;
        invalidtimes: number;
        timeInterval: number;
        timeRange: number;
    }

    class TH_RC_MemCell extends kaayou.Block implements common.IPullListCell {
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

        label_seq: ccui.Text = null;   //序号标签
        img_head: ccui.ImageView = null;   //头像
        label_uname: ccui.Text = null;   //用户名称标签
        label_uid: ccui.Text = null;   //用户id标签
        label_invalid: ccui.Text;

        label_score: ccui.Text = null;   //用户积分标签
        label_innings: ccui.Text = null;   //局数标签
        label_winner: ccui.Text = null;   //大赢家次数标签
        btn_detail: ccui.Button = null;   //详情按钮
        img_zan: ccui.ImageView;

        initWithNode(node: ccui.Widget) {
            let self = this;
            super.initWithNode(node);
            this.label_seq = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_seq");
            this.img_head = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "img_head");
            this.label_uname = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_uname");
            this.label_uid = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_uid");
            this.label_score = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_score");
            this.label_innings = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_innings");
            this.label_winner = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_winner");
            this.label_invalid = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_invalid");

            this.btn_detail = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_detail");
            this.img_zan = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "img_zan");


            this.img_zan.on(kaayou.TouchEvent.TouchEnd, (e: kaayou.TouchEvent) => {

                let islike = !this._data.islike;
                let hid = tea.mod.__teaHouseInfo.hid;
                let likeuser = this._data.uid;
                let daytype = this._data.daytype;
                let querytimeinterval = self._data.timeInterval;
                let querytimerange = self._data.timeRange + 1;
                let isteamlike=false;

                kaayou.emit("tea", 'mod::TeaHouse::MemberLike', {
                    data: { hid, likeuser, islike, daytype, querytimeinterval, querytimerange,isteamlike },
                    callback: (result) => {
                        if (result === true) {
                            let islike = !this._data.islike
                            this._data.islike = islike;
                            this.img_zan.loadTexture(islike ? "TH_Record_zan.png" : "TH_Record_zan_gray.png", ccui.Widget.PLIST_TEXTURE);
                            kaayou.emit("teaRC", 'ui::State::UpdateMemZanCount', { num: islike ? 1 : -1 });
                        }
                    }
                })


            }, this)

            this.btn_detail.on(kaayou.TouchEvent.TouchEnd, () => {
                if (!this._data) { return; }
                if (!this._data.uid) { return; }
                let querytimeinterval = self._data.timeInterval;
                let querytimerange = self._data.timeRange;
                kaayou.emit('tea', 'ui::HousegamerecordDialog::Show', {
                    imgurl: this._data.uurl, sex: this._data.ugender, name: this._data.uname
                    , uid: this._data.uid, selecttime: this._data.daytype, dfid: this._data.dfid, type: "1",
                    timeInterval: querytimeinterval, timeIndex: querytimerange
                });
            }, this);
        }

        reset() {
            this.label_seq.setString("");
            this.img_head.setVisible(false);
            this.label_uname.setString("");
            this.label_uid.setString("");
            this.label_score.setString("");
            this.label_innings.setString("");
            this.label_winner.setString("");
            this.label_invalid.setString("")
            this.btn_detail.setVisible(false);
        }

        _data: ITH_DATA_MEM_STATE_CELL = null;
        setInfo(data: ITH_DATA_MEM_STATE_CELL) {
            if (lodash.eq(this._data, data)) { return; }
            var self = this;
            this._data = data;
            if (lodash.isEmpty(data)) {
                return this.reset();
            }
            this.label_seq.setString(this._data.seq.toString());
            this.label_uname.setString(kaayou.Identify.nickNameSubByLength(this._data.uname, 6, 4));
            this.label_uid.setString(this._data.uid.toString());

            this.label_score.setString(this._data.totalscore.toString());
            this.label_score.setTextColor(this._data.totalscore > 0 ? cc.color("#ff4925") : cc.color("#008c07"));

            this.label_invalid.setString(this._data.invalidtimes.toString());

            this.label_innings.setString(this._data.playtimes.toString());
            this.label_winner.setString(this._data.bwtimes.toString());


            this.img_zan.loadTexture(!!this._data.islike ? "TH_Record_zan.png" : "TH_Record_zan_gray.png", ccui.Widget.PLIST_TEXTURE)

            this.btn_detail.setVisible(true);
            NetImage.setPlayerHead(this.img_head, this._data.uurl, this._data.ugender, (url) => {
                if (!self._data) return false;
                if (url !== self._data.uurl) {
                    return false;
                }
                return true;
            });
            this.img_head.setVisible(true);
        }
    }

    const timeSortKeys = {
        0: "0d",
        1: "1d",
        2: "2d",
        3: "3d",
        4: "4d",
        5: "5d",
        6: "6d",
        "0d": 0,
        "1d": -1,
        "2d": -2,
        "3d": -3,
        "4d": -4,
        "5d": -5,
        "6d": -6
    };

    const paramSortKeys = {
        0: "",
        1: "score",
        2: "innings",
        3: "invalidround",
        4: "winner",
        5: "",
        "invalidround_asc": 6,
        "invalidround_desc": 7,
        "score_asc": 5,
        "score_desc": 4,
        "innings_asc": 0,
        "innings_desc": 1,
        "winner_asc": 2,
        "winner_desc": 3
    };

    export class SubRcMemPage {
        bPartner = false;//剔除队长及关联
        btnClear: ccui.Button = null;
        cbPartner: ccui.CheckBox = null;//剔除队长及关联
        iLike: number = 0;//0全部1点赞2未点赞
        iTime: number = 0;//时段筛选序号
        iDetailInterval: number = 0;
        iDetailRange: number = 0;
        loFilter: ccui.Layout = null;//剔除队长及关联
        oldHID = 0;//上次的亲友圈号
        scr_mem_record: common.PullList = null; //成员列表

        searchMgr: RecordSearchWidget = null;
        selectMgr: RecordSelectWidget = null;
        dateMgr: RecordDateWidget = null;
        sortType: number = 5; //排序方式 默认为按积分从大到小排序
        timeType: number = 0; //搜索时间

        state_group: ccui.Layout;
        label_round: ccui.Text = null;
        label_invalidround: ccui.Text = null;
        label_totalround: ccui.Text;
        label_invalidperson: ccui.Text;
        label_total: ccui.Text;
        label_totalzan: ccui.Text;
        label_totalzan1: ccui.Text;
        creatorTop_layout: ccui.Layout;
        captorTop_layout: ccui.Layout;
        iLowScore: number = 0;
        roundtype: number = 0;

        //获取战绩列表数据 
        doGetStateList(clear: boolean = true, timetype: number = 0, sorttype: number = -1) {
            let self = this;
            self.sortType = sorttype;
            self.timeType = timetype;
            let search = this.searchMgr.getSearchString();
            self.iDetailInterval = 0;
            self.iDetailRange = 0;
            let lastIndex = kaayou.TimeHelper.getLastIndex();
            if (lastIndex != this.iTime) {
                self.iDetailInterval = mod.__teaHouseInfo.record_time_interval;
                self.iDetailRange = this.iTime;
            }
            kaayou.emit("tea", 'mod::State::GetStateList', {
                dfid: this.selectMgr.getCurSelect(),
                param: search, daytype: timetype, sorttype: sorttype, clear: clear,
                partner: this.bPartner ? -1 : 0,
                timeInterval: self.iDetailInterval,
                timeRange: self.iDetailRange + 1,
                likeFlag: this.iLike,
                lowscoreflag:this.iLowScore,
                roundtype :this.roundtype
            });
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
                this.scr_mem_record.initPullEnv();
            }

            if(/5|8/.test(tea.mod.__teaHouseInfo.urole.toString())){
                let json = (cc.sys.localStorage.getItem("tea::store::lowscorefilter") || "{}");
                    this.iLowScore = JSON.parse(json)[tea.mod.__teaHouseInfo.hid] || 0
                }else
                    this.iLowScore =0

            // this.resetTimeLine();
            let ctrName = "teaRC"
            // let timeChangeEventName = "ui::memrc::time::change";
            let sortChangeEventName = "ui::memrc::sort::change";
            this.btnClear.setVisible(false);
            this.searchMgr.setVisible(true);
            this.selectMgr.setVisible(true);
            this.searchMgr.setPlaceholder("玩家ID/昵称");
            this.searchMgr.clearString();
            this.selectMgr.setCurSelect(-1);
            this.dateMgr.setPage("Member");
            this.dateMgr.setCurSelect(0);
            this.iTime = kaayou.TimeHelper.getLastIndex();

            this.resetMemberInfo();
            this.scr_mem_record.getAdpter().datas = [];
            this.scr_mem_record.refresh();
            // kaayou.emit(ctrName, timeChangeEventName, { sortName: timeSortKeys[0], sortType: "desc" });
            kaayou.emit(ctrName, sortChangeEventName, { sortName: paramSortKeys[0], sortType: "desc" });
            if (tea.mod.__teaHouseInfo.hid != this.oldHID) {
                this.bPartner = false;
                this.cbPartner.setSelected(this.bPartner);
                this.oldHID = tea.mod.__teaHouseInfo.hid;
            }
            this.doGetStateList(true, timeSortKeys['0d'], paramSortKeys['score_desc']);
            this.loFilter.setVisible(this.canViewloFilter());

            this.scr_mem_record.getCells().forEach(v => {
                let img_zan: ccui.Widget = ccui.helper.seekWidgetByName(<any>v, "img_zan");
                img_zan.setVisible(true);
            });
   
        }

        private zan_count = 0;
        updateZanCount(dig) {
            this.zan_count = this.zan_count + ((+dig) || 0);
            this.zan_count = Math.max(0, this.zan_count);
            this.label_totalzan.setString("" + this.zan_count);
            this.label_totalzan1.setString("" + this.zan_count);
        }

        resetMemberInfo() {
            this.label_round.setString("0")
            this.label_invalidround.setString("0")
            this.label_totalround.setString("0")
            this.label_invalidperson.setString("0")
            this.label_total.setString("0")
            this.label_totalzan.setString("0");
            this.label_totalzan1.setString("0");
            let info = tea.mod.__teaHouseInfo
            let urole = info.urole;
            //队长、副队长视角：总战绩、总人次、低分局人次、已点赞
            if (info.vice_partner || urole === HouseMemberRole.CAPTAIN) {
                this.captorTop_layout.setVisible(true);
                this.creatorTop_layout.setVisible(false);
                //圈主、管理员、裁判视角：牌局数、低分局、已点赞
            } else if (info.isvitamin || urole === HouseMemberRole.CPADMIN || urole === HouseMemberRole.OWNER || urole === HouseMemberRole.ADMIN) {
                this.captorTop_layout.setVisible(false);
                this.creatorTop_layout.setVisible(true);
            }
        }


        //updateMemberInfo({likecount,totalinvalidplaytimes,totalplaytimes,totalround,totalscore,invalidround}){
        updateMemberInfo(data) {
            //201116圈主和管理员视角也改为牌局人次和低分局人次
            this.label_round.setString("" + (data.totalplaytimes ? data.totalplaytimes : 0));
            this.label_invalidround.setString("" + (data.totalinvalidplaytimes ? data.totalinvalidplaytimes : 0));
            this.label_totalround.setString("" + (data.totalplaytimes ? data.totalplaytimes : 0));
            this.label_invalidperson.setString("" + (data.totalinvalidplaytimes ? data.totalinvalidplaytimes : 0));
            this.label_total.setString("" + (data.totalscore ? data.totalscore : 0));
            this.label_totalzan.setString("" + (data.likecount ? data.likecount : 0));
            this.label_totalzan1.setString("" + (data.likecount ? data.likecount : 0));


            this.zan_count = data.likecount ? data.likecount : 0;

        }


        canViewloFilter() {
            const urole = tea.mod.__teaHouseInfo.urole
            return (tea.mod.__teaHouseInfo.vitamin_admin === true || tea.mod.__teaHouseInfo.urole === HouseMemberRole.CPADMIN) || urole === HouseMemberRole.OWNER || urole === HouseMemberRole.ADMIN;
        }

        layout_sort_group: ccui.Layout = null; // 排序块  tabSortGroup

        initSortNode(pageStat: cc.Node) {
            let self = this;

            let ctrName = "teaRC";

            let timeDoEventName = "do::teaRC::time::change";

            let sortChangeEventName = "ui::memrc::sort::change";
            let sortDoEventName = "do::memrc::sort::change";

            kaayou.getController(ctrName).on(timeDoEventName, (e: kaayou.Event) => {
                if (!this._page.isVisible()) { return; }
                self.iLike = 0;
                this.doGetStateList(true, -this.dateMgr.getCurSelect(), this.sortType);
            }, this);

            //排序参数
            this.layout_sort_group = ccui.helper.seekWidgetByName(<ccui.Widget>pageStat, "sort_group");


            lodash.forEach(this.layout_sort_group.getChildren(), (v: ccui.Layout, i: number) => {
                if (paramSortKeys[i] === "") { return; }
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
                    kaayou.emit(ctrName, sortChangeEventName, { sortName, sortType });
                    kaayou.emit(ctrName, sortDoEventName, { sortName, sortType });
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
                this.doGetStateList(true, this.timeType, sort);
            }, this);


        }

        cleanList() {
            this.scr_mem_record.getAdpter().datas = []
            this.scr_mem_record.refresh();
        }

        //初始化成员列表页面
        initWidthNode(page: cc.Node, searchMgr: RecordSearchWidget, selecthMgr: RecordSelectWidget, dateMgr: RecordDateWidget, cellMod: ccui.Widget, clearButton: ccui.Button) {
            let self = this;
            this._page = page;
            this.btnClear = clearButton;
            this.searchMgr = searchMgr;
            this.selectMgr = selecthMgr;
            this.dateMgr = dateMgr;
            let ctrName = "teaRC"
            let subpageChangeEventName = "ui::record::SubpageChange";
            let onSearchEventName = "ui::record::onSearch";
            let onSelectEventName = "ui::record::onSelect";

            kaayou.getController(ctrName).on(subpageChangeEventName, this.onSubpageChange, this);
            this.creatorTop_layout = ccui.helper.seekWidgetByName(<ccui.Widget>page, "creator");
            this.captorTop_layout = ccui.helper.seekWidgetByName(<ccui.Widget>page, "captor");
            this.label_round = ccui.helper.seekWidgetByName(<ccui.Widget>page, "label_round");
            this.label_total = ccui.helper.seekWidgetByName(<ccui.Widget>this.captorTop_layout, "label_total");
            this.label_totalzan = ccui.helper.seekWidgetByName(<ccui.Widget>this.captorTop_layout, "label_totalzan");
            this.label_totalzan1 = ccui.helper.seekWidgetByName(<ccui.Widget>this.creatorTop_layout, "label_totalzan");


            this.label_totalround = ccui.helper.seekWidgetByName(<ccui.Widget>page, "label_totalround");
            this.label_invalidround = ccui.helper.seekWidgetByName(<ccui.Widget>page, "label_invalidround");
            this.label_invalidperson = ccui.helper.seekWidgetByName(<ccui.Widget>page, "label_invalidperson");
            this.state_group = ccui.helper.seekWidgetByName(<ccui.Widget>page, "state_group");
            this.cbPartner = ccui.helper.seekWidgetByName(<ccui.Widget>page, "PartnerCheckBox");
            this.loFilter = ccui.helper.seekWidgetByName(<ccui.Widget>page, "FilterLayout");
            this.loFilter.setPositionX(20);
            this.loFilter.on(kaayou.TouchEvent.TouchEnd, () => {
                self.bPartner = !self.cbPartner.isSelected();
                self.cbPartner.setSelected(self.bPartner);
                self.doGetStateList(true, self.timeType, self.sortType);
            }, this);

            this.initSortNode(page);
            this.scr_mem_record = new common.PullList();
            this.scr_mem_record.setSpacingY(8);
            this.scr_mem_record.initWithNode(<cc.Node>ccui.helper.seekWidgetByName(<ccui.Widget>page, "scr_mem_record"));
            this.scr_mem_record.setAdpter({
                getCell: () => {
                    let v = new TH_RC_MemCell();
                    v.initWithNode(cellMod);
                    return v;
                },
                datas: []
            });
            this.scr_mem_record.on(kaayou.PullListEvent.HeadFinish, (e: kaayou.PullListEvent) => {
                let target = e.target;
                setTimeout(() => {
                    self.doGetStateList(true, this.timeType, this.sortType);
                }, 500);

            }, this);
            this.scr_mem_record.on(kaayou.PullListEvent.FootFinish, (e: kaayou.PullListEvent) => {
                let target = e.target;
                setTimeout(() => {
                    self.doGetStateList(false, this.timeType, this.sortType);
                }, 500);
            }, this);

            kaayou.getController('teaRC').on('ui::State::UpdateMemZanCount', (e: kaayou.Event) => {
                let { num } = e.data;
                this.updateZanCount(num);
            }, this)

            kaayou.getController('tea').on('ui::State::UpdateStat', function (e: kaayou.Event) {
                if (!self._page.isVisible()) { return; }
                let data: { list: Data_HouseMemberItem, update: boolean } = e.data
                if (data) {
                    if (data.update) {
                        if (data.list) {  //lw200608需要刷新且有数据
                            let redata: Array<ITH_DATA_MEM_STATE_CELL> = lodash.clone(data.list);
                            for (var i = 0; i < redata.length; i++) {
                                redata[i].seq = i + 1;
                                redata[i].daytype = self.timeType;
                                redata[i].dfid = self.selectMgr.getCurSelect();
                                redata[i].timeInterval = self.iDetailInterval;
                                redata[i].timeRange = self.iDetailRange;
                            }
                            self.scr_mem_record.getAdpter().datas = redata;
                        } else {  //lw200608需要刷新但无数据
                            self.scr_mem_record.getAdpter().datas = [];
                        }
                        //lw200526有更新才刷新汇总数据
                        self.updateMemberInfo(data);
                    }
                } else {
                    self.scr_mem_record.getAdpter().datas = [];
                }
                self.scr_mem_record.refresh();
            }, this, 10);

            kaayou.getController(ctrName).on(onSelectEventName, (e: kaayou.Event) => {
                if (!this._page.isVisible()) { return; }
                this.doGetStateList(true, this.timeType, this.sortType)
                const daytype = this.selectMgr.getCurSelect()
                this.scr_mem_record.getCells().forEach(v => {
                    let img_zan: ccui.Widget = ccui.helper.seekWidgetByName(<any>v, "img_zan");
                    img_zan.setVisible(daytype === -1);
                });

            }, this, 10);

            kaayou.getController(ctrName).on(onSearchEventName, (e: kaayou.Event) => {
                if (!this._page.isVisible()) { return; }
                this.doGetStateList(true, this.timeType, this.sortType)
            }, this, 10);

            kaayou.getController('tea').on('ui::TimeFliter::Submit', function (e: kaayou.Event) {
                if (!this._page.isVisible()) { return; }
                self.iTime = e.data.iTime;
                self.iLike = e.data.iLike;
                self.iLowScore = e.data.iLowScore;
                self.roundtype = e.data.iType
                self.doGetStateList(true, self.timeType, self.sortType);
            }, this, 10);
        }
    }
}