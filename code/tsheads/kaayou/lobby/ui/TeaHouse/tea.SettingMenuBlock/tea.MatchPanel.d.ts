declare namespace tea {
    class tea_MatchPanelMgr {
        static __INS__: tea_MatchPanelMgr;
        static getInstance(_zOrder: number): tea_MatchPanelMgr;
        __selfPanel: TeaMatchPanel;
        _zOrder: number;
        _data: any;
        init(): boolean;
        getPanel(create?: boolean): TeaMatchPanel;
    }
    class TeaMatchPanel extends kaayou.ModelLayer {
        constructor();
        btnClose: ccui.Button;
        btnSubmit: ccui.Button;
        cbSwitch: ccui.CheckBox;
        initUI(): void;
        onTeaHouseUpdateInfo(data: any): void;
        onToggleClick(event: kaayou.CheckEvent): void;
        Show(): void;
        Hide(): void;
    }
}
