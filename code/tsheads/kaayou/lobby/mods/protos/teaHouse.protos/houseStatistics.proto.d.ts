declare namespace tea {
    enum houseStatisticsHead {
        memberstatistics = "memberstatistics",
        housepartnerlist = "housepartnerlist",
        houserecordgamelike = "houserecordgamelike",
        houserecorduserlike = "houserecorduserlike",
        memberstatisticstotal = "memberstatisticstotal"
    }
    interface GetHouseMemberStat {
        recordtype?: number;
        hid: number;
        dfid: number;
        daytype: number;
        partner: number;
        pbegin: number;
        pend: number;
        searchkey: string;
        sorttype: number;
        group_id?: number;
        likeflag?: number;
        querytimeinterval?: number;
        querytimerange?: number;
        lowscoreflag?: number;
        roundtype?: number;
    }
    interface Data_HouseMemberStatItem {
        invalidtimes: number;
        islike: boolean;
        bigvalidtimes: number;
        bwtimes: number;
        dayType: number;
        index?: number;
        playtimes: number;
        totalscore: number;
        sortType: number;
        uid: number;
        uname: string;
        uurl: string;
        ugender: number;
        ujointime: number;
        validtimes: number;
        groupindex?: number;
        rankIndex?: number;
    }
    interface proto_memberstatistics_res extends IBASE_MESSAGE {
        items: Array<Data_HouseMemberStatItem>;
        hmemnum: number;
        hmemonlinenum: number;
        totalnum: number;
        partner_mems_num: number;
        partner_mems_played_num: number;
        pbegin: number;
        pend: number;
    }
    interface proto_housepartnerlist_res extends IBASE_MESSAGE {
        items: Array<Data_HouseMemberStatItem>;
        hmemnum: number;
        hmemonlinenum: number;
        totalnum: number;
        pbegin: number;
        pend: number;
    }
    interface proto_houserecordgamelike extends IBASE_HOUSEREQ {
        gamenum: number;
        islike: boolean;
        daytype: number;
        recordtype: number;
    }
    interface proto_houserecorduserlike extends IBASE_HOUSEREQ {
        likeuser: number;
        islike: boolean;
        daytype: number;
        isteamlike: boolean;
    }
    interface proto_memberstatisticstotal extends IBASE_HOUSEREQ {
        daytype: number;
    }
    interface proto_memberstatisticstotal_res extends IBASE_MESSAGE {
        playtimes: number;
        bwtimes: number;
        totalscore: number;
        validtimes: number;
    }
}
