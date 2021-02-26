/****************************************************************************
 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2014 Chukong Technologies Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

/**
 * ccui.RichElement is the base class of RichElementText, RichElementImage etc. It has type, tag, color and opacity attributes.
 * @class
 * @extends ccui.Class
 */
declare namespace ccui {

    // ccui.RichElement = ccui.Class.extend(/** @lends ccui.RichElement# */{
    class RichElement extends ccui.Widget {
        _type;
        _tag;
        _color;
        _opacity;
        /**
         * Constructor of ccui.RichElement
         */
        ctor(...args);


        // Constants
        //Rich element type
        /**
         * The text type of rich element.
         * @constant
         * @type {number}
         */
        static TEXT: 0;
        /**
         * The image type of rich element.
         * @constant
         * @type {number}
         */
        static IMAGE: 1;
        /**
         * The custom type of rich element.
         * @constant
         * @type {number}
         */
        static CUSTOM: 2;
    }

    /**
     * The text element for RichText, it has text, fontName, fontSize attributes.
     * @class
     * @extends ccui.RichElement
     */
    // ccui.RichElementText = ccui.RichElement.extend(/** @lends ccui.RichElementText# */{
    class RichElementText extends ccui.RichElement {
        _text: "";
        _fontName: "";
        _fontSize;
        /** @type cc.FontDefinition */
        _fontDefinition: null;
        /**
         * Usage Example using FontDefinition:
         *
         * var rtEl  = new ccui.RichElementText("tag", new cc.FontDefinition({
         *                              fillStyle: cc.color.BLACK,
         *                              fontName: "Arial",
         *                              fontSize: 12,
         *                              fontWeight: "bold",
         *                              fontStyle: "normal",
         *                              lineHeight: 14
         *                          }), 255, "Some Text");
         *
         * Constructor of ccui.RichElementText
         * @param {Number} tag
         * @param {cc.Color|cc.FontDefinition} colorOrFontDef
         * @param {Number} opacity
         * @param {String} text
         * @param {String} fontName
         * @param {Number} fontSize
         */
        ctor(tag: number, colorOrFontDef: cc.Color | cc.FontDefinition, opacity: number, text: string, fontName: string, fontSize: number);

        /**
         * Create a richElementText
         * @deprecated since v3.0, please use new ccui.RichElementText() instead.
         * @param {Number} tag
         * @param {cc.Color} color
         * @param {Number} opacity
         * @param {String} text
         * @param {String} fontName
         * @param {Number} fontSize
         * @returns {ccui.RichElementText}
         */
        static create(tag: number, colorOrFontDef: cc.Color | cc.FontDefinition, opacity: number, text: string, fontName: string, fontSize: number);
    }

    /**
     * The image element for RichText, it has filePath, textureRect, textureType attributes.
     * @class
     * @extends ccui.RichElement
     */
    // ccui.RichElementImage = ccui.RichElement.extend(/** @lends ccui.RichElementImage# */{
    class RichElementImage extends ccui.RichElement {
        _filePath;
        _textureRect;
        _textureType;

        /**
         * Constructor of ccui.RichElementImage
         * @param {Number} tag
         * @param {cc.Color} color
         * @param {Number} opacity
         * @param {String} filePath
         */
        ctor(tag: Number, color: cc.Color, opacity: number, filePath: String);

        /**
         * Create a richElementImage
         * @deprecated since v3.0, please use new ccui.RichElementImage() instead.
         * @param {Number} tag
         * @param {cc.Color} color
         * @param {Number} opacity
         * @param {String} filePath
         * @returns {ccui.RichElementImage}
         */
        static create(tag, color, opacity, filePath);
    }

    /**
     * The custom node element for RichText.
     * @class
     * @extends ccui.RichElement
     */
    // ccui.RichElementCustomNode = ccui.RichElement.extend(/** @lends ccui.RichElementCustomNode# */{
    class RichElementCustomNode extends ccui.RichElement {
        _customNode;

        /**
         * Constructor of ccui.RichElementCustomNode
         * @param {Number} tag
         * @param {cc.Color} color
         * @param {Number} opacity
         * @param {cc.Node} customNode
         */
        ctor(tag, color, opacity, customNode);


        /**
         * Create a richElementCustomNode
         * @deprecated since v3.0, please use new ccui.RichElementCustomNode() instead.
         * @param {Number} tag
         * @param {Number} color
         * @param {Number} opacity
         * @param {cc.Node} customNode
         * @returns {ccui.RichElementCustomNode}
         */
        static create(tag, color, opacity, customNode);
    }
    /**
     * The rich text control of Cocos UI. It receives text, image, and custom node as its children to display.
     * @class
     * @extends ccui.Widget
     */
    // ccui.RichText = ccui.Widget.extend(/** @lends ccui.RichText# */{
    class RichText extends ccui.Widget {
        _formatTextDirty;
        _richElements;
        _elementRenders;
        _leftSpaceWidth;
        _verticalSpace;
        _elementRenderersContainer;
        _lineBreakOnSpace;
        _textHorizontalAlignment;
        _textVerticalAlignment;

        /**
         * create a rich text
         * Constructor of ccui.RichText. override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function.
         * @example
         * var uiRichText = new ccui.RichTex();
         */
        ctor();

        _initRenderer();

        /**
         * Insert a element
         * @param {ccui.RichElement} element
         * @param {Number} index
         */
        insertElement(element: ccui.RichElement, index: number);

        /**
         * Push a element
         * @param {ccui.RichElement} element
         */
        pushBackElement(element: ccui.RichElement);

        /**
         * Remove element
         * @param {ccui.RichElement} element
         */
        removeElement(element: ccui.RichElement);
        /**
         * Formats the richText's content.
         */
        formatText()
        /**
         * Prepare the child LabelTTF based on line breaking
         * @param {String} text
         * @param {String|cc.FontDefinition} fontNameOrFontDef
         * @param {Number} fontSize
         * @param {cc.Color} color
         * @private
         */
        _handleTextRenderer(text: string, fontNameOrFontDef: string | cc.FontDefinition, fontSize: number, color: cc.Color)

        _handleImageRenderer(filePath: string, color: cc.Color, opacity: number);

        _handleCustomRenderer(renderer);

        _addNewLine();

        /**
         * Formats richText's renderer.
         */
        formatRenderers()

        _pushToContainer(renderer)

        _adaptRenderers()

        /**
         * Sets vertical space
         * @param {Number} space
         */
        setVerticalSpace(space: number)

        /**
         * Sets anchor point
         * @override
         * @param {cc.Point} pt
         */
        setAnchorPoint(pt: cc.Point)
        _setAnchorX(x);
        _setAnchorY(y);
        /**
         * Returns the renderer container's content size.
         * @override
         * @returns {cc.Size}
         */
        getVirtualRendererSize(): cc.Size

        /**
         * Ignore the richText's custom size, If ignore is true that richText will ignore it's custom size, use renderer's content size, false otherwise.
         * @param {Boolean} ignore
         * @override
         */
        ignoreContentAdaptWithSize(ignore: boolean);

        /**
         * Gets the content size of ccui.RichText
         * @override
         * @return {cc.Size}
         */
        getContentSize(): cc.Size
        _getWidth();
        _getHeight();

        setContentSize(contentSize);

        /**
         * Returns the class name of ccui.RichText.
         * @returns {string}
         */
        getDescription(): string
        /**
         * Allow child renderer to be affected by ccui.RichText's opacity
         * @param {boolean} value
         */
        setCascadeOpacityEnabled(value: boolean)
        /**
         * This allow the RichText layout to break line on space only like in Latin text format
         * by default the property is false, which break the line on characters
         * @param value
         */
        setLineBreakOnSpace(value)
        /**
         * Set the renderer horizontal flow alignment for the Control
         * although it is named TextHorizontalAlignment, it should work with all type of renderer too.
         * NOTE: we should rename this to setHorizontalAlignment directly
         *
         * @example
         * var richText = new ccui.RichText();
         * richText.setTextHorizontalAlignment(cc.Text_ALIGNMENT_RIGHT);
         *
         * @param {Number} value - example cc.TEXT_ALIGNMENT_RIGHT
         */
        setTextHorizontalAlignment(value: number)
        /**
         * Set the renderer vertical flow alignment for the Control
         * although it is named TextVerticalAlignment, it should work with all type of renderer too.
         *
         * @example
         * var richText = new ccui.RichText();
         * richText.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
         *
         * @param {Number} value - example cc.VERTICAL_TEXT_ALIGNMENT_CENTER
         */
        setTextVerticalAlignment(value: number);

        /**
         * create a rich text
         * @deprecated since v3.0, please use new ccui.RichText() instead.
         * @returns {RichText}
         */
        static create(): ccui.RichText;


        /**
         * 
         * @param contentArray 
         */
        setString(contentArray: Array<{ color: cc.Color, content: string }>);
        initProperty(data: { fontType?: string, fontSize: number });
        initWithDemoText(text:ccui.Text);
        property: { fontType: string, fontSize: number }
        richElements:Array<any>

    }






}


