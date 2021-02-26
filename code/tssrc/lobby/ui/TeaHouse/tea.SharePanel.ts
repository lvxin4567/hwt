/**
 * 亲友圈分享面板
 */
namespace tea {
    import ModelLayer = kaayou.ModelLayer;
    const { BindEvent, doBindEvent } = kaayou._decorator;

    export class tea_TeaSharePanelMgr {
        static __INS__: tea_TeaSharePanelMgr = null;
        static getInstance() {
            if (tea_TeaSharePanelMgr.__INS__ == null) {
                tea_TeaSharePanelMgr.__INS__ = new tea_TeaSharePanelMgr();
                tea_TeaSharePanelMgr.__INS__.init();
            }
            return tea_TeaSharePanelMgr.__INS__;
        }
        __selfPanel: SharePanel = null;
        init() {
            let self = this;
            this.__selfPanel = null;
            kaayou.getController('tea').on('ui::SharePanel::Show', function (e: kaayou.Event) {
                if (kaayou.UIManager.getInstance().getCurRuningSceneName() != "TEAHOUSE") return;
                self.getPanel(true).onShow(e.data);
            }, this, 10);
            kaayou.getController('tea').on('ui::ShareModelPanel::Hide', function (e: kaayou.Event) {
                self.getPanel(false).Hide();
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new SharePanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel, 1300);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }
    }

    export class SharePanel extends kaayou.ModelLayer {
        maskBg: cc.Layer = null;
        contentPanel: ccui.Layout = null;
        btn_close: ccui.Button = null;
        layout_sharemenu: ccui.Layout = null;//布局layout

        btn_wx_haoyou: ccui.Button = null;
        btn_xx: ccui.Button = null;
        btn_dd: ccui.Button = null;
        btn_wx_pyq: ccui.Button = null;
        btn_xl: ccui.Button = null;
        share_type: common.mod.SHARE_TYPE = null;

        shareText = "";
        shareTitle = "";
        share_Data: { type: common.mod.SHARE_TYPE, title?: string, text?: string, url?: string } = null;
        constructor() {
            super();
            this.initUI();
        }

        getPHPJoinTeahouseURL(){
            let phpShareURL="http://dq.kayougame.com/Invitation/share?code=";
            let data={
                hid:tea.mod.__teaHouseInfo.hid, 
                hname:tea.mod.__teaHouseInfo.hname,
                uid:lobby.mod.User.getInstance().getUserInfo().uid,
                uname:lobby.mod.User.getInstance().getUserInfo().name,
                headimg:lobby.mod.User.getInstance().getUserInfo().imgurl,
                mwurl: "https://apb8ry.mlinks.cc/AeDp?index=hid_" + tea.mod.__teaHouseInfo.hid+";inviteuid_"+lobby.mod.User.getInstance().getUserInfo().uid};
            return phpShareURL+kaayou.AES.encryptPHP(JSON.stringify(data));
        }

        // @doBindEvent
        initUI() {
            this.initWithccs(tea.res.SharePanel_json);
            let self = this;
            this.maskBg = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "maskbg");
            this.contentPanel = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "contentPanel");
            this.btn_close = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_close");

            this.btn_wx_haoyou = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_wx_haoyou");
            this.btn_wx_pyq = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_wx_pyq");
            this.btn_xx = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_xx");
            this.btn_dd = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_dd");
            this.btn_xl = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_xl");
            this.btn_close.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.Hide();
            }, this)

            this.layout_sharemenu = ccui.helper.seekWidgetByName(<ccui.Widget>this.contentPanel, "Panel_1");
            this.layout_sharemenu.setPadding({ spacingY: 15 });
            this.layout_sharemenu.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Horizontal);
            this.layout_sharemenu.setHorizontal(ccui.Layout.LayoutHorizontal.LEFT);
            this.layout_sharemenu.doChildrenLayout();

            //分享微信
            this.btn_wx_haoyou.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.PlatformMgr.getInstance().wx.ShareURL(this.shareTitle, this.shareText,this.getPHPJoinTeahouseURL());
            }, this)

            //分享朋友圈
            this.btn_wx_pyq.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                if (this.share_type == common.mod.SHARE_TYPE.TEAHOUSE_LOBBY) {
                    console.log("spFriend")
                    kaayou.emit('mod::Audio::Sound', "Btn::Default");
                    let shares = common.mod.Config.GetAppConfig().shares;
                    // if (!!shares) {
                    kaayou.PlatformMgr.getInstance().wx.ShareTimeLineURL(shares.tea.title, shares.tea.text, shares.tea.url);
                    // } else {
                    console.log("亲友圈分享链接未配置");
                    // }
                }
            }, this);

            //分享钉钉
            this.btn_dd.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                let transaction = '分享:' + Date.now();
                kaayou.PlatformMgr.getInstance().dd.DDShareText("1", this.shareText);
            }, this);

            this.Hide();
        }


        // @BindEvent('tea', 'ui::SharePanel::Show')
        onShow(data: { type: common.mod.SHARE_TYPE, title?: string, text?: string, url?: string }) {
            this.share_type = data.type;
            this.share_Data = data;
            //根据配置显示   
            {
                //茶楼大厅
                let configData = common.mod.Config.GetAppConfig();
                let c_type = JSON.parse(configData.shareType).lobby;
                this.btn_wx_haoyou.setVisible(!!(c_type & 1))
                this.btn_dd.setVisible(!!(c_type & 2))
                this.btn_xx.setVisible(!!(c_type & 4))
                this.btn_xl.setVisible(!!(c_type & 8));
                this.btn_wx_pyq.setVisible(!!(c_type & 16))
                let res: Data_Uerinfo = JSON.parse(kaayou.DataSet.get("user::info"));
                if(mod.__teaHouseInfo.ishidhide){
                    this.shareTitle="亲友圈名称："+tea.mod.__teaHouseInfo.hname;
                }else{
                    this.shareTitle="亲友圈名称："+tea.mod.__teaHouseInfo.hname+"\r\n亲友圈ID："+tea.mod.__teaHouseInfo.hid;
                }
                this.shareText = "玩法多样，\r\n开心娱乐！";
                if (!mod.__teaHouseInfo.hm_switch.BanWeChat) {
                    this.btn_wx_haoyou.setVisible(false);
                    this.btn_wx_pyq.setVisible(false);
                }
            }
            this.layout_sharemenu.doChildrenLayout();
            this.setVisible(true);
            kaayou.pop.showAni({
                cNode: this.node.getChildByName("contentPanel"),
                mNode: this.node.getChildByName("maskbg")
            });
        }

        Hide() {
            // this.setVisible(false);
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