
//公告面板
namespace lobby {
    const { doBindEvent, BindEvent } = kaayou._decorator;


    export class ContractPanelMgr {
        static __INS__: ContractPanelMgr = null;
        static getInstance(_zOrder: number = 0) {
            if (ContractPanelMgr.__INS__ == null) {
                ContractPanelMgr.__INS__ = new ContractPanelMgr();
                ContractPanelMgr.__INS__.init();
                ContractPanelMgr.__INS__._zOrder = _zOrder;
            }
            return ContractPanelMgr.__INS__;
        }
        public _zOrder = 0;
        __selfPanel: ContractPanel = null;

        init() {
            let self = this;
            this.__selfPanel = null;
            kaayou.getController('lobby').on('ui::ContractPanel::Show', function () {
                self.getPanel(true).Show();
            }, this, 10);

            kaayou.getController('lobby').on('ui::ContractPanel::Hide', function () {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new ContractPanel();
                kaayou.UIManager.getInstance().getMainScene().addChild(this.__selfPanel, this._zOrder);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }

    }

    export class ContractPanel extends kaayou.ModelLayer {
        constructor() {
            super();
            this.initUI();
        }
        isTouchMaskHide = false;
        initUI() {
            this.initWithccs(lobby.res.ContractPanel_json);
            const btn_notice_close = <ccui.Button>ccui.helper.seekWidgetByName(<ccui.Widget>this.node,"btn_notice_close")
            const btn_cancel = <ccui.Button>ccui.helper.seekWidgetByName(<ccui.Widget>this.node,"btn_cancel")
            const btn_agree = <ccui.Button>ccui.helper.seekWidgetByName(<ccui.Widget>this.node,"btn_agree")
            const agreement_notice = <ccui.ImageView>ccui.helper.seekWidgetByName(<ccui.Widget>this.node,"Image_6")
            const Policy_notice = <ccui.ImageView>ccui.helper.seekWidgetByName(<ccui.Widget>this.node,"Image_7")

            agreement_notice.on(kaayou.TouchEvent.TouchEnd, function (e) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit('lobby', 'ui::Agreement::Show');
            }, this);
            
            Policy_notice.on(kaayou.TouchEvent.TouchEnd, function (e) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit('lobby', 'ui::Policy::Show');
            }, this);

            btn_notice_close.on(kaayou.TouchEvent.TouchEnd,()=>{
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                this.Hide();
            },this);

            btn_cancel.on(kaayou.TouchEvent.TouchEnd,()=>{
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                cc.sys.localStorage.setItem("user_agreement","false");
                kaayou.emit("lobby","ui::Login::Agreement",{false:true});
                this.Hide();
            },this)

            btn_agree.on(kaayou.TouchEvent.TouchEnd,()=>{
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.Default);
                cc.sys.localStorage.setItem("user_agreement","true");
                kaayou.emit("lobby","ui::Login::Agreement",{agree:true});
                this.Hide();
            },this)
        }
      

        Show() {
            this.node.setVisible(true)
            kaayou.pop.showAni({
                cNode: this.node.getChildByName("contentPanel"),
                mNode: this.node.getChildByName("maskbg"),
                action: function () {
                }
            });
        }

        Hide() {
            kaayou.pop.hideAni(
                {
                    cNode: this.node.getChildByName("contentPanel"),
                    mNode: this.node.getChildByName("maskbg"),
                    rnode: this.node,
                    action: function () {
                    }
                }
            )
        }
    }
}