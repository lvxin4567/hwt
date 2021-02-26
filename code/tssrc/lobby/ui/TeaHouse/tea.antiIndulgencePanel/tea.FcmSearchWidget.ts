namespace tea {

    export class FcmSearchWidget {
        search_btn: ccui.Button = null; // 搜索按钮
        edit_FcmSearch:any = null;
        clickCall: Function = null;
        node: cc.Node = null;
        constructor() {


        }
        initWidthNode(node: cc.Node, clickCall: Function) {
            this.node = node;
            this.search_btn = ccui.helper.seekWidgetByName(<ccui.Widget>node, "search_btn");
            this.search_btn.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                clickCall && clickCall();
            }, this);

            let attr = {
                "fontSize": 28,
                "fontColor": "#C1E2FF",
                "setInputMode": 6,
                "setMaxLength": 20,
                "setPlaceholderFontSize": 28,
            };
            this.edit_FcmSearch = kaayou.editBox.attachTextEdit(node, "fcm_search_edit", "昵称/ID", null,attr);

            let ctrName = "teaFcm"
            let onSearchEventName = "ui::fcm::setSearch";

            kaayou.getController("teaFcm").on(onSearchEventName, function (e: kaayou.Event) {
                this.setString(e.data || "");
            }, this);

        }
        setVisible(b) {
            this.node.setVisible(b);
        }
        getSearchString() {
            return this.edit_FcmSearch.getString().length < 1 ? "" : this.edit_FcmSearch.getString();
        }
        setPlaceholder(str) {
            <any>this.edit_FcmSearch.setPlaceHolder(str);
        }
        setString(gstr) {
            this.edit_FcmSearch.setString(gstr);
        }
        placeholder: "昵称/ID";
        clearString() {
            this.edit_FcmSearch.setString("");
        }
    }

}