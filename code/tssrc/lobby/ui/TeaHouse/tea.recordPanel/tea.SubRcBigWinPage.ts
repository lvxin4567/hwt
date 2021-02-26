/// <reference path="tea.RecordSearchWidget.ts" />
/// <reference path="tea.RecordSelectWidget.ts" />
namespace tea {

    class TH_RC_BigWinCell extends kaayou.Block implements common.IPullListCell {
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

        img_head: ccui.ImageView = null;   //头像
        label_uname: ccui.Text = null;   //用户名称标签
        label_uid: ccui.Text = null;   //用户id标签

        label_winner: ccui.Text = null;   //大赢家次数标签
        btn_detail: ccui.Button = null;   //详情按钮

        initWithNode(node: ccui.Widget) {
            let self = this;
            super.initWithNode(node);
            this.img_head = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "img_head");
            this.label_uname = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_uname");
            this.label_uid = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_uid");
            this.label_winner = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_winner");
            this.btn_detail = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "BigWinRowClear");

            let ctrName = "teaRC"
            let setSearchEventName = "ui::record::setSearch";
            let subpageChangeEventName = "ui::record::SubpageChange";
            this.btn_detail.on(kaayou.TouchEvent.TouchEnd, () => {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                if (!this._data) { return; }
                if (!this._data.uid) { return; }
                let options = {
                    title: "",
                    msg: "是否清空【{name}】的大赢家次数？".format({ name: self._data.uname }),
                    close: {
                        isShow: false,
                        action: null,
                    },
                    btns: [
                        {
                            name: "确定",
                            action: function () {
                                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                                kaayou.emit("tea", "mod::Record::ClearBigWin", {
                                    hid: tea.mod.__teaHouseInfo.hid,
                                    uid: self._data.uid,
                                    recordtype: 0
                                });
                            }.bind(self),
                            colorType: 'green'
                        },
                        {
                            name: "取消",
                            action: function () {
                                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                                //return false;
                            }.bind(self),
                            colorType: 'blue'
                        }
                    ]
                }
                kaayou.emit("common", "ui::Dialog::Show", options);

            }, this);

            kaayou.getController('tea').on("ui::BigWin::Clear", function (e: kaayou.Event) {
                if (!self._data) return;
                if (e.data.uid == self._data.uid) {
                    self._data.recordtimes = 0;
                    self.label_winner.setString("大赢家次数：" + self._data.recordtimes.toString());
                }
            }, this, 10);

            kaayou.getController('tea').on("ui::BigWin::ClearAll", function (e: kaayou.Event) {
                if (!!self._data) self._data.recordtimes = 0;
                self.label_winner.setString("大赢家次数：0");
            }, this, 10);
        }

        reset() {
            this.img_head.setVisible(false);
            this.label_uname.setString("");
            this.label_uid.setString("");
            this.label_winner.setString("");
            this.btn_detail.setVisible(false);
        }
        _data = null;
        setInfo(data) {
            if (lodash.eq(this._data, data)) { return; }
            var self = this;
            this._data = data;
            if (lodash.isEmpty(data)) {
                return this.reset();
            }
            this.label_uname.setString(kaayou.Identify.nickNameSubByLength(this._data.uname, 8, 5));
            this.label_uid.setString("ID:" + this._data.uid.toString());

            this.label_winner.setString("大赢家次数：" + this._data.recordtimes.toString());
            this.btn_detail.setVisible(true);
            NetImage.setPlayerHead(this.img_head, this._data.uurl, this._data.ugender, (url) => {
                if (!self._data) return false;
                if (url !== self._data.uurl) {
                    return false;
                }
                return true;
            });
            this.img_head.setVisible(true);
        }
    }

    export class SubRcBigWinPage {
        btnClear: ccui.Button = null;
        scr_business: common.PullList = null; //成员列表
        searchMgr: RecordSearchWidget = null;
        selectMgr: RecordSelectWidget = null;

        // iBegin:number=0;
        //获取战绩列表数据 
        doGetBusinessList(clear: boolean = true, timetype: number = 0, sorttype: number = -1, search: string = "") {
            let self = this;
            //lw190718在tea.mod.HouseRecord.ts里接收
            kaayou.emit("tea", 'mod::Record::GetBigWinList', {
                // begin:self.iBegin,
                clear: clear,
                param: search,
                type: 0
            });

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
            this.btnClear.setVisible(true);
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

            this.scr_business = new common.PullList();
            // this.scroll_member._debugRect = true;
            this.scr_business.setSpacingY(8);
            this.scr_business.initWithNode(<cc.Node>ccui.helper.seekWidgetByName(<ccui.Widget>page, "scr_business"));

            this.scr_business.setFootDoingText("上拉刷新");
            this.scr_business.setFootDidFinishText("松开刷新");
            this.scr_business.setFootFinishText("正在刷新");
            this.scr_business.setAdpter({
                getCell: () => {
                    let v = new TH_RC_BigWinCell();
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
            const UI_UpdateEventName = 'ui::Record::updateBigWinList';
            kaayou.getController('tea').on(UI_UpdateEventName, function (e: kaayou.Event) {
                let result: { data: Array<ITH_DATA_RECORDCOUNT_ITEM>, update: boolean } = e.data
                if (result && result.data) {
                    let data = result.data;
                    if (result.update) {
                        self.scr_business.getAdpter().datas = lodash.clone(data || []);
                    }
                } else {
                    self.scr_business.getAdpter().datas = [];
                }
                self.scr_business.refresh();
            }, this, 10);
        }
    }
}