

namespace common {
    export interface IPlayerLayer extends cc.INode {
        cleanUp();
        setPlayerInfo(playerInfo: any);
        setClock(time: number);
        setClockPosition(pos: cc.Point);
        setTimeLabel(time: number);
        onChat(data: any);
        onMicChat(start: boolean);
        onGVoiceSta(sta: number);
    }
    
    export abstract class PlayerLayer extends kaayou.Block {

        _index: number = 0;

        //基本信息
        headPanel: ccui.Layout = null;
        headImage: ccui.ImageView = null;
        nameText: ccui.Text = null;
        scoreText: ccui.Text = null;

        offlineImage: ccui.ImageView = null;
        zhuangImage: ccui.ImageView = null;

        //聊天
        textChatNode: cc.Node = null;
        iconChatNode: cc.Node = null;
        soundChatNode: cc.Node = null;
        gvoicingImage: ccui.ImageView = null;
        gvoiceBorbidImage: ccui.ImageView = null;

        readyTagImage: ccui.ImageView = null;

        warningNode: cc.Node = null;
        clock: ccui.ImageView = null;
        clockTime: number = 0;

        fleeTime:ccui.Text = null;

        abstract initUI(node: cc.Node);
        abstract setPlayerInfo(playerInfo: any);
        abstract onChat(data: any);
        abstract onMicChat(start: boolean);

        cleanUp() {
            this.setoffline(false);
            this.setZhuang(false);
            this.setReadyTag(false);
            this.setClock(-1);

            //聊天
            if (this.textChatNode) this.textChatNode.setVisible(false);
            if (this.iconChatNode) this.iconChatNode.setVisible(false);
            if (this.soundChatNode) this.soundChatNode.setVisible(false);
            if (this.gvoicingImage) this.gvoicingImage.setVisible(false);
            if (this.gvoiceBorbidImage) this.gvoiceBorbidImage.setVisible(false);
        }

        getIndex(): number {
            return this._index;
        }

        setIndex(value: number) {
            if (this._index != value) {
                this._index = value;
                //this.changeAllLayout();
            }
        }

        setPlayerHead(_url: string, sex: number, uid: number) {
            let headImgSp: cc.Sprite = null;
            if (this.headImage.getChildren().length < 1) {
                headImgSp = new cc.Sprite();
                headImgSp.setVisible(false);
                this.headImage.addChild(headImgSp);
            } else {
                headImgSp = <cc.Sprite>this.headImage.getChildren()[0];
                //如果头像地址未变化，原头像还是显示
                headImgSp.setVisible(_url == headImgSp['_url']);
            }

            if (_url && !lodash.isEmpty(_url)) {
                (function (sp, _layouts) {
                    if(!sp){return ;}
                    if(!_layouts){return ;}
                    NetImage.loadImage(_url).then(function (tex: cc.Texture2D) {
                        if (!sp.isRunning() || !_layouts.isRunning()) { return; }
                        sp.initWithTexture(tex);
                        NetImage.doSpriteContentSizeAndPosition(sp, _layouts.getContentSize());
                        sp.setVisible(true);
                        sp['_url'] = _url;
                    });
                })(headImgSp, this.headImage);
            } else {
                headImgSp.initWithSpriteFrameName(sex == 1 ? "nan.png" : "nv.png");
                NetImage.doSpriteContentSizeAndPosition(headImgSp, this.headImage.getContentSize());
                headImgSp.setVisible(true);
                headImgSp['_url'] = _url;
            }
        }

        setPlayerName(name: string) {
            if (!this.nameText) { return; }
            let tempNickName = kaayou.Identify.nickNameSubFour(name);
            this.nameText.setString(tempNickName);
            this.nameText.ignoreContentAdaptWithSize(true);
        }

        setScore(score: number) {
            if (!this.scoreText) { return; }
            this.scoreText.string = kaayou.Identify.changeScoreToSortString(score);
        }

        setoffline(b: boolean) {
            if (!this.offlineImage) { return; }
            this.offlineImage.visible = b;
        }

        setZhuang(b: boolean) {
            if (!this.zhuangImage) { return; }
            this.zhuangImage.visible = b;
        }

        //设置是否显示准备
        setReadyTag(b: boolean) {
            if (!this.readyTagImage) { return; }
            this.readyTagImage.visible = b;
        }

        //设置闹钟坐标，pos为世界坐标
        setClockPosition(pos: cc.Point) {
            if (!this.clock) { return; }

            let localPos = this.convertToNodeSpace(pos);
            this.clock.setPosition(localPos.x, localPos.y);
        }

        setClock(time: number) {
            if (!this.clock) { return; }

            if (time <= 0) {
                this.clock.visible = false;
                this.clockTime = 0;
                this.unschedule(this.onUpdateTime);
                return;
            }
            
            this.clock.visible = true;
            this.clockTime = Math.floor(new Date().getTime()) + time * 1000 - 1;
            this.unschedule(this.onUpdateTime);
            this.schedule(this.onUpdateTime, 0.5);
            this.onUpdateTime();
        }

        onUpdateTime() {
            let curtime = (this.clockTime - Math.floor(new Date().getTime())) / 1000;
            if (this.getIndex() == 0 && curtime >= 3.5 && curtime < 4.0) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.Clock);
            }
            curtime = Math.floor(curtime);
            
            this.setTimeLabel(curtime);

            if (curtime < 0) {
                this.clock.visible = false;
                this.clockTime = 0;
                this.unschedule(this.onUpdateTime);
            } else {
                this.clock.visible = true;
            }
        }

        setTimeLabel(time: number) {
            this.clock.visible = time >= 0;
            let clockText = <ccui.TextAtlas>this.clock.getChildByName('Text_clock');
            clockText.ignoreContentAdaptWithSize(true);
            clockText.string = time.toString();
        }

        setWarning(b: boolean) {
            if (!this.warningNode) { return; }

            this.warningNode.visible = b;
        }

        onGVoiceSta(sta: number) {
            if (!this.gvoicingImage) { return; }
            if (!this.gvoiceBorbidImage) { return; }
            
            this.gvoicingImage.visible = sta > 0;
            this.gvoiceBorbidImage.visible = sta == -1;
        }
    }

    export namespace DG {
        const { BindEvent, doBindEvent } = kaayou._decorator;
        export interface IPlayerLayer extends common.IPlayerLayer {
            setPassTag(b: boolean);
        }
        export abstract class PlayerLayer extends common.PlayerLayer {

            youArr: Array<string> = null;
            
            cardNumNode: ccui.ImageView = null;
            roundScoreNode: ccui.ImageView = null;
            scoreNode: ccui.ImageView = null;
            tuoguanImage: ccui.ImageView = null;
            mingjiImage: ccui.ImageView = null;
            yingpaiImage: ccui.ImageView = null;
            youImage: ccui.ImageView = null;

            //下面几个是玩家是否准备、不出、硬牌与否标记，不是头像上的标记
            passTagImage: ccui.ImageView = null;
            yingpaiTagImage: ccui.ImageView = null;
            buyingTagImage: ccui.ImageView = null;

            cleanUp() {
                super.cleanUp();
                //基本标签
                this.setTuoguan(false);
                this.setMingJi(false);
                this.setYingPai(false);
                this.setYingPaiTag(false);
                this.setBuYingTag(false);
                this.setYou(0, false);
                this.setPassTag(false);
            }

            //设置牌剩余张数
            setCardNum(num: number, isPlaying: boolean) {
                if (!this.cardNumNode) { return; }
                this.cardNumNode.setVisible(isPlaying);
                let remainText = <ccui.TextAtlas>this.cardNumNode.getChildByName('Text_cardCount');
                remainText.ignoreContentAdaptWithSize(true);
                remainText.setString(num.toString());
                if (this._index == 0) this.cardNumNode.setVisible(false);
            }

            setRoundScore(visible: boolean, score: number) {
                if (!this.roundScoreNode) { return; }
                let roundScoreText: ccui.Text = <ccui.Text>this.roundScoreNode.getChildByName('Text_roundScore');
                if (!roundScoreText) { return; }
                roundScoreText.string = "抓分：" + score.toString();
                roundScoreText.ignoreContentAdaptWithSize(true);
                this.roundScoreNode.visible = true;
            }

            setScore(score: number) {
                if (!this.scoreNode) { return; }
                let text_Score: ccui.Text = <ccui.Text>this.scoreNode.getChildByName('Text_Score');
                if (!text_Score) { return; }
                text_Score.string = "积分：" + score.toString();
                text_Score.ignoreContentAdaptWithSize(true);
                this.scoreNode.visible = true;
            }

            setTuoguan(b: boolean) {
                if (!this.tuoguanImage) { return; }
                this.tuoguanImage.visible = b;
            }

            setMingJi(b: boolean) {
                if (!this.mingjiImage) { return; }
                this.mingjiImage.visible = b;
            }

            //头像上的硬牌标记
            setYingPai(b: boolean) {
                if (!this.yingpaiImage) { return; }
                this.yingpaiImage.visible = b;
            }

            //设置几游显示：youIndex几游，isstart：游戏是否开始
            setYou(youIndex: number, isstart: boolean) {
                if (!this.youImage) { return; }
                if (youIndex <= 0 || youIndex >= 255 || !isstart) {
                    this.youImage.visible = false;
                    return
                }
                this.youImage.visible = true;
                this.youImage.loadTexture(this.youArr[youIndex - 1], ccui.Widget.PLIST_TEXTURE);
            }

            setPassTag(b: boolean) {
                if (!this.passTagImage) { return; }
                this.passTagImage.visible = b;
            }

            //硬牌标记，不是头像上的标记
            setYingPaiTag(b: boolean) {
                if (!this.yingpaiTagImage) { return; }
                this.yingpaiTagImage.visible = b;
            }

            setBuYingTag(b: boolean) {
                if (!this.buyingTagImage) { return; }
                this.buyingTagImage.visible = b;
            }
        }
    }
}

