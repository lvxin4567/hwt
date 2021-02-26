declare namespace tea {
    class PropotionMyConfigPage {
        delafloor_cell: ccui.Layout;
        scrollDetail_list: ccui.ScrollView;
        btnRecord: ccui.Button;
        node: cc.Node;
        initWithNode(pagePartner: cc.Node, cellMod: ccui.Layout): void;
        _index: number;
        setIndex(index: any): this;
        getIndex(): number;
        onSubpageChange(e: kaayou.Event): void;
        private pullList;
        private createCell;
    }
}
