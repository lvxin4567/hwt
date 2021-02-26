declare namespace tea {
    class RecordSearchWidget {
        search_btn: ccui.Button;
        search_edit: ccui.TextField;
        edit_searchRed: any;
        clickCall: Function;
        node: cc.Node;
        constructor();
        initWidthNode(node: cc.Node, clickCall: Function): void;
        setVisible(b: any): void;
        getSearchString(): string;
        setPlaceholder(str: any): void;
        setString(gstr: any): void;
        placeholder: "昵称/ID";
        clearString(): void;
    }
}
