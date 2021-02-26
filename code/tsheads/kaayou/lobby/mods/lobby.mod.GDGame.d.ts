/// <reference path="protos/gdgame.proto.d.ts" />
declare namespace lobby {
    namespace mod {
        class GDGame {
            static __INS__: lobby.mod.GDGame;
            static getInstance(): lobby.mod.GDGame;
            initMod(): void;
            onGetPakeageByKind(data: {
                kindid: number;
                callBack: Function;
            }): Promise<void>;
            onGetBankRuptStatus(data1: {
                callBack: Function;
            }): Promise<void>;
            getallowanceinfo(dataReq: {
                ignore_gift: boolean;
                callBack?: Function;
            }): Promise<void>;
            doSiteIn(data: {
                kind: string;
                type: number;
            }): Promise<void>;
        }
    }
}
