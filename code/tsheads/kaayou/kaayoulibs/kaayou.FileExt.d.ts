/// <reference path="extend.d.ts" />
declare namespace kaayou {
    function addLog(msg: string): void;
    function getImageCachePath(): string;
    function getLog(): any;
    function getLogFile(): string;
    function getLogPath(): string;
    function getRemotePath(): string;
    function getLobbyVersion(): any;
    function getSubGameVersion(pakegeName: any): any;
    function sendLog(): void;
    function unZipAssetsPath(call: Function, progressCall?: Function): any;
    function ExistModule(modeulename: any): {
        name: any;
        project: string;
        search: string;
        full: string;
        relative: string;
    };
    function getLocalModules(): Array<{
        name: string;
        project: string;
        search: string;
        full: string;
        relative: string;
    }>;
}
