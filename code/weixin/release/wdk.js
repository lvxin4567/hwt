(function (g) {


    var los = window.sessionStorage = {
      _data: {},
      setItem: function (key, value) {
        los._data[key] = value
      },
      getItem: function (key) {
        return los._data[key];
      },
      removeItem:function(key){
        return delete los._data[key]
      }
    }



    var launArgs = wx.getLaunchOptionsSync();

    var WDKError = function (msg) {
        throw Error("wdk error:" + msg)
    }

    var WDKWarn = function (msg) {
        console.warn("wdk warning:" + msg)
    }

    var isUndefined = function (o) {
        return typeof o === "undefined";
    }

    var isFunction = function (o) {
        return typeof o === "function";
    }

    var isObject = function (o) {
        return typeof o === "object";
    }

    var ef = function () {}

    var logError = function (str) {
        var ms = str.split(":");
        var head = ms[0];
        var msg = ms[1];

        if (msg === "ok")
            return false;

        WDKWarn("[" + head + "]" + msg);

        return true;
    }

    //缓存部分
    Object.assign(g, {
        sessionStorage: {
            getItem: function (key) {
              return los.getItem(key)
            },
            setItem: function (key, value) {
              return los.setItem(key,value);
            },
            removeItem: function (key) {
              return los.removeItem(key);
            },
            keys: function () {
              return Object.keys(los._data) 
            },
            clear: function () {
                los._data = {}
            }
        },
        localStorage: {
            getItem: function (key) {
                return wx.getStorageSync(key) || null;
            },
            setItem: function (key, value) {
                wx.setStorageSync(key, value);
            },
            removeItem: function (key) {
                wx.removeStorageSync(key)
            },
            keys: function () {
                const res = wx.getStorageInfoSync()
                return res.keys;
            },
            clear: function () {
                wx.clearStorageSync();
            }
        }
    })

    var sysInfo = wx.getSystemInfoSync();
    var sys = {}

    Object.defineProperties(sys, {
        screen: {
            get: function () {
                return {
                    width: sysInfo.windowWidth,
                    height: sysInfo.windowHeight,
                    statusBarHeight: sysInfo.statusBarHeight,
                    pixelRatio: sysInfo.pixelRatio
                }
            }
        },
        isAndroid: {
            get: function () {
                return !!~sysInfo.system.indexOf("Android")
            }
        },
        isIOS: {
            get: function () {
                return !!~sysInfo.system.indexOf("iOS")
            }
        },
        aspectRatio: {
            get: function () {
                var sc = sys.screen;
                var d = sc.width / sc.height;

                var in4_3 = 4 / 3;
                var in16_9 = 16 / 9;
                var in18_9 = 2;
                var in19d5_9 = 19.5 / 9;

                if (between(in18_9, in19d5_9, d))
                    return in19d5_9;
                else if (between(in16_9, in18_9, d))
                    return in18_9;
                else if (between(in4_3, in16_9, d))
                    return in16_9;
                else if (between(1, in4_3, d))
                    return in4_3;
                return d;


                function between(a, b, bt) {
                    return (a > bt) && (b >= bt);
                }

            }
        },
        query: {
            get: function () {
                return launArgs.query;
            }
        }
    })

    //系统信息
    Object.assign(g, {
        sys: sys
    })


    //分享，客服
    Object.assign(g, {
        AppShare: function (opt) {

            opt = opt || {};

            const iid = opt.iid || null;
            const img = opt.url;
            const title = opt.title;
            let query = opt.query || "";

            if (isObject(query))
                query = Object.keys(query).map(function (k) {
                    return k + "=" + query[k].toString();
                }).join("&")

            wx.shareAppMessage({
                title: title,
                imageUrl: img,
                query: query,
                imageUrlId: iid
            })
        },

    })



    var AD = {
        _ad: null,
        create: function (opt, force) {

            var id = opt.adUnitId;
            force = force === true;

            if (AD._ad === null || force)
                AD._ad = wx.createRewardedVideoAd({
                    adUnitId: id
                });

            var ad = AD._ad;

            ad.onLoad(function (e) {
                _hook.emit("adLoad", e)
            })

            ad.onClose(function (e) {
                _hook.emit("adClose", e)
            })

            ad.onError(function (e) {
                _hook.emit("adError", e)
            })

        },
        play: function () {
            if (AD._ad === null)
                return WDKError("没创建AD广告对象")
            var ad = AD._ad;
            ad.load()
                .then(function () {
                    ad.show();
                })
                .catch(function (e) {
                    WDKWarn(e)
                })
        }
    }

    //广告
    Object.assign(g, {
        AD: AD
    })


    var file = {
        _root: "/temp",
        setRoot: function (path) {
            var p = path.match(/\/*(.+)/);
            var rp = file._root.match(/\/*(.+)/);
            var curP;
            if ((p && p[1]) !== rp[1]) {
                curP = "/" + p[1];
                file.remove();
                file._root = curP;
            }
        },
        isFile: function (path) {
            var fm = wx.getFileSystemManager();
            var stat;
            try {
                stat = fm.statSync(file.path + path);
            } catch (e) {
                return false;
            }
            return stat.isFile()
        },
        isDirectory: function (path) {
            var fm = wx.getFileSystemManager();
            var stat;
            try {
                stat = fm.statSync(file.path + path);
            } catch (e) {
                return false;
            }
            return stat.isDirectory()
        },
        exists: function (path) {
            return file.isFile(path) || file.isDirectory(path)
        },
        readLocalFile: function (path) {
            var fm = wx.getFileSystemManager();
            var ps = path.split(/\/+/);
            ps.pop()
            ps = ps.join("/")

            if (file.isDirectory(ps) == false)
                file.mkdir(ps);

            try {
                var buff = fm.readFileSync(path);
                fm.writeFileSync(file.path + path, buff);
            } catch (e) {
                WDKError(e);
            }
        },
        writeFile: function (path, buff, format) {
            var fm = wx.getFileSystemManager();
            try {
                fm.writeFileSync(file.path + path, buff, format || null);
            } catch (e) {
                WDKError(e);
            }
        },
        readFile: function (path, opt) {

            if (file.isFile(path) === false)
                return WDKWarn("您输入的路径非文件")

            if (typeof opt !== "object")
                opt = undefined;

            var fm = wx.getFileSystemManager();
            var type = opt.type;
            var format = opt.format;
            var out;

            if (type === "txt")
                format = "utf-8";
            else if (type === "buffer")
                format = null
            else
                format = "binary"

            try {
                out = fm.readFileSync(file.path + path, format)
            } catch (e) {
                return null;
            }

            return out;
        },
        download: function (url, load, progress, fail) {


            if (isFunction(load) === false)
                load = ef;

            if (isFunction(progress) === false)
                progress = ef;

            if (isFunction(fail) === false)
                fail = ef;


            var process = wx.downloadFile({
                url: url,
                success: function (res) {
                    load(res)
                },
                fail: function (e) {
                    fail(e)
                }
            })

            process.onProgressUpdate(function (res) {
                progress(res.progress, res.totalBytesWritten, res.totalBytesExpectedToWrite);
            })

        },
        unzip: function (url, load, progress, fail) {

            var fm = wx.getFileSystemManager();

            if (isFunction(load) === false)
                load = ef;

            if (isFunction(progress) === false)
                progress = ef;

            if (isFunction(fail) === false)
                fail = ef;

            var success = function (res) {
                let filePath = res.tempFilePath;
                fm.unzip({
                    zipFilePath: filePath,
                    targetPath: file.path,
                    success: function () {
                        load()
                    },
                    fail: function (msg) {
                        fail(msg);
                        WDKWarn(msg);
                    }
                })
            }

            file.download(
                url,
                success,
                progress,
                fail
            );

        },
        mkdir: function (path) {
            var fm = wx.getFileSystemManager();
            try {
                fm.mkdirSync(file.path + path, true);
            } catch (e) {
                WDKWarn(e)
            }
        },
        readDir: function (path) {

            if (file.isDirectory(path) === false)
                return WDKWarn("路径并非文件夹")

            var fm = wx.getFileSystemManager();
            var dir;
            try {
                dir = fm.readdirSync(file.path + path);
            } catch (e) {
                return null;
            }

            return dir;
        },
        remove: function (path) {
            var fileReader = wx.getFileSystemManager();
            path = path || "";
            var ph = file.path + (path || "")
            if (file.exists(path)) {
                try {
                    fileReader.rmdirSync(ph, true);
                } catch (e) {
                    WDKWarn(e);
                    return false;
                }
            }
            return true;
        }

    }


    var fileInfo = {
        used: 0,
        //微信文件系统上限50MB
        all: 50 * 1024 * 1024
    }

    Object.assign(file, {
        getStorageInfo: function () {
            return fileInfo;
        },
        updateStorageInfo: function () {

            var fm = wx.getFileSystemManager();
            var path = "";
            var root = file.path;
            try{
                check(path);
                return true;
            }catch(e){
                return false;
            }

            function check(path){
                var rp =  root+ path;
                if(file.isDirectory(path)){
                    fm.readdir({
                        dirPath:rp,
                        success:function(info){
                            if(!logError(info.errMsg))
                                info.files.forEach(function(f){
                                    check(path+"/"+f)
                                })
                        },
                        fail:function(e){
                            console.log(e);
                        }
                    })
                }else if(file.isFile(path)){
                    fm.getFileInfo({
                        filePath:rp,
                        success:function(info){
                            fileInfo.used+=info.size;
                        }
                    })
                }
            }

        }
    })

    Object.defineProperty(file, "path", {
        configurable: false,
        enumerable: false,
        get: function () {
            return wx.env.USER_DATA_PATH + file._root + "/"
        }
    })

    //文件操作
    Object.assign(g, {
        file: file
    })

    var quantityList = [1, 3, 6, 8, 12, 18, 25, 30, 40, 45, 50, 60, 68, 73, 78, 88, 98, 108, 118, 128, 148, 168, 188, 198, 328, 648]
    //米大师
    Object.assign(g, {
        MIPay: function (opt) {

            var offerId = opt.offerId
            var quantity = opt.quantity;
            var env = opt.env===0 ? 0 : 1

            if (quantityList.indexOf(quantity) === -1)
                return WDKWarn("你发起的支付金额不对，请确定是否在规定范围以内");

            wx.requestMidasPayment({
                mode: 'game',
                offerId: offerId,
                platform: "android", //只有安卓
                buyQuantity: quantity,
                currencyType: "CNY",
                env:env,
                zoneId: 1,
                success: function () {
                    _hook.emit("paySuccess")
                },
                fail: function (err) {
                    _hook.emit("payFail", err)
                }
            })

        }
    })


    var login = {
        _btn: null,
        create: function (opt) {

            var width = opt.width || 2000;
            var height = opt.height || 700;
            var x = opt.left || 0;
            var y = opt.top || 0;
            var click = opt.onclick || ef;

            if (login._btn !== null)
                login.destroy();

            var button = login._btn = wx.createUserInfoButton({
                type: 'text',
                text: '',
                style: {
                    left: x,
                    top: y,
                    width: width,
                    height: height,
                    lineHeight: 0,
                    backgroundColor: '#00000000',
                    color: '#ffffff',
                    textAlign: 'center',
                    fontSize: 16,
                    borderRadius: 4
                }
            })

            button.onTap(function (info) {

                if (logError(info.errMsg)) {
                    _hook.emit("loginCancel", info);
                    return;
                }

                wx.login({
                    success: function (res) {
                        var data = Object.assign({}, info, res)
                        _hook.emit("loginSuccess", data)
                    },
                    fail: function (e) {
                        _hook.emit("loginFail", e)
                    }
                })
                click(info)
            })

        },
        destroy: function () {
            if (login._btn !== null) {
                login._btn.destroy();
                login._btn = null;
            }
        },
        style: function (obj) {
            if (isObject(obj)) {
                for (var k in obj)
                    login._btn.style[k] = obj[k];
            }
        },
        show: function () {
            if (login._btn)
                login._btn.show();
        },
        hide: function () {
            if (login._btn)
                login._btn.hide();
        }

    }

    Object.defineProperties(login, {
        image: {
            get: function () {
                if (login._btn === null)
                    return null;
                return login._btn.image
            },
            set: function (src) {
                if (login._btn !== null)
                    login._btn.image = src
            }
        },
        text: {
            get: function () {
                if (login._btn === null)
                    return null;
                return login._btn.text
            },
            set: function (txt) {
                if (login._btn !== null)
                    login._btn.text = txt
            }
        }
    })


    Object.assign(g, {
        login: login
    });

    var feed = {
        _btn: null,
        create(opt) {

            opt = opt || {}

            if (feed._btn !== null) {
                feed_btn.destroy();
                feed._btn = null;
            }

            const width = opt.width || 200;
            const height = opt.height || 40;
            const x = opt.left || 10;
            const y = opt.top || 76;
            const click = opt.onclick || ef;
            const title = opt.title || '打开意见反馈页面';
            const transparent = opt.transparent === true ? "#ffffff00" : "#ff0000"
            let button;


            button = feed._btn = wx.createFeedbackButton({
                type: 'text',
                text: title,
                style: {
                    left: x,
                    top: y,
                    width: width,
                    height: height,
                    lineHeight: 40,
                    backgroundColor: transparent,
                    color: '#ffffff',
                    textAlign: 'center',
                    fontSize: 16,
                    borderRadius: 4
                }
            });


            button.onTap(click)

        },
        style: function (obj) {
            if (isObject(obj)) {
                for (var k in obj)
                    feed._btn.style[k] = obj[k];
            }
        },
        show: function () {
            if (feed._btn)
                feed._btn.show();
        },
        hide: function () {
            if (feed._btn)
                feed._btn.hide();
        },
        destroy: function () {
            if (feed._btn !== null) {
                feed_btn.destroy();
                feed._btn = null;
            }
        }
    }

    Object.defineProperties(feed, {
        image: {
            get: function () {
                if (feed._btn === null)
                    return null;
                return feed._btn.image
            },
            set: function (src) {
                if (feed._btn !== null)
                    feed._btn.image = src
            }
        },
        text: {
            get: function () {
                if (feed._btn === null)
                    return null;
                return feed._btn.text
            },
            set: function (txt) {
                if (feed._btn !== null)
                    feed._btn.text = txt
            }
        }
    })


    Object.assign(g, {
        feedback: feed
    })


    Object.assign(g,{
        UI:{
            toast:function(msg , icon , duration){
                icon = icon || "success"
                duration = duration || 1500;
                wx.showToast({
                    title:msg,
                    icon:icon,
                    dulation:duration
                })
            },
            modal:function(opt){

                var config  = {
                    title:opt.title,
                    content:opt.content
                }

                var success = opt.success;
                var cancel = opt.cancel;

                if(isFunction(cancel))
                    config.showCancel  = true;
                
                config.success = function(res){
                    if (res.confirm) {
                        success()
                      } else if (res.cancel) {
                        cancel()
                      }
                }

                wx.showModal(config)
            }
        }
    })

    //钩子
    var _hook = {
        //app
        appShow: [],
        appHide: [],
        //广告
        adLoad: [],
        adClose: [],
        adShow: [],
        adError: [],
        //支付
        paySuccess: [],
        payFail: [],
        //登录
        loginSuccess: [],
        loginFail: [],
        loginCancel: [],
        //窗体
        appResize: [],
        add: function (call, list) {
            if (list.indexOf(call) === -1) {
                list.push(call)
            }
        },
        emit: function (key, o) {
            _hook[key].forEach(function (method) {
                method(o);
            })
        }
    }

    var once = function(fn){
        var value = void 0;
        var exec = false;
        return function(){

            if(exec===true)
                return value;
            
            var args = Array.prototype.slice.call(arguments);
            value =  fn.apply(this,args)
            exec = true;
            return value;
        }
    }

    Object.assign(g, {
        hook: {
            once:function(en , call){
                if(_hook[en])
                    _hook.add(once(call),_hook[en]);
            },
            loginSuccess: function (call) {
                if (isFunction(call) === false)
                    return WDKError("你输入了错误的参数，参数需要函数类型")
                _hook.add(call, _hook.loginSuccess);
            },
            loginFail: function (call) {
                if (isFunction(call) === false)
                    return WDKError("你输入了错误的参数，参数需要函数类型")
                _hook.add(call, _hook.loginFail);
            },
            loginCancel: function (call) {
                if (isFunction(call) === false)
                    return WDKError("你输入了错误的参数，参数需要函数类型")
                _hook.add(call, _hook.loginCancel);
            },
            paySuccess: function (call) {
                if (isFunction(call) === false)
                    return WDKError("你输入了错误的参数，参数需要函数类型")

                _hook.add(call, _hook.paySuccess);
            },
            payFail: function (call) {
                if (isFunction(call) === false)
                    return WDKError("你输入了错误的参数，参数需要函数类型")

                _hook.add(call, _hook.payFail);
            },
            appShow: function (call) {
                if (isFunction(call) === false)
                    return WDKError("你输入了错误的参数，参数需要函数类型")

                _hook.add(call, _hook.appShow);
            },
            appHide: function (call) {
                if (isFunction(call) === false)
                    return WDKError("你输入了错误的参数，参数需要函数类型")

                _hook.add(call, _hook.appHide);
            },
            appResize: function (call) {
                if (isFunction(call) === false)
                    return WDKError("你输入了错误的参数，参数需要函数类型")

                _hook.add(call, _hook.appResize);
            },
            adLoad: function (call) {
                if (isFunction(call) === false)
                    return WDKError("你输入了错误的参数，参数需要函数类型")

                _hook.add(call, _hook.adLoad);
            },
            adClose: function (call) {
                if (isFunction(call) === false)
                    return WDKError("你输入了错误的参数，参数需要函数类型")

                _hook.add(call, _hook.adClose);
            },
            adShow: function (call) {
                if (isFunction(call) === false)
                    return WDKError("你输入了错误的参数，参数需要函数类型")

                _hook.add(call, _hook.adShow);
            },
            adError: function (call) {
                if (isFunction(call) === false)
                    return WDKError("你输入了错误的参数，参数需要函数类型")

                _hook.add(call, _hook.adError);
            }

        }
    })

    function makescene(code){

        var scene = {
            shotcut:false,
            search:false,
            share:false,
            qrcode:false,
            app:false,
            ad:false
        }

        if (1104===code || 1103===code)
            scene.shotcut = true;

        if (1001===code || 1006===code ||1027===code || 1042===code)
            scene.search = true;

        if(1007===code || 1008===code || 1036===code)
            scene.share===true;
        
        if(1011===code || 1012===code || 1013===code ||1025===code || 1032===code || 1031===code)
            scene.qrcode = true;

        if(1037===code || 1038===code)
            scene.app = true;

        if(1068===code || 1084===code ||1095===code ||1045===code||1046===code)
            scene.ad = true;

        return scene;
    }

    wx.onShow(function (e) {
        e.from = makescene(e.scene);
        window["$scene"] = e.from;
        _hook.emit("appShow",e);
    })

    wx.onHide(function (e) {
        _hook.emit("appHide", e);
    })


    wx.onWindowResize(function (res) {
        _hook.emit("appResize", res)
    })

})(window.WXJSBridge = {})