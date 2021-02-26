declare namespace common {
    namespace mod {
        interface SiteInfo {
            siteid: number;
            sitetype: number;
            sit_mode: number;
            tablenum: number;
            kindid: number;
            gameconfig: IGameConfig;
            person: {
                gold: number;
                imgurl: string;
                nickname: string;
                ntid: number;
                sex: number;
                uid: number;
            };
        }
        interface GoldTableInfo extends ITableInfo {
            tableid: number;
        }
        interface __GoldBaseMod__ {
            onPlayerCome(playerInfo: common.mod.IGame_User_Info): any;
        }
        abstract class goldBaseMod<IPlayerT extends IGame_User_Info> extends gameBaseMod<IPlayerT, GoldTableInfo> {
            huanzhuo: boolean;
            siteInfo: SiteInfo;
            isOpenGps: boolean;
            private __isfake;
            initMod(): void;
            protected bindModEvents(): void;
            /**
             *
             * @param bankrupt  玩家是否因为破产而进入假房间， 目前false代表 准备超时 进入假房间 true代表金币不足进入假房间, 此时需调用破产礼包接口
             */
            onfaketablein(data: {
                uid: number;
                bankrupt: boolean;
            }): boolean;
            /**
             *
             * @param data 假房间时候更新金币
             */
            onUpdateMyGold(data: {
                uid: number;
                gold: number;
                bankrupt: boolean;
                type: number;
                offset: number;
            }): boolean;
            setIsFake(flag: boolean): void;
            getIsFake(): boolean;
            abstract onPlayerCome(playerInfo: common.mod.IGame_User_Info): any;
            doPlayBGM(): void;
            onConnect(): void;
            onSiteIn(info: any): boolean;
            onSiteInfo(data: common.mod.SiteInfo): boolean;
            onDoSiteTableIn(data: {
                tid: number;
                seat: number;
            }): boolean;
            onSiteTableIn(tid?: number, seat?: number): Promise<void>;
            onGameInfo(data: {
                gamestatus: number;
                allowlookon: number;
                gameconfig: string;
                userready: Array<boolean>;
                userstatus: Array<common.mod.GR_US_Status>;
            }): boolean;
            onTableInfo(data: GoldTableInfo): boolean;
            onUpdateuserStatus(status: common.mod.__Game_User_Status__): boolean;
            onUpdateUserScore(data: {
                score: Array<number>;
            }): boolean;
            onChangeTableIn(info: any): boolean;
            onTableExit(data: {
                uid: number;
            }): boolean;
            onGameFree(freedata: any): boolean;
            doExit(data: {
                exitType?: number;
            }): boolean;
            onGameMessage(data: {
                type: number;
                content: string;
            }): boolean;
            CleanAndGotoLobby(): void;
            gameOutConfirm(): void;
            sendLeftGame(): void;
            sendDissmiss(): void;
            sendChangeTable(): void;
            sendTrustee(isTrustee: boolean): void;
            sendUseMagic(data: {
                toIndex: number;
                toolId: number;
            }): void;
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
            sendGetShareConfig(cb: Function): Promise<void>;
            sendGetShareReward(): Promise<void>;
            onGetShareReward(msg: any): void;
            getGameName(): string;
        }
    }
}
