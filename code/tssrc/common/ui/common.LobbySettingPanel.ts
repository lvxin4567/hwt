
namespace common {
    const { BindEvent, doBindEvent } = kaayou._decorator;
    export class LobbySettingPanel extends kaayou.Layer {
        btnCheck:ccui.Button=null;
        btnExit:ccui.Button=null;
        maskBg: cc.Layer = null;
        contentPanel: ccui.Layout = null;
        btn_close: ccui.Button = null;
        img_music: ccui.ImageView = null;
        img_effect: ccui.ImageView = null;
        btn_change: ccui.Button = null;
        label_version: ccui.Text = null;
        img_updatePoint1: ccui.ImageView = null;
        img_updatePoint2: ccui.ImageView = null;
        isMusic: boolean = false;
        isEffect: boolean = false;
        imgOffName: string = "SettingPanel.off.png";
        imgOnName: string = "SettingPanel.on.png";
        btn_auto:ccui.ImageView = null;
        btn_logout:ccui.ImageView = null;
        btn_privace:ccui.ImageView = null;
        btn_agreement:ccui.ImageView = null;
        constructor() {
            super();
            this.initUI();
        }
        @doBindEvent
        initUI() {
            this.initWithccs(common.res.LobbySettingPanel_json, true);
            let self = this;
            this.maskBg = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "maskbg");
            this.contentPanel = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "contentPanel");
            this.btnExit=ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btnExit");
            this.btnExit.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                let options = {
                    msg: "您是否要退出游戏？",
                    btns: [
                        {
                            colorType: 'green',
                            name: "确定",
                            action: function () {
                                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                                cc.game.end();
                            },

                        },
                        {
                            name: "取消",
                            colorType: 'blue',
                            action: function () {
                                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                            }
                        }
                    ]
                }
                kaayou.emit('common', 'ui::Dialog::Show', options);
            }, this);
            this.btn_close = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_close");
            this.btn_close.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.onHide();
            }, this);

            this.btnCheck=ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "CheckButton");
            this.btnCheck.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                let mapStr = kaayou.DataSet.get("user::Map") || "";
                //切换账户
                let options = {
                    msg: "您的GPS信息是："+mapStr,
                    btns: [
                        {
                            colorType: 'green',
                            name: "确定",
                            action: function () {
                                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                            },
                        }
                    ]
                }
                kaayou.emit('common', 'ui::Dialog::Show', options);
            }, this);

            this.btn_change = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_change");
            this.btn_change.on(kaayou.TouchEvent.TouchEnd, function () {
                //切换账户
                let options = {
                    msg: "您是否要切换账号？",
                    btns: [
                        {
                            colorType: 'green',
                            name: "确定",
                            action: function () {
                                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                                kaayou.emit("lobby", "mod::User::LogOut");
                            },

                        },
                        {
                            name: "取消",
                            colorType: 'blue',
                            action: function () {
                                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                            }
                        }
                    ]
                }
                kaayou.emit('common', 'ui::Dialog::Show', options);
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
            }, this);
            this.img_music = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "img_music");
            this.img_music.on(kaayou.TouchEvent.TouchEnd, this.onMusicChange, this);


            this.img_effect = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "img_effect");
            this.img_effect.on(kaayou.TouchEvent.TouchEnd, this.onEffectChange, this);

            this.label_version = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Text_update");

            this.img_updatePoint1 = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Image_updatePoint1");

            this.img_updatePoint2 = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Image_updatePoint2");

            this.btn_auto=ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_auto");
            this.btn_auto.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                console.log("btn_auto");
                kaayou.emit("lobby","ui::authSetting::Show")
            }, this);

            this.btn_logout=ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_logout");
            this.btn_logout.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                console.log("btn_logout");
                kaayou.emit('lobby','ui::CustomRegOutPanel::Show');
            }, this);


            this.btn_privace=ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_privace");
            this.btn_privace.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                console.log("btn_privace");
                kaayou.emit('lobby', 'ui::Policy::Show');
            }, this);

            this.btn_agreement=ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_agreement");
            this.btn_agreement.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                console.log("btn_agreement");
                kaayou.emit('lobby', 'ui::Agreement::Show');
            }, this);

            this.setVisible(false);
        }
        onMusicChange(e: kaayou.CheckEvent) {
            this.isMusic = !this.isMusic;
            cc.sys.localStorage.setItem('tog_music', this.isMusic ? 'true' : 'false');
            this.doMusicChange();
            kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnSwitch);
        }
        doMusicChange() {
            var b = !('false' === cc.sys.localStorage.getItem('tog_music'));
            this.isMusic = b;
            this.img_music.loadTexture(b ? this.imgOnName : this.imgOffName, ccui.Widget.PLIST_TEXTURE);
            let isPlaying = cc.audioEngine.isMusicPlaying();
            if (isPlaying && b)
                return;
            if (b) {
                kaayou.SoundManager.getInstance().playBgm(common.SoundRes.Game_bgm);
            } else {
                kaayou.SoundManager.getInstance().stopMusic();
            }

            // this.btn_music.getChildren()[0].setPositionX(b ? 120 : 26);

        }
        onEffectChange(e: kaayou.CheckEvent) {
            this.isEffect = !this.isEffect;
            cc.sys.localStorage.setItem('tog_effect', this.isEffect ? 'true' : 'false');
            this.doEffectChange();
            kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnSwitch);
        }
        doEffectChange() {
            var b = !('false' === cc.sys.localStorage.getItem('tog_effect'));
            this.isEffect = b;
            this.img_effect.loadTexture(b ? this.imgOnName : this.imgOffName, ccui.Widget.PLIST_TEXTURE);
            // this.btn_effect.getChildren()[0].setPositionX(b ? 120 : 26);
        }

        btnCall: Array<Function> = null;
        close_call: Function = null;
        @BindEvent('common', 'ui::LobbySettingPanel::Show')
        show(data) {
            {
                let configs = common.mod.Config.AppConfig;
                let feature: IFeature = lodash.extend({}, configs.feature);
                if (configs && feature ) {
                    this.btn_change.setVisible(!!(feature.stc))
                }
            }


            this.doMusicChange();
            this.doEffectChange();
            this.setVisible(true);
            kaayou.pop.showAni({
                cNode: this.node.getChildByName("contentPanel"),
                mNode: this.node.getChildByName("maskbg"),
                action:function(){
                }
            });
        }

        @BindEvent('common', 'ui::LobbySettingPanel::Hide')
        onHide() {
            kaayou.pop.hideAni(
                {
                    cNode: this.node.getChildByName("contentPanel"),
                    mNode: this.node.getChildByName("maskbg"),
                    rnode: this,
                    action:function(){
                    }
                }
            )
            //this.setVisible(false);
        }




    }
}