
/**
 * 
 * 手机登陆面板
 */

namespace lobby {
    const { BindEvent, doBindEvent } = kaayou._decorator;

    export class lobby_PhoneLoginMgr {
        static __INS__: lobby_PhoneLoginMgr = null;
        static getInstance() {
            if (lobby_PhoneLoginMgr.__INS__ == null) {
                lobby_PhoneLoginMgr.__INS__ = new lobby_PhoneLoginMgr();
                lobby_PhoneLoginMgr.__INS__.init();
            }
            return lobby_PhoneLoginMgr.__INS__;
        }
        __selfPanel: PhoneLoginPanel = null;

        init() {
            let self = this;
            this.__selfPanel = null;
            kaayou.getController('lobby').on('ui::PhoneLoginPanel::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show();
            }, this, 10);
            kaayou.getController('lobby').on('ui::PhoneLoginPanel::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new PhoneLoginPanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }

    }



    export class PhoneLoginPanel extends kaayou.Layer {
        maskBg: cc.Layer = null;
        contentPanel: ccui.Layout = null;
        btn_close: ccui.Button = null;
        titleLabel: ccui.Text = null;
        edx_tel: ccui.TextField = null;
        edit_tel:any = null;
        edx_pass: ccui.TextField = null;
        edit_pass:any = null;
        btn_register: ccui.Layout = null;
        btn_find: ccui.Layout = null;
        btn_login: ccui.Button = null;
        btn_sendCheck: ccui.Button = null;
        timeDaoji: ccui.Text = null;
        constructor() {
            super();
            this.initUI();
        }
        // @doBindEvent
        initUI() {
            this.initWithccs(lobby.res.PhoneLoginPanel_json);
            let self = this;
            this.maskBg = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "maskbg");
            this.contentPanel = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "contentPanel");
            this.btn_close = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_close");

            this.edx_tel = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "edx_tel");
            this.edx_pass = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "edx_pass");
            this.btn_sendCheck = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "sendMessage_btn");
            this.timeDaoji = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "time");
            this.btn_login = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_login");
            this.btn_sendCheck.on(kaayou.TouchEvent.TouchEnd, this.BtnGetVerification, this);


            this.btn_close.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.Hide();
            }, this)

            this.btn_login.on(kaayou.TouchEvent.TouchEnd, this.BtnRegist, this);
            let attr = {"fontSize":26,
            "fontColor":"#B97D55",
            "setInputMode":6,
            "setMaxLength":11,
            "setPlaceholderFontSize":26,
            };
            this.edit_tel =  kaayou.editBox.attachTextEdit(this.node,"edx_tel","请输入手机号",(str)=>{
                let label_err = self.edx_tel.parent.getChildByName<ccui.Text>('label_err');
                label_err.setString(kaayou.Identify.isPhone(str) ? "" : "请输入正确的手机号");
                self.doCandoLogin();
            },attr);
            this.edit_pass =  kaayou.editBox.attachTextEdit(this.node,"edx_pass","请输入验证码",(str)=>{
                let label_err = self.edx_pass.parent.getChildByName<ccui.Text>('label_err');
                label_err.setString(kaayou.Identify.isNumber(str) ? "" : "验证码不合规");
                self.doCandoLogin();
            },attr);
            self.Hide();
        }

        BtnRegist() {
            let self = this;
            kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
            if (!self.btn_login.enabled) { return false; }
            self.btn_login.enabled = false;
            self.schedule(function () {
                self.btn_login.enabled = true;
            }, 0.5, 0);

            self.phoneText = this.edit_tel.getString();
            self.codeText = this.edit_pass.getString();
            if (self.phoneText.length < 1 || self.codeText.length < 1) {
                kaayou.emit("common", 'ui::Toast::Show', { msg: '手机号和验证码不能为空' });
                return;
            }
            kaayou.emit("lobby", "mod::User::GetTokenByPhone", { mobile: self.phoneText, code: self.codeText });
            this.edit_pass.setString("");
            self.codeText = this.edit_pass.getString();
        }

        codeText: string;
        phoneText: string;
        BtnGetVerification() {
            let self = this;
            kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
            //获取验证码按钮的逻辑
            if (this.edit_tel.getString().length < 1) {
                kaayou.emit("common", "ui::Toast::Show", { msg: "手机号不能为空" });
                return;
            }
            if (!kaayou.Identify.isPhone(this.edit_tel.getString())) {
                kaayou.emit("common", "ui::Toast::Show", { msg: "手机号格式错误!" })
                return;
            }
            if (self.btn_sendCheck.enabled == true) {
                self.phoneText = this.edit_tel.getString();
                self.btn_sendCheck.enabled = false;
                self.time = Math.floor((new Date()).getTime() / 1000) + 60;
                self.unschedule(self.timeline)
                self.schedule(self.timeline, 0.2, 100000000);
                //请求获取验证码
                let typ = 1;
                // self.btn_get_verification.getComponent(cc.Sprite).spriteFrame=self.sfSend;
                kaayou.emit("lobby", "mod::User::getPhoneMsgCode", { mobile: self.phoneText, type: typ });
            }
        }
        time = 0;
        timeline() {
            if (this.time <= 0) {
                this.resetAuto();
                return;
            }
            let ti = this.time - Math.floor((new Date()).getTime() / 1000);
            if (ti <= 0) {
                this.resetAuto();
                return
            }
            this.timeDaoji.string = ti.toString();
        }

        resetAuto(fir: boolean = false) {
            let self = this;
            if (fir) {
                // this.authcodeBtn.normalSprite = this.authBtnAtlas.getSpriteFrame('btn_sendcode');
                // this.authcodeBtn.pressedSprite = this.authBtnAtlas.getSpriteFrame('btn_sendcode_deep');
                // this.authcodeBtn.hoverSprite = this.authBtnAtlas.getSpriteFrame('btn_sendcode');
                // this.authcodeBtn.disabledSprite = this.authBtnAtlas.getSpriteFrame('btn_sendcode');
            }
            this.time = 0;
            this.timeDaoji.string = "";
            this.btn_sendCheck.enabled = true;
            this.unschedule(this.timeline);
        }




        doCheckLogin() {
            let bcan = true;
            bcan = bcan && kaayou.Identify.isPhone(this.edit_tel.getString());
            bcan = bcan && kaayou.Identify.isPassWord(this.edit_pass.getString());
            return bcan;
        }

        doCandoLogin() {
            let bcan = this.doCheckLogin();
            Patch.SetBtnAndTextBright(this.btn_login, bcan)
            if (bcan) {
                kaayou.Shader.turnRestore((<ccui.Text>this.btn_login.getChildren()[0]).getVirtualRenderer());
            } else {
                kaayou.Shader.turnGray((<ccui.Text>this.btn_login.getChildren()[0]).getVirtualRenderer());
            }
        }

        // @BindEvent('lobby', 'ui::PhoneLoginPanel::Show')
        Show() {
            this.edit_tel.setString("");
            this.edit_pass.setString("");
            this.edx_tel.parent.getChildByName<ccui.Text>('label_err').setString("");
            this.edx_pass.parent.getChildByName<ccui.Text>('label_err').setString("");
            //this.tel_label.string = "";
            ///this.pass_Label.string = "";
            // if (this.time <= 0) {
                this.resetAuto(true);
            // }

            this.doCandoLogin();
            this.setVisible(true);
        }
 

        // @BindEvent('lobby', 'ui::PhoneLoginPanel::Hide')
        Hide() {
            this.setVisible(false);
        }
    }
}