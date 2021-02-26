
declare namespace cc{
  export namespace sys{
      export var isWeChat:boolean;
      export var isWeChatH5:boolean;
      export var isWeChatGame:boolean;
  }
}

declare namespace ccui {


  namespace helper {

      /**
       * Refresh object and it's children layout state
       *
       * @param {cc.Node} rootNode
       */
      function doLayout(rootNode: cc.Node): any
    
      /**
       * restrict capInsetSize, when the capInsets' width is larger than the textureSize, it will restrict to 0,
       * the height goes the same way as width.
       *
       * @param {cc.Rect} capInsets
       * @param {cc.Size} textureSize
       */
      function restrictCapInsetRect(capInsets: cc.Rect, textureSize: cc.Size): any
    
      /**
       * Finds a widget whose action tag equals to param name from root widget.
       *
       * @param {ccui.Widget} root
       * @param {Number} tag
       *
       * @returns {ccui.Widget}
       */
      function seekActionWidgetByActionTag(root: ccui.Widget, tag: number): ccui.Widget
    
      /**
       * Finds a widget whose name equals to param name from root widget.
       *
       * @param {ccui.Widget} root
       * @param {String} name
       *
       * @returns {ccui.Widget}
       */
      function seekWidgetByName<T>(root: ccui.Widget   , name: string):T;

      function seekWidgetByName(root: ccui.Widget   , name: string):ccui.Widget;
      /**
       * Finds a widget whose name equals to param name from root widget.
       * RelativeLayout will call this method to find the widget witch is needed.
       *
       * @param {ccui.Widget} root
       * @param {String} name
       *
       * @returns {ccui.Widget}
       */
      function seekWidgetByRelativeName(root: ccui.Widget, name: string): ccui.Widget
    
      /**
       * Finds a widget whose tag equals to param tag from root widget.
       *
       * @param {ccui.Widget} root
       * @param {number} tag
       *
       * @returns {ccui.Widget}
       */
      function seekWidgetByTag(root: ccui.Widget, tag: number): ccui.Widget
    
  }



 
}





