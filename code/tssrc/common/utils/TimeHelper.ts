namespace kaayou {
    export class TimeHelper {
        static arrTime: Array<string> = null;
        static splitTime(hour: number) {
            this.arrTime = [];
            switch (hour) {
                case 0:
                    this.arrTime = [];
                    break;
                default:
                    let a = 0;
                    let b = a + hour;
                    while (b <= 24) {
                        let sHa = StringHelper.padLeft(a, '0', 2);
                        let sHb = StringHelper.padLeft(b, '0', 2);
                        let sA = sHa + ":00";
                        let sB = sHb + ":00";
                        this.arrTime.push(sA + "-" + sB);
                        a += hour;
                        b += hour;
                    }
                    break;
            }
            this.arrTime.push("全天");
        }
        static getIndexByString(s: string) {
            for (let i = 0; i < this.arrTime.length; ++i) {
                if (s == this.arrTime[i]) {
                    return i;
                }
            }
            return -1;
        }
        static getLastIndex(){
            return this.arrTime.length-1;
        }
        static getNowIndex() {
            let now = new Date();
            let h = now.getHours();
            let s = this.getTimesByHour(h);
            return kaayou.TimeHelper.getIndexByString(s);
        }
        static getStringByIndex(index: number) {
            return this.arrTime[index];
        }
        static getTimesByHour(hour: number) {
            for (let i = 0; i < this.arrTime.length; ++i) {
                let a = parseInt(this.arrTime[i].substr(0, 2));
                let b = parseInt(this.arrTime[i].substr(6, 2));
                if (hour >= a && hour < b) {
                    return this.arrTime[i];
                }
            }
            return "00:00-24:00";
        }
    }
}