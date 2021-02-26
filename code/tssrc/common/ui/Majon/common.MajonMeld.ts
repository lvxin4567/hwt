namespace common {

    export interface MeldCell {
        type: MeldType,
        nums: Array<number>
        mask?: OperateMask
        wOperateUser?: number
        wProvideUser?: number
    }

    export enum MeldType {
        NULL,
        LEFTCHI,
        CENTERCHI,
        RIGHTCHI,
        PENG,
        GANG,
        ANGANG,
        PILAIGANG,
        BUGANG,
        CHAOGANG,
        LIANGDAO,
    }

    //动作掩码
    export enum OperateMask {
        WIK_NULL = 0x00,							//没有类型
        WIK_LEFT = 0x01,						//左吃类型
        WIK_CENTER = 0x02,							//中吃类型
        WIK_RIGHT = 0x04,						//右吃类型
        WIK_PENG = 0x08,							//碰牌类型
        WIK_FILL = 0x10,								//补牌类型
        WIK_GANG = 0x20,							//杠牌类型
        WIK_CHI_HU = 0x40,							//吃胡类型
        WIK_QIANG = 0x80,                          //报抢类型
        WIK_BAO_QING = 0x100,                      //报清类型
        WIK_TING = 0x200,                       //报听类型
        WIK_HUA = 0x400,                          //花牌
        WIK_FENG = 0x800,                       //报风
        WIK_JIANG = 0x1000,                     //报将
        WIK_LIANG = 0x4000,                     //亮牌
    }

    export class MajionMeld<game_MaJonCard extends common.MaJonCard> extends kaayou.Block {
        protected _cards: Array<game_MaJonCard> = null;
        protected _meldType: MeldType = MeldType.NULL;

        protected _cardNums: Array<number> = null;

        protected _meldInfo: Array<rowInfo> = null;
        _isangangback = false;
        constructor(isangangback = false) {
            super();
            this._isangangback = isangangback;
            this._cards = [];
            this._cardNums = [];
        }

        initWithInfo(d: Array<rowInfo>) {
            if (!d) return;
            this._meldInfo = d;
            for (let i = 0; i < d.length; i++) {
                var card: game_MaJonCard = eval("new " + MaJonCard.gameName + ".MaJonCard()");
                card.doSetInfo(d[i]);
                this._cards.push(card);
                this.addChild(card);
            }
        }

        cleanUp() {
            this._cardNums = [];
            for (let i = 0; i < this._cards.length; i++) {
                this._cards[i].arrow.setVisible(false);
            }
        }

        setMeld(type: MeldType, nums: Array<number>) {
            this._cardNums = nums;
            this._meldType = type;

            if (this._meldType == MeldType.NULL) {
                this.visible = false;
                return;
            }

            this.visible = true;

            for (var x in this._cards) {
                let card = this._cards[x];

                if (Number(x) > this._cardNums.length) {
                    card.visible = false;
                } else {
                    card.visible = true;
                }
                if (!this._cards[x].visible) {
                    continue;
                }

                if (this._cardNums[x] > 0) {
                    card.InnerNum = this._cardNums[x];
                    card.Cover = false;
                    card.doChangeCard();
                } else {
                    card.visible = false;
                }

                //为朝天杠的时候，显示第一张和第三张背牌
                if (this._meldType == MeldType.CHAOGANG) {
                    if (Number(x) == 0 || Number(x) == 2) {
                        card.Cover = true;
                    } else {
                        card.Cover = false;
                    }
                    //背牌不显示朝
                    // card.changeLaiPi();
                    card.doChangeCard();
                    //正面也不显示朝
                    card.image_pilai.visible = false;
                }

                //如果为朝天杠则不return
                if (this._cardNums.length < 4 && (this._meldType == MeldType.GANG || this._meldType == MeldType.ANGANG)) {
                    return;
                }

                if (this._meldType == MeldType.ANGANG) {
                    if (Number(x) < 3) {
                        card.Cover = true;
                    } else {
                        card.Cover = false;

                        if (this._isangangback) {
                            if (card.carddirection == MaJonCardType.CardDirection.SOUTH) {
                                card.Cover = false;
                            } else {
                                card.Cover = true;
                            }
                        }
                    }
                    // card.changeLaiPi();
                    card.doChangeCard();
                }

                //最后一张牌的显示问题
                let lastCard = this._cards[3];
                if (this._meldType == MeldType.LEFTCHI || this._meldType == MeldType.PENG ||
                    this._meldType == MeldType.RIGHTCHI || this._meldType == MeldType.CENTERCHI || this._meldType == MeldType.CHAOGANG) {
                    lastCard.visible = false;
                } else {
                    lastCard.visible = true;
                }
            }

        }

        showArrow(index: number, outIndex: number) {
            let card: MaJonCard = null;
            if (this._meldType == MeldType.PENG || this._meldType == MeldType.CENTERCHI || this._meldType == MeldType.CHAOGANG) {
                card = this._cards[1];
            } else if (this._meldType == MeldType.RIGHTCHI) {
                card = this._cards[2];
            } else if (this._meldType == MeldType.LEFTCHI) {
                card = this._cards[0];
            } else if (this._meldType == MeldType.BUGANG || this._meldType == MeldType.ANGANG || this._meldType == MeldType.GANG) {
                card = this._cards[3];
            }
            //如果是补杠(续杠)，隐藏之前的箭头
            if (this._meldType == MeldType.BUGANG) {
                for (let i = 0; i < this.getChildrenCount(); i++) {
                    let c = <MaJonCard>this.getChildren()[i];
                    c.changeArrow(index, outIndex, false);
                }
            }
            if (card) {
                card.changeArrow(index, outIndex, true, this._meldType);
            }
        }

        getMeld() {
            return this._cardNums;
        }

        getMeldType() {
            return this._meldType;
        }

        getMeldNode() {
            return this._cards;
        }

        getMeldInfo() {
            return this._meldInfo;
        }
    }
}