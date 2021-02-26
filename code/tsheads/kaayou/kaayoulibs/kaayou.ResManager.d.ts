declare namespace kaayou {
    class ResManager {
        static __INS__: ResManager;
        static getInstance(): ResManager;
        init(): void;
        RESDB: Array<string>;
        pushRes(res: string): void;
    }
}
