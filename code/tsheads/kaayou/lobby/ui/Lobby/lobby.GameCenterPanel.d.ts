declare namespace lobby {
    class GameCell extends kaayou.Block {
        constructor();
        game_key: string;
        txt_gameName: ccui.Text;
        img_gameIconBg: ccui.Layout;
        img_head: cc.Sprite;
        initWithNode(node: ccui.Widget, callback: any): void;
        setGame(key: any, gameName: any, index: any, icon: any): void;
        unuse(): void;
    }
    class GameCenterMgr {
        static __INS__: GameCenterMgr;
        static getInstance(_zOrder?: number): GameCenterMgr;
        __selfPanel: GameCenter;
        _zOrder: number;
        init(): boolean;
        getPanel(create?: boolean): GameCenter;
    }
    class GameCenter extends kaayou.Layer {
        constructor();
        game_mode: ccui.Layout;
        game_all: ccui.ScrollView;
        topbarMgr: lobby.TopBarMgr;
        leftMenu: ccui.Layout;
        edit_searchRed: any;
        search_btn: ccui.Button;
        gc_NoGame: ccui.ImageView;
        cancel_btn: ccui.Button;
        initUI(): void;
        initLeftMenu(): void;
        private createCell;
        gameIndex: number;
        private onGetGameCenterList;
        private orderByAreaFirst;
        Show(): Promise<void>;
        Hide(): void;
    }
}
