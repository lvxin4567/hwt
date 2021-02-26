

namespace lobby {
    const { doBindEvent, BindEvent } = kaayou._decorator;




    export class ChannelPanelMgr {
        static __INS__: ChannelPanelMgr = null;
        static getInstance(_zOrder: number = 0) {
            if (ChannelPanelMgr.__INS__ == null) {
                ChannelPanelMgr.__INS__ = new ChannelPanelMgr();
                ChannelPanelMgr.__INS__.init();
                ChannelPanelMgr.__INS__._zOrder = _zOrder;
            }
            return ChannelPanelMgr.__INS__;
        }
        __selfPanel: ChannelPanel = null;
        public _zOrder = 0;

        init() {
            let self = this;
            this.__selfPanel = null;

            kaayou.getController('common').on('ui::ChannelPanel::Show', function (e: kaayou.Event) {
                self.showChannelPanel(e.data);
            }, this, 10);
            kaayou.getController('common').on('ui::ChannelPanel::Hide', function (e: kaayou.Event) {
                self.hideChannelPanel();
            }, this, 10);

            kaayou.getController('lobby').on('ui::LobbyPanel::Clear', function (e: kaayou.Event) {
                self.hideChannelPanel();
            }, this);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new ChannelPanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel, this._zOrder);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }

        showChannelPanel(data){
            if (!this.__selfPanel) {
                this.__selfPanel = new ChannelPanel();
                kaayou.UIManager.getInstance().getMainScene().addChild(this.__selfPanel,this._zOrder);
            }
            this.__selfPanel.Show(data);
        }

        hideChannelPanel(){
            if (this.__selfPanel) {
                this.__selfPanel.removeFromParent();
                this.__selfPanel = null;
            }
        }


    }


    export class ChannelPanel extends kaayou.ModelLayer {

        constructor() {
            super();
            this.initWithccs(lobby.res.ChannelPanel_json);
            this.initUI();
        }
        btn_zfb: ccui.Button = null;
        btn_wx: ccui.Button = null;
        z_label_product: ccui.Text = null;
        z_label_money: ccui.Text = null;
        btn_close: ccui.Button = null;
        _onSelected: Function = null;
        _onCancel: Function = null;
        // @doBindEvent
        initUI() {
            this.isTouchMaskHide = false;
            let self = this;
            this.btn_close = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_close");
            this.btn_close.on(kaayou.TouchEvent.TouchEnd, function () {
                let c = self._onCancel;
                self._onCancel = null;
                if (lodash.isFunction(c)) {
                    c();
                }
                // self.Hide();
                kaayou.emit("common","ui::ChannelPanel::Hide");
            }, this);
            this.btn_zfb = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_zfb");
            this.btn_zfb.on(kaayou.TouchEvent.TouchEnd, function () {
                let c = self._onSelected;
                self._onSelected = null;
                if (lodash.isFunction(c)) {
                    c('zfb');
                }
            }, this);
            this.btn_wx = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_wx");
            this.btn_wx.on(kaayou.TouchEvent.TouchEnd, function () {
                let c = self._onSelected;
                self._onSelected = null;
                if (lodash.isFunction(c)) {
                    c('wx');
                }
            }, this);
            this.z_label_money = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "z_label_money");
            this.z_label_money.setString("");
            this.z_label_product = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "z_label_product");
            this.z_label_product.setString("");
            this.setVisible(false);            
        }

       // @BindEvent("lobby", 'ui::ChannelPanel::Show')
        Show(data: { productname: string, productmoney: string, onSelected: Function, onCancel?: Function }) {
            if (!data) { return; }
            if (!lodash.isFunction(data.onSelected)) { return; }
            this._onSelected = data.onSelected;
            this.z_label_product.setString(data.productname || "");
            this.z_label_money.setString(data.productmoney || "");
            if (lodash.isFunction(data.onCancel)) {
                this._onCancel = data.onCancel;
            }


            this.setVisible(true);
        }
    
    }



}