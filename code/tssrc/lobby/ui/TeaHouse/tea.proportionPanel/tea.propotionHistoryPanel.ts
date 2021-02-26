namespace tea {

    //全部数字除100

    export class tea_PropotionHistoryPanelMgr {
        static __INS__: tea_PropotionHistoryPanelMgr = null;
        static getInstance(_zOrder: number = 0) {
            if (tea_PropotionHistoryPanelMgr.__INS__ == null) {
                tea_PropotionHistoryPanelMgr.__INS__ = new tea_PropotionHistoryPanelMgr();
                tea_PropotionHistoryPanelMgr.__INS__.init();
                tea_PropotionHistoryPanelMgr.__INS__._zOrder = _zOrder
            }
            return tea_PropotionHistoryPanelMgr.__INS__;
        }
        _zOrder: number = 0
        __selfDialog: PropotionHistoryPanel = null
        __selfNode = null;


        init() {
            let self = this;
            this.__selfDialog = null;

            kaayou.getController('tea').on('ui::PropotionHistoryPanel::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show(e.data);
            }, this, 10);

            kaayou.getController('tea').on('ui::PropotionHistoryPanel::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);

            return true;
        }

        setNode(node: cc.Node) {
            this.__selfNode = node;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfDialog == null) {
                this.__selfDialog = new PropotionHistoryPanel();
                this.__selfDialog.initWithNode(this.__selfNode)
            }
            return this.__selfDialog;
        }

    }

    export class PropotionHistoryPanel {


        private _page: ccui.Layout = null;
        private btn_close: ccui.Button = null;
        private titleFont: ccui.TextBMFont = null;
        private table_head: ccui.Layout = null;
        private history_record: ccui.ScrollView = null;
        // tea_cell_mode:ccui.Layout = null;
        cellMod: ccui.Layout = null;
        SV_pullList: ccui.ScrollView = null;
        headLayout: ccui.Layout = null;
        initWithNode(pagePartner: ccui.Layout) {
            let self = this;

            pagePartner.setPosition(0, 0);
            this._page = pagePartner;

            let top_bar: ccui.Widget = ccui.helper.seekWidgetByName(<ccui.Widget>this._page, "top_bar");

            this.btn_close = ccui.helper.seekWidgetByName(<ccui.Widget>top_bar, "btn_close");
            this.titleFont = ccui.helper.seekWidgetByName(<ccui.Widget>top_bar, "titleFont");
            this.titleFont.setString("历史删除");
            this.table_head = ccui.helper.seekWidgetByName(<ccui.Widget>this._page, "table_head");
            this.cellMod = ccui.helper.seekWidgetByName(<ccui.Widget>pagePartner.getParent(), "tea_cell_history_0");
            this.headLayout = ccui.helper.seekWidgetByName(<ccui.Widget>this._page, "table_head");
            this.headLayout.setPadding({ spacingX: 0, right: 0 });
            this.headLayout.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Horizontal);
            this.headLayout.setHorizontal(ccui.Layout.LayoutHorizontal.LEFT);
            this.headLayout.doChildrenLayout();
            this.btn_close.on(kaayou.TouchEvent.TouchEnd, () => {
                this.Hide();
            }, this)
            this.SV_pullList = ccui.helper.seekWidgetByName(<ccui.Widget>this._page, "history_record");
            this.SV_pullList.setPadding({ spacingY: 10, top: 5 });
            this.SV_pullList.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Vertical);
            this.SV_pullList.setVertical(ccui.Layout.LayoutVertical.TOP);
            this.SV_pullList.setScrollBarEnabled(false);
        }


        private createCell(): PartnerHistoryCell {
            let cell = kaayou.pool.getFromPool(PartnerHistoryCell);
            if (!cell) {
                cell = new PartnerHistoryCell();
                cell.initWithNode(this.cellMod);
            }

            cell.setAnchorPoint(0, 0);
            cell.setPositionY(0);
            cell.setPositionX(0);
            cell.setVisible(true);
            return cell;
        }


        isPartner() {
            return tea.mod.__teaHouseInfo.urole === HouseMemberRole.CAPTAIN;
        }

        isOwner() {
            return tea.mod.__teaHouseInfo.urole === HouseMemberRole.OWNER;
        }

        isVitaAdmin(){
            return  tea.mod.__teaHouseInfo.vitamin_admin===true || tea.mod.__teaHouseInfo.urole === HouseMemberRole.CPADMIN;
        }

        Show(data) {
            kaayou.pool.putAllChildrenInPool(this.SV_pullList);
            this.SV_pullList.removeAllChildren();
            if (this.isOwner() || this.isVitaAdmin()) {
                this.headLayout.setPadding({ left: 0, spacingX: 0 });
            } else {
                this.headLayout.getChildren()[6].setVisible(false);
                this.headLayout.setPadding({ left: 0, spacingX: 30 });
            }
            this.headLayout.doChildrenLayout();
            for (let k in data.items) {
                let cell = this.createCell();
                cell.setInfo(data.items[k]);
                this.SV_pullList.addChild(cell);
            }
            this.SV_pullList.doChildrenLayout();
            this._page.setVisible(true);
            this.SV_pullList.scrollToTop(0,false);
            
            
            
        }

        Hide() {
            console.log("关闭了删除");
            // kaayou.pool.putAllChildrenInPool(this.SV_pullList);
            // this.SV_pullList.removeAllChildren();
            this._page.setVisible(false);
        }

    }

    class PartnerHistoryCell extends kaayou.Block implements common.IPullListCell {

        label_floor: ccui.Text = null
        label_total: ccui.Text = null
        label_valid_game: ccui.Text = null
        label_single_game: ccui.Text = null
        label_partner: ccui.Text = null
        label_del_time: ccui.Text = null
        btn_detail: ccui.Button = null
        label_layout: ccui.Layout = null
        _data = null;
        initWithNode(node: ccui.Widget) {
            super.initWithNode(node);
            // this.setAnchorPoint(0, 0);
            // this.setPosition(0, 0);  
            // this.node.setContentSize(1220,100);
            this.label_floor = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_floor");
            this.label_total = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_total");
            this.label_valid_game = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_valid_game");
            this.label_single_game = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_single_gamel");
            this.label_partner = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_partner");
            this.label_del_time = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_del_time");
            this.btn_detail = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Button_1");
            this.label_layout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "content");

            this.label_layout.setPadding({ right: 0, spacingX: 0 });
            this.label_layout.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Horizontal);
            this.label_layout.setHorizontal(ccui.Layout.LayoutHorizontal.LEFT);
            this.label_layout.doChildrenLayout();//

            this.btn_detail.on(kaayou.TouchEvent.TouchEnd,
                kaayou.TouchMask.clickHandle(() => {
                    //弹出detail
                    console.log("弹出详情界面");
                    kaayou.emit("tea", 'ui::PartnerDelatedFloorDetaiPop::Show',{dfid:this._info.dfid,fid:this._info.fid})
                }, this)
                , this)
        }

        // reset() {
        //     // this.setOperator();
        // }

        private _info

        private isPartnerSelf: boolean = false;

        isOwner() {
            return tea.mod.__teaHouseInfo.urole === HouseMemberRole.OWNER;
        }

        isVitaAdmin(){
            return  tea.mod.__teaHouseInfo.vitamin_admin===true || tea.mod.__teaHouseInfo.urole === HouseMemberRole.CPADMIN;
        }

        isPartner() {
            return tea.mod.__teaHouseInfo.urole === HouseMemberRole.CAPTAIN;
        }

        get() {
            return lodash.clone(this._info);
        }

        // setOperator() {

        // }

        private FloatNumber(num: number) {

            let num1 = num / 10;
            let num2 = num / 100;

            if (num2.toString().indexOf(".") === -1)
                return num2.toString()

            num1 = (num1 | 0) / 10;
            if (num1.toString().indexOf(".") === -1)
                return num2.toString();

            return num1.toString();
        }




        setInfo(data) {
            if (lodash.isEmpty(data) || lodash.isNull(data)) {
                this.label_floor.setString("");
                this.label_total.setString("");
                this.label_valid_game.setString("");
                this.label_single_game.setString("");
                this.label_del_time.setString("");
            }
            this._info = data;
            let Dfloor = data.fid + 1
            this.label_floor.setString(""+Dfloor+"楼");
            this.label_total.setString(""+data.totalprofit/100);
            this.label_valid_game.setString(""+data.validtimes);
            this.label_single_game.setString(data.royalty == -1?"--":this.FloatNumber(data.royalty));
            this.label_partner.setString(data.subordinateprofit == -1?"--":this.FloatNumber(data.subordinateprofit));
            this.label_del_time.setString(new Date(data.DeteleTime*1000).format("yyyy-MM-dd hh:mm"));
            if (this.isOwner() || this.isVitaAdmin()) {
                this.label_layout.setPadding({ left: 0, spacingX: 0 });
            } else {
                this.btn_detail.setVisible(false);
                this.label_layout.setPadding({ left: 0, spacingX: 30 });
            }
            this.label_layout.doChildrenLayout();
        }

        private _index = 0
        setIndex(index: number) {
            this._index = index
        }
        getIndex(): number {
            return this._index;
        }


    }


}