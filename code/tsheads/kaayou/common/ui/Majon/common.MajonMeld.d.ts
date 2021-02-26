declare namespace common {
    interface MeldCell {
        type: MeldType;
        nums: Array<number>;
        mask?: OperateMask;
        wOperateUser?: number;
        wProvideUser?: number;
    }
    enum MeldType {
        NULL = 0,
        LEFTCHI = 1,
        CENTERCHI = 2,
        RIGHTCHI = 3,
        PENG = 4,
        GANG = 5,
        ANGANG = 6,
        PILAIGANG = 7,
        BUGANG = 8,
        CHAOGANG = 9,
        LIANGDAO = 10
    }
    enum OperateMask {
        WIK_NULL = 0,
        WIK_LEFT = 1,
        WIK_CENTER = 2,
        WIK_RIGHT = 4,
        WIK_PENG = 8,
        WIK_FILL = 16,
        WIK_GANG = 32,
        WIK_CHI_HU = 64,
        WIK_QIANG = 128,
        WIK_BAO_QING = 256,
        WIK_TING = 512,
        WIK_HUA = 1024,
        WIK_FENG = 2048,
        WIK_JIANG = 4096,
        WIK_LIANG = 16384
    }
    class MajionMeld<game_MaJonCard extends common.MaJonCard> extends kaayou.Block {
        protected _cards: Array<game_MaJonCard>;
        protected _meldType: MeldType;
        protected _cardNums: Array<number>;
        protected _meldInfo: Array<rowInfo>;
        _isangangback: boolean;
        constructor(isangangback?: boolean);
        initWithInfo(d: Array<rowInfo>): void;
        cleanUp(): void;
        setMeld(type: MeldType, nums: Array<number>): void;
        showArrow(index: number, outIndex: number): void;
        getMeld(): number[];
        getMeldType(): MeldType;
        getMeldNode(): game_MaJonCard[];
        getMeldInfo(): rowInfo[];
    }
}
