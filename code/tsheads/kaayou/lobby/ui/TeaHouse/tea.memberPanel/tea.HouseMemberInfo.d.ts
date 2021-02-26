declare namespace tea {
    class HouseMemberInfoManager {
        static __INS__: HouseMemberInfoManager;
        _zOrder: number;
        __selfDialog: HouseMemberInfo;
        static getInstance(_zOrder?: number): HouseMemberInfoManager;
        HouseMemberInfo: tea.HouseMemberInfo;
        init(): boolean;
        getPanel(create?: boolean): HouseMemberInfo;
    }
    class HouseMemberInfo extends kaayou.ModelLayer {
        constructor();
        bCreate: boolean;
        bAdmin: boolean;
        bBlackList: boolean;
        bCPAdmin: boolean;
        bNoGame: boolean;
        bPartner: boolean;
        isSelfMember: boolean;
        isSelf: boolean;
        isVicePartner: boolean;
        btnAdmin: ccui.Button;
        btnAdminDisable: ccui.Button;
        btnBlackList: ccui.Button;
        btnBlackListDisable: ccui.Button;
        btnClose: ccui.Button;
        RoleAdminButton: ccui.Button;
        RoleAdminButtonDisable: ccui.Button;
        btnModify: ccui.Button;
        btnNoGame: ccui.Button;
        btnNoGameDisable: ccui.Button;
        btnPartner: ccui.Button;
        btnPartnerDisable: ccui.Button;
        btnVicePartner: ccui.Button;
        btnVicePartnerDisable: ccui.Button;
        head_image: ccui.ImageView;
        label_name: ccui.Text;
        label_ID: ccui.Text;
        label_join: ccui.Text;
        label_remark: ccui.Text;
        lbTiredValue: ccui.Text;
        _data: Data_HouseMemberItem;
        authMemberInfo(): void;
        initUI(): void;
        RoleWatch(): void;
        RoleUnWatch(): void;
        Show(data: Data_HouseMemberItem): void;
        setUILayout(): void;
        setUi(data: any): void;
        Hide(): void;
    }
}
