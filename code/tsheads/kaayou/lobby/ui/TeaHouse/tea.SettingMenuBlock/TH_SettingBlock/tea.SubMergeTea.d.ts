declare namespace tea {
    class tea_MergeUserPanelMgr {
        static __INS__: tea_MergeUserPanelMgr;
        static getInstance(zOrder: number): tea_MergeUserPanelMgr;
        zOrder: number;
        __selfPanel: SubMergeTeaPage;
        private _cache;
        init(): boolean;
        getPanel(create?: boolean): SubMergeTeaPage;
        private cancelthids;
        private HQRequest;
        private updateTeaHouseShotCut;
        private houserevokersp;
    }
    class SubMergeTeaPage {
        scr_business: ccui.ScrollView;
        _page: cc.Node;
        _index: number;
        edit_TeaID: any;
        edit_TeaMasterId: any;
        btn_submit: ccui.Button;
        btn_reCord: ccui.ImageView;
        private _sub_data;
        private tab_listview;
        private tab1;
        private tab2;
        private jl_panel;
        private hq_panel;
        private jl_item;
        private content;
        private btn_close;
        setIndex(index: any): this;
        getIndex(): number;
        onSubpageChange(e: kaayou.Event): void;
        reset(): void;
        initWidthNode(page: cc.Node): void;
        private isListOpen;
        initUI1(): void;
        private cancelthids;
        private initStatus;
        isHQ(): boolean;
        private renderWithNode;
        private initInput;
        private setTabStyle;
        renderHQRecord({ hid }: {
            hid: any;
        }): Promise<void>;
        requireHQ({ hid }: {
            hid: any;
        }): Promise<void>;
        housemergereqrevoke({ hid, thid }: {
            hid: any;
            thid: any;
        }): Promise<boolean>;
        housemergereqrevokeResult({ hid, thid, msg }: {
            hid: any;
            thid: any;
            msg: any;
        }): void;
        houserevokerspResult({ hid, thid, ok }: {
            hid: any;
            thid: any;
            ok: any;
        }): void;
        houserevoke({ hid, thid }: {
            hid: any;
            thid: any;
        }): Promise<boolean>;
        HQRequestResult(data: any): void;
        submitHQ(): Promise<void>;
        private checkHQ;
        private saveInfo;
    }
}
