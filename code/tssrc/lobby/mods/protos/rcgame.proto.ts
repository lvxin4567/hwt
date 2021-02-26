namespace lobby{
    export enum rcGameHead {
        areapkgbytid = "areapkgbytid",
        tablecreate = "tablecreate",
        tablein = "tablein",
        areapkgbykid = "areapkgbykid",

    }


    export interface proto_areapkgbytid{
        id:number,
    }

    export interface proto_areapkgbytid_res extends IBASE_MESSAGE{
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
        id:number,
        region:string,
        code:string,
        game_engine:number,
    }

    export interface proto_tablecreate_res extends IBASE_MESSAGE{
        id:number,
        gameid:number,
        kindid:number,
        ip:string,
        package_key:string
    }

    export interface proto_tablein{
        address: string
        gps: boolean,
        id: number,
        latitude: number,
        longitude: number,
        seat: number
    }

    export interface proto_tablein_res extends IBASE_MESSAGE{
        id:number,
        gameid:number,
        kindid:number,
        ip:string,
        package_key:string
    }
}