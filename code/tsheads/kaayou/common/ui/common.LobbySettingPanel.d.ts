declare namespace common {
    class LobbySettingPanel extends kaayou.Layer {
        btnCheck: ccui.Button;
        btnExit: ccui.Button;
        maskBg: cc.Layer;
        contentPanel: ccui.Layout;
        btn_close: ccui.Button;
        img_music: ccui.ImageView;
        img_effect: ccui.ImageView;
        btn_change: ccui.Button;
        label_version: ccui.Text;
        img_updatePoint1: ccui.ImageView;
        img_updatePoint2: ccui.ImageView;
        isMusic: boolean;
        isEffect: boolean;
        imgOffName: string;
        imgOnName: string;
        btn_auto: ccui.ImageView;
        btn_logout: ccui.ImageView;
        btn_privace: ccui.ImageView;
        btn_agreement: ccui.ImageView;
        constructor();
        initUI(): void;
        onMusicChange(e: kaayou.CheckEvent): void;
        doMusicChange(): void;
        onEffectChange(e: kaayou.CheckEvent): void;
        doEffectChange(): void;
        btnCall: Array<Function>;
        close_call: Function;
        show(data: any): void;
        onHide(): void;
    }
}
