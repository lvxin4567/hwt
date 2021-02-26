namespace tea {

    //全部数字除100
    interface Data_HousePartnerStatItem {
        "uid": number;
        "uname": string;
        "uurl": string;
        "ugender": number,
        "changeprofit": number,
        "exp":number
        "validtimes": number,//有效局
        "bigvalidtimes": number,//超级有效局
        "roundprofit": number,//单局收益
        "subordinateprofit": number,//下级收益
        "totalprofit": number//总收益 
        "royalty": number//设置值
        "isjunior": boolean //是否是一级队长
    }

    class PartnerIncomeCell extends kaayou.Block implements common.IPullListCell {

        private img_head: ccui.ImageView = null;
        private label_name: ccui.Text = null;
        private label_id: ccui.Text = null;
        private label_total: ccui.Text = null;
        private lbSuper: ccui.Text = null; //超级有效局
        private label_youxiao: ccui.Text = null;
        private label_single_income: ccui.Text = null;
        private label_all_income: ccui.Text = null;
        private label_rank:ccui.Text
        //private label_change: ccui.Text = null;

        private group_modify: ccui.Layout = null;
        private group_info: ccui.Layout = null;
        private group_UPartner: ccui.Layout = null;
        private ConfigButton: ccui.Button = null;
        private BindButton: ccui.Button = null;
        private QueryButton: ccui.Button = null;
        private UConfigButton: ccui.Button = null;
        private UImageSubTag: ccui.ImageView = null;
        private UImageSubFirstTag: ccui.ImageView = null;


        initWithNode(node: ccui.Widget) {
            let self = this;
            super.initWithNode(node);

            this.setAnchorPoint(0, 0);
            this.setPosition(0, 0);

            let headBG = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "HeadBg");
            this.UImageSubTag = ccui.helper.seekWidgetByName(<ccui.Widget>headBG, "Image_2");
            this.UImageSubFirstTag = ccui.helper.seekWidgetByName(<ccui.Widget>headBG, "Image_3");

            this.img_head = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "img_head");
            this.label_name = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_name");
            this.label_id = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_id");
            this.label_total = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_total");
            this.label_rank =  ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_rank");
            this.lbSuper = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "lbSuper");
            this.label_youxiao = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_youxiao");
            this.label_single_income = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_single_income");
            this.label_all_income = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_all_income");
            //this.label_change = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_change");
            this.group_modify = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "group_modify");
            this.group_info = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "group_info");
            this.group_UPartner = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "group_sub_modify");

            this.ConfigButton = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "ConfigButton");
            this.BindButton = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "BindButton");
            this.QueryButton = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "QueryButton");
            this.UConfigButton = ccui.helper.seekWidgetByName(<ccui.Widget>this.group_UPartner, "ConfigButton");

            this.group_UPartner.setVisible(false);
            this.group_modify.setVisible(false);
            this.group_info.setVisible(false);
            this.UImageSubTag.setVisible(false);
            this.UImageSubFirstTag.setVisible(false);

            this.ConfigButton.on(kaayou.TouchEvent.TouchEnd, kaayou.TouchMask.clickHandle(() => {
                let { isjunior, uid , uname } = this._info
                kaayou.emit("tea", 'ui::PropotionConfigDialog::Show', { isjunior, parnterid: uid , uname, isPartner: self.isPartner() });
            }, this), this)

            this.UConfigButton.on(kaayou.TouchEvent.TouchEnd, kaayou.TouchMask.clickHandle(() => {
                let { isjunior, uid , uname  } = this._info
                kaayou.emit("tea", 'ui::PropotionConfigDialog::Show', { isjunior, parnterid: uid , uname, isPartner: self.isPartner() });
            }, this), this)

            this.BindButton.on(kaayou.TouchEvent.TouchEnd, kaayou.TouchMask.clickHandle(() => {
                kaayou.emit("tea", 'mod::ProportionBindDialog::show', { parnterid: this._info.uid });
            }, this), this)

            this.QueryButton.on(kaayou.TouchEvent.TouchEnd, () => {
                kaayou.emit("tea", 'ui::ProportionInfoDialog::Show', { parnterid: this._info.uid, daytype: this.daytype, fidindex: this.fidindex });
            }, this)

        }

        reset() {
            this.label_name.setString("");
            this.label_id.setString("");
            this.label_total.setString("");
            this.lbSuper.setString("");
            this.label_youxiao.setString("");
            this.label_single_income.setString("");
            this.label_all_income.setString("")
            this.setOperatorPanel();
        }

        private _info: Data_HousePartnerStatItem = {
            "exp":null,
            "uid": null,
            "uname": null,
            "uurl": null,
            "ugender": null,
            "changeprofit": null,
            "validtimes": null,//有效局
            "bigvalidtimes": null,//超级有效局
            "roundprofit": null,//单局收益
            "subordinateprofit": null,//下级收益
            "totalprofit": null,//总收益 
            "royalty": null,//设置值
            "isjunior": false
        }

        private isPartnerSelf: boolean = false;

        isPartner() {
            return tea.mod.__teaHouseInfo.urole === HouseMemberRole.CAPTAIN;
        }

        
        private isVitaAdmin(){
            return  tea.mod.__teaHouseInfo.vitamin_admin===true || tea.mod.__teaHouseInfo.urole === HouseMemberRole.CPADMIN;
        }

        get() {
            return lodash.clone(this._info);
        }

        setOperatorPanel() {

            this.group_modify.setVisible(false);
            this.group_info.setVisible(false);
            this.group_UPartner.setVisible(false)
            this.UImageSubTag.setVisible(false);
            this.UImageSubFirstTag.setVisible(false);

            if (this.isOwner()) {
                this.group_modify.setVisible(true);
                if (this._info.isjunior) {
                    this.UImageSubFirstTag.setVisible(false);
                } else {
                    this.UImageSubFirstTag.setVisible(true);
                }
            }

            if(this.isVitaAdmin()){
                if (this._info.isjunior) {
                    this.UImageSubFirstTag.setVisible(false);
                } else {
                    this.UImageSubFirstTag.setVisible(true);
                }
            }

            
            if (this.isPartner()) {
                if (this.isPartnerSelf) {
                    this.group_info.setVisible(true);
                    this.UImageSubTag.setVisible(false);
                } else {
                    if (this._info.isjunior) {
                        this.group_UPartner.setVisible(true)
                        this.UImageSubTag.setVisible(true);
                    } else {
                        this.UImageSubTag.setVisible(false);
                        // this.UImageSubFirstTag.setVisible(true);
                    }

                }
            }

        }

        private FloatNumber(num: number) {

            return Math.floor( ((+num)/100)*100) / 100;
            /*
            let num1 = num / 10;
            let num2 = num / 100;

            if (num2.toString().indexOf(".") === -1)
                return num2.toString()

            num1 = (num1 | 0) / 10;
            if (num1.toString().indexOf(".") === -1)
                return num2.toString();

            return num1.toString();*/
        }


        private fidindex;
        private daytype;
        setFilter({ fidindex, daytype }) {
            this.fidindex = fidindex;
            this.daytype = daytype;
            if (fidindex === -1) {
                this.label_single_income.setString("--")
            }
        }


        isOwner() {
            let role = tea.mod.__teaHouseInfo.urole;
            return role === HouseMemberRole.OWNER;
        }



        expLevel(exp){
            exp = +exp;
            if( exp<5e5)
                return "青铜级"
            if(exp>=5e5 && exp<15e5)
                return "白银级"
            if(exp>=15e5 && exp<3e6)
                return "黄金级"
            if(exp>=3e6 && exp<55e5)
                return "铂金级"
            if(exp>=55e5 && exp<85e5)
                return "钻石级"
            if(exp>=85e5 && exp<125e5)
                return "星耀级"
            if(exp>=125e5)
                return "王者级"

            return "青铜级"
        }

        setInfo(data: Data_HousePartnerStatItem) {

            if (lodash.isEmpty(data) || lodash.isNull(data)) {
                return this.reset();
            }

            this._info = data;
            this.isPartnerSelf = data.uid === tea.mod.__teaHouseInfo.uid;
            this.label_name.setString(data.uname);
            this.label_id.setString(data.uid.toString());
            this.label_total.setString(this.FloatNumber(data.totalprofit).toString());
            this.label_youxiao.setString(data.validtimes.toString());
            this.lbSuper.setString(data.bigvalidtimes.toString());
            this.label_rank.setString(this.expLevel(this.FloatNumber(data.exp)));
            //191231比赛分需要除以100
            //this.label_change.setString((data.changeprofit / 100).toString());

            if (this.isOwner()) {
                this.label_single_income.setString((~data.royalty === 0) ? "0" : this.FloatNumber(data.royalty).toString());
            } else {
                this.label_single_income.setString((~data.royalty === 0) ? "--" : this.FloatNumber(data.royalty).toString());
            }

            // if (this.isOwner() === false && this.isPartnerSelf === false)
            //     this.label_all_income.setString("--");
            // else
                this.label_all_income.setString(this.FloatNumber(data.subordinateprofit).toString());

            NetImage.setPlayerHead(this.img_head, data.uurl, data.ugender, (url) => {
                if (!data) { return false; }
                if (url !== data.uurl) {
                    return false;
                }
                return true;
            });

            this.setOperatorPanel()
            this._call.forEach(v => { v() });
        }

        private _call = []
        addSetInfoCallBack(fn) {
            if (this._call.indexOf(fn) === -1)
                this._call.push(fn)
        }

        private _index = 0
        setIndex(index: number) {
            this._index = index
        }
        getIndex(): number {
            return this._index;
        }


    }

    const timeSortKeys = {
        0: "1d",
        "-1": "2d",
        "-2": "3d",
        "-3": "4d",
        "-4": "5d",
        "-5": "6d",
        "-6": "7d",
        "1d": 0,
        "2d": -1,
        "3d": -2,
        "4d": -3,
        "5d": -4,
        "6d": -5,
        "7d": -6
    };

    export class PropotionIncomePanel {

        selectMgr: MemberSelectWidget = null
        searchMgr: MemSearchWidget = null;
        cellMod: ccui.Widget = null;
        btn_history_record:ccui.Button = null;
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

                if (this._page.isVisible() === false) {
                    this.initQuery()
                    this._page.setVisible(true);
                    this.tipBG.setVisible(false);
                    this.tipContent.setVisible(false);
                }


            } else {
                this._page.setVisible(false);
            }
        }

        //new Date(this.subDayTime(i)).Format("MM-dd")
        subDayTime(sd: number = 0) {
            let todayStr = Date.format("yyyy-MM-dd")
            let todayTime = Math.floor(new Date(todayStr).getTime() / 1000);
            todayTime -= sd * 24 * 60 * 60;
            console.log(todayTime)
            return todayTime * 1000;
        }

        timeType: number = 0;

        layout_time_group: cc.Node = null;
        ScrollView_Detail: ccui.ScrollView = null;
        SV_pullList: common.PullList = null;
        noPartner_text: ccui.Text = null;
        tip_pop_dialog: ccui.Layout = null;
        tipBG: ccui.Layout = null;
        tipContent: ccui.Layout = null;
        ranktip:ccui.Button = null;
        ranktipContent:ccui.Layout = null;
        ranktipbg:ccui.Layout = null;
        private daytypeRecord = 0;
        initWithNode(pagePartner: cc.Node, searchMgr: MemSearchWidget, cellMod: ccui.Widget) {
            let self = this;
            pagePartner.setPosition(0, 0);
            this._page = pagePartner;
            this.searchMgr = searchMgr;
            this.cellMod = cellMod
            this.noPartner_text = ccui.helper.seekWidgetByName(<ccui.Widget>this._page, "noPartner_text");

            this.ScrollView_Detail = ccui.helper.seekWidgetByName(<ccui.Widget>this._page, "ScrollView_Detail");
            this.tip_pop_dialog = ccui.helper.seekWidgetByName(<ccui.Widget>this._page, "tip_group");
            this.btn_history_record = ccui.helper.seekWidgetByName(<ccui.Widget>this._page, "Button_4");

            let tipButton: ccui.Layout = ccui.helper.seekWidgetByName(<ccui.Widget>this.tip_pop_dialog, "member_tip");
            this.tipContent = ccui.helper.seekWidgetByName(<ccui.Widget>this.tip_pop_dialog, "member_tip_content");
            this.tipBG = ccui.helper.seekWidgetByName(<ccui.Widget>this._page, "tipbg");            

            this.tipContent.setVisible(false);
            tipButton.on(kaayou.TouchEvent.TouchEnd, () => {
                let vis = !this.tipContent.isVisible();
                this.tipContent.setVisible(vis)
                if (vis)
                    this.tipBG.setVisible(true);
            }, this)


            this.tipBG.on(kaayou.TouchEvent.TouchEnd, () => {
                this.tipContent.setVisible(false);
                if (this.tipBG.isVisible())
                    this.tipBG.setVisible(false);
            }, this)


            let btn_sort_rank:ccui.Layout = ccui.helper.seekWidgetByName(<ccui.Widget>this._page, "btn_sort_rank");
            this.ranktip = ccui.helper.seekWidgetByName(<ccui.Widget>btn_sort_rank, "tip");
            this.ranktipContent = ccui.helper.seekWidgetByName(<ccui.Widget>this._page, "tip_rank_context");
            this.ranktipbg = ccui.helper.seekWidgetByName(<ccui.Widget>this._page, "tiprankbg");

            this.ranktip.on(kaayou.TouchEvent.TouchEnd,()=>{
                this.ranktipbg.setVisible(true);
                this.ranktipContent.setVisible(true)
            },this)

            this.ranktipbg.on(kaayou.TouchEvent.TouchEnd,()=>{
                this.ranktipContent.setVisible(false);
                this.ranktipbg.setVisible(false);
            },this)

            this.btn_history_record.on(kaayou.TouchEvent.TouchEnd,()=>{
                kaayou.TouchMask.addTouchMask({ soundtype: kaayou.SoundType.NORMAL });
                kaayou.emit("tea",'mod::FcmPartner::DeletedHistory');
            },this)

            this.searchMgr.clearString();

            kaayou.getController('teaMem').on('ui::PropotionPanel::Search', function (e: kaayou.Event) {
                if (self._page.isVisible()) {
                    self.query({ fidindex: this.selectMgr.getCurSelect(), daytype: self.daytypeRecord, searchkey: self.searchMgr.getSearchString() })
                }
            }, this, 10);

            kaayou.getController('teaMem').on('ui::PropotionIncomePanel::reflash', () => {
                if (self._page.isVisible())
                    self.query({ fidindex: this.selectMgr.getCurSelect(), daytype: self.daytypeRecord, searchkey: self.searchMgr.getSearchString() })
            }, this);


            kaayou.getController('teaMem').on('ui::PropotionPanel::SubpageChange', this.onSubpageChange, this);

            this.initFilter();

            this.SV_pullList = new common.PullList()
            this.SV_pullList.setSpacingY(10)
            this.SV_pullList.initWithNode(this.ScrollView_Detail)
            this.SV_pullList.setAdpter({
                getCell: () => {
                    let item = new PartnerIncomeCell();
                    item.initWithNode(self.cellMod);
                    item.addSetInfoCallBack(function () {
                        item.setFilter({ fidindex: self.selectMgr.getCurSelect(), daytype: self.daytypeRecord });
                    })
                    return item;
                },
                datas: []
            });



            this.SV_pullList.on(kaayou.PullListEvent.HeadFinish, (e: kaayou.PullListEvent) => {
                setTimeout(() => {
                    kaayou.emit('teaMem', 'ui::PropotionIncomePanel::reflash')
                }, 500);

            }, this);
            this.SV_pullList.on(kaayou.PullListEvent.FootFinish, (e: kaayou.PullListEvent) => {
                setTimeout(() => {
                    kaayou.emit('teaMem', 'ui::PropotionIncomePanel::reflash')
                }, 500);
            }, this);



            this.SV_pullList.initPullEnv();
        }

        private initFilter() {
            let self = this;
            //时间参数修改

            this.layout_time_group = ccui.helper.seekWidgetByName(<ccui.Widget>this._page, "time_group");

            let childs = this.layout_time_group.getChildren()
            let last2 = childs.slice(2);
            let vorder  = [0,-1,-2,-3,-4,-5,-6,-7]
            let order = [3,4,5,6,7]

            last2.forEach((v,i)=>{
                let time = this.subDayTime(order[i]-1)
                let node_time =<ccui.Text>v.getChildByName("time");
                node_time.setString(new Date(time).Format("MM-dd"));
            })

            lodash.forEach(childs, (v: ccui.Layout, i: number) => {
                //   v["sortName"] = timeSortKeys[i];
                let selfSortName = timeSortKeys[vorder[i]];
                v.on(kaayou.TouchEvent.TouchEnd, (e: kaayou.TouchEvent) => {
                    let sortName = selfSortName;
                    kaayou.emit("teaMem", "ui::PropotionPanel::time::change", { index: i });
                }, this)

                v['updateByType'] = function (index) {
                    if (selfSortName != timeSortKeys[vorder[index] ]) {
                        v.getChildByName("cbg").setVisible(false);
                        Patch.ChangeTextColor(this.getChildByName("time"), null, cc.color(100, 180, 241))
                    } else {
                        v.getChildByName("cbg").setVisible(true);
                        Patch.ChangeTextColor(this.getChildByName("time"), null, cc.color(31, 95, 152))
                    }
                }

                kaayou.getController("teaMem").on("ui::PropotionPanel::time::change", (e: kaayou.Event) => {
                    let { index } = e.data;
                    v['updateByType'](index);
                    self.daytypeRecord = vorder[index];
                    if (selfSortName === timeSortKeys[vorder[index]])
                        self.query({ daytype: vorder[index] })
                }, v);

            });


            //楼层插件
            this.selectMgr = new MemberSelectWidget();
            this.selectMgr.initWidthNode(ccui.helper.seekWidgetByName(<ccui.Widget>self._page, "selectR_layout"), self._page, () => {
                self.query({ fidindex: this.selectMgr.getCurSelect(), daytype: self.daytypeRecord })
            });

        }


        private initQuery() {
            if (!!!tea.mod.__teaHouseInfo || !!!tea.mod.__teaHouseInfo.hfloorids) {
                return;
            }
            this.selectMgr.setCurSelect(-1);
            this.selectMgr.setItemsCount(tea.mod.__teaHouseInfo.hfloorids.length + 1);
            this.searchMgr.clearString();
            kaayou.emit("teaMem", "ui::PropotionPanel::time::change", { index: 0 });
        }

        query({ fidindex, daytype, searchkey }: any) {
            let hid = tea.mod.__teaHouseInfo.hid;
            let isPartner = tea.mod.__teaHouseInfo.urole === HouseMemberRole.CAPTAIN;
            if (searchkey === void 0)
                searchkey = this.searchMgr.getSearchString();

            if (fidindex === void 0)
                fidindex = this.selectMgr.getCurSelect();

            if (isPartner)
                this.pullPartnerList({ hid, fidindex, daytype, searchkey })
            else if(this.isOwner() || tea.mod.__teaHouseInfo.vitamin_admin)//200302裁判也能看战队统计
                this.pullList({ hid, fidindex, daytype, searchkey })
            else
                this.cleanList()
        }


        private cleanList() {
            this.SV_pullList.getAdpter().datas = []
            this.SV_pullList.refresh();
        }

        async pullPartnerList({ hid, daytype, fidindex, searchkey }: any) {
            let res = await kaayou.sendMessage('lobby', "houseparnterfloorjuniorstatistics", { hid, daytype, fidindex, searchkey }, "ws::Msg::houseparnterfloorjuniorstatistics");

            if (res.errcode) {
                kaayou.emit('common', 'ui::Toast::Show', {
                    msg: res.msg || "获取数据失败，请重试!"
                })
                this.cleanList()
                return;
            }

            if (!res.items || res.items.length === 0) {
                this.noPartner_text.setVisible(true)
                this.cleanList()
                return;
            }
            this.noPartner_text.setVisible(false)


            this.SV_pullList.getAdpter().datas = lodash.clone(res.items);
            this.SV_pullList.refresh();
        }

        async pullList({ hid, daytype, fidindex, searchkey }: any) {

            let res = await kaayou.sendMessage('lobby', "houseparnterfloorstatistics", { hid, daytype, fidindex, searchkey }, "ws::Msg::houseparnterfloorstatistics");

            if (res.errcode) {
                kaayou.emit('common', 'ui::Toast::Show', {
                    msg: res.msg || "获取数据失败，请重试!"
                })
                this.cleanList()
                return;
            }


            if (!res.items || res.items.length === 0) {
                this.noPartner_text.setVisible(true)
                this.cleanList()
                return;
            }

            this.noPartner_text.setVisible(false)


            this.SV_pullList.getAdpter().datas = lodash.clone(res.items);
            this.SV_pullList.refresh();

        }

        isOwner() {
            let role = tea.mod.__teaHouseInfo.urole;
            return role === HouseMemberRole.OWNER;
        }

    }

}