/// <reference path="common.RDomBaseNode.ts" />
namespace common {

    export namespace RDom {

        export class UINumBox extends UIInput {

            btn_add: ccui.Button = null;
            btn_sub: ccui.Button = null;
            label: ccui.Text = null;

            initWithNode(node: ccui.Widget, uuid: number = 0) {
                super.initWithNode(node, uuid);
                this.__nodeType = "numbox";
                this._deffontColor = "#C07575";
                this.btn_add = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_add");
                this.btn_sub = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "btn_sub");
                this.label = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label");
                this.btn_add.on(kaayou.TouchEvent.TouchEnd, this.onAddClick, this);
                this.btn_sub.on(kaayou.TouchEvent.TouchEnd, this.onSubClick, this);
            }

            //属性
            _maxNum = 0xffff;
            _minNum = 0;
            _unit = "";//单位
            _inc = 1; //步进
            _isGroup = false;//是否组
            _group: Array<{ n: string, v: number }> = null;

            _curGroupNum = -1;
            // _curNumValue = 0;

            getAttr() {
                return lodash.extend({}, super.getAttr(), {
                    value: this._value,
                    displayType: this._displayType,
                    groupStr: this._groupStr,
                    inc: this._inc,
                    unit: this._unit,
                    maxNum: this._maxNum,
                    minNum: this._minNum,
                });
            }

            _displayType: string = "nomal"; //nomal  grup
            _value: number = 0;
            _valueStr: string = "";
            _defgroupStr: string = JSON.stringify([{ "n": "1分", "v": 1 }, { "n": "2分", "v": 2 }]);
            _groupStr: string = "";
            _isErr = false;

            setAttrAndStyle(dattr: IRDomAttrs = {}) {
                let attr = dattr || {};
                super.setAttrAndStyle(attr);
                this._displayType = attr.displayType || "nomal";
                this._isGroup = this._displayType == "group";
                this._groupStr = attr.groupStr || this._groupStr || this._defgroupStr;
                this._inc = attr.inc || 1;
                this._unit = attr.unit || "";
                this._maxNum = attr.maxNum != undefined ? attr.maxNum : 0xffff;
                this._minNum = attr.minNum != undefined ? attr.minNum : 0;
                this._value = attr.value != undefined ? Number(attr.value) : 0;
                this._value = Math.min(this._maxNum, Math.max(this._minNum, this._value));

                do {
                    try {

                        if (this._isGroup) {
                            this._group = JSON.parse(this._groupStr)
                            this._isErr = !this._group;
                            if (this._isErr) {
                                this.doError("错误数据"); break;
                            }
                            let i = lodash.findIndex(this._group, { v: this._value });
                            if (i < 0) {
                                i = Math.min(this._group.length - 1, Math.max(0, i));
                                this._value = Number(this._group[i].v);
                            }
                            this.setGroupValue(this._value);
                        } else {
                            this.setValue(this._value);
                        }

                    } catch (err) {
                        this._isErr = true;
                        if (this._isErr) {
                            this.doError("错误数据"); break;
                        }
                    }

                } while (false);
                this.doBindeChangeEvent();
                this.updateUI();
            };
            doError(str) {
                this.checkBtnState(0, 0, 0, true);
                this._valueStr = str;
            }
            setValue(text: string | number) {
                this.checkBtnState(this._value, this._maxNum, this._minNum);
                this._valueStr = this._value + this._unit;
            }

            setGroupValue(value: number) {

                let index = lodash.findIndex(this._group, { v: this._value });
                if (this._group.length < 1) {
                    this.doError("错误值");
                    return;
                }
                if (index < 0 || index >= this._group.length) {
                    let pv = this.getGroupValueByValueProtect(value);
                    if (pv == null) {
                        this.doError("错误值");
                        return;
                    }
                    setTimeout(() => { 
                        this.doValueChangeEvent(pv);  
                    }, 1);
                    return;
                }
                this.checkBtnState(index, this._group.length - 1, 0);
                this._valueStr = this._group[index].n;
            }


            checkBtnState(i, max, min, a = false) {
                if (a || this.__lock) {
                    this.btn_add.setBright(false);
                    this.btn_add.setTouchEnabled(false);
                    this.btn_sub.setBright(false);
                    this.btn_sub.setTouchEnabled(false);
                    return;
                }

                this.btn_add.setBright(!(i >= max));
                this.btn_add.setTouchEnabled(!(i >= max));
                this.btn_sub.setBright(!(i <= min));
                this.btn_sub.setTouchEnabled(!(i <= min));


            }


            updateUI() {
                this.updateText();
            }

            updateText() {

                let text = this._valueStr;
                if (!cc.colorEqual(cc.color(this._fontColor), this.label.getTextColor())
                    || this._fontName != this.label.getFontName()
                    || this._fontSize != this.label.getFontSize()
                ) {
                    this.label = Patch.ChangeTextColor(this.label, text, cc.color(this._fontColor), this._fontName, this._fontSize);
                } else {
                    if (text != this.label.getString()) {
                        this.label.setString(text);
                    }
                }


            }
            getInputValue() {
                return this._value;
            }


            onInputValueChange(name: string, uuid: number, value: any, ext: string | boolean | number, life: number, extAttr: IRDomAttrs) {
                // this.__attr.checked = e.data
                if(ext == 'lock'){
                    this.__lock = true;
                    if(!lodash.isEmpty(value)){
                        this._value = Number(value) || 0;;
                    }
                }else if (ext == 'unlock'){
                    this.__lock = false;
                    if(!lodash.isEmpty(value)){
                        this._value = Number(value) || 0;;
                    }
                }else{
                    this._value = Number(value) || 0;;
                }

                if (this._isGroup) {
                    this.setGroupValue(this._value);
                } else {
                    this.setValue(this._value);
                }
                this.updateUI();
            }


            getGroupIndexByValue(value) {
                let index = 0;
                for (var i = 0; i < this._group.length; i++) {
                    let { n, v } = this._group[i];
                    if (Number(v) === Number(value)) {
                        index = i;
                        break;
                    }
                }
                return index;
            }
            getGroupNextValue() {

                let index = this.getGroupIndexByValue(this._value);
                index = Math.max(Math.min(index + 1, this._group.length - 1), 0)
                let { n, v } = this._group[index];
                return Number(v);
            }

            getGroupPrevValue() {

                let index = this.getGroupIndexByValue(this._value);
                index = Math.max(Math.min(index - 1, this._group.length - 1), 0)
                let { n, v } = this._group[index];
                return Number(v);
            }

            getGroupValueByValueProtect(value) {
                if( this._group.length <= 0){
                    return null;
                }
                let index = this.getGroupIndexByValue(value);
                index = Math.max(Math.min(index , this._group.length - 1), 0)
                let { n, v } = this._group[index];
                return Number(v);
            }

            onSubClick() {
                if (this.__lock) { return; }
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                let value = 0;
                if (this._isGroup) {
                    value = this.getGroupPrevValue();
                } else {
                    value = Math.min(this._maxNum, Math.max(this._minNum, this._value - this._inc));
                }
                this.doValueChangeEvent(value);
            };

            onAddClick() {
                if (this.__lock) { return; }
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                let value = 0;
                if (this._isGroup) {
                    value = this.getGroupNextValue();
                } else {
                    value = Math.min(this._maxNum, Math.max(this._minNum, this._value + this._inc));
                }
                this.doValueChangeEvent(value);
            };

        }
    }

}