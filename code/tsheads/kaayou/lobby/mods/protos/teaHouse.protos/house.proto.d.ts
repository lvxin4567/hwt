declare namespace tea {
    export enum houseMsgHead {
        housecreate = "housecreate",
        houseoptionismemberexitcheck_ntf = "houseoptionismemberexitcheck_ntf",
        memberhouselist = "memberhouselist",
        housememberjoin = "housememberjoin",
        housebaseinfo = "housebaseinfo",
        housepartnergetcode = "housepartnergetcode",
        housememberout = "housememberout",
        housememberexit = "housememberexit",
        housedelete = "housedelete",
        houseoptionismemhide = "houseoptionismemhide",
        houseoptionishidhide = "houseoptionishidhide",
        houseoptionisheadhide = "houseoptionisheadhide",
        houseoptionisonlinehide = "houseoptionisonlinehide",
        houseprivategpsset = "houseprivategpsset",
        housegameswitch = "housegameswitch",
        houseoptionismembercheck = "houseoptionismembercheck",
        houseoptionisparntercheck = "houseoptionisparntercheck",
        houseapplyswitch = "houseapplyswitch",
        houseoptionismemberexit = "houseoptionismemberexit",
        houseoptionisfrozen = "houseoptionisfrozen",
        housebasennmodify = "housebasennmodify",
        housedialogedit = "housedialogedit",
        housememberonline = "housememberonline",
        housepartner = "housepartner",
        housemixfloorinfo = "housemixfloorinfo",
        housemixflooreditor = "housemixflooreditor",
        housevalidroundscoreset = "housevalidroundscoreset",
        housesettblshowcount = "housesettblshowcount",
        housevalidroundscoreget = "housevalidroundscoreget",
        housejointableset = "housejointableset",
        housejoininvitesend = "housejoininvitesend",
        housejoininviteack = "housejoininviteack",
        housejointablechange_ntf = "housejointablechange_ntf",
        houseoptionpartnerkick = "houseoptionpartnerkick",
        housetabledistancelimitget = "housetabledistancelimitget",
        housetabledistancelimitset = "housetabledistancelimitset",
        housejoininvitentf = "housejoininvitentf",
        houseoptionispartnerkick_ntf = "houseoptionispartnerkick_ntf",
        housefloorcolorset = "housefloorcolorset",
        housefloorcolorset_ntf = "housefloorcolorset_ntf",
        housesearchuser = "searchuser",
        housemtadduser = "housemtadduser",
        setfangkatipsminnumreq = "setfangkatipsminnumreq",
        hmsetswitch = "hmsetswitch",
        setrecordtimeintervalreq = "setrecordtimeintervalreq"
    }
    export interface IBASE_HOUSEREQ {
        hid: number;
    }
    export interface proto_memberhouselist {
        hcreate: boolean;
        hjoin: boolean;
    }
    export interface proto_memberhouselist_res extends IBASE_MESSAGE {
        items: Array<I_memberHouseItem>;
    }
    interface I_memberHouseItem {
        id: number;
        hid: number;
        hname: string;
        hmems: number;
        ownerid: number;
        ownername: string;
        ownerurl: string;
        ownergender: number;
        role: number;
        jointime: number;
        onlinetable: number;
        onlinecur: number;
        onlinetotal: number;
        mergehid: number;
        ishidhide: boolean;
        hfloorids: Array<number>;
        hfloorgameurl: Array<string>;
    }
    export interface proto_housecreate {
        hname: string;
        hnotify: string;
    }
    export interface proto_housefloorcolorset extends IBASE_HOUSEREQ {
        floors_color: Array<string>;
    }
    export interface proto_setfangkatipsminnumreq extends IBASE_HOUSEREQ {
        minnum: number;
    }
    export interface proto_housecreate_res extends IBASE_MESSAGE {
        id: number;
        hid: number;
    }
    export interface proto_housememberjoin {
        hid: number;
        invite_uid: number;
    }
    export interface proto_housememberjoin_res extends IBASE_MESSAGE {
        hid: number;
        invite_uid: number;
    }
    export interface proto_housebaseinfo_res extends IBASE_MESSAGE {
        id: number;
        hid: number;
        area: string;
        league_area: number;
        hownerid: number;
        ufloor: number;
        urole: number;
        hname: string;
        hnotify: string;
        dialog: string;
        dialogactive: boolean;
        urefhid: number;
        ispartner: boolean;
        superiorid: number;
        hischecked: boolean;
        hisfrozen: boolean;
        hismemhide: boolean;
        hismemexit: boolean;
        isactivity: boolean;
        hmaxtable: number;
        onlinetable: number;
        onlinecur: number;
        onlinetotal: number;
        hfloorids: Array<number>;
        card_pool: boolean;
        vitamin: number;
        vitamin_pool: number;
        isvitamin: boolean;
        isgamepause: boolean;
        isvitaminhide: boolean;
        isvitaminmodi: boolean;
        ispartnerhide: boolean;
        ispartnermodi: boolean;
        ismembersend: boolean;
        ipa: boolean;
        only_quick: boolean;
        updnfids: Array<number>;
        house_table_join_type: number;
        mix_active: boolean;
        auto_pay_partner: boolean;
        ishidhide: boolean;
        tblshowcount: number;
        isaisuper: boolean;
        empty_table_back: boolean;
        empty_table_max: number;
        table_sort_type: number;
        isheadhide: boolean;
        disablejuniorv: boolean;
        vitamin_admin: boolean;
        vice_partner: boolean;
        isonlinehide: boolean;
        game_on: boolean;
        admin_game_on: boolean;
        partnerkick: boolean;
        luck_times: number;
        apply_switch: boolean;
    }
    export interface proto_housepartnergetcode_res extends IBASE_MESSAGE {
        code: number;
    }
    export interface proto_housememberout {
        hid: number;
        fid: number;
    }
    export interface proto_housememberexit_res extends IBASE_MESSAGE {
        hid: number;
    }
    export interface SetHouseOptionMemberHide extends IBASE_HOUSEREQ {
        ismemhide: boolean;
    }
    export interface proto_houseoptionishidhide extends IBASE_HOUSEREQ {
        ishidhide: boolean;
    }
    export interface proto_houseoptionisheadhide extends IBASE_HOUSEREQ {
        isheadhide: boolean;
    }
    export interface proto_houseoptionisonlinehide extends IBASE_HOUSEREQ {
        isonlinehide: boolean;
    }
    export interface proto_housegameswitch extends IBASE_HOUSEREQ {
        on: boolean;
    }
    export interface SetHouseOptionCheck extends IBASE_HOUSEREQ {
        ischecked: boolean;
    }
    export interface proto_houseapplyswitch extends IBASE_HOUSEREQ {
        switch: boolean;
    }
    export interface proto_houseoptionismemberexit extends IBASE_HOUSEREQ {
        ismemexit: boolean;
    }
    export interface SetHouseOptionFrozen extends IBASE_HOUSEREQ {
        isfrozen: boolean;
    }
    export interface ModifyHouseBaseNN extends IBASE_HOUSEREQ {
        hname: string;
        hnotify: string;
    }
    export interface proto_housedialogedit extends IBASE_HOUSEREQ {
        content: string;
        active: boolean;
    }
    export interface proto_housememberonline_res extends IBASE_MESSAGE {
        unums: number;
        vitamin: number;
    }
    export interface HouseMixFloorInfo extends IBASE_MESSAGE {
        is_mix: boolean;
        mix_active: boolean;
        table_num: number;
        fids: Array<number>;
        house_table_join_type: number;
        ai_check: boolean;
        ai_total_score_limit: number;
        ai_super: boolean;
        empty_table_back: boolean;
        empty_table_max: number;
        table_sort_type: number;
        new_table_sort_type: number;
        create_table_type: number;
    }
    export interface proto_housemixflooreditor {
        hid: number;
        fids: Array<number>;
        mix_active: boolean;
        table_num: number;
        house_table_join_type: number;
        ai_check: boolean;
        ai_total_score_limit: number;
        ai_super: boolean;
        empty_table_back: boolean;
        empty_table_max: number;
        table_sort_type: number;
        new_table_sort_type: number;
        create_table_type: number;
    }
    export interface proto_housesettblshowcount extends IBASE_HOUSEREQ {
        count: number;
    }
    export interface proto_housejointableset extends IBASE_HOUSEREQ {
        only_quick: boolean;
    }
    export interface proto_housejoininvitesend extends IBASE_HOUSEREQ {
        tuid: number;
    }
    export interface proto_housejoininviteack extends IBASE_HOUSEREQ {
        inviter: number;
        agree: boolean;
        notips: boolean;
    }
    export interface proto_houseoptionpartnerkick extends IBASE_HOUSEREQ {
        partnerkick: boolean;
    }
    export interface proto_searchuser extends IBASE_HOUSEREQ {
        uid: number;
    }
    export interface proto_searchuser_res extends IBASE_MESSAGE {
        uid: number;
        nickname: string;
        imgurl: string;
    }
    export interface proto_housetabledistancelimitset extends IBASE_HOUSEREQ {
        distance: number;
    }
    export interface proto_housefloorcolorset_ntf {
        hid: number;
        floors_color: Array<string>;
    }
    export {};
}
