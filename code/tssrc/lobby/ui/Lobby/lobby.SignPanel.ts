namespace lobby{
    const { BindEvent, doBindEvent } = kaayou._decorator;
    export class SignPanel extends kaayou.Layer{
        constructor(){
            super();
            
            // cc.spriteFrameCache.addSpriteFrames(lobby.res.Action_mask_plist);
            this.initUI();
        }
        maskBg: cc.Layer = null;
        contentPanel: ccui.Layout = null;
        step: number = 0;

        @doBindEvent
        initUI(){
            return;
            // this.initWithccs(lobby.res.SignPanel_json);
            let self = this;
            this.maskBg = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "maskbg");
            this.contentPanel = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "contentPanel");

            self.Hide();
        }

        showLoginDay(data){
            for(let i = 0;i < 7; ++i){
                let sign_day :ccui.Layout = ccui.helper.seekWidgetByName(<ccui.Layout>this.contentPanel,`sign_day_${i}`);
                let BitmapFontLabel_num :ccui.TextBMFont = ccui.helper.seekWidgetByName(sign_day,"BitmapFontLabel_num");
                let btn_sign :ccui.Button = ccui.helper.seekWidgetByName(sign_day,"btn_sign");
                let img_mask :ccui.ImageView = ccui.helper.seekWidgetByName(sign_day,"img_mask");

                //点击签到
                if(i < data.step){
                    img_mask.setVisible(true);
                }else {
                    img_mask.setVisible(false);
                }
                if (i == data.step) {
                    //当前天数显示动画
                    let frames = [];
                    for (let n = 1; n <= 11; n++) {
                        let frame = cc.spriteFrameCache.getSpriteFrame(`lobby_sign_${n}.png`);
                        if (!frame) { break; }
                        frames.push(frame);
                    }
                    let acAnimation = cc.Animation.create(frames, 0.15, 1);
                    let acAnimate = cc.Animate.create(acAnimation);
                    let spriteSign = new cc.Sprite();
                    spriteSign.setAnchorPoint(0.5, 0.5);
                    spriteSign.setPosition(btn_sign.getContentSize().width / 2, btn_sign.getContentSize().height / 2);
                    btn_sign.addChild(spriteSign);
                    spriteSign.runAction(cc.repeatForever(acAnimate));
                }

                btn_sign.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                    this.sendBtnType(i);
                }, this) 

                //设置每天奖励的豆子数   以后可能还有奖房卡 data.rewards[0][i].wealth_type 是奖励财富类型。 现在只有豆子所以没判断  
                let str:string = data.rewards[i][0].num.toString();   
                BitmapFontLabel_num.setString(str);       
                
                kaayou.DataSet.set('signday', JSON.stringify(data.rewards[data.step][0].num));
            }
        }

        sendBtnType(type: number){
            let sign_day :ccui.Layout = ccui.helper.seekWidgetByName(<ccui.Layout>this.contentPanel,`sign_day_${type}`);
            let btn_sign :ccui.Button = ccui.helper.seekWidgetByName(sign_day,"btn_sign");
            if (type == this.step) {
                let reqData = {};
                kaayou.emit('lobby', 'mod::User::checkin', reqData);
                btn_sign.removeAllChildren();
                this.Hide();
            }
        }

        @BindEvent('lobby', 'ui::SignPanel::Show')
        Show(data: { step:number, rewards:Array< Array< { wealth_type: number, num: number} > >}) {
            this.setVisible(true);

            this.step = data.step;
            this.showLoginDay(data);
        }

        @BindEvent('lobby', 'ui::SignPanel::Hide')
        Hide() {
            this.setVisible(false);
        }
    }
}