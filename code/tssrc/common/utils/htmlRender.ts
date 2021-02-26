namespace common {
  
    export class htmlRender {


        private contentView: ccui.ScrollView = null;


        render(contentView: ccui.ScrollView , _content:string) {
            this.contentView = contentView
            contentView.removeAllChildren();
            
            const { child } = this.parseToObject(this.parseEditSource(_content));
            

            child.forEach((one:any) => {
                const style = this.getStyle(one);
                let layout
                if(this.isComponent(one)){
                    layout = this.createComponent(one);
                }else
                    layout =  this.createStage(one.text,style);
                
                contentView.addChild(layout);
            })

            contentView.doChildrenLayout();
            contentView.scrollToTop(0,false)
            
        }

        //是不是组件节点
        private isComponent(node){
            let {child} = node;
            return child.some((v)=>{
                switch(v.tag){
                    case "img":

                    return true;
                }
                return false
            })
        }

        private  replaceHTMLFormat(text:string){
            return text.replace(/\&nbsp;/g," ")
                       .replace(/\&quot;/g,"\"")
                       .replace(/\&amp;/g,"&")
                       .replace(/&lt;/g,"<")
                       .replace(/&gt;/g,">")
                       .replace(/&#39;/g,"'");
        }

        private loadImage({url,success=void 0,fail=void 0}){

            let ef = function(){}

            new Promise(function (resolve, reject) {
                cc.loader.loadImg(url, { isCrossOrigin: true }, function (err, tex) {
                    if (err) {
                        return reject(err);;
                    }
                    if (typeof (tex) != "undefined" && tex != null) {
    
                        if (!cc.sys.isNative) {
                            var texture2d = new cc.Texture2D();
                            texture2d.initWithElement(tex);
                            texture2d.handleLoadedTexture();
                            resolve(texture2d);
                        } else {
                            resolve(tex);
                        }
                    }
                });
            }).then(success||ef)
              .catch(fail||ef);
        }

        //需不需要填满还有待需求确定
        //暂时剧中
        private fitImage(Sprite:ccui.ImageView,layout:ccui.Layout,sw,sh){
            let {width,height} = this.contentView.getSize();
            let anchor = this.contentView.getAnchorPoint();

            let p1 = sw / width;
            let p2 = sh/height
            
            let sp = <cc.Sprite>Sprite.getChildren()[0]
        

            if(p1<=1){
                Sprite.setAnchorPoint(0.5,0.5);
                sp.setAnchorPoint(0,0);
                sp.setPosition(0,0);
                //start 00
                if(cc.sys.isNative){
                    Sprite.setPosition( (width-sw)/2,0);
                }else{
                    Sprite.setPosition( width/2,sh/2);
                }
                return ;
            }

                Sprite.setAnchorPoint(0.5,0.5);
                sp.setAnchorPoint(0,0);
                sp.setPosition(0,0);
            
                let fw = width
                let fh = sh / p1;
                sp.setScaleX(1/p1);
                sp.setScaleY(1/p1);
                Sprite.setSize(cc.size(fw,fh));
                if(cc.sys.isNative){
                    Sprite.setPosition(0 ,0)
                }else{
                    Sprite.setPosition(fw/2 , fh/2)
                }
                layout.setSize(cc.size(fw,fh));
                //sp.setTextureRect(rect,false,cc.size(fw,fh));
            

        }
 
        private createComponent(one){
            let {child} = one;
            let layout = <ccui.Layout>ccui.Layout.create();
            let contentSize = this.contentView.getSize();
            let self = this;
            child.forEach( (v) => {
                let src;
                switch(v.tag){

                    case "img":
                        src = v.src;
                        this.loadImage({
                            url:src,
                            success:function(texture:any){
                                let width:number = texture.width;
                                let height:number = texture.height;
                                let image= ccui.ImageView.create();
                                let  sp:any = image.getChildren()[0];
                                if(!sp){
                                    sp =new cc.Sprite()
                                    sp.setName(Math.random().toString().substr(2,8));
                                    sp.initWithTexture(texture);
                                    sp.setPosition(width/2,height/2);
                                    image.addChild(sp)
                                    image.setSize(cc.size(width,height));
                                    
                                }
                                layout.addChild(image);
                                layout.setSize(cc.size(contentSize.width,height));
                                self.fitImage(image,layout,width,height)
                                self.contentView.doChildrenLayout()
                            }
                        })
                    break;


                }
            });
            return layout;
        }

        private createStage(text, style) {

            let contentSize = this.contentView.getSize();

            let layout = <ccui.Layout>ccui.Layout.create();
            let word = <ccui.Text>ccui.Text.create();
            
            let size = this.measureText(text, parseInt(style["font-size"]) || 20);
            let width = Math.max(contentSize.width, size.width);
            let height = size.height;

            layout.setSize(cc.size(width,height));
            layout.setAnchorPoint(0,0)
            word.setTextAreaSize(cc.size(Math.max(0,width-16),height))
            word.setString(this.replaceHTMLFormat(text));
            word.setPosition(8,0)
            setTextAlign(word,style["text-align"])
            setTextColor(word,style["color"])
            setTextSize(word,style["font-size"])
            // setTextFontFamily(word,style["font-family"]);
            // word.setFontName("Microsoft YaHei");
            layout.addChild(word);
            return layout;




            function setTextAlign(text: ccui.Text, type = "left") {
                text.setAnchorPoint(0,0);
                switch (type) {
                    case "left":
                        text.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT )
                        break;
                    case "right":
                        text.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_RIGHT);
                        break;
                    case "center":
                        text.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
                        break;
                }
            }

            

            function setTextFontFamily(text:ccui.Text , val){

                let support = {
                    "Microsoft YaHei":"Microsoft YaHei" ,
                    "微软雅黑":"Microsoft YaHei"
                }


                if(val===void 0)
                    return ;

                

                text.setFontName

            }

            function setTextColor(text: ccui.Text, val) {
                val = val || "#000000"
                text.setColor(cc.color(val.replace(";", "")))
            }

            function setTextSize(text: ccui.Text, val) {
                val = parseInt(val) || 20;
                text.setFontSize(val);
            }

        }

        private getStyle(obj: any, out = { "font-size": null, color: null }) {

            if (lodash.isEmpty(obj.style) === false) {
                lodash.extend(out, obj.style);
                if (Object.keys(out).every(v => out[v] !== null))
                    return out;
            }

            for (let i = 0; i < obj.child.length; i++)
                this.getStyle(obj.child[i], out);

            return out;
        }

        private measureText(str: string, size: number) {
            let { width } = this.contentView.getSize();
            let text = <ccui.Text>ccui.Text.create();
            text.setTextAreaSize(cc.size(width-16, 0));
            text.ignoreContentAdaptWithSize(false)
            text.setFontSize(size);
            text.setString(this.replaceHTMLFormat(str));
            return text.getVirtualRendererSize()
        }


        private parseToObject(tags) {
            let root = { child: [] }
            let tagsReg = new RegExp("<(\\w+).*?>((?:<\\1>[\\w\\W]*?</\\1>)|(?:[\\w\\W]*?))</\\1>", "g");
            let tagsReg1 = new RegExp("<(\\w+)[^>]*?/>", "g")
            let outTags = new RegExp("<(\\w+).*?></\\1>","g");
            let styleReg = new RegExp("^<(\\w+)?\\s*style\\s*=\\s*[\'\"](.*?)[\'\"].*?>.+</\\1>+", "im")
            let styleAttr = /([a-zA-Z0-9%\- ]+):([a-zA-Z0-9%\-\u4e00-\u9fa5 \(,\)#'"]+)/g;
            let content = new RegExp("(?:<(\\w+).*?>([\\w\\W]+)(?:</\\1>)$)", "im");
            let src =  new RegExp("<(\\w+)[^<]*?src=[\'\"](.*?)[\'\"].*?/>", "im");

            if((tagsReg.test(tags) )===false){
                root.child.push({ style: {}, text: "", html: tags, child: [] ,tag:""})
                return root;
            }

            let  splitedTag = tags.match(tagsReg);

            splitedTag.forEach(tag => {

                if(isSingleTag(tag)){
                    tag.match(tagsReg).forEach(v => {
                        root.child.push(_parse(v));
                    });
                }else{
                    let tgs = tag.match(content)[2];
                        tgs = _parse(tgs);
    
                    let style = {}
                    
                    parseStyle(tag , style);
    
                    style = lodash.pick(style,["color","font-size","font-family","text-align"]);
    
                    tgs.child.forEach(one => {
                        lodash.extend(one.style,style);
                        root.child.push(one)
                    });
    
    
                }
                
            });


            return root;

            function isSingleTag(str){
                let matcher =  new RegExp("<(\\w+).*?>[\\w\\W]*?(?:</\\1>)","g");
                let content = new RegExp("(?:<(\\w+).*?>([\\w\\W]+)(?:</\\1>)$)", "im");
                let manytags =  new RegExp("<(\\w+).*?>([\\w\\W]*?)(</\\1>)", "g");
                let cstr = str.match(content)
                    cstr = cstr && cstr[2] || ""
                let mc = cstr.match(manytags);
                let mc1 = str.match(outTags);

                
                //let mc = cstr.match(new RegExp(matcher.source , "g" ) );

                if( (mc && mc1) && mc1.length ===1 && mc.length >1)
                    return false

                return true;

            }
            function parseStyle(str , style){
                if (styleReg.test(str)) {
                    let satrs = str.match(styleReg)[2];
                    let matcher = satrs.match(styleAttr);
                    if(matcher)
                        matcher.forEach(v => {
                            let reg = new RegExp(styleAttr.source, "im");
                            let atr = v.match(reg);
                            style[atr[1]] = atr[2];
                        })
                }
            }

            function _parse(str) {
                str = str.trim();

                let out = { style: {}, text: "", html: str, child: [] ,tag:"" , src:""};

                out.text = getString(str).trim();



                if (str.match(tagsReg) || str.match(tagsReg1)) {

                    out.tag = RegExp.$1;

                    parseStyle(str,out.style);

                    let innerHTML = str.match(content);
                    let manytags = str.match(outTags) || str.match(tagsReg)
                    let matchRegStr;

                    if(manytags && manytags.length>1){
                        manytags.forEach(v => {
                            out.child.push(_parse(v));
                        });
                    }else{
                        if (innerHTML) {
                            innerHTML = innerHTML[2].trim();
    
                            matchRegStr = (innerHTML).match(tagsReg)
                            if (matchRegStr) {
                                parseTagHTML(innerHTML, matchRegStr).forEach(v => {
                                    out.child.push(_parse(v));
                                })
    
                            } else {
                                out.child.push(_parse(innerHTML))
                            }
                        }
                    }

 

                    let source ;
                    switch(out.tag){
                        case "img":
                            source =str.match(src)
                            out.src = source && source[2];
                        break;
                        default:
                            delete out.src;
                    }

                    out.style["font-size"] = out.style["font-size"] || (function(){
                        switch(out.tag){
                            case "h1":
                                return 20 * 2;
                            case "h2": 
                                return 20 * 1.5;
                            case "h3": 
                                return 20 * 1.17
                            default:
                                return 20;
                        }
                    })()

                }

                return out;
            }


            function parseTagHTML(source, arr) {

                let out = [];
                let start = 0;
                arr.forEach(v => {
                    walker(source, v, out)
                })

                return out;

                function walker(source, str, out) {
                    let i = source.indexOf(str);

                    if (i !== start) {
                        out.push(source.substring(start, i));
                    }
                    start = i + str.length;

                    out.push(str);
                }
            }

            function getString(str) {
                return str.replace(/<.*?>/g, "");
            }

        }



        private parseEditSource(str) {

            let css1 = /<.*?style=['"](.*?)['"].*?>/g;
            let tags = new RegExp("<(\\w+).*?>([\\w\\W]*?)(</\\1>)", "g");
            let outTags = new RegExp("<(\\w+).*?>((?:<\\1>[\\w\\W]*?</\\1>)|(?:[\\w\\W]*?))</\\1>","g");
            let inTags = new RegExp("<(\\w+).*?>([\\w\\W]*)(?:</\\1>)$", "im");
            let BR = new RegExp("<(\\w+).*?><br/>(?:</\\1>)|<br/>", "g")
            let checkP = /<(p|h1|h2|h3|h4|h5).*?>[\w\W]*?<\/\1.*?>/g
            let replaceHTMLFormat = this.replaceHTMLFormat;
            
            if(tags.test(str)===false)
                return str;

            let outstr =str.match(outTags)

            outstr = outstr.map(v => {

                if (!css1.test(v))
                    return v;
    
                return v.replace(css1, function (tag, style) {
                    let cssStr = Css2Object(style);
                    cssStr = Object.keys(cssStr).map(v => {
                        return `${v}:${cssStr[v].replace(";", "")}`
                    })
                    return tag.replace(style, cssStr.join(";") + ";");
                });
    
            })

            //测试是否下级还是唯一标签,如果是，则合并属性
            outstr = outstr.map(v=>{
                    
                    
                    if(isSingleTag(v)){
                       return mergeTag(v);
                    }
    
                    return v;
    
                    function isSingleTag(str){
    
                        let content = str.match(inTags);
                        let inner = content[2] || "";
    
                        let reg = new RegExp("<(\\w+).*?>[\\w\\W]*?(?:</\\1>)", "g");
                        let mc = inner.match(reg);
    
                        if(mc === null || mc.length >1)
                            return false
    
                        return true;
    
                    }
    
                    function mergeTag(v, style = {}){
                        let cssReg = new RegExp(`<(\\w+).*?style=['"](.*?)['"].*?>[\\w\\W]*(?:</\\1>)$`, "im");
                        let _style = v.match(cssReg);
                            _style = _style && _style[2] &&  Css2Object(_style[2]) || {};
    
                        let inner = v.match(inTags);
    
                        style = lodash.extend(style,_style)
                        
                        if(inner && isSingleTag(inner[0])){
                            return mergeTag(inner[2] ,  style);
                        }
    
    
                        let css = Object.keys(style).map(v => {
                            return `${v}:${style[v].replace(";", "")}`
                        })
                        
                        return `<p style="${css.join(";")+";"}" >${inner && inner[2] || v}</p>`;
                        
                    }
    
            })
    
            // str = str.map(v => {
            //     let out = v.match(inTags);
            //     if (out && BR.test(out[2])) {
            //         return out[0].replace(BR, function ($0, $1) {
            //             return `<p></p>`
            //         })
            //     }
            //     return v;
            // })


            outstr = outstr.map(v => {
                // let temp = v.replace(checkP, "").trim();
                // let ps;
                // if (temp.length === 0 || (ps = v.match(checkP))===null)
                //     return v;

                let ps;
                if((ps = v.match(BR))===null)
                    return v;

                let idxs = []//ps.map(piece => v.indexOf(piece))
                let mAll = matchAll_polifill(v,BR)//v.matchAll(checkP);
                let one;

                while((one = mAll.next()) && one.done===false )
                    idxs[idxs.length] = one.value.index;
                // let idxs = [...ps.matchAll()]
                idxs.length < 2 && idxs.push(Infinity)
                let out = ""
                let i = 1
                for (; i < idxs.length; i++) {
                    let s = idxs[i - 1];
                    let e = idxs[i]
                    let tempStr;
                    // if(isEmptyTag(ps[i-1])===false)
                    // out += ps[i - 1];
                    tempStr = v.substr(s + ps[i - 1].length , e - s - (ps[i] && ps[i].length || 0 ))
                    if(tempStr.length>0)
                        out+="<p>"+tempStr+"</p>";
                }

                let headStr = v.substr(0,idxs[0])
                let tail = v.substr(idxs[i-1] + (ps[i-1] && ps[i-1].length ||0))
                // if(headStr.length){
                //     out = "<p>"+headStr+"</p>" + out;
                // }

                let matchHead =  matchAll_polifill(headStr,/<.*?>/g);
                let matchtail =  matchAll_polifill(tail,/<\/.*?>/g);

                if(matchHead!=null){
                    let one  = matchHead.next();
                    let str = one.value.string || "";
                    let temp = headStr.substr(str.length)
                    headStr = str + "<p>" + temp +"</p>"
                }

                
                if(matchtail!=null){
                    let one  = matchtail.next();
                    let str = one.value.string || "";
                    let temp = tail.substr(0,one.value.index)
                    tail =  "<p>" + temp +"</p>" + str;
                }

                out = headStr + out + tail 

                
                
                // if(tail.length>0)
                //     out = out + "<p>" + tail + "</p>";

                return out;
            })

            outstr = outstr.join("").replace(/\n|\t|\r/g, "");

            return outstr;


            

            function matchAll_polifill(str, reg){

                let strs = str.match(reg);
                

                if(strs===null)
                    return null;

                let maps =  strs.reduce(function(o , v , i){
                
                    let fix = 0;
                    let idx
                    if(i==0){
                        idx = kmp(str , v);
                        o[0] = {index:idx , string:v}
                        return o;
                    }
                
                    fix = o[i-1].index + o[i-1].string.length;
                    
                    idx = kmp(str.substr(fix) , v);
                
                    o[i] = {index:idx + fix  , string : v }
                
                    return o
                },strs)
                


                return (function iteratorWrapper(){

                    let i = 0; 
                    let _temp = maps;
                    let api = {
                        next:function(){

                            if(_temp[i]===void 0 && _temp.length <=i)
                                return {
                                    done:true,
                                    value:void 0
                                }


                            return {
                                value:_temp[i++],
                                done:false,
                                next:api.next
                            }
                        }
                    }

                    return api;

                })();


                // return maps[Symbol.iterator]();
                
                function kmp(str , search){
                
                    return _kmp(str, search);
                
                    function next(s , list){
                        let len = s.length;
                        list[0] = 0;
                        for(let i  = 1,k=0;i<len;i++ ){
                            while(k>0 && s[k]!==s[i])
                                k = list[k-1];
                            if(s[k]==s[i])
                                    k++
                            list[i]=k
                            
                        }
                    }
                    
                    function _kmp(str , search){
                        let len1 = str.length;
                        let len2 = search.length;
                        let table = []
                        let i ,j;
                        next(search , table);
                        for(i =0,j=0;i<len1;i++){
                            while(j>0 && str[i]!=search[j])
                            {
                                j=table[j-1];
                            }
                            if(str[i]==search[j])
                                j++;
                            if(j==len2)
                                return i-j+1;
                        }
                        return -1;
                    }
                
                
                
                }
                
                }
    



            function replaceColor(v) {
                if (v.indexOf("#") !== -1)
                    return v;
                let rgb = v.match(/[0-9]+/g).map(v => {
                    let c = parseInt(v).toString(16);
                    if (c.length % 2)
                        return "0" + c;
                    return c;
                })
                return "#" + rgb.join("") + ";";
            }

            function Css2Object(one) {
                one = replaceHTMLFormat(one);
                let attbsReg = /[a-zA-Z0-9%\- ]+:[a-zA-Z0-9%\-\u4e00-\u9fa5 \(,\)#"']+/g;
                let attbs = one.match(attbsReg);
                if(attbs===null)
                    return {}

                return attbs.reduce(function (o, v) {
                    v = v.split(":");
                    let s = v[0].trim().replace("\"", "")
                    let a = v[1].trim();
                    if (/color|background-color/.test(s))
                        a = replaceColor(a);
                    o[s] = a;
                    return o;
                }, {})


            }
        }

    }
}
