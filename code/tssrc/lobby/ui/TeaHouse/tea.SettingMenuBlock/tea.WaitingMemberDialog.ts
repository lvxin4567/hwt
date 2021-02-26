namespace tea {
    var { BindEvent, doBindEvent } = kaayou._decorator;

    export class tea_WaitingMemberDialogMgr {
        static __INS__: tea_WaitingMemberDialogMgr = null;
        static getInstance(_zOrder: number = 0) {
            if (tea_WaitingMemberDialogMgr.__INS__ == null) {
                tea_WaitingMemberDialogMgr.__INS__ = new tea_WaitingMemberDialogMgr();
                tea_WaitingMemberDialogMgr.__INS__.init();
                tea_WaitingMemberDialogMgr.__INS__._zOrder = _zOrder
            }
            return tea_WaitingMemberDialogMgr.__INS__;
        }
        _zOrder: number = 0
        __selfDialog: WaitingMemberDialog = null

        init() {
            let self = this;
            this.__selfDialog = null;

            kaayou.getController('tea').on('ui::WaitingMemberDialog::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show();
            }, this, 10);

            kaayou.getController('tea').on('ui::WaitingMemberDialog::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfDialog == null) {
                this.__selfDialog = new WaitingMemberDialog();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfDialog, this._zOrder);
                this.__selfDialog['onConfigUpdate'] && this.__selfDialog['onConfigUpdate']();
            }
            return this.__selfDialog;
        }

    }

    export class WaitingMemberDialog extends kaayou.Layer {

        constructor() {
            super()
            this.initUI();
        }

        private listNode: ccui.ScrollView = null;
        private closeNode: ccui.Button = null;
        private submitNode: ccui.Button = null;
        private item:cc.Node = null;
        private listArray: Array<WaitingMemberDialogItem> = []

        initUI() {
            this.initWithccs(tea.res.TH_WaitingMember_json)
            let self = this;

            this.item = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "th_waiting_distance_item");
            this.closeNode  = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_close");
            this.submitNode = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "submit");
            this.listNode = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "content");
            // this.pullConfigList();

            this.listNode.setPadding({ left: -12, top: 10, spacingY: 10 });
            this.listNode.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Vertical);
            this.listNode.setVertical(ccui.Layout.LayoutVertical.TOP);

            this.closeNode.on(kaayou.TouchEvent.TouchEnd, () => {
                kaayou.emit("tea", "ui::WaitingMemberDialog::Hide")
            }, this)

            this.submitNode.on(kaayou.TouchEvent.TouchEnd, kaayou.TouchMask.clickHandle(() => {
                    self.submitConfigList();
            },this), this);

        }

        /**
         * 茶楼楼层修改等待人数 
housefloorwaitnumset
hid    int  
floors_map   object  {fid:num} {123:99, 234: 99}

茶楼楼层修改等待人数 
housefloorwaitnumget
hid    int  
 服务器返回：
housefloorwaitnumget
hid    int  
floors_map   object  {fid:num} {123:99, 234: 99}
         * 
         */

        async pullConfigList(){
            let hid = tea.mod.__teaHouseInfo.hid;
            let data = await kaayou.sendMessage("lobby", "housefloorwaitnumget", { hid}, "ws::Msg::housefloorwaitnumget");

            this.listArray = [];
            this.listNode.removeAllChildren();

            if (data.errcode) {
                kaayou.emit('common', 'ui::Dialog::Show', {
                    msg: data.msg || "获取配置信息失败!"
                })
                return;
            }

            //data.floors_map
            let map = tea.mod.__teaHouseInfo.floorsMap
            let objs = Object.keys(map).map(v=>({floor:map[v].level,fid:v}));
                objs = objs.sort((v,v1)=>((v.floor)-(v1.floor)));

            objs.forEach( (v:any)=>{
                v.hc = data.floors_map[v.fid];
            })                
            
            objs.forEach((v:any)=>{
                let item = new WaitingMemberDialogItem(this.item);
                item.setIndex(v.floor);
                item.setInfo(v);
                this.listArray.push(item);
                item.node.x = 8;
                this.listNode.addChild(item.node);
            })

            this.listNode.doChildrenLayout();
            this.listNode.scrollToTop(0, false);
        }


        private async submitConfigList() {

            if (this.listArray.length === 0) {
                kaayou.emit('common', 'ui::Toast::Show', {
                    msg: "当前无可选的楼层"
                })
                this.Hide();
                return;
            }


            let hid = tea.mod.__teaHouseInfo.hid;

            let d = {hid , floors_map:{}}

            this.listArray.forEach(v => {
                let info = v.getInfo()
                d.floors_map[info.fid] = info.hc;
            })



            let data = await kaayou.sendMessage("lobby", "housefloorwaitnumset", d, "ws::Msg::housefloorwaitnumset");

            if (data.errcode) {
                kaayou.emit('common', 'ui::Dialog::Show', {
                    msg: data.msg || "提交失败！"
                })
                return;
            }

            kaayou.emit('common', 'ui::Toast::Show', {
                msg: "提交成功！"
            })
            this.Hide();
        }

        isCreator(){
            return  tea.mod.__teaHouseInfo.urole === HouseMemberRole.OWNER
        }

        Show() {
            this.pullConfigList();
            this.setVisible(true);
            kaayou.pop.showAni({
                cNode: this.node.getChildByName("contentPanel"),
                mNode: this.node.getChildByName("maskbg"),
                action: () => { }
            });
        }

        Hide() {
            this.setVisible(false);
        }
    }


    export class WaitingMemberDialogItem {

        constructor(item: cc.Node) {
            this.initUI(item)
        }

        node: cc.Node = null;
        
        private index = -1;
        
        private inputCache = {}
        private floor:ccui.ImageView = null;
        private _info:{hc,fid,floor} = {hc:0,fid:0,floor:-1};
        initUI(item: cc.Node) {
            this.initWithNode(<ccui.Widget>item);
            this.floor = <ccui.ImageView>ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "floor");

            this.attachTextEdit("input_memberHC",(str)=>{
                let num = +str;
                if(num<4 || num>99){
                    this._info.hc = 0;
                    this.inputCache["input_memberHC"].setString("")
                }else
                    this._info.hc = num;
                
            },{min:0,max:99,isInt:true})

        }

        private attachTextEdit(name, handleInput, attr) {
            let input: cc.Node = <ccui.TextField>ccui.helper.seekWidgetByName(<ccui.Widget>this.node, name);
            let sp = new cc["Scale9Sprite"]();

            let {min = 0,max = 99 ,isInt = false} = attr;

            sp.initWithFile(common.res.alpha_4x4, cc.rect(0, 0, 0, 0), cc.rect(0, 0, 0, 0));
            let eb1: any = cc["EditBox"].create(input.getContentSize(), sp);
            eb1.setAnchorPoint(0, 0);
            eb1.setPosition(0, 0);
            eb1.setOpacity(0);
            eb1['setFontSize'](24);
            eb1['setFontColor'](cc.color("#B97D55"));
            eb1['setInputMode'](6);
            eb1['setMaxLength'](6);
            eb1["setPlaceholderFontSize"](26)
            eb1["setPlaceholderFontColor"](cc.color("#B97D55"));

            eb1.setPlaceHolder("请输入4-99")

            eb1['setDelegate'](
                {

                    editBoxTextChanged: function (ref) {
                        let str = ref.getString();
                        // let i = +ref.getString();
                        let other = /[^0-^9^\.]+/

                        let number;

                        if(isInt===false)
                            number = /(^[0-9]+[\.]{0,1}[0-9]{0,2}$)|(^[0-9]$)/
                        else
                            number = /^[0-9]+$/;

                        let dotCount = (str) => {
                            let dot = str.match(/\./g)
                            return null === dot ? 0 : dot.length;
                        }


                        while (other.test(str) || dotCount(str) > 1 || number.test(str) === false) {
                            str = str.slice(0, str.length - 1);
                            if (str.length === 0)
                                break;
                        }

                        str =(Math.min(max, Math.max(min, +str) )).toString()

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

        flush(){
            let {hc} = this._info
            if(hc>3)
                this.inputCache["input_memberHC"].setString(hc)
            else 
            this.inputCache["input_memberHC"].setString("")
        }

        setInfo({fid,hc,floor}){
            this._info.fid = fid;
            this._info.hc = hc;
            this._info.floor = floor;
            this.flush();
        }

        getInfo() {
            return this._info;
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
        }
        getIndex(): number {
            return this.index
        }

    }

}