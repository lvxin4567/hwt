declare namespace tea {
    class TopMenuBlock extends kaayou.Layer {
        bActivity: boolean;
        bCardPool: boolean;
        bLuck: boolean;
        btnActivity: ccui.Button;
        btnGive: ccui.Button;
        btnInvite: ccui.Button;
        btnMatch: ccui.Button;
        btnMessageBox: ccui.Button;
        ivLuckPoint: ccui.ImageView;
        ivTired: ccui.ImageView;
        lbTired: ccui.Text;
        leftMenuGroup: ccui.Layout;
        rightMenuGroup: ccui.Layout;
        centerMenuGroup: ccui.Layout;
        left_menuBlock_layout: ccui.Layout;
        constructor();
        authTop(): void;
        initUI(): void;
        btn_close: ccui.Button;
        btn_help: ccui.Button;
        hid_label: ccui.Text;
        curOnline_label: ccui.Text;
        btn_fcmRecord: ccui.Button;
        inviteLayout: ccui.Layout;
        btn_copyCode: ccui.Layout;
        _partnerInviteCode: string;
        initLeft(): void;
        btnShare: ccui.Button;
        btn_set: ccui.Button;
        ivCardPool: ccui.ImageView;
        ivCircle: ccui.ImageView;
        initRight(): void;
        btn_tea_edit: ccui.ImageView;
        label_title: ccui.Text;
        initCenter(): void;
        onTeaHouseUpdateInfo(data: tea.Data_HouseInfo): void;
        onShowInvited(data: {
            invitCode: string;
        }): void;
        dosetAcStatus(data: {
            status: boolean;
        }): void;
        setLuckStatus(data: {
            status: boolean;
        }): void;
        doUpdateOnline(data: any): void;
        hideHID(data: any): void;
        hideOnlineCount(data: any): void;
        blinkActivity(): void;
        _getOnlineTime: number;
        update(): void;
    }
}
