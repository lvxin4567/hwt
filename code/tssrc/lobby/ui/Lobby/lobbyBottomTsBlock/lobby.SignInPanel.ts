/**
 * 
 * 金币场签到
 */
namespace lobby {
    const { BindEvent, doBindEvent } = kaayou._decorator;
    export class lobby_SignInMgr {
        static __INS__: lobby_SignInMgr = null;
        static getInstance(_zOrder: number = 0) {
            if (lobby_SignInMgr.__INS__ == null) {
                lobby_SignInMgr.__INS__ = new lobby_SignInMgr();
                lobby_SignInMgr.__INS__.init();
                lobby_SignInMgr.__INS__._zOrder = _zOrder
            }
            return lobby_SignInMgr.__INS__;
        }
        __selfPanel: SignInPanel = null;
        _zOrder: number = 0
        init() {
            let self = this;
            this.__selfPanel = null;
            kaayou.getController('lobby').on('ui::SignIn::Show', function (e: kaayou.Event) {
                self.getPanel(true).show(e.data);
            }, this, 10);
            kaayou.getController('lobby').on('ui::SignIn::ShowRedPoint', function (e: kaayou.Event) {
                self.getPanel(true).showRedPoint(e.data);
            }, this, 10);
            kaayou.getController('lobby').on('ui::SignIn::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).onHide();
            }, this, 10);
            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new SignInPanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel, this._zOrder);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }

    }


    export class SignInPanel extends kaayou.Layer {
        bShow: boolean = false;
        fntSignIn: ccui.TextBMFont = null;
        maskBg: cc.Layer = null;
        btn_close: ccui.Button = null;
        btn_Draw: ccui.Button = null;
        signLayout: ccui.Layout = null;

        constructor() {
            super();
            this.initUI();
        }
        initUI() {
            this.initWithccs(lobby.res.LobbySignInPanel_json);
            let self = this;

            this.maskBg = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "maskbg");
            this.btn_close = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Close");
            this.btn_Draw = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_Draw");
            this.signLayout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "signLayout");
            this.fntSignIn = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "fntSignIn");
            this.btn_close.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                kaayou.emit("lobby", 'mod::User::checkin', { checkin: false, name: self._data.rewards[self._data.step].award_name, img: self._data.rewards[self._data.step].award_url })
                self.onCancel();
            }, this);

            this.btn_Draw.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit("lobby", 'mod::User::checkin', { checkin: true, name: self._data.rewards[self._data.step].award_name, img: self._data.rewards[self._data.step].award_url })
            }, this)
            this.setVisible(false);
        }
        _data: proto_task_checkin_ntf_res = null;
        show(data: proto_task_checkin_ntf_res) {
            this.bShow = true;
            kaayou.pop.showAni({
                cNode: this.node.getChildByName("contentPanel"),
                mNode: this.node.getChildByName("maskbg"),
                action: function () {
                }
            });
        }

        showRedPoint(data: proto_task_checkin_ntf_res) {
            if (!data) {
                return;
            }
            this._data = data;
            this.setSignUI(data)
            this.setVisible(this.bShow);
        }

        setSignUI(data: proto_task_checkin_ntf_res) {
            let self = this;
            lodash.forEach(self.signLayout.getChildren(), function (v: ccui.Layout, i) {
                v.getChildByName("curDayBg").setVisible(false);
                v.getChildByName("img_isGet").setVisible(false);
                v.getChildByName("img_prize").setVisible(true);
                (<ccui.Text>(v.getChildByName("label_num"))).setString(data.rewards[i].award_name);
                if (i < Number(data.step)) {
                    v.getChildByName("img_isGet").setVisible(true);
                    v.getChildByName("img_prize").setVisible(false);

                } else if (i == Number(data.step && !data.checkin)) {
                    v.getChildByName("curDayBg").setVisible(true);
                }
            });
            if (!!self.btn_Draw) {
                Patch.SetBtnAndTextBright(self.btn_Draw, !data.checkin);
            }
            if (data.checkin) {
                self.fntSignIn.setString("已签到");
            } else {
                self.fntSignIn.setString("立即签到");
            }
        }

        onHide() {
            this.setVisible(false);
        }

        onCancel() {
            //lw200713不签到就直接弹下一个窗，如果签到了，要等恭喜获得关闭以后才弹下一个窗
            kaayou.LayerSeq.getInstance().closeTopLayer();
            this.onHide();
        }
    }
}