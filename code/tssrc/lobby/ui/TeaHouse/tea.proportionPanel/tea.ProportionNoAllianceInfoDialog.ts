namespace tea {
    var { BindEvent, doBindEvent } = kaayou._decorator;


    interface Data_NoAllianceInfoItem {
        "uid": number;
        "uname": string;
        "uurl": string;
        "ugender": number;
        "changeprofit": number;
        "bwtimes": number;
    }

    export class tea_proportionNoAllianceInfoDialogMgr {
        static __INS__: tea_proportionNoAllianceInfoDialogMgr = null;
        static getInstance(_zOrder: number = 0) {
            if (tea_proportionNoAllianceInfoDialogMgr.__INS__ == null) {
                tea_proportionNoAllianceInfoDialogMgr.__INS__ = new tea_proportionNoAllianceInfoDialogMgr();
                tea_proportionNoAllianceInfoDialogMgr.__INS__.init();
                tea_proportionNoAllianceInfoDialogMgr.__INS__._zOrder = _zOrder
            }
            return tea_proportionNoAllianceInfoDialogMgr.__INS__;
        }
        _zOrder: number = 0
        __selfDialog: ProportionNoAllianceInfoDialog = null

        init() {
            let self = this;
            this.__selfDialog = null;

            kaayou.getController('tea').on('ui::ProportionNoAllianceInfoDialog::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show(e.data);
            }, this, 10);

            kaayou.getController('tea').on('ui::ProportionNoAllianceInfoDialog::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfDialog == null) {
                this.__selfDialog = new ProportionNoAllianceInfoDialog();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfDialog, this._zOrder);
                this.__selfDialog['onConfigUpdate'] && this.__selfDialog['onConfigUpdate']();
            }
            return this.__selfDialog;
        }

    }

    class ProportionNoAllianceInfoDialog extends kaayou.Layer {

        constructor() {
            super()
            this.initUI();
        }
        iTime: number = 0;
        private listNode: ccui.ScrollView = null;
        private closeNode: ccui.Button = null;
        private item: ccui.Widget = null;
        private SV_pullList: common.PullList = null;

        initUI() {
            this.initWithccs(tea.res.TH_ProportionNoAllianceInfoDialog_json)

            this.listNode = <ccui.ScrollView>((<ccui.Layout>ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "memberlist")).getChildByName("content"));
            this.listNode.setPadding({ left: 10, spacingY: 10, top: 10 });
            this.listNode.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Vertical);
            this.listNode.setVertical(ccui.Layout.LayoutVertical.TOP);
            this.item = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "tea_call_info_item");
            this.closeNode = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_close");
            let self = this;
            this.SV_pullList = new common.PullList()
            this.SV_pullList.setSpacingY(10)
            this.SV_pullList.initWithNode(this.listNode)
            this.SV_pullList.setAdpter({
                getCell: () => {
                    let item = new ProportionNoAllianceInfoDialogItem();
                    item.initUI(self.item);
                    return item;
                },
                datas: []
            });


            this.SV_pullList.on(kaayou.PullListEvent.HeadFinish, (e: kaayou.PullListEvent) => {
                setTimeout(() => {
                    self.pagePrev();
                }, 300);
            }, this);

            this.SV_pullList.on(kaayou.PullListEvent.FootFinish, (e: kaayou.PullListEvent) => {
                setTimeout(() => {
                    self.pageNext();
                }, 300);
            }, this);

            this.closeNode.on(kaayou.TouchEvent.TouchEnd, () => {
                this.Hide();
            }, this)

            this.SV_pullList.initPullEnv();

            this.SV_pullList.setHeadDoingText("上一页")
            this.SV_pullList.setHeadDidFinishText("上一页")
            this.SV_pullList.setFootDidFinishText("下一页")
            this.SV_pullList.setFootDoingText("下一页")
        }


        cleanList() {
            this.SV_pullList.getAdpter().datas = []
            this.SV_pullList.refresh();
        }

        private async query() {
            let self = this;
            let hid = tea.mod.__teaHouseInfo.hid;
            let { partner, daytype, fid, searchkey, PBegin, PEnd } = this;
            let data = await kaayou.sendMessage("lobby", "housenoleaguedetailstatistics", {
                hid, partner, daytype, fid, searchkey, PBegin, PEnd,
                querytimeinterval: mod.__teaHouseInfo.record_time_interval,
                querytimerange: self.iTime + 1
            }, "ws::Msg::housenoleaguedetailstatistics");

            if (data.errcode) {
                kaayou.emit('common', 'ui::Dialog::Show', {
                    msg: data.msg || "获取用户信息失败!"
                })
                return;
            }

            if (!data.items)
                data.items = []


            if (data.items.length == 0) {
                if (this.index !== 0)
                    this.index--;
            } else
                this.SV_pullList.getAdpter().datas = lodash.clone(data.items);



            this.SV_pullList.refresh();


        }

        private pagePrev() {
            const i = this.index = Math.max(0, --this.index);
            this.PBegin = i * this.page;
            this.PEnd = (i + 1) * this.page;
            this.query();
        }


        private pageNext() {
            const i = ++this.index;
            this.PBegin = i * this.page;
            this.PEnd = (i + 1) * this.page;
            this.query();
        }

        private partner = null;
        private daytype = null;
        private fid = null;
        private searchkey = null;
        private PBegin: number = 0;
        private PEnd: number = 0;
        private index: number = 0;
        private page: number = 10;
        Show({ partner, daytype, fid, searchkey }) {
            this.partner = partner;
            this.daytype = daytype;
            this.fid = fid;
            this.searchkey = searchkey;
            this.index = 0;
            this.cleanList();
            this.node.setVisible(true);
            kaayou.pop.showAni({
                cNode: this.node.getChildByName("contentPanel"),
                mNode: this.node.getChildByName("maskbg"),
                action: () => {
                    this.pagePrev()
                }
            });
        }

        Hide() {
            this.node.setVisible(false);
        }
    }
    class ProportionNoAllianceInfoDialogItem extends kaayou.Block implements common.IPullListCell {
        constructor() {
            super();
        }

        node: cc.Node = null;
        private index = -1;
        img_head: ccui.ImageView = null;
        input_income: cc.Node = null;
        input_shareincome: cc.Node = null;

        label_name: ccui.Text = null;
        label_id: ccui.Text = null;
        lbChange: ccui.Text = null;
        lbBigWin: ccui.Text = null;
        initUI(item: cc.Node) {
            super.initWithNode(<ccui.Widget>item);

            this.setAnchorPoint(0, 0);
            this.setPosition(0, 0);
            this.label_name = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_name");
            this.label_id = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_id");
            this.lbChange = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "lbChange");
            this.lbChange.ignoreContentAdaptWithSize(false);
            this.lbBigWin = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "lbBigWin");
            this.lbBigWin.ignoreContentAdaptWithSize(false);
            this.img_head = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "img_head");
        }


        private _info: Data_NoAllianceInfoItem = null;
        setInfo(info: Data_NoAllianceInfoItem) {

            if (lodash.isEmpty(info) || lodash.isNull(info)) {
                return this.reset();
            }

            this._info = lodash.clone(info);
            this.label_name.setString(info.uname)
            this.label_id.setString("ID:" + info.uid)
            this.lbChange.setString((((info.changeprofit / 10) | 0) / 10).toString())
            this.lbBigWin.setString(info.bwtimes.toString())
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

        reset() {
            this.label_name.setString("")
            this.label_id.setString("")
            this.lbChange.setString("")
            this.lbBigWin.setString("")
        }

        setIndex(index: number) {
            this.index = index;
        }
        getIndex(): number {
            return this.index
        }

    }

}