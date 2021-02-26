/// <reference path="common.goldBaseScene.d.ts" />
declare namespace common {
    class GameSceneFrDG<IFriendT extends common.mod.friendBaseMod<mod.IFriendGame_User_Info>, IplayerT extends common.DG.IPlayerLayer> extends common.FriendBaseScene<IFriendT, IplayerT> {
        dipaiNode: cc.Node;
        dipaiCard: common.PkSmallRow;
        btn_lipai: ccui.Button;
        chatLayerNode: cc.Node;
        chatBtn: ccui.Button;
        roundLableBig: ccui.Text;
        menuLayerNode: cc.Node;
        endLayerNode: cc.Node;
        playerInfoLayer: cc.Node;
        settingLayer: cc.Node;
        handCardRow: common.PkRow;
        handCardAni: common.PkAni;
        outCardRow: Array<common.PkRow>;
        outCardNode: Array<cc.Node>;
        teamCardRow: Array<common.PkSmallRow>;
        clockPos: Array<cc.Point>;
        btn_menu: ccui.Button;
        buyaoBtn: ccui.Button;
        tishiBtn: ccui.Button;
        outCardBtn: ccui.Button;
        yingpaiBtn: ccui.Button;
        buyingBtn: ccui.Button;
        tishiNode: cc.Node;
        tuoguanMask: cc.Node;
        curSelCard: {
            type: number;
            cards: Array<number>;
        };
        isAct: boolean;
        constructor();
        initUI(): void;
        onReEnter(): void;
        bindModEvents(): void;
        cleanUp(): void;
        BindUIEvent(): void;
        onCloseEndLayer(): void;
        noticeFunc(type: number): void;
        onPlayScore(data: {
            chairid: number;
            getscore: number;
            playscore: Array<number>;
        }): boolean;
        onTurnScore(data: {
            turnscore: number;
        }): boolean;
        onPlaySound(data: {
            soundtype: number;
            currentuser: number;
        }): boolean;
        teamerPai(data: {
            index: number;
            card: Array<number>;
        }): boolean;
        endOut(data: {
            theWhoPlay: number;
        }): boolean;
        onIenterRoom(): boolean;
        resetBtn(): void;
    }
}
