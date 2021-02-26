namespace tea {
    const { BindEvent, doBindEvent } = kaayou._decorator;





    export namespace mod {
        export class HousePartner {
            static __INS__: tea.mod.HousePartner = null;
            static getInstance(): tea.mod.HousePartner {
                if (HousePartner.__INS__ == null) {
                    HousePartner.__INS__ = new HousePartner();
                    HousePartner.__INS__.initMod();
                }
                return HousePartner.__INS__;
            }
            @doBindEvent
            initMod() { }

            @BindEvent("tea", "mod::TeaHouse::GetMyConfig")
            async getMyConfig() {
                if (!!!__teaHouseInfo) {
                    return;
                }
                kaayou.emit("common", "ui::Loading::Show");
                let sdata: proto_houseparnterroyaltyforme = {
                    hid: lodash.toInteger(__teaHouseInfo.hid),
                    uid: __teaHouseInfo.uid
                }
                let info = await kaayou.sendMessage("lobby", housePartnerHead.houseparnterroyaltyforme, sdata, kaayou.MakeResultMessageHead(housePartnerHead.houseparnterroyaltyforme));
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "获取信息失败！" })
                    return;
                }
                if (!info) {
                    return;
                }
                kaayou.emit("tea", "ui::TeaHouse::updateMyConfigList", info.item);

            }

            //获取队长分组信息
            @BindEvent("tea", 'mod::House::GetPatnerGroupList')
            async GetPatnerGroupList() {
                if (!__teaHouseInfo) {
                    return;
                }
                kaayou.emit("common", "ui::Loading::Show");
                let sdata: IBASE_HOUSEREQ = {
                    hid: __teaHouseInfo.hid
                }
                let res = await kaayou.sendMessage('lobby', housePartnerHead.housememgroupinfo, sdata, kaayou.MakeResultMessageHead(housePartnerHead.housememgroupinfo));
                kaayou.emit("common", "ui::Loading::Hide");
                if (res.errcode) {
                    kaayou.emit('common', 'ui::Dialog::Show', {
                        msg: res.msg || "获取分组列表失败"
                    })
                    return;
                }
                let i = 1;
                for (let x in res.groups) {
                    res.groups[x].groupNO = i;
                    i++;
                }
                kaayou.emit("tea", "ui::TeaHouse::UpdatePartnerSetGroup", res);
            }

            //添加分组
            @BindEvent("tea", 'mod::House::addPatnerGroupList')
            async addPatnerGroupList() {
                if (!__teaHouseInfo) {
                    return;
                }
                kaayou.emit("common", "ui::Loading::Show");
                let sdata: IBASE_HOUSEREQ = {
                    hid: __teaHouseInfo.hid
                }
                let res = await kaayou.sendMessage('lobby', housePartnerHead.housememgroupadd, sdata, kaayou.MakeResultMessageHead(housePartnerHead.housememgroupadd));
                kaayou.emit("common", "ui::Loading::Hide");
                if (res.errcode) {
                    kaayou.emit('common', 'ui::Dialog::Show', {
                        msg: res.msg || "添加分组列表失败"
                    })
                    return;
                }
                let i = 1;
                for (let x in res.groups) {
                    res.groups[x].groupNO = i;
                    i++;
                }
                kaayou.emit("common", 'ui::Toast::Show', { msg: "操作成功！" });
                kaayou.emit("tea", "ui::TeaHouse::UpdatePartnerSetGroup", res);
            }

            //删除分组
            @BindEvent("tea", 'mod::House::deletedPatnerGroupList')
            async deletedPatnerGroupList(data: { group_id: number }) {
                if (!__teaHouseInfo) {
                    return;
                }
                kaayou.emit("common", "ui::Loading::Show");
                let sdata: proto_housememgroupdel = {
                    hid: __teaHouseInfo.hid, group_id: data.group_id
                }
                let res = await kaayou.sendMessage('lobby', housePartnerHead.housememgroupdel, sdata, kaayou.MakeResultMessageHead(housePartnerHead.housememgroupdel));
                kaayou.emit("common", "ui::Loading::Hide");
                if (res.errcode) {
                    kaayou.emit('common', 'ui::Dialog::Show', {
                        msg: res.msg || "删除分组列表失败"
                    })
                    return;
                }
                let i = 1;
                for (let x in res.groups) {
                    res.groups[x].groupNO = i;
                    i++;
                }
                kaayou.emit("common", 'ui::Toast::Show', { msg: "操作成功！" });
                res.deletedId = data.group_id;
                kaayou.emit("tea", "ui::TeaHouse::UpdatePartnerSetGroup", res);
                //如果删除的分组刚好是现在选择的这个组；
                // kaayou.emit("tea","ui::TeaHouse::UpdateListWhenDeletedGroup",data);
            }

            //分组用户列表
            __GroupMemberList: Array<memberNotInGroupItem> = null;
            __GroupmemberParam = "";
            __Groupmemtotalnum = -1
            __GroupmemberBegan = -1
            __Grouptotalnum = -1
            __Grouponlinenum = -1
            @BindEvent("tea", 'mod::House::partnerGroupMemberList')
            async partnerGroupMemberList(data: { param: string, group_id: number, clear: boolean }) {
                if (!__teaHouseInfo) {
                    return;
                }
                // kaayou.emit("common", "ui::Loading::Show");
                // let res = await kaayou.sendMessage('lobby', "housememgroupuserlist", { hid: __teaHouseInfo.hid }, "ws::Msg::housememgroupuserlist");
                // kaayou.emit("common", "ui::Loading::Hide");
                // if (res.errcode) {
                //     kaayou.emit('common', 'ui::Dialog::Show', {
                //         msg: res.msg || "获取分组用户列表失败"
                //     })
                //     return;
                // }
                // kaayou.emit("lobby", 'ui::CustomService::ShowData', res);

                // if (!(__teaHouseRole & HouseRoleTable.VIEW_MEMBER)) { return; }

                data = data || { param: "", clear: false, group_id: 0 };
                data.param = data.param || "";
                data.clear = data.clear || false;

                this.__GroupMemberList = lodash.isEmpty(this.__GroupMemberList) ? [] : this.__GroupMemberList;
                if (!lodash.eq(this.__GroupmemberParam, data.param) || data.clear) {
                    this.__GroupmemberBegan = 0;
                    this.__GroupMemberList = [];
                }
                this.__GroupmemberParam = data.param;

                // if (this.__Groupmemtotalnum != -1 && this.__GroupmemberBegan >= this.__Groupmemtotalnum) {
                //     //发送空数据保持不刷新
                //     kaayou.emit("tea", 'ui::TeaHouse::partnerGroupMemberList', { list: null, update: false });
                //     return;
                // }
                // let end = this.__memtotalnum == -1 ? this.__memberBegan + 9 : this.__memtotalnum;
                // let end = this.__GroupmemberBegan + 49;

                let req: proto_housememgroupaddlist = {
                    hid: __teaHouseInfo.hid,
                    searchkey: this.__GroupmemberParam || '',
                    group_id: data.group_id,
                    start: this.__GroupmemberBegan,
                    count: 50
                };

                kaayou.emit("common", "ui::Loading::Show");
                //cc.log("获取成员列表数据" + data.role + "：" + data.pbeg + "-" + (data.pend));



                let info: proto_housememgroupaddlist_res = await kaayou.sendMessage("lobby", housePartnerHead.housememgroupaddlist, req, kaayou.MakeResultMessageHead(housePartnerHead.housememgroupaddlist));
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "获取列表失败！" });
                    return;
                }
                // this.__Groupmemtotalnum = info.totalnum; //查询条数
                // this.__Grouptotalnum = info.hmemnum;  //成员数量
                // this.__Grouponlinenum = info.hmemonlinenum; //在线数量
                // this.__GroupmemberBegan = Math.min(end + 1, this.__Groupmemtotalnum);
                if (this.__GroupmemberBegan == info.start) {
                    for (var x in info.users) {
                        let tempItem = info.users[x];
                        let memberInfo = {
                            limit: tempItem.limit,
                            uid: tempItem.uid,
                            uname: tempItem.uname,
                            uurl: tempItem.uurl,
                            ugender: tempItem.ugender,
                            group_id: info.group_id,
                        };
                        this.__GroupMemberList.push(memberInfo);
                    }
                    this.__GroupmemberBegan += info.users.length;
                }

                kaayou.emit("tea", 'ui::TeaHouse::partnerGroupMemberList', { list: this.__GroupMemberList, update: true });
            }


            //不在分组内用户列表
            // @BindEvent("tea", 'mod::House::NotInList')
            // async GetNotInList() {
            //     if (!__teaHouseInfo) {
            //         return;
            //     }
            //     kaayou.emit("common", "ui::Loading::Show");
            //     let res = await kaayou.sendMessage('lobby', "housememgroupaddlist", { hid: __teaHouseInfo.hid }, "ws::Msg::housememgroupaddlist");
            //     kaayou.emit("common", "ui::Loading::Hide");
            //     if (res.errcode) {
            //         kaayou.emit('common', 'ui::Dialog::Show', {
            //             msg: res.msg || "获取失败"
            //         })
            //         return;
            //     }

            // }


            //将用户添加进分组
            @BindEvent("tea", 'mod::House::AddMemToList')
            async AddMemToList(data: { group_id: number, uid: number }) {
                if (!__teaHouseInfo) {
                    return;
                }
                kaayou.emit("common", "ui::Loading::Show");
                let sdata: proto_housememgroupuseradd = {
                    hid: __teaHouseInfo.hid, uid: data.uid, group_id: data.group_id
                }
                let res = await kaayou.sendMessage('lobby', housePartnerHead.housememgroupuseradd, sdata, kaayou.MakeResultMessageHead(housePartnerHead.housememgroupuseradd));
                kaayou.emit("common", "ui::Loading::Hide");
                if (res.errcode) {
                    kaayou.emit('common', 'ui::Dialog::Show', {
                        msg: res.msg || "添加失败"
                    })
                    return;
                }
                let i = 1;
                for (let x in res.groups) {
                    res.groups[x].groupNO = i;
                    i++;
                }
                kaayou.emit("tea", "ui::TeaHouse::UpdatePartnerSetGroup", res);
                kaayou.emit("tea", "ui::TeaHouse::UpdateMemberStatus", data);
            }
            //将用户移除分组
            @BindEvent("tea", 'mod::House::removeMemFromList')
            async removeMemFromList(data: { group_id: number, uid: number }) {
                if (!__teaHouseInfo) {
                    return;
                }
                kaayou.emit("common", "ui::Loading::Show");
                let sdata: proto_housememgroupuseradd = {
                    hid: __teaHouseInfo.hid, uid: data.uid, group_id: data.group_id
                }
                let res = await kaayou.sendMessage('lobby', housePartnerHead.housememgroupuserdel, sdata, kaayou.MakeResultMessageHead(housePartnerHead.housememgroupuserdel));
                kaayou.emit("common", "ui::Loading::Hide");
                if (res.errcode) {
                    kaayou.emit('common', 'ui::Dialog::Show', {
                        msg: res.msg || "移除失败"
                    })
                    return;
                }
                let i = 1;
                for (let x in res.groups) {
                    res.groups[x].groupNO = i;
                    i++;
                }
                kaayou.emit("tea", "ui::TeaHouse::UpdatePartnerSetGroup", res);
                kaayou.emit("tea", "ui::TeaHouse::UpdateMemberStatus", data);
            }



            //团队统计
            __NoUnionList: Array<any> = null;
            __NoUnionParam = "";
            __NoUnionBegan = -1;
            __NoUnionfid = -1;
            @BindEvent("tea", 'mod::TeaHouse::TeamStatistics')
            async partnerNoUnionList(data: { param: string, fid: number, daytype: number, clear: boolean ,partnerlevel:number,
                querytimeinterval:number ,querytimerange:number,lowscoreflag:number,roundtype:number,likeflag:number}) {
                if (!__teaHouseInfo) {
                    return;
                }
                data = data || {roundtype:0, param: "", clear: false, fid: -1, daytype: 0,partnerlevel:-1,querytimeinterval:0,querytimerange:1 ,lowscoreflag:0,likeflag:0};
                data.param = data.param || "";
                data.clear = data.clear || false;
                this.__NoUnionList = lodash.isEmpty(this.__NoUnionList) ? [] : this.__NoUnionList;
                if (!lodash.eq(this.__NoUnionParam, data.param) || data.clear) {
                    this.__NoUnionBegan = 0;
                    this.__NoUnionList = [];
                }
                this.__NoUnionParam = data.param;

                let end = this.__NoUnionBegan + 49;

                let req: proto_housenoleaguestatistics = {
                    hid: __teaHouseInfo.hid,
                    fid: data.fid,
                    searchkey: this.__NoUnionParam || '',
                    pbegin: this.__NoUnionBegan,
                    pend: end,
                    daytype: data.daytype,
                    partnerlevel:data.partnerlevel,
                    querytimeinterval:data.querytimeinterval,
                    querytimerange:data.querytimerange,
                    lowscoreflag:data.lowscoreflag,
                    roundtype:data.roundtype || 0,
                    likeflag:data.likeflag
                };

                kaayou.emit("common", "ui::Loading::Show");
                let info = await kaayou.sendMessage("lobby", housePartnerHead.housenoleaguestatistics, req, kaayou.MakeResultMessageHead(housePartnerHead.housenoleaguestatistics));
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "获取列表失败！" });
                    kaayou.emit("tea", 'ui::TeaHouse::TeamStatistics', { list: null, update: false });
                    return;
                }
                let resData={
                    allplaytimes:info.allplaytimes,
                    capplaytimes:info.capplaytimes,
                    items:[]
                }
                if (this.__NoUnionBegan == info.pbegin) {
                    for (var x in info.items) {
                        let tempItem = info.items[x];
                        let noUnionModel = {
                            islike:tempItem.islike,
                            parnterlevel: tempItem.parnterlevel,
                            playtimes: tempItem.playtimes,
                            uid: tempItem.uid,
                            uname: tempItem.uname,
                            uurl: tempItem.uurl,
                            invalidtimes: tempItem.invalidtimes,
                            ugender: tempItem.ugender,
                            changeprofit: tempItem.changeprofit,
                            bwtimes: tempItem.bwtimes,
                            superior:tempItem.superior,
                            superiorname:tempItem.superiorname
                        };
                        this.__NoUnionList.push(noUnionModel);
                    }
                    resData.items=this.__NoUnionList;
                    this.__NoUnionBegan += info.items.length;

                }

                kaayou.emit("tea", 'ui::TeaHouse::TeamStatistics', { list: resData, update: true });
            }




        }
    }
    tea.mod.HousePartner.getInstance();
}