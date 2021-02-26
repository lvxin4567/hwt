
namespace common {
    const { BindEvent, doBindEvent } = kaayou._decorator;
    export class goldBaseScene<IGoldModT extends common.mod.goldBaseMod<mod.IGame_User_Info>, IPlayerLayerT extends common.IPlayerLayer> extends kaayou.kScene {
        curMod: IGoldModT = null;

        gameState: number = 0;
        changeTableTime: number = 0;
        readyClock: ccui.ImageView = null;
        clockTime: number = 0; //准备闹钟倒计时结束的时间戳
        clockTimeTotal: number = 0; //准备闹钟总倒计时秒数

        changeTableBtn: ccui.Button = null;
        readyBtn: ccui.Button = null;
        inviteBtn: ccui.Button = null;
        playerLayer: Array<IPlayerLayerT> = null;

        //电量
        batteryBar: ccui.LoadingBar = null;
        batteryCharge: cc.Node = null;
        curTimeText: ccui.Text = null;

        constructor() {
            super();
            // this.initUI();
        }
        // @doBindEvent
        initUI() {
            let self = this;

            let batteryNode: cc.Node = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "BatteryNode"); //this.node.getChildByName("BatteryNode");
            if (batteryNode) {
                this.batteryBar = <ccui.LoadingBar>batteryNode.getChildByName("battery_bar");
                this.batteryCharge = batteryNode.getChildByName("battery_charge");
                this.curTimeText = <ccui.Text>batteryNode.getChildByName("Text_cur_time");
                if (this.curTimeText) this.curTimeText.ignoreContentAdaptWithSize(true);
            }

            this.scheduleUpdate();
            this.update();

            cc.eventManager.addCustomListener(cc.game.EVENT_HIDE, function () {
                cc.log("游戏进入后台");
                // kaayou.NetManager.getInstance().getSocket(self.curMod.getModuleName()).close({ Initiative: false });
            });
            cc.eventManager.addCustomListener(cc.game.EVENT_SHOW, function () {
                cc.log("重新返回游戏");
            });

            this.changeTableBtn.on(kaayou.TouchEvent.TouchEnd, function () {
                console.log("点击换桌");
                kaayou.TouchMask.addTouchMask({ soundtype: kaayou.SoundType.NORMAL });
                if (self.changeTableBtn.enabled) {
                    self.curMod.sendChangeTable();
                }
                self.changeTableBtn.enabled = false;
            }, this);

            this.readyBtn.on(kaayou.TouchEvent.TouchEnd, function () {
                console.log("点击准备");
                console.log("self.curMod.getIsFake()" , self.curMod.getIsFake());
                kaayou.TouchMask.addTouchMask({ soundtype: kaayou.SoundType.NORMAL });
                if (!self.curMod.getIsFake()) {
                    self.curMod.sendReady();
                    self.readyBtn.visible = false;
                } else {
                    self.curMod.sendChangeTable();
                }
            }, this);

            if (this.inviteBtn) {
                this.inviteBtn.on(kaayou.TouchEvent.TouchEnd, function () {
                    console.log("点击邀请好友", self.curMod.gameName);
                    let url = "https://mmocgame.qpic.cn/wechatgame/NbzesCR54FkJcjfPhEhpnabNicNGVXneIyCSRwZFeyYkaTYxnJtD0eArGckn83jV7/0";
                    kaayou.PlatformMgr.getInstance().wx.ShareURL(self.curMod.gameName + "，就差你上桌了", "快来和我一起玩大冶打拱，原汁原味的家乡味道。", url);
                }, this);
            }

            this.addChild(new common.GamePmdBlock());
        }

        onReEnter() {
            this.cleanUp();
        }

        onReExit() {
            this.cleanUp();
        }

        bindModEvents() {
            let self = this;

            kaayou.getController(this.curMod.getModuleName()).on('ui::cleanUp', function (e: kaayou.Event) {
                self.cleanUp();
            }, this);

            kaayou.getController(this.curMod.getModuleName()).on('UpdatePlayer', function (e: kaayou.Event) {
                self.onUpdatePlayer(e.data);
            }, this);

            kaayou.getController(this.curMod.getModuleName()).on('ienterRoom', function (e: kaayou.Event) {
                self.onIenterRoom();
            }, this);

            kaayou.getController(this.curMod.getModuleName()).on('onIready', function (e: kaayou.Event) {
                self.onIready();
            }, this);

            kaayou.getController(this.curMod.getModuleName()).on('ui::Table::broadcastUseMagic', function (e: kaayou.Event) {
                self.broadcastUseMagic(e.data);
            }, this);

            kaayou.getController(this.curMod.getModuleName()).on("ui::onMicChat", function (e: kaayou.Event) {
                self.onMicChat(e.data);
            }, this);

            kaayou.getController(this.curMod.getModuleName()).on("ui::Scene::canContinue", function (e: kaayou.Event) {
                self.onCanContinue(e.data);
            }, this);
        }


        cleanUp() {
            console.log("清理界面: cleanUp");
            this.gameState = common.mod.GAME_STATE.NONE;

            for (var x in this.playerLayer) {
                this.playerLayer[x].cleanUp();
            }

            //清理准备倒计时
            this.setReadyClock(-1);
            this.unschedule(this.onAutoLeft);
            console.log("关闭准备倒计时");
            kaayou.emit(this.curMod.getModuleName(), 'ui::TabelList::Hide');
        }

        update() {
            if (!this.isVisible()) {
                return;
            }
            let date = new Date();
            if (this.curTimeText) {
                this.curTimeText.setString(Date.format(new Date(), "MM-dd hh:mm"));
            }
        }

        onCanContinue(data: { bankrupt: boolean }) {
            this.changeTableBtn.setVisible(!data.bankrupt);
            this.readyBtn.setVisible(!data.bankrupt);
        }

        onUpdatePlayer(data: { Players: Array<common.mod.IGame_User_Info> }) {
            if (!data) {
                return;
            }
            for (let x in this.playerLayer) {
                this.playerLayer[x].visible = false;
                if (!data.Players[x]) continue;
                this.playerLayer[x].visible = true;
                this.playerLayer[x].setPlayerInfo(data.Players[x]);
            }
        }

        onIenterRoom() {
            if (this.curMod.gameState == common.mod.GAME_STATE.GAMEING || this.curMod.gameState == common.mod.GAME_STATE.ROAR) {
                console.log("onIenterRoom", "此时正在旁观状态");
                return;
            }
            console.log("onIenterRoom");
            this.resetBtn();
            this.changeTableBtn.visible = true;
            this.readyBtn.visible = true;
            if (this.inviteBtn) this.inviteBtn.visible = true && !!this.curMod.getConfigWx();

            //换桌倒计时
            this.checkChangeTableTimer(4);
            //准备倒计时
            this.checkReadyTimer(20);
            return true;
        }

        //自己准备
        onIready() {
            console.log("onIready");
            this.cleanUp();
            this.changeTableBtn.visible = true;
            this.readyBtn.visible = false;
            if (this.inviteBtn) this.inviteBtn.visible = true && !!this.curMod.getConfigWx();
        }

        //换桌倒计时
        checkChangeTableTimer(timer: number) {
            this.changeTableBtn.enabled = false;
            this.changeTableTime = Math.floor(new Date().getTime()) + timer * 1000 - 1;
            this.unschedule(this.onEnableChangeTable);
            this.schedule(this.onEnableChangeTable, 0.5);
            this.onEnableChangeTable();
            console.log("开始换桌倒计时");
        }

        onEnableChangeTable() {
            let timeLable = <ccui.TextAtlas>this.changeTableBtn.getChildByName('Text_time');
            if (!timeLable) {
                timeLable = <ccui.Text>this.changeTableBtn.getChildByName('Text');
            }
            timeLable.visible = true;
            let curtime = Math.floor((this.changeTableTime - Math.floor(new Date().getTime())) / 1000);
            timeLable.string = curtime.toString();

            if (curtime <= 0) {
                console.log("换桌倒计时结束");
                this.unschedule(this.onEnableChangeTable);
                timeLable.visible = false;
                this.changeTableBtn.enabled = true;
            }
        }

        setReadyClock(time: number) {
            if (!this.readyClock) return;

            this.readyClock.visible = time >= 0;
            if (!this.readyClock.visible) return;

            let clockText = <ccui.TextAtlas>this.readyClock.getChildByName('Text_clock');
            if (clockText) clockText.ignoreContentAdaptWithSize(true);
            if (clockText) clockText.string = time.toString();
        }

        //进入房间或者结束一局倒计时
        checkReadyTimer(timer: number) {
            // if(this.overTime > 0) return;
            this.clockTime = Math.floor(new Date().getTime()) + timer * 1000 - 1;
            this.clockTimeTotal = timer;
            this.unschedule(this.onAutoLeft);//可能换桌前上一次定时器还在跑
            this.setReadyClock(-1);
            this.schedule(this.onAutoLeft, 0.1);
            this.onAutoLeft();
            console.log("开始准备倒计时");
        }

        onAutoLeft() {
            let curtime = (this.clockTime - Math.floor(new Date().getTime())) / 1000;
            if (curtime >= 3.9 && curtime < 4.0) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.Clock);
            }
            curtime = Math.floor(curtime);
            this.setReadyClock(curtime);
            if (curtime < 0) {
                console.log("准备倒计时结束");
                this.unschedule(this.onAutoLeft);
                // kaayou.emit('common', 'ui::Toast::Show', { msg: "由于您长时间没有准备,已经被踢出房间!" })
                // this.curMod.sendLeftGame();
            }
        }

        //隐藏所有牌权按钮
        resetBtn() {
            this.changeTableBtn.visible = false;
            this.readyBtn.visible = false;
            if (this.inviteBtn) this.inviteBtn.visible = false;
        }

        broadcastUseMagic(data: { type: number, dwindex: number, dwtoindex: number, index: number }) {
            let self = this;
            let animstr = ["flower", "aixin", "egg", "tuoxie", "zhadan"];

            let Panel_player: ccui.Layout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Panel_player");
            if (!Panel_player || !Panel_player.children[data.dwindex]) {
                cc.error('找不到玩家节点层');
                return;
            }
            let size = Panel_player.children[data.dwindex].getContentSize();
            let offset = cc.p(size.width / 2, size.height / 2);
            let startpos = cc.pAdd(offset, Panel_player.children[data.dwindex].getPosition());
            let endpos = cc.pAdd(offset, Panel_player.children[data.dwtoindex].getPosition());
            startpos = Panel_player.convertToWorldSpace(startpos);
            endpos = Panel_player.convertToWorldSpace(endpos);
            startpos = this.node.convertToNodeSpace(startpos);
            endpos = this.node.convertToNodeSpace(endpos);
            let time = cc.pDistance(startpos, endpos) / 1500;
            time = time < 0.3 ? 0.3 : time;

            let cb = function () {
                let img = ccui.ImageView.create("me.img_" + animstr[data.index] + ".png", ccui.Widget.PLIST_TEXTURE);
                img.setPosition(startpos.x, startpos.y);

                let bezier = [cc.p(startpos.x + 50, startpos.y + 100), cc.p(endpos.x - 50, endpos.y + 150), endpos];
                let bezierTo = cc.bezierTo(time, bezier);

                let acMove: cc.Action = bezierTo;
                //花不旋转
                if (data.index != 0) {
                    acMove = cc.spawn([bezierTo, cc.rotateBy(time, 360)]);
                }
                img.runAction(cc.sequence(acMove, cc.callFunc(function (sender) {
                    sender.removeFromParent();
                    self.showSkeleton(animstr[data.index], endpos, Panel_player.zIndex + 1);
                    kaayou.SoundManager.getInstance().playSound(common.SoundRes["Emoj_" + animstr[data.index]]);
                })));
                self.node.addChild(img, Panel_player.zIndex + 1);
            }
            let count = data.type == 5 ? 10 : 1;
            this.schedule(cb, 0.15, count - 1);

        }


        showSkeleton(aniStr: string, pos: cc.Point, zIndex?: number) {
            let spineAnim: sp.SkeletonAnimation = sp.SkeletonAnimation.createWithJsonFile(common.res[aniStr + "Json"], common.res[aniStr + "Atals"], 1);
            spineAnim.setAnimation(1, aniStr, false);
            this.node.addChild(spineAnim, zIndex ? zIndex : 0);
            spineAnim.setPosition(pos);

            spineAnim.setCompleteListener(function () {
                spineAnim.setVisible(false);
                setTimeout(() => {
                    spineAnim.removeFromParent();
                }, 500);
            })
        }


        onMicChat(data: { index: number, start: boolean }) {
            this.playerLayer[data.index].onMicChat(data.start);
        }


    }
}