/// <reference path="platform.d.ts" />
declare namespace kaayou {
    class Event {
        /**
         * 事件：进入新的一帧。
         * 需要注意：该事件只会在 UIManager 上抛出！
         */
        static ENTER_FRAME: string;
        /**
         * 事件：当前帧即将开始渲染（在 ENTER_FRAME 事件之后）。
         * 需要注意：该事件只会在 UIManager 上抛出！
         */
        static PRERENDER: string;
        /**
         * 事件：APP 获得焦点（切换回前台）。
         * 需要注意：该事件只会在 UIManager 上抛出！
         */
        static ACTIVATE: string;
        /**
         * 事件：APP 失去焦点（切换到后台）。
         * 需要注意：该事件只会在 UIManager 上抛出！
         */
        static DEACTIVATE: string;
        /**
         * 事件：舞台尺寸有改变。
         * 需要注意：该事件只会在 UIManager 上抛出！
         */
        static RESIZE: string;
        /**
         * 事件：子对象的尺寸有改变
         * DisplayObjectContainer 会对自己侦听该事件，如果子节点的尺寸有改变，应冒泡抛出该事件
         */
        static CHILD_RESIZE: string;
        /**事件类型*/
        type: string;
        /**事件附带的数据*/
        data: any;
        /**当前事件的侦听者*/
        currentTarget: any;
        /**事件的真正抛出者*/
        target: any;
        /**事件传播是否已停止*/
        isPropagationStopped: boolean;
        constructor(type: string, data?: any);
        /**
         * 停止传播事件
         */
        stopPropagation(): void;
        /**
         * 从池中获取一个事件对象
         * @param EventClass 事件class
         * @param type 事件类型
         * @param data 附带数据
         * @return {T}
         */
        static create<T extends Event>(EventClass: {
            new (type: string): T;
            _eventPool?: Event[];
        }, type: string, data?: any): T;
        /**
         * 将事件对象回收到对应的池中
         * @param event
         */
        static recycle(event: Event): void;
    }
    /**
     * 事件派发器接口
     * @author kaayou
     */
    interface IEventDispatcher {
        on(type: string, listener: (event: kaayou.Event, ...args: any[]) => void, caller?: any, priority?: number, ...args: any[]): void;
        off(type: string, listener: (event: kaayou.Event, ...args: any[]) => void, caller?: any): void;
        dispatch(event: Event, bubbles: boolean, recycle: boolean): void;
        emit(event: Event, bubbles: boolean, recycle: boolean): void;
        has(type: string): boolean;
        offBytarger(type: string, target: any): any;
    }
    /**
     * 事件注册者的信息
     * @author kaayou
     */
    interface EventListenerInfo {
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
    class EventDispatcher implements IEventDispatcher {
        protected _eventMap: any;
        /**事件派发器对应的目标（组合模式下）*/
        protected _target: IEventDispatcher;
        constructor(target?: IEventDispatcher);
        event_addListener(type: string, listener: (event: kaayou.Event, ...args: any[]) => void, caller: any, priority?: number, ...args: any[]): void;
        on: (type: string, listener: (event: kaayou.Event, ...args: any[]) => void, caller: any, priority?: number, ...args: any[]) => void;
        event_addListenerOne(type: string, listener: (event: kaayou.Event, ...args: any[]) => void, caller: any, priority?: number, ...args: any[]): void;
        onece: (type: string, listener: (event: kaayou.Event, ...args: any[]) => void, caller: any, priority?: number, ...args: any[]) => void;
        event_removeListener(type: string, listener: (event: kaayou.Event, ...args: any[]) => void, caller: any): void;
        off: (type: string, listener: (event: kaayou.Event, ...args: any[]) => void, caller: any) => void;
        event_removeListenerBytarger(type: string, target: any): void;
        offBytarger: (type: string, target: any) => void;
        event_dispatch(event: Event, bubbles?: boolean, recycle?: boolean): void;
        emit: (event: Event, bubbles?: boolean, recycle?: boolean) => void;
        dispatch: (event: Event, bubbles?: boolean, recycle?: boolean) => void;
        event_hasListener(type: string): boolean;
        has: (type: string) => boolean;
    }
    /**
     * Socket / WebSocket 相关事件
     *
     */
    class SocketEvent extends Event {
        /**建立连接*/
        static CONNECT: string;
        /**收到数据*/
        static DATA: string;
        /**连接错误*/
        static ERROR: string;
        /**关闭*/
        static CLOSE: string;
        constructor(type: string, data?: any);
    }
    /**
    * TouchEvent / TouchEvent 相关事件
    *
    */
    class TouchEvent extends Event {
        /**弹起*/
        static TouchEnd: string;
        /**按下*/
        static TouchStart: string;
        /**移动*/
        static TouchMove: string;
        /**取消*/
        static TouchCance: string;
        constructor(type: string, data?: any);
    }
    class CheckEvent extends Event {
        /**选中*/
        static SELECTED: string;
        /**取消*/
        static UNSELECTED: string;
        constructor(type: string, data?: any);
    }
    class RadioEvent extends Event {
        /**选中*/
        static SELECTED: string;
        /**选中*/
        static UNSELECTED: string;
        constructor(type: string, data?: any);
    }
    /**
    *  CustomEvent 相关事件
    *
    */
    class CustomEvent extends Event {
        constructor(type: string, data?: any);
    }
}
