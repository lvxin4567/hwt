namespace tea {
    var { BindEvent, doBindEvent } = kaayou._decorator;

    // var substrWithEmoji = function (str, start, end) {
    //     var i = start;
    //     i = i < 0 ? 0 : i
    //     var char;

    //     let betweenEmoji = function (char) {
    //         if (between(char, 0x1F601, 0x1F64F) ||
    //             between(char, 0x1F680, 0x1F6C0) ||
    //             between(char, 0x1F170, 0x1F251) ||
    //             between(char, 0x1F600, 0x1F636) ||
    //             between(char, 0x1F681, 0x1F6C5) ||
    //             between(char, 0x1F30D, 0x1F567) ||
    //             between(char, 0x1F300, 0x1F5FF)) {
    //             return true
    //         }
    //         return false
    //         function between(cur, start, end) {
    //             return cur >= start && cur <= end;
    //         }
    //     }


    //     if (start >= end)
    //         return "";

    //     char = str.codePointAt(Math.max(i - 1, 0))

    //     if (betweenEmoji(char))
    //         start = Math.max(start - 1, 0)

    //     while ((char = str.codePointAt(i))) {
    //         if (betweenEmoji(char)) {
    //             end = end + 1;
    //         }
    //         i++
    //         if (i >= end)
    //             break;
    //     }

    //     return str.substring(start, end)
    // }

    export class tea_AddMemberDialogMgr {
        static __INS__: tea_AddMemberDialogMgr = null;
        static getInstance(zOrder: number) {
            if (tea_AddMemberDialogMgr.__INS__ == null) {
                tea_AddMemberDialogMgr.__INS__ = new tea_AddMemberDialogMgr();
                tea_AddMemberDialogMgr.__INS__.zOrder = zOrder;
                tea_AddMemberDialogMgr.__INS__.init();
            }
            return tea_AddMemberDialogMgr.__INS__;
        }
        zOrder: number = null;
        __selfPanel: addMemberDialog = null;
        init() {
            let self = this;
            this.__selfPanel = null;

            kaayou.getController('tea').on('mod::addMemberPanel::show', function (e: kaayou.Event) {
                self.getPanel(true).Show()
            }, this);

            kaayou.getController('tea').on('mod::addMemberPanel::hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new addMemberDialog();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel, this.zOrder);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }

    }

    export class addMemberDialog extends kaayou.Layer {
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
        private texteditor = null;
        initUI() {
            this.initWithccs(res.TH_AddMemberPanel_json);
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
                kaayou.emit("tea", "ui::TeaHouse::userMemberAddPanelReflash");
            }, this)

            let self = this;
            /*this.searchNode.addEventListener(function (ref: ccui.TextField, type) {
                if (ccui.TextField.EVENT_INSERT_TEXT == type || ccui.TextField.EVENT_DELETE_BACKWARD == type) {
                    let gstr = ref.getString();
                    this.searchText.setString(gstr.length === 0 ? this.PHText : gstr);
                }
            }, this)
            */

            this.searchText.setVisible(false);
            this.texteditor = kaayou.editBox.target(this.node);

            this.texteditor.attachTextEdit("search_edit",()=>{

            },{placeholdStr:this.PHText,fontColor:"#FFFFFF"})

            this.searchBtn.on(kaayou.TouchEvent.TouchEnd, () => {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                let str = this.texteditor.getValue("search_edit")
                this.search(str)
            }, this);

            this.prevBtn.on(kaayou.TouchEvent.TouchEnd, () => {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                if (this._index === 1) {
                    this.prevBtn.setEnabled(false)
                }

                this._index = Math.max(this._index - 1, 0)
                this.prevNum.setString((this._index + 1).toString())
                this.nextBtn.setEnabled(true)
                this.pullList(this._index)
            }, this)

            this.nextBtn.on(kaayou.TouchEvent.TouchEnd, () => {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                if (this._index === (this.pageN - 2)) {
                    this.nextBtn.setEnabled(false)
                }
                this._index = Math.min(this._index + 1, this.pageN)
                this.prevBtn.setEnabled(true)
                this.prevNum.setString((this._index + 1).toString())
                this.pullList(this._index)
            }, this)

            // this.initList()

        }

        private async initInput() {
            this.texteditor.setValue("search_edit","")
        }

        private setPageNum(totalnum){
            const less = totalnum % 10;
            let pgN = (totalnum / 10) | 0;
            this.pageN = pgN = less?(pgN+1):pgN;
            if(this.pageN==0)
                pgN = 1;

            this.nextNum.setString(pgN.toString())
        }

        private async initList(){
            const count:number = await this.getUserCount();
            this.setPageNum(count)
            this.nextBtn.setEnabled(true);

            if (this.pageN < 2) {
                this.prevBtn.setEnabled(false);
                this.nextBtn.setEnabled(false);
            }

            this._index = 0;
            this.prevNum.setString("1")
            this.prevBtn.setEnabled(false);
            this.pullList(this._index);
        }

        private async pullList(pindex, start?: number, end?: number, search?: string) {
            let hid = tea.mod.__teaHouseInfo.hid;
            let sub: {
                "hid": number,
                "param": string,
                "pbeg": number,
                "pend": number,
                "role": number
            } = {
                hid,
                role: 2,
                param: search && search.toString() || "",
                pbeg: (start) ? start : (pindex * 10),
                pend: (end) ? end : ((pindex + 1) * 10 - 1)
            }

            let data = await kaayou.sendMessage("lobby", "housepartneraddlist", sub, "ws::Msg::housepartneraddlist")

            if (data.errcode) {
                kaayou.emit('common', 'ui::Dialog::Show', {
                    msg: data.msg || "获取用户信息失败!"
                })
                return;
            }
            this.memberList.removeAllChildren();
            this.renderList(data)
            this.setPageNum(data.totalnum);
        }

        private async getUserCount() {
            let hid = tea.mod.__teaHouseInfo.hid;
            let data = await kaayou.sendMessage("lobby", "housepartneraddlist", { hid, role: 2, param: "", pbeg: 0, pend: 0 }, "ws::Msg::housepartneraddlist")

            if (data.errcode) {
                kaayou.emit('common', 'ui::Toast::Show', {
                    msg: data.msg || "获取用户信息失败!"
                })
                return -1;
            }

            return data.totalnum;
        }

        private renderList(info) {
            let item: Array<{ urole: number, "uid": number, "uname": string, upartner: number, "uurl": string }> = info.hmemitems
            item.forEach(v => {
                let it = new addMemberDialogItem(this.cloneNode)
                it.setInfo(v);
                it.node.setPosition(0, 5)
                this.memberList.addChild(it.node);
            })

            this.memberList.doChildrenLayout();
            this.memberList.scrollToTop(0, false);
        }

        private async search(str) {
            this.pullList(0, 0, 100, str);
        }

        // @BindEvent("tea","mod::addMemberPanel::show")
        Show() {
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

        @BindEvent("tea", "mod::addMemberPanel::hide")
        Hide() {
            //lw190918关闭时回到第一页
            this._index = 0;
            this.prevNum.setString("1");
            this.node.setVisible(false);
        }

    }


    class addMemberDialogItem {


        constructor(item: cc.Node) {
            this.initWithNode(item)
            this.initUI()
        }

        node: cc.Node = null;
        private img_head: ccui.ImageView = null;
        private label_name: ccui.Text = null;
        private label_id: ccui.Text = null;
        private btn_allow: ccui.Button = null;
        private uid = null;
        initUI() {
            this.img_head = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "img_head");
            this.label_name = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_name");
            this.label_id = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_id");
            this.btn_allow = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_allow");

            //应该是快捷添加
            this.btn_allow.on(kaayou.TouchEvent.TouchEnd, () => {

                // kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);

                // let options = {
                //     msg: "是否要添加该用户为您的队长",
                //     btns: [
                //         {
                //             name: "确定",
                //             action: function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit("tea", 'mod::TeaHouse::setPartner', {
                    hid: tea.mod.__teaHouseInfo.hid, uid: this.uid, grant: true, success: () => {
                        this.btn_allow.setEnabled(false);
                    }
                });



                //             },
                //             colorType: 'green'
                //         },
                //         {
                //             name: "取消",
                //             colorType: 'blue',
                //             action: function () {
                //                 kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                //             }
                //         }
                //     ]
                // }

                // kaayou.emit("common", "ui::Dialog::Show", options);

            }, this)

        }



        /**
         type HouseMember struct {
  Id          int64  `json:"id"`              //! id
  DHId        int64  `json:"dhid"`            //! 茶楼id
  FId         int64  `json:"fid"`             //! 历史楼层id
  UId         int64  `json:"uid"`             //! 玩家id
  UVitamin    int64  `json:"uvitamin"`        //! 疲劳值
  URole       int    `json:"urole"`           //! 玩家角色
  URemark     string `json:"uremark"`         //! 玩家备注
  ApplyTime   int64  `json:"apply_time"`      //! 申请时间
  AgreeTime   int64  `json:"agree_time"`      //! 进入时间
  BwTimes     int    `json:"bw_times"`        //! 大赢家次数
  PlayTimes   int    `json:"play_times"`      //! 对局次数
  Forbid      int    `json:"forbid"`          //! 0正常娱乐1禁止娱乐
  Partner     int64  `json:"partner"`         //! 队长 0否 非0为uid
  Partner_oid int64  `json:"partner_open_id"` //! 队长绑定微信ID
  IsLimitGame bool   `json:"is_limit_game"`   //是否被限制游戏
  IsOnline    bool   `json:"is_online"`       //是否在线
  HId         int    `json:"hid"`             // 茶楼id
  Modified    bool   `json:"modified"`        // 是否修改过
}

         */

        setInfo(info: { urole: number, "uid": number, "uname": string, upartner: number, "uurl": string }) {
            this.uid = info.uid
            // this.img_head.loadTexture(info.uurl , ccui.Widget.LOCAL_TEXTURE);
            NetImage.setPlayerHead(this.img_head, info.uurl);
            this.img_head.setSize(cc.size(64, 64));
            this.img_head.ignoreContentAdaptWithSize(false)
            this.label_id.setString("ID:" + info.uid);
            //lw190909暂时还是用原来的，处理了中英文两种情况
            //this.label_name.setString(substrWithEmoji(info.uname,0,6));
            this.label_name.setString(kaayou.Identify.nickNameSubSix(info.uname));
            if (info.upartner !== 0) {
                this.btn_allow.setEnabled(false)
            }

            if (info.urole === 0) {
                this.btn_allow.setVisible(false);
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