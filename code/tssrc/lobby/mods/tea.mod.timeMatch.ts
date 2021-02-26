namespace tea {
    const { BindEvent, doBindEvent } = kaayou._decorator;
    export namespace mod {
        export class TimeMatch {
            static __INS__: tea.mod.TimeMatch = null;
            static getInstance(): tea.mod.TimeMatch {
                if (TimeMatch.__INS__ == null) {
                    TimeMatch.__INS__ = new TimeMatch();
                    TimeMatch.__INS__.initMod();
                }
                return TimeMatch.__INS__;
            }
            _data: any[] = [];
            pageStart: number = 0;
            @doBindEvent
            initMod() { }
            //排序方式(0,1 局数, 2,3 大赢家, 4,5积分)
            __tmMineSortType: number = 1;
            __tmMineDayType: number = 0;
            __tmMineList: Array<Data_HouseMemberStatItem> = null;
            __tmMineBegan: number = 0;
            __tmMineParam: string = "";
            __memStatetotalnum: number = -1;
            __tmMineFloor: number = -1;//查询参数：楼层。-1全部楼层，0：1楼
            __tmMineGroup: number = 0  //0是所有组
            lstPartner: Array<Data_HouseMemberStatItem> = null;

            @BindEvent("tea", 'mod::House::GetTMmineRank')
            async doGetStateList(data: { dfid: number, param: string, daytype: number, sorttype: number, clear: boolean, partner: number, group_id: number }) {
                if (!(__teaHouseRole & HouseRoleTable.VIEW_STAT_RECORD_MEMBER)
                    && !(__teaHouseRole & HouseRoleTable.VIEW_MEMBER)) { return; }
                let type = 1
                if (!!data.partner) { //合伙人在战队排名也是调的这个接口
                    type = 2;
                }
                kaayou.emit("common", "ui::Loading::Show");
                let sdata: proto_houseprizeinfo = {
                    hid: __teaHouseInfo.hid, type: type
                }
                let res = await kaayou.sendMessage("lobby", houseTmHead.houseprizeinfo, sdata, kaayou.MakeResultMessageHead(houseTmHead.houseprizeinfo));
                kaayou.emit("common", "ui::Loading::Hide");
                if (res.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: res.msg || "获取奖励配置失败！" });
                    return;
                }
                if (!res.value) {
                    res.value = [];
                }


                data = data || { dfid: -1, param: "", daytype: 0, sorttype: 1, clear: false, partner: 0, group_id: -1 };
                data.group_id = data.group_id || -1;
                data.daytype = data.daytype || 0;
                //lw190718：-1现在表示昨天
                data.sorttype = data.sorttype || 0;
                if (data.sorttype == -1) {
                    data.sorttype = this.__tmMineSortType;
                }

                data.clear = data.clear || false;
                data.param = data.param || "";

                this.__tmMineList = lodash.isEmpty(this.__tmMineList) ? [] : this.__tmMineList;

                if (!lodash.eq(this.__tmMineFloor, data.dfid)
                    || !lodash.eq(this.__tmMineDayType, data.daytype)
                    || !lodash.eq(this.__tmMineSortType, data.sorttype)
                    || !lodash.eq(this.__tmMineParam, data.param)
                    || data.clear) {
                    this.__tmMineFloor = -1;
                    this.__memStatetotalnum = -1;
                    this.__tmMineBegan = 0;
                    this.__tmMineList = [];
                }
                this.__tmMineFloor = data.dfid;
                this.__tmMineDayType = data.daytype;
                this.__tmMineSortType = data.sorttype;
                this.__tmMineParam = data.param;
                this.__tmMineGroup = data.group_id
                if (this.__memStatetotalnum != -1 && this.__tmMineBegan >= this.__memStatetotalnum) {
                    kaayou.emit("tea", 'ui::TimeMatch::memRank', { list: null, prizeArr: res.value, update: false });
                    kaayou.emit("tea", 'ui::TimeMatch::TeamRank', { list: null, prizeArr: res.value, update: false });
                    return;
                }
                //lw190801改为一次拉50条
                let end = this.__tmMineBegan + 50;
                let req: GetHouseMemberStat = {
                    hid: __teaHouseInfo.hid,
                    dfid: this.__tmMineFloor,
                    daytype: this.__tmMineDayType,
                    sorttype: this.__tmMineSortType,
                    pbegin: this.__tmMineBegan,
                    pend: end,
                    searchkey: this.__tmMineParam || '',
                    partner: data.partner,
                    group_id: data.group_id
                };

                interface Res_Data {
                    items: Array<Data_HouseMemberStatItem>
                    hmemnum: number;
                    hmemonlinenum: number;
                    totalnum: number;
                    partner_mems_num: number;
                    partner_mems_played_num: number;
                    pbegin: number,
                    errcode?: Number;
                    msg?: string;
                }
                console.log(res.value);
                kaayou.emit("common", "ui::Loading::Show");
                let info = <Res_Data>await kaayou.sendMessage("lobby", "memberstatistics", req, "ws::Msg::memberstatistics");
                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "获取列表失败！" });
                    kaayou.emit("tea", 'ui::TimeMatch::memRank', { list: null, prizeArr: res.value, update: false });
                    kaayou.emit("tea", 'ui::TimeMatch::TeamRank', { list: null, prizeArr: res.value, update: false });
                    return;
                }
                if (this.__tmMineBegan == info.pbegin) {


                    if (!info.items || lodash.isEmpty(info.items)) {
                        info.items = [];
                        kaayou.emit("common", 'ui::Toast::Show', { msg: "没有更多数据！" });
                    }

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
                            validtimes: tempItem.validtimes,
                            groupindex: tempItem.groupindex,
                            rankIndex: Number(this.__tmMineBegan + Number(x) + 1),
                        }

                        this.__tmMineList.push(memberStat);
                    }
                    this.__tmMineBegan = this.__tmMineBegan + info.items.length;
                }

                kaayou.emit("common", 'ui::Loading::Hide');
                if (!!data.partner) {
                    let edate = {
                        list: this.__tmMineList,
                        prizeArr: res.value,
                        update: true
                    }
                    kaayou.emit("tea", 'ui::TimeMatch::TeamRank', edate);
                    return;
                }
                kaayou.emit("tea", "ui::TimeMatch::memRank", { list: this.__tmMineList, prizeArr: res.value, update: true });
            }




            //排序方式(0,1 局数, 2,3 大赢家, 4,5积分)
            __tmTeamSortType: number = 1;
            __tmTeamDayType: number = 0;
            __tmTeamList: Array<Data_HouseMemberStatItem> = null;
            __tmTeamBegan: number = 0;
            __tmTeamParam: string = "";
            __tmTeamtotalnum: number = -1;
            __tmTeamFloor: number = -1;//查询参数：楼层。-1全部楼层，0：1楼
            __tmTeamGroup: number = 0  //0是所有组
            @BindEvent("tea", 'mod::TeaHouse::GetTeamRankList')
            async getPartnerList(data: { param: string, daytype: number, sorttype: number, clear: boolean, dfid: number }) {

                kaayou.emit("common", "ui::Loading::Show");
                let res = await kaayou.sendMessage("lobby", "houseprizeinfo", { hid: __teaHouseInfo.hid, type: 2 }, "ws::Msg::houseprizeinfo");
                kaayou.emit("common", "ui::Loading::Hide");
                if (res.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: res.msg || "获取奖励配置失败！" });
                    return;
                }
                if (!res.value) {
                    res.value = [];
                }

                data = data || { param: "", daytype: 0, sorttype: 1, clear: false, dfid: -1 };
                data.daytype = data.daytype || 0;
                if (data.daytype == -1) {
                    data.daytype = this.__tmTeamDayType;
                }
                data.sorttype = data.sorttype || 0;
                if (data.sorttype == -1) {
                    data.sorttype = this.__tmTeamSortType;
                }

                data.clear = data.clear || false;
                data.param = data.param || "";

                this.lstPartner = lodash.isEmpty(this.lstPartner) ? [] : this.lstPartner;

                if (!lodash.eq(this.__tmTeamDayType, data.daytype)
                    || !lodash.eq(this.__tmTeamFloor, data.dfid)
                    || !lodash.eq(this.__tmTeamSortType, data.sorttype)
                    || !lodash.eq(this.__tmTeamParam, data.param)
                    || data.clear) {
                    this.__tmTeamtotalnum = -1;
                    this.__tmTeamBegan = 0;
                    this.lstPartner = [];
                }
                this.__tmTeamDayType = data.daytype;
                this.__tmTeamSortType = data.sorttype;
                this.__tmTeamParam = data.param;
                this.__tmTeamFloor = data.dfid;
                if (this.__tmTeamtotalnum != -1 && this.__tmTeamBegan >= this.__tmTeamtotalnum) {
                    kaayou.emit("tea", 'ui::TimeMatch::TeamRank', { list: null, prizeArr: res.value, update: false });
                    return;
                }
                let end = this.__tmTeamBegan + 50;
                let req: GetHouseMemberStat = {
                    dfid: this.__tmTeamFloor,
                    hid: __teaHouseInfo.hid,
                    daytype: this.__tmTeamDayType,
                    sorttype: this.__tmTeamSortType,
                    pbegin: this.__tmTeamBegan,
                    pend: end,
                    searchkey: this.__tmTeamParam || '',
                    partner: 0
                };
                interface Res_Data {
                    items: Array<Data_HouseMemberStatItem>
                    hmemnum: number;
                    hmemonlinenum: number;
                    totalnum: number;
                    errcode?: Number;
                    msg?: string;
                    pbegin: number;
                    pend: number;
                }


                kaayou.emit("common", "ui::Loading::Show");

                let info = <Res_Data>await kaayou.sendMessage("lobby", "housepartnerlist", req, "ws::Msg::housepartnerlist");
                kaayou.emit("common", 'ui::Loading::Hide');
                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "获取列表失败！" });
                    kaayou.emit("tea", 'ui::TimeMatch::TeamRank', { list: null, prizeArr: res.value, update: false });
                    return;
                }

                if (info.items.length == 0) {
                    kaayou.emit("common", 'ui::Loading::Hide');
                    kaayou.emit("common", 'ui::Toast::Show', { msg: "没有更多数据！" });
                    kaayou.emit("tea", 'ui::TimeMatch::TeamRank', { list: null, prizeArr: res.value, update: false });
                    return;
                }

                //lw190909去重
                if (info.pbegin == this.__tmTeamBegan) {

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
                            validtimes: tempItem.validtimes,
                            rankIndex: Number(this.__tmTeamBegan + Number(x) + 1),
                        };
                        this.lstPartner.push(memberStat);

                    }
                    this.__tmTeamBegan = this.__tmTeamBegan + info.items.length;

                    let edate = {
                        list: this.lstPartner,
                        prizeArr: res.value,
                        update: true
                    }
                    kaayou.emit("tea", 'ui::TimeMatch::TeamRank', edate);
                }
            }



            //排行榜列表
            // @BindEvent("tea", 'mod::TeaHouse::ranklist')
            // async doGetRanklist(data: { rank_type: number, time_type: number }) {
            //     kaayou.emit("common", "ui::Loading::Show");
            //     let req: proto_houserankinfoget = {
            //         hid: __teaHouseInfo.hid,
            //         rank_type: data.rank_type,
            //         time_type: data.time_type
            //     }

            //     let info = await kaayou.sendMessage("lobby", houseTmHead.houserankinfoget, req, kaayou.MakeResultMessageHead(houseTmHead.houserankinfoget));
            //     kaayou.emit("common", "ui::Loading::Hide");
            //     if (info.errcode) {
            //         kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "获取失败！" });
            //         return;
            //     }

            // }


                    //排行榜请求
                    __rankListSortType: number = 1;
                    __rankListDayType: number = 0;
                    __rankListList: Array<proto_houserankinfoget_res> = null;
                    __rankListBegan: number = 0;
                    __rankListParam: string = "";
                    __rankListtotalnum: number = -1;
                    @BindEvent("tea", 'mod::TeaHouse::GetRanklist')
                    async getrankList(data: { daytype: number, sorttype: number, clear: boolean ,authNum:number}) {
        
                        // kaayou.emit("common", "ui::Loading::Show");
                        // let res = await kaayou.sendMessage("lobby", houseTmHead.houserankinfoget, { hid: __teaHouseInfo.hid, type: 2 }, "ws::Msg::houseprizeinfo");
                        // kaayou.emit("common", "ui::Loading::Hide");
                        // if (res.errcode) {
                        //     kaayou.emit("common", 'ui::Toast::Show', { msg: res.msg || "获取奖励配置失败！" });
                        //     return;
                        // }
                        // if (!res.value) {
                        //     res.value = [];
                        // }
        
                        data = data || {  daytype: 0, sorttype: 1, clear: false,authNum:1};
                        data.daytype = data.daytype || 0;
                        // if (data.daytype == -1) {
                        //     data.daytype = this.__rankListDayType;
                        // }
                        data.sorttype = data.sorttype || 0;
                        if (data.sorttype == -1) {
                            data.sorttype = this.__rankListSortType;
                        }
        
                        data.clear = data.clear || false;
        
                        this.__rankListList = lodash.isEmpty(this.__rankListList) ? [] : this.__rankListList;
        
                        if (!lodash.eq(this.__rankListDayType, data.daytype)
                           
                            || !lodash.eq(this.__rankListSortType, data.sorttype)
                            || data.clear) {
                            this.__rankListtotalnum = -1;
                            this.__rankListBegan = 0;
                            this.__rankListList = [];
                        }
                        this.__rankListDayType = data.daytype;
                        this.__rankListSortType = data.sorttype;
                        if (this.__rankListtotalnum != -1 && this.__rankListBegan >= this.__rankListtotalnum) {
                            kaayou.emit("tea", 'ui::ranklist::updateList', { list: null, update: false });
                            return;
                        }
                        let end = this.__rankListBegan + 50;
                        let req: proto_houserankinfoget = {
                            hid: __teaHouseInfo.hid,
                            time_type: this.__rankListDayType,
                            rank_type: this.__rankListSortType,
                            pbegin: this.__rankListBegan,
                            pend: end,
                        };
                        interface Res_Data {
                            user_item: Array<proto_houserankinfoget_res>
                            errcode?: Number;
                            msg?: string;
                            pbegin: number;
                            pend: number;
                        }
        
        
                        kaayou.emit("common", "ui::Loading::Show");
                        // 
                        let info = <Res_Data>await kaayou.sendMessage("lobby", houseTmHead.houserankinfoget, req, kaayou.MakeResultMessageHead(houseTmHead.houserankinfoget));
                        kaayou.emit("common", 'ui::Loading::Hide');
                        if (info.errcode) {
                            kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "获取列表失败！" });
                            kaayou.emit("tea", 'ui::ranklist::updateList', { list: null, update: false });
                            return;
                        }
        
                        if (!info.user_item || info.user_item.length == 0) {
                            kaayou.emit("common", 'ui::Loading::Hide');
                            kaayou.emit("common", 'ui::Toast::Show', { msg: "没有更多数据！" });
                            kaayou.emit("tea", 'ui::ranklist::updateList', { list: null, update: false });
                            return;
                        }
        
                        if (info.pbegin == this.__rankListBegan) {
        
                            for (var x in info.user_item) {
                                let tempItem = info.user_item[x];
                                let memberStat: proto_houserankinfoget_res = {
                                    uid: tempItem.uid,
                                    uname: tempItem.uname,
                                    uurl: tempItem.uurl,
                                    ugender: tempItem.ugender,
                                    rank_num:tempItem.rank_num,
                                    rankIndex: Number(this.__rankListBegan + Number(x) + 1),
                                    authNum:data.authNum,
                                };
                                this.__rankListList.push(memberStat);
        
                            }
                            this.__rankListBegan = this.__rankListBegan + info.user_item.length;
        
                            // let edate = {
                            //     list: this.lstPartner,
                            //     prizeArr: res.value,
                            //     update: true
                            // }
                            // kaayou.emit("tea", 'ui::TimeMatch::TeamRank', edate);
                            kaayou.emit("tea", 'ui::ranklist::updateList', { list: this.__rankListList, update: true });
                        }
                    }
        


            //排行榜设置获取
            @BindEvent("tea", 'mod::TeaHouse::ranklistget')
            async doRankListGet(data?: { isrank: boolean }) {
                kaayou.emit("common", "ui::Loading::Show");
                let req: IBASE_HOUSEREQ = {
                    hid: __teaHouseInfo.hid,
                }
                let info = await kaayou.sendMessage("lobby", houseTmHead.houserankget, req, kaayou.MakeResultMessageHead(houseTmHead.houserankget));
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "获取失败！" });
                    return;
                }
                if (data) {
                    console.log("需要先调这个。再来看显示了几中排行榜。如果一个都没有直接return");
                    if (info.rank_round & 1 || info.rank_winer & 1 || info.rank_record & 1 || tea.mod._isMaster()) {//"{"rank_round":6,"rank_winer":4,"rank_record":6,"rank_open":true}"
                        kaayou.emit("tea", "ui::RankListPanel::Show", info);
                    } else {
                        kaayou.emit("common", 'ui::Toast::Show', { msg: "未开启任何排行榜！" });
                    }
                    return;
                }
                kaayou.emit("tea", "ui::RankListSetPanel::Show", info)
            }


            //排行榜设置
            @BindEvent("tea", 'mod::TeaHouse::ranklistset')
            async doRankListSet(data: { rank_round: number, rank_winer: number, rank_record: number, rank_open: boolean }) {
                kaayou.emit("common", "ui::Loading::Show");
                let req: proto_houserankset = {
                    hid: __teaHouseInfo.hid,
                    rank_open: data.rank_open,
                    rank_round: data.rank_round,
                    rank_winer: data.rank_winer,
                    rank_record: data.rank_record
                }
                let info = await kaayou.sendMessage("lobby", houseTmHead.houserankset, req, kaayou.MakeResultMessageHead(houseTmHead.houserankset));
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "获取失败！" });
                    return;
                }
                kaayou.emit("common", 'ui::Toast::Show', { msg: "设置成功" });
                kaayou.emit("tea", "ui::RankListSetPanel::Hide")
            }


            //排行榜按钮显示与隐藏
            @BindEvent("lobby", "ws::Msg::houserankset_ntf")
            updateTeaRankOpenStatus(data) {
                if (!tea || !tea.mod || !tea.mod.__teaHouseInfo || !tea.mod.__teaHouseInfo.hid || __teaHouseInfo.hid != data.hid) {
                    return;
                }
                console.log(data);
                __teaHouseInfo.rank_open = data.rank_open;
                kaayou.emit("tea","ui::TeaHouse::UpdateInfo",__teaHouseInfo)
            }


        }
    }
    tea.mod.TimeMatch.getInstance();
}