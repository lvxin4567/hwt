namespace common {
    export namespace MaJonCardType {

        export enum CardColor {
            GREEN = 'lv',
            BLUE = "lan",
            YELLOW = "huang"
        }
        // /directions
        export enum CardDirection {
            SOUTH = "south",  //南
            EAST = "east",   //东
            NORTH = "north",   //北
            WEST = "west",   //西
        }

        export enum CardType {
            HAND = "hand",       //手牌
            TABLE = "table",      //桌面  ？？？？ 
            MELD = "meld",       //句子
            DISCARD = "discard",    //打出的
            PILAI = "pilai",      //皮癞
            HEAP = "heap"
        }

        export enum CardModel{
            model2d,
            model3d
        }
    }

    export abstract class MaJonCard extends kaayou.ImageView {

        static res_prefix = "";
        static cardColor = MaJonCardType.CardColor.BLUE;
        static gameName = "";
        static cardModel = MaJonCardType.CardModel.model2d;

        InnerNum: number = 0;
        flowerScale: number = 1;
        flowerRotation: number = 0;
        cardScale: number = 1;

        flowerPos: cc.Point = cc.p(0, 0);
        mjPos: cc.Point = cc.p(0, 0);

        tag2Rect: cc.Rect = null;
        carddirection: MaJonCardType.CardDirection = MaJonCardType.CardDirection.SOUTH;
        Cover: boolean = false;
        cardtype: MaJonCardType.CardType = MaJonCardType.CardType.HAND;

        isSelect: boolean = false;

        flowersp: kaayou.ImageView = null;
        arrow: ccui.ImageView = null;
        image_pilai: ccui.ImageView = null;
        tingTag: ccui.ImageView = null;
        leftCard: ccui.Text = null;

        mustRes: string = "";

        protected _cardInfo: rowInfo = null;

        abstract changeLaiPi();
        abstract arrowPositions;
        abstract arrowScale;


        constructor() {
            super();
            this.initUi();
        }

        //=======的地方必须使用2D的info=======
        // setMustMajonRes(value: rowInfo , mustRes: string , ) {
        //     this.mustRes = mustRes;
        //     // this._cardInfo2d = value;
        // }
        setMustMajonRes(mustRes: string , ) {
            this.mustRes = mustRes;
            // this._cardInfo2d = value;
        }
        //===================================

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
            } else if (type == "heap") {
                return MaJonCardType.CardType.HEAP;
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
            this.tingTag.setPosition(18.4, 81.3);
            this.addChild(this.tingTag);
            this.tingTag.setVisible(false);

            this.leftCard = new ccui.Text("", "", 18);
            this.leftCard.setPosition(19, -15.5);
            this.leftCard.setColor(cc.color(71, 220, 255));
            this.addChild(this.leftCard);
            this.leftCard.setVisible(false);
        }
        doSetInfo(value: rowInfo) {
            this.carddirection = this.getCardDirection(value.direction);
            this.cardtype = this.getCardType(value.type);
            this._cardInfo = value;
            this.setLocalZOrder(value.zOrder);
            this.mjPos = cc.p(value.posx, value.posy);
            this.setPosition(this.mjPos.x, this.mjPos.y);
            this.flowerPos = cc.p(value.flowerPosx, value.flowerPosy);
            this.flowerScale = Number(value.flowerScale);
            this.flowerRotation = Number(value.flowerRotation);
            this.arrow.setPosition(this.arrowPositions[this.carddirection]);
            this.arrow.setScale(this.arrowScale[this.carddirection]);
            if (value.scale == undefined) {
                value.scale = 1;
            }
            this.setScale(value.scale);
            if (this.cardtype == MaJonCardType.CardType.HEAP) {
                if (this.InnerNum > 0) {
                    this.Cover = false;
                } else {
                    this.Cover = true;
                }
            }
            this.doChangeCard();
        }
        doChangeCard() {
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
            if (this._cardInfo && cc.sys.localStorage.getItem('majonModel_' + MaJonCard.gameName) == "1" && this.mustRes.length == 0) {
                direction = <MaJonCardType.CardDirection>this._cardInfo.pic.split("_")[0];
                cardtype = this._cardInfo.pic.split("_")[1];
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
                console.log(`找不到麻将纹理:${bgStr}`)
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
            if (this._cardInfo && cc.sys.localStorage.getItem('majonModel_' + MaJonCard.gameName) == "1" && this.mustRes.length == 0) {
                let tmpstr = this._cardInfo.flowerPic.split("_");
                //"west_discard_tile_0_29.png"
                innerstr = `${tmpstr[0]}_${tmpstr[1]}_tile_0_${this.InnerNum.toString(16)}.png`;
            }
            let prestr = this.mustRes.length > 0 ? this.mustRes : common.MaJonCard.res_prefix;
            let flowerstr = `${prestr}.${innerstr}`;
            if (!cc.spriteFrameCache.getSpriteFrame(flowerstr)) {
                console.log(`找不到牌花纹理:${flowerstr}`);
                this.setVisible(false);
                return;
            } 

            this.flowersp.loadTexture(flowerstr, ccui.Widget.PLIST_TEXTURE);
            this.flowersp.setScale(this.flowerScale);
            this.flowersp.setRotation(this.flowerRotation);
            this.flowersp.setPosition(this.flowerPos);
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
                    this.setPosition(this.mjPos.x, this.mjPos.y + 20);
                }
            } else {
                this.setPosition(this.mjPos);
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
            // super.setColor(c);
            // this.setCascadeColorEnabled(true);
            // this.leftCard.setColor(cc.color(71, 220, 255));
            super.setColor(c);
            this.flowersp.setColor(c);
            this.arrow.setColor(c);
            this.image_pilai.setColor(c);
            this.tingTag.setColor(c);
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
    }
}