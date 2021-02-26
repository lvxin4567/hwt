namespace tea {
    export class MemStatCell extends kaayou.Block implements common.IPullListCell {
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
        label_name: ccui.Text = null;
        label_id: ccui.Text = null;
        label_time: ccui.Text = null;


        label_jushu: ccui.Text = null;
        label_winner: ccui.Text = null;
        label_score: ccui.Text = null;


        initWithNode(node: ccui.Widget) {
            super.initWithNode(node);
            this.img_head = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "img_head");
            this.label_name = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_name");
            this.label_id = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_id");
            this.label_time = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_time");

            this.label_jushu = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_jushu");
            this.label_winner = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_winner");
            this.label_score = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_score");
        }

        _data: Data_HouseMemberStatItem = null;
        setInfo(data: Data_HouseMemberStatItem) {
            if (lodash.eq(this._data, data)) { return; }
            this._data = data;
            if (lodash.isEmpty(data)) {
                this.label_name.setString("");
                this.label_id.setString("");
                this.label_time.setString("");
                this.label_jushu.setString("");
                this.label_winner.setString("");
                this.label_score.setString("");
                return
            }
            this.label_name.setString(kaayou.Identify.nickNameSubSix(this._data.uname));
            this.label_id.setString("ID:" + this._data.uid);
            this.label_time.setString('加入:' + Date.format(this._data.ujointime, "yyyy-MM-dd"));
            this.label_jushu.setString('' + this._data.playtimes);
            this.label_winner.setString('' + this._data.bwtimes);
            this.label_score.setString('' + this._data.totalscore);
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
        1: "2d",
        2: "3d",
        3: "7d",
        "1d": 0,
        "2d": 1,
        "3d": 2,
        "7d": 3
    };

    const paramSortKeys = {
        0: "",
        1: "duiju",
        2: "dayingjia",
        3: "jifen",
        "duiju_desc": 0,
        "duiju_asc": 1,
        "dayingjia_asc": 2,
        "dayingjia_desc": 3,
        "jifen_asc": 4,
        "jifen_desc": 5
    };


    export class SubStatPage {



        layout_time_group: ccui.Layout = null; // 时间选择块
        layout_sort_group: ccui.Layout = null; // 排序块  tabSortGroup



        scroll_Stat: common.PullList = null; //成员列表
        searchMgr: MemSearchWidget = null;
        sortType: number = 0; //排序方式
        timetype: number = 0; //搜索时间





        //获取成员列表数据 
        doGetStatList(clear: boolean = true, timetype: number = 0, sorttype: number = -1, search: string = "") {
            var self = this;
            this.sortType = sorttype;
            this.timetype = timetype;
            search = this.searchMgr.getSearchString();
            kaayou.emit("tea", 'mod::State::GetStateList', { dfid:-1,
                param: search, daytype: timetype, sorttype: sorttype, clear: clear,lowscoreflag:0 });
        }
        initSortNode(pageStat: cc.Node) {

            //时间参数修改
            this.layout_time_group = ccui.helper.seekWidgetByName(<ccui.Widget>pageStat, "time_group");


            lodash.forEach(this.layout_time_group.getChildren(), (v: ccui.Layout, i: number) => {
                v["sortName"] = timeSortKeys[i];
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
                    kaayou.emit("teaMem", "ui::stat::time::change", { sortName, sortType });
                    kaayou.emit("teaMem", "do::stat::time::change", { sortName, sortType });
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
                kaayou.getController("teaMem").on("ui::stat::time::change", v['onTimeChange'], v);
            });
            kaayou.getController("teaMem").on("do::stat::time::change", (e: kaayou.Event) => {
                let _data = e.data;
                let { sortName, sortType } = _data;
                this.doGetStatList(true, timeSortKeys[sortName], this.sortType);
            }, this);

            //排序参数
            this.layout_sort_group = ccui.helper.seekWidgetByName(<ccui.Widget>pageStat, "sort_group");



            lodash.forEach(this.layout_sort_group.getChildren(), (v: ccui.Layout, i: number) => {
                if (i == 0) { return; }
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
                    kaayou.emit("teaMem", "ui::stat::stat::change", { sortName, sortType });
                    kaayou.emit("teaMem", "do::stat::stat::change", { sortName, sortType });
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
                kaayou.getController("teaMem").on("ui::stat::stat::change", v['onStatChange'], v);
            });

            kaayou.getController("teaMem").on("do::stat::stat::change", (e: kaayou.Event) => {
                let _data = e.data;
                let { sortName, sortType } = _data;
                let _key = `${sortName}_${sortType}`;
                let sort = 0;
                if (paramSortKeys[_key]) {
                    sort = paramSortKeys[_key];
                }
                this.doGetStatList(true, this.timetype, sort);
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
                this.scroll_Stat.initPullEnv();
            }
            this.searchMgr.clearString();
            kaayou.emit("teaMem", "ui::stat::time::change", { sortName: timeSortKeys[0], sortType: "desc" });
            kaayou.emit("teaMem", "ui::stat::stat::change", { sortName: paramSortKeys[1], sortType: "desc" });
            this.scroll_Stat.getAdpter().datas = [];
            this.scroll_Stat.refresh();

            this.doGetStatList(true, timeSortKeys['1d'], paramSortKeys['duiju_desc'], "");
        }

        //初始化成员列表页面
        initWidthNode(pageStat: cc.Node, searchMgr: MemSearchWidget, cellMod: ccui.Widget) {
            let self = this;
            this._page = pageStat;
            kaayou.getController('teaMem').on('ui::Member::SubpageChange', this.onSubpageChange, this);
            this.searchMgr = searchMgr;
            this.initSortNode(pageStat);

            this.scroll_Stat = new common.PullList();
            // this.scroll_member._debugRect = true;
            this.scroll_Stat.setSpacingY(8);
            this.scroll_Stat.initWithNode(ccui.helper.seekWidgetByName(<ccui.Widget>pageStat, "scroll_stat"));
            this.scroll_Stat.setAdpter({
                getCell: () => {
                    let v = new MemStatCell();
                    v.initWithNode(cellMod);
                    return v;
                },
                datas: []
            });
            // this.scroll_Stat.initPullEnv();
            // this.scroll_Stat.refresh();
            this.scroll_Stat.on(kaayou.PullListEvent.HeadFinish, (e: kaayou.PullListEvent) => {
                let target = e.target;
                setTimeout(() => {
                    self.doGetStatList(true, self.timetype, this.sortType, "");
                }, 500);

            }, this);
            this.scroll_Stat.on(kaayou.PullListEvent.FootFinish, (e: kaayou.PullListEvent) => {
                let target = e.target;
                setTimeout(() => {
                    self.doGetStatList(false, self.timetype, this.sortType, "");
                }, 500);
            }, this);

            kaayou.getController('tea').on('ui::State::UpdateStat', function (e: kaayou.Event) {
                if (!self._page.isVisible()) { return; }
                let data: { list: Data_HouseMemberItem, update: boolean } = e.data
                if (data) {
                    if (data.update) {
                        self.scroll_Stat.getAdpter().datas = lodash.clone(data.list);
                    }
                } else {
                    self.scroll_Stat.getAdpter().datas = [];
                }
                self.scroll_Stat.refresh();
            }, this, 10);

            kaayou.getController('teaMem').on('ui::Member::Search', function (e: kaayou.Event) {
                if (self._page.isVisible()) {
                    self.doGetStatList(true);
                }
            }, this, 10);
        }
    }
}