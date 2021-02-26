/**
 *  隐私设置
 */

namespace tea {
    const { doBindEvent, BindEvent } = kaayou._decorator;
    export class tea_TeaFcmWareHousePopPanelMgr {
        static __INS__: tea_TeaFcmWareHousePopPanelMgr = null;
        static getInstance(_zOrder: number = 0) {
            if (tea_TeaFcmWareHousePopPanelMgr.__INS__ == null) {
                tea_TeaFcmWareHousePopPanelMgr.__INS__ = new tea_TeaFcmWareHousePopPanelMgr();
                tea_TeaFcmWareHousePopPanelMgr.__INS__.init();
                tea_TeaFcmWareHousePopPanelMgr.__INS__._zOrder = _zOrder
            }
            return tea_TeaFcmWareHousePopPanelMgr.__INS__;
        }
        __selfPanel: teaFcmWhPopPanel = null;
        _zOrder: number = 0
        init() {
            let self = this;
            this.__selfPanel = null;
            kaayou.getController('tea').on('ui::WareHousePopPanel::UpdateInfo', function (e: kaayou.Event) {
                // self.getPanel(false) && self.getPanel(false).onTeaHouseUpdateInfo();
            }, this, 10);

            kaayou.getController('tea').on('ui::WareHousePopPanel::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show(e.data);
            }, this, 10);
            kaayou.getController('tea').on('ui::WareHousePopPanel::Hide', function (e: kaayou.Event) {
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
                this.__selfPanel = new teaFcmWhPopPanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel, this._zOrder);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }

    }



    export class teaFcmWhPopPanel extends kaayou.ModelLayer {
        constructor() {
            super();
            this.initUI();
        }
        btn_close: ccui.Button = null;
        btn_submit: ccui.Button = null;
        label_Num: ccui.Text = null;
        wmHouseData: Data_FcmWarehouseRes = null;
        // @doBindEvent
        initUI() {
            this.initWithccs(tea.res.TH_FcmWareHousePop_Json);
            this.isTouchMaskHide = false;
            let self = this;
            this.btn_close = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_close");
            this.btn_submit = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "SaveButton");

            this.btn_close.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.Hide();
            }, this);

            this.label_Num = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Score");

            this.label_Num.on(kaayou.TouchEvent.TouchEnd, function () {
                self.label_Num.setEnabled(false);
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                let pnl=self.node.getChildByName("contentPanel");
                let x=cc.winSize.width/4;
                let action=cc.moveTo(0.5,x,pnl.getPositionY());
                let seq=cc.sequence(action,
                    cc.callFunc(function () {
                        self.label_Num.setEnabled(true);
                    })
                );
                pnl.runAction(seq);
                
                kaayou.emit("lobby","ui::NumberInputPanel::Show",{defualtNum:0});
            }, this);

            this.btn_submit.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                console.log("去请求提取接口");
                kaayou.emit("tea", "mod::TeaHouse::WareHouseRw", { value: Number(self.label_Num.getString()) });

            }, this);
            this.Hide();
        }

        ShowNumber(data) {
            data = data || ""
            if (!!!this.wmHouseData) {
                return;
            }
            this.label_Num.setTextColor(Number(data)>this.wmHouseData.total ? cc.color("#ff4925") : cc.color("#b97d55"));
            this.label_Num.setString(data);
        }

        ReturnToMiddle() {
            let self = this;
            let pnl = self.node.getChildByName("contentPanel");
            let x = cc.winSize.width / 2;
            let action = cc.moveTo(0.5, x, pnl.getPositionY());
            pnl.runAction(action);
        }


        Show(data: Data_FcmWarehouseRes) {
            var self = this;
            this.wmHouseData = data;
            this.setVisible(true);
            this.label_Num.setString("点击输入");
            this.label_Num.setTextColor( cc.color("#b97d55"));
            kaayou.pop.showAni({
                cNode: this.node.getChildByName("contentPanel"),
                mNode: this.node.getChildByName("maskbg"),
                action: function () {
                }
            });
        }

        Hide() {
            kaayou.pop.hideAni(
                {
                    cNode: this.node.getChildByName("contentPanel"),
                    mNode: this.node.getChildByName("maskbg"),
                    rnode: this
                }
            )
        }

    }



}