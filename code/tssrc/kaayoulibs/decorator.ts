
/// <reference path="extendJS.ts" />
namespace kaayou {
    var _global = typeof window === 'undefined' ? global : window;
    _global.lodash = require("lodash");
    export namespace _decorator {

        var _decoratorID = (0 | (Math.random() * 998));
        function getNewDecoratorID(): number {
            return _decoratorID++;
        }

        function getTargetDecoratorID(target): number {
            var did = 0;
            if (target.constructor.hasOwnProperty('__decoratorid')) {
                did = target.constructor.__decoratorid;
            }
            // if (target.constructor.name == 'CreateRoomPanel') {
            //     console.error("CreateRoomPanel", did)
            // }
            if (!did) {
                did = getNewDecoratorID();
                target.constructor.__decoratorid = did;
            }
            return did;
        }

        function getSuper(ctor) {
            var proto = ctor.prototype; // binded function do not have prototype
            var dunderProto = proto && Object.getPrototypeOf(proto);
            return dunderProto && dunderProto.constructor;
        }



        function checkCtorArgument(decorate) {
            return function (target) {
                if (typeof target === 'function') {
                    // no parameter, target is ctor
                    return decorate(target);
                }
                return function (ctor) {
                    return decorate(ctor, target);
                };
            };
        }
        export var ccclass = checkCtorArgument(function (ctor, name) {
            var base = getSuper(ctor);
            if (base === Object) {
                base = null;
            }
            ;
            var reobnames = Object.getOwnPropertyNames(ctor.prototype);
            var reob = {};

            // console.log(reobnames);
            for (var x in reobnames) {
                reob[reobnames[x]] = ctor.prototype[reobnames[x]];
            }
            // console.log(reob);
            // Object.getOwnPropertyDescriptor()
            var res = base.extend(reob)//   ctor.extend(base);// cc.Scene.extend(ctor);
            res._classname = ctor.name;
            return res;
        });

        // interface AutoBindEventTagert {
        //     eventkey: string;
        //     propertyKey: string;
        // };


        // interface EventTagertMap<Stringh,EventTagertArray>
        type AutoBindEventTagert = { [key: string]: string };
        type EventTagertMap = { [key: string]: AutoBindEventTagert };
        type EventTagertMapArray = { [key: string]: EventTagertMap };

        let g_eventTagertArray: EventTagertMapArray = {};

        function addAutoBindBindEventData(target, conname, eventkey, propertyKey) {
            var did = getTargetDecoratorID(target);
            g_eventTagertArray[did] = g_eventTagertArray[did] || {};
            g_eventTagertArray[did][conname] = g_eventTagertArray[did][conname] || {};
            g_eventTagertArray[did][conname][eventkey] = propertyKey;
        }


        // function getAutoBindBindEventData(classname, conname, eventkey, propertyKey) {

        //     if(!g_eventTagertArray[classname]){return null;}

        //     g_eventTagertArray[classname] = g_eventTagertArray[classname] || {};
        //     g_eventTagertArray[classname][conname] = g_eventTagertArray[classname][conname] || {};
        //     g_eventTagertArray[classname][conname][eventkey] = propertyKey;
        // }


        export function BindEvent(coname, keyStr) {
            return function (target, propertyKey, descriptor) {
                let classname = target.constructor.name;

                addAutoBindBindEventData(target, coname, keyStr, propertyKey);
                // let classname = target.constructor.name;
                // g_eventTagertArray[classname] = g_eventTagertArray[classname] || {};
                // g_eventTagertArray[classname][coname] = {}

                // if (!target["_@eventTagertArray"]) {
                //     target["_@eventTagertArray"] = {};
                // }
                // target["_@eventTagertArray"][keyStr] = {
                //     coname: coname,
                //     call: descriptor.value//target[propertyKey]
                // };
                // return descriptor.value;
            };
        }

        export function CustomBindEvetn(coname, keyStr, func, target) {

            if (!target["_@eventTagertArray"]) {
                target["_@eventTagertArray"] = {};
            }
            target["_@eventTagertArray"][keyStr] = {
                coname: coname,
                call: func
            };

        }













        function __AutoOffEvent(target, eventArray) {

            let classname = target.constructor.name;
            var did = getTargetDecoratorID(target);

            if (lodash.isEmpty(eventArray[did])) { return; }
            lodash.forEach(eventArray[did], function (karr, coname) {
                lodash.forEach(karr, function (propertyKey, eventkey) {
                    if (target[propertyKey]) {
                        let funcall = target[propertyKey];
                        kaayou.getController(coname).offBytarger(eventkey, target);
                    }
                })
            })
        }



        export function doOffEvents(target, propertyKey, descriptor) {

            let oldFunc: Function = descriptor.value;
            descriptor.value = function (...agrs) {
                if (this["_@isBindInit"]) {
                    __AutoOffEvent(this, g_eventTagertArray)
                    delete this["_@isBindInit"];
                }
                return oldFunc.apply(this, agrs);
            }
            return descriptor;

            /*
            target["_@__" + propertyKey] = target[propertyKey];
            target[propertyKey] = function () {
                if (target["_@bindEvent"]) {
                    if (this["_@eventTagertArray"]) {
                        let eventTagertArray: Array<EventTagertArray> = this["_@eventTagertArray"];
                        for (var x in eventTagertArray) {
                            (function (keyStr: string, coname: string, curtarget) {
                                // console.log(keyStr);
                                kaayou.getController(coname).offBytarger(keyStr, curtarget);
                            })(x, eventTagertArray[x].coname, this);
                        }
                    }
                    if (this["_@queue_eventTagertArray"]) {
                        let queue_eventTagertArray: Array<EventTagertArray> = this["_@queue_eventTagertArray"];
                        for (var x in queue_eventTagertArray) {
                            (function (keyStr: string, coname: string, curtarget) {
                                // console.log(keyStr);
                                kaayou.getController(coname).offBytarger(keyStr, curtarget);
                            })(x, queue_eventTagertArray[x].coname, this);
                        }
                    }
                }
                this["_@__" + propertyKey].apply(this, arguments);
            }
            return target[propertyKey];
    
            */
        }








        function __AutoBindEvent(target, eventArray) {
            let classname = target.constructor.name;


            var did = getTargetDecoratorID(target);


            if (lodash.isEmpty(eventArray[did])) { return; }

            lodash.forEach(eventArray[did], function (karr, coname) {
                lodash.forEach(karr, function (propertyKey, eventkey) {

                    if (target[propertyKey]) {
                        let funcall = target[propertyKey];
                        kaayou.getController(coname).on(eventkey, function (e: kaayou.Event) {
                            var __ack = null;
                            if (e.data) {
                                if (e.data['@ack']) {
                                    __ack = e.data['@ack'];
                                    delete e.data['@ack'];
                                    e.data = e.data['@original'];
                                }
                            }
                            if (__ack) {
                                let resulet = funcall.apply(target, [e.data]);
                                __ack(resulet);
                            } else {
                                funcall.apply(target, [e.data]);
                            }

                        }, target);
                    }
                })
            })
        }




        export function doBindEvent(target, propertyKey, descriptor) {

            let oldFunc: Function = descriptor.value;

            descriptor.value = function (...agrs) {
                if (lodash.isUndefined(this["_@isBindInit"])) {
                    __AutoBindEvent(this, g_eventTagertArray);
                    this["_@isBindInit"] = true;
                }
                return oldFunc.apply(this, agrs);
            }

            return descriptor;
            /*
            var i = 1;
            if (target.constructor && target.constructor.prototype) {
                target = target.constructor.prototype;
            }
            console.log(target.constructor)
            if (!target["_@bindEvent"]) {
                target["_@isBindInit"] = false;
                target["_@bindEvent"] = function () {
                    console.log(32424423, this);
                    if (this["_@isBindInit"] == true) { return; }
                    this["_@isBindInit"] = true;
                    if (this["_@eventTagertArray"]) {
                        let eventTagertArray: Array<EventTagertArray> = this["_@eventTagertArray"];
                        for (var x in eventTagertArray) {
                            (function (keyStr: string, coname: string, funcall: Function, curtarget) {
                                // console.log(keyStr);
                                kaayou.getController(coname).on(keyStr, function (e: kaayou.Event) {
                                    var __ack = null;
                                    if (e.data) {
                                        if (e.data['@ack']) {
                                            __ack = e.data['@ack'];
                                            delete e.data['@ack'];
                                            e.data = e.data['@original'];
                                        }
                                    }
                                    if (__ack) {
                                        let resulet = funcall.apply(curtarget, [e.data]);
                                        __ack(resulet);
                                    } else {
                                        funcall.apply(curtarget, [e.data]);
                                    }
    
                                }, curtarget);
                            })(x, eventTagertArray[x].coname, eventTagertArray[x].call, this);
                        }
                    }
    
                    if (this["_@queue_eventTagertArray"]) {
                        let queue_eventTagertArray: Array<EventTagertArray> = this["_@queue_eventTagertArray"];
                        if (!this["_@queue_eventLoopArray"]) {
                            this["_@queue_eventLoopArray"] = [];
                        }
                        for (var x in queue_eventTagertArray) {
                            (function (keyStr: string, coname, string, funcall: Function, curtarget) {
                                kaayou.getController(coname).on(keyStr, function (e: kaayou.Event) {
                                    var __ack = null;
                                    if (e.data) {
                                        if (e.data['@ack']) {
                                            __ack = e.data['@ack'];
                                            delete e.data['@ack'];
                                            e.data = e.data['@original'];
                                        }
                                    }
                                    curtarget["_@queue_eventLoopArray"].push({
                                        target: curtarget,
                                        data: e.data || null,
                                        ack: __ack || null,
                                        callfuc: funcall
                                    });
                                }, curtarget);
                            })(x, queue_eventTagertArray[x].coname, queue_eventTagertArray[x].call, this);
                        }
                    }
                }
            }
            target["_@__" + propertyKey] = target[propertyKey];
            target[propertyKey] = function () {
                if (this["_@bindEvent"]) {
                    this["_@bindEvent"]();
                }
                this["_@__" + propertyKey].apply(this, arguments);
            }
            return target[propertyKey];*/
        }

    }

}