declare namespace common {
    interface productPkgModel {
        id: number;
        bagname: string;
        desc: string;
        pic_url: string;
        price: number;
        ctime: string;
        status: number;
        sort: number;
        details: Array<{
            productName: string;
            num: number;
            imgUrl: string;
            type: number;
        }>;
        zuanshi: {
            id: number;
            appid: string;
            productName: string;
            price: number;
            num: number;
            imgUrl: string;
            type: number;
            sort: number;
            ioskey: string;
        };
        people: number;
    }
    class BankruptPanelMgr {
        static __INS__: BankruptPanelMgr;
        static getInstance(_zOrder?: number): BankruptPanelMgr;
        __selfPanel: BankruptPanel;
        _zOrder: number;
        init(): boolean;
        getPanel(create?: boolean): BankruptPanel;
        showBankruptPanel(data: any): void;
        hideBankruptPanel(): void;
    }
    class BankruptPanel extends kaayou.ModelLayer {
        constructor();
        btn_close: ccui.Button;
        label_content: ccui.Text;
        label_count: ccui.Text;
        contentPanel: ccui.Layout;
        btn_buy: ccui.Button;
        label_diamond: ccui.Text;
        pkg_img: ccui.ImageView;
        initUI(): void;
        _data: productPkgModel;
        Show(data: productPkgModel): void;
    }
}
