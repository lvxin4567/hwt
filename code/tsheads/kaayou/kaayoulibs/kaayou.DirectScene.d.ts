/// <reference path="extend.d.ts" />
declare namespace kaayou {
    class DirectScene extends cc.Scene {
        ctor(): void;
    }
    abstract class MainScene extends DirectScene {
        _sceneLayer: cc.Layer;
        constructor();
        abstract initUI(...args: any[]): any;
        getSceneLayer(): cc.Layer;
    }
}
