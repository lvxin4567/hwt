declare namespace common {
    enum GameKindID {
        KindID_NULL = 0,
        KindID_XTMJ_LH = 598,
        KindID_XTMJ_YLDD = 597,
        KindID_XTMJ_YLKZC = 596,
        KindID_JZMJ_YJLY = 595,
        KindID_JZMJ_JLJM = 599,
        KindID_HHHJ_YH = 594,
        KindID_HHHJ_LH = 593,
        KindID_HHHJ_YLKZC = 592,
        KindID_CBMJ_DD = 591,
        KindID_CBMJ_YH = 590,
        KindID_CBMJ_HZ = 589,
        KindID_HHMJ_LH = 569,
        KindID_HHMJ_YLDD = 570,
        KindID_HHMJ_YH = 568,
        KindID_CYMJ_MJ = 897,
        KindID_CYMJ_HH = 896,
        KindID_QJMJ_HH = 578,
        KindID_QJMJ_DT = 577,
        KindID_QJMJ_HZ = 576,
        KindID_JYMJ_HZ = 581,
        KindID_JYMJ_HH = 580,
        KindID_JYMJ_YQ = 579,
        KindID_BMHM = 889,
        KindID_BMHM_HH = 587,
        KindID_HZLZG = 984
    }
    enum GameMaiMaType {
        Type_Null = 0,
        Type_Maima = 1,
        Type_Zhuaniao = 2,
        Type_Zhuaniao159 = 3
    }
    class Rule {
        static kindId: GameKindID;
        static modName: string;
        static setKindID(kindid: number): void;
        static getKindID(): GameKindID;
        static getHasMagic(): boolean;
        static isQJHZ(): boolean;
        static getHasChaotian(): boolean;
        static getCanMultiMagic(): boolean;
        static getCanJianzihu(): boolean;
        static getCanOutMagicCard(): boolean;
        static getPlayPiaoLaizi(): boolean;
        static getPlayChengLaizi(): boolean;
        static getMaiMaType(): GameMaiMaType.Type_Maima | GameMaiMaType.Type_Zhuaniao159;
        static saveLanagueType(type: number): void;
        static getLanagueType(): number;
        static getLanaguePath(): string;
        static getHasLanaguePT(): boolean;
        static getHasLanagueJH(): boolean;
        static getHasLanagueJZ(): boolean;
        static getHasLanagueEN(): boolean;
        static getAllEndGameMsg(): "潜江麻将·潜江晃晃" | "潜江麻将·激情单挑" | "潜江麻将·潜江红中" | "赤壁玩法·剁刀" | "赤壁玩法·红中" | "赤壁玩法·硬晃" | "晃晃合集·赖晃" | "晃晃合集·硬晃" | "晃晃合集·一赖可捉铳" | "仙桃麻将·赖晃" | "仙桃麻将·一赖到底" | "仙桃麻将·一赖可捉铳" | "洪湖麻将·洪湖赖晃" | "洪湖麻将·洪湖硬晃" | "洪湖麻将·一赖到底" | "荆州麻将·一脚赖油·逞赖子" | "荆州麻将·江陵揪马" | "崇阳麻将·崇阳麻将" | "崇阳麻将·崇阳晃晃" | "斑马汉麻-武汉麻将" | "斑马汉麻-武汉晃晃" | "红中赖子杠";
        static isTHBG: boolean;
        static getGameMsg(data: any): string;
        static getShareTitle(): "赤壁麻将" | "晃晃合集" | "仙桃麻将" | "洪湖麻将" | "荆州麻将" | "崇阳麻将" | "崇阳晃晃" | "潜江晃晃" | "激情单挑" | "潜江红中";
        static getShareText(data: any): string;
        static isCBHZ(): boolean;
    }
}
