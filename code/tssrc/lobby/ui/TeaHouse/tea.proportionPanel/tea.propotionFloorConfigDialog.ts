//低分局设置
namespace tea {
    var { BindEvent, doBindEvent } = kaayou._decorator;
    class propotionFloorConfigCell extends kaayou.Block implements common.IPullListCell {
        constructor() {
            super();
        }

        input_lower: ccui.TextField = null;
        //input_higher: cc.Node = null;

        img_floor: ccui.ImageView = null;
        _index: number = -1;
        setIndex(index) {
            this._index = index;
        }
        getIndex() {
            return this._index;
        }

        isVitaAdmin(){
            return tea.mod.__teaHouseInfo.vitamin_admin === true  || tea.mod.__teaHouseInfo.urole === HouseMemberRole.CPADMIN;
        }

        private boxApi;
        initWithNode(node: ccui.Widget) {
            super.initWithNode(node);
            this.boxApi = kaayou.editBox.target(this.node);
            this.input_lower = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "input_lower");
            //this.input_higher = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "input_higher");
            this.img_floor = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "img_floor");

            this.boxApi.attachTextEdit("input_lower",(val)=>{
                let num = Number(val);

                if(this._data.score === num)
                    return ;

                this._data.score = num;
            },{
                type:"int",
                placeholdStr:"点击输入",
                setMaxLength:4,
                fontSize:24,
                allowEmpty:true
            })

            if(this.isVitaAdmin()){
                this.freeze();
            }

        }


        initStatus(){
            this.boxApi.setValue("input_lower","");
        }

        freeze(){
            this.boxApi.setAllEnable(false);
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

        _data: HouseDaleFloorSetItem = null;
        setInfo(data: HouseDaleFloorSetItem, index) {
            
            if (lodash.isEmpty(data)) {
                this.initStatus();
                return;
            }
            this._data = lodash.clone(data);
            let {score} = this._data;
            //this.edits["input_lower"].setString(score);
            
            // if(score===-2){
            //     this.boxApi.setValue("input_lower","");
            //     this.boxApi.setEnable("input_lower",false);
            //     this.boxApi.setAttribute("input_lower","fontColor",this.grayFontColor("#B97D55"))
            //     kaayou.Shader.turnGray(this.input_lower.getVirtualRenderer())
            // }else 
            if(score===-1 || score===-2)
                this.boxApi.setValue("input_lower","");
            else
                this.boxApi.setValue("input_lower",score);

            this.img_floor.loadTexture("TH_Dela_Floor_font" + index + ".png", ccui.Widget.PLIST_TEXTURE);
            this.img_floor.ignoreContentAdaptWithSize(true);
        }
        getInfo(){
            return this._data;
        }

        unuse() {
            this._data = null;
            this.removeFromParent();
        }

    }

    export class tea_propotionFloorConfigDialogMgr {
        static __INS__: tea_propotionFloorConfigDialogMgr = null;
        static getInstance(_zOrder: number = 0) {
            if (tea_propotionFloorConfigDialogMgr.__INS__ == null) {
                tea_propotionFloorConfigDialogMgr.__INS__ = new tea_propotionFloorConfigDialogMgr();
                tea_propotionFloorConfigDialogMgr.__INS__.init();
                tea_propotionFloorConfigDialogMgr.__INS__._zOrder = _zOrder
            }
            return tea_propotionFloorConfigDialogMgr.__INS__;
        }
        _zOrder: number = 0
        __selfDialog: propotionFloorConfigDialog = null

        init() {
            let self = this;
            this.__selfDialog = null;

            kaayou.getController('tea').on('ui::propotionFloorConfigDialog::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show();
            }, this, 10);

            kaayou.getController('tea').on('ui::propotionFloorConfigDialog::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfDialog == null) {
                this.__selfDialog = new propotionFloorConfigDialog();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfDialog, this._zOrder);
                this.__selfDialog['onConfigUpdate'] && this.__selfDialog['onConfigUpdate']();
            }
            return this.__selfDialog;
        }

    }

  
    class propotionFloorConfigDialog  extends kaayou.Layer{

        constructor(){
            super();
            this.initUI()
        }

        delafloor_cell: ccui.Layout = null;
        scrollDetail_list: ccui.ScrollView = null; //
        btn_submit: ccui.Button = null;
        // subDataArr: Array<{ bigscore: number, fid: number, score: number }> = null;
        btn_close: ccui.Button = null;
        node:cc.Node = null
        noPartner_text:ccui.Text = null;
        txt_invalid_round:ccui.Text = null;
        label_invalid_round:ccui.Text = null;
        initUI() {
            this.initWithccs(tea.res.TH_Propotion_FloorConfig_Dialog_json);
            this.delafloor_cell = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "tea_call_partner_config");
            this.noPartner_text = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "noPartner_text");
            this.noPartner_text.setVisible(false);
            this.txt_invalid_round = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "txt_invalid_round");
            this.txt_invalid_round.setString("0");
            this.label_invalid_round = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_invalid_round");
            this.scrollDetail_list = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "PartnerMemberScrollView");
            this.scrollDetail_list.setPadding({ left: 15, spacingY: 10 });
            this.scrollDetail_list.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Vertical);
            this.scrollDetail_list.setVertical(ccui.Layout.LayoutVertical.TOP);
            this.scrollDetail_list.setScrollBarEnabled(false);
            this.btn_submit = <ccui.Button>ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "submit");
            this.btn_close = <ccui.Button>ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Close"); 

            this.btn_close.on(kaayou.TouchEvent.TouchEnd,()=>{
                this.Hide();
            },this)

            this.btn_submit.on(kaayou.TouchEvent.TouchEnd,kaayou.TouchMask.clickHandle(()=>{
                this.submit();
            },this),this)

            let self = this;
            kaayou.getController('tea').on('ui::Dale::updateFloorDaleList', function (e: kaayou.Event) {
                
                self.scrollDetail_list.removeAllChildren();

                if(e.data)
                    self.txt_invalid_round.setString(e.data.invalidround);

                // self.subDataArr = [];
                if (!e.data || !e.data.items || e.data.items.length===0) {
                    self.noPartner_text.setVisible(true);
                    return;
                }
                self.noPartner_text.setVisible(false);
                for (var x in e.data.items) {
                    let cell = self.createCell();
                    self.scrollDetail_list.addChild(cell);
                    cell.setIndex(x);
                    cell.setTag(Number(x));
                    cell.setInfo(e.data.items[x], (Number(x) + 1));
                }
                self.scrollDetail_list.doChildrenLayout();
                self.scrollDetail_list.scrollToTop(0, false);
            }, this, 10);
        }

        private submit(){
            let subDataArr = this.scrollDetail_list.getChildren().map((v:propotionFloorConfigCell)=>{
                let info = v.getInfo()
                return lodash.pick(info,["fid","score"]);
            })
            
            kaayou.emit("tea", "mod::TeaHouse::GetHouseDaleSettingScroe", subDataArr)
            
        }

        _index = -1;

        setIndex(index) {
            this._index = index;
            return this;
        }

        getIndex() {
            return this._index;
        }


        Show(){
            this.node.setVisible(true);
            if (tea.mod._isPartner() ||  tea.mod._isViceCaptain()) {
                this.label_invalid_round.setVisible(false);
                this.txt_invalid_round.setVisible(false);
            }else{
                this.label_invalid_round.setVisible(true);
                this.txt_invalid_round.setVisible(true);
            }
            kaayou.pop.showAni({
                cNode: this.node.getChildByName("contentPanel"),
                mNode: this.node.getChildByName("maskbg"),
                action: () => { 
                    this.pullList();
                }
            });
        }

        Hide(){
            this.node.setVisible(false);
        }

        private pullList(){
            kaayou.emit("tea", "mod::TeaHouse::GetHouseDaleSetting");
        }

        private createCell(): propotionFloorConfigCell {
            let cell = new propotionFloorConfigCell();
            cell.initWithNode(this.delafloor_cell);
            cell.setAnchorPoint(0, 0);
            cell.setPositionY(0);
            cell.setPositionX(0);
            cell.setVisible(true);
            return cell;
        }

    }
}