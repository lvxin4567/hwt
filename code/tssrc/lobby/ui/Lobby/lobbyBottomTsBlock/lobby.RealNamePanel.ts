/**
 * 
 * 实名认证面板
 */

namespace lobby {
    const { BindEvent, doBindEvent } = kaayou._decorator;

    export class RealNameMgr {
        static __INS__: RealNameMgr = null;
        static getInstance(_zOrder: number = 0) {
            if (RealNameMgr.__INS__ == null) {
                RealNameMgr.__INS__ = new RealNameMgr();
                RealNameMgr.__INS__.init();
                RealNameMgr.__INS__._zOrder = _zOrder;
            }
            return RealNameMgr.__INS__;
        }
        public _zOrder = 0;
        private _renamePanel: RealNamePanel;
        __selfPanel: RealNamePanel = null;
        init() {
            let self = this;
            this._renamePanel = null;
            kaayou.getController('lobby').on('ui::RealNamePanel::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show();
            }, this, 10);

            kaayou.getController('lobby').on('ui::RealNamePanel::Hide', function (e: kaayou.Event) {
                if (!self.__selfPanel) {
                    return;
                }
                self.getPanel(false).Hide();
            }, this, 10);
            return true;
        }
        
        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new RealNamePanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel, this._zOrder);    //这个地方怎么不管用？？？
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            if (this.__selfPanel) {
                return this.__selfPanel;  
            }
        }
    }

    export class RealNamePanel extends kaayou.Layer {
        btnClose: ccui.Button = null;
        btnPanel: ccui.Layout = null;
        contentPanel: ccui.Layout = null;
        ebIdCard:any=null;
        ebName:any=null;
        lbIdCardErr:ccui.Text=null;
        lbNameErr:ccui.Text=null;
        maskBg: cc.Layer = null;
        ndIdCard:cc.Layer=null;
        ndName:cc.Layer=null;
        
        msgLabel: ccui.Text = null;
        //titleLabel: ccui.Text = null;

        edx_name: ccui.TextField = null;
        edx_cert: ccui.TextField = null;

        btn_immediately: ccui.Button = null;
        boxAPI = null;
        constructor() {
            super();
            this.initUI();
        }
        @doBindEvent
        initUI() {
            this.initWithccs(lobby.res.RealNamePanel_json);
            let self = this;
            let boxAPI = this.boxAPI= kaayou.editBox.target(this.node);

            this.lbNameErr=ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "NameErr");
            this.lbIdCardErr=ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "IDCardErr");

            this.ndName=ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "input_name");
            this.ndIdCard=ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "input_id");
            this.maskBg = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "maskbg");
            this.contentPanel = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "contentPanel");
            this.btnClose = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_notice_close");

            this.btnClose.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.Hide();
            }, this)

            this.edx_name = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "nameErr");
            this.edx_cert = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "IDCardErr");
            this.btn_immediately = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "submit");

            this.btn_immediately.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                let reqData: { idcard: string, name: string } = {
                    idcard: boxAPI.getValue("input_id"),
                    name: boxAPI.getValue("input_name")//self.ebName.getString()
                };
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit("lobby", "mod::User::realName", reqData);
            }, this);

            boxAPI.attachTextEdit("input_name",function(result){
                if(result===true){
                    self.edx_name.setString("")
                }else{
                    self.edx_name.setString("请正确的输入您的姓名");
                }
                self.doCandoRealName();
            },{
                type:"validate",
                regExp:/^[\u4E00-\u9FA5]{2,8}$/,
                placeholdStr:"请输入您的姓名...",
                setMaxLength:8,
                regHandle:function(res){
                    if(res===true){
                        self.edx_name.setString("")
                    }else{
                        self.edx_name.setString("请正确的输入您的姓名");
                    }
                }
            })


            boxAPI.attachTextEdit("input_id",function(result){
                if(result===true){
                    self.edx_cert.setString("")
                }else{
                    self.edx_cert.setString("请正确的输入您的身份证号");
                }
                self.doCandoRealName();
            },{
                type:"validate",
                regExp:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
                placeholdStr:"请输入您的身份证号...",
                setMaxLength:18,
                regHandle:function(res){
                    if(res===true){
                        self.edx_cert.setString("")
                    }else{
                        self.edx_cert.setString("请正确的输入您的身份证号");
                    }
                }
            })

            self.Hide();
        }

        doCandoRealName() {
            let bcan =  kaayou.Identify.isReName(this.boxAPI.getValue("input_name")) && kaayou.Identify.idCard(this.boxAPI.getValue("input_id"));
            Patch.SetBtnAndTextBright(this.btn_immediately, bcan)
        }
        Show() {
            this.doCandoRealName();
            this.setVisible(true);
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
                    rnode: this,
                    action:function(){
                    }
                }
            )
        }




    }
}