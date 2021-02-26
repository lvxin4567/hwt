declare namespace tea {
    namespace mod {
        class User {
            static __INS__: tea.mod.User;
            static getInstance(): tea.mod.User;
            initMod(): void;
            getRole(): number;
            getRoleByData(data: any): any;
            isOwner(): boolean;
            isViceCaptain(): boolean;
        }
    }
}
