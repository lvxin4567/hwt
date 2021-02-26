namespace lobby {
    export interface IProductItem {
        appid: string,
        hot: number,
        id: number,
        imgUrl: string,
        ioskey: string,
        nameAdd: string,
        num: number,
        numAdd: number,
        price: number,
        productName: string,
        type: number,               // 1：房卡   3：金币  4：钻石
        desc:string,
        status?:number,
        sort?:number,
        ctime?:string,
        platform?:string,
        percent?:number,
        grant_type?:number  //2:钻石自动转换金币
        extra?:string   //礼包json串
    }

    export interface G_ProductItemList {
        appid:string,         //app唯一标识
        nonce_str:string,     //
        platform:string,      //平台标识  
        sign:string           //将上面三个组成的json 操作之后处理出来的字符  
    }

    export interface DiamondProductList_Res{
        binding:boolean,
        jinbi:Array<IProductItem>,
        maxjbbili:number,
        maxzsbili:number;
        zuanshi:Array<IProductItem>
    }


}