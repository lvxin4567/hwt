declare namespace common {
    abstract class NewMajonTable<game_MaJonCard extends NewMaJonCard> extends kaayou.Layer {
        meldRow: {
            [key: string]: NewMajioMeldRow<game_MaJonCard>;
        };
        handRow: {
            [key: string]: NewMajonRow<game_MaJonCard>;
        };
        tableRow: {
            [key: string]: NewMajonRow<game_MaJonCard>;
        };
        discardRow: {
            [key: string]: NewMajonRow<game_MaJonCard>;
        };
        pilaiRow: {
            [key: string]: NewMajonRow<game_MaJonCard>;
        };
        heapRow: {
            [key: string]: NewMajonRow<game_MaJonCard>;
        };
        chupaiArr: Array<MjPosInfo>;
        abstract setTableCell(cardposInfos: MjposinfoGroup): void;
        abstract createHeapRow(cardposInfos: MjposinfoGroup): void;
        constructor(mjRes: string, mjInfo: string, gameName: string, model: MaJonCardType.CardModel);
        changeMajonModel(mjInfo: string, mjRes: string, model: MaJonCardType.CardModel): void;
        ReEnter(mjRes: string, gameName: string, model: MaJonCardType.CardModel): void;
        initTable(): void;
        parseInfo(url: string): MjposinfoGroup;
        getIndexByDiection(direction: any): number;
    }
}
