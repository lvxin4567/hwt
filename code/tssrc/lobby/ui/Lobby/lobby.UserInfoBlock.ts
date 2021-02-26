//用户信息块

namespace lobby {


    const { doBindEvent, BindEvent } = kaayou._decorator;
    export class UserInfoBlock extends kaayou.Layer {
        lable_name: ccui.Text = null;
        lable_id: ccui.Text = null;
        img_head: cc.Sprite = null;
        layout_user_info: ccui.Layout = null;
        layout_head: ccui.Layout = null;
        lable_card: ccui.Text = null;
        // lable_gold: ccui.Text = null;
        btn_addcard: ccui.Button = null;
        btn_save: ccui.Button = null;
        label_gold: ccui.Text = null;
        label_diamond: ccui.Text = null;
        glod_layout: ccui.Layout = null;
        card_layout: ccui.Layout = null;
        constructor() {
            super();
            this.initWithccs(lobby.res.UserInfoBlock_json, true);
            this.initUI();
            // this.setPosition(this.getPosition().x - (cc.winSize.width - cc.winSizeCustom.width) / 2, this.getPosition().y);
        }



        @doBindEvent
        initUI() {
            let self = this;
            this.lable_name = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "lable_name");
            this.lable_id = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "lable_id");
            this.img_head = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "img_head");

            this.layout_head = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "layout_head");
            this.img_head = new cc.Sprite();
            this.img_head.setVisible(false);
            this.layout_head.addChild(this.img_head);


            this.layout_user_info = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "layout_user_info");
            // this.lable_gold = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "lable_gold")
            this.lable_card = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "lable_card");
            this.btn_addcard = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_addcard");
            // this.btn_save = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_save");
            this.card_layout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "card_layout");
            this.glod_layout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "glod_layout");
            this.label_gold = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "lable_gold");
            this.label_diamond = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_diamond");
            // this.btn_save.on(kaayou.TouchEvent.TouchEnd, function () {
            //     kaayou.emit('lobby', 'ui::InsureBoxPanel::Show');
            // }, this);


            this.layout_user_info.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit('lobby', 'ui::UserInfoPanel::Show');
            }, this);

            this.btn_addcard.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit('lobby', 'ui::Mall::Show');
            }, this);

        }

        @BindEvent("lobby", "ui::UpdateUserInfo")
        onUpdateUserInfo(data: Data_Uerinfo) {
            if (!data) { return; }
            console.log("到了更新房卡");
            this.lable_name.setString(kaayou.Identify.nickNameSubSix(data.name.toString()));
            this.lable_id.setString(data.uid.toString());
            // this.lable_card.setString(data.card.toString());
            // this.label_diamond.setString(data.diamond.toString());
            // this.label_gold.setString(data.gold.toString())
            let mScoreStr = kaayou.Identify.changeScoreToSortString(data.gold);
            this.lable_card.setString(kaayou.Identify.decNumber(data.card))
            this.label_diamond.setString(kaayou.Identify.decNumber(data.diamond))
            this.label_gold.setString(kaayou.Identify.decNumber(data.gold));
            NetImage.doLoadHeadImageWithLayout(data.sex, data.imgurl || "", this.img_head, this.layout_head.getContentSize(), function () { });
        }

        @BindEvent("common", 'Config::Update')
        onConfigUpdate() {
            let configs = common.mod.Config.AppConfig;
            if (cc.sys.isWeChat) {
                this.card_layout.setVisible(false);
                this.btn_addcard.setVisible(false);
            } else {
                let appmodel = configs.appmodel || 0;
                // this.glod_layout.setVisible((!!(appmodel & 1)));
                // this.card_layout.setVisible((!!(appmodel & 2)));
            }
        }

    }


}