/**
 *
 * 权限设置
 */
declare namespace lobby {
    class lobby_authSettingMgr {
        static __INS__: lobby_authSettingMgr;
        static getInstance(_zOder: number): lobby_authSettingMgr;
        __selfPanel: authSettingPanel;
        _zOder: number;
        init(): boolean;
        getPanel(create?: boolean): authSettingPanel;
    }
    class authSettingPanel extends kaayou.Layer {
        maskBg: cc.Layer;
        btn_close: ccui.Button;
        img_img_auth: ccui.ImageView;
        img_pri: ccui.ImageView;
        img_mic: ccui.ImageView;
        img_file: ccui.ImageView;
        btn_set: ccui.Button;
        btn_set1: ccui.Button;
        btn_set2: ccui.Button;
        btn_set3: ccui.Button;
        constructor();
        initUI(): void;
        toset(): void;
        tipTouchEnd(e: kaayou.TouchEvent): void;
        tipTouchStart(e: kaayou.TouchEvent): void;
        tipTouchcancle(e: kaayou.TouchEvent): void;
        show(): void;
        onHide(): void;
    }
}
