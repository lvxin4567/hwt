/// <reference path="tea.RecordSearchWidget.ts" />
/// <reference path="tea.RecordSelectWidget.ts" />
namespace tea {

    export class TH_RC_BusinessCell extends kaayou.Block implements common.IPullListCell {
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
        _data: Array<number> = null;

        initWithNode(node: ccui.Widget) {
            let self = this;
            super.initWithNode(node);
            this.reset();
        }


        reset() {
            for (let i = 0; i < 8; i++) {
                let data_label = <ccui.Text>(this.node.getChildren()[i]);
                data_label.setString("");
            }
        }

        setInfo(data: Array<number>) {
            if (lodash.eq(this._data, data)) { return; }
            var self = this;
            this._data = data;
            if (lodash.isEmpty(data)) {
                return this.reset();
            }
            this.reset();
            for (let i = 0; i < data.length; i++) {
                let data_label = <ccui.Text>(self.node.getChildren()[i]);
                if (i == 0) {
                    data_label.setString("" + data[i] + "楼");
                    continue;
                }
                data_label.setString("" + data[i]);
            }
        }
    }




    export class SubRcBusinessPage {
        btnClear: ccui.Button = null;
        lyTotalCard: ccui.Layout = null;   //房卡消耗
        scr_business: common.PullList = null; //成员列表
        searchMgr: RecordSearchWidget = null;
        selectMgr: RecordSelectWidget = null;
        totle_Layout: ccui.Layout = null;
        date_layout: ccui.Layout = null;
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
            if (false == this._isInitPull) {
                this._isInitPull = true;
                this.scr_business.initPullEnv();
            }
            this.btnClear.setVisible(false);
            this.searchMgr.setVisible(false);
            this.selectMgr.setVisible(false);
            this.searchMgr.setPlaceholder("");
            this.scr_business.getAdpter().datas = [];
            this.scr_business.refresh();
            this.doGetBusinessList(true);
        }
        layout_time_group: ccui.Layout = null; // 时间选择块
        layout_sort_group: ccui.Layout = null; // 排序块  tabSortGroup


        //初始化成员列表页面
        initWidthNode(page: cc.Node, searchMgr: RecordSearchWidget, selecthMgr: RecordSelectWidget, cellMod: ccui.Widget, clearButton: ccui.Button) {

            let self = this;
            this._page = page;
            this.btnClear = clearButton;
            this.searchMgr = searchMgr;
            this.selectMgr = selecthMgr;

            let ctrName = "teaRC"
            let subpageChangeEventName = "ui::record::SubpageChange";
            kaayou.getController(ctrName).on(subpageChangeEventName, this.onSubpageChange, this);
            this.lyTotalCard = ccui.helper.seekWidgetByName(<ccui.Widget>page, "lyTotalCard");
            this.totle_Layout = ccui.helper.seekWidgetByName(<ccui.Widget>page, "totle_Layout");
            this.date_layout = ccui.helper.seekWidgetByName(<ccui.Widget>page, "date_Layout");
            this.scr_business = new common.PullList();
            // this.scroll_member._debugRect = true;
            this.scr_business.setSpacingY(8);
            this.scr_business.initWithNode(<cc.Node>ccui.helper.seekWidgetByName(<ccui.Widget>page, "scr_business"));

            this.scr_business.setFootDoingText("上拉刷新");
            this.scr_business.setFootDidFinishText("松开刷新");
            this.scr_business.setFootFinishText("正在刷新");
            this.scr_business.setAdpter({
                getCell: () => {
                    let v = new TH_RC_BusinessCell();
                    v.initWithNode(cellMod);
                    return v;
                },
                datas: []
            });

            this.scr_business.on(kaayou.PullListEvent.HeadFinish, (e: kaayou.PullListEvent) => {
                let target = e.target;
                setTimeout(() => {
                    self.doGetBusinessList(true);
                }, 500);

            }, this);
            this.scr_business.on(kaayou.PullListEvent.FootFinish, (e: kaayou.PullListEvent) => {
                let target = e.target;
                setTimeout(() => {
                    self.doGetBusinessList(false);
                }, 500);
            }, this);
            const UI_UpdateEventName = 'ui::Record::updateBusinessList';
            kaayou.getController('tea').on(UI_UpdateEventName, function (e: kaayou.Event) {
                let result: { data: ITH_RECORD_BUSS_RES, update: boolean } = e.data
                if (result && result.data) {
                    let data = result.data;
                    if (result.update) {

                        for (let i = 0; i < data.timeArr.length; i++) {
                            let data_label = <ccui.Text>(self.date_layout.getChildren()[i]);
                            data_label.setString(Date.format(data.timeArr[i] * 1000, "MM-dd"));
                            let totle_label = <ccui.Text>(self.totle_Layout.getChildren()[i + 1]);
                            totle_label.setString("" + data.totalArr[i]);
                            let lbCard=<ccui.Text>(self.lyTotalCard.getChildren()[i+1]);
                            lbCard.setString(""+data.totalCard[i]);
                        }

                        self.scr_business.getAdpter().datas = lodash.clone(data.itemArr || []);
                    }
                } else {
                    self.scr_business.getAdpter().datas = [];
                }
                self.scr_business.refresh();
            }, this, 10);
        }


    }

}