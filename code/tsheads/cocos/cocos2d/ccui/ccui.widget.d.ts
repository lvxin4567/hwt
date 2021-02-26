declare namespace ccui {
    export class LayoutParameter {
        // NONE, LINEAR, RELATIVE
        getMargin():{left:number,top:number,right:number,bottom:number};
        setMargin();
        getLayoutType():number;
        getGravity():number;
    }
    // namespace LayoutParameter{

    //    export enum Type{
    //     NONE = 0,
    //     LINEAR,
    //     RELATIVE
    //    }

    // }
    

    // class Node extends cc.Node{
    //     getPositionX():number;
    //     getPositionY():number;
    //     getPosition():cc.Point;
    // }

    class ProtectedNode extends cc.Node{
        getPositionX():number;
            getPositionY():number;
            getPosition():cc.Point;

    }

    interface IProtectedNode extends cc.INode{


    }

    interface IProtectedNodeOverrides {

    }
    export interface IWidget extends ccui.IProtectedNode {
        ctor(...arg: Array<any>);
       _inViewRect: boolean;
       _contentSize:cc.Size;
        actionTag: number

        bright: boolean

        enabled: boolean

        focused: boolean

        heightPercent: number

        name: string

        onFocusChanged: any

        onNextFocusedWidget: any

        sizeType: any

        touchEnabled: boolean

        updateEnabled: boolean

        widgetParent: ccui.Widget

        widgetType: any

        widthPercent: number

        xPercent: number

        yPercent: number

        addCCSEventListener(callback: Function): any

        addNode(node: cc.Node, zOrder: number, tag: number): any

        addTouchEventListener(selector: Function, target: object): any

        checkChildInfo(handleState: number, sender: ccui.Widget, touchPoint: cc.Point): any

        clippingParentAreaContainPoint(pt: cc.Point): boolean

        clone(): ccui.Widget

        didNotSelectSelf(): any

        dispatchFocusEvent(widgetLostFocus: ccui.Widget, widgetGetFocus: ccui.Widget): any

        findNextFocusedWidget(direction: any, current: any): any

        getBottomBoundary(): number

        getBottomInParent(): number

        getCallbackName(): string | null

        getCallbackType(): string | null

        getCurrentFocusedWidget(): any

        getCustomSize(): cc.Size

        getDescription(): string;

        getLayoutParameter(type: any): ccui.LayoutParameter

        getLayoutSize(): cc.Size

        getLeftBoundary(): number

        getLeftInParent(): number

        getNodeByTag(tag: number): cc.Node

        getNodes(): any[]

        getPositionPercent(): cc.Point

        getPositionType(): number

        getRightBoundary(): number

        getRightInParent(): number

        getSize(): cc.Size

        getSizePercent(): cc.Point

        getSizeType(): any

        getTopBoundary(): number

        getTopInParent(): number

        getTouchBeganPosition(): cc.Point

        getTouchEndPos(): cc.Point

        getTouchEndPosition(): cc.Point

        getTouchMovePos(): cc.Point

        getTouchMovePosition(): cc.Point

        getTouchStartPos(): cc.Point

        getVirtualRenderer(): ccui.Widget

        getVirtualRendererSize(): any

        getWidgetParent(): ccui.Widget | null

        getWidgetType(): any

        getWorldPosition(): cc.Point

        hitTest(pt: cc.Point): boolean

        ignoreContentAdaptWithSize(ignore: boolean): any

        init(): boolean

        interceptTouchEvent(eventType: number, sender: ccui.Widget, touch: cc.Touch): any

        isBright(): boolean

        isClippingParentContainsPoint(pt: cc.Point): boolean

        isEnabled(): boolean

        isFlippedX(): boolean

        isFlippedY(): boolean

        isFocused(): boolean

        isFocusEnabled(): boolean

        isHighlighted(): boolean

        isIgnoreContentAdaptWithSize(): boolean

        isLayoutComponentEnabled(): boolean

        isPropagateTouchEvents(): boolean

        isSwallowTouches(): boolean

        isTouchEnabled(): boolean

        isUnifySizeEnabled(): boolean

        onEnter(): any

        onExit(): any

        onFocusChange(widgetLostFocus: ccui.Widget, widgetGetFocus: ccui.Widget): any

        onTouchBegan(touch: cc.Touch, event: cc.Event): boolean

        onTouchCancelled(touchPoint: cc.Point): any

        onTouchEnded(touch: any, event: any): any

        onTouchLongClicked(touchPoint: cc.Point): any

        onTouchMoved(touch: cc.Touch, event: cc.Event): any

        removeAllNodes(): any

        removeNode(node: cc.Node, cleanup: boolean): any

        removeNodeByTag(tag: number, cleanup: boolean): any

        requestFocus(): any

        setBright(bright: boolean): any

        setBrightStyle(style: number): any

        setCallbackName(callbackName: string): any

        setCallbackType(callbackType: string): any

        setContentSize(contentSize: cc.Size | number, height: number): any

        setEnabled(enabled: boolean): any

        setFlippedX(flipX: boolean): any

        setFlippedY(flipY: boolean): any

        setFocused(focus: boolean): any

        setFocusEnabled(enable: boolean): any

        setHighlighted(highlight: any): any

        setLayoutComponentEnabled(enable: boolean): any

        setLayoutParameter(parameter: ccui.LayoutParameter): any

        setPosition(pos: cc.Point | number, posY: number): any

        setPositionPercent(percent: cc.Point): any

        setPositionType(type: number): any

        setPropagateTouchEvents(isPropagate: boolean): any

        setSize(size: cc.Size): any

        setSizePercent(percent: cc.Point): any

        setSizeType(type: any): any

        setSwallowTouches(swallow: boolean): any

        setTouchEnabled(enable: boolean): any

        setUnifySizeEnabled(enable: boolean): any

        updateSizeAndPosition(parentSize: cc.Size): any
    }
    export class Widget extends ProtectedNode implements IWidget {

        /**
         * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.
         */



        //扩展完结
        public ctor(...arg: Array<any>);

        getVirtualRenderer():cc.Node;
        /**
         * Light bright style of ccui.Widget.
         */
        static BRIGHT_STYLE_HIGH_LIGHT: any

        /**
         * None bright style of ccui.Widget.
         */
        static BRIGHT_STYLE_NONE: any

        /**
         * Normal bright style of ccui.Widget.
         */
        static BRIGHT_STYLE_NORMAL: any

        /**
         * The down of Focus direction for ccui.Widget
         */
        static DOWN: any

        /**
         * The left of Focus direction for ccui.Widget
         */
        static LEFT: any

        /**
         * The image file texture type of ccui.Widget loads.
         */
        static LOCAL_TEXTURE: any

        /**
         * The sprite frame texture type of ccui.Widget loads.
         */
        static PLIST_TEXTURE: any

        /**
         * The absolute of ccui.Widget's position type.
         */
        static POSITION_ABSOLUTE: any

        /**
         * The percent of ccui.Widget's position type.
         */
        static POSITION_PERCENT: any

        /**
         * The right of Focus direction for ccui.Widget
         */
        static RIGHT: any

        /**
         * The absolute of ccui.Widget's size type.
         */
        static SIZE_ABSOLUTE: any

        /**
         * The percent of ccui.Widget's size type.
         */
        static SIZE_PERCENT: any

        /**
         * The touch began type of ccui.Widget's touch event
         */
        static TOUCH_BEGAN: any

        /**
         * The touch canceled type of ccui.Widget's touch event
         */
        static TOUCH_CANCELED: any

        /**
         * The touch end type of ccui.Widget's touch event
         */
        static TOUCH_ENDED: any

        /**
         * The touch moved type of ccui.Widget's touch event
         */
        static TOUCH_MOVED: any

        /**
         * The type code of Container for ccui controls.
         */
        static TYPE_CONTAINER: any

        /**
         * The type code of Widget for ccui controls.
         */
        static TYPE_WIDGET: any

        /**
         * The up of Focus direction for ccui.Widget
         */
        static UP: any
       
        /**
         * allocates and initializes a UIWidget.
         *
         * @returns {ccui.Widget}
         */
        static create(...args): ccui.Widget

        /**
         * call this method with parameter true to enable the Android Dpad focus navigation feature
         *
         * @param {Boolean} enable set true to enable dpad focus navigation, otherwise disable dpad focus navigation
         */
        static enableDpadNavigation(enable: boolean): any

        /**
         * Gets the focused widget of current stage.
         *
         * @returns {null|ccui.Widget}
         */
        static getCurrentFocusedWidget(): null | ccui.Widget

        _contentSize:cc.Size;


        /**
         * - The action tag of the widget
         */
        actionTag: number

        /**
         * - Indicate whether the widget is bright
         */
        bright: boolean

        /**
         * - Indicate whether the widget is enabled
         */
        enabled: boolean

        /**
         * - Indicate whether the widget is focused
         */
        focused: boolean

        /**
         * - Height in percentage of parent height
         */
        heightPercent: number

        /**
         * - The name of the widget
         */
        name: string

        /**
         * When a widget lose/get focus, this method will be called. Be Caution when you provide your own version,
         * you must call widget.setFocused(true/false) to change the focus state of the current focused widget;
         */
        onFocusChanged: any

        /**
         * use this function to manually specify the next focused widget regards to each direction
         */
        onNextFocusedWidget: any

        /**
         * - The size type of the widget
         */
        sizeType: any

        /**
         * - Indicate whether touch events are enabled
         */
        touchEnabled: boolean

        /**
         * - Indicate whether the update function is scheduled
         */
        updateEnabled: boolean

        /**
         * - <@readonly> The direct parent when it's a widget also, otherwise equals null
         */
        widgetParent: ccui.Widget

        /**
         * - <@readonly> The type of the widget
         */
        widgetType: any

        /**
         * - Width in percentage of parent width
         */
        widthPercent: number

        /**
         * - Position x in percentage of width
         */
        xPercent: number

        /**
         * - Position y in percentage of height
         */
        yPercent: number

        /**
         * Set a event handler to the widget in order to use cocostudio editor and framework
         *
         * @param {function} callback
         */
        addCCSEventListener(callback: Function): any

        /**
         * Adds a node for widget (this function is deleted in -x)
         *
         * @param {cc.Node} node
         * @param {Number} zOrder
         * @param {Number} tag
         */
        addNode(node: cc.Node, zOrder: number, tag: number): any

        /**
         * Sets the touch event target/selector of the ccui.Widget
         *
         * @param {Function} selector
         * @param {Object} target
         */
        addTouchEventListener(selector: Function, target: object): any

        /**
         * Calls the checkChildInfo of widget's parent, its subclass will override it.
         *
         * @param {number} handleState
         * @param {ccui.Widget} sender
         * @param {cc.Point} touchPoint
         */
        checkChildInfo(handleState: number, sender: ccui.Widget, touchPoint: cc.Point): any

        /**
         * Checks a point if in parent's area.
         *
         * @param {cc.Point} pt
         *
         * @returns {Boolean}
         */
        clippingParentAreaContainPoint(pt: cc.Point): boolean

        /**
         * Clones a new widget.
         *
         * @returns {ccui.Widget}
         */
        clone(): ccui.Widget

        /**
         * A call back function when widget lost of focus.
         */
        didNotSelectSelf(): any

        /**
         * Dispatch a EventFocus through a EventDispatcher
         *
         * @param {ccui.Widget} widgetLostFocus
         * @param {ccui.Widget} widgetGetFocus
         */
        dispatchFocusEvent(widgetLostFocus: ccui.Widget, widgetGetFocus: ccui.Widget): any

        /**
         * When a widget is in a layout, you could call this method to get the next focused widget within a specified direction.
         * If the widget is not in a layout, it will return itself
         *
         * @param {any} direction the direction to look for the next focused widget in a layout
         * @param {any} current the current focused widget
         */
        findNextFocusedWidget(direction: any, current: any): any

        /**
         * Gets the bottom boundary position of this widget.
         *
         * @returns {number}
         */
        getBottomBoundary(): number

        /**
         * Gets the bottom boundary position of this widget.
         *
         * @returns {number}
         */
        getBottomInParent(): number

        /**
         * Gets callback name of widget
         *
         * @returns v3.3{String|Null}
         */
        getCallbackName(): string | null

        /**
         * Gets callback type of widget
         *
         * @returns v3.3{String|null}
         */
        getCallbackType(): string | null

        /**
         * no matter what widget object you call this method on , it will return you the exact one focused widget
         */
        getCurrentFocusedWidget(): any

        /**
         * Get custom size of ccui.Widget
         *
         * @returns {cc.Size}
         */
        getCustomSize(): cc.Size

        /**
         * Returns the "class name" of widget.
         *
         * @returns {string}
         */
        getDescription(): string

        /**
         * Gets layout parameter
         *
         * @param {ccui.LayoutParameter.NONE|ccui.LayoutParameter.LINEAR|ccui.LayoutParameter.RELATIVE} type
         *
         * @returns {ccui.LayoutParameter}
         */
        getLayoutParameter(type?: any): ccui.LayoutParameter

        /**
         * Gets layout size of ccui.Widget.
         *
         * @returns {cc.Size}
         */
        getLayoutSize(): cc.Size

        /**
         * Gets the left boundary position of this widget.
         *
         * @returns {number}
         */
        getLeftBoundary(): number

        /**
         * Gets the left boundary position of this widget.
         *
         * @returns {number}
         */
        getLeftInParent(): number

        /**
         * Gets node by tag
         *
         * @param {Number} tag
         *
         * @returns {cc.Node}
         */
        getNodeByTag(tag: number): cc.Node

        /**
         * Returns all children.
         *
         * @returns {Array}
         */
        getNodes(): any[]

        /**
         * Gets the percent (x,y) of the widget
         *
         * @returns {cc.Point} The percent (x,y) of the widget in OpenGL coordinates
         */
        getPositionPercent(): cc.Point

        /**
         * Gets the position type of the widget
         *
         * @returns {Number} the position type of widget
         */
        getPositionType(): number

        /**
         * Gets the right boundary position of this widget.
         *
         * @returns {number}
         */
        getRightBoundary(): number

        /**
         * Gets the right boundary position of this widget.
         *
         * @returns {number}
         */
        getRightInParent(): number

        /**
         * Returns size of widget
         *
         * @returns {cc.Size}
         */
        getSize(): cc.Size

        /**
         * Returns size percent of ccui.Widget
         *
         * @returns {cc.Point}
         */
        getSizePercent(): cc.Point

        /**
         * Gets the size type of widget.
         *
         * @returns {ccui.Widget.SIZE_ABSOLUTE|ccui.Widget.SIZE_PERCENT} that is widget's size type
         */
        getSizeType(): any

        /**
         * Gets the top boundary position of this widget.
         *
         * @returns {number}
         */
        getTopBoundary(): number

        /**
         * Gets the top boundary position of this widget.
         *
         * @returns {number}
         */
        getTopInParent(): number

        /**
         * Gets the position of touch began event.
         *
         * @returns {cc.Point}
         */
        getTouchBeganPosition(): cc.Point

        /**
         * Gets the touch end point of widget when widget is selected.
         *
         * @returns {cc.Point} the touch end point.
         */
        getTouchEndPos(): cc.Point

        /**
         * Gets the position of touch end event
         *
         * @returns {cc.Point}
         */
        getTouchEndPosition(): cc.Point

        /**
         * Gets the touch move point of widget when widget is selected.
         *
         * @returns {cc.Point} the touch move point.
         */
        getTouchMovePos(): cc.Point

        /**
         * Gets the position of touch moved event
         *
         * @returns {cc.Point}
         */
        getTouchMovePosition(): cc.Point

        /**
         * Gets the touch began point of widget when widget is selected.
         *
         * @returns {cc.Point} the touch began point.
         */
        getTouchStartPos(): cc.Point

        /**
         * Gets the Virtual Renderer of widget.
         *
         * @returns {ccui.Widget}
         */
        getVirtualRenderer(): ccui.Widget

        /**
         * Gets the content size of widget. Content size is widget's texture size.
         */
        getVirtualRendererSize(): any

        /**
         * The direct parent when it's a widget also, otherwise equals null
         *
         * @returns {ccui.Widget|null}
         */
        getWidgetParent(): ccui.Widget | null

        /**
         * get widget type
         *
         * @returns {ccui.Widget.TYPE_WIDGET|ccui.Widget.TYPE_CONTAINER}
         */
        getWidgetType(): any

        /**
         * Gets world position of ccui.Widget.
         *
         * @returns {cc.Point} world position of ccui.Widget.
         */
        getWorldPosition(): cc.Point

        /**
         * Checks a point if is in widget's space
         *
         * @param {cc.Point} pt
         *
         * @returns {boolean} true if the point is in widget's space, false otherwise.
         */
        hitTest(pt: cc.Point): boolean

        /**
         * Ignore the widget size
         *
         * @param {Boolean} ignore true that widget will ignore it's size, use texture size, false otherwise. Default value is true.
         */
        ignoreContentAdaptWithSize(ignore: boolean): any

        /**
         * initializes state of widget. please do not call this function by yourself, you should pass the parameters to constructor to initialize it .
          *
         * @returns {boolean}
         */
         init(): boolean
        
        interceptTouchEvent(eventType: number, sender: ccui.Widget, touch: cc.Touch): any;


        
    /**
         * Removes all node
         */
         emoveAllNodes(): any
        
    /**
         * Removes a node from ccui.Widget
         *
         * @param {cc.Node} node
         * @param {Boolean} cleanup
         */
         emoveNode(node: cc.Node, cleanup: boolean): any
        
    /**
         * Removes node by tag
         *
         * @param {Number} tag
         * @param {Boolean} cleanup
         */
         emoveNodeByTag(tag: number, cleanup: boolean): any
        
    /**
         * when a widget calls this method, it will get focus immediately.
         */
         equestFocus(): any
        
    /**
         * Sets whether the widget is bright. The default value is true, a widget is default to bright
         *
         * @param {Boolean} bright true if the widget is bright, false if the widget is dark.
         */
         etBright(bright: boolean): any
        
    /**
         * To set the bright style of ccui.Widget.
         *
         * @param {Number} style BRIGHT_NORMAL the widget is normal state, BRIGHT_HIGHLIGHT the widget is height light state.
         */
         etBrightStyle(style: number): any
        
    /**
         * Sets callback name to widget.
         *
         * @param {String} callbackName
         */
         etCallbackName(callbackName: string): any
        
    /**
         * Sets callback type to widget
         *
         * @param {String} callbackType
         */
         etCallbackType(callbackType: string): any
        
    /**
         * Sets _customSize of ccui.Widget, if ignoreSize is true, the content size is its renderer's contentSize, otherwise the content size is parameter.
         * and updates size percent by parent content size. At last, updates its children's size and position.
         *
         * @param {cc.Size|Number} contentSize content size or width of content size
         * @param {Number} height
         */
         etContentSize(contentSize: cc.Size | number , height?: number): any
        
    /**
         * Sets whether the widget is enabled
         * true if the widget is enabled, widget may be touched , false if the widget is disabled, widget cannot be touched.
         * The default value is true, a widget is default to enabled
         *
         * @param {Boolean} enabled
         */
         etEnabled(enabled: boolean): any
        
    /**
         * Sets whether the widget should be flipped horizontally or not.
         *
         * @param {Boolean} flipX true if the widget should be flipped horizontally, false otherwise.
         */
         etFlippedX(flipX: boolean): any
        
    /**
         * Sets whether the widget should be flipped vertically or not.
         *
         * @param {Boolean} flipY true if the widget should be flipped vertically, false otherwise.
         */
         etFlippedY(flipY: boolean): any
        
    /**
         * Sets whether the widget is on focused
         * The default value is false, a widget is default to not on focused
         *
         * @param {boolean} focus pass true to let the widget get focus or pass false to let the widget lose focus
         */
         etFocused(focus: boolean): any
        
    /**
         * sets whether the widget could accept focus.
         *
         * @param {Boolean} enable true represent the widget could accept focus, false represent the widget couldn't accept focus
         */
         etFocusEnabled(enable: boolean): any
        
    /**
         * Sets whether the widget is highlighted. The default value is false, a widget is default to not highlighted
         *
         * @param {any} highlight true if the widget is highlighted, false if the widget is not highlighted.
         */
         etHighlighted(highlight: any): any
        
    /**
         * Whether enable layout component of a widget
         *
         * @param {Boolean} enable enable layout Component of a widget
         */
         etLayoutComponentEnabled(enable: boolean): any
        
    /**
         * Gets LayoutParameter of widget.
         *
         * @param {ccui.LayoutParameter} parameter
         */
         etLayoutParameter(parameter: ccui.LayoutParameter): any
        
/**
         * Changes the position (x,y) of the widget .
         * The original point (0,0) is at the left-bottom corner of screen.
         *
         * @param {cc.Point|Number} pos
         * @param {Number} posY
         */
         etPosition(pos: cc.Point | number, posY: number): any
        
    /**
         * Changes the position (x,y) of the widget
         *
         * @param {cc.Point} percent
         */
         etPositionPercent(percent: cc.Point): any
        
    /**
         * Changes the position type of the widget
         *
         * @param {Number} type the position type of widget
         */
         etPositionType(type: number): any
         
         
         isBright(): boolean

         isClippingParentContainsPoint(pt: cc.Point): boolean
 
         isEnabled(): boolean
 
         isFlippedX(): boolean
 
         isFlippedY(): boolean
 
         isFocused(): boolean
 
         isFocusEnabled(): boolean
 
         isHighlighted(): boolean
 
         isIgnoreContentAdaptWithSize(): boolean
 
         isLayoutComponentEnabled(): boolean
 
         isPropagateTouchEvents(): boolean
 
         isSwallowTouches(): boolean
 
         isTouchEnabled(): boolean
 
         isUnifySizeEnabled(): boolean



         onFocusChange(widgetLostFocus: ccui.Widget, widgetGetFocus: ccui.Widget): any

         onTouchBegan(touch: cc.Touch, event: cc.Event): boolean
 
         onTouchCancelled(touchPoint: cc.Point): any
 
         onTouchEnded(touch: any, event: any): any
 
         onTouchLongClicked(touchPoint: cc.Point): any
 
         onTouchMoved(touch: cc.Touch, event: cc.Event): any
 
         removeAllNodes(): any

    /**
         * Allow widget touch events to propagate to its parents. Set false will disable propagation
         *
         * @param {Boolean} isPropagate
         */
         etPropagateTouchEvents(isPropagate: boolean): any
        
    /**
         * Changes the size that is widget's size
         *
         * @param {cc.Size} size that is widget's size
         */
         etSize(size: cc.Size): any
        
    /**
         * Changes the percent that is widget's percent size
         *
         * @param {cc.Point} percent that is widget's percent size, width and height value from 0 to 1.
         */
         etSizePercent(percent: cc.Point): any
        
    /**
         * TEXTURE_RES_TYPE
         * Changes the size type of widget.
         *
         * @param {ccui.Widget.SIZE_ABSOLUTE|ccui.Widget.SIZE_PERCENT} type that is widget's size type
         */
         etSizeType(type: any): any
        
    /**
         * Specify widget to swallow touches or not
         *
         * @param {Boolean} swallow
         */
         etSwallowTouches(swallow: boolean): any
        
    /**
         * Sets whether the widget is touch enabled. The default value is false, a widget is default to touch disabled
         *
         * @param {Boolean} enable true if the widget is touch enabled, false if the widget is touch disabled.
         */
         etTouchEnabled(enable: boolean): any
        
    /**
         *
         *
         * @param {Boolean} enable enable Unify Size of a widget
         */
         etUnifySizeEnabled(enable: boolean): any
        
    /**
          * updates its size by size type and its position by position type.
          *
          * @param {cc.Size} parentSize parent size
          */
         updateSizeAndPosition(parentSize: cc.Size): any




         addCCSEventListener(callback: Function): any

         addNode(node: cc.Node, zOrder: number, tag: number): any
 
         addTouchEventListener(selector: Function, target: object): any
 
         checkChildInfo(handleState: number, sender: ccui.Widget, touchPoint: cc.Point): any
 
         clippingParentAreaContainPoint(pt: cc.Point): boolean
 
         clone(): ccui.Widget
 
         didNotSelectSelf(): any
 
         dispatchFocusEvent(widgetLostFocus: ccui.Widget, widgetGetFocus: ccui.Widget): any
 
         findNextFocusedWidget(direction: any, current: any): any
 
         getBottomBoundary(): number
 
         getBottomInParent(): number
 
         getCallbackName(): string | null
 
         getCallbackType(): string | null
 
         getCurrentFocusedWidget(): any
 
         getCustomSize(): cc.Size
 
         getDescription(): string;
 
         getLayoutParameter(type: any): ccui.LayoutParameter
 
         getLayoutSize(): cc.Size
 
         getLeftBoundary(): number
 
         getLeftInParent(): number
 
         getNodeByTag(tag: number): cc.Node
 
         getNodes(): any[]
 
         getPositionPercent(): cc.Point
 
         getPositionType(): number
 
         getRightBoundary(): number
 
         getRightInParent(): number
 
         getSize(): cc.Size
 
         getSizePercent(): cc.Point
 
         getSizeType(): any
 
         getTopBoundary(): number
 
         getTopInParent(): number
 
         getTouchBeganPosition(): cc.Point
 
         getTouchEndPos(): cc.Point
 
         getTouchEndPosition(): cc.Point
 
         getTouchMovePos(): cc.Point
 
         getTouchMovePosition(): cc.Point
 
         getTouchStartPos(): cc.Point
 
         getVirtualRenderer(): ccui.Widget
 
         getVirtualRendererSize(): any
 
         getWidgetParent(): ccui.Widget | null
 
         getWidgetType(): any
 
         getWorldPosition(): cc.Point
 
         hitTest(pt: cc.Point): boolean
 
         ignoreContentAdaptWithSize(ignore: boolean): any
 
         init(): boolean
 
         interceptTouchEvent(eventType: number, sender: ccui.Widget, touch: cc.Touch): any
 
         isBright(): boolean
 
         isClippingParentContainsPoint(pt: cc.Point): boolean
 
         isEnabled(): boolean
 
         isFlippedX(): boolean
 
         isFlippedY(): boolean
 
         isFocused(): boolean
 
         isFocusEnabled(): boolean
 
         isHighlighted(): boolean
 
         isIgnoreContentAdaptWithSize(): boolean
 
         isLayoutComponentEnabled(): boolean
 
         isPropagateTouchEvents(): boolean
 
         isSwallowTouches(): boolean
 
         isTouchEnabled(): boolean
 
         isUnifySizeEnabled(): boolean
 
         onEnter(): any
 
         onExit(): any
 
         onFocusChange(widgetLostFocus: ccui.Widget, widgetGetFocus: ccui.Widget): any
 
         onTouchBegan(touch: cc.Touch, event: cc.Event): boolean
 
         onTouchCancelled(touchPoint: cc.Point): any
 
         onTouchEnded(touch: any, event: any): any
 
         onTouchLongClicked(touchPoint: cc.Point): any
 
         onTouchMoved(touch: cc.Touch, event: cc.Event): any
 
         removeAllNodes(): any
 
         removeNode(node: cc.Node, cleanup: boolean): any
 
         removeNodeByTag(tag: number, cleanup: boolean): any
 
         requestFocus(): any
 
         setBright(bright: boolean): any
 
         setBrightStyle(style: number): any
 
         setCallbackName(callbackName: string): any
 
         setCallbackType(callbackType: string): any
 
         setContentSize(contentSize: cc.Size | number, height?: number): any
 
         setEnabled(enabled: boolean): any
 
         setFlippedX(flipX: boolean): any
 
         setFlippedY(flipY: boolean): any
 
         setFocused(focus: boolean): any
 
         setFocusEnabled(enable: boolean): any
 
         setHighlighted(highlight: any): any
 
         setLayoutComponentEnabled(enable: boolean): any
 
         setLayoutParameter(parameter: ccui.LayoutParameter): any
 
         setPosition(pos: cc.Point | number, posY?: number): any
 
         setPositionPercent(percent: cc.Point): any
 
         setPositionType(type: number): any
 
         setPropagateTouchEvents(isPropagate: boolean): any
 
         setSize(size: cc.Size): any
 
         setSizePercent(percent: cc.Point): any
 
         setSizeType(type: any): any
 
         setSwallowTouches(swallow: boolean): any
 
         setTouchEnabled(enable: boolean): any
 
         setUnifySizeEnabled(enable: boolean): any
 
         updateSizeAndPosition(parentSize: cc.Size): any;

         _inViewRect: boolean;
  }

}