/**
 *  隐私设置
 */
declare namespace tea {
    class tea_TeaFrozePanelMgr {
        static __INS__: tea_TeaFrozePanelMgr;
        static getInstance(): tea_TeaFrozePanelMgr;
        __selfPanel: FrozePanel;
        init(): boolean;
        getPanel(create?: boolean): FrozePanel;
    }
    class FrozePanel extends kaayou.ModelLayer {
        constructor();
        btn_close: ccui.Button;
        btn_froze: ccui.Button;
        btn_unfroze: ccui.Button;
        froze: ccui.Layout;
        unfroze: ccui.Layout;
        label_tips: ccui.Text;
        initUI(): void;
        doMemHide(b: any): void;
        onTeaHouseUpdateInfo(): void;
        Show(): void;
        Hide(): void;
    }
}
