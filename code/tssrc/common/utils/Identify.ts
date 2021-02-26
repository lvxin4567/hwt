namespace kaayou {
    export class Identify {
        //文本补空格



        //手机号格式是否正确
        static isPhone(text): boolean {
            return /^1[3-9]\d{9}$/.test(text);
        }

        //是否是中文
        static isChinese(text): boolean {
            return /^[\u4E00-\u9FA5]{2,4}$/.test(text);
        }

        static isEmail(text): boolean {
            return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(?:\.[a-zA-Z0-9_-]+)+$/.test(text)
        }

        //姓名的格式是否正确
        static isReName(text): boolean {
            return /^[\u4E00-\u9FA5]{2,8}$/.test(text);
        }

        //身份证格式是否正确
        static idCard(text): boolean {
            return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(text);
        }

        //密码格式是否正确
        static isPassWord(text, min = 6, max = 12): boolean {
            var reg = new RegExp(`^[\\w]{${min},${max}}$`, "i");
            return reg.test(text);
        }

        //是否是 数字
        static isNumber(val): boolean {
            // if (val == "") return false;
            // return /^[0-9]*$/.test(val);
            var regPos = /^\d+(\.\d+)?$/; //非负浮点数
            var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
            if (regPos.test(val) || regNeg.test(val)) {
                return true;
            } else {
                return false;
            }
        }

        //是否是纯数字
        static isPureNumber(val): boolean {
            var reg = new RegExp("^[0-9]*$");
            if (reg.test(val)) {
                return true;
            } else {
                return false;
            }
        }

        //是否是 数字和英文
        static isAbcNumber(text: string, min = 0, max = 12): boolean {
            if (text == "") return false;
            if (text.length < min) return false;
            if (text.length > max) return false;
            return /^[a-zA-Z0-9]*$/.test(text);
        }

        //截取名字长度 保留默认 10 ，汉字 8
        static nickNameSubEight(text: string): string {
            text = text.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "");
            let b = /^[_a-zA-Z0-9]+$/.test(text);
            if (b) {
                text = text.substring(0, 10);
            } else {
                text = text.substring(0, 8);
            }
            return text;
        }

        //截取名字长度 保留默认 10 ，汉字 7
        static nickNameSubSeven(text: string): string {
            text = text.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "");
            let b = /^[_a-zA-Z0-9]+$/.test(text);
            if (b) {
                text = text.substring(0, 12);
            } else {
                text = text.substring(0, 7);
            }
            return text;
        }

        //截取名字长度 保留默认 10 ，汉字 6
        static nickNameSubSix(text: string): string {
            text = text.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "");
            let b = /^[_a-zA-Z0-9]+$/.test(text);
            if (b) {
                text = text.substring(0, 10);
            } else {
                //text = text.match(/(.)/g).slice(0,7).join("")
                text = text.substring(0, 6);
            }
            return text;
        }


        static substrWithEmoji(str, start:number = 0, end?:number) {
            var i = start;
            i = i < 0 ? 0 : i
            var char;
    
            let betweenEmoji = function (char) {
                if (between(char, 0x1F601, 0x1F64F) ||
                    between(char, 0x1F680, 0x1F6C0) ||
                    between(char, 0x1F170, 0x1F251) ||
                    between(char, 0x1F600, 0x1F636) ||
                    between(char, 0x1F681, 0x1F6C5) ||
                    between(char, 0x1F30D, 0x1F567) ||
                    between(char, 0x1F300, 0x1F5FF)) {
                    return true
                }
                return false
                function between(cur, start, end) {
                    return cur >= start && cur <= end;
                }
            }
    
    
            if (start >= end)
                return "";
    
            char = str.codePointAt(Math.max(i - 1, 0))
    
            if (betweenEmoji(char))
                start = Math.max(start - 1, 0)
    
            while ((char = str.codePointAt(i))) {
                if (betweenEmoji(char)) {
                    end = end + 1;
                }
                i++
                if (i >= end)
                    break;
            }
    
            return str.substring(start, end)
        }

        //截取名字长度 保留默认 10 ，汉字 5
        static nickNameSubFive(text: string): string {
            text = text.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "");
            let b = /^[_a-zA-Z0-9]+$/.test(text);
            if (b) {
                text = text.substring(0, 10);
            } else {
                text = text.substring(0, 5);
            }
            return text;
        }

        //截取名字长度 保留默认 8 ，汉字 4
        static nickNameSubFour(text: string): string {
            text = text.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "");
            let b = /^[_a-zA-Z0-9]+$/.test(text);
            if (b) {
                text = text.substring(0, 8);
            } else {
                text = text.substring(0, 4);
            }
            return text;
        }

        //截取名字长度
        static nickNameSubByLength(text: string, enLength: number, chLength: number): string {
            text = text.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "");
            let b = /^[_a-zA-Z0-9]+$/.test(text);
            if (b) {
                text = text.substring(0, enLength);
            } else {
                text = text.substring(0, chLength);
            }
            return text;
        }

        //检测昵称是否格式正确
        static nickNameMacth(text): boolean {
            return /^[\u4e00-\u9fa5A-Za-z0-9-_]{1,8}$|^[_a-zA-Z0-9]{1,10}$/.test(text);
        }

        //隐藏手机号中间
        static hidePhone(text: string): string {
            return text.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2');
        }

        static nickNameCh8(text): boolean {
            return /^[\u4e00-\u9fa5A-Za-z0-9-_]*$/.test(text);
        }

        static nickNameEN10(text): boolean {
            return /^[_a-zA-Z0-9]*$/.test(text);
        }


        //判断中文和字母
        static isChorAbc(text): boolean {
            return /^[a-zA-Z\u4e00-\u9fa5]{2,6}$/.test(text);
        }

        //中文字母和数字
        static isChorAbcorNum(text): boolean {
            return /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/.test(text);
        }

        //判断括号
        static isBrackets(text): boolean {
            for (var x in text) {
                cc.log(text[x]);
                if (text[x] == " ") {
                    return false;
                }
            }
            return true;
        }

        static isJSON(str) {
            if (typeof str == 'string') {
                try {
                    var obj = JSON.parse(str);
                    if (typeof obj == 'object' && obj) {
                        return true;
                    } else {
                        return false;
                    }

                } catch (e) {
                    console.log('error：' + str + '!!!' + e);
                    return false;
                }
            }
            console.log('It is not a string!')
        }

        //补零
        static addPreZero(num?: any, len?: number): string {
            if (typeof (num) != "number") {
                num = parseInt(num);
            }
            if (num.toString().length >= len) { return num.toString() }
            let str = "";
            for (let i = 0; i < len - 1; i++) {
                str += "0";
            }
            return (str + num).slice(-len);
        }

        //保留2位小数，且不补0
        static toDecimal2NoZero(num: number): string {
            var f = Math.round(num * 100) / 100;
            var s = f.toString();
            return s;
        }

        //保留有效小数点后几位
        static toDecimalNoZero(num: number, len?: number): string {
            if (!len || len <= 0) {
                return;
            }
            var f = Math.round(num * Math.pow(10, len)) / Math.pow(10, len);
            var s = f.toString();
            return s;
        }

        static decNumber(num: number, len: number = 4, wan: string = "万", yi: string = "亿"): string {
            if (!num) return "0";
            if (!len || len < 0) {
                return "0";
            }
            let decNum = "";
            let unit = ""; //单位
            if (num >= Math.pow(10, 8)) {
                decNum = (num / Math.pow(10, 8)).toString();
                unit = yi;
            } else if (num >= Math.pow(10, 4)) {
                decNum = (num / Math.pow(10, 4)).toString();
                unit = wan;
            } else {
                return num.toString();
            }

            let decNumStr = decNum.length >= len ? decNum.substring(0, len) : decNum;

            if (decNumStr[decNumStr.length - 1] == ".") {
                decNumStr = decNum.substring(0, len - 1);
            }
            return decNumStr + unit;



            // if ((num >= Math.pow(10,7)) && (num <= Math.pow(10,8)) ) {
            //     let  decNum = parseInt((num / 10000).toString());
            //     return decNum+"万";
            // }

            // if (num / 10000 >= 1) {
            //     let  decNum = num / 10000;
            //     let a = parseInt((num / 10000).toString());
            //    if (a.toString().length == 2 || a.toString().length == 1) {
            //         var b = (num / 10000).toString().substring(0,4);
            //         var result = b + "万";
            //         return result;
            //     }else if (a.toString().length == 3) {
            //         return parseInt((num / 10000).toString()).toString();
            //     }
            //     return decNum.toPrecision(len)+"万";
            //   } else {
            //     return num.toString();
            //   }
        }



        static changeScoreToSortString(socre: number) {

            let scoreStr = socre + "";
            if (socre > 99999999) {
                scoreStr = Math.max(Math.floor(socre / (10000 * 10000)), Math.floor(socre / (10000 * 1000)) / 10) + "亿";
            } else if (socre > 9999) {
                scoreStr = Math.max(Math.floor(socre / 10000), Math.floor(socre / 1000) / 10) + "万";
            }

            return scoreStr;
        }

        static formatRealName(name: string) {
            let newStr;
            if (name.length === 2) {
                newStr = name.substr(0, 1) + '*';
            } else if (name.length > 2) {
                let char = '';
                for (let i = 0, len = name.length - 2; i < len; i++) {
                    char += '*';
                }
                newStr = name.substr(0, 1) + char + name.substr(-1, 1);
            } else {
                newStr = name;
            }
            return newStr;
        }

        //截取地址
        static getSubAddstr(addstr: string) {
            if (addstr.length < 1) {
                return addstr;
            }
            let startIndex = addstr.indexOf('省');
            if (startIndex < 0) {
                startIndex = addstr.indexOf('国');
            }

            let arr = ['道', '街', '路', '村'];
            let endIndex = addstr.length - 1;
            for (var x in arr) {
                let tempIndex = addstr.indexOf(arr[x]);
                if (tempIndex > 0) {
                    endIndex = tempIndex;
                    break;
                }
            }

            addstr = addstr.substring(startIndex + 1, endIndex + 1)
            return addstr;

        }

    }
}