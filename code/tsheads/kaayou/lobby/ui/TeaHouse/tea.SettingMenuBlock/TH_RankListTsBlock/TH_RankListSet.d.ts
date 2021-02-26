/**
 *  排行榜设置
 */
declare namespace tea {
    class tea_RankListSetMgr {
        static __INS__: tea_RankListSetMgr;
        static getInstance(_zOrder: number): tea_RankListSetMgr;
        __selfPanel: RankListSetPanel;
        _zOrder: number;
        init(): boolean;
        getPanel(create?: boolean): RankListSetPanel;
    }
    class RankListSetPanel extends kaayou.ModelLayer {
        constructor();
        btn_close: ccui.Button;
        btn_set: ccui.Button;
        rankSwitch: ccui.Layout;
        rankSwitch_group: common.RadioGroup;
        rankSwitchNum: number;
        playCountRank_layout: ccui.Layout;
        playWinRank_layout: ccui.Layout;
        playRecordRank: ccui.Layout;
        initUI(): void;
        submitSet(): void;
        Show(data: {
            rank_round: number;
            "rank_winer": number;
            "rank_record": number;
            "rank_open": boolean;
        }): void;
        Hide(): void;
    }
}
