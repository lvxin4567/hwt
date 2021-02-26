namespace tea {
    //茶楼游戏桌子相关接口
    const { BindEvent, doBindEvent } = kaayou._decorator;
    export interface IBASE_MESSAGE {
        errcode?: number,
        msg?: string
    }

    export interface ITH_DATA_USER_INFO {
        "uid": number,
        "uname": string,
        "urole": number,
        "gender": number,
        "is_online": boolean,
        "apply_type": number,
        "apply_time": number,
        "agree_time": number,
        "uurl": string,   //
        "is_limit_game": boolean, //禁止娱乐
        "partner": number,
        lastInvite?: number,
        inTable: boolean
    };

    export interface ITH_DATA_INGAME_SUBFLOORS extends IBASE_MESSAGE {
        hid: number,
        fid: number,
        is_mix: boolean,
        mix_type: number,
        isanonymous: boolean, //匿名游戏开关
        is_partner_apply: boolean,
        table_info?: Data_HosueFloorBaseInfo[],
        online_users?: ITH_DATA_USER_INFO[],
        apply_users?: ITH_DATA_USER_INFO[],
        user_info?: ITH_DATA_USER_INFO,
    }

    export type ITH_DATA_INGAME_FloorHashMap = { [fid: string]: Data_HosueFloorBaseInfo };

    export interface ITH_DATA_INGAME_HouseInfo {
        hid: number,
        fid: number,
        is_mix: boolean,
        mix_type: number,
        isanonymous: boolean, //匿名游戏开关
        is_partner_apply: boolean,  //队长可审开关
        floors_map?: ITH_DATA_INGAME_FloorHashMap,
        ftableitems?: Array<Data_HosueFtableItems>, //合并floors_map里的所有桌子并排序
        online_users?: ITH_DATA_USER_INFO[],
        apply_users?: ITH_DATA_USER_INFO[],
        user_info?: ITH_DATA_USER_INFO,
    }


    export namespace mod {
        export class Gametables {
            static __INS__: Gametables = null;
            static getInstance() {
                if (Gametables.__INS__ == null) {
                    Gametables.__INS__ = new Gametables();
                    Gametables.__INS__.initMod();
                }
                return Gametables.__INS__;
            }

            @doBindEvent
            initMod() {
                this.__userInvite = {};
                //                mod::AnotherTable::OneMore
            }

            //解散桌子
            @BindEvent("tea", "mod::GameTable::TableDismiss")
            async TableDismiss(data: { fid: number, tid: number }) {
                if (!data) { return }
                if (!data.fid || !data.tid) { return; }
                if (lodash.isEmpty(this.__curNetName) || lodash.isEmpty(this.__curModuleName)) {
                    return;
                }

                let temp = {
                    "head": "tabledel",
                    "data": JSON.stringify({ op_uid: this.getUid(), token: this.getToken(), tab_del: { id: data.tid, hid: this.__curHid, fid: data.fid } }),
                    "msgsign": {
                        "time": new Date().getTime(),
                        "encode": 0
                    }
                }

                if (common.mod.Config.isLoginEncryp) {
                    temp.msgsign.encode = 1;
                    temp.data = kaayou.AES.encrypt(temp.data);
                }

                kaayou.emit("common", "ui::Loading::Show");
                let res = await kaayou.Http.POST(common.mod.Config.GetAppConfig().hallUrl + "/service", { msgdata: JSON.stringify(temp) });
                kaayou.emit("common", "ui::Loading::Hide");
                let msg: kaayou.Ka_MSG_RES = kaayou.Http.parseResult(res);
                if (!!msg) {
                    if (msg.errcode) {
                        kaayou.emit("common", 'ui::Toast::Show', { msg: msg.errmsg || "解散桌子失败！" });
                        return;
                    }
                    kaayou.emit("common", 'ui::Toast::Show', { msg: msg.errmsg || "解散桌子成功！" });
                }
            }


            //续桌接口 
            @BindEvent("tea", "mod::GameTable::Continue")
            async continuetable(data: { key: string }) {
                var token = this.getToken();
                let uid = this.getUid();
                if (lodash.isEmpty(token) || uid == undefined || uid < 1) {
                    return;
                }
                //lw191028增加经纬度
                let mapStr = kaayou.DataSet.get("user::Map") || "";
                let latitude = 0;
                let longitude = 0;
                if (mapStr.length > 0) {
                    let oMap = JSON.parse(mapStr);
                    latitude = parseFloat(oMap.latitude);
                    longitude = parseFloat(oMap.longitude);
                } else {
                    latitude = 0;
                    longitude = 0;
                }
                let temp = {
                    "head": "houseanothergame",
                    "data": JSON.stringify({ latitude: latitude, longitude: longitude, token: token, uid: uid }),
                    "msgsign": {
                        "time": new Date().getTime(),
                        "encode": 0
                    }
                }

                if (common.mod.Config.isLoginEncryp) {
                    temp.msgsign.encode = 1;
                    temp.data = kaayou.AES.encrypt(temp.data);
                }

                kaayou.emit("common", "ui::Loading::Show");
                let res = await kaayou.Http.POST(common.mod.Config.GetAppConfig().hallUrl + "/service", { msgdata: JSON.stringify(temp) });
                kaayou.emit("common", "ui::Loading::Hide");
                let msg: kaayou.Ka_MSG_RES = kaayou.Http.parseResult(res);
                if (!!msg) {
                    if (msg.errcode == 0) {
                        common.mod.Update.ExistsSubGame(data.key, "", function () {
                            let tempRes = {
                                id: msg.data.id,
                                gameid: msg.data.gameid,
                                kindid: msg.data.kindid,
                                ip: msg.data.ip,
                                gameKey: data.key,
                            }

                            kaayou.DataSet.set("game::config", JSON.stringify(tempRes));
                            kaayou.LobbyToGame(data.key);
                        });

                    } else {
                        let options = {
                            msg: msg.errmsg || "续桌失败",
                            btns: [
                                {
                                    name: "确定",
                                    action: function () {
                                        kaayou.GameToLobby();
                                    },
                                    colorType: 'green'
                                },
                            ]
                        }
                        kaayou.emit('common', 'ui::Dialog::Show', options);
                        return;
                    }
                }
            }

            getToken() {
                try {
                    let { token } = JSON.parse(kaayou.DataSet.get('user::token'));
                    return token;
                }
                catch {
                    return ""
                }
            }

            getUid() {
                try {
                    let { uid } = JSON.parse(kaayou.DataSet.get('user::token'));
                    return uid;
                }
                catch {
                    return 0
                }
            }

            //判断自己是否在该桌子上
            isMyTable(tmemitems: Array<ITeaTableUserIn>) {
                let userInfo = JSON.parse(kaayou.DataSet.get("user::info"));
                if (userInfo && tmemitems) {
                    for (var m in tmemitems) {
                        if (tmemitems[m].uid == userInfo.uid) {
                            return true;
                        }
                    }
                }
                return false;
            }

            //发送在线邀请 

            @BindEvent("tea", "mod::GameTable::InviteAllUser")
            async InviteAllUser(data: { netname: string, modulename: string, packagekey: string, gameState: number }) {
                let { netname, modulename, packagekey, gameState } = data;
                if (lodash.isEmpty(netname) || lodash.isEmpty(modulename)) {
                    return;
                }
                gameState = gameState || 0;
                if (gameState) {
                    return kaayou.emit("common", 'ui::Toast::Show', { msg: "游戏进行中,不能邀请其他玩家!" });
                }
                kaayou.emit('common', "ui::Loading::Show");
                const REQ_EventName = 'htinvite_send';
                const RES_ventName = "ws::Msg::htinvite_send";
                const RES_ventName_ntf = "ws::Msg::gamenotificationmessage";

                let result: { errcode, msg, uid } = await kaayou.sendMessage(netname, REQ_EventName, {}, RES_ventName);
                kaayou.emit("common", "ui::Loading::Hide");
                if (result.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: result.msg || "邀请失败" });
                    return;
                }
            }


            //发送在线邀请 

            @BindEvent("tea", "mod::GameTable::InviteUser")
            async InviteUser(data: { uid: number }) {
                if (!data) { return }
                if (!data.uid) { return; }
                if (lodash.isEmpty(this.__curNetName) || lodash.isEmpty(this.__curModuleName)) {
                    return;
                }
                if (this.__gameState !== 0) {
                    return kaayou.emit("common", 'ui::Toast::Show', { msg: "游戏进行中,不能邀请其他玩家!" });
                }
                let uid = data.uid;

                kaayou.emit('common', "ui::Loading::Show");
                const REQ_EventName = 'htinvite_send';
                const RES_ventName = "ws::Msg::htinvite_send";
                const RES_ventName_ntf = "ws::Msg::gamenotificationmessage";
                // kaayou.getController(this.__curNetName).onece(RES_ventName_ntf,(e:kaayou.Event)=>{
                //     console.log(e.data)
                //     kaayou.emit("common", "ui::Loading::Hide");

                //     // kaayou.emit("common", 'ui::Toast::Show', { msg: result.msg || "邀请失败" });
                // },this);
                let result: { errcode, msg, uid } = await kaayou.sendMessage(this.__curNetName, REQ_EventName, { uid: uid }, RES_ventName);
                kaayou.emit("common", "ui::Loading::Hide");
                if (result.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: result.msg || "邀请失败" });
                    return;
                }
                if (!this.__curHouseInfo) { return; }
                if (!this.__curHouseInfo.online_users) {
                    this.__curHouseInfo.online_users = [];
                }
                this.__userInvite[uid] = Date.Unix();
                this.checkuserInvite(uid);

                kaayou.emit(this.__curModuleName, 'ui::ingame::updateMember', this.__curHouseInfo.online_users);

            }

            //在线换桌接口 
            @BindEvent("tea", "mod::GameTable::ChangeJoin")
            changeJointable(data: { fid: number, ntid: number, package_key: string }) {
                if (!data || !data.fid || data.ntid == undefined) {
                    return;
                }
                var token = this.getToken();
                let uid = this.getUid();
                let hid = this.__curHid;
                if (lodash.isEmpty(token) || uid == undefined || uid < 1) {
                    return;
                }
                if (hid == undefined || hid < 1) {
                    return;
                }
                let modulename = this.__curModuleName;
                let pkey = this.__packageKey;
                if (lodash.isEmpty(pkey) || lodash.isEmpty(modulename)) {
                    return;
                }

                if (this.__gameState !== 0) {
                    return kaayou.emit("common", 'ui::Toast::Show', { msg: "游戏进行中,不能换桌!" });
                }

                let cb = async function () {
                    //lw191028增加经纬度
                    let mapStr = kaayou.DataSet.get("user::Map") || "";
                    let latitude = 0;
                    let longitude = 0;
                    if (mapStr.length > 0) {
                        let oMap = JSON.parse(mapStr);
                        latitude = parseFloat(oMap.latitude);
                        longitude = parseFloat(oMap.longitude);
                    } else {
                        latitude = 0;
                        longitude = 0;
                    }
                    let temp = {
                        "head": "housechangetable",
                        "data": JSON.stringify({
                            fid: data.fid,
                            gps: mapStr.length > 0,
                            hid: hid,
                            latitude: latitude,
                            longitude: longitude,
                            ntid: data.ntid,
                            token: token,
                            uid: uid,
                            gvoiceok: !!kaayou.PlatformMgr.getInstance().gvoice.getInitStatus(),
                            voice: !!kaayou.PlatformMgr.getInstance().sys.GetMediaStatus(),
                        }),
                        "msgsign": {
                            "time": new Date().getTime(),
                            "encode": 0
                        }
                    }

                    if (common.mod.Config.isLoginEncryp) {
                        temp.msgsign.encode = 1;
                        temp.data = kaayou.AES.encrypt(temp.data);
                    }

                    if (!lodash.isEmpty(this.__curNetName)) {
                        kaayou.sendMessage(this.__curNetName, 'userunsubfloor', {});
                    }

                    kaayou.emit("common", "ui::Loading::Show");
                    kaayou.NetManager.getInstance().deleteAllSocket();
                    let res = await kaayou.Http.POST(common.mod.Config.GetAppConfig().hallUrl + "/service", { msgdata: JSON.stringify(temp) });
                    kaayou.emit("common", "ui::Loading::Hide");
                    let msg: kaayou.Ka_MSG_RES = kaayou.Http.parseResult(res);
                    console.log("housechangetable 在线换桌返回的数据:", msg);
                    if (!lodash.isEmpty(modulename)) {
                        kaayou.emit(modulename, 'ui::InGameTeaHousePanel::Hide', {});
                    }
                    if (!!msg) {
                        if (msg.errcode == 0) {
                            common.mod.Update.ExistsSubGame(msg.data.package_key, "", function () {
                                let tempRes = {
                                    id: msg.data.id,
                                    gameid: msg.data.gameid,
                                    kindid: msg.data.kindid,
                                    ip: msg.data.ip,
                                    gameKey: msg.data.package_key,
                                }
                                kaayou.DataSet.set("game::config", JSON.stringify(tempRes));
                                kaayou.LobbyToGame(msg.data.package_key);
                            });
                        } else if (msg.errcode == 300) {
                            try {
                                msg.data = JSON.parse(msg.data);
                                if (!msg.data) { throw ""; }
                                common.mod.Update.ExistsSubGame(msg.data.package_key, "", function () {
                                    let tempRes = {
                                        id: msg.data.id,
                                        gameid: msg.data.gameid,
                                        kindid: msg.data.kindid,
                                        ip: msg.data.ip,
                                        gameKey: msg.data.package_key,
                                    }

                                    kaayou.DataSet.set("game::config", JSON.stringify(tempRes));
                                    kaayou.LobbyToGame(msg.data.package_key);
                                });
                                let options = {
                                    msg: msg.errmsg || "加入失败",
                                    btns: [
                                        {
                                            name: "确定",
                                            action: function () {
                                            },
                                            colorType: 'green'
                                        },
                                    ]
                                }
                                kaayou.emit('common', 'ui::Dialog::Show', options);

                            } catch (err) {
                                let options = {
                                    msg: "加入失败",
                                    btns: [
                                        {
                                            name: "确定",
                                            action: function () {
                                                kaayou.GameToLobby();
                                            },
                                            colorType: 'green'
                                        },
                                    ]
                                }
                                kaayou.emit('common', 'ui::Dialog::Show', options);
                                return;
                            }

                        } else {
                            let options = {
                                msg: msg.errmsg || "加入失败",
                                btns: [
                                    {
                                        name: "确定",
                                        action: function () {
                                            kaayou.GameToLobby();
                                        },
                                        colorType: 'green'
                                    },
                                ]
                            }
                            kaayou.emit('common', 'ui::Dialog::Show', options);
                            return;
                        }
                    }
                }.bind(this);

                if (data.package_key == this.__packageKey) {
                    cb();
                } else {
                    let options = {
                        msg: `确定退出原房间，换至新的玩法桌子吗？`,
                        btns: [
                            {
                                name: "确定",
                                action: cb,
                                colorType: 'green'
                            },
                            {
                                name: "取消",
                                colorType: 'blue'
                            }
                        ]
                    }
                    kaayou.emit('common', 'ui::Dialog::Show', options);
                }
            }
            __userInvite: { [key: string]: number } = null;

            //当前游戏名称
            __curNetName: string = "";
            __curModuleName: string = "";
            __packageKey: string = "";
            __gameState: number = 0;
            __curHid = 0;
            __curHouseInfo: ITH_DATA_INGAME_HouseInfo = null;
            //订阅茶楼消息
            @BindEvent("tea", "mod::GameTable::subscriptionFloor")
            async subscriptionFloor(data: { netname: string, modulename: string, packagekey: string, gameState: number }) {

                let { netname, modulename, packagekey, gameState } = data;
                this._offSubscriptionEvent();
                if (lodash.isEmpty(netname)) {
                    return;
                }
                gameState = gameState || 0;  //0 未开始   1 已开始
                kaayou.emit('common', "ui::Loading::Show");
                const REQ_EventName = 'usersubfloor';
                const RES_ventName = "ws::Msg::usersubfloor";
                let result: ITH_DATA_INGAME_SUBFLOORS = await kaayou.sendMessage(netname, REQ_EventName, { "sub_detail": ["table_info", "apply_user", "user_info", "online_user"] }, RES_ventName);
                kaayou.emit("common", "ui::Loading::Hide");
                if (result.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: result.msg || "获取列表失败！" });
                    return;
                }

                console.log("subscriptionFloor 返回的亲友圈数据：", result);
                let tmp_result: ITH_DATA_INGAME_HouseInfo = {
                    is_mix: result.is_mix,
                    mix_type: result.mix_type,
                    isanonymous: result.isanonymous,
                    is_partner_apply: result.is_partner_apply,
                    hid: result.hid,
                    fid: result.fid,
                    floors_map: {},
                    online_users: result.online_users,
                    apply_users: result.apply_users,
                    user_info: result.user_info,
                };

                if (result.table_info) {
                    for (var f in result.table_info) {
                        //更新之后客户端需要自己去加fid
                        for (var t in result.table_info[f].ftableitems) {
                            result.table_info[f].ftableitems[t].fid = result.table_info[f].fid;
                            result.table_info[f].ftableitems[t].kname = result.table_info[f].kname;
                            result.table_info[f].ftableitems[t].package_key = result.table_info[f].package_key;

                            let isMyTable = this.isMyTable(result.table_info[f].ftableitems[t].tmemitems);
                            let tableid=result.table_info[f].ftableitems[t].tid || result.table_info[f].ftableitems[t].atid;
                            result.table_info[f].ftableitems[t].showdis = (result.user_info.urole < tea.HouseMemberRole.MEMBER && !!tableid);
                        }

                        tmp_result.floors_map[result.table_info[f].fid] = result.table_info[f];
                    }

                }

                this.__curNetName = netname;
                this.__curModuleName = modulename;
                this.__packageKey = packagekey;
                this.__curHid = result.hid;
                this.__gameState = gameState;
                this.bindSubscriptionEvent();
                this.__curHouseInfo = tmp_result;//含当前用户信息
                this.sorttables(this.__curHouseInfo);
                this.checkuserInvite();
                kaayou.emit(this.__curModuleName, 'ui::InGameTeaHousePanel::Show', this.__curHouseInfo);
            }

            //取消订阅
            @BindEvent("tea", "mod::GameTable::unsubscriptionFloor")
            unsubscriptionFloor(data: { netname: string, modulename: string }) {
                this._offSubscriptionEvent();
                let { netname } = data;
                this.clearEnvs();
                const REQ_EventName = 'userunsubfloor';
                const RES_ventName = "ws::Msg::userunsubfloor";
                if (lodash.isEmpty(netname)) {
                    return;
                }
                kaayou.sendMessage(netname, REQ_EventName, {}, RES_ventName);
            }

            _offSubscriptionEvent() {
                if (!lodash.isEmpty(this.__curNetName)) {
                    return;
                }

                //  //收到桌子创建之后给桌子塞tid
                //  @BindEvent("lobby", "ws::Msg::housetablecreate_ntf")
                //     //收到服务器玩家坐下的的消息housetablein_ntf
                //     @BindEvent("lobby", "ws::Msg::housetablein_ntf")

                //  //收到服务器玩家离开桌子的的消息
                //  @BindEvent("lobby", "ws::Msg::housetableout_ntf")

                //     //收到服务器桌子解散的的消息
                //     @BindEvent("lobby", "ws::Msg::housetabledissovle_ntf")

                kaayou.getController(this.__curNetName).off("ws::Msg::housememberagree_ntf", this.onTeaHouseApplyAgree_ntf, this);
                kaayou.getController(this.__curNetName).off("ws::Msg::housememberrefused_ntf", this.onTeaHouseApplyRefused_ntf, this);
                kaayou.getController(this.__curNetName).off("ws::Msg::housememberapply_ntf", this.onTeaHouseApplyJoin_ntf, this);
                kaayou.getController(this.__curNetName).off("ws::Msg::housememonline_ntf", this.onFloorMemberOnline_ntf, this);
                kaayou.getController(this.__curNetName).off("ws::Msg::housememoffline_ntf", this.onFloorMemberOffline_ntf, this);
                kaayou.getController(this.__curNetName).off("ws::Msg::housememingame_ntf", this.onFloorMemberEnterTable_ntf, this);
                kaayou.getController(this.__curNetName).off("ws::Msg::housememoutgame_ntf", this.onFloorMemberLeaveTable_ntf, this);


                // kaayou.getController(this.__curNetName).on("ws::Msg::housetablecreate_ntf", this.onHouseTableIn_ntf, this);
                // kaayou.getController(this.__curNetName).off("ws::Msg::housetablein_ntf", this.onHouseTableIn_ntf, this);
                // kaayou.getController(this.__curNetName).off("ws::Msg::housetableout_ntf", this.onHouseTableOut_ntf, this);
                kaayou.getController(this.__curNetName).off("ws::Msg::housetabledissovle_ntf", this.onHouseTableDissovle_ntf, this);
                kaayou.getController(this.__curNetName).off("ws::Msg::housemixfloortablechange_ntf", this.onHouseTableCountChange_ntf, this);
                kaayou.getController(this.__curNetName).off("ws::Msg::setbegin_ntf", this.onHouseTableBegin_ntf, this);

                //桌子合成消息
                kaayou.getController(this.__curNetName).off("ws::Msg::housefloortablesync", this.onHouseTableChange_ntf, this);

                this.clearEnvs();
            }

            clearEnvs() {
                this.__curHouseInfo = null;
                this.__curNetName = "";
                this.__curModuleName = "";
                this.__packageKey = "";
                this.__curHid = 0;
                this.__gameState = 0;
            }

            bindSubscriptionEvent() {
                if (lodash.isEmpty(this.__curNetName)) {
                    return;
                }
                // kaayou.getController(this.__curNetName).on("", this.onFloortable_ntf, this);
                // kaayou.getController(this.__curNetName).on("", this.onFloorMember_ntf, this);
                kaayou.getController(this.__curNetName).on("ws::Msg::housememberagree_ntf", this.onTeaHouseApplyAgree_ntf, this);
                kaayou.getController(this.__curNetName).on("ws::Msg::housememberrefused_ntf", this.onTeaHouseApplyRefused_ntf, this);
                kaayou.getController(this.__curNetName).on("ws::Msg::housememberapply_ntf", this.onTeaHouseApplyJoin_ntf, this);
                //成员
                kaayou.getController(this.__curNetName).on("ws::Msg::housememonline_ntf", this.onFloorMemberOnline_ntf, this);
                kaayou.getController(this.__curNetName).on("ws::Msg::housememoffline_ntf", this.onFloorMemberOffline_ntf, this);
                kaayou.getController(this.__curNetName).on("ws::Msg::housememingame_ntf", this.onFloorMemberEnterTable_ntf, this);
                kaayou.getController(this.__curNetName).on("ws::Msg::housememoutgame_ntf", this.onFloorMemberLeaveTable_ntf, this);

                //桌子
                // kaayou.getController(this.__curNetName).on("ws::Msg::housetablein_ntf", this.onHouseTableIn_ntf, this);
                // kaayou.getController(this.__curNetName).on("ws::Msg::housetableout_ntf", this.onHouseTableOut_ntf, this);
                kaayou.getController(this.__curNetName).on("ws::Msg::housetabledissovle_ntf", this.onHouseTableDissovle_ntf, this);
                kaayou.getController(this.__curNetName).on("ws::Msg::housemixfloortablechange_ntf", this.onHouseTableCountChange_ntf, this);
                kaayou.getController(this.__curNetName).on("ws::Msg::setbegin_ntf", this.onHouseTableBegin_ntf, this);


                //桌子合成消息
                kaayou.getController(this.__curNetName).on("ws::Msg::housefloortablesync", this.onHouseTableChange_ntf, this);
            }

            onHouseTableChange_ntf(e: kaayou.Event) {
                console.log("onHouseTableChange_ntf 亲友圈桌子游戏内消息", e.data);
                if (!this.__curModuleName) { return; }
                if (!e.data || !e.data.acks) { return; }
                if (!this.__curHouseInfo) { return; }
                if (!this.__curHouseInfo.floors_map || !this.__curHouseInfo.user_info) {
                    return;
                }
                // if (e.data.fids.indexOf(this.__curHouseInfo.fid) < 0) {
                //     return;
                // }
                // if (!this.__curHouseInfo.table_info.ftableitems) {
                //     this.__curHouseInfo.table_info.ftableitems = [];
                // }

                for (var k in e.data.acks) {
                    let flooritem = e.data.acks[k];
                    if (flooritem.fid && this.__curHouseInfo.floors_map[flooritem.fid]) {
                        if (!this.__curHouseInfo.floors_map[flooritem.fid].ftableitems) {
                            this.__curHouseInfo.floors_map[flooritem.fid].ftableitems = [];
                        }
                        for (var x in flooritem.ftableitems) {
                            let item = flooritem.ftableitems[x]
                            let ftable: tea.Data_HosueFtableItems = lodash.find(this.__curHouseInfo.floors_map[flooritem.fid].ftableitems, { ntid: item.ntid, fid: flooritem.fid });
                            if (!!!ftable) {
                                continue;
                            }
                            ftable.begin = item.begin;
                            ftable.fid = flooritem.fid;
                            ftable.ntid = item.ntid;
                            ftable.tid = item.tid;
                            ftable.tmemitems = item.tmemitems;//
                            ftable.step = item.step;
                            ftable.trule = item.trule;

                            let isMyTable = this.isMyTable(item.tmemitems);
                            let tableid=item.tid || item.atid;
                            ftable.showdis = (this.__curHouseInfo.user_info.urole < tea.HouseMemberRole.MEMBER && !!item.tid);

                            // ftable.total_round = isUpdate?item.trule.roundnum : item.total_round;
                            // ftable.trule = item.tmemitems.length > 0 ? item.trule : flooritem.frule;


                            // // this.__curResult.table_info.ftableitems[item.ntid] = {
                            //     ftable.beginitem.begin,
                            //     fid: item.fid,
                            //     ntid: item.ntid,
                            //     tid: item.tid,
                            //     tmemitems: item.tmemitems,
                            //     step: item.step,
                            //     total_round: item.total_round,
                            //     trule: item.tmemitems.length > 0 ? item.trule : flooritem.frule,
                            // // }          
                        }
                    }
                }
                kaayou.emit(this.__curModuleName, 'ui::ingame::updateTable', this.sorttables(this.__curHouseInfo));
            }


            // //加入桌子ntf
            // onHouseTableIn_ntf(e: kaayou.Event) {
            //     if (!this.__curModuleName) { return; }
            //     if (!e.data) { return; }
            //     if (!e.data.uid) { return; }
            //     if (!this.__curHouseInfo) { return; }
            //     if (!this.__curHouseInfo.floors_map || !this.__curHouseInfo.floors_map[e.data.fid]) {
            //         return;
            //     }
            //     if (!this.__curHouseInfo.floors_map[e.data.fid].ftableitems) {
            //         this.__curHouseInfo.floors_map[e.data.fid].ftableitems = [];
            //     }
            //     let ftable: tea.Data_HosueFtableItems = lodash.find(this.__curHouseInfo.floors_map[e.data.fid].ftableitems, { ntid: e.data.ntid, fid: e.data.fid });
            //     if (!ftable) {
            //         return;
            //     }
            //     if (!ftable.tmemitems) {
            //         ftable.tmemitems = [];
            //     }
            //     ftable.tmemitems.push(e.data);
            //     kaayou.emit(this.__curModuleName, 'ui::ingame::updateTable', this.sorttables(this.__curHouseInfo));
            //     //kaayou.emit(this.__curModuleName, 'ui::OnlineList::InTable', e.data);
            // }


            // //退出桌子ntf
            // onHouseTableOut_ntf(e: kaayou.Event) {
            //     if (!this.__curModuleName) { return; }
            //     if (!e.data) { return; }
            //     if (!e.data.uid) { return; }
            //     if (!this.__curHouseInfo) { return; }
            //     if (!this.__curHouseInfo.floors_map || !this.__curHouseInfo.floors_map[e.data.fid]) {
            //         return;
            //     }
            //     if (!this.__curHouseInfo.floors_map[e.data.fid].ftableitems) {
            //         this.__curHouseInfo.floors_map[e.data.fid].ftableitems = [];
            //     }
            //     let ftable: tea.Data_HosueFtableItems = lodash.find(this.__curHouseInfo.floors_map[e.data.fid].ftableitems, { ntid: e.data.ntid, fid: e.data.fid });
            //     if (!ftable) {
            //         return;
            //     }
            //     if (!ftable.tmemitems) {
            //         ftable.tmemitems = [];
            //     }
            //     ftable.tmemitems = lodash.pullAllBy(ftable.tmemitems, [{ uid: e.data.uid }], 'uid');
            //     kaayou.emit(this.__curModuleName, 'ui::ingame::updateTable', this.sorttables(this.__curHouseInfo));
            // }

            onHouseTableCountChange_ntf(e: kaayou.Event) {
                this.getFloortableinfo();
            }

            async getFloortableinfo() {
                if (lodash.isEmpty(this.__curNetName)) { return; }
                let result = await kaayou.sendMessage(this.__curNetName, 'floortableinfo', {}, "ws::Msg::floortableinfo");
                if (!this.__curHouseInfo) { return; }
                console.log("floortableinfo 返回的牌桌列表数据", result);
                if (!result) {
                    console.error("区域列表获取失败");
                    return;
                }
                if (result.errcode) {
                    console.error("区域列表获取失败");
                    return;
                }

                for (var f in result) {
                    //更新之后客户端需要自己去加fid
                    for (var t in result[f].ftableitems) {
                        result[f].ftableitems[t].fid = result[f].fid;
                        result[f].ftableitems[t].kname = result[f].kname;
                        result[f].ftableitems[t].package_key = result[f].package_key;

                        let isMyTable = this.isMyTable(result[f].ftableitems[t].tmemitems);
                        let tableid=result[f].ftableitems[t].tid || result[f].ftableitems[t].atid;
                        result[f].ftableitems[t].showdis = (this.__curHouseInfo.user_info.urole < tea.HouseMemberRole.MEMBER && !!result[f].ftableitems[t].tid);
                    }

                    this.__curHouseInfo.floors_map[result[f].fid] = result[f];
                }

                kaayou.emit(this.__curModuleName, 'ui::ingame::updateTable', this.sorttables(this.__curHouseInfo));

            }

            sorttables(houseInfo: ITH_DATA_INGAME_HouseInfo): Array<Data_HosueFtableItems> {
                if (!houseInfo) { return []; }
                if (!houseInfo.floors_map) { return []; }

                let ftableitems: Array<Data_HosueFtableItems> = [];
                let myfid = houseInfo.fid;
                for (var f in houseInfo.floors_map) {
                    if (!houseInfo.floors_map[f].ftableitems) { continue; }
                    ftableitems = ftableitems.concat(houseInfo.floors_map[f].ftableitems);
                }
                for (var t in ftableitems) {
                    if (this.isMyTable(ftableitems[t].tmemitems)) {
                        myfid = ftableitems[t].fid;
                        break;
                    }
                }

                if (ftableitems.length > 0) {
                    //排序：1.优先显示当前所在楼层的桌子；2.优先显示新桌子
                    ftableitems.sort(function (a: Data_HosueFtableItems, b: Data_HosueFtableItems) {
                        if (houseInfo.is_mix && houseInfo.mix_type == 1) {
                            if (a.fid == myfid && b.fid == myfid) {
                                return b.ntid - a.ntid;
                            } else if (a.fid != myfid && b.fid != myfid) {
                                return b.ntid - a.ntid;
                            } else {
                                return a.fid == myfid ? -1 : 1;
                            }
                        } else {
                            if (a.fid == myfid && b.fid == myfid) {
                                return a.ntid - b.ntid;
                            } else if (a.fid != myfid && b.fid != myfid) {
                                return a.ntid - b.ntid;
                            } else {
                                return a.fid == myfid ? -1 : 1;
                            }
                        }
                    });
                }

                houseInfo.ftableitems = ftableitems;
                console.log("sorttables 排序后的桌子列表数据:", JSON.stringify(ftableitems));
                return ftableitems;
            }

            // sorttables(ftableitems: Array<Data_HosueFtableItems>) {
            //     if (!ftableitems) { return; }
            //     ftableitems.sort(function (a: Data_HosueFtableItems, b: Data_HosueFtableItems) {
            //         return a.ntid - b.ntid;
            //     });
            // }

            checkuserInvite(uid: number = 0) {
                if (!this.__curHouseInfo) { return; }
                if (!this.__curHouseInfo.online_users) { return; }

                if (uid && this.__curHouseInfo.online_users[uid]) {
                    if (!this.__userInvite[uid]) {
                        this.__userInvite[uid] = Date.Unix() - 4;
                    }
                    this.__curHouseInfo.online_users[uid].lastInvite = this.__userInvite[uid];
                    return;
                }
                lodash.forEach(this.__curHouseInfo.online_users, (v: ITH_DATA_USER_INFO) => {
                    if (!this.__userInvite[v.uid]) {
                        this.__userInvite[v.uid] = Date.Unix() - 4;
                    }
                    v.lastInvite = this.__userInvite[v.uid];
                });
            }

            onHouseTableBegin_ntf(e: kaayou.Event) {


                if (!this.__curModuleName) { return; }
                if (!e.data) { return; }
                if (!e.data.uid) { return; }
                if (!this.__curHouseInfo) { return; }
                if (!this.__curHouseInfo.floors_map) {
                    return;
                }
                if (!this.__curHouseInfo.floors_map[e.data.fid]) {
                    return;
                }
                if (!this.__curHouseInfo.floors_map[e.data.fid].ftableitems) {
                    this.__curHouseInfo.floors_map[e.data.fid].ftableitems = [];
                }
                let ftable: tea.Data_HosueFtableItems = lodash.find(this.__curHouseInfo.floors_map[e.data.fid].ftableitems, { ntid: e.data.ntid, fid: e.data.fid });
                if (!ftable) {
                    return;
                }
                ftable.begin = true;
                kaayou.emit(this.__curModuleName, 'ui::ingame::updateTable', this.sorttables(this.__curHouseInfo));
            }

            onHouseTableDissovle_ntf(e: kaayou.Event) {
                if (!this.__curModuleName) { return; }
                if (!e.data) { return; }
                if (e.data.ntid == undefined) { return; }
                if (!e.data.fid) { return; }
                if (!this.__curHouseInfo) { return; }
                if (!this.__curHouseInfo.floors_map) {
                    return;
                }
                if (!this.__curHouseInfo.floors_map[e.data.fid]) {
                    return;
                }
                if (!this.__curHouseInfo.floors_map[e.data.fid].ftableitems) {
                    this.__curHouseInfo.floors_map[e.data.fid].ftableitems = [];
                }
                let ftable: tea.Data_HosueFtableItems = lodash.find(this.__curHouseInfo.floors_map[e.data.fid].ftableitems, { ntid: e.data.ntid, fid: e.data.fid });
                if (!ftable) {
                    return;
                }
                ftable.tmemitems = [];
                ftable.begin = false;
                kaayou.emit(this.__curModuleName, 'ui::ingame::updateTable', this.sorttables(this.__curHouseInfo));
            }

            //人员上线ntf
            onFloorMemberOnline_ntf(e: kaayou.Event) {
                if (!this.__curModuleName) { return; }
                if (!e.data) { return; }
                if (!e.data.uid) { return; }
                if (!this.__curHouseInfo) { return; }
                if (!this.__curHouseInfo.online_users) {
                    this.__curHouseInfo.online_users = [];
                }
                let user: ITH_DATA_USER_INFO = lodash.find(this.__curHouseInfo.online_users, { uid: e.data.uid });
                if (!user) {
                    let isanonymous = this.__curHouseInfo.isanonymous;
                    if (isanonymous) {
                        e.data.uname = "匿名昵称"
                        e.data.uurl = ""
                    }

                    //原来没有就加上
                    //kaayou.emit(this.__curModuleName,"ui::OnlineList::Add",e.data);
                    user = lodash.cloneDeep(e.data);
                    this.__curHouseInfo.online_users.push(user);
                    //return;
                }
                user.is_online = true;
                user.inTable = false;
                this.checkuserInvite(user.uid);
                kaayou.emit(this.__curModuleName, 'ui::ingame::updateMember', this.__curHouseInfo.online_users);
            }

            //人员下线ntf
            onFloorMemberOffline_ntf(e: kaayou.Event) {
                if (!this.__curModuleName) { return; }
                if (!e.data) { return; }
                if (!e.data.uid) { return; }
                if (!this.__curHouseInfo) { return; }
                if (!this.__curHouseInfo.online_users) {
                    this.__curHouseInfo.online_users = [];
                }
                let user: ITH_DATA_USER_INFO = lodash.find(this.__curHouseInfo.online_users, { uid: e.data.uid });
                if (!user) {
                    return;
                }
                user.is_online = false;
                this.checkuserInvite(user.uid);
                kaayou.emit(this.__curModuleName, 'ui::ingame::updateMember', this.__curHouseInfo.online_users);
            }

            //人员进游戏ntf
            onFloorMemberEnterTable_ntf(e: kaayou.Event) {
                if (!this.__curModuleName) { return; }
                if (!e.data) { return; }
                if (!e.data.uid) { return; }
                if (!this.__curHouseInfo) { return; }
                if (!this.__curHouseInfo.online_users) {
                    this.__curHouseInfo.online_users = [];
                }
                let user: ITH_DATA_USER_INFO = lodash.find(this.__curHouseInfo.online_users, { uid: e.data.uid });
                if (!user) {
                    return;
                }
                user.is_online = false;
                user.inTable = true;
                this.checkuserInvite(user.uid);
                kaayou.emit(this.__curModuleName, 'ui::ingame::updateMember', this.__curHouseInfo.online_users);
            }

            //人员出游戏ntf
            onFloorMemberLeaveTable_ntf(e: kaayou.Event) {
                // if (!this.__curModuleName) { return; }
                // if (!e.data) { return; }
                // if (!e.data.uid) { return; }
                // if (!this.__curResult) { return; }
                // if (!this.__curResult.online_users) {
                //     this.__curResult.online_users = [];
                // }
                // let user: ITH_DATA_USER_INFO = lodash.find(this.__curResult.online_users, { uid: e.data.uid });
                // if (!user) {
                //     return;
                // }
                // user.is_online = false;
                // this.checkuserInvite(user.uid);
                // kaayou.emit(this.__curModuleName, 'ui::ingame::updateMember', this.__curResult.online_users);
            }

            //玩家申请ntf
            onTeaHouseApplyAgree_ntf(e: kaayou.Event) {
                if (!this.__curModuleName) { return; }
                if (!e.data) { return; }
                if (!e.data.uid) { return; }
                if (!this.__curHouseInfo) { return; }
                if (!this.__curHouseInfo.apply_users) {
                    this.__curHouseInfo.apply_users = [];
                }
                this.__curHouseInfo.apply_users = lodash.pullAllBy(this.__curHouseInfo.apply_users, [{ uid: e.data.uid }], 'uid');
                kaayou.emit(this.__curModuleName, 'ui::ingame::updateApply', this.__curHouseInfo.apply_users);
                kaayou.emit("common", 'ui::Toast::Show', { msg: `已同意玩家[${e.data.uid}]加入亲友圈` });
            }

            onTeaHouseApplyJoin_ntf(e: kaayou.Event) {
                if (!e.data) { return; }
                kaayou.emit(this.__curModuleName, "ui::ApplyList::Add", e.data);
            }

            onTeaHouseApplyRefused_ntf(e: kaayou.Event) {
                //
                if (!this.__curModuleName) { return; }
                if (!e.data) { return; }
                if (!e.data.uid) { return; }
                if (!this.__curHouseInfo) { return; }
                if (!this.__curHouseInfo.apply_users) {
                    this.__curHouseInfo.apply_users = [];
                }
                this.__curHouseInfo.apply_users = lodash.pullAllBy(this.__curHouseInfo.apply_users, [{ uid: e.data.uid }], 'uid');
                kaayou.emit(this.__curModuleName, 'ui::ingame::updateApply', this.__curHouseInfo.apply_users);
                kaayou.emit("common", 'ui::Toast::Show', { msg: `已拒绝玩家[${e.data.uid}]加入亲友圈` });
            }

            //在线换拒绝
            @BindEvent("tea", "mod::GameTable::ApplyReject")
            async ApplyReject(data: { uid: number, apply_type: number }) {
                var token = this.getToken();
                let op_uid = this.getUid();
                let hid = this.__curHid;
                if (lodash.isEmpty(token) || op_uid == undefined || op_uid < 1) {
                    return;
                }
                if (hid == undefined || hid < 1) {
                    return;
                }

                let temp = {
                    "head": "housememberrefused",
                    "data": JSON.stringify({
                        token: token,
                        apply_type: data.apply_type,
                        uid: data.uid,
                        hid: hid,
                        op_uid: op_uid
                    }),
                    "msgsign": {
                        "time": new Date().getTime(),
                        "encode": 0
                    }
                }

                if (common.mod.Config.isLoginEncryp) {
                    temp.msgsign.encode = 1;
                    temp.data = kaayou.AES.encrypt(temp.data);
                }


                kaayou.emit('common', "ui::Loading::Show");
                let res = await kaayou.Http.POST(common.mod.Config.GetAppConfig().hallUrl + "/service", { msgdata: JSON.stringify(temp) });
                kaayou.emit("common", "ui::Loading::Hide");
                let msg: kaayou.Ka_MSG_RES = kaayou.Http.parseResult(res);
                if (!!msg) {
                    if (msg.errcode == 0) {

                    } else {
                        //无权限时，关闭界面
                        if (msg.errcode == 123) {
                            if (!lodash.isEmpty(this.__curModuleName)) {
                                kaayou.emit(this.__curModuleName, 'ui::InGameTeaHousePanel::Hide', {});
                            }
                        }
                        let options = {
                            msg: msg.errmsg || "拒绝申请失败",
                            btns: [
                                {
                                    name: "确定",
                                    action: function () {
                                    },
                                    colorType: 'green'
                                },
                            ]
                        }
                        kaayou.emit('common', 'ui::Dialog::Show', options);
                        return;
                    }
                }
            }

            //在线换同意
            @BindEvent("tea", "mod::GameTable::ApplyAgree")
            async ApplyAgree(data: { uid: number, apply_type: number }) {
                var token = this.getToken();
                let op_uid = this.getUid();
                let hid = this.__curHid;
                if (lodash.isEmpty(token) || op_uid == undefined || op_uid < 1) {
                    return;
                }
                if (hid == undefined || hid < 1) {
                    return;
                }

                let temp = {
                    "head": "housememberagree",
                    "data": JSON.stringify({
                        token: token,
                        apply_type: data.apply_type,
                        uid: data.uid,
                        hid: hid,
                        op_uid: op_uid
                    }),
                    "msgsign": {
                        "time": new Date().getTime(),
                        "encode": 0
                    }
                }

                if (common.mod.Config.isLoginEncryp) {
                    temp.msgsign.encode = 1;
                    temp.data = kaayou.AES.encrypt(temp.data);
                }


                kaayou.emit('common', "ui::Loading::Show");
                let res = await kaayou.Http.POST(common.mod.Config.GetAppConfig().hallUrl + "/service", { msgdata: JSON.stringify(temp) });
                kaayou.emit("common", "ui::Loading::Hide");
                let msg: kaayou.Ka_MSG_RES = kaayou.Http.parseResult(res);
                if (!!msg) {
                    if (msg.errcode == 0) {

                    } else {
                        //无权限时，关闭界面
                        if (msg.errcode == 123) {
                            if (!lodash.isEmpty(this.__curModuleName)) {
                                kaayou.emit(this.__curModuleName, 'ui::InGameTeaHousePanel::Hide', {});
                            }
                        }
                        let options = {
                            msg: msg.errmsg || "同意申请失败",
                            btns: [
                                {
                                    name: "确定",
                                    action: function () {
                                    },
                                    colorType: 'green'
                                },
                            ]
                        }
                        kaayou.emit('common', 'ui::Dialog::Show', options);
                        return;
                    }
                }
            }

        }
        Gametables.getInstance();
    }
}