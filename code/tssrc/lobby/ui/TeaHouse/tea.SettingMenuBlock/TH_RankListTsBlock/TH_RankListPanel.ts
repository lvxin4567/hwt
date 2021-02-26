/**
 *  排行榜设置
 */

namespace tea {
    const { doBindEvent, BindEvent } = kaayou._decorator;

    export class tea_RankListPanelMgr {
        static __INS__: tea_RankListPanelMgr = null;
        static getInstance(_zOrder: number) {
            if (tea_RankListPanelMgr.__INS__ == null) {
                tea_RankListPanelMgr.__INS__ = new tea_RankListPanelMgr();
                tea_RankListPanelMgr.__INS__.init();
                tea_RankListPanelMgr.__INS__._zOrder = _zOrder
            }
            return tea_RankListPanelMgr.__INS__;
        }
        __selfPanel: RankListPanel = null;
        _zOrder: number = 0
        init() {
            let self = this;
            this.__selfPanel = null;
            // kaayou.getController('tea').on('ui::TeaHouse::UpdateInfo', function (e: kaayou.Event) {
            //     self.getPanel(false) && self.getPanel(false).onTeaHouseUpdateInfo();
            // }, this, 10);

            kaayou.getController('tea').on('ui::RankListPanel::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show(e.data);
            }, this, 10);
            kaayou.getController('tea').on('ui::RankListPanel::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new RankListPanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel, this._zOrder);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }

    }



    export class RankListPanel extends kaayou.ModelLayer {
        constructor() {
            super();
            this.initUI();
        }
        btn_close: ccui.Button = null;
        btn_set: ccui.Button = null;
        singleTile_image: ccui.ImageView = null;
        title_layout: ccui.Layout = null;
        title_layout_Group: common.RadioGroup = null
        title_layoutNum: number = 0;
        timeSelect_layout: ccui.Layout = null;
        timeSelectNum: number = 0
        timeSelect_group: common.RadioGroup = null;
        list: common.PullList = null; //成员列表
        cell: ccui.Layout = null;
        label_result: ccui.Text = null;
        label_topMem: ccui.Text = null;
        _rankData: { rank_round: number, "rank_winer": number, "rank_record": number, "rank_open": boolean } = null
        // @doBindEvent
        initUI() {
            this.initWithccs(tea.res.RankListPanel_json);
            this.isTouchMaskHide = false;
            let self = this;
            this.btn_close = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_close");
            this.label_result = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "rankType_num");
            this.label_topMem = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_topMem");
            this.singleTile_image = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "singleTile_image");
            this.singleTile_image.setVisible(false);
            this.title_layout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "title_layout");
            this.title_layout.setPadding({ spacingX: 0 });
            this.title_layout.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Horizontal);
            this.title_layout.setHorizontal(ccui.Layout.LayoutHorizontal.LEFT);
            this.title_layout.doChildrenLayout();
            this.title_layout_Group = new common.RadioGroup();
            lodash.forEach(this.title_layout.getChildren(), function (v: ccui.CheckBox, i) {
                v["type"] = i
                v.on(kaayou.RadioEvent.SELECTED, function () {
                    (<ccui.ImageView>(v.getChildByName("Image_on"))).setVisible(true);
                    // 局数排行榜：0  赢家排行榜 ：1  战绩排行榜 ： 2
                    self.rank_Type = v["type"];

                    self.getRankList(self.rank_Type, self.timeSelectNum, true);
                }, self);
                v.on(kaayou.RadioEvent.UNSELECTED, function () {
                    (<ccui.ImageView>(v.getChildByName("Image_on"))).setVisible(false);
                }, self);
                self.title_layout_Group.add(v);
            });

            this.btn_close.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.Hide();
            }, this);

            this.timeSelect_group = new common.RadioGroup();
            this.timeSelect_layout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "timeSelect_layout");
            lodash.forEach(this.timeSelect_layout.getChildren(), function (v: ccui.CheckBox, i) {
                v['index'] = i;
                if (i == 1) {
                    v['index'] = -1;
                }
                v.on(kaayou.RadioEvent.SELECTED, function () {
                    (<ccui.Text>(v.getChildByName("Text"))).setTextColor(cc.color("#D33A25"));
                    self.timeSelectNum = v['index'];
                    self.getRankList(self.rank_Type, self.timeSelectNum, true);


                    //取调用相关的接口
                }, self);
                v.on(kaayou.RadioEvent.UNSELECTED, function () {
                    (<ccui.Text>(v.getChildByName("Text"))).setTextColor(cc.color("#93692D"));
                }, self);
                self.timeSelect_group.add(v);
            });

            this.list = new common.PullList();
            this.list.setSpacingY(8);
            this.cell = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "tea_call_info_item");
            this.list.initWithNode(<cc.Node>ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "content"));



            this.list.setFootDoingText("上拉刷新");
            this.list.setFootDidFinishText("松开刷新");
            this.list.setFootFinishText("正在刷新");
            this.list.setAdpter({
                getCell: () => {
                    let v = new rankCell();
                    v.initWithNode(self.cell);
                    return v;
                },
                datas: []
            });

            this.list.on(kaayou.PullListEvent.HeadFinish, (e: kaayou.PullListEvent) => {
                let target = e.target;
                setTimeout(() => {
                    self.getRankList(self.rank_Type, self.timeSelectNum, true);
                }, 500);
            }, this);
            this.list.on(kaayou.PullListEvent.FootFinish, (e: kaayou.PullListEvent) => {
                let target = e.target;
                setTimeout(() => {
                    self.list.refresh();
                }, 500);
            }, this);

            this.list.initPullEnv();

            kaayou.getController('tea').on('ui::ranklist::updateList', function (e: kaayou.Event) {
                let data: { list: proto_houserankinfoget_res, update: boolean } = e.data
                if (data) {
                    if (data.update) {
                        if (data.list) {
                            let redata: Array<proto_houserankinfoget_res> = lodash.clone(data.list);
                            self.list.getAdpter().datas = redata;
                        } else {
                            self.list.getAdpter().datas = [];
                        }
                    } else {
                        self.list.getAdpter().datas = [];
                    }
                } else {
                    self.list.getAdpter().datas = [];
                }
                self.list.refresh();
            }, this, 10);

            this.Hide();
        }

        getRankList(rankType: number, timeType: number, clear: boolean) {
            let authNum = 0
            if (rankType == 0) {
                authNum = this._rankData.rank_round;
                if (!tea.mod._isMaster()) {
                    this.label_result.setString(this._rankData.rank_round & 4 ? "玩家信息" : "对局次数");
                    this.label_topMem.setVisible(!!!(this._rankData.rank_round & 4));    
                }else{
                    this.label_result.setString("对局次数");
                }
            } else if (rankType == 1) {
                authNum = this._rankData.rank_winer;
                if (!tea.mod._isMaster()) {
                    this.label_result.setString(this._rankData.rank_winer & 4 ? "玩家信息" : "大赢家次数");
                    this.label_topMem.setVisible(!!!(this._rankData.rank_winer & 4));
                }else{
                    this.label_result.setString("大赢家次数");
                }

 
            } else {
                authNum = this._rankData.rank_record;
                if (!tea.mod._isMaster()) {
                    this.label_result.setString(this._rankData.rank_record & 4 ? "玩家信息" : "总战绩");
                    this.label_topMem.setVisible(!!!(this._rankData.rank_record & 4));
                }else{
                    this.label_result.setString("总战绩");
                }
            
            }
            kaayou.emit("tea", 'mod::TeaHouse::GetRanklist', { daytype: timeType, sorttype: rankType, clear: clear, authNum: authNum });
        }
        imageArr = [];
        initShowUI(data: { rank_round: number, "rank_winer": number, "rank_record": number, "rank_open": boolean }) {
            let self = this;
            this._rankData = data;
            let last_month = new Date().getMonth();
            
            last_month = ((last_month == 0) ? (12) : (last_month));
            (<ccui.Text>(this.timeSelect_layout.getChildByName("monthCb").getChildByName("Text"))).setString(last_month + "月");
            console.log(last_month);
            let i = 0   //判断开启了几个排行榜
            self.imageArr = [];
            if (data.rank_round & 1 || tea.mod._isMaster()) {
                self.imageArr.push({ off: "TH_RankLIst_font1.png", on: "TH_RankLIst_font4.png", type: 0, result_name: "对局次数",title_name:"对局排行榜" });
            }
            if (data.rank_winer & 1 || tea.mod._isMaster()) {
                self.imageArr.push({ off: "TH_RankLIst_font0.png", on: "TH_RankLIst_font3.png", type: 1, result_name: "大赢家次数" ,title_name:"大赢家排行榜"});
            }
            if (data.rank_record & 1 || tea.mod._isMaster()) {
                self.imageArr.push({ off: "TH_RankLIst_font2.png", on: "TH_RankLIst_font5.png", type: 2, result_name: "总战绩" ,title_name:"战绩排行榜"});
            }
            console.log(i);
            if (self.imageArr.length == 1) {
                this.title_layout.setVisible(false);
                this.singleTile_image.setVisible(true);
                (<ccui.TextBMFont>this.singleTile_image.getChildByName("font")).setString(self.imageArr[0].title_name);
            } else if (self.imageArr.length == 2) {
                this.title_layout.setVisible(true);
                this.title_layout.getChildren()[1].setVisible(false)
                this.singleTile_image.setVisible(false);
                this.title_layout.getChildren()[0]["type"] = self.imageArr[0].type;
                this.title_layout.getChildren()[2]["type"] = self.imageArr[1].type;
                this.title_layout.getChildren()[0].getChildren().forEach((v: ccui.ImageView, i) => {
                    if (i) {
                        v.loadTexture(self.imageArr[0].on, ccui.Widget.PLIST_TEXTURE)
                    } else {
                        v.loadTexture(self.imageArr[0].off, ccui.Widget.PLIST_TEXTURE)
                    }

                    v.ignoreContentAdaptWithSize(true);
                })

                this.title_layout.getChildren()[2].getChildren().forEach((v: ccui.ImageView, i) => {
                    if (i) {
                        v.loadTexture(self.imageArr[1].on, ccui.Widget.PLIST_TEXTURE)
                    } else {
                        v.loadTexture(self.imageArr[1].off, ccui.Widget.PLIST_TEXTURE)
                    }
                    v.ignoreContentAdaptWithSize(true);
                });
                (<ccui.CheckBox>(this.title_layout.getChildren()[0])).setSelected(true);
                (<ccui.CheckBox>(this.title_layout.getChildren()[0])).getChildByName("Image_on").setVisible(true);
                (<ccui.CheckBox>(this.title_layout.getChildren()[2])).getChildByName("Image_on").setVisible(false);

                this.title_layout.doChildrenLayout();
            } else {
                let func = function (V, J) {
                    V.getChildren().forEach((v: ccui.ImageView, i) => {
                        if (i) {
                            v.loadTexture(self.imageArr[J].on, ccui.Widget.PLIST_TEXTURE)
                        } else {
                            v.loadTexture(self.imageArr[J].off, ccui.Widget.PLIST_TEXTURE)
                        }
                        v.ignoreContentAdaptWithSize(true);

                    })
                }

                lodash.forEach(this.title_layout.getChildren(), function (v: ccui.CheckBox, i) {
                    v["type"] = i;
                    func(v, i);
                    (<ccui.CheckBox>(self.title_layout.getChildren()[i])).getChildByName("Image_on").setVisible(false);
                    (<ccui.CheckBox>(self.title_layout.getChildren()[i])).setSelected(false);
                    if (i == 0) {
                        (<ccui.CheckBox>(self.title_layout.getChildren()[i])).getChildByName("Image_on").setVisible(true);
                        (<ccui.CheckBox>(self.title_layout.getChildren()[i])).setSelected(true);
                    }
                });
                this.title_layout.setVisible(true);
                this.singleTile_image.setVisible(false);
                this.title_layout.getChildren()[1].setVisible(true);
                this.title_layout.doChildrenLayout();
            }
            this.rank_Type = self.imageArr[0].type;
            this.label_result.setString("" + self.imageArr[0].result_name);
        }

        rank_Type: number = 0;
        Show(data: { rank_round: number, "rank_winer": number, "rank_record": number, "rank_open": boolean }) {
            var self = this;
            //0是大赢家 1是对局  2是战绩TH_RankLIst_font3
            // 局数排行榜：0  赢家排行榜 ：1  战绩排行榜 ： 2
            // 今天：0   昨天：-1  周榜： 2  月榜： 3
            this.setVisible(true);
            this.initShowUI(data);

            kaayou.pop.showAni({
                cNode: this.node.getChildByName("contentPanel"),
                mNode: this.node.getChildByName("maskbg"),
                action: function () {
                    (<ccui.CheckBox>self.timeSelect_layout.getChildren()[0]).setRadioSelected();
                    self.list.getAdpter().datas = [];
                    self.list.refresh();
                }
            });
        }




        Hide() {
            let self = this;
            kaayou.pop.hideAni(
                {
                    cNode: this.node.getChildByName("contentPanel"),
                    mNode: this.node.getChildByName("maskbg"),
                    rnode: this,
                    action: function () {
                        self.list.getAdpter().datas = [];
                        self.list.refresh();
                    }
                }
            )
        }

    }


    class rankCell extends kaayou.Block implements common.IPullListCell {
        constructor() {
            super();
        }

        head: ccui.ImageView;
        lb_name: ccui.Text;
        lb_uid: ccui.Text;
        countLabel: ccui.Text;
        floor: ccui.Text;
        rankImage: ccui.ImageView = null;
        rankCup: ccui.ImageView = null;
        _index = -1;
        img_head_default: ccui.ImageView = null;
        imageLayout: ccui.ImageView = null;
        setIndex(index) {
            this._index = index;
        }
        getIndex() {
            return this._index;
        }

        initWithNode(node: ccui.Widget) {

            super.initWithNode(node);
            let self = this;
            this.head = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "img_head")
            this.lb_name = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_name")
            this.lb_uid = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_id")
            this.countLabel = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "countLabel");
            this.rankImage = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "rankImage");
            this.rankCup = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "rankCup");
            this.img_head_default = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "img_head_default");
            this.imageLayout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "HeadBg");
            this.img_head_default.setVisible(false);
            this.reset();
        }


        reset() {
            this.head.setVisible(false);
            this.lb_name.setString("");
            this.lb_uid.setString("");
            this.countLabel.setString("");
            this.rankCup.setVisible(false);
            this.img_head_default.setVisible(false);
        }

        _data: proto_houserankinfoget_res = null;
        setInfo(data: proto_houserankinfoget_res) {
            if (lodash.eq(this._data, data)) { return; }
            var self = this;
            this._data = data;
            if (lodash.isEmpty(data)) {
                return this.reset();
            }
            this.lb_name.setString(kaayou.Identify.nickNameSubByLength(this._data.uname, 8, 5));
            this.lb_uid.setString("ID:" + this._data.uid.toString());
            this.img_head_default.setVisible(false);
            this.countLabel.setString("" + this._data.rank_num.toString());
            this.head.setVisible(true);
            NetImage.setPlayerHead(this.head, this._data.uurl, this._data.ugender, (url) => {
                if (!self._data) return false;
                if (url !== self._data.uurl) {
                    return false;
                }
                return true;
            });
            this.rankImage.setVisible(data.rankIndex >= 4);
            this.rankCup.setVisible(data.rankIndex < 4);
            if (data.rankIndex < 4) {
                this.rankCup.loadTexture("TH_RankLIstImageCup" + data.rankIndex + ".png", ccui.Widget.PLIST_TEXTURE);
            } else {
                (<ccui.Text>this.rankImage.getChildByName("rankNum")).setString("" + data.rankIndex);
            }
            let myID = lobby.mod.User.getInstance().getUserInfo().uid;
            if (data.authNum & 2) {  // 隐藏信息  
                // if (!!!(tea.mod.__teaHouseInfo.teahouserule & HouseRoleTable.VIEW_STAT_RECORD_TEA_PLAY) && myID != data.uid ) {  
                //     let hideId = data.uid.toString().substring(0,data.uid.toString().length - 4) + "****";
                //     this.lb_name.setString("****");
                //     this.lb_uid.setString(hideId);
                //     this.img_head_default.setVisible(true);
                // }
                if (!tea.mod._isMaster()) {
                    let hideId = data.uid.toString().substring(0, data.uid.toString().length - 4) + "****";
                    this.lb_name.setString("****");
                    this.lb_uid.setString(hideId);
                    this.img_head_default.setVisible(true);
                }
            }

            if (data.authNum & 4) {  //隐藏后面的结果
                // if (!!!(tea.mod.__teaHouseInfo.teahouserule & HouseRoleTable.VIEW_STAT_RECORD_TEA_PLAY) && myID != data.uid) {
                //     this.countLabel.setString("****");
                // }
                if (!tea.mod._isMaster()) {
                    this.imageLayout.setPositionX(690.00);
                    this.countLabel.setVisible(false);
                }else{
                    this.imageLayout.setPositionX(390.00);
                    this.countLabel.setVisible(true);
                }

            } else {
                this.imageLayout.setPositionX(390.00);
                this.countLabel.setVisible(true);
            }
        }

    }



}