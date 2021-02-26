
namespace common {

    export abstract class AntiNoteCardLayer extends kaayou.Layer {

        abstract getCardRow(): PkRow;

        curRound: number = 0;
        outCardRow: Array<PkRow> = null;
        outCardNode: Array<cc.Node> = null;

        constructor(ccs: string) {
            super();
            this.initWithccs(ccs);
            this.initUI();
            this.setVisible(false);
            this.curRound = 0;
        }

        initUI() {
            let self = this;

            this.outCardRow = [];
            this.outCardNode = [];
            let outCardNodes: cc.Node = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Panel_outCards");
            outCardNodes.setContentSize(cc.winSizeCustom);
            ccui.helper.doLayout(outCardNodes);

            for (let x in outCardNodes.children) {
                let cardNode: cc.Node = outCardNodes.children[x];
                this.outCardNode.push(cardNode);
                let outCardRow: PkRow = this.getCardRow();
                outCardRow.setAnchorPoint(cardNode.getAnchorPoint());
                outCardRow.setPosition(cardNode.width * cardNode.anchorX, cardNode.height * cardNode.anchorY);
                outCardRow.dealCard([]);
                outCardRow.setTag(10);
                cardNode.addChild(outCardRow);
                this.outCardRow.push(outCardRow);
            }
        }

        RandOutCard() {
            let cards = [];
            let count = 5;
            for (let i = 0; i < count; i++) {
                let randNum = Math.floor(Math.random() * 54) + 1;
                cards.push(randNum);
            }

            return cards;
        }

        UpdateOutCard(data: { Players: Array<mod.IFriendGame_User_Info> }) {
            for (var x in this.outCardRow) {
                if (!data.Players || !data.Players[x] || Number(x) == 0) {
                    this.outCardRow[x].setNums([]);
                } else {
                    this.outCardRow[x].setNums(data.Players[x]['randCard']);
                }
            }
        }

        PlayOutCardAnim(data: { Players: Array<mod.IFriendGame_User_Info> }) {
            let self = this;
            //每个玩家随机5张手牌
            for (let i = 0; i < data.Players.length; i++) {
                if (!data.Players[i]) continue;
                data.Players[i]['randCard'] = this.RandOutCard();
            }
            let i = 1;
            let de = function () {
                i++;
                if (i > data.Players.length) {
                    setTimeout(() => {
                        self.cleanUp();
                        self.setVisible(false);
                    }, 1800);
                    return;
                }
                if (!data.Players[i-1]) {
                    de();
                    return;
                }
                self.UpdateOutCard({ Players: data.Players.slice(0, i)});
                setTimeout(() => {
                    de();
                }, 1800);
            }
            setTimeout(() => {
                de();
            }, 1800);
        }

        cleanUp() {
            this.UpdateOutCard({ Players: null});
        }

        setCurRound(curRound: number) {
            this.curRound = curRound;
        }

        //curRound：传了当前局数则每局只播放一次，不传则每次调用都播放
        Show(data: { Players: Array<mod.IFriendGame_User_Info>, curRound?: number }) {
            let self = this;
            //每小局只播一次
            if (data.curRound != undefined && this.curRound == data.curRound) { return; }
            this.curRound = data.curRound;
            self.cleanUp();
            self.setVisible(true);
            self.PlayOutCardAnim(data);
        }

        Hide() {
            this.cleanUp();
            this.setVisible(false);
        }
    }
}