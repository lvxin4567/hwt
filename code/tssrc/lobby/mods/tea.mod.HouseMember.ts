/// <reference path="./protos/teaHouse.protos/houseMember.proto.ts" />

namespace tea {
    const { BindEvent, doBindEvent } = kaayou._decorator;
  

    //获取成员统计茶楼列表
    interface GetHouseMemberStat {
        hid: number,
        daytype: number,
        sorttype: number,
        pbegin: number,
        pend: number,
        searchkey: string
    };

    export interface Data_MatchScoreMemberItem {
        uid: number,
        uname: string,
        uurl: string,
        ugender: number,
        urole: number,
        ispartner: boolean,
        curvitamin: number,
        prenodevitamin: number,
        vitaminwinlosecost: number,
        vitaminplaycost: number,
        vitamincostround: number,
        vitamincostbw: number,
        isjunior: boolean,
        vitamin_admin: boolean,
        vice_partner: boolean,
        upartner: number,
        VitaminWinLoseCostInt: number,
        VitaminPlayCostInt: number,
        VitaminCostRoundInt: number,
        VitaminCostBWInt: 0
    };

    //成员列表
    interface Data_HouseMemberList {
        totalnum: number,
        hmemonlinenum: number,
        hmemnum: number,
        hmemitems: Array<Data_HouseMemberItem>,
        role: HouseMemberRole,
        nextstart: number,
    };


    //茶楼成员统计列表
    interface Data_HouseMemberStatItem {
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

    //茶楼成员统计列表
    interface Data_HouseMemberStat {
        hmemitems: Array<Data_HouseMemberStatItem>,
        nextstart: number,
    };

    //同意/拒绝加入茶楼
    interface CheckMemberApply {
        apply_type: number,
        hid: number,
        uid: number
    };


  

   

  

    export interface roleAuthPowerList {
        acceptTotea: boolean
    }

    export namespace mod {

        export function _getRolePowerInIndex(roleStr: string, i: number) {
            if (!roleStr || roleStr.length < 1 || i < 0 || roleStr.length <= i) {
                return;
            }
            let subStr = roleStr.substr(i, 1);
            if (lodash.isNaN(Number(subStr))) return;
            return Number(subStr);
        }


        export class HouseMember {
            static __INS__: tea.mod.HouseMember = null;
            static getInstance(): tea.mod.HouseMember {
                if (HouseMember.__INS__ == null) {
                    HouseMember.__INS__ = new HouseMember();
                    HouseMember.__INS__.initMod();
                }
                return HouseMember.__INS__;
            }
            @doBindEvent
            initMod() { }
            _matchPointList: Array<Data_MatchScoreMemberItem> = null;
            __totalnum: number = -1;
            __onlinenum: number = -1;
            __limit_user_num:number = -1;
            __memberList: Array<Data_HouseMemberItem> = null;
            __memberBegan: number = 0;
            __memberParam: string = "";
            __memtotalnum: number = -1;
            __memberList2: Array<Data_HouseMemberItem> = null;
            __memberBegan2: number = 0;
            __memberParam2: string = "";
            __memtotalnum2: number = -1;
            //获取茶楼成员列表；role：2成员列表，3申请列表，4黑名单列表
            @BindEvent("tea", 'mod::Member::GetMemberList')
            async doGetMemberList(data: { param: string, clear: boolean, sorttype: number ,listType:number }) {
                if (!(__teaHouseRole & HouseRoleTable.VIEW_MEMBER)) { return; }


                data = data || { param: "", clear: false, sorttype: 0 ,listType:0};
                data.param = data.param || "";
                data.clear = data.clear || false;
                data.listType = data.listType || 0;
                this.__memberList = lodash.isEmpty(this.__memberList) ? [] : this.__memberList;
                if (!lodash.eq(this.__memberParam, data.param) || data.clear) {
                    this.__memtotalnum = -1;
                    this.__memberBegan = 0;
                    this.__memberList = [];
                }
                this.__memberParam = data.param;

                if (this.__memtotalnum != -1 && this.__memberBegan >= this.__memtotalnum) {
                    //发送空数据保持不刷新
                    kaayou.emit("tea", 'ui::Member::UpdateMember', { list: null, update: false });
                    return;
                }
                //lw190802改为一次请求50条数据
                let end = this.__memberBegan + 49;

                let req: GetHouseMemberList = {
                    hid: __teaHouseInfo.hid,
                    param: this.__memberParam || '',
                    role: HouseMemberRole.MEMBER,
                    pbeg: this.__memberBegan,
                    pend: end,
                    sorttype: data.sorttype,
                    list_type:data.listType,
                };

                console.log("req", req);
                kaayou.emit("common", "ui::Loading::Show");
                //cc.log("获取成员列表数据" + data.role + "：" + data.pbeg + "-" + (data.pend));

                interface Res_Data {
                    hmemitems: Array<Data_HouseMemberItem>
                    hmemnum: number;
                    hmemonlinenum: number;
                    totalnum: number;
                    partnermemsnum: number;
                    partnermemsonlinenum: number;
                    limit_user_num:number
                    errcode?: Number;
                    msg?: string;
                    pbegin?: number
                }

                let info = <Res_Data>await kaayou.sendMessage("lobby", houseMemHeadMsg.housememberlist, req, kaayou.MakeResultMessageHead(houseMemHeadMsg.housememberlist));
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "获取列表失败！" });
                    return;
                }
                //lw200327如果删除了一条记录，开始索引不变，但总条数变了,也要刷新
                if (info.pbegin == this.__memberBegan || this.__memtotalnum != info.totalnum) {
                    this.__memtotalnum = info.totalnum; //查询条数
                    this.__totalnum = info.hmemnum;  //成员数量
                    this.__onlinenum = info.hmemonlinenum; //在线数量
                    this.__memberBegan = Math.min(end + 1, this.__memtotalnum);
                    this.__limit_user_num = info.limit_user_num;
                    for (var x in info.hmemitems) {
                        let tempItem = info.hmemitems[x];
                        let memberInfo: Data_HouseMemberItem = {
                            upartnerurl:tempItem.upartnerurl,
                            apply_at: tempItem.apply_at,
                            apply_type: tempItem.apply_type,
                            game_limit: tempItem.game_limit,
                            limit: tempItem.limit,
                            ruleMask: 0,
                            superior:tempItem.superior,
                            superiorname:tempItem.superiorname,
                            ugender: tempItem.ugender,
                            uid: tempItem.uid,
                            uname: tempItem.uname,
                            uonline: tempItem.uonline,
                            uplaying: tempItem.uplaying,
                            upartner: tempItem.upartner,
                            upartnername: tempItem.upartnername,
                            urole: tempItem.urole,
                            uremark: tempItem.uremark,
                            uurl: tempItem.uurl,
                            vice_partner: tempItem.vice_partner,
                            ujointime: tempItem.ujointime,
                            ulasttime: tempItem.ulasttime || undefined,
                            uvitamin: tempItem.uvitamin,
                            vitamin_admin: tempItem.vitamin_admin
                        };
                        this.__memberList.push(memberInfo);
                    }
                }
                function getRoleMask(uid: number, rule: number): number {
                    let mask = __teaHouseRole;
                    if (__teaHouseInfo.uid == uid) {
                        mask = mask & ~HouseRoleTable.EDIT_MEMBER_REMOVE;
                        mask = mask & ~HouseRoleTable.EDIT_MEMBER_SETMANAGER;
                    } else {
                        mask = mask & ~HouseRoleTable.EDIT_HOUSE_DELETE;
                        mask = mask & ~HouseRoleTable.EDIT_HOUSE_EXIT;
                        //楼主不能被删除
                        if (rule == HouseMemberRole.OWNER) {
                            mask = mask & ~HouseRoleTable.EDIT_MEMBER_REMOVE;
                        }
                        //管理员不能删除管理员
                        if (!_isMaster() && rule == HouseMemberRole.ADMIN) {
                            mask = mask & ~HouseRoleTable.EDIT_MEMBER_REMOVE;
                        }
                    }

                    return mask;
                }
                //计算一遍管理权限
                for (var x in this.__memberList) {
                    this.__memberList[x].ruleMask = getRoleMask(this.__memberList[x].uid, this.__memberList[x].urole);
                }
                let updateData = { 
                    totalnum: this.__totalnum, 
                    onlinenum: this.__onlinenum, 
                    partnermemsonlinenum: info.partnermemsonlinenum, 
                    partnermemsnum: info.partnermemsnum,
                    limit_user_num:info.limit_user_num,
                }
                kaayou.emit('tea', 'ui::TeaHouse::Member::UpdateMemberInfo', updateData);
                kaayou.emit("tea", 'ui::Member::UpdateMember', { list: this.__memberList, update: true });
            }

            @BindEvent("tea", 'mod::TeaHouse::GetNoDeskmateMember')
            async getNoDeskmateMember(data: { param: string, group_id: number, clear: boolean }) {
                if (!(__teaHouseRole & HouseRoleTable.VIEW_MEMBER)) { return; }

                data = data || { param: "", clear: false, group_id: 0 };
                data.param = data.param || "";
                data.clear = data.clear || false;

                this.__memberList = lodash.isEmpty(this.__memberList) ? [] : this.__memberList;
                if (!lodash.eq(this.__memberParam, data.param) || data.clear) {
                    this.__memtotalnum = -1;
                    this.__memberBegan = 0;
                    this.__memberList = [];
                }
                this.__memberParam = data.param;

                if (this.__memtotalnum != -1 && this.__memberBegan >= this.__memtotalnum) {
                    //发送空数据保持不刷新
                    kaayou.emit("tea", 'ui::TeaHouse::UpdateNoDeskmateMemberList', { list: null, update: false });
                    return;
                }
                // let end = this.__memtotalnum == -1 ? this.__memberBegan + 9 : this.__memtotalnum;
                let end = this.__memberBegan + 49;

                let req : proto_housemembertablelimitlist = {
                    hid: __teaHouseInfo.hid,
                    param: this.__memberParam || '',
                    group_id: data.group_id,
                    pbeg: this.__memberBegan,
                    pend: end
                };

                kaayou.emit("common", "ui::Loading::Show");
                //cc.log("获取成员列表数据" + data.role + "：" + data.pbeg + "-" + (data.pend));

                interface Res_Data {
                    hmemitems: Array<Data_HouseMemberItem>
                    hmemnum: number;
                    hmemonlinenum: number;
                    totalnum: number;
                    errcode?: Number;
                    msg?: string;
                }

                let info = <Res_Data>await kaayou.sendMessage("lobby", houseMemHeadMsg.housemembertablelimitlist, req, kaayou.MakeResultMessageHead(houseMemHeadMsg.housemembertablelimitlist));
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "获取列表失败！" });
                    return;
                }
                this.__memtotalnum = info.totalnum; //查询条数
                this.__totalnum = info.hmemnum;  //成员数量
                this.__onlinenum = info.hmemonlinenum; //在线数量
                this.__memberBegan = Math.min(end + 1, this.__memtotalnum);

                for (var x in info.hmemitems) {
                    let tempItem = info.hmemitems[x];
                    let memberInfo = {
                        upartnerurl:tempItem.upartnerurl,
                        apply_at: tempItem.apply_at,
                        apply_type: tempItem.apply_type,
                        game_limit: tempItem.game_limit,
                        limit: tempItem.limit,
                        ruleMask: 0,
                        superior:tempItem.superior,
                        superiorname:tempItem.superiorname,
                        uid: tempItem.uid,
                        ugender: tempItem.ugender,
                        uname: tempItem.uname,
                        uonline: tempItem.uonline,
                        uplaying: tempItem.uplaying,
                        upartner: tempItem.upartner,
                        upartnername: tempItem.upartnername,
                        urole: tempItem.urole,
                        uremark: tempItem.uremark,
                        uurl: tempItem.uurl,
                        vice_partner: tempItem.vice_partner,
                        ujointime: tempItem.ujointime,
                        ulasttime: tempItem.ulasttime || undefined,
                        uvitamin: tempItem.uvitamin,
                        group_id: data.group_id,
                        vitamin_admin: tempItem.vitamin_admin
                    };
                    this.__memberList.push(memberInfo);
                }
                kaayou.emit("tea", 'ui::TeaHouse::UpdateNoDeskmateMemberList', { list: this.__memberList, update: true });
            }

            @BindEvent("tea", 'mod::TeaHouse::GetPartnerMember')
            async getPartnerMember(data: { param: string, pid: number, clear: boolean, is_bind: boolean }) {
                let self = this;
                if (!(__teaHouseRole & HouseRoleTable.VIEW_MEMBER)) { return; }
                data = data || { param: "", clear: false, pid: 0, is_bind: false };
                data.param = data.param || "";
                data.clear = data.clear || false;

                kaayou.emit("common", "ui::Loading::Show");
                interface Res_Data {
                    hmemitems: Array<Data_HouseMemberItem>
                    hmemnum: number;
                    hmemonlinenum: number;
                    totalnum: number;
                    errcode?: Number;
                    msg?: string;
                }
                let end = 0;
                let req = {};
                let fn = async function (memberList, memberParam, memtotalnum, memberBegan, clientdata, msgHead) {
                    memberList = lodash.isEmpty(memberList) ? [] : memberList;
                    if (!lodash.eq(memberParam, clientdata.param) || clientdata.clear) {
                        memtotalnum = -1;
                        memberBegan = 0;
                        memberList = [];
                    }
                    memberParam = clientdata.param;
                    if (memtotalnum != -1 && memberBegan >= memtotalnum) {
                        //发送空数据保持不刷新
                        kaayou.emit("common", "ui::Loading::Hide");
                        kaayou.emit("tea", 'ui::Member::UpdatePartnerMemberList', { list: null, update: false, is_bind: clientdata.is_bind, totalnum: memtotalnum });
                        return;
                    }
                    //end = memberBegan + 49;
                    end = memberBegan + 49;
                    req = {
                        hid: __teaHouseInfo.hid,
                        is_bind: clientdata.is_bind,
                        param: memberParam || '',
                        pid: clientdata.pid,
                        pbeg: memberBegan,
                        pend: end
                    };
                    let info = <Res_Data>await kaayou.sendMessage("lobby", msgHead, req, "ws::Msg::" + msgHead);
                    kaayou.emit("common", "ui::Loading::Hide");
                    if (info.errcode) {
                        kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "获取列表失败！" });
                        kaayou.emit("tea", 'ui::Member::UpdatePartnerMemberList', { list: null, update: false, is_bind: clientdata.is_bind, totalnum: memtotalnum });
                        return;
                    }
                    for (var x in info.hmemitems) {
                        let tempItem = info.hmemitems[x];
                        let memberInfo: Data_HouseMemberItem = {
                            upartnerurl:tempItem.upartnerurl,
                            apply_at: tempItem.apply_at,
                            apply_type: tempItem.apply_type,
                            game_limit: tempItem.game_limit,
                            limit: tempItem.limit,
                            ruleMask: 0,
                            superior:tempItem.superior,
                            superiorname:tempItem.superiorname,
                            uid: tempItem.uid,
                            ugender: tempItem.ugender,
                            uname: tempItem.uname,
                            uonline: tempItem.uonline,
                            vice_partner: tempItem.vice_partner,
                            uplaying: tempItem.uplaying,
                            upartner: tempItem.upartner,
                            upartnername: tempItem.upartnername,
                            urole: tempItem.urole,
                            uremark: tempItem.uremark,
                            uurl: tempItem.uurl,
                            ujointime: tempItem.ujointime,
                            ulasttime: tempItem.ulasttime || undefined,
                            uvitamin: tempItem.uvitamin,
                            vitamin_admin: tempItem.vitamin_admin
                        }
                        memberList.push(memberInfo);
                    }
                    memtotalnum = info.totalnum; //查询条数
                    // this.__totalnum = info.hmemnum;  //成员数量
                    // this.__onlinenum = info.hmemonlinenum; //在线数量
                    memberBegan = Math.min(end + 1, memtotalnum);
                    kaayou.emit("tea", 'ui::Member::UpdatePartnerMemberList', { list: memberList, update: true, is_bind: clientdata.is_bind, totalnum: memtotalnum });
                    if (!data.is_bind) {
                        self.__memberList = memberList;
                        self.__memberParam = memberParam;
                        self.__memtotalnum = memtotalnum;
                        self.__memberBegan = memberBegan;
                    } else {
                        self.__memberList2 = memberList;
                        self.__memberParam2 = memberParam;
                        self.__memtotalnum2 = memtotalnum;
                        self.__memberBegan2 = memberBegan;
                    }
                }
                if (!data.is_bind) {
                    fn(self.__memberList, self.__memberParam, self.__memtotalnum, self.__memberBegan, data, "housepartnermemcustom");
                } else {
                    fn(self.__memberList2, self.__memberParam2, self.__memtotalnum2, self.__memberBegan2, data, "housepartnerbinduser");
                }
            }

            @BindEvent("tea", 'mod::TeaHouse::GetTiredMember')
            async getTiredMember(data: { param: string, clear: boolean, sorttype: number }) {
                data = data || { param: "", clear: false, sorttype: 0 };
                data.param = data.param || "";
                data.clear = data.clear || false;

                this._matchPointList = lodash.isEmpty(this._matchPointList) ? [] : this._matchPointList;
                if (!lodash.eq(this.__memberParam, data.param) || data.clear) {
                    this.__memberBegan = 0;
                    this._matchPointList = [];
                }
                this.__memberParam = data.param;
                //lw190802改为一次请求50条数据
                let end = this.__memberBegan + 50;

                let req : proto_housevitaminmgrlist = {
                    hid: __teaHouseInfo.hid,
                    searchkey: this.__memberParam || '',
                    pbeg: this.__memberBegan,
                    pend: end,
                    sorttype: data.sorttype
                };
                kaayou.emit("common", "ui::Loading::Show");
                let info = await kaayou.sendMessage("lobby", "housevitaminmgrlist", req, "ws::Msg::housevitaminmgrlist");
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "获取列表失败！" });
                    return;
                }
                console.log("服务器返回的比赛分列表", info);
                //lw190815如果开始行号与请求行号不一样，有可能是数据在弱网环境下已经收到过了，所以就不再处理了
                if (info.pbeg == this.__memberBegan) {
                    this.__memberBegan = this.__memberBegan + info.items.length;
                    if (!info.items || lodash.isEmpty(info.items)) {
                        info.items = [];
                        kaayou.emit("common", 'ui::Toast::Show', { msg: "没有更多数据！" });
                    }
                    for (var x in info.items) {
                        let oldIndex = lodash.findIndex(this._matchPointList, { uid: info.items[x].uid });
                        if (oldIndex > -1) {
                            this._matchPointList.splice(oldIndex, 1);
                        }
                        let tempItem = info.items[x];
                        this._matchPointList.push(tempItem);
                    }
                    kaayou.emit("tea", 'ui::TiredMember::ShowData', { list: this._matchPointList, update: true });
                }
            }

            __applyList: Array<Data_HouseMemberItem> = null;
            __applyBegan: number = 0;
            __applyParam: string = "";
            __applytotalnum: number = -1;
            //获取申请列表
            @BindEvent("tea", 'mod::Member::GetApplyList')
            async doGetApplyList(data: { param: string, clear: boolean }) {

                if (!(__teaHouseRole & HouseRoleTable.VIEW_MEMBER_APPLY)) { return; }


                data = data || { param: "", clear: false };
                data.param = data.param || "";
                data.clear = data.clear || false;

                this.__applyList = lodash.isEmpty(this.__applyList) ? [] : this.__applyList;
                if (!lodash.eq(this.__applyParam, data.param) || data.clear) {
                    this.__applytotalnum = -1;
                    this.__applyBegan = 0;
                    this.__applyList = [];
                }
                this.__applyParam = data.param;

                if (this.__applytotalnum != -1 && this.__applyBegan >= this.__applytotalnum) {
                    //发送空数据保持不刷新
                    kaayou.emit("tea", 'ui::Member::UpdateApply', { list: null, update: false });
                    return;
                }
                // let end = this.__applytotalnum == -1 ? this.__applyBegan + 9 : this.__applyBegan;
                let end = this.__applyBegan + 49

                let req: GetHouseMemberList = {
                    hid: __teaHouseInfo.hid,
                    param: this.__applyParam || '',
                    role: HouseMemberRole.APLLY,
                    pbeg: this.__applyBegan,
                    pend: end,
                    sorttype: 0
                };

                kaayou.emit("common", "ui::Loading::Show");
                //cc.log("获取成员列表数据" + data.role + "：" + data.pbeg + "-" + (data.pend));

                interface Res_Data {
                    hmemitems: Array<Data_HouseMemberItem>
                    hmemnum: number;
                    hmemonlinenum: number;
                    totalnum: number;
                    partnermemsnum: number;
                    partnermemsonlinenum: number;
                    limit_user_num:number,
                    errcode?: Number;
                    msg?: string;
                    pbegin?: number
                }

                let info = <Res_Data>await kaayou.sendMessage("lobby", "housememberlist", req, "ws::Msg::housememberlist");
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "获取列表失败！" });
                    return;
                }
                if (info.pbegin == this.__applyBegan) {
                    this.__applytotalnum = info.totalnum; //查询条数
                    this.__totalnum = info.hmemnum;  //成员数量
                    this.__onlinenum = info.hmemonlinenum; //在线数量
                    this.__applyBegan = Math.min(end + 1, this.__applytotalnum);
                    this.__limit_user_num = info.limit_user_num;
                    for (var x in info.hmemitems) {
                        let tempItem = info.hmemitems[x];
                        let memberInfo: Data_HouseMemberItem = {
                            upartnerurl:tempItem.upartnerurl,
                            apply_at: tempItem.apply_at,
                            apply_type: tempItem.apply_type,
                            game_limit: tempItem.game_limit,
                            limit: tempItem.limit,
                            ruleMask: 0,
                            superior:tempItem.superior,
                            superiorname:tempItem.superiorname,
                            uid: tempItem.uid,
                            vice_partner: tempItem.vice_partner,
                            ujointime: tempItem.ujointime,
                            ulasttime: tempItem.ulasttime || undefined,
                            ugender: tempItem.ugender,
                            uonline: tempItem.uonline,
                            uplaying: tempItem.uplaying,
                            uname: tempItem.uname,
                            upartner: tempItem.upartner,
                            upartnername: tempItem.upartnername,
                            urole: tempItem.urole,
                            uremark: tempItem.uremark,
                            uurl: tempItem.uurl,
                            uvitamin: tempItem.uvitamin,
                            vitamin_admin: tempItem.vitamin_admin
                        };
                        this.__applyList.push(memberInfo);
                    }
                    //计算一遍管理权限
                    for (var x in this.__applyList) {
                        this.__applyList[x].ruleMask = __teaHouseRole;
                    }
                }
                let updateData = { 
                    totalnum: this.__totalnum, 
                    onlinenum: this.__onlinenum, 
                    partnermemsonlinenum: info.partnermemsonlinenum, 
                    partnermemsnum: info.partnermemsnum,
                    limit_user_num:info.limit_user_num,
                }
                kaayou.emit('tea', 'ui::TeaHouse::Member::UpdateMemberInfo',updateData );
                //发送空数据保持不刷新
                kaayou.emit("tea", 'ui::Member::UpdateApply', { list: this.__applyList, update: true });
            }

            //获取申请列表待处理数量
            @BindEvent("tea", "mod::Member::GetApplyCount")
            async getApplyCount() {
                if (!(__teaHouseRole & HouseRoleTable.VIEW_MEMBER_APPLY)) { return; }
                kaayou.emit("common", "ui::Loading::Show");

                let info = await kaayou.sendMessage("lobby", "housemembertrackpoint", { hid: tea.mod.__teaHouseInfo.hid }, "ws::Msg::housemembertrackpoint");
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "获取申请列表失败！" });
                    return;
                }
                if (info) {
                    if (info.hid == tea.mod.__teaHouseInfo.hid) {
                        if (info.apply_count == 0) {
                            kaayou.emit("tea", "ui::Teahouse::UpdateRed", { isShow: false })
                        } else {
                            kaayou.emit("tea", "ui::Teahouse::UpdateRed", { isShow: true })
                        }
                    }
                }
            }

            __blackList: Array<Data_HouseMemberItem> = null;
            __blackBegan: number = 0;
            __blackParam: string = "";
            __blacktotalnum: number = -1;

            //获取黑名单列表
            @BindEvent("tea", 'mod::Member::GetBlackList')
            async doGetBlackList(data: { param: string, clear: boolean }) {
                if (!(__teaHouseRole & HouseRoleTable.VIEW_MEMBER_APPLY)) { return; }


                data = data || { param: "", clear: false };
                data.param = data.param || "";
                data.clear = data.clear || false;

                this.__blackList = lodash.isEmpty(this.__blackList) ? [] : this.__blackList;
                if (!lodash.eq(this.__blackParam, data.param) || data.clear) {
                    this.__blacktotalnum = -1;
                    this.__blackBegan = 0;
                    this.__blackList = [];
                }
                this.__blackParam = data.param;

                if (this.__blacktotalnum != -1 && this.__blackBegan >= this.__blacktotalnum) {
                    //发送空数据保持不刷新
                    kaayou.emit("tea", 'ui::Member::UpdateBlackList', { list: null, update: false });
                    return;
                }
                let end = this.__blackBegan + 49

                let req: GetHouseMemberList = {
                    hid: __teaHouseInfo.hid,
                    param: this.__blackParam || '',
                    role: HouseMemberRole.BLACK,
                    pbeg: this.__blackBegan,
                    pend: end,
                    sorttype: 0
                };

                kaayou.emit("common", "ui::Loading::Show");
                //cc.log("获取成员列表数据" + data.role + "：" + data.pbeg + "-" + (data.pend));

                interface Res_Data {
                    hmemitems: Array<Data_HouseMemberItem>
                    hmemnum: number;
                    hmemonlinenum: number;
                    totalnum: number;
                    errcode?: Number;
                    msg?: string;
                    pbegin?: number
                }

                let info = <Res_Data>await kaayou.sendMessage("lobby", houseMemHeadMsg.housememberlist, req, kaayou.MakeResultMessageHead(houseMemHeadMsg.housememberlist));
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "获取列表失败！" });
                    return;
                }
                if (info.pbegin == this.__blackBegan) {
                    this.__blacktotalnum = info.totalnum; //查询条数
                    this.__blackBegan = Math.min(end + 1, this.__blacktotalnum);


                    for (var x in info.hmemitems) {
                        let tempItem = info.hmemitems[x];
                        let memberInfo: Data_HouseMemberItem = {
                            upartnerurl:tempItem.upartnerurl,
                            apply_at: tempItem.apply_at,
                            apply_type: tempItem.apply_type,
                            game_limit: tempItem.game_limit,
                            limit: tempItem.limit,
                            vice_partner: tempItem.vice_partner,
                            ruleMask: 0,
                            superior:tempItem.superior,
                            superiorname:tempItem.superiorname,
                            uid: tempItem.uid,
                            ujointime: tempItem.ujointime,
                            ulasttime: tempItem.ulasttime || undefined,
                            ugender: tempItem.ugender,
                            uonline: tempItem.uonline,
                            uplaying: tempItem.uplaying,
                            upartner: tempItem.upartner,
                            upartnername: tempItem.upartnername,
                            uname: tempItem.uname,
                            urole: tempItem.urole,
                            uremark: tempItem.uremark,
                            uurl: tempItem.uurl,
                            uvitamin: tempItem.uvitamin,
                            vitamin_admin: tempItem.vitamin_admin
                        };
                        this.__blackList.push(memberInfo);
                    }
                }
                //计算一遍管理权限
                for (var x in this.__blackList) {
                    this.__blackList[x].ruleMask = __teaHouseRole;
                }

                kaayou.emit("tea", 'ui::Member::UpdateBlackList', { list: this.__blackList, update: true });

            }

            //同意玩家加入或退出茶楼
            @BindEvent("tea", 'mod::Member::Agree')
            async doCheckMemberAgree(data: { uid: number, apply_type: number }) {
                kaayou.emit("common", "ui::Loading::Show");
                let req: CheckMemberApply = {
                    apply_type: data.apply_type,
                    hid: lodash.toInteger(__teaHouseInfo.hid),
                    uid: lodash.toInteger(data.uid)
                }
                let info = await kaayou.sendMessage("lobby", houseMemHeadMsg.housememberagree, req, kaayou.MakeResultMessageHead(houseMemHeadMsg.housememberagree));
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "操作失败！" });
                    return;
                }
                if (lodash.isEmpty(this.__applyList)) {
                    kaayou.emit("tea", "ui::Teahouse::UpdateRed", { isShow: false })
                    kaayou.emit("tea", 'ui::Member::UpdateApply', { list: this.__applyList, update: true });
                } else {
                    lodash.pullAllBy(this.__applyList, [{ uid: lodash.toInteger(data.uid) }], 'uid');
                    kaayou.emit("tea", 'ui::Member::UpdateApply', { list: this.__applyList, update: true });
                    kaayou.emit("tea", "ui::Teahouse::UpdateRed", { isShow: lodash.isEmpty(this.__applyList) ? false : true })
                }
            }

            //拒绝玩家加入或退出茶楼
            @BindEvent("tea", 'mod::Member::Deny')
            async doCheckMemberRefused(data: { uid: number, apply_type: number }) {
                kaayou.emit("common", "ui::Loading::Show");
                let req: CheckMemberApply = {
                    apply_type: data.apply_type,
                    hid: lodash.toInteger(__teaHouseInfo.hid),
                    uid: lodash.toInteger(data.uid)
                }
                let info = await kaayou.sendMessage("lobby", houseMemHeadMsg.housememberrefused, req, kaayou.MakeResultMessageHead(houseMemHeadMsg.housememberrefused));
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "操作失败！" });
                    return;
                }
                if (lodash.isEmpty(this.__applyList)) {
                    kaayou.emit("tea", "ui::Teahouse::UpdateRed", { isShow: false })
                    kaayou.emit("tea", 'ui::Member::UpdateApply', { list: this.__applyList, update: true });
                } else {
                    lodash.pullAllBy(this.__applyList, [{ uid: lodash.toInteger(data.uid) }], 'uid');
                    kaayou.emit("tea", 'ui::Member::UpdateApply', { list: this.__applyList, update: true });
                    kaayou.emit("tea", "ui::Teahouse::UpdateRed", { isShow: lodash.isEmpty(this.__applyList) ? false : true })
                }
            }

            //剔除茶楼成员
            @BindEvent("tea", 'mod:::Member::KickMember')
            async doRemoveMember(data: { uid: number, joinBlack: boolean }) {
                kaayou.emit("common", "ui::Loading::Show");
                let req: proto_housememberBase = {
                    uid: data.uid,
                    hid: lodash.toInteger(__teaHouseInfo.hid)
                }
                let info = await kaayou.sendMessage("lobby", houseMemHeadMsg.housememberkick, req, kaayou.MakeResultMessageHead(houseMemHeadMsg.housememberkick));
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "操作失败！" });
                    return;
                }
                kaayou.emit("common", 'ui::Toast::Show', { msg: "移除成员成功！" });
                if (data.joinBlack) {
                    kaayou.emit("tea", 'mod::TeaHouse::Member::InsertToBlackList', { hid: lodash.toInteger(__teaHouseInfo.hid), uid: data.uid });
                }
                kaayou.emit('tea', 'ui::MemberRemovePanel::Hide');
                kaayou.emit("tea", 'ui::TeaHouse::Member::UpdateKickMember', data);
            }

            //绑定被踢出亲友圈的推送消息
            @BindEvent("lobby", 'ws::Msg::housememberkick_ntf')
            doRemoveMemberNTF(data: proto_housememberBase) {
                cc.log("收到推送消息：被踢出亲友圈" + data.hid);
                kaayou.emit("common", 'ui::Toast::Show', { msg: "圈主或管理员将您从亲友圈" + data.hid + "移除" });
                kaayou.emit("tea", "mod::TeaHouse::doGetList"); //被踢出的亲友圈是当前所在的亲友圈，需要退出亲友圈大厅
                if (!_isInCurHouse(data.hid)) { return; }
                kaayou.emit("tea", "mod::TeaHouse::Quit");
            }

            //加入黑名单
            @BindEvent("tea", 'mod::TeaHouse::Member::InsertToBlackList')
            async doInsertToBlackList(data: proto_housememberBase) {
                kaayou.emit("common", "ui::Loading::Show");
                let info = await kaayou.sendMessage("lobby", houseMemHeadMsg.housememberblacklistinsert, data, kaayou.MakeResultMessageHead(houseMemHeadMsg.housememberblacklistinsert));
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "操作失败！" });
                    return;
                }

                kaayou.emit("common", 'ui::Toast::Show', { msg: "加入黑名单成功！" });
                kaayou.emit("common", 'ui::TeaHouse::Member::UpdateInsertToBlackList', data);
            }


            //移出黑名单
            @BindEvent("tea", 'mod::TeaHouse::Member::DeleteToBlackList')
            async doDeleteToBlackList(data: proto_housememberBase) {
                kaayou.emit("common", "ui::Loading::Show");
                let info = await kaayou.sendMessage("lobby", houseMemHeadMsg.housememberblacklistdelete, data, kaayou.MakeResultMessageHead(houseMemHeadMsg.housememberblacklistdelete));
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "操作失败！" });
                    return;
                }

                kaayou.emit("common", 'ui::Toast::Show', { msg: "移除黑名单成功！" });
                //kaayou.emit("tea", 'ui::TeaHouse::Member::DeleteToBlackList', data);

                //kaayou.emit("tea", 'ui::Member::UpdateBlackList', data);
            }

            @BindEvent("tea", "mod::Member::setSubPartner")
            async doSubPartner(data: {
                "hid": number,
                "junior": number,
                callback: Function
            }) {
                let { hid, junior } = data;
                let res = await kaayou.sendMessage("lobby", houseMemHeadMsg.houseparnterbindjunior, { hid, junior }, kaayou.MakeResultMessageHead(houseMemHeadMsg.houseparnterbindjunior));
                if (res.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: res.msg || "操作失败！" });
                    return;
                }

                data.callback()
            }

            //设置成员身份
            @BindEvent("tea", 'mod::Member::SetRole')
            async doSetMemberRole(data: {
                uid: number,
                urole: HouseMemberRole,
                oldurole: HouseMemberRole,
            }) {

                let req: SetHouseMemberRole = {
                    hid: __teaHouseInfo.hid,
                    hname: __teaHouseInfo.hname,
                    uid: Number(data.uid),
                    urole: Number(data.urole),
                    oldurole: Number(data.oldurole)
                };

                kaayou.emit("common", "ui::Loading::Show");
                let info = await kaayou.sendMessage("lobby", houseMemHeadMsg.housememberrolegen, req, kaayou.MakeResultMessageHead(houseMemHeadMsg.housememberrolegen));
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "操作失败！" });
                    return;
                }

                if ((data.urole == HouseMemberRole.MEMBER)) {
                    kaayou.emit("common", "ui::Toast::Show", { msg: "移除管理成功！" })
                } else if ((data.urole == HouseMemberRole.ADMIN)) {
                    kaayou.emit("common", "ui::Toast::Show", { msg: "设置管理成功！" })
                }

                let pdata = <Data_HouseMemberItem>lodash.find(this.__memberList, { uid: lodash.toInteger(data.uid) });
                if (!lodash.isEmpty(pdata)) {
                    pdata.urole = data.urole;
                }
                console.log("mod::Member::SetRole ui::Member::UpdateMember");
                kaayou.emit("tea", 'ui::Member::UpdateMember', { list: this.__memberList, update: true });
                // kaayou.emit("common", 'ui::TeaHouse::Member::UpdateRole', data);
            }

            //绑定自己身份变更推送消息
            @BindEvent("lobby", 'ws::Msg::housememberrolegen_ntf')
            doModifyMemberRoleNtf(data: SetHouseMemberRole) {
                //lw191219申请加入亲友圈的玩家收到拒绝时不在该亲友圈里，所以要放在前面
                if (lobby.mod.User.getInstance().getUserInfo().uid == data.uid) {
                    if (data.oldurole == HouseMemberRole.APLLY && data.urole == HouseMemberRole.Rejected) { //从申请者变成被拒；
                        kaayou.emit("common", "ui::Toast::Show", { msg: "圈主或管理员拒绝了您的申请！" });
                        return;
                    }
                }
                if (!!!__teaHouseInfo) return;
                if (data.oldurole == HouseMemberRole.APLLY && data.urole == HouseMemberRole.MEMBER) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: "圈主或管理员同意您加入亲友圈：" + data.hid });
                    //lw190708
                    let slastTeahouse = cc.sys.localStorage.getItem("LAST3TEAHOUSE::" + data.uid);
                    if (slastTeahouse && slastTeahouse.length == 0) {
                        let arr = [];
                        let th = { id: data.hid, name: data.hname };
                        arr.push(th);
                        let s = JSON.stringify(arr);
                        cc.sys.localStorage.setItem("LAST3TEAHOUSE::" + data.uid, s);
                        kaayou.emit("lobby", "showBtnQuickTea");
                    }
                    kaayou.emit("tea", "mod::TeaHouse::doGetList");
                }

                if (!_isInCurHouse(data.hid)) { return; }
                if(data.oldurole == HouseMemberRole.APLLY && data.urole == HouseMemberRole.Rejected){
                    kaayou.emit("tea", 'mod::Member::GetApplyList', { param: "", clear: true });
                    kaayou.emit("common", 'ui::Toast::Show', { msg: data.uid+"已被圈主或管理员拒绝入圈" });
                    return;
                }
                if (data.urole == -1 && data.oldurole != HouseMemberRole.APLLY) { //如果新身份是-1就是玩家退出了亲友圈 且不是申请者
                    lodash.pullAllBy(this.__memberList, [{ uid: lodash.toInteger(data.uid) }], 'uid');
                    console.log("ws::Msg::housememberrolegen_ntf ui::Member::UpdateMember");
                    kaayou.emit("tea", 'ui::Member::UpdateMember', { list: this.__memberList, update: true });
                    lodash.pullAllBy(this.__blackList, [{ uid: lodash.toInteger(data.uid) }], 'uid');
                    kaayou.emit("tea", 'ui::Member::UpdateBlackList', { list: this.__blackList, update: true });
                    kaayou.emit("common", "ui::Toast::Show", { msg: "玩家" + data.uid + "已退出亲友圈" + data.hid });
                    return;
                }
                else {
                    //偶尔会串房的消息
                    let uid = Number(JSON.parse(kaayou.DataSet.get("user::info")).uid);
                    if (data.uid != uid) { return; }
                    if (data.oldurole == HouseMemberRole.MEMBER && data.urole == HouseMemberRole.ADMIN) {
                        kaayou.emit("common", 'ui::Toast::Show', { msg: "圈主将您设置为亲友圈：" + data.hid + "管理员！" });
                    } else if (data.oldurole == HouseMemberRole.ADMIN && data.urole == HouseMemberRole.MEMBER) {
                        kaayou.emit("common", 'ui::Toast::Show', { msg: "圈主取消您在亲友圈：" + data.hid + "的管理员的身份！" });
                        kaayou.emit("tea", "ui::Tea::adminUroleChangeClean");
                    }
                    __teaHouseInfo.urole = data.urole;
                    kaayou.emit("tea", "ui::TeaHouse::UpdateTiredBlock");//刷新权限显示
                    kaayou.emit("tea", 'mod::TeaHouse::doUpdateTeaHouseRole');

                    let user: Data_HouseMemberItem = lodash.find(this.__memberList, { uid: data.uid });
                    if (!user) {
                        return;
                    }
                    user.urole = data.urole;
                    console.log("ws::Msg::housememberrolegen_ntf ui::Member::UpdateMember");
                    kaayou.emit("tea", 'ui::Member::UpdateMember', { list: this.__memberList, update: true });
                }
            }

            //设置成员身份推送消息
            @BindEvent("tea", 'mod::TeaHouse::Member::ModifyMemberRemark')
            async doModifyMemberRemark(data: ModifyHouseMemberRemark) {
                kaayou.emit("common", "ui::Loading::Show");
                let msgHead=houseMemHeadMsg.partnerremark;
                if (tea.mod.__teaHouseInfo) {
                    let role = tea.mod.__teaHouseInfo.urole;
                    if (role == HouseMemberRole.OWNER || role == HouseMemberRole.ADMIN) {
                        msgHead=houseMemHeadMsg.housememberremark;
                    }
                }
                let info = await kaayou.sendMessage("lobby", msgHead, data, kaayou.MakeResultMessageHead(msgHead));
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "操作失败！" });
                    return;
                }
                for (let i = 0; i < this.__memberList.length; ++i) {
                    if (this.__memberList[i].uid == data.uid) {
                        this.__memberList[i].uremark = data.uremark;
                        break;
                    }
                }
            }

            //这个方法没有查找到调用
            @BindEvent("tea", 'mod::TeaHouse::GetTiredRecord')
            async getTiredRecord(data) {
                kaayou.emit("common", "ui::Loading::Show");
                let info = await kaayou.sendMessage("lobby", "housevitaminsetrecords", data, "ws::Msg::housevitaminsetrecords");
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "操作失败！" });
                    return;
                }
                kaayou.emit("tea", 'ui::TeaHouse::UpdateTiredRecord', info);
            }

            @BindEvent("tea", 'mod::TeaHouse::setCPAdmin')
            async setCPAdmin(data:proto_housevitadminset) {
                kaayou.emit("common", "ui::Loading::Show");
                let info = { errcode: 0, msg: "" };
                info = await kaayou.sendMessage("lobby", houseMemHeadMsg.housevitadminset, data, kaayou.MakeResultMessageHead(houseMemHeadMsg.housevitadminset));
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "操作失败！" });
                    return;
                }
                if (data.is_admin) kaayou.emit("common", 'ui::Toast::Show', { msg: "设置裁判成功！" });
                else kaayou.emit("common", 'ui::Toast::Show', { msg: "取消裁判成功！" });
            }

            @BindEvent("tea", 'mod::TeaHouse::setNoGame')
            async setNoGame(data:proto_houseuserlimitgame) {
                kaayou.emit("common", "ui::Loading::Show");
                let info = { errcode: 0, msg: "" };
                info = await kaayou.sendMessage("lobby", houseMemHeadMsg.houseuserlimitgame, data, kaayou.MakeResultMessageHead(houseMemHeadMsg.houseuserlimitgame));
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "操作失败！" });
                    return;
                }
                kaayou.emit("common", 'ui::Toast::Show', { msg: "设置状态成功！" });
            }

            @BindEvent("tea", 'mod::TeaHouse::setCaptainNoGame')
            async setCaptainNoGame(data) {
                kaayou.emit("common", "ui::Loading::Show");
                let info = { errcode: 0, msg: "" };
                info = await kaayou.sendMessage("lobby", houseMemHeadMsg.housecaptainlimitgame, data, kaayou.MakeResultMessageHead(houseMemHeadMsg.housecaptainlimitgame));
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "操作失败！" });
                    return;
                }
                kaayou.emit("common", 'ui::Toast::Show', { msg: "设置状态成功！" });
                kaayou.emit("tea","ui::HouseMemberInfo::Hide");
            }

            @BindEvent("tea", 'mod::TeaHouse::setPartner')
            async setPartner(data) {
                kaayou.emit("common", "ui::Loading::Show");
                let info = { errcode: 0, msg: "" };
                let success = data.success;
                delete data.success
                let fail = data.fail;
                delete data.fail;
                let sdata:proto_housememberBase = {
                    hid: data.hid, uid: data.uid
                }
                if (data.grant) {
                    info = await kaayou.sendMessage("lobby", houseMemHeadMsg.housepartnercreate, sdata, kaayou.MakeResultMessageHead(houseMemHeadMsg.housepartnercreate));
                } else {
                    info = await kaayou.sendMessage("lobby", houseMemHeadMsg.housepartnerdelete, sdata, kaayou.MakeResultMessageHead(houseMemHeadMsg.housepartnerdelete));
                }
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "操作失败！" });
                    fail && fail();
                    return;
                }
                if (data.grant) kaayou.emit("common", 'ui::Toast::Show', { msg: "设置队长成功！" });
                else kaayou.emit("common", 'ui::Toast::Show', { msg: "移除队长状态！" });
                success && success();
            }

            @BindEvent("tea", 'mod::TeaHouse::setVicePartner')
            async setVicePartner(data) {
                kaayou.emit("common", "ui::Loading::Show");
                let sdata : proto_housevicepartnerset = {
                    hid: data.hid, uid: data.uid, vicepartner: data.vice 
                }
                let info = await kaayou.sendMessage("lobby", houseMemHeadMsg.housevicepartnerset,sdata, kaayou.MakeResultMessageHead(houseMemHeadMsg.housevicepartnerset));
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "操作失败！" });
                    return;
                }
                kaayou.emit("common", 'ui::Toast::Show', { msg: "设置成功！" });
            }


            @BindEvent("lobby", kaayou.MakeResultMessageHead(houseMemHeadMsg.housevicepartnerset_ntf))
            onVicePartnerModify(data: proto_housevicepartnerset_ntf_res) {
                if (!__teaHouseInfo) return;
                if (!!tea.mod.__teaHouseInfo && !!data) {
                    if (tea.mod.__teaHouseInfo.hid != data.hid) { return; }
                    if (tea.mod.__teaHouseInfo.uid == data.uid) {

                        if (data.vicepartner === true) {
                            kaayou.emit("common", "ui::Toast::Show", { msg: `玩家(ID:${data.optuid})将您设为副队长` });
                            tea.mod.__teaHouseInfo.vice_partner = true;
                        } else {
                            kaayou.emit("common", "ui::Toast::Show", { msg: `玩家(ID:${data.optuid})撤销了您的副队长` });
                            tea.mod.__teaHouseInfo.vice_partner = false;
                            tea.mod.__teaHouseInfo.urole = HouseMemberRole.MEMBER;
                            kaayou.emit("tea", 'ui::AntiIndulgencePanel::Hide')
                        }

                    }
                    kaayou.emit("tea", "ui::TeaHouse::UpdateTiredBlock");
                    kaayou.emit("tea", 'mod::TeaHouse::doUpdateTeaHouseRole');
                    //lwthis.__memberList不一定有值
                    let user: Data_HouseMemberItem = lodash.find(this.__memberList, { uid: data.uid });
                    if (!user) {
                        return;
                    }
                    user.vice_partner = data.vicepartner;

                    // user.urole =  HouseMemberRole.PARTNER;
                    kaayou.emit("tea", "ui::TeaHouse::PartnerChange", user);
                    kaayou.emit('tea', 'ui::Member::RefreshMemberList');
                    
                }
            }

            @BindEvent("tea", 'mod::TeaHouse::SetParterMember')
            async setPartnerMember(data:proto_housepartnergen) {
                kaayou.emit("common", "ui::Loading::Show");
                let info = await kaayou.sendMessage("lobby", houseMemHeadMsg.housepartnergen, data, kaayou.MakeResultMessageHead(houseMemHeadMsg.housepartnergen));
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "操作失败！" });
                    kaayou.emit("tea", 'ui::TeaHouse::ShowPartnerPanel');
                    return;
                }
                kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "操作成功！" });
            }

            @BindEvent("tea", 'mod::TeaHouse::GetNoDeskmateGroup')
            async getNoDeskmateGroup(data:IBASE_HOUSEREQ) {
                kaayou.emit("common", "ui::Loading::Show");
                let info : proto_housetablelimitinfo_res = await kaayou.sendMessage("lobby", houseMemHeadMsg.housetablelimitinfo, data, kaayou.MakeResultMessageHead(houseMemHeadMsg.housetablelimitinfo));
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "操作失败！" });
                    return;
                }
                kaayou.emit("tea", 'ui::TeaHouse::UpdateNoDeskmateGroup', info);
            }

            @BindEvent("tea", 'mod::TeaHouse::AddNoDeskmateGroup')
            async addNoDeskmateGroup(data:IBASE_HOUSEREQ) {
                kaayou.emit("common", "ui::Loading::Show");
                let info : proto_housetablelimitinfo_res  = await kaayou.sendMessage("lobby", houseMemHeadMsg.housetablelimitgroupadd, data, kaayou.MakeResultMessageHead(houseMemHeadMsg.housetablelimitgroupadd));
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "操作失败！" });
                    return;
                }
                // //lw190801服务端要客户端自己编序号
                // let i = 1;
                // for (let x in info.groups) {
                //     info.groups[x]["groupNO"] = i;
                //     i++;
                // }
                kaayou.emit("tea", 'ui::TeaHouse::UpdateNoDeskmateGroup', info);
            }

            //设置禁止同桌二人卓是否生效
            @BindEvent("tea", 'mod::TeaHouse::SetEffectInMem2')
            async SetEffectInMem2(data:proto_house2ptablelimitnoteffect) {
                kaayou.emit("common", "ui::Loading::Show");
                let info  = await kaayou.sendMessage("lobby", houseMemHeadMsg.house2ptablelimitnoteffect, data, kaayou.MakeResultMessageHead(houseMemHeadMsg.house2ptablelimitnoteffect));
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "操作失败！" });
                    return;
                }
                kaayou.emit("common", 'ui::Toast::Show', { msg:  "设置成功！" });
            }





            @BindEvent("tea", 'mod::TeaHouse::AddNoDeskmate')
            async addNoDeskmate(data:proto_housememberBase) {
                kaayou.emit("common", "ui::Loading::Show");
                let info = await kaayou.sendMessage("lobby", houseMemHeadMsg.housetablelimituseradd, data, kaayou.MakeResultMessageHead(houseMemHeadMsg.housetablelimituseradd));
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "操作失败！" });
                    return;
                }
                kaayou.emit("tea", "ui::TeaHouse::UpdateDeskmateMemberStatus", data);
                kaayou.emit("tea", 'ui::TeaHouse::UpdateNoDeskmateGroup', info);
            }

            @BindEvent("tea", 'mod::TeaHouse::DeleteNoDeskmate')
            async deleteNoDeskmate(data:proto_housetablelimituserremove) {
                kaayou.emit("common", "ui::Loading::Show");
                let info = await kaayou.sendMessage("lobby", houseMemHeadMsg.housetablelimituserremove, data, kaayou.MakeResultMessageHead(houseMemHeadMsg.housetablelimituserremove));
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "操作失败！" });
                    return;
                }
                kaayou.emit("tea", "ui::TeaHouse::UpdateDeskmateMemberStatus", data);
                kaayou.emit("tea", 'ui::TeaHouse::UpdateNoDeskmateGroup', info);
            }

            @BindEvent("tea", 'mod::TeaHouse::DeleteNoDeskmateGroup')
            async deleteNoDeskmateGroup(data:proto_housetablelimitgroupremove) {
                kaayou.emit("common", "ui::Loading::Show");
                let info :proto_housetablelimitinfo_res = await kaayou.sendMessage("lobby", houseMemHeadMsg.housetablelimitgroupremove, data, kaayou.MakeResultMessageHead(houseMemHeadMsg.housetablelimitgroupremove));
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "操作失败！" });
                    return;
                }
                //lw190801服务端要客户端自己编序号
                // let i = 1;
                // for (let x in info.groups) {
                //     info.groups[x]["groupNO"] = i;
                //     i++;
                // }
                kaayou.emit("tea", 'ui::TeaHouse::UpdateNoDeskmateGroup', info);
            }

            @BindEvent("tea", 'mod::TeaHouse::CheckMember')
            async checkMember(data) {
                kaayou.emit("common", "ui::Loading::Show");
                let info = await kaayou.sendMessage("lobby", "housememgetbyid", data, "ws::Msg::housememgetbyid");
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    //kaayou.emit("common",'ui::Toast::Show',{msg: info.msg || "您输入的玩家ID有误！"});
                    kaayou.emit("common", 'ui::Toast::Show', { msg: "您输入的玩家ID有误！" });
                    return;
                }
                kaayou.emit("tea", 'ui::TeaHouse::CheckMember', info);
            }

            //队长自动划扣开关
            @BindEvent("tea", 'mod::TeaHouse::houseautopaypartner')
            async houseautopaypartner(data: { auto_pay: boolean }) {
                kaayou.emit("common", "ui::Loading::Show");
                let sdata : proto_houseautopaypartner = {
                    hid: __teaHouseInfo.hid, auto_pay: data.auto_pay
                }
                let info = await kaayou.sendMessage("lobby", houseMemHeadMsg.houseautopaypartner, sdata, kaayou.MakeResultMessageHead(houseMemHeadMsg.houseautopaypartner));
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    //kaayou.emit("common",'ui::Toast::Show',{msg: info.msg || "您输入的玩家ID有误！"});
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "操作失败！" });
                    return;
                }
                //设置成功之后
                __teaHouseInfo.auto_pay_partner = data.auto_pay;
                kaayou.emit("common", 'ui::Toast::Show', { msg: "操作成功！" });
            }

            @BindEvent("tea", 'mod::TeaHouse::offWork')
            async offWork({is_off_work}){
                let hid = __teaHouseInfo.hid;
                let info = await kaayou.sendMessage("lobby", "offwork", {is_off_work,hid}, kaayou.MakeResultMessageHead("offwork"));
                if(info.errcode){
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "操作失败！" });
                    return;
                }
            }

            @BindEvent("lobby", 'ws::Msg::offwork_ntf')
            async offWork_ntf({is_off_work,hid}){
                let _hid = __teaHouseInfo.hid;
                if(_hid!==hid)
                    return ;
                __teaHouseInfo.is_cur_user_team_off_work = is_off_work;
                kaayou.emit('tea',"ui::TeaHouse::updateoffworkstatus",{update:true,is_off_work})
            }



            //请求可修改权限
            @BindEvent("tea", 'mod::Auth::Get')
            async getAuth(data) {
                kaayou.emit("common", "ui::Loading::Show");
                let hid= tea.mod.__teaHouseInfo.hid;
                let uid = data.uid;
                let sdata ={hid,uid};
                let info = await kaayou.sendMessage("lobby", houseMemHeadMsg.hmlookuserright, sdata, kaayou.MakeResultMessageHead(houseMemHeadMsg.hmlookuserright));
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "操作失败！" });
                    return;
                }
                kaayou.emit("tea", "ui::AuthPanel::Show", {
                    right:info.right,
                    ...data
                });
            }

            //队长通知
            @BindEvent("lobby", 'ws::Msg::housepartnerjunior_ntf')
            onHouseSubPartnerCreateNotify(data) {
                if (!!!__teaHouseInfo) return;
                if (!!tea.mod.__teaHouseInfo && !!data) {
                    if (tea.mod.__teaHouseInfo.hid != data.hid) { return; }
                    if (tea.mod.__teaHouseInfo.uid == data.uid) {
                        kaayou.emit("common", "ui::Toast::Show", { msg: `玩家(ID:${data.opt})将您设为队长` });
                        tea.mod.__teaHouseInfo.ispartner = true;
                        tea.mod.__teaHouseInfo.urole = HouseMemberRole.CAPTAIN;
                        kaayou.emit("tea", "mod::TeaHouse::GetHousePartnerInvitecode", Number(data.hid))//
                    }
                    kaayou.emit("tea", "ui::TeaHouse::UpdateTiredBlock");
                    kaayou.emit("tea", 'mod::TeaHouse::doUpdateTeaHouseRole');
                    //lwthis.__memberList不一定有值
                    let user: Data_HouseMemberItem = lodash.find(this.__memberList, { uid: data.uid });
                    if (!user) {
                        return;
                    }
                    user.upartner = 1;
                    // user.urole =  HouseMemberRole.PARTNER;
                    kaayou.emit("tea", "ui::TeaHouse::PartnerChange", user);
                    kaayou.emit('tea', 'ui::Member::RefreshMemberList');
                }
            }

            //队长通知
            @BindEvent("lobby", 'ws::Msg::housepartnercreate_ntf')
            onHousePartnerCreateNotify(data:proto_housememberBase) {
                if (!!!__teaHouseInfo) return;
                if (!!tea.mod.__teaHouseInfo && !!data) {
                    if (tea.mod.__teaHouseInfo.hid != data.hid) { return; }
                    if (tea.mod.__teaHouseInfo.uid == data.uid) {
                        kaayou.emit("common", "ui::Toast::Show", { msg: "圈主将您设为队长" });
                        tea.mod.__teaHouseInfo.ispartner = true;
                        tea.mod.__teaHouseInfo.urole = HouseMemberRole.CAPTAIN;
                        kaayou.emit("tea", "mod::TeaHouse::GetHousePartnerInvitecode", Number(data.hid))
                    }
                    //lw200604已经没有修改竞技点
                    //kaayou.emit("tea", "ui::TeaHouse::UpdateTiredBlock");
                    console.log("修改权限");
                    kaayou.emit("tea", 'mod::TeaHouse::doUpdateTeaHouseRole');
                    //lwthis.__memberList不一定有值
                    let user: Data_HouseMemberItem = lodash.find(this.__memberList, { uid: data.uid });
                    if (!user) {
                        return;
                    }
                    user.upartner = 1;
                    kaayou.emit("tea", "ui::TeaHouse::PartnerChange", user);
                    kaayou.emit('tea', 'ui::Member::RefreshMemberList');
                }
            }

            @BindEvent("lobby", 'ws::Msg::housepartnerdelete_ntf')
            onHousePartnerDeleteNotify(data:proto_housememberBase) {
                if (!!!tea.mod.__teaHouseInfo) return;
                if (tea.mod.__teaHouseInfo.hid != data.hid) { return; }
                if (tea.mod.__teaHouseInfo.uid == data.uid) {
                    kaayou.emit("common", "ui::Toast::Show", { msg: "圈主撤销了您的队长身份" });
                    tea.mod.__teaHouseInfo.ispartner = false;
                    tea.mod.__teaHouseInfo.urole = HouseMemberRole.MEMBER;
                    kaayou.emit("tea", "ui::TeaHouse::PartnerInvite", { invitCode: 0 });
                    kaayou.emit("tea","ui::Tea::capUroleChangeClean");
                }
                kaayou.emit("tea", "ui::TeaHouse::UpdateTiredBlock");
                kaayou.emit("tea", 'mod::TeaHouse::doUpdateTeaHouseRole');
                let user: Data_HouseMemberItem = lodash.find(this.__memberList, { uid: data.uid });
                if (!user) {
                    return;
                }
                user.upartner = 0;
                kaayou.emit("tea", "ui::TeaHouse::PartnerChange", user);
                kaayou.emit('tea', 'ui::Member::RefreshMemberList');
            }

            @BindEvent("lobby", 'ws::Msg::housevitadminset_ntf')
            onCPAdminSetNotify(data:proto_housevitadminset) {
                if (!!!__teaHouseInfo) return;
                if (!!tea.mod.__teaHouseInfo && !!data) {
                    if (tea.mod.__teaHouseInfo.hid != data.hid) { return; }
                    if (tea.mod.__teaHouseInfo.uid == data.uid) {
                        if (data.is_admin) {
                            kaayou.emit("common", "ui::Toast::Show", { msg: "圈主将您设为裁判" });
                            tea.mod.__teaHouseInfo.urole = HouseMemberRole.CPADMIN;
                        } else {
                            kaayou.emit("common", "ui::Toast::Show", { msg: "圈主取消了您的裁判权限" });
                            tea.mod.__teaHouseInfo.urole = HouseMemberRole.MEMBER;
                        }
                        tea.mod.__teaHouseInfo.vitamin_admin = data.is_admin;
                    }
                    kaayou.emit("tea", "ui::TeaHouse::UpdateTiredBlock");
                    kaayou.emit("tea", 'mod::TeaHouse::doUpdateTeaHouseRole');
                    //this.__memberList不一定有值
                    let user: Data_HouseMemberItem = lodash.find(this.__memberList, { uid: data.uid });
                    if (!user) {
                        return;
                    }
                    user.vitamin_admin = data.is_admin;
                    console.log("ws::Msg::housevitadminset_ntf ui::Member::UpdateMember");
                    kaayou.emit("tea", 'ui::Member::UpdateMember', { list: this.__memberList, update: true });
                }
            }

            //有人申请了亲友圈。这个时候需要去显示红点 "{"hid":184717,"uid":0,"uurl":"","nick_name":"","apply_time":0,"is_online":false}"
            @BindEvent("lobby", kaayou.MakeResultMessageHead(houseMemHeadMsg.housememberapply_ntf))
            onPushMemberIn(data:proto_housememberapply_ntf_res) {
            //有人申请了亲友圈。这个时候需要去显示红点
                if (!!!__teaHouseInfo) return;
                if (__teaHouseInfo.hid != data.hid) return;
                if (!__teaHouseInfo.hischecked) return;
                kaayou.emit("tea", "ui::Teahouse::UpdateRed", { isShow: true });
                kaayou.emit("tea", 'mod::Member::GetApplyList', { param: "", clear: true });
            }

            //禁止娱乐通知
            @BindEvent("lobby", kaayou.MakeResultMessageHead(houseMemHeadMsg.houseuserlimitgame_ntf))
            onNoGameNotify(data:proto_houseuserlimitgame_ntf_res) {
                if (!!tea.mod.__teaHouseInfo && !!data) {
                    if (tea.mod.__teaHouseInfo.hid != data.hid) { return; }
                    if(tea.mod.__teaHouseInfo.uid===data.uid)
                        tea.mod.__teaHouseInfo.is_limit_game = !data.allow_game;
                    kaayou.emit("tea", "ui::TeaHouse::NoGameChange");
                }
            }

            //禁止队长娱乐通知
            @BindEvent("lobby", kaayou.MakeResultMessageHead(houseMemHeadMsg.housecaptainlimitgame_ntf))
            onCaptainNoGameNotify(data:proto_houseuserlimitgame_ntf_res) {
                if (!!tea.mod.__teaHouseInfo && !!data) {
                    if (tea.mod.__teaHouseInfo.hid != data.hid) { return; }
                    if(tea.mod.__teaHouseInfo.uid===data.uid)
                        tea.mod.__teaHouseInfo.is_limit_game = !data.allow_game;
                    kaayou.emit("tea", "ui::TeaHouse::NoGameChange");
                }
            }

            //同意申请或退圈
            @BindEvent("lobby", kaayou.MakeResultMessageHead(houseMemHeadMsg.housememberagree_ntf))
            onAgree(data:proto_housememberagree_ntf_res) {
                if (!!tea.mod.__teaHouseInfo && !!data) {
                    if (tea.mod.__teaHouseInfo.hid != data.hid) { return; }
                    kaayou.emit("tea", 'mod::Member::GetApplyList', { param: "", clear: true });
                }
            }

            //拒绝申请或退圈
            @BindEvent("lobby", kaayou.MakeResultMessageHead(houseMemHeadMsg.housememberrefused_ntf))
            onReject(data:proto_housememberagree_ntf_res) {
                if (!!tea.mod.__teaHouseInfo && !!data) {
                    if (tea.mod.__teaHouseInfo.hid != data.hid) { return; }
                    kaayou.emit("tea", 'mod::Member::GetApplyList', { param: "", clear: true });
                }
            }
            
        }
    }
    tea.mod.HouseMember.getInstance();
}