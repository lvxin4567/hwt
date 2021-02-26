/// <reference path="common.RDomBaseNode.ts" />
namespace common {

    export namespace RDom {

        export class UIRadioBox extends UICheckBox {

            _defvalueType: string = "string";
            _valueType: string = "string";

            initWithNode(node: ccui.Widget, uuid: number = 0) {
                super.initWithNode(node, uuid);
                this.__nodeType = "radiobox";
            }

            getAttr() {
                return lodash.extend({}, super.getAttr(), { checked: this._checked, text: this._text, value: this.doValueType(this._value), valueType: this._valueType });
            }


            setAttrAndStyle(dattr: IRDomAttrs = {}) {
                let attr = dattr || {};
                super.setAttrAndStyle(attr);
                this._text = lodash.isString(attr.text) ? attr.text : this._text || this._defText;
                this._checked = !!attr.checked;
                this._valueType = attr.valueType || this._defvalueType;
                this._value = this.doValueType(attr.value == undefined ? this._defvalue : attr.value)
                !attr.isEdit && this.doBindeChangeEvent();
                this.updateUI();
            };
            doValueType(value) {
                if (this._valueType == "string") {
                    return value + "";
                } else if (this._valueType == "number") {
                    let v = Number(value);
                    return lodash.isNumber(v) ? v : 0;
                }
                return "";
            }

            onInputValueChange(name: string, uuid: number, value: any, ext: string | boolean | number, life: number, extAttr: IRDomAttrs) {

                if (ext == 'lock') {
                    this.__lock = true;
                } else if (ext == 'unlock') {
                    this.__lock = false;
                }
                this._checked = (this.doValueType(this._value) == this.doValueType(value));
                // this.__attr.checked = e.data;
                this.updateUI();
                // this.doForEvent(uuid, this._checked, force, life);
            }

            onClick() {
                if (this.__lock) { return; }
                if (this._checked) { return; }
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                this.doValueChangeEvent(this.doValueType(this._value));
            };

        }
    }
}