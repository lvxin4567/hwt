//我的战绩
/// <reference path="tea.RecordSearchWidget.ts" />
/// <reference path="tea.RecordSelectWidget.ts" />
namespace tea {
    interface ITH_RECORD_CELL_PLAYER {
        layout_player: ccui.Layout, //玩家块本身
        img_head: ccui.ImageView, //头像
        tag_winner: ccui.ImageView,//大赢家标签
        label_uname: ccui.Text,//用户名
        label_uscore: ccui.Text,//积分
        image_me: ccui.ImageView //自己头部
    }

    export class TH_RecordCell extends kaayou.Block implements common.IPullListCell {
        
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
            this.img_zan.setVisible(false)

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

            this.btn_dishint.on(kaayou.TouchEvent.TouchEnd,()=>{
                let pos;
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit("teaRC","ui::tip::onShow",{
                    pos:(pos = this.btn_dishint.getWorldPosition(),pos.y+=16,pos),
                })
            },this)
            this.btn_dishint.setVisible(false);
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
                //this.btn_dishint.setVisible(true)
            } else if (this._data.finishtype == 2) {
                this.label_diss.setString("中途解散");
                this.label_diss.setTextColor(cc.color("#E07405"));
                //this.btn_dishint.setVisible(true)
            }
            this.btn_detail.setVisible(true);
            this.setPlayerInfo();
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
            lodash.forEach(__player, (it: ITH_DATA_RECORD_PLAYER, i) => {
                let v = this.playerItems[i];

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

                // if(uid==it.uid){
                //     v.image_me.setVisible(true);
                //     v.image_me.loadTexture("TH_newRecord_metag.png",ccui.Widget.PLIST_TEXTURE)
                //     // v.image_me.loadTexture("btn_newRecord_mem_icon.png",ccui.Widget.PLIST_TEXTURE)
                // }else{
                //     v.image_me.setVisible(false);
                // }

                v.label_uname.setString(kaayou.Identify.nickNameSubByLength(it.nickname, 4, 4));
                let sctext = it.score > 0 ? "+" + it.score : it.score.toString();
                v.label_uscore.setString(sctext);
                v.label_uscore.setTextColor(it.score > 0 ? cc.color("#ff4925") : cc.color("#008c07"));
                //lw200629大赢家分数大于0
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

    export class SubRcMinePage {
        btnClear: ccui.Button = null;
        iTime: number = 0;//时段筛选序号
        scr_mine_record: common.PullList = null; //成员列表
        searchMgr: RecordSearchWidget = null;
        selectMgr: RecordSelectWidget = null;
        dateMgr: RecordDateWidget = null;
        sortType: number = 0; //排序方式
        timetype: number = 0; //搜索时间
        label_innings: ccui.Text = null; //总局数
        label_score: ccui.Text = null;//总积分
        label_winner: ccui.Text = null;//总大赢家
        lbNothing: ccui.Text = null;    //无战绩
        roundtype = 0;

        //获取战绩列表数据 
        doGetRecordList(clear: boolean = true, timetype: number = 0, sorttype: number = -1) {
            let self = this;
            self.sortType = sorttype;
            self.timetype = timetype;
            let search = this.searchMgr.getSearchString();
            let timeInterval = 0;
            let timeRange = 0;
            if (kaayou.TimeHelper.getLastIndex() != this.iTime) {
                timeInterval = mod.__teaHouseInfo.record_time_interval;
                timeRange = this.iTime;
            }
            kaayou.emit("tea", 'mod::Record::GetMineRecordList',
                {
                    "dfid": this.selectMgr.getCurSelect(),
                    "selecttime": self.timetype,
                    "isUpdate": clear,
                    "searchkey": search,
                    timeInterval: timeInterval,
                    timeRange: timeRange + 1
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
                this.scr_mine_record.initPullEnv();
            }
            let ctrName = "teaRC"
            this.btnClear.setVisible(false);
            this.searchMgr.setVisible(true);
            this.selectMgr.setVisible(true);
            this.searchMgr.setPlaceholder("房号/玩家ID");
            this.searchMgr.clearString();
            this.selectMgr.setCurSelect(-1);
            this.scr_mine_record.getAdpter().datas = [];
            this.scr_mine_record.refresh();
            this.dateMgr.setPage("Mine");
            this.dateMgr.setCurSelect(0);

            this.iTime = kaayou.TimeHelper.getLastIndex();
            this.doGetRecordList(true, timeSortKeys['0d']);
        }

        initSortNode(page: cc.Node) {
            let self = this;
            let ctrName = "teaRC"
            let timeDoEventName = "do::teaRC::time::change";

            kaayou.getController(ctrName).on(timeDoEventName, (e: kaayou.Event) => {
                if (!this._page.isVisible()) { return; }

                this.doGetRecordList(true, -this.dateMgr.getCurSelect(), this.sortType);
            }, this);
        }

        //初始化成员列表页面
        initWidthNode(page: cc.Node, searchMgr: RecordSearchWidget, selecthMgr: RecordSelectWidget, dateMgr: RecordDateWidget, cellMod: ccui.Widget, clearButton: ccui.Button , tip:ccui.Layout) {

            let self = this;
            this._page = page;
            this.btnClear = clearButton;
            this.searchMgr = searchMgr;
            this.selectMgr = selecthMgr;
            this.dateMgr = dateMgr;

            this.lbNothing = ccui.helper.seekWidgetByName(<ccui.Widget>page, "lbNothing");

            this.label_innings = ccui.helper.seekWidgetByName(<ccui.Widget>page, "label_innings");
            this.label_innings.setString("牌局数：0");
            this.label_score = ccui.helper.seekWidgetByName(<ccui.Widget>page, "label_score");
            this.label_score.setString("积分数：0");
            this.label_winner = ccui.helper.seekWidgetByName(<ccui.Widget>page, "label_winner");
            this.label_winner.setString("大赢家：0");


            let ctrName = "teaRC"
            let subpageChangeEventName = "ui::record::SubpageChange";
            let onSearchEventName = "ui::record::onSearch";
            let onSelectEventName = "ui::record::onSelect";

            kaayou.getController(ctrName).on("ui::tip::onShow",(e:kaayou.Event)=>{
                let data = e.data;                
                let pos =data.pos;
                let text = <ccui.Text>tip.getChildByName("text");
                tip.setVisible(true);
                text.setString(data.text||"");
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

            kaayou.getController(ctrName).on(subpageChangeEventName, this.onSubpageChange, this);

            this.initSortNode(page);
            this.scr_mine_record = new common.PullList();
            this.scr_mine_record.setSpacingY(8);
            this.scr_mine_record.initWithNode(<cc.Node>ccui.helper.seekWidgetByName(<ccui.Widget>page, "scr_mine_record"));
            this.scr_mine_record.setAdpter({
                getCell: () => {
                    let v = new TH_RecordCell();
                    v.initWithNode(cellMod);
                    return v;
                },
                datas: []
            });

            this.scr_mine_record.on(kaayou.PullListEvent.HeadFinish, (e: kaayou.PullListEvent) => {
                let target = e.target;
                setTimeout(() => {
                    this.doGetRecordList(true, this.timetype, this.sortType)
                }, 500);

            }, this);
            this.scr_mine_record.on(kaayou.PullListEvent.FootFinish, (e: kaayou.PullListEvent) => {
                let target = e.target;
                setTimeout(() => {
                    this.doGetRecordList(false, this.timetype, this.sortType)
                }, 500);
            }, this);
            kaayou.getController('tea').on('ui::Record::updateMineRecordList', function (e: kaayou.Event) {
                if (!this._page.isVisible()) { return; }
                let result: { data: ITH_DATA_RECORD, update: boolean } = e.data
                if (result && result.data) {
                    let data = result.data;
                    self.lbNothing.setVisible(data.items.length == 0);
                    if (result.update) {
                        data.items.forEach(v => {
                            v.daytype = this.daytype;
                        })
                        self.scr_mine_record.getAdpter().datas = lodash.clone(data.items || []);
                    }
                    self.label_innings.setString("" + (data.totalround || 0));
                    self.label_score.setString("" + (data.totalscore || 0));
                    self.label_winner.setString("" + (data.totalbwtimes || 0));
                } else {
                    self.scr_mine_record.getAdpter().datas = [];
                }
                self.scr_mine_record.refresh();
            }, this, 10);

            kaayou.getController(ctrName).on(onSelectEventName, (e: kaayou.Event) => {
                if (!this._page.isVisible()) { return; }
                self.doGetRecordList(true, this.timetype, this.sortType)
            }, this, 10);

            kaayou.getController(ctrName).on(onSearchEventName, (e: kaayou.Event) => {
                if (!this._page.isVisible()) { return; }
                self.doGetRecordList(true, this.timetype, this.sortType)
            }, this, 10);

            kaayou.getController('tea').on('ui::TimeFliter::Submit', function (e: kaayou.Event) {
                if (!this._page.isVisible()) { return; }
                self.iTime = e.data.iTime;
                self.roundtype = e.data.iType
                self.doGetRecordList(true, self.timetype, self.sortType);
            }, this, 10);
        }
    }
}