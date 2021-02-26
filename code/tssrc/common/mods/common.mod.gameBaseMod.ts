namespace common {
    const { BindEvent, doBindEvent } = kaayou._decorator;
    export namespace mod {
        //百度地图的参数
        export interface MAPinfo {
            longitude: string,
            latitude: string,
            country?: string,//国家
            province?: string,//省
            city?: string,
            citycode?: string,//城市编码
            district?: string,//区
            adcode?: string//域码
            address: string,//地址
        }
        //通用玩家信息
        export interface IGame_User_Info {
            uid: number,
            card: number,
            gold: number,
            name: string,
            imgurl: string,
            draw_count: number, //平局
            flee_count: number, //逃跑
            lost_count: number, //输
            win_count: number, //赢
            total_count: number, //总局数
            score: number,
            sex: number,
            ip: string,
            line: boolean,
            seat: number,
            latitude: number,
            longitude: number,
            address: string,
            userStatus: GR_US_Status,
            // userScoreInfo: __Game_User_Score__,
            isReady: boolean,
            fleeTime?: number, // 离线时间
            vitamin: number,
            fcm_status: number
        }
        //通用玩家状态
        export interface __Game_User_Status__ {
            userid: number //数据库 ID
            tableid: number //桌子位置
            chairid: number //椅子位置
            userstatus: GR_US_Status //用户状态
        }
        export enum GR_US_Status {
            US_NULL = 0x00,//没有状态
            US_FREE = 0x01,//站立状态
            US_SIT = 0x02,//坐下状态
            US_READY = 0x03,//同意状态
            US_LOOKON = 0x04,//旁观状态
            US_PLAY = 0x05,//游戏状态
            US_OFFLINE = 0x06,//断线状态
            US_TICKOUT = 0x07// 踢出房间
        }

        export enum GAME_STATE {
            NONE,   //未开始
            ROAR,   //吼牌
            GAMEING, //游戏中，即吼牌结束
            GAME_END, //小结算
            GAME_OVER, //总结算
            GAMEPAUSE //游戏暂停
        }

        //魔法表情和聊天一起的结构    targetuserid为魔法表情砸向的人
        export interface UserChat {
            errcode?: number
            msg?: string
            color: number //信息类型
            index: number //具体哪一个
            userid: number //发送用户
            targetuserid: number //目标用户
            message?: string //聊天信息 打字的
        }

        export interface ITableInfo {
            person: Array<IGame_User_Info>,//玩家数组
            lookonperson: Array<Array<IGame_User_Info>>,//旁观数组
            kindid: number,//游戏玩法
            gameconfig: IGameConfig;//游戏配置(创建房间特有的)
        }

        export interface IGameConfig {
            difen: number,//底分
            fa: number,//逃跑惩罚倍数
            playernum: number,//玩家个数
            roundnum: number,//游戏局数
            no_yy?: string,//禁止语音
            no_hdbq?: string,//禁止互动表情
            no_qph?: string,//禁止俏皮话
            scoreradix?: number,//积分放大倍数
            anti?: string,//防记牌器
            gvoice?: string,//实时语音
        }

        export abstract class gameBaseMod<IPlayerT extends IGame_User_Info, ITableInfoT extends ITableInfo> extends kaayou.mod.Base {
            //protected _NetName = "";
            protected _maxPlayer = 0; //最大玩家数
            gameName: string = null; //游戏名称
            _players: { [key: number]: IPlayerT } = null;
            userId: number = 0;
            myServerchair: number = -1;
            gameState: GAME_STATE = 0;
            sendChatLastTime = 0;
            _isGameStart: boolean = false; //只要第一局开始了,就为true
            token: string = '';

            //在大厅存储的数据结构
            gameEnterConfig: {
                id: number,//桌号
                kindid: number//游戏
                ip: string,
            }
            protected _gameInfo: { status: number, } = null;
            maxRound: number = 0;
            mapinfo: MAPinfo = null;
            tableInfo: ITableInfoT = null;
            isOpenGps: boolean = true;
            isFriendRoom: boolean = false;
            _isSceneIn: boolean = false;
            needOffset: boolean = true;   //needOffset像打拱类固定座位号需要转一次座位    像扎金花,牛牛类型游戏不需要转
            _eventQueue: common.mod.EventQueue;
            protected _wait: boolean = false;//主要用于消息队列,如果wait为true,则这个消息的回调方法会一直执行

            abstract onConnect();
            abstract gameOutConfirm();

            initMod() {
                this._players = {};
                this._gameInfo = { status: 0 };
                this._eventQueue = new common.mod.EventQueue();
                this.bindModEvents();

                let self = this;
                kaayou.getController().on('MicOk', function (e: kaayou.Event) {
                    console.log("MicOk", e.data);
                    let url = e.data;
                    cc.log('micOk', url);
                    //向服务器发送url
                    self.sendMicChat(url);
                }, this);
                kaayou.getController().on('MicPlayStart', function (e: kaayou.Event) {
                    console.log("MicPlayStart", e.data);
                    //显示对话框
                    let uid = e.data;
                    let index = self.getIndexByUid(uid);
                    if (index < 0) { return; }
                    kaayou.emit(this.getModuleName(), 'ui::onMicChat', { index: index, start: true });
                }, this);
                kaayou.getController().on('MicPlayEnd', function (e: kaayou.Event) {
                    console.log("MicPlayEnd", e.data);
                    //显示对话框
                    let uid = e.data;
                    let index = self.getIndexByUid(uid);
                    if (index < 0) { return; }
                    kaayou.emit(this.getModuleName(), 'ui::onMicChat', { index: index, start: false });
                }, this);

                // kaayou.getController().on("ui::Battery::showBattery",function(e: kaayou.Event){
                //     console.log("---------------电池-------------");
                // },this)


            }


            _isBindEvent = false;
            protected bindModEvents() {
                let self = this;
                if (this._isBindEvent) { return console.error('多次绑定'); }
                if (this.getModuleName().length < 1) { return console.error('ModuleName is empty'); }
                this._isBindEvent = true;

                kaayou.getController(this.getModuleName()).on('mod::User::Login', function (e: kaayou.Event) {
                    self.doLogin();
                }, this);

                kaayou.getController(this.getModuleName()).on('mod::Data::Clear', (e: kaayou.Event) => {
                    ///clear
                    this.cleanMod();
                }, this);

                //为了避免名字冲突新抛出的一个消息
                kaayou.getController(this.getModuleName()).on('mod::User::LoginF', function (e: kaayou.Event) {
                    self.doLogin();
                }, this);

                kaayou.getController(this.getModuleName()).on('ws::Msg::OfflineTime', function (e: kaayou.Event) {
                    // self.onoffline(e.data);
                    self._eventQueue.push({ data: e.data, func: self.onoffline, target: self });
                }, this);

                kaayou.getController(this.getModuleName()).on('ws::Msg::userchat', function (e: kaayou.Event) {
                    self.onChat(e.data);
                }, this);

                kaayou.getController(this.getModuleName()).on('ws::Msg::yyinfo', function (e: kaayou.Event) {
                    self.onYYinfo(e.data);
                }, this);

                kaayou.getController(this.getModuleName()).on('ws::Msg::relogin', function (e: kaayou.Event) {
                    self.onReLog();
                }, this);
            }

            doConnect() {
                console.log('开始连接游戏服务', new Date().getTime());

                let ip = this.gameEnterConfig.ip.split(':')[0];
                let port = Number(this.gameEnterConfig.ip.split(':')[1])
                let gameconfig = { ip: ip, port: port };
                kaayou.NetManager.getInstance().getSocket(this.getModuleName()).doConnect(gameconfig);
            }

            //清理所有数据
            protected cleanMod() {
                console.log("清理游戏数据");
                this._maxPlayer = 0;
                this._players = {};
                this.userId = 0;
                this.token = "";
                this.gameEnterConfig = null;
                this.gameState = GAME_STATE.NONE;
                this._isSceneIn = false;
                this.myServerchair = -1;
                this._isGameStart = false;
                this._eventQueue.release();
            }

            //清理游戏数据
            resetData() {
                //解决麻将类游戏一人出牌 另一人有牌权 第一人home出去  第一人可以出牌bug
                if (this["_curPlayerIndex"] != undefined) {
                    this["_curPlayerIndex"] = -1;
                }
            }

            doLogin() {
                console.log("doLogin");
                try {
                    let { token, uid } = JSON.parse(kaayou.DataSet.get('user::token'));
                    let enterConfig = JSON.parse(kaayou.DataSet.get("game::config"));
                    let userinfo = JSON.parse(kaayou.DataSet.get("user::info"));
                    if (!token) {
                        console.error("token is undefine");
                        throw "token is undefine";
                    }
                    if (!userinfo) {
                        throw "userinfo is undefine";
                    }
                    if (!enterConfig) {
                        throw "enterConfig is undefine";
                    }

                    if (!enterConfig.ip || lodash.isEmpty(enterConfig.ip)) {
                        throw "ip is undefine";
                    }
                    let ip = enterConfig.ip.split(':')[0];
                    let port = Number(enterConfig.ip.split(':')[1]);

                    if (!ip || !port || lodash.isEmpty(ip) || !lodash.isNumber(port) || port < 1) {
                        throw "ip or port is error";
                    }

                    if (!this.isValidKindID(enterConfig.kindid)) {
                        throw `${this.getModuleName()} : this.isValidKindID(${enterConfig.kindid}) == false`;
                    }

                    this.token = token;
                    this.gameEnterConfig = enterConfig;
                    this.userId = uid;
                    kaayou.NetManager.getInstance().getSocket(this.getModuleName()).doConnect({ ip: ip, port: port });
                } catch (err) {
                    console.error(err);
                    kaayou.emit(this.getModuleName(), "ui::RunSceneError");
                }
            }

            CleanAndGotoLobby() {
                if (this._isSceneIn) {
                    kaayou.emit(this.getModuleName(), 'ui::InGameTeaHousePanel::Hide');
                    kaayou.emit(this.getModuleName(), 'ui::ExitGameScene');
                    kaayou.GameToLobby();
                } else {
                    kaayou.emit(this.getModuleName(), "ui::RunSceneError");
                }
                this.cleanMod();
            }

            //校验kindid，避免出现包名和kindid不匹配的情况
            isValidKindID(kindid: number): boolean {
                return true;
            }

            isValidAddr(longitude: number, latitude: number): boolean {
                if (longitude < -180 || latitude > -0.1 && longitude < 0.1 || latitude > 180) { return false };
                if (latitude < -90 || latitude > -0.1 && latitude < 0.1 || latitude > 90) { return false };
                //if (latitude > 39.9 && latitude < 39.95 && longitude > 116.35 && longitude < 116.45) { return false };//过滤北京东城区
                return true;
            }

            playerExtends(player: IGame_User_Info) {
                player = lodash.extend({
                    isReady: false,
                    seat: -1,
                    userStatus: GR_US_Status.US_NULL,
                    gold: 0,
                    name: '',
                    imgurl: '',
                    draw_count: 0,
                    flee_count: 0,
                    lost_count: 0,
                    win_count: 0,
                    total_count: 0,
                    fleeTime: 0,
                }, player);
                return player;
            }

            protected toOriginalArrayPlayer(): Array<IPlayerT> {
                let pArr = [];
                for (var i = 0; i < this._maxPlayer; i++) {
                    let player = null;
                    for (var x in this._players) {
                        if (i == this._players[x].seat) {
                            player = this._players[x];
                        }
                    }
                    pArr[i] = player;
                }
                // return this.changeArr(pArr);
                return pArr;
            }

            //游戏是逆时针
            protected toArrayPlayer(): Array<IPlayerT> {
                let selfChairID = -1;
                if (this._players[this.userId]) {
                    selfChairID = this._players[this.userId].seat;
                }
                if (selfChairID == -1) {
                    return [];
                }
                let pArr: Array<IPlayerT> = [];
                for (var i = 0; i < this._maxPlayer; i++) {
                    let player: IPlayerT = null;
                    for (var x in this._players) {
                        if (i == this._players[x].seat) {
                            player = this._players[x];
                        }
                    }
                    pArr[i] = player;
                    if (player && selfChairID == player.seat) {
                        this.myServerchair = i;
                    }
                }
                return this.offsetPlayer(pArr);
            }
            /**
             * 把服务数组转成客户端数组
             */
            //转成客户端位置
            offsetPlayer(arr: Array<any>) {
                var outArr = [];
                var count = this._maxPlayer;
                for (var i = 0; i < count; i++) {
                    outArr[(count + i - this.myServerchair) % count] = arr[i] ? arr[i] : null;
                }
                if (!this.needOffset) {
                    return outArr;
                }
                return this.changeArr(outArr);
            }

            changeArr(outArr) {
                if (outArr.length == 4) {
                    return outArr;
                } else if (outArr.length == 3) {
                    return [outArr[0], outArr[1], null, outArr[2]];
                } else if (outArr.length == 2) {
                    return [outArr[0], null, outArr[1], null];
                }
            }

            public getCurPlayerNum() {
                let players = this.toArrayPlayer();
                let curnum = 0;
                for (let i = 0; i < players.length; i++) {
                    if (players[i]) {
                        curnum++;
                    }
                }
                return curnum;
            }

            /**
             * 
             * @param chairID 服务器座位号
             * 返回值:客户端座位号
             */
            public getIndexByChairID(chairID: number) {
                let players = this.toArrayPlayer();
                for (var x in players) {
                    if (!players[x]) continue;
                    if (players[x].seat == chairID) {
                        if (this._maxPlayer == 3 && Number(x) == 2) {
                            return 3;
                        } else if (this._maxPlayer == 2 && Number(x) == 1) {
                            return 2;
                        } else {
                            return Number(x);
                        }
                    }
                }
                return -1;
            }

            /**
             * 
             * @param chairID 服务器座位号
             * 返回值:玩家的uid
             */
            public getUidByChairID(chairID: number) {
                let players = this.toArrayPlayer();
                for (var x in players) {
                    if (!players[x]) continue;
                    if (players[x].seat == chairID) {
                        return players[x].uid;
                    }
                }
                return -1;
            }

            /**
             * 
             * @param uid 
             * 根据userID获取客户端座位号
             */
            public getIndexByUid(uid: number) {
                let players = this.toArrayPlayer();
                for (var x in players) {
                    if (!players[x]) continue;
                    if (players[x].uid == uid) {
                        return Number(x);
                    }
                }
                return -1;
            }

            public getPlayerByUid(uid: number) {
                return this._players[uid] || null;
            }

            public getPlayerByChairID(chairID: number): IPlayerT {
                for (var x in this._players) {
                    if (this._players[x].seat == chairID) {
                        return this._players[x];
                    }
                }
                return null;
            }

            public getPlayerByClientID(chairID: number) {
                let player = this.toArrayPlayer();
                return player[chairID];
            }

            getTableInfo(): ITableInfoT {
                return this.tableInfo;
            }

            getSelfPlayer(): IPlayerT {
                return this._players[this.userId];
            }

            getMaxNum() {
                return this._maxPlayer;
            }

            getGpsState() {
                return this.isOpenGps;
            }

            setGameState(status: number) {
                this.gameState = GAME_STATE.NONE;
                if (status == 101 || status == 102) {
                    this.gameState = GAME_STATE.GAMEING;
                }
            }
            getGameState() {
                return this.gameState;
            }

            getPlayerInfo() {
                return this.toArrayPlayer();
            }

            //获取准备玩家的个数
            getReadyNum() {
                let readyNum = 0;
                for (var x in this._players) {
                    if (!this._players[x]) continue;
                    if (this._players[x].isReady) {
                        readyNum++;
                    }
                }
                return readyNum;
            }

            //或者微信配置
            getConfigWx() {
                let configs = common.mod.Config.AppConfig;
                let feature: IFeature = lodash.extend({}, configs.feature);
                return feature.wx && cc.sys.isWeChat;
            }

            //=====================通用发给服务器的消息=========================
            //发送邀请消息
            sendInvite() {
                kaayou.sendMessage(this.getModuleName(), 'htinvite_send', {});
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
                kaayou.sendMessage(this.getModuleName(), 'userchat', msg);
            }


            //发送语音聊天
            sendMicChat(micUrl: string) {
                cc.log('发送语音聊天', micUrl);
                kaayou.sendMessage(this.getModuleName(), 'yyinfo', { userid: this.userId, addr: micUrl });
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

            //发送准备
            sendReady() {
                cc.log('发送准备');
                kaayou.sendMessage(this.getModuleName(), 'gameready', { uid: this.userId });
            }

            //===================通用收到服务器的消息=========================
            //玩家聊天消息
            onChat(chat: UserChat) {
                cc.log('RES_聊天信息', chat);

                if (chat.errcode) {
                    let options = {
                        msg: chat.msg,
                        btns: [
                            {
                                name: "确定",
                                colorType: 'green'
                            },
                        ]
                    }
                    kaayou.emit('common', 'ui::Dialog::Show', options);
                    return;
                }

                let provideIndex = this.getIndexByUid(chat.userid);
                let toIndex = this.getIndexByUid(chat.targetuserid);
                if (provideIndex == -1) {
                    return;
                }
                //一定是魔法表情
                if (toIndex >= 0) {
                    cc.log("发送魔法表情消息" + toIndex);
                    if (cc.sys.localStorage.getItem('isAuto_Anim') == 'false') {
                        //未勾选播放动画选项
                        return;
                    }
                    kaayou.emit(this.getModuleName(), 'ui::Table::broadcastUseMagic', { type: chat.color, dwindex: provideIndex, dwtoindex: toIndex, index: chat.index });
                } else {
                    kaayou.emit(this.getModuleName(), 'onChat', { dwindex: provideIndex, type: chat.color, index: chat.index, sex: this.getPlayerByUid(chat.userid).sex, message: chat.message });
                }
            }


            onYYinfo(data: { userid: number, addr: string }) {
                console.log('收到服务器玩家语音消息', JSON.stringify(data));
                if (!data.userid || !data.addr) {
                    return;
                }
                if (cc.sys.localStorage.getItem('isHide_Mic') == 'true') {
                    //勾选了屏蔽语音选项
                    return;
                }
                kaayou.PlatformMgr.getInstance().im.PlayMic(data.userid.toString(), data.addr.toString());
            }


            fleeTime = 0;
            hasExit: Array<boolean> = [false, false, false, false, false, false, false, false];//是否已经弹了离线提示,这个会在玩家上线的时候重置
            onoffline(offTime: { time: Array<number>, code: Array<GR_US_Status> }) {
                if (this._wait) { return false; }
                cc.log('RES_玩家离线', offTime);
                this.fleeTime = 0;

                for (var i = 0; i < this._maxPlayer; i++) {
                    let player = this.getPlayerByChairID(i);
                    if (!player) continue;
                    if (offTime.time[i] > 0) {
                        if (this.fleeTime == 0) {
                            this.fleeTime = offTime.time[i];
                        } else {
                            this.fleeTime = Math.min(this.fleeTime, offTime.time[i]);
                        }
                    }
                    if (offTime.code[i] != GR_US_Status.US_OFFLINE) {
                        this.hasExit[i] = false;
                    }
                    player.userStatus = offTime.code[i];
                    player.fleeTime = offTime.time[i] || 0;
                }
                let minName = ""
                let minIndex = offTime.time.indexOf(this.fleeTime);
                let player = this.getPlayerByChairID(minIndex);
                if (player) {
                    minName = player.name;
                }

                kaayou.emit(this.getModuleName(), 'UpdatePlayer', { Players: this.toArrayPlayer() });
                this.putFlee(minName);
                return true;
            }

            /**
             * 
             * @param minName 离线时间最长的玩家名字
             */
            putFlee(minName: string) {
                if (this._isGameStart) {
                    let fleePNams = [];
                    for (var x in this._players) {
                        if (this._players[x].userStatus == GR_US_Status.US_OFFLINE) {
                            // fleePNams.push(this._players[x].name);
                            let index = this._players[x].seat;
                            fleePNams.push({ name: this._players[x].name, index: index, hasExit: this.hasExit[index] });
                        }
                    }
                    if (fleePNams.length < 1) {
                        this.fleeTime = 0;
                    }
                    // this.playerFleeData = { names: fleePNams, time: this.fleeTime };
                    kaayou.emit(this.getModuleName(), 'ui::playerFleeLayer::setInfo', { fleeinfo: fleePNams, time: this.fleeTime, minName: minName });
                    kaayou.emit(this.getModuleName(), 'ui::DissmissRoom::updatePlayer', this.toOriginalArrayPlayer());

                } else {
                    kaayou.emit(this.getModuleName(), 'ui::FewerOpen::updatePlayer', this.toOriginalArrayPlayer());
                }
            }

            /**
             * 
             * @param data index:如果在离线页面弹了，在没回来之前不会在弹该玩家离线
             */
            // @BindEvent('game', 'baseMod::setHasExit')
            setHasExit(data: { index: number }) {
                this.hasExit[data.index] = true;
            }




            //主要得到玩家的分数信息   __Game_User_Score__
            // onUserExtInfo(data) {
            //     let player = this.getPlayerByChairID(data.chairid);
            //     player.userScoreInfo = data.scoreinfo;

            //     kaayou.emit(this.getModuleName(), "UpdatePlayer", { Players: this.toArrayPlayer() })
            // }

            //账号被挤的时候的消息
            onReLog() {
                kaayou.emit('common', 'ui::Dialog::Show', {
                    msg: "您的账号在别处登录!", btns: [{
                        name: "确定",
                        action: function () {
                            // kaayou.PlatformMgr.getInstance().im.StopPlayAudio();
                            // kaayou.UIManager.getInstance().runScene('lobby');
                            kaayou.emit("lobby", "mod::User::LogOut")
                        }
                    }]
                })
            }

            setWait(v: boolean) {
                this._wait = v;;
            }

        }
    }
}