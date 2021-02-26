declare namespace common {
    abstract class PkAni {
        listener: cc.EventListener;
        init(maskNode: cc.Node, handRow: PkRow): void;
        handRow: PkRow;
        moveRow: PkRow;
        node: cc.Node;
        isSlide: boolean;
        isDrag: boolean;
        startPoint: cc.Point;
        onTouchEnd(event: kaayou.TouchEvent): void;
        onTouchStart(event: kaayou.TouchEvent): boolean;
        onTouchMove(event: kaayou.TouchEvent): void;
        isLock: boolean;
        setLock(v: boolean): void;
        onClickEnd(position: cc.Point): void;
        seletecards: Array<number>;
        seleteStartIndex: number;
        seleteEndIndex: number;
        onSlideStart(position: cc.Point): void;
        onSlideIng(position: cc.Point): void;
        onSlideEnd(position: cc.Point): void;
        abstract getCardRow(): common.PkRow;
        onCardMoving(position: cc.Point): boolean;
        onCardMoveEnd(position: cc.Point): void;
        emitOutCard(): void;
        emitMoveCard(vec: Array<number>): void;
    }
}
