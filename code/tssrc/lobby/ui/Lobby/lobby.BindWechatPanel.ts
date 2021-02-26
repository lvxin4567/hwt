
/**
 * 
 * 绑定微信面板
 */

namespace lobby {
    const { BindEvent, doBindEvent } = kaayou._decorator;
    export class lobby_BindWechatMgr {
        static __INS__: lobby_BindWechatMgr = null;
        static getInstance() {
            if (lobby_BindWechatMgr.__INS__ == null) {
                lobby_BindWechatMgr.__INS__ = new lobby_BindWechatMgr();
                lobby_BindWechatMgr.__INS__.init();
            }
            return lobby_BindWechatMgr.__INS__;
        }
        __selfPanel: BindWechatPanel = null;

        init() {
            let self = this;
            this.__selfPanel = null;
            kaayou.getController('lobby').on('ui::BindWeChat::Show', function (e: kaayou.Event) {
                self.getPanel(true).show();
            }, this, 10);
            kaayou.getController('lobby').on('ui::BindWeChat::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).onHide();
            }, this, 10);
            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new BindWechatPanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }

    }


    export class BindWechatPanel extends kaayou.Layer {
        maskBg: cc.Layer = null;
        btn_close: ccui.Button = null;
        btn_bind:ccui.Button = null;
        constructor() {
            super();
            this.initUI();
        }
        initUI() {
            this.initWithccs(lobby.res.BindWechatPanel_json);
            let self = this;
            this.maskBg = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "maskbg");
            this.btn_close = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_close");
            this.btn_bind = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_copy");
            this.btn_close.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                    self.onHide();
            }, this)

            this.btn_bind.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit("lobby","mod::User::RegisterWx");
        }, this)
           self.onHide();
        }
        show() {
            this.setVisible(true);
        }
        onHide() {
            this.setVisible(false);
        }




    }
}