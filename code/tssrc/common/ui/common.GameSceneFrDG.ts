/// <reference path="common.goldBaseScene.ts" />

namespace common {
    const { BindEvent, doBindEvent } = kaayou._decorator;

    export class GameSceneFrDG<IFriendT extends common.mod.friendBaseMod<mod.IFriendGame_User_Info>, IplayerT extends common.DG.IPlayerLayer> extends common.FriendBaseScene< IFriendT , IplayerT> {
        //游戏标题节点
        // titleNode: cc.Node = null;
        // renwuNode: cc.Node = null;
        dipaiNode: cc.Node = null;
        dipaiCard: common.PkSmallRow = null;
        // btn_up: ccui.Button = null;
        // btn_down: ccui.Button = null;
        // btn_paixu: ccui.Button = null;
        btn_lipai: ccui.Button = null;
        chatLayerNode: cc.Node = null;
        chatBtn: ccui.Button = null;
        // tuoguanBtn: ccui.Button = null;
        // difenLable: ccui.Text = null;
        // roundLable: ccui.Text = null;
        roundLableBig: ccui.Text = null;
        // taskFinishText: ccui.Text = null;
        // taskText: ccui.Text = null;
        // taskRewardNum: ccui.Text = null;
        menuLayerNode: cc.Node = null;
        endLayerNode: cc.Node = null;
        playerInfoLayer: cc.Node = null;
        settingLayer: cc.Node = null;

        //牌节点
        handCardRow: common.PkRow = null;
        handCardAni: common.PkAni = null;
        outCardRow: Array<common.PkRow> = null;
        outCardNode: Array<cc.Node> = null;
        teamCardRow: Array<common.PkSmallRow> = null;
        clockPos: Array<cc.Point> = null; //我的闹钟的位置，0：中间（两个按钮时显示在中间），1：左边（三个按钮时显示在左边，例如出牌牌权时，闹钟显示在不要和提示之间）

        btn_menu: ccui.Button = null;

        buyaoBtn: ccui.Button = null;
        tishiBtn: ccui.Button = null;
        outCardBtn: ccui.Button = null;
        yingpaiBtn: ccui.Button = null;
        buyingBtn: ccui.Button = null;

        //打不过上家的牌提示
        tishiNode: cc.Node = null;
        //托管遮罩
        tuoguanMask: cc.Node = null;

        curSelCard: { type: number, cards: Array<number> } = null;

        isAct: boolean = false;


        constructor() {
            super();

            cc.spriteFrameCache.addSpriteFrames(common.res.PokerTag_plist);
            cc.spriteFrameCache.addSpriteFrames(common.res.Poker_BigCard01_plist);
            cc.spriteFrameCache.addSpriteFrames(common.res.Poker_SmallCard01_plist);
            cc.spriteFrameCache.addSpriteFrames(common.res.Poker_SmallCard02_plist);
        }

        initUI() {
            super.initUI();
        }

        onReEnter() {
            super.onReEnter();

            let textServerUrl: ccui.Text = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Text_serverurl");
            let enterConfig = JSON.parse(kaayou.DataSet.get("game::config"));
            textServerUrl.ignoreContentAdaptWithSize(true);
            textServerUrl.string = enterConfig.ip.toString();
        }

        bindModEvents() {
            let self = this;
            super.bindModEvents();


            kaayou.getController(this.curMod.getModuleName()).on('ui::EndLayer::Hide', function (e: kaayou.Event) {
                self.onCloseEndLayer();
            }, this);

            kaayou.getController(this.curMod.getModuleName()).on('PlayScore', function (e: kaayou.Event) {
                self.onPlayScore(e.data);
            }, this);

            kaayou.getController(this.curMod.getModuleName()).on('TurnScore', function (e: kaayou.Event) {
                self.onTurnScore(e.data);
            }, this);

            kaayou.getController(this.curMod.getModuleName()).on('PlaySound', function (e: kaayou.Event) {
                self.onPlaySound(e.data);
            }, this);

            kaayou.getController(this.curMod.getModuleName()).on('TeamerPai', function (e: kaayou.Event) {
                self.teamerPai(e.data);
            }, this);

            kaayou.getController(this.curMod.getModuleName()).on('EndOut', function (e: kaayou.Event) {
                self.endOut(e.data);
            }, this);

            // kaayou.getController(this.curMod.getModuleName()).on('showTableInfo', function (e: kaayou.Event) {
            //     self.showTableInfo(e.data);
            // }, this);

        }


        cleanUp() {
            super.cleanUp();

            this.playerLayer[0].setClockPosition(this.clockPos[0]);
            this.curSelCard = null;

            if (this.dipaiCard) this.dipaiCard.cleanUp();
            this.handCardRow.cleanUp();

            for (var x in this.outCardRow) {
                this.outCardRow[x].cleanUp();
            }
            for (var x in this.teamCardRow) {
                this.teamCardRow[x].cleanUp();
            }

            if (this.endLayerNode) { this.endLayerNode.visible = false; }
            if (this.playerInfoLayer) { this.playerInfoLayer.visible = false; }
            if (this.settingLayer) { this.settingLayer.visible = false; }
            if (this.chatLayerNode) { this.chatLayerNode.visible = false; }
            if (this.menuLayerNode) { this.menuLayerNode.visible = false; }
            //清除托管界面
            if (this.tuoguanMask) this.tuoguanMask.visible = false;
        }

        BindUIEvent() {
            let self = this;

            super.bindUiEvent();

            // //拖管
            // self.tuoguanBtn.on(kaayou.TouchEvent.TouchEnd, function () {
            //     console.log("点击托管");
            //     // self.curMod.sendTrustee(true);
            // }, this);

            // //取消托管
            // self.tuoguanMask.on(kaayou.TouchEvent.TouchEnd, function () {
            //     console.log("点击取消托管");
            //     // self.curMod.sendTrustee(false);
            // }, this);

            // self.btn_up.on(kaayou.TouchEvent.TouchEnd, this.upfunc, this);
            // self.btn_down.on(kaayou.TouchEvent.TouchEnd, this.downfunc, this);
        }


        onCloseEndLayer() {
            console.log("ui::EndLayer::Hide");
            //小结算关闭时显示换桌/准备按钮
            // this.changeTableBtn.visible = true;
            // this.readyBtn.visible = true;
            // if (this.inviteBtn) this.inviteBtn.visible = true && !!this.curMod.getConfigWx();
        }


        // // 标题
        // upfunc() {
        //     return;
        //     let self = this;
        //     if (self.isAct) return;
        //     self.isAct = true;
        //     self.renwuNode.runAction(cc.sequence(cc.moveTo(0.3, cc.p(0, 0)), cc.callFunc(function () {
        //         self.btn_up.visible = false;
        //         self.btn_down.visible = true;
        //         self.isAct = false;
        //     })))
        //     self.titleNode.runAction(cc.moveTo(0.3, cc.p(0, 95)));
        // }

        // downfunc() {
        //     return;
        //     let self = this;
        //     if (self.isAct) return;
        //     self.isAct = true;
        //     self.renwuNode.runAction(cc.sequence(cc.moveTo(0.3, cc.p(0, 95)), cc.callFunc(function () {
        //         self.btn_up.visible = true;
        //         self.btn_down.visible = false;
        //         self.isAct = false;
        //     })))
        //     self.titleNode.runAction(cc.moveTo(0.3, cc.p(0, 0)));

        // }

        //0 没有大过上家的牌    1手中有眀鸡牌   2出牌不符合规则
        noticeFunc(type: number) {
            this.tishiNode.stopAllActions();
            let self = this;
            this.tishiNode.visible = true;
            self.tishiNode.opacity = 255;

            let resNotice = {
                PokerGameFont_0: "DG.font_dp.png",
                PokerGameFont_1: "DG.font_mingji.png",
                PokerGameFont_2: "DG.font_cannotout.png",
            };
            (<ccui.ImageView>this.tishiNode.getChildByName('noticeMsg')).loadTexture(resNotice["PokerGameFont_" + type], ccui.Widget.PLIST_TEXTURE);
            this.tishiNode.runAction(cc.sequence(cc.delayTime(1), cc.fadeOut(1), cc.callFunc(function () {
                self.tishiNode.visible = false;
            })))

        }

        // 抓分
        onPlayScore(data: { chairid: number, getscore: number, playscore: Array<number> }) {
            if (data.chairid == -1 || data.getscore == 0) {
                //没人抓分
                kaayou.emit(this.curMod.getModuleName(), 'ui::updateplayscore', data);
            } else {
                //播放抓分动画
                let startPos = this.roundLableBig.getPosition();
                startPos = this.roundLableBig.getParent().convertToWorldSpace(startPos);
                let targetPos = this.playerLayer[data.chairid].getPosition();
                let playersize = this.playerLayer[data.chairid];
                targetPos = cc.pAdd(targetPos, cc.p(playersize.width / 2 + 20, -20));

                let getScoreText = new ccui.Text(data.getscore.toString(), "", 30);
                getScoreText.setColor(cc.color(255, 247, 28));
                getScoreText.setPosition(startPos);
                this.addChild(getScoreText);

                let timeScale = 0.4;
                let timeMove = 0.4;
                //飘分动画
                let acScale0 = cc.scaleTo(timeScale / 2, 1.5);
                let acScale1 = cc.scaleTo(timeScale / 2, 1.0);

                let acMove0 = cc.moveTo(timeMove, targetPos);
                let acScale2 = cc.scaleTo(timeMove, 0.8);
                let acMoveAndScale = cc.spawn([acMove0, acScale2]);

                let acPlaySound = cc.callFunc(function () {
                    //抓分音效
                    kaayou.SoundManager.getInstance().playSound(common.SoundRes.GetScore);
                }.bind(this))

                let acScale3 = cc.scaleTo(timeScale / 2, 1.5);
                let acScale4 = cc.scaleTo(timeScale / 2, 0.8);
                let acEnd = cc.callFunc(function () {
                    kaayou.emit(this.curMod.getModuleName(), 'ui::updateplayscore', data);
                    getScoreText.removeFromParent();
                }.bind(this))

                getScoreText.runAction(cc.sequence(acScale0, acScale1, acMoveAndScale, acPlaySound, acScale3, acScale4, acEnd));
            }
            return true;
        }

        // 本轮分
        onTurnScore(data: { turnscore: number }) {
            // this.roundLable.string = data.turnscore.toString();
            this.roundLableBig.string = `本轮分：${data.turnscore}`;
            this.roundLableBig.visible = data.turnscore > 0;
            return true;
        }

        // 播放音效
        onPlaySound(data: { soundtype: number, currentuser: number }) {

            if (data.soundtype == 5) {
                //报警音效
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.Warning);
            } else if (data.soundtype == 6) {
                //跑游音效
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.PaoYou);
            }
            return true;
        }
        //队友牌
        teamerPai(data: { index: number, card: Array<number> }) {
            this.teamCardRow[data.index].visible = true;
            this.teamCardRow[data.index].setNums(data.card);

            cc.log("TeamerPai", data);
            return true;
        }

        endOut(data: { theWhoPlay: number }) {
            cc.log("EndOut", data);
            for (var x in this.playerLayer) {
                this.outCardRow[x].setNums([]);
                this.playerLayer[x].setPassTag(false);
            }
            return true;
        }

        // showTableInfo(data: { roomid: number, gameconfig: common.mod.IGameConfig }) {
        //     this.difenLable.string = "" + data.gameconfig.difen;
        // }



        // onIenterRoom() {
        //     super.onIenterRoom();
        //     this.changeTableBtn.visible = false;
        //     this.readyBtn.visible = false;
        //     if (this.inviteBtn) this.inviteBtn.visible = false;
        //     //小结算显示时，不显示换桌/准备按钮，收到小结算关闭的消息时再显示
        //     if (!this.endLayerNode || !this.endLayerNode.visible) {
        //         this.changeTableBtn.visible = true;
        //         this.readyBtn.visible = true;
        //         if (this.inviteBtn) this.inviteBtn.visible = false;
        //     }
        //     return true
        // }

        onIenterRoom() {
            if (this.curMod.gameState < common.mod.GAME_STATE.GAMEING) {
                super.onIenterRoom();
            }
            return true;
        }
        // cleanUp

        resetBtn() {
            // super.resetBtn();
            this.buyaoBtn.visible = false;
            this.tishiBtn.visible = false;
            this.outCardBtn.visible = false;
            this.yingpaiBtn.visible = false;
            this.buyingBtn.visible = false;
        }
    }













    
}