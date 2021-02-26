/// <reference path="common.RDomBaseNode.ts" />
namespace common {

    export namespace RDom {

        export class UITipBox extends UIInput {

            tip_alert: ccui.ImageView = null;
            label: ccui.Text = null;
            mask: ccui.Layout = null;
            _defText: string = "ggggG";
            _text: string = "";

            initWithNode(node: ccui.Widget, uuid: number = 0) {
                this.__nodeType = "tipbox";
                super.initWithNode(node, uuid);
                this._deffontColor = "#ffffff";
                this.label = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "tip_alert_label");
                this.label.ignoreContentAdaptWithSize(true);
                this.tip_alert = ccui.helper.seekWidgetByName(<ccui.Widget>this.node, "tip_alert");
                this.node.on(kaayou.TouchEvent.TouchEnd, this.onClick, this);
                this.tip_alert.setVisible(false);
            }
            getAttr() {
                return lodash.extend({}, super.getAttr(), { text: this._text });
            }
            setAttrAndStyle(dattr: IRDomAttrs = {}) {
                let attr = dattr || {};
                super.setAttrAndStyle(attr);
                this._text = lodash.isString(attr.text) ? attr.text : this._text || this._defText;
                this._text = this._text.replace("\\n", "\n");
                // this.doBindeChangeEvent();
                this.updateUI();
            };


            onInputValueChange(name: string, uuid: number, value: any, ext: string | boolean | number, life: number, extAttr: IRDomAttrs) {
                this._text = lodash.isString(value) ? value : this._text || this._defText;
                this.updateUI();
            }

            onClick() {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnDefault);
                this.tip_alert.setVisible(true);
                this.mask = <ccui.Layout>ccui.Layout.create();
                this.mask.setTouchEnabled(true);
                this.mask.setAnchorPoint(0.5, 0.5);
                this.mask.setContentSize(cc.winSize.width * 2, cc.winSize.height * 2);
                this.mask.setPosition(cc.winSize.width * .5, cc.winSize.height * .5);
                // this.mask.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
                // this.mask.setBackGroundColor(cc.color("#000000"));
                kaayou.UIManager.getInstance().getCurRuningScene().addChild(this.mask, 9999);
                this.mask.on(kaayou.TouchEvent.TouchEnd, this.onMaskClick, this);
            };

            onMaskClick() {
                kaayou.SoundManager.getInstance().playSound(common.SoundRes.ClickBtnClose);
                this.tip_alert.setVisible(false);
                if (this.mask) {
                    this.mask.removeFromParent(true);
                    setTimeout(() => {
                        this.mask = null;
                    }, 1);
                }
            };

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
                var strSize = this.label.getContentSize();
                var boxwidth = Math.max(230, strSize.width + 40);
                var boxheight = Math.max(85, 45 + strSize.height);
                this.tip_alert.setContentSize(boxwidth, boxheight);
                this.label.setPosition(boxwidth * 0.5, boxheight * 0.6);
            };
        }
    }

}

