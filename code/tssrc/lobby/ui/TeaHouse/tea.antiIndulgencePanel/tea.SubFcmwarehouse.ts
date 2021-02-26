// / <reference path="tea.RecordSearchWidget.ts" />
// / <reference path="tea.RecordSelectWidget.ts" />
namespace tea {

    export class TH_Fcm_WareHouseCell extends kaayou.Block implements common.IPullListCell {
        constructor() {
            super();
        }
        _index = -1;
        setIndex(index) {
            this._index = index;
        }
        getIndex() {
            return this._index;
        }

        label_time: ccui.Text = null;   //序号标签
        label_day: ccui.Text = null;   //序号标签
        label_uid: ccui.Text = null;   //序号标签
        label_op: ccui.Text = null;   //序号标签
        label_num: ccui.Text = null;   //序号标签
        bgItem:ccui.Text = null;       //背景


        _data: FCMPlayerRecordItem = null;

        initWithNode(node: ccui.Widget) {
            let self = this;
            super.initWithNode(node);
            this.label_time = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_time");
            this.label_day = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_day");
            this.label_uid = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_uid");
            this.label_op = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_op");
            this.label_num = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_num");
            this.bgItem = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "bg1");
            this.reset();
        }


        reset() {
            this.label_day.setString("");
            this.label_time.setString("");
            this.label_uid.setString("");
            this.label_op.setString("");
            this.label_num.setString("");
        }

        setInfo(data: FCMPlayerRecordItem,i:number) {
            if (lodash.eq(this._data, data)) { return; }
            var self = this;
            this._data = data;
            if (lodash.isEmpty(data)) {
                return this.reset();
            }
            this.bgItem.setVisible(!!!(i%2));
            this.label_time.setString("" + new Date(this._data.updatedtime * 1000).format('MM-dd  hh:mm'));
            this.label_op.setString(this._data.opt_type);
            this.label_num.setString("" + Math.abs(this._data.change_vitamin));
            this.label_uid.setString("" + this._data.opt_name);

            this.label_num.setTextColor(this._data.change_vitamin > 0 ? cc.color("#ff6651") : cc.color("#37caa6"));
        }
    }


    //防沉迷 -------------------------------------------------队长统计
    export class SubFcmWareHousePage {
        btnClear: ccui.Button = null;
        scr_WareHouse: ccui.ScrollView = null; //
        searchMgr: FcmSearchWidget = null;
        label_zplz: ccui.Text = null;         //总比赛分
        label_cksy: ccui.Text = null;         //仓库剩余  
        label_used: ccui.Text = null;         //已使用  
        label_zryh: ccui.Text = null;         //昨日应划
        label_zrsh: ccui.Text = null;         //昨日实划
        label_jkcze: ccui.Text = null;        //净扣除总额
        btn_operation: ccui.Button = null
        btn_last: ccui.Button = null;
        btn_next: ccui.Button = null;
        label_curIndex: ccui.Text = null;
        TH_Fcm_WareHouseCell_mode: ccui.Layout = null;
        curPage = 1;
        totalpage = 0;
        curWHData: Data_FcmWarehouseRes = null;
        //获取战绩列表数据 
        doGetBusinessList(clear: boolean = true, timetype: number = 0, sorttype: number = -1, search: string = "") {
            let self = this;
            kaayou.emit("tea", 'mod::Record::GetBusinessdList');
        }
        _page: cc.Node = null;
        _index = -1;
        setIndex(index) {
            this._index = index;
            return this;
        }
        getIndex() {
            return this._index;
        }
        onSubpageChange(e: kaayou.Event) {
            let _data = e.data;
            let { index } = _data;
            if (index == this.getIndex()) {
                if (this._page.isVisible()) {

                } else {
                    this.reset();
                }
                this._page.setVisible(true);
            } else {
                this._page.setVisible(false);
            }
        }
        _isInitPull = false;
        reset() {
            this.searchMgr.setVisible(false)
            this.curPage = 1;
            this.btn_last.enabled = false;
            this.btn_next.enabled = false;
            this.doGetWareHouseList(1, true);
            this.scr_WareHouse.setVisible(true);
            kaayou.pool.putAllChildrenInPool(this.scr_WareHouse);
        }



        layout_time_group: ccui.Layout = null; // 时间选择块
        //初始化成员列表页面
        initWidthNode(page: cc.Node, searchMgr: FcmSearchWidget, cellMod: ccui.Layout) {

            let self = this;
            this._page = page;
            // let timeChangeEventName = "ui::fcmCount::time::change";
            // let timeDoEventName = "do::fcmCount::time::change";

            this.searchMgr = searchMgr;
            let ctrName = "teaFcm"
            let subpageChangeEventName = "ui::AntiIndulgencePanel::SubpageChange";
            kaayou.getController(ctrName).on(subpageChangeEventName, this.onSubpageChange, this);
            this.TH_Fcm_WareHouseCell_mode = cellMod;
            this.label_zplz = ccui.helper.seekWidgetByName(<ccui.Widget>page, "Vp_sumLabel");
            this.label_cksy = ccui.helper.seekWidgetByName(<ccui.Widget>page, "Vp_remainLabel");
            this.label_used = ccui.helper.seekWidgetByName(<ccui.Widget>page, "Vp_usedLabel");
            this.label_zryh = ccui.helper.seekWidgetByName(<ccui.Widget>page, "Vp_yes_s_deduc");
            this.label_zrsh = ccui.helper.seekWidgetByName(<ccui.Widget>page, "Vp_yes_r_deduc");
            this.label_jkcze = ccui.helper.seekWidgetByName(<ccui.Widget>page, "Vp_totleDeduc");
            this.btn_operation = ccui.helper.seekWidgetByName(<ccui.Widget>page, "fcm_btn_opreation");
            this.btn_last = ccui.helper.seekWidgetByName(<ccui.Widget>page, "Vp_wareHouseLast");
            this.label_curIndex = ccui.helper.seekWidgetByName(<ccui.Widget>page, "Vp_CurIndex");
            this.btn_next = ccui.helper.seekWidgetByName(<ccui.Widget>page, "Vp_wareHouseNext");
            this.btn_operation.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit("tea", "ui::WareHousePopPanel::Show", self.curWHData)
            }, this);




            this.btn_next.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                self.curPage++;
                if (self.curPage >= self.totalpage) {
                    self.curPage = self.totalpage
                }
                self.doGetWareHouseList(self.curPage, true);
            }, this);

            this.btn_last.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                self.curPage--;
                if (self.curPage <= 1) {
                    self.curPage = 1;
                }
                self.doGetWareHouseList(self.curPage, true);
            }, this);


            this.scr_WareHouse = ccui.helper.seekWidgetByName(<ccui.Widget>page, "scr_WareHouse");
            this.scr_WareHouse.setPadding({ spacingY: 0 });
            this.scr_WareHouse.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Vertical);
            this.scr_WareHouse.setVertical(ccui.Layout.LayoutVertical.TOP);
            this.scr_WareHouse.setScrollBarEnabled(false);


            const UI_UpdateEventName = 'ui::Fcm::updateWareHouseList';
            kaayou.getController('tea').on(UI_UpdateEventName, function (e: kaayou.Event) {
                self.scr_WareHouse.removeAllChildren();
                let result: Data_FcmWarehouseRes = e.data.data;
                if (!result) {
                    return;
                }
                let total = e.data.totalPage;
                self.curPage = e.data.curpage;
                self.label_curIndex.setString("" + self.curPage);
                self.btn_last.setEnabled(self.curPage != 1);
                self.btn_next.setEnabled(self.curPage != total)
                self.totalpage = total;
                if (result && result.items) {
                    self.curWHData = result;
                    /*
                    self.label_zplz.setString("" + result.total);
                    self.label_cksy.setString("" + result.pool_left);
                    self.label_used.setString("" + result.pool_used);
                    self.label_zryh.setString("" + result.last_should_pay);
                    self.label_zrsh.setString("" + result.last_paied);
                    self.label_jkcze.setString(result.earn_sum.toFixed(2));
                    */
                    for (var x in result.items) {
                        let cell = self.createCell();
                        self.scr_WareHouse.addChild(cell);
                        cell.setInfo(result.items[x],Number(x));
                    }
                    self.scr_WareHouse.doChildrenLayout();
                    self.scr_WareHouse.scrollToTop(0, false);
                }

            }, this, 10);

        }
        private createCell(): TH_Fcm_WareHouseCell {
            let cell = kaayou.pool.getFromPool(TH_Fcm_WareHouseCell);
            if (!cell) {
                cell = new TH_Fcm_WareHouseCell();
                cell.initWithNode(this.TH_Fcm_WareHouseCell_mode);
            }
            cell.setAnchorPoint(0, 0);
            cell.setPositionY(0);
            cell.setPositionX(0);
            cell.setVisible(true);
            return cell;
        }
        //获取比赛分统计数据 
        doGetWareHouseList(page, clear: boolean = false) {
            let self = this;
            console.log("切换了时间");
            kaayou.emit("tea", "mod::teahouse::warehouseList", { page: page, clear: clear })
        }
    }

}