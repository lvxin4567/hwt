namespace tea {
    export enum houseMessageHead {
        housemsg = "housemsg",
    }

    export interface proto_housemsg extends IBASE_HOUSEREQ {
        start: number,
        end: number,//这个接口是0-10
    }

    export interface proto_housemsg_res {
        msg:string,
        create_stamp:number
    }
}