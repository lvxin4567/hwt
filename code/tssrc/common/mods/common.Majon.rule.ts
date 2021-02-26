namespace common{
    export enum GameKindID {
        KindID_NULL = 0,
        KindID_XTMJ_LH = 598,                       //仙桃麻将-仙桃晃晃
        KindID_XTMJ_YLDD = 597,                     //仙桃麻将-一赖到底
        KindID_XTMJ_YLKZC = 596,                    //仙桃麻将-一赖可捉铳
    
        KindID_JZMJ_YJLY = 595,                     //荆州麻将-一脚赖油.逞赖子
        KindID_JZMJ_JLJM = 599,                     //荆州麻将-江陵揪码


        KindID_HHHJ_YH = 594,                       //晃晃合集-硬晃
        KindID_HHHJ_LH = 593,                       //晃晃合集-赖晃
        KindID_HHHJ_YLKZC = 592,                    //晃晃合集-一赖可捉铳
    
        KindID_CBMJ_DD = 591,                       //赤壁麻将-剁刀
        KindID_CBMJ_YH = 590,                       //赤壁麻将-硬晃
        KindID_CBMJ_HZ = 589,                       //赤壁麻将-红中

        KindID_HHMJ_LH = 569,                       //洪湖麻将-洪湖赖晃
        KindID_HHMJ_YLDD = 570,                     //洪湖麻将-一赖到底
        KindID_HHMJ_YH = 568,                       //洪湖麻将-洪湖硬晃
        KindID_CYMJ_MJ = 897,                       //崇阳麻将
        KindID_CYMJ_HH = 896,                       //崇阳晃晃
        KindID_QJMJ_HH = 578,                       //潜江麻将-潜江晃晃
        KindID_QJMJ_DT = 577,                       //潜江麻将-激情单挑
        KindID_QJMJ_HZ = 576,                       //潜江麻将-潜江红中


        KindID_JYMJ_HZ = 581,                       //嘉鱼麻将-红中癞子杠
        KindID_JYMJ_HH = 580,                       //嘉鱼麻将-晃晃
        KindID_JYMJ_YQ = 579,                       //嘉鱼麻将-硬巧


        KindID_BMHM = 889,                          //武汉麻将
        KindID_BMHM_HH = 587,                       //武汉晃晃

        KindID_HZLZG = 984,                         //红中赖子杠

    }
    
    
    //买马类型
    export enum GameMaiMaType {
        Type_Null = 0,
        Type_Maima = 1,                             //买马，庄家1,5,9，庄家下家2,6，庄家对家3,7，庄家上家4,8
        Type_Zhuaniao = 2,                          //抓鸟，庄家1,5,9，庄家下家2,6，庄家对家3,7，庄家上家4,8
        Type_Zhuaniao159 = 3,                       //抓鸟，且所有玩家固定1,5,9
    }
    
    //用来区分不同kindid游戏间的差别
    export class Rule {
    
        static kindId: GameKindID = GameKindID.KindID_NULL;
        static modName:string = "";
        //设置当前游戏KindId
        static setKindID(kindid: number) {
            Rule.kindId = kindid;
        }
    
        //获取当前游戏KindId
        static getKindID() {
            return Rule.kindId;
        }
    
        //是否有赖子
        static getHasMagic() {
            let kindId: number = Rule.getKindID();
  
            if (kindId == GameKindID.KindID_CBMJ_YH || kindId == GameKindID.KindID_HHHJ_YH || kindId == GameKindID.KindID_CBMJ_DD || kindId == GameKindID.KindID_HHMJ_YH || kindId == GameKindID.KindID_QJMJ_HZ
                || kindId == GameKindID.KindID_JZMJ_JLJM
                ) {
                return false;
            }
            else {
                return true;
            }
        }

        //是否是潜江红中
        static isQJHZ() {
            let kindId: number = Rule.getKindID();
            if(kindId == GameKindID.KindID_QJMJ_HZ){
                return true;
            }
            else{
                return false;
            }
            
        }
    
        //是否有朝天
        static getHasChaotian() {
            let kindId: number = Rule.getKindID();
            if (kindId == GameKindID.KindID_XTMJ_LH || kindId == GameKindID.KindID_XTMJ_YLDD || kindId == GameKindID.KindID_XTMJ_YLKZC) {
                return true;
            }
            else if (kindId == GameKindID.KindID_HHMJ_LH || kindId == GameKindID.KindID_HHMJ_YH || kindId == GameKindID.KindID_HHMJ_YLDD) {
                return true;
            }
            else if (kindId == GameKindID.KindID_HHHJ_YH || kindId == GameKindID.KindID_HHHJ_LH || kindId == GameKindID.KindID_HHHJ_YLKZC) {
                return true;
            } else if (kindId == GameKindID.KindID_JZMJ_YJLY) {
                return true;
            } else if (kindId == GameKindID.KindID_QJMJ_HH || kindId == GameKindID.KindID_QJMJ_DT) {
            	return true;
            } else {
                return false;
            }
        }
    
        //多个赖子是否可胡
        static getCanMultiMagic() {
            let kindId: number = Rule.getKindID();
            if (kindId == GameKindID.KindID_CBMJ_HZ || kindId == GameKindID.KindID_XTMJ_LH || kindId == GameKindID.KindID_HHHJ_LH || kindId == GameKindID.KindID_HHMJ_LH) {
                return true;
            } else {
                return false;
            }
        }
    
        //是否允许见字胡
        static getCanJianzihu() {
            let kindId: number = Rule.getKindID();
            if (kindId == GameKindID.KindID_JZMJ_YJLY) {
                return false;
            } else {
                return true;
            }
        }
    
        //赖子是否作为普通牌打出
        static getCanOutMagicCard() {
            let kindId: number = Rule.getKindID();
            if (kindId == GameKindID.KindID_CBMJ_HZ || kindId == GameKindID.KindID_CYMJ_MJ) {
                return true;
            } else {
                return false;
            }
        }
    
        //赖子打出是否播放飘赖子音效
        static getPlayPiaoLaizi() {
            let kindId: number = Rule.getKindID();
            if (kindId == GameKindID.KindID_QJMJ_DT || kindId == GameKindID.KindID_XTMJ_LH || kindId == GameKindID.KindID_XTMJ_YLDD || kindId == GameKindID.KindID_XTMJ_YLKZC) {
                return true;
            } else if (kindId == GameKindID.KindID_HHMJ_LH || kindId == GameKindID.KindID_HHMJ_YLDD) {
                return true;
            } else {
                return false;
            }
        }
    
        //赖子打出是否播放逞赖子音效
        static getPlayChengLaizi() {
            let kindId: number = Rule.getKindID();
            if (kindId == GameKindID.KindID_JZMJ_YJLY) {
                return true;
            } else {
                return false;
            }
        }
    
        //显示买马或抓鸟，返回：GameMaiMaType
        static getMaiMaType() {
            let kindId: number = Rule.getKindID();
            if (kindId == GameKindID.KindID_CBMJ_DD || kindId == GameKindID.KindID_CBMJ_YH) {
                //return GameMaiMaType.Type_Zhuaniao;
                //抓鸟全都改的跟赤壁红中一样
                return GameMaiMaType.Type_Zhuaniao159;
            }
            else if (kindId == GameKindID.KindID_CBMJ_HZ) {
                return GameMaiMaType.Type_Zhuaniao159;
            }
            else {
                return GameMaiMaType.Type_Maima;
            }
        }
    
        static saveLanagueType(type: number) {
            let kindId: number = Rule.getKindID();
            cc.sys.localStorage.setItem('lanagueType_xtmj' + kindId, type.toString() || "0");
        }
    
        static getLanagueType() {
            let kindId: number = Rule.getKindID();
            if (!cc.sys.localStorage.getItem('lanagueType_xtmj' + kindId)) {
                cc.sys.localStorage.setItem('lanagueType_xtmj' + kindId, '1');
            }
            let lanagueType: number = Number(cc.sys.localStorage.getItem('lanagueType_xtmj' + kindId));
            return lanagueType;
        }
    
        static getLanaguePath() {
            // 0:普通话，1:江汉话，2:荆州话，3:鄂南话
            let pathArr = ['pt', 'fy'];
            // let kindId: number = Rule.getKindID();
            // if (!cc.sys.localStorage.getItem('lanagueType_xtmj' + kindId)) {
            //     cc.sys.localStorage.setItem('lanagueType_xtmj' + kindId, '1');
            // }
            let lanagueType: number = Number(cc.sys.localStorage.getItem('lanagueType_'+this.modName));
    
            // if (!kindId || !lanagueType || lanagueType >= pathArr.length) {
            //     return pathArr[0];
            // }
            return pathArr[lanagueType];
        }
    
        //是否显示普通话
        static getHasLanaguePT() {
            return true;
        }
    
        //是否显示江汉话
        static getHasLanagueJH() {
            let kindId: number = Rule.getKindID();
            if (kindId == GameKindID.KindID_XTMJ_LH || kindId == GameKindID.KindID_XTMJ_YLDD || kindId == GameKindID.KindID_XTMJ_YLKZC) {
                return true;
            } else if (kindId == GameKindID.KindID_HHMJ_LH || kindId == GameKindID.KindID_HHMJ_YH || kindId == GameKindID.KindID_HHMJ_YLDD) {
                return true;
            }else {
                return false;
            }
        }
    
        //是否显示荆州话
        static getHasLanagueJZ() {
            let kindId: number = Rule.getKindID();
            if (kindId == GameKindID.KindID_JZMJ_YJLY) {
                return true;
            } else {
                return false;
            }
        }
    
        //是否显示鄂南话
        static getHasLanagueEN() {
            let kindId: number = Rule.getKindID();
            if (kindId == GameKindID.KindID_CBMJ_DD || kindId == GameKindID.KindID_CBMJ_YH || kindId == GameKindID.KindID_CBMJ_HZ) {
                return true;
            } else {
                return false;
            }
        }
    
        //大结算显示游戏信息
        static getAllEndGameMsg() {
            let kindId: number = Rule.getKindID();
            if (kindId == GameKindID.KindID_QJMJ_HH) {
                return '潜江麻将·潜江晃晃'
            }
            if (kindId == GameKindID.KindID_QJMJ_DT) {
                return '潜江麻将·激情单挑'
            }
            if (kindId == GameKindID.KindID_QJMJ_HZ) {
                return '潜江麻将·潜江红中'
            }
            if (kindId == GameKindID.KindID_CBMJ_DD) {
                return '赤壁玩法·剁刀'
            }
            if (kindId == GameKindID.KindID_CBMJ_HZ) {
                return '赤壁玩法·红中'
            }
            if (kindId == GameKindID.KindID_CBMJ_YH) {
                return '赤壁玩法·硬晃'
            }
            if (kindId == GameKindID.KindID_HHHJ_LH) {
                return '晃晃合集·赖晃'
            }
            if (kindId == GameKindID.KindID_HHHJ_YH) {
                return '晃晃合集·硬晃'
            }
            if (kindId == GameKindID.KindID_HHHJ_YLKZC) {
                return '晃晃合集·一赖可捉铳'
            }
            if (kindId == GameKindID.KindID_XTMJ_LH) {
                return '仙桃麻将·赖晃'
            }
            if (kindId == GameKindID.KindID_XTMJ_YLDD) {
                return '仙桃麻将·一赖到底'
            }
            if (kindId == GameKindID.KindID_XTMJ_YLKZC) {
                return '仙桃麻将·一赖可捉铳'
            }
            if (kindId == GameKindID.KindID_HHMJ_LH) {
                return '洪湖麻将·洪湖赖晃'
            }
            if (kindId == GameKindID.KindID_HHMJ_YH) {
                return '洪湖麻将·洪湖硬晃'
            }
            if (kindId == GameKindID.KindID_HHMJ_YLDD) {
                return '洪湖麻将·一赖到底'
            }
            if (kindId == GameKindID.KindID_JZMJ_YJLY) {
                return '荆州麻将·一脚赖油·逞赖子'
            }

            if (kindId == GameKindID.KindID_JZMJ_JLJM) {
                return '荆州麻将·江陵揪马'
            }

            if (kindId == GameKindID.KindID_CYMJ_MJ){
                return '崇阳麻将·崇阳麻将'
            }

            if (kindId == GameKindID.KindID_CYMJ_HH) {
                return '崇阳麻将·崇阳晃晃'
            }

            if(kindId == GameKindID.KindID_BMHM){
                return '斑马汉麻-武汉麻将'
            }

            if(kindId == GameKindID.KindID_BMHM_HH){
                return '斑马汉麻-武汉晃晃'
            }

            if(kindId == GameKindID.KindID_HZLZG){
                return '红中赖子杠'
            }
        }
    
    static isTHBG: boolean = false;

    //大厅Table显示游戏信息
    static getGameMsg(data) {
        let kindId: number = Rule.getKindID();
        let ruleStr = "";
        //几人玩
        let playerNumStr = data.gameconfig.playernum == 4 ? '' : (data.gameconfig.playernum == 3 ? "3人玩·" : "2人玩·") //四人玩不显示
        if (kindId == GameKindID.KindID_XTMJ_LH || kindId == GameKindID.KindID_XTMJ_YLDD || kindId == GameKindID.KindID_XTMJ_YLKZC) {
            ruleStr += "仙桃麻将·";
            if (kindId == GameKindID.KindID_XTMJ_LH) {
                ruleStr += '赖晃·'
            }
            if (kindId == GameKindID.KindID_XTMJ_YLDD) {
                ruleStr += '一赖到底·'
            }
            if (kindId == GameKindID.KindID_XTMJ_YLKZC) {
                ruleStr += '一赖可捉铳·'
            }
            ruleStr += playerNumStr;
        }
        else if (kindId == GameKindID.KindID_HHMJ_LH || kindId == GameKindID.KindID_HHMJ_YH || kindId == GameKindID.KindID_HHMJ_YLDD) {
            ruleStr += "洪湖麻将·";
            if (kindId == GameKindID.KindID_HHMJ_LH) {
                ruleStr += '洪湖赖晃·'
            }
            if (kindId == GameKindID.KindID_HHMJ_YLDD) {
                ruleStr += '一赖到底·'
            }
            if (kindId == GameKindID.KindID_HHMJ_YH) {
                ruleStr += '洪湖硬晃·'
            }
            ruleStr += playerNumStr;
        }
        else if (kindId == GameKindID.KindID_HHHJ_LH || kindId == GameKindID.KindID_HHHJ_YH || kindId == GameKindID.KindID_HHHJ_YLKZC) {
            ruleStr += "";   //晃晃合集·不显示大玩法
            if (kindId == GameKindID.KindID_HHHJ_LH) {
                ruleStr += '赖晃·'
            }
            if (kindId == GameKindID.KindID_HHHJ_YH) {
                ruleStr += '硬晃·'
            }
            if (kindId == GameKindID.KindID_HHHJ_YLKZC) {
                ruleStr += '一赖可捉铳·'
            }
            ruleStr += playerNumStr;
        }
        else if (kindId == GameKindID.KindID_CBMJ_DD || kindId == GameKindID.KindID_CBMJ_HZ || kindId == GameKindID.KindID_CBMJ_YH) {
            ruleStr += "赤壁麻将·";
            if (kindId == GameKindID.KindID_CBMJ_DD) {
                ruleStr += '剁刀·'
            }
            if (kindId == GameKindID.KindID_CBMJ_HZ) {
                ruleStr += '红中·'
            }
            if (kindId == GameKindID.KindID_CBMJ_YH) {
                ruleStr += '硬晃·'
            }
            ruleStr += playerNumStr;
        }
        else if (kindId == GameKindID.KindID_JZMJ_YJLY || kindId == GameKindID.KindID_JZMJ_JLJM ) {
            if (kindId == GameKindID.KindID_JZMJ_JLJM) {
                ruleStr += "荆州麻将·江陵揪马·" + playerNumStr;
            }else{
                ruleStr += "荆州麻将·一脚赖油·逞赖子·" + playerNumStr;
            }

        }
        else if (kindId == GameKindID.KindID_CYMJ_MJ){
            ruleStr += "崇阳麻将·" + playerNumStr;
        }
        else if (kindId == GameKindID.KindID_CYMJ_HH) {
            let playerNumStr = data.gameconfig.playernum+"人玩·";
            ruleStr += "崇阳晃晃·" + playerNumStr;
        }
        else if (kindId == GameKindID.KindID_QJMJ_HH || kindId == GameKindID.KindID_QJMJ_DT || kindId == GameKindID.KindID_QJMJ_HZ) {
            // ruleStr += "潜江麻将·";
            if (kindId == GameKindID.KindID_QJMJ_HH) {
                ruleStr += '潜江晃晃·'
            }
            if (kindId == GameKindID.KindID_QJMJ_DT) {
                ruleStr += '激情单挑·'
            }
            if (kindId == GameKindID.KindID_QJMJ_HZ) {
                ruleStr += '潜江红中·'
                ruleStr += playerNumStr;
            }
        }
        else if(kindId == GameKindID.KindID_JYMJ_YQ || kindId == GameKindID.KindID_JYMJ_HH || kindId == GameKindID.KindID_JYMJ_HZ){
            ruleStr += "嘉鱼麻将·";
            if (kindId == GameKindID.KindID_JYMJ_YQ) {
                ruleStr += '硬巧·'
            }
            if (kindId == GameKindID.KindID_JYMJ_HH) {
                ruleStr += '晃晃·'
            }
            if (kindId == GameKindID.KindID_JYMJ_HZ) {
                ruleStr += '红中赖子杠·'
            }
            ruleStr += playerNumStr;
        }

        if(data.gameconfig['fengding'] == 1){               //红中赖子杠的封顶： 1.金顶  2.极顶   3.单边极顶
            ruleStr += '金顶·'
        }
        else if(data.gameconfig['fengding'] == 2){
            ruleStr += '极顶·'
        }
        else if(data.gameconfig['fengding'] == 3){
            ruleStr += '单边极顶·'
        }

        if(data.gameconfig['fengding'] == 6){               //嘉鱼玩法-硬巧的封顶倍数
            ruleStr += '6倍封顶·'
        }
        else if(data.gameconfig['fengding'] == 12){
            ruleStr += '12倍封顶·'
        }
        else if(data.gameconfig['fengding'] == 24){
            ruleStr += '24倍封顶·'
        }
        else if(data.gameconfig['fengding'] == -1){
            ruleStr += '不封顶·'
        }

        if(data.gameconfig['yilaidaodi'] && eval(data.gameconfig['yilaidaodi'].toLowerCase()) == true){
            ruleStr += '一赖到底·'
        }
        if(data.gameconfig['gangkainozimo'] && eval(data.gameconfig['gangkainozimo'].toLowerCase()) == true){
            ruleStr += '杠开不计自摸·'
        }
        if(data.gameconfig['haidinozimo'] && eval(data.gameconfig['haidinozimo'].toLowerCase()) == true){
            ruleStr += '海底捞不计自摸·'
        }

        if(data.gameconfig['qufeng'] && eval(data.gameconfig['qufeng'].toLowerCase()) == true){
            ruleStr += '去风·'
        }

        if (data.gameconfig.fengnum) {
            ruleStr += data.gameconfig.fengnum+'张风·'
        }
        if (data.gameconfig.xxf && eval(data.gameconfig.xxf.toLowerCase()) == true) {
            ruleStr += '喜相逢·'
        }

        if (data.gameconfig.gangtype) {
            if(data.gameconfig.gangtype == 1){
                ruleStr += '土豪必杠·'
                this.isTHBG = true;
            }else if(data.gameconfig.gangtype == 2){
                ruleStr += '潜江赖晃·'
            }else if(data.gameconfig.gangtype == 3){
                ruleStr += '铁三角·'
            }
        }
        if (data.gameconfig.angangfan) {
            ruleStr += '暗杠'+data.gameconfig.angangfan+'倍·'
        }

        if (data.gameconfig.zmh && eval(data.gameconfig.zmh.toLowerCase()) == true) {
            ruleStr += '自摸胡·'
        }
        if (data.gameconfig.gkj && eval(data.gameconfig.gkj.toLowerCase()) == true) {
            ruleStr += '杠开加分·'
        }
        if (data.gameconfig.plyj && eval(data.gameconfig.plyj.toLowerCase()) == true) {
            ruleStr += '飘赖有奖·'
        }
        if (data.gameconfig.sdh && eval(data.gameconfig.sdh.toLowerCase()) == true) {
            ruleStr += '双大胡·'
        }
        if (data.gameconfig.zxzm && eval(data.gameconfig.zxzm.toLowerCase()) == true) {
            ruleStr += '只许自摸·'
        }
        if (data.gameconfig.rc && eval(data.gameconfig.rc.toLowerCase()) == true) {
            ruleStr += '热铳·'
        }
        if (data.gameconfig.qw && eval(data.gameconfig.qw.toLowerCase()) == true && (data.gameconfig.playernum == 3 || data.gameconfig.playernum == 2)) {
            ruleStr += '去万·'
        }
        if (data.gameconfig.sc9 && eval(data.gameconfig.sc9.toLowerCase()) == true) {
            ruleStr += '9秒场·'
        }
        if (data.gameconfig.zhuangx && eval(data.gameconfig.zhuangx.toLowerCase()) == true) {
            ruleStr += '庄闲·'
        }
        if (data.gameconfig.mm && data.gameconfig.mm > 0) {
            if (kindId == GameKindID.KindID_CBMJ_DD || kindId == GameKindID.KindID_CBMJ_HZ || kindId == GameKindID.KindID_CBMJ_YH) {
                ruleStr += "抓" + data.gameconfig.mm + "鸟·"
            }
            else {
                ruleStr += "买" + data.gameconfig.mm + "马·"
            }
        }

        if (data.gameconfig.ibird && data.gameconfig.ibird>0) {
            ruleStr += "买" +data.gameconfig.ibird + "马·"
        }

        if (data.gameconfig.dff && data.gameconfig.dff > 1) {
            ruleStr += data.gameconfig.dff + "底·"
        }

        if (data.gameconfig.difen && data.gameconfig.difen > 1) {
            ruleStr += data.gameconfig.difen + "底·"
        }

        //如果字符串最后有一个点，就把这个点去掉
        if (ruleStr.substr(ruleStr.length - 1, 1) === '·') {
            ruleStr = ruleStr.slice(0, ruleStr.length - 1);
        }

        return ruleStr;
    }
    
        //微信钉钉分享标题
        static getShareTitle() {
            let kindId: number = Rule.getKindID();
            if (kindId == GameKindID.KindID_CBMJ_DD) {
                return '赤壁麻将'
            }
            if (kindId == GameKindID.KindID_CBMJ_HZ) {
                return '赤壁麻将'
            }
            if (kindId == GameKindID.KindID_CBMJ_YH) {
                return '赤壁麻将'
            }
            if (kindId == GameKindID.KindID_HHHJ_LH) {
                return '晃晃合集'
            }
            if (kindId == GameKindID.KindID_HHHJ_YH) {
                return '晃晃合集'
            }
            if (kindId == GameKindID.KindID_HHHJ_YLKZC) {
                return '晃晃合集'
            }
            if (kindId == GameKindID.KindID_XTMJ_LH) {
                return '仙桃麻将'
            }
            if (kindId == GameKindID.KindID_XTMJ_YLDD) {
                return '仙桃麻将'
            }
            if (kindId == GameKindID.KindID_XTMJ_YLKZC) {
                return '仙桃麻将'
            }
            if (kindId == GameKindID.KindID_HHMJ_LH || kindId == GameKindID.KindID_HHMJ_YH || GameKindID.KindID_HHMJ_YLDD) {
                return '洪湖麻将'
            }
            if (kindId == GameKindID.KindID_JZMJ_YJLY ||kindId == GameKindID.KindID_JZMJ_JLJM ) {
                return '荆州麻将'
            }
            if (kindId == GameKindID.KindID_CYMJ_MJ) {
                return "崇阳麻将"
            }
            if (kindId == GameKindID.KindID_CYMJ_HH) {
                return "崇阳晃晃"
            }
        
            if (kindId == GameKindID.KindID_QJMJ_HH) {
                return '潜江晃晃'
            }
            if (kindId == GameKindID.KindID_QJMJ_DT) {
                return '激情单挑'
            }
            if (kindId == GameKindID.KindID_QJMJ_HZ) {
                return '潜江红中'
            }
    }
    
        //微信钉钉分享内容
        static getShareText(data) {
            let kindId: number = Rule.getKindID();
            let ruleStr = "";
            //几人玩
            let playerNumStr = data.gameconfig.playernum == 4 ? '' : (data.gameconfig.playernum == 3 ? "3人玩、" : "2人玩、")//四人玩不显示
            if (kindId == GameKindID.KindID_XTMJ_LH) {
                ruleStr += '赖晃、'
            }
            if (kindId == GameKindID.KindID_XTMJ_YLDD) {
                ruleStr += '一赖到底、'
            }
            if (kindId == GameKindID.KindID_XTMJ_YLKZC) {
                ruleStr += '一赖可捉铳、'
            }
            if (kindId == GameKindID.KindID_HHMJ_LH) {
                ruleStr += '洪湖赖晃、'
            }
            if (kindId == GameKindID.KindID_HHMJ_YLDD) {
                ruleStr += '一赖到底、'
            }
            if (kindId == GameKindID.KindID_HHMJ_YH) {
                ruleStr += '洪湖硬晃、'
            }
            if (kindId == GameKindID.KindID_HHHJ_LH) {
                ruleStr += '赖晃、'
            }
            if (kindId == GameKindID.KindID_HHHJ_YH) {
                ruleStr += '硬晃、'
            }
            if (kindId == GameKindID.KindID_HHHJ_YLKZC) {
                ruleStr += '一赖可捉铳、'
            }
            if (kindId == GameKindID.KindID_CBMJ_DD) {
                ruleStr += '剁刀、'
            }
            if (kindId == GameKindID.KindID_CBMJ_HZ) {
                ruleStr += '红中、'
            }
            if (kindId == GameKindID.KindID_CBMJ_YH) {
                ruleStr += '硬晃、'
            }
            if (kindId == GameKindID.KindID_JZMJ_YJLY) {
                ruleStr += "一脚赖油·逞赖子、"
            }

            if (kindId == GameKindID.KindID_JZMJ_JLJM) {
                ruleStr += "揪马玩法、"
            }


            if (kindId == GameKindID.KindID_CYMJ_MJ) {
                ruleStr += "麻将"
            }

            if (kindId == GameKindID.KindID_CYMJ_HH) {
                ruleStr += "晃晃"
            }
            if (kindId == GameKindID.KindID_QJMJ_HH) {
                ruleStr +='潜江晃晃、'
            }
            if (kindId == GameKindID.KindID_QJMJ_DT) {
                ruleStr +='激情单挑、'
            }
            if (kindId == GameKindID.KindID_QJMJ_HZ) {
                ruleStr +='潜江红中、'
            }
    
            //显示几人玩，4人玩默认不显示
            if (data.gameconfig.playernum != 4) {
                ruleStr += playerNumStr;
            }
            //可选项
            if (data.gameconfig.fengnum) {
                ruleStr += data.gameconfig.fengnum + '张风、'
            }
            if (data.gameconfig.xxf && eval(data.gameconfig.xxf.toLowerCase()) == true) {
                ruleStr += '喜相逢、'
            }

            if (data.gameconfig.gangtype) {
                if (data.gameconfig.gangtype == 1) {
                    ruleStr += '土豪必杠、'
                } else if (data.gameconfig.gangtype == 2) {
                    ruleStr += '潜江赖晃、'
                } else if (data.gameconfig.gangtype == 3) {
                    ruleStr += '铁三角、'
                }
            }
            if (data.gameconfig.angangfan) {
                ruleStr += '暗杠' + data.gameconfig.angangfan + '倍、'
            }
            if (data.gameconfig.zmh && eval(data.gameconfig.zmh.toLowerCase()) == true) {
                ruleStr += '自摸胡、'
            }
            if (data.gameconfig.gkj && eval(data.gameconfig.gkj.toLowerCase()) == true) {
                ruleStr += '杠开加分、'
            }
            if (data.gameconfig.plyj && eval(data.gameconfig.plyj.toLowerCase()) == true) {
                ruleStr += '飘赖有奖、'
            }
            if (data.gameconfig.sdh && eval(data.gameconfig.sdh.toLowerCase()) == true) {
                ruleStr += '双大胡·'
            }
            if (data.gameconfig.zxzm && eval(data.gameconfig.zxzm.toLowerCase()) == true) {
                ruleStr += '只许自摸·'
            }
            if (data.gameconfig.rc && eval(data.gameconfig.rc.toLowerCase()) == true) {
                ruleStr += '热铳·'
            }
            if (data.gameconfig.qw && eval(data.gameconfig.qw.toLowerCase()) == true && (data.gameconfig.playernum == 3 || data.gameconfig.playernum == 2)) {
                ruleStr += '去万、'
            }
            if (data.gameconfig.sc9 && eval(data.gameconfig.sc9.toLowerCase()) == true) {
                ruleStr += '9秒场、'
            }
            if (data.gameconfig.zhuangx && eval(data.gameconfig.zhuangx.toLowerCase()) == true) {
                ruleStr += '庄闲、'
            }
            if (data.gameconfig.mm && data.gameconfig.mm > 0) {
                if (kindId == GameKindID.KindID_CBMJ_DD || kindId == GameKindID.KindID_CBMJ_HZ || kindId == GameKindID.KindID_CBMJ_YH) {
                    ruleStr += "抓" + data.gameconfig.mm + "鸟、"
                }
                else {
                    ruleStr += "买" + data.gameconfig.mm + "马、"
                }
            }
            if (data.gameconfig.dff && data.gameconfig.dff > 1) {
                ruleStr += data.gameconfig.dff + "底、"
            }
            ruleStr += '大战' + data.gameconfig.roundnum + "局,速来！"
    
            return ruleStr;
        }
    
        //是否是红中玩法
        static isCBHZ() {
            let kindId: number = Rule.getKindID();
            if (kindId == GameKindID.KindID_CBMJ_HZ) {
                return true;
            }
            else {
                return false;
            }
        }
    }
}


