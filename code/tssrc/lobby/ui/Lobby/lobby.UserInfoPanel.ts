//用户信息面板
namespace lobby {
    const { BindEvent, doBindEvent } = kaayou._decorator;

    export class UserInfoPanelMgr {
        static __INS__: UserInfoPanelMgr = null;
        static getInstance(_zOrder: number = 0) {
            if (UserInfoPanelMgr.__INS__ == null) {
                UserInfoPanelMgr.__INS__ = new UserInfoPanelMgr();
                UserInfoPanelMgr.__INS__.init();
                UserInfoPanelMgr.__INS__._zOrder = _zOrder;
            }
            return UserInfoPanelMgr.__INS__;
        }
        __selfPanel: UserInfoPanel = null;
        _data: Data_Uerinfo = null;
        public _zOrder = 0;
        init() {
            let self = this;
            this.__selfPanel = null;

            kaayou.getController('lobby').on('ui::UpdateUserInfo', function (e: kaayou.Event) {
                let data = e.data;
                if (!data) { return; }
                this._data = data;
                self.getPanel(false) && self.getPanel(false).onUpdateUserInfo(this._data);
            }, this, 10);

            kaayou.getController('common').on('Config::Update', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).onConfigUpdate();
            }, this, 10);

            kaayou.getController('lobby').on('ui::UserInfoPanel::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show();
            }, this, 10);
            kaayou.getController('lobby').on('ui::UserInfoPanel::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new UserInfoPanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel,this._zOrder);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }

    }

    export class UserInfoPanel extends kaayou.Layer {
        maskBg: cc.Layer = null;
        contentPanel: ccui.Layout = null;


        //name
        lable_name: ccui.Text = null;
        lable_id: ccui.Text = null;

        //手机
        lable_tel_r: ccui.ImageView = null;
        lable_tel: ccui.Text = null;
        btn_tel: ccui.Button = null;
        btn_Unbinde_tel:ccui.Button = null;
        //微信
        lable_wx_r: ccui.ImageView = null;
        lable_wx: ccui.Text = null;


        //实名认证
        lable_certification_r: ccui.ImageView = null;
        lable_certification: ccui.Text = null;
        btn_certification: ccui.Button = null;

        layout_head: ccui.Layout = null;
        img_head: cc.Sprite = null;

        btn_logout: ccui.Button = null;

        //用户类型
        label_LoginType: ccui.Text = null;
        ////////////

        layout_user_type: ccui.Layout = null;
        btnPartner:ccui.Button = null
        topbarMgr: lobby.TopBarMgr = null;
        userUpLoadImage:ccui.ImageView = null
        uploadImage_Btn:ccui.Button = null;
        // btn_edt_describe
        _data: Data_Uerinfo = null;

        inviteSwitch_layout:ccui.Layout = null;
        inviteSwitch_radioGroup:common.RadioGroup = null;

        sexChange_layout:ccui.Layout = null;
        sexChange_radioGroup:common.RadioGroup = null;

        constructor() {
            super();
            this.initUI();
        }
        //@doBindEvent
        initUI() {
            this.initWithccs(lobby.res.UserInfoPanel_json, true);
            let self = this;
            this.maskBg = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "maskbg");
            this.contentPanel = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "contentPanel");
            //jjjjjjk

            {
                this.topbarMgr = new TopBarMgr(ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "top_bar"));
                this.topbarMgr.setOnCloseClick(function () {
                    kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                    self.Hide();
                }.bind(this));
                this.topbarMgr.setBeanVisibel(false);
                this.topbarMgr.setCardVisibel(false);
                this.topbarMgr.setGoldVisibel(false);
                // this.topbarMgr.doRightLayout();
                this.topbarMgr.setTitle("个人中心");

            }

            this.layout_user_type = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "layout_user_type");
            this.btnPartner = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Login");
            self.btnPartner.on(kaayou.TouchEvent.TouchEnd,this.onPartnerButtonClick,this);

            this.layout_head = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "layout_head");
            this.img_head = new cc.Sprite();
            this.img_head.setVisible(false);
            this.layout_head.addChild(this.img_head);
            //上传个人名片相关
            this.userUpLoadImage = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "userUpLoadImage");
            this.uploadImage_Btn = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "userUpLoadImage_0");
            this.uploadImage_Btn.on(kaayou.TouchEvent.TouchEnd, this.uploadMyQr, this);
            this.userUpLoadImage.on(kaayou.TouchEvent.TouchEnd, this.uploadMyQr, this);
            /*
            
                        {
                            //更新微信
                            this.btn_auth = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_auth");
                            this.btn_auth.on(kaayou.TouchEvent.TouchEnd, function () {
                                kaayou.emit('lobby', "mod::User::doUpgradeWechat");
                            }, this);
                        }
            */

            {

                //用户id
                this.lable_id = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "lable_id");
                this.lable_id.ignoreContentAdaptWithSize(true);
                this.lable_id.setString('');

                //name 
                this.lable_name = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "lable_name");
                this.lable_name.ignoreContentAdaptWithSize(true);
                this.lable_name.setString('');

            }
            {

                this.label_LoginType = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_LoginType");

            }

            {
                //实名认证line
                this.lable_certification_r = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "lable_certification_r");
                this.lable_certification = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "lable_certification");
                this.lable_certification.ignoreContentAdaptWithSize(true);
                this.lable_certification.setString('');

                this.btn_certification = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_certification");
                this.btn_certification.on(kaayou.TouchEvent.TouchEnd, function () {
                    kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                    kaayou.emit('lobby', 'ui::RealNamePanel::Show');
                }, this);
            }

            {
                //手机line
                this.lable_tel_r = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "lable_tel_r");
                this.lable_tel = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "lable_tel");
                this.lable_tel.ignoreContentAdaptWithSize(true);
                this.lable_tel.setString('');
                this.btn_Unbinde_tel = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_tel_change");
                this.btn_tel = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_tel");
                this.btn_tel.setVisible(false);
                this.btn_tel.on(kaayou.TouchEvent.TouchEnd, function () {
                    kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                    kaayou.emit('lobby', "ui::BindPhonePanel::Show", {bind:true});
                }, this);
                this.btn_Unbinde_tel.on(kaayou.TouchEvent.TouchEnd, function () {
                    kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                    kaayou.emit('lobby', "ui::BindPhonePanel::Show", {bind:false});
                }, this);
            }


            {
                //微信line
                this.lable_wx_r = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "lable_wx_r");
                this.lable_wx = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "lable_wx");
                this.lable_wx.ignoreContentAdaptWithSize(true);
            }

            this.btn_logout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_logout");
            this.btn_logout.on(kaayou.TouchEvent.TouchEnd, function () {
                //切换账户
                let options = {
                    msg: "是否切换账号？",
                    btns: [
                        {
                            colorType: 'green',
                            name: "确定",
                            action: function () {
                                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                                kaayou.emit("lobby", "mod::User::LogOut");
                            },

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
                kaayou.emit('common', 'ui::Dialog::Show', options);
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
            }, this);

            {
                this.inviteSwitch_layout  = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "inviteSwitch_layout");
                this.inviteSwitch_radioGroup = new common.RadioGroup();
                lodash.forEach(this.inviteSwitch_layout.getChildren(),(v:ccui.CheckBox,i:number)=>{
                    v["index"] = i;
                    self.inviteSwitch_radioGroup.add(v);
                    v.on(kaayou.RadioEvent.SELECTED, self.onInviteSwitch, self);
                })
            }

            {
                this.sexChange_layout  = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "sexChange_layout");
                this.sexChange_radioGroup = new common.RadioGroup();
                lodash.forEach(this.sexChange_layout.getChildren(),(v:ccui.CheckBox,i:number)=>{
                    v["index"] = i;
                    self.sexChange_radioGroup.add(v);
                    v.on(kaayou.RadioEvent.SELECTED, self.onSexChangeSwitch, self);
                })
            }


            this.reset();
            self.Hide();
        }

        onInviteSwitch(e:kaayou.RadioEvent){
            let index = e.target["index"];
            console.log("-------"+index);
            //发送消息
            let refuse_invite = !!index?true:false
            kaayou.emit("lobby","mod::User::setuserrefuseinvite",{refuse_invite:refuse_invite});
        }

        onSexChangeSwitch(e:kaayou.RadioEvent){
            let index = e.target["index"];
            console.log("-------"+index);//
            let  sex = index?2:1
            //发送消息
            // let refuse_invite = !!index?true:false
            kaayou.emit("lobby", "mod::User::changeSex",{sex:sex});
        }

        _isCanShow = true;
        _isCanCertification = true;

        onConfigUpdate() {
            let configs = common.mod.Config.AppConfig;
            let feature: IFeature = lodash.extend({}, configs.feature);
            this._isCanShow = !!(feature.us);

            let appmodel = configs.appmodel || 0;
            this._isCanCertification = !!(feature.re);
            this.btn_certification.setVisible(this._isCanCertification);

        }   

        uploadMyQr(){
            let self = this;
            //lw190713切出去的不要加click音效
            let requestUrl = "";
            let imageUrl = common.mod.Config.GetAppConfig().xlHost
            if (!!imageUrl && imageUrl.length>0) {
                requestUrl = imageUrl;
            }else{
                requestUrl = "https://apitpg.kaayou.com/file?id=";
            }
            let uploadImageUrl = requestUrl+kaayou.AES.encryptPHP(self._data.uid.toString())
            kaayou.PlatformMgr.getInstance().sys.OpenUrl(uploadImageUrl);
        }

        Show() {
            if (!this._isCanShow) { return; }
            this.reset();
            kaayou.emit("lobby", "mod::User::GetUpdateUserInfo");
            this.setVisible(true);
            kaayou.pop.ShowMainAnim({
                tNode:ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "top_bar"),
                bNode:this.node.getChildByName("contentPanel"),
                mNode:this.node.getChildByName('maskbg'),
            });
        }

        onEditDscription(des: string) {
            kaayou.emit("lobby", "mod::User::doEditdescribeinfo", {
                describe: des, call: function () {
                    kaayou.emit("lobby", "mod::User::GetUpdateUserInfo");
                }
            })

        }

        reset() {

            if (cc.sys.isWeChat) {
                this.layout_user_type.setVisible(false)
                this.lable_tel_r.setVisible(false)
                this.lable_certification_r.setVisible(false)
                this.lable_wx_r.setVisible(false)
            } else {

                // this.lable_name_edt.setVisible(false)
            }


        }

        onPartnerButtonClick(){
            kaayou.PlatformMgr.getInstance().sys.OpenUrl(common.mod.Config.GetAppConfig().partnerUrl);
        }
    

        // @BindEvent("lobby", "ui::UpdateUserInfo")
        onUpdateUserInfo(data: Data_Uerinfo) {
            //jjjjjjk

            if (!data) { return; }
            this._data = data;
            this.lable_name.setString(kaayou.Identify.nickNameSubEight(data.name.toString()));

            this.lable_id.setString("ID:" + data.uid.toString());

            //实名认证
            this.btn_certification.setVisible(!data.isCertification && this._isCanCertification);
            this.lable_certification.setString(lodash.isEmpty(data.realname) ? "未认证" : data.realname);
            if(data.realname){
                this.lable_certification.setTextColor(cc.color(40,139,14));
            }else{
                this.lable_certification.setTextColor(cc.color(210,199,184));
            }

            this.lable_tel.setString(lodash.isEmpty(data.tel) ? "未认证" : kaayou.Identify.hidePhone(data.tel));
            if(data.tel){
                this.lable_tel.setTextColor(cc.color(40,139,14));
            }else{
                this.lable_tel.setTextColor(cc.color(210,199,184));
            }
            this.btn_tel.setVisible(lodash.isEmpty(data.tel));
            this.btn_Unbinde_tel.setVisible(!lodash.isEmpty(data.tel));
            //头像
            NetImage.doLoadHeadImageWithLayout(data.sex, data.imgurl || "", this.img_head, this.layout_head.getContentSize(), function () { });

            if (data.delivery_img && data.delivery_img.length != 0) {
                console.log("更新二维码");
                this.userUpLoadImage.setVisible(true);
                NetImage.setPlayerHead(this.userUpLoadImage,data.delivery_img);
            }else{
                this.userUpLoadImage.setVisible(false);
            }

            //用户类型
            switch (data.user_type) {
                case 1:
                    this.label_LoginType.setString("当前游客登录");
                    this.lable_wx.setString("未绑定");
                    break;
                case 2:
                    this.label_LoginType.setString("当前手机登录");
                    this.lable_wx.setString(data.name || "");
                    break;
                case 3:
                    this.label_LoginType.setString("当前微信登录");
                    this.lable_wx.setString(data.name || "");
                    break;
                case 4:
                    this.label_LoginType.setString("当前手机登录");
                    this.lable_wx.setString(data.name || "");
                    break;
            }
            let index = data.refuse_invite?1:0;
            (<ccui.CheckBox>this.inviteSwitch_layout.getChildren()[index]).setSelected(true);

            let sex = data.sex == 1?0:1;
            (<ccui.CheckBox>this.sexChange_layout.getChildren()[sex]).setSelected(true);
            (<ccui.CheckBox>this.sexChange_layout.getChildren()[sex?0:1]).setSelected(false);
        }


        // @BindEvent('lobby', 'ui::UserInfoPanel::Hide')
        Hide() {
            this.setVisible(false);
        }




    }
}