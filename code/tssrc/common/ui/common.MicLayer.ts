namespace common {
    export class MicLayer<IBaseModT extends common.mod.gameBaseMod<mod.IGame_User_Info, mod.ITableInfo>> extends kaayou.Layer {
        minBtn: ccui.Button = null;
        voicesSp: ccui.ImageView = null;
        cancelBox: cc.Node = null;
        effective: boolean = true;
        mod_game: IBaseModT = null;

        constructor(minBtn: ccui.Button, mod: IBaseModT) {
            super();
            cc.spriteFrameCache.addSpriteFrames(res.micLayerPlist);
            this.minBtn = minBtn;
            this.mod_game = mod;
            this.initUi();
        }

        _isCancel: boolean = false;

        initUi() {
            this.initWithccs(res.micLayer_json);
            this.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
            this.voicesSp = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "voicesSp");
            this.cancelBox = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "cancelBox");

            if (!this.minBtn) {
                cc.error("minBtn is null");
                return;
            }
            // this.lasttime = Date.unix();
            this.lasttime = Math.floor((new Date()).getTime() / 1000);
            this.cancelBox.visible = false;
            this.voicesSp.visible = false;
            this.bindEvent();
            // let userinfo = UserMod.getInstance().getUserInfo();
            this.minBtn.visible = kaayou.PlatformMgr.getInstance().im.IsLoginOK();
        }

        curPIndex = 1;
        lasttime = 0;
        isMicStart = false;
        isMicPlayStart = false;
        bindEvent() {
            let self = this;
            this.schedule(function () {
                if (!self.voicesSp.visible) { return; }
                if (!self.effective) return;
                self.curPIndex = self.curPIndex > 5 ? 1 : self.curPIndex;
                self.voicesSp.loadTexture('yy_' + self.curPIndex + '.png', ccui.Widget.PLIST_TEXTURE);
                self.curPIndex++;
            }, 0.2, cc.REPEAT_FOREVER);

            kaayou.getController().on("MicLoginOK", function () {
                try{
                    if(!!self.minBtn){
                        self.minBtn.visible = true;
                    }
                }catch(err){
                    console.log("MicLoginOK ERR:",err)
                }
            }.bind(this), this);

            kaayou.getController().on("MicStart", function () {
                kaayou.SoundManager.getInstance().setMute(true);
                self.isMicStart = true;
            }, this);
            kaayou.getController().on("MicStop", function () {
                self.isMicStart = false;
            }, this);
            kaayou.getController().on("MicFail", function () {
                kaayou.SoundManager.getInstance().setMute(false || self.isMicPlayStart);
                self.isMicStart = false;
            }, this);

            kaayou.getController().on('MicPlayStart', function (e: kaayou.Event) {
                kaayou.SoundManager.getInstance().setMute(true);
                self.isMicPlayStart = true;
            }, this);

            kaayou.getController().on('MicPlayEnd', function (e: kaayou.Event) {
                console.log("on MicPlayEnd isMicStart:",self.isMicStart);
                kaayou.SoundManager.getInstance().setMute(false || self.isMicStart);
                self.isMicPlayStart = false;
            }, this);

            let testGVoiceCount = 0;
            this.minBtn.on(kaayou.TouchEvent.TouchStart, function (e: kaayou.TouchEvent) {
                self.effective = true;
                let playernum = self.mod_game.getCurPlayerNum();

                //for test GVoice
                if (!cc.sys.isNative) {
                    kaayou.PlatformMgr.getInstance().gvoice.OnMemberVoice(99, (++testGVoiceCount) % 2);
                }
                if (playernum < 2) {
                    self.effective = false;
                    kaayou.emit('common', 'ui::Toast::Show', { msg: '没有聊天对象,赶紧找一个吧', time: 0.5, mask: false })
                    return;
                }

                if (self.isMicPlayStart) {
                    self.effective = false;
                    kaayou.emit('common', 'ui::Toast::Show', { msg: '语音播放中，不能录音', time: 0.5, mask: false })
                    return;
                }

                let curTime = Math.floor((new Date()).getTime() / 1000);
                let subTime = curTime - self.lasttime;

                if (subTime <= 2) {
                    self.effective = false;
                    kaayou.emit('common', 'ui::Toast::Show', { msg: '发送太频繁了哦', time: 0.5, mask: false })
                    return;
                }
                self.lasttime = curTime;
                self.curPIndex = 3;
                self.cancelBox.visible = false;
                self.voicesSp.visible = true;
                self.voicesSp.loadTexture('yy_3.png', ccui.Widget.PLIST_TEXTURE);
                kaayou.PlatformMgr.getInstance().im.BeginMic();

            }, this);
            this.minBtn.on(kaayou.TouchEvent.TouchMove, function (e: kaayou.TouchEvent) {
                if (!self.effective) {
                    return;
                }
                let node = (<ccui.Widget>e.target);
                let vec = node.convertToNodeSpace(node.getTouchMovePosition());
                let rect:cc.Rect = cc.rect(0, 0, node.width, node.height);
                let b: boolean = cc.rectContainsPoint(rect,vec);
                self._isCancel = self.cancelBox.visible = !b;
                self.voicesSp.visible = b;
            }, this);
            this.minBtn.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                if (!self.effective) {
                    return;
                }
                self.cancelBox.visible = false;
                self.voicesSp.visible = false;
                if (self.isMicStart) {
                    self.isMicStart = false;
                    kaayou.SoundManager.getInstance().setMute(false || self.isMicPlayStart);
                    kaayou.PlatformMgr.getInstance().im.EndMic();
                }
            }, this);
            this.minBtn.on(kaayou.TouchEvent.TouchCance, function (e: kaayou.TouchEvent) {
                if (!self.effective) {
                    return;
                }
                self.cancelBox.visible = false;
                self.voicesSp.visible = false;
                if (self.isMicStart) {
                    self.isMicStart = false;
                    kaayou.SoundManager.getInstance().setMute(false || self.isMicPlayStart);
                    kaayou.PlatformMgr.getInstance().im.CancelMic();
                }
            }, this);
        }
    }
}