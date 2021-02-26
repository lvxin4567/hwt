namespace tea {
    const { BindEvent, doBindEvent } = kaayou._decorator;

    interface ITeaTabelCreate {
        /**@description 匿名时桌子编号*/
        atid: number,
        hid: number, //茶楼id
        fid: number, //楼层id
        ntid: number,//桌子序号
        tid: number,//桌子id
    }

    interface ITeaTabelDel {
        hid: number, //茶楼id
        fid: number, //楼层id
        ntid: number,//桌子序号
        trule?: Data_HosueFrule
    }

    export interface ITeaTableUserIn {
        hid: number, //茶楼id
        fid: number, //楼层id
        ntid: number,//桌子序号
        nuid: number //椅子序号
        uid: number //玩家id
        uname: string //玩家名称
        urole?: number//玩家身份
        uremark: string
        uurl: string //头像
        ugender: number //性别
        online: boolean //是否在线
        ready: boolean   //是否准备
        // ip:string // ip
    }

    export interface ImainTableinfo {
        canwatch: false,
        fid: number,
        gameName: string,
        hid: number,
        isMix: boolean,
        trule: any,
        ismain: boolean,
        matchIngnum: number,
        fullNum: number,
        players: { [key: string]: ITeaTableUserIn },
    }


    interface ITeaTabelUserOut {
        hid: number, //茶楼id
        fid: number, //楼层id
        ntid: number,//桌子序号
        nuid: number //椅子序号
        uid: number //玩家id
    }

    // export interface Data_TableDetail {
    //     currentround: number,
    //     fid: number,
    //     maxplayernum: number,
    //     ntid: number,
    //     online: boolean,
    //     person: Array<{ id: number, imgurl: string, ip: string, nickname: string, online: boolean, partner: string }>,
    //     roundnum: number,
    //     tid: number
    // }

    export interface ITeaHouseTableItem extends ITeaTabelCreate {
        begin: boolean,
        canwatch: boolean,
        deleted: boolean,
        gameName: string,
        isMix: boolean,
        players: { [key: string]: ITeaTableUserIn },
        step: number,
        total_round: number,
        trule: Data_HosueFrule,
        ismain: boolean,    //是否客户端自己生成的空桌子
        matchIngnum: number
        fullNum: number,
        hideimg?: boolean,
        watchericons: Array<string>,
    }
    export interface ITeaHouseTableList {
        [key: string]: ITeaHouseTableItem,
    }


    export namespace mod {

        export let __teaHouseTableList: Array<ITeaHouseTableItem> = [];
        export let __teaHouseTableType = ["lan", "lv", "red", "zi", "pu", "deongaree", "skyBlue", "yellowish", "caolv", "roseo"];
        export let __teaHouseMainTableList: ImainTableinfo[] = [];     //智能模式主table
        // export type autoAddTable = {[fid: string]: Array<any>};    //自动加桌猪猪模式；
        export class HouseTabel {
            static __INS__: tea.mod.HouseTabel = null;
            static getInstance(): tea.mod.HouseTabel {
                if (HouseTabel.__INS__ == null) {
                    HouseTabel.__INS__ = new HouseTabel();
                    HouseTabel.__INS__.initMod();
                }
                return HouseTabel.__INS__;
            }
            // isUpdate: boolean = false;
            @doBindEvent
            initMod() { }

            @BindEvent("tea", 'mod::Table::Reset')
            resetTabel(data) {
                __teaHouseTableList = [];
            }

            //如果是clear=true  会重置到最左边，当收到推送的时候需要停留在玩家滑到的这个位置。。。
            @BindEvent("tea", 'mod::Table::GetUpdateList')
            GetUpdateList(data?: { clear: boolean }) {
                if (!!!__teaHouseInfo) {
                    return;
                }
                let newArr = [];
                //如果是防作弊模式
                if (__teaHouseInfo.mix_active && __teaHouseInfo.isCurFloorMix && __teaHouseInfo.house_table_join_type == 2) {
                    newArr = HouseTabel.getInstance().arrangeTableDataInMatch();
                } else if ((__teaHouseInfo.mix_active && __teaHouseInfo.isCurFloorMix && __teaHouseInfo.house_table_join_type == 1)) {
                    newArr = this.arrangeAutoAddTable();
                    console.log(newArr)
                }
                else {
                    newArr = __teaHouseTableList;
                }
                //说明玩家选择了桌子   混排模式下需要在方法里面选筛选出选择的桌子。。但是假桌子没有筛选。普通手动家加桌也需要筛选选择的桌子。判断混排在外面再筛选一次；
                if (__teaHouseInfo.isCurFloorMix) {
                    let selectArr = [];

                    if (__teaHouseInfo.__selectFloorTable.indexOf(-1) < 0) {
                        for (let i = 0; i < newArr.length; i++) {
                            if (__teaHouseInfo.__selectFloorTable.indexOf(newArr[i].fid) > -1) {
                                selectArr.push(newArr[i]);
                            }
                        }
                        newArr = selectArr;
                    }

                }

                if (!!data) {
                    kaayou.emit("tea", "ui::TeaHouse::UpdateMaxTable", { num: newArr.length, isClear: data.clear });
                }
                kaayou.emit('tea', "ui::Table::UpdateList", newArr);
            }
            //当混排模式为自动加桌模式时
            //1、首先删除没有人的桌子
            /**
             * 1、首先删除没有人的桌子
             * 2、挑选出已经开始的了的和没有开始的桌子
             * 3、清理掉之前自动加桌每层楼没有开始桌子的数量
             * 4、计算每层楼空桌子的数量
             * 5、满足设置的空桌子数量不需要补空桌，不满足的就补充该楼层的空桌子数量
             */
            arrangeAutoAddTable() {
                if (!__teaHouseInfo || __teaHouseInfo.hid == 0 || lodash.isEmpty(__teaHouseMainTableList)) {
                    return;
                }
                let newList = [];

                try {
                    //选出未被删除的桌子
                    for (var t in __teaHouseTableList) {
                        if (Object.keys(__teaHouseTableList[t].players).length != 0) {
                            newList.push(__teaHouseTableList[t]);
                        }
                    }

                    //重置自动加桌未开始桌子以及有人的桌子数；
                    for (let index = 0; index < __teaHouseMainTableList.length; index++) {
                        __teaHouseInfo.floorsMap[__teaHouseMainTableList[index].fid].autoCount = 0;
                        __teaHouseInfo.floorsMap[__teaHouseMainTableList[index].fid].autoTableCount = 0;
                    }

                    //选出未开始桌子与满桌子数据
                    let emptyTable: Array<ITeaHouseTableItem> = [];  //未开始的桌子
                    let startTable: Array<ITeaHouseTableItem> = [];  //已经开始的桌子   
                    console.log("__teaHouseTableList", __teaHouseTableList)
                    for (var t in newList) {
                        __teaHouseInfo.floorsMap[newList[t].fid].autoTableCount++;
                        //如果是开局了，或者是未开局，但是人数已经满了。。。。都算满桌
                        if (newList[t].begin || (Object.keys(newList[t].players).length == newList[t].trule.playernum)) {
                            startTable.push(newList[t]);
                        } else {
                            emptyTable.push(newList[t]);
                        }
                    }
                    //根据空桌子排位前后合成新的数据
                    let returnTable = [];
                    //计算未开始桌子数量
                    for (let i = 0; i < emptyTable.length; i++) {
                        __teaHouseInfo.floorsMap[emptyTable[i].fid].autoCount++;
                    }
                    let openTypeEmArr = [];     //空桌    新模式
                    if (__teaHouseInfo.create_table_type) {   //  0人满开桌   1另开新桌
                        for (let t = 0; t < __teaHouseMainTableList.length; t++) {   //生成空桌
                            let floorInfo = __teaHouseInfo.floorsMap[__teaHouseMainTableList[t].fid];
                            if (!floorInfo || !__teaHouseMainTableList[t].isMix) {
                                continue;
                            }
                            let model = {
                                canwatch: __teaHouseMainTableList[t].canwatch,
                                fid: __teaHouseMainTableList[t].fid,
                                gameName: __teaHouseMainTableList[t].gameName,
                                hid: __teaHouseInfo.hid,
                                isMix: __teaHouseMainTableList[t].isMix,
                                ntid: -3,
                                tid: 0,
                                players: {},
                                step: 0,
                                total_round: floorInfo.floorItem.frule.roundnum,
                                ismain: false,
                                begin: false,
                                trule: floorInfo.floorItem.frule,
                                hideimg: !!floorInfo.floorItem.hideimg,
                                matchIngnum: 0,
                                fullNum: 0,
                                deleted: false,
                                watchericons: []
                            }

                            if (floorInfo.autoTableCount < __teaHouseInfo.hmaxtable) {
                                openTypeEmArr.push(model);
                            }
                        }
                    } else {
                        // let tableArr: Array<ITeaHouseTableItem> = [];    //自动加桌模式正常排序
                        // __teaHouseInfo.empty_table_max = 1 //  这个是2.29需求中去掉了对应的最大空桌数。默认是1   
                        for (let i = 0; i < __teaHouseMainTableList.length; i++) {
                            //补桌子的时候需要判断是不是混排，不是混排的跳过
                            //当现有的桌子数加上需要补的桌数的时候。。。不能再补了
                            let floorInfo = __teaHouseInfo.floorsMap[__teaHouseMainTableList[i].fid];
                            if (!floorInfo || !__teaHouseMainTableList[i].isMix) {
                                continue;
                            }

                            // for (let j in emptyTable) {
                            //     if (emptyTable[j].fid == __teaHouseMainTableList[i].fid) {
                            //         tableArr.push(emptyTable[j]);
                            //     }
                            // }

                            let offsetIndex = __teaHouseInfo.empty_table_max - floorInfo.autoCount;
                            if ((offsetIndex + floorInfo.autoTableCount) > __teaHouseInfo.hmaxtable) {
                                offsetIndex = __teaHouseInfo.hmaxtable - floorInfo.autoTableCount;
                            }
                            if (offsetIndex > 0) {
                                for (let j = 0; j < offsetIndex; j++) {
                                    let model = {
                                        canwatch: __teaHouseMainTableList[i].canwatch,
                                        fid: __teaHouseMainTableList[i].fid,
                                        gameName: __teaHouseMainTableList[i].gameName,
                                        hid: __teaHouseInfo.hid,
                                        isMix: __teaHouseMainTableList[i].isMix,
                                        ntid: -3,
                                        tid: 0,
                                        players: {},
                                        step: 0,
                                        total_round: floorInfo.floorItem.frule.roundnum,
                                        ismain: false,
                                        begin: false,
                                        trule: floorInfo.floorItem.frule,
                                        hideimg: !!floorInfo.floorItem.hideimg,
                                        matchIngnum: 0,
                                        fullNum: 0,
                                        deleted: false,
                                        watchericons: []
                                    }
                                    // tableArr.push(model);//           补的桌子一定是空桌
                                    openTypeEmArr.push(model);
                                }
                            }
                        }
                    }




                    startTable = lodash.sortBy(startTable, function (item) {
                        return item.fid;
                    })

                    //选择出玩家选择的桌子   后面还是在筛选一遍。。。那些假桌子  
                    if (__teaHouseInfo.__selectFloorTable.indexOf(-1) < 0) { //说明玩家选择了桌子 -1表示所有桌子都选了
                        let selectArr = [];
                        for (let i = 0; i < startTable.length; i++) {
                            if (__teaHouseInfo.__selectFloorTable.indexOf(startTable[i].fid) > -1) {
                                selectArr.push(startTable[i]);
                            }
                        }
                        startTable = selectArr;
                    }

                    //是否设置了桌子显示，但是对圈主和管理员无效  
                    if (__teaHouseInfo.tblshowcount > 0 && !(__teaHouseInfo.teahouserule & HouseRoleTable.VIEW_STAT_RECORD_TEA_PLAY)) {
                        if (startTable.length > __teaHouseInfo.tblshowcount) {
                            startTable = startTable.slice(0, __teaHouseInfo.tblshowcount);
                        }
                    }
                    switch (__teaHouseInfo.new_table_sort_type) {
                        case 1:
                            returnTable = openTypeEmArr.concat(emptyTable).concat(startTable);
                            break;
                        case 2:
                            returnTable = openTypeEmArr.concat(startTable).concat(emptyTable);
                            break;
                        case 3:
                            returnTable = emptyTable.concat(openTypeEmArr).concat(startTable);
                            break;
                        case 4:
                            returnTable = emptyTable.concat(startTable).concat(openTypeEmArr);
                            break;
                        case 5:
                            returnTable = startTable.concat(openTypeEmArr).concat(emptyTable);
                            break;
                        case 6:
                            returnTable = startTable.concat(emptyTable).concat(openTypeEmArr);
                            break;
                        default:
                            break;
                    }
                    return returnTable;
                } catch (error) {
                    kaayou.emit("common", "ui::Toast::Show", { msg: "桌子数据整理中！！~" })
                }
            }


            //整理楼层桌子数据 当数据混排模式为防沉迷的时候 正在匹配的人
            arrangeTableDataInMatch() {
                let matchTableHash = {};         //记录正在匹配的人数
                let matchFullTableHash = {};     //记住满桌子的数量
                let fullTable = [];              //记住满桌子数据 
                let mainHeadInfo = {};           //

                try {

                    for (var m in __teaHouseMainTableList) {
                        matchFullTableHash[__teaHouseMainTableList[m].fid] = 0;
                    }

                    for (var t in __teaHouseTableList) {
                        if (!!__teaHouseTableList[t]) {
                            if (!__teaHouseTableList[t].begin) {
                                if (Object.keys(__teaHouseTableList[t].players).length != 0) {
                                    matchTableHash[__teaHouseTableList[t].fid] = Object.keys(__teaHouseTableList[t].players).length;        //获取正在匹配的人数
                                    mainHeadInfo[__teaHouseTableList[t].fid] = __teaHouseTableList[t].players;
                                }
                            } else {   //满桌子的数据
                                matchFullTableHash[__teaHouseTableList[t].fid] += 1;
                                fullTable.push(__teaHouseTableList[t]);
                            }
                        }
                    }
                    // if (!this.isUpdate) {
                    //     for (var m in __teaHouseMainTableList) {
                    //         let mianfid = __teaHouseMainTableList[m].fid
                    //         __teaHouseMainTableList[m].matchIngnum = !!matchTableHash[mianfid] ? matchTableHash[mianfid] : 0
                    //         __teaHouseMainTableList[m].fullNum = !!matchFullTableHash[mianfid] ? matchFullTableHash[mianfid] : 0
                    //         __teaHouseMainTableList[m].players = !!mainHeadInfo[mianfid] ? mainHeadInfo[mianfid] : {}
                    //     }
                    // }

                    //选择出玩家选择的桌子
                    if (__teaHouseInfo.__selectFloorTable.indexOf(-1) < 0) { //说明玩家选择了桌子
                        let selectArr = [];
                        for (let i = 0; i < fullTable.length; i++) {
                            if (__teaHouseInfo.__selectFloorTable.indexOf(fullTable[i].fid) > -1) {
                                selectArr.push(fullTable[i]);
                            }
                        }
                        fullTable = selectArr;
                    }


                    //是否设置了桌子显示，但是对圈主和管理员无效  
                    if (__teaHouseInfo.tblshowcount > 0 && !(__teaHouseInfo.teahouserule & HouseRoleTable.VIEW_STAT_RECORD_TEA_PLAY)) {
                        if (fullTable.length > __teaHouseInfo.tblshowcount) {
                            fullTable = fullTable.slice(0, __teaHouseInfo.tblshowcount);
                        }
                    }

                } catch (error) {
                    kaayou.emit("common", "ui::Toast::Show", { msg: "桌子数据整理失败！！~" })
                }

                //如果是开了超级防作弊的。。。那么不显示主桌。。。只显示满的桌子
                let newTableArr = []
                if (!__teaHouseInfo.isaisuper) {
                    newTableArr = lodash.clone(__teaHouseMainTableList).concat(fullTable)//
                } else {
                    newTableArr = fullTable;
                }



                return newTableArr;
            }



            /*玩家进入桌子的请求         
            亲友圈进桌逻辑    
            1、点桌子获取该桌子玩法最新的版本信息    
            2、与本地包版本比较
            3、不需要更新直接callback 需要更新走热更
            4、下载完或者热更完之后 比较热更的玩法和该桌当前的玩法是否一致
            5、一致入桌，不一致报错
            */
            @BindEvent('tea', "mod::Table::joinTable")
            async domemBerJoinTable(data: { fid: number, index: number, ignorerule: boolean }) {
                //lm191205防作弊模式可能没有桌子
                if (!!!__teaHouseInfo || !!!__teaHouseInfo.floorsMap[data.fid]) {
                    return;
                }
                //不是防作弊模式还是校验空数组
                if (__teaHouseInfo.house_table_join_type != 1 && __teaHouseInfo.house_table_join_type != 2 && (lodash.isEmpty(__teaHouseTableList))) {
                    return;
                }
                kaayou.emit('common', "ui::Loading::Show", { msg: "正在获取游戏包信息" });
                let kindid = __teaHouseInfo.floorsMap[data.fid].floorItem.frule.kindid;
                let sdata: proto_areapkgbykid = {
                    kindid: kindid
                }
                let info: proto_areapkgbykid_res = await kaayou.sendMessage("lobby", houseTableHead.areapkgbykid, sdata, kaayou.MakeResultMessageHead(houseTableHead.areapkgbykid));
                kaayou.emit('common', "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit('common', "ui::Toast::Show", { msg: info.msg || "获取桌子玩法包信息失败~~~" });
                    return;
                }

                //先调获取桌子玩法版本         
                var self = this;
                let pakeageKey = info.package_key;
                kaayou.emit('common', "ui::Loading::Show", { msg: "正在检查是否需要更新" });
                common.mod.Update.ExistsSubGame(pakeageKey, info.package_version, function () {
                    self.teaHouseJoinTable({ fid: data.fid, index: data.index, ignorerule: data.ignorerule, pakeageKey: pakeageKey, kindid: kindid })
                })

            }
            async teaHouseJoinTable(data: { fid: number, index: number, ignorerule: boolean, pakeageKey: string, kindid: number }) {
                //lw181211
                kaayou.emit("common", "ui::Loading::Show", { arrMsg: ["房间加载中", "信息读取中", "加载成功进入中"] });

                let mapStr = kaayou.DataSet.get("user::Map") || "";
                console.log("teaHouseJoinTable map:", mapStr)
                //lw190606,fid是桌子的fid，不是当前楼层的fid，当前楼层可能是混楼
                let req: proto_housetablein = { hid: __teaHouseInfo.hid, fid: data.fid, ntid: data.index, ignorerule: data.ignorerule, kindid: data.kindid, latitude: 0, longitude: 0, address: "", gps: false };
                req["gps"] = mapStr.length > 0;//
                if (mapStr.length > 0) {
                    let oMap = JSON.parse(mapStr);
                    req["latitude"] = parseFloat(oMap.latitude);
                    req["longitude"] = parseFloat(oMap.longitude);
                    req["address"] = oMap.address;
                } else {
                    req["latitude"] = 0;
                    req["longitude"] = 0;
                    req["address"] = "未知区域"
                }
                if (cc.sys.isNative) {
                    req["voice"] = !!kaayou.PlatformMgr.getInstance().sys.GetMediaStatus();
                    req["gvoiceok"] = !!kaayou.PlatformMgr.getInstance().gvoice.getInitStatus();
                } else {
                    req["voice"] = true;  //网页默认先给个true...
                    req["gvoiceok"] = true;
                }
                console.log("housetablein req:", req);
                let info: proto_housetablein_res = await kaayou.sendMessage("lobby", houseTableHead.housetablein, req, kaayou.MakeResultMessageHead(houseTableHead.housetablein))
                console.log("housetablein", info);
                if (info.errcode) {
                    kaayou.emit("common", "ui::Loading::Hide");
                    if (info.errcode == 145) {//又从146改回145了
                        let options = {
                            title: "温馨提示",
                            msg: info.msg || "当前亲友圈规则已修改，暂时未应用于此桌，确定加入游戏吗?",
                            close: {
                                isShow: false,
                                action: null,
                            },
                            btns: [
                                {
                                    name: "确定",
                                    action: function () {
                                        kaayou.emit('tea', "mod::Table::joinTable", { fid: data.fid, index: data.index, ignorerule: true })
                                    }.bind(this),
                                    colorType: 'blue'
                                },
                                {
                                    name: "取消",
                                    colorType: 'green'
                                }
                            ]
                        }
                        kaayou.emit("common", 'ui::Dialog::Show', options);
                        return;
                    } else if (info.errcode == 136) {
                        kaayou.emit("lobby", "ui::Maintain::Show", { msg: JSON.parse(info.msg).content, code: info.errcode })
                        return;
                    } else if (info.errcode == 119 || info.errcode == 225 || info.errcode == 226) {
                        if (info.errcode == 226) {
                            kaayou.PlatformMgr.getInstance().gvoice.Init(lobby.mod.User.getInstance().getUserInfo().uid)
                        }
                        let options = {
                            msg: info.msg,
                            btns: [
                                {
                                    name: "确定",
                                    action: function () {
                                    },
                                    colorType: 'yellow'
                                },
                            ]
                        }
                        kaayou.emit('common', 'ui::Dialog::Show', options);
                        return;
                    } else if (info.errcode == 196) {  //如果进桌的时候返回的是196，就是需要开定位。。但是客户端没有获取到；
                        kaayou.PlatformMgr.getInstance().map.GetMapInfo();
                        let errmsg = info.msg + " 正在获取定位！请过5秒后重试~";
                        let maperrcode = kaayou.DataSet.get("GPSError");
                        if (!!maperrcode) {
                            if (maperrcode == "-1") {
                                errmsg = "未开启位置服务";
                            } else if (maperrcode == "-2") {
                                errmsg = "未开启本app的定位权限";
                            }
                        }
                        let options = {
                            msg: errmsg,
                            btns: [
                                {
                                    name: "确定",
                                    action: function () {
                                        kaayou.PlatformMgr.getInstance().map.jumpGPSSetting(maperrcode);
                                    },
                                    colorType: 'yellow'
                                },
                            ]
                        }
                        kaayou.emit('common', 'ui::Dialog::Show', options);
                        return;
                    }
                    kaayou.emit("common", "ui::Toast::Show", { msg: info.msg || "进入房间失败!" });
                    return;
                }
                let tempRes = {
                    gameKey: data.pakeageKey,
                    id: info.id,
                    gameid: info.gameid,
                    kindid: info.kindid,
                    ip: info.ip,
                }

                tempRes["replayid"] = 0;
                kaayou.DataSet.set("game::config", JSON.stringify(tempRes));
                if (data.pakeageKey == info.package_key) {
                    kaayou.LobbyToGame(info.package_key);
                } else {
                    kaayou.PlatformMgr.getInstance().sys.PostBugly("lobbyToGame err:" + kaayou.getLobbyVersion(), "housetablein", "pakeage不对应！");
                    let options = {
                        msg: "入桌失败，请15秒后重试!",
                        btns: [
                            {
                                name: "确定",
                                action: function () {

                                },
                                colorType: 'yellow'
                            },
                        ]
                    }
                    kaayou.emit('common', 'ui::Dialog::Show', options);
                }

                kaayou.emit("tea", 'ui::TeaHouse::Clean');

            }

            //桌子数据修改所有消息
            @BindEvent("lobby", "ws::Msg::housefloortablesync")
            tablemessage(data: { fids: Array<number>, acks: any }) {
                try {
                    if (!!!data) return;
                    if (!!!__teaHouseInfo || !!!__teaHouseInfo.floorsMap || lodash.isEmpty(data)) return;
                    if (!!!data.acks || !data.fids || lodash.isEmpty(data.fids)) return
                    if (!!!__teaHouseInfo.fid || data.fids.indexOf(__teaHouseInfo.fid) < 0) return;
                    console.log("桌子修改合成数据", data);
                    // if (!!data.acks[0] && data.acks[0].hasOwnProperty("m_num")) {
                    //     this.isUpdate = true;
                    // }
                    for (let y in data.acks) {
                        if (!data.acks[y].fid || !__teaHouseInfo.floorsMap[data.acks[y].fid]) {
                            continue;
                        }
                        let floorInfo = __teaHouseInfo.floorsMap[data.acks[y].fid];
                        if (!!!floorInfo) {
                            continue;
                        }
                        let customGameName = (floorInfo.floorItem.name == "" ? floorInfo.floorItem.kindname : floorInfo.floorItem.name);

                        for (var x in data.acks[y].ftableitems) {
                            let item = data.acks[y].ftableitems[x];
                            __teaHouseTableList[item.ntid] = {
                                atid: item.atid,
                                canwatch: item.canwatch,
                                fid: data.acks[y].fid,
                                gameName: customGameName,
                                hid: __teaHouseInfo.hid,
                                isMix: floorInfo.floorItem.is_mix,
                                ntid: item.ntid,
                                tid: item.tid,
                                players: {},
                                step: item.step,
                                total_round: item.trule.roundnum,
                                trule: item.tmemitems.length > 0 ? item.trule : __teaHouseInfo.floorsMap[data.acks[y].fid].floorItem.frule,
                                ismain: false,
                                begin: item.begin,
                                deleted: item.deleted,
                                hideimg: !!floorInfo.floorItem.hideimg,
                                matchIngnum: 0,
                                fullNum: 0,
                                watchericons: item.watchericons
                            }
                            for (var x1 in item.tmemitems) {
                                let pitem = item.tmemitems[x1];
                                __teaHouseTableList[item.ntid].players[x1] = {
                                    uurl: pitem.uurl,
                                    fid: pitem.fid,
                                    hid: pitem.hid,
                                    ntid: pitem.ntid,
                                    nuid: Number(x1),
                                    uid: pitem.uid,
                                    uname: pitem.uname,
                                    urole: 0,
                                    ugender: pitem.ugender,
                                    uremark: "",
                                    online: !!pitem.online,
                                    ready: !!pitem.ready,
                                };
                            }
                        }
                        // if (this.isUpdate) {
                        for (const m in __teaHouseMainTableList) {
                            if (__teaHouseMainTableList[m].fid == data.acks[y].fid) {
                                __teaHouseMainTableList[m].matchIngnum = data.acks[y].m_num
                                __teaHouseMainTableList[m].fullNum = data.acks[y].t_num;
                            }
                        }
                        // }
                    }
                    // let newArr = [];
                    // if (!__teaHouseInfo.mix_active || !__teaHouseInfo.isCurFloorMix || __teaHouseInfo.house_table_join_type == 0) {
                    //     newArr = __teaHouseTableList
                    // } else if (__teaHouseInfo.house_table_join_type == 2) {
                    //     newArr = this.arrangeTableDataInMatch()
                    //     // newArr = lodash.clone(__teaHouseMainTableList).concat(fullTableArr);
                    //     kaayou.emit("tea", "ui::TeaHouse::UpdateMaxTable", { num: newArr.length, isClear: false })
                    // } else if (__teaHouseInfo.house_table_join_type == 1) {
                    //     //自动加桌模式， 当返回deleted为真时，说明桌子需要被删除。。。
                    //     newArr = this.arrangeAutoAddTable();
                    //     kaayou.emit("tea", "ui::TeaHouse::UpdateMaxTable", { num: newArr.length, isClear: false })
                    // }
                    kaayou.emit("tea", 'mod::Table::GetUpdateList', { clear: false });
                } catch (error) {
                    kaayou.emit('common', "ui::Toast::Show", { msg: "桌子数据整理失败！" });
                }
            }



            //收到桌子创建之后给桌子塞tid
            @BindEvent("lobby", "ws::Msg::housetablecreate_ntf")
            teaHouseTableSetTid(data: ITeaTabelCreate) {
                return;
                if (!data) { return; }
                if (!data.hid) { return; }
                if (!data.fid) { return; }
                if (data.ntid == undefined) { return; }
                if (!__teaHouseInfo) { return; }
                if (__teaHouseInfo.hid != data.hid) return;
                if (!__teaHouseInfo.floorsMap) { return; }
                if (!__teaHouseInfo.floorsMap[data.fid]) { return; }
                // if (__teaHouseInfo.fid != data.fid) return;
                //消息是否为混楼
                if (__teaHouseInfo.floorsMap[data.fid].floorItem.is_mix) {
                    if (!__teaHouseInfo.floorsMap[__teaHouseInfo.fid].floorItem.is_mix) return;
                } else {
                    if (__teaHouseInfo.fid != data.fid) return;
                }
                __teaHouseTableList[data.ntid] = lodash.extend({}, __teaHouseTableList[data.ntid], data, { players: {} });//
                //lw190906包括了总局数
                kaayou.emit('tea', "ui::Table::UpdateList", __teaHouseTableList);
            }

            //收到服务器玩家坐下的的消息housetablein_ntf
            @BindEvent("lobby", "ws::Msg::housetablein_ntf")
            teaMemberSit(data: ITeaTableUserIn) {
                return;
                if (!!!__teaHouseInfo) return;
                if (!!!__teaHouseInfo.floorsMap) return;
                if (__teaHouseInfo.hid != data.hid) return;
                // if (__teaHouseInfo.fid != data.fid) return;
                if (!__teaHouseTableList[data.ntid]) return;
                if (!__teaHouseTableList[data.ntid].players) return;
                //消息是否为混楼
                if (!!__teaHouseInfo.floorsMap[data.fid] && __teaHouseInfo.floorsMap[data.fid].floorItem.is_mix) {
                    if (!__teaHouseInfo.floorsMap[__teaHouseInfo.fid].floorItem.is_mix) return;
                } else {
                    if (__teaHouseInfo.fid != data.fid) return;
                }

                __teaHouseTableList[data.ntid].players[data.nuid] = lodash.extend({}, data);
                kaayou.emit('tea', "ui::Table::UpdateList", __teaHouseTableList);
                console.log("收到服务器玩家坐下的的消息", data);
                // if (Data_TeaHouseBase.getInstance().fid != data.fid)return;
                //Todo 获取到有玩家加入桌子的消息。。。刷新座位
                // kaayou.emit("ui::teahouse::tablememin",data);
            }


            //收到服务器玩家离开桌子的的消息
            @BindEvent("lobby", "ws::Msg::housetableout_ntf")
            teaMemberOut(data: ITeaTabelUserOut) {
                console.log("收到服务器玩家离开桌子的的消息", data);
                return;
                if (__teaHouseInfo.hid != data.hid) return;
                // if (__teaHouseInfo.fid != data.fid) return;
                if (!__teaHouseTableList[data.ntid]) return;
                if (!__teaHouseTableList[data.ntid].players) return;
                if (!__teaHouseTableList[data.ntid].players[data.nuid]) return;
                if (__teaHouseTableList[data.ntid].players[data.nuid].uid != data.uid) return;
                //消息是否为混楼
                if (__teaHouseInfo.floorsMap[data.fid].floorItem.is_mix) {
                    if (!__teaHouseInfo.floorsMap[__teaHouseInfo.fid].floorItem.is_mix) return;
                } else {
                    if (__teaHouseInfo.fid != data.fid) return;
                }
                __teaHouseTableList[data.ntid].players[data.nuid] = null;
                delete __teaHouseTableList[data.ntid].players[data.nuid];
                kaayou.emit('tea', "ui::Table::UpdateList", __teaHouseTableList);
            }


            //亲友圈桌子详情
            @BindEvent("lobby", "mod::TeaHouse::TableDetail")
            async getTableDetail(data) {
                kaayou.emit('common', "ui::Loading::Show");
                let sdata: proto_tableinfo = {
                    id: data.tid
                }
                let info: proto_tableinfo_res = await kaayou.sendMessage("lobby", houseTableHead.tableinfo, sdata, kaayou.MakeResultMessageHead(houseTableHead.tableinfo));
                kaayou.emit('common', "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit('common', "ui::Toast::Show", { msg: info.msg || "获取桌子详情失败！" });
                    return;
                }
                info.fid = data.fid;
                kaayou.emit("tea", 'ui::TableDetail::Show', info);
            }

            @BindEvent("tea", "mod::TeaHouse::kickUser")
            async kickMember(data: proto_tableuserkick) {
                if (lodash.isEmpty(data)) { return; }
                kaayou.emit("common", "ui::Loading::Show");
                let info = await kaayou.sendMessage("lobby", houseTableHead.tableuserkick, data, kaayou.MakeResultMessageHead(houseTableHead.tableuserkick))
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", "ui::Toast::Show", { msg: "踢出玩家失败，请尝试重新打开界面!" });
                    return;
                }
                kaayou.emit("common", "ui::Toast::Show", { msg: "踢出玩家成功" });
                kaayou.emit("tea", "ui::tableDetail::update", data)
            }



            //亲友圈桌子详情
            @BindEvent("tea", "mod::TeaHouse::MemTableInfo")
            async getMemTableDetail(data) {
                if (!__teaHouseInfo || !__teaHouseInfo.hid) {
                    return;
                }
                kaayou.emit('common', "ui::Loading::Show");
                let sdata: proto_housetableinfobyuid = {
                    hid: __teaHouseInfo.hid, uid: data.uid
                }
                let info: proto_housetableinfobyuid_res = await kaayou.sendMessage("lobby", houseTableHead.housetableinfobyuid, sdata, kaayou.MakeResultMessageHead(houseTableHead.housetableinfobyuid));
                kaayou.emit('common', "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit('common', "ui::Toast::Show", { msg: info.msg || "获取玩家桌子详情失败！" });
                    return;
                }
                //kaayou.emit("tea","ui::SearchTablePanel::Hide");
                kaayou.emit("tea", 'ui::TableDetail::Show', info);
            }


            //收到服务器桌子解散的的消息
            @BindEvent("lobby", "ws::Msg::housetabledissovle_ntf")
            teaTabledissovle(data: ITeaTabelDel) {
                return
                if (__teaHouseInfo.hid != data.hid) return;
                // if (__teaHouseInfo.fid != data.fid) return;
                if (!__teaHouseTableList[data.ntid]) return;
                //消息是否为混楼
                if (__teaHouseInfo.floorsMap[data.fid].floorItem.is_mix) {
                    if (!__teaHouseInfo.floorsMap[__teaHouseInfo.fid].floorItem.is_mix) return;
                } else {
                    if (__teaHouseInfo.fid != data.fid) return;
                }
                //需要将这个桌子上的tid清除。。。玩家清除。。。还有需要把桌子的玩法设置成楼层的玩法
                __teaHouseTableList[data.ntid].tid = 0;
                __teaHouseTableList[data.ntid].players = {};
                __teaHouseTableList[data.ntid].trule = __teaHouseInfo.floorsMap[data.fid].floorItem.frule;   //找到这个桌子的fid，给这个桌子赋值楼层的玩法
                kaayou.emit('tea', "ui::Table::UpdateList", __teaHouseTableList);
            }

            //解散桌子的消息
            @BindEvent("tea", "mod::teahouse::tabledel")
            async delTeahouseTable(data) {
                if (!!!__teaHouseInfo || !!!__teaHouseInfo.hid) {
                    return;
                }
                kaayou.emit('common', "ui::Loading::Show");
                let sdata: proto_tabledel = {
                    id: data.id, fid: data.fid, hid: __teaHouseInfo.hid
                }
                let info = await kaayou.sendMessage('lobby', houseTableHead.tabledel, sdata, kaayou.MakeResultMessageHead(houseTableHead.tabledel))
                kaayou.emit('common', "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit('common', "ui::Toast::Show", { msg: info.msg || "解散桌子失败！" });
                    return;
                }
                //Todo  解散桌子成功之后需要隐藏界面
                kaayou.emit('common', "ui::Toast::Show", { msg: "解散桌子成功！" });
                kaayou.emit("tea", 'ui::TableDetail::Hide');
            }

            @BindEvent("tea", "mod::teahouse::answerInvite")
            async answerInvite(data: proto_htinvite_ack) {
                kaayou.sendMessage('lobby', houseTableHead.htinvite_ack, data, kaayou.MakeResultMessageHead(houseTableHead.htinvite_ack))
            }

            //当服务器推送少人开局的桌子信息  这个没用
            @BindEvent("lobby", "ws::Msg::housetableupdate_ntf")
            async teahousetableupdate(data) {
                // if (__teaHouseInfo.fid != data.fid) return;
                if (!__teaHouseTableList[data.ntid]) return;
                //消息是否为混楼
                if (!!__teaHouseInfo.floorsMap[data.fid] && __teaHouseInfo.floorsMap[data.fid].floorItem.is_mix) {
                    if (!__teaHouseInfo.floorsMap[__teaHouseInfo.fid].floorItem.is_mix) return;
                } else {
                    if (__teaHouseInfo.fid != data.fid) return;
                }
                // __teaHouseTableList[data.ntid] = {
                //     hid: __teaHouseInfo.hid,
                //     fid: data.fid,
                //     ntid: data.ntid,
                //     tid: data.tid,
                //     players: {},
                //     isMix: __teaHouseTableList[data.ntid].isMix,
                //     gameName: __teaHouseTableList[data.ntid].gameName,
                //     trule: data.tmemitems.length > 0 ? data.trule : __teaHouseInfo.frule,
                //     step: data.step,
                //     total_round: data.total_round,
                // }
                //lm190907因为服务器不能保证顺序，所以只好不取setp和total_round
                __teaHouseTableList[data.ntid].hid = __teaHouseInfo.hid,
                    __teaHouseTableList[data.ntid].fid = data.fid;
                __teaHouseTableList[data.ntid].ntid = data.ntid;
                __teaHouseTableList[data.ntid].tid = data.tid;
                __teaHouseTableList[data.ntid].players = {};
                __teaHouseTableList[data.ntid].trule = data.tmemitems.length > 0 ? data.trule : __teaHouseInfo.frule;
                for (var x1 in data.tmemitems) {
                    let pitem = data.tmemitems[x1];
                    __teaHouseTableList[data.ntid].players[pitem.nuid] = {
                        uurl: pitem.uurl,
                        fid: pitem.fid,
                        hid: pitem.hid,
                        ntid: pitem.ntid,
                        nuid: pitem.nuid,
                        uid: pitem.uid,
                        uname: pitem.uname,
                        urole: pitem.urole,
                        ugender: pitem.ugender,
                        uremark: pitem.uremark,
                        online: !!pitem.online,
                        ready: !!pitem.ready,
                    };
                }
                let newArr = [];
                if (__teaHouseInfo.mix_active && __teaHouseInfo.isCurFloorMix && __teaHouseInfo.house_table_join_type == 2) {
                    newArr = HouseTabel.getInstance().arrangeTableDataInMatch();
                    // newArr = lodash.clone(__teaHouseMainTableList).concat(fullTable);
                } else {
                    newArr = __teaHouseTableList;
                }
                kaayou.emit('tea', "ui::Table::UpdateList", newArr);
            }

            @BindEvent("lobby", "ws::Msg::housetablestep_ntf")
            async onNumberOfGameChange(data) {
                return;
                if (!__teaHouseTableList[data.ntid]) return;
                if (!!!data.step || !!!data.total_round) {
                    return;
                }
                //消息是否为混楼
                if (__teaHouseInfo.floorsMap[data.fid].floorItem.is_mix) {
                    if (!__teaHouseInfo.floorsMap[__teaHouseInfo.fid].floorItem.is_mix) return;
                } else {
                    if (__teaHouseInfo.fid != data.fid) return;
                }
                __teaHouseTableList[data.ntid].step = data.step;        //不能只更新界面。。。不然下次刷新整个桌子取是第一次进楼层的step
                __teaHouseTableList[data.ntid].total_round = data.total_round;    //lm190906如果少人开局了需要加这个

                let newArr = [];
                if (__teaHouseInfo.mix_active && __teaHouseInfo.isCurFloorMix && __teaHouseInfo.house_table_join_type == 2) {
                    let fullTable = HouseTabel.getInstance().arrangeTableDataInMatch();
                    newArr = lodash.clone(__teaHouseMainTableList).concat(fullTable);
                } else {
                    newArr = __teaHouseTableList;
                }
                kaayou.emit('tea', "ui::Table::UpdateList", newArr);  //不用桌子注册，还是记录数据直接刷新
            }

            @BindEvent("lobby", "ws::Msg::htinvite_ntf")
            async onInvite(data) {
                kaayou.emit('tea', "ui::InvitePanel::Show", data);
            }
        }
    }
    tea.mod.HouseTabel.getInstance();
}