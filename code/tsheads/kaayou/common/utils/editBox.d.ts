declare namespace kaayou {
    class editBox {
        static attachTextEdit(pNode: any, name: any, placeholdStr: any, handleInput?: any, attr?: any): any;
        static target(node: cc.Node): {
            attachTextEdit: any;
            getValue: any;
            setValue: any;
            setEnable: any;
            setAllEnable: any;
            getAllValue: any;
            setAttribute: any;
        };
    }
}
