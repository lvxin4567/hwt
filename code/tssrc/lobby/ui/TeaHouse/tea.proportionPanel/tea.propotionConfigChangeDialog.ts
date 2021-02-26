namespace tea {
    var { BindEvent, doBindEvent } = kaayou._decorator;


    interface Data_PropotionConfigChangeItem {
        "createdat": number
        "optfloorindex": number
        "optfloorname": string
        "optinfo": string
        "optusertype": string
    }

    export class tea_propotionConfigChangeDialogMgr {
        static __INS__: tea_propotionConfigChangeDialogMgr = null;
        static getInstance(_zOrder: number = 0) {
            if (tea_propotionConfigChangeDialogMgr.__INS__ == null) {
                tea_propotionConfigChangeDialogMgr.__INS__ = new tea_propotionConfigChangeDialogMgr();
                tea_propotionConfigChangeDialogMgr.__INS__.init();
                tea_propotionConfigChangeDialogMgr.__INS__._zOrder = _zOrder
            }
            return tea_propotionConfigChangeDialogMgr.__INS__;
        }
        _zOrder: number = 0
        __selfDialog: PropotionConfigChangeDialog = null

        init() {
            let self = this;
            this.__selfDialog = null;

            kaayou.getController('tea').on('ui::PropotionConfigChangeDialog::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show(e.data);
            }, this, 10);

            kaayou.getController('tea').on('ui::PropotionConfigChangeDialog::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfDialog == null) {
                this.__selfDialog = new PropotionConfigChangeDialog();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfDialog, this._zOrder);
                this.__selfDialog['onConfigUpdate'] && this.__selfDialog['onConfigUpdate']();
            }
            return this.__selfDialog;
        }

    }

    export class PropotionConfigChangeDialog extends kaayou.Layer {

        constructor() {
            super()
            this.initUI();
        }

        private listNode: ccui.ScrollView = null;
        private closeNode: ccui.Button = null;
        private item: ccui.Widget = null;
        private SV_pullList: common.PullList = null;
        private label_player_name: ccui.Text = null;
        private label_player_id: ccui.Text = null;
        private uid: number = null;
        initUI() {
            this.initWithccs(tea.res.TH_PropotionConfigChangeDialog_json)

            this.listNode = <ccui.ScrollView>((<ccui.Layout>ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "memberlist")).getChildByName("content"));
            this.item = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "tea_history_info_item");
            this.closeNode = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_close");

            this.label_player_name = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_player_name");
            this.label_player_id = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_player_id");

            this.SV_pullList = new common.PullList()

            this.SV_pullList.setSpacingY(10)
            this.SV_pullList.initWithNode(this.listNode)

            this.SV_pullList.setAdpter({
                getCell: () => {
                    let item = new PropotionConfigChangeItem();
                    item.initUI(this.item);
                    return item;
                },
                datas: []
            });

            this.SV_pullList.initPullEnv();


            let self = this;

            this.SV_pullList.on(kaayou.PullListEvent.HeadFinish, (e: kaayou.PullListEvent) => {
                setTimeout(() => {
                    this.pullConfigList({ uid: this.uid })
                }, 500);

            }, this);
            this.SV_pullList.on(kaayou.PullListEvent.FootFinish, (e: kaayou.PullListEvent) => {
                setTimeout(() => {
                    this.pullConfigList({ uid: this.uid })
                }, 500);
            }, this);

            this.closeNode.on(kaayou.TouchEvent.TouchEnd, () => {
                this.Hide();
            }, this)
        }

        cleanList() {
            this.SV_pullList.getAdpter().datas = []
            this.SV_pullList.refresh();
        }

        async pullConfigList({ uid }) {
            let hid = tea.mod.__teaHouseInfo.hid;
            let data = await kaayou.sendMessage("lobby", "houseparnterroyaltyhistory", { hid, uid }, "ws::Msg::houseparnterroyaltyhistory");

            if (data.errcode) {
                kaayou.emit('common', 'ui::Dialog::Show', {
                    msg: data.msg || "获取用户信息失败!"
                })
                return;
            }

            if (!data.item)
                data.item = []

            this.label_player_name.setString(data.name);
            this.label_player_id.setString(`ID:${uid}`);

            this.SV_pullList.getAdpter().datas = lodash.clone(data.item);
            this.SV_pullList.refresh();

        }

        Show(data) {
            this.uid = data.uid;
            this.node.setVisible(true);
            this.cleanList()
            kaayou.pop.showAni({
                cNode: this.node.getChildByName("contentPanel"),
                mNode: this.node.getChildByName("maskbg"),
                action: () => {
                    this.pullConfigList(data);
                }
            });
        }

        Hide() {
            this.node.setVisible(false);
        }
    }


    export class PropotionConfigChangeItem extends kaayou.Block implements common.IPullListCell {
        node: cc.Node = null;
        private index = -1;

        label_time: ccui.Text = null;
        label_op_user: ccui.Text = null;
        lable_op_floor: ccui.Text = null;
        label_op_floorname: ccui.Text = null
        label_op_result: ccui.Text = null

        initUI(item: cc.Node) {
            super.initWithNode(<ccui.Widget>item);
            this.label_time = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_time");
            this.label_time.ignoreContentAdaptWithSize(false);
            this.label_op_user = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_op_user");
            this.lable_op_floor = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "lable_op_floor");
            this.label_op_floorname = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_op_floorname");
            this.label_op_result = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_op_result");
            this.label_op_result.ignoreContentAdaptWithSize(false);
        }


        reset() {
            this._info = null;
            this.label_op_floorname.setString("");
            this.label_time.setString("");
            this.lable_op_floor.setString("")
            this.label_op_user.setString("");
            this.label_op_result.setString("");
        }

        private _info: Data_PropotionConfigChangeItem = null;
        setInfo(info: Data_PropotionConfigChangeItem) {

            if (lodash.isEmpty(info) || lodash.isNull(info)) {
                return this.reset();
            }

            this.label_op_floorname.setString(info.optfloorname);
            this.label_time.setString(this.timeformat(info.createdat));
            this.lable_op_floor.setString(this.floorFormat(info.optfloorindex) + "楼")
            this.label_op_user.setString(info.optusertype);
            this.label_op_result.setString(info.optinfo);
            this._info = info;
        }

        timeformat(time) {
            let date = new Date(time * 1000);
            let y = fixNum(date.getFullYear());
            let m = fixNum(date.getMonth() + 1);
            let d = fixNum(date.getDate());
            let h = fixNum(date.getHours());
            let mi = fixNum(date.getMinutes());
            let s = fixNum(date.getSeconds());
            return `${y.substr(2, 2)}/${m}/${d} ${h}:${mi}`

            function fixNum(n) {
                if (n.toString().length == 1)
                    return "0" + n
                return n.toString();
            }
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

        getInfo() {
            return this._info;
        }

        // initWithNode(node: ccui.Widget) {
        //     this.node = node.clone();
        //     this.node.setVisible(true);
        //     this.node.setPosition(0, 0);
        //     this.node.setAnchorPoint(0, 0);
        //     ccui.helper.doLayout(this.node);
        // }

        setIndex(index: number) {
            this.index = index;
        }
        getIndex(): number {
            return this.index
        }

    }

}