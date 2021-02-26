declare namespace lobby {
    class NoticePanelMgr {
        static __INS__: NoticePanelMgr;
        static getInstance(_zOrder?: number): NoticePanelMgr;
        _zOrder: number;
        __selfPanel: NoticePanel;
        init(): boolean;
        getPanel(create?: boolean): NoticePanel;
        doUpIndex(): void;
    }
    class NoticePanel extends kaayou.ModelLayer {
        constructor();
        notice_img_layout: ccui.Layout;
        btn_notice_close: ccui.Button;
        scr_right_content: ccui.ScrollView;
        scr_left_menu: ccui.ScrollView;
        menu_cell_mode: ccui.Layout;
        _contentviewMap: {
            [key: string]: Function;
        };
        playArray: Array<ccui.Button>;
        initUI(): void;
        _dataArr: any;
        getIsCan(): boolean;
        __lastMenuDid: number;
        setRuleList(data: Array<INoticeData>): void;
        Show(data: Array<INoticeData>): void;
        Hide(): void;
    }
}
