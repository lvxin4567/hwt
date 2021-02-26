declare namespace tea {
    class tea_NoDeskmateMgr {
        static __INS__: tea_NoDeskmateMgr;
        static getInstance(): tea_NoDeskmateMgr;
        __selfPanel: NoDeskmate;
        init(): boolean;
        getPanel(create?: boolean): NoDeskmate;
    }
    class NoDeskmate extends kaayou.ModelLayer {
        constructor();
        _groupId: number;
        btnAdd: ccui.Button;
        btnAddClose: ccui.Button;
        btnClose: ccui.Button;
        btnSearch: ccui.Button;
        ebSearch: any;
        ndAdd: ccui.Layout;
        ndSearch: ccui.Layout;
        prfAdd: ccui.Layout;
        prfRow: ccui.Layout;
        prfCell: ccui.Layout;
        prfMember: ccui.Layout;
        svNoDeskmate: ccui.ScrollView;
        svMember: common.PullList;
        noMember2Cb: ccui.CheckBox;
        private createRow;
        private createMemberRow;
        getNoDeskmateMember(clear?: boolean): void;
        initUI(): void;
        noMember2CbClick(e: kaayou.Event): void;
        inputMask(): {
            show: () => void;
            hide: () => void;
        };
        resetMember(): void;
        Show(): void;
        showGroup(data: any): void;
        showMember(data: any): void;
    }
}
