namespace kaayou {

    /**
    * PullListEvent / PullList 相关事件
    * 
    */
    export class PullListEvent extends kaayou.Event {

        /**下拉中*/
        public static HeadIng: string = "HeadIng";

        /**下拉将要完成*/
        public static HeadDidFinish: string = "HeadDidFinish";

        /**下拉完成*/
        public static HeadFinish: string = "HeadFinish";


        /**下拉取消*/
        public static HeadCancel: string = "HeadCancel";

        /**上拉中*/
        public static FootIng: string = "FootIng";

        /**上拉将要完成*/
        public static FootDidFinish: string = "FootDidFinish";

        /**上拉完成*/
        public static FootFinish: string = "FootFinish";

        /**上拉取消*/
        public static FootCancel: string = "FootCancel";

        /**刷新完成*/
        public static Refreshed: string = "Refreshed";

        public constructor(type: string, data?: any) {
            super(type, data);
        }
    }
}


namespace common {
    export interface IPullListSlot extends ccui.IWidget {
        setString(str: string);
    }

    export interface IPullListCell extends ccui.IWidget {
        setInfo(...agrs);
        setIndex(index: number);
        getIndex(): number;

    }

    export interface IPullLisAdpter {
        pool?: Array<IPullListCell>
        datas: Array<any>
        getCell(): IPullListCell;
    }


    export class PullList extends kaayou.Block {

        scview: ccui.ScrollView;
        constructor() {
            super();
        }
        _debugRect = false;
        _spacingY = 0;
        setSpacingY(spacing: number) {
            this._spacingY = spacing
        }
        _EnabledBar = true;
        setEnabledBar(b) {
            this._EnabledBar = b;
            this.scview.setScrollBarEnabled(this._EnabledBar);
        }
        initWithNode(node: cc.Node) {
            let parent = node.getParent();
            if (!parent) {
                throw "parent is null";
            }
            this.__ranger = { min: 0, max: 0 };

            //copy attr
            this.setZOrder(node.getZOrder());
            this.setPosition(node.getPosition());
            this.setContentSize(node.getContentSize());
            this.setAnchorPoint(node.getAnchorPoint());
            this.setName(node.getName());
            this.setTag(node.getTag());
            parent.addChild(this, node.getZOrder());
            // this.setParent(parent);
            this.node = this;
            node.removeFromParent();
            this.setEnabled(true);
            this.setTouchEnabled(true);
            this.addScrollView();
            return this;
        }

        addScrollView() {
            let sc = new ccui.ScrollView();
            sc.setAnchorPoint(0.5, 0.5)
            sc.setContentSize(this.getContentSize().width, this.getContentSize().height);
            sc.setDirection(ccui.ScrollView.DIR_VERTICAL);
            sc.setInnerContainerSize(this.getContentSize());
            sc.setPosition(this.getContentSize().width / 2, this.getContentSize().height / 2);
            sc.setBounceEnabled(true);
            sc.setClippingEnabled(true);
            sc.setScrollBarEnabled(this._EnabledBar);
            this.addChild(sc);
            this.scview = sc;
        }

        addTouchMask() {
            let p = new ccui.Layout();
            p.setBackGroundColor(cc.color("#ffffff"));
            if (this._debugRect) {
                p.setBackGroundColorType(1);
                p.setBackGroundColorOpacity(125)
            }
            p.setAnchorPoint(0.5, 0.5);
            p.setPosition(this.getContentSize().width / 2, this.getContentSize().height / 2);
            p.setContentSize(this.getContentSize());
            this.addChild(p);
            // this.addProtectedChild(p, 999, 103);
            var touch = cc.EventListener.create({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches: false,
                onTouchBegan: (touch: cc.Touch, event: cc.EventTouch) => {
                    var target = event.getCurrentTarget();
                    return this.checkTouchInvalid(target, touch);
                },
                onTouchEnded: (touch: cc.Touch, event: cc.EventTouch) => {
                    this.onScrollTouchEnd();
                    return true;
                },
                onTouchMoved: (touch: cc.Touch, event: cc.EventTouch) => {
                    // this.onScrollTouchEnd();
                    return true;
                },
                onTouchCancelled: (touch: cc.Touch, event: cc.EventTouch) => {
                    this.onScrollTouchEnd();
                    return true;
                },
            });

            cc.eventManager.addListener(touch, p);
            this.pmask = p;
        }

        dispatchEvent(evtype) {
            let e = kaayou.Event.create(kaayou.PullListEvent, evtype)
            e.currentTarget = e.target = this;
            this.dispatch(e);

            if (this.headSlot) {
                e = kaayou.Event.create(kaayou.PullListEvent, evtype)
                e.currentTarget = e.target = this;
                this.headSlot.dispatch(e);
            }

            if (this.footSlot) {
                e = kaayou.Event.create(kaayou.PullListEvent, evtype)
                e.currentTarget = e.target = this;
                this.footSlot.dispatch(e);
            }
        }
        _offtop = 0;
        _offfoot = 0;
        _uped = false;
        _uping = false;
        _downed = false;
        _downing = false;
        _adpter: IPullLisAdpter = null;

        setAdpter(adpter: IPullLisAdpter) {
            this._adpter = adpter;
        }

        getAdpter() {
            return this._adpter;
        }
        getCell(): IPullListCell {
            let adpter = this.getAdpter();
            if (adpter == null) {
                return null;
            }
            if (!adpter.pool) {
                adpter.pool = [];
            }
            let c = adpter.getCell();
            c.setAnchorPoint(0.5, 1);
            c.setPositionX(this.scview.getContentSize().width / 2);
            c.setPositionY(this.scview.getContentSize().height);
            adpter.pool.push(c);
            return c;
        }
        getCells() {
            let adpter = this.getAdpter();
            if (adpter == null) {
                return null;
            }
            if (!adpter.pool) {
                adpter.pool = [];
            }
            return adpter.pool;
        }
        _needPull = true;
        initPullEnv(needpl: boolean = true) {
            this._needPull = needpl;
            this.scview.addEventListener((scroll: ccui.ScrollView, eType) => {

                // ccui.ScrollView.EVENT_SCROLL_TO_TOP = 0;
                // ccui.ScrollView.EVENT_SCROLL_TO_BOTTOM = 1;
                // ccui.ScrollView.EVENT_SCROLL_TO_LEFT = 2;
                // ccui.ScrollView.EVENT_SCROLL_TO_RIGHT = 3;
                // ccui.ScrollView.EVENT_SCROLLING = 4;
                // ccui.ScrollView.EVENT_BOUNCE_TOP = 5;
                // ccui.ScrollView.EVENT_BOUNCE_BOTTOM = 6;
                // ccui.ScrollView.EVENT_BOUNCE_LEFT = 7;
                // ccui.ScrollView.EVENT_BOUNCE_RIGHT = 8;
                // ccui.ScrollView.EVENT_CONTAINER_MOVED = 9;
                // ccui.ScrollView.EVENT_AUTOSCROLL_ENDED = 10;

                switch (eType) {
                    case 4: ///ccui.ScrollView.EVENT_SCROLLING 
                        this.onScrolling(scroll);
                        break;
                    case 9: // ccui.ScrollView.EVENT_CONTAINER_MOVED
                        this.onContainerMove(scroll);
                        break;
                    case 10:

                        break;
                    default:
                        break;
                }
            });
            if (this._needPull) {
                this.addTouchMask();
                this.addHeadSolt();
                this.addFootSolt();
            }

            this._prepareCells();
        }
        _cellHeight = 0;
        _preCellLen = 0;
        _viewlen = 0;
        _offlen = 0;
        protected _prepareCells() {
            if (this.getAdpter() == null) {
                return;
            }
            this.scview.setInnerContainerSize(this.scview.getContentSize());

            if (this._cellHeight < 1) {
                let c = this.getCell();
                this._cellHeight = c.getContentSize().height;
                if (this._cellHeight == 0) { return }
            }
            if (this._cellHeight == 0) { return }


            if (this._preCellLen < 1) {
                this._preCellLen = Math.ceil(this.getContentSize().height / (this._cellHeight + this._spacingY));
            }
            this._offlen = 2;
            this._viewlen = this._preCellLen;
            this._preCellLen += this._offlen * 2;
            this._nonius = this._viewlen;
            this._lastnonius = -1;
            for (var i = 0; i < this._preCellLen - 1; i++) {
                let c = this.getCell();
            }
            this._normalizingCellPosition();
            // lodash.forEach(this.getCells(), (c: IPullListCell) => {
            //     c.setIndex(-1);
            //     // c.setVisible(false);
            // })

        }

        protected _normalizingCellPosition() {
            let { min, max } = this.getRange();
            lodash.forEach(this.getCells(), (c: IPullListCell, i: number) => {
                if (!c.getParent()) {
                    this.scview.addChild(<any>c);
                }
                c.setIndex(min + i);
                this.setCellPosition(c);
            });
        }
        getScrollView(): ccui.ScrollView {
            return this.scview;
        }

        onScrolling(sc: ccui.ScrollView) {
            if (!this._needPull) { return; }
            this.headSlot && this.headSlot.setVisible(this._uping);
            this.footSlot && this.footSlot.setVisible(this._downing);

            if (this._offtop < -1 * this.getHeadOffset()) {
                this._uped = true;
                this._uping = true;
                this.headSlot && this.headSlot.setString(this.getHeadDidFinishText());
                this.dispatchEvent(kaayou.PullListEvent.HeadDidFinish);
            } else if (this._offtop < 0) {
                this._uped = false;
                this._uping = true;
                this.headSlot && this.headSlot.setString(this.getHeadDoingText());
                this.dispatchEvent(kaayou.PullListEvent.HeadIng);
            } else {
                this._uped = false;
                this._uping = false;
            }

            if (this._offfoot < 0) {
                this._downed = false;
                this._downing = false;
            } else if (this._offfoot < this.getFootOffset()) {
                this._downed = false;
                this._downing = true;
                this.footSlot && this.footSlot.setString(this.getFootDoingText());
                this.dispatchEvent(kaayou.PullListEvent.FootIng);
            } else {
                this._downed = true;
                this._downing = true;
                this.footSlot && this.footSlot.setString(this.getFootDidFinishText());
                this.dispatchEvent(kaayou.PullListEvent.FootDidFinish);
            }
        }
        _headDoingText = "";
        setHeadDoingText(text: string) {
            this._headDoingText = text;
        }
        getHeadDoingText(): string {
            return this._headDoingText || "下拉刷新";
        }

        _headDidFinishText = "";
        setHeadDidFinishText(text: string) {
            this._headDidFinishText = text;
        }
        getHeadDidFinishText(): string {
            return this._headDidFinishText || "松开刷新";
        }

        _headFinishText = "";
        setHeadFinishText(text: string) {
            this._headFinishText = text;
        }
        getHeadFinishText(): string {
            return this._headFinishText || "正在刷新";
        }

        _footDoingText = "";
        setFootDoingText(text: string) {
            this._footDoingText = text;
        }
        getFootDoingText(): string {
            return this._footDoingText || "上拉加载";
        }

        _footDidFinishText = "";
        setFootDidFinishText(text: string) {
            this._footDidFinishText = text;
        }
        getFootDidFinishText(): string {
            return this._footDidFinishText || "松开加载";
        }

        _footFinishText = "";
        setFootFinishText(text: string) {
            this._footFinishText = text;
        }
        getFootFinishText(): string {
            return this._footFinishText || "正在加载";
        }

        _pheadoffset = 0;
        getHeadOffset(): number {
            if (!this._pheadoffset && this.headSlot) {
                return this.headSlot.getContentSize().height > 36 ? this.headSlot.getContentSize().height : 50;
            } else {
                return this._pheadoffset || 50;
            }
        }
        setHeadOffset(b: number) {
            return this._pheadoffset = b;
        }

        _pheadholdoffset = 0;
        getHeadHoldOffset(): number {
            if (!this._pheadholdoffset && this.headSlot) {
                return this.headSlot.getContentSize().height > 36 ? this.headSlot.getContentSize().height : 50;
            } else {
                return this._pheadholdoffset || 0;
            }
        }

        setHeadHoldOffset(b: number): number {
            return this._pheadholdoffset = b;
        }

        _pfootoffset = 0;
        getFootOffset(): number {
            if (!this._pfootoffset && this.footSlot) {
                return this.footSlot.getContentSize().height > 36 ? this.footSlot.getContentSize().height : 50;
            } else {
                return this._pfootoffset || 50;
            }
        }

        setFootOffset(b: number): number {
            return this._pfootoffset = b;
        }

        _pfootholdoffset = 0;
        getFootHoldOffset(): number {
            if (!this._pfootholdoffset && this.footSlot) {
                return this.footSlot.getContentSize().height > 36 ? this.footSlot.getContentSize().height : 50;
            } else {
                return this._pfootholdoffset || 0;
            }
        }
        setFootHoldOffset(b: number): number {
            return this._pfootholdoffset = b;
        }

        headSlot: IPullListSlot = null;
        footSlot: IPullListSlot = null;
        setHeadSolt(v: IPullListSlot) {
            this.headSlot = v;
        }
        getHeadSolt(): IPullListSlot {
            if (this.headSlot) {
                return this.headSlot;
            }
            let l = new ccui.Text("heiti", "SimHei", 26);
            l.setTextColor(cc.color("#Aed7fb"));
            l.setTextHorizontalAlignment(1);
            return l;
        }
        setFootSolt(v: IPullListSlot) {
            this.footSlot = v;
        }
        getFootSolt(): IPullListSlot {
            if (this.footSlot) {
                return this.footSlot;
            }
            let l = new ccui.Text("heiti", "SimHei", 26);
            l.setTextColor(cc.color("#Aed7fb"));
            l.setTextHorizontalAlignment(1);
            return l;
        }
        addHeadSolt() {
            this.headSlot = null;
            let l = this.getHeadSolt();
            if (!l) { return; }
            l.setAnchorPoint(0.5, 0);
            l.setPosition(this.scview.getContentSize().width / 2, this.scview.getContentSize().height);
            this.headSlot = l;
            this.scview.addProtectedChild(l, 100, 10);
        }

        addFootSolt() {
            this.footSlot = null;
            let l = this.getFootSolt();
            if (!l) { return; }
            l.setAnchorPoint(0.5, 1);
            l.setPosition(this.scview.getContentSize().width / 2, 0);
            this.footSlot = l;
            this.scview.addProtectedChild(l, 101, 10);
        }




        setScrollToOffsetTop(top) {
            this.scview.stopAutoScroll();
            let offsetY = top + (this.scview.getLayoutSize().height - this.scview.getInnerContainerSize().height);
            this.scview.setInnerContainerPosition(cc.p(0, offsetY))
            this._updateChangeInnerOffset();
        }

        _clearPullState() {
            this._uped = false;
            this._uping = false;
            this._downed = false;
            this._downing = false;
        }
        setScrollDisable(b) {
            this.scview.setEnabled(b);
            this._setScrollBaI(b);
        }
        private _setScrollBaI(b) {
            if (b) {
                if (this._EnabledBar && b) {
                    setTimeout(() => {
                        this.scview.setScrollBarEnabled(this._EnabledBar && b);
                    }, 1000);
                }
            } else {
                this.scview.setScrollBarEnabled(b);
            }

            this.scview.setBounceEnabled(b);
            this.scview.setInertiaScrollEnabled(b);
        }

        _doWaitRef = false;
        onScrollTouchEnd() {
            this._updateScrolling = false;
            if (this._uped) {
                if (this._doWaitRef == true) {
                    return;
                }
                this._updateScrolling = true;
                console.log("upde");
                this._downed = false;
                this._downing = false;
                this._doWaitRef = true;

                this.setScrollDisable(false);
                this.setScrollToOffsetTop(-1 * this.getHeadHoldOffset());
                this.headSlot && this.headSlot.setString(this.getHeadFinishText());
                this.dispatchEvent(kaayou.PullListEvent.HeadFinish);
            } else if (this._uping) {
                this._clearPullState();
                this.dispatchEvent(kaayou.PullListEvent.HeadCancel);
            } else if (this._downed) {
                if (this._doWaitRef == true) {
                    return;
                }
                this._updateScrolling = true;
                this._uped = false;
                this._uping = false;
                this._updateScrolling = true;
                this.setScrollDisable(false);
                this.setScrollToOffsetTop(this.scview.getInnerContainerSize().height - this.scview.getLayoutSize().height + this.getFootHoldOffset());
                this.footSlot && this.footSlot.setString(this.getFootFinishText());
                this.dispatchEvent(kaayou.PullListEvent.FootFinish);
            } else if (this._downing) {
                this._clearPullState();
                this.dispatchEvent(kaayou.PullListEvent.FootCancel);
            }
        }
        _updateScrolling = false;
        refresh() {
            this.scview.setScrollBarEnabled(false);
            let uped = this._uped;
            let downed = this._downed;
            this._clearPullState();
            this._setScrollBaI(false);
            this._updateScrolling = false;
            if (uped) {

                this._updateScrolling = true;
                this.scview.scrollToTop(0.3, true);
                setTimeout(() => {
                    this._doWaitRef = false;
                    this._updateScrolling = false;
                    this._nonius = this._viewlen;
                    this._lastnonius = this._nonius;
                    this.__ranger.max = this._nonius + this._offlen;
                    this.__ranger.min = this._nonius - this._viewlen - this._offlen;
                    this._refreshWithData();
                }, 310);
            } else if (downed) {
                this._updateScrolling = true;
                // this.scview.scrollToBottom(0.3, true)
                setTimeout(() => {
                    this._doWaitRef = false;
                    this._updateScrolling = false;
                    this._refreshWithData();
                }, 310);
            } else {
                this._doWaitRef = false;
                this._refreshWithData();
            }
        }


        protected _refreshWithData() {
            //lw200610datas可能为null
            let len=0;
            if(this.getAdpter().datas) len = this.getAdpter().datas.length;
            if (this._nonius > len) {
                this._nonius = this._viewlen;
            }
            let top = this.scview.getInnerOffSetTop();
            this.scview.setInnerContainerSize(cc.size(this.getContentSize().width, len * (this._cellHeight + this._spacingY)));
            top = Math.min(this.scview.getInnerContainerSize().height - this.scview.getContentSize().height, top);
            top = Math.max(0, top);
            this.setScrollToOffsetTop(top);

            this._doRefreshOffsetForce(); // 强制刷一下上下关系
            this.dispatchEvent(kaayou.PullListEvent.Refreshed);
            setTimeout(() => {
                this.setScrollDisable(true);
            }, 200);

        }
        protected _doRefreshOffsetForce() {
            this._updateChangeInnerOffset();
            this._normalizingCellPosition();
            this._doUpdateCellByIndex();
        }

        __ranger: { min: number, max: number } = null
        getRange() {
            if (this._lastnonius !== this._nonius && this._updateScrolling == false) {
                this.__ranger.max = this._nonius + this._offlen;
                this.__ranger.min = this._nonius - this._viewlen - this._offlen;
            }
            return this.__ranger;
        }

        protected _doUpdateCellByIndex() {
            if (!this.getAdpter()) { return; }
            let datas = this.getAdpter().datas;
            let len = datas ? datas.length : 0;
            lodash.forEach(this.getCells(), (c: IPullListCell, i: number) => {
                let idx = c.getIndex();
                if (!datas) {
                    c.setInfo(null);
                } else if (idx < 0 || idx >= len) {
                    c.setInfo(null);
                } else {
                    c.setInfo(datas[idx]);
                }
            });
            //排序一下子
            // this.getCells().sort(function (a, b) {
            //     return a.getIndex() - b.getIndex();
            // });
            // let range = this.getRange();
            // console.log(range);
            // if (range.min < 0) { return; }
            // if (range.max < 1) { return; }
        }

        onContainerMove(sc: ccui.ScrollView) {
            this._updateChangeInnerOffset();
            if (this._needPull) {
                this.headSlot && this.headSlot.setPositionY(sc.getContentSize().height + this._offtop);
                this.footSlot && this.footSlot.setPositionY(this._offfoot);
            }
            let top = this.scview.getInnerContainerPosition().y - (this.scview.getLayoutSize().height - this.scview.getInnerContainerSize().height);
            this.scview.getInnerContainerPosition().y = top + (this.scview.getLayoutSize().height - this.scview.getInnerContainerSize().height);
            this.onChangeCellPositions();
        }
        _updateChangeInnerOffset() {
            this._offtop = this.scview.getInnerOffSetTop()
            this._offfoot = this.scview.getInnerContainerPosition().y;
        }
        pmask: ccui.Layout = null;
        setVisible(b) {
            // this.setVisible(b)
            ccui.Widget.prototype.setVisible.call(this, b);
            this.pmask && this.pmask.setVisible(b)
        }

        _nonius = 0;//游标
        _lastnonius = -1;//上次的游标

        onChangeCellPositions() {
            if (this._viewlen < 1) { return; }
            this._nonius = Math.max(0, Math.floor(this._offtop / (this._cellHeight + this._spacingY)) + this._viewlen);
            if (this._lastnonius !== this._nonius && this._updateScrolling == false) {

                let { min, max } = this.getRange();

                if (min < 0 - this._offlen - 1) {
                    return;
                }
                if (max > this.getAdpter().datas.length + 2) {
                    return;
                }


                let a = new Array(this._preCellLen);
                lodash.fill(a, 0);
                let recycleArr = new Array(this._preCellLen);
                let recycleOff = 0;

                let cells = this.getCells();
                for (var i = 0; i < cells.length; i++) {
                    let idx = cells[i].getIndex();
                    let index = idx - min;
                    if (index < 0 || index > this._preCellLen - 1) {
                        recycleArr[recycleOff++] = cells[i];
                    } else {
                        if (a[index] == 0) {
                            a[index] = 1;
                        } else {
                            recycleArr[recycleOff++] = cells[i];
                        }
                    }
                }
                let temprecycleOff = 0;
                for (var i = 0; i < a.length; i++) {
                    if (a[i] == 0) {
                        if (temprecycleOff >= recycleOff) { return; }
                        let cell = recycleArr[temprecycleOff++];
                        cell.setIndex(i + min);
                        this.setCellPosition(cell);
                    }
                }
                this._doUpdateCellByIndex();
            }
            this._lastnonius = this._nonius;
        }


        setCellPosition(cell: IPullListCell) {
            let spacingY = this._spacingY;
            let allHeight = this.scview.getInnerContainerSize().height;

            let top = 0;
            let left = 0;
            let row = cell.getIndex();
            let column = 0;
            let y = allHeight - row * spacingY - row * cell.height - ((1.0 - cell.getAnchorPoint().y) * cell.height)
            cell.setPositionY(y - top);
            let maxCount = 0;
            if (this.getAdpter() && this.getAdpter().datas) {
                maxCount = this.getAdpter().datas.length;
            }
            cell.setVisible(!(cell.getIndex() < 0) && !(cell.getIndex() >= maxCount));
        }


        checkTouchInvalid(target, touch) {
            if (false == this.isTureVisible()) { return false; }
            var locationInNode = target.convertToNodeSpace(touch.getLocation());
            var s = target.getContentSize();
            var rect = cc.rect(0, 0, s.width, s.height);
            return cc.rectContainsPoint(rect, locationInNode);
        }
        isTureVisible(bParentReleated = false) {

            if (!bParentReleated) {
                return this.isVisible();
            }
            let pWidget = <cc.Node>this;
            if (this.isVisible() == true) {
                while (pWidget) {
                    if (pWidget.isVisible() != true) {
                        return false;
                    }
                    pWidget = pWidget.getParent();
                }
            }
            return this.isVisible();
        }

    }
}