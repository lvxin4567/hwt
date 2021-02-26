declare namespace tea {
    class tea_TeaSettingPanelMgr {
        static __INS__: tea_TeaSettingPanelMgr;
        static getInstance(): tea_TeaSettingPanelMgr;
        __selfPanel: SettingMenuPanel;
        _data: tea.Data_HouseInfo;
        init(): boolean;
        getPanel(create?: boolean): SettingMenuPanel;
    }
    class SettingMenuPanel extends kaayou.ModelLayer {
        _data: any;
        btnDistance: ccui.Button;
        btnEffective: ccui.Button;
        btnMerge: ccui.Button;
        btnNoDeskmate: ccui.Button;
        btnTime: ccui.Button;
        layout_setmenu_panel: ccui.Layout;
        lay_meun: ccui.ScrollView;
        btnMix: ccui.Button;
        btn_blacklist: ccui.Button;
        btn_secret: ccui.Button;
        btn_froze: ccui.Button;
        btn_unfroze: ccui.Button;
        ivCPAdmin: ccui.ImageView;
        admin_Title: ccui.ImageView;
        creator_Title: ccui.ImageView;
        partner_Title: ccui.ImageView;
        vice_partner_Title: ccui.ImageView;
        btn_qyqSetManager: ccui.Button;
        player_title: ccui.ImageView;
        btn_JoinSet: ccui.Button;
        btn_AuthPower: ccui.Button;
        btn_showTable: ccui.Button;
        btn_bgSet: ccui.Button;
        btn_tableBgSet: ccui.Button;
        constructor();
        initUI(): void;
        onTeaHouseUpdateInfo(data: tea.Data_HouseInfo): void;
        Show(data: tea.Data_HouseInfo): void;
        Hide(): void;
    }
}
