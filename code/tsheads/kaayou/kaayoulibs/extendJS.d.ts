interface String {
    Format(...args: any[]): string;
    format(...args: any[]): string;
    Format(obj: {
        [key: string]: any;
    }): string;
    format(obj: {
        [key: string]: any;
    }): string;
}
interface StringConstructor {
    Format(string: any, ...args: any[]): string;
    format(string: any, ...args: any[]): string;
}
interface Date {
    Format(string: any): string;
    format(string: any): string;
}
interface DateConstructor {
    Format(number: any, string: any): string;
    format(number: any, string: any): string;
    Format(string: any): string;
    format(string: any): string;
    unix(): number;
    Unix(): number;
}
