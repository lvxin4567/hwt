declare namespace lobby {
    class TopMenuBlock extends kaayou.Layer {
        btnLocation: ccui.Button;
        btn_setting: ccui.Button;
        btn_suggestion: ccui.Button;
        reddot: ccui.ImageView;
        btn_Notice: ccui.Button;
        lbLocation: ccui.Text;
        menuLayout: ccui.Layout;
        image_LobbyAera_Title: cc.Sprite;
        constructor();
        initUI(): void;
        onConfigUpdate(): void;
        onShowRealNameBtn(): void;
        onCityRefresh(data: any): void;
    }
}
