const AdmZip = require("adm-zip");
const ph = require("path")
const fs = require("fs")
/*
    // creating archives
    var zip = new AdmZip();
    
    // add file directly
    var content = "inner content of the file";
    zip.addFile("test.txt", Buffer.alloc(content.length, content), "entry comment goes here");
    // add local file
    zip.addLocalFile("/home/me/some_picture.png");
    // get everything as a buffer
    var willSendthis = zip.toBuffer();
    // or write everything to disk
    //target file name
    zip.writeZip("/home/me/files.zip");

*/

function absPath(root , path){
    var idx = path.indexOf(root)
    if(idx===-1)
        return null
    return path.substr(idx) + "";
}

module.exports = function(opt){

    var limit = opt.limit || Infinity;
    var isLimitSize = limit!==Infinity;
    var output = opt.output;
    var path = opt.root;
    var zip = new AdmZip();
    var cb = opt.call
    var outPh = ph.parse(output)
    
    var totalList = []
    var count = 0;
    
    if(fs.existsSync(outPh.dir)===false)
        fs.mkdirSync(outPh.dir)
    
    var api = {
        //由于zip包的最终大小要由deflater库最终压缩才能得出结果，所以这里切割逻辑只能暂时先改成按照文件大小切割
        add:function(buff){
                
            var packPath = absPath(path,buff.path);
            var content = buff.contents;
            zip.addFile(packPath,content);
            cb(api)
            var size = zip.getEntries().reduce((c,v)=>{
                c +=v.header.size
                return c;
            },0)

            if(isLimitSize){

                if(totalList.indexOf(zip)===-1)
                    totalList.push(zip)

              if(size > limit){
                  count++;
                  zip = new AdmZip()
              }

            }

        },
        out:function(){
            console.log(outPh.dir)
            if(isLimitSize){
                totalList.forEach((v,i)=>{
                    v.writeZip(outPh.dir+"/"+(i+1)+".zip")
                })
                return ;
            }
            
            if(outPh.ext!=="")
                zip.writeZip(output);
            else
                zip.writeZip(outPh.dir+"/out.zip")
        }
    }

    return api;
}