declare namespace lobby {
    class RecordCell extends kaayou.Block {
        constructor();
        img_iconBg: ccui.ImageView;
        txt_wf: ccui.Text;
        txt_roomNum: ccui.Text;
        txt_playCount: ccui.Text;
        txt_peopleCount: ccui.Text;
        txt_playTime: ccui.Text;
        code: string;
        mjIcon: ccui.ImageView;
        playerName: Array<ccui.Text>;
        playerScore: Array<ccui.Text>;
        btn_detail: ccui.Button;
        initWithNode(node: ccui.Widget): void;
        setInfo(data: {
            gamenum: number;
            icon: string;
            roomid: number;
            wf: string;
            time: number;
            curNum: number;
            playerArr: Array<{
                nickname: string;
                score: number;
            }>;
            player_count: number;
            round_played: number;
            round_sum: any;
            number: any;
        }): void;
        unuse(): void;
    }
    class LobbyRecordPanelMgr {
        static __INS__: LobbyRecordPanelMgr;
        static getInstance(_zOrder?: number): LobbyRecordPanelMgr;
        _zOrder: number;
        __selfPanel: LobbyRecordPanel;
        init(): boolean;
        getPanel(create?: boolean): LobbyRecordPanel;
    }
    class LobbyRecordPanel extends kaayou.Layer {
        constructor();
        iMenuIndex: number;
        iLastInnerHeight: number;
        ivTips: ccui.ImageView;
        topbarMgr: lobby.TopBarMgr;
        svRecord: ccui.ScrollView;
        btn_playBack: ccui.Button;
        menuGroup: common.RadioGroup;
        record_mode: Node;
        initUI(): void;
        onMenuSelected(e: kaayou.RadioEvent): void;
        Today(clear: any): void;
        Yesterday(clear: any): void;
        BeforeYesterday(clear: any): void;
        Week(clear: any): void;
        refreshView(clear: any): void;
        private createCell;
        Show(): void;
        Hide(): void;
        setRePlayList(data: any): void;
    }
}
