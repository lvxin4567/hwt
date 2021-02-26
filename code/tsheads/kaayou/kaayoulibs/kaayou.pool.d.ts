declare namespace kaayou {
    namespace pool {
        function putInPool(obj: any): void;
        function putAllChildrenInPool(obj: cc.Node): void;
        function hasObject(objClass: any): boolean;
        function removeObject(obj: any): void;
        function removeClass(objClass: any): void;
        function getFromPool(objClass: any, ...arg: any[]): any;
        function drainAllPools(): void;
    }
}
