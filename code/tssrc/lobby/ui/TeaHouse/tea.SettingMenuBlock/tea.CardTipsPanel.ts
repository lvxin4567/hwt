/**
 *  隐私设置
 */

namespace tea {
    const { doBindEvent, BindEvent } = kaayou._decorator;





  export class tea_CardTipsPanelMgr {
        static __INS__: tea_CardTipsPanelMgr = null;
        static getInstance(_zOrder : number) {
            if (tea_CardTipsPanelMgr.__INS__ == null) {
                tea_CardTipsPanelMgr.__INS__ = new tea_CardTipsPanelMgr();
                tea_CardTipsPanelMgr.__INS__.init();
                tea_CardTipsPanelMgr.__INS__._zOrder = _zOrder;
            }
            return tea_CardTipsPanelMgr.__INS__;
        }
        __selfPanel: CardTipsPanel = null;
        _zOrder:number = 0;
        init() {
            let self = this;
            this.__selfPanel = null;
        
            kaayou.getController('tea').on('ui::CardTipsPanel::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show();
            }, this, 10);
            kaayou.getController('tea').on('ui::CardTipsPanel::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new CardTipsPanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel,this._zOrder);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }

    }











    export class CardTipsPanel extends kaayou.ModelLayer {
        constructor() {
            super();
            this.initUI();
        }
        btn_close: ccui.Button = null;
        btn_submit: ccui.Button = null;
        nomore_cb:ccui.CheckBox = null;
        // @doBindEvent
        initUI() {
            this.initWithccs(tea.res.TH_CardTips_Json);
            this.isTouchMaskHide = false;
            let self = this;
            this.btn_close = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Close");
            this.btn_submit = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_submit");
            this.btn_close.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.Hide();
            }, this);
            this.btn_submit.on(kaayou.TouchEvent.TouchEnd,  ()=> {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                //抛出解冻亲友圈消息
                if (this.nomore_cb.isSelected()) {
                    let todayStr = Date.format("yyyy-MM-dd")
                    cc.sys.localStorage.setItem("cardMinNumTip"+tea.mod.__teaHouseInfo.hid+todayStr,"1");
                }
                this.Hide();
            }, this);

            this.nomore_cb = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "NoMore");

            this.Hide();
        }

    

        Show() {
            var self = this;
            this.setVisible(true);
            kaayou.pop.showAni({
                cNode: this.node.getChildByName("contentPanel"),
                mNode: this.node.getChildByName("maskbg"),
                action:function(){
                }
            });
        }

        Hide() {
            kaayou.pop.hideAni(
                {
                    cNode: this.node.getChildByName("contentPanel"),
                    mNode: this.node.getChildByName("maskbg"),
                    rnode: this
                }
            )
        }

    }



}