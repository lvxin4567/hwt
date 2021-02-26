declare namespace kaayou {
    class blackList {
        static black_list: Array<string>;
        static loadBlackList(): void;
        static checkBlackList(data: string): string;
    }
}
