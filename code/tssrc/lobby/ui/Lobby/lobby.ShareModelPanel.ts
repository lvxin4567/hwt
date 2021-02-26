
/**
 * 
 * 分享面板
 */

namespace lobby {
    const { BindEvent, doBindEvent } = kaayou._decorator;



    export class ShareModelPanelMgr {
        static __INS__: ShareModelPanelMgr = null;
        static getInstance(_zOrder: number = 0) {
            if (ShareModelPanelMgr.__INS__ == null) {
                ShareModelPanelMgr.__INS__ = new ShareModelPanelMgr();
                ShareModelPanelMgr.__INS__.init();
                ShareModelPanelMgr.__INS__._zOrder = _zOrder;
            }
            return ShareModelPanelMgr.__INS__;
        }
        __selfPanel: ShareModelPanel = null;
        public _zOrder = 0;
        init() {
            let self = this;
            this.__selfPanel = null;

            kaayou.getController('common').on('Config::Update', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).onConfigUpdate();
            }, this, 10);

            kaayou.getController('lobby').on('ui::ShareModelPanel::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show(e.data);
            }, this, 10);
            kaayou.getController('lobby').on('ui::ShareModelPanel::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new ShareModelPanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel, this._zOrder);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }

    }



    export class ShareModelPanel extends kaayou.Layer {
        maskBg: cc.Layer = null;
        contentPanel: ccui.Layout = null;
        btn_close: ccui.Button = null;

        btn_wx_haoyou: ccui.Button = null;
        btn_wx_pyq: ccui.Button = null;
        btn_dd: ccui.Button = null;
        btn_xl: ccui.Button = null;
        btn_xx: ccui.Button = null
        share_data: { type: common.mod.SHARE_TYPE, title?: string, text?: string, url?: string } = null;
        layout_sharemenu: ccui.Layout = null;
        constructor() {
            super();
            this.initUI();
        }
        // @doBindEvent
        initUI() {
            this.initWithccs(lobby.res.ShareModelPanel_json);
            let self = this;
            this.maskBg = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "maskbg");
            this.contentPanel = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "contentPanel");
            this.btn_close = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_close");
            this.btn_dd = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_dd");

            this.btn_xl = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_xl");
            this.btn_xx = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_xx");
            this.btn_close.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.Hide();
            }, this)



            this.layout_sharemenu = ccui.helper.seekWidgetByName(<ccui.Widget>this.contentPanel, "Panel_1");
            this.layout_sharemenu.setPadding({ spacingY: 15 });
            this.layout_sharemenu.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Horizontal);
            this.layout_sharemenu.setHorizontal(ccui.Layout.LayoutHorizontal.LEFT);
            this.layout_sharemenu.doChildrenLayout();


            this.btn_wx_haoyou = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_wx_haoyou");
            this.btn_wx_haoyou.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                if (self.share_data.type == common.mod.SHARE_TYPE.LOBBY) {
                    kaayou.PlatformMgr.getInstance().wx.ShareURL(self.share_data.title, self.share_data.text, self.share_data.url)
                } else {
                    kaayou.PlatformMgr.getInstance().wx.ShareText("1", self.share_data.text);
                }
            }, this)

            this.btn_wx_pyq = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_wx_pyq");
            this.btn_wx_pyq.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                if (self.share_data.type == common.mod.SHARE_TYPE.LOBBY) {
                    kaayou.PlatformMgr.getInstance().wx.ShareTimeLineURL(self.share_data.title, self.share_data.text, self.share_data.url);
                }
            }, this);

            this.btn_dd.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                if (self.share_data.type == common.mod.SHARE_TYPE.LOBBY) {
                    kaayou.PlatformMgr.getInstance().dd.DDShareURL(self.share_data.title, self.share_data.text, self.share_data.url);
                } else {
                    kaayou.PlatformMgr.getInstance().dd.DDShareText("1", self.share_data.text);
                }
            }, this)

            self.Hide();
        }
        onConfigUpdate() {
            let self = this;
            if (common.mod.Config.AppConfig.shareUrl && common.mod.Config.AppConfig.shareUrl.downImgUrl) {
                let url = common.mod.Config.AppConfig.shareUrl.downImgUrl;
                NetImage.loadImage(url).then(function (tex: cc.Texture2D) {

                });
            }
        }
        
        Show(data: { type: common.mod.SHARE_TYPE, title?: string, text?: string, url?: string }) {
            if (!data) {
                return;
            }
            this.share_data = data;

            let configData = common.mod.Config.GetAppConfig();
            let c_type = JSON.parse(configData.shareType).lobby;
            this.btn_wx_haoyou.setVisible(!!(c_type & 1))
            this.btn_dd.setVisible(!!(c_type & 2))
            this.btn_xx.setVisible(!!(c_type & 4))
            this.btn_xl.setVisible(!!(c_type & 8));
            this.btn_wx_pyq.setVisible(!!(c_type & 16))
            this.layout_sharemenu.doChildrenLayout();
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
                    rnode: this,
                    action:function(){
                    }
                }
            )
            // this.setVisible(false);
        }




    }
}