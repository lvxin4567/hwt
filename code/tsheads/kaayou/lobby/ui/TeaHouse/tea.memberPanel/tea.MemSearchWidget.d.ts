declare namespace tea {
    class MemSearchWidget {
        search_btn: ccui.Button;
        edit_searchMem: any;
        node: cc.Node;
        clickCall: Function;
        constructor();
        initWidthNode(node: cc.Node, clickCall: Function): void;
        setSearchVisible(bool: boolean): void;
        getSearchString(): any;
        clearString(): void;
    }
}
