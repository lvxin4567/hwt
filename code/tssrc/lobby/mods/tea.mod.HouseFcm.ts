namespace tea {
    const { BindEvent, doBindEvent } = kaayou._decorator;


    export interface ITH_DATA_FCMPlayerRecord {
        items: Array<FCMPlayerRecordItem>,
    }
    //防沉迷玩家记录item
    export interface FCMPlayerRecordItem {
        id: number,
        aftvitamin: number,
        befvitamin: number,
        change_vitamin: number,
        opt_name: string,
        opt_type: string,
        updatedtime: number,
        uid: number,
        index: number,
    }


    export interface partberFloorHistoryDetaiItem{
        uid:number,
        uname:string,
        uurl:string,
        ugender:number,
        validtimes:number,
        bigvalidtimes:number,
        roundprofit:number,
        subordinateprofit:number,
        totalprofit:number,
        royalty:number,
        isjunior:boolean,
        changeprofit:number,
    }

    export interface ITH_DATA_FCMCOUNT {
        items: Array<Data_HouseCountItem>,
    }
   
    //--比赛分统计item"{"items":[{"vitamincost":0,"vitaminleft":0,"vitaminminus":0,"beginat":1565222400,"endat":1565308799}]}"
    export interface Data_HouseCountItem {
        beginat: number,
        endat: number,
        vitamincost: number,
        vitaminleft: number,
        vitaminminus: number,
        daytype:number,
        vitaminpayment:number,   //收支统计
    }
    //比赛分仓库-----------------------------------------------------
    export interface Data_FcmWarehouseRes {
        items: Array<FCMPlayerRecordItem>,
        total: number  // 总数
        pool_left: number  // 剩余
        pool_used: number //已使用
        wait_join: number  //待入账
        total_count: number  //记录总数
        last_should_pay:number //昨日应划
        last_paied:number      //昨日实划
        earn_sum:number        //净扣除总额
    }



    
    //--队长统计item
    export interface Data_HousePartnerCountItem {
        uid: number,
        uname: string,
        uurl: string,
        ugender: number,
        vitamincost: number,
        vitaminleft: number,
        vitaminminus: number,
        vitaminwinlose: number,
        belong: number,
        dayType:number
    }

    export interface Data_HousePartnerTotalInfo {
        totalvitamincost: number,
        totalvitamincostbw: number,
        totalvitamincostround: number,
        totalvitaminleft: number,
        totalvitaminminus: number,
        totalvitaminwinlose: number,
    }

    export namespace mod {

        export class Fcm {
            static __INS__: tea.mod.Fcm = null;
            static getInstance(): tea.mod.Fcm {
                if (Fcm.__INS__ == null) {
                    Fcm.__INS__ = new Fcm();
                    Fcm.__INS__.initMod();
                }
                return Fcm.__INS__;
            }
            @doBindEvent
            initMod() { }

            _fcmPlayerFcmRecordBegan: number = 0;
            __fcmPlayerFcmRecordList: Array<FCMPlayerRecordItem> = [];
            @BindEvent("tea", "mod::TeaHouse::GetPlayerFcmRecord")
            async getPlayerFcmRecord(data: { uid: number, clear: boolean }) {

                this.__fcmPlayerFcmRecordList = lodash.isEmpty(this.__fcmPlayerFcmRecordList) ? [] : this.__fcmPlayerFcmRecordList;
                if (data.clear) {
                    this.__fcmPlayerFcmRecordList = [];
                    this._fcmPlayerFcmRecordBegan = 0;
                }
                let req :proto_housevitaminsetrecords = {
                    hid: __teaHouseInfo.hid,
                    uid: data.uid,
                    start: this._fcmPlayerFcmRecordBegan,
                    count: 50
                }

                kaayou.emit("common", "ui::Loading::Show");
                let info = await kaayou.sendMessage("lobby", houseFcmMsgHead.housevitaminsetrecords, req, kaayou.MakeResultMessageHead(houseFcmMsgHead.housevitaminsetrecords));
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "操作失败！" });
                    kaayou.emit("tea", 'ui::Fcm::updatePlayerRecordList', { list: [], update: false });
                    return;
                }

                for (var x in info.items) {
                    let tempItem = info.items[x];
                    let num = data.clear ? Number(x) : Number((this._fcmPlayerFcmRecordBegan + Number(x)))
                    let model: FCMPlayerRecordItem = {
                        id: tempItem.id,
                        aftvitamin: tempItem.aftvitamin,
                        befvitamin: tempItem.befvitamin,
                        change_vitamin: tempItem.change_vitamin,
                        opt_name: tempItem.opt_name,
                        opt_type: tempItem.opt_type,
                        updatedtime: tempItem.updatedtime,
                        uid: tempItem.uid,
                        index: num
                    }
                    this.__fcmPlayerFcmRecordList.push(model);
                }
                this._fcmPlayerFcmRecordBegan += info.items.length;

                kaayou.emit("tea", 'ui::Fcm::updatePlayerRecordList', { list: this.__fcmPlayerFcmRecordList, curFcmNum: info.current_vitamin, uname: info.uname, update: true });
            }
            /**-------------------------------------------------------------防沉迷设置  -------------------------------------------------------------------- */
            /**-------------------------------------------------------------生效范围  -------------------------------------------------------------------- */
            /**-------------------------------------------------------------比赛分管理  -------------------------------------------------------------------- */
            /**-------------------------------------------------------------比赛分统计  -------------------------------------------------------------------- */
            //比赛分统计清零 清零同时会返回今天的记录
            @BindEvent("tea", "mod::teahouse::reset")
            async doResetFcmCount() {
                // if (!(__teaHouseRole & HouseRoleTable.VIEW_MEMBER)) { return; }
                kaayou.emit("common", "ui::Loading::Show");
                let sdata : IBASE_HOUSEREQ = {
                    hid: __teaHouseInfo.hid
                }
                let info = await kaayou.sendMessage("lobby", houseFcmMsgHead.housevitaminstatisticsclear, sdata, kaayou.MakeResultMessageHead(houseFcmMsgHead.housevitaminstatisticsclear));
                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "获取列表失败！" });
                    return;
                }
                if (!info.items || lodash.isEmpty(info.items)) {
                    info.items = [];
                    kaayou.emit("common", 'ui::Toast::Show', { msg: "没有更多数据！" });
                }
                this._fcmCountList = [];
                for (var x in info.items) {
                    let tempItem = info.items[x];
                    let memberStat: Data_HouseCountItem = {
                        vitamincost: tempItem.vitamincost,
                        vitaminleft: tempItem.vitaminleft,
                        vitaminminus: tempItem.vitaminminus,
                        beginat: tempItem.beginat,
                        endat: tempItem.endat,
                        daytype:0,
                        vitaminpayment:tempItem.vitaminpayment
                    }
                    this._fcmCountList.push(memberStat);
                }
                kaayou.emit("common", 'ui::Loading::Hide');
                kaayou.emit("tea", 'ui::Fcm::updateFcmCountList', { list: this._fcmCountList, update: true });
            }

            //比赛分统计列表  没有分页
            _fcmCountDayType: number = 0;
            _fcmCountList: Array<Data_HouseCountItem> = null;
            _fcmCountBegan: number = 0;
            _fcmCounttalnum: number = -1;
            @BindEvent("tea", "mod::teahouse::getFcmCountList")
            async dogetFcmCountList(data: { daytype: number, clear: boolean }) {
                // if (!(__teaHouseRole & HouseRoleTable.VIEW_MEMBER)) { return; }
                data = data || { daytype: 0, clear: false };
                data.daytype = data.daytype || 0;
                data.clear = data.clear || false;

                this._fcmCountList = lodash.isEmpty(this._fcmCountList) ? [] : this._fcmCountList;


                if (!lodash.eq(this._fcmCountDayType, data.daytype)
                    || data.clear) {
                    this._fcmCounttalnum = -1;
                    this._fcmCountList = [];
                }
                this._fcmCountDayType = data.daytype;
                let req: GetHouseVpCountREQ = {
                    hid: __teaHouseInfo.hid,
                    selecttime: data.daytype,
                }
                kaayou.emit("common", "ui::Loading::Show");
                let info = await kaayou.sendMessage("lobby", houseFcmMsgHead.housevitaminstatistics, req, kaayou.MakeResultMessageHead(houseFcmMsgHead.housevitaminstatistics));
                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "获取列表失败！" });
                    kaayou.emit("tea", 'ui::Fcm::updateFcmCountList', { list: null, update: false });
                    return;
                }
                if (!info.items || lodash.isEmpty(info.items)) {
                    info.items = [];
                    kaayou.emit("common", 'ui::Toast::Show', { msg: "没有更多数据！" });
                }
                this._fcmCountList = [];
                for (var x in info.items) {
                    let tempItem = info.items[x];
                    let memberStat: Data_HouseCountItem = {
                        vitamincost: tempItem.vitamincost,
                        vitaminleft: tempItem.vitaminleft,
                        vitaminminus: tempItem.vitaminminus,
                        beginat: tempItem.beginat,
                        endat: tempItem.endat,
                        daytype:data.daytype,
                        vitaminpayment:tempItem.vitaminpayment,
                    }
                    this._fcmCountList.push(memberStat);
                }



                kaayou.emit("common", 'ui::Loading::Hide');
                kaayou.emit("tea", 'ui::Fcm::updateFcmCountList', { list: this._fcmCountList, update: true });
            }



            /**-------------------------------------------------------------比赛分仓库  -------------------------------------------------------------------- */
            //比赛分仓库的充值和提取
            @BindEvent("tea", "mod::TeaHouse::WareHouseRw")
            async doWareHouseRw(data: { value: number }) {
                if (lodash.isEmpty(data)) { return; }
                if (lodash.isNumber(data.value)) {
                    if (!data.value) {
                        kaayou.emit("common", "ui::Toast::Show", { msg: "请输入不为0的正确数字！谢谢~~~" });
                        return;
                    }
                } else {
                    kaayou.emit("common", "ui::Toast::Show", { msg: "请输入正确数字！谢谢~~~" });
                    return;
                }

                kaayou.emit("common", "ui::Loading::Show");
                let sdata:proto_housevitaminpooladd = {
                    hid: __teaHouseInfo.hid, 
                    value: Number(data.value)
                }
                let info = await kaayou.sendMessage("lobby", houseFcmMsgHead.housevitaminpooladd, sdata, kaayou.MakeResultMessageHead(houseFcmMsgHead.housevitaminpooladd))
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", "ui::Toast::Show", { msg: info.msg || "操作失败！" });
                    return;
                }
                //充值成功之后需要去刷新界面上的仓库数值
                kaayou.emit("common", "ui::Toast::Show", { msg: "操作成功！" });
                // kaayou.emit("tea", "ui::WareHousePopPanel::Hide");
                // this.doGetWarehouseList({ page: 1, clear: true });
            }

            //比赛分仓库列表  op 上一步和下一步
            _fcmeachCount: number = 8 //每一页多少调
            _fcmWhStart: number = 0
            _fcmWhtotle: number = 0
            @BindEvent("tea", "mod::teahouse::warehouseList")
            async doGetWarehouseList(data: { page: number, clear: boolean }) {

                this._fcmWhStart = (data.page - 1) * this._fcmeachCount
                let req : proto_housevitaminpoollog = {
                    hid: __teaHouseInfo.hid,
                    start: this._fcmWhStart,
                    count: this._fcmeachCount,
                }
                let info = await kaayou.sendMessage("lobby", houseFcmMsgHead.housevitaminpoollog, req, kaayou.MakeResultMessageHead(houseFcmMsgHead.housevitaminpoollog))
                if (info.errcode) {
                    kaayou.emit("common", "ui::Toast::Show", { msg: info.msg || "操作失败！" });
                    return;
                }
                this._fcmWhtotle = info.total_count
                // this._fcmWhStart += this._fcmeachCount;
                let totalPage = Math.ceil((this._fcmWhtotle) / this._fcmeachCount);
                kaayou.emit("tea", "ui::Fcm::updateWareHouseList", { data: info, totalPage: totalPage, curpage: data.page })
            }

            /**-------------------------------------------------------------队长统计  -------------------------------------------------------------------- */
            //获取队长名下玩家的比赛分统计
            //排序方式(0,1 总扣除, 2,3 玩家剩余, 4,5负数总额)
            _fcmPartnerCountSortType: number = 1;
            _fcmPartnerCountDayType: number = 0;
            _fcmPartnerCountList: Array<Data_HousePartnerCountItem> = null;
            _fcmPartnerCountBegan: number = 0;
            _fcmPartnerCountKeyWord: string = "";
            _fcmPartnerCounttalnum: number = -1;

            lstPartner: Array<Data_HousePartnerCountItem> = null;
            _fcmPartnerSumInfo: Data_HousePartnerTotalInfo = null;

            @BindEvent("tea", 'mod::Fcm::GetMemInPartnerList')
            async doGetStateList(data: { param: string, daytype: number, sorttype: number, clear: boolean, partner: number, isPop?: boolean }) {
                // if (!(__teaHouseRole & HouseRoleTable.VIEW_MEMBER)) { return; }

                data = data || { param: "", daytype: 0, sorttype: 1, clear: false, partner: 0 };
                data.daytype = data.daytype || 0;
                data.sorttype = data.sorttype || 0;
                if (data.sorttype == -1) {
                    data.sorttype = this._fcmPartnerCountSortType;
                }
                data.clear = data.clear || false;
                data.param = data.param || "";

                this._fcmPartnerCountList = lodash.isEmpty(this._fcmPartnerCountList) ? [] : this._fcmPartnerCountList;


                if (!lodash.eq(this._fcmPartnerCountDayType, data.daytype)
                    || !lodash.eq(this._fcmPartnerCountSortType, data.sorttype)
                    || !lodash.eq(this._fcmPartnerCountKeyWord, data.param)
                    || data.clear) {
                    this._fcmPartnerCounttalnum = -1;
                    this._fcmPartnerCountBegan = 0;
                    this._fcmPartnerCountList = [];
                }
                this._fcmPartnerCountDayType = data.daytype;
                this._fcmPartnerCountSortType = data.sorttype;
                this._fcmPartnerCountKeyWord = data.param;
                if (this._fcmPartnerCounttalnum != -1 && this._fcmPartnerCountBegan >= this._fcmPartnerCounttalnum) {
                    if (!!data.isPop) {
                        kaayou.emit("tea", "ui::Fcm::UpdatePartnerMemberPop", { list: null, update: false, totalInfo: null })
                    } else {
                        kaayou.emit("tea", 'ui::FcmPartnerCount::UpdateCount', { list: null, update: false, totalInfo: null });
                    }

                    return;
                }
                //请求队长名下玩家parm
                let end = this._fcmPartnerCountBegan + 50;
                let req: GetHouseVpPartnerREQ = {
                    hid: __teaHouseInfo.hid,
                    selecttime: this._fcmPartnerCountDayType,
                    sorttype: this._fcmPartnerCountSortType,
                    pbeg: this._fcmPartnerCountBegan,
                    pend: end,
                    searchkey: this._fcmPartnerCountKeyWord || '',
                    partner: data.partner,
                };
                kaayou.emit("common", "ui::Loading::Show");
                let info = await kaayou.sendMessage("lobby", houseFcmMsgHead.housepartnervitaminstatistics, req, kaayou.MakeResultMessageHead(houseFcmMsgHead.housepartnervitaminstatistics));
                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "获取列表失败！" });
                    if (!!data.isPop) {
                        kaayou.emit("tea", "ui::Fcm::UpdatePartnerMemberPop", { list: null, update: false, totalInfo: null })
                    } else {
                        kaayou.emit("tea", 'ui::FcmPartnerCount::UpdateCount', { list: null, update: false, totalInfo: null });
                    }
                    return;
                }
                let _fcmPartnerSumInfo: Data_HousePartnerTotalInfo = {
                    totalvitamincost: 0,
                    totalvitamincostbw: 0,
                    totalvitamincostround: 0,
                    totalvitaminleft: 0,
                    totalvitaminminus: 0,
                    totalvitaminwinlose: 0,
                }
                if (info.pbeg == this._fcmPartnerCountBegan) {
                    // this._fcmPartnerCounttalnum= info.totalnum; //查询条数
                    this._fcmPartnerCountBegan = this._fcmPartnerCountBegan + info.items.length;
                    //this._fcmPartnerCountBegan = Math.min(this._fcmPartnerCountBegan, this._fcmPartnerCounttalnum);
                    if (!info.items || lodash.isEmpty(info.items)) {
                        info.items = [];
                        kaayou.emit("common", 'ui::Toast::Show', { msg: "没有更多数据！" });
                    }

                    for (var x in info.items) {
                        let tempItem = info.items[x];
                        let memberStat: Data_HousePartnerCountItem = {
                            uid: tempItem.uid,
                            uname: tempItem.uname,
                            uurl: tempItem.uurl,
                            ugender: tempItem.ugender,
                            vitamincost: tempItem.vitamincost,
                            vitaminleft: tempItem.vitaminleft,
                            vitaminminus: tempItem.vitaminminus,
                            vitaminwinlose: tempItem.vitaminwinlose,
                            belong: data.partner,
                            dayType:data.daytype
                        }
                        this._fcmPartnerCountList.push(memberStat);
                    }

                    _fcmPartnerSumInfo.totalvitamincost = info.totalvitamincost
                    _fcmPartnerSumInfo.totalvitamincostbw = info.totalvitamincostbw;
                    _fcmPartnerSumInfo.totalvitamincostround = info.totalvitamincostround;
                    _fcmPartnerSumInfo.totalvitaminleft = info.totalvitaminleft;
                    _fcmPartnerSumInfo.totalvitaminminus = info.totalvitaminminus;
                    _fcmPartnerSumInfo.totalvitaminwinlose = info.totalvitaminwinlose;
                }
                kaayou.emit("common", 'ui::Loading::Hide');
                if (!!data.isPop) {
                    kaayou.emit("tea", "ui::Fcm::UpdatePartnerMemberPop", { list: this._fcmPartnerCountList, update: true, totalInfo: _fcmPartnerSumInfo })
                } else {
                    kaayou.emit("tea", 'ui::FcmPartnerCount::UpdateCount', { list: this._fcmPartnerCountList, update: true, totalInfo: _fcmPartnerSumInfo });
                }
            }

            // _fcmPlayerDetailList: Array<Data_HousePartnerCountItem> = null;
            // _fcmPlayerDetailBegan: number = 0
            // _fcmPlayerDetailtalnum: number = -1
            // @BindEvent("tea", "mod::Fcm::PlayerDetail")
            // async doGetFcmDetailList(data: { clear: boolean }) {
            //     if (!(__teaHouseRole & HouseRoleTable.VIEW_MEMBER)) { return; }
            //     this._fcmPlayerDetailList = lodash.isEmpty(this._fcmPlayerDetailList) ? [] : this._fcmPlayerDetailList;
            //     if (data.clear) {
            //         this._fcmPlayerDetailtalnum = -1;
            //         this._fcmPlayerDetailBegan = 0;
            //         this._fcmPlayerDetailList = [];
            //     }

            //     if (this._fcmPlayerDetailtalnum != -1 && this._fcmPlayerDetailBegan >= this._fcmPlayerDetailtalnum) {
            //         kaayou.emit("tea", 'ui::Fcm::updatePlayerPlzList', { list: null, update: false });
            //         return;
            //     }

            //     let end = this._fcmPlayerDetailBegan + 50;
            //     // let req: GetHouseVpCountREQ = {
            //     //     hid: __teaHouseInfo.hid,
            //     //     // pend: end,
            //     //     // pbegin: this._fcmCountBegan
            //     // }
            //     let req = {
            //         pbegin: this._fcmPlayerDetailBegan,
            //         pend: end,
            //         uid: "",

            //     }
            //     kaayou.emit("common", "ui::Loading::Show");
            //     let info = await kaayou.sendMessage("lobby", "housevitaminstatistics", {}, "ws::Msg::housevitaminstatistics");
            //     if (info.errcode) {
            //         kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "获取列表失败！" });
            //         kaayou.emit("tea", 'ui::Fcm::updatePlayerPlzList', { list: null, update: false });
            //         return;
            //     }
            //     this._fcmPlayerDetailBegan += info.items.length;
            //     if (!info.items || lodash.isEmpty(info.items)) {
            //         info.items = [];
            //         kaayou.emit("common", 'ui::Toast::Show', { msg: "没有更多数据！" });
            //     }

            //     for (var x in info.items) {
            //         let tempItem = info.items[x];
            //         let memberStat: Data_HouseCountItem = {
            //             vitamincost: tempItem.vitamincost,
            //             vitaminleft: tempItem.vitaminleft,
            //             vitaminminus: tempItem.vitaminminus,
            //             beginat: tempItem.beginat,
            //             endat: tempItem.endat
            //         }
            //         this._fcmCountList.push(memberStat);
            //     }
            //     kaayou.emit("common", 'ui::Loading::Hide');
            //     kaayou.emit("tea", 'ui::Fcm::updatePlayerPlzList', { list: this._fcmCountList, update: true });
            // }


            @BindEvent("tea", 'mod::Fcm::Set')
            async setTiredValue(data:proto_housevitaminset) {
                kaayou.emit("common", "ui::Loading::Show");
                let info = await kaayou.sendMessage("lobby", houseFcmMsgHead.housevitaminset, data, kaayou.MakeResultMessageHead(houseFcmMsgHead.housevitaminset));
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "操作失败！" });
                    return;
                } else {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "保存成功！" });
                }
            }

            @BindEvent("tea", 'mod::Fcm::Give')
            async Give(data: proto_housevitaminsend) {
                kaayou.emit("common", "ui::Loading::Show");
                let info = await kaayou.sendMessage("lobby", houseFcmMsgHead.housevitaminsend, data, kaayou.MakeResultMessageHead(houseFcmMsgHead.housevitaminsend));
                kaayou.emit("common", 'ui::Loading::Hide');
                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "赠送比赛分失败！" });
                    return;
                }
                kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "赠送比赛分成功！" });
            }

            @BindEvent("lobby", 'ws::Msg::housevitaminset_ntf')
            onHouseVitaminSet(data) {
                if (!!!tea.mod.__teaHouseInfo) {
                    return;
                }
                if (data.hid != tea.mod.__teaHouseInfo.hid) {
                    return
                }
                if (!!!lobby.mod.User.getInstance().getUserInfo() ) {
                    return;
                }
                let uid = lobby.mod.User.__INS__.getUserInfo().uid;
                if (!!data.uid && uid == data.uid) {
                    __teaHouseInfo.vitamin = data.value;
                }
                kaayou.emit("tea", 'ui::TeaHouse::UpdateTiredValue', data);
            }

            //防沉迷设置
            @BindEvent("tea", "mod::TeaHouse::GetAntiIndulgence")
            async getAntiIndulgence(data:IBASE_HOUSEREQ) {
                kaayou.emit("common", "ui::Loading::Show");
                let info = await kaayou.sendMessage("lobby", houseFcmMsgHead.housevitamininfo, data, kaayou.MakeResultMessageHead(houseFcmMsgHead.housevitamininfo))
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", "ui::Toast::Show", { msg: info.msg || "获取防沉迷配置失败！" });
                    kaayou.emit("tea", "ui::TeaHouse::UpdateTiredBlock");
                    return;
                }
                tea.mod.__teaHouseInfo.disablejuniorv=info.disablejuniorv;
                tea.mod.__teaHouseInfo.isgamepause = info.gamepause;
                tea.mod.__teaHouseInfo.ismembersend=info.membersend;
                tea.mod.__teaHouseInfo.ispartnerhide = info.partnerhide;
                tea.mod.__teaHouseInfo.ispartnermodi = info.partnermodi;
                tea.mod.__teaHouseInfo.isvitamin = info.status;
                tea.mod.__teaHouseInfo.isvitaminhide = info.adminhide;
                tea.mod.__teaHouseInfo.isvitaminmodi = info.adminmodi;
                tea.mod.__teaHouseInfo.isdeductconfig = info.deductconfig;
                tea.mod.__teaHouseInfo.iseffectconfig = info.effectconfig;
                tea.mod.__teaHouseInfo.reward_balanced = info.reward_balanced;
                kaayou.emit("tea", "ui::TeaHouse::UpdateTiredBlock");
            }

            //防沉迷设置
            @BindEvent("tea", "mod::TeaHouse::SetAntiIndulgence")
            async setAntiIndulgence(data:proto_housevitaminvalues) {
                kaayou.emit("common", "ui::Loading::Show");
                let info = await kaayou.sendMessage("lobby", houseFcmMsgHead.housevitaminvalues, data, kaayou.MakeResultMessageHead(houseFcmMsgHead.housevitaminvalues))
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", "ui::Toast::Show", { msg: info.msg || "操作失败！" });
                    kaayou.emit("tea", "ui::TeaHouse::UpdateTiredBlock");
                    return;
                }
                kaayou.emit("common", "ui::Toast::Show", { msg: info.msg || "保存成功！" });
                //会收到housevitaminstatus_ntf，不用自己改值
            }

            _fcmMemberList=[];
            //获取可调整成员列表
            @BindEvent("tea", 'mod::TeaHouse::GetFcmMember')
            async getTiredMember(data: IBASE_HOUSEREQ) {
                this._fcmMemberList = lodash.isEmpty(this._fcmMemberList) ? [] : this._fcmMemberList;
                kaayou.emit("common", "ui::Loading::Show");
                let info = await kaayou.sendMessage("lobby", houseFcmMsgHead.housevitaminbatchsetlist, data, kaayou.MakeResultMessageHead(houseFcmMsgHead.housevitaminbatchsetlist));
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "获取列表失败！" });
                    kaayou.emit("tea", 'ui::FcmMember::ShowData', { list: null });
                    return;
                }
                this._fcmMemberList=info.items;
                kaayou.emit("tea", 'ui::FcmMember::ShowData', { list: this._fcmMemberList });
            }

            //一键清除比赛分
            @BindEvent("tea", "mod::Fcm::Clear")
            async clearFcm(data:IBASE_HOUSEREQ) {
                kaayou.emit("common", "ui::Loading::Show");
                let info = await kaayou.sendMessage("lobby", houseFcmMsgHead.housevitaminclear, data, kaayou.MakeResultMessageHead(houseFcmMsgHead.housevitaminclear))
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", "ui::Toast::Show", { msg: info.msg || "操作失败！" });
                    return;
                }
                kaayou.emit("common", "ui::Toast::Show", { msg: info.msg || "操作成功！" });
            }


            //队长历史删除楼层比赛分详情
            @BindEvent("tea", "mod::FcmPartner::DeletedHistory")
            async showDeletedFloorHistory() {
                if (!__teaHouseInfo || !__teaHouseInfo.hid) {
                    return;
                }
                kaayou.emit("common", "ui::Loading::Show");
                let sdata:IBASE_HOUSEREQ = {
                    hid:__teaHouseInfo.hid
                }
                let info = await kaayou.sendMessage("lobby", houseFcmMsgHead.housepartnerfloorhistorystatistics, sdata, kaayou.MakeResultMessageHead(houseFcmMsgHead.housepartnerfloorhistorystatistics))
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", "ui::Toast::Show", { msg: info.msg || "操作失败！" });
                    return;
                }
                kaayou.emit("tea","ui::PropotionHistoryPanel::Show",info);
            }

            //圈主点击详情的时候弹出的删除楼层比赛分数据
            // 
            // _deletedDetailBegan :number
            // @BindEvent("tea","mod::teahouseFcm:getDeletedFloordetail")
            // async getDeletedFloordetail(data:{dfid:number,fid:number}){
            //     if (!__teaHouseInfo || !__teaHouseInfo.hid) {
            //         return;
            //     }
            //     kaayou.emit("common", "ui::Loading::Show");
            //     let info = await kaayou.sendMessage("lobby", "housepartnerfloorhistorydtrailstatistics", {hid:__teaHouseInfo.hid,dfid:data.dfid,fid:data.fid}, "ws::Msg::housepartnerfloorhistorydtrailstatistics")
            //     kaayou.emit("common", "ui::Loading::Hide");
            //     if (info.errcode) {
            //         kaayou.emit("common", "ui::Toast::Show", { msg: info.msg || "操作失败！" });
            //         return;
            //     }
            //     kaayou.emit("tea", 'ui::PartnerDelatedFloorDetaiPop::Show')
            // }


            _deletedDetailBegan: number = 0;
            _deletedDetailList: Array<partberFloorHistoryDetaiItem> = [];
            @BindEvent("tea", "mod::teahouseFcm:getDeletedFloordetail")
            async getdeletedDetailList(data:{dfid:number,fid:number,clear:boolean}) {

                this._deletedDetailList = lodash.isEmpty(this._deletedDetailList) ? [] : this._deletedDetailList;
                if (data.clear) {
                    this._deletedDetailList = [];
                    this._deletedDetailBegan = 0;
                }
                let req : proto_housepartnerfloorhistorydtrailstatistics = {
                    hid: __teaHouseInfo.hid,
                    dfid: data.dfid,
                    fid:data.fid,
                    start: this._deletedDetailBegan,
                    count: 50
                }

                kaayou.emit("common", "ui::Loading::Show");
                let info = await kaayou.sendMessage("lobby", houseFcmMsgHead.housepartnerfloorhistorydtrailstatistics, req, kaayou.MakeResultMessageHead(houseFcmMsgHead.housepartnerfloorhistorydtrailstatistics));
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "操作失败！" });
                    kaayou.emit("tea", 'ui::FcmPartner::partnerDeletedFloorDetail', { list: [],dfid:data.dfid,fid:data.fid, update: false });
                    return;
                }

                for (var x in info.items) {
                    let tempItem = info.items[x];
                    // let num = data.clear ? Number(x) : Number((this._deletedDetailBegan + Number(x)))
                    let model: partberFloorHistoryDetaiItem = {
                        uid: tempItem.uid,
                        uname: tempItem.uname,
                        uurl: tempItem.uurl,
                        ugender: tempItem.ugender,
                        validtimes: tempItem.validtimes,
                        bigvalidtimes: tempItem.bigvalidtimes,
                        roundprofit: tempItem.roundprofit,
                        subordinateprofit: tempItem.subordinateprofit,
                        totalprofit: tempItem.totalprofit,
                        royalty:tempItem.royalty,
                        isjunior:tempItem.isjunior,
                        changeprofit:tempItem.changeprofit
                    }
                    this._deletedDetailList.push(model);
                }
                this._deletedDetailBegan += info.items.length;

                kaayou.emit("tea", 'ui::FcmPartner::partnerDeletedFloorDetail', { list: this._deletedDetailList,dfid:data.dfid,fid:data.fid, update: true });
            }





            //比赛分通知
            @BindEvent("lobby", 'ws::Msg::housevitaminstatus_ntf')
            onHouseVitaminStatus(info) {
                if (lodash.isEmpty(tea.mod.__teaHouseInfo)) {
                    return;
                }
                //只接收本圈的通知
                if(info.hid==tea.mod.__teaHouseInfo.hid){
                    tea.mod.__teaHouseInfo.disablejuniorv=info.disablejuniorv;
                    tea.mod.__teaHouseInfo.isgamepause = info.gamepause;
                    tea.mod.__teaHouseInfo.ismembersend = info.membersend;
                    tea.mod.__teaHouseInfo.ispartnerhide = info.partnerhide;
                    tea.mod.__teaHouseInfo.ispartnermodi = info.partnermodi;
                    tea.mod.__teaHouseInfo.isvitamin = info.status;
                    tea.mod.__teaHouseInfo.isvitaminhide = info.adminhide;
                    tea.mod.__teaHouseInfo.isvitaminmodi = info.adminmodi;
                    tea.mod.__teaHouseInfo.isdeductconfig = info.deductconfig;
                    tea.mod.__teaHouseInfo.iseffectconfig = info.effectconfig;
                    tea.mod.__teaHouseInfo.reward_balanced = info.reward_balanced;
                    kaayou.emit("tea", "ui::TeaHouse::UpdateTiredBlock");
                }
            }
        }
    }
    tea.mod.Fcm.getInstance();
}