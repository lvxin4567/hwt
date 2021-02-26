
/**
 * 
 * 权限设置
 */

namespace lobby {
    const { BindEvent, doBindEvent } = kaayou._decorator;
    export class lobby_authSettingMgr {
        static __INS__: lobby_authSettingMgr = null;
        static getInstance(_zOder:number) {
            if (lobby_authSettingMgr.__INS__ == null) {
                lobby_authSettingMgr.__INS__ = new lobby_authSettingMgr();
                lobby_authSettingMgr.__INS__.init();
                lobby_authSettingMgr.__INS__._zOder = _zOder
            }
            return lobby_authSettingMgr.__INS__;
        }
        __selfPanel: authSettingPanel = null;
        _zOder:number = 0;
        init() {
            let self = this;
            this.__selfPanel = null;
            kaayou.getController('lobby').on('ui::authSetting::Show', function (e: kaayou.Event) {
                self.getPanel(true).show();
            }, this, 10);
            kaayou.getController('lobby').on('ui::authSetting::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).onHide();
            }, this, 10);
            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new authSettingPanel();
                kaayou.UIManager.getInstance().getMainScene().addChild(this.__selfPanel,this._zOder);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }

    }


    export class authSettingPanel extends kaayou.Layer {
        maskBg: cc.Layer = null;
        btn_close: ccui.Button = null;
        img_img_auth: ccui.ImageView = null;
        img_pri:ccui.ImageView = null;
        img_mic:ccui.ImageView = null;
        img_file:ccui.ImageView = null;
        btn_set:ccui.Button = null;
        btn_set1:ccui.Button = null;
        btn_set2:ccui.Button = null;
        btn_set3:ccui.Button = null;
        constructor() {
            super();
            this.initUI();
        }
        initUI() {
            this.initWithccs(lobby.res.authSettingPanel_json);
            let self = this;
            this.maskBg = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "maskbg");
            this.btn_close = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_close");
            // this.btn_bind = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_copy");
            this.btn_close.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.onHide();
            }, this)
            this.img_img_auth = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "img_auth");
            this.img_img_auth.on(kaayou.TouchEvent.TouchEnd, this.tipTouchEnd, this);
            this.img_img_auth.on(kaayou.TouchEvent.TouchCance, this.tipTouchcancle, this);
            this.img_img_auth.on(kaayou.TouchEvent.TouchStart, this.tipTouchStart, this);

            this.img_pri = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "img_pri");
            this.img_pri.on(kaayou.TouchEvent.TouchEnd, this.tipTouchEnd, this);
            this.img_pri.on(kaayou.TouchEvent.TouchCance, this.tipTouchcancle, this);
            this.img_pri.on(kaayou.TouchEvent.TouchStart, this.tipTouchStart, this);

            this.img_mic = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "img_mic");
            this.img_mic.on(kaayou.TouchEvent.TouchEnd, this.tipTouchEnd, this);
            this.img_mic.on(kaayou.TouchEvent.TouchCance, this.tipTouchcancle, this);
            this.img_mic.on(kaayou.TouchEvent.TouchStart, this.tipTouchStart, this);

            this.img_file = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "img_file");
            this.img_file.on(kaayou.TouchEvent.TouchEnd, this.tipTouchEnd, this);
            this.img_file.on(kaayou.TouchEvent.TouchCance, this.tipTouchcancle, this);
            this.img_file.on(kaayou.TouchEvent.TouchStart, this.tipTouchStart, this);

            this.btn_set = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_set");
            this.btn_set.on(kaayou.TouchEvent.TouchEnd, this.toset, this);
            this.btn_set1 = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_set1");
            this.btn_set1.on(kaayou.TouchEvent.TouchEnd, this.toset, this);
            this.btn_set2 = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_set2");
            this.btn_set2.on(kaayou.TouchEvent.TouchEnd, this.toset, this);
            this.btn_set3 = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_set3");
            this.btn_set3.on(kaayou.TouchEvent.TouchEnd, this.toset, this);
            self.onHide();
        }

        toset(){
            kaayou.PlatformMgr.getInstance().sys.jumpAppSetting();
        }

        tipTouchEnd(e: kaayou.TouchEvent) {
            console.log(e);
            e.target.getChildByName("tip_image").setVisible(false);
        }

        tipTouchStart(e: kaayou.TouchEvent) {
            e.target.getChildByName("tip_image").setVisible(true);
        }

        tipTouchcancle(e: kaayou.TouchEvent) {
            e.target.getChildByName("tip_image").setVisible(false);
        }

        show() {
            this.setVisible(true);
        }
        onHide() {
            this.setVisible(false);
        }




    }
}