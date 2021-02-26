namespace tea {

    export class RecordSearchWidget {
        search_btn: ccui.Button = null; // 搜索按钮
        search_edit: ccui.TextField = null; //搜索编辑框
        //search_label: ccui.Text = null; //搜索标签
        edit_searchRed: any = null;
        clickCall: Function = null;
        node: cc.Node = null;
        constructor() {


        }
        initWidthNode(node: cc.Node, clickCall: Function) {
            this.node = node;
            this.search_btn = ccui.helper.seekWidgetByName(<ccui.Widget>node, "search_btn");
            this.search_edit = ccui.helper.seekWidgetByName(<ccui.Widget>node, "teaRecordsearch_edit");
            //this.search_label = ccui.helper.seekWidgetByName(<ccui.Widget>node, "search_label");
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
            this.edit_searchRed = kaayou.editBox.attachTextEdit(node, "teaRecordsearch_edit", "房号/ID", null, attr);



            let ctrName = "teaRC"
            let onSearchEventName = "ui::record::setSearch";

            kaayou.getController("teaRC").on(onSearchEventName, function (e: kaayou.Event) {
                this.setString(e.data || "");
            }, this);

        }
        setVisible(b) {
            this.node.setVisible(b);
        }

        getSearchString() {
            return this.edit_searchRed.getString().length < 1 ? "" : "" + this.edit_searchRed.getString();
        }

        setPlaceholder(str) {
            <any>this.edit_searchRed.setPlaceHolder(str);
        }
        setString(gstr) {
            this.edit_searchRed.setString(gstr);
        }
        placeholder: "昵称/ID";
        clearString() {
            this.edit_searchRed.setString("");
        }
    }

}