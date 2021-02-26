namespace tea {
    var { BindEvent, doBindEvent } = kaayou._decorator;

    export class tea_AuthPanelMgr {
        static __INS__: tea_AuthPanelMgr = null;
        static getInstance(_zOrder: number = 0) {
            if (tea_AuthPanelMgr.__INS__ == null) {
                tea_AuthPanelMgr.__INS__ = new tea_AuthPanelMgr();
                tea_AuthPanelMgr.__INS__.init();
                tea_AuthPanelMgr.__INS__._zOrder = _zOrder
            }
            return tea_AuthPanelMgr.__INS__;
        }
        _zOrder: number = 0
        __selfDialog: TeaAuthPanel = null

        init() {
            let self = this;
            this.__selfDialog = null;

            kaayou.getController('tea').on('ui::AuthPanel::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show(e.data);
            }, this, 10);

            kaayou.getController('tea').on('ui::AuthPanel::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfDialog == null) {
                this.__selfDialog = new TeaAuthPanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfDialog, this._zOrder);
                this.__selfDialog['onConfigUpdate'] && this.__selfDialog['onConfigUpdate']();
            }
            return this.__selfDialog;
        }

    }

    class TeaAuthPanel extends kaayou.Layer {
        constructor() {
            super()
            this.initUI();
        }

        ivHead: ccui.ImageView = null;
        lbID: ccui.TextField = null;
        lbName: ccui.TextField = null;

        private listNode: ccui.ScrollView = null;
        private btnClose: ccui.Button = null;
        private submitNode: ccui.Button = null;
        private item: ccui.Widget = null;
        private listArray = [];


        initUI() {
            let self = this;
            this.initWithccs(tea.res.AuthPanel_json);
            this.ivHead = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "sp_head");
            this.lbID = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "lbID");
            this.lbName = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "lbName");

            this.listNode = <ccui.ScrollView>(<cc.Node>ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "floorcontent")).getChildByName("content");
            this.listNode.setPadding({ left: 6, spacingY: 20 ,top:15});
            this.listNode.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Vertical);
            this.listNode.setVertical(ccui.Layout.LayoutVertical.TOP);

            this.btnClose = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btnClose");
            this.btnClose.on(kaayou.TouchEvent.TouchEnd, () => {
                self.Hide();
            }, this);
            this.submitNode = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "submit");
            this.item = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "dialog_item");
            this.item.setVisible(false)


            this.submitNode.on(kaayou.TouchEvent.TouchEnd, () => {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                this.submitConfigList();
            }, this)



        }


        // @BindEvent("tea", "ui::TeaAuthPanel::pullConfigList")
        async pullConfigList(data) {
            let hid = tea.mod.__teaHouseInfo.hid;

            let ivTitles = {
                management_user: "res/lobby/TeaHouse/TH_AuthPanel/tapMemberManage.png",
                management_record:"res/lobby/TeaHouse/TH_AuthPanel/tapRecordManage.png",
                management_statistical:"res/lobby/TeaHouse/TH_AuthPanel/tapStatisticsManage.png",
                management_room:"res/lobby/TeaHouse/TH_AuthPanel/tapRoomManage.png",
                management_teahouse:"res/lobby/TeaHouse/TH_AuthPanel/tapTeahouseManage.png"
            }
    
            try{
                data  = JSON.parse(data);
            }catch(e){
                if(typeof data =="string")
                    data = {}
            }

            let order =  ["management_user","management_record","management_statistical","management_room","management_teahouse"]



            lodash.forEach(order,(key)=>{
                let pngTitle = ivTitles[key];
                let val = data[key];
                let subData = parseRenderData(val).filter(v=>v.val>1);
                sortData(subData);
                if(lodash.isEmpty(subData))
                    return ;

                let initedItem = new AuthPanelItem(this.item);
                    initedItem.setFloorImage(pngTitle || "");
                    initedItem.renderData(subData);
                    initedItem.node.setPosition(0,0)
                this.listNode.addChild(initedItem.node);
                this.listArray.push(initedItem)
            })


            this.listNode.doChildrenLayout();
            this.listNode.scrollToTop(0, false);

            this.old_right =  this.listArray.map((v:AuthPanelItem) => v.getValues()).reduce((out,old)=>{
                lodash.extend(out,...old);
                return out;
            },{});



            function parseRenderData(o){
                let keys = Object.keys(o);
                return keys.map(k=>{
                    let {minor_id,minor_key,minor_name,minor_status} =  o[k]
                    return {id:minor_id,key:minor_key,name:minor_name,val:minor_status};
                })
            }

            function sortData(unsortData:Array<any>){
                unsortData.sort(function(a,b){
                    return a.id-b.id;
                })
            }

        }

        private old_right

        // @BindEvent("tea","ui::AntiIndulgencePanelControlDialog::submit")
        private async submitConfigList() {
            let hid = tea.mod.__teaHouseInfo.hid;
            let uid = this._info.uid;

            let update_right =  this.listArray.map((v:AuthPanelItem) => v.getValues()).reduce((out,old)=>{
                lodash.extend(out,...old);
                return out;
            },{});

            let sub = different(this.old_right,update_right);

            for(let key in sub){
                if(sub[key]===tea.mod.House.PERMISSION_TYPE.DISABLE)
                    delete sub[key];
            }

            if(lodash.isEmpty(sub)){
                kaayou.emit('common', 'ui::Toast::Show', {
                    msg: "提交成功！"
                })    
                this.Hide();
                return;
            }

            update_right = JSON.stringify(sub);
            let d = { hid , uid, update_right}
            console.log("HmUpdateUserRight======>", d)
            let data = await kaayou.sendMessage("lobby", "hmupdateuserright", d, "ws::Msg::hmupdateuserright");

            if (data.errcode) {
                kaayou.emit('common', 'ui::Dialog::Show', {
                    msg: data.msg || "提交失败！"
                })
                return;
            }
            let jdata = JSON.parse(data.update_right);
            // let result =  tea.mod.House.ParsePromissionString(jdata);
            // let olddif = tea.mod.House.ParsePromissionString( this._info.right)

            // let updiff = diff(olddif,result);

            this.clean();
            this.pullConfigList(jdata)            

            kaayou.emit('common', 'ui::Toast::Show', {
                msg: "提交成功！"
            })

            //刷新配置状态
            // kaayou.emit("tea", "mod::TeaHouse::GetAntiIndulgence", { hid: tea.mod.__teaHouseInfo.hid });

            this.Hide();

            // function diff(t1,t2){
            //     let out = {}
            //     Object.keys(t1).forEach(v=>{
            //       let tm1 = t1[v].minor_status;
            //       let tm2 = t2[v].minor_status;
            //       if(tm1!==tm2){
            //         out[v] = tm2
            //       }
            //     })
            //     return out;
            // }

            function different(t1,t2){
                let out = {}
                Object.keys(t1).forEach(v=>{
                  let tm1 = t1[v];
                  let tm2 = t2[v]
                  if(tm1!==tm2){
                    out[v] = tm2
                  }
                })
                return out;
              }

        }

        private _info;

        clean(){
            this.listNode.removeAllChildren();
            this.listArray.splice(0, this.listArray.length)
        }

        Show(data) {
            this.clean();
            this.pullConfigList(data.right);
            NetImage.setPlayerHead(this.ivHead, data.uurl, data.ugender);
            this.lbID.setString("ID:" + data.uid);
            this.lbName.setString(data.uname);
            this.node.setVisible(true);
            this._info = data;
            kaayou.pop.showAni({
                cNode: this.node.getChildByName("contentPanel"),
                mNode: this.node.getChildByName("maskbg"),
                action: () => {
                    // this.recoverSnap();
                }
            });
        }

        Hide() {
            kaayou.pop.hideAni({
                cNode: this.node.getChildByName("contentPanel"),
                mNode: this.node.getChildByName("maskbg"),
                rnode: this.node
            })
        }
    }


    class AuthPanelItem {

        constructor(item: cc.Node) {
            this.initUI(item)
        }

        node: cc.Node = null;
        private index = -1;

        private lySmall: cc.Node = null;
        private lycontainer:ccui.Layout;
        private lyBig: ccui.Layout = null;
        spBig: cc.Sprite = null;
        private _dataArray:Array<{key:string,value:number}>=[]
        private initUI(item: cc.Node) {
            this.initWithNode(<ccui.Widget>item);

            this.lyBig = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "lyBig");
            this.spBig = new cc.Sprite();
            this.lyBig.addChild(this.spBig);
            this.spBig.x = this.lyBig.width / 2;
            this.spBig.y = this.lyBig.height / 2;

            this.lySmall = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "lySmall");
            this.lycontainer = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "lycontainer");

            this.lySmall.setVisible(false);
            
        }



        setFloorImage(pngTitle: string) {
            this.spBig.initWithFile(pngTitle||"");
        }

        initWithNode(node: ccui.Widget) {
            this.node = node.clone();
            this.node.setVisible(true);
            this.node.setPosition(0, 0);
            ccui.helper.doLayout(this.node);
        }

        renderData(data:Array<{key:string,name:string,val:number}>){
            let dx=233.75,
                iy = 50,
                dy=20,
                rowN=Math.ceil(data.length/4);

            let rr = 1;

            let height = (rowN-1)*dy + iy*rowN;

            this.node.height =  this.lycontainer.height = height;
            
            this.lyBig.y = height;

            data = data.filter(v=>v.val>=2)

            lodash.forEach(data,(v,i)=>{
                let ii;

                let data = {key:v.key,value:v.val}

                if(i%4==0 && i!=0){
                    rr++;
                }

                ii = i%4;
                
                let cbx = (<ccui.Widget>this.lySmall).clone();
                    cbx.setAnchorPoint(0,0);
                let label = <ccui.Text>ccui.helper.seekWidgetByName(cbx,"lbSmall");
                    cbx.setVisible(true);
                    cbx.x = ii*dx;
                    cbx.y = height - ((rr-1) * iy + dy * (rr-1))+iy/2-5;
                    label.setString(v.name);
                    
                let checkbox = <ccui.CheckBox>ccui.helper.seekWidgetByName(cbx,"cbSmall");
                cbx.on(kaayou.TouchEvent.TouchEnd,()=>{
                    kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                        checkbox.setSelected(!checkbox.isSelected())
                        data.value = checkbox.isSelected()?tea.mod.House.PERMISSION_TYPE.ESCALATION:tea.mod.House.PERMISSION_TYPE.UNESCALATION;
                },this);

                
                    checkbox.setSelected(v.val===tea.mod.House.PERMISSION_TYPE.ESCALATION);
                
                if(v.val===tea.mod.House.PERMISSION_TYPE.DISABLE){
                    this.disableComponent(cbx)
                }

                this.lycontainer.addChild(cbx);
                this._dataArray.push(data);
                
            })
            this.lycontainer.y = -70;

        }

        disableComponent(node:ccui.Widget){
            let label = <ccui.Text>ccui.helper.seekWidgetByName(node,"lbSmall");
            let checkbox = <ccui.CheckBox>ccui.helper.seekWidgetByName(node,"cbSmall");
            node.setTouchEnabled(false)
            checkbox.setSelected(false);
            checkbox.setEnabled(false);
            kaayou.Shader.turnGray(label.getVirtualRenderer());
        }

        cleanup(){
            this.lycontainer.removeAllChildren();
        }

        getValues(){
            return this._dataArray.slice(0).map(v=>{
                let out = {}
                return (out[v.key] = v.value,out);
            })
        }

        appendTo(parent: cc.Node, index, list?) {
            parent.addChild(this.node);
            this.setIndex(index)
        }

        setIndex(index: number) {
            this.index = index;
        }

        getIndex(): number {
            return this.index
        }
    }
}