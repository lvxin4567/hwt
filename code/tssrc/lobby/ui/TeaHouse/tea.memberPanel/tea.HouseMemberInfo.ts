namespace tea {
    var { doBindEvent, BindEvent } = kaayou._decorator;

    interface contentCell {
        color: string,
        content: string,
    }

    export class HouseMemberInfoManager {
        static __INS__: HouseMemberInfoManager = null;
        _zOrder:number = 0;
        __selfDialog:HouseMemberInfo
        static getInstance(_zOrder: number = 0) {
            if (HouseMemberInfoManager.__INS__ == null) {
                HouseMemberInfoManager.__INS__ = new HouseMemberInfoManager();
                HouseMemberInfoManager.__INS__.init();
                HouseMemberInfoManager.__INS__._zOrder = _zOrder
            }
            return HouseMemberInfoManager.__INS__;
        }
        HouseMemberInfo: tea.HouseMemberInfo = null
        init() {
            let self = this;
            kaayou.getController('tea').on('ui::HouseMemberInfo::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show(e.data);
            }, this, 10);
            kaayou.getController('tea').on('ui::HouseMemberInfo::Hide', function (e: kaayou.Event) {
                self.getPanel(false).Hide();
            }, this, 10);
            return true;

        }

        getPanel(create: boolean = false) {
            if (create && this.__selfDialog == null) {
                this.__selfDialog = new HouseMemberInfo();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfDialog,this._zOrder);
                this.__selfDialog['onConfigUpdate'] && this.__selfDialog['onConfigUpdate']();
            }
            return this.__selfDialog;
        }

        // showMemberInfo(data: Data_HouseMemberItem) {
        //     let dialog = new tea.HouseMemberInfo();
        //     this.HouseMemberInfo = dialog;
        //     kaayou.UIManager.getInstance().getCurRuningScene().addChild(dialog);
        //     dialog.Show(data);
        // }

        // DialogRemoved() {
        //     if (this.HouseMemberInfo && this.HouseMemberInfo.isRunning()) {
        //         this.HouseMemberInfo.removeFromParent();
        //     }
        // }
    }

    export class HouseMemberInfo extends kaayou.ModelLayer {
        
        constructor() {
            super();
            this.initUI();
        }
        bCreate: boolean;
        bAdmin: boolean = false;
        bBlackList: boolean = false;
        bCPAdmin: boolean = false;
        bNoGame: boolean = false;
        bPartner: boolean = false;
        isSelfMember: boolean = false;
        isSelf:boolean=false;
        isVicePartner: boolean = false;
        btnAdmin: ccui.Button = null;
        btnAdminDisable: ccui.Button = null;
        btnBlackList: ccui.Button = null;
        btnBlackListDisable: ccui.Button = null;
        btnClose: ccui.Button = null;
        RoleAdminButton: ccui.Button = null;
        RoleAdminButtonDisable: ccui.Button = null;
        btnModify: ccui.Button = null;

        btnNoGame: ccui.Button = null;
        btnNoGameDisable: ccui.Button = null;
        btnPartner: ccui.Button = null;
        btnPartnerDisable: ccui.Button = null;

        btnVicePartner: ccui.Button = null;
        btnVicePartnerDisable: ccui.Button = null;

        head_image: ccui.ImageView = null;
        label_name: ccui.Text = null;
        label_ID: ccui.Text = null;
        label_join: ccui.Text = null;
        label_remark: ccui.Text = null;
        lbTiredValue: ccui.Text = null;

        _data: Data_HouseMemberItem;

        authMemberInfo() {
            let self = this;
            let configData = common.mod.Config.GetAppConfig();
            let fcm = configData.feature.pl;
            if (!tea.mod.__teaHouseInfo) {
                return;
            }
            
            let myRole = tea.mod.__teaHouseInfo.urole;
            let isSwitch = tea.mod.__teaHouseInfo.isvitamin;
            let isAdminCanSee = tea.mod.__teaHouseInfo.isvitaminhide;

            let PromissionAPI = tea.mod.House.getPromissionInstance();

            let allButtons = {
                AdminButton: [self.btnAdmin, self.btnAdminDisable],
                roleButton: [self.RoleAdminButton, self.RoleAdminButtonDisable],
                partner: [self.btnPartner, self.btnPartnerDisable],
                vicePartner: [self.btnVicePartner, self.btnVicePartnerDisable],
                noGame: [self.btnNoGame, self.btnNoGameDisable],
                blacklist: [self.btnBlackList, self.btnBlackListDisable]
            }
            let hideButton = Object.keys(allButtons)

            self.btnModify.setVisible(false);
            if (fcm) {
                if (isSwitch) {
                    if (myRole == HouseMemberRole.OWNER) {
                        self.btnModify.setVisible(true);
                    } else if (myRole == HouseMemberRole.ADMIN && isAdminCanSee) {
                        self.btnModify.setVisible(true);
                    } else if (self._data && self._data.uid == tea.mod.__teaHouseInfo.uid) {
                    } else {
                    }
                } else {
                }
            } else {
            }

            if (myRole == HouseMemberRole.OWNER) {
                if (this._data.uid != tea.mod.__teaHouseInfo.uid) {
                    this.btnAdmin.setVisible(!self.bPartner && !self.bCPAdmin && !self.isVicePartner);
                    this.btnAdminDisable.setVisible(self.bPartner || self.bCPAdmin || self.isVicePartner);
                    this.RoleAdminButton.setVisible(self.bPartner || self.bAdmin);
                    this.RoleAdminButtonDisable.setVisible(!self.bPartner && !self.bAdmin);
                    this.btnNoGame.setVisible(true);
                    this.btnNoGameDisable.setVisible(false);
                    this.btnBlackList.setVisible(true);
                    this.btnBlackListDisable.setVisible(false);
                    this.btnPartner.setVisible(!self.bAdmin && !self.bCPAdmin /*&& !self.isVicePartner*/);
                    this.btnPartnerDisable.setVisible(self.bAdmin || self.bCPAdmin /*|| self.isVicePartner*/);
                }

                if(this._data.urole===tea.HouseMemberRole.MEMBER|| this.isVicePartner){
                    this.RoleAdminButton.setVisible(false)
                    this.RoleAdminButtonDisable.setVisible(false)
                }

                hideButton = ["vicePartner"]


            } else if (myRole == HouseMemberRole.CPADMIN) {
                this.btnAdmin.setVisible(false);
                this.btnAdminDisable.setVisible(true);
                this.RoleAdminButton.setVisible(false);
                this.RoleAdminButtonDisable.setVisible(true);
                this.btnNoGame.setVisible(false);
                this.btnNoGameDisable.setVisible(true);
                this.btnBlackList.setVisible(false);
                this.btnBlackListDisable.setVisible(true);
                this.btnPartner.setVisible(false);
                this.btnPartnerDisable.setVisible(true);

            } else if (myRole == HouseMemberRole.ADMIN) {
                let partnerRole =mod.House.getPromissionInstance().query("设置队长") == tea.mod.House.PERMISSION_TYPE.ESCALATION && !this.isVicePartner;
                let roleAuth1=mod.Permission.getInstance().hasPermission("禁止娱乐");
                let roleAuth2=mod.Permission.getInstance().hasPermission("恢复娱乐");
                let roleblacklist = mod.Permission.getInstance().hasPermission("移入黑名单");
                ["partner","noGame", "blacklist"].map(v => allButtons[v]).forEach((v: Array<ccui.Button>) => {
                    v.forEach(el => {
                        el.setVisible(true)
                    })
                })
                if (this._data.urole == tea.HouseMemberRole.OWNER || this._data.urole == tea.HouseMemberRole.ADMIN || this.isVicePartner) {
                    this.btnNoGame.setVisible(false);
                    this.btnNoGameDisable.setVisible(true);
                } else {
                    let noGameRole = roleAuth1 && !this.bNoGame || roleAuth2 && this.bNoGame
                    this.btnNoGame.setVisible(noGameRole);
                    this.btnNoGameDisable.setVisible(!noGameRole);
                    this.btnBlackList.setVisible(roleblacklist);
                    this.btnBlackListDisable.setVisible(!roleblacklist);
                    this.btnPartner.setVisible(partnerRole);
                    this.btnPartnerDisable.setVisible(!partnerRole);
                }
                hideButton = ["vicePartner", "AdminButton", "roleButton"]
            } else if (myRole == HouseMemberRole.CAPTAIN) {
                ["noGame","roleButton","partner", "vicePartner"].map(v => allButtons[v]).forEach((v: Array<ccui.Button>) => {
                    v.forEach(el => {
                        el.setVisible(true)
                    })
                })
                hideButton = ["blacklist", "AdminButton"]
                
                if (self._data.uid === tea.mod.__teaHouseInfo.uid){
                    self.btnVicePartner.setVisible(false);
                    this.btnNoGame.setVisible(false);
                    self.RoleAdminButton.setVisible(false)
                }
                else
                    self.btnVicePartnerDisable.setVisible(false);

                

                if (self.isSelfMember) {

                    if(tea.mod.__teaHouseInfo.superiorid>1){
                        hideButton = ["blacklist", "AdminButton","partner"]
                    }

                    self.RoleAdminButton.setVisible(false)
                    this.btnNoGame.setVisible(true);
                    this.btnNoGameDisable.setVisible(false);
                    this.btnPartner.setVisible(true)
                    this.btnPartnerDisable.setVisible(false);
                    if (self.bNoGame) {
                        //lw200528队长可以恢复旗下玩家娱乐
                        this.btnNoGame.setVisible(true);
                        this.btnNoGameDisable.setVisible(false);
                    }
                    if(!self.bNoGame && !tea.mod.Permission.getInstance().hasPermission("禁止娱乐")){
                        this.btnNoGame.setVisible(false)
                        this.btnNoGameDisable.setVisible(true);
                    }

                    if(self.bNoGame &&(!tea.mod.Permission.getInstance().hasPermission("恢复娱乐") || tea.mod.__teaHouseInfo.is_limit_game)){
                        this.btnNoGame.setVisible(false)
                        this.btnNoGameDisable.setVisible(true);
                    }


                    if(!tea.mod.Permission.getInstance().hasPermission("设置队长")){
                        this.btnPartner.setVisible(false)
                        this.btnPartnerDisable.setVisible(true);
                    }
                    
                }

                if (self.isVicePartner) {
                    this.btnPartner.setVisible(false);
                    this.btnPartnerDisable.setVisible(true);
                    self.RoleAdminButtonDisable.setVisible(false)
                    self.RoleAdminButton.setVisible(true)
                }

                if (self.bPartner) {
                    self.RoleAdminButton.setVisible(false)
                    this.btnVicePartner.setVisible(false);
                    this.btnVicePartnerDisable.setVisible(true);
                }

                if (!tea.mod.__teaHouseInfo.hm_switch.CapSetDep) {
                    hideButton = ["blacklist", "AdminButton", "roleButton", "partner"];
                }

            }else if(myRole===HouseMemberRole.VICECAPTAIN){
                ["noGame", "partner"].map(v => allButtons[v]).forEach((v: Array<ccui.Button>) => {
                    v.forEach(el => {
                        el.setVisible(true)
                    })
                });
                let bNoGame = this.bNoGame;
                let roleAuth1=tea.mod.Permission.getInstance().hasPermission("禁止娱乐");
                let roleAuth2=tea.mod.Permission.getInstance().hasPermission("恢复娱乐");
                // let partnerRole = tea.mod.Permission.getInstance().hasPermission("设置队长") && !this.isSelf && this._data.urole !==tea.HouseMemberRole.CAPTAIN;
                if(!this.isSelf && (!this.bPartner))
                    if( (roleAuth1 && !bNoGame || roleAuth2 && bNoGame ) && this._data.urole !==tea.HouseMemberRole.VICECAPTAIN ){
                        allButtons.noGame[0].setVisible(true);
                        allButtons.noGame[1].setVisible(false);
                    }else{
                        allButtons.noGame[0].setVisible(false);
                        allButtons.noGame[1].setVisible(true);
                    }

                if(bNoGame  && tea.mod.__teaHouseInfo.is_limit_game){
                    allButtons.noGame[0].setVisible(false);
                    allButtons.noGame[1].setVisible(true);
                }

                // this.btnPartner.setVisible(partnerRole)
                // this.btnPartnerDisable.setVisible(!partnerRole)

                // if(this._data.urole === HouseMemberRole.MEMBER){
                //     this.btnPartner.setVisible(false)
                //     this.btnPartnerDisable.setVisible(false)
                // }

                hideButton = ["blacklist", "AdminButton", "roleButton", "vicePartner", "partner"];
                // //能显示的都是自己队的
                // //如果该玩家不是自己、队长、副队长
                // if (this._data.upartner != 1 && !this._data.vice_partner && self._data.uid != tea.mod.__teaHouseInfo.uid) {
                //     this.btnNoGame.setVisible(true);
                //     this.btnNoGameDisable.setVisible(false);
                //     if (self.bNoGame) {
                //         //lw200528副队长可以恢复旗下玩家娱乐
                //         this.btnNoGame.setVisible(true);
                //         this.btnNoGameDisable.setVisible(false);
                //     }
                // }
                // else {
                //     this.btnNoGame.setVisible(false);
                //     this.btnNoGameDisable.setVisible(false);
                // }
            }

            hideButton.map(v => allButtons[v]).forEach((v: Array<ccui.Button>) => {
                v.forEach(v => {
                    v.setVisible(false);
                })
            })
        }

        initUI() {
            this.initWithccs(tea.res.MemberUserInfo_Json);
            this.isTouchMaskHide = false;
            let self = this;
            self.btnAdmin = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "AdminButton");
            self.btnAdminDisable = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "AdminButtonDisable");
            self.btnBlackList = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "BlackListButton");
            self.btnBlackListDisable = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "BlackListButtonDisable");
            self.RoleAdminButton = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "RoleAdminButton");
            self.RoleAdminButtonDisable = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "RoleAdminButtonDisable");
            self.btnNoGame = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "NoGameButton");
            self.btnNoGameDisable = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "NoGameButtonDisable");
            self.btnPartner = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "PartnerButton");
            self.btnPartnerDisable = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "PartnerButtonDisable");
            self.btnClose = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_close");
            self.label_name = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "user_name");
            self.label_ID = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "user_id");
            self.label_join = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "user_join_time");
            self.label_remark = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_remark");
            self.head_image = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "head_img");
            self.lbTiredValue = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "ValueLabel");
            self.btnModify = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "ModifyButton");
            self.btnVicePartner = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "VicePartnerButton");
            self.btnVicePartnerDisable = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "VicePartnerButtonDisable");

            self.btnClose.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.Hide();
            }, this);
            self.btnModify.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
            }, this);


            self.btnVicePartner.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                if (self.isVicePartner) {
                    let options = {
                        msg: "该用户将会丧失副队长的所有权限",
                        btns: [
                            {
                                name: "确定",
                                action: function () {
                                    kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                                    kaayou.emit("tea", 'mod::TeaHouse::setVicePartner', {
                                        uid: self._data.uid,
                                        hid: tea.mod.__teaHouseInfo.hid,
                                        vice: false
                                    });
                                    self.Hide();
                                },
                                colorType: 'green'
                            },
                            {
                                name: "取消",
                                colorType: 'blue',
                                action: function () {
                                    kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                                }
                            }
                        ]
                    }
                    kaayou.emit("common", "ui::Dialog::Show", options);
                } else {
                    let options = {
                        msg: "该用户将会获得副队长的所有权限",
                        btns: [
                            {
                                name: "确定",
                                action: function () {
                                    kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                                    kaayou.emit("tea", 'mod::TeaHouse::setVicePartner', {
                                        uid: self._data.uid,
                                        hid: tea.mod.__teaHouseInfo.hid,
                                        vice: true
                                    });
                                    self.Hide();
                                },
                                colorType: 'green'
                            },
                            {
                                name: "取消",
                                colorType: 'blue',
                                action: function () {
                                    kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                                }
                            }
                        ]
                    }
                    kaayou.emit("common", "ui::Dialog::Show", options);
                }
            }, this);


            self.btnVicePartnerDisable.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                let tinfo = tea.mod.__teaHouseInfo;
                let msg = "队长才拥有此项权限";
                if (self._data && self._data.uid == tinfo.uid) {
                    msg = "无法调整自身身份"
                }
                let options = {
                    msg: msg,
                    btns: [
                        {
                            name: "确定",
                            action: function () {
                                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                            },
                            colorType: 'green'
                        }
                    ]
                }
                kaayou.emit("common", "ui::Dialog::Show", options);
            }, this);

            self.btnAdmin.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                if (self.bAdmin) {
                    let options = {
                        msg: "取消管理员身份将会丧失所有管理权限",
                        btns: [
                            {
                                name: "确定",
                                action: function () {
                                    kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                                    kaayou.emit("tea", 'mod::Member::SetRole', {
                                        uid: self._data.uid,
                                        urole: HouseMemberRole.MEMBER,
                                        oldurole: self._data.urole,
                                    });
                                    self.Hide();
                                },
                                colorType: 'green'
                            },
                            {
                                name: "取消",
                                colorType: 'blue',
                                action: function () {
                                    kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                                }
                            }
                        ]
                    }
                    kaayou.emit("common", "ui::Dialog::Show", options);
                } else {
                    let options = {
                        msg: "确定设置该玩家为管理员吗？",
                        btns: [
                            {
                                name: "确定",
                                action: function () {
                                    kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                                    kaayou.emit("tea", 'mod::Member::SetRole', {
                                        uid: self._data.uid,
                                        urole: HouseMemberRole.ADMIN,
                                        oldurole: self._data.urole,
                                    });
                                    self.Hide();
                                },
                                colorType: 'green'
                            },
                            {
                                name: "取消",
                                colorType: 'blue',
                                action: function () {
                                    kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                                }
                            }
                        ]
                    }
                    kaayou.emit("common", "ui::Dialog::Show", options);
                    // kaayou.emit("tea", 'mod::Member::SetRole', {
                    //     uid: self._data.uid,
                    //     urole: HouseMemberRole.ADMIN,
                    //     oldurole: self._data.urole,
                    // });
                    // self.Hide();
                }
            }, this);

            self.btnAdminDisable.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                let myRole = tea.mod.__teaHouseInfo.urole;
                let msg = "圈主才拥有此项权限";
                if (myRole == tea.HouseMemberRole.MEMBER
                    || tea.mod.__teaHouseInfo.vitamin_admin) {

                } else if (self._data.urole == tea.HouseMemberRole.OWNER) {
                    msg = "圈主不能兼任管理员";
                } else if (self._data.upartner == 1 || self._data.vitamin_admin) {
                    msg = "请先撤销该玩家的当前角色";
                }
                let options = {
                    msg: msg,
                    btns: [
                        {
                            name: "确定",
                            action: function () {
                                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                            },
                            colorType: 'green'
                        }
                    ]
                }
                kaayou.emit("common", "ui::Dialog::Show", options);
            }, this);

            self.RoleAdminButton.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                //权限
                kaayou.emit("tea", "mod::Auth::Get", lodash.clone(this._data));
            }, this);

            self.RoleAdminButtonDisable.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                let msg = "您没有此权限";
                
                let options = {
                    msg: msg,
                    btns: [
                        {
                            name: "确定",
                            action: function () {
                                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                            },
                            colorType: 'green'
                        }
                    ]
                }
                kaayou.emit("common", "ui::Dialog::Show", options);
            }, this);

            self.btnBlackList.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                let data = lodash.cloneDeep(self._data);
                data.addBlack = true;
                kaayou.emit("tea", 'ui::MemberRemovePanel::Show', data);
                self.Hide();
            }, this);

            self.btnBlackListDisable.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                let role = tea.mod.__teaHouseInfo.urole;
                let msg = "您没有此权限";
                // if (self._data.urole == tea.HouseMemberRole.CREATER) {
                //     msg = "圈主不能进入黑名单";
                // } else if (role == tea.HouseMemberRole.ADMIN && self._data.urole == tea.HouseMemberRole.ADMIN) {
                //     msg = "圈主才拥有此项权限";
                // }
                let options = {
                    msg: msg,
                    btns: [
                        {
                            name: "确定",
                            action: function () {
                                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                            },
                            colorType: 'green'
                        }
                    ]
                }
                kaayou.emit("common", "ui::Dialog::Show", options);
            }, this);

            self.btnNoGame.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                if (self.bNoGame) {
                    if (self._data.upartner == 1) {
                        kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                        kaayou.emit("tea", 'ui::TeaHouse::ShowForbidCaptain', {
                            uid: self._data.uid, isForbid: false
                        });
                    } else {
                        let options = {
                            msg: "玩家将解除亲友圈游戏限制",
                            btns: [
                                {
                                    name: "确定",
                                    action: function () {
                                        kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                                        kaayou.emit("tea", 'mod::TeaHouse::setNoGame', {
                                            hid: tea.mod.__teaHouseInfo.hid, uid: self._data.uid, allow_game: true
                                        });
                                        self.Hide();
                                    },
                                    colorType: 'green'
                                },
                                {
                                    name: "取消",
                                    colorType: 'blue',
                                    action: function () {
                                        kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                                    }
                                }
                            ]
                        }
                        kaayou.emit("common", "ui::Dialog::Show", options);
                    }
                } else {
                    if (self._data.upartner == 1) {
                        kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                        kaayou.emit("tea", 'ui::TeaHouse::ShowForbidCaptain', {
                            uid: self._data.uid, isForbid: true
                        });
                    } else {
                        let options = {
                            msg: "玩家将无法在本亲友圈进行游戏",
                            btns: [
                                {
                                    name: "确定",
                                    action: function () {
                                        kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                                        kaayou.emit("tea", 'mod::TeaHouse::setNoGame', {
                                            hid: tea.mod.__teaHouseInfo.hid, uid: self._data.uid, allow_game: false
                                        });
                                        self.Hide();
                                    },
                                    colorType: 'green'
                                },
                                {
                                    name: "取消",
                                    colorType: 'blue',
                                    action: function () {
                                        kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                                    }
                                }
                            ]
                        }
                        kaayou.emit("common", "ui::Dialog::Show", options);
                    }
                }
            }, this);

            self.btnNoGameDisable.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                let role = tea.mod.__teaHouseInfo.urole;
                let msg = "您没有此项权限";
                // if (self._data.urole == tea.HouseMemberRole.CREATER) {
                //     msg = "圈主不能禁止娱乐";
                // } else if (role == tea.HouseMemberRole.ADMIN && self._data.urole == tea.HouseMemberRole.ADMIN) {
                //     msg = "圈主才拥有此项权限";
                // }
                let options = {
                    msg: msg,
                    btns: [
                        {
                            name: "确定",
                            action: function () {
                                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                            },
                            colorType: 'green'
                        }
                    ]
                }
                kaayou.emit("common", "ui::Dialog::Show", options);
            }, this);

            self.btnPartner.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                if(self.isVicePartner){
                    kaayou.emit('common', 'ui::Toast::Show', {
                        msg: `该玩家已绑定队长(ID:${self._data.upartner}),请先解除绑定关系后再做尝试!`
                    });
                    return;
                }

                if (self.bPartner) {
                    let options = {
                        msg: "取消队长身份的同时会解除名下玩家关联",
                        btns: [
                            {
                                name: "确定",
                                action: function () {
                                    kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                                    kaayou.emit("tea", 'mod::TeaHouse::setPartner', {
                                        hid: tea.mod.__teaHouseInfo.hid, uid: self._data.uid, grant: false
                                    });
                                    self.Hide();
                                },
                                colorType: 'green'
                            },
                            {
                                name: "取消",
                                colorType: 'blue',
                                action: function () {
                                    kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                                }
                            }
                        ]
                    }
                    kaayou.emit("common", "ui::Dialog::Show", options);
                } else {
                    let options = {
                        msg: "队长将拥有名下玩家的所有数据查看权限",
                        btns: [
                            {
                                name: "确定",
                                action: function () {
                                    kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                                    if (self.isSelfMember) {
                                        kaayou.emit("tea", "mod::Member::setSubPartner", {
                                            hid: tea.mod.__teaHouseInfo.hid,
                                            junior: self._data.uid,
                                            callback: function () {
                                                self.btnPartner.setVisible(false)
                                                self.btnPartnerDisable.setVisible(true);
                                            }
                                        });
                                    } else {
                                        kaayou.emit("tea", 'mod::TeaHouse::setPartner', {
                                            hid: tea.mod.__teaHouseInfo.hid, uid: self._data.uid, grant: true
                                        });
                                    }
                                    self.Hide();
                                },
                                colorType: 'green'
                            },
                            {
                                name: "取消",
                                colorType: 'blue',
                                action: function () {
                                    kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                                }
                            }
                        ]
                    }
                    kaayou.emit("common", "ui::Dialog::Show", options);
                }
            }, this);



            self.btnPartnerDisable.on(kaayou.TouchEvent.TouchEnd, function () {
                let role = tea.mod.__teaHouseInfo.urole;
                let msg = "圈主才拥有此项权限";
                if (tea.mod.__teaHouseInfo.urole == tea.HouseMemberRole.MEMBER
                    || tea.mod.__teaHouseInfo.vitamin_admin) {

                } else if (self._data.urole == tea.HouseMemberRole.OWNER) {
                    msg = "圈主不能兼任队长";
                } else if (self._data.urole == tea.HouseMemberRole.ADMIN
                    || self._data.vitamin_admin) {
                    msg = "请先撤销该玩家的当前角色";
                }
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                let options = {
                    msg: msg,
                    btns: [
                        {
                            name: "确定",
                            action: function () {
                                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                            },
                            colorType: 'green'
                        }
                    ]
                }
                kaayou.emit("common", "ui::Dialog::Show", options);
            }, this);

            kaayou.getController('tea').on('ui::TeaHouse::UpdateTiredValue', function (e: kaayou.Event) {
                self.lbTiredValue.setString("比赛分：" + e.data.value);
            }, this, 10);

            kaayou.getController('tea').on('ui::TeaHouse::UpdateTiredBlock', function (e: kaayou.Event) {
                self.authMemberInfo();
            }, this, 10);

            kaayou.getController('tea').on('ui::TeaHouse::PartnerChange', function (e: kaayou.Event) {
                if (!!e.data) {
                    self.Show(e.data);
                }
            }, this, 10);

            //当玩家角色变化的时候需要刷新
            kaayou.getController("lobby").on("ws::Msg::houseparnterbindsuperior_ntf", (e: kaayou.Event) => {
                let { opt, parnterid, superiorid } = e.data;

                if (parnterid == lobby.mod.User.getInstance().getUserInfo().uid) {
                    tea.mod.__teaHouseInfo.superiorid = superiorid;
                    kaayou.emit('common', 'ui::Toast::Show', {
                        msg: `您的角色发生变化！`
                    });
                }
                self.Hide();
                // let vis = this.node.isVisible();

                // //如果界面时展开的且被操作的id是自己
                // if(vis && ){
                //     kaayou.emit('common', 'ui::Toast::Show', {
                //         msg: `用户(ID:${opt})${superiorid===0?"解除了":"绑定了"}与用户${parnterid}的队长关系`
                //     })
                //     //kaayou.emit("tea",'ui::PropotionConfigDialog::Hide');
                // }

                // //kaayou.emit('teaMem', 'ui::PropotionIncomePanel::reflash')
            }, this, 10);


            this.RoleWatch();

        }

        RoleWatch(){
            let prom =  tea.mod.House.getInstance().promissionInstance()
            let role = tea.mod.__teaHouseInfo.urole;
            let CR = role == HouseMemberRole.OWNER;
            let AD = role == HouseMemberRole.ADMIN
            let VP = role == HouseMemberRole.VICECAPTAIN;
            let CP = role === tea.HouseMemberRole.CAPTAIN;
            let self = this;

            prom.watch("设置队长",(data)=>{

                // if(!self.isVisible || !self.isVisible())
                //     return ;

                let {isSelf,isVicePartner,bCreate} = self
                let isCanUse = data["minor_status"].new === tea.mod.House.PERMISSION_TYPE.ESCALATION && (CR || AD || CP ||VP) && !bCreate &&!isSelf &&!isVicePartner;    
                self.btnPartner.setVisible(isCanUse)
                self.btnPartnerDisable.setVisible(!isCanUse)

            })

            prom.watch("禁止娱乐",(data)=>{

                // if(!self.isVisible || !self.isVisible())
                //     return ;

                let {isSelf,isSelfMember,bAdmin,bNoGame} = self

                if(bNoGame)
                    return;

                if(CR || AD || CP){
                    let isCanUse = data["minor_status"].new === tea.mod.House.PERMISSION_TYPE.ESCALATION && (isSelfMember || !bAdmin && !isSelf );    
                    self.btnNoGame.setVisible(isCanUse)
                    self.btnNoGameDisable.setVisible(!isCanUse)
                }

                // if(VP){
                //     //let isCanUse = data["minor_status"].new === tea.mod.House.PERMISSION_TYPE.ESCALATION && !isSelf && (!this.bPartner)
                //     this.btnNoGame.setVisible(false)
                //     this.btnNoGameDisable.setVisible(true)
                // }

            })


            prom.watch("恢复娱乐",(data)=>{


                // if(!self.isVisible || !self.isVisible())
                //     return ;

                let {isSelf,isSelfMember,bAdmin,bNoGame} = self

                if(!bNoGame)
                    return;

                if(CR || AD || CP){
                    let isCanUse = data["minor_status"].new === tea.mod.House.PERMISSION_TYPE.ESCALATION && (isSelfMember || !bAdmin && !isSelf );    
                    self.btnNoGame.setVisible(isCanUse)
                    self.btnNoGameDisable.setVisible(!isCanUse)
                }

                if(VP){
                    let isCanUse = data["minor_status"].new === tea.mod.House.PERMISSION_TYPE.ESCALATION && !isSelf && (!self.bPartner)
                    self.btnNoGame.setVisible(isCanUse)
                    self.btnNoGameDisable.setVisible(!isCanUse)
                }

            })



            prom.watch("移入黑名单",(data)=>{

                // if(!self.isVisible || !self.isVisible())
                //     return ;

                let {isSelf,isSelfMember,bAdmin} = self

                if(CR || AD){
                    let isCanUse = data["minor_status"].new === tea.mod.House.PERMISSION_TYPE.ESCALATION && (isSelfMember || !bAdmin && !isSelf );
                    self.btnBlackList.setVisible(isCanUse)
                    self.btnBlackListDisable.setVisible(!isCanUse)
                }
            })



        }

        RoleUnWatch(){
            let prom =  tea.mod.House.getInstance().promissionInstance()
            let ef = function(){}
            prom.removeWatch("禁止娱乐",ef)
            prom.removeWatch("移入黑名单",ef)
            prom.removeWatch("设置队长",ef);
        }

        Show(data: Data_HouseMemberItem) {
            this._data = data;
            // this.RoleWatch();
            this.setUILayout();
            this.setUi(data);
            this.authMemberInfo();
            this.setVisible(true);
        }

        //根据视角显示按钮
        setUILayout() {
            let role = tea.mod.__teaHouseInfo.urole;
            let self = this;
            let allButtons = {
                AdminButton: [self.btnAdmin, self.btnAdminDisable],
                roleButton: [self.RoleAdminButton, self.RoleAdminButtonDisable],
                partner: [self.btnPartner, self.btnPartnerDisable],
                vicePartner: [self.btnVicePartner, self.btnVicePartnerDisable],
                noGame: [self.btnNoGame, self.btnNoGameDisable],
                blacklist: [self.btnBlackList, self.btnBlackListDisable]
            }


            lodash.forEach(allButtons, (item) => {
                item.forEach((element: ccui.Button) => {
                    element.setVisible(false)
                });
            })

            let layouts = {
                creator: [ [32, 27], [70, 27],[20, 73], [50, 73], [80, 73]],
                admin: [[32, 27], [70, 27], [32, 73]],//[[32, 73], [70, 73]],
                partner: [[32, 27],  [70, 27],[32, 73], [70, 73]],
                cp: [],
                vice: [[32, 73], [70, 73]],
                player: []
            }
            let layout;
            let ButtonList = [];


            if (role == HouseMemberRole.OWNER) {
                layout = layouts.creator;
                ButtonList = ["AdminButton", "partner", "roleButton", "noGame", "blacklist"]

                if(this._data.urole===tea.HouseMemberRole.MEMBER || this._data.urole===tea.HouseMemberRole.VICECAPTAIN){
                    layout = layouts.partner
                    ButtonList = ["AdminButton", "partner", "noGame", "blacklist"]
                }

            } else if (role == HouseMemberRole.ADMIN) {
                layout = layouts.admin;
                ButtonList = ["noGame", "blacklist","partner"]
            }else if(role === HouseMemberRole.VICECAPTAIN){
                layout = layouts.vice;
                ButtonList = ["noGame"];
            }else if(role === HouseMemberRole.CAPTAIN){
                layout = layouts.partner;
                ButtonList = ["noGame","roleButton","partner", "vicePartner"]
            }

            ButtonList.map(v => allButtons[v])
                .forEach((ele: Array<ccui.Button>, i: number) => {
                    ele.forEach(v => {
                        let pos = layout[i];
                        v.setPositionPercent(cc.p(pos[0] / 100, pos[1] / 100));
                    })
                });

        }

        setUi(data) {
            var self = this;
            self.bCreate = data.urole ==HouseMemberRole.OWNER; 
            self.bAdmin = data.urole == HouseMemberRole.ADMIN;
            self.bCPAdmin = data.vitamin_admin;
            self.bBlackList = false;
            self.bNoGame = data.game_limit;
            self.bPartner = data.upartner == 1;
            self.isSelf = (data.uid === tea.mod.__teaHouseInfo.uid);
            self.isSelfMember = (data.upartner === tea.mod.__teaHouseInfo.uid);
            self.isVicePartner = data.vice_partner;
            if (self.bAdmin) {
                self.btnAdmin.setTitleText("取消管理员");
                self.btnAdminDisable.setTitleText("取消管理员");
            } else {
                self.btnAdmin.setTitleText("设置管理员");
                self.btnAdminDisable.setTitleText("设置管理员");
            }
            
            self.RoleAdminButton.setTitleText("权限配置");
            self.RoleAdminButtonDisable.setTitleText("权限配置");
            
            if (self.bNoGame) {
                self.btnNoGame.setTitleText("恢复娱乐");
                self.btnNoGameDisable.setTitleText("恢复娱乐");
            } else {
                self.btnNoGame.setTitleText("禁止娱乐");
                self.btnNoGameDisable.setTitleText("禁止娱乐");
            }
            if (self.bPartner) {
                self.btnPartner.setTitleText("取消队长");
                self.btnPartnerDisable.setTitleText("取消队长");
            } else {
                self.btnPartner.setTitleText("设置队长");
                self.btnPartnerDisable.setTitleText("设置队长");
            }
            if (self.isVicePartner) {
                self.btnVicePartner.setTitleText("取消副队长")
                self.btnVicePartnerDisable.setTitleText("取消副队长")
            } else {
                self.btnVicePartner.setTitleText("设置副队长")
                self.btnVicePartnerDisable.setTitleText("设置副队长")
            }

            this.label_name.string = kaayou.Identify.nickNameSubSix(data.uname);
            this.label_ID.string = "(ID" + data.uid + ")";
            this.label_join.string = "入圈时间：" + new Date(data.ujointime * 1000).format('yyyy-MM-dd');
            this.label_remark.string = "备注信息：" + data.uremark;
            this.label_remark.setVisible(false);

            if (!!(tea.mod.__teaHouseInfo.teahouserule & HouseRoleTable.VIEW_MEMBER_REMARk)) {
                this.label_remark.setVisible(true);
            }
            NetImage.setPlayerHead(this.head_image, this._data.uurl, this._data.ugender, (url) => {
                if (!self._data) return false;
                if (url !== self._data.uurl) {
                    return false;
                }
                return true;
            });
        }

        Hide() {
            // kaayou.getController('tea').offBytarger('ui::TeaHouse::UpdateTiredValue', this);
            // kaayou.getController('tea').offBytarger('ui::TeaHouse::UpdateTiredRecord', this);
            // kaayou.getController('tea').offBytarger('ui::TeaHouse::UpdateTiredBlock', this);
            // kaayou.getController('tea').offBytarger('ui::TeaHouse::PartnerChange', this);
            // kaayou.emit('tea', 'ui::HouseMemberInfo::Hide');
            // this.RoleUnWatch()
            this.setVisible(false)
        }
    }
}