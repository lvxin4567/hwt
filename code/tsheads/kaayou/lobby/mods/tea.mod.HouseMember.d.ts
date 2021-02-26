/// <reference path="protos/teaHouse.protos/houseMember.proto.d.ts" />
declare namespace tea {
    interface Data_MatchScoreMemberItem {
        uid: number;
        uname: string;
        uurl: string;
        ugender: number;
        urole: number;
        ispartner: boolean;
        curvitamin: number;
        prenodevitamin: number;
        vitaminwinlosecost: number;
        vitaminplaycost: number;
        vitamincostround: number;
        vitamincostbw: number;
        isjunior: boolean;
        vitamin_admin: boolean;
        vice_partner: boolean;
        upartner: number;
        VitaminWinLoseCostInt: number;
        VitaminPlayCostInt: number;
        VitaminCostRoundInt: number;
        VitaminCostBWInt: 0;
    }
    interface roleAuthPowerList {
        acceptTotea: boolean;
    }
    namespace mod {
        function _getRolePowerInIndex(roleStr: string, i: number): number;
        class HouseMember {
            static __INS__: tea.mod.HouseMember;
            static getInstance(): tea.mod.HouseMember;
            initMod(): void;
            _matchPointList: Array<Data_MatchScoreMemberItem>;
            __totalnum: number;
            __onlinenum: number;
            __limit_user_num: number;
            __memberList: Array<Data_HouseMemberItem>;
            __memberBegan: number;
            __memberParam: string;
            __memtotalnum: number;
            __memberList2: Array<Data_HouseMemberItem>;
            __memberBegan2: number;
            __memberParam2: string;
            __memtotalnum2: number;
            doGetMemberList(data: {
                param: string;
                clear: boolean;
                sorttype: number;
                listType: number;
            }): Promise<void>;
            getNoDeskmateMember(data: {
                param: string;
                group_id: number;
                clear: boolean;
            }): Promise<void>;
            getPartnerMember(data: {
                param: string;
                pid: number;
                clear: boolean;
                is_bind: boolean;
            }): Promise<void>;
            getTiredMember(data: {
                param: string;
                clear: boolean;
                sorttype: number;
            }): Promise<void>;
            __applyList: Array<Data_HouseMemberItem>;
            __applyBegan: number;
            __applyParam: string;
            __applytotalnum: number;
            doGetApplyList(data: {
                param: string;
                clear: boolean;
            }): Promise<void>;
            getApplyCount(): Promise<void>;
            __blackList: Array<Data_HouseMemberItem>;
            __blackBegan: number;
            __blackParam: string;
            __blacktotalnum: number;
            doGetBlackList(data: {
                param: string;
                clear: boolean;
            }): Promise<void>;
            doCheckMemberAgree(data: {
                uid: number;
                apply_type: number;
            }): Promise<void>;
            doCheckMemberRefused(data: {
                uid: number;
                apply_type: number;
            }): Promise<void>;
            doRemoveMember(data: {
                uid: number;
                joinBlack: boolean;
            }): Promise<void>;
            doRemoveMemberNTF(data: proto_housememberBase): void;
            doInsertToBlackList(data: proto_housememberBase): Promise<void>;
            doDeleteToBlackList(data: proto_housememberBase): Promise<void>;
            doSubPartner(data: {
                "hid": number;
                "junior": number;
                callback: Function;
            }): Promise<void>;
            doSetMemberRole(data: {
                uid: number;
                urole: HouseMemberRole;
                oldurole: HouseMemberRole;
            }): Promise<void>;
            doModifyMemberRoleNtf(data: SetHouseMemberRole): void;
            doModifyMemberRemark(data: ModifyHouseMemberRemark): Promise<void>;
            getTiredRecord(data: any): Promise<void>;
            setCPAdmin(data: proto_housevitadminset): Promise<void>;
            setNoGame(data: proto_houseuserlimitgame): Promise<void>;
            setCaptainNoGame(data: any): Promise<void>;
            setPartner(data: any): Promise<void>;
            setVicePartner(data: any): Promise<void>;
            onVicePartnerModify(data: proto_housevicepartnerset_ntf_res): void;
            setPartnerMember(data: proto_housepartnergen): Promise<void>;
            getNoDeskmateGroup(data: IBASE_HOUSEREQ): Promise<void>;
            addNoDeskmateGroup(data: IBASE_HOUSEREQ): Promise<void>;
            SetEffectInMem2(data: proto_house2ptablelimitnoteffect): Promise<void>;
            addNoDeskmate(data: proto_housememberBase): Promise<void>;
            deleteNoDeskmate(data: proto_housetablelimituserremove): Promise<void>;
            deleteNoDeskmateGroup(data: proto_housetablelimitgroupremove): Promise<void>;
            checkMember(data: any): Promise<void>;
            houseautopaypartner(data: {
                auto_pay: boolean;
            }): Promise<void>;
            offWork({ is_off_work }: {
                is_off_work: any;
            }): Promise<void>;
            offWork_ntf({ is_off_work, hid }: {
                is_off_work: any;
                hid: any;
            }): Promise<void>;
            getAuth(data: any): Promise<void>;
            onHouseSubPartnerCreateNotify(data: any): void;
            onHousePartnerCreateNotify(data: proto_housememberBase): void;
            onHousePartnerDeleteNotify(data: proto_housememberBase): void;
            onCPAdminSetNotify(data: proto_housevitadminset): void;
            onPushMemberIn(data: proto_housememberapply_ntf_res): void;
            onNoGameNotify(data: proto_houseuserlimitgame_ntf_res): void;
            onCaptainNoGameNotify(data: proto_houseuserlimitgame_ntf_res): void;
            onAgree(data: proto_housememberagree_ntf_res): void;
            onReject(data: proto_housememberagree_ntf_res): void;
        }
    }
}
