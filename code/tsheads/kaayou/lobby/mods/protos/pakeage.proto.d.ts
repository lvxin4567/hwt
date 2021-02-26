declare namespace lobby {
    enum pakeageHead {
        areagamemain = "areagamemain",
        areagameseek = "areagameseek",
        housegamelist = "housegamelist"
    }
    interface IPackageItem {
        city: string;
        country: string;
        province: string;
        games: Array<IGameItem>;
        gametype: number;
        icon: string;
        is_public: number;
        package_key: string;
        package_name: string;
        package_version: string;
        reco: number;
        id: number;
        region: string;
        code: string;
        game_engine: number;
    }
    interface IGameItem {
        package_key: string;
        package_name: string;
        package_version: string;
        name: string;
        icon: string;
        kind_id: number;
        game_rule_version: number;
        client_version: number;
        recomm_version: number;
        forced_version: number;
        game_engine: number;
    }
    interface proto_areagameseek {
        code: string;
        keyword: string;
        type: string;
        package_type: number;
    }
    interface proto_areagameseek_res extends IBASE_MESSAGE {
        keyword: string;
        type: number;
        code: string;
        package_type: number;
        packages: Array<IGameItem>;
    }
    interface proto_housegamelist {
        hid: number;
    }
    interface proto_housegamelist_res extends IBASE_MESSAGE {
        keyword: string;
        type: number;
        code: string;
        package_type: number;
        packages: Array<IGameItem>;
    }
}
