declare namespace tea {
    namespace mod {
        class HouseActivity {
            static __INS__: tea.mod.HouseActivity;
            static getInstance(): tea.mod.HouseActivity;
            initMod(): void;
            onSubmitAct(data: Data_ActivityCreate): Promise<void>;
            GetActList(): Promise<void>;
            GetActData(actid: number): Promise<void>;
            deleteAct(data: proto_houseactivityinfo): Promise<void>;
            houseluckconfig(data: Data_HouseLuckSet): Promise<void>;
            __memberList: Array<Data_floorVipInfo>;
            __memberBegan: number;
            __memberParam: string;
            __memtotalnum: number;
            __memberList2: Array<Data_floorVipInfo>;
            __memberBegan2: number;
            __memberParam2: string;
            __memtotalnum2: number;
            getPartnerMember(data: {
                param: string;
                fid: number;
                clear: boolean;
                is_vip: boolean;
            }): Promise<void>;
            setPartnerMember(data: proto_housefloorsetvipuser): Promise<void>;
            changeSetVipUpdate(data: proto_housefloorsetvipuser): Promise<void>;
            housefloorsetallvipuser_ntf(data: any): Promise<void>;
        }
    }
}
