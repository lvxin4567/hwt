interface PLAYER_HEAD_CALLBACK {
    (url: string): boolean
}

class NetImage {
    //新增缓存
    static Icache ={}
    static loadImage(url) {
        return new Promise(async function (resolve, reject) {
            //lw200520测试用nginx解决头像问题
            //http://121.199.42.238:8019/image?url=http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83erD6MOUwRKV9NyBAqnoFDTnltzAe2zWOkKxyDOFibVBb1ZV5CaATJwYAuNqZ5sXMBC4c8iacaHDf8RA/132&sb=213.jpg
            //let sUrl="http://121.199.42.238:8019/image?url="+url+"&sb=213.jpg";
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
        });
    }

    static doSpriteContentSize(sp: cc.Sprite, size: cc.Size) {
        let csize = sp.getContentSize();
        sp.setScaleX(size.width / csize.width);
        sp.setScaleY(size.height / csize.height);
    }

    static doSpriteContentSizeAndPosition(sp: cc.Sprite, size: cc.Size) {
        let csize = sp.getContentSize();
        sp.setAnchorPoint(0.5, 0.5);
        sp.setPosition(size.width / 2, size.height / 2);
        sp.setScaleX(size.width / csize.width);
        sp.setScaleY(size.height / csize.height);
    }

    static doLoadHeadImageWithLayout(sex: number, imgurl: string, sp: cc.Sprite, size: cc.Size, callback: Function,checkCall: PLAYER_HEAD_CALLBACK | number = null) {
     
        if (imgurl && !lodash.isEmpty(imgurl)) {
            try {
                if (sp["url"] == imgurl) {
                    sp.setVisible(true)  
                    return;
                }
                //lm190821先隐藏，否则会显示上次的头像
                sp.setVisible(false);
                (function (sp1) {
                    NetImage.loadImage(imgurl).then(function (tex: cc.Texture2D) {
                        if (!sp1.isRunning()) { callback("err"); return; }
                        if (checkCall && lodash.isFunction(checkCall)) {
                            let c: PLAYER_HEAD_CALLBACK = <PLAYER_HEAD_CALLBACK>checkCall;// && checkCall(_url) === false
                            if (c(imgurl) === false) {
                                return;
                            }
                        }
                        sp1.initWithTexture(tex);
                        NetImage.doSpriteContentSizeAndPosition(sp1, size);
                        sp1.setVisible(true);
                        sp1["url"] = imgurl;
                        callback(null); return;
                    }).catch(function(err){
                        if (!sp1.isRunning()) { callback("err"); return; }
                        if (!!!cc.spriteFrameCache.getSpriteFrame("nan.png")) {
                            cc.spriteFrameCache.addSpriteFrames(common.res.UserHead_plist);
                        }
                        sp1.initWithSpriteFrameName(sex == 1 ? "nan.png" : "nv.png");
                        NetImage.doSpriteContentSizeAndPosition(sp1, size);
                        sp1.setVisible(true);  
                        sp1["url"] = "";
                    });
                })(sp)
            } catch (err) {
                if (!sp.isRunning()) { callback("err"); return; }
                if (!!!cc.spriteFrameCache.getSpriteFrame("nan.png")) {
                    cc.spriteFrameCache.addSpriteFrames(common.res.UserHead_plist);
                }
                sp.initWithSpriteFrameName(sex == 1 ? "nan.png" : "nv.png");
                NetImage.doSpriteContentSizeAndPosition(sp, size);
                sp.setVisible(true);
                sp["url"] = "";
                if (callback) {
                    callback(null);
                }
            }
        } else {
            if (!!!cc.spriteFrameCache.getSpriteFrame("nan.png")) {
                cc.spriteFrameCache.addSpriteFrames(common.res.UserHead_plist);
            }
            sp.initWithSpriteFrameName(sex == 1 ? "nan.png" : "nv.png");
            NetImage.doSpriteContentSizeAndPosition(sp, size);
            sp["url"] = "";
            sp.setVisible(true);
            if (callback) {
                callback(null);
            }
        }
    }

    static setPlayerHead(headImage: ccui.ImageView, _url: string, sex?: number, checkCall: PLAYER_HEAD_CALLBACK | number = null) {
        if (headImage == null) return;
        let headImgSp: cc.Sprite = null;

        if (headImage.getChildren().length < 1) {
            headImgSp = new cc.Sprite();
            headImgSp.setVisible(false);
            headImage.addChild(headImgSp);
            headImgSp.setName("headImgSp");
        } else {
            headImgSp = <cc.Sprite>headImage.getChildren()[0];
            //如果头像地址未变化，原头像还是显示
            headImgSp.setVisible(_url == headImgSp['_url']);
        }

        if (_url && !lodash.isEmpty(_url)) {
            (function (sp:cc.Sprite, _layouts:ccui.ImageView) {
                if (!sp) { return; }
                if (!_layouts) { return; }
                let tex =NetImage.Icache[_url];
                console.log("读取头像图片缓存："+_url);
                if(!!tex){
                    console.log("setPlayerHead tex:"+tex);
                    try{
                        sp.initWithTexture(tex);
                        NetImage.doSpriteContentSizeAndPosition(sp, _layouts.getContentSize());
                        sp.setVisible(true);
                        sp['_url'] = _url;
                        return ;
                    }
                    catch(ex){
                        NetImage.Icache[_url]=null;
                    }
                }

                NetImage.loadImage(_url).then(function (tex: cc.Texture2D) {
                    if (!sp.isRunning() || !_layouts.isRunning()) { return; }
                    if(!NetImage.Icache[_url]){
                        console.log("存头像图片缓存："+_url);
                        NetImage.Icache[_url] = tex;
                    }
                    if (checkCall && lodash.isFunction(checkCall)) {
                        let c: PLAYER_HEAD_CALLBACK = <PLAYER_HEAD_CALLBACK>checkCall;// && checkCall(_url) === false
                        if (c(_url) === false) {
                            return;
                        }
                    }
                    sp.initWithTexture(tex);
                    NetImage.doSpriteContentSizeAndPosition(sp, _layouts.getContentSize());
                    sp.setVisible(true);
                    sp['_url'] = _url;
                });
            })(headImgSp, headImage);
        } else {
            if (!sex) {
                sex = 1
            }
            if (!!!cc.spriteFrameCache.getSpriteFrame("nan.png")) {
                cc.spriteFrameCache.addSpriteFrames(common.res.UserHead_plist);
            }
            headImgSp.initWithSpriteFrameName(sex == 1 ? "nan.png" : "nv.png");
            NetImage.doSpriteContentSizeAndPosition(headImgSp, headImage.getContentSize());
            headImgSp.setVisible(true);
            headImgSp['_url'] = _url;
        }
    }

    static loadImageWithSaveLocal(url) {
        return new Promise(async function (resolve, reject) {
            cc.loader.loadImg(url, { isCrossOrigin: true }, function (err, tex) {
                console.log("loadImageWithSaveLocal:" + url);
                if (err) {
                    console.log("loadImageWithSaveLocal failed");
                    return reject(err);;
                }
                if (typeof (tex) != "undefined" && tex != null) {
                    let temp = {};
                    if (!cc.sys.isNative) {
                        var texture2d = new cc.Texture2D();
                        texture2d.initWithElement(tex);
                        texture2d.handleLoadedTexture();
                        temp["texture2d"] = texture2d;
                        resolve(texture2d);
                    } else {
                        let path = jsb.fileUtils.getWritablePath() + "imageCache/";
                        if (!jsb.fileUtils.isDirectoryExist(path)) {
                            console.log("imageCache目录不存在，开始创建");
                            jsb.fileUtils.createDirectory(path);
                        }
                        if (!jsb.fileUtils.isDirectoryExist(path)) {
                            console.log("创建目录失败");
                            return;
                        }

                        var size = cc.director.getWinSize();
                        var pBg = new cc.Sprite();
                        pBg.initWithTexture(tex);
                        pBg.setPosition(pBg.width / 2, pBg.height / 2);

                        var pRTex = new cc.RenderTexture(Math.floor(pBg.width), Math.floor(pBg.height));
                        pRTex.begin();
                        pBg.visit();
                        pRTex.end();

                        let filename = "imageCache/" + kaayou.MD5.encode(url) + ".jpg";
                        pRTex.saveToFile(filename, cc.IMAGE_FORMAT_JPEG, false, function (render: cc.RenderTexture, str: string) {
                            temp["texture2d"] = texture2d;
                            temp["filename"] = str;
                            console.log("loadImageWithSaveLocal saveToFile:" + str);
                            resolve(temp);
                        });
                        console.log("loadImageWithSaveLocal filename:" + filename);
                    }
                }
            });
        });
    }

}