namespace common {

    export namespace RDom {
        export const defEventLife = 1;
        export interface IRDomAttrs {
            uuid?: number;
            nodeType?: string;
            fontSize?: number;
            fontName?: string;
            fontColor?: string;
            fontActiveColor?: string;
            backgroudColor?: string;
            text?: string;
            value?: string | number;
            valueType?: string;
            checked?: boolean;
            iid?: string;
            iname?: string;
            x?: number,
            y?: number,
            zindex?: number,
            isEdit?: boolean,
            displayType?: string,
            groupStr?: string,
            inc?: number,
            unit?: string,
            maxNum?: number,
            minNum?: number,
        }

        export interface IRDomGangedEvent {
            srck: string; // 触发建
            srcv: string | number | boolean; //触发值
            srct: string; // 触发条件
            advsrct: string; // 高级条件
            destk: string;  // 目标键
            ev: string;     // 事件类型
            destv: string | number | boolean; //目标值
            destattr: string | IRDomAttrs // 其他属性
            priority: number, //优先级

        }

        export abstract class UINode extends kaayou.Block {
            __nodeType = "node";
            _fontSize = 32;
            _fontName = "SimHei";
            _fontColor = "#ffffff";
            _fontActiveColor = "#ffffff";

            _deffontSize = 32;
            _deffontName = "SimHei";
            _deffontColor = "#ffffff";
            _deffontActiveColor = "#ffffff";

            getAttr() {
                return {
                    x: Number(this.x.toFixed(2)),
                    y: Number(this.y.toFixed(2)),
                    zindex: Number(this.zIndex),
                    nodeType: this.__nodeType,
                    uuid: this.__uuid,
                    fontSize: this._fontSize,
                    fontName: this._fontName,
                    fontColor: this._fontColor,
                    fontActiveColor: this._fontActiveColor
                };
            }

            setAttrAndStyle(dattr: IRDomAttrs = {}) {
                let attr = dattr || {};
                let tx = lodash.isNumber(attr.x) ? Number(attr.x.toFixed(2)) : this.x || 0;
                let ty = lodash.isNumber(attr.y) ? Number(attr.y.toFixed(2)) : this.y || 0;
                this._fontSize = attr.fontSize || this._deffontSize;;
                this._fontName = attr.fontName || this._deffontName;
                this._fontColor = attr.fontColor || this._deffontColor;
                this._fontActiveColor = attr.fontActiveColor || this._deffontActiveColor;
                this.setPosition(tx, ty);
                if (lodash.isNumber(attr.zindex) && this.zIndex != Number(attr.zindex)) {
                    this.setLocalZOrder(attr.zindex);
                }

            };

            mergerStyle(dattr: IRDomAttrs = {}) {
                let attr = dattr || {};
                let tx = lodash.isNumber(attr.x) ? Number(attr.x.toFixed(2)) : this.x || 0;
                let ty = lodash.isNumber(attr.y) ? Number(attr.y.toFixed(2)) : this.y || 0;
                this._fontSize = attr.fontSize || this._deffontSize;;
                this._fontName = attr.fontName || this._deffontName;
                this._fontColor = attr.fontColor || this._deffontColor;
                this._fontActiveColor = attr.fontActiveColor || this._deffontActiveColor;
                this.setPosition(tx, ty);
                if (lodash.isNumber(attr.zindex) && this.zIndex != Number(attr.zindex)) {
                    this.setLocalZOrder(attr.zindex);
                }
            }

            abstract updateUI();
            __uuid = -1;
            initWithNode(node: ccui.Widget, uuid: number) {
                super.initWithNode(node);
                this.setPosition(0, 0);
                this.setAnchorPoint(0, 1);
                if (uuid) {
                    this.__uuid = uuid;
                } else {
                    this.__uuid = UINode.UUID++;
                }

            }
            static UUID = 10000;
        }

        export interface IDomInputChangeEvent {
            name: string;
            value: any;
            extattr?: IRDomAttrs | IRDomAttrs[];
            uuid?: number;
            force?: boolean;
            life: number;
            ext?: string;
        }

        export interface IDomInputDoEvent {
            key: string;
            ext: any;
            value: any
            life: number
        }

        export abstract class UIInput extends UINode {

            _iname: string = "";
            _iid: string = "";
            __lock = false;
            setAttrAndStyle(dattr: IRDomAttrs = {}) {
                let attr = dattr || {};
                super.setAttrAndStyle(dattr);
                this._iname = attr.iname || "p:" + this.__uuid;
                this._iid = attr.iid || "";
            }
            getAttr() {
                return lodash.extend({}, super.getAttr(), { iname: this._iname });
            }

            getInputName() {
                return this._iname || "";
            }

            getInputID() {
                return this._iid || "";
            }

            getInputFor() {
                return "";
            }

            doBindeChangeEvent() {
                if (!lodash.isEmpty(this.getInputName())) {
                    kaayou.getController("domView").on("Value::Change::" + this.getInputName(), this.__onInputValueChange, this);
                }
            }


            protected __onInputValueChange(e) {
                let data: IDomInputChangeEvent = e.data;
                data.force = !!data.force;
                data.life = data.life || 0;
                let life = data.life - 1;
                this.onInputValueChange && this.onInputValueChange(data.name, data.uuid, data.value, data.ext, life, data.extattr || {});
                if (this.onInputValueChange) {
                    try {
                        if (lodash.isArray(data.extattr)) {
                            let itAttrs: IRDomAttrs[] = <IRDomAttrs[]>data.extattr;
                            for (var x in itAttrs) {
                                let itAttr = itAttrs[x]
                                this.doSetExtAttr(itAttr)
                            }

                        } else if (lodash.isObject(data.extattr)) {
                            let itAttr: IRDomAttrs = <IRDomAttrs>data.extattr;
                            this.doSetExtAttr(itAttr)
                        } else {

                        }
                    } catch (e) { }
                }
            }

            protected doSetExtAttr(attr: IRDomAttrs = {}) {
                let uuid: any = attr.uuid || null;
                if (uuid) {
                    if (lodash.isArray(uuid)) {
                        if (uuid.indexOf(this.__uuid) > -1) {
                            this.mergerStyle(attr);
                        }
                    } else if (lodash.isNumber(uuid)) {
                        if (this.__uuid == uuid) {
                            this.mergerStyle(attr);
                        }
                    }
                } else if (uuid === null) {
                    this.mergerStyle(attr);
                }
            }


            doValueChangeEvent(value, life: number = defEventLife, extAttr: IRDomAttrs = {}) {
                let name = this.getInputName();
                if (!lodash.isEmpty(name)) {
                    let edata: IDomInputChangeEvent = {
                        name: name,
                        value: value,
                        extattr: extAttr,
                        uuid: this.__uuid,
                        force: false,
                        life: life
                    };
                    kaayou.emit("domView", "Value::Change::" + name, edata);
                }
            }

            abstract onInputValueChange(name: string, uuid: number, value: any, ext: string | number | boolean, life: number, extAttr: IRDomAttrs | IRDomAttrs[]);

        }
    }

}