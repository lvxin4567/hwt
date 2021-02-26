namespace common {

    export abstract class NewMajonRow<game_MaJonCard extends NewMaJonCard> extends kaayou.Layer {
        protected _info: Array<MjPosInfo> = null;
        protected _MjCardSps: Array<game_MaJonCard> = null;
        protected _cardNums: Array<number> = [];

        constructor() {
            super();
            this._MjCardSps = [];
            this._info = [];
        }

        initWithInfo(d: Array<common.MjPosInfo>) {
            if (!d) { return; }
            this._MjCardSps = [];
            this.setContentSize(cc.view.getDesignResolutionSize());
            for (var i = 0; i < d.length; i++) {
                var sp = <game_MaJonCard>eval("new " + MaJonCard.gameName + ".MaJonCard()");
                this.addChild(sp);
                this._MjCardSps.push(sp);
            }
            this._info = d;
            this.initRowInfo();
        }
        setRowinfo(info: Array<common.MjPosInfo>) {
            //当前精灵少于坐标个数
            if (this._MjCardSps.length < info.length) {
                for (let i = 0; i < info.length; i++) {
                    if (i < this._info.length) {
                        let sp = this._MjCardSps[i];
                        sp.doSetInfo(info[i]);
                        sp.setVisible(true);
                    } else {
                        let sp = <game_MaJonCard>eval("new " + MaJonCard.gameName + ".MaJonCard()");
                        sp.doSetInfo(info[i]);
                        this.addChild(sp);
                        this._MjCardSps.push(sp);
                    }
                }
            } else {
                for (let i = 0; i < this._MjCardSps.length; i++) {
                    let sp = this._MjCardSps[i];
                    sp.setEffective(i < info.length);
                    sp.setVisible(i < info.length);
                    sp.doSetInfo(info[i]);
                }
            }
            this._info = info;
            this.initRowInfo();
        }

        initRowInfo() {
            let children = this._MjCardSps;
            for (let x = 0; x < children.length; x++) {
                let _mjCard = children[x];
                _mjCard.doSetInfo(this._info[x]);

                // if(!_mjCard.getChildByTag(120)){
                //     let text = new ccui.Text(x.toString(), "Arial", 25);
                //     _mjCard.addChild(text);
                //     text.setPosition(_mjCard.width / 2, _mjCard.height / 2);
                //     text.setTextColor(cc.color(255, 0, 0, 255));
                //     text.setTag(120)
                // }

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

        // 0代表别人的牌,要创建  -1代表已经操作过的牌,看不见
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

        getCardByIndex(index: number): NewMaJonCard {
            return this._MjCardSps[index];
        }

        getLastIndex() {
            return this._cardNums.length - 1;
        }

        getCardNums(): Array<number> {
            return this._cardNums;
        }

        getRowinfo(): Array<MjPosInfo> {
            return this._info;
        }

        setCover(v: boolean, len?: number) {
            let rowLen = this._MjCardSps.length;
            if (len != null) {
                rowLen = len;
            }
            this.setVisible(true);
            for (let i = 0; i < this._MjCardSps.length; i++) {
                if (i > rowLen - 1) {
                    this._MjCardSps[i].setVisible(false);
                    continue;
                }
                this._MjCardSps[i].setVisible(true);
                this._MjCardSps[i].setCover(v);
            }
        }

        setRowCover(nums: Array<number>) {
            let len = nums.length
            if (len < 0) return;
            for (let i = 0; i < this._MjCardSps.length; i++) {
                this._MjCardSps[i].setVisible(i <= len - 1);
                if (i <= len - 1) {
                    this._MjCardSps[i].setCover(true);
                }
            }
        }
    }

}