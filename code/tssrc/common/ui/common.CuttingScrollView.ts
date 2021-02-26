namespace common {
    const { BindEvent, doBindEvent } = kaayou._decorator;
    export interface ICuttingScrollViewCellConstructor {
        new(): ICuttingScrollViewCell;
    }

    export interface ICuttingScrollViewCell extends ccui.ILayout {
        initUI();
        getIndex();
        setIndex(i: number);
        setInfo(info: any);
    }

    //    export  class BaseTableViewCell extends kaayou.Block implements ICuttingScrollViewCell{

    //     constructor(){
    //         super();
    //         this.initUI();
    //     }

    //     abstract initUI();
    //     abstract setInfo(info:any);
    //    }

    export class CuttingScrollView extends kaayou.Block {
        constructor() {
            super();
        }
        _cellClass: ICuttingScrollViewCellConstructor = null;
        _lastIndex = 0;
        _scrollView: ccui.ScrollView = null;
        _maxCount = 200;
        initUI(node: cc.Node, cellClass: ICuttingScrollViewCellConstructor) {
            this.initWithNodeNoClone(<ccui.Widget>node);
            this.setCellClass(cellClass);
            this._scrollView = <ccui.ScrollView>this.node;
            this._scrollView.addEventListener(this.onScrollEvent.bind(this));
        }
        setCellClass(cellClass: ICuttingScrollViewCellConstructor){
            this._cellClass = cellClass
        }   
        getCellClass(){
            return this._cellClass;
        } 

        _lastOffsetY = -1;
        _lastOffsetX = -1;
        setMaxCount(n: number) {
            this._maxCount = n;
        }
        cells: ICuttingScrollViewCell[] = null;
        getCells(){
            return this.cells;
        }
        onScrollEvent(scrollview: ccui.ScrollView, etype) {
            // console.log(etype);
            if(this._initIng ){return;}
            if(lodash.isEmpty(this.cells)){
                return ;
            }
            if (etype == ccui.ScrollView.EVENT_CONTAINER_MOVED) {
                if (this._scrollView.getChildrenLayoutDirection() == ccui.Layout.LayoutDirection.Vertical) {

                    if (this._lastOffsetY == -1) {
                        this._lastOffsetY = scrollview.getInnerContainerPosition().y;
                    } else {
                        let bshot = false;
                        let curY = scrollview.getInnerContainerPosition().y;
                        let offset = this._lastOffsetY - curY;
                        do {
                            if (0 == offset) { break; }
                            if (offset < 0) {
                                // console.log('up');
                                bshot = this.doUp(curY);
                            } else {
                                // console.log('down');
                                bshot = this.doDown(curY);
                            }
                            if (bshot) {
                                this.cells.sort(function (a, b) {
                                    return a.getIndex() - b.getIndex();
                                })
                                this.doUpdataList();
                            }
                        } while (0);

                        this._lastOffsetY = curY;
                    }
                } else {
                    if (this._lastOffsetX == -1) {
                        this._lastOffsetX = scrollview.getInnerContainerPosition().x;
                    } else {
                        let curX = scrollview.getInnerContainerPosition().x;
                        let offset = this._lastOffsetX - curX;

                        do {
                            let bshot = false;
                            if (0 == offset) { break; }
                            if (offset > 0) {
                                // console.log('left', offset, curX);
                                bshot = this.doLeft(curX);
                            } else {
                                // console.log('right');
                                bshot = this.doRight(curX);
                            }
                            if (bshot) {
                                this.cells.sort(function (a, b) {
                                    return a.getIndex() - b.getIndex();
                                })
                                this.doUpdataList();
                            }
                        
                        } while (0);
                        this._lastOffsetX = curX;
                    }

                }
            }
        }
        doLeft(curX) {

            let spacingX = this._scrollView.getPadding().spacingX;
            let bshot = false;
            let width = this._scrollView.getContentSize().width;
            let cellWidth = this.cells[0].getContentSize().width;
            let self = this;
            lodash.forEach(this.cells, function (v: ICuttingScrollViewCell, i) {
                if (curX + v.getLeftBoundary() < -4 * (cellWidth + spacingX)) {
                    bshot = true;
                    v.setIndex(++self._lastIndex);
                    self.setCellPosition(v);
                }
            });
            return bshot;
        }
        getRange(){
            let min = Math.max(0,this._lastIndex - 19);
            let max = Math.min(this._maxCount  ,this._lastIndex + 1 );
            console.log({ min: min , max:  max });
            return { min: min , max:  max };
        }
        doUpdataList() {
            let range =  this.getRange();
            if(range.min < 0){return ;}
            if(range.max < 1){return ;}
            if(range.max > this._maxCount ){return ;}
            let e = kaayou.Event.create(kaayou.CustomEvent, "Cutting_Scroll_Change", range );
            this.emit(e, false, true);
        }
        doRight(curX) {

            let spacingX = this._scrollView.getPadding().spacingX;
            let bshot = false;
            let width = this._scrollView.getContentSize().width;
            let cellWidth = this.cells[0].getContentSize().width;
            let self = this;
            lodash.forEach(this.cells, function (v: ICuttingScrollViewCell, i) {
                if (curX + v.getRightBoundary() - width > 4 * (cellWidth + spacingX)) {
                    bshot = true;
                    v.setIndex((--self._lastIndex - (self.cells.length - 1)));
                    self.setCellPosition(v);
                }
            });
         
            return bshot;
        }

        doUp(curY) {
           
            let spacingY = this._scrollView.getPadding().spacingY;
            let bshot = false;
            let height = this._scrollView.getContentSize().height;
            let cellHgight = this.cells[0].getContentSize().height;
            let self = this;
            lodash.forEach(this.cells, function (v: ICuttingScrollViewCell, i) {
                if (curY + v.getTopBoundary() - height > 4 * (cellHgight + spacingY)) {
                    bshot = true;
                    v.setIndex(++self._lastIndex);
                    self.setCellPosition(v);

                }
            });
            return bshot;
        }
        doDown(curY) {
            let spacingY = this._scrollView.getPadding().spacingY;
            let bshot = false;
            let height = this._scrollView.getContentSize().height;
            let cellHgight = this.cells[0].getContentSize().height;
            let self = this;
            lodash.forEach(this.cells, function (v: ICuttingScrollViewCell, i) {
                // if(self._lastIndex - (self.cells.length - 1) < 1){return ;}
                if (curY + v.getBottomBoundary() < -4 * (cellHgight + spacingY)) {
                    bshot = true;
                    v.setIndex((--self._lastIndex - (self.cells.length - 1)));
                    self.setCellPosition(v);
                }
            });
            return bshot;
        }
        setCellPosition(cell: ICuttingScrollViewCell) {
            let spacingY = this._scrollView.getPadding().spacingY;
            let spacingX = this._scrollView.getPadding().spacingX;
            let allHeight = this._scrollView.getInnerContainerSize().height;
            let allWidth = this._scrollView.getInnerContainerSize().width;
            let top = this._scrollView.getPadding().top;
            let left = this._scrollView.getPadding().left;

            let row = 0;
            let column = 0;
            if (this._scrollView.getChildrenLayoutDirection() == ccui.Layout.LayoutDirection.Vertical) {
                let columnCount = this._scrollView.getGridColumn();
                if (columnCount <= 0) { return; }
                row = Math.floor((cell.getIndex()) / columnCount);
                column = cell.getIndex() % columnCount;

            } else {
                let rowCount = this._scrollView.getGridRow();
                if (rowCount <= 0) { return; }
                row = cell.getIndex() % rowCount;;
                column = Math.floor((cell.getIndex()) / rowCount);
            }

            let y = allHeight - row * spacingY - row * cell.height - ((1.0 - cell.getAnchorPoint().y) * cell.height)
            let x = column * spacingX + column * cell.width + cell.getAnchorPoint().x * cell.width
            cell.setPositionY(y - top);
            cell.setPositionX(x + left);
            cell.setVisible(!(cell.getIndex() < 0) && !(cell.getIndex() >= this._maxCount));
        }

        _initIng = false;
        initTables() {
            this._initIng = true;
            this.cells = [];
            this._scrollView.removeAllChildren();
            for (var i = 0; i < 20; i++) {
                let cell = new this._cellClass();
                cell.setIndex(i);
                this._scrollView.addChild(<any>cell);
                this.cells.push(cell);
            }
            this.cells.sort(function (a, b) {
                return a.getIndex() - b.getIndex();
            });

            this._lastIndex = 20 - 1;
            if (this._scrollView.getChildrenLayoutDirection() == ccui.Layout.LayoutDirection.Vertical) {
                let rows = Math.ceil(this._maxCount / this._scrollView.getGridColumn());
                let allHeight = rows * (this.cells[0].getContentSize().height + this._scrollView.getPadding().spacingY) - this._scrollView.getPadding().spacingY +
                    this._scrollView.getPadding().top + this._scrollView.getPadding().bottom;
                this._scrollView.setInnerContainerSize(cc.size(this._scrollView.getContentSize().width, allHeight));
            } else {
                let columns = Math.ceil(this._maxCount / this._scrollView.getGridRow());
                let allWidth = columns * (this.cells[0].getContentSize().width + this._scrollView.getPadding().spacingX) -
                    this._scrollView.getPadding().spacingX +
                    this._scrollView.getPadding().left + this._scrollView.getPadding().right;
                if (allWidth - this._scrollView.getContentSize().width < this.cells[0].getContentSize().width / 2) {
                    allWidth = this._scrollView.getContentSize().width;
                }
                this._scrollView.setInnerContainerSize(cc.size(allWidth, this._scrollView.getContentSize().height));
            }

            for (var x in this.cells) {
                this.setCellPosition(this.cells[x]);
            }
            if (this._scrollView.getChildrenLayoutDirection() == ccui.Layout.LayoutDirection.Vertical) {
                this._scrollView.scrollToTop(0,false);
            }else{
                this._scrollView.scrollToLeft(0,false);
            }
            this._initIng = false;
        }

        setHorizontal(v: ccui.Layout.LayoutHorizontal) {
            this._scrollView.setHorizontal(v);
        }
        setGrid(v: ccui.Layout.LayoutGrid_AxisDirection) {
            this._scrollView.setGrid(v);
        }
        setVertical(v: ccui.Layout.LayoutVertical) {
            this._scrollView.setVertical(v);
        }
        //设置自动排版方向
        setChildrenLayoutDirection(v: ccui.Layout.LayoutDirection) {
            this._scrollView.setChildrenLayoutDirection(v);
        }
        //设置自动布局
        doChildrenLayout() {
            this._scrollView.doChildrenLayout();
        }
        //设置grid 布局行
        setGridRow(row: number) {
            this._scrollView.setGridRow(row);
        }
        //设置瀑布流布局
        setPinterest(b: boolean) {
            this._scrollView.setPinterest(b);
        }
        //设置grid 布局列
        setGridColumn(column: number) {
            this._scrollView.setGridColumn(column);
        }

        setPadding(padding) {
            this._scrollView.setPadding(padding);
        }
        getPadding() {
            return this._scrollView.getPadding();
        }
        //    setGrid(){

        //    }
        //     s.setPadding({ top: 10, bottom: 10, left: 0, right: 0, spacingX: 10, spacingY: 10 });
        //     s.setHorizontal(ccui.Layout.LayoutHorizontal.LEFT);
        //     s.setVertical(ccui.Layout.LayoutVertical.TOP);
        //     s.setGridColumn(3);
    }


}