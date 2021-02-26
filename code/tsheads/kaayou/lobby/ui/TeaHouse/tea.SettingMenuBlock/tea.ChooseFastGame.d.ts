declare namespace tea {
    class tea_ChooseFastGameMgr {
        static __INS__: tea_ChooseFastGameMgr;
        static getInstance(_zOrder: any): tea_ChooseFastGameMgr;
        __selfPanel: ChooseFastGamePanel;
        _zOrder: number;
        init(): boolean;
        getPanel(create?: boolean): ChooseFastGamePanel;
    }
    class ChooseFastGamePanel extends kaayou.ModelLayer {
        prfRow: ccui.Layout;
        constructor();
        btnClose: ccui.Button;
        sv_ChooseGame: ccui.ScrollView;
        initUI(): void;
        private createCell;
        Show(): void;
        setSvData(): void;
        Hide(): void;
    }
}
