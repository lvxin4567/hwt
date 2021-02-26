declare namespace tea {
    interface ITH_DATA_MEM_STATE_ITEM {
        index?: number;
        uid: number;
        uname: string;
        uurl: string;
        ugender: number;
        ujointime: number;
        playtimes: number;
        bwtimes: number;
        totalscore: number;
    }
    namespace mod {
        class HouseState {
            static __INS__: tea.mod.HouseState;
            static getInstance(): tea.mod.HouseState;
            initMod(): void;
            __memberStateSortType: number;
            __memberStateDayType: number;
            __memberStateList: Array<Data_HouseMemberStatItem>;
            __memberStateBegan: number;
            __memberStateParam: string;
            __memStatetotalnum: number;
            __memberStateFloor: number;
            __memberStateGroup: number;
            lstPartner: Array<Data_HouseMemberStatItem>;
            doGetStateList(data: {
                dfid: number;
                param: string;
                daytype: number;
                sorttype: number;
                clear: boolean;
                partner: number;
                group_id: number;
                RecordType: number;
                timeInterval?: number;
                timeRange?: number;
                likeFlag?: number;
                lowscoreflag: number;
                roundtype: number;
            }): Promise<void>;
            getPartnerList(data: {
                param: string;
                daytype: number;
                sorttype: number;
                clear: boolean;
                dfid: number;
            }): Promise<void>;
            clickGameLike(config: {
                callback: Function;
                data: proto_houserecordgamelike;
            }): Promise<void>;
            clickMemberLike(config: {
                callback: Function;
                data: proto_houserecorduserlike;
            }): Promise<void>;
            getPartnerMemberStatisticsTotal(data: proto_memberstatisticstotal): Promise<void>;
        }
    }
}
