/// <reference path="common.mod.gameBaseMod.d.ts" />
declare namespace common {
    namespace mod {
        interface IFriendGame_User_Info extends IGame_User_Info {
            dismissState: DismissRoomState;
            fewerState?: FewerState;
            gvoicemenberid: number;
            gvoicesta: number;
        }
        enum DismissRoomState {
            AGREE = 1,
            DISAGREE = 2,
            DISMISS_CREATOR = 3,
            WATING = 4,
            DISSMISS_MAX = 5
        }
        enum FewerState {
            AGREE = 1,
            DISAGREE = 2,
            Fewer_CREATOR = 3,
            WATING = 4,
            Fewer_MAX = 5
        }
        interface friendGameConfig {
            kindid: number;
        }
        interface WatcherListItem {
            name: string;
            uid: number;
            imageurl: string;
            sex: number;
        }
        interface IFriendTableInfo extends ITableInfo {
            creator: number;
            step: number;
            tableid: number;
            ntid: number;
            nfid: number;
            hid: number;
            isvitamin: boolean;
            distancelimit: number;
        }
        abstract class friendBaseMod<IPlayerT extends IFriendGame_User_Info> extends gameBaseMod<IPlayerT, IFriendTableInfo> {
            curRound: number;
            scoreRadix: number;
            gameConfig: {
                id: number;
                kindid: number;
                ip: string;
            };
            private _isGuestState;
            abstract onPlayerCome(playerInfo: common.mod.IGame_User_Info): any;
            abstract onGetInviteData(): any;
            initMod(): void;
            getIsOpenGps(): boolean;
            setIsGuestState(v: boolean): void;
            getIsGuest(): boolean;
            protected bindModEvents(): void;
            onGameMessage(data: {
                type: number;
                content: string;
            }): boolean;
            onTablewatcherlist(data: {
                items: Array<WatcherListItem>;
            }): void;
            onGameStatus(status: {
                bGameStatus: number;
                bAllowLookon: number;
            }): boolean;
            doPlayBGM(): void;
            playerExtends(player: IGame_User_Info): IGame_User_Info;
            IsMaster(): boolean;
            toArrayPlayer(): Array<IPlayerT>;
            getSelfPlayer(): IPlayerT;
            setServerChair(chair: number): void;
            OnGVoiceMember(data: {
                user: Array<{
                    uid: number;
                    id: number;
                }>;
            }): void;
            OnGvoiceMemberVoice(data: {
                memberID: number;
                status: number;
            }): void;
            onGameFree(freedata: any): boolean;
            onConnect(): void;
            onTableInErr(info: any): boolean;
            srkjNum: number;
            onFewershow(data: any): boolean;
            onFewerhide(): boolean;
            onFewerclose(data: any): boolean;
            onFewerinfo(data: {
                situation: Array<number>;
            }): boolean;
            onFewerfriend(data: any): boolean;
            onFewerresult(dis: {
                id: number;
                flag: boolean;
            }): boolean;
            onGameInfo(data: {
                gamestatus: number;
                allowlookon: number;
                gameconfig: string;
                userready: Array<boolean>;
                userstatus: Array<GR_US_Status>;
            }): boolean;
            onTableInfo(data: IFriendTableInfo): boolean;
            gameOutConfirm(): void;
            sendLeftGame(): void;
            sendDissmiss(): void;
            sendDissResult(data: {
                isAgree: boolean;
            }): void;
            sendFewerresult(data: {
                isAgree: boolean;
            }): void;
            sendGVoiceMemberID(data: {
                memberid: number;
            }): void;
            onNextGame(data: {
                id: number;
            }): boolean;
            onTableExit(data: {
                uid: number;
            }): boolean;
            onForcetabledel(data: any): boolean;
            /**
             *
             * @param dis id:操作人的id   flag:  1:同意解散  0:不同意解散
             */
            onGuestDismissFriendState(dis: {
                id: number;
                flag: number;
            }): boolean;
            onDissmissRoom(data: {
                situation: Array<number>;
                timer: number;
            }): boolean;
            /**
             * @param data id:申请解散的玩家uid  timer:离线申请的剩余时间
             */
            onDissmissRep(data: {
                id: number;
                timer: number;
            }): boolean;
            onUpdatePlayerFcmPause(data: {
                status: any;
                content: string;
            }): boolean;
            onUpdatePlayerFcmContinue(): boolean;
            onUpdatePlayerVitamin(data: {
                uid: number;
                seat: number;
                vitamin: number;
            }): boolean;
            onUpdateuserStatus(status: __Game_User_Status__): boolean;
            onUserExtInfo(data: any): boolean;
            sendUseMagic(data: {
                toIndex: number;
                toolId: number;
            }): void;
            sendGetGuestList(): void;
            sendGuestSwitch(seat: number): void;
        }
    }
}
