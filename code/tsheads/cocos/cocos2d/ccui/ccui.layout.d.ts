declare namespace ccui {
    export interface ILayoutPadding {
        top?: number,
        bottom?: number,
        left?: number,
        right?: number,
        spacingY?: number,
        spacingX?: number
    }

    interface ILayout extends IWidget { }



    export class Layout extends Widget implements ILayout {

        setBackGroundImage(fileName: string, texType: any): any

        setBackGroundColor(color: cc.Color, endColor?: cc.Color);
        getBackGroundColor(): cc.Color;
        setBackGroundColorOpacity(opacity: number);//0-255
        getBackGroundColorOpacity(): number;
        setBackGroundImageColor(color: cc.Color);
        getBackGroundImageColor(): cc.Color;
        _updateBackGroundImageColor();
        setBackGroundImageOpacity(opacity: number)
        getBackGroundImageOpacity(): number;
        setBackGroundColorVector(vector: cc.Point);
        getBackGroundColorVector(): cc.Point;
        setBackGroundImageScale9Enabled(able:boolean);
        setBackGroundColorType(type:number);
        getBackGroundColorType():number;
        isBackGroundImageScale9Enabled():boolean;
        setLayoutType(type: number);
        getLayoutType(): number;
        setPadding(padding: ILayoutPadding);
        getPadding(): ILayoutPadding;
        setHorizontal(v: ccui.Layout.LayoutHorizontal);
        setGrid(v: ccui.Layout.LayoutGrid_AxisDirection);
        setVertical(v: ccui.Layout.LayoutVertical);
        //设置自动排版方向
        setChildrenLayoutDirection(v: ccui.Layout.LayoutDirection);
        getChildrenLayoutDirection():ccui.Layout.LayoutDirection;
        //设置自动布局
        doChildrenLayout();
        //设置grid 布局行
        setGridRow(row: number);
        getGridRow():number;
        //设置瀑布流布局
        setPinterest(b: boolean);
        //设置grid 布局列
        setGridColumn(column: number);
        getGridColumn():number;
        _onSizeChanged();

        /**
   * Add child to ccui.ScrollView.
   * @param {cc.Node} widget
   * @param {Number} [zOrder]
   * @param {Number|string} [tag] tag or name
   * @returns {boolean}
   */
        addProtectedChild(widget, zOrder, tag): boolean;

    }
    export namespace Layout {


        //Layout type
        /**
         * The absolute of ccui.Layout's layout type.
         * @type {number}
         * @constant
         */
        export const ABSOLUTE: number;
        /**
         * The vertical of ccui.Layout's layout type.
         * @type {number}
         * @constant
         */
        export const LINEAR_VERTICAL: number;
        /**
         * The horizontal of ccui.Layout's layout type.
         * @type {number}
         * @constant
         */
        export const LINEAR_HORIZONTAL: number;
        /**
         * The relative of ccui.Layout's layout type.
         * @type {number}
         * @constant
         */
        export const RELATIVE: number;

        //Layout clipping type
        /**
         * The stencil of ccui.Layout's clipping type.
         * @type {number}
         * @constant
         */
        export const CLIPPING_STENCIL: number;
        /**
         * The scissor of ccui.Layout's clipping type.
         * @type {number}
         * @constant
         */
        export const CLIPPING_SCISSOR: number;

        /**
         * The zOrder value of ccui.Layout's image background.
         * @type {number}
         * @constant
         */
        export const BACKGROUND_IMAGE_ZORDER: number;
        /**
         * The zOrder value of ccui.Layout's color background.
         * @type {number}
         * @constant
         */
        export const BACKGROUND_RENDERER_ZORDER: number;
        /**
         * The None of ccui.Layout's background color type
         * @constant
         * @type {number}
         */

        export const BG_COLOR_NONE: number;
        /**
         * The solid of ccui.Layout's background color type, it will use a LayerColor to draw the background.
         * @constant
         * @type {number}
         */
        export const BG_COLOR_SOLID: number;
        /**
         * The gradient of ccui.Layout's background color type, it will use a LayerGradient to draw the background.
         * @constant
         * @type {number}
         */
        export const BG_COLOR_GRADIENT: number;

        export enum LayoutHorizontal {
            LEFT = 0,
            RIGHT
        }
        export enum LayoutVertical {
            TOP = 0,
            BOTTOM
        }

        export enum LayoutGrid_AxisDirection {
            HORIZONTAL = 0,
            VERTICAL
        }

        export enum LayoutGrid_ {
            LEFT = 0,
            TOP
        }


        export enum LayoutDirection {
            Horizontal = 0,
            Vertical,
            Grid
        }


        /**
         *      GRID 自动布局
         * 
                testpanel.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Grid);
                    //横向
        
                    if(1){
                        testpanel.setGrid(ccui.Layout.LayoutGrid_AxisDirection.HORIZONTAL);
                        testpanel.setPadding({top:70,bottom:50,left:200,right:30,spacingX:10,spacingY:15})
                        testpanel.setHorizontal(ccui.Layout.LayoutHorizontal.LEFT);
                        testpanel.setVertical(ccui.Layout.LayoutVertical.TOP);
                    }
        
                    if(0){
                        testpanel.setGrid(ccui.Layout.LayoutGrid_AxisDirection.HORIZONTAL);
                        testpanel.setPadding({top:70,bottom:50,left:200,right:30,spacingX:10,spacingY:15})
                        testpanel.setHorizontal(ccui.Layout.LayoutHorizontal.LEFT);
                        testpanel.setVertical(ccui.Layout.LayoutVertical.BOTTOM);
                    }
                    if(0){
                        testpanel.setGrid(ccui.Layout.LayoutGrid_AxisDirection.HORIZONTAL);
                        testpanel.setPadding({top:70,bottom:50,left:200,right:30,spacingX:10,spacingY:15})
                        testpanel.setHorizontal(ccui.Layout.LayoutHorizontal.RIGHT);
                        testpanel.setVertical(ccui.Layout.LayoutVertical.TOP);
                    }
                    if(0){
                        testpanel.setGrid(ccui.Layout.LayoutGrid_AxisDirection.HORIZONTAL);
                        testpanel.setPadding({top:70,bottom:50,left:200,right:30,spacingX:10,spacingY:15})
                        testpanel.setHorizontal(ccui.Layout.LayoutHorizontal.RIGHT);
                        testpanel.setVertical(ccui.Layout.LayoutVertical.BOTTOM);
                    }
                 
                    //纵向
        
                    if(0){
                        testpanel.setGrid(ccui.Layout.LayoutGrid_AxisDirection.VERTICAL);
                        testpanel.setPadding({top:70,bottom:50,left:200,right:30,spacingX:10,spacingY:15})
                        testpanel.setHorizontal(ccui.Layout.LayoutHorizontal.LEFT);
                        testpanel.setVertical(ccui.Layout.LayoutVertical.TOP);
                    }
        
                    if(0){
                        testpanel.setGrid(ccui.Layout.LayoutGrid_AxisDirection.VERTICAL);
                        testpanel.setPadding({top:70,bottom:50,left:200,right:30,spacingX:10,spacingY:15})
                        testpanel.setHorizontal(ccui.Layout.LayoutHorizontal.LEFT);
                        testpanel.setVertical(ccui.Layout.LayoutVertical.BOTTOM);
                    }
        
                    if(0){
                        testpanel.setGrid(ccui.Layout.LayoutGrid_AxisDirection.VERTICAL);
                        testpanel.setPadding({top:70,bottom:50,left:200,right:30,spacingX:10,spacingY:15})
                        testpanel.setHorizontal(ccui.Layout.LayoutHorizontal.RIGHT);
                        testpanel.setVertical(ccui.Layout.LayoutVertical.TOP);
                    }
        
                    if(1){
                        testpanel.setGrid(ccui.Layout.LayoutGrid_AxisDirection.VERTICAL);
                        testpanel.setPadding({top:70,bottom:50,left:200,right:30,spacingX:10,spacingY:15})
                        testpanel.setHorizontal(ccui.Layout.LayoutHorizontal.RIGHT);
                        testpanel.setVertical(ccui.Layout.LayoutVertical.BOTTOM);
                    }
         * 
         */



    }


    export class ScrollView extends Layout {

        getInnerOffSetTop(): number;
        getInnerOffSetLeft(): number;
        /**
     * The both flag of ccui.ScrollView's direction.
     */
        static DIR_BOTH: any   //3

        /**
         * The horizontal flag of ccui.ScrollView's direction.
         */
        static DIR_HORIZONTAL: any //2

        /**
         * The none flag of ccui.ScrollView's direction.
         */
        static DIR_NONE: any  //0

        /**
         * The vertical flag of ccui.ScrollView's direction.
         */
        static DIR_VERTICAL: any  //1

        /**
         * The flag autoscroll ended of ccui.ScrollView's event.
         */
        static EVENT_AUTOSCROLL_ENDED: any  //10

        /**
         * The flag bounce bottom of ccui.ScrollView's event.
         */
        static EVENT_BOUNCE_BOTTOM: any  //6

        /**
         * The flag bounce left of ccui.ScrollView's event.
         */
        static EVENT_BOUNCE_LEFT: any //7

        /**
         * The flag bounce right of ccui.ScrollView's event.
         */
        static EVENT_BOUNCE_RIGHT: any //8

        /**
         * The flag bounce top of ccui.ScrollView's event.
         */
        static EVENT_BOUNCE_TOP: any //5

        /**
         * The flag container moved of ccui.ScrollView's event.
         */
        static EVENT_CONTAINER_MOVED: any //9

        /**
         * The flag scroll to bottom of ccui.ScrollView's event.
         */
        static EVENT_SCROLL_TO_BOTTOM: any //1

        /**
         * The flag scroll to left of ccui.ScrollView's event.
         */
        static EVENT_SCROLL_TO_LEFT: any //2

        /**
         * The flag scroll to right of ccui.ScrollView's event.
         */
        static EVENT_SCROLL_TO_RIGHT: any //3

        /**
         * The flag scroll to top of ccui.ScrollView's event.
         */
        static EVENT_SCROLL_TO_TOP: any //0

        /**
         * The scrolling flag of ccui.ScrollView's event.
         */
        static EVENT_SCROLLING: any //4

        /**
         * allocates and initializes a UIScrollView.
         *
         * @returns {ccui.ScrollView}
         */
        static create(): ccui.ScrollView


        /**
         * Add child to ccui.ScrollView.
         *
         * @param {cc.Node} widget
         * @param {Number} zOrder
         * @param {Number|string} tag tag or name
         *
         * @returns {boolean}
         */
        addChild(widget: cc.Node, zOrder?: number, tag?: number | string): boolean

        /**
         * Add node for scrollView
         *
         * @param {cc.Node} node
         * @param {Number} zOrder
         * @param {Number} tag
         */
        addNode(node: cc.Node, zOrder: number, tag: number): any

        /**
         * When a widget is in a layout, you could call this method to get the next focused widget within a specified _direction.
         * If the widget is not in a layout, it will return itself
         *
         * @param {Number} _direction the _direction to look for the next focused widget in a layout
         * @param {ccui.Widget} current the current focused widget
         *
         * @returns {ccui.Widget}
         */
        findNextFocusedWidget(_direction: number, current: ccui.Widget): ccui.Widget

        /**
         * Returns the "class name" of ccui.ScrollView.
         *
         * @returns {string}
         */
        getDescription(): string

        /**
         * Returns the layout type of ccui.ScrollView.
         *
         * @returns {ccui.Layout.ABSOLUTE|ccui.Layout.LINEAR_VERTICAL|ccui.Layout.LINEAR_HORIZONTAL|ccui.Layout.RELATIVE}
         */
        getLayoutType(): any

        /**
         * Returns a node by tag
         *
         * @param {Number} tag
         *
         * @returns {cc.Node}
         */
        getNodeByTag(tag: number): cc.Node

        /**
         * Returns all nodes of inner container
         *
         * @returns {Array}
         */
        getNodes(): any[]

        /**
         * Initializes a ccui.ScrollView. Please do not call this function by yourself, you should pass the parameters to constructor to initialize it.
         *
         * @returns {boolean}
         */
        init(): boolean

        /**
         * Intercept touch event, handle its child's touch event.
         *
         * @param {number} event event type
         * @param {ccui.Widget} sender
         * @param {cc.Touch} touch
         */
        interceptTouchEvent(event: number, sender: ccui.Widget, touch: cc.Touch): any

        /**
         * Calls the parent class' onEnter and schedules update function.
         */
        onEnter(): any

        /**
         * The touch began event callback handler of ccui.ScrollView.
         *
         * @param {cc.Touch} touch
         * @param {cc.Event} event
         *
         * @returns {boolean}
         */
        onTouchBegan(touch: cc.Touch, event: cc.Event): boolean

        /**
         * The touch ended event callback handler of ccui.ScrollView.
         *
         * @param {cc.Touch} touch
         * @param {cc.Event} event
         */
        onTouchEnded(touch: cc.Touch, event: cc.Event): any

        /**
         * The touch moved event callback handler of ccui.ScrollView.
         *
         * @param {cc.Touch} touch
         * @param {cc.Event} event
         */
        onTouchMoved(touch: cc.Touch, event: cc.Event): any

        /**
         * Removes all children.
         */
        removeAllChildren(): any

        /**
         * Removes all children.
         *
         * @param {Boolean} cleanup
         */
        removeAllChildrenWithCleanup(cleanup: boolean): any

        /**
         * Remove all node from ccui.ScrollView.
         */
        removeAllNodes(): any

        /**
         * Removes widget child
         *
         * @param {ccui.Widget} child
         * @param {Boolean} cleanup
         *
         * @returns {boolean}
         */
        removeChild(child: ccui.Widget, cleanup: boolean): boolean

        /**
         * Removes a node from ccui.ScrollView.
         *
         * @param {cc.Node} node
         */
        removeNode(node: cc.Node): any

        /**
         * Removes a node by tag
         *
         * @param {Number} tag
         */
        removeNodeByTag(tag: number): any

        /**
         * Sets LayoutType of ccui.ScrollView.
         *
         * @param {ccui.Layout.ABSOLUTE|ccui.Layout.LINEAR_VERTICAL|ccui.Layout.LINEAR_HORIZONTAL|ccui.Layout.RELATIVE} type
         */
        setLayoutType(type: any): any


        /**
         * - Indicate whether bounce is enabled
         */
        bounceEnabled: boolean

        /**
         * - Scroll direction of the scroll view
         */
        direction: any

        /**
         * - Indicate whether inertiaScroll is enabled
         */
        inertiaScrollEnabled: boolean

        /**
         * - Inner container height of the scroll view
         */
        innerHeight: number

        /**
         * - Inner container width of the scroll view
         */
        innerWidth: number

        /**
         * - Touch total time threshold
         */
        touchTotalTimeThreshold: number

        /**
         * Adds callback function called ScrollView event triggered
         *
         * @param {Function} selector
         */
        addEventListener(selector: Function): any

        /**
         * Adds callback function called ScrollView event triggered
         *
         * @param {Function} selector
         * @param {Object} target
         */
        addEventListenerScrollView(selector: Function, target: object): any

        /**
         * Gets a child from the container given its name
         *
         * @param {String} name
         *
         * @returns {ccui.Widget}
         */
        getChildByName(name: string): ccui.Widget

        /**
         * Gets a child from the container given its tag
         *
         * @param {Number} tag
         *
         * @returns {ccui.Widget}
         */
        getChildByTag(tag: number): ccui.Widget

        /**
         * Returns inner container's children
         *
         * @returns {Array}
         */
        getChildren(): any[]

        /**
         * Gets the count of inner container's children
         *
         * @returns {Number}
         */
        getChildrenCount(): number

        /**
         * Returns scroll direction of ScrollView.
         *
         * @returns {ccui.ScrollView.DIR_NONE | ccui.ScrollView.DIR_VERTICAL | ccui.ScrollView.DIR_HORIZONTAL | ccui.ScrollView.DIR_BOTH}
         */
        getDirection(): any

        /**
         * Gets inner container of ScrollView. Inner container is the container of ScrollView's children.
         *
         * @returns {ccui.Layout}
         */
        getInnerContainer(): ccui.Layout

        /**
         * Get inner container position
         */
        getInnerContainerPosition(): any

        /**
         * Returns inner container size of ScrollView.
         * Inner container size must be larger than or equal ScrollView's size.
         *
         * @returns {cc.Size} inner container size.
         */
        getInnerContainerSize(): cc.Size

        /**
         * Get the scroll bar's auto hide time
         *
         * @returns {number}
         */
        getScrollBarAutoHideTime(): number

        /**
         * Get the scroll bar's color
         *
         * @returns {cc.Color} the scroll bar's color
         */
        getScrollBarColor(): cc.Color

        /**
         * Get the scroll bar's opacity
         *
         * @returns {number}
         */
        getScrollBarOpacity(): number

        /**
         * Get the horizontal scroll bar's position from right-top corner.
         *
         * @returns {cc.Point}
         */
        getScrollBarPositionFromCornerForHorizontal(): cc.Point

        /**
         * Get the vertical scroll bar's position from right-top corner.
         *
         * @returns {cc.Point}
         */
        getScrollBarPositionFromCornerForVertical(): cc.Point

        /**
         * Get the scroll bar's width
         *
         * @returns {number} the scroll bar's width
         */
        getScrollBarWidth(): number

        /**
         * Get the touch total time threshold
         *
         * @returns {Number}
         */
        getTouchTotalTimeThreshold(): number

        /**
         * Returns whether bounce is enabled
         *
         * @returns {boolean}
         */
        isBounceEnabled(): boolean

        /**
         * Returns whether inertiaScroll is enabled
         *
         * @returns {boolean}
         */
        isInertiaScrollEnabled(): boolean

        /**
         * Query scroll bar auto hide state
         *
         * @returns {boolean}
         */
        isScrollBarAutoHideEnabled(): boolean

        /**
         * Query scroll bar state.
         *
         * @returns {boolean} True if scroll bar is enabled, false otherwise.
         */
        isScrollBarEnabled(): boolean

        /**
         * Move inner container to bottom boundary of ScrollView.
         */
        jumpToBottom(): any

        /**
         * Move inner container to bottom and left boundary of ScrollView.
         */
        jumpToBottomLeft(): any

        /**
         * Move inner container to bottom and right boundary of ScrollView.
         */
        jumpToBottomRight(): any

        /**
         * Move inner container to left boundary of ScrollView.
         */
        jumpToLeft(): any

        /**
         * Move inner container to both _direction percent position of ScrollView.
         *
         * @param {cc.Point} percent The destination vertical percent, accept value between 0 - 100
         */
        jumpToPercentBothDirection(percent: cc.Point): any

        /**
         * Move inner container to horizontal percent position of ScrollView.
         *
         * @param {Number} percent The destination vertical percent, accept value between 0 - 100
         */
        jumpToPercentHorizontal(percent: number): any

        /**
         * Move inner container to vertical percent position of ScrollView.
         *
         * @param {Number} percent The destination vertical percent, accept value between 0 - 100
         */
        jumpToPercentVertical(percent: number): any

        /**
         * Move inner container to right boundary of ScrollView.
         */
        jumpToRight(): any

        /**
         * Move inner container to top boundary of ScrollView.
         */
        jumpToTop(): any

        /**
         * Move inner container to top and left boundary of ScrollView.
         */
        jumpToTopLeft(): any

        /**
         * Move inner container to top and right boundary of ScrollView.
         */
        jumpToTopRight(): any

        /**
         * Scroll inner container to bottom boundary of ScrollView.
         *
         * @param {Number} time
         * @param {Boolean} attenuated
         */
        scrollToBottom(time: number, attenuated: boolean): any

        /**
         * Scroll inner container to bottom and left boundary of ScrollView.
         *
         * @param {Number} time
         * @param {Boolean} attenuated
         */
        scrollToBottomLeft(time: number, attenuated: boolean): any

        /**
         * Scroll inner container to bottom and right boundary of ScrollView.
         *
         * @param {Number} time
         * @param {Boolean} attenuated
         */
        scrollToBottomRight(time: number, attenuated: boolean): any

        /**
         * Scroll inner container to left boundary of ScrollView.
         *
         * @param {Number} time
         * @param {Boolean} attenuated
         */
        scrollToLeft(time: number, attenuated: boolean): any

        /**
         * Scroll inner container to both _direction percent position of ScrollView.
         *
         * @param {cc.Point} percent
         * @param {Number} time
         * @param {Boolean} attenuated
         */
        scrollToPercentBothDirection(percent: cc.Point, time: number, attenuated: boolean): any

        /**
         * Scroll inner container to horizontal percent position of ScrollView.
         *
         * @param {Number} percent
         * @param {Number} time
         * @param {Boolean} attenuated
         */
        scrollToPercentHorizontal(percent: number, time: number, attenuated: boolean): any

        /**
         * Scroll inner container to vertical percent position of ScrollView.
         *
         * @param {Number} percent
         * @param {Number} time
         * @param {Boolean} attenuated
         */
        scrollToPercentVertical(percent: number, time: number, attenuated: boolean): any

        /**
         * Scroll inner container to right boundary of ScrollView.
         *
         * @param {Number} time
         * @param {Boolean} attenuated
         */
        scrollToRight(time: number, attenuated: boolean): any

        /**
         * Scroll inner container to top boundary of ScrollView.
         *
         * @param {Number} time
         * @param {Boolean} attenuated
         */
        scrollToTop(time: number, attenuated: boolean): any

        /**
         * Scroll inner container to top and left boundary of ScrollView.
         *
         * @param {Number} time
         * @param {Boolean} attenuated
         */
        scrollToTopLeft(time: number, attenuated: boolean): any

        /**
         * Scroll inner container to top and right boundary of ScrollView.
         *
         * @param {Number} time
         * @param {Boolean} attenuated
         */
        scrollToTopRight(time: number, attenuated: boolean): any

        /**
         * Sets bounce enabled
         *
         * @param {Boolean} enabled
         */
        setBounceEnabled(enabled: boolean): any
        setClippingEnabled(enabled: boolean): any
        /**
         * Changes scroll _direction of ScrollView.
         *
         * @param {ccui.ScrollView.DIR_NONE | ccui.ScrollView.DIR_VERTICAL | ccui.ScrollView.DIR_HORIZONTAL | ccui.ScrollView.DIR_BOTH} dir Direction::VERTICAL means vertical scroll, Direction::HORIZONTAL means horizontal scroll
         */
        setDirection(dir: any): any

        /**
         * Sets inertiaScroll enabled
         *
         * @param {boolean} enabled
         */
        setInertiaScrollEnabled(enabled: boolean): any

        /**
         * Set inner container position
         *
         * @param {cc.Point} position Inner container position.
         */
        setInnerContainerPosition(position: cc.Point): any

        /**
         * Changes inner container size of ScrollView.
         * Inner container size must be larger than or equal the size of ScrollView.
         *
         * @param {cc.Size} size inner container size.
         */
        setInnerContainerSize(size: cc.Size): any

        /**
         * Set scroll bar auto hide state
         *
         * @param {boolean} autoHideEnabled scroll bar auto hide state
         */
        setScrollBarAutoHideEnabled(autoHideEnabled: boolean): any

        /**
         * Set scroll bar auto hide time
         *
         * @param {number} autoHideTime scroll bar auto hide state
         */
        setScrollBarAutoHideTime(autoHideTime: number): any

        /**
         * Set the scroll bar's color
         *
         * @param {cc.Color} color the scroll bar's color
         */
        setScrollBarColor(color: cc.Color): any

        /**
         * Toggle scroll bar enabled.
         *
         * @param {boolean} enabled True if enable scroll bar, false otherwise.
         */
        setScrollBarEnabled(enabled: boolean): any

        /**
         * Set the scroll bar's opacity
         *
         * @param {number} opacity the scroll bar's opacity
         */
        setScrollBarOpacity(opacity: number): any

        /**
         * Set the scroll bar positions from the left-bottom corner (horizontal) and right-top corner (vertical).
         *
         * @param {cc.Point} positionFromCorner The position from the left-bottom corner (horizontal) and right-top corner (vertical).
         */
        setScrollBarPositionFromCorner(positionFromCorner: cc.Point): any

        /**
         * Set the horizontal scroll bar position from left-bottom corner.
         *
         * @param {cc.Point} positionFromCorner The position from left-bottom corner
         */
        setScrollBarPositionFromCornerForHorizontal(positionFromCorner: cc.Point): any

        /**
         * Set the vertical scroll bar position from right-top corner.
         *
         * @param {cc.Point} positionFromCorner The position from right-top corner
         */
        setScrollBarPositionFromCornerForVertical(positionFromCorner: cc.Point): any

        /**
         * Set the scroll bar's width
         *
         * @param {number} width The scroll bar's width
         */
        setScrollBarWidth(width: number): any

        /**
         * Set the touch total time threshold
         *
         * @param {Number} touchTotalTimeThreshold
         */
        setTouchTotalTimeThreshold(touchTotalTimeThreshold: number): any

        /**
         * Immediately stops inner container scroll initiated by any of the "scrollTo*" member functions
         */
        stopAutoScroll(): any

        _topBoundary: number;
        _bottomBoundary: number;
        _leftBoundary: number;
        _rightBoundary: number;
        _direction: number;
        _autoScrolling: boolean;
        _autoScrollTargetDelta: cc.Point;
        _autoScrollAttenuate: boolean;
        _autoScrollStartPosition: cc.Point;
        _autoScrollTotalTime: number;
        _autoScrollAccumulatedTime: number;
        _autoScrollCurrentlyOutOfBoundary: boolean;
        _autoScrollBraking: boolean;
        _autoScrollBrakingStartPosition: cc.Point;
        _autoHideEnabled: boolean;
        autoHideTime: number;
        _autoHideRemainingTime: number;
        _outOfBoundaryAmountDirty: boolean;
        _scrollBarEnabled: boolean;
        // _verticalScrollBar: null,
        // _horizontalScrollBar: null,
        _outOfBoundaryAmount: cc.Point;
        _fltEqualZero(point: cc.Point): boolean;
        _isOutOfBoundary(dir);
        _dispatchEvent(event);
        // this._touchMoveDisplacements = [];
        // this._touchMoveTimeDeltas = [];
        // this._touchMovePreviousTimestamp = 0;

        _scrollViewEventListener: any;
        _scrollViewEventSelector: any;
        _getHowMuchOutOfBoundary(addition?): cc.Point;
        _startBounceBackIfNeeded();
        _flattenVectorByDirection(vector?): cc.Point;

        _processScrollEvent(...agrs);
        _processScrollingEvent();

        static MOVEDIR_TOP: 0;
        static MOVEDIR_BOTTOM: 1;
        static MOVEDIR_LEFT: 2;
        static MOVEDIR_RIGHT: 3;
    }

    export class PageView extends Layout {
        scrollToPage(n : number);
        getCurrentPageIndex();
    }
}