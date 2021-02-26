namespace lobby {
    const { BindEvent, doBindEvent } = kaayou._decorator;
    export namespace mod {
        export class Package {
            static getPublicRuleConfigNames() {
                return ["roundnum", "playernum", "cardcost", "costtype", "restrict", "fewerstart", "gvoice"];
            }
            GameList = [
                { index: "0", key: "bmhm", name: "武汉麻将" },
                { index: "1", key: "cbdg", name: "赤壁打滚" },
                { index: "2", key: "cbmj", name: "赤壁麻将" },
                { index: "3", key: "cemj", name: "铳儿麻将" },
                { index: "4", key: "cydg", name: "崇阳打滚" },
                { index: "5", key: "cyhqj", name: "崇阳画圈脚" },
                { index: "6", key: "cymj", name: "崇阳麻将" },
                { index: "7", key: "czmj", name: "滁州麻将" },
                { index: "8", key: "czpdk", name: "滁州跑得快" },
                { index: "9", key: "dbd", name: "斗板凳" },
                { index: "10", key: "ddz", name: "斗地主" },
                { index: "11", key: "dy510k", name: "大冶510K" },
                { index: "12", key: "dydg", name: "大冶打拱" },
                { index: "13", key: "dymj", name: "大冶开口番" },
                { index: "14", key: "dyrar", name: "大冶肉挨肉" },
                { index: "15", key: "dyzp", name: "大冶字牌" },
                { index: "16", key: "esgdy", name: "恩施干瞪眼" },
                { index: "17", key: "esmj", name: "恩施麻将" },
                { index: "18", key: "espdk", name: "恩施跑得快" },
                { index: "19", key: "essh", name: "恩施绍胡" },
                { index: "20", key: "ez510k", name: "鄂州510K" },
                { index: "21", key: "ezhh", name: "鄂州晃晃" },
                { index: "22", key: "ezmj", name: "鄂州麻将" },
                { index: "23", key: "fymj", name: "阜阳麻将" },
                { index: "24", key: "gdtdh", name: "广东推倒胡" },
                { index: "25", key: "gdy", name: "干瞪眼" },
                { index: "26", key: "hchz", name: "汉川红中" },
                { index: "27", key: "hcmj", name: "汉川麻将" },
                { index: "28", key: "hcsj", name: "汉川数斤" },
                { index: "29", key: "hfbh", name: "鹤峰百胡" },
                { index: "30", key: "hfmj", name: "鹤峰麻将" },
                { index: "31", key: "hgmj", name: "黄冈麻将" },
                { index: "32", key: "hh510k", name: "洪湖510K" },
                { index: "33", key: "hhhj", name: "晃晃合集" },
                { index: "34", key: "hhmj", name: "洪湖麻将" },
                { index: "35", key: "hmmj", name: "黄梅麻将" },
                { index: "36", key: "hs510k", name: "黄石510K" },
                { index: "37", key: "hsmj", name: "黄石麻将" },
                { index: "38", key: "hzhh", name: "黄州晃晃" },
                { index: "39", key: "hzlzg", name: "红中赖子杠" },
                { index: "40", key: "jhpdk", name: "江汉跑得快" },
                { index: "41", key: "jiaozuomj", name: "焦作麻将" },
                { index: "42", key: "jlkj", name: "监利开机" },
                { index: "43", key: "jlmj", name: "监利麻将" },
                { index: "44", key: "jmmj", name: "荆门麻将" },
                { index: "45", key: "jsch", name: "建始楚胡" },
                { index: "46", key: "jsmj", name: "京山麻将" },
                { index: "47", key: "jydg", name: "嘉鱼打滚" },
                { index: "48", key: "jymj", name: "嘉鱼麻将" },
                { index: "49", key: "jzcxz", name: "荆州戳虾子" },
                { index: "50", key: "jzhp", name: "荆州花牌" },
                { index: "51", key: "jzkwx", name: "决战卡五星" },
                { index: "52", key: "jzmj", name: "荆州麻将" },
                { index: "53", key: "jzpdk", name: "决战跑得快" },
                { index: "54", key: "lamj", name: "来安麻将" },
                { index: "55", key: "lcddz", name: "利川斗地主" },
                { index: "56", key: "lcsdr", name: "利川上大人" },
                { index: "57", key: "ltmj", name: "罗田麻将" },
                { index: "58", key: "mcmj", name: "麻城麻将" },
                { index: "59", key: "pdk", name: "跑得快" },
                { index: "60", key: "qcdg", name: "蕲春打拱" },
                { index: "61", key: "qcmj", name: "蕲春麻将" },
                { index: "62", key: "qj510k", name: "潜江510k" },
                { index: "63", key: "qjmj", name: "潜江麻将" },
                { index: "64", key: "quanjiaomj", name: "全椒麻将" },
                { index: "65", key: "ss510k", name: "石首510K" },
                { index: "66", key: "ssah", name: "石首捱晃" },
                { index: "67", key: "sykwx", name: "十堰卡五星" },
                { index: "68", key: "szkwx", name: "随州卡五星" },
                { index: "69", key: "tcbg", name: "通城巴锅" },
                { index: "70", key: "tcdg", name: "通城打滚" },
                { index: "71", key: "tcgz", name: "通城个子" },
                { index: "72", key: "tcmj", name: "通城麻将" },
                { index: "73", key: "tfmj", name: "团风麻将" },
                { index: "74", key: "tm510k", name: "天门510K" },
                { index: "75", key: "tmmj", name: "天门麻将" },
                { index: "76", key: "tsdg", name: "通山打拱" },
                { index: "77", key: "tsmj", name: "通山麻将" },
                { index: "78", key: "wdtdh", name: "皖东推倒胡" },
                { index: "79", key: "wx510k", name: "武穴510K" },
                { index: "80", key: "wxgb", name: "武穴隔板" },
                { index: "81", key: "wxmj", name: "武穴麻将" },
                { index: "82", key: "xgkwx", name: "孝感卡五星" },
                { index: "83", key: "xiaogankwx", name: "新孝感卡五星" },
                { index: "84", key: "xlch", name: "血流成河" },
                { index: "85", key: "xndg", name: "咸宁打拱" },
                { index: "86", key: "xnhh", name: "咸宁晃晃" },
                { index: "87", key: "xnhzlzg", name: "咸宁红中" },
                { index: "88", key: "xsdq", name: "浠水打七" },
                { index: "89", key: "xsmj", name: "浠水麻将" },
                { index: "90", key: "xtmj", name: "仙桃麻将" },
                { index: "91", key: "xtpdk", name: "仙桃跑得快" },
                { index: "92", key: "xtqf", name: "仙桃千分" },
                { index: "93", key: "xtqfbd", name: "仙桃千分必打" },
                { index: "94", key: "xxmj", name: "新乡麻将" },
                { index: "95", key: "xykwx", name: "襄阳卡五星" },
                { index: "96", key: "ychh", name: "应城晃晃" },
                { index: "97", key: "yckwx", name: "应城卡五星" },
                { index: "98", key: "ycsdr", name: "应城上大人" },
                { index: "99", key: "ycxlch", name: "宜昌血流" },
                { index: "100", key: "yichangsdr", name: "宜昌上大人" },
                { index: "101", key: "yxdg", name: "阳新打拱" },
                { index: "102", key: "yxmj", name: "阳新麻将" },
                { index: "103", key: "yxzp", name: "阳新字牌" },
                { index: "104", key: "zjkmj", name: "张家口麻将" },
                { index: "105", key: "zjkpdk", name: "张家口跑得快" },
                { index: "106", key: "zjkphdl", name: "张家口平胡多赖" },
                { index: "107", key: "zxtm", name: "钟祥推磨" },
                { index: "108", key: "zzmj", name: "转转麻将" }
            ];
            static __INS__: lobby.mod.Package = null;
            static getInstance(): lobby.mod.Package {
                if (Package.__INS__ == null) {
                    Package.__INS__ = new Package();
                    Package.__INS__.initMod();
                }
                return Package.__INS__;
            }

            @doBindEvent
            initMod() { }

            getGameList(key) {
                let gameList = kaayou.DataSet.get("GAMELIST");
                if (!!gameList) {
                    let localGameList = JSON.parse(gameList);
                    if (!!localGameList[key]) return localGameList[key];
                    else return [];
                } else return [];
            }

            getGameName(key) {
                for (let i = 0; i < this.GameList.length; ++i) {
                    if (this.GameList[i].key == key) {
                        return this.GameList[i].name;
                    }
                }
            }

            getKindIdList(key) {
                let self = this;
                let gameList = self.getGameList(key);
                let r = [];
                if (!!gameList) {
                    for (let i = 0; i < gameList.length; ++i) {
                        r.push(gameList[i].kindId);
                    }
                }
                return r;
            }

            @BindEvent("lobby", "mod::Package::GameListAndRule")
            doGetGameListAndRuleByKey(data: { key: string, call: Function }) {

                let res = this.getGameList(data.key);

                let kinds = [];
                for (var x in res) {
                    kinds.push({ kind: res[x].kindId, version: res[x].viewVersion });
                }

                kaayou.emit("lobby", "mod::Package::GetRuleByKindId", {
                    kindIdList: kinds, call: function (result) {
                        let list = [];
                        for (var x in res) {
                            for (var y in result) {
                                if (res[x].kindId == result[y].kind_id) {
                                    list.push(lodash.extend({ package_key: data.key }, res[x], result[y]));
                                }
                            }
                        }
                        data.call && data.call(list)
                    }
                });

            }

            getPackageIndex(key) {
                for (let i = 0; i < this.GameList.length; ++i) {
                    if (this.GameList[i].key == key) {
                        return this.GameList[i].index;
                    }
                }
                return -1;
            }

            @BindEvent("lobby", "mod::Package::GetMain3")
            async getMain3() {
                let self = this;
                console.log("获取城市包");
                let res = await kaayou.sendMessage('lobby', pakeageHead.areagamemain, {}, kaayou.MakeResultMessageHead(pakeageHead.areagamemain));
                if (res.errcode) {
                    //新用户会报地区无玩法，不做提示
                    if (res.errcode == 191) return;
                    else {
                        kaayou.emit('common', 'ui::Toast::Show', { msg: res.msg || "未获取到城市包~" })
                        return;
                    }
                }
                self.saveGameList(res, true);
                kaayou.emit('lobby', "ui::ShortCutPanel::ShowGame", <IPackageItem[]>res);
            }

            @BindEvent("lobby", "ui::LoginSucceed")
            async LoginSucceed() {
                let self = this;
                console.log("socket连接成功后，获取一次城市包");
                // let res = await kaayou.sendMessage('lobby', pakeageHead.areagamemain, {}, kaayou.MakeResultMessageHead(pakeageHead.areagamemain));
                // if (res.errcode) {
                //     //新用户会报地区无玩法，不做提示
                //     if (res.errcode == 191) return;
                //     else {
                //         kaayou.emit('common', 'ui::Toast::Show', { msg: res.msg || "未获取到城市包~" })
                //         return;
                //     }
                // }
                // self.saveGameList(res, true);
                // kaayou.emit('lobby', "ui::ShortCutPanel::ShowGame", res);
                this.getMain3();
            }

            saveGameList(data, getRule) {
                if (!!data) {
                    let packageList = kaayou.DataSet.get("PACKAGELIST");
                    let localPackageList = {};
                    if (!!packageList) {
                        localPackageList = JSON.parse(packageList);
                    }
                    for (let i = 0; i < data.length; ++i) {
                        if (data[i] == undefined) continue;
                        let remotePackageKey = data[i].package_key;
                        localPackageList[remotePackageKey] = data[i].package_version;
                    }
                    let s = JSON.stringify(localPackageList);
                    kaayou.DataSet.set("PACKAGELIST", s);
                    let gameList = kaayou.DataSet.get("GAMELIST");
                    let localGameList = {};
                    let needUpdate = [];
                    if (!!gameList) {
                        localGameList = JSON.parse(gameList);
                    }

                    for (let i = 0; i < data.length; ++i) {
                        if (data[i] == undefined) continue;
                        let kindIdList = [];
                        let remotePackageKey = data[i].package_key;
                        for (let j = 0; j < data[i].games.length; ++j) {
                            kindIdList.push({
                                kindId: data[i].games[j].kind_id,
                                name: data[i].games[j].name,
                                ruleVersion: data[i].games[j].game_rule_version,
                                viewVersion: data[i].games[j].client_version,
                                timelimit_free:data[i].games[j].timelimit_free
                            });
                            if (getRule) {
                                if (localGameList[remotePackageKey] == undefined) {
                                    needUpdate.push(data[i].games[j].kind_id);
                                } else {
                                    for (let k = 0; k < localGameList[remotePackageKey].length; ++k) {
                                        if (localGameList[remotePackageKey][k].kindId == data[i].games[j].kind_id) {
                                            if (localGameList[remotePackageKey][k].viewVersion != data[i].games[j].client_version) {
                                                needUpdate.push(data[i].games[j].kind_id);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        localGameList[data[i].package_key] = kindIdList;
                    }
                    if (getRule && needUpdate.length > 0) kaayou.emit("lobby", "mod::Rule::update", needUpdate);
                    kaayou.DataSet.set("GAMELIST", JSON.stringify(localGameList));
                }
            }


            // package_type:  扑克 1 字牌 2  麻将 3
            @BindEvent("lobby", "mod::Package::Search")
            async search(data: { code: string, keyword: string, type: string, package_type: number, call: Function }) {
                let self = this;
                let uniq = function (array) {
                    var temp = []; //一个新的临时数组
                    var r = [];
                    for (var i = 0; i < array.length; i++) {
                        if (temp.indexOf(array[i].package_key) == -1) {
                            temp.push(array[i].package_key);
                            r.push(array[i]);
                        }
                    }
                    return r;
                }
                let sdata: proto_areagameseek = {
                    code: data.code,
                    keyword: data.keyword,
                    type: data.type,
                    package_type: data.package_type
                }
                //0:所有；1：推荐；2：周边
                let res: proto_areagameseek_res = await kaayou.sendMessage('lobby', pakeageHead.areagameseek, sdata, kaayou.MakeResultMessageHead(pakeageHead.areagameseek));
                if (res.errcode) {
                    kaayou.emit("lobby", 'ui::Dialog::Show', {
                        msg: "未获取到游戏包！"
                    })
                    data.call([]);
                    return;
                }
                let r = uniq(res.packages);
                self.saveGameList(r, true);
                if (data.call) {
                    data.call(r);
                }

                // kaayou.emit("lobby", "ui::teahouse::showRuleMenu", r);
            }

            @BindEvent("tea", "mod::Package::TeaHouse")
            async getTeahousePackage(data: { call: Function }) {
                let self = this;
                let uniq = function (array) {
                    var temp = []; //一个新的临时数组
                    var r = [];
                    for (var i = 0; i < array.length; i++) {
                        if (temp.indexOf(array[i].package_key) == -1) {
                            temp.push(array[i].package_key);
                            r.push(array[i]);
                        }
                    }
                    return r;
                }
                //0:所有；1：推荐；2：周边
                let sdata = {
                    hid: tea.mod.__teaHouseInfo.hid
                }
                let res: proto_housegamelist_res = await kaayou.sendMessage('lobby', pakeageHead.housegamelist, sdata, kaayou.MakeResultMessageHead(pakeageHead.housegamelist));
                if (res.errcode) {
                    kaayou.emit("lobby", 'ui::Dialog::Show', {
                        msg: "未获取到游戏包！"
                    })
                    return;
                }
                let r = uniq(res.packages);
                self.saveGameList(r, true);
                if (data.call) {
                    data.call(r);
                }
            }

            ruleMap = {};
            @BindEvent("lobby", "mod::Package::GetRuleByKindId")
            async getRuleList(data: { kindIdList: Array<{ kind: string, version: number }>, call: Function }) {
                let self = this;
                let r: Array<{ kind_id: string, rule: string }> = [];
                let lack: Array<{ kind: string, version: number }> = [];
                for (let i = 0; i < data.kindIdList.length; ++i) {
                    let rule = self._getRuleByKindId(data.kindIdList[i].kind, data.kindIdList[i].version);
                    if (!!rule) {
                        let item = {
                            kind_id: data.kindIdList[i].kind,
                            rule: rule
                        }
                        r.push(item);
                    } else {
                        lack.push(data.kindIdList[i]);
                    }
                }

                if (r.length == data.kindIdList.length) {
                    data.call(r);
                } else {
                    kaayou.emit("common", "ui::Loading::Show", { msg: "加载规则", time: 5 });
                    self.updateRule(lack, function () {
                        for (let i = 0; i < lack.length; ++i) {
                            let rule = self._getRuleByKindId(lack[i].kind, lack[i].version);
                            if (!!rule) {
                                let item = {
                                    kind_id: lack[i].kind,
                                    rule: rule
                                }
                                r.push(item);
                            }
                        }
                        kaayou.emit("common", "ui::Loading::Hide");
                        data.call(r);
                    });
                    // self.getRuleList(data.kindIdList);
                }
            }

            private _getRuleByKindId(kindid: string, version: number) {
                let self = this;
                let rules = cc.sys.localStorage.getItem(this.__paruleNaame);
                if (!!rules) {
                    self.ruleMap = JSON.parse(rules);
                    for (var key in self.ruleMap) {
                        if (key == kindid) {
                            let rule = JSON.parse(self.ruleMap[key]);
                            if (rule && rule.viewVersion == version) {
                                return self.ruleMap[key];
                            }
                            return null;
                        }
                    }
                }
                return null;
            }
            __paruleNaame = "KRULE";

            @BindEvent('lobby', 'ws::Msg::changerule')
            onRuleChange(data) {
                let self = this;
                let rules = cc.sys.localStorage.getItem(this.__paruleNaame);
                self.ruleMap = {};
                if (!!rules) self.ruleMap = JSON.parse(rules);
                for (let i = 0; i < data.length; ++i) {
                    let kindid = data[i].kind_id;
                    let newRule = data[i].rule;
                    try {
                        newRule = JSON.parse(newRule);
                        if (!newRule) { throw "rule err"; }
                        if (!lodash.isObject(newRule)) { throw "rule err"; }
                        newRule.viewVersion = data[i].client_version;
                        newRule = JSON.stringify(newRule);
                    } catch (err) {
                        continue;
                    }
                    self.ruleMap[kindid] = newRule;
                }
                let sRules = JSON.stringify(self.ruleMap);
                cc.sys.localStorage.setItem(this.__paruleNaame, sRules);
                kaayou.emit('lobby', 'ui::rule::refresh');
            }

            @BindEvent('lobby', "mod::Package::RuleUpdate")
            async updateRule(data: Array<{ kind: string, version: number }>, call: Function = null) {
                let self = this;
                let kind_ids: Array<number> = [];

                for (var x in data) {
                    kind_ids.push(Number(data[x].kind));
                }

                let api = kaayou.DataSet.get("RULEAPI");
                let temp = {
                    "head": "areagamerules",
                    "data": JSON.stringify({ kind_ids: kind_ids, engine: 2 }),
                    "msgsign": {
                        "time": new Date().getTime(),
                        "encode": 0
                    }
                }

                if (common.mod.Config.isLoginEncryp) {
                    temp.msgsign.encode = 1;
                    temp.data = kaayou.AES.encrypt(temp.data);
                }
                let res = await kaayou.Http.POST("http://" + common.mod.Config.GetAppConfig().apiUrl + "/api", { msgdata: JSON.stringify(temp) });
                let msg: kaayou.Ka_MSG_RES = kaayou.Http.parseResult(res);
                if (!msg) { return; }
                if (msg.errcode != 0) {
                    kaayou.emit('common', 'ui::Toast::Show', { msg: msg.data || "规则获取失败" })
                    return;
                }
                self.onRuleChange(msg.data.games);
                call && call();
            }

            @BindEvent('lobby', "mod::lobby::GetRecruitWechat")
            async getRecruitWechat(key: string) {
                let self = this;
                let res = <string>await kaayou.Http.GET(common.mod.Config.ConfigUrl + "/api/package/wechat?package_key=" + key);
                //let res = await kaayou.sendMessage('lobby', "areacswxbykey", { key: key }, "ws::Msg::areacswxbykey");
                if (!res) { return; }
                let data = JSON.parse(res);
                if (data.code != 0) {
                    kaayou.emit('common', 'ui::Toast::Show', { msg: data.msg || "规则获取失败" })
                    return;
                }
                kaayou.emit("lobby", "ui::Lobby::RecruitWechat", data.data.wechat_id);
            }
        }
    }
    lobby.mod.Package.getInstance();
}