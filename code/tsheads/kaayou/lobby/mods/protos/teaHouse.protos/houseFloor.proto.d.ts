declare namespace tea {
    export enum houseFloorHeadMsg {
        housefloorlist = "housefloorlist",
        housememberin = "housememberin",
        housefloorrulemodify = "housefloorrulemodify",
        housefloorcreate = "housefloorcreate",
        housefloorcreate_ntf = "housefloorcreate_ntf",
        housefloordelete = "housefloordelete",
        housemixfloortablechange = "housemixfloortablechange",
        housefloorhideimg = "housefloorhideimg",
        housefloorrename = "housefloorrename",
        housevipfloorget = "housevipfloorget",
        housefloorsetallvipuser = "housefloorsetallvipuser"
    }
    export interface proto_housefloorlist_res extends IBASE_MESSAGE {
        items: Array<Data_HosueListFloorItem>;
    }
    export interface Data_HosueListFloorItem {
        fid: number;
        frule: Data_HosueFrule;
        imageurl: string;
        is_mix: boolean;
        is_vip: boolean;
        kindname: string;
        name: string;
        packagename: string;
        table_num: number;
        table_default: number;
        hideimg?: boolean;
    }
    export interface Data_HosueFrule {
        costtype: number;
        gameconfig: string;
        gps: boolean;
        kindid: number;
        playernum: number;
        restrict: string;
        roundnum: number;
        fewerbegin: string;
        version: number;
        recommend_version: number;
    }
    export interface proto_housememberin extends IBASE_HOUSEREQ {
        fid: number;
        need_mix: boolean;
    }
    export interface proto_housefloorsetallvipuser extends IBASE_HOUSEREQ {
        fid: number;
        is_vip: boolean;
    }
    export interface proto_housememberin_res {
        fid: number;
        m_num: number;
        t_num: number;
        ftableitems: Array<I_FloorTableItem>;
    }
    interface I_FloorTableItem {
        /**@description 匿名时桌子编号 */
        atid: number;
        begin: boolean;
        canwatch: boolean;
        deleted: boolean;
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
            ready: boolean;
        }>;
        step: number;
        watchericons: Array<string>;
    }
    export interface proto_housefloorrulemodify extends IBASE_HOUSEREQ {
        fid: number;
        frule: proto_houseFrule;
    }
    interface proto_houseFrule {
        costtype: number;
        fewerstart: string;
        gameconfig: string;
        gps: boolean;
        kindid: number;
        playernum: number;
        restrict: string;
        roundnum: number;
        version: number;
    }
    export interface proto_housefloorcreate extends IBASE_HOUSEREQ {
        frule: {
            gameconfig: string;
            gps: boolean;
            kindid: number;
            restrict: string;
            roundnum: number;
            version: number;
        };
    }
    export interface proto_housefloorcreate_ntf_res extends IBASE_MESSAGE {
        hid: number;
        fid: number;
        imageurl: string;
        kindname: string;
        packagename: string;
        frule: {
            costtype: number;
            gameconfig: string;
            gps: boolean;
            kindid: number;
            playernum: number;
            restrict: string;
            roundnum: number;
            fewerstart: string;
            version: number;
            recommend_version: number;
        };
    }
    export interface proto_housefloordelete extends IBASE_HOUSEREQ {
        fid: number;
    }
    export interface proto_housemixfloortablechange extends IBASE_HOUSEREQ {
        detail: Array<{
            fid: number;
            table_num: number;
        }>;
    }
    export interface proto_housefloorhideimg extends IBASE_HOUSEREQ {
        fid: number;
        ishide: boolean;
    }
    export interface proto_housefloorrename extends IBASE_HOUSEREQ {
        floor_id: number;
        name: string;
    }
    export {};
}
