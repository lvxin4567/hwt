namespace tea {
    export enum houseActMsg{
        houseactivitycreate = "houseactivitycreate",
        houseactivitylist = "houseactivitylist",
        houseactivityinfo = "houseactivityinfo",
        houseactivitydelete = "houseactivitydelete",
        houseluckconfig = "houseluckconfig",
        housefloorsetvipuser = "housefloorsetvipuser",
        
    }

    export interface Data_ActivityCreate {
        hid: number,
        fids: Array<number>,
        acttype: number,
        actname: string,
        actbegtime: number,
        actendtime: number,
        hideinfo: boolean,
        rewords: Array<Data_RewordInfo>,    //幸运星活动排名配置
        type: number,                       //活动形式
        ticket_count: number,               //幸运星活动多少局抽一次 
    }

    export interface proto_houseactivitylist_res extends IBASE_MESSAGE{
        actitmes:Array<I_HouseListItem>
    }

    interface I_HouseListItem{
        actid :number,
        actname : string,
        actstate : number,
        hideinfo : boolean,
        type :number,
        rewords : Array<I_RewordsItem>
    }

    interface I_RewordsItem{
        rank:number,
        count:number,
    }

    export interface proto_houseactivityinfo_res extends IBASE_MESSAGE{
        actid:number,
        fids:Array<number>,
        fidindexs:Array<number>,
        actname:string,
        acttype:number,
        begtime:number,
        endtime:number,
        actstate:number,
        hideinfo:boolean,
        useritems:Array<Data_ActivityUserModel>,
        type:number,
    }

    export interface proto_houseactivityinfo extends IBASE_HOUSEREQ{
        actid:number,
    }

    export interface Data_CurActivityInfo extends IBASE_MESSAGE{
        actid: number,
        actname: string,
        acttype: number,
        actstate: number,
        actstartime: number,
        actendime: number,
        userlist: Array<Data_ActivityUserModel>,
        fids: Array<number>,
        fidindexs: Array<number>,
        hideinfo: boolean,
        type: number
    }


    export interface Data_ActivityChooseFloor {
        index: number,
        fid: number,
        gameName: string,
        kindid: number
    }

    export interface Data_ActListModel {
        actid: number,
        actname: string,
        actstate: number,   //0：未开始  1：进行中  2：结束
    }

   

    //名次对应奖励
    export interface Data_RewordInfo {
        rank: number,
        count: number,
    }

    //奖励设置的请求
    export interface Data_HouseLuckSet {
        hid: number,
        actid: number,
        rewords: Array<Data_RewordInfo>,
    }

    //玩家信息模型
    export interface Data_floorVipInfo {
        uid: number,
        uname: string,
        uurl: string,
        ugender: number,
        is_vip: boolean,
        fid: number,
    }


    export interface Data_ActivityUserModel {
        uid: number,
        uname: string,
        score: string,
        actid: number,
        rank: number,
        created_time: number,
    }

    export interface proto_housefloorsetvipuser extends IBASE_HOUSEREQ{
        uid: number,
        fid: number,
        is_vip: boolean
    }
}