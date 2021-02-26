namespace tea {
    class MemMemberCell extends kaayou.Block implements common.IPullListCell {
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
        _data: Data_HouseMemberItem = null;
        btnAuth: ccui.Button = null;
        btnRemove: ccui.Button = null;
        btnRemoveShort: ccui.Button = null;
        ebName: any = null;
        img_headBg: ccui.ImageView = null;//头像背景
        img_head: ccui.ImageView = null;
        ivAdmin: ccui.ImageView = null;
        ivCPAdmin: ccui.ImageView = null;
        ivMaster: ccui.ImageView = null;
        ivPartner: ccui.ImageView = null;
        ivVicePartner: ccui.ImageView = null;
        ivPause: ccui.Layout = null;
        label_line_state: ccui.Text = null;
        lbPartnerID: ccui.Text = null;
        lbPartnerName: ccui.Text = null;
        lyButton: ccui.Layout = null;
        ndName: cc.Layer = null;

        ivRemark: ccui.ImageView = null;

        label_name: ccui.Text = null;
        label_id: ccui.Text = null;
        label_time: ccui.Text = null;
        btn_dismiss: ccui.Button = null;
        btn_exit: ccui.Button = null;

        authSubMemberPage() {
            let self = this;
            let configData = common.mod.Config.GetAppConfig();
            self.lbPartnerID.setVisible(false);
            self.lbPartnerName.setVisible(false);
            if (tea.mod.__teaHouseInfo) {
                let role = tea.mod.__teaHouseInfo.urole;
                if (role == HouseMemberRole.OWNER || role == HouseMemberRole.ADMIN) {
                    self.lbPartnerID.setVisible(true);
                    self.lbPartnerName.setVisible(true);
                }
            }
        }

        initWithNode(node: ccui.Widget) {
            let self = this;
            super.initWithNode(node);
            this.lyButton = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "lyButton");
            this.btnAuth = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btnAuth");
            this.btnRemoveShort = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btnRemoveShort");
            this.lbPartnerID = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "PartnerID");
            this.lbPartnerName = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "PartnerName");
            this.ivPause = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Pause");
            this.ndName = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "NameInput");
            let sp = new cc["Scale9Sprite"]();
            sp.initWithFile(common.res.alpha_4x4, cc.rect(0, 0, 0, 0), cc.rect(0, 0, 0, 0));
            let eb: cc.Node = cc["EditBox"].create(this.ndName.getContentSize(), sp);
            this.ebName = eb;
            eb.setAnchorPoint(0, 0);
            eb.setPosition(0, 0);
            eb.setOpacity(0);
            eb['setFontSize'](20);
            eb['setFontColor'](cc.color("#90623E"));
            eb['setInputMode'](6);
            eb['setMaxLength'](10);

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
                        let gstr = ref.getString();
                        gstr = kaayou.blackList.checkBlackList(gstr);
                        self.ebName.setString(gstr);
                        //lw200703备注为空也保存，表示删除备注
                        let remarkInfo: ModifyHouseMemberRemark = {
                            hid: tea.mod.__teaHouseInfo.hid,
                            uid: self._data.uid,
                            uremark: gstr
                        };
                        kaayou.emit("tea", 'mod::TeaHouse::Member::ModifyMemberRemark', remarkInfo);
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
            this.img_headBg = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "imageHead");
            this.img_head = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "img_head");
            this.label_line_state = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_line_state");
            this.ivMaster = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "img_onwer");
            this.ivAdmin = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "img_mgr");
            this.ivCPAdmin = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "img_cpmgr");
            this.ivPartner = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "img_partner");
            this.ivVicePartner = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "img_vice_partner");
            this.ivRemark = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "ivRemark");

            this.label_name = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_name");
            this.label_id = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_id");
            this.label_time = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_time");
            //this.lbTired = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "TiredLabel");

            this.btnRemove = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btnRemove");

            this.img_headBg.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit("tea", "ui::HouseMemberInfo::Show", this._data);
            }, this);

            this.btnRemove.on(kaayou.TouchEvent.TouchEnd, function () {
                self.removeMember();
            }, this);

            this.btnRemoveShort.on(kaayou.TouchEvent.TouchEnd, function () {
                self.removeMember();
            }, this);

            this.btnAuth.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit("tea", "mod::Auth::Get", lodash.clone(this._data));
            }, this);

            kaayou.getController('tea').on('ui::TeaHouse::UpdateTiredBlock', function (e: kaayou.Event) {
                self.authSubMemberPage();
            }, this, 10);

            kaayou.getController("tea").on("ui::house:partnerKickStatus", function (e: kaayou.Event) {
                self.showRemoveButton();
            }, this, 10);
        }

        removeMember() {
            let self = this;
            kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
            if (lodash.isEmpty(self._data)) { return; }
            //lw200204如果是队长，提示不一样
            if (tea.mod.__teaHouseInfo.ispartner) {
                let options = {
                    msg: `是否确定将玩家${self._data.uid}移除亲友圈？`,
                    btns: [
                        {
                            name: "确定",
                            action: function () {
                                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                                kaayou.emit("tea", 'ui::MemberRemovePanel::Show', self._data)
                            },
                            colorType: 'green'
                        },
                        {
                            name: "取消",
                            action: function () {
                                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                            },
                            colorType: 'yellow'
                        }
                    ]
                }
                kaayou.emit('common', 'ui::Dialog::Show', options);
            } else {
                kaayou.emit("tea", 'ui::MemberRemovePanel::Show', self._data);
            }
        }

        private isPartner() {
            if (!tea.mod.__teaHouseInfo && !tea.mod.__teaHouseInfo.hid) {
                return;
            }
            return tea.mod.__teaHouseInfo.urole == HouseMemberRole.CAPTAIN;
        }

        private iAmAdmin() {
            if (!tea.mod.__teaHouseInfo && !tea.mod.__teaHouseInfo.hid) {
                return;
            }
            return tea.mod.__teaHouseInfo.urole == HouseMemberRole.ADMIN;
        }

        private iAmCreator() {
            if (!tea.mod.__teaHouseInfo && !tea.mod.__teaHouseInfo.hid) {
                return;
            }
            return tea.mod.__teaHouseInfo.urole == HouseMemberRole.OWNER;
        }

        private checkRemoveRole() {
            let PromissionAPI = tea.mod.House.getPromissionInstance();
            let info = tea.mod.__teaHouseInfo
            let isSelf = info.uid === this._data.uid;
            let isCT = this._data.urole == HouseMemberRole.OWNER
            let isCanDelete = PromissionAPI.query("踢出玩家") === tea.mod.House.PERMISSION_TYPE.ESCALATION


            if (this.iAmAdmin()) {
                return !isSelf && !isCT && isCanDelete;
            }


            if (this.iAmCreator()) {
                return !isSelf
            }


            return isCanDelete &&
                !isSelf &&
                (this._data.urole !== HouseMemberRole.CAPTAIN && (this._data.upartner !== 0 && this._data.upartner !== 1 || this._data.upartner === info.uid))

        }


        private watchkickout = function (data) {
            let isCanUse = data["minor_status"].new === tea.mod.House.PERMISSION_TYPE.ESCALATION;
            this.btnRemove.setVisible(this.checkRemoveRole() && isCanUse)
        }.bind(this)

        unwatchRole() {
            let promiss = tea.mod.House.getPromissionInstance();
            promiss.detachWatch("踢出玩家", this.watchkickout)
        }

        watchRole() {
            let self = this;
            let promiss = tea.mod.House.getPromissionInstance();
            promiss.watch("踢出玩家", (data) => {
                self.showRemoveButton();
            });
        }

        setInfo(data: Data_HouseMemberItem) {
            var self = this;
            //201027即使数据不变，但自身角色有可能变化
            if (lodash.isEqual(this._data, data)) {
                self.showRemoveButton();
                return;
            }
            this._data = lodash.cloneDeep(data);
            if (lodash.isEmpty(data)) {
                this.label_line_state.setString("");
                this.ivMaster.setVisible(false);
                this.ivAdmin.setVisible(false);
                this.ivCPAdmin.setVisible(false);
                this.ivPartner.setVisible(false);
                this.ivVicePartner.setVisible(false);
                this.ivRemark.setVisible(false);
                this.label_name.setString("");
                this.label_id.setString("");
                this.label_time.setString("");
                this.btnRemove.setVisible(false);
                this.lyButton.setVisible(false);
                this.lbPartnerID.setString("");
                this.lbPartnerName.setString("");
                this.ebName.setString("");
                return
            }
            let playerState = "离线";
            if (data.uonline && data.uplaying) {
                playerState = "游戏中";
            } else if (data.uonline) {
                playerState = "在线";
            }
            this.label_line_state.setString(playerState);
            this.label_line_state.setTextColor(!!data.uonline ? cc.color("#3d7220") : cc.color("#898989"));
            if (playerState == "游戏中") this.label_line_state.setTextColor(cc.color("#FF0000"));

            this.ivMaster.setVisible(data.urole == HouseMemberRole.OWNER);
            this.ivAdmin.setVisible(data.urole == HouseMemberRole.ADMIN);


            this.ivCPAdmin.setVisible(data.vitamin_admin);
            this.ivPartner.setVisible(data.upartner == 1);
            this.ivVicePartner.setVisible(data.vice_partner === true);//200127所有人都能看到副队长标签
            this.ivRemark.setVisible(!!(this._data.ruleMask & HouseRoleTable.VIEW_MEMBER_REMARk));
            this.label_name.setString(kaayou.Identify.nickNameSubSix(this._data.uname));
            this.label_id.setString("ID:" + this._data.uid);

            if (this._data.ulasttime !== undefined) {
                this.label_time.setString("离线:" + new Date(this._data.ulasttime * 1000).format('yyyy-MM-dd'));
            } else {
                this.label_time.setString("加入:" + new Date(this._data.ujointime * 1000).format('yyyy-MM-dd'));
            }
            this.ebName.setString("");
            if (!!this._data.uremark) {
                this.ebName.setString(this._data.uremark);
            }

            this.ivPause.setVisible(!!(this._data.game_limit));
            //如果被禁止娱乐就不显示头像，但头像仍然可以被点击
            if (this._data.game_limit) {
                this.img_head.setVisible(false);
            } else {
                NetImage.setPlayerHead(this.img_head, this._data.uurl, this._data.ugender, (url) => {
                    if (!this._data) { return false; }
                    if (url !== this._data.uurl) {
                        return false;
                    }
                    return true;
                });
                this.img_head.setVisible(true);
            }
            this.lyButton.setVisible(false);
            // this.lyButton.setVisible(data.urole == HouseMemberRole.ADMIN || data.urole == HouseMemberRole.VICECAPTAIN);
            
            //权限按钮的显示
            this.btnAuth.setVisible(false);
            //只有圈主和队长有该功能
            // if ((tea.mod.__teaHouseInfo.urole === HouseMemberRole.OWNER && (data.urole == HouseMemberRole.ADMIN || data.urole == HouseMemberRole.VICECAPTAIN)) ||
            //     (data.vice_partner && this.isPartner() && data.upartner === tea.mod.__teaHouseInfo.uid)) {
            //     if (this._data.uid != lobby.mod.User.getInstance().getUserInfo().uid) {
            //         if (this.lyButton.visible === false) {
            //             this.lyButton.setVisible(true)
            //         }
            //         this.btnAuth.setVisible(true);
            //     }

            // }
            self.showRemoveButton();

            if (this._data.upartner > 1) {
                this.lbPartnerID.setString("ID:" + this._data.upartner.toString());
                this.lbPartnerName.setString("昵称:" + kaayou.Identify.nickNameSubSix(this._data.upartnername));
            } else if (this._data.superior > 1) {
                this.lbPartnerID.setString("ID:" + this._data.superior.toString());
                this.lbPartnerName.setString("昵称:" + kaayou.Identify.nickNameSubSix(this._data.superiorname));
            } else {
                this.lbPartnerID.setString("");
                this.lbPartnerName.setString("");
            }
            self.authSubMemberPage();
            //this.unwatchRole();
            this.watchRole();
        }

        showRemoveButton() {
            let self = this;
            if (!!this._data) {
                let roleAuth = tea.mod.Permission.getInstance().hasPermission("踢出玩家");
                let sw = tea.mod.__teaHouseInfo.partnerkick;
                let myRole = tea.mod.User.getInstance().getRole();
                let dataRole = tea.mod.User.getInstance().getRoleByData(self._data);
                console.log("MyRole:"+myRole+" DataRole:"+dataRole);
                let bSameRole = myRole == dataRole;
                let bShow = false;

                if(myRole===HouseMemberRole.OWNER){
                    bShow = dataRole!=HouseMemberRole.OWNER
                }else if(roleAuth && sw){
                    switch(myRole){
                        case HouseMemberRole.ADMIN:
                            bShow = dataRole!=HouseMemberRole.OWNER && dataRole!=HouseMemberRole.ADMIN
                            break;
                        case HouseMemberRole.CAPTAIN:
                            bShow =  dataRole!=HouseMemberRole.CAPTAIN
                            break;
                        case HouseMemberRole.VICECAPTAIN:
                            bShow = dataRole!=HouseMemberRole.VICECAPTAIN && dataRole!=HouseMemberRole.CAPTAIN
                            break;
                    }

                }

                this.btnRemove.setVisible(bShow);
                // this.btnRemoveShort.setVisible(this.lyButton.visible && bShow);
            }
        }
    }

    enum MemSortType {
        Tired_ASC = 6,
        Tired_DESC = 7,
        LoginTime_ASC = 8,
        LoginTime_DESC = 9
    }

    export class SubMemPage {
        //btnTiredSort: ccui.Layout = null; //比赛分排序
        //ndSort: ccui.Layout = null; //成员排序块
        scroll_member: common.PullList = null; //成员列表
        searchMgr: MemSearchWidget = null;
        sortType: number = 0; //排序方式

        logintime_asc: ccui.Layout = null;
        logintime_desc: ccui.Layout = null;
        lasc: ccui.CheckBox = null;
        ldesc: ccui.CheckBox = null;

        topSortLeftLayout: ccui.Layout = null;
        btn_handAdd: ccui.Button = null;
        btn_forbidTogether: ccui.Button = null;
        btn_offwork: ccui.Button;
        btns:ccui.ScrollView;
        topSortLeft_radioGrup: common.RadioGroup = null;
        listType = 0; //是全部  1是在新 2是禁止娱乐
        isOffWork: boolean;
        //获取成员列表数据 
        doGetMemList(clear: boolean = true, search: string = "", sorttype: number = -1) {
            let self = this;
            self.sortType = sorttype;
            search = this.searchMgr.getSearchString();
            kaayou.emit("tea", 'mod::Member::GetMemberList', { param: search, clear: clear, sorttype: sorttype, listType: this.listType });
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
                this.scroll_member.initPullEnv();
            }
            this.lasc.setSelected(false)
            this.ldesc.setSelected(false)
            this.listType = 0;
            this.searchMgr.clearString();
            this.scroll_member.getAdpter().datas = [];
            this.scroll_member.refresh();
            (<ccui.CheckBox>(this.topSortLeftLayout.getChildren()[0])).setRadioSelected();
            this.topSortAuto();
        }

        topSortAuto() {
            let svis = (tea.mod._isManager() || tea.mod._isPartner() || tea.mod.__teaHouseInfo.vice_partner || tea.mod._isMaster())
            this.topSortLeftLayout.getChildren()[2].setVisible(svis);
            this.btn_handAdd.setVisible(tea.mod._isPartner() || tea.mod._isMaster());
            this.btn_offwork.setVisible(/0|5|8/.test(tea.mod.__teaHouseInfo.urole.toString()) || tea.mod.__teaHouseInfo.vice_partner===true)
            if(tea.mod.__teaHouseInfo.urole===8 || tea.mod.__teaHouseInfo.vice_partner===true){
                this.btns.setHorizontal(ccui.Layout.LayoutHorizontal.LEFT);
            }
            if(svis===false){
                let order1:any = <ccui.CheckBox>this.topSortLeftLayout.getChildren()[1]
                order1.loadTextureBackGround("TH_memberPanel_topbar_r.png", ccui.Widget.PLIST_TEXTURE)
                order1.loadTextureBackGroundSelected("TH_memberPanel_topbar_r_on.png", ccui.Widget.PLIST_TEXTURE)
                order1.loadTextureFrontCross("TH_memberPanel_topbar_r_on.png", ccui.Widget.PLIST_TEXTURE);
            }

            this.isOffWork = tea.mod.__teaHouseInfo.is_cur_user_team_off_work;

            if(this.isOffWork){
                this.btn_offwork.loadTextureNormal("TH_memberPanel_btn4.png",ccui.Widget.PLIST_TEXTURE)
                this.btn_offwork.loadTexturePressed("TH_memberPanel_btn5.png",ccui.Widget.PLIST_TEXTURE)
            }else{
                this.btn_offwork.loadTextureNormal("TH_memberPanel_btn6.png",ccui.Widget.PLIST_TEXTURE)
                this.btn_offwork.loadTexturePressed("TH_memberPanel_btn7.png",ccui.Widget.PLIST_TEXTURE)
            }

            let roleAuth = tea.mod.Permission.getInstance().hasPermission("禁止同桌");
            let addRole =  tea.mod.Permission.getInstance().hasPermission("手动添加");
            this.btn_forbidTogether.setVisible(roleAuth);
            this.btn_handAdd.setVisible(addRole)
            this.btns.doChildrenLayout();
        }

        topSortCheckMemNum(data) {
            if (!data) return;
            let allnum = ((data.totalnum == -1) ? "--" : data.totalnum);
            let onlinenum = ((data.onlinenum == -1) ? "--" : data.onlinenum);
            (<ccui.Text>this.topSortLeftLayout.getChildren()[0].getChildByName("label")).setString(`全部(${allnum})`);
            (<ccui.Text>this.topSortLeftLayout.getChildren()[1].getChildByName("label")).setString(`在线(${onlinenum})`);
            (<ccui.Text>this.topSortLeftLayout.getChildren()[2].getChildByName("label")).setString(`禁止娱乐(${data.limit_user_num})`);
        }

        onListTypeChange(e: kaayou.RadioEvent) {
            let index = e.target['index'];
            let v = <ccui.CheckBox>e.target;
            this.listType = index;
            console.log("---" + index);
            this.doGetMemList(true);
        }

        //初始化成员列表页面
        initWidthNode(pageMem: cc.Node, searchMgr: MemSearchWidget, cellMod: ccui.Widget) {

            let self = this;
            this._page = pageMem;
            kaayou.getController('teaMem').on('ui::Member::SubpageChange', this.onSubpageChange, this);

            this.searchMgr = searchMgr;

            this.logintime_asc = ccui.helper.seekWidgetByName(<ccui.Widget>this._page, "down");
            this.logintime_desc = ccui.helper.seekWidgetByName(<ccui.Widget>this._page, "up");

            this.ldesc = ccui.helper.seekWidgetByName(<ccui.Widget>this.logintime_desc, "cbdesc");
            this.lasc = ccui.helper.seekWidgetByName(<ccui.Widget>this.logintime_asc, "cbasc");

            this.lasc.setSelected(false)
            this.ldesc.setSelected(false)

            this.btn_forbidTogether = ccui.helper.seekWidgetByName(<ccui.Widget>this._page, "btn_forbidTogether");

            this.btn_forbidTogether.on(kaayou.TouchEvent.TouchEnd, () => {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit('tea', 'ui::NoDeskmate::Show');
            }, this)

            this.btns = ccui.helper.seekWidgetByName(<ccui.Widget>this._page, "btns");
            this.btns.setPadding({spacingX:20})
            this.btns.setHorizontal(ccui.Layout.LayoutHorizontal.RIGHT);
            //this.btns.setEnabled(false)
            this.btns.setScrollBarEnabled(false);

            this.isOffWork = false;
            this.btn_offwork = <ccui.Button>ccui.helper.seekWidgetByName(<ccui.Widget>this._page, "btn_offwork");
            this.btn_offwork.on(kaayou.TouchEvent.TouchEnd, () => {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                let options = {
                    msg: this.isOffWork?"您要恢复小队娱乐么？":"您要禁止小队娱乐么？",
                    btns: [
                        {
                            name: "确定",
                            action: function () {
                                kaayou.emit("tea", 'mod::TeaHouse::offWork',{is_off_work:!self.isOffWork});                
                            },
                            colorType: 'green'
                        },
                        {
                            name: "取消",
                            action: function () { },
                            colorType: 'yellow'
                        }
                    ]
                }
                kaayou.emit('common', 'ui::Dialog::Show', options);
            },this)

            this.btn_handAdd = ccui.helper.seekWidgetByName(<ccui.Widget>this._page, "btn_addHand");

            this.btn_handAdd.on(kaayou.TouchEvent.TouchEnd, () => {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit("tea", 'ui::SendInvitePanel::Show');
            }, this)
            this.topSortLeft_radioGrup = new common.RadioGroup()
            this.topSortLeftLayout = ccui.helper.seekWidgetByName(<ccui.Widget>this._page, "sortMemOne");
            lodash.forEach(this.topSortLeftLayout.getChildren(), function (v: ccui.CheckBox, i) {
                v['index'] = i;
                self.topSortLeft_radioGrup.add(v);
                v.on(kaayou.RadioEvent.SELECTED, self.onListTypeChange, self);
                v.on(kaayou.RadioEvent.SELECTED, ()=>{
                    self.topSortLeftLayout.getChildren().forEach(v=>{
                        let label = <ccui.Text>v.getChildByName("label")
                        if(v["index"]===i){
                            label.setColor(cc.color("#975638"))
                        }else{
                            label.setColor(cc.color("#3967B2"))
                        }
                    })
                }, self);
            })



            this.logintime_asc.on(kaayou.TouchEvent.TouchEnd, () => {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                if (this.lasc.isSelected()) {
                    //恢复一般排序
                    this.doGetMemList(true)
                    this.lasc.setSelected(false)
                } else {
                    this.ldesc.setSelected(false);
                    this.lasc.setSelected(true)
                    //从新到老
                    this.doGetMemList(true, searchMgr.getSearchString(), MemSortType.LoginTime_ASC)
                }
            }, this)

            this.logintime_desc.on(kaayou.TouchEvent.TouchEnd, () => {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                if (this.ldesc.isSelected()) {
                    //恢复一般排序
                    this.doGetMemList(true)
                    this.ldesc.setSelected(false)
                } else {
                    this.ldesc.setSelected(true);
                    this.lasc.setSelected(false)
                    //从新到老
                    this.doGetMemList(true, searchMgr.getSearchString(), MemSortType.LoginTime_DESC)
                }
            }, this)

            this.scroll_member = new common.PullList();
            // this.scroll_member._debugRect = true;
            this.scroll_member.setSpacingY(8);
            this.scroll_member.initWithNode(<cc.Node>pageMem.getChildren()[1]);
            this.scroll_member.setAdpter({
                getCell: () => {
                    let v = new MemMemberCell();
                    v.initWithNode(cellMod);
                    return v;
                },
                datas: []
            });
            // this.scroll_member.initPullEnv();
            // this.scroll_member.refresh();
            this.scroll_member.on(kaayou.PullListEvent.HeadFinish, (e: kaayou.PullListEvent) => {
                let target = e.target;
                setTimeout(() => {
                    self.doGetMemList(true);
                }, 500);

            }, this);
            this.scroll_member.on(kaayou.PullListEvent.FootFinish, (e: kaayou.PullListEvent) => {
                let target = e.target;
                setTimeout(() => {
                    self.doGetMemList(false);
                }, 500);
            }, this);

            this.watchRole();

            kaayou.getController('tea').on('ui::Member::UpdateMember', function (e: kaayou.Event) {
                let data: { list: Data_HouseMemberItem, update: boolean } = e.data
                if (data) {
                    if (data.update) {
                        self.scroll_member.getAdpter().datas = lodash.clone(data.list);
                    }
                } else {
                    self.scroll_member.getAdpter().datas = [];
                    kaayou.emit("common", "ui::Toast::Show", { msg: "没有查询到数据，请重试" });
                }
                self.scroll_member.refresh();
            }, this, 10);


            kaayou.getController('tea').on('ui::Member::RefreshMemberList', function (e: kaayou.Event) {
                self.topSortAuto();
                self.doGetMemList(true);
            }, this, 10);

            kaayou.getController('teaMem').on('ui::Member::Search', function (e: kaayou.Event) {
                if (self._page.isVisible()) {
                    self.doGetMemList(true);
                }
            }, this, 10);

            kaayou.getController('tea').on('ui::TeaHouse::NoGameChange', function (e: kaayou.Event) {
                self.doGetMemList(true);
            }, this, 10);

            kaayou.getController('tea').on('ui::TeaHouse::UpdateTiredBlock', function (e: kaayou.Event) {
                self.topSortAuto();
            }, this, 10);


            kaayou.getController('tea').on('ui::TeaHouse::Member::UpdateKickMember', function (e: kaayou.Event) {
                self.doGetMemList(true);
            }, this, 10);

            kaayou.getController('tea').on('ui::TeaHouse::Member::UpdateMemberInfo', function (e: kaayou.Event) {
                // self.getPanel(false) && self.getPanel(false).onUpdateMemberInfo(e.data);
                // this.label_member_count.setString(`亲友圈成员数：${((data.onlinenum == -1) ? "--" : data.onlinenum)}/${((data.totalnum == -1) ? "--" : data.totalnum)}`);
                self.topSortCheckMemNum(e.data);
            }, this, 10);


            kaayou.getController('tea').on("ui::TeaHouse::updateoffworkstatus", function (e: kaayou.Event) {
                let {is_off_work} = e.data;
                if(self.btn_offwork.isVisible()){
                    this.isOffWork=is_off_work;
                    if(this.isOffWork){
                        self.btn_offwork.loadTextureNormal("TH_memberPanel_btn4.png",ccui.Widget.PLIST_TEXTURE)
                        self.btn_offwork.loadTexturePressed("TH_memberPanel_btn5.png",ccui.Widget.PLIST_TEXTURE)
                        kaayou.emit("common", "ui::Toast::Show", { msg: "小队已被禁用，玩家将暂停娱乐" });
                    }else{
                        self.btn_offwork.loadTextureNormal("TH_memberPanel_btn6.png",ccui.Widget.PLIST_TEXTURE)
                        self.btn_offwork.loadTexturePressed("TH_memberPanel_btn7.png",ccui.Widget.PLIST_TEXTURE)
                    }
                }
            },this,10);

        }

        watchRole() {
            let promiss = tea.mod.House.getPromissionInstance();
            promiss.watch("禁止同桌", this.topSortAuto.bind(this));
            promiss.watch("手动添加", this.topSortAuto.bind(this));
        }
    }
}