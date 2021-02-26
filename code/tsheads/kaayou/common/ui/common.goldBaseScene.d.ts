declare namespace common {
    class goldBaseScene<IGoldModT extends common.mod.goldBaseMod<mod.IGame_User_Info>, IPlayerLayerT extends common.IPlayerLayer> extends kaayou.kScene {
        curMod: IGoldModT;
        gameState: number;
        changeTableTime: number;
        readyClock: ccui.ImageView;
        clockTime: number;
        clockTimeTotal: number;
        changeTableBtn: ccui.Button;
        readyBtn: ccui.Button;
        inviteBtn: ccui.Button;
        playerLayer: Array<IPlayerLayerT>;
        batteryBar: ccui.LoadingBar;
        batteryCharge: cc.Node;
        curTimeText: ccui.Text;
        constructor();
        initUI(): void;
        onReEnter(): void;
        onReExit(): void;
        bindModEvents(): void;
        cleanUp(): void;
        update(): void;
        onCanContinue(data: {
            bankrupt: boolean;
        }): void;
        onUpdatePlayer(data: {
            Players: Array<common.mod.IGame_User_Info>;
        }): void;
        onIenterRoom(): boolean;
        onIready(): void;
        checkChangeTableTimer(timer: number): void;
        onEnableChangeTable(): void;
        setReadyClock(time: number): void;
        checkReadyTimer(timer: number): void;
        onAutoLeft(): void;
        resetBtn(): void;
        broadcastUseMagic(data: {
            type: number;
            dwindex: number;
            dwtoindex: number;
            index: number;
        }): void;
        showSkeleton(aniStr: string, pos: cc.Point, zIndex?: number): void;
        onMicChat(data: {
            index: number;
            start: boolean;
        }): void;
    }
}
