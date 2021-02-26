namespace common {

    export namespace RDom {

        export class UILayoutCache {
            static __INS__: UILayoutCache = null;
            static getInstance = function () {
                if (null == UILayoutCache.__INS__) {
                    UILayoutCache.__INS__ = new UILayoutCache();
                }
                return UILayoutCache.__INS__;
            };
            static CHECKBOX = "checkbox";
            static NUMBOX = "numbox";
            static RADIOBOX = "radiobox";
            static LABELBOX = "labelbox";
            static TIPBOX = "tipbox";
            static TAGBOX = "tagbox";
            private _richDombL = null;
            private _radioModel = null;
            private _checkModel = null;
            private _numModel = null;
            private _labelModel = null;
            private _tipModel = null;
            private _tagModel = null;
            constructor() {
                this._richDombL = ccs.load(common.res.RichDom_json, "res/").node;
                if (!this._richDombL) {
                    console.error("_richDombL no");
                    return;
                }
                this._richDombL.retain && this._richDombL.retain();
                this._radioModel = ccui.helper.seekWidgetByName(this._richDombL, "dom_radio");
                this._checkModel = ccui.helper.seekWidgetByName(this._richDombL, "dom_checkbox");
                this._numModel = ccui.helper.seekWidgetByName(this._richDombL, "dom_number");
                this._labelModel = ccui.helper.seekWidgetByName(this._richDombL, "dom_labelbox");
                this._tipModel = ccui.helper.seekWidgetByName(this._richDombL, "dom_tip");
                this._tagModel = ccui.helper.seekWidgetByName(this._richDombL, "dom_tagbox");
            }

            getModel(name) {
                if (name == UILayoutCache.RADIOBOX) {
                    return this._radioModel;
                }
                else if (name == UILayoutCache.CHECKBOX) {
                    return this._checkModel;
                }
                else if (name == UILayoutCache.NUMBOX) {
                    return this._numModel;
                }
                else if (name == UILayoutCache.LABELBOX) {
                    return this._labelModel;
                } else if (name == UILayoutCache.TIPBOX) {
                    return this._tipModel;
                }
                else if (name == UILayoutCache.TAGBOX) {
                    return this._tagModel;
                }
                else {
                    return null;
                }
            }
            _values: { [key: string]: { type: string, value: any } } = null;

            clearValues() {
                this._values = null;
            }

            submit() {
                let v = {};
                for (var x in this._values) {
                    v[x] = this._values[x].value;
                }
                return v;
            }


        }

        export class UILayout extends kaayou.Block {
            initWithNull() {
                this.node = this;
                UILayoutCache.getInstance();
            }
            _isScrollView = false;

            initWithNodeNoClone(node: ccui.Widget) {
                let paret = node.getParent();
                super.initWithNodeNoClone(node);
                if (paret) {
                    paret.addChild(this, 100);
                }
                this._isScrollView = !!(<ccui.ScrollView>this.node).getInnerContainerSize;
                if (this._isScorllView) {
                    (<ccui.ScrollView>this.node).setScrollBarEnabled(false);
                }
                UILayoutCache.getInstance();
            }

            _isScorllView = false;
            setIsScorllView(b) {
                this._isScorllView = b;
            }

            submit() {
                return lodash.extend({}, this.submitValues);
            }

            _maXwidgetZindex = 0;
            createWidget(attr: common.RDom.IRDomAttrs) {
                let self = this;
                let nodeType = attr.nodeType;
                let zindex = lodash.isNumber(attr.zindex) ? Math.ceil(attr.zindex) : this._maXwidgetZindex;
                let widget = null;
                if ("radiobox" == nodeType) {
                    widget = self.createRadioBox(attr);
                } else if ("checkbox" == nodeType) {
                    widget = self.createCheckBox(attr);
                } else if ("tagbox" == nodeType) {
                    widget = self.createTagBox(attr);
                } else if ("numbox" == nodeType) {
                    widget = self.createNumBox(attr);
                } else if ("tipbox" == nodeType) {
                    widget = self.createTipBox(attr);
                } else if ("labelbox" == nodeType) {
                    widget = self.createLableBox(attr);
                } else {
                    return;
                }
                self.node.addChild(widget, zindex);
                this._maXwidgetZindex = Math.max(0, zindex + 30, this._maXwidgetZindex + 30);
            }

            createRadioBox(attr: { [key: string]: any }) {
                var cnode = new RDom.UIRadioBox();
                cnode.initWithNode(UILayoutCache.getInstance().getModel(UILayoutCache.RADIOBOX), attr.uuid);
                cnode.setAttrAndStyle(attr);

                return cnode;
            }

            createCheckBox(attr: { [key: string]: any }) {
                var cnode = new RDom.UICheckBox();
                cnode.initWithNode(UILayoutCache.getInstance().getModel(UILayoutCache.CHECKBOX), attr.uuid);
                cnode.setAttrAndStyle(attr);
                return cnode;
            }

            createTipBox(attr: { [key: string]: any }) {
                var cnode = new RDom.UITipBox();
                cnode.initWithNode(UILayoutCache.getInstance().getModel(UILayoutCache.TIPBOX), attr.uuid);
                cnode.setAttrAndStyle(attr);
                return cnode;
            }

            createTagBox(attr: { [key: string]: any }) {
                var cnode = new RDom.UITagBox();
                cnode.initWithNode(UILayoutCache.getInstance().getModel(UILayoutCache.TAGBOX), attr.uuid);
                cnode.setAttrAndStyle(attr);
                return cnode;
            }


            createLableBox(attr: { [key: string]: any }) {
                var cnode = new RDom.UILabelBox();
                cnode.initWithNode(UILayoutCache.getInstance().getModel(UILayoutCache.LABELBOX), attr.uuid);
                cnode.setAttrAndStyle(attr);
                return cnode;
            }


            AttrGriddle(attr, istoh5 = true) {

                if (lodash.isNumber(attr.y)) {
                    let height = this.getNodeContentSize().height;
                    if (istoh5)
                        attr.y = Number((height - attr.y).toFixed(2));
                    else
                        attr.y = Number((height - attr.y).toFixed(2));
                }
                return attr;
            }

            createNumBox(attr: { [key: string]: any }) {

                var cnode = new RDom.UINumBox();
                cnode.initWithNode(UILayoutCache.getInstance().getModel(UILayoutCache.NUMBOX), attr.uuid);
                cnode.setAttrAndStyle(attr);
                return cnode;
            };
            getNodeContentSize(): cc.Size {
                let size = this.node.getContentSize();
                if (this._isScrollView) {
                    let innerSize = (<ccui.ScrollView>this.node).getInnerContainerSize();
                    return cc.size(Math.max(size.width, innerSize.width), Math.max(size.height, innerSize.height));
                } else {
                    return size;
                }
            }

            setNodeContentSize(size: cc.Size) {
                let csize = this.node.getContentSize();
                let msize = cc.size(Math.max(size.width, csize.width), Math.max(size.height, csize.height))
                if (this._isScrollView) {
                    (<ccui.ScrollView>this.node).setInnerContainerSize(msize);
                } else {
                    this.node.setContentSize(msize);
                }
            }
            submitValues: { [key: string]: number | string } = null;
            submitInputEvents: {
                [key: string]: {
                    nodeType: string,
                    valueType: string
                }
            } = null;
            setContent(content: any, lastValus: { [key: string]: string | number | boolean } = {}, frozen: boolean = false) {

                let __content: {
                    size: cc.Size,
                    list: Array<common.RDom.IRDomAttrs>,
                    evlist: Array<common.RDom.IRDomGangedEvent>,
                    defValues: { [key: string]: string | number | boolean }
                };
                this.submitValues = null;
                if (lodash.isString(content)) {
                    __content = JSON.parse(content);
                } else if (lodash.isObject(content)) {
                    __content = lodash.clone(content);
                }
                kaayou.uninstallController("domView");
                this.node.removeAllChildren();
                if (!__content) { return; }
                this.setNodeContentSize(__content.size || cc.size(0, 0));
                for (var x in __content.list) {
                    let attr = __content.list[x];
                    if (attr.nodeType) {
                        this.createWidget(this.AttrGriddle(attr));
                        if (attr.iname) {

                        }
                    }
                }



                //调度一次事件
                let defValues = __content.defValues || {};
                defValues = lodash.extend(defValues, lastValus);

                this.submitValues = lodash.extend({}, defValues);

                //绑定事件
                let inputEvents = {};
                for (var x in __content.list) {
                    let attr = __content.list[x];
                    if (attr.nodeType && attr.iname) {
                        if ("tagbox" == attr.nodeType || "labelbox" == attr.nodeType) {
                            continue;
                        }
                        inputEvents[attr.iname] = {
                            nodeType: attr.nodeType,
                            valueType: (function (__nodeType: string, __valueType: string) {
                                if (__nodeType == "numbox") {
                                    return "number";
                                }
                                return __valueType || "string"
                            })(attr.nodeType, attr.valueType)
                        }
                    }
                }
                for (var x in inputEvents) {
                    kaayou.getController("domView").on("Value::Change::" + x, this.onValueChange, this);
                }
                this.submitInputEvents = inputEvents;
                //lw200624,先清一下，否则从通城个子切到跑得快房卡就错了
                this.__evList=[];
                //设置值
                for (var x in defValues) {
                    this.doValueChangeEvent(x, defValues[x], "", 1);
                }

                this.__evList = lodash.clone(__content.evlist || []);

                //设置值
                for (var x in defValues) {
                    this.doValueChangeEvent(x, defValues[x], "", 1);
                }


                do {

                    if (!this.__evList) { break; }
                    if (!lodash.isArray(this.__evList)) { break; }
                    if (lodash.isEmpty(this.__evList)) { break; }

                    for (var x in this.__evList) {
                        if (this.__evList[x].priority == undefined) {
                            this.__evList[x].priority = 10;
                        }
                        if (this.__evList[x].destattr == undefined || this.__evList[x].destattr == "" || this.__evList[x].destattr == null) {
                            this.__evList[x].destattr = {}
                        } else {
                            try {
                                let des = JSON.parse(<string>this.__evList[x].destattr)
                                if (lodash.isObject(des)) {
                                    this.__evList[x].destattr = des;
                                } else if (lodash.isArray(des)) {
                                    this.__evList[x].destattr = des;
                                } else {
                                    this.__evList[x].destattr = {}
                                }
                            } catch (e) {
                                this.__evList[x].destattr = {}
                            }
                        }
                        this.__evList[x].destattr = this.AttrGriddle(this.__evList[x].destattr)
                    }
                    this.__evList.sort(function (a, b) {
                        return a.priority - b.priority;
                    });


                    //二次触发事件
                    let filter = {};
                    for (var x in defValues) {
                        for (var y in this.__evList) {
                            if (this.__evList[y].srck == x) {
                                if (filter[this.__evList[y].destk] == x) { break; }
                                filter[x] = this.__evList[y].destk;
                                this.doValueChangeEvent(x, defValues[x], "", 1);
                                break;
                            }
                        }
                    }

                } while (false);


                if (frozen) {
                    setTimeout(() => {
                        kaayou.uninstallController("domView");
                    }, 1);
                }
                //   UILayoutCache.getInstance().doDefaultRadioValue();
                // UILayoutCache.getInstance().doSetInputValues(lastValus);
                console.log(__content);
            }

            __evList: Array<common.RDom.IRDomGangedEvent> = null;

            getValueInChange(key, value) {
                if (!this.submitInputEvents[key]) { return value; }
                let valueType = this.submitInputEvents[key].valueType;
                let curValue = this.submitValues[key];

                var doValueType = function (value) {
                    if (valueType == "string") {
                        return value + "";
                    } else if (valueType == "number") {
                        let v = Number(value);
                        return lodash.isNumber(v) ? v : 0;
                    }
                    return "";
                }

                do {
                    if (!lodash.isString(value)) { break; }


                    let head = "";
                    let body = "";
                    //比较字符串头
                    if (value[0] !== '$') { break; }

                    if (value === "$null") {
                        head = value;
                    } else {
                        //分割特殊类型字符串
                        let tarr = value.split(":");
                        if (tarr.length !== 2) { break; }
                        //取头和值
                        head = tarr[0];
                        body = tarr[1];
                    }

                    //判定头部
                    switch (head) {
                        case "$null":
                            return curValue;;
                            break;
                        case "$in": //包含类型 则部改变选择

                            if (body[0] == '[' && body[body.length - 1] == ']') {
                                body = body.substring(1, body.length - 1);
                                let range = body.split("-");
                                if (range.length !== 2) {
                                    break;
                                }
                                let min = Number(range[0]);
                                let max = Number(range[1]);
                                if (!lodash.isNumber(min) || !lodash.isNumber(max)) { break; }
                                let a = Math.min(min, max);
                                max = Math.max(min, max);
                                min = a;
                                for (var i = min; i <= max; i++) {
                                    if (doValueType(curValue) == doValueType(i)) {
                                        //包含在类则返回原来的值
                                        return curValue;;
                                    }
                                }
                                let defv = doValueType(min);
                                return defv;
                            } else {

                                let varr = body.split(",");
                                if (varr.length < 1) { break; }
                                for (var x in varr) {
                                    if (curValue == undefined && varr[x] == undefined) {
                                        return doValueType(value);
                                    }
                                    if (doValueType(curValue) == doValueType(varr[x])) {
                                        //包含在类则返回原来的值
                                        return curValue;;
                                    }
                                }
                                //如果不在包含内则取第一个值为触发
                                let defv = doValueType(varr[0]);
                                return defv;

                            }

                            break;
                    }

                } while (false);
                return doValueType(value);
            }
            onValueChange(e: kaayou.Event) {
                let { name, value, life } = e.data;

                // if (this._values[name].type == 'num') {
                //     this._values[name].value = Number(value);
                // } else {
                //     this._values[name].value = value;
                // }

                if (lodash.isString(value)) {
                    if (value[0] === '$') {

                    } else {
                        this.submitValues[name] = value;
                    }
                } else {
                    this.submitValues[name] = value;
                }

                life--;
                if (life < 0) { return; }
                for (var x in this.__evList) {
                    let domevnet = this.__evList[x];
                    if (domevnet.srck == name) {
                        let conds = [];
                        conds.push({
                            srct: domevnet.srct, // 触发条件
                            srcv: domevnet.srcv, // 触发值
                            value: this.submitValues[name] //当前值
                        })
                        if (domevnet.advsrct != undefined && domevnet.advsrct != null &&
                            domevnet.advsrct != "" && domevnet.advsrct != "null") {
                            let darr = this.parseAdvsrct(domevnet.advsrct)
                            for (var x in darr) {
                                let adv = this.submitValues[darr[x].vkey]
                                if (adv != undefined) {
                                    conds.push({
                                        srct: darr[x].srct, // 触发条件
                                        srcv: darr[x].srcv, // 触发值
                                        value: adv //当前值
                                    })
                                }
                            }
                        }

                        let isNeedSend = true;

                        for (var x in conds) {
                            isNeedSend = isNeedSend && this.checkEventSent(conds[x].srct,
                                "",
                                conds[x].srcv,
                                conds[x].value
                            )
                        }
                        if (isNeedSend) {

                            var destv = this.getValueInChange(domevnet.destk, domevnet.destv);

                            this.doValueChangeEvent(domevnet.destk, destv, domevnet.ev, life, <IRDomAttrs>domevnet.destattr);
                        }
                    }
                }
            }
            parseAdvsrct(advsrct: string): { srct: string, srcv: any, vkey: string }[] {
                advsrct = lodash.trim(advsrct)
                let advsrcts = advsrct.split("and")
                let whereSybmol = {
                    "=": "$eq",
                    "!=": "$ne",
                    ">": '$gt',
                    ">=": "$gte",
                    "<": "$lt",
                    "<=": "$lte",
                    "in": "$in",
                    "not in": "$nin"
                };
                let whereSybmolKeys = Object.keys(whereSybmol)
                whereSybmolKeys.sort(function (a, b) {
                    return b.length - a.length;
                })

                function GetValue(value: string): (string | number | boolean) {
                    let len = value.length;
                    if (value.length > 0) {
                        if (value.length > 2 && ((value[0] == "'" && value[len - 1] == "'") || (value[0] == '"' && value[len - 1] == '"'))) {
                            //string
                            return value.substring(1, len - 1)
                        } else if (value.length >= 4 && (value == "false" || value == "true")) {
                            //boolen
                            return value == "true";
                        } else { //number
                            return Number(value)
                        }
                    }
                }

                function getCondStruct(cond: string) {
                    for (var x in whereSybmolKeys) {
                        let kindex = cond.indexOf(whereSybmolKeys[x]);
                        if (kindex > 0) {
                            let ykey = whereSybmolKeys[x]
                            let conKey = whereSybmol[ykey]; // 条件
                            let k: string = cond.substring(0, kindex);
                            let v: string | number | boolean = cond.substring(kindex + ykey.length, cond.length);
                            k = lodash.trim(k)
                            v = lodash.trim(v)
                            if (v.length > 0 && k.length > 0) {
                                //字符串
                                if (conKey == "$in" || conKey == "$nin") {
                                    if (v[0] == "(" && v[v.length - 1] == ")") {
                                        let vr: any[] = v.substring(1, v.length - 1).split(',');
                                        for (var i in vr) {
                                            vr[i] = GetValue(vr[i])
                                        }
                                        v = vr.join(",")
                                    }
                                } else {
                                    v = GetValue(v);
                                }
                                return {
                                    srct: conKey, // 触发条件
                                    srcv: v, // 触发值
                                    vkey: k //需要获取的键
                                }
                            }

                        }
                    }
                    return null;
                }
                let advsrctsS = [];
                for (var x in advsrcts) {
                    let vl = getCondStruct(advsrcts[x]);
                    if (vl) {
                        advsrctsS.push(vl)
                    }
                }
                return advsrctsS;
            }


            /**
             *  检查事件是否被触发
             * @param srct 触发条件
             * @param advsrct 高级条件
             * @param srcv 触发值
             * @param value 当前值
             */
            checkEventSent(srct: string, advsrct: string, srcv: string | number | boolean, value: string | number | boolean) {
                let t = srct || "$eq"; // 条件
                let isNeedSend = false;
                switch (t) {
                    case '$eq':// $eq = (等于)
                        if (srcv == value) {
                            isNeedSend = true;
                        }
                        break;
                    case '$ne':// $ne != (不等于)
                        if (srcv != value) {
                            isNeedSend = true;
                        }
                        break;
                    case '$gt':// $gt > (大于)
                        if (!lodash.isNumber(Number(srcv)) || !lodash.isNumber(value)) { break; }
                        if (value > srcv) {
                            isNeedSend = true;
                        }
                        break;
                    case '$gte'://  $gte >= (大于等于)
                        if (!lodash.isNumber(Number(srcv)) || !lodash.isNumber(value)) { break; }
                        if (value >= srcv) {
                            isNeedSend = true;
                        }
                        break;
                    case '$lt'://  $lt < (小于)
                        if (!lodash.isNumber(Number(srcv)) || !lodash.isNumber(value)) { break; }
                        if (value < srcv) {
                            isNeedSend = true;
                        }
                        break;
                    case '$lte':// $lte <= (小于等于)
                        if (!lodash.isNumber(Number(srcv)) || !lodash.isNumber(value)) { break; }
                        if (value <= srcv) {
                            isNeedSend = true;
                        }
                        break;
                    case '$in':// $in in (in)
                        if (!lodash.isString(srcv)) { break; }
                        var vr = (<string>srcv).split(",");
                        if (lodash.findIndex(vr, function (o) { return o == value; }) != -1) {
                            isNeedSend = true;
                        }
                        break;
                    case '$nin':// $nin !in (not in)
                        if (!lodash.isString(srcv)) { break; }
                        var vr = (<string>srcv).split(",");
                        if (lodash.findIndex(vr, function (o) { return o == value; }) == -1) {
                            isNeedSend = true;
                        }
                        break;
                }

                return isNeedSend;

            }



            doValueChangeEvent(name, value, ext, life: number = defEventLife, extAttr: IRDomAttrs = {}) {
                if (!lodash.isEmpty(name)) {
                    let edata: IDomInputChangeEvent = {
                        name: name,
                        value: value,
                        extattr: extAttr,
                        uuid: 0,
                        ext: ext,
                        force: false,
                        life: life
                    };
                    kaayou.emit("domView", "Value::Change::" + name, edata);
                }
            }

        }

    }
}