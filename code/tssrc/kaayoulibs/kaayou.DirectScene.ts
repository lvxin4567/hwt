/// <reference path="extend.ts" />
namespace kaayou {
    const { ccclass } = kaayou._decorator;
    @ccclass
    export class DirectScene extends cc.Scene {
        ctor() {
            super.ctor();
        }
    }

    export abstract class MainScene extends DirectScene {

        public _sceneLayer: cc.Layer = null;
        constructor() {
            super();
            this._sceneLayer = new cc.Layer();
            this._sceneLayer.setContentSize(cc.winSize);
            this._sceneLayer.setAnchorPoint(0, 0);
            this._sceneLayer.setPosition(0, 0);
            this.addChild(this._sceneLayer, 0);
        }
        abstract initUI(...args);
        public getSceneLayer(): cc.Layer {
            return this._sceneLayer;
        }

    }


}