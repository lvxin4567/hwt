declare namespace tea {
    /**
     * 活动楼层的选中组件
     */
    class ac_FloorCell extends kaayou.Block {
        _data: Data_HosueFloorInfo;
        cb: ccui.CheckBox;
        lbName: ccui.Text;
        constructor();
        initWithNode(node: ccui.Widget, callback: any): void;
        setInfo(data: any, isSelected: any): void;
        unuse(): void;
    }
    /**
     * 创建活动那个面板注册监听
     */
    class tea_TeaCreateActivityPanelMgr {
        static __INS__: tea_TeaCreateActivityPanelMgr;
        static getInstance(): tea_TeaCreateActivityPanelMgr;
        _selfPanel: createActivityPanel;
        init(): boolean;
        getPanel(create?: boolean): createActivityPanel;
    }
    /*** 创建活动面板 */
    class createActivityPanel extends kaayou.ModelLayer {
        constructor();
        btn_close: ccui.Button;
        btn_submit: ccui.Button;
        d_statrDel7: ccui.Button;
        d_statrDel: ccui.Button;
        d_statrAdd: ccui.Button;
        d_statrAdd7: ccui.Button;
        d_endDel7: ccui.Button;
        d_endDel: ccui.Button;
        d_endAdd: ccui.Button;
        d_endAdd7: ccui.Button;
        ebName: any;
        h_statrDel6: ccui.Button;
        h_statrDel: ccui.Button;
        h_statrAdd: ccui.Button;
        h_statrAdd6: ccui.Button;
        ndName: cc.Layer;
        h_endDel6: ccui.Button;
        h_endDel: ccui.Button;
        h_endAdd: ccui.Button;
        h_endAdd6: ccui.Button;
        d_start_label: ccui.Text;
        t_start_label: ccui.Text;
        d_end_label: ccui.Text;
        t_end_label: ccui.Text;
        actName_label: ccui.Text;
        actName_edit: ccui.TextField;
        rank_Type_choose: ccui.Layout;
        floorScrollView: ccui.ScrollView;
        startTime: number;
        endTime: number;
        rankType: number;
        cbFloor: ccui.Layout;
        typeGroup: common.RadioGroup;
        hideMem_Cb: ccui.CheckBox;
        setAcFrom_layout: ccui.Layout;
        acFromGroup: common.RadioGroup;
        lackyStart_layout: ccui.Layout;
        normalAc_layout: ccui.Layout;
        setTime_layout: ccui.Layout;
        needNum_edb: any;
        btn_priSet: ccui.Button;
        isSet: boolean;
        acPriRankArr: Array<Data_RewordInfo>;
        private texteditor;
        initUI(): void;
        acFromType: number;
        onSelectAcFrom(type: number): void;
        acttype: number;
        onMenuSelected(e: kaayou.RadioEvent): void;
        private createCell;
        /**
         * 活动发起提交
         */
        onSubmit(): void;
        img_startTime: ccui.ImageView;
        img_getPriNum: ccui.ImageView;
        img_getPriNeedcoun: ccui.ImageView;
        initGetPriTips(): void;
        initBtnD(): void;
        isNowDay(timeA: number, timeB?: number): boolean;
        isNowDayH(timeA: number, timeB?: number): boolean;
        setTimeLayer(): void;
        setDstarBtnState(b: boolean): void;
        setHstarBtnState(b: boolean): void;
        setDendBtnState(b: boolean): void;
        setHendBtnState(b: boolean): void;
        changeBtnstate(s: number, e?: number): void;
        onClickStartBtn_D(type: number, num: number): void;
        onClickStartBtn_H(type: number, num: number): void;
        onClickEndBtn_D(type: number, num: number): void;
        onClickEndBtn_H(type: number, num: number): void;
        initCurrentTime(): void;
        initLuckyAc(): void;
        Show(): void;
        Hide(): void;
        initAllFloorCheck(): void;
        luckyInfoUpdate(data: {
            configInfo: any;
        }): void;
    }
    class tea_TeaActivityPanelMgr {
        static __INS__: tea_TeaActivityPanelMgr;
        static getInstance(): tea_TeaActivityPanelMgr;
        _selfPanel: activityPanel;
        init(): boolean;
        getPanel(create?: boolean): activityPanel;
    }
    class activityPanel extends kaayou.ModelLayer {
        constructor();
        topbarMgr: lobby.TopBarMgr;
        createAcBtn: ccui.Button;
        ac_leftCheckBtn: ccui.Layout;
        noAcBg: ccui.ImageView;
        data_leftBtn: Array<Data_ActListModel>;
        ac_UserInfo_cell_mode: ccui.Layout;
        scrollTop1: ccui.Layout;
        scrollTop2: ccui.Layout;
        btn_goLucky: ccui.Button;
        initUI(): void;
        Show(): void;
        reflashActivityUI(data: any): void;
        Hide(): void;
        menuGroup: common.RadioGroup;
        actBtncontent: ccui.ScrollView;
        initLeftMenu(): void;
        ac_CurrentAcInfo_panel: ccui.Layout;
        actInfoName: ccui.Text;
        actInfoTime: ccui.Text;
        actInfoRankType: ccui.Text;
        floorArea: ccui.Text;
        offAct: ccui.Button;
        ac_activity_OverLabel: ccui.Text;
        ac_type_scroll_label: ccui.Text;
        ac_rank_Scroll: ccui.ScrollView;
        initRightMenu(): void;
        actid: number;
        setActList(data: Array<Data_ActListModel>): void;
        onBtnState(actid: any): void;
        _data: Data_CurActivityInfo;
        setActInfo(data: Data_CurActivityInfo): void;
        private activityUserInfoCell;
        private activityleftBtnCell;
    }
}
