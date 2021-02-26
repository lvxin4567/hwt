//跑马灯发送界面
namespace lobby {
    const { BindEvent, doBindEvent } = kaayou._decorator;
    export class PmdSendLabaPanelMgr {
        static __INS__: PmdSendLabaPanelMgr = null;
        static getInstance() {
            if (PmdSendLabaPanelMgr.__INS__ == null) {
                PmdSendLabaPanelMgr.__INS__ = new PmdSendLabaPanelMgr();
                PmdSendLabaPanelMgr.__INS__.init();
            }
            return PmdSendLabaPanelMgr.__INS__;
        }
        __selfPanel: PmdSendLabaPanel = null;
        public _gold = 0;
        onUpdateUserInfo(data: Data_Uerinfo) {
            this._gold = data.gold;
        }
        init() {
            let self = this;
            this.__selfPanel = null;

            kaayou.getController('lobby').on('ui::PmdSendLabaPanel::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show();
            }, this, 10);

            kaayou.getController('lobby').on('ui::PmdSendLabaPanel::Show1', function (e: kaayou.Event) {
                self.getPanel(true).Show1(e.data);
            }, this, 10);

            kaayou.getController('lobby').on('ui::PmdSendLabaPanel::Show2', function (e: kaayou.Event) {
                self.getPanel(true).Show2(e.data);
            }, this, 10);

            kaayou.getController('lobby').on('ui::UpdateUserInfo', function (e: kaayou.Event) {
                self.onUpdateUserInfo(e.data);
            }, this, 10);

            kaayou.getController('common').on('Config::Update', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).onConfigUpdate();
            }, this, 10);

            kaayou.getController('lobby').on('ui::PmdSendLabaPanel::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new PmdSendLabaPanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel)
                this.__selfPanel.onConfigUpdate();
            }
            return this.__selfPanel;
        }

    }


    export class PmdSendLabaPanel extends kaayou.Layer {
        constructor() {
            super();
            this.initUI();
        }
        maskBg: cc.Layer = null;
        contentPanel: ccui.Layout = null;
        btn_close: ccui.Button = null;
        btn_send_laba: ccui.Button = null;
        edx_laba: ccui.TextField = null;
        text_expend_score: ccui.Text = null; //发送所需的金币的数量（配置）
        ScrollView_History: ccui.ScrollView = null;
        History_panel: ccui.Layout = null; //玩家发送的消息
        text_name: ccui.Text = null;
        text_info: ccui.Text = null;
        announcement_msg: Array<string> = null; //存发送消息的数组
        str_name: Array<string> = null; //存玩家名字的数组
        mug_num: number = 49;  //限制显示条数为50条

        initUI() {
            this.initWithccs(lobby.res.PmdSendLabaPanel_json);
            let self = this;
            self.announcement_msg = [];
            self.str_name = [];
            this.maskBg = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "maskbg");
            this.contentPanel = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "contentPanel");
            this.btn_close = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_close");
            this.btn_send_laba = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_send_laba");
            this.edx_laba = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "edx_laba");
            this.text_expend_score = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "text_expend_score");
            this.text_expend_score.ignoreContentAdaptWithSize(true);
            this.ScrollView_History = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "ScrollView_History");
            this.History_panel = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "History_panel");
            this.text_name = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "text_name");
            this.text_info = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "text_info");
            this.text_name.ignoreContentAdaptWithSize(true);
            this.text_info.ignoreContentAdaptWithSize(true);

            this.btn_close.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                self.Hide();
            }, this)
            //发送跑马灯
            this.btn_send_laba.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                if (lodash.isEmpty(this.edx_laba.getString())) {
                    kaayou.emit('common', 'ui::Toast::Show', { msg: '发送内容不能为空！', time: 1, mask: false })
                    return;
                } else if (this.edx_laba.getString().length > 27) {
                    kaayou.emit('common', 'ui::Toast::Show', { msg: '发送内容太长！', time: 1, mask: false })
                    return;
                } else {
                    if (lodash.indexOf(this.edx_laba.getString(), ' ') != -1) {
                        kaayou.emit('common', 'ui::Toast::Show', { msg: '发送内容包含非法字符', time: 1, mask: false });
                        return;
                    }

                    if (PmdSendLabaPanelMgr.getInstance()._gold < Number(common.mod.Config.AppConfig.broadcast_cost || 0)) {
                        this.sendPmdConfirm();
                    } else {
                        let str = kaayou.blackList.checkBlackList(self.edx_laba.getString());
                        let reqData: { content: string } = {
                            content: str,
                        };
                        kaayou.emit("lobby", "mod::Notice::doSendPmd", reqData);
                    }
                }
                self.Hide();
            }, this)

            self.Hide();
        }

        //@BindEvent("common", 'Config::Update')
        onConfigUpdate() {
            this.text_expend_score.setString(Number(common.mod.Config.AppConfig.broadcast_cost || 0) + '金币')
        }

        //获取当前豆子数

        //@BindEvent("lobby", "ui::UpdateUserInfo")

        //温馨提示框 
        sendPmdConfirm() {
            let self = this;
            let getMsg = function () {
                let msg = "";
                msg = "您的金币不足，请去【商城】中购买！";
                return msg;
            }

            let options = {
                title: "温馨提示",
                msg: getMsg(),
                close: {
                    isShow: false,
                },
                btns: [
                    {
                        name: "取消",
                        colorType: 'green'
                    },
                    {
                        name: "去购买",
                        action: function () {
                            kaayou.emit("lobby", 'ui::Mall::Show');
                        },
                        colorType: 'blue'
                    }
                ]
            }
            kaayou.emit('common', 'ui::Dialog::Show', options);
        }
        //排列玩家与系统的跑马灯
        ShowPmdHistory() {
            let self = this;
            this.ScrollView_History.removeAllChildren();
            let len = self.announcement_msg.length - 1;

            for (let i = len; i >= (len >= this.mug_num ? len - this.mug_num : 0); --i) {
                let _History_panel = <ccui.Layout>self.History_panel.clone();
                let _text_name: ccui.Text = ccui.helper.seekWidgetByName(_History_panel, "text_name")
                let _text_info: ccui.Text = ccui.helper.seekWidgetByName(_History_panel, "text_info")
                if (self.str_name[i] == "【系统】") {
                    _text_name.setTextColor(cc.color("#D52E00"));
                } else {
                    _text_name.setTextColor(cc.color("#137E11"));
                }
                _text_name.setString(self.str_name[i])

                _text_info.setString("：" + self.announcement_msg[i]);
                _text_info.setPositionX(_text_name.getPositionX() + _text_name.getContentSize().width + 10)
                _History_panel.setVisible(true);
                this.ScrollView_History.addChild(_History_panel);
                this.ScrollView_History.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Vertical);
                this.ScrollView_History.doChildrenLayout();
            }
        }
        // @BindEvent('lobby', 'ui::PmdSendLabaPanel::Show')
        Show() {

            this.cleanEditBoxString(this.edx_laba);
            this.setVisible(true);
        }

        //接收玩家跑马灯信息
        // @BindEvent('lobby', 'ui::PmdSendLabaPanel::Show2')
        Show2(data: { PmdArray: string }) {
            if (lodash.isEmpty(data) || data.PmdArray.length < 1) { return; }

            this.str_name.push("【" + data.PmdArray[0] + "】");
            this.announcement_msg.push(data.PmdArray[1]);
            console.log(data.PmdArray[1]);

            this.ShowPmdHistory();
        }
        //接收系统跑马灯信息
        // @BindEvent('lobby', 'ui::PmdSendLabaPanel::Show1')
        Show1(data: { PmdArray: string }) {

            if (lodash.isEmpty(data) || data.PmdArray.length < 1) { return; }
            let isPush = 1;
            let len = this.announcement_msg.length - 1;
            for (let i = len; i >= (len >= this.mug_num ? len - this.mug_num : 0); --i) {
                if (this.announcement_msg[i] == data.PmdArray[0]) {
                    isPush = 0;
                    break;
                }
            }
            if (isPush) {
                for (let l = 0; l < data.PmdArray.length; l++) {
                    this.announcement_msg.push(data.PmdArray[l]);
                    this.str_name.push("【系统】");
                }
            }
            console.log(data.PmdArray[0]);

            this.ShowPmdHistory();
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

        // @BindEvent('lobby', 'ui::PmdSendLabaPanel::Hide')
        Hide() {
            this.setVisible(false);
        }
    }
}