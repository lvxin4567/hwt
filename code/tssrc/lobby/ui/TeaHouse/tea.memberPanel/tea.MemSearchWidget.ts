namespace tea {

    export class MemSearchWidget {
        search_btn: ccui.Button = null; // 搜索按钮
        //search_edit: ccui.TextField = null; //搜索编辑框
        edit_searchMem:any = null;
        node: cc.Node = null;
        clickCall: Function = null;
        constructor() {


        }
        initWidthNode(node: cc.Node, clickCall: Function) {
            this.search_btn = ccui.helper.seekWidgetByName(<ccui.Widget>node, "search_btn");
            //this.search_edit = ccui.helper.seekWidgetByName(<ccui.Widget>node, "search_edit");
            this.node = node;
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
            this.edit_searchMem =  kaayou.editBox.attachTextEdit(node, "search_edit", "昵称/ID",null,attr);
        }

        //可能产生部分面板不需要搜索，增加一个隐藏显示的入口
        setSearchVisible(bool: boolean) {
            this.node.setVisible(bool === true)
        }

        getSearchString() {
            return this.edit_searchMem.getString().length < 1 ? "" : this.edit_searchMem.getString();
        }

        clearString() {
            this.edit_searchMem.setString("");
        }
    }

}