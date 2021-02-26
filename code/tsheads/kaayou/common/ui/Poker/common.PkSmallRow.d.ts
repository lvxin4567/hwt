declare namespace common {
    abstract class PkSmallRow extends kaayou.Block {
        _cardType: string;
        _chickennum: number;
        _nums: Array<number>;
        _maxColNum: number;
        _horizontal: ccui.Layout.LayoutHorizontal;
        static HuaMap: string[];
        constructor();
        cleanUp(): void;
        setChicken(_num: number): void;
        setMaxColNum(n: number): void;
        setSortType(v: ccui.Layout.LayoutHorizontal): void;
        setNums(nums: Array<number>): void;
        createCard(cardnum: number): ccui.ImageView;
    }
}
