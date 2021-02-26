/**
 * 
 * 绑定手机面板
 */
namespace lobby {
    const { BindEvent, doBindEvent } = kaayou._decorator;
    export class BindPhonePanelMgr {
        static __INS__: BindPhonePanelMgr = null;
        static getInstance(_zOrder: number = 0) {
            if (BindPhonePanelMgr.__INS__ == null) {
                BindPhonePanelMgr.__INS__ = new BindPhonePanelMgr();
                BindPhonePanelMgr.__INS__.init();
                BindPhonePanelMgr.__INS__._zOrder = _zOrder;
            }
            return BindPhonePanelMgr.__INS__;
        }
        __selfPanel: BindPhonePanel = null;
        public _zOrder = 0;
        init() {
            let self = this;
            this.__selfPanel = null;
            kaayou.getController('lobby').on('ui::BindPhonePanel::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show(e.data);
            }, this, 10);

            kaayou.getController('lobby').on('ui::BindPhonePanel::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);

            kaayou.getController('lobby').on('ui::BindPhonePanel::change', function (e: kaayou.Event) {
                self.__selfPanel.changePanelShow(e.data);
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new BindPhonePanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel, this._zOrder);
            }
            return this.__selfPanel;
        }
    }

    export class BindPhonePanel extends kaayou.Layer {
        btnClose: ccui.Button = null;
        contentPanel: ccui.Layout = null;
        ebTel: any = null;
        ebVerify: any = null;
        lbTelErr: ccui.Text = null;
        lbVerifyErr: ccui.Text = null;
        maskBg: cc.Layer = null;
        pnlTel: cc.Layer = null;
        pnlVerify: cc.Layer = null;

        titleLabel: ccui.Text = null;
        //edx_tel: ccui.TextField = null;
        edx_tel_label: ccui.Text = null;
        //edx_verification: ccui.TextField = null;
        btn_get_verification: ccui.Button = null;
        chg_time_Lable: ccui.Text = null;
        btn_bind: ccui.Button = null;
        edx_verification_label: ccui.Text = null;

        btn_unBind: ccui.Button = null;

        bind_panel: ccui.Layout = null;
        unbind_panel: ccui.Layout = null;
        isBind: boolean = true;  //是否是绑定
        constructor() {
            super();
            this.initUI();
        }
        @doBindEvent
        initUI() {
            this.initWithccs(lobby.res.BindPhonePanel_json);
            let self = this;
            this.lbTelErr = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "TelErr");
            this.lbVerifyErr = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "VerifyErr");
            this.pnlTel = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "TelInput");
            this.pnlVerify = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "VerifyInput");
            this.maskBg = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "maskbg");
            this.contentPanel = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "contentPanel");
            this.btnClose = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_close");
            this.btn_get_verification = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "sendMessage_btn");
            this.btn_bind = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_Bind");
            this.bind_panel = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "bind_panel");
            this.unbind_panel = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "unbind_panel");
            this.btn_unBind = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_unBind");
            //this.edx_tel = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "edx_tel");
            this.edx_tel_label = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "lable_tel");
            //this.edx_verification = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "edx_pass");
            this.edx_verification_label = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "lable_pass");
            // this.edx_pass = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "edx_pass");
            // this.edx_repass = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "edx_repass");

            this.chg_time_Lable = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "time");

            this.btnClose.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.Hide();
            }, this)

            this.btn_bind.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                if (!self.doCheckChanger()) return;
                let reqData = {
                    mobile: self.ebTel.string,
                    code: self.ebVerify.string,
                }
                kaayou.emit("lobby", "mod::User::bindPhone", reqData);
            }, this)

            this.btn_unBind.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                if (!self.doCheckChanger()) return;
                let reqData = {
                    mobile: self.ebTel.string,
                    code: self.ebVerify.string,
                }
                kaayou.emit("lobby", "mod::User::unBindPhone", reqData);
            }, this)

            this.btn_get_verification.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                let tel = this.ebTel.getString();
                if (!kaayou.Identify.isPhone(tel)) {
                    return;
                }
                console.log(!!this.isBind)
                kaayou.emit("lobby", "mod::User::getPhoneMsgCode", {
                    mobile: tel,
                    type: !!(!this.isBind) ? 3 : 2,
                    call: function () {
                        self._lasttime = Date.unix() + 60;
                    }.bind(this)
                });
            }, this);

            let sp = new cc["Scale9Sprite"]();
            sp.initWithFile(common.res.alpha_4x4, cc.rect(0, 0, 0, 0), cc.rect(0, 0, 0, 0));
            let eb: cc.Node = cc["EditBox"].create(this.pnlTel.getContentSize(), sp);
            this.ebTel = eb;
            eb.setAnchorPoint(0, 0);
            eb.setPosition(0, 0);
            eb.setOpacity(0);
            eb['setFontSize'](26);
            eb['setFontColor'](cc.color("#B97D55"));
            eb['setInputMode'](6);
            eb['setMaxLength'](11);
            if (cc.sys.isNative) {
                eb['setTextHorizontalAlignment'](cc.TEXT_ALIGNMENT_CENTER);
            }

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
                        let bcan = kaayou.Identify.isPhone(gstr);
                        do {
                            let parent = ref.getParent();
                            if (!parent) { break; }
                            let label_err = self.lbTelErr;
                            if (!label_err) { break; }
                            label_err.setString(bcan ? "" : "请输入正确的手机号");
                        } while (0)
                        self.edx_tel_label.setString(ref.getString());
                        // Patch.SetBtnAndTextBright(this.btn_get_verification , bcan && self._lasttime == 0)
                        self.doCandoRegister();
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
            this.pnlTel.addChild(eb);

            let sp1 = new cc["Scale9Sprite"]();
            let eb1: cc.Node = cc["EditBox"].create(this.pnlVerify.getContentSize(), sp1);
            this.ebVerify = eb1;
            eb1.setAnchorPoint(0, 0);
            eb1.setPosition(0, 0);
            eb1.setOpacity(0);
            eb1['setFontSize'](26);
            eb1['setFontColor'](cc.color("#B97D55"));
            eb1['setInputMode'](6);
            eb1['setMaxLength'](6);

            eb1['setDelegate'](
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
                        do {
                            let parent = ref.getParent();
                            if (!parent) { break; }
                            let label_err = self.lbVerifyErr;
                            if (!label_err) { break; }
                            label_err.setString(kaayou.Identify.isAbcNumber(ref.getString()) ? "" : "请输入正确的验证码");
                        } while (0)
                        self.edx_verification_label.setString(ref.getString());
                        self.doCandoRegister();
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
            this.pnlVerify.addChild(eb1);

            self.scheduleUpdate();

            self.Hide();
        }
        private _delayt = 0;
        private _lasttime = 0;
        update(dt) {
            if (!this.isVisible()) { return; }
            this._delayt += dt;
            if (this._delayt < 0.1) { return }
            this._delayt = 0;
            if (this._lasttime < 1) { return; }
            let ot = this._lasttime - Date.unix();
            if (ot <= 0) {
                this._lasttime = 0;
                this.chg_time_Lable.setString('');
                let bcan = kaayou.Identify.isPhone(this.ebTel.getString());
                Patch.SetBtnAndTextBright(this.btn_get_verification, bcan)
                // hide
            } else {
                this.chg_time_Lable.setString(ot.toString());
                Patch.SetBtnAndTextBright(this.btn_get_verification, false)
                //show
            }
        }
        doCheckChanger() {
            let bcan = true;
            bcan = bcan && kaayou.Identify.isPhone(this.ebTel.getString());
            bcan = bcan && kaayou.Identify.isAbcNumber(this.ebVerify.getString(), 4, 6);
            return bcan;
        }

        doCandoRegister() {
            let bcan = this.doCheckChanger();
            Patch.SetBtnAndTextBright(this.btn_bind, bcan)
            // this.btn_register.setColor(cc.color(bcan ? "#FFFFFF" : "#7F7F7F"));
        }


        Show(sDATA:{bind: boolean}) {
            // if (!data) { return false; }
            this.chg_time_Lable.setString('');
            // this.unbind_panel.setVisible(!bind);
            // this.isBind = sDATA.bind;
            Patch.SetBtnAndTextBright(this.btn_get_verification, true)
            // this.btn_get_verification.setColor(cc.color("#6E6E6E"));
            this.cleanEditBoxString(this.ebTel);
            this.cleanEditBoxString(this.ebVerify);
           
            this._lasttime = 0;
            // this.cleanEditBoxString(this.edx_pass);
            // this.cleanEditBoxString(this.edx_repass);
            this.doCandoRegister();

            this.changePanelShow({bind:sDATA.bind});

            this.setVisible(true);
        }


        changePanelShow(data:{bind: boolean} ) {
            this.isBind = data.bind;

            // this.unbind_panel.setVisible(!(!!data.bind));
            // this.bind_panel.setVisible(!!data.bind);
            this.unbind_panel.setVisible(!data.bind)//
            this.cleanEditBoxString(this.ebTel);
            this.cleanEditBoxString(this.ebVerify);
            this.edx_tel_label.setString("");
            this.edx_verification_label.setString("");
            this.ebTel.setString("");
            this.ebVerify.setString("");
            this._lasttime = 0;
            this.chg_time_Lable.setString('');
            Patch.SetBtnAndTextBright(this.btn_get_verification, true)
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

        Hide() {
            this.setVisible(false);
        }


    }
}