/// <reference path="common.MaJonCard.d.ts" />
declare namespace common {
    class MajionMeldRow<game_MaJonCard extends common.MaJonCard> extends kaayou.Layer {
        _isangangback: boolean;
        constructor(isangangback?: boolean);
        private _melds;
        initWithInfo(d: any): void;
        setMeldNums(data: Array<MeldCell>): void;
        getMeldNums(): MajionMeld<game_MaJonCard>[];
    }
}
