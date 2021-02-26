
namespace common {
    const { BindEvent, doBindEvent } = kaayou._decorator;

    export class VersionDialogPanel extends common.DialogPanel {
        lable_leftMsg: ccui.Text = null;
        lable_rightMsg: ccui.Text = null;
        constructor() {
            super();
            this.initUI();
        }
        initWithccs(path?: string) {
            super.initWithccs(common.res.VersionDialogPanel_json);
        }
        
        initUI() {
            super.initUI()
            this.lable_leftMsg = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "lable_leftMsg");
            this.lable_rightMsg = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "lable_rightMsg");
            this.lable_leftMsg.ignoreContentAdaptWithSize(true);
            this.lable_rightMsg.ignoreContentAdaptWithSize(true);
            this.lable_leftMsg.setString("");
            this.lable_rightMsg.setString("");
        }

        Show(data: { rightMsg:string , leftMsg:string, title: string, msg: string, close?: { isShow?: boolean, action?: Function }, btns: Array<{ name: string, action: Function, colorType: string }>, isDomText: boolean, localZOrder?: number }) {
            if (!data) { this.Hide(); return false; }
            if (!data.msg) { this.Hide(); return false; }
            super.Show(data);
            this.lable_leftMsg.setString(data.leftMsg || "");
            this.lable_rightMsg.setString(data.rightMsg || "");
        }

        Hide() {
            
        }
    }
}