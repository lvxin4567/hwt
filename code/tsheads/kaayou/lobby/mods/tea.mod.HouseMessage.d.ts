declare namespace tea {
    namespace mod {
        class HouseMessage {
            static __INS__: tea.mod.HouseMessage;
            static getInstance(): tea.mod.HouseMessage;
            _data: any[];
            pageStart: number;
            initMod(): void;
            getMessage(data: any): Promise<void>;
        }
    }
}
