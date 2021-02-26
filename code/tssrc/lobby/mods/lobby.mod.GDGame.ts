/// <reference path="./protos/gdgame.proto.ts" />
namespace lobby {
    const { BindEvent, doBindEvent } = kaayou._decorator;

    export namespace mod {
        export class GDGame {    //大厅零散请求
            static __INS__: lobby.mod.GDGame = null;
            static getInstance(): lobby.mod.GDGame {
                if (GDGame.__INS__ == null) {
                    GDGame.__INS__ = new GDGame();
                    GDGame.__INS__.initMod();
                }
                return GDGame.__INS__;
            }
            @doBindEvent
            initMod() { }


            //金币场获取版本；
            @BindEvent("lobby", "mod::GDGame::AreaPkgByKind")
            async onGetPakeageByKind(data: { kindid: number, callBack: Function }) {
                let sdata: proto_areapkgbykid = {
                    kindid: data.kindid
                }
                let info: proto_areapkgbytid_res = await kaayou.sendMessage("lobby", rcGameHead.areapkgbykid, sdata, kaayou.MakeResultMessageHead(rcGameHead.areapkgbykid));
                kaayou.emit('common', "ui::Loading::Hide");
                if (info.errcode) {
                    kaayou.emit('common', "ui::Toast::Show", { msg: info.msg || "获取玩法包信息失败~~~" });
                    return;
                }
                if (lodash.isFunction(data.callBack)) {
                    data.callBack(info);
                }
            }


            //校验是否买两次。。。。。
            @BindEvent("lobby","mod::GDGame::check")
            async onGetBankRuptStatus(data1:{callBack:Function}){
                let token = "";
                let uid = "";
                var sToken = cc.sys.localStorage.getItem('user::token');
                var oToken = JSON.parse(sToken);
                token = oToken.token;
                uid = oToken.uid;
                if (!token || !uid) {
                    return;
                }
                let data: proto_checkbuybgift = { uid: Number(uid), token: token }
                let temp = {
                    "head": "checkbuybgift",
                    "data": JSON.stringify(data),
                    "msgsign": {
                        "time": new Date().getTime(),
                        "encode": 0
                    }
                }
                if (common.mod.Config.isLoginEncryp) {
                    temp.msgsign.encode = 1;
                    temp.data = kaayou.AES.encrypt(temp.data);
                }
                kaayou.emit("common", "ui::Loading::Show");
                console.log(common.mod.Config.GetAppConfig().hallUrl + "/service");
                let res = await kaayou.Http.POST(common.mod.Config.GetAppConfig().hallUrl + "/service", { msgdata: JSON.stringify(temp) });
                kaayou.emit("common", 'ui::Loading::Hide');
                let msg: kaayou.Ka_MSG_RES = kaayou.Http.parseResult(res);//
                if (msg.errcode) {
                    kaayou.emit('common', "ui::Toast::Show", { msg: msg.errmsg });
                    if (msg.errcode == 234) {//这时说明是已经之前购买了；
                        //需要去清除调
                        kaayou.emit("common","ui::BankruptPanel::Hide");
                    }
                    return;
                }
                if (data1.callBack) {
                    data1.callBack();
                }
            }




            //返回错误码 227 时客户端主动拉取低保礼包等信息
            @BindEvent("common", "mod::GDGame::getallowanceinfo")
            async getallowanceinfo(dataReq: { ignore_gift: boolean, callBack?: Function }) {
                let token = "";
                let uid = "";
                var sToken = cc.sys.localStorage.getItem('user::token');
                var oToken = JSON.parse(sToken);
                token = oToken.token;
                uid = oToken.uid;

                console.log("uid:" + uid + " token:" + token);
                if (!token || !uid) {
                    return;
                }
                // let tempCode = kaayou.PlatformMgr.getInstance().sys.GetDeviceKey();
                let data: proto_getallowanceinfo = { uid: Number(uid), token: token, ignore_gift: dataReq.ignore_gift }
                let temp = {
                    "head": "getallowanceinfo",
                    "data": JSON.stringify(data),
                    "msgsign": {
                        "time": new Date().getTime(),
                        "encode": 0
                    }
                }
                if (common.mod.Config.isLoginEncryp) {
                    temp.msgsign.encode = 1;
                    temp.data = kaayou.AES.encrypt(temp.data);
                }
                console.log("获取低保：", temp);
                kaayou.emit("common", "ui::Loading::Show");
                console.log(common.mod.Config.GetAppConfig().hallUrl + "/service");
                let res = await kaayou.Http.POST(common.mod.Config.GetAppConfig().hallUrl + "/service", { msgdata: JSON.stringify(temp) });
                kaayou.emit("common", 'ui::Loading::Hide');
                let msg: kaayou.Ka_MSG_RES = kaayou.Http.parseResult(res);//
                if (msg.errcode) {
                    if (msg.errcode == 158) {
                        let sname = kaayou.UIManager.getInstance().getCurRuningSceneName();
                        if (sname != "TEAHOUSE" && sname != "LOBBY") {  //在游戏里面
                            kaayou.emit('common', 'ui::Dialog::Show', {
                                msg: msg.errmsg || "找不到对应房间，请重试！",
                                btns: [
                                    {
                                        name: "确定",
                                        action: function () {
                                            kaayou.emit('common', 'ui::gameToLobby', {});
                                        },
                                        colorType: 'green'
                                    },
                                ]
                            });
                            return;
                        }
                        kaayou.emit('common', 'ui::Dialog::Show', {
                            msg: msg.errmsg || "找不到对应房间，请重试！",
                            btns: [
                                {
                                    name: "取消",
                                    action: function () { },
                                    colorType: 'yellow'
                                },
                                {
                                    name: "去兑换",
                                    action: function () {
                                        kaayou.emit("lobby", 'ui::Mall::Show', 1);
                                    },
                                    colorType: 'green'
                                },
                            ]
                        });
                    } else {
                        kaayou.emit('common', "ui::Toast::Show", { msg: msg.errmsg });
                    }
                    return;
                }

                if (dataReq.callBack) {
                    dataReq.callBack(msg);
                }

            }








            @BindEvent("lobby", "mod::GDGame::SiteIn")
            async doSiteIn(data: { kind: string, type: number }) {
                if (lodash.isEmpty(data)) { return; }
                if (!data.kind) { return; }
                if (!data.type) { return; }
                let sData: proto_sitein = { kind_id: Number(data.kind), site_type: data.type }
                let res = await kaayou.sendMessage('lobby', GDGameHead.sitein, sData, kaayou.MakeResultMessageHead(GDGameHead.sitein));
                if (res.errcode) {
                    kaayou.emit('common', 'ui::Loading::Hide');
                    if (res.errcode == 227) {
                        kaayou.emit("common", "mod::GDGame::getallowanceinfo", {
                            ignore_gift: false, callBack: function (info) {
                                if (info && info.data && info.data.allowance) {    //  有这个时候弹破产补助
                                    kaayou.emit("lobby", "ui::DisposeAllowances::Show", info.data.allowance);
                                } else {
                                    //去获取破产礼包
                                    kaayou.emit("lobby", "mod::Mall::getBankRupt");
                                }
                            }
                        });

                        return;
                    } else if (res.errcode == 136) {
                        kaayou.emit("lobby", "ui::Maintain::Show", { msg: JSON.parse(res.msg).content, code: res.errcode })
                        return;
                    } else if (res.errcode == 135) {//系统维护
                        let maintenance = JSON.parse(res.data);
                        kaayou.emit('lobby', 'ui::Maintain::Show', { msg: maintenance.content, code: res.errcode });
                        return;
                    }
                    kaayou.emit('common', 'ui::Dialog::Show', {
                        msg: res.msg || "找不到对应房间，请重试！",
                        btns: [
                            {
                                name: "确定",
                                action: function () { },
                                colorType: 'green'
                            },
                        ]
                    });
                    return;
                }

                let tempRes = {
                    id: res.id,
                    gameid: res.gameid,
                    kindid: res.kindid,
                    ip: res.ip,
                    package_key: res.package_key,
                    site_type: res.site_type,
                    tablenum: res.tablenum
                }

                kaayou.DataSet.set("game::config", JSON.stringify(tempRes));
                kaayou.LobbyToGame(tempRes.package_key);

            }


        }
    }
    lobby.mod.GDGame.getInstance();
}