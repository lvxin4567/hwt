namespace tea {

    class autoCell extends kaayou.Block {
        constructor() {
            super();
        }
        label_Info: ccui.Text = null;
        initWithNode(node: ccui.Widget) {
            super.initWithNode(node);
            var self = this;
            this.label_Info = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label");
            this.node.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                // kaayou.emit("tea", 'ui::TeaHouseActivity::selectLc', self._data.actid);
                console.log(this._data);
            }, this);
        }
        _index = -1;
        setIndex(i:number){
            this._index = i;
        }
        _data = "";
        setInfo(data: string) {
            this._data = data;
            this.label_Info.setString(data);
        }
        unuse() {
            this._data = null;
            this.removeFromParent();
        }
    }



    export class MemberSelectWidget {
        btn_sel: ccui.Button = null; // 搜索按钮
        label_sel: ccui.Text = null; //搜索编辑框
        layout_sel: ccui.Layout = null; //搜索标签
        sub_items: Array<ccui.Layout> = null;
        node: cc.Node = null;
        rootNode: cc.Node = null;
        maskNode: ccui.Layout = null;
        clickCall: Function = null;
        selcall: Function = null;
        scrollList:ccui.ScrollView = null;
        _debugRect: boolean = false;
        _curselIndex: number = -1;
        autocell_Item :ccui.Layout = null;
        constructor() {

        }

        initWidthNode(node: cc.Node, rootnode: cc.Node, clickCall: Function,autoCell?:ccui.Layout) {
            this.rootNode = rootnode;
            this.node = node;
            this.selcall = clickCall;
            this.autocell_Item = autoCell;
            this.btn_sel = ccui.helper.seekWidgetByName(<ccui.Widget>node, "btn_sel");
            this.label_sel = ccui.helper.seekWidgetByName(<ccui.Widget>node, "label_sel");
            this.layout_sel = ccui.helper.seekWidgetByName(<ccui.Widget>node, "layout_sel");
            this.scrollList = ccui.helper.seekWidgetByName(<ccui.Widget>node, "scrollList");
            this.scrollList.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Vertical);
            // this.scrollList.setSpacingY(0);
            this.scrollList.setVertical(ccui.Layout.LayoutVertical.TOP);
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

            this.setItemsCount(tea.mod.__teaHouseInfo.hfloorids.length+1);
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

        setItemsCount(c){
            for(let i=0;i<this.sub_items.length;++i){
                if(i<c){
                    this.sub_items[i].setVisible(true);
                }else{
                    this.sub_items[i].setVisible(false);
                }
            }
            // this.scrollList.removeAllChildren();
            // this.sub_items.slice(0,c).forEach(v=>{
            //     this.scrollList.addChild(v);
            // });
            this.scrollList.doChildrenLayout();
            this.scrollList.setInnerContainerSize(cc.size(223, c*28 + 4));
            this.scrollList.scrollToTop(0,false);
        }
        //动态模式
        setAutoItem(data:Array<string>){
            this.scrollList.removeAllChildren();
            this.sub_items = [];
            for (let  i in data) {
                let cell = this.CreateAutoCell();
                this.sub_items.push(cell);
                this.scrollList.addChild(cell);
                cell.setInfo(data[i]);
                cell.setIndex(Number(i));
                cell.node.on(kaayou.TouchEvent.TouchEnd, (e: kaayou.TouchEvent) => {
                    this._curselIndex = cell._index;
                    this.label_sel.setString(cell.label_Info.getString());
                    this.selcall && this.selcall();
                    this.HideSelectPanel();
                }, this);
            }
            this.scrollList.doChildrenLayout();
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

        private CreateAutoCell(): autoCell {
            let cell = kaayou.pool.getFromPool(autoCell);
            if (!cell) {
                cell = new autoCell();
                cell.initWithNode(this.autocell_Item);
            }
            cell.setAnchorPoint(0, 0);
            cell.setPositionY(8);
            cell.setPositionX(8);
            cell.setVisible(true);
            return cell;
        }



    }





}