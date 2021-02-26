//团队统计-查看-队员详情
namespace tea {
    var { BindEvent, doBindEvent } = kaayou._decorator;

    interface Data_NoAllianceInfoItem {
        "uid": number;
        "uname": string;
        "uurl": string;
        "ugender": number;
        "playtimes": number;
        "changeprofit": number;
        "invalidtimes": number;
        "bwtimes": number;
        daytype: number;
        timeInterval: number;
        timeIndex: number;
    }

    const paramSortKeys = {
        0: 0,
        1: "totalSort",
        2: "roundSort",
        3: "lowscoreSort",
        4: "bigwinSort",
        "lowscoreSort_asc": 7,
        "lowscoreSort_desc": 6,
        "totalSort_asc": 4,
        "totalSort_desc": 5,
        "roundSort_asc": 1,
        "roundSort_desc": 0,
        "bigwinSort_asc": 3,
        "bigwinSort_desc": 2
    };

    export class tea_RecordNoAllianceInfoDialogMgr {
        static __INS__: tea_RecordNoAllianceInfoDialogMgr = null;
        static getInstance(_zOrder: number = 0) {
            if (tea_RecordNoAllianceInfoDialogMgr.__INS__ == null) {
                tea_RecordNoAllianceInfoDialogMgr.__INS__ = new tea_RecordNoAllianceInfoDialogMgr();
                tea_RecordNoAllianceInfoDialogMgr.__INS__.init();
                tea_RecordNoAllianceInfoDialogMgr.__INS__._zOrder = _zOrder
            }
            return tea_RecordNoAllianceInfoDialogMgr.__INS__;
        }
        _zOrder: number = 0
        __selfDialog: RecodNoAllianceInfoDialog = null

        init() {
            let self = this;
            this.__selfDialog = null;

            kaayou.getController('tea').on('ui::RecordNoAllianceInfoDialog::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show(e.data);
            }, this, 10);

            kaayou.getController('tea').on('ui::RecordNoAllianceInfoDialog::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfDialog == null) {
                this.__selfDialog = new RecodNoAllianceInfoDialog();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfDialog, this._zOrder);
                this.__selfDialog['onConfigUpdate'] && this.__selfDialog['onConfigUpdate']();
            }
            return this.__selfDialog;
        }

    }

    class RecodNoAllianceInfoDialog extends kaayou.Layer {

        

        constructor() {
            super()
            this.initUI();
        }
        private iTime: number = 0;
        private iTimeInterval: number = 0;
        private lbCaptain: ccui.Text = null;
        private listNode: ccui.ScrollView = null;
        private closeNode: ccui.Button = null;
        private item: ccui.Widget = null;
        private SV_pullList: common.PullList = null;
        private label_time: ccui.Text = null;
        private btn_selectDate: ccui.Button = null;
        private dateSelect_Layout: ccui.Layout = null;
        private date_layout: ccui.Layout = null;
        private date_close: ccui.Layout = null;
        edit_searchRed: any = null;
        private search_btn: ccui.Button = null;
        iLowScore: number = 0;
        private btn_totalrecord: ccui.Layout;
        private btn_round: ccui.Layout;
        private btn_lowscore: ccui.Layout;
        private btn_bigwin: ccui.Layout;

        partnerLayout: ccui.Layout = null;

        initUI() {
            this.initWithccs(tea.res.TH_RecordNoAllianceInfoDialog_json)

            this.listNode = <ccui.ScrollView>((<ccui.Layout>ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "memberlist")).getChildByName("content"));
            this.listNode.setPadding({ left: 10, spacingY: 10, top: 10 });
            this.listNode.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Vertical);
            this.listNode.setVertical(ccui.Layout.LayoutVertical.TOP);
            this.item = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "tea_call_info_item");
            this.closeNode = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_close");
            this.label_time = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_time");
            this.btn_selectDate = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_selectDay");
            this.dateSelect_Layout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "dateSelect_Layout");
            this.date_layout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "date_layout");
            this.date_layout.setVisible(false);
            this.date_close = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "date_close");
            this.search_btn = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "search_btn");
            this.partnerLayout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "catain_layout");
            this.lbCaptain = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "lbCaptain");
            let self = this;
            this.SV_pullList = new common.PullList()
            this.SV_pullList.setSpacingY(10)
            this.SV_pullList.initWithNode(this.listNode)
            this.SV_pullList.setAdpter({
                getCell: () => {
                    let item = new RecordNoAllianceInfoDialogItem();
                    item.initUI(self.item);
                    return item;
                },
                datas: []
            });

            this.SV_pullList.on(kaayou.PullListEvent.HeadFinish, (e: kaayou.PullListEvent) => {
                setTimeout(() => {
                    self.pagePrev();
                }, 300);
            }, this);

            this.SV_pullList.on(kaayou.PullListEvent.FootFinish, (e: kaayou.PullListEvent) => {
                setTimeout(() => {
                    self.pageNext();
                }, 300);
            }, this);

            this.closeNode.on(kaayou.TouchEvent.TouchEnd, () => {
                this.Hide();
            }, this)

            this.btn_selectDate.on(kaayou.TouchEvent.TouchEnd, () => {
                self.date_layout.setVisible(true);
                self.date_close.setVisible(true);
            }, this)

            this.date_close.on(kaayou.TouchEvent.TouchEnd, () => {
                self.date_layout.setVisible(false);
                self.date_close.setVisible(false);
            }, this)

            this.search_btn.on(kaayou.TouchEvent.TouchEnd, () => {
                self.cleanList();
                self.index = 0;
                self.PBegin = 0;
                self.PEnd = self.page;
                self.searchkey = self.edit_searchRed.getString();
                self.query();
            }, this)


            let attr = {
                "fontSize": 26,
                "fontColor": "#B97D55",
                "setInputMode": 6,
                "setMaxLength": 20,
                "setPlaceholderFontSize": 26,
            };
            this.edit_searchRed = kaayou.editBox.attachTextEdit(this.node, "search_text", "输入玩家ID", null, attr);



            lodash.forEach(this.dateSelect_Layout.getChildren(), (v: ccui.Layout, index: number) => {
                v["_index"] = index;
                v.on(kaayou.TouchEvent.TouchEnd, (e: kaayou.TouchEvent) => {
                    let l: ccui.Layout = e.target;
                    self.date_layout.setVisible(false);
                    self.date_close.setVisible(false);
                    let _index = l["_index"];
                    self.index = 0;
                    self.PBegin = 0;
                    self.PEnd = self.page;
                    self.cleanList();
                    self.label_time.setString((<ccui.Text>v.getChildByName("time")).getString());
                    self.daytype = -Number(index);
                    self.query();
                }, this);
            })

            this.SV_pullList.initPullEnv();

            this.SV_pullList.setHeadDoingText("上一页")
            this.SV_pullList.setHeadDidFinishText("上一页")
            this.SV_pullList.setFootDidFinishText("下一页")
            this.SV_pullList.setFootDoingText("下一页")


            this.btn_totalrecord = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_totalrecord");
            this.btn_round = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_round");
            this.btn_lowscore = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_lowscore");
            this.btn_bigwin = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_bigwin");

            this.initSortComponent("totalSort",this.btn_totalrecord)
            this.initSortComponent("roundSort",this.btn_round)
            this.initSortComponent("lowscoreSort",this.btn_lowscore)
            this.initSortComponent("bigwinSort",this.btn_bigwin)
        }

        private totalSort = 2
        private roundSort = 0
        private lowscoreSort = 0
        private bigwinSort = 0
        // private sorttype = 4;//默认分数降序
        private cleanSortState(op:string){

            ["totalSort","roundSort","lowscoreSort","bigwinSort"].forEach(v=>{
                this[v] = 0;
            })

            
            if(op!="totalSort"){
                cleanSortComponent(this.btn_totalrecord)
                this._state["totalSort"]=0;
            }

            if(op!="roundSort"){
                cleanSortComponent(this.btn_round)
                this._state["roundSort"]=0;
            }

            if(op!="lowscoreSort"){
                cleanSortComponent(this.btn_lowscore)
                this._state["lowscoreSort"]=0;
            }

            if(op!="bigwinSort"){
                cleanSortComponent(this.btn_bigwin)
                this._state["bigwinSort"]=0;
            }

            function cleanSortComponent(comp:ccui.Layout){
                let up:ccui.Layout = ccui.helper.seekWidgetByName(<ccui.Widget>comp, "up");
                let down:ccui.Layout = ccui.helper.seekWidgetByName(<ccui.Widget>comp, "down");
                let cbdesc = <ccui.CheckBox>up.getChildByName("cbdesc");
                let cbasc = <ccui.CheckBox>down.getChildByName("cbasc");
                cbasc.setSelected(false)
                cbdesc.setSelected(false)
                
            }
        }

        
        private _state = {"totalSort":2,"roundSort":0,"lowscoreSort":0,"bigwinSort":0}
        private initSortComponent(key:string , comp:ccui.Layout){

            let up:ccui.Layout = ccui.helper.seekWidgetByName(<ccui.Widget>comp, "up");
            let down:ccui.Layout = ccui.helper.seekWidgetByName(<ccui.Widget>comp, "down");
            let cbdesc = <ccui.CheckBox>up.getChildByName("cbdesc");
            let cbasc = <ccui.CheckBox>down.getChildByName("cbasc");
            
            up.on(kaayou.TouchEvent.TouchEnd, () => {
                this.cleanSortState(key)
                if(cbdesc.isSelected()){
                    cbdesc.setSelected(false);
                    this._state[key] = this[key] = 0;
                    this.query()
                    return;
                }

                cbdesc.setSelected(true);
                this._state[key] = this[key] = 2;//2是从

                if(cbdesc.isSelected()){
                    cbasc.setSelected(false);
                }
                this.query()

            }, this);

            down.on(kaayou.TouchEvent.TouchEnd, () => {
                this.cleanSortState(key)
                if(cbasc.isSelected()){
                    cbasc.setSelected(false);
                    this._state[key] = this[key] = 0;
                    this.query()
                    return;
                }

                cbasc.setSelected(true);
                this._state[key] = this[key] = 1;

                if(cbasc.isSelected()){
                    cbdesc.setSelected(false);
                }
                this.query()
            }, this);

            comp.on(kaayou.TouchEvent.TouchEnd, () => {
                this.cleanSortState(key);

                if(this._state[key]===0){
                    this._state[key]=this[key]=1;
                    cbasc.setSelected(true);
                }else if(this._state[key]===1){
                    this._state[key]=this[key]=2;
                    cbdesc.setSelected(true);
                    cbasc.setSelected(false);
                }else if(this._state[key]===2){
                    this._state[key]=this[key]=1;
                    cbdesc.setSelected(false);
                    cbasc.setSelected(true);
                    
                }

                this.query();


            },this);

            //这个版本暂时隐藏
            // up.setVisible(false);
            // down.setVisible(false);
        }


        cleanList() {
            this.SV_pullList.getAdpter().datas = []
            this.SV_pullList.refresh();
        }

        private getSortType(){
            let list =   ["totalSort","roundSort","lowscoreSort","bigwinSort"]

            if(!list.some(v=>this[v]>0))
                return paramSortKeys[0]

            let res = list.filter(v=>this[v]>0).map(v=>({key:v,val:this[v]}));
                
            let kv = res.pop();

            return paramSortKeys[`${kv.key}_${kv.val===1?"desc":"asc"}` ]

        }

        private async query() {
            let self = this;
            let hid = tea.mod.__teaHouseInfo.hid;

            let { partner, daytype, fid, searchkey, PBegin, PEnd } = this;

            let data = await kaayou.sendMessage("lobby", "housenoleaguedetailstatistics", {
                hid, partner, daytype, fid, searchkey, PBegin, PEnd,
                querytimeinterval: self.iTimeInterval,
                querytimerange: self.iTime + 1,
                lowscoreflag:this.iLowScore,
                sorttype:this.getSortType()
            }, "ws::Msg::housenoleaguedetailstatistics");

            if (data.errcode) {
                kaayou.emit('common', 'ui::Dialog::Show', {
                    msg: data.msg || "获取用户信息失败!"
                })
                return;
            }

            if (!data.items)
                data.items = []


            if (data.items.length == 0) {
                if (this.index !== 0)
                    this.index--;
            } else {
                lodash.forEach(data.items, function (v) {
                    v.daytype = daytype;
                    v.timeInterval = self.iTimeInterval;
                    v.timeIndex = self.iTime;
                });
                this.SV_pullList.getAdpter().datas = lodash.clone(data.items);
            }
            (<ccui.Text>this.partnerLayout.getChildByName("label_memNum")).setString(`组员:${data.total}人`);
            this.SV_pullList.refresh();


        }

        private pagePrev() {
            const i = this.index = Math.max(0, --this.index);
            this.PBegin = i * this.page;
            this.PEnd = (i + 1) * this.page;
            this.query();
        }


        private pageNext() {
            const i = ++this.index;
            this.PBegin = i * this.page;
            this.PEnd = (i + 1) * this.page;
            this.query();
        }

        private partner = null;
        private daytype = null;
        private fid = null;
        private searchkey = null;
        private PBegin: number = 0;
        private PEnd: number = 0;
        private index: number = 0;
        private page: number = 10;
        private info = null;
        Show({ partner, daytype, fid, searchkey, info, timeInterval, timeIndex, superior, superiorname, iLowScore }) {
            this.iTime = timeIndex;
            this.iTimeInterval = timeInterval;
            if (!!superior) this.lbCaptain.setString("归属：" + kaayou.Identify.nickNameSubByLength(superiorname, 4, 4) + "/ID:" + superior);
            else this.lbCaptain.setString("");
            this.partner = partner;
            this.daytype = daytype;
            this.fid = fid;
            this.searchkey = searchkey;
            this.index = 0;
            this.info = info;
            this.daytype = 0;
            this.iLowScore = iLowScore
            this.label_time.setString("今天")
            this.resetTimeLine(7);
            (<ccui.Text>this.partnerLayout.getChildByName("label_name")).setString(info.uname);
            (<ccui.Text>this.partnerLayout.getChildByName("label_id")).setString("ID:" + info.uid);
            NetImage.setPlayerHead(<ccui.ImageView>this.partnerLayout.getChildByName("img_head"), info.uurl, info.ugender, (url) => {
                if (!info) { return false; }
                if (url !== info.uurl) {
                    return false;
                }
                return true;
            });

            this.cleanSortState("");
            this._state.totalSort = this.totalSort = 1;
            console.log("partner:" + partner + " daytype:" + daytype + "  fid:" + fid + " searchkey:" + searchkey);


            this.cleanList();
            this.node.setVisible(true);
            kaayou.pop.showAni({
                cNode: this.node.getChildByName("contentPanel"),
                mNode: this.node.getChildByName("maskbg"),
                action: () => {
                    this.pagePrev()
                }
            });
        }


        resetTimeLine(idx: number) {
            if (idx == 7) {
                lodash.forEach(this.dateSelect_Layout.getChildren(), (v: ccui.Button, i: number) => {
                    if (i == 0) (<ccui.Text>v.getChildByName("time")).setString('今天');
                    else if (i == 1) (<ccui.Text>v.getChildByName("time")).setString('昨天');
                    else if (i == 2) (<ccui.Text>v.getChildByName("time")).setString('前天');
                    else (<ccui.Text>v.getChildByName("time")).setString(new Date(this.subDayTime(i)).Format("MM-dd"));
                });
            } else {
                lodash.forEach(this.dateSelect_Layout, (v: ccui.CheckBox, i: number) => {
                    if (i == 0) (<ccui.Text>v.getChildByName("time")).setString('今天');
                    else if (i == 1) (<ccui.Text>v.getChildByName("time")).setString('昨天');
                    else if (i == 2) (<ccui.Text>v.getChildByName("time")).setString('三日累计');
                    else if (i == 3) (<ccui.Text>v.getChildByName("time")).setString('七日累计');
                    else (<ccui.Text>v.getChildByName("time")).setString(new Date(this.subDayTime(i)).Format("MM-dd"));
                });
            }
        }


        subDayTime(sd: number = 0) {
            let todayStr = Date.format("yyyy-MM-dd")
            let todayTime = Math.floor(new Date(todayStr).getTime() / 1000);
            todayTime -= sd * 24 * 60 * 60;
            console.log(todayTime)
            return todayTime * 1000;
        }





        Hide() {
            this.node.setVisible(false);
        }
    }
    class RecordNoAllianceInfoDialogItem extends kaayou.Block implements common.IPullListCell {
        
        constructor() {
            super();
        }

        node: cc.Node = null;
        private index = -1;
        img_head: ccui.ImageView = null;
        input_income: cc.Node = null;
        input_shareincome: cc.Node = null;

        label_name: ccui.Text = null;
        label_id: ccui.Text = null;
        lbChange: ccui.Text = null;
        lbBigWin: ccui.Text = null;
        lbDifen: ccui.Text;
        lbTotalCount: ccui.Text = null;
        btn_detail: ccui.Button = null;
        lb_order: ccui.Text;
        initUI(item: cc.Node) {
            let self = this;
            super.initWithNode(<ccui.Widget>item);

            this.setAnchorPoint(0, 0);
            this.setPosition(0, 0);
            this.label_name = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_name");
            this.label_id = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_id");
            this.lbChange = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "lbChange");
            this.lbTotalCount = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "lbTotalCount");
            this.lbDifen = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "lbDifen");
            this.lbChange.ignoreContentAdaptWithSize(false);
            this.lbBigWin = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "lbBigWin");
            this.lbBigWin.ignoreContentAdaptWithSize(false);
            this.img_head = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "img_head");
            this.lb_order = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Text_1");
            this.btn_detail = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_detail");

            this.btn_detail.on(kaayou.TouchEvent.TouchEnd, () => {
                kaayou.emit('tea', 'ui::HousegamerecordDialog::Show', {
                    imgurl: this._info.uurl, sex: this._info.ugender, name: this._info.uname
                    , uid: this._info.uid, selecttime: this._info.daytype, dfid: -1, type: "0",
                    timeInterval: self._info.timeInterval, timeIndex: self._info.timeIndex
                })
            }, this)
        }


        private _info: Data_NoAllianceInfoItem = null;
        setInfo(info: Data_NoAllianceInfoItem) {

            if (lodash.isEmpty(info) || lodash.isNull(info)) {
                return this.reset();
            }

            this._info = lodash.clone(info);
            this.label_name.setString(kaayou.Identify.nickNameSubSix(info.uname))
            this.label_id.setString("ID:" + info.uid)
            this.lbChange.setString((((info.changeprofit / 10) | 0) / 10).toString())
            this.lbBigWin.setString(info.bwtimes.toString())
            this.lbTotalCount.setString(info.playtimes.toString());
            this.lbDifen.setString("" + info.invalidtimes)
            NetImage.setPlayerHead(this.img_head, this._info.uurl, this._info.ugender, (url) => {
                if (!this._info) { return false; }
                if (url !== this._info.uurl) {
                    return false;
                }
                return true;
            });
            return this;
        }

        getInfo() {
            return this._info;
        }

        reset() {
            this.label_name.setString("")
            this.label_id.setString("")
            this.lbChange.setString("")
            this.lbBigWin.setString("")
            this.lbTotalCount.setString("")
        }

        setIndex(index: number) {
            this.index = index;
            this.lb_order.setString((index+1).toString());
        }
        getIndex(): number {
            return this.index
        }

    }

}