/**
 * 
 * gulp(...src)
 *   .pipe(adapter({
 *      global:["common","kaayou","PATCH".....],
 *    }))
 * 
 * 
 */


 //替换全局变量
 /*
 
 var kaayou; ===> var kaayou = (GameGlobal.kaayou || (GameGlobal.kaayou = {}))

 var PATCH  = (function() ....  ====>   var Patch = GameGlobal.Patch = (function.....
 
@include kaayou ===>var kaayou = GameGlobal.kaayou;
 */

var Buffer = require('safe-buffer').Buffer;

function replaceGlobal(str , attr , static){
    let RegMod1 = new RegExp(`[^\\{]var\\s*?${attr};[\\s\\S]*?[^\\}]`);
    let RegMod2 = new RegExp(`[^\\{]var\\s*?${attr}[\\s\\S]*?=[^\\}]`);

    if(RegMod1.test(str)){
        str = str.replace(new RegExp(RegMod1.source,'g'),function(){
            return `\r\nvar ${attr}=(GameGlobal.${attr} = GameGlobal.${attr}||{});\r\n`
        })
    }else if(RegMod2.test(str)){
        str = str.replace(new RegExp(RegMod2.source,'g'),function(){
            return `\r\nvar ${attr}= GameGlobal.${attr} = `
        })
    }
    
    if(~static.indexOf(attr)){
        str = `var ${attr}=(GameGlobal.${attr} = GameGlobal.${attr}||{});`+str;
    }

    return str;
}

function replaceCmd(str, source){
    var repRegs = /['"]\s*\$(\w)\{(\w+)\}['"]\;/g
    var repReg = /['"]\s*\$(\w)\{(\w+)\}['"]\;/im
    return str.replace(str,function(ag,ag1,ag2){ 
        switch(ag1){
            case "R":
                return source[ag2] || ag;
        }
        return ag;
    })
}

module.exports=function(logger , uglify ,jsonmin , zipFs){

    return function(option){

        var global = option.global || [];
        
        var zip = option.uglify===true;
        var zipjson = option.minJSON === true;
        var rep = option.replace || {};
        var static = option.static;
        
        // var needZip = !!option.zip;
        // var zipFile = zipFs(option.zip)
        var inc = require("./include")("GameGlobal")

        var _ext = function(file){
            var path = file.path;
            var extension = path.match(/\.[^\.]*?$/g)[0];
            return extension;
        }

        var isJS = function(file){
            var extension = _ext(file)
            if(extension===".js")
                return true;
            return false;
        }

        var isJSON = function(file){
            var extension = _ext(file)
            if(extension===".json")
                return true;
            return false;
        }

        var miniJSON = function(file){
            var str =  String(file.contents);
            var res;
                try{
                    res =  jsonmin.minify(str)
                }catch(e){
                    return file;
                }
                
                file.contents = Buffer.from(res)
            return file;
        }



        return function(file){

            if (file.isNull()) {
                return file;
            }

            if (file.isStream()) {
                throw Error(`[${file.path}]::Streaming not supported`);
            }

            // if(needZip){
            //     zipFile.add(file);
            //     zipFile.out();
            // }
            
            if(isJSON(file)===true && zipjson)
                return miniJSON(file)

            if(isJS(file)===false)
                return file;
              
            var out =  String(file.contents);
                     
            for(var i = 0 ;i<global.length  ; i++)
                out = replaceGlobal(out,global[i],static)

            out = replaceCmd(out,rep)
            
            out =  inc(out);
            if(zip)
                out = uglify.minify(out).code;
                        
            file.contents = Buffer.from(out);

            return file;
        }

    }
}