namespace lobby {
    export enum pakeageHead {
        areagamemain = "areagamemain",
        areagameseek = "areagameseek",
        housegamelist = "housegamelist",
    }

    export interface IPackageItem {
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

    export interface IGameItem {
        package_key:string,
        package_name:string,
        package_version:string,
        name:string,
        icon:string,
        kind_id:number,
        game_rule_version:number,
        client_version:number,
        recomm_version:number,
        forced_version:number,
        game_engine:number
    }



    export interface proto_areagameseek{
        code: string, 
        keyword: string,
        type: string ,
        package_type : number
    }

    export interface proto_areagameseek_res extends IBASE_MESSAGE{
        keyword:string,
        type:number,
        code:string,
        package_type:number,
        packages:Array<IGameItem>
    }

    export interface proto_housegamelist{
        hid:number,
    }

    export interface proto_housegamelist_res extends IBASE_MESSAGE{
        keyword:string,
        type:number,
        code:string,
        package_type:number,
        packages:Array<IGameItem>
    }    




}