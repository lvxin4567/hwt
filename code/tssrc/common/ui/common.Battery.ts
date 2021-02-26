namespace common {

    const { doBindEvent, BindEvent } = kaayou._decorator;

    export class Battery extends kaayou.Block {

        bProgress: ccui.LoadingBar = null;
        imageCharge: ccui.ImageView = null;
        Text_ping: ccui.Text = null;
        Text_ping_num: ccui.Text = null;

        saveLevel: number = 0;//实际电量
        level: number = 100//当前显示电量
        //wsname: 网络类型(wifi  4g  none)
        //ms: 网络延时(460表示socket报错了)
        pingData: { wsname: string, ms: number } = null;

        @doBindEvent
        initUi(node: ccui.Widget, pos?: cc.Point) {
            super.initWithNodeNoClone(node);
            //
            this.bProgress = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, 'battery_bar');
            this.imageCharge = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, 'battery_charge');
            this.Text_ping = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, 'Text_ping');
            if (this.Text_ping) this.Text_ping.setVisible(false);
            this.Text_ping_num = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, 'Text_ping_num');
            if (this.Text_ping_num) this.Text_ping_num.setVisible(false);
            if (this.Text_ping_num) this.Text_ping_num.ignoreContentAdaptWithSize(true);
            if (this.imageCharge) this.imageCharge.setVisible(false);
            this.bindEvent();
            this.setVisible(false);
            if (pos) {
                this.setPosition(pos);
            } else {
                this.setPosition(70.5, 72);
            }
            this.unschedule(this.onUpdate);
            this.schedule(this.onUpdate, 1);
        }

        bindEvent() {
            var self = this;
            // kaayou.getController().on("ui::Battery::showBattery", function (e: kaayou.TouchEvent) {
            //     self.showBattery(e.data);
            // }, this);
            kaayou.getController().on("ui::ping::netStatus", function (e: kaayou.TouchEvent) {
                // self.showPing(e.data);
                self.pingData = e.data;
            }, this);
        }

        cleanUp() {

        }

        timer = 0;
        onUpdate() {
            this.timer++;
            //电池5s刷新一次
            if (this.timer % 5 == 0 && kaayou.PlatformMgr.getInstance().sys.batteryInfo) {
                this.showBattery({ msg: kaayou.PlatformMgr.getInstance().sys.batteryInfo});
            }
            if (this.timer % 2 == 0 && this.pingData) {
                this.showPing(this.pingData);
            }
        }

        showBattery(batteryData: { msg: { level: string, state: string } }) {
            // console.log('电池状态变化', JSON.stringify(batteryData));
            let data = batteryData.msg;
            this.level = Number(data.level);
            this.saveLevel = Number(data.level);
            this.setVisible(true);
            if (this.bProgress) this.bProgress.setPercent(Number(data.level));
            if (data.state == "Charging") {
                if (this.imageCharge) this.imageCharge.setVisible(true);
                this.unschedule(this.playChargingAnim);
                this.schedule(this.playChargingAnim, 0.1);
            } else {
                if (this.imageCharge) this.imageCharge.setVisible(false);
                this.unschedule(this.playChargingAnim);
            }
            // if (data.level < 20) {
            //     this.bProgress.getComponent(cc.Sprite).spriteFrame = this.batteryBg[1];
            //     this.bProgress.barSprite.spriteFrame = this.progressBg[1];
            // }else{
            //     this.bProgress.getComponent(cc.Sprite).spriteFrame = this.batteryBg[0];
            //     this.bProgress.barSprite.spriteFrame = this.progressBg[0];
            // }
        }

        showPing(pingData: { wsname: string, ms: number }) {
            let data = pingData;
            //ms：460表示socket报错了
            if (!data || data.ms == 460) { return; }
            if (!this.Text_ping || !this.Text_ping_num) { return; }
            this.Text_ping_num.setString(data.ms.toString());
            if (data.ms <= 100) {
                this.Text_ping_num.setColor(cc.color("#00B181"));
            } else if (data.ms < 200) {
                this.Text_ping_num.setColor(cc.color("#EAA802"));
            } else {
                this.Text_ping_num.setColor(cc.color("#E03007"));
            }

            this.Text_ping_num.setVisible(true);
            this.Text_ping.setVisible(true);
        }

        playChargingAnim() {
            this.level++;
            if (this.level > 100) {
                this.level = this.saveLevel;
            }
            if (this.bProgress) this.bProgress.setPercent(Number(this.level));
        }


    }

}