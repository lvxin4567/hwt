
namespace common {

    export class FewerOpen extends kaayou.Layer {

        successBtn: ccui.Button = null;
        cancelBtn: ccui.Button = null;
        _timeText: ccui.Text = null;
        _tishiBg: cc.Sprite = null;
        _waitNode: cc.Sprite = null;
        _pNode: ccui.Layout = null;
        _pBoxs: Array<cc.Node> = [];

        _t = null;
        _overTime = 0;

        _curmod: common.mod.friendBaseMod<common.mod.IFriendGame_User_Info> = null;

        constructor(ccs: string, mod: common.mod.friendBaseMod<common.mod.IFriendGame_User_Info>) {
            super();
            this.initWithccs(ccs);
            this.setVisible(false);
            this._curmod = mod;
        }


        initUi() {
            let self = this;
            this._timeText = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "timeText");
            this._tishiBg = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "tishiBg")
            this._pNode = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Pnode")
            this._pNode.setPadding({ left: 106.5, right: 106.5, spacingX: 170 });
            this._pNode.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Horizontal);
            this._pBoxs = this._pNode.children;
            this.successBtn = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "successBtn")
            this.successBtn.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(SoundRes["Click_btn_close"]);
                self._curmod.sendFewerresult({ isAgree: true });
            }, this);
            this.cancelBtn = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "cancelBtn")
            this.cancelBtn.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(SoundRes["Click_btn_close"]);
                self._curmod.sendFewerresult({ isAgree: false });
            }, this);
            this._timeText.string = '';
            this._waitNode = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "waitBg")
            this._waitNode.setVisible(false);
            for(let i = 0; i < this._pBoxs.length;i++){
                (<ccui.Text>this._pBoxs[i].getChildByName('NameText')).ignoreContentAdaptWithSize(true);
                (<ccui.Text>this._pBoxs[i].getChildByName('StateText')).ignoreContentAdaptWithSize(true);
            }
            this.cleanUp();
        }


        show(data: { Players: Array<mod.IFriendGame_User_Info>, myServerchair: number, isCan: boolean, srkjNum:number, isShow:boolean }) {
            if (!data) return;
            this.updateInfo(data.Players, data.myServerchair);
            if (!data.isCan) {
                this.successBtn.setVisible(false);
                this.cancelBtn.setVisible(false);
                this._waitNode.setVisible(true);
            }
            if (data.isShow) {
                this.setVisible(true);
            }
            this._timeText.string = "申请"+(data.srkjNum == 2 ? "二" : "三")+"人模式";
        }

        cleanUp(){
            this._overTime = 0;
            this.setVisible(false);
            for (var x in this._pBoxs) {
                (<ccui.Text>this._pBoxs[x].getChildByName('NameText')).string = "";
                (<ccui.Text>this._pBoxs[x].getChildByName('StateText')).string = "";
                this._pBoxs[x].getChildByName('sqjs').setVisible(false);                             
                this._pBoxs[x].setVisible(false);
            }
        }

        close() {
            this.cleanUp();
        }

        updateInfo(players: Array<mod.IFriendGame_User_Info>, myServerchair: number) {
            let sendIndex = -1;
            for (let i = 0; i < players.length; i++) {
                if (!players[i]) continue;
                if (players[i].fewerState == mod.FewerState.Fewer_CREATOR) {
                    sendIndex = i;
                    break;
                }
            }
            if (sendIndex == myServerchair) {
                this.cancelBtn.setVisible(false);
                this.successBtn.setVisible(false);
                this._waitNode.setVisible(true);
            } else {
                this.cancelBtn.setVisible(true);
                this.successBtn.setVisible(true);
                this._waitNode.setVisible(false);
            }
            this.updatePlayer(players);
        }

        // setTime(leftTime: number) {
        //     this._overTime = leftTime * 1000 + (new Date()).getTime();
        // }

        updatePlayer(players: Array<mod.IFriendGame_User_Info>) {
            cc.log('ssssss', players);

            let statusString = {};
            statusString[mod.FewerState.WATING] = "(等待)";
            statusString[mod.FewerState.AGREE] = "同意";
            statusString[mod.FewerState.Fewer_CREATOR] = "申请人";
            statusString[mod.FewerState.DISAGREE] = "拒绝";
            let statusColor = {};
            statusColor[mod.FewerState.WATING] = "#000000";
            statusColor[mod.FewerState.AGREE] = "#50C30E";
            statusColor[mod.FewerState.Fewer_CREATOR] = "#ff00ff";
            statusColor[mod.FewerState.DISAGREE] = "#ff0000";

            for (var i = 0; i < this._pBoxs.length; i++) {
                if (!players[i]) {
                    this._pBoxs[i].setVisible(false);
                    continue;
                }
                NetImage.setPlayerHead(this._pBoxs[i].getChildByName<ccui.ImageView>('headImg') , players[i].imgurl , players[i].sex );
                let tempNickName = kaayou.Identify.nickNameSubFive(players[i].name);
                this._pBoxs[i].getChildByName<ccui.Text>('NameText').string = tempNickName;
                this._pBoxs[i].getChildByName<ccui.Text>('StateText').setTextColor(cc.hexToColor(statusColor[players[i].fewerState] || "#000000"));
                this._pBoxs[i].getChildByName<ccui.Text>('StateText').string = statusString[players[i].fewerState] || "";

                if (players[i].fewerState == mod.FewerState.WATING) {
                    if (players[i].userStatus == mod.GR_US_Status.US_OFFLINE) {
                        this._pBoxs[i].getChildByName<ccui.Text>('StateText').string = "(离线)";
                        this._pBoxs[i].getChildByName<ccui.Text>('StateText').setTextColor(cc.color(255,0,0));
                    } else {
                        this._pBoxs[i].getChildByName<ccui.Text>('StateText').string = statusString[players[i].fewerState] || "";
                    }
                } else {
                    this._pBoxs[i].getChildByName<ccui.Text>('StateText').string = statusString[players[i].fewerState] || "";
                }

                this._pBoxs[i].getChildByName('sqjs').setVisible(players[i].fewerState == mod.FewerState.Fewer_CREATOR);
                this._pBoxs[i].setVisible(true);
            }
            this._pNode.doChildrenLayout();
        }
    }
}