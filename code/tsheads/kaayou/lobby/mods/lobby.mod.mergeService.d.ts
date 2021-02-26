/// <reference path="protos/mergeService.proto.d.ts" />
declare namespace lobby {
    namespace mod {
        class mergeService {
            static __INS__: lobby.mod.mergeService;
            static getInstance(): lobby.mod.mergeService;
            initMod(): void;
            getList(): Promise<void>;
            GetBindPersonInfo(data: {
                code: string;
            }): Promise<void>;
            onPlayerClickGold(): Promise<void>;
        }
    }
}
