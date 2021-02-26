declare namespace kaayou {
    class ControllerManager {
        private _controllers;
        static __INS__: ControllerManager;
        static getInstance(): ControllerManager;
        init(): void;
        has(name: string): EventDispatcher;
        getController(name?: string): EventDispatcher;
        install(name: string): kaayou.EventDispatcher;
        uninstall(name: string): boolean;
    }
}
