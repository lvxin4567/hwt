namespace kaayou {

    export class blackList {

        static black_list: Array<string> = null;

        static loadBlackList(){
            cc.loader.loadTxt("res/BlackList.txt", function (err, file) {
                if (err) {
                    cc.error(err.message || err);
                    return;
                }
                blackList.black_list = file.split("\n");
            });
        }

        static checkBlackList(data: string) {
            let tem: string = data;
            let wordLength:number=data.length;
            
            for (let i = 0; i < blackList.black_list.length; i++) {
                let str = lodash.trim(blackList.black_list[i]);
                if(str == "") {continue;}
                if (tem.indexOf(str) != -1) {
                    let WordReplaced: string = StringHelper.toStar(str);
                    tem = tem.replace(str, WordReplaced);
                    i--;
                }
            }
            return tem;
        }
    }

    blackList.loadBlackList();
}