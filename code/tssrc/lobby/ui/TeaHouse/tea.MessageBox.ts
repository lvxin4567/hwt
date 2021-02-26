namespace tea {
    var { BindEvent, doBindEvent } = kaayou._decorator;

    class MessageBoxRow extends kaayou.Block {
        constructor() {
            super();
        }

        lbMessage: ccui.Text = null;
        lbTime: ccui.Text = null;

        initWithNode(node: ccui.Widget) {
            super.initWithNode(node);
            let self = this;
            this.lbMessage = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Message");
            this.lbTime = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Time");
        }

        _data = null;
        setInfo(data) {
            this._data = data;
            if (lodash.isEmpty(data)) {
                this.lbMessage.setString("");
                return;
            }
            this.lbMessage.setString(data.msg);
            this.lbTime.setString((new Date(data.create_stamp*1000)).format("yyyy-MM-dd\r\nhh:mm:ss "));
        }

        doUpdate() {

        }

        unuse() {
            this._data = null;
            this.removeFromParent();
        }
    }

    export class tea_MessageBoxMgr {
        static __INS__: tea_MessageBoxMgr = null;
        static getInstance() {
            if (tea_MessageBoxMgr.__INS__ == null) {
                tea_MessageBoxMgr.__INS__ = new tea_MessageBoxMgr();
                tea_MessageBoxMgr.__INS__.init();
            }
            return tea_MessageBoxMgr.__INS__;
        }
        __selfPanel: MessageBox = null;

        init() {
            let self = this;
            this.__selfPanel = null;
            kaayou.getController('tea').on('ui::MessageBox::Show', function (e: kaayou.Event) {
                if (kaayou.UIManager.getInstance().getCurRuningSceneName() != "TEAHOUSE") return;
                self.getPanel(true).Show();
            }, this, 10);
            kaayou.getController('tea').on('ui::MessageBox::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new MessageBox();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }
    }

    export class MessageBox extends kaayou.ModelLayer {
        prfRow: ccui.Layout = null;
        constructor() {
            super();
            this.initUI();
        }
        btnClose: ccui.Button = null;
        svMessage: ccui.ScrollView = null;
        @doBindEvent
        initUI() {
            let self = this;
            this.isTouchMaskHide = false;
            this.initWithccs(tea.res.MessageBox_json);

            this.btnClose = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "CloseButton");
            this.btnClose.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.Hide();
            }, this);
            this.prfRow = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "MessageBoxRow");
            this.prfRow.setVisible(false);
            this.svMessage = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "ScrollView");
            this.svMessage.setPadding({left:10,spacingY: 10 });
            this.svMessage.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Vertical);
            this.svMessage.setVertical(ccui.Layout.LayoutVertical.TOP);
            this.svMessage.setScrollBarEnabled(false);
            this.svMessage.addEventListener(function (scroll: ccui.ScrollView, e) {
                if (1 == e && !scroll['needUpdate']) {
                    scroll['needUpdate'] = true;
                    self.getMessage(false);
                }
            }.bind(this));
            kaayou.getController('tea').on('ui::TeaHouse::ShowMessage', function (e: kaayou.Event) {
                self.updateList(e.data)
            }, this, 10);
            this.Hide();
        }
        
        getMessage(clear: boolean = true) {
            if (clear) {
                kaayou.pool.putAllChildrenInPool(this.svMessage);
                this.svMessage.scrollToTop(0, false);
            }
            kaayou.emit("tea", 'mod::TeaHouse::GetMessage', { clear: clear });
        }
        
        private createCell(): MessageBoxRow {
            let cell = kaayou.pool.getFromPool(MessageBoxRow);
            if (!cell) {
                cell = new MessageBoxRow();
                cell.initWithNode(this.prfRow);
            }

            cell.setAnchorPoint(0, 0);
            cell.setPositionY(0);
            cell.setPositionX(10);
            cell.setVisible(true);
            return cell;
        }

        updateList(data) {
            if (lodash.isEmpty(data)) { return; }
            let __selfScroll = this.svMessage;
            var offset = __selfScroll.getInnerOffSetTop() || 0;
            __selfScroll['needUpdate'] = false;
            kaayou.pool.putAllChildrenInPool(__selfScroll);
            let items = data || [];
            if (lodash.isEmpty(items)) { return; }

            for (var x in items) {
                let cell = this.createCell();
                __selfScroll.addChild(cell);
                cell.setInfo(items[x]);
            }
            __selfScroll.doChildrenLayout();
            offset = Math.min(-1 * Math.abs(Math.max(__selfScroll.getInnerContainerSize().height - __selfScroll.getLayoutSize().height) - offset), 0);
            __selfScroll.setInnerContainerPosition(cc.p(0, offset));
        }

        Show() {
            var self = this;
            this.svMessage.setVisible(false);
            this.setVisible(true);
            kaayou.pop.showAni({
                cNode: this.node.getChildByName("contentPanel"),
                mNode: this.node.getChildByName("maskbg"),
                action:function(){
                    self.getMessage();
                    self.svMessage.setVisible(true);
                }
            });
        }

        Hide() {
            kaayou.pool.putAllChildrenInPool(this.svMessage);
            this.svMessage.scrollToTop(0,false);
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