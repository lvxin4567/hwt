//对局详情+大赢家详情
namespace tea {
    var { BindEvent, doBindEvent } = kaayou._decorator;

    interface Data_HousegamerecordDialogItem {
        dfid: number
        fid: number
        finishtype: number
        gameindex: number
        gamenum: string
        hid: number
        isheart: number
        kindid: number
        partnerid: Array<number>
        playedat: number
        player: Array<{ headurl: string, nickname: string, score: number, sex: number, uid: number }>
        playround: number
        roomnum: number
        totalround: number
        wf: string
        daytype?: number
        isFilterBigWin?: boolean,
        timeInterval: number,
        timeIndex: number
    }

    export class tea_HousegamerecordDialogMgr {
        static __INS__: tea_HousegamerecordDialogMgr = null;
        static getInstance(_zOrder: number = 0) {
            if (tea_HousegamerecordDialogMgr.__INS__ == null) {
                tea_HousegamerecordDialogMgr.__INS__ = new tea_HousegamerecordDialogMgr();
                tea_HousegamerecordDialogMgr.__INS__.init();
                tea_HousegamerecordDialogMgr.__INS__._zOrder = _zOrder
            }
            return tea_HousegamerecordDialogMgr.__INS__;
        }
        _zOrder: number = 0
        __selfDialog: HousegamerecordDialog = null

        init() {
            let self = this;
            this.__selfDialog = null;

            kaayou.getController('tea').on('ui::HousegamerecordDialog::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show(e.data);
            }, this, 10);

            kaayou.getController('tea').on('ui::HousegamerecordDialog::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfDialog == null) {
                this.__selfDialog = new HousegamerecordDialog();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfDialog, this._zOrder);
                this.__selfDialog['onConfigUpdate'] && this.__selfDialog['onConfigUpdate']();
            }
            return this.__selfDialog;
        }
    }

    class HousegamerecordDialog extends kaayou.Layer {
        dgtime: number;

        constructor() {
            super()
            this.initUI();
        }

        private SV_pullList: common.PullList = null;
        selectMgr: RecordSelectWidget;
        iLike: number = 0;
        iTime: number = 0;
        iTimeInterval: number = 0;
        ivHead: ccui.ImageView;
        lbName: ccui.Text;
        lbID: ccui.Text;
        tbTotalScore: ccui.Text;
        lbgamecount: ccui.Text;
        lbbigwin: ccui.Text;
        lbinvalidgame: ccui.Text;
        lbzancount: ccui.Text;


        cbTitleLeft: ccui.CheckBox;
        cbTitleRight: ccui.CheckBox;
        bwuser: boolean = false;

        lyStatistics: ccui.Layout;
        iv0: ccui.ImageView
        iv1: ccui.ImageView;
        iv2: ccui.ImageView;
        iv3: ccui.ImageView;

        timeline1: Array<number> = []
        timeline2: Array<number> = []
        timecursor1: number = 0;
        timecursor2: number = 0;
        cursoradd: boolean = false;
        clean: boolean;
        titlePlayDtail: ccui.ImageView = null;

        list1 = []
        list2 = []

        initUI() {
            let self = this;
            this.initWithccs(tea.res.TH_RecordMemberDetail_json)

            this.ivHead = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "ivHead")
            this.lbName = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "lbName")
            this.lbID = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "lbID")
            this.tbTotalScore = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "tbTotalScore")
            this.lbgamecount = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "lbgamecount")
            this.lbbigwin = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "lbbigwin")
            this.lbinvalidgame = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "lbinvalidgame")
            this.lbzancount = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "lbzancount")

            this.cbTitleLeft = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "cbTitleLeft")
            this.cbTitleRight = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "cbTitleRight")
            this.titlePlayDtail = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "titlePlay")
            this.lyStatistics = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "lyStatistics")

            for (let ti = 0; ti < 4; ti++) {
                let name = "iv" + ti
                this[name] = ccui.helper.seekWidgetByName(<ccui.Widget>this.lyStatistics, name)
            }

            let close: ccui.Button = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btnClose")
            close.on(kaayou.TouchEvent.TouchEnd, () => {
                self.cleanList();
                this.Hide();
            }, this)

            this.cbTitleLeft.on(kaayou.CheckEvent.SELECTED, () => {
                this.cleanList();
                this.toggleTab(1)
            }, this)

            this.cbTitleLeft.on(kaayou.CheckEvent.UNSELECTED, () => {
                this.cbTitleLeft.setSelected(true);
            }, this);

            this.cbTitleRight.on(kaayou.CheckEvent.SELECTED, () => {
                this.cleanList();
                this.toggleTab(2)
            }, this)

            this.cbTitleRight.on(kaayou.CheckEvent.UNSELECTED, () => {
                this.cbTitleRight.setSelected(true);
            }, this);

            this.selectMgr = new RecordSelectWidget();
            this.selectMgr.initWidthNode(ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "cbFloor"), this.node, () => {
                this.cleanList();
                this.pullList({ bwuser: this.bwuser, timetype: this.selecttime, recordtype: this.bwuser ? 2 : 1 })
                // const daytype = this.selectMgr.getCurSelect()
                this.resetcursor();
                this.cursoradd = true;
                // this.SV_pullList.getCells().forEach(v=>{
                //     let img_zan:ccui.Widget = ccui.helper.seekWidgetByName(<any>v, "img_zan");
                //     img_zan.setVisible(daytype===-1);
                // });
            });

            let cellMod = <ccui.Widget>ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "rowMemberDetail");
            const memberlist = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "memberlist")
            this.SV_pullList = new common.PullList();
            // this.scroll_member._debugRect = true;
            this.SV_pullList.setSpacingY(8);
            this.SV_pullList.initWithNode(<cc.Node>ccui.helper.seekWidgetByName(<ccui.Widget>memberlist, "content"));
            this.SV_pullList.setAdpter({
                getCell: () => {
                    let v = new HousegamerecordDialogItem;
                    v.initUI(cellMod);
                    return v;
                },
                datas: []
            });

            this.SV_pullList.on(kaayou.PullListEvent.HeadFinish, (e: kaayou.PullListEvent) => {
                setTimeout(() => {
                    this.resetcursor();
                    this.cleanList();
                    this.cursoradd = false;

                    if (this.bwuser)
                        this.timecursor2 = Math.max(this.timecursor2 - 1, 0);
                    else
                        this.timecursor1 = Math.max(this.timecursor1 - 1, 0);

                    if (this.bwuser/* && this.timecursor2===0*/) {
                        let querybegintime = this.timeline2[this.timecursor2];
                        this.cursoradd = true;
                        this.pullList({ bwuser: this.bwuser, timetype: this.selecttime, recordtype: this.bwuser ? 2 : 1, querybegintime })
                        // return;
                    } else/* if(this.timecursor1 == 0)*/ {
                        this.cursoradd = true
                        let querybegintime = this.timeline1[this.timecursor1];
                        this.pullList({ bwuser: this.bwuser, timetype: this.selecttime, recordtype: this.bwuser ? 2 : 1, querybegintime })
                        // return;
                    }
                    this.SV_pullList.refresh();
                }, 300);
            }, this);

            this.SV_pullList.on(kaayou.PullListEvent.FootFinish, (e: kaayou.PullListEvent) => {
                setTimeout(() => {
                    this.cursoradd = true;
                    this.dgtime = 0;
                    if (this.bwuser) {
                        this.timecursor2 = this.timecursor2 + 1;
                        let querybegintime = this.timeline2[this.timecursor2];
                        //this.pullList({bwuser:this.bwuser,timetype:this.selecttime,recordtype:this.bwuser?2:1,querybegintime})
                        this.pullList({ bwuser: this.bwuser, timetype: this.selecttime, recordtype: this.bwuser ? 2 : 1, clear: false })
                    } else {
                        this.timecursor1 = this.timecursor1 + 1;
                        let querybegintime = this.timeline1[this.timecursor1];
                        //this.pullList({bwuser:this.bwuser,timetype:this.selecttime,recordtype:this.bwuser?2:1,querybegintime})
                        this.pullList({ bwuser: this.bwuser, timetype: this.selecttime, recordtype: this.bwuser ? 2 : 1, clear: false })
                    }
                }, 300);
            }, this);

            this.SV_pullList.setHeadDoingText("上一页")
            this.SV_pullList.setHeadDidFinishText("上一页")
            this.SV_pullList.setFootDidFinishText("下一页")
            this.SV_pullList.setFootDoingText("下一页")


            kaayou.getController("tea").on("ui::Record::updateCircleRecordList", (e: kaayou.Event) => {
                let result: { data: ITH_DATA_RECORD, update: boolean } = e.data
                let list
                if (result && result.data) {
                    let data = result.data;

                    if (result.update) {

                        data.items.forEach((v: any) => {
                            v.daytype = this.selecttime;
                            v.isFilterBigWin = this.bwuser;
                            v.timeIndex = self.iTime;
                        })


                        list = lodash.clone(data.items || []);

                        if (list.length == 0) {
                            if (this.bwuser)
                                this.timecursor2--;
                            else
                                this.timecursor1--;

                            this.SV_pullList.refresh();

                            if (this.clean === true) {
                                this.clean = false;
                                this.SV_pullList.getAdpter().datas = []
                                this._data = result.data;
                                this.updateInfo();
                                this.SV_pullList.refresh();
                                return;
                            }
                        }



                        if (this.cursoradd && list.length) {
                            if (this.bwuser) {
                                this.timeline2[this.timecursor2 + 1] = list[list.length - 1].playedat
                                this.list2[this.timecursor2] = list;
                            } else {
                                this.timeline1[this.timecursor1 + 1] = list[list.length - 1].playedat
                                this.list1[this.timecursor1] = list;
                            }
                            //lw200527新老数据已经在mod层合并了
                            this.SV_pullList.getAdpter().datas = list;
                        }
                    }
                } else {
                    this.SV_pullList.getAdpter().datas = [];
                }
                this.clean = false;
                this._data = result.data;
                this.updateInfo();
                this.SV_pullList.refresh()
            }, this, 10)

            kaayou.getController('teaRC').on('ui::State::UpdateMemDialogZanCount', (e: kaayou.Event) => {
                let { num } = e.data;
                this.updateZanCount(num);
            }, this)

            this.SV_pullList.initPullEnv();
        }

        _data: ITH_DATA_RECORD = null;

        _baseinfo = { imgurl: null, sex: null, name: null, uid: null }
        selecttime: number
        updateBaseInfo({ imgurl, sex, name, uid, selecttime, dfid }) {
            this._baseinfo = { imgurl, sex, name, uid };
            this.selecttime = selecttime;
            NetImage.setPlayerHead(this.ivHead, imgurl, sex);
            let sName = kaayou.Identify.nickNameSubSix(name);
            this.lbName.setString(sName);
            this.lbID.setString("ID:" + uid);
            this.selectMgr.setItemsCount(tea.mod.__teaHouseInfo.hfloorids.length + 1);
            this.selectMgr.setCurSelect(dfid)
        }


        updateZanCount(dig) {
            let t = this._data.totallike;
            t = this._data.totallike = t + ((+dig) || 0);
            t = this._data.totallike = Math.max(0, t);
            this.lbzancount.setString("已点赞：" + t)
        }

        updateInfo() {

            let data = this._data

            if (!data)
                return this.reset();


            this.tbTotalScore.setString(data.totalscore + "")
            this.lbgamecount.setString("牌局数：" + data.totalround)
            this.lbbigwin.setString("大赢家：" + data.totalbwtimes)
            this.lbinvalidgame.setString("低分局：" + data.invalidround)
            this.lbzancount.setString("已点赞：" + data.totallike)

        }


        resetcursor() {
            if (this.bwuser) {
                this.timeline2 = [0]
                this.list2 = []
                this.timecursor2 = 0;
            } else {
                this.timeline1 = [0]
                this.list1 = []
                this.timecursor1 = 0;
            }

        }



        pullList({ clear = true, timetype = 0, sorttype = -1, bwuser = false, recordtype = 2, querybegintime = 0 }) {
            let self = this;
            let timeInterval = this.iTimeInterval;
            let timeRange = this.iTime + 1;
            let hid = tea.mod.__teaHouseInfo.hid;
            let json = (cc.sys.localStorage.getItem("tea::store::lowscorefilter") || "{}");
            let lowscoreflag = JSON.parse(json)[hid] || 0
            //lw200527querybegintime交给mod层去判断
            kaayou.emit("tea", 'mod::Record::GetCircleRecordList',
                {
                    "dfid": self.selectMgr.getCurSelect(),
                    "selecttime": timetype,
                    "isUpdate": clear,
                    "searchkey": "",
                    lowscoreflag,
                    bwuser,
                    recordtype,
                    uid: self._baseinfo.uid,
                    force: true,
                    likeflag: self.iLike,
                    timeInterval: timeInterval,
                    timeRange: timeRange
                });
        }

        reset() {
            this.lbName.setString("")
            this.lbID.setString("")
            this.tbTotalScore.setString("")
            this.lbgamecount.setString("")
            this.lbbigwin.setString("")
            this.lbinvalidgame.setString("")
            this.lbzancount.setString("")
            this.cleanList();

        }

        toggleTab(type) {

            let od = [371, 311, 251, 191];
            let base = "/res/lobby/TeaHouse/TH_RecordPanel/MemberDetail/"
            this.cursoradd = true;
            switch (type) {
                case 1:
                case "1":
                    this.iv0.setVisible(true);
                    this.iv2.setVisible(true);
                    // this.iv3.loadTexture(base+"mddLeftBg2.png",0)
                    this.pullList({ bwuser: false, timetype: this.selecttime, recordtype: 1 })
                    this.bwuser = false;
                    this.cbTitleLeft.setSelected(true);
                    this.cbTitleRight.setSelected(false);
                    break;
                case "2":
                case 2:
                    this.iv0.setVisible(false);
                    this.iv2.setVisible(false);
                    // this.iv3.loadTexture(base+"mddLeftBg1.png",0)
                    this.pullList({ bwuser: true, timetype: this.selecttime, recordtype: 2 })
                    this.bwuser = true;
                    this.cbTitleLeft.setSelected(false);
                    this.cbTitleRight.setSelected(true);
                    break;
            }

            let visChild = this.lyStatistics.getChildren().filter(v => v.isVisible())
            visChild.forEach((v: ccui.ImageView, i) => {
                let style = 1 === (i % 2)
                if (!style)
                    v.loadTexture(base + "mddLeftBg1.png", 0)
                else
                    v.loadTexture(base + "mddLeftBg2.png", 0)
                v.setPositionY(od[i]);
            })


            this.resetcursor();

        }

        cleanList() {
            this.SV_pullList.getAdpter().datas = []
            this.SV_pullList.refresh();
        }


        Show(data) {
            this.iTimeInterval = data.timeInterval;
            this.iTime = data.timeIndex;
            this.node.setVisible(true);
            if (data.type != 1) {  //说明是从团队统计过去的
                this.cbTitleLeft.setVisible(false);
                this.titlePlayDtail.setVisible(true);
                this.cbTitleRight.setVisible(false);
            } else {
                this.cbTitleLeft.setVisible(true);
                this.titlePlayDtail.setVisible(false);
                this.cbTitleRight.setVisible(true);
            }
            kaayou.pop.showAni({
                cNode: this.node.getChildByName("contentPanel"),
                mNode: this.node.getChildByName("maskbg"),
                action: () => {
                    this.clean = true;
                    this.updateBaseInfo(data);
                    this.toggleTab(1);
                }
            });
        }

        Hide() {
            this.node.setVisible(false);
        }
    }


    class HousegamerecordDialogItem extends kaayou.Block implements common.IPullListCell {

        constructor() {
            super();
        }


        private index = -1;

        lbRoomID: ccui.Text;
        lbFloor: ccui.Text;
        lbGameName: ccui.Text;
        lbRound: ccui.Text;
        lbTime: ccui.Text;
        cbLike: ccui.ImageView;
        btnDetail: ccui.Button;
        lbIdx: ccui.Text;
        players: Array<ccui.Layout> = []

        initUI(item: cc.Node) {
            let self = this;
            super.initWithNode(<ccui.Widget>item);
            this.setAnchorPoint(0, 0);
            this.setPosition(0, 0);

            this.lbRoomID = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "lbRoomID")
            this.lbFloor = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "lbFloor")
            this.lbGameName = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "lbGameName")
            this.lbRound = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "lbRound")
            this.lbTime = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "lbTime")
            this.cbLike = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "img_zan")
            this.btnDetail = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btnDetail")
            this.lbIdx = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "lbIdx")

            for (var i = 0; i < 5; i++) {
                let name = "lyPlayer" + i
                let node: ccui.Layout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, name)
                this.players.push(node);
            }

            this.cbLike.on(kaayou.TouchEvent.TouchEnd, () => {
                //{hid:string,gamenum:number,islike:boolean,daytype:number,recordtype:number}
                const { hid } = tea.mod.__teaHouseInfo
                let { daytype, isheart, gamenum, isFilterBigWin } = this._info;
                let recordtype = isFilterBigWin ? 2 : 1;
                let islike = !isheart;
                //单局点赞固定为0和1
                let querytimeinterval = 0;
                let querytimerange = 1;
                kaayou.emit("tea", 'mod::TeaHouse::GameLike', {
                    data: { hid, daytype, islike, gamenum, recordtype, querytimeinterval, querytimerange },
                    callback: (result) => {
                        if (result === true) {
                            this._info.isheart = +(!this._info.isheart)
                            let islike = !!this._info.isheart
                            this.cbLike.loadTexture(islike ? "TH_Record_zan.png" : "TH_Record_zan_gray.png", ccui.Widget.PLIST_TEXTURE);
                            kaayou.emit("teaRC", 'ui::State::UpdateMemDialogZanCount', { num: islike ? 1 : -1 });
                        }
                    }
                })

            }, this)

            this.btnDetail.on(kaayou.TouchEvent.TouchEnd, () => {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit("tea", 'mod::TeaHouse::Record::GetRecordDetail', { gamenum: this._info.gamenum, gname: this._info.wf });
            }, this)

        }

        setPlayerDisable(n: number) {
            this.players.forEach((v, i) => {
                v.setVisible(i < n)
            })
        }

        private _info: Data_HousegamerecordDialogItem = null;
        setInfo(info: Data_HousegamerecordDialogItem) {

            if (lodash.isEmpty(info) || lodash.isNull(info)) {
                return this.reset();
            }

            this._info = info;
            this.setPlayerDisable(info.player.length)

            this.lbRoomID.setString("房号：" + info.roomnum)
            this.lbFloor.setString((info.dfid + 1) + "楼");
            this.lbGameName.setString(info.wf)
            this.lbRound.setString(`${info.playround}/${info.totalround}局`);
            this.lbTime.setString(new Date(info.playedat * 1000).format("MM-dd hh:mm:ss"))
            this.lbIdx.setString(info.gameindex + "");
            this.cbLike.loadTexture(!!info.isheart ? "TH_Record_zan.png" : "TH_Record_zan_gray.png", ccui.Widget.PLIST_TEXTURE)
            // let s= [-190,60,60,50]
            // info.player.forEach((v,i)=>{v.score =s[i] })
            let bigwin = this.getBigWinPlayer(info.player).map(v => v.i);

            info.player.forEach((v, i) => {
                let p = this.players[i]
                let img_head: ccui.ImageView = ccui.helper.seekWidgetByName(<ccui.Widget>p, "img_head")
                let tag_winner: ccui.ImageView = ccui.helper.seekWidgetByName(<ccui.Widget>p, "tag_winner")
                let label_uname: ccui.Text = ccui.helper.seekWidgetByName(<ccui.Widget>p, "label_uname")
                let label_uscore: ccui.Text = ccui.helper.seekWidgetByName(<ccui.Widget>p, "label_uscore")

                NetImage.setPlayerHead(img_head, v.headurl, v.sex);
                tag_winner.setVisible(bigwin.indexOf(i) !== -1)
                label_uname.setString(kaayou.Identify.nickNameSubByLength(v.nickname, 4, 4))
                label_uscore.setString(v.score + "");
                if (v.score >= 0) {
                    label_uscore.setColor(cc.color("#FF4925"))
                } else {
                    label_uscore.setColor(cc.color("#008C07"))
                }
            })

            return this;
        }

        getBigWinPlayer(iplayers: Array<{ headurl: string, nickname: string, score: number, sex: number, uid: number }>) {
            let out = [];
            iplayers.reduce(
                function (o, a, b) {
                    let item = o[0] || { i: -Infinity, m: null }
                    if (a.score >= item.m && a.score > 0) {

                        let k = 0, temp;

                        while ((temp = o[k]) && temp.m < a.score) {
                            o.splice(0, 1);
                        }

                        o.push({ i: b, m: a.score });

                    }
                    return o;
                }, out)

            return out;
        }

        getInfo() {
            return this._info;
        }

        reset() {

        }

        setIndex(index: number) {
            this.index = index;
        }
        getIndex(): number {
            return this.index
        }
    }
}