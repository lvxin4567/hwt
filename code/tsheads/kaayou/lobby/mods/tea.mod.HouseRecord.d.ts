declare namespace tea {
    export interface ITH_DATA_RECORD_PLAYER {
        uid: number;
        nickname: string;
        headurl: string;
        score: number;
        sex: number;
    }
    export interface ITH_DATA_RECORD_ITEM {
        player_tags: Array<number>;
        partnerid: Array<Number>;
        daytype?: number;
        dfid: number;
        hid: number;
        fid: number;
        finishtype: number;
        gamenum: string;
        isheart: number;
        roomnum: number;
        timeInterval: number;
        timeRange: number;
        gameindex: number;
        kindid: number;
        playround: number;
        totalround: number;
        wf: string;
        playedat: number;
        player: Array<ITH_DATA_RECORD_PLAYER>;
    }
    interface GetHouseRecordDetail {
        gamenum: string;
        gname: string;
        partnerid: Array<number>;
    }
    export interface Data_RecordDetailScoreItem {
        index: number;
        iReplayid: number;
        starttime: number;
        endtime: number;
        score: Array<number>;
        uids: Array<number>;
    }
    export interface ITH_RECORD_DETAIL_ITEM_PLAYER {
        "uid": number;
        "nickname": string;
        headurl: string;
        "sex": number;
        "score": number;
    }
    export interface ITH_RECORD_DETAIL_ITEM {
        player: Array<ITH_RECORD_DETAIL_ITEM_PLAYER>;
        replayid: number;
        starttime: number;
        endtime: number;
    }
    export namespace mod {
        class TH_Mine_Record {
            initMod(): TH_Mine_Record;
            _data: ITH_DATA_RECORD;
            _querybegintime: number;
            doGetMineRecordList(data: {
                "dfid": number;
                "selecttime": number;
                "isUpdate": boolean;
                "searchkey": string;
                timeInterval: number;
                timeRange: number;
                lowscoreflag: number;
                roundtype: number;
            }): Promise<void>;
        }
        class TH_Circle_Record {
            initMod(): TH_Circle_Record;
            _data: ITH_DATA_RECORD;
            _querybegintime: number;
            doGetMineRecordList(data: {
                "dfid": number;
                "selecttime": number;
                "isUpdate": boolean;
                "searchkey": string;
                "bwuser": boolean;
                "recordtype"?: number;
                "uid"?: number;
                "force"?: boolean;
                "querybegintime"?: number;
                likeflag?: number;
                timeInterval?: number;
                timeRange?: number;
                lowscoreflag: number;
                roundtype: number;
            }): Promise<void>;
        }
        class TH_Business_Record {
            initMod(): TH_Business_Record;
            doGetBusinessdList(): Promise<void>;
        }
        class TH_BigWin_Record {
            initMod(): this;
            _bigWinList: Array<ITH_DATA_RECORDCOUNT_ITEM>;
            _bigWinbegin: number;
            _bigWinTotle: number;
            doGetBigWinList(data: {
                "clear": boolean;
                "param": string;
                "type": boolean;
            }): Promise<void>;
            doClearBigWin(data: proto_houserecordstatusclean): Promise<void>;
            doClearAllBigWin(data: proto_houserecordstatuscleanall): Promise<void>;
        }
        class TH_GameNumber_Record {
            initMod(): this;
            _gameNumList: Array<ITH_DATA_RECORDCOUNT_ITEM>;
            _gameNumbegin: number;
            _gameNumTotle: number;
            doGetGameNumberList(data: {
                "clear": boolean;
                "param": string;
                "type": boolean;
            }): Promise<void>;
            doClearGameNumber(data: proto_houserecordstatusclean): Promise<void>;
            doClearAllGameNumber(data: proto_houserecordstatuscleanall): Promise<void>;
        }
        class TH__Record_Detail {
            initMod(): TH__Record_Detail;
            ddoGetRecordDetail(data: GetHouseRecordDetail): Promise<void>;
        }
        export class HouseRecord {
            static __INS__: tea.mod.HouseRecord;
            static getInstance(): tea.mod.HouseRecord;
            _Mine_Record: TH_Mine_Record;
            _Circle_Record: TH_Circle_Record;
            _Business_Record: TH_Business_Record;
            _BigWin_Record: TH_BigWin_Record;
            _GameNumber_Record: TH_GameNumber_Record;
            _Record_Detail: TH__Record_Detail;
            initMod(): void;
        }
        export {};
    }
    export {};
}
