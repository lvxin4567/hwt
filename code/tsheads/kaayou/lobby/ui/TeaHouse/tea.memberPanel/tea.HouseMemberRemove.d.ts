declare namespace tea {
    class MemberRemovePanelManager {
        static __INS__: MemberRemovePanelManager;
        static getInstance(): MemberRemovePanelManager;
        memberremovePanel: tea.MemberRemovePanel;
        init(): boolean;
        removeDialogShow(data: any): void;
        DialogRemoved(): void;
    }
    class MemberRemovePanel extends kaayou.ModelLayer {
        constructor();
        btn_cancel: ccui.Button;
        black_check: ccui.CheckBox;
        btn_sure: ccui.Button;
        _data: Data_HouseMemberItem;
        initUI(): void;
        Show(data: any): void;
        Hide(): void;
    }
}
