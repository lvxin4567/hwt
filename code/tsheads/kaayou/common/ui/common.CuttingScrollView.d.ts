declare namespace common {
    interface ICuttingScrollViewCellConstructor {
        new (): ICuttingScrollViewCell;
    }
    interface ICuttingScrollViewCell extends ccui.ILayout {
        initUI(): any;
        getIndex(): any;
        setIndex(i: number): any;
        setInfo(info: any): any;
    }
    class CuttingScrollView extends kaayou.Block {
        constructor();
        _cellClass: ICuttingScrollViewCellConstructor;
        _lastIndex: number;
        _scrollView: ccui.ScrollView;
        _maxCount: number;
        initUI(node: cc.Node, cellClass: ICuttingScrollViewCellConstructor): void;
        setCellClass(cellClass: ICuttingScrollViewCellConstructor): void;
        getCellClass(): ICuttingScrollViewCellConstructor;
        _lastOffsetY: number;
        _lastOffsetX: number;
        setMaxCount(n: number): void;
        cells: ICuttingScrollViewCell[];
        getCells(): ICuttingScrollViewCell[];
        onScrollEvent(scrollview: ccui.ScrollView, etype: any): void;
        doLeft(curX: any): boolean;
        getRange(): {
            min: number;
            max: number;
        };
        doUpdataList(): void;
        doRight(curX: any): boolean;
        doUp(curY: any): boolean;
        doDown(curY: any): boolean;
        setCellPosition(cell: ICuttingScrollViewCell): void;
        _initIng: boolean;
        initTables(): void;
        setHorizontal(v: ccui.Layout.LayoutHorizontal): void;
        setGrid(v: ccui.Layout.LayoutGrid_AxisDirection): void;
        setVertical(v: ccui.Layout.LayoutVertical): void;
        setChildrenLayoutDirection(v: ccui.Layout.LayoutDirection): void;
        doChildrenLayout(): void;
        setGridRow(row: number): void;
        setPinterest(b: boolean): void;
        setGridColumn(column: number): void;
        setPadding(padding: any): void;
        getPadding(): ccui.ILayoutPadding;
    }
}
