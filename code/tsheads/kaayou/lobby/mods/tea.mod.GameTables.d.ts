declare namespace tea {
    interface IBASE_MESSAGE {
        errcode?: number;
        msg?: string;
    }
    interface ITH_DATA_USER_INFO {
        "uid": number;
        "uname": string;
        "urole": number;
        "gender": number;
        "is_online": boolean;
        "apply_type": number;
        "apply_time": number;
        "agree_time": number;
        "uurl": string;
        "is_limit_game": boolean;
        "partner": number;
        lastInvite?: number;
        inTable: boolean;
    }
    interface ITH_DATA_INGAME_SUBFLOORS extends IBASE_MESSAGE {
        hid: number;
        fid: number;
        is_mix: boolean;
        mix_type: number;
        isanonymous: boolean;
        is_partner_apply: boolean;
        table_info?: Data_HosueFloorBaseInfo[];
        online_users?: ITH_DATA_USER_INFO[];
        apply_users?: ITH_DATA_USER_INFO[];
        user_info?: ITH_DATA_USER_INFO;
    }
    type ITH_DATA_INGAME_FloorHashMap = {
        [fid: string]: Data_HosueFloorBaseInfo;
    };
    interface ITH_DATA_INGAME_HouseInfo {
        hid: number;
        fid: number;
        is_mix: boolean;
        mix_type: number;
        isanonymous: boolean;
        is_partner_apply: boolean;
        floors_map?: ITH_DATA_INGAME_FloorHashMap;
        ftableitems?: Array<Data_HosueFtableItems>;
        online_users?: ITH_DATA_USER_INFO[];
        apply_users?: ITH_DATA_USER_INFO[];
        user_info?: ITH_DATA_USER_INFO;
    }
    namespace mod {
        class Gametables {
            static __INS__: Gametables;
            static getInstance(): Gametables;
            initMod(): void;
            TableDismiss(data: {
                fid: number;
                tid: number;
            }): Promise<void>;
            continuetable(data: {
                key: string;
            }): Promise<void>;
            getToken(): any;
            getUid(): any;
            isMyTable(tmemitems: Array<ITeaTableUserIn>): boolean;
            InviteAllUser(data: {
                netname: string;
                modulename: string;
                packagekey: string;
                gameState: number;
            }): Promise<unknown>;
            InviteUser(data: {
                uid: number;
            }): Promise<unknown>;
            changeJointable(data: {
                fid: number;
                ntid: number;
                package_key: string;
            }): Promise<unknown>;
            __userInvite: {
                [key: string]: number;
            };
            __curNetName: string;
            __curModuleName: string;
            __packageKey: string;
            __gameState: number;
            __curHid: number;
            __curHouseInfo: ITH_DATA_INGAME_HouseInfo;
            subscriptionFloor(data: {
                netname: string;
                modulename: string;
                packagekey: string;
                gameState: number;
            }): Promise<void>;
            unsubscriptionFloor(data: {
                netname: string;
                modulename: string;
            }): void;
            _offSubscriptionEvent(): void;
            clearEnvs(): void;
            bindSubscriptionEvent(): void;
            onHouseTableChange_ntf(e: kaayou.Event): void;
            onHouseTableCountChange_ntf(e: kaayou.Event): void;
            getFloortableinfo(): Promise<void>;
            sorttables(houseInfo: ITH_DATA_INGAME_HouseInfo): Array<Data_HosueFtableItems>;
            checkuserInvite(uid?: number): void;
            onHouseTableBegin_ntf(e: kaayou.Event): void;
            onHouseTableDissovle_ntf(e: kaayou.Event): void;
            onFloorMemberOnline_ntf(e: kaayou.Event): void;
            onFloorMemberOffline_ntf(e: kaayou.Event): void;
            onFloorMemberEnterTable_ntf(e: kaayou.Event): void;
            onFloorMemberLeaveTable_ntf(e: kaayou.Event): void;
            onTeaHouseApplyAgree_ntf(e: kaayou.Event): void;
            onTeaHouseApplyJoin_ntf(e: kaayou.Event): void;
            onTeaHouseApplyRefused_ntf(e: kaayou.Event): void;
            ApplyReject(data: {
                uid: number;
                apply_type: number;
            }): Promise<void>;
            ApplyAgree(data: {
                uid: number;
                apply_type: number;
            }): Promise<void>;
        }
    }
}
