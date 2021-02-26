namespace tea {
    var { BindEvent, doBindEvent } = kaayou._decorator;
    interface IAntiIndulgencPointDialogData{
        "fid":number, "aa":boolean, "c1":number, "g2":boolean, "u2":number, "g3":boolean, "u3":number, "c3":number, "g4":boolean, "u4":number, "c4":number, "g5":boolean, "u5":number, "c5":number, "g6":boolean, "u6":number, "c6":number
    }
    export class tea_AntiIndulgencPointDialogMgr{
        static  __INS__: tea_AntiIndulgencPointDialogMgr = null;
        static getInstance(_zOrder: number = 0) {
            if (tea_AntiIndulgencPointDialogMgr.__INS__ == null) {
                tea_AntiIndulgencPointDialogMgr.__INS__ = new tea_AntiIndulgencPointDialogMgr();
                tea_AntiIndulgencPointDialogMgr.__INS__.init();
                tea_AntiIndulgencPointDialogMgr.__INS__._zOrder = _zOrder
            }
            return tea_AntiIndulgencPointDialogMgr.__INS__;
        }
        _zOrder: number = 0
        __selfDialog:AntiIndulgencPointDialog = null

        init() {
            let self = this;
            this.__selfDialog = null;

            kaayou.getController('tea').on('ui::AntiIndulgencPointDialog::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show(<boolean>e.data.display||false);
            }, this, 10);

            kaayou.getController('tea').on('ui::AntiIndulgencPointDialog::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfDialog == null) {
                this.__selfDialog = new AntiIndulgencPointDialog();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfDialog,this._zOrder);
                this.__selfDialog['onConfigUpdate'] && this.__selfDialog['onConfigUpdate']();
            }
            return this.__selfDialog;
        }

    }

    export class AntiIndulgencPointDialog extends kaayou.Layer{

        constructor(){
            super()
            this.initUI();
        }

        private listNode:ccui.ScrollView  = null;
        private closeNode:ccui.Button = null;
        private submitNode:ccui.Button = null;
        private item:ccui.Widget = null;
        private listArray:Array<AntiIndulgencPointDialogItem> = []

        initUI(){
            this.initWithccs(tea.res.TH_AntiIndulgence_PointConfig_Panel_json)
            
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
                kaayou.emit("tea" , "ui::AntiIndulgencPointDialog::Hide")
            },this)

            this.submitNode.on(kaayou.TouchEvent.TouchEnd , ()=>{
                this.submitConfigList();
            },this)

        }


        @BindEvent("tea","ui::AntiIndulgencPointDialog::pullConfigList")
        async pullConfigList(){
            let hid = tea.mod.__teaHouseInfo.hid;
            let data =  await kaayou.sendMessage("lobby","housefloorgearpayget", {hid},"ws::Msg::housefloorgearpayget");

            if (data.errcode) {
                kaayou.emit('common','ui::Dialog::Show', {
                    msg: data.msg || "获取楼层信息失败!"
                })
                return;
            }

            data.items.forEach((it , i)=>{
                let initedItem = new AntiIndulgencPointDialogItem(this.item);
                    initedItem.setInfo(it);
                    initedItem.setIndex(i);
                    initedItem.setFloor(i);
                    initedItem.node.setPosition(0,0);
                    this.listNode.addChild(initedItem.node);
                    this.listArray.push(initedItem)
            })

            this.listNode.doChildrenLayout();
            this.listNode.scrollToTop(0,false);
            

        }

        
        private async submitConfigList(){
            let hid = tea.mod.__teaHouseInfo.hid;
            let d = {hid,items:this.listArray.map(v=>v.getInfo())}


            console.log("housefloorgearpayset=====>",d)
            let data = await kaayou.sendMessage("lobby","housefloorgearpayset", d,"ws::Msg::housefloorgearpayset");

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

        Show(bool:boolean){
            if(bool!==true){
                this.node.setVisible(false);    
                return;
            }

            this.listNode.removeAllChildren();
            this.listArray.splice(0,this.listArray.length);
            this.pullConfigList();
            this.node.setVisible(true);
            kaayou.pop.showAni({
                cNode: this.node.getChildByName("contentPanel"),
                mNode: this.node.getChildByName("maskbg"),
                action: function () {

                }
            });
        }

        Hide(){
            this.node.setVisible(false);
        }
    }


    export class AntiIndulgencPointDialogItem{

        constructor(item:cc.Node){
            this.initUI(item)
        }

        node:cc.Node = null;
        private NOMODIFY = -1
        private index = -1;

        private _info:IAntiIndulgencPointDialogData;
        private floor:ccui.ImageView = null;

        item_pay1:ccui.Layout = null;
        item_pay2:ccui.Layout = null;
        input_c1:ccui.TextField = null;

        input_u2:ccui.TextField = null;
        cbx_g2:ccui.CheckBox = null;
        num_g2:ccui.Text = null;

        cbx_g3:ccui.CheckBox = null;
        input_ru2:ccui.TextField = null;
        input_u3:ccui.TextField = null;
        input_c3:ccui.TextField = null;

        cbx_g4:ccui.CheckBox = null;
        input_ru3:ccui.TextField = null;
        input_u4:ccui.TextField = null;
        input_c4:ccui.TextField = null;

        cbx_g5:ccui.CheckBox = null;
        input_ru4:ccui.TextField = null;
        input_u5:ccui.TextField = null;
        input_c5:ccui.TextField = null;

        cbx_g6:ccui.CheckBox = null;
        input_ru5:ccui.TextField = null;
        input_u6:ccui.TextField = null;
        input_c6:ccui.TextField = null;

        item_low:ccui.Layout = null;
        item_l3:ccui.Layout = null;
        item_l4:ccui.Layout = null;
        item_l5:ccui.Layout = null;
        item_l6:ccui.Layout = null;

        boxapi = null;
        initUI(item:cc.Node){
            this.initWithNode(<ccui.Widget>item);
            this.floor = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Image_1");
            this.item_pay1 = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "item_pay1");
            this.item_pay2 = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "item_pay2");

            this.num_g2 =  ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Text_2");

            this.input_ru2 = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "input_ru2");
            this.input_ru3 = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "input_ru3");
            this.input_ru4 = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "input_ru4");
            this.input_ru5 = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "input_ru5");

            this.cbx_g2 = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "cbx_g2");
            this.cbx_g3 = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "cbx_g3");
            this.cbx_g4 = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "cbx_g4");
            this.cbx_g5 = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "cbx_g5");
            this.cbx_g6 = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "cbx_g6");


            this.item_low = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "item_low");
            this.item_l3 = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "item_l3");
            this.item_l4 = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "item_l4");
            this.item_l5 = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "item_l5");
            this.item_l6 = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "item_l6");
            
            let self = this;
            let boxapi =  this.boxapi = kaayou.editBox.target(this.node);


            this.cbx_g2.on(kaayou.CheckEvent.SELECTED,function(e:kaayou.CheckEvent){
                if(self.check("g2")===false){
                    kaayou.emit('common', 'ui::Toast::Show', { msg:"请按序号顺序填写各配置" });
                    self.cbx_g2.setSelected(false);
                    self._info.g2 = false
                    return ;
                }
                self._info.g2 = true
            },this);

            this.cbx_g2.on(kaayou.CheckEvent.UNSELECTED,function(e:kaayou.CheckEvent){
                self._info.g2 = false
            },this);



            this.cbx_g3.on(kaayou.CheckEvent.SELECTED,function(e:kaayou.CheckEvent){
                if(self.check("g3")===false){
                    kaayou.emit('common', 'ui::Toast::Show', { msg:"请按序号顺序填写各配置" });
                    self.cbx_g3.setSelected(false);
                    self._info.g3 = false
                    self.disableComponents(self.input_u3,self.input_c3)
                    return ;
                }
                self._info.g3 = true
                self.enableComponents(self.input_u3,self.input_c3)
            },this);

            this.cbx_g3.on(kaayou.CheckEvent.UNSELECTED,function(e:kaayou.CheckEvent){
                let g4 = self.cbx_g4.isSelected();
                if(g4===true){
                    self.cbx_g3.setSelected(true);
                    self._info.g3 = true;
                    self.enableComponents(self.input_u3,self.input_c3)
                    return ;
                }
                self._info.g3 = false
                self.disableComponents(self.input_u3,self.input_c3)
            },this);



            this.cbx_g4.on(kaayou.CheckEvent.SELECTED,function(e:kaayou.CheckEvent){
                let g3 = self.cbx_g3.isSelected();
                let u4 = self.boxapi.getValue("input_u4");
                let u3 = self.boxapi.getValue("input_u3");
                if(u4.length===0 && g3===true){
                    self.boxapi.setValue("input_u4",u3);
                }else if(self.check("g4")===false || g3===false){
                    kaayou.emit('common', 'ui::Toast::Show', { msg:"请按序号顺序填写各配置" });
                    self.cbx_g4.setSelected(false);
                    self._info.g4 = false;
                    self.disableComponents(self.input_u4,self.input_c4)
                    return ;
                }
                self.enableComponents(self.input_u4,self.input_c4)
                self._info.g4 = true
            },this);


            this.cbx_g4.on(kaayou.CheckEvent.UNSELECTED,function(e:kaayou.CheckEvent){
                let g5 =  self.cbx_g5.isSelected();
                let g3 = self.cbx_g3.isSelected();
                if(g5 || g3 && g5){
                    self.cbx_g4.setSelected(true);
                    self._info.g4 = true;
                    self.enableComponents(self.input_u4,self.input_c4)
                    return ;
                }

                self._info.g4 = false
                self.disableComponents(self.input_u4,self.input_c4)
            },this);


            this.cbx_g5.on(kaayou.CheckEvent.SELECTED,function(e:kaayou.CheckEvent){
                let g4 = self.cbx_g4.isSelected();
                let u5 = self.boxapi.getValue("input_u5");
                let u4 = self.boxapi.getValue("input_u4");
                if(u5.length===0 && g4===true ){
                    self.boxapi.setValue("input_u5",u4);
                }else if(self.check("g5")===false || g4===false){
                    kaayou.emit('common', 'ui::Toast::Show', { msg:"请按序号顺序填写各配置" });
                    self.cbx_g5.setSelected(false);
                    self._info.g5=false;
                    self.disableComponents(self.input_u5,self.input_c5)
                    return;
                }
                self.enableComponents(self.input_u5,self.input_c5)
                self._info.g5 = true
            },this);

            
            this.cbx_g5.on(kaayou.CheckEvent.UNSELECTED,function(e:kaayou.CheckEvent){
                let g6 = self.cbx_g6.isSelected();
                let g4 = self.cbx_g4.isSelected();
                if(g6 || g6 && g4){
                    self.cbx_g5.setSelected(true);
                    self._info.g5 = true;
                    self.enableComponents(self.input_u5,self.input_c5)
                    return;
                }
                self._info.g5 = false
                self.disableComponents(self.input_u5,self.input_c5)
            },this);


            this.cbx_g6.on(kaayou.CheckEvent.SELECTED,function(e:kaayou.CheckEvent){
                let g5 = self.cbx_g5.isSelected();
                let u6 = self.boxapi.getValue("input_u6");
                let u5 = self.boxapi.getValue("input_u5");
                if(u6.length===0 && g5===true){
                    self.boxapi.setValue("input_u5",u5);
                }else if(self.check("g6")===false || g5===false){
                    kaayou.emit('common', 'ui::Toast::Show', { msg:"请按序号顺序填写各配置" });
                    self.cbx_g6.setSelected(false);
                    self._info.g6 = false
                    self.disableComponents(self.input_u6,self.input_c6)
                    return;
                }
                self._info.g6 = true
                self.enableComponents(self.input_u6,self.input_c6)
            },this);

            this.cbx_g6.on(kaayou.CheckEvent.UNSELECTED,function(e:kaayou.CheckEvent){
                self._info.g6 = false;
                self.disableComponents(self.input_u6,self.input_c6)
            },this);

            
            this.input_c1 =  ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "input_c1");
            boxapi.attachTextEdit("input_c1",(val)=>{
                if(val.length===0)
                    val = -1;
                this._info.c1 = +val;

                if(this.cbx_g2.isSelected() && this.check("g2")===false){
                    this.cbx_g2.setSelected(false);
                    this._info.g2 =false;
                }

                if(this.cbx_g3.isSelected() && this.check("g3")===false){
                    this.cbx_g3.setSelected(false);
                    this._info.g3 =false;
                    self.disableComponents(self.input_u3,self.input_c3)
                }

            },{
                type:"float",
                placeholdStr:"点击输入",
                setMaxLength:6,
                fontSize:26,
                allowEmpty:true,
                allowNavi:false
            })

            this.input_u2 =  ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "input_u2");
            boxapi.attachTextEdit("input_u2",(val)=>{
                if(val.length===0)
                    val = -1;
               this._info.u2 = +val
               this.input_ru2.setString(val===-1?"":val);

               if(val==-1){
                   let g2 = this.cbx_g2.isSelected();
                   if(g2===true){
                        boxapi.setValue("input_u3","");
                        this.input_ru3.setString("")
                        this._info.u3 = -1;
                   }
               }

            },{
                type:"float",
                placeholdStr:"点击输入",
                setMaxLength:6,
                fontSize:26,
                allowEmpty:true,
                allowNavi:false
            })

            this.input_u3 =  ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "input_u3");
            boxapi.attachTextEdit("input_u3",(val)=>{
                if(val.length===0)
                    val = -1;
                this._info.u3 = +val
                this.input_ru3.setString(val===-1?"":val);
                if(this.check("u3")===false){
                    let val1 =  boxapi.getValue("input_u2")
                    let g2 = this.cbx_g2.isSelected();

                    if(g2 && val1==""){
                        this._info.u3 = -1;
                        val = "";
                    }else
                        this._info.u3 = +val;
                    boxapi.setValue("input_u3",val===-1?"":val);
                    this.input_ru3.setString(val===-1?"":val);
                }
            },{
                type:"float",
                placeholdStr:"点击输入",
                setMaxLength:6,
                fontSize:26,
                allowEmpty:true,
                allowNavi:false
            })

            this.input_c3 =  ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "input_c3");
            boxapi.attachTextEdit("input_c3",(val)=>{
                if(val.length===0)
                    val = -1;
                this._info.c3 = +val
            },{
                type:"float",
                placeholdStr:"点击输入",
                setMaxLength:6,
                fontSize:26,
                allowEmpty:true,
                allowNavi:false
            })

            this.input_u4 =  ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "input_u4");
            boxapi.attachTextEdit("input_u4",(val)=>{
                if(val.length===0)
                    val = -1;
                this._info.u4 = +val
                this.input_ru4.setString(val===-1?"":val);
                if(this.check("u4")===false){
                    val =  boxapi.getValue("input_u3")
                    if(val==""){
                        this._info.u4 = -1;
                    }else
                        this._info.u4 = +val;
                    boxapi.setValue("input_u4",val===-1?"":val);
                    this.input_ru4.setString(val===-1?"":val);
                }
            },{
                type:"float",
                placeholdStr:"点击输入",
                setMaxLength:6,
                fontSize:26,
                allowEmpty:true,
                allowNavi:false
            })

            this.input_c4 =  ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "input_c4");
            boxapi.attachTextEdit("input_c4",(val)=>{
                if(val.length===0)
                    val = -1;
                this._info.c4 = +val
            },{
                type:"float",
                placeholdStr:"点击输入",
                setMaxLength:6,
                fontSize:26,
                allowEmpty:true,
                allowNavi:false
            })

            this.input_u5 =  ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "input_u5");
            boxapi.attachTextEdit("input_u5",(val)=>{
                if(val.length===0)
                    val = -1;
                this._info.u5 = +val
                this.input_ru5.setString(val===-1?"":val);
                if(this.check("u5")===false){
                    val =  boxapi.getValue("input_u4")
                    if(val==""){
                        this._info.u5 = -1;
                    }else
                        this._info.u5 = +val;
                    boxapi.setValue("input_u5",val===-1?"":val);
                    this.input_ru5.setString(val===-1?"":val);
                }
            },{
                type:"float",
                placeholdStr:"点击输入",
                setMaxLength:6,
                fontSize:26,
                allowEmpty:true,
                allowNavi:false
            })

            this.input_c5 =  ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "input_c5");
            boxapi.attachTextEdit("input_c5",(val)=>{
                if(val.length===0)
                    val = -1;
                this._info.c5 = +val
            },{
                type:"float",
                placeholdStr:"点击输入",
                setMaxLength:6,
                fontSize:26,
                allowEmpty:true,
                allowNavi:false
            })

            this.input_u6 =  ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "input_u6");
            boxapi.attachTextEdit("input_u6",(val)=>{
                if(val.length===0)
                    val = -1;
                this._info.u6 = +val
                if(this.check("u6")===false){
                    val =  boxapi.getValue("input_u6")
                    if(val==""){
                        this._info.u6 = -1;
                    }else
                        this._info.u6 = +val;
                    boxapi.setValue("input_u6",val===-1?"":val);
                }
            },{
                type:"float",
                placeholdStr:"点击输入",
                setMaxLength:6,
                fontSize:26,
                allowEmpty:true,
                allowNavi:false
            })

            this.input_c6 =  ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "input_c6");
            boxapi.attachTextEdit("input_c6",(val)=>{
                if(val.length===0)
                    val = -1;
                this._info.c6 = +val
            },{
                type:"float",
                placeholdStr:"点击输入",
                setMaxLength:6,
                fontSize:26,
                allowEmpty:true,
                allowNavi:false
            })

            this.attachButtonGroup([this.item_pay1,this.item_pay2],{
                data:{item_pay1:false,item_pay2:true},
                cb:function(bool){
                    self._info.aa = bool;
                    if(bool){
                        self.item_low.setVisible(false)
                        self.item_l3.setVisible(false);
                        self.item_l4.setVisible(false);
                        self.item_l5.setVisible(false);
                        self.item_l6.setVisible(false)
                    }else{
                        self.item_low.setVisible(true)
                        self.item_l3.setVisible(true);
                        self.item_l4.setVisible(true);
                        self.item_l5.setVisible(true);
                        self.item_l6.setVisible(true)
                    }
                    
                }
            })


            this.initStatus();
        }



        attachButtonGroup(nodes:Array<ccui.Layout>,attr){
            nodes.forEach((v,i)=>{
                v.on(kaayou.TouchEvent.TouchEnd,()=>{
                    nodes.forEach(vv=>{
                        let box:ccui.CheckBox = <ccui.CheckBox>vv.getChildByName("checkbox")
                        let label:ccui.Text = <ccui.Text>vv.getChildByName("label");
                        label.setColor(cc.color("#93692D"))
                        box.setSelected(false)

                    })
                    let box:ccui.CheckBox = <ccui.CheckBox>v.getChildByName("checkbox")
                    let label:ccui.Text = <ccui.Text>v.getChildByName("label");
                        label.setColor(cc.color("#D33A25"))
                        box.setSelected(true);
                    attr.cb(attr.data[v.name])
                },this)
            })
        }

        disableComponents(...args:Array<ccui.TextField>){
            args.forEach(v=>{
                let n = v.name;
                this.boxapi.setEnable(n,false);
                this.boxapi.setAttribute(n,"fontColor",this.grayFontColor("#B97D55"))
                kaayou.Shader.turnGray(v.getVirtualRenderer())
            })
            
        }

        enableComponents(...args:Array<ccui.TextField>){
            args.forEach(v=>{
                let n = v.name
                this.boxapi.setEnable(n,true);
                this.boxapi.setAttribute(n,"fontColor","#B97D55")
                kaayou.Shader.turnRestore(v.getVirtualRenderer())
            })
        }

        grayFontColor(hash:string){
            //#B97D55
            let str = hash.substr(1);
            let r:any = "0x"+str.substr(0,2);
            let g:any = "0x"+str.substr(2,2);
            let b:any = "0x"+str.substr(4,2);
            r = +r;
            g = +g
            b = +b;
            let c = (r*299 + g*587 + b*114 + 500) / 1000
            c = c | 0
            return `#${c.toString(16)}${c.toString(16)}${c.toString(16)}`
        }


        check(group){

            let su2, su3 , su4 , su5 , su6

            switch(group){
                case "g2":
                case "g3":
                    let sc1 =  this.boxapi.getValue("input_c1")
                    return sc1.length > 0;
                break;
                case "u3":
                    su2 = this.boxapi.getValue("input_u2")
                    su3 = this.boxapi.getValue("input_u3")
                    return su2.length > 0 && su3.length>0 && (+su3)>(+su2)
                break;
                case "u4":
                case "g4":
                    su3 = this.boxapi.getValue("input_u3")
                    su4 = this.boxapi.getValue("input_u4")
                    return su3.length > 0 && su4.length>0 && (+su4)>(+su3)
                break;
                case "u5":
                case "g5":
                    su4 = this.boxapi.getValue("input_u4")
                    su5 = this.boxapi.getValue("input_u5")
                    return su4.length > 0 && su5.length>0 && (+su5)>(+su4)
                break;
                case "u6":
                case "g6":
                    su5 = this.boxapi.getValue("input_u5")
                    su6 = this.boxapi.getValue("input_u6")
                    return su5.length > 0 && su6.length>0 && (+su6)>(+su5)
                break;
            }

            return true;

        }

        initStatus(){
            let box1:ccui.CheckBox = <ccui.CheckBox>this.item_pay1.getChildByName("checkbox")
            let label1:ccui.Text = <ccui.Text>this.item_pay1.getChildByName("label");

            let box2:ccui.CheckBox = <ccui.CheckBox>this.item_pay2.getChildByName("checkbox")
            let label2:ccui.Text = <ccui.Text>this.item_pay2.getChildByName("label");

            let {boxapi} = this;

            box1.setSelected(true)
            box2.setSelected(false);
            label1.setColor(cc.color("#D33A25"))
            label2.setColor(cc.color("#93692D"))
            

            boxapi.setValue("input_c1","");

            this.cbx_g2.setSelected(false);

            boxapi.setValue("input_u2","");

            this.cbx_g3.setSelected(false);
            this.input_ru2.setString("");
            boxapi.setValue("input_u3","");
            boxapi.setValue("input_c3","")

            this.cbx_g4.setSelected(false);
            this.input_ru3.setString("");
            boxapi.setValue("input_u4","");
            boxapi.setValue("input_c4","")

            this.cbx_g5.setSelected(false);
            this.input_ru4.setString("");
            boxapi.setValue("input_u5","");
            boxapi.setValue("input_c5","")

            this.cbx_g6.setSelected(false);
            this.input_ru5.setString("");
            boxapi.setValue("input_u6","");
            boxapi.setValue("input_c6","")

            this.enableComponents(this.input_c3,this.input_u3,this.input_c4,this.input_u4,this.input_c5,this.input_u5,this.input_c6,this.input_u6)
        }

        update(){

            if(!this._info)
                return this.initStatus();

            let {aa, c1, g2, u2, g3, u3, c3, g4, u4, c4, g5, u5, c5, g6, u6, c6} = this._info;

            let box1:ccui.CheckBox = <ccui.CheckBox>this.item_pay1.getChildByName("checkbox")
            let label1:ccui.Text = <ccui.Text>this.item_pay1.getChildByName("label");

            let box2:ccui.CheckBox = <ccui.CheckBox>this.item_pay2.getChildByName("checkbox")
            let label2:ccui.Text = <ccui.Text>this.item_pay2.getChildByName("label");

            let {boxapi} = this;

            let sc1 = c1!==-1

            if(aa===true){
                box2.setSelected(true)
                box1.setSelected(false);
                label2.setColor(cc.color("#D33A25"))
                label1.setColor(cc.color("#93692D"))
            }else{
                box1.setSelected(true)
                box2.setSelected(false);
                label1.setColor(cc.color("#D33A25"))
                label2.setColor(cc.color("#93692D"))
            }

            if(aa){
                this.item_low.setVisible(false)
                this.item_l3.setVisible(false);
                this.item_l4.setVisible(false);
                this.item_l5.setVisible(false);
                this.item_l6.setVisible(false)
            }else{
                this.item_low.setVisible(true)
                this.item_l3.setVisible(true);
                this.item_l4.setVisible(true);
                this.item_l5.setVisible(true);
                this.item_l6.setVisible(true)
            }

            boxapi.setValue("input_c1",c1===-1?"":c1.toString());

            this.cbx_g2.setSelected(sc1 && g2);

            boxapi.setValue("input_u2",(u2===-1)?"":u2.toString());

            this.cbx_g3.setSelected(sc1 && g3);
            this.input_ru2.setString( (u2===-1)?"":u2.toString());
            boxapi.setValue("input_u3",(u3===-1)?"":u3.toString());
            boxapi.setValue("input_c3",(c3===-1)?"":c3.toString())

            if(g3===false || !sc1){
                this.disableComponents(this.input_c3,this.input_u3)
            }

            this.cbx_g4.setSelected(sc1 && g4);
            this.input_ru3.setString((u3===-1)?"":u3.toString());
            boxapi.setValue("input_u4",(u4===-1)?"":u4.toString());
            boxapi.setValue("input_c4",(c4===-1)?"":c4.toString())

            if(g4===false|| !sc1)
                this.disableComponents(this.input_u4,this.input_c4);

            this.cbx_g5.setSelected(sc1 && g5);
            this.input_ru4.setString( (u4===-1)?"":u4.toString());
            boxapi.setValue("input_u5",(u5===-1)?"":u5.toString());
            boxapi.setValue("input_c5",(c5===-1)?"":c5.toString())

            if(g5===false|| !sc1)
                this.disableComponents(this.input_u5,this.input_c5);

            this.cbx_g6.setSelected(sc1 && g6);
            this.input_ru5.setString((u5===-1)?"":u5.toString());
            boxapi.setValue("input_u6",(u6===-1)?"":u6.toString());
            boxapi.setValue("input_c6",(c6===-1)?"":c6.toString())

            if(g6===false|| !sc1)
                this.disableComponents(this.input_u6,this.input_c6);

        }

/*
        housefloorgearpayget:
        客户端请求
        hid    int   茶楼id
        服务器返回
        hid    int   茶楼id
        items   []flooritems   茶楼数组对象
        flooritems   字段说明
        fid     int64   // 楼层id
        aa     bool
        c1     float64

        g2    bool
        u2    float64

        g3  bool
        u3  float64
        c3   float64 

        g4  bool
        u4  float64
        c4   float64 

        g5  bool
        u5  float64
        c5   float64 

        g6  bool
        u6  float64
        c6   float64 
        */
        setInfo(info){
            let _info:IAntiIndulgencPointDialogData  = lodash.pick(info,["fid", "aa", "c1", "g2", "u2", "g3", "u3", "c3", "g4", "u4", "c4", "g5", "u5", "c5", "g6", "u6", "c6"])
            this._info = _info;
            this.update();
            return this;
        }


        setFloor(lv:number){
            this.floor.loadTexture(`TH_Dela_Floor_font${-~lv}.png`, ccui.Widget.PLIST_TEXTURE);
            this.floor.ignoreContentAdaptWithSize(true);
        }

        getInfo(){
            return lodash.clone(this._info);
        }


        initWithNode(node: ccui.Widget) {
            this.node = node.clone();
            this.node.setVisible(true);
            this.node.setPosition(0,0);
            ccui.helper.doLayout(this.node);
        }


        setIndex(index: number) {
            this.index = index;
        }
        getIndex(): number {
            return this.index
        }

    }

}