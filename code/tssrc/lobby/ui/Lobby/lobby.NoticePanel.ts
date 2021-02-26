
//公告面板
namespace lobby {
    const { doBindEvent, BindEvent } = kaayou._decorator;


    export class NoticePanelMgr {
        static __INS__: NoticePanelMgr = null;
        static getInstance(_zOrder: number = 0) {
            if (NoticePanelMgr.__INS__ == null) {
                NoticePanelMgr.__INS__ = new NoticePanelMgr();
                NoticePanelMgr.__INS__.init();
                NoticePanelMgr.__INS__._zOrder = _zOrder;
            }
            return NoticePanelMgr.__INS__;
        }
        public _zOrder = 0;
        __selfPanel: NoticePanel = null;

        init() {
            let self = this;
            this.__selfPanel = null;
            kaayou.getController('lobby').on('ui::Notice::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show(e.data);
            }, this, 10);

            kaayou.getController('lobby').on('ui::Notice::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);

            kaayou.getController('common').on('ui::Layer::Show', function (e: kaayou.Event) {
                if(e.data=="NoticePanel"){
                    self.getPanel(true).setVisible(true);
                }
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new NoticePanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel, this._zOrder);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            this.doUpIndex();
            return this.__selfPanel;
        }
        doUpIndex() {
            if (!this.__selfPanel) { return; }
            let Children = kaayou.UIManager.getInstance().getCurRuningScene().getChildren();
            let max = 0;
            for (var x in Children) {
                max = Math.max(Children[x].zIndex);
            }
            this.__selfPanel.setZOrder(max + 1);
        }

    }





    export class NoticePanel extends kaayou.ModelLayer {
        constructor() {
            super();
            this.initUI();
        }
        notice_img_layout: ccui.Layout = null;
        btn_notice_close: ccui.Button = null;

        scr_right_content: ccui.ScrollView = null;
        scr_left_menu: ccui.ScrollView = null;
        menu_cell_mode: ccui.Layout = null;
        _contentviewMap: { [key: string]: Function } = null;


        playArray: Array<ccui.Button> = [];
        //   @doBindEvent
        initUI() {
            this.initWithccs(lobby.res.NoticePanel_json);
            this._contentviewMap = {};
            this.isTouchMaskHide = false;
            let self = this;
            //关闭按钮
            this.btn_notice_close = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_notice_close");
            this.btn_notice_close.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.Hide();
            }, this);


            //this.notice_text_content.ignoreContentAdaptWithSize(true);
            this.scr_right_content = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "scr_right_content");
            this.scr_right_content.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Vertical);
            this.scr_right_content.setScrollBarEnabled(false);

            this.menu_cell_mode = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "menu_cell");
            this.scr_left_menu = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "scr_left_menu");
            this.scr_left_menu.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Vertical);
            this.scr_left_menu.setScrollBarEnabled(false);
            // this.contentPanel1 = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "contentPanel1");
            // this.contentPanel2 = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "contentPanel2");


            this.setVisible(false);
        }
        _dataArr = null;

        getIsCan(): boolean {
            let configs = common.mod.Config.AppConfig;
            let feature: IFeature = lodash.extend({}, configs.feature);
            return !!feature.no;
        }
        //文字公告打开
/*
        cretateTextView(id: number, conetnt: string) {
            if (!id) { return; }
            if (this._contentviewMap[id] && (<ccui.Text>this._contentviewMap[id]).getString() == conetnt) { return; }
            let sp = new ccui.Text("");
            sp.setAnchorPoint(0.5, 1);
            sp.setFontSize(22);
            sp.setTextColor(cc.color("#766E63"));
            this._contentviewMap[id] = sp;
            let cwidth = this.scr_right_content.getContentSize().width;
            sp.setTextAreaSize(cc.size(cwidth, 0));
            sp.setString(conetnt || "");
            sp.setContentSize(sp.getVirtualRendererSize());
            sp.setPositionX(this.scr_right_content.getContentSize().width * 0.5);
            this.scr_right_content.addChild(sp);
            sp.setVisible(false);
        }
        //图片弹窗公告打开
        cretateImageView(id: number, url: string) {
            if (lodash.isEmpty(url)) { return; }
            if (!id) { return; }
            if (this._contentviewMap[id] && this._contentviewMap[id]['_url_'] == url) { return; }
            let sp = new cc.Sprite();
            this._contentviewMap[id] = sp;
            sp['_url_'] = url;
            sp.setAnchorPoint(0.5, 1);
            let self = this;
            let cwidth = this.scr_right_content.getContentSize().width;
            NetImage.loadImage(url).then(function (tex: cc.Texture2D) {
                sp.initWithTexture(tex);
                let sca = cwidth / sp.width;
                sp.setScaleX(sca);
                sp.setScaleY(sca);
                if (self.__lastMenuDid == id)
                    self.scr_right_content.doChildrenLayout();
            });

            sp.setPositionX(this.scr_right_content.getContentSize().width * 0.5);
            this.scr_right_content.addChild(sp);
            sp.setVisible(false);
        }
        */
        __lastMenuDid = 0;
        //生成内容
        setRuleList(data: Array<INoticeData>) {
            this.playArray = [];
            console.log("公告:", data);
            // let explain = this._dataArr[0];.
            if (lodash.isEqual(this._dataArr, data)) { return; }
            this._dataArr = data;
            kaayou.uninstallController("NoticeMenu");
            this.__lastMenuDid = 0;

            if (!this._dataArr || this._dataArr.length < 1) {
                this.scr_right_content.removeAllChildren();
                this.scr_left_menu.removeAllChildren();
                return;
            }

            if (this._dataArr) {
                let len = data.length - this.scr_left_menu.getChildrenCount();
                if (len > 0) {
                    for (var i = 0; i < len; i++) {
                        let vc = this.menu_cell_mode.clone();
                        vc.setAnchorPoint(0.5, 0.5);
                        vc.setPositionX(this.scr_left_menu.getContentSize().width * 0.5);
                        this.scr_left_menu.addChild(vc);
                    }
                }
                if (len < 0) {
                    let child: ccui.Widget[] = this.scr_left_menu.getChildren()
                    for (var i = child.length - len - 1; i < child.length; i++) {
                        child[i].removeFromParent();
                    }
                }
                let child = this.scr_left_menu.getChildren();
                for (var i = 0; i < data.length; i++) {
                    child[i]['_did_'] = data[i].id;
                    child[i].onNoticeMenuChange = function (e: kaayou.Event) {
                        let _did_ = this['_did_'];
                        if (e.data.did == _did_) {
                            this.getChildByName("bg_off").setVisible(false);
                            this.getChildByName("bg_on").setVisible(true);
                        } else {
                            this.getChildByName("bg_off").setVisible(true);
                            this.getChildByName("bg_on").setVisible(false);
                        }
                    }
                    child[i].on(kaayou.TouchEvent.TouchEnd, (e: kaayou.TouchEvent) => {
                        let _did_ = e.target['_did_'];
                        kaayou.emit("NoticeMenu", "NoticeMenuChange", { did: _did_ });
                    }, this);
                    child[i].getChildByName("meun").setString(!!data[i].tag && data[i].tag||"官方公告");
                    kaayou.getController("NoticeMenu").on("NoticeMenuChange", child[i].onNoticeMenuChange, child[i]);
                }
                this.scr_left_menu.doChildrenLayout();
            }

            let self = this;
            lodash.forEach(data, (v: INoticeData) => {
                let render = new common.htmlRender;
                this._contentviewMap[v.id] = function(){
                    render.render(self.scr_right_content,v.content)
                }
            });

            kaayou.getController("NoticeMenu").on("NoticeMenuChange", (e: kaayou.Event) => {
                let _did_ = e.data.did;
                let __last = this.__lastMenuDid;
                if (this.__lastMenuDid == _did_) { return; }
                this.__lastMenuDid = _did_;

                for (var x in this._contentviewMap) {
                    if(x==e.data['did'])
                    this._contentviewMap[x]();
                }
                this.scr_right_content.doChildrenLayout();
            }, this);

            kaayou.emit("NoticeMenu", "NoticeMenuChange", { did: data[0].id });
        }

        Show(data: Array<INoticeData>) {
            let self = this;
            if (!this.getIsCan()) { return; }
            self.setRuleList(data);
            let topLayer=kaayou.LayerSeq.getInstance().getTopLayer();
            if(topLayer=="NoticePanel") this.setVisible(true);
            else this.setVisible(false);
            kaayou.pop.showAni({
                cNode: this.node.getChildByName("contentPanel"),
                mNode: this.node.getChildByName("maskbg"),
                action: function () {
                }
            });
        }

        Hide() {
            kaayou.pop.hideAni(
                {
                    cNode: this.node.getChildByName("contentPanel"),
                    mNode: this.node.getChildByName("maskbg"),
                    rnode: this,
                    action: function () {
                        kaayou.LayerSeq.getInstance().closeTopLayer();
                    }
                }
            )
        }
    }
}