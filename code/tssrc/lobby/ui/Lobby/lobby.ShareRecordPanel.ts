
namespace lobby {
    const { BindEvent, doBindEvent } = kaayou._decorator;


    export class ShareRecordManager {
        static __INS__: ShareRecordManager = null;
        static getInstance() {
            if (ShareRecordManager.__INS__ == null) {
                ShareRecordManager.__INS__ = new ShareRecordManager();
                ShareRecordManager.__INS__.init();
            }
            return ShareRecordManager.__INS__;
        }
        init() {
            let self = this;
            
            kaayou.getController('lobby').on('ui::ShareRecordPanel::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show(e.data);
            }, this, 10);
            
            kaayou.getController('lobby').on('ui::ShareRecordPanel::Hide', function (e: kaayou.Event) {
                self.getPanel(false).Hide()
            }, this, 10);
            return true;

        }
     
        __selfPanel:ShareRecordPanel = null;
        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new ShareRecordPanel();
                kaayou.UIManager.getInstance().getMainScene().addChild(this.__selfPanel);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }

    }

    

    class ShareRecordPanel extends kaayou.Layer {
        maskBg: cc.Layer = null;
        contentPanel: ccui.Layout = null;
        btn_wx: ccui.Button = null;
        btn_xx: ccui.Button = null;
        btn_xl: ccui.Button = null;
        btn_layout: ccui.Layout = null;
        share_data = null;
        constructor() {
            super();
            this.initUI();
        }
        initUI() {
            this.initWithccs(lobby.res.ShareRecord_Json);
            let self = this;
            this.maskBg = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "maskbg");
            this.contentPanel = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "share_panel");
            this.btn_wx = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_wx");
            this.btn_xx = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_xx");
            this.btn_xl = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_xl");

            this.btn_layout = ccui.helper.seekWidgetByName(<ccui.Widget>this.contentPanel, "btn_layout");
            this.btn_layout.setPadding({ left: 28, spacingX: 40 });
            this.btn_layout.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Horizontal);
            this.btn_layout.setHorizontal(ccui.Layout.LayoutHorizontal.LEFT);
            this.btn_layout.doChildrenLayout();
            this.maskBg.on(kaayou.TouchEvent.TouchEnd, function () {
                //console.log("-----------------------------------------------------------");
                self.Hide();
            }, this);

            this.btn_wx.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                
                if (self.share_data.type == common.mod.SHARE_TYPE.LOBBY_RECORD) {
                    if (self.type === 1)
                        kaayou.PlatformMgr.getInstance().wx.ShareText(self.share_data.title, self.share_data.text, "");
                    if (self.type === 2) {
                        self.node.setVisible(false)
                        self.onImageShareClick(function () {
                            kaayou.PlatformMgr.getInstance().wx.ShareImage("", self.fullImagePath)
                        });
                    }    
                }

                if(self.type===3){
                    //console.log("share" + "type:"+self.type);
                        self.onRecordImageShareClick(function(){
                            kaayou.PlatformMgr.getInstance().wx.ShareImage("", self.fullImagePath)
                        },self.share_data);
                    
                    self.node.setVisible(false)
                }

            }, this);
            this.node.setVisible(false);
        }



        fullImagePath = "";
        ShareStatus: boolean = false;
        onImageShareClick(cb?: Function) {
            if (!this.ShareStatus) {
                this.setRenderTexture(cb);
                // this.setRenderTextureOfRecord(cb);
            }
            kaayou.SoundManager.getInstance().setBtnClickSounds();
            this.node.setVisible(true);
        }

        onRecordImageShareClick(cb?: Function , data?:any) {
            if (!this.ShareStatus) {
                // this.setRenderTexture(cb);
                this.ShareStatus = true;
                this.setRenderTextureOfRecord(cb , data);
            }
            kaayou.SoundManager.getInstance().setBtnClickSounds();
            this.node.setVisible(true);
        }

        // setRenderTexture2() {
        //     NetImage.loadImage("http://pn98o1w56.bkt.clouddn.com/ff5f05dbfdadeff09db31ce56b922fee.jpg").then(function (tex: cc.Texture2D) {
        //         console.log("远程图片加载完毕");
        //         var rend = new cc.RenderTexture(720, 1280);
        //         let sprite: cc.Sprite = new cc.Sprite();
        //         sprite.initWithTexture(tex);
        //         sprite.setAnchorPoint(0, 0);
        //         sprite.setPosition(0, 0);
        //         rend.begin();
        //         sprite.visit();
        //         rend.end();
        //         var spt = new cc.Sprite();
        //         spt.setSpriteFrame(rend.sprite.getSpriteFrame());//这里必须重新创建精灵，否则会报错
        //         //spt.setAnchorPoint(cc.p(0, 0));
        //         spt.setOpacity(255);
        //         spt.setFlippedY(true);

        //         if (!cc.sys.isNative) {
        //             this.node.addChild(spt);
        //             return;
        //         }
        //         var fileName = "tea_result_share.jpg";
        //         this.fullImagePath = jsb.fileUtils.getWritablePath() + fileName;
        //         if (jsb.fileUtils.isFileExist(this.fullImagePath)) {
        //             jsb.fileUtils.removeFile(this.fullImagePath);
        //         }

        //         let format = false

        //         if (cc.sys.os == cc.sys.OS_IOS)
        //             format = true;

        //         if (cc.sys.os == cc.sys.OS_ANDROID)
        //             format = false
        //         rend.saveToFile(fileName, cc.IMAGE_FORMAT_JPEG, format, () => {
        //             this.ShareStatus = true;
        //             rend.release();
        //         });
        //     })
        // }

        

        renderShareData(node:cc.Node){
            let info  = <ccui.Layout>ccui.helper.seekWidgetByName(<ccui.Widget>node,"info")
            let item = <ccui.Layout>ccui.helper.seekWidgetByName(<ccui.Widget>node,"item")
            let share_container= <ccui.ScrollView>ccui.helper.seekWidgetByName(<ccui.Widget>node,"share_container");

            let inf = this.share_data;

            share_container.setScrollBarEnabled(false);
            share_container.setEnabled(false);

             let rulename =<ccui.Text> info.getChildByName("rulename")
             let room = <ccui.Text>info.getChildByName("room")
             let difen = <ccui.Text>info.getChildByName("difen")
             let round = <ccui.Text>info.getChildByName("round")
             let time = <ccui.Text>info.getChildByName("time")

            //细节部分
            let qid = tea.mod.__teaHouseInfo.hid
            let endtime:any = inf.list[inf.list.length-1].endtime
                endtime = Date.format(endtime * 1000, "yyyy-MM-dd hh:mm:ss")
            rulename.setString(`亲友圈：${qid}`)
            room.setString("房号：" + inf.roomid)
            difen.setString("底分："+(inf.difen||""))
            round.setString("局数：" + inf.list.length + "/" + inf.totalround + "局" )
            time.setString("结束时间：" + endtime )

            let o = {idx:-1,score:-Infinity};

            inf.totallist.reduce((v,m,i)=>{
                
                if(m.score>v.score){
                    v.score = m.score;
                    v.idx = i;
                }

                return v;

            },o)

            let list = []
            inf.totallist.forEach((v,i)=>{
                list.push({nickname:v.nickname,uid:v.uid,score:v.score,isBigWin:o.idx===i,cap_id:v.cap_id,cap_nickname:v.cap_nickname,imgurl:v.imgurl})
            })

            list.forEach(v=>{
                let it = item.clone();
                let head= <ccui.ImageView>it.getChildByName("head")
                let lbname = <ccui.Text>it.getChildByName("lbname")
                let lbid = <ccui.Text>it.getChildByName("lbid")
                let lbupartner = <ccui.Text>it.getChildByName("lbupartner")
                let bigwin_icon = it.getChildByName("bigwin_icon")
                let fangzhu_icon = it.getChildByName("fangzhu_icon")
                let score = <ccui.TextBMFont>it.getChildByName("BitmapFontLabel_1")
                fangzhu_icon.setVisible(false)

                if(v.score<=0){
                    score.setFntFile(lobby.res.lobby_share_bignum_fnt)
                    score.setString(v.score)
                }else{
                    score.setFntFile(lobby.res.lobby_share_bignumwin_fnt)
                    score.setString(v.score);
                }

                lbupartner.setVisible(!!tea.mod.__teaHouseInfo.hm_switch.IsRecShowParent);
                

                bigwin_icon.setVisible(v.isBigWin)

                lbname.setString(kaayou.Identify.substrWithEmoji(v.nickname,0,8));
                lbid.setString("ID:"+v.uid)
                if(v.cap_id>1)
                    lbupartner.setString(`归属:${v.cap_id}`)
                else
                    lbupartner.setVisible(false);

                NetImage.setPlayerHead(head, v.imgurl, v.sex);


                it.setPosition(0,0)
                
                share_container.addChild(it)

            })


            share_container.doChildrenLayout();

        }
        
        //去除缓存用的自增
        sii = 0;
        setRenderTextureOfRecord(call:Function,data:any) {
            let node = ccs.load(lobby.res.ShareImagePanel_json, "res/").node;

            this.renderShareData(node)
            
            console.log("开始微信分享")
            //创建画布
            let that = this;
            var rend = new cc.RenderTexture(1280, 720, null, 0x88F0);
            rend.retain();
           
            rend.begin();
            node.visit();
            rend.end();

            let format = false

            if (cc.sys.os == cc.sys.OS_IOS)
                format = true;

            if (cc.sys.os == cc.sys.OS_ANDROID)
                format = false


            var temp= `tea_result_share_1080_${this.sii}.png`; 
            var otemp = jsb.fileUtils.getWritablePath() + temp;
            if (jsb.fileUtils.isFileExist(otemp)) {
                jsb.fileUtils.removeFile(otemp);
            }
            
            var fname = `tea_result_share.jpg`;
            var fileName = `tea_result_share_1080_${++this.sii}.png`;
            var fullImagePath = jsb.fileUtils.getWritablePath() + fileName;
            var ofile =  jsb.fileUtils.getWritablePath() + fname;

            this.fullImagePath = ofile;

            var method = function(texture:cc.Texture2D){
                
                var rend1 = new cc.RenderTexture(720, 1280, null, 0x88F0);
                rend1.retain();
                var sprite3 = new cc.Sprite(fullImagePath);
                //sprite3.initWithTexture( texture);
                sprite3.setRotation(90)
                sprite3.setAnchorPoint(0,0)
                sprite3.setPosition(0,1280)
                rend1.begin();
                sprite3.visit();
                rend1.end();
                //sprite3.removeFromParent(true)



                rend1.cleanup();
                rend1.release();
                rend1.saveToFile(fname, cc.IMAGE_FORMAT_JPEG, format,function(tex:cc.RenderTexture,err){    
                    that.ShareStatus = false;
                    console.log("唤起微信回调");
                    call && call();
                });

                
                
                
            }


            if (jsb.fileUtils.isFileExist(ofile)) {
                jsb.fileUtils.removeFile(ofile);
            }

            rend.saveToFile(fileName, cc.IMAGE_FORMAT_PNG, format, function(){
                rend.cleanup()
                rend.release();
                cc.loader.loadImg(fullImagePath,(err,texture:cc.Texture2D)=>{
                    if(err)
                        console.log(err)
                        
                    setTimeout(() => {
                        method(texture)    
                    }, 100);
                })               
            });

        }


        setRenderTexture(cb?: Function) {
            if (!cc.sys.isNative) {
                return;
            }
            let winSize = cc.director.getWinSize();

            var texture = new cc.RenderTexture(Math.floor(winSize.width), Math.floor(winSize.height), null, 0x88F0);
            texture.retain()
            texture.setAnchorPoint(0, 0);
            // texture.setPosition(cc.p(winSize.width / 2, winSize.height / 2));
            texture.begin();
            cc.director.getRunningScene().visit()
            texture.end();

            var fileName = "tea_result_share.jpg";
            this.fullImagePath = jsb.fileUtils.getWritablePath() + fileName;
            if (jsb.fileUtils.isFileExist(this.fullImagePath)) {
                jsb.fileUtils.removeFile(this.fullImagePath);
            }

            let format = false

            if (cc.sys.os == cc.sys.OS_IOS)
                format = true;

            if (cc.sys.os == cc.sys.OS_ANDROID)
                format = false

            texture.saveToFile(fileName, cc.IMAGE_FORMAT_JPEG, format, () => {
                this.ShareStatus = true;
                texture.release();
                cb && cb();
            });

        }


        btnCall: Array<Function> = null;
        close_call: Function = null;
        type: number;
        Show(data) {
            console.log(JSON.stringify(data.pos));

            //设置是图片还是文字分享
            switch (data.type) {
                case "image":
                    this.type = 2
                    break;
                case "node":
                    this.type = 3;
                    break;
                case "text":
                default:
                    this.type = 1;
            }

            //console.log("share type:====>"+this.type)

            this.share_data = data.shareData;
            this.contentPanel.setPosition(data.pos)
            let configData = common.mod.Config.GetAppConfig();
            let c_type = JSON.parse(configData.shareType).record;
            this.btn_wx.setVisible(!!(c_type & 1))
            this.btn_xx.setVisible(!!(c_type & 4) && false)
            this.btn_xl.setVisible(!!(c_type & 8) && false);

            if (data.hideWX) {   // 如果亲友圈设置禁用了微信。。。不允许分享到微信
                this.btn_wx.setVisible(false);
            }

            this.btn_layout.doChildrenLayout();
            this.node.setVisible(true);

        }
        private _index = -1;
        setIndex(index: number) {
            this._index = index;
        }
        getIndex(): number {
            return this._index;
        }

        Hide() {
            // this.close_call = null;
            // this.btnCall = null;
            this.node.setVisible(false)
        }
    }

}