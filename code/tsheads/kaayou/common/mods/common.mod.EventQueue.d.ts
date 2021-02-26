declare namespace common {
    namespace mod {
        interface EventQueueCall {
            data: any;
            func: Function;
            target: any;
            mname?: string;
            ename?: string;
        }
        class EventQueue {
            private _queueArray;
            constructor();
            private _isCleaning;
            clean(): void;
            push(c: EventQueueCall): void;
            release(): void;
            _t: any;
            start(): void;
            private _loop;
        }
    }
}
