namespace common {
    const { BindEvent, doBindEvent } = kaayou._decorator;

    export class gameShareLayer extends kaayou.Layer {
        btn_wx: ccui.Button = null;
        btn_xl: ccui.Button = null;
        btn_dd: ccui.Button = null;
        btn_xx: ccui.Button = null;
        btn_qyq: ccui.Button = null;

        btn_layout: ccui.Layout = null;
        type: number = null;

        private ShareStatus: boolean = false;

        //type 0:游戏  1:小结算
        constructor(type: number) {
            super();
            this.type = type;
            this.initUI(type);
        }

        @doBindEvent
        initUI(type: number) {
            this.initWithccs(common.res.gameShareLayer_json);

            this.btn_layout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "shareLayout");
            this.btn_layout.setPadding({ left: 30, spacingX: 40, right: 30 });
            this.btn_layout.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Horizontal);
            this.btn_layout.setHorizontal(ccui.Layout.LayoutHorizontal.LEFT);
            this.btn_layout.doChildrenLayout();

            this.btn_wx = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_wx");
            this.btn_xl = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_xl");
            this.btn_dd = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_dd");
            this.btn_xx = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_xx");
            this.btn_qyq = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_qyq");

            let configData = common.mod.Config.GetAppConfig();
            let c_type = JSON.parse(configData.shareType).lobby;
            this.btn_wx.setVisible(!!(c_type & 1))
            this.btn_dd.setVisible(!!(c_type & 2))
            this.btn_xx.setVisible(!!(c_type & 4))
            this.btn_xl.setVisible(!!(c_type & 8))
            this.btn_qyq.setVisible(!!(c_type & 32))
            this.btn_layout.doChildrenLayout();

            let shareBg = <ccui.ImageView>ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "shareBg");
            shareBg.setContentSize(this.btn_layout.getContentSize());

            this.setVisible(false);

            if (this.type == 0) {
                shareBg.setPosition(cc.winSizeCustom.width / 2 - shareBg.width / 2, cc.winSizeCustom.height / 2 - shareBg.height / 2 + 80);
            }
            else {
                shareBg.setPosition(cc.winSize.width * 0.6 - shareBg.width / 2, 150);
            }

            if (type == 0) {
                this.btn_wx.on(kaayou.TouchEvent.TouchEnd, this.onInvite.bind(this, this.btn_wx), this);
                this.btn_xl.on(kaayou.TouchEvent.TouchEnd, this.onInvite.bind(this, this.btn_xl), this);
                this.btn_dd.on(kaayou.TouchEvent.TouchEnd, this.onInvite.bind(this, this.btn_dd), this);
                this.btn_xx.on(kaayou.TouchEvent.TouchEnd, this.onInvite.bind(this, this.btn_xx), this);
            } else {
                this.btn_wx.on(kaayou.TouchEvent.TouchEnd, this.onShare.bind(this, this.btn_wx), this);
                this.btn_xl.on(kaayou.TouchEvent.TouchEnd, this.onShare.bind(this, this.btn_xl), this);
                this.btn_dd.on(kaayou.TouchEvent.TouchEnd, this.onShare.bind(this, this.btn_dd), this);
                this.btn_xx.on(kaayou.TouchEvent.TouchEnd, this.onShare.bind(this, this.btn_xx), this);
            }
        }


        async onInvite(e) {
            console.log(e);

            let data = await kaayou.emit(this.getModuleName(), 'mod::getInviteData', null, true);
            console.log("房间内分享的数据",data);
            kaayou.SoundManager.getInstance().setBtnClickSounds();
            switch (e.name) {
                case 'btn_wx':
                    kaayou.PlatformMgr.getInstance().wx.ShareURL(data['title'], data['text'], data['url']);
                    break;
                case 'btn_dd':
                    kaayou.PlatformMgr.getInstance().dd.DDShareURL(data['title'], data['text'], data['url']);
                    break;
            }
        }

        onShareBtn() {
            if (!this.ShareStatus) {
                this.setRenderTexture();
            }
            kaayou.SoundManager.getInstance().setBtnClickSounds();
            this.setVisible(true);
        }

        onShareClose() {
            this.setVisible(false);
            this.ShareStatus = false;
        }

        fullPath = "";
        setRenderTexture() {
            if (!cc.sys.isNative) {
                return;
            }
            let winSize = cc.director.getWinSize();

            var texture = new cc.RenderTexture(Math.floor(winSize.width), Math.floor(winSize.height));
            texture.setPosition(cc.p(winSize.width / 2, winSize.height / 2));
            texture.begin();
            cc.director.getRunningScene().visit();
            texture.end();

            var fileName = "result_share.jpg";
            this.fullPath = jsb.fileUtils.getWritablePath() + fileName;
            if (jsb.fileUtils.isFileExist(this.fullPath)) {
                jsb.fileUtils.removeFile(this.fullPath);
            }
            let self = this;
            texture.saveToFile(fileName, cc.IMAGE_FORMAT_JPEG, true, function () {
                self.ShareStatus = true;
            }.bind(this));
        }

        onShare(e) {
            kaayou.SoundManager.getInstance().setBtnClickSounds();
            this.visible = false;
            if (!this.ShareStatus) {
                console.log("截屏文件尚未保存完毕，请稍后尝试分享");
                kaayou.emit('common', 'ui::Toast::Show', { msg: "截屏文件尚未保存完毕，请稍后尝试分享" });
                return;
            }
            this.ShareStatus = false;
            
            switch (e.name) {
                case 'btn_wx':
                    kaayou.PlatformMgr.getInstance().wx.ShareImage("", this.fullPath);
                    break;
                case 'btn_dd':
                    kaayou.PlatformMgr.getInstance().dd.DDShareImage("", this.fullPath);
                    break;
            }
        }


        setShareStatus(v: boolean) {
            this.ShareStatus = v;
        }

        getShareStatus() {
            return this.ShareStatus;
        }

    }

}