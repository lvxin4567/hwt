
//招募面板
namespace lobby {
    const { doBindEvent, BindEvent } = kaayou._decorator;

    export class RecruitingPanelMgr {
        static __INS__: RecruitingPanelMgr = null;
        static getInstance(_zOrder: number = 0) {
            if (RecruitingPanelMgr.__INS__ == null) {
                RecruitingPanelMgr.__INS__ = new RecruitingPanelMgr();
                RecruitingPanelMgr.__INS__.init();
                RecruitingPanelMgr.__INS__._zOrder = _zOrder;
            }
            return RecruitingPanelMgr.__INS__;
        }
        __selfPanel: RecruitingPanel = null;
        public _gold = 0;
        public _zOrder = 0;
        onUpdateUserInfo(data: Data_Uerinfo) {
            this._gold = data.gold;
        }
        init() {
            let self = this;
            this.__selfPanel = null;

            kaayou.getController('lobby').on('ui::Recruiting::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show();
            }, this, 10);

            kaayou.getController('lobby').on('ui::Recruiting::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new RecruitingPanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel, this._zOrder)
            }
            return this.__selfPanel;
        }
    }

    export class RecruitingPanel extends kaayou.ModelLayer {
        constructor() {
            super();
            this.initWithccs(lobby.res.RecruitingPanel_json);
            this.initUI();
        }
        btnClose: ccui.Button = null;
        btnCopy:ccui.Button=null;
        btnGameClose:ccui.Button=null;
        btnSearch:ccui.Button=null;
        btnSwitch:ccui.Button=null;
        btnSubmit:ccui.Button=null;
        ebSearch:ccui.TextField=null;
        ebTel:ccui.TextField=null;
        gameKey:string="hzlzg";
        lbGameName:ccui.Text=null;
        lbSearch:ccui.Text=null;
        lbTel:ccui.Text=null;
        lbWechat:ccui.Text=null;
        pageView:ccui.PageView=null;
        pnlGame:ccui.Layout=null;
        svGame:ccui.ScrollView=null;
        prfGame:ccui.Layout=null;

        private createCell(): GameCell {
            let self=this;
            let cell = kaayou.pool.getFromPool(GameCell);
            if (!cell) {
                cell = new GameCell();
                cell.initWithNode(this.prfGame,function(r){
                    self.showGameInfo(r);
                });
            }
            return cell;
        }

        initUI() {
            this.isTouchMaskHide = false;
            let self = this;
            this.btnClose = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "CloseButton");
            this.btnClose.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.Hide();
            }, this);
            this.pnlGame=ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "PackagePanel");
            this.btnSwitch=ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "SwitchButton");
            this.btnSwitch.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                self.search();
                self.pnlGame.setVisible(true);
            }, this);
            this.btnGameClose = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "GameCloseButton");
            this.btnGameClose.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.svGame.removeAllChildren();
                self.pnlGame.setVisible(false);
            }, this);
            this.pageView=ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "PageView");
            // this.pageView.addEventListener((function(sender,type){
                
            // }).bind(this));
            this.schedule(() => {
                let count = this.pageView.getChildrenCount();
                let index = this.pageView.getCurrentPageIndex();
                index = ((index < count) && (index + 1 !== count)) ? (index + 1) : 0;
                this.pageView.scrollToPage(index);
            }, 5);
            this.lbTel=ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "TelLabel");
            this.ebTel=ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "TelEditBox");
            this.ebTel.addEventListener(function (ref: ccui.TextField, type) {
                if (ccui.TextField.EVENT_ATTACH_WITH_IME == type) {
                    console.log("EVENT_ATTACH_WITH_IME");
                } else if (ccui.TextField.EVENT_DETACH_WITH_IME == type) {
                    console.log("EVENT_DETACH_WITH_IME");
                } else if (ccui.TextField.EVENT_INSERT_TEXT == type || ccui.TextField.EVENT_DELETE_BACKWARD == type) {
                    let gstr = ref.getString();
                    this.ebTel.setString(gstr);
                    this.lbTel.setString(gstr);
                }
            }, this);
            this.lbSearch=ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "SearchLabel");
            this.ebSearch=ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "SearchEditBox");
            this.ebSearch.addEventListener(function (ref: ccui.TextField, type) {
                if (ccui.TextField.EVENT_ATTACH_WITH_IME == type) {
                    console.log("EVENT_ATTACH_WITH_IME");
                } else if (ccui.TextField.EVENT_DETACH_WITH_IME == type) {
                    console.log("EVENT_DETACH_WITH_IME");
                } else if (ccui.TextField.EVENT_INSERT_TEXT == type || ccui.TextField.EVENT_DELETE_BACKWARD == type) {
                    let gstr = ref.getString();
                    this.lbSearch.setString(gstr);
                    this.ebSearch.setString(gstr);
                }
            }, this);
            this.btnSearch=ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "SearchButton");
            this.btnSearch.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                self.search();
            }, this);
            this.svGame=ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "ScrollView");
            this.svGame.setPadding({ left:15,spacingX: 15,spacingY: 5 });
            this.svGame.setGrid(ccui.Layout.LayoutGrid_AxisDirection.HORIZONTAL);
            this.svGame.setHorizontal(ccui.Layout.LayoutHorizontal.LEFT);
            this.svGame.setVertical(ccui.Layout.LayoutVertical.TOP);
            this.svGame.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Grid);
            this.svGame.setGridColumn(5);
            this.prfGame=ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "GameCell");
            this.lbGameName=ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "GameName");
            this.lbWechat=ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "WechatLabel");
            this.btnCopy=ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "CopyButton");
            this.btnCopy.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                if(kaayou.PlatformMgr.getInstance().sys.copyStringToPasteBoard(self.lbWechat.getString())){
                    kaayou.PlatformMgr.getInstance().sys.jumpWeChatImmediacy();
                }
            }, this);
            this.btnSubmit=ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "SubmitButton");
            this.btnSubmit.on(kaayou.TouchEvent.TouchEnd, function () {
                if(self.lbTel.getString().length!=11){
                    kaayou.emit('common', 'ui::Toast::Show', { msg: "手机号输入有误，请查验后再次输入" });
                    return;
                }
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit('common', "ui::VerifyPhone::Show",{tel:self.lbTel.getString(),callback:async function(){
                    let url = "";
                    url = common.mod.Config.AppConfig.loginUrl;
                    let temp = {
                        "data": { 
                            mobile:self.lbTel.getString(),
                            package_key: self.gameKey,
                            user_id:lobby.mod.User.getInstance().getUserInfo().uid,
                            user_name: lobby.mod.User.getInstance().getUserInfo().name
                        },
                        "time": new Date().getTime(),
                        "encrypt": true,
                        "sign": "",
                    }
                    if (temp.encrypt) temp.data = kaayou.AES.encryptPHP(JSON.stringify(temp.data));
                    let sendData={ msgdata: JSON.stringify(temp) };
                    let res: any = await kaayou.Http.POST(common.mod.Config.ConfigUrl + "/api/contact", sendData);
                    let oRes=JSON.parse(res);
                    if (oRes.code != 0) {
                        kaayou.emit('common', 'ui::Dialog::Show',oRes.msg);
                        return;
                    }
                    kaayou.emit('common', 'ui::Toast::Show', { msg: "您的信息已经提交成功，会有工作人员联系您" });
                }});
            }, this);
            kaayou.getController("lobby").on('ui::Lobby::RecruitWechat', function (e: kaayou.Event) {
                if(!!e.data){
                    self.lbWechat.setString(e.data);
                }else{
                    self.lbWechat.setString("kaayouzm");
                }
            }, this);
            this.Hide();
        }

        search(){
            let self = this;
            let key=self.lbSearch.getString();
            kaayou.emit('lobby', "mod::Package::Search", {
                code: "" , keyword: key, type: 0, package_type : 0 , call: function (r) {
                    self.showGame(r);
                }
            });
        }

        @BindEvent("lobby", 'ui::Recruiting::Show')
        Show() {
            let self=this;
            self.showGameInfo('hzlzg');
            this.setVisible(true);
            kaayou.pop.showAni({
                cNode: this.node.getChildByName("contentPanel"),
                mNode: this.node.getChildByName("maskbg"),
                action:function(){
                }
            });
        }

        showGame(data){
            let self = this;
            kaayou.pool.putAllChildrenInPool(this.svGame);
            for (let i = 0; i < data.length; ++i) {
                let key = data[i].package_key;
                let index = lobby.mod.Package.getInstance().getPackageIndex(key);
                if (index > -1) {
                    let cell = self.createCell();
                    cell.setGame(key, data[i].package_name, index, data[i].icon);
                    self.svGame.addChild(cell);
                }
            }

            self.svGame.doChildrenLayout();
            this.setVisible(true);
        }

        showGameInfo(data){
            let self=this;
            self.gameKey=data;
            self.pnlGame.setVisible(false);
            let gameName=lobby.mod.Package.getInstance().getGameName(data);
            self.lbGameName.setString(gameName);
            kaayou.emit("lobby","mod::lobby::GetRecruitWechat",data);
        }

        @BindEvent("lobby", 'ui::Recruiting::Hide')
        Hide() {
            kaayou.pop.hideAni(
                {
                    cNode: this.node.getChildByName("contentPanel"),
                    mNode: this.node.getChildByName("maskbg"),
                    rnode: this,
                    action:function(){
                    }
                }
            )
            // this.setVisible(false);
        }

    }



}