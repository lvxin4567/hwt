
namespace common {
    const { BindEvent, doBindEvent } = kaayou._decorator;

    export enum CardTag {
        TAG_CHICKEN_LOGO = 1,       //明鸡
        TAG_LAI_LOGO,               //赖子
        TAG_TEAMCARDMASK,           //队友牌遮罩
    }

    export abstract class PkCard extends kaayou.ImageView {
        _cardType: string;
        _cardSize: cc.Size;

        _innerNum: number = -1;
        getInnerNum() {
            return this._innerNum;
        }
        setInnerNum(value: number) {
            if (this._innerNum != value) {
                this._innerNum = value;
                this.changeCard();
            }
        }

        static HuaMap = ['a', 'b', 'c', 'd', 'e'];

        constructor() {
            super();
            this._cardType = "PokerBigCard01_";
            this._cardSize = cc.rect(0, 0, 138, 192);

            //初始化界面
            this.initUI();
        }

        unuse() {
            this.initUI();
            this.removeFromParent();
        }

        initUI() {
            this.setPreSelecte(false);
            this._innerNum = -1;
            this.reset();
        }

        reset() {
            this._innerNum = -1;
            this.changeCard();
            this.width = this._cardSize.width;
            this.height = this._cardSize.height;
            this.setPreSelecte(false);
            this.setSelecte(false);
            this.setPositionY(0);
            this.setScale(1);
            this.opacity = 255;
        }

        setColro(col: cc.Color) {
            this.color = col;
        }

        changeCard() {
            this.changeInner();
            this.width = this._cardSize.width;
            this.height = this._cardSize.height;
        }

        changeInner() {
            let cardTex = "";
            this.visible = true;
            if (this._innerNum < 0 || this._innerNum > 55) {//错误牌
                this.visible = false;
                return;
            }
            else if (this._innerNum < 1) {//背牌
                cardTex = `e07.png`;
            }
            else if (this._innerNum == 53) { //小王
                cardTex = `e01.png`;
            }
            else if (this._innerNum == 54) {
                cardTex = `e02.png`;
            }
            else if (this._innerNum == 55) {
                cardTex = `e03.png`;
            }
            else {
                let tempNUm = this._innerNum - 1;
                let huaPt = Math.floor(tempNUm / 13);
                if (huaPt < 0 || huaPt > 3) {//错误牌
                    this.visible = false;
                    return;
                }
                let hua = PkCard.HuaMap[huaPt];
                let numPt = tempNUm % 13;
                numPt++;
                let num = numPt < 10 ? '0' + numPt.toString() : numPt.toString();
                
                cardTex = `${hua}${num}.png`;
            }
            cardTex = this._cardType + cardTex;
            //console.log("显示扑克" + this._innerNum + ":" + cardTex);
            this.loadTexture(cardTex, ccui.Widget.PLIST_TEXTURE);
        }
        setSelecte(v: boolean) {
            this['isSel'] = v;
        }
        isSelecte(): boolean {
            return this['isSel'] || false;
        }

        //获取是否选中
        setPreSelecte(v: boolean) {
            this['isPreSel'] = v;
            if (v) {
                this.setColro(cc.color(125, 125, 125));
            } else {
                this.setColro(cc.color(255, 255, 255));
            }
        }
        isPreSelecte(): boolean {
            return this['isPreSel'] || false;
        }

        setChickenLogoVisible(visible: boolean) {
            let sp: cc.Sprite = <cc.Sprite>this.getChildByTag(CardTag.TAG_CHICKEN_LOGO);
            if (sp == null && visible) {
                sp = new cc.Sprite();
                sp.initWithSpriteFrameName(this._cardType + "mask.png");
                if (sp) {
                    sp.setAnchorPoint(0, 0);
                    sp.setPosition(0, 0);
                    this.addChild(sp, CardTag.TAG_CHICKEN_LOGO, CardTag.TAG_CHICKEN_LOGO);
                }
            }

            if (sp) {
                sp.setVisible(visible);
            }
        }

        setLaiLogoVisible(visible: boolean) {
            let sp: cc.Sprite = <cc.Sprite>this.getChildByTag(CardTag.TAG_LAI_LOGO);
            if (sp == null && visible) {
                sp = new cc.Sprite();
                sp.initWithSpriteFrameName("DG.logoLai.png");
                if (sp) {
                    sp.setAnchorPoint(0.5, 0.5);
                    sp.setPosition(24, 62);
                    this.addChild(sp, CardTag.TAG_LAI_LOGO, CardTag.TAG_LAI_LOGO);
                }
            }

            if (sp) {
                sp.setVisible(visible);
            }
        }

    }
}
