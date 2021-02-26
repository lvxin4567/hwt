namespace tea {
    export enum houseRecordHead {
        housegamerecord = "housegamerecord",
        houseoperationalstatus = "houseoperationalstatus",
        houserecordstatus = "houserecordstatus",
        houserecordstatusclean = "houserecordstatusclean",
        houserecordstatuscleanall = "houserecordstatuscleanall",
        gamerecordinfo = "gamerecordinfo",
    }

    export interface proto_housegamerecord extends IBASE_HOUSEREQ {
        dfid: number,
        uid: number,
        searchkey: string,
        selecttime: number,
        querybegintime: number,
        bwuser?:boolean,
        recordtype?:number,
        likeflag?:number,
        querytimeinterval?:number,
        querytimerange?:number,
        lowscoreflag?:number
        roundtype?
    }

    export interface ITH_DATA_RECORD extends IBASE_MESSAGE {
        completeround: number,  //完整场次
        dismissround: number,   //中途解散
        items: Array<ITH_DATA_RECORD_ITEM>,
        playtimes: number,  //今日人次
        totalbwtimes: number,    //大赢家人次
        totallike:number,   //已点赞
        totalround: number, //今日场次
        totalscore: number, //总战绩
        uid: number;    //用户编号
        validround:number   //有效局
        invalidround:number //低分局
        invalidtimes:number //低分局人次
    }
    export interface ITH_DATA_BUSINESS_ITEM extends IBASE_MESSAGE {
        playrounds: Array<number>,
        querytime: number,
        totalfangkacost:number
        totalrounds: number,
    }

    export interface ITH_DATA_BUSINESS extends IBASE_MESSAGE {
        items: Array<ITH_DATA_BUSINESS_ITEM>,
    }

    export interface ITH_RECORD_BUSS_RES {
        itemArr: Array<Array<number>>,
        timeArr: Array<number>,
        totalArr: Array<number>,
        totalCard:Array<number>
    }

    export interface ITH_DATA_RECORDCOUNT_ITEM extends IBASE_MESSAGE {
        recordtimes: number,
        uid: number,
        uname: string,
        uurl: string
    }


    export interface proto_houserecordstatus extends IBASE_HOUSEREQ{
        param: string,
        pbegin: number,
        pend: number,
        recordtype: boolean
    }

    export interface proto_houserecordstatusclean extends IBASE_HOUSEREQ{
        uid: number, recordtype: number
    }

    export interface proto_houserecordstatuscleanall extends IBASE_HOUSEREQ{
        recordtype: number
    }

     //获取战绩详情
     export interface GetHouseRecordDetail {
        gamenum: string,
        gname: string
    };

    export interface Data_HouseRecordDetail {
        gamenum: string,
        kindid: number,
        roomid: number,
        time: number,
        floorindex:number
        totalround:number
        userArr: Array<Data_RecordDetailUserItem>,
        scoreArr: Array<Data_RecordDetailScoreItem>,
        difen:number
    };

       //我的战绩详情中的玩家信息
       export interface Data_RecordDetailUserItem {
        cap_id:number,
        cap_nickname:string,
        imgurl: string,
        uid: number,
        
        nickname: string,
        score: number,
        sex: number,
    };


    export interface ITH_RECORD_DETAIL_INFO {
        gname: string,
        gamenum: string,
        kindid: number,
        roomid: number,
        time: number,
        floorindex:number
        totalround:number
        totallist:Data_RecordDetailUserItem[]
        list: ITH_RECORD_DETAIL_ITEM[]
        difen:number
    }


    export interface ITH_DATA_MEM_RECORD_ITEM {
        uid: number,
        nickname: string,
        headurl: string,
        score: number,
        win: number,
        playround: number,
        seq?: number
    }
}