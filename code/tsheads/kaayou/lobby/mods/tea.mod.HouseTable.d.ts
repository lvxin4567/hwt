declare namespace tea {
    interface ITeaTabelCreate {
        /**@description 匿名时桌子编号*/
        atid: number;
        hid: number;
        fid: number;
        ntid: number;
        tid: number;
    }
    interface ITeaTabelDel {
        hid: number;
        fid: number;
        ntid: number;
        trule?: Data_HosueFrule;
    }
    export interface ITeaTableUserIn {
        hid: number;
        fid: number;
        ntid: number;
        nuid: number;
        uid: number;
        uname: string;
        urole?: number;
        uremark: string;
        uurl: string;
        ugender: number;
        online: boolean;
        ready: boolean;
    }
    export interface ImainTableinfo {
        canwatch: false;
        fid: number;
        gameName: string;
        hid: number;
        isMix: boolean;
        trule: any;
        ismain: boolean;
        matchIngnum: number;
        fullNum: number;
        players: {
            [key: string]: ITeaTableUserIn;
        };
    }
    interface ITeaTabelUserOut {
        hid: number;
        fid: number;
        ntid: number;
        nuid: number;
        uid: number;
    }
    export interface ITeaHouseTableItem extends ITeaTabelCreate {
        begin: boolean;
        canwatch: boolean;
        deleted: boolean;
        gameName: string;
        isMix: boolean;
        players: {
            [key: string]: ITeaTableUserIn;
        };
        step: number;
        total_round: number;
        trule: Data_HosueFrule;
        ismain: boolean;
        matchIngnum: number;
        fullNum: number;
        hideimg?: boolean;
        watchericons: Array<string>;
    }
    export interface ITeaHouseTableList {
        [key: string]: ITeaHouseTableItem;
    }
    export namespace mod {
        let __teaHouseTableList: Array<ITeaHouseTableItem>;
        let __teaHouseTableType: string[];
        let __teaHouseMainTableList: ImainTableinfo[];
        class HouseTabel {
            static __INS__: tea.mod.HouseTabel;
            static getInstance(): tea.mod.HouseTabel;
            initMod(): void;
            resetTabel(data: any): void;
            GetUpdateList(data?: {
                clear: boolean;
            }): void;
            /**
             * 1、首先删除没有人的桌子
             * 2、挑选出已经开始的了的和没有开始的桌子
             * 3、清理掉之前自动加桌每层楼没有开始桌子的数量
             * 4、计算每层楼空桌子的数量
             * 5、满足设置的空桌子数量不需要补空桌，不满足的就补充该楼层的空桌子数量
             */
            arrangeAutoAddTable(): any[];
            arrangeTableDataInMatch(): any[];
            domemBerJoinTable(data: {
                fid: number;
                index: number;
                ignorerule: boolean;
            }): Promise<void>;
            teaHouseJoinTable(data: {
                fid: number;
                index: number;
                ignorerule: boolean;
                pakeageKey: string;
                kindid: number;
            }): Promise<void>;
            tablemessage(data: {
                fids: Array<number>;
                acks: any;
            }): void;
            teaHouseTableSetTid(data: ITeaTabelCreate): void;
            teaMemberSit(data: ITeaTableUserIn): void;
            teaMemberOut(data: ITeaTabelUserOut): void;
            getTableDetail(data: any): Promise<void>;
            kickMember(data: proto_tableuserkick): Promise<void>;
            getMemTableDetail(data: any): Promise<void>;
            teaTabledissovle(data: ITeaTabelDel): void;
            delTeahouseTable(data: any): Promise<void>;
            answerInvite(data: proto_htinvite_ack): Promise<void>;
            teahousetableupdate(data: any): Promise<void>;
            onNumberOfGameChange(data: any): Promise<void>;
            onInvite(data: any): Promise<void>;
        }
    }
    export {};
}
