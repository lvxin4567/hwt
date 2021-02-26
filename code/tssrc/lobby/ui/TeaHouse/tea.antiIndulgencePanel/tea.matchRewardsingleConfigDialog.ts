namespace tea {
    var { BindEvent, doBindEvent } = kaayou._decorator;

    export class tea_matchRewardsingleConfigDialogMgr{
        static  __INS__: tea_matchRewardsingleConfigDialogMgr = null;
        static getInstance(_zOrder: number = 0) {
            if (tea_matchRewardsingleConfigDialogMgr.__INS__ == null) {
                tea_matchRewardsingleConfigDialogMgr.__INS__ = new tea_matchRewardsingleConfigDialogMgr();
                tea_matchRewardsingleConfigDialogMgr.__INS__.init();
                tea_matchRewardsingleConfigDialogMgr.__INS__._zOrder = _zOrder
            }
            return tea_matchRewardsingleConfigDialogMgr.__INS__;
        }
        _zOrder: number = 0
        __selfDialog:MatchRewardsingleConfigDialog = null

        init() {
            let self = this;
            this.__selfDialog = null;

            kaayou.getController('tea').on('ui::matchRewardsingleConfigDialog::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show();
            }, this, 10);

            kaayou.getController('tea').on('ui::matchRewardsingleConfigDialog::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfDialog == null) {
                this.__selfDialog = new MatchRewardsingleConfigDialog();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfDialog,this._zOrder);
                this.__selfDialog['onConfigUpdate'] && this.__selfDialog['onConfigUpdate']();
            }
            return this.__selfDialog;
        }

    }

    class MatchRewardsingleConfigDialog extends kaayou.Layer{

        constructor(){
            super()
            this.initUI();
        }

        private title:ccui.TextBMFont = null;
        private listNode:ccui.ScrollView  = null;
        private listArray:Array<MatchRewardsingleConfigDialogItem> = null;
        private closeNode:ccui.Button = null;
        private submitNode:ccui.Button = null;
        private item:ccui.Widget = null;

        initUI(){
            this.initWithccs(tea.res.TH_MatchRewardConfigDialog_json)
            this.title = <ccui.TextBMFont>(<cc.Node>ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Title")).getChildByName("label");
            this.listNode = <ccui.ScrollView>(<cc.Node>ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "memberlist")).getChildByName("content");
            this.listNode.setPadding({left:6, spacingY: 10 });
            this.listNode.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Vertical);
            this.listNode.setVertical(ccui.Layout.LayoutVertical.TOP);
            
            this.closeNode = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_close");
            this.submitNode = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "submit");
            this.item = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "tea_call_reward_config_item");
            this.item.setVisible(false)

            // this.pullConfigList();

            this.closeNode.on(kaayou.TouchEvent.TouchEnd , ()=>{
                kaayou.emit("tea" , "ui::matchRewardsingleConfigDialog::Hide")
            },this)

            this.submitNode.on(kaayou.TouchEvent.TouchEnd ,kaayou.TouchMask.clickHandle( ()=>{
                this.submitConfigList();
            },this),this)

            this.title.setString("个人赛奖励设置")
        }

        async pullConfigList(){
            let hid = tea.mod.__teaHouseInfo.hid;
            let data =  await kaayou.sendMessage("lobby","houseprizeinfo", {hid,type:1},"ws::Msg::houseprizeinfo");

            if (data.errcode) {
                kaayou.emit('common','ui::Dialog::Show', {
                    msg: data.msg || "获取楼层信息失败!"
                })
                return;
            }


            this.initList();

            if(!data.value){
                return ;
            }

            data.value.forEach((it , i)=>{
                this.listArray[i].setInfo({num:it})

            })

            this.listNode.doChildrenLayout();
            this.listNode.scrollToTop(0,false);
            

        }


        // @BindEvent("tea","ui::AntiIndulgencePanelControlDialog::submit")
        private async submitConfigList(){
            let hid = tea.mod.__teaHouseInfo.hid;
            let value = this.listArray.map(v=>{
                let info:any =  v.getInfo();
                return  info.num;
            });


            let data = await kaayou.sendMessage("lobby","houseprizeset", {hid,value,type:1},"ws::Msg::houseprizeset");

            if (data.errcode) {
                kaayou.emit('common','ui::Dialog::Show', {
                    msg: data.msg || "提交失败！"
                })
                return;
            }
            
            kaayou.emit('common','ui::Toast::Show', {
                msg: "提交成功！"
            })

            
            this.Hide();

        }

        initList(){

            for(let i =0; i < 20 ;i++){
                let node = new MatchRewardsingleConfigDialogItem(this.item)
                node.setIndex(i);
                node.setRewardInfo();
                node.setInfo({num:-1});
                this.listNode.addChild(node.node);
                this.listArray.push(node);
            }

            this.listNode.doChildrenLayout();
            this.listNode.scrollToTop(0,false);
        }

        Show(){
            this.listNode.removeAllChildren();
            this.listArray = [];
            this.node.setVisible(true);
            kaayou.pop.showAni({
                cNode: this.node.getChildByName("contentPanel"),
                mNode: this.node.getChildByName("maskbg"),
                action:  () =>{
                    this.pullConfigList()
                }
            });
        }

        Hide(){
            this.node.setVisible(false);
        }
    }


    export class MatchRewardsingleConfigDialogItem{

        constructor(item:cc.Node){
            this.initUI(item)
        }

        node:cc.Node = null;
        private index = -1;
        private floor:ccui.Text =  null;
        private select_container:ccui.Layout = null;
        private input_num:ccui.TextField = null;
        private texteditor = null;
        private _info = null;

        initUI(item:cc.Node){
            this.initWithNode(<ccui.Widget>item);
            this.floor = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "floor");
            this.select_container = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "select_container");
            this.texteditor = kaayou.editBox.target(this.node)

            this.input_num =  ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "input_num");

            this.input_num = this.texteditor.attachTextEdit("input_num",(str)=>{
                let num = +str;
                    num = num || 0;
                this._info.num = num;
            },{fontColor:"#CFB7A6",type:"int",fontSize:24,allowEmpty:false,allowNavi:false,setMaxLength:7})
        }

        setRewardInfo(){
            let child = this.select_container.getChildren()
                child.forEach(v=>{
                   let text =  <ccui.Text>v.getChildByName("label")
                   text.setString("奖杯")
                })
            child.slice(1).forEach(v=>{
                v.setVisible(false);
            })
        }

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
            this.floor.setString(`第${this.floorFormat(index)}名`)
        }
        getIndex(): number {
            return this.index
        }

    }

}