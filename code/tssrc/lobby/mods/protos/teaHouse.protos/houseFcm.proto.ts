namespace tea {
    export enum houseFcmMsgHead {
        housevitaminsetrecords = "housevitaminsetrecords",
        housevitaminstatisticsclear = "housevitaminstatisticsclear",
        housevitaminstatistics = "housevitaminstatistics",
        housevitaminpooladd = "housevitaminpooladd",
        housevitaminpoollog = "housevitaminpoollog",
        housepartnervitaminstatistics = "housepartnervitaminstatistics",
        housevitaminset = "housevitaminset",
        housevitaminsend = "housevitaminsend",
        housevitamininfo = "housevitamininfo",
        housevitaminvalues = "housevitaminvalues",
        housevitaminbatchsetlist = "housevitaminbatchsetlist",
        housevitaminclear = "housevitaminclear",
        housepartnerfloorhistorystatistics = "housepartnerfloorhistorystatistics",
        housepartnerfloorhistorydtrailstatistics = "housepartnerfloorhistorydtrailstatistics",
    }

    export interface proto_housevitaminsetrecords extends IBASE_HOUSEREQ {
        uid: number,
        start: number,
        count: number
    }
    //---比赛分统计列表请求
    export interface GetHouseVpCountREQ extends IBASE_HOUSEREQ {
        selecttime: number,
    }

    export interface proto_housevitaminpooladd extends IBASE_HOUSEREQ {
        value: number,
    }

    export interface proto_housevitaminpoollog extends IBASE_HOUSEREQ {
        start: number,
        count: number,
    }

    //队长统计 ----------------------------------------------------
    export interface GetHouseVpPartnerREQ {
        hid: number,
        selecttime: number,
        sorttype: number,
        pbeg: number,
        pend: number,
        searchkey: string,
        partner: number,
    }

    export interface proto_housevitaminset extends IBASE_HOUSEREQ {
        uid: number,
        value: number,
    }

    export interface proto_housevitaminsend extends IBASE_HOUSEREQ {
        uid: number,
        value: number,
    }

    export interface proto_housevitaminvalues extends IBASE_HOUSEREQ {
        adminhide: boolean,
        adminmodi: boolean,
        disablejuniorv: boolean,
        gamepause: boolean,
        membersend: boolean,
        partnerhide: boolean,
        partnermodi: boolean,
        status: boolean,
        reward_balanced: boolean,
    }

    export interface proto_housepartnerfloorhistorydtrailstatistics extends IBASE_HOUSEREQ{
        dfid: number,
        fid:number,
        start: number,
        count: number
    }

}