declare namespace tea {
    class FcmSearchWidget {
        search_btn: ccui.Button;
        edit_FcmSearch: any;
        clickCall: Function;
        node: cc.Node;
        constructor();
        initWidthNode(node: cc.Node, clickCall: Function): void;
        setVisible(b: any): void;
        getSearchString(): any;
        setPlaceholder(str: any): void;
        setString(gstr: any): void;
        placeholder: "昵称/ID";
        clearString(): void;
    }
}
