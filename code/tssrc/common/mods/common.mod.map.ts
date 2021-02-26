namespace common {
    const { BindEvent, doBindEvent } = kaayou._decorator;
    export namespace mod {
        export class ChineseMap {
            AreaList = [
                {
                    city: "AnYang",
                    district: [{ name: "安阳市", code: "410500" }],
                    province: "HeNan"
                },
                {
                    city: "ChuZhou",
                    district: [{ name: "滁州市", code: "341100" }, { name: "来安县", code: "341122" }, { name: "全椒县", code: "341124" }],
                    province: "AnHui"
                },
                {
                    city: "EnShi",
                    district: [{ name: "恩施市", code: "422801" }, { name: "利川市", code: "422802" }, { name: "鹤峰县", code: "422828" }
                        //{ name: "恩施州", code: "422800" }, 
                        // { name: "建始县", code: "422822" }, { name: "巴东县", code: "422823" },
                        // { name: "宣恩县", code: "422825" }, { name: "咸丰县", code: "422826" }, { name: "来凤县", code: "422827" }
                    ],
                    province: "HuBei"
                },
                {
                    city: "EZhou",
                    district: [{ name: "鄂州市", code: "420700" }],
                    province: "HuBei"
                },
                {
                    city: "FuYang",
                    district: [{ name: "阜阳市", code: "341200" }],
                    province: "AnHui"
                },
                {
                    city: "HeBi",
                    district: [{ name: "鹤壁市", code: "410600" }],
                    province: "HeNan"
                },
                {
                    city: "HuangGang",
                    district: [{ name: "黄冈市", code: "421100" }, { name: "黄州区", code: "421102" }, { name: "团风县", code: "421121" }, { name: "红安县", code: "421122" }, { name: "罗田县", code: "421123" },
                    { name: "英山县", code: "421124" }, { name: "浠水县", code: "421125" }, { name: "蕲春县", code: "421126" }, { name: "黄梅县", code: "421127" },
                    { name: "龙感湖", code: "421171" }, { name: "麻城市", code: "421181" }, { name: "武穴市", code: "421182" }],
                    province: "HuBei"
                },
                {
                    city: "HuangShi",
                    district: [{ name: "黄石市", code: "420200" }, { name: "阳新县", code: "420222" }, { name: "大冶市", code: "420281" }],
                    province: "HuBei"
                },
                {
                    city: "JiYuan",
                    district: [{ name: "济源市", code: "419001" }],
                    province: "HeNan"
                },
                {
                    city: "JiaoZuo",
                    district: [{ name: "焦作市", code: "410800" }],
                    province: "HeNan"
                },
                {
                    city: "JingMen",
                    district: [{ name: "荆门市", code: "420800" }, { name: "沙洋县", code: "420822" }, { name: "钟祥市", code: "420881" }, { name: "京山市", code: "420821" }],
                    province: "HuBei"
                },
                {
                    city: "JingZhou",
                    district: [{ name: "荆州市", code: "421000" }, { name: "公安县", code: "421022" }, { name: "监利县", code: "421023" }, { name: "江陵县", code: "421024" },
                    { name: "石首市", code: "421081" }, { name: "洪湖市", code: "421083" }, { name: "松滋市", code: "421087" }],
                    province: "HuBei"
                },
                {
                    city: "KaiFeng",
                    district: [{ name: "开封市", code: "410200" }],
                    province: "HeNan"
                },
                {
                    city: "LuoHe",
                    district: [{ name: "漯河市", code: "411100" }],
                    province: "HeNan"
                },
                {
                    city: "LuoYang",
                    district: [{ name: "洛阳市", code: "410300" }],
                    province: "HeNan"
                },
                {
                    city: "NanYang",
                    district: [{ name: "南阳市", code: "411300" }],
                    province: "HeNan"
                },
                {
                    city: "PingDingShan",
                    district: [{ name: "平顶山市", code: "410400" }],
                    province: "HeNan"
                },
                {
                    city: "PuYang",
                    district: [{ name: "濮阳市", code: "410900" }],
                    province: "HeNan"
                },
                {
                    city: "QianJiang",
                    district: [{ name: "潜江市", code: "429005" }],
                    province: "HuBei"
                },
                {
                    city: "SanMenXia",
                    district: [{ name: "三门峡市", code: "411200" }],
                    province: "HeNan"
                },
                {
                    city: "ShangQiu",
                    district: [{ name: "商丘市", code: "411400" }],
                    province: "HeNan"
                },
                {
                    city: "ShiYan",
                    district: [{ name: "十堰市", code: "420300" }, { name: "郧西县", code: "420322" }, { name: "竹山县", code: "420323" }, { name: "房县", code: "420325" },
                    { name: "丹江口市", code: "420381" }],
                    province: "HuBei"
                },
                {
                    city: "SuiZhou",
                    district: [{ name: "随州市", code: "421300" }, { name: "随县", code: "421321" }, { name: "广水市", code: "421381" }],
                    province: "HuBei"
                },
                {
                    city: "TianMen",
                    district: [{ name: "天门市", code: "429006" }],
                    province: "HuBei"
                },
                {
                    city: "WuHan",
                    district: [{ name: "武汉市", code: "420100" }],
                    province: "HuBei"
                },
                {
                    city: "XiangYang",
                    district: [{ name: "襄阳市", code: "420600" }, { name: "南漳县", code: "420624" }, { name: "谷城县", code: "420625" }, { name: "保康县", code: "420626" },
                    { name: "老河口市", code: "420682" }, { name: "枣阳市", code: "420683" }, { name: "宜城市", code: "420684" }],
                    province: "HuBei"
                },
                {
                    city: "XianNing",
                    district: [{ name: "咸宁市", code: "421200" }, { name: "咸安区", code: "421202" }, { name: "嘉鱼县", code: "421221" }, { name: "通城县", code: "421222" }, { name: "崇阳县", code: "421223" },
                    { name: "通山县", code: "421224" }, { name: "赤壁市", code: "421281" }],
                    province: "HuBei"
                },
                {
                    city: "XianTao",
                    district: [{ name: "仙桃市", code: "429004" }],
                    province: "HuBei"
                },
                {
                    city: "XiaoGan",
                    district: [{ name: "孝感市", code: "420900" }, { name: "孝昌县", code: "420921" }, { name: "大悟县", code: "420922" }, { name: "云梦县", code: "420923" },
                    { name: "应城市", code: "420981" }, { name: "安陆市", code: "420982" }, { name: "汉川市", code: "420984" }],
                    province: "HuBei"
                },
                {
                    city: "XinXiang",
                    district: [{ name: "新乡市", code: "410700" }],
                    province: "HeNan"
                },
                {
                    city: "XinYang",
                    district: [{ name: "信阳市", code: "411500" }],
                    province: "HeNan"
                },
                {
                    city: "XuChang",
                    district: [{ name: "许昌市", code: "411000" }],
                    province: "HeNan"
                },
                {
                    city: "YiChang",
                    district: [{ name: "宜昌市", code: "420500" }, { name: "远安县", code: "420525" }, { name: "兴山县", code: "420526" }, { name: "秭归县", code: "420527" },
                    { name: "长阳县", code: "420528" }, { name: "五峰县", code: "420529" }, { name: "宜都市", code: "420581" }, { name: "当阳市", code: "420582" },
                    { name: "枝江市", code: "420583" }],
                    province: "HuBei"
                },
                {
                    city: "ZhangJiaKou",
                    district: [{ name: "张家口市", code: "130700" }],
                    province: "HeBei"
                },
                {
                    city: "ZhengZhou",
                    district: [{ name: "郑州市", code: "410100" }],
                    province: "HeNan"
                },
                {
                    city: "ZhouKou",
                    district: [{ name: "周口市", code: "411600" }],
                    province: "HeNan"
                },
                {
                    city: "ZhuMaDian",
                    district: [{ name: "驻马店市", code: "411700" }],
                    province: "HeNan"
                }
            ];

            //单例模式
            static __INS__: ChineseMap = null;
            static getInstance() {
                if (ChineseMap.__INS__ == null) {
                    ChineseMap.__INS__ = new ChineseMap();
                }
                return ChineseMap.__INS__;
            }

            getAdcode(cityId) {
                for (let i = 0; i < this.AreaList.length; ++i) {
                    if (this.AreaList[i].city == cityId) {
                        return this.AreaList[i].district[0].code;
                    }
                }
                return "000000";
            }

            getAdcodeByName(cityName) {
                for (let i = 0; i < this.AreaList.length; ++i) {
                    for (let j = 0; j < this.AreaList[i].district.length; ++j) {
                        if (this.AreaList[i].district[j].name == cityName) {
                            return this.AreaList[i].district[j].code;
                        }
                    }
                }
                return "000000";
            }

            getCityAdcode(code) {
                let self = this;
                if (code.substr(2, 2) != "90") {
                    return code.substr(0, 4) + "00";
                } else return code;
            }

            getCityId(adcode) {
                for (let i = 0; i < this.AreaList.length; ++i) {
                    for (let j = 0; j < this.AreaList[i].district.length; ++j) {
                        if (this.AreaList[i].district[j].code == adcode) {
                            return this.AreaList[i].city;
                        }
                    }
                }
                return "";
            }

            getDistrictByCityKey(city) {
                for (let i = 0; i < this.AreaList.length; ++i) {
                    if (this.AreaList[i].city == city) {
                        return this.AreaList[i].district;
                    }
                }
                return [];
            }


            getDistrictByAreacode(areacode) {
                for (let i = 0; i < this.AreaList.length; ++i) {
                    if (this.AreaList[i].district[0].code == areacode) {
                        return this.AreaList[i].district;
                    }
                }
                return [];
            }

            getName(code) {
                for (let i = 0; i < this.AreaList.length; ++i) {
                    for (let j = 0; j < this.AreaList[i].district.length; ++j) {
                        if (this.AreaList[i].district[j].code == code) {
                            return this.AreaList[i].district[j].name;
                        }
                    }
                }
                return "未知";
            }

            getProvince(cityId) {
                for (let i = 0; i < this.AreaList.length; ++i) {
                    if (cityId == this.AreaList[i].city) {
                        return this.AreaList[i].province;
                    }
                }
                return "";
            }
        }
    }
}