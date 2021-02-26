/// <reference path="decorator.d.ts" />
/// <reference path="event.d.ts" />
/// <reference path="kaayou.ControllerManager.d.ts" />
declare namespace kaayou {
    function isDevBrowser(): boolean;
    class DataSet {
        static set(key: string, value: string): any;
        static get(key: string): any;
    }
    function cc_extend(): void;
    function getController(name?: string): kaayou.EventDispatcher;
    function uninstallController(name: string): boolean;
    function emit(cname: string, head: string, data?: any, ack?: boolean, callback?: any, target?: any): Promise<unknown>;
}
declare namespace jsb {
    enum EventCode {
        ERROR_NO_LOCAL_MANIFEST = 0,
        ERROR_DOWNLOAD_MANIFEST = 1,
        ERROR_PARSE_MANIFEST = 2,
        NEW_VERSION_FOUND = 3,
        ALREADY_UP_TO_DATE = 4,
        UPDATE_PROGRESSION = 5,
        ASSET_UPDATED = 6,
        ERROR_UPDATING = 7,
        UPDATE_FINISHED = 8,
        UPDATE_FAILED = 9,
        ERROR_DECOMPRESS = 10
    }
}
