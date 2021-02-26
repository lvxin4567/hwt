declare namespace common {
    namespace mod {
        class GPS {
            static __INS__: common.mod.GPS;
            static getInstance(): common.mod.GPS;
            initMod(): void;
            getGPSInfo(): Promise<unknown>;
        }
    }
}
