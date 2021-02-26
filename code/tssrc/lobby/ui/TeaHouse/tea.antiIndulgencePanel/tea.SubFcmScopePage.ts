namespace tea {
    class ScopeMemberRow extends kaayou.Block implements common.IPullListCell {
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
        ebName: any = null;
        img_headBg: ccui.ImageView = null;//头像背景
        img_head: ccui.ImageView = null;
        img_onwer: ccui.ImageView = null;
        ivPause: ccui.Layout = null;
        label_line_state: ccui.Text = null;
        ndName: cc.Layer = null;

        img_mgr: ccui.ImageView = null;
        ivPartner: ccui.ImageView = null;
        btn_remark: ccui.ImageView = null;

        label_name: ccui.Text = null;
        label_id: ccui.Text = null;
        label_time: ccui.Text = null;
        lbTired: ccui.Text = null;

        btn_remove: ccui.Button = null;
        btn_dismiss: ccui.Button = null;
        btn_exit: ccui.Button = null;

        auth() {
            let self = this;
            let configData = common.mod.Config.GetAppConfig();
            let fcm = configData.feature.pl;
            if (!!tea.mod.__teaHouseInfo) {
                let bSwitch = tea.mod.__teaHouseInfo.isvitamin;
                let bAdminCanSee = tea.mod.__teaHouseInfo.isvitaminhide;
                let role = tea.mod.__teaHouseInfo.urole;
                self.lbTired.setVisible(false);
                if (fcm && bSwitch) {
                    if (role == HouseMemberRole.OWNER) {
                        self.lbTired.setVisible(true);
                    } else if (role == HouseMemberRole.ADMIN && bAdminCanSee) {
                        self.lbTired.setVisible(true);
                    }
                }
            }
        }

        initWithNode(node: ccui.Widget) {
            let self = this;
            super.initWithNode(node);
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
            eb['setFontColor'](cc.color("#CFB7A6"));
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
                        //console.log('editBoxEditingDidEnd',sender.getString());
                        let gstr = ref.getString();
                        if (!!gstr) {
                            let remarkInfo: ModifyHouseMemberRemark = { hid: tea.mod.__teaHouseInfo.hid, uid: self._data.uid, uremark: gstr };
                            kaayou.emit("tea", 'mod::TeaHouse::Member::ModifyMemberRemark', remarkInfo);
                        }
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
            this.img_onwer = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "img_onwer");
            this.img_mgr = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "img_mgr");
            this.ivPartner = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "img_partner");
            this.btn_remark = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_remark");

            this.label_name = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_name");
            this.label_id = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_id");
            this.label_time = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_time");
            this.lbTired = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "TiredLabel");

            this.btn_remove = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_remove");

            this.btn_dismiss = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_dismiss");
            this.btn_exit = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_exit");

            this.img_headBg.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit("tea", "ui::HouseMemberInfo::Show", this._data);
            }, this);

            this.btn_remove.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                if (lodash.isEmpty(self._data)) { return; }
                kaayou.emit("tea", 'ui::MemberRemovePanel::Show', self._data)
            }, this);


            this.btn_exit.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                if (lodash.isEmpty(self._data)) { return; }
                let msg = "是否【退出】当前亲友圈?";
                var suceessCall = function () {
                    kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                    kaayou.emit("tea", "mod::TeaHouse::Exit");
                }
                let options = {
                    title: "",
                    msg: msg,
                    close: {
                        isShow: false,
                        action: null,
                    },
                    btns: [
                        {
                            name: "确定",
                            action: suceessCall,
                            colorType: 'green'
                        },
                        {
                            name: "取消",
                            action: function () {
                                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                            }.bind(self),
                            colorType: 'blue'
                        }
                    ]
                }
                kaayou.emit("common", "ui::Dialog::Show", options);
            }, this);

            this.btn_dismiss.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                if (lodash.isEmpty(self._data)) { return; }
                let msg = "是否【解散】当前亲友圈?";
                var suceessCall = function () {
                    kaayou.emit("tea", "mod::TeaHouse::Dismiss");
                }
                let options = {
                    title: "",
                    msg: msg,
                    close: {
                        isShow: false,
                        action: null,
                    },
                    btns: [
                        {
                            name: "确定",
                            action: suceessCall,
                            colorType: 'green'
                        },
                        {
                            name: "取消",
                            action: function () {
                                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                            }.bind(self),
                            colorType: 'blue'
                        }
                    ]
                }
                kaayou.emit("common", "ui::Dialog::Show", options);
            }, this);

            kaayou.getController('tea').on('ui::TeaHouse::UpdateTiredBlock', function (e: kaayou.Event) {
                //self.auth();
            }, this, 10);

            kaayou.getController('tea').on('ui::TeaHouse::UpdateTiredValue', function (e: kaayou.Event) {
                if (self._data && self._data.uid == e.data.uid && e.data.hid == tea.mod.__teaHouseInfo.hid) {
                    self.lbTired.setString(e.data.value);
                }
            }, this, 10);
        }

        setInfo(data: Data_HouseMemberItem) {
            var self = this;
            if (lodash.isEqual(this._data, data)) {
                //console.log("数据相同");
                return;
            }
            this._data = lodash.cloneDeep(data);
            if (lodash.isEmpty(data)) {
                this.label_line_state.setString("");
                this.img_onwer.setVisible(false);
                this.img_mgr.setVisible(false);
                this.ivPartner.setVisible(false);
                this.btn_remark.setVisible(false);
                this.label_name.setString("");
                this.label_id.setString("");
                this.label_time.setString("");
                this.btn_remove.setVisible(false);
                this.btn_dismiss.setVisible(false);
                this.btn_exit.setVisible(false);
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

            this.img_onwer.setVisible(data.urole == HouseMemberRole.OWNER);
            this.img_mgr.setVisible(data.urole == HouseMemberRole.ADMIN);
            this.ivPartner.setVisible(data.upartner == 1);
            this.btn_remark.setVisible(!!(this._data.ruleMask & HouseRoleTable.VIEW_MEMBER_REMARk));
            this.label_name.setString(kaayou.Identify.nickNameSubSix(this._data.uname));
            this.label_id.setString("ID:" + this._data.uid);

            if (this._data.ulasttime !== undefined) {
                this.label_time.setString("离线:" + new Date(this._data.ulasttime * 1000).format('yyyy-MM-dd'));
            } else {
                this.label_time.setString("加入:" + new Date(this._data.ujointime * 1000).format('yyyy-MM-dd'));
            }

            this.ebName.setString(this._data.uremark);
            if (this._data.uremark.length == 0) {
                //this.label_remark.setString("点击填写备注");
            }
            this.lbTired.setString(this._data.uvitamin.toString());
            this.ivPause.setVisible(!!(this._data.game_limit));
            //如果被禁止娱乐就不显示头像，但头像仍然可以被点击
            if (this._data.game_limit) {
                this.img_head.setVisible(false);
            } else {
                NetImage.setPlayerHead(this.img_head, this._data.uurl, this._data.ugender, (url) => {
                    if (url !== this._data.uurl) {
                        return false;
                    }
                    return true;
                });
                this.img_head.setVisible(true);
            }


            this.btn_remove.setVisible(!!(this._data.ruleMask & HouseRoleTable.EDIT_MEMBER_REMOVE));
            //lw190716不让在成员列表里解散
            //this.btn_dismiss.setVisible(!!(this._data.ruleMask & HouseRoleTable.EDIT_HOUSE_DELETE));
            self.auth();
        }

    }
    
    export class SubFcmScopePage {
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

        reset() {
            // this.searchMgr.clearString();
            // this.scroll_member.getAdpter().datas = [];
            // this.scroll_member.refresh();
            // this.doGetMemList(true);
        }

        bAdminAdjust: boolean = false;
        bAdminVisible: boolean = false;
        bSwitch: boolean = false;
        btnBigWinAdd: ccui.Button = null;
        btnBigWinSub: ccui.Button = null;
        btnMinAdd: ccui.Button = null;
        btnMinSub: ccui.Button = null;
        btnPerAdd: ccui.Button = null;
        btnPerSub: ccui.Button = null;
        btnSave: ccui.Button = null;
        ebBigWin: ccui.TextField = null;
        ebMin: ccui.TextField = null;
        ebPer: ccui.TextField = null;
        iBigWin: number = 0;
        imgOff: string = "SettingPanel.off.png";
        imgOn: string = "SettingPanel.on.png";
        iPer: number = 0;
        ivAdminAdjust: ccui.ImageView = null;
        ivAdminVisible: ccui.ImageView = null;
        ivSwitch: ccui.ImageView = null;
        lbBigWin: ccui.Text = null;
        lbPer: ccui.Text = null;

        doAdminAdjustChange() {
            let b = this.bAdminAdjust
            this.ivAdminAdjust.loadTexture(b ? this.imgOn : this.imgOff, ccui.Widget.PLIST_TEXTURE);
        }

        doAdminVisiableChange() {
            let b = this.bAdminVisible
            this.ivAdminVisible.loadTexture(b ? this.imgOn : this.imgOff, ccui.Widget.PLIST_TEXTURE);
        }

        doSwitchChange() {
            let b = this.bSwitch
            this.ivSwitch.loadTexture(b ? this.imgOn : this.imgOff, ccui.Widget.PLIST_TEXTURE);
        }

        initWidthNode(pageMem: cc.Node, cellMod: ccui.Widget) {
            let self = this;
            this._page = pageMem;
            let ctrName = "teaFcm";
            let subpageChangeEventName = "ui::AntiIndulgencePanel::SubpageChange";
            kaayou.getController(ctrName).on(subpageChangeEventName, this.onSubpageChange, this);
        }

        onAdminVisibleChange(e: kaayou.CheckEvent) {
            this.bAdminVisible = !this.bAdminVisible;
            this.doAdminVisiableChange();
            kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnSwitch);
        }

        onSwitchChange(e: kaayou.CheckEvent) {
            this.bSwitch = !this.bSwitch;
            this.doSwitchChange();
            kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnSwitch);
        }

        Show() {
            this.bAdminVisible = tea.mod.__teaHouseInfo.isvitaminhide;
            this.bSwitch = tea.mod.__teaHouseInfo.isvitamin;
            this.doAdminVisiableChange();
            this.doSwitchChange();
            this.lbBigWin.setString(this.iBigWin.toString());
            this.lbPer.setString(this.iPer.toString());
        }
    }
}