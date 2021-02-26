/// <reference path="extend.ts" />
namespace kaayou {
    const { ccclass } = kaayou._decorator;
    @ccclass
    export class ScrollView extends ccui.ScrollView {
        ctor() {
            super.ctor();
        }
    }
//   export class CuttingScrollView extends kaayou.ScrollView {
//         constructor() {
//             super();
//             this.removeAllChildren();
//             this.setDirection(ccui.ScrollView.DIR_VERTICAL);
//         }
//         /**
//          * Add child to ccui.ScrollView.
//          * @param {cc.Node} widget
//          * @param {Number} [zOrder]
//          * @param {Number|string} [tag] tag or name
//          * @returns {boolean}
//          */
//         addChild(widget, zOrder?, tag?) {
//             // if (!widget)
//             //     return false;
//             // if (this._isInContainer(widget) === false)
//             //     widget._inViewRect = false;
//             // zOrder = zOrder || widget.getLocalZOrder();
//             // tag = tag || widget.getTag();
//             return ccui.Layout.prototype.addChild.call(this, widget, zOrder, tag);
//             // return this.addProtectedChild(widget, zOrder, tag);    //this._innerContainer.addChild(widget, zOrder, tag);
//         }
//         _initScrollBar() {
//             // if(this._direction !== ccui.ScrollView.DIR_HORIZONTAL && !this._verticalScrollBar)
//             // {
//             //     this._verticalScrollBar = new ccui.ScrollViewBar(this, ccui.ScrollView.DIR_VERTICAL);
//             //     this.addProtectedChild(this._verticalScrollBar, 2);
//             // }
//             // if(this._direction !== ccui.ScrollView.DIR_VERTICAL && !this._horizontalScrollBar)
//             // {
//             //     this._horizontalScrollBar = new ccui.ScrollViewBar(this, ccui.ScrollView.DIR_HORIZONTAL);
//             //     this.addProtectedChild(this._horizontalScrollBar, 2);
//             // }
//         }


//         removeAllChildren() {
//             this.removeAllChildrenWithCleanup(true);
//         }


//         removeAllChildrenWithCleanup(cleanup) {
//             ccui.Layout.prototype.removeAllChildren.call(this, cleanup);
//             // this._innerContainer.removeAllChildrenWithCleanup(cleanup);
//         }
//         _onSizeChanged() {
//             ccui.Layout.prototype._onSizeChanged.call(this);
//             var locSize = this._contentSize;
//             this._topBoundary = locSize.height ;
//             this._rightBoundary = locSize.width ;
//             var innerSize = this.getInnerContainerSize();

//             // this._innerContainer.setContentSize(cc.size(Math.max(innerSize.width, locSize.width), Math.max(innerSize.height, locSize.height)));
//             // this._innerContainer.setPosition(0, locSize.height - this._innerContainer.getContentSize().height);
//             this.__innerContainerWidth = Math.max(innerSize.width, locSize.width);
//             this.__innerContainerHeight = Math.max(innerSize.height, locSize.height);
//             this.__innerContainerX = 0.0;
//             this.__innerContainerY = locSize.height - this.__innerContainerHeight ;
//             // if(this._verticalScrollBar)
//             //     this._verticalScrollBar.onScrolled(this._getHowMuchOutOfBoundary());

//             // if(this._horizontalScrollBar)
//             //     this._horizontalScrollBar.onScrolled(this._getHowMuchOutOfBoundary());
//         }


//         setInnerContainerSize(size) {
//             //     var innerContainer = this._innerContainer,
//             var locSize = this._contentSize,
//                 innerSizeWidth = locSize.width, innerSizeHeight = locSize.height;

//             if (size.width < locSize.width)
//                 cc.log("Inner width <= ScrollView width, it will be force sized!");
//             else
//                 innerSizeWidth = size.width;

//             if (size.height < locSize.height)
//                 cc.log("Inner height <= ScrollView height, it will be force sized!");
//             else
//                 innerSizeHeight = size.height;

//             //    innerContainer.setContentSize(cc.size(innerSizeWidth, innerSizeHeight));
//             this.__innerContainerWidth = innerSizeWidth ;
//             this.__innerContainerHeight = innerSizeHeight ;

         

//             //    var pos = this._innerContainer.getPosition();
//             var pos = this.getInnerContainerPosition();

//             //    var contAP = this._innerContainer.getAnchorPoint();

//             //    if (this._innerContainer.getLeftBoundary() != 0.0)
//             //    {
//             //        pos.x = contAP.x * innerSizeWidth;
//             //    }
//             //    if (this._innerContainer.getTopBoundary() != this._contentSize.height)
//             //    {
//             //        pos.y = this._contentSize.height - (1.0 - contAP.y) * innerSizeHeight;
//             //    }

//             if (this.getinnerLeftBoundary() != 0.0) {
//                 pos.x = innerSizeWidth ;
//             }
//             if (this.getinnerTopBoundary() != this._contentSize.height) {
//                 pos.y = this._contentSize.height - innerSizeHeight ;
//             }
//             this.setInnerContainerPosition(pos);

//             //    this._updateScrollBar(cc.p(0 ,0));
//         }

//         getChildren():cc.Node[]{
//             return ccui.Layout.prototype.getChildren.call(this);

//         }

//         _setInnerWidth(width) {
//             // var locW = this._contentSize.width,
//             //     innerWidth = locW,
//             //     container = this._innerContainer,
//             //     oldInnerWidth = container.width;
//             // if (width < locW)
//             //     cc.log("Inner width <= scrollview width, it will be force sized!");
//             // else
//             //     innerWidth = width;
//             // container.width = innerWidth;

//             // switch (this._direction) {
//             //     case ccui.ScrollView.DIR_HORIZONTAL:
//             //     case ccui.ScrollView.DIR_BOTH:
//             //         if (container.getRightBoundary() <= locW) {
//             //             var newInnerWidth = container.width;
//             //             var offset = oldInnerWidth - newInnerWidth;
//             //             this._scrollChildren(offset, 0);
//             //         }
//             //         break;
//             // }
//             // var innerAX = container.anchorX;
//             // if (container.getLeftBoundary() > 0.0)
//             //     container.x = innerAX * innerWidth;
//             // if (container.getRightBoundary() < locW)
//             //     container.x = locW - ((1.0 - innerAX) * innerWidth);
//         }

//         _setInnerHeight(height) {
//             // var locH = this._contentSize.height,
//             //     innerHeight = locH,
//             //     container = this._innerContainer,
//             //     oldInnerHeight = container.height;
//             // if (height < locH)
//             //     cc.log("Inner height <= scrollview height, it will be force sized!");
//             // else
//             //     innerHeight = height;
//             // container.height = innerHeight;

//             // switch (this._direction) {
//             //     case ccui.ScrollView.DIR_VERTICAL:
//             //     case ccui.ScrollView.DIR_BOTH:
//             //         var newInnerHeight = innerHeight;
//             //         var offset = oldInnerHeight - newInnerHeight;
//             //         this._scrollChildren(0, offset);
//             //         break;
//             // }
//             // var innerAY = container.anchorY;
//             // if (container.getLeftBoundary() > 0.0)
//             //     container.y = innerAY * innerHeight;
//             // if (container.getRightBoundary() < locH)
//             //     container.y = locH - ((1.0 - innerAY) * innerHeight);
//         }

//         /**
//          * Set inner container position
//          *
//          * @param {cc.Point} position Inner container position.
//          */
//         setInnerContainerPosition(position: cc.Point) {

//             // if (position.x === this._innerContainer.getPositionX() && position.y === this._innerContainer.getPositionY()) {
//             //     return;
//             // }
//             if (position.x === this.getinnerPositionX() && position.y === this.getinnerPositionY()) {
//                 return;
//             }

//             // this._innerContainer.setPosition(position);
           
//             let mx =  this.__innerContainerX -position.x;
//             let my =  this.__innerContainerY - position.y;

//             this.__innerContainerX = position.x ;
//             this.__innerContainerY = position.y;



//             let children = this.getChildren();

//             for(var x in children){
//                 let tpos =   children[x].getPosition();
//                 children[x].setPosition( tpos.x + mx ,tpos.y + my  );
//             }


//             let showlabel: ccui.Text = ccui.helper.seekWidgetByName(<ccui.Widget>this.parent, "showscr");
//             if (showlabel) {
//                 showlabel.setString(`w:${this.__innerContainerWidth} -- h:${this.__innerContainerHeight} --- x:${this.__innerContainerX} -- y:${this.__innerContainerY}`);
//             }
//             this._outOfBoundaryAmountDirty = true;

//             // // Process bouncing events
//             if (this.bounceEnabled) {
//                 for (var _direction = ccui.ScrollView.MOVEDIR_TOP; _direction < ccui.ScrollView.MOVEDIR_RIGHT; ++_direction) {
//                     if (this._isOutOfBoundary(_direction)) {
//                         this._processScrollEvent(_direction, true);
//                     }
//                 }
//             }

//             this._dispatchEvent(ccui.ScrollView.EVENT_CONTAINER_MOVED);
//         }

//         /**
//          * Get inner container position
//          *
//          * @return The inner container position.
//          */
//         getInnerContainerPosition(): cc.Point {
//             return cc.p(this.__innerContainerX, this.__innerContainerY);//this._innerContainer.getPosition();
//         }
//         /**
//      * Returns inner container size of ScrollView.     <br/>
//      * Inner container size must be larger than or equal ScrollView's size.
//      *
//      * @return {cc.Size} inner container size.
//      */
//         getInnerContainerSize(): cc.Size {
//             return cc.size(this.__innerContainerWidth, this.__innerContainerHeight);//this._innerContainer.getContentSize();
//         }

//         _isInContainer(widget) {
//             // if (!this._clippingEnabled)
//             //     return true;
//             // var wPos = widget._position,
//             //     wSize = widget._contentSize,
//             //     wAnchor = widget._anchorPoint,
//             //     size = this._customSize,
//             //     pos = this._innerContainer._position,
//             //     bottom = 0, left = 0;
//             // if (
//             //     // Top
//             // (bottom = wPos.y - wAnchor.y * wSize.height) >= size.height - pos.y ||
//             //     // Bottom
//             // bottom + wSize.height <= -pos.y ||
//             //     // right
//             // (left = wPos.x - wAnchor.x * wSize.width) >= size.width - pos.x ||
//             //     // left
//             // left + wSize.width <= -pos.x
//             // )
//             //     return false;
//             // else return true;
//             return true;
//         }

//         updateChildren() {
//             // var child, i, l;
//             // var childrenArray = this._innerContainer._children;
//             // for (i = 0, l = childrenArray.length; i < l; i++) {
//             //     child = childrenArray[i];
//             //     if (child._inViewRect === true && this._isInContainer(child) === false)
//             //         child._inViewRect = false;
//             //     else if (child._inViewRect === false && this._isInContainer(child) === true)
//             //         child._inViewRect = true;
//             // }
//         }

//         __innerContainerX = 0.0;
//         __innerContainerY = 0.0;
//         __innerContainerWidth = 0.0;
//         __innerContainerHeight = 0.0;
//         _getInnerWidth() {
//             return this.__innerContainerWidth;
//         }
//         getInnerWidth() {
//             return this.__innerContainerWidth;//this._innerContainer.width;
//         }
//         getInnerHeight() {
//             return this.__innerContainerHeight;// this._innerContainer.height;
//         }
//         _getInnerHeight() {
//             return this.__innerContainerHeight;// this._innerContainer.height;
//         }

//         getinnerPositionX() {
//             return this.__innerContainerX;
//         }
//         getinnerPositionY() {
//             return this.__innerContainerY;
//         }
//         getinnerLeftBoundary() {
//             //return this.getPositionX() - this._getAnchorX() * this._contentSize.width;
//             return this.__innerContainerX ;
//         }
//         getinnerTopBoundary() {
//             //return this.getBottomBoundary() + this._contentSize.height;
//             return this.getinnerBottomBoundary() + this.__innerContainerHeight;
//         }
//         getinnerBottomBoundary() {
//             // return this.getPositionY() - this._getAnchorY() * this._contentSize.height;
//             return this.__innerContainerY;
//         }

//         getinnerRightBoundary() {
//             // return this.getLeftBoundary() + this._contentSize.width;
//             return this.getinnerLeftBoundary() + this.__innerContainerWidth;
//         }



//         _getHowMuchOutOfBoundary(addition?: cc.Point) {
//             if (addition === undefined)
//                 addition = cc.p(0, 0);

//             if (addition.x === 0 && addition.y === 0 && !this._outOfBoundaryAmountDirty) {
//                 return this._outOfBoundaryAmount;
//             }



//             var outOfBoundaryAmount = cc.p(0, 0);

//             if (this.getinnerLeftBoundary() + addition.x > this._leftBoundary) {
//                 outOfBoundaryAmount.x = this._leftBoundary - (this.getinnerLeftBoundary()  + addition.x);
//             }
//             else if (this.getinnerRightBoundary() + addition.x < this._rightBoundary) {
//                 outOfBoundaryAmount.x = this._rightBoundary - (this.getinnerRightBoundary()  + addition.x);
//             }

//             if (this.getinnerTopBoundary() + addition.y < this._topBoundary) {
//                 outOfBoundaryAmount.y = this._topBoundary - (this.getinnerTopBoundary() + addition.y);
//             }
//             else if (this.getinnerBottomBoundary() + addition.y > this._bottomBoundary) {
//                 outOfBoundaryAmount.y = this._bottomBoundary - (this.getinnerBottomBoundary() + addition.y);
//             }

//             if (addition.x === 0 && addition.y === 0) {
//                 this._outOfBoundaryAmount = outOfBoundaryAmount;
//                 this._outOfBoundaryAmountDirty = false;
//             }
//             return outOfBoundaryAmount;
//         }
//         _startAutoScroll(deltaMove, timeInSec: number, attenuated: boolean) {
//             var adjustedDeltaMove = this._flattenVectorByDirection(deltaMove);
         
//             this._autoScrolling = true;
//             this._autoScrollTargetDelta = adjustedDeltaMove;
//             this._autoScrollAttenuate = attenuated;
//             this._autoScrollStartPosition = this.getInnerContainerPosition();
//             this._autoScrollTotalTime = timeInSec;
//             this._autoScrollAccumulatedTime = 0;
//             this._autoScrollBraking = false;
//             this._autoScrollBrakingStartPosition = cc.p(0, 0);

//             // If the destination is also out of boundary of same side, start brake from beggining.
//             // 如果目的地也在同一条边的边界之外，刹车。
//             var currentOutOfBoundary = this._getHowMuchOutOfBoundary();
//             if (!this._fltEqualZero(currentOutOfBoundary)) {
//                 this._autoScrollCurrentlyOutOfBoundary = true;
//                 var afterOutOfBoundary = this._getHowMuchOutOfBoundary(adjustedDeltaMove);
//                 if (currentOutOfBoundary.x * afterOutOfBoundary.x > 0 || currentOutOfBoundary.y * afterOutOfBoundary.y > 0) {
//                     this._autoScrollBraking = true;
//                 }
//             }
//         }

//         _moveInnerContainer(deltaMove, canStartBounceBack) {
//             var adjustedMove = this._flattenVectorByDirection(deltaMove);
//             this.setInnerContainerPosition(cc.pAdd(this.getInnerContainerPosition(), adjustedMove));

//             var outOfBoundary = this._getHowMuchOutOfBoundary();
//             // this._updateScrollBar(outOfBoundary);

//             if (this.bounceEnabled && canStartBounceBack) {
//                 this._startBounceBackIfNeeded();
//             }
//         }

//         _scrollChildren(deltaMove: cc.Point) {
//             var realMove = deltaMove;


//             if (this.bounceEnabled) {
//                 // If the position of the inner container is out of the boundary, the offsets should be divided by two.
//                 var outOfBoundary = this._getHowMuchOutOfBoundary();
//                 realMove.x *= (outOfBoundary.x == 0 ? 1 : 0.5);
//                 realMove.y *= (outOfBoundary.y == 0 ? 1 : 0.5);
//             }
//             realMove.x = Number(realMove.x.toFixed(3));
//             realMove.y = Number(realMove.y.toFixed(3));

//             if (!this.bounceEnabled) {
//                 var outOfBoundary = this._getHowMuchOutOfBoundary(realMove);
//                 // realMove.x += outOfBoundary.x;
//                 // realMove.y += outOfBoundary.y;
//                 realMove.x += Number(outOfBoundary.x.toFixed(3));
//                 realMove.y +=  Number(outOfBoundary.y.toFixed(3));
//             }

//             var scrolledToLeft = false;
//             var scrolledToRight = false;
//             var scrolledToTop = false;
//             var scrolledToBottom = false;

//             if (realMove.y > 0.0) // up
//             {
//                 var icBottomPos = this.getinnerBottomBoundary()//.getBottomBoundary();
//                 if (icBottomPos + realMove.y >= this._bottomBoundary) {
//                     scrolledToBottom = true;
//                 }
//             }
//             else if (realMove.y < 0.0) // down
//             {
//                 var icTopPos = this.getinnerTopBoundary()//this._innerContainer.getTopBoundary();
//                 if (icTopPos + realMove.y <= this._topBoundary) {
//                     scrolledToTop = true;
//                 }
//             }

//             if (realMove.x < 0.0) // left
//             {
//                 var icRightPos = this.getinnerRightBoundary()//this._innerContainer.getRightBoundary();
//                 if (icRightPos + realMove.x <= this._rightBoundary) {
//                     scrolledToRight = true;
//                 }
//             }
//             else if (realMove.x > 0.0) // right
//             {
//                 var icLeftPos = this.getinnerLeftBoundary();//this._innerContainer.getLeftBoundary();
//                 if (icLeftPos + realMove.x >= this._leftBoundary) {
//                     scrolledToLeft = true;
//                 }
//             }
//             this._moveInnerContainer(realMove, false);

//             if (realMove.x != 0 || realMove.y != 0) {
//                 this._processScrollingEvent();
//             }
//             if (scrolledToBottom) {
//                 this._processScrollEvent(ccui.ScrollView.MOVEDIR_BOTTOM, false);
//             }
//             if (scrolledToTop) {
//                 this._processScrollEvent(ccui.ScrollView.MOVEDIR_TOP, false);
//             }
//             if (scrolledToLeft) {
//                 this._processScrollEvent(ccui.ScrollView.MOVEDIR_LEFT, false);
//             }
//             if (scrolledToRight) {
//                 this._processScrollEvent(ccui.ScrollView.MOVEDIR_RIGHT, false);
//             }
//         }

//         _startAutoScrollToDestination(destination, timeInSec, attenuated) {
//             this._startAutoScroll(cc.pSub(destination, this.getInnerContainerPosition()), timeInSec, attenuated);
//         }

//         scrollToBottom(time, attenuated) {
//             this._startAutoScrollToDestination(cc.p(this.getinnerPositionX(), 0), time, attenuated);
//         }

//         /**
//          * Scroll inner container to top boundary of ScrollView.
//          * @param {Number} time
//          * @param {Boolean} attenuated
//          */
//         scrollToTop(time, attenuated) {
//             // this._startAutoScrollToDestination(
//             //     cc.p(this._innerContainer.getPositionX(), this._contentSize.height - this._innerContainer.getContentSize().height), time, attenuated);

//             this._startAutoScrollToDestination(
//                 cc.p(this.getinnerPositionX(), this._contentSize.height - this.getInnerHeight()), time, attenuated);
//         }

//         /**
//          * Scroll inner container to left boundary of ScrollView.
//          * @param {Number} time
//          * @param {Boolean} attenuated
//          */
//         scrollToLeft(time, attenuated) {
//             // this._startAutoScrollToDestination(cc.p(0, this._innerContainer.getPositionY()), time, attenuated);
//             this._startAutoScrollToDestination(cc.p(0, this.getinnerPositionY()), time, attenuated);
//         }

//         /**
//          * Scroll inner container to right boundary of ScrollView.
//          * @param {Number} time
//          * @param {Boolean} attenuated
//          */
//         scrollToRight(time, attenuated) {
//             // this._startAutoScrollToDestination(
//             //     cc.p(this._contentSize.width - this._innerContainer.getContentSize().width, this._innerContainer.getPositionY()), time, attenuated);
//             this._startAutoScrollToDestination(
//                 cc.p(this._contentSize.width - this.getInnerWidth(),
//                     this.getinnerPositionY()), time, attenuated);
//         }

//         scrollToTopRight(time, attenuated) {
//             if (this._direction !== ccui.ScrollView.DIR_BOTH) {
//                 cc.log("Scroll direction is not both!");
//                 return;
//             }
//             //var inSize = this._innerContainer.getContentSize();
//             var inSize = this.getInnerContainerSize();
//             this._startAutoScrollToDestination(cc.p(this._contentSize.width - inSize.width,
//                 this._contentSize.height - inSize.height), time, attenuated);
//         }
//         scrollToBottomRight(time, attenuated) {
//             if (this._direction !== ccui.ScrollView.DIR_BOTH) {
//                 cc.log("Scroll direction is not both!");
//                 return;
//             }
//             // this._startAutoScrollToDestination(cc.p(this._contentSize.width - this._innerContainer.getContentSize().width, 0), time, attenuated);
//             this._startAutoScrollToDestination(cc.p(this._contentSize.width - this.getInnerWidth(), 0), time, attenuated);
//         }
//         scrollToPercentVertical(percent, time, attenuated) {
//             // var minY = this._contentSize.height - this._innerContainer.getContentSize().height;
//             var minY = this._contentSize.height - this.getInnerHeight();
//             var h = -minY;
//             // this._startAutoScrollToDestination(cc.p(this._innerContainer.getPositionX(), minY + percent * h / 100), time, attenuated);
//             this._startAutoScrollToDestination(cc.p(this.getinnerPositionX(), minY + percent * h / 100), time, attenuated);
//         }

//         scrollToPercentHorizontal(percent, time, attenuated) {
//             // var w = this._innerContainer.getContentSize().width - this._contentSize.width;
//             var w = this.getInnerWidth() - this._contentSize.width;
//             this._startAutoScrollToDestination(cc.p(-(percent * w / 100), this.getinnerPositionY()), time, attenuated);
//         }
//         _jumpToDestination(desOrX, y) {
//             if (desOrX.x === undefined) {
//                 desOrX = cc.p(desOrX, y);
//             }

//             this._autoScrolling = false;
//             this._moveInnerContainer(cc.pSub(desOrX, this.getInnerContainerPosition()), true);
//         }

//         scrollToPercentBothDirection(percent, time, attenuated) {
//             if (this._direction !== ccui.ScrollView.DIR_BOTH)
//                 return;
//             // var minY = this._contentSize.height - this._innerContainer.getContentSize().height;
//             var minY = this._contentSize.height - this.getInnerHeight();
//             var h = -minY;
//             // var w = this._innerContainer.getContentSize().width - this._contentSize.width;
//             var w = this.getInnerWidth() - this._contentSize.width;
//             this._startAutoScrollToDestination(cc.p(-(percent.x * w / 100), minY + percent.y * h / 100), time, attenuated);
//         }

//         jumpToBottom() {
//             // this._jumpToDestination(this._innerContainer.getPositionX(), 0);
//             this._jumpToDestination(this.getinnerPositionX(), 0);
//         }



//         jumpToTop() {
//             this._jumpToDestination(this.getinnerPositionX(), this._contentSize.height - this.getInnerHeight());
//         }

//         /**
//          * Move inner container to left boundary of ScrollView.
//          */
//         jumpToLeft() {
//             this._jumpToDestination(0, this.getinnerPositionY());
//         }

//         /**
//          * Move inner container to right boundary of ScrollView.
//          */
//         jumpToRight() {
//             this._jumpToDestination(this._contentSize.width - this.getInnerWidth(), this.getinnerPositionY());
//         }


//         /**
//     * Move inner container to top and right boundary of ScrollView.
//     */
//         jumpToTopRight() {
//             if (this._direction !== ccui.ScrollView.DIR_BOTH) {
//                 cc.log("Scroll _direction is not both!");
//                 return;
//             }
//             var inSize = this.getInnerContainerSize();
//             this._jumpToDestination(this._contentSize.width - inSize.width, this._contentSize.height - inSize.height);
//         }
//         /**
//          * Move inner container to bottom and left boundary of ScrollView.
//          */
//         jumpToBottomLeft() {
//             if (this._direction !== ccui.ScrollView.DIR_BOTH) {
//                 cc.log("Scroll _direction is not both!");
//                 return;
//             }
//             this._jumpToDestination(0, 0);
//         }

//         /**
//          * Move inner container to bottom and right boundary of ScrollView.
//          */
//         jumpToBottomRight() {
//             if (this._direction !== ccui.ScrollView.DIR_BOTH) {
//                 cc.log("Scroll _direction is not both!");
//                 return;
//             }
//             this._jumpToDestination(this._contentSize.width - this.getInnerContainerSize().width, 0);
//         }

//         jumpToPercentVertical(percent) {
//             var minY = this._contentSize.height - this.getInnerContainerSize().height;
//             var h = -minY;
//             this._jumpToDestination(this.getinnerPositionX(), minY + percent * h / 100);
//         }

//         /**
//          * Move inner container to horizontal percent position of ScrollView.
//          * @param {Number} percent The destination vertical percent, accept value between 0 - 100
//          */
//         jumpToPercentHorizontal(percent) {
//             var w = this.getInnerContainerSize().width - this._contentSize.width;
//             this._jumpToDestination(-(percent * w / 100), this.getinnerPositionY());
//         }

//         jumpToPercentBothDirection(percent) {
//             if (this._direction !== ccui.ScrollView.DIR_BOTH)
//                 return;
//             var inSize = this.getInnerContainerSize();
//             var minY = this._contentSize.height - inSize.height;
//             var h = -minY;
//             var w = inSize.width - this._contentSize.width;
//             this._jumpToDestination(-(percent.x * w / 100), minY + percent.y * h / 100);
//         }




//         /**
//     * Returns a node by tag
//     * @param {Number} tag
//     * @returns {cc.Node}
//     * @deprecated  since v3.0, please use getChildByTag instead.
//     */
//         getNodeByTag(tag) {
//             return this.getNodeByTag(tag);
//         }

//         /**
//          * Returns all nodes of inner container
//          * @returns {Array}
//          * @deprecated since v3.0, please use getChildren instead.
//          */
//         getNodes() {
//             return this.getNodes();
//         }

//         /**
//          * Removes a node from ccui.ScrollView.
//          * @param {cc.Node} node
//          * @deprecated since v3.0, please use removeChild instead.
//          */
//         removeNode(node) {
//             this.removeNode(node);
//         }

//         /**
//          * Removes a node by tag
//          * @param {Number} tag
//          * @deprecated since v3.0, please use removeChildByTag instead.
//          */
//         removeNodeByTag(tag) {
//             this.removeNodeByTag(tag);
//         }

//         /**
//          * Remove all node from ccui.ScrollView.
//          * @deprecated since v3.0, please use removeAllChildren instead.
//          */
//         removeAllNodes() {
//             this.removeAllNodes();
//         }

//         /**
//          * Add node for scrollView
//          * @param {cc.Node} node
//          * @param {Number} zOrder
//          * @param {Number} tag
//          * @deprecated since v3.0, please use addChild instead.
//          */
//         addNode(node, zOrder, tag) {
//             this.addNode(node, zOrder, tag);
//         }

//         getInnerContainer() {
//             return null;
//         }

//         /**
//          * Sets LayoutType of ccui.ScrollView.
//          * @param {ccui.Layout.ABSOLUTE|ccui.Layout.LINEAR_VERTICAL|ccui.Layout.LINEAR_HORIZONTAL|ccui.Layout.RELATIVE} type
//          */
//         setLayoutType(type) {
//             // this._innerContainer.setLayoutType(type);
//         }

//         /**
//          * Returns the layout type of ccui.ScrollView.
//          * @returns {ccui.Layout.ABSOLUTE|ccui.Layout.LINEAR_VERTICAL|ccui.Layout.LINEAR_HORIZONTAL|ccui.Layout.RELATIVE}
//          */
//         getLayoutType() {
//             return ccui.Layout.LINEAR_VERTICAL;//this._innerContainer.getLayoutType();
//         }
//     }

}