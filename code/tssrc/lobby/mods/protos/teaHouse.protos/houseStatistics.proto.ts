namespace tea {
    export enum houseStatisticsHead {
        memberstatistics = "memberstatistics",
        housepartnerlist = "housepartnerlist",
        houserecordgamelike = "houserecordgamelike",
        houserecorduserlike = "houserecorduserlike",
        memberstatisticstotal = "memberstatisticstotal",
    }
    //获取成员统计茶楼列表
    export interface GetHouseMemberStat {
        recordtype?: number,
        hid: number,
        dfid: number,    //楼层
        daytype: number,
        partner: number,
        pbegin: number,
        pend: number,
        searchkey: string,
        sorttype: number,
        group_id?: number,
        likeflag?: number,
        querytimeinterval?: number,
        querytimerange?: number
        lowscoreflag?:number
        roundtype?:number
    };

    //茶楼成员统计列表
    export interface Data_HouseMemberStatItem {
        invalidtimes: number;
        islike: boolean;
        bigvalidtimes: number,   //超级有效局数
        bwtimes: number,
        dayType: number,//0今天1昨天2前天
        index?: number,
        playtimes: number,
        totalscore: number,
        sortType: number,//0对局次数正序
        uid: number,
        uname: string,
        uurl: string,
        ugender: number,
        ujointime: number,
        validtimes: number   //有效局数
        groupindex?: number    //组
        rankIndex?: number     //时段赛排名
    };


    export interface proto_memberstatistics_res extends IBASE_MESSAGE {
        items: Array<Data_HouseMemberStatItem>
        hmemnum: number;
        hmemonlinenum: number;
        totalnum: number;
        partner_mems_num: number;
        partner_mems_played_num: number
        pbegin: number;
        pend: number;
    }

    export interface proto_housepartnerlist_res extends IBASE_MESSAGE {
        items: Array<Data_HouseMemberStatItem>
        hmemnum: number;
        hmemonlinenum: number;
        totalnum: number;
        pbegin: number;
        pend: number;
    }

    export interface proto_houserecordgamelike extends IBASE_HOUSEREQ {
        gamenum: number, islike: boolean, daytype: number, recordtype: number
    }

    export interface proto_houserecorduserlike extends IBASE_HOUSEREQ {
        likeuser: number, islike: boolean, daytype: number,isteamlike:boolean
    }

    export interface proto_memberstatisticstotal extends IBASE_HOUSEREQ {
        daytype: number
    }

    export interface proto_memberstatisticstotal_res extends IBASE_MESSAGE {
        playtimes: number,
        bwtimes: number,
        totalscore: number,
        validtimes: number,
    }
}