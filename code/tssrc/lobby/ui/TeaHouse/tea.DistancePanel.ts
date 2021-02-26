namespace tea {
    var { BindEvent, doBindEvent } = kaayou._decorator;

    export class tea_DistancePanelMgr {
        static __INS__: tea_DistancePanelMgr = null;
        static getInstance(_zOrder: number = 0) {
            if (tea_DistancePanelMgr.__INS__ == null) {
                tea_DistancePanelMgr.__INS__ = new tea_DistancePanelMgr();
                tea_DistancePanelMgr.__INS__.init();
                tea_DistancePanelMgr.__INS__._zOrder = _zOrder
            }
            return tea_DistancePanelMgr.__INS__;
        }
        __selfPanel: tea_DistancePanel = null;
        _zOrder: number = 0
        init() {
            let self = this;
            this.__selfPanel = null;

            kaayou.getController('tea').on('ui::DistancePanel::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show(e.data);
            }, this, 10);
            kaayou.getController('tea').on('ui::DistancePanel::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);
            kaayou.getController('lobby').on('ui::NumberInput::Change', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).ShowNumber(e.data);
            }, this, 10);

            kaayou.getController('lobby').on('ui::NumberInputPanel::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).ReturnToMiddle();
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new tea_DistancePanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel, this._zOrder);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }
    }

    export class tea_DistancePanel extends kaayou.ModelLayer {
        constructor() {
            super();
            this.initUI();
        }
        btn_close: ccui.Button = null;
        btnAdd: ccui.Button = null;
        btnSub: ccui.Button = null;
        btnSave: ccui.Button = null;
        ebInput: any = null;
        iDistance: number = 0;
        lbScore: ccui.Text = null;

        @doBindEvent
        initUI() {
            let self = this;
            this.isTouchMaskHide = false;
            this.initWithccs(tea.res.DistancePanel_Json);
            this.btn_close = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_close");
            this.btn_close.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.Hide();
            }, this);
            this.lbScore = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Score");
            this.lbScore.on(kaayou.TouchEvent.TouchEnd, function () {
                self.lbScore.setEnabled(false);
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                let pnl = self.node.getChildByName("contentPanel");
                pnl.stopAllActions();
                let x = cc.winSize.width / 4;
                let action = cc.moveTo(0.4, x, pnl.getPositionY());
                let seq = cc.sequence(action,
                    cc.callFunc(function () {
                        self.lbScore.setEnabled(true);
                    })
                );
                pnl.runAction(seq);
                kaayou.emit("lobby", "ui::NumberInputPanel::Show", { defualtNum: Number(self.iDistance) });
            }, this);

            this.btnSave = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "SaveButton");
            this.btnSave.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                var re = /^[1-9]\d*$/;//正整数
                if (!re.test(self.iDistance.toString())) {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: "请输入正整数" });
                    return;
                }
                kaayou.emit("tea", "mod::teahouse::setDistance", {
                    hid: tea.mod.__teaHouseInfo.hid,
                    distance: self.iDistance
                });
            }, this);
            this.setVisible(false);
        }

        ShowNumber(data) {
            if (!!data) {
                this.iDistance = Number(data);
            } else {
                this.iDistance = 0;
            }
            this.lbScore.setString(this.iDistance.toString());
        }

        ReturnToMiddle() {
            let self = this;
            let pnl = self.node.getChildByName("contentPanel");
            let x = cc.winSize.width / 2;
            let action = cc.moveTo(0.5, x, pnl.getPositionY());
            pnl.runAction(action);
        }

        Show(data) {
            this.iDistance = data.distance;
            this.lbScore.setString(this.iDistance.toString());
            this.setVisible(true);
            kaayou.pop.showAni({
                cNode: this.node.getChildByName("contentPanel"),
                mNode: this.node.getChildByName("maskbg"),
                action: function () {
                }
            });
        }

        Hide() {
            let self = this;
            kaayou.pop.hideAni(
                {
                    cNode: this.node.getChildByName("contentPanel"),
                    mNode: this.node.getChildByName("maskbg"),
                    rnode: this,
                    action: function () {
                    }
                }
            )
        }
    }
}