namespace common {
    export class Chip extends kaayou.ImageView {

        _innerNum: number = 0;
        _bgurl: string = "";

        chipFont: ccui.Text = null;

        constructor(bet:number,bgUrl:string) {
            super();
            this.chipFont = new ccui.Text(this._innerNum.toString(), "", 15);
            this.chipFont.setColor(cc.color(0,0,0,255))
            this.addChild(this.chipFont);
            this.initUi(bet,bgUrl);
        }

        get InnerNum() {
            return this._innerNum;
        }
        set InnerNum(value: number) {
            if (this._innerNum != value) {
                this._innerNum = value;
                this.changeChip();
            }
        }

        get BgUrl() {
            return this._bgurl;
        }
        set BgUrl(value: string) {
            if (this._bgurl != value) {
                this._bgurl = value;
                this.changeChip();
            }
        }

        initUi(bet: number, bgUrl: string) {
            this._innerNum = bet;
            this._bgurl = bgUrl;
            this.changeChip();
        }

        unuse() {
            console.log('unuse');
            this.reset();
            this.removeFromParent();
        }


        changeChip() {
            this.loadTexture(this._bgurl, ccui.Widget.PLIST_TEXTURE);
            this.chipFont.setString(kaayou.Identify.changeScoreToSortString(this._innerNum));
            this.chipFont.setPosition(this.width / 2, this.height / 2 + 4);
        }

        reset() {
            this._innerNum = 0;
            this._bgurl = "";
        }
    }

}