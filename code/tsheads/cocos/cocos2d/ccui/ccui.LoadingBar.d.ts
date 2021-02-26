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
 * The LoadingBar control of Cocos UI.
 * @class
 * @extends ccui.Widget
 *
 * @property {ccui.LoadingBar.TYPE_LEFT | ccui.LoadingBar.TYPE_RIGHT}   direction   - The progress direction of loadingbar
 * @property {Number}               percent     - The current progress of loadingbar
 */

declare namespace ccui {

    class LoadingBar extends ccui.Widget {
        /**
        * Changes the progress direction of LoadingBar.                           <br/>
        * LoadingBarTypeLeft means progress left to right, LoadingBarTypeRight otherwise.
        * @param {ccui.LoadingBar.TYPE_LEFT | ccui.LoadingBar.TYPE_RIGHT} dir
        */
        setDirection(dir: number);

        /**
         * Returns the progress direction of LoadingBar.                               <br/>
         * LoadingBarTypeLeft means progress left to right, LoadingBarTypeRight otherwise.
         * @returns {ccui.LoadingBar.TYPE_LEFT | ccui.LoadingBar.TYPE_RIGHT}
         */
        getDirection(): number

        /**
         * Loads texture for LoadingBar.
         * @param {String} texture
         * @param {ccui.Widget.LOCAL_TEXTURE|ccui.Widget.PLIST_TEXTURE} texType
         */
        loadTexture(texture: cc.Texture2D, texType: number);

        /**
         * Sets if LoadingBar is using scale9 renderer.
         * @param {Boolean} enabled
         */
        setScale9Enabled(enabled: boolean);

        /**
         * Returns LoadingBar is using scale9 renderer or not..
         * @returns {Boolean}
         */
        isScale9Enabled(): boolean;

        /**
         * Sets capinsets for LoadingBar, if LoadingBar is using scale9 renderer.
         * @param {cc.Rect} capInsets
         */
        setCapInsets(capInsets: cc.Rect)

        /**
         * Returns cap insets for loadingBar.
         * @returns {cc.Rect}
         */
        getCapInsets(): cc.Rect;
        /**
         * The current progress of loadingBar
         * @param {number} percent   percent value from 1 to 100.
         */
        setPercent(percent: number);

        /**
         * Returns the progress direction of LoadingBar.
         * @returns {number} percent value from 1 to 100.
         */
        getPercent(): number;


        static create(textureName, percentage): ccui.LoadingBar;

        static TYPE_LEFT:0;
        static TYPE_RIGHT:1;
        static RENDERER_ZORDER:-1;
    }


}
