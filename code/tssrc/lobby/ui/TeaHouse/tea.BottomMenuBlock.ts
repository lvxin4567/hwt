namespace tea {
    const { BindEvent, doBindEvent } = kaayou._decorator;
    export class BottomMenuBlock extends kaayou.Layer {
        bHasFloor = false;//是否有楼层
        btnManage: ccui.Button = null;
        btnMixFloor: ccui.Button = null;
        chageGroup: ccui.Layout = null;
        ebCustom: any = null;
        lbName: ccui.Text = null;
        mask: ccui.Layout = null;
        menuGroup: ccui.Layout = null;
        ndCustomName: ccui.Layout = null;
        oldName: string = "";
        btn_chooseGame: ccui.Button = null;
        btnVIP: ccui.Button;
        fastGameLayout: ccui.Layout = null;
        btn_changeFastGame: ccui.Button = null;
        floorSelect_cell: ccui.CheckBox = null;
        floorSelct_ScrollView: ccui.ScrollView = null;
        constructor() {
            super();
            this.initUI();
        }

        authBottom() {
            let self = this;
            if (!!tea.mod.__teaHouseInfo) {
                let role = tea.mod.__teaHouseInfo.urole;
                this.btnChangeName.setVisible(false);
                this.btnManage.setVisible(false);
                // this.btnVIP.setVisible(false);
                if (role == HouseMemberRole.OWNER) {
                    this.btnManage.setVisible(true);
                    // this.btnVIP.setVisible(true);
                    if (this.bHasFloor) {
                        this.btnChangeName.setVisible(true);
                        this.ebCustom.setVisible(true);
                        this.lbName.setVisible(false);
                    }
                } else if (role == HouseMemberRole.ADMIN) {
                    //lw190910管理员不能改楼层名称
                    this.ebCustom.setVisible(false);
                    this.btnManage.setVisible(true);
                    // this.btnVIP.setVisible(true);
                } else {
                    this.ebCustom.setVisible(false);
                    if (this.bHasFloor) {
                        this.lbName.setVisible(true);
                    }
                }

                if (tea.mod.__teaHouseInfo.ispartner) {
                    //圈主/有权限的管理人员在暂停比赛分功能时，可同时进行比赛分相关管理工作（所有比赛分管理标签均可查看、使用），只是玩家玩牌不在结算比赛分
                    if (tea.mod.__teaHouseInfo.ispartnerhide) {
                        this.btnManage.setVisible(true);
                    }
                }
                let roleAuth1 = tea.mod.Permission.getInstance().hasPermission("对局统计");
                let roleAuth2 = tea.mod.Permission.getInstance().hasPermission("大赢家统计");
                this.btnStat.setVisible(roleAuth1 || roleAuth2);
            }
        }

        @doBindEvent
        initUI() {
            this.initWithccs(tea.res.BottonMenuBlock_json);
            let self = this;
            this.initSelectGroup();
            this.initChageGroup();
            this.initMenuGroup();
            this.mask = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "mask");
            this.ndCustomName = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "CustomName");

            let sp = new cc["Scale9Sprite"]();
            sp.initWithFile(common.res.alpha_4x4, cc.rect(0, 0, 0, 0), cc.rect(0, 0, 0, 0));
            let eb: cc.Node = cc["EditBox"].create(this.ndCustomName.getContentSize(), sp);
            this.ebCustom = eb;
            eb.setAnchorPoint(0, 0);
            eb.setPosition(0, 0);
            eb.setOpacity(0);
            eb['setFontSize'](20);
            eb['setFontColor'](cc.color("#D07320"));
            eb['setInputMode'](6);
            eb['setMaxLength'](16);

            eb['setDelegate'](
                {
                    /**
                     * This method is called when an edit box gains focus after keyboard is shown.
                     * @param {cc.EditBox} sender
                     */
                    editBoxEditingDidBegin: function (sender) {
                        //console.log('editBoxEditingDidBegin');
                        self.oldName = self.lbName.getString();
                        if (cc.sys.isNative) {
                            kaayou.emit("tea", "ui::Mask::Show");
                        }
                    },

                    /**
                     * This method is called when an edit box loses focus after keyboard is hidden.
                     * @param {cc.EditBox} sender
                     */
                    editBoxEditingDidEnd: function (ref) {
                        //console.log('editBoxEditingDidEnd',sender.getString());
                        setTimeout(() => {
                            kaayou.emit("tea", "ui::Mask::Hide");
                        }, 200);
                        let gstr = ref.getString();
                        if (self.oldName == gstr) return;
                        if (gstr.length > 8) {
                            kaayou.emit("common", "ui::Toast::Show", { msg: "楼层名称不能超过8个字符" });
                            return;
                        }
                        gstr = kaayou.blackList.checkBlackList(gstr);
                        self.lbName.setString(gstr);
                        kaayou.emit("tea", "mod::TeaHouse::RenameFloor", {
                            hid: tea.mod.__teaHouseInfo.hid,
                            floor_id: tea.mod.__teaHouseInfo.fid,
                            name: gstr
                        });
                    },

                    /**
                     * This method is called when the edit box text was changed.
                     * @param {cc.EditBox} sender
                     * @param {String} text
                     */
                    editBoxTextChanged: function (sender, text) {
                        //console.log('editBoxTextChanged');
                        self.lbName.setString(text);
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
            this.ndCustomName.addChild(eb);

            this.btnMixFloor = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "MixFloorInfo");
            this.btnMixFloor.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                if (!!!tea.mod.__teaHouseInfo) return;
                kaayou.emit("tea", "mod::TeaHouse::DoSetOnlyShow", { fid: tea.mod.__teaHouseInfo.fid });
            }, this);

        }

        gameHeadGroup: ccui.Layout = null;
        gameHeadAdd: ccui.ImageView = null;

        label_desc: ccui.Text = null;
        img_remote: cc.Sprite = null;
        floorShow: ccui.Button = null;
        btnChangeName: ccui.Button = null;
        red_image_member: ccui.ImageView = null;
        initChageGroup() {

            //左侧菜单
            this.chageGroup = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "chage_group");
            this.floorShow = ccui.helper.seekWidgetByName(this.chageGroup, "floorShow")
            // this.btnVIP = ccui.helper.seekWidgetByName(this.chageGroup, "btnVIP")
            // 显示切换楼层面板
            this.floorShow.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit("tea", 'ui::ChangeFloor::Show');
            }, this);
            this.btnChangeName = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_xiugai");
            this.gameHeadGroup = ccui.helper.seekWidgetByName(this.chageGroup, "game_head_group");
            // this.gameHeadAdd = ccui.helper.seekWidgetByName(this.chageGroup, "game_head_add");
            this.img_remote = new cc.Sprite();
            this.gameHeadGroup.addChild(this.img_remote);
            this.img_remote.setVisible(false);

            this.lbName = ccui.helper.seekWidgetByName(this.chageGroup, "label_name");

            this.label_desc = ccui.helper.seekWidgetByName(this.chageGroup, "label_desc");

            // this.btnVIP.on(kaayou.TouchEvent.TouchEnd,()=>{
            //     kaayou.emit("tea",'ui::VIPFloorConfigDialog::Show');
            // },this)

            // //返回
            // this.btn_close.on(kaayou.TouchEvent.TouchEnd, function () {
            //     kaayou.UIManager.getInstance().runScene('lobby');
            // }, this);
            // this.btn_help = ccui.helper.seekWidgetByName(this.leftMenuGroup, "btn_help");

            // //帮助
            // this.btn_help.on(kaayou.TouchEvent.TouchEnd, function () {
            //     //kaayou.UIManager.getInstance().runScene('lobby');
            // }, this);
        }

        menu_block: ccui.Layout = null;
        btn_meb: ccui.Button = null;
        btn_rec: ccui.Button = null;
        btnStat: ccui.Button;
        btn_searchTable = null;
        btnQuickStart: ccui.Button = null;
        btn_ranklist:ccui.Button = null;
        initMenuGroup() {
            let self = this;
            //右侧侧菜单
            // //亲友圈设置
            this.btnManage = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_mgr");

            this.btnManage.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit("tea", 'ui::SettingMenu::Show');
            }, this);

            this.fastGameLayout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "fastGameLayout");

            this.btn_chooseGame = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_chooseFastGame");
            this.btn_chooseGame.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit("tea", 'ui::ChooseFastGame::Show');
            }, this);

            this.btn_changeFastGame = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_changeFast");
            // this.btn_changeFastGame.on(kaayou.TouchEvent.TouchEnd, function () {
            //     kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
            //     kaayou.emit("tea", 'ui::ChooseFastGame::Show');
            // }, this);
            this.fastGameLayout.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                if (!!!tea.mod.__teaHouseInfo
                    || !!!tea.mod.__teaHouseInfo.fid
                    || lodash.isEmpty(tea.mod.__teaHouseInfo.floorsMap)
                    || !!!tea.mod.__teaHouseInfo.floorsMap[tea.mod.__teaHouseInfo.fid]) {
                    return;
                }
                let floorItem = tea.mod.__teaHouseInfo.floorsMap[tea.mod.__teaHouseInfo.fid];
                if (!floorItem.floorItem.is_mix) {
                    kaayou.emit("common", "ui::Toast::Show", { msg: "非混排楼层无法切换快速加入玩法！！！" })
                    return;
                }
                kaayou.emit("tea", 'ui::ChooseFastGame::Show');
            }, this);
            this.menu_block = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "menu_group");
            this.menu_block.setPadding({ spacingX: 28, right: 25 });
            this.menu_block.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Horizontal);
            this.menu_block.setHorizontal(ccui.Layout.LayoutHorizontal.LEFT);
            this.menu_block.doChildrenLayout();
            //成员列表
            this.btn_meb = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_meb");

            this.red_image_member = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "red_Image");
            this.btn_meb.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.emit("tea", 'ui::Member::Show');
            }, this);

            //战绩统计
            this.btn_rec = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_rec");
            this.btn_rec.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.emit("tea", 'ui::Record::Show');
            }, this);

            this.btnStat = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btnStat");
            this.btnStat.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.emit('tea', 'ui::RecordDialog::Show');
            }, this);

            this.btn_searchTable = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_search");
            this.btn_searchTable.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.emit("tea", 'ui::SearchTablePanel::Show');
            }, this);

            this.btn_ranklist = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_ranklist");
            this.btn_ranklist.on(kaayou.TouchEvent.TouchEnd, function () {
                // kaayou.emit("tea", 'mod::TeaHouse::ranklist',{rank_type : 0,time_type : 0});
                kaayou.emit("tea","mod::TeaHouse::ranklistget",{isrank:true})

                
            }, this);

            //快速组局
            this.btnQuickStart = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "fastStartBtn");
            this.btnQuickStart.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.TouchMask.addTouchMask({ soundtype: kaayou.SoundType.NORMAL });
                if (!!!tea.mod.__teaHouseInfo
                    || !!!tea.mod.__teaHouseInfo.fid
                    || lodash.isEmpty(tea.mod.__teaHouseInfo.floorsMap)
                    || !!!tea.mod.__teaHouseInfo.floorsMap[tea.mod.__teaHouseInfo.fid]) {
                    return;
                }
                let fid = 0;
                let floorItem = tea.mod.__teaHouseInfo.floorsMap[tea.mod.__teaHouseInfo.fid];
                if (floorItem.floorItem.is_mix) {
                    let fastGameInfo = cc.sys.localStorage.getItem("tea::mixFloorFast" + lobby.mod.User.__INS__.getUserInfo().uid + tea.mod.__teaHouseInfo.hid);
                    if (!!fastGameInfo && fastGameInfo.length > 0) {
                        let fastModel: { fid: number } = JSON.parse(fastGameInfo);
                        if (!!tea.mod.__teaHouseInfo.floorsMap[fastModel.fid]) {
                            fid = fastModel.fid;
                        } else {
                            kaayou.emit("common", "ui::Toast::Show", { msg: "请先选择混楼楼层玩法~~~" })
                            return;
                        }
                    } else {
                        kaayou.emit("common", "ui::Toast::Show", { msg: "请先选择混楼楼层玩法~~~" })
                        return;
                    }
                } else {
                    fid = tea.mod.__teaHouseInfo.fid;
                }

                kaayou.emit('tea', "mod::Table::joinTable", { fid: fid, index: -1, ignorerule: false });
            }, this);

            kaayou.getController('tea').on('ui::TeaHouse::UpdateTiredBlock', function (e: kaayou.Event) {
                self.authBottom();
            }, this, 10);
        }

        @BindEvent("tea", "ui::Teahouse::UpdateRed")
        onUpdateRedImage(data: { isShow: boolean }) {
            this.red_image_member.setVisible(!!data.isShow);
        }

        @BindEvent('tea', 'ui::TeaHouse::UpdateInfo')
        onTeaHouseUpdateInfo(data: tea.Data_HouseInfo) {
            this.watchRole();
            this.authBottom();
            this.btn_searchTable.setVisible(data.urole == HouseMemberRole.OWNER || data.urole == HouseMemberRole.ADMIN);

            //如果有查看成员信息或开局统计的权限，就能看到成员菜单
            this.btn_meb.setVisible(!!(data.teahouserule & HouseRoleTable.VIEW_MEMBER)
                || !!(data.teahouserule & HouseRoleTable.VIEW_STAT_MEMBER));
            //lw190715是否显示红点，先藏起来，如果没权限就return了
            this.red_image_member.setVisible(false);
            //lw190715如果不需要审核，就不显示红点了
            if (tea.mod.__teaHouseInfo.hischecked) {
                kaayou.emit("tea", "mod::Member::GetApplyCount");
            }
            this.btn_searchTable.setVisible(false);    //2.29需求需要隐藏搜索按钮；
            this.btn_ranklist.setVisible(data.rank_open);
            this.btn_searchTable.setVisible(false);
            this.menu_block.doChildrenLayout();
        }

        @BindEvent("tea", "ui::Floor::Update")
        onFloorUpdate(data: { hasrole: boolean, data: FloorUpdateInfo }) {
            let self = this;
            let info = data.data;
            self.bHasFloor = !lodash.isEmpty(info) && info.fid && !lodash.isEmpty(info.floorMap) && !lodash.isEmpty(info.floorMap[info.fid]);
            if (data.hasrole) {
            } else {
                kaayou.emit("tea", 'ui::ChangeFloor::Hide');
                kaayou.emit("tea", 'ui::CreateRoom::Hide', null);
                this.chageGroup.setTouchEnabled(!!info);
            }

            if (!self.bHasFloor) {
                this.img_remote.setVisible(false);
                this.btnChangeName.setVisible(false);
                this.lbName.setString("--");
                this.label_desc.setString("--");
                this.ndCustomName.setVisible(false);
                this.fastGameLayout.setVisible(false)
                this.btn_chooseGame.setVisible(false);
                this.btn_selectShow.setVisible(false);
            } else {
                if (lodash.isEmpty(info) && !(!!info.floorMap)) {
                    this.lbName.setString("--");
                    this.label_desc.setString("--");
                    this.ndCustomName.setVisible(false);
                    this.fastGameLayout.setVisible(false)
                    this.btn_chooseGame.setVisible(false);
                    return;
                }
                let temp = info.floorMap[info.fid];
                NetImage.loadImage(temp.richRule.icon).then(function (tex: cc.Texture2D) {
                    if (!self.img_remote.isRunning() || !self.gameHeadGroup.isRunning()) { return; }
                    self.img_remote.setVisible(true);
                    self.img_remote.initWithTexture(tex);
                    NetImage.doSpriteContentSizeAndPosition(self.img_remote, self.gameHeadGroup.getContentSize());
                });
                this.btnChangeName.setVisible(true);
                this.lbName.setString(temp.floorItem.name == "" ? temp.floorItem.kindname : temp.floorItem.name);
                this.ebCustom.setString(this.lbName.getString());
                this.ndCustomName.setVisible(true);
                let gameDec = "{name}({num}局)".format({
                    name: temp.richRule.name,
                    num: temp.floorItem.frule.roundnum,
                })
                this.label_desc.setString(gameDec.substring(0, 10));
            }

            if (!lodash.isEmpty(info) && (!!info.floorMap) && !!info.fid) {
                let temp = info.floorMap[info.fid];
                let labelFast = <ccui.Text>this.fastGameLayout.getChildByName("fastGameLabel");
                if (temp && temp.floorItem.is_mix) {
                    this.btnMixFloor.setVisible(true);
                    let fastGameInfo = cc.sys.localStorage.getItem("tea::mixFloorFast" + lobby.mod.User.__INS__.getUserInfo().uid + tea.mod.__teaHouseInfo.hid);
                    if (!!fastGameInfo && fastGameInfo.length > 0) {
                        let fastModel: { fid: number } = JSON.parse(fastGameInfo);
                        if (!!tea.mod.__teaHouseInfo.floorsMap[fastModel.fid] && tea.mod.__teaHouseInfo.floorsMap[fastModel.fid].floorItem.is_mix) {
                            this.fastGameLayout.setVisible(true);
                            this.btn_chooseGame.setVisible(false);
                            let Flooritem = tea.mod.__teaHouseInfo.floorsMap[fastModel.fid].floorItem;
                            labelFast.setString(Flooritem.name == "" ? Flooritem.kindname : Flooritem.name);
                        } else {
                            cc.sys.localStorage.setItem("tea::mixFloorFast" + lobby.mod.User.__INS__.getUserInfo().uid + tea.mod.__teaHouseInfo.hid, "")
                            this.fastGameLayout.setVisible(false);
                            this.btn_chooseGame.setVisible(true);
                        }
                    } else {
                        cc.sys.localStorage.setItem("tea::mixFloorFast" + lobby.mod.User.__INS__.getUserInfo().uid + tea.mod.__teaHouseInfo.hid, "")
                        this.fastGameLayout.setVisible(false);
                        this.btn_chooseGame.setVisible(true);
                    }
                } else {
                    this.btnMixFloor.setVisible(false);
                    this.fastGameLayout.setVisible(true);
                    this.btn_chooseGame.setVisible(false);
                    if (!!temp && temp.floorItem) {
                        labelFast.setString(temp.floorItem.name == "" ? temp.floorItem.kindname : temp.floorItem.name);
                    }
                }
            } else {
                this.btnMixFloor.setVisible(false);
                this.btn_chooseGame.setVisible(false);
            }


            this.authBottom();
        }

        @BindEvent("tea", "ui::mixfloor:fastGame")
        dosetMixFastGame(data: { fid: number }) {
            if (!!!data ||
                !data.fid ||
                !!!tea.mod.__teaHouseInfo ||
                !!!tea.mod.__teaHouseInfo.floorsMap[data.fid]) {
                return
            }
            cc.sys.localStorage.setItem("tea::mixFloorFast" + lobby.mod.User.__INS__.getUserInfo().uid + tea.mod.__teaHouseInfo.hid, JSON.stringify(data))
            this.btn_chooseGame.setVisible(false);
            this.fastGameLayout.setVisible(true);
            let label_game = <ccui.Text>this.fastGameLayout.getChildByName("fastGameLabel");
            let Flooritem = tea.mod.__teaHouseInfo.floorsMap[data.fid].floorItem;
            label_game.setString(Flooritem.name == "" ? Flooritem.kindname : Flooritem.name);
        }

        allTableCell:selectFloor_Cell = null;
        @BindEvent("tea", "ui::Table::selectTbUpdate")
        selectTbUpdate(data:{fid:number}) {
            let selectArr = [];
            if (data.fid == -1) {
                // selectArr = [-1];
                lodash.forEach(this.floorSelct_ScrollView.getChildren(), function (v: selectFloor_Cell) {
                    if (v.fid != -1) {
                        v.setCbselect(false);
                    }
                });
            }else{
                this.allTableCell.setCbselect(false);
            }
            lodash.forEach(this.floorSelct_ScrollView.getChildren(), function (v: selectFloor_Cell) {
                if ((<ccui.CheckBox>v.node).isSelected()) {
                    selectArr.push(v.fid);
                }
            });
          
            // let selectIndex = cc.sys.localStorage.getItem(tea.mod.__teaHouseInfo.hid + "TH_select_Table" + lobby.mod.User.getInstance().getUserInfo().uid)
            cc.sys.localStorage.setItem(tea.mod.__teaHouseInfo.hid + "TH_select_Table" + lobby.mod.User.getInstance().getUserInfo().uid,JSON.stringify(selectArr));
            tea.mod.__teaHouseInfo.__selectFloorTable = selectArr;
            console.log(selectArr);
            kaayou.emit("tea", 'mod::Table::GetUpdateList', { clear: true })
        }
        //------------------------------------选择桌子功能-----------------------------------------
        floor_Cell_mode: ccui.CheckBox = null;
        selectFloor_layout: ccui.Layout = null;
        btn_selectShow: ccui.CheckBox = null;
        initSelectGroup() {
            let self = this;
            this.selectFloor_layout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "selectTable_layout");
            this.floor_Cell_mode = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "selectFloorTable");
            this.floorSelct_ScrollView = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "select_scrollView");
            this.floorSelct_ScrollView.setGrid(ccui.Layout.LayoutGrid_AxisDirection.HORIZONTAL);
            this.floorSelct_ScrollView.setPadding({ spacingX: 5, left: 10, right: 0 });
            this.floorSelct_ScrollView.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Horizontal);
            this.floorSelct_ScrollView.setHorizontal(ccui.Layout.LayoutHorizontal.LEFT);
            this.floorSelct_ScrollView.setScrollBarEnabled(false);
            this.floorSelct_ScrollView.doChildrenLayout();
            self.selectFloor_layout.setPositionX(-self.selectFloor_layout.getContentSize().width);
            this.btn_selectShow = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_ShowSelect");
            this.btn_selectShow.on(kaayou.CheckEvent.SELECTED, self.onSlectLayoutShow, this);
            this.btn_selectShow.on(kaayou.CheckEvent.UNSELECTED, self.onSlectLayoutShow, this);
        }
        isMove = false
        onSlectLayoutShow() {
            let self = this;
            if (this.isMove) {
                return
            }
            this.isMove = true;
            let tnSq;
            if (this.btn_selectShow.isSelected()) {
                tnSq = cc.sequence(
                    cc.moveTo(0.1, cc.p(90, this.selectFloor_layout.getPositionY())),
                    cc.callFunc(function () {
                        self.isMove = false;
                    }),
                )
            } else {
                tnSq = cc.sequence(
                    cc.moveTo(0.1, cc.p(-self.selectFloor_layout.getContentSize().width, this.selectFloor_layout.getPositionY())),
                    cc.callFunc(function () {
                        self.isMove = false;
                    }),
                )
            }
            this.selectFloor_layout.runAction(tnSq);
        }


        @BindEvent("tea", "ui::Bottom::SelectTableUpdate")
        doUpdatSelectLayout() {
            let self = this;
            if (!tea.mod || !tea.mod.__teaHouseInfo || !tea.mod.__teaHouseInfo.hid) {
                return;
            }
            this.btn_selectShow.setSelected(false);
            this.selectFloor_layout.setPositionX(-self.selectFloor_layout.getContentSize().width);
            this.selectFloor_layout.setVisible(tea.mod.__teaHouseInfo.isCurFloorMix);
            this.btn_selectShow.setVisible(tea.mod.__teaHouseInfo.isCurFloorMix);
            if (tea.mod.__teaHouseInfo.isCurFloorMix) {
                this.floorSelct_ScrollView.removeAllChildren();
                console.log(tea.mod.__teaHouseInfo.floorsMap);
                let cell = self.createCell();
                self.floorSelct_ScrollView.addChild(cell);
                cell.setFloorid(-1, "所有楼层");
                cell.setCbselect(false);
                this.allTableCell = cell;
                if (tea.mod.__teaHouseInfo.__selectFloorTable.indexOf(-1)>-1) {
                    cell.setCbselect(true);
                }
                lodash.forEach(tea.mod.__teaHouseInfo.floorsMap, function (v: Data_HosueFloorInfo, x) {
                    if (v.floorItem.is_mix) {
                        let cell = self.createCell();
                        cell.setCbselect(false);
                        self.floorSelct_ScrollView.addChild(cell);
                        let customGameName = (v.floorItem.name == "" ? v.floorItem.kindname : v.floorItem.name);
                        cell.setFloorid(v.floorItem.fid, customGameName);
                        if (tea.mod.__teaHouseInfo.__selectFloorTable.indexOf(cell.fid)>-1) {
                            cell.setCbselect(true);
                        }
                    }
                });
                this.floorSelct_ScrollView.doChildrenLayout();
            }
        }


        private createCell(): selectFloor_Cell {
            let cell = kaayou.pool.getFromPool(selectFloor_Cell);
            if (!cell) {
                cell = new selectFloor_Cell();
            }
            cell.initWithNode(this.floor_Cell_mode);
            cell.setAnchorPoint(0.5, 0);
            cell.setPositionY(0);
            cell.setVisible(true);
            return cell;
        }

        // onMenuSelected(e: kaayou.TouchEvent) {
        //     let index = e.target["fid"];
        //     console.log(index);
        //     if (!tea.mod.__teaHouseInfo) {
        //         return;
        //     }
        //     // lodash.forEach(this.floorSelct_ScrollView.getChildren(),function(v:selectFloor_Cell){
        //     //     v.setCbSelect(index == v.getFloorid());                 
        //     // })
        //     tea.mod.__teaHouseInfo.__selectFloorTable = index;
        //     cc.sys.localStorage.setItem(tea.mod.__teaHouseInfo.hid+"TH_select_Table"+lobby.mod.User.getInstance().getUserInfo().uid,""+index);
        //     kaayou.emit("tea", 'mod::Table::GetUpdateList', { clear: true })
        // }
        private w1() {
            this.authBottom();
        }

        watchRole() {
            let self = this;
            let promiss = tea.mod.House.getPromissionInstance();
            promiss.attachWatch("对局统计", this.w1.bind(this));
            promiss.attachWatch("大赢家统计", this.w1.bind(this));
        }

    }
    export class selectFloor_Cell extends kaayou.Block {
        _data = null;
        // cb: ccui.CheckBox = null;
        fid: number = 0
        lbName: ccui.Text = null;
        constructor() {
            super();
        }

        initWithNode(node: ccui.Widget, callback) {
            let self = this;
            super.initWithNode(node);
            this.lbName = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "floorName");
            this.node.on(kaayou.TouchEvent.TouchEnd, function () {
                setTimeout(() => {
                    kaayou.emit("tea", "ui::Table::selectTbUpdate",{fid:self.fid});
                }, 100);
            }, this);
        }

        setFloorid(i: number, name: string) {
            // this.cb["fid"] = i;
            this.fid = i;
            this.lbName.setString(name);
            if (name.length > 5) {
                this.lbName.setFontSize(15);
            }
        }

        setCbselect(isSelected: boolean) {
            (<ccui.CheckBox>this.node).setSelected(isSelected);
        }

        setInfo(data, isSelected) {
            this._data = data;
            this.lbName.setString((data.level + 1) + "楼");
            (<ccui.CheckBox>this.node).setSelected(isSelected);
        }
        unuse() {
            this.removeFromParent();
        }
    }
    //------------------------------------选择桌子功能-----------------------------------------

}