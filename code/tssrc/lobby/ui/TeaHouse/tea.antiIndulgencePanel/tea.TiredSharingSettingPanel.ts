namespace tea {
    var { BindEvent, doBindEvent } = kaayou._decorator;

    export class tea_TiredSharingSettingPanelMgr {
        static __INS__: tea_TiredSharingSettingPanelMgr = null;
        static getInstance(_zOrder: number = 0) {
            if (tea_TiredSharingSettingPanelMgr.__INS__ == null) {
                tea_TiredSharingSettingPanelMgr.__INS__ = new tea_TiredSharingSettingPanelMgr();
                tea_TiredSharingSettingPanelMgr.__INS__.init();
                tea_TiredSharingSettingPanelMgr.__INS__._zOrder = _zOrder
            }
            return tea_TiredSharingSettingPanelMgr.__INS__;
        }
        __selfPanel: tea_TiredSharingSettingPanel = null;
        _zOrder: number = 0
        init() {
            let self = this;
            this.__selfPanel = null;

            kaayou.getController('tea').on('ui::TiredSharingSettingPanel::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show();
            }, this, 10);
            kaayou.getController('tea').on('ui::TiredSharingSettingPanel::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);

            kaayou.getController('lobby').on('ui::NumberInput::Change', function (e: kaayou.Event) {
                self.getPanel(true) && self.getPanel(false).ShowNumber(e.data);
            }, this, 10);

            kaayou.getController('lobby').on('ui::NumberInputPanel::Hide', function (e: kaayou.Event) {
                self.getPanel(true) && self.getPanel(false).ReturnToMiddle();
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new tea_TiredSharingSettingPanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel,this._zOrder);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }
    }

    export class tea_TiredSharingSettingPanel extends kaayou.ModelLayer {
        constructor() {
            super();
            this.initUI();
        }

        btn_close: ccui.Button = null;
        btnSave: ccui.Button = null;

        ebInput: any = null;
        iMethod: number = 0;
        iQuantity: number = 0;

        lbAA: ccui.Text = null;
        lbBigWin: ccui.Text = null;
        lbQuantity: ccui.Text = null;
        ndMethod: ccui.ImageView = null;
        radioGroup: common.RadioGroup = null;

        @doBindEvent
        initUI() {
            let self = this;
            this.isTouchMaskHide = false;
            return;
            // this.initWithccs(tea.res.TiredSharingSetting_json);

            this.ndMethod = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Method");
            this.radioGroup = new common.RadioGroup();
            lodash.forEach(this.ndMethod.getChildren(), function (v: ccui.CheckBox, i) {
                v['index'] = i;
                v.on(kaayou.RadioEvent.SELECTED, function () {
                    kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                    self.iMethod = i;
                    self.selectRadio(i);
                }, self);
                self.radioGroup.add(v);
            });
            this.lbAA = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "AAText");
            this.lbBigWin = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "BigWinText");
            this.lbQuantity = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Quantity");
            this.lbQuantity.on(kaayou.TouchEvent.TouchEnd, function () {
                self.lbQuantity.setEnabled(false);
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                let pnl = self.node.getChildByName("contentPanel");
                pnl.stopAllActions();
                let x = cc.winSize.width / 4;
                let action = cc.moveTo(0.4, x, pnl.getPositionY());
                let seq=cc.sequence(action,
                    cc.callFunc(function () {
                        self.lbQuantity.setEnabled(true);
                    })
                );
                pnl.runAction(seq);
               
                kaayou.emit("lobby", "ui::NumberInputPanel::Show",  {defualtNum:Number(self.iQuantity)});
            }, this);

            this.btn_close = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_close");
            this.btn_close.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.Hide();
            }, this);
            this.lbQuantity = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Quantity");

            this.btnSave = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "SaveButton");
            this.btnSave.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                if(self.iQuantity<0){
                    kaayou.emit("common","ui::Toast::Show",{msg:"扣除数量不能为负数"});
                    return;
                }
                kaayou.emit("tea","mod::TeaHouse::SetAntiIndulgence",{
                    hid:tea.mod.__teaHouseInfo.hid,
                    adminhide:tea.mod.__teaHouseInfo.isvitaminhide,
                    adminmodi:tea.mod.__teaHouseInfo.isvitaminmodi,
                    deductcount:self.iQuantity,
                    deducttype:self.iMethod,
                    gamepause:tea.mod.__teaHouseInfo.isgamepause,
                    status:tea.mod.__teaHouseInfo.isvitamin
                });
            }, this);
            this.setVisible(false);
        }

        selectRadio(index) {
            if (index == 0) {
                this.lbBigWin.setTextColor(cc.color("#D33A52"));
                this.lbAA.setTextColor(cc.color("#93692D"));
                // this.lbBigWin.setColor(cc.color("#D33A52"));
                // this.lbAA.setColor(cc.color("#93692D"));
            } else {
                this.lbAA.setTextColor(cc.color("#D33A52"));
                this.lbBigWin.setTextColor(cc.color("#93692D"));
                // this.lbAA.setColor(cc.color("#D33A52"));
                // this.lbBigWin.setColor(cc.color("#93692D"));
            }
        }

        Show() {
            this.ShowData();
            this.setVisible(true);
            kaayou.pop.showAni({
                cNode: this.node.getChildByName("contentPanel"),
                mNode: this.node.getChildByName("maskbg"),
                action: function () {

                }
            });
        }

        ShowData() {
            let self=this;
            return;
            // this.iMethod=tea.mod.__teaHouseInfo.vitamindeducttype;
            lodash.forEach(this.ndMethod.getChildren(), function (v: ccui.CheckBox, i) {
                if(i==self.iMethod){
                    v.setSelected(true);
                    self.selectRadio(i);
                }else{
                    v.setSelected(false);
                }
            });
            // this.iQuantity = tea.mod.__teaHouseInfo.vitamindeductcount;
            this.lbQuantity.setString(this.iQuantity.toString());
        }

        Hide() {
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

        ShowNumber(data) {
            data = data || ""
            this.iQuantity=data==""?0:parseFloat(data);
            this.lbQuantity.setString(data);
        }

        ReturnToMiddle() {
            let self = this;
            this.lbQuantity.setEnabled(true);
            let pnl = self.node.getChildByName("contentPanel");
            pnl.stopAllActions();
            let x = cc.winSize.width / 2;
            let action = cc.moveTo(0.4, x, pnl.getPositionY());
            pnl.runAction(action);
        }
    }
}