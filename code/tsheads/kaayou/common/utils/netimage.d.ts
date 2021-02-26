interface PLAYER_HEAD_CALLBACK {
    (url: string): boolean;
}
declare class NetImage {
    static Icache: {};
    static loadImage(url: any): Promise<unknown>;
    static doSpriteContentSize(sp: cc.Sprite, size: cc.Size): void;
    static doSpriteContentSizeAndPosition(sp: cc.Sprite, size: cc.Size): void;
    static doLoadHeadImageWithLayout(sex: number, imgurl: string, sp: cc.Sprite, size: cc.Size, callback: Function, checkCall?: PLAYER_HEAD_CALLBACK | number): void;
    static setPlayerHead(headImage: ccui.ImageView, _url: string, sex?: number, checkCall?: PLAYER_HEAD_CALLBACK | number): void;
    static loadImageWithSaveLocal(url: any): Promise<unknown>;
}
