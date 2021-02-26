declare namespace common {
    interface MjPosInfo {
        "direction": string;
        "type": string;
        "kaikou": number;
        "index": number;
        "pic": string;
        "posx": number;
        "posy": number;
        "zOrder": number;
        "flowerPosx": number;
        "flowerPosy": number;
        "flowerScale": number;
        "flowerRotation": number;
        "scale": number;
        "flowerPic"?: string;
    }
    interface MjInfotype {
        "hand": Array<MjPosInfo>;
        "table": Array<MjPosInfo>;
        "gang": Array<Array<MjPosInfo>>;
        "pilai": Array<MjPosInfo>;
        "discard": Array<MjPosInfo>;
        "heap": Array<MjPosInfo>;
    }
    interface MjposinfoGroup {
        "south": MjInfotype;
        "east": MjInfotype;
        "north": MjInfotype;
        "west": MjInfotype;
    }
    class tableLayer<game_MaJonCard extends common.MaJonCard> extends kaayou.Layer {
        meldRow: {
            [key: string]: MajionMeldRow<game_MaJonCard>;
        };
        handRow: {
            [key: string]: MaJonRow<game_MaJonCard>;
        };
        tableRow: {
            [key: string]: MaJonRow<game_MaJonCard>;
        };
        discardRow: {
            [key: string]: MaJonRow<game_MaJonCard>;
        };
        pilaiRow: {
            [key: string]: MaJonRow<game_MaJonCard>;
        };
        heapRow: {
            [key: string]: MaJonRow<game_MaJonCard>;
        };
        chupaiArr: Array<MjPosInfo>;
        isangangback: boolean;
        constructor(mjRes: string, mjInfo: string, gameName: string, isangangback?: boolean);
        setMajonModel(mjInfo: string, mjRes: string): void;
        ReEnter(mjRes: string, gameName: string): void;
        initTable(): void;
        parseInfo(url: string): MjposinfoGroup;
        getIndexByDiection(direction: any): number;
    }
}
