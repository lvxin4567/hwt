// module.exports
var fs = require("fs")
var path = require("path");
var jszip = require('jszip');

module.exports.zip = function (config) {
    var files = config.files;
    var dist = config.output;
    var minify = config.zip || false
    console.log(dist)
    var zip = new jszip;
    try {
        files.forEach(function (file) {
            let fpath = file.split("/");
            let name = fpath.pop()
            ext = name.split(".")
            ext = ext[ext.length - 1]

            let source;

            if (ext.toLowerCase() === "json" && minify) {
                source = fs.readFileSync(file, "utf8");
                let strSource = JSON.stringify(JSON.parse(source))

                let folder = zip.folder(fpath.join("/"))
                folder.file(name, Buffer.from(strSource));

            } else {
                source = fs.readFileSync(file)
                let folder = zip.folder(fpath.join("/"))
                folder.file(name, source);
            }

        });

        zip
            .generateNodeStream({
                type: 'nodebuffer',
                compression: "DEFLATE",
                streamFiles: true,
                compressionOptions: {
                    level: 9
                }
            })
            .pipe(fs.createWriteStream(path.resolve(dist)))
            .on("finish", function () {
                console.log("success packed",dist)
            })

    } catch (e) {
        console.log(e)
    }
}