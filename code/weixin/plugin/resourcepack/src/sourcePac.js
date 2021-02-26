var path  = require("path");
var acorn = require("acorn");
var plist = require("plist")
var zip = require("./zip")
var fs = require("fs")


/**
 {
    "out_path":"weixin/packages",
    "format":"zip",
    "package":{
        "lobby":{
            "package":["common","lobby"],
            "min_json":true
        }
    }
}
 */

 
function push( val , arr){
    if(arr.indexOf(val)===-1)
        arr.push(val);

}

var parse = function(config) {
    let pkgs = config.package;
    let dist = config.out_path;
    let format = config.format;

    let ObjList = {}

    if(format==="zip"){
        try{

            for(let key in pkgs){
                ObjList[key] = ObjList[key] || []   
                let pkg = pkgs[key]
                var codes = pkg.package
                codes.forEach(function(code){
                    var jsPath = `src/${code}/${code}.module.js`;
                    console.log("check attribute--->",jsPath)
                    var code = fs.readFileSync(jsPath,"utf8");
                    var list =  parseCode(code);
                    list.forEach(function(v){
                        push(v,ObjList[key])
                    })
                })
                
            }
    
            var keys = Object.keys(ObjList);
            keys.forEach(function(kkk){
                let min = pkgs[kkk].min_json
                zip.zip({
                    zip:min,
                    files:ObjList[kkk],
                    output:dist+"/"+(kkk.toString()+"")+".zip"
    
                })
            })

        }catch(e){
            console.log(e)
            return ;
        }
       
            
        
    }

}


var parseCode = function(code){
    //微信打包关键词
    var key = "$WECHAT_PACK_RESOURCE$";
    var tokens = []

    var ast = acorn.parse(code, {
        ranges: true,
        onToken: tokens
    })

    var pkgs = tokens.filter(function(v){
        return v.type.label==="name" && v.value === key;
    })
    
    if(pkgs.length===0)
        return -1;

    let source = collectASTValue(ast , pkgs , key)
    return  reader(source)
}

function reader(pts){

    let out = [];
    let errorPt;
    //  console.log(pts)
    try{
    pts.forEach(function(pt){
        var ext = pt.split(".")
            ext = ext[ext.length-1];
            // console.log(pt)
            errorPt = pt
        switch(ext.toLowerCase()){
            case "fnt":
                solveFnt(pt , out)
                break;
            case "json":
                solveJSON(pt , out)
                break;
            case "plist":
                solvePlist(pt ,  out);
                break;
            case "atlas":
                solveAtlas(pt , out);
                break;
            
            case "ttf":
            case "png":
            case "jpg":
            case "mp3":
                push(pt,out)
        }
    })
}catch(e){
    console.log(e,"\n==================="+errorPt)
    return;;
}

    // console.log(out)
    return out;




    function solveFnt(ss , out){
        let reader = fs.readFileSync(path.resolve(ss),"utf8");
        let fileName =  reader.match(/file=['"]([\.\w]+)['"]/im)[1]
        push(path.dirname(ss) + "/" + fileName , out);
    }

    function solveAtlas(ss, out){
        let reader = fs.readFileSync(path.resolve(ss),"utf8");
        let fileName = reader.match(/[\r\n\t]+([\.\w]+)/im)[1];
        push(path.dirname(ss) + "/" + fileName , out);
        push(ss,out);
    }

    function solvePlist(ss , out){
       
        push(ss,out)

        let reader = fs.readFileSync(path.resolve(ss),"utf8");
        
        var list = plist.parse(reader);
        
        var fileName = list.metadata.textureFileName;
        
        ss = ss.split("/");
        ss[ss.length-1] = fileName
        push(ss.join("/"),out)
  }

    function solveJSON(ss , out){
        let reader = fs.readFileSync(path.resolve(ss),"utf8")
        
        var file = JSON.parse(reader);
        let keyWorkds = ["bones","slots","bone"]
        if(isDragonBone(file,keyWorkds)){
            push(ss,out)
        }else{
            let resource = file.Content.Content.UsedResources;
            var consoletemp = []
            console.log("path ===>", ss)
            
            let curDir = ss.split("/")
                //拿到路径
                curDir.pop();
                resource.forEach(function(pt){
                    //../../bnts/MajionTableBtns.plist
                    pt = pt.split("/");
                    let pas = curDir.slice(0)
                    let temp;

                    while(temp = pt.shift()){
                        if(temp===".."){
                            pas.pop();
                        }else if(temp==="."){
                            //do no thing
                        }
                        else{
                            pas.push(temp)
                        }
                    }

                    push(pas.join("/"),out)
                    
                })
                
            push(ss,out);
        }

    
        function isDragonBone(obj , keys){
            var clone = keys.slice(0);
            var temp;
    
            if(typeof obj!=="object")
                return false;
    
            var tempkey = Object.keys(obj)
            while( (temp=tempkey.shift())){
    
                var index = clone.indexOf(temp)
    
                if(index!==-1){
                    clone.splice(index,1)
                }
    
                if(clone.length===0)
                    return true;
                
    
            }
    
            for(var k in obj)
                if(isDragonBone(obj[k],clone))
                    return true;
            
            return false;
        }
    }

}

function collectASTValue(ast,pkgs , key){

    let rootBody = ast.body;

    //临时提取变量存储
    let temp = {}

    //去掉最外围变量等定义，直接到方法体，具体是因为ts对单文件的处理方式
    rootBody =  rootBody.filter(function(v){
        return v.type === "ExpressionStatement"
    })
    
    
    pkgs.forEach(function(pkg){
        //拿到$WECHAT_PACK_RESOURCE$文本位置
        let start = pkg.start;
        let end = pkg.end;
    
        //拿到当前包含的函数
        let wrapIn =  rootBody.filter(function(v){
            return v.start < start && end < v.end;
        })[0];
        
        //拿到花括号内的节点
        let block = getOutBlockStatement(wrapIn)
        //拿到花括号里面的节点集合
        block = getChildContext(block)
        //方法内赋值表达式
        //只保留值定义和操作符赋值
        block =  block.filter(function(v){
            let exp  = getChildContext(v)
            return v.type==="ExpressionStatement" && exp.operator === "=" || v.type==="VariableDeclaration";
        })
    

    
 
        block.forEach(function(v){
            //拿到具体 定义
            let exp = getChildContext(v);
    
            //var 定义
            if(v.type==="VariableDeclaration"){
                exp.forEach(function(vs){
                    
                    let l =  vs.left;
                    let r = vs.right;
    
                    declare(l , temp);
    
                    if(r.type==="ArrayExpression"||r.type==="ObjectExpression"){
                        r = getValue(vs.right)
                    }
    
                    if(l.type==="Identifier")
                        temp[l.name] = r;
                    else if(l.type==="MemberExpression"){
                        setToMember(l,temp,r)
                    }
                })
            }
    
            //object引用
            if(v.type==="ExpressionStatement"){
                let l = exp.left;
                let r = exp.right;
    
                declare(l , temp);
                
                if(r.type==="ArrayExpression"||r.type==="ObjectExpression"){
                    r = getValue(r)
                }
                
                if(l.type==="Identifier")
                    temp[l.name] = r;
                else if(l.type==="MemberExpression"){
                    setToMember(l,temp,r)
                }
    
            }
            
    
        })
        
    })

    // console.log(temp)
    
    return getPackFile(temp , key);
}



function getPackFile(source , okey){

    let keyObject = searchObject(source);
    let out = []

    keyObject.forEach(function(pk){
        let path;
        let vss;
        if(pk.type ==="MemberExpression"){
            path = pk.virtualPath;
            vss = visit(path , source);
            applyToArray(vss)
        }else if(pk.type==="Identifier"){
            if(source[pk.key] instanceof Array)
                source[pk.key].forEach(function(ov){
                    if(ov.virtualPath)
                        out.push(visit(ov.virtualPath , source))
                    else 
                        out.push(ov);
                })
            else 
                Object.keys(source[pk.key]).forEach(function(ok){
                    var tempo = source[pk.key];
                    if(tempo[ok].virtualPath)
                        out.push(visit(ok.virtualPath , source))
                    else 
                        out.push(tempo[ok])
                })
            // Object.assign(out,source[pk.key]); 
        }
        
    })


    return out;

    function applyToArray(vs){
        if(vs instanceof Array)
            for(var i =0 ; i< vs.length;i++)
              if( !(vs[i] instanceof Object))
                out.push(vs[i])
              else
                applyToArray(vs[i])
        else
            for(var k in vs)
              if( !(vs[k] instanceof Object))
                out.push(vs[k]);
              else
                applyToArray(vs[k])
    }
    
    function searchObject(obj){
        var keys = Object.keys(obj);
        var key;
        var out;
        if(keys.indexOf(okey)===-1)
            while(key = keys.shift())
                if(!(obj[key] instanceof acorn.Node))
                 return searchObject(obj[key])
        
        return obj[okey]
    }

    function visit(path ,temp){
        
        path.forEach(function(p){
            temp = temp[p]
        })

        return temp;
    }

}


function getChildContext(node , withType){
    let igore = ["Identifier" , "AssignmentExpression" , "MemberExpression"]
    if(withType===true && igore.indexOf(node.type)===-1)
      return {type:node.type , node:getChildContext(node , false)};

    switch(node.type){
        case "ExpressionStatement":
            return node.expression;
        case "CallExpression":
            return node.callee;
        case "FunctionExpression":
        case "BlockStatement":
            return node.body;
        case "AssignmentExpression":
            return {left:node.left,right:node.right,type:"AssignmentExpression"};
        case "MemberExpression":
            return {object:node.object,property:node.property,type:"MemberExpression"}
        case "VariableDeclaration":
            return node.declarations.map(function(v){return{left:v.id,right:v.init,type:v.type}});
        case "ArrayExpression":
            return node.elements;
        case "ObjectExpression":
            return node.properties;
        case "Literal":
            return node.value;
        case "Property":
            return {key:node.key.name || node.key.value,value:node.value}
        case "Identifier":
            return {key:node.name,type:"Identifier"}
    }
}



function getValue(node){
    let r;
    if(node.type==="ArrayExpression"){
        r = getChildContext(node);
        r = r.map(function(vss){
            let out
            let vsss = getChildContext(vss)
                
            if(vss.type==="MemberExpression"){
                vsss.virtualPath = getMemberExpPath(vss);
            }

            return vsss;
        });

    }else if(node.type==="ObjectExpression"){
        r = getChildContext(node);
        r = r.map(function(vss){
            let kind = getChildContext(vss);
            let key = kind.key;
            let val = getChildContext(kind.value , true);
            if(val.node instanceof Object)
              return {key:key,value:val};
            else 
              return {key:key,value:val.node};
        })
        r = {type:"ObjectCollection",data:r}
    }


    return r;
}

function declare(node , temp){
    let pt;
    if(node.type==="MemberExpression"){
        pt = getMemberExpPath(node);
        pt.forEach(function(ns){
            if(temp[ns]===void 0)
                temp = temp[ns] = {};
            else
                temp = temp[ns]
        })
    }else if(node.type ==="Identifier"){
        let name  = node.name;
        temp[name] =  temp[name] || {};
    }
}

function setToMember(node , temp , value){
    let pt,last;
    if(node.type==="MemberExpression"){
        pt = getMemberExpPath(node);
        last = pt.pop();
        temp = visit(pt,temp);
        if(value.type==="ObjectCollection"){
            value.data.forEach(function(v){
              if(v.value instanceof Object){
                _setToChild(v,temp[last])
              }else
                temp[last][v.key] = v.value;
            })
        }
        else
            temp[last] = value
    }

    function _setToChild(node, root){
      let val = node.value;
      if(val.type==="ArrayExpression"){
        root[node.key] = []
        
      }else if(val.type==="ObjectExpression"){
        let temp= root[node.key] = {}
        val.node.forEach(function(v){
          let kv = getChildContext(v,true)
          if(kv.node instanceof Object){
            kv.node.value = getChildContext(getChildContext(v).value,true)
            _setToChild(kv.node,temp)        
          }else{
            temp[kv.key] = kv.node;
          }
        })
      }else{
        root[node.key] = node.value.node;
      }
    }

    function visit(path , temp){
        path.forEach(function(v){
            temp =  temp[v]
        })
        return temp;
    }
}




function getOutBlockStatement(node){
    let n = getChildContext(node);
    if(n.type!=="BlockStatement"){
        return getOutBlockStatement(n);
    }
    return n;
}

function getMemberExpPath(node,out , root){
    let prop = getChildContext(node);
        out = out || [];
        root = root || node
        out.push(prop.property.name)
    if(prop.object.type==="MemberExpression")
        getMemberExpPath(prop.object,out , root)
    else
        out.push(prop.object.name);

    if(node===root)
        out = out.reverse();

    return out;
}



module.exports.parse = parse;