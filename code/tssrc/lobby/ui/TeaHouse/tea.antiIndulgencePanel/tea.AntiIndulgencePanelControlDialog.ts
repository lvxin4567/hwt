namespace tea {
    var { BindEvent, doBindEvent } = kaayou._decorator;

    export class tea_AntiIndulgencePanelControlDialogMgr{
        static  __INS__: tea_AntiIndulgencePanelControlDialogMgr = null;
        static getInstance(_zOrder: number = 0) {
            if (tea_AntiIndulgencePanelControlDialogMgr.__INS__ == null) {
                tea_AntiIndulgencePanelControlDialogMgr.__INS__ = new tea_AntiIndulgencePanelControlDialogMgr();
                tea_AntiIndulgencePanelControlDialogMgr.__INS__.init();
                tea_AntiIndulgencePanelControlDialogMgr.__INS__._zOrder = _zOrder
            }
            return tea_AntiIndulgencePanelControlDialogMgr.__INS__;
        }
        _zOrder: number = 0
        __selfDialog:AntiIndulgencePanelControlDialog = null

        init() {
            let self = this;
            this.__selfDialog = null;

            kaayou.getController('tea').on('ui::AntiIndulgencePanelControlDialog::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show(<boolean>e.data.display||false);
            }, this, 10);

            kaayou.getController('tea').on('ui::AntiIndulgencePanelControlDialog::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfDialog == null) {
                this.__selfDialog = new AntiIndulgencePanelControlDialog();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfDialog,this._zOrder);
                this.__selfDialog['onConfigUpdate'] && this.__selfDialog['onConfigUpdate']();
            }
            return this.__selfDialog;
        }

    }

    export class AntiIndulgencePanelControlDialog extends kaayou.Layer{

        constructor(){
            super()
            this.initUI();
        }

        private listNode:ccui.ScrollView  = null;
        private closeNode:ccui.Button = null;
        private submitNode:ccui.Button = null;
        private item:ccui.Widget = null;
        private listArray:Array<AntiIndulgencePanelControlDialogItem> = []

        initUI(){
            this.initWithccs(tea.res.AntiIndulgencePanelControlDialog_json)
            
            this.listNode = <ccui.ScrollView>(<cc.Node>ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "floorcontent")).getChildByName("content");
            this.listNode.setPadding({left:6, spacingY: 5 });
            this.listNode.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Vertical);
            this.listNode.setVertical(ccui.Layout.LayoutVertical.TOP);
            
            this.closeNode = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_close");
            this.submitNode = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "submit");
            this.item = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "dialog_item");
            this.item.setVisible(false)

            // this.pullConfigList();

            this.closeNode.on(kaayou.TouchEvent.TouchEnd , ()=>{
                kaayou.emit("tea" , "ui::AntiIndulgencePanelControlDialog::Hide")
            },this)

            this.submitNode.on(kaayou.TouchEvent.TouchEnd , ()=>{
                this.submitConfigList();
            },this)

        }


        @BindEvent("tea","ui::AntiIndulgencePanelControlDialog::pullConfigList")
        async pullConfigList(){
            let hid = tea.mod.__teaHouseInfo.hid;
            let data =  await kaayou.sendMessage("lobby","hfvitamineffectget", {hid},"ws::Msg::hfvitamineffectget");

            if (data.errcode) {
                kaayou.emit('common','ui::Dialog::Show', {
                    msg: data.msg || "获取楼层信息失败!"
                })
                return;
            }

            data.items.forEach((it , i)=>{
                let initedItem = new AntiIndulgencePanelControlDialogItem(this.item);
                    initedItem.initInfo(it);
                    initedItem.setIndex(i);
                    initedItem.setFloor(i);
                    initedItem.node.setPosition(0,0);
                    this.listNode.addChild(initedItem.node);
                    this.listArray.push(initedItem)
            })

            this.listNode.doChildrenLayout();
            this.listNode.scrollToTop(0,false);
            

        }


        // @BindEvent("tea","ui::AntiIndulgencePanelControlDialog::submit")
        private async submitConfigList(){
            let hid = tea.mod.__teaHouseInfo.hid;
            let d =  {hid,items:this.listArray.map(v=>v.getInfo())}
            console.log("hfvitamineffectset======>",d)
            let data = await kaayou.sendMessage("lobby","hfvitamineffectset", d,"ws::Msg::hfvitamineffectset");

            if (data.errcode) {
                kaayou.emit('common','ui::Dialog::Show', {
                    msg: data.msg || "提交失败！"
                })
                return;
            }
            
            kaayou.emit('common','ui::Toast::Show', {
                msg: "提交成功！"
            })

            //刷新配置状态
            kaayou.emit("tea","mod::TeaHouse::GetAntiIndulgence",{hid:tea.mod.__teaHouseInfo.hid});
            
            this.Hide();

        }

        private _record = {_setted:false,_data:{}}

        private snapshot(){

            let items = this.listArray

            items.forEach(v=>{
                let info = v.getInfo()
                    info = lodash.clone(info);
                this._record._data[info.fid] = {_super:v,info};
            })

            this._record._setted = true;
        }

        Show(bool:boolean){
            if(bool!==true){
                this.node.setVisible(false);    
                return;
            }
            this.listNode.removeAllChildren();
            this.listArray.splice(0,this.listArray.length)
            this.pullConfigList()
            this.node.setVisible(true);
            kaayou.pop.showAni({
                cNode: this.node.getChildByName("contentPanel"),
                mNode: this.node.getChildByName("maskbg"),
                action:  () =>{
                    // this.recoverSnap();
                }
            });
        }

        Hide(){
            this.node.setVisible(false);
            this.snapshot();
        }
    }


    export class AntiIndulgencePanelControlDialogItem{

        constructor(item:cc.Node){
            this.initUI(item)
        }

        node:cc.Node = null;
        private index = -1;
        private _list:Array<cc.Node> = null;
        private _MAX = 0xfffffffe;
        private antiIndu_node:cc.Node = null;
        private gamepause_node:cc.Node = null;
        private join_limit_inode:cc.Node = null;
        private pause_inode:cc.Node = null;
        private _info:{fid:number,isvitamin:boolean,isgamepause:boolean,vitaminlowlimit:number,vitaminlowlimitpause:number} = {fid:-1,isvitamin:null,isgamepause:null,vitaminlowlimit:null,vitaminlowlimitpause:null};
        private join_limit_input:cc.Node = null
        private pause_inode_input:cc.Node = null
        private floor:ccui.ImageView = null;
        private ph = "";
        initUI(item:cc.Node){

            this.initWithNode(<ccui.Widget>item);
            this.antiIndu_node = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "antiIndu_control");
            this.gamepause_node = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "gamepause_control");
            this.join_limit_inode = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "item_join_limit");
            this.join_limit_input = <ccui.TextField>ccui.helper.seekWidgetByName(<ccui.Widget>this.join_limit_inode,"input_low_num");
            this.pause_inode = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "item_pause_limit");
            this.floor = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Image_1");

            this.pause_inode_input = <ccui.TextField>ccui.helper.seekWidgetByName(<ccui.Widget>this.pause_inode,"input_low_num");
            let sp = new cc["Scale9Sprite"]();
            sp.initWithFile(common.res.alpha_4x4, cc.rect(0, 0, 0, 0), cc.rect(0, 0, 0, 0));
            let eb: cc.Node = cc["EditBox"].create(this.pause_inode_input.getContentSize(), sp);
            eb.setAnchorPoint(0, 0);
            eb.setPosition(0, 0);
            eb.setOpacity(0);
            eb['setFontSize'](24);
            eb['setFontColor'](cc.color("#CFB7A6"));
            eb['setInputMode'](6);
            eb['setMaxLength'](8);
            eb["setPlaceholderFontSize"](24)
            eb["setPlaceholderFontColor"](cc.color("#CFB7A6"))
            this.pause_inode_input.addChild(eb);
            this.pause_inode_input = eb;

            this.join_limit_input = <ccui.TextField>ccui.helper.seekWidgetByName(<ccui.Widget>this.join_limit_inode,"input_low_num");
            sp = new cc["Scale9Sprite"]();
            sp.initWithFile(common.res.alpha_4x4, cc.rect(0, 0, 0, 0), cc.rect(0, 0, 0, 0));
            let eb1: cc.Node = cc["EditBox"].create(this.join_limit_input.getContentSize(), sp);
            eb1.setAnchorPoint(0, 0);
            eb1.setPosition(0, 0);
            eb1.setOpacity(0);
            eb1['setFontSize'](24);
            eb1['setFontColor'](cc.color("#CFB7A6"));
            eb1['setInputMode'](6);
            eb1['setMaxLength'](8);
            eb1["setPlaceholderFontSize"](24)
            eb1["setPlaceholderFontColor"](cc.color("#CFB7A6"))
            this.join_limit_input.addChild(eb1);
            this.join_limit_input = eb1;
            

            this.initEvent();
        }

        private attachCheckBox(boxOutNode:cc.Node , toggleA:Function , toggleB:Function , scope , toggleAPI?){
            let n1 = <cc.Node>ccui.helper.seekWidgetByName(<ccui.Widget>boxOutNode,"item_pay1")
            let n2 = <cc.Node>ccui.helper.seekWidgetByName(<ccui.Widget>boxOutNode,"item_pay2")
            let lb1 = n1.getChildByName("label");
            let lb2 = n2.getChildByName("label")
            let tg1= <ccui.CheckBox>n1.getChildByName("checkbox")
            let tg2 = <ccui.CheckBox>n2.getChildByName("checkbox")
            let lockhandle = false;

            if(toggleAPI){
                toggleAPI.toggleA = function(lock:boolean){
                    tg1.setSelected(true)
                    tg2.setSelected(false);
                    lb1.setColor(cc.color("#D33A25"))
                    lb2.setColor(cc.color("#93692D"))
                    toggleA();
                }.bind(scope)
                toggleAPI.toggleB = function(lock:boolean){

                    if(lock===true)
                        lockhandle = true;

                    tg1.setSelected(false)
                    tg2.setSelected(true);
                    lb1.setColor(cc.color("#93692D"))
                    lb2.setColor(cc.color("#D33A25"))
                    toggleB();
                }.bind(scope)
                toggleAPI.releaseLock = function(){
                    lockhandle = false;
                }
            }

            tg1.on(kaayou.CheckEvent.SELECTED,function(e){

                if(lockhandle){
                    if(tg2.isSelected)
                        tg1.setSelected(false)
                    return ;
                }

                if(tg1.isSelected()){
                    toggleA()
                    lb1.setColor(cc.color("#D33A25"))
                    lb2.setColor(cc.color("#93692D"))
                }
                    

                if(tg2.isSelected()){
                    tg2.setSelected(false)
                    
                }

            },scope)

            
            tg1.on(kaayou.CheckEvent.UNSELECTED,function(e){
                // console.log(n1)
                    tg1.setSelected(!tg2.isSelected());
            },scope)

            tg2.on(kaayou.CheckEvent.SELECTED,function(e){

                if(lockhandle){
                    if(tg1.isSelected)
                        tg2.setSelected(false)
                    return ;
                }

                if(tg2.isSelected()){
                    toggleB();
                    lb1.setColor(cc.color("#93692D"))
                    lb2.setColor(cc.color("#D33A25"))
                }

                if(tg1.isSelected()){
                    tg1.setSelected(false)
                }
            },scope)

            
            tg2.on(kaayou.CheckEvent.UNSELECTED,function(e){
                // console.log(n2)
                    tg2.setSelected(!tg1.isSelected());
            },scope)

        }

        private attachTextEdit(boxOutNode:cc.Node ,handleInput, handleInactive,navi:boolean = false ){
            let box = <ccui.CheckBox >ccui.helper.seekWidgetByName(<ccui.Widget>boxOutNode,"checkbox");
            let input:cc.Node = <ccui.TextField>ccui.helper.seekWidgetByName(<ccui.Widget>boxOutNode,"input_low_num");
                input = this.getChild(input,cc["EditBox"]);

                (<any>input).setPlaceHolder("点击输入")

                input['setDelegate'](
                    {

                        editBoxTextChanged:function(ref){
                            let str = ref.getString(); 
                            // let i = +ref.getString();
                            let other = /[^\-^0-^9^\.]+/
                            let number = /(^[0-9]+[\.]{0,1}[0-9]{0,2}$)|(^[0-9]$)/
                            let isNavi = false
                            let dotCount = (str)=>{
                                let dot = str.match(/\./g)
                                return null===dot ? 0 : dot.length;
                            }

                            if(str.charAt(0)==="-" && navi === true){
                                isNavi = true
                                str = str.substring(1);
                            }

                            let subCount = (str)=>{
                                let sub = str.match(/\-/g)
                                return null===sub ? 0 : sub.length;
                            }
    
                            while(other.test(str) ||subCount(str)>0 || dotCount(str)>1 || number.test(str)===false){
                                str = str.slice(0,str.length-1);
                                if(str.length===0)
                                    break;
                            }

                            if(isNavi)
                                ref.setString("-"+str);
                            else
                                ref.setString(str)
                        },
                        /**
                         * This method is called when an edit box loses focus after keyboard is hidden.
                         * @param {cc.EditBox} sender
                         */
                        editBoxEditingDidEnd: function (ref) {
                            //console.log('editBoxEditingDidEnd',sender.getString());
                            if(box.isSelected()){
                                handleInput(ref.getString(),ref)
                            }
                            else
                                handleInactive(ref)
                        }
                    }
                )


            box.on(kaayou.CheckEvent.SELECTED , function(e){
                if(box.isSelected())
                    handleInactive()
                else
                    handleInput((<ccui.TextField>input).getString())
            },this)

        }

        private getChild(node:cc.Node , type:any){
            let child = node.getChildren();
            for(let i = 0 ; i <child.length ; i++)
                if(child[i] && child[i] instanceof type)
                    return child[i]

            return null
        }

        private limitOper:any = {}
        initEvent(){

            

            this.attachCheckBox(this.antiIndu_node , 
            ()=>{
                this.setInfo({isvitamin:true});
                this.toggleVitaminlowlimit(true)
                this.limitOper.releaseLock();
                // let input:cc.Node = <ccui.TextField>ccui.helper.seekWidgetByName(<ccui.Widget>this.join_limit_inode,"input_low_num");
                // input = this.getChild(input,cc["EditBox"]);
                // (<ccui.TextField>input).setString("")
                // this.setInfo({vitaminlowlimit:0})
            },
            ()=>{
                this.setInfo({isvitamin:false});
                this.toggleVitaminlowlimit(false)
                this.limitOper.toggleB(true);
                // this.setInfo({vitaminlowlimit:this._MAX})
                // let input:cc.Node = <ccui.TextField>ccui.helper.seekWidgetByName(<ccui.Widget>this.join_limit_inode,"input_low_num");
                //     input = this.getChild(input,cc["EditBox"]);
                //     (<ccui.TextField>input).setString(this.ph)
            },this);

            this.attachCheckBox(this.gamepause_node , 
            ()=>{
                this.setInfo({isgamepause:true});
                this.toggleVitaminlowlimitpause(true)
                // let input:cc.Node = <ccui.TextField>ccui.helper.seekWidgetByName(<ccui.Widget>this.pause_inode,"input_low_num");
                // input = this.getChild(input,cc["EditBox"]);
                // (<ccui.TextField>input).setString("")
                // this.setInfo({vitaminlowlimitpause:0})
            },
            ()=>{
                this.setInfo({isgamepause:false});
                this.toggleVitaminlowlimitpause(false)
                // this.setInfo({vitaminlowlimitpause:this._MAX})
                // let input:cc.Node = <ccui.TextField>ccui.helper.seekWidgetByName(<ccui.Widget>this.pause_inode,"input_low_num");
                //     input = this.getChild(input,cc["EditBox"]);
                //     (<ccui.TextField>input).setString(this.ph)
            },this,this.limitOper);



            this.attachTextEdit(this.pause_inode , 
            (str,ref)=>{

                if(str.length===0)
                    return ;

                let i = +str;
                isNaN(i)===false &&  ( (i = Math.min(this._MAX-1,i)  ) , this.setInfo({vitaminlowlimitpause:i}) , ref.setString(i) , true) || ref.setString("");
            },
            (ref)=>{
                
                // this.setInfo({vitaminlowlimitpause:this._MAX})
                // ref.setString(this.ph);
                let str= ref.getString() 
                if(str.length===0){
                    return 
                }

                let i = +ref.getString();
                isNaN(i)===false &&  ( (i = Math.min(this._MAX-1,i)  ) , this.setInfo({vitaminlowlimitpause:i}) , ref.setString(i) , true) || ref.setString("");
            },true)

            this.attachTextEdit(this.join_limit_inode , 
                (str,ref)=>{

                    if(str.length===0)
                    return ;

                    let i = +str;
                    isNaN(i)===false &&  ( (i = Math.min(this._MAX-1,i)  ) , this.setInfo({vitaminlowlimit:i}) , ref.setString(i) , true) || ref.setString("");
                },
                (ref)=>{   
                    // this.setInfo({vitaminlowlimit:this._MAX})
                    // ref.setString(this.ph);
                    let str= ref.getString() 
                    if(str.length===0){
                        ref.setString("")
                        return 
                    }

                    let i = +ref.getString();
                    isNaN(i)===false &&  ( (i = Math.min(this._MAX-1,i)  ) , this.setInfo({vitaminlowlimit:i}) , ref.setString(i) , true) || ref.setString("");
                }
            ,true)
        }

        setVitamin(b:boolean){
            let n1 = <cc.Node>ccui.helper.seekWidgetByName(<ccui.Widget>this.antiIndu_node,"item_pay1")
            let n2 = <cc.Node>ccui.helper.seekWidgetByName(<ccui.Widget>this.antiIndu_node,"item_pay2")
            let lb1 = n1.getChildByName("label");
            let lb2 = n2.getChildByName("label")
            let tg1= <ccui.CheckBox>n1.getChildByName("checkbox")
            let tg2 = <ccui.CheckBox>n2.getChildByName("checkbox")

            if(b){
                tg1.setSelected(true)
                tg2.setSelected(false)
                lb1.setColor(cc.color("#D33A25"))
                lb2.setColor(cc.color("#93692D"))
            }else{
                lb2.setColor(cc.color("#D33A25"))
                lb1.setColor(cc.color("#93692D"))
                setTimeout(() => {
                    this.limitOper.toggleB(true);
                }, 32);
                tg1.setSelected(false)
                tg2.setSelected(true)
            }

            this.toggleVitaminlowlimit(b)
        }

        setPauseConfig(b:boolean){
            // let tg1 = <ccui.CheckBox>(<cc.Node>ccui.helper.seekWidgetByName(<ccui.Widget>this.gamepause_node,"item_pay1")).getChildByName("checkbox")
            // let tg2 = <ccui.CheckBox>(<cc.Node>ccui.helper.seekWidgetByName(<ccui.Widget>this.gamepause_node,"item_pay2")).getChildByName("checkbox")

            let n1 = <cc.Node>ccui.helper.seekWidgetByName(<ccui.Widget>this.gamepause_node,"item_pay1")
            let n2 = <cc.Node>ccui.helper.seekWidgetByName(<ccui.Widget>this.gamepause_node,"item_pay2")
            let lb1 = n1.getChildByName("label");
            let lb2 = n2.getChildByName("label")
            let tg1= <ccui.CheckBox>n1.getChildByName("checkbox")
            let tg2 = <ccui.CheckBox>n2.getChildByName("checkbox")

            if(b){
                tg1.setSelected(true)
                tg2.setSelected(false)
                lb1.setColor(cc.color("#D33A25"))
                lb2.setColor(cc.color("#93692D"))
            }else{
                lb2.setColor(cc.color("#D33A25"))
                lb1.setColor(cc.color("#93692D"))
                tg1.setSelected(false)
                tg2.setSelected(true)
            }

            this.toggleVitaminlowlimitpause(b)
        }

        toggleVitaminlowlimit(b:boolean){
            let box =  <ccui.CheckBox>ccui.helper.seekWidgetByName(<ccui.Widget>this.join_limit_inode,"checkbox")
                box.setSelected(b);
        }

        toggleVitaminlowlimitpause(b:boolean){
            let box =  <ccui.CheckBox>ccui.helper.seekWidgetByName(<ccui.Widget>this.pause_inode,"checkbox")
                box.setSelected(b);
        }

        setVitaminlowlimit(val:number){
            val = <any>((val===this._MAX)?this.ph:val);
            (<ccui.TextField>this.join_limit_input).setString(val.toString())
        }

        setVitaminlowlimitpause(val:number){
            val = <any>((val===this._MAX)?this.ph:val);
            (<ccui.TextField>this.pause_inode_input).setString(val.toString())
        }

        setFid(di:number){
            this._info.fid = di;
            return this;
        }

        setFloor(lv:number){
            this.floor.loadTexture(`TH_Dela_Floor_font${-~lv}.png`, ccui.Widget.PLIST_TEXTURE);
            this.floor.ignoreContentAdaptWithSize(true);
        }


        initInfo(info:{fid:number,isvitamin?:boolean,isgamepause?:boolean,vitaminlowlimit?:number,vitaminlowlimitpause?:number}){
            this.setFid(info.fid);
            this.setVitamin(info.isvitamin);
            this.setPauseConfig(info.isgamepause);
            this.setVitaminlowlimit(info.vitaminlowlimit)
            this.setVitaminlowlimitpause(info.vitaminlowlimitpause)
            info = lodash.pick(info,["isvitamin","isgamepause","vitaminlowlimit","vitaminlowlimitpause"])
            lodash.extend(this._info ,  info)

            return this;
        }

        getInfo(){
            return lodash.clone(this._info);
        }


        initWithNode(node: ccui.Widget) {
            this.node = node.clone();
            this.node.setVisible(true);
            this.node.setPosition(0,0);
            // this.node.
            ccui.helper.doLayout(this.node);

            
            // this.addChild(this.node);
        }

        appendTo(parent:cc.Node , index , list?){
            parent.addChild(this.node);
            this.setIndex(index)
            list && (this._list = list );
        }

        setInfo(info:{isvitamin?:boolean,isgamepause?:boolean,vitaminlowlimit?:number,vitaminlowlimitpause?:number}) {
            info = lodash.pick(info,["isvitamin","isgamepause","vitaminlowlimit","vitaminlowlimitpause"])
            lodash.extend(this._info ,  info)
            return this;
        }

        setIndex(index: number) {
            this.index = index;
        }
        getIndex(): number {
            return this.index
        }

    }

}