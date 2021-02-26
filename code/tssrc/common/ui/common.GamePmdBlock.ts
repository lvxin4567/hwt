
//炮打灯块
namespace common {
    const { BindEvent, doBindEvent } = kaayou._decorator;
    export class GamePmdBlock extends kaayou.Block {

        constructor() {
            super();
            this.initUI();
        }

        Text_content: ccui.Text = null;
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
            /*
            let self = this;
            this.announcement_msg = [];
            this.play_announcement_msg = [];
            let p = ccs.load(common.res.GamePmdBlock_json, "res/").node.getChildren()[0];
            this.initWithNode(<ccui.Widget>p);
            this.Text_content = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Text_content");
            //this.setPosition(cc.winSize.width / 2, cc.winSize.height - 135);
            this.Text_content.setPositionX(10 + this.getContentSize().width);
            this.Text_content.ignoreContentAdaptWithSize(true);
            this.onHide();
            */
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
                    self.Text_content.setString(self.play_announcement_msg[self.num]);
                    _type = 1;
                } else {
                    self.Text_content.setString(self.announcement_msg[self.num]);
                    _type = 0;
                }

                self.num++;

                //坐标回归初始位置
                self.Text_content.setPositionX(10 + this.getContentSize().width);
                //开始滚动
                let action = cc.moveTo(self.play_time, cc.p(0 - 10 - self.Text_content.getContentSize().width, self.Text_content.getPosition().y));
                self.Text_content.runAction(cc.sequence(action, cc.callFunc(function () {
                    if (self.play_announcement_msg.length > 0 && self.num == self.play_announcement_msg.length && _type) {
                        self.play_announcement_msg = [];
                        self.type = 1;
                    }
                    //当刚播放完 玩家喇叭消息 时 ，有玩家再发喇叭会出现 self.num > self.play_announcement_msg.length 的情况
                    if (self.num >= self.play_announcement_msg.length && _type) {
                        self.num = 0;
                        self.Text_content.string = "";
                        self.unscheduleAllCallbacks();
                        self.isPlayOver = true;
                        self.visible = false;
                    }
                })));
            }, self.play_time + self.wait_time, cc.REPEAT_FOREVER, self.wait_time);
        }

        @BindEvent('common', 'ui::GamePmdBlock::Show')
        show(data: { PmdArray: Array<string>, type: number }) {
            this.visible = true;
            this.type = data.type;
            //玩家发送的，push进去
            if (this.type) {
                let str = data.PmdArray[0] + ":" + data.PmdArray[1];
                this.play_announcement_msg.push(str);
            }
            // //系统的直接赋值
            // else if (this.announcement_msg.length == 0) {
            //     this.announcement_msg = data.PmdArray || [];
            // }
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

        onHide() {
            this.visible = false;
        }
    }

}