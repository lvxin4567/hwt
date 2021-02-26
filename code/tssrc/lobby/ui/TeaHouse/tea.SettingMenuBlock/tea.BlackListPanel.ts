namespace tea {
    var { BindEvent, doBindEvent } = kaayou._decorator;
    interface FloorInfo {
        appid: string;
        hot: number;
        id: number;
        imgUrl: string;
        ioskey: string;
        nameAdd: string;
        num: number;
        numAdd: number
        price: number;
        productName: string
        type: number;
    }
    class BlackLisPanelCell extends kaayou.Block {
        constructor() {
            super();
        }

        label_id: ccui.Text = null;
        label_time: ccui.Text = null;
        label_name: ccui.Text = null;

        btn_remove: ccui.Button = null;
        btn_exit: ccui.Button = null;
        head_image:ccui.ImageView = null;
        initWithNode(node: ccui.Widget) {
            super.initWithNode(node);
            let self = this;
            this.label_id = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_id");
            this.label_time = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_time");
            this.label_name = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_name");

            this.btn_remove = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_remove");
            this.btn_exit = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_exit");
            this.head_image = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "sp_head");
            this.btn_remove.on(kaayou.TouchEvent.TouchEnd, function () {
                if (lodash.isEmpty(self._data)) { return; }
                let msg = "是否将该玩家移出黑名单?";
                var suceessCall = function () {
                    kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                    kaayou.emit("tea", 'mod::TeaHouse::Member::DeleteToBlackList', { hid: tea.mod.__teaHouseInfo.hid, uid: self._data.uid });
                }
                let options = {
                    title: "",
                    msg: msg,
                    close: {
                        isShow: false,
                        action: null,
                    },
                    btns: [
                        {
                            name: "确定",
                            action: suceessCall,
                            colorType: 'green'
                        },
                        {
                            name: "取消",
                            action: function () {
                                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                            }.bind(self),
                            colorType: 'blue'
                        }
                    ]
                }
                kaayou.emit("common", "ui::Dialog::Show", options);
            }, this);

        }

        _data: Data_HouseMemberItem = null;
        setInfo(data: Data_HouseMemberItem) {
            this._data = data;
            if (lodash.isEmpty(data)) {
                this.label_name.setString("");
                this.label_id.setString("");
                this.label_time.setString("");
                this.btn_remove.setVisible(false);
                return;
            }
            this.label_name.setString(kaayou.Identify.nickNameSubSix(this._data.uname));
            this.label_id.setString("ID:" + this._data.uid);
            this.label_time.setString("加入:" + new Date(this._data.ujointime * 1000).format('yyyy-MM-dd'));
            this.btn_remove.setVisible(!!(this._data.ruleMask & HouseMemberRole.BLACK));
            //this.btn_remove.setVisible(!!(this._data.ruleMask & HouseRoleTable.EDIT_MEMBER_REMOVE));
            NetImage.setPlayerHead(this.head_image, this._data.uurl, this._data.ugender, (url) => {
                if (!this._data) { return false; }
                if (url !== this._data.uurl) {
                    return false;
                }
                return true;
            });
        }

        doUpdate() {

        }

        unuse() {
            this._data = null;
            this.removeFromParent();
        }

    }




    export class tea_BlackPanelMgr {
        static __INS__: tea_BlackPanelMgr = null;
        static getInstance(_zOrder:number) {
            if (tea_BlackPanelMgr.__INS__ == null) {
                tea_BlackPanelMgr.__INS__ = new tea_BlackPanelMgr();
                tea_BlackPanelMgr.__INS__.init();
                tea_BlackPanelMgr.__INS__._zOrder = _zOrder;
            }
            return tea_BlackPanelMgr.__INS__;
        }
        __selfPanel: BlackListPanel = null;
        _zOrder = 0;
        init() {
            let self = this;
            this.__selfPanel = null;
            // @BindEvent("tea", 'ui::Member::UpdateBlackList')
            // @BindEvent("tea",'ui::TeaHouse::Member::DeleteToBlackList')
            // @BindEvent("tea", 'ui::BlackList::Show')
            // @BindEvent("tea", 'ui::BlackList::Hide')

            kaayou.getController('tea').on('ui::Member::UpdateBlackList', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).onUpdateBlackList(e.data);
            }, this, 10);

            kaayou.getController('tea').on('ui::TeaHouse::Member::DeleteToBlackList', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).doRenderRemoveFromBlackList(e.data);
            }, this, 10);

            kaayou.getController('tea').on('ui::BlackList::Show', function (e: kaayou.Event) {
                if (kaayou.UIManager.getInstance().getCurRuningSceneName() != "TEAHOUSE") return;
                self.getPanel(true).Show();
            }, this, 10);
            kaayou.getController('tea').on('ui::BlackList::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new BlackListPanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel,this._zOrder);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }

    }

    export class BlackListPanel extends kaayou.ModelLayer {
        btnSearch: ccui.Button = null;
        ebName: any = null;
        ndName: cc.Layer = null;
        tea_cell_black_mode: ccui.Layout = null;

        edx_Tel: ccui.TextField = null;
        constructor() {
            super();
            this.initUI();
        }
        btn_close: ccui.Button = null;
        @doBindEvent
        initUI() {
            let self = this;
            this.isTouchMaskHide = false;
            this.initWithccs(tea.res.BlackListPanel_json);
            this.ndName = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "NameInput");
            this.edx_Tel = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "edx_Tel");

            let sp = new cc["Scale9Sprite"]();
            sp.initWithFile(common.res.alpha_4x4, cc.rect(0, 0, 0, 0), cc.rect(0, 0, 0, 0));
            let eb: cc.Node = cc["EditBox"].create(this.ndName.getContentSize(), sp);
            this.ebName = eb;
            eb.setAnchorPoint(0, 0);
            eb.setPosition(0, 0);
            eb.setOpacity(0);
            eb['setFontSize'](25);
            eb['setFontColor'](cc.color("#485D65"));
            eb['setInputMode'](6);
            eb['setMaxLength'](10);

            eb['setDelegate'](
                {
                    /**
                     * This method is called when an edit box gains focus after keyboard is shown.
                     * @param {cc.EditBox} sender
                     */
                    editBoxEditingDidBegin: function (sender) {
                        //console.log('editBoxEditingDidBegin');

                    },

                    /**
                     * This method is called when an edit box loses focus after keyboard is hidden.
                     * @param {cc.EditBox} sender
                     */
                    editBoxEditingDidEnd: function (ref) {
                        //console.log('editBoxEditingDidEnd',sender.getString());
                        let gstr = ref.getString();

                    },

                    /**
                     * This method is called when the edit box text was changed.
                     * @param {cc.EditBox} sender
                     * @param {String} text
                     */
                    editBoxTextChanged: function (sender, text) {
                        //console.log('editBoxTextChanged');
                        //self.lbName.setString(text);
                    },

                    /**
                     * This method is called when the return button was pressed.
                     * @param {cc.EditBox} sender
                     */
                    editBoxReturn: function (sender) {
                        //console.log('editBoxReturn',sender.getString());
                    }
                }
            )
            this.ndName.addChild(eb);

            this.btn_close = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_close");
            this.btn_close.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.Hide();
            }, this);
            this.tea_cell_black_mode = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "tea_cell_black_mode");
            this.btnSearch = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_search");
            this.btnSearch.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                self.doGetBlackList(true, self.ebName.getString() || '');
                // kaayou.emit('mod::Audio::Sound', "Btn::Default");
            }, this);



            this.initLeftMenu();
            this.initRightPages();
            this.tea_cell_black_mode.setVisible(false);
            this.Hide();
        }
        menuGroup: common.RadioGroup = null;
        blackMenuGroup: ccui.ScrollView = null;
        initLeftMenu() {
            let self = this;
            //初始化左侧菜单
            this.blackMenuGroup = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "sv_list");
            this.blackMenuGroup.setPadding({ spacingY: 10 });
            this.blackMenuGroup.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Vertical);
            this.blackMenuGroup.setVertical(ccui.Layout.LayoutVertical.TOP);
            this.blackMenuGroup.setScrollBarEnabled(false);


            this.blackMenuGroup.addEventListener(function (scroll: ccui.ScrollView, e) {
                if (1 == e && !scroll['needUpdate']) {
                    scroll['needUpdate'] = true;
                    self.doGetBlackList(false, "");
                }
            }.bind(this));
        }
        blackPageGroup: ccui.Layout = null;
        edx_uid: ccui.Text = null;
        btn_add_black: ccui.Button = null;
        scroll_blacklist: ccui.ScrollView = null;

        initRightPages() {
            let self = this;
            //初始化左侧菜单
            this.blackPageGroup = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "pageGroup");
        }

        doGetBlackList(clear: boolean = true, search: string = "") {
            if (clear) {
                kaayou.pool.putAllChildrenInPool(this.blackMenuGroup);
                this.blackMenuGroup.scrollToTop(0, false);
            }
            kaayou.emit("tea", 'mod::Member::GetBlackList', { param: search, clear: clear });
            this.edx_Tel.string = '';
        }

        private createCell(): BlackLisPanelCell {
            let cell = kaayou.pool.getFromPool(BlackLisPanelCell);
            if (!cell) {
                cell = new BlackLisPanelCell();
                cell.initWithNode(this.tea_cell_black_mode);
            }

            cell.setAnchorPoint(0, 0);
            cell.setPositionY(0);
            cell.setPositionX(0);
            cell.setVisible(true);
            return cell;
        }
        // @BindEvent("tea", 'ui::Member::UpdateBlackList')
        onUpdateBlackList(data: { list: Array<any>, update: boolean }) {

            if (lodash.isEmpty(data)) { return; }
            let __selfScroll = this.blackMenuGroup;
            var offset = __selfScroll.getInnerOffSetTop() || 0;
            __selfScroll['needUpdate'] = false;
            if (!data.update) {
                return;
            }
            kaayou.pool.putAllChildrenInPool(__selfScroll);
            let items = data.list || [];
            //this.label_none_apply.setVisible(lodash.isEmpty(items));
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

        // @BindEvent("tea",'ui::TeaHouse::Member::DeleteToBlackList')
        doRenderRemoveFromBlackList(data: { uid: number }) {
            for (var x in this.blackMenuGroup.children) {
                var p = this.blackMenuGroup.children[x];
                //if(data.uid == p['_uid'])
                {
                    p.removeFromParent(true);
                }
            }
        }

        // @BindEvent("tea", 'ui::BlackList::Show')
        Show() {
            this.setVisible(true);
            this.blackMenuGroup.setVisible(false);
            var self = this;
            self.doGetBlackList();
            kaayou.pop.showAni({
                cNode: this.node.getChildByName("contentPanel"),
                mNode: this.node.getChildByName("maskbg"),
                action: function () {
                    self.blackMenuGroup.setVisible(true);
                }
            });

        }

        Hide() {
            //lw190716退出时清空搜索框
            this.ebName.setString("");
            kaayou.pool.putAllChildrenInPool(this.blackMenuGroup);
            this.blackMenuGroup.scrollToTop(0, false);
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