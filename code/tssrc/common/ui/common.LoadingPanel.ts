
namespace common {
    const { BindEvent, doBindEvent } = kaayou._decorator;
    export class LoadingPanel extends kaayou.Layer {
        maskBg: ccui.Layout = null;
        loadNode: cc.Node = null;
        lbMsg: ccui.Text = null;
        dotLable: ccui.Text = null;
        ///////
        call: Function = null;
        message: string = "";
        // callInterval: number = 0;
        msgIndex = -1;
        arrMessage: string[] = null;
        addDot: boolean = true;
        toastCall: Function = null;
        Sprite_1: cc.Sprite = null;

        constructor() {
            super();
            this.initUI();
        }
        @doBindEvent
        initUI() {
            this.initWithccs(common.res.LoadingPanel_json, true);
            let self = this;
            this.maskBg = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "maskbg");
            this.loadNode = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "loadNode");
            this.lbMsg = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "msgLable");
            this.lbMsg.ignoreContentAdaptWithSize(true);
            this.dotLable = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "dotLable");
            this.dotLable.ignoreContentAdaptWithSize(true);
            this.Sprite_1 = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Sprite_1");
            //var spineBoy = sp.SkeletonAnimation.createWithJsonFile(common.res.Loading_spine_json, common.res.Loading_spine_atlas, 1);
            //spineBoy.setAnimation(0, 'KWX_Lording', true);
            // self.loadNode.addChild(spineBoy);
            this.forcehide();
            this.scheduleUpdate();
        }

        @BindEvent('common', 'ui::Loading::Show')
        show(data: { time: number, action: Function, msg: string, arrMsg: string[], addDot: boolean, refresh: boolean, noAni: boolean, overtimetext?: boolean }) {
            data = data || { time: 15, action: null, msg: "信息加载中", arrMsg: null, addDot: true, refresh: true, noAni: false };
            this.addDot = !(data.addDot === false);
            data.time = lodash.isNumber(data.time) ? data.time : 15
            data.action = data.action || null;
            data.msg = data.msg || "信息加载中";
            this.message = data.msg;
            this.call = data.action;
            this.arrMessage = data.arrMsg || null;
            this.__beganTime = new Date().getTime();

            this.__isNoOvertimeText = !!!data.overtimetext;

            if (data.time >= 0) {
                data.time = data.time == 0 ? 15 : data.time;
                this.__closeTime = this.__beganTime + data.time * 1000;
            } else {
                this.__closeTime = -1;
            }
            // if (this.addDot) {
            //     this.dotLable.setVisible(true);
            // }
            this.lbMsg.setVisible(true);
            this.lbMsg.setString(this.message);
            let noAni = !!data.noAni;
            if (noAni) {
                this.node.setOpacity(255);
            }else{
                this.node.getOpacity() == 0 && this.node.runAction(cc.sequence(cc.delayTime(1), cc.fadeIn(1)));
            }
            this.setVisible(true);
        }



        @BindEvent('common', 'ui::Loading::Hide')
        hide(data: { force: boolean }) {
            let t = new Date().getTime();
            data = data || { force: false };
            if (data.force) {
                this.forcehide();
            }
            if (this.__closeTime < 0) {

            } else if (this.__closeTime - t < 100) { return; }
            this.__closeTime = t + 100;
        }

        changeDot(dt) {
            this.__ddtime += dt;
            if (this.__ddtime < 0.5) { return; }
            this.__ddtime = 0;
            if (!this.isVisible()) { return; }
            if (this.__closeTime < 0) { return; }
            if (this.__beganTime < 0) { return; }
            if (this.addDot) {
                // let difftime = new Date().getTime() - this.__beganTime;
                let n = this.dotLable.getString().length;
                var s = ""
                if (n > 2) {
                    s = "";
                } else {
                    n++;
                    for (var i = 0; i < n; i++) {
                        s += ".";
                    }
                }
                this.dotLable.setString(s);
                this.lbMsg.setString(this.message+s);
            } else {
                this.dotLable.setString("");
            }
        }
        __dttime = 0;
        changeText(dt) {

            this.__dttime += dt;
            if (this.__dttime < 0.5) { return; }
            this.__dttime = 0;

            if (!this.isVisible()) { this.msgIndex = -1; return; }
            if (!this.arrMessage) { this.msgIndex = -1; return; }
            if (this.msgIndex + 1 >= this.arrMessage.length) { this.msgIndex = -1; return; }
            let s: string = this.arrMessage[++this.msgIndex];
            this.message=s;
            this.lbMsg.setString(this.message);
        }
        __dtotime = 0;
        __isNoOvertimeText = false;
        doOvertimeText(dt) {
            if (this.__isNoOvertimeText) { return; }
            this.__dtotime += dt;
            if (this.__dtotime < 0.5) { return; }
            this.__dtotime = 0;
            if (!this.isVisible()) { return; }
            if (this.__beganTime < 0) { return; }
            let t = new Date().getTime() - this.__beganTime;
            if (t > 5000) {
                let s = "";
                if (t < 6000) {
                    s = "网络状态异常...";
                } else if (t < 7000) {
                    s = "网络状态异常...1";
                } else if (t < 8000) {
                    s = "网络状态异常...2";
                } else if (t < 9000) {
                    s = "网络状态异常...3";
                }
                this.message=s;
                this.lbMsg.setString(this.message);
            }
        }

        __beganTime = -1;
        __closeTime = -1;
        __ddtime = 0;
        forcehide() {
            this.__beganTime = -1;
            this.__closeTime = -1;
            this.msgIndex = -1;
            this.arrMessage = null;
            this.addDot = false;
            this.lbMsg.setString("");
            this.lbMsg.setVisible(false);
            this.dotLable.setString("");
            this.dotLable.setVisible(false);
            this.setVisible(false);
            this.node.stopAllActions();
            this.node.setOpacity(0);
            let c = this.call;
            this.call = null;
            if (c != null) {
                c();
            }
        }
        __dhotime = 0;
        needHide(dt) {
            this.__dhotime += dt;
            if (this.__dhotime < 0.1) { return; }
            this.__dhotime = 0;
            if (!this.isVisible()) { return; }
            if (this.__closeTime < 0) { return; }
            if (this.__beganTime < 0) { return; }
            if (this.__closeTime - new Date().getTime() <= 0) {
                this.forcehide();
            }

        }

        update(dt) {
            this.Sprite_1.rotation = this.Sprite_1.rotation + dt * 600;
            this.needHide(dt);
            this.changeDot(dt);
            this.changeText(dt);
            this.doOvertimeText(dt);
        }
    }
}