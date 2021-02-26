namespace tea {
    var { BindEvent, doBindEvent } = kaayou._decorator;

    export class TeaJoinPanelMgr {
        static __INS__: TeaJoinPanelMgr = null;
        static getInstance(_zOrder: number = 0) {
            if (TeaJoinPanelMgr.__INS__ == null) {
                TeaJoinPanelMgr.__INS__ = new TeaJoinPanelMgr();
                TeaJoinPanelMgr.__INS__.init();
                TeaJoinPanelMgr.__INS__._zOrder = _zOrder;
            }
            return TeaJoinPanelMgr.__INS__;
        }
        __selfPanel: JoinPanel = null;
        public _zOrder = 0;
        init() {
            let self = this;
            // self.__parent = parent;
            this.__selfPanel = null;

            kaayou.getController('tea').on('ui::Join::Clear', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).clear();
            }, this, 10);

            kaayou.getController('tea').on('ui::Join::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show();
            }, this, 10);
            kaayou.getController('tea').on('ui::Join::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new JoinPanel();
                // this.__parent.addChild(this.__selfPanel);
                // ccui.helper.doLayout(this.__parent);
                console.log(this._zOrder);
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel, this._zOrder);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();

            }
            return this.__selfPanel;
        }

    }
    export class JoinPanel extends kaayou.Layer {
        lable_Nums: Array<ccui.TextBMFont> = null;
        _curNums: string = "";
        constructor() {
            super();
            this.initWithccs(tea.res.JoinPanel_json, true);
            this.initUI();
        }
        btn_close: ccui.Button = null;
        //  @doBindEvent
        initUI() {

            let self = this;
            this.lable_Nums = [];
            this.btn_close = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_close");
            var NumBtnPanel = ccui.helper.seekWidgetByName<ccui.Widget>(<ccui.Widget>this.node, "NumBtnPanel");

            for (var i = 0; i < 10; i++) {
                let btn = ccui.helper.seekWidgetByName<ccui.Button>(<ccui.Widget>NumBtnPanel, "btn" + i);
                // this.btn_Nums.push()      ; 
                btn['_index'] = i;
                btn.on(kaayou.TouchEvent.TouchEnd, this.onNumsClick, this);
            }
            let btnreset = ccui.helper.seekWidgetByName<ccui.Button>(<ccui.Widget>NumBtnPanel, 'btnreset');
            btnreset.on(kaayou.TouchEvent.TouchEnd, this.onResetClick, this);

            let btndelete = ccui.helper.seekWidgetByName<ccui.Button>(<ccui.Widget>NumBtnPanel, 'btndelete');
            btndelete.on(kaayou.TouchEvent.TouchEnd, this.onDeleteClick, this);

            var nums_block = ccui.helper.seekWidgetByName<ccui.Widget>(<ccui.Widget>this.node, "nums_block");

            for (var i = 0; i < 6; i++) {
                let labe = ccui.helper.seekWidgetByName<ccui.TextBMFont>(<ccui.Widget>nums_block, "tag_num_" + i);
                this.lable_Nums.push(labe);
            }

            this.btn_close.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.Hide();
            }, this);

            this.Hide();
        }


        onResetClick(e: kaayou.TouchEvent) {
            kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
            console.log('reset');
            this._curNums = '';
            this.doNumShow();
        }
        onDeleteClick(e: kaayou.TouchEvent) {
            kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
            console.log('onDeleteClick');
            this.subNums();
        }
        onNumsClick(e: kaayou.TouchEvent) {
            kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
            let num = e.target['_index'] || 0;
            this.addNums(num)
        }

        addNums(nums: number) {
            if (this._curNums.length > 5) {
                return;
            }
            this._curNums += nums;
            this.doNumShow();
        }
        subNums() {
            if (this._curNums.length < 1) {
                return;
            }
            this._curNums = this._curNums.substr(0, this._curNums.length - 1);
            this.doNumShow();
        }


        doNumShow() {
            let curNums = this._curNums.split('');
            for (var i = 0; i < 6; i++) {
                if (i < curNums.length) {
                    this.lable_Nums[i].setString(curNums[i]);
                } else {
                    this.lable_Nums[i].string = '';
                }
            }
            if (curNums.length == 6) {
                console.log(this._curNums);
                kaayou.emit("tea", "mod::TeaHouse::JoinHouse", { hid: lodash.toInteger(this._curNums) });
            }
        }

        bindEvent() { }


        //@BindEvent("tea", 'ui::Join::Clear')
        clear() {
            this._curNums = '';
            this.doNumShow();
        }


        //@BindEvent("tea", 'ui::Join::Show')
        Show() {
            this.clear();
            this.setVisible(true);
            kaayou.pop.showAni({
                cNode: this.node.getChildByName("contentPanel"),
                mNode: this.node.getChildByName("maskbg")
            });
        }
        // @BindEvent("tea", 'ui::Join::Hide')
        Hide() {
            this.clear();
            // this.setVisible(false);
            kaayou.pop.hideAni(
                {
                    cNode: this.node.getChildByName("contentPanel"),
                    mNode: this.node.getChildByName("maskbg"),
                    rnode: this
                }
            )
        }

    }

    export class TeaPartnerMgr {
        static __INS__: TeaPartnerMgr = null;
        static getInstance(parent: cc.Node) {
            if (TeaPartnerMgr.__INS__ == null) {
                TeaPartnerMgr.__INS__ = new TeaPartnerMgr();
                TeaPartnerMgr.__INS__.init(parent);
            }
            return TeaPartnerMgr.__INS__;
        }
        __selfPanel: PartnerPanel = null;
        __parent: cc.Node = null;
        init(parent: cc.Node) {
            let self = this;
            self.__parent = parent;
            this.__selfPanel = null;

            kaayou.getController('tea').on('ui::Partner::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show(e.data);
            }, this, 10);
            kaayou.getController('tea').on('ui::Partner::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new PartnerPanel();
                this.__parent.addChild(this.__selfPanel);
                ccui.helper.doLayout(this.__parent);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }

    }

    export class PartnerPanel extends kaayou.Layer {

        btn_close: ccui.Button = null;
        btn_copy: ccui.Button = null;
        label_Wechat: ccui.Text = null;
        constructor() {
            super();
            this.initUI();
        }
        initUI() {
            var self = this;
            this.initWithccs(tea.res.PartnerTip_Json, true);
            //closeBtn
            this.btn_close = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "closeBtn");
            this.btn_close.on(kaayou.TouchEvent.TouchEnd, function () {
                self.Hide();
            }, this);
            this.btn_copy = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_copy");
            this.btn_copy.on(kaayou.TouchEvent.TouchEnd, function () {
                console.log("--------copy-------")
                if (kaayou.PlatformMgr.getInstance().sys.copyStringToPasteBoard(self.label_Wechat.string) == "1") {
                    kaayou.PlatformMgr.getInstance().sys.jumpWeChatImmediacy();
                }
            }, this);
            this.label_Wechat = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_wechat");
        }

        __succeed_call: Function = null;
        Show(data: { csNum: string }) {

            if (!!data.csNum) {
                this.label_Wechat.string = data.csNum;
            } else {
                let configData = common.mod.Config.GetAppConfig().kfinfo;
                if (configData) {
                    if (configData.kf && configData.kf.length > 0) {
                        this.label_Wechat.string = configData.kf[0].wx;
                    }
                }
            }
            this.setVisible(true);
            kaayou.pop.showAni({
                cNode: this.node.getChildByName("contentPanel"),
                mNode: this.node.getChildByName("maskbg")
            });
        }

        Hide() {
            // this.setVisible(false);
            kaayou.pop.hideAni(
                {
                    cNode: this.node.getChildByName("contentPanel"),
                    mNode: this.node.getChildByName("maskbg"),
                    rnode: this
                }
            )
        }
    }

    export class TeaCreatePanelMgr {
        static __INS__: TeaCreatePanelMgr = null;
        static getInstance(parent: cc.Node) {
            if (TeaCreatePanelMgr.__INS__ == null) {
                TeaCreatePanelMgr.__INS__ = new TeaCreatePanelMgr();
                TeaCreatePanelMgr.__INS__.init(parent);
            }
            return TeaCreatePanelMgr.__INS__;
        }
        __selfPanel: CreatePanel = null;
        __parent: cc.Node = null;
        init(parent: cc.Node) {
            let self = this;
            self.__parent = parent;
            this.__selfPanel = null;

            kaayou.getController('tea').on('ui::Create::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show(e.data);
            }, this, 10);
            kaayou.getController('tea').on('ui::Create::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new CreatePanel();
                this.__parent.addChild(this.__selfPanel);
                ccui.helper.doLayout(this.__parent);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }

    }

    export class CreatePanel extends kaayou.Layer {

        btn_close: ccui.Button = null;
        btn_ok: ccui.Button = null;
        tea_edit: any = null;
        constructor() {
            super();
            this.initUI();
        }
        //  @doBindEvent
        initUI() {

            this.initWithccs(tea.res.CreatePanel_json, true);
            let self = this;

            this.btn_close = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_close");
            this.btn_close.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.Hide();
            }, this);
            //this.edt_teaname = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "edt_teaname");
            //this.teaname_label = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "teaLabel");
            this.btn_ok = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_ok");
            this.btn_ok.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                //let hname = self.edt_teaname.getString();//
                let hname = this.tea_edit.getString();
                if (lodash.isEmpty(hname)) {
                    kaayou.emit('common', 'ui::Toast::Show', { msg: "亲友圈名字不能为空！" });
                    return;
                }

                if (!kaayou.Identify.isChorAbcorNum(hname)) {
                    kaayou.emit("common", "ui::Toast::Show", { msg: "亲友圈名称不能包含特殊符号！" })
                    return;
                }

                if (kaayou.blackList.checkBlackList(hname) != hname) {
                    kaayou.emit("common", "ui::Toast::Show", { msg: "亲友圈名称违规，请重新输入" });
                    return;
                }

                kaayou.emit("tea", "mod::TeaHouse::Create", { hname: hname, hnotify: "" });

            }, this);
            let attr = {
                "fontSize": 26,
                "fontColor": "#B97D55",
                "setInputMode": 6,
                "setMaxLength": 8,
                "setPlaceholderFontSize": 26,
            };
            this.tea_edit = kaayou.editBox.attachTextEdit(this.node, "edt_teaname", "请输入亲友圈名称");
            this.Hide();
        }

        __succeed_call: Function = null;
        //@BindEvent('tea', 'ui::Create::Show')
        Show(data: { onSucceed: Function }) {
            //this.edt_teaname.setString('');
            //this.teaname_label.setString("");
            this.tea_edit.setString("");
            this.__succeed_call = data.onSucceed || null;
            this.setVisible(true);
            kaayou.pop.showAni({
                cNode: this.node.getChildByName("contentPanel"),
                mNode: this.node.getChildByName("maskbg")
            });
        }

        //@BindEvent('tea', 'ui::Create::Hide')
        Hide() {
            this.__succeed_call = null;
            //this.edt_teaname.setString('');
            //this.teaname_label.setString("");
            // this.setVisible(false);
            this.tea_edit.setString("");
            kaayou.pop.hideAni(
                {
                    cNode: this.node.getChildByName("contentPanel"),
                    mNode: this.node.getChildByName("maskbg"),
                    rnode: this
                }
            )
        }

    }

    class ViewPanelCell extends kaayou.Block {
        constructor() {
            super();
        }
        layout_head: ccui.Layout = null;
        label_house_id: ccui.Text = null;
        label_table_count: ccui.Text = null;
        label_house_name: ccui.Text = null;
        label_member_count: ccui.Text = null;
        floorBtnNode: ccui.Layout = null;
        floorImag: Array<ccui.Layout> = [];
        join_btn: ccui.Button = null
        initWithNode(node: ccui.Widget) {
            super.initWithNode(node);
            let self = this;
            this.layout_head = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "layout_head");
            this.label_house_id = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_house_id");
            this.label_table_count = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_table_count");
            this.label_house_name = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_house_name");
            this.label_member_count = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_member_count");
            let floorBtnNode: ccui.Layout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "floorArrBtn");
            this.join_btn = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "goqyq");
            this.node.on(kaayou.TouchEvent.TouchEnd, function () {
                if (!self._data) { return; }
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit("tea", "mod::TeaHouse::Enter", {
                    hid: self._data.hid, call: function () {
                        kaayou.emit("tea", 'ui::Show::Hide');
                    }
                });
            }, this);
            self.floorImag = [];
            lodash.forEach(floorBtnNode.getChildren(), function (v: ccui.Layout, i) {
                let floorImg = new cc.Sprite;
                v.tag = i;
                v.addChild(floorImg);
                self.floorImag.push(v);
                v.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.Event) {
                    kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                    let index = e.target.tag;
                    let fid = self._data.hfloorids[index];
                    kaayou.DataSet.set("clickFid", fid.toString());
                    kaayou.emit("tea", "mod::TeaHouse::Enter", {
                        hid: self._data.hid, call: function () {
                            kaayou.emit("tea", 'ui::Show::Hide');
                        }
                    });
                    console.log("--------------fid" + fid);
                }, this);
            });
            kaayou.getController('tea').on('ui::TeaHouse::HideHID', function (e: kaayou.Event) {
                if (!!e.data) {
                    if (e.data.hid == self._data.hid) {
                        this.label_house_id.setVisible(!e.data.ishidhide);
                    }
                }
            }, this, 10);
            kaayou.getController('tea').on('ui::TeaHouse::HideOnlineCount', function (e: kaayou.Event) {
                if (!!e.data) {
                    this.label_table_count.setString((e.data.onlinetable == -1) ? "" : e.data.onlinetable); //在线桌数
                    this.label_member_count.setString((e.data.onlinecur == -1) ? "" : e.data.onlinecur);//在线人数
                }
            }, this, 10);
        }

        doUpdate() {

        }

        _data: tea.Data_HouseItem = null;
        setInfo(data: tea.Data_HouseItem) {
            this._data = data || null;
            if (!this._data) { return; }
            let self = this;
            this.label_house_id.setVisible(!data.ishidhide);
            this.label_house_id.setString('ID：' + kaayou.Identify.addPreZero(data.hid, 6));
            this.label_table_count.setString((data.onlinetable == -1) ? "" : data.onlinetable.toString());
            this.label_house_name.setString('' + data.hname);
            this.label_member_count.setString((data.onlinecur == -1) ? "" : data.onlinecur.toString());
            for (let index = 0; index < self.floorImag.length; index++) {
                self.floorImag[index].setVisible(false);
                if (data.hfloorgameurl.length > index) {
                    (function (_i) {
                        let _layouts = self.floorImag[_i];
                        let sp = <cc.Sprite>_layouts.getChildren()[0];
                        // NetImage.loadImage(data.hfloorgameurl[_i]).then(function (tex: cc.Texture2D) {
                        //     if (!sp.isRunning() || !_layouts.isRunning()) { return; }
                        //     sp.initWithTexture(tex);
                        //     NetImage.doSpriteContentSizeAndPosition(sp, _layouts.getContentSize());
                        //     sp.setVisible(true);
                        //     _layouts.setVisible(true);
                        // });
                        sp.setVisible(true);
                        _layouts.setVisible(true);
                        let Gameurl = data.hfloorgameurl[_i]
                        NetImage.doLoadHeadImageWithLayout(1, Gameurl, sp, _layouts.getContentSize(), function () { }, (url) => {
                            if (url !== Gameurl) {
                                return false;
                            }
                            return true;
                        });
                    })(index);

                } else {

                }
            }
        }

        unuse() {
            this._data = null;
            this.removeFromParent();
        }
    }

    export class TeaViewPanelMgr {
        static __INS__: TeaViewPanelMgr = null;
        static getInstance(_zOrder: number = 0) {
            if (TeaViewPanelMgr.__INS__ == null) {
                TeaViewPanelMgr.__INS__ = new TeaViewPanelMgr();
                TeaViewPanelMgr.__INS__.init();
                TeaViewPanelMgr.__INS__._zOrder = _zOrder;
            }
            return TeaViewPanelMgr.__INS__;
        }
        public _zOrder = 0;
        __selfPanel: ViewPanel = null;

        init() {
            let self = this;
            this.__selfPanel = null;

            kaayou.getController('tea').on('ui::TeaHouse::UpdateList', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).onUpdateTeaList(e.data);
            }, this, 10);

            kaayou.getController('tea').on('ui::View::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show();
            }, this, 10);
            kaayou.getController('tea').on('ui::Show::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new ViewPanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel, this._zOrder);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }

    }

    export class ViewPanel extends kaayou.Layer {

        constructor() {
            super();
            this.initUI();
        }
        btnDescription: ccui.Button = null;
        topBarBack: ccui.Button = null
        btn_create: ccui.Button = null
        btn_join: ccui.Button = null
        btn_bind: ccui.Button = null;
        tea_cell_create_mode: ccui.Layout = null;
        scroll_tea: ccui.ScrollView = null;
        img_empty_tea: ccui.ImageView = null;
        //  @doBindEvent
        initUI() {
            let self = this;
            this.initWithccs(tea.res.ViewPanel_json, true);
            this.btnDescription = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btnDescription");
            this.btnDescription.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit('tea', 'ui::DescriptionPanel::Show');
            }, this);

            // this.topBar = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "topBar");
            this.topBarBack = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "back_btn");
            // this.topBarTitle = ccui.helper.seekWidgetByName(this.topBar, "topBar_title_label");
            // this.topBarTitle.setString("亲友圈");
            this.topBarBack.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.Hide();
            }, this);

            this.btn_bind = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_Bind");
            this.btn_bind.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit("lobby", "ui::lobbyBottomBindIDPanel::Show");
            }, this);


            this.btn_create = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_create");
            this.btn_create.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit("tea", "ui::teahouse::housepartner");
            }, this);
            this.btn_join = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_join");
            this.btn_join.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit('tea', 'ui::Join::Show');
            }, this);


            this.scroll_tea = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "scroll_tea");
            this.scroll_tea.setGrid(ccui.Layout.LayoutGrid_AxisDirection.HORIZONTAL);
            this.scroll_tea.setPadding({ spacingX: 30, left: 0, right: 0 });
            this.scroll_tea.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Horizontal);
            this.scroll_tea.setHorizontal(ccui.Layout.LayoutHorizontal.LEFT);
            this.scroll_tea.setScrollBarEnabled(false);



            this.img_empty_tea = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "img_empty_tea");

            this.tea_cell_create_mode = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "tea_cell_create_mode");
            this.tea_cell_create_mode.setVisible(false);

            TeaCreatePanelMgr.getInstance(this);
            TeaPartnerMgr.getInstance(this);
            this.Hide();
        }


        private createCell(): ViewPanelCell {
            let cell = kaayou.pool.getFromPool(ViewPanelCell);
            if (!cell) {
                cell = new ViewPanelCell();
            }
            cell.initWithNode(this.tea_cell_create_mode);
            // cell.setAnchorPoint(0.5, 0.5);
            // cell.setPositionY(0);
            // cell.setPositionX(this.scroll_tea.getContentSize().width / 2);
            cell.setVisible(true);
            return cell;
        }


        //  @BindEvent("tea", 'ui::TeaHouse::UpdateList')
        onUpdateTeaList(data: Array<tea.Data_HouseItem>) {
            if (!this.isVisible()) { return; }
            this.clear();
            this.img_empty_tea.setVisible(lodash.isEmpty(data));
            if (lodash.isEmpty(data)) { this.scroll_tea.doChildrenLayout(); return; }
            if (!data || data.length < 1) return;
            var width = 0;
            var cells = [];
            for (var x in data) {
                var cell = this.createCell();
                cell.setInfo(data[x]);
                width += cell.getContentSize().width;
                cells.push(cell);
            }
            this.scroll_tea.setVisible(true);
            width += (data.length - 1) * 30;

            if (data.length < 4) {
                this.scroll_tea.setContentSize(width, this.scroll_tea.getContentSize().height);
                this.scroll_tea.setPadding({ spacingX: 30, left: 0, right: 0 });
            } else {
                this.scroll_tea.setContentSize(cc.winSize.width, this.scroll_tea.getContentSize().height);
                this.scroll_tea.setPadding({ spacingX: 30, left: 100, right: 100 });
            }
            for (var x in cells) {
                this.scroll_tea.addChild(cells[x]);
            }
            this.scroll_tea.doChildrenLayout();
        }

        clear() {
            kaayou.pool.putAllChildrenInPool(this.scroll_tea);
        }

        //@BindEvent("tea", 'ui::View::Show')
        // @BindEvent("common", 'Config::Update')
        Show() {
            this.clear();
            this.setVisible(true);
            //获取列表
            kaayou.emit("tea", "mod::TeaHouse::doGetList");

        }

        // @BindEvent("tea", 'ui::Show::Hide')
        Hide() {
            this.setVisible(false);
        }
    }
}