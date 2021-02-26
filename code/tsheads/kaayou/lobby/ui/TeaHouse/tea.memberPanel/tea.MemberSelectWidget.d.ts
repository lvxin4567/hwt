declare namespace tea {
    class MemberSelectWidget {
        btn_sel: ccui.Button;
        label_sel: ccui.Text;
        layout_sel: ccui.Layout;
        sub_items: Array<ccui.Layout>;
        node: cc.Node;
        rootNode: cc.Node;
        maskNode: ccui.Layout;
        clickCall: Function;
        selcall: Function;
        scrollList: ccui.ScrollView;
        _debugRect: boolean;
        _curselIndex: number;
        autocell_Item: ccui.Layout;
        constructor();
        initWidthNode(node: cc.Node, rootnode: cc.Node, clickCall: Function, autoCell?: ccui.Layout): void;
        setItemsCount(c: any): void;
        setAutoItem(data: Array<string>): void;
        setVisible(b: any): void;
        setCurSelect(index: number): void;
        getCurSelect(): number;
        ShowSelectPanel(): void;
        HideSelectPanel(): void;
        clearString(): void;
        private CreateAutoCell;
    }
}
