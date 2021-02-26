namespace lobby {
    export enum UserMessageHead {
        loginYK = "loginYK",
        loginToken = "loginToken",
        mobileRegister = "mobileRegister",
        loginWechat = "loginWechat",
        loginMobile = "loginMobile",
        loginMobile_v2 = "loginMobile_v2",
        resetPassword = "Resetpassword",



        bindmobile = "bindmobile",//绑定手机
        bindmobilev2 = "bindmobilev2",
        unbindmobile = "unbindmobile", //解绑手机
        bindwechat = "bindwechat", //绑定微信

        setuid = "setuid",
        updateuserinfo = "updateuserinfo",
        updatedescribeinfo = "updatedescribeinfo",
        saveinsuregold = "saveinsuregold",



        areaenter = "areaenter",

        getallowancesdouble = "getallowancesdouble",// 低保分享请求

        disposeallowances_ntf = "disposeallowances",//低保领取
        updgold_ntf = "updgold", //金币更新
        updgoldbean_ntf = "updgoldbean", // 金豆
        checkin = "checkin",//签到
        checkininfo="checkininfo",//请求签到表
        task_checkin_ntf = "task_checkin", //签到

        certification = "certification",//实名认证

        upddiamond_ntf = "upddiamond",

        setuserrefuseinvite = "setuserrefuseinvite",

        usersetsex = "usersetsex"

    }
    export interface IBASE_MESSAGE {
        errcode?: number,
        msg?: string
    }

    export interface proto_loginYK {
        code: string,
        platform: number,
        machinecode: string
    }

    export interface proto_usersetsex{
        sex  :number,
    }

    export interface proto_setuserrefuseinvite{
        refuse_invite:boolean,
    }

    export interface proto_loginToken {
        uid: number,
        token: string,
        platform: number,
        machinecode: string
    }

    export interface proto_loginWechat {
        code: string,
        mobile: string,
        platform: number,
        appid?: string,
        machinecode: string
    }


    export interface proto_mobileRegister {
        mobile: string,
        code: string,
        password: string,
        nickname: string,
        platform: number,
        machinecode: string
    }

    export interface proto_resetPassword {
        mobile: string,
        code: string,
        password: string
    }


    export interface proto_loginMobile {
        mobile: string,
        code: string, //短信验证码
        platform: number,
        machinecode: string
    }

    export interface proto_loginMobile_v2 {
        mobile: string,
        password: string,
        platform: number,
        machinecode: string
    }


    export interface proto_setuid {
        token: string,
        minfo: string,
        engine: number,
        uid:number,
    }

    export interface proto_setuid_res {
        bind_wechat: boolean, //是否绑定微信
        hot_version:string
        realname: string,
        user_type: number, // 1	游客账号     2	手机账号     3	微信账号  4 手机绑定了微信账号的 
        
        uid: number,
        name: string,
        ip: string,
        sex: number,//性别,1为男性,2为女性
        imgurl: string,
        tel: string,
        isCertification: boolean,
        guestid?: string,
        token?: string,
        roomId?: number,
        games?: string,
        fid: number, //楼层ID
        hid: number,  //茶楼ID
        area?: string,//区域id
        card: number,//用户房卡数
        gold: number, //用户金币数
        gold_bean: number,//用户金豆数
        insure_gold: number,//保险箱金币数量
        site_type: number,
        site_id: number,
        game_id: number,
        table_id: number,
        describe_info: string,
        delivery_img: string  //玩家收款二维码
    }





    export interface proto_areaenter {
        code: string
    }




    export interface proto_bindmobile {
        code: string,
        mobile: string,
    }

    export interface proto_bindmobile_v2 {
        code: string,
        mobile: string,
        password: string,
    }

    export interface proto_unbindmobile {
        code: string,
        mobile: string,
    }


    export interface proto_bindmobile_v2_res {
        msg?: string,
        errcode: number,
        nickname: string,
        imgurl: string,
        sex: number
    }


    export interface proto_bindwechat {
        code: string,
    }



    export interface proto_bindwechat_res {
        msg?: string,
        errcode: number,
        nickname: string,
        imgurl: string,
        sex: number
    }




    export interface proto_updateuserinfo {
        nickname: string,
        sex: number,
    }


    export interface proto_updatedescribeinfo {
        describe: string,
    }

    export interface proto_saveinsuregold {
        gold: number,
    }

    export interface proto_saveinsuregold_res {
        gold: number,
        insure_gold: number,
        errcode: number,
        msg: string
    }

    export interface proto_disposeallowances_ntf_res {
        current: number,
        gold: number,
        remain: number,
        after_gold?:number,
    }

    export interface proto_getallowancesdouble {
        current: number
    }


    export interface proto_updgold_ntf_res {
        gold: number,
        type: number,
        offset:number,
        // errcode: number,
        // msg: string
    }


    export interface proto_upddiamond_ntf_res{
        diamond : number;
    }


    export interface proto_updgoldbean_ntf_res {
        gold_bean: number,
        errcode: number,
        msg: string
    }

    export interface proto_checkin {

    }

    export interface proto_task_checkin_ntf_res {
        checkin:boolean,
        rewards: Array<{award_name:string,award_url:string}>,
        step: number
    }

    export interface proto_certification {
        idcard: string,
        name: string
    }





}