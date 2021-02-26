declare namespace lobby {
    class LobbyScene extends kaayou.kScene {
        bGirlSpeaking: boolean;
        currentSeagullIndex: number;
        currentWaveIndex: number;
        ivSeagull: ccui.ImageView;
        ivWave: ccui.ImageView;
        saGirl: sp.SkeletonAnimation;
        seagullDelay: number;
        waveDelay: number;
        constructor();
        initUI(): void;
        __isGetNotice: boolean;
        onReEnter(): void;
        onLogOutClean(): void;
        onReExit(): void;
        onGoldFallAnimation(): void;
        update(dt: any): void;
    }
}
