namespace tea {
    var { BindEvent, doBindEvent } = kaayou._decorator;




    export class tea_ProportionBindDialogMgr {
        static __INS__: tea_ProportionBindDialogMgr = null;
        static getInstance(zOrder: number) {
            if (tea_ProportionBindDialogMgr.__INS__ == null) {
                tea_ProportionBindDialogMgr.__INS__ = new tea_ProportionBindDialogMgr();
                tea_ProportionBindDialogMgr.__INS__.zOrder = zOrder;
                tea_ProportionBindDialogMgr.__INS__.init();
            }
            return tea_ProportionBindDialogMgr.__INS__;
        }
        zOrder: number = null;
        __selfPanel: ProportionBindDialog = null;
        init() {
            let self = this;
            this.__selfPanel = null;

            kaayou.getController('tea').on('mod::ProportionBindDialog::show', function (e: kaayou.Event) {
                self.getPanel(true).Show(e.data)
            }, this);

            kaayou.getController('tea').on('mod::ProportionBindDialog::hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new ProportionBindDialog();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel, this.zOrder);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }

    }

    export class ProportionBindDialog extends kaayou.Layer {
        constructor() {
            super()
            this.initUI();
        }

        private searchNode: ccui.TextField = null;
        private searchBtn: ccui.Button = null;
        private searchText: ccui.Text = null;
        private memberList: ccui.ScrollView = null
        private cloneNode: cc.Node = null;
        private prevBtn: ccui.Button = null;
        private prevNum: ccui.Text = null;;
        private nextBtn: ccui.Button = null;
        private nextNum: ccui.Text = null;;
        private PHText = "请输入昵称或者ID"
        private _index = 0;
        private pageN = 0;  //一共多少页
        private searchStr = ""
        private texteditor = null;
        initUI() {
            this.initWithccs(res.TH_ProportionBindDialog_json);
            this.searchNode = <ccui.TextField>ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "search_edit");
            this.searchBtn = <ccui.Button>ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "search_btn");
            this.searchText = <ccui.Text>ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "search_label");
            this.memberList = <ccui.ScrollView>(<cc.Node>ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "memberlist")).getChildByName("content")

            this.memberList.setPadding({ left: 4, spacingY: 5 });
            this.memberList.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Vertical);
            this.memberList.setVertical(ccui.Layout.LayoutVertical.TOP);

            let paging = <cc.Node>ccui.helper.seekWidgetByName(<ccui.Widget>this.node , "paging");
            this.prevBtn = ccui.helper.seekWidgetByName(<ccui.Widget>paging , "left_page");
            this.prevNum = ccui.helper.seekWidgetByName(<ccui.Widget>paging , "left_num");
            this.prevNum.ignoreContentAdaptWithSize(true);
            this.nextBtn = ccui.helper.seekWidgetByName(<ccui.Widget>paging , "right_page");
            this.nextNum = ccui.helper.seekWidgetByName(<ccui.Widget>paging , "right_num");
            this.cloneNode = <cc.Node>ccui.helper.seekWidgetByName(<ccui.Widget>this.node , "member_cell")
            this.cloneNode.setVisible(false)

            let close = <ccui.Button>ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_close");
            close.on(kaayou.TouchEvent.TouchEnd, () => {
                this.Hide()
                // kaayou.emit("tea", "ui::TeaHouse::userMemberAddPanelReflash");
            }, this)

           /* let self = this;
            this.searchNode.addEventListener(function (ref: ccui.TextField, type) {
                let gstr = ref.getString();
                if (ccui.TextField.EVENT_INSERT_TEXT == type || ccui.TextField.EVENT_DELETE_BACKWARD == type) {
                    this.searchText.setString(gstr.length === 0 ? this.PHText : gstr);
                }else if(ccui.TextField.EVENT_DETACH_WITH_IME===type)
                {
                    if(gstr.length === 0)
                        self.search("");
                }
            }, this)
*/

            this.searchText.setVisible(false);
            this.texteditor = kaayou.editBox.target(this.node);

            this.texteditor.attachTextEdit("search_edit",()=>{

            },{placeholdStr:this.PHText,fontColor:"#FFFFFF"})


            this.searchBtn.on(kaayou.TouchEvent.TouchEnd,
                kaayou.TouchMask.clickHandle( () => {
                    kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                    let str = this.texteditor.getValue("search_edit")
                    this._index = 0;
                    this.prevNum.setString("1");
                    this.search(str)
                },this)
            , this);

            this.prevBtn.on(kaayou.TouchEvent.TouchEnd,kaayou.TouchMask.clickHandle( () => {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                this._index = Math.max(this._index - 1, 0)
                this.prevNum.setString((this._index + 1).toString())
                this.pullList(this._index,this.searchStr)
            },this), this)

            this.nextBtn.on(kaayou.TouchEvent.TouchEnd,kaayou.TouchMask.clickHandle( () => {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                this._index = Math.min(this._index+1, this.pageN-1)
                this.prevNum.setString((this._index + 1).toString())
                this.pullList(this._index,this.searchStr)
            },this), this)


            kaayou.getController("tea").on("ui::tea::reflashList" , ()=>{
                this.pullList(this._index);
            },this)

            // this.initList()

        }

        private async initInput() {
            this.texteditor.setValue("search_edit","")
        }

        private setPageNum(totalnum){
            this.pageN = totalnum
            if (totalnum < 2) {
                this.prevBtn.setEnabled(false);
                this.nextBtn.setEnabled(false);
            }else if(this._index >= (this.pageN - 1)) {
                this.nextBtn.setEnabled(false)
                this.prevBtn.setEnabled(true)
            }else if(this._index===0){
                this.nextBtn.setEnabled(true)
                this.prevBtn.setEnabled(false)
            }else if(this._index < (this.pageN-1) && this._index > 0) {
                this.nextBtn.setEnabled(true)
                this.prevBtn.setEnabled(true)
            }

            this.nextNum.setString(this.pageN.toString())
        }

        private initList(){
            this.pullList(this._index);
            this.nextBtn.setEnabled(true);
            this._index = 0;
            this.prevNum.setString("1")
            this.prevBtn.setEnabled(false);
            
        }

        private parnterid = 0;
        private async pullList(pindex, search?: string) {
            let hid = tea.mod.__teaHouseInfo.hid;

            let sub: {
                "hid": number,
                "parnterid": number,
                "searchkey":string,
                page:number
            } = {
                hid,
                parnterid:this.parnterid,
                searchkey: search && search.toString() || "",
                page:pindex
            }

            let data = await kaayou.sendMessage("lobby", "houseparntersuperiorlist", sub, "ws::Msg::houseparntersuperiorlist")

            if (data.errcode) {
                kaayou.emit('common', 'ui::Dialog::Show', {
                    msg: data.msg || "获取用户信息失败!"
                })
                return;
            }
            
            this.memberList.removeAllChildren();

            if(!data.items)
                data.items=[]
            


            this.setPageNum(data.totalpage);
            this.renderList(data)
            
        }


        private renderList(info) {
            let item:Array<any> = info.items
            let mapedItem = item.map(v=>{
                v.superiorid = info.superiorid;
                v.parnterid = this.parnterid;
                return v;
            })
            mapedItem.forEach(v => {
                let it:any = new ProportionBindDialogItem(this.cloneNode)
                it.setInfo(v);
                it.node.setPosition(0, 5)
                this.memberList.addChild(it.node);
            })

            this.memberList.doChildrenLayout();
            this.memberList.scrollToTop(0, false);
        }

        private async search(str) {
            this.pullList(0, str);
            this.searchStr = str;
        }

        
        Show({parnterid}) {
            this.parnterid = parnterid
            this.initList();
            this.initInput();
            this.node.setVisible(true)
            kaayou.pop.showAni({
                cNode: this.node.getChildByName("contentPanel"),
                mNode: this.node.getChildByName("maskbg"),
                action: function () {

                }
            });
        }

        Hide() {
            //lw190918关闭时回到第一页
            this._index = 0;
            this.prevNum.setString("1");
            this.node.setVisible(false);
        }

    }


    class ProportionBindDialogItem {


        constructor(item: cc.Node) {
            this.initWithNode(item)
            this.initUI()
        }

        node: cc.Node = null;
        private img_head: ccui.ImageView = null;
        private label_name: ccui.Text = null;
        private label_id: ccui.Text = null;
        private btn_allow: ccui.Button = null;
        private btn_denied:ccui.Button = null;
        
        initUI() {
            this.img_head = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "img_head");
            this.label_name = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_name");
            this.label_id = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_id");
            this.btn_allow = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_allow");
            this.btn_denied = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_denied");
            //应该是快捷添加
            this.btn_allow.on(kaayou.TouchEvent.TouchEnd, () => {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                this.bindUpPartner();
            }, this)

            this.btn_denied.on(kaayou.TouchEvent.TouchEnd, () => {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                this.unbindPartner();
            },this);

        }




        private async bindUpPartner(){
            let {superiorid ,parnterid} = this;
            let subInfo = {superiorid , parnterid , hid:tea.mod.__teaHouseInfo.hid}
            let data = await kaayou.sendMessage("lobby", "houseparnterbindsuperior", subInfo, "ws::Msg::houseparnterbindsuperior")
            if(data.errcode){
                kaayou.emit('common', 'ui::Toast::Show', {
                    msg: data.msg || "操作失败!"
                })
                return ;
            }

            kaayou.emit('common', 'ui::Toast::Show', {
                msg:  "操作成功!"
            })

            kaayou.emit("tea","ui::tea::reflashList");

        }

        private  async unbindPartner(){
            let {parnterid} = this;
            let subInfo = {superiorid:0 , parnterid , hid:tea.mod.__teaHouseInfo.hid}
            let data = await kaayou.sendMessage("lobby", "houseparnterbindsuperior", subInfo, "ws::Msg::houseparnterbindsuperior")
            if(data.errcode){
                kaayou.emit('common', 'ui::Toast::Show', {
                    msg: data.msg || "操作失败!"
                })
                return ;
            }

            kaayou.emit('common', 'ui::Toast::Show', {
                msg:  "操作成功!"
            })

            kaayou.emit("tea","ui::tea::reflashList");
        }

        

        /*

        superiorid:number
        "uid":1000005,
        "uname":"nickname",
        "uurl":"headurl",
        "ugender":1,

         */

        private superiorid = null;
        private parnterid = null;
        setInfo(info: { "uid": number, "uname": string, ugender: number, "uurl": string , superiorid:number , parnterid:number}) {

            this.superiorid = info.uid;
            this.parnterid = info.parnterid;

            NetImage.setPlayerHead(this.img_head, info.uurl, info.ugender, (url) => {
                if (!info) { return false; }
                if (url !== info.uurl) {
                    return false;
                }
                return true;
            });

            this.img_head.setSize(cc.size(64, 64));
            this.img_head.ignoreContentAdaptWithSize(false)
            this.label_id.setString("ID:" + info.uid);
            //lw190909暂时还是用原来的，处理了中英文两种情况
            this.label_name.setString(kaayou.Identify.nickNameSubSix(info.uname));

            this.btn_allow.setVisible(true)
            this.btn_denied.setVisible(false);

            if(info.superiorid===0){
                this.btn_allow.setEnabled(true);
                this.btn_denied.setVisible(false);
            }else{
                this.btn_allow.setEnabled(false);
            }

            if(info.superiorid===info.uid){
                this.btn_allow.setVisible(false);
                this.btn_denied.setVisible(true);
            }

        }

        initWithNode(node: cc.Node) {
            this.node = (<ccui.Widget>node).clone();
            this.node.setVisible(true);
            this.node.setAnchorPoint(0, 0);
            this.node.setPosition(0, 0);
            ccui.helper.doLayout(this.node);
        }

    }

}