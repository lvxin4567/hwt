/// <reference path="Socket.d.ts" />
declare namespace kaayou {
    class NetManager {
        static __INS__: NetManager;
        static getInstance(): NetManager;
        ctor(...args: any[]): void;
        description(): string;
        private _eventPool;
        init(): void;
        __watchTime: number;
        update(dt: number): void;
        private _needReConnectSockets;
        checkReConnect(): void;
        _maxReConnectCount: number;
        _reConConfig: {};
        doReConnect(name: string): void;
        cleanNeedConnect(name: any): void;
        onWsConnectEvent(event: kaayou.Event): void;
        onWsCloseEvent(event: kaayou.Event): void;
        doPool(): void;
        isDisconnect(): void;
        protected runingSockets: {
            [key: string]: kaayou.kaWebSocket;
        };
        getSocket(name: string): kaayou.kaWebSocket;
        deleteAllSocket(): void;
        deleteSocket(name: string): void;
    }
    function sendMessage(coname: any, head: any, data?: any, reshead?: string, callback?: Function, target?: any): any;
}
