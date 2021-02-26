declare namespace tea {
    interface Data_HosueFloorInfo {
        level: number;
        richRule: common.mod.Data_Game_Package_RichItem;
        floorItem: Data_HosueListFloorItem;
        tableCount: number;
        tableMin: number;
        autoCount?: number;
        autoTableCount?: number;
    }
    interface Data_HosueFtableItems {
        /**@description 匿名时桌子编号 */
        atid: number;
        fid: number;
        ntid: number;
        tid: number;
        tmemitems: Array<ITeaTableUserIn>;
        trule: Data_HosueFrule;
        kname?: string;
        package_key?: string;
        begin: boolean;
        step: number;
        total_round: number;
        showdis?: boolean;
    }
    interface Data_HosueFloorBaseInfo {
        is_mix: boolean;
        fid: number;
        frule: Data_HosueFrule;
        kname: string;
        package_key: string;
        ftableitems: Array<Data_HosueFtableItems>;
        errcode?: number;
        msg?: string;
    }
    type FloorHashMap = {
        [fid: string]: Data_HosueFloorInfo;
    };
    type FloorUpdateInfo = {
        fid: number;
        floorMap: FloorHashMap;
    };
    namespace mod {
        class HouseFloor {
            static __INS__: tea.mod.HouseFloor;
            static getInstance(): tea.mod.HouseFloor;
            initMod(): void;
            doGetFloorInfo(): Promise<void>;
            doChangeFloor(data: {
                fid: number;
                showToast?: boolean;
            }): Promise<void>;
            doSetCreate(data: {
                fid: number;
            }): Promise<void>;
            doChangeFloorRule(data: {
                kindid: number;
                configData: any;
                ruleVersion: string;
                fid: number;
            }): Promise<void>;
            doSetOnlyShow(data: {
                fid: number;
            }): Promise<void>;
            doShowCreate(): Promise<void>;
            doCreateFloor(data: {
                kindid: number;
                configData: any;
                ruleVersion: string;
            }): Promise<void>;
            getFloorId(level: number): number;
            onCreateFloor_Ntf(data: proto_housefloorcreate_ntf_res): Promise<void>;
            doDeleteFloor(data: {
                fid: number;
            }): Promise<void>;
            addMixTable(data: proto_housemixfloortablechange): Promise<void>;
            Housefloorhideimg(data: {
                fid: number;
                ishide: boolean;
            }): Promise<void>;
            rename(data: proto_housefloorrename): Promise<void>;
            housefloorsetallvipuser(data: proto_housefloorsetallvipuser): Promise<void>;
            GetVipFloorList(data: IBASE_HOUSEREQ): Promise<void>;
            onDeleteFloor_Ntf(data: proto_housefloordelete): Promise<void>;
            onChangeFloor_Ntf(data: any): Promise<void>;
            onMixTableChange(): Promise<void>;
            onFzbFullTableCountShow(data: {
                hid: number;
                count: number;
            }): Promise<void>;
            onRename(): Promise<void>;
            onSetVIP(): Promise<void>;
            onSetFloorHead(data: any): Promise<void>;
        }
    }
}
