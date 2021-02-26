namespace tea {
    const timeSortKeys = {
        0: "0d",
        1: "1d",
        2: "2d",
        3: "3d",
        4: "4d",
        5: "5d",
        6: "6d",
        "0d": 0,
        "1d": -1,
        "2d": -2,
        "3d": -3,
        "4d": -4,
        "5d": -5,
        "6d": -6
    };
    const timeSortKeys1 = {
        0: "1d",
        1: "2d",
        2: "3d",
        3: "7d",
        "1d": 0,
        "2d": 1,
        "3d": 2,
        "7d": 3
    };

    export class RecordDateWidget {
        arrLyLeftMenu: Array<ccui.Layout> = null;
        arrTimeIndex: Array<number> = [];
        arrTimeString: Array<string> = [];
        bLike: boolean = false;
        iLike: number = 0;
        iLowScore:number = 0;
        roundtype = 0
        showLowScore:boolean=false;
        showTimeSort:boolean = true;
        showSortType = false;
        lowScoreIndex: number=0;
        node: cc.Node = null;
        pageName: string = "Mine";
        prfLeftMenu: ccui.Layout = null;
        sub_items: Array<ccui.CheckBox> = null;
        scrollList: ccui.ScrollView = null;


        clickCall: Function = null;
        selcall: Function = null;
        _curselIndex: number = 0;
        checkRadio: common.RadioGroup = null;
        
        
        constructor() {
        }
        initWidthNode(node: cc.Node, menuItem: ccui.Layout, clickCall: Function) {
            let self = this;
            this.node = node;
            this.selcall = clickCall;
            this.prfLeftMenu = menuItem;
            this.scrollList = ccui.helper.seekWidgetByName(<ccui.ScrollView>this.node, "dateSelect_layout");
            this.scrollList.setScrollBarEnabled(false);
            this.resetTimeLine(7);
            this.setCurSelect(0);
            kaayou.getController('tea').on('ui::TimeFliter::Submit', function (e: kaayou.Event) {
                self.arrTimeIndex[self._curselIndex] = e.data.iTime;
                self.arrTimeString[self._curselIndex] = kaayou.TimeHelper.getStringByIndex(e.data.iTime);
                self.iLike = e.data.iLike;
                self.iLowScore = e.data.iLowScore;
                self.roundtype = e.data.iType
                self.setTimeText();
            }, this, 10);
        }

        onMenuSelected(e: kaayou.RadioEvent) {
            kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
            let index = e.target['index'];
            this.iLike = 0;
            this.setCurSelect(index);
            this.selcall && this.selcall();
        }

        onButtonClicked(e: kaayou.TouchEvent) {
            let btn: ccui.Button = e.target;
            btn.setEnabled(false);
            setTimeout(() => {
                btn.setEnabled(true);
            }, 1000);
            kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
            let json = (cc.sys.localStorage.getItem("tea::store::lowscorefilter") || "{}");
            let l = JSON.parse(json)[tea.mod.__teaHouseInfo.hid] || 0
            this.lowScoreIndex = (!!l && +l || 0);
            kaayou.emit("tea", "ui::TimeFliterPanel::Show", { index: this.arrTimeIndex[this._curselIndex], showLike: this.bLike, likeIndex: this.iLike , showLowScore:this.showLowScore,lowScoreIndex:this.lowScoreIndex,showTimeSort:this.showTimeSort,showSortType:this.showSortType });
        }

        setPage(name) {
            this.pageName = name;
            switch (name) {
                case "Mine":
                    this.setItemsCount(7);
                    this.bLike = false;
                    this.showLowScore=false;
                    this.showTimeSort=true;
                    this.showSortType = false;
                    break;
                case "Member":
                    this.setItemsCount(7);
                    this.bLike = true;
                    this.showLowScore=true;
                    this.showTimeSort=true;
                    this.showSortType = false;
                    break;
                case "Circle":
                    this.setItemsCount(7);
                    this.bLike = true;
                    this.showLowScore=true;
                    this.showTimeSort=true;
                    this.showSortType = true;
                    break;
                case "Team":
                    this.setItemsCount(4);
                    this.bLike = true;
                    this.showLowScore=true;
                    this.showTimeSort=true;
                    this.showSortType = false;
                    break;
            }
        }

        setItemsCount(idx) {
            this.sub_items.forEach((v, i) => {
                v.setVisible(i < idx);
            })
            this.resetTimeLine(idx)
        }

        setTimeText() {
            for (let i = 0; i < this.arrLyLeftMenu.length; ++i) {
                let menu = this.arrLyLeftMenu[i];
                let btn: ccui.Button = <ccui.Button>(menu.getChildByName("Button"));
                (<ccui.Text>btn.getChildByName("Times")).setString(this.arrTimeString[i]);
            }
        }

        resetTimeLine(idx: number) {
            let self = this;
            this.checkRadio = new common.RadioGroup();
            this.arrLyLeftMenu = [];
            this.sub_items = [];
            this.checkRadio.removeAll();
            this.scrollList.removeAllChildren();

            let now = new Date();
            let h = now.getHours();
            this.arrTimeString[0] = kaayou.TimeHelper.getTimesByHour(h);
            this.arrTimeIndex[0] = kaayou.TimeHelper.getIndexByString(this.arrTimeString[0]);

            let fn = function (menu, txt, index) {
                let cb: ccui.CheckBox = <ccui.CheckBox>(menu.getChildByName("LeftMenuCheckBox"));
                (<ccui.Text>cb.getChildByName("time")).setString(txt);
                self.sub_items.push(cb);
                self.checkRadio.add(cb);
                let btn: ccui.Button = <ccui.Button>(menu.getChildByName("Button"));
                btn.on(kaayou.TouchEvent.TouchEnd, self.onButtonClicked, self);
                self.arrLyLeftMenu.push(menu);
                // if (index > 0) {
                self.arrTimeIndex[index] = kaayou.TimeHelper.getLastIndex();
                self.arrTimeString[index] = kaayou.TimeHelper.getStringByIndex(self.arrTimeIndex[index]);
                // }
            }
            if (idx == 7) {
                for (let i = 0; i < idx; ++i) {
                    let menu = <ccui.Layout>this.prfLeftMenu.clone();
                    this.scrollList.addChild(menu);
                    menu.x = 0;
                    let txt = "";
                    if (i == 0) txt = '今天';
                    else if (i == 1) txt = '昨天';
                    else if (i == 2) txt = '前天';
                    else txt = new Date(this.subDayTime(i)).Format("MM-dd");
                    fn(menu, txt, i);
                }
            } else {
                for (let i = 0; i < idx; ++i) {
                    let menu = <ccui.Layout>this.prfLeftMenu.clone();
                    this.scrollList.addChild(menu);
                    menu.x = 0;
                    let txt = "";
                    if (i == 0) txt = '今天';
                    else if (i == 1) txt = '昨天';
                    else if (i == 2) txt = '三日累计';
                    else if (i == 3) txt = '七日累计';
                    else txt = new Date(this.subDayTime(i)).Format("MM-dd");
                    fn(menu, txt, i);
                }
            }
            self.setTimeText();


            this.scrollList.setPadding({ top: 0 });
            this.scrollList.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Vertical);
            this.scrollList.setVertical(ccui.Layout.LayoutVertical.TOP);
            this.scrollList.doChildrenLayout();

            lodash.forEach(this.sub_items, function (v: ccui.CheckBox, i) {
                v['index'] = i;
                v.on(kaayou.RadioEvent.SELECTED, self.onMenuSelected, self);
                self.checkRadio.add(v);
            })
        }

        subDayTime(sd: number = 0) {
            let todayStr = Date.format("yyyy-MM-dd")
            let todayTime = Math.floor(new Date(todayStr).getTime() / 1000);
            todayTime -= sd * 24 * 60 * 60;
            return todayTime * 1000;
        }

        setCurSelect(index: number) {
            if (index < 0 || index >= this.sub_items.length) { index = 0; }
            this._curselIndex = index;
            let fn1 = function (cb, lb, ly) {
                lb.setTextColor(cc.color("#975638"));
                ly.height = 150;
                cb.y = 116;
                ly.getChildByName("Button").y = 40;
            }
            let fn2 = function (cb, lb, ly) {
                lb.setTextColor(cc.color("#3967b2"));
                ly.height = 75;
                cb.y = 116 - 75;
                ly.getChildByName("Button").y = 40 - 75;
            }

            for (let i = 0; i < this.arrLyLeftMenu.length; ++i) {
                let ly = this.arrLyLeftMenu[i];
                let cb = this.sub_items[i];
                let lbTime = (<ccui.Text>cb.getChildByName("time"));
                cb.setSelected(i == index);
                //现在改成所有的都需要筛选
                // if (this.arrLyLeftMenu.length == 7) {
                    if (i == index) {
                        fn1(cb, lbTime, ly);
                    } else {
                        fn2(cb, lbTime, ly);
                    }

                    let label  =<ccui.Text> ccui.helper.seekWidgetByName(<ccui.Widget>ly,"Text_8")
                    if(this.pageName==="Team"){                        
                        label.setString("战绩筛选")
                        if(i>1){
                            if(!/5|8/.test(tea.mod.__teaHouseInfo.urole.toString()))
                                fn2(cb, lbTime, ly);
                        }
                    }else{
                        label.setString("时段筛选")
                    }

                // } else {
                //     if (i == index && i < 2) {
                //         fn1(cb, lbTime, ly);
                //     } else {
                //         fn2(cb, lbTime, ly);
                //     }
                // }
            }

            if(this.pageName==="Team"){

                this.showTimeSort = (index < 2)

            }

            this.scrollList.doChildrenLayout();
        }
        getCurSelect() {
            return this._curselIndex;
        }
    }
}