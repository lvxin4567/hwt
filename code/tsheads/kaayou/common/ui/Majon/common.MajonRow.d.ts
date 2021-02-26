declare namespace common {
    interface rowInfo {
        'direction': string;
        'type': string;
        'flowerPosx': number;
        'flowerPosy': number;
        'flowerRotation': number;
        'flowerScale': number;
        'pic': string;
        'posx'?: number;
        'posy'?: number;
        'zOrder': number;
        "kaikou": number;
        "index": number;
        "flowerPic"?: string;
        'scale'?: number;
    }
    class MaJonRow<game_MaJonCard extends common.MaJonCard> extends kaayou.Layer {
        constructor();
        private _info;
        private _MjCardSps;
        private _cardNums;
        initWithInfo(d: any): void;
        initRowInfo(): void;
        changeAllCard(): void;
        setCardSelect(index: number, v?: boolean): void;
        setCardNums(nums: Array<number>): void;
        hitCards(pos: cc.Point): number;
        getCardByIndex(index: number): MaJonCard;
        getLastIndex(): number;
        getCardNums(): Array<number>;
        getRowinfo(): Array<rowInfo>;
        setCover(v: boolean, len?: number): void;
        setRowCover(nums: Array<number>): void;
    }
}
