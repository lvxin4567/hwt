//比赛分说明
namespace tea {
    const { doBindEvent, BindEvent } = kaayou._decorator;
  export class tea_TeaFcmDecPopMgr {
        static __INS__: tea_TeaFcmDecPopMgr = null;
        static getInstance(_zOrder: number = 0) {
            if (tea_TeaFcmDecPopMgr.__INS__ == null) {
                tea_TeaFcmDecPopMgr.__INS__ = new tea_TeaFcmDecPopMgr();
                tea_TeaFcmDecPopMgr.__INS__.init();
                tea_TeaFcmDecPopMgr.__INS__._zOrder = _zOrder;
            }
            return tea_TeaFcmDecPopMgr.__INS__;
        }
        __selfPanel: FcmDecPopPanel = null;
        _zOrder: number = 0
        init() {
            let self = this;
            this.__selfPanel = null;
            kaayou.getController('tea').on('ui::TeaHouse::UpdateInfo', function (e: kaayou.Event) {
            }, this, 10);

            kaayou.getController('tea').on('ui::FcmDecPopLayer::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show();
            }, this, 10);
            kaayou.getController('tea').on('ui::FcmDecPopLayer::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new FcmDecPopPanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel,this._zOrder);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }

    }

    export class FcmDecPopPanel extends kaayou.ModelLayer {
        constructor() {
            super();
            this.initUI();
        }
        btn_close: ccui.Button = null;
        btn_record: ccui.Button = null;
      
        // @doBindEvent
        initUI() {
            this.initWithccs(tea.res.TH_FcmDesPanel_Json);
            this.isTouchMaskHide = false;
            let self = this;
            this.btn_close = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_close");
            this.btn_record = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_record");
           
            this.btn_close.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.Hide();
            }, this);
            this.btn_record.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                let myUid = lobby.mod.User.getInstance().getUserInfo().uid;
                kaayou.emit("tea","ui::FcmPlayerDetail::Show",{uid:myUid})
                self.Hide();
            }, this);
          
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