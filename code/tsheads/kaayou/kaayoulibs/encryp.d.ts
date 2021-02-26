declare namespace kaayou {
    class AES {
        private static ivStr;
        private static keyStr;
        static encrypt(plainText: any): any;
        static decrypt(encryptedText: any): any;
        static encryptPHP(plainText: any): any;
    }
    class MD5 {
        static encode(v: any): string;
    }
    class TextCoder {
        static encode(ma: string, str: string): any;
        static decode(ma: string, buff: Uint8Array): any;
    }
}
