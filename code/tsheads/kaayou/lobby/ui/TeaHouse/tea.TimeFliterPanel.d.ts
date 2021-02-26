declare namespace tea {
    class TimeFliterPanelMgr {
        static __INS__: TimeFliterPanelMgr;
        static getInstance(_zOrder?: number): TimeFliterPanelMgr;
        __selfPanel: TimeFliterPanel;
        _gold: number;
        _zOrder: number;
        onUpdateUserInfo(data: Data_Uerinfo): void;
        init(): boolean;
        getPanel(create?: boolean): TimeFliterPanel;
    }
    class TimeFliterPanel extends kaayou.ModelLayer {
        arrBorder: Array<ccui.ImageView>;
        arrRadio: Array<ccui.Layout>;
        arrTypeRadio: Array<ccui.Layout>;
        lscArr: Array<ccui.Layout>;
        btnOK: ccui.Button;
        cb1: ccui.CheckBox;
        cb2: ccui.CheckBox;
        cb3: ccui.CheckBox;
        iLike: number;
        iType: number;
        iTime: number;
        iLowScore: number;
        lbHour: ccui.TextField;
        ly1: ccui.Layout;
        ly2: ccui.Layout;
        ly3: ccui.Layout;
        lyInnerBg: ccui.Layout;
        lyLike: ccui.Layout;
        lyGameType: ccui.Layout;
        lyg1: ccui.Layout;
        lyg2: ccui.Layout;
        lyg3: ccui.Layout;
        lyg4: ccui.Layout;
        prfButton: ccui.Button;
        svTime: ccui.ScrollView;
        mask: ccui.Layout;
        lyLowScore: ccui.Layout;
        lscRadio: common.RadioGroup;
        constructor();
        initUI(): void;
        onTypeRadioTouched(e: kaayou.TouchEvent): void;
        private setLowscore;
        onRadioTouched(e: kaayou.TouchEvent): void;
        onButtonTimeClicked(e: kaayou.TouchEvent): void;
        setCurTypeSelect(index: number): void;
        setCurSelect(index: number): void;
        onLowLowScoreSelect(e: kaayou.TouchEvent): void;
        setLowScoreSelect(i: number): void;
        setTimeSelect(index: number): void;
        addButton(): void;
        bindEvent(): void;
        Show(data: {
            index: number;
            showLike: boolean;
            likeIndex: number;
            showLowScore: boolean;
            lowScoreIndex: number;
            showTimeSort: boolean;
            showSortType: boolean;
        }): void;
        Hide(): void;
    }
}
