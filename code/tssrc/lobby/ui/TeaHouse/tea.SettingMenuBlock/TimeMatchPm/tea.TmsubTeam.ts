//无盟模式

namespace tea {

    //全部数字除100
    interface Data_HousePartnerNoUnionItem {
        "uid": number;
        "uname": string;
        "uurl": string;
        "ugender": number,
        "changeprofit": number,
        "bwtimes": number,
    }

    class pmMatch_cell extends kaayou.Block implements common.IPullListCell {

        private img_head: ccui.ImageView = null;
        private label_name: ccui.Text = null;
        private label_id: ccui.Text = null;
        private label_change: ccui.Text = null;
        private label_bwtimes: ccui.Text = null;
        private pm_img:ccui.ImageView = null;
        private pm_notThree:ccui.Layout = null;
        private pm_index:ccui.TextBMFont = null;

        initWithNode(node: ccui.Widget) {
            let self = this;
            super.initWithNode(node);

            this.setAnchorPoint(0, 0);
            this.setPosition(0, 0);

            let headBG = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "HeadBg");
            this.img_head = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "img_head");
            this.label_name = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_name");
            this.label_id = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_id");
            this.label_change = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_change");
            this.label_bwtimes = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_winner");
            this.pm_img = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "pmIndex_img");
            this.pm_notThree = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "indexLayout");
            this.pm_notThree.setVisible(false);
            this.pm_index = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "pmIndex_label");
        }

        reset() {
            this.label_name.setString("");
            this.label_id.setString("");
            this.label_change.setString("");
            this.label_bwtimes.setString("");
            this.pm_notThree.setVisible(false);
        }

    
        private isPartnerSelf: boolean = false;

        isPartner() {
            return tea.mod.__teaHouseInfo.urole === HouseMemberRole.CAPTAIN;
        }



        private isVitaAdmin() {
            return tea.mod.__teaHouseInfo.vitamin_admin === true || tea.mod.__teaHouseInfo.urole === HouseMemberRole.CPADMIN;
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


        setInfo(data: Data_HouseMemberStatItem) {

            if (lodash.isEmpty(data) || lodash.isNull(data)) {
                return this.reset();
            }
            this.isPartnerSelf = data.uid === tea.mod.__teaHouseInfo.uid;
            this.label_name.setString(data.uname);
            this.label_id.setString(data.uid.toString());

            if (this.queryinfo.prizeArr.length >= data.rankIndex ) {
                this.label_bwtimes.setString(""+this.queryinfo.prizeArr[data.rankIndex-1]+"奖杯");
            }else{
                this.label_bwtimes.setString("");
            }
            this.label_change.setString(""+data.totalscore);

            NetImage.setPlayerHead(this.img_head, data.uurl, data.ugender, (url) => {
                if (!data) { return false; }
                if (url !== data.uurl) {
                    return false;
                }
                return true;
            });
            this.pm_notThree.setVisible(data.rankIndex>3);
            this.pm_img.setVisible(data.rankIndex < 4);
            if (data.rankIndex < 4 ) {
                this.pm_img.loadTexture("TH_timeMatchpm_"+data.rankIndex+".png",ccui.Widget.PLIST_TEXTURE);
            }
            this.pm_index.setString(""+data.rankIndex);
        }

        private queryinfo:{ daytype:number, fid: number ,searchkey:string,prizeArr:Array<number> } = null;
        setQueryArgs(q){
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
        const timeSortKeys1 = {
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

    export class Pm_subTeamPanel {

        selectMgr: MemberSelectWidget = null
        searchMgr: MemSearchWidget = null;
        cellMod: ccui.Widget = null;
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

        reset(){
            let ctrName = "tea_Pm";
            let timeChangeEventName = "ui::teamPm::time::change";
           this.resetTimeLine(); 
           this.SV_pullList.getAdpter().datas = [];
           this.SV_pullList.refresh();
           kaayou.emit(ctrName, timeChangeEventName, { sortName: timeSortKeys[0]});
        }


        resetTimeLine() {
            lodash.forEach(this.layout_time_group.getChildren(), (v: ccui.Layout, i: number) => {
                if (i == 0) (<ccui.Text>v.getChildByName("time")).setString('今天');
                else if (i == 1) (<ccui.Text>v.getChildByName("time")).setString('昨天');
                else if (i == 2) (<ccui.Text>v.getChildByName("time")).setString('三日累计');
                else if (i == 3) (<ccui.Text>v.getChildByName("time")).setString('七日累计');
                else (<ccui.Text>v.getChildByName("time")).setString( new Date(this.subDayTime(i)).Format("MM-dd"));
            });
        }
        subDayTime(sd: number = 0) {
            let todayStr = Date.format("yyyy-MM-dd")
            let todayTime = Math.floor(new Date(todayStr).getTime() / 1000);
            todayTime -= sd * 24 * 60 * 60;
            console.log(todayTime)
            return todayTime * 1000;
        }

        timeType: number = 0;

        layout_time_group: cc.Node = null;
        ScrollView_Detail: ccui.ScrollView = null;
        SV_pullList: common.PullList = null;
        _fid: number = 0;
        _prizeArr = [];
        private daytypeRecord = 0;
        initWithNode(pageMine: cc.Node, searchMgr: MemSearchWidget, cellMod: ccui.Widget) {
            let self = this;
            pageMine.setPosition(0, 0);
            this._page = pageMine;
            this.searchMgr = searchMgr;
            this.cellMod = cellMod//
            this.ScrollView_Detail = ccui.helper.seekWidgetByName(<ccui.Widget>this._page, "ScrollView_Detail");
            this.searchMgr.clearString();

            kaayou.getController('teaMem').on('ui::TimeMatchPmPanel::Search', function (e: kaayou.Event) {
                if (self._page.isVisible()) {
                    self.pullList(true, self.timeType);
                }
            }, this, 10);

            kaayou.getController('teaMem').on('ui::TimeMatchPmPanel::SubpageChange', this.onSubpageChange, this);

            this.initFilter();

            this.SV_pullList = new common.PullList()
            this.SV_pullList.setSpacingY(10)
            this.SV_pullList.initWithNode(this.ScrollView_Detail)
            this.SV_pullList.setAdpter({
                getCell: () => {
                    let item = new pmMatch_cell();
                    let searchkey = this.searchMgr.getSearchString();
                    let fid = this.selectMgr.getCurSelect();
                    let daytype = this.timeType
                    let prizeArr = this._prizeArr;
                    item.initWithNode(self.cellMod);
                    item.setQueryArgs({ daytype, fid ,searchkey,prizeArr})
                    
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


            kaayou.getController('tea').on('ui::TimeMatch::TeamRank', function (e: kaayou.Event) {
                if (!self._page.isVisible()) { return; }
                let data: { list,prizeArr ,update: boolean } = e.data
                self._prizeArr = data.prizeArr;
                if (data) {
                    if (data.update) {
                        self.SV_pullList.getAdpter().datas = lodash.clone(data.list);
                    }
                } else {
                    self.SV_pullList.getAdpter().datas = [];
                }
                self.reflashQueryInfo();
                self.SV_pullList.refresh();
            }, this, 20);

            this.SV_pullList.initPullEnv();
        }

        private reflashQueryInfo(){
            let searchkey = this.searchMgr.getSearchString();
            let fid = this.selectMgr.getCurSelect();
            let daytype = this.timeType;
            let prizeArr = this._prizeArr;
            this.SV_pullList.getCells().forEach((v:pmMatch_cell)=>{
                v.setQueryArgs({ daytype, fid ,searchkey,prizeArr});
            })
        }
        private initFilter() {
            let self = this;
            //时间参数修改
            let ctrName = "tea_Pm";
            let timeChangeEventName = "ui::teamPm::time::change";
            let timeDoEventName = "do::memPm::time::change";
            this.layout_time_group = ccui.helper.seekWidgetByName(<ccui.Widget>this._page, "time_group");

            lodash.forEach(this.layout_time_group.getChildren(), (v: ccui.Layout, i: number) => {
                v["sortName"] = timeSortKeys[i];
                v.on(kaayou.TouchEvent.TouchEnd, (e: kaayou.TouchEvent) => {
                    let tagert = e.target;
                    let sortName = tagert.sortName;
                   
                    kaayou.emit(ctrName, timeChangeEventName, { sortName });
                    kaayou.emit(ctrName, timeDoEventName, { sortName });
                }, this)
                v['updateByType'] = function (name) {
                    if (this.sortName != name) {
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
                    let { sortName } = _data;
                    if (this.sortName == sortName) {
                        
                        self.pullList(true, timeSortKeys[sortName]);
                    }
                    this.updateByType(sortName);
                }
                kaayou.getController(ctrName).on(timeChangeEventName, v['onTimeChange'], v);
            });


            //楼层插件
            this.selectMgr = new MemberSelectWidget();
            this.selectMgr.initWidthNode(ccui.helper.seekWidgetByName(<ccui.Widget>self._page, "selectR_layout"), self._page, () => {
                //this.pullList(true, this.timeType);
            });

        }


        async pullList(clear: boolean = true, timetype: number = -1) {
            if (!tea.mod.__teaHouseInfo) {
                return;
            }
            this.timeType = timetype
            let search = this.searchMgr.getSearchString();
            console.log("需要去掉调用刷新");
            //let findex = this.selectMgr.getCurSelect();
           
           //dfid: number, param: string, daytype: number, sorttype: number, clear: boolean, partner: number,group_id:number
          // param: string, daytype: number, sorttype: number, clear: boolean, dfid: number
          if (this.isOwner() || this.isVTadmin()) {
           kaayou.emit("tea", 'mod::TeaHouse::GetTeamRankList',{dfid:-1,param:search,daytype:this.timeType,sorttype:4,clear:clear}); 
          }else{
              let uid = lobby.mod.User.getInstance().getUserInfo().uid
            kaayou.emit("tea", 'mod::House::GetTMmineRank',{dfid:-1,param:search,daytype:this.timeType,sorttype:4,clear:clear,partner:uid});
          }
        }
        //裁判
        isVTadmin() {
            
            return tea.mod.__teaHouseInfo.vitamin_admin;
        }
        //圈主
        isOwner() {
            let role = tea.mod.__teaHouseInfo.urole;
            return role === HouseMemberRole.OWNER;
        }

    }

}