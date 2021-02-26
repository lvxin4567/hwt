/// <reference path="extend.d.ts" />
declare namespace kaayou {
    class Layer extends cc.Layer {
        _moduleName: string;
        node: cc.Node;
        ctor(): void;
        getModuleName(): string;
        initWithccs(path?: string, full?: boolean): void;
        setModuleName(moduleName?: string): void;
    }
    class Block extends ccui.Layout {
        node: cc.Node;
        ctor(): void;
        _moduleName: string;
        setModuleName(moduleName?: string): void;
        getModuleName(): string;
        initWithccs(path?: string, ...args: any[]): void;
        initWithNode(node: ccui.Widget, ...args: any[]): void;
        initWithNodeAndCleanup(node: ccui.Widget, ...args: any[]): void;
        initWithNodeNoClone(node: cc.Node, ...args: any[]): void;
    }
    class ModelLayer extends Layer {
        node: cc.Node;
        ctor(): void;
        maskBg: cc.Layer;
        isTouchMaskHide: boolean;
        initWithccs(path?: string, full?: boolean): void;
        Hide(): void;
    }
    class LayerSeq {
        static __INS__: LayerSeq;
        static getInstance(): LayerSeq;
        layerSeq: string[];
        addLayerSeq(layerName: string): void;
        closeTopLayer(): void;
        getTopLayer(): string;
    }
}
