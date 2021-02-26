
namespace common {

    export abstract class NewMajioMeldRow<game_MaJonCard extends NewMaJonCard> extends kaayou.Layer {
        protected _melds: Array<NewMajioMeld<game_MaJonCard>> = null;

        // abstract initWithInfo(info : Array<Array<MjPosInfo>>): void;

        constructor() {
            super();
        }

        initWithInfo(d) {
            if (!d) { return; }
            this._melds = [];
            let zoder = 100;
            let direction = d[0][0].direction;

            for (var i = 0; i < d.length; i++) {
                if(direction == "east"){
                    zoder--
                }
                let meld = eval("new " + MaJonCard.gameName + ".MajionMeld()");
                meld.initWithInfo(d[i]);
                this.addChild(meld , zoder);
                this._melds.push(meld);
            }
        }

        setRowinfo(info : Array<Array<MjPosInfo>>){
            for(var x in this._melds){
                this._melds[x].setMeldInfo(info[x]);
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