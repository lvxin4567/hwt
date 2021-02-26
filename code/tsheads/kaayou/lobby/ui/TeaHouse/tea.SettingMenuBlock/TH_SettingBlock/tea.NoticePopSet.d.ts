/**
 *  隐私设置
 */
declare namespace tea {
    class tea_NoticePopMgr {
        static __INS__: tea_NoticePopMgr;
        static getInstance(_zOrder: number): tea_NoticePopMgr;
        __selfPanel: NoticePopPanel;
        _zOrder: number;
        init(): boolean;
        getPanel(create?: boolean): NoticePopPanel;
    }
    class NoticePopPanel extends kaayou.ModelLayer {
        constructor();
        btn_submit: ccui.Button;
        noticeSwitch: ccui.Layout;
        menuGroup: common.RadioGroup;
        edit_Notice: ccui.TextField;
        ebNotice: any;
        btn_close: ccui.Button;
        selIndex: number;
        tip_label: ccui.Text;
        initUI(): void;
        onTeaHouseUpdateInfo(data: tea.Data_HouseInfo): void;
        checkChange(): boolean;
        onMenuSelected(e: kaayou.RadioEvent): void;
        onMenuUnSelected(e: kaayou.RadioEvent): void;
        Show(): void;
        Hide(): void;
    }
}
