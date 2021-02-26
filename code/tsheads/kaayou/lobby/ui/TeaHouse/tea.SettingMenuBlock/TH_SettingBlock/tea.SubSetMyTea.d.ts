declare namespace tea {
    class SubMyTeaPage {
        scroll_Tea_mine: ccui.ScrollView;
        scroll_Tea_Intrant: ccui.ScrollView;
        _page: cc.Node;
        _index: number;
        myTea_layout: ccui.Layout;
        myTea_Group: common.RadioGroup;
        myTeaNum: number;
        cell_Mod: ccui.Widget;
        setIndex(index: any): this;
        getIndex(): number;
        onSubpageChange(e: kaayou.Event): void;
        reset(): void;
        initWidthNode(page: cc.Node, cellMod: ccui.Widget): void;
        onUpdateMineTeaHouse(data: {
            list: Data_HouseMemberItem;
            update: boolean;
        }): void;
        onUpdateIntrantTeaHouse(data: {
            list: Data_HouseMemberItem;
            update: boolean;
        }): void;
        private createCell;
    }
}
