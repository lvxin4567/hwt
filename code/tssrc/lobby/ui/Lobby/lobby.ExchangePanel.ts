
//商品面板
namespace lobby {
    const { doBindEvent, BindEvent } = kaayou._decorator;
    interface ProductInfo {
        appid: string;
        hot: number;
        id: number;
        imgUrl: string;
        ioskey: string;
        nameAdd: string;
        num: number;
        numAdd: number
        price: number;
        productName: string
        type: number;
    }

    export class ExchangePanelCell extends kaayou.Block {
        constructor() {
            super();
        }
        label_money: ccui.Text = null;
        label_cardnum: ccui.Text = null;
        btn_buy: ccui.Button = null;
        initWithNode(node: ccui.Widget) {
            super.initWithNode(node);
            // this.label_money = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_money");
            // this.label_cardnum = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_cardnum");
            // this.btn_buy = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_buy");
            // let self = this;
            // this.btn_buy.on(kaayou.TouchEvent.TouchEnd, function () {
            //     if (lodash.isEmpty(self._data)) { return; }
            //     kaayou.emit("lobby", "ui::Mall::ProductSelected", self._data);
            // }, this);

        }
        _data: ProductInfo = null;
        setInfo(data: ProductInfo) {
            this._data = data;
            // this.label_money.setString("¥" + data.price / 100);
            // this.label_cardnum.setString("" + data.num);
        }

        unuse() {
            this._data = null;
            // this.label_money.setString("");
            // this.label_cardnum.setString("");
            this.removeFromParent();
        }
    }




    export class ExchangeRecordCell extends kaayou.Block {
        constructor() {
            super();
        }
        _index:number = 0;
        label_money: ccui.Text = null;
        label_cardnum: ccui.Text = null;
        btn_buy: ccui.Button = null;
        initWithNode(node: ccui.Widget) {
            super.initWithNode(node);
            // this.label_money = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_money");
            // this.label_cardnum = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_cardnum");
            // this.btn_buy = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_buy");
            // let self = this;
            // this.btn_buy.on(kaayou.TouchEvent.TouchEnd, function () {
            //     if (lodash.isEmpty(self._data)) { return; }
            //     kaayou.emit("lobby", "ui::Mall::ProductSelected", self._data);
            // }, this);

        }
        _data: ProductInfo = null;
        setInfo(data: ProductInfo) {
            this._data = data;
            // this.label_money.setString("¥" + data.price / 100);
            // this.label_cardnum.setString("" + data.num);
        }
        setIndex(i:number){
            this._index = i;
           ( <ccui.Layout>this.node).setBackGroundImage( i % 2 == 0 ? 'lobby.bg_exchage_line1.png' : 'lobby.bg_exchage_line2.png',ccui.Widget.PLIST_TEXTURE);
        }

        unuse() {
            this._data = null;
            // this.label_money.setString("");
            // this.label_cardnum.setString("");
            this.removeFromParent();
        }
    }


    export class ExchangePanel extends kaayou.ModelLayer {

        constructor() {
            super();
            return;
            // this.initWithccs(lobby.res.ExchangePanel_json);
            this.initUI();
        }

        exchage_cell_mode: ccui.Layout = null;
        exchage_record_cell_mode: ccui.Layout = null;
        exchage_record_cell_layout: ccui.ScrollView = null;
        exchage_record_layout: ccui.Layout = null;


        exchage_cell_layout: ccui.Layout = null;

        exchage_menu_layout: ccui.Layout = null;

        exchangeMenuGroup: common.RadioGroup = null;


        topbarMgr: lobby.TopBarMgr = null;
        @doBindEvent
        initUI() {
            this.isTouchMaskHide = false;
            let self = this;



            {

                let top_bar = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "top_bar");
                this.topbarMgr = new TopBarMgr(ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "top_bar"));
                this.topbarMgr.setOnCloseClick(function () {
                    self.Hide();
                }.bind(this));
                // this.topbarMgr.setBeanVisibel(false);
                this.topbarMgr.setCardVisibel(false);
                // this.topbarMgr.setGoldVisibel(false);
                this.topbarMgr.doRightLayout();
                // this.topbarMgr.setTitle("兑换");





            }

            {

                this.exchage_menu_layout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "exchage_menu_layout");


                this.exchangeMenuGroup = new common.RadioGroup();
                this.exchage_menu_layout.setPadding({ spacingY: 0 });
                this.exchage_menu_layout.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Vertical);
                this.exchage_menu_layout.doChildrenLayout();

                let children = this.exchage_menu_layout.getChildren();
                for (var x in children) {
                    let v = <ccui.CheckBox>children[x];
                    v['indexkey'] = Number(x) + 1;
                    this.exchangeMenuGroup.add(v);
                    v.on(kaayou.RadioEvent.SELECTED, this.onlevel1Change, this);
                }



            }



            {

                this.exchage_cell_mode = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "exchage_cell_mode");
                this.exchage_cell_layout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "exchage_cell_layout");

                this.exchage_cell_layout.setPadding({ top: 20, bottom: 0, left: 40 , right: 0, spacingX: 50, spacingY: 30 });
                this.exchage_cell_layout.setGrid(ccui.Layout.LayoutGrid_AxisDirection.HORIZONTAL);
                this.exchage_cell_layout.setHorizontal(ccui.Layout.LayoutHorizontal.LEFT);
                this.exchage_cell_layout.setVertical(ccui.Layout.LayoutVertical.TOP);
                this.exchage_cell_layout.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Grid);
                this.exchage_cell_layout.setGridColumn(4);

                for (var i = 0; i < 8; i++) {
                    let cell = this.createCell();
                    this.exchage_cell_layout.addChild(cell);
                }
                this.exchage_cell_layout.doChildrenLayout();
            }

            {
                this.exchage_record_layout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "exchage_record_layout");
                this.exchage_record_layout.setPosition(this.exchage_cell_layout.getPosition());
                this.exchage_record_cell_layout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "exchage_record_cell_layout");
                this.exchage_record_cell_mode = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "exchage_record_cell_mode");

                for (var i = 0; i < 8; i++) {
                    let cell = this.createRecordCell();
                    cell.setIndex(i);
                    this.exchage_record_cell_layout.addChild(cell);
                }
                this.exchage_record_cell_layout.setPadding({ spacingY: 0 });
                this.exchage_record_cell_layout.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Vertical);
                this.exchage_record_cell_layout.doChildrenLayout();
            }

            this.addChild(new ChannelPanel);
            this.Hide();
        }

        onlevel1Change(e: kaayou.RadioEvent) {
            let self = this;

            let indexkey = Number(e.target['indexkey']) || 2;
            switch (indexkey) {
                case 1:
                    this.exchage_cell_layout.setVisible(true);
                    this.exchage_record_layout.setVisible(false);
                    break;
                case 2:
                    this.exchage_cell_layout.setVisible(false);
                    this.exchage_record_layout.setVisible(true);
                    break;
            }
        }


        private createCell(): ExchangePanelCell {
            let cell = <ExchangePanelCell>kaayou.pool.getFromPool(ExchangePanelCell);
            if (!cell) {
                cell = new ExchangePanelCell();
            }
            cell.initWithNode(this.exchage_cell_mode);
            cell.setAnchorPoint(0.5, 0);
            cell.setPositionY(0);
            return cell;
        }

        private createRecordCell(): ExchangeRecordCell {
            let cell = <ExchangeRecordCell>kaayou.pool.getFromPool(ExchangeRecordCell);
            if (!cell) {
                cell = new ExchangeRecordCell();
            }
            cell.initWithNode(this.exchage_record_cell_mode);
            cell.setAnchorPoint(0, 1);
            cell.setPositionX(0);
            return cell;
        }

        //测试数据，需要从后台获取
        @BindEvent('lobby', 'ui::Exchange::ProductInfo')
        setMallList(data) {
            console.log(data);
            let self = this;
            kaayou.pool.putAllChildrenInPool(this.exchage_cell_layout);

            lodash.forEach(data, function (v) {
                let cell = self.createCell();
                cell.setInfo(v);
                self.exchage_cell_layout.addChild(cell);
            });
            self.exchage_cell_layout.doChildrenLayout();
        }

        @BindEvent('lobby', 'ui::Exchange::ProductSelected')
        onProductSelected(data) {
            kaayou.emit('common', 'ui::ChannelPanel::Show', {
                onSelected: function (res) {

                    console.log(res, data);

                    kaayou.emit('common', 'ui::ChannelPanel::Hide');
                },
                onCancel: function (res) {


                }
            })
        }



        @BindEvent("lobby", 'ui::Exchange::Show')
        Show() {
            kaayou.emit('lobby', 'mod::Exchange::getProductInfo');
            (<ccui.CheckBox>this.exchage_menu_layout.getChildren()[0]).setRadioSelected();
            this.setVisible(true);
        }
        @BindEvent("lobby", 'ui::Exchange::Hide')
        Hide() {
            this.setVisible(false);
        }

    }



}