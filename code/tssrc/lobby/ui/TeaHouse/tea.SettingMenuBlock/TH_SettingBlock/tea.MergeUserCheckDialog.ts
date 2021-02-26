namespace tea {
    var { BindEvent, doBindEvent } = kaayou._decorator;
    export class tea_MergeUserCheckDialoglMgr {
        static __INS__: tea_MergeUserCheckDialoglMgr = null;
        static getInstance(zOrder: number) {
            if (tea_MergeUserCheckDialoglMgr.__INS__ == null) {
                tea_MergeUserCheckDialoglMgr.__INS__ = new tea_MergeUserCheckDialoglMgr();
                tea_MergeUserCheckDialoglMgr.__INS__.zOrder = zOrder;
                tea_MergeUserCheckDialoglMgr.__INS__.init();
            }
            return tea_MergeUserCheckDialoglMgr.__INS__;
        }
        zOrder: number = null;
        __selfPanel: MergeUserCheckDialog = null;
        init() {
            let self = this;
            this.__selfPanel = null;

            kaayou.getController('tea').on('ui::mergeCheckDialog::show', function (e: kaayou.Event) {
                self.getPanel(true).Show(e.data)
            }, this);

            kaayou.getController('tea').on('ui::mergeCheckDialog::hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new MergeUserCheckDialog();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel, this.zOrder);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }

    }

    class MergeUserCheckDialog extends kaayou.Layer{

        constructor(){
            super();
            this.initUI();
        }

        private quan_freeze_status:ccui.Layout  = null;
        private freeze_success:ccui.Layout = null;
        private freeze_fail:ccui.Layout = null;
        private quan_ingame_status:ccui.Layout  = null;
        private ingame_success:ccui.Layout = null;
        private ingame_fail:ccui.Layout = null;
        private btn_close:ccui.Button  = null;
        private SaveButton:ccui.Button = null;
        private resultText:ccui.Text = null;

        initUI(){
            this.initWithccs(res.TH_MergeUserCheckDialog_json);
            this.resultText = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Text_3_0");
            // this.resultText.ignoreContentAdaptWithSize(false);
            this.quan_freeze_status = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "quan_freeze_status");
            this.freeze_success = ccui.helper.seekWidgetByName(<ccui.Widget>this.quan_freeze_status, "success");
            this.freeze_fail = ccui.helper.seekWidgetByName(<ccui.Widget>this.quan_freeze_status, "fail");

            this.quan_ingame_status = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "quan_ingame_status");
            this.ingame_success = ccui.helper.seekWidgetByName(<ccui.Widget>this.quan_ingame_status, "success");
            this.ingame_fail = ccui.helper.seekWidgetByName(<ccui.Widget>this.quan_ingame_status, "fail");

            this.SaveButton = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "SaveButton");
            this.btn_close = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_close");


            this.freeze_fail.setVisible(false)
            this.freeze_success.setVisible(false)
            this.ingame_fail.setVisible(false)
            this.ingame_success.setVisible(false)



            this.SaveButton.on(kaayou.TouchEvent.TouchEnd,()=>{
                this.submit(this.hid);
            },this)

            this.btn_close.on(kaayou.TouchEvent.TouchEnd,()=>{
                this.Hide();
            },this)

        }


        initStatus(){
            this.freeze_fail.setVisible(false)
            this.freeze_success.setVisible(false)
            this.ingame_fail.setVisible(false)
            this.ingame_success.setVisible(false)
            this.passed = false;
            this.hid = null;
        }

        async checkStatus(data){

            let {isfrozen,isgaming,hid} = data;

            if(isfrozen===true)
                this.freeze_success.setVisible(true)
            else
                this.freeze_fail.setVisible(true)

            if(isgaming===false)
                this.ingame_success.setVisible(true)
            else
                this.ingame_fail.setVisible(true)

            

            this.passed = !isgaming && isfrozen

            if(this.passed){
                this.resultText.string = "......\n\n合圈条件满足要求，请继续您的操作";
                (<ccui.TextBMFont>this.SaveButton.getChildByName("BitmapFontLabel_4")).setString("发送申请")
            }
            else 
                this.resultText.string = "......\n\n合圈条件不满足，请处理后再尝试"

            this.hid=  hid;
        }

        private hid = null;
        private passed:boolean = false;
        submit(hid){

            let self= this;
            if(this.passed===false){
                kaayou.emit('common', 'ui::Dialog::Show', {
                    msg: "您的合圈请求没有通过检测，通过上述操作之后再试",
                    btns: [
                        {
                            name: "确定",
                            action: function () {
                                self.Hide();
                            },
                            colorType: 'green'
                        }
                    ]
                })
                return ;
            }

            // kaayou.emit("tea",'ui::mergeUserDialog::show', 
            // {
            //     type:tea_MergeUserDialoglMgr.MergeUserDialogType.QUAN_MODIFY,
            //     text:`您正在向亲友圈${hid}申请被合并\n\n合并后您的亲友圈将会被注销\n玩家将会被迁移至新的朋友圈`,
            //     action:(hide)=>{
            //         kaayou.emit("tea","ui::mergeUserPanel::requireHQ",{hid});    
            //         self.Hide();
            //         hide();
            //     },
            //     cancel:(hide)=>{
            //         hide();
            //     }
            // })
            kaayou.emit("tea","ui::mergeUserPanel::requireHQ",{hid});    
            self.Hide();

            
        }

        Hide(){
            this.node.setVisible(false)
            this.initStatus();
        }

        Show(data){
            this.checkStatus(data);
            this.node.setVisible(true);
        }

    }

}