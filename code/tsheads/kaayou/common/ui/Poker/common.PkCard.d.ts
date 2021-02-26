declare namespace common {
    enum CardTag {
        TAG_CHICKEN_LOGO = 1,
        TAG_LAI_LOGO = 2,
        TAG_TEAMCARDMASK = 3
    }
    abstract class PkCard extends kaayou.ImageView {
        _cardType: string;
        _cardSize: cc.Size;
        _innerNum: number;
        getInnerNum(): number;
        setInnerNum(value: number): void;
        static HuaMap: string[];
        constructor();
        unuse(): void;
        initUI(): void;
        reset(): void;
        setColro(col: cc.Color): void;
        changeCard(): void;
        changeInner(): void;
        setSelecte(v: boolean): void;
        isSelecte(): boolean;
        setPreSelecte(v: boolean): void;
        isPreSelecte(): boolean;
        setChickenLogoVisible(visible: boolean): void;
        setLaiLogoVisible(visible: boolean): void;
    }
}
