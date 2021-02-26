/// <reference path="extend.d.ts" />
declare namespace kaayou {
    class kScene extends cc.Layer {
        node: cc.Node;
        ctor(): void;
        initWithccs(path?: string): void;
        onReEnter(): void;
        onReExit(): void;
    }
}
