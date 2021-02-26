declare namespace ccui {

    interface IButton extends IWidget {

        pressedActionEnabled: boolean
    
        titleFont: string
    
        titleFontColor: cc.Color
    
        titleFontName: string
    
        titleFontSize: number
    
        titleText: string
    
        getCapInsetsDisabledRenderer(): cc.Rect
    
        getCapInsetsNormalRenderer(): cc.Rect
    
        getCapInsetsPressedRenderer(): cc.Rect
    
        getNormalTextureSize(): cc.Size
    
        getTitleColor(): cc.Color
    
        getTitleFontName(): string
    
        getTitleFontSize(): number
    
        getTitleRenderer(): cc.LabelTTF
    
        getTitleText(): string
    
        getZoomScale(): number
    
        isScale9Enabled(): boolean
    
        loadTextureDisabled(disabled: string, texType: any): any
    
        loadTextureNormal(normal: string, texType: any): any
    
        loadTexturePressed(selected: string, texType: any): any
    
        loadTextures(normal: string, selected: string, disabled: string, texType: any): any
    
        setCapInsets(capInsets: cc.Rect): any
    
        setCapInsetsDisabledRenderer(capInsets: cc.Rect): any
    
        setCapInsetsNormalRenderer(capInsets: cc.Rect): any
    
        setCapInsetsPressedRenderer(capInsets: cc.Rect): any
    
        setPressedActionEnabled(enabled: boolean): any
    
        setScale9Enabled(able: boolean): any
    
        setTitleColor(color: cc.Color): any
    
        setTitleFontName(fontName: string): any
    
        setTitleFontSize(size: cc.Size): any
    
        setTitleText(text: string): any
    
        setZoomScale(scale: any): any
      }
    
      interface IButtonOverrides {
    
        getDescription(): string
    
        getVirtualRenderer(): cc.Node
    
        getVirtualRendererSize(): cc.Size
    
        ignoreContentAdaptWithSize(ignore: boolean): any
      }
    


      class Button extends Widget implements IButton, IButtonOverrides {
        
        //扩展完结
        /**
         * Allocates and initializes a UIButton.
         * Constructor of ccui.Button. override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.
         *
         * @param {String} normalImage
         * @param {String} selectedImage
         * @param {String} disableImage
         * @param {Number} texType
         */
       // constructor(normalImage: string, selectedImage: string, disableImage: string, texType: number)
    
        ctor();
    
        /**
         * The disabled renderer's zOrder value of ccui.Button.
         */
        static DISABLED_RENDERER_ZORDER: any
    
        /**
         * The normal renderer's zOrder value of ccui.Button.
         */
        static NORMAL_RENDERER_ZORDER: any
    
        /**
         * The pressed renderer's zOrder value ccui.Button.
         */
        static PRESSED_RENDERER_ZORDER: any
    
        /**
         * The title renderer's zOrder value of ccui.Button.
         */
        static TITLE_RENDERER_ZORDER: any
    
        /**
         * the zoom action time step of ccui.Button
         */
        static ZOOM_ACTION_TIME_STEP: any
    
        /**
         * allocates and initializes a UIButton.
         *
         * @param {string} normalImage normal state texture name
         * @param {string} selectedImage selected state texture name
         * @param {string} disableImage disabled state texture name
         * @param {string} texType
         *
         * @returns {ccui.Button}
         */
        static create(normalImage?: string, selectedImage?: string, disableImage?: string, texType?: string): ccui.Button
    
    
        /**
         * Returns the "class name" of widget.
         *
         * @returns {string}
         */
        getDescription(): string
    
        /**
         * Gets the Virtual Renderer of widget.
         *
         * @returns {cc.Node}
         */
        getVirtualRenderer(): cc.Node
    
        /**
         * Returns the renderer size.
         *
         * @returns {cc.Size}
         */
        getVirtualRendererSize(): cc.Size
    
        /**
         * Sets whether ignore the widget size
         *
         * @param {Boolean} ignore true that widget will ignore it's size, use texture size, false otherwise. Default value is true.
         */
        ignoreContentAdaptWithSize(ignore: boolean): any
    
    
        /**
         * - Indicate whether button has zoom effect when clicked
         */
        pressedActionEnabled: boolean
    
        /**
         * - The content string font of the button title
         */
        titleFont: string
    
        /**
         * - The content string font color of the button title
         */
        titleFontColor: cc.Color
    
        /**
         * - The content string font name of the button title
         */
        titleFontName: string
    
        /**
         * - The content string font size of the button title
         */
        titleFontSize: number
    
        /**
         * - The content string of the button title
         */
        titleText: string
    
        /**
         * Returns disable renderer cap insets.
         *
         * @returns {cc.Rect}
         */
        getCapInsetsDisabledRenderer(): cc.Rect
    
        /**
         * Returns normal renderer cap insets.
         *
         * @returns {cc.Rect}
         */
        getCapInsetsNormalRenderer(): cc.Rect
    
        /**
         * Returns pressed renderer cap insets.
         *
         * @returns {cc.Rect}
         */
        getCapInsetsPressedRenderer(): cc.Rect
    
        /**
         * Returns the normalize of texture size
         *
         * @returns v3.3{cc.Size}
         */
        getNormalTextureSize(): cc.Size
    
        /**
         * Returns title color of ccui.Button
         *
         * @returns {cc.Color}
         */
        getTitleColor(): cc.Color
    
        /**
         * Gets title fontName of ccui.Button.
         *
         * @returns {String}
         */
        getTitleFontName(): string
    
        /**
         * Returns title fontSize of ccui.Button.
         *
         * @returns {Number}
         */
        getTitleFontSize(): number
    
        /**
         * Get the title renderer.
         * title ttf object.
         *
         * @returns {cc.LabelTTF}
         */
        getTitleRenderer(): cc.LabelTTF
    
        /**
         * Returns title text of ccui.Button
         *
         * @returns {String} text
         */
        getTitleText(): string
    
        /**
         * Returns a zoom scale
         *
         * @returns v3.2{number}
         */
        getZoomScale(): number
    
        /**
         * Returns button is using scale9 renderer or not.
         *
         * @returns {Boolean}
         */
        isScale9Enabled(): boolean
    
        /**
         * Load dark state texture for button.
         *
         * @param {String} disabled disabled state of texture's filename.
         * @param {ccui.Widget.LOCAL_TEXTURE|ccui.Widget.PLIST_TEXTURE} texType
         */
        loadTextureDisabled(disabled: string, texType: any): any
    
        /**
         * Load normal state texture for button.
         *
         * @param {String} normal normal state of texture's filename.
         * @param {ccui.Widget.LOCAL_TEXTURE|ccui.Widget.PLIST_TEXTURE} texType
         */
        loadTextureNormal(normal: string, texType: any): any
    
        /**
         * Load selected state texture for button.
         *
         * @param {String} selected selected state of texture's filename.
         * @param {ccui.Widget.LOCAL_TEXTURE|ccui.Widget.PLIST_TEXTURE} texType
         */
        loadTexturePressed(selected: string, texType: any): any
    
        /**
         * Load textures for button.
         *
         * @param {String} normal normal state of texture's filename.
         * @param {String} selected selected state of texture's filename.
         * @param {String} disabled disabled state of texture's filename.
         * @param {ccui.Widget.LOCAL_TEXTURE|ccui.Widget.PLIST_TEXTURE} texType
         */
        loadTextures(normal: string, selected: string, disabled: string, texType: any): any
    
        /**
         * Sets capinsets for button, if button is using scale9 renderer.
         *
         * @param {cc.Rect} capInsets
         */
        setCapInsets(capInsets: cc.Rect): any
    
        /**
         * Sets capinsets for button, if button is using scale9 renderer.
         *
         * @param {cc.Rect} capInsets
         */
        setCapInsetsDisabledRenderer(capInsets: cc.Rect): any
    
        /**
         * Sets capinsets for button, if button is using scale9 renderer.
         *
         * @param {cc.Rect} capInsets
         */
        setCapInsetsNormalRenderer(capInsets: cc.Rect): any
    
        /**
         * Sets capinsets for button, if button is using scale9 renderer.
         *
         * @param {cc.Rect} capInsets
         */
        setCapInsetsPressedRenderer(capInsets: cc.Rect): any
    
        /**
         * Changes if button can be clicked zoom effect.
         *
         * @param {Boolean} enabled
         */
        setPressedActionEnabled(enabled: boolean): any
    
        /**
         * Sets if button is using scale9 renderer.
         *
         * @param {Boolean} able true that using scale9 renderer, false otherwise.
         */
        setScale9Enabled(able: boolean): any
    
        /**
         * Sets title color to ccui.Button.
         *
         * @param {cc.Color} color
         */
        setTitleColor(color: cc.Color): any
    
        /**
         * Sets title fontName to ccui.Button.
         *
         * @param {String} fontName
         */
        setTitleFontName(fontName: string): any
    
        /**
         * Sets title fontSize to ccui.Button
         *
         * @param {cc.Size} size
         */
        setTitleFontSize(size: cc.Size): any
    
        /**
         * Sets title text to ccui.Button
         *
         * @param {String} text
         */
        setTitleText(text: string): any
    
        /**
         * When user pressed the button, the button will zoom to a scale.
         * The final scale of the button equals (button original scale + _zoomScale)
         *
         * @param {any} scale
         */
        setZoomScale(scale: any): any
    
    
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
        getLayoutParameter(type: any): ccui.LayoutParameter
    
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
    
        /**
         * Sends the touch event to widget's parent, its subclass will override it, e.g. ccui.ScrollView, ccui.PageView
         *
         * @param {Number} eventType
         * @param {ccui.Widget} sender
         * @param {cc.Touch} touch
         */
        interceptTouchEvent(eventType: number, sender: ccui.Widget, touch: cc.Touch): any
    
        /**
         * Determines if the widget is bright
         *
         * @returns {boolean} true if the widget is bright, false if the widget is dark.
         */
        isBright(): boolean
    
        /**
         * returns whether clipping parent widget contains point.
         *
         * @param {cc.Point} pt location point
         *
         * @returns {Boolean}
         */
        isClippingParentContainsPoint(pt: cc.Point): boolean
    
        /**
         * Determines if the widget is enabled
         *
         * @returns {boolean}
         */
        isEnabled(): boolean
    
        /**
         * Returns the flag which indicates whether the widget is flipped horizontally or not.
         * It only flips the texture of the widget, and not the texture of the widget's children.
         * Also, flipping the texture doesn't alter the anchorPoint.
         * If you want to flip the anchorPoint too, and/or to flip the children too use:
         * widget.setScaleX(sprite.getScaleX() * -1);
         *
         * @returns {Boolean} true if the widget is flipped horizontally, false otherwise.
         */
        isFlippedX(): boolean
    
        /**
         * Return the flag which indicates whether the widget is flipped vertically or not.
         * It only flips the texture of the widget, and not the texture of the widget's children.
         * Also, flipping the texture doesn't alter the anchorPoint.
         * If you want to flip the anchorPoint too, and/or to flip the children too use:
         * widget.setScaleY(widget.getScaleY() * -1);
         *
         * @returns {Boolean} true if the widget is flipped vertically, false otherwise.
         */
        isFlippedY(): boolean
    
        /**
         * Determines if the widget is on focused
         *
         * @returns {boolean} whether the widget is focused or not
         */
        isFocused(): boolean
    
        /**
         * returns whether the widget could accept focus.
         *
         * @returns {boolean} true represent the widget could accept focus, false represent the widget couldn't accept focus
         */
        isFocusEnabled(): boolean
    
        /**
         * Determines if the widget is highlighted
         *
         * @returns {boolean} true if the widget is highlighted, false if the widget is not highlighted .
         */
        isHighlighted(): boolean
    
        /**
         * Gets whether ignore the content size (custom size)
         *
         * @returns {boolean} true that widget will ignore it's size, use texture size, false otherwise.
         */
        isIgnoreContentAdaptWithSize(): boolean
    
        /**
         * Returns whether enable layout component of a widget
         *
         * @returns {Boolean} true represent the widget use Layout Component, false represent the widget couldn't use Layout Component.
         */
        isLayoutComponentEnabled(): boolean
    
        /**
         * Return whether the widget is propagate touch events to its parents or not
         *
         * @returns v3.2{boolean}
         */
        isPropagateTouchEvents(): boolean
    
        /**
         * Return whether the widget is swallowing touch or not
         *
         * @returns v3.2{boolean}
         */
        isSwallowTouches(): boolean
    
        /**
         * Returns whether or not touch is enabled.
         *
         * @returns {boolean} true if the widget is touch enabled, false if the widget is touch disabled.
         */
        isTouchEnabled(): boolean
    
        /**
         *
         *
         * @returns v3.2{boolean} true represent the widget use Unify Size, false represent the widget couldn't use Unify Size
         */
        isUnifySizeEnabled(): boolean
    
        /**
         * Calls updateSizeAndPosition and its parent's onEnter
         */
        onEnter(): any
    
        /**
         * Calls unscheduleUpdate and its parent's onExit
         */
        onExit(): any
    
        /**
         * This method is called when a focus change event happens
         *
         * @param {ccui.Widget} widgetLostFocus
         * @param {ccui.Widget} widgetGetFocus
         */
        onFocusChange(widgetLostFocus: ccui.Widget, widgetGetFocus: ccui.Widget): any
    
        /**
         * The callback of touch began event.
         * If the bounding box of ccui.Widget contains the touch point, it will do the following things:
         * 1. sets highlight state,
         * 2. sends event to parent widget by interceptTouchEvent
         * 3. calls the callback of touch began event.
         * 4. returns true,
         * otherwise returns false directly.
         *
         * @param {cc.Touch} touch
         * @param {cc.Event} event
         *
         * @returns {boolean}
         */
        onTouchBegan(touch: cc.Touch, event: cc.Event): boolean
    
        /**
         * A call back function called when widget is selected, and on touch canceled.
         *
         * @param {cc.Point} touchPoint
         */
        onTouchCancelled(touchPoint: cc.Point): any
    
        /**
         * The callback of touch end event
         * It sends event to parent widget by interceptTouchEvent,
         * calls the callback of touch end event (highlight= true) or touch canceled event (highlight= false).
         * sets the highlight state to false ,
         *
         * @param {any} touch
         * @param {any} event
         */
        onTouchEnded(touch: any, event: any): any
    
        /**
         * A call back function called when widget is selected, and on touch long clicked.
         *
         * @param {cc.Point} touchPoint
         */
        onTouchLongClicked(touchPoint: cc.Point): any
    
        /**
         * The callback of touch moved event.
         * It sets the highlight state by touch, sends event to parent widget by interceptTouchEvent and calls the callback of touch moved event.
         *
         * @param {cc.Touch} touch
         * @param {cc.Event} event
         */
        onTouchMoved(touch: cc.Touch, event: cc.Event): any
    
        /**
         * Removes all node
         */
        removeAllNodes(): any
    
        /**
         * Removes a node from ccui.Widget
         *
         * @param {cc.Node} node
         * @param {Boolean} cleanup
         */
        removeNode(node: cc.Node, cleanup: boolean): any
    
        /**
         * Removes node by tag
         *
         * @param {Number} tag
         * @param {Boolean} cleanup
         */
        removeNodeByTag(tag: number, cleanup: boolean): any
    
        /**
         * when a widget calls this method, it will get focus immediately.
         */
        requestFocus(): any
    
        /**
         * Sets whether the widget is bright. The default value is true, a widget is default to bright
         *
         * @param {Boolean} bright true if the widget is bright, false if the widget is dark.
         */
        setBright(bright: boolean): any
    
        /**
         * To set the bright style of ccui.Widget.
         *
         * @param {Number} style BRIGHT_NORMAL the widget is normal state, BRIGHT_HIGHLIGHT the widget is height light state.
         */
        setBrightStyle(style: number): any
    
        /**
         * Sets callback name to widget.
         *
         * @param {String} callbackName
         */
        setCallbackName(callbackName: string): any
    
        /**
         * Sets callback type to widget
         *
         * @param {String} callbackType
         */
        setCallbackType(callbackType: string): any
    
        /**
         * Sets _customSize of ccui.Widget, if ignoreSize is true, the content size is its renderer's contentSize, otherwise the content size is parameter.
         * and updates size percent by parent content size. At last, updates its children's size and position.
         *
         * @param {cc.Size|Number} contentSize content size or width of content size
         * @param {Number} height
         */
        setContentSize(contentSize: cc.Size | number, height: number): any
    
        /**
         * Sets whether the widget is enabled
         * true if the widget is enabled, widget may be touched , false if the widget is disabled, widget cannot be touched.
         * The default value is true, a widget is default to enabled
         *
         * @param {Boolean} enabled
         */
        setEnabled(enabled: boolean): any
    
        /**
         * Sets whether the widget should be flipped horizontally or not.
         *
         * @param {Boolean} flipX true if the widget should be flipped horizontally, false otherwise.
         */
        setFlippedX(flipX: boolean): any
    
        /**
         * Sets whether the widget should be flipped vertically or not.
         *
         * @param {Boolean} flipY true if the widget should be flipped vertically, false otherwise.
         */
        setFlippedY(flipY: boolean): any
    
        /**
         * Sets whether the widget is on focused
         * The default value is false, a widget is default to not on focused
         *
         * @param {boolean} focus pass true to let the widget get focus or pass false to let the widget lose focus
         */
        setFocused(focus: boolean): any
    
        /**
         * sets whether the widget could accept focus.
         *
         * @param {Boolean} enable true represent the widget could accept focus, false represent the widget couldn't accept focus
         */
        setFocusEnabled(enable: boolean): any
    
        /**
         * Sets whether the widget is highlighted. The default value is false, a widget is default to not highlighted
         *
         * @param {any} highlight true if the widget is highlighted, false if the widget is not highlighted.
         */
        setHighlighted(highlight: any): any
    
        /**
         * Whether enable layout component of a widget
         *
         * @param {Boolean} enable enable layout Component of a widget
         */
        setLayoutComponentEnabled(enable: boolean): any
    
        /**
         * Gets LayoutParameter of widget.
         *
         * @param {ccui.LayoutParameter} parameter
         */
        setLayoutParameter(parameter: ccui.LayoutParameter): any
    
        /**
         * Changes the position (x,y) of the widget .
         * The original point (0,0) is at the left-bottom corner of screen.
         *
         * @param {cc.Point|Number} pos
         * @param {Number} posY
         */
        setPosition(pos: cc.Point | number, posY?: number): any
    
        /**
         * Changes the position (x,y) of the widget
         *
         * @param {cc.Point} percent
         */
        setPositionPercent(percent: cc.Point): any
    
        /**
         * Changes the position type of the widget
         *
         * @param {Number} type the position type of widget
         */
        setPositionType(type: number): any
    
        /**
         * Allow widget touch events to propagate to its parents. Set false will disable propagation
         *
         * @param {Boolean} isPropagate
         */
        setPropagateTouchEvents(isPropagate: boolean): any
    
        /**
         * Changes the size that is widget's size
         *
         * @param {cc.Size} size that is widget's size
         */
        setSize(size: cc.Size): any
    
        /**
         * Changes the percent that is widget's percent size
         *
         * @param {cc.Point} percent that is widget's percent size, width and height value from 0 to 1.
         */
        setSizePercent(percent: cc.Point): any
    
        /**
         * TEXTURE_RES_TYPE
         * Changes the size type of widget.
         *
         * @param {ccui.Widget.SIZE_ABSOLUTE|ccui.Widget.SIZE_PERCENT} type that is widget's size type
         */
        setSizeType(type: any): any
    
        /**
         * Specify widget to swallow touches or not
         *
         * @param {Boolean} swallow
         */
        setSwallowTouches(swallow: boolean): any
    
        /**
         * Sets whether the widget is touch enabled. The default value is false, a widget is default to touch disabled
         *
         * @param {Boolean} enable true if the widget is touch enabled, false if the widget is touch disabled.
         */
        setTouchEnabled(enable: boolean): any
    
        /**
         *
         *
         * @param {Boolean} enable enable Unify Size of a widget
         */
        setUnifySizeEnabled(enable: boolean): any
    
        /**
         * updates its size by size type and its position by position type.
         *
         * @param {cc.Size} parentSize parent size
         */
        updateSizeAndPosition(parentSize: cc.Size): any
    
      }


}