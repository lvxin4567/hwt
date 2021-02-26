namespace common {

    export interface MjPosInfo {
        "direction": string,
        "type": string,
        "kaikou": number,
        "index": number,
        "pic": string,
        "posx": number,
        "posy": number,
        "zOrder": number,
        "flowerPosx": number,
        "flowerPosy": number,
        "flowerScale": number,
        "flowerRotation": number,
        "scale": number,
        "flowerPic" ?: string
    }

    export interface MjInfotype {
        "hand": Array<MjPosInfo>,
        "table": Array<MjPosInfo>,
        "gang": Array<Array<MjPosInfo>>,
        "pilai": Array<MjPosInfo>,
        "discard": Array<MjPosInfo>,
        "heap": Array<MjPosInfo>
    }
    export interface MjposinfoGroup {
        "south": MjInfotype,  //南
        "east": MjInfotype,   //东
        "north": MjInfotype,   //北
        "west": MjInfotype,   //西
    }

    export class tableLayer<game_MaJonCard extends common.MaJonCard> extends kaayou.Layer {
        meldRow: { [key: string]: MajionMeldRow<game_MaJonCard> }
        handRow: { [key: string]: MaJonRow<game_MaJonCard> } = null;
        tableRow: { [key: string]: MaJonRow<game_MaJonCard> } = null;
        discardRow: { [key: string]: MaJonRow<game_MaJonCard> } = null;
        pilaiRow: { [key: string]: MaJonRow<game_MaJonCard> } = null;
        heapRow: { [key: string]: MaJonRow<game_MaJonCard> } = null;
        chupaiArr: Array<MjPosInfo> = [];
        isangangback: boolean = false;

        constructor(mjRes: string, mjInfo: string, gameName: string, isangangback: boolean = false) {
            super();
            MaJonCard.res_prefix = mjRes;
            MaJonCard.gameName = gameName;
            this.isangangback = isangangback;
            this.setMajonModel(mjInfo, mjRes);
        }

        setMajonModel(mjInfo: string, mjRes: string) {
            this.removeAllChildren();

            MaJonCard.res_prefix = mjRes;
            var cardposInfos: MjposinfoGroup = this.parseInfo(mjInfo);
            let mjmodel = cc.sys.localStorage.getItem('majonModel_' + MaJonCard.gameName);

            this.meldRow = {};
            this.handRow = {};
            this.tableRow = {};
            this.discardRow = {};
            this.pilaiRow = {};
            this.heapRow = {};

            if (mjmodel == '1') {

                for (let x in cardposInfos) {
                    let pinfo: MjInfotype = cardposInfos[x];

                    if (Number(x) == 0) {//自家
                        //手牌
                        var m = new MaJonRow<game_MaJonCard>();
                        m.initWithInfo(pinfo.hand);
                        this.addChild(m, 10);
                        this.handRow[x] = m;

                        //手牌倒桌面牌
                        var m = new MaJonRow<game_MaJonCard>();
                        m.initWithInfo(pinfo.table);
                        this.addChild(m, 10);
                        this.tableRow[x] = m;

                        //句子
                        var r = new MajionMeldRow<game_MaJonCard>(this.isangangback);
                        r.initWithInfo(pinfo.gang);
                        this.addChild(r, 10);
                        this.meldRow[x] = r;

                        //牌堆
                        if(pinfo.heap){
                            var m = new MaJonRow<game_MaJonCard>();
                            m.initWithInfo(pinfo.heap);
                            this.addChild(m, 6);
                            this.heapRow[x] = m;
                        }

                        //打出去的牌
                        var m = new MaJonRow<game_MaJonCard>();
                        m.initWithInfo(pinfo.discard);
                        this.addChild(m, 5);
                        this.discardRow[x] = m;

                        //皮赖
                        var m = new MaJonRow<game_MaJonCard>();
                        m.initWithInfo(pinfo.pilai);
                        this.addChild(m, 5);
                        this.pilaiRow[x] = m;

                    } else if (Number(x) == 2) {//对家
                        //手牌
                        var m = new MaJonRow<game_MaJonCard>();
                        m.initWithInfo(pinfo.hand);
                        this.addChild(m, 1);
                        this.handRow[x] = m;

                        //手牌倒桌面牌
                        var m = new MaJonRow<game_MaJonCard>();
                        m.initWithInfo(pinfo.table);
                        this.addChild(m, 1);
                        this.tableRow[x] = m;

                        //句子
                        var r = new MajionMeldRow<game_MaJonCard>(this.isangangback);
                        r.initWithInfo(pinfo.gang);
                        this.addChild(r, 1);
                        this.meldRow[x] = r;

                        //牌堆
                        if(pinfo.heap){
                            var m = new MaJonRow<game_MaJonCard>();
                            m.initWithInfo(pinfo.heap);
                            this.addChild(m, 2);
                            this.heapRow[x] = m;
                        }

                        //打出去的牌
                        var m = new MaJonRow<game_MaJonCard>();
                        m.initWithInfo(pinfo.discard);
                        this.addChild(m, 3);
                        this.discardRow[x] = m;

                        //皮赖
                        var m = new MaJonRow<game_MaJonCard>();
                        m.initWithInfo(pinfo.pilai);
                        this.addChild(m, 3);
                        this.pilaiRow[x] = m;

                    } else {
                        //手牌
                        var m = new MaJonRow<game_MaJonCard>();
                        m.initWithInfo(pinfo.hand);
                        this.addChild(m, 4);
                        this.handRow[x] = m;

                        //手牌倒桌面牌
                        var m = new MaJonRow<game_MaJonCard>();
                        m.initWithInfo(pinfo.table);
                        this.addChild(m, 4);
                        this.tableRow[x] = m;

                        //句子
                        var r = new MajionMeldRow<game_MaJonCard>(this.isangangback);
                        r.initWithInfo(pinfo.gang);
                        this.addChild(r, 4);
                        this.meldRow[x] = r;

                        //牌堆
                        if(pinfo.heap){
                            var m = new MaJonRow<game_MaJonCard>();
                            m.initWithInfo(pinfo.heap);
                            this.addChild(m, 4);
                            this.heapRow[x] = m;
                        }

                        //打出去的牌
                        var m = new MaJonRow<game_MaJonCard>();
                        m.initWithInfo(pinfo.discard);
                        this.addChild(m, 4);
                        this.discardRow[x] = m;

                        //皮赖
                        var m = new MaJonRow<game_MaJonCard>();
                        m.initWithInfo(pinfo.pilai);
                        this.addChild(m, Number(x) == 1 ? 5 : 3);
                        this.pilaiRow[x] = m;

                    }

                }

            } else {
                for (var x in cardposInfos) {
                    var pinfo: MjInfotype = cardposInfos[x];

                    let zz = 0;
                    if (Number(x) == 0) {//south的牌层级比较高
                        zz = 10;
                    }

                    if (Number(x) == 1) {
                        //手牌
                        var m = new MaJonRow<game_MaJonCard>();
                        m.initWithInfo(pinfo.hand);
                        this.addChild(m, zz);
                        this.handRow[x] = m;
                        //手牌倒桌面牌
                        var m = new MaJonRow<game_MaJonCard>();
                        m.initWithInfo(pinfo.table);
                        this.addChild(m, zz);
                        this.tableRow[x] = m;
                        //句子
                        var r = new MajionMeldRow<game_MaJonCard>(this.isangangback);
                        r.initWithInfo(pinfo.gang);
                        this.addChild(r, zz);
                        this.meldRow[x] = r;

                    } else {
                        //句子
                        var r = new MajionMeldRow<game_MaJonCard>(this.isangangback);
                        r.initWithInfo(pinfo.gang);
                        this.addChild(r, zz);
                        this.meldRow[x] = r;
                        //手牌
                        var m = new MaJonRow<game_MaJonCard>();
                        m.initWithInfo(pinfo.hand);
                        this.addChild(m, zz);
                        this.handRow[x] = m;
                        //手牌倒桌面牌
                        var m = new MaJonRow<game_MaJonCard>();
                        m.initWithInfo(pinfo.table);
                        this.addChild(m, zz);
                        this.tableRow[x] = m;
                    }

                    //打出去的牌
                    var m = new MaJonRow<game_MaJonCard>();
                    m.initWithInfo(pinfo.discard);
                    this.addChild(m, zz);
                    this.discardRow[x] = m;
                    //皮赖
                    var m = new MaJonRow<game_MaJonCard>();
                    m.initWithInfo(pinfo.pilai);
                    this.addChild(m, zz);
                    this.pilaiRow[x] = m;

                }
            }

        }

        ReEnter(mjRes: string, gameName: string) {
            MaJonCard.res_prefix = mjRes;
            MaJonCard.gameName = gameName;
        }

        initTable() {
            let index = cc.sys.localStorage.getItem('majonModel_' + MaJonCard.gameName);

            for (let i = 0; i < 4; i++) {
                this.tableRow[i].setCardNums([]);
                this.discardRow[i].setCardNums([]);
                this.pilaiRow[i].setCardNums([]);
                this.handRow[i].setCardNums([]);
                this.meldRow[i].setMeldNums([]);
                if (Number(index) != 1) continue;
                if(!this.heapRow[i]) continue;
                this.heapRow[i].setCardNums([]);
            }
        }

        parseInfo(url: string): MjposinfoGroup {
            let MajonCardPos = cc.loader.getRes(url).root.ele;
            // console.log(MajonCardPos);
            // let cardInfos: any = {
            //     "south": {},  //南
            //     "east": {},   //东
            //     "north": {},   //北
            //     "west": {},   //西
            // };

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