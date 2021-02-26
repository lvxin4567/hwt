/// <reference path="common.RDomBaseNode.ts" />
namespace common {

    export namespace RDom {

        export class UILabelBox extends UIInput {

            label: ccui.Text = null;

            _defText: string = "ggggG";
            _text: string = "";

            initWithNode(node: ccui.Widget, uuid: number = 0) {
                this.__nodeType = "labelbox";
                super.initWithNode(node, uuid);
                this._deffontColor = "#1a5154";
                this.label = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label");
                this.label.ignoreContentAdaptWithSize(true);
            }

            getAttr() {
                return lodash.extend({}, super.getAttr(), { text: this._text });
            }

            setAttrAndStyle(dattr: IRDomAttrs = {}) {
                let attr = dattr || {};
                super.setAttrAndStyle(attr);
                this._text = lodash.isString(attr.text) ? attr.text : this._text || this._defText;
                !attr.isEdit && this.doBindeChangeEvent();
                this.updateUI();
            };

            onInputValueChange(name: string, uuid: number, value: any, ext: string | boolean | number, life: number, extAttr: IRDomAttrs) {

                this._text = lodash.isString(value) ? value : this._text || this._defText;
                this.updateUI();

            }
            updateUI() {
                let text = this._text || "";
                let color = cc.color(this._fontColor);
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
            };
        }
    }

}