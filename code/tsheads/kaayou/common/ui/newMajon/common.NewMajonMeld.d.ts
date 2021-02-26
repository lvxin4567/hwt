declare namespace common {
    abstract class NewMajioMeld<game_MaJonCard extends NewMaJonCard> extends kaayou.Block {
        protected _cards: Array<game_MaJonCard>;
        protected _meldType: MeldType;
        protected _cardNums: Array<number>;
        protected _meldInfo: Array<MjPosInfo>;
        protected _isangangback: boolean;
        constructor();
        initWithInfo(d: Array<common.MjPosInfo>): void;
        setIsAngangBack(isback: boolean): void;
        cleanUp(): void;
        setMeldInfo(info: Array<MjPosInfo>): void;
        setMeld(type: MeldType, nums: Array<number>): void;
        showArrow(index: number, outIndex: number): void;
        getMeld(): number[];
        getMeldType(): MeldType;
        getMeldNode(): game_MaJonCard[];
        getMeldInfo(): MjPosInfo[];
    }
}
