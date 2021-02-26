//团队统计
namespace tea {
    //全部数字除100
    interface Data_HousePartnerNoUnionItem {
        islike: boolean,
        "changeprofit": number,
        daytype: number,
        iLowScore: number,
        timeRange: number;
        "ugender": number,
        "uid": number;
        "uname": string;
        "uurl": string;

        "invalidtimes": number,
        "bwtimes": number,
        "playtimes": number,
        parnterlevel: number,
        timeIndex: number,
        timeInterval: number,
        superior: number,
        superiorname: string
    }

    class PartnerNounionCell extends kaayou.Block implements common.IPullListCell {
        private img_head: ccui.ImageView = null;
        private iv1: ccui.ImageView = null;
        private iv2: ccui.ImageView = null;
        private ivLike: ccui.ImageView;
        private label_name: ccui.Text = null;
        private label_id: ccui.Text = null;
        private label_change: ccui.Text = null;
        private label_bwtimes: ccui.Text = null;
        private label_total: ccui.Text;
        private label_low_score: ccui.Text
        //private btn_detail:ccui.Button = null;

        private container_edit: ccui.Layout;
        private container_query: ccui.Layout;

        private UImageSubTag: ccui.ImageView = null;
        private UImageSubFirstTag: ccui.ImageView = null;

        initWithNode(node: ccui.Widget) {
            let self = this;
            super.initWithNode(node);

            this.setAnchorPoint(0, 0);
            this.setPosition(0, 0);

            this.ivLike = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "ivLike");
            this.ivLike.on(kaayou.TouchEvent.TouchEnd, () => {
                let islike = !this._info.islike;
                let hid = tea.mod.__teaHouseInfo.hid;
                let likeuser = this._info.uid;
                let daytype = -this.queryinfo.daytype;//为了保持点赞接口的统一性，今天为0，昨天为-1
                let querytimeinterval = self.queryinfo.querytimeinterval;
                let querytimerange = self.queryinfo.querytimerange;
                let isteamlike = true;

                kaayou.emit("tea", 'mod::TeaHouse::MemberLike', {
                    data: { hid, likeuser, islike, daytype, querytimeinterval, querytimerange, isteamlike },
                    callback: (result) => {
                        if (result === true) {
                            let islike = !this._info.islike
                            this._info.islike = islike;
                            this.ivLike.loadTexture(islike ? "TH_Record_zan.png" : "TH_Record_zan_gray.png", ccui.Widget.PLIST_TEXTURE);
                        }
                    }
                })
            }, this);
            let headBG = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "HeadBg");
            this.iv1 = ccui.helper.seekWidgetByName(<ccui.Widget>headBG, "iv1");
            this.iv2 = ccui.helper.seekWidgetByName(<ccui.Widget>headBG, "iv2");
            this.UImageSubTag = ccui.helper.seekWidgetByName(<ccui.Widget>headBG, "Image_2");
            this.UImageSubFirstTag = ccui.helper.seekWidgetByName(<ccui.Widget>headBG, "Image_3");

            this.container_edit = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "container_edit");
            this.container_query = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "container_query");

            this.img_head = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "img_head");
            this.label_name = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_name");
            this.label_id = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_id");
            this.label_change = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_change");
            this.label_bwtimes = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_winner");
            this.label_total = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_total");
            this.label_low_score = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_low_score");

            let query: ccui.Button = ccui.helper.seekWidgetByName(<ccui.Widget>this.container_edit, "QueryButton");
            query.on(kaayou.TouchEvent.TouchEnd, function () {
                let { uid } = self._info;
                let { daytype, searchkey, fid } = self.queryinfo
                let info = self._info;
                kaayou.emit('tea', 'ui::RecordNoAllianceInfoDialog::Show', {
                    partner: uid, daytype, searchkey, fid, info,
                    timeInterval: self._info.timeInterval, timeIndex: self._info.timeIndex,
                    superior: self._info.superior, superiorname: self._info.superiorname,
                    iLowScore: self._info.iLowScore
                });
            }, this)

            let query1: ccui.Button = ccui.helper.seekWidgetByName(<ccui.Widget>this.container_query, "QueryButton");
            query1.on(kaayou.TouchEvent.TouchEnd, function () {
                let { uid } = self._info;
                let { daytype, searchkey, fid } = self.queryinfo;
                let info = self._info;
                kaayou.emit('tea', 'ui::RecordNoAllianceInfoDialog::Show', {
                    partner: uid, daytype, searchkey, fid, info,
                    timeInterval: self._info.timeInterval, timeIndex: self._info.timeIndex,
                    superior: self._info.superior, superiorname: self._info.superiorname, iLowScore: self._info.iLowScore
                });
            }, this)

            let edit: ccui.Button = ccui.helper.seekWidgetByName(<ccui.Widget>this.container_edit, "EditButton");
            edit.on(kaayou.TouchEvent.TouchEnd, function () {
                let { uid } = self._info;
                kaayou.emit("tea", "ui::TeaHouse::ShowPartnerPanel", uid);
            }, this)


        }

        reset() {
            this.label_name.setString("");
            this.label_id.setString("");
            this.label_change.setString("");
            this.label_bwtimes.setString("");
            this.label_total.setString("");
            this.label_low_score.setString("");
            this.ivLike.setVisible(false);
        }

        private _info: Data_HousePartnerNoUnionItem = {
            islike: false,
            daytype: 0,
            "playtimes": null,
            timeRange: 0,
            "ugender": null,
            "uid": null,
            "uname": null,
            "uurl": null,
            "invalidtimes": null,
            "changeprofit": null,
            "bwtimes": null,
            parnterlevel: null,
            timeInterval: 0,
            timeIndex: 0,
            superior: 0,
            superiorname: "",
            iLowScore: 0
        }

        private isPartnerSelf: boolean = false;

        isPartner() {
            return tea.mod.__teaHouseInfo.urole === HouseMemberRole.CAPTAIN;
        }



        private isVitaAdmin() {
            return tea.mod.__teaHouseInfo.vitamin_admin === true || tea.mod.__teaHouseInfo.urole === HouseMemberRole.CPADMIN;
        }

        get() {
            return lodash.clone(this._info);
        }



        private FloatNumber(num: number) {

            let num1 = num / 10;
            let num2 = num / 100;

            if (num2.toString().indexOf(".") === -1)
                return num2.toString()

            num1 = (num1 | 0) / 10;
            if (num1.toString().indexOf(".") === -1)
                return num2.toString();

            return num1.toString();
        }


        isOwner() {
            let role = tea.mod.__teaHouseInfo.urole;
            return role === HouseMemberRole.OWNER;
        }

        setInfo(data: Data_HousePartnerNoUnionItem) {
            if (lodash.isEmpty(data) || lodash.isNull(data)) {
                return this.reset();
            }

            this._info = data;
            this.ivLike.loadTexture(!!data.islike ? "TH_Record_zan.png" : "TH_Record_zan_gray.png", ccui.Widget.PLIST_TEXTURE);
            this.ivLike.setVisible(this.queryinfo.daytype < 2 && this.queryinfo.fid == -1);
            this.isPartnerSelf = data.uid === tea.mod.__teaHouseInfo.uid;
            this.label_name.setString(kaayou.Identify.nickNameSubSix(data.uname));
            this.label_id.setString(data.uid.toString());
            this.label_bwtimes.setString("" + data.bwtimes);
            this.label_change.setString("" + this.FloatNumber(data.changeprofit));
            this.label_total.setString("" + data.playtimes);
            this.label_low_score.setString("" + data.invalidtimes);

            NetImage.setPlayerHead(this.img_head, data.uurl, data.ugender, (url) => {
                if (!data) { return false; }
                if (url !== data.uurl) {
                    return false;
                }
                return true;
            });


            this.container_edit.setVisible(this.isOwner());
            this.container_query.setVisible(!this.isOwner())

            this.iv1.setVisible(data.parnterlevel == 0);
            this.iv2.setVisible(data.parnterlevel == 1);
        }

        private queryinfo: { daytype: number, fid: number, searchkey: string,querytimeinterval:number,querytimerange:number } = null;
        setQueryArgs(q) {
            this.queryinfo = q;
        }

        private _index = 0
        setIndex(index: number) {
            this._index = index
        }
        getIndex(): number {
            return this._index;
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

    export class RecordNounionPanel {
        iTime: number = 0;//时段筛选序号
        iTimeInterval: number = 0;//时段筛选时长
        iDetailInterval: number = 0;
        iDetailRange: number = 0;
        lbTeamTotalMemberCount: ccui.Text = null;
        lbTeamCaptainMemberCount: ccui.Text = null;
        likeflag: number = 0;  //0：全部；1：点赞；2：未点赞
        lyTeamMemberCount: ccui.Layout = null;
        selectMgr: RecordSelectWidget = null
        searchMgr: RecordSearchWidget = null;
        dateMgr: RecordDateWidget = null;
        clear: ccui.Button;
        cellMod: ccui.Widget = null;
        // btn_history_record:ccui.Button = null;
        _page: cc.Node = null;
        _index = -1;
        iLowScore: number = 0;
        roundtype = 0;

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
                this.dateMgr.setPage("Team");
                this.iTime = kaayou.TimeHelper.getLastIndex();
                this.dateMgr.setCurSelect(0);
                if (this._page.isVisible() === false) {
                    this.initQuery()
                    this._page.setVisible(true);
                }
            } else {
                this._page.setVisible(false);
            }
        }

        timeType: number = 0;

        layout_time_group: cc.Node = null;
        ScrollView_Detail: ccui.ScrollView = null;
        SV_pullList: common.PullList = null;
        partnerTypeSort: ccui.Layout = null;
        _fid: number = 0;
        partnerType_radioGrup: common.RadioGroup = null;
        private daytypeRecord = 0;
        initWithNode(pagePartner: cc.Node, searchMgr: RecordSearchWidget, selectMgr: RecordSelectWidget, dateMgr: RecordDateWidget, cellMod: ccui.Widget, clear: ccui.Button) {
            let self = this;
            pagePartner.setPosition(0, 0);
            this._page = pagePartner;
            this.searchMgr = searchMgr;
            this.selectMgr = selectMgr;
            this.dateMgr = dateMgr;
            this.clear = clear;
            this.cellMod = cellMod;
            this.lbTeamCaptainMemberCount = ccui.helper.seekWidgetByName(<ccui.Widget>this._page, "lbTeamCaptainMemberCount");
            this.lbTeamTotalMemberCount = ccui.helper.seekWidgetByName(<ccui.Widget>this._page, "lbTeamTotalMemberCount");
            this.lyTeamMemberCount = ccui.helper.seekWidgetByName(<ccui.Widget>this._page, "lyTeamMemberCount");

            this.ScrollView_Detail = ccui.helper.seekWidgetByName(<ccui.Widget>this._page, "ScrollView_Detail");
            this.searchMgr.clearString();

            kaayou.getController('teaRC').on('ui::record::onSearch', function (e: kaayou.Event) {
                if (self._page.isVisible()) {
                    self.pullList(true, self.timeType);
                }
            }, this, 10);

            kaayou.getController('teaRC').on('ui::record::SubpageChange', this.onSubpageChange, this);

            this.initFilter();

            this.SV_pullList = new common.PullList()
            this.SV_pullList.setSpacingY(10)
            this.SV_pullList.initWithNode(this.ScrollView_Detail)
            this.SV_pullList.setAdpter({
                getCell: () => {
                    let item = new PartnerNounionCell();
                    let searchkey = this.searchMgr.getSearchString();
                    let fid = this.selectMgr.getCurSelect();
                    let daytype = this.timeType
                    item.setQueryArgs({ daytype, fid, searchkey });
                    item.initWithNode(self.cellMod);
                    return item;
                },
                datas: []
            });



            this.SV_pullList.on(kaayou.PullListEvent.HeadFinish, (e: kaayou.PullListEvent) => {
                setTimeout(() => {
                    this.pullList(true, this.timeType);
                }, 500);

            }, this);
            this.SV_pullList.on(kaayou.PullListEvent.FootFinish, (e: kaayou.PullListEvent) => {
                setTimeout(() => {
                    this.pullList(false, this.timeType);
                }, 500);
            }, this);



            this.SV_pullList.initPullEnv();

            this.partnerTypeSort = ccui.helper.seekWidgetByName(<ccui.Widget>this._page, "sortPartnerType");
            this.partnerType_radioGrup = new common.RadioGroup()
            lodash.forEach(this.partnerTypeSort.getChildren(), function (v: ccui.CheckBox, i) {
                v['index'] = i - 1;
                self.partnerType_radioGrup.add(v);
                v.on(kaayou.RadioEvent.SELECTED, self.onPartnerypeChange, self);

            })


            if (/5|8/.test(tea.mod.__teaHouseInfo.urole.toString())) {
                let json = (cc.sys.localStorage.getItem("tea::store::lowscorefilter") || "{}");
                this.iLowScore = JSON.parse(json)[tea.mod.__teaHouseInfo.hid] || 0
            }

        }
        listPartnerType = -1;
        onPartnerypeChange(e: kaayou.RadioEvent) {
            let self = this;
            let index = e.target['index'];
            let v = <ccui.CheckBox>e.target;
            this.listPartnerType = index;

            self.pullList(true, self.timeType);
        }

        private initFilter() {
            let self = this;
            let ctrName = "teaRC"
            let timeDoEventName = "do::teaRC::time::change";
            //时间参数修改
            kaayou.getController(ctrName).on(timeDoEventName, (e: kaayou.Event) => {
                if (!this._page.isVisible()) { return; }
                this.pullList(true, this.dateMgr.getCurSelect());
            }, this);
            kaayou.getController("teaRC").on("ui::record::onSelect", (e: kaayou.Event) => {
                if (!this._page.isVisible()) { return; }
                this.pullList(true, this.timeType);
            }, this, 10);

            kaayou.getController('tea').on("ui::TeaHouse::TeamStatistics", function (e: kaayou.Event) {
                let res = e.data;
                if (!self._page.isVisible()) {
                    return;
                }
                self.lyTeamMemberCount.setVisible(self.isOwner());
                if (res && res.list) {
                    self.lbTeamCaptainMemberCount.setString(res.list.capplaytimes);
                    self.lbTeamTotalMemberCount.setString(res.list.allplaytimes);
                    for (let x in res.list.items) {
                        //团队统计的查看里面不分时段
                        res.list.items[x].timeIndex = 0;
                        res.list.items[x].timeInterval = 0;
                        res.list.items[x].iLowScore = self.iLowScore
                    }
                    if (res.update) {
                        self.SV_pullList.getAdpter().datas = lodash.clone(res.list.items || []);
                    }
                } else {
                    self.SV_pullList.getAdpter().datas = [];
                }
                self.refreshQueryInfo();
                self.SV_pullList.refresh();
            }, this, 10);

            kaayou.getController('tea').on('ui::TimeFliter::Submit', function (e: kaayou.Event) {
                if (!this._page.isVisible()) { return; }
                self.iTime = e.data.iTime;
                self.iLowScore = e.data.iLowScore;
                self.roundtype = e.data.iType;
                self.likeflag = e.data.iLike;
                self.pullList(true, self.timeType);
            }, this, 10);
        }

        private refreshQueryInfo() {
            let searchkey = this.searchMgr.getSearchString();
            let fid = this.selectMgr.getCurSelect();
            let daytype = this.timeType;
            let querytimeinterval= this.iDetailInterval;
            let querytimerange= this.iDetailRange + 1;
            this.SV_pullList.getCells().forEach((v: PartnerNounionCell) => {
                v.setQueryArgs({ daytype, fid, searchkey,querytimeinterval, querytimerange});
            })
        }


        private initQuery() {
            if (!!!tea.mod.__teaHouseInfo || !!!tea.mod.__teaHouseInfo.hfloorids) {
                return;
            }

            if (/5|8/.test(tea.mod.__teaHouseInfo.urole.toString())) {
                let json = (cc.sys.localStorage.getItem("tea::store::lowscorefilter") || "{}");
                this.iLowScore = JSON.parse(json)[tea.mod.__teaHouseInfo.hid] || 0
            } else
                this.iLowScore = 0

            this.selectMgr.setCurSelect(-1);
            this.selectMgr.setVisible(true);
            this.selectMgr.setCurSelect(-1);
            this.searchMgr.setString("玩家ID/昵称")
            this.searchMgr.setVisible(true);
            this.clear.setVisible(false);
            (<ccui.CheckBox>(this.partnerTypeSort.getChildren()[0])).setSelected(true);
            (<ccui.CheckBox>(this.partnerTypeSort.getChildren()[1])).setSelected(false);
            (<ccui.CheckBox>(this.partnerTypeSort.getChildren()[2])).setSelected(false);
            this.partnerTypeSort.setVisible(tea.mod._isMaster() || tea.mod._isCPAdmin());
            this.listPartnerType = -1;

            this.searchMgr.clearString();

            this.pullList(true, this.dateMgr.getCurSelect());
        }

        private cleanList() {
            this.SV_pullList.getAdpter().datas = []
            this.SV_pullList.refresh();
        }

        async pullList(clear: boolean = true, timetype: number = 0) {
            let self = this;
            if (!tea.mod.__teaHouseInfo) {
                return;
            }
            this.timeType = timetype;
            let search = this.searchMgr.getSearchString();
            let findex = this.selectMgr.getCurSelect();
            if (timetype < 2) {
                self.iDetailInterval = 0;
                self.iDetailRange = 0;
                if (kaayou.TimeHelper.getLastIndex() != self.iTime) {
                    self.iDetailInterval = mod.__teaHouseInfo.record_time_interval;
                    self.iDetailRange = self.iTime;
                }
                this.iTimeInterval = mod.__teaHouseInfo.record_time_interval;
            } else {
                //三天及以上，没有筛选
                self.iDetailInterval = 0;
                self.iDetailRange = 0;
                this.iTimeInterval = 0;
            }
            kaayou.emit("tea", "mod::TeaHouse::TeamStatistics", {
                param: search, clear: clear, daytype: this.timeType, fid: findex
                , partnerlevel: this.listPartnerType,
                querytimeinterval: self.iDetailInterval,
                querytimerange: self.iDetailRange + 1,
                lowscoreflag: this.iLowScore,
                roundtype: this.roundtype,
                likeflag: this.likeflag
            });

        }

        isOwner() {
            let role = tea.mod.__teaHouseInfo.urole;
            return role === HouseMemberRole.OWNER;
        }

    }

}