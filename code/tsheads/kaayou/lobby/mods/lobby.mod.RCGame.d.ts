declare namespace lobby {
    interface Data_PakeageFromRoomId {
        city: string;
        country: string;
        games: Array<Data_PakeageInfo>;
        gametype: number;
        icon: string;
        id: number;
        is_public: number;
        package_key: string;
        package_name: string;
        package_version: string;
        province: string;
        reco: number;
    }
    interface Data_PakeageInfo {
        game_rule_version: number;
        icon: string;
        kind_id: number;
        name: string;
        package_key: string;
        package_name: string;
        package_version: string;
    }
    namespace mod {
        class RCGame {
            static __INS__: lobby.mod.RCGame;
            static getInstance(): lobby.mod.RCGame;
            initMod(): void;
            onGetAreaPaheage(data: {
                roomid: any;
                callBack?: Function;
            }): Promise<void>;
            onCreaterRoom(data: {
                kindid: number;
                configData: any;
            }): Promise<void>;
            onJoinRoom(data: {
                id: number;
                gameKey: string;
            }): Promise<void>;
            doGetAllGameRules(): Promise<void>;
        }
    }
}
