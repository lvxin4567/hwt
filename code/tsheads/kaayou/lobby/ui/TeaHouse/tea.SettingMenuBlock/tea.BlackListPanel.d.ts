declare namespace tea {
    class tea_BlackPanelMgr {
        static __INS__: tea_BlackPanelMgr;
        static getInstance(_zOrder: number): tea_BlackPanelMgr;
        __selfPanel: BlackListPanel;
        _zOrder: number;
        init(): boolean;
        getPanel(create?: boolean): BlackListPanel;
    }
    class BlackListPanel extends kaayou.ModelLayer {
        btnSearch: ccui.Button;
        ebName: any;
        ndName: cc.Layer;
        tea_cell_black_mode: ccui.Layout;
        edx_Tel: ccui.TextField;
        constructor();
        btn_close: ccui.Button;
        initUI(): void;
        menuGroup: common.RadioGroup;
        blackMenuGroup: ccui.ScrollView;
        initLeftMenu(): void;
        blackPageGroup: ccui.Layout;
        edx_uid: ccui.Text;
        btn_add_black: ccui.Button;
        scroll_blacklist: ccui.ScrollView;
        initRightPages(): void;
        doGetBlackList(clear?: boolean, search?: string): void;
        private createCell;
        onUpdateBlackList(data: {
            list: Array<any>;
            update: boolean;
        }): void;
        doRenderRemoveFromBlackList(data: {
            uid: number;
        }): void;
        Show(): void;
        Hide(): void;
    }
}
