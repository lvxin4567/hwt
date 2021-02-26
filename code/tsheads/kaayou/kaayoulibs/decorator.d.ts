/// <reference path="extendJS.d.ts" />
declare namespace kaayou {
    namespace _decorator {
        var ccclass: (target: any) => any;
        function BindEvent(coname: any, keyStr: any): (target: any, propertyKey: any, descriptor: any) => void;
        function CustomBindEvetn(coname: any, keyStr: any, func: any, target: any): void;
        function doOffEvents(target: any, propertyKey: any, descriptor: any): any;
        function doBindEvent(target: any, propertyKey: any, descriptor: any): any;
    }
}
