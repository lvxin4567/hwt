declare namespace tea {
    enum houseFcmMsgHead {
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
        housepartnerfloorhistorydtrailstatistics = "housepartnerfloorhistorydtrailstatistics"
    }
    interface proto_housevitaminsetrecords extends IBASE_HOUSEREQ {
        uid: number;
        start: number;
        count: number;
    }
    interface GetHouseVpCountREQ extends IBASE_HOUSEREQ {
        selecttime: number;
    }
    interface proto_housevitaminpooladd extends IBASE_HOUSEREQ {
        value: number;
    }
    interface proto_housevitaminpoollog extends IBASE_HOUSEREQ {
        start: number;
        count: number;
    }
    interface GetHouseVpPartnerREQ {
        hid: number;
        selecttime: number;
        sorttype: number;
        pbeg: number;
        pend: number;
        searchkey: string;
        partner: number;
    }
    interface proto_housevitaminset extends IBASE_HOUSEREQ {
        uid: number;
        value: number;
    }
    interface proto_housevitaminsend extends IBASE_HOUSEREQ {
        uid: number;
        value: number;
    }
    interface proto_housevitaminvalues extends IBASE_HOUSEREQ {
        adminhide: boolean;
        adminmodi: boolean;
        disablejuniorv: boolean;
        gamepause: boolean;
        membersend: boolean;
        partnerhide: boolean;
        partnermodi: boolean;
        status: boolean;
        reward_balanced: boolean;
    }
    interface proto_housepartnerfloorhistorydtrailstatistics extends IBASE_HOUSEREQ {
        dfid: number;
        fid: number;
        start: number;
        count: number;
    }
}
