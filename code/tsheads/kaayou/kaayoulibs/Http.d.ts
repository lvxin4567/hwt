/// <reference path="decorator.d.ts" />
/// <reference path="encryp.d.ts" />
declare namespace kaayou {
    interface Ka_MSG_RES {
        head: string;
        errcode: number;
        data?: string | any;
        errmsg?: string;
        msgsign: {
            time: number;
            encode: number;
        };
    }
    class Http {
        static GetRequest(search: any): {
            [key: string]: string;
        };
        static ExtendUrlParams(url: string, data?: {
            [key: string]: string;
        }): string;
        static GET(url: string, getParams?: {
            [key: string]: string;
        }, reversibility?: boolean, showError?: boolean): Promise<unknown>;
        static GetFileSize(url: string): Promise<unknown>;
        static checkUrl(method: string, url: any, call: any): void;
        static doChangeChanl(url: string): string;
        static GetRestartOption(): {
            title: string;
            msg: string;
            close: {
                isShow: boolean;
                action: any;
            };
            btns: {
                name: string;
                action: any;
                colorType: string;
            }[];
        };
        static POST(url: string, postParams: {
            [key: string]: string;
        } | string, getParams?: {
            [key: string]: string;
        }, contentType?: string, reversibility?: boolean): Promise<unknown>;
        static parseResult(data: any): Ka_MSG_RES;
    }
}
