declare namespace lobby {
    namespace mod {
        class Package {
            static getPublicRuleConfigNames(): string[];
            GameList: {
                index: string;
                key: string;
                name: string;
            }[];
            static __INS__: lobby.mod.Package;
            static getInstance(): lobby.mod.Package;
            initMod(): void;
            getGameList(key: any): any;
            getGameName(key: any): string;
            getKindIdList(key: any): any[];
            doGetGameListAndRuleByKey(data: {
                key: string;
                call: Function;
            }): void;
            getPackageIndex(key: any): string | -1;
            getMain3(): Promise<void>;
            LoginSucceed(): Promise<void>;
            saveGameList(data: any, getRule: any): void;
            search(data: {
                code: string;
                keyword: string;
                type: string;
                package_type: number;
                call: Function;
            }): Promise<void>;
            getTeahousePackage(data: {
                call: Function;
            }): Promise<void>;
            ruleMap: {};
            getRuleList(data: {
                kindIdList: Array<{
                    kind: string;
                    version: number;
                }>;
                call: Function;
            }): Promise<void>;
            private _getRuleByKindId;
            __paruleNaame: string;
            onRuleChange(data: any): void;
            updateRule(data: Array<{
                kind: string;
                version: number;
            }>, call?: Function): Promise<void>;
            getRecruitWechat(key: string): Promise<void>;
        }
    }
}
