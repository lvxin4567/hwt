namespace tea {
    var { BindEvent, doBindEvent } = kaayou._decorator;

    class MePullCell extends kaayou.Block {
        _index = -1;
        setIndex(index) {
            this._index = index;
        }
        getIndex() {
            return this._index;
        }
    }

    class PartnerMemberRow extends MePullCell implements common.IPullListCell {
        constructor() {
            super();
        }
        _data = null;
        img_head: ccui.ImageView = null;
        label_name: ccui.Text = null;
        label_id: ccui.Text = null;
        lbGameCount:ccui.Text=null;
        lbBigWin:ccui.Text=null;
        lbScore:ccui.Text=null;
        //lbYouXiao:ccui.Text=null;
        lbWuXiao:ccui.Text=null;

        initWithNode(node: ccui.Widget) {
            let self = this;
            super.initWithNode(node);

            this.img_head = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "img_head");

            this.label_name = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_name");
            this.label_id = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_id");
            this.lbGameCount=ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "GameCount");
            this.lbBigWin=ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "BigWin");
            this.lbScore=ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Score");
            //this.lbYouXiao=ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "YouXiao");
            this.lbWuXiao=ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "WuXiao");         
        }

        setInfo(data) {
            if (lodash.isEqual(this._data, data)) { return; }
            var self = this;
            this._data = lodash.cloneDeep(data);
            
            if (lodash.isEmpty(data)) {
                this.label_name.setString("");
                this.label_id.setString("");
                return;
            }
            this.label_name.setString(kaayou.Identify.nickNameSubSix(this._data.uname));
            this.label_id.setString("ID:" + this._data.uid);
            this.lbBigWin.setString(this._data.bwtimes);
            this.lbGameCount.setString(this._data.playtimes);
            this.lbScore.setString(this._data.totalscore);
            //this.lbYouXiao.setString(this._data.validtimes);
            this.lbWuXiao.setString((this._data.playtimes-this._data.validtimes).toString());

            NetImage.setPlayerHead(this.img_head, this._data.uurl, this._data.ugender, (url) => {
                if (!this._data) { return false; }
                if (url !== this._data.uurl) {
                    return false;
                }
                return true;
            });
        }

        unuse() {
            this._data = null;
            this.removeFromParent();
        }

    }

    export class tea_PartnerMemberRecordPanelMgr {
        static __INS__: tea_PartnerMemberRecordPanelMgr = null;
        static getInstance() {
            if (tea_PartnerMemberRecordPanelMgr.__INS__ == null) {
                tea_PartnerMemberRecordPanelMgr.__INS__ = new tea_PartnerMemberRecordPanelMgr();
                tea_PartnerMemberRecordPanelMgr.__INS__.init();
            }
            return tea_PartnerMemberRecordPanelMgr.__INS__;
        }
        __selfPanel: PartnerMemberRecordPanel = null;

        init() {
            let self = this;
            this.__selfPanel = null;

            kaayou.getController('tea').on('ui::PartnerRecordPanel::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show(e.data);
            }, this, 10);
            kaayou.getController('tea').on('ui::Member::UpdatePartnerMemberRecordList', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).onUpdatePartnerMember(e.data);
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new PartnerMemberRecordPanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }
    }

    export class PartnerMemberRecordPanel extends kaayou.ModelLayer {
        _data=null;
        btnPartnerPanelClose: ccui.Button = null;
        prfPartnerMemberRow: ccui.Layout = null;
        svPartnerMember: common.PullList = null;

        constructor() {
            super();
            this.initUI();
        }

        @doBindEvent
        initUI() {
            let self = this;
            this.initWithccs(tea.res.ParterMemberRecordPanel_json);
            self.prfPartnerMemberRow = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "PartnerMemberRow");
            this.btnPartnerPanelClose = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Close");
            this.btnPartnerPanelClose.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.Hide();
            }, this);

            this.svPartnerMember = new common.PullList();
            this.svPartnerMember.setSpacingY(8);
            let sv=ccui.helper.seekWidgetByName(<ccui.Widget>self.node, "PartnerMemberScrollView");
            this.svPartnerMember.initWithNode(<cc.Node>sv);
            this.svPartnerMember.setAdpter({
                getCell: () => {
                    let v = new PartnerMemberRow();
                    v.initWithNode(self.prfPartnerMemberRow);
                    return v;
                },
                datas: []
            });
            this.svPartnerMember.initPullEnv();
            this.svPartnerMember.refresh();
            this.svPartnerMember.on(kaayou.PullListEvent.HeadFinish, (e: kaayou.PullListEvent) => {
                let target = e.target;
                setTimeout(() => {
                    self.doGetPartnerMemberList(true);
                }, 500);

            }, this);
            this.svPartnerMember.on(kaayou.PullListEvent.FootFinish, (e: kaayou.PullListEvent) => {
                let target = e.target;
                setTimeout(() => {
                    self.doGetPartnerMemberList(false);
                }, 500);
            }, this);

            kaayou.getController('tea').on('ui::State::UpdateStat', function (e: kaayou.Event) {
                if (!self.isVisible()) { return; }
                let data: { list, update: boolean } = e.data
                if (data) {
                    if (data.update) {
                        data.list.dayType=this.timetype;
                        data.list.sortType=this.sorttype;
                        self.svPartnerMember.getAdpter().datas = lodash.clone(data.list);
                    }
                } else {
                    self.svPartnerMember.getAdpter().datas = [];
                }
                self.svPartnerMember.refresh();
            }, this, 20);
        }

        private createPartnerMemberRow(): PartnerMemberRow {
            let cell = kaayou.pool.getFromPool(PartnerMemberRow);
            if (!cell) {
                cell = new PartnerMemberRow();
                cell.initWithNode(this.prfPartnerMemberRow);
            }
            cell.setAnchorPoint(0, 0);
            cell.setPositionY(0);
            cell.setPositionX(0);
            cell.setVisible(true);
            return cell;
        }

        doGetPartnerMemberList(clear: boolean = true) {
            let self = this;
            kaayou.emit("tea", 'mod::State::GetStateList', {
                dfid:this._data.dfid,
                param: "", daytype: this._data.daytype, sorttype: this._data.sorttype, clear: clear,
                partner: this._data.partner
            });
        }

        onUpdatePartnerMember(data: { list: Data_HouseMemberItem, update: boolean }) {
            let self = this;

            if (data) {
                if (data.update) {
                    let cd = lodash.clone(data.list);
                    self.svPartnerMember.getAdpter().datas = cd;
                }
            } else {
                self.svPartnerMember.getAdpter().datas = [];
            }
            self.svPartnerMember.refresh();
        }

        reset() {
            this.svPartnerMember.getAdpter().datas = [];
            this.svPartnerMember.refresh();
            this.doGetPartnerMemberList(true);
        }

        Show(data) {
            this.setVisible(true);
            var self = this;
            self._data=data;
            kaayou.pop.showAni({
                cNode: self.node.getChildByName("contentPanel"),
                mNode: self.node.getChildByName("maskbg"),
                action:function(){
                    self.reset();
                }
            });
  
        }

        Hide() {
            var self = this;
            self._data=null;
            this.svPartnerMember.getAdpter().datas = [];
            this.svPartnerMember.refresh();
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