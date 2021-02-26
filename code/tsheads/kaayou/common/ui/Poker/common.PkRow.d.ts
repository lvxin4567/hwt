declare namespace common {
    abstract class PkRow extends kaayou.Layer {
        _chickennum: number;
        _lainum: number;
        _isteamcard: boolean;
        allWidth: number;
        _nums: Array<number>;
        constructor();
        cleanUp(): void;
        setChicken(_num: number): void;
        setLai(_num: number): void;
        setIsTeamCard(b: boolean): void;
        cardWidth: number;
        cardHeight: number;
        difx: number;
        setNums(nums: Array<number>): void;
        getNums(): number[];
        getPoint(num: any): number;
        dealCard(nums: Array<number>, call?: Function): void;
        dealCard2(nums: Array<number>): void;
        abstract createCard(innerNum: number): PkCard;
        setPreSel(indexs: Array<number>): void;
        getSelectCards(): Array<number>;
        getSelectCardIndex(): Array<number>;
        getPreAndSelectCards(): Array<number>;
        setPreAndSelectCardsVisible(b: boolean): void;
        hitCards(pos: cc.Point): number;
        openCard(index: any): void;
        setCardSelect(index: number, v?: boolean): void;
        setAllNoSelect(): void;
        getCardByIndex(index: number): PkCard;
    }
}
