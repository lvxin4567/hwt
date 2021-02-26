namespace lobby{
    export enum recordHead {
        gamerecord = "gamerecord",
        gamerecordinfo = "gamerecordinfo",
        checkreplayid = "checkreplayid",
    }

    export interface proto_gamerecord{
        clear: boolean,
        end: number,
        pbegin: number,
        pend: number,
        start: number
    }

    export interface proto_gamerecord_res {
        gamenum:string,
        roomid:number,
        kindid:number,
        wf:string,
        time:number,
        icon:string,
        pkgkey:string,
        playerArr:Array<gameRecordPlayer>,
        round_sum:number,
        round_played:number,
        player_count:number,
    }

    export interface gameRecordPlayer{
        uid:number,
        nickname:string,
        score:number,
    }

    
    export interface proto_gamerecordinfo{
        gamenum : string,
    }

    export interface proto_gamerecordinfo_res extends IBASE_MESSAGE{
        gamenum:string,
        kindid:number,
        roomid:number,
        time:number,
        userArr:Array<userRecordInfoItem>,
        scoreArr:Array<userRecordScoreItem>,
    }

    interface userRecordInfoItem{
        uid:number,
        nickname:string,
        imgurl:string,
        sex:number,
        score:number,
        vitamin:number,
    }

    interface userRecordScoreItem {
        iReplayid:number,
        starttime:number,
        endtime:number,
        score:Array<number>,
        uids:Array<number>,
    }

    export interface proto_checkreplayid{
        replayid:string,
    }

    export interface proto_checkreplayid_res extends IBASE_MESSAGE{
        kindid:number,
        pkgkey:string,
    }

}