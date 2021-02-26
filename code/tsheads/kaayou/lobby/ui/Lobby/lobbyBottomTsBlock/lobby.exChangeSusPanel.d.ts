declare namespace lobby {
    class lobbyExchengeSusMgr {
        static __INS__: lobbyExchengeSusMgr;
        static getInstance(_zOrder?: number): lobbyExchengeSusMgr;
        _zOrder: number;
        __selfPanel: lobbyExchengeSusPanel;
        init(): boolean;
        showGetRewardInfo(data: {
            name: string;
        }): void;
        getRewardRemoved(): void;
    }
    class lobbyExchengeSusPanel extends kaayou.ModelLayer {
        constructor();
        btnClose: ccui.Button;
        ani_layout: ccui.Layout;
        productName: ccui.Text;
        productImg: ccui.ImageView;
        initUI(): void;
        Show(data: {
            name: string;
        }): void;
        HideUI(callBack: Function): void;
    }
}
