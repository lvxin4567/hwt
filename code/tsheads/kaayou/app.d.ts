declare var unzipWechatResource: (loaded: any, onProgress: any) => void;
declare namespace kaayou {
    class LauncherView extends kaayou.Layer {
        constructor();
        label_description: ccui.Text;
        progressBar: ccui.LoadingBar;
        label_progress: ccui.Text;
        initUI(): void;
        setDescription(str: string): void;
        showProgressBar(): void;
        hideProgressBar(): void;
        setPercent(num: number): void;
    }
    class PreloadScene extends MainScene {
        constructor();
        __launcherView: LauncherView;
        initUI(): void;
        _label: cc.LabelTTF;
        cb: Function;
        initUI_wechat(cb: Function): void;
        onLoadBg(): void;
        onLoadRes(): void;
    }
    export class App {
        static __INS__: App;
        static getInstance(): App;
        static isAppleExamineVersion: boolean;
        static version: string;
        constructor();
        _preloadScene: PreloadScene;
        init(): void;
        __rscriptErr: Array<string>;
        getRequireScriptErr(): string[];
        requireScriptErr(path: string): void;
        isBackground: boolean;
        onLoadPreload(cb?: any): void;
        onPreLoadSucceed(): void;
        loadModules(): void;
        getWebGameModule(): void;
        getNativeGameModule(): void;
        loadJsList(gamemodulelistPath: any): void;
        loadResource(): void;
        startGame(): void;
        PostBugly(val0: string, val1?: string, val2?: string): void;
    }
    export {};
}
