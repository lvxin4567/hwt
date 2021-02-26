/// <reference path="common.RDomBaseNode.d.ts" />
declare namespace common {
    namespace RDom {
        class UIRadioBox extends UICheckBox {
            _defvalueType: string;
            _valueType: string;
            initWithNode(node: ccui.Widget, uuid?: number): void;
            getAttr(): any;
            setAttrAndStyle(dattr?: IRDomAttrs): void;
            doValueType(value: any): string | number;
            onInputValueChange(name: string, uuid: number, value: any, ext: string | boolean | number, life: number, extAttr: IRDomAttrs): void;
            onClick(): void;
        }
    }
}
