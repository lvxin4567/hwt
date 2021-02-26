declare namespace common {
    namespace mod {
        class ReCodeMod {
            static __INS__: common.mod.ReCodeMod;
            static getInstance(): common.mod.ReCodeMod;
            initMod(): void;
            getRunData(data: {
                replayid: string;
            }): Promise<void>;
        }
    }
}
