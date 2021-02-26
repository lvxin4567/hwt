declare namespace lobby {
    class RecruitingPanelMgr {
        static __INS__: RecruitingPanelMgr;
        static getInstance(_zOrder?: number): RecruitingPanelMgr;
        __selfPanel: RecruitingPanel;
        _gold: number;
        _zOrder: number;
        onUpdateUserInfo(data: Data_Uerinfo): void;
        init(): boolean;
        getPanel(create?: boolean): RecruitingPanel;
    }
    class RecruitingPanel extends kaayou.ModelLayer {
        constructor();
        btnClose: ccui.Button;
        btnCopy: ccui.Button;
        btnGameClose: ccui.Button;
        btnSearch: ccui.Button;
        btnSwitch: ccui.Button;
        btnSubmit: ccui.Button;
        ebSearch: ccui.TextField;
        ebTel: ccui.TextField;
        gameKey: string;
        lbGameName: ccui.Text;
        lbSearch: ccui.Text;
        lbTel: ccui.Text;
        lbWechat: ccui.Text;
        pageView: ccui.PageView;
        pnlGame: ccui.Layout;
        svGame: ccui.ScrollView;
        prfGame: ccui.Layout;
        private createCell;
        initUI(): void;
        search(): void;
        Show(): void;
        showGame(data: any): void;
        showGameInfo(data: any): void;
        Hide(): void;
    }
}
