/**
 *  显示桌子数量面板
 */

namespace tea {
    const { doBindEvent, BindEvent } = kaayou._decorator;
  export class tea_TeaShowTablePanelMgr {
        static __INS__: tea_TeaShowTablePanelMgr = null;
        static getInstance(_zOrder:number) {
            if (tea_TeaShowTablePanelMgr.__INS__ == null) {
                tea_TeaShowTablePanelMgr.__INS__ = new tea_TeaShowTablePanelMgr();
                tea_TeaShowTablePanelMgr.__INS__.init();
                tea_TeaShowTablePanelMgr.__INS__._zOrder = _zOrder;
            }
            return tea_TeaShowTablePanelMgr.__INS__;
        }
        __selfPanel: ShowTableCountPanel = null;
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

            kaayou.getController('tea').on('ui::ShowTableCountPanel::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show();
            }, this, 10);
            kaayou.getController('tea').on('ui::ShowTableCountPanel::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new ShowTableCountPanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel,this._zOrder);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }

    }

    export class ShowTableCountPanel extends kaayou.ModelLayer {
        constructor() {
            super();
            this.initUI();
        }
        btn_close: ccui.Button = null;
        btn_Submit:ccui.Button = null;
        _data:tea.Data_HouseInfo = null;
        showTableCountLayout :ccui.Layout = null;
        showCountRadio:common.RadioGroup = null;
        radioDict = {0:0,5:1,10:2,20:3}
        numDict = {0:0,1:5,2:10,3:20}
        iTable = 0;
        // @doBindEvent
        initUI() {
            this.initWithccs(tea.res.TH_ShowTableCountPanel);
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
                    self.iTable = i 
                }, self);
                self.showCountRadio.add(v);
            });

            this.btn_close.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.Hide();
            }, this);
        
            this.btn_Submit.on(kaayou.TouchEvent.TouchStart, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit("tea", "mod::TeaHouse::housesettblshowcount",{count:self.numDict[self.iTable]});
                self.Hide();
            }, this);

            this.Hide();
        }

   

        onTeaHouseUpdateInfo(data:tea.Data_HouseInfo) {
            this._data = data;
        }

        Show() {
            if (!tea.mod.__teaHouseInfo) {
                return
            }
            let seletIndex = this.radioDict[tea.mod.__teaHouseInfo.tblshowcount];
            this.setVisible(true);
            this.iTable = seletIndex;
            (<ccui.CheckBox>this.showTableCountLayout.getChildren()[seletIndex]).setRadioSelected();
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