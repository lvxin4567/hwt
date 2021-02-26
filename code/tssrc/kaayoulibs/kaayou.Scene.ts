/// <reference path="extend.ts" />
namespace kaayou {
    const { ccclass } = kaayou._decorator;
    @ccclass
    export class kScene extends cc.Layer {
        public node: cc.Node = null;
        ctor() {
            super.ctor();
        }
        initWithccs(path?: string) {
            this.setContentSize(cc.winSize);
            let mlayer = ccui.Layout.create();
            mlayer.setContentSize(cc.winSize);
            mlayer.setTouchEnabled(true);
            mlayer.setAnchorPoint(0.5, 0.5);
            mlayer.setPosition(cc.winSize.width  * 0.5, cc.winSize.height  * 0.5);
            this.addChild(mlayer);
            
            this.node = ccs.load(path, "res/").node;
            this.node.setContentSize(cc.winSize);
            this.node.setPosition(cc.winSize.width / 2 - this.node.width / 2, cc.winSize.height / 2 - this.node.height / 2);
            ccui.helper.doLayout(this.node);
            this.addChild(this.node);
        }
        public onReEnter() { }
        public onReExit() { }
    }
}