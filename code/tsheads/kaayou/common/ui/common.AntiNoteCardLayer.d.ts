declare namespace common {
    abstract class AntiNoteCardLayer extends kaayou.Layer {
        abstract getCardRow(): PkRow;
        curRound: number;
        outCardRow: Array<PkRow>;
        outCardNode: Array<cc.Node>;
        constructor(ccs: string);
        initUI(): void;
        RandOutCard(): any[];
        UpdateOutCard(data: {
            Players: Array<mod.IFriendGame_User_Info>;
        }): void;
        PlayOutCardAnim(data: {
            Players: Array<mod.IFriendGame_User_Info>;
        }): void;
        cleanUp(): void;
        setCurRound(curRound: number): void;
        Show(data: {
            Players: Array<mod.IFriendGame_User_Info>;
            curRound?: number;
        }): void;
        Hide(): void;
    }
}
