declare namespace tea {
    enum housePartnerHead {
        houseparnterroyaltyforme = "houseparnterroyaltyforme",
        housememgroupinfo = "housememgroupinfo",
        housememgroupadd = "housememgroupadd",
        housememgroupdel = "housememgroupdel",
        housememgroupaddlist = "housememgroupaddlist",
        housememgroupuseradd = "housememgroupuseradd",
        housememgroupuserdel = "housememgroupuserdel",
        housenoleaguestatistics = "housenoleaguestatistics"
    }
    interface proto_houseparnterroyaltyforme extends IBASE_HOUSEREQ {
        uid: number;
    }
    interface proto_housememgroupdel extends IBASE_HOUSEREQ {
        group_id: number;
    }
    interface proto_housememgroupaddlist extends IBASE_HOUSEREQ {
        searchkey: string;
        group_id: number;
        start: number;
        count: number;
    }
    interface memberNotInGroupItem {
        uid: number;
        uname: string;
        uurl: string;
        ugender: number;
        limit: boolean;
        group_id: number;
    }
    interface proto_housememgroupaddlist_res extends IBASE_MESSAGE {
        users: Array<memberNotInGroupItem>;
        start: number;
        group_id: number;
    }
    interface proto_housememgroupuseradd extends IBASE_HOUSEREQ {
        uid: number;
        group_id: number;
    }
    interface proto_housenoleaguestatistics extends IBASE_HOUSEREQ {
        fid: number;
        likeflag: number;
        pbegin: number;
        searchkey: string;
        pend: number;
        daytype: number;
        partnerlevel: number;
        querytimeinterval: number;
        querytimerange: number;
        lowscoreflag: number;
        roundtype: number;
    }
    interface GroupInfo {
        groups: Array<{
            group_id: number;
            user_count: number;
            users: any;
        }>;
        total_group: number;
        uid: number;
    }
}
