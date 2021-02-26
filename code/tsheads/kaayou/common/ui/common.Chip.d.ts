declare namespace common {
    class Chip extends kaayou.ImageView {
        _innerNum: number;
        _bgurl: string;
        chipFont: ccui.Text;
        constructor(bet: number, bgUrl: string);
        get InnerNum(): number;
        set InnerNum(value: number);
        get BgUrl(): string;
        set BgUrl(value: string);
        initUi(bet: number, bgUrl: string): void;
        unuse(): void;
        changeChip(): void;
        reset(): void;
    }
}
