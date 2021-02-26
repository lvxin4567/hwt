declare namespace kaayou {
    class pop {
        static showAni(s: {
            cNode: cc.Node;
            mNode?: cc.Node;
            action?: Function;
        }): void;
        static hideAni(h: {
            cNode: cc.Node;
            mNode?: cc.Node;
            rnode?: cc.Node;
            action?: Function;
        }): void;
        static ShowMainAnim(s: {
            tNode: cc.Node;
            bNode: cc.Node;
            mNode?: cc.Node;
            action?: Function;
        }): void;
    }
}
