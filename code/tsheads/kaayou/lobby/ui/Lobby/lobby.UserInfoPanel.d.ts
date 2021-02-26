declare namespace lobby {
    class UserInfoPanelMgr {
        static __INS__: UserInfoPanelMgr;
        static getInstance(_zOrder?: number): UserInfoPanelMgr;
        __selfPanel: UserInfoPanel;
        _data: Data_Uerinfo;
        _zOrder: number;
        init(): boolean;
        getPanel(create?: boolean): UserInfoPanel;
    }
    class UserInfoPanel extends kaayou.Layer {
        maskBg: cc.Layer;
        contentPanel: ccui.Layout;
        lable_name: ccui.Text;
        lable_id: ccui.Text;
        lable_tel_r: ccui.ImageView;
        lable_tel: ccui.Text;
        btn_tel: ccui.Button;
        btn_Unbinde_tel: ccui.Button;
        lable_wx_r: ccui.ImageView;
        lable_wx: ccui.Text;
        lable_certification_r: ccui.ImageView;
        lable_certification: ccui.Text;
        btn_certification: ccui.Button;
        layout_head: ccui.Layout;
        img_head: cc.Sprite;
        btn_logout: ccui.Button;
        label_LoginType: ccui.Text;
        layout_user_type: ccui.Layout;
        btnPartner: ccui.Button;
        topbarMgr: lobby.TopBarMgr;
        userUpLoadImage: ccui.ImageView;
        uploadImage_Btn: ccui.Button;
        _data: Data_Uerinfo;
        inviteSwitch_layout: ccui.Layout;
        inviteSwitch_radioGroup: common.RadioGroup;
        sexChange_layout: ccui.Layout;
        sexChange_radioGroup: common.RadioGroup;
        constructor();
        initUI(): void;
        onInviteSwitch(e: kaayou.RadioEvent): void;
        onSexChangeSwitch(e: kaayou.RadioEvent): void;
        _isCanShow: boolean;
        _isCanCertification: boolean;
        onConfigUpdate(): void;
        uploadMyQr(): void;
        Show(): void;
        onEditDscription(des: string): void;
        reset(): void;
        onPartnerButtonClick(): void;
        onUpdateUserInfo(data: Data_Uerinfo): void;
        Hide(): void;
    }
}
