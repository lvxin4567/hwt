namespace kaayou {
    export class IP {
        static async checkIP(ip: string) {
            let url = "http://apiyxdq.kaayou.com/api/ip/check/foreign?ip=" + ip;
            let res = <string>await kaayou.Http.GET(url, null, false, false);//lw200430不显示报错
            let oRes = JSON.parse(res);
            if (oRes.code == 0) {
                console.log("是否国外ip："+res);
                if (oRes.data.foreign && oRes.data.img) {
                    kaayou.emit('lobby', "ui::ForeignIPPanel::Show", oRes.data.img);
                }
            }
        }
    }
}