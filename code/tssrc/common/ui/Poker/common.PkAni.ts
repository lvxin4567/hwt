
namespace common {
    const { BindEvent, doBindEvent } = kaayou._decorator;

    export abstract class PkAni {

        listener: cc.EventListener = null;

        init(maskNode: cc.Node, handRow: PkRow) {

            this.node = maskNode;
            this.handRow = handRow;
            if (!this.node) { return; }
            // this.listener = cc.EventListener.create({
            //     event: cc.EventListener.TOUCH_ONE_BY_ONE,
            //     swallowTouches: false,
            //     onTouchBegan: this.onTouchStart.bind(this),
            //     onTouchMoved: this.onTouchMove.bind(this),
            //     onTouchEnded: this.onTouchEnd.bind(this),
            //     onTouchCancelled: this.onTouchEnd.bind(this),
            // });
            // cc.eventManager.addListener(this.listener, this.node);
            
            this.node.on(kaayou.TouchEvent.TouchStart, this.onTouchStart.bind(this), this);
            this.node.on(kaayou.TouchEvent.TouchMove, this.onTouchMove.bind(this), this);
            this.node.on(kaayou.TouchEvent.TouchEnd, this.onTouchEnd.bind(this), this);
            this.node.on(kaayou.TouchEvent.TouchCance, this.onTouchEnd.bind(this), this);
        }

        handRow: PkRow = null;
        moveRow: PkRow = null;
        node: cc.Node = null;
        isSlide: boolean = false;
        isDrag: boolean = false;
        startPoint: cc.Point = null;
        onTouchEnd(event:kaayou.TouchEvent) {
            var target = event.target;
            var position =target.convertToNodeSpace(target.getTouchEndPosition()); 
            cc.log('onTouchEnd:', position);

            this.onCardMoveEnd(position);

            if (this.isSlide) {
                this.onSlideEnd(position);
            } else if (this.isDrag) {
                // this.onDragEnd(event);
            } else {
                this.onClickEnd(position);
            }
            this.isSlide = false;
            this.isDrag = false;
        }
        onTouchStart(event:kaayou.TouchEvent) {
            var target = event.target;
            var position =target.convertToNodeSpace(target.getTouchBeganPosition()); 
            // cc.log('onTouchStart:', position);

            this.startPoint = position;
            this.isSlide = false;
            this.isDrag = false;

            return true;
        }

        onTouchMove(event:kaayou.TouchEvent) {
            var target = event.target;
            var position =target.convertToNodeSpace(target.getTouchMovePosition()); 
            // cc.log('onTouchMove:', position);

            if (this.onCardMoving(position)) {

            } else if (this.isSlide) {
                this.onSlideIng(position);
            } else if (this.isDrag) {
                // this.onDragIng(e);
            } else {
                if (Math.abs(position.x - this.startPoint.x) > 1 && Math.abs(position.y - this.startPoint.y) < 1000) {
                    this.isSlide = true;
                    this.onSlideStart(position);
                }
                // if (Math.abs(e.getLocation().y - e.getStartLocation().y) > 20) {
                //     if (this.isLock) { return; }
                //     this.isDrag = true;
                //     this.onDragStart(e);
                // }
            }
        }
        isLock = true;
        setLock(v: boolean) {
            this.isLock = v;
        }
        onClickEnd(position: cc.Point) {
            let index = this.handRow.hitCards(position);
            //console.log('点击' , index);
            if (index < 0) {
                this.handRow.setAllNoSelect();
                this.emitOutCard();
                return;
            }
            if (!this.handRow.getCardByIndex(index)) { return };
            this.handRow.setCardSelect(index, !this.handRow.getCardByIndex(index).isSelecte());

            if (this.handRow.getCardByIndex(index).isSelecte()) {
                this.handRow.openCard(index);
                this.emitOutCard();
            } else {
                let isSelArr = [];
                let selectNUm = 0;

                for (let i = 0; i < this.handRow.childrenCount; i++) {
                    isSelArr.push(this.handRow.getCardByIndex(i).isSelecte());
                    if (this.handRow.getCardByIndex(i).isSelecte()) {
                        selectNUm++;
                    }
                }
                cc.log('选中:', selectNUm);
                this.handRow.setNums(this.handRow.getNums());
                for (let i = 0; i < this.handRow.childrenCount; i++) {
                    this.handRow.setCardSelect(i, isSelArr[i]);
                }
                this.emitOutCard();
            }
        }

        seletecards: Array<number> = null;
        seleteStartIndex = -1;
        seleteEndIndex = -1;
        onSlideStart(position: cc.Point) {
            let index = this.handRow.hitCards(position);
            if (index < 0) {
                return;
            }
            this.seleteStartIndex = index;
            this.seletecards = [index];
        }

        onSlideIng(position: cc.Point) {
            if (this.seleteStartIndex < 0) {
                return;
            }
            let index = this.handRow.hitCards(position);
            if (index < 0) { return; }
            this.seleteEndIndex = index;
            let count = Math.abs(this.seleteStartIndex - index);
            let left = this.seleteStartIndex - index > 0;
            this.seletecards = [this.seleteStartIndex];
            for (var i = 1; i <= count; i++) {
                this.seletecards.push(this.seleteStartIndex + (left ? i * -1 : i));
            }
            this.handRow.setPreSel(this.seletecards);
        }

        onSlideEnd(position: cc.Point) {
            this.seleteStartIndex = this.seleteEndIndex = -1;
            this.isSlide = false;
            if (!this.seletecards) {
                return;
            }
            for (var x in this.seletecards) {
                if (!this.handRow.getCardByIndex(this.seletecards[x])) return;
                this.handRow.setCardSelect(this.seletecards[x], !this.handRow.getCardByIndex(this.seletecards[x]).isSelecte());
            }
            this.seletecards = null;
            this.handRow.setPreSel([]);
            this.emitOutCard();
        }

        abstract getCardRow(): common.PkRow;
        
        onCardMoving(position: cc.Point) {
            //187=手牌高度-handCardPanel向下偏移31
            if (position.y > 187 && Math.abs(position.y - this.startPoint.y) > 20 && !this.moveRow && this.node.getParent()) {
                let cardVec = this.handRow.getPreAndSelectCards();
                if (cardVec.length <= 0) {
                    return false;
                }
                //隐藏手牌
                this.handRow.setPreAndSelectCardsVisible(false);
                //创建拖动的牌
                this.moveRow = this.getCardRow();
                this.moveRow.setAnchorPoint(1, 0);
                this.moveRow.setScale(0.5);
                this.moveRow.setNums(cardVec);
                //拖动的牌层级需要在最上层
                this.node.getParent().addChild(this.moveRow);
            }
            if (!!this.moveRow) {
                this.moveRow.setPosition(position);
                this.moveRow.setPosition(position.x - this.moveRow.getContentSize().width*0.5*this.moveRow.getScaleX(), position.y);
                return true;
            }
            return false;
        }

        onCardMoveEnd(position: cc.Point) {
            //拖动牌高度=手牌高度*缩放0.5
            //242=手牌高度-handCardPanel向下偏移31+拖动牌高度/2
            if (!!this.moveRow) {
                if (position.y > 242) {
                    let cardVec = this.handRow.getPreAndSelectCards();
                    this.emitMoveCard(cardVec);
                }

                //显示手牌
                this.handRow.setPreAndSelectCardsVisible(true);
                //释放拖动的牌
                this.moveRow.setNums([]);
                this.moveRow.removeFromParent(true);
                this.moveRow = null;
            }
        }

        emitOutCard() {
            //出牌
            kaayou.emit("common", "SelCard");
        }

        emitMoveCard(vec: Array<number>) {
            //出牌
            kaayou.emit("common", "MoveCard", { moveCard: vec });
        }

    }
}
