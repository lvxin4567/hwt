/// <reference path="./protos/mall.proto.ts" />
namespace lobby {
    const { BindEvent, doBindEvent } = kaayou._decorator;

    export namespace mod {

        export class Mall {
            static __INS__: lobby.mod.Mall = null;
            static getInstance(): lobby.mod.Mall {
                if (Mall.__INS__ == null) {
                    Mall.__INS__ = new Mall();
                    Mall.__INS__.initMod();
                }
                return Mall.__INS__;
            }
            @doBindEvent
            initMod() { }

            //appId: string = ""//"kaayou243732197";//"kaayou148849639";
            //appToken: string = "";//"6254611be5224bfaeb4ffb48b300cae2";// "05ffef168c5089c3fc633c022c5e99d2";
            // nonce_str: string = ""//"J5nMYEC2rQrxF0cRNTAMcLY4LI2i48WM";
            // platform: string = "1";
            getSign(map,webGameKey?:string) {

                let appId = this.getAppID();
                if (lodash.isEmpty(appId)) { return; }

                let appToken = this.getAppToken();
                if (lodash.isEmpty(appToken)) { return; }


                let stringA: string = "";

                let allKeys = Object.keys(map);
                allKeys.sort();
                for (var x in allKeys) {
                    let key = allKeys[x];
                    if (stringA == "") stringA += key + "=" + map[key];
                    else stringA += "&" + key + "=" + map[key];
                }
                // for (var key in map) {
                //     if (stringA == "") stringA += key + "=" + map[key];
                //     else stringA += "&" + key + "=" + map[key];
                // }
                //let r:string="appid="+this.appId+"&nonce_str="+this.nonce_str+"&platform="+this.platform;
                stringA += (!!webGameKey?("&key=" +webGameKey):("&key=" +appToken));
                console.log("md5之前签名---"+stringA);
                let sign: string = kaayou.MD5.encode(stringA).toLowerCase();
                return sign;
            }
            getAppID() {

                return common.mod.Config.GetAppConfig().payappid || "kaayou808108913";

            }
            getAppToken() {
                return common.mod.Config.GetAppConfig().payapptoken || "fa4417af2b585565e9e46d4307f83bfa"
            }

            getPayUrl() {
                return common.mod.Config.GetAppConfig().payurl || ""
            }

            getDiamondUrl() {
                return common.mod.Config.GetAppConfig().diamond_url || ""
            }

            _prudcts: IProductItem[] = null;
            getProductByType(type: number): IProductItem[] {

                let products: IProductItem[] = [];
                for (var x in this._prudcts) {
                    if (type == this._prudcts[x].type) {
                        products.push(this._prudcts[x]);
                    }
                }
                products.sort(function (a: IProductItem, b: IProductItem) {
                    return a.price - b.price;
                });
                return products;
            }
            //请求商品信息 房卡
            @BindEvent("lobby", "mod::Mall::getProductList")
            async doGetProductList(data: { type: number, clean: boolean }) {
                let appId = this.getAppID();
                if (lodash.isEmpty(appId)) { return; }

                let appToken = this.getAppToken();
                if (lodash.isEmpty(appToken)) { return; }

                let payUrl = this.getPayUrl();
                if (lodash.isEmpty(payUrl)) { return; }

                let platform = cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS ? "2" : "1";
                if (this._prudcts && !lodash.isEmpty(this._prudcts) && !data.clean) {
                    kaayou.emit('lobby', "ui::Mall::ProductInfo", this.getProductByType(data.type));
                    return
                }
                kaayou.emit('common', "ui::Loading::Show");
                let map = {
                    appid: appId,
                    nonce_str: parseInt(Math.random().toString().substr(2, 10)).toString(16),
                    platform: platform,
                };
                let sign: string = this.getSign(map);
                map["sign"] = sign;
                this._prudcts = [];
                let res = <string>await kaayou.Http.POST(payUrl + "/product/index", map);
                kaayou.emit('common', 'ui::Loading::Hide', { force: false });
                let tempRes = JSON.parse(res);
                if (tempRes.code) {
                    kaayou.emit('common', 'ui::Toast::Show', { msg: tempRes.msg || "获取商品失败了！" });
                    return;
                }
                this._prudcts = tempRes.data;
                console.log(this._prudcts);
                kaayou.emit('lobby', "ui::Mall::ProductInfo", this.getProductByType(data.type));

            }


            //请求商品信息 钻石
            DiamondData: DiamondProductList_Res = null;
            @BindEvent("lobby", "mod::Mall::getDiamondProductList")
            async doGetDiamondProductList(data: { type: number, clean: boolean }) {
                let appId = this.getAppID();
                if (lodash.isEmpty(appId)) { return; }

                let appToken = this.getAppToken();
                if (lodash.isEmpty(appToken)) { return; }

                let diamondUrl = this.getDiamondUrl();
                if (lodash.isEmpty(diamondUrl)) { return; }

                let platform = cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS ? "2" : "1";
                if (this.DiamondData && !data.clean) {
                    kaayou.emit('lobby', "ui::Mall::DiamondProductInfo", this.DiamondData);
                    return
                }
                kaayou.emit('common', "ui::Loading::Show");
                let map = {
                    appid: appId,
                    nonce_str: parseInt(Math.random().toString().substr(2, 10)).toString(16),
                    platform: platform,
                    userid: lobby.mod.User.getInstance().getUserInfo().uid.toString(),
                };
                let sign: string = this.getSign(map);
                map["sign"] = sign;
                //   this._Dprudcts = [];
                let res = <string>await kaayou.Http.POST(diamondUrl + "/circler/api/goods", map);
                kaayou.emit('common', 'ui::Loading::Hide', { force: false });
                console.log(res)
                let tempRes = JSON.parse(res);
                if (tempRes.status) {
                    kaayou.emit('common', 'ui::Toast::Show', { msg: tempRes.msg || "获取商品失败了！" });
                    return;
                }
                this.DiamondData = tempRes.data;
                console.log(this._prudcts);
                kaayou.emit('lobby', "ui::Mall::DiamondProductInfo", this.DiamondData);
            }

            @BindEvent("lobby", "mod::Mall::Binding")
            async doBInd(data: { code: number }) {
                let appId = this.getAppID();
                if (lodash.isEmpty(appId)) { return; }

                let appToken = this.getAppToken();
                if (lodash.isEmpty(appToken)) { return; }

                let diamondUrl = this.getDiamondUrl();
                if (lodash.isEmpty(diamondUrl)) { return; }

                let platform = cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS ? "2" : "1";
                kaayou.emit('common', "ui::Loading::Show");
                let map = {
                    appid: appId,
                    nonce_str: parseInt(Math.random().toString().substr(2, 10)).toString(16),
                    userid: lobby.mod.User.getInstance().getUserInfo().uid.toString(),
                    code: data.code.toString(),
                };
                let sign: string = this.getSign(map);
                map["sign"] = sign;
                //   this._Dprudcts = [];
                let res = <string>await kaayou.Http.POST(diamondUrl + "/circler/api/binding", map);
                kaayou.emit('common', 'ui::Loading::Hide', { force: false });
                console.log(res)
                let tempRes = JSON.parse(res);
                if (tempRes.status) {
                    kaayou.emit('common', 'ui::Toast::Show', { msg: tempRes.message || "绑定失败！" });
                    return;
                }
                kaayou.emit('common', 'ui::Toast::Show', { msg: "绑定成功！" });
                kaayou.emit("lobby", "ui::lobbyMallBindIDPanel::Hide");
                kaayou.emit("lobby", "ui::Mall::BindUpdate");
            }

            //请求破产礼包信息
            @BindEvent("lobby", "mod::Mall::getBankRupt")
            async doGetBankrupt() {
                let appId = this.getAppID();
                if (lodash.isEmpty(appId)) { return; }

                let appToken = this.getAppToken();
                if (lodash.isEmpty(appToken)) { return; }

                let diamondUrl = this.getDiamondUrl();
                if (lodash.isEmpty(diamondUrl)) { return; }
                kaayou.emit('common', "ui::Loading::Show");
                let map = {
                    appid: appId,
                    nonce_str: parseInt(Math.random().toString().substr(2, 10)).toString(16),
                };
                let sign: string = this.getSign(map);
                map["sign"] = sign;
                let res = <string>await kaayou.Http.POST(diamondUrl + "/circler/api/pochan", map);
                kaayou.emit('common', 'ui::Loading::Hide', { force: false });
                console.log(res)
                let tempRes = JSON.parse(res);
                if (tempRes.status) {
                    kaayou.emit('common', 'ui::Toast::Show', { msg: tempRes.message || "获取破产礼包失败！" });
                    //如果失败了。。去请求低保
                    kaayou.emit("common", "mod::GDGame::getallowanceinfo", {
                        ignore_gift: true, callBack: function (info) {
                            if (info && info.data && info.data.allowance) {    //  有这个时候弹破产补助
                                kaayou.emit("lobby", "ui::DisposeAllowances::Show", info.data.allowance);
                            }
                        }
                    });
                    return;
                }

                kaayou.emit("common", "ui::BankruptPanel::Show", <productPkgModel>tempRes.data);//
            }


            @BindEvent("lobby", "mod::Mall::ExchangeGiftPkgToGold")
            async doGiftPkgToGold(data: { gid: number, callBack?: Function }) {
                let appId = this.getAppID();
                if (lodash.isEmpty(appId)) { return; }

                let appToken = this.getAppToken();
                if (lodash.isEmpty(appToken)) { return; }

                let diamondUrl = this.getDiamondUrl();
                if (lodash.isEmpty(diamondUrl)) { return; }

                let platform = cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS ? "2" : "1";
                kaayou.emit('common', "ui::Loading::Show");
                let map = {
                    appid: appId,
                    nonce_str: parseInt(Math.random().toString().substr(2, 10)).toString(16),
                    userid: lobby.mod.User.getInstance().getUserInfo().uid.toString(),
                    gid: data.gid.toString(),
                };
                let sign: string = this.getSign(map);
                map["sign"] = sign;
                //   this._Dprudcts = [];
                let res = <string>await kaayou.Http.POST(diamondUrl + "/circler/api/exchange/pochan", map);
                kaayou.emit('common', 'ui::Loading::Hide', { force: false });
                console.log(res)
                let tempRes = JSON.parse(res);
                if (tempRes.status != 0) {
                    kaayou.emit('common', 'ui::Toast::Show', { msg: tempRes.message || "兑换失败，请联系客服。" });
                    return;
                }
                if (lodash.isFunction(data.callBack)) {
                    data.callBack();
                }
                kaayou.emit('common', 'ui::Toast::Show', { msg: "兑换成功！" });

            }






            @BindEvent("lobby", "mod::Mall::Exchange")
            async doDiamondToGold(data: { gid: number, callBack?: Function }) {
                let appId = this.getAppID();
                if (lodash.isEmpty(appId)) { return; }

                let appToken = this.getAppToken();
                if (lodash.isEmpty(appToken)) { return; }

                let diamondUrl = this.getDiamondUrl();
                if (lodash.isEmpty(diamondUrl)) { return; }

                let platform = cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS ? "2" : "1";
                kaayou.emit('common', "ui::Loading::Show");
                let map = {
                    appid: appId,
                    nonce_str: parseInt(Math.random().toString().substr(2, 10)).toString(16),
                    userid: lobby.mod.User.getInstance().getUserInfo().uid.toString(),
                    gid: data.gid.toString(),
                };
                let sign: string = this.getSign(map);
                map["sign"] = sign;
                //   this._Dprudcts = [];
                let res = <string>await kaayou.Http.POST(diamondUrl + "/circler/api/exchange", map);
                kaayou.emit('common', 'ui::Loading::Hide', { force: false });
                console.log(res)
                let tempRes = JSON.parse(res);
                if (tempRes.status != 0) {

                    if (tempRes.status == -10) {   //钻石不足
                        //当钻石不足的是时候需要去切换到钻石充值的界面
                        kaayou.emit('common', 'ui::Dialog::Show', {
                            msg: tempRes.message || "钻石不足，快去充值吧！",
                            btns: [
                                {
                                    name: "取消",
                                    action: function () { },
                                    colorType: 'yellow'
                                },
                                {
                                    name: "去充值",
                                    action: function () {
                                        kaayou.emit("lobby", "ui::Mall::PageSwitch", { index: 1 });
                                    },
                                    colorType: 'green'
                                },
                            ]
                        });
                        return;
                    } else if (tempRes.status == -11) {//自适应购买
                        let expend_num = tempRes.data.jinbi.price;
                        let expend_type = 4;
                        let got = [{ wt: tempRes.data.jinbi.type, wn: (tempRes.data.jinbi.num + tempRes.data.jinbi.numAdd) }];
                        let extra = {
                            expend_num: expend_num,
                            expend_type: expend_type,
                            got: got
                        };
                        kaayou.emit('common', 'ui::Dialog::Show', {
                            msg: "钻石不足！是否使用【¥" + tempRes.data.zuanshi.price / 100 + "】充值【"
                                + (tempRes.data.zuanshi.num + tempRes.data.zuanshi.numAdd) + "钻石】？\r\n"
                                + "充值成功后将会为您自动购买【金币x" + (tempRes.data.jinbi.num + tempRes.data.jinbi.numAdd) + "】",
                            btns: [
                                {
                                    name: "取消",
                                    action: function () { },
                                    colorType: 'yellow'
                                },
                                {
                                    name: "确定",
                                    action: function () {
                                        let req = tempRes.data.zuanshi;
                                        req["grant_type"] = 2;
                                        req["extra"] = JSON.stringify(extra);
                                        console.log("自适应购买", JSON.stringify(extra));
                                        kaayou.emit("lobby", "ui::Mall::ProductSelected", req);
                                    },
                                    colorType: 'green'
                                },
                            ]
                        });
                        return;
                    }
                    kaayou.emit('common', 'ui::Toast::Show', { msg: tempRes.message || "兑换失败，请联系客服。" });
                    return;
                }
                if (lodash.isFunction(data.callBack)) {
                    data.callBack();
                }
                kaayou.emit('common', 'ui::Toast::Show', { msg: "兑换成功！" });

            }


            @BindEvent("", "PayRes")
            onPayRes(data: { code: string, msg: string }) {
                //success  fail  cancel  invalid ;
                // kaayou.emit("common", "ui::Loading::Show", { msg: data.code == "success" ? "支付成功！" : "支付失败！", time: 2, overtimetext: false });
                // kaayou.emit('common', 'ui::Dialog::Show', {
                //     title: "温馨提示",
                //     msg: data.code == "success" ? "支付成功！" : "支付失败！",
                //     btns: [{
                //         name: "确定"
                //     }]
                // })
                kaayou.emit('common', 'ui::Loading::Hide');
                console.log("onPayResonPayResonPayResonPayResonPayRes");
                setTimeout(() => {
                    if (data.code == "success") {
                        kaayou.emit("common", "ui::BankruptPanel::Hide");   //破产礼包支付成功了就隐藏界面;
                    }
                    kaayou.emit('common', 'ui::Toast::Show', { msg: data.code == "success" ? "支付成功！" : "购买失败，请联系客服。" });
                }, 1000);
                return;
            }

            //请求支付
            @BindEvent("lobby", "mod::Mall::sendPay")
            async sendPay(data: { pid: number, way: number, extra?: string, grant_type?: number, func: Function }) {

                let appId = this.getAppID();
                if (lodash.isEmpty(appId)) { return; }

                let appToken = this.getAppToken();
                if (lodash.isEmpty(appToken)) { return; }

                let payUrl = this.getPayUrl();
                if (lodash.isEmpty(payUrl)) { return; }

                if (!cc.sys.isWeChat && !cc.sys.isNative) {
                    if (kaayou.Http.GetRequest(location.search)['paydebug'] || null) {
                    } else {
                        kaayou.emit("common", "ui::Loading::Show", { msg: "网页版购买中测试" + JSON.stringify(data), time: 20, overtimetext: false });
                        return;
                    }
                }

                if (cc.sys.isWeChat) {
                    // kaayou.emit("common", "ui::Loading::Show", { msg: "消除",  , time: 20, overtimetext: false });
                    return;
                }

                let platform = cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS ? "2" : "1";
                kaayou.PlatformMgr.getInstance().pay.payBaseInfo(payUrl + "/Ios/getPayResult", appToken, appId);

                kaayou.emit('common', "ui::Loading::Show");
                let userInfo = JSON.parse(kaayou.DataSet.get("user::info"));
                let pid: string = String(data.pid);
                if (data.extra == null) data.extra = "";
                if (data.grant_type == null) data.grant_type = 0;
                let map = {
                    appid: appId,
                    extra: data.extra,
                    grant_type: String(data.grant_type),
                    nonce_str: parseInt(Math.random().toString().substr(2, 10)).toString(16),
                    pid: pid,
                    state: "2",
                    uid: userInfo.uid,
                    way: String(data.way),
                };
                let sign: string = this.getSign(map);
                map["sign"] = sign;
                kaayou.emit("common", "ui::Loading::Show", { msg: "正在生成订单", time: 20, overtimetext: false });
                let tempRes = <string>await kaayou.Http.POST(payUrl + "/pay/index", map);
                kaayou.emit('common', 'ui::Loading::Hide', { force: false });
                let res = JSON.parse(tempRes);
                if (res.code != "0") {
                    // kaayou.emit('common', 'ui::Dialog::Show', {
                    //     msg: res.msg || "支付失败！",
                    //     btns: [{
                    //         name: "确定"
                    //     }]
                    // })
                    setTimeout(() => {
                        kaayou.emit('common', 'ui::Toast::Show', { msg: res.msg || "购买失败，请联系客服。" });
                    }, 1000);
                    return;
                }

                if (cc.sys.isNative) {

                    if (cc.sys.os == cc.sys.OS_IOS) {
                        kaayou.emit("common", "ui::Loading::Show", { msg: "购买中", time: 20, overtimetext: false });
                        kaayou.PlatformMgr.getInstance().pay.ApplePay(res.data.ioskey, res.data.order, "1");
                    } else {
                        let timestamp = (new Date()).valueOf().toString().substr(0, 10);
                        if (data.way == 1) {
                            kaayou.emit("common", "ui::Loading::Show", { msg: "购买中", time: 20, overtimetext: false });
                            let wechatRes = <string>await kaayou.Http.GET(res.data.url);
                            kaayou.emit('common', 'ui::Loading::Hide');
                            let oWechatRes = JSON.parse(wechatRes);
                            if (oWechatRes.code == 0) {
                                // let payData={
                                //     appid:'wx413aa71adcf8fd72',
                                //     noncestr:oWechatRes.data.nonce_str,//调用支付使用的noncestr这个参数必须和商家服务器调用统一下单接口返回的那个noncestr一致
                                //     package:'Sign=WXPay',
                                //     partnerid:'1487071652',
                                //     prepayid:oWechatRes.data.prepay_id,
                                //     timestamp:timestamp
                                // }
                                // let sign:string=this.getSign(payData,this.wechatKey);
                                // payData["sign"]=sign;
                                console.log("微信支付：", oWechatRes.data);
                                kaayou.PlatformMgr.getInstance().pay.WeCahtPay(oWechatRes.data);
                            }
                        }
                        else if (data.way == 2) {
                            kaayou.emit("common", "ui::Loading::Show", { msg: "购买中", time: 20, overtimetext: false });
                            let aliRes = <string>await kaayou.Http.GET(res.data.url);
                            kaayou.emit('common', 'ui::Loading::Hide');
                            console.log("支付宝支付：", aliRes);
                            kaayou.PlatformMgr.getInstance().pay.AliPay(aliRes);
                            //PlatformMgr.getInstance().sys.OpenAlipayUrl(res.data.url);
                        }
                        else kaayou.PlatformMgr.getInstance().sys.OpenUrl(res.data.url);

                    }
                }

            }


            //购买破产支付  因为微信的在购买成之后没有回调。但是只能购买一次。。。需要toast转动时间长点
            @BindEvent("lobby", "mod::Mall::sendPayBankRupt")
            async sendPayBankRupt(data: { pid: number, way: number, extra?: string, grant_type?: number, func: Function }) {

                let appId = this.getAppID();
                if (lodash.isEmpty(appId)) { return; }

                let appToken = this.getAppToken();
                if (lodash.isEmpty(appToken)) { return; }

                let payUrl = this.getPayUrl();
                if (lodash.isEmpty(payUrl)) { return; }

                if (!cc.sys.isWeChat && !cc.sys.isNative) {
                    if (kaayou.Http.GetRequest(location.search)['paydebug'] || null) {
                    } else {
                        kaayou.emit("common", "ui::Loading::Show", { msg: "网页版购买中测试" + JSON.stringify(data), time: 20, overtimetext: false });
                        return;
                    }
                }

                if (cc.sys.isWeChat) {
                    // kaayou.emit("common", "ui::Loading::Show", { msg: "消除",  , time: 20, overtimetext: false });
                    return;
                }

                let platform = cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS ? "2" : "1";
                kaayou.PlatformMgr.getInstance().pay.payBaseInfo(payUrl + "/Ios/getPayResult", appToken, appId);

                kaayou.emit('common', "ui::Loading::Show");
                let userInfo = JSON.parse(kaayou.DataSet.get("user::info"));
                let pid: string = String(data.pid);
                if (data.extra == null) data.extra = "";
                if (data.grant_type == null) data.grant_type = 0;
                let map = {
                    appid: appId,
                    extra: data.extra,
                    grant_type: String(data.grant_type),
                    nonce_str: parseInt(Math.random().toString().substr(2, 10)).toString(16),
                    pid: pid,
                    state: "2",
                    uid: userInfo.uid,
                    way: String(data.way),
                };
                let sign: string = this.getSign(map);
                map["sign"] = sign;
                kaayou.emit("common", "ui::Loading::Show", { msg: "正在生成订单", time: 20, overtimetext: false });
                let tempRes = <string>await kaayou.Http.POST(payUrl + "/pay/index", map);
                kaayou.emit('common', 'ui::Loading::Hide', { force: false });
                let res = JSON.parse(tempRes);
                if (res.code != "0") {
                    setTimeout(() => {
                        kaayou.emit('common', 'ui::Toast::Show', { msg: res.msg || "购买失败，请联系客服。" });
                    }, 1000);
                    return;
                }

                if (cc.sys.isNative) {

                    if (cc.sys.os == cc.sys.OS_IOS) {
                        kaayou.emit("common", "ui::Loading::Show", { msg: "购买中", time: 20, overtimetext: false });
                        kaayou.PlatformMgr.getInstance().pay.ApplePay(res.data.ioskey, res.data.order, "1");
                    } else {
                        let timestamp = (new Date()).valueOf().toString().substr(0, 10);
                        if (data.way == 1) {
                            kaayou.emit("common", "ui::Loading::Show", { msg: "购买中", time: 20, overtimetext: false });
                            let wechatRes = <string>await kaayou.Http.GET(res.data.url);
                            let oWechatRes = JSON.parse(wechatRes);
                            if (oWechatRes.code == 0) {
                                // let payData={
                                //     appid:'wx413aa71adcf8fd72',
                                //     noncestr:oWechatRes.data.nonce_str,//调用支付使用的noncestr这个参数必须和商家服务器调用统一下单接口返回的那个noncestr一致
                                //     package:'Sign=WXPay',
                                //     partnerid:'1487071652',
                                //     prepayid:oWechatRes.data.prepay_id,
                                //     timestamp:timestamp
                                // }
                                // let sign:string=this.getSign(payData,this.wechatKey);
                                // payData["sign"]=sign;
                                console.log("微信支付：", oWechatRes.data);
                                kaayou.PlatformMgr.getInstance().pay.WeCahtPay(oWechatRes.data);
                            }
                        }
                        else if (data.way == 2) {
                            kaayou.emit("common", "ui::Loading::Show", { msg: "购买中", time: 20, overtimetext: false });
                            let aliRes = <string>await kaayou.Http.GET(res.data.url);
                            console.log("支付宝支付：", aliRes);
                            kaayou.PlatformMgr.getInstance().pay.AliPay(aliRes);
                            //PlatformMgr.getInstance().sys.OpenAlipayUrl(res.data.url);
                        }
                        else kaayou.PlatformMgr.getInstance().sys.OpenUrl(res.data.url);

                    }
                }

            }

            @BindEvent("lobby", "mod::mall::legendBuy")
            onLegendBuy(data: { infoStr:string }) {
                console.log("传奇支付数据处理");
                if (!common.mod.Config.GetAppConfig().legendInfo || !kaayou.Identify.isJSON(common.mod.Config.GetAppConfig().legendInfo)) {
                    return;
                }
                let legendInfo = JSON.parse(common.mod.Config.GetAppConfig().legendInfo);
                let payUrl = this.getPayUrl();
                if (lodash.isEmpty(payUrl)) { return; }

                let url =  data.infoStr;
                let temp1 = url.split('?');
                let pram = temp1[1];
                let keyValue = pram.split('&');
                let obj :any = {};
                for (let i = 0; i<keyValue.length; i++){
                    let item = keyValue[i].split('=');
                    let key = item[0];
                    let value = item[1];
                    obj[key] = value;
                }
                let str:string = obj.extra;
                str = str.replace("%7C%7C","||");
                console.log(obj);
                let map ={
                    appid : legendInfo.webPayAppid,
                    extra : str||"",
                    ioskey: "null",
                    name : obj.goodsname || "",
                    nonce_str : "kaayou",
                    num : 1,
                    order : obj.orderid || "",
                    price : obj.val || 0,
                    type : 2,
                    uid : lobby.mod.User.getInstance().getUserInfo().uid.toString(),
                    username : lobby.mod.User.getInstance().getUserInfo().name.toString(),
                }
                let sign = this.getSign(map,legendInfo.key);
                let requestUrl = `${payUrl}/pay/apppay?appid=${map.appid}&uid=${map.uid}&username=${encodeURI(map.username)}&num=1&price=${map.price}&name=${map.name}&type=2&ioskey=null&nonce_str=kaayou&order=${map.order}&extra=${obj.extra}&sign=${sign}`
                kaayou.PlatformMgr.getInstance().sys.OpenUrl(requestUrl);


            }


        }
    }
    lobby.mod.Mall.getInstance();
}