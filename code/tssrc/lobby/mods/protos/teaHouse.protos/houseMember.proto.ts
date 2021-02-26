namespace tea {
    export enum houseMemHeadMsg {
        hmlookuserright="hmlookuserright",
        
        housecaptainlimitgame="housecaptainlimitgame",
        housememberagree = "housememberagree",
        housememberagree_ntf="housememberagree_ntf",
        housememberlist = "housememberlist",
        housememberrefused = "housememberrefused",
        housememberrefused_ntf="housememberrefused_ntf",
        housemembertablelimitlist = "housemembertablelimitlist",
        housevitaminmgrlist = "housevitaminmgrlist",
        
        housememberkick = "housememberkick",
        housememberblacklistinsert = "housememberblacklistinsert",
        housememberblacklistdelete = "housememberblacklistdelete",
        houseparnterbindjunior = "houseparnterbindjunior",
        housememberrolegen = "housememberrolegen",
        housememberremark = "housememberremark",
        housevitadminset = "housevitadminset",
        houseuserlimitgame = "houseuserlimitgame",
        housepartnercreate ="housepartnercreate",
        housepartnerdelete = "housepartnerdelete",
        housevicepartnerset = "housevicepartnerset",
        housevicepartnerset_ntf = "housevicepartnerset_ntf",
        housepartnergen = "housepartnergen",
        housetablelimitinfo = "housetablelimitinfo",
        housetablelimitgroupadd = "housetablelimitgroupadd",
        housetablelimituseradd = "housetablelimituseradd",
        housetablelimituserremove = "housetablelimituserremove",
        housetablelimitgroupremove = "housetablelimitgroupremove",
        houseautopaypartner = "houseautopaypartner",
        housememberapply_ntf = "housememberapply_ntf",
        houseuserlimitgame_ntf = "houseuserlimitgame_ntf",
        housecaptainlimitgame_ntf="housecaptainlimitgame_ntf",
        partnerremark="partnerremark",//队长副队长修改玩家备注
        house2ptablelimitnoteffect = "house2ptablelimitnoteffect",  // 禁止同桌，二人桌不生效

        
    }

    //获取成员列表
    export interface GetHouseMemberList {
        hid: number,
        param: string,
        pbeg: number,
        pend: number,
        role: HouseMemberRole,
        sorttype: number,
        list_type?:number,
    };

    export interface Data_HouseMemberItem {
        upartnerurl: string;
        apply_at: number,
        apply_type: number,  //0入圈申请1退圈申请
        game_limit: boolean,    //禁止娱乐
        limit: boolean, //禁止同桌
        ruleMask: number,
        superior:number,    //上级队长
        superiorname:string,    //上级队长昵称
        ugender: number,
        uid: number,
        ujointime: number,
        ulasttime: number,
        uname: string,
        upartner: number,   //1：队长
        vice_partner: boolean
        upartnername: string,
        uremark: string,
        uurl: string,
        uonline: boolean,
        uplaying: boolean,
        urole: HouseMemberRole,
        uvitamin: number,
        vitamin_admin: boolean   //裁判
    };

    export interface proto_housemembertablelimitlist extends IBASE_HOUSEREQ {
        param: string,
        group_id: number,
        pbeg: number,
        pend: number
    }

    export interface proto_housevitaminmgrlist extends IBASE_HOUSEREQ {
        searchkey: string,
        pbeg: number,
        pend: number,
        sorttype: number
    }

    export interface proto_housememberBase extends IBASE_HOUSEREQ {
        uid: number,
    }

    export interface proto_house2ptablelimitnoteffect extends IBASE_HOUSEREQ{
        sta:boolean
    }

    //设置成员身份
    export interface SetHouseMemberRole extends proto_housememberBase {
        hname: string,
        oldurole?: HouseMemberRole,
        urole: HouseMemberRole
    };

    //设置成员备注
    export interface ModifyHouseMemberRemark {
        hid: number,
        uid: number,
        uremark: string
    };

    export interface proto_housevitadminset extends proto_housememberBase{
        is_admin:boolean,
    }

    export interface proto_houseuserlimitgame extends proto_housememberBase{
        allow_game:boolean,
    }

    export interface proto_housevicepartnerset extends proto_housememberBase{
        vicepartner:boolean,
    }

    export interface proto_housevicepartnerset_ntf_res extends proto_housememberBase{
        optuid: number,  
        vicepartner: boolean 
    }

    export interface proto_housepartnergen extends proto_housememberBase{
        partner:number,
    }

    export interface proto_housetablelimitinfo_res extends IBASE_MESSAGE{
        groups:Array<{
            group_id:number,
            user_count:number,
            users:Array<{
                uid:number,
                uname:string,
                uurl:string,
                ugender:number,
                limit:boolean,
            }>
        }>,
        total_group:number,
        is2pnoteffect?:boolean,
    }

    export interface proto_housetablelimituserremove extends proto_housememberBase{
        group_id:number,
    }

    export interface proto_housetablelimitgroupremove extends IBASE_HOUSEREQ{
        group_id:number,
    }

    export interface proto_houseautopaypartner extends IBASE_HOUSEREQ{
        auto_pay:boolean,
    }
    
    export interface proto_housememberapply_ntf_res extends proto_housememberBase{
        uurl:string,nick_name:string,apply_time:number,is_online:boolean
    }

    export interface proto_houseuserlimitgame_ntf_res extends proto_housememberBase{
        allow_game:boolean
    }

    //同意和拒绝都是这个
    export interface proto_housememberagree_ntf_res extends proto_housememberBase{
        apply_type:number,//0入圈1退圈
        hid:number,opt:number,uid:number        
    }
}