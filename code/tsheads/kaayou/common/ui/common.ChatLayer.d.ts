declare namespace common {
    abstract class ChatLayer extends kaayou.ModelLayer {
        _isInit: boolean;
        _emotionScr: ccui.ScrollView;
        _quyuScr: ccui.ScrollView;
        _quyuStrsArray: Array<string>;
        _curMod: mod.gameBaseMod<mod.IGame_User_Info, mod.ITableInfo>;
        _rowNum: number;
        _maxNum: number;
        _emotionPosX: number[];
        _emotionPosY: number;
        _emotionChatLineName: string;
        _emotionBgName: string;
        _emotionName: any;
        _talkNormalCol: cc.Color;
        _talkPressCol: cc.Color;
        constructor(ccsName: string);
        initUI(ccsName: string): void;
        setCurMod(curMod: common.mod.gameBaseMod<common.mod.IGame_User_Info, common.mod.ITableInfo>): void;
        abstract initProperties(): any;
        initEmotionScr(): void;
        onTouchStartEmotion(e: kaayou.TouchEvent): void;
        onTouchEndEmotion(e: kaayou.TouchEvent): void;
        resetEmotionScr(): void;
        abstract sendEmotionMsg(index: number): any;
        initQuYuScr(): void;
        onTouchStartTalk(e: kaayou.TouchEvent): void;
        onTouchEndTalk(e: kaayou.TouchEvent): void;
        resetTalkScr(): void;
        abstract sendTalkMsg(index: number): any;
    }
    class chatLayerCell extends ccui.Layout {
        textNormal: ccui.Text;
        textPress: ccui.Text;
        textBg: ccui.ImageView;
        constructor();
    }
}
