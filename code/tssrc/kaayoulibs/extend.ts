
/// <reference path="decorator.ts" />
/// <reference path="event.ts" />
/// <reference path="kaayou.ControllerManager.ts" />

namespace kaayou {


    var _global = typeof window === 'undefined' ? global : window;


    export function isDevBrowser() {
        if (cc.sys.isNative) {
            return false;
        }
        if (cc.sys.os == cc.sys.OS_ANDROID && !!_global['androidpipe']) {
            return false;
        } else if (cc.sys.os == cc.sys.OS_IOS && !!_global['iospipe']) {
            return false;
        } else if (cc.sys.os == cc.sys.OS_WINDOWS && !!_global['winpipe']) {
            return false;
        }
        return true;
    }


    export class DataSet {

        static set(key: string, value: string) {

            if (kaayou.isDevBrowser()) {
                _global.sessionStorage.setItem(key, value);
            } else if (cc.sys.isNative) {
                if (_global.kaayou_jsb && _global.kaayou_jsb.DataSet) {
                    return _global.kaayou_jsb.DataSet.set(key, value)
                }
            }
        }

        static get(key: string) {
            if (kaayou.isDevBrowser()) {
                return _global.sessionStorage.getItem(key) || null;
            } else if (cc.sys.isNative) {

                if (_global.kaayou_jsb && _global.kaayou_jsb.DataSet) {
                    return _global.kaayou_jsb.DataSet.get(key);
                }
            }
        }
    }


    export function cc_extend() {

        cc_Node_extend();
        cc_Layout_extend();
        cc_ScrollView_extend();
        cc_CheckBox_extend();
        // ccui_Button_extend();
        // ccui_Layout_extend();
        cc_Richtext_extend();
    }

    function cc_Node_extend() {
        let proto: any = cc.Node.prototype;
        proto.on = expend_event_addListener;
        proto.off = expend_event_removeListener;
        proto.dispatch = expend_event_dispatch;
        proto.emit = expend_event_dispatch;
        proto.has = expend_event_hasListener;
        proto.offBytarger = expend_event_offBytargerListener;
    }

    function cc_Layout_extend() {

        let proto: any = ccui.Layout.prototype;
        ccui.Layout.LayoutHorizontal = {
            LEFT: 0,
            RIGHT: 1
        };
        ccui.Layout.LayoutVertical = {
            TOP: 0,
            BOTTOM: 1
        };

        ccui.Layout.LayoutGrid_AxisDirection = {
            HORIZONTAL: 0,
            VERTICAL: 1
        };

        ccui.Layout.LayoutDirection = {
            Horizontal: 0,
            Vertical: 1,
            Grid: 2
        };

        proto._layoutHorizontal = ccui.Layout.LayoutHorizontal.LEFT;
        proto._layoutVertical = ccui.Layout.LayoutVertical.TOP;
        proto._layoutGridAxis = ccui.Layout.LayoutGrid_AxisDirection.HORIZONTAL;
        proto._childrenLayoutDirection = ccui.Layout.LayoutDirection.Horizontal;

        proto.setHorizontal = function (v: ccui.Layout.LayoutHorizontal) {
            this._layoutHorizontal = v;
        }
        proto.setVertical = function (v: ccui.Layout.LayoutVertical) {
            this._layoutVertical = v;
        }

        proto.setGrid = function (v: ccui.Layout.LayoutGrid_AxisDirection) {
            this._layoutGridAxis = v;
        }

        proto.setChildrenLayoutDirection = function (v: ccui.Layout.LayoutDirection) {
            this._childrenLayoutDirection = v;
        }
        proto.getChildrenLayoutDirection = function () {
            return this._childrenLayoutDirection;
        }



        proto._pinterest = false;
        proto._gridrow = 0;
        proto._gridcolumn = 0;
        proto._padding = null;
        proto.setPadding = function (data: ccui.ILayoutPadding) {
            this._padding = lodash.extend({
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                spacingY: 0,
                spacingX: 0
            }, this._padding, data);
        }
        proto.setGridRow = function (row: number = 0) {
            this._gridrow = row;
        }
        proto.getGridRow = function () {
            return this._gridrow;
        }
        //瀑布流布局
        proto.setPinterest = function (b: boolean = false) {
            this._pinterest = b;
        }
        proto.setGridColumn = function (column: number = 0) {
            this._gridcolumn = column;
        }
        proto.getGridColumn = function () {
            return this._gridcolumn;
        }

        proto.getPadding = function () {
            if (this._padding) {
                return this._padding;
            }

            return {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                spacingY: 0,
                spacingX: 0
            };
        }

        proto.doChildrenLayout = function () {
            if (this._childrenLayoutDirection == ccui.Layout.LayoutDirection.Horizontal) {
                this._doHorizontalChildrenLayout();
            } else if (this._childrenLayoutDirection == ccui.Layout.LayoutDirection.Vertical) {
                this._doVerticalChildrenLayout();
            } else if (this._childrenLayoutDirection == ccui.Layout.LayoutDirection.Grid) {
                this._doGridChildrenLayout();
            }
        }
        proto._doChildrenLayoutContentSize = function (c: cc.Size) {
            this.setContentSize(c);
        }
        proto._doChildrenCompareHeight = function (c: number) {
            if (c < 0) { return 0; }
            return c;
        }
        proto._doChildrenCompareWidth = function (c: number) {
            if (c < 0) { return 0; }
            return c;
        }
        proto._doVerticalChildrenLayout = function () {
            var vertical = this._layoutVertical;
            var children: Array<cc.Node> = this.getChildren();
            var offset = 0;
            var allHeight = 0;
            let padding = this.getPadding();
            var spacingY = padding.spacingY;
            var top = padding.top;
            var bottom = padding.bottom;
            offset += top;
            for (var x in children) {
                var subWidget = children[x];
                if (!(subWidget.isVisible())) { continue; }
                allHeight += children[x].getBoundingBox().height + spacingY;
            }
            allHeight -= spacingY;
            allHeight += top + bottom;
            allHeight = this._doChildrenCompareHeight(allHeight);
            this._doChildrenLayoutContentSize(cc.size(this.getContentSize().width, allHeight));

            for (var x in children) {
                var subWidget = children[x];
                if (!(subWidget.isVisible())) { continue; }
                var ap = subWidget.getAnchorPoint();
                var cs = subWidget.getBoundingBox();
                var finalPosY = ap.y * cs.height;
                switch (vertical) {
                    case ccui.Layout.LayoutVertical.TOP:
                        finalPosY = allHeight - offset - ((1.0 - ap.y) * cs.height);

                        break;
                    case ccui.Layout.LayoutVertical.BOTTOM:
                        finalPosY += offset;
                        break;
                    default:
                        break;
                }
                offset += cs.height + spacingY;
                subWidget.setPositionY(finalPosY);
            }
        }

        proto._doHorizontalChildrenLayout = function () {

            var horizontal = this._layoutHorizontal;
            var children: Array<cc.Node> = this.getChildren();
            var offset = 0;
            var allwidth = 0;
            let padding = this.getPadding();
            var spacingX = padding.spacingX;;
            var left = padding.left;;
            var right = padding.right;;
            offset += left;
            for (var x in children) {
                var subWidget = children[x];
                if (!(subWidget.isVisible())) { continue; }
                allwidth += children[x].getBoundingBox().width + spacingX;
            }
            allwidth -= spacingX;
            allwidth += right + left;
            allwidth = this._doChildrenCompareWidth(allwidth);

            this._doChildrenLayoutContentSize(cc.size(allwidth, this.getContentSize().height));

            for (var x in children) {
                var subWidget = children[x];
                if (!(subWidget.isVisible())) { continue; }
                var ap = subWidget.getAnchorPoint();
                var cs = subWidget.getBoundingBox();
                var finalPosX = ap.x * cs.width;
                switch (horizontal) {
                    case ccui.Layout.LayoutHorizontal.LEFT:
                        finalPosX += offset;
                        break;
                    case ccui.Layout.LayoutHorizontal.RIGHT:
                        finalPosX = allwidth - offset - ((1.0 - ap.x) * cs.width);
                        break;
                    default:
                        break;
                }
                offset += cs.width + spacingX;
                subWidget.setPositionX(finalPosX);
            }
        }


        proto._doGridChildrenLayout = function () {
            if (!this._pinterest) {

            }
            var _grid = this._layoutGridAxis;
            if (this._gridrow == 0 && this._gridcolumn == 0) { return; }

            let maxRow = 0;
            let maxColumn = 0;
            let allcellCount = this.getChildren().length;
            if (allcellCount < 1) { return; }
            if (_grid == ccui.Layout.LayoutGrid_AxisDirection.HORIZONTAL) {
                if (this._gridcolumn < 1) { return; }
                //计算最大行数
                maxColumn = this._gridcolumn;
                maxRow = Math.ceil(allcellCount / this._gridcolumn);
            } else if (_grid == ccui.Layout.LayoutGrid_AxisDirection.VERTICAL) {
                if (this._gridcolumn < 1) { return; }
                //计算最大列数
                maxColumn = Math.ceil(allcellCount / this._gridcolumn);
                maxRow = this._gridrow;
            }
            if (maxColumn < 1 && maxRow < 1) { return; }

            var children: Array<cc.Node> = lodash.clone(this.getChildren());
            var offsetX = 0;
            var offsetY = 0;
            let allwidth = 0;
            let allHeight = 0;
            let padding = this.getPadding();
            var spacingX = padding.spacingX;
            var spacingY = padding.spacingY;
            var left = padding.left;
            var right = padding.right;
            var top = padding.top;
            var bottom = padding.bottom;



            let curRow = 0;
            let offH = 0;
            let offW = 0;
            if (_grid == ccui.Layout.LayoutGrid_AxisDirection.HORIZONTAL) {
                let ti = 0;
                for (var x in children) {
                    var subWidget = children[x];
                    let rc = children[x].getBoundingBox();
                    offH = Math.max(offH, rc.height);
                    if (!(subWidget.isVisible())) { continue; }

                    offW += rc.width + spacingX;
                    allwidth = Math.max(allwidth, offW);
                    ti++ 
                    if ((ti% maxColumn) == 1) {
                        allHeight += offH + spacingY;
                        offH = 0;
                        offW = 0;
                    }

                }
                // allHeight += offH;
                allwidth -= spacingX;
            } else if (_grid == ccui.Layout.LayoutGrid_AxisDirection.VERTICAL) {
                let ti = 0;
                for (var x in children) {
                    var subWidget = children[x];
                    let rc = children[x].getBoundingBox();
                    offW = Math.max(offW, rc.width);
                    if (!(subWidget.isVisible())) { continue; }
                    offH += rc.height + spacingY;
                    allHeight = Math.max(allHeight, offH);
                    if (ti++ % maxRow == maxRow - 1) {
                        allwidth += offW + spacingX;
                        offW = 0;
                        offH = 0;
                    }
                }
                allwidth += offW;
                allHeight -= spacingY;
            }

            allwidth = this._doChildrenCompareWidth(allwidth + left + right);
            allHeight = this._doChildrenCompareHeight(allHeight + top + bottom);
            this._doChildrenLayoutContentSize(cc.size(allwidth, allHeight));

            // allwidth = 0 ;
            // allHeight = 0;
            var vertical = this._layoutVertical;
            var horizontal = this._layoutHorizontal;

            offH = 0;
            offW = 0;

            if (_grid == ccui.Layout.LayoutGrid_AxisDirection.HORIZONTAL) {
                offsetX = offW = (horizontal == ccui.Layout.LayoutHorizontal.LEFT ? left : right);
                offsetY = (vertical == ccui.Layout.LayoutVertical.TOP ? top : bottom)
                let ti = 0;
                for (var x in children) {
                    var subWidget = children[x];
                    if (!(subWidget.isVisible())) { continue; }
                    let rc = subWidget.getBoundingBox();
                    var ap = subWidget.getAnchorPoint();
                    // var cs = subWidget.getBoundingBox();
                    var finalPosX = ap.x * rc.width;
                    var finalPosY = ap.y * rc.height;
                    // finalPosX += offW;
                    if (vertical == ccui.Layout.LayoutVertical.TOP) {
                        finalPosY = allHeight - offsetY - ((1.0 - ap.y) * rc.height);
                    } else {
                        finalPosY = finalPosY + offsetY;
                    }

                    if (horizontal == ccui.Layout.LayoutHorizontal.LEFT) {
                        finalPosX = finalPosX + offsetX;
                    } else {
                        finalPosX = allwidth - offsetX - ((1.0 - ap.x) * rc.width);
                    }

                    subWidget.setPosition(finalPosX, finalPosY);
                    offH = Math.max(offH, rc.height);
                    offW += rc.width + spacingX;
                    // finalPosY = allHeight - offset - ((1.0 - ap.y) * cs.height);
                    // subWidget.setPositionY(finalPosY +offH );
                    if (ti++ % maxColumn == maxColumn - 1) {
                        // allwidth = Math.max(allwidth, offW);
                        offsetY += offH + spacingY;
                        offH = 0;;
                        offW = (horizontal == ccui.Layout.LayoutHorizontal.LEFT ? left : right);
                    }
                    offsetX = offW;
                }
            } else if (_grid == ccui.Layout.LayoutGrid_AxisDirection.VERTICAL) {
                offsetX = (horizontal == ccui.Layout.LayoutHorizontal.LEFT ? left : right);
                offsetY = offH = (vertical == ccui.Layout.LayoutVertical.TOP ? top : bottom)
                let ti = 0;
                for (var x in children) {
                    var subWidget = children[x];
                    if (!(subWidget.isVisible())) { continue; }
                    let rc = children[x].getBoundingBox();
                    var ap = subWidget.getAnchorPoint();

                    var finalPosX = ap.x * rc.width;
                    var finalPosY = ap.y * rc.height;

                    if (vertical == ccui.Layout.LayoutVertical.TOP) {
                        finalPosY = allHeight - offsetY - ((1.0 - ap.y) * rc.height);
                    } else {
                        finalPosY = finalPosY + offsetY;
                    }

                    if (horizontal == ccui.Layout.LayoutHorizontal.LEFT) {
                        finalPosX = finalPosX + offsetX;
                    } else {
                        finalPosX = allwidth - offsetX - ((1.0 - ap.x) * rc.width);
                    }

                    subWidget.setPosition(finalPosX, finalPosY);
                    offW = Math.max(offW, rc.width);
                    offH += rc.height + spacingY;

                    if (ti++ % maxRow == maxRow - 1) {
                        offsetX += offW + spacingX;
                        offW = 0;
                        offH = (vertical == ccui.Layout.LayoutVertical.TOP ? top : bottom);
                    }
                    offsetY = offH;
                }
            }



            // for (var x in children) {
            //     var subWidget = children[x];
            //     if (!(subWidget.isVisible())) { continue; }
            //     allwidth += children[x].getBoundingBox().width + spacingX;
            // }
            // allwidth -= spacingX;
            // allwidth += right + left;
            // allwidth = this._doChildrenCompareWidth(allwidth);

            // this._doChildrenLayoutContentSize(cc.size(allwidth, this.getContentSize().height));

            // for (var x in children) {
            //     var subWidget = children[x];
            //     if (!(subWidget.isVisible())) { continue; }
            //     var ap = subWidget.getAnchorPoint();
            //     var cs = subWidget.getBoundingBox();
            //     var finalPosX = ap.x * cs.width;
            //     switch (horizontal) {
            //         case ccui.Layout.LayoutHorizontal.LEFT:
            //             finalPosX += offset;
            //             break;
            //         case ccui.Layout.LayoutHorizontal.RIGHT:
            //             finalPosX = allwidth - offset - ((1.0 - ap.x) * cs.width);
            //             break;
            //         default:
            //             break;
            //     }
            //     offset += cs.width + spacingX;
            //     subWidget.setPositionX(finalPosX);
            // }
        }







    }
    function cc_ScrollView_extend() {
        let proto: any = ccui.ScrollView.prototype;
        proto._doChildrenLayoutContentSize = function (c: cc.Size) {
            this.setInnerContainerSize(c);
        }
        proto._doChildrenCompareHeight = function (c: number) {
            if (c < 0) { c = 0; }
            return Math.max(c, this.getContentSize().height);
        }

        proto._doChildrenCompareWidth = function (c: number) {
            if (c < 0) { c = 0; }
            return Math.max(c, this.getContentSize().width);
        }

        proto.getInnerOffSetTop = function () {
            let self = <ccui.ScrollView>this;
            let pInner = self.getInnerContainer();
            var minY = self.getLayoutSize().height - pInner.height;
            return (pInner.getPosition().y - minY);
        }

        proto.getInnerOffSetLeft = function () {
            let self = <ccui.ScrollView>this;
            let pInner = self.getInnerContainer();
            var minY = self.getLayoutSize().width - pInner.width;
            return (pInner.getPosition().x - minY);
        }
    }


    function cc_CheckBox_extend() {
        let proto: any = ccui.CheckBox.prototype;
        proto.setRadioSelected = function () {
            if (this['radioGroup']) {
                // let e = kaayou.Event.create(kaayou.TouchEvent, kaayou.TouchEvent.TouchCance)
                // e.currentTarget = e.target = this;
                this['radioGroup']['setSelected'](this);
                // Event.recycle(e);
            }
            // onSelect(e: kaayou.CheckEvent) {
            //     let target:ccui.CheckBox = e.target;
            //     if (target instanceof ccui.CheckBox) {
            //         let bc = !target.isSelected();
            //         for(var x in this._radios){
            //             this._radios[x].setSelectedState(target === this._radios[x]);
            //         }

            //         if(bc != target.isSelected()){
            //             let e = kaayou.Event.create(kaayou.CheckEvent,   kaayou.RadioEvent.SELECTED)
            //             e.currentTarget = e.target = target;
            //             target.dispatch(e);
            //         }
            //     }
            // }

        }
    }

    function cc_Richtext_extend() {
        let proto = ccui.RichText.prototype;
        proto.property = { fontType: "Arial", fontSize: 20 };
        // _richElements 在原生设备上没有这个属性  需要自己管理
        proto.richElements = [];

        proto.initProperty = function (data: { fontType?: string, fontSize: number }) {
            let self = <ccui.RichText>this;
            self.richElements = [];
            self["lastWidth"] = 0;
            for (let x in data) {
                if(self.property[x]){
                    self.property[x] = data[x];
                }
            }
        }

        proto.initWithDemoText = function (text: ccui.Text) {
            let self = <ccui.RichText>this;
            self.initProperty({ fontSize: text.fontSize });
            self.ignoreContentAdaptWithSize(true);
            text.getParent().addChild(self);
            self.setPosition(text.getPosition());
            self.setAnchorPoint(text.getAnchorPoint());
            text.setVisible(false);
        }

        proto.setString = function (contentArray: Array<{ color: cc.Color, content: string }>) {
            let self = <ccui.RichText>this;
            for (let i = 0; i < self.richElements.length; i++) {
                if (self.richElements[i]) {
                    self.removeElement(self.richElements[i]);
                    self.richElements.shift();
                    i--;
                }
            }
            for (let i = 0; i < contentArray.length; i++) {
                let richElement = new ccui.RichElementText(1, contentArray[i].color, 255, contentArray[i].content, self.property.fontType, self.property.fontSize);
                self.pushBackElement(richElement);
                self.richElements.push(richElement);
            }
            /**
             * 在formatRenderers函数里面有一个变量locRenderersContainer，他保存了富文本的元素，但是如果改变富文本的锚点，
             * locRenderersContainer的锚点也会被改变，但是不管锚点如何变化，locRenderersContainer的坐标都是富文本的中心位置，代码如下
             * locRenderersContainer.setPosition(this._contentSize.width * 0.5, this._contentSize.height * 0.5);
             * 也就是说如果富文本的锚点不是（0.5,0.5）的话，就会偏移了，这个只有在编写代码的时候注意了，如果锚点不是中心，则要重新设置位置
             */
            if (self._textHorizontalAlignment === cc.TEXT_ALIGNMENT_LEFT) {//创建默认左对齐
                let difx = 0;
                if (self.anchorX === 0) {
                    difx = (self.width - self["lastWidth"]) / 2;
                } else if (self.anchorX === 1) {
                    difx = -(self.width - self["lastWidth"]) / 2;
                }
                self.setPositionX(self.getPositionX() - difx);
            }
            self["lastWidth"] = self.width;
        }
    }



    function expend_set_kaEventListener(p, b) {
        if (!p.__kaEventListener)
            p.__kaEventListener = new kaayou.EventDispatcher(p);
        if (b && p.parent) {
            expend_set_kaEventListener(p.parent, b);
        }
    }

    function expend_event_addListener(...args: any[]) {
        if (args.length < 1) {
            return;
        }
        expend_set_kaEventListener(this, true);
        var mgsname = args[0];
        var toucheads = [kaayou.TouchEvent.TouchStart, kaayou.TouchEvent.TouchMove, kaayou.TouchEvent.TouchEnd, kaayou.TouchEvent.TouchCance];
        var checkheads = [kaayou.CheckEvent.SELECTED, kaayou.CheckEvent.UNSELECTED];
        if (toucheads.indexOf(mgsname) > -1) {

            if ((this instanceof ccui.Widget) && !this['isTouchEventInstall']) {
                this.addTouchEventListener(function (tager, type) {
                    if (type == ccui.Widget.TOUCH_ENDED) {
                        //zyx200617
                        //按钮显示时点击，按钮隐藏后抬起，改为触发TouchCance事件
                        if (tager.isVisible()) {
                            let e = kaayou.Event.create(kaayou.TouchEvent, kaayou.TouchEvent.TouchEnd);
                            e.currentTarget = e.target = tager
                            this.dispatch(e);
                            return true;
                        } else {
                            let e = kaayou.Event.create(kaayou.TouchEvent, kaayou.TouchEvent.TouchCance)
                            e.currentTarget = e.target = tager
                            this.dispatch(e);
                            return true;
                        }
                    } else if (type == ccui.Widget.TOUCH_MOVED) {
                        // console.log(kaayou.TouchEvent.TouchMove)
                        let e = kaayou.Event.create(kaayou.TouchEvent, kaayou.TouchEvent.TouchMove)
                        e.currentTarget = e.target = tager
                        this.dispatch(e);
                        return true;
                    } else if (type == ccui.Widget.TOUCH_BEGAN) {
                        // console.log(kaayou.TouchEvent.TouchStart)
                        let e = kaayou.Event.create(kaayou.TouchEvent, kaayou.TouchEvent.TouchStart)
                        e.currentTarget = e.target = tager
                        this.dispatch(e);
                        return true;
                    } else if (type == ccui.Widget.TOUCH_CANCELED) {
                        // console.log(kaayou.TouchEvent.TouchCance)
                        let e = kaayou.Event.create(kaayou.TouchEvent, kaayou.TouchEvent.TouchCance)
                        e.currentTarget = e.target = tager
                        this.dispatch(e);
                        return true;
                    }
                });
                this['isTouchEventInstall'] = true;
            }
        } else if (checkheads.indexOf(mgsname) > -1) {

            if ((this instanceof ccui.CheckBox) && !this['isCheckEventInstall']) {
                this.addEventListener(function (tager, type) {
                    let e = kaayou.Event.create(kaayou.CheckEvent, type == 0 ? kaayou.CheckEvent.SELECTED : kaayou.CheckEvent.UNSELECTED)
                    e.currentTarget = e.target = tager;
                    this.dispatch(e);
                });
                this['isCheckEventInstall'] = true;
            }

        }

        this.__kaEventListener.on.apply(this.__kaEventListener, arguments);
    }
    function expend_event_removeListener() {
        expend_set_kaEventListener(this, true);
        this.__kaEventListener.off.apply(this.__kaEventListener, arguments);
    }
    function expend_event_dispatch() {
        expend_set_kaEventListener(this, false);
        this.__kaEventListener.dispatch.apply(this.__kaEventListener, arguments);
    }
    function expend_event_emit() {
        expend_set_kaEventListener(this, false);
        return this.__kaEventListener.emit.apply(this.__kaEventListener, arguments);
    }
    function expend_event_hasListener() {
        expend_set_kaEventListener(this, true);
        return this.__kaEventListener.has.apply(this.__kaEventListener, arguments);
    }

    function expend_event_offBytargerListener() {
        expend_set_kaEventListener(this, true);
        return this.__kaEventListener.offBytarger.apply(this.__kaEventListener, arguments);
    }


    export function getController(name: string = "default"): kaayou.EventDispatcher {
        if (!name || name.length < 1) {
            name = 'default';
        }
        return ControllerManager.getInstance().getController(name);
    }

    export function uninstallController(name: string): boolean {
        if (!name || name.length < 1) {
            return false;
        }
        return ControllerManager.getInstance().uninstall(name);
    }


    export function emit(cname: string, head: string, data = null, ack: boolean = false, callback?, target?) {
        var e: kaayou.CustomEvent = kaayou.Event.create(kaayou.CustomEvent, head);
        if (ack) {
            if (callback) {
                var ackdata = {};
                ackdata['@original'] = data;
                ackdata['@ack'] = function (resulet) {
                    if (target) {
                        callback.apply(target, [resulet]);
                    } else {
                        callback(resulet);
                    }
                }
                e.data = ackdata;
                // setTimeout(() => {
                kaayou.getController(cname).emit(e);
                // }, 0);
            } else {
                return new Promise(function (resole, rejct) {
                    var ackdata = {};
                    ackdata['@original'] = data;
                    ackdata['@ack'] = function (data) {
                        resole(data);
                    };
                    e.data = ackdata;
                    // setTimeout(() => {
                    kaayou.getController(cname).emit(e);
                    // }, 0);
                });
            }
        } else {
            if (data) {
                e.data = data;
                // setTimeout(() => {
                kaayou.getController(cname).emit(e);
                // }, 0);
            } else {
                // setTimeout(() => {
                kaayou.getController(cname).emit(e);
                // }, 0);
            }
        }

    }

}


namespace jsb {

    export enum EventCode {
        ERROR_NO_LOCAL_MANIFEST,
        ERROR_DOWNLOAD_MANIFEST,
        ERROR_PARSE_MANIFEST,
        NEW_VERSION_FOUND,
        ALREADY_UP_TO_DATE,
        UPDATE_PROGRESSION,
        ASSET_UPDATED,
        ERROR_UPDATING,
        UPDATE_FINISHED,
        UPDATE_FAILED,
        ERROR_DECOMPRESS
    };

}