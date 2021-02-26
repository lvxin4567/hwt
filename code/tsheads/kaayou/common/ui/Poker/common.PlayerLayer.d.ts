declare namespace common {
    interface IPlayerLayer extends cc.INode {
        cleanUp(): any;
        setPlayerInfo(playerInfo: any): any;
        setClock(time: number): any;
        setClockPosition(pos: cc.Point): any;
        setTimeLabel(time: number): any;
        onChat(data: any): any;
        onMicChat(start: boolean): any;
        onGVoiceSta(sta: number): any;
    }
    abstract class PlayerLayer extends kaayou.Block {
        _index: number;
        headPanel: ccui.Layout;
        headImage: ccui.ImageView;
        nameText: ccui.Text;
        scoreText: ccui.Text;
        offlineImage: ccui.ImageView;
        zhuangImage: ccui.ImageView;
        textChatNode: cc.Node;
        iconChatNode: cc.Node;
        soundChatNode: cc.Node;
        gvoicingImage: ccui.ImageView;
        gvoiceBorbidImage: ccui.ImageView;
        readyTagImage: ccui.ImageView;
        warningNode: cc.Node;
        clock: ccui.ImageView;
        clockTime: number;
        fleeTime: ccui.Text;
        abstract initUI(node: cc.Node): any;
        abstract setPlayerInfo(playerInfo: any): any;
        abstract onChat(data: any): any;
        abstract onMicChat(start: boolean): any;
        cleanUp(): void;
        getIndex(): number;
        setIndex(value: number): void;
        setPlayerHead(_url: string, sex: number, uid: number): void;
        setPlayerName(name: string): void;
        setScore(score: number): void;
        setoffline(b: boolean): void;
        setZhuang(b: boolean): void;
        setReadyTag(b: boolean): void;
        setClockPosition(pos: cc.Point): void;
        setClock(time: number): void;
        onUpdateTime(): void;
        setTimeLabel(time: number): void;
        setWarning(b: boolean): void;
        onGVoiceSta(sta: number): void;
    }
    namespace DG {
        interface IPlayerLayer extends common.IPlayerLayer {
            setPassTag(b: boolean): any;
        }
        abstract class PlayerLayer extends common.PlayerLayer {
            youArr: Array<string>;
            cardNumNode: ccui.ImageView;
            roundScoreNode: ccui.ImageView;
            scoreNode: ccui.ImageView;
            tuoguanImage: ccui.ImageView;
            mingjiImage: ccui.ImageView;
            yingpaiImage: ccui.ImageView;
            youImage: ccui.ImageView;
            passTagImage: ccui.ImageView;
            yingpaiTagImage: ccui.ImageView;
            buyingTagImage: ccui.ImageView;
            cleanUp(): void;
            setCardNum(num: number, isPlaying: boolean): void;
            setRoundScore(visible: boolean, score: number): void;
            setScore(score: number): void;
            setTuoguan(b: boolean): void;
            setMingJi(b: boolean): void;
            setYingPai(b: boolean): void;
            setYou(youIndex: number, isstart: boolean): void;
            setPassTag(b: boolean): void;
            setYingPaiTag(b: boolean): void;
            setBuYingTag(b: boolean): void;
        }
    }
}
