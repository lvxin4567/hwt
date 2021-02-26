/// <reference path="kaayou.DirectScene.d.ts" />
declare namespace kaayou {
    class UIManager {
        static __INS__: UIManager;
        static getInstance(): UIManager;
        init(): void;
        Scenes: {
            [key: string]: typeof kaayou.kScene;
        };
        installScene(name: string, scene: typeof kaayou.kScene): void;
        uninstallScene(name: string): void;
        _MainScene: MainScene;
        setMainScene(sc: MainScene): void;
        getMainScene(): MainScene;
        protected runingScenes: {
            [key: string]: kaayou.kScene;
        };
        protected szIndex: number;
        protected __curRuningSceneName: string;
        runScene(name: string): void;
        preLoadScene(name: string): void;
        getCurRuningScene(): kScene;
        getCurRuningSceneName(): string;
        private __getMinSceneName;
        private __getRuningSceneArray;
        popScene(name?: string): void;
        hasScene(name: string): boolean;
    }
}
