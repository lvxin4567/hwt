/**
 * 
 * 实名认证面板
 */

namespace lobby {
    const { BindEvent, doBindEvent } = kaayou._decorator;

    export class IllegalReportingPanelMgr {
        static __INS__: IllegalReportingPanelMgr = null;
        static getInstance(_zOrder: number = 0) {
            if (IllegalReportingPanelMgr.__INS__ == null) {
                IllegalReportingPanelMgr.__INS__ = new IllegalReportingPanelMgr();
                IllegalReportingPanelMgr.__INS__.init();
                IllegalReportingPanelMgr.__INS__._zOrder = _zOrder;
            }
            return IllegalReportingPanelMgr.__INS__;
        }
        public _zOrder = 0;
        __selfPanel: IllegalReportingPanel = null;
        init() {
            let self = this;
            kaayou.getController('lobby').on('ui::IllegalReportingPanel::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show();
            }, this, 10);

            kaayou.getController('lobby').on('ui::IllegalReportingPanel::Hide', function (e: kaayou.Event) {
                if (!self.__selfPanel) {
                    return;
                }
                self.getPanel(false).Hide(e.data);
            }, this, 10);
            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new IllegalReportingPanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel, this._zOrder);    //这个地方怎么不管用？？？
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            if (this.__selfPanel) {
                return this.__selfPanel;
            }
        }
    }

    export class IllegalReportingPanel extends kaayou.Layer {
        btnClose: ccui.Button = null;
        btnPanel: ccui.Layout = null;
        contentPanel: ccui.Layout = null;

        boxAPI = null;
        mailErr: cc.Sprite = null;
        input_mail: ccui.TextField = null;
        input_content: ccui.TextField = null;
        maskBg: ccui.Layout = null;
        submit: ccui.Button;
        mailRight: cc.Sprite;

        constructor() {
            super();
            this.initUI();
        }
        @doBindEvent
        initUI() {
            this.initWithccs(lobby.res.IllegalReportingPanel_json);
            let self = this;
            let boxAPI = this.boxAPI = kaayou.editBox.target(this.node);

            this.mailErr = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "mailErr");
            this.mailRight = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "mailPass");
            this.input_mail = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "input_mail");
            this.input_content = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "input_content");

            this.maskBg = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "maskbg");
            this.contentPanel = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "contentPanel");
            this.btnClose = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_notice_close");

            this.btnClose.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.Hide({ clean: true });
            }, this)

            this.submit = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "submit");

            this.submit.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                let { token , uid } = JSON.parse( kaayou.DataSet.get('user::token'));
                let reqData: { email: string, content: string, user_token: string } = {
                    email: boxAPI.getValue("input_mail"),
                    content: boxAPI.getValue("input_content"),
                    user_token:token
                };
                if (!kaayou.Identify.isEmail(reqData.email)) {
                    kaayou.emit('common', 'ui::Toast::Show', { msg: "邮箱格式错误，请重新输入邮箱！" })
                    return;
                }
                if (lodash.isEmpty(reqData.content)) {
                    kaayou.emit('common', 'ui::Toast::Show', { msg: "请输入你要举报的内容！" })
                    return;
                }
                let subData = {
                    data: reqData,
                    time: (new Date).getTime(),
                    "encrypt": true,
                    "sign": ""
                }
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit("lobby", "mod::User::reporting", subData);
            }, this);

            boxAPI.attachTextEdit("input_mail", function (result) {
                if (result === true) {
                    self.mailErr.setVisible(false)
                    self.mailRight.setVisible(true)
                } else {
                    self.mailErr.setVisible(true);
                    self.mailRight.setVisible(false)
                }
                self.doCandoSubmit();
            }, {
                type: "validate",
                regExp: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(?:\.[a-zA-Z0-9_-]+)+$/,
                placeholdStr: "请输入邮箱地址...",
                setMaxLength: 40,
                regHandle: function (res) {
                    if (res === true) {
                        self.mailErr.setVisible(false)
                        self.mailRight.setVisible(true)
                    } else {
                        self.mailErr.setVisible(true);
                        self.mailRight.setVisible(false)
                    }
                }
            })


            boxAPI.attachTextEdit("input_content", function () {
                self.doCandoSubmit();
            }, {
                type: "string",
                placeholdStr: "请输入举报内容...",
                setMaxLength: 2000
            })

            self.Hide({ clean: true });
        }

        initSubmit() {
            this.boxAPI.setValue("input_mail", ""),
                this.boxAPI.setValue("input_content", "")
            this.mailRight.setVisible(false);
            this.mailErr.setVisible(false);
        }

        doCandoSubmit() {
            let bcan = kaayou.Identify.isEmail(this.boxAPI.getValue("input_mail")) && !!this.boxAPI.getValue("input_content");
            Patch.SetBtnAndTextBright(this.submit, bcan)
        }
        Show() {
            this.doCandoSubmit();
            this.setVisible(true);
            kaayou.pop.showAni({
                cNode: this.node.getChildByName("contentPanel"),
                mNode: this.node.getChildByName("maskbg"),
                action: function () {
                }
            });
        }
        Hide({ clean }) {
            let self = this;
            kaayou.pop.hideAni(
                {
                    cNode: this.node.getChildByName("contentPanel"),
                    mNode: this.node.getChildByName("maskbg"),
                    rnode: this,
                    action: function () {
                        if (clean) {
                            self.initSubmit();
                        }
                    }
                }
            )
        }




    }
}