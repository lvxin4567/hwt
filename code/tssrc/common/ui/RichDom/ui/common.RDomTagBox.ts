/// <reference path="common.RDomBaseNode.ts" />
namespace common {

    export namespace RDom {

        export class UITagBox extends UIInput {

            lbbg: ccui.ImageView = null;
            label: ccui.Text = null;
            _defText: string = "ggggG";
            _text: string = "";
            _defbackgroudColor = "#FF0000";
            _backgroudColor = "#FF0000";

            initWithNode(node: ccui.Widget , uuid :number = 0) {
                this.__nodeType = "tagbox";
                super.initWithNode(node , uuid);
                this._deffontColor = "#ffffff";
                this._deffontSize = 22;
                this.label = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "label");
                this.label.ignoreContentAdaptWithSize(true);
                this.lbbg = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "lbbg");
            }
            getAttr() {
                return lodash.extend({}, super.getAttr(), { text: this._text , backgroudColor: this._backgroudColor });
            }

            setAttrAndStyle(dattr: IRDomAttrs = {}) {
                let attr = dattr || {};
                super.setAttrAndStyle(attr);
                this._backgroudColor = attr.backgroudColor || this._backgroudColor || this._defbackgroudColor;
                this._text = lodash.isString(attr.text) ? attr.text : this._text || this._defText;
                !attr.isEdit && this.doBindeChangeEvent();
                this.updateUI();
            };

            onInputValueChange(name: string, uuid: number, value: any, ext: string | boolean | number, life: number,extAttr: IRDomAttrs) {

                this._text = lodash.isString(value) ? value : this._text || this._defText;
                this.updateUI();
                
            }

            updateUI() {
                let text = this._text || "";

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

                if (!cc.colorEqual(cc.color(this._backgroudColor), this.lbbg.getColor()) ) {
                    this.lbbg.setColor( cc.color(this._backgroudColor) );
                }

                var strSize = this.label.getContentSize();
                var boxwidth = Math.max(80, strSize.width + 10);
                var boxheight = Math.max(32, strSize.height);
                this.label.setPosition(this.getContentSize().width * .5, this.getContentSize().height * .5);
                this.lbbg.setPosition(this.getContentSize().width * .5, this.getContentSize().height * .5);
                this.lbbg.setContentSize(boxwidth, boxheight);
            };
        }
    }

}