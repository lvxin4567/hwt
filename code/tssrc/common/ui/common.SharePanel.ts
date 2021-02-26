
namespace common {
    const { BindEvent, doBindEvent } = kaayou._decorator;
    export class SharePanel extends kaayou.ModelLayer {
        maskBg: cc.Layer = null;
        SharePanel:ccui.Layout = null;
        constructor() {
            super();
            this.initUI();
        }
        @doBindEvent
        initUI() {
            this.initWithccs(common.res.SharePanel_json);
            let self = this;
            this.SharePanel = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "SharePanel_bg");
            this.SharePanel.setPosition(cc.winSize.width/2 - this.SharePanel.width /2 , cc.winSize.height/2 - this.SharePanel.height /2);
            this.Hide();
        }
        @BindEvent("common", 'ui::Share::Show')
        Show(){
            this.setVisible(true);
        }
        @BindEvent("common", 'ui::Share::Hide')
        Hide(){
            this.setVisible(false);
        }
    }
}