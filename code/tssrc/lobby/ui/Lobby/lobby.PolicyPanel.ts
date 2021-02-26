
//隐私政策面板
namespace lobby {
    const { BindEvent, doBindEvent } = kaayou._decorator;


    export class lobby_PolicyMgr {
        static __INS__: lobby_PolicyMgr = null;
        static getInstance(_zOrder:number = 0) {
            if (lobby_PolicyMgr.__INS__ == null) {
                lobby_PolicyMgr.__INS__ = new lobby_PolicyMgr();
                lobby_PolicyMgr.__INS__.init();
                lobby_PolicyMgr.__INS__._zOrder = _zOrder;
            }
            return lobby_PolicyMgr.__INS__;
        }
        __selfPanel: PolicyPanel = null;
        _zOrder:number = 0
        init() {
            let self = this;
            this.__selfPanel = null;
            kaayou.getController('lobby').on('ui::Policy::Show', function (e: kaayou.Event) {
                self.getPanel(true).show();
            }, this, 10);
            kaayou.getController('lobby').on('ui::Policy::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new PolicyPanel();
                kaayou.UIManager.getInstance().getMainScene().addChild(this.__selfPanel,this._zOrder);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }

    }

    export class PolicyPanel extends kaayou.ModelLayer {
        constructor() {
            super();
            this.initUI();
        }
        viewScroll: ccui.ScrollView = null;
        btn_ok: ccui.Button = null;
        // @doBindEvent
        initUI() {
            let self = this;
            this.isTouchMaskHide = false;
            this.initWithccs(lobby.res.PolicyPanel_json);
            
            this.viewScroll = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "agreeScroll");
            this.viewScroll.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Vertical);
            this.viewScroll.doChildrenLayout();
            this.btn_ok = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btnClose");
            this.btn_ok.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                self.Hide();
            }, this);
            self.Hide();
            //    this._doVerticalChildrenLayout();
        }

        // @BindEvent('lobby', 'ui::Policy::Show')
        show() {
            this.setVisible(true);
        }

        // @BindEvent('lobby', 'ui::Policy::Hide')
        Hide() {
            this.setVisible(false);
        }
    }

}