    namespace kaayou {

    export class ResManager {

        static __INS__: ResManager = null;
        static getInstance() {
            if (ResManager.__INS__ == null) {
                ResManager.__INS__ = new ResManager();
                ResManager.__INS__.init();
            }
            return ResManager.__INS__;
        }
        init() { }
        RESDB: Array<string> = [];
        pushRes(res: string) {
            this.RESDB.push(res);
        }
    }

}