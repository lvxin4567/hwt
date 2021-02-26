/**
 *  排行榜设置
 */
declare namespace tea {
    class tea_RankListPanelMgr {
        static __INS__: tea_RankListPanelMgr;
        static getInstance(_zOrder: number): tea_RankListPanelMgr;
        __selfPanel: RankListPanel;
        _zOrder: number;
        init(): boolean;
        getPanel(create?: boolean): RankListPanel;
    }
    class RankListPanel extends kaayou.ModelLayer {
        constructor();
        btn_close: ccui.Button;
        btn_set: ccui.Button;
        singleTile_image: ccui.ImageView;
        title_layout: ccui.Layout;
        title_layout_Group: common.RadioGroup;
        title_layoutNum: number;
        timeSelect_layout: ccui.Layout;
        timeSelectNum: number;
        timeSelect_group: common.RadioGroup;
        list: common.PullList;
        cell: ccui.Layout;
        label_result: ccui.Text;
        label_topMem: ccui.Text;
        _rankData: {
            rank_round: number;
            "rank_winer": number;
            "rank_record": number;
            "rank_open": boolean;
        };
        initUI(): void;
        getRankList(rankType: number, timeType: number, clear: boolean): void;
        imageArr: any[];
        initShowUI(data: {
            rank_round: number;
            "rank_winer": number;
            "rank_record": number;
            "rank_open": boolean;
        }): void;
        rank_Type: number;
        Show(data: {
            rank_round: number;
            "rank_winer": number;
            "rank_record": number;
            "rank_open": boolean;
        }): void;
        Hide(): void;
    }
}
