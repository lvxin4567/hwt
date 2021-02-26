namespace tea {
    export enum housePartnerHead{
        houseparnterroyaltyforme = "houseparnterroyaltyforme",
        housememgroupinfo = "housememgroupinfo",
        housememgroupadd = "housememgroupadd",
        housememgroupdel = "housememgroupdel",
        housememgroupaddlist = "housememgroupaddlist",
        housememgroupuseradd = "housememgroupuseradd",
        housememgroupuserdel = "housememgroupuserdel",
        housenoleaguestatistics = "housenoleaguestatistics",
    }

    export interface proto_houseparnterroyaltyforme extends IBASE_HOUSEREQ{
        uid : number,
    }

    export interface proto_housememgroupdel extends IBASE_HOUSEREQ{
        group_id : number,
    }

    export interface proto_housememgroupaddlist extends IBASE_HOUSEREQ{
        searchkey: string,
        group_id: number,
        start: number,
        count: number
    }

    export interface memberNotInGroupItem {
        uid:number,
        uname:string,
        uurl:string,
        ugender:number,
        limit:boolean,
        group_id:number,
    }

    export   interface proto_housememgroupaddlist_res  extends IBASE_MESSAGE{
        users: Array<memberNotInGroupItem>
        start: number;
        group_id:number,
    }

    export interface proto_housememgroupuseradd extends IBASE_HOUSEREQ{
        uid:number ,group_id:number
    }

    export interface proto_housenoleaguestatistics extends IBASE_HOUSEREQ{
        fid:number,
        likeflag:number,    //0全部；1点赞；2未点赞
        pbegin: number,
        searchkey: string,
        pend: number,
        daytype:number,
        partnerlevel:number,
        querytimeinterval:number,
        querytimerange:number,
        lowscoreflag:number
        roundtype:number
    }

    export interface GroupInfo {
        groups:Array<{group_id:number,user_count:number,users:any}>,
        total_group:number,
        uid:number,
    }

}