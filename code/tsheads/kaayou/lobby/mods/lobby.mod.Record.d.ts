declare namespace lobby {
    namespace mod {
        class RecordMod {
            pageStart: number;
            _data: any[];
            static __INS__: lobby.mod.RecordMod;
            static getInstance(): lobby.mod.RecordMod;
            initMod(): void;
            getRecord(data: {
                start: number;
                end: number;
                clear: boolean;
            }): Promise<void>;
            doGetRecordDetail(data: any): Promise<void>;
            getRecordInfo(data: {
                moduleName: string;
                replayid: string;
                call: Function;
            }): Promise<void>;
            getRunData(data: {
                replayid: string;
            }): Promise<void>;
        }
    }
}
