/// <reference path="protos/teaHouse.protos/house.proto.d.ts" />
declare namespace tea {
    export interface Data_HouseItem {
        hid: number;
        hname: string;
        ownername: string;
        ownerurl: string;
        hcreate?: boolean;
        hjoin?: boolean;
        hmems: number;
        id: number;
        ishidhide: boolean;
        jointime: number;
        ownergender: number;
        ownerid: number;
        role: number;
        onlinecur: number;
        onlinetable: number;
        hfloorgameurl: Array<string>;
        hfloorids: Array<number>;
    }
    export interface Data_HouseItem_cell extends Data_HouseItem {
        iscur: boolean;
        ismine: boolean;
    }
    export enum HouseRoleTable {
        NULL = 0,
        VIEW_MEMBER = 1,
        VIEW_MANAGER = 2,
        VIEW_RECORD = 4,
        VIEW_MEMBER_APPLY = 8,
        EDIT_HOUSE_EXIT = 16,
        VIEW_HOUSE_SET = 32,
        VIEW_STAT_MEMBER = 64,
        VIEW_STAT_RECORD_MINE = 128,
        VIEW_STAT_RECORD_TEA = 256,
        VIEW_STAT_RECORD_TEA_WIN = 512,
        VIEW_STAT_RECORD_TEA_PLAY = 1024,
        VIEW_STAT_RECORD_TEA_CARD = 2048,
        VIEW_FLOOR_RULE = 4096,
        EDIT_FLOOR_RULE = 8192,
        EDIT_HOUSE_SET = 16384,
        VIEW_MEMBER_REMARk = 32768,
        EDIT_MEMBER_REMARk = 65536,
        EDIT_HOUSE_DELETE = 131072,
        EDIT_MEMBER_REMOVE = 262144,
        EDIT_MEMBER_SETMANAGER = 524288,
        EDIT_HOUSE_FREEZE = 1048576,
        VIEW_HOUSE_TABLE = 2097152,
        JOIN_HOUSE_TABLE = 4194304,
        DISMISS_TEA_TABLE = 8388608,
        VIEW_STAT_RECORD_MEMBER = 16777216
    }
    export enum HouseMemberRole {
        Rejected = -1,
        OWNER = 0,
        ADMIN = 1,
        MEMBER = 2,
        APLLY = 3,
        BLACK = 4,
        CAPTAIN = 5,
        MERGE = 6,
        CPADMIN = 7,
        VICECAPTAIN = 8
    }
    enum PERMISSION_TYPE {
        NONE = 0,
        DEFAULT = 1,
        UNESCALATION = 2,
        ESCALATION = 3,
        DISABLE = 4
    }
    export interface Data_HouseInfo {
        uright: string;
        admin_game_on: boolean;
        apply_switch: boolean;
        area: string;
        card_pool: boolean;
        disablejuniorv: boolean;
        fgameHeadImg: string;
        fid: number;
        fkind: number;
        fname: string;
        frule: any;
        game_on: boolean;
        /**@description 亲友圈编号*/
        hid: number;
        hischecked: boolean;
        hisfrozen: boolean;
        hismemexit: boolean;
        hmaxtable: number;
        hname: string;
        isactivity: boolean;
        isdeductconfig: boolean;
        iseffectconfig: boolean;
        isgamepause: boolean;
        isheadhide: boolean;
        ishidhide: boolean;
        ismembersend: boolean;
        isonlinehide: boolean;
        ispartner: boolean;
        ispartnerhide: boolean;
        ispartnermodi: boolean;
        isvitamin: boolean;
        isvitaminhide: boolean;
        isvitaminmodi: boolean;
        luck_times: number;
        record_time_interval: number;
        reward_balanced: boolean;
        packageName: string;
        private_gps: boolean;
        uid: number;
        urole: number;
        vitamin: number;
        vitamin_admin: boolean;
        vice_partner: boolean;
        is_limit_game: boolean;
        hismemhide: boolean;
        is_cur_user_team_off_work: boolean;
        isHaveFloor: boolean;
        hnotify: string;
        createOrChange: boolean;
        hfloorids: Array<number>;
        floorsMap: FloorHashMap;
        fgameStatus: number;
        changFid: number;
        teahouserule: number;
        onlinecur: number;
        vitamin_pool: number;
        only_quick: boolean;
        ipa: boolean;
        urefhid: 0;
        house_table_join_type: number;
        mix_active: boolean;
        isCurFloorMix: boolean;
        dialogactive: boolean;
        dialog: string;
        auto_pay_partner: boolean;
        tblshowcount: number;
        isaisuper: boolean;
        empty_table_back: boolean;
        empty_table_max: number;
        create_table_type: number;
        partnerkick: boolean;
        table_sort_type: number;
        superiorid: number;
        floors_color: Array<string>;
        __selectFloorTable: Array<number>;
        fangka_tips_min_num: number;
        hm_switch: {
            BanWeChat: number;
            CapSetDep: number;
            IsRecShowParent: number;
        };
        distance: number;
        new_table_sort_type: number;
        rank_open: boolean;
    }
    export interface HouseDaleFloorSetItem {
        bigscore: number;
        hid: number;
        fid: number;
        score: number;
    }
    export namespace mod {
        let __teaHouseRole: number;
        let __teaHouseInfo: Data_HouseInfo;
        let __needEnterFloor: boolean;
        let __houseRolePower: {
            [role: number]: roleAuthPowerList;
        };
        let __TeaBg: {
            teaBg: number;
        };
        function _isCPAdmin(): boolean;
        function _isInCurHouse(hid: number): boolean;
        function _isManager(): boolean;
        function _isMaster(): boolean;
        function _isPartner(): boolean;
        function _isViceCaptain(): boolean;
        function _updateHouseRole(): HouseRoleTable;
        class House {
            static __INS__: tea.mod.House;
            static getInstance(): tea.mod.House;
            initMod(): void;
            __teaList: Array<Data_HouseItem>;
            doGetFriendQList(): Promise<void>;
            doRefreshTeaHouseList(): void;
            doCreateTeaHouse(data: {
                hname: string;
                hnotify: string;
            }): Promise<void>;
            doJoinTeaHouse(data: {
                hid: number;
                invite_uid: number;
            }): Promise<void>;
            enterTeahouse(data: {
                hid: number;
                call?: Function;
            }): Promise<void>;
            doGetHouseBaseInfo(data: {
                hid: number;
                call?: Function;
            }): Promise<void>;
            private PERMISSION;
            promissionInstance(): any;
            freshenSomeLocalInfo(houseInfo: Data_HouseInfo): void;
            doUpdateTeaHouseRule(): void;
            doGetPartnerInviteCode(hid: number): Promise<void>;
            doQuitTeaHouse(): Promise<void>;
            doExitTeaHouse(data?: {
                hid: number;
            }): Promise<void>;
            doDismissTeaHouse(data?: {
                hid: number;
            }): Promise<void>;
            doDismissTeaHouseNtf(data: {
                hid: number;
            }): void;
            SetMemberHide(data: SetHouseOptionMemberHide): Promise<void>;
            SetHIDHide(data: SetHouseOptionMemberHide): Promise<void>;
            SetHeadImageHide(data: SetHouseOptionMemberHide): Promise<void>;
            SetTableHide(data: any): Promise<void>;
            SetAddressHide(data: any): Promise<void>;
            SetMatchSwitch(data: any): Promise<void>;
            doSetMemCheck(data?: {
                ischecked: boolean;
            }): Promise<void>;
            doSetPartnerMemCheck(data?: {
                ipa: boolean;
            }): Promise<void>;
            doSetRefuseMemberJoin(data?: {
                apply_switch: boolean;
            }): Promise<void>;
            doSetExitTeahouseCheck(data?: {
                ismemexit: boolean;
            }): Promise<void>;
            doSetOptionMemberHideNtf(data: SetHouseOptionMemberHide): void;
            doSetOptionHIDHideNtf(data: proto_houseoptionishidhide): void;
            doSetOptionHeadImageHideNtf(data: proto_houseoptionisheadhide): void;
            doSetOptionHideTableCountNtf(data: any): void;
            doSetMatchSwitchNtf(data: any): void;
            doSetOptionCheckNtf(data: SetHouseOptionCheck): void;
            doSetPartnerOptionCheckNtf(data: SetHouseOptionCheck): void;
            doSetOptionFrozen(data?: {
                hisfrozen: boolean;
            }): Promise<void>;
            doSetOptionFrozenNtf(data: SetHouseOptionFrozen): void;
            doModifyBaseNN(data: ModifyHouseBaseNN): Promise<void>;
            doModifyPopNotice(data: proto_housedialogedit): Promise<void>;
            doGetHousebasennmodify_ntf(data: {
                hid: number;
                hname: string;
                hnotify: string;
                hdialog: string;
                hdialogactive: boolean;
            }): Promise<void>;
            doGetHidOnline(): Promise<void>;
            doCheckHousepartner(): Promise<void>;
            getMixInfo(): Promise<void>;
            editMix(data: proto_housemixflooreditor): Promise<void>;
            setEffective(data: any): Promise<void>;
            setFzbFullTableCount(data: {
                count: number;
            }): Promise<void>;
            setRecordTimeInterval(data: any): Promise<void>;
            onHouseCardPoolChange(data: any): void;
            onHouseMixFloor(data: any): void;
            onHouseMixFloorEdit(data: proto_housemixflooreditor): void;
            onhouseidchange_ntf(data: any): void;
            doDaleHouseSettingList(): Promise<void>;
            doDaleHouseSetting(data: any): Promise<void>;
            doHouseTableJoinSet(data: {
                only_quick: boolean;
            }): Promise<void>;
            sendInviteSearch(data: proto_searchuser): Promise<void>;
            sendInvite(data: proto_searchuser): Promise<void>;
            answerInvite(data: proto_housejoininviteack): Promise<void>;
            onHouseJoinTableStyleSetChange(data: proto_housejointableset): void;
            partnerKickMem(data?: {
                partnerkick: boolean;
            }): Promise<void>;
            getDistance(): Promise<void>;
            setDistance(data: proto_housetabledistancelimitset): Promise<void>;
            houseTableBgSet(data: any): Promise<void>;
            houseLowCardSet(data: {
                num: number;
            }): Promise<void>;
            houseHmsetswitch(data: any): Promise<void>;
            cycdismisstip(data: any): Promise<void>;
            onReceiveInviteJoinTeahouse(data: proto_housejoininvitesend): void;
            houseoptionispartnerkick_ntf(data: proto_houseoptionpartnerkick): void;
            houseoptionismemberexitcheck_ntf(data: any): void;
            userHouseBank(data: any): void;
            onRecordTimeIntervalChange(data: any): void;
            onTeamMemberChange(data: any): void;
            onUpdateTableBg(data: proto_housefloorcolorset_ntf): void;
            onhmsetswitch_ntf(data: any): void;
            housetabledistancelimitsetntf(data: any): void;
            houseprivategpsset_ntf(data: any): void;
            TeaHouseRightUpdate(data: any): void;
            static PERMISSION_TYPE: typeof PERMISSION_TYPE;
            static getPromissionInstance(): any;
            static ParsePromissionString(str: any, out?: any): any;
            private PermissionsInstance;
        }
    }
    export {};
}
