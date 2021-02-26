declare namespace common {
    abstract class NewMajonRow<game_MaJonCard extends NewMaJonCard> extends kaayou.Layer {
        protected _info: Array<MjPosInfo>;
        protected _MjCardSps: Array<game_MaJonCard>;
        protected _cardNums: Array<number>;
        constructor();
        initWithInfo(d: Array<common.MjPosInfo>): void;
        setRowinfo(info: Array<common.MjPosInfo>): void;
        initRowInfo(): void;
        changeAllCard(): void;
        setCardSelect(index: number, v?: boolean): void;
        setCardNums(nums: Array<number>): void;
        hitCards(pos: cc.Point): number;
        getCardByIndex(index: number): NewMaJonCard;
        getLastIndex(): number;
        getCardNums(): Array<number>;
        getRowinfo(): Array<MjPosInfo>;
        setCover(v: boolean, len?: number): void;
        setRowCover(nums: Array<number>): void;
    }
}
