namespace tea {
    export enum houseTmHead{
        houseprizeinfo = "houseprizeinfo",
        houserankinfoget = "houserankinfoget",
        houserankget = "houserankget",
        houserankset = "houserankset"
    }

    export interface proto_houseprizeinfo extends IBASE_HOUSEREQ{
        type:number
    }

    export interface proto_houserankinfoget extends IBASE_HOUSEREQ{
        rank_type :number,
        time_type :number,
        pbegin:number,
        pend:number
    }

    export interface proto_houserankinfoget_res {
        uid :number,
        uname :string,
        ugender:number,
        rank_num:number,
        uurl:string;
        rankIndex:number,
        authNum:number
    }



    export interface proto_houserankset extends IBASE_HOUSEREQ{
        rank_round :number,
        rank_winer :number,
        rank_record:number,
        rank_open:boolean,
    }


    
}