/// <reference path="protos/mall.proto.d.ts" />
declare namespace lobby {
    namespace mod {
        class Mall {
            static __INS__: lobby.mod.Mall;
            static getInstance(): lobby.mod.Mall;
            initMod(): void;
            getSign(map: any, webGameKey?: string): string;
            getAppID(): string;
            getAppToken(): string;
            getPayUrl(): string;
            getDiamondUrl(): string;
            _prudcts: IProductItem[];
            getProductByType(type: number): IProductItem[];
            doGetProductList(data: {
                type: number;
                clean: boolean;
            }): Promise<void>;
            DiamondData: DiamondProductList_Res;
            doGetDiamondProductList(data: {
                type: number;
                clean: boolean;
            }): Promise<void>;
            doBInd(data: {
                code: number;
            }): Promise<void>;
            doGetBankrupt(): Promise<void>;
            doGiftPkgToGold(data: {
                gid: number;
                callBack?: Function;
            }): Promise<void>;
            doDiamondToGold(data: {
                gid: number;
                callBack?: Function;
            }): Promise<void>;
            onPayRes(data: {
                code: string;
                msg: string;
            }): void;
            sendPay(data: {
                pid: number;
                way: number;
                extra?: string;
                grant_type?: number;
                func: Function;
            }): Promise<void>;
            sendPayBankRupt(data: {
                pid: number;
                way: number;
                extra?: string;
                grant_type?: number;
                func: Function;
            }): Promise<void>;
            onLegendBuy(data: {
                infoStr: string;
            }): void;
        }
    }
}
