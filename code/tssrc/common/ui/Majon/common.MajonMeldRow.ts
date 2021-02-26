
/// <reference path="common.MaJonCard.ts" />
namespace common {


    export class MajionMeldRow<game_MaJonCard extends common.MaJonCard> extends kaayou.Layer {
        _isangangback = false
        constructor(isangangback = false) {
            super();
            this._isangangback = isangangback;
        }

        private _melds: Array<common.MajionMeld<game_MaJonCard>> = null;

        initWithInfo(d) {
            if (!d) { return; }
            this._melds = [];
            let zoder = 100;
            let direction = d[0][0].direction;

            for (var i = 0; i < d.length; i++) {
                if(direction == "east"){
                    zoder--
                }
                let meld = new common.MajionMeld<game_MaJonCard>( this._isangangback );
                meld.initWithInfo(d[i]);
                this.addChild(meld , zoder);
                this._melds.push(meld);
            }
        }


        setMeldNums(data: Array<MeldCell>) {
            for (var x in this._melds) {
                if (data[x]) {
                    this._melds[x].setMeld(data[x].type, data[x].nums);
                    this._melds[x].visible = true;
                    this._melds[x].showArrow(data[x].wOperateUser, data[x].wProvideUser);
                } else {
                    this._melds[x].cleanUp();
                    this._melds[x].visible = false;
                }
            }
        }

        getMeldNums(){
            return this._melds;
        }

    }

}