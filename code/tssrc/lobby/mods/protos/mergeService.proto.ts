namespace lobby {
    export enum mergeServiceHead {
        housejoinbypcode = "housejoinbypcode",
        areacswx = "areacswx",
        entergoldgame = "entergoldgame",
    }

    export interface  proto_housejoinbypcode{
        code:string,   //传入的是地区码
    }

}