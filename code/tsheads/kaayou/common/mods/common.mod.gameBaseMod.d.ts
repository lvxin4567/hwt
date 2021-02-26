declare namespace common {
    namespace mod {
        interface MAPinfo {
            longitude: string;
            latitude: string;
            country?: string;
            province?: string;
            city?: string;
            citycode?: string;
            district?: string;
            adcode?: string;
            address: string;
        }
        interface IGame_User_Info {
            uid: number;
            card: number;
            gold: number;
            name: string;
            imgurl: string;
            draw_count: number;
            flee_count: number;
            lost_count: number;
            win_count: number;
            total_count: number;
            score: number;
            sex: number;
            ip: string;
            line: boolean;
            seat: number;
            latitude: number;
            longitude: number;
            address: string;
            userStatus: GR_US_Status;
            isReady: boolean;
            fleeTime?: number;
            vitamin: number;
            fcm_status: number;
        }
        interface __Game_User_Status__ {
            userid: number;
            tableid: number;
            chairid: number;
            userstatus: GR_US_Status;
        }
        enum GR_US_Status {
            US_NULL = 0,
            US_FREE = 1,
            US_SIT = 2,
            US_READY = 3,
            US_LOOKON = 4,
            US_PLAY = 5,
            US_OFFLINE = 6,
            US_TICKOUT = 7
        }
        enum GAME_STATE {
            NONE = 0,
            ROAR = 1,
            GAMEING = 2,
            GAME_END = 3,
            GAME_OVER = 4,
            GAMEPAUSE = 5
        }
        interface UserChat {
            errcode?: number;
            msg?: string;
            color: number;
            index: number;
            userid: number;
            targetuserid: number;
            message?: string;
        }
        interface ITableInfo {
            person: Array<IGame_User_Info>;
            lookonperson: Array<Array<IGame_User_Info>>;
            kindid: number;
            gameconfig: IGameConfig;
        }
        interface IGameConfig {
            difen: number;
            fa: number;
            playernum: number;
            roundnum: number;
            no_yy?: string;
            no_hdbq?: string;
            no_qph?: string;
            scoreradix?: number;
            anti?: string;
            gvoice?: string;
        }
        abstract class gameBaseMod<IPlayerT extends IGame_User_Info, ITableInfoT extends ITableInfo> extends kaayou.mod.Base {
            protected _maxPlayer: number;
            gameName: string;
            _players: {
                [key: number]: IPlayerT;
            };
            userId: number;
            myServerchair: number;
            gameState: GAME_STATE;
            sendChatLastTime: number;
            _isGameStart: boolean;
            token: string;
            gameEnterConfig: {
                id: number;
                kindid: number;
                ip: string;
            };
            protected _gameInfo: {
                status: number;
            };
            maxRound: number;
            mapinfo: MAPinfo;
            tableInfo: ITableInfoT;
            isOpenGps: boolean;
            isFriendRoom: boolean;
            _isSceneIn: boolean;
            needOffset: boolean;
            _eventQueue: common.mod.EventQueue;
            protected _wait: boolean;
            abstract onConnect(): any;
            abstract gameOutConfirm(): any;
            initMod(): void;
            _isBindEvent: boolean;
            protected bindModEvents(): void;
            doConnect(): void;
            protected cleanMod(): void;
            resetData(): void;
            doLogin(): void;
            CleanAndGotoLobby(): void;
            isValidKindID(kindid: number): boolean;
            isValidAddr(longitude: number, latitude: number): boolean;
            playerExtends(player: IGame_User_Info): IGame_User_Info;
            protected toOriginalArrayPlayer(): Array<IPlayerT>;
            protected toArrayPlayer(): Array<IPlayerT>;
            /**
             * 把服务数组转成客户端数组
             */
            offsetPlayer(arr: Array<any>): any;
            changeArr(outArr: any): any;
            getCurPlayerNum(): number;
            /**
             *
             * @param chairID 服务器座位号
             * 返回值:客户端座位号
             */
            getIndexByChairID(chairID: number): number;
            /**
             *
             * @param chairID 服务器座位号
             * 返回值:玩家的uid
             */
            getUidByChairID(chairID: number): number;
            /**
             *
             * @param uid
             * 根据userID获取客户端座位号
             */
            getIndexByUid(uid: number): number;
            getPlayerByUid(uid: number): IPlayerT;
            getPlayerByChairID(chairID: number): IPlayerT;
            getPlayerByClientID(chairID: number): IPlayerT;
            getTableInfo(): ITableInfoT;
            getSelfPlayer(): IPlayerT;
            getMaxNum(): number;
            getGpsState(): boolean;
            setGameState(status: number): void;
            getGameState(): GAME_STATE;
            getPlayerInfo(): IPlayerT[];
            getReadyNum(): number;
            getConfigWx(): boolean;
            sendInvite(): void;
            /**
             *
             * @param data type:聊天类型(4、5为魔法表情)  index:具体是哪一句话或者哪个表情  targetuserid:如果有魔法表情
             */
            sendChat(data: {
                type?: number;
                index: number;
                targetuserid?: number;
                message?: string;
            }): void;
            sendMicChat(micUrl: string): void;
            sendUseMagic(data: {
                toIndex: number;
                toolId: number;
            }): void;
            sendReady(): void;
            onChat(chat: UserChat): void;
            onYYinfo(data: {
                userid: number;
                addr: string;
            }): void;
            fleeTime: number;
            hasExit: Array<boolean>;
            onoffline(offTime: {
                time: Array<number>;
                code: Array<GR_US_Status>;
            }): boolean;
            /**
             *
             * @param minName 离线时间最长的玩家名字
             */
            putFlee(minName: string): void;
            /**
             *
             * @param data index:如果在离线页面弹了，在没回来之前不会在弹该玩家离线
             */
            setHasExit(data: {
                index: number;
            }): void;
            onReLog(): void;
            setWait(v: boolean): void;
        }
    }
}
