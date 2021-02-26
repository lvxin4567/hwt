namespace tea {
    var { BindEvent, doBindEvent } = kaayou._decorator;


    interface Data_HouseSubPartnerStatItem {
        "uid": number;
        "uname": string;
        "uurl": string;
        "ugender": number,
        "validtimes": number,//有效局
        "bigvalidtimes": number,//超级有效局
        "roundprofit": number,//单局收益
        "subordinateprofit": number,//下级收益
        "totalprofit": number//总收益 
        "royalty": number//设置值
        "partner_deep":number
        "superior":number
    }

    export class tea_proportionInfoDialogMgr {
        static __INS__: tea_proportionInfoDialogMgr = null;
        static getInstance(_zOrder: number = 0) {
            if (tea_proportionInfoDialogMgr.__INS__ == null) {
                tea_proportionInfoDialogMgr.__INS__ = new tea_proportionInfoDialogMgr();
                tea_proportionInfoDialogMgr.__INS__.init();
                tea_proportionInfoDialogMgr.__INS__._zOrder = _zOrder
            }
            return tea_proportionInfoDialogMgr.__INS__;
        }
        _zOrder: number = 0
        __selfDialog: ProportionInfoDialog = null

        init() {
            let self = this;
            this.__selfDialog = null;

            kaayou.getController('tea').on('ui::ProportionInfoDialog::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show(e.data);
            }, this, 10);

            kaayou.getController('tea').on('ui::ProportionInfoDialog::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfDialog == null) {
                this.__selfDialog = new ProportionInfoDialog();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfDialog, this._zOrder);
                this.__selfDialog['onConfigUpdate'] && this.__selfDialog['onConfigUpdate']();
            }
            return this.__selfDialog;
        }

    }

    export class ProportionInfoDialog extends kaayou.Layer {

        constructor() {
            super()
            this.initUI();
        }

        private listNode: ccui.ScrollView = null;
        private closeNode: ccui.Button = null;
        private item: ccui.Widget = null;

        initUI() {
            this.initWithccs(tea.res.TH_ProportionInfoDialog_json)

            this.listNode = <ccui.ScrollView>((<ccui.Layout>ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "memberlist")).getChildByName("content"));
            this.listNode.setPadding({ left: 10, spacingY: 10, top: 10 });
            this.listNode.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Vertical);
            this.listNode.setVertical(ccui.Layout.LayoutVertical.TOP);
            this.item = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "tea_call_info_item");
            this.closeNode = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_close");

            // this.pullConfigList();

            this.closeNode.on(kaayou.TouchEvent.TouchEnd, () => {
                this.Hide();
            }, this)


        }


        async pullConfigList() {
            let hid = tea.mod.__teaHouseInfo.hid;
            let { parnterid, daytype, fidindex } = this;
            let data = await kaayou.sendMessage("lobby", "houseparnterfloormemstatistics", { hid, parnterid, daytype, fidindex }, "ws::Msg::houseparnterfloormemstatistics");

            if (data.errcode) {
                kaayou.emit('common', 'ui::Dialog::Show', {
                    msg: data.msg || "获取用户信息失败!"
                })
                return;
            }

            if (!data.items)
                data.items = []

            this.listNode.removeAllChildren();

            data.items.forEach((it, i) => {
                let initedItem = new ProportionInfoDialogItem(this.item);
                initedItem.setInfo(it);
                initedItem.setIndex(i);
                initedItem.node.setPosition(0, 0);
                this.listNode.addChild(initedItem.node);
            })

            this.listNode.doChildrenLayout();
            this.listNode.scrollToTop(0, false);


        }

        private parnterid = null;
        private daytype = null;
        private fidindex = null;
        Show({ parnterid, daytype, fidindex }) {

            this.parnterid = parnterid;
            this.daytype = daytype;
            this.fidindex = fidindex;
            this.pullConfigList()
            this.node.setVisible(true);
            kaayou.pop.showAni({
                cNode: this.node.getChildByName("contentPanel"),
                mNode: this.node.getChildByName("maskbg"),
                action: () => { }
            });
        }

        Hide() {
            this.node.setVisible(false);
        }
    }


    export class ProportionInfoDialogItem {

        constructor(item: cc.Node) {
            this.initUI(item)
        }

        node: cc.Node = null;
        private index = -1;
        img_head: ccui.ImageView = null;
        input_income: cc.Node = null;
        input_shareincome: cc.Node = null;

        label_name: ccui.Text = null;
        label_id: ccui.Text = null;
        label_totalprofit: ccui.Text = null;
        label_validtimes: ccui.Text = null;
        label_partner_deep :ccui.Text = null;
        label_superior:ccui.Text = null;

        initUI(item: cc.Node) {
            this.initWithNode(<ccui.Widget>item);
            this.label_name = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_name");
            this.label_id = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_id");
            this.label_totalprofit = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "lbSuper");
            this.label_totalprofit.ignoreContentAdaptWithSize(false);
            this.label_validtimes = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "lbSuper_0");
            this.label_validtimes.ignoreContentAdaptWithSize(false);
            this.img_head = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "img_head");
            this.label_partner_deep =  ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "lab_plevel");
            this.label_superior =  ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "lab_uplevel");
        }


        private _info: Data_HouseSubPartnerStatItem = null;
        setInfo(info: Data_HouseSubPartnerStatItem) {
            this._info = lodash.clone(info);
            this.label_name.setString(info.uname)
            this.label_id.setString("ID:" + info.uid)
            this.label_totalprofit.setString((((info.totalprofit / 10) | 0) / 10).toString())
            this.label_validtimes.setString(info.validtimes.toString())
            this.label_partner_deep.setString(info.partner_deep===0?"无":info.partner_deep.toString());
            this.label_superior.setString(info.superior===0?"无":("ID:"+info.superior));
            NetImage.setPlayerHead(this.img_head, this._info.uurl, this._info.ugender, (url) => {
                if (!this._info) { return false; }
                if (url !== this._info.uurl) {
                    return false;
                }
                return true;
            });
            return this;
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
        }
        getIndex(): number {
            return this.index
        }

    }

}