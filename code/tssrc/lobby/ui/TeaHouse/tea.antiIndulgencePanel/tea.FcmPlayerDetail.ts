//比赛分详情
namespace tea {
    var { BindEvent, doBindEvent } = kaayou._decorator;
    class PlayerDetailCell extends kaayou.Block implements common.IPullListCell {
        constructor() {
            super();
        }

        label_time: ccui.Text = null;
        label_before: ccui.Text = null;
        label_changeAc: ccui.Text = null;
        label_changeNum: ccui.Text = null;
        label_opName: ccui.Text = null;
        label_after: ccui.Text = null;   
        itemBg:ccui.ImageView = null;
        _index = -1;
        setIndex(index) {
            this._index = index;
        }
        getIndex() {
            return this._index;
        }
        initWithNode(node: ccui.Widget) {
            super.initWithNode(node);
            let self = this;
            this.label_before = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_before");
            this.label_time = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_time");
            this.label_changeAc = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_changeAc");
            this.label_changeNum = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_changeNum");
            this.label_opName = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_opName");
            this.label_after = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_after");
            this.itemBg = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "bg1");
        }

        _data: FCMPlayerRecordItem = null;
        setInfo(data: FCMPlayerRecordItem) {
            this._data = data;
            if (lodash.isEmpty(data)) {
                this.label_before.setString("");
                this.label_time.setString("");
                this.label_changeAc.setString("");
                this.label_changeNum.setString("");
                this.label_opName.setString("");
                this.label_after.setString("");
                return;
            }
            // export interface FCMPlayerRecordItem{
            //     id:number,
            //     aftvitamin:number,
            //     befvitamin:number,
            //     change_vitamin:number,
            //     opt_name:string,
            //     opt_type:string,
            //     updatedtime:number,
            //     uid:number,
            // }
            // this.label_time.setString(kaayou.Identify.nickNameSubSix(this._data.uname));
            // this.label_before.setString("ID:" + this._data.uid);
            this.label_time.setString(""+new Date(this._data.updatedtime * 1000).format('MM-dd  hh:mm'));
            this.label_before.setString(""+this._data.befvitamin);
            this.label_after.setString(""+this._data.aftvitamin);
            this.label_changeAc.setString(this._data.opt_type);
            this.label_changeNum.setString(""+this._data.change_vitamin);
            this.label_opName.setString(this._data.opt_name);
            this.itemBg.setVisible(data.index%2 == 0)
        }

        doUpdate() {

        }

        unuse() {
            this._data = null;
            this.removeFromParent();
        }

    }

    export class tea_FcmPlayerDetailMgr {
        static __INS__: tea_FcmPlayerDetailMgr = null;
        static getInstance(_zOrder: number = 0) {
            if (tea_FcmPlayerDetailMgr.__INS__ == null) {
                tea_FcmPlayerDetailMgr.__INS__ = new tea_FcmPlayerDetailMgr();
                tea_FcmPlayerDetailMgr.__INS__.init();
                tea_FcmPlayerDetailMgr.__INS__._zOrder = _zOrder
            }
            return tea_FcmPlayerDetailMgr.__INS__;
        }
        __selfPanel: PlayerDetailPanel = null;
        _zOrder: number = 0
        init() {
            let self = this;
            this.__selfPanel = null;
            kaayou.getController('tea').on('ui::Fcm::UpdateDetailList', function (e: kaayou.Event) {
                // self.getPanel(false) && self.getPanel(false).onUpdateBlackList(e.data);
            }, this, 10);
            kaayou.getController('tea').on('ui::FcmPlayerDetail::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show(e.data);
            }, this, 10);
            kaayou.getController('tea').on('ui::FcmPlayerDetail::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new PlayerDetailPanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel,this._zOrder);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }

    }

    export class PlayerDetailPanel extends kaayou.ModelLayer {
        btnSearch: ccui.Button = null;
        teaFcmPlayerDetail_cell: ccui.Layout = null;
        scrollDetail_list: common.PullList = null; //
        playerUid:number = 0;
        label_name:ccui.Text = null;
        label_curFcmNum:ccui.Text = null;
        constructor() {
            super();
            this.initUI();
        }
        btn_close: ccui.Button = null;
        @doBindEvent
        initUI() {
            let self = this;
            this.isTouchMaskHide = false;
            this.initWithccs(tea.res.TH_FcmPlayerDeatail_json);
            this.btn_close = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_close");
            this.btn_close.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.Hide();
            }, this);
            this.teaFcmPlayerDetail_cell = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Fcm_PlayerDetail_Item");
            this.label_curFcmNum = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "FcmDetailCurNum");
            this.label_name = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "FcmDetailName");
            this.label_name.setString("");
            this.label_curFcmNum.setString("当前比赛分：");
            this.scrollDetail_list = new common.PullList();
            this.scrollDetail_list.initWithNode(<cc.Node>ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "ScrollView_Detail"));
            this.scrollDetail_list.setFootDoingText("上拉刷新");
            this.scrollDetail_list.setFootDidFinishText("松开刷新");
            this.scrollDetail_list.setFootFinishText("正在刷新");

            this.scrollDetail_list.setAdpter({
                getCell: () => {
                    let v = new PlayerDetailCell();
                    v.initWithNode(self.teaFcmPlayerDetail_cell);
                    return v;
                },
                datas: []
            });

            this.scrollDetail_list.on(kaayou.PullListEvent.HeadFinish, (e: kaayou.PullListEvent) => {
                let target = e.target;
                setTimeout(() => {
                    self.doGetPlayerFcmRecordlist(true);
                }, 500);

            }, this);
            this.scrollDetail_list.on(kaayou.PullListEvent.FootFinish, (e: kaayou.PullListEvent) => {
                let target = e.target;
                setTimeout(() => {
                    self.doGetPlayerFcmRecordlist(false);
                }, 500);
            }, this);

            const UI_UpdateEventName = 'ui::Fcm::updatePlayerRecordList';
            kaayou.getController('tea').on(UI_UpdateEventName, function (e: kaayou.Event) {
                // let data: { list: Data_HousePartnerCountItem[], update: boolean } = e.data
                let data: { list: ITH_DATA_FCMPlayerRecord, curFcmNum:number,uname:string,update: boolean } = e.data
                if (data && data.list && data.uname) {
                    this.label_name.setString(data.uname);
                    this.label_curFcmNum.setString("当前比赛分："+data.curFcmNum);
                    if (data.update) {
                        self.scrollDetail_list.getAdpter().datas = lodash.clone(data.list || []);
                    }
                } else {
                    self.scrollDetail_list.getAdpter().datas = [];
                }
                self.scrollDetail_list.refresh();
            }, this, 10);
            this.scrollDetail_list.initPullEnv();
            self.scrollDetail_list.getAdpter().datas = [];
            self.scrollDetail_list.refresh();
            this.Hide();
        }

        doGetPlayerFcmRecordlist(clear:boolean){
            kaayou.emit("tea", "mod::TeaHouse::GetPlayerFcmRecord", {uid: this.playerUid,clear:clear });
        }

        Show(data:{uid:number}) {
            
            this.setVisible(true);
            var self = this;
            this.playerUid = data.uid;
            kaayou.pop.showAni({
                cNode: this.node.getChildByName("contentPanel"),
                mNode: this.node.getChildByName("maskbg"),
                action: function () {
                    self.doGetPlayerFcmRecordlist(true)
                }
            });

        }

        Hide() {
            this.scrollDetail_list.getAdpter().datas = [];
            this.scrollDetail_list.refresh();
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