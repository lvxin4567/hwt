namespace common {
    const { BindEvent, doBindEvent } = kaayou._decorator;

    export namespace mod {

        //场次信息
        export interface SiteInfo {
            siteid: number,
            sitetype: number,
            sit_mode: number, //坐桌模式 0 1
            tablenum: number,//桌数
            kindid: number,//游戏玩法
            gameconfig: IGameConfig;//游戏配置(创建房间特有的)
            person: {
                gold: number,
                imgurl: string,
                nickname: string,
                ntid: number,
                sex: number,
                uid: number
            }
        }

        export interface GoldTableInfo extends ITableInfo {
            tableid: number,//房号
        }

        export interface __GoldBaseMod__ {
            onPlayerCome(playerInfo: common.mod.IGame_User_Info);
        }

        export abstract class goldBaseMod<IPlayerT extends IGame_User_Info> extends gameBaseMod<IPlayerT, GoldTableInfo> {
            huanzhuo: boolean = false;
            siteInfo: SiteInfo = null;
            isOpenGps: boolean = true;

            private __isfake: boolean = false;

            initMod() {
                this.isFriendRoom = false;
                super.initMod();
            }

            protected bindModEvents() {
                let self = this;
                super.bindModEvents();

                kaayou.getController(this.getModuleName()).on('ws::onConnect', function (e: kaayou.Event) {
                    console.log(this.getModuleName() + "qs 链接成功")
                    self.onConnect();
                }, this);

                kaayou.getController(this.getModuleName()).on('ws::Msg::sitein', function (e: kaayou.Event) {
                    // self.onSiteIn(e.data);
                    self._eventQueue.push({ data: e.data, func: self.onSiteIn, target: self });
                }, this);

                kaayou.getController(this.getModuleName()).on('ws::Msg::siteinfo', function (e: kaayou.Event) {
                    // self.onSiteInfo(e.data);
                    self._eventQueue.push({ data: e.data, func: self.onSiteInfo, target: self });
                }, this);

                kaayou.getController(this.getModuleName()).on('mod::User::doSiteTableIn', function (e: kaayou.Event) {
                    // self.onDoSiteTableIn(e.data);
                    self._eventQueue.push({ data: e.data, func: self.onDoSiteTableIn, target: self });
                }, this);

                kaayou.getController(this.getModuleName()).on('ws::Msg::gameinfo', function (e: kaayou.Event) {
                    // self.onGameInfo(e.data);
                    self._eventQueue.push({ data: e.data, func: self.onGameInfo, target: self });
                }, this);

                kaayou.getController(this.getModuleName()).on('ws::Msg::tableinfo', function (e: kaayou.Event) {
                    // self.onTableInfo(e.data);
                    self._eventQueue.push({ data: e.data, func: self.onTableInfo, target: self });
                }, this);

                kaayou.getController(this.getModuleName()).on('ws::Msg::statusFree', function (e: kaayou.Event) {
                    // self.onGameFree(e.data);
                    self._eventQueue.push({ data: e.data, func: self.onGameFree, target: self });
                }, this);

                kaayou.getController(this.getModuleName()).on('ws::Msg::userStatus', function (e: kaayou.Event) {
                    // self.onUpdateuserStatus(e.data);
                    self._eventQueue.push({ data: e.data, func: self.onUpdateuserStatus, target: self });
                }, this);

                kaayou.getController(this.getModuleName()).on('ws::Msg::userscore', function (e: kaayou.Event) {
                    // self.onUpdateUserScore(e.data);
                    self._eventQueue.push({ data: e.data, func: self.onUpdateUserScore, target: self });
                }, this);

                kaayou.getController(this.getModuleName()).on('ws::Msg::tableexit', function (e: kaayou.Event) {
                    // self.onTableExit(e.data);
                    self._eventQueue.push({ data: e.data, func: self.onTableExit, target: self });
                }, this);

                kaayou.getController(this.getModuleName()).on('ws::Msg::changetablein', function (e: kaayou.Event) {
                    // self.onChangeTableIn(e.data);
                    self._eventQueue.push({ data: e.data, func: self.onChangeTableIn, target: self });
                }, this);

                kaayou.getController(this.getModuleName()).on('Exit', function (e: kaayou.Event) {
                    // self.doExit(e.data);
                    self._eventQueue.push({ data: e.data, func: self.doExit, target: self });
                }, this);

                kaayou.getController(this.getModuleName()).on('ws::Msg::gamemessage', function (e: kaayou.Event) {
                    // self.onGameMessage(e.data);
                    self._eventQueue.push({ data: e.data, func: self.onGameMessage, target: self });
                }, this);

                kaayou.getController(this.getModuleName()).on('ws::Msg::userareabroadcast', function (e: kaayou.Event) {
                    // self.onGameMessage(e.data);
                    // self._eventQueue.push({data:e.data,func:self.onPlaySendNotice,target:self});
                    mod.Notice.getInstance().onPlaySendNotice(e.data);
                }, this);

                kaayou.getController('common').on('ui::gameToLobby', (e: kaayou.Event) => {
                    this.sendLeftGame();
                }, this);

                kaayou.getController(this.getModuleName()).on('ws::Msg::faketablein', function (e: kaayou.Event) {
                    self._eventQueue.push({ data: e.data, func: self.onfaketablein, target: self });
                }, this);


                kaayou.getController(this.getModuleName()).on('ws::Msg::usergoldupdate', function (e: kaayou.Event) {
                    self._eventQueue.push({ data: e.data, func: self.onUpdateMyGold, target: self });
                }, this);
            }

            /**
             * 
             * @param bankrupt  玩家是否因为破产而进入假房间， 目前false代表 准备超时 进入假房间 true代表金币不足进入假房间, 此时需调用破产礼包接口
             */
            onfaketablein(data: { uid: number, bankrupt: boolean }) {
                if (this._wait) {
                    return false;
                }
                this.__isfake = true;

                //如果是因为破产
                if (data.bankrupt) {
                    //小结算延迟了2S  比小结算晚出来0.5S
                    setTimeout(() => {
                        kaayou.emit("common", "mod::GDGame::getallowanceinfo", {
                            ignore_gift: false, callBack: function (info) {
                                if (info && info.data && info.data.allowance) {    //  有这个时候弹破产补助
                                    kaayou.emit("lobby", "ui::DisposeAllowances::Show", info.data.allowance);
                                } else {
                                    //弹破产礼包
                                    // kaayou.emit("common", "ui::BankruptPanel::Show", info.data.gift);
                                    kaayou.emit("lobby", "mod::Mall::getBankRupt");
                                }
                            }
                        });
                    }, 2500);
                }
                //通知ui层
                kaayou.emit(this.getModuleName(), 'ui::Scene::canContinue', { bankrupt: data.bankrupt });
                return true;
            }

            /**
             * 
             * @param data 假房间时候更新金币   
             */
            onUpdateMyGold(data: { uid: number, gold: number, bankrupt: boolean, type: number, offset: number }) {
                if (this._wait) {
                    return false;
                }
                if (data.uid != this.userId) {
                    console.error("不是自己userId");
                    return;
                }
                if (data.type == 27) {
                    kaayou.emit("common", "ui::GetRewardSusPanel::Show", { name: data.offset + "个金币" });
                }
                this._players[data.uid].gold = data.gold;
                kaayou.emit(this.getModuleName(), 'UpdatePlayer', { Players: this.toArrayPlayer() });
                if (!this.__isfake) {
                    return true;
                }
                if (!data.bankrupt) {
                    kaayou.emit(this.getModuleName(), 'ui::Scene::canContinue', { bankrupt: data.bankrupt });
                }
                return true;
            }

            public setIsFake(flag: boolean) {
                this.__isfake = flag;
            }

            public getIsFake() {
                return this.__isfake;
            }

            abstract onPlayerCome(playerInfo: common.mod.IGame_User_Info);

            doPlayBGM() {
                console.log('doPlayBGM');
            }

            onConnect() {

                let gameconfig: IGameConfig = null;
                interface IGameConfig {
                    id: number,
                    gameid: number,
                    kindid: number,
                    ip: string,
                    package_key: string,
                    site_type: number,
                    tablenum: number
                }
                try {
                    gameconfig = JSON.parse(kaayou.DataSet.get("game::config") || ""); //  , JSON.stringify(tempRes));
                } catch (err) {

                }
                if (!gameconfig) {
                    kaayou.emit(this.getModuleName(), "ui::RunSceneError");
                    return;
                }

                if (this._eventQueue) {
                    this._eventQueue.start();
                }

                kaayou.sendMessage(this.getModuleName(), 'sitein', { sitetype: gameconfig.site_type, kindid: gameconfig.kindid, uid: this.userId, token: this.token, minfo: '{}' });
            }

            onSiteIn(info: any) {
                if (this._wait) {
                    return false;
                }
                console.log("收到sitein:", info);
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

            //场次信息消息
            onSiteInfo(data: common.mod.SiteInfo) {
                if (this._wait) {
                    return false;
                }
                cc.log('桌子信息', data);
                this.maxRound = data.gameconfig.roundnum;
                this._maxPlayer = data.gameconfig.playernum;
                this.siteInfo = data;
                this._isSceneIn = true;
                //断线重连时，会显示加载中，重连成功后隐藏加载中
                kaayou.emit("common", "ui::Loading::Hide");
                kaayou.emit(this.getModuleName(), "ui::RunScene");
                //清除界面
                kaayou.emit(this.getModuleName(), 'ui::cleanUp');

                //先关闭大厅的背景音乐
                kaayou.SoundManager.getInstance().stopMusic(true);

                //判断是否为坐桌模式
                if (this.siteInfo.sit_mode == 1) {
                    if (this.siteInfo.person) {
                        if (this.siteInfo.person.ntid == -1) {
                            kaayou.emit(this.getModuleName(), "ui::TabelList::Show", { title: this.getGameName() });
                            return true;
                        }
                    }
                }
                //坐下
                this.onSiteTableIn();
                return true;
            }

            onDoSiteTableIn(data: { tid: number, seat: number }) {
                if (this._wait) {
                    return false;
                }
                let tid = -1;
                if (data) {
                    if (data.tid > -1) {
                        tid = data.tid;
                    }
                }

                let seat = -1;
                if (data) {
                    if (data.seat > -1) {
                        seat = data.seat;
                    }
                }
                this._players = {};
                this.onSiteTableIn(tid, seat);
                return true;
            }

            async onSiteTableIn(tid = -1, seat = -1) {
                console.log("发送sitetablein: tid=" + tid + ",seat=" + seat);
                let info = await kaayou.sendMessage(this.getModuleName(), 'sitetablein', { id: tid, uid: this.userId, seat: seat }, "ws::Msg::sitetablein");
                console.log("收到sitetablein:", info);
                let self = this;
                if (info.errcode) {
                    let options = {
                        msg: info.msg,
                        btns: [
                            {
                                name: "确定",
                                action: function () {
                                    if (self.siteInfo && self.siteInfo.sit_mode == 1) {
                                        //-1:椅子上有人，118:房间已满
                                        if (info.errcode != -1 && info.errcode != 118) {
                                            self.CleanAndGotoLobby();
                                        }
                                    } else {
                                        self.CleanAndGotoLobby();
                                    }
                                },
                                colorType: 'green'
                            },
                        ]
                    }
                    kaayou.emit('common', 'ui::Dialog::Show', options);
                    return;
                }

                //坐下成功
                this.doPlayBGM();
                //
                kaayou.emit(this.getModuleName(), 'ui::cleanUp');
            }

            onGameInfo(data: { gamestatus: number, allowlookon: number, gameconfig: string, userready: Array<boolean>, userstatus: Array<common.mod.GR_US_Status> }) {
                cc.log('收到游戏信息', data);
                if (this._wait) {
                    return false;
                }
                this.setGameState(data.gamestatus);
                let curPlayerNum = 0;
                for (let i = 0; i < this._maxPlayer; i++) {
                    let player = this.getPlayerByChairID(i);
                    if (player) {
                        // player.isReady = data.userready[i];
                        player.userStatus = data.userstatus[i];
                        //游戏开始前断线重连过的玩家，服务器下发的isReady不正确，需要通过userStatus判断玩家是否准备
                        if (player.userStatus == common.mod.GR_US_Status.US_READY) {
                            player.isReady = true;
                        }
                    }
                }

                kaayou.emit(this.getModuleName(), 'UpdatePlayer', { Players: this.toArrayPlayer() });
                return true;
            }

            //桌子信息消息
            onTableInfo(data: GoldTableInfo) {
                cc.log('桌子信息', data);
                if (this._wait) {
                    return false;
                }
                this.__isfake = false;
                this.maxRound = data.gameconfig.roundnum;
                this._maxPlayer = data.gameconfig.playernum;
                this.tableInfo = data;
                //this.curRound = data.step;
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
                        this._players[data.person[i].uid] = lodash.extend({}, this._players[data.person[i].uid], data.person[i]);
                    }
                }

                kaayou.emit(this.getModuleName(), 'UpdatePlayer', { Players: this.toArrayPlayer() });
                kaayou.emit(this.getModuleName(), 'showTableInfo', { roomid: data.tableid, gameconfig: data.gameconfig });
                kaayou.emit(this.getModuleName(), 'ui::TabelList::Hide');
                return true;
            }

            onUpdateuserStatus(status: common.mod.__Game_User_Status__) {
                if (this._wait) {
                    return false;
                }
                cc.log('RES_玩家状态消息', status);
                let uid = status.userid;
                // this.tableId = status.tableid;
                if (!this._players[uid]) { return true; }
                this._players[uid].userStatus = status.userstatus;
                if (status.userstatus == GR_US_Status.US_READY) {
                    this._players[uid].isReady = true;
                } else if (status.userstatus == common.mod.GR_US_Status.US_SIT) {
                    this._players[uid].isReady = false;
                }
                if (uid == this.userId) {
                    if (status.userstatus <= 1) {
                        delete this._players[uid];
                        kaayou.emit(this.getModuleName(), "Exit", { exitType: 1 });
                        kaayou.emit(this.getModuleName(), 'ui::cleanUp');
                        return true;
                    } else {
                        if (status.userstatus == GR_US_Status.US_SIT) {
                            kaayou.emit(this.getModuleName(), 'ienterRoom');
                        } else if (status.userstatus == GR_US_Status.US_READY) {
                            //自己准备好了，清除游戏数据
                            this.resetData();
                            this.gameState = common.mod.GAME_STATE.NONE;
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
                cc.log('players:', players);
                kaayou.emit(this.getModuleName(), "UpdatePlayer", { Players: players });
                return true;
            }

            onUpdateUserScore(data: { score: Array<number> }) {
                console.log("收到玩家积分变化:", data);
                if (this._wait) {
                    return false;
                }
                for (let i = 0; i < this._maxPlayer; i++) {
                    let player = this.getPlayerByChairID(i);
                    if (player) {
                        player.gold = data.score[i];
                    }
                }
                kaayou.emit(this.getModuleName(), "UpdatePlayer", { Players: this.toArrayPlayer() });
                return true;
            }

            onChangeTableIn(info: any) {
                console.log("收到换桌:", info);
                if (this._wait) {
                    return false;
                }
                if (info.errcode) {
                    var self = this;
                    let options = {
                        msg: info.msg,
                        btns: [
                            {
                                name: "确定" || "换桌失败！",
                                action: function () {
                                    //errcode 118:房间已满 157:人数已满
                                    if (info.errcode == 157 || info.errcode == 118) {
                                        self.CleanAndGotoLobby();
                                    }
                                },
                                colorType: 'green'
                            },
                        ]
                    }
                    kaayou.emit('common', 'ui::Dialog::Show', options);
                    return true;
                }

                //清除玩家数据
                this._players = {};
                kaayou.emit(this.getModuleName(), 'ui::cleanUp');
                return true;
            }

            //游戏没开始,退出
            onTableExit(data: { uid: number }) {
                console.log('RES_玩家退出', data);
                if (this._wait) {
                    return false;
                }
                if (!this._players[data.uid]) { return true; };

                if (!this.__isfake) {
                    delete this._players[data.uid];
                    console.log(this._players);

                    if (data.uid == this.userId) {
                        kaayou.emit(this.getModuleName(), "Exit", { exitType: 1 });
                        kaayou.emit(this.getModuleName(), 'ui::cleanUp');
                    } else {
                        let players = this.toArrayPlayer();
                        kaayou.emit(this.getModuleName(), 'UpdatePlayer', { Players: players });
                    }
                } else {
                    //只显示自己头像
                    for (let x in this._players) {
                        if (Number(x) == this.userId) {
                            continue;
                        }
                        delete this._players[x];
                    }
                    kaayou.emit(this.getModuleName(), 'UpdatePlayer', { Players: this.toArrayPlayer() });
                }
                return true;
            }

            //如果游戏是空闲状态,就会收到这个消息
            onGameFree(freedata: any) {
                if (this._wait) {
                    return false;
                }
                console.log('空闲状态', freedata);
                this.gameState = common.mod.GAME_STATE.NONE;
                return true;
            }

            //退出游戏
            //exitType: 0退出到大厅; 1退出到坐桌列表(非坐桌模式时始终退出到大厅)
            doExit(data: { exitType?: number }) {
                if (this._wait) {
                    return false;
                }
                if (!this.__isfake) {
                    data = data || {};
                    data.exitType = data.exitType || 0;
                    if (data.exitType == 1 && this.siteInfo.sit_mode == 1) {
                        kaayou.emit(this.getModuleName(), "ui::TabelList::Show", { title: this.getGameName() });
                    } else {
                        this.CleanAndGotoLobby();
                    }
                } else {
                    this.sendLeftGame();
                }
                return true;
            }

            //通知消息
            onGameMessage(data: { type: number, content: string }) {
                console.log("收到通知消息:", data);
                if (this._wait) {
                    return false;
                }
                if (data.content && data.content.length > 0) {
                    let options = {
                        msg: data.content,
                        btns: [
                            {
                                name: "确定",
                                colorType: 'green'
                            },
                        ]
                    }
                    kaayou.emit('common', 'ui::Dialog::Show', options);
                }
                //type:消息类型，0x1000:退出游戏
                if (data.type & 0x1000) {
                    kaayou.emit(this.getModuleName(), "Exit", { exitType: 0 });
                    kaayou.emit(this.getModuleName(), 'ui::cleanUp');
                }
                return true;
            }

            CleanAndGotoLobby() {
                if (this._isSceneIn) {
                    kaayou.SoundManager.getInstance().stopMusic(true);
                }
                super.CleanAndGotoLobby();
            }

            //离开游戏
            gameOutConfirm() {
                console.log('点击退出');
                let self = this;
                if (this.gameState == GAME_STATE.ROAR || this.gameState == GAME_STATE.GAMEING) {
                    //游戏开始后，发送强退消息
                    let options = {
                        title: "温馨提示",
                        msg: `您真的要残忍的离开游戏吗？离开将扣除${self.tableInfo.gameconfig.fa}倍底分，是否真的退出？`,
                        close: {
                            isShow: false,
                        },
                        btns: [
                            {
                                name: "确定",
                                action: function () {
                                    if (self.gameState == GAME_STATE.ROAR || self.gameState == GAME_STATE.GAMEING) {
                                        self.sendDissmiss();
                                    } else {
                                        self.sendLeftGame();
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
                } else {
                    console.log('发送退出');
                    self.sendLeftGame();
                }
            }

            //离开游戏
            sendLeftGame() {
                console.log('发送退出');
                if (!this.__isfake) {
                    if (this._players && this._players[this.userId]) {
                        kaayou.sendMessage(this.getModuleName(), 'tableexit', {});
                    } else {
                        console.log('玩家不在桌子上，直接退出');
                        this.CleanAndGotoLobby();
                    }
                } else {
                    kaayou.sendMessage(this.getModuleName(), 'siteexit', {});
                    this.CleanAndGotoLobby();
                    kaayou.NetManager.getInstance().getSocket(this.getModuleName()).close({ Initiative: true });
                }
            }

            //解散游戏，在金币场里是强退
            sendDissmiss() {
                console.log('发送强退');
                if (this._players && this._players[this.userId]) {
                    kaayou.sendMessage(this.getModuleName(), 'forceexit', {});
                } else {
                    console.log('玩家不在桌子上，直接退出');
                    this.CleanAndGotoLobby();
                }
            }

            //发送换桌
            sendChangeTable() {
                cc.log('发送换桌');
                let auto_ready = false;
                if (this.__isfake) {
                    auto_ready = true;
                }
                kaayou.sendMessage(this.getModuleName(), 'changetablein', { id: -1, uid: this.userId, auto_ready: auto_ready });
            }

            //发送托管
            sendTrustee(isTrustee: boolean) {
                if (this.gameState != common.mod.GAME_STATE.NONE) {
                    cc.log('发送托管/取消托管');
                    kaayou.sendMessage(this.getModuleName(), 'gameTrustee', { id: this.userId, trustee: isTrustee });
                }
            }

            //发送魔法表情信息
            sendUseMagic(data: { toIndex: number, toolId: number }) {
                cc.log("发送魔法表情", data);
                let type = 4;
                if (cc.sys.localStorage.getItem('CheckBox_shilianfa') === 'true') {
                    type = 5;
                }
                if (!this.getPlayerByClientID(data.toIndex)) { return; }
                let toUserId = this.getPlayerByClientID(data.toIndex).uid;
                this.sendChat({ type: type, index: data.toolId, targetuserid: toUserId });
            }

            //发送聊天信息
            /**
             * 
             * @param data type:聊天类型(4、5为魔法表情)  index:具体是哪一句话或者哪个表情  targetuserid:如果有魔法表情
             */
            sendChat(data: { type?: number, index: number, targetuserid?: number, message?: string }) {
                cc.log('发送聊天', data);
                let msg: UserChat = {
                    color: data.type,
                    index: data.index,
                    userid: this.userId,
                    targetuserid: data.targetuserid,
                    message: data.message,
                }
                //假房间模拟服务端
                if (this.__isfake) {
                    // kaayou.sendMessage(this.getModuleName(), 'ws::Msg::userchat', msg);
                    kaayou.emit(this.getModuleName(), "ws::Msg::userchat", msg);
                } else {
                    kaayou.sendMessage(this.getModuleName(), 'userchat', msg);
                }

            }

            //获取分享配置（剩余分享次数）
            async sendGetShareConfig(cb: Function) {
                if (!this.userId || !this.tableInfo) { return }

                let temp = {
                    "head": "gameshareconfig",
                    "data": JSON.stringify({ uid: this.userId, kindid: this.tableInfo.kindid }),
                    "msgsign": {
                        "time": new Date().getTime(),
                        "encode": 0
                    }
                }

                if (!common.mod.Config) { return; }
                if (common.mod.Config.isLoginEncryp) {
                    temp.msgsign.encode = 1;
                    temp.data = kaayou.AES.encrypt(temp.data);
                }

                let res = await kaayou.Http.POST(common.mod.Config.GetAppConfig().hallUrl + "/service", { msgdata: JSON.stringify(temp) });
                console.log("获取分享配置结果：", res);
                try {
                    let msg: kaayou.Ka_MSG_RES = kaayou.Http.parseResult(res);
                    if (!!msg) {
                        cb && cb(msg);
                    }
                } catch (err) {
                    console.error("解析分享配置结果异常：", err);
                }
            }

            //领取分享奖励
            async sendGetShareReward() {
                if (!this.userId || !this.tableInfo) { return }

                let temp = {
                    "head": "gamesharesuc",
                    "data": JSON.stringify({ uid: this.userId, kindid: this.tableInfo.kindid }),
                    "msgsign": {
                        "time": new Date().getTime(),
                        "encode": 0
                    }
                }

                if (!common.mod.Config) { return; }
                if (common.mod.Config.isLoginEncryp) {
                    temp.msgsign.encode = 1;
                    temp.data = kaayou.AES.encrypt(temp.data);
                }

                let res = await kaayou.Http.POST(common.mod.Config.GetAppConfig().hallUrl + "/service", { msgdata: JSON.stringify(temp) });
                console.log("领取分享奖励结果：", res);
                try {
                    let msg: kaayou.Ka_MSG_RES = kaayou.Http.parseResult(res);
                    if (!!msg) {
                        this.onGetShareReward(msg);
                    }
                } catch (err) {
                    console.error("解析分享奖励结果异常：", err);
                }
            }

            onGetShareReward(msg) {
                if (msg.errcode) {
                    console.log("领取分享奖励失败：", msg);
                    return;
                }
                if (msg.data.rewardcount > 0) {
                    kaayou.emit("common", "ui::GetRewardSusPanel::Show", { name: msg.data.rewardcount + "个金币" });
                }
            }

            //获取游戏名字
            getGameName() {
                let GameType: Array<string> = ['新手房', '初级房', '高级房', '龙虎房'];
                if (this.siteInfo.sitetype <= 0 || this.siteInfo.sitetype > GameType.length) {
                    return this.gameName;
                } else {
                    return this.gameName + GameType[this.siteInfo.sitetype - 1];
                }
            }
        }


    }








}