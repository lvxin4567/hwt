/**
 * 
 *  权限分配
 * 
 */
namespace tea {
    const { doBindEvent, BindEvent } = kaayou._decorator;
    export class TH_AuthPowerCell extends kaayou.Block implements common.IPullListCell {
        constructor() {
            super();
        }
        _index = -1;
        setIndex(index) {
            this._index = index;
        }
        getIndex() {
            return this._index;
        }

        // label_time: ccui.Text = null;   //序号标签
        // label_day: ccui.Text = null;   //序号标签
        // label_uid: ccui.Text = null;   //序号标签
        // label_op: ccui.Text = null;   //序号标签
        // label_num: ccui.Text = null;   //序号标签



        _data: FCMPlayerRecordItem = null;

        initWithNode(node: ccui.Widget) {
            let self = this;
            super.initWithNode(node);
            // this.label_time = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_time");
            // this.label_day = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_day");
            // this.label_uid = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_uid");
            // this.label_op = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_op");
            // this.label_num = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_num");
            this.reset();
        }


        reset() {
            // this.label_day.setString("");
            // this.label_time.setString("");
            // this.label_uid.setString("");
            // this.label_op.setString("");
            // this.label_num.setString("");
        }

        setInfo(data: FCMPlayerRecordItem) {
            if (lodash.eq(this._data, data)) { return; }
            var self = this;
            this._data = data;
            if (lodash.isEmpty(data)) {
                return this.reset();
            }
            // this.label_time.setString("" + new Date(this._data.updatedtime * 1000).format('MM-dd  hh:mm'));
            // this.label_op.setString(this._data.opt_type);
            // this.label_num.setString("" + Math.abs(this._data.change_vitamin));
            // this.label_uid.setString("" + this._data.opt_name);

            // this.label_num.setTextColor(this._data.change_vitamin > 0 ? cc.color("#ff6651") : cc.color("#37caa6"));
        }
    }





    export class Tea_AuthPowerPanelMgr {
        static __INS__: Tea_AuthPowerPanelMgr = null;
        static getInstance(_zorder:number) {
            if (Tea_AuthPowerPanelMgr.__INS__ == null) {
                Tea_AuthPowerPanelMgr.__INS__ = new Tea_AuthPowerPanelMgr();
                Tea_AuthPowerPanelMgr.__INS__.init();
                Tea_AuthPowerPanelMgr.__INS__._zorder = _zorder
            }
            return Tea_AuthPowerPanelMgr.__INS__;
        }
        __selfPanel: setAuthPowerPanel = null;
        _zorder:number;
        init() {
            let self = this;
            this.__selfPanel = null;

            kaayou.getController('tea').on('ui::setAuthPowerPanel::Show', function (e: kaayou.Event) {
                if (kaayou.UIManager.getInstance().getCurRuningSceneName() != "TEAHOUSE") return;
                self.getPanel(true).Show();
            }, this, 10);

            kaayou.getController('tea').on('ui::setAuthPowerPanel::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);
            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new setAuthPowerPanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel,this._zorder);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }
    }

    export class setAuthPowerPanel extends kaayou.ModelLayer {
        constructor() {
            super();
            this.initUI();
        }
        btn_close: ccui.Button = null;
        layout_Auth: ccui.ScrollView = null;
        btn_Submit: ccui.Button = null;
        auth_cell:ccui.Layout = null;
        initUI() {
            this.initWithccs(tea.res.TH_SetAuthPowerPanel);
            this.isTouchMaskHide = false;
            let self = this;
            this.btn_close = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_close");
            this.btn_Submit = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_Submit");
            this.btn_close.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.Hide();
            }, this);
            this.auth_cell = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "rolePower_Cell");
            this.auth_cell.setVisible(false);
            this.layout_Auth = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "layout_Role");
            this.layout_Auth.setPadding({top :5, spacingY: 10 });
            this.layout_Auth.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Vertical);
            this.layout_Auth.setVertical(ccui.Layout.LayoutVertical.TOP);
            this.layout_Auth.setScrollBarEnabled(false);
            this.layout_Auth.doChildrenLayout();
            

            this.btn_Submit.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
            }, this)

            // lodash.forEach(this.layout_Auth.getChildren(), function (v: ccui.Layout, i) {
            //     v['index'] = i;
            //     v.setVisible(false);
            // });
            for (let i = 0; i < 5; i++) {
                let cell = this.createCell();
                this.layout_Auth.addChild(cell);                
            }
            this.layout_Auth.doChildrenLayout();
            this.layout_Auth.scrollToTop(0,false);

            this.Hide();
        }

        private createCell(): TH_AuthPowerCell {
            let cell = kaayou.pool.getFromPool(TH_AuthPowerCell);
            if (!cell) {
                cell = new TH_AuthPowerCell();
                cell.initWithNode(this.auth_cell);
            }
            cell.setAnchorPoint(0, 0);
            cell.setPositionY(0);
            cell.setPositionX(0);
            cell.setVisible(true);
            return cell;
        }
    
        Show() {
            this.setVisible(true);
            kaayou.pop.showAni({
                cNode: this.node.getChildByName("contentPanel"),
                mNode: this.node.getChildByName("maskbg")
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