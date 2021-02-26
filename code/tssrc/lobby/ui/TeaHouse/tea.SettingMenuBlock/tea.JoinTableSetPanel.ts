/**
 *  隐私设置
 */

namespace tea {
    const { doBindEvent, BindEvent } = kaayou._decorator;
  export class tea_TeaJoinTableSetPanelMgr {
        static __INS__: tea_TeaJoinTableSetPanelMgr = null;
        static getInstance(_zOrder:number) {
            if (tea_TeaJoinTableSetPanelMgr.__INS__ == null) {
                tea_TeaJoinTableSetPanelMgr.__INS__ = new tea_TeaJoinTableSetPanelMgr();
                tea_TeaJoinTableSetPanelMgr.__INS__.init();
                tea_TeaJoinTableSetPanelMgr.__INS__._zOrder = _zOrder;
            }
            return tea_TeaJoinTableSetPanelMgr.__INS__;
        }
        __selfPanel: JoinTableSetPanel = null;
        _zOrder:number = 0;
        _data:tea.Data_HouseInfo = null;
        init() {
            let self = this;
            this.__selfPanel = null;
            kaayou.getController('tea').on('ui::TeaHouse::UpdateInfo', function (e: kaayou.Event) {
                if (!e.data) {
                    return;
                }
                self._data = e.data;
                // self.getPanel(false) && self.getPanel(false).onTeaHouseUpdateInfo(e.data);
                self.getPanel(false) && self.getPanel(false).onTeaHouseUpdateInfo(self._data);
            }, this, 10);

            kaayou.getController('tea').on('ui::JoinTableSetPanel::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show();
            }, this, 10);
            kaayou.getController('tea').on('ui::JoinTableSetPanel::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new JoinTableSetPanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel,this._zOrder);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }

    }

    export class JoinTableSetPanel extends kaayou.ModelLayer {
        constructor() {
            super();
            this.initUI();
        }
        btn_close: ccui.Button = null;
        label_tips: ccui.Text = null;
        cb_JoinSet:ccui.CheckBox = null;
        img_Tip:ccui.ImageView = null;
        tip_Layout:ccui.Layout = null;
        btn_Submit:ccui.Button = null;
        _data:tea.Data_HouseInfo = null;
        // @doBindEvent
        initUI() {
            this.initWithccs(tea.res.TH_JoinTableSetPanel);
            this.isTouchMaskHide = false;
            let self = this;
            this.btn_close = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_close");
            this.btn_Submit = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_submit");
            this.cb_JoinSet = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Check_JoinSet");
            this.tip_Layout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "tip_Layout");
            this.tip_Layout.setVisible(false);
            this.img_Tip = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "tip_JoinTable");
            this.btn_close.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.Hide();
            }, this);
            this.img_Tip.on(kaayou.TouchEvent.TouchStart, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                self.tip_Layout.setVisible(true)
            }, this);
            this.img_Tip.on(kaayou.TouchEvent.TouchEnd, function () {
                self.tip_Layout.setVisible(false)
            }, this);
            this.img_Tip.on(kaayou.TouchEvent.TouchCance, function () {
                self.tip_Layout.setVisible(false)
            }, this);
            this.btn_Submit.on(kaayou.TouchEvent.TouchStart, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                let isSelect = self.cb_JoinSet.isSelected();
                kaayou.emit("tea", "mod::Tahouse::SetHouseTableJoinStyle",{only_quick:isSelect})
                self.Hide();
            }, this);

            this.Hide();
        }

   

        onTeaHouseUpdateInfo(data:tea.Data_HouseInfo) {
            this._data = data;
            this.cb_JoinSet.setSelected(data.only_quick);
        }

        Show() {
            var self = this;
            this.setVisible(true);
            self.cb_JoinSet.setSelected(tea.mod.__teaHouseInfo.only_quick);
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