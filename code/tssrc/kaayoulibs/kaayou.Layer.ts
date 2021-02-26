/// <reference path="extend.ts" />
namespace kaayou {
    const { ccclass } = kaayou._decorator;
    @ccclass
    export class Layer extends cc.Layer {
        public _moduleName = "";
        public node: cc.Node = null;

        ctor() {
            super.ctor();
        }

        getModuleName() {
            return this._moduleName;
        }

        initWithccs(path?: string, full: boolean = true) {
            let fullSize = null;
            if (full) {
                fullSize = cc.size(cc.winSize.width, cc.winSize.height);
            } else {
                fullSize = cc.size(cc.winSizeCustom.width, cc.winSizeCustom.height);
            }
            this.setContentSize(fullSize);
            
            this.setPosition((cc.winSize.width - fullSize.width) / 2, (cc.winSize.height - fullSize.height) / 2);
            this.node = ccs.load(path, "res/").node;
            this.node.setContentSize(fullSize);
            this.node.setAnchorPoint(0.5, 0.5);

            this.node.setPosition(fullSize.width / 2, fullSize.height / 2);

            this.addChild(this.node);
            ccui.helper.doLayout(this);
        }
        
        setModuleName(moduleName: string = "") {
            this._moduleName = moduleName;
        }        
    }

    @ccclass
    export class Block extends ccui.Layout {
        public node: cc.Node = null;
        ctor() {
            super.ctor();
        }
        public _moduleName = "";
        setModuleName(moduleName: string = "") {
            this._moduleName = moduleName;
        }
        getModuleName() {
            return this._moduleName;
        }
        initWithccs(path?: string,...args) {

            this.node = ccs.load(path, "res/").node;
            this.node.setVisible(true);
            ccui.helper.doLayout(this.node);
            this.addChild(this.node);
            this.setContentSize(this.node.getContentSize());
            this.setAnchorPoint(this.node.getAnchorPoint());
            this.setScaleX(this.node.getScaleX());
            this.setScaleY(this.node.getScaleY());
            this.setPosition(this.node.getPosition());
            this.node.setAnchorPoint(0.5, 0.5);
            this.node.setScaleX(1);
            this.node.setScaleY(1);
            this.node.setPosition(this.getContentSize().width / 2, this.getContentSize().height / 2);

        }

        initWithNode(node: ccui.Widget,...args) {
            this.node = node.clone();
            this.node.setVisible(true);
            ccui.helper.doLayout(this.node);
            this.addChild(this.node);
            this.setContentSize(this.node.getContentSize());
            this.setAnchorPoint(this.node.getAnchorPoint());
            this.setScaleX(this.node.getScaleX());
            this.setScaleY(this.node.getScaleY());
            this.setPosition(this.node.getPosition());
            this.node.setAnchorPoint(0.5, 0.5);
            this.node.setScaleX(1);
            this.node.setScaleY(1);
            this.node.setPosition(this.getContentSize().width / 2, this.getContentSize().height / 2);
        }

        initWithNodeAndCleanup(node: ccui.Widget,...args) {
            this.initWithNode(node);
            node.removeFromParentAndCleanup(true);
        }

        initWithNodeNoClone(node: cc.Node,...args) {
            this.node = node;
            this.node.setVisible(true);
            ccui.helper.doLayout(this.node);
            node.removeFromParent();
            this.addChild(this.node);
            this.setContentSize(this.node.getContentSize());
            this.setAnchorPoint(this.node.getAnchorPoint());
            this.setScaleX(this.node.getScaleX());
            this.setScaleY(this.node.getScaleY());
            this.setPosition(this.node.getPosition());
            this.node.setAnchorPoint(0.5, 0.5);
            this.node.setScaleX(1);
            this.node.setScaleY(1);
            this.node.setPosition(this.getContentSize().width / 2, this.getContentSize().height / 2);
        }
    }
    export class ModelLayer extends Layer {
        public node: cc.Node = null;
        ctor() {
            super.ctor();
        }
        maskBg: cc.Layer = null;
        isTouchMaskHide: boolean = true;
        initWithccs(path?: string, full: boolean = true) {
            super.initWithccs(path, full);
            let self = this;
            this.maskBg = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "maskbg");
            if (this.maskBg) {
                this.maskBg.on(kaayou.TouchEvent.TouchEnd, function () {
                    if (self.isTouchMaskHide) {
                        self.Hide();
                    }
                }, this)
            }
        }
        Hide() {
            this.setVisible(false);
        }
    }

    export class LayerSeq{
        static __INS__: LayerSeq = null;
        static getInstance(): LayerSeq {
            if (LayerSeq.__INS__ == null) {
                LayerSeq.__INS__ = new LayerSeq();
            }
            return LayerSeq.__INS__;
        }

        layerSeq:string[]=[];

        addLayerSeq(layerName:string){
            this.layerSeq.push(layerName);
        }

        closeTopLayer(){
            this.layerSeq.splice(0,1);
            let layerName=this.layerSeq[0];
            if(!!layerName) kaayou.emit("common","ui::Layer::Show",layerName);
        }

        getTopLayer(){
            return this.layerSeq[0];
        }
    }
}