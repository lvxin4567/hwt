namespace tea {

    class ManagerPanelCell extends kaayou.Block {
        constructor() {
            super();
        }

        layout_head: ccui.Layout = null;
        label_house_id: ccui.Text = null;
        label_onwer_name: ccui.Text = null;
        label_house_name: ccui.Text = null;
        btn_enter: ccui.Button = null;
        btn_dismiss: ccui.Button = null;
        btn_exit: ccui.Button = null;
        image_head: ccui.ImageView = null;
        initWithNode(node: ccui.Widget) {
            super.initWithNode(node);
            this.layout_head = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "layout_head");
            this.label_house_id = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_house_id");
            this.label_onwer_name = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_onwer_name");
            this.label_house_name = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_house_name");
            this.btn_enter = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_enter");
            this.btn_dismiss = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_dismiss");
            this.btn_exit = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_exit");
            this.image_head = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "image_head");
            let self = this;

            let defaultoptions = {
                title: "",
                msg: "",
                close: {
                    isShow: false,
                    action: null,
                },
                btns: [
                    {
                        name: "确定",
                        action: null,
                        colorType: 'green'
                    },
                    {
                        name: "取消",
                        action: function () {
                            //return false;
                        },
                        colorType: 'blue'
                    }
                ]
            }

            this.btn_exit.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                if (lodash.isEmpty(self._data)) { return; }
                let options = lodash.cloneDeep(defaultoptions);
                options.msg = `是否退出亲友圈【${self._data.hid}】?`;
                options.btns[0].action = function () {
                    kaayou.emit("tea", "mod::TeaHouse::Exit", { hid: self._data.hid });
                }
                kaayou.emit("common", "ui::Dialog::Show", options);
            }, this);

            this.btn_dismiss.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                if (lodash.isEmpty(self._data)) { return; }
                let options = lodash.cloneDeep(defaultoptions);
                options.msg = `是否解散亲友圈【${self._data.hid}】?`;
                options.btns[0].action = function () {
                    kaayou.emit("tea", "mod::TeaHouse::Dismiss", { hid: self._data.hid });
                }
                kaayou.emit("common", "ui::Dialog::Show", options);
            }, this);

            this.btn_enter.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                if (lodash.isEmpty(self._data)) { return; }
                let options = lodash.cloneDeep(defaultoptions);
                options.msg = `是否进入【${self._data.hid}】亲友圈？`;
                options.btns[0].action = function () {
                    kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                    kaayou.emit("tea", "mod::TeaHouse::Enter", { hid: self._data.hid });
                }
                options.btns[1].action = function () {
                    kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                }
                kaayou.emit("common", "ui::Dialog::Show", options);
            }, this);

            //lw191220隐藏亲友圈号
            kaayou.getController('tea').on('ui::TeaHouse::HideHID', function (e: kaayou.Event) {
                if (!!e.data) {
                    if (e.data.hid == self._data.hid) {
                        self.label_house_id.setVisible(!e.data.ishidhide);
                    }
                }
            }, this, 10);
        }

        doUpdate() {

        }

        _data: Data_HouseItem_cell = null;
        setInfo(data: Data_HouseItem_cell) {
            this._data = null;
            if (lodash.isEmpty(data)) {
                this.layout_head.setVisible(false);
                this.label_house_id.setString("");
                this.label_onwer_name.setString("");
                this.label_house_name.setString("");
                this.btn_enter.setVisible(false);
                this.btn_dismiss.setVisible(false);
                this.btn_exit.setVisible(false);
                return
            }
            this._data = data;
            //lw191101隐藏头像
            this.layout_head.setVisible(false);
            this.label_house_id.setVisible(!data.ishidhide);
            this.label_house_id.setString("圈ID:" + data.hid);
            this.label_onwer_name.setString("圈主:" + kaayou.Identify.nickNameSubEight(data.ownername));
            this.label_house_name.setString("" + data.hname);
            this.btn_enter.setVisible(!data.iscur);
            this.btn_dismiss.setVisible(data.ismine);
            this.btn_exit.setVisible(!data.ismine);
            //NetImage.setPlayerHead(this.image_head, data.ownerurl)
        }

        unuse() {
            this._data = null;
            this.removeFromParent();
        }

    }

    export class SubMyTeaPage {
        scroll_Tea_mine: ccui.ScrollView = null; //我的
        scroll_Tea_Intrant: ccui.ScrollView = null; //我的
        _page: cc.Node = null;
        _index = -1;
        myTea_layout: ccui.Layout = null;
        myTea_Group: common.RadioGroup = null;
        myTeaNum: number = 0;
        cell_Mod: ccui.Widget = null;
        setIndex(index) {
            this._index = index;
            return this;
        }
        getIndex() {
            return this._index;
        }
        onSubpageChange(e: kaayou.Event) {
            let _data = e.data;
            let { index } = _data;
            if (index == this.getIndex()) {
                if (this._page.isVisible()) {

                } else {
                    this.reset();
                }
                this._page.setVisible(true);
            } else {
                this._page.setVisible(false);
            }
        }
        reset() {
            (<ccui.CheckBox>this.myTea_layout.getChildren()[0]).setRadioSelected();
        }
        //初始化成员列表页面
        initWidthNode(page: cc.Node, cellMod: ccui.Widget) {
            let self = this;
            this._page = page;
            this.cell_Mod = cellMod;
            let ctrName = "teaST"
            let subpageChangeEventName = "ui::Setting::SubpageChange";
            kaayou.getController(ctrName).on(subpageChangeEventName, this.onSubpageChange, this);


            this.scroll_Tea_mine = ccui.helper.seekWidgetByName(<ccui.Widget>this._page, "tea_Src_mine");
            this.scroll_Tea_mine.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Vertical);
            this.scroll_Tea_mine.setVertical(ccui.Layout.LayoutVertical.TOP);
            this.scroll_Tea_mine.setPadding({ spacingY: 5, left: 5 });
            this.scroll_Tea_mine.setScrollBarEnabled(false);


            this.scroll_Tea_Intrant = ccui.helper.seekWidgetByName(<ccui.Widget>this._page, "tea_Src_Intrant");
            this.scroll_Tea_Intrant.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Vertical);
            this.scroll_Tea_Intrant.setVertical(ccui.Layout.LayoutVertical.TOP);
            this.scroll_Tea_Intrant.setPadding({ spacingY: 5, left: 5 });
            this.scroll_Tea_Intrant.setScrollBarEnabled(false);
            //选择切换
            this.myTea_layout = ccui.helper.seekWidgetByName(<ccui.Widget>this._page, "myTea_layout");
            this.myTea_Group = new common.RadioGroup();
            lodash.forEach(this.myTea_layout.getChildren(), function (v: ccui.CheckBox, i) {
                v['index'] = i;
                v.on(kaayou.RadioEvent.SELECTED, function () {
                    // kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                    (<ccui.Text>(v.getChildByName("Text"))).setTextColor(cc.color("#FFF3C1"));
                    self.myTeaNum = i;
                    console.log(i);
                    if (i == 0) {
                        kaayou.emit("tea", "mod::TeaHouse::RefreshList");
                        self.scroll_Tea_mine.setVisible(true);
                        self.scroll_Tea_Intrant.setVisible(false); 
                    }else{
                        kaayou.emit("tea", "mod::TeaHouse::RefreshList");
                        self.scroll_Tea_mine.setVisible(false);
                        self.scroll_Tea_Intrant.setVisible(true);
                    }
                }, self);
                v.on(kaayou.RadioEvent.UNSELECTED, function () {
                    // kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                    (<ccui.Text>(v.getChildByName("Text"))).setTextColor(cc.color("#B1D5F8"));
                    console.log(i);
                }, self);
                self.myTea_Group.add(v);
            });

            kaayou.getController('tea').on('ui::TeaHouse::UpdateMine', function (e: kaayou.Event) {
                self.onUpdateMineTeaHouse(e.data);
            }, this, 10);

            kaayou.getController('tea').on('ui::TeaHouse::UpdateIntrant', function (e: kaayou.Event) {
                self.onUpdateIntrantTeaHouse(e.data);
            }, this, 10);

        }

          // @BindEvent("tea", 'ui::TeaHouse::UpdateMine')
          onUpdateMineTeaHouse(data: { list: Data_HouseMemberItem, update: boolean }) {

            if (lodash.isEmpty(data)) { return; }
            let __selfScroll = this.scroll_Tea_mine;
            var offset = __selfScroll.getInnerOffSetTop() || 0;
            __selfScroll['needUpdate'] = false;
            if (!data.update) {
                return;
            }
            kaayou.pool.putAllChildrenInPool(__selfScroll);
            let items = data.list || [];
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

        onUpdateIntrantTeaHouse(data: { list: Data_HouseMemberItem, update: boolean }) {

            if (lodash.isEmpty(data)) { return; }
            let __selfScroll = this.scroll_Tea_Intrant;
            var offset = __selfScroll.getInnerOffSetTop() || 0;
            __selfScroll['needUpdate'] = false;
            if (!data.update) {
                return;
            }
            kaayou.pool.putAllChildrenInPool(__selfScroll);
            let items = data.list || [];
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

        private createCell(): ManagerPanelCell {
            let cell = kaayou.pool.getFromPool(ManagerPanelCell);
            if (!cell) {
                cell = new ManagerPanelCell();
            }
            cell.initWithNode(this.cell_Mod);
            cell.setAnchorPoint(0, 0);
            cell.setPositionY(0);
            cell.setPositionX(10);
            cell.setVisible(true);
            return cell;
        }

    }
}