namespace tea {
    const { BindEvent, doBindEvent } = kaayou._decorator;

   

    export namespace mod {
        export class HouseActivity {
            static __INS__: tea.mod.HouseActivity = null;
            static getInstance(): tea.mod.HouseActivity {
                if (HouseActivity.__INS__ == null) {
                    HouseActivity.__INS__ = new HouseActivity();
                    HouseActivity.__INS__.initMod();
                }
                return HouseActivity.__INS__;
            }
            @doBindEvent
            initMod() { }
            // kaayou.emit("tea","mod::TeaHouse::createrAct", data);
            @BindEvent("tea", "mod::TeaHouse::createrAct")
            async onSubmitAct(data: Data_ActivityCreate) {
                kaayou.emit("common", "ui::Loading::Show");
                let info = await kaayou.sendMessage("lobby", houseActMsg.houseactivitycreate, data, kaayou.MakeResultMessageHead(houseActMsg.houseactivitycreate));
                kaayou.emit("common", "ui::Loading::Hide");

                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "操作失败！" });
                    return;
                }
                //创建活动成功之后需要将刷新活动info界面
                kaayou.emit("tea", "ui::createActivityPanel::Hide");
                this.GetActList();
            }


            //亲友圈活动列表
            @BindEvent("tea", 'mod::TeaHouse::GetActList')
            async GetActList() {
                if (!!!__teaHouseInfo || !!!__teaHouseInfo.hid) return;
                let data : IBASE_HOUSEREQ = {
                    hid: __teaHouseInfo.hid,
                }
                kaayou.emit("common", "ui::Loading::Show");
                let info : proto_houseactivitylist_res = await kaayou.sendMessage("lobby", houseActMsg.houseactivitylist, data, kaayou.MakeResultMessageHead(houseActMsg.houseactivitylist));
                kaayou.emit("common", "ui::Loading::Hide");

                if (!!!info || info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "操作失败！" });
                    return;
                }
                kaayou.emit("tea", 'ui::TeaHouseActivity::reflashUI', info.actitmes);
                //kaayou.emit("tea", "mod::TeaHouse::getTeaHouseInfo", {hid:__teaHouseInfo.hid});
                let status = false
                if (lodash.isEmpty(info.actitmes)) {
                    status = false;
                } else {
                    for (var k in info.actitmes) {
                        let item = info.actitmes[k];
                        //200414:0未开始、1一开始、2已结束
                        if (item.actstate == 1) {
                            status = true;
                            break;
                        }
                    }
                }
                kaayou.emit("tea", "ui::TopMenuBlock::setActivityStatus", { status: status })
            }

            //亲友圈活动详情
            @BindEvent("tea", 'mod::TeaHouse::GetActInfo')
            async GetActData(actid: number) {

                let data : proto_houseactivityinfo= {
                    hid: __teaHouseInfo.hid,
                    actid: actid,
                }

                kaayou.emit("common", "ui::Loading::Show");
                let info : proto_houseactivityinfo_res = await kaayou.sendMessage("lobby", houseActMsg.houseactivityinfo, data, kaayou.MakeResultMessageHead(houseActMsg.houseactivityinfo));
                kaayou.emit("common", "ui::Loading::Hide");

                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "操作失败！" });
                    return;
                }
                if (lodash.isEmpty(info.fids)) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: "活动楼层数据为空~~~" });
                    return;
                }
                let tempdata: Data_CurActivityInfo = {
                    actid: info.actid,
                    actname: info.actname,
                    acttype: info.acttype,
                    actstate: info.actstate,
                    actstartime: info.begtime,
                    actendime: info.endtime,
                    userlist: info.useritems,
                    fids: info.fids.sort(function (a, b) {
                        return a - b;
                    }),
                    fidindexs: info.fidindexs.sort(function (a, b) {
                        return a - b;
                    }),
                    hideinfo: info.hideinfo,
                    type: info.type,
                }
                kaayou.emit("tea", 'ui::TeaHouseActivity::ActInfo', tempdata);
            }


            //删除亲友圈活动
            @BindEvent("tea", 'mod::TeaHouse::deleteAct')
            async deleteAct(data:proto_houseactivityinfo) {
                kaayou.emit("common", "ui::Loading::Show");
                let info = await kaayou.sendMessage("lobby", houseActMsg.houseactivitydelete, data, kaayou.MakeResultMessageHead(houseActMsg.houseactivitydelete));
                kaayou.emit("common", "ui::Loading::Hide");
                // cc.log("删除回返：", info);
                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "操作失败！" });
                    return;
                }
                this.GetActList();
            }


            //活动配置接口  设置奖励接口
            @BindEvent("tea", 'mod::TeaHouse::houseluckconfig')
            async houseluckconfig(data: Data_HouseLuckSet) {
                kaayou.emit("common", "ui::Loading::Show");
                let info = await kaayou.sendMessage("lobby", houseActMsg.houseluckconfig, data, kaayou.MakeResultMessageHead(houseActMsg.houseluckconfig));
                kaayou.emit("common", "ui::Loading::Hide");
                // cc.log("删除回返：", info);
                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "操作失败！" });
                    return;
                }
            }


            __memberList: Array<Data_floorVipInfo> = null;
            __memberBegan: number = 0;
            __memberParam: string = "";
            __memtotalnum: number = -1;

            __memberList2: Array<Data_floorVipInfo> = null;
            __memberBegan2: number = 0;
            __memberParam2: string = "";
            __memtotalnum2: number = -1;
            @BindEvent("tea", 'mod::TeaHouse::setFloorVip')
            async getPartnerMember(data: { param: string, fid: number, clear: boolean, is_vip: boolean }) {
                let self = this;
                if (!(__teaHouseRole & HouseRoleTable.VIEW_MEMBER)) { return; }
                data = data || { param: "", clear: false, fid: 0, is_vip: false };
                data.param = data.param || "";
                data.clear = data.clear || false;
                kaayou.emit("common", "ui::Loading::Show");
                interface Res_Data {
                    items: Array<Data_floorVipInfo>
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
                        kaayou.emit("tea", 'ui::Member::UpdateFloorVipMemberList', { list: null, update: false, is_vip: clientdata.is_vip, totalnum: memtotalnum });
                        return;
                    }
                    //end = memberBegan + 49;
                    end = memberBegan + 49;
                    req = {
                        hid: __teaHouseInfo.hid,
                        is_vip: clientdata.is_vip,
                        param: memberParam || '',
                        fid: clientdata.fid,
                        pbeg: memberBegan,
                        pend: end
                    };
                    let info = <Res_Data>await kaayou.sendMessage("lobby", msgHead, req, "ws::Msg::" + msgHead);
                    kaayou.emit("common", "ui::Loading::Hide");
                    if (info.errcode) {
                        kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "获取列表失败！" });
                        kaayou.emit("tea", 'ui::Member::UpdateFloorVipMemberList', { list: null, update: false, is_vip: clientdata.is_vip, totalnum: memtotalnum });
                        return;
                    }
                    for (var x in info.items) {
                        let tempItem = info.items[x];
                        let memberInfo: Data_floorVipInfo = {
                            uid: tempItem.uid,
                            ugender: tempItem.ugender,
                            uname: tempItem.uname,
                            uurl: tempItem.uurl,
                            is_vip: clientdata.is_vip,
                            fid: clientdata.fid
                        }
                        memberList.push(memberInfo);
                    }
                    memtotalnum = info.totalnum; //查询条数
                    // this.__totalnum = info.hmemnum;  //成员数量
                    // this.__onlinenum = info.hmemonlinenum; //在线数量
                    memberBegan = Math.min(end + 1, memtotalnum);
                    kaayou.emit("tea", 'ui::Member::UpdateFloorVipMemberList', { list: memberList, update: true, is_vip: clientdata.is_vip, totalnum: memtotalnum });
                    if (!data.is_vip) {
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
                if (!data.is_vip) {
                    fn(self.__memberList, self.__memberParam, self.__memtotalnum, self.__memberBegan, data, "houseflooreverymanget");
                } else {
                    fn(self.__memberList2, self.__memberParam2, self.__memtotalnum2, self.__memberBegan2, data, "housefloorvipusersget");
                }
            }



            @BindEvent("tea", 'mod::TeaHouse::SetfloorVipMember')
            async setPartnerMember(data : proto_housefloorsetvipuser) {
                kaayou.emit("common", "ui::Loading::Show");
                let info = await kaayou.sendMessage("lobby", houseActMsg.housefloorsetvipuser, data, kaayou.MakeResultMessageHead(houseActMsg.housefloorsetvipuser));
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "操作失败！" });
                    kaayou.emit("tea", 'ui::TeaHouse::ShowSetVipFloorMemPanel');
                    return;
                }
                kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "操作成功！" });
            }
            @BindEvent("lobby", "ws::Msg::housefloorvipuserset_ntf")
            async changeSetVipUpdate(data: proto_housefloorsetvipuser) {
                //这个地方要去刷新界面上左右的玩家数据
                if (!!!data) return;
                if (!!!__teaHouseInfo || !__teaHouseInfo.hid) return;
                console.log("推送设置Vip", data);
                kaayou.emit("tea", "ui::house::updateSetFloorVipList", data);
            }
            @BindEvent("lobby", "ws::Msg::housefloorsetallvipuser_ntf")
            async housefloorsetallvipuser_ntf(data) {
                //这个地方要去刷新界面上左右的玩家数据  一键操作vip
                if (!!!data) return;
                if (!!!__teaHouseInfo || !__teaHouseInfo.hid) return;
                console.log("推送设置Vip一键", data);
                kaayou.emit("tea", "ui::house::updateSetFloorVipAllList");
            }


        }
    }
    tea.mod.HouseActivity.getInstance();
}