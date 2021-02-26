namespace kaayou {


    export namespace pool {



        var _classPID = (0 | (Math.random() * 998));
        function getNewPID(): number {
            return _classPID++;
        }

        function getTargetPID(target): number {
            var pid = 0;
            if (target.constructor.hasOwnProperty('__pid')) {
                pid = target.constructor.__pid;
            }

            if (!pid) {
                pid = getNewPID();
                target.constructor.__pid = pid;
            }
            return pid;
        }

        function getClassPID(target): number {
            var pid = 0;
            if (target.hasOwnProperty('__pid')) {
                pid = target.__pid;
            }

            if (!pid) {
                pid = getNewPID();
                target.__pid = pid;
            }
            return pid;
        }



        var _pool = {};
        function _releaseCB() {
            this.release();
        };
        
        function _autoRelease(obj) {
            var running = obj._running === undefined ? false : !obj._running;
            cc.director.getScheduler().scheduleCallbackForTarget(obj, _releaseCB, 0, 0, 0, running)
        };

        export function putInPool(obj) {
            // var pid = obj.constructor.prototype.__pid;
            // if (!pid) {
            //     var desc = { writable: true, enumerable: false, configurable: true, value: -1 };
            //     pid = classManager.getNewID();
            //     desc.value = pid;
            //     Object.defineProperty(obj.constructor.prototype, '__pid', desc);
            // }

            // var pid = 0;
            // if (obj.constructor.hasOwnProperty('__pid')) {
            //     pid = obj.constructor.__pid;
            // }
            // // if (target.constructor.name == 'CreateRoomPanel') {
            // //     console.error("CreateRoomPanel", did)
            // // }
            // if (!pid) {
            //     pid = classManager.getNewID();
            //     obj.constructor.__pid = pid;
            // }
            var pid = getTargetPID(obj);
            if (!_pool[pid]) {
                _pool[pid] = [];
            }
            // JSB retain to avoid being auto released
            obj.retain && obj.retain();
            // User implementation for disable the object
            obj.unuse && obj.unuse();
            _pool[pid].push(obj);
        }



        export function putAllChildrenInPool(obj:cc.Node) {
            let children = lodash.clone(obj.getChildren());
            lodash.forEach(children, function (v) {
                kaayou.pool.putInPool(v);
            });
        }

        export function hasObject(objClass) {
            var pid = getClassPID(objClass);
            var list = _pool[pid];
            if (!list || list.length == 0) {
                return false;
            }
            return true;
        }

        export function removeObject(obj) {
            var pid = getTargetPID(obj);
            if (pid) {
                var list = _pool[pid];
                if (list) {
                    for (var i = 0; i < list.length; i++) {
                        if (obj === list[i]) {
                            // JSB release to avoid memory leak
                            obj.release && obj.release();
                            list.splice(i, 1);
                        }
                    }
                }
            }
        }

        export function removeClass(objClass) {
            if (hasObject(objClass)) {
                var pid =getClassPID(objClass);
                var list = _pool[pid];
                if(list){
                    for (var i = 0; i < list.length; i++) {
                            list[i].release && list[i].release();
                    }
                    _pool[pid] = [];
                }
            }
        }

        export function getFromPool(objClass,...arg) {
            if (hasObject(objClass)) {
                var pid = getClassPID(objClass);
                var list = _pool[pid];
                var args = Array.prototype.slice.call(arguments);
                args.shift();
                var obj = list.pop();
                if(!obj){
                    return null;
                }
                // User implementation for re-enable the object
                obj.reuse && obj.reuse.apply(obj, args);
                // JSB release to avoid memory leak
                cc.sys.isNative && obj.release && _autoRelease(obj);
                return obj;
            }
            return null;
        }

        export function drainAllPools () {
            for (var i in _pool) {
                for (var j = 0; j < _pool[i].length; j++) {
                    var obj = _pool[i][j];
                    // JSB release to avoid memory leak
                    obj.release && obj.release();
                }
            }
            _pool = {};
        }

    }




    // var pool2 = {
    //     _pool: {},

    //     _releaseCB: function () {
    //         release();
    //     },

    //     _autoRelease: function (obj) {
    //         var running = obj._running === undefined ? false : !obj._running;
    //         cc.director.getScheduler().scheduleCallbackForTarget(obj, _releaseCB, 0, 0, 0, running)
    //     },

    //     /**
    //      * Put the obj in pool
    //      * @param obj
    //      */
    //     putInPool: function (obj) {
    //         var pid = obj.constructor.prototype.__pid;
    //         if (!pid) {
    //             var desc = { writable: true, enumerable: false, configurable: true, value: -1 };
    //             desc.value = ClassManager.getNewID();
    //             Object.defineProperty(obj.constructor.prototype, '__pid', desc);
    //         }
    //         if (!_pool[pid]) {
    //             _pool[pid] = [];
    //         }
    //         // JSB retain to avoid being auto released
    //         obj.retain && obj.retain();
    //         // User implementation for disable the object
    //         obj.unuse && obj.unuse();
    //         _pool[pid].push(obj);
    //     },

    //     /**
    //      * Check if this kind of obj has already in pool
    //      * @param objClass
    //      * @returns {boolean} if this kind of obj is already in pool return true,else return false;
    //      */
    //     hasObject: function (objClass) {
    //         var pid = objClass.prototype.__pid;
    //         var list = _pool[pid];
    //         if (!list || list.length == 0) {
    //             return false;
    //         }
    //         return true;
    //     },

    //     /**
    //      * Remove the obj if you want to delete it;
    //      * @param obj
    //      */
    //     removeObject: function (obj) {
    //         var pid = obj.constructor.prototype.__pid;
    //         if (pid) {
    //             var list = _pool[pid];
    //             if (list) {
    //                 for (var i = 0; i < list.length; i++) {
    //                     if (obj === list[i]) {
    //                         // JSB release to avoid memory leak
    //                         obj.release && obj.release();
    //                         list.splice(i, 1);
    //                     }
    //                 }
    //             }
    //         }
    //     },

    //     /**
    //      * Get the obj from pool
    //      * @param args
    //      * @returns {*} call the reuse function an return the obj
    //      */
    //     getFromPool: function (objClass/*,args*/) {
    //         if (hasObject(objClass)) {
    //             var pid = objClass.prototype.__pid;
    //             var list = _pool[pid];
    //             var args = Array.prototype.slice.call(arguments);
    //             args.shift();
    //             var obj = list.pop();
    //             // User implementation for re-enable the object
    //             obj.reuse && obj.reuse.apply(obj, args);
    //             // JSB release to avoid memory leak
    //             cc.sys.isNative && obj.release && _autoRelease(obj);
    //             return obj;
    //         }
    //     },

    //     /**
    //      *  remove all objs in pool and reset the pool
    //      */
    //     drainAllPools: function () {
    //         for (var i in _pool) {
    //             for (var j = 0; j < _pool[i].length; j++) {
    //                 var obj = _pool[i][j];
    //                 // JSB release to avoid memory leak
    //                 obj.release && obj.release();
    //             }
    //         }
    //         _pool = {};
    //     }
    // };

}