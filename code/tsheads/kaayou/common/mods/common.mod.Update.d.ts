/// <reference path="common.mod.Config.d.ts" />
declare namespace kaayou {
    function LobbyToGame(name: any): void;
    function GameToLobby(): void;
    function LobbyToRecord(name: any): void;
}
declare namespace common {
    namespace mod {
        class LocalPackage {
            static uzipSubGame(pakegeName: string, call: Function): boolean;
        }
        class Update {
            static isload: boolean;
            static versionCompareHandle(versionA: string, versionB: string): number;
            static UpdateApp(): Promise<boolean>;
            static loadNewModule(modulename: any, call: any): void;
            static callOnce(call: any): Promise<void>;
            static DeleteTempDir(name: any): void;
            /**
                *
                * @param name      包的key
                * @param remoteVs  包远程版本(大厅传空数据保持原来的方式，子游戏传远程版本)
                * @param call      回调函数
            */
            static ExistsSubGame(name: any, remoteVs: any, call: any): Promise<any>;
            static UpdateLobby(call: Function): Promise<any>;
        }
        class HotUpdate {
            _am: jsb.AssetsManager;
            gameName: string;
            baseurl: string;
            sceneName: string;
            subgameSettings: any;
            zipUrlSize: number;
            _storagePath: any;
            __successCallBack: any;
            __errorCallBack: any;
            isUpdating: boolean;
            _updateListener: any;
            subGameRemoteVs: any;
            constructor(baseurl: any, gameName: any, subGameRemoteVs: any, successCallBack: any, errorCallBack: any);
            run(): void;
            callSuccess(bRestart: boolean): void;
            callError(errstr: string): void;
            checkCb(event: jsb.EventAssetsManager): void;
            static checkNeedUpdate(remoteVersion: string): void;
        }
    }
}
