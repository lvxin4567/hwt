namespace kaayou{
    export class ControllerManager {
        private _controllers: { [key: string]: kaayou.EventDispatcher } = null;
        static __INS__: ControllerManager = null;
        static getInstance() {
            if (ControllerManager.__INS__ == null) {
                ControllerManager.__INS__ = new ControllerManager();
                ControllerManager.__INS__.init();
            }
            return ControllerManager.__INS__;
        }
        init() {
            this._controllers = {};
        }
        has(name: string) {
            name = name.toUpperCase();
            return this._controllers[name];
        }
        getController(name: string = "default") {
            name = name.toUpperCase();
            if (!this.has(name)) {
                return this.install(name);
            }
            return this._controllers[name];
        }
        install(name: string):kaayou.EventDispatcher {
            name = name.toUpperCase();
            if (!this.has(name)) {
                this._controllers[name] = new kaayou.EventDispatcher();
            }
            return this._controllers[name];
        }
        uninstall(name: string):boolean {
            name = name.toUpperCase();
            if (!this.has(name)) {
                this._controllers[name] = null;
            }
            delete this._controllers[name];
            return true;
        }
    
    }
    }