/// <reference path="common.mod.gameBaseMod.ts" />
namespace common {
    const { BindEvent, doBindEvent } = kaayou._decorator;

    export namespace mod {

        export interface IFriendGame_User_Info extends IGame_User_Info {
            dismissState: DismissRoomState;
            fewerState?: FewerState;
            gvoicemenberid: number;
            gvoicesta: number;

        }
        export enum DismissRoomState {
            AGREE = 1,//同意   
            DISAGREE,//不同意
            DISMISS_CREATOR,// 解散房间发起者
            WATING,//等待中（尚未决定同意与否）
            DISSMISS_MAX
        }

        export enum FewerState {
            AGREE = 1,//同意   
            DISAGREE,//不同意
            Fewer_CREATOR,// 解散房间发起者
            WATING,//等待中（尚未决定同意与否）
            Fewer_MAX
        }

        export interface friendGameConfig {
            kindid: number,
        }

        export interface WatcherListItem {
            name: string,// Name     string `json:"name"`     //姓名
            uid: number,// Uid      int64  `json:"uid"`      //id
            imageurl: string,// ImageUrl string `json:"imageurl"` //头像
            sex: number// Sex      int    `json:"sex"`      //性别
        }

        export interface IFriendTableInfo extends ITableInfo {
            creator: number,//房主
            step: number,//第几局
            tableid: number,//房号
            ntid: number//楼层牌桌号
            nfid: number//楼层id
            hid: number//茶楼id
            isvitamin: boolean  //房间是否显示竞技点
            distancelimit: number //距离多少米提示距离过近
        }

        export abstract class friendBaseMod<IPlayerT extends IFriendGame_User_Info> extends gameBaseMod<IPlayerT, IFriendTableInfo> {
            curRound: number = 0;
            scoreRadix: number = 1; //积分放大倍数
            gameConfig: {
                id: number,//桌号
                kindid: number//游戏
                ip: string,
            } = null;

            private _isGuestState: boolean = false;

            abstract onPlayerCome(playerInfo: common.mod.IGame_User_Info);
            abstract onGetInviteData();

            initMod() {
                this.isFriendRoom = true;
                this.scoreRadix = 1;
                this._isGuestState = false;

                super.initMod();
            }

            getIsOpenGps() {
                console.log("是否开启GPS", common.mod.Config.AppConfig["gps"]["enabled"]);
                return common.mod.Config.AppConfig["gps"]["enabled"] ? true : false;
            }

            setIsGuestState(v: boolean) {
                this._isGuestState = v;
            }
            getIsGuest() {
                return this._isGuestState;
            }

            protected bindModEvents() {
                let self = this;
                super.bindModEvents();
                kaayou.getController(this.getModuleName()).on('ws::onConnect', function (e: kaayou.Event) {
                    self.onConnect();
                }, this);

                kaayou.getController(this.getModuleName()).on('ws::Msg::ping', function (e: kaayou.Event) {
                    kaayou.emit("", "ui::ping::netStatus", JSON.stringify(e.data))
                }, this);

                kaayou.getController(this.getModuleName()).on('ws::Msg::gvoicemember', function (e: kaayou.Event) {
                    console.log('GVoice 收到gvoicemember广播消息', JSON.stringify(e.data));
                    self.OnGVoiceMember(e.data);
                }, this);
                kaayou.getController(this.getModuleName()).on('gvoice::UpdateMemberVoice', function (e: kaayou.Event) {
                    self.OnGvoiceMemberVoice(e.data);
                }, this);

                // kaayou.getController(this.getModuleName()).on('ws::Msg::sitein', function (e: kaayou.Event) {
                //     // self.onSiteIn(e.data);
                //     self._eventQueue.push({data:e.data,func:self.onSiteIn,target:self});
                // }, this);

                // kaayou.getController(this.getModuleName()).on('ws::Msg::siteinfo', function (e: kaayou.Event) {
                //     // self.onSiteInfo(e.data);
                //     self._eventQueue.push({data:e.data,func:self.onSiteInfo,target:self});
                // }, this);

                // kaayou.getController(this.getModuleName()).on('mod::User::doSiteTableIn', function (e: kaayou.Event) {
                //     // self.onDoSiteTableIn(e.data);
                //     self._eventQueue.push({data:e.data,func:self.onDoSiteTableIn,target:self});
                // }, this);

                kaayou.getController(this.getModuleName()).on('ws::Msg::gameinfo', function (e: kaayou.Event) {
                    console.log('RES_获取游戏信息', e.data);
                    self._eventQueue.push({ data: e.data, func: self.onGameInfo, target: self, mname: self.getModuleName(), ename: "ws::Msg::gameinfo" });
                }, this);

                kaayou.getController(this.getModuleName()).on('ws::Msg::tableinfo', function (e: kaayou.Event) {
                    cc.log('桌子信息', e.data);
                    self._eventQueue.push({ data: e.data, func: self.onTableInfo, target: self, mname: self.getModuleName(), ename: "ws::Msg::tableinfo" });
                }, this);

                kaayou.getController(this.getModuleName()).on('ws::Msg::statusFree', function (e: kaayou.Event) {
                    console.log('空闲状态', e.data);
                    self._eventQueue.push({ data: e.data, func: self.onGameFree, target: self, mname: self.getModuleName(), ename: "ws::Msg::statusFree" });
                }, this);

                kaayou.getController(this.getModuleName()).on('ws::Msg::userStatus', function (e: kaayou.Event) {
                    console.log('RES_玩家状态消息', e.data);
                    self._eventQueue.push({ data: e.data, func: self.onUpdateuserStatus, target: self, mname: self.getModuleName(), ename: "ws::Msg::userStatus" });
                }, this);

                kaayou.getController(this.getModuleName()).on('ws::Msg::gamepause', function (e: kaayou.Event) {
                    console.log('RES_玩家竞技点暂停状态消息', e.data);
                    self._eventQueue.push({ data: e.data, func: self.onUpdatePlayerFcmPause, target: self, mname: self.getModuleName(), ename: "ws::Msg::gamepause" });
                }, this);

                kaayou.getController(this.getModuleName()).on('ws::Msg::gamecontinue', function (e: kaayou.Event) {
                    console.log('RES_玩家竞技点继续状态消息', e.data);
                    self._eventQueue.push({ data: e.data, func: self.onUpdatePlayerFcmContinue, target: self, mname: self.getModuleName(), ename: "ws::Msg::gamecontinue" });
                }, this);

                kaayou.getController(this.getModuleName()).on('ws::Msg::housevitaminset_ntf', function (e: kaayou.Event) {
                    console.log('RES_游戏竞技点更新推送', e.data);
                    self._eventQueue.push({ data: e.data, func: self.onUpdatePlayerVitamin, target: self, mname: self.getModuleName(), ename: "ws::Msg::housevitaminset_ntf" });
                }, this);


                kaayou.getController(this.getModuleName()).on("ws::Msg::dissmissfriend", function (e: kaayou.Event) {
                    console.log('RES_收到解散申请', e.data);
                    self._eventQueue.push({ data: e.data, func: self.onDissmissRep, target: self, mname: self.getModuleName(), ename: "ws::Msg::dissmissfriend" });
                }, this);

                kaayou.getController(this.getModuleName()).on("ws::Msg::gameGoOnNextGame", function (e: kaayou.Event) {
                    console.log('RES_下一局', e.data);
                    self._eventQueue.push({ data: e.data, func: self.onNextGame, target: self, mname: self.getModuleName(), ename: "ws::Msg::gameGoOnNextGame" });
                }, this);

                kaayou.getController(this.getModuleName()).on("ws::Msg::gameStatus", function (e: kaayou.Event) {
                    cc.log('RES_场景状态返回', e.data);
                    self._eventQueue.push({ data: e.data, func: self.onGameStatus, target: self, mname: self.getModuleName(), ename: "ws::Msg::gameStatus" });
                }, this);

                kaayou.getController(this.getModuleName()).on("ws::Msg::tableexit", function (e: kaayou.Event) {
                    cc.log('RES_退出桌子', e.data);
                    self._eventQueue.push({ data: e.data, func: self.onTableExit, target: self, mname: self.getModuleName(), ename: "ws::Msg::tableexit" });
                }, this);

                kaayou.getController(this.getModuleName()).on("ws::Msg::forcetabledel", function (e: kaayou.Event) {
                    console.log('RES_房主解散', e.data);
                    self._eventQueue.push({ data: e.data, func: self.onForcetabledel, target: self, mname: self.getModuleName(), ename: "ws::Msg::forcetabledel" });
                }, this);

                kaayou.getController(this.getModuleName()).on("ws::Msg::dissmissfriendrep", function (e: kaayou.Event) {
                    cc.log('RES_收到解散申请', e.data);
                    self._eventQueue.push({ data: e.data, func: self.onDissmissRep, target: self, mname: self.getModuleName(), ename: "ws::Msg::dissmissfriendrep" });
                }, this);

                kaayou.getController(this.getModuleName()).on("ws::Msg::dismissRoom", function (e: kaayou.Event) {
                    cc.log('RES_解散房间', e.data);
                    self._eventQueue.push({ data: e.data, func: self.onDissmissRoom, target: self, mname: self.getModuleName(), ename: "ws::Msg::dismissRoom" });
                }, this);

                kaayou.getController(this.getModuleName()).on("ws::Msg::dissmissresult", function (e: kaayou.Event) {
                    console.log('RES_解散状态', e.data);
                    self._eventQueue.push({ data: e.data, func: self.onGuestDismissFriendState, target: self, mname: self.getModuleName(), ename: "ws::Msg::dissmissresult" });
                }, this);

                kaayou.getController(this.getModuleName()).on("ws::Msg::userinfohead", function (e: kaayou.Event) {
                    console.log("RES_玩家计分信息", e.data);
                    self._eventQueue.push({ data: e.data, func: self.onUserExtInfo, target: self, mname: self.getModuleName(), ename: "ws::Msg::userinfohead" });
                }, this);

                kaayou.getController(this.getModuleName()).on("ws::Msg::tablein", function (e: kaayou.Event) {
                    self._eventQueue.push({ data: e.data, func: self.onTableInErr, target: self, mname: self.getModuleName(), ename: "ws::Msg::tablein" });
                }, this);

                kaayou.getController(this.getModuleName()).on("ws::Msg::fewershow", function (e: kaayou.Event) {
                    self._eventQueue.push({ data: e.data, func: self.onFewershow, target: self, mname: self.getModuleName(), ename: "ws::Msg::fewershow" });
                }, this);

                kaayou.getController(this.getModuleName()).on("ws::Msg::fewerhide", function (e: kaayou.Event) {
                    self._eventQueue.push({ data: e.data, func: self.onFewerhide, target: self, mname: self.getModuleName(), ename: "ws::Msg::fewerhide" });
                }, this);

                kaayou.getController(this.getModuleName()).on("ws::Msg::fewerclose", function (e: kaayou.Event) {
                    self._eventQueue.push({ data: e.data, func: self.onFewerclose, target: self, mname: self.getModuleName(), ename: "ws::Msg::fewerclose" });
                }, this);

                kaayou.getController(this.getModuleName()).on("ws::Msg::fewerinfo", function (e: kaayou.Event) {
                    self._eventQueue.push({ data: e.data, func: self.onFewerinfo, target: self, mname: self.getModuleName(), ename: "ws::Msg::fewerinfo" });
                }, this);

                kaayou.getController(this.getModuleName()).on("ws::Msg::fewerfriend", function (e: kaayou.Event) {
                    self._eventQueue.push({ data: e.data, func: self.onFewerfriend, target: self, mname: self.getModuleName(), ename: "ws::Msg::fewerfriend" });
                }, this);

                kaayou.getController(this.getModuleName()).on("ws::Msg::fewerresult", function (e: kaayou.Event) {
                    self._eventQueue.push({ data: e.data, func: self.onFewerresult, target: self, mname: self.getModuleName(), ename: "ws::Msg::fewerresult" });
                }, this);

                kaayou.getController(this.getModuleName()).on("ws::Msg::tablewatcherlist", function (e: kaayou.Event) {
                    // self._eventQueue.push({ data: e.data, func: self.onTablewatcherlist, target: self, mname: self.getModuleName(), ename: "ws::Msg::fewerresult" });
                    self.onTablewatcherlist(e.data);
                }, this);

                kaayou.getController(this.getModuleName()).on('ws::Msg::gamemessage', function (e: kaayou.Event) {
                    // self.onGameMessage(e.data);
                    self._eventQueue.push({ data: e.data, func: self.onGameMessage, target: self });
                }, this);
            }

            onGameMessage(data: { type: number, content: string }) {
                if (this._wait) {
                    return false;
                }
                console.log("收到通知消息:", data);
                if (data.content && data.content.length > 0) {
                    let options = {
                        msg: data.content,
                        btns: [
                            {
                                name: "确定",
                                colorType: 'green',
                                action: () => {
                                    this.CleanAndGotoLobby();
                                }
                            },
                        ],
                    }
                    kaayou.emit('common', 'ui::Dialog::Show', options);
                }
                // //type:消息类型，0x1000:退出游戏
                // if (data.type & 0x1000) {
                //     kaayou.emit(this.getModuleName(), "Exit", { exitType: 0 });
                //     kaayou.emit(this.getModuleName(), 'ui::cleanUp');
                // }
                return true;
            }

            onTablewatcherlist(data: { items: Array<WatcherListItem> }) {
                kaayou.emit(this.getModuleName(), "ui::watchLayer::getGuestList", data.items);
            }

            onGameStatus(status: { bGameStatus: number, bAllowLookon: number }) {
                if (this._wait) {
                    return false;
                }
                this._gameInfo.status = status.bGameStatus;
                return true;
            }

            doPlayBGM() {
                console.log('doPlayBGM');
            }

            playerExtends(player: IGame_User_Info) {
                player = lodash.extend({
                    dismissState: DismissRoomState.WATING,
                    fewerState: FewerState.WATING,
                    gvoicemenberid: -1,
                    gvoicesta: 0,
                }, player);
                super.playerExtends(player);
                return player;
            }

            IsMaster() {
                return this.userId == this.tableInfo.creator;
            }

            toArrayPlayer(): Array<IPlayerT> {
                if (this._isGuestState) {
                    let pArr: Array<IPlayerT> = [];
                    for (var i = 0; i < this._maxPlayer; i++) {
                        let player: IPlayerT = null;
                        for (var x in this._players) {
                            if (i == this._players[x].seat) {
                                player = this._players[x];
                            }
                        }
                        pArr[i] = player;
                    }
                    return this.offsetPlayer(pArr);
                } else {
                    return super.toArrayPlayer();
                }
            }

            getSelfPlayer() {
                if (this._isGuestState) {
                    // return this._players[]
                    for (let x in this._players) {
                        if (this._players[x].seat == this.myServerchair) {
                            return this._players[x];
                        }
                    }
                } else {
                    return this._players[this.userId];
                }
            }

            setServerChair(chair: number) {
                this.myServerchair = chair;
            }

            //用户加入实时语音房间时的广播消息
            OnGVoiceMember(data: { user: Array<{ uid: number, id: number }> }) {
                if (!data || !data.user) { return; }
                if (data.user.length == 0) { return; }

                for (let i = 0; i < data.user.length; i++) {
                    let player = this.getPlayerByUid(data.user[i].uid);
                    if (player) {
                        player.gvoicemenberid = data.user[i].id;
                    }
                }
            }

            //实时语音房间成员语音状态消息
            OnGvoiceMemberVoice(data: { memberID: number, status: number }) { //from emit "gvoice::UpdateMemberVoice"
                let isUpdate = false;
                for (let i = 0; i < this._maxPlayer; i++) {
                    let player = this.getPlayerByChairID(i);
                    if (!player) continue;
                    if (player.gvoicemenberid == -1 || player.gvoicemenberid != data.memberID) continue;
                    if (player.gvoicesta == -1) break;
                    player.gvoicesta = data.status;
                    kaayou.emit(this.getModuleName(), "ui::UpdateMemberVoice", { index: this.getIndexByChairID(i), gvoicesta: data.status });
                    isUpdate = true;
                    break;
                }

                if (!isUpdate) {
                    console.error("GVoice 收到语音状态变更消息，但是头像上状态未更新 ");
                    console.log("GVoice data:", JSON.stringify(data));
                    for (let i = 0; i < this._maxPlayer; i++) {
                        let player = this.getPlayerByChairID(i);
                        if (!player) continue;
                        console.log("GVoice uid=" + player.uid + ", gvoicemenberid=", player.gvoicemenberid + ", gvoicesta=", player.gvoicesta);
                    }
                }
            }

            //如果游戏是空闲状态,就会收到这个消息
            onGameFree(freedata: any) {
                if (this._wait) {
                    return false;
                }

                this.gameState = common.mod.GAME_STATE.NONE;
                return true;
            }

            onConnect() {
                let gameconfig: IGameConfig = null;
                interface IGameConfig {
                    id: number,//桌号
                    kindid: number//游戏
                    ip: string,
                }
                try {
                    gameconfig = JSON.parse(kaayou.DataSet.get("game::config") || ""); //  , JSON.stringify(tempRes));
                } catch (err) {

                }
                if (!gameconfig) {
                    kaayou.emit(this.getModuleName(), "ui::RunSceneError");
                    return;
                }

                let areaInfo = kaayou.DataSet.get("user::Map")
                console.log("进桌子的时候玩家地区信息：" + areaInfo);
                if (!lodash.isEmpty(areaInfo)) {
                    this.mapinfo = JSON.parse(areaInfo);
                }

                let isValid = true;
                if (this.mapinfo) {
                    isValid = this.isValidAddr(Number(this.mapinfo.longitude), Number(this.mapinfo.latitude));
                }


                if (this._eventQueue) {
                    this._eventQueue.start();
                }

                kaayou.emit('common', 'ui::Loading::Hide');
                this.gameConfig = gameconfig;
                let self = this;
                kaayou.sendMessage(this.getModuleName(), 'tablein',
                    { id: gameconfig.id, uid: this.userId, token: this.token, minfo: isValid ? JSON.stringify(this.mapinfo) : '{}' })
            }

            onTableInErr(info: any) {
                if (this._wait) {
                    return false;
                }
                let self = this;
                if (this.gameState != GAME_STATE.GAME_OVER) {
                    if (info.errcode != 0) {
                        let options = {
                            msg: info.msg,
                            btns: [
                                {
                                    name: "确定",
                                    action: function () {
                                        self.CleanAndGotoLobby();
                                    },
                                    colorType: 'green'
                                },
                            ]
                        }
                        kaayou.emit('common', 'ui::Dialog::Show', options);
                    }
                }
                return true;
            }

            srkjNum = -1;
            onFewershow(data) {
                cc.log("显示少人开局", data.num);
                this.srkjNum = data.num;
                kaayou.emit(this.getModuleName(), 'ui::MjTable::showKSRKJ', { num: data.num })
                return true;
            }

            //发起少人开局的按钮隐藏
            onFewerhide() {
                kaayou.emit(this.getModuleName(), "ui::MjTable::hideKSRKJ");
                return true;
            }

            // 少人申请过程中有人加入房间  会给客户端推送这个消息  关闭申请面板   //  State    int `json:"state"` //   1申请前  2申请中 3申请通过或人满
            onFewerclose(data) {
                cc.log(data);
                if (data.state == 3) {
                    this._maxPlayer = data.num;
                    kaayou.emit(this.getModuleName(), "ui::MjTable::btnInviteHide");
                }
                kaayou.emit(this.getModuleName(), "ui::FewerOpen::hide");

                kaayou.emit(this.getModuleName(), "ui::MjTable::hideKSRKJ", { b: data.state == 1 });

                for (var x in this._players) {
                    this._players[x].fewerState = FewerState.WATING;
                }
                return true;
            }
            //断线重连服务器推送过来的可少人开局的信息（如果有）
            onFewerinfo(data: { situation: Array<number> }) {
                cc.log('RES_少人开房', data);
                for (let i = 0; i < this._maxPlayer; i++) {
                    let player = this.getPlayerByChairID(i);
                    if (!player) continue;
                    player.fewerState = data.situation[i];
                }
                kaayou.emit(this.getModuleName(), 'ui::FewerOpen::show', {
                    Players: this.toOriginalArrayPlayer(),
                    myServerchair: this.myServerchair,
                    isCan: this.getSelfPlayer().fewerState == FewerState.WATING,
                    srkjNum: this._maxPlayer - 1,
                    isShow: true
                });
                return true;
            }
            // 第一个人点击之后 服务器返回
            onFewerfriend(data) {
                cc.log("收到srkj", data);
                if (!this._players[data.uid]) {
                    return;
                }
                this._players[data.uid].fewerState = FewerState.Fewer_CREATOR;
                kaayou.emit(this.getModuleName(), 'ui::FewerOpen::show', {
                    Players: this.toOriginalArrayPlayer(),
                    myServerchair: this.myServerchair,
                    isCan: this.getSelfPlayer().fewerState == FewerState.WATING,
                    srkjNum: this.srkjNum,
                    isShow: true
                });
                return true;
            }
            // 返回申请少人开局玩家状态
            onFewerresult(dis: { id: number, flag: boolean }) {
                cc.log('RES_少人开局玩家状态', dis);
                if (!this._players[dis.id]) { return };
                if (dis.flag == true) {
                    this._players[dis.id].fewerState = FewerState.AGREE;
                    kaayou.emit(this.getModuleName(), "ui::FewerOpen::show", {
                        Players: this.toOriginalArrayPlayer(), myServerchair: this.myServerchair,
                        isCan: this.getSelfPlayer().fewerState == FewerState.WATING,
                        srkjNum: this._maxPlayer - 1,
                        isShow: false
                    });
                } else if (dis.flag == false) {
                    this._players[dis.id].fewerState = FewerState.DISAGREE;
                    let playerinfo: IFriendGame_User_Info = this.getPlayerByUid(dis.id);
                    kaayou.emit(this.getModuleName(), 'ui::FewerOpen::hide');
                    kaayou.emit(this.getModuleName(), 'ui::MjTable::unSelect');
                    for (var x in this._players) {
                        this._players[x].fewerState = FewerState.WATING;
                    }
                    if (this.getIndexByChairID(dis.id) != 0 && dis.id != this.userId) {
                        let tempNickName = kaayou.Identify.nickNameSubFive(playerinfo.name);
                        let options = {
                            title: "温馨提示",
                            msg: "玩家" + tempNickName + "不同意少人开局",
                            close: {
                                isShow: false,
                                action: null,
                            },
                            btns: [
                                {
                                    name: "确定",
                                    colorType: 'green'
                                },
                            ]
                        }
                        kaayou.emit('common', 'ui::Dialog::Show', options);
                    }
                } else {
                    for (var x in this._players) {
                        this._players[x].fewerState = FewerState.WATING;
                    }
                }
                return true;
            }

            //gamestatus: 0 空闲状态  101游戏状态  102海底捞状态  103一局结束状态
            onGameInfo(data: { gamestatus: number, allowlookon: number, gameconfig: string, userready: Array<boolean>, userstatus: Array<GR_US_Status> }) {
                if (this._wait) {
                    return false;
                }
                this.setGameState(data.gamestatus);
                //当小结的时候断线重连会有问题  因为服务端发的状态为0(应该103)
                for (let i = 0; i < this._maxPlayer; i++) {
                    let player = this.getPlayerByChairID(i);
                    if (player) {
                        player.isReady = data.userready[i];//
                        player.userStatus = data.userstatus[i];
                        //游戏开始前断线重连过的玩家，服务器下发的isReady不正确，需要通过userStatus判断玩家是否准备
                        if (player.userStatus == GR_US_Status.US_READY) {
                            player.isReady = true;
                        }
                    }
                }
                if (this._isGameStart) {
                    return true;
                }
                let curPlayerNum = 0;
                for (let i = 0; i < this._maxPlayer; i++) {
                    let player = this.getPlayerByChairID(i);
                    if (player) {
                        // player.isReady = data.userready[i];
                        // player.userStatus = data.userstatus[i];
                        curPlayerNum++;
                        if (player.uid == this.userId) {
                            if (!player.isReady && this.gameState != mod.GAME_STATE.GAMEING) {
                                if (curPlayerNum < this._maxPlayer) {
                                    if (this.tableInfo.gameconfig["fewerstart"] == 'true') {
                                        kaayou.emit(this.getModuleName(), "ui::MjTable::showKSRKJ", { num: 1 });
                                    }
                                    this.sendReady();
                                } else {
                                    if (!this._isGameStart) {
                                        kaayou.emit(this.getModuleName(), 'ui::MjTable::lastPlayerCome', { leftTime: 5 });
                                    }
                                }
                            }
                        }
                    }
                }
                return true;
            }

            onTableInfo(data: IFriendTableInfo) {
                if (this._wait) {
                    return false;
                }
                this.maxRound = data.gameconfig.roundnum;
                this._maxPlayer = data.gameconfig.playernum;
                this.scoreRadix = data.gameconfig["scoreradix"] || 1;
                this.tableInfo = data;
                this.curRound = data.step;
                this._isGameStart = data.step > 0;
                this._isSceneIn = true;

                if (!data.person) {
                    data.person = [];
                }
                // //保存kindId
                // common.Rule.setKindID(data.kindid);
                //与服务器数据保持一致
                for (let x in this._players) {
                    let find = false;
                    for (let i = 0; i < data.person.length; i++) {
                        if (this._players[x].uid == data.person[i].uid) {
                            find = true;
                            break;
                        }
                    }
                    if (!find) {
                        delete this._players[x];
                    }
                }

                console.log(this._players);

                for (let i = 0; i < data.person.length; i++) {
                    if (!data.person[i]) continue;
                    if (!this._players[data.person[i].uid]) {
                        this.onPlayerCome(data.person[i]);
                    } else {
                        this._players[data.person[i].uid] = lodash.extend(this._players[data.person[i].uid], data.person[i]);
                    }
                }

                kaayou.emit(this.getModuleName(), "ui::playerInfoLayer::hideAddress");
                //如果没有我 那么就是游客
                if (!this._players[this.userId]) {
                    this.setIsGuestState(true);
                    if (this.myServerchair < 0) {
                        //在旁观玩家里面查找当前玩家的座位号
                        let lookonper: { [key: number]: IPlayerT } = {};
                        for (let i = 0; i < data.lookonperson.length; i++) {
                            for (let j = 0; data.lookonperson[i] && j < data.lookonperson[i].length; j++) {
                                if (!data.lookonperson[i][j]) continue;
                                lookonper[data.lookonperson[i][j].uid] = lodash.extend(lookonper[data.lookonperson[i][j].uid], data.lookonperson[i][j]);
                            }
                        }
                        if (lookonper[this.userId]) {
                            this.setServerChair(lookonper[this.userId].seat);
                        } else {
                            this.setServerChair(0);
                        }
                    }
                    kaayou.emit(this.getModuleName(), 'UpdatePlayer', { Players: this.toArrayPlayer() });
                } else {
                    this.setIsGuestState(false);
                }
                kaayou.emit(this.getModuleName(), "ui::RunScene");
                kaayou.emit(this.getModuleName(), 'showTableInfo', { roomid: data.tableid, gameconfig: data.gameconfig, curRound: '' + this.curRound + ' / ' + data.gameconfig.roundnum, hid: data.hid, ntid: data.ntid });
                return true;
            }

            gameOutConfirm() {
                let self = this;
                //网络断开时，直接返回大厅
                if (!kaayou.NetManager.getInstance().getSocket(this.getModuleName()).isOpend()) {
                    this.CleanAndGotoLobby();
                    return;
                }
                if (this._isGuestState) {
                    kaayou.sendMessage(this.getModuleName(), 'tablewatcherquit', { tableid: this.getTableInfo().tableid, uid: this.userId });
                    kaayou.emit('common', 'ui::Toast::Show', { msg: '正在返回大厅,请稍后...', time: 1, mask: true });
                    //延迟1秒返回大厅 避免socket断开链接频繁
                    setTimeout(() => {
                        this.CleanAndGotoLobby();
                    }, 1000);
                    return;
                }
                let getMsg = function () {
                    let msg = "";
                    if (self._isGameStart) {
                        msg = "确定要申请解散吗";
                    } else {
                        //lw181219亲友圈里不提示退还房卡
                        if (self.IsMaster() && self.tableInfo.hid <= 0) {
                            msg = "游戏未开始房卡将退还";
                        } else {
                            msg = "确定退出房间吗?"
                        }
                    }
                    return msg;
                }

                let options = {
                    title: "温馨提示",
                    msg: getMsg(),
                    close: {
                        isShow: false,
                    },
                    btns: [
                        {
                            name: "确定",
                            action: function () {
                                if (!self._isGameStart) {
                                    self.sendLeftGame();
                                } else {
                                    self.sendDissmiss();
                                }
                            },
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

            //离开游戏
            sendLeftGame() {
                kaayou.sendMessage(this.getModuleName(), 'tableexit', {});
            }

            sendDissmiss() {
                cc.log('发送申请解散');
                kaayou.sendMessage(this.getModuleName(), 'dissmissfriend', { userId: this.userId });
            }

            sendDissResult(data: { isAgree: boolean }) {
                kaayou.sendMessage(this.getModuleName(), 'dissmissresult', { id: this.userId, flag: data.isAgree });
            }

            //可少人开局
            sendFewerresult(data: { isAgree: boolean }) {
                cc.log('发送申请解散');
                kaayou.sendMessage(this.getModuleName(), 'fewerresult', { flag: data.isAgree });
            }

            //发送自己的gvoice memberid
            sendGVoiceMemberID(data: { memberid: number }) {
                cc.log('GVoice 发送自己的 memberid:', data.memberid);
                kaayou.sendMessage(this.getModuleName(), 'gvoicemember', { uid: this.userId, id: data.memberid });
            }

            //===================通用收到服务器的消息=========================
            onNextGame(data: { id: number }) {
                console.log('RES_下一局', data);
                if (this._wait) {
                    return false;
                }
                if (!this._players || !data.id || !this._players[data.id]) {
                    return;
                }
                this._players[data.id].isReady = true;
                if (data.id == this.userId) {
                    kaayou.emit(this.getModuleName(), 'onIready');
                }
                kaayou.emit(this.getModuleName(), 'UpdatePlayer', { Players: this.toArrayPlayer() });
                return true;
            }

            //游戏没开始,退出
            onTableExit(data: { uid: number }) {
                if (this._wait) {
                    return false;
                }
                if (!this._players[data.uid]) {
                    return true;
                }
                delete this._players[data.uid];
                console.log(this._players);
                let self = this;
                if (data.uid == this.userId) {
                    // lw181213亲友圈一律显示退出
                    if (this.tableInfo.hid > 0) {
                        kaayou.emit('common', 'ui::Toast::Show', { msg: '退出成功', time: 1, mask: false });
                    } else {
                        // if (data.uid == this.tableInfo.creator) {
                        //     kaayou.emit('common', 'ui::Toast::Show', { msg: '解散成功', time: 1, mask: false });
                        // } else {
                        //     kaayou.emit('common', 'ui::Toast::Show', { msg: '退出成功', time: 1, mask: false });
                        // }
                    }
                    // setTimeout(function () {
                    //     kaayou.PlatformMgr.getInstance().im.StopPlayAudio();
                    //     kaayou.UIManager.getInstance().runScene('lobby');
                    // }, 1);
                    self.CleanAndGotoLobby();
                } else {
                    let players = this.toArrayPlayer();
                    kaayou.emit(this.getModuleName(), 'UpdatePlayer', { Players: players });
                }
                return true;
            }

            //游戏没开始,房主解散(或者圈主解散)
            onForcetabledel(data) {
                if (this._wait) {
                    return false;
                }
                let self = this;
                let options = {
                    title: "温馨提示",
                    msg: data.msg,
                    close: {
                        isShow: false,
                        action: null,
                    },
                    btns: [
                        {
                            name: "确定",
                            action: function () {
                                // kaayou.PlatformMgr.getInstance().im.StopPlayAudio();
                                // kaayou.UIManager.getInstance().runScene('lobby');
                                self.CleanAndGotoLobby();
                            },
                            colorType: 'green'
                        },
                    ]
                }

                if (this._isGameStart) {
                    kaayou.emit('common', 'ui::Dialog::Show', options);
                    return true;
                }

                // if(this.tableInfo.hid > 0){
                //1为非房主解散
                if (data.type != 1) {
                    kaayou.emit('common', 'ui::Dialog::Show', options);
                } else {
                    if (this.userId != this.tableInfo.creator) {
                        //lw181207产品要求改为弱提示
                        kaayou.emit('common', 'ui::Toast::Show', { msg: '房间已被解散', time: 1, mask: false });
                    } else {
                        kaayou.emit('common', 'ui::Toast::Show', { msg: '解散成功', time: 1, mask: false });
                    }
                    // setTimeout(function () {
                    //     kaayou.PlatformMgr.getInstance().im.StopPlayAudio();
                    //     kaayou.UIManager.getInstance().runScene('lobby');
                    // }, 1);
                    self.CleanAndGotoLobby();
                }
                return true;
            }

            /**
             * 
             * @param dis id:操作人的id   flag:  1:同意解散  0:不同意解散
             */
            onGuestDismissFriendState(dis: { id: number, flag: number }) {
                if (this._wait) {
                    return false;
                }
                if (!this._players[dis.id]) { return true };

                if (dis.flag == 1) {
                    this._players[dis.id].dismissState = DismissRoomState.AGREE;
                    // kaayou.emit(this.getModuleName(), "ui::DissmissRoom::Show", {
                    kaayou.emit(this.getModuleName(), "ui::MjTable::showDissmissRoom", {//新解散
                        Players: this.toOriginalArrayPlayer(), myServerchair: this.myServerchair, isCan: this.getSelfPlayer().dismissState == DismissRoomState.WATING, leftTime: null
                    });
                } else if (dis.flag == 0) {
                    this._players[dis.id].dismissState = DismissRoomState.DISAGREE;
                    let playerinfo: IFriendGame_User_Info = this.getPlayerByUid(dis.id);
                    kaayou.emit(this.getModuleName(), 'ui::DissmissRoom::Hide');
                    for (var x in this._players) {
                        this._players[x].dismissState = DismissRoomState.WATING;
                    }
                    if (this.getIndexByChairID(dis.id) != 0 && dis.id != this.userId) {
                        let tempNickName = kaayou.Identify.nickNameSubFive(playerinfo.name);
                        let options = {
                            title: "温馨提示",
                            msg: "玩家" + tempNickName + "不同意解散对局",
                            close: {
                                isShow: false,
                                action: null,
                            },
                            btns: [
                                {
                                    name: "确定",
                                    colorType: 'green'
                                },
                            ]
                        }
                        kaayou.emit('common', 'ui::Dialog::Show', options);
                        return true;
                    }
                } else {
                    for (var x in this._players) {
                        this._players[x].dismissState = DismissRoomState.WATING;
                    }
                }
                return true;
            }

            //断线重连服务器推送过来的解散房间的信息（如果有）
            onDissmissRoom(data: { situation: Array<number>, timer: number }) {
                if (this._wait) {
                    return false;
                }
                if (data.timer <= 0) {
                    for (var x in this._players) {
                        this._players[x].dismissState = DismissRoomState.WATING;
                    }
                    kaayou.emit(this.getModuleName(), 'ui::DissmissRoom::Hide')
                    return true;
                }
                for (let i = 0; i < this._maxPlayer; i++) {
                    let player = this.getPlayerByChairID(i);
                    if (!player) continue;
                    player.dismissState = data.situation[i];
                }
                // kaayou.emit(this.getModuleName(), 'ui::DissmissRoom::Show', {
                kaayou.emit(this.getModuleName(), 'ui::MjTable::showDissmissRoom', {
                    Players: this.toOriginalArrayPlayer(), myServerchair: this.myServerchair, leftTime: data.timer,
                    isCan: this.getSelfPlayer().dismissState == DismissRoomState.WATING
                });
                return true;
            }

            /**
             * @param data id:申请解散的玩家uid  timer:离线申请的剩余时间
             */
            onDissmissRep(data: { id: number, timer: number }) {
                if (this._wait) {
                    return false;
                }

                if (!this._players[data.id]) {
                    return true;
                }
                this._players[data.id].dismissState = DismissRoomState.DISMISS_CREATOR;
                kaayou.emit(this.getModuleName(), 'ui::MjTable::showDissmissRoom', {
                    Players: this.toOriginalArrayPlayer(), myServerchair: this.myServerchair, leftTime: data.timer,
                    isCan: this.getSelfPlayer().dismissState == DismissRoomState.WATING
                });
                return true;
            }

            //玩家竞技点状态变换status-- 1防沉迷玩家  0正常
            onUpdatePlayerFcmPause(data: { status: any, content: string }) {
                if (this._wait) {
                    return false;
                }
                var self = this;
                lodash.forEach(data.status, function (v, i) {
                    self._players[i].fcm_status = v;
                })
                this.gameState = GAME_STATE.GAMEPAUSE;
                let players = this.toArrayPlayer();
                kaayou.emit(this.getModuleName(), "UpdatePlayer", { Players: players });
                kaayou.emit(this.getModuleName(), "ui::FCM::FcmStatus", { isShow: true, content: data.content })
                return true;
            }

            //玩家竞技点状态变换status-- 1防沉迷玩家  0正常
            onUpdatePlayerFcmContinue() {
                if (this._wait) {
                    return false;
                }
                this.gameState = GAME_STATE.GAMEING;
                let players = this.toArrayPlayer();
                players.forEach(v => {
                    if (!!v) {
                        v.fcm_status = 0;
                    }
                });
                kaayou.emit(this.getModuleName(), "UpdatePlayer", { Players: players });
                kaayou.emit(this.getModuleName(), "ui::FCM::FcmStatus", { isShow: false, content: "" })
                return true;
            }

            //玩家竞技点状态
            onUpdatePlayerVitamin(data: { uid: number, seat: number, vitamin: number }) {
                if (this._wait) {
                    return false;
                }
                this._players[data.uid].vitamin = data.vitamin;
                let players = this.toArrayPlayer();
                kaayou.emit(this.getModuleName(), "UpdatePlayer", { Players: players });
                return true;
            }


            //更新玩家状态消息
            onUpdateuserStatus(status: __Game_User_Status__) {
                if (this._wait) {
                    return false;
                }
                let uid = status.userid;
                if (!this._players[uid]) { return true; }
                this._players[uid].userStatus = status.userstatus;
                if (status.userstatus == GR_US_Status.US_READY) {
                    this._players[uid].isReady = true;
                    // kaayou.emit(this.getModuleName(), 'playReadyMusic', { player: this._players[uid] });
                } else if (status.userstatus == common.mod.GR_US_Status.US_SIT) {
                    this._players[uid].isReady = false;
                }
                if (uid == this.userId) {
                    if (status.userstatus <= 1) {
                        delete this._players[uid];
                        return true;
                    } else {
                        if (status.userstatus == GR_US_Status.US_SIT) {
                            // this.sendReady();
                        } else if (status.userstatus == GR_US_Status.US_READY || status.userstatus == common.mod.GR_US_Status.US_PLAY) {
                            kaayou.emit(this.getModuleName(), 'onIready');
                        }
                    }
                } else {
                    if (status.userstatus <= 1) {
                        delete this._players[uid];
                    } else {

                    }
                }
                let players = this.toArrayPlayer();
                kaayou.emit(this.getModuleName(), "UpdatePlayer", { Players: players });
                return true;
            }

            onUserExtInfo(data) {
                if (this._wait) {
                    return false;
                }
                let player = this.getPlayerByChairID(data.chairid);
                if (player) {
                    player.score = data.scoreinfo.score;
                    player.vitamin = data.scoreinfo.vitamin;
                }
                if (this._isGuestState) {
                    kaayou.emit(this.getModuleName(), "UpdatePlayer", { Players: this.toArrayPlayer() });
                }
                return true;
            }

            //发送魔法表情信息
            sendUseMagic(data: { toIndex: number, toolId: number }) {
                cc.log("发送魔法表情", data);
                let type = 4;
                //好友房没有十连发
                // if(cc.sys.localStorage.getItem('CheckBox_shilianfa') === 'true'){
                //     type = 5;
                // }
                if (!this.getPlayerByClientID(data.toIndex)) { return; }

                let toUserId = this.getPlayerByClientID(data.toIndex).uid;
                this.sendChat({ type: type, index: data.toolId, targetuserid: toUserId });
            }

            //游客发送获取观战列表
            sendGetGuestList() {
                kaayou.sendMessage(this.getModuleName(), "tablewatcherlist", {});
            }

            //游客切换视角
            sendGuestSwitch(seat: number) {
                if (!this.getIsGuest()) {
                    console.error("您不是游客");
                    return;
                }
                if (!this.tableInfo) {
                    return;
                }
                kaayou.sendMessage(this.getModuleName(), "tablewatcherswitch", {
                    tableid: this.tableInfo.tableid,
                    uid: this.userId,
                    seat: seat
                });
            }

        }

    }

}