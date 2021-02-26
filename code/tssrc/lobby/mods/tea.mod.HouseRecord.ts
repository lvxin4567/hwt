namespace tea {
    const { BindEvent, doBindEvent } = kaayou._decorator;

    // interface Data_HouseMyRecordList {
    //     mystatlist: Array<Data_HouseMyStatItem>,
    //     items: Array<Data_HouseRecordItem>,
    // };





    export interface ITH_DATA_RECORD_PLAYER {
        uid: number,
        nickname: string,
        headurl: string,
        score: number,
        sex: number
    }

    export interface ITH_DATA_RECORD_ITEM {
        player_tags: Array<number>;
        partnerid: Array<Number>;
        daytype?: number;
        dfid: number,//楼层
        hid: number,
        fid: number,
        finishtype: number,//解散类型0正常结束1首局未打完解散2首局打完解散
        gamenum: string, //记录号
        isheart: number,
        roomnum: number, //房号
        timeInterval:number,//时段筛选时长
        timeRange: number,//时段筛选序号

        gameindex: number,//大赢家标签
        kindid: number,//游戏kind
        playround: number,//完成局数
        totalround: number,//总局数
        wf: string//玩法名称
        playedat: number//时间戳
        player: Array<ITH_DATA_RECORD_PLAYER>
    }

    interface IBASE_MESSAGE {
        errcode?: number,
        msg?: string
    }

    //获取战绩详情
    interface GetHouseRecordDetail {
        gamenum: string,
        gname: string,
        partnerid:Array<number>,
    };

    //我的战绩详情中的每局积分信息
    export interface Data_RecordDetailScoreItem {
        index: number,
        iReplayid: number,
        starttime: number,
        endtime: number,
        score: Array<number>, //本局每个玩家输赢积分
        uids: Array<number>  //玩家位置会变
    };

    export interface ITH_RECORD_DETAIL_ITEM_PLAYER {
        "uid": number,
        "nickname": string,
        headurl: string,
        "sex": number,
        "score": number
    }

    export interface ITH_RECORD_DETAIL_ITEM {

        player: Array<ITH_RECORD_DETAIL_ITEM_PLAYER>,
        replayid: number,
        starttime: number,
        endtime: number
    }

    export namespace mod {

        //亲友圈 我的战绩
        class TH_Mine_Record {

            @doBindEvent
            initMod(): TH_Mine_Record { return this; }
            _data: ITH_DATA_RECORD = null;
            _querybegintime = 0;
            @BindEvent("tea", 'mod::Record::GetMineRecordList')
            async doGetMineRecordList(data: {
                "dfid": number,
                "selecttime": number,
                "isUpdate": boolean,
                "searchkey": string,
                timeInterval:number,
                timeRange: number,
                lowscoreflag:number,
                roundtype:number
            }) {
                const UI_UpdateEventName = 'ui::Record::updateMineRecordList';
                kaayou.emit("common", "ui::Loading::Show");
                let isUpdate = data.isUpdate;
                if (isUpdate) {
                    this._data = null;
                    this._querybegintime = 0;
                }

                let sdata: proto_housegamerecord = {
                    hid: __teaHouseInfo.hid,
                    dfid: data.dfid,
                    uid: __teaHouseInfo.uid,
                    searchkey: data.searchkey,
                    selecttime: data.selecttime || 0,
                    querybegintime: this._querybegintime || 0,
                    querytimeinterval: data.timeInterval,
                    querytimerange: data.timeRange,
                    lowscoreflag:data.lowscoreflag,
                    roundtype:data.roundtype||0
                };

                let info: ITH_DATA_RECORD = await kaayou.sendMessage("lobby", houseRecordHead.housegamerecord, sdata, kaayou.MakeResultMessageHead(houseRecordHead.housegamerecord));

                kaayou.emit("common", "ui::Loading::Hide");

                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "获取列表失败！" });
                    kaayou.emit("tea", UI_UpdateEventName, { data: this._data || null, update: false });
                    return;
                }
                if (!info.uid) {
                    kaayou.emit("tea", UI_UpdateEventName, { data: this._data || null, update: false });
                    return;
                }
                //lw200409按照服务端要求如果上次的最后一条时间小于这次的第一条，就认为是重复数据抛掉
                if (this._querybegintime > 0 && !!info.items[0] && this._querybegintime < info.items[0].playedat) {
                    kaayou.emit("tea", UI_UpdateEventName, { data: this._data || null, update: false });
                    return;
                }
                if (!this._data) {
                    this._data = info
                } else {
                    if (!lodash.isEmpty(this._data.items)) {
                        if (!this._data.items) {
                            this._data.items = [];
                        }
                        for (var x in info.items) {
                            this._data.items.push(info.items[x]);
                        }
                    }
                    this._data.totalround = info.totalround;
                    this._data.totalscore = info.totalscore;
                    this._data.totalbwtimes = info.totalbwtimes;
                    this._data.completeround = info.completeround;
                    this._data.dismissround = info.dismissround;
                    this._data.playtimes = info.playtimes;
                }
                if (!this._data) {
                    this._querybegintime = 0;
                } else {
                    let beTime = 0;
                    for (var x in this._data.items) {
                        if (Number(x) == 0) {
                            beTime = this._data.items[x].playedat;
                            continue;
                        }
                        beTime = Math.min(this._data.items[x].playedat, beTime);
                    }
                    this._querybegintime = beTime;
                }
                kaayou.emit("tea", UI_UpdateEventName, { data: this._data, update: true });
            }


        }





        //亲友圈 成员战绩
        class TH_Mem_Record {

            @doBindEvent
            initMod() { }

            @BindEvent("tea", 'mod::Record::GetMemRecordList')
            async doGetMineRecordList() {
                kaayou.emit("common", "ui::Loading::Show");
                cc.log("获取亲友圈我的战绩列表数据");
                return;
            }

        }

        //亲友圈 圈子战绩
        class TH_Circle_Record {

            @doBindEvent
            initMod(): TH_Circle_Record { return this; }
            _data: ITH_DATA_RECORD = null;
            _querybegintime = 0;
            @BindEvent("tea", 'mod::Record::GetCircleRecordList')
            async doGetMineRecordList(data: {
                "dfid": number,
                "selecttime": number,
                "isUpdate": boolean,
                "searchkey": string,
                "bwuser": boolean,
                "recordtype"?: number,
                "uid"?: number,
                "force"?: boolean
                "querybegintime"?: number,
                likeflag?: number,
                timeInterval?: number,
                timeRange?: number,
                lowscoreflag:number,
                roundtype:number
            }) {
                const UI_UpdateEventName = 'ui::Record::updateCircleRecordList';
                kaayou.emit("common", "ui::Loading::Show");
                let isUpdate = data.isUpdate;
                if (isUpdate) {
                    this._data = null;
                    this._querybegintime = 0;
                }

                let sdata: proto_housegamerecord = {
                    hid: __teaHouseInfo.hid,
                    dfid: data.dfid,
                    uid: data.uid || 0,
                    searchkey: data.searchkey,
                    selecttime: data.selecttime || 0,
                    bwuser: data.bwuser,
                    querybegintime: data.querybegintime || this._querybegintime || 0,
                    recordtype: data.recordtype || 0,
                    likeflag: data.likeflag,
                    querytimeinterval: data.timeInterval,
                    querytimerange: data.timeRange,
                    lowscoreflag:data.lowscoreflag,
                    roundtype:data.roundtype || 0
                }
                let info: ITH_DATA_RECORD = await kaayou.sendMessage("lobby", houseRecordHead.housegamerecord, sdata, kaayou.MakeResultMessageHead(houseRecordHead.housegamerecord));

                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "获取列表失败！" });
                    kaayou.emit("tea", UI_UpdateEventName, { data: this._data || null, update: false });
                    return;
                }
                if (info.uid && data.force !== true) { return; }
                //lw200409按照服务端要求如果上次的最后一条时间小于这次的第一条，就认为是重复数据抛掉
                if (this._querybegintime > 0 && !!info.items[0] && this._querybegintime < info.items[0].playedat) {
                    console.log("圈子战绩重复数据");
                    kaayou.emit("tea", UI_UpdateEventName, { data: this._data || null, update: false });
                    return;
                }
                if (!this._data) {
                    this._data = info
                } else {
                    if (!lodash.isEmpty(this._data.items)) {
                        if (!this._data.items) {
                            this._data.items = [];
                        }
                        for (var x in info.items) {
                            this._data.items.push(info.items[x]);
                        }
                    }
                    this._data.totalround = info.totalround;
                    this._data.totalscore = info.totalscore;
                    this._data.totalbwtimes = info.totalbwtimes;
                    this._data.completeround = info.completeround;
                    this._data.dismissround = info.dismissround;
                    this._data.playtimes = info.playtimes;
                }
                if (!this._data) {
                    this._querybegintime = 0;
                } else {
                    let beTime = 0;
                    for (var x in this._data.items) {
                        if (Number(x) == 0) {
                            beTime = this._data.items[x].playedat;
                            continue;
                        }
                        beTime = Math.min(this._data.items[x].playedat, beTime);
                    }
                    //lw190923因为按时间从新到旧排序，如果这一页的最小时间大于等于上一页的最小时间，说明数据重复
                    if (this._querybegintime > 0 && beTime >= this._querybegintime) {
                        kaayou.emit("tea", UI_UpdateEventName, { data: this._data || null, update: false });
                        return;
                    } else {
                        this._querybegintime = beTime;
                    }
                }
                kaayou.emit("tea", UI_UpdateEventName, { data: this._data, update: true });
            }
        }

        //亲友圈战绩-楼层统计
        class TH_Business_Record {
            @doBindEvent
            initMod(): TH_Business_Record { return this; }
            @BindEvent("tea", 'mod::Record::GetBusinessdList')
            async doGetBusinessdList() {
                const UI_UpdateEventName = 'ui::Record::updateBusinessList';
                const REQ_EventName = 'houseoperationalstatus';
                const RES_ventName = "ws::Msg::houseoperationalstatus";

                kaayou.emit("common", "ui::Loading::Show");
                let sdata: IBASE_HOUSEREQ = {
                    hid: __teaHouseInfo.hid
                }
                let info: ITH_DATA_BUSINESS = await kaayou.sendMessage("lobby", houseRecordHead.houseoperationalstatus, sdata, kaayou.MakeResultMessageHead(houseRecordHead.houseoperationalstatus));

                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "获取列表失败！" });
                    kaayou.emit("tea", UI_UpdateEventName, { data: info || null, update: false });
                    return;
                }
                if (!info || !info.items || lodash.isEmpty(info.items)) {
                    return;
                }
                let resInfo: ITH_RECORD_BUSS_RES = {
                    itemArr: [],
                    timeArr: [],
                    totalArr: [],
                    totalCard: []
                }
                for (const x in info.items) {
                    resInfo.timeArr.push(info.items[x].querytime ? info.items[x].querytime : 0);
                    resInfo.totalArr.push(info.items[x].totalrounds);
                    resInfo.totalCard.push(info.items[x].totalfangkacost);
                }

                for (let i = 0; i < info.items[0].playrounds.length; i++) {
                    resInfo.itemArr[i] = [];
                    let floorIndex = i + 1;    //这个是楼层
                    resInfo.itemArr[i].push(floorIndex);
                    for (let j = 0; j < info.items.length; j++) {
                        resInfo.itemArr[i].push(info.items[j].playrounds[i]);
                    }
                }
                console.log(resInfo);
                kaayou.emit("tea", UI_UpdateEventName, { data: resInfo || null, update: true });
            }


        }

        //亲友圈 大赢家统计
        class TH_BigWin_Record {
            @doBindEvent
            initMod() { return this; }



            _bigWinList: Array<ITH_DATA_RECORDCOUNT_ITEM> = [];
            _bigWinbegin = 0;
            _bigWinTotle = 0;

            @BindEvent("tea", 'mod::Record::GetBigWinList')
            async doGetBigWinList(data: {
                // "begin": number,
                "clear": boolean,
                "param": string,
                "type": boolean
            }) {
                const UI_UpdateEventName = 'ui::Record::updateBigWinList';
                const REQ_EventName = 'houserecordstatus';
                const RES_ventName = "ws::Msg::houserecordstatus";

                this._bigWinList = lodash.isEmpty(this._bigWinList) ? [] : this._bigWinList;
                if (data.clear) {
                    this._bigWinList = [];
                    this._bigWinbegin = 0;
                }


                let reqParm: proto_houserecordstatus = {
                    hid: __teaHouseInfo.hid,
                    param: data.param,
                    pbegin: this._bigWinbegin,
                    pend: this._bigWinbegin + 49,
                    recordtype: data.type
                }
                kaayou.emit("common", "ui::Loading::Show");
                let info = await kaayou.sendMessage("lobby", houseRecordHead.houserecordstatus, reqParm, kaayou.MakeResultMessageHead(houseRecordHead.houserecordstatus));

                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "获取列表失败！" });
                    kaayou.emit("tea", UI_UpdateEventName, { data: null, update: false });
                    return;
                }
                if (lodash.isEmpty(info.items)) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: "没有更多数据！" });
                }

                if (info.pbegin == reqParm.pbegin) {
                    this._bigWinbegin += info.items.length;
                    for (var x in info.items) {
                        let tempItem = info.items[x];
                        let winModel: ITH_DATA_RECORDCOUNT_ITEM = {
                            uid: tempItem.uid,
                            uurl: tempItem.uurl,
                            uname: tempItem.uname,
                            recordtimes: tempItem.recordtimes
                        }
                        this._bigWinList.push(winModel);
                    }
                }
                kaayou.emit("tea", UI_UpdateEventName, { data: this._bigWinList || null, update: true });
            }

            @BindEvent("tea", 'mod::Record::ClearBigWin')
            async doClearBigWin(data: proto_houserecordstatusclean) {
                //请求网络清除玩家战绩统计数据
                kaayou.emit("common", "ui::Loading::Show");
                let info = await kaayou.sendMessage("lobby", houseRecordHead.houserecordstatusclean, data, kaayou.MakeResultMessageHead(houseRecordHead.houserecordstatusclean));
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "操作失败！" });
                    return;
                }
                kaayou.emit("tea", 'ui::BigWin::Clear', data);
            }

            @BindEvent("tea", 'mod::Record::ClearAllBigWin')
            async doClearAllBigWin(data: proto_houserecordstatuscleanall) {
                //请求网络清除玩家战绩统计数据
                kaayou.emit("common", "ui::Loading::Show");
                let info = await kaayou.sendMessage("lobby", houseRecordHead.houserecordstatuscleanall, data, kaayou.MakeResultMessageHead(houseRecordHead.houserecordstatuscleanall));
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "操作失败！" });
                    return;
                }
                kaayou.emit("tea", 'ui::BigWin::ClearAll', data);
            }
        }

        //亲友圈 对局统计
        class TH_GameNumber_Record {
            @doBindEvent
            initMod() { return this; }

            _gameNumList: Array<ITH_DATA_RECORDCOUNT_ITEM> = [];
            _gameNumbegin = 0;
            _gameNumTotle = 0;
            @BindEvent("tea", 'mod::Record::GetGameNumberList')
            async doGetGameNumberList(data: {
                // "begin": number,
                "clear": boolean,
                "param": string,
                "type": boolean
            }) {
                const UI_UpdateEventName = 'ui::Record::updateGameNumberList';
                const REQ_EventName = 'houserecordstatus';
                const RES_ventName = "ws::Msg::houserecordstatus";

                this._gameNumList = lodash.isEmpty(this._gameNumList) ? [] : this._gameNumList;
                if (data.clear) {
                    this._gameNumbegin = 0;
                    this._gameNumList = [];
                }

                let reqParm: proto_houserecordstatus = {
                    hid: __teaHouseInfo.hid,
                    param: data.param,
                    pbegin: this._gameNumbegin,
                    pend: this._gameNumbegin + 49,
                    recordtype: data.type
                }
                kaayou.emit("common", "ui::Loading::Show");
                let info = await kaayou.sendMessage("lobby", houseRecordHead.houserecordstatus, reqParm, kaayou.MakeResultMessageHead(houseRecordHead.houserecordstatus));

                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "获取列表失败！" });
                    kaayou.emit("tea", UI_UpdateEventName, { data: null, update: false });
                    return;
                }
                if (lodash.isEmpty(info.items)) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: "没有更多数据！" });
                }

                if (info.pbegin == reqParm.pbegin) {
                    this._gameNumbegin += info.items.length;
                    for (var x in info.items) {
                        let tempItem = info.items[x];
                        let winModel: ITH_DATA_RECORDCOUNT_ITEM = {
                            uid: tempItem.uid,
                            uurl: tempItem.uurl,
                            uname: tempItem.uname,
                            recordtimes: tempItem.recordtimes
                        }
                        this._gameNumList.push(winModel);
                    }
                }
                kaayou.emit("tea", UI_UpdateEventName, { data: this._gameNumList || null, update: true });
            }

            @BindEvent("tea", 'mod::Record::ClearGameNumber')
            async doClearGameNumber(data: proto_houserecordstatusclean) {
                //请求网络清除玩家战绩统计数据
                kaayou.emit("common", "ui::Loading::Show");
                let info = await kaayou.sendMessage("lobby", houseRecordHead.houserecordstatusclean, data, kaayou.MakeResultMessageHead(houseRecordHead.houserecordstatusclean));
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "操作失败！" });
                    return;
                }
                kaayou.emit("tea", 'ui::GameNumber::Clear', data);
            }

            @BindEvent("tea", 'mod::Record::ClearAllGameNumber')
            async doClearAllGameNumber(data: proto_houserecordstatuscleanall) {
                //请求网络清除玩家战绩统计数据
                kaayou.emit("common", "ui::Loading::Show");
                let info = await kaayou.sendMessage("lobby", houseRecordHead.houserecordstatuscleanall, data, kaayou.MakeResultMessageHead(houseRecordHead.houserecordstatuscleanall));
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "操作失败！" });
                    return;
                }
                kaayou.emit("tea", 'ui::GameNumber::ClearAll', data);
            }
        }

        //战绩详情
        class TH__Record_Detail {
            @doBindEvent
            initMod(): TH__Record_Detail { return this; }


            @BindEvent("tea", 'mod::TeaHouse::Record::GetRecordDetail')
            async ddoGetRecordDetail(data: GetHouseRecordDetail) {
                // let ccc = {
                //     "gamenum": "20190717091955_14_872157",
                //     "kindid": 574,
                //     "roomid": 872157,
                //     "time": 1563330845,
                //     "userArr": [
                //         { "uid": 1000001, "nickname": "kaa6223920", "imgurl": "", "sex": 2, "score": 4 },
                //         { "uid": 1000002, "nickname": "kaa5858733", "imgurl": "", "sex": 2, "score": -1 },
                //         { "uid": 1000003, "nickname": "kaa9042759", "imgurl": "", "sex": 2, "score": -2 },
                //         { "uid": 1000004, "nickname": "kaa5216907", "imgurl": "", "sex": 2, "score": -1 }
                //     ],
                //     "scoreArr": [
                //         { "iReplayid": 100146, "starttime": 1563326403, "endtime": 1563326422, "score": [4, -1, -2, -1] },
                //         { "iReplayid": 100147, "starttime": 1563326429, "endtime": 1563326438, "score": [0, 0, 0, 0] }]
                // }
                kaayou.emit("common", "ui::Loading::Show");
                cc.log("获取亲友圈战绩详情：" + data.gamenum);
                // let info = await kaayou.sendMessge("gamerecordinfo", data, "ws::Msg::gamerecordinfo");
                let result = await kaayou.sendMessage("lobby", houseRecordHead.gamerecordinfo, data, kaayou.MakeResultMessageHead(houseRecordHead.gamerecordinfo));
                kaayou.emit("common", "ui::Loading::Hide");
                if (result.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: result.msg || "获取列表失败！" });
                    return;
                }

                let info: Data_HouseRecordDetail = result;
                var recorddetail: ITH_RECORD_DETAIL_INFO = {
                    gname: data.gname || "",
                    floorindex: info.floorindex || 0,
                    gamenum: info.gamenum,
                    kindid: info.kindid,
                    roomid: info.roomid,
                    time: info.time,
                    totalround: info.totalround || 0,
                    totallist: [],
                    list: [],
                    difen:info.difen
                }

                data.partnerid = data.partnerid || [];
                let mapUser = {};
                for (let x in info.userArr) {

                    mapUser[info.userArr[x].uid] = {
                        nickname: info.userArr[x].nickname,
                        imgurl: info.userArr[x].imgurl,
                        sex: info.userArr[x].sex
                    }
                    
                    recorddetail.totallist.push(lodash.extend({},info.userArr[x],{upartner:data.partnerid[x]}) );
                    
                }

                // var recorddetail: ITH_RECORD_DETAIL_ITEM[] = [];
                for (var x in info.scoreArr) {
                    let item: ITH_RECORD_DETAIL_ITEM = {
                        player: [],
                        replayid: info.scoreArr[x].iReplayid,
                        starttime: info.scoreArr[x].starttime,
                        endtime: info.scoreArr[x].endtime
                    }
                    //lw200428每一小局座位可能会变
                    for (var y in info.userArr) {
                        let uid = info.scoreArr[x].uids[y];
                        let itplayer: ITH_RECORD_DETAIL_ITEM_PLAYER = {
                            uid: uid,
                            "nickname": mapUser[uid].nickname,
                            headurl: mapUser[uid].imgurl,
                            "sex": mapUser[uid].sex,
                            "score": info.scoreArr[x].score[y] || 0,
                        }
                        item.player.push(itplayer);
                    }
                    recorddetail.list.push(item)
                }

                //kaayou.emit('ui::TeaHouse::Record::UpdateRecordDetail', recorddetail);
                // kaayou.DataSet.set("tea::HouseRecordDetail", JSON.stringify(recorddetail));
                kaayou.emit("tea", 'ui::recordDetail::Show', recorddetail);
            }


        }

        export class HouseRecord {
            static __INS__: tea.mod.HouseRecord = null;
            static getInstance(): tea.mod.HouseRecord {
                if (HouseRecord.__INS__ == null) {
                    HouseRecord.__INS__ = new HouseRecord();
                    HouseRecord.__INS__.initMod();
                }
                return HouseRecord.__INS__;
            }
            _Mine_Record: TH_Mine_Record = null;
            _Circle_Record: TH_Circle_Record = null;
            _Business_Record: TH_Business_Record = null;
            _BigWin_Record: TH_BigWin_Record = null;
            _GameNumber_Record: TH_GameNumber_Record = null;
            _Record_Detail: TH__Record_Detail = null;

            @doBindEvent
            initMod() {
                this._Mine_Record = new TH_Mine_Record().initMod();
                this._Circle_Record = new TH_Circle_Record().initMod();
                this._Business_Record = new TH_Business_Record().initMod();
                this._BigWin_Record = new TH_BigWin_Record().initMod();
                this._GameNumber_Record = new TH_GameNumber_Record().initMod();
                this._Record_Detail = new TH__Record_Detail().initMod();
            }
        }
    }
    tea.mod.HouseRecord.getInstance();
}