declare namespace lobby {
    interface IProductItem {
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
        desc: string;
        status?: number;
        sort?: number;
        ctime?: string;
        platform?: string;
        percent?: number;
        grant_type?: number;
        extra?: string;
    }
    interface G_ProductItemList {
        appid: string;
        nonce_str: string;
        platform: string;
        sign: string;
    }
    interface DiamondProductList_Res {
        binding: boolean;
        jinbi: Array<IProductItem>;
        maxjbbili: number;
        maxzsbili: number;
        zuanshi: Array<IProductItem>;
    }
}
