declare namespace lobby {
    class BottomMeunBlock extends kaayou.Layer {
        constructor();
        btn_menu_store: ccui.Layout;
        btn_menu_record: ccui.Layout;
        btn_menu_share: ccui.Layout;
        btn_menu_cs: ccui.Layout;
        btn_menu_realName: ccui.Layout;
        btn_menu_recruit: ccui.Layout;
        btn_menu_bind: ccui.Layout;
        btn_reporting: ccui.Button;
        btn_menu_greengame: ccui.Layout;
        ivSignInRedPoint: ccui.ImageView;
        lay_meunLayout: ccui.Layout;
        lySignIn: ccui.Layout;
        initUI(): void;
        onConfigUpdate(): void;
        onUserUpdate(data: Data_Uerinfo): void;
        showRedPoint(data: proto_task_checkin_ntf_res): void;
        doBtnLayout(): void;
    }
}
