// / <reference path="tea.RecordSearchWidget.ts" />
// / <reference path="tea.RecordSelectWidget.ts" />
namespace tea {

    export class TH_Fcm_PartnerCountCell extends kaayou.Block implements common.IPullListCell {
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

        label_name: ccui.Text = null;   //玩家名称
        label_uid: ccui.Text = null;   //玩家id
        label_zkc: ccui.Text = null;   //总扣除
        label_wjsy: ccui.Text = null;   //玩家剩余
        label_fsze: ccui.Text = null;   //负数总额
        label_wpsy: ccui.Text = null;    //玩牌输赢
        btn_detail: ccui.Button = null;   //详情
        label_Layout: ccui.Layout = null   //文本布局
        head_image: ccui.ImageView = null;  //
        _data: Data_HousePartnerCountItem = null;

        initWithNode(node: ccui.Widget) {
            let self = this;
            super.initWithNode(node);
            this.head_image = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "img_head");
            this.label_name = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_uname");
            this.label_uid = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_uid");
            this.label_zkc = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_zkc");
            this.label_wjsy = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_wjsy");
            this.label_fsze = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_fsze");
            this.label_wpsy = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_wpsy");
            this.btn_detail = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_detail");

            this.label_Layout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "cell_Layout");
            this.label_Layout.setPadding({ spacingX: 5 });
            this.label_Layout.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Horizontal);
            this.label_Layout.setHorizontal(ccui.Layout.LayoutHorizontal.LEFT);
            this.label_Layout.doChildrenLayout();


            this.btn_detail.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                console.log("partner:::" + self._data.belong);
                if (!!!self._data.belong) {   //说明还在第一次的页面。。没进二级
                    // self.doGetPartnerCountList(true, timeSortKeys['0d'], paramSortKeys['zkc_desc']);
                    kaayou.emit("tea", "ui::fcm::partnerItemClick", { partnerID: self._data.uid })
                } else { //说明已经到了真正的玩家列表
                    // console.log("已经在队长玩家这儿了")
                    // kaayou.emit("tea","ui::FcmPlayerDetail::Show",{uid:self._data.uid})
                }
            }, this);

            this.reset();
        }


        reset() {
            this.label_name.setString("");
            this.label_uid.setString("");
            this.label_zkc.setString("");
            this.label_wjsy.setString("");
            this.label_fsze.setString("");
            this.label_wpsy.setString("");
        }

        setInfo(data: Data_HousePartnerCountItem) {
            if (lodash.eq(this._data, data)) { return; }
            var self = this;
            this._data = data;
            if (lodash.isEmpty(data)) {
                return this.reset();
            }
            if (!!self._data.belong) {
                this.label_Layout.setPadding({ left: 80, spacingX: 65 });
                this.label_fsze.setVisible(false);
                this.btn_detail.setVisible(false);
            } else {
                this.label_Layout.setPadding({ left: 0, spacingX: 0 });
                this.label_fsze.setVisible(true);
                this.btn_detail.setVisible(true);
            }
            this.label_name.setString(kaayou.Identify.nickNameSubByLength(this._data.uname, 8, 6));
            this.label_uid.setString("ID:" + this._data.uid);
            //lm190906总房费显示为正数
            this.label_zkc.setString("" + Math.abs(data.vitamincost));
            this.label_fsze.setString("" + data.vitaminminus);
            this.label_wjsy.setString("" + data.vitaminleft);

            if (data.dayType < 0) { //如果不是今天，那么显示--
                this.label_fsze.setString("--");
                this.label_wjsy.setString("--");
            }
            this.label_wpsy.setString("" + data.vitaminwinlose);
            this.label_Layout.doChildrenLayout();
            NetImage.setPlayerHead(this.head_image, this._data.uurl, this._data.ugender, (url) => {
                if (!this._data) { return false; }
                if (url !== this._data.uurl) {
                    return false;
                }
                return true;
            });
        }
    }

    const timeSortKeys = {
        0: "0d",
        1: "1d",
        2: "2d",
        3: "3d",
        4: "4d",
        "0d": 0,
        "1d": -1,
        "2d": -2,
        "3d": -3,
        "4d": -4,
    };

    const paramSortKeys = {
        0: "zkc",
        1: "wjsy",
        2: "fsze",
        3: "wpsy",
        "zkc_desc": 0,
        "zkc_asc": 1,
        "wjsy_asc": 3,
        "wjsy_desc": 2,
        "fsze_asc": 5,
        "fsze_desc": 4,
        "wpsy_asc": 7,
        "wpsy_desc": 6,
    };

    //防沉迷 -------------------------------------------------队长统计
    export class SubFcmPartnerCountPage {
        btnClear: ccui.Button = null;
        scr_business: common.PullList = null; //成员列表
        searchMgr: MemSearchWidget = null;
        // selectMgr: RecordSelectWidget = null;
        sortType: number = 5; //排序方式 
        timetype: number = 0; //搜索时间
        _page: cc.Node = null;
        partner: number = 0  //传给服务器的uid
        opreationTitle: ccui.Text = null;
        curInfoType: ccui.Text = null;
        curFangType: ccui.Text = null;
        zj_bottomPanel: ccui.Layout = null;
        zj_ff: ccui.Text = null;
        zj_wjsy: ccui.Text = null;
        zj_wpsy: ccui.Text = null;
        _index = -1;
        label_zj_totalcost: ccui.Text;
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
                this.scr_business.initPullEnv();
            }

            //this.searchMgr.setVisible(true);
            //this.searchMgr.setPlaceholder("玩家ID/昵称");
            this.searchMgr.clearString();
            let ctrName = "teaMem"
            this.resetTimeLine();
            let timeChangeEventName = "ui::fcmPartner::time::change";
            let sortChangeEventName = "ui::fcmPartner::sort::change";
            kaayou.emit(ctrName, timeChangeEventName, { sortName: timeSortKeys[0], sortType: "desc" });
            kaayou.emit(ctrName, sortChangeEventName, { sortName: paramSortKeys[0], sortType: "desc" });

            if (tea.mod.__teaHouseInfo.urole != HouseMemberRole.CAPTAIN || tea.mod.__teaHouseInfo.vitamin_admin) {
                this.layout_sort_group.setPadding({ spacingX: 0 });
                this.partner = 0;
                this.opreationTitle.setVisible(true);
                this.curInfoType.setString("队长信息");
                this.curFangType.setString("总报名费");
                this.zj_bottomPanel.setVisible(false);
                
                if(tea.mod.__teaHouseInfo.urole===HouseMemberRole.OWNER){
                    this.zj_bottomPanel.setVisible(true)
                    this.label_zj_totalcost.setVisible(true)
                    this.label_zj_totalcost.setPositionX(325)
                    this.zj_ff.setPositionX(487)
                    this.zj_wjsy.setPositionX(657)
                    this.zj_wpsy.setPositionX(795)
                }else{
                    this.zj_ff.setPositionX(397)
                    this.zj_wjsy.setPositionX(615)
                    this.zj_wpsy.setPositionX(848)
                    this.label_zj_totalcost.setVisible(false)
                }

            } else {
                this.partner = lobby.mod.User.getInstance().getUserInfo().uid;
                this.layout_sort_group.getChildren()[2].setVisible(false);
                this.layout_sort_group.setPadding({ left: 80, spacingX: 65 });
                this.label_zj_totalcost.setVisible(false)
                this.opreationTitle.setVisible(false);
                this.curInfoType.setString("玩家信息");
                this.curFangType.setString("报名费");
                this.zj_bottomPanel.setVisible(true);
            }
            this.doGetPartnerCountList(true, timeSortKeys['0d'], paramSortKeys['zkc_desc']);
            this.scr_business.getAdpter().datas = [];
            this.scr_business.refresh();

            this.layout_sort_group.doChildrenLayout();

        }
        layout_time_group: ccui.Layout = null; // 时间选择块
        layout_sort_group: ccui.Layout = null; // 排序块  tabSortGroup

        resetTimeLine() {
            lodash.forEach(this.layout_time_group.getChildren(), (v: ccui.Layout, i: number) => {
                if (i == 0) (<ccui.Text>v.getChildByName("time")).setString('今天');
                else if (i == 1) (<ccui.Text>v.getChildByName("time")).setString('昨天');
                else if (i == 2) (<ccui.Text>v.getChildByName("time")).setString('前天');
                else (<ccui.Text>v.getChildByName("time")).setString(new Date(this.subDayTime(i)).Format("MM-dd"));
            });
        }
        subDayTime(sd: number = 0) {
            let todayStr = Date.format("yyyy-MM-dd")
            let todayTime = Math.floor(new Date(todayStr).getTime() / 1000);
            todayTime -= sd * 24 * 60 * 60;
            console.log(todayTime)
            return todayTime * 1000;
        }

        //初始化成员列表页面
        initWidthNode(page: cc.Node, searchMgr: MemSearchWidget, cellMod: ccui.Widget) {

            let self = this;
            this._page = page;

            page.setPosition(0, -80);

            let ctrName = "teaMem"
            let subpageChangeEventName = "ui::PropotionPanel::SubpageChange";
            let timeChangeEventName = "ui::fcmPartner::time::change";
            let timeDoEventName = "do::fcmPartnerCount::time::change";

            let sortChangeEventName = "ui::fcmPartner::sort::change";
            let sortDoEventName = "do::fcmPartnerCount::sort::change";

            let onSearchEventName = "ui::PropotionPanel::Search";
            kaayou.getController(ctrName).on(subpageChangeEventName, this.onSubpageChange, this);
            this.searchMgr = searchMgr;
            this.opreationTitle = ccui.helper.seekWidgetByName(<ccui.Widget>page, "opreationTitle")
            this.curInfoType = ccui.helper.seekWidgetByName(<ccui.Widget>page, "curInfoType");
            this.curFangType = ccui.helper.seekWidgetByName(<ccui.Widget>page, "curFangType");
            this.zj_bottomPanel = ccui.helper.seekWidgetByName(<ccui.Widget>page, "partnerTotleBottom");
            this.label_zj_totalcost = ccui.helper.seekWidgetByName(<ccui.Widget>page, "label_zj_totalcost");
            this.zj_ff = <ccui.Text>this.zj_bottomPanel.getChildByName("label_zj_ff");
            this.zj_wjsy = <ccui.Text>this.zj_bottomPanel.getChildByName("label_zj_wjsy");
            this.zj_wpsy = <ccui.Text>this.zj_bottomPanel.getChildByName("label_zj_wpsy");
            this.scr_business = new common.PullList();
            // this.scroll_member._debugRect = true;s
            this.scr_business.setSpacingY(8);
            this.scr_business.initWithNode(<cc.Node>ccui.helper.seekWidgetByName(<ccui.Widget>page, "scr_business"));

            this.scr_business.setFootDoingText("上拉刷新");
            this.scr_business.setFootDidFinishText("松开刷新");
            this.scr_business.setFootFinishText("正在刷新");
            this.scr_business.setAdpter({
                getCell: () => {
                    let v = new TH_Fcm_PartnerCountCell();
                    v.initWithNode(cellMod);
                    return v;
                },
                datas: []
            });
            this.scr_business.on(kaayou.PullListEvent.HeadFinish, (e: kaayou.PullListEvent) => {
                let target = e.target;
                setTimeout(() => {
                    self.doGetPartnerCountList(true, self.timetype, self.sortType);
                }, 100);

            }, this);
            this.scr_business.on(kaayou.PullListEvent.FootFinish, (e: kaayou.PullListEvent) => {
                let target = e.target;
                setTimeout(() => {
                    self.doGetPartnerCountList(false, self.timetype, self.sortType);
                }, 100);
            }, this);
            //点击了队长item之后需要显示队长下面的人的详情
            kaayou.getController("tea").on("ui::fcm::partnerItemClick", function (e: kaayou.Event) {
                if (!self._page.isVisible()) { return; }
                // if (!tea.mod._isPartner() && !tea.mod.__teaHouseInfo.vitamin_admin) { return; }
                if (!e.data.partnerID) { return };
                // kaayou.emit(ctrName, timeChangeEventName, { sortName: timeSortKeys[0], sortType: "desc" });
                // kaayou.emit(ctrName, sortChangeEventName, { sortName: paramSortKeys[2], sortType: "desc" });
                // self.doGetPartnerCountList(true, 0,0);
                kaayou.emit("tea", "ui::PartnerMemberCountPop::Show", {
                    daytype: self.timetype,
                    partner: e.data.partnerID,
                    sorttype: self.sortType
                });


            }, this, 10)


            kaayou.getController('tea').on('ui::FcmPartnerCount::UpdateCount', function (e: kaayou.Event) {
                if (!self._page.isVisible()) { return; }
                // if (!tea.mod._isPartner() && !tea.mod.__teaHouseInfo.vitamin_admin ) { return; }
                let data: { list: Data_HousePartnerCountItem[], update: boolean, totalInfo: Data_HousePartnerTotalInfo } = e.data
                if (data) {
                    if (data.update) {
                        //lm190907房费为正数
                        if(tea.mod.__teaHouseInfo.urole===HouseMemberRole.OWNER){
                            self.label_zj_totalcost.setString("" + Math.abs(data.totalInfo.totalvitamincost))
                            self.zj_ff.setString("" + data.totalInfo.totalvitaminleft);
                            self.zj_wjsy.setString("" + data.totalInfo.totalvitaminminus);
                            self.zj_wpsy.setString("" + data.totalInfo.totalvitaminwinlose);
                        }else{
                            self.zj_ff.setString("" + Math.abs(data.totalInfo.totalvitamincost));
                            self.zj_wjsy.setString("" + data.totalInfo.totalvitaminleft);
                            self.zj_wpsy.setString("" + data.totalInfo.totalvitaminwinlose);
                        }
                        self.scr_business.getAdpter().datas = lodash.clone(data.list);
                    }
                } else {
                    self.scr_business.getAdpter().datas = [];
                }
                self.scr_business.refresh();
            }, this, 20);

            //时间切换事件
            this.layout_time_group = ccui.helper.seekWidgetByName(<ccui.Widget>page, "time_group")




            lodash.forEach(this.layout_time_group.getChildren(), (v: ccui.Layout, i: number) => {
                v["sortName"] = timeSortKeys[i];
                v["sortType"] = "none";
                v.on(kaayou.TouchEvent.TouchEnd, (e: kaayou.TouchEvent) => {
                    let tagert = e.target;
                    let sortName = tagert.sortName;
                    let sortType = tagert.sortType;
                    console.log("sortName-----" + sortName + "sortType---------" + sortType);
                    if (sortType == 'none' || sortType == 'asc') {
                        sortType = 'desc';
                    } else {
                        sortType = 'asc';
                    }
                    kaayou.emit(ctrName, timeChangeEventName, { sortName, sortType });
                    kaayou.emit(ctrName, timeDoEventName, { sortName, sortType });
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
                kaayou.getController(ctrName).on(timeChangeEventName, v['onTimeChange'], v);
            });


            //监听时间修改之后取做的操作
            kaayou.getController(ctrName).on(timeDoEventName, (e: kaayou.Event) => {
                let _data = e.data;
                let { sortName, sortType } = _data;
                this.doGetPartnerCountList(true, timeSortKeys[sortName], this.sortType);
            }, this);

            this.layout_sort_group = ccui.helper.seekWidgetByName(<ccui.Widget>page, "SortTypeLayout");
            this.layout_sort_group.setPadding({ spacingX: 5 });
            this.layout_sort_group.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Horizontal);
            this.layout_sort_group.setHorizontal(ccui.Layout.LayoutHorizontal.LEFT);
            this.layout_sort_group.doChildrenLayout();


            lodash.forEach(this.layout_sort_group.getChildren(), (v: ccui.Layout, i: number) => {
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
                    console.log("sort------------" + sortType)
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
                    console.log("排序状态" + this.sortType)
                    this.updateByType();
                }
                kaayou.getController(ctrName).on(sortChangeEventName, v['onStatChange'], v);
            });

            kaayou.getController(ctrName).on(sortDoEventName, (e: kaayou.Event) => {
                if (!this._page.isVisible()) { return; }
                let _data = e.data;
                let { sortName, sortType } = _data;
                let _key = `${sortName}_${sortType}`;
                let sort = 0;
                if (paramSortKeys[_key]) {
                    sort = paramSortKeys[_key];
                }
                this.doGetPartnerCountList(true, this.timetype, sort);
            }, this);


            kaayou.getController(ctrName).on(onSearchEventName, (e: kaayou.Event) => {
                if (!this._page.isVisible()) { return; }
                this.doGetPartnerCountList(true, this.timetype, this.sortType)
            }, this, 10);

        }

        //如果是圈主获取队长列表数据 这个页面的时候都是不需要传partner....在点详情的时候需要传这个partnerid
        // @BindEvent("tea","ui::fcm::getListInfo")
        doGetPartnerCountList(clear: boolean = true, timetype: number = 0, sorttype: number = -1) {
            let self = this;
            this.timetype = timetype;
            this.sortType = sorttype;
            // this.partner = partner;
            let search = this.searchMgr.getSearchString();
            kaayou.emit("tea", "mod::Fcm::GetMemInPartnerList", { param: search, daytype: timetype, sorttype: sorttype, clear: clear, partner: this.partner });
            console.log("需要取获取队长列表数据时间" + this.timetype + "type:" + this.sortType);
        }
    }

}