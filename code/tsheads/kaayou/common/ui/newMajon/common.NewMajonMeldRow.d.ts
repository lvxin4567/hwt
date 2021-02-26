declare namespace common {
    abstract class NewMajioMeldRow<game_MaJonCard extends NewMaJonCard> extends kaayou.Layer {
        protected _melds: Array<NewMajioMeld<game_MaJonCard>>;
        constructor();
        initWithInfo(d: any): void;
        setRowinfo(info: Array<Array<MjPosInfo>>): void;
        setMeldNums(data: Array<MeldCell>): void;
        getMeldNums(): NewMajioMeld<game_MaJonCard>[];
    }
}
