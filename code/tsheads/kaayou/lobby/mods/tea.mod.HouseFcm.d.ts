declare namespace tea {
    interface ITH_DATA_FCMPlayerRecord {
        items: Array<FCMPlayerRecordItem>;
    }
    interface FCMPlayerRecordItem {
        id: number;
        aftvitamin: number;
        befvitamin: number;
        change_vitamin: number;
        opt_name: string;
        opt_type: string;
        updatedtime: number;
        uid: number;
        index: number;
    }
    interface partberFloorHistoryDetaiItem {
        uid: number;
        uname: string;
        uurl: string;
        ugender: number;
        validtimes: number;
        bigvalidtimes: number;
        roundprofit: number;
        subordinateprofit: number;
        totalprofit: number;
        royalty: number;
        isjunior: boolean;
        changeprofit: number;
    }
    interface ITH_DATA_FCMCOUNT {
        items: Array<Data_HouseCountItem>;
    }
    interface Data_HouseCountItem {
        beginat: number;
        endat: number;
        vitamincost: number;
        vitaminleft: number;
        vitaminminus: number;
        daytype: number;
        vitaminpayment: number;
    }
    interface Data_FcmWarehouseRes {
        items: Array<FCMPlayerRecordItem>;
        total: number;
        pool_left: number;
        pool_used: number;
        wait_join: number;
        total_count: number;
        last_should_pay: number;
        last_paied: number;
        earn_sum: number;
    }
    interface Data_HousePartnerCountItem {
        uid: number;
        uname: string;
        uurl: string;
        ugender: number;
        vitamincost: number;
        vitaminleft: number;
        vitaminminus: number;
        vitaminwinlose: number;
        belong: number;
        dayType: number;
    }
    interface Data_HousePartnerTotalInfo {
        totalvitamincost: number;
        totalvitamincostbw: number;
        totalvitamincostround: number;
        totalvitaminleft: number;
        totalvitaminminus: number;
        totalvitaminwinlose: number;
    }
    namespace mod {
        class Fcm {
            static __INS__: tea.mod.Fcm;
            static getInstance(): tea.mod.Fcm;
            initMod(): void;
            _fcmPlayerFcmRecordBegan: number;
            __fcmPlayerFcmRecordList: Array<FCMPlayerRecordItem>;
            getPlayerFcmRecord(data: {
                uid: number;
                clear: boolean;
            }): Promise<void>;
            /**-------------------------------------------------------------防沉迷设置  -------------------------------------------------------------------- */
            /**-------------------------------------------------------------生效范围  -------------------------------------------------------------------- */
            /**-------------------------------------------------------------比赛分管理  -------------------------------------------------------------------- */
            /**-------------------------------------------------------------比赛分统计  -------------------------------------------------------------------- */
            doResetFcmCount(): Promise<void>;
            _fcmCountDayType: number;
            _fcmCountList: Array<Data_HouseCountItem>;
            _fcmCountBegan: number;
            _fcmCounttalnum: number;
            dogetFcmCountList(data: {
                daytype: number;
                clear: boolean;
            }): Promise<void>;
            /**-------------------------------------------------------------比赛分仓库  -------------------------------------------------------------------- */
            doWareHouseRw(data: {
                value: number;
            }): Promise<void>;
            _fcmeachCount: number;
            _fcmWhStart: number;
            _fcmWhtotle: number;
            doGetWarehouseList(data: {
                page: number;
                clear: boolean;
            }): Promise<void>;
            /**-------------------------------------------------------------队长统计  -------------------------------------------------------------------- */
            _fcmPartnerCountSortType: number;
            _fcmPartnerCountDayType: number;
            _fcmPartnerCountList: Array<Data_HousePartnerCountItem>;
            _fcmPartnerCountBegan: number;
            _fcmPartnerCountKeyWord: string;
            _fcmPartnerCounttalnum: number;
            lstPartner: Array<Data_HousePartnerCountItem>;
            _fcmPartnerSumInfo: Data_HousePartnerTotalInfo;
            doGetStateList(data: {
                param: string;
                daytype: number;
                sorttype: number;
                clear: boolean;
                partner: number;
                isPop?: boolean;
            }): Promise<void>;
            setTiredValue(data: proto_housevitaminset): Promise<void>;
            Give(data: proto_housevitaminsend): Promise<void>;
            onHouseVitaminSet(data: any): void;
            getAntiIndulgence(data: IBASE_HOUSEREQ): Promise<void>;
            setAntiIndulgence(data: proto_housevitaminvalues): Promise<void>;
            _fcmMemberList: any[];
            getTiredMember(data: IBASE_HOUSEREQ): Promise<void>;
            clearFcm(data: IBASE_HOUSEREQ): Promise<void>;
            showDeletedFloorHistory(): Promise<void>;
            _deletedDetailBegan: number;
            _deletedDetailList: Array<partberFloorHistoryDetaiItem>;
            getdeletedDetailList(data: {
                dfid: number;
                fid: number;
                clear: boolean;
            }): Promise<void>;
            onHouseVitaminStatus(info: any): void;
        }
    }
}
