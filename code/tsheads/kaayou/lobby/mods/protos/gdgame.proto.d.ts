declare namespace lobby {
    enum GDGameHead {
        sitein = "sitein",
        getallowanceinfo = "getallowanceinfo"
    }
    interface proto_getallowanceinfo {
        uid: number;
        token: string;
        ignore_gift: boolean;
    }
    interface proto_checkbuybgift {
        uid: number;
        token: string;
    }
    interface proto_getallowanceinfo_res {
        allowance: proto_disposeallowances_ntf_res;
        gift: bankruptGiftModel;
    }
    interface bankruptGiftModel {
        id: number;
        img_url: string;
        exchange_gold_num: number;
        need_diamond_num: number;
        base_count: number;
        purchased_count: number;
        user_gold: number;
        user_diamond: number;
    }
    interface proto_areapkgbykid {
        kindid: number;
    }
    interface proto_sitein extends IBASE_MESSAGE {
        kind_id: number;
        site_type: number;
    }
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
}
