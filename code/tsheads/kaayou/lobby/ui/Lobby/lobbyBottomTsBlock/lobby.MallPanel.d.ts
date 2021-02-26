declare namespace lobby {
    class MallCell extends kaayou.Block {
        constructor();
        _index: number;
        label_money: ccui.Text;
        label_cardnum: ccui.Text;
        btn_buy: ccui.Button;
        img_product: ccui.ImageView;
        img_More: ccui.ImageView;
        initWithNode(node: ccui.Widget): void;
        _data: IProductItem;
        setInfo(data: IProductItem, isbInd?: boolean): void;
        unuse(): void;
    }
    class MallPanelMgr {
        static __INS__: MallPanelMgr;
        static getInstance(_zOrder?: number): MallPanelMgr;
        _zOrder: number;
        __selfPanel: MallPanel;
        init(): boolean;
        getPanel(create?: boolean): MallPanel;
    }
    class MallPanel extends kaayou.ModelLayer {
        constructor();
        mall_cell_mode: Node;
        mall_btn_close: ccui.Button;
        lbWechat: ccui.Text;
        mall_cell_bg: ccui.ImageView;
        mall_cell_Sv: ccui.ScrollView;
        tips: ccui.ImageView;
        topbarMgr: lobby.TopBarMgr;
        leftMenu: ccui.Layout;
        menuGroup: common.RadioGroup;
        bind_layout: ccui.Layout;
        wealthLayout: ccui.Layout;
        initUI(): void;
        _cache: boolean;
        _DiamondCache: boolean;
        initLeftMenu(): void;
        cur_Index: number;
        onMenuSelected(e: kaayou.RadioEvent): void;
        private createCell;
        onUpdateUserWealth(data: Data_Uerinfo): void;
        setMallList(data: IProductItem[]): void;
        setDiamondMallList(data: DiamondProductList_Res): void;
        onProductSelected(data: IProductItem): void;
        bindSuccessUpdate(): void;
        Show(index?: number): void;
        Hide(): void;
        pageSwitch(i: number): void;
    }
}
