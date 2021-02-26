declare namespace lobby {
    class UserInfoBlock extends kaayou.Layer {
        lable_name: ccui.Text;
        lable_id: ccui.Text;
        img_head: cc.Sprite;
        layout_user_info: ccui.Layout;
        layout_head: ccui.Layout;
        lable_card: ccui.Text;
        btn_addcard: ccui.Button;
        btn_save: ccui.Button;
        label_gold: ccui.Text;
        label_diamond: ccui.Text;
        glod_layout: ccui.Layout;
        card_layout: ccui.Layout;
        constructor();
        initUI(): void;
        onUpdateUserInfo(data: Data_Uerinfo): void;
        onConfigUpdate(): void;
    }
}
