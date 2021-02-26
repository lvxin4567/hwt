declare var require: any
declare var ES6Promise: any;
declare var global: any;
declare class classManager {
    static getNewID(): number;
    static getNewInstanceId(): number;
}
//declare var classManager: ClassManager;

declare namespace kaayou_jsb {
    export namespace File {
        export class ZIP {
            unzip(path: string, isAsync?: boolean);
            onProgress: (curpro: number, toatl: number, cur: number) => void;
            onSuccess: (curpro: number, toatl: number, cur: number) => void;
            onError: (errorStr) => void;
        }
        export class DownLoad {
            DownLoadFile(url: string, path: string);
            onProgress: (total, downloaded) => void;
            onSuccess: (url: string, storagePath: string) => void;
            onError: (errcode, errorCodeInternal, errorStr) => void;
        }
        export function copyFile(path, newpath): boolean;
    }

    export module DataSet {
        export function set(key: string, value: string): boolean;
        export function get(key: string): string;
    }

    export namespace HuTable {
        export function Load(data: any, call: Function);
        export function Has(tableName: string, keyName: string);
    }
}

interface Ka_MSG_PHP_RES {
    code: number,
    data?: string | any,
    msg?: string | any
}

interface Ka_APP_VERSION_CONF {
    content: string,
    login_url: string,
    product_url: string,
    url: string,
    version: string,
    diamond_url: string
}

interface Ka_BTN_SHOW_CONF {
    tel: number  //手机
    wx: number    //微信
    yk: number   //游客
    xx: number   //小信
}

interface Ka_GPS_CONF {
    enabled: number
    distance: number
}

interface Ka_Share_Url_CONF {
    teaShareUrl: string
    downImgUrl: string
}

interface IFeature {
    cs: number,//客服
    dt: number,//地图
    ex: number,//兑换
    fe: number,//活动
    ma: number,//商城
    ok: number,//一键清零
    ph: number,//绑定手机
    ra: number,//排行榜
    ta: number,//任务
    us: number,//用户面板
    pl: number,//防沉迷
    pm: number,//跑马灯
    wx: number,//微信
    no: number, //公告
    ho: number, //热更
    re: number,//实名认证
    st: number,//设置
    zm: number,//招募
    zj: number,//战绩
    fa: number,//亲友圈活动
    im: number,//游戏语音
    stc: number,//设置面板切换按钮，
    fx: number //大厅分享
    iOSsh: number, // ios 审核
    bd: number,   //绑定、、
}

interface Ka_APP_CONFIG {
    appmodel?: number, //1 金币模式  2 房卡模式  3 金币加房卡模式
    AppVersion?: Ka_APP_VERSION_CONF,
    buglyTrace?: string, //bugly跟踪玩家ID
    cqfzbAdcode?: string, //超强防作弊地区码
    fcmAdcode?: string,   //防沉迷地区码
    foreignIPURL?: string,    //外国IP弹窗图片链接
    fzbAdcode?: string,   //防作弊地区码
    feature?: IFeature,
    loginUrl?: string,  //登录接口地址
    apiUrl?: string, //golang api接口地址
    payurl?: string,  //支付接口地址
    recordUrl?: string, //战绩接口地址
    partnerUrl?: string, //合伙人后台接口地址
    appIcon?: string,
    btnShow?: Ka_BTN_SHOW_CONF,
    gps?: Ka_GPS_CONF,
    hhrMsg?: string,
    inviteUrl?: string,
    isApVerify?: string,
    kftel?: string,
    kfwx?: string,
    suggestionaddress?:string,
    shareType?: string,
    shareUrl?: Ka_Share_Url_CONF,
    shares?: any,
    zmwx?: string,
    hallAddr?: string,
    hallUrl?: string,
    payappid?: string,
    payapptoken?: string,
    insureendline?: number,
    broadcast_cost?: number,
    kfinfo?: any,
    isActivityShow?: boolean,
    xlHost?: string,
    isDebug?: string,
    Illegalrepo?: string,
    diamond_url?: string,
    legendInfo?:string,
    cardRecordUrl?:string,
}

interface BaseMsg {
    error: number,
    data: any
}

interface Data_Uerinfo {
    bind_wechat: boolean, //是否绑定微信
    diamond: number,
    hot_version:string,
    name: string,
    realname: string,
    uid: number,
    user_type: number, // 1	游客账号     2	手机账号     3	微信账号  4 手机绑定了微信账号的 
    
    ip: string,
    sex: number,//性别,1为男性,2为女性
    imgurl: string,
    tel: string,
    isCertification: boolean,
    guestid?: string,
    token?: string,
    roomId?: number,
    games?: string,
    fid: number, //楼层ID
    hid: number,  //茶楼ID
    area?: string,//区域id
    card: number,//用户房卡数
    gold: number, //用户金币数
    gold_bean: number,//用户金豆数
    insure_gold: number,//保险箱金币数量
    site_type: number,
    site_id: number,
    game_id: number,
    table_id: number,
    describe_info: string,
    delivery_img: string,  //玩家收款二维码
    refuse_invite:boolean,   //设置邀请入圈
}

declare namespace lodash {
    interface oneFuc {
        (v: any): any
    }
    export function eq(a: any, b: any): boolean;
    export function trim(s: string): string;
    export function assignIn();
    export function before();
    export function findIndex(...agrs);

    export function bind();
    export function chain();
    export function compact();
    export function concat();
    export function create();
    export function defaults();
    export function defer();
    export function delay();
    export function pullAll<T>(...agrs): Array<T>;
    //array, values, [comparator]
    export function pullAllBy(...agrs);
    //array, values, [comparator]
    export function pullAllWith(...agrs);

    export function filter<T>(...agrs): Array<T>;
    export function flatten(...agrs);
    export function flattenDeep(...agrs);
    export function iteratee(...agrs);
    export function keys(v): Array<string>;
    export function map();
    export function matches();
    export function mixin();
    export function negate();
    export function once();
    export function pick(...agrs);
    export function slice();
    export function sortBy(arr: Array<any>, ...args);
    export function tap();
    export function thru();
    export function toArray();
    export function values();
    export function extend(...agrs);
    export function clone(v: any);
    export function cloneDeep(v: any);
    export function escape();
    export function every();
    export function find(collection, predicate: any | Function, fromIndex?: number);
    export function forEach(collection: object | Array<any>, call: Function);
    export function has();
    export function head(...args);
    export function head<T>(...args): T;
    export function identity();
    export function indexOf();
    export function isArguments(b: any): boolean;
    export function isArray(b: any): boolean;
    export function isBoolean(b: any): boolean;
    export function isDate(b: any): boolean;
    export function isEmpty(b: any): boolean;
    export function isEqual(a: any, b: any): boolean;
    export function isFinite(b: any): boolean;
    export function isFunction(b: any): boolean;
    export function isNaN(b: any): boolean;
    export function isNull(b: any): boolean;
    export function isNumber(b: any): boolean;
    export function isObject(b: any): boolean;
    export function isRegExp(b: any): boolean;
    export function isString(b: any): boolean;
    export function isUndefined(b: any): boolean;
    export function last(...gars);
    export function max();
    export function min();
    export function noConflict();
    export function noop();
    export function reduce();
    export function result();
    export function size(d: any): number;
    export function some();

    export function uniqueId();
    export function difference(array, array2);  //??
    export function differenceBy(arraylike1, arraylike2, iteratee?: string | oneFuc);
    export function differenceWith(arraylike1, arraylike2, comparator?: (v1, v2) => any);

    export function intersection(array1, array2);  //??
    export function intersectionBy(arraylike1, arraylike2, iteratee?: string | oneFuc);
    export function intersectionWith(arraylike1, arraylike2, comparator?: (v1, v2) => any);
    export function extendWith(...agrs);
    export function union(...agrs);
    export function uniq(...agrs);

    export function uniq<T>(...agrs): Array<T>;

    // uniq<T>(
    //     array: List<T> | null | undefined
    // ): T[];

    export function pull(...agrs);
    export function pullAt(array: Array<any>, arrayat: Array<number>);

    export function fill(...agrs);
    export function indexOf(...agrs);
    export function uniqWith(...agrs);
    export function concat(...agrs);
    export function remove(array, call: Function);

    export function toInteger(value): number;
}