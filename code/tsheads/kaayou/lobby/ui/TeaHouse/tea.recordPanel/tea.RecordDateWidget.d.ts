declare namespace tea {
    class RecordDateWidget {
        arrLyLeftMenu: Array<ccui.Layout>;
        arrTimeIndex: Array<number>;
        arrTimeString: Array<string>;
        bLike: boolean;
        iLike: number;
        iLowScore: number;
        roundtype: number;
        showLowScore: boolean;
        showTimeSort: boolean;
        showSortType: boolean;
        lowScoreIndex: number;
        node: cc.Node;
        pageName: string;
        prfLeftMenu: ccui.Layout;
        sub_items: Array<ccui.CheckBox>;
        scrollList: ccui.ScrollView;
        clickCall: Function;
        selcall: Function;
        _curselIndex: number;
        checkRadio: common.RadioGroup;
        constructor();
        initWidthNode(node: cc.Node, menuItem: ccui.Layout, clickCall: Function): void;
        onMenuSelected(e: kaayou.RadioEvent): void;
        onButtonClicked(e: kaayou.TouchEvent): void;
        setPage(name: any): void;
        setItemsCount(idx: any): void;
        setTimeText(): void;
        resetTimeLine(idx: number): void;
        subDayTime(sd?: number): number;
        setCurSelect(index: number): void;
        getCurSelect(): number;
    }
}
