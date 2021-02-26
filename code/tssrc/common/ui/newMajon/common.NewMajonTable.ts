namespace common {

    export abstract class NewMajonTable<game_MaJonCard extends NewMaJonCard> extends kaayou.Layer {

        meldRow: { [key: string]: NewMajioMeldRow<game_MaJonCard> } = null;
        handRow: { [key: string]: NewMajonRow<game_MaJonCard> } = null;
        tableRow: { [key: string]: NewMajonRow<game_MaJonCard> } = null;
        discardRow: { [key: string]: NewMajonRow<game_MaJonCard> } = null;
        pilaiRow: { [key: string]: NewMajonRow<game_MaJonCard> } = null;
        heapRow: { [key: string]: NewMajonRow<game_MaJonCard> } = null;
        chupaiArr: Array<MjPosInfo> = [];
        abstract setTableCell(cardposInfos: MjposinfoGroup): void;
        abstract createHeapRow(cardposInfos: MjposinfoGroup): void;

        constructor(mjRes: string, mjInfo: string, gameName: string, model: MaJonCardType.CardModel) {
            super();
            MaJonCard.res_prefix = mjRes;
            MaJonCard.gameName = gameName;
            MaJonCard.cardModel = model;

            this.meldRow = {};
            this.handRow = {};
            this.tableRow = {};
            this.discardRow = {};
            this.pilaiRow = {};
            this.heapRow = {};

            var cardposInfos: MjposinfoGroup = this.parseInfo(mjInfo);
            this.setTableCell(cardposInfos);
        }

        changeMajonModel(mjInfo: string, mjRes: string, model: MaJonCardType.CardModel) {
            MaJonCard.res_prefix = mjRes;
            MaJonCard.cardModel = model;
            var cardposInfos: MjposinfoGroup = this.parseInfo(mjInfo);

            //如果初始是2d   3d rowinfo是没被初始化的 
            if (MaJonCard.cardModel == MaJonCardType.CardModel.model3d && !this.heapRow[0]) {
                this.createHeapRow(cardposInfos)
            }

            for (var x in cardposInfos) {
                this.handRow[x].setRowinfo(cardposInfos[x].hand);
                this.discardRow[x].setRowinfo(cardposInfos[x].discard);
                this.tableRow[x].setRowinfo(cardposInfos[x].table);
                this.meldRow[x].setRowinfo(cardposInfos[x].gang);
                this.pilaiRow[x].setRowinfo(cardposInfos[x].pilai);
                if (!this.heapRow[x]) continue;
                this.heapRow[x].setVisible(MaJonCard.cardModel == MaJonCardType.CardModel.model3d);
                if (MaJonCard.cardModel != MaJonCardType.CardModel.model3d) {
                    continue;
                }
                this.heapRow[x].setRowinfo(cardposInfos[x].heap);
            }
        }

        ReEnter(mjRes: string, gameName: string, model: MaJonCardType.CardModel) {
            MaJonCard.res_prefix = mjRes;
            MaJonCard.gameName = gameName;
            MaJonCard.cardModel = model;
        }

        initTable() {
            for (let i = 0; i < 4; i++) {
                this.tableRow[i].setCardNums([]);
                this.discardRow[i].setCardNums([]);
                this.pilaiRow[i].setCardNums([]);
                this.handRow[i].setCardNums([]);
                this.meldRow[i].setMeldNums([]);
                if (!this.heapRow[i]) continue;
                // 修复在3D模式下发完牌后退出游戏，先进入回放再重新进入游戏时，上局牌堆会没清的问题，因为进入回放后cardModel会被设置为0
                // if (MaJonCard.cardModel != MaJonCardType.CardModel.model3d) {
                //     continue;
                // }
                this.heapRow[i].setCardNums([]);
            }
        }

        parseInfo(url: string): MjposinfoGroup {
            let MajonCardPos = cc.loader.getRes(url).root.ele;
            let cardInfos: any = {
                "0": {},  //南
                "1": {},   //东
                "2": {},   //北
                "3": {},   //西
            };
            for (var i = 0; i < MajonCardPos.length; i++) {
                let scale = MajonCardPos[i].scale;
                if (!scale) {
                    scale = 1;
                }
                let info: MjPosInfo = {
                    "direction": MajonCardPos[i].direction,
                    "type": MajonCardPos[i].type,
                    "kaikou": Number(MajonCardPos[i].kaikou),
                    "index": Number(MajonCardPos[i].index),
                    "pic": MajonCardPos[i].pic,
                    "posx": Number(MajonCardPos[i].posx),
                    "posy": Number(MajonCardPos[i].posy),
                    "zOrder": Number(MajonCardPos[i].zOrder),
                    "flowerPosx": Number(MajonCardPos[i].flowerPosx),
                    "flowerPosy": Number(MajonCardPos[i].flowerPosy),
                    "flowerScale": Number(MajonCardPos[i].flowerScale),
                    "flowerRotation": Number(MajonCardPos[i].flowerRotation),
                    "scale": scale,
                    "flowerPic": MajonCardPos[i].flowerPic
                };
                let index = this.getIndexByDiection(MajonCardPos[i].direction);
                let type = MajonCardPos[i].type;
                if (!cardInfos[index][type]) {
                    cardInfos[index][type] = [];
                }
                if (type == 'gang') {
                    let kaikou = info.kaikou;
                    if (!cardInfos[index][type][kaikou]) {
                        cardInfos[index][type][kaikou] = [];
                    }
                    cardInfos[index][type][kaikou][info.index] = (info);
                } else {
                    cardInfos[index][type][info.index] = (info);
                }
                if (type == 'chupai') {
                    this.chupaiArr[index] = info;
                }
            }
            console.log(cardInfos);
            return cardInfos;
        }

        getIndexByDiection(direction): number {
            let arr = ['south', 'east', 'north', 'west'];
            return arr.indexOf(direction);
        }
    }



}