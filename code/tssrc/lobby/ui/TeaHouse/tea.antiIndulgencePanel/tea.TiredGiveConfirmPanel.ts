namespace tea {
    var { BindEvent, doBindEvent } = kaayou._decorator;

    export class tea_TiredGiveConfirmPanelMgr {
        static __INS__: tea_TiredGiveConfirmPanelMgr = null;
        static getInstance(_zOrder: number = 0) {
            if (tea_TiredGiveConfirmPanelMgr.__INS__ == null) {
                tea_TiredGiveConfirmPanelMgr.__INS__ = new tea_TiredGiveConfirmPanelMgr();
                tea_TiredGiveConfirmPanelMgr.__INS__.init();
                tea_TiredGiveConfirmPanelMgr.__INS__._zOrder = _zOrder
            }
            return tea_TiredGiveConfirmPanelMgr.__INS__;
        }
        __selfPanel: tea_GiveConfirmPanel = null;
        _zOrder: number = 0
        init() {
            let self = this;
            this.__selfPanel = null;

            kaayou.getController('tea').on('ui::TiredGiveConfirmPanel::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show(e.data);
            }, this, 10);
            kaayou.getController('tea').on('ui::TiredGiveConfirmPanel::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new tea_GiveConfirmPanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel,this._zOrder);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }
    }

    export class tea_GiveConfirmPanel extends kaayou.ModelLayer {
        constructor() {
            super();
            this.initUI();
        }
        _data=null;
        btnClose: ccui.Button = null;
        btnConfirm: ccui.Button = null;
        ivHead:ccui.ImageView=null;
        lbUserID:ccui.Text=null;
        lbUserName:ccui.Text=null;
        lbMsg:ccui.Text=null;
        
        @doBindEvent
        initUI() {
            this.initWithccs(tea.res.TiredGiveConfirmPanel_json,true);
            this.ivHead=ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "head_img");
            this.lbUserID=ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "UserID");
            this.lbUserName=ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "UserName");
            this.lbMsg=ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Msg");

            //关闭按钮
            this.btnClose = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Close");
            this.btnConfirm = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "ConfirmButton");

            let self = this;
            //关闭
            this.btnClose.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.Hide()
            }, this);
            
            this.btnConfirm.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtn);
                kaayou.emit("tea","mod::Fcm::Give",{
                    uid:self._data.uid,
                    value:self._data.give,
                    hid:tea.mod.__teaHouseInfo.hid
                });
                self.Hide();
            }, this);
        }

        Show(data) {
            let self=this;
            this._data=data;
            let name=data.uname||"";
            NetImage.setPlayerHead(this.ivHead, this._data.uurl, this._data.gender, (url) => {
                if (!this._data) { return false; }
                if (url !== this._data.uurl) {
                    return false;
                }
                return true;
            });
            if (!!!data.give) {
                data.give = 0;
            }
            self.lbUserID.setString("(ID:"+data.uid+")");
            self.lbUserName.setString(kaayou.Identify.nickNameSubSix(data.uname));
            self.lbMsg.setString("您同意将 "+data.give+" 比赛分赠送给 "+data.uname)
            this.setVisible(true);
            kaayou.pop.showAni({
                cNode: this.node.getChildByName("contentPanel"),
                mNode: this.node.getChildByName("maskbg"),
                action:function(){

                }
            });
        }

        Hide() {
            let self=this;
            kaayou.pop.hideAni(
                {
                    cNode: this.node.getChildByName("contentPanel"),
                    mNode: this.node.getChildByName("maskbg"),
                    rnode: this,
                    action:function(){
                    }
                }
            )
        }
    }
}