
//公告面板
namespace lobby {
    const { doBindEvent, BindEvent } = kaayou._decorator;


    export class CustomRegOutPanelMgr {
        static __INS__: CustomRegOutPanelMgr = null;
        static getInstance(_zOrder: number = 0) {
            if (CustomRegOutPanelMgr.__INS__ == null) {
                CustomRegOutPanelMgr.__INS__ = new CustomRegOutPanelMgr();
                CustomRegOutPanelMgr.__INS__.init();
                CustomRegOutPanelMgr.__INS__._zOrder = _zOrder;
            }
            return CustomRegOutPanelMgr.__INS__;
        }
        public _zOrder = 0;
        __selfPanel: CustomRegOutPanel = null;

        init() {
            let self = this;
            this.__selfPanel = null;
            kaayou.getController('lobby').on('ui::CustomRegOutPanel::Show', function () {
                self.getPanel(true).Show();
            }, this, 10);

            kaayou.getController('lobby').on('ui::CustomRegOutPanel::Hide', function () {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new CustomRegOutPanel();
                kaayou.UIManager.getInstance().getMainScene().addChild(this.__selfPanel, this._zOrder);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }

    }

    export class CustomRegOutPanel extends kaayou.ModelLayer {
        constructor() {
            super();
            this.initUI();
        }
        lb_wx:ccui.Text
        initUI() {
            this.initWithccs(lobby.res.CustomRegOutPanel_json);
            const btn_notice_close = <ccui.Button>ccui.helper.seekWidgetByName(<ccui.Widget>this.node,"btn_notice_close")
            const btn_copy = <ccui.Button>ccui.helper.seekWidgetByName(<ccui.Widget>this.node,"btn_copy")
            this.lb_wx = <ccui.Text>ccui.helper.seekWidgetByName(<ccui.Widget>this.node,"Text_13")
            btn_notice_close.on(kaayou.TouchEvent.TouchEnd,()=>{
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                this.Hide();
            },this);

            btn_copy.on(kaayou.TouchEvent.TouchEnd,()=>{
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                let configData = common.mod.Config.GetAppConfig().kfinfo;
                let {kf} = configData;
                let isSuccess = kaayou.PlatformMgr.getInstance().sys.copyStringToPasteBoard(kf[0].wx);
                if (isSuccess) {
                    kaayou.emit('common', "ui::Toast::Show", { msg: "您的客服微信已拷贝，请打开微信联系客服" })
                }    
            },this)

        }
      
        initInfo(){
            let configData = common.mod.Config.GetAppConfig().kfinfo;
            let {kf} = configData;
            this.lb_wx.setString(`客服微信:${kf[0].wx}`);
        }

        Show() {
            this.node.setVisible(true)
            this.initInfo();
            kaayou.pop.showAni({
                cNode: this.node.getChildByName("contentPanel"),
                mNode: this.node.getChildByName("maskbg"),
                action: ()=> {
                    
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