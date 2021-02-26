
// import * as md5 from '../lib/md5.min';
// import * as encoding from '../lib/encoding.min';
namespace kaayou {
    var iconv = require('iconv-lite');
    var CryptoJS = require("crypto-js");

    export class AES{
        private static ivStr:string="terrysgygoaesctr";
        private static keyStr:string="kaayou20190110#$";
        // 加密 aes + base64
        static encrypt(plainText){
            let key = CryptoJS.enc.Utf8.parse(this.keyStr);
            let iv = CryptoJS.enc.Utf8.parse(this.ivStr);
            let encrypted = CryptoJS.AES.encrypt(plainText, key, { iv: iv, mode: CryptoJS.mode.CTR, padding: CryptoJS.pad.NoPadding });
            let base64str = CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
            base64str = base64str.replace(/\+/g, "-");
            base64str = base64str.replace(/\//g, "_");
            return base64str;
        }
    
        // 解密
        static decrypt(encryptedText){
            encryptedText = encryptedText.replace(/-/g, "+");
            encryptedText = encryptedText.replace(/_/g, "/");
            let key = CryptoJS.enc.Utf8.parse(this.keyStr);
            let iv = CryptoJS.enc.Utf8.parse(this.ivStr);
            let decrypted = CryptoJS.AES.decrypt(encryptedText, key, { iv: iv, mode: CryptoJS.mode.CTR, padding: CryptoJS.pad.NoPadding });
            return decrypted.toString(CryptoJS.enc.Utf8);
        }

        static encryptPHP(plainText){
            let key = CryptoJS.enc.Utf8.parse(this.keyStr);
            let iv = CryptoJS.enc.Utf8.parse(this.ivStr);
            let encrypted = CryptoJS.AES.encrypt(plainText, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
            // CryptoJS.enc.base64str();
            // let base64str = CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
            // base64str = base64str.replace(/\+/g, "-");
            // base64str = base64str.replace(/\//g, "_");
            let str1 = CryptoJS.enc.Utf8.parse(encrypted.toString());
            let str = CryptoJS.enc.Base64.stringify(str1)
            return str
        }

    }

    export class MD5 {
        static encode(v): string {
            return CryptoJS.MD5(v).toString();
        }
    }

    export class TextCoder {

        // static encode(ma:string,str:string){
        //    return  ( new encoding.TextEncoder(ma)).encode(str);
        // }
        // static decode(ma:string,buff:Uint8Array){
        //     return  (new encoding.TextDecoder(ma)).decode(buff);
        // }


        static encode(ma: string, str: string) {
            return iconv.encode(str, ma);
        }
        static decode(ma: string, buff: Uint8Array) {
            return iconv.decode(buff, ma);
        }


    }


}