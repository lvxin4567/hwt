// 顶部菜单
namespace lobby {
    const { BindEvent, doBindEvent } = kaayou._decorator;
    export class TopMenuBlock extends kaayou.Layer {
        // btn_share: ccui.Button = null;
        // btn_rn: ccui.Button = null;
        // btn_cs: ccui.Button = null;
        btnLocation: ccui.Button = null;
        btn_setting: ccui.Button = null;
        btn_suggestion:ccui.Button;
        reddot:ccui.ImageView;
        //公告
        btn_Notice: ccui.Button = null;
        lbLocation: ccui.Text = null;
        menuLayout: ccui.Layout = null;
        image_LobbyAera_Title: cc.Sprite = null;
        constructor() {
            super();
            this.initUI();
        }

        @doBindEvent
        initUI() {
            this.initWithccs(lobby.res.TopMenuBlock_json, true);
            let self = this;
            this.menuLayout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "menuLayout");
            this.btnLocation = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_location");
            this.btn_setting = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_setting");
            this.btn_Notice = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_Notice");
            this.btn_suggestion= ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_suggestion");
            this.reddot = ccui.helper.seekWidgetByName(<ccui.Widget>this.btn_suggestion, "reddot");
            // this.btn_share = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_share");
            this.lbLocation = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "lbLocation");
            this.image_LobbyAera_Title = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "img_lobby_logo");
            this.menuLayout.setPadding({ spacingX: 28, right: 25 });
            this.menuLayout.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Horizontal);
            this.menuLayout.setHorizontal(ccui.Layout.LayoutHorizontal.LEFT);
            this.menuLayout.doChildrenLayout();
            this.btnLocation.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.Default);
                kaayou.emit("lobby", 'ui::Areas::Show');
            }, this);         

            this.btn_suggestion.on(kaayou.TouchEvent.TouchEnd,()=>{
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.Default);
                kaayou.emit('lobby','ui::SuggestionPanel::Show');
            },this)

            kaayou.getController("lobby").on("ui::lobby::CustomSuggestionIsNew",(e)=>{
                let {isNew} = e.data;
                this.reddot.setVisible(isNew===true);
            },this);



            //设置
            this.btn_setting.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.Default);
                kaayou.emit('common', 'ui::LobbySettingPanel::Show');
            }, this);
            //公告
            this.btn_Notice.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.Default);
                kaayou.emit("lobby",'mod::Notice::getList',{call:(res)=>{
                    console.log(res);
                    if(lodash.isArray(res)){
                        if(res.length > 0){
                            kaayou.LayerSeq.getInstance().addLayerSeq("NoticePanel");
                            kaayou.emit("lobby", 'ui::Notice::Show', res);
                        }else{
                            kaayou.emit("common","ui::Toast::Show",{msg:"暂无公告"});
                        }
                    }
                }});
            }, this);
        }

        @BindEvent("common", 'Config::Update')
        onConfigUpdate() {
            let configs = common.mod.Config.AppConfig;
            let feature: IFeature = lodash.extend({}, configs.feature);
            this.btn_setting.setVisible(!!(feature.st))
            let dt = feature.dt;
            if((configs && feature && dt==1) || !cc.sys.isNative){
                this.btnLocation.setVisible(true);
            }else{
                this.btnLocation.setVisible(false);
            }

            if(configs && feature  && cc.sys.isNative){
                this.btn_Notice.setVisible(!!feature.no)
            }

            this.menuLayout.doChildrenLayout();
        }


        @BindEvent("lobby", "ui::TopMenu::ShowRealNameBtn")
        onShowRealNameBtn() {
            // this.btn_rn.setVisible(true);
            // this.menuLayout.doChildrenLayout();
        }

        @BindEvent("lobby", "ui::city::refresh")
        onCityRefresh(data) {
            this.lbLocation.setString(data.name.substr(0,3));
            let localicon = lobby.AreaGameTitle[data.code];
            if (!localicon) {
                return;
            }
            this.image_LobbyAera_Title.initWithFile(localicon);
            NetImage.doSpriteContentSizeAndPosition(this.image_LobbyAera_Title, this.image_LobbyAera_Title.getContentSize());
        }
    }
}