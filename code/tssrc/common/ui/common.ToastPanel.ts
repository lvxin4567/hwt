
namespace common {
    const { BindEvent, doBindEvent } = kaayou._decorator;
    export class ToastPanel extends kaayou.Layer {
        maskBg: cc.Layer = null;
        contentPanel: ccui.Layout = null;
        msgLabel: ccui.Text = null;
        constructor() {
            super();
            this.initUI();
        }
        @doBindEvent
        initUI() {
            this.initWithccs(common.res.ToastPanel_json, true);
            let self = this;
            this.maskBg = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "maskbg");
            this.contentPanel = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "contentPanel");
            this.msgLabel = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "msgLabel");
            this.msgLabel.ignoreContentAdaptWithSize(true);
            this.setVisible(false);
            this.maskBg.setVisible(false);
        }


        @BindEvent('common', 'ui::Toast::Show')
        show(data: { msg: string, time: number, mask: boolean }) {
            if (!data) { return false; }
            if (!data.msg) { return false; }
            data.mask = data.mask || false;
            data.time = data.time || 1;
            this.msgLabel.setString(data.msg);
            this.msgLabel.ignoreContentAdaptWithSize(true);
            let labelSize = this.msgLabel.getContentSize();
            let tsize = cc.size(Math.max(labelSize.width + 300, 798), Math.max(labelSize.height + 39, 75))
            this.contentPanel.setContentSize(tsize.width, tsize.height);
            this.msgLabel.setPosition(tsize.width * 0.5, tsize.height * 0.5);
            if (data.mask == true) {
                this.maskBg.setVisible(true);
            } else {
                this.maskBg.setVisible(false);
            }
            this.stopAllActions();
            this.node.setLocalZOrder(10120);//lw200229在dialog前面
            this.setVisible(true);
            // this.o = 255;
            this.runAction(cc.sequence(cc.delayTime(data.time), cc.fadeOut(0.5), cc.callFunc(function () {
                this.setVisible(false);
            }.bind(this))));
        }

    }
}