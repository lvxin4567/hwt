declare namespace kaayou {
    class Identify {
        static isPhone(text: any): boolean;
        static isChinese(text: any): boolean;
        static isEmail(text: any): boolean;
        static isReName(text: any): boolean;
        static idCard(text: any): boolean;
        static isPassWord(text: any, min?: number, max?: number): boolean;
        static isNumber(val: any): boolean;
        static isPureNumber(val: any): boolean;
        static isAbcNumber(text: string, min?: number, max?: number): boolean;
        static nickNameSubEight(text: string): string;
        static nickNameSubSeven(text: string): string;
        static nickNameSubSix(text: string): string;
        static substrWithEmoji(str: any, start?: number, end?: number): any;
        static nickNameSubFive(text: string): string;
        static nickNameSubFour(text: string): string;
        static nickNameSubByLength(text: string, enLength: number, chLength: number): string;
        static nickNameMacth(text: any): boolean;
        static hidePhone(text: string): string;
        static nickNameCh8(text: any): boolean;
        static nickNameEN10(text: any): boolean;
        static isChorAbc(text: any): boolean;
        static isChorAbcorNum(text: any): boolean;
        static isBrackets(text: any): boolean;
        static isJSON(str: any): boolean;
        static addPreZero(num?: any, len?: number): string;
        static toDecimal2NoZero(num: number): string;
        static toDecimalNoZero(num: number, len?: number): string;
        static decNumber(num: number, len?: number, wan?: string, yi?: string): string;
        static changeScoreToSortString(socre: number): string;
        static formatRealName(name: string): any;
        static getSubAddstr(addstr: string): string;
    }
}
