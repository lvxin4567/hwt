namespace tea {
    var { BindEvent, doBindEvent } = kaayou._decorator;

    export class tea_propotionConfigDialogMgr {
        static __INS__: tea_propotionConfigDialogMgr = null;
        static getInstance(_zOrder: number = 0) {
            if (tea_propotionConfigDialogMgr.__INS__ == null) {
                tea_propotionConfigDialogMgr.__INS__ = new tea_propotionConfigDialogMgr();
                tea_propotionConfigDialogMgr.__INS__.init();
                tea_propotionConfigDialogMgr.__INS__._zOrder = _zOrder
            }
            return tea_propotionConfigDialogMgr.__INS__;
        }
        _zOrder: number = 0
        __selfDialog: PropotionConfigDialog = null

        init() {
            let self = this;
            this.__selfDialog = null;

            kaayou.getController('tea').on('ui::PropotionConfigDialog::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show(e.data);
            }, this, 10);

            kaayou.getController('tea').on('ui::PropotionConfigDialog::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);


            // 茶楼绑定上级/解绑上级推送
            // houseparnterbindsuperior_ntf
            // hid  int   
            // opt int64   // 操作人id
            // parnterid int64 // 被操作的队长id
            // superiorid  int64  // 大于0 就是要绑定的上级id  等于或小于0 则是解绑上级

            kaayou.getController("lobby").on("ws::Msg::houseparnterbindsuperior_ntf",(e:kaayou.Event)=>{
                let {opt,parnterid , superiorid} = e.data;

                let panel = self.getPanel(true);
                let vis = panel.isVisible();

                if(vis){
                    kaayou.emit('common', 'ui::Toast::Show', {
                        msg: `用户(ID:${opt})${superiorid===0?"解除了":"绑定了"}与用户${parnterid}的队长关系`
                    })
                    kaayou.emit("tea",'ui::PropotionConfigDialog::Hide');
                }

                kaayou.emit('teaMem', 'ui::PropotionIncomePanel::reflash')
            },this,10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfDialog == null) {
                this.__selfDialog = new PropotionConfigDialog();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfDialog, this._zOrder);
                this.__selfDialog['onConfigUpdate'] && this.__selfDialog['onConfigUpdate']();
            }
            return this.__selfDialog;
        }

    }

    export class PropotionConfigDialog extends kaayou.Layer {

        constructor() {
            super()
            this.initUI();
        }

        private listNode: ccui.ScrollView = null;
        private closeNode: ccui.Button = null;
        private submitNode: ccui.Button = null;
        // private item: ccui.Widget = null;
        // private admin_item: ccui.Widget = null;
        private item_percent:ccui.Widget = null;
        private admin_item_percent:ccui.Widget = null;
        private customInfo:ccui.Text = null;
        private listArray: Array<PropotionConfigDialogItem> = []
        private btn_history:ccui.Button = null;
        private forAll: boolean = true;
        initUI() {
            this.initWithccs(tea.res.TH_PropotionConfigDialog_json)
            let self = this;
            this.listNode = <ccui.ScrollView>ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "PartnerMemberScrollView");
            this.listNode.setPadding({ left: 15, top: 10, spacingY: 10 });
            this.listNode.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Vertical);
            this.listNode.setVertical(ccui.Layout.LayoutVertical.TOP);

            // this.item = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "prototion_config_item");
            // this.admin_item = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "prototion_admin_config_item");   
            this.item_percent =   ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "prototion_config_item_percent");      
            this.admin_item_percent =   ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "prototion_admin_config_item_percent");      

            this.customInfo = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Text_2");    
            this.customInfo.ignoreContentAdaptWithSize(true);
            this.closeNode = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Close");
            this.submitNode = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "submit");

            this.btn_history = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_history");
            // this.pullConfigList();

            this.closeNode.on(kaayou.TouchEvent.TouchEnd, () => {
                kaayou.emit("tea", "ui::PropotionConfigDialog::Hide")
            }, this)

            this.submitNode.on(kaayou.TouchEvent.TouchEnd, kaayou.TouchMask.clickHandle(() => {
                if(this.isCreator() && this.isjunior===false)
                    self.submitOwnerConfigList();
                else
                    self.submitConfigList();
                    
            },this), this);


            this.btn_history.on(kaayou.TouchEvent.TouchEnd, kaayou.TouchMask.clickHandle(() => {
                kaayou.emit("tea","ui::PropotionConfigChangeDialog::Show" , {uid:this.parnterid,hid:tea.mod.__teaHouseInfo.hid});
            },this),this);

        }


        async  pullSubPartnerConfigList() {
            let hid = tea.mod.__teaHouseInfo.hid;
            let { parnterid } = this;
            let data = await kaayou.sendMessage("lobby", "houseparnterroyaltyget", { hid, parnterid }, "ws::Msg::houseparnterroyaltyget");

            if (data.errcode) {
                kaayou.emit('common', 'ui::Dialog::Show', {
                    msg: data.msg || "获取配置信息失败!"
                })
                return;
            }

            let { royaltys, superiorprofit , distributable , royalty_percent , superior_percent } = data;
            let datas = []

            if (!royaltys)
                royaltys = []

            if (!superiorprofit)
                superiorprofit = []

            if(!distributable)
                distributable = []

            if(!royalty_percent)
                 royalty_percent = []

            if(!superior_percent)
                superior_percent = []

                

            for (var i = 0; i < royalty_percent.length; i++) {
                datas[i] = {
                    royalty_percent: lodash.isNumber(royalty_percent[i])?royalty_percent[i]:-1,
                    superior_percent:lodash.isNumber(superior_percent[i])?superior_percent[i]:-1,
                    royalty:         lodash.isNumber(royaltys[i])?royaltys[i]:-1,
                    superiorprofit:  lodash.isNumber(superiorprofit[i])?superiorprofit[i]:-1,
                    distributable:   lodash.isNumber(distributable[i])?distributable[i]:-1,
                    hid: data.hid,
                    parnterid: data.parnterid
                }
            }

            this.clean();
            
            datas.forEach((it, i) => {
                let initedItem = new PropotionConfigDialogItem(this.item_percent , {isjunior:true});
                initedItem.setInfo(it);
                initedItem.setIndex(i);
                initedItem.node.setPosition(0, 0);
                this.listNode.addChild(initedItem.node);
                this.listArray.push(initedItem)
            })

            this.listNode.doChildrenLayout();
            this.listNode.scrollToTop(0, false);


        }

        async pullConfigList(){
            let hid = tea.mod.__teaHouseInfo.hid;
            let { parnterid } = this;
            let data = await kaayou.sendMessage("lobby", "houseownerroyaltyget", { hid, parnterid }, "ws::Msg::houseownerroyaltyget");

            if (data.errcode) {
                kaayou.emit('common', 'ui::Dialog::Show', {
                    msg: data.msg || "获取配置信息失败!"
                })
                return;
            }

            let { royaltys, junior_profit , single_cost , junior_percent , royalty_percent } = data;
            let datas = []

            if (!royaltys)
                royaltys = []

            if (!junior_profit)
              junior_profit = []

            if(!single_cost )
                single_cost  = []

            if(!junior_percent)
                junior_percent =[]
            
            if(!royalty_percent)
                royalty_percent = []

            for (var i = 0; i < junior_percent.length; i++) {
                datas[i] = {
                    royalty:       lodash.isNumber(royaltys[i])?royaltys[i]:-1,
                    junior_profit: lodash.isNumber(junior_profit[i])?junior_profit[i]:-1,
                    single_cost :  lodash.isNumber(single_cost[i])?single_cost[i]:-1,
                    junior_percent:lodash.isNumber(junior_percent[i])?junior_percent[i]:-1,
                    royalty_percent:lodash.isNumber(royalty_percent[i])?royalty_percent[i]:-1,
                    hid: data.hid,
                    parnterid: data.parnterid
                }
            }


            this.clean();
            
            datas.forEach((it, i) => {
                let initedItem = new PropotionConfigDialogItem(this.admin_item_percent , {isjunior:false});
                initedItem.setAdminInfo(it);
                initedItem.setIndex(i);
                initedItem.node.setPosition(0, 0);
                this.listNode.addChild(initedItem.node);
                this.listArray.push(initedItem)
            })

            this.listNode.doChildrenLayout();
            this.listNode.scrollToTop(0, false);
        }



        private async submitOwnerConfigList() {
            let royalty_percents  = []
            let junior_percents = []


            if (this.listArray.length === 0) {

                kaayou.emit('common', 'ui::Toast::Show', {
                    msg: "当前无可选的楼层"
                })
                this.Hide();
                return;
            }


            
            /*if(this.listArray.some(v=>{
                let {single_cost} =  v.getInfo()
                return single_cost===-1
            })){
                kaayou.emit("common", 'ui::Dialog::Show', {
                    msg: "需要设置时段赛比赛分消耗", btns: [{
                        name: "确定",
                        action: ()=> {
                            this.Hide();
                            kaayou.emit("tea","ui::PropotionPanel::Hide");
                            kaayou.emit('tea', 'ui::AntiIndulgencePanel::Show');
                            setTimeout(() => {
                                kaayou.emit("tea", "ui::AntiIndulgencPointDialog::Show", { display: true });
                            }, 500);
                        }
                    }]
                })
                return ;
            }*/


            let { hid, parnterid } = this.listArray[0].getInfo()
            this.listArray.forEach((v, i) => {
                let { royalty_percent, junior_percent  } = v.getInfo();
                royalty_percents[i] = royalty_percent;
                junior_percents[i] = junior_percent;
            })

            let d = {
                hid,
                parnterid,
                royalty_percent:royalty_percents,
                junior_percent:junior_percents
            }
            let data = await kaayou.sendMessage("lobby", "houseownerroyaltyset", d, "ws::Msg::houseownerroyaltyset");

            if (data.errcode) {
              
                if(data.errcode==218 && this.isCreator()){
                    kaayou.emit("common", 'ui::Dialog::Show', {
                        msg: "需要设置时段赛比赛分消耗", btns: [{
                            name: "确定",
                            action: ()=> {
                                this.Hide();
                                kaayou.emit("tea","ui::PropotionPanel::Hide");
                                kaayou.emit('tea', 'ui::AntiIndulgencePanel::Show');
                                setTimeout(() => {
                                    kaayou.emit("tea", "ui::AntiIndulgencPointDialog::Show", { display: true });
                                }, 500);
                            }
                        }]
                    })

                    return ;
                }
                
                kaayou.emit('common', 'ui::Dialog::Show', {
                    msg: data.msg || "提交失败！"
                })
                return;
            }


            kaayou.emit('common', 'ui::Toast::Show', {
                msg: "提交成功！"
            })
            kaayou.emit("teaMem", 'ui::PropotionIncomePanel::reflash');
            this.Hide();
        }

        private async submitConfigList() {
            let royalty_percents = []
            let superiorprofits = []


            if (this.listArray.length === 0) {

                kaayou.emit('common', 'ui::Toast::Show', {
                    msg: "当前无可选的楼层"
                })
                this.Hide();
                return;
            }


            let { hid, parnterid } = this.listArray[0].getInfo()

            // if(this.listArray.some(v=>{
            //     let {distributable} =  v.getInfo()
            //     return distributable===-1
            // })){
            //     kaayou.emit('common', 'ui::Toast::Show', {
            //         msg: "当前基准比赛分未配置，请联系圈主"
            //     })
            //     return ;
            // }

            this.listArray.forEach((v, i) => {
                let { royalty_percent } = v.getInfo();
                royalty_percents[i] = royalty_percent;
                // superiorprofits[i] = superiorprofit;
            })

            let d = {
                hid,
                parnterid,
                royalty_percent:royalty_percents
                // superiorprofits
            }
            let data = await kaayou.sendMessage("lobby", "houseparnterroyaltyset", d, "ws::Msg::houseparnterroyaltyset");

            if (data.errcode) {
                
                if(data.errcode==218 && this.isCreator()){
                    kaayou.emit("common", 'ui::Dialog::Show', {
                        msg: "需要设置时段赛比赛分消耗", btns: [{
                            name: "确定",
                            action: ()=> {
                                this.Hide();
                                kaayou.emit("tea","ui::PropotionPanel::Hide");
                                kaayou.emit('tea', 'ui::AntiIndulgencePanel::Show');
                                setTimeout(() => {
                                    kaayou.emit("tea", "ui::AntiIndulgencPointDialog::Show", { display: true });
                                }, 500);
                            }
                        }]
                    })

                    return ;
                }

                kaayou.emit('common', 'ui::Dialog::Show', {
                    msg: data.msg || "提交失败！"
                })
                return;
            }


            kaayou.emit('common', 'ui::Toast::Show', {
                msg: "提交成功！"
            })
            kaayou.emit("teaMem", 'ui::PropotionIncomePanel::reflash');
            this.Hide();
        }

        isCreator(){
            return  tea.mod.__teaHouseInfo.urole === HouseMemberRole.OWNER
        }

        clean(){
            this.listArray = [];
            this.listNode.removeAllChildren();
        }

        private parnterid = null;
        private isjunior:boolean;
        Show({ parnterid  , uname , isjunior=true}) {

            this.parnterid = parnterid;
            this.isjunior = isjunior;

            this.setUserLabelInfo({uname,isjunior});
            if(this.isCreator() && isjunior === false){
                this.pullConfigList();
                // this.btn_history.setVisible(false);
            }
            else{
                this.pullSubPartnerConfigList()
            }
            this.setVisible(true);
            kaayou.pop.showAni({
                cNode: this.node.getChildByName("contentPanel"),
                mNode: this.node.getChildByName("maskbg"),
                action: () => {
                    
                 }
            });
        }
        
        private isVitaAdmin(){
            return  tea.mod.__teaHouseInfo.vitamin_admin===true || tea.mod.__teaHouseInfo.urole === HouseMemberRole.CPADMIN;
        }

        
        isOwner() {
            let role = tea.mod.__teaHouseInfo.urole;
            return role === HouseMemberRole.OWNER;
        }


        private setUserLabelInfo({uname , isjunior}){
            this.customInfo.setString(`${uname}(ID:${this.parnterid}的奖励配置)${(this.isOwner() || this.isVitaAdmin() ) && (isjunior===false) && "  (一级)" || "" }`)
        }

        Hide() {
            this.setVisible(false);
            this.clean();
        }
    }


    export class PropotionConfigDialogItem {

        constructor(item: cc.Node, {isjunior}) {
            this.isjunior = isjunior
            this.initUI(item)
        }

        node: cc.Node = null;
        private isjunior:boolean = false;
        private index = -1;
        input_income: cc.Node = null;
        input_shareincome: cc.Node = null;
        private inputCache = {}
        floor: ccui.ImageView = null;
        floor_name:ccui.Text = null;
        hehuo_label:ccui.ImageView = null;
        txt_income:ccui.Text = null;
        txt_my_income:ccui.Text = null;
        txt_single_cost:ccui.Text = null;
        label_percent_sub:ccui.Text = null;
        label_percent_my:ccui.Text = null;
        
        private _info: { royalty: number,distributable:number, superiorprofit: number, hid: number, parnterid: number,junior_profit?:number,single_cost?:number,junior_percent?:number,royalty_percent?:number,superior_percent?:number } = null;

        initUI(item: cc.Node) {
            this.initWithNode(<ccui.Widget>item);


            this.txt_single_cost = <ccui.Text>ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Text_1");
            
            this.floor = <ccui.ImageView>ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "floor");
            this.floor_name = <ccui.Text>ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "floor_name");
            this.label_percent_my = <ccui.Text>ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_percent_my");
            this.label_percent_sub = <ccui.Text>ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_percent_sub");

            if(this.isCreator() && this.isjunior===false){
                this.attachTextEdit("input_global_income", (str) => {

                    if(str.length===0)
                        this._info.junior_percent    = -1;
                    else
                        this._info.junior_percent    = +str;
    
                    let cost = +this._info.single_cost;
                    this.label_percent_sub.setString(`%(${Math.max(0,this.fixNumBug(cost * (+str)/100))})`);

                }, { max: 100 , empty:true ,isInt:true})


                this.attachTextEdit("input_shareincome", (str) => {
                    if(str.length===0)
                        this._info.royalty_percent = -1;
                    else
                        this._info.royalty_percent = +str;

                    let cost = +this._info.single_cost;
                    this.label_percent_my.setString(`%(${Math.max(0 , this.fixNumBug(cost * (+str) / 100) )})`);
                }, { max: 100 , empty:true,isInt:true })
            }else{

                this.attachTextEdit("input_shareincome", (str) => {
                    if(str.length===0)
                        this._info.royalty_percent = -1;
                    else
                        this._info.royalty_percent = +str;
                    let cost = +this._info.distributable;
                    let my = +this.fixNumBug( (+str) /100) 
                    let sub = +this.fixNumBug( ((100-(+str))) /100);
                    let mycost = Math.max(0,this.fixNumBug(cost * my));
                    let subcost = (cost - mycost);
                    this.label_percent_my.setString(`%(${mycost})`);
                    //this.label_percent_sub.setString(`${100-+str}%(${Math.max(0,this.fixNumBug(cost * sub) )})`)
                    this.label_percent_sub.setString(`${100-+str}%(${Math.max(0,this.fixNumBug(subcost) )})`)
                }, { max: 100 , empty:true,isInt:true })

                this.label_percent_sub.ignoreContentAdaptWithSize(false);

            }
            


            
        }

        changePlistImage(node, source){
            node.loadTexture(source, ccui.Widget.PLIST_TEXTURE);
            node.ignoreContentAdaptWithSize(true);
        }

        private attachTextEdit(name, handleInput, attr) {
            let input: cc.Node = <ccui.TextField>ccui.helper.seekWidgetByName(<ccui.Widget>this.node, name);
            let allowEmpty = attr.empty || false;
            let sp = new cc["Scale9Sprite"]();
            let isInt = attr.isInt === true;
            sp.initWithFile(common.res.alpha_4x4, cc.rect(0, 0, 0, 0), cc.rect(0, 0, 0, 0));
            let eb1: any = cc["EditBox"].create(input.getContentSize(), sp);
            eb1.setAnchorPoint(0, 0);
            eb1.setPosition(0, 0);
            eb1.setOpacity(0);
            eb1['setFontSize'](24);
            eb1['setFontColor'](cc.color("#B97D55"));
            eb1['setInputMode'](6);
            eb1['setMaxLength'](6);
            eb1["setPlaceholderFontSize"](22)
            eb1["setPlaceholderFontColor"](cc.color("#B97D55"));

            eb1.setPlaceHolder("请输入")

            eb1['setDelegate'](
                {

                    editBoxTextChanged: function (ref) {
                        let str = ref.getString();
                        // let i = +ref.getString();
                        let other = /[^0-^9^\.]+/
                        let number;

                        if(isInt){
                            number = /^[0-9]+$/
                        }else{
                            number = /(^[0-9]+[\.]{0,1}[0-9]{0,2}$)|(^[0-9]+$)/
                        }
                        
                        let dotCount = (str) => {
                            let dot = str.match(/\./g)
                            return null === dot ? 0 : dot.length;
                        }


                        while (other.test(str) || dotCount(str) > 1 || number.test(str) === false) {
                            str = str.slice(0, str.length - 1);
                            if (str.length === 0)
                                break;
                        }

                        if (dotCount(str) === 0 && attr.max && (allowEmpty && str.length!==0)) {
                            str = Math.min(attr.max, +str).toString();
                        }


                        ref.setString(str)
                    },
                    /**
                     * This method is called when an edit box loses focus after keyboard is hidden.
                     * @param {cc.EditBox} sender
                     */
                    editBoxEditingDidEnd: function (ref) {
                        handleInput(ref.getString())
                    }
                }
            )

            this.inputCache[name] = eb1;
            input.addChild(eb1)

        }

        
        setInfo(info) {
            this._info = lodash.clone(info);
            

            let cost = +this._info.distributable;
            if(cost===-1|| cost===0){
                this.txt_single_cost.setString("--")
                cost = 0;
            }else
                this.txt_single_cost.setString(this._info.distributable.toString())
            
            // this.inputCache["input_global_income"].setString(this._info.superior_percent===-1?"":this._info.superior_percent);
            this.inputCache["input_shareincome"].setString(this._info.royalty_percent===-1?"":this._info.royalty_percent);

            this.label_percent_my.setString(`%(${Math.max(0,this.fixNumBug(cost * this._info.royalty_percent/100) )})`);
            if(this._info.distributable!==-1 && this._info.superior_percent!==-1)
                this.label_percent_sub.setString(`${this._info.superior_percent}%(${Math.max(0, this.fixNumBug(cost * this._info.superior_percent/100))})`);
            else
                this.label_percent_sub.setString("--");
            return this;
        }

        fixNumBug(n){
            return (Math.floor((+n)*100))/100;
            //return +((+n).toFixed(2))
        }

        
        setAdminInfo(info){
            this._info = lodash.clone(info);
            

            let cost = +this._info.single_cost;
            if(cost===-1){
                this.txt_single_cost.setString("--")
                cost = 0;
            }else
                this.txt_single_cost.setString(this._info.single_cost.toString())
            
            this.inputCache["input_global_income"].setString(this._info.junior_percent===-1?"":this._info.junior_percent);
            this.inputCache["input_shareincome"].setString(this._info.royalty_percent===-1?"":this._info.royalty_percent);

            this.label_percent_sub.setString(`%(${Math.max(0, this.fixNumBug(cost * this._info.junior_percent/100))})`);
            this.label_percent_my.setString(`%(${Math.max(0, this.fixNumBug(cost * this._info.royalty_percent/100))})`);
            return this;
        }



        getInfo() {
            return this._info;
        }


        isCreator(){
            return  tea.mod.__teaHouseInfo.urole === HouseMemberRole.OWNER
        }

        initWithNode(node: ccui.Widget) {
            this.node = node.clone();
            this.node.setVisible(true);
            this.node.setPosition(0, 0);
            this.node.setAnchorPoint(0, 0);
            ccui.helper.doLayout(this.node);
        }

        setIndex(index: number) {
            this.index = index;
            this.floor.loadTexture("TH_Dela_Floor_font" + (index + 1) + ".png", ccui.Widget.PLIST_TEXTURE);
            this.floor.ignoreContentAdaptWithSize(true);

            let floors = tea.mod.__teaHouseInfo.floorsMap;
            let fi = Object.keys(floors).map(v=>floors[v]).filter(v=>v.level===index);

            this.floor_name.setString(fi[0].floorItem.name || fi[0].floorItem.kindname);

        }
        getIndex(): number {
            return this.index
        }

    }

}