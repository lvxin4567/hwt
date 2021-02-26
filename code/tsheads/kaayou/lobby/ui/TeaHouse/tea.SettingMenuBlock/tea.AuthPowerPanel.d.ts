/**
 *
 *  权限分配
 *
 */
declare namespace tea {
    class TH_AuthPowerCell extends kaayou.Block implements common.IPullListCell {
        constructor();
        _index: number;
        setIndex(index: any): void;
        getIndex(): number;
        _data: FCMPlayerRecordItem;
        initWithNode(node: ccui.Widget): void;
        reset(): void;
        setInfo(data: FCMPlayerRecordItem): void;
    }
    class Tea_AuthPowerPanelMgr {
        static __INS__: Tea_AuthPowerPanelMgr;
        static getInstance(_zorder: number): Tea_AuthPowerPanelMgr;
        __selfPanel: setAuthPowerPanel;
        _zorder: number;
        init(): boolean;
        getPanel(create?: boolean): setAuthPowerPanel;
    }
    class setAuthPowerPanel extends kaayou.ModelLayer {
        constructor();
        btn_close: ccui.Button;
        layout_Auth: ccui.ScrollView;
        btn_Submit: ccui.Button;
        auth_cell: ccui.Layout;
        initUI(): void;
        private createCell;
        Show(): void;
        Hide(): void;
    }
}
