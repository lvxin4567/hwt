declare namespace tea {
    namespace mod {
        class HouseSet {
            static __INS__: tea.mod.HouseSet;
            static getInstance(): tea.mod.HouseSet;
            _data: any[];
            pageStart: number;
            initMod(): void;
            getMessage(data: any): Promise<void>;
        }
    }
}
