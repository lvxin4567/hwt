declare namespace kaayou {
    namespace mod {
        abstract class Base {
            protected _moduleName: string;
            setModuleName(moduleName: any): void;
            getModuleName(): string;
            abstract initMod(): any;
        }
    }
}
