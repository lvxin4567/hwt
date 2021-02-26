/**
 *  隐私设置
 */

namespace tea {
    const { doBindEvent, BindEvent } = kaayou._decorator;

    export class tea_TeaPrivacyPanelMgr {
        static __INS__: tea_TeaPrivacyPanelMgr = null;
        static getInstance(_zOrder:number ) {
            if (tea_TeaPrivacyPanelMgr.__INS__ == null) {
                tea_TeaPrivacyPanelMgr.__INS__ = new tea_TeaPrivacyPanelMgr();
                tea_TeaPrivacyPanelMgr.__INS__.init();
                tea_TeaPrivacyPanelMgr.__INS__._zOrder = _zOrder
            }
            return tea_TeaPrivacyPanelMgr.__INS__;
        }
        __selfPanel: PrivacyPanel = null;
        _zOrder = 0;
        init() {
            let self = this;
            this.__selfPanel = null;
            kaayou.getController('tea').on('ui::TeaHouse::UpdateInfo', function (e: kaayou.Event) {
                if (self.getPanel(false) && self.getPanel(false).isVisible()) {
                    self.getPanel(false) && self.getPanel(false).onTeaHouseUpdateInfo();
                }
            }, this, 10);

            kaayou.getController('tea').on('ui::PrivacyPanel::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show();
            }, this, 10);

            kaayou.getController('tea').on('ui::PrivacyPanel::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new PrivacyPanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel,this._zOrder);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }
    }

    export class PrivacyPanel extends kaayou.ModelLayer {
        constructor() {
            super();
            this.initUI();
        }
        layout_qptip:ccui.Layout = null;
        btn_close: ccui.Button = null;
        btn_hide:ccui.CheckBox = null;
        cbHID:ccui.CheckBox=null;
        cbHeadImage:ccui.CheckBox=null;
        cbTable:ccui.CheckBox=null;
        cbAddress:ccui.CheckBox=null;

        // @doBindEvent
        initUI() {
            this.initWithccs(tea.res.PrivacyPanel_json);
            this.isTouchMaskHide = false;
            let self = this;
            this.btn_close = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_close");
            this.btn_close.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.Hide();
            }, this);
            this.layout_qptip= ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "layout_qptip");
            this.layout_qptip.on(kaayou.TouchEvent.TouchEnd, function () {
                self.layout_qptip.setVisible(false);
            }, this);
            this.Hide();

            this.btn_hide = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_hide");
            this.btn_hide.on(kaayou.CheckEvent.SELECTED, self.onHideChange, this);
            this.btn_hide.on(kaayou.CheckEvent.UNSELECTED, self.onHideChange, this);

            this.cbHID = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "cbHID");
            this.cbHID.on(kaayou.CheckEvent.SELECTED, self.onHIDChange, this);
            this.cbHID.on(kaayou.CheckEvent.UNSELECTED, self.onHIDChange, this);

            this.cbHeadImage = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "cbHeadImage");
            this.cbHeadImage.on(kaayou.CheckEvent.SELECTED, self.onHeadImageChange, this);
            this.cbHeadImage.on(kaayou.CheckEvent.UNSELECTED, self.onHeadImageChange, this);

            this.cbTable = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "cbTable");
            this.cbTable.on(kaayou.CheckEvent.SELECTED, self.onTableChange, this);
            this.cbTable.on(kaayou.CheckEvent.UNSELECTED, self.onTableChange, this);

            this.cbAddress = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "cbAddress");
            this.cbAddress.on(kaayou.CheckEvent.SELECTED, self.onAddressChange, this);
            this.cbAddress.on(kaayou.CheckEvent.UNSELECTED, self.onAddressChange, this);
        }
    
        onHideChange() {
            kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
            this.doMemHide(this.btn_hide.isSelected());
            kaayou.emit('tea', 'mod::TeaHouse::SetMemberHide');
        }
        onHIDChange() {
            kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
            this.doHIDHide(this.cbHID.isSelected());
            kaayou.emit('tea', 'mod::TeaHouse::SetHIDHide');
        }
        onHeadImageChange() {
            kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
            this.doHeadImageHide(this.cbHeadImage.isSelected());
            kaayou.emit('tea', 'mod::TeaHouse::SetHeadImageHide');
        }
        onTableChange() {
            kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
            this.doTableHide(this.cbTable.isSelected());
            kaayou.emit('tea', 'mod::TeaHouse::SetTableHide');
        }
        onAddressChange(){
            kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
            this.doAddressHide(this.cbAddress.isSelected());
            kaayou.emit('tea', 'mod::TeaHouse::SetAddressHide');
        }
        doMemHide(b) {
            this.btn_hide.setSelected(b);
        }
        doHIDHide(b) {
            this.cbHID.setSelected(b);
        }
        doHeadImageHide(b) {
            this.cbHeadImage.setSelected(b);
        }
        doTableHide(b) {
            this.cbTable.setSelected(b);
        }
        doAddressHide(b){
            this.cbAddress.setSelected(b);
        }
        onTeaHouseUpdateInfo() {
            this.doMemHide(tea.mod.__teaHouseInfo.hismemhide);
            this.doHIDHide(tea.mod.__teaHouseInfo.ishidhide);
            this.doHeadImageHide(tea.mod.__teaHouseInfo.isheadhide);
            this.doTableHide(tea.mod.__teaHouseInfo.isonlinehide);
            this.doAddressHide(tea.mod.__teaHouseInfo.private_gps)
        }

        Show() {
            this.onTeaHouseUpdateInfo();
            this.setVisible(true);
        }

        Hide() {
            this.layout_qptip.setVisible(false);
            this.setVisible(false);
        }
    }
}