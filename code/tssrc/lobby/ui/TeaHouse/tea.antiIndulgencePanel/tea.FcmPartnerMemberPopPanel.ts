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

    class PartnerMemberPopCell extends MePullCell implements common.IPullListCell {
        constructor() {
            super();
        }
        img_head: ccui.ImageView = null;
        label_name: ccui.Text = null;
        label_id: ccui.Text = null;
        label_zff: ccui.Text = null;
        label_wjsy: ccui.Text = null;
        label_fsze: ccui.Text = null;
        label_wpsy: ccui.Text = null;
        _data: Data_HousePartnerCountItem = null;
        initWithNode(node: ccui.Widget) {
            let self = this;
            super.initWithNode(node);

            this.img_head = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "img_head");

            this.label_name = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_name");
            this.label_id = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_id");
            this.label_zff = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_zff");
            this.label_wjsy = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_wjsy");
            this.label_fsze = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_fsze");
            this.label_wpsy = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_wpsy");
        }

        setInfo(data: Data_HousePartnerCountItem) {
            if (lodash.isEqual(this._data, data)) { return; }
            var self = this;
            this._data = lodash.cloneDeep(data);

            if (lodash.isEmpty(data)) {
                this.label_name.setString("");
                this.label_id.setString("");
                this.label_zff.setString("");
                this.label_wjsy.setString("");
                this.label_wpsy.setString("");
                return;
            }
            this.label_name.setString(kaayou.Identify.nickNameSubSix(this._data.uname));
            this.label_id.setString("ID:" + this._data.uid);
            //lm190907房费为正数
            this.label_zff.setString("" + Math.abs(this._data.vitamincost));
            this.label_wjsy.setString("" + this._data.vitaminleft);
            this.label_fsze.setString("" + this._data.vitaminminus);
            this.label_wpsy.setString("" + this._data.vitaminwinlose);

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

    export class tea_PartnerMemberPopMgr {
        static __INS__: tea_PartnerMemberPopMgr = null;
        static getInstance(_zOrder: number = 0) {
            if (tea_PartnerMemberPopMgr.__INS__ == null) {
                tea_PartnerMemberPopMgr.__INS__ = new tea_PartnerMemberPopMgr();
                tea_PartnerMemberPopMgr.__INS__.init();
                tea_PartnerMemberPopMgr.__INS__._zOrder = _zOrder;
            }
            return tea_PartnerMemberPopMgr.__INS__;
        }
        __selfPanel: PartnerMemberPopPanel = null;
        _zOrder: number = 0
        init() {
            let self = this;
            this.__selfPanel = null;

            kaayou.getController('tea').on('ui::PartnerMemberCountPop::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show(e.data);
            }, this, 10);
            kaayou.getController('tea').on('ui::Fcm::UpdatePartnerMemberCountPopList', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).onUpdatePartnerMember(e.data);
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new PartnerMemberPopPanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel, this._zOrder);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }
    }

    export class PartnerMemberPopPanel extends kaayou.ModelLayer {
        _data = null;
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
            this.initWithccs(tea.res.TH_PartnerMemberPopPanel);
            self.prfPartnerMemberRow = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "PartnerMemberRow");
            this.btnPartnerPanelClose = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Close");
            this.btnPartnerPanelClose.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.Hide();
            }, this);
            self.isTouchMaskHide = false;
            this.svPartnerMember = new common.PullList();
            this.svPartnerMember.setSpacingY(8);
            let sv = ccui.helper.seekWidgetByName(<ccui.Widget>self.node, "PartnerMemberScrollView");
            this.svPartnerMember.initWithNode(<cc.Node>sv);
            this.svPartnerMember.setAdpter({
                getCell: () => {
                    let v = new PartnerMemberPopCell();
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

            kaayou.getController('tea').on('ui::Fcm::UpdatePartnerMemberPop', function (e: kaayou.Event) {
                if (!self.isVisible()) { return; }
                let data: { list, update: boolean } = e.data
                if (data) {
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
            kaayou.emit("tea", 'mod::Fcm::GetMemInPartnerList', {
                param: "",
                daytype: this._data.daytype,
                sorttype: this._data.sorttype,
                clear: clear,
                partner: this._data.partner,
                isPop: true
            });
        }

        onUpdatePartnerMember(data: { list: Data_HouseMemberItem, update: boolean, totalInfo: Data_HousePartnerTotalInfo }) {
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
            self._data = data;
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