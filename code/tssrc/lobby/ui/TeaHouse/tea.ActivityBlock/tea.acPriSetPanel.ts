namespace tea {
    var { BindEvent, doBindEvent } = kaayou._decorator;

    export class tea_AcPriSetMgr{
        static  __INS__: tea_AcPriSetMgr = null;
        static getInstance(_zOrder: number = 0) {
            if (tea_AcPriSetMgr.__INS__ == null) {
                tea_AcPriSetMgr.__INS__ = new tea_AcPriSetMgr();
                tea_AcPriSetMgr.__INS__.init();
                tea_AcPriSetMgr.__INS__._zOrder = _zOrder
            }
            return tea_AcPriSetMgr.__INS__;
        }
        _zOrder: number = 0
        __selfDialog:acPriSetPanel = null

        init() {
            let self = this;
            this.__selfDialog = null;

            kaayou.getController('tea').on('ui::acPriSetPanel::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show(e.data);
            }, this, 10);

            kaayou.getController('tea').on('ui::acPriSetPanel::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfDialog == null) {
                this.__selfDialog = new acPriSetPanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfDialog,this._zOrder);
                this.__selfDialog['onConfigUpdate'] && this.__selfDialog['onConfigUpdate']();
            }
            return this.__selfDialog;
        }

    }

    class acPriSetPanel extends kaayou.Layer{

        constructor(){
            super()
            this.initUI();
        }

        //private title:ccui.TextBMFont = null;
        private listNode:ccui.ScrollView  = null;
        private listArray:Array<priSetItem> = null;
        private closeNode:ccui.Button = null;
        private submitNode:ccui.Button = null;
        private item:ccui.Widget = null;

        initUI(){
            this.initWithccs(tea.res.TH_priSetPanel_Json)
            //this.title = <ccui.TextBMFont>(<cc.Node>ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Title")).getChildByName("label");
            this.listNode = <ccui.ScrollView>(<cc.Node>ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "memberlist")).getChildByName("content");
            this.listNode.setPadding({left:6, spacingY: 10 });
            this.listNode.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Vertical);
            this.listNode.setVertical(ccui.Layout.LayoutVertical.TOP);
            
            this.closeNode = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_close");
            this.submitNode = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "submit");
            this.item = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "tea_call_reward_config_item");
            this.item.setVisible(false)

            this.closeNode.on(kaayou.TouchEvent.TouchEnd , ()=>{
                kaayou.emit("tea" , "ui::acPriSetPanel::Hide")
            },this)

            this.submitNode.on(kaayou.TouchEvent.TouchEnd ,kaayou.TouchMask.clickHandle( ()=>{
                this.submitConfigList();
            },this),this)

            //this.title.setString("设置")
        }

        // @BindEvent("tea","ui::AntiIndulgencePanelControlDialog::submit")
        private async submitConfigList(){
            let hid = tea.mod.__teaHouseInfo.hid;
            let value = this.listArray.map(v=>{
                let info:any =  v.getInfo();
                return  info.num;
            });

            for (let i = 0; i < this.configArr.length; i++) {
                this.configArr[i].count = value[i];
                if (Number(value[i] > 200) ) {
                    kaayou.emit('common', 'ui::Toast::Show', { msg: "数量填写范围为0-200" });
                    return;
                }
            }

            //console.log(this.configArr);
            //配置成功之后需要去通知上一个界面的数据存储       
            this.Hide();
            kaayou.emit("tea","ui::createActivityPanel::luckyInfoUpdate",{configInfo:this.configArr});
        }

        initList(data){

            for(let i =0; i < 9 ;i++){
                let node = new priSetItem(this.item)
                node.setIndex(i);
                //node.setRewardInfo();
                node.setInfo({num:-1});
                this.listNode.addChild(node.node);
                this.listArray.push(node);
            }

            this.listNode.doChildrenLayout();
            this.listNode.scrollToTop(0,false);
            
            data.configArr.forEach((it , i)=>{
                this.listArray[i].setInfo({num:it.count})
            })

            this.listNode.doChildrenLayout();
            this.listNode.scrollToTop(0,false);
        }
        configArr:Array<Data_RewordInfo> = [];
        Show(data){
            this.listNode.removeAllChildren();
            this.listArray = [];
            this.node.setVisible(true);
            this.configArr = data.configArr
            kaayou.pop.showAni({
                cNode: this.node.getChildByName("contentPanel"),
                mNode: this.node.getChildByName("maskbg"),
                action:  () =>{
                    this.initList(data)
                }
            });
        }

        Hide(){
            this.node.setVisible(false);
        }
    }


    export class priSetItem{

        constructor(item:cc.Node){
            this.initUI(item)
        }

        node:cc.Node = null;
        private index = -1;
        private floor:ccui.Text =  null;
       // private select_container:ccui.Layout = null;
        private input_num:ccui.TextField = null;
        private texteditor = null;
        private _info = null;

        initUI(item:cc.Node){
            this.initWithNode(<ccui.Widget>item);
            this.floor = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "floor");
            //this.select_container = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "select_container");
            this.texteditor = kaayou.editBox.target(this.node)

           // this.input_num =  ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "input_num");

            this.input_num = this.texteditor.attachTextEdit("input_num",(str)=>{
                let num1 = +str;
                if (Number(num1)>200) {
                    kaayou.emit('common', 'ui::Toast::Show', { msg: "数量填写范围为0-200" })
                }
                let num = +str;
                    num = num || 0;
                this._info.num = num;
            },{fontColor:"#CFB7A6",type:"int",fontSize:24,allowEmpty:false,allowNavi:false,setMaxLength:3})
        }

        // setRewardInfo(){
        //     let child = this.select_container.getChildren()
        //         child.forEach(v=>{
        //            let text =  <ccui.Text>v.getChildByName("label")
        //            text.setString("奖杯")
        //         })
        //     child.slice(1).forEach(v=>{
        //         v.setVisible(false);
        //     })
        // }

        setInfo(info){
            this._info = info;
            if(info.num===-1){
                this.input_num.setString("0")
                this._info.num = 0;
            }else
                this.input_num.setString(info.num.toString())
        }

        getInfo(){
            return this._info;
        }

        initWithNode(node: ccui.Widget) {
            this.node = node.clone();
            this.node.setVisible(true);
            this.node.setPosition(0,0);
            // this.node.
            ccui.helper.doLayout(this.node);

            
            // this.addChild(this.node);
        }

              //0-9
              floorFormat(i) {
                let s = "一二三四五六七八九十".split("");
            
                    if (i < 10)
                        return s[i];
            
                let cut = i.toString().split("");
            
                if (cut[0] === "1")
                    if(cut[1]!=="9")
                        return s[9] + s[cut[1]];
                    else
                        return s[1] + s[9]
                if(cut[1]==="9")
                    return s[cut[0]]+s[9]
                return s[cut[0]-1] + s[cut[1]];
            
            }


        setIndex(index: number) {
            this.index = index;
            this.floor.setString(`${this.floorFormat(index)}等奖`)
            if (index == 8) {
                this.floor.setString("下次好运");
            }
        }
        getIndex(): number {
            return this.index
        }

    }

}