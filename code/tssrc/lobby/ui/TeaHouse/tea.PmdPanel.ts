
//炮打灯块
namespace tea {
    const { BindEvent, doBindEvent } = kaayou._decorator;
    export class PmdBlock extends kaayou.Block {
        constructor() {
            super();
            this.initUI();
        }
        label_pmd: ccui.Text = null;
        btn_laba: ccui.Button = null;
        private play_time: number = 15;
        private wait_time: number = 3;
        isPlayOver = true;
        announcement_msg: Array<string> = null;
        play_announcement_msg: Array<string> = null; //玩家喇叭消息
        timer: number = 0;
        num: number = 0;
        type: number = 0;
        @doBindEvent
        initUI() {
            let self = this;
            self.announcement_msg = [];
            self.play_announcement_msg = [];
            let p = ccs.load(tea.res.PmdPanel_Json, "res/").node.getChildren()[0];
            this.initWithNode(<ccui.Widget>p);
            this.label_pmd = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_pmd");
            // this.btn_laba = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_laba");
            this.setPosition(cc.winSize.width / 2, cc.winSize.height - 85);
            self.label_pmd.setPositionX(10 + this.getContentSize().width);
            self.label_pmd.ignoreContentAdaptWithSize(true);

            // this.btn_laba.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
            //     kaayou.emit('lobby', 'ui::PmdSendLabaPanel::Show');
            // }, this)
            // if (cc.sys.isWeChat) {
            //     this.btn_laba.setVisible(false);
            // }
        }

        @BindEvent("common", 'Config::Update')
        onConfigUpdate() {
            let configs = common.mod.Config.AppConfig;
            let feature: IFeature = lodash.extend({}, configs.feature);
            this.setVisible(!!feature.pm);
        }
        MoveAction() {
            let self = this;
            let _type = 0;
            // self.unscheduleAllCallbacks();
            self.schedule(function () {
                self.isPlayOver = false;
                //玩家发送喇叭时下一条开始发送玩家消息
                if (self.type) {
                    if (_type == 0) {self.num = 0;}
                    self.label_pmd.setString(self.play_announcement_msg[self.num]);
                    _type = 1;
                } else {
                    self.label_pmd.setString(self.announcement_msg[self.num]);
                    _type = 0;
                }

                self.num++;

                //坐标回归初始位置
                self.label_pmd.setPositionX(10 + this.getContentSize().width);
                //开始滚动
                let action = cc.moveTo(self.play_time, cc.p(0 - 10 - self.label_pmd.getContentSize().width, self.label_pmd.getPosition().y));
                self.label_pmd.runAction(cc.sequence(action, cc.callFunc(function () {
                    if (self.play_announcement_msg.length > 0 && self.num == self.play_announcement_msg.length && _type) {
                        self.play_announcement_msg = [];
                        self.type = 0;
                    }
                    //当刚播放完 玩家喇叭消息 时 ，有玩家再发喇叭会出现 self.num > self.play_announcement_msg.length 的情况
                    if (self.num >= self.play_announcement_msg.length && _type) {
                        self.num = 0;
                    }
                    if (self.announcement_msg.length == 0) {
                        self.label_pmd.string = "";
                        self.unscheduleAllCallbacks();
                    }
                    if (lodash.isEmpty(self.play_announcement_msg)) {
                        self.label_pmd.setString("");     
                    }else{
                        self.label_pmd.setString(self.play_announcement_msg[self.num]);
                    }
   
                })));
                //循环播放
                if (self.num >= self.announcement_msg.length && !self.type) {
                    self.num = 0;
                }
            }, self.play_time + self.wait_time, cc.REPEAT_FOREVER, self.wait_time);
        }

        @BindEvent('tea', 'ui::TeahousePmd::Show')
        show(data: { PmdArray: Array<string>, type: number }) {
            this.type = data.type;
            //玩家发送的，push进去
            if (this.type) {
                let str = data.PmdArray[0] + ":" + data.PmdArray[1];
                this.play_announcement_msg.push(str);
            }
            //系统的直接赋值
            else {
                this.announcement_msg = data.PmdArray || [];
            }
            console.log(data.PmdArray);
            if (this.isPlayOver == true) {
                if (lodash.isEmpty(data) || data.PmdArray.length < 1) { return; }
                this.unscheduleAllCallbacks();
                this.MoveAction();
            }
        }
        onExit() {
            super.onExit();
            this.unscheduleAllCallbacks();
        }
    }

}