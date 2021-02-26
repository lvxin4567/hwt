namespace lobby {
    var { BindEvent, doBindEvent } = kaayou._decorator;

    export class lobbyExchengeSusMgr {
        static __INS__: lobbyExchengeSusMgr = null;
        static getInstance(_zOrder: number = 0) {
            if (lobbyExchengeSusMgr.__INS__ == null) {
                lobbyExchengeSusMgr.__INS__ = new lobbyExchengeSusMgr();
                lobbyExchengeSusMgr.__INS__.init();
                lobbyExchengeSusMgr.__INS__._zOrder = _zOrder;
            }
            return lobbyExchengeSusMgr.__INS__;
        }
        _zOrder: number = 0
        __selfPanel: lobbyExchengeSusPanel = null;
        init() {
            let self = this;
            this.__selfPanel = null;

            kaayou.getController('common').on('ui::GetRewardSusPanel::Show', function (e: kaayou.Event) {
                self.showGetRewardInfo(e.data);
            }, this, 10);
            kaayou.getController('common').on('ui::GetRewardSusPanel::Hide', function (e: kaayou.Event) {
                self.getRewardRemoved();
            }, this, 10);

            return true;
        }

        showGetRewardInfo(data: {name:string}) {
            if (!this.__selfPanel) {
                let dialog = new lobby.lobbyExchengeSusPanel();
                this.__selfPanel = dialog;
                kaayou.UIManager.getInstance().getMainScene().addChild(dialog,this._zOrder);
            }
            this.__selfPanel.Show(data);
        }

        getRewardRemoved() {
            let self = this;
            if (this.__selfPanel && this.__selfPanel.isRunning()) {
               this.__selfPanel.HideUI(function () {
                   self.__selfPanel.removeFromParent();
                   self.__selfPanel = null;
               })
            }
        }
    }

    export class lobbyExchengeSusPanel extends kaayou.ModelLayer {
        constructor() {
            super();
            this.initUI();
        }
        btnClose: ccui.Button = null;
        ani_layout:ccui.Layout = null;
        productName:ccui.Text = null;
        productImg:ccui.ImageView = null;
        @doBindEvent
        initUI() {
            this.initWithccs(lobby.res.ExchangeSusPanel_json, true);
            //关闭按钮
            this.btnClose = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Close");
            this.productImg = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "image");
            this.productName = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "name");
            let self = this;
            this.isTouchMaskHide = false;
            //关闭
            this.btnClose.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                console.log("点击了关闭");
                kaayou.emit("common",'ui::GetRewardSusPanel::Hide')
            }, this);
            this.ani_layout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "ani_layout");
            
            let anim: sp.SkeletonAnimation = sp.SkeletonAnimation.createWithJsonFile(lobby.res.exChangeGoldAni_json, lobby.res.exChangeGoldAni_atlas, 1);
            anim.setAnimation(1, "animation", true);
            anim.setPosition(self.ani_layout.getContentSize().width/2, self.ani_layout.getContentSize().height/2+20);
            self.ani_layout.addChild(anim);

        }

        Show(data:{name:string}) {
            let self = this;
            this.setVisible(true);
            self.productName.setString(data.name);
            let imageName = "lobby_exchange_gold";
            kaayou.pop.showAni({
                cNode: this.node.getChildByName("contentPanel"),
                mNode: this.node.getChildByName("maskbg"),
                action: function () {

                }
            });
        }

        HideUI(callBack:Function) {
            let self = this;
            kaayou.pop.hideAni(
                {
                    cNode: this.node.getChildByName("contentPanel"),
                    mNode: this.node.getChildByName("maskbg"),
                    rnode: this,
                    action: function () {
                        //lw200713关闭恭喜获得，再弹下一个窗，比如公告
                        kaayou.LayerSeq.getInstance().closeTopLayer();
                        callBack()
                    }
                }
            )
        }
    }
}