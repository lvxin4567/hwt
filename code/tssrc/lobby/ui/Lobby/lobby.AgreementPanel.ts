

namespace lobby {
    const { BindEvent, doBindEvent } = kaayou._decorator;


    export class lobby_AgreementMgr {
        static __INS__: lobby_AgreementMgr = null;
        static getInstance(_zOrder:number = 0) {
            if (lobby_AgreementMgr.__INS__ == null) {
                lobby_AgreementMgr.__INS__ = new lobby_AgreementMgr();
                lobby_AgreementMgr.__INS__.init();
                lobby_AgreementMgr.__INS__._zOrder = _zOrder;
            }
            return lobby_AgreementMgr.__INS__;
        }
        __selfPanel: AgreementPanel = null;
        _zOrder:number = 0;
        init() {
            let self = this;
            this.__selfPanel = null;
            kaayou.getController('lobby').on('ui::Agreement::Show', function (e: kaayou.Event) {
                self.getPanel(true).show();
            }, this, 10);
            kaayou.getController('lobby').on('ui::Agreement::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new AgreementPanel();
                kaayou.UIManager.getInstance().getMainScene().addChild(this.__selfPanel,this._zOrder);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }

    }

    export class AgreementPanel extends kaayou.ModelLayer {
        constructor() {
            super();
            this.initUI();
        }
        agreeScroll: ccui.ScrollView = null;
        btn_ok:ccui.Button = null;
        // @doBindEvent
        initUI() {
            let self = this;
            this.initWithccs(lobby.res.AgreementPanel_json);
            this.agreeScroll = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "agreeScroll");
            this.agreeScroll.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Vertical);
            this.agreeScroll.doChildrenLayout();
            this.btn_ok = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btnClose");
            this.btn_ok.on(kaayou.TouchEvent.TouchEnd,function(){
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                self.Hide();
            },this);
            self.Hide();
        }

        // @BindEvent('lobby', 'ui::Agreement::Show')
        show() {
            this.setVisible(true);
        }

        // @BindEvent('lobby', 'ui::Agreement::Hide')
        Hide() {
            this.setVisible(false);
        }

      
    }

}