namespace tea {
    const { BindEvent, doBindEvent } = kaayou._decorator;



    //自定义楼层info丰富的
    export interface Data_HosueFloorInfo {
        level: number,
        richRule: common.mod.Data_Game_Package_RichItem,
        floorItem: Data_HosueListFloorItem,
        tableCount: number,
        tableMin: number,
        autoCount?: number,      //自动加桌模式中每个楼层当前空桌数（当前有人但是桌子没开始）
        autoTableCount?: number  // 记录自动加桌模式中每个楼层有人的桌子数；
    }

    //楼层桌子
    export interface Data_HosueFtableItems {
        /**@description 匿名时桌子编号 */
        atid:number,
        fid: number
        ntid: number
        tid: number
        tmemitems: Array<ITeaTableUserIn>,
        trule: Data_HosueFrule;
        kname?: string,
        package_key?: string,
        begin: boolean,
        step: number,
        total_round: number,
        showdis?: boolean,      //是否显示解散按钮
    }

    export interface Data_HosueFloorBaseInfo {
        is_mix: boolean,
        fid: number,
        frule: Data_HosueFrule,
        kname: string,
        package_key: string,
        ftableitems: Array<Data_HosueFtableItems>
        errcode?: number
        msg?: string
    }

    //楼层hashmap
    export type FloorHashMap = { [fid: string]: Data_HosueFloorInfo };

    //更新楼层相关的数据结构Update
    export type FloorUpdateInfo = { fid: number, floorMap: FloorHashMap };

    export namespace mod {
        function getNextFloor(fid: number): { level: number, fid: number, curlevel: number } {
            if (!__teaHouseInfo) { return null; }
            if (lodash.isEmpty(__teaHouseInfo.floorsMap)) { return null; }
            let levels = [];
            let lastlevel = -1;
            lodash.forEach(__teaHouseInfo.floorsMap, function (v: Data_HosueFloorInfo, x) {
                let level = lodash.toInteger(v.level);
                levels[level] = lodash.toInteger(v.floorItem.fid);
                if (levels[level] == fid) {
                    lastlevel = level;
                }
            });
            levels = lodash.pullAll<number>(lodash.filter(levels), [fid])
            if (lodash.isEmpty(levels)) { return { level: lastlevel, fid: 0, curlevel: -1 }; }
            return { level: lastlevel, fid: levels[levels.length - 1], curlevel: levels.length - 1 };
        }

        export class HouseFloor {
            static __INS__: tea.mod.HouseFloor = null;
            static getInstance(): tea.mod.HouseFloor {
                if (HouseFloor.__INS__ == null) {
                    HouseFloor.__INS__ = new HouseFloor();
                    HouseFloor.__INS__.initMod();
                }
                return HouseFloor.__INS__;
            }
            @doBindEvent
            initMod() { }

            // 获取楼层列表 亲友圈弹出楼层列表
            @BindEvent('tea', 'mod::TeaHouse::GetFloorList')
            async doGetFloorInfo() {
                if (!!!__teaHouseInfo) return;
                kaayou.emit("common", "ui::Loading::Show", { msg: "获取楼层列表", time: 3 });
                let sdata = {
                    hid: __teaHouseInfo.hid
                }
                let info: proto_housefloorlist_res = await kaayou.sendMessage("lobby", houseFloorHeadMsg.housefloorlist, sdata, kaayou.MakeResultMessageHead(houseFloorHeadMsg.housefloorlist));
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", "ui::Toast::Show", { msg: info.msg || "获取楼层列表失败！" });
                    return;
                }

                let items: Array<Data_HosueListFloorItem> = info.items
                //楼层是空的 
                if (lodash.isEmpty(items)) {
                    __teaHouseInfo.floorsMap = {};
                    __teaHouseInfo.hfloorids = [];
                    kaayou.emit("tea", 'mod::Table::Reset');
                    // EDIT_FLOOR_RULE

                    kaayou.emit("tea", "ui::Floor::Update", { hasrole: !!(__teaHouseRole & HouseRoleTable.EDIT_FLOOR_RULE), data: null });
                    if (!_isManager()) {
                        kaayou.emit("common", 'ui::Toast::Show', { msg: "请等待楼主设置楼层！" });
                    } else {

                    }
                    return;
                }

                //整理楼层和相关的php数据
                let floorMap: FloorHashMap = {};
                let floorIdArray = [];
                __teaHouseMainTableList = [];
                for (var x in items) {
                    let fid = items[x].fid;
                    let kindid = items[x].frule.kindid;
                    floorMap[fid] = {
                        level: Number(x),
                        floorItem: items[x],
                        richRule: {
                            kind_id: kindid,
                            name: items[x].kindname,
                            package_name: items[x].packagename,
                            icon: items[x].imageurl
                        },
                        tableCount: items[x].table_num,
                        tableMin: items[x].table_default,
                        autoCount: 0,
                    }
                    if (items[x].is_mix) {
                        let maintable: ImainTableinfo = {
                            canwatch:false,
                            fid: items[x].fid,
                            gameName: items[x].name.length > 0 ? items[x].name : items[x].kindname,
                            hid: __teaHouseInfo.hid,
                            isMix: true,
                            trule: items[x].frule,
                            ismain: true,
                            matchIngnum: 0,
                            fullNum: 0,
                            players: {}
                        }
                        __teaHouseMainTableList.push(maintable);
                    }

                    floorIdArray.push(items[x].fid);
                }
                __teaHouseInfo.floorsMap = floorMap;
                __teaHouseInfo.hfloorids = floorIdArray;

                //是否要进入茶楼楼层
                if (__needEnterFloor && __teaHouseInfo.fid) {
                    kaayou.emit("tea", "mod::TeaHouse::ChangeFloor", { fid: __teaHouseInfo.fid });
                } else {
                    let floorUpdateInfo: FloorUpdateInfo = {
                        fid: __teaHouseInfo.fid || 0,
                        floorMap: __teaHouseInfo.floorsMap || null
                    }
                    __needEnterFloor = false;
                    kaayou.emit("tea", "ui::Floor::Update", { hasrole: !!(__teaHouseRole & HouseRoleTable.EDIT_FLOOR_RULE), data: floorUpdateInfo });
                }
            }

            // 玩家进入茶楼楼层  也是切换楼层
            @BindEvent("tea", "mod::TeaHouse::ChangeFloor")
            async doChangeFloor(data: { fid: number, showToast?: boolean }) {
                let self = this;
                let isMix = false;
                if (lodash.isEmpty(data)) { return; }
                //在某种状态下可能会出现info没有的情况。。。重走进圈流程。好像
                if (lodash.isEmpty(__teaHouseInfo)) {
                    kaayou.emit("tea", 'ui::TeaHouse::Quit');
                    kaayou.emit('common', "ui::Loading::Hide");
                    return;
                }

                kaayou.emit("tea", 'mod::Table::Reset');
                if (lodash.isEmpty(__teaHouseInfo.floorsMap[data.fid])) {
                    kaayou.emit("common", "ui::Toast::Show", { msg: "进入楼层失败！" })
                    kaayou.emit("tea", "ui::Floor::Update", { hasrole: !!(__teaHouseRole & HouseRoleTable.EDIT_FLOOR_RULE), data: null });
                    return;
                }
                // let time = Date.now();
                kaayou.emit("common", "ui::Loading::Show", { msg: "加载楼层", time: 3 });
                let sdata : proto_housememberin = {
                    hid: __teaHouseInfo.hid,
                    fid: data.fid,
                    need_mix: true
                }
                let returnData: proto_housememberin_res[] = await kaayou.sendMessage("lobby", houseFloorHeadMsg.housememberin, sdata, kaayou.MakeResultMessageHead(houseFloorHeadMsg.housememberin));

                kaayou.emit("common", "ui::Loading::Hide");
                if (returnData["errcode"]) {
                    kaayou.emit("common", "ui::Loading::Hide", { force: true });
                    kaayou.emit("common", "ui::Toast::Show", { msg: returnData["msg"] || "进入楼层失败！" })
                    return;
                }

                //lw190603因为有了混排楼层，返回值变成了数组
                for (let x in returnData) {
                    if (returnData[x].fid == data.fid) {
                        __teaHouseInfo.frule = __teaHouseInfo.floorsMap[data.fid].floorItem.frule;
                    }
                }
                __teaHouseInfo.fid = data.fid;
                let floorUpdateInfo: FloorUpdateInfo = {
                    fid: __teaHouseInfo.fid || 0,
                    floorMap: __teaHouseInfo.floorsMap || {}
                }
                __needEnterFloor = false;
                kaayou.emit("tea", "ui::Floor::Update", { hasrole: !!(__teaHouseRole & HouseRoleTable.EDIT_FLOOR_RULE), data: floorUpdateInfo, showToast: data.showToast });

                if (returnData.length > 0 && __teaHouseInfo.floorsMap[returnData[0].fid].floorItem.is_mix) isMix = true;
                __teaHouseInfo.isCurFloorMix = isMix;
                try {
                    for (let y in returnData) {

                        let floorinfo = __teaHouseInfo.floorsMap[returnData[y].fid];

                        let customGameName = (floorinfo.floorItem.name == "" ? floorinfo.floorItem.kindname : floorinfo.floorItem.name);
                        for (var x in returnData[y].ftableitems) {
                            let item = returnData[y].ftableitems[x]
                            __teaHouseTableList[item.ntid] = {
                                atid:item.atid,
                                canwatch:item.canwatch,
                                deleted: item.deleted,
                                fid: returnData[y].fid,
                                gameName: customGameName,
                                hid: __teaHouseInfo.hid,
                                isMix: isMix,
                                ntid: item.ntid,
                                tid: item.tid,
                                players: {},
                                step: item.step,
                                total_round: item.trule.roundnum,
                                ismain: false,
                                begin: item.begin,
                                trule: item.tmemitems.length > 0 ? <Data_HosueFrule>item.trule : __teaHouseInfo.floorsMap[returnData[y].fid].floorItem.frule,
                                watchericons:item.watchericons||[],
                                hideimg: !!floorinfo.floorItem.hideimg,
                                matchIngnum:0,
                                fullNum:0,
                            }
                            for (var x1 in item.tmemitems) {
                                let pitem = item.tmemitems[x1];
                                __teaHouseTableList[item.ntid].players[x1] = {
                                    uurl: pitem.uurl,
                                    fid: returnData[y].fid,
                                    hid: __teaHouseInfo.hid,
                                    ntid: item.ntid,
                                    nuid: Number(x1),
                                    uid: pitem.uid,
                                    uname: pitem.uname,
                                    //urole: 2,
                                    ugender: pitem.ugender,
                                    uremark: "1",
                                    online:!!pitem.online,
                                    ready:!!pitem.ready,
                                };
                            }
                        }
                        //需要提前上客户端兼容新老服务器
                        if (__teaHouseInfo.mix_active &&
                            __teaHouseInfo.isCurFloorMix &&
                            __teaHouseInfo.house_table_join_type == 2 ) {   //根据这个来兼容服务器是否更新   存在未更新
                            for (var m in __teaHouseMainTableList) {
                                if (__teaHouseMainTableList[m].fid == returnData[y].fid) {
                                    __teaHouseMainTableList[m].matchIngnum = returnData[y].m_num
                                    __teaHouseMainTableList[m].fullNum = returnData[y].t_num;
                                    break;
                                }
                            }
                        }
                    }
                    kaayou.emit("tea","ui::Bottom::SelectTableUpdate");
                    kaayou.emit("tea", 'mod::Table::GetUpdateList',{clear:true});
                    // let newArr = []
                    // //整理不同的混排模式数据
                    // if (__teaHouseInfo.mix_active && __teaHouseInfo.isCurFloorMix && __teaHouseInfo.house_table_join_type == 2) {  //防作弊模式
                    //     newArr = HouseTabel.getInstance().arrangeTableDataInMatch();
                    // } else if (__teaHouseInfo.mix_active && __teaHouseInfo.isCurFloorMix && __teaHouseInfo.house_table_join_type == 1) {  //自动加桌模式
                    //     newArr = HouseTabel.getInstance().arrangeAutoAddTable();
                    // } else {
                    //     newArr = __teaHouseTableList;
                    // }
                    // console.log("进楼整理之后的桌子数据", newArr);
                    // kaayou.emit("tea", "ui::TeaHouse::UpdateMaxTable", { num: newArr.length, isClear: true })


                    // kaayou.emit('tea', "ui::Table::UpdateList", newArr);
                } catch (error) {
                    kaayou.emit("common", "ui::Toast::Show", { msg: "进入楼层数据报错！！~" })
                }

            }

            @BindEvent("tea", "mod::TeaHouse::DoSetCreate")
            async doSetCreate(data: { fid: number }) {
                if (!!!__teaHouseInfo) return;
                let floorInfo = __teaHouseInfo.floorsMap[data.fid].floorItem.frule.kindid;
                let lastRule: any = {};
                let lastKind = 0;
                if (__teaHouseInfo.floorsMap[data.fid] && __teaHouseInfo.floorsMap[data.fid].floorItem && __teaHouseInfo.floorsMap[data.fid].floorItem.frule) {
                    let frule = __teaHouseInfo.floorsMap[data.fid].floorItem.frule;
                    lastKind = frule.kindid;
                    var baseArrt = lobby.mod.Package.getPublicRuleConfigNames();
                    for (var x in baseArrt) {
                        let k = baseArrt[x];
                        if (frule[k] !== undefined) {
                            lastRule[k] = frule[k];
                        }
                    }

                    if (frule.gameconfig) {
                        let c = JSON.parse(frule.gameconfig);
                        if (c) {
                            lastRule = lodash.extend({}, lastRule, c);
                        }
                    };
                }

                kaayou.emit('tea', "mod::Package::TeaHouse", {
                    call: function (r) {
                        console.log("search", r);
                        let games = [];
                        let kinds: Array<{ kind: string, version: number }> = [];

                        for (var x in r) {
                            for (var y in r[x].games) {
                                let templast = {};
                                kinds.push({ kind: r[x].games[y].kind_id, version: r[x].games[y].client_version });
                                games.push({
                                    name: r[x].games[y].name,
                                    kindId: r[x].games[y].kind_id,
                                    ruleVersion: r[x].games[y].game_rule_version,
                                    rule: "",
                                    lastRule: (lastKind && r[x].games[y].kind_id == lastKind) ? lastRule : null,
                                    timelimit_free:r[x].games[y].timelimit_free
                                });
                            }
                        }

                        let changeFid = data.fid;
                        // kinds.push(floorInfo.floorItem.frule.kindid);
                        kaayou.emit("lobby", "mod::Package::GetRuleByKindId", {
                            kindIdList: kinds, call: function (result) {
                                let list = [];
                                for (var x in games) {
                                    for (var y in result) {
                                        if (games[x].kindId == result[y].kind_id) {
                                            list.push(lodash.extend({}, games[x], result[y]));
                                        }
                                    }
                                }

                                kaayou.emit('tea', 'ui::CreateRoom::Show', {
                                    list: list,
                                    call: function (data: { kindid: number, configData: any, ruleVersion: string }) {
                                        console.log("保存~~~~~", data);
                                        // kaayou.emit("tea", "mod::TeaHouse::createFloor", data);
                                        let dataChange = {
                                            kindid: data.kindid,
                                            configData: data.configData,
                                            fid: changeFid,
                                            ruleVersion: data.ruleVersion

                                        }
                                        kaayou.emit("tea", "mod::TeaHouse::changeFloorRule", dataChange);
                                        kaayou.emit('tea', 'ui::CreateRoom::Hide');
                                    },
                                    frozen: false,
                                    issave: true,
                                    fristkind: lastKind
                                });

                            }
                        });
                    }
                });

            }



            //修改楼层玩法
            @BindEvent("tea", "mod::TeaHouse::changeFloorRule")
            async doChangeFloorRule(data: { kindid: number, configData: any, ruleVersion: string, fid: number }) {
                if (!!!__teaHouseInfo) return;
                data = lodash.extend({
                    configData: {
                        roundnum: 8,
                        playernum: 4,
                        restrict: "false"
                    }
                }, data);


                if (!data.kindid) { return; }
                if (data.kindid < 1) { return; }

                var baseArrt = lobby.mod.Package.getPublicRuleConfigNames();
                var AttrObj: any = {};
                var gameconfig: any = {};
                for (var x in data.configData) {
                    if (baseArrt.indexOf(x) > -1) {
                        AttrObj[x] = data.configData[x];
                    } else {
                        gameconfig[x] = data.configData[x];
                    }
                }
                AttrObj['kindid'] = Number(data.kindid);
                AttrObj['gameconfig'] = JSON.stringify(gameconfig) || "";
                let mapStr = kaayou.DataSet.get("user::Map");
                AttrObj["gps"] = true; // 强制未真保证通过创建楼层验证;
                AttrObj["version"] = data.ruleVersion;

                let reqData: proto_housefloorrulemodify = {
                    hid : __teaHouseInfo.hid,
                    frule : AttrObj,
                    fid : data.fid,
                };
             
                kaayou.emit("common", "ui::Loading::Show");
                let info = await kaayou.sendMessage("lobby", houseFloorHeadMsg.housefloorrulemodify, reqData, kaayou.MakeResultMessageHead(houseFloorHeadMsg.housefloorrulemodify));
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    if (info.errcode === 156) {
                        kaayou.emit("common", "ui::Loading::Hide");
                        // kaayou.emit("common", "ui::Loading::Show", { arrMsg: ["出现新的游戏规则，请在更新后重新保存亲友圈玩法", "规则更新中"] });
                        // kaayou.emit("", "ui::CreateHouseRoom::wakeUpHostConfig");
                        return;
                    }
                    kaayou.emit("common", "ui::Toast::Show", { msg: info.msg || "规则修改失败!" });
                    return;
                }
                kaayou.emit("common", "ui::Toast::Show", { msg: info.msg || "修改玩法成功~" });
                // kaayou.emit("ui::TeaHouse::createFloorSuccess",info);
                kaayou.emit("tea", 'ui::CreateRoom::Hide');
            }




            @BindEvent("tea", "mod::TeaHouse::DoSetOnlyShow")
            async doSetOnlyShow(data: { fid: number }) {
                if (!!!__teaHouseInfo) return;
                let floorIds = [];
                let lastRules = [];
                let floorKind = 0;

                //lw190614是否混楼
                if (__teaHouseInfo.floorsMap[data.fid].floorItem.is_mix) {
                    for (let x in __teaHouseInfo.floorsMap) {
                        if (__teaHouseInfo.floorsMap[x].floorItem.is_mix) {
                            floorIds.push(__teaHouseInfo.floorsMap[x].floorItem.fid);
                        }
                    }
                } else {
                    floorIds.push(data.fid);
                }
                //获取最近保存的配置
                for (let x in floorIds) {
                    let fid = floorIds[x];
                    let floorInfo = __teaHouseInfo.floorsMap[fid].floorItem.frule.kindid;
                    let lastRule: any = {};
                    let lastKind = 0;
                    if (__teaHouseInfo.floorsMap[fid] && __teaHouseInfo.floorsMap[fid].floorItem && __teaHouseInfo.floorsMap[fid].floorItem.frule) {
                        let frule = __teaHouseInfo.floorsMap[fid].floorItem.frule;
                        lastKind = frule.kindid;
                        if (fid == data.fid) floorKind = lastKind;
                        var baseArrt = lobby.mod.Package.getPublicRuleConfigNames();
                        for (var x in baseArrt) {
                            let k = baseArrt[x];
                            if (frule[k] !== undefined) {
                                lastRule[k] = frule[k];
                            }
                        }

                        if (frule.gameconfig) {
                            let c = JSON.parse(frule.gameconfig);
                            if (c) {
                                lastRule = lodash.extend({}, lastRule, c);
                            }
                        };

                    }
                    //lw190905各楼层可能有相同的kindid
                    let lastFloorInfo = {
                        lastfid: fid,
                        lastRule: lastRule
                    };
                    lastRules.push(lastFloorInfo);
                }
                let inLastRules = function (fid) {
                    for (let x in lastRules) {
                        if (lastRules[x].lastfid == fid) {
                            return true;
                        }
                    }
                }
                let getLastRule = function (fid) {
                    for (let x in lastRules) {
                        if (lastRules[x].lastfid == fid) {
                            return lastRules[x].lastRule;
                        }
                    }
                }
                //lw190614查看规则
                kaayou.emit("tea", "mod::Package::TeaHouse", {
                    call: function (r) {
                        console.log("search", r);
                        let games = [];
                        let kinds: Array<{ kind: string, version: number }> = [];
                        for (var x in r) {
                            for (var y in r[x].games) {
                                if (inLastRules(data.fid)) {
                                    let lastRule = getLastRule(data.fid);
                                    kinds.push({ kind: r[x].games[y].kind_id, version: r[x].games[y].client_version });
                                    games.push({
                                        name: r[x].games[y].name,
                                        kindId: r[x].games[y].kind_id,
                                        ruleVersion: r[x].games[y].game_rule_version,
                                        lastRule: lastRule,
                                        rule: "",
                                        timelimit_free:r[x].games[y].timelimit_free
                                    });
                                }
                            }
                        }

                        kaayou.emit("lobby", "mod::Package::GetRuleByKindId", {
                            kindIdList: kinds, call: function (result) {
                                let list = [];
                                for (var x in games) {
                                    for (var y in result) {
                                        if (games[x].kindId == result[y].kind_id) {
                                            list.push(lodash.extend({}, games[x], result[y]));
                                        }
                                    }
                                }
                                kaayou.emit('tea', 'ui::CreateRoom::Show', {
                                    list: list,
                                    call: function (data: { kindid: number, configData: any, ruleVersion: string }) {
                                        console.log(data);
                                        // kaayou.emit("tea", "mod::TeaHouse::createFloor", data);
                                        kaayou.emit('tea', 'ui::CreateRoom::Hide');
                                    },
                                    frozen: true,
                                    fristkind: floorKind
                                });
                            }
                        });
                    }
                });
            }

            @BindEvent("tea", "mod::TeaHouse::DoShowCreate")
            async doShowCreate() {
                // kaayou.emit('lobby', "mod::Package::Search", {
                //     code: __teaHouseInfo.area, keyword: "", type: 0, call: function (r) {
                kaayou.emit("tea", "mod::Package::TeaHouse", {
                    call: function (r) {
                        console.log("search", r);
                        let games = [];
                        let kinds: Array<{ kind: string, version: number }> = [];
                        for (var x in r) {
                            for (var y in r[x].games) {
                                kinds.push({ kind: r[x].games[y].kind_id, version: r[x].games[y].client_version });
                                games.push({
                                    name: r[x].games[y].name,
                                    kindId: r[x].games[y].kind_id,
                                    ruleVersion: r[x].games[y].game_rule_version,
                                    rule: "",
                                    timelimit_free:r[x].games[y].timelimit_free
                                });
                            }
                        }
                        kaayou.emit("lobby", "mod::Package::GetRuleByKindId", {
                            kindIdList: kinds, call: function (result) {
                                let list = [];
                                for (var x in games) {
                                    for (var y in result) {
                                        if (games[x].kindId == result[y].kind_id) {
                                            list.push(lodash.extend({}, games[x], result[y]));
                                        }
                                    }
                                }
                                kaayou.emit('tea', 'ui::CreateRoom::Show', {
                                    list: list,
                                    call: function (data: { kindid: number, configData: any, ruleVersion: string }) {
                                        console.log(data);
                                        kaayou.emit("tea", "mod::TeaHouse::createFloor", data);
                                        kaayou.emit('tea', 'ui::CreateRoom::Hide');
                                    },
                                    issave: true,
                                });
                            }
                        });
                    }
                });

            }


            //创建楼层
            @BindEvent("tea", "mod::TeaHouse::createFloor")
            async doCreateFloor(data: { kindid: number, configData: any, ruleVersion: string }) {
                if (!!!__teaHouseInfo) return;
                data = lodash.extend({
                    configData: {
                        roundnum: 8,
                        playernum: 4,
                        restrict: "false"
                    }
                }, data);


                if (!data.kindid) { return; }
                if (data.kindid < 1) { return; }

                var baseArrt = lobby.mod.Package.getPublicRuleConfigNames();
                var AttrObj: any = {};
                var gameconfig: any = {};
                for (var x in data.configData) {
                    if (baseArrt.indexOf(x) > -1) {
                        AttrObj[x] = data.configData[x];
                    } else {
                        gameconfig[x] = data.configData[x];
                    }
                }
                AttrObj['kindid'] = Number(data.kindid);
                AttrObj['gameconfig'] = JSON.stringify(gameconfig) || "";
                let mapStr = kaayou.DataSet.get("user::Map");
                AttrObj["gps"] = true; // 强制未真保证通过创建楼层验证;
                AttrObj["version"] = data.ruleVersion;

                let reqData: proto_housefloorcreate = {
                    hid : __teaHouseInfo.hid,
                    frule : AttrObj,
                };
          
                kaayou.emit("common", "ui::Loading::Show");
                let info = await kaayou.sendMessage("lobby", houseFloorHeadMsg.housefloorcreate, reqData, kaayou.MakeResultMessageHead(houseFloorHeadMsg.housefloorcreate));
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", "ui::Toast::Show", { msg: info.msg || "创建楼层失败！" })
                    return;
                }
                kaayou.emit("common", "ui::Toast::Show", { msg: info.msg || "创建楼层成功" });
                kaayou.emit("tea", 'ui::CreateRoom::Hide');
            }

            getFloorId(level: number) {
                if (!__teaHouseInfo) { return null; }
                if (lodash.isEmpty(__teaHouseInfo.floorsMap)) { return null; }
                let r = 0;
                lodash.forEach(__teaHouseInfo.floorsMap, function (v: Data_HosueFloorInfo, x) {
                    let iLevel = lodash.toInteger(v.level);
                    if (iLevel == level) {
                        let fid = v.floorItem.fid;
                        r = fid;
                    }
                });
                return r;
            }

            //接收服务器给的创建楼层成功的消息
            @BindEvent("lobby", "ws::Msg::housefloorcreate_ntf")
            async  onCreateFloor_Ntf(data: proto_housefloorcreate_ntf_res) {
                if (lodash.isEmpty(data)) { return; }
                if (!!!__teaHouseInfo) return;
                if (!_isInCurHouse(data.hid)) { return; }

                //圈主创建楼层成功的消息
                console.log("收到服务器发送的创建楼层的的消息", data);

                if (_isMaster()) {   //如果是圈主就直接进去这个楼；
                    __needEnterFloor = true;
                    __teaHouseInfo.fid = data.fid;
                    kaayou.emit('tea', 'mod::TeaHouse::GetFloorList');
                } else { //如果不是圈主。。需要刷新左边的上下楼等

                    if (!__teaHouseInfo.fid) {  //说明此时是没有进入桌子的。。。那么久需要将玩家拉进茶楼楼层；
                        console.log("说明此时是没有进入桌子的。。。那么久需要将玩家拉进茶楼楼层；")
                        __needEnterFloor = true;
                        __teaHouseInfo.fid = data.fid;
                        kaayou.emit('tea', 'mod::TeaHouse::GetFloorList');
                    } else {
                        //说明此时玩家是在楼层里面的。。。只刷左侧的上下楼
                        console.log("玩家是在楼层里面的。。。只刷左侧的上下楼")
                        __needEnterFloor = false;
                        // __teaHouseInfo.fid = data.fid;
                        kaayou.emit('tea', 'mod::TeaHouse::GetFloorList');
                    }
                }
            }

            //删除楼层
            @BindEvent("lobby", "mod::teaHouse::deleteFloor")
            async doDeleteFloor(data: { fid: number }) {
                if (lodash.isEmpty(data)) { return; }
                if (lodash.isEmpty(__teaHouseInfo.floorsMap[data.fid])) {
                    kaayou.emit("common", "ui::Toast::Show", { msg: "删除楼层失败！" })
                    return;
                }
                kaayou.emit("common", "ui::Loading::Show", { msg: "删除楼层", time: 0 });
                let sdata : proto_housefloordelete  = {
                    hid: __teaHouseInfo.hid, fid: data.fid 
                }
                let info = await kaayou.sendMessage("lobby", houseFloorHeadMsg.housefloordelete, sdata, kaayou.MakeResultMessageHead(houseFloorHeadMsg.housefloordelete))
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", "ui::Toast::Show", { msg: info.msg || "删除楼层失败！" });
                    return;
                }
                kaayou.emit("common", "ui::Toast::Show", { msg: "删除成功" });
                __needEnterFloor = true;
            }

            @BindEvent("tea", "mod::TeaHouse::AddMixTable")
            async addMixTable(data:proto_housemixfloortablechange) {
                if (lodash.isEmpty(data)) { return; }
                kaayou.emit("common", "ui::Loading::Show");
                let info = await kaayou.sendMessage("lobby", houseFloorHeadMsg.housemixfloortablechange, data, kaayou.MakeResultMessageHead(houseFloorHeadMsg.housemixfloortablechange));
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", "ui::Toast::Show", { msg: info.msg || "操作失败！" });
                    return;
                }
                kaayou.emit("common", "ui::Toast::Show", { msg: "操作成功" });
                kaayou.emit("tea", "ui::AddTable::Hide");
            }

            //楼层隐藏头像设置  //未开局不显示，开局了显示
            @BindEvent("tea", "mod::TeaHouse::Housefloorhideimg")
            async Housefloorhideimg(data:{fid:number,ishide:boolean}) {
                if (lodash.isEmpty(data)) { return; }
                kaayou.emit("common", "ui::Loading::Show");
                let sdata : proto_housefloorhideimg = {
                    hid : __teaHouseInfo.hid , 
                    fid : data.fid , 
                    ishide : data.ishide
                }
                let info = await kaayou.sendMessage("lobby", houseFloorHeadMsg.housefloorhideimg, sdata, kaayou.MakeResultMessageHead(houseFloorHeadMsg.housefloorhideimg))
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", "ui::Toast::Show", { msg: info.msg || "楼层头像显示设置失败！" });
                    return;
                }
                kaayou.emit("common", "ui::Toast::Show", { msg: "楼层头像显示设置成功！" });
            }

            @BindEvent("tea", "mod::TeaHouse::RenameFloor")
            async rename(data:proto_housefloorrename) {
                if (lodash.isEmpty(data)) { return; }
                kaayou.emit("common", "ui::Loading::Show");
                let info = await kaayou.sendMessage("lobby", houseFloorHeadMsg.housefloorrename, data, kaayou.MakeResultMessageHead(houseFloorHeadMsg.housefloorrename))
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", "ui::Toast::Show", { msg: info.msg || "楼层重命名失败！" });
                    return;
                }
                kaayou.emit("common", "ui::Toast::Show", { msg: "楼层重命名成功" });
            }


            
            @BindEvent("tea", 'mod::TeaHouse::housefloorsetallvipuser')
            async housefloorsetallvipuser(data : proto_housefloorsetallvipuser) {
                kaayou.emit("common", "ui::Loading::Show");
                let info = await kaayou.sendMessage("lobby", houseFloorHeadMsg.housefloorsetallvipuser, data, kaayou.MakeResultMessageHead(houseFloorHeadMsg.housefloorsetallvipuser));
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "操作失败！" });
                    return;
                }
                kaayou.emit("common", 'ui::Toast::Show', { msg: info.msg || "操作成功！" });
                kaayou.emit("tea","ui::house::updateSetFloorVipAllList");
            }





            @BindEvent("tea", "mod::TeaHouse::GetVipFloorList")
            async GetVipFloorList(data:IBASE_HOUSEREQ) {
                if (lodash.isEmpty(data)) { return; }
                kaayou.emit("common", "ui::Loading::Show");
                let info = await kaayou.sendMessage("lobby", houseFloorHeadMsg.housevipfloorget, data, kaayou.MakeResultMessageHead(houseFloorHeadMsg.housevipfloorget))
                kaayou.emit("common", "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit("common", "ui::Toast::Show", { msg: info.msg || "获取vip楼层失败！" });
                    return;
                }

    
                if (!tea.mod._isMaster() && !info.items) {
                    kaayou.emit('common', 'ui::Toast::Show', {
                        msg:"暂无可设置楼层，请联系圈主。"
                    })
                    return;
                }
                kaayou.emit("tea","ui::VIPFloorConfigDialog::Show",info);

            }


            //接收服务器给的删除楼层成功的消息
            @BindEvent("lobby", "ws::Msg::housefloordelete_ntf")
            async onDeleteFloor_Ntf(data: proto_housefloordelete) {
                if (lodash.isEmpty(data)) { return; }
                if (!_isInCurHouse(data.hid)) { return; }

                let next = getNextFloor(data.fid);
                if (!next) {
                    kaayou.emit("lobby", "ui::Toast::Show", { msg: "此楼层已被圈主移除,请等待圈主创建楼层！" });
                    __teaHouseInfo.fid = 0;
                    __needEnterFloor = false;
                } else {
                    if (!next.fid) {
                        kaayou.emit("lobby", "ui::Toast::Show", { msg: "此楼层已被圈主移除,请等待圈主创建楼层！" });
                        __needEnterFloor = false;
                        __teaHouseInfo.fid = 0;
                    } else if (next.fid == __teaHouseInfo.fid) {
                        //kaayou.emit("lobby","ui::Toast::Show",{msg:"此楼层已被圈主移除,请等待圈主创建楼层！"});
                        __needEnterFloor = false;
                        if (__teaHouseInfo.floorsMap[next.fid].floorItem.is_mix) {
                            __needEnterFloor = true
                        }
                    } else {
                        kaayou.emit("lobby", "ui::Toast::Show", { msg: "此楼层已被圈主移除，正在切换楼层游戏" });
                        __needEnterFloor = true;
                        __teaHouseInfo.fid = next.fid;
                    }
                }
                kaayou.emit('tea', 'mod::TeaHouse::GetFloorList');
                // let fid = tea.mod.__teaHouseInfo.fid;
                // this.doChangeFloor({ fid: fid })
            }

            //接收到服务器修改玩法的通知
            @BindEvent("lobby", "ws::Msg::housefloorrulemodify_ntf")
            async onChangeFloor_Ntf(data) {
                if (!!!__teaHouseInfo) return;
                if (__teaHouseInfo.hid != data.hid) return;
                // this.doChangeFloor({ fid: data.fid })
                __needEnterFloor = true;
                kaayou.emit('tea', 'mod::TeaHouse::GetFloorList');
            }

            @BindEvent("lobby", "ws::Msg::housemixfloortablechange_ntf")
            async onMixTableChange() {
                if (!!!tea.mod.__teaHouseInfo) {
                    return;
                }
                let fid = tea.mod.__teaHouseInfo.fid;
                if (tea.mod.__teaHouseInfo.floorsMap[fid].floorItem.is_mix) {
                    __needEnterFloor = true;
                    kaayou.emit('tea', 'mod::TeaHouse::GetFloorList');
                    // this.doChangeFloor({ fid: fid });
                }
            }
            //防作弊模式下显示多少满桌子
            @BindEvent("lobby", "ws::Msg::housetblshowcountchange_ntf")
            async onFzbFullTableCountShow(data: { hid: number, count: number }) {
                if (!data || !data.hid || !__teaHouseInfo || __teaHouseInfo.hid != data.hid) {
                    return;
                }
                __teaHouseInfo.tblshowcount = data.count;
                __needEnterFloor = true;
                kaayou.emit('tea', 'mod::TeaHouse::GetFloorList');
            }

            @BindEvent("lobby", "ws::Msg::housefloorrename_ntf")
            async onRename() {
                if (!!!__teaHouseInfo) return;
                let fid = tea.mod.__teaHouseInfo.fid;
                //拿数据
                __needEnterFloor = true;
                kaayou.emit("tea", "mod::TeaHouse::GetFloorList");
                //更新UI
                // this.doChangeFloor({ fid: fid });
            }

            //VIP楼层通知
            @BindEvent("lobby", "ws::Msg::housevipfloorset_ntf")
            async onSetVIP() {
                if (!!!__teaHouseInfo) return;
                let fid = tea.mod.__teaHouseInfo.fid;
                __needEnterFloor = true;
                kaayou.emit("tea", "mod::TeaHouse::GetFloorList");
            }

            //楼层头像显示通知
            @BindEvent("lobby", "ws::Msg::housefloorhideimg_ntf")
            async onSetFloorHead(data) {//////
                if (!!!__teaHouseInfo) return;
                if (!_isInCurHouse(data.hid)) { return; }
                let flooMap = tea.mod.__teaHouseInfo.floorsMap;
                if (!flooMap || lodash.isEmpty(flooMap) || !flooMap[data.fid]) {
                    return;
                }
                __needEnterFloor = true;
                //如果推送的楼层不是混排，不在推送楼层中和 推送楼层是混排，当前楼层不是混排，  不需要进楼
                if (((!flooMap[data.fid].floorItem.is_mix && data.fid != __teaHouseInfo.fid) || (flooMap[data.fid].floorItem.is_mix && !flooMap[__teaHouseInfo.fid].floorItem.is_mix)  )) {
                    __needEnterFloor = false;
                }
                
                kaayou.emit("tea", "mod::TeaHouse::GetFloorList");
            }
        }
    }
    tea.mod.HouseFloor.getInstance();
}