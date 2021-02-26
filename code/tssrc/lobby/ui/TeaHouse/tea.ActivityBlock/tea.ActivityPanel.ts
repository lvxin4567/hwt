namespace tea {
    const { doBindEvent, BindEvent } = kaayou._decorator;
    /**
     * 活动楼层的选中组件
     */
    export class ac_FloorCell extends kaayou.Block {  
        _data: Data_HosueFloorInfo = null;
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


    /**
     * 创建活动那个面板注册监听
     */
    export class tea_TeaCreateActivityPanelMgr {
        static __INS__: tea_TeaCreateActivityPanelMgr = null;
        static getInstance() {
            if (tea_TeaCreateActivityPanelMgr.__INS__ == null) {
                tea_TeaCreateActivityPanelMgr.__INS__ = new tea_TeaCreateActivityPanelMgr();
                tea_TeaCreateActivityPanelMgr.__INS__.init();
            }
            return tea_TeaCreateActivityPanelMgr.__INS__;
        }
        _selfPanel: createActivityPanel = null;

        init() {
            let self = this;
            this._selfPanel = null;
    
            kaayou.getController('tea').on('ui::createActivityPanel::Show', function (e: kaayou.Event) {
                if (kaayou.UIManager.getInstance().getCurRuningSceneName() != "TEAHOUSE") return;
                self.getPanel(true).Show();
            }, this, 10);
            kaayou.getController('tea').on('ui::createActivityPanel::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);
            kaayou.getController('tea').on('ui::createActivityPanel::luckyInfoUpdate', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).luckyInfoUpdate(e.data);
            }, this, 10);



            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this._selfPanel == null) {
                this._selfPanel = new createActivityPanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this._selfPanel);
                this._selfPanel['onConfigUpdate'] && this._selfPanel['onConfigUpdate']();
            }
            return this._selfPanel;
        }

    }
    /*** 创建活动面板 */
    export class createActivityPanel extends kaayou.ModelLayer {
        constructor() {
            super();
            this.initUI();
        }
        btn_close: ccui.Button = null;
        //加减按钮
        btn_submit: ccui.Button = null;
        d_statrDel7: ccui.Button = null;
        d_statrDel: ccui.Button = null;
        d_statrAdd: ccui.Button = null;
        d_statrAdd7: ccui.Button = null;
        d_endDel7: ccui.Button = null;
        d_endDel: ccui.Button = null;
        d_endAdd: ccui.Button = null;
        d_endAdd7: ccui.Button = null;
        ebName: any = null;
        h_statrDel6: ccui.Button = null;
        h_statrDel: ccui.Button = null;
        h_statrAdd: ccui.Button = null;
        h_statrAdd6: ccui.Button = null;
        ndName: cc.Layer = null;

        h_endDel6: ccui.Button = null;
        h_endDel: ccui.Button = null;
        h_endAdd: ccui.Button = null;
        h_endAdd6: ccui.Button = null;
        //-------------------
        d_start_label: ccui.Text = null; //加天    开始
        t_start_label: ccui.Text = null; //加时间   
        d_end_label: ccui.Text = null; // 加天    借宿
        t_end_label: ccui.Text = null;

        //----------------------创建活动的editbox
        actName_label: ccui.Text = null;
        actName_edit: ccui.TextField = null;

        //选择框-------选择排名方式
        rank_Type_choose: ccui.Layout = null;
        floorScrollView: ccui.ScrollView = null;
        startTime = 0;
        endTime = 0;
        rankType: number = 0;  //选择的活动类型。
        cbFloor: ccui.Layout = null;
        typeGroup: common.RadioGroup = null;
        hideMem_Cb:ccui.CheckBox = null;
        setAcFrom_layout:ccui.Layout = null;
        acFromGroup:common.RadioGroup = null;
        lackyStart_layout:ccui.Layout = null;  //幸运星活动专属
        normalAc_layout:ccui.Layout = null;
        setTime_layout:ccui.Layout = null;   //设置时间
        needNum_edb:any = null;      //所需数量
        //priNum_edb: = null;       //抽奖人数
        btn_priSet:ccui.Button = null;       //奖励设置按钮
        isSet = false     //幸运星活动是否设置了奖励
        acPriRankArr:Array<Data_RewordInfo> = null;  //当前活动的奖励设置；
        private texteditor = null;
        // @doBindEvent
        initUI() {
            this.initWithccs(tea.res.CreateActivity_Json);
            this.isTouchMaskHide = false;
            let self = this;
            this.ndName = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "NameInput");
            this.btn_close = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "cre_close_btn");
            // this.closelcList_Btn = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "close_act_sel_Panel");
            this.btn_submit = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_submit");
            this.btn_submit.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                self.onSubmit();
            }, this)
            this.cbFloor = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "FloorCheckBox");
            this.floorScrollView = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "FloorScrollView");
            this.floorScrollView.setPadding({ top: 0, spacingX: 0, spacingY: 4 });
            this.floorScrollView.setGrid(ccui.Layout.LayoutGrid_AxisDirection.HORIZONTAL);
            this.floorScrollView.setHorizontal(ccui.Layout.LayoutHorizontal.LEFT);
            this.floorScrollView.setVertical(ccui.Layout.LayoutVertical.TOP);
            this.floorScrollView.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Grid);
            this.floorScrollView.setGridColumn(8);

            // this.curLcLable = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "curLcLable");
            //开始结束时间label
            this.d_start_label = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "d_start_label");
            this.t_start_label = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "t_start_label");
            this.d_end_label = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "d_end_label");
            this.t_end_label = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "t_end_label");

            //创建活动的名称label+edit
            this.actName_label = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "cre_createLabel");
            this.actName_edit = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "cre_editName");
            this.actName_edit.addEventListener(function (ref: ccui.TextField, type) {
                if (ccui.TextField.EVENT_ATTACH_WITH_IME == type) {
                    console.log("EVENT_ATTACH_WITH_IME");
                } else if (ccui.TextField.EVENT_DETACH_WITH_IME == type) {
                    console.log("EVENT_DETACH_WITH_IME");
                } else if (ccui.TextField.EVENT_INSERT_TEXT == type || ccui.TextField.EVENT_DELETE_BACKWARD == type) {
                    let gstr = ref.getString();
                    self.actName_edit.setString(gstr);
                    self.actName_label.setString(gstr);
                }
            }, this);

            let sp = new cc["Scale9Sprite"]();
            sp.initWithFile(common.res.alpha_4x4, cc.rect(0, 0, 0, 0), cc.rect(0, 0, 0, 0));
            let eb: cc.Node = cc["EditBox"].create(this.ndName.getContentSize(), sp);
            this.ebName = eb;
            eb.setAnchorPoint(0, 0);
            eb.setPosition(0, 0);
            eb.setOpacity(0);
            eb['setFontSize'](28);
            eb['setFontColor'](cc.color("#93692D"));
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
            this.ndName.addChild(eb);

            this.hideMem_Cb = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "hideMemInfo_Check");
            this.hideMem_Cb.setSelected(false);

            this.rank_Type_choose = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "rank_Type_choose");
            this.typeGroup = new common.RadioGroup();
            lodash.forEach(this.rank_Type_choose.getChildren(), function (v: ccui.CheckBox, i) {
                v['index'] = i;
                v.on(kaayou.RadioEvent.SELECTED, self.onMenuSelected, self);
                // v.on(kaayou.RadioEvent.UNSELECTED, self.onMenuUnSelected, self);
                if (i == 0) v.setRadioSelected();
                self.typeGroup.add(v);
            })
            //---------------------
            this.d_statrDel7 = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "start_Button_1");
            this.d_statrDel = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "start_Button_1_0");
            this.d_statrAdd = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "start_Button_1_0_0");
            this.d_statrAdd7 = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "start_Button_1_0_0_0");
            this.h_statrDel6 = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "start_Button_1_1");
            this.h_statrDel = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "start_Button_1_0_1");
            this.h_statrAdd = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "start_Button_1_0_0_1");
            this.h_statrAdd6 = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "start_Button_1_0_0_0_0");


            this.d_endDel7 = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "end_Button_1");
            this.d_endDel = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "end_Button_1_0");
            this.d_endAdd = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "end_Button_1_0_0");
            this.d_endAdd7 = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "end_Button_1_0_0_0");
            this.h_endDel6 = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "end_Button_1_1");
            this.h_endDel = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "end_Button_1_0_1");
            this.h_endAdd = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "end_Button_1_0_0_1");
            this.h_endAdd6 = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "end_Button_1_0_0_0_0");

            //活动开始8个按钮的点击
            this.d_statrDel7.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                if (!self.d_statrDel7.isEnabled) { return };
                kaayou.emit('mod::Audio::Sound', "Btn::Default");
                self.onClickStartBtn_D(0, 7);
            }, this)
            this.d_statrDel.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                if (!self.d_statrDel.isEnabled) { return; }
                kaayou.emit('mod::Audio::Sound', "Btn::Default");
                self.onClickStartBtn_D(0, 1);
            }, this)
            this.d_statrAdd.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                if (!self.d_statrAdd.isEnabled) { return; }
                kaayou.emit('mod::Audio::Sound', "Btn::Default");
                self.onClickStartBtn_D(1, 1);
            }, this)
            this.d_statrAdd7.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                if (!self.d_statrAdd7.isEnabled) { return; }
                kaayou.emit('mod::Audio::Sound', "Btn::Default");
                self.onClickStartBtn_D(1, 7);
            }, this)
            this.h_statrDel6.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                if (!self.h_statrDel6.isEnabled) { return; }
                kaayou.emit('mod::Audio::Sound', "Btn::Default");
                self.onClickStartBtn_H(0, 6);
            }, this)
            this.h_statrDel.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                if (!self.h_statrDel.isEnabled) { return; }
                kaayou.emit('mod::Audio::Sound', "Btn::Default");
                self.onClickStartBtn_H(0, 1);
            }, this)
            this.h_statrAdd.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                if (!self.h_statrAdd.isEnabled) { return; }
                kaayou.emit('mod::Audio::Sound', "Btn::Default");
                self.onClickStartBtn_H(1, 1);
            }, this)
            this.h_statrAdd6.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                if (!self.h_statrAdd6.isEnabled) { return; }
                kaayou.emit('mod::Audio::Sound', "Btn::Default");
                self.onClickStartBtn_H(1, 6);
            }, this)

            //活动结束8个按钮的点击
            this.d_endDel7.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                if (!self.d_endDel7.isEnabled) { return; }
                kaayou.emit('mod::Audio::Sound', "Btn::Default");
                self.onClickEndBtn_D(0, 7);
            }, this)
            this.d_endDel.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                if (!self.d_endDel.isEnabled) { return; }
                kaayou.emit('mod::Audio::Sound', "Btn::Default");
                self.onClickEndBtn_D(0, 1);
            }, this)
            this.d_endAdd.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                if (!self.d_endAdd.isEnabled) { return; }
                kaayou.emit('mod::Audio::Sound', "Btn::Default");
                self.onClickEndBtn_D(1, 1);
            }, this)
            this.d_endAdd7.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                if (!self.d_endAdd7.isEnabled) { return; }
                kaayou.emit('mod::Audio::Sound', "Btn::Default");
                self.onClickEndBtn_D(1, 7);
            }, this)
            this.h_endDel6.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                if (!self.h_endDel6.isEnabled) { return; }
                kaayou.emit('mod::Audio::Sound', "Btn::Default");
                self.onClickEndBtn_H(0, 6);
            }, this)
            this.h_endDel.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                if (!self.h_endDel.isEnabled) { return; }
                kaayou.emit('mod::Audio::Sound', "Btn::Default");
                self.onClickEndBtn_H(0, 1);
            }, this)
            this.h_endAdd.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                if (!self.h_endAdd.isEnabled) { return; }
                kaayou.emit('mod::Audio::Sound', "Btn::Default");
                self.onClickEndBtn_H(1, 1);
            }, this)
            this.h_endAdd6.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                if (!self.h_endAdd6.isEnabled) { return; }
                kaayou.emit('mod::Audio::Sound', "Btn::Default");
                self.onClickEndBtn_H(1, 6);
            }, this)



            this.btn_close.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.Hide();
            }, this);
        
            //选择活动形式
            this.setAcFrom_layout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "rank_from_choose");
            this.acFromGroup = new common.RadioGroup();
            lodash.forEach(this.setAcFrom_layout.getChildren(), function (v: ccui.CheckBox, i) {
                v['index'] = i;
                v.on(kaayou.RadioEvent.SELECTED, function () {
                    // kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                    // self.iTable=i+1;
                    console.log("选中活动形式" + i);
                    //self.showPanelWithIndex(i);
                    self.onSelectAcFrom(i);
                }, self);
                self.acFromGroup.add(v);
            });

            this.lackyStart_layout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "luckyStart_layout");
            this.normalAc_layout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "setrank1Type");
            this.setTime_layout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "setTime_layout");
           // this.needNum_edb =  kaayou.editBox.attachTextEdit(this.node, "ac_needEdb", "",null);

            this.texteditor = kaayou.editBox.target(this.node);
            
            this.needNum_edb =  ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "input_num");
            this.needNum_edb = this.texteditor.attachTextEdit("ac_needEdb",(str)=>{
                let num = +str;
                    num = num || 0;
                
            },{fontColor:"#CFB7A6",type:"int",fontSize:24,allowEmpty:false,allowNavi:false,setMaxLength:3,placeholdStr:"请输入数量"})
            this.texteditor.setAttribute("input_num","setPlaceHolder","ddd");
            //this.priNum_edb = kaayou.editBox.attachTextEdit(this.node, "ac_priNumEdb", "",null);
            this.btn_priSet = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_prrSet");
            this.btn_priSet.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                console.log("弹出奖励设置按钮");
                kaayou.emit("tea","ui::acPriSetPanel::Show",{configArr:self.acPriRankArr});
            }, this);
            this.initGetPriTips();
            this.Hide();
        }
        //选择的活动形式
        acFromType:number=0;
        onSelectAcFrom(type:number){
            this.acFromType = type
            this.normalAc_layout.setVisible(!!!type);
            this.lackyStart_layout.setVisible(!!type);
            this.setTime_layout.setPositionY(!!type?102:175);
            lodash.forEach(this.setAcFrom_layout.getChildren(), function (v: ccui.CheckBox, i) {
                if (type == i) {
                    (<ccui.Text>v.getChildByName("Text")).setTextColor(cc.hexToColor("#D33A25"));
                } else {
                    (<ccui.Text>v.getChildByName("Text")).setTextColor(cc.hexToColor("#93692D"));//
                }
            });
        }

        //选择的排名方式
        acttype = 0;
        onMenuSelected(e: kaayou.RadioEvent) {
            let index = e.target['index'];
            let v = <ccui.CheckBox>e.target;
            // let t = <ccui.Text>v.getChildByName('label');
            this.rankType = index;
            console.log("当前选择排名方式为：" + index);
            lodash.forEach(this.rank_Type_choose.getChildren(), function (v: ccui.CheckBox, i) {
                if (index == i) {
                    (<ccui.Text>v.getChildByName("Text")).setTextColor(cc.hexToColor("#D33A25"));
                } else {
                    (<ccui.Text>v.getChildByName("Text")).setTextColor(cc.hexToColor("#93692D"));//
                }
            });
        }

        private createCell(): ac_FloorCell {
            let cell = kaayou.pool.getFromPool(ac_FloorCell);
            if (!cell) {
                cell = new ac_FloorCell();
            }
            cell.initWithNode(this.cbFloor);
            return cell;
        }
        /**
         * 活动发起提交
         */
        onSubmit() {
            let gstr=this.ebName.string;
            if (gstr.length == 0 || gstr.length > 8) {
                kaayou.emit("common", "ui::Toast::Show", { msg: "活动名称不合规！！！" });
                return;
            }
            gstr=kaayou.blackList.checkBlackList(gstr);
            let startMm = new Date(this.startTime).getMinutes();
            let startSs = new Date(this.startTime).getSeconds();
            this.startTime -= startMm * 60 * 1000;
            this.startTime -= startSs * 1000;


            let endMm = new Date(this.endTime).getMinutes();
            let endSs = new Date(this.endTime).getSeconds();
            this.endTime -= endMm * 60 * 1000;
            this.endTime -= endSs * 1000;

            console.log("去掉开始分" + startMm + "去掉秒" + startSs);

            console.log("去掉结束分" + endMm + "去掉秒" + endSs);
            let fidArr = [];
            lodash.forEach(this.floorScrollView.getChildren(), function (v: ac_FloorCell, i) {
                // console.log("选中" + v.cb.isSelected())
                // console.log("楼层玩法选中", v._data);
                if (v.cb.isSelected()) {
                    fidArr.push(v._data.floorItem.fid);
                }
            })
            console.log("选中的fid", fidArr)
            if (lodash.isEmpty(fidArr)) {
                kaayou.emit("common", "ui::Toast::Show", { msg: "请先选择活动楼层！！！" });
                return;
            }
            
            if (this.acFromType) {
                if (!this.isSet) {
                    kaayou.emit("common", "ui::Toast::Show", { msg: "请先配置奖励！！！" });
                    return;
                }

                if (this.needNum_edb.getString().length == 0 || Number(this.needNum_edb.getString()) == 0) {
                    kaayou.emit('common', 'ui::Toast::Show', { msg: "所需数量填写范围为1-999" })
                    return;
                }


            }


            let data: Data_ActivityCreate = {
                hid: tea.mod.__teaHouseInfo.hid,
                fids: fidArr,
                acttype: this.rankType,
                actname: gstr,
                actbegtime: Math.round(this.startTime / 1000),
                actendtime: Math.round(this.endTime / 1000),
                hideinfo:this.hideMem_Cb.isSelected(),
                rewords:this.acPriRankArr,
                type:this.acFromType,
                ticket_count:Number(this.needNum_edb.getString()),
            }
            kaayou.emit("tea", "mod::TeaHouse::createrAct", data);
        }
        //初始化相关tips   提示
        img_startTime:ccui.ImageView = null;
        img_getPriNum:ccui.ImageView = null;
        img_getPriNeedcoun:ccui.ImageView = null;
        initGetPriTips(){
            let self = this;
            this.img_startTime = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "ac_startTime_tip");
            this.img_getPriNum = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "ac_cqrs_tip");
            this.img_getPriNeedcoun = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "ac_sxsl_tip");
            this.img_startTime.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                self.img_startTime.getParent().getChildByName("tipsPanel").setVisible(false);
            }, this);
            this.img_startTime.on(kaayou.TouchEvent.TouchCance, function (e: kaayou.TouchEvent) {
                self.img_startTime.getParent().getChildByName("tipsPanel").setVisible(false);
            }, this);
            this.img_startTime.on(kaayou.TouchEvent.TouchStart, function (e: kaayou.TouchEvent) {
                self.img_startTime.getParent().getChildByName("tipsPanel").setVisible(true);
            }, this);

            this.img_getPriNum.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                self.img_getPriNum.getParent().getChildByName("tipsPanel").setVisible(false);
            }, this);
            this.img_getPriNum.on(kaayou.TouchEvent.TouchCance, function (e: kaayou.TouchEvent) {
                self.img_getPriNum.getParent().getChildByName("tipsPanel").setVisible(false);
            }, this);
            this.img_getPriNum.on(kaayou.TouchEvent.TouchStart, function (e: kaayou.TouchEvent) {
                self.img_getPriNum.getParent().getChildByName("tipsPanel").setVisible(true);
            }, this);

            this.img_getPriNeedcoun.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                self.img_getPriNeedcoun.getParent().getChildByName("tipsPanel").setVisible(false);
            }, this);
            this.img_getPriNeedcoun.on(kaayou.TouchEvent.TouchCance, function (e: kaayou.TouchEvent) {
                self.img_getPriNeedcoun.getParent().getChildByName("tipsPanel").setVisible(false);
            }, this);
            this.img_getPriNeedcoun.on(kaayou.TouchEvent.TouchStart, function (e: kaayou.TouchEvent) {
                self.img_getPriNeedcoun.getParent().getChildByName("tipsPanel").setVisible(true);
            }, this);
        }

        //初始化按钮状态样式
        initBtnD() {
            this.d_statrDel7.setEnabled(false);
            this.d_statrDel.setEnabled(false);
            this.h_statrDel6.setEnabled(false);
            this.h_statrDel.setEnabled(false);
            this.d_endDel7.setEnabled(false);
            this.d_endDel.setEnabled(false);
            this.h_endDel6.setEnabled(false);
            this.h_endDel.setEnabled(false);
        }


        //是否小于当天比较
        isNowDay(timeA: number, timeB: number = null) {
            var dateB = new Date();
            if (timeB) {
                dateB = new Date(timeB);
            }
            let Y = dateB.getFullYear();
            let y = dateB.getMonth() + 1;
            let d = dateB.getDate();

            var dateA = new Date(timeA);
            let Y2 = dateA.getFullYear();
            let y2 = dateA.getMonth() + 1;
            let d2 = dateA.getDate();

            let b = (new Date(Y + "/" + y + "/" + d + " 00:00:00")).getTime();
            let a = (new Date(Y2 + "/" + y2 + "/" + d2 + " 00:00:00")).getTime();

            if (timeB) {
                return b > a;
            }

            return b >= a;
        }


        //是否小于当天小时比较
        isNowDayH(timeA: number, timeB: number = null) {
            var dateB = new Date();
            let mi = dateB.getMinutes();
            if (timeB) {
                dateB = new Date(timeB);
            }
            let Y = dateB.getFullYear();
            let y = dateB.getMonth() + 1;
            let d = dateB.getDate();
            let h = dateB.getHours();

            var dateA = new Date(timeA);
            let Y2 = dateA.getFullYear();
            let y2 = dateA.getMonth() + 1;
            let d2 = dateA.getDate();
            let h2 = dateA.getHours();

            let b = (new Date(Y + "/" + y + "/" + d + " " + h + ":00:00")).getTime()
            let a = (new Date(Y2 + "/" + y2 + "/" + d2 + " " + h2 + ":00:00")).getTime() + 60 * 60 * 1000;
            if (timeB) {
                b += 60 * 60 * 1000;
            }
            if (mi >= 50) {
                b += 60 * 60 * 1000;
                a += 60 * 60 * 1000;
            }

            if (timeB) {
                console.log("timeB存在", Boolean(b - a <= 60 * 60 * 1000));
                return b - a <= 60 * 60 * 1000;
            }
            console.log("timeB 不存在", Boolean(b - a <= 60 * 60 * 1000));
            return a - b <= 60 * 60 * 1000;
        }


        //渲染日期 时间
        setTimeLayer() {
            this.d_start_label.setString(new Date(this.startTime).Format("MM月dd日"));
            this.t_start_label.setString(new Date(this.startTime).Format("hh点"))
            this.d_end_label.setString(new Date(this.endTime).Format("MM月dd日"))
            this.t_end_label.setString(new Date(this.endTime).Format("hh点"));
        }

        //按钮状态
        setDstarBtnState(b: boolean) {
            this.d_statrDel7.setEnabled(b);
            this.d_statrDel.setEnabled(b);
        }

        setHstarBtnState(b: boolean) {
            this.h_statrDel6.setEnabled(b);
            this.h_statrDel.setEnabled(b);
        }

        setDendBtnState(b: boolean) {
            this.d_endDel7.setEnabled(b);
            this.d_endDel.setEnabled(b);
        }

        setHendBtnState(b: boolean) {
            this.h_endDel6.setEnabled(b);
            this.h_endDel.setEnabled(b);
        }

        //改变按钮状态
        changeBtnstate(s: number, e: number = null) {
            this.setHstarBtnState(!this.isNowDayH(s));
            this.setDstarBtnState(!this.isNowDay(s));

            this.setHendBtnState(!this.isNowDayH(s, e));
            this.setDendBtnState(this.isNowDay(s, e));
        }


        //type: 0为-法  1为+法   num：数量
        onClickStartBtn_D(type: number, num: number) {
            let tempTime = new Date();
            let mi = Number(tempTime.Format("m"));
            if (type == 0) {
                this.startTime -= (24 * 60 * 60 * num) * 1000;
                let isNow = this.isNowDay(this.startTime);
                if (isNow) {
                    this.startTime = tempTime.getTime() + (60 * 60 * 1) * 1000;
                    if (mi >= 50) {
                        this.startTime += (60 * 60 * 1) * 1000;
                    }
                }
            } else {
                this.startTime += (24 * 60 * 60 * num) * 1000;
                if (!this.isNowDay(this.startTime, this.endTime)) {
                    this.endTime = this.startTime + (60 * 60) * 1000;
                }
            }
            //根据时间 修改按钮样式状态
            this.changeBtnstate(this.startTime, this.endTime);
            this.setTimeLayer();
        }

        onClickStartBtn_H(type: number, num: number) {
            let tempTime = new Date();
            let mi = Number(tempTime.Format("m"));
            let TempIsNow = false;
            if (type == 0) {
                this.startTime -= (60 * 60 * num) * 1000;
                let isNow = this.isNowDayH(this.startTime);
                TempIsNow = isNow;
                if (isNow) {
                    this.setHstarBtnState(false);
                    this.startTime = tempTime.getTime() + (60 * 60 * 1) * 1000;
                    if (mi >= 50) {
                        this.startTime += (60 * 60 * 1) * 1000;
                    }
                }
            } else {
                this.startTime += (60 * 60 * num) * 1000;
                if (this.isNowDayH(this.startTime, this.endTime)) {
                    this.endTime = this.startTime + (60 * 60) * 1000;
                }
            }
            //根据时间 修改按钮样式状态、
            if (type == 0 && TempIsNow) {

            } else {
                this.changeBtnstate(this.startTime, this.endTime);
            }

            this.setTimeLayer();
        }


        onClickEndBtn_D(type: number, num: number) {
            let tempTime = new Date();
            let mi = Number(tempTime.Format("m"));
            if (type == 0) {
                this.endTime -= (24 * 60 * 60 * num) * 1000;
                let isNow = this.isNowDay(this.startTime, this.endTime);
                if (!isNow) {
                    this.startTime = tempTime.getTime() + (60 * 60 * 1) * 1000;
                    if (mi >= 50) {
                        this.startTime += (60 * 60 * 1) * 1000;
                    }
                    this.endTime = this.startTime + (60 * 60 * 1) * 1000;
                }
            } else {
                this.endTime += (24 * 60 * 60 * num) * 1000;
            }
            //根据时间 修改按钮样式状态
            this.changeBtnstate(this.startTime, this.endTime);
            this.setTimeLayer();
        }


        onClickEndBtn_H(type: number, num: number) {
            let tempTime = new Date();
            let mi = Number(tempTime.Format("m"));
            if (type == 0) {
                this.endTime -= (60 * 60 * num) * 1000;
                let isNow = this.isNowDayH(this.startTime, this.endTime);
                if (isNow) {
                    this.startTime = tempTime.getTime() + (60 * 60 * 1) * 1000;
                    if (mi >= 50) {
                        this.startTime += (60 * 60 * 1) * 1000;
                    }
                    this.endTime = this.startTime + (60 * 60 * 1) * 1000;
                }
            } else {
                this.endTime += (60 * 60 * num) * 1000;
            }
            //根据时间 修改按钮样式状态
            this.changeBtnstate(this.startTime, this.endTime);
            this.setTimeLayer();
        }

        initCurrentTime() {
            let date = new Date();
            this.startTime = date.getTime() + (60 * 60 * 1) * 1000;
            this.endTime = date.getTime() + (60 * 60 * 2) * 1000;
            let m = Number(date.Format("m"));

            if (m >= 50) {
                this.startTime += (60 * 60 * 1) * 1000;
                this.endTime += (60 * 60 * 1) * 1000;
            }
            this.actName_edit.setString("");
            this.actName_label.setString("");
            (<ccui.CheckBox>this.rank_Type_choose.getChildren()[0]).setRadioSelected();
        }

        //初始化幸运星活动奖励相关
        initLuckyAc(){
            this.isSet = false;
            this.acPriRankArr = [];
            for (let i = 1; i < 10; i++) {
                let m:Data_RewordInfo = {
                    rank:i,
                    count:0
                }
                this.acPriRankArr.push(m);
            }
        }

        //展示界面相关功能的初始化
        Show() {
            this.needNum_edb.setString("");
            this.ebName.setString("");
            this.initBtnD();
            this.initCurrentTime();
            this.setTimeLayer();
            // this.initlcListToShow();
            this.initAllFloorCheck();
            this.initLuckyAc();
            (<ccui.CheckBox>this.setAcFrom_layout.getChildren()[0]).setRadioSelected();
            this.setVisible(true);
        }

        Hide() {
            this.floorScrollView.removeAllChildren();
            this.setVisible(false);
        }


        initAllFloorCheck() {
            var self = this;
            self.hideMem_Cb.setSelected(false);
            kaayou.pool.putAllChildrenInPool(this.floorScrollView);
            for (let x in tea.mod.__teaHouseInfo.floorsMap) {
                let floor: Data_HosueFloorInfo = tea.mod.__teaHouseInfo.floorsMap[x];
                // let fid = tea.mod.HouseFloor.getInstance().getFloorId(floor.level);
                let cell = self.createCell();
                cell.setInfo(floor, true);
                this.floorScrollView.addChild(cell);
            }
            self.floorScrollView.doChildrenLayout();
        }

        luckyInfoUpdate(data:{configInfo:any}){
            this.acPriRankArr = data.configInfo;
            this.isSet = true;
            console.log("设置了奖励",data);
        }


    }


    //--------------------------------------------------------------------------------活动信息面板---------------------------------------------------------------

    export class tea_TeaActivityPanelMgr {
        static __INS__: tea_TeaActivityPanelMgr = null;
        static getInstance() {
            if (tea_TeaActivityPanelMgr.__INS__ == null) {
                tea_TeaActivityPanelMgr.__INS__ = new tea_TeaActivityPanelMgr();
                tea_TeaActivityPanelMgr.__INS__.init();
            }
            return tea_TeaActivityPanelMgr.__INS__;
        }
        _selfPanel: activityPanel = null;

        init() {
            let self = this;
            this._selfPanel = null;
            // @BindEvent("tea", 'ui::activityPanel::Show')
            // @BindEvent("tea", 'ui::activityPanel::Hide')
            //@BindEvent("tea","ui::TeaHouseActivity::ActInfo")
            //onBtnState
            kaayou.getController('tea').on('ui::TeaHouseActivity::selectLc', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).onBtnState(e.data);
            }, this, 10);

            kaayou.getController('tea').on('ui::TeaHouseActivity::ActInfo', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).setActInfo(e.data);
            }, this, 10);

            kaayou.getController('tea').on('ui::TeaHouseActivity::reflashUI', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).reflashActivityUI(e.data);
            }, this, 10);

            kaayou.getController('tea').on('ui::activityPanel::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show();
            }, this, 10);
            kaayou.getController('tea').on('ui::activityPanel::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this._selfPanel == null) {
                this._selfPanel = new activityPanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this._selfPanel);
                this._selfPanel['onConfigUpdate'] && this._selfPanel['onConfigUpdate']();
            }
            return this._selfPanel;
        }

    }




    class ActBtnCell extends kaayou.Block {
        constructor() {
            super();
        }
        label_Info: ccui.Text = null;
        status: ccui.ImageView = null;
        uncheck: ccui.ImageView = null;
        check: ccui.ImageView = null;
        initWithNode(node: ccui.Widget) {
            super.initWithNode(node);
            var self = this;
            this.label_Info = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btnName");
            this.status = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "status");
            this.uncheck = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "unCheck");
            this.check = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Check");
            this.node.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                kaayou.emit("tea", 'ui::TeaHouseActivity::selectLc', self._data.actid);
                console.log("---------------------------");
            }, this);
        }

        _data: Data_ActListModel = null;
        setInfo(data: Data_ActListModel) {
            this._data = data;
            if (lodash.isEmpty(data)) {
                return
            }
            this.label_Info.setString(data.actname);
            let imageName = "";
            if (data.actstate == 2) {
                imageName = "TH_ac_icon_end.png"
            } else if (data.actstate == 1) {
                imageName = "TH_ac_icon_ing.png";
            } else {
                imageName = "TH_ac_icon_nostart.png"
            }
            this.status.loadTexture(imageName, ccui.Widget.PLIST_TEXTURE);
        }

        unuse() {
            this._data = null;
            this.removeFromParent();
        }
    }


    class ActUserInfoCell extends kaayou.Block {
        constructor() {
            super();
        }
        label_Num: ccui.Text = null;
        rankcell_userID: ccui.Text = null;
        rankcell_userName: ccui.Text = null;
        rankcell_resLabel: ccui.Text = null;
        rankcell_lcName:ccui.Text = null;
        rankcell_lcrank:ccui.Text = null;
        rankcell_lcTime:ccui.Text = null
        initWithNode(node: ccui.Widget) {
            super.initWithNode(node);
            var self = this;
            this.label_Num = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "rankcell_rankNum");
            this.rankcell_userID = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "rankcell_userID");
            this.rankcell_userName = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "rankcell_userName");
            this.rankcell_resLabel = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "rankcell_resLabel");
            this.rankcell_lcName = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "rankcell_lucky_name");
            this.rankcell_lcTime = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "rankcell_lucky_time");
            this.rankcell_lcrank = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "rankcell_lucky_rank");
        }

        _data: Data_ActivityUserModel = null;
        setInfo(data: Data_ActivityUserModel,ishide:boolean,type:number) {
            this._data = data;
            if (lodash.isEmpty(data)) {
                this.label_Num.setString("");
                this.rankcell_userName.setString("");
                this.rankcell_userID.setString("");
                this.rankcell_resLabel.setString("");
                this.rankcell_lcName.setString("");
                this.rankcell_lcrank.setString("");
                this.rankcell_lcTime.setString("");
                return
            }
            this.rankcell_userName.setString("" + kaayou.Identify.nickNameSubEight(data.uname));
            let uidStr = data.uid.toString();
            this.rankcell_userID.setString(uidStr);
            this.rankcell_resLabel.setString(data.score);

            this.rankcell_lcName.setString("" + kaayou.Identify.nickNameSubEight(data.uname));
            this.rankcell_lcrank.setString(`${this.rank(data.rank)}`);
            this.rankcell_lcTime.setString((new Date(data.created_time*1000)).format("yyyy-MM-dd  hh:mm:ss "));
            let myID = lobby.mod.User.getInstance().getUserInfo().uid;
            //lm191031只有管理员和圈主能看   没有权限的只看自己
            //lw191210取消屏蔽功能
            if (!!!(tea.mod.__teaHouseInfo.teahouserule & HouseRoleTable.VIEW_STAT_RECORD_TEA_PLAY) && myID != data.uid && ishide) {  
                let hideId = data.uid.toString().substring(0,uidStr.length - 4) + "****";
                this.rankcell_userName.setString("****");
                this.rankcell_userID.setString(hideId);
                this.rankcell_resLabel.setString("****");
                this.rankcell_lcName.setString("****");
            }
            this.label_Num.setVisible(!type);
            this.rankcell_userName.setVisible(!type);
            this.rankcell_userID.setVisible(!type);
            this.rankcell_resLabel.setVisible(!type);
            this.rankcell_lcName.setVisible(!!type);
            this.rankcell_lcrank.setVisible(!!type);
            this.rankcell_lcTime.setVisible(!!type);
        }

        rank(r){
            switch(r.toString()){
                case "1":
                    return "一等奖"
                case "2":
                    return "二等奖"
                case "3":
                    return "三等奖"
                case "4":
                    return "四等奖"
                case "5":
                    return "五等奖"
                case "6":
                    return "六等奖"
                case "7":
                    return "七等奖"
                case "8":
                    return "八等奖"
                default:
                    return "未中奖"

            }
        }

        setUserNum(num) {
            this.label_Num.setString("" + (Number(num) + 1));
        }

        unuse() {
            this._data = null;
            this.removeFromParent();
        }
    }




    export class activityPanel extends kaayou.ModelLayer {
        constructor() {
            super();
            this.initUI();
        }
        topbarMgr: lobby.TopBarMgr = null;
        createAcBtn: ccui.Button = null;
        ac_leftCheckBtn: ccui.Layout = null;
        noAcBg: ccui.ImageView = null;
        data_leftBtn: Array<Data_ActListModel> = null;
        ac_UserInfo_cell_mode: ccui.Layout = null

        //幸运星活动
        scrollTop1:ccui.Layout = null;    //普通活动
        scrollTop2:ccui.Layout = null;    //幸运星活动  
        btn_goLucky:ccui.Button = null;   // 前往抽奖



        initUI() {
            this.initWithccs(tea.res.ActivityPanel_Json);
            this.isTouchMaskHide = false;
            let self = this;

            this.topbarMgr = new lobby.TopBarMgr(ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "top_bar"));
            this.topbarMgr.setTitle('活动中心');
            this.topbarMgr.setOnCloseClick(function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.Hide();
            }.bind(this));
            self.ac_leftCheckBtn = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "tea_ActBtnCell_mode");
            this.createAcBtn = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "ac_createAcBtn");
            this.createAcBtn.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit("tea", 'ui::createActivityPanel::Show');
            }, this);
            this.noAcBg = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "ac_noAcitivityBg");
            this.initLeftMenu();
            this.initRightMenu();
            this.Hide();
        }
        Show() {
            this.setVisible(true);
            kaayou.pop.ShowMainAnim({
                tNode: ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "top_bar"),
                bNode: this.node.getChildByName("contentPanel"),
                mNode: this.node.getChildByName('maskbg'),
                action: function () {
                    kaayou.emit("tea", 'mod::TeaHouse::GetActList');
                }
            });
        }

        reflashActivityUI(data) {
            if (!this.isVisible()) {
                return;
            }
            this.setActList(data);
        }

        Hide() {
            this.setVisible(false);
        }

        menuGroup: common.RadioGroup = null;
        actBtncontent: ccui.ScrollView = null;

        initLeftMenu() {
            let self = this;
            //初始化左侧菜单
            this.actBtncontent = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "ac_Scroll_Btn");
            this.actBtncontent.setPadding({ spacingY: 10, left: 3 });
            this.actBtncontent.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Vertical);
            this.actBtncontent.setVertical(ccui.Layout.LayoutVertical.TOP);
            this.actBtncontent.setScrollBarEnabled(false);
        }

        ac_CurrentAcInfo_panel: ccui.Layout = null
        actInfoName: ccui.Text = null
        actInfoTime: ccui.Text = null;
        actInfoRankType: ccui.Text = null
        floorArea: ccui.Text = null;
        offAct: ccui.Button = null;
        ac_activity_OverLabel: ccui.Text = null;
        ac_type_scroll_label: ccui.Text = null
        ac_rank_Scroll: ccui.ScrollView = null;
        initRightMenu() {
            var self = this
            this.ac_CurrentAcInfo_panel = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "ac_CurrentAcInfo_panel");
            this.actInfoName = ccui.helper.seekWidgetByName(this.ac_CurrentAcInfo_panel, "actInfoName");
            this.actInfoTime = ccui.helper.seekWidgetByName(this.ac_CurrentAcInfo_panel, "ac_acvity_info_time");
            this.actInfoRankType = ccui.helper.seekWidgetByName(this.ac_CurrentAcInfo_panel, "ac_acvity_info_type");
            this.floorArea = ccui.helper.seekWidgetByName(this.ac_CurrentAcInfo_panel, "ac_acvity_info_area");
            this.offAct = ccui.helper.seekWidgetByName(this.ac_CurrentAcInfo_panel, "ac_activity_btn_offAct");
            this.ac_activity_OverLabel = ccui.helper.seekWidgetByName(this.ac_CurrentAcInfo_panel, "ac_activity_OverLabel");
            this.ac_type_scroll_label = ccui.helper.seekWidgetByName(this.ac_CurrentAcInfo_panel, "ac_type_scroll_label");


            this.ac_rank_Scroll = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "ac_rank_Scroll");
            this.ac_rank_Scroll.setPadding({ left: 2, right: 5, spacingY: 8, top: 0, bottom: 0 });
            this.ac_rank_Scroll.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Vertical);
            this.ac_rank_Scroll.setVertical(ccui.Layout.LayoutVertical.TOP);
            this.ac_rank_Scroll.setScrollBarEnabled(false);
            this.ac_UserInfo_cell_mode = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "ActUserRankCell");
            this.offAct.on(kaayou.TouchEvent.TouchEnd, function () {
                let dialogOptions = {
                    title: "提示",
                    msg: "取消活动后，活动将被删除，\n确定删除吗？",
                    btns: [
                        {
                            name: "确定",
                            action: function () {
                                //抛出解散亲友圈消息
                                let sendData = {
                                    hid: tea.mod.__teaHouseInfo.hid,
                                    actid: self.actid
                                }
                                kaayou.emit("tea", 'mod::TeaHouse::deleteAct', sendData);
                            },
                            colorType: 'green'
                        },
                        {
                            name: "取消",
                            colorType: 'blue'
                        }
                    ]
                }
                kaayou.emit("common", 'ui::Dialog::Show', dialogOptions);
            }, this);

            //幸运星
            this.scrollTop1 = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "scroll_Top");
            this.scrollTop2 = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "scroll_Top_lucky");
            this.btn_goLucky = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "ac_activity_btn_goLuckyPri");
            this.btn_goLucky.on(kaayou.TouchEvent.TouchEnd,  ()=> {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);  
                let {actid} = this;              
                console.log("----------------------------actid:"+actid);
                let {actstartime,actendime} = self._data
                kaayou.emit('tea','ui::FortuneWheel::Show',{actstartime,actendime,actid})
            }, this);
        }
        actid = -1;
        setActList(data: Array<Data_ActListModel>) {
            let _selfScroll = this.actBtncontent;
            this.createAcBtn.setVisible(tea.mod.__teaHouseInfo.urole == HouseMemberRole.OWNER);
            var offset = _selfScroll.getInnerOffSetTop();//_selfScroll['needUpdateOffsetTop'] || 0;
            kaayou.pool.putAllChildrenInPool(this.actBtncontent);
            if (!data || !lodash.isArray(data) || data.length < 1) {
                if (HouseMemberRole.OWNER == 0) {
                    this.noAcBg.setVisible(true);
                    this.ac_CurrentAcInfo_panel.setVisible(false);
                }
                return;
            }
            let self = this;
            let items = data || [];
            if (lodash.isEmpty(items)) { return; }
            for (var x in items) {
                let cell = this.activityleftBtnCell();
                _selfScroll.addChild(cell);
                cell.setInfo(items[x]);
            }
            // this.actid = data[0].actid;
            offset = Math.min(-1 * Math.abs(Math.max(_selfScroll.getInnerContainerSize().height - _selfScroll.getLayoutSize().height) - offset), 0);
            _selfScroll.setInnerContainerPosition(cc.p(0, offset));
            this.actBtncontent.doChildrenLayout();
            this.onBtnState(data[0].actid);
            this.noAcBg.setVisible(false);
        }
        //左侧的按钮选中的状态修改
        onBtnState(actid) {
            var self = this;
            // if (self.actid == actid) {
            //     return;
            // }
            lodash.forEach(this.actBtncontent.getChildren(), function (v: ActBtnCell, i) {
                if (v._data.actid == actid) {
                    v.label_Info.setTextColor(cc.color(151, 86, 56));
                    v.check.setVisible(true);
                    self.actid = actid;
                    kaayou.emit("tea", "mod::TeaHouse::GetActInfo", actid)
                } else {
                    v.label_Info.setTextColor(cc.color(57, 103, 178));
                    v.check.setVisible(false);
                }
            });
        }

        _data:Data_CurActivityInfo = null;
        setActInfo(data: Data_CurActivityInfo) {
            var self = this;
            this._data = data;
            this.offAct.setVisible(tea.mod.__teaHouseInfo.urole == HouseMemberRole.OWNER);
            this.ac_activity_OverLabel.setVisible(data.actstate == 2)
            // this.actInfoNoStartImg.active =  (data.userlist && data.userlist.length < 1 );
            // this.actRankListNode.active = (data.userlist && data.userlist.length >= 1);
            this.actInfoName.string = data.actname;
            let rankTypeArr = ["对局次数", "大赢家次数", "总积分"];
            this.actInfoRankType.string = !!data.type?"按照抽奖时间顺序排序（只展示最近300个）" : "活动期间根据" + rankTypeArr[data.acttype] + "排名（仅显示前300名）";

            let starTime = new Date(data.actstartime * 1000).Format("yyyy/MM/dd/hh:mm");
            let endTime = new Date(data.actendime * 1000).Format("yyyy/MM/dd/hh:mm");
            this.actInfoTime.string = starTime + "至" + endTime;
            this.ac_type_scroll_label.setString(rankTypeArr[data.acttype]);
            this.ac_CurrentAcInfo_panel.setVisible(true);
            let areaFloorstr = "";
            lodash.forEach(data.fidindexs,function(v:number){
                 v ++;
                 areaFloorstr += (v) + "/";
            })
            if (areaFloorstr.length != 0) {
                areaFloorstr = areaFloorstr.substr(0,areaFloorstr.length-1)
            }
            self.floorArea.setString(areaFloorstr+"楼");//
            this.scrollTop1.setVisible(!data.type);
            this.scrollTop2.setVisible(!!data.type);

            this.btn_goLucky.setVisible(!!data.type);

            kaayou.pool.putAllChildrenInPool(this.ac_rank_Scroll);
            if (!data.userlist || !lodash.isArray(data.userlist) || data.userlist.length < 1) {
                return;
            }
            let _selfScroll = this.ac_rank_Scroll;
            var offset = _selfScroll.getInnerOffSetTop();//_selfScroll['needUpdateOffsetTop'] || 0;
            let items = data.userlist || [];
            if (lodash.isEmpty(items)) { return; }
            for (var x in items) {
                let cell = this.activityUserInfoCell();
                _selfScroll.addChild(cell);
                cell.setUserNum(x);
                cell.setInfo(items[x],data.hideinfo,data.type);
            }
            offset = Math.min(-1 * Math.abs(Math.max(_selfScroll.getInnerContainerSize().height - _selfScroll.getLayoutSize().height) - offset), 0);
            _selfScroll.setInnerContainerPosition(cc.p(0, offset));
            _selfScroll.doChildrenLayout();
        }


        private activityUserInfoCell(): ActUserInfoCell {
            let cell = kaayou.pool.getFromPool(ActUserInfoCell);
            if (!cell) {
                cell = new ActUserInfoCell();
                cell.initWithNode(this.ac_UserInfo_cell_mode);
            }
            cell.setAnchorPoint(0, 0);
            cell.setPositionY(8);
            cell.setPositionX(15);
            cell.setVisible(true);
            return cell;
        }



        private activityleftBtnCell(): ActBtnCell {
            let cell = kaayou.pool.getFromPool(ActBtnCell);
            if (!cell) {
                cell = new ActBtnCell();
                cell.initWithNode(this.ac_leftCheckBtn);
            }
            cell.setAnchorPoint(0, 0);
            cell.setPositionY(8);
            cell.setPositionX(8);
            cell.setVisible(true);
            return cell;
        }

    }



}