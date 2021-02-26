namespace tea {

    export class RecordSelectWidget {
        btn_sel: ccui.Button = null; // 搜索按钮
        label_sel: ccui.Text = null; //搜索编辑框
        layout_sel: ccui.Layout = null; //搜索标签
        sub_items: Array<ccui.Layout> = null;
        scrollList:cc.ScrollView = null;
        node: cc.Node = null;
        rootNode: cc.Node = null;
        maskNode: ccui.Layout = null;
        clickCall: Function = null;
        selcall: Function = null;
        _debugRect: boolean = false;
        _curselIndex: number = -1;
        constructor() {


        }
        initWidthNode(node: cc.Node, rootnode: cc.Node, clickCall: Function) {
            this.rootNode = rootnode;
            this.node = node;
            this.selcall = clickCall;


            this.btn_sel = ccui.helper.seekWidgetByName(<ccui.Widget>node, "btn_sel");
            this.label_sel = ccui.helper.seekWidgetByName(<ccui.Widget>node, "label_sel");
            this.layout_sel = ccui.helper.seekWidgetByName(<ccui.Widget>node, "layout_sel");
            this.scrollList = ccui.helper.seekWidgetByName(<ccui.Widget>node, "scrollList");
            this.sub_items = <Array<ccui.Layout>>this.scrollList.getChildren();

            let p = <ccui.Layout>ccui.Layout.create();
            p.setBackGroundColor(cc.color("#ffffff"));
            if (this._debugRect) {
                p.setBackGroundColorType(1);
                p.setBackGroundColorOpacity(125)
            }
            p.setEnabled(true);
            p.setTouchEnabled(true);
            p.setAnchorPoint(0.5, 0.5);
            p.setPosition(this.rootNode.getContentSize().width / 2, this.rootNode.getContentSize().height / 2);
            p.setContentSize(this.rootNode.getContentSize().width * 2, this.rootNode.getContentSize().height * 2);
            this.maskNode = p;
            this.rootNode.addChild(this.maskNode, 999);
            let wrpt = this.layout_sel.getParent().convertToWorldSpace(this.layout_sel.getPosition());
            this.layout_sel.removeFromParent();



            this.maskNode.addChild(this.layout_sel);
            wrpt = this.maskNode.convertToNodeSpace(wrpt);
            this.layout_sel.setPosition(wrpt);


            this.node.on(kaayou.TouchEvent.TouchEnd, () => {
                this.ShowSelectPanel();
            }, this);


            this.maskNode.on(kaayou.TouchEvent.TouchEnd, () => {
                this.HideSelectPanel();
            }, this);


            this.HideSelectPanel();


            lodash.forEach(this.sub_items, (v: ccui.Layout, index: number) => {
                v["_index"] = index - 1;
                v.getChildByName('bg').setVisible(false);
                v.on(kaayou.TouchEvent.TouchStart, (e: kaayou.TouchEvent) => {
                    let l: ccui.Layout = e.target;
                    l.getChildByName('bg').setVisible(true);
                }, this);
                v.on(kaayou.TouchEvent.TouchEnd, (e: kaayou.TouchEvent) => {
                    let l: ccui.Layout = e.target;
                    l.getChildByName('bg').setVisible(false);
                    let _index = l["_index"];;
                    this.setCurSelect(_index);
                    this.selcall && this.selcall();
                    this.HideSelectPanel();
                }, this);
                v.on(kaayou.TouchEvent.TouchCance, (e: kaayou.TouchEvent) => {
                    let l: ccui.Layout = e.target;
                    l.getChildByName('bg').setVisible(false);
                    //   this.ShowSelectPanel();
                }, this);
            })
            this.setCurSelect(-1);
        }

        setItemsCount(idx){
            this.sub_items.forEach((v,i)=>{
                v.setVisible(i<idx);
            })
        }

        setVisible(b){
            this.node.setVisible(b);
            this.HideSelectPanel();
        }
        setCurSelect(index: number) {
            if (this.sub_items.length < 1) { return; }
            if (index + 1 < 0 || index + 1 >= this.sub_items.length) { index = -1; }
            this._curselIndex = index;
            this.label_sel.setString((<ccui.Text>this.sub_items[index + 1].getChildByName('label')).getString());
        }
        getCurSelect() {
            return this._curselIndex;
        }
        ShowSelectPanel() {
            this.maskNode.setVisible(true);
        }

        HideSelectPanel() {
            this.maskNode.setVisible(false);
        }

        clearString() {
            // this.search_edit.setString("");
            // this.search_label.setString("昵称/ID");
        }
    }

}