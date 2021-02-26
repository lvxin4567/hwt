
//免责声明
namespace lobby {
    const { BindEvent, doBindEvent } = kaayou._decorator;
    export class DisclaimerPanel extends kaayou.ModelLayer {
        constructor() {
            super();
            this.initUI();
        }
        viewScroll: ccui.ScrollView = null;
        btn_ok: ccui.Button = null;
        @doBindEvent
        initUI() {
            let self = this;
            this.initWithccs(lobby.res.DisclaimerPanel_json);
            this.isTouchMaskHide = false;
            this.viewScroll = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "agreeScroll");
            this.viewScroll.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Vertical);
            this.viewScroll.doChildrenLayout();
            this.btn_ok = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_ok");
            this.btn_ok.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                self.Hide();
            }, this);
            self.Hide();
        }

        @BindEvent('lobby', 'ui::Disclaimer::Show')
        show(data: { isnew: boolean, cardNum: number}) {
            if (!data) { return; }
            if (data.isnew != true) { return; }

            let options = {
                title: "",
                msg: "首次登陆，赠送您" + data.cardNum + "张房卡！",
                close: {
                    isShow: false,
                    action: null,
                },
                btns: [
                    {
                        name: "确定",
                        colorType: 'green'
                    }
                ]
            }
            kaayou.emit('common', 'ui::Dialog::Show', options);
            kaayou.DataSet.set('isNew', 'false');
            this.setVisible(true);
        }

        @BindEvent('lobby', 'ui::Disclaimer::Hide')
        Hide() {
            this.setVisible(false);
        }
    }

}