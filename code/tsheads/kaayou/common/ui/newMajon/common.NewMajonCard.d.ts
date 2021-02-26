declare namespace common {
    abstract class NewMaJonCard extends kaayou.ImageView {
        InnerNum: number;
        carddirection: MaJonCardType.CardDirection;
        Cover: boolean;
        cardtype: MaJonCardType.CardType;
        cardModel: MaJonCardType.CardModel;
        isSelect: boolean;
        flowersp: kaayou.ImageView;
        arrow: ccui.ImageView;
        image_pilai: ccui.ImageView;
        tingTag: ccui.ImageView;
        leftCard: ccui.Text;
        mustRes: string;
        isEffective: boolean;
        protected _cardInfo: MjPosInfo;
        abstract changeLaiPi(): any;
        constructor();
        setMustMajonRes(mustRes: string): void;
        setEffective(effective: boolean): void;
        static getCardColor(index: number): MaJonCardType.CardColor;
        getCardDirection(direction: string): MaJonCardType.CardDirection;
        getCardType(type: string): MaJonCardType.CardType;
        initUi(): void;
        doSetInfo(value: MjPosInfo): void;
        doChangeCard(): void;
        changeBg(): void;
        changeInner(): void;
        InnerRotations: {
            [key: string]: number;
        };
        changeArrow(index: number, outIndex: number, show?: boolean, type?: MeldType): void;
        setSelecte(v: boolean): void;
        getSelect(): boolean;
        getCardInfo(): MjPosInfo;
        reset(): void;
        setColor(c: cc.Color): void;
        setGaryMask(b: boolean): void;
        setTing(b: boolean): void;
        setNum(num: number): void;
        setCover(cover: boolean): void;
        setMaskColor(c: cc.Color): void;
        tingPositions: {};
        arrowPositions: {};
        arrowScale: {};
        LaiPiScale: {
            [key: string]: {
                [key: string]: {
                    [key: string]: number;
                };
            };
        };
        LaiPiPositions: {
            [key: string]: {
                [key: string]: {
                    [key: string]: cc.Point;
                };
            };
        };
    }
}
