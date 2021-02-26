//队长配置 ---- 自动划扣
namespace tea {
    const { BindEvent, doBindEvent } = kaayou._decorator;
    export class PropotionAutoCheckOff {
        _page: cc.Node = null;
        _index = -1;
        checkBoxSwitch: ccui.Layout = null;
        autoRadioGroup: common.RadioGroup = null;
        cIndex: number = 0;
        Destips: ccui.ImageView = null;
        tips_Image:ccui.ImageView = null;
        setIndex(index) {
            this._index = index;
            return this;
        }
        getIndex() {
            return this._index;
        }

        onSubpageChange(e: kaayou.Event) {
            let _data = e.data;
            let { index } = _data;
            if (index == this.getIndex()) {
                if (this._page.isVisible() === false) {
                    this.reset();
                    this._page.setVisible(true);
                }
            } else {
                this._page.setVisible(false);
            }
        }

        _isInitPull = false;
        reset() {
            //重置界面---显示划扣开关
            let payCheck = tea.mod.__teaHouseInfo.auto_pay_partner;
            // let radio1 =  (<ccui.CheckBox>(this.checkBoxSwitch.getChildren()[0]));
            // radio1.setSelected(payCheck)
            // let radio2 = (<ccui.CheckBox>(this.checkBoxSwitch.getChildren()[1]));
            // radio2.setSelected(!payCheck)
            this.refleshCheckUI(payCheck);
        }

        refleshCheckUI(payCheck){
            let radio1 =  (<ccui.CheckBox>(this.checkBoxSwitch.getChildren()[0]));
            radio1.setSelected(payCheck)
            let radio2 = (<ccui.CheckBox>(this.checkBoxSwitch.getChildren()[1]));
            radio2.setSelected(!payCheck)
        }

        initWithNode(page: cc.Node) {
            var self = this;
            this._page = page;
            let ctrName = "teaMem";
            page.setPosition(0, 0);
            let subpageChangeEventName = "ui::PropotionPanel::SubpageChange";
            kaayou.getController(ctrName).on(subpageChangeEventName, this.onSubpageChange, this);
            //描述说明点击
            this.Destips = ccui.helper.seekWidgetByName(<ccui.Widget>this._page, "tips_imageView");
            this.tips_Image = ccui.helper.seekWidgetByName(<ccui.Widget>this._page, "tipsImage");
            this.Destips.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                self.tips_Image.setVisible(false);
            }, this);
            this.Destips.on(kaayou.TouchEvent.TouchCance, function (e: kaayou.TouchEvent) {
                self.tips_Image.setVisible(false);
            }, this);
            this.Destips.on(kaayou.TouchEvent.TouchStart, function (e: kaayou.TouchEvent) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                self.tips_Image.setVisible(true);
            }, this);

            kaayou.getController("tea").on("ui::PropotionPanel::UIBOXChange",(e: kaayou.TouchEvent)=>{
                let {auto_pay} =  e.data
                this.refleshCheckUI(auto_pay);
            },this)

            this.checkBoxSwitch = ccui.helper.seekWidgetByName(<ccui.Widget>this._page, "autoSwitchLayout");
            this.autoRadioGroup = new common.RadioGroup();
            lodash.forEach(this.checkBoxSwitch.getChildren(), function (v: ccui.CheckBox, i) {
                v['index'] = i;
                v.on(kaayou.RadioEvent.SELECTED, function () {
                    kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                    self.cIndex = i;
                    if (i == 0) {
                        if (!!!tea.mod.__teaHouseInfo.isvitamin) {
                            let options = {
                                title: "",
                                msg: "该功能仅对开启了比赛分模式的亲友圈开放~",
                                btns: [
                                    {
                                        name: "确定",
                                        colorType: 'red',
                                        action: function () {
                                            console.log("未开启比赛分模式");
                                            self.refleshCheckUI(false)
                                        }
                                    },
                                ]
                            }
                            kaayou.emit('common', 'ui::Dialog::Show', options);
                            return;
                        }



                        let options = {
                            title: "",
                            msg: "开关开启后每日凌晨会根据队长的结算总额自动发送比赛分，请确认分成设置已配置",
                            close: {
                                isShow: true, action: function () {
                                    console.log("这个关闭。直接重置界面");
                                    // self.reset();
                                    self.refleshCheckUI(false)
                                }
                            },
                            btns: [
                                {
                                    name: "确定",
                                    colorType: 'green',
                                    action: function () {
                                        console.log("这个地方取调用自动划扣开");
                                        kaayou.emit("tea", 'mod::TeaHouse::houseautopaypartner', { auto_pay: true });
                                    }
                                },
                            ]
                        }
                        kaayou.emit('common', 'ui::Dialog::Show', options);
                    } else {
                        console.log("圈主需要去关闭防沉迷");
                        kaayou.emit("tea", 'mod::TeaHouse::houseautopaypartner', { auto_pay: false });
                    }
                }, self);
                self.autoRadioGroup.add(v);
            });
        }
    }
}