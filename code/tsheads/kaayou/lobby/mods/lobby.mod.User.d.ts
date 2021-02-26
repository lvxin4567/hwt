/// <reference path="protos/user.proto.d.ts" />
declare namespace lobby {
    namespace mod {
        class User {
            static __INS__: lobby.mod.User;
            static getInstance(): lobby.mod.User;
            initMod(): void;
            doRegisterWX(): Promise<void>;
            onReLog(): void;
            setLocation(data: proto_areaenter): Promise<boolean>;
            doLogOut(): void;
            removeUserInfo(): void;
            onWxInstalled(): void;
            checkLoginErr(msg: any): boolean;
            private __doSetAfterLoginConfig;
            doGetTokenByGuset(): Promise<void>;
            doGetTokenByAccount(): Promise<void>;
            doRegisterByPhone(data: {
                mobile: string;
                code: string;
                password: string;
                nickname: string;
            }): Promise<void>;
            doCheckOldYK(data: {
                call: Function;
            }): Promise<void>;
            doResetpasswordByPhone(data: {
                mobile: string;
                code: string;
                password: string;
            }): Promise<void>;
            doGetTokenByPhone_V2(data: {
                mobile: string;
                password: string;
            }): Promise<void>;
            doGetTokenByPhone(data: {
                mobile: string;
                code: string;
            }): Promise<void>;
            verifyPhone(data: {
                mobile: string;
                code: string;
            }): Promise<void>;
            tempBindPhone: string;
            doGetTokenByWechat(data: {
                code: string;
            }): Promise<void>;
            doUpgradeWechat(): void;
            doUpgradePhone(data: {
                mobile: string;
                code: string;
                password: string;
            }): Promise<void>;
            doLogin(): void;
            private userinfo;
            getUserInfo(): Data_Uerinfo;
            onConnect(): void;
            updcard(data: any): void;
            updateDiamond(data: proto_upddiamond_ntf_res): void;
            updatedelivery_img(data: any): void;
            userBank(data: any): void;
            doEditBaseUserInfo(data: {
                nickname: string;
                sex: number;
                call: Function;
            }): Promise<void>;
            doEditdescribeinfo(data: {
                describe: string;
                call: Function;
            }): Promise<void>;
            doSetuserrefuseinvite(data: {
                refuse_invite: boolean;
            }): Promise<void>;
            doSetChangeSex(data: {
                sex: number;
            }): Promise<void>;
            getPhoneMsgCode(data: {
                mobile: string;
                type: number;
                call: Function;
            }): Promise<void>;
            onGetUpdateUserInfo(): void;
            onDoSaveinsuregold(data: {
                insuregold: number;
            }): Promise<void>;
            onUpdgold(data: proto_updgold_ntf_res): Promise<void>;
            onUpdgoldbean(data: proto_updgoldbean_ntf_res): Promise<void>;
            grantDibao(data: proto_disposeallowances_ntf_res): void;
            onDibaoShare(data: proto_getallowancesdouble): Promise<void>;
            getSignIn(): Promise<void>;
            signDay(data: proto_task_checkin_ntf_res): void;
            onSignDay(data: {
                checkin: boolean;
                name: string;
                img: string;
            }): Promise<void>;
            onReporting(reqData: any): Promise<void>;
            onRealName(data: proto_certification): Promise<void>;
            onBindPhone(data: {
                mobile: string;
                code: string;
            }): Promise<void>;
            unBindPhone(data: {
                mobile: string;
                code: string;
            }): Promise<void>;
            pullCustomSuggestionList(): Promise<void>;
            CustomSuggestionIsNew(): Promise<void>;
            pullCustomSuggestionCommit({ mobile, advise }: {
                mobile: any;
                advise: any;
            }): Promise<void>;
            pullCustomSuggestionFeedback(data: {
                callback?: any;
            }): Promise<void>;
            onCardRunOutNotPopToday(data: {
                hid: number;
            }): Promise<void>;
            AutoJoinRoom(): void;
            doJoinRoomWithMagicWindow(data: {
                cb: Function;
            }): void;
        }
    }
}
