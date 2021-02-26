declare namespace lobby {
    enum UserMessageHead {
        loginYK = "loginYK",
        loginToken = "loginToken",
        mobileRegister = "mobileRegister",
        loginWechat = "loginWechat",
        loginMobile = "loginMobile",
        loginMobile_v2 = "loginMobile_v2",
        resetPassword = "Resetpassword",
        bindmobile = "bindmobile",
        bindmobilev2 = "bindmobilev2",
        unbindmobile = "unbindmobile",
        bindwechat = "bindwechat",
        setuid = "setuid",
        updateuserinfo = "updateuserinfo",
        updatedescribeinfo = "updatedescribeinfo",
        saveinsuregold = "saveinsuregold",
        areaenter = "areaenter",
        getallowancesdouble = "getallowancesdouble",
        disposeallowances_ntf = "disposeallowances",
        updgold_ntf = "updgold",
        updgoldbean_ntf = "updgoldbean",
        checkin = "checkin",
        checkininfo = "checkininfo",
        task_checkin_ntf = "task_checkin",
        certification = "certification",
        upddiamond_ntf = "upddiamond",
        setuserrefuseinvite = "setuserrefuseinvite",
        usersetsex = "usersetsex"
    }
    interface IBASE_MESSAGE {
        errcode?: number;
        msg?: string;
    }
    interface proto_loginYK {
        code: string;
        platform: number;
        machinecode: string;
    }
    interface proto_usersetsex {
        sex: number;
    }
    interface proto_setuserrefuseinvite {
        refuse_invite: boolean;
    }
    interface proto_loginToken {
        uid: number;
        token: string;
        platform: number;
        machinecode: string;
    }
    interface proto_loginWechat {
        code: string;
        mobile: string;
        platform: number;
        appid?: string;
        machinecode: string;
    }
    interface proto_mobileRegister {
        mobile: string;
        code: string;
        password: string;
        nickname: string;
        platform: number;
        machinecode: string;
    }
    interface proto_resetPassword {
        mobile: string;
        code: string;
        password: string;
    }
    interface proto_loginMobile {
        mobile: string;
        code: string;
        platform: number;
        machinecode: string;
    }
    interface proto_loginMobile_v2 {
        mobile: string;
        password: string;
        platform: number;
        machinecode: string;
    }
    interface proto_setuid {
        token: string;
        minfo: string;
        engine: number;
        uid: number;
    }
    interface proto_setuid_res {
        bind_wechat: boolean;
        hot_version: string;
        realname: string;
        user_type: number;
        uid: number;
        name: string;
        ip: string;
        sex: number;
        imgurl: string;
        tel: string;
        isCertification: boolean;
        guestid?: string;
        token?: string;
        roomId?: number;
        games?: string;
        fid: number;
        hid: number;
        area?: string;
        card: number;
        gold: number;
        gold_bean: number;
        insure_gold: number;
        site_type: number;
        site_id: number;
        game_id: number;
        table_id: number;
        describe_info: string;
        delivery_img: string;
    }
    interface proto_areaenter {
        code: string;
    }
    interface proto_bindmobile {
        code: string;
        mobile: string;
    }
    interface proto_bindmobile_v2 {
        code: string;
        mobile: string;
        password: string;
    }
    interface proto_unbindmobile {
        code: string;
        mobile: string;
    }
    interface proto_bindmobile_v2_res {
        msg?: string;
        errcode: number;
        nickname: string;
        imgurl: string;
        sex: number;
    }
    interface proto_bindwechat {
        code: string;
    }
    interface proto_bindwechat_res {
        msg?: string;
        errcode: number;
        nickname: string;
        imgurl: string;
        sex: number;
    }
    interface proto_updateuserinfo {
        nickname: string;
        sex: number;
    }
    interface proto_updatedescribeinfo {
        describe: string;
    }
    interface proto_saveinsuregold {
        gold: number;
    }
    interface proto_saveinsuregold_res {
        gold: number;
        insure_gold: number;
        errcode: number;
        msg: string;
    }
    interface proto_disposeallowances_ntf_res {
        current: number;
        gold: number;
        remain: number;
        after_gold?: number;
    }
    interface proto_getallowancesdouble {
        current: number;
    }
    interface proto_updgold_ntf_res {
        gold: number;
        type: number;
        offset: number;
    }
    interface proto_upddiamond_ntf_res {
        diamond: number;
    }
    interface proto_updgoldbean_ntf_res {
        gold_bean: number;
        errcode: number;
        msg: string;
    }
    interface proto_checkin {
    }
    interface proto_task_checkin_ntf_res {
        checkin: boolean;
        rewards: Array<{
            award_name: string;
            award_url: string;
        }>;
        step: number;
    }
    interface proto_certification {
        idcard: string;
        name: string;
    }
}
