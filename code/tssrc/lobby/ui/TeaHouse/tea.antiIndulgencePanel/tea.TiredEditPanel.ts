namespace tea {
    var { BindEvent, doBindEvent } = kaayou._decorator;
    
    export class tea_TiredEditPanelMgr {
        static __INS__: tea_TiredEditPanelMgr = null;
        static getInstance(_zOrder: number = 0) {
            if (tea_TiredEditPanelMgr.__INS__ == null) {
                tea_TiredEditPanelMgr.__INS__ = new tea_TiredEditPanelMgr();
                tea_TiredEditPanelMgr.__INS__.init();
                tea_TiredEditPanelMgr.__INS__._zOrder = _zOrder;
            }
            return tea_TiredEditPanelMgr.__INS__;
        }
        __selfPanel: tea_TiredEditPanel = null;
        _zOrder: number = 0
        init() {
            let self = this;
            this.__selfPanel = null;

            kaayou.getController('tea').on('ui::TiredEditPanel::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show(e.data);
            }, this, 10);

            kaayou.getController('tea').on('ui::TiredEditPanel::Hide', function (e: kaayou.Event) {
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
                this.__selfPanel = new tea_TiredEditPanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel,this._zOrder);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }
    }

    export class tea_TiredEditPanel extends kaayou.ModelLayer {
        constructor() {
            super();
            this.initUI();
        }
        _data=null;
        btnModifyClose: ccui.Button = null;
        btnSave:ccui.Button=null;
        editIndex:number=0;
        iChange:number=0;
        lbModifyPanelTiredValue: ccui.Text = null;
        lbChange:ccui.Text=null;

        @doBindEvent
        initUI() {
            let self = this;
            this.isTouchMaskHide = false;
            this.initWithccs(tea.res.TiredEditPanel_json);

            self.btnModifyClose = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "ModifyCloseButton");
            self.btnModifyClose.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.Hide();
            }, this);

            self.lbModifyPanelTiredValue = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "ModifyPanelTiredLabel");
            self.lbChange=ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "ChangeTiredValue");
            this.lbChange.on(kaayou.TouchEvent.TouchEnd, function () {
                self.lbChange.setEnabled(false);
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                let pnl=self.node.getChildByName("contentPanel");
                pnl.stopAllActions();
                let x=cc.winSize.width/4;
                let action=cc.moveTo(0.4,x,pnl.getPositionY());
                let seq=cc.sequence(action,
                    cc.callFunc(function () {
                        self.lbChange.setEnabled(true);
                    })
                );
                pnl.runAction(seq);
                
                kaayou.emit("lobby","ui::NumberInputPanel::Show",{defualtNum:Number(self.iChange)});
            }, this);

            self.btnSave = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "SaveButton");
            self.btnSave.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                if (self.iChange==0) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: "请输入不等于0的数字" });
                    return;
                }
                //lw190813小于0走调整，大于0走赠送
                if(self.iChange<=0){

                    if ((tea.mod._isMaster() || tea.mod._isCPAdmin()) && (tea.mod.__teaHouseInfo.uid==self._data.uid)) {
                        kaayou.emit("tea", "mod::TeaHouse::WareHouseRw", { value: self.iChange });
                    }else{
                        kaayou.emit("tea", 'mod::Fcm::Set', {
                            hid: tea.mod.__teaHouseInfo.hid,
                            uid: self._data.uid, 
                            value: self.iChange
                        });
                    }
                }else{
                    if((tea.mod._isMaster() || tea.mod._isCPAdmin()) && tea.mod.__teaHouseInfo.uid==self._data.uid){
                        // kaayou.emit("common", 'ui::Toast::Show', { msg: "圈主请直接从比赛分仓库提取比赛分" });
                        // return;
                        kaayou.emit("tea", "mod::TeaHouse::WareHouseRw", { value: self.iChange });
                    }else{
                        if(self.iChange>tea.mod.__teaHouseInfo.vitamin){
                            if(tea.mod._isMaster()){
                                if (self._data.uid != tea.mod.__teaHouseInfo.uid) {
                                    kaayou.emit("common", 'ui::Toast::Show', { msg: "您的比赛分配额不足，请先增加自身配额" });
                                    return;
                                }
                                
                            }else{
                                kaayou.emit("common", 'ui::Toast::Show', { msg: "您的比赛分配额不足，请先增加自身配额" });
                                return;
                            }
                        }
                        kaayou.emit("tea","mod::Fcm::Give",{
                            uid:self._data.uid,
                            value:self.iChange,
                            hid:tea.mod.__teaHouseInfo.hid
                        });
                    }
             
                }
                self.Hide();
            }, this);
            this.setVisible(false);

            kaayou.getController('tea').on('ui::TeaHouse::UpdateTiredValue', function (e: kaayou.Event) {
                self.lbModifyPanelTiredValue.setString(e.data.value);
            }, this, 10);
        }

        Show(data) {
            this._data=data;
            this.ShowData();
            this.setPositionX(0);
            this.setVisible(true);
            kaayou.pop.showAni({
                cNode: this.node.getChildByName("contentPanel"),
                mNode: this.node.getChildByName("maskbg"),
                action:function(){
                    
                }
            });
        }

        ShowData(){
            this.lbModifyPanelTiredValue.setString(this._data.curvitamin.toString());
            this.iChange=0;
            this.lbChange.setString(this.iChange.toString());
        }

        Hide() {
            let self=this;
            kaayou.pop.hideAni(
                {
                    cNode: this.node.getChildByName("contentPanel"),
                    mNode: this.node.getChildByName("maskbg"),
                    rnode: this,
                    action:function(){
                    }
                }
            )
        }

        ShowNumber(data){
            data=data||""
            this.iChange=parseFloat(data);
            this.lbChange.setString(data);
        }

        ReturnToMiddle(){
            let self=this;
            self.lbChange.setEnabled(true);
            let pnl=self.node.getChildByName("contentPanel");
            pnl.stopAllActions();
            let x=cc.winSize.width/2;
            let action=cc.moveTo(0.4,x,pnl.getPositionY());
            pnl.runAction(action);
        }
    }
}