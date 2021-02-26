namespace lobby {
    const { BindEvent, doBindEvent } = kaayou._decorator;

    export class AreaImgRadio extends kaayou.Block {
        public radioBg: ccui.ImageView = null;
        public radioStr: ccui.ImageView = null;
        value: string = "";
        _isInit = false;
        initWithNodeNoClone(node: ccui.Widget) {
            let self = this;
            this.value = node.getName();
            super.initWithNodeNoClone(node);
            this.node.on(kaayou.TouchEvent.TouchEnd, this.onClick, this);
            kaayou.getController("AreaImgRadio").on("Value::Change", this.onChange, this);
            kaayou.getController("lobby").on("ui::AreaDistrict::Hide", self.stop, this);
        }

        doInitAndShow(i: number, call: Function) {
            let self = this;
            self.node.setOpacity(0);
            self.node.stopAllActions();
            if (lobby.AreaRadiosText[this.value]) {
                setTimeout(() => {
                    if (!self._isInit) {
                        self.radioBg = ccui.ImageView.create(lobby.AreaRadiosBg.nomarl, ccui.Widget.PLIST_TEXTURE)
                        self.radioStr = ccui.ImageView.create(lobby.AreaRadiosText[self.value].nomarl, ccui.Widget.PLIST_TEXTURE)
                        self.node.addChild(self.radioBg);
                        self.node.addChild(self.radioStr);
                    }
                    self.radioBg.setAnchorPoint(0.5, 0.5);
                    self.radioStr.setAnchorPoint(0.5, 0.5);
                    self.radioBg.setPosition(self.node.getContentSize().width / 2, self.node.getContentSize().height / 2);
                    self.radioStr.setPosition(self.node.getContentSize().width / 2, self.node.getContentSize().height / 2 + 14);
                    self.radioBg.loadTexture(lobby.AreaRadiosBg.nomarl, ccui.Widget.PLIST_TEXTURE); //= ccui.ImageView.create(lobby.AreaRadiosBg.nomarl, ccui.Widget.PLIST_TEXTURE)
                    console.log("城市名图片：", lobby.AreaRadiosText[this.value].nomarl)
                    self.radioStr.loadTexture(lobby.AreaRadiosText[self.value].nomarl, ccui.Widget.PLIST_TEXTURE);
                    self.ShowAnim(i, call);
                    self._isInit = true;
                }, 10 * i);
            }
        }
        ShowAnim(i, call) {
            let self = this;

            self.node.setOpacity(0);
            self.node.runAction(cc.sequence(cc.fadeIn(1), cc.callFunc(function () {
                call && call();
            })));
        }
        onClick() {
            kaayou.SoundManager.getInstance().playSound(common.SoundRes.Default);
            if (!this._isInit || this._lock) { return; }
            kaayou.emit("AreaImgRadio", "Value::Change", { value: this.value, popup: true });
        }
        _lock = true;
        setLock(b) {
            this._lock = b;
        }
        onChange(e: kaayou.CustomEvent) {
            if (!this._isInit) { return; }
            let { value, popup } = e.data;
            if (value) {
                if (this.value == value) {
                    this.radioBg.loadTexture(lobby.AreaRadiosBg.on, ccui.Widget.PLIST_TEXTURE); //= ccui.ImageView.create(lobby.AreaRadiosBg.nomarl, ccui.Widget.PLIST_TEXTURE)
                    this.radioStr.loadTexture(lobby.AreaRadiosText[this.value].on, ccui.Widget.PLIST_TEXTURE);
                    if (popup) {
                        kaayou.emit('lobby', 'ui::Areas::Click', { citykey: value });
                    }
                    this.jump();
                } else {
                    this.radioBg.loadTexture(lobby.AreaRadiosBg.nomarl, ccui.Widget.PLIST_TEXTURE); //= ccui.ImageView.create(lobby.AreaRadiosBg.nomarl, ccui.Widget.PLIST_TEXTURE)
                    this.radioStr.loadTexture(lobby.AreaRadiosText[this.value].nomarl, ccui.Widget.PLIST_TEXTURE);
                    this.stop();
                }
            }
        }

        public jump() {
            if (!this._isInit) { return; }
            this.node.stopAllActions();
            this.node.setPosition(this.getContentSize().width / 2, this.getContentSize().height / 2);
            this.node.runAction(cc.repeatForever(cc.sequence(cc.moveBy(1, 0, 20), cc.moveBy(1, 0, -20), cc.delayTime(2))));
        }

        //lw190618当关闭地图时，停止动画并回原点
        public stop() {
            if (!this._isInit) { return; }
            console.log("停止" + this.value + "跳动");
            this.node.stopAllActions();
            this.node.setPosition(this.getContentSize().width / 2, this.getContentSize().height / 2);
        }
    }

    //lw190618县的单选框
    export class AreaDistrictRadio extends kaayou.Block {
        public radio: ccui.CheckBox = null;
        public label: ccui.Text = null;
        value: string = "";
        initWithNode(node: ccui.Widget) {
            super.initWithNode(node);
            this.radio = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "radio");
            this.label = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label");
            this.node.on(kaayou.TouchEvent.TouchEnd, this.onClick, this);

            kaayou.getController("AreaDistrictRadio").on("Value::Change", this.onChange, this)
        }
        onClick() {
            kaayou.SoundManager.getInstance().playSound(common.SoundRes.Default);
            kaayou.emit("AreaDistrictRadio", "Value::Change", { value: this.value, popup: true });
        }

        setInfo(name: string, value: string) {
            this.value = value;
            this.label.setString(name);
        }

        onChange(e: kaayou.CustomEvent) {
            let { value, popup } = e.data;
            if (value) {
                if (this.value == value) {
                    this.radio.setSelected(true);
                } else {
                    this.radio.setSelected(false);
                }
            }
        }
    }

    export class AreaDistrictLayer extends kaayou.Block {
        //lw190618县选择面板
        _districtLayout: ccui.ScrollView = null;
        initWithNodeNoClone(node: ccui.Widget) {
            super.initWithNodeNoClone(node);
            this.initUI();
        }

        _areaDistrictRadios: Array<AreaDistrictRadio> = null;
        @doBindEvent
        initUI() {
            let self = this;
            this._districtLayout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "DistrictLayout");
            let AreaDistrictRadio_model = ccui.helper.seekWidgetByName<ccui.Layout>(<ccui.Widget>this.node, "AreaDistrictRadio_model");
            this._areaDistrictRadios = [];
            for (var i = 0; i < 16; i++) {
                let r = new AreaDistrictRadio();
                r.initWithNode(AreaDistrictRadio_model)
                this._areaDistrictRadios.push(r);
                this._districtLayout.addChild(r);
            }

            this._districtLayout.setPadding({ top: 0, bottom: 0, left: 0, right: 0, spacingX: 0, spacingY: 0 });
            this._districtLayout.setGrid(ccui.Layout.LayoutGrid_AxisDirection.HORIZONTAL);
            this._districtLayout.setHorizontal(ccui.Layout.LayoutHorizontal.LEFT);
            this._districtLayout.setVertical(ccui.Layout.LayoutVertical.TOP);
            this._districtLayout.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Grid);
            this._districtLayout.setGridColumn(4);
            this._districtLayout.doChildrenLayout();


            let CloseButton = ccui.helper.seekWidgetByName<ccui.Layout>(<ccui.Widget>this.node, "CloseButton");
            CloseButton.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.Close);
                self.Hide();
            }, this);

            let OKButton = ccui.helper.seekWidgetByName<ccui.Layout>(<ccui.Widget>this.node, "OKButton");
            OKButton.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.Default);
                if (lodash.isEmpty(this.areaCode)) {
                    return;
                }
                kaayou.emit("lobby", "mod::User::areaenter", { code: this.areaCode });
            }, this);
            kaayou.getController("AreaDistrictRadio").on("Value::Change", this.onChange, this)
            this.Hide();
        }
        areaCode = "";
        onChange(e: kaayou.CustomEvent) {
            let { value, popup } = e.data;
            this.areaCode = value;
        }

        @BindEvent('lobby', 'ui::AreaDistrict::Show')
        Show(data: { districts: Array<{ name: string, code: string }>, adcode: string }) {

            let defaultValue = "";
            for (var i = 0; i < this._areaDistrictRadios.length; i++) {
                if (i < data.districts.length) {
                    if (data.districts[i].code == data.adcode) {
                        defaultValue = data.districts[i].code;
                    }
                    this._areaDistrictRadios[i].setInfo(data.districts[i].name, data.districts[i].code);
                    this._areaDistrictRadios[i].setVisible(true);
                } else {
                    this._areaDistrictRadios[i].setInfo("", "");
                    this._areaDistrictRadios[i].setVisible(false);
                }
            }
            if (lodash.isEmpty(defaultValue) && data.districts.length > 0) {
                defaultValue = data.districts[0].code;
            }
            if (lodash.isEmpty(defaultValue)) {
                return;
            }
            kaayou.emit("AreaDistrictRadio", "Value::Change", { value: defaultValue, popup: false });
            this.setVisible(true);
        }
        @BindEvent('lobby', 'ui::AreaDistrict::Hide')
        Hide() {
            this.setVisible(false);
        }
    }

    export class AreaSelectionPanelMgr {
        static __INS__: AreaSelectionPanelMgr = null;
        static getInstance(_zOrder: number = 0) {
            if (AreaSelectionPanelMgr.__INS__ == null) {
                AreaSelectionPanelMgr.__INS__ = new AreaSelectionPanelMgr();
                AreaSelectionPanelMgr.__INS__.init();
                AreaSelectionPanelMgr.__INS__._zOrder = _zOrder;
            }
            return AreaSelectionPanelMgr.__INS__;
        }
        __selfPanel: AreaSelectionPanel = null;
        public _zOrder = 0;
        init() {
            let self = this;
            this.__selfPanel = null;

            kaayou.getController('lobby').on('ui::Areas::Show', function (e: kaayou.Event) {
                self.getPanel(true).Show();
            }, this, 10);
            kaayou.getController('lobby').on('ui::Areas::Hide', function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this, 10);

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new AreaSelectionPanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel, this._zOrder);
                this.__selfPanel['onConfigUpdate'] && this.__selfPanel['onConfigUpdate']();
            }
            return this.__selfPanel;
        }

    }

    export class AreaSelectionPanel extends kaayou.ModelLayer {
        constructor() {
            super();
            this.initUI();
        }

        adcodeServer: string = "";//用来记录服务端的adcode，不要给它赋值
        btnClose: ccui.Button = null;
        btnCloseDistrict: ccui.Button = null;
        btnHeBei: ccui.Layout = null;
        btnHeNan: ccui.Layout = null;
        btnHuBei: ccui.Layout = null;
        btnAnHui: ccui.Layout = null;
        btnOk: ccui.Button = null;
        cityButtonList: common.RadioGroupWithImg = null;
        cityButtonLayout: ccui.Layout = null;
        cityCode: string = "";
        cityName: string = "";
        districtLayout: ccui.Layout = null;
        noGamePanel: ccui.Layout = null;

        selectedCityCode: string = "";
        selectedCityKey: string = "";
        spCloudLeft: ccui.ImageView = null;
        spCloudRight: ccui.ImageView = null;
        topbarMgr: lobby.TopBarMgr = null;

        onAreaClick(data: { citykey: string }) {
            let districtArr = common.mod.ChineseMap.getInstance().getDistrictByCityKey(data.citykey);
            if (lodash.isEmpty(districtArr)) {
            } else {
                kaayou.emit('lobby', 'ui::AreaDistrict::Show', { districts: districtArr, adcode: this.adcodeServer });
            }
        }

        //  @BindEvent("lobby", "ui::city::refresh")
        onCityRefresh(data: { name: string, code: string }) {
            this.Hide();
        }

        onProvinceClick(data) {
            let pb = ccui.helper.seekWidgetByName<ccui.ScrollView>(<ccui.ScrollView>this.node, "ProvinceBlock");
            let map = ccui.helper.seekWidgetByName<ccui.ScrollView>(<ccui.ScrollView>this.node, "MapBlock");
            for (let x in pb.children) {
                let bg = pb.children[x].getChildByName("Bg");
                if (pb.children[x].getName() == data) {
                    (<ccui.CheckBox>bg).setSelected(true);
                    bg.getChildByName("CheckName").setVisible(true);
                    bg.getChildByName("UncheckName").setVisible(false);
                } else {
                    (<ccui.CheckBox>bg).setSelected(false);
                    bg.getChildByName("CheckName").setVisible(false);
                    bg.getChildByName("UncheckName").setVisible(true);
                }
            }
            for (let x in map.children) {
                if (map.children[x].getName() == data) {
                    map.children[x].setVisible(true);
                } else {
                    map.children[x].setVisible(false);
                }
            }
        }

        getCityAdcode(adcode) {
            //把县级adcode转为城市级adcode
            let cityCode = adcode;
            if (adcode.substr(2, 2) != "90") {
                cityCode = adcode.substr(0, 4) + "00";
            }
            return cityCode;
        }

        Hide() {
            kaayou.emit('lobby', 'ui::AreaDistrict::Hide');
            this.setVisible(false);
        }
        _areaImgRadios: Array<AreaImgRadio> = null;
        initUI() {
            let self = this;
            this.initWithccs(lobby.res.AreaSelectionPanel_json, true);
            this.isTouchMaskHide = false;
            self._areaImgRadios = [];
            this.spCloudLeft = ccui.helper.seekWidgetByName<ccui.ImageView>(<ccui.Widget>this.node, "LeftCloud");
            this.spCloudRight = ccui.helper.seekWidgetByName<ccui.ImageView>(<ccui.Widget>this.node, "RightCloud");

            kaayou.getController('lobby').on('ui::city::refresh', function (e: kaayou.Event) {
                self.Hide();
            }, this, 10);

            this.topbarMgr = new TopBarMgr(ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "top_bar"));
            this.topbarMgr.setTitle("");
            this.topbarMgr.setOnCloseClick(function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                if (self.adcodeServer == "") {
                    kaayou.emit("common", 'ui::Toast::Show', { msg: "您没有选择任何城市，系统默认将您的地区设为武汉市" });
                    self.selectedCityCode = "420100";
                    //self.selectedCityName="武汉市";
                    kaayou.emit("lobby", "mod::User::areaenter", { code: self.selectedCityCode });
                } else self.Hide();
            }.bind(this));

            let provinceBlock = ccui.helper.seekWidgetByName<ccui.Layout>(<ccui.Layout>this.node, "ProvinceBlock");
            let xPb = provinceBlock.getPositionX();
            xPb += (cc.winSize.width - cc.winSizeCustom.width) * 0.5;
            provinceBlock.setPositionX(xPb);

            this.btnAnHui = ccui.helper.seekWidgetByName<ccui.Layout>(provinceBlock, "AnHui");
            this.btnAnHui.on(kaayou.TouchEvent.TouchEnd, function (e) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit('lobby', 'ui::Area::SelectProvince', e.target.name);
            }, this);
            this.btnHeBei = ccui.helper.seekWidgetByName<ccui.Layout>(provinceBlock, "HeBei");
            this.btnHeBei.on(kaayou.TouchEvent.TouchEnd, function (e) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit('lobby', 'ui::Area::SelectProvince', e.target.name);
            }, this);
            this.btnHeNan = ccui.helper.seekWidgetByName<ccui.Layout>(provinceBlock, "HeNan");
            this.btnHeNan.on(kaayou.TouchEvent.TouchEnd, function (e) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit('lobby', 'ui::Area::SelectProvince', e.target.name);
            }, this);
            this.btnHuBei = ccui.helper.seekWidgetByName<ccui.Layout>(provinceBlock, "HuBei");
            this.btnHuBei.on(kaayou.TouchEvent.TouchEnd, function (e) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                kaayou.emit('lobby', 'ui::Area::SelectProvince', e.target.name);
            }, this);

            let mapBlock = ccui.helper.seekWidgetByName<ccui.Layout>(<ccui.Widget>this.node, "MapBlock");
            for (let map in mapBlock.children) {
                let CityLayer = ccui.helper.seekWidgetByName<ccui.Layout>(<ccui.Widget>mapBlock.children[map], "CityLayer");
                let children = lodash.clone(CityLayer.getChildren());

                for (var x in children) {
                    if (children[x].visible) {
                        let R = new AreaImgRadio();
                        R.initWithNodeNoClone(children[x])
                        CityLayer.addChild(R);
                        self._areaImgRadios.push(R);
                    }
                }
            }

            this.noGamePanel = ccui.helper.seekWidgetByName<ccui.Layout>(<ccui.Widget>this.node, "NoGamePanel");
            let btnCloseNoGame = ccui.helper.seekWidgetByName<ccui.Button>(this.noGamePanel, "NoGameCloseButton");
            btnCloseNoGame.on(kaayou.TouchEvent.TouchEnd, function (e) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.noGamePanel.visible = false;
            }, this);

            let btnCall = ccui.helper.seekWidgetByName<ccui.Button>(this.noGamePanel, "NoGameCallButton");
            btnCall.on(kaayou.TouchEvent.TouchEnd, function (e) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                let configData = common.mod.Config.GetAppConfig();
                kaayou.PlatformMgr.getInstance().sys.OpenCallPhone(configData.kftel);
            }, this);

            let btnWecht = ccui.helper.seekWidgetByName<ccui.Button>(this.noGamePanel, "NoGameWechatButton");
            btnWecht.on(kaayou.TouchEvent.TouchEnd, function (e) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                let configData = common.mod.Config.GetAppConfig();
                let {kf} = configData.kfinfo;
                let isSuccess = kaayou.PlatformMgr.getInstance().sys.copyStringToPasteBoard(kf[0].wx);
                if (isSuccess) {
                    kaayou.emit('common', "ui::Toast::Show", { msg: "您的客服微信已拷贝，请打开微信联系客服" })
                }
            }, this);

            let al = new AreaDistrictLayer();
            al.initWithNodeNoClone(ccui.helper.seekWidgetByName<ccui.Layout>(<ccui.Widget>this.node, "DistrictPanel"));
            al.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
            this.node.addChild(al);

            kaayou.getController('lobby').on('ui::Areas::Click', function (e: kaayou.Event) {
                self.onAreaClick(e.data);
            }, this, 10);

            kaayou.getController('lobby').on('ui::Area::SelectProvince', function (e: kaayou.Event) {
                self.onProvinceClick(e.data);
            }, this, 10);

            kaayou.getController('lobby').on('ui::Area::ShowNoGame', function (e: kaayou.Event) {
                self.noGamePanel.visible = true;
            }, this, 10);

            self.Hide();
        }

        Show() {
            let self = this;
            cc.spriteFrameCache.addSpriteFrames(lobby.res.AreaSelectionName_plist);
            let sUserInfo = kaayou.DataSet.get('user::info');
            if (!!sUserInfo) {
                let userInfo = JSON.parse(sUserInfo);
                this.adcodeServer = userInfo.area;
                this.selectedCityCode = this.adcodeServer;
                this.selectedCityKey = common.mod.ChineseMap.getInstance().getCityId(this.adcodeServer);
                console.log("进入地图面板时的adcode:" + this.adcodeServer + " " + this.selectedCityKey);
            }
            //lw190618显示省地图
            let cityId = common.mod.ChineseMap.getInstance().getCityId(this.adcodeServer);
            let province = common.mod.ChineseMap.getInstance().getProvince(cityId);
            if (province == "") province = "HuBei";
            kaayou.emit('lobby', 'ui::Area::SelectProvince', province);

            //显示玩家选择的地区
            let num = 0;
            for (var x in self._areaImgRadios) {
                self._areaImgRadios[x].setLock(true);
                self._areaImgRadios[x].doInitAndShow(Number(x), function () {
                    if (++num >= self._areaImgRadios.length) {
                        self.doEnter();
                    }
                })
            }
            self.spCloudLeft.setPositionX(cc.winSize.width / 2);
            self.spCloudRight.setPositionX(cc.winSize.width / 2);
            this.setVisible(true);

            let action1 = cc.moveBy(0.5, -1500, 0);
            let action2 = cc.moveBy(0.5, 1500, 0);
            self.spCloudLeft.runAction(action1);
            self.spCloudRight.runAction(action2);
        }
        closeTimeOut: boolean = false;
        doEnter() {
            let self = this;
            //如果玩家没有选择过地区，则从定位获取
            if (this.adcodeServer == "") {   //玩家自身没有选过地区
                self.selectedCityCode = "420100";
                kaayou.emit("lobby", "mod::User::areaenter", { code: self.selectedCityCode });
                // let areaInfo = kaayou.DataSet.get("user::Map");
                // if (lodash.isEmpty(areaInfo)) {
                //     kaayou.emit('common', 'ui::Toast::Show', { msg: "定位中..." });
                //     kaayou.getController("").offBytarger("MapInfo", self);
                //     kaayou.PlatformMgr.getInstance().map.GetMapInfo();
                //     self.closeTimeOut = false;
                //     setTimeout(() => {
                //         if (self.closeTimeOut) {
                //             return;
                //         }
                //         kaayou.getController("").offBytarger("MapInfo", self);
                //         kaayou.emit('common', 'ui::Toast::Show', { msg: "获取定位失败...请选择区域" });
                //     }, 2 * 1000);
                //     kaayou.getController("").onece("MapInfo", function (data) {
                //         kaayou.emit('common', 'ui::Toast::Show', { msg: "获取定位成功..." });
                //         self.closeTimeOut = true;
                //         let areaInfo = kaayou.DataSet.get("user::Map");
                //         let code = JSON.parse(areaInfo).adcode;
                //         //lw190705将具体adcode转为城市adcode,如金融港420115，转为武汉420100
                //         code = common.mod.ChineseMap.getInstance().getCityAdcode(code);
                //         self.selectedCityKey = common.mod.ChineseMap.getInstance().getCityId(code);
                //         kaayou.emit("AreaImgRadio", "Value::Change", { value: this.selectedCityKey });
                //     }, self);
                // } else {
                //     if (cc.sys.isNative) {  //原生  已经定位成功
                //         let areaInfo = kaayou.DataSet.get("user::Map");
                //         let code = JSON.parse(areaInfo).adcode;
                //         console.log("第一次进入游戏adcode " + code);
                //         self.adcodeServer=common.mod.ChineseMap.getInstance().getCityAdcode(code);
                //         console.log("第一次进入游戏adcodeServer " + self.adcodeServer);
                //         self.selectedCityKey = common.mod.ChineseMap.getInstance().getCityId(self.adcodeServer);
                //         console.log("第一次进入游戏selectedCityKey " + self.selectedCityKey);
                //         kaayou.emit("AreaImgRadio", "Value::Change", { value: this.selectedCityKey });
                //     } else {  //网页没有位置信息 直接赋值
                //         //self.adcode = "420100";
                //         self.selectedCityKey = common.mod.ChineseMap.getInstance().getCityId(self.adcodeServer);
                //     }
                // }
            }

            for (var x in self._areaImgRadios) {
                self._areaImgRadios[x].setLock(false);
            }

            kaayou.emit("AreaImgRadio", "Value::Change", { value: this.selectedCityKey });
        }
    }
}