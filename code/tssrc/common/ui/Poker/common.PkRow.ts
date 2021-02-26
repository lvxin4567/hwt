
namespace common {
    const { BindEvent, doBindEvent } = kaayou._decorator;

    export abstract class PkRow extends kaayou.Layer {
        _chickennum: number = 0;
        _lainum: number = 0;
        _isteamcard: boolean = false;

        allWidth: number = 0;

        _nums: Array<number> = null;

        constructor() {
            super();
            //初始化界面
            this._chickennum = -1;
            this._lainum = -1;
            this._isteamcard = false;
            this['isTouch'] = true;
        }

        cleanUp() {
            this._chickennum = 0;
            this._isteamcard = false;
            this.setNums([]);
        }


        setChicken(_num: number) {
            this._chickennum = _num;
        }
        setLai(_num: number) {
            this._lainum = _num;
        }
        setIsTeamCard(b: boolean) {
            this._isteamcard = b;
        }

        cardWidth: number = 0;
        cardHeight: number = 0;

        difx: number = 0;

        setNums(nums: Array<number>) {
            this._nums = nums;

            kaayou.pool.putAllChildrenInPool(this);
            if (this._nums.length < 1) { return; }
            //let cardWidth = this.cardWidth;
            //let cardHeight = this.cardHeight;
            for (var x in nums) {
                let card: PkCard = this.createCard(Number(nums[x]));
                this.cardWidth = card.width;
                this.cardHeight = card.height;
                this.addChild(card);
            }

            //手牌右边可以超出
            this.difx = (cc.director.getWinSize().width + 60 - this.cardWidth) / ((this._nums.length - 1) * this.cardWidth);
            this.difx = this.difx > 0.35 ? 0.35 : this.difx;
            let allWidth = (this._nums.length - 1) * this.cardWidth * this.difx + this.cardWidth;
            this.allWidth = allWidth;
            this.width = allWidth;
            this.height = this.cardHeight;
            let offset = allWidth * (-this.anchorX) + this.cardWidth * this.difx * (1 + this.children[0].anchorX);//(allWidth / 2 - cardWidth / 2) * -1;
            // if (this.anchorX == 0) {
            //     offset = cardWidth * this.difx * 1.5;
            // }
            // if (this.anchorX == 1) {
            //     offset = allWidth * -1 + cardWidth * this.difx * 1.5;
            // }
            for (var x in this.children) {
                this.children[x].x = offset;
                this.children[x].y = this.cardHeight * (this.children[x].anchorY - this.anchorY);
                this.children[x]["originY"] = this.children[x].y;
                this.children[x].zIndex = Number(x);
                offset += this.cardWidth * this.difx;
            }
        }
        getNums() {
            return this._nums;
        }
        //获取点数
        getPoint(num) {
            let tempNUm = num - 1;
            let numPt = tempNUm % 13;
            numPt++;
            return numPt;
        }
        dealCard(nums: Array<number>, call: Function = null) {
            this.setNums(nums);
            if (this.children.length < 1) { return; }
            
            for (var x in this.children) {
                let offset = this.children[x].x;
                this.children[x].x = 0;
                // this.children[x].stopAllActions();
                this.children[x].runAction(cc.moveTo(0.5, offset, this.children[x]["originY"]));
            }
            if (call) {
                //TODO this.scheduleOnce(call,0.5);
            }
        }
        dealCard2(nums: Array<number>) {
            // this._nums = nums;
            let i = 0;
            let self = this;
            let func = function () {
                self.setNums(nums.slice(0, i));
                i++;
                if (i > nums.length) { return; }
                setTimeout(() => {
                    func();
                }, 100);
            }
            func();
        }

        abstract createCard(innerNum: number): PkCard;
        
        setPreSel(indexs: Array<number>) {

            for (var x in this.children) {
                if (indexs.indexOf(Number(x)) > -1) {
                    let card: PkCard = <PkCard>this.children[x];
                    card.setPreSelecte(true);
                } else {
                    let card: PkCard = <PkCard>this.children[x];
                    card.setPreSelecte(false);
                }
            }

        }
        getSelectCards(): Array<number> {
            let arr = [];
            for (var x in this.children) {
                let card: PkCard = <PkCard>this.children[x];
                if (card.isSelecte()) {
                    arr.push(card.getInnerNum());
                }
            }
            return arr;
        }
        getSelectCardIndex(): Array<number> {
            let arr = [];
            for (var x in this.children) {
                let card: PkCard = <PkCard>this.children[x];
                if (card.isSelecte()) {
                    arr.push(Number(x));
                }
            }
            return arr;
        }
        getPreAndSelectCards(): Array<number> {
            let arr = [];
            for (var x in this.children) {
                let card: PkCard = <PkCard>this.children[x];
                if (card.isSelecte() || card.isPreSelecte()) {
                    arr.push(card.getInnerNum());
                }
            }
            return arr;
        }
        setPreAndSelectCardsVisible(b: boolean) {
            for (var x in this.children) {
                let card: PkCard = <PkCard>this.children[x];
                if (card.isSelecte() || card.isPreSelecte()) {
                    card.setVisible(b);
                }
            }
        }
        
        hitCards(pos: cc.Point) {
            if (!cc.rectContainsPoint(this.getBoundingBoxToWorld(), pos)) {
                return -1;
            }
            // for (var x in this.children) {
            //     let rect = this.children[x].getBoundingBoxToWorld();
            //     if (Number(x) < this.children.length - 1) {
            //         rect.width -= rect.width * 0.66;
            //     }

            //     if (true == this.children[x].visible && cc.rectContainsPoint(rect, pos)) {
            //         return Number(x);
            //     }
            // }
            for (let x = this.children.length - 1; x >= 0; x--) {
                let rect = this.children[x].getBoundingBoxToWorld();

                if (true == this.children[x].visible && cc.rectContainsPoint(rect, pos)) {
                    return Number(x);
                }
            }
            return -1;
        }

        openCard(index) {
            let nums = this.getNums().length;
            if (nums <= 18) return;
            let acount = 0;
            for (let i = 0; i < nums; i++) {
                if (Math.abs(index - i) <= 2) {
                    acount++;
                }
            }
            if (index >= nums - 3) {
                acount--;
            }
            let allWidth = this.allWidth;
            let difxnum = this.difx;
            let offset = (allWidth / 2 - this.cardWidth / 2) * -1;

            cc.log('acount ', allWidth, acount);
            //putong pai jianju
            let newdifxnum = (allWidth - this.cardWidth - (acount * this.cardWidth * 1.6 * difxnum)) / ((nums - 1 - acount) * this.cardWidth);
            newdifxnum = newdifxnum > 0.35 ? 0.35 : newdifxnum;

            let aa = this.cardWidth + (nums - 1 - acount) * this.cardWidth * newdifxnum + acount * this.cardWidth * difxnum * 1.6;

            cc.log('acount', aa, difxnum);

            for (let i = 0; i < nums; i++) {
                let card: PkCard = <PkCard>this.children[i];
                let originY: number = card["originY"];
                if (card.isSelecte()) {
                    card.runAction(cc.moveTo(0.1, cc.p(offset, originY + 30)));
                } else {
                    card.runAction(cc.moveTo(0.1, cc.p(offset, originY)));
                }
                if (Math.abs(index - i) <= 2) {
                    offset += this.cardWidth * difxnum * 1.6;
                } else {
                    offset += this.cardWidth * newdifxnum;
                }
            }
        }


        setCardSelect(index: number, v: boolean = false) {
            (<PkCard>this.children[index]).setSelecte(v);
            this.children[index].setPositionY(v ? this.children[index]["originY"] + 30 : this.children[index]["originY"]);
        }
        setAllNoSelect() {
            this.setNums(this._nums);
            for (var i = 0; i < this.children.length; i++) {
                (<PkCard>this.children[i]).setSelecte(false);
                this.children[i].setPositionY(this.children[i]["originY"]);
            }
        }
        public getCardByIndex(index: number): PkCard {
            if (!this.children[index]) return null;
            return <PkCard>this.children[index];
        }
    }
}
