namespace tea {
    const { BindEvent, doBindEvent } = kaayou._decorator;



    export interface ITH_DATA_MEM_STATE_ITEM {
        index?: number,
        uid: number,
        uname: string,
        uurl: string,
        ugender: number,
        ujointime: number,
        playtimes: number,
        bwtimes: number,
        totalscore: number,
    };



    export namespace mod {
        export class HouseState {
            static __INS__: tea.mod.HouseState = null;
            static getInstance(): tea.mod.HouseState {
                if (HouseState.__INS__ == null) {
                    HouseState.__INS__ = new HouseState();
                    HouseState.__INS__.initMod();
                }
                return HouseState.__INS__;
            }
            @doBindEvent
            initMod() { }
            //排序方式(0,1 局数, 2,3 大赢家, 4,5积分)
            __memberStateSortType: number = 1;
            __memberStateDayType: number = 0;
            __memberStateList: Array<Data_HouseMemberStatItem> = null;
            __memberStateBegan: number = 0;
            __memberStateParam: string = "";
            __memStatetotalnum: number = -1;
            __memberStateFloor: number = -1;//查询参数：楼层。-1全部楼层，0：1楼
            __memberStateGroup: number = 0  //0是所有组
            lstPartner: Array<Data_HouseMemberStatItem> = null;

            @BindEvent("tea", 'mod::State::GetStateList')
            async doGetStateList(data: {
                dfid: number, param: string, daytype: number, sorttype: number, clear: boolean, partner: number, group_id: number
                , RecordType: number, timeInterval?: number, timeRange?: number, likeFlag?: number,lowscoreflag:number,roundtype:number
            }) {
                if (!(__teaHouseRole & HouseRoleTable.VIEW_STAT_RECORD_MEMBER)
                    && !(__teaHouseRole & HouseRoleTable.VIEW_MEMBER)) { return; }
                //lw190806:dfid-1全部楼层
                //lw190829:partner-1剔除队长
                data = data || {
                    dfid: -1, param: "", daytype: 0, sorttype: 1, clear: false, partner: 0, group_id: -1, RecordType: -1,
                    timeInterval: 0, timeRange: 1, likeFlag: 0,lowscoreflag:0,roundtype:0
                };
                data.group_id = data.group_id || -1;
                data.daytype = data.daytype || 0;
                //201019：0今天-1昨天-2前天……1昨天2三日累计3七日累计
                data.sorttype = data.sorttype || 0;
                if (data.sorttype == -1) {
                    data.sorttype = this.__memberStateSortType;
                }

                data.clear = data.clear || false;
                data.param = data.param || "";
                data.timeInterval = data.timeInterval || 0;
                data.timeRange = data.timeRange || 1;

                this.__memberStateList = lodash.isEmpty(this.__memberStateList) ? [] : this.__memberStateList;

                if (!lodash.eq(this.__memberStateFloor, data.dfid)
                    || !lodash.eq(this.__memberStateDayType, data.daytype)
                    || !lodash.eq(this.__memberStateSortType, data.sorttype)
                    || !lodash.eq(this.__memberStateParam, data.param)
                    || data.clear) {
                    this.__memberStateFloor = -1;
                    this.__memStatetotalnum = -1;
                    this.__memberStateBegan = 0;
                    this.__memberStateList = [];
                }
                this.__memberStateFloor = data.dfid;
                this.__memberStateDayType = data.daytype;
                this.__memberStateSortType = data.sorttype;
                this.__memberStateParam = data.param;
                this.__memberStateGroup = data.group_id
                if (this.__memStatetotalnum != -1 && this.__memberStateBegan >= this.__memStatetotalnum) {
                    kaayou.emit("tea", 'ui::State::UpdateStat', { list: null, update: false });
                    return;
                }
                //lw190801改为一次拉50条
                let end = this.__memberStateBegan + 50;
                let req: GetHouseMemberStat = {
                    hid: __teaHouseInfo.hid,
                    dfid: this.__memberStateFloor,
                    daytype: this.__memberStateDayType,
                    sorttype: this.__memberStateSortType,
                    pbegin: this.__memberStateBegan,
                    pend: end,
                    searchkey: this.__memberStateParam || '',
                    partner: data.partner,
                    group_id: data.group_id,
                    recordtype: data.RecordType,
                    querytimeinterval: data.timeInterval,
                    querytimerange: data.timeRange,
                    likeflag: data.likeFlag,
                    lowscoreflag:data.lowscoreflag,
                    roundtype:data.roundtype || 0
                };

                kaayou.emit("common", "ui::Loading::Show");
                let info: proto_memberstatistics_res = await kaayou.sendMessage("lobby", houseStatisticsHead.memberstatistics, req, kaayou.MakeResultMessageHead(houseStatisticsHead.memberstatistics));
                kaayou.emit("common", 'ui::Loading::Hide');
                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "获取列表失败！" });
                    kaayou.emit("tea", 'ui::State::UpdateStat', { list: null, update: false });
                    return;
                }

                //this.__memberStateBegan = this.__memberStateBegan + info.items.length;

                if (!info.items || lodash.isEmpty(info.items)) {
                    info.items = [];
                    kaayou.emit("common", 'ui::Toast::Show', { msg: "没有更多数据！" });
                    kaayou.emit("tea", 'ui::State::UpdateStat', { list: null, update: data.clear });
                    return;
                }
                //lw200526去重
                if (info.pbegin == this.__memberStateBegan) {
                    this.__memberStateBegan = this.__memberStateBegan + info.items.length;
                    for (var x in info.items) {
                        let tempItem = info.items[x];
                        let memberStat: Data_HouseMemberStatItem = {
                            bigvalidtimes: tempItem.bigvalidtimes,
                            islike: tempItem.islike,
                            invalidtimes: tempItem.invalidtimes,
                            dayType: data.daytype,
                            sortType: data.sorttype,
                            uid: tempItem.uid,
                            uname: tempItem.uname,
                            uurl: tempItem.uurl,
                            ugender: tempItem.ugender,
                            ujointime: tempItem.ujointime,
                            playtimes: tempItem.playtimes,
                            bwtimes: tempItem.bwtimes,
                            totalscore: tempItem.totalscore,
                            validtimes: tempItem.validtimes,
                            groupindex: tempItem.groupindex
                        }
                        this.__memberStateList.push(memberStat);
                    }
                    kaayou.emit("tea", 'ui::State::UpdateStat', { ...lodash.pick(info, ["likecount", "totalinvalidplaytimes", "totalplaytimes", "totalround", "totalscore", "invalidround"]), list: this.__memberStateList, partner_mems_num: info.partner_mems_num, partner_mems_played_num: info.partner_mems_played_num, update: true });
                }
            }

            @BindEvent("tea", 'mod::TeaHouse::GetPartnerList')
            async getPartnerList(data: { param: string, daytype: number, sorttype: number, clear: boolean, dfid: number }) {
                data = data || { param: "", daytype: 0, sorttype: 1, clear: false, dfid: -1 };
                data.daytype = data.daytype || 0;
                //if (data.daytype == -1) {
                //    data.daytype = this.__memberStateDayType;
                //}
                data.sorttype = data.sorttype || 0;
                if (data.sorttype == -1) {
                    data.sorttype = this.__memberStateSortType;
                }

                data.clear = data.clear || false;
                data.param = data.param || "";

                this.lstPartner = lodash.isEmpty(this.lstPartner) ? [] : this.lstPartner;

                if (!lodash.eq(this.__memberStateDayType, data.daytype)
                    || !lodash.eq(this.__memberStateFloor, data.dfid)
                    || !lodash.eq(this.__memberStateSortType, data.sorttype)
                    || !lodash.eq(this.__memberStateParam, data.param)
                    || data.clear) {
                    this.__memStatetotalnum = -1;
                    this.__memberStateBegan = 0;
                    this.lstPartner = [];
                }
                this.__memberStateDayType = data.daytype;
                this.__memberStateSortType = data.sorttype;
                this.__memberStateParam = data.param;
                this.__memberStateFloor = data.dfid;
                if (this.__memStatetotalnum != -1 && this.__memberStateBegan >= this.__memStatetotalnum) {
                    kaayou.emit("tea", 'ui::TeaHouse::UpdatePartner', { list: null, update: false });
                    return;
                }
                let end = this.__memberStateBegan + 50;
                let req: GetHouseMemberStat = {
                    dfid: this.__memberStateFloor,
                    hid: __teaHouseInfo.hid,
                    daytype: this.__memberStateDayType,
                    sorttype: this.__memberStateSortType,
                    pbegin: this.__memberStateBegan,
                    pend: end,
                    searchkey: this.__memberStateParam || '',
                    partner: 0,
                };
                kaayou.emit("common", "ui::Loading::Show");

                let info: proto_housepartnerlist_res = await kaayou.sendMessage("lobby", houseStatisticsHead.housepartnerlist, req, kaayou.MakeResultMessageHead(houseStatisticsHead.housepartnerlist));
                kaayou.emit("common", 'ui::Loading::Hide');
                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "获取列表失败！" });
                    kaayou.emit("tea", 'ui::TeaHouse::UpdatePartner', { list: null, update: false });
                    return;
                }

                if (info.items.length == 0) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: "没有更多数据！" });
                    kaayou.emit("tea", 'ui::TeaHouse::UpdatePartner', { list: null, update: false });
                    return;
                }

                //lw190909去重
                if (info.pbegin == this.__memberStateBegan) {
                    this.__memberStateBegan = this.__memberStateBegan + info.items.length;
                    for (var x in info.items) {
                        let tempItem = info.items[x];
                        let memberStat: Data_HouseMemberStatItem = {
                            invalidtimes: tempItem.invalidtimes,
                            islike: tempItem.islike,
                            bigvalidtimes: tempItem.bigvalidtimes,
                            dayType: data.daytype,
                            sortType: data.sorttype,
                            uid: tempItem.uid,
                            uname: tempItem.uname,
                            uurl: tempItem.uurl,
                            ugender: tempItem.ugender,
                            ujointime: tempItem.ujointime,
                            playtimes: tempItem.playtimes,
                            bwtimes: tempItem.bwtimes,
                            totalscore: tempItem.totalscore,
                            validtimes: tempItem.validtimes
                        };
                        this.lstPartner.push(memberStat);
                    }
                    let edate = {
                        list: this.lstPartner,
                        update: true
                    }
                    kaayou.emit("tea", 'ui::TeaHouse::UpdatePartner', edate);
                }
            }


            @BindEvent("tea", 'mod::TeaHouse::GameLike')
            async clickGameLike(config: { callback: Function, data: proto_houserecordgamelike }) {

                if (!config)
                    return;

                let { callback, data } = config;

                data.daytype = data.daytype || 0;

                let info = await kaayou.sendMessage("lobby", houseStatisticsHead.houserecordgamelike, data, kaayou.MakeResultMessageHead(houseStatisticsHead.houserecordgamelike))

                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "操作失败！" });
                    callback(false)
                    return;
                }


                callback(true);

            }



            @BindEvent("tea", 'mod::TeaHouse::MemberLike')
            async clickMemberLike(config: { callback: Function, data: proto_houserecorduserlike }) {
                if (!config)
                    return;

                let { callback, data } = config;

                data.daytype = data.daytype || 0;

                let info = await kaayou.sendMessage("lobby", houseStatisticsHead.houserecorduserlike, data, kaayou.MakeResultMessageHead(houseStatisticsHead.houserecorduserlike))

                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "操作失败！" });
                    callback(false)
                    return;
                }


                callback(true);

            }

            @BindEvent("tea", 'mod::TeaHouse::GetPartnerMemberStatisticsTotal')
            async getPartnerMemberStatisticsTotal(data: proto_memberstatisticstotal) {
                data = data || { hid: 0, daytype: 0 };
                data.daytype = data.daytype || 0;
                //if (data.daytype == -1) {
                //    data.daytype = this.__memberStateDayType;
                //}
                kaayou.emit("common", "ui::Loading::Show");
                let info: proto_memberstatisticstotal_res = await kaayou.sendMessage("lobby", houseStatisticsHead.memberstatisticstotal, data, kaayou.MakeResultMessageHead(houseStatisticsHead.memberstatisticstotal));
                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "获取汇总数据失败！" });
                    return;
                }
                kaayou.emit("tea", 'ui::TeaHouse::ShowPartnerMemberStatisticsTotal', info);
            }
        }
    }
    tea.mod.HouseState.getInstance();
}