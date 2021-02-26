
namespace common {
    const { BindEvent, doBindEvent } = kaayou._decorator;

    export abstract class PkSmallRow extends kaayou.Block {

        _cardType: string;
        _chickennum: number = 0;
        _nums: Array<number> = null;
        _maxColNum: number = 0; //一行最多放多少张牌
        _horizontal: ccui.Layout.LayoutHorizontal;

        static HuaMap = ['a', 'b', 'c', 'd', 'e'];

        constructor() {
            super();
            this._cardType = "PokerSmallCard02_";
            this._horizontal = ccui.Layout.LayoutHorizontal.LEFT;
            this._maxColNum = 20;
            //初始化界面
            this.cleanUp();
        }

        cleanUp() {
            this.setNums([]);
            this._chickennum = 0;
        }

        setChicken(_num: number) {
            this._chickennum = _num;
        }

        setMaxColNum(n: number) {
            this._maxColNum = n;
        }

        setSortType(v: ccui.Layout.LayoutHorizontal) {
            this._horizontal = v;
        }

        setNums(nums: Array<number>) {
            this._nums = nums;

            this.removeAllChildren(true);
            if (this._nums.length < 1) { return; }
            for (var x in nums) {
                let smallCard: ccui.ImageView = this.createCard(nums[x]);
                this.addChild(smallCard);

                if (this._chickennum && nums[x] == this._chickennum) {
                    let spChick = ccui.ImageView.create(this._cardType + "mask.png", ccui.Widget.PLIST_TEXTURE);
                    spChick.setAnchorPoint(0, 0);
                    spChick.setPosition(0, 0);
                    smallCard.addChild(spChick);
                }
            }

            this.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Grid);
            this.setGrid(ccui.Layout.LayoutGrid_AxisDirection.HORIZONTAL);
            this.setPadding({ spacingX: -4 });
            this.setHorizontal(this._horizontal);
            this.setVertical(ccui.Layout.LayoutVertical.TOP);
            this.setGridColumn(this._maxColNum);
            this.doChildrenLayout();
        }
        
        createCard(cardnum: number): ccui.ImageView {
            let cardTex = "";
            this.visible = true;
            if (cardnum < 0 || cardnum > 55) {//错误牌
                this.visible = false;
                return;
            }
            else if (cardnum < 1) {//背牌
                cardTex = `e07.png`;
            }
            else if (cardnum == 53) { //小王
                cardTex = `e01.png`;
            }
            else if (cardnum == 54) {
                cardTex = `e02.png`;
            }
            else if (cardnum == 55) {
                cardTex = `e03.png`;
            }
            else {
                let tempNUm = cardnum - 1;
                let huaPt = Math.floor(tempNUm / 13);
                if (huaPt < 0 || huaPt > 3) {//错误牌
                    this.visible = false;
                    return;
                }
                let hua = PkSmallRow.HuaMap[huaPt];
                let numPt = tempNUm % 13;
                numPt++;
                let num = numPt < 10 ? '0' + numPt.toString() : numPt.toString();
                
                cardTex = `${hua}${num}.png`;
            }

            cardTex = this._cardType + cardTex;
            return ccui.ImageView.create(cardTex, ccui.Widget.PLIST_TEXTURE);
        }
    }
}
