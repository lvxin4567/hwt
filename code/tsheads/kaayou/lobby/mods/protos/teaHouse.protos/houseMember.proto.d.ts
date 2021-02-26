declare namespace tea {
    enum houseMemHeadMsg {
        hmlookuserright = "hmlookuserright",
        housecaptainlimitgame = "housecaptainlimitgame",
        housememberagree = "housememberagree",
        housememberagree_ntf = "housememberagree_ntf",
        housememberlist = "housememberlist",
        housememberrefused = "housememberrefused",
        housememberrefused_ntf = "housememberrefused_ntf",
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
        housepartnercreate = "housepartnercreate",
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
        housecaptainlimitgame_ntf = "housecaptainlimitgame_ntf",
        partnerremark = "partnerremark",
        house2ptablelimitnoteffect = "house2ptablelimitnoteffect"
    }
    interface GetHouseMemberList {
        hid: number;
        param: string;
        pbeg: number;
        pend: number;
        role: HouseMemberRole;
        sorttype: number;
        list_type?: number;
    }
    interface Data_HouseMemberItem {
        upartnerurl: string;
        apply_at: number;
        apply_type: number;
        game_limit: boolean;
        limit: boolean;
        ruleMask: number;
        superior: number;
        superiorname: string;
        ugender: number;
        uid: number;
        ujointime: number;
        ulasttime: number;
        uname: string;
        upartner: number;
        vice_partner: boolean;
        upartnername: string;
        uremark: string;
        uurl: string;
        uonline: boolean;
        uplaying: boolean;
        urole: HouseMemberRole;
        uvitamin: number;
        vitamin_admin: boolean;
    }
    interface proto_housemembertablelimitlist extends IBASE_HOUSEREQ {
        param: string;
        group_id: number;
        pbeg: number;
        pend: number;
    }
    interface proto_housevitaminmgrlist extends IBASE_HOUSEREQ {
        searchkey: string;
        pbeg: number;
        pend: number;
        sorttype: number;
    }
    interface proto_housememberBase extends IBASE_HOUSEREQ {
        uid: number;
    }
    interface proto_house2ptablelimitnoteffect extends IBASE_HOUSEREQ {
        sta: boolean;
    }
    interface SetHouseMemberRole extends proto_housememberBase {
        hname: string;
        oldurole?: HouseMemberRole;
        urole: HouseMemberRole;
    }
    interface ModifyHouseMemberRemark {
        hid: number;
        uid: number;
        uremark: string;
    }
    interface proto_housevitadminset extends proto_housememberBase {
        is_admin: boolean;
    }
    interface proto_houseuserlimitgame extends proto_housememberBase {
        allow_game: boolean;
    }
    interface proto_housevicepartnerset extends proto_housememberBase {
        vicepartner: boolean;
    }
    interface proto_housevicepartnerset_ntf_res extends proto_housememberBase {
        optuid: number;
        vicepartner: boolean;
    }
    interface proto_housepartnergen extends proto_housememberBase {
        partner: number;
    }
    interface proto_housetablelimitinfo_res extends IBASE_MESSAGE {
        groups: Array<{
            group_id: number;
            user_count: number;
            users: Array<{
                uid: number;
                uname: string;
                uurl: string;
                ugender: number;
                limit: boolean;
            }>;
        }>;
        total_group: number;
        is2pnoteffect?: boolean;
    }
    interface proto_housetablelimituserremove extends proto_housememberBase {
        group_id: number;
    }
    interface proto_housetablelimitgroupremove extends IBASE_HOUSEREQ {
        group_id: number;
    }
    interface proto_houseautopaypartner extends IBASE_HOUSEREQ {
        auto_pay: boolean;
    }
    interface proto_housememberapply_ntf_res extends proto_housememberBase {
        uurl: string;
        nick_name: string;
        apply_time: number;
        is_online: boolean;
    }
    interface proto_houseuserlimitgame_ntf_res extends proto_housememberBase {
        allow_game: boolean;
    }
    interface proto_housememberagree_ntf_res extends proto_housememberBase {
        apply_type: number;
        hid: number;
        opt: number;
        uid: number;
    }
}
