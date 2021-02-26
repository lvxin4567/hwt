/// <reference path="common.RDomBaseNode.ts" />
namespace common {

    export namespace RDom {

        export class UICheckBox extends UIInput {

            checkbox: ccui.CheckBox = null;
            label: ccui.Text = null;
            _defText: string = "ggggG";
            _text: string = "";
            _defchecked: boolean = false;
            _checked: boolean = false;
            _defvalue: string = "";
            _value: string | number = "";


            initWithNode(node: ccui.Widget, uuid: number = 0) {
                this.__nodeType = "checkbox";
                super.initWithNode(node, uuid);
                this._deffontColor = "#587a9d";
                this._deffontActiveColor = "#5f2b06";
                this.checkbox = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "checkbox");
                this.label = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label");
                this.label.ignoreContentAdaptWithSize(true);
                this.node.on(kaayou.TouchEvent.TouchEnd, this.onClick, this);
            }

            setAttrAndStyle(dattr: IRDomAttrs = {}) {
                let attr = dattr || {};
                super.setAttrAndStyle(attr);
                this._text = lodash.isString(attr.text) ? attr.text : this._text || this._defText;

                this._checked = !!attr.checked;
                this._value = this._checked ? "true" : "false";

                !attr.isEdit && this.doBindeChangeEvent();
                this.updateUI();
            };

            getAttr() {
                return lodash.extend({}, super.getAttr(), { text: this._text, checked: this._checked, value: this._checked ? "true" : "false" });
            }


            updateUI() {
                this.checkbox.setBright(true);
                this.checkbox.setSelected(this._checked);
                this.checkbox.setBright(!this.__lock);
                this.updateText();
            };

            updateText() {
                let text = this._text || "";
                let color = !this._checked ? cc.color(this._fontColor) : cc.color(this._fontActiveColor);

                if (!cc.colorEqual(color, this.label.getTextColor())
                    || this._fontName != this.label.getFontName()
                    || this._fontSize != this.label.getFontSize()
                ) {
                    this.label = Patch.ChangeTextColor(this.label, text, color, this._fontName, this._fontSize);
                } else {
                    if (text != this.label.getString()) {
                        this.label.setString(text);
                    }
                }
            }

            onInputValueChange(name: string, uuid: number, value: any, ext: string | boolean | number, life: number, extAttr: IRDomAttrs) {

                if (ext == 'lock') {
                    this.__lock = true;
                    if (!lodash.isEmpty(value)) {
                        this._checked = (value == "true");
                        this._value = this._checked ? "true" : "false";
                    }
                } else if (ext == 'unlock') {
                    this.__lock = false;
                    if (!lodash.isEmpty(value)) {
                        this._checked = (value == "true");
                        this._value = this._checked ? "true" : "false";
                    }
                } else {
                    this._checked = (value == "true");
                    this._value = this._checked ? "true" : "false";
                }

                this.updateUI();
            }


            onClick() {
                if (this.__lock) { return; }
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                this.doValueChangeEvent(!this.checkbox.isSelected() ? "true" : "false");
            };

        }
    }

}