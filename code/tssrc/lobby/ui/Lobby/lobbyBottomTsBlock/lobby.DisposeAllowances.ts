/**
* 
* 低保界面
*/
namespace lobby {
    const { BindEvent, doBindEvent } = kaayou._decorator;
    export class lobby_DisposeAllowancesMgr {
        static __INS__: lobby_DisposeAllowancesMgr = null;
        static getInstance(_zOrder = 0) {
            if (lobby_DisposeAllowancesMgr.__INS__ == null) {
                lobby_DisposeAllowancesMgr.__INS__ = new lobby_DisposeAllowancesMgr();
                lobby_DisposeAllowancesMgr.__INS__.init();
                lobby_DisposeAllowancesMgr.__INS__._zOrder = _zOrder;
            }
            return lobby_DisposeAllowancesMgr.__INS__;
        }
        __selfPanel: DisposeAllowancesPanel = null;
        _zOrder = 0;
        init() {
            let self = this;
            this.__selfPanel = null;
            kaayou.getController('lobby').on('ui::DisposeAllowances::Show', function (e: kaayou.Event) {
                self.getPanel(true).show(e.data);
            }, this, 10);
            kaayou.getController('lobby').on('ui::DisposeAllowances::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).onHide();
            }, this, 10);
            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new DisposeAllowancesPanel();
                kaayou.UIManager.getInstance().getMainScene().addChild(this.__selfPanel, this._zOrder);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }

    }


    export class DisposeAllowancesPanel extends kaayou.Layer {
        maskBg: cc.Layer = null;
        btn_close: ccui.Button = null;
        btn_sure: ccui.Button = null;
        label_content:ccui.Text = null;
        contentPanel:ccui.Layout = null;
        label_Count:ccui.Text = null;
        constructor() {
            super();
            this.initUI();
        }
        initUI() {
            this.initWithccs(lobby.res.LobbyDisposeAllowancesPanel_json);
            let self = this;
            this.maskBg = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "maskbg");
            this.btn_close = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Close");
            this.btn_sure = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_sure");
            this.btn_close.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.onHide();
            }, this)
            this.label_content = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_content");
            this.contentPanel = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "contentPanel");
            this.label_Count = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_Count");


            this.btn_sure.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit("common", "ui::GetRewardSusPanel::Show", { name: self._data.gold + "个金币" });
                self.onHide();
            }, this)
            self.onHide();
        }
        show(data:proto_disposeallowances_ntf_res) {
            this._data = data;
            let RichLabelAiSuper = <ccui.RichText>this.node.getChildByName('label_content');
            if (RichLabelAiSuper) {
                // RichLabelAiSuper.removeElement
                RichLabelAiSuper.removeFromParent();
            }
            RichLabelAiSuper = new ccui.RichText();
            let str1 = new ccui.RichElementText(1, cc.hexToColor('#CBA56F'), 255, '您的金币不足！系统赠送', "Arial", 28);
            let str2 = new ccui.RichElementText(1, cc.hexToColor('#E7640D'), 255, ''+data.gold+"转运金" , "Arial", 28);
            let str3 = new ccui.RichElementText(1, cc.hexToColor('#CBA56F'), 255, ',加油呦！', "Arial", 28);
            RichLabelAiSuper.pushBackElement(str1);
            RichLabelAiSuper.pushBackElement(str2);
            RichLabelAiSuper.pushBackElement(str3);

            RichLabelAiSuper.setAnchorPoint(cc.p(0.5, 0.5));
            RichLabelAiSuper.ignoreContentAdaptWithSize(true);
            RichLabelAiSuper.setPosition(this.label_content.getPosition());
            RichLabelAiSuper.setVisible(true);
            this.contentPanel.addChild(RichLabelAiSuper);
            RichLabelAiSuper.setName('rich_label_ai_super');
            this.label_Count.setString(`今天第${data.current}次送金币，共${data.current+data.remain}次`)
            this.setVisible(true);
            kaayou.pop.showAni({
                cNode: this.node.getChildByName("contentPanel"),
                mNode: this.node.getChildByName("maskbg"),
                action: function () {
                    
                }
            });

        }
        _data = null;
        onHide() {
            let self = this;
            kaayou.pop.hideAni(
                {
                    cNode: this.node.getChildByName("contentPanel"),
                    mNode: this.node.getChildByName("maskbg"),
                    rnode: this,
                    action: function () {
                        
                    }
                }
            )
        }




    }
}