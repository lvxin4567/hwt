// / <reference path="tea.RecordSearchWidget.ts" />
// / <reference path="tea.RecordSelectWidget.ts" />
namespace tea {
    export class TH_Fcm_CountCell extends kaayou.Block implements common.IPullListCell {
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

        label_deduction: ccui.Text = null;   //总扣除
        label_PlayerResidue: ccui.Text = null;   //玩家剩余
        label_fsze: ccui.Text = null;   //负数总额
        label_clearArea: ccui.Text = null;   //清零区间
        label_sztj: ccui.Text = null;         //收支统计


        _data: Data_HouseCountItem = null;

        initWithNode(node: ccui.Widget) {
            let self = this;
            super.initWithNode(node);
            this.label_deduction = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_deduction");
            this.label_PlayerResidue = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_PlayerResidue");
            this.label_fsze = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_fsze");
            this.label_clearArea = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_clearArea");
            this.label_sztj = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_sztj");
            this.reset();
        }


        reset() {
            this.label_deduction.setString("");
            this.label_PlayerResidue.setString("");
            this.label_fsze.setString("");
            this.label_clearArea.setString("");
            this.label_sztj.setString("");
        }

        setInfo(data: Data_HouseCountItem) {
            if (lodash.eq(this._data, data)) { return; }
            var self = this;
            this._data = data;
            if (lodash.isEmpty(data)) {
                return this.reset();
            }
            //lm总扣除为正数
            this.label_deduction.setString("" + Math.abs(data.vitamincost));
            this.label_PlayerResidue.setString("" + data.vitaminleft);
            this.label_fsze.setString("" + data.vitaminminus);
            this.label_sztj.setString("" + data.vitaminpayment);
            if (data.daytype < 0) {
                this.label_PlayerResidue.setString("--");
                this.label_fsze.setString("--");
            }
            if (!!this._data.endat) {
                this.label_clearArea.setString("" + Date.format(this._data.beginat * 1000, "hh:mm") + "-" + Date.format(this._data.endat * 1000, "hh:mm") + "清零");
            } else {
                this.label_clearArea.setString("");
            }

        }
    }

    const timeSortKeys = {
        0: "0d",
        1: "1d",
        2: "2d",
        3: "3d",
        4: "4d",
        "0d": 0,
        "1d": -1,
        "2d": -2,
        "3d": -3,
        "4d": -4,
    };

    //防沉迷 -------------------------------------------------队长统计
    export class SubFcmCountPage {
        btnClearZero: ccui.Button = null;
        scr_FcmCount: common.PullList = null; //
        searchMgr: FcmSearchWidget = null;
        _page: cc.Node = null;
        _index = -1;
        timeType: number = 0;
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
                this.scr_FcmCount.initPullEnv();
            }
            this.resetTimeLine();
            let ctrName = "teaFcm"
            let timeChangeEventName = "ui::fcmCount::time::change";
            let timeDoEventName = "do::fcmCount::time::change";
            kaayou.emit(ctrName, timeDoEventName, { sortName: timeSortKeys[0], sortType: "desc" });
            this.scr_FcmCount.getAdpter().datas = [];
            this.searchMgr.setVisible(false)
            kaayou.emit(ctrName, timeChangeEventName, { sortName: timeSortKeys[0], sortType: "desc" });
            this.scr_FcmCount.refresh();

            this.doGetFcmCountList(true);
        }

        resetTimeLine() {
            lodash.forEach(this.layout_time_group.getChildren(), (v: ccui.Layout, i: number) => {
                if (i == 0) (<ccui.Text>v.getChildByName("time")).setString('今天');
                else if (i == 1) (<ccui.Text>v.getChildByName("time")).setString('昨天');
                else if (i == 2) (<ccui.Text>v.getChildByName("time")).setString('前天');
                else (<ccui.Text>v.getChildByName("time")).setString(new Date(this.subDayTime(i)).Format("MM-dd"));
            });
        }
        subDayTime(sd: number = 0) {
            let todayStr = Date.format("yyyy-MM-dd")
            let todayTime = Math.floor(new Date(todayStr).getTime() / 1000);
            todayTime -= sd * 24 * 60 * 60;
            console.log(todayTime)
            return todayTime * 1000;
        }

        layout_time_group: ccui.Layout = null; // 时间选择块
        //初始化成员列表页面
        initWidthNode(page: cc.Node, searchMgr: FcmSearchWidget, cellMod: ccui.Widget) {

            let self = this;
            this._page = page;
            let timeChangeEventName = "ui::fcmCount::time::change";
            let timeDoEventName = "do::fcmCount::time::change";
            let ctrName = "teaFcm"
            let subpageChangeEventName = "ui::AntiIndulgencePanel::SubpageChange";
            kaayou.getController(ctrName).on(subpageChangeEventName, this.onSubpageChange, this);
            this.searchMgr = searchMgr;
            this.scr_FcmCount = new common.PullList();
            this.scr_FcmCount.setSpacingY(0);
            this.scr_FcmCount.initWithNode(<cc.Node>ccui.helper.seekWidgetByName(<ccui.Widget>page, "scr_FcmCount"));
            this.btnClearZero = ccui.helper.seekWidgetByName(<ccui.Widget>page, "Btn_clearZero");
            // this.btnClearZero.setBrightStyle(ccui.Widget.BRIGHT_STYLE_NORMAL);
            // this.btnClearZero.setEnabled
            this.btnClearZero.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                let options = {
                    msg: "点击清零将会生成当日上次清零时间到当前时间的统计记录，并从当前时间开始统计新的数据！",
                    btns: [
                        {
                            name: "确定",
                            action: function () {
                                kaayou.emit("tea", "mod::teahouse::reset");
                                console.log("这个地方需要取调用清零的接口");
                            },
                            colorType: 'green'
                        },
                        {
                            name: "取消",
                            action: function () {
                                //    self./
                            },
                            colorType: 'yellow'
                        },
                    ]
                }
                kaayou.emit('common', 'ui::Dialog::Show', options);
            }, this);
            this.layout_time_group = ccui.helper.seekWidgetByName(<ccui.Widget>page, "time_group");
            this.scr_FcmCount.setFootDoingText("上拉刷新");
            this.scr_FcmCount.setFootDidFinishText("松开刷新");
            this.scr_FcmCount.setFootFinishText("正在刷新");
            this.scr_FcmCount.setAdpter({
                getCell: () => {
                    let v = new TH_Fcm_CountCell();
                    v.initWithNode(cellMod);
                    return v;
                },
                datas: []
            });

            this.scr_FcmCount.on(kaayou.PullListEvent.HeadFinish, (e: kaayou.PullListEvent) => {
                let target = e.target;
                setTimeout(() => {
                    self.doGetFcmCountList(true, self.timeType);
                }, 500);

            }, this);
            this.scr_FcmCount.on(kaayou.PullListEvent.FootFinish, (e: kaayou.PullListEvent) => {
                let target = e.target;
                setTimeout(() => {
                    self.doGetFcmCountList(true, self.timeType);
                }, 500);
            }, this);
            const UI_UpdateEventName = 'ui::Fcm::updateFcmCountList';
            kaayou.getController('tea').on(UI_UpdateEventName, function (e: kaayou.Event) {
                // let data: { list: Data_HousePartnerCountItem[], update: boolean } = e.data
                let data: { list: ITH_DATA_FCMCOUNT, update: boolean } = e.data
                if (data && data.list) {
                    if (data.update) {
                        self.scr_FcmCount.getAdpter().datas = lodash.clone(data.list || []);
                    }
                } else {
                    self.scr_FcmCount.getAdpter().datas = [];
                }
                self.scr_FcmCount.refresh();
            }, this, 10);



            //时间切换-------------------------------------------------------------------
            lodash.forEach(this.layout_time_group.getChildren(), (v: ccui.Layout, i: number) => {
                v["sortName"] = timeSortKeys[i];
                v["sortType"] = "none";
                v.on(kaayou.TouchEvent.TouchEnd, (e: kaayou.TouchEvent) => {
                    let tagert = e.target;
                    let sortName = tagert.sortName;
                    let sortType = tagert.sortType;
                    if (sortType == 'none' || sortType == 'asc') {
                        sortType = 'desc';
                    } else {
                        sortType = 'asc';
                    }
                    kaayou.emit(ctrName, timeChangeEventName, { sortName, sortType });
                    kaayou.emit(ctrName, timeDoEventName, { sortName, sortType });
                }, this)
                v['updateByType'] = function () {
                    if (this.sortType == "none") {
                        this.getChildByName("cbg").setVisible(false);
                        Patch.ChangeTextColor(this.getChildByName("time"), null, cc.color(100, 180, 241))
                    } else {
                        this.getChildByName("cbg").setVisible(true);
                        Patch.ChangeTextColor(this.getChildByName("time"), null, cc.color(31, 95, 152))
                    }
                }
                v['updateByType']();
                v['onTimeChange'] = function (e: kaayou.Event) {
                    let _data = e.data;
                    let { sortName, sortType } = _data;
                    if (this.sortName == sortName) {
                        this.sortType = sortType;
                    } else {
                        this.sortType = "none";
                    }
                    this.updateByType();
                }
                kaayou.getController(ctrName).on(timeChangeEventName, v['onTimeChange'], v);
            });

            kaayou.getController(ctrName).on(timeDoEventName, (e: kaayou.Event) => {
                let _data = e.data;
                let { sortName, sortType } = _data;
                self.btnClearZero.setVisible(!!(timeSortKeys[sortName] == 0 && (tea.mod.__teaHouseInfo.urole == HouseMemberRole.OWNER || tea.mod.__teaHouseInfo.vitamin_admin)))
                this.doGetFcmCountList(true, timeSortKeys[sortName]);
            }, this);
        }
        //获取比赛分统计数据 
        doGetFcmCountList(clear: boolean = true, timetype: number = 0) {
            let self = this;
            this.timeType = timetype;
            console.log("切换了时间" + timetype);
            kaayou.emit("tea", "mod::teahouse::getFcmCountList", { daytype: this.timeType, clear: clear })
        }
    }

}