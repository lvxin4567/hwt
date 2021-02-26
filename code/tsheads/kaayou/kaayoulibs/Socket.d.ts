/// <reference path="decorator.d.ts" />
declare namespace kaayou {
    class kaWebSocket {
        private ws;
        name: string;
        constructor(name: string);
        _conConfig: {
            ip: string;
            port: number;
            path?: string;
        };
        _resUrl: string;
        doReconnect(): void;
        getconConfig(): {
            ip: string;
            port: number;
            path?: string;
        };
        doConnect(data: {
            ip: string;
            port: number;
            path?: string;
        }): void;
        _isInitiative: boolean;
        _isConnected: boolean;
        getIsConnected(): boolean;
        protected connect(resUrl: string): void;
        private __onError;
        private __onOpen;
        private __t;
        private __delayT;
        private __doPing;
        private __clearT;
        __lastMsgTime: number;
        getLastTime(): number;
        private __onmessage;
        isOpend(): boolean;
        getInitiative(): boolean;
        checkLife(): boolean;
        private __onclose;
        _isDoClose: boolean;
        close(data?: {
            Initiative: boolean;
        }): void;
        send(data: {
            msghead: string;
            msgdata?: any;
        }): void;
    }
}
