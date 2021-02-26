declare namespace tea {
    enum houseTableHead {
        areapkgbykid = "areapkgbykid",
        housetablein = "housetablein",
        tableinfo = "tableinfo",
        housetableinfobyuid = "housetableinfobyuid",
        tabledel = "tabledel",
        htinvite_ack = "htinvite_ack",
        housetableupdate_ntf = "housetableupdate_ntf",
        tableuserkick = "tableuserkick"
    }
    interface proto_areapkgbykid {
        kindid: number;
    }
    interface proto_areapkgbykid_res extends IBASE_MESSAGE {
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
    interface proto_housetablein extends IBASE_HOUSEREQ {
        address: string;
        fid: number;
        gps: boolean;
        ignorerule: boolean;
        kindid: number;
        latitude: number;
        longitude: number;
        ntid: number;
    }
    interface proto_housetablein_res extends IBASE_MESSAGE {
        id: number;
        gameid: number;
        kindid: number;
        ip: string;
        package_key: string;
        version: number;
    }
    interface proto_tableinfo {
        id: number;
    }
    interface proto_tableinfo_res extends IBASE_MESSAGE {
        hid: number;
        fid: number;
        tid: number;
        ntid: number;
        maxplayernum: number;
        roundnum: number;
        currentround: number;
        person: Array<{
            id: number;
            nickname: string;
            imgurl: string;
            ip: string;
            online: boolean;
            partner: string;
        }>;
        begin: boolean;
    }
    interface proto_housetableinfobyuid extends IBASE_HOUSEREQ {
        uid: number;
    }
    interface proto_housetableinfobyuid_res extends IBASE_MESSAGE {
        hid: number;
        fid: number;
        tid: number;
        ntid: number;
        maxplayernum: number;
        roundnum: number;
        currentround: number;
        person: Array<{
            id: number;
            nickname: string;
            imgurl: string;
            ip: string;
            online: boolean;
            partner: string;
        }>;
    }
    interface proto_tabledel extends IBASE_HOUSEREQ {
        id: number;
        fid: number;
    }
    interface proto_htinvite_ack extends IBASE_HOUSEREQ {
        tid: number;
        inviter: number;
        agree: boolean;
        notips: boolean;
    }
    interface proto_housetableupdate_ntf extends IBASE_MESSAGE {
        ntid: number;
        tid: number;
        trule: {
            playernum: number;
            roundnum: number;
            kindid: number;
        };
        tmemitems: Array<{
            uid: number;
            uname: string;
            uurl: string;
            ugender: number;
            online: boolean;
        }>;
        begin: boolean;
        step: number;
        deleted: boolean;
    }
    interface proto_tableuserkick {
        tid: number;
        uid: number;
    }
}
