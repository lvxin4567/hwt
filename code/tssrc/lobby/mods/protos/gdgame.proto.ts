namespace lobby {
    export enum GDGameHead {
        sitein = "sitein",
        getallowanceinfo = "getallowanceinfo"
    }

    export interface proto_getallowanceinfo {
        uid:number,
        token:string,
        ignore_gift:boolean,
    }

    export interface proto_checkbuybgift {
        uid:number,
        token:string,
    }


    export interface proto_getallowanceinfo_res{
        allowance:proto_disposeallowances_ntf_res,
        gift:bankruptGiftModel,
    }

    export interface bankruptGiftModel{
        id:number
        img_url:string,
        exchange_gold_num:number                // 礼包包含的金币数量
        need_diamond_num:number         // 钻石数量
        base_count:number                 // 基础已购买玩家数量
        purchased_count:number            // 已购买玩家数量  
        user_gold:number                   // 玩家现有金币数量
        user_diamond:number                // 玩家现有钻石数量
    }

    export interface proto_areapkgbykid {
        kindid: number
    }


    export interface proto_sitein extends IBASE_MESSAGE{
        kind_id:number,
        site_type:number
    }

    export interface productPkgModel{
        id:number,
        bagname:string,
        desc:string,
        pic_url:string,
        price:number,
        ctime:string,
        status:number,
        sort:number,
        details:Array<{
            productName:string,
            num:number,
            imgUrl:string,
            type:number,
        }>,
        zuanshi:{
            id:number,
            appid:string,
            productName:string,
            price:number,
            num:number,
            imgUrl:string,
            type:number,
            sort:number,
            ioskey:string,
        },
        people:number,
    }




}