namespace common {
    export abstract class NewMajioMeld<game_MaJonCard extends NewMaJonCard> extends kaayou.Block {
        protected _cards: Array<game_MaJonCard> = null;
        protected _meldType: MeldType = MeldType.NULL;
        protected _cardNums: Array<number> = null;
        protected _meldInfo: Array<MjPosInfo> = null;
        // abstract initWithInfo(info : Array<MjPosInfo>): void;
        protected _isangangback : boolean = false;

        constructor() {
            super();
            this._cards = [];
            this._cardNums = [];
        }

        initWithInfo(d: Array<common.MjPosInfo>) {
            if (!d) return;
            this._meldInfo = d;
            for (let i = 0; i < d.length; i++) {
                // var card = new MaJonCard();
                var card = <game_MaJonCard>eval("new " + MaJonCard.gameName + ".MaJonCard()");
                card.doSetInfo(d[i]);
                this._cards.push(card);
                this.addChild(card);
            }
        }

        setIsAngangBack(isback:boolean){
            this._isangangback = isback;
        }

        cleanUp() {
            this._cardNums = [];
            for (let i = 0; i < this._cards.length; i++) {
                this._cards[i].arrow.setVisible(false);
            }
        }

        setMeldInfo(info:Array<MjPosInfo>){
            for(var x in this._cards){
                this._cards[x].doSetInfo(info[x]);
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
            let card: NewMaJonCard = null;
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
                for(let i = 0; i < this.getChildrenCount() ; i++){
                    let c = <MaJonCard>this.getChildren()[i];
                    c.changeArrow(index,outIndex,false);
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