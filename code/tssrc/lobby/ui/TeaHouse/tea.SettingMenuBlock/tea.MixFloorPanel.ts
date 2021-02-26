namespace tea {
    var { BindEvent, doBindEvent } = kaayou._decorator;
    interface contentCell {
        color: string,
        content: string,
    }
    export class FloorCell extends kaayou.Block {
        _data = null;
        cb: ccui.CheckBox = null;
        lbName: ccui.Text = null;
        constructor() {
            super();
        }

        initWithNode(node: ccui.Widget, callback) {
            let self = this;
            super.initWithNode(node);
            this.lbName = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "FloorText");
            this.cb = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "cb");
            let clickBg: ccui.Layout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "FloorCheckBox");
            clickBg.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                self.cb.setSelected(!self.cb.isSelected());
                kaayou.emit('tea', "ui::MixFloor::Change", { floor: self._data.level, isSelected: self.cb.isSelected() });
            }, this);
        }

        setInfo(data, isSelected) {
            this._data = data;
            this.lbName.setString((data.level + 1) + "楼");
            this.cb.setSelected(isSelected);
        }

        unuse() {
            this.removeFromParent();
        }
    }
    export class tea_MixFloorMgr {
        static __INS__: tea_MixFloorMgr = null;
        static getInstance() {
            if (tea_MixFloorMgr.__INS__ == null) {
                tea_MixFloorMgr.__INS__ = new tea_MixFloorMgr();
                tea_MixFloorMgr.__INS__.init();
            }
            return tea_MixFloorMgr.__INS__;
        }
        __selfPanel: MixFloor = null;

        init() {
            let self = this;
            this.__selfPanel = null;

            kaayou.getController('tea').on('ui::TeaHouse::ShowMixSetting', function (e: kaayou.Event) {
                self.getPanel(true).Show(e.data);
            }, this, 10);
            kaayou.getController('tea').on('ui::MixFloor::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new MixFloor();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }
    }

    export class MixFloor extends kaayou.Layer {
        constructor() {
            super();
            this.initUI();
        }
        topbarMgr: lobby.TopBarMgr = null;
        mixTypeLayout: ccui.Layout = null;
        arrEditCheckBox = [];
        btnClose: ccui.Button = null;//
        btnEdit: ccui.Button = null;
        btnSave: ccui.Button = null;
        mixCheckBox: ccui.CheckBox = null;     //混排总开关
        mixTypeRadioGroup: common.RadioGroup = null;   //混排类型开关
        mixTypeRadioLayout: ccui.Layout = null;

        //手动加桌模式
        mix_hand_layout: ccui.Layout = null;
        btnTable: ccui.Button = null;
        cbFloor: ccui.Layout = null;
        iTable: number = 1;
        lbHintFloor: ccui.Text = null;
        // lbHintTable: ccui.Text = null;
        ndHint: ccui.Layout = null;
        ndHintBg: ccui.Layout = null;
        ndTable: ccui.Layout = null;
        radioGroup: common.RadioGroup = null;
        svFloor: ccui.ScrollView = null;
        tipsLayout1: ccui.Layout = null;
        //自动加桌模式
        mix_Automatic_layout: ccui.Layout = null;
        emptyTablePosBlock: ccui.Layout = null;
        emptyPosGroup: common.RadioGroup = null;
        emptyMaxTableBlock: ccui.Layout = null;
        emptyMaxTableLaout: ccui.Layout = null;
        emptyMaxGroup: common.RadioGroup = null;
        emptyPosIndex = 0
        emptyMaxIndex = 0;
        emptyPosTips: ccui.Button = null;
        emptyMaxTips: ccui.Button = null;
        autoSortTips: ccui.Button = null;
        emptyTipsLayout: ccui.Layout = null;
        autoSortBlock: ccui.Layout = null;
        autoSortGroup: common.RadioGroup = null;
        autoSortIndex = 0;

        openTypeBlock: ccui.Layout = null;
        openTypeGroup: common.RadioGroup = null;
        openTypeIndex = 0;


        //防作弊模式
        mix_Cheat_layout: ccui.Layout = null;
        zNRadioGroup: common.RadioGroup = null;   //混排类型开关
        zNRadioLayout: ccui.Layout = null;
        zNIndex: number = 0;     //只能匹配开关
        zNTips: ccui.ImageView = null //智能提示
        zNtipsPanel: ccui.Layout = null;  //智能tips面板
        inputSetLayout: ccui.Layout = null //设置数字layout
        ebSetNums: any = null;
        setNumsLayout: ccui.Layout = null;
        ai_SuperLaout: ccui.Layout = null;  //超级防作弊
        ai_SuperGroup: common.RadioGroup = null;
        aiSuperIndex = 0;
        superFzb_Tips: ccui.Button = null;
        zNSuperTipsPanel: ccui.Layout = null;
        superFzb_Panel: ccui.Layout = null;
        waitTips: ccui.ImageView = null;
        waitLayout: ccui.Layout = null;
        wait_Btn: ccui.Button = null;
        waitTipsLayout: ccui.Layout = null;
        @doBindEvent
        initUI() {
            let self = this;
            // this.isTouchMaskHide = false;
            this.initWithccs(tea.res.MixFloor_json);
            this.topbarMgr = new lobby.TopBarMgr(ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "top_bar"));
            this.topbarMgr.setTitle('混排');
            this.topbarMgr.setOnCloseClick(function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.Hide();
            }.bind(this));



            // this.btnClose = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "MixCloseButton");
            // this.btnClose.on(kaayou.TouchEvent.TouchEnd, function () {
            //     kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
            //     self.Hide();
            // }, this);
            this.mixTypeLayout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "mixTypeLayout");
            this.mixCheckBox = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "mixFloor_switch");
            this.mixTypeRadioLayout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "mixTypeBlock");
            this.mixTypeRadioGroup = new common.RadioGroup();
            lodash.forEach(this.mixTypeRadioLayout.getChildren(), function (v: ccui.CheckBox, i) {
                v['index'] = i;
                v.on(kaayou.RadioEvent.SELECTED, function () {
                    // kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                    // self.iTable=i+1;
                    // 0 手动加桌模式，  1 自动加桌模式  2防作弊模式
                    console.log("选中的混排模式" + i);
                    self.showPanelWithIndex(i);
                }, self);
                self.mixTypeRadioGroup.add(v);
            });

            //手动加桌模式
            this.mix_hand_layout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "mix_hand_layout");
            this.mix_hand_layout.setVisible(false);

            this.svFloor = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "FloorScrollView");
            this.cbFloor = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "FloorCheckBox");
            this.svFloor.setPadding({ spacingX: 0, spacingY: 4 });
            this.svFloor.setGrid(ccui.Layout.LayoutGrid_AxisDirection.HORIZONTAL);
            this.svFloor.setHorizontal(ccui.Layout.LayoutHorizontal.LEFT);
            this.svFloor.setVertical(ccui.Layout.LayoutVertical.TOP);
            this.svFloor.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Grid);
            this.svFloor.setGridColumn(5);
            kaayou.getController('tea').on('ui::MixFloor::Change', function (e: kaayou.Event) {
                self.arrEditCheckBox[e.data.floor] = e.data.isSelected;
            }, this, 10);


            this.ndTable = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "TableBlock");
            this.radioGroup = new common.RadioGroup();
            lodash.forEach(this.ndTable.getChildren(), function (v: ccui.CheckBox, i) {
                v['index'] = i;
                v.on(kaayou.RadioEvent.SELECTED, function () {
                    kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                    self.iTable = i + 1;
                }, self);
                self.radioGroup.add(v);
            });
            //---------------------------  自动加桌模式  ---------------------------------------------------------------------
            this.mix_Automatic_layout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "mix_Automatic_layout");
            this.emptyTablePosBlock = ccui.helper.seekWidgetByName(<ccui.Widget>this.mix_Automatic_layout, "emptyTablePosBlock");
            this.emptyPosGroup = new common.RadioGroup();
            lodash.forEach(this.emptyTablePosBlock.getChildren(), function (v: ccui.CheckBox, i) {
                v['index'] = i;
                v.on(kaayou.RadioEvent.SELECTED, function () {
                    kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                    self.emptyPosIndex = i;
                    // self.setNumsLayout.setVisible(!!!self.zNIndex);
                }, self);
                self.emptyPosGroup.add(v);
            });

            this.emptyMaxTableBlock = ccui.helper.seekWidgetByName(<ccui.Widget>this.mix_Automatic_layout, "emptyMaxTableBlock");
            this.emptyMaxGroup = new common.RadioGroup();
            lodash.forEach(this.emptyMaxTableBlock.getChildren(), function (v: ccui.CheckBox, i) {
                v['index'] = i;
                v.on(kaayou.RadioEvent.SELECTED, function () {
                    kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                    self.emptyMaxIndex = i;//

                }, self);
                self.emptyMaxGroup.add(v);
            });

            this.emptyMaxTableLaout = ccui.helper.seekWidgetByName(<ccui.Widget>this.mix_Automatic_layout, "emptyMaxTableLaout");
            

            this.autoSortBlock = ccui.helper.seekWidgetByName(<ccui.Widget>this.mix_Automatic_layout, "autoTableSortBlock");
            this.autoSortGroup = new common.RadioGroup();
            lodash.forEach(this.autoSortBlock.getChildren(), function (v: ccui.CheckBox, i) {
                v['index'] = i;
                v.on(kaayou.RadioEvent.SELECTED, function () {
                    kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                    (<ccui.Text>(v.getChildByName("Text"))).setTextColor(cc.color("#975638"));
                    self.autoSortIndex = (i + 1);//
                    console.log(self.autoSortIndex);
                }, self);
                v.on(kaayou.RadioEvent.UNSELECTED, function () {
                    (<ccui.Text>(v.getChildByName("Text"))).setTextColor(cc.color("#96BCE2"));
                }, self);
                self.autoSortGroup.add(v);
            });


            this.openTypeBlock = ccui.helper.seekWidgetByName(<ccui.Widget>this.mix_Automatic_layout, "openTableBlock");
            this.openTypeGroup = new common.RadioGroup();
            lodash.forEach(this.openTypeBlock.getChildren(), function (v: ccui.CheckBox, i) {
                v['index'] = i;
                v.on(kaayou.RadioEvent.SELECTED, function () {
                    kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                    (<ccui.Text>(v.getChildByName("Text"))).setTextColor(cc.color("#FFF3C1"));
                    self.openTypeIndex = i;//
                    self.emptyMaxTableLaout.setVisible(!self.openTypeIndex);

                    console.log(i);
                }, self);

                v.on(kaayou.RadioEvent.UNSELECTED, function () {
                    (<ccui.Text>(v.getChildByName("Text"))).setTextColor(cc.color("#96BCE2"));
                }, self);


                self.openTypeGroup.add(v);
            });




            this.mix_Automatic_layout.setVisible(false);
            //---------------------------  防作弊模式  ---------------------------------------------------------------------    
            this.mix_Cheat_layout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "mix_Cheat_layout");
            this.inputSetLayout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "inputSetLayout");
            this.setNumsLayout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "setZNumsLayout");
            this.waitLayout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "waitNum_layout");


            this.setNumsLayout.setVisible(false);
            this.mix_Cheat_layout.setVisible(false);
            this.zNRadioLayout = ccui.helper.seekWidgetByName(<ccui.Widget>this.mix_Cheat_layout, "filteraikatietosuodatin_layout");
            this.zNRadioGroup = new common.RadioGroup();
            lodash.forEach(this.zNRadioLayout.getChildren(), function (v: ccui.CheckBox, i) {
                v['index'] = i;
                v.on(kaayou.RadioEvent.SELECTED, function () {
                    kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                    self.zNIndex = i;
                    self.setNumsLayout.setVisible(!!!self.zNIndex);
                    if (self.zNIndex == 0) {
                        (<ccui.CheckBox>this.ai_SuperLaout.getChildren()[1]).setRadioSelected();
                    }

                }, self);
                self.zNRadioGroup.add(v);
            });
            this.superFzb_Panel = ccui.helper.seekWidgetByName(<ccui.Widget>this.mix_Cheat_layout, "superFzb_Panel");
            this.ai_SuperLaout = ccui.helper.seekWidgetByName(<ccui.Widget>this.mix_Cheat_layout, "superFzbBlock");
            this.ai_SuperGroup = new common.RadioGroup();
            lodash.forEach(this.ai_SuperLaout.getChildren(), function (v: ccui.CheckBox, i) {
                v['index'] = i;
                v.on(kaayou.RadioEvent.SELECTED, function () {
                    kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                    self.aiSuperIndex = i;
                    console.log(self.aiSuperIndex);
                    if (self.aiSuperIndex == 0) {
                        (<ccui.CheckBox>this.zNRadioLayout.getChildren()[1]).setRadioSelected();
                    }
                    self.waitLayout.setVisible(!!!self.aiSuperIndex);
                }, self);
                self.ai_SuperGroup.add(v);
            });

            let sp = new cc["Scale9Sprite"]();
            sp.initWithFile(common.res.alpha_4x4, cc.rect(0, 0, 0, 0), cc.rect(0, 0, 0, 0));
            let eb: cc.Node = cc["EditBox"].create(this.inputSetLayout.getContentSize(), sp);
            this.ebSetNums = eb;
            eb.setAnchorPoint(0, 0);
            eb.setPosition(0, 0);
            eb.setOpacity(0);
            eb['setFontSize'](25);
            eb['setFontColor'](cc.color("#96BCE2"));
            eb['setInputMode'](6);
            eb['setMaxLength'](8);

            eb['setDelegate'](
                {
                    /**
                     * This method is called when an edit box gains focus after keyboard is shown.
                     * @param {cc.EditBox} sender
                     */
                    editBoxEditingDidBegin: function (sender) {
                        //console.log('editBoxEditingDidBegin');

                    },

                    /**
                     * This method is called when an edit box loses focus after keyboard is hidden.
                     * @param {cc.EditBox} sender
                     */
                    editBoxEditingDidEnd: function (ref) {
                        //console.log('editBoxEditingDidEnd',sender.getString());
                        let gstr = ref.getString();
                        // self.checkCanchange();
                    },

                    /**
                     * This method is called when the edit box text was changed.
                     * @param {cc.EditBox} sender
                     * @param {String} text
                     */
                    editBoxTextChanged: function (sender, text) {
                        //console.log('editBoxTextChanged');
                        //self.lbName.setString(text);
                    },

                    /**
                     * This method is called when the return button was pressed.
                     * @param {cc.EditBox} sender
                     */
                    editBoxReturn: function (sender) {
                        //console.log('editBoxReturn',sender.getString());
                    }
                }
            )
            this.inputSetLayout.addChild(eb);
            this.wait_Btn = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_waitNum");
            this.wait_Btn.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                //-------------------------------------------------
                kaayou.emit("tea", "ui::WaitingMemberDialog::Show")
                // console.log("设置楼层等待人数");
            }, this);


            //保存设置混排模式
            this.btnSave = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "SaveButton");
            this.btnSave.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                let arrFloor = [];
                for (let i = 0; i < self.arrEditCheckBox.length; ++i) {
                    let bSelected = self.arrEditCheckBox[i];
                    if (bSelected) {
                        let fid = tea.mod.HouseFloor.getInstance().getFloorId(i);
                        arrFloor.push(fid);
                    }
                }
                if (arrFloor.length < 1) {
                    kaayou.emit('common', 'ui::Toast::Show', { msg: "当前未选择混排楼层，无法开启混排模式" });
                    return;
                }
                if (self.mixTypaIndex == 2 && !!!self.zNIndex) {  //防作弊模式
                    if (!!!(kaayou.Identify.isNumber(self.ebSetNums.getString()) &&
                        Number(self.ebSetNums.getString()) >= 1 &&
                        Number(self.ebSetNums.getString()) <= 9999)) {
                        kaayou.emit('common', 'ui::Toast::Show', { msg: "数值范围为1-9999，请重新填写" });
                        return;
                    }
                }

                kaayou.emit("tea", "mod::TeaHouse::EditMix", {
                    hid: tea.mod.__teaHouseInfo.hid,
                    fids: arrFloor,
                    mix_active: self.mixCheckBox.isSelected(),
                    table_num: self.iTable,
                    house_table_join_type: self.mixTypaIndex,
                    ai_check: !!!self.zNIndex,
                    ai_total_score_limit: Number(self.ebSetNums.getString()),
                    ai_super: !self.aiSuperIndex,
                    empty_table_back: !!self.emptyPosIndex,
                    empty_table_max: (self.emptyMaxIndex + 1),
                    table_sort_type: self.autoSortIndex,
                    new_table_sort_type: self.autoSortIndex,
                    create_table_type: self.openTypeIndex,
                });
            }, this);
            this.initTipsUI();
            this.setVisible(false);
        }





        private createCell(): FloorCell {
            let cell = kaayou.pool.getFromPool(FloorCell);
            if (!cell) {
                cell = new FloorCell();
            }
            cell.initWithNode(this.cbFloor);
            return cell;
        }

        // createRichText(msg: string[], lineHeight) {
        //     this.ndHintBg.removeAllChildren();
        //     let x = -200;
        //     let y = 70;
        //     for (let i = 0; i < msg.length; ++i) {
        //         let lbMsg = new ccui.RichText();
        //         lbMsg.anchorX = 0;
        //         lbMsg.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
        //         lbMsg.ignoreContentAdaptWithSize(false);
        //         lbMsg.width = 440;
        //         lbMsg.height = 200;
        //         lbMsg.setPosition(x, y - i * lineHeight);
        //         this.ndHintBg.addChild(lbMsg);
        //         lbMsg.setName('lbMsg' + i);
        //         let content = this.getContentAndColor(msg[i]);

        //         for (let i = 0; i < content.length; i++) {
        //             // let def=new cc.FontDefinition({
        //             //     fillStyle: cc.hexToColor(content[i].color),
        //             //     fontName: "SIMHEI",
        //             //     fontSize: 22,
        //             //     fontWeight: "bold",
        //             //     fontStyle: "normal",
        //             //     lineHeight: 22
        //             // });
        //             let t = new ccui.RichElementText(1, cc.hexToColor(content[i].color), 255, content[i].content, "SIMHEI", 22);
        //             //let t = new ccui.RichElementText(i, def, 255, content[i].content, "SIMHEI", 22);
        //             lbMsg.pushBackElement(t);
        //         }
        //     }
        // }

        // 根据选中的type来显示相应的界面
        mixTypaIndex = 0;
        showPanelWithIndex(index: number) {
            this.mixTypaIndex = index;
            lodash.forEach(this.mixTypeLayout.getChildren(), function (v: ccui.Layout, i) {
                v.setVisible(!!(index == i));
            });

            lodash.forEach(this.mixTypeRadioLayout.getChildren(), function (v: ccui.CheckBox, i) {
                if (index == i) {
                    (<ccui.Text>v.getChildByName("Text")).setTextColor(cc.hexToColor("#FFF3C1"));
                } else {
                    (<ccui.Text>v.getChildByName("Text")).setTextColor(cc.hexToColor("#96BCE2"));//
                }
            });
        }

        // getContentAndColor(content: string): Array<contentCell> {
        //     let resultArr = [];
        //     let needSplite = true;
        //     if (content.indexOf("</c>") < 0) {
        //         needSplite = false;
        //     }
        //     if (!needSplite) {
        //         resultArr.push({ color: "#FFFFFF", content: content });
        //         return resultArr;
        //     }
        //     let strarr = content.split("</c>");

        //     for (var i = 0; i < strarr.length; i++) {
        //         if (strarr[i] == "") continue;
        //         var strbrr = strarr[i].split("<color=");
        //         resultArr.push({ color: "#FFFFFF", content: strbrr[0] });
        //         var textdata = strbrr[1].split(">");
        //         resultArr.push({ color: textdata[0], content: textdata[1] });
        //     }
        //     return resultArr;
        // }

        Show(data: HouseMixFloorInfo) {
            let self = this;
            self.svFloor.removeAllChildren();
            this.showMixLayout(data);
            this.setVisible(true);
            // kaayou.pop.showAni({
            //     cNode: this.node.getChildByName("contentPanel"),
            //     mNode: this.node.getChildByName("maskbg"),
            //     action: function () {
            //     }
            // });
            kaayou.pop.ShowMainAnim({
                tNode: ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "top_bar"),
                bNode: this.node.getChildByName("content"),
                mNode: this.node.getChildByName('maskbg'),
            });
        }

        showMixLayout(data: HouseMixFloorInfo) {
            var self = this;
            this.mixCheckBox.setSelected(data.mix_active);
            this.arrEditCheckBox = [];
            kaayou.pool.putAllChildrenInPool(this.svFloor);
            for (let x in tea.mod.__teaHouseInfo.floorsMap) {
                let floor = tea.mod.__teaHouseInfo.floorsMap[x];
                let fid = tea.mod.HouseFloor.getInstance().getFloorId(floor.level);
                let cell = self.createCell();
                if (!!data.fids) {
                    let bSelected = data.fids.indexOf(fid) > -1;
                    cell.setInfo(floor, bSelected);
                    this.arrEditCheckBox.push(bSelected);
                } else {
                    cell.setInfo(floor, false);
                    this.arrEditCheckBox.push(false);
                }
                this.svFloor.addChild(cell);
            }
            self.svFloor.doChildrenLayout();
            this.iTable = data.table_num;
            if (this.iTable == 0) this.iTable = 1;
            lodash.forEach(this.ndTable.getChildren(), function (v: ccui.CheckBox, i) {
                if (i + 1 == self.iTable) {
                    v.setSelected(true);
                } else {
                    v.setSelected(false);
                }
            });
            lodash.forEach(this.mixTypeRadioLayout.getChildren(), function (v: ccui.CheckBox, i) {
                if (data.house_table_join_type == i) {
                    v.setSelected(true);
                } else {
                    v.setSelected(false);
                }
            });

            //(<ccui.CheckBox>this.mixTypeRadioLayout.getChildren()[1]).setVisible(false);
            let configs = common.mod.Config.GetAppConfig();
            let sFzbAdcode = configs.fzbAdcode;
            let support = false;
            if (!!sFzbAdcode) {
                let arr = sFzbAdcode.split(',');
                if (arr.indexOf(tea.mod.__teaHouseInfo.area) >= 0) {
                    support = true;
                }
            } else {

            }

            if (data.house_table_join_type == 2 && data.ai_super && data.ai_check) {
                kaayou.emit('common', 'ui::Toast::Show', { msg: "智能筛选和超强防作弊不可同时选择，请重新设置！" });
            }

            (<ccui.CheckBox>this.mixTypeRadioLayout.getChildren()[2]).setVisible(support);

            self.showPanelWithIndex(data.house_table_join_type);
            (<ccui.CheckBox>this.zNRadioLayout.getChildren()[0]).setSelected(!!data.ai_check);
            (<ccui.CheckBox>this.zNRadioLayout.getChildren()[1]).setSelected(!!!data.ai_check)
            self.zNIndex = !!data.ai_check ? 0 : 1
            this.setNumsLayout.setVisible(!!data.ai_check);
            this.ebSetNums.setString(data.ai_total_score_limit.toString());

            this.aiSuperIndex = !!data.ai_super ? 0 : 1;
            (<ccui.CheckBox>this.ai_SuperLaout.getChildren()[this.aiSuperIndex]).setRadioSelected();
            let sCqfzbAdcode = configs.cqfzbAdcode;
            let support1 = false;
            if (!!sCqfzbAdcode) {
                let arr = sCqfzbAdcode.split(',');
                if (arr.indexOf(tea.mod.__teaHouseInfo.area) >= 0) {
                    support1 = true;
                }
            } else {

            }
            this.superFzb_Panel.setVisible(support1);

            this.emptyPosIndex = data.empty_table_back ? 1 : 0;
            this.emptyMaxIndex = data.empty_table_max - 1;
            (<ccui.CheckBox>this.emptyTablePosBlock.getChildren()[this.emptyPosIndex]).setRadioSelected();
            if (this.emptyMaxIndex >= 0 && this.emptyMaxIndex <= 1) {
                (<ccui.CheckBox>this.emptyMaxTableBlock.getChildren()[this.emptyMaxIndex]).setRadioSelected();
            }
            this.autoSortIndex = data.new_table_sort_type;
            (<ccui.CheckBox>this.autoSortBlock.getChildren()[this.autoSortIndex - 1]).setRadioSelected();

            this.openTypeIndex = data.create_table_type;
            (<ccui.CheckBox>this.openTypeBlock.getChildren()[this.openTypeIndex]).setRadioSelected();
            this.emptyMaxTableLaout.setVisible(!data.create_table_type);


        }

        Hide() {
            let self = this;
            this.setVisible(false);
            // kaayou.pop.hideAni(
            //     {
            //         cNode: this.node.getChildByName("contentPanel"),
            //         mNode: this.node.getChildByName("maskbg"),
            //         rnode: this,
            //         action: function () {
            //             self.svFloor.removeAllChildren();
            //         }
            //     }
            // )
        }

        initTipsUI() {
            var self = this;
            this.ndHint = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Hint");
            this.ndHintBg = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "HintBg");
            this.ndHint.setVisible(false)
            this.btnEdit = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "EditButton");
            this.btnEdit.setTag(1);
            this.lbHintFloor = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "HintFloor");


            this.btnEdit.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                console.log(e.target.tag);
                self.ndHint.setVisible(false);
            }, this);
            this.btnEdit.on(kaayou.TouchEvent.TouchCance, function (e: kaayou.TouchEvent) {
                self.ndHint.setVisible(false);
            }, this);
            this.btnEdit.on(kaayou.TouchEvent.TouchStart, function (e: kaayou.TouchEvent) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                self.ndHint.setVisible(true);
                self.lbHintFloor.setVisible(true);
            }, this);




            this.tipsLayout1 = <ccui.Layout>this.mix_hand_layout.getChildByName("tipsPanel")
            this.btnTable = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "TableButton");
            this.btnTable.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                this.tipsLayout1.setVisible(false);
            }, this);
            this.btnTable.on(kaayou.TouchEvent.TouchCance, function (e: kaayou.TouchEvent) {
                this.tipsLayout1.setVisible(false);
            }, this);
            this.btnTable.on(kaayou.TouchEvent.TouchStart, function (e: kaayou.TouchEvent) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                // self.ndHint.setVisible(true);
                // self.lbHintFloor.setVisible(false);
                self.tipsLayout1.setVisible(true);
            }, this);

            this.zNTips = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "znTips");
            this.zNtipsPanel = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "zNTipsPanel");
            this.zNTips.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                self.zNtipsPanel.setVisible(false);
            }, this);
            this.zNTips.on(kaayou.TouchEvent.TouchCance, function (e: kaayou.TouchEvent) {
                self.zNtipsPanel.setVisible(false);
            }, this);
            this.zNTips.on(kaayou.TouchEvent.TouchStart, function (e: kaayou.TouchEvent) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                self.zNtipsPanel.setVisible(true);
            }, this);

            this.superFzb_Tips = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "superFzb_Tips");
            this.zNSuperTipsPanel = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "zNSuperTipsPanel");
            this.superFzb_Tips.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                self.zNSuperTipsPanel.setVisible(false);
            }, this);
            this.superFzb_Tips.on(kaayou.TouchEvent.TouchCance, function (e: kaayou.TouchEvent) {
                self.zNSuperTipsPanel.setVisible(false);
            }, this);
            this.superFzb_Tips.on(kaayou.TouchEvent.TouchStart, function (e: kaayou.TouchEvent) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                self.zNSuperTipsPanel.setVisible(true);
            }, this);


            this.emptyPosTips = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "emptyTablePos_Tips");

            //this.emptyTipsLayout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "autoTipsLayout");
            this.emptyPosTips.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                self.mix_Automatic_layout.getChildByName("tipsPanel_0").setVisible(false);
            }, this);
            this.emptyPosTips.on(kaayou.TouchEvent.TouchCance, function (e: kaayou.TouchEvent) {
                self.mix_Automatic_layout.getChildByName("tipsPanel_0").setVisible(false);
            }, this);
            this.emptyPosTips.on(kaayou.TouchEvent.TouchStart, function (e: kaayou.TouchEvent) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                self.mix_Automatic_layout.getChildByName("tipsPanel_0").setVisible(true);
            }, this);

            this.emptyMaxTips = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "emptyMaxTablePos_Tips");
            this.emptyMaxTips.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                self.mix_Automatic_layout.getChildByName("tipsPanel_1").setVisible(false);
            }, this);
            this.emptyMaxTips.on(kaayou.TouchEvent.TouchCance, function (e: kaayou.TouchEvent) {
                self.mix_Automatic_layout.getChildByName("tipsPanel_1").setVisible(false);
            }, this);
            this.emptyMaxTips.on(kaayou.TouchEvent.TouchStart, function (e: kaayou.TouchEvent) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                self.mix_Automatic_layout.getChildByName("tipsPanel_1").setVisible(true);
            }, this);

            this.autoSortTips = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "autoTableSort_Tips");
            this.autoSortTips.setVisible(false);
            // this.autoSortTips.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
            //     self.mix_Automatic_layout.getChildByName("tipsPanel_2").setVisible(false);
            // }, this);
            // this.autoSortTips.on(kaayou.TouchEvent.TouchCance, function (e: kaayou.TouchEvent) {
            //     self.mix_Automatic_layout.getChildByName("tipsPanel_2").setVisible(false);
            // }, this);
            // this.autoSortTips.on(kaayou.TouchEvent.TouchStart, function (e: kaayou.TouchEvent) {
            //     kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
            //     self.mix_Automatic_layout.getChildByName("tipsPanel_2").setVisible(true);
            // }, this);


            this.waitTips = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "img_WaitTips");
            this.waitTipsLayout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "waitTipsLayout");
            this.waitTips.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                self.waitTipsLayout.setVisible(false);
            }, this);
            this.waitTips.on(kaayou.TouchEvent.TouchCance, function (e: kaayou.TouchEvent) {
                self.waitTipsLayout.setVisible(false);
            }, this);
            this.waitTips.on(kaayou.TouchEvent.TouchStart, function (e: kaayou.TouchEvent) {

                self.waitTipsLayout.setVisible(true);
            }, this);


        }
    }
}