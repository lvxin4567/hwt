//时段筛选设置
namespace tea {
    const { doBindEvent, BindEvent } = kaayou._decorator;
    export class tea_TimePanelMgr {
        static __INS__: tea_TimePanelMgr = null;
        static getInstance(_zOrder: number) {
            if (tea_TimePanelMgr.__INS__ == null) {
                tea_TimePanelMgr.__INS__ = new tea_TimePanelMgr();
                tea_TimePanelMgr.__INS__.init();
                tea_TimePanelMgr.__INS__._zOrder = _zOrder;
            }
            return tea_TimePanelMgr.__INS__;
        }
        __selfPanel: TimePanel = null;
        _zOrder: number = 0;
        _data: tea.Data_HouseInfo = null;
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

            kaayou.getController('tea').on('ui::TimePanel::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show();
            }, this, 10);
            kaayou.getController('tea').on('ui::TimePanel::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new TimePanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel, this._zOrder);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }

    }

    export class TimePanel extends kaayou.ModelLayer {
        constructor() {
            super();
            this.initUI();
        }
        btn_close: ccui.Button = null;
        btn_Submit: ccui.Button = null;
        _data: tea.Data_HouseInfo = null;
        showTableCountLayout: ccui.Layout = null;
        showCountRadio: common.RadioGroup = null;
        radioDict = { 3: 0, 6: 1, 8: 2, 12: 3 };
        numDict = { 0: 3, 1: 6, 2: 8, 3: 12 };
        iTable = 0;
        // @doBindEvent
        initUI() {
            this.initWithccs(tea.res.TH_TimePanel_json);
            this.isTouchMaskHide = false;
            let self = this;
            this.btn_close = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_close");
            this.btn_Submit = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_submit");
            this.showTableCountLayout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "shoeTableCountType");
            this.showCountRadio = new common.RadioGroup();
            lodash.forEach(this.showTableCountLayout.getChildren(), function (v: ccui.CheckBox, i) {
                v['index'] = i;
                v.on(kaayou.RadioEvent.SELECTED, function () {
                    kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                    self.iTable = i;
                    lodash.forEach(this.showTableCountLayout.getChildren(), function (vv: ccui.CheckBox, ii) {
                        if (vv['index'] == ii) {
                            (<ccui.Text>vv.getChildByName("Text")).setTextColor(cc.hexToColor("#D33A25"));
                        } else {
                            (<ccui.Text>vv.getChildByName("Text")).setTextColor(cc.hexToColor("#93692D"));//
                        }
                    });
                }, self);
                self.showCountRadio.add(v);
            });

            this.btn_close.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.Hide();
            }, this);

            this.btn_Submit.on(kaayou.TouchEvent.TouchStart, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit("tea", "mod::TeaHouse::SetRecordTimeInterval", {
                    hid: mod.__teaHouseInfo.hid,
                    timeinterval: self.numDict[self.iTable]
                });
                self.Hide();
            }, this);

            this.Hide();
        }



        onTeaHouseUpdateInfo(data: tea.Data_HouseInfo) {
            this._data = data;
        }

        Show() {
            if (!tea.mod.__teaHouseInfo) {
                return
            }
            let seletIndex = this.radioDict[tea.mod.__teaHouseInfo.record_time_interval];
            if (seletIndex == undefined) seletIndex = 3;
            this.setVisible(true);
            this.iTable = seletIndex;
            (<ccui.CheckBox>this.showTableCountLayout.getChildren()[seletIndex]).setRadioSelected();
            kaayou.pop.showAni({
                cNode: this.node.getChildByName("contentPanel"),
                mNode: this.node.getChildByName("maskbg"),
                action: function () {

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