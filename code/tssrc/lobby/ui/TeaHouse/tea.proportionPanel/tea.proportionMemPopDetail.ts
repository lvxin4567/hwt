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

    class memDetailPopCell extends MePullCell implements common.IPullListCell {
        constructor() {
            super();
        }
        img_head: ccui.ImageView = null;
        label_name: ccui.Text = null;
        label_id: ccui.Text = null; 
        label_ze: ccui.Text = null;         //总额
        label_yxj: ccui.Text = null;
        label_dj: ccui.Text = null;
        label_partner: ccui.Text = null;
        _data: partberFloorHistoryDetaiItem = null;
        initWithNode(node: ccui.Widget) {
            let self = this;
            super.initWithNode(node);

            this.img_head = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "img_head");

            this.label_name = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_name");
            this.label_id = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_id");
            this.label_ze = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_ze");
            this.label_yxj = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_yxj");
            this.label_dj = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_dj");
            this.label_partner = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_partner");
        }

        setInfo(data: partberFloorHistoryDetaiItem) {
            if (lodash.isEqual(this._data, data)) { return; }
            var self = this;
            this._data = lodash.cloneDeep(data);

            if (lodash.isEmpty(data)) {
                this.label_name.setString("");
                this.label_id.setString("");
                this.label_yxj.setString("");
                this.label_dj.setString("");
                this.label_partner.setString("");
                this.label_ze.setString("");
                return;
            }
            this.label_name.setString(kaayou.Identify.nickNameSubSix(this._data.uname));
            this.label_id.setString("ID:" + this._data.uid);
            // this.label_ze.setString("" + Math.abs(this._data.vitamincost));
            // this.label_wjsy.setString("" + this._data.vitaminleft);
            // this.label_fsze.setString("" + this._data.vitaminminus);
            // this.label_wpsy.setString("" + this._data.vitaminwinlose);
            this.label_ze.setString(""+data.totalprofit/100);
            this.label_yxj.setString(""+data.validtimes);
            this.label_dj.setString(""+data.royalty/100);
            this.label_partner.setString(""+data.subordinateprofit/100)

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

    export class tea_pertnerDelatedFloorDetailMgr {
        static __INS__: tea_pertnerDelatedFloorDetailMgr = null;
        static getInstance(_zOrder: number = 0) {
            if (tea_pertnerDelatedFloorDetailMgr.__INS__ == null) {
                tea_pertnerDelatedFloorDetailMgr.__INS__ = new tea_pertnerDelatedFloorDetailMgr();
                tea_pertnerDelatedFloorDetailMgr.__INS__.init();
                tea_pertnerDelatedFloorDetailMgr.__INS__._zOrder = _zOrder;
            }
            return tea_pertnerDelatedFloorDetailMgr.__INS__;
        }
        __selfPanel: DeletedFloorDetailPanel = null;
        _zOrder: number = 0
        init() {
            let self = this;
            this.__selfPanel = null;

            kaayou.getController('tea').on('ui::PartnerDelatedFloorDetaiPop::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show(e.data);
            }, this, 10);
            // kaayou.getController('tea').on('ui::proportion::DeletedFloorDetail', function (e: kaayou.Event) {
            //     self.getPanel(false) && self.getPanel(false).onUpdatePartnerMember(e.data);
            // }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new DeletedFloorDetailPanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel, this._zOrder);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }
    }

    export class DeletedFloorDetailPanel extends kaayou.ModelLayer {
        _data = null;
        btnPartnerPanelClose: ccui.Button = null;
        memDetailPopRow: ccui.Layout = null;
        svPartnerMember: common.PullList = null;
        dfid:number = 0;
        fid:number = 0;
        constructor() {
            super();
            this.initUI();
        }

        @doBindEvent
        initUI() {
            let self = this;
            this.initWithccs(tea.res.TH_ProportionDeletedFloorPopDetail_json);
            self.memDetailPopRow = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "memberDetailRow");
            this.btnPartnerPanelClose = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Close");
            this.btnPartnerPanelClose.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.Hide();
            }, this);
            self.isTouchMaskHide = false;
            this.svPartnerMember = new common.PullList();
            this.svPartnerMember.setSpacingY(8);
            let sv = ccui.helper.seekWidgetByName(<ccui.Widget>self.node, "deletedDetailScrollView");
            this.svPartnerMember.initWithNode(<cc.Node>sv);
            this.svPartnerMember.setAdpter({
                getCell: () => {
                    let v = new memDetailPopCell();
                    v.initWithNode(self.memDetailPopRow);
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

            kaayou.getController('tea').on('ui::FcmPartner::partnerDeletedFloorDetail', function (e: kaayou.Event) {
                if (!self.isVisible()) { return; }
                let data: { list,dfid:number,fid:number, update: boolean } = e.data
                if (data) {
                    self.fid = data.fid;
                    self.dfid = data.dfid;
                    if (data.update) {
                        data.list.dayType = this.timetype;
                        data.list.sortType = this.sorttype;
                        self.svPartnerMember.getAdpter().datas = lodash.clone(data.list);
                    }
                } else {
                    self.svPartnerMember.getAdpter().datas = [];
                }
                self.svPartnerMember.refresh();
            }, this, 20);
        }

        doGetPartnerMemberList(clear: boolean = true) {
            let self = this;
            kaayou.emit("tea", 'mod::teahouseFcm:getDeletedFloordetail', {
                fid:self.fid,
                dfid:self.dfid,
                clear:clear
            });
        }

        // onUpdatePartnerMember(data: { list: Data_HouseMemberItem, update: boolean, totalInfo: Data_HousePartnerTotalInfo }) {
        //     let self = this;

        //     if (data) {
        //         if (data.update) {
        //             let cd = lodash.clone(data.list);
        //             self.svPartnerMember.getAdpter().datas = cd;
        //         }
        //     } else {
        //         self.svPartnerMember.getAdpter().datas = [];
        //     }
        //     self.svPartnerMember.refresh();
        // }

        reset() {
            // this.svPartnerMember.getAdpter().datas = [];
            // this.svPartnerMember.refresh();
            this.doGetPartnerMemberList(true);
        }

        Show(data) {
            this.setVisible(true);
            var self = this;
            self.dfid = data.dfid;
            self.fid = data.fid
            kaayou.pop.showAni({
                cNode: self.node.getChildByName("contentPanel"),
                mNode: self.node.getChildByName("maskbg"),
                action: function () {
                    self.reset();
                }
            });

        }

        Hide() {
            var self = this;
            self._data = null;
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