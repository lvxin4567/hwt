declare namespace tea {
    class RecordSelectWidget {
        btn_sel: ccui.Button;
        label_sel: ccui.Text;
        layout_sel: ccui.Layout;
        sub_items: Array<ccui.Layout>;
        scrollList: cc.ScrollView;
        node: cc.Node;
        rootNode: cc.Node;
        maskNode: ccui.Layout;
        clickCall: Function;
        selcall: Function;
        _debugRect: boolean;
        _curselIndex: number;
        constructor();
        initWidthNode(node: cc.Node, rootnode: cc.Node, clickCall: Function): void;
        setItemsCount(idx: any): void;
        setVisible(b: any): void;
        setCurSelect(index: number): void;
        getCurSelect(): number;
        ShowSelectPanel(): void;
        HideSelectPanel(): void;
        clearString(): void;
    }
}
