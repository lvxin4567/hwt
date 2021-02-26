namespace common {
    const { BindEvent, doBindEvent } = kaayou._decorator;


    export class BaseTableViewCell extends kaayou.Block implements common.ICuttingScrollViewCell {

        constructor() {
            super();
            this.initUI();
        }
        _index: number = -1;
        label_no: ccui.Text = null;
        btn_detail: ccui.Button = null;
        img_lock: ccui.ImageView = null;
        head_layouts: ccui.Layout[] = null;
        initUI() {
            this.initWithccs();
            this.label_no = <ccui.Text>ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_no");
            this.img_lock = <ccui.ImageView>ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "img_lock");
            this.head_layouts = [];
            for (var i = 0; i < 4; i++) {
                this.head_layouts.push(<ccui.Layout>ccui.helper.seekWidgetByName(<ccui.Widget>this.node, `head_layout${i}`));
            }
        }
        initWithccs(path: string = '') {
            if (!lodash.isString(path) || lodash.isEmpty(path)) {
                path = common.res.TableListPanelCell4p_json;
            }
            super.initWithccs(path);
        }

        getIndex() {
            return this._index;
        }
        setIndex(i: number) {
            this._index = i;
            this.label_no.setString(`NO.${i}`);
        }
        _data: any
        setInfo(info: any) {

            this._data = info;

        }
    }


    export interface ICuttingScrollViewCell extends ccui.ILayout {
        initUI();
        getIndex();
        setIndex(i: number);
        setInfo(info: any);
    }

    export class TableListPanel extends kaayou.Layer {
        constructor() {
            super();
            this.initUI();
        }
        _cellClass: common.ICuttingScrollViewCellConstructor = null;
        _cuttingSV: common.CuttingScrollView = null;
        _cellColumn: number = 3;

        _maxcellCount: number = 100;

        _cellLayout:ICuttingScrollViewCell = null;

        setMaxcellCount(count: number) {
            this._maxcellCount = count;
        }
        getMaxcellCount() {
            return this._maxcellCount;
        }


        setCellColumn(column: number) {
            this._cellColumn = column;
        }
        getCellColumn() {
            return this._cellColumn;
        }
        setCellClass(cellClass: common.ICuttingScrollViewCellConstructor) {
            this._cellClass = cellClass;
        }
        getCellClass(): common.ICuttingScrollViewCellConstructor {
            return this._cellClass ;
        }
        _cuttingSVParent: cc.Node = null;
        initUI() {
            this.initWithccs();
            this._cuttingSVParent = this.node;
            this.initTableListView();
            this._cuttingSVParent.addChild(this._cuttingSV);
            this.afterTableListView();
        }
        initTableListView() {
            this._cuttingSV = new common.CuttingScrollView();
            let sv = <ccui.ScrollView>ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "tabaleListScrollView");
            this._cuttingSVParent = sv.getParent();
            this._cuttingSV.initUI(sv, this.getCellClass());
            this._cuttingSV.setPadding({ top: 10, bottom: 10, left: 50, right: 0, spacingX: 20, spacingY: 30 });
            this._cuttingSV.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Vertical);
            this._cuttingSV.setGridColumn(3);
            this._cuttingSV.initTables();
        }
        afterTableListView() {

        }

        changeMaxTable(tableNum:number,isClear:boolean){
            this.setMaxcellCount(tableNum);
            this.resetTabelList(isClear);
        }

        resetTabelList(isClear:boolean) {
            let p = this._cuttingSV._scrollView.getInnerOffSetLeft();
            this._cuttingSV.setCellClass(this.getCellClass());
            this._cuttingSV.setMaxCount(this.getMaxcellCount());
            this._cuttingSV.setGridColumn(this.getCellColumn());
            if (isClear) {
                console.log("true最大cell数量",this.getMaxcellCount());
                this._cuttingSV.initTables();
                return;
            }
            var offset = 0// this._cuttingSV._scrollView.getInnerOffSetLeft();
            try {
                console.log("false最大cell数量",this.getMaxcellCount());
                let columns = Math.ceil(this.getMaxcellCount() / this._cuttingSV._scrollView.getGridRow());
                let allWidth = columns * ((new this._cellClass()).getContentSize().width + this._cuttingSV._scrollView.getPadding().spacingX) -
                    this._cuttingSV._scrollView.getPadding().spacingX +
                    this._cuttingSV._scrollView.getPadding().left + this._cuttingSV.getPadding().right;
                if (allWidth - this._cuttingSV._scrollView.getContentSize().width < (new this._cellClass()).getContentSize().width / 2) {
                    allWidth = this._cuttingSV._scrollView.getContentSize().width;
                }
                
                offset = Math.min(-1 * Math.abs(Math.max(this._cuttingSV._scrollView.getInnerContainerSize().width - this._cuttingSV._scrollView.getLayoutSize().width) - p), 0);
                this._cuttingSV._scrollView.setInnerContainerSize(cc.size(allWidth, this._cuttingSV._scrollView.getContentSize().height));
    
                // if (((Math.abs(offset)+cc.winSize.width)>allWidth)) {
                //     this._cuttingSV._scrollView.scrollToRight(0,false);//
                //     return;
                // }
                offset = !!offset?offset:0;  //bugly报错。。。offset有可能是空的。
                this._cuttingSV._scrollView.setInnerContainerPosition(cc.p(offset, 0));
            } catch (error) {
                kaayou.PlatformMgr.getInstance().sys.PostBugly("setOffset" + kaayou.getLobbyVersion(), "resetTabelList", offset.toString())
            }
         
        }


        initWithccs(path: string = '', full: boolean = true) {
            if (!lodash.isString(path) || lodash.isEmpty(path)) {
                path = common.res.TableListPanel_json;
            }
            super.initWithccs(path, full);
        }
    }



    export abstract class GameTableListPanel extends common.TableListPanel {
        initWithccs(path: string = '') {
            if (!lodash.isString(path) || lodash.isEmpty(path)) {
                path = common.res.TableListPanel_json;
            }
            super.initWithccs(path);
        }
        topbarMgr: common.TopBarMgr;
        btn_quick: ccui.Button;
        setCellClass(cellClass: common.ICuttingScrollViewCellConstructor) {
            this._cellClass = cellClass;
        }
        getCellClass(): common.ICuttingScrollViewCellConstructor {
            return this._cellClass;
        }

        initTableListView() {
            this._cuttingSV = new common.CuttingScrollView();
            let sv = <ccui.ScrollView>ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "tabaleListScrollView");
            if (!this._cellClass) {
                return console.error("cellClass is null");
            }
            this._cuttingSVParent = sv.getParent();
            this._cuttingSV.initUI(sv, this.getCellClass());
            let pl = (cc.winSize.width - 1280) / 2;
            pl = pl > 1 ? pl : 0;
            this._cuttingSV.setPadding({ top: 10, bottom: 10, left: 50 + pl, right: 0, spacingX: 20, spacingY: 30 });
            this._cuttingSV.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Vertical);
            this._cuttingSV.setGridColumn(this.getCellColumn());
            this._cuttingSV.initTables();
            this._cuttingSV.on("Cutting_Scroll_Change", this.onCuttingScrollChange, this);
        }

        afterTableListView() {
            super.afterTableListView();
            this.btn_quick = <ccui.Button>ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_quick");
            {
                this.topbarMgr = new common.TopBarMgr(ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "top_bar"));
                this.topbarMgr.setBeanVisibel(false);
                this.topbarMgr.setGoldVisibel(false);
                this.topbarMgr.setCardVisibel(false);
                this.topbarMgr.doRightLayout();
            }
        }

        resetTabelList() {
            this._cuttingSV.setCellClass(this.getCellClass());
            this._cuttingSV.setMaxCount(this.getMaxcellCount());
            this._cuttingSV.setGridColumn(this.getCellColumn());
            this._cuttingSV.initTables();
        }


        _isBindEvent = false;
        bindUiEvents() {
            if (this._isBindEvent) { return console.error('多次绑定'); }
            this._isBindEvent = true;
            let self = this;
            do {
                if (!this.topbarMgr) { break; }
                this.topbarMgr.setOnCloseClick(function () {
                    kaayou.emit(this.getModuleName(), "Exit");
                }.bind(this));
            } while (0)

            do {
                if (!this.btn_quick) { break; }
                this.btn_quick.on(kaayou.TouchEvent.TouchEnd, function () {
                    kaayou.emit(this.getModuleName(), 'mod::User::doSiteTableIn', { tid: -1, seat: -1 });
                }, this);
            } while (0)

            kaayou.getController(this.getModuleName()).on('ui::TabelList::Show', function (e: kaayou.Event) {
                self.Show(e.data);
            }, this);

            kaayou.getController(this.getModuleName()).on('ui::TabelList::Hide', function (e: kaayou.Event) {
                self.Hide(e.data);
            }, this);

            kaayou.getController(this.getModuleName()).on('ui::TabelList::UpdateList', function (e: kaayou.Event) {
                self.onTabelUpdate(e.data);
            }, this);

            kaayou.getController(this.getModuleName()).on('ws::Msg::siteinfo', function (e: kaayou.Event) {
                self.onUpdateInfo(e.data);
            }, this, 10);

        }

        initUI() {
            this.__changeeventquene = [];
            super.initUI();
            this.bindUiEvents();
            this.setVisible(false);
            this.scheduleUpdate();
        }

        onUpdateInfo(info: common.mod.SiteInfo) {
            if (info.sit_mode != 1) { return; }
            this.setMaxcellCount(info.tablenum);
            this.resetTabelList();
        }
        __changeeventquene: Array<{ min: number, max: number }>;
        __willdoSend = false;
        onCuttingScrollChange(e: kaayou.CustomEvent) {
            if (!this.isVisible()) { return; }
            if (!e.data) { return; }
            if (!this._cuttingSV) { return console.error('cuttingSV is null'); }
            let range = this._cuttingSV.getRange();
            this.__changeeventquene.push(range);
            if (this.__changeeventquene.length > 10) {
                this.__changeeventquene.shift();
            }
            this.__willdoSend = true;
            // kaayou.emit(this.getModuleName(), 'mod::TabelList::GetUpdateList', { min: range.min, max: range.max });
        }
        __delayT = 0;
        update(dt) {
            this.__delayT += dt;
            if (this.__delayT > 0.5) {
                this.__delayT = 0;
                this.emitChangeEvent();
            }
        }
        emitChangeEvent() {
            if (this.__willdoSend == false) { return; }
            if (this.__changeeventquene.length < 1) { return; }
            let range = this.__changeeventquene[this.__changeeventquene.length - 1];
            kaayou.emit(this.getModuleName(), 'mod::TabelList::GetUpdateList', { min: range.min, max: range.max });
            this.__willdoSend = false;
        }
        // @BindEvent('', "ui::TabelList::UpdateList")
        onTabelUpdate(data: Array<any>) {
            let self = this;
            if (!this._cuttingSV) { return console.error('cuttingSV is null'); }
            lodash.forEach(this._cuttingSV.getCells(), function (v: common.ICuttingScrollViewCell) {
                v.setInfo(data[v.getIndex()] || null);
            });
        }

        // @BindEvent('', "ui::TabelList::Show")
        Show(data: { title: string }) {
            if (!this._cuttingSV) { return console.error('cuttingSV is null'); }
            data = data || { title: "" };
            this.topbarMgr.setTitle(data.title || "");
            kaayou.emit(this.getModuleName(), 'ui::TableListPlayer::Hide');
            let range = this._cuttingSV.getRange();
            kaayou.emit(this.getModuleName(), 'mod::TabelList::GetUpdateList', { min: range.min, max: range.max });
            if (!this.isVisible()) {
                kaayou.SoundManager.getInstance().pauseMusic();
            }
            this.setVisible(true);
        }
        // @BindEvent('', "ui::TabelList::Hide")
        Hide(data) {
            if (!this._cuttingSV) { return console.error('cuttingSV is null'); }
            kaayou.emit(this.getModuleName(), 'ui::TableListPlayer::Hide');
            kaayou.emit(this.getModuleName(), 'mod::TabelList::Sitelistout');
            if (this.isVisible()) {
                kaayou.SoundManager.getInstance().resumeMusic();
            }
            this.setVisible(false);
        }

    }




    export abstract class GameTableListPlayerPanel extends kaayou.ModelLayer {
        constructor() {
            super();
            this.initUI();
        }
        label_uid: ccui.Text = null;
        label_name: ccui.Text = null;
        label_score: ccui.Text = null;
        label_sex: ccui.Text = null;
        label_ip: ccui.Text = null;
        initWithccs(path: string = '') {
            if (!lodash.isString(path) || lodash.isEmpty(path)) {
                path = common.res.TableListPlayerPanel_json;
            }
            super.initWithccs(path);
        }
        initUI() {
            let self = this;
            this.initWithccs();
            this.label_uid = <ccui.Text>ccui.helper.seekWidgetByName(<ccui.Widget>this.node, `label_uid`);
            this.label_name = <ccui.Text>ccui.helper.seekWidgetByName(<ccui.Widget>this.node, `label_name`);
            this.label_score = <ccui.Text>ccui.helper.seekWidgetByName(<ccui.Widget>this.node, `label_score`);
            this.label_sex = <ccui.Text>ccui.helper.seekWidgetByName(<ccui.Widget>this.node, `label_sex`);
            this.label_ip = <ccui.Text>ccui.helper.seekWidgetByName(<ccui.Widget>this.node, `label_ip`);
            this.bindUIEvents();
            this.Hide();
        }
        _isBindEvent = false;
        bindUIEvents() {
            if (this._isBindEvent) { return console.error('多次绑定'); }
            this._isBindEvent = true;
            kaayou.getController(this.getModuleName()).on('ui::TableListPlayer::Show', function (e: kaayou.Event) {
                this.Show(e.data);
            }, this);

            kaayou.getController(this.getModuleName()).on('ui::TableListPlayer::Hide', function (e: kaayou.Event) {
                this.Hide(e.data);
            }, this);
        }
        Show(data: {
            player: {
                uid: number,
                name: string,
                imgurl: string,
                sex: number,
                ip: string,
                gold: number

            }
        }) {
            if (lodash.isNull(data)) { return; }
            if (lodash.isEmpty(data)) { return; }
            if (lodash.isNull(data.player)) { return; }
            if (lodash.isEmpty(data.player)) { return; }
            let player = data.player;
            if (this.label_uid)
                this.label_uid.setString("" + player.uid)
            if (this.label_name)
                this.label_name.setString("" + kaayou.Identify.nickNameSubFive(player.name))
            if (this.label_score)
                this.label_score.setString("" + kaayou.Identify.changeScoreToSortString(player.gold));
            if (this.label_sex)
                this.label_sex.setString("" + (player.sex == 1 ? "男" : "女"));
            if (this.label_ip)
                this.label_ip.setString("" + player.ip)
            this.setVisible(true);
        }

        // @BindEvent('', 'ui::TableListPlayer::Hide')
        Hide() {
            this.label_uid.setString("")
            this.label_name.setString("")
            this.label_score.setString("")
            this.label_sex.setString("");
            this.label_ip.setString("")
            this.setVisible(false);
        }

    }

    export class GameTableCell extends kaayou.Block implements common.ICuttingScrollViewCell {

        constructor() {
            super();
            this.initUI();
        }
        btn_detail: ccui.Button = null;
        _index: number = -1;
        label_no: ccui.Text = null;
        img_bg: ccui.ImageView = null;
        img_lock: ccui.ImageView = null;
        head_layouts: ccui.Layout[] = null;
        head_image_layouts: ccui.Layout[] = null;
        label_names: ccui.Text[] = null;
        label_scores: ccui.Text[] = null;
        _maxPlayerCpunt = 0;
        initWithccs(path: string = '') {
            if (!lodash.isString(path) || lodash.isEmpty(path)) {
                path = common.res.TableListPanelCell4p_json;
            }
            super.initWithccs(path);
        }
        setMaxPlayerCpunt(count: number) {
            this._maxPlayerCpunt = count;
        }
        getMaxPlayerCount() {
            return this._maxPlayerCpunt;
        }

        initUI() {
            this.initWithccs();

            let self = this;
            this.label_no = <ccui.Text>ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_no");
            this.img_lock = <ccui.ImageView>ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "img_lock");
            this.head_layouts = [];
            this.head_image_layouts = [];
            this.label_names = [];
            this.label_scores = [];
            for (var i = 0; i < this.getMaxPlayerCount(); i++) {
                let l = <ccui.Layout>ccui.helper.seekWidgetByName(<ccui.Widget>this.node, `head_layout${i}`);
                let c = <ccui.ImageView>ccui.helper.seekWidgetByName(<ccui.Widget>this.node, `chair${i}`);
                if (!l) { return console.error("not found player panel"); }
                if (!c) { return console.error("not found chair"); }
                l['index'] = i;
                c['index'] = i;
                let t = <ccui.Layout>c.getChildByName('touc');
                if (!t) { return console.error("not found chair touc"); }
                t['index'] = i;


                this.doBindTouchEvent(l, function (e) {
                    let index = e.target['index'];
                    if (lodash.isNull(self._data)) { return; }
                    if (lodash.isUndefined(self._data.person)) { return; }
                    if (lodash.isEmpty(self._data.person)) { return; }
                    // kaayou.emit(this.getModuleName(), 'ui::TableListPlayer::Show', { player: self._data.person[index] });
                }, this);


                this.doBindTouchEvent(t, function (e) {
                    let index = e.target['index'];
                    kaayou.emit(this.getModuleName(), 'mod::User::doSiteTableIn', { tid: self.getIndex(), seat: index });
                }, this);

                this.head_layouts.push(l);
                let l_img = <ccui.Layout>ccui.helper.seekWidgetByName(l, `head_img_layout`);
                let l_name = <ccui.Text>ccui.helper.seekWidgetByName(l, `label_name`);
                let l_score = <ccui.Text>ccui.helper.seekWidgetByName(l, `label_score`);
                this.head_image_layouts.push(l_img);
                this.label_names.push(l_name);
                this.label_scores.push(l_score);

            }
            this.img_bg = <ccui.ImageView>ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "img_bg");




            // this.doBindTouchEvent(this.img_bg, function (e) {
            //     kaayou.emit(this.getModuleName(), 'mod::User::doSiteTableIn', { tid: self.getIndex() });
            // }, this);
            this.setInfo(null);
        }
        _curTouchTarget = null;
        doBindTouchEvent(widget: ccui.Widget, callEndFunc: (e: kaayou.TouchEvent) => void, orTagert: any) {
            let self = this;
            widget.setSwallowTouches(false);
            widget['_isScrollTouchCancel'] = false;
            widget.on(kaayou.TouchEvent.TouchStart, function (e: kaayou.TouchEvent) {
                let tagert: ccui.Widget = e.target;
                if (self._curTouchTarget == null) {
                    self._curTouchTarget = tagert;
                }
                tagert['_isScrollTouchCancel'] = false;
            }, this);
            widget.on(kaayou.TouchEvent.TouchMove, function (e: kaayou.TouchEvent) {
                let tagert: ccui.Widget = e.target;
                if (self._curTouchTarget !== tagert) {
                    return;
                }
                if (tagert['_isScrollTouchCancel']) {
                    return false;
                }
                if (15 < Math.abs(tagert.getTouchBeganPosition().x - tagert.getTouchMovePosition().x)) {
                    tagert['_isScrollTouchCancel'] = true;
                    return;
                }
                if (15 < Math.abs(tagert.getTouchBeganPosition().y - tagert.getTouchMovePosition().y)) {
                    tagert['_isScrollTouchCancel'] = true;
                    return;
                }

            }, this);
            widget.on(kaayou.TouchEvent.TouchCance, function (e: kaayou.TouchEvent) {
                let tagert: ccui.Widget = e.target;
                if (self._curTouchTarget !== tagert) {
                    return;
                }
                tagert['_isScrollTouchCancel'] = false;
                self._curTouchTarget = null;
            }, this);
            widget.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                let tagert: ccui.Widget = e.target;
                if (self._curTouchTarget !== tagert) {
                    return;
                }
                if (!tagert['_isScrollTouchCancel']) {
                    callEndFunc.call(orTagert, e);
                }
                tagert['_isScrollTouchCancel'] = false;
                self._curTouchTarget = null;
            }, this);

        }



        getIndex() {
            return this._index;
        }
        setIndex(i: number) {
            this._index = i;
            this.label_no.setString(`NO.${i + 1}`);
        }
        _data: ITabelListItem;
        setInfo(info: ITabelListItem) {
            let self = this;
            if (info == null) {
                this._data = null;
                this.img_lock.setVisible(false);
                for (var x in this.head_layouts) {
                    this.head_layouts[x].setVisible(false);
                }
                return;
            }
            this._data = lodash.clone(info);
            let players = lodash.isUndefined(this._data.person) ? [] : this._data.person;

            for (var x in this.head_layouts) {
                if (players[x]) {
                    this.head_layouts[x].setVisible(true);
                    // this.head_image_layouts.push(l_img);
                    this.label_names[x].setString(kaayou.Identify.nickNameSubFive(players[x].name));
                    this.label_scores[x].setString(kaayou.Identify.changeScoreToSortString(players[x].gold));

                    let headImgSp: cc.Sprite = null;
                    if (this.head_image_layouts[x].getChildren().length < 1) {
                        headImgSp = new cc.Sprite();
                        headImgSp.setVisible(false);
                        this.head_image_layouts[x].addChild(headImgSp);
                    } else {
                        headImgSp = <cc.Sprite>this.head_image_layouts[x].getChildren()[0];
                        headImgSp.setVisible(false);
                    }
                    if (players[x].imgurl && !lodash.isEmpty(players[x].imgurl)) {
                        (function (sp, _layouts) {
                            if (!sp) { return; }
                            if (!_layouts) { return; }
                            NetImage.loadImage(players[x].imgurl).then(function (tex: cc.Texture2D) {
                                if (!sp.isRunning() || !_layouts.isRunning()) { return; }
                                sp.initWithTexture(tex);
                                NetImage.doSpriteContentSizeAndPosition(sp, _layouts.getContentSize());
                                sp.setVisible(true);
                            });
                        })(headImgSp, this.head_image_layouts[x]);
                    } else {
                        // cc.spriteFrameCache.getSpriteFrame(players[x].sex == 1 ? "nan.png":"nv.png");
                        headImgSp.initWithSpriteFrameName(players[x].sex == 1 ? "nan.png" : "nv.png");
                        NetImage.doSpriteContentSizeAndPosition(headImgSp, this.head_image_layouts[x].getContentSize());
                        headImgSp.setVisible(true);
                    }

                } else {
                    this.head_layouts[x].setVisible(false);
                }
            }


        }

    }

}