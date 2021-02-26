/// <reference path="platform.ts" />

namespace kaayou {



    export class Event {

        /**
         * 事件：进入新的一帧。
         * 需要注意：该事件只会在 UIManager 上抛出！
         */
        public static ENTER_FRAME: string = "enterFrame";

        /**
         * 事件：当前帧即将开始渲染（在 ENTER_FRAME 事件之后）。
         * 需要注意：该事件只会在 UIManager 上抛出！
         */
        public static PRERENDER: string = "prerender";

        /**
         * 事件：APP 获得焦点（切换回前台）。
         * 需要注意：该事件只会在 UIManager 上抛出！
         */
        public static ACTIVATE: string = "activate";

        /**
         * 事件：APP 失去焦点（切换到后台）。
         * 需要注意：该事件只会在 UIManager 上抛出！
         */
        public static DEACTIVATE: string = "deactivate";

        /**
         * 事件：舞台尺寸有改变。
         * 需要注意：该事件只会在 UIManager 上抛出！
         */
        public static RESIZE: string = "stageResize";


        /**
         * 事件：子对象的尺寸有改变
         * DisplayObjectContainer 会对自己侦听该事件，如果子节点的尺寸有改变，应冒泡抛出该事件
         */
        public static CHILD_RESIZE: string = "childResize";


        /**事件类型*/
        public type: string;
        /**事件附带的数据*/
        public data: any;

        /**当前事件的侦听者*/
        public currentTarget: any;
        /**事件的真正抛出者*/
        public target: any;
        /**事件传播是否已停止*/
        public isPropagationStopped: boolean = false;


        constructor(type: string, data?: any) {
            this.type = type;
            this.data = data;
        }

        /**
         * 停止传播事件
         */
        public stopPropagation(): void {
            this.isPropagationStopped = true;
        }


        /**
         * 从池中获取一个事件对象
         * @param EventClass 事件class
         * @param type 事件类型
         * @param data 附带数据
         * @return {T}
         */
        public static create<T extends Event>(EventClass: { new(type: string): T; _eventPool?: Event[] },
            type: string,
            data?: any): T {
            let eventPool: Event[] = EventClass._eventPool;
            if (eventPool == null) {
                eventPool = EventClass._eventPool = [];
            }
            if (eventPool.length > 0) {
                let event: T = <T>eventPool.pop();
                event.type = type;
                event.data = data;
                event.isPropagationStopped = false;
                return event;
            }
            return new EventClass(type);
        }


        /**
         * 将事件对象回收到对应的池中
         * @param event
         */
        public static recycle(event: Event): void {
            event.target = event.currentTarget = event.data = null;
            let EventClass: any = Object.getPrototypeOf(event).constructor;
            EventClass._eventPool.push(event);
        }


        //
    }

    /**
     * 事件派发器接口
     * @author kaayou
     */
    export interface IEventDispatcher {
        on(type: string, listener: (event: kaayou.Event, ...args: any[]) => void, caller?: any, priority?: number, ...args: any[]): void;
        off(type: string, listener: (event: kaayou.Event, ...args: any[]) => void, caller?: any): void;
        dispatch(event: Event, bubbles: boolean, recycle: boolean): void;
        emit(event: Event, bubbles: boolean, recycle: boolean): void;
        has(type: string): boolean;
        offBytarger(type: string, target: any);
    }

    /**
     * 事件注册者的信息
     * @author kaayou
     */
    export interface EventListenerInfo {
        type: string;
        listener: Function;
        caller: any;
        priority: number;
        args: any[];
        onece: boolean;
    }


    /**
     * 事件派发器，负责进行事件的发送和侦听
     * @author kaayou
     */
    export class EventDispatcher implements IEventDispatcher {

        protected _eventMap: any;

        /**事件派发器对应的目标（组合模式下）*/
        protected _target: IEventDispatcher;


        public constructor(target?: IEventDispatcher) {
            this._eventMap = {};
            if (target != null) this._target = target;
        }


        public event_addListener(type: string, listener: (event: kaayou.Event, ...args: any[]) => void, caller: any, priority: number = 0, ...args: any[]): void {
            if (this._eventMap[type] == null) this._eventMap[type] = [];
            let list: EventListenerInfo[] = this._eventMap[type];
            let len: number = list.length;

            let index: number = -1;
            let info: EventListenerInfo;
            for (let i = 0; i < len; i++) {
                info = list[i];

                if (info.listener == listener && info.caller == caller)
                    return; // 已注册

                if (index == -1 && info.priority < priority)
                    index = i;
            }
            info = { type: type, listener: listener, caller: caller, priority: priority, args: args, onece: false };

            if (index !== -1) list.splice(index, 0, info);
            else list.push(info);
        }
        public on = this.event_addListener;
        public event_addListenerOne(type: string, listener: (event: kaayou.Event, ...args: any[]) => void, caller: any, priority: number = 0, ...args: any[]): void {
            if (this._eventMap[type] == null) this._eventMap[type] = [];
            let list: EventListenerInfo[] = this._eventMap[type];
            let len: number = list.length;

            let index: number = -1;
            let info: EventListenerInfo;
            for (let i = 0; i < len; i++) {
                info = list[i];

                if (info.listener == listener && info.caller == caller)
                    return; // 已注册

                if (index == -1 && info.priority < priority)
                    index = i;
            }
            info = { type: type, listener: listener, caller: caller, priority: priority, args: args, onece: true };

            if (index !== -1) list.splice(index, 0, info);
            else list.push(info);
        }
        public onece = this.event_addListenerOne;


        public event_removeListener(type: string, listener: (event: kaayou.Event, ...args: any[]) => void, caller: any): void {
            let list: EventListenerInfo[] = this._eventMap[type];
            if (list == null) return;
            let len: number = list.length;
            if (len == 0) return;

            for (let i = 0; i < len; i++) {
                let info: EventListenerInfo = list[i];
                if (info.listener === listener && info.caller === caller) {
                    list.splice(i, 1);
                    break;
                }
            }

            if (list.length == 0) delete this._eventMap[type];
        }
        public off = this.event_removeListener;


        public event_removeListenerBytarger(type: string, target: any): void {
            let list: EventListenerInfo[] = this._eventMap[type];
            if (list == null) return;
            let len: number = list.length;
            if (len == 0) return;

            for (let i = 0; i < len; i++) {
                let info: EventListenerInfo = list[i];
                if (info.caller === target) {
                    list.splice(i, 1);
                    break;
                }
            }
            if (list.length == 0) delete this._eventMap[type];
        }

        public offBytarger = this.event_removeListenerBytarger;


        public event_dispatch(event: Event, bubbles: boolean = false, recycle: boolean = true): void {
            let target: IEventDispatcher = (this._target != null) ? this._target : this;
            if (event.target == null) event.target = target;
            event.currentTarget = target;

            let list: EventListenerInfo[] = this._eventMap[event.type];
            // 当前节点有侦听该事件
            if (list != null) {
                let len: number = list.length;
                if (len > 0) {
                    list = list.concat();
                    for (let i = 0; i < len; i++) {
                        let info: EventListenerInfo = list[i];
                        if (!info) { continue; }
                        try {
                            if (info.args.length > 0) {
                                let args: any[] = info.args.concat();
                                args.unshift(event);
                                info.listener.apply(info.caller, args);
                            }
                            else {
                                info.listener.call(info.caller, event);
                            }
                            if (info.onece) {
                                this._eventMap[event.type][i] = null;
                            }
                        } catch (err) {
                            // catch到异常时不注销回调
                            // this._eventMap[event.type][i] = null;
                            if (info.onece) {
                                this._eventMap[event.type][i] = null;
                            }
                            if (err.name) {
                                let message = err.message;
                                if (cc.sys.isNative) {
                                    if (typeof message == 'string') {
                                        if (!message) { message = "no message"; }
                                    } else if (typeof message == 'object') {
                                        try {
                                            message = JSON.stringify(message, null, 2);
                                        } catch (er) {
                                            message = "err message object";
                                        }
                                    } else {
                                        message = "no message";
                                    }

                                    let stack = err.stack;
                                    if (typeof stack == 'string') {
                                        if (!stack) { stack = "no stack"; }
                                    } else if (typeof stack == 'object') {
                                        try {
                                            stack = JSON.stringify(stack, null, 2);
                                        } catch (er) {
                                            stack = "err stack object";
                                        }
                                    } else {
                                        stack = "no stack";
                                    }
                                    console.error("event err :" + kaayou.getLobbyVersion(), `${event.type} ${message}`, stack);
                                    kaayou.PlatformMgr.getInstance().sys.PostBugly("event err :" + kaayou.getLobbyVersion(), `${event.type} ${message}`, stack);
                                } else {
                                    console.error(err);
                                }

                                let options = {
                                    msg: "系统检测到异常，点击确定后自动重启！\n\n  *." + message,
                                    close: { isShow: true },
                                    btns: [
                                        {
                                            name: "确定",
                                            action: function () {
                                                if (!cc.sys.isNative) {
                                                    if (window && window.location) {
                                                        window.location.reload();
                                                    }
                                                } else {
                                                    cc.game.restart();
                                                }
                                            },
                                            colorType: 'yellow'
                                        }
                                    ]
                                }
                                let configData = common.mod.Config.GetAppConfig();
                                if (configData && configData.isDebug == 'true') {
                                    kaayou.emit('common', 'ui::Dialog::Show', options);
                                }
                            }
                        }
                        if (event.isPropagationStopped) break;

                    }
                    lodash.pullAll(this._eventMap[event.type], [null]);
                }
            }

            // 事件还没停止、是显示对象、需要继续冒泡
            if (bubbles && !event.isPropagationStopped
                && this._target instanceof cc.Node
                // && this._target != kaayou.stage
                && this._target["parent"] != null
            ) {
                (<IEventDispatcher>(<cc.Node>this._target).parent).dispatch(event, bubbles, recycle);
            }
            else if (recycle) {
                Event.recycle(event);
            }
        }
        public emit = this.event_dispatch;
        public dispatch = this.event_dispatch;


        public event_hasListener(type: string): boolean {
            return this._eventMap[type] != null;
        }

        public has = this.event_hasListener;
        //
    }






    /**
     * Socket / WebSocket 相关事件
     * 
     */
    export class SocketEvent extends Event {

        /**建立连接*/
        public static CONNECT: string = "connect";

        /**收到数据*/
        public static DATA: string = "data";

        /**连接错误*/
        public static ERROR: string = "error";

        /**关闭*/
        public static CLOSE: string = "close";


        public constructor(type: string, data?: any) {
            super(type, data);
        }
    }


    /**
    * TouchEvent / TouchEvent 相关事件
    * 
    */
    export class TouchEvent extends Event {

        /**弹起*/
        public static TouchEnd: string = "TouchEnd";

        /**按下*/
        public static TouchStart: string = "TouchStart";

        /**移动*/
        public static TouchMove: string = "TouchMove";

        /**取消*/
        public static TouchCance: string = "TouchCance";

        public constructor(type: string, data?: any) {
            super(type, data);
        }
    }


    export class CheckEvent extends Event {

        /**选中*/
        public static SELECTED: string = "Selected";

        /**取消*/
        public static UNSELECTED: string = "UnSelected";

        public constructor(type: string, data?: any) {
            super(type, data);
        }
    }


    export class RadioEvent extends Event {

        /**选中*/
        public static SELECTED: string = "RadioSelected";
        /**选中*/
        public static UNSELECTED: string = "RadioUNSelected";
        public constructor(type: string, data?: any) {
            super(type, data);
        }
    }


    /**
    *  CustomEvent 相关事件
    * 
    */
    export class CustomEvent extends Event {

        public constructor(type: string, data?: any) {
            super(type, data);
        }
    }







}