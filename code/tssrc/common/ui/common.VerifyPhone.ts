namespace common {
    const { BindEvent, doBindEvent } = kaayou._decorator;

    export class VerifyPhone extends kaayou.Layer {
        callback:Function;
        maskBg: cc.Layer = null;
        contentPanel: ccui.Layout = null;
        btn_close: ccui.Button = null;
        titleLabel: ccui.Text = null;
        edx_tel: ccui.TextField = null;
        lbTel: ccui.Text = null;
        edx_pass: ccui.TextField = null;
        pass_Label: ccui.Text = null;
        btn_login: ccui.Button = null;
        btn_sendCheck: ccui.Button = null;
        timeDaoji: ccui.Text = null;
        constructor() {
            super();
            this.initUI();
        }
        // @doBindEvent
        initUI() {
            this.initWithccs(common.res.VerifyPhone_json);
            let self = this;
            this.maskBg = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "maskbg");
            this.contentPanel = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "contentPanel");
            this.btn_close = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_close");

            this.edx_tel = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "edx_tel");
            this.lbTel = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "lable_tel");
            this.edx_pass = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "edx_pass");
            this.pass_Label = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "lable_pass");
            this.btn_sendCheck = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "sendMessage_btn");
            this.timeDaoji = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "time");

            this.btn_login = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_login");

            // this.titleLabel = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "titleLabel");
            this.btn_sendCheck.on(kaayou.TouchEvent.TouchEnd, this.BtnGetVerification, this);


            this.btn_close.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.Hide();
            }, this)

            this.btn_login.on(kaayou.TouchEvent.TouchEnd, this.BtnRegist, this);

            this.edx_tel.addEventListener(function (ref: ccui.TextField, type) {

                if (ccui.TextField.EVENT_ATTACH_WITH_IME == type) {
                    console.log("EVENT_ATTACH_WITH_IME");
                } else if (ccui.TextField.EVENT_DETACH_WITH_IME == type) {
                    console.log("EVENT_DETACH_WITH_IME");
                } else if (ccui.TextField.EVENT_INSERT_TEXT == type || ccui.TextField.EVENT_DELETE_BACKWARD == type) {
                    console.log("EVENT_INSERT_TEXT");
                    let gstr = ref.getString();
                    do {
                        let parent = ref.getParent();
                        if (!parent) { break; }
                        let label_err = parent.getChildByName<ccui.Text>('label_err');
                        if (!label_err) { break; }
                        label_err.setString(kaayou.Identify.isPhone(ref.getString()) ? "" : "请输入正确的手机号");
                    } while (0)
                    self.edx_tel.setString(gstr);
                    self.lbTel.setString(gstr);
                }
            }, this);

            this.edx_pass.addEventListener(function (ref: ccui.TextField, type) {
                if (ccui.TextField.EVENT_ATTACH_WITH_IME == type) {
                    console.log("EVENT_ATTACH_WITH_IME");
                } else if (ccui.TextField.EVENT_DETACH_WITH_IME == type) {
                    console.log("EVENT_DETACH_WITH_IME");
                } else if (ccui.TextField.EVENT_INSERT_TEXT == type || ccui.TextField.EVENT_DELETE_BACKWARD == type) {
                    console.log("EVENT_INSERT_TEXT");
                    let gstr = ref.getString();
                    do {
                        let parent = ref.getParent();
                        if (!parent) { break; }
                        let label_err = parent.getChildByName<ccui.Text>('label_err');
                        if (!label_err) { break; }
                        label_err.setString(kaayou.Identify.isNumber(ref.getString()) ? "" : "验证码不合规");
                    } while (0)
                    self.edx_pass.setString(gstr);
                    self.pass_Label.setString(gstr);
                }
            }, this);

            kaayou.getController('common').on('ui::VerifyPhone::Show', function (e: kaayou.Event) {
                self.Show(e.data);
            }, this, 10);
            kaayou.getController('common').on('ui::VerifyPhone::Hide', function (e: kaayou.Event) {
                self.Hide();
            }, this, 10);

            kaayou.getController('common').on('ui::VerifyPhone::Passed', function (e: kaayou.Event) {
                self.Hide();
                self.callback && self.callback();
            }, this, 10);

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

            self.phoneText = this.lbTel.string;
            self.codeText = this.edx_pass.string;
            if (self.phoneText.length < 1 || self.codeText.length < 1) {
                kaayou.emit("common", 'ui::Toast::Show', { msg: '手机号和验证码不能为空' });
            }
            kaayou.emit("lobby", "mod::User::VerifyPhone", { mobile: self.phoneText, code: self.codeText });
        }


        codeText: string;
        phoneText: string;
        BtnGetVerification() {
            let self = this;
            kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
            //获取验证码按钮的逻辑
            console.log('获取验证码按钮被点击');
            if (this.lbTel.string.length < 1) {
                kaayou.emit("common", "ui::Toast::Show", { msg: "手机号不能为空" });
                return;
            }
            if (!kaayou.Identify.isPhone(this.lbTel.string)) {
                kaayou.emit("common", "ui::Toast::Show", { msg: "手机号格式错误!" })
                return;
            }
            if (self.btn_sendCheck.enabled == true) {
                self.phoneText = this.lbTel.string;
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
            // this.btn_get_verification.interactable = true;
            // this.btn_get_verification.enabled = true;
            // self.btn_get_verification.getComponent(cc.Sprite).spriteFrame=self.sfSent;
            this.unschedule(this.timeline);
        }

        Show(data) {
            this.cleanEditBoxString(this.edx_tel);
            this.cleanEditBoxString(this.edx_pass);
            if(!!data.tel) this.lbTel.setString(data.tel);
            else this.lbTel.setString("");
            if(!!data.callback) this.callback=data.callback;
            this.pass_Label.string = "";
            // if (this.time <= 0) {
                this.resetAuto(true);
            // }
            this.setVisible(true);
        }
        cleanEditBoxString(ref: ccui.TextField) {
            ref.setString("");
            do {
                let parent = ref.getParent();
                if (!parent) { break; }
                let label_err = parent.getChildByName<ccui.Text>('label_err');
                if (!label_err) { break; }
                label_err.setString("");
            } while (0)
        }

        // @BindEvent('lobby', 'ui::PhoneLoginPanel::Hide')
        Hide() {
            this.setVisible(false);
        }
    }
}