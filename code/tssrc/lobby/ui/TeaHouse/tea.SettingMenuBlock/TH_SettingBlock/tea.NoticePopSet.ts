/**
 *  隐私设置
 */

namespace tea {
    const { doBindEvent, BindEvent } = kaayou._decorator;





  export class tea_NoticePopMgr {
        static __INS__: tea_NoticePopMgr = null;
        static getInstance(_zOrder:number) {
            if (tea_NoticePopMgr.__INS__ == null) {
                tea_NoticePopMgr.__INS__ = new tea_NoticePopMgr();
                tea_NoticePopMgr.__INS__.init();
                tea_NoticePopMgr.__INS__._zOrder = _zOrder;
            }
            return tea_NoticePopMgr.__INS__;
        }
        __selfPanel: NoticePopPanel = null;
        _zOrder:number = 0;
        init() {
            let self = this;
            this.__selfPanel = null;
            kaayou.getController('tea').on('ui::TeaHouse::UpdateInfo', function (e: kaayou.Event) {
                if (!e.data) {
                    return;
                }
                self.getPanel(false) && self.getPanel(false).onTeaHouseUpdateInfo(e.data);
            }, this, 10);

            kaayou.getController('tea').on('ui::NoticePopPanel::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show();
            }, this, 10);
            kaayou.getController('tea').on('ui::NoticePopPanel::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new NoticePopPanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel,this._zOrder);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }

    }











    export class NoticePopPanel extends kaayou.ModelLayer {
        constructor() {
            super();
            this.initUI();
        }
        btn_submit:ccui.Button = null;
        noticeSwitch:ccui.Layout = null;
        menuGroup:common.RadioGroup = null;
        edit_Notice:ccui.TextField = null;
        ebNotice: any = null;
        btn_close:ccui.Button = null;
        selIndex = 0;
        tip_label:ccui.Text = null;
        // @doBindEvent
        initUI() {
            this.initWithccs(tea.res.TH_NoticePopSet_Json);
            this.isTouchMaskHide = false;
            let self = this;
            this.btn_submit = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_submit");
            this.noticeSwitch = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "noticeSwitch");
            this.edit_Notice = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "input");
            this.btn_close = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_close");
            this.tip_label = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "tip_label");
            this.btn_close.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                self.Hide();
            }, this);
            this.btn_submit.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                //lw200729如果是禁用就不做检测
                if ((tea.mod.__teaHouseInfo.hnotify == self.ebNotice.getString()) && self.selIndex == 0) {
                    kaayou.emit("common", "ui::Toast::Show", { msg: "内容无变化。" });
                    return;
                }
                
                let noticeStr = kaayou.blackList.checkBlackList(this.ebNotice.getString());
                //lw200214不允许换行
                noticeStr = noticeStr.replace(/[\r\n]+/g, "");
                if ((noticeStr.length<2 || noticeStr.length>30) && !tea.mod.__teaHouseInfo.dialogactive ) {
                    kaayou.emit("common", "ui::Toast::Show", { msg: "字数限制为2-30个字！" });
                    return;
                }


                if (self.selIndex == 0) {   //滚动公告
                    let modifyInfo: any = { hid: tea.mod.__teaHouseInfo.hid, hname:tea.mod.__teaHouseInfo.hname , hnotify: noticeStr };
                    kaayou.emit("tea", 'mod::TeaHouse::ModifyBaseNN', modifyInfo);
                } else {                      //滑动公告
                    kaayou.emit("tea", 'mod::TeaHouse::ModifyPopNotice', {
                        hid: tea.mod.__teaHouseInfo.hid,
                        content: noticeStr, active: !tea.mod.__teaHouseInfo.dialogactive
                    })
                }
            }, this);
            self.menuGroup = new common.RadioGroup();
            lodash.forEach(this.noticeSwitch.getChildren(), function (v: ccui.CheckBox, i) {
                let t = <ccui.Text>v.getChildByName('label');
                v['index'] = i;
                v.on(kaayou.RadioEvent.SELECTED, self.onMenuSelected, self);
                v.on(kaayou.RadioEvent.UNSELECTED, self.onMenuUnSelected, self);
                self.menuGroup.add(v);
            })
            this.Hide();
            // this.edit_Notice.addEventListener(function (ref: ccui.TextField, type) {

            //     if (ccui.TextField.EVENT_ATTACH_WITH_IME == type) {
            //         console.log("EVENT_ATTACH_WITH_IME");
            //         self.tip_label.setVisible(false);
            //     } else if (ccui.TextField.EVENT_DETACH_WITH_IME == type) {
            //         console.log("EVENT_DETACH_WITH_IME");
            //         self.tip_label.setVisible(this.edit_Notice.getString().length == 0);
            //     } else if (ccui.TextField.EVENT_INSERT_TEXT == type || ccui.TextField.EVENT_DELETE_BACKWARD == type) {
            //         console.log("EVENT_INSERT_TEXT");
            //         let gstr = ref.getString();
            //         console.log(gstr);
            //     }
            // }, this);


            //公告的editbox
            let sp1 = new cc["Scale9Sprite"]();
            let eb1: cc.Node = cc["EditBox"].create(this.edit_Notice.getContentSize(), sp1);
            this.ebNotice = eb1;
            eb1.setAnchorPoint(0, 0);
            eb1.setPosition(0, 0);
            eb1.setOpacity(0);
            eb1['setFontSize'](28);
            eb1['setFontColor'](cc.color("#CBA56F"));
            // eb1['setInputMode'](6);
            eb1['setMaxLength'](30);

            eb1['setDelegate'](
                {
                    /**
                     * This method is called when an edit box gains focus after keyboard is shown.
                     * @param {cc.EditBox} sender
                     */
                    editBoxEditingDidBegin: function (sender) {
                        //console.log('editBoxEditingDidBegin');
                        self.tip_label.setVisible(false);
                    },

                    /**
                     * This method is called when an edit box loses focus after keyboard is hidden.
                     * @param {cc.EditBox} sender
                     */
                    editBoxEditingDidEnd: function (ref) {
                        let gstr = ref.getString();
                        // self.checkCanchange();
                        self.tip_label.setVisible(self.ebNotice.getString().length == 0);
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
            this.edit_Notice.addChild(eb1);
    



        }


        onTeaHouseUpdateInfo(data: tea.Data_HouseInfo) {
            if (this.selIndex == 0) {
                this.ebNotice.setString(data.hnotify.length>30?data.hnotify.substr(0,30):data.hnotify);
            } else {
                this.ebNotice.setString(data.dialog.length>30?data.dialog.substr(0,30):data.dialog);
                if (data.dialogactive) {
                    (<ccui.TextBMFont>(this.btn_submit.getChildByName("BitmapFontLabel_2"))).setString("禁用");
                } else {
                    (<ccui.TextBMFont>(this.btn_submit.getChildByName("BitmapFontLabel_2"))).setString("发送");
                }
            }
        }

        checkChange() {
            let self = this;
            if (tea.mod.__teaHouseInfo.hnotify == self.ebNotice.getString()) {
                return false;
            } else return true;
        }

        onMenuSelected(e: kaayou.RadioEvent) {
            kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
            let index = e.target['index'];
            let v = <ccui.CheckBox>e.target;
            this.selIndex = index;
            let data = tea.mod.__teaHouseInfo;
            if (index) { //弹窗公告
                this.ebNotice.setString(data.dialog.length>30?data.dialog.substr(0,30):data.dialog);
                if (tea.mod.__teaHouseInfo.dialogactive) {
                    (<ccui.TextBMFont>(this.btn_submit.getChildByName("BitmapFontLabel_2"))).setString("禁用");
                } else {
                    (<ccui.TextBMFont>(this.btn_submit.getChildByName("BitmapFontLabel_2"))).setString("发送");
                }
                this.tip_label.setVisible(tea.mod.__teaHouseInfo.dialog.length == 0);
            }else{
                this.ebNotice.setString(data.hnotify.length>30?data.hnotify.substr(0,30):data.hnotify);
                (<ccui.TextBMFont>(this.btn_submit.getChildByName("BitmapFontLabel_2"))).setString("发送");
                this.tip_label.setVisible(tea.mod.__teaHouseInfo.hnotify.length == 0);
                
            }
        }

        onMenuUnSelected(e: kaayou.RadioEvent) {
            let v = <ccui.CheckBox>e.target;
        }

        Show() {
            var self = this;
            this.setVisible(true);
            (<ccui.CheckBox>self.noticeSwitch.getChildren()[0]).setRadioSelected();
            kaayou.pop.showAni({
                cNode: this.node.getChildByName("contentPanel"),
                mNode: this.node.getChildByName("maskbg"),
                action:function(){
                    
                }
            });
        }

        Hide() {
            kaayou.pop.hideAni(
                {
                    cNode: this.node.getChildByName("contentPanel"),
                    mNode: this.node.getChildByName("maskbg"),
                    rnode: this
                }
            )
        }

    }



}