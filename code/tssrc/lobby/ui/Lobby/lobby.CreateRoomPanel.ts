

namespace lobby {
    const { doBindEvent, BindEvent } = kaayou._decorator;

    class CreateRoomPanelMenuCell extends kaayou.Block {
        ivFree: ccui.ImageView = null;
        radio: ccui.CheckBox = null;
        label: ccui.Text = null;
        value: number = 0;
        initWithNode(node: ccui.Widget) {
            super.initWithNode(node);
            this.initUI();
        }
        initUI() {
            this.ivFree = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "ivFree");
            this.radio = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "radio");
            this.label = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label");
            this.node.on(kaayou.TouchEvent.TouchEnd, this.onClick, this);
            kaayou.getController("CreateRoomRadio").on("Value::Change", this.onChange, this)
        }

        onClick() {
            kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
            kaayou.emit("CreateRoomRadio", "Value::Change", { value: this.value, popup: true });
        }
        setInfo(name: string, value: number, bFree: boolean) {
            this.label = Patch.ChangeTextColor(this.label, name, cc.color("#FFFFFF"), "SimHei", 32);
            this.value = value;
            this.ivFree.setVisible(bFree);
        }

        onChange(e: kaayou.CustomEvent) {
            let { value, popup } = e.data;
            if (value) {
                if (this.value == value) {
                    this.radio.setSelected(true);
                    this.label = Patch.ChangeTextColor(this.label, this.label.getString(), cc.color("#975638"), "SimHei", 32);
                    if (popup) {

                    }
                } else {
                    this.radio.setSelected(false);
                    this.label = Patch.ChangeTextColor(this.label, this.label.getString(), cc.color("#3967B2"), "SimHei", 32);
                }
            }
        }

    }

    interface ICreateRoomParam {
        kindId: number,
        lastRule: any,
        name: string,
        package_key: string,
        rule: string,
        ruleVersion: number,
        timelimit_free: boolean
    }

    export class CreateRoomPanelMgr {
        static __INS__: CreateRoomPanelMgr = null;
        static getInstance(_zOrder: number = 0) {
            if (CreateRoomPanelMgr.__INS__ == null) {
                CreateRoomPanelMgr.__INS__ = new CreateRoomPanelMgr();
                CreateRoomPanelMgr.__INS__.init();
                CreateRoomPanelMgr.__INS__._zOrder = _zOrder;
            }
            return CreateRoomPanelMgr.__INS__;
        }
        __selfPanel: CreateRoomPanel = null;
        public _gold = 0;
        public _zOrder = 0;
        onUpdateUserInfo(data: Data_Uerinfo) {
            this._gold = data.gold;
        }
        init() {
            let self = this;
            this.__selfPanel = null;

            // kaayou.getController('lobby').on("ui::GamePackages::update", function (e: kaayou.Event) {

            //     self.getPanel(false).onGamePackagesUpdate(e.data);
            // }, this);

            kaayou.getController('lobby').on("ui::CreateRoom::Show", function (e: kaayou.Event) {
                self.getPanel(true).Show(updateLastGameRule(e.data));
            }, this);

            kaayou.getController('lobby').on("ui::CreateRoom::Hide", function (e: kaayou.Event) {
                self.getPanel(false) && self.getPanel(false).Hide();
            }, this);

            function updateLastGameRule(data: {
                list: Array<ICreateRoomParam>,
                call: (data: { kindid: number, configData: any, ruleVersion: number }) => void,
                frozen: boolean,
                issave: boolean,
                isnoclose: boolean,
                fristkind: number
            }) {

                let source: any = cc.sys.localStorage.getItem("lobby::CreateRoom::GameRuleCache");
                let removeList: Array<Number> = []

                if (!source)
                    return data;

                source = JSON.parse(source);


                source.forEach(({ kindId, rules }) => {
                    data.list.filter(v => v.kindId === kindId).forEach(v => {

                        let defD = parseData(v);
                        defD.restrict = "string"

                        if (diff(defD, rules) === false) {
                            removeList.push(kindId);
                        } else
                            v.lastRule = rules;


                    })
                });

                if (removeList.length > 0) {
                    let i = 0;
                    let order
                    while (removeList.length && (i < removeList.length)) {
                        order = getOrder(removeList[i], source)
                        source.splice(order, 1)
                        i++;
                        if (getOrder(removeList[i], source) !== -1)
                            i--;
                    }
                }


                return data;

                function getOrder(kid, list) {
                    for (let i = 0; i < list.length; i++)
                        if (kid === list[i].kindId)
                            return i;
                    return -1;
                }

                function parseData(data: ICreateRoomParam) {
                    let source = JSON.parse(data.rule)
                    let controls = source.list.filter((v) => v.iname !== void 0 && v.value !== void 0);
                    return controls.reduce((o, v) => {
                        if (v.valueType === "number" || typeof v.value === "number") {
                            o[v.iname] = 0
                        } else if (v.valueType === "string" || typeof v.value === "string") {
                            o[v.iname] = "string"
                        }
                        return o
                    }, {})
                }

                function diff(a, b) {

                    //对比key
                    let key1 = Object.keys(a);
                    let key2 = Object.keys(b);

                    if (key1.length !== key2.length)
                        return false;

                    let every = key1.every(v => {
                        return key2.indexOf(v) !== -1;
                    });

                    if (every === false)
                        return false;

                    //对比type
                    every = key1.every(v => {
                        return typeof a[v] === typeof b[v];
                    })

                    return every;
                }

            }

            return true;
        }

        getPanel(create: boolean = false) {
            if (create && this.__selfPanel == null) {
                this.__selfPanel = new CreateRoomPanel();
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.__selfPanel, this._zOrder)
            }
            return this.__selfPanel;
        }

    }


    export class CreateRoomPanel extends kaayou.ModelLayer {
        menuPanel: ccui.ScrollView = null;
        constructor() {
            super();
            this.initWithccs(lobby.res.CreateRoomPanel_json);
            this.initUI();
        }
        btn_close: ccui.Button = null;
        btn_create: ccui.Button = null;
        btn_download: ccui.Button = null;
        btn_save: ccui.Button = null;
        cbIP: ccui.CheckBox = null;

        label_package_version: ccui.Text = null;
        lbFloor: ccui.Text = null;

        menu_cell_model: ccui.CheckBox = null;
        rDom_UILayout: common.RDom.UILayout = null;
        ip_checkbox: ccui.Layout = null;

        tip_CheckBox: ccui.Button = null;
        tipImage_CheckBox: ccui.ImageView = null;
        tip_Layout: ccui.ImageView = null;

        game_tip: ccui.Layout = null;
        initUI() {

            this.isTouchMaskHide = false;
            let self = this;


            this.lbFloor = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "Floor");
            this.btn_close = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_close");
            this.btn_close.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                self.Hide();
            }, this);
            this.btn_create = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_create");
            this.btn_download = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_download");
            this.btn_save = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_save");
            this.tipImage_CheckBox = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "checkIp_Tip_image");
            this.tip_CheckBox = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "checkIp_Tip");
            this.label_package_version = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label_package_version");
            this.menu_cell_model = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "menu_cell_model");
            this.menuPanel = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "menuPanel");
            this.menuPanel.setPadding({ spacingY: 10 });
            this.menuPanel.setChildrenLayoutDirection(ccui.Layout.LayoutDirection.Vertical);
            //this.menuPanel.setHorizontal(ccui.Layout.LayoutHorizontal.RIGHT);
            this.menuPanel.setScrollBarEnabled(false);
            this.menuPanel.doChildrenLayout();
            this.tip_Layout = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "checkIp_TipPanel");
            let scroll_rule: ccui.ScrollView = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "scroll_rule");

            this.rDom_UILayout = new common.RDom.UILayout();
            this.rDom_UILayout.setIsScorllView(true);

            this.rDom_UILayout.initWithNodeNoClone(scroll_rule);

            this.game_tip = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "game_tip");
            this.ip_checkbox = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "ip_checkbox");
            this.cbIP = ccui.helper.seekWidgetByName<ccui.CheckBox>(this.ip_checkbox, "checkbox");
            //默认创建面板 gps 为不勾选  vsen 2019/7/31
            self.cbIP.setSelected(false);
            this.btn_save.setVisible(false);
            this.btn_download.setVisible(false);
            this.btn_create.setVisible(false);
            this.label_package_version.setString("");
            this.tipImage_CheckBox.setVisible(false);
            this.tip_Layout.setLocalZOrder(150);

            this.bindUIEvents();
            this.Hide();
        }

        getModuleName() {
            return this._moduleName = 'lobby';
        }
        bindUIEvents() {
            let self = this;

            this.game_tip.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                this.showGameRule();
            }, this)

            this.ip_checkbox.on(kaayou.TouchEvent.TouchEnd, function (e: kaayou.TouchEvent) {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                let target: ccui.Layout = e.target;
                let check: ccui.CheckBox = ccui.helper.seekWidgetByName(target, "checkbox");
                check.setSelected(!check.isSelected());
            }, this)
            this.btn_download.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                if (cc.sys.isNative && self._package_key) {
                    common.mod.Update.ExistsSubGame(self._package_key, "", function () {
                        kaayou.emit('common', "ui::Loading::Show", { msg: "下载完成", noAni: true });
                        self.doCheckSubgame(self._package_key);
                        kaayou.emit('common', "ui::Loading::Hide");
                        //lw200919下载完成直接进房
                        self.onButtonCreateClicked();
                    });
                }
            }, this);


            this.btn_save.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                if (self._kindID > 0 && self._ruleVersion >= 0) {
                    let configData = self.rDom_UILayout.submit();
                    configData['restrict'] = ccui.helper.seekWidgetByName<ccui.CheckBox>(self.ip_checkbox, "checkbox").isSelected() ? "true" : "false";
                    let edata: { kindid: number, configData: any, ruleVersion: number } = {
                        kindid: self._kindID,
                        configData: configData,
                        ruleVersion: self._ruleVersion
                    }
                    if (self.__saveCallFunc && lodash.isFunction(self.__saveCallFunc)) {
                        self.__saveCallFunc(edata);
                    }
                }
            }, this);

            this.btn_create.on(kaayou.TouchEvent.TouchEnd, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                self.onButtonCreateClicked();
            }, this);

            this.tip_CheckBox.on(kaayou.TouchEvent.TouchStart, function () {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                self.tipImage_CheckBox.visible = true;
            }, this);
            this.tip_CheckBox.on(kaayou.TouchEvent.TouchEnd, function () {
                self.tipImage_CheckBox.visible = false;
            }, this);
            this.tip_CheckBox.on(kaayou.TouchEvent.TouchCance, function () {
                self.tipImage_CheckBox.visible = false;
            }, this);
        }

        onButtonCreateClicked() {
            let self = this;
            if (self._kindID > 0 && self._ruleVersion >= 0) {

                let configData = self.rDom_UILayout.submit();
                configData['restrict'] = ccui.helper.seekWidgetByName<ccui.CheckBox>(self.ip_checkbox, "checkbox").isSelected() ? "true" : "false";
                let edata: { kindid: number, configData: any, ruleVersion: number } = {
                    kindid: self._kindID,
                    configData: configData,
                    ruleVersion: self._ruleVersion
                }


                if (kaayou.UIManager.getInstance().getCurRuningSceneName() === "LOBBY") {
                    let source: any = cc.sys.localStorage.getItem("lobby::CreateRoom::GameRuleCache") || "[]";

                    source = JSON.parse(source);
                    if (source.some(v => v.kindId === self._kindID))
                        source.filter(v => v.kindId === self._kindID)
                            .forEach(v => {
                                v.rules = configData;
                            });
                    else
                        source.push({ kindId: self._kindID, rules: configData })

                    cc.sys.localStorage.setItem("lobby::CreateRoom::GameRuleCache", JSON.stringify(source));
                }


                if (self.__createCallFunc && lodash.isFunction(self.__createCallFunc)) {
                    self.__createCallFunc(edata);
                }
            }
        }

        __createCallFunc: (data: { kindid: number, configData: any, ruleVersion: number }) => void = null;
        __saveCallFunc: (data: { kindid: number, configData: any, ruleVersion: number }) => void = null;
        Show(data: {
            list: Array<ICreateRoomParam>,
            call: (data: { kindid: number, configData: any, ruleVersion: number }) => void,
            frozen: boolean,
            issave: boolean,
            isnoclose: boolean,
            fristkind: number
        }) {
            //默认创建面板 gps 为不勾选  vsen 2019/7/31
            this.cbIP.setSelected(false);
            this._fristkind = data.fristkind || 0;
            this._kindID = -1;
            this._package_key = "";
            this._frozen = !!data.frozen;
            this._issave = !!data.issave;
            if (!this._issave) {
                this.__createCallFunc = data.call || null;
            } else {
                this.__saveCallFunc = data.call || null;
            }
            kaayou.uninstallController("CreateRoomRadio");
            this.btn_close.setVisible(!data.isnoclose);
            this.menuPanel.removeAllChildren();
            this.rDom_UILayout.node.removeAllChildren();
            this.onUpdateGameListAndRule(data.list);
            let appConfig = common.mod.Config.AppConfig
            if (cc.sys.isNative) {
                if (appConfig && appConfig.gps.enabled) {  //当需要去调用位置的时候
                    this.ip_checkbox.setVisible(true);
                    this.tip_Layout.setVisible(true)
                } else {
                    this.ip_checkbox.setVisible(false);
                    this.tip_Layout.setVisible(false)
                }
            } else {
                this.ip_checkbox.setVisible(true);
                this.tip_Layout.setVisible(true)
            }

            if (this._frozen) {
                this.ip_checkbox.setEnabled(false);
            } else {
                this.ip_checkbox.setEnabled(true);
            }



            this.setVisible(true);

        }

        async showGameRule() {
            //{"head":"areagameexplain","data":"{\"kind_id\":597}","errcode": 100,"msgsign": {"time":1536802885373,"encode":0}}
            let temp = {
                "head": "areagameexplain",
                "data": JSON.stringify({ kind_id: this._kindID }),
                "msgsign": {
                    "time": new Date().getTime(),
                    "encode": 0
                }
            }
            let res = await kaayou.Http.POST("http://" + common.mod.Config.GetAppConfig().apiUrl + "/api", { msgdata: JSON.stringify(temp) })
            let msg: kaayou.Ka_MSG_RES = kaayou.Http.parseResult(res);
            if (!msg) { return; }

            kaayou.emit('common', 'ui::TextView::Show', { string: msg.data.explain })
        }

        private _data: Array<ICreateRoomParam> = null;
        onUpdateGameListAndRule(data: Array<ICreateRoomParam>) {
            this._data = null;
            this._data = lodash.clone(data);
            this.menuPanel.removeAllChildren();
            if (data.length < 1) return;
            for (var x in this._data) {
                let r = new CreateRoomPanelMenuCell();
                r.initWithNode(this.menu_cell_model);
                r.setPosition(0, 0);
                r.setInfo(this._data[x].name, this._data[x].kindId, this._data[x].timelimit_free);
                this.menuPanel.addChild(r);
            }

            this.menuPanel.doChildrenLayout();
            kaayou.getController("CreateRoomRadio").off("Value::Change", this.onChange, this);
            kaayou.getController("CreateRoomRadio").on("Value::Change", this.onChange, this)
            if (!this._fristkind) {
                this._fristkind = this._data[0].kindId;
            }
            if (this._fristkind) {
                if (lodash.findIndex(this._data, { kindId: this._fristkind }) < 0) {
                    this._fristkind = this._data[0].kindId;
                }
            }
            kaayou.emit("CreateRoomRadio", "Value::Change", { value: this._fristkind, popup: true });



        }
        _fristkind = 0;
        _kindID = -1;
        _ruleVersion = -1;
        _package_key = "";
        _frozen: boolean = false;
        _issave: boolean = false;
        _isdown: boolean = true;
        onChange(e: kaayou.CustomEvent) {
            let { value, popup } = e.data;
            if (value) {
                if (value > 0 && value == this._kindID) { return; }
                for (var x in this._data) {
                    if (this._data[x].kindId == value) {
                        this._ruleVersion = this._data[x].ruleVersion;
                        this._kindID = Number(value);
                        this._package_key = this._data[x].package_key;
                        this.doCheckSubgame(this._package_key);
                        this.rDom_UILayout.setContent(this._data[x].rule, this._data[x].lastRule || {}, this._frozen || false);
                        if (this._data[x] && this._data[x].lastRule) {
                            if (this._data[x].lastRule.restrict == "true") {
                                ccui.helper.seekWidgetByName<ccui.CheckBox>(this.ip_checkbox, "checkbox").setSelected(true);
                            } else {
                                ccui.helper.seekWidgetByName<ccui.CheckBox>(this.ip_checkbox, "checkbox").setSelected(false);
                            }
                        }
                    }
                }
            }
        }
        isDownload() {
            return true;
        }
        doCheckSubgame(package_key: string) {
            console.log("doCheckSubgame", package_key);
            if (cc.sys.isNative && package_key && this.isDownload()) {
                var package_version = kaayou.getSubGameVersion(package_key);
                this.btn_save.setVisible(!this._frozen && this._issave);
                if (package_version == 'nosearch') {
                    this.btn_create.setVisible(false && !this._frozen && !this._issave);
                    this.btn_download.setVisible(true && !this._frozen && !this._issave);
                    this.label_package_version.setString('未下载');
                } else {
                    this.btn_create.setVisible(true && !this._frozen && !this._issave);
                    this.btn_download.setVisible(false && !this._frozen && !this._issave);
                    this.label_package_version.setString(package_version);
                }
            } else {
                this.btn_save.setVisible(!this._frozen && this._issave);
                this.btn_create.setVisible(true && !this._frozen && !this._issave);
                this.btn_download.setVisible(false && !this._frozen && !this._issave);
                this.label_package_version.setString('');
            }
        }

        // @BindEvent("lobby", 'ui::CreateRoom::Hide')
        Hide() {
            this._kindID = -1;
            this._issave = false;
            this._frozen = false;
            this._package_key = "";
            this.__createCallFunc = null;
            this.__saveCallFunc = null;
            // this._gameConfig = null;
            kaayou.uninstallController("CreateRoomRadio");
            this.setVisible(false);
        }

    }


}