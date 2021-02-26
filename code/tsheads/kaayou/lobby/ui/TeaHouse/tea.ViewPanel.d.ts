declare namespace tea {
    class TeaJoinPanelMgr {
        static __INS__: TeaJoinPanelMgr;
        static getInstance(_zOrder?: number): TeaJoinPanelMgr;
        __selfPanel: JoinPanel;
        _zOrder: number;
        init(): boolean;
        getPanel(create?: boolean): JoinPanel;
    }
    class JoinPanel extends kaayou.Layer {
        lable_Nums: Array<ccui.TextBMFont>;
        _curNums: string;
        constructor();
        btn_close: ccui.Button;
        initUI(): void;
        onResetClick(e: kaayou.TouchEvent): void;
        onDeleteClick(e: kaayou.TouchEvent): void;
        onNumsClick(e: kaayou.TouchEvent): void;
        addNums(nums: number): void;
        subNums(): void;
        doNumShow(): void;
        bindEvent(): void;
        clear(): void;
        Show(): void;
        Hide(): void;
    }
    class TeaPartnerMgr {
        static __INS__: TeaPartnerMgr;
        static getInstance(parent: cc.Node): TeaPartnerMgr;
        __selfPanel: PartnerPanel;
        __parent: cc.Node;
        init(parent: cc.Node): boolean;
        getPanel(create?: boolean): PartnerPanel;
    }
    class PartnerPanel extends kaayou.Layer {
        btn_close: ccui.Button;
        btn_copy: ccui.Button;
        label_Wechat: ccui.Text;
        constructor();
        initUI(): void;
        __succeed_call: Function;
        Show(data: {
            csNum: string;
        }): void;
        Hide(): void;
    }
    class TeaCreatePanelMgr {
        static __INS__: TeaCreatePanelMgr;
        static getInstance(parent: cc.Node): TeaCreatePanelMgr;
        __selfPanel: CreatePanel;
        __parent: cc.Node;
        init(parent: cc.Node): boolean;
        getPanel(create?: boolean): CreatePanel;
    }
    class CreatePanel extends kaayou.Layer {
        btn_close: ccui.Button;
        btn_ok: ccui.Button;
        tea_edit: any;
        constructor();
        initUI(): void;
        __succeed_call: Function;
        Show(data: {
            onSucceed: Function;
        }): void;
        Hide(): void;
    }
    class TeaViewPanelMgr {
        static __INS__: TeaViewPanelMgr;
        static getInstance(_zOrder?: number): TeaViewPanelMgr;
        _zOrder: number;
        __selfPanel: ViewPanel;
        init(): boolean;
        getPanel(create?: boolean): ViewPanel;
    }
    class ViewPanel extends kaayou.Layer {
        constructor();
        btnDescription: ccui.Button;
        topBarBack: ccui.Button;
        btn_create: ccui.Button;
        btn_join: ccui.Button;
        btn_bind: ccui.Button;
        tea_cell_create_mode: ccui.Layout;
        scroll_tea: ccui.ScrollView;
        img_empty_tea: ccui.ImageView;
        initUI(): void;
        private createCell;
        onUpdateTeaList(data: Array<tea.Data_HouseItem>): void;
        clear(): void;
        Show(): void;
        Hide(): void;
    }
}
