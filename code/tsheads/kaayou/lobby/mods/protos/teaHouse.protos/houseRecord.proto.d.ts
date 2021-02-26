declare namespace tea {
    enum houseRecordHead {
        housegamerecord = "housegamerecord",
        houseoperationalstatus = "houseoperationalstatus",
        houserecordstatus = "houserecordstatus",
        houserecordstatusclean = "houserecordstatusclean",
        houserecordstatuscleanall = "houserecordstatuscleanall",
        gamerecordinfo = "gamerecordinfo"
    }
    interface proto_housegamerecord extends IBASE_HOUSEREQ {
        dfid: number;
        uid: number;
        searchkey: string;
        selecttime: number;
        querybegintime: number;
        bwuser?: boolean;
        recordtype?: number;
        likeflag?: number;
        querytimeinterval?: number;
        querytimerange?: number;
        lowscoreflag?: number;
        roundtype?: any;
    }
    interface ITH_DATA_RECORD extends IBASE_MESSAGE {
        completeround: number;
        dismissround: number;
        items: Array<ITH_DATA_RECORD_ITEM>;
        playtimes: number;
        totalbwtimes: number;
        totallike: number;
        totalround: number;
        totalscore: number;
        uid: number;
        validround: number;
        invalidround: number;
        invalidtimes: number;
    }
    interface ITH_DATA_BUSINESS_ITEM extends IBASE_MESSAGE {
        playrounds: Array<number>;
        querytime: number;
        totalfangkacost: number;
        totalrounds: number;
    }
    interface ITH_DATA_BUSINESS extends IBASE_MESSAGE {
        items: Array<ITH_DATA_BUSINESS_ITEM>;
    }
    interface ITH_RECORD_BUSS_RES {
        itemArr: Array<Array<number>>;
        timeArr: Array<number>;
        totalArr: Array<number>;
        totalCard: Array<number>;
    }
    interface ITH_DATA_RECORDCOUNT_ITEM extends IBASE_MESSAGE {
        recordtimes: number;
        uid: number;
        uname: string;
        uurl: string;
    }
    interface proto_houserecordstatus extends IBASE_HOUSEREQ {
        param: string;
        pbegin: number;
        pend: number;
        recordtype: boolean;
    }
    interface proto_houserecordstatusclean extends IBASE_HOUSEREQ {
        uid: number;
        recordtype: number;
    }
    interface proto_houserecordstatuscleanall extends IBASE_HOUSEREQ {
        recordtype: number;
    }
    interface GetHouseRecordDetail {
        gamenum: string;
        gname: string;
    }
    interface Data_HouseRecordDetail {
        gamenum: string;
        kindid: number;
        roomid: number;
        time: number;
        floorindex: number;
        totalround: number;
        userArr: Array<Data_RecordDetailUserItem>;
        scoreArr: Array<Data_RecordDetailScoreItem>;
        difen: number;
    }
    interface Data_RecordDetailUserItem {
        cap_id: number;
        cap_nickname: string;
        imgurl: string;
        uid: number;
        nickname: string;
        score: number;
        sex: number;
    }
    interface ITH_RECORD_DETAIL_INFO {
        gname: string;
        gamenum: string;
        kindid: number;
        roomid: number;
        time: number;
        floorindex: number;
        totalround: number;
        totallist: Data_RecordDetailUserItem[];
        list: ITH_RECORD_DETAIL_ITEM[];
        difen: number;
    }
    interface ITH_DATA_MEM_RECORD_ITEM {
        uid: number;
        nickname: string;
        headurl: string;
        score: number;
        win: number;
        playround: number;
        seq?: number;
    }
}
