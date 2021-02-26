declare namespace tea {
    namespace mod {
        class HousePartner {
            static __INS__: tea.mod.HousePartner;
            static getInstance(): tea.mod.HousePartner;
            initMod(): void;
            getMyConfig(): Promise<void>;
            GetPatnerGroupList(): Promise<void>;
            addPatnerGroupList(): Promise<void>;
            deletedPatnerGroupList(data: {
                group_id: number;
            }): Promise<void>;
            __GroupMemberList: Array<memberNotInGroupItem>;
            __GroupmemberParam: string;
            __Groupmemtotalnum: number;
            __GroupmemberBegan: number;
            __Grouptotalnum: number;
            __Grouponlinenum: number;
            partnerGroupMemberList(data: {
                param: string;
                group_id: number;
                clear: boolean;
            }): Promise<void>;
            AddMemToList(data: {
                group_id: number;
                uid: number;
            }): Promise<void>;
            removeMemFromList(data: {
                group_id: number;
                uid: number;
            }): Promise<void>;
            __NoUnionList: Array<any>;
            __NoUnionParam: string;
            __NoUnionBegan: number;
            __NoUnionfid: number;
            partnerNoUnionList(data: {
                param: string;
                fid: number;
                daytype: number;
                clear: boolean;
                partnerlevel: number;
                querytimeinterval: number;
                querytimerange: number;
                lowscoreflag: number;
                roundtype: number;
                likeflag: number;
            }): Promise<void>;
        }
    }
}
