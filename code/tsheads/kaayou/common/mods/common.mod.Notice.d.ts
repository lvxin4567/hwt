declare namespace common {
    namespace mod {
        class Notice {
            static __INS__: common.mod.Notice;
            static getInstance(): common.mod.Notice;
            initMod(): void;
            private _playsendnotice;
            onPlaySendNotice(data: any): void;
        }
    }
}
