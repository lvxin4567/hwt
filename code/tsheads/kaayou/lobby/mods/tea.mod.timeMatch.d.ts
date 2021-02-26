declare namespace tea {
    namespace mod {
        class TimeMatch {
            static __INS__: tea.mod.TimeMatch;
            static getInstance(): tea.mod.TimeMatch;
            _data: any[];
            pageStart: number;
            initMod(): void;
            __tmMineSortType: number;
            __tmMineDayType: number;
            __tmMineList: Array<Data_HouseMemberStatItem>;
            __tmMineBegan: number;
            __tmMineParam: string;
            __memStatetotalnum: number;
            __tmMineFloor: number;
            __tmMineGroup: number;
            lstPartner: Array<Data_HouseMemberStatItem>;
            doGetStateList(data: {
                dfid: number;
                param: string;
                daytype: number;
                sorttype: number;
                clear: boolean;
                partner: number;
                group_id: number;
            }): Promise<void>;
            __tmTeamSortType: number;
            __tmTeamDayType: number;
            __tmTeamList: Array<Data_HouseMemberStatItem>;
            __tmTeamBegan: number;
            __tmTeamParam: string;
            __tmTeamtotalnum: number;
            __tmTeamFloor: number;
            __tmTeamGroup: number;
            getPartnerList(data: {
                param: string;
                daytype: number;
                sorttype: number;
                clear: boolean;
                dfid: number;
            }): Promise<void>;
            __rankListSortType: number;
            __rankListDayType: number;
            __rankListList: Array<proto_houserankinfoget_res>;
            __rankListBegan: number;
            __rankListParam: string;
            __rankListtotalnum: number;
            getrankList(data: {
                daytype: number;
                sorttype: number;
                clear: boolean;
                authNum: number;
            }): Promise<void>;
            doRankListGet(data?: {
                isrank: boolean;
            }): Promise<void>;
            doRankListSet(data: {
                rank_round: number;
                rank_winer: number;
                rank_record: number;
                rank_open: boolean;
            }): Promise<void>;
            updateTeaRankOpenStatus(data: any): void;
        }
    }
}
