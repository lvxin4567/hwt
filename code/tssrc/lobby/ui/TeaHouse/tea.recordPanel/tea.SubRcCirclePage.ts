//圈子战绩
/// <reference path="tea.RecordSearchWidget.ts" />
/// <reference path="tea.RecordSelectWidget.ts" />
/// <reference path="tea.SubRcMinePage.ts" />
namespace tea {
    interface ITH_RECORD_CELL_PLAYER {
        layout_player: ccui.Layout, //玩家块本身
        img_head: ccui.ImageView, //头像
        tag_winner: ccui.ImageView,//大赢家标签
        label_uname: ccui.Text,//用户名
        label_uscore: ccui.Text,//积分
        image_me: ccui.ImageView //自己头部
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

    class TH_RecordQuanCell extends kaayou.Block implements common.IPullListCell {
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
        label_gname: ccui.Text = null;   //玩法标签
        label_time: ccui.Text = null;   //时间标签
        label_roomnum: ccui.Text = null;   //房号标签
        label_innings: ccui.Text = null;   //局数标签
        label_floornum: ccui.Text = null;   //楼层标签
        label_diss: ccui.Text = null;   //解散标签
        btn_detail: ccui.Button = null;   //详情按钮
        img_zan: ccui.ImageView;
        btn_dishint: ccui.Button;
        playerItems: Array<ITH_RECORD_CELL_PLAYER> = null;

        _data: ITH_DATA_RECORD_ITEM = null;

        initWithNode(node: ccui.Widget) {
            let self = this;
            super.initWithNode(node);
            this.label_seq = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_seq");
            this.label_gname = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_gname");
            this.label_time = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_time");
            this.label_roomnum = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_roomnum");
            this.label_innings = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_innings");
            this.label_floornum = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_floornum");
            this.label_diss = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_diss");
            this.btn_detail = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_detail");
            this.img_zan = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "img_zan");
            this.btn_dishint = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_dishint");
            this.btn_dishint.setVisible(false);
            this.img_zan.on(kaayou.TouchEvent.TouchEnd, () => {
                //{hid:string,gamenum:number,islike:boolean,daytype:number,recordtype:number}
                const { hid } = tea.mod.__teaHouseInfo
                let { isheart, gamenum } = this._data;
                let recordtype = 0;
                let islike = !isheart;
                let querytimeinterval = self._data.timeInterval;
                let querytimerange = self._data.timeRange + 1;
                kaayou.emit("tea", 'mod::TeaHouse::GameLike', {
                    data: { hid, daytype: self.daytype, islike, gamenum, recordtype, querytimeinterval, querytimerange },
                    callback: (result) => {
                        if (result === true) {
                            this._data.isheart = +(!this._data.isheart)
                            let islike = !!this._data.isheart
                            this.img_zan.loadTexture(islike ? "TH_Record_zan.png" : "TH_Record_zan_gray.png", ccui.Widget.PLIST_TEXTURE);
                            kaayou.emit("teaRC", 'ui::State::UpdateQuanZanCount', { num: islike ? 1 : -1 });
                        }
                    }
                })
            }, this)

            this.btn_dishint.on(kaayou.TouchEvent.TouchEnd,()=>{
                let pos;
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit("tea", "ui::TeaHouse::cycdismisstip",{
                    game_num: this._data.gamenum,
                    param:{
                        pos:(pos = this.btn_dishint.getWorldPosition(),pos.y+=16,pos),
                    }
                })
            },this)


            //player
            this.playerItems = [];
            for (var i = 0; i < 5; i++) {
                let it: ITH_RECORD_CELL_PLAYER = {
                    layout_player: null,
                    img_head: null,
                    tag_winner: null,
                    label_uname: null,
                    label_uscore: null,
                    image_me: null,
                }
                it.layout_player = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "layout_player" + i);
                it.img_head = ccui.helper.seekWidgetByName(it.layout_player, "img_head");
                it.tag_winner = ccui.helper.seekWidgetByName(it.layout_player, "tag_winner");
                it.label_uname = ccui.helper.seekWidgetByName(it.layout_player, "label_uname");
                it.label_uscore = ccui.helper.seekWidgetByName(it.layout_player, "label_uscore");
                it.image_me = ccui.helper.seekWidgetByName(it.layout_player, "Image_me");
                this.playerItems.push(it);
            }

            this.btn_detail.on(kaayou.TouchEvent.TouchEnd, () => {
                if (!this._data) { return; }
                if (!this._data.gamenum) { return; }
                kaayou.emit("tea", 'mod::TeaHouse::Record::GetRecordDetail', { gamenum: this._data.gamenum, gname: this._data.wf,partnerid:this._data.partnerid });
            }, this);

        }


        reset() {

            this.label_seq.setString("");
            this.label_gname.setString("");
            this.label_time.setString("");
            this.label_roomnum.setString("");
            this.label_innings.setString("");
            this.label_floornum.setString("");
            this.label_diss.setVisible(false);
            this.btn_detail.setVisible(false);
            this.btn_dishint.setVisible(false)
            this.img_zan.loadTexture("TH_Record_zan_gray.png", ccui.Widget.PLIST_TEXTURE);
            this.resetPlayers();
        }

        resetPlayers() {
            lodash.forEach(this.playerItems, (v: ITH_RECORD_CELL_PLAYER, i) => {
                v.label_uname.setString("");
                v.label_uscore.setString("");
                v.img_head.setVisible(false);
                v.tag_winner.setVisible(false);
                v.layout_player.setVisible(false);
            });
        }

        setInfo(data: ITH_DATA_RECORD_ITEM) {
            if (lodash.eq(this._data, data)) { return; }
            var self = this;
            this._data = data;
            if (lodash.isEmpty(data)) {
                return this.reset();
            }
            if (this._data.gameindex >= 0) this.label_seq.setString(this._data.gameindex.toString());
            else this.label_seq.setString("");
            this.label_gname.setString(this._data.wf.toString());
            this.label_time.setString(Date.format(this._data.playedat * 1000, "yyyy/MM/dd hh:mm"));

            this.label_roomnum.setString("房号：" + this._data.roomnum.toString());
            this.label_innings.setString(this._data.playround + "/" + this._data.totalround + "局");
            this.label_floornum.setString((this._data.dfid + 1).toString() + "楼");
            this.label_diss.setVisible(this._data.finishtype != 0);

            this.img_zan.loadTexture(!!data.isheart ? "TH_Record_zan.png" : "TH_Record_zan_gray.png", ccui.Widget.PLIST_TEXTURE);

            if (this._data.finishtype == 1) {
                this.label_diss.setString("首局解散");
                this.label_diss.setTextColor(cc.color("#E05205"));
                this.btn_dishint.setVisible(true)
            } else if (this._data.finishtype == 2) {
                this.label_diss.setString("中途解散");
                this.label_diss.setTextColor(cc.color("#E07405"));
                this.btn_dishint.setVisible(true)
            }else{
                this.btn_dishint.setVisible(false)
            }
            this.btn_detail.setVisible(true);
            this.setPlayerInfo();
        }

        daytype: number;
        injectTimeType(type) {
            this.daytype = type;
        }

        setPlayerInfo() {
            this.resetPlayers();
            let self = this;

            let maxScore = 0;
            let __player = this._data.player;
            if (!__player) { return; }
            lodash.forEach(__player, (it: ITH_DATA_RECORD_PLAYER, i) => {
                maxScore = Math.max(maxScore, it.score);
            });
            let uid = lobby.mod.User.getInstance().getUserInfo().uid;
            //200128针对亲友圈 947346 做特殊处理
            let urole = tea.mod.__teaHouseInfo.urole;
            if(tea.mod.__teaHouseInfo.hid==947346 && (urole === HouseMemberRole.CAPTAIN||urole==HouseMemberRole.VICECAPTAIN)){
                let index=0;
                lodash.forEach(__player, (it: ITH_DATA_RECORD_PLAYER, i) => {
                    let v = this.playerItems[index];
                    switch(self._data.player_tags[i]){
                        case 2:
                            v.image_me.setVisible(true);
                            v.image_me.loadTexture("btn_newRecord_mem_icon.png",ccui.Widget.PLIST_TEXTURE);
                            index++;
                            break;
                        case 1:
                            v.image_me.setVisible(true);
                            v.image_me.loadTexture("TH_newRecord_metag.png",ccui.Widget.PLIST_TEXTURE);
                            index++;
                            break;
                        case 0:
                            v.image_me.setVisible(false);
                            return;
                    }
                    v.label_uname.setString(kaayou.Identify.nickNameSubByLength(it.nickname, 4, 4));
                    let sctext = it.score > 0 ? "+" + it.score : it.score.toString();
                    v.label_uscore.setString(sctext);
                    v.label_uscore.setTextColor(it.score > 0 ? cc.color("#ff4925") : cc.color("#008c07"));
                    //lw200629大赢家积分大于0
                    if (this._data.finishtype != 1) v.tag_winner.setVisible(it.score == maxScore && maxScore > 0);
                    NetImage.setPlayerHead(v.img_head, it.headurl, it.sex || 0, (url) => {
                        if (!self._data) return false;
                        if (!self._data.player) return false;
                        if (!self._data.player[i]) return false;
                        if (url !== self._data.player[i].headurl) {
                            return false;
                        }
                        return true;
                    });
                    v.img_head.setVisible(true);
                    v.layout_player.setVisible(true);
                });
            }else{
                lodash.forEach(__player, (it: ITH_DATA_RECORD_PLAYER, i) => {
                    let v = this.playerItems[i];
                    // v.image_me.setVisible(uid == it.uid);
                    switch(self._data.player_tags[i]){
                        case 2:
                            v.image_me.setVisible(true);
                            v.image_me.loadTexture("btn_newRecord_mem_icon.png",ccui.Widget.PLIST_TEXTURE)
                        break;
                        case 1:
                            v.image_me.setVisible(true);
                            v.image_me.loadTexture("TH_newRecord_metag.png",ccui.Widget.PLIST_TEXTURE)
                        break;
                        case 0:
                            v.image_me.setVisible(false);
                    }
                    v.label_uname.setString(kaayou.Identify.nickNameSubByLength(it.nickname, 4, 4));
                    let sctext = it.score > 0 ? "+" + it.score : it.score.toString();
                    v.label_uscore.setString(sctext);
                    v.label_uscore.setTextColor(it.score > 0 ? cc.color("#ff4925") : cc.color("#008c07"));
                    //lw200629大赢家积分大于0
                    if (this._data.finishtype != 1) v.tag_winner.setVisible(it.score == maxScore && maxScore > 0);
                    NetImage.setPlayerHead(v.img_head, it.headurl, it.sex || 0, (url) => {
                        if (!self._data) return false;
                        if (!self._data.player) return false;
                        if (!self._data.player[i]) return false;
                        if (url !== self._data.player[i].headurl) {
                            return false;
                        }
                        return true;
                    });
                    v.img_head.setVisible(true);
                    v.layout_player.setVisible(true);
                });
            }
        }
    }

    export class SubRcCirclePage {
        btnClear: ccui.Button = null;
        iLike: number = 0;//0全部1点赞2未点赞
        iTime: number = 0;//时段筛选序号
        iDetailInterval: number = 0;
        iDetailRange: number = 0;
        lbLike: ccui.Text = null;
        lbLowGameCount: ccui.Text = null;
        lbLowGamePlayerCount: ccui.Text = null;
        lyTeahouseStatistics: ccui.Layout = null;

        scr_circle_record: common.PullList = null; //成员列表

        searchMgr: RecordSearchWidget = null;
        selectMgr: RecordSelectWidget = null;
        dateMgr: RecordDateWidget = null;
        bwuser: boolean = false;
        sortType: number = 0; //排序方式
        timetype: number = 0; //搜索时间
        label_innings: ccui.Text = null; //总局数
        lbGameCount: ccui.Text = null;//总积分
        label_invalidinnings: ccui.Text = null;//总大赢家
        lbPlayRound: ccui.Text = null;//今日人次
        iLowScore: number=0;
        roundtype: number = 0;

        //获取战绩列表数据 
        doGetRecordList(clear: boolean = true, timetype: number = 0, sorttype: number = -1, bwuser: boolean = false) {
            let self = this;
            self.sortType = sorttype;
            self.timetype = timetype;
            let search = self.searchMgr.getSearchString();
            self.iDetailInterval = 0;
            self.iDetailRange = 0;
            if (kaayou.TimeHelper.getLastIndex() != self.iTime) {
                self.iDetailInterval = mod.__teaHouseInfo.record_time_interval;
                self.iDetailRange = self.iTime;
            }
            kaayou.emit("tea", 'mod::Record::GetCircleRecordList',
                {
                    "dfid": self.selectMgr.getCurSelect(),
                    "selecttime": self.timetype,
                    "isUpdate": clear,
                    "searchkey": search,
                    bwuser: self.bwuser,
                    recordtype: 0,
                    likeflag: self.iLike,
                    timeInterval: self.iDetailInterval,
                    timeRange: self.iDetailRange + 1,
                    lowscoreflag:self.iLowScore,
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
            let { index, searchkeep } = _data;
            if (index == this.getIndex()) {
                if (this._page.isVisible()) {

                } else {
                    this.reset(searchkeep || false);
                }
                this._page.setVisible(true);
            } else {
                this._page.setVisible(false);
            }
        }
        _isInitPull = false;
        reset(searchkeep = false) {
            if (false == this._isInitPull) {
                this._isInitPull = true;
                this.scr_circle_record.initPullEnv();
            }

            if(/5|8/.test(tea.mod.__teaHouseInfo.urole.toString())){
                let json = (cc.sys.localStorage.getItem("tea::store::lowscorefilter") || "{}");
                    this.iLowScore = JSON.parse(json)[tea.mod.__teaHouseInfo.hid] || 0
                }else
                    this.iLowScore =0

            // this.resetTimeLine();
            let ctrName = "teaRC"
            // let timeChangeEventName = "ui::teaRC::time::change";
            this.btnClear.setVisible(false);
            this.searchMgr.setVisible(true);
            this.selectMgr.setVisible(true);
            this.searchMgr.setPlaceholder("房号/玩家ID");
            if (!searchkeep) {
                this.searchMgr.clearString();
            }
            this.selectMgr.setCurSelect(-1);
            this.dateMgr.setPage("Circle");
            this.dateMgr.setCurSelect(0);

            this.iTime = kaayou.TimeHelper.getLastIndex();

            this.scr_circle_record.getAdpter().datas = [];
            this.scr_circle_record.refresh();
            // kaayou.emit(ctrName, timeChangeEventName, { sortName: timeSortKeys[0], sortType: "desc" });

            this.doGetRecordList(true, timeSortKeys['0d']);

            this.scr_circle_record.getCells().forEach(v => {
                let img_zan: ccui.Widget = ccui.helper.seekWidgetByName(<any>v, "img_zan");
                img_zan.setVisible(true);
            });



        }

        layout_sort_group: ccui.Layout = null; // 排序块  tabSortGroup

        initSortNode(pageStat: cc.Node) {
            let self = this;
            let ctrName = "teaRC"
            // let timeChangeEventName = "ui::cirrc::time::change";
            let timeDoEventName = "do::teaRC::time::change";

            kaayou.getController(ctrName).on(timeDoEventName, (e: kaayou.Event) => {
                if (!this._page.isVisible()) { return; }
                self.iLike = 0;
                this.doGetRecordList(true, -this.dateMgr.getCurSelect(), this.sortType, this.bwuser);
            }, this);

        }


        private zan_count = 0;
        updateZanCount(dig) {
            this.zan_count = this.zan_count + ((+dig) || 0);
            this.zan_count = Math.max(0, this.zan_count);
            this.lbLike.setString(this.zan_count + "");
        }

        //初始化成员列表页面
        initWidthNode(page: cc.Node, searchMgr: RecordSearchWidget, selecthMgr: RecordSelectWidget, dateMgr: RecordDateWidget, cellMod: ccui.Widget, clearButton: ccui.Button , tip:ccui.Layout) {

            let self = this;
            this._page = page;
            this.btnClear = clearButton;
            this.searchMgr = searchMgr;
            this.selectMgr = selecthMgr;
            this.dateMgr = dateMgr;

            this.label_innings = ccui.helper.seekWidgetByName(<ccui.Widget>page, "label_innings");
            this.label_innings.setString("今日场次：0");
            this.lbGameCount = ccui.helper.seekWidgetByName(<ccui.Widget>page, "lbGameCount");
            this.lbGameCount.setString("完整场次：0");
            this.label_invalidinnings = ccui.helper.seekWidgetByName(<ccui.Widget>page, "label_invalidinnings");
            this.label_invalidinnings.setString("中途解散：0");
            this.lbPlayRound = ccui.helper.seekWidgetByName(<ccui.Widget>page, "lbPlayRound");
            this.lbPlayRound.setString("今日人次：0");
            this.lbLike = ccui.helper.seekWidgetByName(<ccui.Widget>page, "lbLike");
            this.lbLike.setString("已点赞：0");
            this.lbLowGameCount = ccui.helper.seekWidgetByName(<ccui.Widget>page, "lbLowGameCount");
            this.lbLowGameCount.setString("低分局：0");
            this.lbLowGamePlayerCount = ccui.helper.seekWidgetByName(<ccui.Widget>page, "lbLowGamePlayerCount");
            this.lbLowGamePlayerCount.setString("低分局人次：0");
            this.lyTeahouseStatistics = ccui.helper.seekWidgetByName(<ccui.Widget>page, "lyTeahouseStatistics");
            this.lyTeahouseStatistics.setPadding({ spacingX: 5 });
            this.lyTeahouseStatistics.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Horizontal);
            this.lyTeahouseStatistics.setHorizontal(ccui.Layout.LayoutHorizontal.LEFT);

            let ctrName = "teaRC";
            let subpageChangeEventName = "ui::record::SubpageChange";
            let onSearchEventName = "ui::record::onSearch";
            let onSelectEventName = "ui::record::onSelect";

            kaayou.getController(ctrName).on(subpageChangeEventName, this.onSubpageChange, this);


            kaayou.getController(ctrName).on('ui::State::UpdateQuanZanCount', (e: kaayou.Event) => {
                let { num } = e.data;
                this.updateZanCount(num);
            }, this)


            kaayou.getController(ctrName).on("ui::circletip::onShow",(e:kaayou.Event)=>{
                let data = e.data;                
                let {pos,dismiss_time,dismiss_type , dismiss_det} =data;
                
                let stext = kaayou.Template.tmpl(
                    "解散时间：<%=dismiss_time %>\\r\\n"+
                    "解散类型：<% switch(dismiss_type){case 0:break;%>"+
                             "<% case 1:%><%='圈主解散' %><%break;%>"+
                             "<% case 2:%><%='管理员解散' %><%break;%>"+
                             "<% case 3:%><%='队长解散' %><%break;%>"+
                             "<% case 4:%><%='申请解散' %><%break;%>"+
                             "<% case 5:%><%='超时解散' %><%break;%>"+
                             "<% case 6:%><%='托管解散' %><%break;%>"+
                             "<% case 7:%><%='离线解散' %><%break;%>"+
                             "<% }%>\\r\\n"+
                    "<%if(dismiss_det && dismiss_det.length>0){%>"+
                        "详情：\\r\\n<% var a =  dismiss_det.split(',');%>"+
                                "<% for(var i =1 ; i < a.length + 1 ; i++){%>"+
                                    "<%=a[i-1] +'\\t\\t'%>"+
                                    "<% if(i % 2==0){%><%='\\r\\n'%>"+
                                    "<%}%>"+
                                "<%}%>"+
                    "<%}%>"
                        ,{dismiss_time,dismiss_type , dismiss_det}
                    )

              

                let text = <ccui.Text>tip.getChildByName("text");
                tip.setVisible(true);
                text.setString(stext||"");
                tip.setPosition(pos);

                let base = kaayou.UIManager.getInstance().getMainScene();
                let mask = new ccui.Layout();
                mask.setTouchEnabled(true);
                mask.setAnchorPoint(0.5, 0.5);
                mask.setContentSize(cc.winSize.width * 2, cc.winSize.height * 2);
                mask.setPosition(cc.winSize.width * .5, cc.winSize.height * .5);
                base.addChild(mask,10000);
                
                mask.on(kaayou.TouchEvent.TouchEnd,()=>{
                    base.removeChild(mask,true);
                    tip.setVisible(false);
                },this)
                
            },this)


            this.initSortNode(page);
            this.scr_circle_record = new common.PullList();
            // this.scroll_member._debugRect = true;
            this.scr_circle_record.setSpacingY(8);
            this.scr_circle_record.initWithNode(<cc.Node>ccui.helper.seekWidgetByName(<ccui.Widget>page, "scr_circle_record"));
            this.scr_circle_record.setAdpter({
                getCell: () => {
                    let v = new TH_RecordQuanCell();
                    v.initWithNode(cellMod);
                    return v;
                },
                datas: []
            });

            this.scr_circle_record.on(kaayou.PullListEvent.HeadFinish, (e: kaayou.PullListEvent) => {
                let target = e.target;
                setTimeout(() => {
                    self.doGetRecordList(true, this.timetype, this.sortType)
                }, 500);

            }, this);
            this.scr_circle_record.on(kaayou.PullListEvent.FootFinish, (e: kaayou.PullListEvent) => {
                let target = e.target;
                setTimeout(() => {
                    self.doGetRecordList(false, this.timetype, this.sortType);
                }, 500);
            }, this);

            const UI_UpdateEventName = 'ui::Record::updateCircleRecordList';
            kaayou.getController('tea').on(UI_UpdateEventName, function (e: kaayou.Event) {
                if (!this._page.isVisible()) { return; }
                let result: { data: ITH_DATA_RECORD, update: boolean } = e.data
                if (result && result.data) {
                    let data = result.data;
                    for (let x in data.items) {
                        data.items[x].timeInterval = self.iDetailInterval;
                        data.items[x].timeRange = self.iDetailRange;
                    }
                    if (result.update) {
                        self.scr_circle_record.getAdpter().datas = lodash.clone(data.items || []);
                    }
                    self.label_innings.setString("" + (data.totalround || 0));
                    self.lbGameCount.setString("" + (data.completeround || 0));
                    self.label_invalidinnings.setString("" + (data.dismissround || 0));
                    self.lbPlayRound.setString("" + (data.playtimes || 0));
                    self.lbLike.setString("" + (data.totallike || 0));
                    self.lbLowGameCount.setString("" + ((data.invalidround) || 0));
                    self.lbLowGamePlayerCount.setString("" + ((data.invalidtimes) || 0));
                    self.zan_count = data.totallike;

                    let info = tea.mod.__teaHouseInfo
                    let urole = info.urole;
                    if (info.vice_partner || urole === HouseMemberRole.CAPTAIN) {
                        this.lbPlayRound.setVisible(true)
                        this.lbLowGamePlayerCount.setVisible(true);
                        this.label_innings.setVisible(false)
                        this.lbLowGameCount.setVisible(false);
                        self.lbGameCount.setPositionX(326);
                        self.label_invalidinnings.setPositionX(506);
                        self.lbLike.setPositionX(839);


                    } else if (info.isvitamin || urole === HouseMemberRole.CPADMIN || urole === HouseMemberRole.OWNER || urole === HouseMemberRole.ADMIN) {
                        this.lbPlayRound.setVisible(false)
                        this.lbLowGamePlayerCount.setVisible(false);
                        this.label_innings.setVisible(true)
                        this.lbLowGameCount.setVisible(true);
                        self.lbGameCount.setPositionX(308);
                        self.label_invalidinnings.setPositionX(502);
                        self.lbLike.setPositionX(776);
                    }
                    this.lbGameCount.setVisible(true);
                    this.label_invalidinnings.setVisible(true);
                    this.lbLike.setVisible(true);
                    // this.lyTeahouseStatistics.doChildrenLayout();
                } else {
                    self.scr_circle_record.getAdpter().datas = [];
                }
                resizelabelbg()
                self.scr_circle_record.refresh();
                self.scr_circle_record.getCells().forEach((v: any) => {
                    v.injectTimeType(self.timetype)
                })
            }, this, 10);


            function resizelabelbg(){
                
                let lbs = [self.lbGameCount , self.label_invalidinnings , self.lbLowGameCount]
                if(/5|8/.test(tea.mod.__teaHouseInfo.urole.toString()) || tea.mod.__teaHouseInfo.vice_partner) {
                    lbs = [self.lbGameCount , self.label_invalidinnings , self.lbLowGamePlayerCount]
                }
                let fixs = lbs.map(v=>{let text  = <ccui.Text> v.getChildByName("Text");return text.getCustomSize().width})
                let bgs = lbs.map(v=>v.getChildByName("bg"));

                bgs.forEach((v,i)=>{
                    v.width = fixs[i]+ (lbs[i].string.length+1)*16
                })

            }

            kaayou.getController(ctrName).on(onSelectEventName, (e: kaayou.Event) => {
                if (!this._page.isVisible()) { return; }
                this.doGetRecordList(true, this.timetype, this.sortType, this.bwuser)
                const daytype = this.selectMgr.getCurSelect()
                this.scr_circle_record.getCells().forEach(v => {
                    let img_zan: ccui.Widget = ccui.helper.seekWidgetByName(<any>v, "img_zan");
                    img_zan.setVisible(daytype === -1);
                });
            }, this, 10);

            kaayou.getController(ctrName).on(onSearchEventName, (e: kaayou.Event) => {
                if (!this._page.isVisible()) { return; }
                let search = this.searchMgr.getSearchString();
                if (/^\d+$/.test(search) === false && search.length === 0) {
                    this.bwuser = false;
                }
                this.doGetRecordList(true, this.timetype, this.sortType, this.bwuser)
            }, this, 10);

            kaayou.getController('tea').on('ui::TimeFliter::Submit', function (e: kaayou.Event) {
                if (!this._page.isVisible()) { return; }
                self.iTime = e.data.iTime;
                self.iLike = e.data.iLike;
                self.iLowScore = e.data.iLowScore;
                self.roundtype = e.data.iType

                let lbs = [self.lbGameCount , self.label_invalidinnings , self.lbLowGameCount]
                if(/5|8/.test(tea.mod.__teaHouseInfo.urole.toString()) || tea.mod.__teaHouseInfo.vice_partner) {
                    lbs = [self.lbGameCount , self.label_invalidinnings , self.lbLowGamePlayerCount]
                }

                let bgs = lbs.map(v=>v.getChildByName("bg"));                
                bgs.forEach(v=>v.setVisible(false))
                switch(e.data.iType){
                    case 1:
                    case "1":
                        // bgs[0].width =fixs[0]+ (self.lbGameCount.string.length+1)*16
                        bgs[0].setVisible(true)
                    break;
                    case 2:
                    case "2":
                        // bgs[1].width =fixs[1]+ (self.label_invalidinnings.string.length+1)*16
                        bgs[1].setVisible(true)
                    break;
                    case 3:
                    case "3":
                        // bgs[2].width =fixs[2]+ (self.lbLowGameCount.string.length+1)*16
                        bgs[2].setVisible(true)
                    break;
                    
                }
                self.doGetRecordList(true, self.timetype, self.sortType, self.bwuser);
            }, this, 10);
        }
    }
}