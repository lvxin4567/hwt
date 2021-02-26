namespace kaayou {

    export namespace mod {


        export abstract class Base {
            protected _moduleName = "";
            setModuleName(moduleName) {
                this._moduleName = moduleName;
            }
            getModuleName() {
                return this._moduleName;
            }
            abstract initMod();
        }

    }

}