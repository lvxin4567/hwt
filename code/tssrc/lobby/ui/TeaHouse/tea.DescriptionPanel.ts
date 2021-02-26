namespace tea {
    var { BindEvent, doBindEvent } = kaayou._decorator;

    export class TeaDescriptionPanelMgr {
        static __INS__: TeaDescriptionPanelMgr = null;
        static getInstance(_zOrder: number = 0) {
            if (TeaDescriptionPanelMgr.__INS__ == null) {
                TeaDescriptionPanelMgr.__INS__ = new TeaDescriptionPanelMgr();
                TeaDescriptionPanelMgr.__INS__.init();
                TeaDescriptionPanelMgr.__INS__._zOrder = _zOrder;
            }
            return TeaDescriptionPanelMgr.__INS__;
        }
        _zOrder: number = 0
        __selfPanel: tea.DescriptionPanel = null;
        memberremovePanel: tea.DescriptionPanel = null
        init() {
            let self = this;
            this.__selfPanel = null;

            kaayou.getController('tea').on('ui::DescriptionPanel::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show();
            }, this, 10);
            kaayou.getController('tea').on('ui::DescriptionPanel::Hide', function (e: kaayou.Event) {
                self.getPanel(true).Hide();
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new DescriptionPanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel, this._zOrder);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }
    }

    export class DescriptionPanel extends kaayou.ModelLayer {
        constructor() {
            super();
            this.initUI();
        }
        
        btnClose: ccui.Button = null;
        
        @doBindEvent
        initUI() {
            this.initWithccs(tea.res.DescriptionPanel_Json, true);

            //关闭按钮
            this.btnClose = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btnClose");

            let self = this;
            //关闭
            this.btnClose.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.Hide()
            }, this);
        }

        Show() {
            let self = this;
            this.setVisible(true);
            kaayou.pop.showAni({
                cNode: this.node.getChildByName("contentPanel"),
                mNode: this.node.getChildByName("maskbg"),
                action: function () {

                }
            });
        }

        Hide() {
            let self = this;
            kaayou.pop.hideAni(
                {
                    cNode: this.node.getChildByName("contentPanel"),
                    mNode: this.node.getChildByName("maskbg"),
                    rnode: this,
                    action: function () {
                        kaayou.emit('tea', 'ui::DescriptionPanel::Hide');
                    }
                }
            )
        }
    }
}