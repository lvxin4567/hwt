declare namespace tea {
    class FloorCell extends kaayou.Block {
        _data: any;
        cb: ccui.CheckBox;
        lbName: ccui.Text;
        constructor();
        initWithNode(node: ccui.Widget, callback: any): void;
        setInfo(data: any, isSelected: any): void;
        unuse(): void;
    }
    class tea_MixFloorMgr {
        static __INS__: tea_MixFloorMgr;
        static getInstance(): tea_MixFloorMgr;
        __selfPanel: MixFloor;
        init(): boolean;
        getPanel(create?: boolean): MixFloor;
    }
    class MixFloor extends kaayou.Layer {
        constructor();
        topbarMgr: lobby.TopBarMgr;
        mixTypeLayout: ccui.Layout;
        arrEditCheckBox: any[];
        btnClose: ccui.Button;
        btnEdit: ccui.Button;
        btnSave: ccui.Button;
        mixCheckBox: ccui.CheckBox;
        mixTypeRadioGroup: common.RadioGroup;
        mixTypeRadioLayout: ccui.Layout;
        mix_hand_layout: ccui.Layout;
        btnTable: ccui.Button;
        cbFloor: ccui.Layout;
        iTable: number;
        lbHintFloor: ccui.Text;
        ndHint: ccui.Layout;
        ndHintBg: ccui.Layout;
        ndTable: ccui.Layout;
        radioGroup: common.RadioGroup;
        svFloor: ccui.ScrollView;
        tipsLayout1: ccui.Layout;
        mix_Automatic_layout: ccui.Layout;
        emptyTablePosBlock: ccui.Layout;
        emptyPosGroup: common.RadioGroup;
        emptyMaxTableBlock: ccui.Layout;
        emptyMaxTableLaout: ccui.Layout;
        emptyMaxGroup: common.RadioGroup;
        emptyPosIndex: number;
        emptyMaxIndex: number;
        emptyPosTips: ccui.Button;
        emptyMaxTips: ccui.Button;
        autoSortTips: ccui.Button;
        emptyTipsLayout: ccui.Layout;
        autoSortBlock: ccui.Layout;
        autoSortGroup: common.RadioGroup;
        autoSortIndex: number;
        openTypeBlock: ccui.Layout;
        openTypeGroup: common.RadioGroup;
        openTypeIndex: number;
        mix_Cheat_layout: ccui.Layout;
        zNRadioGroup: common.RadioGroup;
        zNRadioLayout: ccui.Layout;
        zNIndex: number;
        zNTips: ccui.ImageView;
        zNtipsPanel: ccui.Layout;
        inputSetLayout: ccui.Layout;
        ebSetNums: any;
        setNumsLayout: ccui.Layout;
        ai_SuperLaout: ccui.Layout;
        ai_SuperGroup: common.RadioGroup;
        aiSuperIndex: number;
        superFzb_Tips: ccui.Button;
        zNSuperTipsPanel: ccui.Layout;
        superFzb_Panel: ccui.Layout;
        waitTips: ccui.ImageView;
        waitLayout: ccui.Layout;
        wait_Btn: ccui.Button;
        waitTipsLayout: ccui.Layout;
        initUI(): void;
        private createCell;
        mixTypaIndex: number;
        showPanelWithIndex(index: number): void;
        Show(data: HouseMixFloorInfo): void;
        showMixLayout(data: HouseMixFloorInfo): void;
        Hide(): void;
        initTipsUI(): void;
    }
}
