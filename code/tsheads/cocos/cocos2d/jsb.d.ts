/// <reference path="cocos2d-lib.d.ts" />


/**
 * The namespace for jsb exclusive APIs, all APIs in this namespace should never be used in Web engine.
 * So please check whether the running environment is native or not before any usage.
 * @namespace
 * @name jsb
 * @example
 *
 * if(cc.sys.isNative) {
 *     cc.log(cc.fileUtils.fullPathForFilename("test.js"));
 * }
 */
declare namespace jsb {
    // TODO: This is probably a bad idea to declare these as enums (since they clearly are not TS enums), but let's try it out and at least see if the values resolve properly
    export enum DiffType {
        ADDED,
        DELETED,
        MODIFIED
    }

    export enum DownloadState {
        UNSTARTED,
        DOWNLOADING,
        SUCCESSED
    }

    // export enum EventCode {
    //     ERROR_NO_LOCAL_MANIFEST,
    //     ERROR_DOWNLOAD_MANIFEST,
    //     ERROR_PARSE_MANIFEST,
    //     NEW_VERSION_FOUND,
    //     ALREADY_UP_TO_DATE,
    //     UPDATE_PROGRESSION,
    //     ASSET_UPDATED,
    //     ERROR_UPDATING,
    //     UPDATE_FINISHED,
    //     UPDATE_FAILED,
    //     ERROR_DECOMPRESS,
    // }

    export enum ErrorCode {
        CREATE_FILE,
        NETWORK,
        NO_NEW_VERSION,
        UNCOMPRESS
    }

    export enum State {
        UNCHECKED,
        PREDOWNLOAD_VERSION,
        DOWNLOADING_VERSION,
        VERSION_LOADED,
        PREDOWNLOAD_MANIFEST,
        DOWNLOADING_MANIFEST,
        MANIFEST_LOADED,
        NEED_UPDATE,
        UPDATING,
        UP_TO_DATE,
        FAIL_TO_UPDATE
    }



    /**
     * ATTENTION: USE jsb.fileUtils INSTEAD OF jsb.FileUtils.
     * jsb.fileUtils is the native file utils' singleton object,
     * please refer to Cocos2d-x's API to know how to use it.
     * Only available in JSB
     * @class
     * @name jsb.fileUtils
     * @extend cc.Class
     */
    //jsb.fileUtils = /** @lends jsb.fileUtils# */{
    export const fileUtils: FileUtils;

    export class FileUtils {

        /**
         * @function fullPathForFilename
         * @param {String} filename
         * @return {String}
         */
        public fullPathForFilename(filename: string): string;

        /**
         * @function getStringFromFile
         * @param {String} filename
         * @return {String}
         */
        public getStringFromFile(filename: string): string;

        /**
         * @function removeFile
         * @param {String} filepath
         * @return {boolean}
         */
        public removeFile(filepath: string): boolean;

        /**
         * @function isAbsolutePath
         * @param {String} path
         * @return {boolean}
         */
        public isAbsolutePath(path: string): boolean;

        /**
         * @function renameFile
         * @param {String} path or old full path
         * @param {String} oldname or new full path
         * @param {String} [name] new name
         * @return {boolean}
         */
        public renameFile(path: string, oldname: string, name?: string): boolean;

        /**
         * @function loadFilenameLookupDictionaryFromFile
         * @param {String} filename
         */
        public loadFilenameLookupDictionaryFromFile(filename: string): void;

        /**
         * @function isPopupNotify
         * @return {boolean}
         */
        public isPopupNotify(): boolean;

        /**
         * @function getValueVectorFromFile
         * @param {String} arg0
         * @return {Array}
         * TODO: Figure out exactly what data type this is, not quite sure yet and this isn't in the C++ FileUtils API docs...
         */
        public getValueVectorFromFile(arg0: string): any[];

        /**
         * @function getSearchPaths
         * @return {Array}
         */
        public getSearchPaths(): string[];

        /**
         * @function writeToFile
         * @param {{}} dict
         * @param {String} fullPath
         * @return {boolean}
         */
        public writeToFile(dict: {}, fullPath: string): boolean;

        /**
         * @function getValueMapFromFile
         * @param {String} filename
         * @return {{}}
         */
        public getValueMapFromFile(filename: string): {};

        /**
         * @function getFileSize
         * @param {String} filepath
         * @return {number}
         */
        public getFileSize(filepath: string): number;

        /**
         * @function removeDirectory
         * @param {String} dirPath
         * @return {boolean}
         */
        public removeDirectory(dirPath: string): boolean;

        /**
         * @function setSearchPaths
         * @param {Array} searchPaths
         */
        public setSearchPaths(searchPaths: string[]): void;

        /**
         * @function writeStringToFile
         * @param {String} dataStr
         * @param {String} fullPath
         * @return {boolean}
         */
        public writeStringToFile(dataStr: string, fullPath: string): boolean;

        /**
         * @function setSearchResolutionsOrder
         * @param {Array} searchResolutionsOrder
         */
        public setSearchResolutionsOrder(searchResolutionsOrder: string[]): void;

        /**
         * @function addSearchResolutionsOrder
         * @param {String} order
         * TODO: This does not match the C++ API, expected an optional bool argument here
         */
        public addSearchResolutionsOrder(order: string, front?: boolean): void;

        /**
         * @function addSearchPath
         * @param {String} path
         * TODO: This does not match the C++ API, expected an optional bool argument here
         */
        public addSearchPath(path: string, front?: boolean): void;

        /**
         * @function isFileExist
         * @param {String} filename
         * @return {boolean}
         */
        public isFileExist(filename: string): boolean;

        /**
         * @function purgeCachedEntries
         */
        public purgeCachedEntries(): void;

        /**
         * @function fullPathFromRelativeFile
         * @param {String} filename
         * @param {String} relativeFile
         * @return {String}
         */
        public fullPathFromRelativeFile(filename: string, relativeFile: string): string;

        /**
         * @function isDirectoryExist
         * @param {String} dirPath
         * @return {boolean}
         */
        public isDirectoryExist(dirPath: string): boolean;

        /**
         * @function getSearchResolutionsOrder
         * @return {Array}
         */
        public getSearchResolutionsOrder(): string[];

        /**
         * @function createDirectory
         * @param {String} dirPath
         * @return {boolean}
         */
        public createDirectory(dirPath: string): boolean;

        /**
         * @function createDirectories
         * @param {String} dirPath
         * @return {boolean}
         * TODO: This arguments list doesn't even make sense, I'd expect an array of strings. Look into this later on.
         */
        public createDirectories(dirPath: string): boolean;

        /**
         * @function getWritablePath
         * @return {String}
         */
        public getWritablePath(): string;

        /**
         * @function listFiles
         * @param {String} dirPath
         * @return {String[]}
         */
        public listFiles(dirPath: string): string[];

        /**
         * @function getDefaultResourceRootPath
         * 
         * @return {String}
         */
        public getDefaultResourceRootPath(): string;


        /**
       * @function getOriginalSearchPaths
       * 
       * @return {String}
       */
        public getOriginalSearchPaths(): string;


        /**
       * @function getNewFilename
       * @param {String} filePath
       * @return {String}
       */
        public getNewFilename(filePath: string): string;


        /**
        * @function getValueMapFromData
        * @param {String} filePath
        * @return {String}
        */
        public getValueMapFromData(filePath: string, v: number): any;


        /**
         * @function writeValueVectorToFile
         * @param {String} filePath
         * @return {String}
         */
        public writeValueVectorToFile(data: Array<any>, path: string, func?: Function): any;


        /**
         * @function purgeCachedEntries
         * //清理缓存的路径
         * @return {String}
         */
        public purgeCachedEntries(): void;

        /**
         * @function writeValueVectorToFile
         * @param {String} filePath
         * @return {String}
         */
        public getFileExtension(filePath: string): any;

        /**
           * @function setWritablePath
           * @param {String} filePath
           * @return {boolean}
           */
        public setWritablePath(filePath: string): boolean;


        /**
         * @function setPopupNotify
         * @param {boolean} b
         * @return {boolean}
         */
        public setPopupNotify(b: boolean);

        /**
           * @function listFilesRecursively
           * @param {boolean} dirPath
           * @param {Array<string>} filelist out
           * @return {boolean}
           */

        public listFilesRecursively(dirPath: string, filelist: Array<any>);
        /*
            // 暂时懒得添加的   JS_FN("writeValueMapToFile", js_cocos2dx_FileUtils_writeValueMapToFile, 2, JSPROP_PERMANENT | JSPROP_ENUMERATE),
            JS_FN("setDefaultResourceRootPath", js_cocos2dx_FileUtils_setDefaultResourceRootPath, 1, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        */
    }

    /**
     * @class
     */
    //jsb.EventAssetsManager = cc.Class.extend(/** @lends jsb.EventAssetsManager# */{

    export class EventAssetsManager extends cc.Class {


        /**
         * @function EventAssetsManager
         * @constructor
         * @param {String} eventName
         * @param {AssetsManager} manager
         * @param {EventCode} code
         * @param {number} [percent]
         * @param {number} [percentByFile]
         * @param {String} [assetId]
         * @param {String} [message]
         * @param {number} [curle_code]
         * @param {number} [curlm_code]
         */
        public constructor(
            eventName: string,
            manager: AssetsManager,
            code: EventCode,
            percent?: number,
            percentByFile?: number,
            assetId?: string,
            message?: string,
            curle_code?: number,
            curlm_code?: number);

        /**
         * @function getAssetsManager
         * @return {AssetsManager}
         */
        public getAssetsManager(): AssetsManager;

        public getDownloadedFiles(): number;

        /**
         * @function getAssetId
         * @return {String}
         */
        public getAssetId(): string;

        /**
         * @function getCURLECode
         * @return {int}
         */
        public getCURLECode(): number;

        /**
         * @function getMessage
         * @return {String}
         */
        public getMessage(): string;

        /**
         * @function getCURLMCode
         * @return {int}
         */
        public getCURLMCode(): number;

        /**
         * @function getPercentByFile
         * @return {number}
         */
        public getPercentByFile(): number;

        /**
         * @function getEventCode
         * @return {EventCode}
         */
        public getEventCode(): EventCode;

        /**
         * @function getPercent
         * @return {number}
         */
        public getPercent(): number;

    }

    /**
     * @class
     */
    export class EventListenerAssetsManager extends cc.Class {
        /**
         * @function init
         * @param {AssetsManager} assetsmanager
         * @param {function} callback
         * @return {boolean}
         */
        public init(assetsmanager: AssetsManager, callback: (mgr: EventAssetsManager) => void): boolean;

        /**
         * @function create
         * @param {AssetsManager} assetsmanager
         * @param {function} callback
         * @return {EventListenerAssetsManager}
         */
        public static create(assetsmanager: AssetsManager, callback: (mgr: EventAssetsManager) => void): EventListenerAssetsManager;
    }

    /**
     * @class
     * jsb.AssetsManager is the native AssetsManager for your game resources or scripts.
     * please refer to this document to know how to use it: http://www.cocos2d-x.org/docs/manual/framework/html5/v3/assets-manager/en
     * Only available in JSB
     */
    export class AssetsManager extends cc.Class {
        /**
         * @function getState
         * @return {State}
         */
        public getState(): State;

        /**
         * @function checkUpdate
         */
        public checkUpdate(): void;

        /**
         * @function getStoragePath
         * @return {String}
         */
        public getStoragePath(): string;

        /**
         * @function update
         */
        public update(): void;

        /**
         * @function getLocalManifest
         * @return {jsb.Manifest}
         */
        public getLocalManifest(): Manifest;

        /**
         * @function getRemoteManifest
         * @return {jsb.Manifest}
         */
        public getRemoteManifest(): Manifest;

        /**
         * @function downloadFailedAssets
         */
        public downloadFailedAssets(): void;
        setMaxConcurrentTask(i: number);
        /**
         * @function create
         * @param {String} manifestUrl
         * @param {String} storagePath
         * @return {jsb.AssetsManager}
         */
        public static create(manifestUrl: string, storagePath: string, f?: Function): AssetsManager;

        /**
         * @function AssetsManager
         * @constructor
         * @param {String} manifestUrl
         * @param {String} storagePath
         */
        public ctor(manifestUrl: string, storagePath: string): void;
        public ctor(): void;
        retain();
        loadLocalManifest(manifestUrl: string);
        loadLocalManifest(localManifest: Manifest, storagePath: string);
    }

    /**
     * @class
     */
    export class Manifest extends cc.Class {
        /**
         * @function getManifestFileUrl
         * @return {String}
         */
        public getManifestFileUrl(): string;

        /**
         * @function isVersionLoaded
         * @return {boolean}
         */
        public isVersionLoaded(): boolean;

        /**
         * @function isLoaded
         * @return {boolean}
         */
        public isLoaded(): boolean;

        /**
         * @function getPackageUrl
         * @return {String}
         */
        public getPackageUrl(): string;

        /**
         * @function getVersion
         * @return {String}
         */
        public getVersion(): string;

        /**
         * @function getVersionFileUrl
         * @return {String}
         */
        public getVersionFileUrl(): string;

        constructor(content: string, manifestRoot: string)

    }

    // TODO: I don't know the best way to represent this, because I can't find a reference in the C++ docs. Just do this for now, fix it later on.
    /**
     * jsb.reflection is a bridge to let you invoke Java static functions.
     * please refer to this document to know how to use it: http://www.cocos2d-x.org/docs/manual/framework/html5/v3/reflection/en
     * Only available on iOS/Mac/Android platform
     * @class
     * @name jsb.reflection
     */
    export namespace reflection {
        /**
         * @function
         */
        export function callStaticMethod(...agrs): any;
    }



}

declare namespace cc {

    export namespace spriteFrameCache {
        export function reloadTexture(url: string): boolean;
        export function addSpriteFramesWithFileContent(plist_content: string, texture: cc.Texture2D);
        export function addSpriteFrame(frame: cc.SpriteFrame, frameName: string);
        export function addSpriteFrames(plist: string, textureFileName?: string);
        export function getSpriteFrame(name: string);
        export function removeSpriteFramesFromFile(plist: string);
        export function init();
        export function removeSpriteFrames();
        export function removeUnusedSpriteFrames();
        export function removeSpriteFramesFromFileContent(plist_content: string);
        export function removeSpriteFrameByName(name: string);
        export function isSpriteFramesWithFileLoaded(plist: string);
        export function removeSpriteFramesFromTexture(texture: cc.Texture2D);
    }

    export namespace textureCache {
        export function reloadTexture(url: string): boolean;
        export function unbindAllImageAsync();
        export function removeTextureForKey(textureKeyName: string);
        export function removeAllTextures();
        export function addImageAsync(path: string, callback: Function, callbackKey: string);
        export function getDescription(): string;
        export function getCachedTextureInfo(): string;
        export function addImage(path: string): cc.Texture2D;
        export function unbindImageAsync(callbackKey: string);
        export function getTextureForKey(textureKeyName: string): cc.Texture2D;
        export function getTextureFilePath(texture: cc.Texture2D): string;
        export function renameTextureWithKey(srcName: string, dstName: string);
        export function removeUnusedTextures();
        export function removeTexture(texture: cc.Texture2D);
        export function waitForQuit();
    }
    export namespace animationCache {
        export function purgeSharedAnimationCache();

    }

}