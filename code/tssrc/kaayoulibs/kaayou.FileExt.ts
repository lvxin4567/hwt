/// <reference path="extend.ts" />
namespace kaayou {
    export function addLog(msg: string) {
        console.log(msg);
        let t = new Date(Date.now()).format("yyyy-MM-dd hh:mm:ss");
        if (!cc.sys.isNative) {
            return;
        }
        let file = kaayou.getLogFile();
        let s = kaayou.getLog();
        s += (t + ":" + msg) + "\r\n";
        if (s.length > 10240) {
            s = s.substr(s.length - 1024, 1024);
        }
        kaayou.DataSet.set("CheckLog",s);
        jsb.fileUtils.writeStringToFile(s, file);
    }

    /**
     * 
     * @param DirPath 解压的文件夹
     * @param srcPath 目标资源路径  输入本地apk中的文件
     * @param decPath copy 输出的路径
     * @param call 回调
     */
    function copyAndUnzipLocalPackage(DirPath: string, srcPath: string, decPath: string, call: Function, progressCall?: Function) {
        //创建解压目录
        jsb.fileUtils.createDirectory(DirPath);
        if (!kaayou_jsb.File.copyFile(srcPath, decPath)) { return call("复制zip包失败"); }
        if (!jsb.fileUtils.isFileExist(decPath)) { return call("复制zip包失败"); }
        console.log("decSize:" + jsb.fileUtils.getFileSize(decPath));
        console.log("下载压缩包完成");
        let kzip = new kaayou_jsb.File.ZIP();
        console.log("开始异步解压");
        progressCall && progressCall(2, 0, 0, 0);
        kzip.onError = function (errstr) {
            console.log("解压失败", errstr);
            return call("解压zip包失败");
        }
        kzip.onProgress = function (curpro: number, toatl: number, cur: number) {
            //回调进度
            progressCall && progressCall(3, curpro, toatl, cur);
        }
        kzip.onSuccess = function (curpro: number, toatl: number, cur: number) {
            console.log("解压成功");
            progressCall(4, 100, 0, 0);
            setTimeout(() => {
                //删除掉临时zip包
                jsb.fileUtils.removeFile(decPath);
                call();
            }, 100);
        }
        kzip.unzip(decPath, true);
        // console.log("开始同步解压");
        // if (!kzip.unzip(decPath)) { return false; }
        // jsb.fileUtils.removeFile(decPath);
    }

    //获取缓存目录
    export function getImageCachePath() {
        return jsb.fileUtils.getWritablePath() + "cache-images/";
    }

    export function getLog() {
        if (!cc.sys.isNative) {
            return "";
        }
        let s=kaayou.DataSet.get("CheckLog");
        if(!!s){
            return s;
        }
        let file = kaayou.getLogFile();
        if (jsb.fileUtils.isFileExist(file)) {
            return jsb.fileUtils.getStringFromFile(file);
        } else {
            return "";
        }
    }

    export function getLogFile() {
        if (!cc.sys.isNative) {
            return "";
        }
        let logPath = kaayou.getLogPath();
        if (!jsb.fileUtils.isDirectoryExist(logPath)) {
            jsb.fileUtils.createDirectory(logPath);
        }
        return logPath + "log.txt";
    }

    //获取日志目录
    export function getLogPath() {
        if (!cc.sys.isNative) {
            return "";
        }
        return jsb.fileUtils.getWritablePath() + "logs/";
    }

    //获取资源目录
    export function getRemotePath() {
        return jsb.fileUtils.getWritablePath() + "remote-assets/";
    }

    //获取大厅热更版本
    export function getLobbyVersion() {
        if (!cc.sys.isNative) {
            return App.version;
        }
        return getLocalVersion(kaayou.getRemotePath());
    }
    //获取游戏版本
    export function getSubGameVersion(pakegeName) {
        if(cc.sys.isNative){
            let gamePath = kaayou.getRemotePath() + pakegeName + "/";
            return getLocalVersion(gamePath);
        }else return "web";
    }

    function getLocalVersion(gamePath: string) {
        try {
            if (!cc.sys.isNative) {
                return "web";
            } else {
                if (!jsb.fileUtils.isDirectoryExist(gamePath)) {
                    throw "";
                }
                if (gamePath[gamePath.length - 1] !== '/') {
                    gamePath += '/';
                }
                let projectPath = gamePath + "project.manifest";
                if (jsb.fileUtils.isFileExist(projectPath)) {
                    let str = jsb.fileUtils.getStringFromFile(projectPath);
                    if (!str) { throw ""; }
                    if (!lodash.isString(str)) { throw ""; }
                    if (lodash.isEmpty(str)) { throw ""; }
                    let m = JSON.parse(str);
                    if (!m) { throw ""; }
                    if (!m.version) { throw ""; }
                    if (!lodash.isString(m.version)) { throw ""; }
                    if (lodash.isEmpty(m.version)) { throw ""; }
                    return m.version;
                }
                throw "";
            }
        } catch (e) {
            return "nosearch";
        }
    }

    function getLoaclAssetsPath() {
        if (!cc.sys.isNative) {
            return '';
        }
        if (cc.sys.os == cc.sys.OS_ANDROID) {
            return "assets/";
        } else {
            return '';
        }
    }

    export function sendLog() {
        if (!cc.sys.isNative) {
            return;
        }
        let s = kaayou.getLog();
        kaayou.PlatformMgr.getInstance().sys.PostBugly("CheckLog" + kaayou.getLobbyVersion(), "CheckLog", s);
    }

    export function unZipAssetsPath(call: Function, progressCall?: Function) {
        if (!cc.sys.isNative) {
            return call();
        }
        if (!kaayou_jsb) {
            return call("无法获取资源");
        }
        if (!kaayou_jsb.File) {
            return call("无法获取资源");
        }
        if (jsb.fileUtils.isDirectoryExist(getRemotePath())) {
            //remoteasset 目录已存在
            return call();
        }
        var zipName = 'GameLobby.zip';
        // apk zip 地址
        var zipPath = jsb.fileUtils.fullPathForFilename(getLoaclAssetsPath() + zipName);
        //临时目录
        var tempPath = jsb.fileUtils.getWritablePath() + "remote-assets-temp/";
        // copy到的 临时zip 地址
        var tempzipPath = tempPath + zipName;

        if (!(zipPath && zipPath != '')) {
            //zip包不存在
            return call("无法获取资源");
        }

        progressCall && progressCall(1, 0, 0, 0);

        //准备解压  
        if (jsb.fileUtils.isDirectoryExist(tempPath)) {
            //上次解压失败 删除该目录
            jsb.fileUtils.removeDirectory(tempPath);
        }
        console.log("解压到临时目录:" + tempPath);
        copyAndUnzipLocalPackage(tempPath, zipPath, tempzipPath,
            function (err) {
                if (err) {
                    return call(err);
                }
                //解压成功
                //重命名资源目录
                jsb.fileUtils.renameFile(jsb.fileUtils.getWritablePath(), "remote-assets-temp", "remote-assets");
                console.log("重命名:remote-assets-temp -> remote-assets");
                //回调上层
                return call();
            }, progressCall);
    }

    export function ExistModule(modeulename) {
        var remoteSeachPathRoot = kaayou.getRemotePath();
        //搜索路劲
        var moduleSearchPath = `${remoteSeachPathRoot}${modeulename}`;
        if (!jsb.fileUtils.isDirectoryExist(moduleSearchPath)) {
            return null;
        }

        //描述文件根目录
        var hotProjectFilePath = "";
        if (modeulename == 'common' || modeulename == 'lobby') {

        } else {
            hotProjectFilePath = `${moduleSearchPath}/project.manifest`;
            if (!jsb.fileUtils.isFileExist(hotProjectFilePath)) {
                return null;
            }
        }

        //完整模块路径
        var moduleSrcPath = `${moduleSearchPath}/src/${modeulename}`;
        if (!jsb.fileUtils.isDirectoryExist(moduleSrcPath)) {
            return null;
        }
        //js文件路径
        var moduleFilePath = `${moduleSrcPath}/${modeulename}.module.js`;
        if (!jsb.fileUtils.isFileExist(moduleFilePath)) {
            return null;
        }
        //文件相对路径
        var relativeFilePath = `src/${modeulename}/${modeulename}.module.js`
        return {
            name: modeulename,
            project: hotProjectFilePath,
            search: moduleSearchPath,
            full: moduleFilePath,
            relative: relativeFilePath
        }
    }

    //获取本地所有模块
    export function getLocalModules(): Array<{ name: string, project: string, search: string, full: string, relative: string }> {
        //获取资源目录
        var remoteSeachPathRoot = kaayou.getRemotePath();
        let filelist = jsb.fileUtils.listFiles(remoteSeachPathRoot);
        //目录列表
        let dirlist: Array<string> = [];
        for (var x in filelist) {
            if (jsb.fileUtils.isDirectoryExist(filelist[x])) {
                dirlist.push(filelist[x]);
            }
        }
        var gamemodulelistPath: Array<{
            name: string,
            project: string,
            search: string,
            full: string,
            relative: string
        }> = [];
        dirlist.forEach(function (f) {
            let element = f.replace(remoteSeachPathRoot, '');
            element = element.replace(/(\\)?(\/)/g, '');
            if (element.length > 0 && element != '.' && element != '..') {
                let item = ExistModule(element);
                if (item) {
                    console.log("可能需加载的模块:::  ", item.name, item.search, item.full, item.relative);
                    gamemodulelistPath.push(item);
                }
            }
        });
        return gamemodulelistPath;
    }
}