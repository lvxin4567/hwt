declare namespace tea {
    class tea_setGroupMgr {
        static __INS__: tea_setGroupMgr;
        static getInstance(__zOrder: any): tea_setGroupMgr;
        __zOrder: number;
        __selfPanel: setGroupPopPanel;
        init(): boolean;
        getPanel(create?: boolean): setGroupPopPanel;
    }
    class setGroupPopPanel extends kaayou.ModelLayer {
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
        private createRow;
        getCanAddMemberList(clear?: boolean): void;
        initUI(): void;
        resetMember(): void;
        Show(): void;
        Hide(): void;
        showGroup(data: any): void;
        showMember(data: any): void;
    }
}
