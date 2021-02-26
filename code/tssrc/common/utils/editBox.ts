namespace kaayou {
    export class editBox {
        static attachTextEdit(pNode, name, placeholdStr, handleInput?:any,attr?:any) {
            attr = attr || {
                "fontSize": 26,
                "fontColor": "#B97D55",
                "setInputMode": 6,
                "setMaxLength": 8,
                "setPlaceholderFontSize": 26,
            };
            let input: cc.Node = <ccui.TextField>ccui.helper.seekWidgetByName(<ccui.Widget>pNode, name);
            let sp = new cc["Scale9Sprite"]();
            sp.initWithFile(common.res.alpha_4x4, cc.rect(0, 0, 0, 0), cc.rect(0, 0, 0, 0));
            let eb1: any = cc["EditBox"].create(input.getContentSize(), sp);
            eb1.setAnchorPoint(0, 0);
            eb1.setPosition(0, 0);
            eb1.setOpacity(0);
            eb1['setFontSize'](attr.fontSize);
            eb1['setFontColor'](cc.color(attr.fontColor));
            eb1['setInputMode'](attr.setInputMode);
            eb1['setMaxLength'](attr.setMaxLength);
            eb1["setPlaceholderFontSize"](attr.fontSize)
            eb1["setPlaceholderFontColor"](cc.color(attr.fontColor));

            eb1.setPlaceHolder(placeholdStr);

            eb1['setDelegate'](
                {

                    editBoxTextChanged: function (ref) {
                        let str = ref.getString();
                        ref.setString(str)
                    },
                    /**
                     * This method is called when an edit box loses focus after keyboard is hidden.
                     * @param {cc.EditBox} sender
                     */
                    editBoxEditingDidEnd: function (ref) {
                        if (handleInput) {
                            handleInput(ref.getString());  
                        }
                    }
                }
            )
            input.addChild(eb1)
            return eb1;

        }

        static target(node:cc.Node){

            let cache =  {}
            let api  = {attachTextEdit:null,getValue:null,setValue:null,setEnable:null,setAllEnable:null,getAllValue:null,setAttribute:null}
            let ef = function(){}
            api.attachTextEdit = (name , handleInput,attr?:any) => {
                let {fontSize= 26,
                phFontColor = "#B97D55",
                fontColor= "#B97D55",
                setInputMode= 6,
                setMaxLength= 8,
                placeholdStr="请输入",
                type = "string",
                allowNavi = true,
                allowEmpty = true,
                min = -Infinity,
                regExp=null,
                pressdown = ef,
                max=Infinity} = attr || {};

                let input: cc.Node = <ccui.TextField>ccui.helper.seekWidgetByName(<ccui.Widget>node, name);
                let sp = new cc["Scale9Sprite"]();
                sp.initWithFile(common.res.alpha_4x4, cc.rect(0, 0, 0, 0), cc.rect(0, 0, 0, 0));
                let eb1: any = cc["EditBox"].create(input.getContentSize(), sp);
                eb1.setAnchorPoint(0, 0);
                eb1.setPosition(0, 0);
                eb1.setOpacity(0);
                eb1['setFontSize'](fontSize);
                eb1['setFontColor'](cc.color(fontColor));
                eb1['setInputMode'](setInputMode);
                eb1['setMaxLength'](setMaxLength);
                eb1["setPlaceholderFontSize"](fontSize)
                eb1["setPlaceholderFontColor"](cc.color(phFontColor));
    
                eb1.setPlaceHolder(placeholdStr);
    


               let dotCount = (str) => {
                    let dot = str.match(/\./g)
                    return null === dot ? 0 : dot.length;
                }

                let subCount = (str)=>{
                    let sub = str.match(/\-/g)
                    return null===sub ? 0 : sub.length;
                }

                let oldText = null;

                eb1['setDelegate'](
                    {
    
                        editBoxTextChanged: function (ref) {
                            let reg,isNavi;
                            let str = ref.getString();

                            switch(type){
                                case "string":
                                    pressdown(str)
                                    ref.setString(str)
                                break;
                                case "int":
                                    reg = /^[0-9]+$/;

                                    if(allowNavi && str.charAt(0)==="-" ){
                                        isNavi = true;
                                        str = str.substring(1);
                                    }

                                    while (reg.test(str) === false) {
                                        str = str.slice(0, str.length - 1);
                                        if (str.length === 0)
                                            break;
                                    }

                                    if (allowEmpty===false)
                                        if(str.length==0){
                                            str="0";
                                            if(isNavi)
                                                isNavi = false;
                                        }
                                
                                    if(str.length!==0)
                                        str =  Math.max(min,Math.min(max, +str)).toString();
                                    

                                    if(isNavi)
                                        ref.setString("-"+str);
                                    else
                                        ref.setString(str);

                                break;
                                case "float":
                                    reg = /(^[0-9]+[\.]{0,1}[0-9]{0,2}$)|(^[0-9]+$)/
                                    let other = /[^\-^0-^9^\.]+/
                                    if(allowNavi && str.charAt(0)==="-" ){
                                        isNavi = true;
                                        str = str.substring(1);
                                    }

                                    while (other.test(str)  || dotCount(str)>1 || reg.test(str) === false) {
                                        str = str.slice(0, str.length - 1);
                                        if (str.length === 0)
                                            break;
                                    }

                                    if (allowEmpty===false)
                                        if(str.length==0){
                                            str="0";
                                            if(isNavi)
                                                isNavi = false;
                                        }
                                    
                                    if(!allowEmpty && str.length!==0)
                                        str =  Math.max(min,Math.min(max, +str)).toString();

                                    if(isNavi)
                                        ref.setString("-"+str);
                                    else
                                        ref.setString(str);
                                    break;
                                    case "validate":
                                        if(regExp===null)
                                            pressdown(true, oldText = str);
                                        else{
                                            let result =regExp.test(str)
                                            result && (oldText = str)
                                            pressdown(result , oldText);
                                        }
                                    break;
                                break;
                            }   

                            
                        },
                        /**
                         * This method is called when an edit box loses focus after keyboard is hidden.
                         * @param {cc.EditBox} sender
                         */
                        editBoxEditingDidEnd: function (ref) {
                            let str = ref.getString();
                            switch(type){
                                case "validate":
                                    let result = regExp && regExp.test(str) || regExp===null;
                                    result && (oldText = str)
                                    handleInput(result , oldText)
                                    break;
                                case "string":
                                case "int":
                                case "float":
                                    handleInput(str)
                            }
                            
                        }
                    }
                )

                cache[name] = eb1;
                input.addChild(eb1)
                return eb1;
            }

            api.getValue = (name)=>{
                if(cache[name]!==void 0){
                    return cache[name].getString();
                }
                return null;
            }

            api.setValue = (name,value) =>{
                if(cache[name]!==void 0){
                    cache[name].setString(value.toString())
                }
            }

            api.getAllValue = ()=>{
                let out = {}
                lodash.forEach(cache,function(item,key){
                    out[key] = item.getString();
                })
            }

            api.setEnable = (name,config=true) =>{
                if(cache[name] !== void 0){
                    cache[name].setTouchEnabled(!!config)
                }
            }

            api.setAllEnable = (config = true)=>{
                lodash.forEach(cache,function(item,key){
                    item.setTouchEnabled(!!config);
                })
            }

            api.setAttribute = (name,attr,val)=>{
                if(cache[name]){
                    switch(attr){
                        case "fontSize":
                            cache[name]['setFontSize'](val);
                            cache[name]["setPlaceholderFontSize"](val)
                        break;
                        case "fontColor":
                            cache[name]["setPlaceholderFontColor"](cc.color(val));
                            cache[name]['setFontColor'](cc.color(val));
                        break;
                        case "setMaxLength":
                            cache[name]['setMaxLength'](val);
                        break;
                    }
                }
            }

            return api;
        }
    }
}