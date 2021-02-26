interface String {
    Format(...args): string;
    format(...args): string;
    Format(obj: { [key: string]: any }): string;
    format(obj: { [key: string]: any }): string;
}
String.prototype.Format = function (args) {
    var result = this;
    if (arguments.length > 0) {
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                if (args[key] != undefined) {
                    var reg = new RegExp("({" + key + "})", "g");
                    result = result.replace(reg, args[key]);
                }
            }
        }
        else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] != undefined) {
                    //var reg = new RegExp("({[" + i + "]})", "g");//这个在索引大于9时会有问题，谢谢何以笙箫的指出
                    var reg = new RegExp("({)" + i + "(})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
    }
    return result.toString();
}
String.prototype.format = String.prototype.Format;


interface StringConstructor {
    Format(string, ...args): string;
    format(string, ...args): string;
}

String.Format = function () {
    if (arguments.length == 0)
        return "";
    var result = arguments[0];
    if (typeof result !== "string") {
        return "";
    }

    if (arguments.length == 2 && typeof (arguments[1]) == "object") {
        var args = arguments[1];
        for (var key in args) {
            if (args[key] != undefined) {
                var reg = new RegExp("({" + key + "})", "g");
                result = result.replace(reg, args[key]);
            }
        }
    }
    else {
        for (var i = 1; i < arguments.length; i++) {
            if (arguments[i] != undefined) {
                var reg = new RegExp("({)" + (i - 1) + "(})", "g");
                result = result.replace(reg, arguments[i]);
            }
        }
    }

    return result;
}
String.format = String.Format;


interface Date {
    Format(string): string;
    format(string): string;
}
interface DateConstructor {
    Format(number, string): string;
    format(number, string): string;
    Format(string): string;
    format(string): string;
    unix(): number;
    Unix(): number;
}

Date.Unix = function () {
    return Math.floor((new Date()).getTime() / 1000);
}
Date.unix = Date.Unix;


Date.Format = function () {
    if (arguments.length == 1) {
        var fmt = arguments[0];
        return (new Date).Format(fmt);
    } else if (arguments.length == 2) {
        var t = arguments[0];
        var fmt = arguments[1];
       return (new Date(t)).Format(fmt);
    } else {
        return (new Date).getTime().toString();
    }

    return (new Date).Format(fmt);
}
Date.format = Date.Format;
/**
 * yyyy-MM-dd hh:mm:ss:SS
 */
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
Date.prototype.format = Date.prototype.Format;
