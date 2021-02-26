namespace lobby {
    import emit = kaayou.emit;
    const { BindEvent, doBindEvent } = kaayou._decorator;

    export interface Data_PakeageFromRoomId {
        city: string,                            //城市编码
        country: string,                         //区编码
        games: Array<Data_PakeageInfo>,          //这个包里面包含的子游戏数组
        gametype: number,                        //游戏类型       3：是麻将         
        icon: string,                            //图标
        id: number,                              //包唯一标志
        is_public: number,                       //是不是公共包   0：不是  1：是
        package_key: string,                     //包的key
        package_name: string,                    //包名
        package_version: string,                 //包版本
        province: string,                        //省
        reco: number                             //是不是推荐包   0：不是  1：是
    }

    export interface Data_PakeageInfo {
        game_rule_version: number,               //这个玩法的版本
        icon: string,                            //游戏图标
        kind_id: number,                         //玩法kindid
        name: string,                            //玩法名
        package_key: string,                     //包key
        package_name: string,                    //包名
        package_version: string                  //包版本
    }

    export namespace mod {

        //本来想起名FKGAME  和 JBGAME  
        //发现太难听  换成 RCGAME   GDGAME
        export class RCGame {
            static __INS__: lobby.mod.RCGame = null;
            static getInstance(): lobby.mod.RCGame {
                if (RCGame.__INS__ == null) {
                    RCGame.__INS__ = new RCGame();
                    RCGame.__INS__.initMod();
                }
                return RCGame.__INS__;
            }
            @doBindEvent
            initMod() {
                kaayou.getController().on('MagicWindowCallPull', function (e: kaayou.Event) {
                    let mwData = kaayou.PlatformMgr.getInstance().mw.getMagicWindowInfo();
                    if (!!mwData && mwData != undefined && mwData.length > 0 && mwData != "0") {
                        let mwRoomId = JSON.parse(mwData).index;
                        console.log("魔窗返回的消息RCGame：", mwRoomId);
                        if (mwRoomId.indexOf("hid") < 0) kaayou.emit("lobby", "mod::RCGame::AreapkgbyRoomid", { roomid: mwRoomId });
                        else {
                            let arr = mwRoomId.split(";");
                            let hid: number = parseInt(arr[0].substr(4));
                            let invite_uid: number = parseInt(arr[1].substr(10));
                            console.log("魔窗返回的消息hid：", hid);
                            console.log("魔窗返回的消息invite_id：", invite_uid);
                            kaayou.emit("tea", "mod::TeaHouse::JoinHouse", { hid: hid, invite_uid: invite_uid });
                        }
                        return;
                    }
                }, this);
            }

            //通过房号查询地区玩法信息等
            @BindEvent("lobby", "mod::RCGame::AreapkgbyRoomid")
            async onGetAreaPaheage(data: { roomid: any ,callBack?:Function }) {
                var self = this;
                kaayou.emit('common', 'ui::Loading::Show');
                let sdata: proto_areapkgbytid = {
                    id: Number(data.roomid)
                }
                let res: proto_areapkgbytid_res = await kaayou.sendMessage("lobby", rcGameHead.areapkgbytid, sdata, kaayou.MakeResultMessageHead(rcGameHead.areapkgbytid));
                kaayou.emit("common", 'ui::Loading::Hide');
                if (res.errcode) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: res.msg || "获取房间信息失败！" });
                    return;
                }
                kaayou.emit("lobby", 'ui::JoinRoom::Hide');//应该加载切换或者回来场景的时候隐藏
                kaayou.emit("lobby", 'ui::CreateRoom::Hide');

                if (lodash.isFunction(data.callBack)) {
                    data.callBack(res);
                    return;
                }

                common.mod.Update.ExistsSubGame(res.package_key, res.package_version, function () {
                    self.onJoinRoom({ id: data.roomid, gameKey: res.package_key });
                })

            }

            //请求创建房间
            @BindEvent("lobby", "mod::RCGame::CreaterRoom")
            async onCreaterRoom(data: { kindid: number, configData: any }) {
                let self = this;
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
                // try{
                //     kaayou.emit("common", "ui::Loading::Show", { msg: "正在获取GPS信息", time: 30 });
                //     let m=await common.mod.GPS.getInstance().getGPSInfo();
                //     kaayou.emit("common", "ui::Loading::Hide");
                // }catch(ex){
                //     kaayou.emit("common", "ui::Loading::Hide");
                //     kaayou.emit("common","ui::Toast::Show",{msg:"获取GPS信息失败"});
                //     return;
                // }

                let mapStr = kaayou.DataSet.get("user::Map") || "";
                console.log("进桌map onCreaterRoom", mapStr)

                let appConfig = common.mod.Config.AppConfig
                if (appConfig && appConfig.gps.enabled && cc.sys.isNative) {  //当需要去调用位置的时候
                    AttrObj["gps"] = mapStr.length > 0;
                } else {
                    AttrObj["restrict"] = "false";
                    AttrObj["gps"] = false;
                }

                if (!kaayou.PlatformMgr.getInstance().gvoice.getInitStatus() && cc.sys.isNative && AttrObj["gvoice"] && AttrObj["gvoice"] == "true") {
                    kaayou.PlatformMgr.getInstance().gvoice.Init(lobby.mod.User.getInstance().getUserInfo().uid);
                    //lw200805改为弱提示，因为有可能一边热更一边弹这个提示
                    kaayou.emit('common', 'ui::Toast::Show', { msg: "实时语音初始化中~请稍后重试！" });
                    return;
                }

                if (cc.sys.isNative) { //需要去原生检查是否开启了语音权限；
                    let mediaAuth  = kaayou.PlatformMgr.getInstance().sys.GetMediaStatus();
                    AttrObj["voice"] = !!mediaAuth ? true : false;
                    AttrObj["gvoiceok"] = kaayou.PlatformMgr.getInstance().gvoice.getInitStatus();
                } else {
                    AttrObj["voice"] = true;   //网页默认先给个true；
                    AttrObj["gvoiceok"] = true;
                }

                //lw200616AttrObj里包含getPublicRuleConfigNames()里的字段
                let res: proto_tablecreate_res = await kaayou.sendMessage("lobby", rcGameHead.tablecreate, AttrObj, kaayou.MakeResultMessageHead(rcGameHead.tablecreate));
                if (res.errcode) {
                    console.log("创建房间失败", res.errcode, res.msg);//房间号
                    kaayou.emit("common", 'ui::Loading::Hide');
                    if (res.errcode == 136) {   //表面该游戏是在维护中136
                        kaayou.emit("lobby", "ui::Maintain::Show", { msg: JSON.parse(res.msg).content, code: res.errcode })
                        return;
                    }

                    if (res.errcode == 119) {
                        let options = {
                            msg: res.msg,
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
                    }

                    kaayou.emit("common", 'ui::Toast::Show', { msg: res.msg || "创建失败" });
                    return;
                }
                self.onGetAreaPaheage({ roomid: res.id });
            }

            //请求加入房间
            @BindEvent("lobby", "mod::RCGame::JoinRoom")
            async onJoinRoom(data: { id: number, gameKey: string }) {
                let mapStr = kaayou.DataSet.get("user::Map") || "";
                //lw191209好友房加经纬度
                let latitude = 0;
                let longitude = 0;
                let address = "";
                if (mapStr.length > 0) {
                    let oMap = JSON.parse(mapStr);
                    latitude = parseFloat(oMap.latitude);
                    longitude = parseFloat(oMap.longitude);
                    address = oMap.address;
                }

                let mediaAuth = kaayou.PlatformMgr.getInstance().sys.GetMediaStatus();

                let temp = {
                    head: "tablein",
                    data: JSON.stringify({  id: Number(data.id), 
                                            seat: -1, gps: mapStr.length > 0, 
                                            latitude: latitude, 
                                            longitude: longitude, 
                                            address: address, 
                                            voice:!!mediaAuth,
                                            gvoiceok:!! kaayou.PlatformMgr.getInstance().gvoice.getInitStatus(), 
                                        })
                }
                let tempData: proto_tablein = JSON.parse(temp.data);
                let res: proto_tablein_res = await kaayou.sendMessage("lobby", rcGameHead.tablein, tempData, kaayou.MakeResultMessageHead(rcGameHead.tablein));
                kaayou.PlatformMgr.getInstance().mw.tellClientToClear();  //走到这个地方就去清除客户端的魔窗数据
                if (res.errcode) {
                    kaayou.emit('common', 'ui::Loading::Hide');
                    kaayou.emit('common', 'ui::Toast::Show', { msg: res.msg || "找不到对应房间，请重试！" });
                    kaayou.emit('lobby', 'ui::JoinRoom::ReInPut');
                    console.log("入桌错误码：", res.errcode);
                    if (res.errcode == 136) {   //表面该游戏是在维护中136
                        kaayou.emit("lobby", "ui::Maintain::Show", { msg: JSON.parse(res.msg).content, code: res.errcode })
                        return;
                    }

                    if (res.errcode == 119 || res.errcode == 225 || res.errcode == 226) {
                        if (res.errcode == 226) {
                            kaayou.PlatformMgr.getInstance().gvoice.Init(lobby.mod.User.getInstance().getUserInfo().uid)
                        }
                        let options = {
                            msg: res.msg,
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
                    }

                    if (res.errcode == 196) {  //如果进桌的时候返回的是196，就是需要开定位。。但是客户端没有获取到；
                        kaayou.PlatformMgr.getInstance().map.GetMapInfo();
                        // kaayou.emit("common", "ui::Toast::Show", { msg: res.msg});
                        let options = {
                            msg: res.msg + " 正在获取定位！请稍后重试~",
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
                    }
                    return;
                }
                let tempRes = {
                    gameKey: res.package_key,
                    id: res.id,
                    gameid: res.gameid,
                    kindid: res.kindid,
                    ip: res.ip,
                }

                res["replayid"] = 0;
                kaayou.DataSet.set("game::config", JSON.stringify(tempRes));
                kaayou.LobbyToGame(data.gameKey);
            }
            // @BindEvent("lobby", "mod::Room::JoinServerRoom")
            // async onJoinSeverRoom(res: {
            //     gameKey: string,
            //     id: number,
            //     gameid: number,
            //     kindid: number,
            //     ip: number
            // }) {
            //     var self = this;
            //     try {
            //         // if (!res) {
            //         //     kaayou.emit('ui::Loading::Hide');
            //         //     self.needUpdate=true;
            //         //     console.error("数据 is undefine");
            //         //     return;
            //         // }
            //         // if (!res.id) {
            //         //     kaayou.emit('ui::Loading::Hide');
            //         //     self.needUpdate=true;
            //         //     console.error("roomId is undefine");
            //         //     return;
            //         // }


            //         // if (!res.kindid) {
            //         //     kaayou.emit('ui::Loading::Hide');
            //         //     self.needUpdate=true;
            //         //     console.error("kindid is undefine");
            //         //     return;
            //         // }

            //         // if (!res.ip) {
            //         //     kaayou.emit('ui::Loading::Hide');
            //         //     self.needUpdate=true;
            //         //     console.error("game_ip is undefine");
            //         //     return;
            //         // }

            //         res["replayid"] = 0;
            //         kaayou.DataSet.set("game::config", JSON.stringify(res));
            //         this.onGetAreaPaheage({ roomid: res.id });

            //     } catch (err) {
            //         console.error(err);
            //     }
            // }

            @BindEvent("lobby", "mod::RCGame::doGetAllGameRules")
            async doGetAllGameRules() {
                //   var { error, resData } = <{ error: string, resData:  { [key: string]:  common.mod.Data_Game_Package } }>await common.mod.Config.GetAllGamePackages()
                //   if (error) {
                //       kaayou.emit("common", "ui::Toast::Show", { msg: "获取游戏数据失败！" })
                //       return;
                //   }
                //   kaayou.emit("lobby","ui::GamePackages::update",resData);
            }



        }

    }
    lobby.mod.RCGame.getInstance();
}