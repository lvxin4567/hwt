namespace common {
    export abstract class NewMaJonCard extends kaayou.ImageView {

        InnerNum: number = 0;

        carddirection: MaJonCardType.CardDirection = MaJonCardType.CardDirection.SOUTH;
        Cover: boolean = false;
        cardtype: MaJonCardType.CardType = MaJonCardType.CardType.HAND;
        cardModel: MaJonCardType.CardModel = MaJonCardType.CardModel.model2d;

        isSelect: boolean = false;

        flowersp: kaayou.ImageView = null;
        arrow: ccui.ImageView = null;
        image_pilai: ccui.ImageView = null;
        tingTag: ccui.ImageView = null;
        leftCard: ccui.Text = null;

        mustRes: string = "";
        isEffective: boolean = true;//是否有效

        protected _cardInfo: MjPosInfo = null;

        abstract changeLaiPi();
        // arrowPositions;
        //  arrowScale;
        //  tingPositions;

        constructor() {
            super();
        }

        setMustMajonRes(mustRes: string) {
            this.mustRes = mustRes;
        }

        setEffective(effective: boolean) {
            this.isEffective = effective;
        }

        static getCardColor(index: number): MaJonCardType.CardColor {
            if (index == 0) {
                return MaJonCardType.CardColor.GREEN;
            } else if (index == 1) {
                return MaJonCardType.CardColor.BLUE;
            } else if (index == 2) {
                return MaJonCardType.CardColor.YELLOW;
            }
        }
        getCardDirection(direction: string): MaJonCardType.CardDirection {
            return MaJonCardType.CardDirection[direction.toUpperCase()];
        }
        getCardType(type: string): MaJonCardType.CardType {
            if (type == "gang") {
                return MaJonCardType.CardType.MELD;
            } else {
                return MaJonCardType.CardType[type.toUpperCase()];
            }
        }
        initUi() {
            this.flowersp = new kaayou.ImageView();
            this.addChild(this.flowersp);
            this.flowersp.setName('flowersp');
            this.flowersp.ignoreContentAdaptWithSize(true);

            this.arrow = new ccui.ImageView(MaJonCard.res_prefix + ".card_provider_0.png", ccui.Widget.PLIST_TEXTURE);
            this.addChild(this.arrow);
            this.arrow.setVisible(false);

            this.image_pilai = new ccui.ImageView(MaJonCard.res_prefix + ".laizi_angle.png", ccui.Widget.PLIST_TEXTURE);
            this.addChild(this.image_pilai);
            this.image_pilai.setVisible(false);
            this.image_pilai.setContentSize(31, 36);

            this.tingTag = new ccui.ImageView(MaJonCard.res_prefix + ".card_ting_angle.png", ccui.Widget.PLIST_TEXTURE);
            this.addChild(this.tingTag);
            this.tingTag.setVisible(false);

            this.leftCard = new ccui.Text("", "", 18);
            this.leftCard.setPosition(19, -15.5);
            this.leftCard.setColor(cc.color(71, 220, 255));
            this.addChild(this.leftCard);
            this.leftCard.setVisible(false);
        }
        doSetInfo(value: MjPosInfo) {
            if (!this.isEffective) {
                return;
            }
            this.carddirection = this.getCardDirection(value.direction);
            this.cardtype = this.getCardType(value.type);
            this._cardInfo = value;
            this.setLocalZOrder(value.zOrder);
            this.setPosition(value.posx, value.posy);
            if (value.scale == undefined) {
                value.scale = 1;
            }
            this.setScale(value.scale);
            this.doChangeCard();
        }
        doChangeCard() {
            if (!this.isEffective) {
                return;
            }
            if (this.cardtype == MaJonCardType.CardType.HEAP || this.cardtype == MaJonCardType.CardType.TABLE) {
                if (this.InnerNum > 0) {
                    this.Cover = false;
                } else {
                    this.Cover = true;
                }
            }
            this.cardModel = MaJonCard.cardModel;
            //如果是3D模式下  但是必须强制使用2d麻将资源
            if (this.cardModel == MaJonCardType.CardModel.model3d && this.mustRes.length > 0) {
                this.cardModel = MaJonCardType.CardModel.model2d;
            }
            this.arrow.setPosition(this.arrowPositions[this.carddirection]);
            this.arrow.setScale(this.arrowScale[this.carddirection]);
            this.setColor(cc.color(255, 255, 255));
            this.changeBg();
            this.changeInner();
            this.changeLaiPi();
        }
        changeBg() {
            //方向 
            let direction = this.carddirection;
            //颜色
            let ctype = Number(cc.sys.localStorage.getItem("mjBgType"));
            let color = MaJonCard.getCardColor(ctype);
            //是否背牌
            let cover = this.Cover ? 'cover_' : '';
            let cardtype = <string>this.cardtype;
            let is3d = false;
            if (MaJonCard.cardModel == MaJonCardType.CardModel.model3d && this.mustRes.length == 0) {
                direction = <MaJonCardType.CardDirection>this._cardInfo.pic.split("_")[0];
                cardtype = this._cardInfo.pic.split("_")[1];
                is3d = true;
            }
            let bgStr = ""
            if (this.mustRes.length > 0) {
                bgStr = `${this.mustRes}.${color}_${direction}_${cardtype}_${cover}board.png`
            } else {
                bgStr = `${MaJonCard.res_prefix}.${color}_${direction}_${cardtype}_${cover}board.png`
            }
            if (cc.spriteFrameCache.getSpriteFrame(bgStr)) {
                this.loadTexture(bgStr, ccui.Widget.PLIST_TEXTURE);
            } else {
                console.error(`找不到麻将纹理:${bgStr}`)
                /** if (cc.sys.isNative && (cc.sys.os == cc.sys.OS_IOS || cc.sys.os == cc.sys.OS_ANDROID)) {
                    try {
                        let arr = null;
                        arr.shift(0);
                    } catch (err) {
                        let message = err.message;
                        if (typeof message == 'string') {
                            if (!message) { message = "no message"; }
                        } else if (typeof message == 'object') {
                            try {
                                message = JSON.stringify(message, null, 2);
                            } catch (er) {
                                message = "err message object";
                            }
                        } else {
                            message = "no message";
                        }

                        let stack = err.stack;
                        if (typeof stack == 'string') {
                            if (!stack) { stack = "no stack"; }
                        } else if (typeof stack == 'object') {
                            try {
                                stack = JSON.stringify(stack, null, 2);
                            } catch (er) {
                                stack = "err stack object";
                            }
                        } else {
                            stack = "no stack";
                        }
                        let isPost = true;
                        if (cardtype == "meld" && is3d) {
                            isPost = false;
                        }
                        if (isPost) {
                            kaayou.PlatformMgr.getInstance().sys.PostBugly(`麻将牌花错误:游戏${MaJonCard.gameName}牌花:${bgStr}`, `${message}`, stack);
                        }
                    }
                }*/
            }
        }
        changeInner() {
            if (this.Cover) {
                this.flowersp.setVisible(false);
                return;
            } else {
                if (this.carddirection != MaJonCardType.CardDirection.SOUTH && this.cardtype == MaJonCardType.CardType.HAND) {
                    this.flowersp.setVisible(false);
                    return;
                }
            }
            if (!this.InnerNum) return;
            if (this.InnerNum <= 0) return;
            this.flowersp.setVisible(true);
            //2D麻将资源牌花是固定的south_table_tile_0_
            let innerstr = `south_table_tile_0_${this.InnerNum.toString(16)}.png`;
            if (this._cardInfo && this.cardModel == MaJonCardType.CardModel.model3d && this.mustRes.length == 0) {
                let tmpstr = this._cardInfo.flowerPic.split("_");
                //"west_discard_tile_0_29.png"
                innerstr = `${tmpstr[0]}_${tmpstr[1]}_tile_0_${this.InnerNum.toString(16)}.png`;
            }
            let prestr = this.mustRes.length > 0 ? this.mustRes : MaJonCard.res_prefix;
            let flowerstr = `${prestr}.${innerstr}`;
            if (!cc.spriteFrameCache.getSpriteFrame(flowerstr)) {
                this.setVisible(false);
                return;
            }

            this.flowersp.loadTexture(flowerstr, ccui.Widget.PLIST_TEXTURE);
            this.flowersp.setScale(this._cardInfo.flowerScale);
            this.flowersp.setRotation(this._cardInfo.flowerRotation);
            this.flowersp.setPosition(this._cardInfo.flowerPosx, this._cardInfo.flowerPosy);
        }

        InnerRotations = (function () {
            let rotations: { [key: string]: number } = {};
            rotations[MaJonCardType.CardDirection.EAST] = -90;
            rotations[MaJonCardType.CardDirection.WEST] = 90;
            rotations[MaJonCardType.CardDirection.SOUTH] = 0;
            rotations[MaJonCardType.CardDirection.NORTH] = 0;
            return rotations;
        })()

        changeArrow(index: number, outIndex: number, show: boolean = true, type: MeldType = 0) {
            if (!show) {
                this.arrow.visible = false;
                return;
            }

            if (this.cardtype !== MaJonCardType.CardType.MELD) {
                return;
            }

            if (index == outIndex) {
                if (type != MeldType.BUGANG && type != MeldType.ANGANG && type != MeldType.CHAOGANG) {
                    return;
                }
            }
            this.arrow.visible = true;

            let orginalRotation = 0;
            if (this.carddirection == MaJonCardType.CardDirection.SOUTH) {
                this.arrow.rotation = 0;
            } else if (this.carddirection == MaJonCardType.CardDirection.EAST) {
                this.arrow.rotation = -90;
            } else if (this.carddirection == MaJonCardType.CardDirection.NORTH) {
                this.arrow.rotation = -180;
            } else {
                this.arrow.rotation = -270;
            }
            orginalRotation = this.arrow.rotation;
            let difRotation = (index - outIndex) * 90;
            this.arrow.rotation += difRotation;

            if (type == MeldType.ANGANG || type == MeldType.BUGANG || type == MeldType.CHAOGANG) {
                this.arrow.loadTexture(MaJonCard.res_prefix + ".card_provider_zimo.png", ccui.Widget.PLIST_TEXTURE);
                this.arrow.rotation = orginalRotation;
            }
            else {
                this.arrow.loadTexture(MaJonCard.res_prefix + ".card_provider_0.png", ccui.Widget.PLIST_TEXTURE);
            }
        }

        setSelecte(v: boolean) {
            this.isSelect = v;
            if (this.isSelect) {
                if (this.carddirection == MaJonCardType.CardDirection.SOUTH) {
                    this.setPosition(this._cardInfo.posx, this._cardInfo.posy + 20);
                }
            } else {
                this.setPosition(this._cardInfo.posx, this._cardInfo.posy);
            }
        }

        getSelect(): boolean {
            return this.isSelect;
        }

        getCardInfo() {
            return this._cardInfo;
        }

        reset() {

        }

        setColor(c: cc.Color) {
            super.setColor(c);
            // this.flowersp.setColor(c);
            // this.arrow.setColor(c);
            // this.image_pilai.setColor(c);
            // this.tingTag.setColor(c);
            for (let i = 0; i < this.childrenCount; i++) {
                let child = this.children[i];
                if(!child) continue;
                if(!child.getDescription) continue;
                let type_name = child.getDescription();
                if (type_name == "ImageView") {
                    child.setColor(c);
                }
            }
        }

        setGaryMask(b: boolean) {
            if (b) {
                this.setColor(cc.color(128, 128, 128));
            } else {
                this.setColor(cc.color(255, 255, 255));
            }

        }

        setTing(b: boolean) {
            if (this.cardtype !== MaJonCardType.CardType.HAND || this.carddirection != MaJonCardType.CardDirection.SOUTH) {
                this.tingTag.setVisible(false);
            }
            this.tingTag.setVisible(b);
            if (b) {
                this.tingTag.setPosition(this.tingPositions[MaJonCard.cardModel]);
            }
        }

        setNum(num: number) {
            this.leftCard.setVisible(true);
            this.leftCard.setString(num.toString() + "张");
        }

        setCover(cover: boolean) {
            if (this.Cover != cover) {
                this.Cover = cover;
                this.doChangeCard();
            }
        }

        setMaskColor(c: cc.Color) {
            this.setColor(c);
        }

        tingPositions = (function () {
            let poss = {};
            poss[common.MaJonCardType.CardModel.model2d] = cc.p(18.4, 81.3);
            poss[common.MaJonCardType.CardModel.model3d] = cc.p(18, 91.3);
            return poss;
        })()


        arrowPositions = (function () {
            let poss = {};
            poss[common.MaJonCardType.CardDirection.SOUTH] = cc.p(35, 14);
            poss[common.MaJonCardType.CardDirection.WEST] = cc.p(9, 31);
            poss[common.MaJonCardType.CardDirection.EAST] = cc.p(44, 31);
            poss[common.MaJonCardType.CardDirection.NORTH] = cc.p(21, 23);
            return poss;
        })()

        arrowScale = (function () {
            let scales = {};
            scales[common.MaJonCardType.CardDirection.EAST] = 0.7;
            scales[common.MaJonCardType.CardDirection.WEST] = 0.7;
            scales[common.MaJonCardType.CardDirection.SOUTH] = 1;
            scales[common.MaJonCardType.CardDirection.NORTH] = 0.7;
            return scales;
        })()

        LaiPiScale = (function () {
            let scales: { [key: string]: { [key: string]: { [key: string]: number } } } = {};
            //东
            scales[common.MaJonCardType.CardDirection.EAST] = {};
            scales[common.MaJonCardType.CardDirection.EAST][common.MaJonCardType.CardType.HAND] = {};
            scales[common.MaJonCardType.CardDirection.EAST][common.MaJonCardType.CardType.DISCARD] = {};
            scales[common.MaJonCardType.CardDirection.EAST][common.MaJonCardType.CardType.PILAI] = {};
            scales[common.MaJonCardType.CardDirection.EAST][common.MaJonCardType.CardType.MELD] = {};
            scales[common.MaJonCardType.CardDirection.EAST][common.MaJonCardType.CardType.TABLE] = {};
            scales[common.MaJonCardType.CardDirection.EAST][common.MaJonCardType.CardType.HEAP] = {};

            scales[common.MaJonCardType.CardDirection.EAST][common.MaJonCardType.CardType.HAND][MaJonCardType.CardModel.model2d] = 1;          //用不到
            scales[common.MaJonCardType.CardDirection.EAST][common.MaJonCardType.CardType.DISCARD][MaJonCardType.CardModel.model2d] = 1;   //用不到
            scales[common.MaJonCardType.CardDirection.EAST][common.MaJonCardType.CardType.PILAI][MaJonCardType.CardModel.model2d] = 0.35;
            scales[common.MaJonCardType.CardDirection.EAST][common.MaJonCardType.CardType.MELD][MaJonCardType.CardModel.model2d] = 1;
            scales[common.MaJonCardType.CardDirection.EAST][common.MaJonCardType.CardType.TABLE][MaJonCardType.CardModel.model2d] = 0.4;

            //西
            scales[common.MaJonCardType.CardDirection.WEST] = {};
            scales[common.MaJonCardType.CardDirection.WEST][common.MaJonCardType.CardType.HAND] = {};
            scales[common.MaJonCardType.CardDirection.WEST][common.MaJonCardType.CardType.DISCARD] = {};
            scales[common.MaJonCardType.CardDirection.WEST][common.MaJonCardType.CardType.PILAI] = {};
            scales[common.MaJonCardType.CardDirection.WEST][common.MaJonCardType.CardType.MELD] = {};
            scales[common.MaJonCardType.CardDirection.WEST][common.MaJonCardType.CardType.TABLE] = {};
            scales[common.MaJonCardType.CardDirection.WEST][common.MaJonCardType.CardType.HEAP] = {};

            scales[common.MaJonCardType.CardDirection.WEST][common.MaJonCardType.CardType.HAND][MaJonCardType.CardModel.model2d] = 1;        //用不到
            scales[common.MaJonCardType.CardDirection.WEST][common.MaJonCardType.CardType.DISCARD][MaJonCardType.CardModel.model2d] = 1;  //用不到
            scales[common.MaJonCardType.CardDirection.WEST][common.MaJonCardType.CardType.PILAI][MaJonCardType.CardModel.model2d] = 0.35;
            scales[common.MaJonCardType.CardDirection.WEST][common.MaJonCardType.CardType.MELD][MaJonCardType.CardModel.model2d] = 1
            scales[common.MaJonCardType.CardDirection.WEST][common.MaJonCardType.CardType.TABLE][MaJonCardType.CardModel.model2d] = 0.4;

            //南  //mine
            scales[common.MaJonCardType.CardDirection.SOUTH] = {};
            scales[common.MaJonCardType.CardDirection.SOUTH][common.MaJonCardType.CardType.HAND] = {};
            scales[common.MaJonCardType.CardDirection.SOUTH][common.MaJonCardType.CardType.DISCARD] = {};
            scales[common.MaJonCardType.CardDirection.SOUTH][common.MaJonCardType.CardType.PILAI] = {};
            scales[common.MaJonCardType.CardDirection.SOUTH][common.MaJonCardType.CardType.MELD] = {};
            scales[common.MaJonCardType.CardDirection.SOUTH][common.MaJonCardType.CardType.TABLE] = {};
            scales[common.MaJonCardType.CardDirection.SOUTH][common.MaJonCardType.CardType.HEAP] = {};

            scales[common.MaJonCardType.CardDirection.SOUTH][common.MaJonCardType.CardType.HAND][MaJonCardType.CardModel.model2d] = 1;
            scales[common.MaJonCardType.CardDirection.SOUTH][common.MaJonCardType.CardType.DISCARD][MaJonCardType.CardModel.model2d] = 1; //用不到
            scales[common.MaJonCardType.CardDirection.SOUTH][common.MaJonCardType.CardType.PILAI][MaJonCardType.CardModel.model2d] = 0.35;  //
            scales[common.MaJonCardType.CardDirection.SOUTH][common.MaJonCardType.CardType.MELD][MaJonCardType.CardModel.model2d] = 1
            scales[common.MaJonCardType.CardDirection.SOUTH][common.MaJonCardType.CardType.TABLE][MaJonCardType.CardModel.model2d] = 0.75;

            //北
            scales[common.MaJonCardType.CardDirection.NORTH] = {};
            scales[common.MaJonCardType.CardDirection.NORTH][common.MaJonCardType.CardType.HAND] = {};
            scales[common.MaJonCardType.CardDirection.NORTH][common.MaJonCardType.CardType.DISCARD] = {};
            scales[common.MaJonCardType.CardDirection.NORTH][common.MaJonCardType.CardType.PILAI] = {};
            scales[common.MaJonCardType.CardDirection.NORTH][common.MaJonCardType.CardType.MELD] = {};
            scales[common.MaJonCardType.CardDirection.NORTH][common.MaJonCardType.CardType.TABLE] = {};
            scales[common.MaJonCardType.CardDirection.NORTH][common.MaJonCardType.CardType.HEAP] = {};

            scales[common.MaJonCardType.CardDirection.NORTH][common.MaJonCardType.CardType.HAND][MaJonCardType.CardModel.model2d] = 1;    //用不到
            scales[common.MaJonCardType.CardDirection.NORTH][common.MaJonCardType.CardType.DISCARD][MaJonCardType.CardModel.model2d] = 1; //用不到
            scales[common.MaJonCardType.CardDirection.NORTH][common.MaJonCardType.CardType.PILAI][MaJonCardType.CardModel.model2d] = 0.35;
            scales[common.MaJonCardType.CardDirection.NORTH][common.MaJonCardType.CardType.MELD][MaJonCardType.CardModel.model2d] = 1
            scales[common.MaJonCardType.CardDirection.NORTH][common.MaJonCardType.CardType.TABLE][MaJonCardType.CardModel.model2d] = 0.4;


            //----------------------------------3d------------------------------------------
            //东
            scales[common.MaJonCardType.CardDirection.EAST][common.MaJonCardType.CardType.HAND][MaJonCardType.CardModel.model3d] = 1;          //用不到
            scales[common.MaJonCardType.CardDirection.EAST][common.MaJonCardType.CardType.DISCARD][MaJonCardType.CardModel.model3d] = 1;   //用不到
            scales[common.MaJonCardType.CardDirection.EAST][common.MaJonCardType.CardType.PILAI][MaJonCardType.CardModel.model3d] = 0.5;
            scales[common.MaJonCardType.CardDirection.EAST][common.MaJonCardType.CardType.MELD][MaJonCardType.CardModel.model3d] = 1
            scales[common.MaJonCardType.CardDirection.EAST][common.MaJonCardType.CardType.TABLE][MaJonCardType.CardModel.model3d] = 0.4;
            scales[common.MaJonCardType.CardDirection.EAST][common.MaJonCardType.CardType.HEAP][MaJonCardType.CardModel.model3d] = 1;


            //西
            scales[common.MaJonCardType.CardDirection.WEST][common.MaJonCardType.CardType.HAND][MaJonCardType.CardModel.model3d] = 1;        //用不到
            scales[common.MaJonCardType.CardDirection.WEST][common.MaJonCardType.CardType.DISCARD][MaJonCardType.CardModel.model3d] = 1;  //用不到
            scales[common.MaJonCardType.CardDirection.WEST][common.MaJonCardType.CardType.PILAI][MaJonCardType.CardModel.model3d] = 0.5;
            scales[common.MaJonCardType.CardDirection.WEST][common.MaJonCardType.CardType.MELD][MaJonCardType.CardModel.model3d] = 1
            scales[common.MaJonCardType.CardDirection.WEST][common.MaJonCardType.CardType.TABLE][MaJonCardType.CardModel.model3d] = 0.4;
            scales[common.MaJonCardType.CardDirection.WEST][common.MaJonCardType.CardType.HEAP][MaJonCardType.CardModel.model3d] = 1;

            //南  //mine
            scales[common.MaJonCardType.CardDirection.SOUTH][common.MaJonCardType.CardType.HAND][MaJonCardType.CardModel.model3d] = 1;
            scales[common.MaJonCardType.CardDirection.SOUTH][common.MaJonCardType.CardType.DISCARD][MaJonCardType.CardModel.model3d] = 1; //用不到
            scales[common.MaJonCardType.CardDirection.SOUTH][common.MaJonCardType.CardType.PILAI][MaJonCardType.CardModel.model3d] = 0.5;  //
            scales[common.MaJonCardType.CardDirection.SOUTH][common.MaJonCardType.CardType.MELD][MaJonCardType.CardModel.model3d] = 1
            scales[common.MaJonCardType.CardDirection.SOUTH][common.MaJonCardType.CardType.TABLE][MaJonCardType.CardModel.model3d] = 1;
            scales[common.MaJonCardType.CardDirection.SOUTH][common.MaJonCardType.CardType.HEAP][MaJonCardType.CardModel.model3d] = 1;

            //北
            scales[common.MaJonCardType.CardDirection.NORTH][common.MaJonCardType.CardType.HAND][MaJonCardType.CardModel.model3d] = 1;    //用不到
            scales[common.MaJonCardType.CardDirection.NORTH][common.MaJonCardType.CardType.DISCARD][MaJonCardType.CardModel.model3d] = 1; //用不到
            scales[common.MaJonCardType.CardDirection.NORTH][common.MaJonCardType.CardType.PILAI][MaJonCardType.CardModel.model3d] = 0.5;
            scales[common.MaJonCardType.CardDirection.NORTH][common.MaJonCardType.CardType.MELD][MaJonCardType.CardModel.model3d] = 1
            scales[common.MaJonCardType.CardDirection.NORTH][common.MaJonCardType.CardType.TABLE][MaJonCardType.CardModel.model3d] = 0.4;
            scales[common.MaJonCardType.CardDirection.NORTH][common.MaJonCardType.CardType.HEAP][MaJonCardType.CardModel.model3d] = 1;

            return scales;
        })()


        LaiPiPositions = (function () {
            let poss: { [key: string]: { [key: string]: { [key: string]: cc.Point } } } = {};

            //东
            poss[common.MaJonCardType.CardDirection.EAST] = {};
            poss[common.MaJonCardType.CardDirection.EAST][common.MaJonCardType.CardType.HAND] = {};
            poss[common.MaJonCardType.CardDirection.EAST][common.MaJonCardType.CardType.DISCARD] = {};
            poss[common.MaJonCardType.CardDirection.EAST][common.MaJonCardType.CardType.PILAI] = {};
            poss[common.MaJonCardType.CardDirection.EAST][common.MaJonCardType.CardType.MELD] = {};
            poss[common.MaJonCardType.CardDirection.EAST][common.MaJonCardType.CardType.TABLE] = {};
            poss[common.MaJonCardType.CardDirection.EAST][common.MaJonCardType.CardType.HEAP] = {};


            poss[common.MaJonCardType.CardDirection.EAST][common.MaJonCardType.CardType.HAND][MaJonCardType.CardModel.model2d] = cc.p(0, 10);          //用不到
            poss[common.MaJonCardType.CardDirection.EAST][common.MaJonCardType.CardType.DISCARD][MaJonCardType.CardModel.model2d] = cc.p(-14.5, -1);   //用不到
            poss[common.MaJonCardType.CardDirection.EAST][common.MaJonCardType.CardType.PILAI][MaJonCardType.CardModel.model2d] = cc.p(39, 36.6);
            poss[common.MaJonCardType.CardDirection.EAST][common.MaJonCardType.CardType.MELD][MaJonCardType.CardModel.model2d] =
                poss[common.MaJonCardType.CardDirection.EAST][common.MaJonCardType.CardType.TABLE][MaJonCardType.CardModel.model2d] = cc.p(43.1, 40.5);



            //西
            poss[common.MaJonCardType.CardDirection.WEST] = {};
            poss[common.MaJonCardType.CardDirection.WEST][common.MaJonCardType.CardType.HAND] = {};
            poss[common.MaJonCardType.CardDirection.WEST][common.MaJonCardType.CardType.DISCARD] = {};
            poss[common.MaJonCardType.CardDirection.WEST][common.MaJonCardType.CardType.PILAI] = {};
            poss[common.MaJonCardType.CardDirection.WEST][common.MaJonCardType.CardType.MELD] = {};
            poss[common.MaJonCardType.CardDirection.WEST][common.MaJonCardType.CardType.TABLE] = {};
            poss[common.MaJonCardType.CardDirection.WEST][common.MaJonCardType.CardType.HEAP] = {};

            poss[common.MaJonCardType.CardDirection.WEST][common.MaJonCardType.CardType.HAND][MaJonCardType.CardModel.model2d] = cc.p(0, 10);        //用不到
            poss[common.MaJonCardType.CardDirection.WEST][common.MaJonCardType.CardType.DISCARD][MaJonCardType.CardModel.model2d] = cc.p(22.5, -2);  //用不到
            poss[common.MaJonCardType.CardDirection.WEST][common.MaJonCardType.CardType.PILAI][MaJonCardType.CardModel.model2d] = cc.p(7.8, 20.35);
            poss[common.MaJonCardType.CardDirection.WEST][common.MaJonCardType.CardType.MELD][MaJonCardType.CardModel.model2d] =
                poss[common.MaJonCardType.CardDirection.WEST][common.MaJonCardType.CardType.TABLE][MaJonCardType.CardModel.model2d] = cc.p(8.25, 19.95);

            //南  //mine
            poss[common.MaJonCardType.CardDirection.SOUTH] = {};
            poss[common.MaJonCardType.CardDirection.SOUTH][common.MaJonCardType.CardType.HAND] = {};
            poss[common.MaJonCardType.CardDirection.SOUTH][common.MaJonCardType.CardType.DISCARD] = {};
            poss[common.MaJonCardType.CardDirection.SOUTH][common.MaJonCardType.CardType.PILAI] = {};
            poss[common.MaJonCardType.CardDirection.SOUTH][common.MaJonCardType.CardType.MELD] = {};
            poss[common.MaJonCardType.CardDirection.SOUTH][common.MaJonCardType.CardType.TABLE] = {};
            poss[common.MaJonCardType.CardDirection.SOUTH][common.MaJonCardType.CardType.HEAP] = {};

            poss[common.MaJonCardType.CardDirection.SOUTH][common.MaJonCardType.CardType.HAND][MaJonCardType.CardModel.model2d] = cc.p(68.5, 21);
            poss[common.MaJonCardType.CardDirection.SOUTH][common.MaJonCardType.CardType.DISCARD][MaJonCardType.CardModel.model2d] = cc.p(15, -12); //用不到
            poss[common.MaJonCardType.CardDirection.SOUTH][common.MaJonCardType.CardType.PILAI][MaJonCardType.CardModel.model2d] = cc.p(29.8, 16.8);  //
            poss[common.MaJonCardType.CardDirection.SOUTH][common.MaJonCardType.CardType.MELD][MaJonCardType.CardModel.model2d] =
                poss[common.MaJonCardType.CardDirection.SOUTH][common.MaJonCardType.CardType.TABLE][MaJonCardType.CardModel.model2d] = cc.p(52.3, 36);

            //北
            poss[common.MaJonCardType.CardDirection.NORTH] = {};
            poss[common.MaJonCardType.CardDirection.NORTH][common.MaJonCardType.CardType.HAND] = {};
            poss[common.MaJonCardType.CardDirection.NORTH][common.MaJonCardType.CardType.DISCARD] = {};
            poss[common.MaJonCardType.CardDirection.NORTH][common.MaJonCardType.CardType.PILAI] = {};
            poss[common.MaJonCardType.CardDirection.NORTH][common.MaJonCardType.CardType.MELD] = {};
            poss[common.MaJonCardType.CardDirection.NORTH][common.MaJonCardType.CardType.TABLE] = {};
            poss[common.MaJonCardType.CardDirection.NORTH][common.MaJonCardType.CardType.HEAP] = {};

            poss[common.MaJonCardType.CardDirection.NORTH][common.MaJonCardType.CardType.HAND][MaJonCardType.CardModel.model2d] = cc.p(0, 7);    //用不到
            poss[common.MaJonCardType.CardDirection.NORTH][common.MaJonCardType.CardType.DISCARD][MaJonCardType.CardModel.model2d] = cc.p(15, -12); //用不到
            poss[common.MaJonCardType.CardDirection.NORTH][common.MaJonCardType.CardType.PILAI][MaJonCardType.CardModel.model2d] = cc.p(29.8, 16.8);
            poss[common.MaJonCardType.CardDirection.NORTH][common.MaJonCardType.CardType.MELD][MaJonCardType.CardModel.model2d] =
                poss[common.MaJonCardType.CardDirection.NORTH][common.MaJonCardType.CardType.TABLE][MaJonCardType.CardModel.model2d] = cc.p(32.9, 21.8);

            //=========================3D=======================

            //东
            poss[common.MaJonCardType.CardDirection.EAST][common.MaJonCardType.CardType.HAND][MaJonCardType.CardModel.model3d] = cc.p(0, 10);          //用不到
            poss[common.MaJonCardType.CardDirection.EAST][common.MaJonCardType.CardType.DISCARD][MaJonCardType.CardModel.model3d] = cc.p(-14.5, -1);   //用不到
            poss[common.MaJonCardType.CardDirection.EAST][common.MaJonCardType.CardType.PILAI][MaJonCardType.CardModel.model3d] = cc.p(47.6, 42.2);
            poss[common.MaJonCardType.CardDirection.EAST][common.MaJonCardType.CardType.MELD][MaJonCardType.CardModel.model3d] =
                poss[common.MaJonCardType.CardDirection.EAST][common.MaJonCardType.CardType.TABLE][MaJonCardType.CardModel.model3d] = cc.p(49, 42);
            poss[common.MaJonCardType.CardDirection.EAST][common.MaJonCardType.CardType.HEAP][MaJonCardType.CardModel.model3d] = cc.p(0, 0);

            //西
            poss[common.MaJonCardType.CardDirection.WEST][common.MaJonCardType.CardType.HAND][MaJonCardType.CardModel.model3d] = cc.p(0, 10);        //用不到
            poss[common.MaJonCardType.CardDirection.WEST][common.MaJonCardType.CardType.DISCARD][MaJonCardType.CardModel.model3d] = cc.p(22.5, -2);  //用不到
            poss[common.MaJonCardType.CardDirection.WEST][common.MaJonCardType.CardType.PILAI][MaJonCardType.CardModel.model3d] = cc.p(13, 28.4);
            poss[common.MaJonCardType.CardDirection.WEST][common.MaJonCardType.CardType.MELD][MaJonCardType.CardModel.model3d] =
                poss[common.MaJonCardType.CardDirection.WEST][common.MaJonCardType.CardType.TABLE][MaJonCardType.CardModel.model3d] = cc.p(11.65, 23.44);
            poss[common.MaJonCardType.CardDirection.WEST][common.MaJonCardType.CardType.HEAP][MaJonCardType.CardModel.model3d] = cc.p(0, 0);

            //南  //mine
            poss[common.MaJonCardType.CardDirection.SOUTH][common.MaJonCardType.CardType.HAND][MaJonCardType.CardModel.model3d] = cc.p(68.5, 21);
            poss[common.MaJonCardType.CardDirection.SOUTH][common.MaJonCardType.CardType.DISCARD][MaJonCardType.CardModel.model3d] = cc.p(15, -12); //用不到
            poss[common.MaJonCardType.CardDirection.SOUTH][common.MaJonCardType.CardType.PILAI][MaJonCardType.CardModel.model3d] = cc.p(33.3, 26);  //
            poss[common.MaJonCardType.CardDirection.SOUTH][common.MaJonCardType.CardType.MELD][MaJonCardType.CardModel.model3d] =
                poss[common.MaJonCardType.CardDirection.SOUTH][common.MaJonCardType.CardType.TABLE][MaJonCardType.CardModel.model3d] = cc.p(52.3, 36.2);
            poss[common.MaJonCardType.CardDirection.SOUTH][common.MaJonCardType.CardType.HEAP][MaJonCardType.CardModel.model3d] = cc.p(0, 0);

            //北
            poss[common.MaJonCardType.CardDirection.NORTH][common.MaJonCardType.CardType.HAND][MaJonCardType.CardModel.model3d] = cc.p(0, 7);    //用不到
            poss[common.MaJonCardType.CardDirection.NORTH][common.MaJonCardType.CardType.DISCARD][MaJonCardType.CardModel.model3d] = cc.p(15, -12); //用不到
            poss[common.MaJonCardType.CardDirection.NORTH][common.MaJonCardType.CardType.PILAI][MaJonCardType.CardModel.model3d] = cc.p(29, 26.3);
            poss[common.MaJonCardType.CardDirection.NORTH][common.MaJonCardType.CardType.MELD][MaJonCardType.CardModel.model3d] =
                poss[common.MaJonCardType.CardDirection.NORTH][common.MaJonCardType.CardType.TABLE][MaJonCardType.CardModel.model3d] = cc.p(5.65, 49.44);
            poss[common.MaJonCardType.CardDirection.NORTH][common.MaJonCardType.CardType.HEAP][MaJonCardType.CardModel.model3d] = cc.p(0, 0);

            return poss;
        })()
    }
}