/**
 *  隐私设置
 */
declare namespace tea {
    class tea_TeaJoinTableSetPanelMgr {
        static __INS__: tea_TeaJoinTableSetPanelMgr;
        static getInstance(_zOrder: number): tea_TeaJoinTableSetPanelMgr;
        __selfPanel: JoinTableSetPanel;
        _zOrder: number;
        _data: tea.Data_HouseInfo;
        init(): boolean;
        getPanel(create?: boolean): JoinTableSetPanel;
    }
    class JoinTableSetPanel extends kaayou.ModelLayer {
        constructor();
        btn_close: ccui.Button;
        label_tips: ccui.Text;
        cb_JoinSet: ccui.CheckBox;
        img_Tip: ccui.ImageView;
        tip_Layout: ccui.Layout;
        btn_Submit: ccui.Button;
        _data: tea.Data_HouseInfo;
        initUI(): void;
        onTeaHouseUpdateInfo(data: tea.Data_HouseInfo): void;
        Show(): void;
        Hide(): void;
    }
}
