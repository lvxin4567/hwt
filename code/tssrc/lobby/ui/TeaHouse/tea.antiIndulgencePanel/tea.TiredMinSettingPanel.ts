namespace tea {
    var { BindEvent, doBindEvent } = kaayou._decorator;
    
    export class tea_TiredMinSettingPanelMgr {
        static __INS__: tea_TiredMinSettingPanelMgr = null;
        static getInstance(_zOrder: number = 0) {
            if (tea_TiredMinSettingPanelMgr.__INS__ == null) {
                tea_TiredMinSettingPanelMgr.__INS__ = new tea_TiredMinSettingPanelMgr();
                tea_TiredMinSettingPanelMgr.__INS__.init();
                tea_TiredMinSettingPanelMgr.__INS__._zOrder = _zOrder
            }
            return tea_TiredMinSettingPanelMgr.__INS__;
        }
        __selfPanel: tea_TiredMinSettingPanel = null;
        _zOrder: number = 0
        init() {
            let self = this;
            this.__selfPanel = null;

            kaayou.getController('tea').on('ui::TiredMinSettingPanel::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show();
            }, this, 10);

            kaayou.getController('tea').on('ui::TiredMinSettingPanel::Hide', function (e: kaayou.Event) {
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
                this.__selfPanel = new tea_TiredMinSettingPanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel,this._zOrder);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }
    }

    export class tea_TiredMinSettingPanel extends kaayou.ModelLayer {
        constructor() {
            super();
            this.initUI();
        }
        btn_close: ccui.Button = null;
        btnSave:ccui.Button=null;
        ebInput:any=null;
        editIndex:number=0;
        iTable:number=0;
        iPause:number=0;
        lbTable:ccui.Text=null;
        lbPause:ccui.Text=null;

        @doBindEvent
        initUI() {
            let self = this;
            this.isTouchMaskHide = false;
            return;
            // this.initWithccs(tea.res.TiredMinSetting_json);
            this.btn_close = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_close");
            this.btn_close.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.Hide();
            }, this);
            this.lbTable=ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "TableMin");
            this.lbTable.on(kaayou.TouchEvent.TouchEnd, function () {
                self.lbTable.setEnabled(false);
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.editIndex=0;
                let pnl=self.node.getChildByName("contentPanel");
                pnl.stopAllActions();
                let x=cc.winSize.width/4;
                let action=cc.moveTo(0.4,x,pnl.getPositionY());
                let seq=cc.sequence(action,
                    cc.callFunc(function () {
                        self.lbTable.setEnabled(true);
                    })
                );
                pnl.runAction(seq);
                
                kaayou.emit("lobby","ui::NumberInputPanel::Show",{defualtNum:Number(self.iTable)});
            }, this);
            this.lbPause=ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "PauseMin");
            this.lbPause.on(kaayou.TouchEvent.TouchEnd, function () {
                // if(tea.mod.__teaHouseInfo.area!="429004"){
                //     kaayou.emit("common","ui::Toast::Show",{msg:"比赛分下限设置功能目前只在仙桃的亲友圈中开放，其它地区敬请期待"})
                //     return;
                // }
                self.lbPause.setEnabled(false);
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.editIndex=1;
                let pnl=self.node.getChildByName("contentPanel");
                pnl.stopAllActions();
                let x=cc.winSize.width/4;
                let action=cc.moveTo(0.2,x,pnl.getPositionY());
                let seq=cc.sequence(action,
                    cc.callFunc(function () {
                        self.lbPause.setEnabled(true);
                    })
                );
                pnl.runAction(seq);
                
                kaayou.emit("lobby","ui::NumberInputPanel::Show",{defualtNum:Number(self.iPause)});
            }, this);
            
            this.btnSave=ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "SaveButton");
            this.btnSave.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit("tea","mod::TeaHouse::SetAntiIndulgence",{
                    hid:tea.mod.__teaHouseInfo.hid,
                    adminhide:tea.mod.__teaHouseInfo.isvitaminhide,
                    adminmodi:tea.mod.__teaHouseInfo.isvitaminmodi,
                    // deductcount:tea.mod.__teaHouseInfo.vitamindeductcount,
                    // deducttype:tea.mod.__teaHouseInfo.vitamindeducttype,
                    gamepause:tea.mod.__teaHouseInfo.isgamepause,
                    lowlimit:self.iTable,
                    partnerhide:tea.mod.__teaHouseInfo.ispartnerhide,
                    pause:self.iPause,
                    status:tea.mod.__teaHouseInfo.isvitamin
                });
                self.Hide();
            }, this);     
            this.setVisible(false);
        }

        Show() {
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
            return;
            this.lbTable.setString(this.iTable.toString());
            this.lbPause.setString(this.iPause.toString());
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
            if(this.editIndex==0){
                this.iTable=data==""?0:parseFloat(data);
                this.lbTable.setString(data);
            }else{
                this.iPause=data==""?0:parseFloat(data);
                this.lbPause.setString(data);
            }
        }

        ReturnToMiddle(){
            let self=this;
            self.lbTable.setEnabled(true);
            self.lbPause.setEnabled(true);
            let pnl=self.node.getChildByName("contentPanel");
            pnl.stopAllActions();
            let x=cc.winSize.width/2;
            let action=cc.moveTo(0.4,x,pnl.getPositionY());
            pnl.runAction(action);
        }
    }
}