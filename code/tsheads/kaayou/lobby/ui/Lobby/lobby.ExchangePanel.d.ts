declare namespace lobby {
    interface ProductInfo {
        appid: string;
        hot: number;
        id: number;
        imgUrl: string;
        ioskey: string;
        nameAdd: string;
        num: number;
        numAdd: number;
        price: number;
        productName: string;
        type: number;
    }
    export class ExchangePanelCell extends kaayou.Block {
        constructor();
        label_money: ccui.Text;
        label_cardnum: ccui.Text;
        btn_buy: ccui.Button;
        initWithNode(node: ccui.Widget): void;
        _data: ProductInfo;
        setInfo(data: ProductInfo): void;
        unuse(): void;
    }
    export class ExchangeRecordCell extends kaayou.Block {
        constructor();
        _index: number;
        label_money: ccui.Text;
        label_cardnum: ccui.Text;
        btn_buy: ccui.Button;
        initWithNode(node: ccui.Widget): void;
        _data: ProductInfo;
        setInfo(data: ProductInfo): void;
        setIndex(i: number): void;
        unuse(): void;
    }
    export class ExchangePanel extends kaayou.ModelLayer {
        constructor();
        exchage_cell_mode: ccui.Layout;
        exchage_record_cell_mode: ccui.Layout;
        exchage_record_cell_layout: ccui.ScrollView;
        exchage_record_layout: ccui.Layout;
        exchage_cell_layout: ccui.Layout;
        exchage_menu_layout: ccui.Layout;
        exchangeMenuGroup: common.RadioGroup;
        topbarMgr: lobby.TopBarMgr;
        initUI(): void;
        onlevel1Change(e: kaayou.RadioEvent): void;
        private createCell;
        private createRecordCell;
        setMallList(data: any): void;
        onProductSelected(data: any): void;
        Show(): void;
        Hide(): void;
    }
    export {};
}
