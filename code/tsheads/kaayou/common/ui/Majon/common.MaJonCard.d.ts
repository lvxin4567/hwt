declare namespace common {
    namespace MaJonCardType {
        enum CardColor {
            GREEN = "lv",
            BLUE = "lan",
            YELLOW = "huang"
        }
        enum CardDirection {
            SOUTH = "south",
            EAST = "east",
            NORTH = "north",
            WEST = "west"
        }
        enum CardType {
            HAND = "hand",
            TABLE = "table",
            MELD = "meld",
            DISCARD = "discard",
            PILAI = "pilai",
            HEAP = "heap"
        }
        enum CardModel {
            model2d = 0,
            model3d = 1
        }
    }
    abstract class MaJonCard extends kaayou.ImageView {
        static res_prefix: string;
        static cardColor: MaJonCardType.CardColor;
        static gameName: string;
        static cardModel: MaJonCardType.CardModel;
        InnerNum: number;
        flowerScale: number;
        flowerRotation: number;
        cardScale: number;
        flowerPos: cc.Point;
        mjPos: cc.Point;
        tag2Rect: cc.Rect;
        carddirection: MaJonCardType.CardDirection;
        Cover: boolean;
        cardtype: MaJonCardType.CardType;
        isSelect: boolean;
        flowersp: kaayou.ImageView;
        arrow: ccui.ImageView;
        image_pilai: ccui.ImageView;
        tingTag: ccui.ImageView;
        leftCard: ccui.Text;
        mustRes: string;
        protected _cardInfo: rowInfo;
        abstract changeLaiPi(): any;
        abstract arrowPositions: any;
        abstract arrowScale: any;
        constructor();
        setMustMajonRes(mustRes: string): void;
        static getCardColor(index: number): MaJonCardType.CardColor;
        getCardDirection(direction: string): MaJonCardType.CardDirection;
        getCardType(type: string): MaJonCardType.CardType;
        initUi(): void;
        doSetInfo(value: rowInfo): void;
        doChangeCard(): void;
        changeBg(): void;
        changeInner(): void;
        InnerRotations: {
            [key: string]: number;
        };
        changeArrow(index: number, outIndex: number, show?: boolean, type?: MeldType): void;
        setSelecte(v: boolean): void;
        getSelect(): boolean;
        getCardInfo(): rowInfo;
        reset(): void;
        setColor(c: cc.Color): void;
        setGaryMask(b: boolean): void;
        setTing(b: boolean): void;
        setNum(num: number): void;
        setCover(cover: boolean): void;
        setMaskColor(c: cc.Color): void;
    }
}
