namespace common {
    export interface rowInfo {
        'direction': string,
        'type': string,
        'flowerPosx': number,
        'flowerPosy': number,
        'flowerRotation': number,
        'flowerScale': number,
        'pic': string,
        'posx'?: number,
        'posy'?: number,
        'zOrder': number,
        "kaikou": number,
        "index": number,
        "flowerPic" ?: string,
        'scale'?:number
    }

    export class MaJonRow<game_MaJonCard extends common.MaJonCard> extends kaayou.Layer {
        constructor() {
            super();
        }
        private _info: Array<rowInfo> = null;
        private _MjCardSps: Array<game_MaJonCard> = null;
        private _cardNums: Array<number> = [];
        initWithInfo(d) {
            if (!d) { return; }
            this._MjCardSps = [];
            this.setContentSize(cc.view.getDesignResolutionSize());
            for (var i = 0; i < d.length; i++) {
                // var sp = new common.MaJonCard();
                var sp = eval("new " + MaJonCard.gameName + ".MaJonCard()");
                this.addChild(sp);
                this._MjCardSps.push(sp);
            }
            this._info = d;
            this.initRowInfo();
        }
        initRowInfo(){
            let children = this._MjCardSps;
            for (let x = 0; x < children.length; x++) {
                let _mjCard = children[x];
                _mjCard.doSetInfo(this._info[x]);
                _mjCard.setVisible(false);
            }
        }
        changeAllCard() {
            if (this._cardNums.length == 0) {
                this.setVisible(false);
                return;
            }
            this.setVisible(true);
            let children = this._MjCardSps;
            for (let x = 0; x < children.length; x++) {
                let _mjCard = children[x];
                if (x >= this._cardNums.length || this._cardNums[x] < 0) {
                    _mjCard.setVisible(false);
                } else {
                    _mjCard.setVisible(true);
                }
                _mjCard.InnerNum = this._cardNums[x];
                _mjCard.doChangeCard();
            }
        }
        setCardSelect(index: number, v: boolean = false) {
            if (this._MjCardSps == null) { return; }
            if (this._MjCardSps.length < 1) { return; }
            for (var x in this._MjCardSps) {
                this._MjCardSps[x].setSelecte(false);
            }
            if (index > -1 && index < this._MjCardSps.length) {
                this._MjCardSps[index].setSelecte(true);
            }
            this.changeAllCard();
        }
        // 0代表别人的牌，看不见，要创建  -1代表已经操作过的牌
        setCardNums(nums: Array<number>) {
            this._cardNums = nums;
            if (nums.length == 0) {
                this.setVisible(false);
                return;
            }
            this.setVisible(true);
            this.setCardSelect(-1, false);//出完牌的时候重置状态
        }

        hitCards(pos: cc.Point) {
            if (!cc.rectContainsPoint(this.getBoundingBox(), pos)) {
                return -1;
            }
            for (var x in this.children) {
                let rect = this.children[x].getBoundingBox();
                if (true == this.children[x].visible && cc.rectContainsPoint(rect, pos)) {
                    return Number(x);
                }
            }
            return -1;
        }

        getCardByIndex(index: number): MaJonCard {
            return this._MjCardSps[index];
        }

        getLastIndex() {
            return this._cardNums.length - 1;
        }

        getCardNums(): Array<number> {
            return this._cardNums;
        }

        getRowinfo(): Array<rowInfo> {
            return this._info;
        }

        setCover(v: boolean, len?: number) {
            let rowLen = this._MjCardSps.length;
            if(len != null){
                rowLen = len;
            }
            this.setVisible(true);
            for (let i = 0; i < this._MjCardSps.length; i++) {
                if( i > rowLen - 1) {
                    this._MjCardSps[i].setVisible(false);
                    continue;
                }
                this._MjCardSps[i].setVisible(true);
                this._MjCardSps[i].setCover(v);
            }
        }

        setRowCover(nums: Array<number>){
            let len = nums.length
            if(len < 0)return;
            for(let i = 0; i < this._MjCardSps.length ; i++){
                this._MjCardSps[i].setVisible(i <= len-1);
                if(i <= len-1){
                    this._MjCardSps[i].setCover(true);
                }
            }
        }


    }

}