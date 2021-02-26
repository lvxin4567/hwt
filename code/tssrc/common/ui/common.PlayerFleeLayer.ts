
namespace common {

    export class PlayerFleeLayer extends kaayou.Layer {

        _curmod: common.mod.friendBaseMod<common.mod.IFriendGame_User_Info> = null;

        bg: cc.Sprite = null;
        infoLabel: ccui.Text = null;

        bg1: cc.Sprite = null;
        infoLabel1: ccui.Text = null;

        _overTime: number = 0;
        timer: number = 0;

        constructor(ccs: string, mod:common.mod.friendBaseMod<common.mod.IFriendGame_User_Info>) {
            super();
            this._curmod = mod;
            this.initWithccs(ccs);
        }

        initUi() {
            this.bg = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "bg")
            this.infoLabel = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "infoLabel");
            this.infoLabel.ignoreContentAdaptWithSize(true);
            this.bg1 = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "bg1");
            this.infoLabel1 = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "infoLabel1");
            this.infoLabel1.ignoreContentAdaptWithSize(true);
            this.bg.setVisible(false);
            this.bg1.setVisible(false);
        }

        ReEnter(){
            this.scheduleUpdate();
        }

        onMyExit(){
            this.unscheduleUpdate();
        }

        minName: string = "";
        tmpArr: Array<{ name: string, index: number }> = []
        show(data: { fleeinfo: Array<{ name: string, index: number, hasExit: boolean }>, time: number, minName: string }) {
            this.minName = data.minName;
            // this.setTime(data.time);
            this._overTime = data.time;
            let tmpArr: Array<{ name: string, index: number }> = [];
            for (let i = 0; i < data.fleeinfo.length; i++) {
                if (!data.fleeinfo[i].hasExit) {
                    tmpArr.push({ name: data.fleeinfo[i].name, index: data.fleeinfo[i].index });
                }
            }
            this.tmpArr = tmpArr;
            this.unschedule(this.cb);
            this.schedule(this.cb, 3, this.tmpArr.length, 0.01);//这里只能写0.01,写0的话就会延迟3S才会执行第一次
    
        }

        close() {
            this._overTime = 0;
            this.bg.setVisible(false);
            this.bg1.setVisible(false);
        }

        onSetInfo(data: { fleeinfo: Array<{ name: string, index: number, hasExit: boolean }>, time: number, minName: string }) {
            cc.log(data);
            if (!data) return;
            if (data.fleeinfo.length < 1 || data.time < 1) {
                this.close();
                return;
            }
            this.show(data);
        }

        curShowName: string = "";
        cb() {
            this.curShowName = "";
            if (this.tmpArr.length > 0) {
                let info = this.tmpArr.shift();
                let name = kaayou.Identify.nickNameSubFive(info.name);
                this.curShowName = name;
                this.infoLabel.string = "[" + name + "]离线了," + this.changeStoM(this._overTime) + "后未回来,则房间解散!";
                this.bg.setVisible(true);
                this._curmod.setHasExit({index: info.index})
            } else {
                this.unschedule(this.cb);
                this.bg.setVisible(false);
            }
        }

        updateOfflineTime() {
            this.infoLabel.string = "[" + this.curShowName + "]离线了," + this.changeStoM(this._overTime) + "后未回来,则房间解散!";
        }

        //[玩家A]已离线9分51秒,9秒后未回来,房间将自动解散
        update(dt) {
            if (this._overTime <= 0) return;
            this.timer += dt;
            if (this.timer > 1) {
                this._overTime--;
                this.timer = 0;
                this.updateOfflineTime();
                if (this._overTime < 15) {
                    this.bg1.setVisible(true);
                    this.infoLabel1.string = "[" + this.minName + "]已经离线" + this.changeStoM(300 - this._overTime) + "," + this.changeStoM(this._overTime) + "后未回来,则房间将自动解散!";
                }
            }
        }

        changeStoM(time: number) {
            let m = Math.floor(time / 60);
            let s = time - m * 60;
            let timestr = '0' + m + '分' + (s < 10 ? '0' + s : s) + '秒';
            return timestr;
        }
    }
}