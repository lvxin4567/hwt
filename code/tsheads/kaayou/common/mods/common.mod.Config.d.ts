declare namespace common {
    namespace mod {
        interface Data_Game_Package_Item {
            kind_id: number;
            name: string;
            rule: string;
            package_key: string;
        }
        enum SHARE_TYPE {
            TEAHOUSE_LOBBY = 0,
            TEAHOUSE_RECORD = 1,
            LOBBY_RECORD = 2,
            LOBBY = 3
        }
        interface Data_Game_Package_RichItem {
            kind_id: number;
            name: string;
            package_name: string;
            package_type?: string;
            icon: string;
        }
        interface Data_Game_Package_Base {
            package_key: string;
            package_name: string;
            package_type?: string;
            icon: string;
            game_names?: string;
        }
        interface Data_Game_Package extends Data_Game_Package_Base {
            version?: string;
            games: Array<Data_Game_Package_Item>;
        }
        class Config {
            static ConfigUrl: string;
            static HttpSchema: string;
            static HttpsSchema: string;
            static DownloadUrl: string;
            static CheckUpdateUrl: string;
            static isLoginEncryp: boolean;
            static LoadAppConfig(): Promise<void>;
            static LoadLocalAppConf(): Promise<unknown>;
            static AppConfig: Ka_APP_CONFIG;
            static GetAppConfig(): Ka_APP_CONFIG;
            static ParseConfig(jstr: string): Promise<void>;
        }
    }
}
