namespace tea {
    var { BindEvent, doBindEvent } = kaayou._decorator;
    
    export class tea_TiredGivePanelMgr {
        static __INS__: tea_TiredGivePanelMgr = null;
        static getInstance(_zOrder: number = 0) {
            if (tea_TiredGivePanelMgr.__INS__ == null) {
                tea_TiredGivePanelMgr.__INS__ = new tea_TiredGivePanelMgr();
                tea_TiredGivePanelMgr.__INS__.init();
                tea_TiredGivePanelMgr.__INS__._zOrder = _zOrder;
            }
            return tea_TiredGivePanelMgr.__INS__;
        }
        __selfPanel: tea_TiredGivePanel = null;
        _zOrder: number = 0
        init() {
            let self = this;
            this.__selfPanel = null;

            kaayou.getController('tea').on('ui::TiredGivePanel::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show(e.data);
            }, this, 10);

            kaayou.getController('tea').on('ui::TiredGivePanel::Hide', function (e: kaayou.Event) {
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
                this.__selfPanel = new tea_TiredGivePanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel,this._zOrder);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }
    }

    export class tea_TiredGivePanel extends kaayou.ModelLayer {
        constructor() {
            super();
            this.initUI();
        }
        btn_close: ccui.Button = null;
        btnSave:ccui.Button=null;
        ebInput:any=null;
        editIndex:number=0;
        iUserID:number=0;
        iQuantity:number=0;
        lbQuantity:ccui.Text=null;
        ndInput:ccui.Layout=null;

        @doBindEvent
        initUI() {
            let self = this;
            this.isTouchMaskHide = false;
            this.initWithccs(tea.res.TiredGivePanel_json);
            this.ndInput=ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "InputUserID");
            let sp = new cc["Scale9Sprite"]();
            sp.initWithFile(common.res.alpha_4x4,cc.rect(0,0,0,0),cc.rect(0,0,0,0));
            let eb:cc.Node = cc["EditBox"].create(this.ndInput.getContentSize(),sp);
            this.ebInput=eb;
            eb.setAnchorPoint(0,0);
            eb.setPosition(0,0);
            eb.setOpacity(0);
            eb['setFontSize'](26);
            eb['setFontColor'](cc.color("#B97D55"));
            eb['setInputMode'](6);
            eb['setMaxLength'](10);
            
            eb['setDelegate'](
                {
                    /**
                     * This method is called when an edit box gains focus after keyboard is shown.
                     * @param {cc.EditBox} sender
                     */
                    editBoxEditingDidBegin: function (sender) {
                        //console.log('editBoxEditingDidBegin');
                        
                    },
                
                    /**
                     * This method is called when an edit box loses focus after keyboard is hidden.
                     * @param {cc.EditBox} sender
                     */
                    editBoxEditingDidEnd: function (ref) {
                        //console.log('editBoxEditingDidEnd',sender.getString());
                        let gstr = ref.getString();
                        
                        // self.doCandoRealName();
                    },
                
                    /**
                     * This method is called when the edit box text was changed.
                     * @param {cc.EditBox} sender
                     * @param {String} text
                     */
                    editBoxTextChanged: function (sender, text) {
                        //console.log('editBoxTextChanged');
                        //self.lbName.setString(text);
                    },
                
                    /**
                     * This method is called when the return button was pressed.
                     * @param {cc.EditBox} sender
                     */
                    editBoxReturn: function (sender) {
                        //console.log('editBoxReturn',sender.getString());
                    }
                }
            )
            this.ndInput.addChild(eb);

            this.btn_close = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_close");
            this.btn_close.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.Hide();
            }, this);
            
            this.lbQuantity=ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "PauseMin");
            this.lbQuantity.on(kaayou.TouchEvent.TouchEnd, function () {
                self.lbQuantity.setEnabled(false);
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.editIndex=1;
                let pnl=self.node.getChildByName("contentPanel");
                pnl.stopAllActions();
                let x=cc.winSize.width/4;
                let action=cc.moveTo(0.4,x,pnl.getPositionY());
                let seq=cc.sequence(action,
                    cc.callFunc(function () {
                        self.lbQuantity.setEnabled(true);
                    })
                );
                pnl.runAction(seq);
                kaayou.emit("lobby","ui::NumberInputPanel::Show",{defualtNum:Number(self.iQuantity)});
            }, this);
            
            this.btnSave=ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "SaveButton");
            this.btnSave.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                if(self.iQuantity<=0){
                    kaayou.emit("common","ui::Toast::Show",{msg:"赠送值必须大于0"});
                    return;
                }
                let id=self.ebInput.getString();
                let bcan = kaayou.Identify.isNumber(id);
                if(!bcan){
                    kaayou.emit("common","ui::Toast::Show",{msg:"玩家ID请输入数字"});
                    return;
                }
                kaayou.emit("tea","mod::TeaHouse::CheckMember",{
                    hid:tea.mod.__teaHouseInfo.hid,
                    uid:parseInt(id)
                });
            }, this);

            kaayou.getController('tea').on('ui::TeaHouse::CheckMember', function (e: kaayou.Event) {
                if(e.data){
                    kaayou.emit("tea","ui::TiredGiveConfirmPanel::Show",{
                        uid:e.data.uid,
                        uname:e.data.uname,
                        uurl:e.data.uurl,
                        give:self.iQuantity
                        }
                    );
                }
            }, this, 10);

            this.setVisible(false);
        }

        Show(data:{uid:number}) {
            //lw190819应周鹏要求，临时增加
            // var token: any = kaayou.DataSet.get('user::token');
            // token = JSON.parse(token);
            // token.minfo = JSON.stringify({});
            // token.engine = 2;//2是js
            // let info = kaayou.sendMessage('lobby', "setuid", token, "ws::Msg::setuid", function (info) {
            //     console.log(info);
            // });
            //
            this.ShowData();
            this.setPositionX(0);
            this.setVisible(true);
            if (!lodash.isEmpty(data)) {
                this.ebInput.setString(""+data.uid);
            }
            this.lbQuantity.setString("");
            kaayou.pop.showAni({
                cNode: this.node.getChildByName("contentPanel"),
                mNode: this.node.getChildByName("maskbg"),
                action:function(){
                    
                }
            });
        }

        ShowData(){
            this.lbQuantity.setString(this.iQuantity.toString());
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
            if(this.node.visible){
                data=data||""
                if(this.editIndex==0){
                    this.iUserID=parseFloat(data);
                }else{
                    this.iQuantity=parseFloat(data);
                    this.lbQuantity.setString(data);
                }
            }
        }

        ReturnToMiddle(){
            let self=this;
            let pnl=self.node.getChildByName("contentPanel");
            let x=cc.winSize.width/2;
            let action=cc.moveTo(0.5,x,pnl.getPositionY());
            pnl.runAction(action);
        }
    }
}