declare namespace common {
    interface ProductInfo {
        id: number;
        productName: string;
        desc: string;
        price: number;
        num: number;
        status: number;
        sort: number;
        img: null;
        numAdd: number;
        ctime: null;
        percent: number;
        type: number;
    }
    export class BuyCardRecordPanel extends kaayou.Layer {
        maskBg: cc.Layer;
        contentPanel: ccui.Layout;
        Text_lefttime: ccui.Text;
        ScrollView: ccui.ScrollView;
        Panel_cell: ccui.Layout;
        cellInfoArr: Array<ProductInfo>;
        curChooseIndex: number;
        tip_CheckBox: ccui.Button;
        tipImage_CheckBox: ccui.ImageView;
        tip_Layout: ccui.ImageView;
        constructor();
        initUI(): void;
        private createCell;
        getCardRecordUrl(): string;
        getAppID(): string;
        getAppToken(): string;
        getSign(map: any, webGameKey?: string): string;
        Show(modname: string): Promise<boolean>;
        ExChangeCardRecord(): Promise<void>;
        ProductSelected(index: number): void;
        Hide(): void;
    }
    export class BuyCardRecordPanelCell extends kaayou.Block {
        index: number;
        btn_buy: ccui.Button;
        fnt_date: ccui.Text;
        fnt_zhuanshi: ccui.Text;
        Image_choose: ccui.ImageView;
        constructor();
        initWithNode(node: ccui.Widget): void;
        setInfo(data: ProductInfo, index: number): void;
        setChoose(b: boolean): void;
        unuse(): void;
    }
    export {};
}
