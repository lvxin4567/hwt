declare namespace kaayou {
    /**
    * PullListEvent / PullList 相关事件
    *
    */
    class PullListEvent extends kaayou.Event {
        /**下拉中*/
        static HeadIng: string;
        /**下拉将要完成*/
        static HeadDidFinish: string;
        /**下拉完成*/
        static HeadFinish: string;
        /**下拉取消*/
        static HeadCancel: string;
        /**上拉中*/
        static FootIng: string;
        /**上拉将要完成*/
        static FootDidFinish: string;
        /**上拉完成*/
        static FootFinish: string;
        /**上拉取消*/
        static FootCancel: string;
        /**刷新完成*/
        static Refreshed: string;
        constructor(type: string, data?: any);
    }
}
declare namespace common {
    interface IPullListSlot extends ccui.IWidget {
        setString(str: string): any;
    }
    interface IPullListCell extends ccui.IWidget {
        setInfo(...agrs: any[]): any;
        setIndex(index: number): any;
        getIndex(): number;
    }
    interface IPullLisAdpter {
        pool?: Array<IPullListCell>;
        datas: Array<any>;
        getCell(): IPullListCell;
    }
    class PullList extends kaayou.Block {
        scview: ccui.ScrollView;
        constructor();
        _debugRect: boolean;
        _spacingY: number;
        setSpacingY(spacing: number): void;
        _EnabledBar: boolean;
        setEnabledBar(b: any): void;
        initWithNode(node: cc.Node): this;
        addScrollView(): void;
        addTouchMask(): void;
        dispatchEvent(evtype: any): void;
        _offtop: number;
        _offfoot: number;
        _uped: boolean;
        _uping: boolean;
        _downed: boolean;
        _downing: boolean;
        _adpter: IPullLisAdpter;
        setAdpter(adpter: IPullLisAdpter): void;
        getAdpter(): IPullLisAdpter;
        getCell(): IPullListCell;
        getCells(): IPullListCell[];
        _needPull: boolean;
        initPullEnv(needpl?: boolean): void;
        _cellHeight: number;
        _preCellLen: number;
        _viewlen: number;
        _offlen: number;
        protected _prepareCells(): void;
        protected _normalizingCellPosition(): void;
        getScrollView(): ccui.ScrollView;
        onScrolling(sc: ccui.ScrollView): void;
        _headDoingText: string;
        setHeadDoingText(text: string): void;
        getHeadDoingText(): string;
        _headDidFinishText: string;
        setHeadDidFinishText(text: string): void;
        getHeadDidFinishText(): string;
        _headFinishText: string;
        setHeadFinishText(text: string): void;
        getHeadFinishText(): string;
        _footDoingText: string;
        setFootDoingText(text: string): void;
        getFootDoingText(): string;
        _footDidFinishText: string;
        setFootDidFinishText(text: string): void;
        getFootDidFinishText(): string;
        _footFinishText: string;
        setFootFinishText(text: string): void;
        getFootFinishText(): string;
        _pheadoffset: number;
        getHeadOffset(): number;
        setHeadOffset(b: number): number;
        _pheadholdoffset: number;
        getHeadHoldOffset(): number;
        setHeadHoldOffset(b: number): number;
        _pfootoffset: number;
        getFootOffset(): number;
        setFootOffset(b: number): number;
        _pfootholdoffset: number;
        getFootHoldOffset(): number;
        setFootHoldOffset(b: number): number;
        headSlot: IPullListSlot;
        footSlot: IPullListSlot;
        setHeadSolt(v: IPullListSlot): void;
        getHeadSolt(): IPullListSlot;
        setFootSolt(v: IPullListSlot): void;
        getFootSolt(): IPullListSlot;
        addHeadSolt(): void;
        addFootSolt(): void;
        setScrollToOffsetTop(top: any): void;
        _clearPullState(): void;
        setScrollDisable(b: any): void;
        private _setScrollBaI;
        _doWaitRef: boolean;
        onScrollTouchEnd(): void;
        _updateScrolling: boolean;
        refresh(): void;
        protected _refreshWithData(): void;
        protected _doRefreshOffsetForce(): void;
        __ranger: {
            min: number;
            max: number;
        };
        getRange(): {
            min: number;
            max: number;
        };
        protected _doUpdateCellByIndex(): void;
        onContainerMove(sc: ccui.ScrollView): void;
        _updateChangeInnerOffset(): void;
        pmask: ccui.Layout;
        setVisible(b: any): void;
        _nonius: number;
        _lastnonius: number;
        onChangeCellPositions(): void;
        setCellPosition(cell: IPullListCell): void;
        checkTouchInvalid(target: any, touch: any): boolean;
        isTureVisible(bParentReleated?: boolean): boolean;
    }
}
