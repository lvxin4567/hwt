namespace tea {
    export class SubFcmSettingPage {
        _index = -1;
        _page: cc.Node = null;

        doGetData() {
            kaayou.emit("tea", "mod::TeaHouse::GetAntiIndulgence", { hid: tea.mod.__teaHouseInfo.hid });
        }

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
                    this.doGetData();
                }
                this._page.setVisible(true);
            } else {
                this._page.setVisible(false);
            }
        }

        bAdminAdjust: boolean = false;
        bAdminVisible: boolean = false;
        bGive: boolean = false;//可赠送
        bLowLevel:boolean=false;//上级可调下级
        bPartner: boolean = false;
        brewardeq:boolean = false;  //奖励均衡
        bPartnerAdjust: boolean = false;//队长可调
        bPause: boolean = false;
        bSwitch: boolean = false;//防沉迷开关（总）
        btnHintDeduct: ccui.Button = null;
        btnHintMin: ccui.Button = null;
        btnMinSetting: ccui.Button = null;
        btnDeductSetting: ccui.Button = null;
        //btnSave:ccui.Button=null;
        mskHintMin: ccui.Button = null;
        mskHintDeduct: ccui.Button = null;

        PersonRewardButton:ccui.Button = null;
        PersonRewardMsg:ccui.Text = null;

        TeamRewardButton:ccui.Button = null;
        TeamRewardMsg:ccui.Text = null;

        imgOff: string = "SettingPanel.off.png";
        imgOn: string = "SettingPanel.on.png";

        ivAdminAdjust: ccui.ImageView = null;
        ivAdminVisible: ccui.ImageView = null;
        ivGive: ccui.ImageView = null;
        ivLowLevel:ccui.ImageView=null;
        ivPartner: ccui.ImageView = null;
        ivRewardeq:ccui.ImageView = null;
        ivPartnerAdjust: ccui.ImageView = null;
        ivPause: ccui.ImageView = null;
        ivSwitch: ccui.ImageView = null;
        lbMin: ccui.Text = null;
        lbDeduct: ccui.Text = null;
        pnlHintMin: ccui.Layout = null;
        pnlHintDeduct: ccui.Layout = null;
        pnReward:ccui.Layout = null;
        HintReward:ccui.Button = null;
        RewardBubbleMask:ccui.Layout = null;
        searchMgr: FcmSearchWidget = null;

        reset() {
            this.searchMgr.setVisible(false);
            this.showData();
        }

        doAdminAdjustChange() {
            let b = this.bAdminAdjust;
            this.ivAdminAdjust.loadTexture(b ? this.imgOn : this.imgOff, ccui.Widget.PLIST_TEXTURE);
        }

        doAdminVisiableChange() {
            let b = this.bAdminVisible;
            this.ivAdminVisible.loadTexture(b ? this.imgOn : this.imgOff, ccui.Widget.PLIST_TEXTURE);
        }

        doGiveChange() {
            let b = this.bGive;
            this.ivGive.loadTexture(b ? this.imgOn : this.imgOff, ccui.Widget.PLIST_TEXTURE);
        }

        doLowLevelChange(){
            //禁止上级调整下级比赛分true：禁止，关闭状态/false：不禁止，打开状态
            let b = !this.bLowLevel;
            this.ivLowLevel.loadTexture(b ? this.imgOn : this.imgOff, ccui.Widget.PLIST_TEXTURE);
        }

        doPartnerChange() {
            let b = this.bPartner;
            this.ivPartner.loadTexture(b ? this.imgOn : this.imgOff, ccui.Widget.PLIST_TEXTURE);
        }

        doRewardEqChange() {
            let b = this.brewardeq;
            this.ivRewardeq.loadTexture(b ? this.imgOn : this.imgOff, ccui.Widget.PLIST_TEXTURE);
        }

        doPartnerAdjustChange() {
            let b = this.bPartnerAdjust
            this.ivPartnerAdjust.loadTexture(b ? this.imgOn : this.imgOff, ccui.Widget.PLIST_TEXTURE);
        }

        doPauseChange() {
            let b = this.bPause;
            this.ivPause.loadTexture(b ? this.imgOn : this.imgOff, ccui.Widget.PLIST_TEXTURE);
        }

        //防沉迷开关（总）
        doSwitchChange() {
            let b = this.bSwitch;
            this.ivSwitch.loadTexture(b ? this.imgOn : this.imgOff, ccui.Widget.PLIST_TEXTURE);
        }

        initWidthNode(pageMem: cc.Node, searchMgr: FcmSearchWidget) {
            let self = this;
            this._page = pageMem;
            this.searchMgr = searchMgr;
            let ctrName = "teaFcm";
            let subpageChangeEventName = "ui::AntiIndulgencePanel::SubpageChange";
            kaayou.getController(ctrName).on(subpageChangeEventName, this.onSubpageChange, this);

            this.lbDeduct = ccui.helper.seekWidgetByName(<ccui.Widget>pageMem, "DeductMsg");
            this.lbMin = ccui.helper.seekWidgetByName(<ccui.Widget>pageMem, "MinMsg");

            this.ivAdminAdjust = ccui.helper.seekWidgetByName(<ccui.Widget>pageMem, "AdminAdjust");
            this.ivAdminAdjust.on(kaayou.TouchEvent.TouchEnd, this.onAdminAdjustChange, this);

            this.ivAdminVisible = ccui.helper.seekWidgetByName(<ccui.Widget>pageMem, "AdminVisible");
            this.ivAdminVisible.on(kaayou.TouchEvent.TouchEnd, this.onAdminVisiableChange, this);

            this.ivGive = ccui.helper.seekWidgetByName(<ccui.Widget>pageMem, "Give");
            this.ivGive.on(kaayou.TouchEvent.TouchEnd, this.onGiveChange, this);

            this.ivLowLevel = ccui.helper.seekWidgetByName(<ccui.Widget>pageMem, "LowLevel");
            this.ivLowLevel.on(kaayou.TouchEvent.TouchEnd, this.onLowLevelChange, this);

            this.ivPartner = ccui.helper.seekWidgetByName(<ccui.Widget>pageMem, "Partner");
            this.ivPartner.on(kaayou.TouchEvent.TouchEnd, this.onPartnerChange, this);

            this.ivRewardeq = ccui.helper.seekWidgetByName(<ccui.Widget>pageMem, "RewardEq");
            this.ivRewardeq.on(kaayou.TouchEvent.TouchEnd, this.onRewardEqChange, this);

            this.ivPartnerAdjust = ccui.helper.seekWidgetByName(<ccui.Widget>pageMem, "PartnerAdjust");
            this.ivPartnerAdjust.on(kaayou.TouchEvent.TouchEnd, this.onPartnerAdjustChange, this);

            this.ivPause = ccui.helper.seekWidgetByName(<ccui.Widget>pageMem, "Pause");
            this.ivPause.on(kaayou.TouchEvent.TouchEnd, this.onPauseChange, this);

            this.ivSwitch = ccui.helper.seekWidgetByName(<ccui.Widget>pageMem, "Switch");
            this.ivSwitch.on(kaayou.TouchEvent.TouchEnd, this.onSwitchChange, this);

            this.btnMinSetting = ccui.helper.seekWidgetByName(<ccui.Widget>pageMem, "MinButton");
            this.btnMinSetting.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit("tea", "ui::AntiIndulgencePanelControlDialog::Show", { display: true });
            }, this);

            this.btnDeductSetting = ccui.helper.seekWidgetByName(<ccui.Widget>pageMem, "DeductButton");
            this.btnDeductSetting.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit("tea", "ui::AntiIndulgencPointDialog::Show", { display: true });
            }, this);

            this.pnlHintMin = ccui.helper.seekWidgetByName(<ccui.Widget>pageMem, "MinBubble");
            this.mskHintMin = ccui.helper.seekWidgetByName(<ccui.Widget>pageMem, "MinBubbleMask");
            this.btnHintMin = ccui.helper.seekWidgetByName(<ccui.Widget>pageMem, "HintMin");
            this.btnHintMin.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                this.pnlHintMin.setVisible(true);
            }, this);

            this.mskHintMin.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                this.pnlHintMin.setVisible(false);
            }, this);

            this.pnlHintDeduct = ccui.helper.seekWidgetByName(<ccui.Widget>pageMem, "DeductBubble");
            this.mskHintDeduct = ccui.helper.seekWidgetByName(<ccui.Widget>pageMem, "DeductBubbleMask");
            this.btnHintDeduct = ccui.helper.seekWidgetByName(<ccui.Widget>pageMem, "HintDeduct");
            this.btnHintDeduct.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                this.pnlHintDeduct.setVisible(true);
            }, this);

            this.mskHintDeduct.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                this.pnlHintDeduct.setVisible(false);
            }, this);

            this.pnReward = ccui.helper.seekWidgetByName(<ccui.Widget>pageMem, "RewardBubble");
            this.RewardBubbleMask = ccui.helper.seekWidgetByName(<ccui.Widget>pageMem, "RewardBubbleMask");
            this.HintReward = ccui.helper.seekWidgetByName(<ccui.Widget>pageMem, "HintReward");
            this.HintReward.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                this.pnReward.setVisible(true);
            }, this);

            this.RewardBubbleMask.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                this.pnReward.setVisible(false);
            }, this);

            this.PersonRewardButton = ccui.helper.seekWidgetByName(<ccui.Widget>pageMem, "PersonRewardButton");
            this.PersonRewardMsg = ccui.helper.seekWidgetByName(<ccui.Widget>pageMem, "PersonRewardMsg");
            this.PersonRewardMsg.setString("未配置");
            this.PersonRewardButton.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit("tea","ui::matchRewardsingleConfigDialog::Show");
            },this);

            this.TeamRewardButton = ccui.helper.seekWidgetByName(<ccui.Widget>pageMem, "TeamRewardButton");
            this.TeamRewardMsg = ccui.helper.seekWidgetByName(<ccui.Widget>pageMem, "TeamRewardMsg");
            this.TeamRewardMsg.setString("未配置");
            this.TeamRewardButton.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit("tea","ui::matchRewardteamConfigDialog::Show");
            },this);

            kaayou.getController("lobby").on("ws::Msg::houseprizeset_ntf",(e: kaayou.Event)=>{
                let {hid , value , type} = e.data;
                let on = !!value
                switch(type){
                    case 1:
                        let singleEff = on ? "已配置" : "未配置";
                        this.PersonRewardMsg.setString(singleEff);
                    break;
                    case 2:        
                        let teamEff = on ? "已配置" : "未配置";
                        this.TeamRewardMsg.setString(teamEff);
                    break;
                }

            },this)

            kaayou.getController('tea').on('ui::TeaHouse::UpdateTiredBlock', function (e: kaayou.Event) {
                self.showData();
            }, this, 10);
        }

        onAdminAdjustChange(e: kaayou.CheckEvent) {
            kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnSwitch);
            this.bAdminAdjust = !this.bAdminAdjust;
            this.doAdminAdjustChange();
            this.Save();
        }

        onAdminVisiableChange(e: kaayou.CheckEvent) {
            kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnSwitch);
            this.bAdminVisible = !this.bAdminVisible;
            this.doAdminVisiableChange();
            this.Save();
        }

        onGiveChange(e: kaayou.CheckEvent) {
            kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnSwitch);
            this.bGive = !this.bGive;
            this.doGiveChange();
            this.Save();
        }

        onLowLevelChange(e: kaayou.CheckEvent) {
            kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnSwitch);
            this.bLowLevel = !this.bLowLevel;
            this.doLowLevelChange();
            this.Save();
        }

        onPartnerChange(e: kaayou.CheckEvent) {
            kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnSwitch);
            this.bPartner = !this.bPartner;
            this.doPartnerChange();
            this.Save();
        }

        
        onRewardEqChange(e: kaayou.CheckEvent) {
            kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnSwitch);
            this.brewardeq = !this.brewardeq;
            this.doRewardEqChange();
            this.Save();
        }

        onPartnerAdjustChange(e: kaayou.CheckEvent) {
            kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnSwitch);
            this.bPartnerAdjust = !this.bPartnerAdjust;
            this.doPartnerAdjustChange();
            this.Save();
        }

        onPauseChange(e: kaayou.CheckEvent) {
            kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnSwitch);
            let configs = common.mod.Config.GetAppConfig();
            let sFcmAdcode=configs.fcmAdcode;
            let canPause=false;
            if(!!sFcmAdcode){
                let arr=sFcmAdcode.split(',');
                if(arr.indexOf(tea.mod.__teaHouseInfo.area)>=0){
                    canPause=true;
                }
            }else{
                
            }
            if(!canPause){
                let options = {
                    msg: "本地区暂未开放",
                    btns: [
                        {
                            name: "确定",
                            action: function () {
                                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                            },
                            colorType: 'green'
                        },
                    ]
                }
                kaayou.emit('common', 'ui::Dialog::Show', options);
                return;
            }
            this.bPause = !this.bPause;
            this.doPauseChange();
            this.Save();
        }

        //防沉迷开关（总）
        onSwitchChange(e: kaayou.CheckEvent) {
            kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnSwitch);
            this.bSwitch = !this.bSwitch;
            this.doSwitchChange();
            this.Save();
        }

        Save() {
            let self = this;
            kaayou.emit("tea", "mod::TeaHouse::SetAntiIndulgence", {
                hid: tea.mod.__teaHouseInfo.hid,
                adminhide: self.bAdminVisible,
                adminmodi: self.bAdminAdjust,
                disablejuniorv:self.bLowLevel,
                gamepause: self.bPause,
                membersend: self.bGive,
                partnerhide: self.bPartner,
                partnermodi: self.bPartnerAdjust,
                status: self.bSwitch,
                reward_balanced:self.brewardeq,
            });
        }

        showData() {
            let self = this;
            if (!!tea.mod.__teaHouseInfo) {
                this.bAdminAdjust = tea.mod.__teaHouseInfo.isvitaminmodi;
                this.bAdminVisible = tea.mod.__teaHouseInfo.isvitaminhide;
                this.bLowLevel=tea.mod.__teaHouseInfo.disablejuniorv;
                this.bGive = tea.mod.__teaHouseInfo.ismembersend;
                this.bPause = tea.mod.__teaHouseInfo.isgamepause;
                this.bSwitch = tea.mod.__teaHouseInfo.isvitamin;
                this.bPartner = tea.mod.__teaHouseInfo.ispartnerhide;
                this.bPartnerAdjust = tea.mod.__teaHouseInfo.ispartnermodi;
                this.brewardeq = tea.mod.__teaHouseInfo.reward_balanced,    // 奖励均衡

                this.doLowLevelChange();
                this.doPartnerChange();
                this.doRewardEqChange();
                this.doPartnerAdjustChange();
                this.doAdminAdjustChange();
                this.doAdminVisiableChange();
                this.doGiveChange();
                this.doPauseChange();
                this.doSwitchChange();

                let bDeduct = tea.mod.__teaHouseInfo.isdeductconfig ? "已配置" : "未配置";
                let bEffect = tea.mod.__teaHouseInfo.iseffectconfig ? "已配置" : "未配置";
                let singleEff = tea.mod.__teaHouseInfo.game_on ? "已配置" : "未配置";
                let teamEff = tea.mod.__teaHouseInfo.game_on ? "已配置" : "未配置";
                self.lbDeduct.setString(bDeduct);
                self.lbMin.setString(bEffect);
                this.PersonRewardMsg.setString(singleEff);
                this.TeamRewardMsg.setString(teamEff);
            }
        }
    }
}