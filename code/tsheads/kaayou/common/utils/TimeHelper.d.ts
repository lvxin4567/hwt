declare namespace kaayou {
    class TimeHelper {
        static arrTime: Array<string>;
        static splitTime(hour: number): void;
        static getIndexByString(s: string): number;
        static getLastIndex(): number;
        static getNowIndex(): number;
        static getStringByIndex(index: number): string;
        static getTimesByHour(hour: number): string;
    }
}
