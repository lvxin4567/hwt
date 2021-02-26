/// <reference path="kaayou.DirectScene.ts" />
namespace kaayou {

    export class UIManager {

        static __INS__: UIManager = null;
        static getInstance() {
            if (UIManager.__INS__ == null) {
                UIManager.__INS__ = new UIManager();
                UIManager.__INS__.init();
            }
            return UIManager.__INS__;
        }
        init() { }
        Scenes: { [key: string]: typeof kaayou.kScene } = {};
        installScene(name: string, scene: typeof kaayou.kScene) {
            name = name.toUpperCase();
            this.Scenes[name] = scene;
        }
        uninstallScene(name: string) {
            name = name.toUpperCase();
            if (this.runingScenes[name]) {
                this.runingScenes[name].removeFromParent();
                delete this.runingScenes[name];
            }
            delete this.Scenes[name];
        }
        _MainScene: MainScene = null;
        public setMainScene(sc: MainScene) {
            this._MainScene = sc;
            sc.initUI();
            cc.director.runScene(sc);

        }
        public getMainScene(): MainScene {
            return this._MainScene;
        }

        protected runingScenes: { [key: string]: kaayou.kScene } = {};
        protected szIndex = 10000;
        protected __curRuningSceneName: string = "";
        public runScene(name: string) {
            name = name.toUpperCase();
            if (!this.Scenes[name]) { console.log('没有该场景资源'); return; }
            if (!this.runingScenes[name]) {
                let scene = new (this.Scenes[name])();
                this.runingScenes[name] = scene;
                //cc.director.getRunningScene().addChild(scene,10000);
                this.getMainScene().getSceneLayer().addChild(scene, ++this.szIndex);
                this.runingScenes[name].setVisible(false);
            } else if (this.runingScenes[name].isVisible()) {
                console.log('切换到自己场景 ' + name);
                this.runingScenes[name].onReExit();
                this.runingScenes[name].onReEnter();
                return;
            } else {
                this.runingScenes[name].setLocalZOrder(++this.szIndex);
            }
            let self = this;
            self.__curRuningSceneName = name;
            let lastNames = [];
            lodash.forEach(this.runingScenes, function (s, k) {
                if (k == name) {
                    self.runingScenes[k].setVisible(true);
                } else {
                    if (self.runingScenes[k].isVisible()) {
                        lastNames.push(k);
                    }
                }
            });
            this.runingScenes[name].onReEnter();
            for (var x in lastNames) {
                this.runingScenes[lastNames[x]].onReExit();
                this.runingScenes[lastNames[x]].setVisible(false);
            }
        }

        public preLoadScene(name: string) {
            name = name.toUpperCase();
            if (!this.Scenes[name]) { console.log('没有该场景资源' + name); return; }
            if (!this.runingScenes[name]) {
                let scene = new (this.Scenes[name])();
                this.runingScenes[name] = scene;
                this.getMainScene().getSceneLayer().addChild(scene, ++this.szIndex);
                this.runingScenes[name].setVisible(false);
                let minName = this.__getMinSceneName();
                if (lodash.isEmpty(minName)) {
                    this.runingScenes[name].setLocalZOrder(++this.szIndex);
                    return;
                } else {
                    this.runingScenes[name].setLocalZOrder(this.runingScenes[minName].getLocalZOrder() - 1);
                }
            }
        }


        public getCurRuningScene() {
            let self = this;
            if (self.__curRuningSceneName == "") { return null; }
            return this.runingScenes[self.__curRuningSceneName] || null;
        }

        public getCurRuningSceneName() {
            let self = this;
            return self.__curRuningSceneName;
        }

        private __getMinSceneName() {
            if (lodash.size(this.runingScenes) < 1) {
                return;
            }
            let arr = this.__getRuningSceneArray();
            return arr[0].name;
        }

        private __getRuningSceneArray(): Array<{ name: string, order: number }> {
            let arr: Array<{ name: string, order: number }> = [];
            for (var x in this.runingScenes) {
                arr.push({
                    name: x,
                    order: this.runingScenes[x].getLocalZOrder()
                });
            }
            arr = lodash.sortBy(arr, ['order']);
            return arr;
        }

        //不传参则代表最上层的场景
        public popScene(name: string = null) {

            if (lodash.size(this.runingScenes) < 2) {
                return;
            }

            if (name != null && lodash.isEmpty(this.runingScenes[name])) {
                return;
            }

            let self = this;
            let arr = this.__getRuningSceneArray();

            let maxSceneName: string = arr[arr.length - 1].name;
            if (maxSceneName == "login".toUpperCase()) {
                console.error("已经到最底层了");
                return;
            }

            let secondSceneName = arr[arr.length - 2].name;
            let minSceneName = arr[0].name;

            if (lodash.isEmpty(name)) {
                name = maxSceneName;
            }

            if (name != maxSceneName) {
                //如果name场景不是最上层场景 ，将需要pop的场景挪到最底层去
                self.runingScenes[name].setLocalZOrder(self.runingScenes[minSceneName].getLocalZOrder() - 1);
                self.runingScenes[name].onReExit();
                self.runingScenes[name].setVisible(false);
            } else {
                self.__curRuningSceneName = secondSceneName;
                self.runingScenes[maxSceneName].setLocalZOrder(self.runingScenes[minSceneName].getLocalZOrder() - 1);
                let lastNames = [];
                lodash.forEach(this.runingScenes, function (s, k) {
                    if (k == self.__curRuningSceneName) {
                        self.runingScenes[k].setVisible(true);
                    } else {
                        if (self.runingScenes[k].isVisible()) {
                            lastNames.push(k);
                        }
                    }
                });

                for (var x in lastNames) {
                    this.runingScenes[lastNames[x]].onReExit();
                    this.runingScenes[lastNames[x]].setVisible(false);
                }

            }
        }



        public hasScene(name: string) {
            name = name.toUpperCase();
            if (!this.Scenes[name]) { console.log('没有该场景资源'); return false; }
            return !!this.runingScenes[name];
        }
    }

}