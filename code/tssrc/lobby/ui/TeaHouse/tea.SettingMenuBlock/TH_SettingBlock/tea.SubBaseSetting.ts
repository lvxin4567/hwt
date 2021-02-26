namespace tea {



    const baseSetInfo = [
        {
            decImg: "14.png",
            title: "修改名称",
            type: "ModifyName",
            clickImg: "8.png",
            dec: "修改亲友圈名称，限制2-8个字，支持数字、字母和汉字。",
            urightKey: "",
        },
        {
            decImg: "4.png",
            title: "公告设置",
            type: "NoticeSet",
            clickImg: "2.png",
            dec: "设置滚动、弹窗公告，限制2-30个字，支持数字、字母和汉字。",
            urightKey: "set_notice",
        },
        {
            decImg: ".png",
            title: "背景设置",
            type: "TeaBgSet",
            clickImg: "6.png",
            dec: "设置亲友圈大厅的背景图片。",
            urightKey: "set_background",
        },
        {
            decImg: "10.png",
            title: "牌桌颜色设置",
            type: "TableBgSet",
            clickImg: "6.png",
            dec: "设置亲友圈大厅中每个楼层牌桌的颜色。",
            urightKey: "set_table_color",
        },
        {
            decImg: "15.png",
            title: "隐私设置",
            type: "PrivacySet",
            clickImg: "12.png",
            dec: "设置成员列表、圈号、玩家头像等相关信息的隐藏显示。",
            urightKey: "set_privacy",
        },
        {
            decImg: "9.png",
            title: "牌桌显示",
            type: "TableShowNum",
            clickImg: "6.png",
            dec: "设置混厅模式下能显示的最大游戏桌数。",
            urightKey: "set_table_num"
        },
        {
            decImg: "12.png",
            title: "入桌设置",
            type: "JoinTableSet",
            clickImg: "6.png",
            dec: "勾选后成员入桌只能使用快速开始进入游戏。",
            urightKey: "set_join_table"
        },
        {
            decImg: "8.png",
            title: "距离设置",
            type: "DistanceSet",
            clickImg: "6.png",
            dec: "设置玩家入桌时“距离过近”的检测距离。",
            urightKey: "set_distance",
        },
        {
            decImg: "1.png",
            title: "低分局设置",
            type: "LowScoreSet",
            clickImg: "1.png",
            dec: "低分局不包含在大赢家统计内，但总战绩和总人次中仍会统计。",
            urightKey: "set_low_score"
        },
        {
            decImg: "3.png",
            title: "房卡",
            type: "LowCardSet",
            clickImg: "6.png",
            dec: "当圈主房卡小于等于设定值时会给出温馨提示框，0值则不弹窗。",
            urightKey: "set_card_remind"
        },
        {
            decImg: "6.png",
            title: "加入设置",
            type: "JoinTeaSet",
            clickImg: "6.png",
            dec: "设置玩家加入亲友圈时是否需要审核。",
            urightKey: "set_join_tea"
        },
        {
            decImg: "13.png",
            title: "退出设置",
            type: "ExitTeaSet",
            clickImg: "6.png",
            dec: "设置玩家退出亲友圈时是否需要进行审核。",
            urightKey: "set_out_tea"
        },
        {
            decImg: "2.png",
            title: "队长权限",
            type: "CaptainAuthSet",
            clickImg: "6.png",
            dec: "设置队长针对玩家管理的权限。",
            urightKey: "set_captain_right"
        },
        {
            decImg: "16.png",
            title: "队长设置其玩家为队长权限",
            type: "CaptainSetCaptain",
            clickImg: "6.png",
            dec: "设置队长是否可以设置玩家为队长的权限。",
            urightKey: ""
        },
        {
            decImg: "17.png",
            title: "战绩时段筛选",
            type: "recordTimeSelect",
            clickImg: "6.png",
            dec: "战绩页面的数据将按照设定挡位进行数据筛选。",
            urightKey: ""
        },
        {
            decImg: "7.png",
            title: "禁用微信",
            type: "NoWechat",
            clickImg: "6.png",
            dec: "开启禁用后，亲友圈分享将不可分享至微信。",
            urightKey: "ban_wx_tea",
        },
        {
            decImg: "5.png",
            title: "黑名单设置",
            type: "BlickListSet",
            clickImg: "5.png",
            dec: "查看修改黑名单中的成员。",
            urightKey: "set_blacklist_tea",
        },
        {
            decImg: "11.png",
            title: "圈冻结",
            type: "TeaFrozeSet",
            clickImg: "6.png",
            dec: "冻结亲友圈后，所有成员将无法入桌游戏。",
            urightKey: "ban_tea"
        },
        {
            decImg: "19.png",
            title: "战绩详情归属",
            type: "RecordDetailBind",
            clickImg: "6.png",
            dec: "战绩详情中显示玩家的归属信息。",
            urightKey: ""
        },
        {
            decImg: "18.png",
            title: "排行榜设置",
            type: "RankListSet",
            clickImg: "14.png",
            dec: "可设置对圈玩家展示对局榜、赢家榜、战绩榜的榜单信息。",
            urightKey: ""
        },
    ]

    class TH_BaseSet_Cell extends kaayou.Block implements common.IPullListCell {
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

        decImg: ccui.ImageView = null;   //头像
        cell_title: ccui.Text = null;   //用户名称标签
        cell_dec: ccui.Text = null;   //用户id标签
        type_layout: ccui.Layout = null;  // 显示类型
        Img_Click: ccui.ImageView = null //点击
        //--------修改圈名
        edit_TeaName: any = null;
        edit_TeaName_input: ccui.TextField = null;
        //--------设置显示多少桌
        TableShowNum_layout: ccui.Layout = null;
        TableShowNum_Group: common.RadioGroup = null;
        TableShowNum: number = 0;
        //--------只允许使用快速加入
        JoinTableSet_layout: ccui.Layout = null;
        //加入设置
        JoinTeaSet_layout: ccui.Layout = null;
        JoinTeaSet_Group: common.RadioGroup = null;
        JoinTeaSetNum: number = 0
        //退出设置
        ExitTeaSet_layout: ccui.Layout = null;
        ExitTeaSet_Group: common.RadioGroup = null;
        ExitTeaSetNum: number = 0
        //队长权限
        CaptainAuthSet_layout: ccui.Layout = null;
        //队长设置下级队长
        CaptainSetCaptain_layout: ccui.Layout = null;
        CaptainSetCaptain_Group: common.RadioGroup = null;
        CaptainSetCaptainNum: number = 0
        //亲友圈冻结解冻
        TeaFrozeSet_layout: ccui.Layout = null;
        TeaFrozeSet_Group: common.RadioGroup = null;
        TeaFrozeSetNum: number = 0;
        //设置距离
        edit_Distance: any = null;
        edit_Distance_input: ccui.TextField = null;
        //设置距离
        edit_lowCard: any = null;
        edit_lowCard_input: ccui.TextField = null;
        //禁用微信
        NoWechat_layout: ccui.Layout = null;
        NoWechat_Group: common.RadioGroup = null;
        NoWechatNum: number = 0

        //战绩时段筛选
        recordTimeSelect_layout: ccui.Layout = null;
        recordTimeSelect_Group: common.RadioGroup = null;
        recordTimeSelectNum: number = 0
        radioDict = { 3: 0, 6: 1, 8: 2, 12: 3 };
        numDict = { 0: 3, 1: 6, 2: 8, 3: 12 };

        //战绩详情归属
        recordDetailBind_layout: ccui.Layout = null;
        recordDetailBind_Group: common.RadioGroup = null;
        recordDetailBindNum: number = 0
        initWithNode(node: ccui.Widget) {
            let self = this;
            super.initWithNode(node);
            this.decImg = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "decImg");
            this.cell_title = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "cell_title");
            this.cell_dec = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "cell_dec");
            this.type_layout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "type_layout");
            this.Img_Click = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Img_Click");
            this.Img_Click.on(kaayou.TouchEvent.TouchEnd, () => {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                console.log("点击了设置");
                self.emitEventWithType(self._data.type)

            }, this);
            kaayou.getController('tea').on('ui::TeaHouse::UpdateInfo', function (e: kaayou.Event) {
                if (!e.data) {
                    return;
                }
                //刷新需要刷新的列表

            }, this, 10);

            this.initCellUI();
        }

        initCellUI() {
            let self = this;
            //修改名称------------
            let attr = {
                "fontSize": 24,
                "fontColor": "#B97D55",
                "setInputMode": 6,
                "setMaxLength": 8,
                "setPlaceholderFontSize": 24,
            };
            // this.edit_TeaName = kaayou.editBox.attachTextEdit(this.node, "ModifyName_textInput", "", null, attr);
            this.edit_TeaName = kaayou.editBox.target(this.node);
            this.edit_TeaName_input = this.edit_TeaName.attachTextEdit("ModifyName_textInput", (str) => {
                let Tea_Info: Data_HouseInfo = tea.mod.__teaHouseInfo;
                if (!Tea_Info || !Tea_Info.hid) {
                    return;
                }
                if (kaayou.blackList.checkBlackList(str) != str) {
                    kaayou.emit("common", "ui::Toast::Show", { msg: "亲友圈名称违规，请重新输入" });
                    str = Tea_Info.hname;
                }
                console.log(str);
                this.edit_TeaName_input.setString(str.toString() || Tea_Info.hname);
            }, { fontColor: "#B97D55", fontSize: 24, allowEmpty: false, allowNavi: false, setMaxLength: 8, placeholdStr: "", })


            //修改设置显示多少桌------------
            this.TableShowNum_Group = new common.RadioGroup();
            this.TableShowNum_layout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "TableShowNum");
            lodash.forEach(this.TableShowNum_layout.getChildren(), function (v: ccui.CheckBox, i) {
                v['index'] = i;
                v.on(kaayou.RadioEvent.SELECTED, function () {
                    // kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                    self.TableShowNum = i;
                    (<ccui.Text>(v.getChildByName("Text"))).setTextColor(cc.color("#D33A25"));
                }, self);
                v.on(kaayou.RadioEvent.UNSELECTED, function () {
                    // kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                    (<ccui.Text>(v.getChildByName("Text"))).setTextColor(cc.color("#93692D"));
                }, self);
                self.TableShowNum_Group.add(v);
            });
            //只允许使用快速加入
            this.JoinTableSet_layout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "JoinTableSet");
            this.JoinTableSet_layout.getChildren()[0].on(kaayou.CheckEvent.SELECTED, self.onTextColorShow, this);
            this.JoinTableSet_layout.getChildren()[0].on(kaayou.CheckEvent.UNSELECTED, self.onTextColorShow, this);
            //加入亲友圈设置
            this.JoinTeaSet_Group = new common.RadioGroup();
            this.JoinTeaSet_layout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "JoinTeaSet");
            lodash.forEach(this.JoinTeaSet_layout.getChildren(), function (v: ccui.CheckBox, i) {
                if (i < 2) {
                    v['index'] = i;
                    v.on(kaayou.RadioEvent.SELECTED, function () {
                        (<ccui.Text>(v.getChildByName("Text"))).setTextColor(cc.color("#D33A25"));
                        self.JoinTeaSetNum = i;
                    }, self);

                    v.on(kaayou.RadioEvent.UNSELECTED, function () {
                        (<ccui.Text>(v.getChildByName("Text"))).setTextColor(cc.color("#93692D"));
                        console.log(i);
                    }, self);
                    self.JoinTeaSet_Group.add(v);
                }
            });
            this.JoinTeaSet_layout.getChildren()[2].on(kaayou.CheckEvent.SELECTED, self.onTextColorShow, this);
            this.JoinTeaSet_layout.getChildren()[2].on(kaayou.CheckEvent.UNSELECTED, self.onTextColorShow, this);


            //退出设置 茶楼
            this.ExitTeaSet_Group = new common.RadioGroup();
            this.ExitTeaSet_layout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "ExitTeaSet");
            lodash.forEach(this.ExitTeaSet_layout.getChildren(), function (v: ccui.CheckBox, i) {
                v['index'] = i;
                v.on(kaayou.RadioEvent.SELECTED, function () {
                    (<ccui.Text>(v.getChildByName("Text"))).setTextColor(cc.color("#D33A25"));
                    self.ExitTeaSetNum = i;
                    console.log(i);
                }, self);
                v.on(kaayou.RadioEvent.UNSELECTED, function () {
                    (<ccui.Text>(v.getChildByName("Text"))).setTextColor(cc.color("#93692D"));
                    console.log(i);
                }, self);
                self.ExitTeaSet_Group.add(v);
            });

            //队长权限
            this.CaptainAuthSet_layout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "CaptainAuthSet");
            lodash.forEach(this.CaptainAuthSet_layout.getChildren(), function (v: ccui.CheckBox, i) {
                v['index'] = i;
                v.on(kaayou.CheckEvent.SELECTED, self.onTextColorShow, self);
                v.on(kaayou.CheckEvent.UNSELECTED, self.onTextColorShow, self);
            });
            //队长设置下级队长权限
            this.CaptainSetCaptain_layout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "CaptainSetCaptain");
            this.CaptainSetCaptain_Group = new common.RadioGroup();
            lodash.forEach(this.CaptainSetCaptain_layout.getChildren(), function (v: ccui.CheckBox, i) {
                v['index'] = i;
                v.on(kaayou.RadioEvent.SELECTED, function () {
                    (<ccui.Text>(v.getChildByName("Text"))).setTextColor(cc.color("#D33A25"));
                    self.CaptainSetCaptainNum = i;
                    console.log(i);
                }, self);
                v.on(kaayou.RadioEvent.UNSELECTED, function () {
                    (<ccui.Text>(v.getChildByName("Text"))).setTextColor(cc.color("#93692D"));
                    console.log(i);
                }, self);
                self.CaptainSetCaptain_Group.add(v);
            });
            //圈冻结
            this.TeaFrozeSet_layout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "TeaFrozeSet");
            this.TeaFrozeSet_Group = new common.RadioGroup();
            lodash.forEach(this.TeaFrozeSet_layout.getChildren(), function (v: ccui.CheckBox, i) {
                v['index'] = i;
                v.on(kaayou.RadioEvent.SELECTED, function () {
                    (<ccui.Text>(v.getChildByName("Text"))).setTextColor(cc.color("#D33A25"));
                    self.TeaFrozeSetNum = i;
                    console.log(i);
                }, self);
                v.on(kaayou.RadioEvent.UNSELECTED, function () {
                    (<ccui.Text>(v.getChildByName("Text"))).setTextColor(cc.color("#93692D"));
                    console.log(i);
                }, self);
                self.TeaFrozeSet_Group.add(v);
            });

            //设置距离
            this.edit_Distance = kaayou.editBox.attachTextEdit(this.node, "distance_input", "", null, attr);
            this.edit_Distance = kaayou.editBox.target(this.node)

            // this.input_num =  ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "input_num");

            this.edit_Distance_input = this.edit_Distance.attachTextEdit("distance_input", (str) => {
                let Tea_Info: Data_HouseInfo = tea.mod.__teaHouseInfo;
                let num = str;
                num = num || Tea_Info.distance;
                console.log(num);
                this.edit_Distance_input.setString(num);
            }, { fontColor: "#B97D55", type: "int", fontSize: 24, allowEmpty: true, allowNavi: false })




            // this.edit_lowCard = kaayou.editBox.attachTextEdit(this.node, "LowCardSetinput", "", null, attr);
            this.edit_lowCard_input = this.edit_Distance.attachTextEdit("LowCardSetinput", (str) => {
                let Tea_Info: Data_HouseInfo = tea.mod.__teaHouseInfo;
                let num = str;
                num = num || Tea_Info.fangka_tips_min_num;
                console.log(num);
                this.edit_lowCard_input.setString(num);
            }, { fontColor: "#B97D55", type: "int", fontSize: 24, allowEmpty: true, allowNavi: false })

            //禁用微信
            this.NoWechat_Group = new common.RadioGroup();
            this.NoWechat_layout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "NoWechat");
            lodash.forEach(this.NoWechat_layout.getChildren(), function (v: ccui.CheckBox, i) {
                v['index'] = i;
                v.on(kaayou.RadioEvent.SELECTED, function () {
                    (<ccui.Text>(v.getChildByName("Text"))).setTextColor(cc.color("#D33A25"));
                    self.NoWechatNum = i;
                    console.log(i);
                }, self);
                v.on(kaayou.RadioEvent.UNSELECTED, function () {
                    (<ccui.Text>(v.getChildByName("Text"))).setTextColor(cc.color("#93692D"));
                    console.log(i);
                }, self);
                self.NoWechat_Group.add(v);
            });


            //时段赛
            this.recordTimeSelect_Group = new common.RadioGroup();
            this.recordTimeSelect_layout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "recordTimeSelect");
            lodash.forEach(this.recordTimeSelect_layout.getChildren(), function (v: ccui.CheckBox, i) {
                v['index'] = i;
                v.on(kaayou.RadioEvent.SELECTED, function () {
                    (<ccui.Text>(v.getChildByName("Text"))).setTextColor(cc.color("#D33A25"));
                    self.recordTimeSelectNum = i;
                }, self);
                v.on(kaayou.RadioEvent.UNSELECTED, function () {
                    (<ccui.Text>(v.getChildByName("Text"))).setTextColor(cc.color("#93692D"));
                    // console.log(i);
                }, self);
                self.recordTimeSelect_Group.add(v);
            });

            //战绩详情归属
            this.recordDetailBind_Group = new common.RadioGroup();
            this.recordDetailBind_layout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "RecordDetailBind");
            lodash.forEach(this.recordDetailBind_layout.getChildren(), function (v: ccui.CheckBox, i) {
                v['index'] = i;
                v.on(kaayou.RadioEvent.SELECTED, function () {
                    (<ccui.Text>(v.getChildByName("Text"))).setTextColor(cc.color("#D33A25"));
                    self.recordDetailBindNum = i;
                    console.log(i);
                }, self);
                v.on(kaayou.RadioEvent.UNSELECTED, function () {
                    (<ccui.Text>(v.getChildByName("Text"))).setTextColor(cc.color("#93692D"));
                    console.log(i);
                }, self);
                self.recordDetailBind_Group.add(v);
            });
        }

        onTextColorShow(e: kaayou.Event) {
            if (e.target.isSelected()) {
                <ccui.Text>(e.target.getChildByName("Text")).setTextColor(cc.color("#D33A25"));
            } else {
                <ccui.Text>(e.target.getChildByName("Text")).setTextColor(cc.color("#93692D"));
            }
        }

        reset() {
            this.decImg.setVisible(false);
            this.cell_title.setString("");
            this.cell_dec.setString("");
        }
        _data = null;
        setInfo(data) {
            // if (lodash.eq(this._data, data)) { return; }
            var self = this;
            this._data = data;
            if (lodash.isEmpty(data)) {
                return this.reset();
            }
            lodash.forEach(this.type_layout.getChildren(), function (v: ccui.Layout) {
                v.setVisible(false);
            })
            if (!!this.type_layout.getChildByName(data.type)) {
                this.type_layout.getChildByName(data.type).setVisible(true);
                self.showWithType(data.type);
            }
            this.cell_title.setString(data.title);
            this.cell_dec.setString(data.dec);
            this.decImg.loadTexture("TH_SettingBlockPanel_Cell_decImg" + data.decImg, ccui.Widget.PLIST_TEXTURE);
            this.Img_Click.loadTexture("TH_SettingBlockPanel_btn" + data.clickImg, ccui.Widget.PLIST_TEXTURE);
        }

        showWithType(type: string) {
            if (!tea.mod.__teaHouseInfo || !tea.mod.__teaHouseInfo.hid) {
                return;
            }
            let Tea_Info: Data_HouseInfo = tea.mod.__teaHouseInfo;
            switch (type) {
                case "ModifyName":
                    this.edit_TeaName_input.setString(Tea_Info.hname);
                    break;
                case "TableShowNum":
                    let selectIndex = tea.mod.__teaHouseInfo.tblshowcount / 5;
                    if (selectIndex > 3) selectIndex = 3;
                    this.TableShowNum = selectIndex;
                    (<ccui.CheckBox>this.TableShowNum_layout.getChildren()[selectIndex]).setRadioSelected();
                    break;
                case "JoinTableSet":
                    (<ccui.CheckBox>(this.JoinTableSet_layout.getChildren()[0])).setSelected(Tea_Info.only_quick);
                    break;
                case "ExitTeaSet":
                    let index = Tea_Info.hismemexit ? 0 : 1;
                    (<ccui.CheckBox>(this.ExitTeaSet_layout.getChildren()[index])).setRadioSelected();
                    break;
                case "JoinTeaSet":
                    let JoinTeaSetI = Tea_Info.hischecked ? 0 : 1;
                    (<ccui.CheckBox>(this.JoinTeaSet_layout.getChildren()[JoinTeaSetI])).setRadioSelected();
                    (<ccui.CheckBox>(this.JoinTeaSet_layout.getChildren()[2])).setSelected(Tea_Info.apply_switch);
                    break;
                case "CaptainAuthSet":
                    (<ccui.CheckBox>(this.CaptainAuthSet_layout.getChildren()[0])).setSelected(Tea_Info.ipa);
                    (<ccui.CheckBox>(this.CaptainAuthSet_layout.getChildren()[1])).setSelected(Tea_Info.partnerkick);
                    break;
                case "CaptainSetCaptain":
                    let CaptainSetCaptainI = Tea_Info.hm_switch.CapSetDep ? 0 : 1;
                    (<ccui.CheckBox>(this.CaptainSetCaptain_layout.getChildren()[CaptainSetCaptainI])).setRadioSelected();
                    break;
                case "TeaFrozeSet":
                    let TeaFrozeSetI = Tea_Info.hisfrozen ? 0 : 1;
                    (<ccui.CheckBox>(this.TeaFrozeSet_layout.getChildren()[TeaFrozeSetI])).setRadioSelected();
                    break;
                case "LowCardSet":
                    this.edit_lowCard_input.setString(Tea_Info.fangka_tips_min_num.toString());
                    break;
                case "NoWechat":
                    let NoWechatI = Tea_Info.hm_switch.BanWeChat ? 1 : 0;
                    (<ccui.CheckBox>(this.NoWechat_layout.getChildren()[NoWechatI])).setRadioSelected();
                    break;
                case "DistanceSet":
                    this.edit_Distance_input.setString(Tea_Info.distance.toString());
                    break;
                case "recordTimeSelect":
                    let recordTimeSelectI = this.radioDict[Tea_Info.record_time_interval];
                    if (recordTimeSelectI == undefined) this.recordTimeSelectNum = -1;
                    if (this.recordTimeSelectNum >= 0) {
                        (<ccui.CheckBox>(this.recordTimeSelect_layout.getChildren()[recordTimeSelectI])).setRadioSelected();
                    }
                    break;
                case "RecordDetailBind":
                    let RecordDetailBindI = Tea_Info.hm_switch.IsRecShowParent ? 0 : 1;   //
                    (<ccui.CheckBox>(this.recordDetailBind_layout.getChildren()[RecordDetailBindI])).setRadioSelected();
                    break;
                // case "RankListSet":
                //     // kaayou.emit("tea","mod::TeaHouse::ranklistset");
                //     break;
                default:
                    break;
            }
        }
        // 
        emitEventWithType(type: string) {
            let Tea_Info: Data_HouseInfo = tea.mod.__teaHouseInfo;
            switch (type) {
                case "ModifyName":
                    let hname = kaayou.blackList.checkBlackList(this.edit_TeaName_input.getString());
                    if (kaayou.blackList.checkBlackList(hname) != hname) {
                        kaayou.emit("common", "ui::Toast::Show", { msg: "亲友圈名称违规，请重新输入" });
                        return;
                    }
                    let modifyInfo: any = { hid: tea.mod.__teaHouseInfo.hid, hname: hname, hnotify: Tea_Info.hnotify };
                    kaayou.emit("tea", 'mod::TeaHouse::ModifyBaseNN', modifyInfo);
                    break;
                case "NoticeSet":
                    kaayou.emit("tea", "ui::NoticePopPanel::Show");
                    break;
                case "TeaBgSet":
                    kaayou.emit("tea", "ui::TeaBgSetPanel::Show");
                    break;
                case "TableBgSet":
                    kaayou.emit("tea", "ui::tableBgSetPanel::Show");
                    break;
                case "PrivacySet":
                    kaayou.emit('tea', 'ui::PrivacyPanel::Show');
                    break;
                case "TableShowNum":
                    kaayou.emit("tea", "mod::TeaHouse::housesettblshowcount", { count: (this.TableShowNum < 3) ? this.TableShowNum * 5 : 20 });
                    break;
                case "JoinTeaSet":
                    // if ((Tea_Info.apply_switch != (<ccui.CheckBox>(this.JoinTeaSet_layout.getChildren()[2])).isSelected())) {
                    let check = (<ccui.CheckBox>(this.JoinTeaSet_layout.getChildren()[2])).isSelected()
                    kaayou.emit("tea", 'mod::TeaHouse::SetRefuseMemberJoin', { apply_switch: check });
                    // }
                    // if (!!!this.JoinTeaSetNum != Tea_Info.hischecked) {
                    kaayou.emit("tea", 'mod::TeaHouse::SetMemCheck', { ischecked: !this.JoinTeaSetNum });
                    // }
                    break;

                case "JoinTableSet":
                    let isSelect = (<ccui.CheckBox>(this.JoinTableSet_layout.getChildren()[0])).isSelected();
                    kaayou.emit("tea", "mod::Tahouse::SetHouseTableJoinStyle", { only_quick: isSelect })
                    break;
                case "LowScoreSet":
                    kaayou.emit("tea", "ui::propotionFloorConfigDialog::Show");
                    break;
                case "ExitTeaSet":
                    kaayou.emit("tea", 'mod::TeaHouse::SetExitTeahouseCheck', { ismemexit: !this.ExitTeaSetNum });
                    break;
                case "CaptainAuthSet":
                    let ipa = (<ccui.CheckBox>(this.CaptainAuthSet_layout.getChildren()[0])).isSelected();
                    kaayou.emit("tea", 'mod::TeaHouse::SetPartnerMemCheck', { ipa: ipa });
                    let partnerkick = (<ccui.CheckBox>(this.CaptainAuthSet_layout.getChildren()[1])).isSelected()
                    kaayou.emit("tea", "mod::teahouse::partnerKickMem", { partnerkick: partnerkick });

                    break;
                case "BlickListSet":
                    kaayou.emit('tea', 'ui::BlackList::Show');
                    break;
                case "TeaFrozeSet":
                    // if (Tea_Info.hisfrozen != !this.TeaFrozeSetNum) {
                    kaayou.emit("tea", 'mod::TeaHouse::SetOptionFrozen', { hisfrozen: !this.TeaFrozeSetNum });
                    // }
                    break;
                case "LowCardSet":
                    kaayou.emit("tea", "mod::TeaHouse::houseLowCardSet", { num: Number(this.edit_lowCard_input.getString()) });
                    break;
                case "NoWechat":

                    kaayou.emit("tea", "mod::TeaHouse::houseHmsetswitch", { switch: { BanWeChat: !!this.NoWechatNum ? 1 : 0 }, hid: Tea_Info.hid });
                    break;
                case "CaptainSetCaptain":

                    kaayou.emit("tea", "mod::TeaHouse::houseHmsetswitch", { switch: { CapSetDep: !!this.CaptainSetCaptainNum ? 0 : 1 }, hid: Tea_Info.hid });
                    break;
                case "DistanceSet":
                    var re = /^[1-9]\d*$/;//正整数
                    if (!re.test(this.edit_Distance_input.getString())) {
                        kaayou.emit("common", 'ui::Toast::Show', { msg: "请输入正整数" });
                        return;
                    }
                    kaayou.emit("tea", "mod::teahouse::setDistance", {
                        hid: tea.mod.__teaHouseInfo.hid,
                        distance: Number(this.edit_Distance_input.getString()),
                    });
                    break;
                case "recordTimeSelect":
                    if (this.recordTimeSelectNum >= 0) {
                        kaayou.emit("tea", "mod::TeaHouse::SetRecordTimeInterval", {
                            hid: mod.__teaHouseInfo.hid,
                            timeinterval: this.numDict[this.recordTimeSelectNum]
                        });
                    }
                    break;

                case "RecordDetailBind":
                    console.log("需要去发送战绩归属消息");
                    kaayou.emit("tea", "mod::TeaHouse::houseHmsetswitch", { switch: { IsRecShowParent: !!this.recordDetailBindNum ? 0 : 1 }, hid: Tea_Info.hid });
                    break;
                case "RankListSet":
                    // kaayou.emit("tea", 'ui::RankListSetPanel::Show');
                    kaayou.emit("tea","mod::TeaHouse::ranklistget");
                    break;
                default:
                    break;
            }
        }
    }




    export class SubStBasePage {
        scr_BaseSet: ccui.ScrollView = null; //成员列表
        cell_Mod: ccui.Widget = null;
        _page: cc.Node = null;
        _index = -1;
        cellMap: { [type: string]: TH_BaseSet_Cell };
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
                this.reset();
                this._page.setVisible(true);
                kaayou.emit("common", "ui::Loading::Hide");
            } else {
                this._page.setVisible(false);
            }
        }
        reset() {

            let myUright = this.updateListWithUright();
            lodash.forEach(this.scr_BaseSet.getChildren(), function (v: ccui.Layout) {
                v.setVisible(false);
            })
            // this.scr_BaseSet.removeAllChildren();
            for (let i = 0; i < myUright.length; i++) {
                // let cell = this.createCell();
                this.cellMap[myUright[i].type].setInfo(myUright[i]);
                // this.scr_BaseSet.addChild(cell);
                this.cellMap[myUright[i].type].setVisible(true);
            }
            this.scr_BaseSet.doChildrenLayout();
        }
        //初始化成员列表页面
        initWidthNode(page: cc.Node, cellMod: ccui.Widget) {
            let self = this;
            this._page = page;
            let ctrName = "teaST";
            let subpageChangeEventName = "ui::Setting::SubpageChange";
            kaayou.getController(ctrName).on(subpageChangeEventName, this.onSubpageChange, this);
            this.scr_BaseSet = ccui.helper.seekWidgetByName(<ccui.Widget>this._page, "set_ScrollView");
            this.scr_BaseSet.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Vertical);
            this.scr_BaseSet.setVertical(ccui.Layout.LayoutVertical.TOP);
            this.scr_BaseSet.setPadding({ spacingY: 5, left: 10, top: 5, bottom: 5 });
            this.scr_BaseSet.setScrollBarEnabled(false);
            this.scr_BaseSet.doChildrenLayout();
            this.cell_Mod = cellMod;
            kaayou.getController('tea').on('ui::TeaHouse::UpdateSetCell', function (e: kaayou.Event) {
                // self.authMemberInfo();
                if (self._page.isVisible() && e.data) {
                    self.cellMap[e.data.type].showWithType(e.data.type);
                }

            }, this, 10);

            tea.mod.House.getPromissionInstance().attachUpdate(function () {
                self.reset();
            });
            this.cellMap = {};
            for (let i = 0; i < baseSetInfo.length; i++) {
                let cell = this.createCell();
                // cell.setInfo(baseSetInfo[i]);
                this.cellMap[baseSetInfo[i].type] = cell;
                this.scr_BaseSet.addChild(cell);
                cell.setVisible(false);
            }
            this.scr_BaseSet.doChildrenLayout();
            console.log(this.cellMap);
        }

        updateListWithUright() {
            let Tea_Info: Data_HouseInfo = tea.mod.__teaHouseInfo;
            if (!Tea_Info || !Tea_Info.hid) {
                return [];
            }
            let myUright = [];
            lodash.forEach(baseSetInfo, function (v: {
                decImg: string,
                title: string,
                type: string,
                clickImg: string,
                dec: string,
                urightKey: string,
            },) {
                if (!v.urightKey) {
                    if (!!(tea.mod._isMaster() && v.type == "ModifyName")) {  //不在权限里面的
                        myUright.push(v);
                    }

                    if (Tea_Info.urole == HouseMemberRole.OWNER && v.type == "CaptainSetCaptain") {
                        myUright.push(v);
                    }

                    if (Tea_Info.urole == HouseMemberRole.OWNER && v.type == "recordTimeSelect") {
                        myUright.push(v);
                    }

                    if (Tea_Info.urole == HouseMemberRole.OWNER && v.type == "RecordDetailBind") {
                        myUright.push(v);
                    }

                    if (Tea_Info.urole == HouseMemberRole.OWNER && v.type == "RankListSet") {
                        myUright.push(v);
                    }
                } else {
                    if (tea.mod.Permission.getInstance().hasPermission(v.urightKey)) {
                        myUright.push(v);
                    }
                }
            })
            return myUright;
        }


        private createCell(): TH_BaseSet_Cell {
            let cell = kaayou.pool.getFromPool(TH_BaseSet_Cell);
            if (!cell) {
                cell = new TH_BaseSet_Cell();
            }
            cell.initWithNode(this.cell_Mod);
            cell.setAnchorPoint(0, 0);
            cell.setPositionY(0);
            cell.setPositionX(10);
            cell.setVisible(true);
            return cell;
        }
    }
}